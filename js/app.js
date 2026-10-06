/* ==========================================================================
   Lógica: genera ambos formatos desde CV_DATA, alterna entre ellos,
   cambia el tema del formato visual y descarga el PDF del formato activo.
   ========================================================================== */
(() => {
  'use strict';

  const d = window.CV_DATA;
  if (!d) { console.error('CV_DATA no está definido. Revisa js/data.js'); return; }

  /* ---------- Utilidades ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const url = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);
  const link = (u) => `<a href="${esc(url(u))}">${esc(u)}</a>`;
  const initials = (name) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
  const slug = (s) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');

  const store = {
    get(k, fallback) { try { return localStorage.getItem(k) || fallback; } catch (_) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* sin almacenamiento */ } }
  };

  const ICONS = {
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'
  };
  const icon = (n) =>
    `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

  /* ---------- Formato ATS ---------- */
  function renderATS() {
    const c = d.contacto;
    const contacto1 = [
      esc(c.ubicacion),
      esc(c.telefono),
      `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`
    ].join(' | ');
    const contacto2 = [
      link(c.linkedin),
      link(c.github),
      c.web ? link(c.web) : ''
    ].filter(Boolean).join(' | ');

    return `
      <header class="ats-header">
        <h1>${esc(d.nombre)}</h1>
        <p class="ats-role">${esc(d.titulo)}</p>
        <p class="ats-contact">${contacto1}</p>
        <p class="ats-contact">${contacto2}</p>
      </header>

      <section>
        <h2>Resumen profesional</h2>
        <p>${esc(d.resumen)}</p>
      </section>

      <section>
        <h2>Habilidades técnicas</h2>
        <ul class="ats-skills">
          ${d.habilidades.map((g) => `<li><strong>${esc(g.grupo)}:</strong> ${g.items.map(esc).join(', ')}</li>`).join('')}
        </ul>
      </section>

      <section>
        <h2>Experiencia laboral</h2>
        ${d.experiencia.map((e) => `
          <article class="ats-job">
            <div class="ats-row"><h3>${esc(e.cargo)} | <span class="ats-co">${esc(e.empresa)}</span></h3><span>${esc(e.periodo)}</span></div>
            <p class="ats-meta">${esc(e.lugar)}</p>
            <ul>${e.logros.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
            <p class="ats-stack"><strong>Tecnologías:</strong> ${e.stack.map(esc).join(', ')}</p>
          </article>`).join('')}
      </section>

      <section>
        <h2>Proyectos destacados</h2>
        ${d.proyectos.map((p) => `
          <article class="ats-item">
            <div class="ats-row"><h3>${esc(p.nombre)}</h3><span>${esc(p.enlace)}</span></div>
            <p>${esc(p.descripcion)}</p>
            <p class="ats-stack"><strong>Tecnologías:</strong> ${p.stack.map(esc).join(', ')}</p>
          </article>`).join('')}
      </section>

      <section>
        <h2>Educación</h2>
        ${d.educacion.map((e) => `
          <article class="ats-item">
            <div class="ats-row"><h3>${esc(e.titulo)}</h3><span>${esc(e.periodo)}</span></div>
            <p>${esc(e.institucion)}, ${esc(e.lugar)}</p>
          </article>`).join('')}
      </section>

      <section>
        <h2>Certificaciones</h2>
        <ul>${d.certificaciones.map((c) => `<li>${esc(c.nombre)} – ${esc(c.emisor)} (${esc(c.anio)})</li>`).join('')}</ul>
      </section>

      <section>
        <h2>Idiomas</h2>
        <ul>${d.idiomas.map((i) => `<li>${esc(i.idioma)}: ${esc(i.nivel)}</li>`).join('')}</ul>
      </section>

      <section>
        <h2>Competencias personales</h2>
        <p>${d.blandas.map(esc).join(', ')}</p>
      </section>`;
  }

  /* ---------- Formato visual ---------- */
  function renderVisual() {
    const c = d.contacto;
    const contactos = [
      ['mail', c.email, `mailto:${c.email}`],
      ['phone', c.telefono, `tel:${c.telefono.replace(/\s+/g, '')}`],
      ['pin', c.ubicacion, ''],
      ['linkedin', c.linkedin, url(c.linkedin)],
      ['github', c.github, url(c.github)],
      c.web ? ['globe', c.web, url(c.web)] : null
    ].filter(Boolean);

    const avatar = d.foto
      ? `<img src="${esc(d.foto)}" alt="Foto de ${esc(d.nombre)}">`
      : `<span aria-hidden="true">${esc(initials(d.nombre))}</span>`;

    return `
      <div class="v-grid">
        <aside class="v-side">
          <div class="v-avatar">${avatar}</div>

          <h3>Contacto</h3>
          <ul class="v-contact">
            ${contactos.map(([ic, txt, href]) => `
              <li>${icon(ic)}${href ? `<a href="${esc(href)}">${esc(txt)}</a>` : `<span>${esc(txt)}</span>`}</li>`).join('')}
          </ul>

          <h3>Habilidades clave</h3>
          <ul class="v-bars">
            ${d.habilidadesClave.map((h) => `
              <li>
                <div class="v-bar-label"><span>${esc(h.nombre)}</span><em>${esc(h.nivel)}%</em></div>
                <div class="v-track"><span class="v-fill" style="--pct:${Number(h.nivel)}%"></span></div>
              </li>`).join('')}
          </ul>

          <h3>Idiomas</h3>
          <ul class="v-bars">
            ${d.idiomas.map((i) => `
              <li>
                <div class="v-bar-label"><span>${esc(i.idioma)}</span><em>${esc(i.nivel)}</em></div>
                <div class="v-track"><span class="v-fill" style="--pct:${Number(i.pct)}%"></span></div>
              </li>`).join('')}
          </ul>

          <h3>Certificaciones</h3>
          ${d.certificaciones.map((ce) => `
            <div class="v-cert"><strong>${esc(ce.nombre)}</strong><span>${esc(ce.emisor)} · ${esc(ce.anio)}</span></div>`).join('')}

          <h3>Competencias</h3>
          <ul class="v-tags">${d.blandas.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        </aside>

        <div class="v-main">
          <header class="v-hero">
            <h1>${esc(d.nombre)}</h1>
            <span class="v-role">${esc(d.titulo)}</span>
            <p class="v-summary">${esc(d.resumen)}</p>
          </header>

          <section>
            <h2>Experiencia</h2>
            <div class="v-timeline">
              ${d.experiencia.map((e) => `
                <article class="v-job">
                  <div class="v-job-head"><h3>${esc(e.cargo)}</h3><span class="v-date">${esc(e.periodo)}</span></div>
                  <p class="v-company">${esc(e.empresa)} <span>· ${esc(e.lugar)}</span></p>
                  <ul>${e.logros.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
                  <ul class="v-chips">${e.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
                </article>`).join('')}
            </div>
          </section>

          <section>
            <h2>Proyectos</h2>
            <div class="v-projects">
              ${d.proyectos.map((p) => `
                <article class="v-card">
                  <h3>${esc(p.nombre)}</h3>
                  <p>${esc(p.descripcion)}</p>
                  <ul class="v-chips">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
                  <a class="v-link" href="${esc(url(p.enlace))}">${esc(p.enlace)}</a>
                </article>`).join('')}
            </div>
          </section>

          <section>
            <h2>Educación</h2>
            <div class="v-edu">
              ${d.educacion.map((e) => `
                <article>
                  <h3>${esc(e.titulo)}</h3>
                  <p>${esc(e.institucion)} · ${esc(e.lugar)}</p>
                  <span class="v-date">${esc(e.periodo)}</span>
                </article>`).join('')}
            </div>
          </section>
        </div>
      </div>`;
  }

  /* ---------- Estado y eventos ---------- */
  const sheets = { ats: $('#cv-ats'), visual: $('#cv-visual') };
  const tabs = $$('[data-modo]');
  const themesBox = $('#themes');
  const swatches = $$('.swatch', themesBox);
  const pdfLabel = $('#btn-pdf-label');

  const VALID_MODES = ['ats', 'visual'];
  const VALID_THEMES = swatches.map((s) => s.dataset.theme);

  const hashMode = location.hash.replace('#', '');
  let modo = VALID_MODES.includes(hashMode) ? hashMode : store.get('cv-modo', 'visual');
  if (!VALID_MODES.includes(modo)) modo = 'visual';
  let tema = store.get('cv-tema', 'navy');
  if (!VALID_THEMES.includes(tema)) tema = 'navy';

  function aplicarTema() {
    sheets.visual.dataset.theme = tema;
    swatches.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.theme === tema)));
  }

  function aplicarModo() {
    VALID_MODES.forEach((m) => { sheets[m].hidden = m !== modo; });
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.modo === modo)));
    themesBox.hidden = modo !== 'visual';
    pdfLabel.textContent = `Descargar PDF (${modo === 'ats' ? 'ATS' : 'Visual'})`;
    store.set('cv-modo', modo);
    if (history.replaceState) history.replaceState(null, '', `#${modo}`);
  }

  /* Preparación de la impresión: se ejecuta tanto con el botón como con Ctrl/Cmd+P */
  let tituloOriginal = document.title;

  function prepararImpresion() {
    const root = document.documentElement;
    // ATS: A4 con márgenes limpios. Visual: A4 a sangre completa (la barra lateral llega al borde).
    $('#page-style').textContent = modo === 'ats'
      ? '@page { size: A4; margin: 14mm 16mm; }'
      : '@page { size: A4; margin: 0; }';

    // Color de la barra lateral en el fondo de cada página, para que no queden bandas blancas
    root.classList.toggle('print-visual', modo === 'visual');
    root.style.setProperty('--print-side', getComputedStyle(sheets.visual).getPropertyValue('--side').trim());

    // El navegador propone el título del documento como nombre del archivo PDF.
    tituloOriginal = document.title;
    document.title = `HV_${slug(d.nombre)}_${modo === 'ats' ? 'ATS' : 'Visual'}`;
  }

  function restaurarImpresion() {
    document.documentElement.classList.remove('print-visual');
    document.title = tituloOriginal;
  }

  window.addEventListener('beforeprint', prepararImpresion);
  window.addEventListener('afterprint', restaurarImpresion);

  function descargarPDF() { window.print(); }

  tabs.forEach((t) => t.addEventListener('click', () => { modo = t.dataset.modo; aplicarModo(); }));
  swatches.forEach((s) => s.addEventListener('click', () => { tema = s.dataset.theme; store.set('cv-tema', tema); aplicarTema(); }));
  $('#btn-pdf').addEventListener('click', descargarPDF);

  // Navegación con flechas en las pestañas (accesibilidad)
  $('.segmented').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    modo = modo === 'ats' ? 'visual' : 'ats';
    aplicarModo();
    $(`[data-modo="${modo}"]`).focus();
  });

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (VALID_MODES.includes(h) && h !== modo) { modo = h; aplicarModo(); }
  });

  /* ---------- Inicio ---------- */
  sheets.ats.innerHTML = renderATS();
  sheets.visual.innerHTML = renderVisual();
  document.title = `Hoja de vida | ${d.nombre}`;
  aplicarTema();
  aplicarModo();
})();
