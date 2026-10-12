/* =====================================================================
   نماذج السجل التام لتطور الموهبة — سجل الموهبة 1، 7، 8، 9، 10
   المصدر: ملحق (1) من كتاب «النموذج التام لتطوير الموهبة»
   أنواع الحقول:
     text / number / date / textarea / select(opts) / checks(opts)
     grid  : مجموعة حقول متجاورة {t:'grid', l, note, fields:[...]}
     table : جدول صفوف {t:'table', l, cols:[{k,l,t}], rows: عدد الصفوف الابتدائي}
     staff : شخص متابعة {t:'staff', l} → الاسم، الصفة، الهاتف، وصف المهمة
   ===================================================================== */

const MI = ['لغوي', 'رياضي', 'حركي', 'اجتماعي', 'فني', 'إيقاعي', 'شخصي'];
const INTEREST_COLS = [
  ['int_lang', 'اللغات والقراءة'], ['int_math', 'الرياضيات'], ['int_sci', 'العلوم'],
  ['int_soc', 'العلوم الاجتماعية'], ['int_arts', 'الفنون'], [null, 'الإيقاع'], [null, 'الحركي']
];
const EXPR_TAGS = ['كتابي', 'لفظي', 'ذهني', 'فني / مرئي', 'فني / عروض', 'خدمي', 'فني / متعدد', 'قيادي / مهني'];
const PLAN_FIELDS = ['العلمي', 'المعرفي', 'العقلي', 'المهاري', 'الاجتماعي'];
const goalRows = (k, l, head) => ({ t: 'table', k, l, rows: 3, cols: [{ k: 'item', l: head, t: 'text' }, { k: 'time', l: 'البعد الزمني', t: 'text', w: '28%' }] });

const RECORDS = [

/* ===================== سجل الموهبة – 1 ===================== */
{
  id: 'status', code: 'سجل الموهبة – 1', group: 'السجل', title: 'نموذج معلومات الوضع الراهن', short: 'الوضع الراهن',
  who: 'مسجل البيانات', auto: true,
  intro: 'تُملأ الأقسام 2 إلى 6 تلقائياً من نتائج النماذج التي عبّأها المعلمون لهذا الطالب (زر «جلب نتائج الطالب»)، ويمكن تعديلها. القسم 1 يُدخل من السجل الأكاديمي ونتائج المقاييس.',
  sections: [
    { id: 's1', title: '1 – القدرات', fields: [
      { t: 'table', k: 'academic', l: 'السجل الأكاديمي — المستوى العام', note: 'معدل تحصيل ≥ 95 يدل على تميز في المستوى العام', rows: 3,
        cols: [{ k: 'year', l: 'العام الدراسي' }, { k: 'acad', l: 'المستوى الأكاديمي', t: 'number' }, { k: 'core', l: 'مستوى الركائز', t: 'number' }, { k: 'total', l: 'مستوى المجموع', t: 'number' }], flag: { col: 'total', min: 95 } },
      { t: 'table', k: 'subjects', l: 'مواد التميز', note: 'معدل تحصيل ≥ 95 يدل على تميز في مستوى المادة', rows: 2,
        cols: [{ k: 'name', l: 'مسمى المادة' }, { k: 'pct', l: 'نسبة التحصيل', t: 'number' }], flag: { col: 'pct', min: 95 } },
      { t: 'grid', l: 'الذكاء المتعدد', note: 'معدل تحصيل ≥ 80 يدل على تميز في نوع الذكاء', flagMin: 80,
        fields: MI.map((m, i) => ({ k: 'mi' + i, l: m, t: 'number' })) },
      { t: 'grid', l: 'القدرات العقلية', fields: ['لغوية', 'عددية', 'مكانية', 'استدلالية'].map((m, i) => ({ k: 'ma' + i, l: m, t: 'number' })) },
      { t: 'grid', l: 'التفكير الابتكاري', fields: ['أصالة', 'مرونة', 'طلاقة', 'تفاصيل'].map((m, i) => ({ k: 'ct' + i, l: m, t: 'number' })) },
      { t: 'checks', k: 'nomination', l: 'مجالات الترشيح', opts: ['تحصيل', 'علوم', 'رياضيات', 'إبداع', 'دافعية', 'قيادة', 'تعلّم'] },
      { t: 'grid', l: 'المقاييس', fields: [{ k: 'sc_ct', l: 'تفكير ابتكاري', t: 'number' }, { k: 'sc_ma', l: 'قدرات عقلية', t: 'number' }] }
    ]},
    { id: 's2', title: '2 – السمات السلوكية (متوسط التحصيل)', src: 'traits', fields: [
      { t: 'grid', fields: [{ k: 'tr_motivation', l: 'التحفيز' }, { k: 'tr_creativity', l: 'الابتكار' }, { k: 'tr_leadership', l: 'القيادة' }] }
    ]},
    { id: 's3', title: '3 – مواضيع الاهتمام (متوسط التحصيل)', src: 'interests',
      note: 'متوسط تحصيل 2.67 – 3.33 = توجه معتدل نحو موضوع الاهتمام، و 3.34 – 4.00 = توجه عالٍ',
      fields: [{ t: 'grid', fields: INTEREST_COLS.map(([id, l], i) => ({ k: 'in' + i, l, t: 'number' })), flagMin: 3.34 }] },
    { id: 's4', title: '4 – أسلوب التعلم المفضل (متوسط التحصيل)', src: 'learning',
      note: 'متوسط تحصيل 3.67 – 4.33 = أسلوب مفضل، و 4.34 – 5.00 = أسلوب مفضل بقوة',
      fields: [{ t: 'grid', fields: [], dyn: 'learning', flagMin: 4.34 }] },
    { id: 's5', title: '5 – أسلوب التعبير المفضل', src: 'expression', fields: [{ t: 'checks', k: 'expr', opts: EXPR_TAGS }] },
    { id: 's6', title: '6 – أسلوب التفكير المفضل', src: 'thinking', fields: [{ t: 'checks', k: 'think', opts: ['تشريعي', 'تنفيذي', 'قضائي'] }] },
    { id: 's7', title: 'ملاحظات', fields: [{ t: 'textarea', k: 'notes', l: '' }] }
  ]
},

/* ===================== سجل الموهبة – 7 ===================== */
{
  id: 'basic', code: 'سجل الموهبة – 7', group: 'السجل', title: 'حصر المعلومات الأساسية', short: 'المعلومات الأساسية',
  who: 'رائد الفصل',
  intro: 'معلومات تسجيل الطالب في السجل التام. البيانات الشخصية تُحفظ في جدولك فقط، ولا تظهر في صفحات التقارير.',
  sections: [
    { id: 'st', title: 'معلومات عن الطالب', fields: [{ t: 'grid', fields: [
      { k: 'nationality', l: 'الجنسية' }, { k: 'idno', l: 'رقم الهوية' }, { k: 'dob', l: 'تاريخ الميلاد', t: 'date' }, { k: 'pob', l: 'مكان الميلاد' }] },
      { t: 'textarea', k: 'st_other', l: 'معلومات أخرى' }] },
    { id: 'pa', title: 'معلومات عن ولي أمر الطالب', fields: [{ t: 'grid', fields: [
      { k: 'p_name', l: 'اسم ولي الأمر' }, { k: 'p_nat', l: 'الجنسية' }, { k: 'p_id', l: 'رقم الهوية' }, { k: 'p_iddate', l: 'تاريخها' },
      { k: 'p_qual', l: 'المؤهل الدراسي' }, { k: 'p_job', l: 'الوظيفة' }, { k: 'p_waddr', l: 'عنوان العمل' }, { k: 'p_wphone', l: 'هاتف العمل' },
      { k: 'p_pobox', l: 'صندوق البريد' }, { k: 'p_zip', l: 'الرمز البريدي' }, { k: 'p_haddr', l: 'عنوان المنزل' }, { k: 'p_hphone', l: 'هاتف المنزل' },
      { k: 'p_fmob', l: 'جوال الأب' }, { k: 'p_mmob', l: 'جوال الأم' }, { k: 'p_fax', l: 'رقم الفاكس' }, { k: 'p_email', l: 'بريد إلكتروني', t: 'email' }] },
      { t: 'textarea', k: 'p_other', l: 'معلومات أخرى' }] },
    { id: 'gu', title: 'من ينوب عن ولي أمر الطالب', fields: [{ t: 'grid', fields: [
      { k: 'g_name', l: 'الاسم' }, { k: 'g_rel', l: 'صلة القرابة' }, { k: 'g_job', l: 'الوظيفة' }, { k: 'g_employer', l: 'جهة العمل' },
      { k: 'g_wphone', l: 'هاتف العمل' }, { k: 'g_waddr', l: 'عنوان العمل' }, { k: 'g_mob', l: 'الجوال' }, { k: 'g_fax', l: 'الفاكس' },
      { k: 'g_hphone', l: 'هاتف المنزل' }, { k: 'g_haddr', l: 'عنوان المنزل' }, { k: 'g_email', l: 'بريد إلكتروني', t: 'email' }] },
      { t: 'textarea', k: 'g_other', l: 'معلومات أخرى' }] }
  ]
},

/* ===================== سجل الموهبة – 8 ===================== */
{
  id: 'plan', code: 'سجل الموهبة – 8', group: 'السجل', title: 'خطة التطوير', short: 'خطة التطوير',
  who: 'المشرف', auto: true,
  intro: 'تُوضع لطلاب الوعاء الإثرائي بعد تحديدهم. اكتب كل هدف أو برنامج في سطر مستقل مع بعده الزمني؛ كل سطر يصبح مؤشراً يُقيَّم لاحقاً في نموذج «مؤشرات تطبيق خطة التطوير».',
  sections: [
    { id: 'goals', title: 'أهداف الخطة', fields: [
      { k: 'spec', l: 'الأهداف الاستراتيجية — مجال التخصص' },
      goalRows('strategic', 'الأهداف الاستراتيجية', 'الهدف'),
      { t: 'select', k: 'phase_field', l: 'الأهداف المرحلية — المجال', opts: PLAN_FIELDS },
      goalRows('phased', 'الأهداف المرحلية', 'الهدف')
    ]},
    { id: 'progs', title: 'البرامج التي تحقق الأهداف', fields: [
      { k: 'skills_prog', l: 'تنمية المهارات — البرنامج' }, goalRows('skills', 'تنمية المهارات', 'المهارة / الوحدة'),
      { k: 'enrich_cat', l: 'الإثراء المتخصص — فئة الإثراء' }, goalRows('enrich', 'الإثراء المتخصص', 'المحتوى'),
      { k: 'project', l: 'المشاريع الهادفة — المشروع والبحث' }, goalRows('projects', 'المشاريع الهادفة', 'المرحلة / المهمة'),
      { k: 'accel_stage', l: 'التسريع — المرحلة' }, goalRows('accel', 'التسريع', 'الإجراء'),
      goalRows('reading', 'الاطلاع (الكتب / المراجع / مواقع الشبكة)', 'المصدر')
    ]},
    { id: 'follow', title: 'متابعة التنفيذ', fields: [
      { t: 'staff', k: 'f_guide', l: 'التوجيه والإرشاد', task: 'وصف مهمة الإرشاد والتوجيه' },
      { t: 'staff', k: 'f_spec', l: 'التوجيه التخصصي' },
      { t: 'staff', k: 'f_admin', l: 'الإداري' },
      { t: 'staff', k: 'f_tech', l: 'الفني' }
    ]},
    { id: 'pn', title: 'ملاحظات', fields: [{ t: 'textarea', k: 'notes', l: '' }] }
  ]
},

/* ===================== سجل الموهبة – 9 ===================== */
{
  id: 'indicators', code: 'سجل الموهبة – 9', group: 'السجل', title: 'مؤشرات تطبيق خطة التطوير', short: 'مؤشرات الخطة',
  who: 'المشرف', auto: true, needs: 'plan',
  intro: 'اضغط «جلب خطة الطالب» فتظهر كل أهداف خطته وبرامجها والمتابعين لها، ثم حدد مستوى الإنجاز لكل سطر من 1 إلى 5. يُحسب المجموع الجزئي لكل قسم والمجموع الكلي ونسبة الإنجاز.',
  scale: { 1: 'لم يتحقق', 2: 'بداية', 3: 'جزئي', 4: 'متقدم', 5: 'تحقق' },
  sections: []
},

/* ===================== سجل الموهبة – 10 ===================== */
{
  id: 'progress', code: 'سجل الموهبة – 10', group: 'السجل', title: 'نموذج معلومات تطور الموهبة', short: 'معلومات التطور',
  who: 'مسجل المعلومات',
  intro: 'يُستكمل أثناء تطبيق خطة التطوير بالمستجدات التي تطرأ على سجل الطالب أثناء تفاعله مع برامج النموذج.',
  sections: [
    { id: 'p1', title: '1 – مخرجات برنامج الإثراء العام', fields: [
      { t: 'table', k: 'gen_interests', l: 'اهتمامات الطالب الإثرائية', rows: 3, cols: [{ k: 'date', l: 'تاريخ تقديم الوحدة' }, { k: 'field', l: 'المجال' }, { k: 'branch', l: 'الفرع' }] },
      { t: 'table', k: 'extra', l: 'الإثراء الإضافي', rows: 2, cols: [{ k: 'date', l: 'تاريخ تقديم الوحدة' }, { k: 'field', l: 'المجال' }, { k: 'branch', l: 'الفرع' },
        { k: 'prog', l: 'البرنامج الإضافي' }, { k: 'skills', l: 'تنمية المهارات' }, { k: 'toproj', l: 'التوجيه نحو المشاريع الهادفة' }, { k: 'grade', l: 'درجة التقييم', t: 'number' }, { k: 'pct', l: 'نسبة التقييم', t: 'number' }] }
    ]},
    { id: 'p2', title: '2 – مخرجات برنامج تنمية المهارات', fields: [
      { t: 'grid', fields: [{ k: 'sk_field', l: 'المجال' }, { k: 'sk_branch', l: 'الفرع' }] },
      { t: 'table', k: 'sk_units', l: 'الوحدات', rows: 3, cols: [{ k: 'date', l: 'تاريخ تقديم الوحدة' }, { k: 'unit', l: 'مسمى الوحدة' }, { k: 'grade', l: 'درجة التحصيل', t: 'number' }, { k: 'pct', l: 'نسبة التحصيل', t: 'number' }] }
    ]},
    { id: 'p3', title: '3 – مخرجات برنامج الأنشطة الموجهة', fields: [
      { t: 'grid', l: 'مجالات اهتمام الطالب', fields: [1, 2, 3, 4, 5].map(i => ({ k: 'ac_int' + i, l: 'المجال ' + i })) },
      { t: 'grid', l: 'الأنشطة التي رغب الطالب المشاركة فيها', fields: [1, 2, 3].map(i => ({ k: 'ac_wish' + i, l: 'النشاط ' + i })) },
      { t: 'grid', fields: [{ k: 'ac_reg', l: 'النشاط الذي سجل فيه الطالب' }, { k: 'ac_swap', l: 'النشاط الذي استبدله الطالب' }, { k: 'ac_grade', l: 'درجة التقييم', t: 'number' }, { k: 'ac_pct', l: 'نسبة التقييم', t: 'number' }] }
    ]},
    { id: 'p4', title: '4 – مخرجات برنامج الإثراء المتخصص', fields: [
      { t: 'table', k: 'spec', l: 'مواد الإثراء المتخصص', rows: 2, cols: [{ k: 'subject', l: 'مادة الإثراء المتخصص' }, { k: 'q1', l: 'الدوري (1)' }, { k: 'q2', l: 'الدوري (2)' }, { k: 'q3', l: 'الدوري (3)' }, { k: 'q4', l: 'الدوري (4)' }] }
    ]},
    { id: 'p5', title: '5 – مخرجات برنامج المشاريع الهادفة', fields: [
      { t: 'table', k: 'pr_scope', l: 'النطاق المعرفي للبحث', rows: 2, cols: [{ k: 'scope', l: 'النطاق المعرفي للبحث' }, { k: 'topic', l: 'موضوع البحث' }, { k: 'date', l: 'تاريخ التقديم' }, { k: 'result', l: 'نتيجة التقييم' }] },
      { t: 'grid', fields: [{ k: 'pr_title', l: 'مسمى البحث' }, { k: 'pr_start', l: 'تاريخ البداية', t: 'date' }, { k: 'pr_end', l: 'تاريخ النهاية', t: 'date' }] },
      { t: 'table', k: 'pr_periodic', l: 'التقييم الدوري', rows: 3, cols: [{ k: 'date', l: 'تاريخ التقييم' }, { k: 'grade', l: 'درجة التقييم', t: 'number' }, { k: 'pct', l: 'نسبة التقييم', t: 'number' }, { k: 'days', l: 'المدة / أيام', t: 'number' }] },
      { t: 'grid', l: 'التقييم النهائي', fields: [{ k: 'pr_fdate', l: 'تاريخ التقييم' }, { k: 'pr_fgrade', l: 'درجة التقييم', t: 'number' }, { k: 'pr_fpct', l: 'نسبة التقييم', t: 'number' }, { k: 'pr_fdays', l: 'المدة / أيام', t: 'number' }] }
    ]},
    { id: 'p6', title: '6 – مخرجات برنامج الرعاية الخاصة', fields: [{ t: 'textarea', k: 'care', l: '' }] },
    { id: 'p7', title: '7 – مخرجات برنامج التسريع الأكاديمي', fields: [{ t: 'textarea', k: 'accel', l: '' }] }
  ]
}
];

function getRecord(id) { return RECORDS.find(r => r.id === id); }

/* ---------- خطة التطوير → قائمة المؤشرات ---------- */
const PLAN_BLOCKS = [
  { sec: 'أهداف الخطة', items: [['strategic', 'الاستراتيجية', 'spec'], ['phased', 'المرحلية', 'phase_field']] },
  { sec: 'البرامج التي تحقق الأهداف', items: [['skills', 'تنمية المهارات', 'skills_prog'], ['enrich', 'الإثراء المتخصص', 'enrich_cat'], ['projects', 'المشاريع الهادفة', 'project'], ['accel', 'التسريع', 'accel_stage'], ['reading', 'الاطلاع', null]] },
  { sec: 'متابعة التنفيذ', staff: [['f_guide', 'التوجيه والإرشاد'], ['f_spec', 'التوجيه التخصصي'], ['f_admin', 'الإداري'], ['f_tech', 'الفني']] }
];
function planIndicators(plan) {
  const out = [];
  PLAN_BLOCKS.forEach(bl => {
    (bl.items || []).forEach(([k, l, head]) => {
      (plan[k] || []).filter(r => r.item && r.item.trim()).forEach((r, i) =>
        out.push({ id: k + '_' + i, sec: bl.sec, group: l + (head && plan[head] ? ' — ' + plan[head] : ''), text: r.item, time: r.time || '' }));
    });
    (bl.staff || []).forEach(([k, l]) => {
      const s = plan[k] || {};
      if (s.name || s.task) out.push({ id: k, sec: bl.sec, group: l, text: [s.name, s.role].filter(Boolean).join(' — ') + (s.task ? ': ' + s.task : ''), time: '' });
    });
  });
  return out;
}

/* ---------- ملخص كل سجل (يُحفظ ويُعرض في التقارير) ---------- */
function summarizeRecord(def, d) {
  const filled = (arr) => (arr || []).filter(r => Object.values(r).some(v => String(v || '').trim())).length;
  if (def.id === 'status') {
    const parts = [];
    if ((d.nomination || []).length) parts.push('الترشيح: ' + d.nomination.join('، '));
    if ((d.think || []).length) parts.push('التفكير: ' + d.think.join('، '));
    if ((d.expr || []).length) parts.push('التعبير: ' + d.expr.join('، '));
    return { summary: parts.join(' | ') || 'تم توثيق الوضع الراهن', parts: [] };
  }
  if (def.id === 'basic') return { summary: 'ولي الأمر: ' + (d.p_name || '—') + (d.p_fmob ? ' · ' + d.p_fmob : ''), parts: [] };
  if (def.id === 'plan') {
    const n = ['strategic', 'phased', 'skills', 'enrich', 'projects', 'accel', 'reading'].map(k => filled(d[k]));
    return { summary: `أهداف استراتيجية ${n[0]}، مرحلية ${n[1]}، بنود برامج ${n[2] + n[3] + n[4] + n[5] + n[6]}${d.spec ? ' — التخصص: ' + d.spec : ''}`,
             parts: [{ id: 'goals', title: 'عدد مؤشرات الخطة', score: n.reduce((a, b) => a + b, 0), max: 0, level: 'mid', label: '' }] };
  }
  if (def.id === 'indicators') {
    const r = d.ratings || {}, vals = Object.values(r).map(Number).filter(Boolean);
    const sum = vals.reduce((a, b) => a + b, 0), max = vals.length * 5, pct = max ? Math.round(sum / max * 100) : 0;
    const mean = vals.length ? sum / vals.length : 0;
    const level = mean >= 4 ? 'high' : mean >= 3 ? 'mid' : 'low';
    const label = mean >= 4 ? 'إنجاز عالٍ' : mean >= 3 ? 'إنجاز متوسط' : 'إنجاز منخفض';
    return { summary: `المجموع الكلي ${sum} من ${max} — نسبة الإنجاز ${pct}% (${label})`,
             parts: [{ id: 'achv', title: 'نسبة الإنجاز', score: pct, max: 100, sum, n: vals.length, level, label }] };
  }
  if (def.id === 'progress') {
    const n = filled(d.sk_units) + filled(d.spec) + filled(d.pr_periodic) + filled(d.gen_interests) + filled(d.extra);
    return { summary: `${n} سطراً موثقاً${d.pr_title ? ' — البحث: ' + d.pr_title : ''}`, parts: [] };
  }
  return { summary: '', parts: [] };
}

if (typeof module !== 'undefined') module.exports = { RECORDS, getRecord, planIndicators, summarizeRecord };
