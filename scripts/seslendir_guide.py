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

# Ergun'un Playground'da seçtiği doğal ton (daha canlı, biraz yavaş, hafif style).
MODEL_ID = os.environ.get("YAMA_MODEL", "eleven_multilingual_v2")
VS_STABILITY = float(os.environ.get("YAMA_STABILITY", "0.42"))
VS_SIMILARITY = float(os.environ.get("YAMA_SIMILARITY", "0.52"))
VS_STYLE = float(os.environ.get("YAMA_STYLE", "0.12"))
VS_SPEED = float(os.environ.get("YAMA_SPEED", "0.93"))
VS_BOOST = os.environ.get("YAMA_SPEAKER_BOOST", "1") not in ("0", "false", "False")

if not API_KEY or not VOICE_ID:
    print("HATA: ELEVENLABS_API_KEY ve ELEVENLABS_VOICE_ID ortam degiskenleri gerekli.")
    sys.exit(1)

# ---- Türkçe "okunuş" düzeltici (ekrandaki metin değişmez, sadece sese giden hali) ----
# Sayıları/yılları kelimeye çevirir, "I." -> "Birinci", "14." -> "on dördüncü",
# "Chora" -> "Kora" gibi okunuş düzeltmeleri yapar.
NORMALIZE = os.environ.get("YAMA_NORMALIZE", "1") not in ("0", "false", "False")
_PRON = {"Chora": "Kora", "chora": "kora", "Phaselis": "Faselis", "Khimaira": "Kimera"}
_UNITS = {"km": "kilometre", "cm": "santimetre", "mm": "milimetre", "kg": "kilogram",
          "ha": "hektar", "m²": "metrekare", "m2": "metrekare", "m3": "metreküp", "m": "metre"}
_ROMAN = {"I": "Birinci", "II": "İkinci", "III": "Üçüncü", "IV": "Dördüncü", "V": "Beşinci",
          "VI": "Altıncı", "VII": "Yedinci", "VIII": "Sekizinci", "IX": "Dokuzuncu", "X": "Onuncu"}
_ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']
_TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan']
_ORD_LAST = {'bir': 'birinci', 'iki': 'ikinci', 'üç': 'üçüncü', 'dört': 'dördüncü', 'beş': 'beşinci',
             'altı': 'altıncı', 'yedi': 'yedinci', 'sekiz': 'sekizinci', 'dokuz': 'dokuzuncu', 'on': 'onuncu',
             'yirmi': 'yirminci', 'otuz': 'otuzuncu', 'kırk': 'kırkıncı', 'elli': 'ellinci', 'altmış': 'altmışıncı',
             'yetmiş': 'yetmişinci', 'seksen': 'sekseninci', 'doksan': 'doksanıncı', 'yüz': 'yüzüncü', 'bin': 'bininci'}


def _three(n):
    s = []; h = n // 100; t = (n % 100) // 10; o = n % 10
    if h:
        s.append('yüz' if h == 1 else _ONES[h] + ' yüz')
    if t:
        s.append(_TENS[t])
    if o:
        s.append(_ONES[o])
    return ' '.join(s)


def _num2tr(n):
    if n == 0:
        return 'sıfır'
    parts = []
    for val, name in ((1000000, 'milyon'), (1000, 'bin')):
        q = n // val
        if q:
            parts.append('bin' if (val == 1000 and q == 1) else _three(q) + ' ' + name)
            n %= val
    if n:
        parts.append(_three(n))
    return ' '.join(parts).strip()


def _ordinal(n):
    w = _num2tr(n).split()
    w[-1] = _ORD_LAST.get(w[-1], w[-1] + 'ıncı')
    return ' '.join(w)


def humanize_tr(t):
    import re
    t = re.sub(r'\bMÖ\b', 'milattan önce', t)
    t = re.sub(r'\bMS\b', 'milattan sonra', t)
    for a, b in _PRON.items():
        t = re.sub(r'\b' + re.escape(a) + r'\b', b, t)
    t = re.sub(r'\b(VIII|VII|VI|IV|IX|III|II|I|V|X)\.(?=\s+[A-ZÇĞİÖŞÜ])', lambda m: _ROMAN[m.group(1)], t)
    t = re.sub(r'(\d+)\.(\s+)(?=[a-zçğıöşü])', lambda m: _ordinal(int(m.group(1))) + m.group(2), t)
    # birim kısaltmaları: "71 m" -> "71 metre", "12 km" -> "12 kilometre" (sayı sonradan kelimeye çevrilir)
    t = re.sub(r'(\d+)\s*(km|cm|mm|kg|ha|m²|m2|m3|m)(?![a-zçğıöşüA-ZÇĞİÖŞÜ0-9])',
               lambda m: m.group(1) + ' ' + _UNITS[m.group(2)], t)
    t = re.sub(r'(\d+)\s*[-–]\s*(\d+)', lambda m: _num2tr(int(m.group(1))) + ' ile ' + _num2tr(int(m.group(2))), t)
    t = re.sub(r"(\d+)'(\w+)", lambda m: _num2tr(int(m.group(1))) + m.group(2), t)
    t = re.sub(r'\d+', lambda m: _num2tr(int(m.group(0))), t)
    return t

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
            if NORMALIZE and lang == "tr":
                text = humanize_tr(text)
            key = f"{rid}-{pid}-{lang}"
            out = os.path.join(OUT_DIR, key + ".mp3")
            if os.path.exists(out) and not FORCE:
                skipped += 1
                continue

            print(f"Uretiliyor: {key}  ({len(text)} karakter)")
            body = {
                "text": text,
                "model_id": MODEL_ID,
                "voice_settings": {
                    "stability": VS_STABILITY,
                    "similarity_boost": VS_SIMILARITY,
                    "style": VS_STYLE,
                    "use_speaker_boost": VS_BOOST,
                    "speed": VS_SPEED,
                },
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
