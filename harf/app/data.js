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
    {
      id: 'rainy-days', en: 'Rainy Days', ar: 'الأيام الممطرة',
      lang: 'en', level: 'a1', kind: 'story', free: true, hue: 205, motif: 'rain',
      blurb: 'يمكن للمطر أن يحوّل يومًا عاديًا إلى شيء هادئ وجميل.',
      lines: [
        { en: 'I like rainy days.', ar: 'أحبّ الأيام الممطرة.', w: { rainy: 'مُمطر' } },
        { en: 'The sky is grey and low.', ar: 'السماء رماديّة ومنخفضة.', w: { grey: 'رمادي', low: 'منخفض' } },
        { en: 'I stay at home with a book.', ar: 'أبقى في البيت مع كتاب.', w: { stay: 'أبقى' } },
        { en: 'The rain hits the window.', ar: 'المطر يضرب النافذة.', w: { hits: 'يضرب', window: 'نافذة' } },
        { en: 'It sounds like small drums.', ar: 'يبدو مثل طبول صغيرة.', w: { sounds: 'يبدو', drums: 'طبول' } },
        { en: 'A rainy day is a quiet day.', ar: 'اليوم المُمطر يوم هادئ.', w: { quiet: 'هادئ' } }
      ]
    },
    {
      id: 'my-room', en: 'My Room', ar: 'غرفتي',
      lang: 'en', level: 'a1', kind: 'story', free: true, hue: 285, motif: 'room',
      blurb: 'ليست كبيرة، وليست مميزة، لكنها غرفتي.',
      lines: [
        { en: 'My room is small.', ar: 'غرفتي صغيرة.', w: { small: 'صغيرة' } },
        { en: 'There is a bed near the window.', ar: 'يوجد سرير قرب النافذة.', w: { bed: 'سرير', near: 'قرب' } },
        { en: 'My books sit on two shelves.', ar: 'كتبي موضوعة على رفّين.', w: { shelves: 'رفوف' } },
        { en: 'The walls are white and empty.', ar: 'الجدران بيضاء وفارغة.', w: { walls: 'جدران', empty: 'فارغة' } },
        { en: 'At night I open the window.', ar: 'في الليل أفتح النافذة.', w: {} },
        { en: 'The room is small, but it is mine.', ar: 'الغرفة صغيرة، لكنها لي.', w: { mine: 'لي، مِلكي' } }
      ]
    },
    {
      id: 'i-love-to-read', en: 'I Love to Read', ar: 'أحبّ القراءة',
      lang: 'en', level: 'a1', kind: 'story', free: false, hue: 25, motif: 'books',
      blurb: 'كتاب وأريكة وغرفة هادئة.',
      lines: [
        { en: 'I read before I sleep.', ar: 'أقرأ قبل أن أنام.', w: { before: 'قبل' } },
        { en: 'I sit on the old sofa.', ar: 'أجلس على الأريكة القديمة.', w: { sofa: 'أريكة', old: 'قديمة' } },
        { en: 'One lamp is enough light.', ar: 'مصباح واحد ضوء كافٍ.', w: { lamp: 'مصباح', enough: 'كافٍ' } },
        { en: 'I read slowly. I am not in a hurry.', ar: 'أقرأ ببطء. لستُ مستعجلة.', w: { hurry: 'عجلة' } },
        { en: 'Some pages I read twice.', ar: 'بعض الصفحات أقرأها مرتين.', w: { pages: 'صفحات', twice: 'مرتين' } },
        { en: 'A good story stays with me.', ar: 'القصة الجيدة تبقى معي.', w: { stays: 'تبقى' } }
      ]
    },
    {
      id: 'the-first-step', en: 'The First Step', ar: 'الخطوة الأولى',
      lang: 'en', level: 'a1', kind: 'article', free: false, hue: 172, motif: 'road',
      blurb: 'تعلّم لغة لا يتعلّق بالذكاء، بل بالبداية والاستمرار.',
      lines: [
        { en: 'Learning a language is slow.', ar: 'تعلّم اللغة بطيء.', w: { slow: 'بطيء' } },
        { en: 'This is normal. Do not worry.', ar: 'هذا طبيعي. لا تقلق.', w: { normal: 'طبيعي', worry: 'تقلق' } },
        { en: 'You do not need many words.', ar: 'لا تحتاج كلمات كثيرة.', w: { need: 'تحتاج' } },
        { en: 'You need the same words often.', ar: 'تحتاج الكلمات نفسها كثيرًا.', w: { often: 'كثيرًا، مرارًا' } },
        { en: 'Read a little every day.', ar: 'اقرأ قليلًا كل يوم.', w: { every: 'كل' } },
        { en: 'The first step is the only hard one.', ar: 'الخطوة الأولى هي الصعبة الوحيدة.', w: { only: 'الوحيدة' } }
      ]
    },
    {
      id: 'water', en: 'Water', ar: 'الماء',
      lang: 'en', level: 'a1', kind: 'article', free: false, hue: 195, motif: 'waves',
      blurb: 'أبسط شيء تشربه، وأغربه في الوقت نفسه.',
      lines: [
        { en: 'Water has no colour and no taste.', ar: 'الماء بلا لون وبلا طعم.', w: { colour: 'لون', taste: 'طعم' } },
        { en: 'Your body is mostly water.', ar: 'جسمك ماء في معظمه.', w: { mostly: 'في معظمه' } },
        { en: 'You can live weeks without food.', ar: 'تستطيع العيش أسابيع بدون طعام.', w: { without: 'بدون' } },
        { en: 'You can live only days without water.', ar: 'ولا تستطيع العيش إلا أيامًا بدون ماء.', w: {} },
        { en: 'Ice is water too, but it floats.', ar: 'الثلج ماء أيضًا، لكنه يطفو.', w: { ice: 'ثلج', floats: 'يطفو' } },
        { en: 'Most things sink when they freeze. Water does not.', ar: 'معظم الأشياء تغرق حين تتجمّد. الماء لا.', w: { sink: 'تغرق', freeze: 'تتجمّد' } }
      ]
    },

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
      id: 'the-flower-shop', en: 'The Flower Shop', ar: 'محل الزهور',
      lang: 'en', level: 'a2', kind: 'story', free: false, hue: 330, motif: 'flowers',
      blurb: 'تبدأ أوليفيا عملًا جديدًا، فتكتشف أن الزهور أسهل جزء فيه.',
      lines: [
        { en: 'Olivia started work at a flower shop in May.', ar: 'بدأت أوليفيا العمل في محل زهور في مايو.', w: { started: 'بدأت' } },
        { en: 'At first she knew nothing about flowers.', ar: 'في البداية لم تكن تعرف شيئًا عن الزهور.', w: { nothing: 'لا شيء' } },
        { en: 'Her manager taught her the names slowly.', ar: 'علّمتها مديرتها الأسماء ببطء.', w: { manager: 'مدير', taught: 'علّم' } },
        { en: 'Some customers came for weddings.', ar: 'بعض الزبائن جاؤوا من أجل حفلات زفاف.', w: { customers: 'زبائن', weddings: 'حفلات زفاف' } },
        { en: 'Others came after bad news.', ar: 'وآخرون جاؤوا بعد أخبار سيئة.', w: { others: 'آخرون', news: 'أخبار' } },
        { en: 'She learned to read their faces first.', ar: 'تعلّمت أن تقرأ وجوههم أولًا.', w: { faces: 'وجوه' } },
        { en: 'The flowers were the easy part.', ar: 'كانت الزهور هي الجزء السهل.', w: { easy: 'سهل', part: 'جزء' } }
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
    {
      id: 'le-pain', en: 'Le Pain', ar: 'الخبز',
      lang: 'fr', level: 'a1', kind: 'article', free: true, hue: 38, motif: 'books',
      blurb: 'رغيف بسيط، لكنه يقول الكثير عن يوم الفرنسيين.',
      lines: [
        { en: 'En France, on achète du pain chaque jour.', ar: 'في فرنسا، يشترون الخبز كل يوم.', w: { 'achète': 'يشتري', 'chaque': 'كل' } },
        { en: 'Le pain frais ne reste pas bon longtemps.', ar: 'الخبز الطازج لا يبقى جيدًا طويلًا.', w: { frais: 'طازج', longtemps: 'طويلًا' } },
        { en: 'La boulangerie ouvre très tôt le matin.', ar: 'المخبز يفتح مبكرًا جدًا في الصباح.', w: { boulangerie: 'مخبز', 'tôt': 'مبكرًا' } },
        { en: 'Beaucoup de gens y vont avant le travail.', ar: 'كثير من الناس يذهبون إليه قبل العمل.', w: { gens: 'ناس', avant: 'قبل' } },
        { en: 'Une baguette coûte moins d\'un euro.', ar: 'الباغيت تكلّف أقل من يورو.', w: { 'coûte': 'تكلّف', moins: 'أقل' } },
        { en: 'C\'est simple, mais c\'est important.', ar: 'إنه شيء بسيط، لكنه مهم.', w: { simple: 'بسيط' } }
      ]
    },
    {
      id: 'ma-ville', en: 'Ma Ville', ar: 'مدينتي',
      lang: 'fr', level: 'a1', kind: 'story', free: true, hue: 200, motif: 'city',
      blurb: 'مدينة صغيرة لا يحدث فيها شيء — وهذا بالضبط ما يعجبها.',
      lines: [
        { en: 'Ma ville est petite et calme.', ar: 'مدينتي صغيرة وهادئة.', w: { petite: 'صغيرة', calme: 'هادئة' } },
        { en: 'Il y a une place au centre.', ar: 'يوجد ساحة في المركز.', w: { place: 'ساحة', centre: 'مركز' } },
        { en: 'Les vieux jouent aux cartes le soir.', ar: 'كبار السن يلعبون الورق في المساء.', w: { vieux: 'كبار السن', cartes: 'ورق اللعب' } },
        { en: 'Il n\'y a pas de cinéma ici.', ar: 'لا يوجد سينما هنا.', w: { ici: 'هنا' } },
        { en: 'Mes amis veulent partir à Paris.', ar: 'أصدقائي يريدون الرحيل إلى باريس.', w: { veulent: 'يريدون', partir: 'يرحلون' } },
        { en: 'Moi, j\'aime le silence du dimanche.', ar: 'أما أنا فأحبّ صمت يوم الأحد.', w: { silence: 'صمت', dimanche: 'الأحد' } }
      ]
    },
    {
      id: 'le-chat-du-voisin', en: 'Le Chat du Voisin', ar: 'قط الجار',
      lang: 'fr', level: 'a1', kind: 'story', free: false, hue: 330, motif: 'room',
      blurb: 'قط يدخل من النافذة كل مساء، وكأن البيت بيته.',
      lines: [
        { en: 'Un chat gris entre par ma fenêtre.', ar: 'قط رمادي يدخل من نافذتي.', w: { gris: 'رمادي', 'fenêtre': 'نافذة' } },
        { en: 'Il n\'est pas à moi. Il est au voisin.', ar: 'ليس لي. إنه للجار.', w: { voisin: 'جار' } },
        { en: 'Il arrive toujours vers sept heures.', ar: 'يصل دائمًا نحو الساعة السابعة.', w: { arrive: 'يصل', toujours: 'دائمًا' } },
        { en: 'Il dort sur mon lit pendant une heure.', ar: 'ينام على سريري لمدة ساعة.', w: { dort: 'ينام', pendant: 'خلال' } },
        { en: 'Puis il part sans dire merci.', ar: 'ثم يرحل بدون أن يقول شكرًا.', w: { puis: 'ثم', sans: 'بدون' } },
        { en: 'Demain soir, il reviendra.', ar: 'مساء الغد، سيعود.', w: { demain: 'غدًا', reviendra: 'سيعود' } }
      ]
    },

    /* ==================================================== الفرنسية · A2 */
    {
      id: 'la-boulangerie', en: 'La Boulangerie', ar: 'المخبز',
      lang: 'fr', level: 'a2', kind: 'story', free: false, hue: 32, motif: 'cup',
      blurb: 'خبّاز يعرف زبائنه من طلباتهم، لا من أسمائهم.',
      lines: [
        { en: 'Monsieur Bertin travaille depuis quatre heures du matin.', ar: 'يعمل السيد برتان منذ الرابعة صباحًا.', w: { travaille: 'يعمل', depuis: 'منذ' } },
        { en: 'Il connaît ses clients par leur commande.', ar: 'يعرف زبائنه من طلباتهم.', w: { 'connaît': 'يعرف', commande: 'طلب' } },
        { en: 'La femme au manteau rouge prend deux croissants.', ar: 'المرأة ذات المعطف الأحمر تأخذ قرصانين.', w: { manteau: 'معطف', prend: 'تأخذ' } },
        { en: 'Le vieil homme prend toujours la même chose.', ar: 'الرجل العجوز يأخذ الشيء نفسه دائمًا.', w: { 'même': 'نفس', chose: 'شيء' } },
        { en: 'Un jour, il n\'est pas venu.', ar: 'في يوم من الأيام، لم يأتِ.', w: { venu: 'أتى' } },
        { en: 'Bertin a gardé son pain jusqu\'à midi.', ar: 'احتفظ برتان بخبزه حتى الظهر.', w: { 'gardé': 'احتفظ', 'jusqu\'à': 'حتى' } },
        { en: 'Il ne savait pas quoi faire d\'autre.', ar: 'لم يكن يعرف ماذا يفعل غير ذلك.', w: { savait: 'كان يعرف', autre: 'آخر' } }
      ]
    },
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
    {
      id: 'le-marche-du-samedi', en: 'Le Marché du Samedi', ar: 'سوق السبت',
      lang: 'fr', level: 'a2', kind: 'story', free: false, hue: 130, motif: 'flowers',
      blurb: 'سوق أسبوعي يعرف فيه الجميع بعضهم، ولا أحد يستعجل.',
      lines: [
        { en: 'Le marché commence à huit heures.', ar: 'يبدأ السوق في الثامنة.', w: { commence: 'يبدأ' } },
        { en: 'Les vendeurs crient les prix.', ar: 'الباعة ينادون بالأسعار.', w: { vendeurs: 'باعة', crient: 'ينادون' } },
        { en: 'Ma mère touche chaque tomate avant d\'acheter.', ar: 'أمي تلمس كل حبة طماطم قبل الشراء.', w: { touche: 'تلمس', acheter: 'يشتري' } },
        { en: 'Elle discute les prix, mais sans colère.', ar: 'تفاوض على الأسعار، لكن بدون غضب.', w: { discute: 'تناقش', 'colère': 'غضب' } },
        { en: 'C\'est une sorte de jeu entre eux.', ar: 'إنه نوع من اللعب بينهم.', w: { sorte: 'نوع', jeu: 'لعبة' } },
        { en: 'On rentre lourds et de bonne humeur.', ar: 'نعود محمّلين وبمزاج جيد.', w: { lourds: 'ثِقال', humeur: 'مزاج' } },
        { en: 'Le supermarché est plus rapide, mais moins vivant.', ar: 'السوبرماركت أسرع، لكنه أقل حياة.', w: { rapide: 'سريع', vivant: 'حيّ' } }
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
    {
      id: 'pourquoi-la-baguette', en: 'Pourquoi la Baguette', ar: 'لماذا الباغيت',
      lang: 'fr', level: 'b1', kind: 'article', free: false, hue: 45, motif: 'road',
      blurb: 'شكل الرغيف الطويل ليس صدفة — بل نتيجة قوانين عمل.',
      lines: [
        { en: 'La baguette n\'a pas toujours existé.', ar: 'الباغيت لم تكن موجودة دائمًا.', w: { 'existé': 'وُجدت' } },
        { en: 'Avant, on faisait de grosses miches rondes.', ar: 'سابقًا، كانوا يصنعون أرغفة كبيرة مستديرة.', w: { miches: 'أرغفة', rondes: 'مستديرة' } },
        { en: 'Ces pains mettaient des heures à cuire.', ar: 'كانت تلك الأرغفة تستغرق ساعات للخَبز.', w: { mettaient: 'كانت تستغرق', cuire: 'يخبز' } },
        { en: 'En mille neuf cent vingt, une loi a changé les horaires.', ar: 'في سنة ألف وتسعمئة وعشرين، غيّر قانون ساعات العمل.', w: { loi: 'قانون', horaires: 'مواعيد' } },
        { en: 'Les boulangers ne pouvaient plus commencer avant quatre heures.', ar: 'لم يعد الخبّازون يستطيعون البدء قبل الرابعة.', w: { pouvaient: 'كانوا يستطيعون' } },
        { en: 'Il fallait donc un pain qui cuise vite.', ar: 'فصار لا بد من خبز يُخبز بسرعة.', w: { fallait: 'كان يلزم', vite: 'بسرعة' } },
        { en: 'Une forme longue et fine cuit beaucoup plus rapidement.', ar: 'الشكل الطويل الرفيع يُخبز أسرع بكثير.', w: { forme: 'شكل', fine: 'رفيعة' } },
        { en: 'Le symbole de la France est né d\'une contrainte.', ar: 'رمز فرنسا وُلد من قيد.', w: { 'né': 'وُلد', contrainte: 'قيد' } }
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
