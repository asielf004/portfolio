/* ==========================================================================
   حرف — المحتوى

   عشرون نصًا: قصص قصيرة ومقالات، من المبتدئ إلى المتمكّن. كل نص أسطر، وكل
   سطر إنجليزي ومعناه بالعربي، مع معاني الكلمات الصعبة فيه.
   الغلاف يُرسم برمجيًا من `hue` و`motif` — لا صور خارجية، فالتطبيق يعمل
   كاملًا بلا شبكة بعد أول فتحة.
   ========================================================================== */
(function (global) {
  'use strict';

  var LEVELS = [
    { id: 'a1', ar: 'مبتدئ',  en: 'A1', hue: 152 },
    { id: 'a2', ar: 'متوسط',  en: 'A2', hue: 190 },
    { id: 'b1', ar: 'متقدم',  en: 'B1–B2', hue: 213 },
    { id: 'c1', ar: 'متمكّن', en: 'C1', hue: 350 }
  ];

  var LANGS = [
    { id: 'en', ar: 'الإنجليزية', native: 'English', speech: 'en-US', hue: 213 },
    { id: 'fr', ar: 'الفرنسية',   native: 'Français', speech: 'fr-FR', hue: 275 }
  ];

  var KINDS = [
    { id: 'story',   ar: 'قصة',  arPl: 'قصص' },
    { id: 'article', ar: 'مقال', arPl: 'مقالات' }
  ];

  var TEXTS = [
    /* ==================================================== مبتدئ · A1 */

    /* ==================================================== متوسط · A2 */
    {
      id: 'coffee-breath', en: 'Coffee Breath', ar: 'رائحة القهوة',
      lang: 'en', level: 'a2', kind: 'story', free: true, hue: 30, motif: 'cup',
      blurb: 'رائحة تفتح الذاكرة أسرع من أي شيء آخر.',
      lines: [
        { en: 'The smell of coffee wakes the whole house.', ar: 'رائحة القهوة تُوقظ البيت كله.', w: { smell: 'رائحة', wakes: 'تُوقظ', whole: 'كامل' } },
        { en: 'My grandmother made it in a small pot.', ar: 'كانت جدتي تصنعها في إبريق صغير.', w: { grandmother: 'جدة', pot: 'إبريق' } },
        { en: 'She never measured anything.', ar: 'لم تكن تقيس أي شيء أبدًا.', w: { measured: 'تقيس', never: 'أبدًا' } },
        { en: 'She said her hands remembered.', ar: 'كانت تقول إن يديها تتذكّران.', w: { remembered: 'تتذكّر' } },
        { en: 'Now I make coffee the same way.', ar: 'الآن أصنع القهوة بالطريقة نفسها.', w: { same: 'نفسها' } },
        { en: 'It is never quite as good.', ar: 'لكنها ليست جيدة تمامًا مثلها.', w: { quite: 'تمامًا' } },
        { en: 'But the smell brings her back for a moment.', ar: 'لكن الرائحة تُعيدها للحظة.', w: { brings: 'تُعيد', moment: 'لحظة' } }
      ]
    },
    {
      id: 'when-the-show-ends', en: 'When the Show Ends', ar: 'حين ينتهي المسلسل',
      lang: 'en', level: 'a2', kind: 'story', free: false, hue: 250, motif: 'screen',
      blurb: 'الحلقة الأخيرة تنتهي، ولا تعرف ماذا تفعل بنفسك.',
      lines: [
        { en: 'You watch the last episode late at night.', ar: 'تُشاهد الحلقة الأخيرة في وقت متأخر من الليل.', w: { episode: 'حلقة', late: 'متأخر' } },
        { en: 'The screen goes dark and the room is quiet.', ar: 'تُظلم الشاشة وتصبح الغرفة هادئة.', w: { screen: 'شاشة', dark: 'مظلم' } },
        { en: 'You knew these people for weeks.', ar: 'عرفتَ هؤلاء الناس لأسابيع.', w: { knew: 'عرفتَ' } },
        { en: 'Now there is nothing left to watch.', ar: 'الآن لم يبقَ شيء لتشاهده.', w: { left: 'متبقٍّ' } },
        { en: 'It feels a little like saying goodbye.', ar: 'يبدو الأمر قليلًا مثل قول وداعًا.', w: { feels: 'يبدو، يُحسّ', goodbye: 'وداعًا' } },
        { en: 'Tomorrow you will find another story.', ar: 'غدًا ستجد قصة أخرى.', w: { another: 'أخرى' } },
        { en: 'But tonight the quiet is strange.', ar: 'لكن الليلة يبدو الهدوء غريبًا.', w: { strange: 'غريب' } }
      ]
    },
    {
      id: 'seahorses', en: 'Seahorses', ar: 'أحصنة البحر',
      lang: 'en', level: 'a2', kind: 'article', free: false, hue: 320, motif: 'waves',
      blurb: 'سمكة برأس حصان وذيل قرد — ومَن يحمل البيض فيها هو الأب.',
      lines: [
        { en: 'A seahorse is a fish, but it does not look like one.', ar: 'حصان البحر سمكة، لكنه لا يبدو كذلك.', w: { seahorse: 'حصان البحر' } },
        { en: 'It swims upright, very slowly.', ar: 'يسبح منتصبًا، ببطء شديد.', w: { swims: 'يسبح', upright: 'منتصبًا' } },
        { en: 'Its tail can hold onto grass under the water.', ar: 'يستطيع ذيله أن يتمسّك بالأعشاب تحت الماء.', w: { tail: 'ذيل', hold: 'يمسك' } },
        { en: 'Each eye moves on its own.', ar: 'كل عين تتحرّك وحدها.', w: { eye: 'عين', own: 'وحدها' } },
        { en: 'The most surprising part is the father.', ar: 'الجزء الأكثر إدهاشًا هو الأب.', w: { surprising: 'مُدهش' } },
        { en: 'He carries the eggs, not the mother.', ar: 'هو من يحمل البيض، لا الأم.', w: { carries: 'يحمل', eggs: 'بيض' } },
        { en: 'Then hundreds of tiny seahorses swim away.', ar: 'ثم تسبح مئات من أحصنة البحر الصغيرة بعيدًا.', w: { hundreds: 'مئات', tiny: 'صغير جدًا' } }
      ]
    },
    {
      id: 'why-we-yawn', en: 'Why We Yawn', ar: 'لماذا نتثاءب',
      lang: 'en', level: 'a2', kind: 'article', free: false, hue: 45, motif: 'cells',
      blurb: 'كل الناس تتثاءب، ولا أحد متأكد تمامًا من السبب.',
      lines: [
        { en: 'Everyone yawns, even babies before birth.', ar: 'كل الناس يتثاءبون، حتى الأجنّة قبل الولادة.', w: { yawns: 'يتثاءب', birth: 'ولادة' } },
        { en: 'For a long time people said it brings more oxygen.', ar: 'لوقت طويل قال الناس إنه يجلب أكسجين أكثر.', w: { oxygen: 'أكسجين' } },
        { en: 'Careful tests did not support that idea.', ar: 'لكن الاختبارات الدقيقة لم تدعم تلك الفكرة.', w: { support: 'تدعم' } },
        { en: 'A newer idea is that yawning cools the brain.', ar: 'فكرة أحدث تقول إن التثاؤب يُبرّد الدماغ.', w: { cools: 'يُبرّد', brain: 'دماغ' } },
        { en: 'Yawning also spreads from person to person.', ar: 'والتثاؤب ينتقل أيضًا من شخص لآخر.', w: { spreads: 'ينتشر' } },
        { en: 'Reading about it is often enough to start one.', ar: 'وغالبًا تكفي القراءة عنه لتبدأ واحدة.', w: {} },
        { en: 'It may be a small sign of shared feeling.', ar: 'ربما يكون علامة صغيرة على المشاعر المشتركة.', w: { shared: 'مشتركة', sign: 'علامة' } }
      ]
    },

    /* ================================================= متقدم · B1–B2 */
    {
      id: 'the-lighthouse', en: 'The Lighthouse', ar: 'المنارة',
      lang: 'en', level: 'b1', kind: 'article', free: false, hue: 40, motif: 'lighthouse',
      blurb: 'أرشدت المنائر السفن آلاف السنين — والآن لا أحد بداخلها.',
      lines: [
        { en: 'For thousands of years, lighthouses guided ships home.', ar: 'لآلاف السنين، أرشدت المنائر السفن إلى الديار.', w: { guided: 'أرشدت', ships: 'سفن' } },
        { en: 'The idea is simple: put a fire where sailors can see it.', ar: 'الفكرة بسيطة: ضَع نارًا حيث يراها البحّارة.', w: { sailors: 'بحّارة' } },
        { en: 'Keeping that fire alive was not simple at all.', ar: 'أما إبقاء تلك النار مشتعلة فلم يكن بسيطًا أبدًا.', w: { alive: 'حيّة، مشتعلة' } },
        { en: 'Keepers lived alone for months on bare rock.', ar: 'عاش الحرّاس وحدهم شهورًا على صخر عارٍ.', w: { keepers: 'حرّاس', bare: 'عارٍ' } },
        { en: 'They climbed the stairs every few hours, all night.', ar: 'كانوا يصعدون الدرج كل ساعات قليلة، طوال الليل.', w: { climbed: 'صعدوا', stairs: 'درج' } },
        { en: 'A single missed hour could cost a ship and its crew.', ar: 'ساعة واحدة فائتة قد تكلّف سفينة وطاقمها.', w: { crew: 'طاقم', cost: 'تُكلّف' } },
        { en: 'Today most lighthouses run without anyone inside.', ar: 'اليوم تعمل أغلب المنائر بلا أحد في داخلها.', w: { without: 'بدون' } },
        { en: 'The light still turns, but nobody is watching the sea.', ar: 'ما زال الضوء يدور، لكن لا أحد يراقب البحر.', w: { turns: 'يدور', watching: 'يراقب' } }
      ]
    },
    {
      id: 'phobias', en: 'Phobias', ar: 'الرهاب',
      lang: 'en', level: 'b1', kind: 'article', free: false, hue: 265, motif: 'tangle',
      blurb: 'الخوف مفيد. الرهاب هو الخوف وقد فقد تناسبه مع الخطر.',
      lines: [
        { en: 'Fear is useful. It keeps us away from real danger.', ar: 'الخوف مفيد. يُبقينا بعيدين عن الخطر الحقيقي.', w: { fear: 'خوف', danger: 'خطر' } },
        { en: 'A phobia is different. The fear is much larger than the risk.', ar: 'الرهاب مختلف. الخوف فيه أكبر بكثير من الخطر.', w: { phobia: 'رهاب', risk: 'مخاطرة' } },
        { en: 'Someone may know a spider cannot hurt them.', ar: 'قد يعرف أحدهم أن العنكبوت لا يستطيع إيذاءه.', w: { spider: 'عنكبوت', hurt: 'يؤذي' } },
        { en: 'Knowing that does not stop the reaction.', ar: 'لكن معرفة ذلك لا توقف ردّة الفعل.', w: { reaction: 'ردّة فعل' } },
        { en: 'The body reacts before the mind can argue.', ar: 'يتفاعل الجسد قبل أن يستطيع العقل الجدال.', w: { reacts: 'يتفاعل', argue: 'يُجادل' } },
        { en: 'Avoiding the thing makes the fear stronger, not weaker.', ar: 'وتجنّب الشيء يجعل الخوف أقوى، لا أضعف.', w: { avoiding: 'تجنّب', weaker: 'أضعف' } },
        { en: 'Treatment usually means meeting the fear in small steps.', ar: 'العلاج غالبًا يعني مواجهة الخوف بخطوات صغيرة.', w: { treatment: 'علاج', usually: 'غالبًا' } },
        { en: 'Slowly, the alarm learns it was wrong.', ar: 'ببطء، يتعلّم جرس الإنذار أنه كان مخطئًا.', w: { alarm: 'إنذار' } }
      ]
    },
    {
      id: 'sitting-too-much', en: 'Sitting Too Much', ar: 'الجلوس كثيرًا',
      lang: 'en', level: 'b1', kind: 'article', free: false, hue: 15, motif: 'sofa',
      blurb: 'الرياضة وحدها لا تُلغي أثر ثماني ساعات على كرسي.',
      lines: [
        { en: 'The human body was built to move.', ar: 'بُني جسم الإنسان ليتحرّك.', w: { built: 'بُني' } },
        { en: 'For most of history, sitting was a short break.', ar: 'في معظم التاريخ، كان الجلوس استراحة قصيرة.', w: { history: 'تاريخ', break: 'استراحة' } },
        { en: 'Now many of us sit for eight hours or more.', ar: 'الآن يجلس كثير منا ثماني ساعات أو أكثر.', w: {} },
        { en: 'Research links long sitting to several health problems.', ar: 'تربط الأبحاث الجلوس الطويل بعدة مشكلات صحية.', w: { research: 'أبحاث', links: 'تربط', several: 'عدة' } },
        { en: 'The surprise is that exercise alone does not undo it.', ar: 'المفاجأة أن الرياضة وحدها لا تُلغي أثره.', w: { exercise: 'رياضة', undo: 'يُلغي' } },
        { en: 'An hour at the gym does not cancel nine hours in a chair.', ar: 'ساعة في النادي لا تُلغي تسع ساعات على كرسي.', w: { cancel: 'يُلغي' } },
        { en: 'What seems to matter is breaking up the hours.', ar: 'ما يبدو مهمًا هو تقطيع تلك الساعات.', w: { matter: 'يَهُمّ', breaking: 'تقطيع' } },
        { en: 'Standing up for two minutes is worth more than it sounds.', ar: 'الوقوف دقيقتين يستحق أكثر مما يبدو.', w: { worth: 'يستحق' } }
      ]
    },
    {
      id: 'the-network-inside-you', en: 'The Network Inside You', ar: 'الشبكة بداخلك',
      lang: 'en', level: 'b1', kind: 'article', free: false, hue: 172, motif: 'cells',
      blurb: 'جهازك المناعي ليس عضوًا، بل شبكة تعمل الآن في كل جزء منك.',
      lines: [
        { en: 'Right now, something is defending you.', ar: 'في هذه اللحظة، شيء ما يُدافع عنك.', w: { defending: 'يُدافع' } },
        { en: 'Your immune system is not one organ.', ar: 'جهازك المناعي ليس عضوًا واحدًا.', w: { immune: 'مناعي', organ: 'عضو' } },
        { en: 'It is a network spread through the whole body.', ar: 'إنه شبكة منتشرة في الجسم كله.', w: { network: 'شبكة', spread: 'منتشرة' } },
        { en: 'Some cells patrol. Others wait and remember.', ar: 'بعض الخلايا تجوب. وأخرى تنتظر وتتذكّر.', w: { cells: 'خلايا', patrol: 'تجوب' } },
        { en: 'Memory is why a second infection is often milder.', ar: 'الذاكرة هي سبب كون العدوى الثانية أخف غالبًا.', w: { infection: 'عدوى', milder: 'أخف' } },
        { en: 'This is also how vaccines work.', ar: 'وهكذا تعمل اللقاحات أيضًا.', w: { vaccines: 'لقاحات' } },
        { en: 'They teach the lesson without the illness.', ar: 'إنها تُلقّن الدرس بدون المرض.', w: { teach: 'تُعلّم', illness: 'مرض' } },
        { en: 'The cost of such a system is that it can turn inward.', ar: 'وثمن نظام كهذا أنه قد ينقلب إلى الداخل.', w: { inward: 'إلى الداخل', cost: 'ثمن' } }
      ]
    },
    {
      id: 'the-quiet-carriage', en: 'The Quiet Carriage', ar: 'عربة الصمت',
      lang: 'en', level: 'b1', kind: 'story', free: false, hue: 210, motif: 'screen',
      blurb: 'عربة قطار يُمنع فيها الكلام، ورجل قرّر أن يخالف القاعدة.',
      lines: [
        { en: 'The sign said the carriage was for quiet travel.', ar: 'قالت اللافتة إن العربة مخصّصة للسفر الهادئ.', w: { sign: 'لافتة', carriage: 'عربة' } },
        { en: 'Nobody spoke. Nobody played music aloud.', ar: 'لم يتكلّم أحد. ولم يُشغّل أحد موسيقى بصوت عالٍ.', w: { aloud: 'بصوت عالٍ' } },
        { en: 'It was the most peaceful hour of my week.', ar: 'كانت أهدأ ساعة في أسبوعي.', w: { peaceful: 'مسالم، هادئ' } },
        { en: 'Then a man answered his phone and kept talking.', ar: 'ثم ردّ رجل على هاتفه وواصل الحديث.', w: { answered: 'ردّ' } },
        { en: 'Twenty people looked up, and not one of them spoke.', ar: 'رفع عشرون شخصًا أنظارهم، ولم يتكلّم أحد منهم.', w: {} },
        { en: 'We were all waiting for someone braver.', ar: 'كنا جميعًا ننتظر شخصًا أشجع.', w: { braver: 'أشجع' } },
        { en: 'At the next station he got off, still talking.', ar: 'في المحطة التالية نزل، وهو ما زال يتكلّم.', w: { station: 'محطة' } },
        { en: 'The silence came back, and it felt slightly ashamed.', ar: 'عاد الصمت، وبدا خجلًا بعض الشيء.', w: { silence: 'صمت', ashamed: 'خجِل' } }
      ]
    },

    /* ==================================================== متمكّن · C1 */
    {
      id: 'the-language-of-bees', en: 'The Language of Bees', ar: 'لغة النحل',
      lang: 'en', level: 'c1', kind: 'article', free: false, hue: 45, motif: 'cells',
      blurb: 'رقصة داخل خلية مظلمة تنقل اتجاهًا ومسافة بدقة مذهلة.',
      lines: [
        { en: 'A honeybee that finds food returns and dances.', ar: 'النحلة التي تجد طعامًا تعود وترقص.', w: { honeybee: 'نحلة عسل' } },
        { en: 'The dance is not decoration; it is a set of instructions.', ar: 'الرقصة ليست زينة؛ إنها مجموعة تعليمات.', w: { decoration: 'زينة', instructions: 'تعليمات' } },
        { en: 'She walks a straight line while shaking her body.', ar: 'تمشي في خط مستقيم وهي تهزّ جسدها.', w: { straight: 'مستقيم', shaking: 'تهزّ' } },
        { en: 'The angle of that line encodes the direction of the food.', ar: 'زاوية ذلك الخط تُرمّز اتجاه الطعام.', w: { angle: 'زاوية', encodes: 'تُرمّز' } },
        { en: 'The length of the shaking encodes the distance.', ar: 'وطول الاهتزاز يُرمّز المسافة.', w: { distance: 'مسافة' } },
        { en: 'All of this happens in darkness, inside a crowded hive.', ar: 'كل هذا يحدث في الظلام، داخل خلية مزدحمة.', w: { hive: 'خلية نحل', crowded: 'مزدحمة' } },
        { en: 'The other bees read it by touch and by sound.', ar: 'يقرؤها بقيّة النحل باللمس وبالصوت.', w: { touch: 'لمس' } },
        { en: 'Karl von Frisch decoded it and won a Nobel Prize.', ar: 'فكّ كارل فون فريش شفرتها ونال جائزة نوبل.', w: { decoded: 'فكّ شفرة' } },
        { en: 'For years, many scientists refused to believe him.', ar: 'ولسنوات، رفض كثير من العلماء تصديقه.', w: { refused: 'رفض' } }
      ]
    },
    {
      id: 'what-sleep-repairs', en: 'What Sleep Repairs', ar: 'ما يُصلحه النوم',
      lang: 'en', level: 'c1', kind: 'article', free: false, hue: 260, motif: 'tangle',
      blurb: 'النوم ليس توقّفًا عن العمل، بل نوبة صيانة لا تُؤجَّل.',
      lines: [
        { en: 'Sleep looks like an absence of activity, but it is not.', ar: 'يبدو النوم غيابًا للنشاط، لكنه ليس كذلك.', w: { absence: 'غياب' } },
        { en: 'The sleeping brain is busy in ways the waking one cannot be.', ar: 'الدماغ النائم مشغول بطرق لا يستطيعها المستيقظ.', w: { waking: 'مستيقظ' } },
        { en: 'During deep sleep, memories are moved and consolidated.', ar: 'في النوم العميق، تُنقل الذكريات وتُثبَّت.', w: { consolidated: 'تُثبَّت، تُدمج' } },
        { en: 'Fragments from the day are replayed at high speed.', ar: 'تُعاد شظايا اليوم بسرعة عالية.', w: { fragments: 'شظايا', replayed: 'تُعاد' } },
        { en: 'What matters is kept; the rest is allowed to fade.', ar: 'ما يهمّ يُحفظ؛ والباقي يُترك ليتلاشى.', w: { fade: 'يتلاشى' } },
        { en: 'The brain also clears waste that builds up while awake.', ar: 'وينظّف الدماغ أيضًا فضلات تتراكم أثناء اليقظة.', w: { waste: 'فضلات', builds: 'يتراكم' } },
        { en: 'This clearing is far slower when sleep is cut short.', ar: 'وهذا التنظيف أبطأ بكثير حين يُقتطع النوم.', w: { clearing: 'تنظيف' } },
        { en: 'Losing an hour is not a debt you repay on the weekend.', ar: 'وفقدان ساعة ليس دَينًا تسدّده في نهاية الأسبوع.', w: { debt: 'دَين', repay: 'تسدّد' } },
        { en: 'The maintenance was scheduled, and it was missed.', ar: 'الصيانة كانت مجدولة، وقد فاتت.', w: { maintenance: 'صيانة', scheduled: 'مجدولة' } }
      ]
    },
    {
      id: 'why-cities-glow', en: 'Why Cities Glow', ar: 'لماذا تتوهّج المدن',
      lang: 'en', level: 'c1', kind: 'article', free: false, hue: 35, motif: 'city',
      blurb: 'ثلث البشر لا يستطيعون رؤية مجرّتهم، والسبب أضواؤنا نحن.',
      lines: [
        { en: 'Stand in a large city at midnight and look up.', ar: 'قف في مدينة كبيرة منتصف الليل وانظر للأعلى.', w: { midnight: 'منتصف الليل' } },
        { en: 'You will see a handful of stars, perhaps fewer.', ar: 'سترى حفنة من النجوم، وربما أقل.', w: { handful: 'حفنة', fewer: 'أقل' } },
        { en: 'The stars have not moved. The sky has been brightened.', ar: 'النجوم لم تتحرّك. السماء هي التي أُضيئت.', w: { brightened: 'أُضيئت' } },
        { en: 'Light aimed upward scatters off dust and water in the air.', ar: 'الضوء الموجّه للأعلى يتشتّت على الغبار والماء في الهواء.', w: { scatters: 'يتشتّت', dust: 'غبار' } },
        { en: 'The whole sky becomes a lamp, and faint stars vanish into it.', ar: 'تصير السماء كلها مصباحًا، فتختفي النجوم الخافتة فيها.', w: { faint: 'خافت', vanish: 'تختفي' } },
        { en: 'Roughly a third of humanity can no longer see the Milky Way.', ar: 'نحو ثلث البشرية لم يعد يستطيع رؤية درب التبانة.', w: { roughly: 'تقريبًا', humanity: 'البشرية' } },
        { en: 'The effects reach beyond astronomy.', ar: 'وتمتد الآثار إلى ما وراء الفلك.', w: { astronomy: 'علم الفلك' } },
        { en: 'Migrating birds and nesting turtles navigate by natural light.', ar: 'الطيور المهاجرة والسلاحف تهتدي بالضوء الطبيعي.', w: { migrating: 'مهاجرة', navigate: 'تهتدي' } },
        { en: 'Unusually, this is pollution that stops the moment you switch it off.', ar: 'وعلى غير العادة، هذا تلوّث يتوقّف لحظة إطفائه.', w: { pollution: 'تلوّث', unusually: 'على غير العادة' } }
      ]
    },
    {
      id: 'the-last-bookshop', en: 'The Last Bookshop', ar: 'آخر مكتبة',
      lang: 'en', level: 'c1', kind: 'story', free: false, hue: 22, motif: 'books',
      blurb: 'المكتبة تغلق بعد أربعين سنة، وصاحبها يرفض أن يجعلها مأساة.',
      lines: [
        { en: 'The bookshop on Wells Street closed in November.', ar: 'أُغلقت المكتبة في شارع ويلز في نوفمبر.', w: { closed: 'أُغلقت' } },
        { en: 'It had been there for forty-one years.', ar: 'كانت هناك منذ إحدى وأربعين سنة.', w: {} },
        { en: 'Mr Adel did not put up a sign explaining why.', ar: 'لم يضع السيد عادل لافتة تشرح السبب.', w: { explaining: 'تشرح' } },
        { en: 'He simply began giving books away, one per customer.', ar: 'بل بدأ ببساطة يوزّع الكتب، كتابًا لكل زبون.', w: { simply: 'ببساطة' } },
        { en: 'He refused to let anyone choose for themselves.', ar: 'ورفض أن يدع أحدًا يختار لنفسه.', w: { refused: 'رفض' } },
        { en: 'He would look at you, think, and hand you something.', ar: 'كان ينظر إليك، ويفكّر، ثم يناولك شيئًا.', w: { hand: 'يناول' } },
        { en: 'People argued that he was being difficult.', ar: 'قال الناس إنه يتعنّت.', w: { argued: 'جادلوا', difficult: 'متعنّت' } },
        { en: 'I think he was doing the only job he had ever done.', ar: 'أظنه كان يؤدّي العمل الوحيد الذي أدّاه في حياته.', w: {} },
        { en: 'Mine was a book about lighthouses. I have never asked why.', ar: 'كتابي كان عن المنائر. ولم أسأله قط لماذا.', w: { never: 'قط، أبدًا' } }
      ]
    },
    {
      id: 'the-weight-of-a-name', en: 'The Weight of a Name', ar: 'ثِقل الاسم',
      lang: 'en', level: 'c1', kind: 'story', free: false, hue: 300, motif: 'tangle',
      blurb: 'اسمٌ يُنطق خطأً لسنوات، حتى تقرّر صاحبته أن تصحّحه.',
      lines: [
        { en: 'For nine years my teachers pronounced my name wrongly.', ar: 'لتسع سنوات نطق معلّموي اسمي خطأً.', w: { pronounced: 'نطق', wrongly: 'خطأً' } },
        { en: 'I corrected the first one. She apologised and forgot.', ar: 'صحّحتُ لأولاهم. اعتذرت ثم نسيت.', w: { corrected: 'صحّحتُ', apologised: 'اعتذرت' } },
        { en: 'After that I stopped correcting anyone.', ar: 'بعدها توقّفت عن تصحيح أي أحد.', w: {} },
        { en: 'It seemed a small thing to give away for an easier morning.', ar: 'بدا شيئًا صغيرًا أتنازل عنه مقابل صباح أسهل.', w: { seemed: 'بدا' } },
        { en: 'At university a professor asked me twice to repeat it.', ar: 'في الجامعة طلب مني أستاذ أن أكرّره مرتين.', w: { repeat: 'أكرّر' } },
        { en: 'He practised it aloud until he had it exactly right.', ar: 'تدرّب عليه بصوت عالٍ حتى ضبطه تمامًا.', w: { practised: 'تدرّب', exactly: 'تمامًا' } },
        { en: 'It took perhaps twenty seconds of his afternoon.', ar: 'أخذ ذلك ربما عشرين ثانية من عصره.', w: { perhaps: 'ربما' } },
        { en: 'I had not heard it said properly outside my house in years.', ar: 'لم أكن قد سمعته يُقال صحيحًا خارج بيتي منذ سنوات.', w: { properly: 'بشكل صحيح' } },
        { en: 'I have corrected every person since.', ar: 'ومنذ ذلك اليوم صحّحتُ لكل شخص.', w: { since: 'منذ ذلك الحين' } }
      ]
    },

    /* ==================================================== الفرنسية · A1 */

    /* ==================================================== الفرنسية · A2 */
    {
      id: 'les-toits-de-paris', en: 'Les Toits de Paris', ar: 'أسطح باريس',
      lang: 'fr', level: 'a2', kind: 'article', free: false, hue: 215, motif: 'city',
      blurb: 'لماذا تتشابه أسطح باريس كلها؟ السبب قانون قديم.',
      lines: [
        { en: 'Les toits de Paris sont presque tous gris.', ar: 'أسطح باريس كلها رمادية تقريبًا.', w: { toits: 'أسطح', presque: 'تقريبًا' } },
        { en: 'Ce gris vient du zinc, un métal léger.', ar: 'هذا الرمادي يأتي من الزنك، معدن خفيف.', w: { vient: 'يأتي', 'léger': 'خفيف' } },
        { en: 'Au dix-neuvième siècle, la ville a beaucoup changé.', ar: 'في القرن التاسع عشر، تغيّرت المدينة كثيرًا.', w: { 'siècle': 'قرن', 'changé': 'تغيّرت' } },
        { en: 'Les nouveaux immeubles devaient se ressembler.', ar: 'كان على المباني الجديدة أن تتشابه.', w: { immeubles: 'مبانٍ', 'devaient': 'كان عليها' } },
        { en: 'Le zinc était moins cher que l\'ardoise.', ar: 'كان الزنك أرخص من الأردواز.', w: { cher: 'غالٍ', ardoise: 'حجر أردواز' } },
        { en: 'Aujourd\'hui, ces toits sont protégés.', ar: 'اليوم، هذه الأسطح محميّة.', w: { 'protégés': 'محميّة' } },
        { en: 'Un choix d\'argent est devenu un symbole.', ar: 'اختيار مالي صار رمزًا.', w: { choix: 'اختيار', devenu: 'صار' } }
      ]
    },

    /* ==================================================== الفرنسية · B1 */
    {
      id: 'les-catacombes', en: 'Les Catacombes', ar: 'سراديب الموتى',
      lang: 'fr', level: 'b1', kind: 'article', free: false, hue: 275, motif: 'tangle',
      blurb: 'تحت شوارع باريس، ستة ملايين شخص — وسبب عملي جدًا.',
      lines: [
        { en: 'Sous Paris, il existe des kilomètres de tunnels.', ar: 'تحت باريس، توجد كيلومترات من الأنفاق.', w: { sous: 'تحت', existe: 'يوجد' } },
        { en: 'On y a déplacé les os de six millions de personnes.', ar: 'نُقلت إليها عظام ستة ملايين شخص.', w: { 'déplacé': 'نُقل', os: 'عظام' } },
        { en: 'La raison n\'était pas religieuse mais pratique.', ar: 'السبب لم يكن دينيًا بل عمليًا.', w: { raison: 'سبب', pratique: 'عملي' } },
        { en: 'Au dix-huitième siècle, les cimetières débordaient.', ar: 'في القرن الثامن عشر، فاضت المقابر.', w: { 'cimetières': 'مقابر', 'débordaient': 'كانت تفيض' } },
        { en: 'Ils rendaient l\'eau et l\'air dangereux.', ar: 'كانت تجعل الماء والهواء خطرين.', w: { rendaient: 'كانت تجعل', dangereux: 'خطِر' } },
        { en: 'Le transfert a duré plus de dix ans.', ar: 'استمر النقل أكثر من عشر سنوات.', w: { 'duré': 'استمر' } },
        { en: 'Les ouvriers travaillaient seulement la nuit.', ar: 'كان العمال يعملون ليلًا فقط.', w: { ouvriers: 'عمال', seulement: 'فقط' } },
        { en: 'Aujourd\'hui, une petite partie se visite.', ar: 'اليوم، يمكن زيارة جزء صغير منها.', w: { partie: 'جزء', visite: 'تُزار' } }
      ]
    },
    {
      id: 'la-lettre', en: 'La Lettre', ar: 'الرسالة',
      lang: 'fr', level: 'b1', kind: 'story', free: false, hue: 20, motif: 'books',
      blurb: 'رسالة كُتبت ولم تُرسل، وُجدت بعد أربعين سنة.',
      lines: [
        { en: 'Ma grand-mère gardait une boîte en fer sous son lit.', ar: 'كانت جدتي تحتفظ بعلبة حديدية تحت سريرها.', w: { gardait: 'كانت تحتفظ', 'boîte': 'علبة' } },
        { en: 'Après sa mort, nous l\'avons ouverte.', ar: 'بعد وفاتها، فتحناها.', w: { mort: 'موت', ouverte: 'مفتوحة' } },
        { en: 'Il n\'y avait qu\'une seule lettre dedans.', ar: 'لم يكن فيها سوى رسالة واحدة.', w: { seule: 'وحيدة', dedans: 'بداخلها' } },
        { en: 'Elle était écrite, pliée, mais jamais envoyée.', ar: 'كانت مكتوبة ومطويّة، لكنها لم تُرسل قط.', w: { 'pliée': 'مطويّة', 'envoyée': 'مُرسَلة' } },
        { en: 'La date indiquait mille neuf cent soixante-deux.', ar: 'كان التاريخ يشير إلى سنة ألف وتسعمئة واثنتين وستين.', w: { indiquait: 'كان يشير' } },
        { en: 'Personne dans la famille ne connaissait ce nom.', ar: 'لم يكن أحد في العائلة يعرف ذلك الاسم.', w: { personne: 'لا أحد', connaissait: 'كان يعرف' } },
        { en: 'Nous avons décidé de ne pas la lire jusqu\'au bout.', ar: 'قرّرنا ألا نقرأها حتى النهاية.', w: { 'décidé': 'قرّرنا', bout: 'نهاية' } },
        { en: 'Certains silences appartiennent à celui qui les garde.', ar: 'بعض الصموت مِلك لمن يحفظها.', w: { appartiennent: 'تنتمي، مِلك', garde: 'يحفظ' } }
      ]
    },

    /* ==================================================== الفرنسية · C1 */
    {
      id: 'le-silence-des-librairies', en: 'Le Silence des Librairies', ar: 'صمت المكتبات',
      lang: 'fr', level: 'c1', kind: 'story', free: false, hue: 25, motif: 'books',
      blurb: 'بائع كتب يرفض أن يبيع لك ما جئت تطلبه.',
      lines: [
        { en: 'La librairie de la rue Saint-Jacques n\'avait pas d\'enseigne.', ar: 'مكتبة شارع سان-جاك لم تكن لها لافتة.', w: { librairie: 'مكتبة لبيع الكتب', enseigne: 'لافتة' } },
        { en: 'On la trouvait par hasard, ou par quelqu\'un.', ar: 'كنت تجدها مصادفة، أو عن طريق أحدهم.', w: { hasard: 'صدفة' } },
        { en: 'Le libraire refusait de vendre ce qu\'on lui demandait.', ar: 'كان بائع الكتب يرفض بيع ما يُطلب منه.', w: { refusait: 'كان يرفض', demandait: 'كان يطلب' } },
        { en: 'Il écoutait, puis il proposait autre chose.', ar: 'كان يستمع، ثم يقترح شيئًا آخر.', w: { 'écoutait': 'كان يستمع', proposait: 'كان يقترح' } },
        { en: 'Certains partaient vexés et ne revenaient jamais.', ar: 'بعضهم كان يغادر منزعجًا ولا يعود أبدًا.', w: { 'vexés': 'منزعجون', revenaient: 'كانوا يعودون' } },
        { en: 'D\'autres revenaient chaque semaine pendant vingt ans.', ar: 'وآخرون كانوا يعودون كل أسبوع لعشرين سنة.', w: { semaine: 'أسبوع' } },
        { en: 'Il disait que demander un livre précis, c\'est déjà l\'avoir lu.', ar: 'كان يقول إن طلب كتاب بعينه يعني أنك قرأته سلفًا.', w: { 'précis': 'محدّد', 'déjà': 'سلفًا' } },
        { en: 'Je n\'ai jamais su s\'il avait raison.', ar: 'لم أعرف قط إن كان على حق.', w: { su: 'عرفتُ', raison: 'حق، صواب' } },
        { en: 'Mais je n\'ai jamais oublié ce qu\'il m\'a donné.', ar: 'لكني لم أنسَ قط ما أعطاني إياه.', w: { 'oublié': 'نسيتُ', 'donné': 'أعطى' } }
      ]
    },
    {
      id: 'l-odeur-de-la-memoire', en: 'L\'Odeur de la Mémoire', ar: 'رائحة الذاكرة',
      lang: 'fr', level: 'c1', kind: 'article', free: false, hue: 300, motif: 'cells',
      blurb: 'لماذا تستدعي الرائحة ذكرى كاملة، بينما تعجز الصورة؟',
      lines: [
        { en: 'Une odeur peut ramener un souvenir entier en une seconde.', ar: 'قد تُعيد رائحةٌ ذكرى كاملة في ثانية واحدة.', w: { odeur: 'رائحة', souvenir: 'ذكرى' } },
        { en: 'Ce phénomène porte le nom d\'un écrivain français.', ar: 'تحمل هذه الظاهرة اسم كاتب فرنسي.', w: { 'phénomène': 'ظاهرة', 'écrivain': 'كاتب' } },
        { en: 'Proust a décrit ce choc dans un roman célèbre.', ar: 'وصف بروست هذه الصدمة في رواية شهيرة.', w: { 'décrit': 'وصف', 'célèbre': 'شهيرة' } },
        { en: 'La biologie explique en partie pourquoi.', ar: 'وتشرح البيولوجيا جزئيًا السبب.', w: { explique: 'تشرح' } },
        { en: 'Les nerfs de l\'odorat rejoignent directement la mémoire.', ar: 'أعصاب الشم تصل مباشرة إلى الذاكرة.', w: { nerfs: 'أعصاب', odorat: 'حاسة الشم' } },
        { en: 'La vue et le son passent d\'abord ailleurs.', ar: 'أما البصر والصوت فيمرّان أولًا بمكان آخر.', w: { vue: 'بصر', ailleurs: 'مكان آخر' } },
        { en: 'L\'odeur arrive donc avant l\'analyse.', ar: 'فتصل الرائحة إذًا قبل التحليل.', w: { analyse: 'تحليل' } },
        { en: 'C\'est pour cela qu\'elle émeut avant d\'être comprise.', ar: 'لذلك هي تُحرّك المشاعر قبل أن تُفهم.', w: { 'émeut': 'تُحرّك المشاعر', comprise: 'مفهومة' } },
        { en: 'On se souvient d\'abord, on comprend ensuite.', ar: 'نتذكّر أولًا، ثم نفهم.', w: { ensuite: 'ثم، بعد ذلك' } }
      ]
    },
    {
      id: 'le-dernier-metro', en: 'Le Dernier Métro', ar: 'آخر مترو',
      lang: 'fr', level: 'c1', kind: 'story', free: false, hue: 240, motif: 'screen',
      blurb: 'في آخر قطار، يتشارك الغرباء شيئًا لا يقولونه.',
      lines: [
        { en: 'Le dernier métro ne ressemble à aucun autre.', ar: 'آخر مترو لا يشبه أي مترو آخر.', w: { ressemble: 'يشبه', aucun: 'أي' } },
        { en: 'Les gens y sont fatigués d\'une manière honnête.', ar: 'الناس فيه متعبون بطريقة صادقة.', w: { 'fatigués': 'متعبون', 'manière': 'طريقة' } },
        { en: 'Personne ne fait semblant d\'aller quelque part d\'important.', ar: 'لا أحد يتظاهر بأنه ذاهب إلى مكان مهم.', w: { semblant: 'تظاهر', quelque: 'ما، بعض' } },
        { en: 'Une femme dort contre la vitre, la bouche ouverte.', ar: 'امرأة تنام على الزجاج، وفمها مفتوح.', w: { vitre: 'زجاج', bouche: 'فم' } },
        { en: 'Un homme relit le même message plusieurs fois.', ar: 'رجل يُعيد قراءة الرسالة نفسها مرات عدة.', w: { relit: 'يُعيد القراءة', plusieurs: 'عدة' } },
        { en: 'On partage quelque chose sans jamais se parler.', ar: 'نتشارك شيئًا دون أن نتحدّث أبدًا.', w: { partage: 'يتشارك' } },
        { en: 'À chaque station, le wagon devient plus vide.', ar: 'عند كل محطة، تصير العربة أكثر فراغًا.', w: { wagon: 'عربة قطار', vide: 'فارغ' } },
        { en: 'Les derniers passagers évitent de se regarder.', ar: 'آخر الركاب يتجنّبون النظر إلى بعضهم.', w: { passagers: 'ركّاب', 'évitent': 'يتجنّبون' } },
        { en: 'Comme si rester éveillé si tard était un aveu.', ar: 'وكأن البقاء مستيقظًا لهذا الوقت اعتراف.', w: { 'éveillé': 'مستيقظ', aveu: 'اعتراف' } }
      ]
    },

    /* ---------------------------------------------- بدائل: مواضيع نادرة */
    {
      id: 'why-onions-sting', en: 'Why Onions Sting', ar: 'لماذا يُبكينا البصل',
      lang: 'en', level: 'a1', kind: 'article', free: true, hue: 80, motif: 'cells',
      blurb: 'البصلة لا تريد أن تُؤكل، وهذه طريقتها في الدفاع.',
      lines: [
        { en: 'Cut an onion and your eyes water.', ar: 'اقطع بصلة فتدمع عيناك.', w: { cut: 'اقطع', water: 'تدمع' } },
        { en: 'The onion is not sad. It is defending itself.', ar: 'البصلة ليست حزينة. إنها تدافع عن نفسها.', w: { defending: 'تدافع' } },
        { en: 'Inside, it keeps two things apart.', ar: 'في داخلها، تُبقي شيئين منفصلين.', w: { apart: 'منفصلين' } },
        { en: 'Your knife breaks the wall between them.', ar: 'سكينك يكسر الجدار بينهما.', w: { knife: 'سكين', wall: 'جدار' } },
        { en: 'They mix and make a gas.', ar: 'فيختلطان ويصنعان غازًا.', w: { mix: 'يختلطان', gas: 'غاز' } },
        { en: 'The gas turns to acid in your eyes.', ar: 'ويتحوّل الغاز إلى حمض في عينيك.', w: { acid: 'حمض' } },
        { en: 'A cold onion makes less gas. Try it.', ar: 'البصلة الباردة تصنع غازًا أقل. جرّب.', w: { less: 'أقل' } }
      ]
    },
    {
      id: 'cats-and-boxes', en: 'Cats and Boxes', ar: 'القطط والصناديق',
      lang: 'en', level: 'a1', kind: 'article', free: true, hue: 35, motif: 'room',
      blurb: 'ضع صندوقًا على الأرض، وستجد فيه قطة. لماذا؟',
      lines: [
        { en: 'Put a box on the floor.', ar: 'ضع صندوقًا على الأرض.', w: { box: 'صندوق', floor: 'أرض' } },
        { en: 'Soon a cat will sit in it.', ar: 'قريبًا ستجلس فيه قطة.', w: { soon: 'قريبًا' } },
        { en: 'This is not a joke. Scientists studied it.', ar: 'هذه ليست مزحة. درسها العلماء.', w: { joke: 'مزحة', studied: 'درسوا' } },
        { en: 'A box has walls on every side.', ar: 'الصندوق له جدران من كل جهة.', w: { side: 'جهة' } },
        { en: 'Nothing can come from behind.', ar: 'لا شيء يستطيع أن يأتي من الخلف.', w: { behind: 'الخلف' } },
        { en: 'The cat feels safe, so it relaxes.', ar: 'فتشعر القطة بالأمان، فترتاح.', w: { safe: 'آمن', relaxes: 'ترتاح' } },
        { en: 'Cats in shelters with boxes calm down faster.', ar: 'القطط في الملاجئ التي فيها صناديق تهدأ أسرع.', w: { shelters: 'ملاجئ', calm: 'تهدأ' } }
      ]
    },
    {
      id: 'the-blue-in-ice', en: 'The Blue in Ice', ar: 'الأزرق في الجليد',
      lang: 'en', level: 'a1', kind: 'article', free: false, hue: 195, motif: 'waves',
      blurb: 'الجليد أبيض، لكن الجليد القديم جدًا أزرق. لماذا؟',
      lines: [
        { en: 'Ice in your glass looks white.', ar: 'الجليد في كوبك يبدو أبيض.', w: { glass: 'كوب' } },
        { en: 'But old ice in a glacier looks blue.', ar: 'لكن الجليد القديم في النهر الجليدي يبدو أزرق.', w: { glacier: 'نهر جليدي' } },
        { en: 'New ice is full of tiny air bubbles.', ar: 'الجليد الجديد مليء بفقاعات هواء صغيرة.', w: { bubbles: 'فقاعات', tiny: 'صغيرة جدًا' } },
        { en: 'The bubbles send all the light back.', ar: 'والفقاعات تُعيد كل الضوء.', w: { light: 'ضوء' } },
        { en: 'All colours together look white.', ar: 'وكل الألوان معًا تبدو بيضاء.', w: { colours: 'ألوان' } },
        { en: 'In old ice the bubbles are pressed out.', ar: 'أما في الجليد القديم فتُعصر الفقاعات خارجًا.', w: { pressed: 'مضغوطة' } },
        { en: 'That ice keeps red light and sends blue back.', ar: 'فيحتفظ ذلك الجليد بالضوء الأحمر ويُعيد الأزرق.', w: { keeps: 'يحتفظ' } }
      ]
    },
    {
      id: 'the-glove-on-the-fence', en: 'The Glove on the Fence', ar: 'القفاز على السياج',
      lang: 'en', level: 'a1', kind: 'story', free: false, hue: 15, motif: 'road',
      blurb: 'قفاز ضائع يضعه أحدهم على عمود، وقصة صغيرة تبدأ.',
      lines: [
        { en: 'Someone lost a glove on my street.', ar: 'أضاع أحدهم قفازًا في شارعي.', w: { lost: 'أضاع', glove: 'قفاز' } },
        { en: 'A stranger put it on a fence post.', ar: 'وضعه غريب على عمود سياج.', w: { stranger: 'غريب', fence: 'سياج' } },
        { en: 'Nobody asked them to do that.', ar: 'لم يطلب منه أحد أن يفعل ذلك.', w: { nobody: 'لا أحد' } },
        { en: 'It stayed there for four days.', ar: 'بقي هناك أربعة أيام.', w: { stayed: 'بقي' } },
        { en: 'Then one morning it was gone.', ar: 'ثم في صباح ما اختفى.', w: { gone: 'اختفى' } },
        { en: 'I do not know who took it.', ar: 'لا أعرف من أخذه.', w: { took: 'أخذ' } },
        { en: 'I like not knowing.', ar: 'ويعجبني ألا أعرف.', w: {} }
      ]
    },
    {
      id: 'the-bench', en: 'The Bench', ar: 'المقعد',
      lang: 'en', level: 'a1', kind: 'story', free: false, hue: 120, motif: 'sofa',
      blurb: 'مقعد في حديقة، وعليه لوحة صغيرة باسم شخص لا نعرفه.',
      lines: [
        { en: 'There is a bench in the park.', ar: 'يوجد مقعد في الحديقة.', w: { bench: 'مقعد', park: 'حديقة' } },
        { en: 'It has a small metal plate on it.', ar: 'عليه لوحة معدنية صغيرة.', w: { plate: 'لوحة', metal: 'معدنية' } },
        { en: 'The plate has a name and two years.', ar: 'في اللوحة اسم وسنتان.', w: { name: 'اسم' } },
        { en: 'It says she liked this view.', ar: 'تقول إنها كانت تحب هذا المنظر.', w: { view: 'منظر' } },
        { en: 'I sit here often and look at it.', ar: 'أجلس هنا كثيرًا وأنظر إليه.', w: { often: 'كثيرًا' } },
        { en: 'She was right. It is a good view.', ar: 'كانت محقّة. إنه منظر جميل.', w: { right: 'محقّة' } }
      ]
    },
    {
      id: 'your-own-voice', en: 'Your Own Voice', ar: 'صوتك أنت',
      lang: 'en', level: 'a2', kind: 'article', free: false, hue: 265, motif: 'tangle',
      blurb: 'لماذا يبدو صوتك في التسجيل غريبًا — بل خاطئًا؟',
      lines: [
        { en: 'Almost everyone dislikes their recorded voice.', ar: 'يكره كل الناس تقريبًا صوتهم المسجّل.', w: { dislikes: 'يكره', recorded: 'مسجّل' } },
        { en: 'It sounds thinner and higher than expected.', ar: 'يبدو أرفع وأحدّ مما نتوقّع.', w: { thinner: 'أرفع', expected: 'متوقّع' } },
        { en: 'The reason is that you hear yourself twice.', ar: 'والسبب أنك تسمع نفسك مرتين.', w: { reason: 'سبب', twice: 'مرتين' } },
        { en: 'Sound reaches your ears through the air.', ar: 'الصوت يصل أذنيك عبر الهواء.', w: { reaches: 'يصل' } },
        { en: 'It also travels through the bones of your skull.', ar: 'ويسافر أيضًا عبر عظام جمجمتك.', w: { bones: 'عظام', skull: 'جمجمة' } },
        { en: 'Bone carries low tones better than air does.', ar: 'والعظم ينقل النغمات المنخفضة أفضل من الهواء.', w: { carries: 'ينقل', tones: 'نغمات' } },
        { en: 'So your head adds a bass no microphone hears.', ar: 'فيضيف رأسك عمقًا لا يسمعه أي ميكروفون.', w: { adds: 'يضيف' } },
        { en: 'The recording is not wrong. You are.', ar: 'التسجيل ليس مخطئًا. أنت المخطئ.', w: { wrong: 'مخطئ' } }
      ]
    },

    /* ----------------------------------------------- بدائل فرنسية */
    {
      id: 'le-poisson-d-avril', en: 'Le Poisson d\'Avril', ar: 'سمكة أبريل',
      lang: 'fr', level: 'a1', kind: 'article', free: true, hue: 190, motif: 'waves',
      blurb: 'في فرنسا، مزحة الأول من أبريل تُلصق على الظهر — وهي سمكة.',
      lines: [
        { en: 'Le premier avril, les enfants font une blague.', ar: 'في الأول من أبريل، يمزح الأطفال مزحة.', w: { blague: 'مزحة', enfants: 'أطفال' } },
        { en: 'Ils dessinent un poisson sur du papier.', ar: 'يرسمون سمكة على ورقة.', w: { dessinent: 'يرسمون', poisson: 'سمكة' } },
        { en: 'Puis ils le collent dans le dos de quelqu\'un.', ar: 'ثم يلصقونها على ظهر أحدهم.', w: { collent: 'يلصقون', dos: 'ظهر' } },
        { en: 'La personne ne voit rien.', ar: 'ولا يرى الشخص شيئًا.', w: { voit: 'يرى', rien: 'شيء' } },
        { en: 'Tout le monde rit derrière elle.', ar: 'ويضحك الجميع خلفه.', w: { rit: 'يضحك', 'derrière': 'خلف' } },
        { en: 'Personne ne sait vraiment pourquoi un poisson.', ar: 'ولا أحد يعرف حقًا لماذا سمكة.', w: { vraiment: 'حقًا' } }
      ]
    },
    {
      id: 'pourquoi-la-statue-est-verte', en: 'Pourquoi la Statue est Verte', ar: 'لماذا التمثال أخضر',
      lang: 'fr', level: 'a1', kind: 'article', free: false, hue: 155, motif: 'lighthouse',
      blurb: 'تمثال الحرية هدية فرنسية — ولم يكن أخضر في البداية.',
      lines: [
        { en: 'La Statue de la Liberté est un cadeau français.', ar: 'تمثال الحرية هدية فرنسية.', w: { cadeau: 'هدية' } },
        { en: 'Elle est verte aujourd\'hui.', ar: 'وهو أخضر اليوم.', w: { verte: 'خضراء' } },
        { en: 'Mais au début, elle était marron.', ar: 'لكنه في البداية كان بنيًّا.', w: { 'début': 'بداية', marron: 'بنّي' } },
        { en: 'Sa peau est en cuivre, comme une pièce.', ar: 'جلده من نحاس، مثل عملة.', w: { peau: 'جلد', cuivre: 'نحاس' } },
        { en: 'L\'air et la pluie changent le cuivre.', ar: 'والهواء والمطر يغيّران النحاس.', w: { pluie: 'مطر', changent: 'يغيّران' } },
        { en: 'Cela a pris environ trente ans.', ar: 'وأخذ ذلك نحو ثلاثين سنة.', w: { environ: 'نحو، تقريبًا' } }
      ]
    },
    {
      id: 'le-banc', en: 'Le Banc', ar: 'المقعد',
      lang: 'fr', level: 'a1', kind: 'story', free: false, hue: 105, motif: 'flowers',
      blurb: 'رجل يجلس على المقعد نفسه كل يوم، ولا ينتظر أحدًا.',
      lines: [
        { en: 'Un homme vient au parc chaque matin.', ar: 'يأتي رجل إلى الحديقة كل صباح.', w: { vient: 'يأتي', chaque: 'كل' } },
        { en: 'Il s\'assoit toujours sur le même banc.', ar: 'ويجلس دائمًا على المقعد نفسه.', w: { assoit: 'يجلس', banc: 'مقعد' } },
        { en: 'Il ne lit pas. Il ne parle pas.', ar: 'لا يقرأ. ولا يتكلّم.', w: { lit: 'يقرأ', parle: 'يتكلّم' } },
        { en: 'Il regarde les arbres pendant une heure.', ar: 'ينظر إلى الأشجار ساعة.', w: { arbres: 'أشجار', pendant: 'خلال' } },
        { en: 'Un jour je lui ai demandé pourquoi.', ar: 'في يوم سألته لماذا.', w: { 'demandé': 'سألت' } },
        { en: 'Il a dit: parce que personne ne me cherche ici.', ar: 'قال: لأن لا أحد يبحث عني هنا.', w: { cherche: 'يبحث' } }
      ]
    },
    {
      id: 'pourquoi-on-dit-allo', en: 'Pourquoi on dit « Allô »', ar: 'لماذا نقول «آلو»',
      lang: 'fr', level: 'a2', kind: 'article', free: false, hue: 30, motif: 'keys',
      blurb: 'كلمة نقولها ملايين المرات يوميًا، وأصلها خلاف بين مخترعَين.',
      lines: [
        { en: 'On dit « allô » seulement au téléphone.', ar: 'نقول «آلو» في الهاتف فقط.', w: { seulement: 'فقط' } },
        { en: 'On ne le dit jamais dans la rue.', ar: 'ولا نقولها أبدًا في الشارع.', w: { jamais: 'أبدًا', rue: 'شارع' } },
        { en: 'Le mot vient de l\'anglais « hello ».', ar: 'الكلمة تأتي من الإنجليزية «hello».', w: { mot: 'كلمة', vient: 'تأتي' } },
        { en: 'Mais Bell voulait qu\'on dise « ahoy ».', ar: 'لكن بيل أراد أن نقول «آهوي».', w: { voulait: 'أراد', dise: 'نقول' } },
        { en: 'C\'est un mot de marin.', ar: 'وهي كلمة بحّارة.', w: { marin: 'بحّار' } },
        { en: 'Edison préférait « hello », et il a gagné.', ar: 'أما إديسون ففضّل «hello»، وربح.', w: { 'préférait': 'فضّل', 'gagné': 'ربح' } },
        { en: 'Les premiers annuaires ont imprimé son choix.', ar: 'وطبعت أدلة الهاتف الأولى اختياره.', w: { annuaires: 'أدلة هاتف', 'imprimé': 'طبعت' } }
      ]
    },
    {
      id: 'le-point-zero', en: 'Le Point Zéro', ar: 'النقطة صفر',
      lang: 'fr', level: 'a2', kind: 'article', free: false, hue: 220, motif: 'city',
      blurb: 'كل المسافات إلى باريس تُقاس من حجر صغير يدوسه الناس.',
      lines: [
        { en: 'Devant Notre-Dame, il y a une pierre au sol.', ar: 'أمام نوتردام، يوجد حجر في الأرض.', w: { devant: 'أمام', pierre: 'حجر' } },
        { en: 'Elle est petite et facile à manquer.', ar: 'صغير ويسهل ألا تراه.', w: { manquer: 'يفوت' } },
        { en: 'C\'est le point zéro des routes de France.', ar: 'إنه النقطة صفر لطرق فرنسا.', w: { routes: 'طرق' } },
        { en: 'Quand un panneau dit « Paris 300 km »…', ar: 'حين تقول لافتة «باريس ٣٠٠ كم»…', w: { panneau: 'لافتة' } },
        { en: '…il parle de cette pierre exactement.', ar: '…فهي تتحدّث عن هذا الحجر بالضبط.', w: { exactement: 'بالضبط' } },
        { en: 'Des touristes marchent dessus sans le savoir.', ar: 'يمشي السياح عليه دون أن يدروا.', w: { marchent: 'يمشون', savoir: 'يعرفون' } },
        { en: 'Une légende dit qu\'on revient toujours à Paris.', ar: 'وتقول أسطورة إن من يدوسه يعود دائمًا إلى باريس.', w: { 'légende': 'أسطورة', revient: 'يعود' } }
      ]
    },
    {
      id: 'l-heure-de-paris', en: 'L\'Heure de Paris', ar: 'ساعة باريس',
      lang: 'fr', level: 'b1', kind: 'article', free: false, hue: 250, motif: 'lighthouse',
      blurb: 'قبل القطارات، كان لكل مدينة ساعتها الخاصة — والقطار أنهى ذلك.',
      lines: [
        { en: 'Autrefois, chaque ville avait sa propre heure.', ar: 'قديمًا، كان لكل مدينة ساعتها الخاصة.', w: { autrefois: 'قديمًا', propre: 'خاصة' } },
        { en: 'Midi, c\'était quand le soleil était au plus haut.', ar: 'كان الظهر حين تكون الشمس في أعلى نقطة.', w: { midi: 'ظهر', soleil: 'شمس' } },
        { en: 'Cela changeait de quelques minutes entre deux villes.', ar: 'وكان ذلك يختلف بدقائق بين مدينتين.', w: { changeait: 'كان يتغيّر' } },
        { en: 'Personne ne s\'en souciait avant le train.', ar: 'ولم يكن أحد يهتم قبل القطار.', w: { souciait: 'كان يهتم' } },
        { en: 'Un horaire de train exige une heure commune.', ar: 'لكن جدول القطار يتطلّب ساعة مشتركة.', w: { horaire: 'جدول', exige: 'يتطلّب' } },
        { en: 'Sinon, deux trains peuvent se rencontrer.', ar: 'وإلا، قد يلتقي قطاران.', w: { sinon: 'وإلا', rencontrer: 'يلتقي' } },
        { en: 'Les compagnies ont donc imposé l\'heure de Paris.', ar: 'ففرضت الشركات ساعة باريس.', w: { 'imposé': 'فرضت' } },
        { en: 'Le temps est devenu une décision, pas une observation.', ar: 'وصار الوقت قرارًا، لا ملاحظة.', w: { 'décision': 'قرار', observation: 'ملاحظة' } }
      ]
    }
  ];

  /* ------------------------------------------------------------ word lists */
  var WORDLISTS = [
    {
      id: 'daily-verbs', ar: 'أفعال يومية', en: 'Everyday verbs', hue: 152,
      words: [
        { en: 'wake up', ar: 'يستيقظ' }, { en: 'eat', ar: 'يأكل' },
        { en: 'drink', ar: 'يشرب' },     { en: 'walk', ar: 'يمشي' },
        { en: 'work', ar: 'يعمل' },      { en: 'study', ar: 'يدرس' },
        { en: 'read', ar: 'يقرأ' },      { en: 'write', ar: 'يكتب' },
        { en: 'listen', ar: 'يستمع' },   { en: 'speak', ar: 'يتحدّث' },
        { en: 'buy', ar: 'يشتري' },      { en: 'sleep', ar: 'ينام' }
      ]
    },
    {
      id: 'weather-time', ar: 'الطقس والوقت', en: 'Weather and time', hue: 205,
      words: [
        { en: 'morning', ar: 'صباح' },   { en: 'evening', ar: 'مساء' },
        { en: 'night', ar: 'ليل' },      { en: 'week', ar: 'أسبوع' },
        { en: 'rain', ar: 'مطر' },       { en: 'wind', ar: 'رياح' },
        { en: 'cloud', ar: 'سحابة' },    { en: 'sun', ar: 'شمس' },
        { en: 'cold', ar: 'بارد' },      { en: 'warm', ar: 'دافئ' },
        { en: 'early', ar: 'مُبكّر' },    { en: 'late', ar: 'متأخّر' }
      ]
    },
    {
      id: 'feelings', ar: 'المشاعر', en: 'Feelings', hue: 330,
      words: [
        { en: 'happy', ar: 'سعيد' },     { en: 'sad', ar: 'حزين' },
        { en: 'tired', ar: 'مُتعَب' },    { en: 'busy', ar: 'مشغول' },
        { en: 'ready', ar: 'جاهز' },     { en: 'afraid', ar: 'خائف' },
        { en: 'proud', ar: 'فخور' },     { en: 'calm', ar: 'هادئ' },
        { en: 'angry', ar: 'غاضب' },     { en: 'bored', ar: 'مَلول' },
        { en: 'excited', ar: 'متحمّس' },  { en: 'safe', ar: 'آمن' }
      ]
    },
    {
      id: 'body-health', ar: 'الجسم والصحة', en: 'Body and health', hue: 172,
      words: [
        { en: 'head', ar: 'رأس' },       { en: 'hand', ar: 'يد' },
        { en: 'heart', ar: 'قلب' },      { en: 'eye', ar: 'عين' },
        { en: 'bone', ar: 'عظم' },       { en: 'skin', ar: 'جِلد' },
        { en: 'breathe', ar: 'يتنفّس' },  { en: 'rest', ar: 'يرتاح' },
        { en: 'pain', ar: 'ألم' },       { en: 'healthy', ar: 'صحّي' },
        { en: 'illness', ar: 'مرض' },    { en: 'medicine', ar: 'دواء' }
      ]
    },
    {
      id: 'thinking', ar: 'التفكير والرأي', en: 'Thinking and opinion', hue: 265,
      words: [
        { en: 'believe', ar: 'يعتقد' },   { en: 'doubt', ar: 'يشكّ' },
        { en: 'argue', ar: 'يُجادل' },     { en: 'agree', ar: 'يوافق' },
        { en: 'suggest', ar: 'يقترح' },   { en: 'admit', ar: 'يعترف' },
        { en: 'assume', ar: 'يفترض' },    { en: 'realise', ar: 'يُدرك' },
        { en: 'consider', ar: 'يعتبر' },  { en: 'refuse', ar: 'يرفض' },
        { en: 'explain', ar: 'يشرح' },    { en: 'prove', ar: 'يُثبت' }
      ]
    },
    {
      id: 'academic', ar: 'كلمات المقالات', en: 'Article words', hue: 350,
      words: [
        { en: 'research', ar: 'أبحاث' },    { en: 'evidence', ar: 'دليل' },
        { en: 'effect', ar: 'أثر' },        { en: 'cause', ar: 'سبب' },
        { en: 'increase', ar: 'يزيد' },     { en: 'reduce', ar: 'يُقلّل' },
        { en: 'roughly', ar: 'تقريبًا' },    { en: 'several', ar: 'عدّة' },
        { en: 'however', ar: 'لكن، غير أن' }, { en: 'therefore', ar: 'لذلك' },
        { en: 'although', ar: 'رغم أن' },   { en: 'despite', ar: 'بالرغم من' }
      ]
    }
  ];

  /* الكلمة الواحدة ~0.6 ثانية لقارئ لغة ثانية؛ تقدير خشن لكنه صادق. */
  function minutesFor(text) {
    var words = text.lines.reduce(function (n, l) { return n + l.en.split(/\s+/).length; }, 0);
    return Math.max(1, Math.round(words / 40));
  }

  global.HARF_DATA = {
    LANGS: LANGS,
    LEVELS: LEVELS,
    KINDS: KINDS,
    TEXTS: TEXTS,
    WORDLISTS: WORDLISTS,
    minutesFor: minutesFor,
    levelOf: function (id) {
      for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i];
      return LEVELS[0];
    },
    langOf: function (id) {
      for (var i = 0; i < LANGS.length; i++) if (LANGS[i].id === id) return LANGS[i];
      return LANGS[0];
    },
    kindOf: function (id) {
      for (var i = 0; i < KINDS.length; i++) if (KINDS[i].id === id) return KINDS[i];
      return KINDS[0];
    },
    textOf: function (id) {
      for (var i = 0; i < TEXTS.length; i++) if (TEXTS[i].id === id) return TEXTS[i];
      return null;
    }
  };
})(window);
