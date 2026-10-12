/* =====================================================================
   منصة الموهبة – سكربت «السجل التام لتطور الموهبة» (Google Apps Script)
   جدول منفصل عن جدول بيانات المنصة، لأنه يحتوي بيانات الطلاب.
   يُلصق هذا الملف في: الجدول ← الإضافات (Extensions) ← Apps Script
   ===================================================================== */

/* مفتاح المشرف: كلمة سر خاصة بك — تفتح التقارير وتجلب بيانات الطالب. لا تعطها للمعلمين. */
const ADMIN_KEY = 'Das@2027';

/* رمز المعلمين: يُعطى للمعلمين، ولا يُقبل حفظ أي نموذج بدونه. غيّره متى شئت (ثم انشر إصداراً جديداً). */
const TEACHER_CODE = 'das123456';

function codeOk_(c) { c = String(c || '').trim(); return c !== '' && (c === TEACHER_CODE || c === ADMIN_KEY); }

const MASTER = 'السجل';
const STUDENTS = 'الطلاب';
const MASTER_HEADERS = ['المعرّف', 'وقت الحفظ', 'التاريخ', 'العام الدراسي', 'المعلم', 'رمز النموذج', 'النموذج', 'معرف النموذج',
  'رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل', 'النتيجة', 'ملاحظات', 'الإجابات', 'الدرجات'];

/* شغّل هذه الدالة مرة واحدة بعد اللصق (وآمن تشغيلها مرة أخرى) */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(ss, MASTER, MASTER_HEADERS, true);
  ensureSheet_(ss, STUDENTS, ['رقم الطالب', 'اسم الطالب', 'الصف', 'الفصل'], true);
  SpreadsheetApp.flush();
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
    achievement: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null
  };
}
