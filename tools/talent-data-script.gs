/**
 * منصة الموهبة – مدارس دار الذكر
 * سكربت بيانات المنصة (Google Apps Script مرتبط بـ Google Sheet)
 *
 * طريقة الإعداد (مرة واحدة):
 * 1) أنشئ Google Sheet جديداً فارغاً باسم "بيانات منصة الموهبة".
 * 2) من القائمة: Extensions (الإضافات) ← Apps Script.
 * 3) احذف أي كود موجود والصق هذا الملف كاملاً، ثم احفظ.
 * 4) اختر الدالة setupSheet من القائمة العلوية واضغط Run (تشغيل)،
 *    ووافق على الصلاحيات. ستُنشأ التبويبات الأربعة بعناوينها تلقائياً.
 * 5) Deploy ← New deployment ← النوع: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    ثم انسخ رابط /exec وضعه في DATA_SCRIPT_URL داخل index.html و kpis.html.
 *
 * بعد ذلك: أي رقم تكتبه في الجدول يظهر في الموقع عند فتحه، دون تعديل أي كود.
 * تنبيه: لا تكتب في هذا الجدول أسماء طلاب أو نتائج فردية — الموقع عام.
 */

const SHEETS = {
  stats:   'الأرقام',
  kpis:    'المؤشرات',
  funnel:  'مسار المسابقات',
  reports: 'التقارير'
};

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const out = {
    stats:   readTable_(ss, SHEETS.stats),
    kpis:    readTable_(ss, SHEETS.kpis),
    funnel:  readTable_(ss, SHEETS.funnel),
    reports: readTable_(ss, SHEETS.reports),
    updated: new Date().toISOString()
  };
  const json = JSON.stringify(out);
  const cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[A-Za-z_$][\w$.]*$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function readTable_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 1) return { headers: [], rows: [] };
  const values = sh.getDataRange().getDisplayValues();
  const headers = values[0].map(function (h) { return String(h).trim(); });
  const rows = values.slice(1).filter(function (r) {
    return r.some(function (c) { return String(c).trim() !== ''; });
  });
  return { headers: headers, rows: rows };
}

/** تشغيل مرة واحدة لإنشاء التبويبات بعناوينها والقوائم الأساسية */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  makeSheet_(ss, SHEETS.stats,
    ['المفتاح', 'العنوان', 'Title', 'القيمة', 'اللاحقة'],
    [
      ['gifted',       'طالب موهوب ومتميز',          'Gifted & excellent students', '', ''],
      ['beneficiaries','مستفيد من برامج الرعاية',    'Care program beneficiaries',  '', ''],
      ['participants', 'مشاركة في المسابقات',         'Competition entries',         '', ''],
      ['awards',       'جائزة وميدالية',              'Awards & medals',             '', ''],
      ['programs',     'برنامج إثرائي منفذ',          'Enrichment programs',         '', ''],
      ['competitions', 'مسابقة نشارك فيها',           'Competitions entered',        '', '']
    ]);

  makeSheet_(ss, SHEETS.kpis,
    ['المفتاح', 'المؤشر', 'Indicator', 'المحور', 'الوحدة', 'المستهدف',
     '2024-2025', '2025-2026', '2026-2027'],
    [
      ['tgdm_activation', 'نسبة تفعيل مكونات النموذج التام لتطوير الموهبة', 'TGDM components activation', 'التخطيط والتفعيل', '%', '', '', '', ''],
      ['plan_ontime', 'نسبة تنفيذ الخطة التشغيلية في موعدها', 'Operational plan delivered on time', 'التخطيط والتفعيل', '%', '', '', '', ''],
      ['programs', 'عدد البرامج الإثرائية المنفذة', 'Enrichment programs delivered', 'الرعاية', 'عدد', '', '', '', ''],
      ['beneficiaries', 'عدد المستفيدين من برامج الموهبة والإثراء', 'Talent & enrichment beneficiaries', 'الرعاية', 'عدد', '', '', '', ''],
      ['training_regularity', 'نسبة انتظام التدريب', 'Training regularity', 'الرعاية', '%', '', '', '', ''],
      ['participants', 'عدد المشاركين في المسابقات', 'Competition participants', 'المسابقات', 'عدد', '', '', '', ''],
      ['priority_participation', 'نسبة المشاركة في المسابقات ذات الأولوية', 'Participation in priority competitions', 'المسابقات', '%', '', '', '', ''],
      ['progression', 'نسبة الانتقال بين مراحل المسابقات', 'Stage-to-stage progression rate', 'المسابقات', '%', '', '', '', ''],
      ['awards', 'عدد الجوائز والميداليات', 'Awards & medals', 'المسابقات', 'عدد', '', '', '', ''],
      ['talent_pool', 'حجم مجمع الطلاب الموهوبين', 'Talent pool size', 'الاستدامة والأثر', 'عدد', '', '', '', ''],
      ['impact', 'نسبة تحسن قدرات الطلاب المستفيدين', 'Improvement in beneficiaries\u2019 abilities', 'الاستدامة والأثر', '%', '', '', '', '']
    ]);

  makeSheet_(ss, SHEETS.funnel,
    ['المسابقة', 'Competition', 'المجال', 'العام', 'المسجلون', 'المتأهلون', 'النهائيون', 'الفائزون'],
    [
      ['كانجارو موهبة للرياضيات', 'Kangaroo Mawhiba (Math)', 'الرياضيات', '2026-2027', '', '', '', ''],
      ['بيبراس موهبة للمعلوماتية', 'Bebras Mawhiba (Informatics)', 'المعلوماتية', '2026-2027', '', '', '', ''],
      ['أولمبياد العلوم', 'Science Olympiad', 'العلوم', '2026-2027', '', '', '', ''],
      ['أولمبياد الروبوت العالمي WRO', 'World Robot Olympiad (WRO)', 'الروبوت والبرمجة', '2026-2027', '', '', '', ''],
      ['الأولمبياد الوطني للإبداع العلمي (إبداع)', 'Ibdaa National Olympiad for Scientific Creativity', 'البحث والابتكار', '2026-2027', '', '', '', '']
    ]);

  makeSheet_(ss, SHEETS.reports,
    ['العنوان', 'Title', 'النوع', 'التاريخ', 'الرابط'],
    []);

  // أعمدة عرض مريحة
  [SHEETS.stats, SHEETS.kpis, SHEETS.funnel, SHEETS.reports].forEach(function (n) {
    const sh = ss.getSheetByName(n);
    sh.setRightToLeft(true);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setFontWeight('bold').setBackground('#F7E7BE');
    sh.autoResizeColumns(1, sh.getLastColumn());
  });

  // قائمة منسدلة لنوع التقرير
  const rep = ss.getSheetByName(SHEETS.reports);
  rep.getRange('C2:C200').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['دوري', 'بعد برنامج أو مسابقة', 'سنوي'], true).build());

  SpreadsheetApp.getUi().alert('تم إنشاء تبويبات بيانات منصة الموهبة بنجاح.');
}

function makeSheet_(ss, name, headers, seed) {
  let sh = ss.getSheetByName(name);
  if (sh) return; // لا نمسح بيانات موجودة أبداً
  sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (seed.length) sh.getRange(2, 1, seed.length, headers.length).setValues(seed);
}
