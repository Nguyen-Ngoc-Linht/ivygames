# -*- coding: utf-8 -*-
"""Upload 29 game bổ sung lên API"""
import json
import urllib.request
import urllib.error
import time

TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6IjA5NjQ0OTk1ODciLCJsb2dpblR5cGUiOjEsImlkIjoxLCJlbWFpbCI6InN1cGVyYWRtaW4wMUBnbWFpbC5jb20iLCJzdGF0dXMiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzgyNjk1NTgxLCJleHAiOjE3ODI3ODE5ODF9.J5RzTIMkbMHnZEObFTFlWr1bZXqTiN3iSZNfPThYGLJLlKGkfqMqdB_S8kt5d6KQkTa59b1hf-T_Wx7D6dCDWA"
API_URL = "http://115.146.123.250:9085/api/game"

with open("list-game-bosung.json", "r", encoding="utf-8") as f:
    data = json.load(f)

games = data["list_games"]
total = len(games)
print(f"Total games to upload: {total}")
print("=" * 60)

success = 0
failed = 0

for i, game in enumerate(games):
    name = game["name"]
    payload = json.dumps(game, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + TOKEN,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8")
            status = resp.status
            print(f"[{i+1}/{total}] OK   - {name:25s} | {status} | {body[:150]}")
            success += 1
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"[{i+1}/{total}] FAIL - {name:25s} | {e.code} | {body[:150]}")
        failed += 1
    except Exception as e:
        print(f"[{i+1}/{total}] ERR  - {name:25s} | {str(e)[:150]}")
        failed += 1

    time.sleep(0.3)

print("=" * 60)
print(f"Done! Success: {success}, Failed: {failed}")
