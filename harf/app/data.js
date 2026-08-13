/* ==========================================================================
   حرف — المحتوى

   كل قصة سطور، وكل سطر إنجليزي ومعناه بالعربي، مع معاني الكلمات الصعبة فيه.
   الغلاف يُرسم برمجيًا من `hue` و`motif` — لا صور خارجية، فالتطبيق يشتغل
   كاملًا بدون شبكة بعد أول فتحة.
   ========================================================================== */
(function (global) {
  'use strict';

  var LEVELS = [
    { id: 'a1', ar: 'مبتدئ',  en: 'A1',    hue: 152 },
    { id: 'a2', ar: 'متوسط',  en: 'A2–B1', hue: 213 },
    { id: 'b1', ar: 'متقدم',  en: 'B1+',   hue: 350 }
  ];

  var STORIES = [
    /* ---------------------------------------------------------------- A1 */
    {
      id: 'rainy-days',
      en: 'Rainy Days',
      ar: 'الأيام الممطرة',
      level: 'a1',
      free: true,
      hue: 205,
      motif: 'rain',
      blurb: 'يمكن للمطر أن يحوّل يومًا عاديًا إلى شيء هادئ وجميل.',
      lines: [
        { en: 'I like rainy days.', ar: 'أحبّ الأيام الممطرة.', w: { rainy: 'مُمطر' } },
        { en: 'The sky is grey and low.', ar: 'السماء رماديّة ومنخفضة.', w: { grey: 'رمادي', low: 'منخفض' } },
        { en: 'I stay at home with a book.', ar: 'أبقى في البيت مع كتاب.', w: { stay: 'أبقى' } },
        { en: 'The rain hits the window.', ar: 'المطر يضرب النافذة.', w: { hits: 'يضرب', window: 'نافذة' } },
        { en: 'It sounds like small drums.', ar: 'يبدو مثل طبول صغيرة.', w: { sounds: 'يبدو', drums: 'طبول' } },
        { en: 'My tea is hot and sweet.', ar: 'شايي ساخن وحُلو.', w: { sweet: 'حُلو' } },
        { en: 'A rainy day is a quiet day.', ar: 'اليوم المُمطر يوم هادئ.', w: { quiet: 'هادئ' } }
      ]
    },
    {
      id: 'my-room',
      en: 'My Room',
      ar: 'غرفتي',
      level: 'a1',
      free: true,
      hue: 285,
      motif: 'room',
      blurb: 'ليست كبيرة، وليست مميزة، لكنها غرفتي.',
      lines: [
        { en: 'My room is small.', ar: 'غرفتي صغيرة.', w: { small: 'صغيرة' } },
        { en: 'There is a bed near the window.', ar: 'يوجد سرير قرب النافذة.', w: { bed: 'سرير', near: 'قرب' } },
        { en: 'My books sit on two shelves.', ar: 'كتبي موضوعة على رفّين.', w: { shelves: 'رفوف' } },
        { en: 'The walls are white and empty.', ar: 'الجدران بيضاء وفارغة.', w: { walls: 'جدران', empty: 'فارغة' } },
        { en: 'I want to put pictures on them.', ar: 'أريد أن أضع صورًا عليها.', w: { pictures: 'صور' } },
        { en: 'At night I open the window.', ar: 'في الليل أفتح النافذة.', w: {} },
        { en: 'The room is small, but it is mine.', ar: 'الغرفة صغيرة، لكنها لي.', w: { mine: 'لي، مِلكي' } }
      ]
    },
    {
      id: 'the-first-step',
      en: 'The First Step',
      ar: 'الخطوة الأولى',
      level: 'a1',
      free: false,
      hue: 190,
      motif: 'keys',
      blurb: 'تعلّم الإنجليزية لا يتعلّق بحفظ القواعد، بل يتعلّق بالبداية.',
      lines: [
        { en: 'Learning a language is slow.', ar: 'تعلّم اللغة بطيء.', w: { slow: 'بطيء' } },
        { en: 'This is normal. Do not worry.', ar: 'هذا طبيعي. لا تقلق.', w: { normal: 'طبيعي', worry: 'تقلق' } },
        { en: 'You do not need many words.', ar: 'لا تحتاج كلمات كثيرة.', w: { need: 'تحتاج' } },
        { en: 'You need the same words often.', ar: 'تحتاج الكلمات نفسها كثيرًا.', w: { often: 'كثيرًا، مرارًا' } },
        { en: 'Read one short story every day.', ar: 'اقرأ قصة قصيرة كل يوم.', w: { every: 'كل' } },
        { en: 'Some days are hard. Read anyway.', ar: 'بعض الأيام صعبة. اقرأ على أي حال.', w: { hard: 'صعبة', anyway: 'على أي حال' } },
        { en: 'The first step is the only hard one.', ar: 'الخطوة الأولى هي الصعبة الوحيدة.', w: { only: 'الوحيدة' } }
      ]
    },
    {
      id: 'i-love-to-read',
      en: 'I Love to Read',
      ar: 'أحبّ القراءة',
      level: 'a1',
      free: false,
      hue: 25,
      motif: 'books',
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

    /* ---------------------------------------------------------------- A2 */
    {
      id: 'coffee-breath',
      en: 'Coffee Breath',
      ar: 'رائحة القهوة',
      level: 'a2',
      free: true,
      hue: 30,
      motif: 'cup',
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
      id: 'the-flower-shop',
      en: 'The Flower Shop',
      ar: 'محل الزهور',
      level: 'a2',
      free: false,
      hue: 330,
      motif: 'flowers',
      blurb: 'تبدأ أوليفيا عملًا جديدًا في محل صغير للزهور.',
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
      id: 'when-the-show-ends',
      en: 'When the Show Ends',
      ar: 'حين ينتهي المسلسل',
      level: 'a2',
      free: false,
      hue: 250,
      motif: 'screen',
      blurb: 'حين تنتهي الحلقة الأخيرة ولا تعرف ماذا تفعل بنفسك.',
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
      id: 'seahorses',
      en: 'Seahorses',
      ar: 'أحصنة البحر',
      level: 'a2',
      free: false,
      hue: 320,
      motif: 'waves',
      blurb: 'سمكة برأس حصان وذيل قرد — من أغرب كائنات البحر.',
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

    /* ---------------------------------------------------------------- B1 */
    {
      id: 'the-lighthouse',
      en: 'The Lighthouse',
      ar: 'المنارة',
      level: 'b1',
      free: false,
      hue: 40,
      motif: 'lighthouse',
      blurb: 'أرشدت المنائر السفن عبر العواصف والظلام لآلاف السنين.',
      lines: [
        { en: 'For thousands of years, lighthouses guided ships home.', ar: 'لآلاف السنين، أرشدت المنائر السفن إلى الديار.', w: { guided: 'أرشدت', ships: 'سفن' } },
        { en: 'The idea is simple: put a fire where sailors can see it.', ar: 'الفكرة بسيطة: ضَع نارًا حيث يراها البحّارة.', w: { sailors: 'بحّارة' } },
        { en: 'Keeping that fire alive was not simple at all.', ar: 'أما إبقاء تلك النار مشتعلة فلم يكن بسيطًا أبدًا.', w: { alive: 'حيّة، مشتعلة' } },
        { en: 'Keepers lived alone for months on bare rock.', ar: 'عاش الحرّاس وحدهم شهورًا على صخر عارٍ.', w: { keepers: 'حرّاس', bare: 'عارٍ' } },
        { en: 'They climbed the stairs every few hours, all night.', ar: 'كانوا يصعدون الدرج كل ساعات قليلة، طوال الليل.', w: { climbed: 'صعدوا', stairs: 'درج' } },
        { en: 'Today most lighthouses run without anyone inside.', ar: 'اليوم تعمل أغلب المنائر بلا أحد في داخلها.', w: { without: 'بدون' } },
        { en: 'The light still turns, but nobody is watching the sea.', ar: 'ما زال الضوء يدور، لكن لا أحد يراقب البحر.', w: { turns: 'يدور', watching: 'يراقب' } }
      ]
    },
    {
      id: 'phobias',
      en: 'Phobias',
      ar: 'الرهاب',
      level: 'b1',
      free: false,
      hue: 265,
      motif: 'tangle',
      blurb: 'الخوف جزء طبيعي من الحياة، لكنه أحيانًا يصبح أقوى بكثير.',
      lines: [
        { en: 'Fear is useful. It keeps us away from real danger.', ar: 'الخوف مفيد. يُبقينا بعيدين عن الخطر الحقيقي.', w: { fear: 'خوف', danger: 'خطر' } },
        { en: 'A phobia is different. The fear is much larger than the risk.', ar: 'الرهاب مختلف. الخوف فيه أكبر بكثير من الخطر.', w: { phobia: 'رهاب', risk: 'مخاطرة' } },
        { en: 'Someone may know a spider cannot hurt them.', ar: 'قد يعرف أحدهم أن العنكبوت لا يستطيع إيذاءه.', w: { spider: 'عنكبوت', hurt: 'يؤذي' } },
        { en: 'Knowing that does not stop the reaction.', ar: 'لكن معرفة ذلك لا توقف ردّة الفعل.', w: { reaction: 'ردّة فعل' } },
        { en: 'The body reacts before the mind can argue.', ar: 'يتفاعل الجسد قبل أن يستطيع العقل الجدال.', w: { reacts: 'يتفاعل', argue: 'يُجادل' } },
        { en: 'Treatment usually means meeting the fear in small steps.', ar: 'العلاج غالبًا يعني مواجهة الخوف بخطوات صغيرة.', w: { treatment: 'علاج', usually: 'غالبًا' } },
        { en: 'Slowly, the alarm learns it was wrong.', ar: 'ببطء، يتعلّم جرس الإنذار أنه كان مخطئًا.', w: { alarm: 'إنذار' } }
      ]
    },
    {
      id: 'sitting-too-much',
      en: 'Sitting Too Much',
      ar: 'الجلوس كثيرًا',
      level: 'b1',
      free: false,
      hue: 15,
      motif: 'sofa',
      blurb: 'جسم الإنسان مُصمّم للحركة، لكن الحياة الحديثة خلقت عالمًا جالسًا.',
      lines: [
        { en: 'The human body was built to move.', ar: 'بُني جسم الإنسان ليتحرّك.', w: { built: 'بُني' } },
        { en: 'For most of history, sitting was a short break.', ar: 'في معظم التاريخ، كان الجلوس استراحة قصيرة.', w: { history: 'تاريخ', break: 'استراحة' } },
        { en: 'Now many of us sit for eight hours or more.', ar: 'الآن يجلس كثير منا ثماني ساعات أو أكثر.', w: {} },
        { en: 'Research links long sitting to several health problems.', ar: 'تربط الأبحاث الجلوس الطويل بعدة مشكلات صحية.', w: { research: 'أبحاث', links: 'تربط', several: 'عدة' } },
        { en: 'The surprise is that exercise alone does not undo it.', ar: 'المفاجأة أن الرياضة وحدها لا تُلغي أثره.', w: { exercise: 'رياضة', undo: 'يُلغي' } },
        { en: 'What seems to matter is breaking up the hours.', ar: 'ما يبدو مهمًا هو تقطيع تلك الساعات.', w: { matter: 'يَهُمّ', breaking: 'تقطيع' } },
        { en: 'Standing up for two minutes is worth more than it sounds.', ar: 'الوقوف دقيقتين يستحق أكثر مما يبدو.', w: { worth: 'يستحق' } }
      ]
    },
    {
      id: 'the-network-inside-you',
      en: 'The Network Inside You',
      ar: 'الشبكة بداخلك',
      level: 'b1',
      free: false,
      hue: 172,
      motif: 'cells',
      blurb: 'جهازك المناعي يعمل في هذه اللحظة بالذات، في كل جزء منك.',
      lines: [
        { en: 'Right now, something is defending you.', ar: 'في هذه اللحظة، شيء ما يُدافع عنك.', w: { defending: 'يُدافع' } },
        { en: 'Your immune system is not one organ.', ar: 'جهازك المناعي ليس عضوًا واحدًا.', w: { immune: 'مناعي', organ: 'عضو' } },
        { en: 'It is a network spread through the whole body.', ar: 'إنه شبكة منتشرة في الجسم كله.', w: { network: 'شبكة', spread: 'منتشرة' } },
        { en: 'Some cells patrol. Others wait and remember.', ar: 'بعض الخلايا تجوب. وأخرى تنتظر وتتذكّر.', w: { cells: 'خلايا', patrol: 'تجوب' } },
        { en: 'Memory is why a second infection is often milder.', ar: 'الذاكرة هي سبب كون العدوى الثانية أخف غالبًا.', w: { infection: 'عدوى', milder: 'أخف' } },
        { en: 'This is also how vaccines work.', ar: 'وهكذا تعمل اللقاحات أيضًا.', w: { vaccines: 'لقاحات' } },
        { en: 'They teach the lesson without the illness.', ar: 'إنها تُلقّن الدرس بدون المرض.', w: { teach: 'تُعلّم', illness: 'مرض' } }
      ]
    }
  ];

  /* ------------------------------------------------------------ word lists */
  var WORDLISTS = [
    {
      id: 'daily-verbs',
      ar: 'أفعال يومية',
      en: 'Everyday verbs',
      hue: 152,
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
      id: 'weather-time',
      ar: 'الطقس والوقت',
      en: 'Weather and time',
      hue: 205,
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
      id: 'feelings',
      ar: 'المشاعر',
      en: 'Feelings',
      hue: 330,
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
      id: 'body-health',
      ar: 'الجسم والصحة',
      en: 'Body and health',
      hue: 172,
      words: [
        { en: 'head', ar: 'رأس' },       { en: 'hand', ar: 'يد' },
        { en: 'heart', ar: 'قلب' },      { en: 'eye', ar: 'عين' },
        { en: 'bone', ar: 'عظم' },       { en: 'skin', ar: 'جِلد' },
        { en: 'breathe', ar: 'يتنفّس' },  { en: 'rest', ar: 'يرتاح' },
        { en: 'pain', ar: 'ألم' },       { en: 'healthy', ar: 'صحّي' },
        { en: 'illness', ar: 'مرض' },    { en: 'medicine', ar: 'دواء' }
      ]
    }
  ];

  global.HARF_DATA = {
    LEVELS: LEVELS,
    STORIES: STORIES,
    WORDLISTS: WORDLISTS,
    levelOf: function (id) {
      for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i];
      return LEVELS[0];
    },
    storyOf: function (id) {
      for (var i = 0; i < STORIES.length; i++) if (STORIES[i].id === id) return STORIES[i];
      return null;
    }
  };
})(window);
