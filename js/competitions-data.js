/* =========================================================
   منصة الموهبة – بيانات المسابقات (المحتوى الثابت)
   ---------------------------------------------------------
   - كل مسابقة كائن واحد. لإضافة مسابقة جديدة: انسخ كائناً
     وغيّر المعرّف (id) والنصوص، وستظهر تلقائياً في صفحة
     المسابقات ولها صفحتها: competition.html?c=<id>
   - المواعيد الحالية وحالة التسجيل ومجلد المصادر والتدريب
     والنتائج وخطة الإعداد تأتي من جدول بيانات المنصة
     (Google Sheet) وتتقدّم على ما هنا.
   - التواريخ هنا بصيغة YYYY-MM-DD، والوقت اختياري في الحقل time
     (مثل '17:00') — كل المواعيد بتوقيت الرياض.
   - مصدر المعلومات: المواقع الرسمية للمسابقات وموهبة
     (راجع sources في كل مسابقة). آخر مراجعة: 21 أكتوبر 2026 (من المواقع الرسمية).
   ========================================================= */
window.TP_FIELDS = {
  math:        { ar:'الرياضيات',        en:'Mathematics',       c:'#7B4DFF' },
  informatics: { ar:'المعلوماتية',       en:'Informatics',       c:'#0EA5D6' },
  science:     { ar:'العلوم',            en:'Sciences',          c:'#0E9F76' },
  research:    { ar:'البحث والابتكار',   en:'Research & Innovation', c:'#E2386F' }
};
window.TP_STAGES = {
  primary:      { ar:'ابتدائي', en:'Primary' },
  intermediate: { ar:'متوسط',   en:'Intermediate' },
  secondary:    { ar:'ثانوي',   en:'Secondary' }
};

/* اختصار لروابط ملفات موقع كانجارو */
const KG = p => p ? 'https://www.kangarooksa.org/media/' + p : null;

window.TP_COMPETITIONS = [

/* ───────────────────────── كانجارو ───────────────────────── */
{
  id:'kangaroo', field:'math', color:'#7B4DFF', icon:'kangaroo',
  stages:['primary','intermediate','secondary'],
  name:{ ar:'مسابقة كانجارو موهبة للرياضيات', en:'Kangaroo Mawhiba Mathematics Competition' },
  short:{ ar:'كانجارو للرياضيات', en:'Kangaroo Math' },
  organizer:{ ar:'موهبة بالتعاون مع وزارة التعليم', en:'Mawhiba with the Ministry of Education' },
  summary:{
    ar:'من أبرز المسابقات الدولية في الرياضيات، تُقام في أكثر من 70 دولة، وتُنفَّذ عن بُعد بخمسة مستويات من الثالث الابتدائي حتى الثالث الثانوي.',
    en:'One of the leading international math competitions, held in 70+ countries and run remotely in five levels from Grade 3 to Grade 12.'
  },
  about:{
    ar:['بدأت فكرة مسابقة كانجارو في أستراليا عام 1980م، ثم تحوّلت إلى مسابقة عالمية تُنظَّم دولياً منذ عام 1991م تحت إشراف رابطة «كانجارو بلا حدود» ومقرها فرنسا، وتُقام اليوم في أكثر من 70 دولة.',
        'تنظمها في المملكة «موهبة» بالتعاون مع وزارة التعليم، وتسعى إلى تعزيز التفكير المنطقي والاستدلال الرياضي، وتطوير قدرة الطلبة على حل المسائل، وتطبيق المفاهيم الرياضية في مواقف حياتية متنوعة، واكتشاف الميول الرياضية ودعمها في بيئة تنافسية محفزة وممتعة.',
        'يُنفَّذ الاختبار عن بُعد عبر منصة إلكترونية، ويصل اسم المستخدم وكلمة المرور ودليل الاختبار إلى بريد الطالب قبل موعده.'],
    en:['The Kangaroo idea began in Australia in 1980 and has been organized internationally since 1991 by the "Kangourou Sans Frontières" association based in France; it is now held in 70+ countries.',
        'In Saudi Arabia it is organized by Mawhiba with the Ministry of Education, aiming to strengthen logical thinking and mathematical reasoning, develop problem solving, apply math to real-life situations and discover and support mathematical interests in a motivating, enjoyable competition.',
        'The test is taken remotely on an online platform; login details and the test guide are emailed to the student beforehand.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'التعليم العام داخل المملكة: الثالث الابتدائي – الثالث الثانوي',en:'General education in KSA: Grades 3–12'} },
    { k:{ar:'صيغة الاختبار',en:'Format'}, v:{ar:'عن بُعد – 24 سؤالاً (75 د) للصفين 3–4، و30 سؤالاً (90 د) لبقية المستويات',en:'Remote – 24 Q (75 min) for Gr. 3–4; 30 Q (90 min) for other levels'} },
    { k:{ar:'رسوم المشاركة',en:'Fee'}, v:{ar:'60 ريالاً (مساهمة ولي الأمر)',en:'SAR 60 (parent contribution)'} },
    { k:{ar:'الجهاز المطلوب',en:'Device'}, v:{ar:'حاسب مكتبي أو محمول (لا يُسمح بالجوال أو الجهاز اللوحي)',en:'Desktop or laptop (no phones/tablets)'} }
  ],
  tables:[
    { title:{ ar:'مستويات المسابقة', en:'Competition levels' },
      head:{ ar:['المستوى','عدد الأسئلة','المدة','جلسة الاختبار (دورة 2026)'], en:['Level','Questions','Duration','Test session (2026 cycle)'] },
      rows:[
        { ar:['الثالث والرابع الابتدائي','24','75 دقيقة','السبت 18 أبريل – 10:00–11:15 ص'], en:['Grades 3–4','24','75 min','Sat 18 Apr – 10:00–11:15'] },
        { ar:['الخامس والسادس الابتدائي','30','90 دقيقة','السبت 18 أبريل – 12:30–2:00 م'], en:['Grades 5–6','30','90 min','Sat 18 Apr – 12:30–14:00'] },
        { ar:['الأول والثاني المتوسط','30','90 دقيقة','الجمعة 17 أبريل – 1:00–2:30 م'], en:['Grades 7–8','30','90 min','Fri 17 Apr – 13:00–14:30'] },
        { ar:['الثالث المتوسط والأول الثانوي','30','90 دقيقة','الجمعة 17 أبريل – 3:00–4:30 م'], en:['Grades 9–10','30','90 min','Fri 17 Apr – 15:00–16:30'] },
        { ar:['الثاني والثالث الثانوي','30','90 دقيقة','الجمعة 17 أبريل – 5:00–6:30 م'], en:['Grades 11–12','30','90 min','Fri 17 Apr – 17:00–18:30'] }
      ] },
    { title:{ ar:'درجات القطع للميداليات 2026', en:'Medal cut-off scores 2026' },
      head:{ ar:['الصف','الذهبية','الفضية','البرونزية'], en:['Grade','Gold','Silver','Bronze'] },
      rows:[
        { ar:['الثالث الابتدائي','96','89','80'], en:['Grade 3','96','89','80'] },
        { ar:['الرابع الابتدائي','96','87','79'], en:['Grade 4','96','87','79'] },
        { ar:['الخامس الابتدائي','120','105','94'], en:['Grade 5','120','105','94'] },
        { ar:['السادس الابتدائي','120','106','93'], en:['Grade 6','120','106','93'] },
        { ar:['الأول المتوسط','107','99','92'], en:['Grade 7','107','99','92'] },
        { ar:['الثاني المتوسط','106','97','90'], en:['Grade 8','106','97','90'] },
        { ar:['الثالث المتوسط','116','109','104'], en:['Grade 9','116','109','104'] },
        { ar:['الأول الثانوي','117','113','108'], en:['Grade 10','117','113','108'] },
        { ar:['الثاني الثانوي','109','99','92'], en:['Grade 11','109','99','92'] },
        { ar:['الثالث الثانوي','110','92','75'], en:['Grade 12','110','92','75'] }
      ] }
  ],
  links:[
    { ar:'الموقع الرسمي للمسابقة', en:'Official website', url:'https://www.kangarooksa.org/', primary:true },
    { ar:'صفحة التسجيل', en:'Registration page', url:'https://www.kangarooksa.org/kangaroo-register/', register:true },
    { ar:'الجدول الزمني الرسمي', en:'Official timeline', url:'https://www.kangarooksa.org/about-competition/kangaroo-competition-2026-timeline/' },
    { ar:'نتائج المسابقة', en:'Results', url:'https://registration.mawhiba.sa/KangarooResult/#/' },
    { ar:'الأسئلة الشائعة', en:'FAQ', url:'https://www.kangarooksa.org/common-questions/' },
    { ar:'الدخول إلى حساب موهبة', en:'Mawhiba login', url:'https://login.mawhiba.sa' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة من طلبة التعليم العام داخل المملكة.',
        'أن يكون من الصف الثالث الابتدائي حتى الصف الثالث الثانوي.',
        'التسجيل خلال الفترة المعلنة، ويُغلق التسجيل عند اكتمال المقاعد.',
        'دفع مساهمة ولي الأمر (60 ريالاً) لإتمام التسجيل.',
        'صحة البريد الإلكتروني ورقم الجوال في حساب موهبة، لأن بيانات الدخول تُرسل عليهما.',
        'أداء الاختبار على حاسب مكتبي أو محمول؛ لا يُسمح بالجوال أو الجهاز اللوحي.',
        'أداء الاختبار في الجلسة المخصصة لصف الطالب وفي وقتها.'],
    en:['Students in general education inside Saudi Arabia.',
        'From Grade 3 to Grade 12.',
        'Register within the announced period; registration closes when seats are full.',
        'Pay the parent contribution (SAR 60) to complete registration.',
        'Correct email and mobile in the Mawhiba account, as login details are sent to them.',
        'Take the test on a desktop or laptop; phones and tablets are not allowed.',
        'Sit the test in the session assigned to the student’s grade, on time.']
  },
  register:{
    ar:['الدخول إلى موقع كانجارو موهبة بحساب الطالب في موهبة.',
        'التأكد من صحة البيانات الشخصية، وخاصة البريد الإلكتروني والجوال.',
        'التسجيل عبر نظام الخدمة في صفحة التسجيل.',
        'الموافقة على الشروط والأحكام.',
        'دفع مساهمة ولي الأمر 60 ريالاً (Apple Pay، مدى، ماستركارد، فيزا).',
        'أداء الاختبار التجريبي عند وصول الرسالة النصية، ثم أداء الاختبار الرسمي برابط البريد الإلكتروني في جلسة الصف.'],
    en:['Sign in to the Kangaroo Mawhiba website with the student’s Mawhiba account.',
        'Check personal details, especially email and mobile.',
        'Register through the service on the registration page.',
        'Accept the terms and conditions.',
        'Pay the SAR 60 parent contribution (Apple Pay, mada, Mastercard, Visa).',
        'Take the trial test when the SMS arrives, then the official test via the emailed link in the grade’s session.']
  },
  timeline:{
    label:{ ar:'مواعيد دورة 2026 — استرشادية؛ لم تُعلن مواعيد دورة 2027 على الموقع الرسمي حتى 21 أكتوبر 2026', en:'2026 cycle — indicative; the 2027 dates had not been announced on the official site as of 21 October 2026' },
    items:[
      { ar:'فترة التسجيل', en:'Registration period', date:'2026-02-02', end:'2026-04-07' },
      { ar:'الاختبار التجريبي', en:'Trial test', date:'2026-04-08', end:'2026-04-13', note:{ar:'يُشعَر المتقدمون برسالة نصية فور إتاحته',en:'Applicants are notified by SMS'} },
      { ar:'الاختبار الرسمي – المرحلتان المتوسطة والثانوية', en:'Official test – intermediate & secondary', date:'2026-04-17', time:'13:00',
        note:{ar:'1–2 متوسط: 1:00–2:30م · 3 متوسط و1 ثانوي: 3:00–4:30م · 2–3 ثانوي: 5:00–6:30م',en:'Gr 7–8: 13:00–14:30 · Gr 9–10: 15:00–16:30 · Gr 11–12: 17:00–18:30'} },
      { ar:'الاختبار الرسمي – المرحلة الابتدائية', en:'Official test – primary', date:'2026-04-18', time:'10:00',
        note:{ar:'3–4 ابتدائي: 10:00–11:15ص · 5–6 ابتدائي: 12:30–2:00م',en:'Gr 3–4: 10:00–11:15 · Gr 5–6: 12:30–14:00'} },
      { ar:'إعلان النتائج', en:'Results announced', date:'2026-04-28' },
      { ar:'تسليم الميداليات لإدارات الموهوبين لتسليمها للطلبة', en:'Medals delivered to gifted departments', date:'2026-05-28' }
    ]
  },
  resources:[
    { group:{ ar:'صفحات رسمية', en:'Official pages' }, items:[
      { ar:'صفحة نماذج الأسئلة الرسمية', en:'Official sample questions page', url:'https://www.kangarooksa.org/about-competition/question-models/', type:'link' },
      { ar:'درجات القطع', en:'Cut-off scores', url:'https://www.kangarooksa.org/about-competition/cuts-degrees/', type:'link' },
      { ar:'الطلاب الأوائل', en:'Top students', url:'https://www.kangarooksa.org/about-competition/top-students-results/', type:'link' },
      { ar:'إحصائيات المسجلين', en:'Registration statistics', url:'https://www.kangarooksa.org/about-competition/registered-statistics/', type:'link' }
    ] }
  ],
  /* نماذج الأعوام السابقة: لكل عام 5 مستويات × [الأسئلة، الإجابات، الحلول الكاملة] */
  papers:{
    title:{ ar:'نماذج الأسئلة والإجابات والحلول (2020–2025)', en:'Past papers, answer keys & full solutions (2020–2025)' },
    cols:[ {ar:'الأسئلة',en:'Questions'}, {ar:'الإجابات',en:'Answer key'}, {ar:'الحلول الكاملة',en:'Full solutions'} ],
    levels:[ {ar:'الثالث والرابع الابتدائي',en:'Grades 3–4'}, {ar:'الخامس والسادس الابتدائي',en:'Grades 5–6'}, {ar:'الأول والثاني المتوسط',en:'Grades 7–8'}, {ar:'الثالث المتوسط والأول الثانوي',en:'Grades 9–10'}, {ar:'الثاني والثالث الثانوي',en:'Grades 11–12'} ],
    years:{
      '2025':[ [KG('crbjmqix/kangaroo-2025-3-4-pre-ecolier.pdf'),KG('f0fgf0sv/3-4-answer-key-2025.pdf'),null],
               [KG('3n4fjpmy/kangaroo-2025-5-6-benjamin.pdf'),KG('cd2kzisa/5-6-answer-key-2025.pdf'),null],
               [KG('dlgow5sb/kangaroo-2025-7-8-cadet.pdf'),KG('ruwlnh01/7-8-answer-key-2025.pdf'),null],
               [KG('b1uasq0o/kangaroo-2025-9-10-junior.pdf'),KG('c0dpsyah/9-10-answer-key-2025.pdf'),null],
               [KG('cj5lzv2s/kangaroo-2025-11-12-student.pdf'),KG('sxmpwofy/11-12-answer-key-2025.pdf'),null] ],
      '2024':[ [KG('inkbchfa/book-3plus4-2024.pdf'),KG('dryowamh/3-4-answer-key-2024.pdf'),KG('ihub13fz/_الحلول-الكاملة-لكانجارو-3-4-2024.pdf')],
               [KG('hmoh3a1k/book5-6-2024.pdf'),KG('zbzjbatz/5-6-answer-key-2024.pdf'),KG('cenbqs3d/_الحلول-الكاملة-لكانجارو-5-6-2024.pdf')],
               [KG('zqhhgtgi/book-7-8-2024.pdf'),KG('ly3p1qpx/7-8-answer-key-2024.pdf'),KG('rtupjdqe/_الحلول-الكاملة-لكانجارو-7-8-2024.pdf')],
               [KG('zypmu4r0/book-9plus10-2024.pdf'),KG('pjidt4gk/9-10-answer-key-2024.pdf'),KG('smohmbru/_الحلول-الكاملة-لكانجارو-9-10-2024.pdf')],
               [KG('fgnhw4l5/book-11-12-1-2024.pdf'),KG('0kscogj5/11-12-answer-key-2024.pdf'),KG('etlhtmpe/_الحلول-الكاملة-لكانجارو-11-12-2024.pdf')] ],
      '2023':[ [KG('14jpuq3n/ecolier-3-4-2023.pdf'),KG('klognopz/34answerkey2023.pdf'),KG('ernhrays/_الحلول-الكاملة-لكانجارو-3-4-2023.pdf')],
               [KG('jm0iy5gd/kangaroomath562023.pdf'),KG('d3cbgmls/56answerkey2023.pdf'),KG('jrlfag5l/_لحلول-الكاملة-لكانجارو-5-6-2023.pdf')],
               [KG('omzbz4t5/kangaroomath782023.pdf'),KG('d11bhjns/78answerkey2023.pdf'),KG('vu1jdls2/_لحلول-الكاملة-لكانجارو-7-8-2023.pdf')],
               [KG('o0xbsgfx/kangaroomath2023910.pdf'),KG('iw0nwj01/answerkey2023910kangaroo.pdf'),KG('kgnj0sos/_لحلول-الكاملة-لكانجارو-9-10-2023.pdf')],
               [KG('wphkdkff/kangaroomath20231112.pdf'),KG('b5iky4nv/answerkey2023kangaroo1112.pdf'),KG('exkfdhdg/_لحلول-الكاملة-لكانجارو-11-12-2023.pdf')] ],
      '2022':[ [KG('yv2b3e12/kangaroo2022_3_4_questions.pdf'),KG('tr5bvaiy/kangaroo2022_3_4_answers.pdf'),KG('wzbgsy03/_الحلول-الكاملة-لكانجارو-3-4-2022.pdf')],
               [KG('cajhppn2/kangaroo2022_5_6_questions.pdf'),KG('5edes1gj/kangaroo2022_5_6_answers.pdf'),KG('aozlsgo4/_الحلول-الكاملة-لكانجارو-5-6-2022.pdf')],
               [KG('tsfmv1ax/kangaroo2022_7_8_questions.pdf'),KG('zb3jwwtn/kangaroo2022_7_8_answers.pdf'),KG('5p0bukq4/_الحلول-الكاملة-لكانجارو-7-8-2022.pdf')],
               [KG('o2bokuex/9-10kangaro2023jan30.pdf'),KG('td1fckds/kangaroo2022_9_10_answers.pdf'),KG('gnsdoxbh/_الحلول-الكاملة-لكانجارو-9-10-2022.pdf')],
               [KG('wjdjiaoy/kangaroo2022_11_12_questions.pdf'),KG('1jiflbjd/kangaroo2022_11_12_answers.pdf'),KG('p0hi0zg3/_الحلول-الكاملة-لكانجارو11-12-2022.pdf')] ],
      '2021':[ [KG('mj2m53f1/3-4-2.pdf'),KG('pvpi0k2a/3-4-3.pdf'),KG('qqent1ft/_الحلول-الكاملة-لكانجارو-3-4-2021.pdf')],
               [KG('qidgnohx/5-6-2.pdf'),KG('xo4p5t54/5-6-3.pdf'),KG('s0nfge5h/_الحلول-الكاملة-لكانجارو-5-6-2021.pdf')],
               [KG('325bu1ip/7-8.pdf'),KG('er0nuxvr/7-8-1.pdf'),KG('taxdwoks/_الحلول-الكاملة-لكانجارو-7-8-2021.pdf')],
               [KG('5ijadvoi/9-10-2.pdf'),KG('wewdnr1n/9-10-3.pdf'),KG('4iia4fyk/_الحلول-الكاملة-لكانجارو-9-10-2021.pdf')],
               [KG('3rbec2sy/11-12-2.pdf'),KG('ajoo2y2o/11-12-3.pdf'),KG('rq4bqot3/_الحلول-الكاملة-لكانجارو-11-12-2021.pdf')] ],
      '2020':[ [KG('zdfmrc4u/3-4.pdf'),KG('3ypglg41/3-4-1.pdf'),KG('yuaenlcz/_الحلول-الكاملة-لكانجارو-3-4-2020.pdf')],
               [KG('aagd402t/5-6.pdf'),KG('k2oni4xo/5-6-1.pdf'),KG('go2jl23m/_الحلول-الكاملة-لكانجارو-5-6-2020.pdf')],
               [KG('ri5hznyv/78cadetbookfinal.pdf'),KG('wrwf0neq/kangaroomawhiba78.pdf'),KG('lrxkgrnj/_الحلول-الكاملة-لكانجارو-7-8-2020.pdf')],
               [KG('ckzf4chx/9-10.pdf'),KG('1mppcvt2/9-10-1.pdf'),KG('150nvobl/_الحلول-الكاملة-لكانجارو-9-10-2020.pdf')],
               [KG('3dxj4pt4/11-12.pdf'),KG('qwnp11tp/11-12-1.pdf'),KG('3y5hqazw/_الحلول-الكاملة-لكانجارو-11-12-2020.pdf')] ]
    }
  },
  training:{
    ar:['حل نموذج من أسئلة الأعوام السابقة أسبوعياً حسب مستوى الطالب، ومناقشة الحلول الكاملة جماعياً.',
        'حلقات قصيرة لاستراتيجيات حل المسائل: الرسم، والبحث عن نمط، والحالات الخاصة، والاستبعاد.',
        'تدريب على إدارة الوقت: 24 سؤالاً في 75 دقيقة للصفين 3–4، و30 سؤالاً في 90 دقيقة لبقية المستويات.',
        'اختبار محاكاة كامل على حاسب قبل الموعد الرسمي بأسبوعين، ثم أداء الاختبار التجريبي الرسمي.'],
    en:['Solve one past paper weekly at the student’s level and discuss the full solutions as a group.',
        'Short sessions on problem-solving strategies: drawing, finding patterns, special cases, elimination.',
        'Time management: 24 questions in 75 minutes (Gr. 3–4), 30 questions in 90 minutes (other levels).',
        'A full mock test on a computer two weeks before the official date, then the official trial test.']
  },
  sources:['https://www.kangarooksa.org/','https://www.kangarooksa.org/about-competition/about-the-competition/','https://www.kangarooksa.org/about-competition/kangaroo-competition-2026-timeline/','https://www.kangarooksa.org/kangaroo-register/','https://www.kangarooksa.org/about-competition/cuts-degrees/','https://www.kangarooksa.org/about-competition/question-models/']
},

/* ───────────────────────── بيبراس ───────────────────────── */
{
  id:'bebras', field:'informatics', color:'#0EA5D6', icon:'beaver',
  stages:['primary','intermediate','secondary'],
  name:{ ar:'مسابقة بيبراس موهبة للمعلوماتية', en:'Bebras Mawhiba Informatics Competition' },
  short:{ ar:'بيبراس للمعلوماتية', en:'Bebras Informatics' },
  organizer:{ ar:'موهبة بالشراكة مع وزارة التعليم', en:'Mawhiba in partnership with the Ministry of Education' },
  summary:{
    ar:'مسابقة دولية في الفكر المعلوماتي والمنطق والتفكير الحاسوبي، بمسائل قصيرة تُحل خطوة بخطوة دون خبرة برمجية سابقة. الاختبار الرسمي عن بُعد في 5 ديسمبر 2026.',
    en:'An international competition in informatics, logic and computational thinking, with short step-by-step tasks needing no prior coding. Official remote test on 5 December 2026.'
  },
  about:{
    ar:['بيبراس مسابقة دولية تُعنى بالفكر المعلوماتي والمنطق والتفكير الحاسوبي لدى طلبة المدارس، انطلقت عالمياً من ليتوانيا عام 2004، وتقدّم مسائل قصيرة يمكن حلها خطوة بخطوة.',
        'تنظمها موهبة بالشراكة مع وزارة التعليم، وبدأت مشاركة المملكة تجريبياً عام 2019، وتهدف إلى توسيع الشغف بعلوم الحاسب وبناء جيل أكثر قدرة على التفكير المنطقي والمنهجي. وفي نسخة 2025 سجّل 70,046 طالباً وطالبة من 10,777 مدرسة، وفاز 2,504 بميداليات (371 ذهبية، 737 فضية، 1,396 برونزية).',
        'المهارات التي تقيسها: التفكيك، واكتشاف الأنماط، والتجريد، والتفكير الخوارزمي، والاستدلال، والتقييم، والتعميم.'],
    en:['Bebras is an international competition in informatics, logic and computational thinking for school students. It started in Lithuania in 2004 and offers short tasks solvable step by step.',
        'Organized by Mawhiba with the Ministry of Education, with Saudi participation piloted in 2019, it aims to grow passion for computer science and build logical, methodical thinkers. In 2025, 70,046 students from 10,777 schools registered and 2,504 won medals (371 gold, 737 silver, 1,396 bronze).',
        'Skills measured: decomposition, pattern recognition, abstraction, algorithmic thinking, reasoning, evaluation and generalization.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'التعليم العام داخل المملكة: الثالث الابتدائي – الثالث الثانوي',en:'General education in KSA: Grades 3–12'} },
    { k:{ar:'الاختبار الرسمي',en:'Official test'}, v:{ar:'عن بُعد – 60 دقيقة – السبت 5 ديسمبر 2026 الساعة 2:00 م',en:'Remote – 60 min – Sat 5 Dec 2026, 2:00 pm'} },
    { k:{ar:'رسوم المشاركة',en:'Fee'}, v:{ar:'60 ريالاً (مساهمة ولي الأمر)',en:'SAR 60 (parent contribution)'} },
    { k:{ar:'المحاولات',en:'Attempts'}, v:{ar:'محاولة واحدة فقط، ولا رجوع بعد التسليم',en:'One attempt only; no return after submission'} }
  ],
  links:[
    { ar:'الموقع الرسمي لبيبراس موهبة', en:'Bebras Mawhiba website', url:'https://www.bebrasksa.org/', primary:true },
    { ar:'رابط التسجيل المباشر', en:'Direct registration', url:'https://registration.mawhiba.sa/bebras/', register:true },
    { ar:'صفحة التسجيل وتعليماته', en:'Registration info page', url:'https://www.bebrasksa.org/bebras-register/' },
    { ar:'الجدول الزمني الرسمي', en:'Official timeline', url:'https://www.bebrasksa.org/about-competition/bebras-competition-2026-timeline/' },
    { ar:'نتائج المسابقة', en:'Results', url:'https://registration.mawhiba.sa/ExamResults/#/ExamResult/bebrasresult' },
    { ar:'منصة «تسابق» للتحدي', en:'"Race" challenge platform', url:'https://www.bebrasksa.org/race/' },
    { ar:'الأسئلة الشائعة', en:'FAQ', url:'https://www.bebrasksa.org/common-questions/' },
    { ar:'استعادة حساب موهبة (برقم الهوية)', en:'Recover Mawhiba account (by ID)', url:'https://login.mawhiba.sa/#/login' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة من طلبة التعليم العام داخل المملكة، من الصف الثالث الابتدائي حتى الصف الثالث الثانوي.',
        'التسجيل خلال الفترة المعلنة عبر الرابط الرسمي، ودفع مساهمة ولي الأمر (60 ريالاً).',
        'محاولة واحدة فقط للاختبار.',
        'لا يمكن العودة إلى الاختبار بعد تسليمه، حتى لو لم يكتمل.',
        'حل المسائل باستقلالية، والتأكد من الإجابات قبل الضغط على «تسليم».',
        'الدرجة التي تظهر بعد التسليم ليست إعلاناً نهائياً للميدالية؛ النتائج تُعلن بعد المعالجة والاعتماد.'],
    en:['Students in general education inside Saudi Arabia, from Grade 3 to Grade 12.',
        'Register within the announced period via the official link and pay the SAR 60 parent contribution.',
        'One attempt only.',
        'No return to the test after submitting, even if incomplete.',
        'Solve independently and check answers before pressing "Submit".',
        'The score shown after submission is not the final medal announcement; results are published after processing and approval.']
  },
  register:{
    ar:['الدخول إلى موقع بيبراس موهبة بحساب الطالب في موهبة (يمكن استعادة الحساب برقم الهوية).',
        'التأكد من صحة بيانات الملف الشخصي.',
        'التسجيل عبر نظام الخدمة: registration.mawhiba.sa/bebras',
        'الموافقة على الشروط والأحكام.',
        'دفع مساهمة ولي الأمر 60 ريالاً (Apple Pay، مدى، ماستركارد، فيزا) — تكتمل الخدمة فوراً.',
        'تجربة الاختبار التجريبي ومراجعة التعليمات، ثم أداء الاختبار الرسمي عن بُعد في موعده.'],
    en:['Sign in to the Bebras Mawhiba website with the student’s Mawhiba account (recoverable by national ID).',
        'Check the profile details.',
        'Register through the service: registration.mawhiba.sa/bebras',
        'Accept the terms and conditions.',
        'Pay the SAR 60 parent contribution (Apple Pay, mada, Mastercard, Visa) — completed instantly.',
        'Try the practice test and read the instructions, then take the official remote test on time.']
  },
  timeline:{
    label:{ ar:'دورة 2026–2027 — من الجدول الزمني الرسمي', en:'2026–2027 cycle — from the official timeline' },
    items:[
      { ar:'فترة التسجيل ورفع بيانات الطلبة', en:'Registration & student data upload', date:'2026-10-06', end:'2026-11-22',
        note:{ ar:'صفحة التسجيل في الموقع تذكر 26 نوفمبر — اعتمدنا الجدول الزمني الرسمي، والأحوط التسجيل مبكراً', en:'The registration page mentions 26 Nov — we follow the official timeline; register early to be safe' } },
      { ar:'الاختبار التجريبي واستكمال الاستعداد', en:'Practice test & readiness', date:'2026-10-06', end:'2026-11-29' },
      { ar:'الاختبار الرسمي عن بُعد (60 دقيقة)', en:'Official remote test (60 min)', date:'2026-12-05', time:'14:00' },
      { ar:'إعلان النتائج والميداليات', en:'Results & medals announced', date:'2027-01-05' },
      { ar:'تسليم الميداليات لإدارات الموهوبين لتسليمها للطلبة', en:'Medals delivered via education directorates', date:'2027-02-05' }
    ]
  },
  resources:[
    { group:{ ar:'مكتبة بيبراس والأدلة', en:'Bebras library & guides' }, items:[
      { ar:'مكتبة بيبراس التفاعلية', en:'Interactive Bebras library', url:'https://www.bebrasksa.org/about-competition/bebras-library/', type:'link' },
      { ar:'كتاب نشاط «التفكير الحاسوبي» قائم على مهام بيبراس (PDF)', en:'"Computational Thinking" activity book based on Bebras tasks (PDF)', url:'https://www.bebrasksa.org/media/ls2jih4k/_كتاب-نشاط-قائم-على-مهام-بيبراس-1.pdf', type:'pdf' },
      { ar:'درجات القطع', en:'Cut-off scores', url:'https://www.bebrasksa.org/about-competition/cut-grades/', type:'link' },
      { ar:'الطلاب الأوائل', en:'Top students', url:'https://www.bebrasksa.org/about-competition/top-students-results/', type:'link' }
    ] },
    { group:{ ar:'النماذج العربية السابقة (تفاعلية)', en:'Past Arabic tests (interactive)' }, items:[
      { ar:'نموذج 2024', en:'2024 test', url:'https://arabic.bebrasksa.org/index.php?team=2024atrain', type:'link' },
      { ar:'نموذج 2023', en:'2023 test', url:'https://arabic.bebrasksa.org/index.php?team=2023atrain', type:'link' },
      { ar:'نموذج 2022', en:'2022 test', url:'http://arabic.bebrasksa.org/index.php?team=2022atrain', type:'link' },
      { ar:'نموذج 2021', en:'2021 test', url:'http://arabic.bebrasksa.org/index.php?team=2021atrain', type:'link' },
      { ar:'نموذج 2020', en:'2020 test', url:'https://saudi-arabia-ar.castor-informatique.fr/index.php?team=2020atrain', type:'link' },
      { ar:'نموذج 2019', en:'2019 test', url:'https://saudi-arabia-ar.castor-informatique.fr/index.php?team=2019atrain', type:'link' },
      { ar:'نموذج 2018', en:'2018 test', url:'http://saudi-ar.castor-informatique.fr/index.php?team=2018atrain', type:'link' },
      { ar:'نموذج 2017', en:'2017 test', url:'http://saudi-ar.castor-informatique.fr/index.php?team=2017atrain', type:'link' },
      { ar:'نموذج 2016', en:'2016 test', url:'http://saudi-ar.castor-informatique.fr/index.php?team=2016atrain', type:'link' },
      { ar:'نموذج 2015', en:'2015 test', url:'http://saudi-ar.castor-informatique.fr/index.php?team=2015atrain', type:'link' }
    ] },
    { group:{ ar:'فيديوهات وأنشطة', en:'Videos & activities' }, items:[
      { ar:'قصة مسابقة بيبراس', en:'The Bebras story', url:'https://youtu.be/hxcQTE51bao', type:'video' },
      { ar:'أنشطة على مسابقة بيبراس 1', en:'Bebras activities 1', url:'https://youtu.be/TW7QEioaY60', type:'video' },
      { ar:'أنشطة على مسابقة بيبراس 2', en:'Bebras activities 2', url:'https://youtu.be/WG3DDTV0gB0', type:'video' },
      { ar:'أنشطة على مسابقة بيبراس 3', en:'Bebras activities 3', url:'https://youtu.be/cQrTcrufpqM', type:'video' }
    ] }
  ],
  training:{
    ar:['حل النماذج العربية السابقة التفاعلية (2015–2024) في مكتبة بيبراس، نموذجاً كل أسبوع.',
        'أنشطة من كتاب «التفكير الحاسوبي» القائم على مهام بيبراس في حصص النشاط.',
        'تدريب على المهارات السبع: التفكيك، والأنماط، والتجريد، والخوارزميات، والاستدلال، والتقييم، والتعميم.',
        'محاكاة اختبار كامل مدته 60 دقيقة، والتدرّب على مراجعة الإجابات قبل «التسليم» لأن المحاولة واحدة.',
        'التأكد من أداء كل طالب للاختبار التجريبي قبل 29 نوفمبر.'],
    en:['Solve the interactive past Arabic tests (2015–2024) in the Bebras library, one per week.',
        'Activities from the "Computational Thinking" Bebras activity book during activity periods.',
        'Practise the seven skills: decomposition, patterns, abstraction, algorithms, reasoning, evaluation, generalization.',
        'A full 60-minute mock test, practising answer review before "Submit" since there is only one attempt.',
        'Make sure every student takes the practice test before 29 November.']
  },
  sources:['https://www.bebrasksa.org/','https://www.bebrasksa.org/about-competition/bebras-competition-2026-timeline/','https://www.bebrasksa.org/bebras-register/','https://www.bebrasksa.org/about-competition/bebras-library/']
},

/* ───────────── أولمبياد الموهبة الوطني – نسمو ───────────── */
{
  id:'nsmo', field:'science', color:'#0E9F76', icon:'atom',
  stages:['intermediate','secondary'],
  name:{ ar:'أولمبياد الموهبة الوطني — المسار العلمي «نسمو»', en:'National Gifted Olympiad — Scientific Track (NSMO)' },
  short:{ ar:'نسمو – المسار العلمي', en:'NSMO – Scientific track' },
  organizer:{ ar:'وزارة التعليم وموهبة', en:'Ministry of Education & Mawhiba' },
  summary:{
    ar:'المسار العلمي في أولمبياد الموهبة الوطني لاكتشاف الموهوبين في الرياضيات والعلوم والمعلوماتية، والطريق إلى المنتخبات الوطنية والأولمبيادات الدولية.',
    en:'The scientific track of the National Gifted Olympiad, identifying talent in mathematics, sciences and informatics — the path to national teams and international olympiads.'
  },
  about:{
    ar:['أطلقت وزارة التعليم وموهبة في أغسطس 2026 النسخة الأولى من «أولمبياد الموهبة الوطني» بدمج مسابقتي «نسمو» و«إبداع» في مسارين: علمي وبحثي، ويمكن للطالب المشاركة في أحدهما أو كليهما.',
        'يستهدف المسار العلمي «نسمو» طلاب المرحلة المتوسطة والصف الأول الثانوي في ستة مجالات: الرياضيات، والعلوم، والفيزياء، والكيمياء، والأحياء، والمعلوماتية. ويتأهل المتميزون إلى برنامج موهبة للأولمبيادات الدولية لتمثيل المملكة في أكثر من 29 أولمبياداً ومسابقة علمية إقليمية ودولية.'],
    en:['In August 2026 the Ministry of Education and Mawhiba launched the first National Gifted Olympiad, merging NSMO and Ibdaa into two tracks — scientific and research. Students may join either or both.',
        'The scientific track (NSMO) targets intermediate students and Grade 10 in six fields: mathematics, science, physics, chemistry, biology and informatics. Top students join Mawhiba’s International Olympiad Program to represent the Kingdom in 29+ regional and international olympiads.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'الأول المتوسط حتى الأول الثانوي',en:'Grades 7–10'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'فردية بترشيح من المدرسة',en:'Individual, nominated by school'} },
    { k:{ar:'الرسوم',en:'Fee'}, v:{ar:'مجانية',en:'Free'} },
    { k:{ar:'النهائيات',en:'Finals'}, v:{ar:'الرياض – أواخر يناير 2027',en:'Riyadh – late January 2027'} }
  ],
  tables:[{
    title:{ ar:'التخصصات حسب الصف', en:'Fields by grade' },
    head:{ ar:['الصف','التخصصات'], en:['Grade','Fields'] },
    rows:[
      { ar:['الأول والثاني المتوسط','الرياضيات (ناشئين)، المعلوماتية (ناشئين)، العلوم'], en:['Grades 7–8','Mathematics (junior), Informatics (junior), Science'] },
      { ar:['الثالث المتوسط والأول الثانوي','الرياضيات (كبار)، المعلوماتية (كبار)، الفيزياء، الكيمياء، الأحياء'], en:['Grades 9–10','Mathematics (senior), Informatics (senior), Physics, Chemistry, Biology'] }
    ]
  }],
  links:[
    { ar:'صفحة أولمبياد الموهبة الوطني', en:'National Gifted Olympiad page', url:'https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/', primary:true },
    { ar:'رابط التسجيل (موهبة)', en:'Registration (Mawhiba)', url:'https://s.mawhiba.sa/NGO', register:true },
    { ar:'حقائب المعلوماتية', en:'Informatics booklets', url:'https://nsmobooklets.mawhiba.sa/en/learn/' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة سعودي الجنسية.',
        'أن يكون في التعليم العام (حكومي أو أهلي أو عالمي).',
        'أن يكون من الصف الأول المتوسط حتى الصف الأول الثانوي.',
        'التسجيل عن طريق منسق الموهوبين في المدرسة فقط؛ لا يوجد تسجيل فردي مباشر في المسار العلمي.',
        'المشاركة مجانية.'],
    en:['Saudi nationality.',
        'Enrolled in general education (public, private or international).',
        'From Grade 7 to Grade 10.',
        'Registration only through the school’s gifted coordinator — no direct individual registration in this track.',
        'Participation is free.']
  },
  register:{
    ar:['يرشّح منسق الموهوبين بالمدرسة الطلاب حسب الصف والتخصص المستهدف.',
        'تسجّل المدرسة الطلاب المرشحين في نظام موهبة (إن لم يكونوا مسجلين).',
        'يتابع الطالب حسابه في موهبة لمعرفة مواعيد الاختبارات وروابطها.',
        'يؤدي الطالب اختبارات المرحلة الأولى في موعد تخصصه.'],
    en:['The school’s gifted coordinator nominates students by grade and target field.',
        'The school registers nominated students in the Mawhiba system (if not already registered).',
        'The student follows their Mawhiba account for test dates and links.',
        'The student sits Phase One tests on their field’s date.']
  },
  timeline:{
    label:{ ar:'النسخة الأولى 2026–2027', en:'First edition 2026–2027' },
    items:[
      { ar:'التسجيل والترشيح عبر المدارس', en:'Registration & school nomination', date:'2026-08-20', end:'2026-09-30' },
      { ar:'اختبارات المرحلة الأولى عن بُعد', en:'Phase One remote tests', date:'2026-10-18', time:'18:30', end:'2026-10-22',
        note:{ ar:'6:30–8:30 مساءً: الفيزياء والعلوم (الأحد 18)، الأحياء (الاثنين 19)، الكيمياء (الثلاثاء 20)، الرياضيات 1 و2 (الأربعاء 21)، المعلوماتية 1 و2 (الخميس 22)', en:'6:30–8:30 pm: Physics & Science (Sun 18), Biology (Mon 19), Chemistry (Tue 20), Math 1 & 2 (Wed 21), Informatics 1 & 2 (Thu 22)' } },
      { ar:'تقييم المنتخبات الوطنية', en:'National teams assessment', when:{ar:'بعد المرحلة الأولى',en:'After Phase One'} },
      { ar:'التدريب والتقييمات المركزية', en:'Training & central assessments', when:{ar:'خلال الأشهر التالية',en:'Following months'} },
      { ar:'النهائيات في الرياض', en:'Finals in Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} }
    ]
  },
  resources:[
    { ar:'حقائب المرحلة الأولى (الأحياء، الكيمياء، الفيزياء، العلوم، الرياضيات) – صفحة الأولمبياد', en:'Phase One study packages (Biology, Chemistry, Physics, Science, Math) – Olympiad page', url:'https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/', type:'link' },
    { ar:'حقائب المعلوماتية', en:'Informatics booklets', url:'https://nsmobooklets.mawhiba.sa/en/learn/', type:'link' }
  ],
  training:{
    ar:['حصص تدريب أسبوعية لكل تخصص بإشراف معلمي المواد.',
        'إنهاء حقائب المرحلة الأولى الرسمية وحل تمارينها.',
        'اختبارات محاكاة قصيرة بنفس مدة الاختبار (ساعتان).',
        'متابعة الطلاب المتأهلين في التدريب المركزي الذي تنظمه موهبة.'],
    en:['Weekly training per field, led by subject teachers.',
        'Complete the official Phase One packages and their exercises.',
        'Short mock tests with the same duration (two hours).',
        'Follow up qualified students during Mawhiba’s central training.']
  },
  sources:['https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/','https://www.mawhiba.sa/media-centre/events/phase-one-tests-for-the-scientific-track-national-science-mathematics-olympiad-nsmo/','https://sabq.org/article/gjyd9nl']
},

/* ───────────── أولمبياد الموهبة الوطني – إبداع ───────────── */
{
  id:'ibdaa', field:'research', color:'#E2386F', icon:'flask',
  stages:['intermediate','secondary'],
  name:{ ar:'أولمبياد الموهبة الوطني — المسار البحثي «إبداع»', en:'National Gifted Olympiad — Research Track (Ibdaa)' },
  short:{ ar:'إبداع – المسار البحثي', en:'Ibdaa – Research track' },
  organizer:{ ar:'وزارة التعليم وموهبة', en:'Ministry of Education & Mawhiba' },
  summary:{
    ar:'مسابقة سنوية لمشاريع البحث العلمي والابتكار الفردية في 22 مجالاً، تُحكَّم إلكترونياً ثم في معارض مركزية، والطريق إلى تمثيل المملكة في ISEF.',
    en:'An annual competition for individual research and innovation projects in 22 fields, judged online then at central fairs — the path to representing the Kingdom at ISEF.'
  },
  about:{
    ar:['أولمبياد الموهبة الوطني منظومة وطنية متكاملة تجمع بين مسارين، والمسار البحثي «إبداع» يركّز على تنمية مهارات البحث والابتكار عبر مشاريع علمية فردية في 22 مجالاً، ويُعدّ الطلاب للمشاركة في معرض ريجينيرون الدولي للعلوم والهندسة ISEF.',
        'تُحكَّم المشاريع إلكترونياً ومباشرةً من أكاديميين ومتخصصين وفق معايير علمية، ويعتمد التحكيم الإلكتروني على ملخص المشروع وخطته. المشاركة مجانية، وتُقدَّم جوائز مادية أو عينية تُعلن في الأولمبياد، وشهادات مشاركة لكل من يصل إلى المرحلة النهائية، والمعرض مفتوح للزوار.'],
    en:['The National Gifted Olympiad is an integrated national system of two tracks; the Ibdaa research track develops research and innovation skills through individual science projects in 22 fields and prepares students for Regeneron ISEF.',
        'Projects are judged online and in person by academics and specialists using scientific criteria; online judging relies on the project abstract and plan. Participation is free; cash or in-kind prizes are announced at the olympiad, all finalists receive certificates, and the fair is open to visitors.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'طلاب التعليم العام في المتوسطة والثانوية (11–20 عاماً)',en:'Intermediate & secondary students in general education (ages 11–20)'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'مشروع فردي واحد',en:'One individual project'} },
    { k:{ar:'الرسوم',en:'Fee'}, v:{ar:'مجانية',en:'Free'} },
    { k:{ar:'المجالات',en:'Fields'}, v:{ar:'22 مجالاً علمياً',en:'22 scientific fields'} }
  ],
  tables:[{
    title:{ ar:'المجالات البحثية الـ22', en:'The 22 research fields' },
    head:{ ar:['#','المجال'], en:['#','Field'] },
    rows:[
      ['علوم الحيوان','Animal Sciences'],['العلوم السلوكية والاجتماعية','Behavioral & Social Sciences'],['الكيمياء الحيوية','Biochemistry'],
      ['العلوم الطبية الحيوية والصحية','Biomedical & Health Sciences'],['الهندسة الطبية الحيوية','Biomedical Engineering'],['الأحياء الخلوية والجزيئية','Cellular & Molecular Biology'],
      ['الكيمياء','Chemistry'],['الأحياء الحاسوبية والمعلوماتية الحيوية','Computational Biology & Bioinformatics'],['علوم الأرض والبيئة','Earth & Environmental Sciences'],
      ['الأنظمة المدمجة','Embedded Systems'],['الطاقة','Energy'],['التقنية الهندسية: السكون والحركة','Engineering Technology: Statics & Dynamics'],
      ['الهندسة البيئية','Environmental Engineering'],['علوم المواد','Materials Science'],['الرياضيات','Mathematics'],
      ['الأحياء الدقيقة','Microbiology'],['الفيزياء والفلك','Physics & Astronomy'],['علوم النبات','Plant Sciences'],
      ['الروبوتات والآلات الذكية','Robotics & Intelligent Machines'],['تصميم وتطوير البرمجيات','Software Design & Development'],['التمكين التقني في الفنون الإبداعية','Technological Empowerment in Creative Arts'],
      ['العلوم الطبية الانتقالية','Translational Medical Science']
    ].map((f, i) => ({ ar:[String(i + 1), f[0]], en:[String(i + 1), f[1]] }))
  }],
  links:[
    { ar:'صفحة المسار البحثي «إبداع»', en:'Ibdaa research track page', url:'https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/?tab=%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%B1%20%D8%A7%D9%84%D8%A8%D8%AD%D8%AB%D9%8A%20(%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9)', primary:true },
    { ar:'خدمة التسجيل في المسار البحثي', en:'Research track registration service', url:'https://www.mawhiba.sa/services/%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%85%D8%A8%D9%8A%D8%A7%D8%AF-%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A-%D9%84%D9%84%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9-%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A-%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9-%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84-%D9%85%D9%88%D9%87%D8%A8%D8%A9/', register:true },
    { ar:'المكتبة الرقمية للمسار (للمسجلين)', en:'Track digital library (registered students)', url:'https://registration.mawhiba.org/DigitalLibrary/#/digitallibrary' },
    { ar:'التسجيل في التحكيم التطوعي', en:'Voluntary judging registration', url:'https://www.mawhiba.sa/services/voluntary-arbitration-ibdaa/' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة من طلاب التعليم العام في المرحلة المتوسطة أو الثانوية، وعمره بين 11 و20 عاماً؛ ولا يحق لمن أتم المرحلة الثانوية وبلغ 20 عاماً المشاركة.',
        'مشروع فردي واحد لكل طالب؛ لا تُقبل المشاريع الجماعية، وتكرار المشروع بين طالبين يستبعدهما معاً.',
        'استكمال التسجيل كاملاً في وقته: البيانات الشخصية، وبيانات المشروع، والنماذج، والبيانات البنكية، ثم حضور المقابلات الإلكترونية والمعارض.',
        'اكتمال ملخص المشروع لأن التحكيم الإلكتروني يعتمد عليه، وتطابق العنوان مع الملخص.',
        'أن يقع المشروع ضمن المجال المختار، ولا يجوز تغيير المجال بعد التحكيم.',
        'أصالة العمل؛ يُسمح بتطوير عمل سابق فقط، ويؤدي الانتحال أو عدم اكتمال العمل إلى الاستبعاد.',
        'لا يجوز تغيير المشرف بعد التسجيل، ويحمل البكالوريوس على الأقل ويُفضَّل في مجال المشروع، ولا يُشترط تخصصه إلا للمشاريع الطبية أو المخبرية.',
        'الالتزام بضوابط الأخلاقيات العلمية والسلامة، واستكمال جميع النماذج الإلزامية.',
        'ألا تتجاوز النماذج الهندسية 50 × 40 × 20 سم (ويمكن الاستعاضة بالفيديو والصور)، وإعداد لوحة عرض ودفتر يوميات للمشروع.',
        'المشاريع المستمرة: تعبئة نموذج 7، وعرض الجديد فقط، وتقديم ملخص مشروع العام السابق عند الطلب.'],
    en:['General-education intermediate or secondary student aged 11–20; those who finished secondary school and are 20 are not eligible.',
        'One individual project per student; no group projects; duplicate projects disqualify both students.',
        'Complete registration on time: personal info, project info, forms, bank details, then attend online interviews and fairs.',
        'A complete project abstract (online judging relies on it), with a title that matches it.',
        'The project must fit the chosen field; the field cannot change after judging.',
        'Original work; only development of earlier work is allowed; plagiarism or incomplete work leads to exclusion.',
        'The supervisor cannot be changed after registration, holds at least a bachelor’s degree (ideally in the field); specialization is required only for medical or lab projects.',
        'Follow scientific ethics and safety rules and complete all mandatory forms.',
        'Engineering models up to 50 × 40 × 20 cm (video/photos may substitute); prepare a display board and project journal.',
        'Continuation projects: Form 7, show only new work, and provide last year’s abstract if requested.']
  },
  register:{
    ar:['التسجيل عبر موقع موهبة أو تطبيقها في خدمة «الأولمبياد الوطني للإبداع العلمي – التسجيل».',
        'تسجيل بيانات الطالب، ثم حضور المحاضرات التدريبية.',
        'تسجيل معلومات المشروع وملخصه، ورفع النماذج المطلوبة.',
        'إدخال البيانات البنكية.',
        'طباعة بطاقة المسار البحثي (مطلوبة لحضور المعارض).',
        'حضور المقابلات الإلكترونية والمعارض المركزية عند ترشح المشروع.'],
    en:['Register via the Mawhiba website or app in the "National Olympiad for Scientific Creativity – Registration" service.',
        'Enter student information, then attend the training lectures.',
        'Enter project information and abstract, and upload the required forms.',
        'Enter bank details.',
        'Print the research-track card (needed to attend fairs).',
        'Attend online interviews and central fairs if the project is shortlisted.']
  },
  timeline:{
    label:{ ar:'النسخة الأولى 2026–2027 — المراحل كما في صفحة المسار الرسمية', en:'First edition 2026–2027 — stages as on the official track page' },
    items:[
      { ar:'التسجيل الإلكتروني (بيانات الطالب)', en:'Online registration (student info)', date:'2026-08-20', end:'2026-09-30' },
      { ar:'المحاضرات التدريبية عن بُعد (Teams)', en:'Online training lectures (Teams)', date:'2026-09-13', end:'2026-09-22',
        note:{ ar:'كتابة البحث العلمي · أخلاقيات البحث · نموذج التسجيل ومعايير التحكيم · التحقق من أصالة الفكرة · ابدأ مشروعك من المنزل بالذكاء الاصطناعي', en:'Research writing · Research ethics · Registration form & judging criteria · Verifying originality · Start your project from home with AI' } },
      { ar:'آخر موعد لتسجيل بيانات المشروع (المرحلة الثانية)', en:'Deadline for project information (Phase 2)', date:'2026-10-28',
        note:{ ar:'وفق صفحة خدمة «أولمبياد الموهبة الوطني: التسجيل» على موقع موهبة', en:'Per the “National Gifted Olympiad: Registration” service page on the Mawhiba website' } },
      { ar:'التحكيم الإلكتروني وإعلان المرشحين للمعارض المركزية ورفع نماذج إبداع', en:'Online judging, central-fair shortlist, Ibdaa forms upload', when:{ar:'وفق إعلان موهبة',en:'As announced by Mawhiba'} },
      { ar:'المعارض المركزية وورش العمل المصاحبة وإعلان المتأهلين', en:'Central fairs, workshops and qualifiers announced', when:{ar:'وفق إعلان موهبة',en:'As announced by Mawhiba'} },
      { ar:'نهائيات أولمبياد الموهبة الوطني (معرض المسار البحثي) – الرياض', en:'National Gifted Olympiad finals (research fair) – Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} },
      { ar:'المشاركة في معرض ISEF الدولي للمتأهلين – لوس أنجلوس', en:'Regeneron ISEF for qualifiers – Los Angeles', date:'2027-05-08', end:'2027-05-14' }
    ]
  },
  resources:[
    { group:{ ar:'أدلة المسار البحثي 2027', en:'Research track guides 2027' }, items:[
      { ar:'اختيار المجال الصحيح', en:'Choosing the right field', url:'https://www.mawhiba.sa/media/02dlnobh/اختيار-المجال-الصحيح.pdf', type:'pdf' },
      { ar:'نموذج تفاصيل المشروع – إبداع 2027', en:'Project details form – Ibdaa 2027', url:'https://www.mawhiba.sa/media/ri0juot5/نموذج-تفاصيل-المشروع-إبداع-2027.pdf', type:'pdf' },
      { ar:'مهام مشرف المشروع والمشرف الأكاديمي 2027', en:'Project & academic supervisor tasks 2027', url:'https://www.mawhiba.sa/media/5jlp4kic/نموذج-مهام-مشرف-المشروع-والمشرف-الأكاديمي-2027.pdf', type:'pdf' },
      { ar:'ضوابط الأخلاقيات العلمية 2027', en:'Scientific ethics controls 2027', url:'https://www.mawhiba.sa/media/db2llfbz/ضوابط-الأخلاقيات-العلمية-2027.pdf', type:'pdf' },
      { ar:'معايير تحكيم المشاريع 2027 – مرحلة التحكيم الإلكتروني', en:'Judging criteria 2027 – online judging stage', url:'https://www.mawhiba.sa/media/rm1nyjrf/معايير-التحكيم-المشاريع-العلمية-2027-مرحلة-التحكيم-الإلكتروني.pdf', type:'pdf' },
      { ar:'ضوابط استخدام الذكاء الاصطناعي في مشاريع إبداع', en:'AI-use guidelines for Ibdaa projects', url:'https://www.mawhiba.sa/media/fv5paf35/official-statement-on-the-use-of-chatgpt-and-ai-for-scientific-research-projects-bdaa-2025.pdf', type:'pdf' },
      { ar:'مواصفات لوحة عرض المشروع', en:'Project display board specifications', url:'https://www.mawhiba.sa/media/es2aaggt/displaypanel2019.pdf', type:'pdf' }
    ] },
    { group:{ ar:'نماذج إبداع الرسمية', en:'Official Ibdaa forms' }, items:[
      { ar:'نموذج 1 – قائمة تحقق المشرف (إلزامي)', en:'Form 1 – Adult sponsor checklist (mandatory)', url:'https://www.mawhiba.sa/media/txmi44qn/1-checklist-for-adult-sponsor.pdf', type:'pdf' },
      { ar:'نموذج 1A – قائمة تحقق الطالب وخطة البحث (إلزامي)', en:'Form 1A – Student checklist & research plan (mandatory)', url:'https://www.mawhiba.sa/media/n1zj4g4j/1a-student-checklist-research-plan-instructions.pdf', type:'pdf' },
      { ar:'نموذج 1B – الموافقة بتوقيع الطالب وولي الأمر (إلزامي)', en:'Form 1B – Approval form (mandatory)', url:'https://www.mawhiba.sa/media/smoddtux/1b-approval-form.pdf', type:'pdf' },
      { ar:'نموذج 2A – الإفصاح عن الدعم (إلزامي)', en:'Form 2A – Student support disclosure (mandatory)', url:'https://www.mawhiba.sa/media/yxeifey4/2a-student-support-disclosure-form.pdf', type:'pdf' },
      { ar:'نموذج 2B – العالم المؤهل (عند وجود مشرف أكاديمي)', en:'Form 2B – Qualified scientist', url:'https://www.mawhiba.sa/media/kmcjc0pq/2b-qualified-scientist.pdf', type:'pdf' },
      { ar:'نموذج 2C – جهة بحثية منظمة (مختبر أو مستشفى)', en:'Form 2C – Regulated research institution', url:'https://www.mawhiba.sa/media/tq5hfcoj/2c-regulated-research-institution.pdf', type:'pdf' },
      { ar:'نموذج 3 – تقييم المخاطر', en:'Form 3 – Risk assessment', url:'https://www.mawhiba.sa/media/1i2pzlfr/3-risk-assessment.pdf', type:'pdf' },
      { ar:'نموذج 4 – المشاركون من البشر', en:'Form 4 – Human participants', url:'https://www.mawhiba.sa/media/qyqjofm2/4-human-participants.pdf', type:'pdf' },
      { ar:'نموذج 5A – الحيوانات الفقارية (موقع غير منظم)', en:'Form 5A – Vertebrate animals (non-regulated site)', url:'https://www.mawhiba.sa/media/so5ds3ms/5a-vertebrate-animal.pdf', type:'pdf' },
      { ar:'نموذج 5B – الحيوانات الفقارية (موقع منظم)', en:'Form 5B – Vertebrate animals (regulated site)', url:'https://www.mawhiba.sa/media/v0amm1o3/5b-vertebrate-animal.pdf', type:'pdf' },
      { ar:'نموذج 6A – العوامل البيولوجية الخطرة', en:'Form 6A – Potentially hazardous biological agents', url:'https://www.mawhiba.sa/media/ncbhytzq/6a-potentially-hazardous-biological-agents.pdf', type:'pdf' },
      { ar:'نموذج 6B – أنسجة الإنسان والحيوانات الفقارية', en:'Form 6B – Human & vertebrate animal tissue', url:'https://www.mawhiba.sa/media/xrtb2uw3/6b-human-vertebrate-animal-tissue.pdf', type:'pdf' },
      { ar:'نموذج 7 – المشاريع المستمرة', en:'Form 7 – Continuation projects', url:'https://www.mawhiba.sa/media/xjrnmujb/7-continuation.pdf', type:'pdf' }
    ] },
    { group:{ ar:'مكتبة الفيديو', en:'Video library' }, items:[
      { ar:'شرح معايير التحكيم', en:'Judging criteria explained', url:'https://www.youtube.com/watch?v=L9dTc1PX1cA', type:'video' },
      { ar:'صناعة الفكرة', en:'Creating an idea', url:'https://www.youtube.com/watch?v=t588BaVzjWU', type:'video' },
      { ar:'كيف تجهز مشروعك من المنزل', en:'Preparing your project at home', url:'https://www.youtube.com/watch?v=XgWfbAw8JO8', type:'video' },
      { ar:'المبادئ الأساسية للمشروع العلمي', en:'Basic principles of a science project', url:'https://www.youtube.com/watch?v=rk7ywFisq-8', type:'video' },
      { ar:'التحقق من أصالة الفكرة', en:'Checking originality', url:'https://www.youtube.com/watch?v=IJe_l_-uK7s', type:'video' },
      { ar:'أخلاقيات البحث العلمي', en:'Research ethics', url:'https://www.youtube.com/watch?v=7PJpyffqVdI', type:'video' },
      { ar:'إعداد لوحة العرض', en:'Preparing a display board', url:'https://www.youtube.com/watch?v=PVj_MPnKPo0', type:'video' },
      { ar:'قواعد عرض المشاريع في إبداع وISEF', en:'Project display rules at Ibdaa and ISEF', url:'https://www.youtube.com/watch?v=Ygtq32H1xI4', type:'video' },
      { ar:'مصادر الأفكار البحثية', en:'Sources of research ideas', url:'https://www.youtube.com/watch?v=aN3Og4_hJ98', type:'video' },
      { ar:'سلسلة ورش الإبداع (قائمة تشغيل)', en:'Creativity workshop series (playlist)', url:'https://youtube.com/playlist?list=PLBKZ1Xydclq0PPdqx4Q9Nm2Yui31oI8EV', type:'video' }
    ] },
    { group:{ ar:'روابط بحثية مفيدة', en:'Useful research links' }, items:[
      { ar:'مشاريع المتأهلين في ISEF', en:'ISEF finalist projects', url:'https://isef.net/categories', type:'link' },
      { ar:'Google Patents – البحث في براءات الاختراع', en:'Google Patents', url:'https://patents.google.com/', type:'link' },
      { ar:'مكتب البراءات الأوروبي Espacenet', en:'Espacenet (European Patent Office)', url:'https://worldwide.espacenet.com/', type:'link' },
      { ar:'PubMed – الأبحاث الطبية', en:'PubMed', url:'https://pubmed.ncbi.nlm.nih.gov/', type:'link' },
      { ar:'ERIC – قاعدة بيانات الأبحاث التربوية', en:'ERIC education database', url:'https://eric.ed.gov/', type:'link' },
      { ar:'مكتبة مدينة الملك عبدالعزيز للعلوم والتقنية', en:'KACST library', url:'http://kacst.summon.serialssolutions.com/', type:'link' }
    ] }
  ],
  training:{
    ar:['ورشة اختيار المشكلة البحثية من اهتمامات الطالب، والتحقق من أصالتها عبر براءات الاختراع والمجلات العلمية.',
        'اختيار المجال الصحيح من المجالات الـ22 بالاستعانة بدليل «اختيار المجال الصحيح».',
        'كتابة ملخص قوي وخطة بحث وفق معايير التحكيم الإلكتروني 2027، لأن التحكيم الأول يعتمد عليهما.',
        'استكمال النماذج الإلزامية (1، 1A، 1B، 2A) مبكراً، وتحديد النماذج الإضافية حسب طبيعة المشروع.',
        'إعداد لوحة العرض ودفتر اليوميات، والتدرب على المقابلة بأسئلة محاكية.',
        'ربط الطلاب ببرنامج البحث العلمي في وحدة مهارات القرن 21 لبناء خط إمداد مستمر للمشاريع.'],
    en:['Workshop on choosing a research problem from student interests and checking originality via patents and journals.',
        'Choose the right field from the 22 using the "Choosing the right field" guide.',
        'Write a strong abstract and research plan per the 2027 online judging criteria, since first-round judging relies on them.',
        'Complete the mandatory forms (1, 1A, 1B, 2A) early and identify any extra forms the project needs.',
        'Prepare the display board and journal, and rehearse the interview with mock questions.',
        'Link students with the Scientific Research program of the 21st Century Skills Unit for a steady project pipeline.']
  },
  sources:['https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/','https://sabq.org/article/gjyd9nl']
},

/* ───────────────────────── ISEF ───────────────────────── */
{
  id:'isef', field:'research', color:'#C2410C', icon:'globe',
  stages:['secondary'],
  name:{ ar:'معرض ريجينيرون الدولي للعلوم والهندسة ISEF', en:'Regeneron International Science and Engineering Fair (ISEF)' },
  short:{ ar:'ISEF الدولي', en:'Regeneron ISEF' },
  organizer:{ ar:'جمعية العلوم Society for Science – والترشيح في المملكة عبر موهبة', en:'Society for Science – Saudi nomination via Mawhiba' },
  summary:{
    ar:'أكبر معرض علمي دولي لطلاب ما قبل الجامعة، يتأهل إليه طلاب المملكة عبر المسار البحثي «إبداع» في أولمبياد الموهبة الوطني.',
    en:'The world’s largest pre-college science fair; Saudi students qualify through the Ibdaa research track of the National Gifted Olympiad.'
  },
  about:{
    ar:['معرض ريجينيرون الدولي للعلوم والهندسة ISEF هو أكبر مسابقة علمية دولية لطلاب ما قبل الجامعة، تنظمه جمعية العلوم Society for Science، ويجمع سنوياً طلاباً من عشرات الدول يعرضون مشاريعهم البحثية أمام محكّمين متخصصين.',
        'لا يُسجَّل في ISEF مباشرة؛ بل يتأهل الطلاب عبر معارض معتمدة. وفي المملكة يمر الطريق عبر المسار البحثي «إبداع» في أولمبياد الموهبة الوطني، ثم ورشة التأهيل للمشاركة الدولية التي تنظمها موهبة.'],
    en:['Regeneron ISEF is the largest international pre-college science competition, run by Society for Science, bringing together students from dozens of countries to present research to expert judges.',
        'There is no direct registration: students qualify through affiliated fairs. In Saudi Arabia the path runs through the Ibdaa research track of the National Gifted Olympiad, followed by Mawhiba’s international qualification workshop.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'طلاب الصفوف 9–12 (الثالث المتوسط حتى الثالث الثانوي)',en:'Grades 9–12'} },
    { k:{ar:'طريق التأهل',en:'Qualification'}, v:{ar:'المسار البحثي «إبداع»',en:'Ibdaa research track'} },
    { k:{ar:'ISEF 2027',en:'ISEF 2027'}, v:{ar:'8–14 مايو 2027 – لوس أنجلوس',en:'May 8–14, 2027 – Los Angeles'} },
    { k:{ar:'لغة العرض',en:'Language'}, v:{ar:'الإنجليزية',en:'English'} }
  ],
  links:[
    { ar:'الموقع الرسمي لـ ISEF', en:'Official ISEF website', url:'https://www.societyforscience.org/isef/', primary:true },
    { ar:'القواعد والإرشادات الدولية', en:'International Rules & Guidelines', url:'https://www.societyforscience.org/isef/international-rules/' },
    { ar:'طريق التأهل: المسار البحثي «إبداع»', en:'Qualification path: Ibdaa track', url:'competition.html?c=ibdaa', internal:true, register:true }
  ],
  conditions:{
    ar:['التأهل عبر المسار البحثي «إبداع» في أولمبياد الموهبة الوطني واختيار الطالب للمشاركة الدولية.',
        'أن يكون الطالب في الصفوف 9–12 أو ما يعادلها، وفق قواعد ISEF الدولية.',
        'التزام المشروع بالقواعد والإرشادات الدولية لـ ISEF (الأخلاقيات، والسلامة، والنماذج المطلوبة).',
        'القدرة على عرض المشروع ومناقشته باللغة الإنجليزية أمام المحكّمين.'],
    en:['Qualify through the Ibdaa research track and be selected for international participation.',
        'Be in grades 9–12 or equivalent, per ISEF international rules.',
        'The project must comply with ISEF International Rules & Guidelines (ethics, safety, required forms).',
        'Be able to present and discuss the project in English with judges.']
  },
  register:{
    ar:['التسجيل في المسار البحثي «إبداع» خلال فترة تسجيل أولمبياد الموهبة الوطني.',
        'اجتياز التحكيم الإلكتروني والمعارض المركزية والنهائيات.',
        'حضور ورشة التأهيل للمشاركة الدولية التي تنظمها موهبة.',
        'تتولى موهبة إجراءات تسجيل المتأهلين في ISEF.'],
    en:['Register in the Ibdaa research track during National Gifted Olympiad registration.',
        'Pass online judging, central fairs and finals.',
        'Attend Mawhiba’s international qualification workshop.',
        'Mawhiba handles the qualifiers’ ISEF registration.']
  },
  timeline:{
    label:{ ar:'الطريق إلى ISEF 2027', en:'Road to ISEF 2027' },
    items:[
      { ar:'تسجيل المسار البحثي «إبداع»', en:'Ibdaa track registration', date:'2026-08-20', end:'2026-09-30' },
      { ar:'آخر موعد لتسجيل بيانات المشروع في «إبداع»', en:'Ibdaa project information deadline', date:'2026-10-28' },
      { ar:'نهائيات أولمبياد الموهبة الوطني – الرياض', en:'National Gifted Olympiad finals – Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} },
      { ar:'ورشة التأهيل للمشاركة الدولية', en:'International qualification workshop', when:{ar:'بعد النهائيات',en:'After the finals'} },
      { ar:'معرض ISEF 2027 – مركز مؤتمرات لوس أنجلوس', en:'ISEF 2027 – Los Angeles Convention Center', date:'2027-05-08', end:'2027-05-14' }
    ]
  },
  resources:[
    { ar:'القواعد والإرشادات الدولية لـ ISEF', en:'ISEF International Rules & Guidelines', url:'https://www.societyforscience.org/isef/international-rules/', type:'link' },
    { ar:'مشاريع المتأهلين في ISEF حسب المجال', en:'ISEF finalist projects by category', url:'https://isef.net/categories', type:'link' },
    { ar:'قواعد عرض المشاريع في إبداع وISEF (فيديو)', en:'Project display rules at Ibdaa and ISEF (video)', url:'https://www.youtube.com/watch?v=Ygtq32H1xI4', type:'video' },
    { ar:'مواصفات لوحة العرض (موهبة)', en:'Display board specifications (Mawhiba)', url:'https://www.mawhiba.sa/media/es2aaggt/displaypanel2019.pdf', type:'pdf' }
  ],
  training:{
    ar:['تتولى موهبة تأهيل المتأهلين عبر ورشة المشاركة الدولية.',
        'دور المدرسة: دعم الطالب وتفريغه للتدريب، وتوفير مساحة للتجريب.',
        'التدرب على العرض والمناقشة بالإنجليزية أمام لجنة محاكية من المعلمين.',
        'مراجعة توافق المشروع مع القواعد الدولية ونماذجها مبكراً، ودراسة مشاريع المتأهلين السابقين في نفس المجال.'],
    en:['Mawhiba prepares qualifiers through the international participation workshop.',
        'The school’s role: support the student, allow time for training and provide space for experiments.',
        'Rehearse presenting in English before a mock panel of teachers.',
        'Check compliance with international rules and forms early, and study past finalist projects in the same category.']
  },
  sources:['https://www.societyforscience.org/isef/','https://youthscience.ca/science-fairs/team-canada/events/regeneron-isef-2027/','https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/']
}

];
