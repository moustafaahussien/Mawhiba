/* أدوات مشتركة: الاتصال بالجدول، التخزين المحلي، التاريخ الهجري */

const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const isDemo = () => !CONFIG.API_URL;
const normKey = s => String(s || '').trim().replace(/\s+/g, ' ');

/* العام الدراسي الهجري الحالي (يبدأ العام الدراسي تقريباً في صفر) */
function hijriYearNow() {
  try {
    const p = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { year: 'numeric', month: 'numeric' }).formatToParts(new Date());
    const y = +p.find(x => x.type === 'year').value, m = +p.find(x => x.type === 'month').value;
    return m >= 2 ? `${y}/${y + 1}هـ` : `${y - 1}/${y}هـ`;
  } catch (e) { return ''; }
}
function yearOptions() {
  const cur = hijriYearNow(); const y = parseInt(cur) || 1448;
  return [`${y - 1}/${y}هـ`, `${y}/${y + 1}هـ`, `${y + 1}/${y + 2}هـ`];
}
function todayStr() {
  try { return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()); }
  catch (e) { return new Date().toLocaleDateString(); }
}

/* JSONP — نفس طريقة منصة الموهبة */
function jsonp(params, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const cb = '__tf' + Date.now() + Math.floor(Math.random() * 1e4);
    const s = document.createElement('script');
    const t = setTimeout(() => { cleanup(); reject(new Error('انتهت مهلة الاتصال')); }, timeout);
    function cleanup() { clearTimeout(t); delete window[cb]; s.remove(); }
    window[cb] = d => { cleanup(); resolve(d); };
    s.onerror = () => { cleanup(); reject(new Error('تعذر الوصول إلى الجدول')); };
    s.src = CONFIG.API_URL + '?' + new URLSearchParams({ ...params, callback: cb }).toString();
    document.head.appendChild(s);
  });
}

function authErr(msg, d) { const e = new Error(msg); e.server = true; e.auth = !!(d && d.auth); if (e.auth) LS.set('tf_code', ''); return e; }

const API = {
  /* حفظ سجل */
  async submit(rec) {
    rec = Object.assign({}, rec, { code: LS.get('tf_code', '') });
    if (isDemo()) {
      const all = LS.get('tf_records', []);
      const i = all.findIndex(r => r.key === rec.key);
      if (i >= 0) all[i] = rec; else all.push(rec);
      LS.set('tf_records', all);
      return { ok: true, demo: true, updated: i >= 0 };
    }
    try {
      const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'submit', record: rec }) });
      const d = await r.json();
      if (d && d.ok) return d;
      throw authErr((d && d.error) || 'خطأ في الحفظ', d);
    } catch (e) {
      if (e.server) throw e;
      // بديل: الإرسال عبر JSONP
      const data = JSON.stringify(rec);
      if (data.length < 6000) {
        const d = await jsonp({ mode: 'submit', data });
        if (d && d.ok) return d;
        throw authErr((d && d.error) || e.message, d);
      }
      throw e;
    }
  },
  /* قائمة الطلاب (اختيارية) من ورقة «الطلاب» */
  async students() {
    if (isDemo()) return LS.get('tf_students', []);
    try { const d = await jsonp({ mode: 'students', code: LS.get('tf_code', '') }); return (d && d.students) || []; } catch (e) { return []; }
  },
  /* قوائم المشاركين في المسابقات (تحتاج رمز المعلمين) */
  async participants() {
    if (isDemo()) return { ok: true, demo: true, rows: LS.get('tf_participants', []) };
    return jsonp({ mode: 'participants', code: LS.get('tf_code', '') }, 40000);
  },
  /* رفع أسماء المشاركين من ملفات التسجيل (تحتاج رمز المعلمين) */
  async importParticipants(comp, year, rows) {
    if (isDemo()) {
      const all = LS.get('tf_participants', []), have = new Set(all.filter(r => r.comp === comp && r.year === year).map(r => normKey(r.name)));
      let added = 0;
      rows.forEach(r => { const n = normKey(r.name); if (!n || have.has(n)) return; have.add(n); added++;
        all.push({ comp, year, name: n, school: r.school, level: r.level, grade: r.grade, stage: 'مسجّل', date: r.date, note: r.note || '', subject: r.subject || '', cls: r.cls || '' }); });
      LS.set('tf_participants', all);
      return { ok: true, demo: true, added, kept: rows.length - added, total: have.size };
    }
    const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'importParticipants', code: LS.get('tf_code', ''), comp, year, rows }) });
    const d = await r.json();
    if (d && d.ok) return d;
    throw authErr((d && d.error) || 'تعذر الحفظ', d);
  },
  /* إضافة طالب أو أكثر يدوياً أو تعديله (تحتاج رمز المعلمين). للتعديل: orig = {comp, year, name} */
  async saveParticipants(rows) {
    if (isDemo()) {
      const all = LS.get('tf_participants', []), K = (c, y, n) => [c, y, normKey(n)].join('|');
      let added = 0, updated = 0, dup = 0;
      rows.forEach(r => {
        const row = { comp: r.comp, year: r.year, name: normKey(r.name), school: r.school || '', level: r.level || '', grade: r.grade || '',
          cls: r.cls || '', subject: r.subject || '', stage: r.stage || 'مسجّل', date: r.date || '', note: r.note || '' };
        if (!row.comp || !row.year || !row.name) return;
        const at = r.orig ? all.findIndex(x => K(x.comp, x.year, x.name) === K(r.orig.comp, r.orig.year, r.orig.name)) : -1;
        const clash = all.findIndex(x => K(x.comp, x.year, x.name) === K(row.comp, row.year, row.name));
        if (at >= 0) { if (clash >= 0 && clash !== at) { dup++; return; } all[at] = row; updated++; }
        else if (clash >= 0) dup++; else { all.push(row); added++; }
      });
      LS.set('tf_participants', all); return { ok: true, demo: true, added, updated, dup };
    }
    const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'saveParticipants', code: LS.get('tf_code', ''), rows }) });
    const d = await r.json();
    if (d && d.ok) return d;
    throw authErr((d && d.error) || 'تعذر الحفظ', d);
  },
  /* حذف طلاب من القوائم — بمفتاح المشرف فقط. items = [{comp, year, name}] */
  async deleteParticipants(items, key) {
    if (isDemo()) {
      const K = x => [x.comp, x.year, normKey(x.name)].join('|'), want = new Set(items.map(K));
      const all = LS.get('tf_participants', []), left = all.filter(x => !want.has(K(x)));
      LS.set('tf_participants', left); return { ok: true, demo: true, deleted: all.length - left.length };
    }
    const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'deleteParticipants', key, items }) });
    const d = await r.json();
    if (d && d.ok) return d;
    const e = new Error((d && d.error) || 'تعذر الحذف'); e.server = true; throw e;
  },
  /* إدارة البرامج: الفريق والمشاركون والجلسات لكل البرامج (تحتاج رمز المعلمين) */
  async programs() {
    if (isDemo()) { const d = LS.get('tf_programs', {}); return { ok: true, demo: true, staff: d.staff || [], people: d.people || [], sessions: d.sessions || [], plan: d.plan || [] }; }
    return jsonp({ mode: 'programs', code: LS.get('tf_code', '') }, 40000);
  },
  /* حفظ سطر أو أكثر: table = staff | people | sessions */
  async progSave(table, rows) {
    if (isDemo()) {
      const d = LS.get('tf_programs', {}), list = d[table] = d[table] || [], ids = [];
      rows.forEach(r => { const id = r.id || Math.random().toString(36).slice(2, 10); const i = list.findIndex(x => x.id === id);
        const row = Object.assign({}, r, { id }); if (i >= 0) list[i] = row; else list.push(row); ids.push(id); });
      LS.set('tf_programs', d); return { ok: true, demo: true, ids };
    }
    const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'progSave', code: LS.get('tf_code', ''), table, rows }) });
    const d = await r.json();
    if (d && d.ok) return d;
    throw authErr((d && d.error) || 'تعذر الحفظ', d);
  },
  /* الحذف بمفتاح المشرف فقط */
  async progDelete(table, ids, key) {
    if (isDemo()) { const d = LS.get('tf_programs', {}); d[table] = (d[table] || []).filter(x => !ids.includes(x.id)); LS.set('tf_programs', d); return { ok: true, demo: true, deleted: ids.length }; }
    const r = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'progDelete', key, table, ids }) });
    const d = await r.json();
    if (d && d.ok) return d;
    const e = new Error((d && d.error) || 'تعذر الحذف'); e.server = true; throw e;
  },
  /* التحقق من رمز المعلمين */
  async check(code) {
    if (isDemo()) return { ok: true, demo: true };
    return jsonp({ mode: 'check', code });
  },
  /* سجلات طالب واحد (تحتاج مفتاح المشرف) */
  async student(key, s) {
    const norm = x => normKey(x);
    if (isDemo()) return { ok: true, records: LS.get('tf_records', []).filter(r => r.studentId === s || norm(r.studentName) === norm(s)) };
    return jsonp({ mode: 'student', key, s }, 40000);
  },
  /* كل السجلات للتقارير (تحتاج مفتاح المشرف) */
  async report(key) {
    if (isDemo()) return { ok: true, records: LS.get('tf_records', []) };
    return jsonp({ mode: 'report', key }, 40000);
  }
};

/* طابور الإرسال عند انقطاع الاتصال */
const Queue = {
  list() { return LS.get('tf_queue', []); },
  add(rec) { const q = this.list().filter(r => r.key !== rec.key); q.push(rec); LS.set('tf_queue', q); },
  async flush() {
    const q = this.list(); if (!q.length || isDemo()) return 0;
    const left = []; let sent = 0;
    for (const r of q) { try { await API.submit(r); sent++; } catch (e) { left.push(r); } }
    LS.set('tf_queue', left); return sent;
  }
};

function toast(msg, type = 'ok') {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.className = 'toast ' + type; t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3800);
}

function demoBanner() {
  if (!isDemo()) return '';
  return `<div class="demo">وضع التجربة: البيانات تُحفظ في هذا المتصفح فقط. بعد ربط الجدول (ملف js/config.js) تُحفظ عندك في Google Sheet.</div>`;
}

function header(active) {
  const teacher = LS.get('tf_teacher', '');
  const cur = a => active === a ? ' class="cur"' : '';
  setTimeout(() => {
    const bg = $('#burger'), nl = $('#navLinks');
    if (bg && nl && !bg._b) { bg._b = 1; bg.addEventListener('click', () => nl.classList.toggle('open')); }
  });
  return `<div class="aurora" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
  <header class="nav">
    <a href="index.html" class="brand">
      <img class="brand-logo" src="assets/school-emblem.png" alt="شعار مدارس دار الذكر" width="48" height="48">
      <span><b>منصة الموهبة</b><small>${esc(CONFIG.SYSTEM)}</small></span>
    </a>
    <div class="nav-right">
      <nav class="nav-links" id="navLinks">
        <a href="index.html">الرئيسية</a>
        <a href="sijil.html"${cur('home')}>نماذج السجل التام</a>
        <a href="sijil-reports.html"${cur('reports')}>تقارير السجل</a>
        <a href="sijil-competitions.html"${cur('comps')}>المشاركون في المسابقات</a>
        <a href="sijil-programs.html"${cur('programs')}>إدارة البرامج</a>
      </nav>
      ${teacher ? `<span class="who nt" title="المستخدم الحالي">${esc(teacher)}</span>` : ''}
      <button class="lang" id="sjLang" type="button" aria-label="Language / اللغة"><span data-l="ar">ع</span><span data-l="en">EN</span></button>
      <button class="burger" id="burger" type="button" aria-label="القائمة"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}
function footerHtml() {
  return `<footer><div class="wrap"><div><b>منصة الموهبة</b> — مدارس دار الذكر · السجل التام لتطور الموهبة</div>
    <div>إعداد وإشراف: مصطفى أحمد حسين — المنسق التنفيذي لبرامج الموهبة والمسابقات الأكاديمية</div></div></footer>`;
}

/* رمز المعلمين مطلوب للحفظ (خارج وضع التجربة) */
function needCode() { return !isDemo() && !LS.get('tf_code', ''); }
