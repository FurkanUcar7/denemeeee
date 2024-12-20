(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
  new MutationObserver(e => {
    for (const s of e)
      if (s.type === 'childList')
        for (const d of s.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && o(d);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function i(e) {
    const s = {};
    return (
      e.integrity && (s.integrity = e.integrity),
      e.referrerPolicy && (s.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function o(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = i(e);
    fetch(e.href, s);
  }
})();
function j() {
  const t = window.location.pathname,
    n = document.querySelectorAll('#header-links a'),
    i = document.querySelector('.menu-button'),
    o = document.querySelector('.responsive-overlay'),
    e = document.querySelector('.responsive-menu'),
    s = document.querySelector('body');
  let d = !1;
  i.addEventListener('click', () => {
    e.classList.add('active-responsive-menu'),
      o.classList.add('active-overlay'),
      (s.style.overflow = 'hidden'),
      (d = !0);
  }),
    document.addEventListener('click', m => {
      d &&
        !e.contains(m.target) &&
        !i.contains(m.target) &&
        (e.classList.remove('active-responsive-menu'),
        o.classList.remove('active-overlay'),
        (s.style.overflow = 'auto'),
        (d = !1));
    }),
    window.addEventListener('resize', () => {
      d &&
        (e.classList.remove('active-responsive-menu'),
        o.classList.remove('active-overlay'),
        (s.style.overflow = 'auto'),
        (d = !1));
    }),
    n.forEach(m => {
      '/cinemania' +
        new URL(m.getAttribute('href'), window.location.origin).pathname ===
        t && m.classList.add('active-link');
    });
}
const ae = document.querySelector('.popup-section'),
  W = document.querySelector('.popup-section-container'),
  Z = document.querySelector('.close-btn'),
  K = document.querySelector('body');
let U = !1;
function re() {
  U ||
    ((U = !0),
    W.classList.remove('hidden'),
    (K.style.overflow = 'hidden'),
    se());
}
function F() {
  U && ((U = !1), W.classList.add('hidden'), (K.style.overflow = 'auto'), ce());
}
function se() {
  document.addEventListener('click', V),
    document.addEventListener('keydown', Q),
    Z.addEventListener('click', F);
}
function ce() {
  document.removeEventListener('click', V),
    document.removeEventListener('keydown', Q),
    Z.removeEventListener('click', F);
}
function V(t) {
  ae.contains(t.target) || F();
}
function Q(t) {
  t.key === 'Escape' && F();
}
const X = '3e7bd78082a78694a13d5e52c5addee0';
document.querySelector('#trailer-iframe');
document.querySelector('.popup-section');
const le = document.querySelector('.popup-section-container'),
  ee = document.querySelector('.popup-content-container'),
  $ = document.querySelector('.popup-trailer');
function Y() {
  le.classList.contains('hidden') || re();
}
function G(t) {
  const n = document.querySelector('.afis-img'),
    i = document.querySelector('.film-title'),
    o = document.querySelector('.average-rating'),
    e = document.querySelector('.vote-count'),
    s = document.querySelector('.genre'),
    d = document.querySelector('.popularity'),
    m = document.querySelector('.film-about-desc');
  (async () => {
    p();
    try {
      const b = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${t}?api_key=${X}&language=en-US`
        )
      ).json();
      _(b);
    } catch (u) {
      console.error('Error fetching details:', u);
    }
  })();
  function _(u) {
    p(),
      (n.src = `https://image.tmdb.org/t/p/original/${u.poster_path}`),
      (n.alt = u.title),
      (i.textContent = u.title),
      (o.textContent = u.vote_average.toFixed(1)),
      (e.textContent = u.vote_count),
      (d.textContent = u.popularity.toFixed(1)),
      (s.textContent = u.genres.map(b => b.name).join(', ')),
      (m.textContent = u.overview),
      Y();
  }
  function p() {
    ($.style.display = 'none'),
      (ee.style.display = 'flex'),
      (n.src = 'loading-placeholder.png'),
      (i.textContent = 'Loading...'),
      (o.textContent = ''),
      (e.textContent = ''),
      (d.textContent = ''),
      (s.textContent = ''),
      (m.textContent = 'Fetching details, please wait...');
  }
}
async function de(t) {
  function n() {
    (ee.style.display = 'none'), ($.style.display = 'flex');
  }
  try {
    const o = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${t}/videos?api_key=${X}&language=en-US`
      )
    ).json();
    let e;
    if (o.id)
      e = o.results.find(s => s.type === 'Trailer' || s.type === 'Teaser');
    else if (o.success === !1) {
      n(),
        Y(),
        ($.innerHTML += `<div class="no-trailer-container">
      <div class="no-trailer-desc"><h1 class="no-trailer-title">OPPSSS..</h1><h1 class="no-trailer-title">We are very sorry!</h1> <h1 class="no-trailer-title">But we couldn't find trailer for this movie</h1></div>
      <div class="no-trailer-image"> <img src="svg/noTrailerImage.svg" alt="" /></div>
      </div>`);
      return;
    }
    Y(),
      e
        ? (n(),
          ($.innerHTML += `<iframe id="trailer-iframe" src="https://www.youtube.com/embed/${e.key}" allowfullscreen></iframe>`))
        : (n(), ($.innerHTML += '<p>No trailer available</p>'));
  } catch (i) {
    console.error('Error fetching trailer:', i);
  }
}
function R(t) {
  const n = {
      fullStar: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.852 16.875C13.7336 16.8755 13.6181 16.8386 13.5219 16.7696L9.00048 13.4916L4.47903 16.7696C4.38243 16.8396 4.26606 16.8772 4.14673 16.8767C4.0274 16.8763 3.91129 16.8379 3.81521 16.7672C3.71912 16.6964 3.64803 16.5969 3.61221 16.4831C3.57639 16.3693 3.5777 16.247 3.61594 16.134L5.37938 10.9108L0.809069 7.77661C0.710073 7.7088 0.635356 7.61111 0.595836 7.49781C0.556316 7.3845 0.554063 7.26154 0.589407 7.14686C0.624751 7.03219 0.695839 6.93183 0.792285 6.86044C0.888732 6.78904 1.00548 6.75036 1.12548 6.75005H6.76384L8.4654 1.51352C8.50205 1.40047 8.57358 1.30193 8.6697 1.23204C8.76583 1.16216 8.88163 1.12451 9.00048 1.12451C9.11932 1.12451 9.23512 1.16216 9.33125 1.23204C9.42738 1.30193 9.4989 1.40047 9.53555 1.51352L11.2371 6.75181H16.8755C16.9956 6.75175 17.1126 6.79016 17.2094 6.86141C17.3061 6.93267 17.3775 7.03303 17.413 7.14778C17.4486 7.26254 17.4465 7.38568 17.407 7.49915C17.3675 7.61262 17.2928 7.71047 17.1936 7.77837L12.6216 10.9108L14.384 16.1325C14.4125 16.2171 14.4205 16.3072 14.4074 16.3955C14.3942 16.4837 14.3603 16.5676 14.3083 16.6401C14.2563 16.7127 14.1879 16.7718 14.1085 16.8127C14.0292 16.8535 13.9413 16.8749 13.852 16.875Z" fill="url(#paint0_linear_405_1426)"/>
<defs>
<linearGradient id="paint0_linear_405_1426" x1="2.62549" y1="2.25006" x2="13.8755" y2="17.2501" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
`,
      halfStar: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1428)" stroke-linejoin="round"/>
<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_405_1428)"/>
<defs>
<linearGradient id="paint0_linear_405_1428" x1="3.375" y1="2.625" x2="14.625" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
<linearGradient id="paint1_linear_405_1428" x1="5.0625" y1="1.6875" x2="5.0625" y2="16.3125" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
`,
      emptyStar: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1431)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_1431" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
`,
    },
    i = 5,
    o = Math.floor(t / 2),
    e = t % 2 >= 0.5,
    s = i - o - (e ? 1 : 0);
  if (t === 0) return 'NOT RELEASED YET';
  let d = n.fullStar.repeat(o);
  return e && (d += n.halfStar), (d += n.emptyStar.repeat(s)), d;
}
function te(t) {
  let n = JSON.parse(localStorage.getItem('myLibrary')) || [];
  n.includes(t) ||
    (n.push(t), localStorage.setItem('myLibrary', JSON.stringify(n)), P(!0, t));
}
function ne(t) {
  const n = window.location.pathname;
  let i = JSON.parse(localStorage.getItem('myLibrary')) || [];
  (i = i.filter(o => o !== t)),
    localStorage.setItem('myLibrary', JSON.stringify(i)),
    P(!1, t),
    n.includes('mylibrary.html') && (me(t), ue());
}
function me(t) {
  const n = document.querySelector(`[data-movie-id="${t}"]`);
  n && n.remove();
  const i = JSON.parse(localStorage.getItem('myLibrary')) || [],
    o = document.querySelector('#catalog-movie-gallery');
  i.length === 0 &&
    (o.innerHTML =
      '<div class="removed-message-container"><h1 class="removed-message">You Successfully Removed All Movies From Your Library</h1></div>');
}
function ue() {
  const t = document.querySelector('.popup-section-container');
  t && (t.classList.add('hidden'), (document.body.style.overflow = 'auto'));
}
function O(t) {
  return (JSON.parse(localStorage.getItem('myLibrary')) || []).includes(t);
}
function P(t, n) {
  const i = document.querySelectorAll('.add-btn'),
    o = document.querySelectorAll('.remove-btn');
  t
    ? (i.forEach(e => e.classList.add('hidden')),
      o.forEach(e => e.classList.remove('hidden')))
    : (i.forEach(e => e.classList.remove('hidden')),
      o.forEach(e => e.classList.add('hidden'))),
    i.forEach(e => (e.onclick = () => te(n))),
    o.forEach(e => (e.onclick = () => ne(n)));
}
function pe(t) {
  const n = document.getElementById('upcoming-add-btn'),
    i = document.getElementById('upcoming-remove-btn');
  function o() {
    O(t)
      ? (n.classList.add('hidden'), i.classList.remove('hidden'))
      : (n.classList.remove('hidden'), i.classList.add('hidden'));
  }
  (n.onclick = () => {
    te(t), o();
  }),
    (i.onclick = () => {
      ne(t), o();
    }),
    o();
}
function A() {
  const t = '3e7bd78082a78694a13d5e52c5addee0',
    n = window.location.pathname,
    i = document.querySelector('.popup-trailer'),
    o = document.getElementById('movies-image-container'),
    e = document.getElementById('movies-description-container'),
    s = document.querySelector('.popup-section-container'),
    d = document.querySelector('body'),
    m = () => {
      n.includes('/') || n.includes('catalog.html')
        ? ((o.innerHTML =
            '<img class="image" src="./img/stranger_things.jpeg"/>'),
          (e.innerHTML = `
        <h1 class="hero-movie-title">Let's Make Your Own Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
          <div class="hero-movie-buttons">
            <button class="orange-button btn-hero trailer">Get Started</button>
          </div>
        </div>
      `))
        : ((o.innerHTML = '<img class="image" src="./img/seats.png"/>'),
          (e.innerHTML = `
        <h1 class="hero-movie-title">Create Your Dream Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc"> Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
        </div>
      `));
    },
    E = async () => {
      try {
        const p = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${t}&language=en-US`
        );
        if (!p.ok) throw (m(), new Error('Failed to fetch trending movies'));
        const l = (await p.json()).results.filter(
            a => new Date(a.release_date).getFullYear() >= 2024
          ),
          r = l[Math.floor(Math.random() * l.length)];
        _(r);
      } catch (p) {
        console.error('Error fetching trending movies:', p);
      }
    },
    _ = async p => {
      try {
        const b = await (
            await fetch(
              `https://api.themoviedb.org/3/movie/${p.id}/images?&api_key=${t}&language=en&language=null`
            )
          ).json(),
          l = b.backdrops[Math.floor(Math.random() * b.backdrops.length)],
          r = p.overview.split(' ').slice(0, 40).join(' '),
          a = window.innerWidth,
          h = l.file_path;
        let g = '';
        a > 700
          ? (g = `https://image.tmdb.org/t/p/original${h}`)
          : (g = `https://image.tmdb.org/t/p/w500${h}`),
          (o.innerHTML = `<img class="image" src="${g}" alt="${p.title}" /> <div class="gradient"></div>`),
          (e.innerHTML = `
        <h1 class="hero-movie-title">${p.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <div class="desc-button-container">
          <p class="hero-movie-desc">${r}...</p>
          <div class="hero-movie-buttons">
            <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
            <button id="details" class="white-button btn-hero details">More details</button>
          </div>
        </div>
      `),
          (starsContainer.innerHTML = R(p.vote_average));
        const w = document.getElementById('trailer');
        document.getElementById('details').addEventListener('click', () => {
          s.classList.remove('hidden'), (d.style.overflow = 'hidden');
          const M = p.id;
          G(M);
          const B = O(M);
          P(B, M);
        }),
          w.addEventListener('click', async () => {
            s.classList.remove('hidden'),
              (d.style.overflow = 'hidden'),
              (i.innerHTML = ''),
              de(p.id);
          });
      } catch (u) {
        console.error('Error displaying movie:', u);
      }
    };
  E();
}
async function oe() {
  const t = '3e7bd78082a78694a13d5e52c5addee0',
    n =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' +
      t,
    i = 'https://image.tmdb.org/t/p/w500';
  let o = '',
    e = '';
  const s = window.location.pathname,
    d = document.querySelector('.pagination'),
    m = s.includes('catalog'),
    E = document.getElementById('catalog-movie-gallery'),
    _ = document.querySelector('.catalog-desc-container'),
    p = m ? document.getElementById('prevPageBtn') : null,
    u = m ? document.getElementById('nextPageBtn') : null,
    b = m ? document.querySelector('.page-numbers') : null,
    l = m ? document.getElementById('searchButton') : null,
    r = m ? document.getElementById('movieYear') : null;
  let a = 1,
    h = {},
    g = 100;
  m
    ? (_.style.display = 'none')
    : ((_.style.display = 'flex'), (d.style.display = 'none'));
  async function w() {
    const v = `https://api.themoviedb.org/3/genre/movie/list?api_key=${t}&language=en-US`;
    try {
      h = (await (await fetch(v)).json()).genres.reduce(
        (C, c) => ((C[c.id] = c.name), C),
        {}
      );
    } catch (y) {
      console.error('Error fetching genres:', y);
    }
  }
  async function S(v = 1, y = '', x = '') {
    const C = Math.ceil((v * 9) / 20);
    let c = `${n}&page=${C}`;
    y && !x
      ? (c = `https://api.themoviedb.org/3/search/movie?query=${y}&api_key=${t}&page=${C}`)
      : y &&
        x &&
        (c = `https://api.themoviedb.org/3/search/movie?api_key=${t}&query=${y}&primary_release_year=${x}&page=${C}`);
    try {
      const L = await (await fetch(c)).json();
      if (s.includes('catalog')) {
        const k = ((v - 1) % 2) * 9,
          q = L.results.slice(k, k + 9);
        M(q);
      } else {
        const k = ((v - 1) % 2) * 3,
          q = L.results.slice(k, k + 3);
        M(q);
      }
      return m && ((g = Math.min(L.total_pages, 1e3)), B()), L;
    } catch (f) {
      console.error('Error fetching movies:', f);
    }
  }
  function M(v) {
    (E.innerHTML = ''),
      v.forEach(c => {
        const f = document.createElement('div');
        f.classList.add('catalog-movie-card'), (f.dataset.movieId = c.id);
        const L = document.createElement('img');
        (L.src = i + c.poster_path),
          (L.alt = c.title),
          L.classList.add('catalog-movie-poster');
        const k = document.createElement('div');
        k.classList.add('catalog-movie-info');
        const q = document.createElement('h2');
        (q.textContent = c.title), q.classList.add('catalog-movie-title');
        const H = document.createElement('div');
        H.classList.add('catalog-movie-details-rating');
        const D = document.createElement('p'),
          z = c.genre_ids.map(ie => h[ie] || 'Unknown').filter(Boolean);
        (D.textContent = `${z[0]}, ${z[1]} | ${c.release_date.split('-')[0]}`),
          D.classList.add('catalog-movie-details');
        const N = document.createElement('p');
        (N.innerHTML = R(c.vote_average)),
          N.classList.add('catalog-movie-rating'),
          k.appendChild(q),
          H.appendChild(D),
          H.appendChild(N),
          k.appendChild(H),
          f.appendChild(L),
          f.appendChild(k),
          E.appendChild(f);
      });
    const y = document.querySelectorAll('.catalog-movie-card'),
      x = document.querySelector('.popup-section-container'),
      C = document.querySelector('body');
    y.forEach(c => {
      c.addEventListener('click', f => {
        const L = Number(f.currentTarget.dataset.movieId);
        G(L), x.classList.remove('hidden'), (C.style.overflow = 'hidden');
        const k = O(L);
        P(k, L);
      });
    });
  }
  function B() {
    if (!m) return;
    b.innerHTML = '';
    const v = 3,
      y = 1;
    if ((I(1), a > y + 2)) {
      const c = document.createElement('span');
      (c.textContent = '...'), b.appendChild(c);
    }
    const x = Math.max(2, a - Math.floor(v / 2)),
      C = Math.min(g - 1, a + Math.floor(v / 2));
    for (let c = x; c <= C; c++) I(c);
    if (a < g - y - 1) {
      const c = document.createElement('span');
      (c.textContent = '...'), b.appendChild(c);
    }
    g > 1 && I(g), (p.disabled = a === 1), (u.disabled = a === g);
  }
  async function I(v) {
    const y = document.createElement('button');
    (y.textContent = v),
      y.classList.add('page-number'),
      v === a && y.classList.add('active'),
      y.addEventListener('click', async () => {
        (a = v), await S(a), B();
      }),
      b.appendChild(y);
  }
  m &&
    (p.addEventListener('click', async () => {
      a > 1 && (a--, await S(a), B());
    }),
    u.addEventListener('click', async () => {
      a < g && (a++, await S(a), B());
    }),
    document.getElementById('movieName').addEventListener('input', () => {
      const v = document.getElementById('movieYear');
      (v.innerHTML = ''), (r.style.display = 'none'), (e = '');
    }),
    l.addEventListener('click', async () => {
      try {
        (o = document.getElementById('movieName').value),
          (e = document.getElementById('movieYear').value || '');
        const v = async (x, C = '') => await S(1, x, C);
        m && B();
        const y = await v(o, e);
        if (
          (y.results.length === 0 || o === ''
            ? (r.style.display = 'none')
            : (r.style.display = 'block'),
          Array.isArray(y.results))
        ) {
          if (!e) {
            const x = y.results
                .map(f =>
                  f.release_date ? new Date(f.release_date).getFullYear() : null
                )
                .filter(f => f !== null),
              C = [...new Set(x)].sort((f, L) => f - L),
              c = document.getElementById('movieYear');
            c.innerHTML === '' &&
              C.forEach(f => {
                const L = document.createElement('option');
                (L.value = f), (L.text = f), c.appendChild(L);
              });
          }
        } else console.error('Beklenmeyen sonuç: movies bir dizi değil');
      } catch (v) {
        console.error('Film verilerini işlerken hata:', v);
      }
    }));
  async function T() {
    await w(), await S();
  }
  T();
}
function ge() {
  const t = '3e7bd78082a78694a13d5e52c5addee0',
    n = `https://api.themoviedb.org/3/movie/upcoming?api_key=${t}&language=en-US`,
    i = `https://api.themoviedb.org/3/genre/movie/list?api_key=${t}&language=en-US`,
    o = document.getElementById('movie-poster'),
    e = document.getElementById('movie-title'),
    s = document.getElementById('release-date'),
    d = document.getElementById('vote-average'),
    m = document.getElementById('vote-count'),
    E = document.getElementById('popularity'),
    _ = document.getElementById('genres'),
    p = document.getElementById('overview');
  let u = {};
  fetch(i)
    .then(l => l.json())
    .then(l => {
      l.genres.forEach(r => {
        u[r.id] = r.name;
      }),
        fetch(n)
          .then(r => r.json())
          .then(r => {
            const a = r.results;
            if (a.length > 0) {
              const h = a[Math.floor(Math.random() * a.length)];
              b(h);
            } else
              document.querySelector('.upcoming__title').textContent =
                'No upcoming movies this month';
          })
          .catch(r => console.error('Error fetching movies:', r));
    })
    .catch(l => console.error('Error fetching genres:', l));
  function b(l) {
    (o.src = `https://image.tmdb.org/t/p/original/${l.backdrop_path}`),
      (o.alt = l.title),
      (e.textContent = l.title.toUpperCase()),
      (s.textContent = l.release_date),
      (d.textContent = l.vote_average),
      (m.textContent = l.vote_count),
      (E.textContent = l.popularity.toFixed(1)),
      (_.textContent = l.genre_ids.map(r => u[r]).join(', ')),
      l.overview && l.overview.trim() !== ''
        ? (p.textContent = l.overview)
        : (p.textContent = 'No overview available for this movie.'),
      pe(l.id);
  }
}
function J() {
  document.addEventListener('DOMContentLoaded', () => {
    const t = document.getElementById('theme-toggle'),
      n = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(n),
      t.addEventListener('click', () => {
        document.body.classList.toggle('light-theme'),
          document.body.classList.toggle('dark-theme');
        const i = document.body.classList.contains('dark-theme')
          ? 'dark-theme'
          : 'light-theme';
        localStorage.setItem('theme', i);
      });
  });
}
function ye() {
  const t = JSON.parse(localStorage.getItem('myLibrary')) || [];
  let n = [],
    i = [];
  const o = document.querySelector('#catalog-movie-gallery'),
    e = document.querySelector('.load-more-button'),
    s = document.querySelector('.empty-library-container'),
    d = document.querySelector('.search-movie-button'),
    m = 'https://image.tmdb.org/t/p/w500';
  let E = 0;
  const _ = 9,
    p = async () => {
      try {
        const r = t.map(async a => {
          const h = await fetch(
            `https://api.themoviedb.org/3/movie/${a}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`
          );
          if (!h.ok) throw new Error('API request failed');
          return h.json();
        });
        (n = await Promise.all(r)), (i = n), u(), l(n);
      } catch (r) {
        console.error('Error fetching films:', r);
      }
    };
  function u() {
    i.slice(E, E + _).forEach(a => {
      const h = b(a);
      o.appendChild(h);
    }),
      (E += _),
      E >= i.length
        ? ((e.style.display = 'none'),
          (d.style.display = 'none'),
          (s.style.display = 'none'))
        : ((s.style.display = 'none'),
          (e.style.display = 'flex'),
          (d.style.display = 'none'));
  }
  function b(r) {
    const a = document.createElement('div');
    a.classList.add('catalog-movie-card'), (a.dataset.movieId = r.id);
    const h = document.createElement('img');
    (h.src = m + r.poster_path),
      (h.alt = r.title),
      h.classList.add('catalog-movie-poster');
    const g = document.createElement('div');
    g.classList.add('catalog-movie-info');
    const w = document.createElement('h2');
    (w.textContent = r.title), w.classList.add('catalog-movie-title');
    const S = document.createElement('div');
    S.classList.add('catalog-movie-details-rating');
    const M = document.createElement('p'),
      B = r.genres.map(T => T.name);
    (M.textContent = `${B[0]}, ${B[1]} | ${r.release_date.split('-')[0]}`),
      M.classList.add('catalog-movie-details');
    const I = document.createElement('p');
    return (
      (I.innerHTML = R(r.vote_average)),
      I.classList.add('catalog-movie-rating'),
      g.appendChild(w),
      S.appendChild(M),
      S.appendChild(I),
      g.appendChild(S),
      a.appendChild(h),
      a.appendChild(g),
      a.addEventListener('click', () => {
        G(r.id),
          document
            .querySelector('.popup-section-container')
            .classList.remove('hidden'),
          (document.body.style.overflow = 'hidden');
        const T = O(r.id);
        P(T, r.id);
      }),
      a
    );
  }
  function l(r) {
    const a = document.getElementById('film-category'),
      h = new Set();
    r.forEach(g => {
      g.genres.forEach(w => {
        h.add(w.name);
      });
    }),
      h.forEach(g => {
        const w = document.createElement('option');
        (w.value = g), (w.innerText = g), a.appendChild(w);
      }),
      a.addEventListener('change', g => {
        const w = g.target.value;
        (o.innerHTML = ''),
          (E = 0),
          w === ''
            ? (i = n)
            : (i = n.filter(S => S.genres.some(M => M.name === w))),
          u();
      });
  }
  e.addEventListener('click', u), t.length > 0 && p();
}
window.location.pathname.includes('catalog.html') && (j(), A(), oe(), J());
window.location.pathname.includes('mylibrary.html') && (j(), A(), J(), ye());
!window.location.pathname.includes('mylibrary.html') &&
  !window.location.pathname.includes('catalog.html') &&
  (j(), A(), ge(), oe(), J());
//# sourceMappingURL=main-D0hpWCf2.js.map
