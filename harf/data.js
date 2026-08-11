/* ==========================================================================
   Line by Line — content
   Every section is a list of units, every unit is a list of lines to type.
   `ar` / `en` on a unit are the interface labels; `rule` shows above the
   typing area for grammar units.
   ========================================================================== */
(function (global) {
  'use strict';

  /*
   * A line is either a bare string, or [text, arabic meaning, english meaning]
   * when a translation helps. `normalise` below turns both into the same
   * shape so the practice screen never has to care which was written.
   */
  function L(text, ar, en) {
    return [text, ar, en];
  }

  var SECTIONS = [
    {
      id: 'letters',
      ar: 'الأحرف',
      en: 'Letters',
      descAr: 'تتعرّف على الأبجدية حرفًا حرفًا، وتتدرّب على الحروف المركّبة.',
      descEn: 'Meet the alphabet letter by letter, then the tricky combinations.',
      icon: 'letters'
    },
    {
      id: 'numbers',
      ar: 'الأرقام',
      en: 'Numbers',
      descAr: 'الأرقام كتابةً ولفظًا، مع التواريخ والأسعار.',
      descEn: 'Digits and number words, plus dates and prices.',
      icon: 'numbers'
    },
    {
      id: 'words',
      ar: 'الكلمات',
      en: 'Words',
      descAr: 'الكلمات الأكثر استخدامًا في اللغة، سطرًا بعد سطر.',
      descEn: 'The most frequent words in the language, line after line.',
      icon: 'words'
    },
    {
      id: 'sentences',
      ar: 'الجُمل',
      en: 'Sentences',
      descAr: 'جمل كاملة من الحياة اليومية تكتبها سطرًا بسطر.',
      descEn: 'Full everyday sentences, copied line by line.',
      icon: 'sentences'
    },
    {
      id: 'grammar',
      ar: 'القواعد',
      en: 'Grammar',
      descAr: 'قاعدة قصيرة، ثم أسطر تطبّقها عليها مباشرة.',
      descEn: 'A short rule, then lines that put it to work.',
      icon: 'grammar'
    },
    {
      id: 'speed',
      ar: 'سرعة الكتابة',
      en: 'Typing speed',
      descAr: 'تدريبات موقوتة تقيس سرعتك بالكلمة في الدقيقة.',
      descEn: 'Timed drills that measure your words per minute.',
      icon: 'speed'
    }
  ];

  /* ---------------------------------------------------------------- English */

  var EN = {
    letters: [
      {
        id: 'lower',
        ar: 'الحروف الصغيرة',
        en: 'Lowercase',
        lines: [
          'a b c d e f g',
          'h i j k l m n',
          'o p q r s t u',
          'v w x y z',
          'abcdefg hijklmn',
          'opqrstu vwxyz'
        ]
      },
      {
        id: 'upper',
        ar: 'الحروف الكبيرة',
        en: 'Uppercase',
        lines: [
          'A B C D E F G',
          'H I J K L M N',
          'O P Q R S T U',
          'V W X Y Z',
          'Aa Bb Cc Dd Ee Ff',
          'Gg Hh Ii Jj Kk Ll'
        ]
      },
      {
        id: 'home-row',
        ar: 'صف الارتكاز',
        en: 'Home row',
        lines: [
          'asdf jkl; asdf jkl;',
          'aa ss dd ff jj kk ll',
          'fad lad sad glad',
          'ask flask salad',
          'a lad had a flask'
        ]
      },
      {
        id: 'pairs',
        ar: 'الحروف المركّبة',
        en: 'Letter pairs',
        lines: [
          'th th the this that',
          'ch ch chair church',
          'sh sh short fresh',
          'ph ph phone graph',
          'wh wh where white',
          'ck ng qu back long quick'
        ]
      }
    ],

    numbers: [
      {
        id: 'digits',
        ar: 'الأرقام من ٠ إلى ٩',
        en: 'Digits 0 to 9',
        lines: [
          '0 1 2 3 4 5 6 7 8 9',
          '12 34 56 78 90',
          '101 202 303 404',
          '2026 1998 2011',
          '9 8 7 6 5 4 3 2 1 0'
        ]
      },
      {
        id: 'words-1-20',
        ar: 'الأعداد من ١ إلى ٢٠',
        en: 'One to twenty',
        lines: [
          L('one two three four five', 'واحد، اثنان، ثلاثة، أربعة، خمسة'),
          L('six seven eight nine ten', 'ستة، سبعة، ثمانية، تسعة، عشرة'),
          L('eleven twelve thirteen', 'أحد عشر، اثنا عشر، ثلاثة عشر'),
          L('fourteen fifteen sixteen', 'أربعة عشر، خمسة عشر، ستة عشر'),
          L('seventeen eighteen nineteen twenty', 'سبعة عشر، ثمانية عشر، تسعة عشر، عشرون')
        ]
      },
      {
        id: 'tens',
        ar: 'العشرات والمئات',
        en: 'Tens and hundreds',
        lines: [
          L('thirty forty fifty sixty', 'ثلاثون، أربعون، خمسون، ستون'),
          L('seventy eighty ninety', 'سبعون، ثمانون، تسعون'),
          L('one hundred two hundred', 'مئة، مئتان'),
          L('a thousand a million', 'ألف، مليون'),
          L('twenty five, forty seven, ninety nine', 'خمسة وعشرون، سبعة وأربعون، تسعة وتسعون')
        ]
      },
      {
        id: 'dates',
        ar: 'التواريخ والأسعار',
        en: 'Dates and prices',
        lines: [
          L('It costs $12.50 today.', 'سعره ١٢٫٥٠ دولارًا اليوم.'),
          L('The meeting is on 3 March 2026.', 'الاجتماع يوم ٣ مارس ٢٠٢٦.'),
          L('My room number is 407.', 'رقم غرفتي ٤٠٧.'),
          L('She is 21 years old.', 'عمرها واحد وعشرون سنة.'),
          L('Call me at 8:30 in the morning.', 'اتصل بي الساعة ٨:٣٠ صباحًا.')
        ]
      }
    ],

    words: [
      {
        id: 'top-1',
        ar: 'الكلمات الأكثر شيوعًا ١',
        en: 'Most common words 1',
        lines: [
          'the of and a to in',
          'is you that it he was',
          'for on are as with his',
          'they I at be this have',
          'from or one had by word'
        ]
      },
      {
        id: 'top-2',
        ar: 'الكلمات الأكثر شيوعًا ٢',
        en: 'Most common words 2',
        lines: [
          'but not what all were we',
          'when your can said there use',
          'each which she do how their',
          'if will up other about out',
          'many then them these so some'
        ]
      },
      {
        id: 'daily',
        ar: 'كلمات يومية',
        en: 'Everyday words',
        lines: [
          L('morning evening night week', 'صباح، مساء، ليل، أسبوع'),
          L('water bread coffee sugar', 'ماء، خبز، قهوة، سكر'),
          L('house street city country', 'بيت، شارع، مدينة، بلد'),
          L('friend family teacher student', 'صديق، عائلة، معلّم، طالب'),
          L('happy tired busy ready', 'سعيد، متعب، مشغول، جاهز')
        ]
      },
      {
        id: 'study',
        ar: 'كلمات الدراسة والعمل',
        en: 'Study and work',
        lines: [
          L('question answer lesson exam', 'سؤال، إجابة، درس، اختبار'),
          L('project deadline meeting report', 'مشروع، موعد نهائي، اجتماع، تقرير'),
          L('computer keyboard screen file', 'حاسوب، لوحة مفاتيح، شاشة، ملف'),
          L('practice mistake progress result', 'تدريب، خطأ، تقدّم، نتيجة'),
          L('learn write read repeat', 'تعلّم، اكتب، اقرأ، كرّر')
        ]
      }
    ],

    sentences: [
      {
        id: 'intro',
        ar: 'التعريف بالنفس',
        en: 'Introducing yourself',
        lines: [
          L('Hello, my name is Rimas.', 'مرحبًا، اسمي ريماس.'),
          L('I am a web development student.', 'أنا طالبة تطوير ويب.'),
          L('I live in Riyadh.', 'أسكن في الرياض.'),
          L('Nice to meet you.', 'سعدت بلقائك.'),
          L('I am learning English and French.', 'أتعلّم الإنجليزية والفرنسية.')
        ]
      },
      {
        id: 'day',
        ar: 'يوم عادي',
        en: 'An ordinary day',
        lines: [
          L('I wake up early every morning.', 'أستيقظ مبكرًا كل صباح.'),
          L('I drink my coffee and open my laptop.', 'أشرب قهوتي وأفتح حاسوبي.'),
          L('I study for two hours before class.', 'أدرس ساعتين قبل المحاضرة.'),
          L('In the evening I practise typing.', 'في المساء أتدرّب على الكتابة.'),
          L('I go to bed before midnight.', 'أنام قبل منتصف الليل.')
        ]
      },
      {
        id: 'questions',
        ar: 'أسئلة مفيدة',
        en: 'Useful questions',
        lines: [
          L('How are you today?', 'كيف حالك اليوم؟'),
          L('Where is the nearest station?', 'أين أقرب محطة؟'),
          L('Could you repeat that, please?', 'هل يمكنك الإعادة من فضلك؟'),
          L('What time does it open?', 'متى يفتح؟'),
          L('How much does this cost?', 'كم سعر هذا؟')
        ]
      },
      {
        id: 'longer',
        ar: 'أسطر أطول',
        en: 'Longer lines',
        lines: [
          'Learning a language is easier when you practise a little every day.',
          'She writes one page every evening and never skips a day.',
          'The best way to get faster is to slow down and stop making mistakes.',
          'Reading out loud helps you remember new words much longer.',
          'Progress is quiet, but it adds up week after week.'
        ]
      }
    ],

    grammar: [
      {
        id: 'present-simple',
        ar: 'المضارع البسيط',
        en: 'Present simple',
        ruleAr: 'مع he / she / it نضيف s إلى الفعل: he works، she studies، it rains.',
        ruleEn: 'With he / she / it we add -s to the verb: he works, she studies, it rains.',
        lines: [
          L('I work every day.', 'أعمل كل يوم.'),
          L('He works every day.', 'هو يعمل كل يوم.'),
          L('She studies at university.', 'هي تدرس في الجامعة.'),
          L('It rains in December.', 'تمطر في ديسمبر.'),
          L('They study together on Sunday.', 'يدرسون معًا يوم الأحد.')
        ]
      },
      {
        id: 'articles',
        ar: 'أدوات التعريف والتنكير',
        en: 'Articles: a, an, the',
        ruleAr: 'نستخدم a قبل الحرف الساكن، و an قبل حرف العلة، و the للمعرفة المحددة.',
        ruleEn: 'Use "a" before a consonant sound, "an" before a vowel sound, "the" for something specific.',
        lines: [
          L('I have a book and an apple.', 'عندي كتاب وتفاحة.'),
          L('She is an engineer.', 'هي مهندسة.'),
          L('The book on the table is mine.', 'الكتاب الذي على الطاولة لي.'),
          L('A cat sat under an old tree.', 'جلست قطة تحت شجرة قديمة.'),
          L('The answer was easy.', 'كانت الإجابة سهلة.')
        ]
      },
      {
        id: 'plurals',
        ar: 'الجمع',
        en: 'Plurals',
        ruleAr: 'نضيف s للجمع، و es بعد s / x / ch / sh، ونحوّل y إلى ies.',
        ruleEn: 'Add -s, use -es after s / x / ch / sh, and change y to -ies.',
        lines: [
          L('one book, two books', 'كتاب واحد، كتابان'),
          L('one box, three boxes', 'صندوق واحد، ثلاثة صناديق'),
          L('one watch, four watches', 'ساعة واحدة، أربع ساعات'),
          L('one city, five cities', 'مدينة واحدة، خمس مدن'),
          L('one child, many children', 'طفل واحد، أطفال كثيرون')
        ]
      },
      {
        id: 'past',
        ar: 'الماضي البسيط',
        en: 'Past simple',
        ruleAr: 'الأفعال المنتظمة تأخذ ed، والأفعال الشاذة لها صيغ خاصة يجب حفظها.',
        ruleEn: 'Regular verbs take -ed; irregular verbs have their own forms you must learn.',
        lines: [
          L('I worked late yesterday.', 'عملت متأخرًا أمس.'),
          L('She studied all evening.', 'درست طوال المساء.'),
          L('We went to the library.', 'ذهبنا إلى المكتبة.'),
          L('He wrote three pages.', 'كتب ثلاث صفحات.'),
          L('They did not finish the project.', 'لم يُنهوا المشروع.')
        ]
      },
      {
        id: 'prepositions',
        ar: 'حروف الجر in / on / at',
        en: 'Prepositions: in, on, at',
        ruleAr: 'in للشهور والسنوات، on للأيام والتواريخ، at للساعات.',
        ruleEn: 'Use "in" for months and years, "on" for days and dates, "at" for clock times.',
        lines: [
          L('I was born in March.', 'وُلدت في مارس.'),
          L('The exam is on Monday.', 'الاختبار يوم الاثنين.'),
          L('Class starts at nine.', 'المحاضرة تبدأ الساعة التاسعة.'),
          L('We met in 2024 on a rainy day.', 'التقينا في ٢٠٢٤ في يوم ممطر.'),
          L('She arrives at noon on Friday.', 'تصل ظهر يوم الجمعة.')
        ]
      }
    ],

    speed: [
      {
        id: 'sprint-30',
        ar: 'سباق ٣٠ ثانية',
        en: '30 second sprint',
        timed: 30,
        lines: [
          'the and for you not with have this that from',
          'time work good year come know take find give',
          'day week make think want look first even back'
        ]
      },
      {
        id: 'sprint-60',
        ar: 'سباق ٦٠ ثانية',
        en: '60 second sprint',
        timed: 60,
        lines: [
          'She opened the window and let the cold morning air in.',
          'Every line you finish makes the next one a little easier.',
          'We can start again tomorrow with a clear head and a full page.',
          'He counted the words, wrote the date, and closed the notebook.'
        ]
      },
      {
        id: 'accuracy',
        ar: 'تدريب الدقة',
        en: 'Accuracy drill',
        timed: 0,
        lines: [
          'necessary, definitely, separate, receive',
          'because, business, beautiful, believe',
          'through, thought, though, tough',
          'their, there, they’re',
          'accommodation, occurrence, embarrass'
        ]
      }
    ]
  };

  /* ----------------------------------------------------------------- French */

  var FR = {
    letters: [
      {
        id: 'accents',
        ar: 'الحروف المشكّلة',
        en: 'Accented letters',
        ruleAr: 'الفرنسية تكتب بالحروف اللاتينية نفسها، لكن ما يميّزها هو الحركات فوق الحروف — وهي تغيّر النطق والمعنى: ou غير où، و sur غير sûr.',
        ruleEn: 'French uses the Latin letters, but what sets it apart are the accents — they change both sound and meaning: ou is not où, sur is not sûr.',
        lines: [
          'é è ê ë',
          'à â ù û',
          'î ï ô ç',
          L('été mère forêt Noël', 'صيف، أمّ، غابة، عيد الميلاد', 'summer, mother, forest, Christmas'),
          L('là où hôtel août', 'هناك، أين، فندق، أغسطس', 'there, where, hotel, August'),
          L('ça leçon français garçon', 'هذا، درس، فرنسي، ولد', 'this, lesson, French, boy')
        ]
      },
      {
        id: 'noms',
        ar: 'أسماء الحروف',
        en: 'Letter names',
        ruleAr: 'الحرف نفسه لاتيني، لكن اسمه في الفرنسية مختلف تمامًا عن الإنجليزية. اكتب الحرف ثم اسمه كما يُنطق.',
        ruleEn: 'The letters are Latin, but their French names differ completely from English. Type each letter, then its name as it sounds.',
        lines: [
          'a ah, b bé, c cé',
          'd dé, e euh, f effe',
          'g gé, h ache, i i',
          'j ji, k ka, l elle',
          'q ku, r erre, w double vé',
          'x ixe, y i grec, z zède'
        ]
      },
      {
        id: 'combos',
        ar: 'الأصوات المركّبة',
        en: 'Sound combinations',
        ruleAr: 'في الفرنسية حرفان أو ثلاثة قد تعطي صوتًا واحدًا: eau تُنطق «أو»، و oi تُنطق «وا».',
        ruleEn: 'In French two or three letters often make a single sound: eau is “oh”, oi is “wa”.',
        lines: [
          'ai au eau ou oi',
          'an en in on un',
          'eu œu ui ien',
          L('maison beau oiseau', 'بيت، جميل، طائر', 'house, beautiful, bird'),
          L('matin bonjour brun', 'صباح، مرحبًا، بنّي', 'morning, hello, brown'),
          L('fleur nuit bien', 'زهرة، ليل، جيّد', 'flower, night, well')
        ]
      },
      {
        id: 'silent',
        ar: 'الحروف الصامتة',
        en: 'Silent letters',
        ruleAr: 'الفرنسية تكتب حروفًا لا تُنطق، خاصة في آخر الكلمة. اسمع الفرق بين المكتوب والمنطوق.',
        ruleEn: 'French writes letters it does not pronounce, especially at the end of a word. Listen for the gap between spelling and sound.',
        lines: [
          L('petit grand tard', 'صغير، كبير، متأخر', 'small, big, late'),
          L('les nez chez', 'الـ، أنف، عند', 'the, nose, at'),
          L('temps corps toujours', 'وقت، جسد، دائمًا', 'time, body, always'),
          L('vous parlez, ils parlent', 'أنتم تتكلمون، هم يتكلمون', 'you speak, they speak'),
          L('beaucoup, trop, sans', 'كثيرًا، أكثر من اللازم، بدون', 'a lot, too much, without')
        ]
      }
    ],

    numbers: [
      {
        id: 'chiffres',
        ar: 'الأرقام من ٠ إلى ٩',
        en: 'Digits 0 to 9',
        lines: [
          '0 1 2 3 4 5 6 7 8 9',
          '12 34 56 78 90',
          '2026 1998 2011',
          '15 30 45 60',
          '9 8 7 6 5 4 3 2 1 0'
        ]
      },
      {
        id: 'un-vingt',
        ar: 'من واحد إلى عشرين',
        en: 'One to twenty',
        lines: [
          L('un deux trois quatre cinq', 'واحد، اثنان، ثلاثة، أربعة، خمسة', 'one two three four five'),
          L('six sept huit neuf dix', 'ستة، سبعة، ثمانية، تسعة، عشرة', 'six seven eight nine ten'),
          L('onze douze treize', 'أحد عشر، اثنا عشر، ثلاثة عشر', 'eleven twelve thirteen'),
          L('quatorze quinze seize', 'أربعة عشر، خمسة عشر، ستة عشر', 'fourteen fifteen sixteen'),
          L('dix-sept dix-huit dix-neuf vingt', 'سبعة عشر، ثمانية عشر، تسعة عشر، عشرون', 'seventeen eighteen nineteen twenty')
        ]
      },
      {
        id: 'dizaines',
        ar: 'العشرات',
        en: 'Tens',
        lines: [
          L('trente quarante cinquante', 'ثلاثون، أربعون، خمسون', 'thirty forty fifty'),
          L('soixante soixante-dix', 'ستون، سبعون (ستون-عشرة)', 'sixty, seventy (sixty-ten)'),
          L('quatre-vingts quatre-vingt-dix', 'ثمانون (أربع عشرينات)، تسعون', 'eighty (four twenties), ninety'),
          L('cent deux cents mille', 'مئة، مئتان، ألف', 'a hundred, two hundred, a thousand'),
          L('vingt-cinq, quarante-sept, quatre-vingt-dix-neuf', 'خمسة وعشرون، سبعة وأربعون، تسعة وتسعون', 'twenty five, forty seven, ninety nine')
        ]
      },
      {
        id: 'dates-prix',
        ar: 'التواريخ والأسعار',
        en: 'Dates and prices',
        lines: [
          L('C’est 12,50 €.', 'سعره ١٢٫٥٠ يورو.', 'It costs 12.50 euros.'),
          L('La réunion est le 3 mars 2026.', 'الاجتماع يوم ٣ مارس ٢٠٢٦.', 'The meeting is on 3 March 2026.'),
          L('Ma chambre est la 407.', 'غرفتي رقم ٤٠٧.', 'My room is 407.'),
          L('Elle a vingt et un ans.', 'عمرها واحد وعشرون سنة.', 'She is twenty-one.'),
          L('Appelle-moi à 8 h 30 du matin.', 'اتصل بي الساعة ٨:٣٠ صباحًا.', 'Call me at 8:30 in the morning.')
        ]
      }
    ],

    words: [
      {
        id: 'top-1',
        ar: 'الكلمات الأكثر شيوعًا ١',
        en: 'Most common words 1',
        lines: [
          'le de un à être et',
          'en avoir que pour dans',
          'ce il qui ne sur se',
          'pas plus par je avec',
          'tout faire son mettre autre'
        ]
      },
      {
        id: 'top-2',
        ar: 'الكلمات الأكثر شيوعًا ٢',
        en: 'Most common words 2',
        lines: [
          'on mais nous comme mon',
          'si vous leur y dire',
          'elle devoir avant deux même',
          'prendre aussi celui donner bien',
          'où fois vouloir rien encore'
        ]
      },
      {
        id: 'quotidien',
        ar: 'كلمات يومية',
        en: 'Everyday words',
        lines: [
          L('matin soir nuit semaine', 'صباح، مساء، ليل، أسبوع', 'morning, evening, night, week'),
          L('eau pain café sucre', 'ماء، خبز، قهوة، سكر', 'water, bread, coffee, sugar'),
          L('maison rue ville pays', 'بيت، شارع، مدينة، بلد', 'house, street, city, country'),
          L('ami famille professeur étudiant', 'صديق، عائلة، أستاذ، طالب', 'friend, family, teacher, student'),
          L('heureux fatigué occupé prêt', 'سعيد، متعب، مشغول، جاهز', 'happy, tired, busy, ready')
        ]
      },
      {
        id: 'etudes',
        ar: 'كلمات الدراسة والعمل',
        en: 'Study and work',
        lines: [
          L('question réponse leçon examen', 'سؤال، إجابة، درس، اختبار', 'question, answer, lesson, exam'),
          L('projet délai réunion rapport', 'مشروع، مهلة، اجتماع، تقرير', 'project, deadline, meeting, report'),
          L('ordinateur clavier écran fichier', 'حاسوب، لوحة مفاتيح، شاشة، ملف', 'computer, keyboard, screen, file'),
          L('exercice erreur progrès résultat', 'تمرين، خطأ، تقدّم، نتيجة', 'exercise, mistake, progress, result'),
          L('apprendre écrire lire répéter', 'تعلّم، اكتب، اقرأ، كرّر', 'to learn, to write, to read, to repeat')
        ]
      }
    ],

    sentences: [
      {
        id: 'presentation',
        ar: 'التعريف بالنفس',
        en: 'Introducing yourself',
        lines: [
          L('Bonjour, je m’appelle Rimas.', 'مرحبًا، اسمي ريماس.', 'Hello, my name is Rimas.'),
          L('Je suis étudiante en développement web.', 'أنا طالبة تطوير ويب.', 'I am a web development student.'),
          L('J’habite à Riyad.', 'أسكن في الرياض.', 'I live in Riyadh.'),
          L('Enchantée de vous rencontrer.', 'سعدت بلقائك.', 'Nice to meet you.'),
          L('J’apprends l’anglais et le français.', 'أتعلّم الإنجليزية والفرنسية.', 'I am learning English and French.')
        ]
      },
      {
        id: 'journee',
        ar: 'يوم عادي',
        en: 'An ordinary day',
        lines: [
          L('Je me réveille tôt chaque matin.', 'أستيقظ مبكرًا كل صباح.', 'I wake up early every morning.'),
          L('Je bois mon café et j’ouvre mon ordinateur.', 'أشرب قهوتي وأفتح حاسوبي.', 'I drink my coffee and open my computer.'),
          L('J’étudie deux heures avant les cours.', 'أدرس ساعتين قبل المحاضرات.', 'I study two hours before class.'),
          L('Le soir, je m’entraîne à taper.', 'في المساء أتدرّب على الكتابة.', 'In the evening I practise typing.'),
          L('Je me couche avant minuit.', 'أنام قبل منتصف الليل.', 'I go to bed before midnight.')
        ]
      },
      {
        id: 'questions',
        ar: 'أسئلة مفيدة',
        en: 'Useful questions',
        lines: [
          L('Comment allez-vous aujourd’hui ?', 'كيف حالك اليوم؟', 'How are you today?'),
          L('Où est la gare la plus proche ?', 'أين أقرب محطة؟', 'Where is the nearest station?'),
          L('Pouvez-vous répéter, s’il vous plaît ?', 'هل يمكنك الإعادة من فضلك؟', 'Could you repeat, please?'),
          L('À quelle heure ça ouvre ?', 'متى يفتح؟', 'What time does it open?'),
          L('Combien ça coûte ?', 'كم سعره؟', 'How much does it cost?')
        ]
      },
      {
        id: 'longues',
        ar: 'أسطر أطول',
        en: 'Longer lines',
        lines: [
          'Apprendre une langue est plus facile quand on s’entraîne un peu chaque jour.',
          'Elle écrit une page tous les soirs et ne saute jamais un jour.',
          'Pour aller plus vite, il faut d’abord arrêter de faire des fautes.',
          'Lire à voix haute aide à retenir les mots beaucoup plus longtemps.',
          'Le progrès est discret, mais il s’accumule semaine après semaine.'
        ]
      }
    ],

    grammar: [
      {
        id: 'articles',
        ar: 'أدوات التعريف والتنكير',
        en: 'Articles',
        ruleAr: 'المعرفة: le للمذكر، la للمؤنث، les للجمع. النكرة: un، une، des.',
        ruleEn: 'Definite: le (m.), la (f.), les (pl.). Indefinite: un, une, des.',
        lines: [
          L('le livre, la table, les amis', 'الكتاب، الطاولة، الأصدقاء', 'the book, the table, the friends'),
          L('un livre, une table, des amis', 'كتاب، طاولة، أصدقاء', 'a book, a table, some friends'),
          L('le français est une belle langue', 'الفرنسية لغة جميلة', 'French is a beautiful language'),
          L('la voiture de la voisine', 'سيارة الجارة', 'the neighbour\'s car'),
          L('les enfants jouent dans le jardin', 'الأطفال يلعبون في الحديقة', 'the children play in the garden')
        ]
      },
      {
        id: 'present-er',
        ar: 'مضارع الأفعال المنتهية بـ er',
        en: 'Present tense: -er verbs',
        ruleAr: 'parler: je parle، tu parles، il parle، nous parlons، vous parlez، ils parlent.',
        ruleEn: 'parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.',
        lines: [
          L('je parle français', 'أتكلم الفرنسية', 'I speak French'),
          L('tu parles vite', 'أنت تتكلم بسرعة', 'you speak fast'),
          L('il parle avec sa mère', 'هو يتكلم مع أمه', 'he speaks with his mother'),
          L('nous parlons tous les jours', 'نتكلم كل يوم', 'we speak every day'),
          L('vous parlez très bien', 'أنتم تتكلمون جيدًا جدًا', 'you speak very well'),
          L('elles parlent ensemble', 'هنّ يتكلمن معًا', 'they speak together')
        ]
      },
      {
        id: 'genre',
        ar: 'المذكر والمؤنث',
        en: 'Masculine and feminine',
        ruleAr: 'غالبًا نضيف e للمؤنث: un ami / une amie، grand / grande.',
        ruleEn: 'Usually add -e for the feminine: un ami / une amie, grand / grande.',
        lines: [
          L('un ami, une amie', 'صديق، صديقة', 'a friend (m.), a friend (f.)'),
          L('un étudiant, une étudiante', 'طالب، طالبة', 'a student (m.), a student (f.)'),
          L('il est grand, elle est grande', 'هو طويل، هي طويلة', 'he is tall, she is tall'),
          L('un petit chat, une petite maison', 'قط صغير، بيت صغير', 'a small cat, a small house'),
          L('il est français, elle est française', 'هو فرنسي، هي فرنسية', 'he is French, she is French')
        ]
      },
      {
        id: 'etre-avoir',
        ar: 'الفعلان être و avoir',
        en: 'Être and avoir',
        ruleAr: 'être: je suis، tu es، il est. avoir: j’ai، tu as، il a.',
        ruleEn: 'être: je suis, tu es, il est. avoir: j’ai, tu as, il a.',
        lines: [
          L('je suis étudiante', 'أنا طالبة', 'I am a student'),
          L('tu es en retard', 'أنت متأخر', 'you are late'),
          L('nous sommes prêts', 'نحن جاهزون', 'we are ready'),
          L('j’ai vingt ans', 'عمري عشرون سنة', 'I am twenty'),
          L('elle a un frère et une sœur', 'لها أخ وأخت', 'she has a brother and a sister'),
          L('ils ont beaucoup de travail', 'لديهم عمل كثير', 'they have a lot of work')
        ]
      },
      {
        id: 'negation',
        ar: 'النفي ne … pas',
        en: 'Negation: ne … pas',
        ruleAr: 'نحيط الفعل بـ ne و pas: je ne parle pas. وتصبح n’ قبل حرف علة.',
        ruleEn: 'Wrap the verb in ne … pas: je ne parle pas. It becomes n’ before a vowel.',
        lines: [
          L('je ne parle pas anglais', 'لا أتكلم الإنجليزية', 'I do not speak English'),
          L('il ne travaille pas aujourd’hui', 'هو لا يعمل اليوم', 'he is not working today'),
          L('nous n’avons pas le temps', 'ليس لدينا وقت', 'we do not have time'),
          L('elle n’est pas fatiguée', 'هي ليست متعبة', 'she is not tired'),
          L('ils ne comprennent pas la question', 'هم لا يفهمون السؤال', 'they do not understand the question')
        ]
      }
    ],

    speed: [
      {
        id: 'sprint-30',
        ar: 'سباق ٣٠ ثانية',
        en: '30 second sprint',
        timed: 30,
        lines: [
          'le de un et être avoir que pour dans ce',
          'temps travail bien année venir savoir prendre',
          'jour semaine faire penser vouloir premier encore'
        ]
      },
      {
        id: 'sprint-60',
        ar: 'سباق ٦٠ ثانية',
        en: '60 second sprint',
        timed: 60,
        lines: [
          'Elle a ouvert la fenêtre et laissé entrer l’air froid du matin.',
          'Chaque ligne terminée rend la suivante un peu plus facile.',
          'On peut recommencer demain avec la tête claire et une page blanche.',
          'Il a compté les mots, écrit la date et fermé le cahier.'
        ]
      },
      {
        id: 'precision',
        ar: 'تدريب الدقة',
        en: 'Accuracy drill',
        timed: 0,
        lines: [
          'nécessaire, définitivement, séparé, recevoir',
          'parce que, affaires, beau, croire',
          'à travers, pensée, bien que, dur',
          'ce, se, ces, ses',
          'accueil, occurrence, embarrasser'
        ]
      }
    ]
  };

  var LANGS = {
    en: { id: 'en', ar: 'الإنجليزية', en: 'English', native: 'English', dir: 'ltr', accents: [] },
    fr: {
      id: 'fr',
      ar: 'الفرنسية',
      en: 'French',
      native: 'Français',
      dir: 'ltr',
      accents: ['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'ù', 'û', 'ü', 'ç', 'œ', '€', '’']
    }
  };

  global.HARF_CONTENT = {
    sections: SECTIONS,
    langs: LANGS,
    units: { en: EN, fr: FR },

    /* Units for one language + section, or [] if that pair does not exist. */
    getUnits: function (lang, section) {
      var byLang = this.units[lang];
      return (byLang && byLang[section]) || [];
    },

    getSection: function (id) {
      for (var i = 0; i < SECTIONS.length; i++) {
        if (SECTIONS[i].id === id) return SECTIONS[i];
      }
      return null;
    },

    getUnit: function (lang, section, unitId) {
      var units = this.getUnits(lang, section);
      for (var i = 0; i < units.length; i++) {
        if (units[i].id === unitId) return units[i];
      }
      return units[0] || null;
    },

    /* Text of a line, whether it was written bare or with translations. */
    lineText: function (line) {
      return Array.isArray(line) ? line[0] : line;
    },

    lineMeaning: function (line) {
      if (!Array.isArray(line)) return null;
      return { ar: line[1] || '', en: line[2] || '' };
    },

    /* Total number of lines in a section — used for progress percentages. */
    countLines: function (lang, section) {
      return this.getUnits(lang, section).reduce(function (sum, unit) {
        return sum + unit.lines.length;
      }, 0);
    }
  };
})(window);
