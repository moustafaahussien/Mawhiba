/* =========================================================
   منصة الموهبة – الوظائف المشتركة (صفحات المسابقات)
   ========================================================= */
(function () {
  const TP = window.TP = {};
  const CFG = window.TP_CONFIG || {};
  TP.DATA_SCRIPT_URL = CFG.DATA_SCRIPT_URL || '';

  /* ---------- اللغة ---------- */
  let lang = 'ar';
  try { lang = localStorage.getItem('tp-lang') || 'ar'; } catch (e) {}
  const handlers = [];
  TP.lang = () => lang;
  /* تستخدمها الصفحة الرئيسية لمزامنة لغتها مع هذه الأدوات */
  TP.setLang = l => { lang = l === 'en' ? 'en' : 'ar'; };
  TP.onLang = fn => handlers.push(fn);
  TP.tx = o => o == null ? '' : (typeof o === 'string' ? o : (o[lang] != null ? o[lang] : (o.ar != null ? o.ar : '')));
  TP.dict = {};
  TP.t = k => (TP.dict[lang] && TP.dict[lang][k] != null) ? TP.dict[lang][k] : ((TP.dict.ar && TP.dict.ar[k]) || k);
  TP.addDict = d => { ['ar', 'en'].forEach(l => { TP.dict[l] = Object.assign(TP.dict[l] || {}, d[l] || {}); }); };
  TP.addDict({
    ar: { brand:'منصة الموهبة', school:'مدارس دار الذكر', 'alt.logo':'شعار مدارس دار الذكر', 'aria.menu':'القائمة', 'aria.lang':'اللغة', 'nav.home':'الرئيسية', 'nav.model':'مكونات النموذج', 'nav.comps':'المسابقات', 'nav.mtest':'مقياس موهبة', 'nav.kpis':'المؤشرات والتقارير',
          'footer.sijil':'دخول المعلمين', 'footer.admin':'دخول المشرف', 'footer.credit':'إعداد وتصميم: مصطفى أحمد حسين',
          'st.open':'التسجيل مفتوح', 'st.soon':'يفتح قريباً', 'st.closed':'التسجيل مغلق' },
    en: { brand:'Talent Platform', school:'Dar Al-Thikr Schools', 'alt.logo':'Dar Al-Thikr Schools logo', 'aria.menu':'Menu', 'aria.lang':'Language', 'nav.home':'Home', 'nav.model':'Model components', 'nav.comps':'Competitions', 'nav.mtest':'Mawhiba Test', 'nav.kpis':'KPIs & Reports',
          'footer.sijil':'Teachers’ login', 'footer.admin':'Supervisor login', 'footer.credit':'Prepared and designed by: Moustafa Ahmed Hussien',
          'st.open':'Registration open', 'st.soon':'Opening soon', 'st.closed':'Registration closed' }
  });
  TP.applyLang = function () {
    const h = document.documentElement;
    h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = TP.t(el.dataset.i18n); if (typeof v === 'string') el.textContent = v; });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = TP.t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = TP.t(el.dataset.i18nAlt); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', TP.t(el.dataset.i18nAria)); });
    handlers.forEach(fn => fn(lang));
  };
  TP.toggleLang = function () {
    lang = lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('tp-lang', lang); } catch (e) {}
    TP.applyLang();
  };

  /* ---------- أدوات ---------- */
  TP.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  TP.safeUrl = u => (/^https?:\/\//i.test(u || '') || /^[\w-]+\.html(\?[\w=&-]*)?$/.test(u || '')) ? u : '';
  TP.num = v => {
    if (v == null) return null;
    const s = String(v).trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[,،٬\s%٪]/g, '');
    return (s === '' || isNaN(+s)) ? null : +s;
  };
  TP.fmt = n => n == null ? '—' : Number(n).toLocaleString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US', { maximumFractionDigits: 1 });
  /* ---------- التواريخ (كلها بتوقيت الرياض UTC+3) ----------
     تقبل: 2026-10-18 أو 18/10/2026، ومعها وقت اختياري: 2026-10-18 17:00
     أو وقت منفصل في المعامل الثاني ("17:00" أو "5:00 م") */
  const TZ = 'Asia/Riyadh', RIYADH_OFFSET = 3;
  function parseTime(t) {
    if (!t) return null;
    t = String(t).trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    const m = t.match(/(\d{1,2})(?::(\d{2}))?\s*(ص|م|am|pm|AM|PM)?/);
    if (!m) return null;
    let h = +m[1]; const mi = +(m[2] || 0), ap = (m[3] || '').toLowerCase();
    if ((ap === 'م' || ap === 'pm') && h < 12) h += 12;
    if ((ap === 'ص' || ap === 'am') && h === 12) h = 0;
    return (h > 23 || mi > 59) ? null : [h, mi];
  }
  TP.parseDate = function (s, time) {
    if (!s) return null;
    s = String(s).trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    let y, mo, d, rest;
    let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(.*)$/);
    if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; rest = m[4]; }
    else if ((m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(.*)$/))) { y = +m[3]; mo = +m[2]; d = +m[1]; rest = m[4]; }
    else return null;
    const tm = parseTime(time) || parseTime((rest || '').replace(/^[T\s]+/, ''));
    const dt = new Date(Date.UTC(y, mo - 1, d, (tm ? tm[0] : 0) - RIYADH_OFFSET, tm ? tm[1] : 0));
    dt.hasTime = !!tm;
    return dt;
  };
  const ymd = dt => { const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(dt);
    const g = t => +p.find(x => x.type === t).value; return { y: g('year'), m: g('month'), d: g('day') }; };
  TP.ymd = ymd;
  const LOC = () => lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB';
  TP.fmtDate = function (d, opts) {
    if (!d) return '';
    return d.toLocaleDateString(LOC(), Object.assign({ timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }, opts || {}));
  };
  TP.fmtTime = d => d && d.hasTime ? d.toLocaleTimeString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }) : '';
  TP.fmtMonth = d => d.toLocaleDateString(LOC(), { timeZone: TZ, month: 'short' });
  TP.fmtRange = function (a, b) {
    if (!a) return '';
    const A = ymd(a), B = b ? ymd(b) : null;
    if (!B || (A.y === B.y && A.m === B.m && A.d === B.d)) return TP.fmtDate(a);
    if (A.y === B.y) {
      if (A.m === B.m) return `${A.d}–${TP.fmtDate(b)}`;
      return `${TP.fmtDate(a, { year: undefined })} – ${TP.fmtDate(b)}`;
    }
    return `${TP.fmtDate(a)} – ${TP.fmtDate(b)}`;
  };
  /* نهاية الحدث: نهاية يوم الانتهاء، أو ساعتان بعد موعد محدد بالوقت */
  TP.endOf = function (i) {
    if (!i || !i.d) return null;
    if (i.e) return new Date(+i.e + (i.e.hasTime ? 0 : 864e5 - 1));
    return new Date(+i.d + (i.d.hasTime ? 2 * 36e5 : 864e5 - 1));
  };
  TP.phase = function (i, now) {
    now = now || Date.now();
    if (!i || !i.d) return 'undated';
    if (+TP.endOf(i) < now) return 'past';
    if (+i.d <= now) return 'cur';
    return 'future';
  };
  TP.today = () => new Date();

  /* ---------- الأيقونات ---------- */
  const IC = {
    kangaroo:'<path d="M18 4H6l6 8-6 8h12"/>',
    beaver:'<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
    atom:'<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/>',
    flask:'<path d="M9 3h6M10 3v6L5 18a2 2 0 001.8 3h10.4a2 2 0 001.8-3L14 9V3M7.5 14h9"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    robot:'<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9.5 13h.01M14.5 13h.01M9 16.5h6M2.5 12.5v3M21.5 12.5v3"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    folder:'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    coach:'<circle cx="12" cy="7" r="3.5"/><path d="M5 21a7 7 0 0114 0M12 14v3"/>',
    trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 6h3v2a3 3 0 01-3 3M7 6H4v2a3 3 0 003 3"/>',
    medal:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/>',
    file:'<path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z"/><path d="M14 3v5h5"/>',
    pdf:'<path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',
    video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    slides:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4M8 21h8"/>',
    sheet:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
    ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
    arrow:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20a6.5 6.5 0 0113 0M15 14.5a5 5 0 016.5 5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    brain:'<path d="M9 4a3 3 0 00-3 3v.3A3 3 0 004 10a3 3 0 001 2.2A3 3 0 006 17a3 3 0 003 3h1V4z"/><path d="M15 4a3 3 0 013 3v.3A3 3 0 0120 10a3 3 0 01-1 2.2A3 3 0 0118 17a3 3 0 01-3 3h-1V4z"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12.5h5"/>',
    chart:'<path d="M4 20V4M4 20h16"/><rect x="7" y="11" width="3" height="6" rx="1"/><rect x="12" y="7" width="3" height="10" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
    book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19V5M8 7h7"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'
  };
  TP.icon = (k, cls) => `<svg viewBox="0 0 24 24"${cls ? ` class="${cls}"` : ''}>${IC[k] || IC.star}</svg>`;

  /* ---------- البيانات (JSONP) ---------- */
  function jsonp(params, cb) {
    if (!TP.DATA_SCRIPT_URL) { cb(null, 'pending'); return; }
    let attempt = 0;
    (function go() {
      attempt++;
      const name = '__tp_cb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
      let done = false;
      const s = document.createElement('script');
      const finish = d => {
        if (done) return; done = true;
        clearTimeout(timer); try { delete window[name]; } catch (e) { window[name] = undefined; } s.remove();
        if (d) cb(d, 'live'); else if (attempt < 3) setTimeout(go, 1200 * attempt); else cb(null, 'error');
      };
      window[name] = d => finish(d);
      s.onerror = () => finish(null);
      const timer = setTimeout(() => finish(null), 15000);
      const q = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&');
      s.src = TP.DATA_SCRIPT_URL + (TP.DATA_SCRIPT_URL.includes('?') ? '&' : '?') + (q ? q + '&' : '') + 'callback=' + name;
      document.body.appendChild(s);
    })();
  }
  TP.loadData = cb => jsonp({}, cb);
  TP.loadFolder = (id, cb) => jsonp({ mode: 'files', folder: id }, cb);

  /* صفوف تبويب لمعرّف مسابقة (العمود «المعرّف» أينما كان) */
  TP.rowsFor = function (table, id) {
    if (!table || !table.rows) return [];
    let i = (table.headers || []).findIndex(h => /المعر[ّ]?ف|^id$/i.test(h));
    if (i < 0) i = 0;
    return table.rows.filter(r => String(r[i]).trim().toLowerCase() === id).map(r => r.filter((_, j) => j !== i));
  };
  /* حالة المسابقة من تبويب «المسابقات» */
  TP.compState = function (data, id) {
    const r = data ? TP.rowsFor(data.competitions, id)[0] : null;
    if (!r) return {};
    const st = String(r[1] || '').trim();
    const status = /مفتوح|open/i.test(st) ? 'open' : /قريب|soon/i.test(st) ? 'soon' : /مغلق|closed/i.test(st) ? 'closed' : '';
    const folder = String(r[3] || '').trim().replace(/^.*\/folders\/([\w-]+).*$/, '$1').replace(/^.*[?&]id=([\w-]+).*$/, '$1');
    return { status, regLink: TP.safeUrl(String(r[2] || '').trim()), folder, coordinator: r[4] || '', note: r[5] || '' };
  };
  TP.statusTag = s => s ? `<span class="tag status-${s}"><span class="dot"></span>${TP.t('st.' + s)}</span>` : '';

  /* مواعيد مسابقة: من الجدول إن وُجدت، وإلا من ملف البيانات */
  /* تبويب «المواعيد» بعد حذف عمود المعرّف: [المرحلة, Stage, من تاريخ, إلى تاريخ, ملاحظة, الوقت] */
  TP.compDates = function (comp, data) {
    const rows = data ? TP.rowsFor(data.dates, comp.id) : [];
    if (rows.length) {
      return { fromSheet: true, items: rows.map(r => ({ ar: r[0], en: r[1] || r[0], d: TP.parseDate(r[2], r[5]), e: TP.parseDate(r[3]), note: r[4] || '' }))
        .sort((a, b) => (a.d ? +a.d : 9e15) - (b.d ? +b.d : 9e15)) };
    }
    const tl = comp.timeline || { items: [] };
    return { fromSheet: false, label: tl.label, items: tl.items.map(i => ({ ar: i.ar, en: i.en, d: TP.parseDate(i.date, i.time), e: TP.parseDate(i.end), when: i.when, approx: i.approx, note: TP.tx(i.note) })) };
  };
  /* الموعد الحالي (جارٍ) أو أقرب موعد قادم */
  TP.nextDate = function (items) {
    const now = Date.now();
    const cur = items.filter(i => TP.phase(i, now) === 'cur').sort((a, b) => TP.endOf(a) - TP.endOf(b))[0];
    if (cur) return cur;
    return items.filter(i => TP.phase(i, now) === 'future').sort((a, b) => a.d - b.d)[0] || null;
  };
  TP.dateText = function (i) {
    if (i.approx && i.when) return TP.tx(i.when);
    if (i.d) { const t = TP.fmtTime(i.d); return TP.fmtRange(i.d, i.e) + (t ? (lang === 'ar' ? ' – الساعة ' : ' – ') + t : ''); }
    return TP.tx(i.when) || '';
  };

  /* ---------- العداد التنازلي ----------
     TP.countdown(item, {compact}) يعيد HTML، ويتحدث تلقائياً كل ثانية */
  TP.addDict({
    ar: { 'cd.d':'يوم', 'cd.h':'ساعة', 'cd.m':'دقيقة', 'cd.s':'ثانية', 'cd.starts':'يبدأ خلال', 'cd.ends':'ينتهي خلال', 'cd.now':'جارٍ الآن', 'cd.done':'انتهى', 'cd.approx':'موعد تقريبي' },
    en: { 'cd.d':'days', 'cd.h':'hours', 'cd.m':'min', 'cd.s':'sec', 'cd.starts':'Starts in', 'cd.ends':'Ends in', 'cd.now':'Ongoing', 'cd.done':'Ended', 'cd.approx':'Approximate date' }
  });
  TP.countdown = function (i, opt) {
    if (!i || !i.d) return '';
    const cur = TP.phase(i) === 'cur';
    const target = cur ? +TP.endOf(i) : +i.d;
    const c = opt && opt.compact;
    if (c) return `<span class="cd-mini" data-cd="${target}" data-cur="${cur ? 1 : 0}"></span>`;
    return `<div class="cd" data-cd="${target}" data-cur="${cur ? 1 : 0}">
      <div class="cd-lbl">${TP.t(cur ? 'cd.ends' : 'cd.starts')}${i.approx ? ` <small>(${TP.t('cd.approx')})</small>` : ''}</div>
      <div class="cd-boxes">${['d', 'h', 'm', 's'].map(k => `<div class="cd-box"><b data-u="${k}">--</b><span>${TP.t('cd.' + k)}</span></div>`).join('')}</div></div>`;
  };
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const now = Date.now();
    document.querySelectorAll('[data-cd]').forEach(el => {
      let ms = +el.dataset.cd - now;
      if (ms <= 0) {
        if (!el.dataset.fired) { el.dataset.fired = 1; if (TP._onCdEnd) setTimeout(TP._onCdEnd, 800); }
        ms = 0;
      }
      const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      if (el.classList.contains('cd-mini')) {
        el.textContent = ms === 0 ? TP.t('cd.done') : (el.dataset.cur === '1' ? TP.t('cd.ends') + ' ' : '') + (d ? `${TP.fmt(d)} ${TP.t('cd.d')} · ` : '') + `${pad(h)}:${pad(m)}:${pad(sec)}`;
      } else {
        const set = (u, v) => { const b = el.querySelector(`[data-u="${u}"]`); if (b && b.textContent !== String(v)) b.textContent = v; };
        set('d', TP.fmt(d)); set('h', pad(h)); set('m', pad(m)); set('s', pad(sec));
      }
    });
  }
  TP.onCountdownEnd = fn => { TP._onCdEnd = fn; };
  setInterval(tick, 1000);
  TP.tick = tick;

  /* ---------- تفاعل ---------- */
  let io = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0, rootMargin: '0px 0px -50px 0px' }) : null;
  TP.observe = els => (els || document.querySelectorAll('.reveal:not(.in)')).forEach(el => io ? io.observe(el) : el.classList.add('in'));

  document.documentElement.classList.add('js');
  document.addEventListener('DOMContentLoaded', () => {
    if (window.TP_HOST_PAGE) return; // الصفحة الرئيسية تدير زر اللغة والقائمة بنفسها
    const lb = document.getElementById('langBtn'); if (lb) lb.addEventListener('click', TP.toggleLang);
    const bg = document.getElementById('burger'), nl = document.getElementById('navLinks');
    if (bg && nl) { bg.addEventListener('click', () => nl.classList.toggle('open')); nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open'))); }
  });
  if (!window.TP_HOST_PAGE) document.addEventListener('pointermove', e => {
    const g = e.target.closest && e.target.closest('.glass'); if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
})();
