param(
    [string]$JsonPath = ".\list_games.json",
    [string]$ApiUrl = "http://115.146.123.250:9085/api/game",
    [string]$Token,
    [string]$ReportPath = ".\post-games-report.json"
)

$ErrorActionPreference = "Stop"

if (-not $Token) {
    throw "Token is required."
}

if (-not (Test-Path -LiteralPath $JsonPath)) {
    throw "JSON file not found: $JsonPath"
}

$raw = Get-Content -LiteralPath $JsonPath -Raw -Encoding UTF8
$payload = $raw | ConvertFrom-Json

if (-not $payload.list_games) {
    throw "Expected property 'list_games' was not found in $JsonPath"
}

$headers = @{
    Authorization = "Bearer $Token"
    Accept = "application/json"
}

$games = @($payload.list_games)
$results = New-Object System.Collections.Generic.List[object]
$index = 0

foreach ($game in $games) {
    $index++
    $name = if ($game.name) { [string]$game.name } else { "Game-$index" }
    $slug = if ($game.slug) { [string]$game.slug } else { "" }
    $body = $game | ConvertTo-Json -Depth 20

    try {
        $response = Invoke-RestMethod -Method Post -Uri $ApiUrl -Headers $headers -ContentType "application/json; charset=utf-8" -Body $body
        $results.Add([pscustomobject]@{
            index = $index
            name = $name
            slug = $slug
            ok = $true
            response = $response
            error = $null
        })
        Write-Host ("[{0}/{1}] OK   {2}" -f $index, $games.Count, $name)
    }
    catch {
        $statusCode = $null
        $responseBody = $null

        if ($_.Exception.Response) {
            try { $statusCode = [int]$_.Exception.Response.StatusCode } catch {}
            try {
                $stream = $_.Exception.Response.GetResponseStream()
                if ($stream) {
                    $reader = New-Object System.IO.StreamReader($stream)
                    $responseBody = $reader.ReadToEnd()
                    $reader.Dispose()
                }
            } catch {}
        }

        $results.Add([pscustomobject]@{
            index = $index
            name = $name
            slug = $slug
            ok = $false
            response = $null
            statusCode = $statusCode
            error = $_.Exception.Message
            responseBody = $responseBody
        })
        Write-Host ("[{0}/{1}] FAIL {2}" -f $index, $games.Count, $name)
    }
}

$summary = [pscustomobject]@{
    apiUrl = $ApiUrl
    total = $games.Count
    success = @($results | Where-Object { $_.ok }).Count
    failed = @($results | Where-Object { -not $_.ok }).Count
    results = $results
}

$summary | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
Write-Host ("Completed. Success: {0}, Failed: {1}, Report: {2}" -f $summary.success, $summary.failed, $ReportPath)
