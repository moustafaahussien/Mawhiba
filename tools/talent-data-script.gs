/**
 * منصة الموهبة – مدارس دار الذكر
 * سكربت بيانات المنصة (Google Apps Script مرتبط بـ Google Sheet)
 *
 * طريقة الإعداد (مرة واحدة):
 * 1) أنشئ Google Sheet جديداً فارغاً باسم "بيانات منصة الموهبة".
 * 2) من القائمة: Extensions (الإضافات) ← Apps Script.
 * 3) احذف أي كود موجود والصق هذا الملف كاملاً، ثم احفظ.
 * 4) اختر الدالة setupSheet من القائمة العلوية واضغط Run (تشغيل)،
 *    ووافق على الصلاحيات. تُنشأ التبويبات بعناوينها تلقائياً.
 *    (تشغيلها مرة أخرى لاحقاً يضيف التبويبات الجديدة فقط ولا يمسح شيئاً.)
 * 5) Deploy ← New deployment ← النوع: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    ثم انسخ رابط /exec وضعه في js/config.js
 *
 * عند تعديل هذا الكود لاحقاً: Deploy ← Manage deployments ← تعديل ← New version
 * (يبقى رابط /exec نفسه).
 *
 * التبويبات:
 *  - الأرقام            : أرقام الصفحة الرئيسية
 *  - المؤشرات           : مؤشرات الأداء لكل عام
 *  - مسار المسابقات     : المسجلون/المتأهلون/النهائيون/الفائزون لكل مسابقة وعام
 *  - التقارير           : روابط التقارير
 *  - المسابقات          : حالة التسجيل ورابطه ومجلد المصادر لكل مسابقة
 *  - المواعيد           : مواعيد العام الحالي لكل مسابقة (تتقدم على المواعيد الاسترشادية)
 *  - التدريب            : جدول التدريب في المدرسة (البرنامج، الموعد، المكان، المدرب...)
 *  - الإنجازات          : إنجازات المدرسة في كل مسابقة
 *  - خطة الإعداد        : بنود خطة الإعداد لكل مسابقة (تحل محل الخطة المكتوبة في الموقع)
 *  - المكونات           : حالة كل مكوّن من مكونات النموذج التسعة، ومسؤوله، ومجلد مصادره
 *  - وحدات المكونات     : وحدات/فعاليات كل مكوّن هذا العام (العنوان، الفرع، الفئة، الوسيلة، التاريخ...)
 *
 * معرّفات المسابقات: kangaroo, bebras, nsmo, ibdaa, isef
 * معرّفات المكونات : record, general-enrichment, skills, clusters, specialty, projects,
 *                    acceleration, mentorship, support
 *
 * مجلد المصادر: أنشئ مجلداً في Google Drive لكل مسابقة وضع فيه الحقائب والملفات
 * (ويمكن تقسيمه لمجلدات فرعية تظهر كمجموعات)، واجعل مشاركته
 * "أي شخص لديه الرابط – عارض"، ثم ضع معرّف المجلد في عمود «مجلد المصادر».
 *
 * تنبيه: الموقع عام — لا تكتب أسماء طلاب أو نتائج فردية إلا بموافقة أولياء الأمور.
 */

const SHEETS = {
  stats:        'الأرقام',
  kpis:         'المؤشرات',
  funnel:       'مسار المسابقات',
  reports:      'التقارير',
  competitions: 'المسابقات',
  dates:        'المواعيد',
  training:     'التدريب',
  achievements: 'الإنجازات',
  plans:        'خطة الإعداد',
  components:   'المكونات',
  units:        'وحدات المكونات'
};

/** معرّفات مكونات النموذج التام لتطوير الموهبة (تُستخدم في عمود «المعرّف») */
const COMPONENT_IDS = [
  ['record', 'السجل التام لتطور الموهبة'], ['general-enrichment', 'برنامج الإثراء العام'], ['skills', 'برنامج تنمية المهارات'],
  ['clusters', 'برنامج الأنشطة الموجهة'], ['specialty', 'برنامج الإثراء المتخصص'], ['projects', 'برنامج المشاريع الهادفة'],
  ['acceleration', 'برنامج التسريع الأكاديمي'], ['mentorship', 'برنامج الرعاية الخاصة'], ['support', 'البرامج المساندة']
];

/** البنود الأولية لتبويب «خطة الإعداد» (تُكتب مرة واحدة عند إنشاء التبويب، ثم تعدّلها من الجدول) */
const PLAN_SEED = [["kangaroo","حل نموذج من أسئلة الأعوام السابقة أسبوعياً حسب مستوى الطالب، ومناقشة الحلول الكاملة جماعياً.","Solve one past paper weekly at the student’s level and discuss the full solutions as a group."],
    ["kangaroo","حلقات قصيرة لاستراتيجيات حل المسائل: الرسم، والبحث عن نمط، والحالات الخاصة، والاستبعاد.","Short sessions on problem-solving strategies: drawing, finding patterns, special cases, elimination."],
    ["kangaroo","تدريب على إدارة الوقت: 24 سؤالاً في 75 دقيقة للصفين 3–4، و30 سؤالاً في 90 دقيقة لبقية المستويات.","Time management: 24 questions in 75 minutes (Gr. 3–4), 30 questions in 90 minutes (other levels)."],
    ["kangaroo","اختبار محاكاة كامل على حاسب قبل الموعد الرسمي بأسبوعين، ثم أداء الاختبار التجريبي الرسمي.","A full mock test on a computer two weeks before the official date, then the official trial test."],
    ["bebras","حل النماذج العربية السابقة التفاعلية (2015–2024) في مكتبة بيبراس، نموذجاً كل أسبوع.","Solve the interactive past Arabic tests (2015–2024) in the Bebras library, one per week."],
    ["bebras","أنشطة من كتاب «التفكير الحاسوبي» القائم على مهام بيبراس في حصص النشاط.","Activities from the \"Computational Thinking\" Bebras activity book during activity periods."],
    ["bebras","تدريب على المهارات السبع: التفكيك، والأنماط، والتجريد، والخوارزميات، والاستدلال، والتقييم، والتعميم.","Practise the seven skills: decomposition, patterns, abstraction, algorithms, reasoning, evaluation, generalization."],
    ["bebras","محاكاة اختبار كامل مدته 60 دقيقة، والتدرّب على مراجعة الإجابات قبل «التسليم» لأن المحاولة واحدة.","A full 60-minute mock test, practising answer review before \"Submit\" since there is only one attempt."],
    ["bebras","التأكد من أداء كل طالب للاختبار التجريبي قبل 29 نوفمبر.","Make sure every student takes the practice test before 29 November."],
    ["nsmo","حصص تدريب أسبوعية لكل تخصص بإشراف معلمي المواد.","Weekly training per field, led by subject teachers."],
    ["nsmo","إنهاء حقائب المرحلة الأولى الرسمية وحل تمارينها.","Complete the official Phase One packages and their exercises."],
    ["nsmo","اختبارات محاكاة قصيرة بنفس مدة الاختبار (ساعتان).","Short mock tests with the same duration (two hours)."],
    ["nsmo","متابعة الطلاب المتأهلين في التدريب المركزي الذي تنظمه موهبة.","Follow up qualified students during Mawhiba’s central training."],
    ["ibdaa","ورشة اختيار المشكلة البحثية من اهتمامات الطالب، والتحقق من أصالتها عبر براءات الاختراع والمجلات العلمية.","Workshop on choosing a research problem from student interests and checking originality via patents and journals."],
    ["ibdaa","اختيار المجال الصحيح من المجالات الـ22 بالاستعانة بدليل «اختيار المجال الصحيح».","Choose the right field from the 22 using the \"Choosing the right field\" guide."],
    ["ibdaa","كتابة ملخص قوي وخطة بحث وفق معايير التحكيم الإلكتروني 2027، لأن التحكيم الأول يعتمد عليهما.","Write a strong abstract and research plan per the 2027 online judging criteria, since first-round judging relies on them."],
    ["ibdaa","استكمال النماذج الإلزامية (1، 1A، 1B، 2A) مبكراً، وتحديد النماذج الإضافية حسب طبيعة المشروع.","Complete the mandatory forms (1, 1A, 1B, 2A) early and identify any extra forms the project needs."],
    ["ibdaa","إعداد لوحة العرض ودفتر اليوميات، والتدرب على المقابلة بأسئلة محاكية.","Prepare the display board and journal, and rehearse the interview with mock questions."],
    ["ibdaa","ربط الطلاب ببرنامج البحث العلمي في وحدة مهارات القرن 21 لبناء خط إمداد مستمر للمشاريع.","Link students with the Scientific Research program of the 21st Century Skills Unit for a steady project pipeline."],
    ["isef","تتولى موهبة تأهيل المتأهلين عبر ورشة المشاركة الدولية.","Mawhiba prepares qualifiers through the international participation workshop."],
    ["isef","دور المدرسة: دعم الطالب وتفريغه للتدريب، وتوفير مساحة للتجريب.","The school’s role: support the student, allow time for training and provide space for experiments."],
    ["isef","التدرب على العرض والمناقشة بالإنجليزية أمام لجنة محاكية من المعلمين.","Rehearse presenting in English before a mock panel of teachers."],
    ["isef","مراجعة توافق المشروع مع القواعد الدولية ونماذجها مبكراً، ودراسة مشاريع المتأهلين السابقين في نفس المجال.","Check compliance with international rules and forms early, and study past finalist projects in the same category."]];

function doGet(e) {
  const p = (e && e.parameter) || {};
  let out;
  if (p.mode === 'files') {
    out = listFolder_(p.folder);
  } else {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    out = { updated: new Date().toISOString() };
    Object.keys(SHEETS).forEach(function (k) { out[k] = readTable_(ss, SHEETS[k]); });
  }
  return respond_(out, p.callback);
}

function respond_(obj, cb) {
  const json = JSON.stringify(obj);
  if (cb && /^[A-Za-z_$][\w$.]*$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
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

/** قائمة ملفات مجلد Drive (ومجلداته الفرعية مستوى واحداً) */
function listFolder_(id) {
  if (!id || !/^[\w-]{10,}$/.test(id)) return { error: 'bad-folder' };
  try {
    const root = DriveApp.getFolderById(id);
    const groups = [{ name: '', files: filesOf_(root) }];
    const subs = root.getFolders();
    while (subs.hasNext()) {
      const f = subs.next();
      groups.push({ name: f.getName(), files: filesOf_(f) });
    }
    groups.forEach(function (g) { g.files.sort(function (a, b) { return a.name.localeCompare(b.name, 'ar'); }); });
    groups.sort(function (a, b) { return a.name.localeCompare(b.name, 'ar'); });
    return { groups: groups.filter(function (g) { return g.files.length; }) };
  } catch (err) {
    return { error: 'not-accessible' };
  }
}
function filesOf_(folder) {
  const out = [], it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    out.push({ name: f.getName(), url: f.getUrl(), mime: f.getMimeType(), size: f.getSize(), updated: f.getLastUpdated().toISOString() });
  }
  return out;
}

/** تشغيل مرة واحدة لإنشاء التبويبات (لا يمسح أي بيانات موجودة) */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const Y = '2026-2027';

  makeSheet_(ss, SHEETS.stats,
    ['المفتاح', 'العنوان', 'Title', 'القيمة', 'اللاحقة'],
    [
      ['gifted',       'طالب في الوعاء الإثرائي',     'Students in the enrichment pool', '', ''],
      ['beneficiaries','مستفيد من برامج النموذج',     'Beneficiaries of model programs', '', ''],
      ['participants', 'مشاركة في المسابقات',         'Competition entries',         '', ''],
      ['awards',       'جائزة وميدالية',              'Awards & medals',             '', ''],
      ['programs',     'برنامج إثرائي منفذ',          'Enrichment programs',         '', ''],
      ['competitions', 'مسابقة نشارك فيها',           'Competitions entered',        '', '']
    ]);

  makeSheet_(ss, SHEETS.kpis,
    ['المفتاح', 'المؤشر', 'Indicator', 'المحور', 'الوحدة', 'المستهدف', '2024-2025', '2025-2026', '2026-2027'],
    [
      ['tgdm_activation', 'نسبة تفعيل مكونات النموذج التام لتطوير الموهبة التسعة', 'Activation of the nine TGDM components', 'التخطيط والتفعيل', '%', '', '', '', ''],
      ['plan_ontime', 'نسبة تنفيذ الخطة التشغيلية في موعدها', 'Operational plan delivered on time', 'التخطيط والتفعيل', '%', '', '', '', ''],
      ['programs', 'عدد البرامج الإثرائية المنفذة', 'Enrichment programs delivered', 'الرعاية', 'عدد', '', '', '', ''],
      ['beneficiaries', 'عدد المستفيدين من برامج الموهبة والإثراء', 'Talent & enrichment beneficiaries', 'الرعاية', 'عدد', '', '', '', ''],
      ['training_regularity', 'نسبة انتظام التدريب', 'Training regularity', 'الرعاية', '%', '', '', '', ''],
      ['participants', 'عدد المشاركين في المسابقات', 'Competition participants', 'المسابقات', 'عدد', '', '', '', ''],
      ['priority_participation', 'نسبة المشاركة في المسابقات ذات الأولوية', 'Participation in priority competitions', 'المسابقات', '%', '', '', '', ''],
      ['progression', 'نسبة الانتقال بين مراحل المسابقات', 'Stage-to-stage progression rate', 'المسابقات', '%', '', '', '', ''],
      ['awards', 'عدد الجوائز والميداليات', 'Awards & medals', 'المسابقات', 'عدد', '', '', '', ''],
      ['talent_pool', 'حجم مجمع الطلاب الموهوبين', 'Talent pool size', 'الاستدامة والأثر', 'عدد', '', '', '', ''],
      ['impact', 'نسبة تحسن قدرات الطلاب المستفيدين', 'Improvement in beneficiaries’ abilities', 'الاستدامة والأثر', '%', '', '', '', '']
    ]);

  makeSheet_(ss, SHEETS.funnel,
    ['المعرّف', 'المسابقة', 'Competition', 'المجال', 'العام', 'المسجلون', 'المتأهلون', 'النهائيون', 'الفائزون'],
    [
      ['kangaroo', 'كانجارو موهبة للرياضيات', 'Kangaroo Mawhiba (Math)', 'الرياضيات', Y, '', '', '', ''],
      ['bebras', 'بيبراس موهبة للمعلوماتية', 'Bebras Mawhiba (Informatics)', 'المعلوماتية', Y, '', '', '', ''],
      ['nsmo', 'أولمبياد الموهبة الوطني – نسمو', 'National Gifted Olympiad – NSMO', 'العلوم', Y, '', '', '', ''],
      ['ibdaa', 'أولمبياد الموهبة الوطني – إبداع', 'National Gifted Olympiad – Ibdaa', 'البحث والابتكار', Y, '', '', '', ''],
      ['isef', 'معرض ISEF الدولي', 'Regeneron ISEF', 'البحث والابتكار', Y, '', '', '', '']
    ]);

  makeSheet_(ss, SHEETS.reports, ['العنوان', 'Title', 'النوع', 'التاريخ', 'الرابط'], []);

  makeSheet_(ss, SHEETS.competitions,
    ['المعرّف', 'المسابقة', 'حالة التسجيل', 'رابط التسجيل', 'مجلد المصادر', 'منسق المسابقة بالمدرسة', 'ملاحظة'],
    [
      ['kangaroo', 'كانجارو موهبة للرياضيات', '', '', '', '', ''],
      ['bebras', 'بيبراس موهبة للمعلوماتية', '', '', '', '', ''],
      ['nsmo', 'أولمبياد الموهبة الوطني – نسمو', '', '', '', '', ''],
      ['ibdaa', 'أولمبياد الموهبة الوطني – إبداع', '', '', '', '', ''],
      ['isef', 'معرض ISEF الدولي', '', '', '', '', '']
    ]);

  makeSheet_(ss, SHEETS.dates,
    ['المعرّف', 'المرحلة', 'Stage', 'من تاريخ', 'إلى تاريخ', 'ملاحظة', 'الوقت'], []);
  ensureHeaders_(ss, SHEETS.dates, ['الوقت']); // لمن أنشأ التبويب بإصدار سابق

  makeSheet_(ss, SHEETS.training,
    ['المعرّف', 'البرنامج', 'الموعد', 'المكان', 'المدرب', 'الفئة المستهدفة', 'رابط'], []);

  makeSheet_(ss, SHEETS.achievements,
    ['المعرّف', 'العام', 'الإنجاز', 'المستوى', 'التفاصيل'], []);

  makeSheet_(ss, SHEETS.plans, ['المعرّف', 'البند', 'Item (English)'], PLAN_SEED);

  makeSheet_(ss, SHEETS.components,
    ['المعرّف', 'المكوّن', 'الحالة', 'مجلد المصادر', 'المسؤول', 'ملاحظة'],
    COMPONENT_IDS.map(function (c) { return [c[0], c[1], '', '', '', '']; }));

  makeSheet_(ss, SHEETS.units,
    ['المعرّف', 'عنوان الوحدة', 'الفرع', 'الفئة المستهدفة', 'وسيلة التقديم', 'التاريخ', 'الوقت', 'المدرب', 'ملاحظة'], []);

  Object.keys(SHEETS).forEach(function (k) {
    const sh = ss.getSheetByName(SHEETS[k]);
    sh.setRightToLeft(true);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setFontWeight('bold').setBackground('#F7E7BE');
    sh.autoResizeColumns(1, sh.getLastColumn());
  });

  // قوائم منسدلة
  const ids = ['kangaroo', 'bebras', 'nsmo', 'ibdaa', 'isef'];
  const idRule = SpreadsheetApp.newDataValidation().requireValueInList(ids, true).setAllowInvalid(true).build();
  [SHEETS.dates, SHEETS.training, SHEETS.achievements, SHEETS.plans].forEach(function (n) {
    ss.getSheetByName(n).getRange('A2:A500').setDataValidation(idRule);
  });
  ss.getSheetByName(SHEETS.reports).getRange('C2:C200').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['دوري', 'بعد برنامج أو مسابقة', 'سنوي'], true).build());
  ss.getSheetByName(SHEETS.competitions).getRange('C2:C100').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['مفتوح', 'قريباً', 'مغلق'], true).build());
  ss.getSheetByName(SHEETS.achievements).getRange('D2:D500').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['مدرسي', 'إقليمي', 'وطني', 'دولي'], true).setAllowInvalid(true).build());
  // قوائم المكونات: المعرّف، والحالة، وفروع الإثراء العام ووسائله (يُسمح بغيرها)
  const compRule = SpreadsheetApp.newDataValidation().requireValueInList(COMPONENT_IDS.map(function (c) { return c[0]; }), true).setAllowInvalid(true).build();
  ss.getSheetByName(SHEETS.units).getRange('A2:A1000').setDataValidation(compRule);
  ss.getSheetByName(SHEETS.components).getRange('C2:C20').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['مفعّل', 'قيد التفعيل', 'غير مفعّل'], true).setAllowInvalid(true).build());
  ss.getSheetByName(SHEETS.units).getRange('C2:C1000').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['الأعلام', 'التاريخ', 'الثقافة العامة', 'التربية الاجتماعية', 'العلوم', 'الجغرافيا', 'الفلك', 'الحيوانات', 'النبات', 'الاقتصاد', 'الصحة', 'التربية البدنية', 'السلوك', 'أخرى'], true).setAllowInvalid(true).build());
  ss.getSheetByName(SHEETS.units).getRange('E2:E1000').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['متحدث', 'مجموعة عمل', 'عرض عملي', 'عرض فني', 'حلقة نقاش', 'تواصل عبر الإنترنت', 'فيلم سينمائي', 'مقاطع من أفلام', 'عرض شرائح', 'شريط سمعي', 'شريط فيديو', 'برنامج تلفزيوني', 'جريدة يومية / مجلة', 'برنامج كمبيوتر', 'معروضات معلّقة', 'رحلات ميدانية', 'زيارة شخص', 'زيارة مراكز التعلم', 'الإنترنت', 'أخرى'], true).setAllowInvalid(true).build());
  ss.getSheetByName(SHEETS.units).getRange('F2:F1000').setNumberFormat('yyyy-mm-dd');
  ss.getSheetByName(SHEETS.units).getRange('G2:G1000').setNumberFormat('@');

  // أعمدة التواريخ بصيغة YYYY-MM-DD، وعمود الوقت نصاً (مثل 17:00)
  ss.getSheetByName(SHEETS.dates).getRange('D2:E500').setNumberFormat('yyyy-mm-dd');
  ss.getSheetByName(SHEETS.dates).getRange('G2:G500').setNumberFormat('@');

  SpreadsheetApp.getUi().alert('تم إعداد تبويبات بيانات منصة الموهبة بنجاح.');
}

/** يضيف أعمدة ناقصة في نهاية تبويب موجود (بدون مسح أي بيانات) */
function ensureHeaders_(ss, name, cols) {
  const sh = ss.getSheetByName(name);
  if (!sh) return;
  const head = sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0].map(String);
  cols.forEach(function (c) {
    if (head.indexOf(c) < 0) { sh.getRange(1, head.length + 1).setValue(c); head.push(c); }
  });
}

function makeSheet_(ss, name, headers, seed) {
  let sh = ss.getSheetByName(name);
  if (sh) return; // لا نمسح بيانات موجودة أبداً
  sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (seed.length) sh.getRange(2, 1, seed.length, headers.length).setValues(seed);
}
