/* =====================================================================
   بنك أسئلة التدريب على مقياس موهبة — منصة الموهبة (مدارس دار الذكر)
   أسئلة أصلية من إعداد المنصة لأغراض التدريب، وليست أسئلة المقياس الرسمي.
   ---------------------------------------------------------------------
   كل سؤال:
     id   : معرّف فريد        lv : المستوى (1، 2، 3)
     d    : المجال  verbal | math | science | flex
     s    : 'diag' للاختبار التشخيصي ، 'prac' لمكتبة التدريب
     t    : نوع السؤال (يطابق أنواع المكتبة في mawhiba-test-data.js)
     p    : نص قراءة (اختياري)  [عربي, English]
     f    : رسم توضيحي SVG (اختياري)
     q    : نص السؤال [عربي, English]
     o    : البدائل [[عربي, English], ...]  أو {ar:[...], en:[...]} إذا اختلفت البدائل باللغة
            ويمكن أن يكون البديل رسماً: {f: svg, ar: 'وصف', en: 'description'}
     a    : رقم البديل الصحيح (يبدأ من 0)
     w    : تعليل الإجابة الصحيحة [عربي, English]
     x    : سبب خطأ كل بديل [[عربي, English] أو 0 للبديل الصحيح]
   لإضافة سؤال: انسخ سؤالاً من النوع نفسه وغيّر محتواه، وتأكد أن عدد عناصر x يساوي عدد البدائل.
   ===================================================================== */

/* ---------- الرسوم التوضيحية ---------- */
const MWF = (() => {
  const S = (w, h, body, extra) => `<svg class="mwfig" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"${extra || ''}>${body}</svg>`;
  /* سهم مركزه (cx,cy) بزاوية ang (0 = للأعلى، مع عقارب الساعة) */
  const arrowG = (cx, cy, ang, len = 34) => `<g transform="rotate(${ang} ${cx} ${cy})"><path class="st" d="M${cx} ${cy + len / 2}V${cy - len / 2 + 4}"/><path class="st" d="M${cx - 9} ${cy - len / 2 + 11}L${cx} ${cy - len / 2}L${cx + 9} ${cy - len / 2 + 11}"/></g>`;
  const box = (x, y, s = 64) => `<rect class="bx" x="${x}" y="${y}" width="${s}" height="${s}" rx="10"/>`;
  const qm = (x, y) => `<text class="qm" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">?</text>`;
  /* ترس بعدد أسنان */
  function gear(cx, cy, r, teeth, label) {
    const pts = [], n = teeth, d = 7;
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * 2 * Math.PI, step = 2 * Math.PI / n;
      [[0, r], [0.18, r + d], [0.5, r + d], [0.68, r]].forEach(([f, rr]) => {
        const a = a0 + f * step; pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
      });
    }
    return `<polygon class="gr" points="${pts.join(' ')}"/><circle class="hub" cx="${cx}" cy="${cy}" r="${Math.max(5, r * .18)}"/>` +
      (label ? `<text class="lb" x="${cx}" y="${cy - r * .45}" text-anchor="middle" dominant-baseline="central">${label}</text>` : '');
  }
  /* سهم دوران مع عقارب الساعة (cw) أو عكسها */
  function spin(cx, cy, r, cw) {
    const a1 = -150 * Math.PI / 180, a2 = -30 * Math.PI / 180, R = r + 16;
    const p1 = [cx + R * Math.cos(a1), cy + R * Math.sin(a1)], p2 = [cx + R * Math.cos(a2), cy + R * Math.sin(a2)];
    const end = cw ? p2 : p1, start = cw ? p1 : p2, sweep = cw ? 1 : 0;
    const ang = Math.atan2(end[1] - cy, end[0] - cx) + (cw ? Math.PI / 2 : -Math.PI / 2);
    const h = 9, hx = end[0] - h * Math.cos(ang), hy = end[1] - h * Math.sin(ang);
    const left = [hx + 6 * Math.cos(ang + Math.PI / 2), hy + 6 * Math.sin(ang + Math.PI / 2)], right = [hx - 6 * Math.cos(ang + Math.PI / 2), hy - 6 * Math.sin(ang + Math.PI / 2)];
    return `<path class="st ac" d="M${start[0].toFixed(1)} ${start[1].toFixed(1)}A${R} ${R} 0 0 ${sweep} ${end[0].toFixed(1)} ${end[1].toFixed(1)}"/><path class="ac fl" d="M${end[0].toFixed(1)} ${end[1].toFixed(1)}L${left[0].toFixed(1)} ${left[1].toFixed(1)}L${right[0].toFixed(1)} ${right[1].toFixed(1)}Z"/>`;
  }
  /* أشكال المصفوفات */
  function shape(kind, x, y, s, fill) {
    const id = 'h' + Math.random().toString(36).slice(2, 8), c = x + s / 2, m = y + s / 2, r = s * .36;
    const defs = fill === 'half' ? `<defs><clipPath id="${id}"><rect x="${x}" y="${m}" width="${s}" height="${s / 2}"/></clipPath></defs>` : '';
    const path = kind === 'circle' ? `<circle cx="${c}" cy="${m}" r="${r}"/>`
      : kind === 'square' ? `<rect x="${c - r}" y="${m - r}" width="${2 * r}" height="${2 * r}" rx="2"/>`
      : `<path d="M${c} ${m - r}L${c + r} ${m + r * .8}L${c - r} ${m + r * .8}Z"/>`;
    const out = `<g class="sh">${path}</g>`;
    if (fill === 'full') return `<g class="sh full">${path}</g>`;
    if (fill === 'half') return defs + out + `<g class="sh full" clip-path="url(#${id})">${path}</g>`;
    return out;
  }
  function dots(n, x, y, s, kind) {
    const out = []; const gap = s / (n + 1);
    for (let i = 0; i < n; i++) {
      const cx = x + gap * (i + 1), cy = y + s / 2;
      out.push(kind === 'tri' ? `<path class="fl" d="M${cx} ${cy - 7}L${cx + 7} ${cy + 6}L${cx - 7} ${cy + 6}Z"/>` : kind === 'sq' ? `<rect class="fl" x="${cx - 6}" y="${cy - 6}" width="12" height="12"/>` : `<circle class="fl" cx="${cx}" cy="${cy}" r="6.5"/>`);
    }
    return out.join('');
  }
  return {
    /* متتابعة أسهم مع خانة سؤال */
    arrowSeq: angs => S(angs.length * 76 + 76, 76, angs.map((a, i) => box(6 + i * 76, 6) + arrowG(38 + i * 76, 38, a)).join('') + box(6 + angs.length * 76, 6) + qm(38 + angs.length * 76, 40)),
    arrow: a => S(76, 76, box(6, 6) + arrowG(38, 38, a)),
    /* شبكة مربعات */
    grid: n => { let b = ''; const s = 120 / n; for (let i = 0; i <= n; i++) b += `<path class="st thin" d="M${10 + i * s} 10V130M10 ${10 + i * s}H130"/>`; return S(140, 140, b); },
    /* ترسان أو أكثر متعاشقة في صف: list = [{r, t, lb}] ، cw: اتجاه الترس الأول */
    gears: (list, cw) => {
      let x = 0; const parts = [], H = Math.max(...list.map(g => g.r)) * 2 + 60;
      list.forEach((g, i) => { x += i === 0 ? g.r + 30 : list[i - 1].r + g.r + 6; parts.push(gear(x, H / 2, g.r, g.t, g.lb)); if (i === 0) parts.push(spin(x, H / 2, g.r + 7, cw)); });
      return S(x + list[list.length - 1].r + 30, H, parts.join(''));
    },
    /* أرجوحة توازن: L و R = [{w: الكتلة, d: المسافة}] ، تُرسم المسافات 1..max */
    seesaw: (L, R, max = 3, lbl) => {
      const cx = 200, unit = 52, y = 84, items = [];
      for (let i = 1; i <= max; i++) items.push(`<path class="st thin" d="M${cx - i * unit} ${y + 4}v8M${cx + i * unit} ${y + 4}v8"/><text class="tk" x="${cx - i * unit}" y="${y + 24}" text-anchor="middle">${i}</text><text class="tk" x="${cx + i * unit}" y="${y + 24}" text-anchor="middle">${i}</text>`);
      const blk = (side, it) => { const X = cx + side * it.d * unit; return `<rect class="bk" x="${X - 20}" y="${y - 40}" width="40" height="40" rx="6"/><text class="lb inv" x="${X}" y="${y - 20}" text-anchor="middle" dominant-baseline="central">${it.w}</text>`; };
      return S(400, 150, `<path class="st" d="M${cx - max * unit - 20} ${y}H${cx + max * unit + 20}"/><path class="fl" d="M${cx} ${y + 2}L${cx + 20} ${y + 42}L${cx - 20} ${y + 42}Z"/>` + items.join('') + L.map(it => blk(-1, it)).join('') + R.map(it => blk(1, it)).join('') + (lbl || ''));
    },
    /* شبكة مكعب على شكل صليب: rows = مصفوفة نصوص، '' = فراغ */
    net: rows => { const s = 46; let b = ''; rows.forEach((r, i) => r.forEach((c, j) => { if (c) b += `<rect class="bx" x="${8 + j * s}" y="${8 + i * s}" width="${s}" height="${s}"/><text class="sym" x="${8 + j * s + s / 2}" y="${8 + i * s + s / 2 + 1}" text-anchor="middle" dominant-baseline="central">${c}</text>`; })); return S(rows[0].length * s + 16, rows.length * s + 16, b); },
    /* مصفوفة 3×3: cells = دوال ترسم داخل خانة (x,y,s) أو null للخانة المجهولة */
    matrix: cells => { const s = 70; let b = ''; cells.forEach((c, i) => { const x = 6 + (i % 3) * (s + 6), y = 6 + Math.floor(i / 3) * (s + 6); b += box(x, y, s) + (c ? c(x, y, s) : qm(x + s / 2, y + s / 2 + 2)); }); return S(3 * s + 24, 3 * s + 24, b); },
    cell: f => { const s = 70; return S(s + 12, s + 12, box(6, 6, s) + f(6, 6, s)); },
    dots: (n, kind) => (x, y, s) => dots(n, x, y, s, kind),
    shp: (kind, fill) => (x, y, s) => shape(kind, x, y, s, fill),
    arr: a => (x, y, s) => arrowG(x + s / 2, y + s / 2, a, 32),
    /* مكعب كبير مكوّن من 3×3×3 مكعبات (منظور متساوي القياس) */
    cube3: () => {
      const n = 3, a = 32, c30 = Math.cos(Math.PI / 6), ox = 130, oy = 40;
      const P = (x, y, z) => [ox + (x - y) * a * c30, oy + (x + y) * a * .5 + 0 - z * a + n * a];
      const line = (p, q) => `<path class="st thin" d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}"/>`;
      const face = pts => `<path class="fc" d="M${pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}Z"/>`;
      let b = face([P(0, 0, n), P(n, 0, n), P(n, n, n), P(0, n, n)]) + face([P(n, 0, n), P(n, n, n), P(n, n, 0), P(n, 0, 0)]).replace('fc', 'fc f2') + face([P(0, n, n), P(n, n, n), P(n, n, 0), P(0, n, 0)]).replace('fc', 'fc f3');
      for (let i = 0; i <= n; i++) {
        b += line(P(i, 0, n), P(i, n, n)) + line(P(0, i, n), P(n, i, n));
        b += line(P(n, i, n), P(n, i, 0)) + line(P(n, 0, i), P(n, n, i));
        b += line(P(i, n, n), P(i, n, 0)) + line(P(0, n, i), P(n, n, i));
      }
      return S(260, 250, b);
    },
    /* بكرة متحركة واحدة ترفع حملاً */
    pulley: load => S(240, 260, `<path class="st" d="M20 20H220"/><path class="hatch" d="M30 20l-10-10M60 20l-10-10M90 20l-10-10M120 20l-10-10M150 20l-10-10M180 20l-10-10M210 20l-10-10"/>
      <path class="st" d="M80 20V120"/><path class="st" d="M140 120V60"/><circle class="gr" cx="110" cy="120" r="30"/><circle class="hub" cx="110" cy="120" r="5"/>
      <path class="st" d="M80 120A30 30 0 0 0 140 120"/><path class="st" d="M110 125V170"/><rect class="bk" x="80" y="170" width="60" height="50" rx="6"/>
      <text class="lb inv" x="110" y="196" text-anchor="middle" dominant-baseline="central">${load}</text>
      <path class="st ac" d="M140 60V30"/><path class="ac fl" d="M140 22l-8 12h16z"/><text class="lb ac2" x="160" y="44" dominant-baseline="central">F</text>`),
    /* منحنى تسخين الجليد */
    heat: () => S(320, 200, `<path class="st thin" d="M40 170H300M40 170V14"/><text class="tk" x="32" y="140" text-anchor="end">0</text><text class="tk" x="32" y="60" text-anchor="end">100</text>
      <path class="dash" d="M40 140H300M40 60H300"/>
      <path class="st ac" d="M44 166L80 140H150L190 60H270L290 40"/><text class="lb" x="115" y="128" text-anchor="middle">1</text><text class="lb" x="230" y="48" text-anchor="middle">2</text>
      <text class="tk" x="22" y="14">°C</text>`),
    /* شكل صغير لبديل */
    opt: f => S(84, 84, box(10, 10, 64) + f(10, 10, 64))
  };
})();

const MW_BANK = [

/* ===================================================================
   المستوى الأول (الصفوف 3 – 5)
   =================================================================== */

/* ---------- الاستدلال اللغوي وفهم المقروء ---------- */
{ id: '1v1', lv: 1, d: 'verbal', s: 'diag', t: 'analogy',
  q: ['طائر : عُشّ ، كما أن نحلة : ؟', 'Bird : nest, as bee : ?'],
  o: [['كهف', 'cave'], ['خليّة', 'hive'], ['قفص', 'cage'], ['زهرة', 'flower']], a: 1,
  w: ['العلاقة «بيت يبنيه الكائن ويعيش فيه»: العُشّ بيت الطائر، والخليّة بيت النحل.', 'The relation is “the home the creature builds and lives in”: a nest is a bird’s home, a hive is a bee’s home.'],
  x: [['الكهف مأوى لحيوانات أخرى كالدِّبَبة والخفافيش، والنحلة لا تبنيه.', 'A cave shelters other animals such as bears and bats; bees do not build it.'], 0,
      ['القفص يُحبس فيه الطائر، ولا يبنيه هو؛ فالعلاقة مختلفة.', 'A cage is where a bird is kept; it does not build it, so the relation is different.'],
      ['النحلة تأخذ الرحيق من الزهرة لكنها لا تسكنها؛ هذه علاقة غذاء لا علاقة سكن.', 'Bees take nectar from flowers but do not live in them: that is a food relation, not a home relation.']] },

{ id: '1v2', lv: 1, d: 'verbal', s: 'diag', t: 'completion',
  q: ['اختر الكلمة المناسبة: «كان الجوّ ........ فلبس أحمد معطفه الثقيل.»', 'Choose the right word: “The weather was ........, so Ahmed put on his heavy coat.”'],
  o: [['حارّاً', 'hot'], ['بارداً', 'cold'], ['هادئاً', 'calm'], ['جميلاً', 'lovely']], a: 1,
  w: ['كلمة «فـ» تدل على أن لبس المعطف الثقيل نتيجةٌ لحالة الجو، والمعطف الثقيل يُلبس عند البرد.', 'The word “so” shows that wearing the heavy coat is a result of the weather, and a heavy coat is worn when it is cold.'],
  x: [['الجو الحار يدعو إلى خلع المعطف لا لبسه، فالجملة تتناقض.', 'Hot weather makes us take a coat off, not put one on, so the sentence contradicts itself.'], 0,
      ['الهدوء لا يستدعي معطفاً ثقيلاً؛ لا علاقة سببية بينهما.', 'Calm weather does not call for a heavy coat; there is no cause-and-effect link.'],
      ['«جميلاً» وصف عام لا يفسّر سبب لبس المعطف الثقيل.', '“Lovely” is a general description that does not explain why he wore a heavy coat.']] },

{ id: '1v3', lv: 1, d: 'verbal', s: 'diag', t: 'context',
  q: ['في الجملة كلمة لا تناسب معناها. ما هي؟ «شرب الطفل الماء لأنه كان جائعاً جداً.»', 'One word does not fit the meaning of the sentence. Which is it? “The child drank the water because he was very hungry.”'],
  o: [['شرب', 'drank'], ['الطفل', 'child'], ['الماء', 'water'], ['جائعاً', 'hungry']], a: 3,
  w: ['شُرب الماء يكون بسبب العطش لا الجوع؛ فالكلمة الصحيحة «عطشان».', 'We drink water because we are thirsty, not hungry; the right word is “thirsty”.'],
  x: [['«شرب» فعل مناسب للماء.', '“Drank” suits water.'], ['«الطفل» يمكن أن يكون أي شخص؛ لا تعارض.', '“Child” could be anyone; no conflict.'],
      ['الماء يُشرب، فالكلمة مناسبة.', 'Water is drunk, so the word fits.'], 0] },

{ id: '1v4', lv: 1, d: 'verbal', s: 'diag', t: 'reading',
  p: ['تعيش السلحفاة البحرية معظم حياتها في البحر، لكنّ الأنثى تخرج إلى الشاطئ لتضع بيضها في الرمل، ثم تعود إلى الماء. وبعد عدة أسابيع يفقس البيض، فتزحف الصغار نحو البحر مسرعة.',
      'The sea turtle spends most of its life in the sea, but the female comes out onto the beach to lay her eggs in the sand, then returns to the water. After several weeks the eggs hatch, and the young crawl quickly towards the sea.'],
  q: ['لماذا تخرج أنثى السلحفاة البحرية إلى الشاطئ؟', 'Why does the female sea turtle come out onto the beach?'],
  o: [['لتبحث عن الطعام', 'To look for food'], ['لتضع بيضها في الرمل', 'To lay her eggs in the sand'], ['لتنام تحت الشمس', 'To sleep in the sun'], ['لتراقب صغارها', 'To watch her young']], a: 1,
  w: ['النص يقول صراحة: «تخرج إلى الشاطئ لتضع بيضها في الرمل».', 'The text says it directly: she “comes out onto the beach to lay her eggs in the sand”.'],
  x: [['لم يذكر النص الطعام إطلاقاً.', 'The text does not mention food at all.'], 0, ['النوم تحت الشمس لم يرد في النص.', 'Sleeping in the sun is not in the text.'],
      ['النص يذكر أنها تعود إلى الماء قبل أن يفقس البيض، فلا تراقب صغارها.', 'The text says she returns to the water before the eggs hatch, so she does not watch her young.']] },

{ id: '1v5', lv: 1, d: 'verbal', s: 'prac', t: 'analogy',
  q: ['قلم : كتابة ، كما أن مِقصّ : ؟', 'Pen : writing, as scissors : ?'],
  o: [['ورق', 'paper'], ['رسم', 'drawing'], ['قصّ', 'cutting'], ['خياطة', 'sewing']], a: 2,
  w: ['العلاقة «أداة : عملها»: القلم أداة الكتابة، والمقص أداة القصّ.', 'The relation is “tool : its job”: a pen is for writing, scissors are for cutting.'],
  x: [['الورق هو ما نقصّه، وليس عمل المقص؛ العلاقة هنا «أداة : شيء تعمل عليه».', 'Paper is what we cut, not the job of the scissors; that relation is “tool : thing it works on”.'],
      ['الرسم عمل القلم أو الفرشاة، لا المقص.', 'Drawing is the job of a pencil or brush, not scissors.'], 0,
      ['الخياطة عمل الإبرة.', 'Sewing is the job of a needle.']] },

{ id: '1v6', lv: 1, d: 'verbal', s: 'prac', t: 'odd',
  q: ['أيّ كلمة مختلفة عن البقية؟', 'Which word is different from the others?'],
  o: [['تفاحة', 'apple'], ['موزة', 'banana'], ['جزرة', 'carrot'], ['برتقالة', 'orange']], a: 2,
  w: ['التفاحة والموزة والبرتقالة فواكه، أما الجزرة فمن الخضروات (جذر يؤكل).', 'Apple, banana and orange are fruits, while the carrot is a vegetable (an edible root).'],
  x: [['التفاحة فاكهة مثل الموز والبرتقال.', 'An apple is a fruit like the banana and orange.'], ['الموزة فاكهة مثل التفاح والبرتقال.', 'A banana is a fruit like the apple and orange.'], 0,
      ['البرتقالة فاكهة مثل التفاح والموز.', 'An orange is a fruit like the apple and banana.']] },

{ id: '1v7', lv: 1, d: 'verbal', s: 'prac', t: 'completion',
  q: ['اختر الكلمة المناسبة: «يستيقظ سعيد ........ ليصلّي الفجر مع والده في المسجد.»', 'Choose the right word: “Saeed wakes up ........ to pray Fajr with his father at the mosque.”'],
  o: [['متأخراً', 'late'], ['ظهراً', 'at noon'], ['مبكراً', 'early'], ['مساءً', 'in the evening']], a: 2,
  w: ['صلاة الفجر في أول النهار، فلا بد أن يستيقظ مبكراً ليدركها.', 'Fajr prayer is at the very start of the day, so he must wake up early to catch it.'],
  x: [['من يستيقظ متأخراً تفوته صلاة الفجر.', 'Someone who wakes up late misses Fajr.'], ['الظهر وقت صلاة أخرى، لا الفجر.', 'Noon is the time of a different prayer, not Fajr.'], 0,
      ['المساء بعد غروب الشمس، والفجر قبل شروقها.', 'Evening is after sunset, while Fajr is before sunrise.']] },

{ id: '1v8', lv: 1, d: 'verbal', s: 'prac', t: 'reading',
  p: ['زرعت ريم بذرتين متشابهتين في أصيصين. وضعت الأول قرب النافذة، والثاني في خزانة مظلمة، وسقت الاثنين بالكمية نفسها من الماء. بعد أسبوعين كان نبات النافذة أخضرَ قوياً، أما نبات الخزانة فكان طويلاً ضعيفاً مائلاً إلى الصفرة.',
      'Reem planted two similar seeds in two pots. She put the first near the window and the second in a dark cupboard, and watered both with the same amount of water. After two weeks the window plant was green and strong, while the cupboard plant was tall, weak and yellowish.'],
  q: ['ما الذي أرادت ريم معرفته من تجربتها؟', 'What did Reem want to find out from her experiment?'],
  o: [['أثر الماء في نمو النبات', 'The effect of water on plant growth'], ['أثر الضوء في نمو النبات', 'The effect of light on plant growth'], ['أيّ البذرتين أكبر حجماً', 'Which seed was bigger'], ['أفضل لون للأصيص', 'The best colour for a pot']], a: 1,
  w: ['الشيء الوحيد الذي اختلف بين النبتتين هو الضوء (نافذة / خزانة مظلمة)، فهو المتغير الذي تدرسه.', 'The only thing that differed between the two plants was light (window / dark cupboard), so that is the variable she was studying.'],
  x: [['الماء كان بالكمية نفسها للنبتتين، فلا يمكن دراسة أثره.', 'Both plants got the same amount of water, so its effect cannot be studied.'], 0,
      ['النص يقول إن البذرتين متشابهتان.', 'The text says the two seeds were similar.'], ['لم يذكر النص لون الأصيص.', 'The text does not mention pot colour.']] },

/* ---------- الاستدلال الرياضي والمكاني ---------- */
{ id: '1m1', lv: 1, d: 'math', s: 'diag', t: 'word',
  q: ['مع خالد 45 ريالاً، اشترى كتاباً بـ 18 ريالاً وقلماً بـ 7 ريالات. كم ريالاً بقي معه؟', 'Khalid had 45 riyals. He bought a book for 18 riyals and a pen for 7 riyals. How many riyals does he have left?'],
  o: [['27', '27'], ['20', '20'], ['38', '38'], ['70', '70']], a: 1,
  w: ['ما صرفه: 18 + 7 = 25 ريالاً، والباقي: 45 − 25 = 20 ريالاً.', 'He spent 18 + 7 = 25 riyals, so he has 45 − 25 = 20 riyals left.'],
  x: [['هذا ما يبقى لو طرحنا ثمن الكتاب فقط ونسينا القلم (45 − 18).', 'That is what is left if we subtract only the book and forget the pen (45 − 18).'], 0,
      ['هذا ما يبقى لو طرحنا ثمن القلم فقط (45 − 7).', 'That is what is left if we subtract only the pen (45 − 7).'],
      ['هذا ناتج جمع كل الأعداد (45 + 18 + 7)، والسؤال عن الباقي لا المجموع.', 'That is the sum of all the numbers (45 + 18 + 7); the question asks what is left, not the total.']] },

{ id: '1m2', lv: 1, d: 'math', s: 'diag', t: 'sequence',
  q: ['ما العدد التالي في المتتابعة؟  2 ، 5 ، 11 ، 23 ، ؟', 'What number comes next?  2, 5, 11, 23, ?'],
  o: [['35', '35'], ['46', '46'], ['47', '47'], ['29', '29']], a: 2,
  w: ['القاعدة: اضرب العدد في 2 ثم أضف 1: 2←5←11←23، إذن 23 × 2 + 1 = 47.', 'The rule is “multiply by 2, then add 1”: 2→5→11→23, so 23 × 2 + 1 = 47.'],
  x: [['افتراض زيادة ثابتة قدرها 12 خطأ؛ الزيادات تتضاعف (3، 6، 12، ثم 24).', 'Assuming a constant increase of 12 is wrong; the increases double (3, 6, 12, then 24).'],
      ['هذا ضرب في 2 فقط ونسيان إضافة 1.', 'This multiplies by 2 but forgets to add 1.'], 0,
      ['هذه زيادة قدرها 6، ولا تتفق مع بقية المتتابعة.', 'This adds 6, which does not match the rest of the sequence.']] },

{ id: '1m3', lv: 1, d: 'math', s: 'diag', t: 'spatial',
  f: MWF.arrowSeq([0, 90, 180]),
  q: ['السهم يدور بالقاعدة نفسها من اليسار إلى اليمين. ما الشكل الذي يحل محل علامة الاستفهام؟', 'The arrow turns by the same rule from left to right. Which figure replaces the question mark?'],
  o: [{ f: MWF.arrow(0), ar: 'سهم للأعلى', en: 'Arrow pointing up' }, { f: MWF.arrow(270), ar: 'سهم لليسار', en: 'Arrow pointing left' }, { f: MWF.arrow(90), ar: 'سهم لليمين', en: 'Arrow pointing right' }, { f: MWF.arrow(180), ar: 'سهم للأسفل', en: 'Arrow pointing down' }], a: 1,
  w: ['السهم يدور ربع دورة مع عقارب الساعة في كل خطوة: أعلى ← يمين ← أسفل ← يسار.', 'The arrow turns a quarter turn clockwise each step: up → right → down → left.'],
  x: [['الرجوع إلى الأعلى يحتاج ربع دورة إضافية بعد اليسار.', 'Getting back to “up” needs one more quarter turn after “left”.'], 0,
      ['اتجاه اليمين ظهر في الخطوة الثانية؛ القاعدة لا تعود للخلف.', '“Right” appeared in step two; the rule does not go backwards.'],
      ['هذا تكرار للخطوة الأخيرة دون دوران.', 'This repeats the last step without turning.']] },

{ id: '1m4', lv: 1, d: 'math', s: 'diag', t: 'logic',
  q: ['في طابور طالبات، سارة هي الخامسة من الأمام والثامنة من الخلف. كم طالبةً في الطابور؟', 'In a line of students, Sara is 5th from the front and 8th from the back. How many students are in the line?'],
  o: [['13', '13'], ['12', '12'], ['11', '11'], ['3', '3']], a: 1,
  w: ['أمامها 4 طالبات، وخلفها 7 طالبات، وهي واحدة: 4 + 7 + 1 = 12.', 'There are 4 students in front of her, 7 behind her, plus Sara herself: 4 + 7 + 1 = 12.'],
  x: [['جمع 5 + 8 يحسب سارة مرتين.', 'Adding 5 + 8 counts Sara twice.'], 0, ['هذا طرح 2 بدل 1؛ سارة مكررة مرة واحدة فقط.', 'This subtracts 2 instead of 1; Sara is counted twice only once.'],
      ['هذا الفرق بين الترتيبين، ولا يعبّر عن عدد الطالبات.', 'That is the difference between the two positions, not the number of students.']] },

{ id: '1m5', lv: 1, d: 'math', s: 'prac', t: 'arith',
  q: ['ما العدد الذي إذا ضربته في 6 ثم أضفت إليه 4 كان الناتج 40؟', 'What number, multiplied by 6 and then increased by 4, gives 40?'],
  o: [['7', '7'], ['5', '5'], ['6', '6'], ['8', '8']], a: 2,
  w: ['نعكس الخطوات: 40 − 4 = 36، ثم 36 ÷ 6 = 6. وللتحقق: 6 × 6 + 4 = 40.', 'Work backwards: 40 − 4 = 36, then 36 ÷ 6 = 6. Check: 6 × 6 + 4 = 40.'],
  x: [['7 × 6 + 4 = 46، وليس 40.', '7 × 6 + 4 = 46, not 40.'], ['5 × 6 + 4 = 34، وليس 40.', '5 × 6 + 4 = 34, not 40.'], 0, ['8 × 6 + 4 = 52، وليس 40.', '8 × 6 + 4 = 52, not 40.']] },

{ id: '1m6', lv: 1, d: 'math', s: 'prac', t: 'spatial',
  f: MWF.grid(2),
  q: ['كم مربعاً في الشكل؟ (عُدّ المربعات بكل أحجامها)', 'How many squares are in the figure? (Count squares of every size.)'],
  o: [['4', '4'], ['5', '5'], ['6', '6'], ['8', '8']], a: 1,
  w: ['هناك 4 مربعات صغيرة، ومربع كبير يحيط بها كلها: 4 + 1 = 5.', 'There are 4 small squares plus 1 big square around them all: 4 + 1 = 5.'],
  x: [['هذه المربعات الصغيرة فقط؛ نُسي المربع الكبير.', 'These are only the small squares; the big square was forgotten.'], 0,
      ['لا يوجد مربع سادس؛ المستطيلات (مربعان متجاوران) ليست مربعات.', 'There is no sixth square; rectangles made of two small squares are not squares.'],
      ['هذا عدّ للمستطيلات مع المربعات، والسؤال عن المربعات فقط.', 'This counts rectangles as well; the question asks only for squares.']] },

{ id: '1m7', lv: 1, d: 'math', s: 'prac', t: 'sequence',
  q: ['ما العدد التالي؟  1 ، 4 ، 9 ، 16 ، ؟', 'What number comes next?  1, 4, 9, 16, ?'],
  o: [['20', '20'], ['24', '24'], ['25', '25'], ['32', '32']], a: 2,
  w: ['الفروق 3، 5، 7 تزيد 2 كل مرة، فالفرق التالي 9: 16 + 9 = 25. (وهي أيضاً مربعات الأعداد: 1×1، 2×2، 3×3، 4×4، 5×5.)', 'The differences 3, 5, 7 grow by 2 each time, so the next difference is 9: 16 + 9 = 25. (They are also square numbers: 1×1, 2×2, 3×3, 4×4, 5×5.)'],
  x: [['هذا إضافة 4 ثابتة، لكن الفروق تتغير.', 'This adds a constant 4, but the differences change.'], ['هذا إضافة 8؛ الفرق التالي 9 وليس 8.', 'This adds 8; the next difference is 9, not 8.'], 0,
      ['هذا مضاعفة 16، ولا تنطبق على بقية الأعداد.', 'This doubles 16, which does not fit the other numbers.']] },

{ id: '1m8', lv: 1, d: 'math', s: 'prac', t: 'word',
  q: ['عمر أحمد الآن 9 سنوات، وعمر أخيه ضعف عمره. كم سيكون مجموع عمريهما بعد 3 سنوات؟', 'Ahmed is 9 years old now, and his brother is twice his age. What will the sum of their ages be in 3 years?'],
  o: [['27', '27'], ['30', '30'], ['33', '33'], ['36', '36']], a: 2,
  w: ['عمر الأخ الآن 18. بعد 3 سنوات: أحمد 12 والأخ 21، والمجموع 33. (كل منهما يكبر 3 سنوات، فالمجموع يزيد 6.)', 'The brother is 18 now. In 3 years Ahmed will be 12 and his brother 21: 33 in total. (Each grows 3 years, so the sum grows by 6.)'],
  x: [['هذا مجموع عمريهما الآن (9 + 18).', 'That is the sum of their ages now (9 + 18).'], ['أُضيفت 3 سنوات مرة واحدة فقط، مع أن كلاً منهما يكبر 3 سنوات.', '3 years were added only once, but each of them grows 3 years.'], 0,
      ['هذا يفترض أن الأخ يبقى ضعف عمر أحمد (12 و24)، وهذا غير صحيح: فرق العمر يبقى ثابتاً.', 'This assumes the brother stays twice Ahmed’s age (12 and 24), which is wrong: the age gap stays the same.']] },

/* ---------- الاستدلال العلمي والميكانيكي ---------- */
{ id: '1s1', lv: 1, d: 'science', s: 'diag', t: 'mech',
  f: MWF.gears([{ r: 46, t: 12, lb: '1' }, { r: 46, t: 12, lb: '2' }], true),
  q: ['الترسان متعاشقان. إذا دار الترس 1 مع اتجاه عقارب الساعة كما يبين السهم، فكيف يدور الترس 2؟', 'The two gears are meshed. If gear 1 turns clockwise as the arrow shows, how does gear 2 turn?'],
  o: [['مع اتجاه عقارب الساعة', 'Clockwise'], ['عكس اتجاه عقارب الساعة', 'Anticlockwise'], ['لا يدور', 'It does not turn'], ['يتحرك ذهاباً وإياباً', 'It moves back and forth']], a: 1,
  w: ['الأسنان المتعاشقة تدفع بعضها في نقطة التلامس، فيدور كل ترس عكس اتجاه الترس الذي يلامسه.', 'Meshed teeth push each other at the contact point, so each gear turns opposite to the gear it touches.'],
  x: [['الترسان المتلامسان لا يدوران في الاتجاه نفسه؛ لو حاولا لتعارضت أسنانهما.', 'Two touching gears never turn the same way; their teeth would jam.'], 0,
      ['الترس 2 متعاشق مع الترس 1، فحركة الأول تنتقل إليه.', 'Gear 2 is meshed with gear 1, so the motion passes to it.'], ['الترس 1 يدور باستمرار في اتجاه واحد، فيدور الثاني باستمرار أيضاً.', 'Gear 1 keeps turning one way, so gear 2 keeps turning too.']] },

{ id: '1s2', lv: 1, d: 'science', s: 'diag', t: 'concept',
  q: ['وُضع مكعب ثلج في كوب على طاولة داخل غرفة دافئة. ماذا يحدث له بعد ساعة؟', 'An ice cube is placed in a glass on a table in a warm room. What happens to it after an hour?'],
  o: [['يكبر حجمه', 'It gets bigger'], ['يذوب ويتحول إلى ماء', 'It melts and turns into water'], ['يبقى كما هو', 'It stays the same'], ['يتحول إلى حجر', 'It turns into stone']], a: 1,
  w: ['الغرفة أدفأ من الثلج، فينتقل الثلج من الحالة الصلبة إلى السائلة (الانصهار).', 'The room is warmer than the ice, so the ice changes from solid to liquid (melting).'],
  x: [['الثلج لا يكبر في الجو الدافئ، بل يذوب.', 'Ice does not grow in warm air; it melts.'], 0, ['الحرارة تنتقل من الغرفة إلى الثلج فلا يبقى صلباً.', 'Heat moves from the room into the ice, so it cannot stay solid.'],
      ['الماء لا يتحول إلى حجر؛ هذا تغير غير ممكن.', 'Water does not turn into stone; that change is not possible.']] },

{ id: '1s3', lv: 1, d: 'science', s: 'diag', t: 'mech',
  f: MWF.seesaw([{ w: '1', d: 3 }], [{ w: '2', d: 1 }], 3),
  q: ['طفلان لهما الوزن نفسه يجلسان على لوح توازن: الطفل 1 على بُعد 3 أمتار من المحور، والطفل 2 على بُعد متر واحد. ماذا يحدث؟', 'Two children of the same weight sit on a seesaw: child 1 is 3 m from the pivot and child 2 is 1 m from it. What happens?'],
  o: [['ينخفض طرف الطفل 1', 'Child 1’s end goes down'], ['ينخفض طرف الطفل 2', 'Child 2’s end goes down'], ['يبقى اللوح متوازناً', 'The seesaw stays balanced'], ['لا يمكن معرفة ذلك', 'It cannot be known']], a: 0,
  w: ['عند تساوي الوزنين، الذي يجلس أبعد عن المحور يكون تأثيره (عزمه) أكبر، فينخفض طرفه.', 'With equal weights, the one sitting farther from the pivot has the bigger turning effect, so that end goes down.'],
  x: [0, ['الطفل 2 أقرب إلى المحور، فتأثيره أقل.', 'Child 2 is closer to the pivot, so his effect is smaller.'],
      ['التوازن يحتاج المسافتين متساويتين عند تساوي الوزنين.', 'Balance needs equal distances when the weights are equal.'], ['المعطيات كافية: الوزنان متساويان والمسافتان معروفتان.', 'The data is enough: the weights are equal and the distances are known.']] },

{ id: '1s4', lv: 1, d: 'science', s: 'diag', t: 'data',
  p: ['أذاب طالب ملعقة سكر في ماء بدرجات حرارة مختلفة، وسجّل زمن الذوبان:\n• ماء 10°C ← 60 ثانية\n• ماء 30°C ← 35 ثانية\n• ماء 50°C ← 15 ثانية',
      'A student dissolved a spoon of sugar in water at different temperatures and recorded the time taken:\n• water at 10°C → 60 seconds\n• water at 30°C → 35 seconds\n• water at 50°C → 15 seconds'],
  q: ['ماذا نستنتج من النتائج؟', 'What can we conclude from the results?'],
  o: [['الماء البارد يذيب السكر أسرع', 'Cold water dissolves sugar faster'], ['كلما زادت حرارة الماء ذاب السكر أسرع', 'The hotter the water, the faster the sugar dissolves'], ['درجة الحرارة لا تؤثر في الذوبان', 'Temperature does not affect dissolving'], ['السكر لا يذوب في الماء البارد', 'Sugar does not dissolve in cold water']], a: 1,
  w: ['كلما ارتفعت الحرارة (10 ← 30 ← 50) قلّ زمن الذوبان (60 ← 35 ← 15)، أي أن الذوبان صار أسرع.', 'As the temperature rose (10 → 30 → 50), the time fell (60 → 35 → 15): dissolving got faster.'],
  x: [['الماء البارد احتاج أطول زمن (60 ثانية)، فهو الأبطأ.', 'Cold water took the longest time (60 s), so it was the slowest.'], 0,
      ['الأزمنة تغيّرت بوضوح مع تغيّر الحرارة.', 'The times clearly changed as the temperature changed.'], ['السكر ذاب في الماء البارد لكن خلال 60 ثانية.', 'The sugar did dissolve in cold water, just in 60 seconds.']] },

{ id: '1s5', lv: 1, d: 'science', s: 'prac', t: 'concept',
  q: ['أيّ هذه الأشياء ينجذب إلى المغناطيس؟', 'Which of these objects is attracted to a magnet?'],
  o: [['ملعقة خشب', 'A wooden spoon'], ['كوب زجاج', 'A glass cup'], ['مسمار حديد', 'An iron nail'], ['ورقة', 'A sheet of paper']], a: 2,
  w: ['المغناطيس يجذب بعض الفلزات مثل الحديد، والمسمار مصنوع من الحديد.', 'Magnets attract certain metals such as iron, and the nail is made of iron.'],
  x: [['الخشب لا ينجذب إلى المغناطيس.', 'Wood is not attracted to magnets.'], ['الزجاج لا ينجذب إلى المغناطيس.', 'Glass is not attracted to magnets.'], 0, ['الورق لا ينجذب إلى المغناطيس.', 'Paper is not attracted to magnets.']] },

{ id: '1s6', lv: 1, d: 'science', s: 'prac', t: 'mech',
  q: ['تريد رفع صخرة ثقيلة بلوح خشبي طويل وحجر صغير تضعه تحت اللوح نقطةَ ارتكاز. أين تضع الحجر الصغير ليكون الرفع أسهل؟', 'You want to lift a heavy rock with a long plank and a small stone placed under it as a pivot. Where should you put the small stone to make lifting easiest?'],
  o: [['قريباً من الصخرة', 'Close to the rock'], ['في منتصف اللوح', 'In the middle of the plank'], ['قريباً من يديك', 'Close to your hands'], ['لا فرق', 'It makes no difference']], a: 0,
  w: ['كلما ابتعدت يداك عن نقطة الارتكاز واقتربت الصخرة منها، احتجت قوة أقل (مبدأ الرافعة).', 'The farther your hands are from the pivot and the closer the rock is to it, the less force you need (the lever principle).'],
  x: [0, ['في المنتصف تحتاج قوة تساوي وزن الصخرة تقريباً، فلا فائدة.', 'In the middle you need about as much force as the rock’s weight, so it does not help.'],
      ['قرب يديك يجعل الرفع أصعب من رفع الصخرة مباشرة.', 'Near your hands makes lifting harder than lifting the rock directly.'], ['موضع نقطة الارتكاز يغيّر القوة المطلوبة كثيراً.', 'The position of the pivot changes the force needed a lot.']] },

{ id: '1s7', lv: 1, d: 'science', s: 'prac', t: 'concept',
  q: ['لماذا نرى البرق قبل أن نسمع صوت الرعد؟', 'Why do we see lightning before we hear thunder?'],
  o: [['لأن الضوء أسرع كثيراً من الصوت', 'Because light travels much faster than sound'], ['لأن الرعد يحدث بعد البرق بدقائق', 'Because thunder happens minutes after lightning'], ['لأن العين أقوى من الأذن', 'Because eyes are stronger than ears'], ['لأن الصوت لا ينتقل في الهواء', 'Because sound does not travel through air']], a: 0,
  w: ['البرق والرعد يحدثان في اللحظة نفسها، لكن الضوء يصلنا شبه فوري، والصوت أبطأ كثيراً فيتأخر.', 'Lightning and thunder happen at the same moment, but light reaches us almost instantly while sound is much slower, so it arrives later.'],
  x: [0, ['البرق والرعد يحدثان معاً، والتأخير سببه سرعة الانتقال.', 'They happen together; the delay is due to travel speed.'], ['قوة الحواس لا تغيّر زمن وصول الضوء والصوت.', 'How strong our senses are does not change when light and sound arrive.'],
      ['الصوت ينتقل في الهواء، ولذلك نسمع الرعد أصلاً.', 'Sound does travel through air; that is how we hear thunder at all.']] },

{ id: '1s8', lv: 1, d: 'science', s: 'prac', t: 'data',
  q: ['قاس طالب طول نبتة نهاية كل أسبوع فكان: 2 سم ، 4 سم ، 6 سم ، 8 سم. إذا استمر النمو بالمعدل نفسه، كم سيكون طولها نهاية الأسبوع السادس؟', 'A student measured a plant at the end of each week: 2 cm, 4 cm, 6 cm, 8 cm. If it keeps growing at the same rate, how tall will it be at the end of week 6?'],
  o: [['10 سم', '10 cm'], ['12 سم', '12 cm'], ['14 سم', '14 cm'], ['16 سم', '16 cm']], a: 1,
  w: ['النبتة تزيد 2 سم كل أسبوع: الأسبوع 5 = 10 سم، والأسبوع 6 = 12 سم.', 'The plant grows 2 cm a week: week 5 = 10 cm, week 6 = 12 cm.'],
  x: [['هذا طول الأسبوع الخامس، لا السادس.', 'That is the height in week 5, not week 6.'], 0, ['هذا طول الأسبوع السابع.', 'That is the height in week 7.'], ['هذا مضاعفة طول الأسبوع الرابع، والنمو ليس تضاعفاً.', 'This doubles the week-4 height, but the growth is not doubling.']] },

/* ---------- المرونة العقلية ---------- */
{ id: '1f1', lv: 1, d: 'flex', s: 'diag', t: 'codes',
  q: ['إذا كانت كلمة «قلم» تُكتب بالرموز ▲●■ ، وكلمة «لمس» تُكتب ●■◆ ، فكيف تُكتب كلمة «سلم»؟', 'If the word ARM is written ▲●■ and the word RAM is written ●▲■, how is the word MAR written?'],
  o: { ar: [['◆●■', '◆●■'], ['■●◆', '■●◆'], ['◆■●', '◆■●'], ['▲●■', '▲●■']], en: [['■▲●', '■▲●'], ['■●▲', '■●▲'], ['▲●■', '▲●■'], ['●▲■', '●▲■']] }, a: 0,
  w: ['نطابق الحروف: من «قلم» و«لمس»: ل = ● ، م = ■ ، ق = ▲ ، س = ◆. إذن «سلم» = س ل م = ◆●■.', 'Match the letters: from ARM and RAM, A = ▲, R = ●, M = ■. So MAR = M A R = ■▲●.'],
  x: [0, ['ترتيب معكوس للرموز: هذا رمز «م ل س».', 'Wrong order: this spells M R A.'],
      ['الترتيب خاطئ: يضع الميم قبل اللام (س م ل).', 'This is the code for ARM itself.'],
      ['هذا رمز كلمة «قلم» نفسها.', 'This is the code for RAM itself.']] },

{ id: '1f2', lv: 1, d: 'flex', s: 'diag', t: 'rules',
  q: ['قاعدة جديدة لهذا اللغز: علامة (+) تعني الطرح، وعلامة (−) تعني الجمع. ما ناتج:  9 + 4 − 2 ؟', 'New rule for this puzzle: the sign (+) means subtract and the sign (−) means add. What is  9 + 4 − 2 ?'],
  o: [['11', '11'], ['7', '7'], ['3', '3'], ['15', '15']], a: 1,
  w: ['نطبّق القاعدة الجديدة: 9 + 4 − 2 تصبح 9 − 4 + 2 = 7.', 'Apply the new rule: 9 + 4 − 2 becomes 9 − 4 + 2 = 7.'],
  x: [['هذا الحل بالقواعد المعتادة، ونُسيت القاعدة الجديدة.', 'This uses the usual rules and ignores the new one.'], 0, ['هنا طُرح العددان معاً (9 − 4 − 2)؛ لكن (−) تعني الجمع.', 'Both numbers were subtracted (9 − 4 − 2), but (−) means add.'],
      ['هنا جُمعت كل الأعداد؛ لكن (+) تعني الطرح.', 'All the numbers were added, but (+) means subtract.']] },

{ id: '1f3', lv: 1, d: 'flex', s: 'diag', t: 'matrix',
  f: MWF.matrix([MWF.dots(1, 'c'), MWF.dots(2, 'c'), MWF.dots(3, 'c'), MWF.dots(1, 'sq'), MWF.dots(2, 'sq'), MWF.dots(3, 'sq'), MWF.dots(1, 'tri'), MWF.dots(2, 'tri'), null]),
  q: ['ما الشكل الذي يُكمل المصفوفة؟', 'Which figure completes the grid?'],
  o: [{ f: MWF.opt(MWF.dots(3, 'sq')), ar: 'ثلاثة مربعات', en: 'Three squares' }, { f: MWF.opt(MWF.dots(2, 'tri')), ar: 'مثلثان', en: 'Two triangles' }, { f: MWF.opt(MWF.dots(3, 'tri')), ar: 'ثلاثة مثلثات', en: 'Three triangles' }, { f: MWF.opt(MWF.dots(3, 'c')), ar: 'ثلاث دوائر', en: 'Three circles' }], a: 2,
  w: ['قاعدتان معاً: كل صف له شكل واحد (دوائر، مربعات، مثلثات)، وكل عمود له عدد (1، 2، 3). الخانة الناقصة في صف المثلثات وعمود الثلاثة.', 'Two rules at once: each row has one shape (circles, squares, triangles), and each column has one count (1, 2, 3). The missing cell is in the triangle row and the “three” column.'],
  x: [['العدد صحيح لكن الشكل من الصف الثاني.', 'The count is right but the shape belongs to row 2.'], ['الشكل صحيح لكن العدد يخص العمود الثاني.', 'The shape is right but the count belongs to column 2.'], 0, ['العدد صحيح لكن الدوائر تخص الصف الأول.', 'The count is right but circles belong to row 1.']] },

{ id: '1f4', lv: 1, d: 'flex', s: 'diag', t: 'classify',
  q: ['المجموعة: قطة ، أسد ، نمر ، بقرة. إذا صنّفناها حسب نوع الغذاء، فأيّها مختلف؟', 'The group: cat, lion, tiger, cow. If we sort them by what they eat, which one is different?'],
  o: [['قطة', 'cat'], ['أسد', 'lion'], ['نمر', 'tiger'], ['بقرة', 'cow']], a: 3,
  w: ['حسب الغذاء: القطة والأسد والنمر تأكل اللحوم، والبقرة تأكل النباتات. لاحظ أن تغيير معيار التصنيف قد يغيّر الإجابة.', 'By diet: the cat, lion and tiger eat meat, while the cow eats plants. Notice that changing the sorting rule can change the answer.'],
  x: [['القطة آكلة لحوم مثل الأسد والنمر (لكنها تختلف عنهما في الحجم والعيش في البيت؛ وهذا معيار آخر غير المطلوب).', 'The cat eats meat like the lion and tiger (it differs in size and living at home, but that is a different rule from the one asked).'],
      ['الأسد آكل لحوم.', 'The lion eats meat.'], ['النمر آكل لحوم.', 'The tiger eats meat.'], 0] },

{ id: '1f5', lv: 1, d: 'flex', s: 'prac', t: 'codes',
  q: ['إذا كان ★ = 3 ، و ● = 5 ، فما قيمة:  ★ + ● + ● ؟', 'If ★ = 3 and ● = 5, what is  ★ + ● + ● ?'],
  o: [['11', '11'], ['13', '13'], ['8', '8'], ['15', '15']], a: 1,
  w: ['نعوّض: 3 + 5 + 5 = 13.', 'Substitute: 3 + 5 + 5 = 13.'],
  x: [['هذا 3 + 3 + 5؛ أي أن الرمزين بُدّلا.', 'This is 3 + 3 + 5: the symbols were swapped.'], 0, ['هذا 3 + 5 فقط؛ نُسي الرمز الثالث.', 'This is only 3 + 5; the third symbol was forgotten.'], ['هذا 5 + 5 + 5؛ عُدّت النجمة 5.', 'This is 5 + 5 + 5; the star was counted as 5.']] },

{ id: '1f6', lv: 1, d: 'flex', s: 'prac', t: 'rules',
  q: ['في لعبة، تتقدم القطعة خطوتين ثم ترجع خطوة واحدة في كل دور. بدأت عند المربع 0. عند أيّ مربع تكون بعد 5 أدوار؟', 'In a game, a counter moves 2 steps forward then 1 step back each turn. It starts on square 0. Which square is it on after 5 turns?'],
  o: [['10', '10'], ['5', '5'], ['15', '15'], ['6', '6']], a: 1,
  w: ['كل دور يقدّمها خطوة واحدة فعلياً (2 − 1 = 1)، فبعد 5 أدوار تكون عند المربع 5.', 'Each turn moves it forward 1 step overall (2 − 1 = 1), so after 5 turns it is on square 5.'],
  x: [['هذا يحسب التقدم فقط (2 × 5) وينسى الرجوع.', 'This counts only the forward moves (2 × 5) and forgets the steps back.'], 0, ['هذا يجمع الخطوات كلها (3 × 5) كأنها كلها للأمام.', 'This adds all the steps (3 × 5) as if they were all forward.'],
      ['القطعة تصل إلى 6 في منتصف الدور الخامس، ثم ترجع إلى 5.', 'The counter reaches 6 in the middle of turn 5, then steps back to 5.']] },

{ id: '1f7', lv: 1, d: 'flex', s: 'prac', t: 'classify',
  q: ['أيّ كلمة تكوّن مع كلمة «كرة» اسمَ لعبة رياضية معروفة؟', 'Which word joins with “ball” to name a well-known sport?'],
  o: [['رأس', 'head'], ['قدم', 'foot'], ['عين', 'eye'], ['أنف', 'nose']], a: 1,
  w: ['«كرة القدم» لعبة رياضية معروفة. التفكير المرن يبحث عن معنى جديد للكلمة حين تُركّب مع غيرها.', '“Football” is a well-known sport. Flexible thinking looks for a new meaning when words are combined.'],
  x: [['«كرة الرأس» ليست اسم لعبة.', '“Headball” is not the name of a sport.'], 0, ['«كرة العين» ليست لعبة، بل تعني العين نفسها.', '“Eyeball” is not a sport; it means the eye itself.'], ['«كرة الأنف» ليست اسم لعبة.', '“Noseball” is not a sport.']] },

{ id: '1f8', lv: 1, d: 'flex', s: 'prac', t: 'perspective',
  q: ['إذا قلبنا الرقم 6 رأساً على عقب (دوّرناه نصف دورة)، فأيّ رقم نرى؟', 'If we turn the digit 6 upside down (half a turn), which digit do we see?'],
  o: [['6', '6'], ['8', '8'], ['9', '9'], ['0', '0']], a: 2,
  w: ['عند تدوير 6 نصف دورة تنتقل الدائرة إلى الأعلى والذيل إلى الأسفل، فيصبح 9.', 'Turning 6 half a turn moves the loop to the top and the tail to the bottom, so it becomes 9.'],
  x: [['الرقم 6 لا يبقى كما هو عند قلبه.', 'A 6 does not stay the same when turned over.'], ['الرقم 8 له دائرتان، والرقم 6 له دائرة واحدة.', 'An 8 has two loops; a 6 has only one.'], 0, ['الرقم 0 ليس له ذيل، والرقم 6 له ذيل.', 'A 0 has no tail; a 6 does.']] },

/* ===================================================================
   المستوى الثاني (الصف 6 الابتدائي – الصف 2 المتوسط)
   =================================================================== */

/* ---------- الاستدلال اللغوي وفهم المقروء ---------- */
{ id: '2v1', lv: 2, d: 'verbal', s: 'diag', t: 'analogy',
  q: ['لَبِنة : جدار ، كما أن :', 'Brick : wall, as :'],
  o: [['حبر : قلم', 'ink : pen'], ['كلمة : جملة', 'word : sentence'], ['قارئ : كتاب', 'reader : book'], ['صفحة : غلاف', 'page : cover']], a: 1,
  w: ['العلاقة «جزء يُرصّ مع أمثاله ليكوّن الكل»: اللبنات تُرصّ فتكوّن الجدار، والكلمات تُرتّب فتكوّن الجملة.', 'The relation is “a part arranged with others like it to build the whole”: bricks build a wall, words build a sentence.'],
  x: [['الحبر بداخل القلم (علاقة احتواء)، ولا يكوّن القلم.', 'Ink is inside a pen (containment); it does not build the pen.'], 0,
      ['القارئ يستخدم الكتاب (علاقة مستخدِم : شيء)، وليس جزءاً منه.', 'A reader uses a book (user : object); he is not part of it.'],
      ['الصفحة والغلاف جزآن متجاوران من الكتاب، وليس أحدهما مكوّناً للآخر.', 'Page and cover are both parts of a book; neither builds the other.']] },

{ id: '2v2', lv: 2, d: 'verbal', s: 'diag', t: 'context',
  q: ['حدّد الكلمة غير المناسبة لسياق الجملة: «ازدحمت الشوارع بالسيارات، فوصل الموظفون إلى أعمالهم مبكرين على غير عادتهم.»', 'Find the word that does not fit the context: “The streets were jammed with cars, so the employees reached work early, unlike usual.”'],
  o: [['ازدحمت', 'jammed'], ['الشوارع', 'streets'], ['مبكرين', 'early'], ['أعمالهم', 'work']], a: 2,
  w: ['الازدحام يؤخّر الوصول، فالنتيجة المنطقية «متأخرين» لا «مبكرين».', 'Traffic jams delay people, so the logical result is “late”, not “early”.'],
  x: [['«ازدحمت» هي السبب الذي تُبنى عليه الجملة، وهي مناسبة.', '“Jammed” is the cause the sentence is built on; it fits.'], ['الشوارع مكان الازدحام، فالكلمة مناسبة.', 'Streets are where the jam happens; the word fits.'], 0,
      ['الموظفون يصلون إلى أعمالهم؛ لا تعارض.', 'Employees do arrive at work; no conflict.']] },

{ id: '2v3', lv: 2, d: 'verbal', s: 'diag', t: 'completion',
  q: ['اختر الكلمتين المناسبتين: «رغم ........ الطريق وطوله، أصرّ المتسابق على ........ السباق.»', 'Choose the two words that fit: “Despite the ........ and length of the road, the runner insisted on ........ the race.”'],
  o: [['سهولة / الانسحاب من', 'ease / withdrawing from'], ['قِصَر / إكمال', 'shortness / finishing'], ['وعورة / إكمال', 'roughness / finishing'], ['وعورة / الانسحاب من', 'roughness / withdrawing from']], a: 2,
  w: ['«رغم» تدل على تعارض بين صعوبة الطريق وبين ما فعله المتسابق: الطريق صعب (وعورة)، ومع ذلك أكمل السباق.', '“Despite” signals a contrast between a difficult road and what the runner did: the road was rough, yet he finished the race.'],
  x: [['السهولة لا تتعارض مع الانسحاب بشكل يفسّر «رغم»، والإصرار لا يكون على الانسحاب عادة.', 'Ease does not create the contrast that “despite” needs, and one rarely “insists” on withdrawing.'],
      ['«قِصَر» يتعارض مع كلمة «وطوله» في الجملة نفسها.', '“Shortness” contradicts “and length” in the same sentence.'], 0,
      ['الوعورة تفسّر الانسحاب ولا تعارضه، فلا معنى لـ«رغم».', 'Roughness would explain withdrawing, not contrast with it, so “despite” makes no sense.']] },

{ id: '2v4', lv: 2, d: 'verbal', s: 'diag', t: 'reading',
  p: ['حين تكتشف النحلة العاملة حقلاً من الأزهار، تعود إلى الخلية وتؤدي حركات تشبه الرقص. فإذا كان الحقل قريباً رقصت في دوائر، وإذا كان بعيداً أدّت رقصة اهتزازية تشبه الرقم 8، يدلّ اتجاهها على اتجاه الحقل بالنسبة إلى الشمس، وتدلّ مدّتها على بُعده؛ فكلما طالت الرقصة كان الحقل أبعد.',
      'When a worker bee finds a field of flowers, it returns to the hive and performs dance-like movements. If the field is near, it dances in circles; if it is far, it performs a waggle dance shaped like the number 8. The direction of the waggle shows the field’s direction relative to the sun, and its duration shows the distance: the longer the dance, the farther the field.'],
  q: ['ماذا تفهم النحلات من رقصة اهتزازية طويلة المدة؟', 'What do the other bees understand from a long-lasting waggle dance?'],
  o: [['أن الحقل قريب جداً', 'That the field is very near'], ['أن الحقل بعيد', 'That the field is far away'], ['أن الأزهار كثيرة', 'That there are many flowers'], ['أن الشمس غائبة', 'That the sun has set']], a: 1,
  w: ['النص يربط مدة الرقصة بالبُعد: «كلما طالت الرقصة كان الحقل أبعد».', 'The text links the dance’s duration to distance: “the longer the dance, the farther the field”.'],
  x: [['الحقل القريب يُعبَّر عنه برقصة دائرية، لا اهتزازية.', 'A near field is shown by a circle dance, not a waggle dance.'], 0,
      ['النص لم يربط الرقصة بعدد الأزهار.', 'The text does not link the dance to the number of flowers.'], ['الشمس في النص مرجع للاتجاه، ولم يُذكر غيابها.', 'In the text the sun is a reference for direction; nothing is said about it setting.']] },

{ id: '2v5', lv: 2, d: 'verbal', s: 'prac', t: 'odd',
  q: ['أيّ كلمة تختلف في معناها عن البقية؟', 'Which word differs in meaning from the others?'],
  o: [['تشجيع', 'encouragement'], ['تحفيز', 'motivation'], ['تثبيط', 'discouragement'], ['دعم', 'support']], a: 2,
  w: ['التشجيع والتحفيز والدعم تدفع الإنسان إلى الأمام، أما التثبيط فيُضعف عزيمته؛ فهو عكسها.', 'Encouragement, motivation and support push a person forward, while discouragement weakens their will: it is the opposite.'],
  x: [['التشجيع قريب في المعنى من التحفيز والدعم.', 'Encouragement is close in meaning to motivation and support.'], ['التحفيز قريب في المعنى من التشجيع والدعم.', 'Motivation is close in meaning to encouragement and support.'], 0,
      ['الدعم قريب في المعنى من التشجيع والتحفيز.', 'Support is close in meaning to encouragement and motivation.']] },

{ id: '2v6', lv: 2, d: 'verbal', s: 'prac', t: 'analogy',
  q: ['جائع : طعام ، كما أن متعب : ؟', 'Hungry : food, as tired : ?'],
  o: [['عمل', 'work'], ['راحة', 'rest'], ['ركض', 'running'], ['سرير', 'bed']], a: 1,
  w: ['العلاقة «حالة : ما يسدّ حاجتها»: الطعام يزيل الجوع، والراحة تزيل التعب.', 'The relation is “a state : what meets its need”: food ends hunger, rest ends tiredness.'],
  x: [['العمل يزيد التعب ولا يزيله.', 'Work increases tiredness rather than ending it.'], 0, ['الركض يزيد التعب.', 'Running increases tiredness.'],
      ['السرير مكان للراحة وليس هو ما يسدّ الحاجة نفسها؛ يقابله في الطرف الأول «مائدة» لا «طعام».', 'A bed is a place to rest, not the thing that meets the need; its match on the first side would be “table”, not “food”.']] },

{ id: '2v7', lv: 2, d: 'verbal', s: 'prac', t: 'context',
  q: ['حدّد الكلمة غير المناسبة: «استخدم العالِم المِجهر ليرى النجوم البعيدة بوضوح.»', 'Find the word that does not fit: “The scientist used a microscope to see the distant stars clearly.”'],
  o: [['العالِم', 'scientist'], ['المِجهر', 'microscope'], ['النجوم', 'stars'], ['بوضوح', 'clearly']], a: 1,
  w: ['المجهر يكبّر الأشياء الصغيرة القريبة، أما النجوم البعيدة فتُرصد بالمقراب (التلسكوب).', 'A microscope magnifies small, near objects; distant stars are observed with a telescope.'],
  x: [['العالِم يستخدم الأجهزة العلمية؛ لا تعارض.', 'Scientists use scientific instruments; no conflict.'], 0, ['رصد النجوم هو هدف الجملة.', 'Observing stars is the aim of the sentence.'], ['الرؤية بوضوح هي الغاية من استخدام الجهاز.', 'Seeing clearly is the purpose of using the instrument.']] },

{ id: '2v8', lv: 2, d: 'verbal', s: 'prac', t: 'reading',
  p: ['تحتاج المملكة العربية السعودية إلى كميات كبيرة من الماء العذب للشرب والزراعة والصناعة. ولأن الأمطار فيها قليلة ولا توجد بها أنهار دائمة الجريان، فقد اتجهت إلى تحلية مياه البحر، ثم ضخّها عبر أنابيب طويلة إلى المدن البعيدة عن الساحل.',
      'Saudi Arabia needs large amounts of fresh water for drinking, farming and industry. Because rainfall is low and there are no permanently flowing rivers, the Kingdom turned to desalinating seawater and pumping it through long pipelines to cities far from the coast.'],
  q: ['ما السبب الرئيس لاعتماد المملكة على تحلية مياه البحر بحسب النص؟', 'According to the text, what is the main reason the Kingdom relies on desalination?'],
  o: [['كثرة البحار حولها', 'It is surrounded by many seas'], ['قلة الأمطار وعدم وجود أنهار دائمة', 'Low rainfall and no permanent rivers'], ['أن التحلية رخيصة', 'Desalination is cheap'], ['أن مياه البحر عذبة', 'Seawater is fresh']], a: 1,
  w: ['النص يذكر السبب صراحة بعد كلمة «لأن»: قلة الأمطار وعدم وجود أنهار دائمة الجريان.', 'The text gives the reason right after “Because”: low rainfall and no permanently flowing rivers.'],
  x: [['وجود البحر يجعل التحلية ممكنة، لكنه ليس سبب الحاجة إليها.', 'Having a coast makes desalination possible, but it is not why it is needed.'], 0,
      ['النص لم يتحدث عن التكلفة.', 'The text says nothing about cost.'], ['مياه البحر مالحة، ولهذا تحتاج إلى تحلية.', 'Seawater is salty; that is why it must be desalinated.']] },

/* ---------- الاستدلال الرياضي والمكاني ---------- */
{ id: '2m1', lv: 2, d: 'math', s: 'diag', t: 'arith',
  q: ['قرأ ماجد ثلث كتاب في اليوم الأول، وربع الكتاب في اليوم الثاني. ما الجزء الذي بقي دون قراءة؟', 'Majid read one third of a book on day one and one quarter of it on day two. What fraction of the book is still unread?'],
  o: [['7/12', '7/12'], ['5/12', '5/12'], ['2/7', '2/7'], ['1/2', '1/2']], a: 1,
  w: ['ما قرأه: 1/3 + 1/4 = 4/12 + 3/12 = 7/12، والباقي: 1 − 7/12 = 5/12.', 'He read 1/3 + 1/4 = 4/12 + 3/12 = 7/12, so 1 − 7/12 = 5/12 is left.'],
  x: [['هذا ما قرأه، والسؤال عمّا بقي.', 'That is what he read; the question asks what is left.'], 0,
      ['هذا جمع البسطين والمقامين (1+1)/(3+4)، وهي طريقة خاطئة لجمع الكسور.', 'This adds tops and bottoms, (1+1)/(3+4), which is not how fractions are added.'], ['تقدير غير مبني على حساب؛ ما قرأه أكثر من النصف.', 'A guess, not a calculation; he read more than half.']] },

{ id: '2m2', lv: 2, d: 'math', s: 'diag', t: 'word',
  q: ['خليط نسبة الماء فيه إلى العصير 3 : 2. إذا كان حجم الخليط 25 لتراً، فكم لتراً من العصير فيه؟', 'A drink has water and juice in the ratio 3 : 2. If there are 25 litres in total, how many litres of juice are there?'],
  o: [['15', '15'], ['12.5', '12.5'], ['10', '10'], ['8', '8']], a: 2,
  w: ['مجموع الأجزاء 3 + 2 = 5، فالجزء الواحد = 25 ÷ 5 = 5 لترات، والعصير جزآن = 10 لترات.', 'There are 3 + 2 = 5 parts, so one part = 25 ÷ 5 = 5 litres, and juice is 2 parts = 10 litres.'],
  x: [['هذه كمية الماء (3 أجزاء).', 'That is the amount of water (3 parts).'], ['هذا تقسيم الخليط نصفين، مع أن النسبة ليست 1 : 1.', 'This splits the mix in half, but the ratio is not 1 : 1.'], 0,
      ['لا يتفق مع أي جزء من الحل؛ 8 + 12 = 20 لا 25.', 'This fits no step of the solution; 8 + 12 = 20, not 25.']] },

{ id: '2m3', lv: 2, d: 'math', s: 'diag', t: 'spatial',
  f: MWF.net([['', '★', '', ''], ['●', '▲', '■', '◆'], ['', '✚', '', '']]),
  q: ['طُويت هذه الشبكة لتكوين مكعب. أيّ وجه يقابل الوجه ●؟', 'This net is folded into a cube. Which face is opposite the ● face?'],
  o: [['▲', '▲'], ['■', '■'], ['◆', '◆'], ['★', '★']], a: 1,
  w: ['في الشريط الأفقي المكوّن من أربعة مربعات يتقابل كل مربعين بينهما مربع واحد: ● يقابل ■، و▲ يقابل ◆، و★ يقابل ✚.', 'In a straight strip of four squares, faces with exactly one square between them are opposite: ● is opposite ■, ▲ is opposite ◆, and ★ is opposite ✚.'],
  x: [['▲ ملاصق لـ● في الشبكة، فيبقى ملاصقاً له في المكعب.', '▲ touches ● in the net, so it stays next to it on the cube.'], 0,
      ['◆ في طرف الشريط الآخر، وعند الطي يلتف ليلاصق ●.', '◆ is at the other end of the strip; when folded it wraps round to touch ●.'], ['★ يقابل ✚، ويصبح ملاصقاً لـ●.', '★ is opposite ✚ and ends up next to ●.']] },

{ id: '2m4', lv: 2, d: 'math', s: 'diag', t: 'sequence',
  q: ['ما العدد التالي؟  3 ، 6 ، 4 ، 8 ، 6 ، 12 ، ؟', 'What comes next?  3, 6, 4, 8, 6, 12, ?'],
  o: [['24', '24'], ['10', '10'], ['14', '14'], ['9', '9']], a: 1,
  w: ['قاعدتان بالتناوب: ×2 ثم −2: 3→6→4→8→6→12، والخطوة التالية −2 فيكون 10.', 'Two alternating rules, ×2 then −2: 3→6→4→8→6→12, so the next step is −2, giving 10.'],
  x: [['هذا تطبيق ×2 مرتين متتاليتين، والقاعدة تتناوب.', 'This applies ×2 twice in a row, but the rules alternate.'], 0, ['هذا إضافة 2 بدل طرحها.', 'This adds 2 instead of subtracting it.'], ['لا تنتج عن أي من القاعدتين.', 'Neither rule produces this.']] },

{ id: '2m5', lv: 2, d: 'math', s: 'prac', t: 'arith',
  q: ['سعر حقيبة 120 ريالاً وعليها خصم 25%. كم سعرها بعد الخصم؟', 'A bag costs 120 riyals with a 25% discount. What is the price after the discount?'],
  o: [['95', '95'], ['30', '30'], ['90', '90'], ['100', '100']], a: 2,
  w: ['25% = الربع، وربع 120 = 30، فالسعر بعد الخصم 120 − 30 = 90 ريالاً.', '25% is a quarter; a quarter of 120 is 30, so the price is 120 − 30 = 90 riyals.'],
  x: [['هذا طرح 25 ريالاً لا 25%.', 'This subtracts 25 riyals, not 25%.'], ['هذا مقدار الخصم، لا السعر بعده.', 'That is the discount itself, not the new price.'], 0, ['هذا خصم 20 ريالاً، ولا يساوي 25%.', 'This is a 20-riyal discount, which is not 25%.']] },

{ id: '2m6', lv: 2, d: 'math', s: 'prac', t: 'logic',
  q: ['مجموع عمري أخوين 20 سنة، والفرق بينهما 4 سنوات. كم عمر الأكبر؟', 'Two brothers’ ages add up to 20, and they differ by 4 years. How old is the older one?'],
  o: [['10', '10'], ['16', '16'], ['12', '12'], ['8', '8']], a: 2,
  w: ['لو أزلنا الفرق: 20 − 4 = 16، ونصفها 8 = عمر الأصغر، والأكبر 8 + 4 = 12. (تحقق: 12 + 8 = 20 و12 − 8 = 4.)', 'Remove the difference: 20 − 4 = 16; half of that, 8, is the younger, and the older is 8 + 4 = 12. (Check: 12 + 8 = 20, 12 − 8 = 4.)'],
  x: [['هذا نصف المجموع، ويعني أنهما في العمر نفسه.', 'That is half the total, which would make them the same age.'], ['هذا المجموع بعد طرح الفرق، وليس عمر أحدهما.', 'That is the total minus the difference, not either age.'], 0, ['هذا عمر الأصغر.', 'That is the younger brother’s age.']] },

{ id: '2m7', lv: 2, d: 'math', s: 'prac', t: 'spatial',
  q: ['طُويت ورقة مربعة من المنتصف، ثم طُويت مرة ثانية من المنتصف، ثم ثُقبت ثقباً واحداً يخترق كل الطبقات. كم ثقباً يظهر عند فتح الورقة؟', 'A square sheet is folded in half, then in half again, then one hole is punched through all the layers. How many holes appear when it is unfolded?'],
  o: [['2', '2'], ['3', '3'], ['4', '4'], ['8', '8']], a: 2,
  w: ['كل طيّة تضاعف عدد الطبقات: 1 ← 2 ← 4، والثقب يخترق 4 طبقات، فيظهر 4 ثقوب.', 'Each fold doubles the layers: 1 → 2 → 4. The hole goes through 4 layers, so 4 holes appear.'],
  x: [['هذا عدد الطبقات بعد طيّة واحدة فقط.', 'That is the number of layers after only one fold.'], ['عدد الطبقات يتضاعف ولا يزيد واحداً.', 'Layers double; they do not go up by one.'], 0, ['هذا بعد ثلاث طيّات، والورقة طُويت مرتين.', 'That would need three folds; the sheet was folded twice.']] },

{ id: '2m8', lv: 2, d: 'math', s: 'prac', t: 'geometry',
  q: ['مستطيل طوله 8 سم وعرضه 5 سم، قُصّ من أحد أركانه مربع طول ضلعه 2 سم. ما مساحة الشكل الناتج؟', 'A rectangle is 8 cm long and 5 cm wide. A square of side 2 cm is cut from one corner. What is the area of the new shape?'],
  o: [['40 سم²', '40 cm²'], ['36 سم²', '36 cm²'], ['32 سم²', '32 cm²'], ['26 سم²', '26 cm²']], a: 1,
  w: ['مساحة المستطيل 8 × 5 = 40، ومساحة المربع المقصوص 2 × 2 = 4، فالباقي 40 − 4 = 36 سم².', 'The rectangle is 8 × 5 = 40, the cut square is 2 × 2 = 4, so 40 − 4 = 36 cm² remains.'],
  x: [['هذه مساحة المستطيل قبل القص.', 'That is the area before the cut.'], 0, ['هذا طرح محيط المربع (8) بدل مساحته (4).', 'This subtracts the square’s perimeter (8) instead of its area (4).'],
      ['هذا محيط المستطيل (ويبقى 26 سم بعد القص)، والسؤال عن المساحة.', 'That is the perimeter (which stays 26 cm after the cut); the question asks for area.']] },

/* ---------- الاستدلال العلمي والميكانيكي ---------- */
{ id: '2s1', lv: 2, d: 'science', s: 'diag', t: 'mech',
  f: MWF.gears([{ r: 50, t: 14, lb: 'A' }, { r: 28, t: 8, lb: 'B' }, { r: 50, t: 14, lb: 'C' }], true),
  q: ['ثلاثة تروس متعاشقة في صف. إذا دار الترس A مع اتجاه عقارب الساعة، فكيف يدور الترس C؟', 'Three gears are meshed in a row. If gear A turns clockwise, how does gear C turn?'],
  o: [['عكس اتجاه عقارب الساعة', 'Anticlockwise'], ['مع اتجاه عقارب الساعة', 'Clockwise'], ['لا يدور', 'It does not turn'], ['يعتمد على حجم الترس B', 'It depends on the size of gear B']], a: 1,
  w: ['كل ترس يعكس الاتجاه: A مع عقارب الساعة ← B عكسها ← C معها. قاعدة: التروس في المواقع الفردية (1، 3، 5) تدور في الاتجاه نفسه.', 'Each gear reverses the direction: A clockwise → B anticlockwise → C clockwise. Rule: gears in odd positions (1st, 3rd, 5th) turn the same way.'],
  x: [['هذا اتجاه الترس B (الأوسط)، والترس C يعكسه مرة أخرى.', 'That is gear B’s direction; gear C reverses it again.'], 0, ['C متعاشق مع B، فيدور بدورانه.', 'C is meshed with B, so it turns when B turns.'],
      ['حجم الترس B يغيّر السرعة فقط، ولا يغيّر الاتجاه.', 'B’s size changes only the speed, not the direction.']] },

{ id: '2s2', lv: 2, d: 'science', s: 'diag', t: 'mech',
  f: MWF.seesaw([{ w: '40', d: 3 }], [{ w: '?', d: 2 }], 3),
  q: ['لوح توازن عليه كتلة 40 كغ على بُعد 3 م من المحور. ما الكتلة التي توضع على بُعد 2 م في الجهة الأخرى ليتوازن اللوح؟', 'A seesaw has a 40 kg mass 3 m from the pivot. What mass placed 2 m from the pivot on the other side will balance it?'],
  o: [['40 كغ', '40 kg'], ['80 كغ', '80 kg'], ['60 كغ', '60 kg'], ['120 كغ', '120 kg']], a: 2,
  w: ['يتوازن اللوح حين يتساوى (الكتلة × المسافة) في الجهتين: 40 × 3 = 120، و120 ÷ 2 = 60 كغ.', 'The seesaw balances when (mass × distance) is equal on both sides: 40 × 3 = 120, and 120 ÷ 2 = 60 kg.'],
  x: [['الكتلة نفسها لا تكفي لأنها أقرب إلى المحور.', 'The same mass is not enough because it is closer to the pivot.'], ['هذه أكثر من اللازم: 80 × 2 = 160 أكبر من 120.', 'This is too much: 80 × 2 = 160, more than 120.'], 0,
      ['هذا ناتج الضرب (العزم) نفسه، لا الكتلة المطلوبة.', 'That is the product (the turning effect), not the mass needed.']] },

{ id: '2s3', lv: 2, d: 'science', s: 'diag', t: 'data',
  p: ['وُضعت أربع كرات لها الحجم نفسه والشكل نفسه في حوض ماء:\n• كرة فلّين ← طفت\n• كرة خشب ← طفت\n• كرة حديد ← غاصت\n• كرة زجاج ← غاصت',
      'Four balls of the same size and shape were placed in a tank of water:\n• cork ball → floated\n• wooden ball → floated\n• iron ball → sank\n• glass ball → sank'],
  q: ['أيّ خاصية تفسّر هذه النتائج؟', 'Which property explains these results?'],
  o: [['حجم الكرة', 'The size of the ball'], ['شكل الكرة', 'The shape of the ball'], ['كثافة مادة الكرة مقارنة بكثافة الماء', 'The density of the ball’s material compared with water'], ['لون الكرة', 'The colour of the ball']], a: 2,
  w: ['الحجم والشكل متساويان، فالفرق في المادة: ما كثافته أقل من الماء يطفو (الفلين والخشب)، وما كثافته أكبر يغوص (الحديد والزجاج).', 'Size and shape were equal, so the difference is the material: what is less dense than water floats (cork, wood), what is denser sinks (iron, glass).'],
  x: [['الحجم ثابت في كل الكرات، فلا يفسّر الاختلاف.', 'Size was the same for all balls, so it cannot explain the difference.'], ['الشكل ثابت في كل الكرات.', 'Shape was the same for all balls.'], 0, ['اللون لا يؤثر في الطفو، ولم يُذكر أصلاً.', 'Colour does not affect floating, and it was not even mentioned.']] },

{ id: '2s4', lv: 2, d: 'science', s: 'diag', t: 'concept',
  q: ['دائرة كهربائية فيها بطارية ومصباحان موصولان على التوالي (في مسار واحد). إذا احترق أحد المصباحين، فماذا يحدث للآخر؟', 'A circuit has a battery and two bulbs connected in series (one path). If one bulb burns out, what happens to the other?'],
  o: [['يزداد إضاءةً', 'It gets brighter'], ['ينطفئ', 'It goes out'], ['يبقى مضيئاً كما هو', 'It stays lit as before'], ['يضيء بنصف إضاءته', 'It glows at half brightness']], a: 1,
  w: ['في التوصيل على التوالي يمر التيار في مسار واحد، فإذا انقطع عند المصباح المحترق انفتحت الدائرة كلها وتوقف التيار.', 'In series, current flows along one path; if it breaks at the burnt bulb, the whole circuit opens and the current stops.'],
  x: [['لا يمر تيار أصلاً بعد انفتاح الدائرة.', 'No current flows at all once the circuit is open.'], 0, ['هذا يحدث في التوصيل على التوازي حيث لكل مصباح مسار مستقل.', 'That happens in parallel circuits, where each bulb has its own path.'],
      ['لا يوجد تيار جزئي في دائرة مفتوحة.', 'There is no partial current in an open circuit.']] },

{ id: '2s5', lv: 2, d: 'science', s: 'prac', t: 'mech',
  q: ['بكرة واحدة ثابتة معلّقة في السقف تُستخدم لرفع دلو بحبل. ما فائدتها الأساسية؟', 'A single fixed pulley hung from the ceiling is used to lift a bucket with a rope. What is its main benefit?'],
  o: [['تقلّل القوة المطلوبة إلى النصف', 'It halves the force needed'], ['تغيّر اتجاه القوة: نسحب لأسفل فيرتفع الدلو', 'It changes the direction of the force: pull down, the bucket goes up'], ['تزيد وزن الدلو', 'It increases the bucket’s weight'], ['تجعل الدلو يرتفع أسرع دائماً', 'It always makes the bucket rise faster']], a: 1,
  w: ['البكرة الثابتة لا توفّر في القوة، لكنها تسمح بالسحب إلى أسفل مستعيناً بوزن الجسم، وهذا أسهل.', 'A fixed pulley saves no force, but it lets you pull downwards using your body weight, which is easier.'],
  x: [['تقليل القوة إلى النصف تفعله البكرة المتحركة، لا الثابتة.', 'Halving the force is what a movable pulley does, not a fixed one.'], 0, ['البكرة لا تغيّر وزن الدلو.', 'A pulley does not change the bucket’s weight.'],
      ['سرعة الدلو تساوي سرعة سحب الحبل في البكرة الثابتة.', 'With a fixed pulley the bucket moves at the same speed as the rope is pulled.']] },

{ id: '2s6', lv: 2, d: 'science', s: 'prac', t: 'data',
  p: ['يتحرك جسم في خط مستقيم، وسُجّلت المسافة التي قطعها:\nالزمن (ث): 0 ، 1 ، 2 ، 3\nالمسافة (م): 0 ، 5 ، 10 ، 15', 'An object moves in a straight line. Its distance was recorded:\nTime (s): 0, 1, 2, 3\nDistance (m): 0, 5, 10, 15'],
  q: ['ما سرعة الجسم؟', 'What is the object’s speed?'],
  o: [['15 م/ث', '15 m/s'], ['5 م/ث', '5 m/s'], ['3 م/ث', '3 m/s'], ['10 م/ث', '10 m/s']], a: 1,
  w: ['السرعة = المسافة ÷ الزمن = 15 ÷ 3 = 5 م/ث، وهي ثابتة لأن الجسم يقطع 5 م كل ثانية.', 'Speed = distance ÷ time = 15 ÷ 3 = 5 m/s. It is constant: the object covers 5 m every second.'],
  x: [['هذه المسافة الكلية لا السرعة.', 'That is the total distance, not the speed.'], 0, ['هذا الزمن الكلي.', 'That is the total time.'], ['هذه المسافة بعد ثانيتين.', 'That is the distance after 2 seconds.']] },

{ id: '2s7', lv: 2, d: 'science', s: 'prac', t: 'concept',
  q: ['لماذا يُفضَّل طلاء خزانات الماء فوق أسطح المنازل باللون الأبيض؟', 'Why is it better to paint rooftop water tanks white?'],
  o: [['لأن الأبيض يمتص حرارة الشمس', 'Because white absorbs the sun’s heat'], ['لأن الأبيض يعكس معظم أشعة الشمس فيقلّ تسخين الماء', 'Because white reflects most sunlight, so the water heats up less'], ['لأن الأبيض يزيد كمية الماء', 'Because white increases the amount of water'], ['لأن الأبيض يجعل الخزان أثقل', 'Because white makes the tank heavier']], a: 1,
  w: ['الألوان الفاتحة تعكس معظم الضوء الساقط عليها، فتمتص طاقة أقل ويبقى الماء أبرد.', 'Light colours reflect most of the light falling on them, so they absorb less energy and the water stays cooler.'],
  x: [['الألوان الداكنة هي التي تمتص الحرارة أكثر.', 'Dark colours are the ones that absorb more heat.'], 0, ['اللون لا يغيّر كمية الماء.', 'Colour does not change the amount of water.'], ['اللون لا يغيّر وزن الخزان بشكل يُذكر، ولا علاقة لذلك بالغرض.', 'Paint colour barely changes the tank’s weight, and that is not the purpose.']] },

{ id: '2s8', lv: 2, d: 'science', s: 'prac', t: 'concept',
  q: ['عند تسخين الماء في قِدر مغطّى، قد يهتز الغطاء ويرتفع قليلاً. ما السبب؟', 'When water is heated in a covered pot, the lid may rattle and lift a little. Why?'],
  o: [['ازدياد كتلة الماء', 'The water’s mass increases'], ['تكوّن البخار وازدياد ضغطه تحت الغطاء', 'Steam forms and its pressure under the lid rises'], ['انجذاب الغطاء نحو مصدر الحرارة', 'The lid is attracted to the heat source'], ['نقص حجم الماء', 'The water’s volume decreases']], a: 1,
  w: ['يتحول بعض الماء إلى بخار يشغل حجماً أكبر بكثير، فيزداد الضغط تحت الغطاء حتى يدفعه للأعلى.', 'Some water turns into steam, which takes up much more space, so the pressure under the lid rises until it pushes the lid up.'],
  x: [['الكتلة لا تزيد بالتسخين.', 'Mass does not increase on heating.'], 0, ['الحرارة لا تجذب الأجسام.', 'Heat does not attract objects.'], ['نقص الماء السائل لا يدفع الغطاء؛ البخار الناتج هو الذي يدفعه.', 'Less liquid water would not push the lid; the steam produced does.']] },

/* ---------- المرونة العقلية ---------- */
{ id: '2f1', lv: 2, d: 'flex', s: 'diag', t: 'codes',
  q: ['في رمز سري يُستبدل كل رقم بالرقم الذي يزيد عليه 2، على أن 8 يصبح 0 و9 يصبح 1. كيف يُكتب العدد 4798؟', 'In a secret code, each digit is replaced by the digit 2 more than it, except that 8 becomes 0 and 9 becomes 1. How is 4798 written?'],
  o: [['2576', '2576'], ['6910', '6910'], ['691110', '691110'], ['6810', '6810']], a: 1,
  w: ['4 ← 6 ، 7 ← 9 ، 9 ← 1 ، 8 ← 0؛ فيصبح العدد 6910.', '4 → 6, 7 → 9, 9 → 1, 8 → 0, giving 6910.'],
  x: [['هذا طرح 2 من كل رقم بدل إضافتها.', 'This subtracts 2 from each digit instead of adding.'], 0, ['هنا أُضيفت 2 دون تطبيق قاعدة 8 و9 (11 و10).', 'This adds 2 but ignores the rule for 8 and 9 (11 and 10).'], ['الرقم 7 يصبح 9 لا 8.', '7 becomes 9, not 8.']] },

{ id: '2f2', lv: 2, d: 'flex', s: 'diag', t: 'rules',
  q: ['رتّب الأعداد: 7 ، 2 ، 9 ، 4 ، 1 ، 8 بحيث تأتي الأعداد الفردية أولاً تصاعدياً، ثم الزوجية تنازلياً. ما العدد الرابع في الترتيب الجديد؟', 'Arrange 7, 2, 9, 4, 1, 8 so that the odd numbers come first in increasing order, then the even numbers in decreasing order. What is the fourth number?'],
  o: [['2', '2'], ['4', '4'], ['9', '9'], ['8', '8']], a: 3,
  w: ['الفردية تصاعدياً: 1، 7، 9، ثم الزوجية تنازلياً: 8، 4، 2. الترتيب: 1، 7، 9، 8، 4، 2، والرابع 8.', 'Odd numbers increasing: 1, 7, 9; then even numbers decreasing: 8, 4, 2. Order: 1, 7, 9, 8, 4, 2; the fourth is 8.'],
  x: [['هذا رتّب الزوجية تصاعدياً (2، 4، 8)، والمطلوب تنازلياً.', 'This puts the even numbers in increasing order (2, 4, 8), but they must decrease.'], ['هذا العدد الخامس.', 'That is the fifth number.'], ['هذا العدد الثالث، آخر الأعداد الفردية.', 'That is the third number, the last odd one.'], 0] },

{ id: '2f3', lv: 2, d: 'flex', s: 'diag', t: 'matrix',
  f: MWF.matrix([MWF.shp('circle', 'none'), MWF.shp('circle', 'half'), MWF.shp('circle', 'full'), MWF.shp('square', 'none'), MWF.shp('square', 'half'), MWF.shp('square', 'full'), MWF.shp('tri', 'none'), MWF.shp('tri', 'half'), null]),
  q: ['ما الشكل الذي يُكمل المصفوفة؟', 'Which figure completes the grid?'],
  o: [{ f: MWF.opt(MWF.shp('tri', 'none')), ar: 'مثلث فارغ', en: 'Empty triangle' }, { f: MWF.opt(MWF.shp('square', 'full')), ar: 'مربع مظلل', en: 'Shaded square' }, { f: MWF.opt(MWF.shp('tri', 'full')), ar: 'مثلث مظلل', en: 'Shaded triangle' }, { f: MWF.opt(MWF.shp('circle', 'full')), ar: 'دائرة مظللة', en: 'Shaded circle' }], a: 2,
  w: ['قاعدة الصف: الشكل نفسه (دائرة، مربع، مثلث). قاعدة العمود: التظليل (فارغ، نصف، كامل). الخانة الناقصة: مثلث مظلل كاملاً.', 'Row rule: the same shape (circle, square, triangle). Column rule: the shading (empty, half, full). The missing cell is a fully shaded triangle.'],
  x: [['الشكل صحيح لكن التظليل يخص العمود الأول.', 'Right shape, but the shading belongs to column 1.'], ['التظليل صحيح لكن المربع يخص الصف الثاني.', 'Right shading, but the square belongs to row 2.'], 0, ['التظليل صحيح لكن الدائرة تخص الصف الأول.', 'Right shading, but the circle belongs to row 1.']] },

{ id: '2f4', lv: 2, d: 'flex', s: 'diag', t: 'perspective',
  q: ['نظرتَ إلى ساعة حائط في المرآة، فبدت عقاربها تشير إلى الساعة 3:00 تماماً. كم الساعة الحقيقية؟', 'You look at a wall clock in a mirror and its hands seem to show exactly 3:00. What is the real time?'],
  o: [['3:00', '3:00'], ['6:00', '6:00'], ['9:00', '9:00'], ['12:00', '12:00']], a: 2,
  w: ['المرآة تعكس اليمين واليسار: عقرب الدقائق على 12 يبقى مكانه، وعقرب الساعات الظاهر على 3 يكون فعلياً على 9.', 'A mirror swaps left and right: the minute hand on 12 stays, and the hour hand that seems to be on 3 is really on 9.'],
  x: [['هذا ما يظهر في المرآة، لا الوقت الحقيقي.', 'That is what the mirror shows, not the real time.'], ['المرآة لا تقلب الأعلى والأسفل.', 'A mirror does not swap top and bottom.'], 0, ['عقرب الساعات ليس على 12.', 'The hour hand is not on 12.']] },

{ id: '2f5', lv: 2, d: 'flex', s: 'prac', t: 'classify',
  q: ['أيّ الأعداد مختلف عن البقية؟  16 ، 36 ، 64 ، 48', 'Which number is different?  16, 36, 64, 48'],
  o: [['16', '16'], ['36', '36'], ['64', '64'], ['48', '48']], a: 3,
  w: ['16 = 4×4 ، 36 = 6×6 ، 64 = 8×8 (مربعات كاملة)، أما 48 فليس ناتج ضرب عدد صحيح في نفسه.', '16 = 4×4, 36 = 6×6, 64 = 8×8 (perfect squares), but 48 is not a whole number times itself.'],
  x: [['16 مربع كامل (4×4).', '16 is a perfect square (4×4).'], ['36 مربع كامل (6×6).', '36 is a perfect square (6×6).'], ['64 مربع كامل (8×8).', '64 is a perfect square (8×8).'], 0] },

{ id: '2f6', lv: 2, d: 'flex', s: 'prac', t: 'codes',
  q: ['إذا كان:  2 ◇ 3 = 8  ،  5 ◇ 1 = 10  ، فما ناتج  4 ◇ 5 ؟  (العملية ◇ تتبع القاعدة نفسها دائماً)', 'If  2 ◇ 3 = 8  and  5 ◇ 1 = 10, what is  4 ◇ 5 ?  (◇ always follows the same rule.)'],
  o: [['25', '25'], ['24', '24'], ['20', '20'], ['22', '22']], a: 1,
  w: ['القاعدة: (العدد الأول × الثاني) + العدد الأول: 2×3+2 = 8 ، 5×1+5 = 10. إذن 4×5+4 = 24.', 'Rule: (first × second) + first: 2×3+2 = 8, 5×1+5 = 10. So 4×5+4 = 24.'],
  x: [['هذا (الأول × الثاني) + الثاني، وهي لا تعطي 8 في المثال الأول (2×3+3 = 9).', 'This is (first × second) + second, which gives 9, not 8, for the first example.'], 0,
      ['هذا حاصل الضرب فقط، ولا يعطي 8 في المثال الأول.', 'This is just the product, which gives 6, not 8, for the first example.'], ['لا تنتج عن قاعدة تتفق مع المثالين.', 'No rule that fits both examples gives this.']] },

{ id: '2f7', lv: 2, d: 'flex', s: 'prac', t: 'rules',
  q: ['في مسابقة يكسب المتسابق 3 نقاط عن كل إجابة صحيحة، ويخسر نقطة عن كل إجابة خاطئة. أجاب سلمان عن 10 أسئلة وحصل على 18 نقطة. كم إجابة صحيحة له؟', 'In a quiz, a contestant gains 3 points for each correct answer and loses 1 point for each wrong answer. Salman answered 10 questions and scored 18. How many did he get right?'],
  o: [['6', '6'], ['7', '7'], ['8', '8'], ['9', '9']], a: 1,
  w: ['نجرّب: 7 صحيحة = 21 نقطة، و3 خاطئة = −3، والمجموع 18 ✔.', 'Try it: 7 correct = 21 points, 3 wrong = −3, total 18 ✔.'],
  x: [['6 صحيحة = 18 − 4 = 14 نقطة.', '6 correct gives 18 − 4 = 14 points.'], 0, ['8 صحيحة = 24 − 2 = 22 نقطة.', '8 correct gives 24 − 2 = 22 points.'], ['9 صحيحة = 27 − 1 = 26 نقطة.', '9 correct gives 27 − 1 = 26 points.']] },

{ id: '2f8', lv: 2, d: 'flex', s: 'prac', t: 'perspective',
  q: ['بكم طريقة مختلفة يمكن ترتيب ثلاثة كتب مختلفة على رف واحد؟', 'In how many different ways can three different books be arranged on one shelf?'],
  o: [['3', '3'], ['6', '6'], ['9', '9'], ['8', '8']], a: 1,
  w: ['للمكان الأول 3 خيارات، ثم 2 للثاني، ثم 1 للثالث: 3 × 2 × 1 = 6 ترتيبات.', 'The first place has 3 choices, then 2, then 1: 3 × 2 × 1 = 6 arrangements.'],
  x: [['هذا عدد الكتب، لا عدد الترتيبات.', 'That is the number of books, not arrangements.'], 0, ['هذا 3 × 3، كأن الكتاب يمكن أن يتكرر.', 'This is 3 × 3, as if a book could be used twice.'], ['هذا 2 × 2 × 2، ولا يمثّل المسألة.', 'This is 2 × 2 × 2, which does not fit the problem.']] },

/* ===================================================================
   المستوى الثالث (الصف 3 المتوسط – الصف 1 الثانوي)
   =================================================================== */

/* ---------- الاستدلال اللغوي وفهم المقروء ---------- */
{ id: '3v1', lv: 3, d: 'verbal', s: 'diag', t: 'analogy',
  q: ['متشائم : أمل ، كما أن :', 'Pessimist : hope, as :'],
  o: [['كريم : عطاء', 'generous : giving'], ['طالب : علم', 'student : knowledge'], ['جبان : شجاعة', 'coward : courage'], ['مريض : طبيب', 'patient : doctor']], a: 2,
  w: ['العلاقة «صاحب الصفة يفتقد الشيء»: المتشائم يفتقد الأمل، والجبان يفتقد الشجاعة.', 'The relation is “the person lacks the quality”: a pessimist lacks hope, a coward lacks courage.'],
  x: [['الكريم يتصف بالعطاء لا يفتقده؛ العلاقة معكوسة.', 'A generous person has giving; the relation is reversed.'], ['الطالب يسعى إلى العلم؛ علاقة سعي لا افتقاد.', 'A student seeks knowledge: a relation of seeking, not lacking.'], 0,
      ['المريض يحتاج إلى الطبيب؛ علاقة حاجة إلى شخص آخر، لا صفة مفقودة.', 'A patient needs a doctor: a need for another person, not a missing quality.']] },

{ id: '3v2', lv: 3, d: 'verbal', s: 'diag', t: 'context',
  q: ['حدّد الكلمة غير المناسبة لسياق الجملة: «أدّى الإفراط في استخدام المضادات الحيوية إلى تراجع مقاومة البكتيريا لها، فصارت البكتيريا أكثر خطورة.»', 'Find the word that does not fit: “Overusing antibiotics has led to a decline in bacteria’s resistance to them, so the bacteria became more dangerous.”'],
  o: [['الإفراط', 'Overusing'], ['تراجع', 'decline'], ['المضادات', 'antibiotics'], ['خطورة', 'dangerous']], a: 1,
  w: ['لو تراجعت مقاومة البكتيريا لصارت أقل خطورة؛ والصواب «ازدياد» المقاومة، وهو ما يجعلها أخطر.', 'If bacteria’s resistance declined, they would become less dangerous; the right word is an “increase” in resistance, which makes them more dangerous.'],
  x: [['الإفراط هو السبب المنطقي للمشكلة.', 'Overuse is the logical cause of the problem.'], 0, ['الجملة كلها عن المضادات الحيوية.', 'The whole sentence is about antibiotics.'], ['ازدياد الخطورة نتيجة متسقة مع ازدياد المقاومة.', 'Greater danger is consistent with greater resistance.']] },

{ id: '3v3', lv: 3, d: 'verbal', s: 'diag', t: 'reading',
  p: ['يعتقد كثيرون أن الذكاء صفة ثابتة يولد بها الإنسان، غير أن دراسات في علم النفس التربوي تشير إلى أن الدماغ يتغير بالتعلم والممارسة، وأن الطلاب الذين يؤمنون بإمكانية تنمية قدراتهم يثابرون أكثر أمام الصعوبات. ولا يعني ذلك أن الجهد وحده كافٍ؛ بل لا بد معه من استراتيجيات صحيحة وتغذية راجعة مفيدة.',
      'Many people believe intelligence is a fixed trait we are born with, yet studies in educational psychology suggest that the brain changes with learning and practice, and that students who believe their abilities can grow persevere more in the face of difficulty. This does not mean effort alone is enough; it must come with sound strategies and useful feedback.'],
  q: ['أيّ العبارات أدقّ تلخيصاً لموقف الكاتب؟', 'Which statement best sums up the writer’s position?'],
  o: [['الذكاء ثابت ولا يتغير مهما تعلّم الإنسان', 'Intelligence is fixed and never changes, whatever one learns'], ['الجهد وحده يكفي لتنمية القدرات', 'Effort alone is enough to grow one’s abilities'], ['القدرات تنمو بالجهد المقترن بالاستراتيجيات والتغذية الراجعة', 'Abilities grow through effort combined with strategies and feedback'], ['الدراسات لم تصل إلى أي نتيجة حول الذكاء', 'Studies have reached no conclusion about intelligence']], a: 2,
  w: ['الكاتب يرى أن القدرات قابلة للنمو، ثم يقيّد ذلك صراحة: الجهد لا يكفي وحده بل يحتاج استراتيجيات وتغذية راجعة.', 'The writer argues abilities can grow, then adds a clear condition: effort is not enough on its own; it needs strategies and feedback.'],
  x: [['هذا الرأي الشائع الذي يعترض عليه الكاتب.', 'That is the common belief the writer argues against.'], ['الكاتب نفى ذلك صراحة: «لا يعني ذلك أن الجهد وحده كافٍ».', 'The writer explicitly rejects this: “This does not mean effort alone is enough.”'], 0,
      ['النص ينقل ما تشير إليه الدراسات، فلم تكن بلا نتيجة.', 'The text reports what the studies suggest, so they did reach findings.']] },

{ id: '3v4', lv: 3, d: 'verbal', s: 'diag', t: 'completion',
  q: ['اختر ما يناسب الفراغ: «لم يكن نجاح الفريق ........، بل جاء ثمرةً لتخطيط دقيق وعمل متواصل.»', 'Choose what fits the blank: “The team’s success was not ........; rather, it was the fruit of careful planning and continuous work.”'],
  o: [['نتيجةَ جهد', 'the result of effort'], ['وليدَ المصادفة', 'a matter of chance'], ['مستحقاً', 'deserved'], ['متوقعاً', 'expected']], a: 1,
  w: ['أداة الاستدراك «بل» تقتضي أن يكون ما قبلها نقيضاً لما بعدها: نفي المصادفة يقابله التخطيط والعمل.', 'The word “rather” requires the first part to contrast with the second: “not chance” is contrasted with planning and work.'],
  x: [['«لم يكن نتيجة جهد، بل ثمرة عمل» تناقض؛ فالجهد والعمل بمعنى واحد.', '“Not the result of effort, but the fruit of work” contradicts itself; effort and work mean the same.'], 0,
      ['التخطيط والعمل يجعلان النجاح مستحقاً، فنفي الاستحقاق يناقض آخر الجملة.', 'Planning and work make success deserved, so denying it contradicts the end of the sentence.'], ['التوقع لا يقابل التخطيط والعمل مقابلة واضحة.', '“Expected” does not form a clear contrast with planning and work.']] },

{ id: '3v5', lv: 3, d: 'verbal', s: 'prac', t: 'analogy',
  q: ['مؤلِّف : رواية ، كما أن ملحِّن : ؟', 'Author : novel, as composer : ?'],
  o: [['مغنٍّ', 'singer'], ['لحن', 'melody'], ['آلة', 'instrument'], ['جمهور', 'audience']], a: 1,
  w: ['العلاقة «المبدع : ما يبدعه»: المؤلف يبدع الرواية، والملحن يبدع اللحن.', 'The relation is “creator : what he creates”: an author creates a novel, a composer creates a melody.'],
  x: [['المغني يؤدي اللحن ولا يُبدعه الملحن.', 'A singer performs a melody; the composer does not create the singer.'], 0, ['الآلة أداة للعزف، لا عمل يبدعه الملحن.', 'An instrument is a tool for playing, not a work the composer creates.'], ['الجمهور يستمع، وليس عملاً إبداعياً.', 'The audience listens; it is not a creative work.']] },

{ id: '3v6', lv: 3, d: 'verbal', s: 'prac', t: 'odd',
  q: ['أيّ زوج تختلف العلاقة فيه عن بقية الأزواج؟', 'In which pair is the relation different from the others?'],
  o: [['ساعة / دقيقة', 'hour / minute'], ['كيلومتر / متر', 'kilometre / metre'], ['لتر / مليلتر', 'litre / millilitre'], ['حرارة / مقياس الحرارة', 'temperature / thermometer']], a: 3,
  w: ['في الأزواج الثلاثة الأولى العلاقة «وحدة قياس : وحدة أصغر منها»، أما الأخير فـ«كمية : أداة قياسها».', 'In the first three pairs the relation is “unit : smaller unit”; the last is “quantity : the tool that measures it”.'],
  x: [['الساعة وحدة زمن والدقيقة جزء منها.', 'An hour is a unit of time and a minute is part of it.'], ['الكيلومتر وحدة طول والمتر جزء منه.', 'A kilometre is a unit of length and a metre is part of it.'], ['اللتر وحدة حجم والمليلتر جزء منه.', 'A litre is a unit of volume and a millilitre is part of it.'], 0] },

{ id: '3v7', lv: 3, d: 'verbal', s: 'prac', t: 'reading',
  p: ['تتميز نباتات صحراوية كثيرة بأوراق صغيرة جداً أو متحوّرة إلى أشواك، وجذور إما تمتد عميقاً في التربة أو تنتشر أفقياً قرب السطح، كما يفتح بعضها ثغوره ليلاً بدلاً من النهار.',
      'Many desert plants have very small leaves or leaves changed into spines, and roots that either reach deep into the soil or spread out sideways near the surface. Some also open their stomata at night instead of during the day.'],
  q: ['ما الهدف المشترك بين هذه الصفات؟', 'What is the common purpose of these features?'],
  o: [['زيادة امتصاص ضوء الشمس', 'To absorb more sunlight'], ['تقليل فقد الماء والحصول على أكبر قدر منه', 'To lose less water and collect as much as possible'], ['جذب الحيوانات للتلقيح', 'To attract animals for pollination'], ['مقاومة البرد الشديد', 'To resist extreme cold']], a: 1,
  w: ['الأوراق الصغيرة وفتح الثغور ليلاً (حين يكون الجو أبرد) يقللان التبخر، والجذور العميقة أو المنتشرة تجمع أكبر قدر من الماء النادر.', 'Small leaves and opening stomata at night (when it is cooler) reduce evaporation, and deep or wide roots collect as much scarce water as possible.'],
  x: [['الأوراق الصغيرة تقلل سطح امتصاص الضوء، فهي لا تهدف إلى زيادته.', 'Small leaves reduce the surface that absorbs light, so that is not the aim.'], 0, ['لم يتحدث النص عن الأزهار أو التلقيح.', 'The text says nothing about flowers or pollination.'], ['الصفات المذكورة مرتبطة بالجفاف لا بالبرد.', 'The features described relate to dryness, not cold.']] },

{ id: '3v8', lv: 3, d: 'verbal', s: 'prac', t: 'context',
  q: ['حدّد الكلمة غير المناسبة: «كان العالِم متواضعاً؛ فما إن يُمدح حتى يتباهى بإنجازاته أمام الجميع.»', 'Find the word that does not fit: “The scientist was humble; whenever he was praised, he would boast about his achievements to everyone.”'],
  o: [['متواضعاً', 'humble'], ['يُمدح', 'praised'], ['يتباهى', 'boast'], ['الجميع', 'everyone']], a: 2,
  w: ['التباهي يناقض التواضع؛ والمناسب أن «ينسب الفضل إلى فريقه» مثلاً. (الجملة تبدأ بذكر صفته ثم تشرحها، فالخطأ في الشرح.)', 'Boasting contradicts humility; a fitting phrase would be “give credit to his team”. (The sentence first states his quality and then explains it, so the error is in the explanation.)'],
  x: [['«متواضعاً» هي الصفة التي تُبنى عليها الجملة، والكلمة التي تشرحها هي التي تخالفها.', '“Humble” is the quality the sentence is built on; the word explaining it is the one that clashes.'], ['المدح موقف عادي يُختبر فيه التواضع.', 'Praise is a normal situation that tests humility.'], 0, ['«الجميع» لا تتعارض مع المعنى.', '“Everyone” does not conflict with the meaning.']] },

/* ---------- الاستدلال الرياضي والمكاني ---------- */
{ id: '3m1', lv: 3, d: 'math', s: 'diag', t: 'word',
  q: ['اشترت مدرسة 30 تذكرة لرحلة؛ تذكرة الطالب بـ 15 ريالاً وتذكرة المعلم بـ 40 ريالاً، ودفعت 575 ريالاً. كم معلماً في الرحلة؟', 'A school bought 30 trip tickets: 15 riyals per student and 40 riyals per teacher, paying 575 riyals in total. How many teachers went on the trip?'],
  o: [['25', '25'], ['5', '5'], ['7', '7'], ['10', '10']], a: 1,
  w: ['لو كانت التذاكر كلها للطلاب: 30 × 15 = 450. الفرق 575 − 450 = 125، وكل معلم يزيد 40 − 15 = 25، فعدد المعلمين 125 ÷ 25 = 5. (تحقق: 25×15 + 5×40 = 375 + 200 = 575.)', 'If all tickets were for students: 30 × 15 = 450. The extra is 575 − 450 = 125, and each teacher adds 40 − 15 = 25, so 125 ÷ 25 = 5 teachers. (Check: 25×15 + 5×40 = 375 + 200 = 575.)'],
  x: [['هذا عدد الطلاب، لا المعلمين.', 'That is the number of students, not teachers.'], 0, ['7 معلمين: 23×15 + 7×40 = 345 + 280 = 625، لا 575.', '7 teachers: 23×15 + 7×40 = 345 + 280 = 625, not 575.'], ['10 معلمين: 20×15 + 10×40 = 700، لا 575.', '10 teachers: 20×15 + 10×40 = 700, not 575.']] },

{ id: '3m2', lv: 3, d: 'math', s: 'diag', t: 'arith',
  q: ['كيس فيه 4 كرات حمراء و6 كرات زرقاء. سُحبت كرتان واحدة بعد الأخرى دون إرجاع. ما احتمال أن تكون الكرتان حمراوين؟', 'A bag holds 4 red and 6 blue balls. Two balls are drawn one after the other without replacement. What is the probability that both are red?'],
  o: [['4/25', '4/25'], ['2/15', '2/15'], ['1/5', '1/5'], ['2/5', '2/5']], a: 1,
  w: ['الأولى حمراء: 4/10، ثم يبقى 3 حمراء من 9: 3/9. الاحتمال = 4/10 × 3/9 = 12/90 = 2/15.', 'First red: 4/10; then 3 red remain out of 9: 3/9. Probability = 4/10 × 3/9 = 12/90 = 2/15.'],
  x: [['هذا الاحتمال مع الإرجاع (4/10 × 4/10)، والسحب دون إرجاع.', 'That is with replacement (4/10 × 4/10); the draw is without replacement.'], 0, ['لا ينتج عن حساب صحيح: 1/5 = 18/90 أكبر من الصواب.', 'Not from a correct calculation: 1/5 = 18/90, more than the right answer.'],
      ['هذا احتمال أن تكون الكرة الأولى وحدها حمراء.', 'That is only the chance that the first ball is red.']] },

{ id: '3m3', lv: 3, d: 'math', s: 'diag', t: 'spatial',
  f: MWF.cube3(),
  q: ['مكعب كبير مكوّن من 27 مكعباً صغيراً (3 × 3 × 3) طُليت أوجهه الخارجية كلها. كم مكعباً صغيراً طُلي له وجهان فقط؟', 'A large cube made of 27 small cubes (3 × 3 × 3) has all its outer faces painted. How many small cubes have exactly two painted faces?'],
  o: [['8', '8'], ['6', '6'], ['12', '12'], ['24', '24']], a: 2,
  w: ['المكعبات ذات الوجهين تقع على الأحرف دون الأركان. للمكعب 12 حرفاً، وفي كل حرف مكعب واحد بين الركنين: 12 × 1 = 12.', 'Two-face cubes sit on the edges but not the corners. A cube has 12 edges, each with one small cube between its corners: 12 × 1 = 12.'],
  x: [['هذه مكعبات الأركان، ولكل منها 3 أوجه مطلية.', 'These are the corner cubes, each with 3 painted faces.'], ['هذه مكعبات منتصف الأوجه، ولكل منها وجه واحد مطلي.', 'These are the face-centre cubes, each with 1 painted face.'], 0,
      ['هذا يعدّ مكعبين في كل حرف، وفي الحرف (3 مكعبات) مكعب أوسط واحد فقط.', 'This counts two per edge, but each edge (3 cubes) has only one middle cube.']] },

{ id: '3m4', lv: 3, d: 'math', s: 'diag', t: 'sequence',
  q: ['ما العدد التالي؟  2 ، 3 ، 5 ، 9 ، 17 ، ؟', 'What comes next?  2, 3, 5, 9, 17, ?'],
  o: [['25', '25'], ['33', '33'], ['34', '34'], ['31', '31']], a: 1,
  w: ['الفروق 1، 2، 4، 8 تتضاعف، فالفرق التالي 16: 17 + 16 = 33. (أو: كل عدد = ضعف السابق − 1.)', 'The differences 1, 2, 4, 8 double, so the next is 16: 17 + 16 = 33. (Or: each term = twice the previous − 1.)'],
  x: [['هذا إضافة 8 مرة أخرى، لكن الفروق تتضاعف.', 'This adds 8 again, but the differences double.'], 0, ['هذا مضاعفة 17 دون طرح 1.', 'This doubles 17 without subtracting 1.'], ['هذا إضافة 14، ولا يتفق مع النمط.', 'This adds 14, which does not fit the pattern.']] },

{ id: '3m5', lv: 3, d: 'math', s: 'prac', t: 'arith',
  q: ['ارتفع سعر سلعة 20%، ثم انخفض السعر الجديد 20%. كيف أصبح السعر مقارنة بالسعر الأصلي؟', 'A price rises by 20%, then the new price falls by 20%. How does the final price compare with the original?'],
  o: [['هو نفسه', 'The same'], ['أقل بـ 4%', '4% lower'], ['أعلى بـ 4%', '4% higher'], ['أقل بـ 20%', '20% lower']], a: 1,
  w: ['لو كان السعر 100: يرتفع إلى 120، ثم ينخفض 20% من 120 أي 24، فيصبح 96؛ أي أقل بـ 4%.', 'If the price is 100: it rises to 120, then falls by 20% of 120 = 24, giving 96: 4% lower.'],
  x: [['الانخفاض محسوب من سعر أكبر (120)، فهو أكبر من الارتفاع.', 'The fall is taken from a bigger price (120), so it is larger than the rise.'], 0, ['السعر النهائي 96 وهو أقل من 100.', 'The final price is 96, which is lower than 100.'], ['هذا يتجاهل الارتفاع الأول.', 'This ignores the first rise.']] },

{ id: '3m6', lv: 3, d: 'math', s: 'prac', t: 'geometry',
  q: ['مثلث قائم الزاوية طولا ضلعي القائمة فيه 9 سم و12 سم. ما محيطه؟', 'A right triangle has legs of 9 cm and 12 cm. What is its perimeter?'],
  o: [['21 سم', '21 cm'], ['36 سم', '36 cm'], ['54 سم', '54 cm'], ['45 سم', '45 cm']], a: 1,
  w: ['الوتر = √(9² + 12²) = √(81 + 144) = √225 = 15، والمحيط = 9 + 12 + 15 = 36 سم.', 'Hypotenuse = √(9² + 12²) = √(81 + 144) = √225 = 15, so the perimeter = 9 + 12 + 15 = 36 cm.'],
  x: [['هذا مجموع الضلعين فقط، ونُسي الوتر.', 'This adds only the two legs and forgets the hypotenuse.'], 0, ['هذه المساحة (9 × 12 ÷ 2)، لا المحيط.', 'That is the area (9 × 12 ÷ 2), not the perimeter.'], ['هذا يفترض أن الوتر 24، والوتر أقصر من مجموع الضلعين الآخرين.', 'This assumes a hypotenuse of 24, but it must be shorter than the other two sides together.']] },

{ id: '3m7', lv: 3, d: 'math', s: 'prac', t: 'spatial',
  q: ['ما قياس الزاوية الصغرى بين عقربي الساعة عند الساعة 3:30؟', 'What is the smaller angle between the clock hands at 3:30?'],
  o: [['90°', '90°'], ['75°', '75°'], ['60°', '60°'], ['105°', '105°']], a: 1,
  w: ['عقرب الدقائق عند 6 (180°). عقرب الساعات يتحرك 30° كل ساعة، فعند 3:30 يكون عند 3.5 × 30 = 105°. الفرق 180 − 105 = 75°.', 'The minute hand is on 6 (180°). The hour hand moves 30° per hour, so at 3:30 it is at 3.5 × 30 = 105°. The angle is 180 − 105 = 75°.'],
  x: [['هذا يفترض أن عقرب الساعات ما زال على 3 تماماً.', 'This assumes the hour hand is still exactly on 3.'], 0, ['لا يتفق مع موضعي العقربين.', 'This does not match the hands’ positions.'], ['هذا موضع عقرب الساعات من الرقم 12، لا الزاوية بين العقربين.', 'That is the hour hand’s angle from 12, not the angle between the hands.']] },

{ id: '3m8', lv: 3, d: 'math', s: 'prac', t: 'logic',
  q: { ar: 'يجلس أربعة أصدقاء (أ، ب، ج، د) في صف من 4 مقاعد مرقّمة من اليسار. (ج) في المقعد الأخير على اليمين، و(د) ليس بجانب (ج)، و(أ) لا يجلس في أيّ طرف، و(ب) بجانب (د). من يجلس حتماً في المقعد الثالث؟',
       en: 'Four friends (A, B, C, D) sit in a row of 4 seats numbered from the left. C is in the last seat on the right, D is not next to C, A is not at either end, and B is next to D. Who must be in seat 3?' },
  o: [['أ', 'A'], ['ب', 'B'], ['د', 'D'], ['لا يمكن التحديد', 'It cannot be determined']], a: 0,
  w: ['ج في المقعد 4، و(د) ليس بجانبه فهو في 1 أو 2. (أ) ليس في طرف فهو في 2 أو 3. الحالتان الممكنتان: د ب أ ج ، أو ب د أ ج. في الحالتين (أ) في المقعد 3.', 'C is in seat 4, so D (not next to C) is in seat 1 or 2. A (not at an end) is in seat 2 or 3. The two possible orders are D B A C and B D A C; in both, A is in seat 3.'],
  x: [0, ['(ب) في المقعد 1 أو 2 حسب موضع (د).', 'B is in seat 1 or 2 depending on D.'], ['(د) لا يمكن أن يكون في المقعد 3 لأنه سيجاور (ج).', 'D cannot be in seat 3 because he would be next to C.'], ['رغم وجود ترتيبين ممكنين، فإن المقعد 3 هو نفسه فيهما.', 'Although two orders are possible, seat 3 is the same in both.']] },

/* ---------- الاستدلال العلمي والميكانيكي ---------- */
{ id: '3s1', lv: 3, d: 'science', s: 'diag', t: 'mech',
  f: MWF.pulley('200'),
  q: ['يُرفع حمل وزنه 200 نيوتن باستخدام بكرة متحركة كما في الشكل (أحد طرفي الحبل مثبت في السقف). بإهمال الاحتكاك ووزن البكرة، ما القوة F اللازمة لرفع الحمل ببطء؟', 'A 200 N load is lifted with a movable pulley as shown (one end of the rope is fixed to the ceiling). Ignoring friction and the pulley’s weight, what force F is needed to lift the load slowly?'],
  o: [['200 نيوتن', '200 N'], ['100 نيوتن', '100 N'], ['50 نيوتن', '50 N'], ['400 نيوتن', '400 N']], a: 1,
  w: ['الحمل معلّق بجزأين من الحبل يتقاسمان وزنه، فكل جزء يحمل 200 ÷ 2 = 100 نيوتن، وهي القوة F. (المقابل: تسحب الحبل مسافة ضعف ارتفاع الحمل.)', 'The load hangs on two rope sections that share its weight, so each carries 200 ÷ 2 = 100 N, which is F. (The trade-off: you pull twice as much rope as the load rises.)'],
  x: [['هذا صحيح للبكرة الثابتة، أما المتحركة فتوزع الوزن على جزأين.', 'That is true for a fixed pulley; a movable pulley shares the load between two sections.'], 0, ['هذا يفترض أربعة أجزاء من الحبل، وفي الشكل جزآن فقط.', 'This assumes four rope sections; the figure has only two.'], ['البكرة تقلّل القوة ولا تضاعفها.', 'The pulley reduces the force; it does not double it.']] },

{ id: '3s2', lv: 3, d: 'science', s: 'diag', t: 'data',
  f: MWF.heat(),
  q: ['يمثّل الشكل تسخين قطعة جليد بمعدل ثابت (المحور الأفقي: الزمن، والرأسي: درجة الحرارة). ماذا يحدث في الجزء الأفقي رقم 1؟', 'The graph shows a piece of ice heated at a steady rate (horizontal axis: time, vertical axis: temperature). What happens during flat part 1?'],
  o: [['يتوقف مصدر الحرارة عن التسخين', 'The heater stops heating'], ['ينصهر الجليد، وتُستهلك الحرارة في تغيير الحالة', 'The ice melts; the heat is used to change state'], ['يبرد الماء', 'The water cools down'], ['يتبخر الماء كله', 'All the water evaporates']], a: 1,
  w: ['عند 0°C تبقى الحرارة ثابتة رغم استمرار التسخين، لأن الطاقة تُستخدم في تحويل الجليد إلى ماء (الانصهار) لا في رفع الحرارة.', 'At 0°C the temperature stays constant even though heating continues, because the energy is used to turn ice into water (melting), not to raise the temperature.'],
  x: [['التسخين بمعدل ثابت طوال التجربة كما يذكر السؤال.', 'The question says heating is steady throughout.'], 0, ['الحرارة لم تنخفض؛ الخط أفقي لا هابط.', 'The temperature did not fall; the line is flat, not going down.'],
      ['التبخر عند 100°C في الجزء الأفقي رقم 2.', 'Boiling happens at 100°C, in flat part 2.']] },

{ id: '3s3', lv: 3, d: 'science', s: 'diag', t: 'concept',
  q: ['عندما يبدأ المصعد الصعود متسارعاً، يشعر الراكب بأنه أثقل. ما التفسير؟', 'When a lift starts to accelerate upwards, the rider feels heavier. Why?'],
  o: [['تزداد كتلة الراكب', 'The rider’s mass increases'], ['أرضية المصعد تدفع الراكب بقوة أكبر من وزنه لتسرّعه للأعلى', 'The floor pushes the rider with more force than his weight to accelerate him upwards'], ['تزداد الجاذبية كلما ارتفعنا', 'Gravity increases as we go higher'], ['يضغط الهواء داخل المصعد على الراكب', 'The air inside the lift presses on the rider']], a: 1,
  w: ['لكي يتسارع الراكب للأعلى يجب أن تكون القوة المحصلة عليه للأعلى، فتدفعه الأرضية بقوة أكبر من وزنه، وهذه القوة هي ما «يشعر» به ثِقَلاً.', 'To accelerate the rider upwards the net force must point up, so the floor pushes him with more than his weight; that push is what he feels as heaviness.'],
  x: [['الكتلة لا تتغير بالحركة في الحياة اليومية.', 'Mass does not change with motion in everyday life.'], 0, ['الجاذبية تقل قليلاً جداً مع الارتفاع، ولا تزيد.', 'Gravity gets very slightly weaker with height, not stronger.'], ['ضغط الهواء داخل المصعد لا يتغير بشكل يُذكر.', 'Air pressure in the lift hardly changes.']] },

{ id: '3s4', lv: 3, d: 'science', s: 'diag', t: 'data',
  q: ['أراد طالب أن يعرف أثر كمية السماد في طول نبات. أيّ تجربة هي الأصلح؟', 'A student wants to find out how the amount of fertiliser affects a plant’s height. Which experiment is best?'],
  o: [['زراعة أنواع مختلفة من النباتات وإعطاء كل نوع كمية مختلفة من السماد', 'Grow different kinds of plants and give each a different amount of fertiliser'], ['زراعة نباتات من النوع نفسه في ظروف متماثلة، مع تغيير كمية السماد فقط', 'Grow plants of the same kind in identical conditions, changing only the amount of fertiliser'], ['زيادة السماد والماء معاً لنبات واحد', 'Increase both fertiliser and water for one plant'], ['مقارنة نباتات الحديقة بنباتات السوق', 'Compare garden plants with plants from the market']], a: 1,
  w: ['التجربة العادلة تغيّر متغيراً واحداً (السماد) وتثبّت كل ما سواه (نوع النبات، الماء، الضوء)، مع تكرار العيّنات.', 'A fair test changes one variable (fertiliser) and keeps everything else the same (plant type, water, light), with several plants for each amount.'],
  x: [['تغيير النوع والسماد معاً يجعلنا لا نعرف سبب اختلاف الطول.', 'Changing both type and fertiliser means we cannot tell what caused the difference.'], 0, ['تغيير متغيرين معاً لا يكشف أثر السماد وحده، ونبات واحد لا يكفي للمقارنة.', 'Changing two variables hides the effect of fertiliser alone, and one plant gives nothing to compare.'],
      ['النباتان يختلفان في أشياء كثيرة غير السماد.', 'The two groups differ in many things besides fertiliser.']] },

{ id: '3s5', lv: 3, d: 'science', s: 'prac', t: 'mech',
  q: ['ترس A له 40 سنّاً متعاشق مع ترس B له 10 أسنان. إذا دار A دورة كاملة واحدة، كم دورة يدور B؟', 'Gear A has 40 teeth and meshes with gear B, which has 10 teeth. If A turns one full turn, how many turns does B make?'],
  o: [['1/4 دورة', '1/4 turn'], ['4 دورات', '4 turns'], ['10 دورات', '10 turns'], ['40 دورة', '40 turns']], a: 1,
  w: ['دورة A تمرّر 40 سنّاً عند نقطة التعاشق، وB يحتاج 10 أسنان لكل دورة: 40 ÷ 10 = 4 دورات. (الترس الأصغر أسرع.)', 'One turn of A passes 40 teeth at the contact point; B needs 10 teeth per turn: 40 ÷ 10 = 4 turns. (The smaller gear is faster.)'],
  x: [['هذا عكس النسبة؛ الترس الأصغر يدور أكثر لا أقل.', 'This inverts the ratio; the smaller gear turns more, not less.'], 0, ['هذا عدد أسنان B.', 'That is B’s number of teeth.'], ['هذا عدد أسنان A.', 'That is A’s number of teeth.']] },

{ id: '3s6', lv: 3, d: 'science', s: 'prac', t: 'concept',
  q: ['عند إسقاط قرص فوّار في الماء تخرج فقاعات كثيرة. أيّ ملاحظة تُعدّ أقوى دليل على حدوث تفاعل كيميائي؟', 'When an effervescent tablet is dropped into water, many bubbles appear. Which observation is the strongest evidence of a chemical reaction?'],
  o: [['اختفاء القرص عن النظر', 'The tablet disappears from view'], ['تكوّن غاز جديد لم يكن موجوداً من قبل', 'A new gas forms that was not there before'], ['ارتفاع مستوى الماء قليلاً', 'The water level rises slightly'], ['تغيّر شكل القرص', 'The tablet changes shape']], a: 1,
  w: ['تكوّن مادة جديدة (هنا غاز ثاني أكسيد الكربون) علامة على التغير الكيميائي.', 'A new substance forming (here carbon dioxide gas) is a sign of a chemical change.'],
  x: [['الاختفاء قد يكون مجرد ذوبان، وهو تغير فيزيائي.', 'Disappearing could be just dissolving, a physical change.'], 0, ['ارتفاع مستوى الماء يحدث عند إضافة أي جسم صلب.', 'Adding any solid raises the water level.'], ['تغيّر الشكل تغير فيزيائي.', 'A change of shape is a physical change.']] },

{ id: '3s7', lv: 3, d: 'science', s: 'prac', t: 'data',
  q: ['مكعب كتلته 54 غ وحجمه 20 سم³، وكثافة الماء 1 غ/سم³. ماذا يحدث له عند وضعه في الماء؟', 'A cube has a mass of 54 g and a volume of 20 cm³; water’s density is 1 g/cm³. What happens when it is placed in water?'],
  o: [['يطفو لأن كثافته 0.37 غ/سم³', 'It floats because its density is 0.37 g/cm³'], ['يغوص لأن كثافته 2.7 غ/سم³', 'It sinks because its density is 2.7 g/cm³'], ['يطفو لأن كتلته صغيرة', 'It floats because its mass is small'], ['يبقى معلّقاً في منتصف الماء', 'It hangs in the middle of the water']], a: 1,
  w: ['الكثافة = الكتلة ÷ الحجم = 54 ÷ 20 = 2.7 غ/سم³، وهي أكبر من كثافة الماء فيغوص.', 'Density = mass ÷ volume = 54 ÷ 20 = 2.7 g/cm³, which is greater than water’s, so it sinks.'],
  x: [['هذا قسمة الحجم على الكتلة (20 ÷ 54)، وهي مقلوبة.', 'This divides volume by mass (20 ÷ 54), which is upside down.'], 0, ['الطفو يحدده الكثافة لا الكتلة وحدها.', 'Floating depends on density, not mass alone.'], ['يبقى الجسم معلّقاً إذا ساوت كثافته كثافة الماء، و2.7 ≠ 1.', 'An object hangs in the water only if its density equals water’s; 2.7 ≠ 1.']] },

{ id: '3s8', lv: 3, d: 'science', s: 'prac', t: 'concept',
  q: ['تُركت كرة تسقط من ارتفاع. بإهمال مقاومة الهواء، أيّ العبارات صحيحة أثناء السقوط؟', 'A ball is dropped from a height. Ignoring air resistance, which statement is true while it falls?'],
  o: [['تزداد طاقة الوضع وطاقة الحركة معاً', 'Both potential and kinetic energy increase'], ['تتحول طاقة الوضع إلى طاقة حركة، ويبقى مجموعهما ثابتاً', 'Potential energy turns into kinetic energy, and their total stays constant'], ['تفنى طاقة الوضع دون أن تتحول', 'Potential energy disappears without changing into anything'], ['تبقى سرعة الكرة ثابتة', 'The ball’s speed stays constant']], a: 1,
  w: ['كلما نزلت الكرة قلّت طاقة الوضع وزادت طاقة الحركة بالمقدار نفسه، فالطاقة الميكانيكية الكلية محفوظة.', 'As the ball falls, potential energy drops and kinetic energy rises by the same amount, so total mechanical energy is conserved.'],
  x: [['طاقة الوضع تقل مع نقص الارتفاع.', 'Potential energy falls as height falls.'], 0, ['الطاقة لا تفنى، بل تتحول من شكل إلى آخر.', 'Energy is not destroyed; it changes form.'], ['الكرة تتسارع بفعل الجاذبية، فتزداد سرعتها.', 'Gravity accelerates the ball, so its speed increases.']] },

/* ---------- المرونة العقلية ---------- */
{ id: '3f1', lv: 3, d: 'flex', s: 'diag', t: 'rules',
  q: ['قاعدة واحدة تحوّل كل زوج إلى عدد:  (2 ، 5) ← 8  ،  (3 ، 4) ← 9  ،  (5 ، 1) ← 0. ما ناتج (4 ، 6)؟', 'One rule turns each pair into a number:  (2, 5) → 8,  (3, 4) → 9,  (5, 1) → 0. What does (4, 6) give?'],
  o: [['24', '24'], ['20', '20'], ['18', '18'], ['10', '10']], a: 1,
  w: ['القاعدة: (الأول × الثاني) − الأول: 2×5−2 = 8 ، 3×4−3 = 9 ، 5×1−5 = 0. إذن 4×6−4 = 20.', 'Rule: (first × second) − first: 2×5−2 = 8, 3×4−3 = 9, 5×1−5 = 0. So 4×6−4 = 20.'],
  x: [['هذا حاصل الضرب دون طرح العدد الأول.', 'This is the product without subtracting the first number.'], 0, ['هذا (الأول × الثاني) − الثاني، ولا يعطي 8 في المثال الأول (2×5−5 = 5).', 'This is (first × second) − second, which gives 5, not 8, in the first example.'], ['هذا المجموع، ولا يتفق مع أي مثال.', 'This is the sum, which fits none of the examples.']] },

{ id: '3f2', lv: 3, d: 'flex', s: 'diag', t: 'codes',
  q: ['في لغة رمزية: «كا مي» تعني «قمر مضيء»، و«مي لو» تعني «نجم مضيء»، و«لو زي» تعني «نجم بعيد». ما معنى «زي»؟', 'In a code language, “ka mi” means “bright moon”, “mi lo” means “bright star”, and “lo zi” means “distant star”. What does “zi” mean?'],
  o: [['نجم', 'star'], ['مضيء', 'bright'], ['بعيد', 'distant'], ['قمر', 'moon']], a: 2,
  w: ['«مي» مشتركة بين العبارتين الأوليين و«مضيء» مشتركة بين معنييهما، فـ«مي» = مضيء، و«لو» = نجم. وفي «لو زي» = «نجم بعيد» تكون «زي» = بعيد.', '“mi” appears in the first two phrases and so does “bright”, so mi = bright and lo = star. Then in “lo zi” = “distant star”, zi = distant.'],
  x: [['«نجم» هي «لو» لأنها مشتركة بين العبارتين الثانية والثالثة.', '“Star” is “lo”, shared by the second and third phrases.'], ['«مضيء» هي «مي».', '“Bright” is “mi”.'], 0, ['«قمر» هي «كا».', '“Moon” is “ka”.']] },

{ id: '3f3', lv: 3, d: 'flex', s: 'diag', t: 'matrix',
  f: MWF.matrix([MWF.arr(0), MWF.arr(45), MWF.arr(90), MWF.arr(90), MWF.arr(135), MWF.arr(180), MWF.arr(180), MWF.arr(225), null]),
  q: ['ما الشكل الذي يُكمل المصفوفة؟', 'Which figure completes the grid?'],
  o: [{ f: MWF.opt(MWF.arr(180)), ar: 'سهم للأسفل', en: 'Arrow pointing down' }, { f: MWF.opt(MWF.arr(270)), ar: 'سهم لليسار', en: 'Arrow pointing left' }, { f: MWF.opt(MWF.arr(315)), ar: 'سهم مائل لأعلى اليسار', en: 'Arrow pointing up-left' }, { f: MWF.opt(MWF.arr(90)), ar: 'سهم لليمين', en: 'Arrow pointing right' }], a: 1,
  w: ['في كل صف يدور السهم ثُمن دورة (45°) مع عقارب الساعة من خانة إلى التالية، وكل صف يبدأ متقدماً ربع دورة (90°) عن الصف السابق. الصف الثالث: أسفل ← أسفل يسار ← يسار.', 'Along each row the arrow turns an eighth of a turn (45°) clockwise per cell, and each row starts a quarter turn (90°) ahead of the one above. Row 3: down → down-left → left.'],
  x: [['هذا تكرار لأول الصف دون دوران.', 'This repeats the start of the row without turning.'], 0, ['هذا دوران 90° بدل 45° من الخانة السابقة.', 'This turns 90° instead of 45° from the previous cell.'], ['هذا الاتجاه يخص نهاية الصف الأول وبداية الثاني.', 'This direction belongs to the end of row 1 and the start of row 2.']] },

{ id: '3f4', lv: 3, d: 'flex', s: 'diag', t: 'perspective',
  q: ['باستخدام الأعداد 2 و3 و4، كلٍّ منها مرة واحدة، مع أيّ عمليتين من (+ − × ÷) والأقواس، أيّ الأعداد التالية لا يمكن الحصول عليه؟', 'Using 2, 3 and 4 once each, with any two of (+ − × ÷) and brackets, which of these numbers can NOT be made?'],
  o: [['14', '14'], ['18', '18'], ['20', '20'], ['13', '13']], a: 3,
  w: ['14 = 3×4+2 ، 18 = (2+4)×3 ، 20 = (2+3)×4. أما 13 فلا يتحقق بأي ترتيب؛ وطريقة التحقق: جرّب كل زوج مع العدد الباقي بالعمليات الأربع.', '14 = 3×4+2, 18 = (2+4)×3, 20 = (2+3)×4. 13 cannot be made in any arrangement; to check, combine each pair and then the remaining number with all four operations.'],
  x: [['يمكن: 3 × 4 + 2 = 14.', 'Possible: 3 × 4 + 2 = 14.'], ['يمكن: (2 + 4) × 3 = 18.', 'Possible: (2 + 4) × 3 = 18.'], ['يمكن: (2 + 3) × 4 = 20.', 'Possible: (2 + 3) × 4 = 20.'], 0] },

{ id: '3f5', lv: 3, d: 'flex', s: 'prac', t: 'classify',
  q: ['الأعداد: 12 ، 15 ، 18 ، 21. إذا صُنّفت حسب قابلية القسمة على 6، فأيها يكون في مجموعة 12؟', 'The numbers are 12, 15, 18, 21. If they are sorted by whether they divide by 6, which one goes in the same group as 12?'],
  o: [['15', '15'], ['18', '18'], ['21', '21'], ['كلها', 'All of them']], a: 1,
  w: ['12 و18 يقبلان القسمة على 6، أما 15 و21 فلا (كلها تقبل القسمة على 3، لكن المعيار المطلوب هو 6).', '12 and 18 divide by 6; 15 and 21 do not. (All four divide by 3, but the rule asked for is 6.)'],
  x: [['15 ÷ 6 = 2.5، فلا يقبل القسمة.', '15 ÷ 6 = 2.5, so it does not divide.'], 0, ['21 ÷ 6 = 3.5، فلا يقبل القسمة.', '21 ÷ 6 = 3.5, so it does not divide.'], ['كلها تقبل القسمة على 3 لا على 6؛ انتبه للمعيار المطلوب.', 'They all divide by 3, not by 6; watch which rule is asked for.']] },

{ id: '3f6', lv: 3, d: 'flex', s: 'prac', t: 'codes',
  q: ['كل رقم يرمز إلى لون، وترتيب الأرقام لا يهم: «5 7 3» تعني (أحمر، أخضر، أزرق)، و«7 3 1» تعني (أخضر، أزرق، أصفر). ما الرقم الذي يرمز إلى الأصفر؟', 'Each digit stands for a colour, and the order does not matter: “5 7 3” means (red, green, blue) and “7 3 1” means (green, blue, yellow). Which digit stands for yellow?'],
  o: [['3', '3'], ['5', '5'], ['7', '7'], ['1', '1']], a: 3,
  w: ['الرقمان المشتركان (7 و3) يقابلان اللونين المشتركين (أخضر وأزرق)، فيبقى في المجموعة الثانية 1 مقابل الأصفر.', 'The shared digits (7 and 3) match the shared colours (green and blue), so in the second group 1 is left for yellow.'],
  x: [['3 من الرقمين المشتركين، فهو أخضر أو أزرق.', '3 is one of the shared digits, so it is green or blue.'], ['5 هو الأحمر لأنه لا يظهر إلا في المجموعة الأولى.', '5 is red; it appears only in the first group.'], ['7 من الرقمين المشتركين، فهو أخضر أو أزرق.', '7 is one of the shared digits, so it is green or blue.'], 0] },

{ id: '3f7', lv: 3, d: 'flex', s: 'prac', t: 'perspective',
  q: ['عند النظر إلى مكعب من أي نقطة خارجه، ما أقل عدد ممكن من الأوجه المخفية عنك؟', 'Looking at a cube from any point outside it, what is the smallest possible number of faces hidden from you?'],
  o: [['2', '2'], ['3', '3'], ['4', '4'], ['1', '1']], a: 1,
  w: ['أقصى ما يُرى من المكعب 3 أوجه في الوقت نفسه (عند النظر من جهة ركن)، فيبقى 3 أوجه مخفية على الأقل.', 'At most 3 faces of a cube can be seen at once (looking towards a corner), so at least 3 faces are always hidden.'],
  x: [['رؤية 4 أوجه معاً غير ممكنة، لأن كل وجه مرئي يخفي الوجه المقابل له.', 'You cannot see 4 faces at once: each visible face hides the face opposite it.'], 0, ['4 أوجه مخفية تحدث عند رؤية وجهين، وهذا ليس الأقل.', '4 hidden faces happens when you see 2, which is not the minimum.'], ['رؤية 5 أوجه غير ممكنة.', 'Seeing 5 faces is impossible.']] },

{ id: '3f8', lv: 3, d: 'flex', s: 'prac', t: 'rules',
  q: ['روبوت يطبق القاعدة: إذا كان العدد زوجياً قسمه على 2، وإذا كان فردياً ضربه في 3 وأضاف 1. بدأ بالعدد 6، فما العدد بعد 4 خطوات؟', 'A robot follows a rule: if the number is even, halve it; if it is odd, multiply by 3 and add 1. It starts at 6. What is the number after 4 steps?'],
  o: [['8', '8'], ['16', '16'], ['5', '5'], ['10', '10']], a: 1,
  w: ['6 زوجي ← 3 ، 3 فردي ← 10 ، 10 زوجي ← 5 ، 5 فردي ← 16.', '6 is even → 3; 3 is odd → 10; 10 is even → 5; 5 is odd → 16.'],
  x: [['هذا العدد بعد 5 خطوات (16 ÷ 2).', 'That is the number after 5 steps (16 ÷ 2).'], 0, ['هذا العدد بعد 3 خطوات.', 'That is the number after 3 steps.'], ['هذا العدد بعد خطوتين.', 'That is the number after 2 steps.']] }
];

if (typeof module !== 'undefined') module.exports = { MW_BANK, MWF };
