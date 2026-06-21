(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     TEXTOS i18n
     ══════════════════════════════════════════════ */
  var textos = {
    es: {
      heroLight:       'hola, soy ',
      aboutPara1: 'Diseñador multidisciplinar formado entre Madrid y Múnich.',
      aboutPara2: '<strong>Transformo ideas en narrativas visuales claras y memorables, diseño con intención.</strong>',
      aboutCta:   'Siempre abierto a nuevos retos.',
      sommerDesc:   'Cartel para una noche de verano en Múnich. El proyecto parte del legado visual de Otl Aicher —arquitecto de la identidad de los Juegos Olímpicos del 72— para construir una pieza que habla ese mismo idioma: tipografía precisa, geometría limpia, color que no pide permiso. Un diseño de los setenta que podría ser de hoy.',
      nidoDesc:     'Una iniciativa solidaria enfocada a la reconstrucción simbólica del hogar en entornos de extrema pobreza desde el campo emocional del diseño.',
      gofindDesc:   'Go&Find es un concepto de interfaz para los carritos inteligentes de compra de Sánchez Romero, diseñado para transformar la experiencia en supermercado en un recorrido más fluido, personalizado y eficiente. La pantalla del carrito se sincroniza con la app móvil del usuario y su lista de la compra, mostrando un mapa interactivo en tiempo real con la ruta óptima por el supermercado para encontrar cada producto de forma rápida. Proyecto desarrollado por Eva Martín, Marcos Rojas, Odalis Tacuri y Pablo Morán.',
      picaraDesc:   'Pícara es una cadena de hamburguesas veganas. Fiel a su nombre, ofrece sabores únicos.',
      mirthaDesc:   'Este proyecto tipográfico explora las premisas tipográficas tradicionales, analizando los alfabetos y runas de diferentes culturas, como la griega y la vikinga.',
      pabloDesc:    'Una versión de la icónica lámpara del diseñador italiano Achille Castiglioni, Splugen Brau. Su estructura tubular, creada mediante impresión 3D, proporciona luz indirecta ocultando la bombilla.',
      relatedLabel: 'ver más proyectos'
    },
    en: {
      heroLight:       "hi, I'm ",
      aboutPara1: 'Multidisciplinary designer trained between Madrid and Munich.',
      aboutPara2: '<strong>Design with intention.<br>I transform ideas into clear and memorable visual narratives.</strong>',
      aboutCta:   'Always open to new challenges.',
      sommerDesc:   "Poster for a summer night in Munich. The project draws on the visual legacy of Otl Aicher — architect of the 1972 Olympics identity — to build a piece that speaks that same language: precise typography, clean geometry, colour that needs no permission. A seventies design that could be today's.",
      nidoDesc:     'A solidarity initiative focused on the symbolic reconstruction of home in environments of extreme poverty, from the emotional field of design.',
      gofindDesc:   "Go&Find is an interface concept for Sánchez Romero smart shopping carts, designed to transform the supermarket experience into a smoother, personalised, and efficient journey. The cart screen syncs with the user's mobile app and shopping list, showing a real-time interactive map with the optimal route through the store. Project developed by Eva Martín, Marcos Rojas, Odalis Tacuri, and Pablo Morán.",
      picaraDesc:   'Pícara is a vegan burger chain. True to its name, it offers unique flavours.',
      mirthaDesc:   'This typographic project explores traditional typographic premises, analysing alphabets and runes from different cultures, such as Greek and Viking.',
      pabloDesc:    'A version of the iconic lamp by Italian designer Achille Castiglioni, Splugen Brau. Its tubular structure, created via 3D printing, provides indirect light by concealing the bulb.',
      relatedLabel: 'see more projects'
    }
  };

  /* ══════════════════════════════════════════════
     PROYECTOS
     ══════════════════════════════════════════════ */
  var projects = ['sommer', 'nido', 'gofind', 'picara', 'mirtha', 'pablo'];

  var projectCovers = {
    sommer: 'proyecto6-1.gif',
    nido:   'proyecto3-14.jpg',
    gofind: 'proyecto4-1.png',
    picara: 'proyecto1-1.png',
    mirtha: 'proyecto5-1.jpg',
    pablo:  'proyecto2-1.png'
  };

  /* ══════════════════════════════════════════════
     ESTADO
     ══════════════════════════════════════════════ */
  var lang        = 'es';
  var overlayOpen = null;

  /* ══════════════════════════════════════════════
     REFERENCIAS DOM
     ══════════════════════════════════════════════ */
  var siteHeader    = document.getElementById('siteHeader');
  var homeSection   = document.getElementById('home');
  var langToggle       = document.getElementById('langToggle');
  var langToggleHeader = document.getElementById('langToggleHeader');
  var langFixed        = document.getElementById('lang-fixed');
  var heroLight     = document.getElementById('heroLight');

  var viewDetail    = document.getElementById('view-detail');
  var detailCounter = document.getElementById('detailCounter');
  var detailRelated = document.getElementById('detail-related');

  var lightbox      = document.getElementById('lightbox');
  var lbImg         = document.getElementById('lbImg');
  var lbClose       = document.getElementById('lbClose');
  var lbPrev        = document.getElementById('lbPrev');
  var lbNext        = document.getElementById('lbNext');

  var preview       = document.getElementById('work-preview');
  var previewImg    = document.getElementById('work-preview-img');

  var landingNavItems = document.querySelectorAll('.landing-nav-item');
  var headerNavLinks  = document.querySelectorAll('.header-nav-link:not(.header-lang)');

  /* ══════════════════════════════════════════════
     CURSOR FOLLOWER
     ══════════════════════════════════════════════ */
  var isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  var follower = document.createElement('div');
  follower.id  = 'cursor-follower';
  if (!isTouchDevice) document.body.appendChild(follower);

  var fX = 0, fY = 0, mX = 0, mY = 0, fVisible = false;

  if (!isTouchDevice) {
    document.addEventListener('mousemove', function (e) {
      mX = e.clientX;
      mY = e.clientY;
      if (!fVisible) { fX = mX; fY = mY; follower.style.opacity = '1'; fVisible = true; }
    });
    document.addEventListener('mouseleave', function () {
      follower.style.opacity = '0'; fVisible = false;
    });

    (function animFollower() {
      fX += (mX - fX) * 0.12;
      fY += (mY - fY) * 0.12;
      follower.style.transform = 'translate(' + (fX - 13) + 'px,' + (fY - 13) + 'px)';
      requestAnimationFrame(animFollower);
    })();
  }

  document.querySelectorAll('a, button, .project-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { follower.classList.add('grow'); });
    el.addEventListener('mouseleave', function () { follower.classList.remove('grow'); });
  });

  /* ══════════════════════════════════════════════
     HEADER — IntersectionObserver (aparece al salir de #home)
     ══════════════════════════════════════════════ */
  if ('IntersectionObserver' in window && homeSection) {
    var headerObs = new IntersectionObserver(function (entries) {
      var gone = !entries[0].isIntersecting;
      siteHeader.classList.toggle('visible', gone);
      if (langFixed) langFixed.classList.toggle('hidden', gone);
    }, { threshold: 0.1 });
    headerObs.observe(homeSection);
  }

  /* ══════════════════════════════════════════════
     LANDING NAV ACTIVO — IntersectionObserver por sección
     Subraya el item cuya sección es visible.
     En #home ningún item tiene .active.
     ══════════════════════════════════════════════ */
  var sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');

        /* Landing nav — activo solo fuera de #home */
        landingNavItems.forEach(function (item) {
          item.classList.remove('active');
          if (id !== 'home') {
            if (item.getAttribute('href').replace('#', '') === id) {
              item.classList.add('active');
            }
          }
        });

        /* Header nav — activo según sección visible */
        headerNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (id !== 'home') {
            if (link.getAttribute('href').replace('#', '') === id) {
              link.classList.add('active');
            }
          }
        });
      });
    }, { threshold: 0.5 });

    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ══════════════════════════════════════════════
     i18n
     ══════════════════════════════════════════════ */
  function applyLang(l) {
    lang = l;
    var t = textos[l];

    if (heroLight) heroLight.textContent = t.heroLight;

    ['aboutPara1', 'aboutPara2', 'aboutCta',
     'sommerDesc', 'nidoDesc', 'gofindDesc',
     'picaraDesc', 'mirthaDesc', 'pabloDesc'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && t[id]) el.innerHTML = t[id];
    });

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = l === 'es' ? el.dataset.es : el.dataset.en;
      if (val !== undefined) el.innerHTML = val;
    });

    var label = l === 'es' ? 'EN' : 'ES';
    langToggle.textContent = label;
    if (langToggleHeader) langToggleHeader.textContent = label;

    if (overlayOpen === 'detail') buildRelated();
  }

  /* ══════════════════════════════════════════════
     OVERLAY
     ══════════════════════════════════════════════ */
  function openOverlay(which) {
    overlayOpen = which;
    document.documentElement.style.scrollSnapType = 'none';
    var sy = window.scrollY;
    document.body.dataset.scrollY = sy;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + sy + 'px';
    document.body.style.width = '100%';
    siteHeader.classList.add('over-overlay');
  }

  function closeOverlay() {
    if (!overlayOpen) return;
    viewDetail.style.display = 'none';
    viewDetail.querySelectorAll('.detail').forEach(function (d) {
      d.style.display = 'none';
    });
    closeLightbox();
    overlayOpen = null;
    var sy = parseInt(document.body.dataset.scrollY || '0');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, sy);
    document.documentElement.style.scrollSnapType = '';
    siteHeader.classList.remove('over-overlay');
  }

  /* ══════════════════════════════════════════════
     PIE DEL OVERLAY — enlace a #work
     ══════════════════════════════════════════════ */
  function buildRelated() {
    if (!detailRelated) return;
    var label = textos[lang].relatedLabel;
    detailRelated.innerHTML =
      '<a class="related__more" href="#work">' + label + '</a>';
    detailRelated.querySelector('.related__more').addEventListener('click', function (e) {
      e.preventDefault();
      closeOverlay();
      requestAnimationFrame(function () {
        var work = document.getElementById('work');
        if (work) work.scrollIntoView({ behavior: 'instant' });
      });
    });
  }

  /* ══════════════════════════════════════════════
     MOSTRAR PROYECTO
     ══════════════════════════════════════════════ */
  function showProject(id) {
    viewDetail.querySelectorAll('.detail').forEach(function (d) { d.style.display = 'none'; });
    var panel = document.getElementById('detail-' + id);
    if (!panel) return;

    viewDetail.style.display = 'flex';
    panel.style.display = 'flex';
    openOverlay('detail');

    var idx = projects.indexOf(id);
    if (detailCounter) detailCounter.textContent = (idx + 1) + ' / ' + projects.length;

    var strip = panel.querySelector('.detail__strip');
    if (strip) strip.scrollLeft = 0;

    buildRelated();
  }

  /* ══════════════════════════════════════════════
     HEADER — cerrar overlay al navegar
     ══════════════════════════════════════════════ */
  document.querySelectorAll('.header-name, .header-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (overlayOpen) closeOverlay();
    });
  });

  /* ══════════════════════════════════════════════
     LISTA DE PROYECTOS
     ══════════════════════════════════════════════ */
  document.querySelectorAll('.project-card[data-project]').forEach(function (item) {
    item.addEventListener('click', function () { showProject(item.dataset.project); });
  });

  /* ══════════════════════════════════════════════
     NAVEGACIÓN TECLADO ENTRE PROYECTOS (← →)
     ══════════════════════════════════════════════ */
  function currentProjectId() {
    var active = viewDetail.querySelector('.detail[style*="flex"]');
    return active ? active.id.replace('detail-', '') : null;
  }

  /* ══════════════════════════════════════════════
     LIGHTBOX
     ══════════════════════════════════════════════ */
  var lbImages = [], lbIndex = 0;

  function openLightbox(imgs, startIdx) {
    lbImages = imgs;
    lbIndex  = startIdx;
    lbImg.src = lbImages[lbIndex];
    lightbox.classList.add('open');
    if (lbPrev) lbPrev.hidden = lbIndex === 0;
    if (lbNext) lbNext.hidden = lbIndex === lbImages.length - 1;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lbImg.src = '';
    lbImages  = [];
  }

  viewDetail.addEventListener('click', function (e) {
    var img = e.target.closest('.detail__strip img');
    if (!img) return;
    var strip   = img.closest('.detail__strip');
    var allImgs = Array.prototype.slice.call(strip.querySelectorAll('img'));
    openLightbox(allImgs.map(function (i) { return i.src; }), allImgs.indexOf(img));
  });

  viewDetail.addEventListener('click', function (e) {
    var label = e.target.closest('.detail__process-label');
    if (label && window.innerWidth <= 768) {
      label.closest('.detail__process').classList.toggle('is-open');
      return;
    }
  });

  viewDetail.addEventListener('click', function (e) {
    var img = e.target.closest('.detail__process-img');
    if (!img) return;
    var process = img.closest('.detail__process');
    var allImgs = Array.prototype.slice.call(process.querySelectorAll('.detail__process-img'));
    openLightbox(allImgs.map(function (i) { return i.src; }), allImgs.indexOf(img));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  if (lbPrev) {
    lbPrev.addEventListener('click', function () {
      if (lbIndex > 0) {
        lbIndex--;
        lbImg.src = lbImages[lbIndex];
        lbPrev.hidden = lbIndex === 0;
        if (lbNext) lbNext.hidden = lbIndex === lbImages.length - 1;
      }
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', function () {
      if (lbIndex < lbImages.length - 1) {
        lbIndex++;
        lbImg.src = lbImages[lbIndex];
        if (lbPrev) lbPrev.hidden = lbIndex === 0;
        lbNext.hidden = lbIndex === lbImages.length - 1;
      }
    });
  }

  /* ══════════════════════════════════════════════
     TECLADO
     ══════════════════════════════════════════════ */
  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft'  && lbPrev && !lbPrev.hidden) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext && !lbNext.hidden) lbNext.click();
      return;
    }
    if (overlayOpen === 'detail') {
      if (e.key === 'Escape')     closeOverlay();
      if (e.key === 'ArrowLeft'  && detailPrev && !detailPrev.hidden) detailPrev.click();
      if (e.key === 'ArrowRight' && detailNext && !detailNext.hidden) detailNext.click();
    }
  });

  /* ══════════════════════════════════════════════
     HOVER PREVIEW
     ══════════════════════════════════════════════ */
  var pvX = 0, pvY = 0, pvTX = 0, pvTY = 0, pvRaf = null;

  function animPreview() {
    pvX += (pvTX - pvX) * 0.1;
    pvY += (pvTY - pvY) * 0.1;
    preview.style.left = pvX + 'px';
    preview.style.top  = pvY + 'px';
    pvRaf = requestAnimationFrame(animPreview);
  }

  /* hover preview eliminado — las cartas ya muestran la imagen */

  /* ══════════════════════════════════════════════
     LANG TOGGLE
     ══════════════════════════════════════════════ */
  function toggleLang() { applyLang(lang === 'es' ? 'en' : 'es'); }
  function onLangKey(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLang(); } }

  langToggle.addEventListener('click', toggleLang);
  langToggle.addEventListener('keydown', onLangKey);

  if (langToggleHeader) {
    langToggleHeader.addEventListener('click', toggleLang);
    langToggleHeader.addEventListener('keydown', onLangKey);
  }

  /* ══════════════════════════════════════════════
     ANIMACIÓN DE ENTRADA — .section-content
     ══════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    var animObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-content').forEach(function (el) {
      animObs.observe(el);
    });
  }

  /* ══════════════════════════════════════════════
     LOOP INFINITO — scroll horizontal
     ══════════════════════════════════════════════ */
  (function () {
    var wrap = document.querySelector('.project-grid-wrap');
    var grid = document.querySelector('.project-grid');
    if (!wrap || !grid) return;

    var originals = Array.from(grid.querySelectorAll('.project-card'));
    var n = originals.length;

    function bindClone(c) {
      c.addEventListener('click', function () {
        if (c.dataset.project) showProject(c.dataset.project);
      });
      c.addEventListener('mouseenter', function () { follower.classList.add('grow'); });
      c.addEventListener('mouseleave', function () { follower.classList.remove('grow'); });
    }

    /* Clonamos antes y después */
    originals.forEach(function (card) {
      var c = card.cloneNode(true);
      grid.appendChild(c);
      bindClone(c);
    });
    originals.slice().reverse().forEach(function (card) {
      var c = card.cloneNode(true);
      grid.insertBefore(c, grid.firstChild);
      bindClone(c);
    });
    /* Resultado: [n clones] [n originales] [n clones] */

    var setW = 0;
    var originStart = 0;

    function measure() {
      var all = grid.querySelectorAll('.project-card');
      if (all.length < n * 2 + 1) return;
      var r0 = all[0].getBoundingClientRect();
      var rN = all[n].getBoundingClientRect();
      var r2N = all[n * 2].getBoundingClientRect();
      setW = Math.round(r2N.left - rN.left);
      originStart = Math.round(rN.left - r0.left);
      wrap.scrollLeft = originStart;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(measure);
    });

    wrap.addEventListener('scroll', function () {
      if (!setW) return;
      var sl = wrap.scrollLeft;
      if (sl < originStart - 3) {
        wrap.scrollLeft = sl + setW;
      } else if (sl >= originStart + setW - 3) {
        wrap.scrollLeft = sl - setW;
      }
    }, { passive: true });
  }());

  /* ══════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════ */
  applyLang('es');

  /* Viewport real — evita inconsistencias entre Chrome y Safari en móvil */
  function setRealVH() {
    document.documentElement.style.setProperty('--real-vh', (window.innerHeight * 0.01) + 'px');
  }
  setRealVH();
  window.addEventListener('resize', setRealVH);

  var bgVideo = document.querySelector('.hero-bg-video');
  var bgGif   = document.querySelector('.hero-bg-gif');
  var isIOS   = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    if (bgVideo) bgVideo.style.display = 'none';
    if (bgGif)   bgGif.style.display   = 'block';
  } else {
    if (bgGif) {
      bgGif.classList.add('desktop-fallback');
      bgGif.style.display = 'block';
    }
    if (bgVideo) {
      bgVideo.style.display = 'none';
      bgVideo.muted = true;
      bgVideo.play().catch(function () {});
      bgVideo.addEventListener('playing', function () {
        bgVideo.style.display = 'block';
        if (bgGif) {
          bgGif.style.display = 'none';
          bgGif.classList.remove('desktop-fallback');
        }
      }, { once: true });
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') bgVideo.play().catch(function () {});
      });
    }
  }

})();
