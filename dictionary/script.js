const cultures = {
  byzantine: { title: 'Bizans', icon: '☦', description: 'Kilise mimarisi, ikonografi, mozaik ve fresk kavramları.' },
  roman: { title: 'Roma', icon: '🏛️', description: 'Roma şehir yapısı, kamu yapıları ve gündelik hayat terimleri.' },
  greek: { title: 'Antik Yunan', icon: '🏺', description: 'Tapınak mimarisi, polis kültürü ve klasik düzenler.' },
  hittite: { title: 'Hitit', icon: '🦁', description: 'Anadolu’nun Tunç Çağı mirası, kapılar, kabartmalar ve yazılar.' },
  seljuk: { title: 'Selçuklu', icon: '✦', description: 'Taçkapılar, medreseler, kümbetler ve taş süsleme dili.' },
  ottoman: { title: 'Osmanlı', icon: '🕌', description: 'Cami, külliye, şehir mimarisi ve süsleme kavramları.' },
  islamic: { title: 'İslam Sanatı', icon: '☪', description: 'Hat, tezhip, motifler ve geometrik süsleme dünyası.' }
};

let terms = [];
let currentCulture = 'all';

const cultureGrid = document.getElementById('cultureGrid');
const termsGrid = document.getElementById('termsGrid');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const modal = document.getElementById('termModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

function renderCultures() {
  const allCard = document.createElement('article');
  allCard.className = 'culture-card active';
  allCard.dataset.culture = 'all';
  allCard.innerHTML = `<div class="icon">✧</div><h3>Tüm Kavramlar</h3><p>Bütün kültür ve dönemleri birlikte göster.</p>`;
  cultureGrid.appendChild(allCard);

  Object.entries(cultures).forEach(([key, value]) => {
    const count = terms.filter(t => t.culture === key).length;
    const card = document.createElement('article');
    card.className = 'culture-card';
    card.dataset.culture = key;
    card.innerHTML = `<div class="icon">${value.icon}</div><h3>${value.title}</h3><p>${count} kavram · ${value.description}</p>`;
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
    const text = [term.title, term.original, term.meaning_tr, term.meaning_en, term.language, term.short].join(' ').toLowerCase();
    return cultureMatch && text.includes(q);
  });

  resultCount.textContent = `${filtered.length} kavram gösteriliyor`;
  termsGrid.innerHTML = filtered.map(term => `
    <article class="term-card" data-id="${term.id}">
      <div class="icon">${cultures[term.culture]?.icon || '✧'}</div>
      <h3>${term.title}</h3>
      <p>${term.original || ''}</p>
      <div class="term-meta">
        <span class="badge">${cultures[term.culture]?.title || term.culture}</span>
        <span class="badge">${term.language}</span>
      </div>
      <p>${term.short}</p>
    </article>
  `).join('');

  document.querySelectorAll('.term-card').forEach(card => {
    card.addEventListener('click', () => openTerm(card.dataset.id));
  });
}

function openTerm(id) {
  const term = terms.find(t => t.id === id);
  if (!term) return;
  modalContent.innerHTML = `
    <p class="eyebrow">${cultures[term.culture]?.title || term.culture}</p>
    <h2 class="modal-title">${term.title}</h2>
    <p class="original">${term.original || ''}</p>
    <div class="info-grid">
      <div class="info-box"><strong>Dil / Köken</strong>${term.language}</div>
      <div class="info-box"><strong>Türkçe</strong>${term.meaning_tr}</div>
      <div class="info-box"><strong>English</strong>${term.meaning_en}</div>
      <div class="info-box"><strong>Tanıma ipucu</strong>${term.recognition_hint}</div>
    </div>
    <h3>Nedir?</h3>
    <p>${term.description}</p>
    <h3>Gezerken nasıl tanınır?</h3>
    <ul>${term.how_to_recognize.map(item => `<li>${item}</li>`).join('')}</ul>
    <h3>Türkiye'de nerelerde görülebilir?</h3>
    <ul>${term.seen_in_turkiye.map(item => `<li>${item}</li>`).join('')}</ul>
    <h3>İlgili kavramlar</h3>
    <div class="related">${term.related.map(item => `<span class="badge">${item}</span>`).join('')}</div>
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal.click();
});
searchInput.addEventListener('input', renderTerms);

fetch('../data/dictionary.json')
  .then(response => response.json())
  .then(data => {
    terms = data.terms;
    renderCultures();
    renderTerms();
  })
  .catch(error => {
    termsGrid.innerHTML = '<p>dictionary.json yüklenemedi. Dosya yolunu kontrol edin.</p>';
    console.error(error);
  });
