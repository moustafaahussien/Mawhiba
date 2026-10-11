/* =========================================================
   منصة الموهبة – بيانات المسابقات (المحتوى الثابت)
   ---------------------------------------------------------
   - كل مسابقة كائن واحد. لإضافة مسابقة جديدة: انسخ كائناً
     وغيّر المعرّف (id) والنصوص، وستظهر تلقائياً في صفحة
     المسابقات ولها صفحتها: competition.html?c=<id>
   - المواعيد الحالية وحالة التسجيل ومجلد المصادر والتدريب
     والنتائج تأتي من جدول بيانات المنصة (Google Sheet)
     وتتقدّم على ما هنا.
   - التواريخ هنا بصيغة YYYY-MM-DD، والوقت اختياري في الحقل time
     (مثل '17:00') — كل المواعيد بتوقيت الرياض.
   - مصدر المعلومات: المواقع الرسمية لموهبة والمسابقات
     (راجع sources في كل مسابقة). آخر مراجعة: أكتوبر 2026.
   ========================================================= */
window.TP_FIELDS = {
  math:        { ar:'الرياضيات',        en:'Mathematics',       c:'#7B4DFF' },
  informatics: { ar:'المعلوماتية',       en:'Informatics',       c:'#0EA5D6' },
  science:     { ar:'العلوم',            en:'Sciences',          c:'#0E9F76' },
  research:    { ar:'البحث والابتكار',   en:'Research & Innovation', c:'#E2386F' },
  robotics:    { ar:'الروبوت والبرمجة',  en:'Robotics & Coding', c:'#F07B0F' }
};
window.TP_STAGES = {
  primary:      { ar:'ابتدائي', en:'Primary' },
  intermediate: { ar:'متوسط',   en:'Intermediate' },
  secondary:    { ar:'ثانوي',   en:'Secondary' }
};

window.TP_COMPETITIONS = [

/* ───────────────────────── كانجارو ───────────────────────── */
{
  id:'kangaroo', field:'math', color:'#7B4DFF', icon:'kangaroo',
  stages:['primary','intermediate','secondary'],
  name:{ ar:'مسابقة كانجارو موهبة للرياضيات', en:'Kangaroo Mawhiba Mathematics Competition' },
  short:{ ar:'كانجارو للرياضيات', en:'Kangaroo Math' },
  organizer:{ ar:'موهبة بالتعاون مع وزارة التعليم', en:'Mawhiba with the Ministry of Education' },
  summary:{
    ar:'مسابقة دولية سنوية في التفكير الرياضي وحل المشكلات، بأسئلة اختيار من متعدد تربط الرياضيات بالحياة اليومية، من الثالث الابتدائي إلى الثالث الثانوي.',
    en:'An annual international competition in mathematical thinking and problem solving, with multiple-choice questions linking math to daily life, from Grade 3 to Grade 12.'
  },
  about:{
    ar:['انطلقت مسابقة كانجارو في أستراليا عام 1980، ثم انتشرت عالمياً عبر جمعية «كانجارو بلا حدود»، ويشارك فيها ملايين الطلاب في نحو 70 دولة.',
        'انضمت المملكة إلى المسابقة عام 2016، وتنظمها مؤسسة الملك عبدالعزيز ورجاله للموهبة والإبداع «موهبة» بالتعاون مع وزارة التعليم. تهدف إلى تعزيز حب الرياضيات، وربط مفاهيمها بالحياة اليومية، وتنمية مهارات حل المشكلات بطريقة ممتعة ومحفزة.'],
    en:['The Kangaroo competition began in Australia in 1980 and spread worldwide through the "Kangourou Sans Frontières" association, with millions of students in about 70 countries.',
        'Saudi Arabia joined in 2016. It is organized by Mawhiba (King Abdulaziz and His Companions Foundation for Giftedness and Creativity) with the Ministry of Education, aiming to build a love of mathematics, connect its concepts to daily life and develop problem-solving skills in an enjoyable way.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'من الثالث الابتدائي إلى الثالث الثانوي',en:'Grade 3 to Grade 12'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'فردية',en:'Individual'} },
    { k:{ar:'صيغة الاختبار',en:'Format'}, v:{ar:'أسئلة اختيار من متعدد، بجلسات حسب الصف',en:'Multiple choice, sessions by grade'} },
    { k:{ar:'المنظِّم',en:'Organizer'}, v:{ar:'موهبة ووزارة التعليم',en:'Mawhiba & MoE'} }
  ],
  links:[
    { ar:'الموقع الرسمي للمسابقة', en:'Official website', url:'https://www.kangarooksa.org', primary:true },
    { ar:'صفحة التسجيل', en:'Registration page', url:'https://www.kangarooksa.org/kangaroo-register/', register:true },
    { ar:'الجدول الزمني الرسمي', en:'Official timeline', url:'https://www.kangarooksa.org/about-competition/kangaroo-competition-2025-timeline/' },
    { ar:'بوابة موهبة', en:'Mawhiba portal', url:'https://www.mawhiba.sa' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة في التعليم العام من الصف الثالث الابتدائي حتى الصف الثالث الثانوي.',
        'المسابقة متاحة للطلبة السعوديين والمقيمين في مدارس المملكة.',
        'التسجيل خلال الفترة المعلنة عبر الموقع الرسمي للمسابقة أو تطبيق موهبة.',
        'أداء الاختبار في الجلسة المخصصة لصف الطالب وفي موعدها.',
        'الالتزام بتعليمات الاختبار، وتُعلن الرسوم (إن وجدت) في بوابة التسجيل.'],
    en:['Students in general education from Grade 3 to Grade 12.',
        'Open to Saudi and resident students in the Kingdom’s schools.',
        'Register within the announced period via the official website or the Mawhiba app.',
        'Sit the test in the session assigned to the student’s grade, on time.',
        'Follow test instructions; any fees are announced on the registration portal.']
  },
  register:{
    ar:['الدخول إلى موقع المسابقة kangarooksa.org أو تطبيق موهبة.',
        'إنشاء حساب للطالب أو الدخول إلى حسابه، ثم تعبئة البيانات واختيار الصف.',
        'إكمال إجراءات التسجيل قبل تاريخ الإغلاق، وإبلاغ منسق الموهوبين بالمدرسة.',
        'متابعة الرسائل النصية وأداء الاختبار التجريبي للتعرف على المنصة.',
        'أداء الاختبار الرسمي في جلسة الصف المحددة.'],
    en:['Go to kangarooksa.org or the Mawhiba app.',
        'Create or sign in to the student account, fill in details and choose the grade.',
        'Complete registration before the deadline and inform the school’s gifted coordinator.',
        'Watch for SMS notices and take the trial test to get familiar with the platform.',
        'Sit the official test in the assigned grade session.']
  },
  timeline:{
    label:{ ar:'مواعيد الدورة الأخيرة (2026) — استرشادية حتى تُعلن مواعيد الدورة القادمة', en:'Last cycle (2026) — indicative until next cycle dates are announced' },
    items:[
      { ar:'فتح التسجيل', en:'Registration opens', date:'2026-02-02' },
      { ar:'إغلاق التسجيل', en:'Registration closes', date:'2026-04-07' },
      { ar:'الاختبار التجريبي', en:'Trial test', date:'2026-04-08', end:'2026-04-13' },
      { ar:'الاختبار الرسمي (جلسات حسب الصف)', en:'Official test (sessions by grade)', date:'2026-04-17', end:'2026-04-18' },
      { ar:'إعلان النتائج', en:'Results announced', date:'2026-04-28' },
      { ar:'تسليم الميداليات لإدارات الموهوبين بإدارات التعليم', en:'Medals delivered to gifted departments', date:'2026-05-28' }
    ]
  },
  resources:[
    { ar:'نماذج أسئلة المسابقة (الموقع الرسمي)', en:'Sample questions (official site)', url:'https://www.kangarooksa.org', type:'link' },
    { ar:'درجات القطع للميداليات (الموقع الرسمي)', en:'Medal cut-off scores (official site)', url:'https://www.kangarooksa.org', type:'link' }
  ],
  training:{
    ar:['حل نموذج من أسئلة الأعوام السابقة أسبوعياً ومناقشة الحلول جماعياً.',
        'حلقات قصيرة لاستراتيجيات حل المسائل: الرسم، والبحث عن نمط، والحالات الخاصة، والاستبعاد.',
        'تدريب على إدارة الوقت والتعامل مع الأسئلة متدرجة الصعوبة.',
        'اختبار محاكاة كامل قبل الموعد الرسمي بأسبوعين، ثم أداء الاختبار التجريبي الرسمي.'],
    en:['Solve one past paper weekly and discuss solutions as a group.',
        'Short sessions on problem-solving strategies: drawing, finding patterns, special cases, elimination.',
        'Practice time management and handling questions of increasing difficulty.',
        'A full mock test two weeks before the official date, then the official trial test.']
  },
  sources:['https://www.kangarooksa.org/about-competition/kangaroo-competition-2025-timeline/','https://saudipedia.com/ar/مسابقة-كانجارو-موهبة-للرياضيات']
},

/* ───────────────────────── بيبراس ───────────────────────── */
{
  id:'bebras', field:'informatics', color:'#0EA5D6', icon:'beaver',
  stages:['primary','intermediate','secondary'],
  name:{ ar:'مسابقة بيبراس موهبة للمعلوماتية', en:'Bebras Mawhiba Informatics Competition' },
  short:{ ar:'بيبراس للمعلوماتية', en:'Bebras Informatics' },
  organizer:{ ar:'موهبة بالتعاون مع وزارة التعليم', en:'Mawhiba with the Ministry of Education' },
  summary:{
    ar:'مسابقة عالمية في التفكير الحاسوبي بمسائل قصيرة ممتعة تُحل إلكترونياً دون حاجة لخبرة برمجية سابقة، وبوابة نحو المنتخب الوطني للمعلوماتية.',
    en:'A global computational-thinking competition with short, fun online tasks that need no prior coding experience, and a gateway to the national informatics team.'
  },
  about:{
    ar:['بيبراس مسابقة عالمية في المعلوماتية والتفكير الحاسوبي، يشارك فيها نحو مليوني طالب في 70 دولة، وتقدّم مسائل قصيرة تعتمد على المنطق والخوارزميات وتمثيل البيانات.',
        'انضمت المملكة عام 2018 بصفة مراقب، وجُرّبت المسابقة عام 2019 في 73 مدرسة، ثم أُطلقت نسختها الرسمية عام 2020. تنظمها موهبة بالتعاون مع وزارة التعليم، وتُعد من المسارات الرئيسة نحو المنتخب السعودي للمعلوماتية والأولمبياد الدولي للمعلوماتية.'],
    en:['Bebras is a global informatics and computational-thinking competition with about two million students in 70 countries, offering short tasks based on logic, algorithms and data representation.',
        'Saudi Arabia joined in 2018 as an observer, piloted it in 2019 with 73 schools and launched the official edition in 2020. Organized by Mawhiba with the Ministry of Education, it is a main route to the Saudi informatics team and the International Olympiad in Informatics.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'من الثالث الابتدائي إلى الثالث الثانوي',en:'Grade 3 to Grade 12'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'فردية',en:'Individual'} },
    { k:{ar:'الصيغة',en:'Format'}, v:{ar:'مسائل قصيرة إلكترونية بالعربية والإنجليزية',en:'Short online tasks in Arabic and English'} },
    { k:{ar:'الرسوم',en:'Fee'}, v:{ar:'رسوم رمزية بعد قبول الطلب (40 ريالاً في دورات سابقة)',en:'Small fee after approval (SAR 40 in past cycles)'} }
  ],
  links:[
    { ar:'الموقع الرسمي لبيبراس موهبة', en:'Bebras Mawhiba website', url:'https://www.bebrasksa.org', primary:true, register:true },
    { ar:'الموقع الدولي لبيبراس', en:'International Bebras', url:'https://www.bebras.org' },
    { ar:'بوابة موهبة', en:'Mawhiba portal', url:'https://www.mawhiba.sa' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة من الصف الثالث الابتدائي حتى الصف الثالث الثانوي.',
        'متاحة للطلبة السعوديين والمقيمين.',
        'تعبئة نموذج المشاركة الإلكتروني خلال فترة التسجيل.',
        'سداد رسوم المشاركة بعد قبول الطلب.',
        'أداء المسابقة إلكترونياً في موعدها المعلن.'],
    en:['Students from Grade 3 to Grade 12.',
        'Open to Saudi and resident students.',
        'Complete the online participation form during registration.',
        'Pay the participation fee after the application is approved.',
        'Take the competition online on the announced date.']
  },
  register:{
    ar:['الدخول إلى موقع بيبراس موهبة bebrasksa.org.',
        'تعبئة نموذج المشاركة الإلكتروني ببيانات الطالب والصف.',
        'انتظار الموافقة على الطلب، ثم سداد الرسوم.',
        'استلام بيانات الدخول، وأداء المسابقة إلكترونياً في موعدها.'],
    en:['Go to bebrasksa.org.',
        'Fill in the online form with the student’s details and grade.',
        'Wait for approval, then pay the fee.',
        'Receive login details and take the competition online on time.']
  },
  timeline:{
    label:{ ar:'المواعيد المعتادة حسب الدورات السابقة — تُحدَّث عند إعلان الدورة', en:'Usual timing from past cycles — updated when the cycle is announced' },
    items:[
      { ar:'فتح التسجيل', en:'Registration opens', when:{ar:'أكتوبر من كل عام',en:'October each year'} },
      { ar:'موعد المسابقة', en:'Competition', when:{ar:'نوفمبر من كل عام',en:'November each year'} },
      { ar:'إعلان النتائج والترشيح للمراحل التالية', en:'Results and nominations', when:{ar:'بعد المسابقة وفق إعلان موهبة',en:'After the competition, as announced'} }
    ]
  },
  resources:[
    { ar:'مسائل بيبراس السابقة (الموقع الدولي)', en:'Past Bebras tasks (international site)', url:'https://www.bebras.org', type:'link' },
    { ar:'أنشطة التفكير الحاسوبي دون حاسب – CS Unplugged', en:'CS Unplugged activities', url:'https://www.csunplugged.org', type:'link' }
  ],
  training:{
    ar:['حل مجموعات من مسائل بيبراس السابقة حسب الفئة العمرية.',
        'أنشطة تفكير حاسوبي غير موصولة: الخوارزميات، والترتيب، والبحث، والتمثيل الثنائي.',
        'ألغاز منطقية قصيرة يومياً لبناء سرعة التحليل.',
        'تدريب على واجهة المسابقة الإلكترونية وإدارة الوقت.'],
    en:['Solve sets of past Bebras tasks by age group.',
        'Unplugged computational-thinking activities: algorithms, sorting, searching, binary.',
        'Short daily logic puzzles to build analysis speed.',
        'Practice with the online interface and time management.']
  },
  sources:['https://saudipedia.com/ar/مسابقة-بيبراس-موهبة-للمعلوماتية','https://www.bebrasksa.org']
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
  table:{
    title:{ ar:'التخصصات حسب الصف', en:'Fields by grade' },
    head:{ ar:['الصف','التخصصات'], en:['Grade','Fields'] },
    rows:[
      { ar:['الأول والثاني المتوسط','الرياضيات (ناشئين)، المعلوماتية (ناشئين)، العلوم'], en:['Grades 7–8','Mathematics (junior), Informatics (junior), Science'] },
      { ar:['الثالث المتوسط والأول الثانوي','الرياضيات (كبار)، المعلوماتية (كبار)، الفيزياء، الكيمياء، الأحياء'], en:['Grades 9–10','Mathematics (senior), Informatics (senior), Physics, Chemistry, Biology'] }
    ]
  },
  links:[
    { ar:'صفحة أولمبياد الموهبة الوطني', en:'National Gifted Olympiad page', url:'https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/', primary:true },
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
      { ar:'اختبارات المرحلة الأولى عن بُعد', en:'Phase One remote tests', date:'2026-10-18', time:'17:00', end:'2026-10-22',
        note:{ ar:'5–7 مساءً: الفيزياء والعلوم (18)، الأحياء (19)، الكيمياء (20)، الرياضيات (21)، المعلوماتية (22)', en:'5–7 pm: Physics & Science (18), Biology (19), Chemistry (20), Math (21), Informatics (22)' } },
      { ar:'تقييم المنتخبات الوطنية', en:'National teams assessment', when:{ar:'بعد المرحلة الأولى',en:'After Phase One'} },
      { ar:'التدريب والتقييمات المركزية', en:'Training & central assessments', when:{ar:'خلال الأشهر التالية',en:'Following months'} },
      { ar:'النهائيات في الرياض', en:'Finals in Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} }
    ]
  },
  resources:[
    { ar:'حقائب المرحلة الأولى (الأحياء، الكيمياء، الفيزياء، العلوم، الرياضيات) – صفحة الأولمبياد', en:'Phase One study packages (Biology, Chemistry, Physics, Science, Math) – Olympiad page', url:'https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/', type:'link' },
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
    ar:'المسار البحثي لمشاريع البحث العلمي والابتكار في 22 مجالاً، والطريق إلى تمثيل المملكة في المعارض العلمية الدولية ومنها ISEF.',
    en:'The research track for science and innovation projects in 22 fields — the path to representing the Kingdom at international science fairs including ISEF.'
  },
  about:{
    ar:['امتداد لـ«الأولمبياد الوطني للإبداع العلمي – إبداع»، وأصبح منذ 2026 المسار البحثي في «أولمبياد الموهبة الوطني».',
        'يقدّم الطالب مشروعاً بحثياً أو ابتكارياً فردياً في أحد 22 مجالاً علمياً، منها الهندسة والصحة والطاقة والبيئة والذكاء الاصطناعي والبرمجيات، ويمر بمراحل تأهيل وتدريب ومعارض مركزية ومقابلات تحكيم، ويتأهل المتميزون للمشاركة في المعارض الدولية ومنها معرض ريجينيرون الدولي للعلوم والهندسة ISEF.'],
    en:['The successor of the National Olympiad for Scientific Creativity (Ibdaa); since 2026 it is the research track of the National Gifted Olympiad.',
        'Each student submits one individual research or innovation project in one of 22 fields — including engineering, health, energy, environment, AI and software — and goes through qualification, training, central fairs and judging interviews. Top students compete at international fairs including Regeneron ISEF.']
  },
  facts:[
    { k:{ar:'الفئة المستهدفة',en:'Target'}, v:{ar:'المرحلتان المتوسطة والثانوية (11–20 عاماً)',en:'Intermediate & secondary (ages 11–20)'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'مشروع فردي واحد',en:'One individual project'} },
    { k:{ar:'الرسوم',en:'Fee'}, v:{ar:'مجانية',en:'Free'} },
    { k:{ar:'المجالات',en:'Fields'}, v:{ar:'22 مجالاً علمياً',en:'22 scientific fields'} }
  ],
  links:[
    { ar:'صفحة أولمبياد الموهبة الوطني', en:'National Gifted Olympiad page', url:'https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/', primary:true },
    { ar:'خدمة التسجيل في المسار البحثي', en:'Research track registration service', url:'https://www.mawhiba.sa/en/services/national-gifted-olympiad-registration-1/', register:true },
    { ar:'رابط التسجيل المختصر', en:'Short registration link', url:'https://s.mawhiba.sa/NGO' }
  ],
  conditions:{
    ar:['أن يكون الطالب أو الطالبة سعودي الجنسية، ومن طلاب المرحلة المتوسطة أو الثانوية، وعمره بين 11 و20 عاماً.',
        'التسجيل عبر النموذج الإلكتروني الرسمي فقط؛ ولا يُقبل مشروع لم يُسجَّل من خلاله.',
        'الحضور الشخصي في جميع أيام التأهيل والتدريب والمعارض المركزية والنهائيات، والغياب قد يؤدي إلى الاستبعاد.',
        'مشروع فردي واحد لكل طالب، ولا تُقبل المشاريع الجماعية؛ وتكرار فكرة المشروع بين طالبين يستبعدهما معاً.',
        'أن يكون المشروع أصيلاً، ويُسمح بتطوير عمل سابق مع الإفصاح عنه (نموذج 7) وعرض الجديد فقط.',
        'التزام المشرف بالمعايير المعلنة، ولا يجوز تغييره بعد التسجيل.',
        'الالتزام بضوابط الأخلاقيات والسلامة، ومنها نماذج الموافقة للاستبانات الموجهة.',
        'ألا تتجاوز النماذج الهندسية 50 سم طولاً و40 سم عرضاً و20 سم ارتفاعاً.',
        'نتائج التحكيم نهائية وغير قابلة للاعتراض.'],
    en:['Saudi nationality, intermediate or secondary student, aged 11–20.',
        'Registration only through the official online form; unregistered projects are not accepted.',
        'In-person attendance on all qualification, training, central fair and final days; absence may lead to disqualification.',
        'One individual project per student; no group projects. Two students with the same idea are both disqualified.',
        'Projects must be original; continuing earlier work is allowed with disclosure (Form 7), showing only the new work.',
        'The supervisor must meet the published criteria and cannot be changed after registration.',
        'Ethics and safety rules apply, including consent forms for targeted questionnaires.',
        'Engineering models must not exceed 50 cm long, 40 cm wide, 20 cm high.',
        'Judging results are final.']
  },
  register:{
    ar:['الدخول إلى حساب الطالب في موهبة أو إنشاء حساب جديد.',
        'اختيار خدمة «تسجيل أولمبياد الموهبة الوطني».',
        'تعبئة البيانات الشخصية ومعلومات المشروع وملخصه.',
        'رفع الملفات المطلوبة وبيانات الحساب البنكي.',
        'الموافقة على الشروط والأحكام، وطباعة بطاقة «إبداع».'],
    en:['Sign in to the student’s Mawhiba account or create one.',
        'Choose the "National Gifted Olympiad Registration" service.',
        'Fill in personal details, project information and summary.',
        'Upload the required files and bank account details.',
        'Accept the terms and conditions, and print the Ibdaa badge.']
  },
  timeline:{
    label:{ ar:'النسخة الأولى 2026–2027', en:'First edition 2026–2027' },
    items:[
      { ar:'التسجيل الإلكتروني', en:'Online registration', date:'2026-08-20', end:'2026-09-30' },
      { ar:'برامج التأهيل والتدريب (مع مقابلة تحكيم)', en:'Qualification & training programs (with judging interview)', when:{ar:'بعد التسجيل',en:'After registration'} },
      { ar:'المعارض المركزية', en:'Central fairs', when:{ar:'خلال الأشهر التالية',en:'Following months'} },
      { ar:'النهائيات في الرياض', en:'Finals in Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} },
      { ar:'معرض ISEF الدولي للمتأهلين – لوس أنجلوس', en:'Regeneron ISEF for qualifiers – Los Angeles', date:'2027-05-08', end:'2027-05-14' }
    ]
  },
  resources:[
    { ar:'مهام مشرف المشروع (PDF)', en:'Project supervisor roles (PDF)', url:'https://www.mawhiba.sa/media/z1uhqaxo/project-supervisor.pdf', type:'pdf' },
    { ar:'ضوابط الأخلاقيات العلمية واختيار المشرف (PDF)', en:'Scientific ethics & supervisor criteria (PDF)', url:'https://www.mawhiba.sa/media/2fyfvxri/supervisor-selection-controls.pdf', type:'pdf' },
    { ar:'مواصفات لوحة عرض المشروع (PDF)', en:'Project display board specifications (PDF)', url:'https://www.mawhiba.sa/media/es2aaggt/displaypanel2019.pdf', type:'pdf' },
    { ar:'ضوابط استخدام الذكاء الاصطناعي في مشاريع إبداع (PDF)', en:'AI-use guidelines for Ibdaa projects (PDF)', url:'https://www.mawhiba.sa/media/fv5paf35/official-statement-on-the-use-of-chatgpt-and-ai-for-scientific-research-projects-bdaa-2025.pdf', type:'pdf' }
  ],
  training:{
    ar:['ورشة اختيار المشكلة البحثية من اهتمامات الطالب (الاهتمام ← الفكرة ← المشروع).',
        'كتابة المقترح البحثي وصياغة السؤال والفرضية وفق المنهج العلمي.',
        'تصميم التجربة أو النموذج، وجمع البيانات وتحليلها.',
        'إعداد لوحة العرض والملخص، والتدرب على مقابلة التحكيم بأسئلة محاكية.',
        'ربط الطلاب ببرنامج البحث العلمي في وحدة مهارات القرن 21 لبناء خط إمداد مستمر للمشاريع.'],
    en:['Workshop on choosing a research problem from student interests (interest → idea → project).',
        'Writing the proposal, research question and hypothesis using the scientific method.',
        'Designing the experiment or prototype, collecting and analyzing data.',
        'Preparing the display board and abstract, and rehearsing judging interviews.',
        'Linking students with the Scientific Research program of the 21st Century Skills Unit for a steady project pipeline.']
  },
  sources:['https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/','https://sabq.org/article/gjyd9nl']
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
        'لا يُسجَّل في ISEF مباشرة؛ بل يتأهل الطلاب عبر معارض معتمدة. وفي المملكة يمر الطريق عبر المسار البحثي «إبداع» في أولمبياد الموهبة الوطني، ثم إعداد منتخب المملكة الذي تتولاه موهبة.'],
    en:['Regeneron ISEF is the largest international pre-college science competition, run by Society for Science, bringing together students from dozens of countries to present research to expert judges.',
        'There is no direct registration: students qualify through affiliated fairs. In Saudi Arabia the path runs through the Ibdaa research track of the National Gifted Olympiad, followed by Mawhiba’s national team preparation.']
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
    ar:['التأهل عبر المسار البحثي «إبداع» في أولمبياد الموهبة الوطني واختيار الطالب ضمن منتخب المملكة.',
        'أن يكون الطالب في الصفوف 9–12 أو ما يعادلها، وفق قواعد ISEF الدولية.',
        'التزام المشروع بالقواعد والإرشادات الدولية لـ ISEF (الأخلاقيات، والسلامة، والنماذج المطلوبة).',
        'القدرة على عرض المشروع ومناقشته باللغة الإنجليزية أمام المحكّمين.'],
    en:['Qualify through the Ibdaa research track and be selected for the Saudi national team.',
        'Be in grades 9–12 or equivalent, per ISEF international rules.',
        'The project must comply with ISEF International Rules & Guidelines (ethics, safety, required forms).',
        'Be able to present and discuss the project in English with judges.']
  },
  register:{
    ar:['التسجيل في المسار البحثي «إبداع» خلال فترة تسجيل أولمبياد الموهبة الوطني.',
        'اجتياز مراحل التأهيل والمعارض المركزية والنهائيات.',
        'الترشيح لمنتخب المملكة والتحاق الطالب بالبرنامج الإعدادي الذي تنظمه موهبة.',
        'تتولى موهبة إجراءات تسجيل منتخب المملكة في ISEF.'],
    en:['Register in the Ibdaa research track during National Gifted Olympiad registration.',
        'Pass qualification, central fairs and finals.',
        'Nomination to the Saudi team and joining Mawhiba’s preparation program.',
        'Mawhiba handles the team’s ISEF registration.']
  },
  timeline:{
    label:{ ar:'الطريق إلى ISEF 2027', en:'Road to ISEF 2027' },
    items:[
      { ar:'تسجيل المسار البحثي «إبداع»', en:'Ibdaa track registration', date:'2026-08-20', end:'2026-09-30' },
      { ar:'نهائيات أولمبياد الموهبة الوطني – الرياض', en:'National Gifted Olympiad finals – Riyadh', date:'2027-01-25', approx:true, when:{ar:'أواخر يناير 2027',en:'Late January 2027'} },
      { ar:'إعداد منتخب المملكة', en:'National team preparation', when:{ar:'فبراير – أبريل 2027',en:'Feb – Apr 2027'} },
      { ar:'معرض ISEF 2027 – مركز مؤتمرات لوس أنجلوس', en:'ISEF 2027 – Los Angeles Convention Center', date:'2027-05-08', end:'2027-05-14' }
    ]
  },
  resources:[
    { ar:'القواعد والإرشادات الدولية لـ ISEF', en:'ISEF International Rules & Guidelines', url:'https://www.societyforscience.org/isef/international-rules/', type:'link' },
    { ar:'مواصفات لوحة العرض (موهبة)', en:'Display board specifications (Mawhiba)', url:'https://www.mawhiba.sa/media/es2aaggt/displaypanel2019.pdf', type:'pdf' }
  ],
  training:{
    ar:['يتولى برنامج موهبة الإعدادي تدريب منتخب المملكة.',
        'دور المدرسة: دعم الطالب وتفريغه للتدريب، وتوفير مساحة للتجريب.',
        'التدرب على العرض والمناقشة بالإنجليزية أمام لجنة محاكية من المعلمين.',
        'مراجعة توافق المشروع مع القواعد الدولية ونماذجها مبكراً.'],
    en:['Mawhiba’s preparation program trains the national team.',
        'The school’s role: support the student, allow time for training and provide space for experiments.',
        'Rehearse presenting in English before a mock panel of teachers.',
        'Check compliance with international rules and forms early.']
  },
  sources:['https://www.societyforscience.org/isef/','https://youthscience.ca/science-fairs/team-canada/events/regeneron-isef-2027/','https://www.mawhiba.sa/en/discover-mawhiba/competitions/national-gifted-olympiad/']
},

/* ───────────────────────── WRO ───────────────────────── */
{
  id:'wro', field:'robotics', color:'#F07B0F', icon:'robot',
  stages:['primary','intermediate','secondary'],
  name:{ ar:'الأولمبياد العالمي للروبوت WRO', en:'World Robot Olympiad (WRO)' },
  short:{ ar:'أولمبياد الروبوت WRO', en:'WRO Robotics' },
  organizer:{ ar:'موهبة بالشراكة مع وزارة التعليم', en:'Mawhiba in partnership with the Ministry of Education' },
  summary:{
    ar:'مسابقة عالمية سنوية للروبوت والابتكار والعمل الجماعي لأعمار 8–22 عاماً، بفرق من 2–3 طلاب، تنتهي باختيار منتخب المملكة للنهائي العالمي.',
    en:'An annual global robotics, innovation and teamwork competition for ages 8–22, in teams of 2–3, ending with selection of the Saudi team for the world final.'
  },
  about:{
    ar:['الأولمبياد العالمي للروبوت WRO مسابقة دولية سنوية تشرف عليها جمعية WRO، يتنافس فيها طلاب من نحو 100 دولة في تصميم الروبوتات وبرمجتها وحل التحديات الهندسية.',
        'تنظم موهبة المسابقة في المملكة بالشراكة مع وزارة التعليم، عبر ثلاث مراحل: التسجيل والتأهيل، ثم التصفيات الوطنية، ثم النهائي الوطني لاختيار منتخب المملكة. موضوع موسم 2026: «الروبوتات والثقافة» — توظيف الروبوتات والذكاء الاصطناعي لحماية التراث الثقافي وترميمه ورقمنته، والنهائي العالمي 2026 في بورتوريكو.'],
    en:['WRO is an annual international competition overseen by the WRO Association, with students from about 100 countries designing and programming robots to solve engineering challenges.',
        'Mawhiba organizes it in Saudi Arabia with the Ministry of Education in three stages: registration and qualification, national qualifiers, and the national final to select the Saudi team. The 2026 theme is "Robots and Culture" — using robotics and AI to protect, restore and digitize cultural heritage; the 2026 world final is in Puerto Rico.']
  },
  facts:[
    { k:{ar:'الأعمار',en:'Ages'}, v:{ar:'8–22 عاماً حسب الفئة',en:'8–22 by category'} },
    { k:{ar:'نوع المشاركة',en:'Participation'}, v:{ar:'فريق من 2–3 طلاب ومدرب',en:'Team of 2–3 students + coach'} },
    { k:{ar:'العتاد',en:'Hardware'}, v:{ar:'اختيار حر وفق قواعد الفئة',en:'Free choice per category rules'} },
    { k:{ar:'موضوع 2026',en:'2026 theme'}, v:{ar:'الروبوتات والثقافة',en:'Robots and Culture'} }
  ],
  table:{
    title:{ ar:'فئات المسابقة', en:'Competition categories' },
    head:{ ar:['الفئة','الأعمار','الفريق','حجم الروبوت'], en:['Category','Ages','Team','Robot size'] },
    rows:[
      { ar:['المهمة الروبوتية RoboMission','ابتدائي 8–12، ناشئين 11–15، كبار 14–19','2–3 طلاب + مدرب','حتى 25×25×25 سم'], en:['RoboMission','Elementary 8–12, Junior 11–15, Senior 14–19','2–3 + coach','Up to 25×25×25 cm'] },
      { ar:['رياضات الروبوت RoboSports','11–19','2–3 طلاب + مدرب','حتى 20×20×20 سم و1.2 كجم'], en:['RoboSports','11–19','2–3 + coach','Up to 20×20×20 cm, 1.2 kg'] },
      { ar:['المبتكرون المستقبليون Future Innovators','ابتدائي 8–12، ناشئين 11–15، كبار 14–19','2–3 طلاب + مدرب','جناح 2×2×2 م'], en:['Future Innovators','Elementary 8–12, Junior 11–15, Senior 14–19','2–3 + coach','Booth 2×2×2 m'] },
      { ar:['مهندسو المستقبل Future Engineers','14–22','2–3 طلاب + مدرب','حتى 30×20×30 سم'], en:['Future Engineers','14–22','2–3 + coach','Up to 30×20×30 cm'] }
    ]
  },
  links:[
    { ar:'رابط التسجيل (موهبة)', en:'Registration (Mawhiba)', url:'https://s.mawhiba.sa/ROB', primary:true, register:true },
    { ar:'الموقع الدولي لـ WRO', en:'WRO Association', url:'https://wro-association.org' },
    { ar:'فئات المسابقة وقواعدها', en:'Categories & rules', url:'https://wro-association.org/competition/categories/' }
  ],
  conditions:{
    ar:['أن يكون عمر الطالب أو الطالبة بين 8 و22 عاماً وفق الفئة العمرية المختارة.',
        'المشاركة في فريق من 2–3 طلاب مع مدرب.',
        'الالتزام بقواعد الفئة وأبعاد الروبوت والقواعد العامة لـ WRO لموسم المسابقة.',
        'التسجيل عبر موقع موهبة خلال فترة التسجيل.',
        'اجتياز التصفيات للتأهل إلى النهائي الوطني.'],
    en:['Students aged 8–22 according to the chosen age group.',
        'Compete as a team of 2–3 students with a coach.',
        'Follow the category rules, robot size limits and WRO general rules for the season.',
        'Register through Mawhiba within the registration period.',
        'Pass the qualifiers to reach the national final.']
  },
  register:{
    ar:['تكوين الفريق (2–3 طلاب) وتحديد المدرب من المعلمين.',
        'اختيار الفئة والفئة العمرية المناسبة.',
        'التسجيل عبر رابط موهبة s.mawhiba.sa/ROB.',
        'دراسة قواعد الموسم وتحدياته المنشورة على موقع WRO.',
        'المشاركة في مرحلة التأهيل ثم التصفيات الوطنية.'],
    en:['Form the team (2–3 students) and assign a teacher coach.',
        'Choose the category and age group.',
        'Register via the Mawhiba link s.mawhiba.sa/ROB.',
        'Study the season rules and challenges on the WRO website.',
        'Take part in qualification, then the national qualifiers.']
  },
  timeline:{
    label:{ ar:'مراحل موسم 2026', en:'2026 season stages' },
    items:[
      { ar:'التسجيل والتأهيل', en:'Registration & qualification', when:{ar:'بدأ التسجيل في أغسطس 2026',en:'Registration opened August 2026'} },
      { ar:'التصفيات الوطنية', en:'National qualifiers', when:{ar:'وفق إعلان موهبة',en:'As announced by Mawhiba'} },
      { ar:'النهائي الوطني لاختيار منتخب المملكة', en:'National final – Saudi team selection', when:{ar:'وفق إعلان موهبة',en:'As announced by Mawhiba'} },
      { ar:'النهائي العالمي – بورتوريكو', en:'World final – Puerto Rico', when:{ar:'موسم 2026',en:'2026 season'} }
    ]
  },
  resources:[
    { ar:'قواعد الفئات وتحديات الموسم (WRO)', en:'Category rules & season challenges (WRO)', url:'https://wro-association.org/competition/categories/', type:'link' },
    { ar:'محاكي روبوت سبايك – منصة مهارات القرن 21', en:'SPIKE robot simulator – 21st Century Skills platform', url:'https://moustafaahussien.github.io/21csu/spike-simulator.html', type:'link' }
  ],
  training:{
    ar:['تدريب أسبوعي للفرق على بناء الروبوت وبرمجته بإشراف المدرب.',
        'التدرّب على مهام الموسم الرسمية على طاولة مطابقة للمقاسات.',
        'استخدام محاكي سبايك في منصة مهارات القرن 21 للتدرب على البرمجة قبل العمل على الروبوت.',
        'جولات محاكاة بالتوقيت الرسمي، وتوثيق التحسينات في دفتر هندسي.',
        'ربط الفرق ببرنامج الروبوت والطباعة ثلاثية الأبعاد في وحدة مهارات القرن 21.'],
    en:['Weekly team training on building and programming, led by the coach.',
        'Practice the official season missions on a regulation-size table.',
        'Use the SPIKE simulator on the 21st Century Skills platform to practise coding before using the robot.',
        'Timed mock rounds and an engineering notebook of improvements.',
        'Link teams with the Robotics & 3D Printing program of the 21st Century Skills Unit.']
  },
  sources:['https://sabq.org/article/03g6gu8','https://www.gdnonline.com/Details/1404346/Mawhiba-opens-registration-for-2026-World-Robot-Olympiad','https://wro-association.org/competition/categories/']
}

];
