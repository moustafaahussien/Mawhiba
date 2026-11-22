/* =====================================================================
   ربط منصة الموهبة بمنصة دار الذكر التعليمية (قاعدة بيانات المدرسة)
   - من سجّل دخوله في المنصة بحساب المدرسة يدخل هنا تلقائياً (بدون رمز المعلمين)
   - الطلاب والمعلمون يُختارون من بيانات المنصة، ويُحفظ معرّف الطالب في المنصة (lms:...)
   - الأسماء والصفوف تُعرض حيّة من المنصة: أي تعديل هناك يظهر هنا مباشرة
   الصفحات العامة لا تتأثر بهذا الملف.
   ===================================================================== */
(function () {
  'use strict';
  const URL_ = 'https://zpbhzhpvpvehowxvlsgp.supabase.co';
  const KEY = 'sb_publishable_xPzQ55aK-_9OeBjIQwt5yw_DPAw3lC9';
  const SKEY = 'sb-zpbhzhpvpvehowxvlsgp-auth-token';     // جلسة المنصة (نفس النطاق github.io)
  const LMS_HOME = '/althikr-lms/';
  const get = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const norm = s => String(s || '').trim().replace(/\s+/g, ' ').replace(/[أإآ]/g, 'ا').replace(/ة\b/g, 'ه').replace(/ى\b/g, 'ي');

  function stored() {
    try { const s = JSON.parse(localStorage.getItem(SKEY) || 'null'); return s && s.access_token ? s : null; } catch (e) { return null; }
  }
  /* نضع رمز الجلسة مكان رمز المعلمين/المشرف حتى تعمل كل الصفحات كما هي */
  function apply(tok, who) {
    if (!tok || !who || !who.staff) return;
    set('tf_code', 'lms:' + tok);
    set('tf_teacher', who.name);
    if (who.admin) set('tf_admin', 'lms:' + tok);
    else if (String(get('tf_admin', '')).indexOf('lms:') === 0) set('tf_admin', '');
  }
  function clear() {
    if (String(get('tf_code', '')).indexOf('lms:') === 0) set('tf_code', '');
    if (String(get('tf_admin', '')).indexOf('lms:') === 0) set('tf_admin', '');
  }

  const L = window.LMSLINK = {
    who: get('tf_lms_who', null),
    linked() { return !!(this.who && this.who.staff && !this.who.pending && stored()); },
    loginUrl() { return LMS_HOME + 'index.html?next=' + encodeURIComponent(location.pathname + location.search); },
    token() { const s = stored(); return s ? s.access_token : ''; },
    people: null, byId: {}, byName: {},
    norm
  };

  // تزامنياً عند فتح الصفحة: جلسة صالحة ← دخول فوري
  (function () {
    const s = stored();
    if (!s) { clear(); L.who = null; return; }
    if (L.who && L.who.staff && get('tf_lms_srv', false) && (s.expires_at || 0) * 1000 > Date.now() + 30000) apply(s.access_token, L.who);
  })();

  /* supabase-js يتولى تجديد الجلسة (ومشاركتها مع تبويبات المنصة) */
  const sb = window.supabase ? window.supabase.createClient(URL_, KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }) : null;
  async function rpc(name) {
    const { data, error } = await sb.rpc(name);
    if (error) throw error;
    return data;
  }
  async function refresh() {
    if (!sb) return null;
    let session = null;
    try { session = (await sb.auth.getSession()).data.session; } catch (e) { return null; }
    if (!session) { clear(); L.who = null; set('tf_lms_who', null); return null; }
    try { const w = await rpc('talent_whoami'); L.who = w && w.ok ? w : null; set('tf_lms_who', L.who); }
    catch (e) { return null; }
    if (!(L.who && L.who.staff)) { clear(); return L.who; }
    /* نتأكد أن سكربت السجل يقبل حساب المدرسة قبل استبدال رمز المعلمين (حتى لا يتعطل الدخول القديم) */
    let srv = false;
    try { if (typeof jsonp === 'function' && typeof CONFIG !== 'undefined' && CONFIG.API_URL) { const d = await jsonp({ mode: 'check', code: 'lms:' + session.access_token }); srv = !!(d && d.ok); } } catch (e) {}
    set('tf_lms_srv', srv);
    if (srv) apply(session.access_token, L.who); else { clear(); L.who = Object.assign({}, L.who, { pending: true }); }
    return L.who;
  }
  if (sb) sb.auth.onAuthStateChange((ev, session) => { if (session && L.who && !L.who.pending && get('tf_lms_srv', false)) apply(session.access_token, L.who); if (ev === 'SIGNED_OUT') clear(); });
  L.ready = refresh().then(w => { const b = document.getElementById('lmsBar'); if (b) b.outerHTML = L.bar(); return w; });
  setInterval(refresh, 10 * 60 * 1000);

  /* الطلاب والمنسوبون من المنصة (تُحفظ في الجلسة 10 دقائق) */
  L.loadPeople = async function () {
    if (L.people) return L.people;
    await L.ready;
    if (!L.linked()) return null;
    const c = (() => { try { return JSON.parse(sessionStorage.getItem('tf_lms_people') || 'null'); } catch (e) { return null; } })();
    let d = c && c.at > Date.now() - 600000 ? c.d : null;
    if (!d) { try { d = await rpc('talent_people'); sessionStorage.setItem('tf_lms_people', JSON.stringify({ at: Date.now(), d })); } catch (e) { return null; } }
    L.people = d; L.byId = {}; L.byName = {};
    (d.students || []).forEach(s => { L.byId[s.id] = s; const k = norm(s.name); if (!L.byName[k]) L.byName[k] = s; else L.byName[k] = 'dup'; });
    (d.staff || []).forEach(s => { L.byId[s.id] = s; });
    return d;
  };
  /* طالب من المنصة بالاسم (تطابق تام بعد التوحيد، ويُتجاهل الاسم المكرر) */
  L.matchStudent = function (name) { const s = L.byName[norm(name)]; return s && s !== 'dup' ? s : null; };
  L.matchStaff = function (name) { const k = norm(name); return ((L.people && L.people.staff) || []).find(s => norm(s.name) === k) || null; };
  /* استبدال الاسم والصف والفصل بالقيم الحالية في المنصة */
  L.live = function (row, idKey, map) {
    const s = row && L.byId[row[idKey]];
    if (!s) return row;
    Object.keys(map).forEach(k => { if (s[map[k]]) row[k] = s[map[k]]; });
    return row;
  };

  /* شريط صغير: داخل بحساب المدرسة / الدخول بحساب المدرسة */
  L.bar = function () {
    if (L.who && L.who.pending) return '<span id="lmsBar"></span>';   // بانتظار تفعيل سكربت السجل لحساب المدرسة
    if (L.linked()) return '<div id="lmsBar" class="demo" style="background:rgba(14,159,118,.10);border-color:rgba(14,159,118,.35)">✓ دخلت بحساب المدرسة: <b>' + String(L.who.name).replace(/[<>&]/g, '') + '</b>' +
      (L.who.admin ? ' · صلاحية المشرف' : '') + ' — الطلاب والمعلمون يُقرؤون من منصة دار الذكر التعليمية مباشرة.</div>';
    return '<div id="lmsBar" class="demo">ادخل بحساب المدرسة لتعمل بدون رمز ولتختار الطلاب من بيانات المدرسة: <a href="' + L.loginUrl() + '"><b>الدخول بحساب المدرسة</b></a></div>';
  };
})();
