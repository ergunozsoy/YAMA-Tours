/* ==========================================================================
   YAMA KÜLTÜR - ANA VERİ HAVUZU VE DİL DESTEĞİ
   ========================================================================== */

// 1. Dil Çevirileri
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

// 2. Dinamik Rotalar Listesi
const routes = [
  {
    id: "anadolu-medeniyetleri",
    title: "Anadolu Medeniyetleri Müzesi",
    region: "İç Anadolu · Ankara",
    image: "" 
  }
];

// 3. YAMA Dijital Sesli Rehber İçerik Havuzu
const yamaGuides = {
  "anadolu-medeniyetleri": {
    title: "Anadolu Medeniyetleri Müzesi",
    location: "📍 Ulus, Ankara",
    content: `
      <p style="color: var(--gold); font-weight: 600; margin-bottom: 15px;">YAMA DNA · Anadolu'yu Anlamaya Açılan Kapı</p>
      <p>Anadolu Medeniyetleri Müzesi yalnızca eserlerin sergilendiği bir müze değildir. Burası, Anadolu'nun yaklaşık on bin yıllık kültürel hafızasının bir araya geldiği eşsiz bir zaman yolculuğudur. Bu müzeyi gezen bir ziyaretçi yalnızca taşları, heykelleri veya çanak çömlekleri görmez; binlerce yıl boyunca bu topraklarda yaşamış insanların düşünce dünyasına, gündelik hayatına, inançlarına ve üretim biçimlerine tanıklık eder.</p>
      <p>YAMA Guide için bu müze özel bir başlangıç noktasıdır. Çünkü Anadolu'nun farklı bölgelerinde göreceğimiz Hitit kentleri, Frig yerleşimleri, Neolitik köyler ve Roma şehirleri önce burada birbirleriyle ilişki içinde anlaşılabilir. Daha sonra yapılacak her gezi bu temel bilgi üzerine inşa edilir.</p>
      
      <div class="audio-player-container">
        <span class="guide-badge">Express Guide (2 Dakika)</span>
        <audio controls src="rehber/ic-anadolu/ankara/anadolu-medeniyetleri-muzesi.mp3"></audio>
      </div>

      <h3>Müze Hakkında</h3>
      <p>Anadolu Medeniyetleri Müzesi'ne hoş geldiniz. Şimdi birlikte yalnızca bir müzeyi değil, insanlığın en eski kültür coğrafyalarından birini keşfetmeye başlayacağız. Bulunduğunuz müze, Anadolu'da Paleolitik Çağ'dan başlayarak Hititlere, Friglere, Urartulara ve daha birçok uygarlığa ait eserleri kronolojik bir düzen içinde bir araya getirir. Burada sergilenen taş baltalar, mühürler, tabletler, heykeller ve günlük kullanım eşyaları yalnızca arkeolojik buluntular değildir; binlerce yıl önce yaşamış insanların gündelik hayatlarının sessiz tanıklarıdır.</p>
      <p>Müze binasının kendisi de ayrı bir tarihî değere sahiptir. Osmanlı dönemine ait Mahmut Paşa Bedesteni ile Kurşunlu Han'ın restore edilmesiyle oluşturulan bu yapı, geçmiş ile bugünü aynı çatı altında buluşturur.</p>
      <p>Müzeyi gezerken yalnızca büyük heykellere değil, küçük ayrıntılara da dikkat edin. Bir çivi yazılı tablet, küçük bir mühür ya da basit görünen bir seramik parçası, bazen bütün bir uygarlığın yaşam biçimi hakkında çok önemli bilgiler verebilir.</p>
      <p>Bu yolculuğun sonunda Anadolu'ya artık yalnızca bir coğrafya olarak değil, binlerce yıl boyunca farklı toplumların ortak hafızasını taşıyan büyük bir kültür sahnesi olarak bakmaya başlayacaksınız.</p>
      
      <blockquote style="border-left: 3px solid var(--gold); padding-left: 15px; margin: 20px 0; font-style: italic; color: var(--muted);">"Bir müzeyi değil, insanlığın hafızasını geziyorsunuz."</blockquote>
      
      <h3>İlk Bakış</h3>
      <p>Müzenin kapısından içeri girmeden önce çevrenize bakın. Bulunduğunuz Ulus semti, Ankara'nın en eski yerleşim alanlarından biridir. Birkaç yüz metre içerisinde Roma Hamamı, Augustus Tapınağı, Hacı Bayram Veli Camii, Ankara Kalesi ve Cumhuriyet'in ilk yıllarına ait yapılar yan yana bulunur. Bu nedenle Anadolu Medeniyetleri Müzesi yalnızca koleksiyonuyla değil, bulunduğu çevreyle de Anadolu tarihinin katmanlarını bir araya getirir.</p>

      <h3>YAMA Insight</h3>
      <p>Çoğu ziyaretçi bu müzeye eski eserleri görmek için gelir. Ancak YAMA Guide size farklı bir öneride bulunuyor. Müzeyi gezerken her esere şu soruyu sorun: <strong>"Bunu yapan insan nasıl bir dünyada yaşıyordu?"</strong> İşte bu soru, taşları yeniden konuşturmaya başlar.</p>

      <h3>Küçük Bir Efsane</h3>
      <p>Anadolu'da halk arasında sıkça söylenen bir söz vardır: <em>"Bu topraklarda kazmayı nereye vursan tarih çıkar."</em> Bu ifade tarihî bir belge değildir; ancak Anadolu'nun katmanlı geçmişini anlatan güçlü bir halk söylemidir. Arkeolojik açıdan elbette her yerde eser bulunmaz; fakat Anadolu'nun çok uzun ve zengin yerleşim tarihi nedeniyle pek çok bölgede farklı dönemlere ait kalıntılar ortaya çıkarılmıştır. Bu söz de işte bu zengin kültürel hafızayı mecazi bir biçimde dile getirir.</p>

      <h3>Bugün Neden Önemli?</h3>
      <p>Türkiye'nin dört bir yanında göreceğimiz Hattuşa, Alacahöyük, Çatalhöyük, Kültepe, Gordion, Troya, Efes, Bergama ve daha birçok tarihî alanı anlamanın en iyi yollarından biri önce Anadolu Medeniyetleri Müzesi'ni gezmektir. Bu müze bir başlangıç noktasıdır. Buradan sonra Anadolu'nun geri kalanı çok daha anlaşılır hâle gelir.</p>

      <h3>YAMA Connections</h3>
      <p>Bu müzeyi gezdikten sonra şu rotalar önerilir:</p>
      <p style="color: var(--gold); font-size: 0.95rem; line-height: 1.8;">
        🏛️ Hattuşa &nbsp;&nbsp; 🏺 Alacahöyük &nbsp;&nbsp; 🌾 Çatalhöyük &nbsp;&nbsp; 📜 Kültepe (Kaniş)<br>
        👑 Gordion &nbsp;&nbsp; ⚔️ Troya &nbsp;&nbsp; 🏺 Göbeklitepe &nbsp;&nbsp; 🦅 Nemrut Dağı &nbsp;&nbsp; 🏛️ Efes &nbsp;&nbsp; 🏺 Bergama
      </p>
    `
  }
};

/* ==========================================================================
   UYGULAMA MOTORU VE TETİKLEYİCİLER
   ========================================================================== */

// Sayfa Yüklendiğinde Çalışacak İşlemler
document.addEventListener("DOMContentLoaded", () => {
  renderRoutes();
  setupLanguageButtons();
});

// Rotaları Ekrana Basan Fonksiyon
function renderRoutes() {
  const routeGrid = document.getElementById("routeGrid");
  if (!routeGrid) return;

  routeGrid.innerHTML = routes.map(route => `
    <div class="route-card" onclick="openGuide('${route.id}')">
      <div class="route-img" style="background-image: url('${route.image}'); background-size: cover; background-position: center;"></div>
      <div class="route-info">
        <h3>${route.title}</h3>
        <p>${route.region}</p>
        <button class="btn primary" style="margin-top: 15px; width: 100%; font-size: 0.9rem; padding: 0.5rem;" onclick="event.stopPropagation(); openGuide('${route.id}')">
          🎧 Sesli Rehberi Aç
        </button>
      </div>
    </div>
