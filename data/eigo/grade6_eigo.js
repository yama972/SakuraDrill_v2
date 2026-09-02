// 小学6年生 英語問題集（35問）
const grade6EigoQuestions = [
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "\"I went to the zoo.\" の意味は？",
    a: "私は動物園に行きました",
    keywords: ["動物園", "行き"],
    memo: "wentはgoの過去形です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "\"I enjoyed swimming.\" の意味は？",
    a: "私は泳ぐことを楽しみました",
    keywords: ["泳", "楽し"],
    memo: "enjoyedはenjoyの過去形です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "\"It was fun.\" の意味は？",
    a: "それは楽しかったです",
    keywords: ["楽し"],
    memo: "wasはisの過去形です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「あなたは夏休みに何をしましたか」は英語で何という？",
    a: "What did you do during summer vacation?",
    keywords: ["夏休み", "何"],
    memo: "過去の出来事をたずねる表現です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「私は京都に行きました」は英語で何という？",
    a: "I went to Kyoto.",
    keywords: ["京都", "行き"],
    memo: "過去の行動を伝える表現です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「楽しかったです」は英語で何という？",
    a: "It was fun.",
    keywords: ["楽し"],
    memo: "感想を伝える表現です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「私は魚を食べました」は英語で何という？",
    a: "I ate fish.",
    keywords: ["魚", "食べ"],
    memo: "ateはeatの過去形です。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「見る」の過去形は？",
    a: "saw",
    memo: "seeの過去形はsawです。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「行く」の過去形は？",
    a: "went",
    memo: "goの過去形はwentです。"
  },
  {
    grade: "小6",
    unit: "過去のことを話す",
    type: "grammar",
    q: "「食べる」の過去形は？",
    a: "ate",
    memo: "eatの過去形はateです。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "grammar",
    q: "「あなたは将来何になりたいですか」は英語で何という？",
    a: "What do you want to be?",
    keywords: ["将来", "なり"],
    memo: "将来の夢をたずねる表現です。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "grammar",
    q: "「私は〜になりたいです」は英語で何という？",
    a: "I want to be ~.",
    keywords: ["なり"],
    memo: "将来の夢を伝える表現です。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "vocabulary",
    q: "「サッカー選手」は英語で何という？",
    a: "soccer player",
    memo: "サッカー選手はsoccer playerです。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "vocabulary",
    q: "「歌手」は英語で何という？",
    a: "singer",
    memo: "歌手はsingerです。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "vocabulary",
    q: "「看護師」は英語で何という？",
    a: "nurse",
    memo: "看護師はnurseです。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "vocabulary",
    q: "「宇宙飛行士」は英語で何という？",
    a: "astronaut",
    memo: "宇宙飛行士はastronautです。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "vocabulary",
    q: "「なぜですか」は英語で何という？",
    a: "Why?",
    memo: "理由をたずねる表現です。"
  },
  {
    grade: "小6",
    unit: "将来の夢・職業",
    type: "grammar",
    q: "「なぜなら〜だからです」は英語で何という？",
    a: "Because ~.",
    keywords: ["なぜなら"],
    memo: "理由を答える表現です。"
  },
  {
    grade: "小6",
    unit: "その人らしさ・性格",
    type: "grammar",
    q: "\"She is brave.\" の意味は？",
    a: "彼女は勇敢です",
    keywords: ["勇敢"],
    memo: "braveは「勇敢な」という意味です。"
  },
  {
    grade: "小6",
    unit: "その人らしさ・性格",
    type: "grammar",
    q: "\"He is funny.\" の意味は？",
    a: "彼はおもしろいです",
    keywords: ["おもしろい"],
    memo: "funnyは「おもしろい」という意味です。"
  },
  {
    grade: "小6",
    unit: "その人らしさ・性格",
    type: "vocabulary",
    q: "「親切な」は英語で何という？",
    a: "kind",
    memo: "親切なはkindです。"
  },
  {
    grade: "小6",
    unit: "その人らしさ・性格",
    type: "vocabulary",
    q: "「活発な」は英語で何という？",
    a: "active",
    memo: "活発なはactiveです。"
  },
  {
    grade: "小6",
    unit: "その人らしさ・性格",
    type: "grammar",
    q: "「あなたの町のよいところは何ですか」は英語で何という？",
    a: "What is good about your town?",
    keywords: ["町", "よい"],
    memo: "町の良さをたずねる表現です。"
  },
  {
    grade: "小6",
    unit: "中学校生活・部活動",
    type: "grammar",
    q: "「あなたは中学校で何をがんばりたいですか」は英語で何という？",
    a: "What do you want to try in junior high school?",
    keywords: ["中学校", "がんばり"],
    memo: "中学校での抱負をたずねる表現です。"
  },
  {
    grade: "小6",
    unit: "中学校生活・部活動",
    type: "grammar",
    q: "「私はテニス部に入りたいです」は英語で何という？",
    a: "I want to join the tennis team.",
    keywords: ["テニス", "入り"],
    memo: "入りたい部活動を伝える表現です。"
  },
  {
    grade: "小6",
    unit: "中学校生活・部活動",
    type: "vocabulary",
    q: "「吹奏楽部」は英語で何という？",
    a: "brass band",
    memo: "吹奏楽部はbrass bandです。"
  },
  {
    grade: "小6",
    unit: "中学校生活・部活動",
    type: "vocabulary",
    q: "「美術部」は英語で何という？",
    a: "art club",
    memo: "美術部はart clubです。"
  },
  {
    grade: "小6",
    unit: "中学校生活・部活動",
    type: "vocabulary",
    q: "「文化祭」は英語で何という？",
    a: "school festival",
    memo: "文化祭はschool festivalです。"
  },
  {
    grade: "小6",
    unit: "比較表現の基礎",
    type: "grammar",
    q: "\"This is bigger than that.\" の意味は？",
    a: "これはあれより大きいです",
    keywords: ["大き"],
    memo: "比較級biggerを使った文です。"
  },
  {
    grade: "小6",
    unit: "比較表現の基礎",
    type: "grammar",
    q: "「〜より」は英語で何という？",
    a: "than",
    memo: "比較を表すthanです。"
  },
  {
    grade: "小6",
    unit: "比較表現の基礎",
    type: "grammar",
    q: "\"I like summer the best.\" の意味は？",
    a: "私は夏がいちばん好きです",
    keywords: ["夏", "いちばん", "好き"],
    memo: "最上級the bestを使った文です。"
  },
  {
    grade: "小6",
    unit: "単語（世界・文化）",
    type: "vocabulary",
    q: "「オーストラリア」は英語で何という？",
    a: "Australia",
    memo: "オーストラリアはAustraliaです。"
  },
  {
    grade: "小6",
    unit: "単語（世界・文化）",
    type: "vocabulary",
    q: "「アメリカ」は英語で何という？",
    a: "the U.S. (America)",
    memo: "アメリカはthe U.S.やAmericaといいます。"
  },
  {
    grade: "小6",
    unit: "単語（世界・文化）",
    type: "vocabulary",
    q: "「中国」は英語で何という？",
    a: "China",
    memo: "中国はChinaです。"
  },
  {
    grade: "小6",
    unit: "単語（世界・文化）",
    type: "vocabulary",
    q: "「世界」は英語で何という？",
    a: "world",
    memo: "世界はworldです。"
  },
];