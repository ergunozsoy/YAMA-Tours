# AGENTS.md — Yapay zekâ yardımcıları için çalışma kuralları

Bu depoda çalışan her yardımcı (Claude, Codex/ChatGPT, Gemini/Antigravity ve diğerleri)
işe başlamadan önce bu dosyayı ve `GUNLUK.md` dosyasını okur.

## 1. Proje

- Ad: YAMA-Tours
- Sahibi: Dr. Ergün Özsoy (ad her yerde bu yazımla kalır; "Ergun" yapılmaz)
- Ne: (bir iki cümleyle projenin amacı — sahibi doldurur)
- Yayın: Bu depo herkese açıktır ve `main` dalı canlı siteyi günceller.

## 2. Asla yapılmayacaklar

- `--force` içeren hiçbir git komutu çalıştırılmaz (`push --force`, `reset --hard` dahil).
- Dosya veya klasör silinmez; kaldırılması gereken bir şey varsa önce sahibine sorulur.
- Depoya şunlar eklenmez: yayımlanmamış makale taslakları, telifli kaynak PDF'leri
  ve taramalar, kişisel ya da idari belgeler, parola ve API anahtarları.
- Proje klasörünün dışındaki hiçbir dosyaya dokunulmaz.
- İstenen işin dışında "iyileştirme" yapılmaz. Fark edilen başka sorunlar
  değiştirilmez, `GUNLUK.md` dosyasına not edilir.

## 3. Çalışma sırası

1. `git pull` ile güncel sürümü al.
2. `git status` temiz değilse dur ve sahibine haber ver.
3. Tek bir işi yap; işi küçük adımlara böl.
4. Değişikliği kontrol et (sayfa açılıyor mu, bağlantılar çalışıyor mu).
5. `git add` + `git commit` ile kaydet; mesaj Türkçe ve açıklayıcı olsun.
6. `GUNLUK.md` dosyasına kayıt düş.
7. `git push` yalnızca sahibi açıkça istediğinde yapılır (canlı siteyi günceller).

## 4. Roller

- Yazan yardımcı: değişikliği yapar ve kaydeder.
- Denetleyen yardımcı: dosyaları değiştirmez; bulduklarını `GUNLUK.md` içine
  rapor olarak yazar.
- Son karar her zaman proje sahibindedir.

## 5. İçerik kuralları

- Mevcut metinler, alıntılar ve kaynak gösterimleri sahibine sorulmadan
  yeniden yazılmaz veya kısaltılmaz.
- Emin olunmayan tarihsel ya da dilsel bilgi "doğrulanmadı" diye işaretlenir;
  tahmin, bilgi gibi sunulmaz.
- Çok dilli içerikte bir dildeki değişiklik diğer dillere de yansıtılır
  ya da eksik kaldığı `GUNLUK.md` içinde belirtilir.
