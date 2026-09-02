// 小学5年生 英語問題集（46問）
const grade5EigoQuestions = [
  {
    grade: "小5",
    unit: "アルファベット",
    type: "vocabulary",
    q: "「C」の小文字を書きましょう。",
    a: "c",
    memo: "Cの小文字はcです。"
  },
  {
    grade: "小5",
    unit: "アルファベット",
    type: "vocabulary",
    q: "「D」の小文字を書きましょう。",
    a: "d",
    memo: "Dの小文字はdです。"
  },
  {
    grade: "小5",
    unit: "アルファベット",
    type: "vocabulary",
    q: "大文字だけを使う場面の例は？",
    a: "文の最初、地名、人名など",
    memo: "文の最初や固有名詞には大文字を使います。"
  },
  {
    grade: "小5",
    unit: "アルファベット",
    type: "vocabulary",
    q: "アルファベット順で「G」の次の文字は？",
    a: "H",
    memo: "GHの順です。"
  },
  {
    grade: "小5",
    unit: "アルファベット",
    type: "vocabulary",
    q: "アルファベット順で「M」の前の文字は？",
    a: "L",
    memo: "LMの順です。"
  },
  {
    grade: "小5",
    unit: "自己紹介・日課",
    type: "grammar",
    q: "「私は日本出身です」は英語で何という？",
    a: "I'm from Japan.",
    keywords: ["Japan", "出身", "日本"],
    memo: "I'm from ~.で出身地を伝えます。"
  },
  {
    grade: "小5",
    unit: "自己紹介・日課",
    type: "grammar",
    q: "「あなたはどこの出身ですか」は英語で何という？",
    a: "Where are you from?",
    keywords: ["どこ", "出身"],
    memo: "Where are you from?で出身地をたずねます。"
  },
  {
    grade: "小5",
    unit: "自己紹介・日課",
    type: "grammar",
    q: "「私は〜が得意です」は英語で何という？",
    a: "I'm good at ~.",
    keywords: ["得意"],
    memo: "I'm good at ~.で得意なことを伝えます。"
  },
  {
    grade: "小5",
    unit: "自己紹介・日課",
    type: "grammar",
    q: "「私は毎日〜します」は英語で何という？",
    a: "I ~ every day.",
    keywords: ["毎日"],
    memo: "every dayで「毎日」という意味を加えます。"
  },
  {
    grade: "小5",
    unit: "自己紹介・日課",
    type: "grammar",
    q: "「あなたは何時に起きますか」は英語で何という？",
    a: "What time do you get up?",
    keywords: ["何時", "起き"],
    memo: "時刻をたずねる表現です。"
  },
  {
    grade: "小5",
    unit: "This is/He is/She is",
    type: "grammar",
    q: "\"This is my friend.\" の意味は？",
    a: "これは私の友だちです",
    keywords: ["友だち"],
    memo: "This isで人やものを紹介します。"
  },
  {
    grade: "小5",
    unit: "This is/He is/She is",
    type: "grammar",
    q: "\"He is my brother.\" の意味は？",
    a: "彼は私の兄（弟）です",
    keywords: ["兄", "弟"],
    memo: "Heは男性を指す代名詞です。"
  },
  {
    grade: "小5",
    unit: "This is/He is/She is",
    type: "grammar",
    q: "\"She is kind.\" の意味は？",
    a: "彼女は親切です",
    keywords: ["親切"],
    memo: "Sheは女性を指す代名詞です。"
  },
  {
    grade: "小5",
    unit: "This is/He is/She is",
    type: "grammar",
    q: "\"Who is this?\" の意味は？",
    a: "これは誰ですか",
    keywords: ["誰"],
    memo: "Who is this?で人物をたずねます。"
  },
  {
    grade: "小5",
    unit: "買い物",
    type: "grammar",
    q: "「あなたは何がほしいですか」は英語で何という？",
    a: "What do you want?",
    keywords: ["何", "ほしい"],
    memo: "What do you want?でほしいものをたずねます。"
  },
  {
    grade: "小5",
    unit: "買い物",
    type: "grammar",
    q: "「私は〜がほしいです」は英語で何という？",
    a: "I want ~.",
    keywords: ["ほしい"],
    memo: "I want ~.でほしいものを伝えます。"
  },
  {
    grade: "小5",
    unit: "買い物",
    type: "grammar",
    q: "「いくらですか」は英語で何という？",
    a: "How much is it?",
    keywords: ["いくら"],
    memo: "How much is it?で値段をたずねます。"
  },
  {
    grade: "小5",
    unit: "買い物",
    type: "grammar",
    q: "「これをください」は英語で何という？",
    a: "This one, please.",
    keywords: ["これ"],
    memo: "This one, please.で希望を伝えます。"
  },
  {
    grade: "小5",
    unit: "時間割・教科",
    type: "grammar",
    q: "「あなたは何曜日に音楽がありますか」は英語で何という？",
    a: "What day do you have music?",
    keywords: ["何曜日", "音楽"],
    memo: "曜日と教科をたずねる表現です。"
  },
  {
    grade: "小5",
    unit: "時間割・教科",
    type: "grammar",
    q: "「私は月曜日に理科があります」は英語で何という？",
    a: "I have science on Monday.",
    keywords: ["月曜日", "理科"],
    memo: "on Mondayで曜日を表します。"
  },
  {
    grade: "小5",
    unit: "時間割・教科",
    type: "vocabulary",
    q: "「理科」は英語で何という？",
    a: "science",
    memo: "理科はscienceです。"
  },
  {
    grade: "小5",
    unit: "時間割・教科",
    type: "vocabulary",
    q: "「社会」は英語で何という？",
    a: "social studies",
    memo: "社会はsocial studiesです。"
  },
  {
    grade: "小5",
    unit: "時間割・教科",
    type: "vocabulary",
    q: "「図工」は英語で何という？",
    a: "arts and crafts",
    memo: "図工はarts and craftsです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「先生」は英語で何という？",
    a: "teacher",
    memo: "先生はteacherです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「医者」は英語で何という？",
    a: "doctor",
    memo: "医者はdoctorです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「消防士」は英語で何という？",
    a: "firefighter",
    memo: "消防士はfirefighterです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「パン屋さん」は英語で何という？",
    a: "baker",
    memo: "パン屋さんはbakerです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「カレーライス」は英語で何という？",
    a: "curry and rice",
    memo: "カレーライスはcurry and riceです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「サラダ」は英語で何という？",
    a: "salad",
    memo: "サラダはsaladです。"
  },
  {
    grade: "小5",
    unit: "単語（職業・食べ物）",
    type: "vocabulary",
    q: "「デザート」は英語で何という？",
    a: "dessert",
    memo: "デザートはdessertです。"
  },
  {
    grade: "小5",
    unit: "文の基本構造",
    type: "grammar",
    q: "\"I can swim fast.\" の意味は？",
    a: "私は速く泳ぐことができる",
    keywords: ["速く", "泳"],
    memo: "canで能力を表します。"
  },
  {
    grade: "小5",
    unit: "文の基本構造",
    type: "grammar",
    q: "\"I can not ski.\" の意味は？",
    a: "私はスキーをすることができない",
    keywords: ["スキー", "でき"],
    memo: "can notでできないことを表します。"
  },
  {
    grade: "小5",
    unit: "文の基本構造",
    type: "grammar",
    q: "「あなたは〜できますか」は英語で何という？",
    a: "Can you ~?",
    keywords: ["でき"],
    memo: "Can you ~?で相手の能力をたずねます。"
  },
  {
    grade: "小5",
    unit: "文の基本構造",
    type: "grammar",
    q: "疑問文の最後につける記号は？",
    a: "？（クエスチョンマーク）",
    memo: "疑問文の最後には？をつけます。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「あなたはどこに行きたいですか」は英語で何という？",
    a: "Where do you want to go?",
    keywords: ["どこ", "行き"],
    memo: "行きたい場所をたずねる表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「私は〜に行きたいです」は英語で何という？",
    a: "I want to go to ~.",
    keywords: ["行き"],
    memo: "行きたい場所を伝える表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "vocabulary",
    q: "「図書館」は英語で何という？",
    a: "library",
    memo: "図書館はlibraryです。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "vocabulary",
    q: "「公園」は英語で何という？",
    a: "park",
    memo: "公園はparkです。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "vocabulary",
    q: "「病院」は英語で何という？",
    a: "hospital",
    memo: "病院はhospitalです。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「まっすぐ行ってください」は英語で何という？",
    a: "Go straight.",
    keywords: ["まっすぐ"],
    memo: "道案内の表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「右に曲がってください」は英語で何という？",
    a: "Turn right.",
    keywords: ["右"],
    memo: "道案内の表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「左に曲がってください」は英語で何という？",
    a: "Turn left.",
    keywords: ["左"],
    memo: "道案内の表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「あなたは普段何時に寝ますか」は英語で何という？",
    a: "What time do you usually go to bed?",
    keywords: ["何時", "寝"],
    memo: "日課をたずねる表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「私は7時に起きます」は英語で何という？",
    a: "I get up at seven.",
    keywords: ["7時", "起き"],
    memo: "日課を伝える表現です。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「掃除をする」は英語で何という？",
    a: "clean my room（部屋を掃除する）",
    keywords: ["掃除"],
    memo: "日課の表現の一つです。"
  },
  {
    grade: "小5",
    unit: "日常表現・道案内",
    type: "grammar",
    q: "「宿題をする」は英語で何という？",
    a: "do my homework",
    keywords: ["宿題"],
    memo: "日課の表現の一つです。"
  },
];