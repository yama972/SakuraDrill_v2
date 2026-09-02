// 中学3年生 英語問題集（74問）
const chu3EigoQuestions = [
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have ___ (finish) my homework.\" に入る適切な形は？",
    a: "finished",
    memo: "現在完了形は「have/has+過去分詞」で表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"She has ___ (live) in Tokyo for five years.\" に入る適切な形は？",
    a: "lived",
    memo: "「for+期間」がある場合、継続を表す現在完了形です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have just finished my homework.\" の \"just\" が表す意味は？",
    a: "完了（ちょうど〜したところ）",
    memo: "just を使うと、動作が完了したことを表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have already read this book.\" の \"already\" が表す意味は？",
    a: "完了（すでに）",
    memo: "already は肯定文で「すでに」という完了の意味を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have not finished my homework yet.\" の \"yet\" が表す意味は？",
    a: "完了（まだ〜していない：否定文で）",
    memo: "否定文のyetは「まだ〜していない」という意味です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"Have you finished your homework yet?\" の \"yet\" が表す意味は？",
    a: "完了（もう：疑問文で）",
    memo: "疑問文のyetは「もう〜しましたか」という意味です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have been to Kyoto twice.\" の \"have been to\" の意味は？",
    a: "〜に行ったことがある（経験）",
    memo: "have been toは経験を表す現在完了の表現です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have never eaten sushi.\" の \"never\" が表す意味は？",
    a: "経験（一度も〜したことがない）",
    memo: "neverは経験の否定「一度も〜ない」を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"Have you ever visited Okinawa?\" の \"ever\" が表す意味は？",
    a: "経験（今までに）",
    memo: "everは経験の疑問文で「今までに」という意味を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have lived here since 2020.\" の \"since\" の意味は？",
    a: "〜以来（継続の起点を表す）",
    memo: "sinceは継続の起点（〜から）を表す語です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"for\" と \"since\" の違いは？",
    a: "for：期間の長さを表す／since：起点を表す",
    memo: "forは期間の長さ、sinceは開始時点を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "現在完了形の基本の形は？",
    a: "have（has）+ 過去分詞",
    memo: "現在完了形は「have/has+過去分詞」で表されます。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"go\" の過去分詞は？",
    a: "gone",
    memo: "goの過去分詞はgoneです。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"see\" の過去分詞は？",
    a: "seen",
    memo: "seeの過去分詞はseenです。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have been busy since last week.\" はどの用法の現在完了形？",
    a: "継続",
    memo: "「ずっと〜している」という状態の継続を表しています。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"He has just arrived at the station.\" はどの用法の現在完了形？",
    a: "完了",
    memo: "「ちょうど到着したところ」という完了を表しています。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have visited Kyoto three times.\" はどの用法の現在完了形？",
    a: "経験",
    memo: "「3回訪れたことがある」という経験を表しています。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"How long have you studied English?\" に対する適切な答え方の形は？",
    a: "For+期間 / Since+起点",
    memo: "期間の長さや起点で答えます（例：For three years.）。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"How many times have you been to Osaka?\" の意味は？",
    a: "あなたは何回大阪へ行ったことがありますか",
    memo: "回数をたずねる現在完了の疑問文です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "過去の一時点を表す語（yesterday, last week など）は現在完了形と一緒に使える？",
    a: "使えない",
    memo: "現在完了形は明確な過去の一時点を表す語とは一緒に使えません。"
  },
  {
    grade: "中3",
    unit: "現在完了進行形",
    type: "grammar",
    q: "\"I have been ___ (study) English for two hours.\" に入る適切な形は？",
    a: "studying",
    memo: "現在完了進行形は「have/has been+ing形」で表します。"
  },
  {
    grade: "中3",
    unit: "現在完了進行形",
    type: "grammar",
    q: "現在完了進行形の基本の形は？",
    a: "have（has）been + 動詞のing形",
    memo: "現在完了進行形は動作の継続を強調する表現です。"
  },
  {
    grade: "中3",
    unit: "現在完了進行形",
    type: "grammar",
    q: "\"It has been raining since this morning.\" の意味は？",
    a: "今朝からずっと雨が降っている",
    memo: "現在完了進行形は、過去から今まで続いている動作を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了進行形",
    type: "grammar",
    q: "現在完了形（継続用法）と現在完了進行形の主な違いは？",
    a: "継続している内容が状態か動作か",
    memo: "状態の継続は現在完了形、動作の継続は現在完了進行形で表すことが多いです。"
  },
  {
    grade: "中3",
    unit: "現在完了進行形",
    type: "grammar",
    q: "\"How long have you been waiting?\" の意味は？",
    a: "あなたはどのくらい（の時間）待っていますか",
    memo: "待つという動作の継続時間をたずねています。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"I have a friend who lives in Osaka.\" の \"who\" は何を指す？",
    a: "a friend（人を表す先行詞）",
    memo: "whoは人を表す先行詞を修飾する関係代名詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"This is the book which I bought yesterday.\" の \"which\" は何を指す？",
    a: "the book（物を表す先行詞）",
    memo: "whichは物を表す先行詞を修飾する関係代名詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "先行詞が人のとき使う関係代名詞は？",
    a: "who（主格）、whom（目的格）",
    memo: "先行詞が人のときはwho（主格）やwhom（目的格）を使います。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "先行詞が物や動物のとき使う関係代名詞は？",
    a: "which",
    memo: "先行詞が物や動物のときはwhichを使います。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "先行詞が人でも物でも使える関係代名詞は？",
    a: "that",
    memo: "thatは先行詞が人でも物でも使うことができます。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"This is the pen that I use every day.\" の \"that\" の働きは？",
    a: "目的格の関係代名詞",
    memo: "このthatはthe penを先行詞とする目的格の関係代名詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "目的格の関係代名詞は、しばしば文中で省略できる。主格の関係代名詞は省略できる？",
    a: "できない",
    memo: "主格の関係代名詞は原則省略できません。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"The boy who is running over there is Tom.\" の関係代名詞節はどの語を修飾している？",
    a: "The boy",
    memo: "who以下の節はThe boyを修飾しています。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "関係代名詞に続く節を何という？",
    a: "関係詞節（形容詞節）",
    memo: "関係代名詞に続き、名詞を修飾する節を関係詞節といいます。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"I know the girl whose hair is long.\" の \"whose\" は何格の関係代名詞？",
    a: "所有格",
    memo: "whoseは「〜の」という所有格の関係代名詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"This is the house which was built 100 years ago.\" のwhichの後ろの動詞の形は受け身。この文の意味は？",
    a: "これは100年前に建てられた家です",
    memo: "関係代名詞の節の中でも受け身の文になることがあります。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "関係代名詞を使わずに、2文を1文にまとめる別の方法として、名詞を修飾する分詞を使うことができる。これを何という？",
    a: "分詞の形容詞的用法",
    memo: "分詞を使って名詞を修飾する方法もあります。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"The man standing there is my father.\" の \"standing\" の働きは？",
    a: "The manを修飾する現在分詞（形容詞的用法）",
    memo: "standingはThe manを修飾する現在分詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"The language spoken in Brazil is Portuguese.\" の \"spoken\" の働きは？",
    a: "The languageを修飾する過去分詞（形容詞的用法）",
    memo: "spokenはThe languageを修飾する過去分詞です。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "現在分詞（〜ing）が名詞を修飾するとき、どんな意味を表す？",
    a: "能動（〜している）",
    memo: "現在分詞は「〜している」という能動の意味を表します。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "過去分詞（〜ed など）が名詞を修飾するとき、どんな意味を表す？",
    a: "受け身（〜される、〜された）",
    memo: "過去分詞は「〜される・された」という受け身の意味を表します。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "\"Do you know what this is?\" のように、疑問文が他の文の中に組み込まれた形を何という？",
    a: "間接疑問文",
    memo: "疑問文が文の一部として組み込まれた形を間接疑問文といいます。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "間接疑問文の中の語順は、ふつうの疑問文とどう違う？",
    a: "（疑問詞+）主語+動詞の順になる",
    memo: "間接疑問文では、疑問詞のあとは主語+動詞の通常の語順になります。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "\"What is this?\" を間接疑問文にして \"I don't know ___\" に続けると？",
    a: "what this is",
    memo: "疑問文の倒置がなくなり、主語+動詞の順になります。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "\"Where does he live?\" を \"Do you know ___?\" に続けて間接疑問文にすると？",
    a: "where he lives",
    memo: "doesが消え、動詞に三人称単数のsがついたliveの形に戻ります。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "間接疑問文はどんな動詞のあとによく使われる？",
    a: "know, think, tell などの動詞",
    memo: "知る・考える・伝えるなどの動詞のあとに間接疑問文が続くことが多いです。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"make + O + 動詞の原形\" の意味は？",
    a: "Oに〜させる（強制的に）",
    memo: "makeを使った使役表現で、強制的に何かをさせる意味です。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"let + O + 動詞の原形\" の意味は？",
    a: "Oに〜させる（許可して）",
    memo: "letを使った使役表現で、許可して何かをさせる意味です。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"have + O + 動詞の原形\" の意味は？",
    a: "Oに〜してもらう（依頼して）",
    memo: "haveを使った使役表現で、頼んで何かをしてもらう意味です。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"I saw him cross the street.\" の \"cross\" のような、知覚動詞のあとに続く動詞の形を何という？",
    a: "原形不定詞",
    memo: "知覚動詞のあとに続く動詞の原形を原形不定詞といいます。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "知覚動詞の例を1つ挙げると？",
    a: "see, hear, feel など",
    memo: "見る・聞く・感じるなどを表す動詞が知覚動詞です。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"My mother made me clean my room.\" の意味は？",
    a: "母は私に部屋を掃除させた",
    memo: "母が強制的に掃除させたという使役の意味です。"
  },
  {
    grade: "中3",
    unit: "感嘆文",
    type: "grammar",
    q: "\"What a beautiful flower this is!\" のような文を何という？",
    a: "感嘆文",
    memo: "驚きや感動を表す文を感嘆文といいます。"
  },
  {
    grade: "中3",
    unit: "感嘆文",
    type: "grammar",
    q: "\"What\" で始まる感嘆文の基本の形は？",
    a: "What (a/an) + 形容詞 + 名詞 (+主語+動詞)!",
    memo: "Whatを使う感嘆文はこの形になります。"
  },
  {
    grade: "中3",
    unit: "感嘆文",
    type: "grammar",
    q: "\"How\" で始まる感嘆文の基本の形は？",
    a: "How + 形容詞・副詞 (+主語+動詞)!",
    memo: "Howを使う感嘆文はこの形になります。"
  },
  {
    grade: "中3",
    unit: "感嘆文",
    type: "grammar",
    q: "\"How beautiful this flower is!\" は、What を使うとどう書きかえられる？",
    a: "What a beautiful flower this is!",
    memo: "同じ内容をWhatを使った感嘆文で表すこともできます。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "\"You are a student, aren't you?\" のような、文末に短い疑問形をつけた文を何という？",
    a: "付加疑問文",
    memo: "相手に確認・同意を求める表現を付加疑問文といいます。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "肯定文につける付加疑問は、肯定・否定のどちら？",
    a: "否定",
    memo: "肯定文には否定の付加疑問をつけます。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "否定文につける付加疑問は、肯定・否定のどちら？",
    a: "肯定",
    memo: "否定文には肯定の付加疑問をつけます。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "\"He isn't busy, ___?\" に入る適切な付加疑問は？",
    a: "is he",
    memo: "否定文には肯定の付加疑問をつけるので、is heが入ります。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "\"She can swim, ___?\" に入る適切な付加疑問は？",
    a: "can't she",
    memo: "肯定文には否定の付加疑問をつけるので、can't sheが入ります。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have never seen such a beautiful sunset.\" の意味は？",
    a: "私はこんなに美しい夕日を見たことがない",
    memo: "経験を表す現在完了の否定文です。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"has gone to\" と \"has been to\" の意味の違いは？",
    a: "has gone to：行ってしまった（今ここにいない）／has been to：行ったことがある（経験）",
    memo: "gone toは「行ってしまい今はいない」、been toは経験を表します。"
  },
  {
    grade: "中3",
    unit: "現在完了形",
    type: "grammar",
    q: "\"I have wanted this book for a long time.\" はどの用法？",
    a: "継続",
    memo: "「ずっとほしいと思っている」という状態の継続を表します。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"This is a computer which was made in Japan.\" を分詞を使って書きかえると？",
    a: "This is a computer made in Japan.",
    memo: "関係代名詞節を過去分詞1語で置きかえられる場合があります。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"the boy who is swimming\" を分詞を使って書きかえると？",
    a: "the boy swimming",
    memo: "主格の関係代名詞+be動詞は、現在分詞だけで置きかえられることがあります。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"a language which is spoken in many countries\" のwhichを省略できない理由は？",
    a: "主格の関係代名詞は省略できないため",
    memo: "主格の関係代名詞は原則として省略できません。"
  },
  {
    grade: "中3",
    unit: "関係代名詞・分詞",
    type: "grammar",
    q: "\"This is the letter (that) I received yesterday.\" のthatが省略できる理由は？",
    a: "目的格の関係代名詞だから",
    memo: "目的格の関係代名詞は省略することができます。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "\"I wonder what he is doing now.\" のような文も何の一種？",
    a: "間接疑問文",
    memo: "wonderのあとに疑問詞で始まる節が続く間接疑問文です。"
  },
  {
    grade: "中3",
    unit: "間接疑問文",
    type: "grammar",
    q: "\"Could you tell me how to get to the station?\" の \"how to get to\" の意味は？",
    a: "〜への行き方",
    memo: "「how to+動詞」は「〜のやり方」という意味です。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"I had my hair cut yesterday.\" の意味は？",
    a: "私は昨日、髪を切ってもらった",
    memo: "have+目的語+過去分詞で「〜してもらう」という意味を表します。"
  },
  {
    grade: "中3",
    unit: "原形不定詞（使役・知覚動詞）",
    type: "grammar",
    q: "\"I heard someone singing in the next room.\" の \"singing\" の働きは？",
    a: "知覚動詞heardのあとに続く現在分詞",
    memo: "知覚動詞のあとには原形不定詞だけでなく、進行中の動作を強調する現在分詞（ing形）も続くことがあります。"
  },
  {
    grade: "中3",
    unit: "感嘆文",
    type: "grammar",
    q: "\"What a nice day it is today!\" の文で強調されている語は？",
    a: "nice（すばらしい）",
    memo: "Whatを使った感嘆文で「なんてすばらしい日だ」と強調しています。"
  },
  {
    grade: "中3",
    unit: "付加疑問文",
    type: "grammar",
    q: "\"You like tennis, don't you?\" に対する自然な返答（好きな場合）は？",
    a: "Yes, I do.",
    memo: "肯定の内容が事実なら、Yes, I do.のように答えます。"
  },
];