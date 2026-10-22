/* =====================================================================
   بنك أسئلة التدريب — الجزء الثاني: أسئلة مصنّفة حسب المهارات
   أسئلة أصلية من إعداد المنصة (ليست من المقياس الرسمي ولا منقولة من منصات أخرى).
   التصنيف: المجال ← نوع السؤال ← المهارة ← الصعوبة.
   حقول إضافية على الحقول الموضحة في js/mawhiba-bank.js:
     k  : المهارة (معرّف من MW_INFO.skills في js/mawhiba-test-data.js)
     df : الصعوبة 1 سهل ، 2 متوسط ، 3 صعب
   ===================================================================== */

/* ---------- رسوم إضافية ---------- */
const MWF2 = (() => {
  const S = (w, h, body) => `<svg class="mwfig" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${body}</svg>`;
  const box = (x, y, s = 64) => `<rect class="bx" x="${x}" y="${y}" width="${s}" height="${s}" rx="10"/>`;
  const qm = (x, y) => `<text class="qm" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">?</text>`;
  const f1 = n => n.toFixed(1);
  /* مضلع منتظم بعدد أضلاع n داخل خانة */
  const polyPath = (n, cx, cy, r) => {
    if (n === 0) return `<circle class="st" cx="${cx}" cy="${cy}" r="${r}" fill="none"/>`;
    const p = []; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; p.push(f1(cx + r * Math.cos(a)) + ' ' + f1(cy + r * Math.sin(a))); }
    return `<path class="st" d="M${p.join('L')}Z"/>`;
  };
  const poly = n => (x, y, s) => polyPath(n, x + s / 2, y + s / 2 + 2, s * .34);
  /* نقاط داخل خانة بترتيب شبكي */
  const pips = (n, kind) => (x, y, s) => {
    const cols = n <= 3 ? n : Math.ceil(n / 2), rows = n <= 3 ? 1 : 2, out = [];
    for (let i = 0; i < n; i++) {
      const c = i % cols, r = Math.floor(i / cols), cx = x + s * (c + 1) / (cols + 1), cy = y + s * (r + 1) / (rows + 1);
      out.push(kind === 'sq' ? `<rect class="fl" x="${f1(cx - 6)}" y="${f1(cy - 6)}" width="12" height="12"/>` : kind === 'ring' ? `<circle class="st thin" cx="${f1(cx)}" cy="${f1(cy)}" r="6"/>` : `<circle class="fl" cx="${f1(cx)}" cy="${f1(cy)}" r="6.5"/>`);
    }
    return out.join('');
  };
  /* شكل غير متماثل (علم) يدور وينعكس: rot بالدرجات، flip أفقي */
  const flag = (rot = 0, flip = false) => (x, y, s) => {
    const cx = x + s / 2, cy = y + s / 2, k = s / 70;
    const g = `<path class="st" d="M${cx - 14 * k} ${cy + 22 * k}V${cy - 22 * k}"/><path class="fl" d="M${cx - 14 * k} ${cy - 22 * k}H${cx + 18 * k}L${cx + 8 * k} ${cy - 13 * k}L${cx + 18 * k} ${cy - 4 * k}H${cx - 14 * k}Z"/><circle class="fl" cx="${cx - 14 * k}" cy="${cy + 22 * k}" r="${4 * k}"/>`;
    return `<g transform="rotate(${rot} ${cx} ${cy})${flip ? ` translate(${2 * cx} 0) scale(-1 1)` : ''}">${g}</g>`;
  };
  /* حرف «F» من مربعات لاختبار الانعكاس والدوران */
  const fshape = (rot = 0, flip = false) => (x, y, s) => {
    const cx = x + s / 2, cy = y + s / 2, u = s / 7, cells = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [0, 3]];
    const g = cells.map(([c, r]) => `<rect class="bk" x="${f1(cx - 1.5 * u + c * u)}" y="${f1(cy - 2 * u + r * u)}" width="${f1(u - 1)}" height="${f1(u - 1)}"/>`).join('');
    return `<g transform="rotate(${rot} ${cx} ${cy})${flip ? ` translate(${2 * cx} 0) scale(-1 1)` : ''}">${g}</g>`;
  };
  /* مكعبات متراصة (منظور متساوي القياس): H = مصفوفة ارتفاعات [صف][عمود] */
  const stack = H => {
    const a = 26, c = Math.cos(Math.PI / 6), rows = H.length, cols = H[0].length, maxh = Math.max(...H.flat());
    const ox = rows * a * c + 20, oy = maxh * a + 16;
    const P = (x, y, z) => [ox + (x - y) * a * c, oy + (x + y) * a * .5 - z * a];
    const poly = (pts, cls) => `<path class="${cls}" d="M${pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L')}Z"/>`;
    const cube = (x, y, z) => poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], 'fc')
      + poly([P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x + 1, y + 1, z), P(x + 1, y, z)], 'fc f2')
      + poly([P(x, y + 1, z + 1), P(x + 1, y + 1, z + 1), P(x + 1, y + 1, z), P(x, y + 1, z)], 'fc f3');
    let b = '';
    for (let s = 0; s <= rows + cols; s++) for (let y = 0; y < rows; y++) { const x = s - y; if (x < 0 || x >= cols) continue; for (let z = 0; z < H[y][x]; z++) b += cube(x, y, z); }
    const w = (rows + cols) * a * c + 40, h = (rows + cols) * a * .5 + maxh * a + 30;
    return S(Math.ceil(w), Math.ceil(h), b);
  };
  /* أعمدة بيانية: items = [[تسمية, قيمة]] ، max أعلى قيمة على المحور ، step تدرّج المحور */
  const bars = (items, max, step, unit) => {
    const W = 70 * items.length + 70, H = 220, x0 = 50, y0 = 180, hgt = 150;
    let b = `<path class="st thin" d="M${x0} ${y0}H${W - 10}M${x0} ${y0}V${y0 - hgt - 10}"/>`;
    for (let v = 0; v <= max; v += step) { const y = y0 - v / max * hgt; b += `<path class="dash" d="M${x0} ${f1(y)}H${W - 10}"/><text class="tk" x="${x0 - 8}" y="${f1(y + 4)}" text-anchor="end">${v}</text>`; }
    items.forEach(([lb, v], i) => { const x = x0 + 22 + i * 70, h = v / max * hgt; b += `<rect class="bk" x="${x}" y="${f1(y0 - h)}" width="36" height="${f1(h)}" rx="3"/><text class="tk" x="${x + 18}" y="${y0 + 18}" text-anchor="middle">${lb}</text>`; });
    if (unit) b += `<text class="tk" x="${x0 - 8}" y="14" text-anchor="end">${unit}</text>`;
    return S(W, H, b);
  };
  /* شكل مركّب من مستطيلات على شبكة: cells = [[عمود, صف]] ، labels = نصوص على الأضلاع [[x, y, نص]] */
  const blocks = (cells, labels = [], u = 34) => {
    const cmax = Math.max(...cells.map(c => c[0])) + 1, rmax = Math.max(...cells.map(c => c[1])) + 1;
    let b = cells.map(([c, r]) => `<rect class="fc" x="${30 + c * u}" y="${24 + r * u}" width="${u}" height="${u}"/>`).join('');
    b += labels.map(([x, y, t]) => `<text class="lb" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">${t}</text>`).join('');
    return S(cmax * u + 60, rmax * u + 50, b);
  };
  /* مستطيل بأبعاد مكتوبة وجزء مظلل اختياري */
  const rectDim = (wl, hl, shade) => {
    let b = `<rect class="fc" x="40" y="30" width="220" height="110"/>`;
    if (shade) b += `<rect class="bk" x="40" y="30" width="${shade}" height="110" opacity=".85"/>`;
    b += `<text class="lb" x="150" y="18" text-anchor="middle">${wl}</text><text class="lb" x="282" y="88" text-anchor="middle">${hl}</text>`;
    return S(310, 160, b);
  };
  /* رافعة: موضع نقطة الارتكاز وكتل على الذراع */
  const lever = (L, R, fulcrum = 0) => {
    const cx = 200 + fulcrum, y = 90, unit = 40;
    let b = `<path class="st" d="M30 ${y}H370"/><path class="fl" d="M${cx} ${y + 2}L${cx + 18} ${y + 38}L${cx - 18} ${y + 38}Z"/>`;
    const blk = (side, it) => { const X = cx + side * it.d * unit; return `<rect class="bk" x="${X - 18}" y="${y - 36}" width="36" height="36" rx="5"/><text class="lb inv" x="${X}" y="${y - 18}" text-anchor="middle" dominant-baseline="central">${it.w}</text>`; };
    return S(400, 140, b + L.map(it => blk(-1, it)).join('') + R.map(it => blk(1, it)).join(''));
  };
  /* بكرة ثابتة واحدة */
  const fixedPulley = load => S(220, 250, `<path class="st" d="M30 20H190"/><path class="hatch" d="M40 20l-10-10M70 20l-10-10M100 20l-10-10M130 20l-10-10M160 20l-10-10M190 20l-10-10"/>
    <path class="st" d="M110 20V50"/><circle class="gr" cx="110" cy="80" r="30"/><circle class="hub" cx="110" cy="80" r="5"/>
    <path class="st" d="M80 80V170"/><path class="st" d="M140 80V200"/><path class="st" d="M80 80A30 30 0 0 1 140 80"/>
    <rect class="bk" x="50" y="170" width="60" height="50" rx="6"/><text class="lb inv" x="80" y="196" text-anchor="middle" dominant-baseline="central">${load}</text>
    <path class="st ac" d="M140 200V232"/><path class="ac fl" d="M140 240l-8-12h16z"/><text class="lb ac2" x="160" y="228" dominant-baseline="central">F</text>`);
  /* سلسلة رسوم في خانات مع خانة سؤال في آخرها */
  const seq = fns => S(fns.length * 76 + 76, 82, fns.map((f, i) => box(6 + i * 76, 9) + f(6 + i * 76, 9, 64)).join('') + box(6 + fns.length * 76, 9) + qm(38 + fns.length * 76, 43));
  const opt = f => S(84, 84, box(10, 10, 64) + f(10, 10, 64));
  /* لوحة رموز: rows = [[رمز, ...]] تُعرض كجدول بسيط */
  const pair = (fa, fb) => S(200, 84, box(10, 10) + fa(10, 10, 64) + `<path class="st" d="M88 42H110M102 34L112 42L102 50"/>` + box(126, 10) + fb(126, 10, 64));
  /* مرآة عمودية بجانب شكل */
  const mirror = f => S(190, 90, box(10, 12) + f(10, 12, 64) + `<path class="st ac" d="M110 4V86"/><path class="dash" d="M118 4V86"/>`);
  return { poly, pips, flag, fshape, stack, bars, blocks, rectDim, lever, fixedPulley, seq, opt, pair, mirror };
})();

const MW_BANK2 = [

/* ===================== الاستدلال اللغوي وفهم المقروء ===================== */

/* ---------- معنى المفردة ---------- */
{ id: 'sv-meaning-1', lv: 1, d: 'verbal', s: 'prac', t: 'vocab', k: 'meaning', df: 1,
  q: ['كلمة «الشُّجاع» تعني:', 'The word “brave” (shujāʿ) means:'],
  o: [['الذي لا يخاف من مواجهة الصعب', 'someone who is not afraid to face difficult things'], ['الذي يتكلم كثيراً', 'someone who talks a lot'], ['الذي يجري بسرعة', 'someone who runs fast'], ['الذي يحب اللعب', 'someone who loves to play']], a: 0,
  w: ['الشجاع هو من يُقدم على الأمر الصعب أو المخيف ولا يتراجع عنه.', 'A brave person takes on something hard or frightening and does not back away.'],
  x: [0, ['كثرة الكلام صفة أخرى لا علاقة لها بالشجاعة.', 'Talking a lot is a different trait with no link to bravery.'],
      ['السرعة قدرة جسمية، والشجاعة صفة في القلب.', 'Speed is a physical ability; bravery is a quality of the heart.'],
      ['حب اللعب لا يدل على الشجاعة.', 'Loving to play does not show bravery.']] },

{ id: 'sv-meaning-2', lv: 2, d: 'verbal', s: 'prac', t: 'vocab', k: 'meaning', df: 2,
  q: ['ما معنى كلمة «الوَجيز»؟', 'What does the word “wajīz” (concise) mean?'],
  o: [['الطويل المفصَّل', 'long and detailed'], ['المختصر', 'short and to the point'], ['الصعب الغامض', 'hard and unclear'], ['القديم', 'old']], a: 1,
  w: ['الوجيز هو الكلام القليل الذي يؤدي المعنى كاملاً، ومنه «كتاب وجيز» أي مختصر.', '“Wajīz” is speech that is brief yet complete; “a wajīz book” is a short, concise one.'],
  x: [['هذا عكس معنى الكلمة تماماً.', 'This is the exact opposite of the word.'], 0,
      ['الوجيز قد يكون واضحاً جداً؛ الكلمة تصف الطول لا الوضوح.', 'Concise text can be very clear; the word describes length, not clarity.'],
      ['لا علاقة للكلمة بالزمن.', 'The word has nothing to do with age.']] },

{ id: 'sv-meaning-3', lv: 3, d: 'verbal', s: 'prac', t: 'vocab', k: 'meaning', df: 2,
  q: ['أقرب كلمة إلى معنى «التريّث»:', 'The word closest in meaning to “tarayyuth” (deliberation):'],
  o: [['التردّد', 'hesitation'], ['التسرّع', 'haste'], ['التمهّل', 'taking one’s time'], ['التكاسل', 'laziness']], a: 2,
  w: ['التريّث هو التمهّل والتأنّي قبل اتخاذ القرار حتى تتضح الأمور، وهو صفة محمودة.', 'Tarayyuth means slowing down and taking care before deciding until things are clear — a praiseworthy trait.'],
  x: [['التردّد عجز عن الحسم بين أمرين، أما المتريّث فيتمهّل ثم يحسم.', 'Hesitation is being unable to decide; a deliberate person takes time and then decides.'],
      ['التسرّع عكس التريّث.', 'Haste is the opposite of deliberation.'], 0,
      ['التكاسل ترك العمل لثقله، أما التريّث فتأنٍّ مقصود قبل العمل.', 'Laziness is avoiding work; deliberation is purposeful care before acting.']] },

/* ---------- المفردة في سياقها ---------- */
{ id: 'sv-incontext-1', lv: 1, d: 'verbal', s: 'prac', t: 'vocab', k: 'incontext', df: 1,
  q: ['«أطفأ أبي النورَ قبل أن ننام.» كلمة «أطفأ» في الجملة تعني:', '“Dad switched off (aṭfaʾa) the light before we slept.” Here aṭfaʾa means:'],
  o: [['أشعل', 'turned on'], ['أغلق وأوقف', 'shut off'], ['نظّف', 'cleaned'], ['اشترى', 'bought']], a: 1,
  w: ['قبل النوم نوقف الإضاءة، فـ«أطفأ النور» أي أوقفه.', 'Before sleeping we stop the light, so “switched off the light” means stopped it.'],
  x: [['«أشعل» عكس «أطفأ».', '“Turned on” is the opposite.'], 0, ['التنظيف لا يناسب «قبل أن ننام».', 'Cleaning does not fit “before we slept”.'], ['الشراء لا يناسب المعنى.', 'Buying does not fit the meaning.']] },

{ id: 'sv-incontext-2', lv: 2, d: 'verbal', s: 'prac', t: 'vocab', k: 'incontext', df: 2,
  q: ['«ضرب المعلّمُ مثلاً ليوضّح الفكرة.» معنى «ضرب» في الجملة:', '“The teacher ‘struck’ (ḍaraba) an example to explain the idea.” Here ḍaraba means:'],
  o: [['ذكر وقدّم', 'gave / presented'], ['عاقب', 'punished'], ['سافر', 'travelled'], ['حسب ناتج الضرب', 'multiplied']], a: 0,
  w: ['«ضرب مثلاً» تعبير معناه: ذكر مثالاً وقدّمه للتوضيح.', '“To strike an example” is an expression meaning to give or present an example.'],
  x: [0, ['لا عقاب في الجملة؛ المعلّم يوضّح فكرة.', 'There is no punishment here; the teacher is explaining.'],
      ['«ضرب في الأرض» تعني سافر، لكن السياق هنا «ضرب مثلاً».', '“Struck in the land” means travelled, but the context here is “struck an example”.'],
      ['عملية الضرب في الرياضيات لا تناسب «مثلاً».', 'Multiplication does not fit with “an example”.']] },

{ id: 'sv-incontext-3', lv: 3, d: 'verbal', s: 'prac', t: 'vocab', k: 'incontext', df: 2,
  q: ['«رفع الباحثُ تقريرَه إلى اللجنة.» معنى «رفع» هنا:', '“The researcher ‘raised’ (rafaʿa) his report to the committee.” Here rafaʿa means:'],
  o: [['حمله إلى مكان مرتفع', 'carried it up high'], ['زاد عدد صفحاته', 'added pages to it'], ['قدّمه إلى جهة أعلى', 'submitted it to a higher body'], ['ألغاه', 'cancelled it']], a: 2,
  w: ['«رفع التقرير إلى اللجنة» أي قدّمه إلى الجهة المسؤولة الأعلى منه للنظر فيه.', '“Raised the report to the committee” means submitted it to the higher body responsible for reviewing it.'],
  x: [['هذا المعنى الحسي للكلمة، والسياق إداري لا حسي.', 'That is the literal meaning; the context is administrative.'],
      ['الرفع هنا لا يعني الزيادة في الحجم.', 'Here “raise” does not mean making it bigger.'], 0,
      ['«رفع» قد تعني الإزالة في سياق آخر («رفع الحظر»)، لكن مع «إلى اللجنة» معناها التقديم.', '“Raise” can mean remove elsewhere (“lift a ban”), but with “to the committee” it means submit.']] },

/* ---------- التضاد اللفظي ---------- */
{ id: 'sv-antonym-1', lv: 1, d: 'verbal', s: 'prac', t: 'vocab', k: 'antonym', df: 1,
  q: ['عكس كلمة «قريب»:', 'The opposite of “near”:'],
  o: [['جميل', 'beautiful'], ['صغير', 'small'], ['واسع', 'wide'], ['بعيد', 'far']], a: 3,
  w: ['القريب ما كانت المسافة إليه قليلة، وعكسه البعيد.', 'Near means a short distance away; its opposite is far.'],
  x: [['«جميل» لا يتعلق بالمسافة.', '“Beautiful” is not about distance.'], ['عكس «صغير» هو «كبير».', 'The opposite of small is big.'], ['عكس «واسع» هو «ضيّق».', 'The opposite of wide is narrow.'], 0] },

{ id: 'sv-antonym-2', lv: 2, d: 'verbal', s: 'prac', t: 'vocab', k: 'antonym', df: 2,
  q: ['عكس كلمة «الإسراف»:', 'The opposite of “israf” (wastefulness):'],
  o: [['الاقتصاد', 'thrift'], ['الكرم', 'generosity'], ['الإنفاق', 'spending'], ['الغنى', 'wealth']], a: 0,
  w: ['الإسراف هو تجاوز الحاجة في الإنفاق، وعكسه الاقتصاد أي التوسط وحسن التدبير.', 'Israf is spending beyond need; its opposite is thrift — moderate, careful use.'],
  x: [0, ['الكرم صفة محمودة لا تعاكس الإسراف؛ قد يكون الكريم مقتصداً.', 'Generosity is not the opposite; a generous person can still be thrifty.'],
      ['الإنفاق يشمل الإسراف والاقتصاد معاً، فليس عكساً.', 'Spending includes both wastefulness and thrift, so it is not the opposite.'],
      ['الغنى وصف للمال لا لطريقة صرفه.', 'Wealth describes how much money, not how it is spent.']] },

{ id: 'sv-antonym-3', lv: 3, d: 'verbal', s: 'prac', t: 'vocab', k: 'antonym', df: 3,
  q: ['أيّ زوج من الكلمات متضادّان في المعنى؟', 'Which pair of words are opposites?'],
  o: [['يَقين : جَزْم', 'certainty : conviction'], ['شَحيح : بَخيل', 'stingy : miserly'], ['وَجِل : مطمئن', 'fearful : at ease'], ['جَليّ : واضح', 'evident : clear']], a: 2,
  w: ['الوَجِل هو الخائف القلِق، والمطمئن هو الساكن الآمن، فهما ضدّان.', '“Wajil” means fearful and anxious; “muṭmaʾinn” means calm and secure — they are opposites.'],
  x: [['اليقين والجزم بمعنى واحد تقريباً (ترادف).', 'Certainty and conviction mean nearly the same (synonyms).'],
      ['الشحيح والبخيل مترادفان.', 'Stingy and miserly are synonyms.'], 0,
      ['الجليّ هو الواضح؛ ترادف لا تضاد.', 'Evident means clear; synonyms, not opposites.']] },

/* ---------- التناظر اللفظي ---------- */
{ id: 'sv-analogy-1', lv: 1, d: 'verbal', s: 'prac', t: 'analogy', k: 'analogy', df: 2,
  q: ['سمكة : زعانف ، كما أن طائر : ؟', 'Fish : fins, as bird : ?'],
  o: [['منقار', 'beak'], ['أجنحة', 'wings'], ['ريش', 'feathers'], ['عش', 'nest']], a: 1,
  w: ['العلاقة «كائن : العضو الذي يتحرك به»: السمكة تسبح بزعانفها، والطائر يطير بجناحيه.', 'The relation is “creature : the body part it moves with”: a fish swims with fins, a bird flies with wings.'],
  x: [['المنقار للأكل لا للحركة.', 'The beak is for eating, not moving.'], 0,
      ['الريش يغطي جسم الطائر؛ ولو كانت العلاقة «غطاء الجسم» لكان المقابل للسمكة «القشور».', 'Feathers cover the body; for a “body covering” relation the fish’s match would be scales.'],
      ['العش مسكن الطائر لا عضو حركة.', 'A nest is a home, not a body part for moving.']] },

{ id: 'sv-analogy-2', lv: 2, d: 'verbal', s: 'prac', t: 'analogy', k: 'analogy', df: 2,
  q: ['بذرة : شجرة ، كما أن :', 'Seed : tree, as:'],
  o: [['ورقة : غصن', 'leaf : branch'], ['ماء : نهر', 'water : river'], ['طفل : رجل', 'child : man'], ['تراب : جبل', 'soil : mountain']], a: 2,
  w: ['العلاقة «مرحلة أولى : ما تنمو إليه»: البذرة تكبر فتصير شجرة، والطفل يكبر فيصير رجلاً.', 'The relation is “early stage : what it grows into”: a seed grows into a tree, a child grows into a man.'],
  x: [['الورقة جزء من الغصن، ولا تنمو لتصبح غصناً.', 'A leaf is part of a branch; it does not grow into one.'],
      ['الماء مادة النهر، لا مرحلة نموّه.', 'Water is what a river is made of, not a stage of its growth.'], 0,
      ['التراب مادة يتكوّن منها الجبل، ولا ينمو.', 'Soil is material a mountain is made of; it does not grow.']] },

{ id: 'sv-analogy-3', lv: 3, d: 'verbal', s: 'prac', t: 'analogy', k: 'analogy', df: 3,
  q: ['مِجهر : خلية ، كما أن :', 'Microscope : cell, as:'],
  o: [['مِنظار فلكي : كوكب', 'telescope : planet'], ['ميزان : كتلة', 'scale : mass'], ['عدسة : ضوء', 'lens : light'], ['كتاب : معلومة', 'book : information']], a: 0,
  w: ['العلاقة «أداة تكبير : ما نراه بها لأنه لا يُرى بالعين المجردة»: نرى الخلية بالمجهر لصغرها، والكوكب بالمنظار لبُعده.', 'The relation is “viewing instrument : what we see with it because the naked eye cannot”: a cell through a microscope (too small), a planet through a telescope (too far).'],
  x: [0, ['الميزان أداة قياس لا رؤية؛ العلاقة هنا «أداة : ما تقيسه».', 'A scale measures rather than shows; that relation is “tool : what it measures”.'],
      ['العدسة جزء من المجهر، والضوء ليس ما ننظر إليه بها.', 'A lens is part of the microscope, and light is not what we look at.'],
      ['الكتاب يحمل المعلومة ولا يكبّرها لنراها؛ العلاقة «وعاء : محتوى».', 'A book holds information rather than magnifying it; that relation is “container : content”.']] },

/* ---------- الارتباط الدلالي المشترك ---------- */
{ id: 'sv-assoc-1', lv: 1, d: 'verbal', s: 'prac', t: 'analogy', k: 'assoc', df: 1,
  q: ['ما الكلمة التي ترتبط بالكلمات كلها: «سبّورة ، طالب ، جرس ، فُسحة»؟', 'Which word links all of these: “whiteboard, student, bell, break”?'],
  o: [['مستشفى', 'hospital'], ['سوق', 'market'], ['مدرسة', 'school'], ['حديقة', 'park']], a: 2,
  w: ['السبّورة والطالب والجرس والفسحة كلها من عناصر المدرسة.', 'A whiteboard, students, the bell and break time all belong to school.'],
  x: [['المستشفى فيه أطباء ومرضى، لا فسحة ولا سبّورة.', 'A hospital has doctors and patients, not break time or whiteboards.'],
      ['السوق للبيع والشراء ولا يرتبط بالطالب والجرس.', 'A market is for buying and selling and does not link to students or a bell.'], 0,
      ['الحديقة قد ترتبط بالفسحة وحدها لا بالبقية.', 'A park may link to “break” alone, but not to the rest.']] },

{ id: 'sv-assoc-2', lv: 2, d: 'verbal', s: 'prac', t: 'analogy', k: 'assoc', df: 1,
  q: ['ما الكلمة التي تجمع بين: «موج ، ملح ، شاطئ ، صَدَف»؟', 'Which word brings together: “waves, salt, shore, shells”?'],
  o: [['البحر', 'the sea'], ['الصحراء', 'the desert'], ['النهر', 'the river'], ['المطر', 'rain']], a: 0,
  w: ['الموج والملح والشاطئ والصدف كلها مرتبطة بالبحر.', 'Waves, salt, the shore and shells are all linked to the sea.'],
  x: [0, ['الصحراء فيها رمال لكن لا موج ولا صدف.', 'The desert has sand but no waves or shells.'],
      ['ماء النهر عذب غالباً لا مالح، ولا يُعرف بالصدف والشواطئ الرملية كالبحر.', 'River water is usually fresh, not salty, and rivers are not known for shells like the sea.'],
      ['المطر ماء عذب، ولا شاطئ له.', 'Rain is fresh water and has no shore.']] },

{ id: 'sv-assoc-3', lv: 3, d: 'verbal', s: 'prac', t: 'analogy', k: 'assoc', df: 3,
  q: ['ما الكلمة التي تُضاف إلى كلٍّ مما يلي فتكوّن تعبيراً معروفاً: «.... الإبرة ، .... الإعصار ، .... الماء ، .... الإنسان»؟', 'Which Arabic word can be added to each to form a familiar phrase: “… of the needle, … of the hurricane, … of water (a spring), … of a person”?'],
  o: [['ثَقْب', 'hole'], ['رأس', 'head'], ['قلب', 'heart'], ['عَيْن', 'eye']], a: 3,
  w: ['«عين الإبرة» ثقبها، و«عين الإعصار» مركزه الهادئ، و«عين الماء» النبع، و«عين الإنسان» عضو البصر؛ فالكلمة المشتركة «عين» بمعانيها المختلفة.', '“Eye of the needle” is its hole, the “eye of the hurricane” its calm centre, an “eye of water” is a spring, and a person’s eye is for seeing — the shared word is “eye” in different senses.'],
  x: [['«ثقب الإبرة» صحيح، لكن لا نقول «ثقب الإعصار» ولا «ثقب الماء».', '“Hole of the needle” works, but not “hole of the hurricane” or “hole of water”.'],
      ['«رأس الإبرة» و«رأس الإنسان» صحيحان، لكن لا نقول «رأس الماء» بمعنى معروف.', '“Head of the needle” and “a person’s head” work, but “head of water” is not a familiar phrase here.'],
      ['«قلب الإعصار» و«قلب الإنسان» صحيحان، لكن لا نقول «قلب الإبرة».', '“Heart of the hurricane” and “a person’s heart” work, but not “heart of the needle”.'], 0] },

/* ---------- الكلمة الشاذة — معيار وظيفي ---------- */
{ id: 'sv-oddfunc-1', lv: 1, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-func', df: 1,
  q: ['أيّ كلمة مختلفة في وظيفتها عن البقية؟', 'Which word is different in what it is used for?'],
  o: [['ملعقة', 'spoon'], ['شوكة', 'fork'], ['مِشط', 'comb'], ['سكّين', 'knife']], a: 2,
  w: ['الملعقة والشوكة والسكين أدوات للأكل، أما المشط فلتسريح الشعر.', 'A spoon, fork and knife are for eating; a comb is for hair.'],
  x: [['الملعقة أداة أكل كالشوكة والسكين.', 'A spoon is an eating tool like the fork and knife.'], ['الشوكة أداة أكل.', 'A fork is an eating tool.'], 0, ['السكين من أدوات المائدة للأكل.', 'A knife is a table tool for eating.']] },

{ id: 'sv-oddfunc-2', lv: 2, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-func', df: 2,
  q: ['أيّ كلمة مختلفة في وظيفتها عن البقية؟', 'Which word is different in what it is used for?'],
  o: [['مِظلّة', 'umbrella'], ['خوذة', 'helmet'], ['قفّاز', 'glove'], ['مِروحة', 'fan']], a: 3,
  w: ['المظلة والخوذة والقفاز تُلبس أو تُحمل لحماية الجسم، أما المروحة فلتحريك الهواء والتبريد.', 'An umbrella, helmet and gloves protect the body; a fan moves air to cool.'],
  x: [['المظلة تحمي من المطر أو الشمس.', 'An umbrella protects from rain or sun.'], ['الخوذة تحمي الرأس.', 'A helmet protects the head.'], ['القفاز يحمي اليد.', 'A glove protects the hand.'], 0] },

{ id: 'sv-oddfunc-3', lv: 3, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-func', df: 3,
  q: ['أيّ كلمة مختلفة في وظيفتها عن البقية؟', 'Which word is different in what it does?'],
  o: [['ميزان الحرارة', 'thermometer'], ['المسطرة', 'ruler'], ['البوصلة', 'compass'], ['الساعة', 'clock']], a: 2,
  w: ['ميزان الحرارة والمسطرة والساعة أدوات قياس كمية (حرارة، طول، زمن)، أما البوصلة فتحدد الاتجاه ولا تقيس مقداراً.', 'A thermometer, ruler and clock measure an amount (temperature, length, time); a compass shows direction and measures no amount.'],
  x: [['ميزان الحرارة يقيس درجة الحرارة.', 'A thermometer measures temperature.'], ['المسطرة تقيس الطول.', 'A ruler measures length.'], 0, ['الساعة تقيس الزمن.', 'A clock measures time.']] },

/* ---------- الكلمة الشاذة — معيار تصنيفي ---------- */
{ id: 'sv-oddclass-1', lv: 1, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-class', df: 1,
  q: ['أيّ كلمة لا تنتمي إلى المجموعة؟', 'Which word does not belong to the group?'],
  o: [['أسد', 'lion'], ['نمر', 'tiger'], ['عصفور', 'sparrow'], ['فهد', 'cheetah']], a: 2,
  w: ['الأسد والنمر والفهد من الحيوانات المفترسة ذوات الأربع، أما العصفور فطائر.', 'The lion, tiger and cheetah are four-legged predators; the sparrow is a bird.'],
  x: [['الأسد من فصيلة القطط الكبيرة.', 'The lion is a big cat.'], ['النمر من فصيلة القطط الكبيرة.', 'The tiger is a big cat.'], 0, ['الفهد من فصيلة القطط الكبيرة.', 'The cheetah is a big cat.']] },

{ id: 'sv-oddclass-2', lv: 2, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-class', df: 2,
  q: ['أيّ كلمة لا تنتمي إلى المجموعة؟', 'Which word does not belong to the group?'],
  o: [['المريخ', 'Mars'], ['القمر', 'the Moon'], ['زُحَل', 'Saturn'], ['عُطارد', 'Mercury']], a: 1,
  w: ['المريخ وزحل وعطارد كواكب تدور حول الشمس، أما القمر فتابع يدور حول الأرض.', 'Mars, Saturn and Mercury are planets orbiting the Sun; the Moon is a satellite orbiting Earth.'],
  x: [['المريخ كوكب.', 'Mars is a planet.'], 0, ['زحل كوكب.', 'Saturn is a planet.'], ['عطارد كوكب.', 'Mercury is a planet.']] },

{ id: 'sv-oddclass-3', lv: 3, d: 'verbal', s: 'prac', t: 'odd', k: 'odd-class', df: 3,
  q: ['أيّ كلمة لا تنتمي إلى المجموعة؟', 'Which word does not belong to the group?'],
  o: [['الحوت', 'whale'], ['الدلفين', 'dolphin'], ['القرش', 'shark'], ['الفقمة', 'seal']], a: 2,
  w: ['الحوت والدلفين والفقمة ثدييات تتنفس الهواء بالرئتين وترضع صغارها، أما القرش فسمكة تتنفس بالخياشيم. الشكل الخارجي يخدع، والتصنيف العلمي هو المعيار.', 'Whales, dolphins and seals are mammals that breathe air and nurse their young; the shark is a fish with gills. Appearance misleads — scientific class decides.'],
  x: [['الحوت ثديي رغم أنه يعيش في البحر.', 'The whale is a mammal even though it lives in the sea.'], ['الدلفين ثديي.', 'The dolphin is a mammal.'], 0, ['الفقمة ثديي.', 'The seal is a mammal.']] },

/* ---------- إكمال الجملة ---------- */
{ id: 'sv-complete-1', lv: 1, d: 'verbal', s: 'prac', t: 'completion', k: 'complete', df: 1,
  q: ['أكمل: «ذبلت الوردة لأنّ ريم ........ أن تسقيها.»', 'Complete: “The rose wilted because Reem ........ to water it.”'],
  o: [['تذكّرت', 'remembered'], ['أحبّت', 'loved'], ['نسيت', 'forgot'], ['أرادت', 'wanted']], a: 2,
  w: ['الذبول نتيجة لنقص الماء، و«لأنّ» تطلب سبباً، والسبب أنها نسيت السقي.', 'Wilting comes from lack of water; “because” needs a reason — she forgot to water it.'],
  x: [['لو تذكّرت لسقتها ولم تذبل.', 'Had she remembered, she would have watered it.'], ['حبّها للسقي لا يفسّر الذبول.', 'Loving to water it does not explain the wilting.'], 0, ['الإرادة وحدها لا تفسّر الذبول.', 'Wanting to does not explain the wilting.']] },

{ id: 'sv-complete-2', lv: 2, d: 'verbal', s: 'prac', t: 'completion', k: 'complete', df: 2,
  q: ['أكمل: «رغم ........ الطريق، وصل الفريق في الموعد ........»', 'Complete: “Despite the ........ road, the team arrived ........”'],
  o: [['سهولة — متأخراً', 'easy — late'], ['وعورة — المحدد', 'rough — on time'], ['قِصَر — مبكراً', 'short — early'], ['ازدحام — متأخراً', 'crowded — late']], a: 1,
  w: ['«رغم» تعني أن النتيجة جاءت على غير المتوقع: الطريق صعب (وعورة) ومع ذلك وصلوا في الموعد.', '“Despite” means the result was unexpected: the road was hard, yet they arrived on time.'],
  x: [['التأخر مع الطريق السهل غير متوقع، لكنه لا يناسب «وصل في الموعد».', 'Being late does not fit “arrived … on time”.'], 0,
      ['الطريق القصير يجعل الوصول المبكر متوقعاً، فلا معنى لـ«رغم».', 'A short road makes arriving early expected, so “despite” makes no sense.'],
      ['الازدحام يؤدي إلى التأخر عادة، فلا تعارض يبرر «رغم».', 'Traffic normally causes lateness, so there is no contrast for “despite”.']] },

{ id: 'sv-complete-3', lv: 3, d: 'verbal', s: 'prac', t: 'completion', k: 'complete', df: 2,
  q: ['أكمل: «لا تكفي الموهبة وحدها للتميّز؛ ........ تحتاج إلى ........ يصقلها.»', 'Complete: “Talent alone is not enough to excel; ........ it needs ........ to polish it.”'],
  o: [['لأنها — كسلٍ', 'because — laziness'], ['إذ — حظٍّ', 'as — luck'], ['بل — جهدٍ', 'rather — effort'], ['حتى — راحةٍ', 'until — rest']], a: 2,
  w: ['«بل» للإضراب: تنفي الاكتفاء بالموهبة وتثبت أمراً آخر، وما يصقل الموهبة هو الجهد والتدريب.', '“Rather” corrects the first idea and adds what is really needed: effort is what polishes talent.'],
  x: [['الكسل لا يصقل شيئاً، فالمعنى يتناقض.', 'Laziness polishes nothing, so the meaning contradicts itself.'],
      ['الحظ لا يُعدّ صقلاً للموهبة، ولا يتفق مع فكرة التميّز بالعمل.', 'Luck does not polish talent and does not fit the idea of excelling through work.'], 0,
      ['الراحة وحدها لا تصقل الموهبة، و«حتى» لا تستقيم في التركيب.', 'Rest alone does not polish talent, and “until” does not fit the sentence.']] },

/* ---------- فهم المقروء ---------- */
{ id: 'sv-reading-1', lv: 1, d: 'verbal', s: 'prac', t: 'reading', k: 'reading', df: 1,
  p: ['يجمع النحل رحيق الأزهار، ثم يعود إلى الخلية ليصنع منه العسل. وأثناء تنقّله بين الأزهار، يحمل حبوب اللقاح من زهرة إلى أخرى، فيساعد النباتات على تكوين الثمار.', 'Bees collect nectar from flowers and return to the hive to make honey from it. As they move from flower to flower, they carry pollen from one to another, helping plants form fruit.'],
  q: ['حسب النص، كيف يساعد النحلُ النباتات؟', 'According to the text, how do bees help plants?'],
  o: [['بسقيها بالماء', 'by watering them'], ['بنقل حبوب اللقاح بين الأزهار', 'by carrying pollen between flowers'], ['بصنع العسل لها', 'by making honey for them'], ['بحمايتها من الحشرات', 'by protecting them from insects']], a: 1,
  w: ['النص يقول: «يحمل حبوب اللقاح من زهرة إلى أخرى، فيساعد النباتات على تكوين الثمار».', 'The text says bees “carry pollen from one to another, helping plants form fruit”.'],
  x: [['النص لا يذكر السقي.', 'The text does not mention watering.'], 0, ['العسل يصنعه النحل لنفسه في الخلية، لا للنبات.', 'Honey is made in the hive, not for the plant.'], ['لم يذكر النص الحماية من الحشرات.', 'The text does not mention protection from insects.']] },

{ id: 'sv-reading-2', lv: 2, d: 'verbal', s: 'prac', t: 'reading', k: 'reading', df: 2,
  p: ['بنى سكان المناطق الحارة قديماً بيوتهم بجدران سميكة ونوافذ صغيرة، وجعلوا في أعلاها فتحات تسمح للهواء الساخن بالخروج. وكانت الأفنية الداخلية المزروعة تلطّف الهواء قبل دخوله الغرف. وهكذا ظلت البيوت باردة نسبياً دون أي أجهزة تكييف.', 'In hot regions, people long ago built houses with thick walls and small windows, with openings near the top to let hot air escape. Planted inner courtyards cooled the air before it entered the rooms. So the houses stayed fairly cool without any air-conditioning.'],
  q: ['ما الفكرة الرئيسة للنص؟', 'What is the main idea of the text?'],
  o: [['أجهزة التكييف اختراع قديم', 'Air-conditioning is an old invention'], ['النوافذ الصغيرة تجعل البيت مظلماً', 'Small windows make a house dark'], ['زراعة الأفنية تزيّن البيوت', 'Planting courtyards decorates houses'], ['تصميم البيوت القديمة ساعد على تبريدها طبيعياً', 'The design of old houses helped cool them naturally']], a: 3,
  w: ['كل تفاصيل النص (الجدران، النوافذ، الفتحات، الأفنية) تخدم فكرة واحدة: تبريد البيت دون أجهزة.', 'Every detail (walls, windows, openings, courtyards) serves one idea: cooling the house without machines.'],
  x: [['النص يقول العكس: «دون أي أجهزة تكييف».', 'The text says the opposite: “without any air-conditioning”.'],
      ['النص لم يتحدث عن الإضاءة؛ هذا استنتاج خارج الفكرة.', 'The text does not discuss light; this goes beyond it.'],
      ['النص ذكر الأفنية لدورها في تلطيف الهواء لا للزينة، وهي تفصيلة لا فكرة رئيسة.', 'Courtyards are mentioned for cooling, not decoration, and they are a detail, not the main idea.'], 0] },

{ id: 'sv-reading-3', lv: 3, d: 'verbal', s: 'prac', t: 'reading', k: 'reading', df: 3,
  p: ['يظن بعض الناس أن الذاكرة الجيدة تعني القدرة على تذكّر كل شيء، غير أن الدماغ ينسى عمداً كثيراً من التفاصيل غير المهمة؛ ليُبقي على ما يتكرر استعماله أو ما يرتبط بمعنى أو شعور. ولهذا فإن من يربط المعلومة الجديدة بما يعرفه، ويراجعها على فترات، يحفظها أطول ممن يكررها مرات كثيرة في جلسة واحدة.', 'Some people think a good memory means remembering everything, yet the brain deliberately forgets many unimportant details, keeping what is used often or tied to meaning or feeling. That is why someone who links new information to what they know and reviews it at intervals keeps it longer than someone who repeats it many times in one sitting.'],
  q: ['أيّ العبارات يمكن استنتاجها من النص؟', 'Which statement can be inferred from the text?'],
  o: [['النسيان قد يكون جزءاً من عمل الذاكرة السليمة', 'Forgetting can be part of how a healthy memory works'], ['التكرار المكثف في جلسة واحدة أفضل طرق الحفظ', 'Intense repetition in one sitting is the best way to memorise'], ['الدماغ يحتفظ بكل التفاصيل لكنه يخفيها', 'The brain keeps every detail but hides it'], ['المعلومات المرتبطة بالمشاعر تُنسى أسرع', 'Information tied to feelings is forgotten faster']], a: 0,
  w: ['النص يقول إن الدماغ «ينسى عمداً» التفاصيل غير المهمة ليحتفظ بالمهم؛ إذن النسيان جزء من عمل الذاكرة لا عيب فيها.', 'The text says the brain “deliberately forgets” unimportant details to keep important ones, so forgetting is part of memory working well.'],
  x: [0, ['النص يقول العكس: المراجعة على فترات أفضل من التكرار في جلسة واحدة.', 'The text says the opposite: spaced review beats repetition in one sitting.'],
      ['النص يقول إن الدماغ ينسى التفاصيل، لا أنه يخفيها.', 'The text says the brain forgets details, not that it hides them.'],
      ['النص يقول إن ما يرتبط بشعور يبقى، لا أنه يُنسى.', 'The text says what is tied to feeling is kept, not forgotten.']] },

/* ---------- استخلاص العبرة ---------- */
{ id: 'sv-moral-1', lv: 1, d: 'verbal', s: 'prac', t: 'reading', k: 'moral', df: 1,
  p: ['أراد سامي أن يبني بيتاً من المكعبات، فسقط البيت مرة بعد مرة. لم يغضب سامي، بل نظر إلى المكعبات وغيّر طريقة ترتيبها، فوضع الكبيرة في الأسفل والصغيرة في الأعلى، فثبت البيت أخيراً.', 'Sami wanted to build a house of blocks, but it fell again and again. He did not get angry; he looked at the blocks and changed how he stacked them, putting the big ones at the bottom and the small ones on top, and at last the house stood.'],
  q: ['ما العبرة من القصة؟', 'What is the lesson of the story?'],
  o: [['المكعبات الصغيرة أفضل من الكبيرة', 'Small blocks are better than big ones'], ['اللعب بالمكعبات مضيعة للوقت', 'Playing with blocks wastes time'], ['عندما تفشل فكّر وغيّر طريقتك ولا تستسلم', 'When you fail, think, change your way and don’t give up'], ['اطلب المساعدة دائماً من الكبار', 'Always ask adults for help']], a: 2,
  w: ['سامي لم يغضب ولم يترك المحاولة، بل فكّر وغيّر الطريقة فنجح.', 'Sami neither got angry nor quit; he thought, changed his method and succeeded.'],
  x: [['القصة لا تفضّل حجماً على حجم، بل تضع كلاً في مكانه المناسب.', 'The story does not prefer one size; it puts each in the right place.'], ['هذا رأي لا تدل عليه القصة.', 'The story gives no support to this opinion.'], 0, ['سامي نجح وحده دون طلب مساعدة.', 'Sami succeeded on his own without asking for help.']] },

{ id: 'sv-moral-2', lv: 2, d: 'verbal', s: 'prac', t: 'reading', k: 'moral', df: 2,
  p: ['كان في القرية بئران: بئر قريبة ماؤها قليل، وأخرى بعيدة ماؤها وفير. اعتاد الناس الشرب من القريبة حتى كادت تجفّ، فاقترح شيخ القرية أن يحفروا قناة صغيرة من البئر البعيدة. تعب الشباب في الحفر أسابيع، ثم جرى الماء إلى القرية، فلم يعطش أحد بعد ذلك.', 'A village had two wells: a near one with little water and a far one with plenty. People always drank from the near one until it almost dried up, so the village elder suggested digging a small channel from the far well. The young people dug for weeks, then water flowed into the village, and no one went thirsty again.'],
  q: ['أنسب عبرة للقصة:', 'The best lesson for the story:'],
  o: [['الحلّ الأسهل قد لا يكون الحلّ الأصلح على المدى البعيد', 'The easiest solution may not be the best one in the long run'], ['الشباب أقوى من الشيوخ', 'Young people are stronger than old people'], ['الآبار البعيدة أفضل دائماً', 'Far wells are always better'], ['العمل الجماعي متعب ولا فائدة منه', 'Teamwork is tiring and useless']], a: 0,
  w: ['الاعتماد على البئر القريبة كان سهلاً لكنه كاد يُفني الماء، أما الحلّ المتعب (القناة) فحقق نفعاً دائماً.', 'Using the near well was easy but nearly ran out; the harder solution (the channel) gave lasting benefit.'],
  x: [0, ['القصة لا تقارن القوة؛ الشيخ صاحب الفكرة والشباب نفّذوها.', 'The story does not compare strength; the elder had the idea and the young carried it out.'],
      ['«دائماً» تعميم لا تدل عليه القصة؛ المهم وفرة الماء لا البُعد.', '“Always” overgeneralises; what mattered was plenty of water, not distance.'],
      ['القصة تقول العكس: العمل الجماعي أنهى العطش.', 'The story says the opposite: working together ended the thirst.']] },

{ id: 'sv-moral-3', lv: 3, d: 'verbal', s: 'prac', t: 'reading', k: 'moral', df: 2,
  p: ['أعدّ فيصل بحثاً للمسابقة العلمية، وقبل التسليم بيوم اكتشف خطأً في إحدى نتائجه. كان بإمكانه أن يتجاهله؛ فلن يلاحظه أحد على الأرجح. لكنه سهر يعيد التجربة، فتغيّرت النتيجة وصارت أقل إبهاراً. سلّم البحث كما هو، وكتب في آخره ما واجهه وكيف صحّحه. وفي التحكيم قال أحد المحكّمين: «أكثر ما أعجبنا أمانتك في عرض ما حدث».', 'Faisal prepared a project for a science competition. The day before submitting, he found a mistake in one of his results. He could have ignored it — probably no one would notice. But he stayed up redoing the experiment, and the result changed and became less impressive. He submitted it anyway and wrote at the end what had happened and how he fixed it. At judging, a judge said: “What impressed us most was your honesty about what happened.”'],
  q: ['ما الفكرة التي تريد القصة أن توصلها؟', 'What idea does the story want to convey?'],
  o: [['النتائج المبهرة هي أهم ما في البحث', 'Impressive results are what matter most in research'], ['يجب تسليم البحوث مبكراً دائماً', 'Projects should always be submitted early'], ['المحكّمون لا يقرؤون البحوث بدقة', 'Judges do not read projects carefully'], ['الأمانة العلمية قيمة يُقدَّر صاحبها ولو كانت نتيجته أقل', 'Scientific honesty is valued even when the result is less impressive']], a: 3,
  w: ['فيصل اختار الأمانة على حساب الإبهار، فكان ذلك أكثر ما قدّره المحكّمون.', 'Faisal chose honesty over impressiveness, and that was what the judges valued most.'],
  x: [['القصة تقول العكس: الأمانة أعجبت المحكّمين أكثر من الإبهار.', 'The story says the opposite: honesty impressed the judges more than flashy results.'],
      ['التسليم المبكر ليس موضوع القصة.', 'Early submission is not the story’s point.'],
      ['المحكّم لاحظ ما كتبه فيصل في آخر البحث، فهم قرؤوه بدقة.', 'The judge noticed what Faisal wrote at the end, so they read carefully.'], 0] },

/* ===================== الاستدلال الرياضي والمكاني ===================== */

/* ---------- العمليات الحسابية ---------- */
{ id: 'sm-ops-1', lv: 1, d: 'math', s: 'prac', t: 'arith', k: 'ops', df: 1,
  q: ['ما ناتج:  25 + 37 − 12 ؟', 'What is 25 + 37 − 12?'],
  o: [['62', '62'], ['50', '50'], ['74', '74'], ['40', '40']], a: 1,
  w: ['نجمع أولاً: 25 + 37 = 62، ثم نطرح: 62 − 12 = 50.', 'Add first: 25 + 37 = 62, then subtract: 62 − 12 = 50.'],
  x: [['هذا ناتج الجمع فقط قبل طرح 12.', 'That is the sum before subtracting 12.'], 0, ['هذا جمع الأعداد الثلاثة (25 + 37 + 12)، والعملية الأخيرة طرح.', 'That adds all three numbers; the last step is a subtraction.'], ['هذا ينتج عن نسيان «الحمل» في الجمع: 25 + 37 كُتبت 52 بدل 62، ثم 52 − 12 = 40.', 'That comes from forgetting to carry: 25 + 37 was written as 52 instead of 62, then 52 − 12 = 40.']] },

{ id: 'sm-ops-2', lv: 2, d: 'math', s: 'prac', t: 'arith', k: 'ops', df: 3,
  q: ['ما ناتج:  8 + 4 × 3 − 6 ÷ 2 ؟', 'What is 8 + 4 × 3 − 6 ÷ 2?'],
  o: [['15', '15'], ['7', '7'], ['17', '17'], ['14', '14']], a: 2,
  w: ['الضرب والقسمة قبل الجمع والطرح: 4 × 3 = 12، و6 ÷ 2 = 3، ثم 8 + 12 − 3 = 17.', 'Multiply and divide before adding and subtracting: 4 × 3 = 12, 6 ÷ 2 = 3, then 8 + 12 − 3 = 17.'],
  x: [['هذا حلّ من اليسار إلى اليمين دون أولوية: (8 + 4) × 3 = 36، ثم 36 − 6 = 30، ثم 30 ÷ 2 = 15.', 'That works left to right with no priority: (8 + 4) × 3 = 36, 36 − 6 = 30, 30 ÷ 2 = 15.'],
      ['هذا قسمة (8 + 12 − 6) كلها على 2؛ القسمة تخص العدد 6 وحده.', 'That divides all of (8 + 12 − 6) by 2; the division belongs only to the 6.'], 0,
      ['هذا يُهمل القسمة على 2 (8 + 12 − 6).', 'That ignores the “÷ 2” (8 + 12 − 6).']] },

{ id: 'sm-ops-3', lv: 3, d: 'math', s: 'prac', t: 'arith', k: 'ops', df: 3,
  q: ['ما مجموع الأعداد من 1 إلى 40؟  (1 + 2 + 3 + … + 40)', 'What is the sum of the numbers from 1 to 40? (1 + 2 + 3 + … + 40)'],
  o: [['820', '820'], ['800', '800'], ['840', '840'], ['780', '780']], a: 0,
  w: ['نجمع الأطراف أزواجاً: 1 + 40 = 41، و2 + 39 = 41 … وعدد الأزواج 20؛ فالمجموع 20 × 41 = 820.', 'Pair the ends: 1 + 40 = 41, 2 + 39 = 41 … there are 20 pairs, so the sum is 20 × 41 = 820.'],
  x: [0, ['هذا 20 × 40؛ مجموع كل زوج 41 لا 40.', 'That is 20 × 40; each pair sums to 41, not 40.'],
      ['هذا 20 × 42؛ مجموع كل زوج 41.', 'That is 20 × 42; each pair sums to 41.'],
      ['هذا مجموع الأعداد من 1 إلى 39 فقط.', 'That is only the sum from 1 to 39.']] },

/* ---------- الكسور ---------- */
{ id: 'sm-fractions-1', lv: 1, d: 'math', s: 'prac', t: 'arith', k: 'fractions', df: 1,
  q: ['قُسمت كعكة إلى 8 قطع متساوية، فأكل أحمد وإخوته 3 قطع. ما الكسر الذي بقي من الكعكة؟', 'A cake was cut into 8 equal pieces, and Ahmed and his brothers ate 3. What fraction of the cake is left?'],
  o: [['3/8', '3/8'], ['3/5', '3/5'], ['5/8', '5/8'], ['8/5', '8/5']], a: 2,
  w: ['بقي 8 − 3 = 5 قطع من أصل 8، أي 5/8.', '8 − 3 = 5 pieces are left out of 8, so 5/8.'],
  x: [['3/8 هو ما أُكل، لا ما بقي.', '3/8 is what was eaten, not what is left.'], ['المقام هو عدد كل القطع (8)، لا القطع الباقية.', 'The bottom number is all the pieces (8), not the pieces left.'], 0, ['هذا الكسر مقلوب؛ والكسر الأكبر من 1 يعني أكثر من كعكة كاملة.', 'This fraction is upside down; a value above 1 means more than a whole cake.']] },

{ id: 'sm-fractions-2', lv: 2, d: 'math', s: 'prac', t: 'arith', k: 'fractions', df: 1,
  q: ['في فصل 24 طالباً، ثلاثة أرباعهم يحبون الرياضيات. كم طالباً يحبون الرياضيات؟', 'In a class of 24 students, three quarters like maths. How many students like maths?'],
  o: [['6', '6'], ['18', '18'], ['21', '21'], ['32', '32']], a: 1,
  w: ['ربع 24 هو 24 ÷ 4 = 6، فثلاثة أرباعه 3 × 6 = 18.', 'A quarter of 24 is 24 ÷ 4 = 6, so three quarters is 3 × 6 = 18.'],
  x: [['6 ربع واحد فقط، والمطلوب ثلاثة أرباع.', '6 is only one quarter; the question asks for three.'], 0, ['هذا طرح 3 من 24، والكسر لا يُطرح بهذه الطريقة.', 'That subtracts 3 from 24; a fraction does not work that way.'], ['هذا أكبر من عدد الطلاب كلهم؛ 24 × 4 ÷ 3.', 'That is more than the whole class (24 × 4 ÷ 3).']] },

{ id: 'sm-fractions-3', lv: 3, d: 'math', s: 'prac', t: 'arith', k: 'fractions', df: 2,
  q: ['أيّ الكسور الآتية هو الأكبر؟', 'Which of these fractions is the largest?'],
  o: [['5/8', '5/8'], ['3/5', '3/5'], ['7/12', '7/12'], ['2/3', '2/3']], a: 3,
  w: ['نقارن بالكسور العشرية: 5/8 = 0.625 ، 3/5 = 0.6 ، 7/12 ≈ 0.583 ، 2/3 ≈ 0.667؛ فالأكبر 2/3.', 'As decimals: 5/8 = 0.625, 3/5 = 0.6, 7/12 ≈ 0.583, 2/3 ≈ 0.667, so 2/3 is largest.'],
  x: [['5/8 = 0.625 أصغر من 2/3 ≈ 0.667.', '5/8 = 0.625 is less than 2/3 ≈ 0.667.'], ['3/5 = 0.6 أصغر من 2/3.', '3/5 = 0.6 is less than 2/3.'],
      ['البسط والمقام الأكبران لا يعنيان كسراً أكبر؛ 7/12 ≈ 0.583 هو الأصغر هنا.', 'Bigger top and bottom numbers do not mean a bigger fraction; 7/12 ≈ 0.583 is actually the smallest.'], 0] },

/* ---------- النسبة المئوية ---------- */
{ id: 'sm-percent-1', lv: 1, d: 'math', s: 'prac', t: 'arith', k: 'percent', df: 2,
  q: ['مع ليلى 40 ريالاً، صرفت 50% منها. كم ريالاً صرفت؟', 'Layla had 40 riyals and spent 50% of it. How many riyals did she spend?'],
  o: [['50', '50'], ['10', '10'], ['40', '40'], ['20', '20']], a: 3,
  w: ['50% تعني النصف، ونصف 40 هو 20.', '50% means half, and half of 40 is 20.'],
  x: [['50 هو رقم النسبة لا المبلغ، وهو أكبر مما معها.', '50 is the percentage number, not the amount — and it is more than she had.'], ['10 هو الربع (25%) لا النصف.', '10 is a quarter (25%), not half.'], ['40 هو المبلغ كله (100%).', '40 is the whole amount (100%).'], 0] },

{ id: 'sm-percent-2', lv: 2, d: 'math', s: 'prac', t: 'arith', k: 'percent', df: 1,
  q: ['ما 15% من 200؟', 'What is 15% of 200?'],
  o: [['30', '30'], ['15', '15'], ['185', '185'], ['20', '20']], a: 0,
  w: ['10% من 200 = 20، و5% = 10، إذن 15% = 20 + 10 = 30.', '10% of 200 is 20 and 5% is 10, so 15% is 20 + 10 = 30.'],
  x: [0, ['15 هو النسبة نفسها، لا قيمتها من 200.', '15 is the percentage itself, not its value of 200.'], ['هذا طرح 15 من 200، لا حساب النسبة.', 'That subtracts 15 from 200 instead of taking a percentage.'], ['20 هي 10% فقط.', '20 is only 10%.']] },

{ id: 'sm-percent-3', lv: 3, d: 'math', s: 'prac', t: 'arith', k: 'percent', df: 3,
  q: ['ارتفع سعر كتاب من 80 ريالاً إلى 100 ريال. ما نسبة الزيادة؟', 'A book’s price went up from 80 riyals to 100 riyals. What was the percentage increase?'],
  o: [['20%', '20%'], ['25%', '25%'], ['80%', '80%'], ['125%', '125%']], a: 1,
  w: ['الزيادة 20 ريالاً، وتُنسب إلى السعر الأصلي 80: 20 ÷ 80 = 0.25 = 25%.', 'The increase is 20 riyals, compared with the original 80: 20 ÷ 80 = 0.25 = 25%.'],
  x: [['20% تنتج من نسبة الزيادة إلى السعر الجديد (20 ÷ 100)، والنسبة تُحسب من الأصلي.', '20% compares the increase with the new price (20 ÷ 100); it must be compared with the original.'], 0,
      ['80% هي نسبة السعر القديم إلى الجديد، لا نسبة الزيادة.', '80% is old price ÷ new price, not the increase.'], ['125% هي نسبة السعر الجديد إلى القديم، والزيادة هي 125% − 100%.', '125% is new ÷ old; the increase is 125% − 100%.']] },

/* ---------- التناسب ---------- */
{ id: 'sm-ratio-1', lv: 1, d: 'math', s: 'prac', t: 'arith', k: 'ratio', df: 2,
  q: ['ثمن 3 أقلام 6 ريالات. كم ثمن 7 أقلام من النوع نفسه؟', '3 pens cost 6 riyals. How much do 7 of the same pens cost?'],
  o: [['10', '10'], ['14', '14'], ['21', '21'], ['12', '12']], a: 1,
  w: ['ثمن القلم الواحد 6 ÷ 3 = 2 ريال، فثمن 7 أقلام 7 × 2 = 14 ريالاً.', 'One pen costs 6 ÷ 3 = 2 riyals, so 7 pens cost 7 × 2 = 14 riyals.'],
  x: [['هذا أضاف 4 (الفرق بين 7 و3) إلى 6، والصحيح الضرب في سعر القلم.', 'That adds 4 (the difference between 7 and 3) to 6; we must use the price per pen.'], 0, ['هذا 7 × 3؛ سعر القلم 2 لا 3.', 'That is 7 × 3; a pen costs 2, not 3.'], ['12 ثمن 6 أقلام.', '12 is the price of 6 pens.']] },

{ id: 'sm-ratio-2', lv: 2, d: 'math', s: 'prac', t: 'arith', k: 'ratio', df: 1,
  q: ['في خريطة، كل 1 سم يمثّل 5 كم على الأرض. المسافة بين مدينتين على الخريطة 7 سم. كم المسافة الحقيقية؟', 'On a map, 1 cm stands for 5 km. Two towns are 7 cm apart on the map. What is the real distance?'],
  o: [['12 كم', '12 km'], ['7 كم', '7 km'], ['75 كم', '75 km'], ['35 كم', '35 km']], a: 3,
  w: ['كل سنتيمتر = 5 كم، إذن 7 سم = 7 × 5 = 35 كم.', 'Each centimetre is 5 km, so 7 cm = 7 × 5 = 35 km.'],
  x: [['هذا جمع 7 + 5، والمقياس يُضرب.', 'That adds 7 + 5; a scale is multiplied.'], ['هذا تجاهل المقياس واعتبر كل سنتيمتر كيلومتراً.', 'That ignores the scale, as if 1 cm were 1 km.'], ['هذا كتابة الرقمين متجاورين لا ضربهما.', 'That just writes the digits side by side instead of multiplying.'], 0] },

{ id: 'sm-ratio-3', lv: 3, d: 'math', s: 'prac', t: 'arith', k: 'ratio', df: 3,
  q: ['يبني 6 عمّال سوراً في 8 أيام. كم يوماً يحتاج 4 عمّال (بالسرعة نفسها) لبناء السور نفسه؟', '6 workers build a wall in 8 days. How many days do 4 workers (working at the same rate) need for the same wall?'],
  o: [['12', '12'], ['6', '6'], ['10', '10'], ['16', '16']], a: 0,
  w: ['التناسب هنا عكسي: العمل كله = 6 × 8 = 48 «يوم عمل»، فيحتاج 4 عمّال 48 ÷ 4 = 12 يوماً. قلّة العمّال تزيد الأيام.', 'This is inverse proportion: the whole job = 6 × 8 = 48 worker-days, so 4 workers need 48 ÷ 4 = 12 days. Fewer workers means more days.'],
  x: [0, ['العمّال أقل فلا بد أن تزيد الأيام لا أن تنقص.', 'With fewer workers the days must go up, not down.'],
      ['هذا إضافة يومين لأن العمّال نقصوا اثنين؛ العلاقة ضرب لا جمع.', 'That adds 2 days because there are 2 fewer workers; the relation is multiplicative.'],
      ['16 تعني أن العمل تضاعف، والعمّال نقصوا إلى الثلثين فقط.', '16 would mean double the time, but the workforce only fell to two-thirds.']] },

/* ---------- الأعمار ---------- */
{ id: 'sm-ages-1', lv: 1, d: 'math', s: 'prac', t: 'word', k: 'ages', df: 3,
  q: ['عمر ريم 7 سنوات، وأخوها أكبر منها بـ 4 سنوات. كم سيكون عمر أخيها بعد سنتين؟', 'Reem is 7, and her brother is 4 years older. How old will her brother be in 2 years?'],
  o: [['11', '11'], ['9', '9'], ['13', '13'], ['15', '15']], a: 2,
  w: ['عمر الأخ الآن 7 + 4 = 11، وبعد سنتين 11 + 2 = 13.', 'Her brother is 7 + 4 = 11 now, and in 2 years he will be 11 + 2 = 13.'],
  x: [['11 عمره الآن، والسؤال عن عمره بعد سنتين.', '11 is his age now; the question asks about 2 years later.'], ['9 عمر ريم بعد سنتين.', '9 is Reem’s age in 2 years.'], 0, ['هذا أضاف 4 مرتين.', 'That adds the 4 twice.']] },

{ id: 'sm-ages-2', lv: 2, d: 'math', s: 'prac', t: 'word', k: 'ages', df: 3,
  q: ['عمر الأب 40 سنة وعمر ابنه 10 سنوات. بعد كم سنة يصبح عمر الأب ثلاثة أمثال عمر ابنه؟', 'A father is 40 and his son is 10. In how many years will the father be three times as old as his son?'],
  o: [['5', '5'], ['10', '10'], ['3', '3'], ['20', '20']], a: 0,
  w: ['الفرق بين العمرين ثابت = 30. حين يكون الأب ثلاثة أمثال الابن يكون الفرق مثلَي عمر الابن: 30 = 2 × عمر الابن، فعمر الابن 15، أي بعد 15 − 10 = 5 سنوات (الأب 45 = 3 × 15).', 'The age gap is always 30. When the father is three times the son, the gap is twice the son’s age: 30 = 2 × son, so the son is 15 — in 15 − 10 = 5 years (father 45 = 3 × 15).'],
  x: [0, ['بعد 10 سنوات: الأب 50 والابن 20، و50 ليست ثلاثة أمثال 20.', 'In 10 years: 50 and 20, and 50 is not three times 20.'],
      ['بعد 3 سنوات: 43 و13، و3 × 13 = 39.', 'In 3 years: 43 and 13, and 3 × 13 = 39.'], ['بعد 20 سنة: 60 و30، أي مثلان فقط.', 'In 20 years: 60 and 30 — only twice.']] },

{ id: 'sm-ages-3', lv: 3, d: 'math', s: 'prac', t: 'word', k: 'ages', df: 2,
  q: ['مجموع أعمار ثلاثة إخوة 36 سنة، وأعمارهم أعداد زوجية متتالية. كم عمر الأكبر؟', 'Three siblings’ ages add up to 36, and their ages are consecutive even numbers. How old is the eldest?'],
  o: [['12', '12'], ['16', '16'], ['13', '13'], ['14', '14']], a: 3,
  w: ['الأوسط = 36 ÷ 3 = 12، والأعداد الزوجية المتتالية تتباعد بـ 2: 10 و12 و14؛ فالأكبر 14.', 'The middle one is 36 ÷ 3 = 12; consecutive even numbers are 2 apart: 10, 12, 14 — so the eldest is 14.'],
  x: [['12 عمر الأوسط.', '12 is the middle sibling.'], ['لو كان الأكبر 16 لكانت الأعمار 12 و14 و16 ومجموعها 42.', 'If the eldest were 16, the ages would be 12, 14, 16 = 42.'], ['13 ليس عدداً زوجياً.', '13 is not even.'], 0] },

/* ---------- الوقت ---------- */
{ id: 'sm-time-1', lv: 1, d: 'math', s: 'prac', t: 'word', k: 'time', df: 2,
  q: ['بدأت الحصة الساعة 8:15 ومدتها 45 دقيقة. متى تنتهي؟', 'A lesson starts at 8:15 and lasts 45 minutes. When does it end?'],
  o: [['8:45', '8:45'], ['9:15', '9:15'], ['9:00', '9:00'], ['8:55', '8:55']], a: 2,
  w: ['15 + 45 = 60 دقيقة = ساعة كاملة، فتنتهي الساعة 9:00.', '15 + 45 = 60 minutes = a full hour, so it ends at 9:00.'],
  x: [['8:45 بعد 30 دقيقة فقط.', '8:45 is only 30 minutes later.'], ['9:15 بعد ساعة كاملة، والحصة 45 دقيقة.', '9:15 is a full hour later; the lesson is 45 minutes.'], 0, ['8:55 بعد 40 دقيقة فقط.', '8:55 is only 40 minutes later.']] },

{ id: 'sm-time-2', lv: 2, d: 'math', s: 'prac', t: 'word', k: 'time', df: 2,
  q: ['انطلق قطار الساعة 10:40 صباحاً ووصل الساعة 1:25 ظهراً. كم استغرقت الرحلة؟', 'A train left at 10:40 a.m. and arrived at 1:25 p.m. How long was the journey?'],
  o: [['ساعتان و45 دقيقة', '2 hours 45 minutes'], ['3 ساعات و15 دقيقة', '3 hours 15 minutes'], ['ساعتان و15 دقيقة', '2 hours 15 minutes'], ['3 ساعات و45 دقيقة', '3 hours 45 minutes']], a: 0,
  w: ['من 10:40 إلى 11:00 = 20 دقيقة، ومن 11:00 إلى 1:00 = ساعتان، ومن 1:00 إلى 1:25 = 25 دقيقة؛ المجموع ساعتان و45 دقيقة.', '10:40 → 11:00 is 20 min, 11:00 → 1:00 is 2 h, 1:00 → 1:25 is 25 min: 2 h 45 min in total.'],
  x: [0, ['هذا طرح الساعات (13 − 10) والدقائق (40 − 25) كلاً على حدة؛ لا يصح لأن دقائق الوصول أقل من دقائق الانطلاق.', 'That subtracts hours and minutes separately; it fails because the arrival minutes are fewer than the departure minutes.'],
      ['هذا ينقص 30 دقيقة عن المدة الصحيحة؛ راجع العدّ من 10:40.', 'Count again from 10:40; this is 30 minutes short.'], ['هذا يزيد ساعة كاملة.', 'This is a whole hour too long.']] },

{ id: 'sm-time-3', lv: 3, d: 'math', s: 'prac', t: 'word', k: 'time', df: 3,
  q: ['ساعة تُقدّم 3 دقائق في كل ساعة. ضُبطت على الوقت الصحيح الساعة 6:00 صباحاً. ماذا تُظهر عندما يكون الوقت الصحيح 2:00 ظهراً؟', 'A clock gains 3 minutes every hour. It was set correctly at 6:00 a.m. What does it show when the real time is 2:00 p.m.?'],
  o: [['2:03', '2:03'], ['1:36', '1:36'], ['2:18', '2:18'], ['2:24', '2:24']], a: 3,
  w: ['من 6:00 صباحاً إلى 2:00 ظهراً 8 ساعات، فتتقدم 8 × 3 = 24 دقيقة، وتُظهر 2:24.', 'From 6:00 a.m. to 2:00 p.m. is 8 hours, so it gains 8 × 3 = 24 minutes and shows 2:24.'],
  x: [['هذا تقدّم ساعة واحدة فقط.', 'That is only one hour’s gain.'], ['هذا تأخير لا تقديم؛ الساعة تسبق الوقت الصحيح.', 'That is losing time; this clock runs ahead.'], ['هذا حساب 6 ساعات بدل 8.', 'That counts 6 hours instead of 8.'], 0] },

/* ---------- الاحتمال ---------- */
{ id: 'sm-prob-1', lv: 1, d: 'math', s: 'prac', t: 'word', k: 'prob', df: 1,
  q: ['في كيس 6 كرات حمراء وكرتان زرقاوان. سحبت ريم كرة دون أن تنظر. أيّ لون أرجح أن تسحبه؟', 'A bag has 6 red balls and 2 blue balls. Reem pulls one out without looking. Which colour is she more likely to get?'],
  o: [['الأزرق', 'blue'], ['الأحمر', 'red'], ['اللونان متساويان', 'both are equally likely'], ['لا يمكن سحب أي لون', 'neither colour can be drawn']], a: 1,
  w: ['الكرات الحمراء أكثر (6 مقابل 2)، فاحتمال سحب الأحمر أكبر.', 'There are more red balls (6 against 2), so red is more likely.'],
  x: [['الأزرق أقل عدداً، فاحتماله أقل.', 'There are fewer blue balls, so blue is less likely.'], 0, ['يتساويان فقط لو تساوى العددان.', 'They would be equal only if the numbers were equal.'], ['كلا اللونين موجود في الكيس.', 'Both colours are in the bag.']] },

{ id: 'sm-prob-2', lv: 2, d: 'math', s: 'prac', t: 'word', k: 'prob', df: 2,
  q: ['رُمي حجر نرد مرقّم من 1 إلى 6. ما احتمال ظهور عدد أكبر من 4؟', 'A dice numbered 1 to 6 is rolled. What is the probability of getting a number greater than 4?'],
  o: [['1/2', '1/2'], ['1/6', '1/6'], ['2/3', '2/3'], ['1/3', '1/3']], a: 3,
  w: ['الأعداد الأكبر من 4 هي 5 و6 فقط: 2 من 6 = 1/3.', 'Only 5 and 6 are greater than 4: 2 out of 6 = 1/3.'],
  x: [['1/2 تعني 3 أعداد، والأكبر من 4 عددان فقط.', '1/2 would mean 3 numbers; only two are greater than 4.'], ['1/6 احتمال عدد واحد بعينه.', '1/6 is the chance of one particular number.'], ['2/3 احتمال عدد أصغر من 5 (1 إلى 4).', '2/3 is the chance of a number below 5 (1 to 4).'], 0] },

{ id: 'sm-prob-3', lv: 3, d: 'math', s: 'prac', t: 'word', k: 'prob', df: 3,
  q: ['رُميت قطعتا نقود معاً. ما احتمال ظهور «صورة» على إحداهما و«كتابة» على الأخرى؟', 'Two coins are tossed together. What is the probability of getting one head and one tail?'],
  o: [['1/3', '1/3'], ['1/2', '1/2'], ['1/4', '1/4'], ['3/4', '3/4']], a: 1,
  w: ['النتائج الممكنة أربع متساوية: (ص، ص) ، (ص، ك) ، (ك، ص) ، (ك، ك). منها نتيجتان فيهما صورة وكتابة: 2/4 = 1/2.', 'There are four equally likely outcomes: HH, HT, TH, TT. Two of them have one head and one tail: 2/4 = 1/2.'],
  x: [['هذا يعدّ النتائج ثلاثاً (صورتان، كتابتان، مختلفتان) كأنها متساوية الاحتمال، والمختلفتان تحدث بطريقتين.', 'That counts three outcomes as if equally likely; “one of each” can happen in two ways.'], 0,
      ['1/4 احتمال ترتيب واحد فقط مثل (ص، ك).', '1/4 is the chance of one specific order, such as HT.'], ['3/4 احتمال ظهور صورة واحدة على الأقل.', '3/4 is the chance of at least one head.']] },

/* ---------- المساحة ---------- */
{ id: 'sm-area-1', lv: 1, d: 'math', s: 'prac', t: 'geometry', k: 'area', df: 2,
  f: MWF2.blocks([[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]]),
  q: ['مساحة كل مربع صغير 1 سم². ما مساحة الشكل كله؟', 'Each small square is 1 cm². What is the area of the whole shape?'],
  o: [['14 سم²', '14 cm²'], ['7 سم²', '7 cm²'], ['12 سم²', '12 cm²'], ['10 سم²', '10 cm²']], a: 2,
  w: ['في الشكل 3 صفوف في كل صف 4 مربعات: 3 × 4 = 12 مربعاً، فالمساحة 12 سم².', 'There are 3 rows of 4 squares: 3 × 4 = 12 squares, so the area is 12 cm².'],
  x: [['14 هو محيط الشكل (عدد الأضلاع الخارجية)، لا مساحته.', '14 is the perimeter (outside edges), not the area.'], ['هذا جمع 3 + 4 بدل ضربهما.', 'That adds 3 + 4 instead of multiplying.'], 0, ['عُدّ المربعات مرة أخرى صفاً صفاً.', 'Count the squares again row by row.']] },

{ id: 'sm-area-2', lv: 2, d: 'math', s: 'prac', t: 'geometry', k: 'area', df: 2,
  f: MWF2.blocks([[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3]]),
  q: ['الشكل مكوَّن من مربعات متطابقة، طول ضلع كل مربع 2 سم. ما مساحة الشكل؟', 'The shape is made of identical squares, each with sides of 2 cm. What is the area of the shape?'],
  o: [['28 سم²', '28 cm²'], ['14 سم²', '14 cm²'], ['56 سم²', '56 cm²'], ['80 سم²', '80 cm²']], a: 2,
  w: ['عدد المربعات 14 (4 في الأعلى + 10 في الأسفل)، ومساحة كل مربع 2 × 2 = 4 سم²؛ فالمساحة 14 × 4 = 56 سم².', 'There are 14 squares (4 on top + 10 below), each 2 × 2 = 4 cm², so the area is 14 × 4 = 56 cm².'],
  x: [['هذا ضرب عدد المربعات في طول الضلع (2) لا في مساحة المربع (4).', 'That multiplies by the side length (2) instead of each square’s area (4).'], ['14 عدد المربعات، لكن المربع الواحد مساحته 4 سم² لا 1.', '14 is the number of squares, but each square is 4 cm², not 1.'], 0, ['هذا يحسب الشكل مستطيلاً كاملاً (5 × 4 = 20 مربعاً)، لكن ركنه العلوي فارغ.', 'That treats it as a full 5 × 4 rectangle (20 squares), but its top corner is empty.']] },

{ id: 'sm-area-3', lv: 3, d: 'math', s: 'prac', t: 'geometry', k: 'area', df: 3,
  q: ['حديقة مستطيلة أبعادها 20 م × 15 م، يمتد بداخلها ممرّ عرضه 1 م بمحاذاة أضلاعها الأربعة. ما مساحة الممرّ؟', 'A rectangular garden is 20 m × 15 m. A path 1 m wide runs inside it along all four sides. What is the area of the path?'],
  o: [['70 م²', '70 m²'], ['66 م²', '66 m²'], ['234 م²', '234 m²'], ['35 م²', '35 m²']], a: 1,
  w: ['المساحة الكلية 20 × 15 = 300. الجزء الداخلي بعد الممر: (20 − 2) × (15 − 2) = 18 × 13 = 234. الممر = 300 − 234 = 66 م².', 'Total area 20 × 15 = 300. The inside part is (20 − 2) × (15 − 2) = 18 × 13 = 234. Path = 300 − 234 = 66 m².'],
  x: [['70 = المحيط × 1، وهذا يحسب الأركان الأربعة مرتين.', '70 = perimeter × 1, which counts the four corners twice.'], 0, ['234 مساحة الجزء الداخلي، لا الممر.', '234 is the inner part, not the path.'], ['35 نصف المحيط فقط.', '35 is only half the perimeter.']] },

/* ---------- المحيط ---------- */
{ id: 'sm-perim-1', lv: 1, d: 'math', s: 'prac', t: 'geometry', k: 'perim', df: 1,
  f: MWF2.rectDim('6 سم', '4 سم'),
  q: ['ما محيط المستطيل؟', 'What is the perimeter of the rectangle?'],
  o: [['10 سم', '10 cm'], ['20 سم', '20 cm'], ['24 سم', '24 cm'], ['16 سم', '16 cm']], a: 1,
  w: ['المحيط مجموع الأضلاع الأربعة: 6 + 4 + 6 + 4 = 20 سم.', 'The perimeter is all four sides: 6 + 4 + 6 + 4 = 20 cm.'],
  x: [['10 مجموع ضلعين فقط.', '10 adds only two sides.'], 0, ['24 هي المساحة (6 × 4) بالسنتيمتر المربع.', '24 is the area (6 × 4) in square centimetres.'], ['16 تحسب الضلع الطويل مرة واحدة فقط.', '16 counts one long side only once.']] },

{ id: 'sm-perim-2', lv: 2, d: 'math', s: 'prac', t: 'geometry', k: 'perim', df: 2,
  q: ['مربع محيطه 36 سم. ما مساحته؟', 'A square has a perimeter of 36 cm. What is its area?'],
  o: [['36 سم²', '36 cm²'], ['144 سم²', '144 cm²'], ['81 سم²', '81 cm²'], ['9 سم²', '9 cm²']], a: 2,
  w: ['للمربع 4 أضلاع متساوية: الضلع = 36 ÷ 4 = 9 سم، والمساحة 9 × 9 = 81 سم².', 'A square has 4 equal sides: side = 36 ÷ 4 = 9 cm, and area = 9 × 9 = 81 cm².'],
  x: [['المحيط والمساحة يتساويان رقمياً فقط عندما يكون الضلع 4.', 'Perimeter and area match only when the side is 4.'], ['هذا قسم المحيط على 3 فصار الضلع 12؛ للمربع 4 أضلاع.', 'That divides by 3, giving a side of 12; a square has 4 sides.'], 0, ['9 طول الضلع، لا المساحة.', '9 is the side length, not the area.']] },

{ id: 'sm-perim-3', lv: 3, d: 'math', s: 'prac', t: 'geometry', k: 'perim', df: 3,
  q: ['مستطيل أبعاده 6 سم × 5 سم، قُصّ من أحد أركانه مربع طول ضلعه 2 سم. ما محيط الشكل الناتج؟', 'A 6 cm × 5 cm rectangle has a 2 cm square cut from one corner. What is the perimeter of the new shape?'],
  o: [['18 سم', '18 cm'], ['22 سم', '22 cm'], ['26 سم', '26 cm'], ['30 سم', '30 cm']], a: 1,
  w: ['عند قصّ مربع من الركن نفقد ضلعين طولهما 2 + 2 من الحافة الخارجية، ونكسب ضلعين جديدين بالطول نفسه 2 + 2؛ فيبقى المحيط مثل المستطيل: 2 × (6 + 5) = 22 سم.', 'Cutting a corner square removes 2 + 2 cm of outside edge but adds two new edges of 2 + 2 cm, so the perimeter stays the same as the rectangle: 2 × (6 + 5) = 22 cm.'],
  x: [['هذا طرح الضلعين المقصوصين ونسيان الضلعين الجديدين.', 'That removes the cut edges but forgets the two new ones.'], 0, ['هذا أضاف الضلعين الجديدين دون طرح ما قُصّ. (26 أيضاً هي مساحة الشكل 30 − 4، فلا تخلط بينهما.)', 'That adds the new edges without removing the cut ones. (26 is also the area, 30 − 4 — do not mix them up.)'], ['30 هي مساحة المستطيل الأصلي (6 × 5)، والسؤال عن المحيط.', '30 is the original rectangle’s area (6 × 5); the question asks for the perimeter.']] },

/* ---------- المتتابعات العددية ---------- */
{ id: 'sm-numseq-1', lv: 1, d: 'math', s: 'prac', t: 'sequence', k: 'numseq', df: 1,
  q: ['ما العدد التالي:  4 ، 8 ، 12 ، 16 ، ؟', 'What comes next: 4, 8, 12, 16, ?'],
  o: [['18', '18'], ['24', '24'], ['20', '20'], ['32', '32']], a: 2,
  w: ['نضيف 4 في كل مرة: 16 + 4 = 20.', 'Add 4 each time: 16 + 4 = 20.'],
  x: [['هذا إضافة 2 فقط.', 'That adds only 2.'], ['هذا إضافة 8.', 'That adds 8.'], 0, ['هذا مضاعفة العدد، والقاعدة جمع 4.', 'That doubles; the rule is “add 4”.']] },

{ id: 'sm-numseq-2', lv: 2, d: 'math', s: 'prac', t: 'sequence', k: 'numseq', df: 1,
  q: ['ما العدد التالي:  1 ، 4 ، 9 ، 16 ، 25 ، ؟', 'What comes next: 1, 4, 9, 16, 25, ?'],
  o: [['30', '30'], ['36', '36'], ['34', '34'], ['49', '49']], a: 1,
  w: ['هذه مربعات الأعداد: 1² ، 2² ، 3² ، 4² ، 5²، فالتالي 6² = 36. (أو: الفروق 3، 5، 7، 9 ثم 11.)', 'These are square numbers 1², 2², 3², 4², 5², so next is 6² = 36. (Or: differences 3, 5, 7, 9, then 11.)'],
  x: [['هذا إضافة 5، والفروق تزداد.', 'That adds 5; the differences grow.'], 0, ['هذا إضافة 9 مثل الفرق السابق؛ الفرق التالي 11.', 'That repeats the last difference (9); the next is 11.'], ['49 = 7²، وتجاوزنا 6².', '49 = 7²; it skips 6².']] },

{ id: 'sm-numseq-3', lv: 3, d: 'math', s: 'prac', t: 'sequence', k: 'numseq', df: 2,
  q: ['ما العدد التالي:  2 ، 3 ، 5 ، 9 ، 17 ، ؟', 'What comes next: 2, 3, 5, 9, 17, ?'],
  o: [['25', '25'], ['34', '34'], ['31', '31'], ['33', '33']], a: 3,
  w: ['الفروق 1 ، 2 ، 4 ، 8 تتضاعف، فالفرق التالي 16: 17 + 16 = 33. (أو: كل حدّ = ضعف السابق − 1.)', 'The differences 1, 2, 4, 8 double, so the next is 16: 17 + 16 = 33. (Or: each term = double the previous − 1.)'],
  x: [['هذا تكرار الفرق 8.', 'That repeats the difference 8.'], ['هذا مضاعفة 17 دون طرح 1.', 'That doubles 17 without subtracting 1.'], ['هذا إضافة 14؛ لا توافق القاعدة.', 'That adds 14, which fits no rule here.'], 0] },

/* ---------- المتتابعة البصرية ---------- */
{ id: 'sm-visseq-1', lv: 1, d: 'math', s: 'prac', t: 'visual', k: 'visseq', df: 1,
  f: MWF2.seq([MWF2.pips(1), MWF2.pips(3), MWF2.pips(5)]),
  q: ['الأشكال تتغير بقاعدة من اليسار إلى اليمين. ما الشكل الذي يحل محل علامة الاستفهام؟', 'The figures change by a rule from left to right. Which figure replaces the question mark?'],
  o: [{ f: MWF2.opt(MWF2.pips(6)), ar: '6 نقاط', en: '6 dots' }, { f: MWF2.opt(MWF2.pips(7)), ar: '7 نقاط', en: '7 dots' }, { f: MWF2.opt(MWF2.pips(8)), ar: '8 نقاط', en: '8 dots' }, { f: MWF2.opt(MWF2.pips(5)), ar: '5 نقاط', en: '5 dots' }], a: 1,
  w: ['عدد النقاط يزيد 2 في كل خطوة: 1، 3، 5، ثم 7.', 'The dots go up by 2 each step: 1, 3, 5, then 7.'],
  x: [['6 زيادة بواحد فقط.', '6 adds only one.'], 0, ['8 زيادة بثلاث.', '8 adds three.'], ['5 تكرار للشكل الأخير.', '5 repeats the last figure.']] },

{ id: 'sm-visseq-2', lv: 2, d: 'math', s: 'prac', t: 'visual', k: 'visseq', df: 2,
  f: MWF2.seq([MWF2.poly(3), MWF2.poly(5), MWF2.poly(7)]),
  q: ['ما الشكل الذي يُكمل المتتابعة (من اليسار إلى اليمين)؟', 'Which figure completes the sequence (left to right)?'],
  o: [{ f: MWF2.opt(MWF2.poly(8)), ar: 'مثمّن (8 أضلاع)', en: 'octagon (8 sides)' }, { f: MWF2.opt(MWF2.poly(4)), ar: 'مربع (4 أضلاع)', en: 'square (4 sides)' }, { f: MWF2.opt(MWF2.poly(9)), ar: 'تُساعي (9 أضلاع)', en: 'nonagon (9 sides)' }, { f: MWF2.opt(MWF2.poly(6)), ar: 'سداسي (6 أضلاع)', en: 'hexagon (6 sides)' }], a: 2,
  w: ['عدد الأضلاع يزيد 2 في كل خطوة: 3، 5، 7، ثم 9.', 'The number of sides goes up by 2: 3, 5, 7, then 9.'],
  x: [['8 أضلاع زيادة بواحد فقط.', '8 sides adds only one.'], ['4 أضلاع نقص لا زيادة.', '4 sides goes backwards.'], 0, ['6 أضلاع أقل من الشكل الأخير.', '6 sides is fewer than the last figure.']] },

{ id: 'sm-visseq-3', lv: 3, d: 'math', s: 'prac', t: 'visual', k: 'visseq', df: 3,
  f: MWF2.seq([MWF2.pips(1), MWF2.pips(2, 'sq'), MWF2.pips(4), MWF2.pips(1, 'sq')]),
  q: ['المتتابعة من اليسار إلى اليمين. انتبه لعدد العناصر ونوعها معاً. ما الشكل التالي؟', 'The sequence runs left to right. Watch both the number and the type of the marks. What comes next?'],
  o: [{ f: MWF2.opt(MWF2.pips(2, 'sq')), ar: 'مربعان', en: '2 squares' }, { f: MWF2.opt(MWF2.pips(2)), ar: 'دائرتان', en: '2 circles' }, { f: MWF2.opt(MWF2.pips(8)), ar: '8 دوائر', en: '8 circles' }, { f: MWF2.opt(MWF2.pips(8, 'sq')), ar: '8 مربعات', en: '8 squares' }], a: 1,
  w: ['قاعدتان معاً: النوع يتناوب (دائرة، مربع، دائرة، مربع ← دائرة)، والعدد يدور في دورة 1، 2، 4 ثم يعود: 1، 2، 4، 1 ← 2. فالتالي دائرتان.', 'Two rules at once: the type alternates (circle, square, circle, square → circle), and the number cycles 1, 2, 4 and repeats: 1, 2, 4, 1 → 2. So next is two circles.'],
  x: [['العدد صحيح، لكن النوع يتناوب، وبعد المربع تأتي دائرة.', 'The number is right, but the type alternates: after a square comes a circle.'], 0,
      ['هذا يفترض أن العدد يتضاعف دائماً، لكنه عاد إلى 1 في الخانة الرابعة؛ إنها دورة لا مضاعفة.', 'That assumes doubling forever, but it went back to 1 in the fourth box: it is a cycle.'],
      ['العدد والنوع كلاهما غير صحيح.', 'Both the number and the type are wrong.']] },

/* ---------- المصفوفات ---------- */
{ id: 'sm-mmatrix-1', lv: 1, d: 'math', s: 'prac', t: 'visual', k: 'mmatrix', df: 2,
  f: MWF.matrix([MWF2.pips(1), MWF2.pips(2), MWF2.pips(3), MWF2.pips(1), MWF2.pips(2), MWF2.pips(3), MWF2.pips(1), MWF2.pips(2), null]),
  q: ['ما الذي يوضع مكان علامة الاستفهام؟', 'What goes in place of the question mark?'],
  o: [{ f: MWF2.opt(MWF2.pips(2)), ar: 'نقطتان', en: '2 dots' }, { f: MWF2.opt(MWF2.pips(4)), ar: '4 نقاط', en: '4 dots' }, { f: MWF2.opt(MWF2.pips(1)), ar: 'نقطة', en: '1 dot' }, { f: MWF2.opt(MWF2.pips(3)), ar: '3 نقاط', en: '3 dots' }], a: 3,
  w: ['كل صف من اليسار إلى اليمين: نقطة، ثم نقطتان، ثم 3 نقاط؛ فالعمود الأيمن كله 3 نقاط.', 'Each row, from left to right, has 1, then 2, then 3 dots, so the right-hand column is all 3 dots.'],
  x: [['النقطتان للعمود الأوسط.', '2 dots belong in the middle column.'], ['لا يوجد 4 في أي صف.', 'No row contains 4.'], ['النقطة الواحدة للعمود الأيسر.', '1 dot belongs in the left-hand column.'], 0] },

{ id: 'sm-mmatrix-2', lv: 2, d: 'math', s: 'prac', t: 'visual', k: 'mmatrix', df: 2,
  f: MWF.matrix([MWF.shp('circle', 'none'), MWF.shp('circle', 'half'), MWF.shp('circle', 'full'), MWF.shp('square', 'none'), MWF.shp('square', 'half'), MWF.shp('square', 'full'), MWF.shp('tri', 'none'), MWF.shp('tri', 'half'), null]),
  q: ['ما الشكل الذي يُكمل المصفوفة؟', 'Which figure completes the grid?'],
  o: [{ f: MWF.opt(MWF.shp('tri', 'half')), ar: 'مثلث نصف مظلل', en: 'half-shaded triangle' }, { f: MWF.opt(MWF.shp('tri', 'full')), ar: 'مثلث مظلل', en: 'shaded triangle' }, { f: MWF.opt(MWF.shp('square', 'full')), ar: 'مربع مظلل', en: 'shaded square' }, { f: MWF.opt(MWF.shp('tri', 'none')), ar: 'مثلث فارغ', en: 'empty triangle' }], a: 1,
  w: ['الصف يحدد الشكل (دائرة، مربع، مثلث)، والعمود يحدد التظليل من اليسار إلى اليمين (فارغ، نصف، كامل)؛ فالخانة: مثلث مظلل كاملاً.', 'The row sets the shape (circle, square, triangle) and the column sets the shading (empty, half, full): a fully shaded triangle.'],
  x: [['نصف التظليل للعمود الأوسط.', 'Half shading belongs to the middle column.'], 0, ['التظليل صحيح لكن الصف الثالث للمثلثات.', 'The shading is right, but the third row is triangles.'], ['الشكل الفارغ للعمود الأيسر.', 'Empty shapes belong to the left-hand column.']] },

{ id: 'sm-mmatrix-3', lv: 3, d: 'math', s: 'prac', t: 'visual', k: 'mmatrix', df: 3,
  f: MWF.matrix([MWF2.pips(1), MWF2.pips(2), MWF2.pips(3), MWF2.pips(1), MWF2.pips(3), MWF2.pips(4), MWF2.pips(2), MWF2.pips(1), null]),
  q: ['اكتشف العلاقة بين خانات كل صف. ما الذي يوضع مكان علامة الاستفهام؟', 'Find how the boxes in each row are related. What goes in place of the question mark?'],
  o: [{ f: MWF2.opt(MWF2.pips(2)), ar: 'نقطتان', en: '2 dots' }, { f: MWF2.opt(MWF2.pips(4)), ar: '4 نقاط', en: '4 dots' }, { f: MWF2.opt(MWF2.pips(3)), ar: '3 نقاط', en: '3 dots' }, { f: MWF2.opt(MWF2.pips(1)), ar: 'نقطة', en: '1 dot' }], a: 2,
  w: ['في كل صف: نقاط الخانة اليمنى = مجموع نقاط الخانتين الأخريين (1 + 2 = 3 ، 1 + 3 = 4)، إذن 2 + 1 = 3.', 'In each row the right-hand box = the sum of the other two (1 + 2 = 3, 1 + 3 = 4), so 2 + 1 = 3.'],
  x: [['هذا الفرق (2 − 1) لا المجموع، ولا يتفق مع الصفين الأولين.', 'That is the difference (2 − 1), which does not fit the first two rows.'],
      ['هذا نقل للعمود الثالث في الصف الثاني دون تطبيق القاعدة.', 'That copies the row above without applying the rule.'], 0,
      ['هذا تكرار للخانة الوسطى.', 'That repeats the middle box.']] },

/* ---------- قراءة الرسم البياني ---------- */
{ id: 'sm-graph-1', lv: 1, d: 'math', s: 'prac', t: 'graphs', k: 'graph', df: 1,
  f: MWF2.bars([['1', 5], ['2', 8], ['3', 3], ['4', 6]], 10, 2),
  q: ['يبيّن الرسم عدد الكتب التي قرأها أربعة طلاب (1، 2، 3، 4) في شهر. كم كتاباً قرأ الطالب 2 أكثر من الطالب 3؟', 'The chart shows how many books four students (1, 2, 3, 4) read in a month. How many more books did student 2 read than student 3?'],
  o: [['5', '5'], ['11', '11'], ['8', '8'], ['3', '3']], a: 0,
  w: ['الطالب 2 قرأ 8 كتب، والطالب 3 قرأ 3: الفرق 8 − 3 = 5.', 'Student 2 read 8 books and student 3 read 3: 8 − 3 = 5.'],
  x: [0, ['11 مجموعهما، والسؤال «كم أكثر» يطلب الفرق.', '11 is their total; “how many more” asks for the difference.'], ['8 عدد كتب الطالب 2 وحده.', '8 is student 2’s count only.'], ['3 عدد كتب الطالب 3 وحده.', '3 is student 3’s count only.']] },

{ id: 'sm-graph-2', lv: 2, d: 'math', s: 'prac', t: 'graphs', k: 'graph', df: 1,
  f: MWF2.bars([['1', 12], ['2', 16], ['3', 8], ['4', 20], ['5', 4]], 20, 4),
  q: ['يبيّن الرسم عدد الوجبات التي باعها مقصف المدرسة في خمسة أيام (1 إلى 5). ما متوسط ما باعه في اليوم؟', 'The chart shows meals sold by the school canteen over five days (1 to 5). What was the average number sold per day?'],
  o: [['60', '60'], ['16', '16'], ['12', '12'], ['10', '10']], a: 2,
  w: ['المجموع 12 + 16 + 8 + 20 + 4 = 60، والمتوسط 60 ÷ 5 = 12.', 'Total 12 + 16 + 8 + 20 + 4 = 60; average 60 ÷ 5 = 12.'],
  x: [['60 المجموع، ولم يُقسم على عدد الأيام.', '60 is the total, not divided by the number of days.'], ['16 قيمة اليوم الثاني فقط.', '16 is just day 2.'], 0, ['10 تنتج من القسمة على 6 بدل 5.', '10 comes from dividing by 6 instead of 5.']] },

{ id: 'sm-graph-3', lv: 3, d: 'math', s: 'prac', t: 'graphs', k: 'graph', df: 1,
  f: MWF2.bars([['1', 40], ['2', 60], ['3', 30], ['4', 70]], 80, 10),
  q: ['يبيّن الرسم عدد العبوات التي جمعتها أربعة فصول (1 إلى 4) في حملة إعادة تدوير. ما نسبة ما جمعه الفصل 4 من المجموع الكلي؟', 'The chart shows how many cans four classes (1 to 4) collected in a recycling drive. What percentage of the total did class 4 collect?'],
  o: [['70%', '70%'], ['35%', '35%'], ['28%', '28%'], ['40%', '40%']], a: 1,
  w: ['المجموع 40 + 60 + 30 + 70 = 200، والنسبة 70 ÷ 200 = 0.35 = 35%.', 'Total 40 + 60 + 30 + 70 = 200, and 70 ÷ 200 = 0.35 = 35%.'],
  x: [['70 عدد عبوات الفصل 4، لا نسبته من المجموع.', '70 is class 4’s count, not its share of the total.'], 0, ['هذا قسمة 70 على 250؛ راجع المجموع.', 'That divides 70 by 250; check the total.'], ['40% تنتج من القسمة على 175؛ المجموع 200.', '40% would need a total of 175; the total is 200.']] },

/* ---------- الترتيب المنطقي ---------- */
{ id: 'sm-order-1', lv: 1, d: 'math', s: 'prac', t: 'logic', k: 'order', df: 1,
  q: ['عليّ أطول من سعد، وسعد أطول من فهد. من الأقصر بينهم؟', 'Ali is taller than Saad, and Saad is taller than Fahd. Who is the shortest?'],
  o: [['عليّ', 'Ali'], ['سعد', 'Saad'], ['فهد', 'Fahd'], ['لا يمكن معرفة ذلك', 'cannot be known']], a: 2,
  w: ['الترتيب من الأطول: عليّ ثم سعد ثم فهد؛ فالأقصر فهد.', 'From tallest: Ali, then Saad, then Fahd — so Fahd is shortest.'],
  x: [['عليّ هو الأطول.', 'Ali is the tallest.'], ['سعد في الوسط: أقصر من عليّ وأطول من فهد.', 'Saad is in the middle.'], 0, ['المعطيات كافية لترتيب الثلاثة.', 'The facts are enough to order all three.']] },

{ id: 'sm-order-2', lv: 2, d: 'math', s: 'prac', t: 'logic', k: 'order', df: 3,
  q: ['في سباق خمسة عدّائين: نايف وصل أولاً، وسالم وصل قبل ماجد، وماجد وصل قبل عادل، وفهد وصل بعد عادل مباشرة. من وصل رابعاً؟', 'Five runners finish a race: Nayef is first, Salem finishes before Majid, Majid before Adel, and Fahd right after Adel. Who finishes fourth?'],
  o: [['ماجد', 'Majid'], ['فهد', 'Fahd'], ['سالم', 'Salem'], ['عادل', 'Adel']], a: 3,
  w: ['نايف في المركز 1. يبقى سالم ثم ماجد ثم عادل بهذا الترتيب، وفهد ملاصق لعادل بعده؛ فلا يتسع إلا: سالم 2، ماجد 3، عادل 4، فهد 5.', 'Nayef is 1st. Salem, Majid and Adel come in that order, with Fahd right after Adel, which only fits: Salem 2, Majid 3, Adel 4, Fahd 5.'],
  x: [['ماجد في المركز الثالث.', 'Majid is third.'], ['فهد بعد عادل مباشرة، فهو الخامس.', 'Fahd comes right after Adel, so he is fifth.'], ['سالم في المركز الثاني.', 'Salem is second.'], 0] },

{ id: 'sm-order-3', lv: 3, d: 'math', s: 'prac', t: 'logic', k: 'order', df: 2,
  q: ['أربعة صناديق (أ، ب، ج، د): «أ» أثقل من «ب»، و«ج» أخف من «د»، و«ب» أثقل من «د». أيّ العبارات صحيحة بالتأكيد؟', 'Four boxes (A, B, C, D): A is heavier than B, C is lighter than D, and B is heavier than D. Which statement must be true?'],
  o: [['«ب» أخف من «ج»', 'B is lighter than C'], ['«د» أثقل من «أ»', 'D is heavier than A'], ['«ج» أخف الصناديق', 'C is the lightest box'], ['«أ» و«ب» متساويان', 'A and B weigh the same']], a: 2,
  w: ['من الشروط: أ > ب > د > ج؛ فـ«ج» أخفّها.', 'From the facts: A > B > D > C, so C is the lightest.'],
  x: [['«ب» أثقل من «د»، و«د» أثقل من «ج»؛ إذن «ب» أثقل من «ج».', 'B > D and D > C, so B is heavier than C.'], ['«أ» أثقل من «ب» الذي هو أثقل من «د».', 'A is heavier than B, which is heavier than D.'], 0, ['«أ» أثقل من «ب» بنص السؤال.', 'A is heavier than B, as stated.']] },

/* ===================== الاستدلال العلمي والميكانيكي ===================== */

/* ---------- تصنيف الكائنات ---------- */
{ id: 'ss-organisms-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'organisms', df: 1,
  q: ['أيّ هذه الحيوانات من الحشرات؟', 'Which of these animals is an insect?'],
  o: [['العنكبوت', 'spider'], ['الدودة', 'worm'], ['النملة', 'ant'], ['الحلزون', 'snail']], a: 2,
  w: ['للحشرة 6 أرجل وجسم من ثلاثة أجزاء (رأس وصدر وبطن)، والنملة كذلك.', 'An insect has 6 legs and a body in three parts (head, thorax, abdomen) — like the ant.'],
  x: [['للعنكبوت 8 أرجل وجسمه من جزأين؛ فهو ليس حشرة.', 'A spider has 8 legs and two body parts, so it is not an insect.'], ['الدودة بلا أرجل.', 'A worm has no legs.'], 0, ['الحلزون رخويّ له صدفة، وليس له أرجل.', 'A snail is a mollusc with a shell and no legs.']] },

{ id: 'ss-organisms-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'organisms', df: 1,
  q: ['أيّ هذه الحيوانات من الزواحف؟', 'Which of these animals is a reptile?'],
  o: [['الضفدع', 'frog'], ['البطريق', 'penguin'], ['الحوت', 'whale'], ['السحلية', 'lizard']], a: 3,
  w: ['الزواحف جلدها جاف تغطيه حراشف، وتتنفس بالرئتين، وتضع بيضاً له قشرة، مثل السحلية.', 'Reptiles have dry, scaly skin, breathe with lungs and lay shelled eggs — like the lizard.'],
  x: [['الضفدع برمائي: جلده رطب أملس، ويبدأ حياته في الماء بخياشيم.', 'The frog is an amphibian: moist smooth skin, and it starts life in water with gills.'], ['البطريق طائر له ريش وإن كان لا يطير.', 'The penguin is a bird with feathers, even though it cannot fly.'], ['الحوت ثديي يرضع صغاره.', 'The whale is a mammal that nurses its young.'], 0] },

{ id: 'ss-organisms-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'organisms', df: 3,
  q: ['الخفاش والحمامة كلاهما يطير، لكن الخفاش يُصنَّف من الثدييات. ما الصفة التي تحسم هذا التصنيف؟', 'Both the bat and the pigeon fly, yet the bat is classed as a mammal. Which feature settles this?'],
  o: [['ينشط ليلاً', 'it is active at night'], ['يلد صغاره ويرضعها، وجسمه مغطى بالشعر', 'it gives birth, nurses its young and has fur'], ['أجنحته من جلد رقيق', 'its wings are made of thin skin'], ['يتغذى على الحشرات', 'it eats insects']], a: 1,
  w: ['الثدييات تُعرّف بالإرضاع (الغدد اللبنية) والشعر، والخفاش يلد ويرضع صغاره وله شعر.', 'Mammals are defined by nursing (milk glands) and hair; the bat gives birth, nurses its young and has fur.'],
  x: [['النشاط الليلي سلوك تشترك فيه حيوانات من فئات كثيرة كالبوم (طائر).', 'Being active at night is a behaviour shared by many groups, such as owls (birds).'], 0,
      ['شكل الجناح صفة مميزة للخفاش لكنها ليست أساس تصنيف الثدييات.', 'The wing’s structure is distinctive but is not what defines mammals.'],
      ['كثير من الطيور تأكل الحشرات أيضاً.', 'Many birds also eat insects.']] },

/* ---------- دورات الحياة ---------- */
{ id: 'ss-lifecycle-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'lifecycle', df: 1,
  q: ['يبدأ الضفدع حياته بيضة. ما المرحلة التي تأتي بعد البيضة مباشرة؟', 'A frog starts life as an egg. Which stage comes straight after the egg?'],
  o: [['الضفدع البالغ', 'adult frog'], ['أبو ذنيبة (الشرغوف)', 'tadpole'], ['اليرقة', 'caterpillar'], ['الشرنقة', 'cocoon']], a: 1,
  w: ['دورة حياة الضفدع: بيضة ← أبو ذنيبة يعيش في الماء ← ضفدع صغير ← ضفدع بالغ.', 'A frog’s life cycle: egg → tadpole living in water → froglet → adult frog.'],
  x: [['الضفدع البالغ آخر مرحلة لا ثانيها.', 'The adult is the last stage, not the second.'], 0, ['اليرقة مرحلة في حياة الفراشة.', 'The caterpillar is a butterfly stage.'], ['الشرنقة مرحلة في حياة الفراشة.', 'The cocoon is a butterfly stage.']] },

{ id: 'ss-lifecycle-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'lifecycle', df: 1,
  q: ['في أيّ مرحلة من دورة حياة الفراشة يأكل الكائن أوراق النبات بكثرة لينمو بسرعة؟', 'At which stage of a butterfly’s life cycle does the animal eat lots of leaves to grow quickly?'],
  o: [['البيضة', 'egg'], ['العذراء (الشرنقة)', 'pupa (chrysalis)'], ['اليرقة', 'caterpillar (larva)'], ['الفراشة البالغة', 'adult butterfly']], a: 2,
  w: ['اليرقة مرحلة الأكل والنمو؛ تأكل الأوراق باستمرار وتنسلخ مرات وهي تكبر.', 'The caterpillar is the eating-and-growing stage; it eats leaves constantly and moults as it grows.'],
  x: [['البيضة لا تأكل.', 'The egg does not eat.'], ['في العذراء لا يأكل الكائن؛ يتحوّل جسمه داخلها.', 'The pupa does not eat; its body changes inside.'], 0, ['الفراشة البالغة تتغذى على الرحيق بخرطومها، لا على الأوراق.', 'The adult sips nectar through its proboscis; it does not eat leaves.']] },

{ id: 'ss-lifecycle-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'lifecycle', df: 3,
  q: ['يمرّ الجراد بالمراحل: بيضة ← حورية ← حشرة بالغة. بمَ تختلف دورة حياته عن دورة حياة الفراشة؟', 'A grasshopper goes through: egg → nymph → adult. How does its life cycle differ from a butterfly’s?'],
  o: [['ليس فيها مرحلة عذراء (شرنقة)، والحورية تشبه البالغ', 'it has no pupa stage, and the nymph looks like the adult'], ['الجراد لا يضع بيضاً', 'grasshoppers do not lay eggs'], ['الحورية تعيش في الماء دائماً', 'the nymph always lives in water'], ['الجراد يمر بمراحل أكثر من الفراشة', 'grasshoppers have more stages than butterflies']], a: 0,
  w: ['الجراد تحوّله ناقص: الحورية تشبه البالغ وتكبر بالانسلاخ دون عذراء، أما الفراشة فتحوّلها كامل بأربع مراحل منها العذراء.', 'Grasshoppers have incomplete metamorphosis: the nymph resembles the adult and grows by moulting with no pupa; butterflies have complete metamorphosis with four stages including the pupa.'],
  x: [0, ['الدورة المذكورة تبدأ بالبيضة.', 'The cycle given starts with an egg.'], ['حوريات الجراد تعيش على اليابسة بين النباتات.', 'Grasshopper nymphs live on land among plants.'], ['العكس: للجراد ثلاث مراحل وللفراشة أربع.', 'The reverse: grasshoppers have three stages, butterflies four.']] },

/* ---------- أجهزة الجسم ---------- */
{ id: 'ss-body-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'body', df: 1,
  q: ['ما العضو الذي يضخّ الدم إلى جميع أجزاء الجسم؟', 'Which organ pumps blood to every part of the body?'],
  o: [['الرئتان', 'lungs'], ['المعدة', 'stomach'], ['الدماغ', 'brain'], ['القلب', 'heart']], a: 3,
  w: ['القلب عضلة تنقبض وتنبسط باستمرار فتدفع الدم في الأوعية الدموية.', 'The heart is a muscle that keeps squeezing and relaxing to push blood through the blood vessels.'],
  x: [['الرئتان للتنفس وتبادل الغازات.', 'The lungs are for breathing and gas exchange.'], ['المعدة لهضم الطعام.', 'The stomach digests food.'], ['الدماغ يتحكم في الجسم لكنه لا يضخ الدم.', 'The brain controls the body but does not pump blood.'], 0] },

{ id: 'ss-body-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'body', df: 1,
  q: ['عند الركض بسرعة يزداد معدل التنفس ونبض القلب. ما السبب؟', 'When you run fast, your breathing and heart rate go up. Why?'],
  o: [['لإيصال كمية أكبر من الأكسجين إلى العضلات', 'to deliver more oxygen to the muscles'], ['لأن الجسم يبرد', 'because the body is cooling down'], ['لأن الرئتين تكبران أثناء الركض', 'because the lungs grow while running'], ['لهضم الطعام أسرع', 'to digest food faster']], a: 0,
  w: ['العضلات العاملة تحتاج طاقة أكثر، والطاقة تُنتج بالأكسجين؛ فيعمل الجهازان التنفسي والدوري أسرع لإيصاله.', 'Working muscles need more energy, which is released using oxygen, so the breathing and circulatory systems speed up to deliver it.'],
  x: [0, ['الجسم يسخن أثناء الركض لا يبرد.', 'The body heats up while running, not down.'], ['حجم الرئتين لا يتغير؛ الذي يتغير سرعة التنفس وعمقه.', 'Lung size does not change; the rate and depth of breathing do.'], ['الهضم يتباطأ أثناء الجهد البدني لا يتسارع.', 'Digestion slows during exercise rather than speeding up.']] },

{ id: 'ss-body-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'body', df: 3,
  q: ['أين يُمتص معظم الغذاء المهضوم إلى الدم؟', 'Where is most digested food absorbed into the blood?'],
  o: [['المعدة', 'stomach'], ['الأمعاء الغليظة', 'large intestine'], ['الأمعاء الدقيقة', 'small intestine'], ['المريء', 'oesophagus']], a: 2,
  w: ['جدار الأمعاء الدقيقة طويل ومليء بالخملات التي تزيد مساحة سطحه كثيراً، فيُمتص فيه معظم الغذاء المهضوم.', 'The small intestine is long and lined with villi that hugely increase its surface area, so most digested food is absorbed there.'],
  x: [['المعدة تهضم وتخلط الطعام، والامتصاص فيها قليل.', 'The stomach digests and mixes food; little is absorbed there.'], ['الأمعاء الغليظة تمتص الماء والأملاح أساساً.', 'The large intestine mainly absorbs water and salts.'], 0, ['المريء أنبوب ينقل الطعام إلى المعدة فقط.', 'The oesophagus just carries food to the stomach.']] },

/* ---------- السلاسل الغذائية ---------- */
{ id: 'ss-foodchain-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'foodchain', df: 1,
  q: ['في السلسلة الغذائية: عشب ← أرنب ← ثعلب. أيّها المُنتِج؟', 'In the food chain grass → rabbit → fox, which is the producer?'],
  o: [['الأرنب', 'rabbit'], ['العشب', 'grass'], ['الثعلب', 'fox'], ['الشمس', 'the Sun']], a: 1,
  w: ['المنتج يصنع غذاءه بنفسه من ضوء الشمس، والنباتات (كالعشب) هي المنتجات.', 'A producer makes its own food from sunlight, and plants such as grass are producers.'],
  x: [['الأرنب يأكل العشب، فهو مستهلك.', 'The rabbit eats grass, so it is a consumer.'], 0, ['الثعلب يأكل الأرنب، فهو مستهلك.', 'The fox eats the rabbit, so it is a consumer.'], ['الشمس مصدر الطاقة، لكنها ليست كائناً حياً في السلسلة.', 'The Sun is the energy source, but it is not a living part of the chain.']] },

{ id: 'ss-foodchain-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'foodchain', df: 2,
  q: ['في السلسلة: عشب ← جراد ← ضفدع ← ثعبان. ماذا يحدث غالباً لأعداد الجراد إذا اختفت الضفادع؟', 'In the chain grass → grasshopper → frog → snake, what usually happens to grasshoppers if the frogs disappear?'],
  o: [['تقلّ', 'they decrease'], ['تبقى كما هي', 'they stay the same'], ['تختفي فوراً', 'they vanish at once'], ['تزداد', 'they increase']], a: 3,
  w: ['الضفادع تأكل الجراد؛ فإذا اختفت قلّ ما يفترس الجراد فتزداد أعداده.', 'Frogs eat grasshoppers; without frogs, fewer grasshoppers are eaten, so their numbers rise.'],
  x: [['الذي يقلّ هو الثعابين لأنها فقدت غذاءها.', 'It is the snakes that decrease, having lost their food.'], ['اختفاء المفترس يؤثر في الفريسة.', 'Losing a predator affects its prey.'], ['لا سبب لاختفاء الجراد؛ غذاؤه (العشب) ما زال موجوداً.', 'There is no reason for grasshoppers to vanish; their food (grass) is still there.'], 0] },

{ id: 'ss-foodchain-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'foodchain', df: 3,
  q: ['في السلسلة: نبات ← أرنب ← ثعلب، يكون عدد الثعالب عادة أقل بكثير من عدد الأرانب. ما التفسير العلمي؟', 'In the chain plant → rabbit → fox, there are usually far fewer foxes than rabbits. What is the scientific reason?'],
  o: [['الثعالب تعيش عمراً أطول', 'foxes live longer'], ['معظم الطاقة تُستهلك أو تُفقد في كل مستوى، فيقلّ ما يصل إلى المستوى التالي', 'most energy is used or lost at each level, so less reaches the next'], ['الأرانب تأكل الثعالب الصغيرة', 'rabbits eat young foxes'], ['الثعالب لا تحتاج إلى طاقة كثيرة', 'foxes do not need much energy']], a: 1,
  w: ['عند انتقال الطاقة من مستوى إلى الذي يليه يُستهلك معظمها في الحركة والتنفس ويُفقد حرارةً، ولا ينتقل إلا جزء صغير (نحو 10%)؛ فلا تكفي الطاقة إلا عدداً أقل من المفترسات.', 'As energy passes up a level, most is used for movement and respiration or lost as heat; only a small part (about 10%) moves on, so it supports fewer predators.'],
  x: [['طول العمر لا يفسّر قلة العدد، بل قد يزيده.', 'A longer life does not explain fewer animals; if anything it would raise numbers.'], 0, ['الأرانب آكلة أعشاب.', 'Rabbits are herbivores.'], ['الثعالب حيوانات نشطة تحتاج طاقة كثيرة.', 'Foxes are active animals needing plenty of energy.']] },

/* ---------- تحولات المادة ---------- */
{ id: 'ss-matter-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'matter', df: 1,
  q: ['وضعت هند كوب ماء في المُجمِّد عدة ساعات. ماذا يحدث للماء؟', 'Hind put a cup of water in the freezer for several hours. What happens to the water?'],
  o: [['يتبخر', 'it evaporates'], ['يتجمد ويصبح صلباً', 'it freezes and becomes solid'], ['يغلي', 'it boils'], ['يختفي', 'it disappears']], a: 1,
  w: ['البرودة الشديدة تحوّل الماء من الحالة السائلة إلى الصلبة (جليد).', 'Strong cold turns water from liquid to solid (ice).'],
  x: [['التبخر يحتاج حرارة لا برودة.', 'Evaporation needs heat, not cold.'], 0, ['الغليان يحدث عند التسخين الشديد.', 'Boiling happens with strong heating.'], ['الماء لا يختفي؛ يتغير شكله فقط.', 'The water does not vanish; only its state changes.']] },

{ id: 'ss-matter-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'matter', df: 2,
  q: ['أيّ هذه التغيّرات تغيّر كيميائي (تتكوّن فيه مادة جديدة)؟', 'Which of these is a chemical change (a new substance is formed)?'],
  o: [['ذوبان السكر في الماء', 'sugar dissolving in water'], ['انصهار الشمع', 'wax melting'], ['تكسير الزجاج', 'glass breaking'], ['احتراق الورق', 'paper burning']], a: 3,
  w: ['احتراق الورق يكوّن مواد جديدة (رماد وغازات) ولا يمكن استرجاع الورق؛ فهو تغيّر كيميائي.', 'Burning paper forms new substances (ash and gases) and the paper cannot be recovered — a chemical change.'],
  x: [['السكر الذائب يبقى سكراً، ويمكن استرجاعه بتبخير الماء؛ تغيّر فيزيائي.', 'Dissolved sugar is still sugar and can be recovered by evaporating the water — physical.'], ['الشمع المنصهر يبقى شمعاً ويتصلب عند التبريد؛ تغيّر فيزيائي.', 'Melted wax is still wax and sets again when cooled — physical.'], ['الزجاج المكسور زجاج بشكل مختلف فقط.', 'Broken glass is still glass, just in pieces.'], 0] },

{ id: 'ss-matter-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'matter', df: 2,
  q: ['تتكوّن قطرات الندى على العشب في الصباح الباكر. ما سبب تكوّنها؟', 'Dew drops form on grass early in the morning. What causes them?'],
  o: [['صعود الماء من التربة عبر جذور العشب', 'water rising from the soil through the grass roots'], ['تكاثف بخار الماء الموجود في الهواء عند ملامسته سطحاً بارداً', 'water vapour in the air condensing on a cold surface'], ['سقوط مطر خفيف أثناء الليل', 'light rain falling during the night'], ['ذوبان الجليد المتكوّن على العشب', 'ice on the grass melting']], a: 1,
  w: ['يبرد العشب ليلاً، فيبرد الهواء الملامس له ولا يعود قادراً على حمل كل ما فيه من بخار، فيتكاثف البخار قطراتٍ على السطح.', 'Grass cools at night, cooling the air touching it until it cannot hold all its vapour, which condenses as drops on the surface.'],
  x: [['لو كان من التربة لظهر في كل الأوقات لا صباحاً فقط، وهو يظهر أيضاً على الأسطح غير الحية كالسيارات.', 'If it came from the soil it would appear at all times, and dew also forms on non-living surfaces such as cars.'], 0,
      ['يتكوّن الندى في الليالي الصافية دون مطر.', 'Dew forms on clear nights without rain.'], ['الندى يتكوّن عادة دون أن يتجمد الماء أولاً.', 'Dew usually forms without any ice forming first.']] },

/* ---------- خصائص الضوء ---------- */
{ id: 'ss-light-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'light', df: 1,
  q: ['لماذا يتكوّن ظلّ خلف الشجرة في يوم مشمس؟', 'Why is there a shadow behind a tree on a sunny day?'],
  o: [['لأن الشجرة تحجب ضوء الشمس', 'because the tree blocks the sunlight'], ['لأن الشجرة تصنع الظلام', 'because the tree makes darkness'], ['لأن الأرض باردة خلف الشجرة', 'because the ground behind the tree is cold'], ['لأن الضوء يلتف حول الشجرة', 'because light bends around the tree']], a: 0,
  w: ['الضوء يسير في خطوط مستقيمة، والجسم المعتم يمنع مروره، فتتكوّن منطقة لا يصلها الضوء هي الظل.', 'Light travels in straight lines; an opaque object stops it, leaving an area the light cannot reach — the shadow.'],
  x: [0, ['الظلام غياب الضوء، والشجرة لا تُنتجه.', 'Darkness is just the absence of light; the tree does not produce it.'], ['البرودة نتيجة للظل لا سبب له.', 'Coolness is a result of the shadow, not its cause.'], ['لو التفّ الضوء حولها لما تكوّن ظل واضح.', 'If light bent around it, there would be no clear shadow.']] },

{ id: 'ss-light-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'light', df: 2,
  q: ['وضع خالد قلماً في كوب ماء، فبدا القلم مكسوراً عند سطح الماء. ما السبب؟', 'Khalid put a pencil in a glass of water, and it looked broken at the water surface. Why?'],
  o: [['انعكاس الضوء عن سطح الماء', 'light reflecting off the water'], ['انكسار الضوء عند انتقاله بين الماء والهواء', 'light bending as it passes between water and air'], ['ذوبان جزء من القلم', 'part of the pencil dissolving'], ['امتصاص الماء للضوء', 'the water absorbing the light']], a: 1,
  w: ['يتغيّر اتجاه الضوء (ينكسر) عند انتقاله بين وسطين مختلفين كالماء والهواء، فيبدو الجزء المغمور في غير موضعه.', 'Light changes direction (refracts) when it passes between two different materials like water and air, so the submerged part appears shifted.'],
  x: [['الانعكاس يرجع الضوء إلى الوسط نفسه كالمرآة، ولا يجعل القلم يبدو مكسوراً.', 'Reflection bounces light back like a mirror; it does not make the pencil look broken.'], 0, ['القلم لا يذوب، ويعود سليماً عند إخراجه.', 'The pencil does not dissolve; it comes out whole.'], ['الامتصاص يُضعف الضوء ولا يغيّر شكل الأجسام.', 'Absorption dims light; it does not change shapes.']] },

{ id: 'ss-light-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'light', df: 3,
  q: ['نرى التفاحة حمراء في ضوء الشمس لأنها:', 'We see an apple as red in sunlight because it:'],
  o: [['تُصدر ضوءاً أحمر من داخلها', 'gives off red light of its own'], ['تمتص اللون الأحمر فقط', 'absorbs only red light'], ['تعكس اللون الأحمر وتمتص معظم الألوان الأخرى', 'reflects red light and absorbs most other colours'], ['تحوّل ضوء الشمس إلى لون أحمر', 'turns sunlight into red light']], a: 2,
  w: ['ضوء الشمس فيه كل الألوان، ولون الجسم هو اللون الذي يعكسه إلى عيوننا، والتفاحة تعكس الأحمر وتمتص غيره.', 'Sunlight contains all colours; an object’s colour is what it reflects to our eyes. The apple reflects red and absorbs the rest.'],
  x: [['التفاحة ليست مصدراً للضوء؛ لا نراها في الظلام.', 'The apple is not a light source; we cannot see it in the dark.'], ['ما يُمتص لا يصل إلى العين؛ فلو امتصت الأحمر لما رأيناه.', 'What is absorbed never reaches the eye; if it absorbed red we would not see red.'], 0, ['الجسم لا يغيّر لون الضوء؛ يعكس جزءاً منه فقط.', 'An object does not change light’s colour; it reflects part of it.']] },

/* ---------- الصوت ---------- */
{ id: 'ss-sound-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'sound', df: 1,
  q: ['يصدر الصوت من الطبل عندما:', 'A drum makes a sound when:'],
  o: [['يهتزّ جلده', 'its skin vibrates'], ['يسخن', 'it gets hot'], ['يتغيّر لونه', 'it changes colour'], ['يبقى ساكناً', 'it stays still']], a: 0,
  w: ['كل صوت ينتج عن اهتزاز؛ ضرب الطبل يجعل جلده يهتز فيهتز الهواء حوله.', 'Every sound comes from vibration; hitting the drum makes its skin vibrate, which makes the air vibrate.'],
  x: [0, ['الحرارة لا تُنتج الصوت.', 'Heat does not make sound.'], ['اللون لا علاقة له بالصوت.', 'Colour has nothing to do with sound.'], ['الجسم الساكن لا يُصدر صوتاً.', 'A still object makes no sound.']] },

{ id: 'ss-sound-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'sound', df: 1,
  q: ['لماذا لا يستطيع روّاد الفضاء على سطح القمر سماع بعضهم مباشرة دون أجهزة لاسلكية؟', 'Why can’t astronauts on the Moon hear each other directly without radios?'],
  o: [['لأن القمر بارد جداً', 'because the Moon is very cold'], ['لأن الجاذبية على القمر ضعيفة', 'because the Moon’s gravity is weak'], ['لأنه لا يوجد هواء ينقل الصوت', 'because there is no air to carry sound'], ['لأن الضوء أسرع من الصوت', 'because light is faster than sound']], a: 2,
  w: ['الصوت يحتاج إلى وسط (هواء أو ماء أو مادة صلبة) لينتقل، والقمر بلا غلاف جوي تقريباً.', 'Sound needs a medium (air, water or a solid) to travel, and the Moon has almost no atmosphere.'],
  x: [['البرودة لا تمنع انتقال الصوت؛ نسمع في الشتاء.', 'Cold does not stop sound; we hear in winter.'], ['الجاذبية لا علاقة لها بانتقال الصوت.', 'Gravity has nothing to do with carrying sound.'], 0, ['هذا صحيح لكنه لا يفسّر انعدام الصوت.', 'True, but it does not explain why there is no sound.']] },

{ id: 'ss-sound-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'sound', df: 3,
  q: ['أربع زجاجات متماثلة فيها كميات مختلفة من الماء. إذا نفخنا فوق فوهة كل زجاجة، فأيّها يُصدر أحدَّ صوت (أعلى طبقة)؟', 'Four identical bottles hold different amounts of water. If we blow across the top of each, which gives the highest-pitched sound?'],
  o: [['الزجاجة الفارغة', 'the empty bottle'], ['الزجاجة الأكثر ماءً', 'the bottle with the most water'], ['الزجاجة التي فيها نصفها ماء', 'the half-full bottle'], ['تتساوى كلها', 'they all sound the same']], a: 1,
  w: ['عند النفخ يهتز عمود الهواء فوق الماء؛ وكلما قصر العمود زاد تردده وحدّة صوته، وأقصر عمود في الزجاجة الأكثر ماءً. (أما عند الطرق على الزجاجات فالعكس، لأن الذي يهتز حينئذ هو الزجاج والماء.)', 'Blowing makes the air column above the water vibrate; the shorter the column, the higher the pitch — shortest in the fullest bottle. (Tapping gives the reverse, because then the glass and water vibrate.)'],
  x: [['الفارغة فيها أطول عمود هواء، فصوتها أغلظ.', 'The empty bottle has the longest air column, so the lowest pitch.'], 0, ['نصف الممتلئة في الوسط بين الحدّة والغلظة.', 'The half-full bottle is in between.'], ['اختلاف طول عمود الهواء يغيّر الطبقة.', 'Different air-column lengths change the pitch.']] },

/* ---------- الجاذبية ---------- */
{ id: 'ss-gravity-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'gravity', df: 1,
  q: ['لماذا تسقط الكرة إلى الأرض عندما نتركها من أيدينا؟', 'Why does a ball fall to the ground when we let go of it?'],
  o: [['لأن الهواء يدفعها إلى الأسفل', 'because the air pushes it down'], ['لأنها ثقيلة فقط', 'only because it is heavy'], ['لأن الأرض تجذبها إليها', 'because the Earth pulls it'], ['لأنها تريد الرجوع إلى الأرض', 'because it wants to go back to the ground']], a: 2,
  w: ['الأرض تجذب الأجسام نحو مركزها بقوة الجاذبية، فتسقط الأجسام إلى الأسفل.', 'The Earth pulls objects towards its centre by gravity, so they fall down.'],
  x: [['الهواء يقاوم السقوط ولا يسببه.', 'Air resists falling rather than causing it.'], ['الثقل نفسه ناتج عن جذب الأرض؛ والأجسام الخفيفة تسقط أيضاً.', 'Weight itself comes from Earth’s pull, and light objects fall too.'], 0, ['الأجسام لا «تريد»؛ القوة هي ما يحركها.', 'Objects do not “want”; a force moves them.']] },

{ id: 'ss-gravity-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'gravity', df: 2,
  q: ['سافر رائد فضاء من الأرض إلى القمر. ماذا يحدث لكتلته ووزنه؟', 'An astronaut travels from Earth to the Moon. What happens to his mass and his weight?'],
  o: [['تقل الكتلة ويبقى الوزن', 'mass decreases, weight stays the same'], ['يقل الاثنان', 'both decrease'], ['يبقيان كما هما', 'both stay the same'], ['تبقى الكتلة ويقل الوزن', 'mass stays the same, weight decreases']], a: 3,
  w: ['الكتلة مقدار ما في الجسم من مادة ولا تتغير بتغير المكان، أما الوزن فقوة جذب، وجاذبية القمر نحو سدس جاذبية الأرض.', 'Mass is the amount of matter and does not change with place; weight is a pull, and the Moon’s gravity is about one-sixth of Earth’s.'],
  x: [['هذا عكس الصحيح.', 'This is the reverse of the truth.'], ['جسمه لم يفقد شيئاً من مادته، فالكتلة لا تقل.', 'His body has lost no matter, so mass does not drop.'], ['الوزن يتغير لأن الجاذبية تغيّرت.', 'Weight changes because gravity changed.'], 0] },

{ id: 'ss-gravity-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'gravity', df: 1,
  q: ['أُسقطت كرة حديد وكرة خشب لهما الحجم نفسه من الارتفاع نفسه في اللحظة نفسها، مع إهمال مقاومة الهواء. أيّهما تصل إلى الأرض أولاً؟', 'An iron ball and a wooden ball of the same size are dropped from the same height at the same moment, ignoring air resistance. Which lands first?'],
  o: [['كرة الحديد لأنها أثقل', 'the iron ball, because it is heavier'], ['كرة الخشب لأنها أخف', 'the wooden ball, because it is lighter'], ['تصلان معاً', 'they land together'], ['يعتمد ذلك على لون الكرتين', 'it depends on their colours']], a: 2,
  w: ['دون مقاومة الهواء تتسارع كل الأجسام بالمعدل نفسه مهما اختلفت كتلتها، فتصلان معاً. (هذا ما بيّنه غاليليو.)', 'Without air resistance all objects speed up at the same rate whatever their mass, so they land together. (As Galileo showed.)'],
  x: [['الكرة الأثقل تُجذب بقوة أكبر، لكن تحريكها يحتاج قوة أكبر بالنسبة نفسها؛ فيتساوى التسارع.', 'The heavier ball is pulled harder, but it also needs proportionally more force to move, so the acceleration is equal.'], ['الخفة لا تجعل الجسم يسقط أسرع.', 'Being lighter does not make it fall faster.'], 0, ['اللون لا يؤثر في السقوط.', 'Colour does not affect falling.']] },

/* ---------- المغناطيسية ---------- */
{ id: 'ss-magnet-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'magnet', df: 1,
  q: ['قرّب سالم مغناطيساً من عدة أشياء. أيّها سينجذب إليه؟', 'Salem brings a magnet near some objects. Which will it attract?'],
  o: [['ورقة', 'a sheet of paper'], ['مسمار من الحديد', 'an iron nail'], ['قلم خشب', 'a wooden pencil'], ['ملعقة بلاستيك', 'a plastic spoon']], a: 1,
  w: ['المغناطيس يجذب الحديد وبعض الفلزات الأخرى، والمسمار من الحديد.', 'Magnets attract iron and a few other metals; the nail is iron.'],
  x: [['الورق لا ينجذب.', 'Paper is not attracted.'], 0, ['الخشب لا ينجذب.', 'Wood is not attracted.'], ['البلاستيك لا ينجذب.', 'Plastic is not attracted.']] },

{ id: 'ss-magnet-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'magnet', df: 1,
  q: ['قرّبت ريم القطب الشمالي لمغناطيس من القطب الشمالي لمغناطيس آخر. ماذا يحدث؟', 'Reem brings the north pole of one magnet near the north pole of another. What happens?'],
  o: [['يتجاذبان', 'they attract'], ['لا يحدث شيء', 'nothing happens'], ['يتنافران', 'they repel'], ['يفقدان مغناطيسيتهما', 'they lose their magnetism']], a: 2,
  w: ['الأقطاب المتشابهة تتنافر، والأقطاب المختلفة تتجاذب.', 'Like poles repel; unlike poles attract.'],
  x: [['التجاذب يحدث بين قطبين مختلفين (شمالي وجنوبي).', 'Attraction happens between different poles (north and south).'], ['تظهر قوة واضحة بين القطبين.', 'There is a clear force between the poles.'], 0, ['تقريب المغناطيسين لا يُفقدهما خاصيتهما.', 'Bringing them close does not remove their magnetism.']] },

{ id: 'ss-magnet-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'magnet', df: 2,
  q: ['كُسر مغناطيس مستقيم من منتصفه إلى قطعتين. ماذا نحصل عليه؟', 'A bar magnet is snapped in half. What do we get?'],
  o: [['قطعة فيها قطب شمالي فقط وأخرى فيها قطب جنوبي فقط', 'one piece with only a north pole and one with only a south pole'], ['قطعتان لا مغناطيسية فيهما', 'two non-magnetic pieces'], ['قطعة مغناطيسية وأخرى غير مغناطيسية', 'one magnetic piece and one non-magnetic'], ['مغناطيسان صغيران، لكلٍّ منهما قطب شمالي وقطب جنوبي', 'two smaller magnets, each with a north and a south pole']], a: 3,
  w: ['المغناطيس مكوّن من مناطق صغيرة كلٌّ منها مغناطيس؛ فكل قطعة تبقى مغناطيساً كاملاً بقطبين. لا يوجد قطب منفرد.', 'A magnet is made of tiny regions that are each magnets, so every piece is a whole magnet with two poles. A single pole never exists alone.'],
  x: [['لا يمكن فصل القطبين؛ يظهر قطبان جديدان عند الكسر.', 'Poles cannot be separated; new poles appear at the break.'], ['القطعتان تبقيان مغناطيسيتين.', 'Both pieces stay magnetic.'], ['القطعتان متماثلتان في الخاصية.', 'Both pieces behave the same.'], 0] },

/* ---------- انتقال الحرارة ---------- */
{ id: 'ss-heat-1', lv: 1, d: 'science', s: 'prac', t: 'concept', k: 'heat', df: 1,
  q: ['وُضعت ملعقة معدنية في كوب شاي ساخن، فسخن طرفها الخارجي بعد قليل. لماذا؟', 'A metal spoon was put in hot tea, and soon its outer end got hot. Why?'],
  o: [['لأن الحرارة انتقلت خلال المعدن', 'because heat travelled through the metal'], ['لأن الملعقة كانت ساخنة من قبل', 'because the spoon was already hot'], ['لأن الشاي صعد في الملعقة', 'because the tea climbed up the spoon'], ['لأن الهواء سخّن الملعقة', 'because the air heated the spoon']], a: 0,
  w: ['المعادن موصلة جيدة للحرارة، فتنتقل الحرارة من الطرف المغمور إلى الطرف الآخر بالتوصيل.', 'Metals conduct heat well, so heat travels from the dipped end to the other end by conduction.'],
  x: [0, ['النص يقول إنها سخنت «بعد قليل»، أي بعد وضعها.', 'It got hot “soon” after being put in, not before.'], ['الشاي لا يصعد في الملعقة.', 'The tea does not climb the spoon.'], ['الهواء أبرد من الشاي، والحرارة جاءت من الشاي عبر المعدن.', 'The air is cooler than the tea; the heat came from the tea through the metal.']] },

{ id: 'ss-heat-2', lv: 2, d: 'science', s: 'prac', t: 'concept', k: 'heat', df: 1,
  q: ['لماذا تُصنع مقابض القدور عادةً من البلاستيك أو الخشب؟', 'Why are pot handles usually made of plastic or wood?'],
  o: [['لأنهما أرخص من المعدن', 'because they are cheaper than metal'], ['لأنهما عازلان رديئا التوصيل للحرارة', 'because they are insulators that conduct heat poorly'], ['لأنهما يجعلان الطعام ينضج أسرع', 'because they make food cook faster'], ['لأنهما أثقل من المعدن', 'because they are heavier than metal']], a: 1,
  w: ['البلاستيك والخشب لا ينقلان الحرارة بسهولة، فيبقى المقبض بارداً نسبياً ولا تحترق اليد.', 'Plastic and wood do not pass heat easily, so the handle stays cool enough to hold.'],
  x: [['قد يكون ذلك صحيحاً أحياناً، لكنه ليس السبب العلمي للاختيار.', 'That may sometimes be true, but it is not the scientific reason.'], 0, ['المقبض لا يلامس الطعام ولا يؤثر في نضجه.', 'The handle does not touch the food or affect cooking.'], ['هما عادة أخف من المعدن.', 'They are usually lighter than metal.']] },

{ id: 'ss-heat-3', lv: 3, d: 'science', s: 'prac', t: 'concept', k: 'heat', df: 3,
  q: ['تُركَّب وحدة التكييف عادة في أعلى جدار الغرفة. ما السبب العلمي؟', 'Air-conditioning units are usually mounted high on a wall. What is the scientific reason?'],
  o: [['لحمايتها من الأطفال فقط', 'only to keep them away from children'], ['لأن الهواء البارد أكثف فيهبط، ويرتفع الهواء الدافئ فيحلّ محله (تيارات الحمل)', 'because cool air is denser and sinks while warm air rises to replace it (convection currents)'], ['لأن الهواء البارد يرتفع إلى السقف', 'because cool air rises to the ceiling'], ['لأن الحرارة تنتقل بالتوصيل عبر الجدار', 'because heat moves by conduction through the wall']], a: 1,
  w: ['الهواء البارد الخارج من أعلى يهبط لكثافته، ويدفع الهواء الدافئ إلى الأعلى نحو الجهاز؛ فتتكوّن تيارات حمل تبرّد الغرفة كلها.', 'Cool air from above sinks because it is denser, pushing warm air up towards the unit; these convection currents cool the whole room.'],
  x: [['قد يكون سبباً ثانوياً، لكنه لا يفسّر كفاءة التبريد.', 'That may be a minor reason, but it does not explain efficient cooling.'], 0, ['العكس هو الصحيح: الهواء البارد يهبط.', 'The reverse is true: cool air sinks.'], ['تبريد الغرفة يعتمد على حركة الهواء (الحمل) لا التوصيل عبر الجدار.', 'Cooling the room relies on air movement (convection), not conduction through the wall.']] },

/* ---------- منهج العلم والتجارب ---------- */
{ id: 'ss-method-1', lv: 1, d: 'science', s: 'prac', t: 'data', k: 'method', df: 1,
  q: ['أرادت سارة أن تعرف: هل يذوب السكر أسرع في الماء الساخن أم البارد؟ ما الشيء الذي يجب أن يختلف بين الكوبين؟', 'Sara wants to know whether sugar dissolves faster in hot or cold water. What should be different between the two cups?'],
  o: [['كمية السكر', 'the amount of sugar'], ['حجم الكوب', 'the size of the cup'], ['كمية الماء', 'the amount of water'], ['درجة حرارة الماء', 'the water temperature']], a: 3,
  w: ['في التجربة العادلة نغيّر شيئاً واحداً فقط هو ما نريد دراسة أثره (درجة الحرارة)، ونُبقي كل شيء آخر متساوياً.', 'In a fair test we change only the one thing we are studying (temperature) and keep everything else equal.'],
  x: [['لو اختلفت كمية السكر لما عرفنا هل الفرق بسبب الحرارة أم الكمية.', 'If the sugar amount differed, we could not tell whether temperature or amount caused the difference.'], ['حجم الكوب يجب أن يبقى ثابتاً.', 'Cup size should stay the same.'], ['كمية الماء يجب أن تبقى ثابتة.', 'The amount of water should stay the same.'], 0] },

{ id: 'ss-method-2', lv: 2, d: 'science', s: 'prac', t: 'data', k: 'method', df: 3,
  q: ['أيّ العبارات الآتية فرضية علمية يمكن اختبارها بتجربة؟', 'Which statement is a scientific hypothesis that can be tested by experiment?'],
  o: [['الورود أجمل الأزهار', 'Roses are the most beautiful flowers'], ['تنمو النباتات أسرع كلما زادت ساعات تعرّضها للضوء', 'Plants grow faster the more hours of light they get'], ['أحبّ زراعة النباتات', 'I love growing plants'], ['النباتات كائنات حية', 'Plants are living things']], a: 1,
  w: ['الفرضية توقّع لعلاقة بين متغيرين يمكن قياسهما واختبارهما: ساعات الضوء (نغيّرها) وسرعة النمو (نقيسها).', 'A hypothesis predicts a relationship between two measurable variables: hours of light (changed) and growth rate (measured).'],
  x: [['الجمال رأي شخصي لا يُقاس بتجربة.', 'Beauty is an opinion that no experiment can measure.'], 0, ['هذا شعور شخصي لا فرضية.', 'This is a personal feeling, not a hypothesis.'], ['هذه حقيقة معروفة لا تتنبأ بعلاقة بين متغيرين.', 'This is a known fact; it predicts no relationship between variables.']] },

{ id: 'ss-method-3', lv: 3, d: 'science', s: 'prac', t: 'data', k: 'method', df: 3,
  q: ['اختبر طالب أثر نوع السماد في نمو نبات، فزرع نبتة واحدة لكل نوع وقاسها مرة واحدة. ما أهم تحسين لتجربته؟', 'A student tested how fertiliser type affects plant growth, using one plant per type and measuring once. What is the most important improvement?'],
  o: [['زيادة عدد النباتات لكل نوع وتكرار القياس', 'use more plants per type and repeat the measurements'], ['استخدام نوع واحد من السماد فقط', 'use only one fertiliser type'], ['سقي النباتات بكميات مختلفة', 'water the plants different amounts'], ['كتابة النتائج بقلم ملون', 'write the results in coloured pen']], a: 0,
  w: ['النبتة الواحدة قد تختلف لأسباب فردية (بذرة ضعيفة مثلاً)؛ تعدد العينات وتكرار القياس يجعلان النتيجة موثوقة وليست مصادفة.', 'One plant can differ for individual reasons (a weak seed, say); more samples and repeated measurements make the result reliable rather than chance.'],
  x: [0, ['بنوع واحد لا يمكن المقارنة بين الأسمدة أصلاً.', 'With one type there is nothing to compare.'], ['هذا يضيف متغيراً ثانياً يُفسد التجربة.', 'That adds a second variable and spoils the test.'], ['طريقة الكتابة لا تغيّر دقة النتائج.', 'How results are written does not change their accuracy.']] },

/* ---------- الاحتكاك ---------- */
{ id: 'ss-friction-1', lv: 1, d: 'science', s: 'prac', t: 'mech', k: 'friction', df: 1,
  q: ['دُحرجت الكرة نفسها بالقوة نفسها على أربعة أسطح. على أيّها تتدحرج أبعد مسافة؟', 'The same ball is rolled with the same push on four surfaces. On which does it roll farthest?'],
  o: [['العشب', 'grass'], ['الرمل', 'sand'], ['البلاط الأملس', 'smooth tiles'], ['السجاد', 'carpet']], a: 2,
  w: ['السطح الأملس احتكاكه قليل، فلا يُبطئ الكرة كثيراً، فتتدحرج أبعد.', 'A smooth surface has little friction, so it slows the ball less and it rolls farther.'],
  x: [['العشب خشن ويبطئ الكرة.', 'Grass is rough and slows the ball.'], ['الرمل احتكاكه كبير جداً.', 'Sand has a lot of friction.'], 0, ['السجاد خشن نسبياً ويبطئ الكرة.', 'Carpet is fairly rough and slows the ball.']] },

{ id: 'ss-friction-2', lv: 2, d: 'science', s: 'prac', t: 'mech', k: 'friction', df: 1,
  q: ['لماذا يُرشّ الرمل على الطرق المغطاة بالجليد في البلاد الباردة؟', 'Why is sand spread on icy roads in cold countries?'],
  o: [['لإذابة الجليد بسرعة', 'to melt the ice quickly'], ['لزيادة الاحتكاك فلا تنزلق السيارات', 'to increase friction so cars do not skid'], ['لتقليل الاحتكاك فتسير السيارات أسرع', 'to reduce friction so cars go faster'], ['لتدفئة الطريق', 'to warm the road']], a: 1,
  w: ['الجليد أملس واحتكاكه ضعيف، وحبيبات الرمل تجعل السطح خشناً فتمسك الإطارات بالطريق.', 'Ice is slippery with little friction; sand grains roughen the surface so tyres can grip.'],
  x: [['الرمل لا يذيب الجليد (الملح هو ما يُستخدم لذلك).', 'Sand does not melt ice (salt is used for that).'], 0, ['تقليل الاحتكاك على الجليد يزيد الانزلاق والخطر.', 'Less friction on ice means more skidding and danger.'], ['الرمل لا يدفئ الطريق.', 'Sand does not warm the road.']] },

{ id: 'ss-friction-3', lv: 3, d: 'science', s: 'prac', t: 'mech', k: 'friction', df: 2,
  q: ['تسخن يداك عندما تفركهما بسرعة. أيّ تحوّل للطاقة يحدث؟', 'Your hands get warm when you rub them quickly. Which energy change takes place?'],
  o: [['طاقة حرارية ← طاقة حركية', 'thermal → kinetic'], ['طاقة كيميائية ← طاقة ضوئية', 'chemical → light'], ['طاقة حركية ← طاقة حرارية بفعل الاحتكاك', 'kinetic → thermal, through friction'], ['طاقة صوتية ← طاقة حرارية', 'sound → thermal']], a: 2,
  w: ['حركة اليدين (طاقة حركية) تقاومها قوة الاحتكاك، فيتحول جزء منها إلى حرارة.', 'The motion of your hands (kinetic energy) is resisted by friction, which turns some of it into heat.'],
  x: [['هذا عكس ما يحدث؛ الحرارة ناتجة لا مصدر.', 'This is backwards; heat is the result, not the source.'], ['لا يصدر ضوء من فرك اليدين.', 'Rubbing hands gives off no light.'], 0, ['الصوت الخافت نتيجة جانبية، وليس مصدر الحرارة.', 'Any faint sound is a side effect, not the heat’s source.']] },

/* ---------- التروس ---------- */
{ id: 'ss-gears-1', lv: 1, d: 'science', s: 'prac', t: 'mech', k: 'gears', df: 3,
  f: MWF.gears([{ r: 50, t: 16, lb: '1' }, { r: 24, t: 8, lb: '2' }], true),
  q: ['الترسان متعاشقان. أيّهما يدور أسرع (يكمل دورات أكثر)؟', 'The two gears are meshed. Which turns faster (makes more turns)?'],
  o: [['الترس 1 الكبير', 'gear 1, the big one'], ['الترس 2 الصغير', 'gear 2, the small one'], ['يدوران بالسرعة نفسها', 'they turn at the same speed'], ['لا يدور أيٌّ منهما', 'neither turns']], a: 1,
  w: ['الأسنان تتحرك معاً في نقطة التلامس؛ وعندما يدور الكبير دورة واحدة (16 سنّاً) يدور الصغير (8 أسنان) دورتين.', 'The teeth move together where they touch; one turn of the big gear (16 teeth) turns the small gear (8 teeth) twice.'],
  x: [['الكبير يحتاج وقتاً أطول ليكمل دورته لأن أسنانه أكثر.', 'The big gear takes longer to complete a turn because it has more teeth.'], 0, ['يتساويان فقط إذا تساوى عدد الأسنان.', 'They match only when the tooth counts are equal.'], ['السهم يبيّن أن الترس 1 يدور.', 'The arrow shows gear 1 is turning.']] },

{ id: 'ss-gears-2', lv: 2, d: 'science', s: 'prac', t: 'mech', k: 'gears', df: 2,
  f: MWF.gears([{ r: 34, t: 10, lb: '1' }, { r: 34, t: 10, lb: '2' }, { r: 34, t: 10, lb: '3' }, { r: 34, t: 10, lb: '4' }], true),
  q: ['أربعة تروس متعاشقة في صف. إذا دار الترس 1 مع عقارب الساعة، فكيف يدور الترس 4؟', 'Four gears are meshed in a row. If gear 1 turns clockwise, how does gear 4 turn?'],
  o: [['مع عقارب الساعة', 'clockwise'], ['لا يدور', 'it does not turn'], ['عكس عقارب الساعة', 'anticlockwise'], ['يتوقف ثم يعود', 'it stops and reverses']], a: 2,
  w: ['كل ترس يعكس اتجاه جاره: 1 مع، 2 عكس، 3 مع، 4 عكس. القاعدة: الترتيب الزوجي عكس الأول.', 'Each gear reverses its neighbour: 1 clockwise, 2 anti, 3 clockwise, 4 anti. Even-numbered gears turn opposite to the first.'],
  x: [['هذا اتجاه الترسين 1 و3 (الفرديين).', 'That is the direction of gears 1 and 3 (the odd ones).'], ['التروس المتعاشقة في صف تدور كلها.', 'Gears meshed in a row all turn.'], 0, ['لا شيء يجعل الترس يعكس حركته من تلقاء نفسه.', 'Nothing makes a gear reverse by itself.']] },

{ id: 'ss-gears-3', lv: 3, d: 'science', s: 'prac', t: 'mech', k: 'gears', df: 3,
  q: ['ترس A له 30 سنّاً يتعاشق مع ترس B له 20 سنّاً. إذا دار A أربع دورات، كم دورة يدور B؟', 'Gear A has 30 teeth and meshes with gear B, which has 20 teeth. If A turns 4 times, how many times does B turn?'],
  o: [['4', '4'], ['6', '6'], ['حوالي 2.7', 'about 2.7'], ['8', '8']], a: 1,
  w: ['عدد الأسنان التي تمر = 30 × 4 = 120 سنّاً، وكل دورة للترس B تحتاج 20 سنّاً: 120 ÷ 20 = 6 دورات.', 'Teeth passing = 30 × 4 = 120; each turn of B needs 20 teeth: 120 ÷ 20 = 6 turns.'],
  x: [['الترسان لا يدوران بعدد الدورات نفسه لاختلاف عدد أسنانهما.', 'They do not make the same number of turns because their tooth counts differ.'], 0, ['هذا قلب للنسبة (20 × 4 ÷ 30)؛ الترس الأصغر يدور أكثر لا أقل.', 'That inverts the ratio (20 × 4 ÷ 30); the smaller gear turns more, not less.'], ['هذا مضاعفة دورات A دون استخدام نسبة الأسنان.', 'That just doubles A’s turns without using the tooth ratio.']] },

/* ---------- البكرات ---------- */
{ id: 'ss-pulleys-1', lv: 1, d: 'science', s: 'prac', t: 'mech', k: 'pulleys', df: 1,
  f: MWF2.fixedPulley('10'),
  q: ['بكرة ثابتة في السقف. إذا سحبنا طرف الحبل إلى الأسفل كما يبين السهم، فإلى أين يتحرك الصندوق؟', 'A fixed pulley hangs from the ceiling. If we pull the rope down as the arrow shows, which way does the box move?'],
  o: [['إلى الأعلى', 'up'], ['إلى الأسفل', 'down'], ['إلى الجانب', 'sideways'], ['لا يتحرك', 'it does not move']], a: 0,
  w: ['البكرة الثابتة تغيّر اتجاه القوة: نسحب إلى الأسفل فيرتفع الحمل إلى الأعلى.', 'A fixed pulley changes the direction of the force: pulling down lifts the load up.'],
  x: [0, ['الحبل يمر فوق البكرة، فيتحرك طرفاه في اتجاهين متعاكسين.', 'The rope passes over the pulley, so its two ends move in opposite directions.'], ['الحبل رأسي فلا حركة جانبية.', 'The rope is vertical, so there is no sideways motion.'], ['الحبل مشدود، فالسحب يحرك الصندوق.', 'The rope is tight, so pulling moves the box.']] },

{ id: 'ss-pulleys-2', lv: 2, d: 'science', s: 'prac', t: 'mech', k: 'pulleys', df: 3,
  f: MWF.pulley('60'),
  q: ['بكرة متحركة ترفع حملاً كما في الشكل (طرف الحبل الآخر مثبت في السقف). لرفع الحمل مسافة 1 متر، كم متراً من الحبل يجب سحبه؟', 'A movable pulley lifts a load as shown (the rope’s other end is fixed to the ceiling). To raise the load 1 metre, how much rope must be pulled?'],
  o: [['نصف متر', 'half a metre'], ['متر واحد', '1 metre'], ['متران', '2 metres'], ['4 أمتار', '4 metres']], a: 2,
  w: ['الحمل معلّق بجزأين من الحبل؛ ليرتفع متراً يجب أن يقصر كل جزء متراً، فنسحب 2 متر. البكرة المتحركة تنصّف القوة لكنها تضاعف المسافة.', 'The load hangs on two rope segments; to rise 1 m each must shorten by 1 m, so we pull 2 m. A movable pulley halves the force but doubles the distance.'],
  x: [['هذا يعني أننا نوفر في القوة والمسافة معاً، وهذا مستحيل.', 'That would save both force and distance, which is impossible.'], ['هذا صحيح في البكرة الثابتة فقط.', 'That is true only for a fixed pulley.'], 0, ['هذا لنظام فيه أربعة أجزاء حبل تحمل الحمل.', 'That is for a system with four supporting rope segments.']] },

{ id: 'ss-pulleys-3', lv: 3, d: 'science', s: 'prac', t: 'mech', k: 'pulleys', df: 3,
  q: ['نظام بكرات يحمل فيه الحملَ 4 أجزاء من الحبل. ما أقل قوة تلزم لرفع حمل وزنه 400 نيوتن (بإهمال الاحتكاك ووزن البكرات)؟', 'In a pulley system, the load is held by 4 rope segments. What is the least force needed to lift a 400 N load (ignoring friction and pulley weight)?'],
  o: [['400 نيوتن', '400 N'], ['200 نيوتن', '200 N'], ['1600 نيوتن', '1600 N'], ['100 نيوتن', '100 N']], a: 3,
  w: ['يتوزع الوزن على أجزاء الحبل الحاملة بالتساوي: 400 ÷ 4 = 100 نيوتن. (وفي المقابل نسحب حبلاً أطول بأربع مرات.)', 'The load is shared equally by the supporting segments: 400 ÷ 4 = 100 N. (In return, four times as much rope is pulled.)'],
  x: [['هذا دون أي فائدة ميكانيكية، كالبكرة الثابتة.', 'That has no mechanical advantage, like a fixed pulley.'], ['هذا لجزأين حاملين فقط.', 'That is for only two supporting segments.'], ['البكرات تقلل القوة ولا تضاعفها.', 'Pulleys reduce the force; they do not multiply it.'], 0] },

/* ---------- الرافعة والتوازن ---------- */
{ id: 'ss-lever-1', lv: 1, d: 'science', s: 'prac', t: 'mech', k: 'lever', df: 2,
  f: MWF2.lever([{ w: '2', d: 1 }], [{ w: '2', d: 4 }]),
  q: ['على لوح التوازن كتلتان متساويتان: واحدة قريبة من المحور والأخرى بعيدة عنه. ماذا يحدث للوح؟', 'Two equal masses sit on a seesaw: one near the pivot and one far from it. What happens to the seesaw?'],
  o: [['يبقى متوازناً', 'it stays balanced'], ['يميل جهة الكتلة القريبة', 'it tips towards the near mass'], ['يميل جهة الكتلة البعيدة', 'it tips towards the far mass'], ['ينكسر', 'it breaks']], a: 2,
  w: ['أثر الكتلة يزيد كلما بعدت عن المحور؛ فالكتلة البعيدة تُميل اللوح نحوها.', 'A mass has more turning effect the farther it is from the pivot, so the far one tips the seesaw.'],
  x: [['التوازن يحتاج المسافتين متساويتين عند تساوي الكتلتين.', 'Equal masses balance only at equal distances.'], ['القريبة أثرها أضعف.', 'The near mass has the weaker effect.'], 0, ['لا يوجد ما يدل على أن الحمل ثقيل إلى حد الكسر.', 'Nothing suggests the load could break it.']] },

{ id: 'ss-lever-2', lv: 2, d: 'science', s: 'prac', t: 'mech', k: 'lever', df: 3,
  f: MWF.seesaw([{ w: '6', d: 2 }], [{ w: '4', d: 3 }], 3),
  q: ['على يسار المحور كتلة 6 كغ على بُعد 2 م. إذا وُضعت كتلة 4 كغ على يمينه على بُعد 3 م كما في الشكل، فهل يتوازن اللوح؟', 'On the left, 6 kg sits 2 m from the pivot. If 4 kg is placed 3 m to the right as shown, does the seesaw balance?'],
  o: [['نعم، يتوازن', 'yes, it balances'], ['لا، يميل إلى اليسار', 'no, it tips left'], ['لا، يميل إلى اليمين', 'no, it tips right'], ['لا يمكن المعرفة دون وزن اللوح', 'cannot tell without the board’s weight']], a: 0,
  w: ['شرط التوازن: الكتلة × المسافة متساوية في الجهتين: 6 × 2 = 12 ، و4 × 3 = 12؛ فيتوازن.', 'Balance needs mass × distance equal on both sides: 6 × 2 = 12 and 4 × 3 = 12, so it balances.'],
  x: [0, ['الكتلة الأثقل على اليسار، لكن الأخف على اليمين أبعد بما يعوّضها تماماً.', 'The heavier mass is on the left, but the lighter one is far enough out to make up for it exactly.'], ['أثر اليمين 12 مثل أثر اليسار، لا أكبر منه.', 'The right side’s effect is 12, equal to the left’s, not bigger.'], ['اللوح متماثل حول المحور فلا يؤثر وزنه في التوازن.', 'The board is symmetric about the pivot, so its weight does not upset the balance.']] },

{ id: 'ss-lever-3', lv: 3, d: 'science', s: 'prac', t: 'mech', k: 'lever', df: 3,
  q: ['في عربة اليد ذات العجلة الواحدة: العجلة (نقطة الارتكاز) في الطرف، والحمل في الوسط، واليدان عند المقبضين. لماذا تسهّل رفع الحمل؟', 'In a wheelbarrow, the wheel (pivot) is at one end, the load in the middle and your hands at the handles. Why does it make lifting easier?'],
  o: [['لأن العجلة تقلل وزن الحمل', 'because the wheel reduces the load’s weight'], ['لأن الحمل أقرب إلى الأرض', 'because the load is nearer the ground'], ['لأن اليدين تتحركان مسافة أقل من الحمل', 'because your hands move less than the load'], ['لأن ذراع القوة (من العجلة إلى المقبض) أطول من ذراع الحمل', 'because the effort arm (wheel to handles) is longer than the load arm']], a: 3,
  w: ['في الرافعة: القوة × ذراعها = الحمل × ذراعه. ذراع القوة هنا أطول، فتكفي قوة أصغر من وزن الحمل لرفعه.', 'For a lever, effort × its arm = load × its arm. Here the effort arm is longer, so a force smaller than the load’s weight can lift it.'],
  x: [['وزن الحمل لا يتغير؛ الذي يتغير القوة اللازمة.', 'The load’s weight does not change; the force needed does.'], ['قرب الحمل من الأرض ليس سبب سهولة الرفع.', 'Being near the ground is not why lifting is easier.'], ['العكس: اليدان تتحركان مسافة أكبر من الحمل، وهذا ثمن توفير القوة.', 'The reverse: your hands move farther than the load — the price of saving force.'], 0] },

/* ===================== المرونة العقلية ===================== */

/* ---------- المقدمة غير الواقعية ---------- */
{ id: 'sf-counterfact-1', lv: 1, d: 'flex', s: 'prac', t: 'rules', k: 'counterfact', df: 1,
  q: ['افترض أن كل القطط تطير، وأن «لولو» قطة. ماذا نستنتج؟', 'Suppose all cats can fly, and Lulu is a cat. What follows?'],
  o: [['لولو لا تطير لأن القطط لا تطير', 'Lulu cannot fly, because cats do not fly'], ['لولو تطير', 'Lulu can fly'], ['لولو طائر', 'Lulu is a bird'], ['لا يمكن معرفة شيء عن لولو', 'nothing can be known about Lulu']], a: 1,
  w: ['في هذا النوع نقبل المقدمة كما هي ولو خالفت الواقع: كل القطط تطير، ولولو قطة؛ إذن لولو تطير.', 'In this type we accept the premise as given, even if it is not true in real life: all cats fly and Lulu is a cat, so Lulu flies.'],
  x: [['هذا رجوع إلى الواقع، والسؤال يطلب الاستنتاج من المقدمة المفترضة.', 'That goes back to real life; the question asks what follows from the premise.'], 0, ['المقدمة تقول إن لولو قطة، والطيران لا يجعلها طائراً.', 'The premise says Lulu is a cat; flying does not make her a bird.'], ['المقدمتان كافيتان للاستنتاج.', 'The two premises are enough to conclude.']] },

{ id: 'sf-counterfact-2', lv: 2, d: 'flex', s: 'prac', t: 'rules', k: 'counterfact', df: 2,
  q: ['افترض أن كل الأسماك تعيش على الأشجار، وأن كل ما يعيش على الأشجار له أجنحة. أيّ العبارات صحيحة وفق هذه المقدمات؟', 'Suppose all fish live in trees, and everything that lives in trees has wings. Which statement is true according to these premises?'],
  o: [['للأسماك أجنحة', 'fish have wings'], ['الأسماك تعيش في الماء', 'fish live in water'], ['كل ما له أجنحة سمك', 'everything with wings is a fish'], ['الأشجار تعيش في البحر', 'trees live in the sea']], a: 0,
  w: ['الأسماك تعيش على الأشجار، وكل ما يعيش على الأشجار له أجنحة؛ إذن للأسماك أجنحة.', 'Fish live in trees, and everything in trees has wings, so fish have wings.'],
  x: [0, ['هذه معلومة من الواقع تخالف المقدمة المفترضة.', 'That is a real-life fact that contradicts the given premise.'],
      ['هذا قلب للعبارة: كون الأسماك لها أجنحة لا يعني أن كل ذي جناح سمك.', 'That reverses the statement: fish having wings does not mean everything with wings is a fish.'],
      ['المقدمات لم تذكر شيئاً عن مكان الأشجار.', 'The premises say nothing about where trees live.']] },

{ id: 'sf-counterfact-3', lv: 3, d: 'flex', s: 'prac', t: 'rules', k: 'counterfact', df: 3,
  q: ['افترض أن الأسبوع ثمانية أيام: الأيام السبعة المعروفة بترتيبها من الأحد إلى السبت، ثم يوم ثامن اسمه «النور» بعد السبت. إذا كان اليوم الأحد، فأيّ يوم سيكون بعد 10 أيام؟', 'Suppose a week has eight days: the usual seven from Sunday to Saturday, then an eighth day called “Nour” after Saturday. If today is Sunday, what day will it be in 10 days?'],
  o: [['الأربعاء', 'Wednesday'], ['النور', 'Nour'], ['الاثنين', 'Monday'], ['الثلاثاء', 'Tuesday']], a: 3,
  w: ['الأسبوع الجديد يتكرر كل 8 أيام: بعد 8 أيام نعود إلى الأحد، ثم يومان: الاثنين ثم الثلاثاء.', 'The new week repeats every 8 days: after 8 days it is Sunday again, then two more days: Monday, Tuesday.'],
  x: [['هذا حساب بأسبوع من 7 أيام (7 + 3)، والمقدمة تفرض 8 أيام.', 'That uses a 7-day week (7 + 3); the premise sets 8 days.'], ['«النور» يأتي بعد 7 أيام من الأحد.', '“Nour” comes 7 days after Sunday.'], ['الاثنين بعد 9 أيام.', 'Monday is 9 days later.'], 0] },

/* ---------- الترميز ---------- */
{ id: 'sf-coding-1', lv: 1, d: 'flex', s: 'prac', t: 'codes', k: 'coding', df: 2,
  q: ['في رمز سري: ب = 2 ، ا = 1 ، ت = 3. كيف تُكتب كلمة «تاب»؟', 'In a secret code, B = 2, A = 1 and T = 3. How is the Arabic word “tāb” (T-A-B) written?'],
  o: [['213', '213'], ['321', '321'], ['312', '312'], ['132', '132']], a: 2,
  w: ['نستبدل الحروف بالترتيب: ت = 3 ، ا = 1 ، ب = 2 ؛ فتصبح 312.', 'Replace the letters in order: T = 3, A = 1, B = 2, giving 312.'],
  x: [['213 رمز كلمة «بات»: الحروف نفسها بترتيب آخر.', '213 spells B-A-T: the same letters in another order.'], ['هذا ترتيب الأرقام تنازلياً لا ترتيب الحروف.', 'That sorts the digits downwards instead of following the letters.'], 0, ['الحرف الأول «ت» رمزه 3 لا 1.', 'The first letter T is 3, not 1.']] },

{ id: 'sf-coding-2', lv: 2, d: 'flex', s: 'prac', t: 'codes', k: 'coding', df: 1,
  q: ['في رمز سري: تُعكس أرقام العدد، ثم يُضاف 1 إلى كل رقم. مثال: 123 ← 432. كيف يُكتب العدد 507؟', 'In a secret code the digits are reversed, then 1 is added to each digit. Example: 123 → 432. How is 507 written?'],
  o: [['618', '618'], ['816', '816'], ['705', '705'], ['806', '806']], a: 1,
  w: ['نعكس: 507 ← 705، ثم نضيف 1 لكل رقم: 7 ← 8 ، 0 ← 1 ، 5 ← 6؛ فيصبح 816.', 'Reverse: 507 → 705, then add 1 to each digit: 7→8, 0→1, 5→6, giving 816.'],
  x: [['هذا أضاف 1 دون عكس الترتيب.', 'That adds 1 without reversing.'], 0, ['هذا عكس الأرقام فقط دون إضافة 1.', 'That only reverses the digits.'], ['الصفر لم يُضف إليه 1.', 'The 0 did not get its 1 added.']] },

{ id: 'sf-coding-3', lv: 3, d: 'flex', s: 'prac', t: 'codes', k: 'coding', df: 3,
  q: ['صف من 4 مصابيح يمثّل عدداً: المصباح المضاء = 1 والمطفأ = 0، وقيم المصابيح من اليسار إلى اليمين: 8 ، 4 ، 2 ، 1. ما العدد الذي يمثّله الصف: (مضاء ، مطفأ ، مضاء ، مضاء) بالترتيب من اليسار؟', 'A row of 4 lamps shows a number: a lit lamp = 1, an unlit lamp = 0, and the lamps are worth 8, 4, 2, 1 from left to right. What number does (lit, unlit, lit, lit), read from the left, show?'],
  o: [['3', '3'], ['13', '13'], ['11', '11'], ['1011', '1011']], a: 2,
  w: ['نجمع قيم المصابيح المضاءة فقط: 8 + 2 + 1 = 11. (هذا هو النظام الثنائي الذي يعمل به الحاسوب.)', 'Add the values of the lit lamps only: 8 + 2 + 1 = 11. (This is the binary system computers use.)'],
  x: [['3 عدد المصابيح المضاءة، لا قيمتها.', '3 is how many lamps are lit, not their value.'], ['هذا قراءة القيم من اليمين إلى اليسار (8 + 4 + 1).', 'That reads the values from right to left (8 + 4 + 1).'], 0, ['هذا الرمز نفسه مكتوباً بالأرقام، لا العدد الذي يمثّله.', 'That is the code itself, not the number it stands for.']] },

/* ---------- القاعدة الخفية ---------- */
{ id: 'sf-hidden-1', lv: 1, d: 'flex', s: 'prac', t: 'codes', k: 'hidden', df: 1,
  q: ['آلة تحوّل الأعداد بقاعدة ثابتة:  3 ← 6 ، 5 ← 10 ، 7 ← 14. ماذا تُخرج إذا أدخلنا 9؟', 'A machine changes numbers by one rule: 3 → 6, 5 → 10, 7 → 14. What comes out if we put in 9?'],
  o: [['16', '16'], ['18', '18'], ['11', '11'], ['27', '27']], a: 1,
  w: ['القاعدة: تضاعف العدد (× 2): 9 × 2 = 18.', 'The rule is “double it” (× 2): 9 × 2 = 18.'],
  x: [['هذا إضافة 7، ولا تنطبق على الأمثلة (3 + 7 = 10 لا 6).', 'That adds 7, which does not fit the examples (3 + 7 = 10, not 6).'], 0, ['هذا إضافة 2.', 'That adds 2.'], ['هذا ضرب في 3.', 'That multiplies by 3.']] },

{ id: 'sf-hidden-2', lv: 2, d: 'flex', s: 'prac', t: 'codes', k: 'hidden', df: 3,
  q: ['قاعدة واحدة تحوّل كل زوج إلى عدد:  (4 ، 2) ← 12 ، (5 ، 3) ← 16 ، (6 ، 1) ← 14. ما ناتج (7 ، 2)؟', 'One rule turns each pair into a number: (4, 2) → 12, (5, 3) → 16, (6, 1) → 14. What does (7, 2) give?'],
  o: [['14', '14'], ['9', '9'], ['18', '18'], ['16', '16']], a: 2,
  w: ['القاعدة: (مجموع العددين) × 2: (4 + 2) × 2 = 12 ، (5 + 3) × 2 = 16 ، (6 + 1) × 2 = 14؛ إذن (7 + 2) × 2 = 18.', 'The rule is (sum) × 2: (4 + 2) × 2 = 12, (5 + 3) × 2 = 16, (6 + 1) × 2 = 14, so (7 + 2) × 2 = 18.'],
  x: [['هذا حاصل الضرب (7 × 2)، وهو لا يتفق مع (5 ، 3) ← 16.', 'That is the product (7 × 2), which fails for (5, 3) → 16.'], ['هذا المجموع دون مضاعفة.', 'That is the sum without doubling.'], 0, ['16 ناتج الزوج (5 ، 3).', '16 belongs to the pair (5, 3).']] },

{ id: 'sf-hidden-3', lv: 3, d: 'flex', s: 'prac', t: 'codes', k: 'hidden', df: 3,
  q: ['كل ثلاثة أعداد تعطي ناتجاً بالقاعدة نفسها:  (8 ، 6 ، 5) ← 9 ، (7 ، 9 ، 4) ← 12 ، (10 ، 3 ، 6) ← ؟', 'Each set of three numbers gives a result by the same rule: (8, 6, 5) → 9, (7, 9, 4) → 12, (10, 3, 6) → ?'],
  o: [['7', '7'], ['19', '19'], ['13', '13'], ['1', '1']], a: 0,
  w: ['القاعدة: الأول + الثاني − الثالث: 8 + 6 − 5 = 9 ، 7 + 9 − 4 = 12 ؛ إذن 10 + 3 − 6 = 7.', 'The rule is first + second − third: 8 + 6 − 5 = 9, 7 + 9 − 4 = 12, so 10 + 3 − 6 = 7.'],
  x: [0, ['19 مجموع الأعداد الثلاثة، ولا يتفق مع المثالين.', '19 is the total of all three, which fails the examples.'], ['هذا مجموع الأول والثاني دون طرح الثالث.', 'That adds the first two and forgets to subtract the third.'], ['هذا الأول − الثاني − الثالث، ولا يعطي 9 في المثال الأول.', 'That is first − second − third, which does not give 9 in the first example.']] },

/* ---------- أنماط الاتجاه ---------- */
{ id: 'sf-direction-1', lv: 1, d: 'flex', s: 'prac', t: 'perspective', k: 'direction', df: 1,
  f: MWF.arrowSeq([0, 180, 0]),
  q: ['الأسهم تتغير من اليسار إلى اليمين. ما اتجاه السهم مكان علامة الاستفهام؟', 'The arrows change from left to right. Which way does the arrow in place of the question mark point?'],
  o: [{ f: MWF.arrow(0), ar: 'إلى الأعلى', en: 'up' }, { f: MWF.arrow(90), ar: 'إلى اليمين', en: 'right' }, { f: MWF.arrow(180), ar: 'إلى الأسفل', en: 'down' }, { f: MWF.arrow(270), ar: 'إلى اليسار', en: 'left' }], a: 2,
  w: ['السهم ينقلب نصف دورة في كل خطوة: أعلى، أسفل، أعلى، ثم أسفل.', 'The arrow flips a half turn each step: up, down, up, then down.'],
  x: [['هذا تكرار للخانة السابقة دون قلب.', 'That repeats the previous box without flipping.'], ['الدوران هنا نصف دورة لا ربع دورة.', 'Each step is a half turn, not a quarter turn.'], 0, ['لم يظهر اتجاه أفقي في النمط.', 'No sideways direction appears in the pattern.']] },

{ id: 'sf-direction-2', lv: 2, d: 'flex', s: 'prac', t: 'perspective', k: 'direction', df: 2,
  f: MWF.arrowSeq([0, 45, 90]),
  q: ['السهم يدور بالقاعدة نفسها من اليسار إلى اليمين. ما الشكل التالي؟', 'The arrow turns by the same rule from left to right. What comes next?'],
  o: [{ f: MWF.arrow(90), ar: 'إلى اليمين', en: 'right' }, { f: MWF.arrow(180), ar: 'إلى الأسفل', en: 'down' }, { f: MWF.arrow(135), ar: 'مائل إلى أسفل اليمين', en: 'diagonally down-right' }, { f: MWF.arrow(45), ar: 'مائل إلى أعلى اليمين', en: 'diagonally up-right' }], a: 2,
  w: ['السهم يدور ثُمن دورة (45°) مع عقارب الساعة في كل خطوة: أعلى، أعلى اليمين، يمين، ثم أسفل اليمين.', 'The arrow turns an eighth of a turn (45°) clockwise each step: up, up-right, right, then down-right.'],
  x: [['هذا تكرار الخانة الأخيرة.', 'That repeats the last box.'], ['هذا دوران ربع دورة؛ القاعدة ثُمن دورة.', 'That is a quarter turn; the rule is an eighth.'], 0, ['هذا رجوع إلى الخلف.', 'That goes backwards.']] },

{ id: 'sf-direction-3', lv: 3, d: 'flex', s: 'prac', t: 'perspective', k: 'direction', df: 3,
  f: MWF.arrowSeq([0, 45, 135]),
  q: ['السهم يدور من اليسار إلى اليمين؛ انتبه لمقدار الدوران بين كل خانتين. ما الشكل التالي؟', 'The arrow turns from left to right; look at how much it turns between boxes. What comes next?'],
  o: [{ f: MWF.arrow(180), ar: 'إلى الأسفل', en: 'down' }, { f: MWF.arrow(225), ar: 'مائل إلى أسفل اليسار', en: 'diagonally down-left' }, { f: MWF.arrow(270), ar: 'إلى اليسار', en: 'left' }, { f: MWF.arrow(315), ar: 'مائل إلى أعلى اليسار', en: 'diagonally up-left' }], a: 2,
  w: ['مقدار الدوران يزيد: 45° ثم 90° ثم 135°. فالسهم ينتقل من 135° إلى 135° + 135° = 270°، أي إلى اليسار.', 'The turn keeps growing: 45°, then 90°, then 135°. So the arrow goes from 135° to 135° + 135° = 270°, pointing left.'],
  x: [['هذا دوران 45° فقط كالخطوة الأولى.', 'That is only a 45° turn, like the first step.'], ['هذا دوران 90° كالخطوة الثانية؛ الدوران يكبر في كل مرة.', 'That is a 90° turn, like the second step; the turn grows each time.'], 0, ['هذا دوران 180°، أكبر من المطلوب.', 'That is a 180° turn — too far.']] },

/* ---------- التخيّل المكاني ---------- */
{ id: 'sf-spatial2d-1', hl: 1, lv: 1, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial2d', df: 1,
  f: MWF2.mirror(MWF2.fshape(0)),
  q: ['ما صورة الشكل في المرآة (الخط الأحمر)؟', 'What does the shape look like in the mirror (the red line)?'],
  o: [{ f: MWF2.opt(MWF2.fshape(0)), ar: 'الشكل كما هو', en: 'the same shape' }, { f: MWF2.opt(MWF2.fshape(0, true)), ar: 'الشكل مقلوباً يميناً ويساراً', en: 'the shape flipped left-right' }, { f: MWF2.opt(MWF2.fshape(180)), ar: 'الشكل مقلوباً رأساً على عقب', en: 'the shape turned upside down' }, { f: MWF2.opt(MWF2.fshape(90)), ar: 'الشكل مدوّراً ربع دورة', en: 'the shape turned a quarter turn' }], a: 1,
  w: ['المرآة العمودية تقلب اليمين واليسار ولا تغيّر الأعلى والأسفل؛ فالأجزاء البارزة إلى اليمين تصبح إلى اليسار.', 'A vertical mirror swaps left and right but keeps top and bottom, so the parts sticking out to the right now stick out to the left.'],
  x: [['المرآة تقلب الشكل، فلا يبقى كما هو.', 'A mirror flips the shape, so it does not stay the same.'], 0, ['هذا دوران نصف دورة؛ المرآة العمودية لا تقلب الأعلى إلى الأسفل.', 'That is a half turn; a vertical mirror does not swap top and bottom.'], ['المرآة لا تُدوّر الشكل.', 'A mirror does not rotate the shape.']] },

{ id: 'sf-spatial2d-2', hl: 1, lv: 2, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial2d', df: 2,
  f: MWF2.opt(MWF2.flag(0)),
  q: ['دُوِّر العلم ربع دورة مع اتجاه عقارب الساعة. كيف يبدو؟', 'The flag is turned a quarter turn clockwise. What does it look like?'],
  o: [{ f: MWF2.opt(MWF2.flag(270)), ar: 'ربع دورة عكس عقارب الساعة', en: 'a quarter turn anticlockwise' }, { f: MWF2.opt(MWF2.flag(90)), ar: 'ربع دورة مع عقارب الساعة', en: 'a quarter turn clockwise' }, { f: MWF2.opt(MWF2.flag(180)), ar: 'نصف دورة', en: 'a half turn' }, { f: MWF2.opt(MWF2.flag(0, true)), ar: 'العلم مقلوباً في المرآة', en: 'the flag mirrored' }], a: 1,
  w: ['تتبّع رأس السارية: كان إلى الأعلى، وبعد ربع دورة مع عقارب الساعة يصبح إلى اليمين، والقماش يتدلى إلى الأسفل.', 'Follow the top of the pole: it pointed up, and after a quarter turn clockwise it points right, with the cloth hanging downwards.'],
  x: [['هذا دوران في الاتجاه المعاكس.', 'That turns the other way.'], 0, ['هذا دوران نصف دورة.', 'That is a half turn.'], ['هذا انعكاس في مرآة لا دوران.', 'That is a mirror image, not a rotation.']] },

{ id: 'sf-spatial2d-3', hl: 1, lv: 3, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial2d', df: 3,
  f: MWF2.opt(MWF2.fshape(0)),
  q: ['أيّ الأشكال الآتية لا يمكن الحصول عليه بتدوير الشكل الأصلي فقط (دون قلبه)؟', 'Which of these cannot be made just by rotating the original shape (without flipping it)?'],
  o: [{ f: MWF2.opt(MWF2.fshape(90)), ar: 'ربع دورة', en: 'a quarter turn' }, { f: MWF2.opt(MWF2.fshape(180)), ar: 'نصف دورة', en: 'a half turn' }, { f: MWF2.opt(MWF2.fshape(90, true)), ar: 'صورة مرآة مدوّرة', en: 'a rotated mirror image' }, { f: MWF2.opt(MWF2.fshape(270)), ar: 'ثلاثة أرباع دورة', en: 'a three-quarter turn' }], a: 2,
  w: ['ثلاثة أشكال تدويرات للأصل (ربع، نصف، ثلاثة أرباع دورة)، أما الشكل الثالث فصورة مرآة مدوّرة؛ ولا يمكن الوصول إلى صورة المرآة بالتدوير وحده.', 'Three figures are rotations of the original (a quarter, half and three-quarter turn); the third is a rotated mirror image, which no rotation alone can produce.'],
  x: [['هذا الأصل بعد ربع دورة.', 'This is the original after a quarter turn.'], ['هذا الأصل بعد نصف دورة.', 'This is the original after a half turn.'], 0, ['هذا الأصل بعد ثلاثة أرباع دورة.', 'This is the original after a three-quarter turn.']] },

/* ---------- التخيّل ثلاثي الأبعاد ---------- */
{ id: 'sf-spatial3d-1', lv: 1, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial3d', df: 3,
  f: MWF2.stack([[2, 1], [1, 1]]),
  q: ['كم مكعباً في الشكل؟ (لا توجد فراغات تحت أي مكعب)', 'How many cubes are in the figure? (There are no gaps under any cube.)'],
  o: [['4', '4'], ['6', '6'], ['3', '3'], ['5', '5']], a: 3,
  w: ['الطبقة السفلى 4 مكعبات (2 × 2)، وفوقها مكعب واحد: 4 + 1 = 5.', 'The bottom layer has 4 cubes (2 × 2), with 1 cube on top: 4 + 1 = 5.'],
  x: [['هذا عدد الأعمدة فقط؛ أحد الأعمدة فيه مكعبان.', 'That counts the columns only; one column has two cubes.'], ['لا يوجد إلا مكعب واحد في الطبقة العليا.', 'There is only one cube on the top layer.'], ['هذا يُهمل المكعب المخفي في الخلف.', 'That misses the hidden cube at the back.'], 0] },

{ id: 'sf-spatial3d-2', lv: 2, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial3d', df: 2,
  f: MWF2.stack([[3, 2, 1], [2, 1, 0], [1, 0, 0]]),
  q: ['كم مكعباً في الشكل؟ (كل مكعب يرتكز على مكعب أو على الأرض)', 'How many cubes are in the figure? (Each cube rests on another cube or on the floor.)'],
  o: [['6', '6'], ['10', '10'], ['9', '9'], ['12', '12']], a: 1,
  w: ['نعدّ الأعمدة بارتفاعاتها: 3 + 2 + 1 + 2 + 1 + 1 = 10. (أو طبقةً طبقة: 6 في الأسفل + 3 في الوسط + 1 في الأعلى.)', 'Count columns by height: 3 + 2 + 1 + 2 + 1 + 1 = 10 (or by layers: 6 + 3 + 1).'],
  x: [['هذا عدد المكعبات الظاهرة من الأعلى فقط.', 'That counts only the cubes visible from above.'], 0, ['تأكد من المكعب العلوي في العمود الأعلى.', 'Check the top cube of the tallest column.'], ['هذا يفترض مكعبات غير موجودة.', 'That assumes cubes that are not there.']] },

{ id: 'sf-spatial3d-3', lv: 3, d: 'flex', s: 'prac', t: 'imagine', k: 'spatial3d', df: 3,
  f: MWF2.stack([[3, 3, 2], [3, 2, 1], [2, 1, 1]]),
  q: ['كم مكعباً صغيراً يجب إضافته إلى الشكل ليصبح مكعباً كبيراً 3 × 3 × 3؟', 'How many small cubes must be added to make the figure a large 3 × 3 × 3 cube?'],
  o: [['9', '9'], ['18', '18'], ['27', '27'], ['7', '7']], a: 0,
  w: ['في الشكل 3 + 3 + 2 + 3 + 2 + 1 + 2 + 1 + 1 = 18 مكعباً، والمكعب الكبير يحتاج 27؛ فنضيف 27 − 18 = 9.', 'The figure has 3 + 3 + 2 + 3 + 2 + 1 + 2 + 1 + 1 = 18 cubes; the big cube needs 27, so add 27 − 18 = 9.'],
  x: [0, ['18 عدد المكعبات الموجودة، لا الناقصة.', '18 is how many are there, not how many are missing.'], ['27 عدد مكعبات المكعب الكامل.', '27 is the whole large cube.'], ['هذا يُهمل المكعبات المخفية الحاملة لغيرها.', 'That ignores the hidden cubes holding others up.']] },

];

/* تصنيف أسئلة الجزء الأول حسب المهارة والصعوبة (الافتراضي: مهارة النوع، وصعوبة حسب الموقع) */
const MW_SKILL_DEFAULT = { analogy: 'analogy', completion: 'complete', context: 'context', reading: 'reading', odd: 'odd-class', vocab: 'meaning',
  arith: 'ops', word: 'wordp', sequence: 'numseq', logic: 'order', spatial: 'mspatial', geometry: 'area', visual: 'visseq', graphs: 'graph',
  concept: 'matter', data: 'method', mech: 'lever', codes: 'coding', rules: 'switch', matrix: 'fmatrix', classify: 'fclass', perspective: 'persp', imagine: 'spatial2d' };
/* صعوبة أسئلة الجزء الأول (الباقي متوسط) */
const MW_DF_OLD = { '1v1': 1, '1v2': 1, '1v5': 1, '1v6': 1, '1v7': 1, '1m1': 1, '1m5': 1, '1s5': 1, '1f5': 1, '1f8': 1, '2v5': 1, '2m5': 1, '2s5': 1, '3v5': 1,
  '1m2': 3, '1m4': 3, '1m8': 3, '1f6': 3, '1s3': 3, '2m2': 3, '2m3': 3, '2m6': 3, '2f6': 3, '2f7': 3, '2s2': 3, '3m1': 3, '3m2': 3, '3m3': 3, '3m5': 3, '3f1': 3, '3f4': 3, '3s1': 3, '3s7': 3 };
/* المهارة، و«:النوع» إذا تغيّر نوع السؤال ليوافق المهارة */
const MW_SKILL_FIX = {
  '1m8': 'ages', '2m1': 'fractions', '2m2': 'ratio:arith', '2m5': 'percent', '2m6': 'ages:word', '3m2': 'prob:word', '3m5': 'percent', '3m6': 'perim', '2m8': 'area',
  '1s1': 'gears', '2s1': 'gears', '3s5': 'gears', '2s5': 'pulleys', '3s1': 'pulleys',
  '1s5': 'magnet', '1s7': 'sound', '2s4': 'electric', '2s7': 'heat', '3s3': 'gravity', '3s8': 'gravity',
  '3f1': 'hidden:codes', '2f6': 'hidden', '3f7': 'spatial3d:imagine'
};

if (typeof MW_BANK !== 'undefined') {
  MW_BANK.forEach(q => {
    if (!q.k) { const f = (MW_SKILL_FIX[q.id] || '').split(':'); q.k = f[0] || MW_SKILL_DEFAULT[q.t]; if (f[1]) q.t = f[1]; }
    if (!q.df) q.df = MW_DF_OLD[q.id] || 2;
  });
  MW_BANK.push(...MW_BANK2);
}
