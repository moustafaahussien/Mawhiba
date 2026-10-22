/* =====================================================================
   صفحة «مقياس موهبة» — المعلومات الرسمية (تُحدَّث كل عام)
   المصادر: موقع موهبة (صفحة الخدمة وصفحة البرنامج وسياسات البرنامج)،
   وخبر وكالة الأنباء السعودية عن نتائج النسخة 16، وأخبار فتح التسجيل للنسخة 17.
   ---------------------------------------------------------------------
   للتحديث في عام جديد: غيّر النسخة (edition) والمواعيد (dates) وتاريخ آخر مراجعة (reviewed)،
   وأرقام النسخة السابقة (lastEdition) بعد إعلان النتائج. التواريخ بصيغة سنة-شهر-يوم.
   ===================================================================== */
window.MW_INFO = {
  reviewed: '2026-10-21',
  edition: { ar: 'النسخة السابعة عشرة — 2026م', en: '17th edition — 2026' },

  /* المواعيد: date/end بصيغة YYYY-MM-DD ، أو when للمواعيد غير المحددة */
  dates: [
    { id: 'reg', ic: 'cal', c: '#0E9F76', date: '2026-10-01', end: '2026-12-28',
      ar: 'التسجيل في المقياس عبر منصة «سديد» (هيئة تقويم التعليم والتدريب)', en: 'Registration on the Sadeed platform (Education & Training Evaluation Commission)',
      note: { ar: 'سجّل مبكراً: المقرات والمواعيد تُحجز حسب المقاعد المتاحة، والمقاعد تقل كلما اقترب آخر موعد.', en: 'Register early: venues and dates are booked by available seats, which fill up as the deadline approaches.' } },
    { id: 'test', ic: 'clock', c: '#7B4DFF',
      ar: 'أداء المقياس حضورياً في مقرات «قياس» المحوسبة', en: 'Sitting the test in person at Qiyas computer-based centres',
      when: { ar: 'في الموعد والمقر اللذين يختارهما الطالب عند التسجيل', en: 'On the date and at the venue the student chooses when registering' },
      note: { ar: 'في النسخة السابقة طُبّق المقياس خلال فترة التسجيل نفسها (نوفمبر – ديسمبر).', en: 'In the previous edition the test was held during the registration period itself (November – December).' } },
    { id: 'res', ic: 'medal', c: '#E8A50A',
      ar: 'إعلان النتائج', en: 'Results announced',
      when: { ar: 'يُعلن لاحقاً', en: 'To be announced' },
      note: { ar: 'أُعلنت نتائج النسخة السادسة عشرة في 16 فبراير 2026م، وتظهر الدرجة في سجل الطالب على موقع موهبة.', en: 'The 16th edition results were announced on 16 February 2026; the score appears in the student’s record on the Mawhiba website.' } }
  ],

  fee: { amount: 200, ar: '200 ريال مساهمة ولي الأمر عند الترشيح الذاتي', en: '200 SAR parent contribution for self-nomination' },

  levels: [
    { n: 1, q: 64, c: '#0EA5D6', grades: { ar: 'الثالث والرابع والخامس الابتدائي', en: 'Grades 3, 4 and 5' } },
    { n: 2, q: 96, c: '#7B4DFF', grades: { ar: 'السادس الابتدائي، والأول والثاني المتوسط', en: 'Grade 6, and grades 7 and 8 (1st & 2nd intermediate)' } },
    { n: 3, q: 120, c: '#E2386F', grades: { ar: 'الثالث المتوسط، والأول الثانوي', en: 'Grade 9 (3rd intermediate) and grade 10 (1st secondary)' } }
  ],
  /* الصفوف لأداة «اعرف مستواك» — الرقم بعد الصف هو المستوى */
  gradeMap: [
    ['الثالث الابتدائي', 'Grade 3', 1], ['الرابع الابتدائي', 'Grade 4', 1], ['الخامس الابتدائي', 'Grade 5', 1],
    ['السادس الابتدائي', 'Grade 6', 2], ['الأول المتوسط', 'Grade 7 (1st intermediate)', 2], ['الثاني المتوسط', 'Grade 8 (2nd intermediate)', 2],
    ['الثالث المتوسط', 'Grade 9 (3rd intermediate)', 3], ['الأول الثانوي', 'Grade 10 (1st secondary)', 3]
  ],

  /* المجالات الأربعة — التعريف وفق صفحة البرنامج على موقع موهبة */
  domains: [
    { id: 'verbal', c: '#E2386F', ic: 'book',
      name: { ar: 'الاستدلال اللغوي وفهم المقروء', en: 'Linguistic reasoning & reading comprehension' },
      def: { ar: 'توظيف قواعد اللغة لتفسير المعنى واستخلاصه وإعادة تنظيمه من النص.', en: 'Applying language rules to interpret, extract and reorganise meaning from text.' } },
    { id: 'math', c: '#7B4DFF', ic: 'grid',
      name: { ar: 'الاستدلال الرياضي والمكاني', en: 'Mathematical & spatial reasoning' },
      def: { ar: 'استخدام المهارات الرياضية والمنطق للوصول إلى الحلول وإدراك العلاقات.', en: 'Using maths skills and logic to reach solutions and identify relationships.' } },
    { id: 'science', c: '#0E9F76', ic: 'atom',
      name: { ar: 'الاستدلال العلمي والميكانيكي', en: 'Scientific & mechanical reasoning' },
      def: { ar: 'استخلاص النتائج من البيانات والأدلة والاستنتاج المنطقي.', en: 'Drawing conclusions from data, evidence and logical deduction.' } },
    { id: 'flex', c: '#E8A50A', ic: 'brain',
      name: { ar: 'المرونة العقلية', en: 'Mental flexibility' },
      def: { ar: 'توليد أفكار متنوعة، وتغيير طريقة التفكير، وتفكيك المشكلات إلى عناصر يمكن التعامل معها.', en: 'Generating varied ideas, shifting approaches, and breaking problems into workable parts.' } }
  ],

  /* أنواع الأسئلة في مكتبة التدريب (تصنيف تدريبي من إعداد المنصة) */
  types: {
    verbal: [
      { id: 'analogy', name: { ar: 'التناظر اللفظي', en: 'Verbal analogy' },
        what: { ar: 'زوج من الكلمات بينهما علاقة، والمطلوب زوج آخر بالعلاقة نفسها.', en: 'A pair of words with a relation; find another pair with the same relation.' },
        tips: { ar: ['صُغ العلاقة في جملة قصيرة: «العُشّ بيتُ الطائر».', 'جرّب الجملة نفسها على كل بديل، واستبعد ما لا يناسبها.', 'انتبه لاتجاه العلاقة: «الكل : الجزء» غير «الجزء : الكل».'],
                en: ['Put the relation into a short sentence: “a nest is a bird’s home”.', 'Test that same sentence on every option and drop those that do not fit.', 'Watch the direction: “whole : part” is not the same as “part : whole”.'] } },
      { id: 'completion', name: { ar: 'إكمال الجمل', en: 'Sentence completion' },
        what: { ar: 'جملة فيها فراغ أو فراغان، والمطلوب الكلمة التي تجعل المعنى متسقاً.', en: 'A sentence with one or two blanks; choose the words that make the meaning consistent.' },
        tips: { ar: ['ابحث عن أدوات الربط: «لأنّ، لكنّ، رغم، بل، فـ» فهي تحدد نوع العلاقة.', '«رغم» و«لكن» تعني تعارضاً، و«لأن» و«فـ» تعني سبباً ونتيجة.', 'في الفراغين: تحقّق من الكلمتين معاً لا من واحدة فقط.'],
                en: ['Look for linking words: because, but, despite, rather, so — they set the relation.', '“Despite/but” signal contrast; “because/so” signal cause and effect.', 'With two blanks, check both words together, not just one.'] } },
      { id: 'context', name: { ar: 'الخطأ السياقي', en: 'Contextual error' },
        what: { ar: 'جملة فيها كلمة واحدة تُفسد المعنى، والمطلوب تحديدها.', en: 'A sentence where one word spoils the meaning; identify it.' },
        tips: { ar: ['اقرأ الجملة كاملة واسأل: ما الفكرة التي يريدها الكاتب؟', 'ابحث عن الكلمة التي تناقض السبب أو النتيجة.', 'جرّب استبدال الكلمة المشكوك فيها بضدها: إذا استقام المعنى فهي الخطأ.'],
                en: ['Read the whole sentence and ask: what is the writer trying to say?', 'Look for the word that contradicts the cause or the result.', 'Swap the suspicious word for its opposite: if the sentence now makes sense, that was the error.'] } },
      { id: 'reading', name: { ar: 'استيعاب المقروء', en: 'Reading comprehension' },
        what: { ar: 'نص قصير يتبعه سؤال عن فكرته أو تفاصيله أو ما يُستنتج منه.', en: 'A short passage followed by a question on its idea, details or what can be inferred.' },
        tips: { ar: ['اقرأ السؤال أولاً لتعرف ما تبحث عنه، ثم اقرأ النص.', 'الإجابة الصحيحة يدعمها النص؛ لا تعتمد على معلوماتك الخارجية.', 'احذر البدائل التي تحمل كلمات من النص بمعنى مختلف.'],
                en: ['Read the question first so you know what to look for, then read the text.', 'The right answer is supported by the text; do not rely on outside knowledge.', 'Beware of options that reuse words from the text with a different meaning.'] } },
      { id: 'odd', name: { ar: 'المفردة المختلفة', en: 'Odd one out' },
        what: { ar: 'مجموعة كلمات تشترك كلها في صفة إلا واحدة.', en: 'A group of words that all share a feature except one.' },
        tips: { ar: ['ابحث عن الصفة المشتركة الأقوى أولاً (النوع، المعنى، الوظيفة).', 'إذا وجدت أكثر من معيار، اختر المعيار الذي يجعل كلمة واحدة فقط مختلفة.'],
                en: ['Find the strongest shared feature first (type, meaning, function).', 'If several rules seem possible, choose the one that leaves exactly one word out.'] } },
      { id: 'vocab', name: { ar: 'المفردات والتضاد', en: 'Vocabulary & opposites' },
        what: { ar: 'معنى كلمة منفردة أو في سياق جملة، أو عكسها.', en: 'The meaning of a word on its own or in a sentence, or its opposite.' },
        tips: { ar: ['ضع كل بديل مكان الكلمة في جملة قصيرة، واختر ما يستقيم به المعنى.', 'الكلمة الواحدة قد يتغير معناها بتغير السياق؛ اقرأ الجملة كلها.', 'في التضاد: ابحث عن العكس الدقيق لا عن كلمة مختلفة فقط.'],
                en: ['Put each option in place of the word in a short sentence and keep the one that makes sense.', 'One word can change meaning with context, so read the whole sentence.', 'For opposites, look for the exact reverse, not just a different word.'] } }
    ],
    math: [
      { id: 'arith', name: { ar: 'الاستدلال الحسابي', en: 'Arithmetic reasoning' },
        what: { ar: 'عمليات على الأعداد والكسور والنسب المئوية تحتاج تفكيراً لا حفظاً.', en: 'Work with whole numbers, fractions and percentages that needs reasoning rather than recall.' },
        tips: { ar: ['اعكس الخطوات حين تعرف الناتج وتبحث عن العدد.', 'جرّب البدائل في المسألة بدل الحل الطويل عندما يكون ذلك أسرع.', 'قدّر الإجابة أولاً لتستبعد البدائل البعيدة.'],
                en: ['Work backwards when you know the result and need the starting number.', 'Plug the options into the problem when that is faster than solving.', 'Estimate first to rule out options that are far off.'] } },
      { id: 'sequence', name: { ar: 'المتتابعات العددية', en: 'Number sequences' },
        what: { ar: 'سلسلة أعداد تتبع قاعدة، والمطلوب العدد التالي.', en: 'A series of numbers that follows a rule; find the next one.' },
        tips: { ar: ['احسب الفروق بين الأعداد المتتالية، ثم فروق الفروق.', 'جرّب الضرب والقسمة إذا كانت الأعداد تكبر بسرعة.', 'ابحث عن قاعدتين بالتناوب إذا لم تنجح قاعدة واحدة.'],
                en: ['Find the differences between terms, then the differences of the differences.', 'Try multiplying or dividing if the numbers grow quickly.', 'Look for two alternating rules if one rule does not work.'] } },
      { id: 'word', name: { ar: 'المسائل اللفظية', en: 'Word problems' },
        what: { ar: 'موقف من الحياة يُترجم إلى عمليات حسابية.', en: 'A real-life situation translated into calculations.' },
        tips: { ar: ['حدّد المطلوب بدقة: الباقي؟ المجموع؟ الفرق؟', 'اكتب المعطيات في سطر واحد قبل الحساب.', 'تحقّق من إجابتك بإعادتها إلى المسألة.'],
                en: ['Identify exactly what is asked: what is left? the total? the difference?', 'Write the given facts on one line before calculating.', 'Check your answer by putting it back into the problem.'] } },
      { id: 'logic', name: { ar: 'الاستدلال المنطقي', en: 'Logical reasoning' },
        what: { ar: 'ترتيب أو مواقع أو أعمار تُستنتج من شروط.', en: 'Orders, positions or ages deduced from conditions.' },
        tips: { ar: ['ارسم: خطاً أو جدولاً صغيراً يوضح الشروط.', 'ابدأ بالشرط الأكثر تحديداً.', 'إذا ظهرت أكثر من حالة، ابحث عمّا هو ثابت في كل الحالات.'],
                en: ['Draw a line or a small table showing the conditions.', 'Start with the most specific condition.', 'If several cases are possible, look for what is the same in all of them.'] } },
      { id: 'spatial', name: { ar: 'الاستدلال المكاني', en: 'Spatial reasoning' },
        what: { ar: 'الدوران، والطيّ، وشبكات المكعبات، والعدّ في الأشكال.', en: 'Rotation, folding, cube nets and counting in figures.' },
        tips: { ar: ['تتبّع جزءاً مميزاً واحداً في الشكل (رأس السهم، النقطة) بدل الشكل كله.', 'في شبكة المكعب: المربعان اللذان بينهما مربع واحد في خط مستقيم متقابلان.', 'في الطيّ: كل طيّة تضاعف عدد الطبقات.'],
                en: ['Follow one distinctive part (the arrow tip, a dot) rather than the whole figure.', 'In a cube net, two squares in a straight line with one square between them are opposite.', 'In folding, each fold doubles the number of layers.'] } },
      { id: 'geometry', name: { ar: 'القياس والهندسة', en: 'Measurement & geometry' },
        what: { ar: 'المساحة والمحيط والزوايا في أشكال مركبة.', en: 'Area, perimeter and angles in combined shapes.' },
        tips: { ar: ['فرّق بين المساحة (داخل الشكل) والمحيط (حوله).', 'جزّئ الشكل المركب إلى مستطيلات ومثلثات.'],
                en: ['Keep area (inside the shape) and perimeter (around it) apart.', 'Split a combined shape into rectangles and triangles.'] } },
      { id: 'visual', name: { ar: 'الأنماط البصرية والمصفوفات', en: 'Visual patterns & matrices' },
        what: { ar: 'أشكال متتالية أو جدول أشكال تتغير بقاعدة: العدد، الأضلاع، التظليل، الموضع.', en: 'A row of figures or a grid of figures that changes by a rule: number, sides, shading, position.' },
        tips: { ar: ['حوّل الشكل إلى عدد: عدد الأضلاع أو النقاط أو الخانات المظللة.', 'افحص خاصية واحدة في كل مرة حتى تكتشف ما يتغير.', 'في المصفوفة: تحقّق من الصف ومن العمود معاً.'],
                en: ['Turn each figure into a number: sides, dots or shaded cells.', 'Check one feature at a time until you find what changes.', 'In a matrix, check both the row and the column.'] } },
      { id: 'graphs', name: { ar: 'الجداول والرسوم البيانية', en: 'Tables & graphs' },
        what: { ar: 'قراءة بيانات من جدول أو أعمدة بيانية، والمقارنة والحساب منها.', en: 'Reading data from a table or bar chart, then comparing and calculating with it.' },
        tips: { ar: ['اقرأ عنوان الرسم ووحدة المحور قبل الأرقام.', 'حدّد الأعمدة التي يسأل عنها السؤال فقط.', 'انتبه: «كم يزيد» فرق، و«كم المجموع» جمع.'],
                en: ['Read the chart title and the axis unit before the numbers.', 'Pick out only the bars the question asks about.', 'Careful: “how many more” is a difference; “how many altogether” is a sum.'] } }
    ],
    science: [
      { id: 'mech', name: { ar: 'الاستدلال الميكانيكي', en: 'Mechanical reasoning' },
        what: { ar: 'التروس والروافع والبكرات والتوازن.', en: 'Gears, levers, pulleys and balance.' },
        tips: { ar: ['كل ترس يعكس اتجاه الترس الذي يلامسه، والترس الأصغر أسرع.', 'الرافعة تتوازن حين يتساوى (الوزن × المسافة) في الجهتين.', 'البكرة المتحركة تقلل القوة إلى النصف، والثابتة تغيّر الاتجاه فقط.'],
                en: ['Each gear turns opposite to the gear it touches; the smaller gear is faster.', 'A lever balances when (weight × distance) is equal on both sides.', 'A movable pulley halves the force; a fixed one only changes its direction.'] } },
      { id: 'concept', name: { ar: 'المفاهيم والاستنتاج العلمي', en: 'Science concepts & inference' },
        what: { ar: 'تفسير ظاهرة أو التنبؤ بما يحدث اعتماداً على مفهوم علمي.', en: 'Explaining a phenomenon or predicting what will happen from a science idea.' },
        tips: { ar: ['اسأل: ما المفهوم العلمي وراء الموقف؟ (حالة المادة، الضوء، الطاقة، القوة...)', 'استبعد البدائل التي تخالف قانوناً معروفاً (الطاقة لا تفنى، الكتلة لا تزيد بالتسخين).'],
                en: ['Ask: which science idea is behind this? (states of matter, light, energy, force...)', 'Rule out options that break a known law (energy is not destroyed; heating does not add mass).'] } },
      { id: 'data', name: { ar: 'تحليل البيانات والتجارب', en: 'Data & experiments' },
        what: { ar: 'قراءة جدول أو رسم بياني، واستخلاص نتيجة، وتصميم تجربة عادلة.', en: 'Reading a table or graph, drawing a conclusion and designing a fair test.' },
        tips: { ar: ['حدّد ما الذي تغيّر وما الذي بقي ثابتاً.', 'الاستنتاج الصحيح تدعمه كل البيانات لا بعضها.', 'التجربة العادلة تغيّر متغيراً واحداً فقط.'],
                en: ['Identify what changed and what stayed the same.', 'A valid conclusion is supported by all the data, not just part of it.', 'A fair test changes only one variable.'] } }
    ],
    flex: [
      { id: 'codes', name: { ar: 'الترميز واكتشاف القاعدة', en: 'Codes & hidden rules' },
        what: { ar: 'رموز أو عمليات جديدة، والمطلوب اكتشاف معناها وتطبيقه.', en: 'New symbols or operations whose meaning you must discover and apply.' },
        tips: { ar: ['قارن الأمثلة: ما المشترك بين اثنين منها؟', 'صُغ القاعدة ثم اختبرها على كل الأمثلة قبل استخدامها.'],
                en: ['Compare the examples: what do two of them share?', 'State the rule, then test it on every example before using it.'] } },
      { id: 'rules', name: { ar: 'تبديل القواعد', en: 'Switching rules' },
        what: { ar: 'قاعدة غير مألوفة تحل محل المعتاد، أو قاعدتان متتاليتان.', en: 'An unusual rule replaces the familiar one, or two rules apply in turn.' },
        tips: { ar: ['اكتب القاعدة الجديدة أمامك قبل الحل حتى لا تعود إلى العادة.', 'نفّذ الخطوات واحدة واحدة وتابع الناتج بعد كل خطوة.'],
                en: ['Write the new rule down before solving so you do not slip back into habit.', 'Apply the steps one at a time and track the result after each.'] } },
      { id: 'matrix', name: { ar: 'المصفوفات الشكلية', en: 'Figure matrices' },
        what: { ar: 'جدول أشكال 3×3 تحكمه قاعدة أو قاعدتان، وخانة ناقصة.', en: 'A 3×3 grid of figures governed by one or two rules, with a missing cell.' },
        tips: { ar: ['ابحث عن قاعدة الصفوف ثم قاعدة الأعمدة.', 'الخصائص المعتادة: الشكل، العدد، التظليل، الاتجاه.', 'البديل الصحيح يحقق القاعدتين معاً.'],
                en: ['Find the row rule, then the column rule.', 'Usual features: shape, number, shading, direction.', 'The right option satisfies both rules at once.'] } },
      { id: 'classify', name: { ar: 'التصنيف المرن', en: 'Flexible classification' },
        what: { ar: 'تصنيف الأشياء بأكثر من معيار، أو بمعيار يحدده السؤال.', en: 'Sorting things by more than one feature, or by a feature the question sets.' },
        tips: { ar: ['اقرأ المعيار المطلوب بدقة؛ تغيير المعيار يغيّر الإجابة.', 'لا تتمسك بأول تصنيف خطر ببالك.'],
                en: ['Read the required feature carefully; a different feature gives a different answer.', 'Do not cling to the first grouping that comes to mind.'] } },
      { id: 'perspective', name: { ar: 'تعدد الزوايا والاحتمالات', en: 'Perspectives & possibilities' },
        what: { ar: 'النظر إلى الموقف من زاوية أخرى (مرآة، قلب، ترتيب) أو عدّ الاحتمالات.', en: 'Seeing a situation from another angle (mirror, flip, order) or counting possibilities.' },
        tips: { ar: ['تخيّل الحركة فعلياً: اقلب الورقة في ذهنك أو بيدك أثناء التدريب.', 'في العدّ: اعرف كم خياراً لكل مكان ثم اضربها.'],
                en: ['Picture the movement: turn the paper in your mind, or with your hands while practising.', 'For counting, find the number of choices for each place, then multiply.'] } },
      { id: 'imagine', name: { ar: 'التخيّل المكاني', en: 'Spatial visualisation' },
        what: { ar: 'تدوير الأشكال وقلبها في الذهن، وعدّ المكعبات، وتخيّل المجسمات من زوايا مختلفة.', en: 'Rotating and flipping shapes in your head, counting cubes, and picturing solids from different sides.' },
        tips: { ar: ['تتبّع جزءاً مميزاً واحداً من الشكل أثناء الدوران.', 'الانعكاس في المرآة يقلب اليمين واليسار، والدوران لا يقلبهما.', 'في عدّ المكعبات: عُدّ طبقة طبقة، ولا تنسَ المكعبات المخفية التي تحمل غيرها.'],
                en: ['Follow one distinctive part of the shape while it turns.', 'A mirror swaps left and right; a rotation does not.', 'When counting cubes, go layer by layer and remember hidden cubes that hold others up.'] } }
    ]
  },


  /* المهارات: تصنيف أدق داخل كل نوع (المجال ← النوع ← المهارة) */
  skills: {
    verbal: [
      { id: 'meaning', t: 'vocab', ar: 'معنى المفردة', en: 'Word meaning' },
      { id: 'incontext', t: 'vocab', ar: 'المفردة في سياقها', en: 'Word in context' },
      { id: 'antonym', t: 'vocab', ar: 'التضاد اللفظي', en: 'Opposites' },
      { id: 'analogy', t: 'analogy', ar: 'التناظر اللفظي', en: 'Verbal analogy' },
      { id: 'assoc', t: 'analogy', ar: 'الارتباط الدلالي المشترك', en: 'Common link' },
      { id: 'odd-func', t: 'odd', ar: 'الكلمة الشاذة — معيار وظيفي', en: 'Odd one out — by use' },
      { id: 'odd-class', t: 'odd', ar: 'الكلمة الشاذة — معيار تصنيفي', en: 'Odd one out — by category' },
      { id: 'complete', t: 'completion', ar: 'إكمال الجملة', en: 'Sentence completion' },
      { id: 'context', t: 'context', ar: 'الخطأ السياقي', en: 'Contextual error' },
      { id: 'reading', t: 'reading', ar: 'فهم المقروء', en: 'Reading comprehension' },
      { id: 'moral', t: 'reading', ar: 'استخلاص العبرة', en: 'Finding the lesson' }
    ],
    math: [
      { id: 'ops', t: 'arith', ar: 'العمليات الحسابية', en: 'Operations' },
      { id: 'fractions', t: 'arith', ar: 'الكسور', en: 'Fractions' },
      { id: 'percent', t: 'arith', ar: 'النسبة المئوية', en: 'Percentages' },
      { id: 'ratio', t: 'arith', ar: 'التناسب', en: 'Proportion' },
      { id: 'wordp', t: 'word', ar: 'المسائل اللفظية', en: 'Word problems' },
      { id: 'ages', t: 'word', ar: 'الأعمار', en: 'Ages' },
      { id: 'time', t: 'word', ar: 'الوقت', en: 'Time' },
      { id: 'prob', t: 'word', ar: 'الاحتمال', en: 'Probability' },
      { id: 'area', t: 'geometry', ar: 'المساحة', en: 'Area' },
      { id: 'perim', t: 'geometry', ar: 'المحيط', en: 'Perimeter' },
      { id: 'numseq', t: 'sequence', ar: 'المتتابعات العددية', en: 'Number sequences' },
      { id: 'visseq', t: 'visual', ar: 'المتتابعة البصرية', en: 'Visual sequences' },
      { id: 'mmatrix', t: 'visual', ar: 'المصفوفات', en: 'Matrices' },
      { id: 'graph', t: 'graphs', ar: 'قراءة الرسم البياني', en: 'Reading graphs' },
      { id: 'order', t: 'logic', ar: 'الترتيب المنطقي', en: 'Logical ordering' },
      { id: 'mspatial', t: 'spatial', ar: 'الدوران والطيّ والعدّ', en: 'Turning, folding & counting' }
    ],
    science: [
      { id: 'organisms', t: 'concept', ar: 'تصنيف الكائنات', en: 'Classifying living things' },
      { id: 'lifecycle', t: 'concept', ar: 'دورات الحياة', en: 'Life cycles' },
      { id: 'body', t: 'concept', ar: 'أجهزة الجسم', en: 'Body systems' },
      { id: 'foodchain', t: 'concept', ar: 'السلاسل الغذائية', en: 'Food chains' },
      { id: 'matter', t: 'concept', ar: 'تحولات المادة', en: 'Changes of matter' },
      { id: 'light', t: 'concept', ar: 'خصائص الضوء', en: 'Properties of light' },
      { id: 'sound', t: 'concept', ar: 'الصوت', en: 'Sound' },
      { id: 'gravity', t: 'concept', ar: 'الجاذبية', en: 'Gravity' },
      { id: 'magnet', t: 'concept', ar: 'المغناطيسية', en: 'Magnetism' },
      { id: 'heat', t: 'concept', ar: 'انتقال الحرارة', en: 'Heat transfer' },
      { id: 'electric', t: 'concept', ar: 'الكهرباء', en: 'Electricity' },
      { id: 'method', t: 'data', ar: 'منهج العلم والتجارب', en: 'Scientific method' },
      { id: 'friction', t: 'mech', ar: 'الاحتكاك', en: 'Friction' },
      { id: 'gears', t: 'mech', ar: 'التروس', en: 'Gears' },
      { id: 'pulleys', t: 'mech', ar: 'البكرات', en: 'Pulleys' },
      { id: 'lever', t: 'mech', ar: 'الرافعة والتوازن', en: 'Levers & balance' }
    ],
    flex: [
      { id: 'counterfact', t: 'rules', ar: 'المقدمة غير الواقعية', en: 'Unreal premises' },
      { id: 'switch', t: 'rules', ar: 'تبديل القواعد', en: 'Switching rules' },
      { id: 'coding', t: 'codes', ar: 'الترميز', en: 'Coding' },
      { id: 'hidden', t: 'codes', ar: 'القاعدة الخفية', en: 'Hidden rule' },
      { id: 'direction', t: 'perspective', ar: 'أنماط الاتجاه', en: 'Direction patterns' },
      { id: 'persp', t: 'perspective', ar: 'تعدد الزوايا والاحتمالات', en: 'Perspectives & possibilities' },
      { id: 'spatial2d', t: 'imagine', ar: 'التخيّل المكاني', en: 'Spatial visualisation' },
      { id: 'spatial3d', t: 'imagine', ar: 'التخيّل ثلاثي الأبعاد', en: '3D visualisation' },
      { id: 'fmatrix', t: 'matrix', ar: 'المصفوفات الشكلية', en: 'Figure matrices' },
      { id: 'fclass', t: 'classify', ar: 'التصنيف المرن', en: 'Flexible classification' }
    ]
  },
  diffs: [{ n: 1, ar: 'سهل', en: 'Easy', c: '#0E9F76' }, { n: 2, ar: 'متوسط', en: 'Medium', c: '#E8A50A' }, { n: 3, ar: 'صعب', en: 'Hard', c: '#E2386F' }],

  /* خطوات التسجيل — وفق صفحة الخدمة على موقع موهبة */
  steps: [
    { ar: 'الدخول إلى منصة «سديد»', en: 'Sign in to the Sadeed platform',
      d: { ar: 'من رابط التسجيل الرسمي، بحساب الطالب لدى هيئة تقويم التعليم والتدريب (أو إنشاء حساب جديد).', en: 'Through the official registration link, using the student’s account with the Education & Training Evaluation Commission (or create a new one).' } },
    { ar: 'تأكيد بيانات الملف الشخصي', en: 'Confirm the profile details',
      d: { ar: 'الاسم الرباعي مطابق للهوية، والصف الدراسي الفعلي، ومدينة السكن الفعلية.', en: 'Full four-part name matching the ID, the actual grade, and the actual city of residence.' } },
    { ar: 'اختيار «مقياس موهبة للقدرات العقلية المتعددة»', en: 'Choose the “Mawhiba Multiple Mental Abilities Test”',
      d: { ar: 'من قائمة الاختبارات المتاحة، مع تحديد لغة الاختبار: العربية أو الإنجليزية.', en: 'From the list of available tests, and choose the test language: Arabic or English.' } },
    { ar: 'اختيار المقر والموعد', en: 'Choose the venue and date',
      d: { ar: 'من مقرات «قياس» المحوسبة في المدينة؛ التسجيل المبكر يعطي خيارات أكثر.', en: 'From the Qiyas computer-based centres in your city; registering early gives more choice.' } },
    { ar: 'الموافقة على الشروط والأحكام', en: 'Accept the terms and conditions',
      d: { ar: 'اقرأها مع ولي الأمر، ومنها الالتزام بسياسات البرنامج.', en: 'Read them with a parent; they include following the program’s policies.' } },
    { ar: 'سداد المساهمة المالية', en: 'Pay the contribution',
      d: { ar: '200 ريال في حالة الترشيح الذاتي، ويُعفى منها المرشحون عبر «الترشيح المدعوم».', en: '200 SAR for self-nomination; students nominated through “supported nomination” are exempt.' } }
  ],

  /* تنبيهات مهمة — من سياسات البرنامج وصفحة الخدمة */
  rules: [
    { ar: 'يُختبر الطالب مرة واحدة فقط في كل مستوى.', en: 'A student sits the test only once per level.' },
    { ar: 'سجّل في صفك الدراسي الفعلي؛ من يختبر في غير صفه تُلغى درجته وتقع المسؤولية عليه.', en: 'Register in your actual grade; a score taken in a different grade is cancelled, and the responsibility is the student’s.' },
    { ar: 'سجّل في مدينة سكنك الفعلية؛ مخالفة ذلك قد تؤدي إلى حجب الدرجة وفقد الترشيح دون استرداد المبلغ.', en: 'Register in your actual city of residence; otherwise the score may be withheld and the nomination lost, with no refund.' },
    { ar: 'يجب أن يطابق الاسمُ الرباعي الهويةَ الوطنية أو الإقامة.', en: 'The four-part name must match the national ID or residence permit.' },
    { ar: 'من لم يتمكن من الحضور يمكنه التسجيل في العام التالي إذا كان ما زال في صف مستهدف.', en: 'A student who misses the test can register next year if still in a target grade.' },
    { ar: 'المرشحون عبر «الترشيح المدعوم» يلزمهم تأكيد الحضور واختيار المقر والموعد خلال فترة الترشيح، وإلا أُلغي الترشيح.', en: 'Students under “supported nomination” must confirm attendance and choose a venue and date within the nomination window, or the nomination is cancelled.' }
  ],

  /* يوم الاختبار */
  testDay: [
    { ar: 'أحضر إثبات الشخصية المطلوب.', en: 'Bring the required proof of identity.', official: true },
    { ar: 'احضر في الموعد والمكان المحددين، والتزم بتعليمات يوم الاختبار.', en: 'Arrive at the set time and place and follow the test-day instructions.', official: true },
    { ar: 'نَم جيداً في الليلة السابقة، وتناول إفطاراً خفيفاً.', en: 'Sleep well the night before and have a light breakfast.' },
    { ar: 'اقرأ تعليمات كل جزء على الشاشة قبل أن تبدأ.', en: 'Read each part’s on-screen instructions before you start.' },
    { ar: 'وزّع وقتك: لا تعلق طويلاً عند سؤال صعب، وأجب عن كل الأسئلة.', en: 'Manage your time: do not get stuck on a hard question, and answer every question.' }
  ],

  /* بعد الاختبار */
  after: [
    { ic: 'chart', ar: 'الدرجة من 1000 إلى 2000', en: 'Score from 1000 to 2000',
      d: { ar: 'وتبقى صالحة حتى ينتقل الطالب إلى المستوى التالي.', en: 'It stays valid until the student moves up to the next level.' } },
    { ic: 'users', ar: 'تصنيف المكتشفين', en: 'How students are identified',
      d: { ar: 'أعلنت موهبة في النسخة السابقة ثلاث فئات: موهبة استثنائية، وموهوب، وواعد بالموهبة.', en: 'In the last edition Mawhiba announced three groups: exceptional talent, gifted, and promising.' } },
    { ic: 'star', ar: 'بوابة إلى برامج موهبة', en: 'A gateway to Mawhiba programs',
      d: { ar: 'يُرشَّح المكتشفون لبرامج موهبة حسب معايير كل برنامج: فصول موهبة، وبرنامج موهبة المتقدم في العلوم والرياضيات، والبرامج الإثرائية والبحثية، وبرامج وزارة التعليم.', en: 'Identified students are nominated for Mawhiba programs according to each program’s criteria: Mawhiba Classes, the Advanced Program in Science and Mathematics, enrichment and research programs, and Ministry of Education programs.' } }
  ],

  /* أرقام النسخة السابقة — وكالة الأنباء السعودية، 16 فبراير 2026م */
  lastEdition: {
    title: { ar: 'نتائج النسخة السادسة عشرة (2026م)', en: '16th edition results (2026)' },
    src: 'https://www.spa.gov.sa/N2513416',
    items: [
      { n: 94323, ar: 'طالباً وطالبة سجّلوا', en: 'students registered' },
      { n: 89843, ar: 'أدّوا المقياس', en: 'sat the test' },
      { n: 34358, ar: 'موهوباً اكتُشفوا', en: 'gifted students identified' },
      { n: 2469, ar: 'منهم موهبة استثنائية', en: 'of them exceptional talents' },
      { n: 41047, ar: 'طالباً واعداً بالموهبة', en: 'promising students' }
    ]
  },

  /* الروابط الرسمية */
  links: [
    { ic: 'link', c: '#0E9F76', url: 'https://sadeed.etec.gov.sa/auth/signin', ar: 'التسجيل في المقياس — منصة سديد', en: 'Register for the test — Sadeed platform', d: { ar: 'هيئة تقويم التعليم والتدريب', en: 'Education & Training Evaluation Commission' } },
    { ic: 'info', c: '#7B4DFF', url: 'https://www.mawhiba.sa/services/the-national-program-for-gifted-identification/', ar: 'صفحة الخدمة على موقع موهبة', en: 'Service page on the Mawhiba website', d: { ar: 'الشروط والفئة المستهدفة وخطوات التسجيل', en: 'Conditions, target grades and registration steps' } },
    { ic: 'book', c: '#E2386F', url: 'https://www.mawhiba.sa/discover-mawhiba/programs/national-program-for-gifted-identification/national-program-for-gifted-identification/', ar: 'البرنامج الوطني للكشف عن الموهوبين', en: 'National Program for Gifted Identification', d: { ar: 'التعريف بالمقياس ومجالاته والبرامج التي تليه', en: 'About the test, its domains and the programs that follow' } },
    { ic: 'pdf', c: '#E8A50A', url: 'https://www.mawhiba.sa/media/sgcio0w0/1001361-contantfile.pdf', ar: 'سياسات البرنامج الوطني للكشف عن الموهوبين (PDF)', en: 'Program policies (PDF, Arabic)', d: { ar: 'الأهلية والترشيح وحضور المقياس وحجب الدرجة', en: 'Eligibility, nomination, attendance and score withholding' } },
    { ic: 'pdf', c: '#0EA5D6', url: 'https://www.mawhiba.sa/media/hnre34tr/the-national-program-for-gifted-identification-25.pdf', ar: 'التعريف بالبرنامج (PDF)', en: 'Program profile (PDF)', d: { ar: 'ملف تعريفي من موهبة', en: 'A profile document from Mawhiba' } },
    { ic: 'list', c: '#0C93C0', url: 'https://www.mawhiba.sa/common-questions/', ar: 'الأسئلة الشائعة', en: 'Frequently asked questions', d: { ar: 'موقع موهبة', en: 'Mawhiba website' } },
    { ic: 'mail', c: '#C2410C', url: 'https://www.mawhiba.sa/contact-us/', ar: 'التواصل مع موهبة', en: 'Contact Mawhiba', d: { ar: 'الهاتف الموحد 920014025 · info@mawhiba.org.sa', en: 'Unified number 920014025 · info@mawhiba.org.sa' } }
  ],

  /* معلومات عامة عن المقياس */
  facts: [
    { ic: 'clock', ar: 'منذ 2011م', en: 'Since 2011', d: { ar: 'الأداة الرئيسة للبرنامج الوطني، بالشراكة بين موهبة ووزارة التعليم وهيئة تقويم التعليم والتدريب.', en: 'The main tool of the national program, run by Mawhiba with the Ministry of Education and the Education & Training Evaluation Commission.' } },
    { ic: 'globe', ar: 'عربي أو إنجليزي', en: 'Arabic or English', d: { ar: 'يختار الطالب لغة الاختبار عند التسجيل.', en: 'The student chooses the test language when registering.' } },
    { ic: 'pin', ar: 'أكثر من 100 مقر', en: '100+ centres', d: { ar: 'مقرات «قياس» المحوسبة في مناطق المملكة.', en: 'Qiyas computer-based centres across the Kingdom.' } },
    { ic: 'check', ar: 'اختيار من متعدد', en: 'Multiple choice', d: { ar: 'أسئلة محوسبة كلها من نوع الاختيار من متعدد.', en: 'All questions are computer-based multiple choice.' } }
  ]
};
