/* =========================================================
   السجل التام لتطور الموهبة – الإعداد
   رابط السكربت يوضع في js/config.js (SIJIL_SCRIPT_URL) مع رابط بيانات المنصة.
   إذا كان فارغاً تعمل الصفحات في «وضع التجربة» (الحفظ في المتصفح فقط).
   ========================================================= */
const CONFIG = {
  get API_URL() { return ((window.TP_CONFIG || {}).SIJIL_SCRIPT_URL || '').trim(); },
  SCHOOL: 'مدارس دار الذكر',
  SYSTEM: 'السجل التام لتطور الموهبة'
};

/* =========================================================
   الصفوف — المكان الوحيد لتعديلها (تظهر في كل النماذج والتقارير والقوائم).
   لإضافة صف: اكتبه في المجموعة المناسبة. لا تغيّر اسم صف مستخدم من قبل،
   لأن السجلات المحفوظة مرتبطة بالاسم كما كُتب.
   ========================================================= */
const GRADE_GROUPS = [
  { label: 'البنين', grades: ['الأول الابتدائي','الثاني الابتدائي','الثالث الابتدائي','الرابع الابتدائي','الخامس الابتدائي','السادس الابتدائي',
    'الأول المتوسط','الثاني المتوسط','الثالث المتوسط','الأول الثانوي','الثاني الثانوي','الثالث الثانوي'] },
  { label: 'البنات', grades: ['الأول الابتدائي بنات','الثاني الابتدائي بنات','الثالث الابتدائي بنات','الرابع الابتدائي بنات','الخامس الابتدائي بنات','السادس الابتدائي بنات'] },
  { label: 'المسار الأمريكي', grades: ['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] }
];
const GRADES = GRADE_GROUPS.flatMap(g => g.grades);
/* ترتيب الصف للفرز: حسب القائمة أعلاه، وإلا تقدير من الاسم (للأسماء القادمة من ملفات خارجية) */
function gradeOrder(g) {
  g = String(g || '').trim();
  const i = GRADES.indexOf(g); if (i >= 0) return i;
  const m = g.match(/grade\s*(\d+)/i); if (m) return GRADES.indexOf('Grade 4') + (+m[1] - 4);
  const ORD = ['الأول','الثاني','الثالث','الرابع','الخامس','السادس'], k = ORD.findIndex(o => g.includes(o));
  const base = /بنات/.test(g) ? GRADES.indexOf('الأول الابتدائي بنات') : /ثانوي/.test(g) ? 9 : /متوسط/.test(g) ? 6 : 0;
  return base + (k < 0 ? 5 : k) + 0.5;
}
const sortGrades = list => list.slice().sort((a, b) => gradeOrder(a) - gradeOrder(b) || String(a).localeCompare(String(b), 'ar'));
/* قائمة منسدلة مقسّمة بالمجموعات */
function gradeOptions(selected) {
  return GRADE_GROUPS.map(g => `<optgroup label="${g.label}">${g.grades.map(x => `<option${x === selected ? ' selected' : ''}>${x}</option>`).join('')}</optgroup>`).join('');
}
