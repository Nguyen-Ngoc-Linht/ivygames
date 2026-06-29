Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

function New-Bitmap {
    param([int]$Width, [int]$Height)
    return New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Set-Quality {
    param([System.Drawing.Graphics]$Graphics)
    $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
}

function Get-SubImage {
    param(
        [System.Drawing.Image]$Image,
        [int]$X,
        [int]$Y,
        [int]$Width,
        [int]$Height
    )

    $bitmap = New-Bitmap -Width $Width -Height $Height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    Set-Quality -Graphics $graphics
    $graphics.DrawImage(
        $Image,
        [System.Drawing.Rectangle]::new(0, 0, $Width, $Height),
        [System.Drawing.Rectangle]::new($X, $Y, $Width, $Height),
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $graphics.Dispose()
    return $bitmap
}

function Get-ConstructFrame {
    param(
        [System.Drawing.Image]$Image,
        [int]$X,
        [int]$Y,
        [int]$Width,
        [int]$Height,
        [bool]$Rotated = $false
    )

    if (-not $Rotated) {
        return Get-SubImage -Image $Image -X $X -Y $Y -Width $Width -Height $Height
    }

    $rotatedFrame = Get-SubImage -Image $Image -X $X -Y $Y -Width $Height -Height $Width
    $rotatedFrame.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
    return $rotatedFrame
}

function Draw-CoverImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [System.Drawing.RectangleF]$Destination
    )

    $scale = [Math]::Max($Destination.Width / $Image.Width, $Destination.Height / $Image.Height)
    $sourceWidth = [Math]::Round($Destination.Width / $scale)
    $sourceHeight = [Math]::Round($Destination.Height / $scale)
    $sourceX = [Math]::Round(($Image.Width - $sourceWidth) / 2)
    $sourceY = [Math]::Round(($Image.Height - $sourceHeight) / 2)
    $Graphics.DrawImage(
        $Image,
        $Destination,
        [System.Drawing.RectangleF]::new($sourceX, $sourceY, $sourceWidth, $sourceHeight),
        [System.Drawing.GraphicsUnit]::Pixel
    )
}

function Draw-ContainImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height
    )

    $scale = [Math]::Min($Width / $Image.Width, $Height / $Image.Height)
    $drawWidth = $Image.Width * $scale
    $drawHeight = $Image.Height * $scale
    $drawX = $X + (($Width - $drawWidth) / 2)
    $drawY = $Y + (($Height - $drawHeight) / 2)
    $Graphics.DrawImage($Image, $drawX, $drawY, $drawWidth, $drawHeight)
}

function Draw-ShadowedImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height,
        [float]$ShadowOffsetX = 12,
        [float]$ShadowOffsetY = 14,
        [float]$ShadowAlpha = 0.28
    )

    $shadowAttributes = New-Object System.Drawing.Imaging.ImageAttributes
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix
    $colorMatrix.Matrix00 = 0
    $colorMatrix.Matrix11 = 0
    $colorMatrix.Matrix22 = 0
    $colorMatrix.Matrix33 = $ShadowAlpha
    $shadowAttributes.SetColorMatrix($colorMatrix)

    $destination = [System.Drawing.Rectangle]::new(
        [int][Math]::Round($X + $ShadowOffsetX),
        [int][Math]::Round($Y + $ShadowOffsetY),
        [int][Math]::Round($Width),
        [int][Math]::Round($Height)
    )
    $Graphics.DrawImage(
        $Image,
        $destination,
        0,
        0,
        $Image.Width,
        $Image.Height,
        [System.Drawing.GraphicsUnit]::Pixel,
        $shadowAttributes
    )
    $shadowAttributes.Dispose()
    $Graphics.DrawImage($Image, $X, $Y, $Width, $Height)
}

function New-LinearBrush {
    param(
        [int]$Width,
        [int]$Height,
        [System.Drawing.Color]$StartColor,
        [System.Drawing.Color]$EndColor
    )

    return New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0, 0, $Width, $Height),
        $StartColor,
        $EndColor,
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
}

function Draw-Gloss {
    param(
        [System.Drawing.Graphics]$Graphics,
        [int]$Width,
        [int]$Height
    )

    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0, 0, $Width, [int]($Height * 0.45)),
        ([System.Drawing.Color]::FromArgb(120, 255, 255, 255)),
        ([System.Drawing.Color]::FromArgb(0, 255, 255, 255)),
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
    $Graphics.FillEllipse($brush, -40, -30, [int]($Width * 0.7), [int]($Height * 0.45))
    $brush.Dispose()
}

function Draw-RoundedBorder {
    param(
        [System.Drawing.Graphics]$Graphics,
        [int]$Width,
        [int]$Height,
        [int]$Radius,
        [System.Drawing.Color]$StrokeColor,
        [float]$StrokeWidth
    )

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $Radius * 2
    $path.AddArc(0, 0, $diameter, $diameter, 180, 90)
    $path.AddArc($Width - $diameter - 1, 0, $diameter, $diameter, 270, 90)
    $path.AddArc($Width - $diameter - 1, $Height - $diameter - 1, $diameter, $diameter, 0, 90)
    $path.AddArc(0, $Height - $diameter - 1, $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $pen = New-Object System.Drawing.Pen($StrokeColor, $StrokeWidth)
    $Graphics.DrawPath($pen, $path)
    $pen.Dispose()
    $path.Dispose()
}

function Save-Png {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [string]$Path
    )

    $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $Bitmap.Dispose()
}

$workspace = Split-Path -Parent $PSScriptRoot
$gameRoot = Join-Path $workspace "Animals-Crush-Match-3"
$outputRoot = Join-Path $workspace "image-games\\Animals-Crush-Match-3"
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$sheet2 = [System.Drawing.Image]::FromFile((Join-Path $gameRoot "images\\shared-0-sheet2.png"))
$sheet3 = [System.Drawing.Image]::FromFile((Join-Path $gameRoot "images\\shared-0-sheet3.png"))
$dotSheet = [System.Drawing.Image]::FromFile((Join-Path $gameRoot "images\\dot-sheet0.png"))
$loadingLogo = [System.Drawing.Image]::FromFile((Join-Path $gameRoot "icons\\loading-logo.png"))

$background = Get-SubImage -Image $sheet2 -X 665 -Y 1 -Width 506 -Height 810
$sunburst = Get-SubImage -Image $sheet2 -X 1 -Y 1 -Width 662 -Height 662
$logo = Get-ConstructFrame -Image $sheet2 -X 1793 -Y 513 -Width 400 -Height 250 -Rotated $true
$grid = Get-SubImage -Image $sheet2 -X 1025 -Y 1537 -Width 480 -Height 480
$woodTop = Get-SubImage -Image $sheet3 -X 289 -Y 1 -Width 223 -Height 63
$playButton = Get-ConstructFrame -Image $sheet3 -X 1 -Y 1 -Width 266 -Height 142 -Rotated $true

$animalFrames = @(
    (Get-SubImage -Image $dotSheet -X 1 -Y 385 -Width 80 -Height 80),
    (Get-SubImage -Image $dotSheet -X 165 -Y 385 -Width 80 -Height 80),
    (Get-SubImage -Image $dotSheet -X 83 -Y 385 -Width 80 -Height 80),
    (Get-SubImage -Image $dotSheet -X 1 -Y 257 -Width 80 -Height 80),
    (Get-SubImage -Image $dotSheet -X 165 -Y 257 -Width 80 -Height 80)
)

function Draw-SceneBase {
    param(
        [System.Drawing.Graphics]$Graphics,
        [int]$Width,
        [int]$Height
    )

    $sky = New-LinearBrush -Width $Width -Height $Height `
        -StartColor ([System.Drawing.Color]::FromArgb(255, 228, 244, 255)) `
        -EndColor ([System.Drawing.Color]::FromArgb(255, 244, 250, 222))
    $Graphics.FillRectangle($sky, 0, 0, $Width, $Height)
    $sky.Dispose()

    Draw-CoverImage -Graphics $Graphics -Image $background -Destination ([System.Drawing.RectangleF]::new(0, 0, $Width, $Height))

    $leftGlow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(36, 255, 226, 120))
    $rightGlow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(32, 255, 184, 90))
    $Graphics.FillEllipse($leftGlow, -120, -80, [int]($Width * 0.62), [int]($Height * 0.62))
    $Graphics.FillEllipse($rightGlow, [int]($Width * 0.55), [int]($Height * 0.12), [int]($Width * 0.35), [int]($Height * 0.35))
    $leftGlow.Dispose()
    $rightGlow.Dispose()
}

function Draw-Animals {
    param(
        [System.Drawing.Graphics]$Graphics,
        [array]$Frames,
        [array]$Positions
    )

    for ($i = 0; $i -lt $Positions.Count; $i++) {
        $position = $Positions[$i]
        $frame = $Frames[$i % $Frames.Count]
        Draw-ShadowedImage -Graphics $Graphics -Image $frame `
            -X $position.X -Y $position.Y -Width $position.Size -Height $position.Size `
            -ShadowOffsetX ($position.Size * 0.06) -ShadowOffsetY ($position.Size * 0.08) -ShadowAlpha 0.22
    }
}

# Banner 1280x720
$banner = New-Bitmap -Width 1280 -Height 720
$gBanner = [System.Drawing.Graphics]::FromImage($banner)
Set-Quality -Graphics $gBanner
Draw-SceneBase -Graphics $gBanner -Width 1280 -Height 720
Draw-ShadowedImage -Graphics $gBanner -Image $sunburst -X -40 -Y -70 -Width 560 -Height 560 -ShadowOffsetX 0 -ShadowOffsetY 0 -ShadowAlpha 0
Draw-ShadowedImage -Graphics $gBanner -Image $grid -X 776 -Y 164 -Width 372 -Height 372 -ShadowOffsetX 18 -ShadowOffsetY 22 -ShadowAlpha 0.24
Draw-ShadowedImage -Graphics $gBanner -Image $logo -X 86 -Y 70 -Width 500 -Height 312 -ShadowOffsetX 12 -ShadowOffsetY 14 -ShadowAlpha 0.2
Draw-ShadowedImage -Graphics $gBanner -Image $playButton -X 112 -Y 458 -Width 286 -Height 152 -ShadowOffsetX 10 -ShadowOffsetY 12 -ShadowAlpha 0.2

$bannerPositions = @(
    @{ X = 620; Y = 120; Size = 126 },
    @{ X = 1012; Y = 96; Size = 118 },
    @{ X = 584; Y = 440; Size = 120 },
    @{ X = 1036; Y = 470; Size = 120 },
    @{ X = 458; Y = 490; Size = 132 }
)
Draw-Animals -Graphics $gBanner -Frames $animalFrames -Positions $bannerPositions

$bannerShade = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(38, 18, 65, 24))
$gBanner.FillRectangle($bannerShade, 0, 620, 1280, 100)
$bannerShade.Dispose()
$gBanner.Dispose()
Save-Png -Bitmap $banner -Path (Join-Path $outputRoot "banner.png")

# Thumbnail 600x600
$thumbnail = New-Bitmap -Width 600 -Height 600
$gThumb = [System.Drawing.Graphics]::FromImage($thumbnail)
Set-Quality -Graphics $gThumb
Draw-SceneBase -Graphics $gThumb -Width 600 -Height 600
Draw-ShadowedImage -Graphics $gThumb -Image $sunburst -X 36 -Y 0 -Width 360 -Height 360 -ShadowOffsetX 0 -ShadowOffsetY 0 -ShadowAlpha 0
Draw-ShadowedImage -Graphics $gThumb -Image $grid -X 168 -Y 220 -Width 264 -Height 264 -ShadowOffsetX 10 -ShadowOffsetY 14 -ShadowAlpha 0.22
Draw-ShadowedImage -Graphics $gThumb -Image $logo -X 64 -Y 34 -Width 472 -Height 296 -ShadowOffsetX 8 -ShadowOffsetY 10 -ShadowAlpha 0.18
Draw-ShadowedImage -Graphics $gThumb -Image $playButton -X 184 -Y 430 -Width 232 -Height 124 -ShadowOffsetX 8 -ShadowOffsetY 10 -ShadowAlpha 0.2

$thumbPositions = @(
    @{ X = 54; Y = 332; Size = 96 },
    @{ X = 140; Y = 468; Size = 92 },
    @{ X = 396; Y = 344; Size = 92 },
    @{ X = 448; Y = 468; Size = 92 },
    @{ X = 280; Y = 500; Size = 88 }
)
Draw-Animals -Graphics $gThumb -Frames $animalFrames -Positions $thumbPositions
Draw-Gloss -Graphics $gThumb -Width 600 -Height 600
$gThumb.Dispose()
Save-Png -Bitmap $thumbnail -Path (Join-Path $outputRoot "thumbnail.png")

# Icon 512x512
$icon = New-Bitmap -Width 512 -Height 512
$gIcon = [System.Drawing.Graphics]::FromImage($icon)
Set-Quality -Graphics $gIcon

$iconBackground = New-LinearBrush -Width 512 -Height 512 `
    -StartColor ([System.Drawing.Color]::FromArgb(255, 171, 214, 247)) `
    -EndColor ([System.Drawing.Color]::FromArgb(255, 101, 195, 88))
$gIcon.FillRectangle($iconBackground, 0, 0, 512, 512)
$iconBackground.Dispose()
Draw-CoverImage -Graphics $gIcon -Image $background -Destination ([System.Drawing.RectangleF]::new(0, 18, 512, 476))
Draw-ShadowedImage -Graphics $gIcon -Image $sunburst -X 18 -Y 18 -Width 336 -Height 336 -ShadowOffsetX 0 -ShadowOffsetY 0 -ShadowAlpha 0
Draw-ShadowedImage -Graphics $gIcon -Image $loadingLogo -X 34 -Y 30 -Width 444 -Height 444 -ShadowOffsetX 10 -ShadowOffsetY 12 -ShadowAlpha 0.18
Draw-Gloss -Graphics $gIcon -Width 512 -Height 512
Draw-RoundedBorder -Graphics $gIcon -Width 512 -Height 512 -Radius 76 `
    -StrokeColor ([System.Drawing.Color]::FromArgb(160, 255, 255, 255)) -StrokeWidth 8
$gIcon.Dispose()
Save-Png -Bitmap $icon -Path (Join-Path $outputRoot "icon.png")

foreach ($frame in $animalFrames) {
    $frame.Dispose()
}
$background.Dispose()
$sunburst.Dispose()
$logo.Dispose()
$grid.Dispose()
$woodTop.Dispose()
$playButton.Dispose()
$sheet2.Dispose()
$sheet3.Dispose()
$dotSheet.Dispose()
$loadingLogo.Dispose()
