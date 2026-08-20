document.getElementById('year').textContent = new Date().getFullYear();

async function loadJSON(path){
  try{
    const res = await fetch(path + '?v=' + Date.now());
    if(!res.ok) throw new Error('failed to load ' + path);
    return await res.json();
  }catch(err){
    console.error(err);
    return null;
  }
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function plateHTML(item, index){
  return `
    <div class="plate">
      <div class="plate-img"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy"></div>
      <div class="plate-label">
        <b>${escapeHtml(item.title)}</b>
        <span>${String(index+1).padStart(2,'0')} — ${escapeHtml(item.category)}</span>
      </div>
    </div>`;
}

async function renderPortfolio(){
  const data = await loadJSON('data/portfolio.json');
  if(!data) return;
  const items = data.items || [];
  const logos = items.filter(i => i.category === 'Logo').slice(0,3);
  const posters = items.filter(i => i.category === 'Poster').slice(0,3);
  const logoGallery = document.getElementById('logoGallery');
  const posterGallery = document.getElementById('posterGallery');
  if(logoGallery) logoGallery.innerHTML = logos.map(plateHTML).join('');
  if(posterGallery) posterGallery.innerHTML = posters.map(plateHTML).join('');
  const heroImg = document.getElementById('heroImage');
  if(heroImg && items[0]) heroImg.src = items[0].image;
}

async function renderPricing(){
  const data = await loadJSON('data/pricing.json');
  if(!data) return;
  const plans = data.items || [];
  const grid = document.getElementById('priceGrid');
  grid.innerHTML = plans.map(p => `
    <div class="price-card ${p.highlighted ? 'highlighted' : ''}">
      <h3>${escapeHtml(p.name)}</h3>
      <div class="price-amount">${escapeHtml(p.price)}</div>
      <div class="price-note">${escapeHtml(p.note)}</div>
      <ul>${p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
      <a href="#contact" class="btn ${p.highlighted ? 'btn-primary' : 'btn-ghost'}">Order now</a>
    </div>`).join('');
}

async function renderArticles(){
  const data = await loadJSON('data/articles.json');
  if(!data) return;
  const articles = data.items || [];
  const grid = document.getElementById('articleGrid');
  grid.innerHTML = articles.slice(0,3).map(a => `
    <div class="article-card">
      <div class="article-date">${escapeHtml(a.date)}</div>
      <h3>${escapeHtml(a.title)}</h3>
      <p>${escapeHtml(a.excerpt)}</p>
    </div>`).join('');
}

async function renderSettings(){
  const s = await loadJSON('data/settings.json');
  if(!s) return;

  document.title = `${s.studio_name} — Graphic Design Studio`;
  document.getElementById('heroTitle').innerHTML = `${escapeHtml(s.tagline).replace(/(brand|voice)/i, '<em>$1</em>')}`;
  document.getElementById('heroSubtext').textContent = s.subtext;
  document.getElementById('aboutHeading').textContent = s.about_heading;
  document.getElementById('aboutBody').textContent = s.about_body;

  const usps = [
    [s.usp_1_title, s.usp_1_body],
    [s.usp_2_title, s.usp_2_body],
    [s.usp_3_title, s.usp_3_body],
    [s.usp_4_title, s.usp_4_body],
  ];
  document.getElementById('uspGrid').innerHTML = usps.map(([t,b]) => `
    <div class="usp"><b>${escapeHtml(t)}</b><span>${escapeHtml(b)}</span></div>`).join('');

  document.getElementById('contactList').innerHTML = `
    <li><b>Email</b>${escapeHtml(s.email)}</li>
    <li><b>Phone</b>${escapeHtml(s.phone)}</li>
    <li><b>WhatsApp</b>Tap the button below to message us directly</li>
  `;

  const waLinks = ['whatsappNavBtn','heroCtaWhatsapp','floatWhatsapp'];
  waLinks.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = s.whatsapp_link;
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', () => {
    const name = document.getElementById('cf-name').value;
    const contact = document.getElementById('cf-contact').value;
    const message = document.getElementById('cf-message').value;
    const text = encodeURIComponent(`Hi Creovix, I'm ${name} (${contact}). ${message}`);
    window.open(`${s.whatsapp_link}?text=${text}`, '_blank');
  });
}

function setupReveal(){
  const els = document.querySelectorAll('section');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, {threshold:0.1});
  els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

renderSettings();
renderPortfolio();
renderPricing();
renderArticles();
setupReveal();
