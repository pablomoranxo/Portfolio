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
      gofindDesc:   'Go&Find es un concepto de interfaz para los carritos inteligentes de Sánchez Romero. La pantalla se sincroniza con la app del cliente y su lista de la compra, mostrando un mapa interactivo con la ruta óptima hasta cada producto. Proyecto desarrollado junto a Eva Martín, Marcos Rojas y Odalis Tacuri.',
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
      gofindDesc:   "Go&Find is an interface concept for Sánchez Romero's smart shopping carts. The screen syncs with the customer's app and shopping list, showing an interactive map with the optimal route to each product. Project developed together with Eva Martín, Marcos Rojas and Odalis Tacuri.",
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
      '<a class="related__more" href="#work">‹ ' + label + '</a>';
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
    var img = e.target.closest('.detail__process-img');
    if (!img) return;
    var process = img.closest('.detail__process');
    var allImgs = Array.prototype.slice.call(process.querySelectorAll('.detail__process-img'));
    openLightbox(allImgs.map(function (i) { return i.src; }), allImgs.indexOf(img));
  });

  /* ══════════════════════════════════════════════
     PROCESO — accordion universal
     ══════════════════════════════════════════════ */
  (function () {
    document.querySelectorAll('.detail__process-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var body = document.getElementById(btn.getAttribute('aria-controls'));
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          if (body) body.classList.add('is-open');
        } else {
          btn.setAttribute('aria-expanded', 'false');
          if (body) body.classList.remove('is-open');
        }
      });
    });
  }());

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

    /* ── Navegación sin trackpad: flechas + arrastrar con ratón ── */

    /* Lleva una posición "virtual" al tramo de originales (bucle) */
    function loopPos(x) {
      if (!setW) return x;
      while (x < originStart) x += setW;
      while (x >= originStart + setW) x -= setW;
      return x;
    }

    function stepW() {
      var card = grid.querySelector('.project-card');
      var gap  = parseFloat(getComputedStyle(grid).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : wrap.clientWidth * 0.8;
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var anim = null, rafId = 0;

    function tick(now) {
      if (!anim) { rafId = 0; return; }
      var p = Math.min(1, (now - anim.start) / anim.dur);
      var e = 1 - Math.pow(1 - p, 3);              /* ease-out */
      anim.cur = anim.from + (anim.to - anim.from) * e;
      wrap.scrollLeft = loopPos(anim.cur);
      if (p < 1) { rafId = requestAnimationFrame(tick); }
      else { anim = null; rafId = 0; }
    }

    function moveBy(px, dur) {
      var cur    = anim ? anim.cur : wrap.scrollLeft;
      var target = (anim ? anim.to : cur) + px;   /* movimientos seguidos se acumulan */
      if (reduceMotion) { anim = null; wrap.scrollLeft = loopPos(target); return; }
      anim = { from: cur, to: target, cur: cur, start: performance.now(), dur: dur };
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function go(dir) { moveBy(stepW() * dir, 550); }

    var btnPrev = document.getElementById('workPrev');
    var btnNext = document.getElementById('workNext');
    if (btnPrev) btnPrev.addEventListener('click', function () { go(-1); });
    if (btnNext) btnNext.addEventListener('click', function () { go(1); });

    /* Arrastrar con el ratón (en táctil ya funciona el swipe nativo) */
    var drag = null, dragged = false;

    wrap.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { startX: e.clientX, lastX: e.clientX };
      dragged = false;
    });

    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.lastX;
      drag.lastX = e.clientX;
      if (!dragged && Math.abs(e.clientX - drag.startX) > 6) {
        dragged = true;
        anim = null;
        wrap.classList.add('is-dragging');
      }
      if (dragged) wrap.scrollLeft -= dx;
    });

    function endDrag() {
      if (!drag) return;
      drag = null;
      wrap.classList.remove('is-dragging');
    }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    /* Si se ha arrastrado, no abrir el proyecto al soltar */
    wrap.addEventListener('click', function (e) {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    }, true);

    wrap.addEventListener('dragstart', function (e) { e.preventDefault(); });

    /* ── Scroll vertical → horizontal en la sección work ──
       Al llegar a work, la rueda recorre los proyectos en horizontal.
       Cuando se han visto todos, el siguiente gesto continúa a contact
       (o a info si se va hacia arriba). */
    var workSec = document.getElementById('work');
    if (workSec) {
      var acc = 0;              /* recorrido horizontal hecho en esta visita */
      var wasActive = false;
      var lastY = window.scrollY;
      var lastWheel = 0;
      var edgeGesture = false;  /* el gesto actual ya ha tocado el final */

      function wheelLimit() {
        var padX = parseFloat(getComputedStyle(grid).paddingLeft) || 0;
        return Math.max(0, setW - wrap.clientWidth + padX);
      }

      function workActive() {
        return Math.abs(workSec.getBoundingClientRect().top) < 4;
      }

      /* Al entrar desde arriba empieza al principio; desde abajo, al final */
      window.addEventListener('scroll', function () {
        var active = workActive();
        if (active && !wasActive) {
          acc = (lastY > workSec.offsetTop) ? wheelLimit() : 0;
          edgeGesture = false;
        }
        wasActive = active;
        lastY = window.scrollY;
      }, { passive: true });

      window.addEventListener('wheel', function (e) {
        if (!setW || e.ctrlKey) return;
        if (e.target.closest && e.target.closest('.overlay')) return;
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;  /* gesto horizontal: nativo */
        if (!workActive()) return;

        var now = performance.now();
        var sameGesture = (now - lastWheel) < 220;
        lastWheel = now;
        if (!sameGesture) edgeGesture = false;

        var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? wrap.clientWidth : 1);
        var limit = wheelLimit();
        var atEnd   = dy > 0 && acc >= limit - 1;
        var atStart = dy < 0 && acc <= 1;

        if (atEnd || atStart) {
          e.preventDefault();
          /* El gesto que llega al final no sale de la sección (evita que la
             inercia del trackpad salte a contact); el siguiente gesto sí. */
          if (edgeGesture) return;
          edgeGesture = true;
          var next = atEnd ? workSec.nextElementSibling : workSec.previousElementSibling;
          if (next) next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
          return;
        }

        e.preventDefault();
        var d = Math.max(-acc, Math.min(limit - acc, dy));
        acc += d;
        if (acc <= 1 || acc >= limit - 1) edgeGesture = true;
        moveBy(d, 380);
      }, { passive: false });
    }
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

  /* ── Vídeos de fondo ──
     Se muestra el GIF hasta que el vídeo está realmente reproduciéndose.
     Si Safari lo pausa o bloquea (p. ej. modo de bajo consumo), se vuelve
     al GIF en lugar de enseñar el botón de play. iPhone/iPad: solo GIF. */
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function setupBgVideo(video, gif, onShowVideo, onShowGif) {
    if (!video) return;

    function showGif() {
      video.style.display = 'none';
      if (gif) gif.style.display = 'block';
      if (onShowGif) onShowGif();
    }
    function showVideo() {
      video.style.display = 'block';
      if (gif) gif.style.display = 'none';
      if (onShowVideo) onShowVideo();
    }
    function tryPlay() {
      var p = video.play();
      if (p && p.catch) p.catch(showGif);
    }

    showGif();
    if (isIOS) {
      video.removeAttribute('autoplay');
      video.preload = 'none';
      return;
    }

    video.muted = true;
    video.addEventListener('playing', showVideo);
    video.addEventListener('pause', function () {
      if (document.visibilityState === 'visible') showGif();
    });
    tryPlay();

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') tryPlay();
    });

    /* Reintenta al volver a verse en pantalla */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && video.paused) tryPlay();
      }, { threshold: 0.1 }).observe(video.parentElement || video);
    }
  }

  var bgGif = document.querySelector('.hero-bg-gif');
  setupBgVideo(
    document.querySelector('.hero-bg-video'),
    bgGif,
    function () { if (bgGif) bgGif.classList.remove('desktop-fallback'); },
    function () { if (bgGif && !isIOS) bgGif.classList.add('desktop-fallback'); }
  );

  setupBgVideo(
    document.querySelector('.contact-bg-video'),
    document.querySelector('.contact-bg-gif')
  );

})();
