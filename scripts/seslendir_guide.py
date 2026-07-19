#!/usr/bin/env python3
"""
YAMA guide.html seslendirme betiği
-----------------------------------
places.json'daki her noktayı ElevenLabs ile SENIN klon sesinle mp3'e çevirir,
sesler/ klasörüne yazar ve sesler/manifest.json'u günceller.
guide.html bu manifeste bakıp hangi noktaların kendi sesiyle çalınacağını bilir.

KULLANIM (yerel):
    pip install requests
    export ELEVENLABS_API_KEY="..."          # ElevenLabs API anahtarın
    export ELEVENLABS_VOICE_ID="..."         # klonladığın sesin Voice ID'si
    export YAMA_LANGS="tr"                    # istersen "tr,de,en"
    python scripts/seslendir_guide.py

Var olan mp3'ler tekrar üretilmez (kota israfı olmasın). Baştan üretmek için:
    export YAMA_FORCE=1
"""
import os
import json
import sys
import shutil
import subprocess
import requests

# Ergun'un seçtiği "sıcak" ton: hafif gövde/bas + ufak tiz yumuşatma + seviye eşitleme.
SICAK_FILTER = ("bass=g=5:f=110:w=0.6, equalizer=f=180:t=q:w=1.2:g=2.5, "
                "treble=g=-1.5:f=5500, loudnorm=I=-16:TP=-1.5")
APPLY_EQ = os.environ.get("YAMA_EQ", "1") not in ("0", "false", "False")
FFMPEG = shutil.which("ffmpeg")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLACES = os.path.join(ROOT, "places.json")
OUT_DIR = os.path.join(ROOT, "sesler")
MANIFEST = os.path.join(OUT_DIR, "manifest.json")

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
# Ergun'un klon sesi (ElevenLabs "Ergun TR"). Ortam degiskeniyle degistirilebilir.
VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID") or "JuqrWTQM4Cgm58BilWSp"
LANGS = [x.strip() for x in os.environ.get("YAMA_LANGS", "tr").split(",") if x.strip()]
FORCE = os.environ.get("YAMA_FORCE", "") not in ("", "0", "false", "False")

if not API_KEY or not VOICE_ID:
    print("HATA: ELEVENLABS_API_KEY ve ELEVENLABS_VOICE_ID ortam degiskenleri gerekli.")
    sys.exit(1)

os.makedirs(OUT_DIR, exist_ok=True)
url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
params = {"output_format": "mp3_44100_128"}
headers = {"Accept": "audio/mpeg", "Content-Type": "application/json", "xi-api-key": API_KEY}

with open(PLACES, encoding="utf-8") as f:
    data = json.load(f)

made, skipped, failed = 0, 0, 0
for region in data["regions"]:
    rid = region["id"]
    for place in region["places"]:
        pid = place["id"]
        for lang in LANGS:
            name = place["name"].get(lang) or place["name"].get("tr", "")
            desc = place["desc"].get(lang) or place["desc"].get("tr", "")
            text = f"{name}. {desc}".strip()
            if not text or text == ".":
                continue
            key = f"{rid}-{pid}-{lang}"
            out = os.path.join(OUT_DIR, key + ".mp3")
            if os.path.exists(out) and not FORCE:
                skipped += 1
                continue

            print(f"Uretiliyor: {key}  ({len(text)} karakter)")
            body = {
                "text": text,
                "model_id": "eleven_multilingual_v2",
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
            }
            r = requests.post(url, params=params, json=body, headers=headers)
            if r.status_code == 200:
                if APPLY_EQ and FFMPEG:
                    tmp = out + ".raw.mp3"
                    with open(tmp, "wb") as af:
                        af.write(r.content)
                    proc = subprocess.run(
                        [FFMPEG, "-y", "-i", tmp, "-af", SICAK_FILTER, "-b:a", "128k", out],
                        capture_output=True,
                    )
                    try:
                        os.remove(tmp)
                    except OSError:
                        pass
                    if proc.returncode != 0:
                        with open(out, "wb") as af:
                            af.write(r.content)
                        print("  UYARI: EQ uygulanamadi, ham ses yazildi.")
                else:
                    if APPLY_EQ and not FFMPEG:
                        print("  UYARI: ffmpeg yok, 'sicak' EQ atlandi (ham ses).")
                    with open(out, "wb") as af:
                        af.write(r.content)
                made += 1
            else:
                print(f"  HATA {r.status_code}: {r.text[:200]}")
                failed += 1

# manifest = sesler/ icinde gercekten var olan mp3'lerin anahtarlari
keys = sorted(fn[:-4] for fn in os.listdir(OUT_DIR) if fn.endswith(".mp3"))
with open(MANIFEST, "w", encoding="utf-8") as mf:
    json.dump(keys, mf, ensure_ascii=False, indent=0)

print(f"\nBitti. Uretilen: {made}, atlanan: {skipped}, hatali: {failed}. Manifest: {len(keys)} kayit.")
if failed:
    sys.exit(1)
