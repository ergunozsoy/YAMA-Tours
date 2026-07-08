// YAMA Heritage Visual Dictionary — trilingual (TR/DE/EN)

const UI = {
  tr: {
    eyebrow: 'Visual Heritage Dictionary',
    lead: 'Türkiye\u2019de müze, ören yeri, kilise, cami, şehir kalıntısı ve mimari yapılarda sıkça karşılaşılan kavramları görsel, kısa ve anlaşılır biçimde tanımak için hazırlanmış kültürel sözlük.',
    search: 'Kavram ara: Anastasis, apsis, forum, mihrap...',
    allTitle: 'Tüm Kavramlar', allDesc: 'Bütün kültür ve dönemleri birlikte göster.',
    termsHead: 'Kavramlar', count: n => `${n} kavram gösteriliyor`,
    home: 'Ana Sayfa', dict: 'Sözlük',
    langOrigin: 'Dil / Köken', whatIs: 'Nedir?',
    recognize: 'Gezerken nasıl tanınır?', seen: 'Türkiye\u2019de nerelerde görülebilir?', related: 'İlgili kavramlar',
    loadError: 'dictionary.json yüklenemedi. Dosya yolunu kontrol edin.',
    footer: 'YAMA Heritage Visual Dictionary · Kişisel akademik-kültürel rehber projesi · Resmî kurumsal sayfa değildir.'
  },
  de: {
    eyebrow: 'Visual Heritage Dictionary',
    lead: 'Ein kulturelles Wörterbuch, um Begriffe, die in Museen, Ausgrabungsstätten, Kirchen, Moscheen und historischen Bauten der Türkei häufig begegnen, kurz und anschaulich kennenzulernen.',
    search: 'Begriff suchen: Anastasis, Apsis, Forum, Mihrab...',
    allTitle: 'Alle Begriffe', allDesc: 'Alle Kulturen und Epochen gemeinsam anzeigen.',
    termsHead: 'Begriffe', count: n => `${n} Begriffe angezeigt`,
    home: 'Startseite', dict: 'Wörterbuch',
    langOrigin: 'Sprache / Ursprung', whatIs: 'Was ist das?',
    recognize: 'Woran erkennt man es vor Ort?', seen: 'Wo in der Türkei zu sehen?', related: 'Verwandte Begriffe',
    loadError: 'dictionary.json konnte nicht geladen werden. Bitte Dateipfad prüfen.',
    footer: 'YAMA Heritage Visual Dictionary · Persönliches akademisch-kulturelles Projekt · Keine offizielle institutionelle Seite.'
  },
  en: {
    eyebrow: 'Visual Heritage Dictionary',
    lead: 'A cultural dictionary for recognising, briefly and clearly, the concepts most often encountered in museums, archaeological sites, churches, mosques and historic buildings across Türkiye.',
    search: 'Search a term: Anastasis, apse, forum, mihrab...',
    allTitle: 'All Terms', allDesc: 'Show all cultures and periods together.',
    termsHead: 'Terms', count: n => `${n} terms shown`,
    home: 'Home', dict: 'Dictionary',
    langOrigin: 'Language / Origin', whatIs: 'What is it?',
    recognize: 'How to recognise it on site?', seen: 'Where to see it in Türkiye?', related: 'Related terms',
    loadError: 'Could not load dictionary.json. Please check the file path.',
    footer: 'YAMA Heritage Visual Dictionary · Personal academic-cultural guide project · Not an official institutional page.'
  }
};

const cultures = {
  byzantine: { icon: '\u2626', title: { tr: 'Bizans', de: 'Byzanz', en: 'Byzantine' },
    desc: { tr: 'Kilise mimarisi, ikonografi, mozaik ve fresk kavramları.',
            de: 'Kirchenarchitektur, Ikonographie, Mosaik und Fresko.',
            en: 'Church architecture, iconography, mosaics and frescoes.' } },
  roman: { icon: '\uD83C\uDFDB\uFE0F', title: { tr: 'Roma', de: 'Rom', en: 'Roman' },
    desc: { tr: 'Roma şehir yapısı, kamu yapıları ve gündelik hayat terimleri.',
            de: 'Römische Stadtstruktur, öffentliche Bauten und Alltagsleben.',
            en: 'Roman urban structure, public buildings and daily life.' } },
  greek: { icon: '\uD83C\uDFFA', title: { tr: 'Antik Yunan', de: 'Antikes Griechenland', en: 'Ancient Greek' },
    desc: { tr: 'Tapınak mimarisi, polis kültürü ve klasik düzenler.',
            de: 'Tempelarchitektur, Polis-Kultur und die klassischen Ordnungen.',
            en: 'Temple architecture, polis culture and the classical orders.' } },
  hittite: { icon: '\uD83E\uDD81', title: { tr: 'Hitit', de: 'Hethiter', en: 'Hittite' },
    desc: { tr: 'Anadolu\u2019nun Tunç Çağı mirası, kapılar, kabartmalar ve yazılar.',
            de: 'Anatoliens bronzezeitliches Erbe: Tore, Reliefs und Schriften.',
            en: 'Anatolia\u2019s Bronze Age heritage: gates, reliefs and scripts.' } },
  seljuk: { icon: '\u2726', title: { tr: 'Selçuklu', de: 'Seldschuken', en: 'Seljuk' },
    desc: { tr: 'Taçkapılar, medreseler, kümbetler ve taş süsleme dili.',
            de: 'Portale, Medresen, Grabtürme und die Sprache des Steindekors.',
            en: 'Portals, madrasas, tomb towers and the language of stone ornament.' } },
  ottoman: { icon: '\uD83D\uDD4C', title: { tr: 'Osmanlı', de: 'Osmanen', en: 'Ottoman' },
    desc: { tr: 'Cami, külliye, şehir mimarisi ve süsleme kavramları.',
            de: 'Moschee, Külliye, Stadtarchitektur und Ornamentik.',
            en: 'Mosque, külliye, urban architecture and ornament.' } },
  islamic: { icon: '\u262A', title: { tr: 'İslam Sanatı', de: 'Islamische Kunst', en: 'Islamic Art' },
    desc: { tr: 'Hat, tezhip, motifler ve geometrik süsleme dünyası.',
            de: 'Kalligraphie, Illumination, Motive und geometrische Ornamentik.',
            en: 'Calligraphy, illumination, motifs and geometric ornament.' } }
};

let terms = [];
let currentCulture = 'all';
let lang = localStorage.getItem('yamaDictLang') || 'tr';
if (!UI[lang]) lang = 'tr';

const cultureGrid = document.getElementById('cultureGrid');
const termsGrid = document.getElementById('termsGrid');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const modal = document.getElementById('termModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

function applyUI() {
  const u = UI[lang];
  document.documentElement.lang = lang;
  document.querySelector('.eyebrow').textContent = u.eyebrow;
  document.querySelector('.lead').textContent = u.lead;
  searchInput.placeholder = u.search;
  document.querySelector('.section-head h2').textContent = u.termsHead;
  document.getElementById('navHome').textContent = u.home;
  document.getElementById('navDict').textContent = u.dict;
  document.querySelector('footer p').textContent = u.footer;
  document.querySelectorAll('[data-lang]').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
}

function renderCultures() {
  cultureGrid.innerHTML = '';
  const u = UI[lang];
  const allCard = document.createElement('article');
  allCard.className = 'culture-card' + (currentCulture === 'all' ? ' active' : '');
  allCard.dataset.culture = 'all';
  allCard.innerHTML = `<div class="icon">\u2727</div><h3>${u.allTitle}</h3><p>${u.allDesc}</p>`;
  cultureGrid.appendChild(allCard);

  Object.entries(cultures).forEach(([key, value]) => {
    const count = terms.filter(t => t.culture === key).length;
    const card = document.createElement('article');
    card.className = 'culture-card' + (currentCulture === key ? ' active' : '');
    card.dataset.culture = key;
    card.innerHTML = `<div class="icon">${value.icon}</div><h3>${value.title[lang]}</h3><p>${count} · ${value.desc[lang]}</p>`;
    cultureGrid.appendChild(card);
  });

  document.querySelectorAll('.culture-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.culture-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentCulture = card.dataset.culture;
      renderTerms();
    });
  });
}

function renderTerms() {
  const q = searchInput.value.toLowerCase().trim();
  const filtered = terms.filter(term => {
    const cultureMatch = currentCulture === 'all' || term.culture === currentCulture;
    const text = [
      term.title.tr, term.title.de, term.title.en,
      term.original || '',
      term.short.tr, term.short.de, term.short.en,
      term.language.tr, term.language.de, term.language.en
    ].join(' ').toLowerCase();
    return cultureMatch && text.includes(q);
  });

  resultCount.textContent = UI[lang].count(filtered.length);
  termsGrid.innerHTML = filtered.map(term => `
    <article class="term-card" data-id="${term.id}">
      <div class="icon">${cultures[term.culture]?.icon || '\u2727'}</div>
      <h3>${term.title[lang]}</h3>
      <p>${term.original || ''}</p>
      <div class="term-meta">
        <span class="badge">${cultures[term.culture]?.title[lang] || term.culture}</span>
        <span class="badge">${term.language[lang]}</span>
      </div>
      <p>${term.short[lang]}</p>
    </article>
  `).join('');

  document.querySelectorAll('.term-card').forEach(card => {
    card.addEventListener('click', () => openTerm(card.dataset.id));
  });
}

function openTerm(id) {
  const term = terms.find(t => t.id === id);
  if (!term) return;
  const u = UI[lang];
  let html = `
    <p class="eyebrow">${cultures[term.culture]?.title[lang] || term.culture}</p>
    <h2 class="modal-title">${term.title[lang]}</h2>
    <p class="original">${term.original || ''}</p>
    <div class="info-grid">
      <div class="info-box"><strong>${u.langOrigin}</strong>${term.language[lang]}</div>
      <div class="info-box"><strong>Türkçe</strong>${term.title.tr}</div>
      <div class="info-box"><strong>Deutsch</strong>${term.title.de}</div>
      <div class="info-box"><strong>English</strong>${term.title.en}</div>
    </div>
    <h3>${u.whatIs}</h3>
    <p>${term.short[lang]}</p>`;

  if (term.detail) {
    const d = term.detail;
    if (d.recognize && d.recognize[lang]) {
      html += `<h3>${u.recognize}</h3><ul>${d.recognize[lang].map(i => `<li>${i}</li>`).join('')}</ul>`;
    }
    if (d.seen && d.seen[lang]) {
      html += `<h3>${u.seen}</h3><ul>${d.seen[lang].map(i => `<li>${i}</li>`).join('')}</ul>`;
    }
    if (d.related && d.related.length) {
      html += `<h3>${u.related}</h3><div class="related">${d.related.map(i => `<span class="badge">${i}</span>`).join('')}</div>`;
    }
  }
  modalContent.innerHTML = html;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', e => { if (e.target === modal) closeModal.click(); });
searchInput.addEventListener('input', renderTerms);

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    lang = btn.dataset.lang;
    localStorage.setItem('yamaDictLang', lang);
    applyUI();
    renderCultures();
    renderTerms();
  });
});

fetch('../data/dictionary.json')
  .then(response => response.json())
  .then(data => {
    terms = data.terms;
    applyUI();
    renderCultures();
    renderTerms();
  })
  .catch(error => {
    termsGrid.innerHTML = `<p>${UI[lang].loadError}</p>`;
    console.error(error);
  });
