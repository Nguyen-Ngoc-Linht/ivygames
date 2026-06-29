import json
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Read existing JSON
with open(r'D:\NgocLinh\snapgame\ivygames\list_games.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Category mapping based on game analysis:
# 1: Giải đố (Puzzle) - Match-3, Bubble Shooter, Math, logic
# 2: Hành động (Action) - Flappy, Jump, Run, Shoot, Destroy
# 3: Thể thao (Sports)
# 4: Mini Games - Mini game collections
# 5: Chiến thuật (Strategy)
# 6: Đua xe (Racing) - Car, Boat, Traffic
# 7: Giải trí (Entertainment/Casual) - Balloon, Flip, Touch, Color
# 8: Âm nhạc (Music)
# 9: Chiến đấu (Combat)
# 10: Nhập vai (RPG)
# 11: Mô phỏng (Simulation)
# 12: Phiêu lưu (Adventure) - Mine, Tomb exploration

category_map = {
    # === 1: Giải đố (Puzzle) - Match-3, Bubble, Math, Logic ===
    "collect-the-fruits": 7,        # Thu thập trái cây -> Giải trí
    "blast-the-balloons": 2,        # Nổ bóng -> Hành động
    "space-game": 2,                # Game không gian -> Hành động
    "ninja-ballance": 2,            # Ninja giữ thăng bằng -> Hành động
    "blow-up-the-balloons": 7,      # Thổi bóng -> Giải trí
    "handless-millionaire": 7,      # Triệu phú -> Giải trí
    "move-the-balloon-safely": 1,   # Di chuyển bóng an toàn -> Giải đố
    "stack-jump": 2,                # Nhảy chồng -> Hành động
    "red-indian": 4,                # Red Indian -> Mini Games (thư mục Mini-Games)
    "drop-an-apple": 1,             # Thả táo -> Giải đố (physics puzzle)
    "drive-safe": 4,                # Lái xe an toàn -> Mini Games (thư mục Mini-Games)
    "ninja-jump": 4,                # Ninja nhảy -> Mini Games (thư mục Mini-Games)
    "halloween-bubble-shooter": 1,  # Bắn bong bóng -> Giải đố
    "balloon": 7,                   # Bóng bay -> Giải trí
    "shoot-to-apple": 2,            # Bắn táo -> Hành động
    "traffic": 6,                   # Giao thông -> Đua xe
    "choose-correct-fruit": 1,      # Chọn trái cây đúng -> Giải đố
    "match-the-boxes": 1,           # Ghép hộp -> Giải đố
    "take-off-the-rocket": 2,       # Phóng tên lửa -> Hành động
    "destroy-the-target": 2,        # Phá hủy mục tiêu -> Hành động
    "stick-soldier": 2,             # Lính gậy -> Hành động
    "candy-match-3": 1,             # Match-3 kẹo -> Giải đố
    "touch-ball": 7,                # Chạm bóng -> Giải trí
    "cartoon-candy": 1,             # Match-3 kẹo hoạt hình -> Giải đố
    "animals-crash-match-3": 1,     # Match-3 động vật -> Giải đố
    "bubble-shooter": 1,            # Bắn bong bóng -> Giải đố
    "halloween-match-3": 1,         # Match-3 Halloween -> Giải đố
    "lollipops-match-3": 1,         # Match-3 kẹo mút -> Giải đố
    "christmas-match-3": 1,         # Match-3 Giáng Sinh -> Giải đố
    "boat-rush-game": 6,            # Đua thuyền -> Đua xe
    "bottle-flip": 7,               # Lật chai -> Giải trí
    "bouncing-ball": 2,             # Bóng nảy -> Hành động
    "bubble-pet-sage": 1,           # Bubble thú cưng -> Giải đố
    "car-racing": 6,                # Đua xe -> Đua xe
    "circle-pong": 7,               # Pong tròn -> Giải trí
    "block-it": 1,                  # Chặn -> Giải đố
    "freaky-math": 1,               # Toán -> Giải đố
    "cars": 6,                      # Xe -> Đua xe
    "super-cow-jet": 2,             # Bò bay -> Hành động
    "color-pump": 7,                # Bơm màu -> Giải trí
    "flappy-color-ball": 2,         # Flappy bóng -> Hành động
    "flappy-color-birds": 2,        # Flappy chim -> Hành động
    "flappy-dove": 2,               # Flappy bồ câu -> Hành động
    "flapcat-copters": 2,           # Mèo bay -> Hành động
    "flapcat-halloween": 2,         # Mèo Halloween -> Hành động
    "gravity-ball": 2,              # Bóng trọng lực -> Hành động
    "math-genius": 1,               # Toán -> Giải đố
    "mine-rusher": 12,              # Hầm mỏ -> Phiêu lưu
    "monster-run": 2,               # Quái vật chạy -> Hành động
    "rocket-space": 2,              # Tên lửa -> Hành động
    "running-ninja": 2,             # Ninja chạy -> Hành động
    "sling-tomb": 12,               # Lăng mộ -> Phiêu lưu
    "zigzag-ball": 2,               # ZigZag bóng -> Hành động
    "zigzag-color": 2,              # ZigZag màu -> Hành động
}

# Category names for logging
category_names = {
    1: "Giải đố",
    2: "Hành động",
    3: "Thể thao",
    4: "Mini Games",
    5: "Chiến thuật",
    6: "Đua xe",
    7: "Giải trí",
    8: "Âm nhạc",
    9: "Chiến đấu",
    10: "Nhập vai",
    11: "Mô phỏng",
    12: "Phiêu lưu"
}

# Update each game
updated_count = 0
for game in data["list_games"]:
    slug = game["slug"]
    if slug in category_map:
        cat_id = category_map[slug]
        game["categoryId"] = cat_id
        game["categoryIds"] = [cat_id]
        updated_count += 1
        print(f'  {game["name"]:30s} -> {cat_id} ({category_names[cat_id]})')
    else:
        print(f'  WARNING: No category mapping for slug: {slug}')

# Write updated JSON
with open(r'D:\NgocLinh\snapgame\ivygames\list_games.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f'\nUpdated {updated_count}/{len(data["list_games"])} games')

# Summary by category
from collections import Counter
cats = Counter(category_map.values())
print('\n--- Category Summary ---')
for cat_id, count in sorted(cats.items()):
    print(f'  {cat_id:2d} ({category_names[cat_id]:12s}): {count} games')
