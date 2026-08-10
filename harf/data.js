/* ==========================================================================
   Line by Line — content
   Every section is a list of units, every unit is a list of lines to type.
   `ar` / `en` on a unit are the interface labels; `rule` shows above the
   typing area for grammar units.
   ========================================================================== */
(function (global) {
  'use strict';

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
          'one two three four five',
          'six seven eight nine ten',
          'eleven twelve thirteen',
          'fourteen fifteen sixteen',
          'seventeen eighteen nineteen twenty'
        ]
      },
      {
        id: 'tens',
        ar: 'العشرات والمئات',
        en: 'Tens and hundreds',
        lines: [
          'thirty forty fifty sixty',
          'seventy eighty ninety',
          'one hundred two hundred',
          'a thousand a million',
          'twenty five, forty seven, ninety nine'
        ]
      },
      {
        id: 'dates',
        ar: 'التواريخ والأسعار',
        en: 'Dates and prices',
        lines: [
          'It costs $12.50 today.',
          'The meeting is on 3 March 2026.',
          'My room number is 407.',
          'She is 21 years old.',
          'Call me at 8:30 in the morning.'
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
          'morning evening night week',
          'water bread coffee sugar',
          'house street city country',
          'friend family teacher student',
          'happy tired busy ready'
        ]
      },
      {
        id: 'study',
        ar: 'كلمات الدراسة والعمل',
        en: 'Study and work',
        lines: [
          'question answer lesson exam',
          'project deadline meeting report',
          'computer keyboard screen file',
          'practice mistake progress result',
          'learn write read repeat'
        ]
      }
    ],

    sentences: [
      {
        id: 'intro',
        ar: 'التعريف بالنفس',
        en: 'Introducing yourself',
        lines: [
          'Hello, my name is Rimas.',
          'I am a web development student.',
          'I live in Riyadh.',
          'Nice to meet you.',
          'I am learning English and French.'
        ]
      },
      {
        id: 'day',
        ar: 'يوم عادي',
        en: 'An ordinary day',
        lines: [
          'I wake up early every morning.',
          'I drink my coffee and open my laptop.',
          'I study for two hours before class.',
          'In the evening I practise typing.',
          'I go to bed before midnight.'
        ]
      },
      {
        id: 'questions',
        ar: 'أسئلة مفيدة',
        en: 'Useful questions',
        lines: [
          'How are you today?',
          'Where is the nearest station?',
          'Could you repeat that, please?',
          'What time does it open?',
          'How much does this cost?'
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
          'I work every day.',
          'He works every day.',
          'She studies at university.',
          'It rains in December.',
          'They study together on Sunday.'
        ]
      },
      {
        id: 'articles',
        ar: 'أدوات التعريف والتنكير',
        en: 'Articles: a, an, the',
        ruleAr: 'نستخدم a قبل الحرف الساكن، و an قبل حرف العلة، و the للمعرفة المحددة.',
        ruleEn: 'Use "a" before a consonant sound, "an" before a vowel sound, "the" for something specific.',
        lines: [
          'I have a book and an apple.',
          'She is an engineer.',
          'The book on the table is mine.',
          'A cat sat under an old tree.',
          'The answer was easy.'
        ]
      },
      {
        id: 'plurals',
        ar: 'الجمع',
        en: 'Plurals',
        ruleAr: 'نضيف s للجمع، و es بعد s / x / ch / sh، ونحوّل y إلى ies.',
        ruleEn: 'Add -s, use -es after s / x / ch / sh, and change y to -ies.',
        lines: [
          'one book, two books',
          'one box, three boxes',
          'one watch, four watches',
          'one city, five cities',
          'one child, many children'
        ]
      },
      {
        id: 'past',
        ar: 'الماضي البسيط',
        en: 'Past simple',
        ruleAr: 'الأفعال المنتظمة تأخذ ed، والأفعال الشاذة لها صيغ خاصة يجب حفظها.',
        ruleEn: 'Regular verbs take -ed; irregular verbs have their own forms you must learn.',
        lines: [
          'I worked late yesterday.',
          'She studied all evening.',
          'We went to the library.',
          'He wrote three pages.',
          'They did not finish the project.'
        ]
      },
      {
        id: 'prepositions',
        ar: 'حروف الجر in / on / at',
        en: 'Prepositions: in, on, at',
        ruleAr: 'in للشهور والسنوات، on للأيام والتواريخ، at للساعات.',
        ruleEn: 'Use "in" for months and years, "on" for days and dates, "at" for clock times.',
        lines: [
          'I was born in March.',
          'The exam is on Monday.',
          'Class starts at nine.',
          'We met in 2024 on a rainy day.',
          'She arrives at noon on Friday.'
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
          'été mère forêt Noël',
          'là où hôtel août',
          'ça leçon français garçon'
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
          'maison beau oiseau',
          'matin bonjour brun',
          'fleur nuit bien'
        ]
      },
      {
        id: 'silent',
        ar: 'الحروف الصامتة',
        en: 'Silent letters',
        ruleAr: 'الفرنسية تكتب حروفًا لا تُنطق، خاصة في آخر الكلمة. اسمع الفرق بين المكتوب والمنطوق.',
        ruleEn: 'French writes letters it does not pronounce, especially at the end of a word. Listen for the gap between spelling and sound.',
        lines: [
          'petit grand tard',
          'les nez chez',
          'temps corps toujours',
          'vous parlez, ils parlent',
          'beaucoup, trop, sans'
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
          'un deux trois quatre cinq',
          'six sept huit neuf dix',
          'onze douze treize',
          'quatorze quinze seize',
          'dix-sept dix-huit dix-neuf vingt'
        ]
      },
      {
        id: 'dizaines',
        ar: 'العشرات',
        en: 'Tens',
        lines: [
          'trente quarante cinquante',
          'soixante soixante-dix',
          'quatre-vingts quatre-vingt-dix',
          'cent deux cents mille',
          'vingt-cinq, quarante-sept, quatre-vingt-dix-neuf'
        ]
      },
      {
        id: 'dates-prix',
        ar: 'التواريخ والأسعار',
        en: 'Dates and prices',
        lines: [
          'C’est 12,50 €.',
          'La réunion est le 3 mars 2026.',
          'Ma chambre est la 407.',
          'Elle a vingt et un ans.',
          'Appelle-moi à 8 h 30 du matin.'
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
          'matin soir nuit semaine',
          'eau pain café sucre',
          'maison rue ville pays',
          'ami famille professeur étudiant',
          'heureux fatigué occupé prêt'
        ]
      },
      {
        id: 'etudes',
        ar: 'كلمات الدراسة والعمل',
        en: 'Study and work',
        lines: [
          'question réponse leçon examen',
          'projet délai réunion rapport',
          'ordinateur clavier écran fichier',
          'exercice erreur progrès résultat',
          'apprendre écrire lire répéter'
        ]
      }
    ],

    sentences: [
      {
        id: 'presentation',
        ar: 'التعريف بالنفس',
        en: 'Introducing yourself',
        lines: [
          'Bonjour, je m’appelle Rimas.',
          'Je suis étudiante en développement web.',
          'J’habite à Riyad.',
          'Enchantée de vous rencontrer.',
          'J’apprends l’anglais et le français.'
        ]
      },
      {
        id: 'journee',
        ar: 'يوم عادي',
        en: 'An ordinary day',
        lines: [
          'Je me réveille tôt chaque matin.',
          'Je bois mon café et j’ouvre mon ordinateur.',
          'J’étudie deux heures avant les cours.',
          'Le soir, je m’entraîne à taper.',
          'Je me couche avant minuit.'
        ]
      },
      {
        id: 'questions',
        ar: 'أسئلة مفيدة',
        en: 'Useful questions',
        lines: [
          'Comment allez-vous aujourd’hui ?',
          'Où est la gare la plus proche ?',
          'Pouvez-vous répéter, s’il vous plaît ?',
          'À quelle heure ça ouvre ?',
          'Combien ça coûte ?'
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
          'le livre, la table, les amis',
          'un livre, une table, des amis',
          'le français est une belle langue',
          'la voiture de la voisine',
          'les enfants jouent dans le jardin'
        ]
      },
      {
        id: 'present-er',
        ar: 'مضارع الأفعال المنتهية بـ er',
        en: 'Present tense: -er verbs',
        ruleAr: 'parler: je parle، tu parles، il parle، nous parlons، vous parlez، ils parlent.',
        ruleEn: 'parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.',
        lines: [
          'je parle français',
          'tu parles vite',
          'il parle avec sa mère',
          'nous parlons tous les jours',
          'vous parlez très bien',
          'elles parlent ensemble'
        ]
      },
      {
        id: 'genre',
        ar: 'المذكر والمؤنث',
        en: 'Masculine and feminine',
        ruleAr: 'غالبًا نضيف e للمؤنث: un ami / une amie، grand / grande.',
        ruleEn: 'Usually add -e for the feminine: un ami / une amie, grand / grande.',
        lines: [
          'un ami, une amie',
          'un étudiant, une étudiante',
          'il est grand, elle est grande',
          'un petit chat, une petite maison',
          'il est français, elle est française'
        ]
      },
      {
        id: 'etre-avoir',
        ar: 'الفعلان être و avoir',
        en: 'Être and avoir',
        ruleAr: 'être: je suis، tu es، il est. avoir: j’ai، tu as، il a.',
        ruleEn: 'être: je suis, tu es, il est. avoir: j’ai, tu as, il a.',
        lines: [
          'je suis étudiante',
          'tu es en retard',
          'nous sommes prêts',
          'j’ai vingt ans',
          'elle a un frère et une sœur',
          'ils ont beaucoup de travail'
        ]
      },
      {
        id: 'negation',
        ar: 'النفي ne … pas',
        en: 'Negation: ne … pas',
        ruleAr: 'نحيط الفعل بـ ne و pas: je ne parle pas. وتصبح n’ قبل حرف علة.',
        ruleEn: 'Wrap the verb in ne … pas: je ne parle pas. It becomes n’ before a vowel.',
        lines: [
          'je ne parle pas anglais',
          'il ne travaille pas aujourd’hui',
          'nous n’avons pas le temps',
          'elle n’est pas fatiguée',
          'ils ne comprennent pas la question'
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

  global.LBL_CONTENT = {
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

    /* Total number of lines in a section — used for progress percentages. */
    countLines: function (lang, section) {
      return this.getUnits(lang, section).reduce(function (sum, unit) {
        return sum + unit.lines.length;
      }, 0);
    }
  };
})(window);
