/* =====================================================================
   منصة الموهبة – سكربت «السجل التام لتطور الموهبة» (Google Apps Script)
   جدول منفصل عن جدول بيانات المنصة، لأنه يحتوي بيانات الطلاب.
   يُلصق هذا الملف في: الجدول ← الإضافات (Extensions) ← Apps Script
   ===================================================================== */

/* ⚠️ اكتب الرمزين هنا داخل محرر Apps Script فقط، ولا تكتبهما في نسخة الملف المرفوعة على GitHub
   (المستودع عام ويستطيع أي شخص قراءته). إذا تُركا فارغين يُرفض كل دخول. */

/* مفتاح المشرف: كلمة سر خاصة بك — تفتح التقارير وتجلب بيانات الطالب. لا تعطها للمعلمين. */
const ADMIN_KEY = '';

/* رمز المعلمين: يُعطى للمعلمين، ولا يُقبل حفظ أي نموذج ولا فتح قوائم المشاركين بدونه. غيّره متى شئت (ثم انشر إصداراً جديداً). */
const TEACHER_CODE = '';

function codeOk_(c) { c = String(c || '').trim(); return c !== '' && (c === TEACHER_CODE || c === ADMIN_KEY); }

const MASTER = 'السجل';
const STUDENTS = 'الطلاب';
/* قوائم المشاركين في المسابقات (بالأسماء) — تظهر للمعلمين فقط، وللجمهور الأعداد فقط */
const PARTICIPANTS = 'المشاركون في المسابقات';
const PARTICIPANTS_HEADERS = ['المسابقة', 'العام', 'اسم الطالب', 'المدرسة', 'المرحلة الدراسية', 'الصف', 'المرحلة في المسابقة', 'تاريخ التسجيل', 'ملاحظة', 'التخصص / المادة', 'الفصل'];
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
const SCRIPT_VER = 3;
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
    return out_({ ok: false, error: 'طلب غير معروف' });
  } catch (err) { return out_({ ok: false, error: String(err.message || err) }); }
}

function doGet(e) {
  const p = e.parameter || {}, cb = p.callback;
  let res;
  try {
    if (p.mode === 'submit') res = saveRecord_(JSON.parse(p.data));
    else if (p.mode === 'check') res = codeOk_(p.code) ? { ok: true, admin: p.code === ADMIN_KEY } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'students') res = codeOk_(p.code) ? { ok: true, students: readStudents_() } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'participants') res = codeOk_(p.code) ? { ok: true, rows: readParticipants_() } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'programs') res = codeOk_(p.code) ? { ok: true, staff: progRead_('staff'), people: progRead_('people'), sessions: progRead_('sessions'), plan: progRead_('plan'), ver: SCRIPT_VER } : { ok: false, auth: true, error: 'رمز المعلمين غير صحيح' };
    else if (p.mode === 'public') res = publicStats_();
    else if (p.mode === 'report') {
      if (p.key !== ADMIN_KEY) res = { ok: false, error: 'مفتاح المشرف غير صحيح' };
      else res = { ok: true, records: readRecords_() };
    }
    else if (p.mode === 'student') {
      // كل سجلات طالب واحد — لتعبئة «الوضع الراهن» تلقائياً وفتح خطة التطوير
      if (p.key !== ADMIN_KEY) res = { ok: false, error: 'مفتاح المشرف غير صحيح' };
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
                 subject: String(v[9] || '').trim(), cls: String(v[10] || '').trim() }));
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
    readParticipants_().forEach(r => { if (r.comp === comp && r.year === year) have[norm(r.name)] = 1; });
    const add = [];
    b.rows.forEach(r => {
      const n = norm(r.name); if (!n || have[n]) return; have[n] = 1;
      add.push([comp, year, n, norm(r.school), norm(r.level), norm(r.grade), 'مسجّل', norm(r.date), norm(r.note), norm(r.subject), norm(r.cls)]);
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
      const keys = last > 1 ? sh.getRange(2, 1, last - 1, 3).getDisplayValues().map(v => key(v[0], v[1], v[2])) : [];
      const row = [comp, year, name, norm(r.school), norm(r.level), norm(r.grade), norm(r.stage) || 'مسجّل', norm(r.date), norm(r.note), norm(r.subject), norm(r.cls)];
      const at = r.orig ? keys.indexOf(key(r.orig.comp, r.orig.year, r.orig.name)) : -1;
      const clash = keys.indexOf(key(comp, year, name));
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
  if (!ADMIN_KEY || String(b.key || '') !== ADMIN_KEY) return { ok: false, auth: true, error: 'الحذف يحتاج مفتاح المشرف' };
  if (!Array.isArray(b.items) || !b.items.length) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PARTICIPANTS);
    if (!sh || sh.getLastRow() < 2) return { ok: true, deleted: 0 };
    const norm = x => String(x || '').trim().replace(/\s+/g, ' ');
    const key = (c, y, n) => [String(c || '').trim().toLowerCase(), norm(y), norm(n)].join('|');
    const want = b.items.map(i => key(i.comp, i.year, i.name));
    const keys = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues().map(v => key(v[0], v[1], v[2]));
    let n = 0;
    for (let i = keys.length - 1; i >= 0; i--) if (want.indexOf(keys[i]) >= 0) { sh.deleteRow(i + 2); n++; }
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
  if (!ADMIN_KEY || String(b.key || '') !== ADMIN_KEY) return { ok: false, auth: true, error: 'الحذف يحتاج مفتاح المشرف' };
  const def = PROG[b.table];
  if (!def || !Array.isArray(b.ids)) return { ok: false, error: 'بيانات ناقصة' };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(def.sheet);
    if (!sh || sh.getLastRow() < 2) return { ok: true, deleted: 0 };
    const keys = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(x => String(x[0]));
    let n = 0;
    for (let i = keys.length - 1; i >= 0; i--) if (b.ids.indexOf(keys[i]) >= 0 || b.ids.indexOf('r' + (i + 2)) >= 0) { sh.deleteRow(i + 2); n++; }
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
