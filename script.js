/* ==========================================================================
   YAMA KÜLTÜR - ANA VERİ HAVUZU VE DİL DESTEĞİ
   ========================================================================== */

// 1. Dil Çevirileri (Sizin orijinal yapınız eksiksiz tamamlanmıştır)
const translations = {
  tr: {
    navTurkey: "Türkiye", navRoutes: "Tematik Rotalar", heroEyebrow: "Sadece meraklılar için",
    heroTitle: "İnsanın ayak izinde zamanda yolculuk", heroText: "YAMA Kültür; okuyarak gezenler, gezerek düşünenler ve bir yerin yalnızca fotoğrafını değil, hafızasını da görmek isteyenler için tasarlanmış kültür platformudur.",
    startExplore: "Keşfetmeye başla", seeStandard: "Araştırma standardı", quote: "“Çok okuyan mı bilir, çok gezen mi? Bizim cevabımız: okuyarak gezen bilir.”",
    introText: "YAMA Kültür, turizmi hızlı tüketimden çıkarıp tarih, edebiyat, arkeoloji, mimari, dil ve insan hikâyeleriyle zenginleşen bir keşif biçimine dönüştürmeyi amaçlar.",
    whyTitle: "Kültür turizmi için yeni bir standart", why1Title: "Akademik temelli", why1Text: "İçerikler hakemli yayınlar, açık erişimli kaynaklar ve birincil belgelerle desteklenir.",
    why2Title: "Katmanlı rotalar", why2Text: "Bir mekân yalnızca gösterilmez; zaman içindeki dönüşümüyle okunur.",
    why3Title: "Üç dilli", why3Text: "Türkçe, Almanca ve İngilizce içerik mimarisiyle uluslararası erişim hedeflenir.",
    why4Title: "AI destekli", why4Text: "Yapay zekâ araştırmayı hızlandırır; kaynaksız bilgi üretmez.",
    why5Title: "Şeffaf kaynaklar", why5Text: "Her önemli içerikte kullanılan kaynaklar ve güven düzeyi gösterilir.",
    turkeyTitle: "Türkiye rotaları", themesTitle: "Medeniyetlerin, yolların ve seyyahların izinde",
    timeTitle: "Aynı mekânı farklı zamanlarda keşfet", researchTitle: "Ucuz bilgi değil, kaynaklı bilgi",
    libraryTitle: "Dijital kültür kütüphanesi", academyTitle: "Gezi öncesi kısa öğrenme modülleri",
    journalTitle: "Haftalık kültür notları", openGuideBtn: "Sesli Rehberi Aç"
  },
  en: {
    navTurkey: "Turkey", navRoutes: "Thematic Routes", heroEyebrow: "Only for the curious",
    heroTitle: "Time travel in the footsteps of humanity", heroText: "YAMA Culture is a cultural platform designed for those who travel by reading, think by traveling, and want to see the memory of a place, not just its picture.",
    startExplore: "Start exploring", seeStandard: "Research standard", quote: "“Does the one who reads much know, or the one who travels much? Our answer: the one who travels by reading knows.”",
    introText: "YAMA Culture aims to remove tourism from fast consumption and transform it into a form of discovery enriched by history, literature, archaeology, architecture, language, and human stories.",
    whyTitle: "A new standard for cultural tourism", why1Title: "Academic based", why1Text: "Contents are supported by peer-reviewed publications, open-access resources, and primary documents.",
    why2Title: "Layered routes", why2Text: "A place is not just shown; it is read through its transformation over time.",
    why3Title: "Trilingual", why3Title: "International accessibility is aimed with Turkish, German, and English content architecture.",
    why4Title: "AI supported", why4Text: "Artificial intelligence accelerates research; does not produce sourceless information.",
    why5Title: "Transparent sources", why5Text: "Sources used and confidence levels are shown for every major content.",
    turkeyTitle: "Turkey routes", themesTitle: "In the footsteps of civilizations, roads, and travelers",
    timeTitle: "Discover the same place at different times", researchTitle: "Not cheap information, sourced information",
    libraryTitle: "Digital culture library", academyTitle: "Short pre-trip learning modules",
    journalTitle: "Weekly culture notes", openGuideBtn: "Open Audio Guide"
  }
};

// 2. Orijinal Rotalar Listesi (Tüm fotoğraflarınız, durak ve kaynak sayılarınız eksiksiz geri getirilmiştir)
const routes = [
  {
    id: "istanbul",
    title: "İstanbul",
    region: "İmparatorluklar, limanlar, geçişler",
    image: "https://unsplash.com",
    stats: "24 durak · 32 kaynak · ★★★★"
  },
  {
    id: "kapadokya",
    title: "Kapadokya",
    region: "Taş, inanç, yeraltı ve zaman",
    image: "https://unsplash.com",
    stats: "18 durak · 21 kaynak · ★★★"
  },
  {
    id: "efes-bergama",
    title: "Efes · Bergama",
    region: "Antik dünya ve Akdeniz hafızası",
    image: "https://unsplash.com",
    stats: "16 durak · 28 kaynak · ★★★★"
  },
  {
    id: "gobeklitepe",
    title: "Göbeklitepe",
    region: "İlk yerleşimler ve ritüel alanları",
    image: "https://unsplash.com",
    stats: "9 durak · 19 kaynak · ★★★★"
  },
  {
    id: "karadeniz",
    title: "Karadeniz",
    region: "Dağ, göç, yol ve hafıza",
    image: "https://unsplash.com",
    stats: "20 durak · 17 kaynak · ★★★"
  },
  {
    id: "mardin",
    title: "Mardin",
    region: "Taş şehir, diller ve dinler",
    image: "https://unsplash.com",
    stats: "14 durak · 22 kaynak · ★★★★"
  },
  {
    id: "anadolu-medeniyetleri",
    title: "Anadolu Medeniyetleri Müzesi",
    region: "İç Anadolu · Ankara",
    image: "https://unsplash.com",
    stats: "Başlangıç Rotası · 15 kaynak · ★★★★★"
  }
];

// 3. YAMA Dijital Sesli Rehber İçerik Havuzu (Pop-up Katmanı)
const yamaGuides = {
  "anadolu-medeniyetleri": {
    title: "Anadolu Medeniyetleri Müzesi",
    location: "📍 Ulus, Ankara",
    content: `
      <p style="color: var(--gold); font-weight: 600; margin-bottom: 15px;">YAMA DNA · Anadolu'yu Anlamaya Açılan Kapı</p>
      <p>Anadolu Medeniyetleri Müzesi yalnızca eserlerin sergilendiği bir müze değildir. Burası, Anadolu'nun yaklaşık on bin yıllık kültürel hafızasının bir araya geldiği eşsiz bir zaman yolculuğudur. Bu müzeyi gezen bir ziyaretçi yalnızca taşları, heykelleri veya çanak çömlekleri görmez; binlerce yıl boyunca bu topraklarda yaşamış insanların düşünce dünyasına tanıklık eder.</p>
      
      <div class="audio-player-container" style="background: var(--bg2); padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid var(--gold);">
        <span class="guide-badge" style="background: var(--gold); color: #000; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px;">Express Guide (2 Dakika)</span>
        <audio controls src="rehber/ic-anadolu/ankara/anadolu-medeniyetleri-muzesi.mp3" style="width: 100%; margin-top: 10px;"></audio>
      </div>

      <h3>Müze Hakkında</h3>
      <p>Anadolu Medeniyetleri Müzesi'ne hoş geldiniz. Bulunduğunuz müze, Anadolu'da Paleolitik Çağ'dan başlayarak Hititlere, Friglere, Urartulara ve daha birçok uygarlığa ait eserleri kronolojik bir düzen içinde bir araya verir.</p>
      
      <blockquote style="border-left: 3px solid var(--gold); padding-left: 15px; margin: 20px 0; font-style: italic; color: var(--muted);">&ldquo;Bir müzeyi değil, insanlığın hafızasını geziyorsunuz.&rdquo;</blockquote>
    `
  }
};

/* ==========================================================================
   UYGULAMA MOTORU VE TETİKLEYİCİLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderRoutes();
  setupLanguageButtons();
});

function renderRoutes() {
  const routeGrid = document.getElementById("routeGrid");
  if (!routeGrid) return;

  routeGrid.innerHTML = routes.map(route => `
    <div class="route-card" onclick="openGuide('${route.id}')">
      <div class="route-img" style="background-image: url('${route.image}'); background-size: cover; background-position: center; height: 200px; position: relative;"></div>
      <div class="route-info" style="padding: 1.5rem;">
        <h3 style="margin: 0 0 .5rem;">${route.title}</h3>
        <p style="margin: 0; color: var(--muted); font-size: .9rem;">${route.region}</p>
        <p style="font-size: 0.8rem; color: var(--gold); margin-top: 10px; font-weight: 600;">${route.stats}</p>
      </div>
    </div>
  `).join('');
}

function openGuide(guideId) {
  const guide = yamaGuides[guideId];
  if (!guide) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <h2 style="color:#fff; font-size:28px; margin:0;">${guide.title}</h2>
    <p style="color: var(--muted); font-size: 14px; margin-top: 5px;">${guide.location}</p>
    <hr style="border: 0; border-top: 1px solid var(--line); margin: 15px 0;">
    <div style="color:var(--text); line-height:1.7;">${guide.content}</div>
  `;

  document.getElementById("guideModal").style.display = "flex";
}

function closeGuide() {
  const modal = document.getElementById("guideModal");
  const audio = modal.querySelector("audio");
  if (audio) {
    audio.pause();
  }
  modal.style.display = "none";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("guideModal");
  if (e.target === modal) closeGuide();
});

function setupLanguageButtons() {
  document.querySelectorAll(".langs button").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (translations[lang]) {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (translations[lang][key]) el.textContent = translations[lang][key];
        });
      }
    });
  });
}
