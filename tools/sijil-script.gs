/* =====================================================================
   منصة الموهبة – سكربت «السجل التام لتطور الموهبة» (Google Apps Script)
   جدول منفصل عن جدول بيانات المنصة، لأنه يحتوي بيانات الطلاب.
   يُلصق هذا الملف في: الجدول ← الإضافات (Extensions) ← Apps Script
   ===================================================================== */

/* ⚠️ اكتب الرمزين هنا داخل محرر Apps Script فقط، ولا تكتبهما في نسخة الملف المرفوعة على GitHub
   (المستودع عام ويستطيع أي شخص قراءته). إذا تُركا فارغين يُرفض كل دخول. */

/* حسابات المشرفين: اسم المستخدم ← كلمة المرور. تفتح التقارير وتجلب بيانات الطالب وتسمح بالحذف. لا تعطها للمعلمين.
   اسم المستخدم لا يفرّق بين الحروف الكبيرة والصغيرة (Admin = admin)، وكلمة المرور تفرّق.
   لإضافة مشرف: سطر جديد بالصيغة نفسها. لإيقاف مشرف: احذف سطره أو اترك كلمة مروره فارغة. */
const ADMINS = {
  'Admin': '',
  'Adel': '',
  'Mostafa': ''
};
/* مفتاح المشرف القديم (اختياري): يبقى مقبولاً إن كتبته، ويمكن تركه فارغاً بعد إنشاء الحسابات أعلاه */
const ADMIN_KEY = '';

/* رمز المعلمين: يُعطى للمعلمين، ولا يُقبل حفظ أي نموذج ولا فتح قوائم المشاركين بدونه. غيّره متى شئت (ثم انشر إصداراً جديداً). */
const TEACHER_CODE = '';

/* يعيد اسم المشرف إن كانت بيانات الدخول صحيحة، وإلا نصاً فارغاً. الصيغة المرسلة من الصفحات: «اسم المستخدم:كلمة المرور» */
function adminOk_(k) {
  k = String(k || '');
  if (k.indexOf('lms:') === 0) { const u = lmsUser_(k); return u.admin ? (u.name || 'المشرف') : ''; }
  const i = k.indexOf(':');
  if (i > 0) {
    const u = k.slice(0, i).trim().toLowerCase(), pw = k.slice(i + 1);
    const name = Object.keys(ADMINS).find(n => n.toLowerCase() === u);
    if (name && ADMINS[name] && ADMINS[name] === pw) return name;
  }
  return ADMIN_KEY && k === ADMIN_KEY ? 'المشرف' : '';
}
function codeOk_(c) { c = String(c || '').trim(); if (c.indexOf('lms:') === 0) return !!lmsUser_(c).staff; return c !== '' && (c === TEACHER_CODE || !!adminOk_(c)); }

/* ---------- الدخول بحساب المدرسة (منصة دار الذكر التعليمية) ----------
   الصفحات ترسل «lms:<رمز الجلسة>» بدل رمز المعلمين؛ نتحقق منه عند المنصة مباشرة،
   والمشرف = مدير النظام أو القيادات أو منسق الموهبة في المنصة. النتيجة تُحفظ 10 دقائق. */
const LMS_URL = 'https://zpbhzhpvpvehowxvlsgp.supabase.co';
const LMS_KEY = 'sb_publishable_xPzQ55aK-_9OeBjIQwt5yw_DPAw3lC9';
function lmsUser_(c) {
  const tok = String(c || '').replace(/^lms:/, '').trim();
  if (!tok || tok.length > 4000) return {};
  const ck = 'lms_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, tok)).slice(0, 40);
  const cache = CacheService.getScriptCache(), hit = cache.get(ck);
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }
  let u = {};
  try {
    const r = UrlFetchApp.fetch(LMS_URL + '/rest/v1/rpc/talent_whoami', { method: 'post', contentType: 'application/json', payload: '{}',
      headers: { apikey: LMS_KEY, Authorization: 'Bearer ' + tok }, muteHttpExceptions: true });
    if (r.getResponseCode() === 200) { const d = JSON.parse(r.getContentText()); if (d && d.ok) u = d; }
  } catch (e) {}
  cache.put(ck, JSON.stringify(u), u.ok ? 600 : 60);
  return u;
}

/* سجل عمليات الحذف: من حذف، ومتى، وماذا */
const ADMIN_LOG = 'سجل عمليات المشرفين';
function logAdmin_(who, action, details) {
  try {
    const sh = ensureSheet_(SpreadsheetApp.getActiveSpreadsheet(), ADMIN_LOG, ['الوقت', 'المشرف', 'العملية', 'التفاصيل'], true);
    sh.appendRow([Utilities.formatDate(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd HH:mm'), who, action, String(details).slice(0, 45000)]);
  } catch (e) {}
}

const MASTER = 'السجل';
const STUDENTS = 'الطلاب';
/* قوائم المشاركين في المسابقات (بالأسماء) — تظهر للمعلمين فقط، وللجمهور الأعداد فقط */
const PARTICIPANTS = 'المشاركون في المسابقات';
const PARTICIPANTS_HEADERS = ['المسابقة', 'العام', 'اسم الطالب', 'المدرسة', 'المرحلة الدراسية', 'الصف', 'المرحلة في المسابقة', 'تاريخ التسجيل', 'ملاحظة', 'التخصص / المادة', 'الفصل', 'رقم الطالب في المنصة'];
const COMP_STAGES = ['مسجّل', 'متأهل', 'نهائي', 'فائز'];
/* إدارة برامج النموذج (المكونات 2 – 9): الفريق والمشاركون والجلسات — عمود «البرنامج» يحدد المكوّن */
const PROG = {
  staff:    { sheet: 'البرامج – الفريق', req: 'name',
              headers: ['المعرّف', 'البرنامج', 'العام الدراسي', 'الاسم', 'الدور', 'التخصص', 'المجال', 'الجوال', 'البريد الإلكتروني', 'ملاحظة', 'الصف الدراسي'],
              keys: ['id', 'prog', 'year', 'name', 'role', 'spec', 'field', 'phone', 'email', 'note', 'grade'] },
  people:   { sheet: 'البرامج – المشاركون', req: 'name',
              headers: ['المعرّف', 'البرنامج', 'العام الدراسي', 'الاسم', 'رقم الطالب', 'الصف', 'الفصل', 'المجال', 'المشرف', 'تاريخ الانضمام', 'الحالة', 'تفصيل 1', 'تفصيل 2', 'ملاحظة'],
              keys: ['id', 'prog', 'year', 'name', 'sid', 'grade', 'cls', 'field', 'lead', 'joined', 'status', 'x1', 'x2', 'note'] },
  sessions: { sheet: 'البرامج – الجلسات', req: 'date',
              headers: ['المعرّف', 'البرنامج', 'العام الدراسي', 'التاريخ', 'من الساعة', 'إلى الساعة', 'العنوان', 'المجال / الفرع', 'الفئة المستهدفة', 'وسيلة التقديم', 'المنفّذ', 'المكان', 'المشاركون', 'عدد الحضور', 'الحضور', 'الحالة', 'ملاحظة', 'تنفيذ البرنامج', 'ملاحظات المعلم', 'الصف'],
              keys: ['id', 'prog', 'year', 'date', 'from', 'to', 'title', 'field', 'target', 'means', 'lead', 'place', 'students', 'count', 'attended', 'status', 'note', 'exec', 'execNote', 'grade'] },
  /* توزيع الحصص: موضوع كل أسبوع (يُربط بالحصص تلقائياً حسب التاريخ، والمجال إن حُدّد) */
  plan:     { sheet: 'البرامج – توزيع الحصص', req: 'title',
              headers: ['المعرّف', 'البرنامج', 'العام الدراسي', 'الأسبوع', 'من تاريخ', 'إلى تاريخ', 'عنوان الحصة', 'المجال', 'الأهداف / المحتوى', 'ملاحظة', 'الصف'],
              keys: ['id', 'prog', 'year', 'week', 'start', 'end', 'title', 'field', 'goals', 'note', 'grade'] }
};
const EXEC_OPTS = ['نعم', 'لا'];
/* رقم إصدار السكربت: تقارنه صفحة إدارة البرامج لتنبيهك إن كان المنشور أقدم من الملف */
const SCRIPT_VER = 6;
const PROG_IDS = ['general-enrichment', 'skills', 'clusters', 'specialty', 'projects', 'acceleration', 'mentorship', 'support'];
const PERSON_STATUS = ['نشط', 'متوقف', 'أنهى البرنامج'];
const SESSION_STATUS = ['مجدولة', 'منفذة', 'مؤجلة', 'ملغاة'];
const MASTER_HEADERS = ['المعرّف', 'وقت الحفظ', 'التاريخ', 'العام الدراسي', 'المعلم', 'رمز النموذج', 'النموذج', 'معرف النموذج',
  'رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل', 'النتيجة', 'ملاحظات', 'الإجابات', 'الدرجات'];

/* شغّل هذه الدالة مرة واحدة بعد اللصق (وآمن تشغيلها مرة أخرى) */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(ss, MASTER, MASTER_HEADERS, true);
  ensureSheet_(ss, STUDENTS, ['رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل'], true);
  ensureSheet_(ss, ADMIN_LOG, ['الوقت', 'المشرف', 'العملية', 'التفاصيل'], true);
  const ps = ensureSheet_(ss, PARTICIPANTS, PARTICIPANTS_HEADERS, true);
  ensureHeaders_(ps, PARTICIPANTS_HEADERS);
  ps.getRange('A2:A3000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(['kangaroo', 'bebras', 'nsmo', 'ibdaa', 'isef'], true).setAllowInvalid(true).build());
  ps.getRange('G2:G3000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(COMP_STAGES, true).setAllowInvalid(true).build());
  Object.keys(PROG).forEach(t => {
    const sh = ensureSheet_(ss, PROG[t].sheet, PROG[t].headers, true);
    ensureHeaders_(sh, PROG[t].headers);
    sh.getRange('B2:B5000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(PROG_IDS, true).setAllowInvalid(true).build());
  });
  ss.getSheetByName(PROG.people.sheet).getRange('K2:K5000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(PERSON_STATUS, true).setAllowInvalid(true).build());
  ss.getSheetByName(PROG.sessions.sheet).getRange('P2:P8000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(SESSION_STATUS, true).setAllowInvalid(true).build());
  ss.getSheetByName(PROG.sessions.sheet).getRange('R2:R8000').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(EXEC_OPTS, true).setAllowInvalid(true).build());
  SpreadsheetApp.flush();
}

/* يضيف عناوين الأعمدة الجديدة في آخر ورقة موجودة من قبل (دون المساس بالبيانات) */
function ensureHeaders_(sh, headers) {
  const n = sh.getLastColumn();
  const cur = n ? sh.getRange(1, 1, 1, n).getValues()[0].map(String) : [];
  if (cur.length < headers.length) sh.getRange(1, cur.length + 1, 1, headers.length - cur.length)
    .setValues([headers.slice(cur.length)]).setFontWeight('bold').setBackground('#EDE8FF');
}

function ensureSheet_(ss, name, headers, asText) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#EDE8FF');
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
    if (asText) sh.getRange(1, 1, sh.getMaxRows(), Math.max(headers.length, sh.getMaxColumns())).setNumberFormat('@');
  }
  return sh;
}

/* ---------------- نقاط الدخول ---------------- */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === 'submit') return out_(saveRecord_(body.record));
    if (body.action === 'importParticipants') return out_(importParticipants_(body));
    if (body.action === 'saveParticipants') return out_(saveParticipants_(body));
    if (body.action === 'deleteParticipants') return out_(deleteParticipants_(body));
    if (body.action === 'progSave') return out_(progSave_(body));
    if (body.action === 'progDelete') return out_(progDelete_(body));
    if (body.action === 'giftedImport') return out_(giftedImport_(body));
    return out_({ ok: false, error: 'طلب غير معروف' });
  } catch (err) { return out_({ ok: false, error: String(err.message || err) }); }
}

function doGet(e) {
  const p = e.parameter || {}, cb = p.callback;
  let res;
  try {
    if (p.mode === 'submit') res = saveRecord_(JSON.parse(p.data));
    else if (p.mode === 'check') res = codeOk_(p.code) ? { ok: true, admin: !!adminOk_(p.code), who: adminOk_(p.code) } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'students') res = codeOk_(p.code) ? { ok: true, students: readStudents_() } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'participants') res = codeOk_(p.code) ? { ok: true, rows: readParticipants_() } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'programs') res = codeOk_(p.code) ? { ok: true, staff: progRead_('staff'), people: progRead_('people'), sessions: progRead_('sessions'), plan: progRead_('plan'), ver: SCRIPT_VER } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'gifted') res = adminOk_(p.key) ? giftedState_() : { ok: false, auth: true, error: 'اسم المستخدم أو كلمة مرور المشرف غير صحيحة' };
    else if (p.mode === 'public') res = publicStats_();
    else if (p.mode === 'report') {
      if (!adminOk_(p.key)) res = { ok: false, error: 'اسم المستخدم أو كلمة مرور المشرف غير صحيحة' };
      else res = { ok: true, records: readRecords_(), who: adminOk_(p.key) };
    }
    else if (p.mode === 'student') {
      // كل سجلات طالب واحد — لتعبئة «الوضع الراهن» تلقائياً وفتح خطة التطوير
      if (!adminOk_(p.key)) res = { ok: false, error: 'اسم المستخدم أو كلمة مرور المشرف غير صحيحة' };
      else {
        const k = String(p.s || '').trim();
        res = { ok: true, records: readRecords_().filter(r => r.studentId === k || r.studentName.trim() === k) };
      }
    }
    else res = { ok: true, msg: 'نماذج السجل التام تعمل' };
  } catch (err) { res = { ok: false, error: String(err.message || err) }; }
  return out_(res, cb);
}

function out_(obj, cb) {
  const s = JSON.stringify(obj);
  if (cb && /^[\w$.]+$/.test(cb)) return ContentService.createTextOutput(cb + '(' + s + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------- الحفظ ---------------- */
function saveRecord_(r) {
  if (!r || !codeOk_(r.code)) return { ok: false, auth: true, error: 'رمز المعلمين غير صحيح — اطلبه من منسق الموهبة' };
  if (!r.key || !r.teacher || !r.studentName || !r.formId) throw new Error('بيانات ناقصة');
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const m = ensureSheet_(ss, MASTER, MASTER_HEADERS, true);
    const row = [r.key, r.ts, r.date, r.year, r.teacher, r.formCode, r.formTitle, r.formId, r.studentId || '', r.studentName,
      r.grade, r.classroom || '', r.summary, r.notes || '', JSON.stringify(r.answers || {}), JSON.stringify(r.parts || [])];
    const updated = upsert_(m, r.key, row);

    // ورقة خاصة بكل نموذج (بند أو حقل في كل عمود) لسهولة التحليل داخل الجدول
    if (r.flat) { // نماذج السجل (حقول نصية وجداول)
      const fk = Object.keys(r.flat);
      const fh = ['المعرّف', 'التاريخ', 'العام الدراسي', 'مسجل المعلومات', 'رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل'].concat(fk).concat(['الملخص']);
      const fsh = ensureSheet_(ss, sheetName_(r.formTitle), fh);
      upsert_(fsh, r.key, [r.key, r.date, r.year, r.teacher, r.studentId || '', r.studentName, r.grade, r.classroom || '']
        .concat(fk.map(k => r.flat[k])).concat([r.summary]));
      return { ok: true, updated: updated };
    }
    const nums = Object.keys(r.answers || {}).map(Number).sort((a, b) => a - b);
    const parts = r.parts || [];
    const headers = ['المعرّف', 'التاريخ', 'العام الدراسي', 'المعلم', 'رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل']
      .concat(nums.map(n => 'ب' + n))
      .concat(parts.map(p => p.product ? p.title + ' (' + p.product + ')' : p.title))
      .concat(parts.map(p => 'مستوى: ' + p.title))
      .concat(['النتيجة', 'ملاحظات']);
    const fs = ensureSheet_(ss, sheetName_(r.formTitle), headers);
    const frow = [r.key, r.date, r.year, r.teacher, r.studentId || '', r.studentName, r.grade, r.classroom || '']
      .concat(nums.map(n => r.answers[n]))
      .concat(parts.map(p => Math.round(p.score * 100) / 100))
      .concat(parts.map(p => p.label))
      .concat([r.summary, r.notes || '']);
    upsert_(fs, r.key, frow);
    return { ok: true, updated: updated };
  } finally { lock.releaseLock(); }
}

function upsert_(sh, key, row) {
  const last = sh.getLastRow();
  if (last > 1) {
    const keys = sh.getRange(2, 1, last - 1, 1).getValues().map(x => String(x[0]));
    const i = keys.indexOf(String(key));
    if (i >= 0) { sh.getRange(i + 2, 1, 1, row.length).setValues([row]); return true; }
  }
  sh.appendRow(row); return false;
}

function sheetName_(t) { return String(t).replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90); }

/* ---------------- القراءة ---------------- */
function readRecords_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MASTER);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, MASTER_HEADERS.length).getDisplayValues().filter(v => v[0]).map(v => ({
    key: v[0], ts: v[1], date: v[2], year: v[3], teacher: v[4], formCode: v[5], formTitle: v[6], formId: v[7],
    studentId: v[8], studentName: v[9], grade: v[10], classroom: v[11], summary: v[12], notes: v[13], answers: v[14], parts: v[15]
  }));
}

function readStudents_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(STUDENTS);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues().filter(v => v[1])
    .map(v => ({ id: v[0], name: v[1].trim(), grade: v[2], cls: v[3] }));
}

/* قوائم المشاركين: [المسابقة, العام, الاسم, المدرسة, المرحلة الدراسية, الصف, المرحلة في المسابقة, تاريخ التسجيل, ملاحظة] */
function readParticipants_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PARTICIPANTS);
  if (!sh || sh.getLastRow() < 2) return [];
  const w = Math.max(PARTICIPANTS_HEADERS.length, Math.min(sh.getLastColumn(), PARTICIPANTS_HEADERS.length));
  return sh.getRange(2, 1, sh.getLastRow() - 1, w).getDisplayValues()
    .filter(v => String(v[0]).trim() && String(v[2]).trim())
    .map(v => ({ comp: String(v[0]).trim().toLowerCase(), year: String(v[1]).trim(), name: String(v[2]).trim(), school: String(v[3]).trim(),
                 level: String(v[4]).trim(), grade: String(v[5]).trim(), stage: String(v[6]).trim() || 'مسجّل', date: v[7], note: v[8],
                 subject: String(v[9] || '').trim(), cls: String(v[10] || '').trim(), sid: String(v[11] || '').trim() }));
}

/* استيراد ملفات التسجيل المصدَّرة من موقع المسابقة (من صفحة «المشاركون في المسابقات»).
   يضيف الأسماء الجديدة فقط، ويحتفظ بمرحلة كل طالب موجود وملاحظته كما هي. يحتاج رمز المعلمين أو مفتاح المشرف. */
function importParticipants_(b) {
  if (!codeOk_(b.code)) return { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
  const comp = String(b.comp || '').trim().toLowerCase(), year = String(b.year || '').trim();
  if (!comp || !year || !Array.isArray(b.rows)) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ensureSheet_(ss, PARTICIPANTS, PARTICIPANTS_HEADERS, true);
    ensureHeaders_(sh, PARTICIPANTS_HEADERS);
    const norm = x => String(x || '').trim().replace(/\s+/g, ' ');
    const have = {};
    readParticipants_().forEach(r => { if (r.comp === comp && r.year === year) { have[norm(r.name)] = 1; if (r.sid) have[r.sid] = 1; } });
    const add = [];
    b.rows.forEach(r => {
      const n = norm(r.name), sid = norm(r.sid); if (!n || have[n] || (sid && have[sid])) return; have[n] = 1; if (sid) have[sid] = 1;
      add.push([comp, year, n, norm(r.school), norm(r.level), norm(r.grade), 'مسجّل', norm(r.date), norm(r.note), norm(r.subject), norm(r.cls), sid]);
    });
    if (add.length) sh.getRange(sh.getLastRow() + 1, 1, add.length, PARTICIPANTS_HEADERS.length).setNumberFormat('@').setValues(add);
    return { ok: true, added: add.length, kept: b.rows.length - add.length, total: Object.keys(have).length };
  } finally { lock.releaseLock(); }
}

/* إضافة طالب أو أكثر يدوياً أو تعديله (من صفحة «المشاركون في المسابقات»). يحتاج رمز المعلمين.
   كل سطر: { comp, year, name, school, level, grade, cls, subject, stage, date, note, orig: {comp, year, name} للتعديل } */
function saveParticipants_(b) {
  if (!codeOk_(b.code)) return { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
  if (!Array.isArray(b.rows) || !b.rows.length) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ensureSheet_(ss, PARTICIPANTS, PARTICIPANTS_HEADERS, true);
    ensureHeaders_(sh, PARTICIPANTS_HEADERS);
    const norm = x => String(x || '').trim().replace(/\s+/g, ' ');
    const key = (c, y, n) => [String(c || '').trim().toLowerCase(), norm(y), norm(n)].join('|');
    const W = PARTICIPANTS_HEADERS.length;
    let added = 0, updated = 0, dup = 0;
    b.rows.forEach(r => {
      const comp = String(r.comp || '').trim().toLowerCase(), year = norm(r.year), name = norm(r.name);
      if (!comp || !year || !name) return;
      const last = sh.getLastRow();
      const vals = last > 1 ? sh.getRange(2, 1, last - 1, W).getDisplayValues() : [];
      const keys = vals.map(v => key(v[0], v[1], v[2])), skeys = vals.map(v => v[11] ? key(v[0], v[1], v[11]) : '');
      const sid = norm(r.sid);
      const row = [comp, year, name, norm(r.school), norm(r.level), norm(r.grade), norm(r.stage) || 'مسجّل', norm(r.date), norm(r.note), norm(r.subject), norm(r.cls), sid];
      let at = r.orig ? keys.indexOf(key(r.orig.comp, r.orig.year, r.orig.name)) : -1;
      if (at < 0 && r.orig && r.orig.sid) at = skeys.indexOf(key(r.orig.comp, r.orig.year, r.orig.sid));
      let clash = keys.indexOf(key(comp, year, name));
      if (clash < 0 && sid) clash = skeys.indexOf(key(comp, year, sid));
      if (at >= 0) {
        if (clash >= 0 && clash !== at) { dup++; return; }
        sh.getRange(at + 2, 1, 1, W).setNumberFormat('@').setValues([row]); updated++;
      } else if (clash >= 0) { dup++; }
      else { sh.getRange(last + 1, 1, 1, W).setNumberFormat('@').setValues([row]); added++; }
    });
    return { ok: true, added: added, updated: updated, dup: dup };
  } finally { lock.releaseLock(); }
}

/* حذف طلاب من القوائم — بمفتاح المشرف فقط. items: [{comp, year, name}] */
function deleteParticipants_(b) {
  const who = adminOk_(b.key);
  if (!who) return { ok: false, auth: true, error: 'الحذف يحتاج اسم مستخدم وكلمة مرور المشرف' };
  if (!Array.isArray(b.items) || !b.items.length) return { ok: false, error: 'بيانات ناقصة' };
  logAdmin_(who, 'حذف من المشاركين في المسابقات (' + b.items.length + ')', b.items.map(i => i.comp + ' · ' + i.year + ' · ' + i.name).join('\n'));
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PARTICIPANTS);
    if (!sh || sh.getLastRow() < 2) return { ok: true, deleted: 0 };
    const norm = x => String(x || '').trim().replace(/\s+/g, ' ');
    const key = (c, y, n) => [String(c || '').trim().toLowerCase(), norm(y), norm(n)].join('|');
    const want = b.items.map(i => key(i.comp, i.year, i.name)), wantS = b.items.filter(i => i.sid).map(i => key(i.comp, i.year, i.sid));
    const vals = sh.getRange(2, 1, sh.getLastRow() - 1, 12).getDisplayValues();
    let n = 0;
    for (let i = vals.length - 1; i >= 0; i--) {
      const v = vals[i];
      if (want.indexOf(key(v[0], v[1], v[2])) >= 0 || (v[11] && wantS.indexOf(key(v[0], v[1], v[11])) >= 0)) { sh.deleteRow(i + 2); n++; }
    }
    return { ok: true, deleted: n };
  } finally { lock.releaseLock(); }
}

/* أعداد المشاركين لكل مسابقة وعام ومرحلة — أعداد فقط بدون أي اسم.
   المرحلة تراكمية: الفائز يُحسب أيضاً في النهائيين والمتأهلين والمسجلين. */
function participantCounts_() {
  const out = {};
  readParticipants_().forEach(function (r) {
    const lvl = Math.max(0, COMP_STAGES.indexOf(r.stage));
    const y = r.year || 'غير محدد';
    out[r.comp] = out[r.comp] || {};
    out[r.comp][y] = out[r.comp][y] || [0, 0, 0, 0];
    for (let i = 0; i <= lvl; i++) out[r.comp][y][i]++;
  });
  return out;
}

/* ---------------- أرقام عامة للصفحة الرئيسية للمنصة (بدون أي اسم أو نتيجة فردية) ---------------- */
function publicStats_() {
  const R = readRecords_();
  const sk = r => r.studentId || r.studentName.trim();
  const uniq = a => Object.keys(a.reduce((o, x) => (o[x] = 1, o), {})).length;
  const plans = R.filter(r => r.formId === 'plan');
  const latestInd = {};
  R.filter(r => r.formId === 'indicators').forEach(r => { const k = sk(r); if (!latestInd[k] || latestInd[k].ts < r.ts) latestInd[k] = r; });
  const pcts = Object.keys(latestInd).map(k => { try { return JSON.parse(latestInd[k].parts)[0].score; } catch (e) { return null; } }).filter(v => v != null);
  return {
    ok: true,
    students: uniq(R.map(sk)),                 // طلاب لهم سجل في النموذج
    pool: uniq(plans.map(sk)),                 // طلاب لهم خطة تطوير (الوعاء الإثرائي)
    forms: R.length,                           // نماذج معبّأة
    competitions: participantCounts_(),        // أعداد المشاركين في المسابقات (بدون أسماء)
    programs: progPublic_(),                   // برامج النموذج: أعداد وجدول الجلسات لكل برنامج (بدون أسماء المشاركين)
    achievement: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null
  };
}

/* =====================================================================
   إدارة برامج النموذج — قراءة وحفظ وحذف
   القراءة والحفظ برمز المعلمين، والحذف بمفتاح المشرف فقط.
   ===================================================================== */
function progRead_(t) {
  const def = PROG[t], sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(def.sheet);
  if (!sh || sh.getLastRow() < 2) return [];
  const ri = def.keys.indexOf(def.req);
  return sh.getRange(2, 1, sh.getLastRow() - 1, def.headers.length).getDisplayValues()
    .filter(v => String(v[1]).trim() && String(v[ri]).trim())
    .map((v, i) => {
      const o = {}; def.keys.forEach((k, j) => o[k] = String(v[j] == null ? '' : v[j]).trim());
      if (!o.id) o.id = 'r' + (i + 2);   // سطر أُضيف يدوياً في الجدول بدون معرّف
      o.prog = o.prog.toLowerCase();
      return o;
    });
}

/* body: { code, table, rows: [{id?, prog, ...}] } — سطر بمعرّف موجود يُحدَّث، وبدون معرّف يُضاف */
function progSave_(b) {
  if (!codeOk_(b.code)) return { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
  const def = PROG[b.table];
  if (!def || !Array.isArray(b.rows) || !b.rows.length) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = ensureSheet_(SpreadsheetApp.getActiveSpreadsheet(), def.sheet, def.headers, true);
    ensureHeaders_(sh, def.headers);   // يضيف عناوين الأعمدة الجديدة لورقة قديمة
    const ids = [], add = [];
    const allIds = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(x => String(x[0])) : [];
    b.rows.forEach(r => {
      let id = String(r.id || '').trim();
      const row = def.keys.map(k => k === 'id' ? '' : String(r[k] == null ? '' : r[k]).trim());
      if (!row[def.keys.indexOf(def.req)] || !row[1]) return;
      let at = -1;
      if (id) {
        if (/^r\d+$/.test(id)) at = +id.slice(1) - 2;   // سطر يدوي بلا معرّف: موضعه في الجدول
        else at = allIds.indexOf(id);
      }
      if (!id || /^r\d+$/.test(id)) id = Utilities.getUuid().slice(0, 8);
      row[0] = id;
      if (at >= 0) sh.getRange(at + 2, 1, 1, row.length).setNumberFormat('@').setValues([row]);
      else add.push(row);   // الأسطر الجديدة تُضاف دفعة واحدة (أسرع عند استيراد عشرات الحصص)
      ids.push(id);
    });
    if (add.length) sh.getRange(sh.getLastRow() + 1, 1, add.length, add[0].length).setNumberFormat('@').setValues(add);
    return { ok: true, ids: ids };
  } finally { lock.releaseLock(); }
}

/* body: { key, table, ids: [] } */
function progDelete_(b) {
  const who = adminOk_(b.key);
  if (!who) return { ok: false, auth: true, error: 'الحذف يحتاج اسم مستخدم وكلمة مرور المشرف' };
  const def = PROG[b.table];
  if (!def || !Array.isArray(b.ids)) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(def.sheet);
    if (!sh || sh.getLastRow() < 2) return { ok: true, deleted: 0 };
    const keys = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(x => String(x[0]));
    let n = 0;
    const gone = [], kI = def.keys.indexOf(def.req === 'name' ? 'name' : 'title');
    for (let i = keys.length - 1; i >= 0; i--) if (b.ids.indexOf(keys[i]) >= 0 || b.ids.indexOf('r' + (i + 2)) >= 0) {
      const v = sh.getRange(i + 2, 1, 1, def.keys.length).getDisplayValues()[0];
      gone.push([v[1], v[2], v[kI] || v[def.keys.indexOf('date')]].join(' · '));
      sh.deleteRow(i + 2); n++;
    }
    if (n) logAdmin_(who, 'حذف من «' + def.sheet + '» (' + n + ')', gone.join('\n'));
    return { ok: true, deleted: n };
  } finally { lock.releaseLock(); }
}

/* للصفحات العامة: أعداد كل برنامج لكل عام، وجدول الجلسات بدون أسماء المشاركين */
function progPublic_() {
  const out = {};
  const split = s => String(s || '').split(/[،,\n]+/).map(x => x.trim()).filter(Boolean);
  const P = id => out[id] = out[id] || { years: {}, sessions: [] };
  const Y = (id, y) => { const p = P(id), k = y || 'غير محدد'; return p.years[k] = p.years[k] || { people: 0, active: 0, staff: 0, sessions: 0, done: 0, att: 0, seats: 0, count: 0 }; };
  progRead_('people').forEach(r => { const o = Y(r.prog, r.year); o.people++; if (r.status !== 'متوقف') o.active++; });
  progRead_('staff').forEach(r => Y(r.prog, r.year).staff++);
  /* موضوع الأسبوع من «توزيع الحصص» للحصص التي لم يُكتب لها عنوان */
  const plans = progRead_('plan');
  const planTitle = r => {
    const hit = plans.filter(p => p.prog === r.prog && p.year === r.year && p.start && r.date >= p.start && r.date <= (p.end || p.start) && (!p.field || p.field === r.field)
        && (!p.grade || (r.grade && gradeNum_(p.grade) === gradeNum_(r.grade))))
      .sort((a, b) => (b.grade ? 2 : 0) + (b.field ? 1 : 0) - (a.grade ? 2 : 0) - (a.field ? 1 : 0))[0];
    return hit ? hit.title : '';
  };
  progRead_('sessions').forEach(r => {
    if (r.status === 'ملغاة') return;
    const o = Y(r.prog, r.year);
    o.sessions++;
    if (r.status === 'منفذة') {
      if (r.exec !== 'لا') o.done++;   // حصة سُجّلت ولم يُنفَّذ فيها البرنامج لا تُحسب منفذة
      else o.notExec = (o.notExec || 0) + 1;
      const a = split(r.attended).length, n = split(r.students).length;
      o.att += a; o.seats += n; o.count += a || (parseInt(r.count, 10) || 0);
    }
    P(r.prog).sessions.push({ year: r.year, date: r.date, from: r.from, to: r.to, title: r.title || planTitle(r), field: r.field, target: r.target, means: r.means,
      lead: r.lead, place: r.place, status: r.status, n: split(r.students).length });
  });
  return out;
}

/* رقم الصف (1 – 12) من اسمه: «الصف 4» = «الرابع الابتدائي» = «الرابع الابتدائي بنات» = «Grade 4»، و«الأول المتوسط» = 7 */
function gradeNum_(g) {
  g = String(g || '').trim();
  let m = g.match(/(\d+)/); if (m) return +m[1];
  const ORD = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'], k = ORD.findIndex(o => g.indexOf(o) >= 0);
  if (k < 0) return 0;
  return k + 1 + (/ثانوي/.test(g) ? 9 : /متوسط/.test(g) ? 6 : 0);
}

/* =====================================================================
   استيراد الموهوبين من «نظام الكشف عن الموهوبين» (اختبار المصفوفات + التفكير الإبداعي)
   الصفحة (sijil-gifted.html) تجلب المرشحين من نظام الكشف بمفتاح الربط، ثم ترسل هنا ما اعتمده المشرف:
   - يُضاف الطالب إلى ورقة «الطلاب» إن لم يكن موجوداً.
   - تُحفظ نتائجه في «السجل» كنموذج «نتائج مقاييس الكشف عن الموهبة» (سجل واحد لكل طالب في كل عام، يُحدَّث عند إعادة الاستيراد)
     وفي ورقة «نتائج الكشف عن الموهبة» للتحليل داخل الجدول.
   - يُسجَّل في البرامج المعتمدة («البرامج – المشاركون») دون تكرار.
   ===================================================================== */
const GIFTED_FORM = { id: 'gifted', code: 'كشف', title: 'نتائج مقاييس الكشف عن الموهبة', by: 'نظام الكشف عن الموهوبين (آلي)' };
const GIFTED_SHEET = 'نتائج الكشف عن الموهبة';
const GIFTED_HEADERS = ['المعرّف', 'تاريخ الاستيراد', 'العام الدراسي', 'رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل', 'المرحلة', 'التصنيف',
  'المصفوفات: المئيني', 'المصفوفات: المستوى', 'الإبداع اللفظي: المئيني', 'الإبداع اللفظي: المستوى', 'الإبداع الشكلي: المئيني', 'الإبداع الشكلي: المستوى',
  'نقاط القوة الإبداعية', 'البرامج المعتمدة', 'المسابقات المقترحة', 'ملاحظات', 'اعتمده'];

function giftedState_() {
  const recs = readRecords_().filter(r => r.formId === GIFTED_FORM.id)
    .map(r => ({ key: r.key, year: r.year, studentId: r.studentId, name: r.studentName, ts: r.ts }));
  const people = progRead_('people').map(r => ({ prog: r.prog, year: r.year, sid: r.sid, name: r.name, status: r.status }));
  return { ok: true, records: recs, people: people, students: readStudents_(), ver: SCRIPT_VER };
}

/* body: { key, year, items: [{ student: {id, name, grade, cls}, data: {...ملخص النتائج}, cat, summary, notes, programs: [{prog, why}], competitions: [] }] } */
function giftedImport_(b) {
  const who = adminOk_(b.key);
  if (!who) return { ok: false, auth: true, error: 'الاعتماد يحتاج اسم مستخدم وكلمة مرور المشرف' };
  const year = String(b.year || '').trim();
  if (!year || !Array.isArray(b.items) || !b.items.length) return { ok: false, error: 'بيانات ناقصة' };
  const norm = x => String(x == null ? '' : x).trim().replace(/\s+/g, ' ');
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tz = 'Asia/Riyadh', nowD = new Date();
    const ts = nowD.toISOString(), dateStr = Utilities.formatDate(nowD, tz, 'yyyy-MM-dd'), stamp = Utilities.formatDate(nowD, tz, 'yyyy-MM-dd HH:mm');
    // 1) الطلاب
    const stSh = ensureSheet_(ss, STUDENTS, ['رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل'], true);
    const haveSt = {}; readStudents_().forEach(s => { if (s.id) haveSt[String(s.id).trim()] = 1; haveSt['n:' + norm(s.name)] = 1; });
    const newSt = [];
    // 2) السجل + ورقة النتائج
    const m = ensureSheet_(ss, MASTER, MASTER_HEADERS, true);
    const gs = ensureSheet_(ss, GIFTED_SHEET, GIFTED_HEADERS, true); ensureHeaders_(gs, GIFTED_HEADERS);
    // 3) البرامج
    const pdef = PROG.people;
    const ps = ensureSheet_(ss, pdef.sheet, pdef.headers, true); ensureHeaders_(ps, pdef.headers);
    const enrolled = {};
    progRead_('people').forEach(r => { enrolled[[r.prog, r.year, r.sid || ('n:' + norm(r.name))].join('|')] = 1; if (r.sid) enrolled[[r.prog, r.year, 'n:' + norm(r.name)].join('|')] = 1; });
    const newPeople = [];
    let recs = 0, updated = 0, progAdded = 0, progSkipped = 0;
    // البرامج المعتمدة سابقاً لكل سجل (حتى لا تضيع عند إعادة الاعتماد)
    const prevProgs = {};
    readRecords_().forEach(r => { if (r.formId === GIFTED_FORM.id) { try { prevProgs[r.key] = JSON.parse(r.answers || '{}').programs || []; } catch (e) {} } });
    const lvl = x => x ? (x.level || '') : '';
    const pct = x => x && x.pct != null ? x.pct : '';
    b.items.forEach(it => {
      const st = it.student || {}, sid = norm(st.id), name = norm(st.name);
      if (!name) return;
      if ((sid && !haveSt[sid]) || (!sid && !haveSt['n:' + name])) { newSt.push([sid, name, norm(st.grade), norm(st.cls)]); if (sid) haveSt[sid] = 1; haveSt['n:' + name] = 1; }
      const progs = (it.programs || []).filter(p => PROG_IDS.indexOf(String(p.prog)) >= 0);
      const key = 'gifted|' + (sid || name) + '|' + year;
      const allProgs = (prevProgs[key] || []).filter(p => !progs.some(q => q.prog === p.prog)).concat(progs);
      const d = it.data || {};
      const row = [key, ts, dateStr, year, GIFTED_FORM.by, GIFTED_FORM.code, GIFTED_FORM.title, GIFTED_FORM.id, sid, name, norm(st.grade), norm(st.cls),
        norm(it.summary), String(it.notes || ''), JSON.stringify(Object.assign({}, d, { programs: allProgs, competitions: it.competitions || [], approvedBy: who, approvedAt: stamp })), '[]'];
      if (upsert_(m, key, row)) updated++; else recs++;
      const strengths = [].concat((d.verbal && d.verbal.strengths) || [], (d.figural && d.figural.strengths) || []);
      upsert_(gs, key, [key, stamp, year, sid, name, norm(st.grade), norm(st.cls), norm(d.stageName), norm(d.catName),
        pct(d.rv), lvl(d.rv), pct(d.verbal), lvl(d.verbal), pct(d.figural), lvl(d.figural),
        strengths.join('، '), allProgs.map(p => p.name || p.prog).join('، '), (it.competitions || []).map(c => c.name || c.id).join('، '), String(it.notes || '').replace(/\n/g, ' · '), who]);
      progs.forEach(p => {
        const k1 = [p.prog, year, sid || ('n:' + name)].join('|'), k2 = [p.prog, year, 'n:' + name].join('|');
        if (enrolled[k1] || enrolled[k2]) { progSkipped++; return; }
        enrolled[k1] = enrolled[k2] = 1;
        const o = { id: Utilities.getUuid().slice(0, 8), prog: p.prog, year: year, name: name, sid: sid, grade: norm(st.grade), cls: norm(st.cls), field: norm(p.field),
          lead: '', joined: dateStr, status: 'نشط', x1: '', x2: '', note: ('من نظام الكشف (' + norm(d.catName) + '): ' + norm(p.why)).slice(0, 400) };
        newPeople.push(pdef.keys.map(k => String(o[k] == null ? '' : o[k])));
        progAdded++;
      });
    });
    if (newSt.length) stSh.getRange(stSh.getLastRow() + 1, 1, newSt.length, 4).setNumberFormat('@').setValues(newSt);
    if (newPeople.length) ps.getRange(ps.getLastRow() + 1, 1, newPeople.length, newPeople[0].length).setNumberFormat('@').setValues(newPeople);
    logAdmin_(who, 'استيراد من نظام الكشف (' + b.items.length + ' طالباً)', b.items.map(i => (i.student || {}).name + ' — ' + (i.programs || []).map(p => p.prog).join('/')).join('\n'));
    return { ok: true, records: recs, updated: updated, students: newSt.length, programs: progAdded, skipped: progSkipped };
  } finally { lock.releaseLock(); }
}

/* شغّلها مرة واحدة من المحرر (اختر authorizeLms ثم «تشغيل» ثم وافق) لتسمح للسكربت بالتحقق من حساب المدرسة في المنصة */
function authorizeLms() {
  const r = UrlFetchApp.fetch(LMS_URL + '/rest/v1/', { headers: { apikey: LMS_KEY }, muteHttpExceptions: true });
  Logger.log('الاتصال بالمنصة: ' + r.getResponseCode() + ' — تم ✓');
}
