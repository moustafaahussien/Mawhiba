/* =====================================================================
   بنك الاختبارات السابقة التفاعلي — صفحة المسابقة (competition.html)
   الأسئلة نفسها في ملفات موهبة الرسمية (تُفتح من موقعها)، والصفحة تقدّم:
   ورقة إجابة تفاعلية + مؤقّت + تصحيح فوري بمفتاح الإجابة الرسمي ودرجات كل سؤال.
   ---------------------------------------------------------------------
   لكل اختبار:
     id      : معرّف فريد              grp  : 'jr' (الأول والثاني المتوسط) أو 'sr' (الثالث المتوسط والأول الثانوي)
     subj    : اسم المادة [عربي, إنجليزي]   q / a : رابط الأسئلة / رابط مفتاح الإجابة (موقع موهبة)
     opts    : البدائل المتاحة (مثل 'ABCD')
     parts   : أجزاء الاختبار (جزء واحد عادة؛ واختبار العلوم ثلاثة أجزاء يبدأ ترقيم كلٍّ منها من 1):
               { t: [عنوان الجزء عربي, إنجليزي] (اختياري) ،
                 key: مفتاح الإجابة بالترتيب — نص من الحروف مثل 'ACBD…'، أو قائمة إذا كانت بعض الإجابات أعداداً أو كلمات ،
                 blocks: [[من, إلى, درجة كل سؤال], ...] كما في مفتاح الإجابة الرسمي }
               الإجابة التي ليست حرفاً من البدائل يكتبها الطالب في خانة نصية.
     min     : مدة الاختبار بالدقائق
   المفاتيح منقولة من ملفات مفاتيح الإجابة الرسمية ومراجَعة عليها (نوفمبر 2026).
   لإضافة اختبار جديد: انسخ سطراً وغيّر الروابط والمفتاح والدرجات.
   ===================================================================== */
window.TP_PRACTICE = {
  nsmo: {
    title: { ar: 'بنك اختبارات المرحلة الأولى السابقة (تفاعلي)', en: 'Past Phase One tests — interactive bank' },
    stage: { ar: 'اختبار مسابقة المدن والمحافظات (المرحلة الأولى)', en: 'Cities & Governorates competition test (Phase One)' },
    src: 'https://www.mawhiba.sa/discover-mawhiba/competitions/national-gifted-olympiad/?tab=%D9%85%D9%83%D8%AA%D8%A8%D8%A9%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%85%D8%A8%D9%8A%D8%A7%D8%AF',
    tests: [
      { id: 'nsmo-sci', grp: 'jr', ic: 'flask', c: '#0E9F76', subj: ['العلوم', 'Science'],
        q: 'https://www.mawhiba.sa/media/h3vk4xgh/science-%D9%80.pdf', a: 'https://www.mawhiba.sa/media/nkll15ot/science-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ t: ['كيمياء', 'Chemistry'], key: 'BADCACDBD', blocks: [[1, 4, 3], [5, 7, 4], [8, 9, 5]] },
                { t: ['فيزياء', 'Physics'], key: 'CDCCACBD', blocks: [[1, 2, 3], [3, 5, 4], [6, 8, 5]] },
                { t: ['أحياء', 'Biology'], key: 'DBDABDCC', blocks: [[1, 2, 3], [3, 5, 4], [6, 8, 5]] }] },
      { id: 'nsmo-math1', grp: 'jr', ic: 'grid', c: '#2F6FE0', subj: ['الرياضيات – الناشئين', 'Mathematics – Junior'],
        q: 'https://www.mawhiba.sa/media/cm3n5v5k/mathematics-1.pdf', a: 'https://www.mawhiba.sa/media/0h5oxz5d/mathematics-1-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ key: 'CDCABCDCCBCBCAACBDAABACCB', blocks: [[1, 8, 3], [9, 17, 4], [18, 25, 5]] }] },
      { id: 'nsmo-inf1', grp: 'jr', ic: 'robot', c: '#7B4DFF', subj: ['المعلوماتية – الناشئين', 'Informatics – Junior'],
        q: 'https://www.mawhiba.sa/media/33gborvs/informatics-1.pdf', a: 'https://www.mawhiba.sa/media/sfcnwcnq/informatics-1-answers.pdf', opts: 'ABCDE', min: 120,
        parts: [{ key: ['D', 'E', 'B', '5', 'second', '10', '1', '16', '6', '42', '7', '-1000', '32041', '7', '9', '5', '95', '20', '18', '319'], blocks: [[1, 7, 4], [8, 13, 5], [14, 20, 6]] }] },
      { id: 'nsmo-math2', grp: 'sr', ic: 'grid', c: '#2F6FE0', subj: ['الرياضيات – الكبار', 'Mathematics – Senior'],
        q: 'https://www.mawhiba.sa/media/ocmlgtxt/mathematics-2%D9%80%D9%80.pdf', a: 'https://www.mawhiba.sa/media/x5ddf3iz/mathematics-2-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ key: 'BCBDDABCDBDACAABCCAABABBB', blocks: [[1, 8, 3], [9, 17, 4], [18, 25, 5]] }] },
      { id: 'nsmo-phy', grp: 'sr', ic: 'atom', c: '#E8A50A', subj: ['الفيزياء', 'Physics'],
        q: 'https://www.mawhiba.sa/media/ucqh2ifa/physics-%D9%80.pdf', a: 'https://www.mawhiba.sa/media/apwfjunu/physics-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ key: 'CBCABBDBCCCBCBDBDCACBBCBC', blocks: [[1, 8, 3], [9, 17, 4], [18, 25, 5]] }] },
      { id: 'nsmo-chem', grp: 'sr', ic: 'flask', c: '#E2386F', subj: ['الكيمياء', 'Chemistry'],
        q: 'https://www.mawhiba.sa/media/lwhpwqzp/chemistry-1.pdf', a: 'https://www.mawhiba.sa/media/1ulpudww/chemistry-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ key: 'CDABBCDCBBADDBABACABCCADA', blocks: [[1, 8, 3], [9, 17, 4], [18, 25, 5]] }] },
      { id: 'nsmo-bio', grp: 'sr', ic: 'heart', c: '#0E9F76', subj: ['الأحياء', 'Biology'],
        q: 'https://www.mawhiba.sa/media/d5fhhuf2/biology-1.pdf', a: 'https://www.mawhiba.sa/media/3hucjwqw/biology-answers.pdf', opts: 'ABCD', min: 120,
        parts: [{ key: 'ADBCBDBABCDCDAABBCCBDACDC', blocks: [[1, 8, 3], [9, 17, 4], [18, 25, 5]] }] },
      { id: 'nsmo-inf2', grp: 'sr', ic: 'robot', c: '#7B4DFF', subj: ['المعلوماتية – الكبار', 'Informatics – Senior'],
        q: 'https://www.mawhiba.sa/media/i2spumtq/informatics-2.pdf', a: 'https://www.mawhiba.sa/media/slcbgr1h/informatics-2-answers.pdf', opts: 'ABCDE', min: 120,
        parts: [{ key: ['D', 'E', 'B', '5', 'second', '10', '1', '7', '-1000', '32041', '7', '6', '9', '5', '95', '20', 'abcde', '18', '165', '319'], blocks: [[1, 7, 4], [8, 13, 5], [14, 20, 6]] }] }
    ]
  }
};
