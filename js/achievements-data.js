/* =====================================================================
   إنجازات المدرسة (لوحة الشرف) — تُعرض في: لوحة الشرف، وصفحة المكوّن المرتبط، والمؤشرات والتقارير.
   ⚠️ الموقع عام: أسماء الطلاب بالاسم الأول فقط.
   لإضافة إنجاز: انسخ عنصراً وعدّله. الحقول:
     comp     : معرّف المكوّن أو المسابقة الذي يظهر في صفحته (specialty, acceleration, kangaroo …)
     year     : العام الهجري كما يظهر للزائر، gyear: العام الميلادي المقابل (لصفحة المؤشرات)
     level    : مدرسي / إقليمي / وطني / دولي
     classes  : ترتيب الفصول [الصف، المادة، المعلم، الترتيب على المملكة (رقم أو فارغ)، عدد الطلاب]
     students : الطلاب [الاسم الأول، الصف، المادة، الترتيب] أو للتسريع [الاسم الأول، من وصف، إلى الصف]
   ===================================================================== */
window.TP_ACHIEVEMENTS = [
  {
    id: 'mawhiba-classes-1447', comp: 'specialty', year: '1447هـ', gyear: '2025-2026', level: 'وطني',
    title: { ar: 'فصول موهبة: الترتيب على مستوى المملكة', en: 'Mawhiba classes: national ranking' },
    note: { ar: 'نتائج اختبارات فصول موهبة (الإثراء المتخصص) في الرياضيات والعلوم والكيمياء.', en: 'Results of Mawhiba classes (specialty enrichment) tests in mathematics, science and chemistry.' },
    classes: [
      ['الرابع الابتدائي', 'رياضيات', 'محمد رشوان', 1, 7],
      ['الخامس الابتدائي', 'رياضيات', 'محمد هيبه', 1, 12],
      ['الخامس الابتدائي', 'علوم', 'محمد البيومي', 3, 12],
      ['السادس الابتدائي', 'رياضيات', 'أحمد هشام', 2, 22],
      ['السادس الابتدائي', 'علوم', 'محمد البيومي', 8, 22],
      ['الثاني المتوسط', 'رياضيات', 'طه إبراهيم', 10, 17],
      ['الأول الثانوي', 'رياضيات', 'محمد ناجي', 10, 20],
      ['الأول الثانوي', 'كيمياء', 'محمد كمال', null, null]
    ],
    students: [
      ['أحمد', 'الرابع الابتدائي', 'رياضيات', 2],
      ['الحارث', 'الخامس الابتدائي', 'علوم', 2],
      ['أحمد', 'السادس الابتدائي', 'رياضيات', 2],
      ['محمد', 'السادس الابتدائي', 'رياضيات', 2],
      ['محمد', 'السادس الابتدائي', 'علوم', 1],
      ['عبدالملك', 'الأول الثانوي', 'كيمياء', 1]
    ]
  },
  {
    id: 'acceleration-1447', comp: 'acceleration', year: '1447هـ', gyear: '2025-2026', level: 'مدرسي',
    title: { ar: 'التسريع الأكاديمي', en: 'Academic acceleration' },
    accel: [['بسام', 'السادس الابتدائي']]
  }
];

/* ---------- العرض (مستقل عن باقي ملفات المنصة ليعمل في كل الصفحات) ---------- */
window.TP_ACH = (function () {
  const L = () => document.documentElement.lang === 'en' ? 'en' : 'ar';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ORD = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
  const EN = {
    'الرابع الابتدائي': 'Grade 4', 'الخامس الابتدائي': 'Grade 5', 'السادس الابتدائي': 'Grade 6', 'الأول المتوسط': 'Grade 7', 'الثاني المتوسط': 'Grade 8', 'الثالث المتوسط': 'Grade 9',
    'الأول الثانوي': 'Grade 10', 'الثاني الثانوي': 'Grade 11', 'الثالث الثانوي': 'Grade 12', 'رياضيات': 'Mathematics', 'علوم': 'Science', 'كيمياء': 'Chemistry', 'فيزياء': 'Physics', 'أحياء': 'Biology',
    'وطني': 'National', 'دولي': 'International', 'إقليمي': 'Regional', 'مدرسي': 'School',
    'أحمد': 'Ahmed', 'الحارث': 'Al-Harith', 'محمد': 'Mohammed', 'عبدالملك': 'Abdulmalik', 'بسام': 'Bassam'
  };
  const T = {
    ar: { cls: 'ترتيب الفصول على مستوى المملكة', stu: 'طلاب حققوا ترتيباً على مستوى المملكة', grade: 'الصف', subj: 'المادة', teacher: 'المعلم', rank: 'الترتيب على المملكة', n: 'عدد الطلاب', place: 'المركز {r} على المملكة', acc: 'انتقل إلى {g}', accT: 'طلاب التسريع', none: 'لا توجد إنجازات مسجلة بعد.', privacy: 'أسماء الطلاب بالاسم الأول فقط.' },
    en: { cls: 'Class rankings nationwide', stu: 'Students ranked nationwide', grade: 'Grade', subj: 'Subject', teacher: 'Teacher', rank: 'National rank', n: 'Students', place: '#{r} in the Kingdom', acc: 'Moved up to {g}', accT: 'Accelerated students', none: 'No achievements recorded yet.', privacy: 'Students are listed by first name only.' }
  };
  const t = k => T[L()][k];
  const tr = s => L() === 'en' ? (EN[s] || s) : s;
  const ord = r => r ? (L() === 'en' ? '#' + r : ORD[r] || r) : '—';
  const medal = r => r === 1 ? '#E8A50A' : r === 2 ? '#8E9AAF' : r === 3 ? '#C2410C' : '#7B4DFF';
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/></svg>';
  const UP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

  function css() {
    if (document.getElementById('ach-css')) return;
    const s = document.createElement('style'); s.id = 'ach-css';
    s.textContent = `.achx{display:grid;gap:18px}
.achx .ah{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:0}
.achx .ah h3{margin:0;font-size:1.12rem}
.achx .lv{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.78rem;font-weight:700;background:#FFF4D6;color:#8A5A00}
.achx .yr{font-family:Sora,sans-serif;font-weight:700;color:var(--muted,#6b6890);font-size:.85rem}
.achx .an{margin:4px 0 0;color:var(--muted,#6b6890);font-size:.9rem}
.achx .sh{font-weight:800;margin:6px 0 8px;font-size:.95rem}
.achx .medals{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.achx .md{display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.7);border:1px solid rgba(26,22,64,.08)}
.achx .md i{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:color-mix(in srgb,var(--mc) 16%,#fff);color:var(--mc)}
.achx .md i svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.achx .md b{display:block;font-size:1rem}
.achx .md small{display:block;color:var(--muted,#6b6890);font-size:.82rem;line-height:1.5}
.achx .tw{overflow-x:auto;border-radius:14px;border:1px solid rgba(26,22,64,.08);background:rgba(255,255,255,.6)}
.achx table{width:100%;border-collapse:collapse;font-size:.9rem;min-width:520px}
.achx th,.achx td{padding:9px 12px;text-align:start;border-bottom:1px solid rgba(26,22,64,.06)}
.achx th{font-size:.8rem;color:var(--muted,#6b6890);font-weight:700;background:rgba(26,22,64,.03)}
.achx td.rk{font-weight:800}
.achx .rkb{display:inline-flex;align-items:center;gap:6px}
.achx .rkb s{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--mc);text-decoration:none}
.achx .pv{font-size:.78rem;color:var(--muted,#6b6890)}`;
    document.head.appendChild(s);
  }

  /* عنصر واحد */
  function item(a, opt) {
    const head = opt.head === false ? '' : `<div><div class="ah"><h3>${esc(a.title[L()] || a.title.ar)}</h3>${a.level ? `<span class="lv">${esc(tr(a.level))}</span>` : ''}<span class="yr">${esc(a.year)}</span></div>${a.note ? `<p class="an">${esc(a.note[L()] || a.note.ar)}</p>` : ''}</div>`;
    const stu = (a.students || []).slice().sort((x, y) => (x[3] || 99) - (y[3] || 99));
    const cls = (a.classes || []).slice().sort((x, y) => (x[3] || 99) - (y[3] || 99));
    return `<div class="achx-i">${head}
      ${stu.length ? `<div class="sh">${t('stu')}</div><div class="medals">${stu.map(s => `<div class="md" style="--mc:${medal(s[3])}"><i>${ICON}</i><div><b>${esc(tr(s[0]))}</b><small>${esc(t('place').replace('{r}', ord(s[3])))}</small><small>${esc(tr(s[2]))} · ${esc(tr(s[1]))}</small></div></div>`).join('')}</div>` : ''}
      ${cls.length && opt.classes !== false ? `<div class="sh">${t('cls')}</div><div class="tw"><table><thead><tr><th>${t('grade')}</th><th>${t('subj')}</th><th>${t('teacher')}</th><th>${t('rank')}</th><th>${t('n')}</th></tr></thead><tbody>
        ${cls.map(c => `<tr><td>${esc(tr(c[0]))}</td><td>${esc(tr(c[1]))}</td><td>${esc(c[2])}</td><td class="rk">${c[3] ? `<span class="rkb" style="--mc:${medal(c[3])}"><s></s>${esc(ord(c[3]))}</span>` : '—'}</td><td>${c[4] == null ? '—' : esc(c[4])}</td></tr>`).join('')}</tbody></table></div>` : ''}
      ${(a.accel || []).length ? `<div class="sh">${t('accT')}</div><div class="medals">${a.accel.map(s => `<div class="md" style="--mc:#2F6FE0"><i>${UP}</i><div><b>${esc(tr(s[0]))}</b><small>${esc(t('acc').replace('{g}', tr(s[1])))}</small></div></div>`).join('')}</div>` : ''}
    </div>`;
  }

  return {
    list(f) { return window.TP_ACHIEVEMENTS.filter(a => (!f.id || a.id === f.id) && (!f.comp || a.comp === f.comp) && (!f.gyear || a.gyear === f.gyear)); },
    /* f: {comp, gyear}، opt: {head:false} لإخفاء العنوان */
    html(f, opt) {
      css(); opt = opt || {};
      const l = this.list(f || {}).sort((a, b) => String(b.year).localeCompare(String(a.year)));
      if (!l.length) return opt.empty === false ? '' : `<p class="an">${t('none')}</p>`;
      return `<div class="achx">${l.map(a => item(a, opt)).join('')}${l.some(a => (a.students || a.accel || []).length) ? `<div class="pv">${t('privacy')}</div>` : ''}</div>`;
    },
    /* أرقام مختصرة لصفحة المؤشرات */
    stats(gyear) {
      const l = this.list({ gyear }), cls = l.flatMap(a => a.classes || []).filter(c => c[3]), stu = l.flatMap(a => a.students || []);
      return { classesTop10: cls.filter(c => c[3] <= 10).length, classesFirst: cls.filter(c => c[3] === 1).length, classesTop3: cls.filter(c => c[3] <= 3).length,
        students: stu.length, studentsFirst: stu.filter(s => s[3] === 1).length, accel: l.flatMap(a => a.accel || []).length };
    },
    years() { return [...new Set(window.TP_ACHIEVEMENTS.map(a => a.gyear))].sort(); }
  };
})();
