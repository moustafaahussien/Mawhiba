/* =========================================================
   منصة الموهبة – مكونات النموذج التام لتطوير الموهبة (المحتوى الثابت)
   ---------------------------------------------------------
   - المصدر: كتاب «النموذج التام لتطوير الموهبة» — د. عادل عبدالجليل بترجي
     (ديبونو، 2011).
   - كل مكوّن كائن واحد، وصفحته: component.html?c=<id>
   - المكوّن الذي اكتمل محتواه يأخذ ready:true، والبقية تظهر «قيد الإعداد».
   - البيانات المتغيرة (حالة التفعيل، المسؤول، مجلد المصادر، وحدات هذا العام)
     تأتي من جدول بيانات المنصة: تبويبا «المكونات» و«وحدات المكونات».
   ========================================================= */
window.TP_COMPONENTS = [
  /* =====================================================
     المكوّن الأول: السجل التام لتطور الموهبة
     ===================================================== */
  { id:'record', n:1, color:'#D99A06', icon:'file', ready:true, staffPage:'sijil.html',
    titles:{ content:{ ar:'مكونات السجل ومعايير الكشف', en:'Record parts & identification criteria' }, impact:{ ar:'نتائج الكشف الشامل', en:'Identification results' } },
    name:{ ar:'السجل التام لتطور الموهبة', en:'Giftedness Development Total Record' },
    short:{ ar:'السجل التام', en:'Total Record' }, who:{ ar:'كل طالب', en:'Every student' },
    summary:{
      ar:'وسيلة منهجية إجرائية لجمع المعلومات الدالة على الموهبة وتدوينها وتفعيلها، ومن ثم متابعة تطور الموهبة وتوظيفها؛ يرافق الطالب في كل مراحل تطوره، ويتقبّل إضافة المعلومات في أي وقت.',
      en:'A systematic, procedural tool to collect, record and activate information indicating giftedness, then follow its development and use; it accompanies the student at every stage and accepts new information at any time.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الأول من تسعة', en:'Component 1 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'كل طالب', en:'Every student' } },
      { k:{ ar:'أجزاؤه', en:'Parts' }, v:{ ar:'الوضع الراهن · خطة التطوير · التطور', en:'Current status · Plan · Progress' } },
      { k:{ ar:'نماذج السجل', en:'Record forms' }, v:{ ar:'27 نموذجاً (الملحق 1)', en:'27 forms (Appendix 1)' } }
    ],
    about:{
      ar:[
        'يعتبر السجل التام لتطور الموهبة وسيلة منهجية إجرائية لجمع وتدوين وتفعيل المعلومات الدالة على الموهبة، ومن ثم متابعة تطور الموهبة وتوظيفها.',
        'جرى تصميم مكونات السجل بطريقة يتمكن من خلالها المهتمون والقائمون على تطوير قدرات الطلاب الإبداعية من هيئة التدريس وأولياء الأمور من جمع معلومات عديدة ومختلفة ودالة على مكامن التميز لدى الطالب صاحب السجل، وكذلك تحديثها بصفة دورية.',
        'وتمكّن مكونات السجل من تصنيف المعلومات في مجموعات عامة تتمثل في: القدرات، والسمات السلوكية، والاهتمامات، وأساليب التعلم والتعبير والتفكير المفضلة لدى الطالب. ويتميز السجل بكونه مرناً يتقبل إضافة المعلومات التي تخص مكوناته في أي مرحلة من مراحل التطور التي يمر بها الطالب.'
      ],
      en:[
        'The Total Record is a systematic, procedural tool for collecting, recording and activating information that indicates giftedness, and then following that giftedness as it develops and is put to use.',
        'Its parts let those who develop students’ creative abilities — teachers and parents — gather many different kinds of information pointing to the student’s areas of excellence, and update them regularly.',
        'The record sorts information into general groups: abilities, behavioral traits, interests, and the student’s preferred learning, expression and thinking styles. It is flexible, accepting new information at any stage of the student’s development.'
      ] },
    cards:{ t:{ ar:'مكونات السجل الثلاثة', en:'The three parts of the record' }, items:[
      { icon:'info', t:{ ar:'معلومات الوضع الراهن', en:'Current-status information' },
        d:{ ar:'توثّق المعلومات المعروفة حالياً عن الطالب صاحب السجل، وتشمل سجله الأكاديمي ونتائج قياس اختبارات القدرات والذكاء والابتكار.', en:'Documents what is currently known about the student: the academic record and results of ability, intelligence and creativity tests.' },
        chips:{ ar:['السجل الأكاديمي','القدرات المتعددة','السمات السلوكية','الاهتمامات','أسلوب التعلم','أسلوب التعبير','أسلوب التفكير'], en:['Academic record','Multiple abilities','Behavioral traits','Interests','Learning style','Expression style','Thinking style'] } },
      { icon:'target', t:{ ar:'معلومات خطة التطوير', en:'Development-plan information' },
        d:{ ar:'تحوي معلومات الخطة الموضوعة لتطوير مكامن الموهبة والإبداع لدى الطالب، وتُعدّ بعد تحديد طلاب الوعاء الإثرائي.', en:'Holds the plan drawn up to develop the student’s talent and creativity, prepared once the enrichment-pool students are identified.' },
        chips:{ ar:['الأهداف','البرامج','الأبعاد الزمنية','أساليب التقييم'], en:['Goals','Programs','Timeframes','Evaluation methods'] } },
      { icon:'chart', t:{ ar:'معلومات التطور', en:'Progress information' },
        d:{ ar:'تحوي المستجدات التي اكتسبها الطالب من خلال تطبيق خطة التطوير، وتُستكمل أثناء تفاعله مع محتويات النموذج.', en:'Holds what the student gains through the development plan, completed as the student works through the model.' } }
    ] },
    criteria:{ t:{ ar:'معايير الكشف الشامل لتحديد الوعاء الإثرائي', en:'Comprehensive identification criteria for the enrichment pool' },
      intro:{ ar:'لا يعتمد الكشف على معيار واحد، بل يستخدم أسلوب نقاط القطع المتعددة، ثم أسلوب دراسة الحالة للتأكد من عدم إغفال أي طالب يستحق الانضمام. والمعايير التي نص عليها النموذج:', en:'Identification does not rely on a single criterion: it uses multiple cut-off points, then case study to make sure no deserving student is missed. The model’s criteria:' },
      rows:[
        { k:{ ar:'اختبار القدرات العقلية', en:'Mental abilities test' }, v:{ ar:'110 نقاط فأكثر', en:'110 points or more' } },
        { k:{ ar:'اختبار تورانس للتفكير الابتكاري', en:'Torrance test of creative thinking' }, v:{ ar:'110 نقاط فأكثر', en:'110 points or more' } },
        { k:{ ar:'المستوى الأكاديمي', en:'Academic level' }, v:{ ar:'90% فأكثر', en:'90% or more' } },
        { k:{ ar:'الذكاءات المتعددة', en:'Multiple intelligences' }, v:{ ar:'80% فأكثر في فرع واحد على الأقل', en:'80% or more in at least one branch' } },
        { k:{ ar:'السمات السلوكية', en:'Behavioral traits' }, v:{ ar:'التحفيز 5.3 نقطة، والابتكار والقيادة 4.3 نقطة لكل منهما', en:'Motivation 5.3; creativity and leadership 4.3 each' } },
        { k:{ ar:'مواضيع الاهتمام', en:'Interest areas' }, v:{ ar:'3.34 نقطة في أي فرع', en:'3.34 points in any branch' } }
      ] },
    steps:[
      { ar:'فتح سجل الطالب بتسجيل المعلومات الأساسية: الاسم الرباعي، ورقم البطاقة الشخصية / العائلة / الإقامة، وتاريخ ومكان الميلاد، والسنة الدراسية الحالية.', en:'Open the student’s record with basic information: full name, ID / family card / residence number, date and place of birth, and current grade.', f:['7'] },
      { ar:'تسجيل معلومات الوضع الراهن: السجل الأكاديمي للسنوات السابقة، ونتائج قياس القدرات المتعددة، ونتائج الدورات التدريبية حال استكمالها.', en:'Record current-status information: past academic record, multiple-abilities results, and results of completed training courses.', f:['1'] },
      { ar:'تطبيق قياس السمات السلوكية.', en:'Apply the behavioral-traits measure.', f:['2'] },
      { ar:'تطبيق قياسات معرفة اهتمامات الطلاب في المجالات الخمسة.', en:'Apply the interest measures in the five fields.', f:['3-1','3-2','3-3','3-4','3-5'] },
      { ar:'معرفة أسلوب التعلم المفضل، وأسلوب التعبير المفضل.', en:'Identify the preferred learning style and preferred expression style.', f:['4','5'] },
      { ar:'معرفة أسلوب التفكير المفضل بمقاييس حصر أسلوب التفكير الأربعة عشر.', en:'Identify the preferred thinking style using the fourteen thinking-style inventories.', f:['6-1','6-14'] },
      { ar:'بعد تحديد طلاب الوعاء الإثرائي: إتمام خطة التطوير للطلاب المستهدفين (الأهداف، والبرامج، والأبعاد الزمنية، وأساليب التقييم)، ومؤشرات تطبيقها.', en:'Once the enrichment pool is set: complete the development plan (goals, programs, timeframes, evaluation methods) and its indicators.', f:['8','9'] },
      { ar:'استكمال معلومات التطور أثناء تطبيق خطة التطوير، وهي المستجدات التي تطرأ على سجل الطالب أثناء تفاعله مع محتويات النموذج.', en:'Complete progress information while the plan runs — the changes in the student’s record as he engages with the model.', f:['10'] }
    ],
    forms:[
      { no:'1', ar:'معلومات الوضع الراهن', en:'Current-status information' },
      { no:'2', ar:'حصر السمات السلوكية', en:'Behavioral traits inventory' },
      { no:'3-1', ar:'نموذج قياس الاهتمام باللغة والقراءة', en:'Interest in language and reading' },
      { no:'3-2', ar:'نموذج قياس الاهتمام بالرياضيات', en:'Interest in mathematics' },
      { no:'3-3', ar:'نموذج قياس الاهتمام بالعلوم', en:'Interest in science' },
      { no:'3-4', ar:'نموذج قياس الاهتمام بالعلوم الاجتماعية', en:'Interest in social studies' },
      { no:'3-5', ar:'نموذج قياس الاهتمام بالفنون', en:'Interest in the arts' },
      { no:'4', ar:'حصر أسلوب التعلم المفضل', en:'Preferred learning style' },
      { no:'5', ar:'حصر أسلوب التعبير المفضل', en:'Preferred expression style' },
      { no:'6-1', ar:'حصر أسلوب التفكير المفضل (المقدرة على التصور)', en:'Thinking style: ability to visualize' },
      { no:'6-2', ar:'حصر أسلوب التفكير المفضل (العمل للمستقبل والتخطيط له)', en:'Thinking style: working and planning for the future' },
      { no:'6-3', ar:'حصر أسلوب التفكير المفضل (قوة التأثير في الآخرين)', en:'Thinking style: influence on others' },
      { no:'6-4', ar:'حصر أسلوب التفكير المفضل (سعة الخيال)', en:'Thinking style: breadth of imagination' },
      { no:'6-5', ar:'حصر أسلوب التفكير المفضل (مستوى الجرأة)', en:'Thinking style: level of boldness' },
      { no:'6-6', ar:'حصر أسلوب التفكير المفضل (مستوى التذوق الفني)', en:'Thinking style: artistic taste' },
      { no:'6-7', ar:'حصر أسلوب التفكير المفضل (القدرة على التواضع)', en:'Thinking style: humility' },
      { no:'6-8', ar:'حصر أسلوب التفكير المفضل (القدرة على الإدارة)', en:'Thinking style: management' },
      { no:'6-9', ar:'حصر أسلوب التفكير المفضل (القدرة على المناقشة والمساومة)', en:'Thinking style: discussion and negotiation' },
      { no:'6-10', ar:'حصر أسلوب التفكير المفضل (تقديم المصلحة العامة)', en:'Thinking style: putting the public interest first' },
      { no:'6-11', ar:'حصر أسلوب التفكير المفضل (القدرة على اتخاذ قرار مستقبلي)', en:'Thinking style: making future decisions' },
      { no:'6-12', ar:'حصر أسلوب التفكير المفضل (الحكم على الأمور)', en:'Thinking style: judging matters' },
      { no:'6-13', ar:'حصر أسلوب التفكير المفضل (تحقيق العدالة)', en:'Thinking style: achieving justice' },
      { no:'6-14', ar:'حصر أسلوب التفكير المفضل (التمسك بالحق)', en:'Thinking style: holding to what is right' },
      { no:'7', ar:'حصر المعلومات الأساسية', en:'Basic information' },
      { no:'8', ar:'خطة التطوير', en:'Development plan' },
      { no:'9', ar:'مؤشرات تطبيق خطة التطوير', en:'Development-plan indicators' },
      { no:'10', ar:'نموذج معلومات تطور الموهبة', en:'Talent progress information' }
    ],
    formsNote:{ ar:'النماذج منشورة في الملحق رقم (1) من الكتاب، ومتاحة إلكترونياً للمعلمين في صفحات «السجل التام» على المنصة.', en:'The forms are published in Appendix 1 of the book and available electronically to teachers in the platform’s "Total Record" pages.' },
    study:{
      intro:{ ar:'طُبّقت إجراءات الكشف الشامل على طلاب الصفين الخامس والسادس الابتدائي وجميع طلاب المرحلتين المتوسطة والثانوية (363 طالباً بعد استبعاد طالبين انتقلا إلى مدارس أخرى).', en:'Comprehensive identification was applied to grades 5–6 and all intermediate and secondary students (363 students after two transferred out).' },
      figures:[
        { v:'83', l:{ ar:'طالباً تجاوزوا نقاط القطع (22.87%)', en:'students passed the cut-offs (22.87%)' } },
        { v:'22', l:{ ar:'طالباً أضيفوا بدراسة الحالة (6.06%)', en:'students added through case study (6.06%)' } },
        { v:'105', l:{ ar:'طالباً في الوعاء الإثرائي (28.93% ممن طُبّق عليهم الكشف)', en:'enrichment-pool students (28.93% of those screened)' } },
        { v:'20', l:{ ar:'طالباً في النوع III (2.48% من طلاب عينة الدراسة)', en:'Type III students (2.48% of the study sample)' } }
      ],
      notes:{
        ar:['لم توجد فروق ذات دلالة إحصائية بين توزيع الطلاب الذين جرى التعرف عليهم بإجراءات الكشف الشامل في النموذج التام وبين التوزيع المستخدم في نموذج الإثراء الثلاثي لرنزولي.',
            'يرى الباحث أن تطبيق مفهوم الموهبة بوصفها «مزيجاً متجانساً» قد وسّع فرص استيعاب الطلاب في الوعاء الإثرائي، وقلّل من فرص فقدان بعضهم.'],
        en:['There was no statistically significant difference between the distribution of students identified by the model’s comprehensive procedures and the distribution used in Renzulli’s Enrichment Triad Model.',
            'The researcher concludes that treating giftedness as a "harmonious blend" widened access to the enrichment pool and reduced the chance of missing students.'] }
    }
  },

  /* =====================================================
     المكوّن الثاني: برنامج الإثراء العام
     ===================================================== */
  { id:'general-enrichment', n:2, color:'#0EA5D6', icon:'globe', ready:true,
    name:{ ar:'برنامج الإثراء العام', en:'General Enrichment Program' },
    short:{ ar:'الإثراء العام', en:'General Enrichment' },
    who:{ ar:'عموم الطلاب — النوع I', en:'All students — Type I' },
    summary:{
      ar:'وحدات إثرائية موجّهة إلى عموم الطلاب، تعرّضهم لمجموعة عريضة ومتنوعة من أفرع المعرفة والمواضيع والمهن والهوايات والأعلام والأماكن والأحداث التي لا تحتويها المناهج الدراسية، عبر وسائل متعددة تلائم الطرق المختلفة التي يستقي بها الطلاب المعرفة.',
      en:'Enrichment units for all students that expose them to a broad variety of knowledge, topics, careers, hobbies, notable figures, places and events not covered by the curriculum — through many media suited to the different ways students take in knowledge.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الثاني من تسعة', en:'Component 2 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'عموم الطلاب (النوع I)', en:'All students (Type I)' } },
      { k:{ ar:'وحدة العمل', en:'Unit of work' }, v:{ ar:'وحدة إثرائية خارج المنهج', en:'An out-of-curriculum enrichment unit' } },
      { k:{ ar:'نماذج البرنامج', en:'Program forms' }, v:{ ar:'13 نموذجاً (الملحق 2)', en:'13 forms (Appendix 2)' } }
    ],

    /* التعريف */
    about:{
      ar:[
        'يتكون برنامج الإثراء العام من مجموعة من الوحدات المصاغة لتحقيق الأهداف العامة والتفصيلية للبرنامج، والموجّهة نحو شريحة عموم الطلاب.',
        'ويهدف البرنامج إلى تعريض الطلاب إلى مجموعة عريضة ومتنوعة من أفرع المعرفة المختلفة والمواضيع الإثرائية المتعددة، والمهن، والهوايات، والأعلام، والأماكن، والأحداث التي لا تحتويها المناهج الدراسية؛ وذلك من خلال وسائل متعددة تلائم الطرق المختلفة التي يستقي من خلالها الطلاب المعلومات والمعارف، مثل المحاضرين وسبل العرض المختلفة من أفلام وشرائح مرئية ومطويات ومطبوعات وكتب.',
        'وهو المكوّن الثاني من مكونات النموذج التام لتطوير الموهبة التسعة، ويخدم مستوى النوع الأول (جميع الطلاب): ففي التطبيق الميداني صُنّف جميع طلاب عينة الدراسة بحسب صفوفهم الدراسية وعُرّضوا لبرامج الإثراء العام، ومنه تنطلق الإشارات الأولى لاهتمامات الطلاب ومواطن قوتهم التي توجّههم إلى بقية مكونات النموذج.'
      ],
      en:[
        'The General Enrichment Program consists of a set of units designed to achieve the program’s general and detailed goals, aimed at the whole student body.',
        'It exposes students to a broad and varied range of branches of knowledge, enrichment topics, careers, hobbies, notable figures, places and events that the school curriculum does not contain — through multiple media suited to the different ways students take in information, such as guest speakers and various presentation forms: films, slides, leaflets, publications and books.',
        'It is the second of the nine components of the Total Giftedness Development Model and serves Type I (all students): in the field implementation every student in the study sample was grouped by grade and exposed to General Enrichment, which provides the first signals of students’ interests and strengths that guide them into the model’s other components.'
      ] },

    /* الأهداف التفصيلية */
    goals:{
      ar:[
        'إثراء الجوانب المعرفية والحياتية لجميع الطلاب على اختلاف أعمارهم ومستوياتهم الأكاديمية ومقدراتهم الذهنية واهتماماتهم الحياتية وخلفياتهم الاجتماعية، من خلال توسعة نطاق مجالات المعرفة خارج حدود المناهج الدراسية.',
        'إتاحة الفرصة لمواطن القوة والموهبة والاهتمام للظهور والاكتشاف، من خلال إثارة جوانب معرفية جديدة لدى الطلاب.',
        'إتاحة الفرصة لتوجيه الطلاب للمشاركة في المكونات الأخرى من النموذج.',
        'إيجاد أرضية مناسبة يتمكن من خلالها القائمون على تنفيذ النموذج من التعرف على رغبات الطلاب واهتماماتهم وقدراتهم الذهنية، وبالتالي استكمال بيانات ملفاتهم التطويرية وتوجيه تطورهم المعرفي والأكاديمي بطريقة أفضل وأدق.',
        'توفير المعرفة في قوالب مختلفة تناسب الوسائل المتعددة التي يستخدمها الطلاب في التحصيل، في جو من المتعة والإثارة.',
        'تشجيع المشاركة الفعالة للطلاب.'
      ],
      en:[
        'Enrich the knowledge and life skills of all students — whatever their age, academic level, mental ability, interests and social background — by widening the fields of knowledge beyond the curriculum.',
        'Give strengths, talents and interests the chance to surface and be discovered by sparking new areas of knowledge.',
        'Create the opportunity to guide students into the model’s other components.',
        'Provide a basis for those running the model to learn students’ wishes, interests and mental abilities, so they can complete students’ development files and guide their growth more accurately.',
        'Offer knowledge in different formats that suit the many ways students learn, in an atmosphere of enjoyment and excitement.',
        'Encourage students’ active participation.'
      ] },

    /* فروع المحتوى ووسائل التقديم — نموذج الإثراء العام 1-1 */
    branches:{
      ar:['الأعلام','التاريخ','الثقافة العامة','التربية الاجتماعية','العلوم','الجغرافيا','الفلك','الحيوانات','النبات','الاقتصاد','الصحة','التربية البدنية','السلوك','أخرى'],
      en:['Notable figures','History','General culture','Social education','Science','Geography','Astronomy','Animals','Plants','Economics','Health','Physical education','Behavior','Other']
    },
    means:[
      { t:{ ar:'الوسائل البشرية', en:'Human media' }, icon:'users',
        ar:['متحدث','مجموعة عمل','عرض عملي','عرض فني','حلقة نقاش','تواصل عبر الإنترنت','أخرى'],
        en:['Speaker','Workgroup','Practical demonstration','Artistic performance','Discussion circle','Online communication','Other'] },
      { t:{ ar:'الوسائل المعروضة', en:'Presented media' }, icon:'video',
        ar:['فيلم سينمائي','مقاطع من أفلام','عرض شرائح','شريط سمعي','شريط فيديو','برنامج تلفزيوني','جريدة يومية / مجلة','برنامج كمبيوتر','أخرى'],
        en:['Feature film','Film clips','Slide show','Audio recording','Video recording','TV program','Newspaper / magazine','Computer program','Other'] },
      { t:{ ar:'وسائل أخرى', en:'Other media' }, icon:'pin',
        ar:['معروضات معلّقة','رحلات ميدانية','زيارة شخص','زيارة مراكز التعلم','الإنترنت','أخرى'],
        en:['Hanging exhibits','Field trips','A guest visit','Visits to learning centers','The internet','Other'] }
    ],
    meansNote:{
      ar:'يرصد «نموذج فقرات البرنامج الإثرائي العام» توزيع الوحدات على هذه الفروع والوسائل لكل فئة وصف دراسي، حتى يتحقق التنوع المطلوب.',
      en:'The "General Enrichment Program Items" form maps units across these branches and media for each group and grade, to secure the required variety.' },
    recs:[{
      ar:'من توصيات الدراسة: تضمين برامج الإثراء العام والمشاريع الهادفة الشخصيات الهامة في الموسوعة العربية والإسلامية مثل ابن أصيبعة، وابن النديم، وابن خلقان، والاستفادة من تراث المنتجات العلمية لأمثال ابن الهيثم، وابن سينا، والخوارزمي في مشاريع ودراسات للموهبة.',
      en:'A study recommendation: include major figures of the Arab and Islamic encyclopedic heritage — such as Ibn Abi Usaybi‘a, Ibn al-Nadim and Ibn Khallikan — in General Enrichment and Targeted Projects, and draw on the scientific legacy of figures like Ibn al-Haytham, Ibn Sina and al-Khwarizmi in talent projects and studies.' }],

    /* آلية التنفيذ */
    steps:[
      { ar:'اختيار عناوين وحدات البرنامج وتوزيعها على فروع المحتوى والفئات والصفوف.', en:'Choose the unit titles and spread them across content branches, groups and grades.', f:['1-1','1-2'] },
      { ar:'اختيار مصادر معلومات كل وحدة، وتوثيقها في دليل للمصادر (الجهة، والعنوان، والمواد المتوفرة، ووسيلة العرض، والتكاليف).', en:'Choose each unit’s information sources and record them in a resource guide (provider, address, available materials, presentation medium, costs).', f:['2-1','2-2'] },
      { ar:'اختيار وسائل تقديم الوحدات بما يحقق التنوع بين الوسائل البشرية والمعروضة والوسائل الأخرى.', en:'Choose delivery media, balancing human, presented and other media.', f:['1-1'] },
      { ar:'جدولة الوحدات والإعلان عن مواعيد تقديمها.', en:'Schedule the units and announce their dates.', f:[] },
      { ar:'تقديم الوحدة، وتوثيق اهتمامات الطلاب خلالها، ورصد أسماء الطلاب الذين أبدوا اهتماماً عالياً بالمادة المقدمة.', en:'Deliver the unit, document students’ interests during it, and note the students who showed high interest in the material.', f:['3'] },
      { ar:'عقد حلقة نقاش للطلاب الذين أبدوا اهتماماً فوق العادة، لإثراء التجربة وتوثيق الملاحظات التي قد تقود إلى اكتشاف مواطن الموهبة والإبداع.', en:'Hold a discussion circle for students who showed unusual interest, to deepen the experience and record observations that may reveal talent and creativity.', f:['6-1','6-2'] },
      { ar:'توجيه كل طالب مشارك نحو مستوى إثرائي أعمق: برنامج إثرائي فردي، أو تطوير مهاراته في برنامج تنمية المهارات، أو المشاركة في برنامج التدريب على البحث العلمي.', en:'Guide each participant to a deeper level: an individual enrichment program, skill development, or training for scientific research.', f:['7'] },
      { ar:'مخاطبة ولي الأمر باقتراح برنامج إثرائي إضافي يلبي الحاجات المعرفية لابنه في الموضوع الذي أبدى فيه اهتماماً.', en:'Write to the parent proposing an additional enrichment program that meets the child’s needs in the topic of interest.', f:['8'] },
      { ar:'تقييم الوحدات والمدربين والوسائل والطلاب، وتقييم البرنامج كاملاً في نهاية كل فصل دراسي، وتوثيق أعماله.', en:'Evaluate units, trainers, media and students, evaluate the whole program at the end of each term, and document its work.', f:['4','5','9','10'] }
    ],

    /* موجّهات حلقة النقاش — نموذج الإثراء العام 6-1 */
    circle:{
      goal:{ ar:'الهدف من تكوين حلقة النقاش هو توجيه الفئة المشاركة من الطلاب لاستخدام مهارات التفكير العليا وإثراء النقاش بينهم، وذلك بطرح الأسئلة التي تساعد على تحقيق الهدف. وللمدرب حرية الإضافة إلى هذه الموجّهات إذا قدّر أن ذلك مناسب.',
             en:'The circle guides participating students to use higher-order thinking and enrich discussion among them by asking questions that serve this goal. The trainer may add to these prompts as appropriate.' },
      q:{
        ar:['ما هو الشيء الذي أعجبك أكثر من غيره في الوحدة المقدمة؟','من يعتقد أن هذه الوحدة كانت الأفضل مما قُدّم حتى الآن؟','من لديه أفكار حول المواضيع التي يمكن بحثها كامتداد لموضوع الوحدة المقدمة؟','ما هي الأسئلة التي أثارها موضوع الوحدة لديك؟ وهل يمكن البحث عن إجابات تلك الأسئلة؟','هل فكّر أحدكم في مشروع يمكن تطويره بناءً على الفكرة الأساسية التي طُرحت في الوحدة المقدمة؟ (خدمة اجتماعية تُقدَّم، أو مجموعة صور تُعرض، أو فيلم فيديو مصوّر… إلخ)','هل فكّر أحد فيمن يمكن أن يكون ضمن فريق ذلك المشروع؟','أين يمكن أن نحصل على معلومات إضافية عن موضوع الوحدة المقدمة؟','هل هناك مكان مثل مكتبة أو جهة احترافية تمثل مصدراً للمعلومات يمكن زيارتها أو غيرها؟','هل هناك من شخص لديه معلومات إضافية يمكن زيارته أو الاتصال به؟'],
        en:['What did you like most in this unit?','Who thinks this unit was the best one so far?','Who has ideas for topics we could research as an extension of this unit?','What questions did the unit raise for you? Can we search for their answers?','Has anyone thought of a project that could grow from the unit’s main idea? (a community service, a photo exhibition, a video film… etc.)','Has anyone thought about who could join that project’s team?','Where can we get more information about the unit’s topic?','Is there a place — a library or a professional body — that is a source of information we could visit?','Is there a person with more information whom we could visit or contact?']
      },
      end:{ ar:'في نهاية الحلقة يدوّن المدرب توجيهاته لكل طالب مشارك في «نموذج توجيه مشارك» (الإثراء العام-7).', en:'At the end of the circle the trainer records guidance for each participant in the "Participant Guidance" form (GE-7).' }
    },

    /* أدوات التقييم — نماذج الملحق 2 */
    evals:[
      { f:'10', icon:'users', t:{ ar:'تقييم أداء الطالب', en:'Student performance' },
        d:{ ar:'ثلاثة بنود بمقياس من 1 (منخفض) إلى 5 (مرتفع): المواظبة على الحضور، واهتمامات الطالب الإثرائية، والإثراء الإضافي — ومجموعها من 15.',
            en:'Three items on a 1 (low) – 5 (high) scale: attendance, enrichment interests and additional enrichment — a total out of 15.' },
        items:{ ar:['المواظبة على الحضور','الاهتمامات الإثرائية','الإثراء الإضافي'], en:['Attendance','Enrichment interests','Additional enrichment'] } },
      { f:'4', icon:'coach', t:{ ar:'تقييم أداء مدرب الوحدة', en:'Unit trainer performance' },
        d:{ ar:'14 بنداً مجموعها 47 درجة، منها: التحضير للوحدة (5)، واتباع إجراءات التقييم والتوثيق (5)، واستخلاص المعلومات من التلاميذ بدلاً من شرحها، وطرح الأسئلة المتنوعة والمثيرة للتفكير، وإعطاء الطلاب وقتاً كافياً للتفكير، واستخدام وسائل وتقنيات تربوية مناسبة (5).',
            en:'14 items totalling 47 points, including: preparing the unit (5), following evaluation and documentation procedures (5), eliciting information from students rather than explaining it, asking varied thought-provoking questions, giving enough thinking time, and using suitable educational media (5).' } },
      { f:'5', icon:'video', t:{ ar:'تقييم أداء الوسائل المستخدمة', en:'Media performance' },
        d:{ ar:'ملاءمة الوسيلة للمجال والفرع وللفئة المستهدفة، والوسيلة الأفضل في تقدير المقيّم، والأداء الفني للوسيلة، وأسلوب التقديم، ومستوى تفعيل مهارات التفكير لدى الفئة المستهدفة.',
            en:'How well the medium suits the field, branch and target group; the best alternative in the evaluator’s view; its technical quality; the presentation style; and how far it activated thinking skills.' } },
      { f:'9', icon:'list', t:{ ar:'تقييم البرنامج كاملاً', en:'Whole-program evaluation' },
        d:{ ar:'20 عنصراً بمقياس خماسي تُحوَّل إلى نسبة مئوية، كل فصل دراسي. من عناصره: مدى إثراء البرنامج للجوانب المعرفية والحياتية خارج المنهج، وظهور مواطن القوة والموهبة، والتنوع في العناوين والمصادر ووسائل التقديم، وملاءمة الجدول، وتحقق أهداف حلقات النقاش والتوجيه، والمشاركة الإيجابية لأولياء الأمور.',
            en:'20 criteria on a five-point scale converted to a percentage, every term — including enrichment beyond the curriculum, emergence of strengths and talent, variety of titles, sources and media, schedule fit, achievement of discussion and guidance goals, and positive parent participation.' } }
    ],

    /* نماذج البرنامج — الملحق 2 */
    forms:[
      { no:'1-1', ar:'فقرات البرنامج الإثرائي العام', en:'General enrichment program items', use:{ ar:'توزيع الوحدات على الفروع والوسائل لكل فئة وصف', en:'Map units to branches and media per group and grade' } },
      { no:'1-2', ar:'مفردات وحدة برنامج إثرائي عام', en:'Unit content outline', use:{ ar:'مسمّى الموضوع ومفرداته، والمرجع الأساسي، وفئة البرنامج، ووسيلة التقديم', en:'Topic, sub-items, main reference, group and medium' } },
      { no:'2-1', ar:'مصادر معلومات وحدات برنامج الإثراء العام', en:'Information sources for units', use:{ ar:'فهرس المصادر حسب الموضوع (أبجدياً)', en:'Source index by topic (alphabetical)' } },
      { no:'2-2', ar:'دليل المصادر', en:'Resource guide', use:{ ar:'بطاقة لكل مصدر: الجهة، والمواد المتوفرة، ووسيلة العرض، والتكاليف', en:'A card per source: provider, materials, medium, costs' } },
      { no:'3', ar:'تقييم وتوثيق اهتمامات الطلاب خلال وحدة برنامج الإثراء العام', en:'Evaluating and documenting students’ interests during a unit', use:{ ar:'وصف المادة وتفاعل الطلاب، وأسماء من أبدوا اهتماماً عالياً', en:'Material, student interaction, and those showing high interest' } },
      { no:'4', ar:'تقييم أداء مدرب وحدة برنامج إثرائي عام', en:'Unit trainer performance', use:{ ar:'14 بنداً — 47 درجة', en:'14 items — 47 points' } },
      { no:'5', ar:'تقييم أداء الوسائل المستخدمة في وحدة برنامج إثراء عام', en:'Media performance in a unit', use:{ ar:'ملاءمة الوسيلة وأداؤها الفني وأثرها في التفكير', en:'Suitability, technical quality and effect on thinking' } },
      { no:'6-1', ar:'موجّهات حلقة نقاش وحدة برنامج إثراء عام', en:'Discussion circle prompts', use:{ ar:'أسئلة تقود النقاش نحو مهارات التفكير العليا', en:'Questions steering toward higher-order thinking' } },
      { no:'6-2', ar:'قائمة الطلبة المشاركين في حلقة نقاش وحدة برنامج الإثراء العام', en:'Discussion circle participants list', use:{ ar:'الطالب، وعدد مرات التكرار، والسنة الدراسية، والفصل', en:'Student, number of times, grade and class' } },
      { no:'7', ar:'توجيه مشارك في وحدة برنامج الإثراء العام', en:'Participant guidance', use:{ ar:'ملاحظات على تفاعل الطالب ومقترحات توجيهه لمستوى إثرائي أعمق', en:'Notes on the student and proposals for deeper enrichment' } },
      { no:'8', ar:'خطاب ولي أمر الطالب بخصوص تطبيق برنامج إثرائي إضافي', en:'Letter to the parent on an additional enrichment program', use:{ ar:'اقتراح برنامج إضافي يلبي الحاجات المعرفية للطالب', en:'Proposes an extra program for the child’s needs' } },
      { no:'9', ar:'تقييم برنامج الإثراء العام', en:'General Enrichment program evaluation', use:{ ar:'20 عنصراً — نسبة مئوية لكل فصل', en:'20 criteria — a percentage per term' } },
      { no:'10', ar:'تقييم أداء الطالب في برنامج الإثراء العام', en:'Student performance in General Enrichment', use:{ ar:'3 بنود من 1 إلى 5 — المجموع من 15', en:'3 items, 1–5 — out of 15' } }
    ],
    formsNote:{
      ar:'النماذج منشورة في الملحق رقم (2) من الكتاب «نماذج المكون الثاني — برنامج الإثراء العام».',
      en:'The forms are published in Appendix 2 of the book, "Forms of the Second Component — General Enrichment Program".' },

    /* أثر البرنامج في الدراسة */
    study:{
      intro:{
        ar:'تابع الباحث أداء الطلاب المشاركين في برنامج الإثراء العام عام 2008م، ورصد نتائجهم في نهاية كل فصل دراسي في عناصر البرنامج: المواظبة على الحضور، ومستوى الاهتمام، والإثراء الإضافي، إضافة إلى التقييم العام. وبعد استبعاد طلاب الصف التمهيدي (23 طالباً) و15 طالباً التحقوا في منتصف العام، بلغت العينة 792 طالباً (95.42% من العينة الكلية البالغة 830 طالباً)، وقورنت نتائج الفصلين الأول والثاني باختبار (ت) عند مستوى دلالة 0.05.',
        en:'The researcher followed students in the General Enrichment Program in 2008, recording their results at the end of each term in the program’s elements — attendance, level of interest and additional enrichment — plus an overall evaluation. After excluding the preparatory class (23 students) and 15 students who joined mid-year, the sample was 792 students (95.42% of the full 830), and the two terms were compared with a t-test at the 0.05 level.' },
      rows:[
        { ar:'التقييم العام لأداء الطلاب', en:'Overall student performance', pre:3.22, post:3.40, t:7.23, sig:true },
        { ar:'الإثراء الإضافي', en:'Additional enrichment', pre:1.73, post:1.98, t:8.48, sig:true },
        { ar:'الاهتمامات الإثرائية', en:'Enrichment interests', pre:3.22, post:3.44, t:7.46, sig:true },
        { ar:'المواظبة على الحضور', en:'Attendance', pre:4.73, post:4.79, t:1.39, sig:false }
      ],
      scale:{ ar:'المتوسطات على مقياس من 1 إلى 5 · قيمة (ت) الحرجة 1.96', en:'Means on a 1–5 scale · critical t = 1.96' },
      notes:{
        ar:['الفروق في التقييم العام والإثراء الإضافي والاهتمامات الإثرائية دالة إحصائياً لصالح الفصل الثاني.',
            'لم يكن الفرق في المواظبة على الحضور دالاً، لأن الحضور كان مرتفعاً أصلاً، ولأن بعض الطلاب غابوا عن فعاليات البرنامج لمشاركتهم في تدريبات المناشط المختلفة التي تُجدول عادة في الفصل الثاني؛ ويرى الباحث أنها قضية عرضية يمكن تلافيها بإعادة جدولة الفقرات التي غاب عنها الطلاب.',
            'خلصت الدراسة إلى أن لبرنامج الإثراء العام في النموذج التام لتطوير الموهبة أثراً إيجابياً على أداء الطلاب المشاركين فيه، وتراوحت قيم (ت) المحققة فيه بين 7.22 و8.48.'],
        en:['Differences in overall performance, additional enrichment and enrichment interests were statistically significant in favor of the second term.',
            'Attendance did not differ significantly: it was already high, and some students missed sessions while training for other activities usually scheduled in the second term — an incidental issue the researcher suggests solving by rescheduling the missed sessions.',
            'The study concluded that the General Enrichment Program has a positive effect on participants’ performance, with t-values between 7.22 and 8.48.']
      }
    }
  },

  /* =====================================================
     المكوّن الثالث: برنامج تنمية المهارات
     ===================================================== */
  { id:'skills', n:3, color:'#7B4DFF', icon:'brain', ready:true,
    name:{ ar:'برنامج تنمية المهارات', en:'Skills Development Program' },
    short:{ ar:'تنمية المهارات', en:'Skills Development' }, who:{ ar:'عموم الطلاب والوعاء الإثرائي', en:'All students & enrichment pool' },
    summary:{
      ar:'وحدات تدريبية نظرية وتطبيقية تغطي في مجموعها حزمة المهارات اللازمة لتطوير المهارات المتنوعة للطلاب: مهارات التفكير، والمهارات الحياتية، ومهارات البحث العلمي.',
      en:'Theoretical and practical training units that together cover the package of skills students need: thinking skills, life skills and scientific research skills.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الثالث من تسعة', en:'Component 3 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'عموم الطلاب، والوعاء الإثرائي', en:'All students and the enrichment pool' } },
      { k:{ ar:'وحدة العمل', en:'Unit of work' }, v:{ ar:'وحدة تدريبية نظرية وتطبيقية', en:'A theoretical & practical training unit' } },
      { k:{ ar:'مجالاته', en:'Fields' }, v:{ ar:'التفكير · الحياة · البحث العلمي', en:'Thinking · Life · Research' } }
    ],
    about:{
      ar:[
        'يتكون برنامج تنمية المهارات من وحدات تدريبية نظرية وتطبيقية، تغطي في مجموعها حزمة المهارات اللازمة لتطوير المهارات المتنوعة للطلاب.',
        'ويهدف البرنامج إلى تشجيع تطوير الأساليب والمهارات، وذلك من خلال توفير البرامج التدريبية المهارية التي تحتاجها الفئات المستهدفة من الطلاب في مجالات التفكير، والمهارات الحياتية، ومهارات البحث العلمي.',
        'وفي التطبيق الميداني قُدّمت لطلاب الوعاء الإثرائي برامج تدريب متقدمة في مهارات الاتصال والبحث العلمي، إضافة إلى المهارات الأساسية.'
      ],
      en:[
        'The Skills Development Program consists of theoretical and practical training units that together cover the package of skills needed to develop students’ varied abilities.',
        'It encourages the development of methods and skills by providing the skill-training programs the target groups need in thinking, life skills and scientific research.',
        'In the field implementation, enrichment-pool students received advanced training in communication and research skills in addition to the basic skills.'
      ] },
    target:{ ar:'يستهدف البرنامج فئتين من الطلاب: الأولى عموم الطلاب، والثانية فئة الوعاء الإثرائي التي تمثل ما بين 15% و20% من الطلاب.', en:'Two groups: all students, and the enrichment pool (15–20% of students).' },
    goals:{
      ar:[
        'توفير الطرق التعليمية ووسائلها وموادها المصممة التي تنمّي تطور عملية التفكير والإحساس.',
        'تطوير المهارات المعرفية العامة (Cognitive Skills) المتمثلة في التفكير التصوري أو ما يسمى بأساليب حل المشكلات، والتفكير الانتقادي، واتخاذ القرارات.',
        'تطوير المهارات المثيرة (Affective Skills) مثل الإحساس، والإدراك، والتقدير.',
        'تطوير مهارات التفكير المدمجة والمفردة.',
        'تنمية مهارات كيفية التعلم والتدرب عليها، مثل: التدوين والتلخيص، وإجراءات المقابلات، وتحليل المعلومات، ومهارات الإنتاج، والتخطيط، والمراقبة والتحكم، والتقييم، والمهارات الواردة في مصفوفة بلوم للتفكير.',
        'تطوير مهارات البحث العلمي المتقدمة، مثل: استخدام قواعد البيانات المباشرة، ومصنفات البحث، ومراجعة الملخصات والتقارير.',
        'تطوير مهارات الاتصال الكتابية والكلامية والبصرية.',
        'تطوير مهارات إدارة الذات، التي تتضمن أساليب تحديد وتطوير الرؤى والرسائل والأهداف المستقبلية، وأساليب تحقيق التوازن بين متطلبات الفرد الثقافية والاجتماعية والبدنية والمادية.',
        'تطوير مهارات التكيف النفسي مع متطلبات الموهبة، التي تشمل التكيف مع المشكلات الانفعالية والمشكلات الصحية والضغوط الأسرية وضغوط الحاجة إلى المزيد من الإنجاز.'
      ],
      en:[
        'Provide teaching methods, media and designed materials that develop thinking and feeling.',
        'Develop general cognitive skills: conceptual thinking (problem-solving), critical thinking and decision making.',
        'Develop affective skills such as sensing, appreciation and valuing.',
        'Develop combined and single thinking skills.',
        'Train how-to-learn skills: note-taking and summarizing, interviewing, analyzing information, production, planning, monitoring and control, evaluation, and the skills in Bloom’s taxonomy.',
        'Develop advanced research skills: using online databases, research catalogs, and reviewing abstracts and reports.',
        'Develop written, oral and visual communication skills.',
        'Develop self-management skills: setting and developing visions, missions and future goals, and balancing cultural, social, physical and material needs.',
        'Develop psychological coping with the demands of giftedness: emotional problems, health problems, family pressures and the pressure to achieve more.'
      ] },
    steps:[
      { ar:'تكوين الوحدات التدريبية، وتحديد الفترة الزمنية الملائمة.', en:'Form the training units and set a suitable timeframe.' },
      { ar:'تقسيم المهارات المقدمة إلى عناصرها الأساسية.', en:'Break each skill into its basic elements.' },
      { ar:'حصر مستويات الفئة المستهدفة.', en:'Survey the levels of the target group.' },
      { ar:'تقسيم المهارات المستهدفة إلى وحدات تدريبية، وتحديد مفردات كل وحدة.', en:'Divide target skills into training units and define each unit’s content.' },
      { ar:'تجهيز الحقيبة التدريبية، واختيار وسائل تقديم وحدات البرنامج.', en:'Prepare the training package and choose delivery media.' },
      { ar:'اختيار العناصر البشرية للتنفيذ.', en:'Choose the people who will deliver it.' },
      { ar:'جدولة وحدات البرنامج والإعلان عنها.', en:'Schedule and announce the units.' },
      { ar:'تقييم أعمال البرنامج وتوثيقها ومتابعتها.', en:'Evaluate, document and follow up the program’s work.' }
    ],
    stepsNote:{ ar:'تُستكمل هذه الإجراءات باستخدام نماذج «تنمية المهارات» المصاحبة للنموذج.', en:'These steps are completed with the model’s "Skills Development" forms.' }
  },

  /* =====================================================
     المكوّن الرابع: برنامج الأنشطة الموجهة
     ===================================================== */
  { id:'clusters', n:4, color:'#0E9F76', icon:'users', ready:true,
    name:{ ar:'برنامج الأنشطة الموجهة', en:'Enrichment Cluster Program' },
    short:{ ar:'الأنشطة الموجهة', en:'Enrichment Clusters' }, who:{ ar:'جميع الطلاب والمعلمين والإداريين', en:'All students, teachers & staff' },
    summary:{
      ar:'مجموعات أنشطة لا صفية يمارس فيها الطلاب — مع المعلمين والإداريين — اهتماماتهم المشتركة، ويُوزَّعون فيها حسب اهتماماتهم لا حسب أعمارهم، لإنتاج سلعة ذات قيمة أو تقديم خدمة يُستفاد منها.',
      en:'Extracurricular activity groups in which students — with teachers and staff — pursue shared interests, grouped by interest rather than age, to produce something of value or provide a useful service.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الرابع من تسعة', en:'Component 4 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'جميع الطلاب والمعلمين والإداريين', en:'All students, teachers & staff' } },
      { k:{ ar:'التوزيع', en:'Grouping' }, v:{ ar:'حسب الاهتمام لا العمر', en:'By interest, not age' } },
      { k:{ ar:'المخرج', en:'Outcome' }, v:{ ar:'منتج ذو قيمة أو خدمة نافعة', en:'A valuable product or service' } }
    ],
    about:{
      ar:[
        'يتكون برنامج الأنشطة الموجهة من مجموعات أنشطة لا صفية، تغطي في مجموعها أغلب رغبات الشريحة المستهدفة من الطلاب والمعلمين والإداريين. وتتمحور الأنشطة حول أفرع المعرفة الرئيسية والمتداخلة، وكذلك المواضيع المشتركة بينها.',
        'وتتعامل هذه الأنشطة على اختلاف محتوياتها وأهدافها مع أساليب ومهارات التعلم المختلفة، ومنها مهارات التفكير، والمهارات الشخصية في التعامل مع الآخرين، ومهارات كيفية التعلم، والعمل على تطبيق ذلك على مسائل حياتية ذات مغزى وفائدة.',
        'والهدف الأساس للبرنامج هو توفير الفرصة لجميع الطلاب «لتطوير اهتماماتهم، ومكامن القوة والإبداع فيهم»، من خلال برنامج موجّه للأنشطة يمارس من خلاله الطلاب — بالاشتراك مع أعضاء هيئة التدريس والإداريين — اهتماماتهم المشتركة، خارج المناخ الرسمي.'
      ],
      en:[
        'The Enrichment Cluster Program consists of extracurricular activity groups that together cover most interests of the target students, teachers and staff. Activities revolve around main and overlapping branches of knowledge and the topics they share.',
        'Whatever their content, they work with different learning methods and skills — thinking skills, interpersonal skills and how-to-learn skills — and apply them to meaningful, useful real-life questions.',
        'Its core aim is to give every student the chance "to develop their interests, strengths and creativity" through activities in which students, together with teachers and staff, pursue shared interests outside the formal setting.'
      ] },
    target:{ ar:'يستهدف البرنامج جميع الطلاب على اختلاف أعمارهم ومستوياتهم التعليمية وخلفياتهم الاجتماعية، وكذلك جميع أعضاء هيئة التدريس والإداريين في المدارس، والراغبين من أولياء الأمور.', en:'All students of every age, level and background, all teachers and staff, and interested parents.' },
    goals:{
      ar:[
        'توفير الفرصة للطلاب لتعلّم محتوى معرفي لا صفي، وممارسة إجراءات عملية أصيلة ضمن ما اختاروه من الأنشطة، لإنتاج سلعة ذات قيمة أو تقديم خدمة يمكن الاستفادة منها.',
        'توفير المناخ المناسب للطلاب لتطوير المستويات العليا من التفكير لديهم، وممارسة الجوانب التطبيقية لهذه المهارات، وإظهار مكامن الإبداع فيهم.',
        'استخدام مهارات التفكير المختلفة والمهارات الحياتية وأساليب التعامل مع المشاكل وطرق حلها في مواقف حياتية حقيقية، وتعلّم كيفية مواجهتها والتعامل معها.',
        'توفير المناخ الحر الذي يستطيع الطالب من خلاله اختيار الأنشطة اللاصفية الهادفة التي يرغبها، والوسائل التي يرغب من خلالها ممارسة عملية التعلم، لتصبح عملية التعلم متعة.',
        'تشجيع الثقة الشخصية، والاعتماد على الذات، والعمل والتعاون ضمن مجموعة لها أهداف محددة ومخرجات ذات معنى وفائدة.'
      ],
      en:[
        'Let students learn extracurricular content and practise authentic procedures within their chosen activity, producing something of value or a useful service.',
        'Provide a climate for developing higher-order thinking, applying it in practice, and revealing creativity.',
        'Use thinking skills, life skills and problem-solving in real situations, and learn how to face them.',
        'Offer a free climate where students choose meaningful activities and the ways they want to learn, so learning becomes enjoyable.',
        'Encourage self-confidence, self-reliance, and teamwork in a group with clear goals and meaningful outcomes.'
      ] },
    cards:{ t:{ ar:'لماذا يُوزَّع الطلاب حسب اهتماماتهم لا أعمارهم؟', en:'Why group students by interest, not age?' },
      intro:{ ar:'لا تتطلب أهداف البرنامج تقسيم الطلاب حسب الفئات العمرية، بل تشير التجارب إلى أن توزيعهم حسب اهتماماتهم الشخصية له فوائده، ومنها:', en:'The program does not need age groups; experience shows grouping by personal interest has benefits, including:' },
      items:[
        { icon:'layers', t:{ ar:'توزيع الأعمال على مستويات', en:'Work at different levels' }, d:{ ar:'إمكانية توزيع الأعمال في المجموعة على مستويات مختلفة من المشاركين.', en:'Tasks can be shared across participants at different levels.' } },
        { icon:'star', t:{ ar:'إظهار الخبرات المتفاوتة', en:'Varied experience shows' }, d:{ ar:'إظهار الخبرات المتفاوتة التي تعتمد على الفروقات العمرية.', en:'Different experience that comes with age differences emerges.' } },
        { icon:'coach', t:{ ar:'ممارسة القيادة', en:'Leadership practice' }, d:{ ar:'توفير الفرصة لإظهار السمات القيادية وممارستها.', en:'A chance to show and practise leadership traits.' } },
        { icon:'users', t:{ ar:'شراكة الطلاب والكبار', en:'Students & adults together' }, d:{ ar:'إيجاد المناخ الذي يمارس فيه الطلاب والمعلمون والإداريون نشاطاً مشتركاً ينتج عنه خدمة أو منتج يمكن الاستفادة منه، خارج المناخ الرسمي.', en:'Students, teachers and staff share an activity that yields a useful service or product, outside the formal setting.' } }
      ] },
    steps:[
      { ar:'تحديد الجهة التي سوف تشرف على أنشطة البرنامج وتنسّقها.', en:'Name the body that supervises and coordinates the activities.' },
      { ar:'تحديد حالات اهتمام الطلاب وهيئة التدريس والإداريين، والمجالات المشتركة بينهم.', en:'Identify the interests of students, teachers and staff, and the areas they share.' },
      { ar:'جدولة الأنشطة الموجهة، واختيار الهيئة الفنية / الإدارية المسؤولة عن كل نشاط.', en:'Schedule the clusters and assign the staff responsible for each.' },
      { ar:'تسجيل الطلاب في الأنشطة حسب اختياراتهم.', en:'Register students in clusters according to their choices.' },
      { ar:'الإعلان عن جدول الأنشطة الموجهة، وقوائم توزيع الطلاب، وأسماء الهيئة الفنية / الإدارية المسؤولة عن كل نشاط.', en:'Announce the schedule, student lists and the staff responsible for each cluster.' },
      { ar:'تقييم أداء الطلاب في كل فصل دراسي: المواظبة على الحضور، وإجادة مهارات النشاط، واستكمال نماذج التقييم، والمشاركة في التخطيط؛ وتقييم الوحدات من خلال مسح آراء الطلاب، وتقييم أعضاء الهيئة الفنية والإدارية، ومسح آراء أولياء الأمور.', en:'Each term, evaluate students (attendance, mastery of activity skills, completing evaluation forms, participation in planning) and evaluate units through surveys of students, staff and parents.' }
    ],
    stepsNote:{ ar:'تُستكمل هذه الإجراءات باستخدام نماذج «الأنشطة الموجهة» المصاحبة للنموذج.', en:'These steps are completed with the model’s "Enrichment Clusters" forms.' },
    study:{
      intro:{ ar:'قيس أداء الطلاب المشاركين في وحدات البرنامج في نهاية الفصلين الدراسيين، وعددهم 721 طالباً يمثلون 86% من العينة الكلية (بعد استبعاد 23 طالباً من الصف التمهيدي و86 طالباً لم يتفاعلوا بانتظام)، وقورنت النتائج باختبار (ت) عند مستوى دلالة 0.05.', en:'Participants’ performance was measured at the end of both terms: 721 students, 86% of the full sample (excluding 23 preparatory students and 86 irregular participants), compared with a t-test at the 0.05 level.' },
      rows:[
        { ar:'التقييم الكلي في البرنامج', en:'Overall program score', pre:37.00, post:43.39, t:5.65, sig:true },
        { ar:'المواظبة على الحضور', en:'Attendance', pre:1.87, post:2.17, t:4.93, sig:true },
        { ar:'إجادة مهارات النشاط', en:'Mastery of activity skills', pre:1.57, post:2.21, t:5.85, sig:true },
        { ar:'استكمال نماذج التقييم', en:'Completing evaluation forms', pre:1.84, post:2.22, t:6.32, sig:true },
        { ar:'المشاركة في التخطيط', en:'Participation in planning', pre:1.85, post:2.11, t:4.47, sig:true }
      ],
      scale:{ ar:'المتوسطات كما وردت في الدراسة · قيمة (ت) الحرجة 1.96', en:'Means as reported in the study · critical t = 1.96' },
      notes:{
        ar:['جميع الفروق بين الفصلين الأول والثاني دالة إحصائياً لصالح الفصل الثاني، في التقييم الكلي وفي العناصر الأربعة.',
            'خلصت الدراسة إلى وجود أثر إيجابي دال إحصائياً لبرنامج الأنشطة الموجهة على أداء الطلاب، وتراوحت قيم (ت) فيه بين 4.47 و6.32.'],
        en:['All differences between the two terms were statistically significant in favor of the second term — overall and in all four elements.',
            'The study concluded that the program has a significant positive effect on students’ performance, with t-values between 4.47 and 6.32.'] }
    }
  },

  /* =====================================================
     المكوّن الخامس: برنامج الإثراء المتخصص
     ===================================================== */
  { id:'specialty', n:5, color:'#F07B0F', icon:'book', ready:true,
    name:{ ar:'برنامج الإثراء المتخصص', en:'Specialty Enrichment Program' },
    short:{ ar:'الإثراء المتخصص', en:'Specialty Enrichment' }, who:{ ar:'الوعاء الإثرائي (15–20%)', en:'Enrichment pool (15–20%)' },
    summary:{
      ar:'وحدات تعليمية في القرآن الكريم والرياضيات والعلوم الطبيعية واللغتين العربية والإنجليزية، تفوق في محتواها ومستواها ما يُعطى لبقية الطلاب، وتُقدَّم بمهارات التفكير العليا لتحقيق عنصر التمييز.',
      en:'Units in the Holy Qur’an, mathematics, natural sciences, Arabic and English that exceed in content and level what other students receive, taught through higher-order thinking to achieve differentiation.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الخامس من تسعة', en:'Component 5 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'الوعاء الإثرائي (15–20%)', en:'Enrichment pool (15–20%)' } },
      { k:{ ar:'العنصر الذي يحققه', en:'Element served' }, v:{ ar:'التمييز', en:'Differentiation' } },
      { k:{ ar:'المواد', en:'Subjects' }, v:{ ar:'القرآن · الرياضيات · العلوم · اللغات', en:'Qur’an · Math · Science · Languages' } }
    ],
    about:{
      ar:[
        'يتكون برنامج الإثراء المتخصص من وحدات تعليمية لكل من مواد القرآن الكريم والرياضيات والعلوم الطبيعية واللغتين العربية والإنجليزية، تغطي في مجموعها حزمة من المعارف تفوق في محتواها ومستواها العلمي تلك التي تُعطى لبقية الطلاب.',
        'كما أن الأسلوب الذي تُقدَّم به المادة العلمية للطلاب يستخدم مهارات التفكير العليا في منظومة بلوم للتفكير، ويضاف إلى ذلك الربط بين المعارف والعلوم المختلفة، واستخدام أمثلة من الحياة العملية للدلالة على كيفية تطبيق ما يتعلمه الإنسان في مواجهة المشاكل والأعباء والتكاليف اليومية للحياة العصرية، وإيجاد الحلول المناسبة التي يمكن تسخيرها لخدمة الإنسان والمجتمع والأمة.',
        'ويهدف البرنامج إلى تحقيق عنصر التمييز، الذي يُعد أحد عنصري تلبية احتياجات تطوير الموهبة، وذلك بتوفير المادة الإثرائية المطلوبة لشريحة الوعاء الإثرائي من الطلاب.'
      ],
      en:[
        'The Specialty Enrichment Program consists of units in the Holy Qur’an, mathematics, natural sciences, Arabic and English that together offer knowledge exceeding, in content and level, what other students receive.',
        'The material is taught through the higher-order thinking skills of Bloom’s taxonomy, linking different fields of knowledge and using real-life examples of applying learning to the problems and demands of modern life, and finding solutions that serve people, society and the nation.',
        'It achieves differentiation — one of the two elements of meeting talent-development needs — by providing the enrichment material required for the enrichment-pool students.'
      ] },
    target:{ ar:'يستهدف البرنامج فئة الوعاء الإثرائي التي تمثل ما بين 15% و20% من الطلاب، ويتم تحديدها بتطبيق وسائل القياس المعدّة لكل فرع على جميع الطلاب، ثم اختيار من يحققون معايير التميز الموضوعة لكل مادة.', en:'The enrichment pool (15–20% of students), identified by applying each subject’s measures to all students and selecting those who meet its excellence criteria.' },
    goals:{
      ar:[
        'تحديد قدرات الطلاب المعرفية في أفرع القرآن الكريم والرياضيات والعلوم الطبيعية واللغتين العربية والإنجليزية، بتطبيق أسئلة مختارة في أفرع تلك المعارف والعلوم بهدف تمييز ذوي القدرات العالية منهم.',
        'توفير المادة التعليمية والتدريب العملي والتوجيه الفني الذي يلائم قدرات الشريحة المستهدفة من الطلاب في تلك المجالات.',
        'الارتقاء بالقدرات العقلية للفئة المستهدفة للتمكن من الربط بين معلومات الفروع المتعددة للعلوم والمعارف، واستخدام ذلك في مواجهة تكاليف وأعباء ومتطلبات الحياة العصرية المتقدمة.'
      ],
      en:[
        'Determine students’ knowledge abilities in the Qur’an, mathematics, natural sciences, Arabic and English through selected questions, to distinguish those with high ability.',
        'Provide teaching material, practical training and technical guidance suited to the target students in those fields.',
        'Raise the target group’s mental abilities so they can link information across fields and use it to meet the demands of modern life.'
      ] },
    criteria:{ t:{ ar:'معايير اختيار طلاب الإثراء المتخصص', en:'Selection criteria' },
      intro:{ ar:'في التطبيق الميداني اختير طلاب كل مادة إثرائية بتحقيق شرطين معاً:', en:'In the field implementation, students for each subject had to meet two conditions:' },
      rows:[
        { k:{ ar:'الشرط الأول', en:'Condition 1' }, v:{ ar:'ألا تقل نسبة تحصيل الطالب في المادة الإثرائية عن 80%', en:'At least 80% in the enrichment subject test' } },
        { k:{ ar:'الشرط الثاني', en:'Condition 2' }, v:{ ar:'ألا تزيد نسبة مجموع الطلاب المميزين عن 20% من إجمالي من خضعوا للاختبار', en:'Selected students do not exceed 20% of those tested' } }
      ] },
    steps:[
      { ar:'تطبيق وسائل القياس على جميع الطلاب حسب مستوياتهم الأكاديمية.', en:'Apply the measures to all students by academic level.' },
      { ar:'حصر النتائج، وتحديد الطلاب الذين تنطبق عليهم معايير الاختيار.', en:'Tally results and identify students who meet the criteria.' },
      { ar:'تطبيق المادة الإثرائية من خلال فصول الإثراء المتخصص.', en:'Deliver the enrichment material in specialty enrichment classes.' },
      { ar:'تقييم أعمال وحدات البرنامج وتوثيقها، وإعادة تطبيق الاختبارات الإثرائية في نهاية العام لقياس الأثر.', en:'Evaluate and document the units, and re-apply the enrichment tests at year-end to measure impact.' }
    ],
    stepsNote:{ ar:'تُستكمل هذه الإجراءات باستخدام نماذج «الإثراء المتخصص» المصاحبة للنموذج.', en:'These steps are completed with the model’s "Specialty Enrichment" forms.' },
    recs:[
      { ar:'من توصيات الدراسة: العمل على إعداد اختبارات تحصيلية محكّمة لمواد الإثراء المتخصص، وخصوصاً الرياضيات والعلوم واللغتين العربية والإنجليزية.', en:'A study recommendation: prepare refereed achievement tests for specialty enrichment subjects, especially mathematics, science, Arabic and English.' }
    ],
    study:{
      intro:{ ar:'اختُبر في بداية العام 365 طالباً من الصفين الخامس والسادس الابتدائي والمرحلتين المتوسطة والثانوية في الرياضيات واللغة العربية، فحقق المعايير 71 طالباً في الرياضيات (19.45%) و60 طالباً في اللغة العربية (16.44%)، وقُدّمت لهم خدمات البرنامج طوال العام مع تثبيت المتغيرات الأخرى، ثم أعيد تطبيق الاختبارين في نهاية العام.', en:'At the start of the year 365 students (grades 5–12) were tested in mathematics and Arabic; 71 met the criteria in math (19.45%) and 60 in Arabic (16.44%). They received the program all year with other variables held constant, and the tests were re-applied at year-end.' },
      rows:[
        { ar:'الرياضيات (71 طالباً)', en:'Mathematics (71 students)', pre:77.63, post:89.26, t:7.26, sig:true, max:100 },
        { ar:'اللغة العربية (60 طالباً)', en:'Arabic (60 students)', pre:94.92, post:96.26, t:2.63, sig:true, max:100 }
      ],
      scale:{ ar:'متوسط الدرجات من 100 · الاختبار القبلي في بداية العام والبعدي في نهايته', en:'Mean scores out of 100 · pre-test at year start, post-test at year end' },
      labels:{ pre:{ ar:'بداية العام', en:'Year start' }, post:{ ar:'نهاية العام', en:'Year end' } },
      notes:{
        ar:['الفروق بين الاختبارين القبلي والبعدي دالة إحصائياً في المادتين لصالح الاختبار البعدي.',
            'تتفق النتائج مع ما يُرى من أن أسلوب الإثراء الذي يُقدَّم في الرياضيات يمكن تطبيقه في علوم اللغة والعلوم الطبيعية والفن وغيرها.'],
        en:['Differences between pre- and post-tests were significant in both subjects, in favor of the post-test.',
            'The results support the view that the enrichment approach used in mathematics can be applied to language, natural sciences, art and other fields.'] }
    }
  },

  /* =====================================================
     المكوّن السادس: برنامج المشاريع الهادفة
     ===================================================== */
  { id:'projects', n:6, color:'#E2386F', icon:'flask', ready:true,
    name:{ ar:'برنامج المشاريع الهادفة', en:'Targeted Projects Program' },
    short:{ ar:'المشاريع الهادفة', en:'Targeted Projects' }, who:{ ar:'فئة المبدعين — النوع III (2–3%)', en:'Creative students — Type III (2–3%)' },
    summary:{
      ar:'الوسيلة التي تُفعَّل بها جميع الخبرات المكتسبة — من المهارات الأساسية إلى المحتوى المتقدم — وتظهر على هيئة مُخرَج يقدّمه الطالب؛ يمارس فيه دور الباحث المحترف، ويتحول فيه المعلم إلى موجّه وراعٍ وشريك.',
      en:'The means by which all acquired experience — from basic skills to advanced content — is activated and shown as a product the student presents; the student acts as a professional researcher and the teacher becomes guide, sponsor and partner.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن السادس من تسعة', en:'Component 6 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'فئة المبدعين (2–3%)', en:'Creative students (2–3%)' } },
      { k:{ ar:'المستوى', en:'Level' }, v:{ ar:'أكثر برامج النموذج تقدماً', en:'The model’s most advanced program' } },
      { k:{ ar:'المخرج', en:'Outcome' }, v:{ ar:'منتج أصيل ذو أثر', en:'An authentic, impactful product' } }
    ],
    about:{
      ar:[
        'يعتبر برنامج المشاريع الهادفة الوسيلة التي من خلالها يتم تفعيل جميع الخبرات المكتسبة، بدءاً من المهارات الأساسية ووصولاً إلى المحتوى المتقدم من المعلومات والوسائل والخطوات، وإظهارها على هيئة مُخرَج يقدّمه الطالب.',
        'ويمثل هذا النوع من التعلم التطبيق العملي للمحتوى المعرفي للطالب، إضافة إلى تطبيقه للخطوات الإجرائية التي اكتسبها، واندماجه والتزامه الشخصي بعملية التعلّم. كما يعد أحد الوسائل الفعالة للتكيف مع أساليب التعلم المركبة التي تستخدم معلومات من أفرع متعددة في تطبيق واحد؛ فهو يهدف إلى تطوير إمكانيات البحث والإنتاج العملي والفني، حيث يمارس الطلاب دور الباحث الممارس لخطوات البحث العلمي المتقدم وإجراءاته، فتتطور أساليب تفكيرهم وممارستهم وتقديمهم بأسلوب مهني محترف.',
        'ويعد من أكثر برامج النموذج تقدماً من حيث الأهداف والمحتوى؛ إذ تتطلب المشاركة فيه مقدرة عقلية عالية، وتميزاً في مهارات التفكير والبحث العلمي، واهتماماً خاصاً بأحد أفرع العلوم والمعرفة، والتزاماً بتوفير الوقت وتقديم الجهد المطلوبين لتحقيق نتائج مستهدفة.'
      ],
      en:[
        'The Targeted Projects Program is how all acquired experience — from basic skills to advanced information, tools and steps — is activated and shown as a product the student presents.',
        'This learning is the practical application of the student’s knowledge and acquired procedures, with personal engagement and commitment. It suits complex learning that draws on several fields in one application, developing research and practical/artistic production as students act as researchers following advanced research steps, presented professionally.',
        'It is among the model’s most advanced programs: participation requires high mental ability, excellence in thinking and research skills, a special interest in a field, and commitment of time and effort to reach targeted results.'
      ] },
    target:{ ar:'يستهدف البرنامج الأفراد والمجموعات الصغيرة من الطلاب الذين أثبتوا عملياً اهتماماً صادقاً بمواضيع معرفية معينة، ولديهم الرغبة الحقيقية في متابعة دراستها على مستوى عالٍ من الالتزام؛ أي فئة المبدعين التي تمثل ما نسبته 2% – 3% من عموم الطلاب.', en:'Individuals and small groups who have shown genuine interest in specific topics and truly want to pursue them with high commitment — the creative group, 2–3% of all students.' },
    goals:{
      ar:[
        'توفير الفرص التي يستطيع أفراد الفئة المستهدفة من خلالها ممارسة اهتماماتهم، وتطبيق أوجه المعرفة لديهم، واستخراج مواطن الإبداع فيهم.',
        'الالتزام بمهمة في برنامج من اختيارهم، وفي مواضيع لديهم اهتمام خاص بها.',
        'اكتساب مستوى متقدم من الفهم في المحتوى المعرفي وفي الخطوات المعالجة في أحد أفرع المعرفة، والفنون التطبيقية، والدراسات في العلاقات البينية بين أفرع العلوم والمعرفة.',
        'تطوير منتجات أصيلة ذات تأثير مباشر على فئة مستهدفة.',
        'تطوير مهارات التعلم الموجهة ذاتياً في التخطيط والتنظيم واستخدام الموارد وإدارة الوقت واتخاذ القرارات والتقييم الذاتي، في مناخ من التحفيز العالي.',
        'تطوير سبل الالتزام بالمهام، والثقة في النفس، والشعور بالإنجازات الإبداعية، والمقدرة على التفاعل مع الآخرين من الطلاب والمدرسين والأفراد والخبراء من ذوي الاهتمامات العالية والقدرات المتقدمة في مجالات الاهتمام المشتركة.'
      ],
      en:[
        'Give the target group opportunities to pursue interests, apply their knowledge and bring out their creativity.',
        'Commit to a task in a program and topic of their own choosing.',
        'Reach an advanced understanding of content and methods in a field of knowledge, applied arts, or interdisciplinary studies.',
        'Develop authentic products with a direct effect on a target audience.',
        'Develop self-directed learning — planning, organizing, using resources, time management, decision making and self-evaluation — in a highly motivating climate.',
        'Build task commitment, self-confidence, a sense of creative achievement, and the ability to work with students, teachers and experts who share high interests.'
      ] },
    cards:{ t:{ ar:'تحوّل الأدوار في المشاريع الهادفة', en:'How roles change in targeted projects' },
      items:[
        { icon:'search', t:{ ar:'الطالب', en:'The student' }, d:{ ar:'يتحول دوره من دور المتلقي إلى دور المستعلم والباحث عن النتائج.', en:'Moves from recipient to inquirer and seeker of results.' } },
        { icon:'coach', t:{ ar:'المعلم', en:'The teacher' }, d:{ ar:'يتحول دوره من الملقي والمصدر للمعرفة إلى دور مركب من أدوار عدة: الموجّه، والراعي، ومصدر الوسائل، وفي بعض الأحيان الشريك أو الزميل.', en:'Moves from lecturer and source of knowledge to several roles: guide, sponsor, source of tools, and sometimes partner or colleague.' } }
      ] },
    steps:[
      { ar:'معرفة اهتمامات الطلاب.', en:'Identify students’ interests.' },
      { ar:'تقديم طلب المشروع.', en:'Submit a project application.' },
      { ar:'إجراء المقابلة الشخصية لمقدّم الطلب.', en:'Interview the applicant.' },
      { ar:'اختيار الطلاب لتنفيذ مشروع هادف، وتخصيص مشرف فني مدرَّب لكل طالب أو مجموعة.', en:'Select students for a targeted project and assign a trained technical supervisor to each student or group.' },
      { ar:'كتابة خطة المشروع.', en:'Write the project plan.' },
      { ar:'المراجعة والتغذية الراجعة، والتقييم الدوري أثناء التنفيذ، والتقييم النهائي عند الانتهاء.', en:'Review and feedback, periodic evaluation during the work, and a final evaluation at the end.' }
    ],
    stepsNote:{ ar:'تُستكمل هذه الإجراءات باستخدام نماذج «المشاريع الهادفة» المصاحبة للنموذج.', en:'These steps are completed with the model’s "Targeted Projects" forms.' },
    recs:[
      { ar:'من توصيات الدراسة: تضمين برامج الإثراء العام والمشاريع الهادفة الشخصيات الهامة في الموسوعة العربية والإسلامية مثل ابن أصيبعة، وابن النديم، وابن خلقان، والاستفادة من تراث المنتجات العلمية لأمثال ابن الهيثم، وابن سينا، والخوارزمي في مشاريع ودراسات للموهبة.', en:'A study recommendation: include major figures of Arab and Islamic encyclopedic heritage — such as Ibn Abi Usaybi‘a, Ibn al-Nadim and Ibn Khallikan — in General Enrichment and Targeted Projects, and draw on the scientific legacy of Ibn al-Haytham, Ibn Sina and al-Khwarizmi in talent projects and studies.' }
    ],
    study:{
      intro:{ ar:'قُدّمت دورة أولية في أساسيات البحث العلمي لطلاب الوعاء الإثرائي (105 طلاب)، فتقدّم 41 طالباً بخطط لمشاريع هادفة، صُفّيت إلى 27 مشروعاً، وخُصص لكل طالب أو مجموعة مشرف فني تدرّب على إجراءات النموذج في دورة مدتها 12 ساعة. وأكمل الطلاب 6 مشاريع بنهاية العام الدراسي 2008م، وقورن تقييم خططهم (قبلي) بمتوسط تقييماتهم الدورية والنهائية (بعدي).', en:'An introductory research course was given to the 105 enrichment-pool students; 41 submitted project plans, filtered to 27 projects, each assigned a technical supervisor trained for 12 hours on the model. Six projects were completed by the end of 2008; plan evaluations (pre) were compared with the average of periodic and final evaluations (post).' },
      rows:[
        { ar:'أداء الطلاب في المشاريع الستة', en:'Students’ performance in the six projects', pre:1.86, post:4.00, t:4.30, sig:true, max:5 }
      ],
      scale:{ ar:'متوسط التقييم من 5 · قيمة (ت) الحرجة 2.57', en:'Mean rating out of 5 · critical t = 2.57' },
      labels:{ pre:{ ar:'تقييم الخطة', en:'Plan rating' }, post:{ ar:'تقييم التنفيذ', en:'Delivery rating' } },
      table:{ t:{ ar:'البحوث المنفذة', en:'Completed projects' },
        head:{ ar:['البحث','الدوري الأول','الدوري الثاني','النهائي','المتوسط'], en:['Project','1st periodic','2nd periodic','Final','Average'] },
        rows:[
          [{ ar:'الشعب المرجانية: كنز يجب حمايته', en:'Coral reefs: a treasure to protect' }, '1.365', '4.55', '5.00', '3.64'],
          [{ ar:'قصة مؤثرة', en:'A moving story' }, '2.64', '3.36', '2.82', '2.94'],
          [{ ar:'تصميم برنامج تحكم بالآلات الكهربائية عن طريق الحاسب الآلي', en:'A computer program to control electrical machines' }, '2.09', '3.73', '4.00', '3.27'],
          [{ ar:'تلوث كورنيش جدة', en:'Pollution of the Jeddah Corniche' }, '1.82', '3.18', '5.00', '3.33'],
          [{ ar:'جهاز للتعرف على العملات النقدية الورقية وكشف التزوير', en:'A device to recognize banknotes and detect forgery' }, '1.91', '2.91', '3.64', '2.82'],
          [{ ar:'قصة شاب', en:'A young man’s story' }, '1.36', '2.64', '3.55', '2.52']
        ] },
      notes:{
        ar:['الفرق بين التقييم القبلي والبعدي دال إحصائياً، ويدل على أثر البرنامج على أداء الطلاب في البحوث العلمية وإنتاجهم لمشاريع ذات أهداف اجتماعية.',
            'أتم الطلاب ثلاث دورات في مناهج البحث العلمي، وتطور مستواهم البحثي بصورة ملحوظة.',
            'نافس صاحب بحث «تصميم برنامج تحكم بالآلات الكهربائية عن طريق الحاسب الآلي» على مستوى المملكة، وفاز بشرف تمثيلها في مسابقة المعلوماتية على مستوى العالم العربي التي أقيمت في الأردن في الفترة من 25 إلى 27 يونيو 2008م.'],
        en:['The pre/post difference was significant, showing the program’s effect on students’ research performance and their production of socially purposeful projects.',
            'Students completed three courses in research methods, and their research level improved markedly.',
            'The author of "A computer program to control electrical machines" competed nationally and won the honor of representing the Kingdom in the Arab-world informatics competition held in Jordan, 25–27 June 2008.'] }
    }
  },

  /* =====================================================
     المكوّن السابع: برنامج التسريع الأكاديمي
     ===================================================== */
  { id:'acceleration', n:7, color:'#2F6FE0', icon:'arrow', ready:true,
    name:{ ar:'برنامج التسريع الأكاديمي', en:'Academic Acceleration Program' },
    short:{ ar:'التسريع الأكاديمي', en:'Academic Acceleration' }, who:{ ar:'الوعاء الإثرائي', en:'Enrichment pool' },
    summary:{
      ar:'إجراءات للتأكد من مطابقة السمات الشخصية والقدرات العقلية للطالب المرشح لمتطلبات التسريع، بهدف توفير المادة الدراسية للطالب في مستوى قدرته العقلية؛ وأكثر خياراته شيوعاً التسريع في كامل المنهج لسنة دراسية أو أكثر.',
      en:'Procedures that confirm a candidate’s personal traits and mental abilities match acceleration requirements, so the student learns at his mental level; the most common option is whole-grade acceleration by a year or more.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن السابع من تسعة', en:'Component 7 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'طلاب الوعاء الإثرائي', en:'Enrichment-pool students' } },
      { k:{ ar:'العنصر الذي يحققه', en:'Element served' }, v:{ ar:'التسريع', en:'Acceleration' } },
      { k:{ ar:'الخيار الأشيع', en:'Most common option' }, v:{ ar:'التسريع في كامل المنهج لسنة أو أكثر', en:'Whole-grade acceleration, a year or more' } }
    ],
    about:{
      ar:[
        'يتكون برنامج التسريع الأكاديمي من الإجراءات التي يجب اتباعها للتأكد من مطابقة السمات الشخصية والقدرات العقلية للطالب المرشح لمتطلبات البرنامج.',
        'ويعد التسريع في كامل المنهج لسنة دراسية أو أكثر أحد الخيارات الأكثر شيوعاً، وهو الخيار المعتمد في النظام التربوي والتعليمي في المملكة العربية السعودية.',
        'ويهدف البرنامج إلى توفير المادة الدراسية للطالب في نفس المستوى العقلي له.'
      ],
      en:[
        'The Academic Acceleration Program consists of the procedures that confirm a candidate’s personal traits and mental abilities match the program’s requirements.',
        'Whole-grade acceleration by one year or more is among the most common options, and it is the option adopted in the Saudi education system.',
        'It aims to provide the student with study material at his own mental level.'
      ] },
    target:{ ar:'يستهدف البرنامج طلاب الوعاء الإثرائي، لامتلاك أفراد هذه الشريحة السمات الشخصية والقدرات العقلية التي تمكّنهم من استيعاب المحتوى المعرفي وإجادة المهارات المنصوص عليها في مناهج عامين دراسيين في عام دراسي واحد.', en:'Enrichment-pool students, whose traits and abilities let them master two years’ curriculum content and skills in a single year.' },
    goals:{
      ar:[
        'توفير فرصة للتقدم السريع عبر المنهج.',
        'احتواء القدرات العالية والاحتياجات الفردية لطلاب الشريحة المستهدفة.',
        'المساعدة على تطوير مهارات التفكير والإبداع.'
      ],
      en:[
        'Offer a chance to progress quickly through the curriculum.',
        'Accommodate the high abilities and individual needs of the target students.',
        'Help develop thinking and creativity skills.'
      ] },
    recs:[
      { ar:'من توصيات الدراسة: الإسراع في تطبيق نظام التسريع الأكاديمي لطلاب التعليم العام.', en:'A study recommendation: speed up the application of academic acceleration for general-education students.' }
    ]
  },

  /* =====================================================
     المكوّن الثامن: برنامج الرعاية الخاصة
     ===================================================== */
  { id:'mentorship', n:8, color:'#C2410C', icon:'coach', ready:true,
    name:{ ar:'برنامج الرعاية الخاصة', en:'Mentorship Program' },
    short:{ ar:'الرعاية الخاصة', en:'Mentorship' }, who:{ ar:'الوعاء الإثرائي (15–20%)', en:'Enrichment pool (15–20%)' },
    summary:{
      ar:'خطط ذات أبعاد استراتيجية وخطوات مرحلية توضع لتناسب قدرات كل طالب موهوب وطموحه بصفة خاصة، يشرف على وضعها وتطبيقها مختصون في مجال الموهبة، مع إجراءات للتخطيط والاختيار والتوزيع والتطبيق والتقييم والمتابعة.',
      en:'Strategic plans with staged steps tailored to each gifted student’s abilities and ambition, designed and applied by talent specialists, with procedures for planning, selection, assignment, delivery, evaluation and follow-up.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن الثامن من تسعة', en:'Component 8 of 9' } },
      { k:{ ar:'الفئة المستهدفة', en:'Target group' }, v:{ ar:'الوعاء الإثرائي (15–20%)', en:'Enrichment pool (15–20%)' } },
      { k:{ ar:'وحدة العمل', en:'Unit of work' }, v:{ ar:'خطة فردية لكل طالب', en:'An individual plan per student' } },
      { k:{ ar:'يشرف عليه', en:'Led by' }, v:{ ar:'مختصون في مجال الموهبة', en:'Talent specialists' } }
    ],
    about:{
      ar:[
        'يتكون برنامج الرعاية الخاصة من الخطط ذات الأبعاد الاستراتيجية والخطوات المرحلية التي وُضعت لتناسب قدرات وطموح كل طالب من الطلاب المشاركين في البرنامج بصفة خاصة، وكذلك مجموعة من الإجراءات التنفيذية المصاحبة التي يتم من خلالها التخطيط والاختيار والتوزيع والتطبيق والتقييم والمتابعة.',
        'ويهدف البرنامج إلى توفير أسلوب مقنّن للتمييز بين الطلاب الموهوبين على قدر الإمكانات العقلية لكل منهم، من خلال خطة ذات أبعاد استراتيجية وخطوات مرحلية توضع لتناسب طموح الطالب الموهوب وقدراته، ويشرف على وضع الخطة وتطبيقها مختصون في مجال الموهبة.',
        'وقد استحدث المؤلف هذا البرنامج في النموذج التام لتطوير الموهبة لأهميته في احتضان الشريحة العليا من الطلاب.'
      ],
      en:[
        'The Mentorship Program consists of strategic plans with staged steps designed for each participating student’s abilities and ambition, plus the procedures for planning, selection, assignment, delivery, evaluation and follow-up.',
        'It provides a standardized way to differentiate among gifted students according to each one’s mental potential, through a plan tailored to the student’s ambition and abilities, designed and applied by talent specialists.',
        'The author introduced this program in the model because of its importance in nurturing the top tier of students.'
      ] },
    target:{ ar:'يستهدف البرنامج فئة الوعاء الإثرائي الذين يمثلون ما بين 15% و20% من عموم الطلاب، وتُطبَّق معايير الاختيار المحددة على الشريحة المستهدفة لاختيار الطلاب الذين تتوافق قدراتهم مع تلك المعايير.', en:'The enrichment pool (15–20% of students); defined selection criteria are applied to choose students whose abilities match them.' },
    goalGroups:[
      { icon:'users', t:{ ar:'تعزيز القدرات التطويرية', en:'Developmental capacities' },
        ar:['المهارات الاجتماعية','تفعيل التوجه والرؤية والاندماج الاجتماعي','تعزيز الثقة والاعتداد بالنفس','تعزيز الشعور الإيجابي نحو الذات والآخرين','تطوير الجوانب الإيمانية وترسيخها','تحفيز الرغبة نحو التعلم وتحقيق الأهداف الأكاديمية','التكيف مع التغيرات البيولوجية والانفعالية المصاحبة لمراحل النمو الجسدي'],
        en:['Social skills','Direction, vision and social integration','Self-confidence and self-esteem','Positive feelings toward self and others','Developing and consolidating faith','Motivation to learn and reach academic goals','Adapting to the biological and emotional changes of growth'] },
      { icon:'target', t:{ ar:'تعزيز المهارات المرتبطة بالأهداف العملية', en:'Skills for practical goals' },
        ar:['توسيع الأفق نحو الخيارات المهنية المستقبلية','تطوير مهارات التعلم الذاتي','تطوير المهارات الحياتية','تطوير نطاق المعرفة الحياتية ومهارات مجالات الأعمال'],
        en:['Widening horizons toward future careers','Self-learning skills','Life skills','Broader life knowledge and business skills'] },
      { icon:'book', t:{ ar:'تعزيز المعارف المتخصصة', en:'Specialized knowledge' },
        ar:['تطوير المعرفة والمهارات في أحد مجالات الحرف والفنون','تطوير المعرفة والمهارات في واحد أو أكثر من المجالات الأكاديمية','تطوير مهارات التعلم وتعلّم كيفية التعلم'],
        en:['Knowledge and skills in a craft or art','Knowledge and skills in one or more academic fields','Learning skills and learning how to learn'] }
    ],
    steps:[
      { ar:'تحديد الخطوط العريضة للبرنامج.', en:'Set the program’s broad outline.' },
      { ar:'اختيار القائمين على الرعاية وتوظيفهم.', en:'Select and appoint the mentors.' },
      { ar:'اختيار الطلاب المشاركين في البرنامج بتطبيق معايير الاختيار.', en:'Select participating students by applying the criteria.' },
      { ar:'توزيع الطلاب المشاركين على الرعاة.', en:'Assign students to mentors.' },
      { ar:'تنفيذ البرنامج وتوثيق نتائجه.', en:'Run the program and document its results.' }
    ],
    stepsNote:{ ar:'تُستكمل هذه الإجراءات باستخدام نماذج «الرعاية الخاصة» المصاحبة للنموذج.', en:'These steps are completed with the model’s "Mentorship" forms.' }
  },

  /* =====================================================
     المكوّن التاسع: البرامج المساندة
     ===================================================== */
  { id:'support', n:9, color:'#0C93C0', icon:'heart', ready:true,
    name:{ ar:'البرامج المساندة', en:'Support Programs' },
    short:{ ar:'البرامج المساندة', en:'Support Programs' }, who:{ ar:'المعلمون والطلاب وأولياء الأمور', en:'Teachers, students & parents' },
    summary:{
      ar:'أربعة برامج فرعية تقدّم الخدمات المساندة لبرامج المكونات الرئيسة، ذات علاقة غير مباشرة بالموهبة والإبداع، وتُعد أساساً لنجاح عملية الكشف والتطوير التي يهدف إليها النموذج.',
      en:'Four sub-programs that support the main components; indirectly related to giftedness, they are the foundation for the success of identification and development.' },
    facts:[
      { k:{ ar:'ترتيبه في النموذج', en:'Place in the model' }, v:{ ar:'المكوّن التاسع من تسعة', en:'Component 9 of 9' } },
      { k:{ ar:'عدد برامجه', en:'Sub-programs' }, v:{ ar:'أربعة برامج فرعية', en:'Four sub-programs' } },
      { k:{ ar:'المستفيدون', en:'Served' }, v:{ ar:'المعلمون والطلاب وأولياء الأمور', en:'Teachers, students & parents' } },
      { k:{ ar:'دوره', en:'Role' }, v:{ ar:'أساس نجاح الكشف والتطوير', en:'Foundation of identification & development' } }
    ],
    about:{
      ar:[
        'تتكون البرامج المساندة من أربعة برامج فرعية هي: برنامج تدريب معلمي الموهبة، وبرنامج الإرشاد النفسي، وبرنامج الإرشاد الأكاديمي، وبرنامج تثقيف أولياء الأمور.',
        'وتهدف هذه البرامج إلى تقديم الخدمات المساندة لبرامج المكونات الرئيسية للنموذج التام لتطوير الموهبة، والتي تتفق جميعها في كونها موجّهة نحو خدمات لها علاقة غير مباشرة بالموهبة والإبداع، وتُعتبر أساساً لنجاح عملية الكشف والتطوير التي يهدف إليها النموذج.'
      ],
      en:[
        'The Support Programs consist of four sub-programs: gifted-teacher training, psychological counseling, academic counseling and parent education.',
        'They provide supporting services to the model’s main components; all are indirectly related to giftedness and creativity, and they underpin the success of the identification and development the model aims for.'
      ] },
    subs:[
      { icon:'coach', t:{ ar:'برنامج تدريب معلمي الموهبة', en:'Gifted-teacher training' },
        d:{ ar:'يهدف إلى توفير المواد العلمية النظرية والعملية التي يمكن من خلالها تأهيل معلمي ومرشدي الطلاب الموهوبين بالمعرفة اللازمة والوسائل المستخدمة لكشف الموهبة وتطويرها، وبكيفية التصدي للمشاكل التي قد تصاحبها.', en:'Provides theoretical and practical material to qualify teachers and counselors of gifted students with the knowledge and tools to identify and develop talent, and to handle the problems that may accompany it.' },
        extra:{ ar:'في التطبيق الميداني دُرّب 89 معلماً نظرياً وعملياً على مكونات النموذج في دورة مكثفة مدتها 12 ساعة تدريبية، ودُرّب المشرفون الفنيون على المشاريع الهادفة على إجراءات النموذج في دورة مماثلة.', en:'In the field implementation, 89 teachers were trained theoretically and practically on the model in an intensive 12-hour course, and project supervisors received similar training.' } },
      { icon:'heart', t:{ ar:'برنامج الإرشاد النفسي', en:'Psychological counseling' },
        d:{ ar:'يهدف إلى مساعدة الطلاب الموهوبين على النمو السوي والتكيف الإيجابي في المجالات الاجتماعية والانفعالية والسلوكية.', en:'Helps gifted students grow soundly and adapt positively in social, emotional and behavioral areas.' },
        goals:{ ar:['تطوير مفهوم الذات ليكون متوافقاً مع دلالات الصحة النفسية: الإيجابية، والتفاؤل المقترن بالواقعية، والمرونة، والاتزان الانفعالي، والتوافق الذاتي والاجتماعي، والقدرة على إشباع الدوافع والتكيف معها، والقدرة على العمل والإنتاج المؤدي إلى النجاح والرضا، وتكامل الشخصية، والسعادة والراحة النفسية','توفير الإجراءات الوقائية للتعامل مع الآثار النفسية للموهبة: الوقاية الأولية، والإجراءات الوقائية الحيوية، والإجراءات الوقائية النفسية','توفير الإجراءات الموجهة للعلاج النفسي في حالات الوقاية الثانوية والوقاية في المرحلة الثالثة','توعية المجتمع المدرسي عموماً والمعلمين خصوصاً بالآثار النفسية للموهبة وكيفية التعامل مع الحالات التي تواجههم عملياً','تطوير مواد ووسائل الإرشاد النفسي الموجه نحو المجتمع المدرسي ككل'],
                en:['Develop a self-concept consistent with mental health: positivity, realistic optimism, flexibility, emotional balance, personal and social adjustment, meeting needs, productive work leading to success, integrated personality and well-being','Preventive measures for the psychological effects of giftedness: primary, biological and psychological prevention','Therapeutic measures in secondary and tertiary prevention','Raise awareness among the school community, especially teachers, of giftedness’s psychological effects and how to handle cases','Develop counseling materials and tools for the whole school community'] },
        methods:{ ar:['المقابلة (الإرشاد الفردي)','التعبير الكتابي','الإرشاد الجماعي','الندوات واللقاءات الدورية','الخدمات الاجتماعية','التربية القيادية'], en:['Interview (individual counseling)','Written expression','Group counseling','Seminars and regular meetings','Social services','Leadership education'] },
        target:{ ar:'الطلاب الموهوبون من فئة الوعاء الإثرائي، وقد يوجّه خدماته أحياناً لطلاب تظهر عليهم آثار اجتماعية أو انفعالية أو سلوكية سلبية قد تكون ناتجة عن عدم اكتشاف الموهبة أو تطويرها.', en:'Gifted students in the enrichment pool, and sometimes students showing negative social, emotional or behavioral effects that may stem from undiscovered or undeveloped talent.' } },
      { icon:'target', t:{ ar:'برنامج الإرشاد الأكاديمي', en:'Academic counseling' },
        d:{ ar:'يتكون من المعلومات المستمدة من المقاييس التي تحدد القدرات، والسمات، والاهتمامات، وأساليب التعلم والتفكير والتعبير المفضلة، والميول المهنية، إضافة إلى البرامج الإرشادية والإجراءات التنفيذية المصاحبة؛ ويهدف إلى مساعدة الطلاب على تطوير التوجه اللازم نحو استكشاف المهن المستقبلية والتخطيط لها.', en:'Built on information from measures of abilities, traits, interests, preferred learning, thinking and expression styles and career inclinations, plus counseling programs and procedures; it helps students explore and plan future careers.' },
        goals:{ ar:['تطوير ثقافة التخطيط الأكاديمي الموجه نحو المهن المستقبلية','مساعدة الطلاب على التفكر في الذات وإعادة هيكلة المعتقدات الشخصية بهدف التعرف على شخصياتهم','تطوير مهارات اتخاذ القرار والاستكشاف والتطوير بهدف النظر إلى المستقبل المهني','تطوير مهارات التخطيط البعيد المدى والعزم نحو تحقيق الهدف','تطوير مفاهيم التخطيط المهني المستقبلي كامتداد منطقي لتطوير الموهبة','تدريب الطلاب على تحمّل مسؤولية التخطيط المهني لمستقبلهم'],
                en:['Build a culture of academic planning toward future careers','Help students reflect on themselves and restructure personal beliefs to know themselves','Develop decision-making, exploration and development skills for a career future','Develop long-range planning and determination to reach goals','Develop career planning as a logical extension of talent development','Train students to take responsibility for planning their careers'] },
        target:{ ar:'فئتان من الطلاب: عموم الطلاب، وفئة الوعاء الإثرائي.', en:'Two groups: all students and the enrichment pool.' } },
      { icon:'users', t:{ ar:'برنامج تثقيف أولياء الأمور', en:'Parent education' },
        d:{ ar:'مجموعة من برامج التثقيف الموجهة لأولياء الأمور توفّر المعلومات التي تساعد على توفير المناخ العائلي المناسب لتطور الموهبة، وتعرّفهم بالكيفية التي تمكّنهم من دعم تطور الأبناء في مجال الموهبة والإبداع.', en:'Education programs that give parents the information to create a family climate suited to talent development and show them how to support their children’s giftedness and creativity.' },
        goals:{ ar:['التعريف بالموهبة والإبداع من حيث المعنى والمفهوم','التعريف باحتياجات الموهبة والإبداع','التعريف بوسائل الكشف عن الموهبة والإبداع','التعريف بالمشاكل الاجتماعية والانفعالية والسلوكية التي قد تنتج عن الموهبة','التعريف بكيفية التعامل مع المشاكل الناتجة عن الموهبة','التعريف بالنموذج التام لتطوير الموهبة'],
                en:['The meaning and concept of giftedness and creativity','The needs of giftedness and creativity','How giftedness and creativity are identified','Social, emotional and behavioral problems that may come with giftedness','How to deal with those problems','The Total Giftedness Development Model'] },
        target:{ ar:'جميع أولياء أمور الطلاب في المدارس، مع التركيز على أولياء أمور طلاب فئة الوعاء الإثرائي.', en:'All parents, with a focus on parents of enrichment-pool students.' } }
    ],
    recs:[
      { ar:'من توصيات الدراسة: تكثيف التدريب الموجه نحو رفع كفاءة المعلمين القائمين على برامج الكشف والرعاية في مدارس التعليم العام الحكومية والخاصة.', en:'Recommendation: intensify training to raise the competence of teachers running identification and care programs in public and private schools.' },
      { ar:'ومنها: العمل على زيادة وعي المجتمع بأهمية الكشف عن الموهبة ورعايتها، عن طريق المحاضرات والندوات التي تُقدَّم لأولياء أمور الطلاب في المدارس، والبرامج التلفزيونية والإذاعية والكتابة الصحفية الموجهة نحو الجمهور.', en:'And: raise public awareness of identifying and nurturing talent through lectures and seminars for parents, and TV, radio and press content for the public.' }
    ]
  }
];
