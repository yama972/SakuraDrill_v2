// 中学2年生 英語問題集（92問）
const chu2EigoQuestions = [
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"play\" の過去形は？",
    a: "played",
    memo: "規則動詞は語尾にedをつけます。play→played。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"study\" の過去形は？",
    a: "studied",
    memo: "子音字+yで終わる語は、yをiにかえてedをつけます。study→studied。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"stop\" の過去形は？",
    a: "stopped",
    memo: "短母音+子音字で終わる語は、子音字を重ねてedをつけます。stop→stopped。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"go\" の過去形は？",
    a: "went",
    memo: "goは不規則動詞で、過去形はwentです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"have\" の過去形は？",
    a: "had",
    memo: "haveは不規則動詞で、過去形はhadです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"see\" の過去形は？",
    a: "saw",
    memo: "seeは不規則動詞で、過去形はsawです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"come\" の過去形は？",
    a: "came",
    memo: "comeは不規則動詞で、過去形はcameです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"eat\" の過去形は？",
    a: "ate",
    memo: "eatは不規則動詞で、過去形はateです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"do\" の過去形は？",
    a: "did",
    memo: "doは不規則動詞で、過去形はdidです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"make\" の過去形は？",
    a: "made",
    memo: "makeは不規則動詞で、過去形はmadeです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"buy\" の過去形は？",
    a: "bought",
    memo: "buyは不規則動詞で、過去形はboughtです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"write\" の過去形は？",
    a: "wrote",
    memo: "writeは不規則動詞で、過去形はwroteです。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"I ___ (play) tennis yesterday.\" に入る適切な形は？",
    a: "played",
    memo: "過去の出来事なので過去形playedを使います。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"Did you watch TV last night?\" に「はい」と答える正しい形は？",
    a: "Yes, I did.",
    memo: "一般動詞の過去の疑問文にはdidを使って答えます。"
  },
  {
    grade: "中2",
    unit: "過去形",
    type: "grammar",
    q: "\"I did not (didn't) go to school yesterday.\" のように、一般動詞の過去の否定文で使う語は？",
    a: "did not（didn't）",
    memo: "一般動詞の過去の否定文は、動詞の前にdid notを置き、動詞は原形に戻します。"
  },
  {
    grade: "中2",
    unit: "過去進行形",
    type: "grammar",
    q: "\"I was ___ (study) at that time.\" に入る適切な形は？",
    a: "studying",
    memo: "過去進行形は「was/were+動詞のing形」で表します。"
  },
  {
    grade: "中2",
    unit: "過去進行形",
    type: "grammar",
    q: "\"They were ___ (play) soccer then.\" に入る適切な形は？",
    a: "playing",
    memo: "過去進行形は「was/were+ing形」です。"
  },
  {
    grade: "中2",
    unit: "過去進行形",
    type: "grammar",
    q: "\"What were you doing then?\" の意味は？",
    a: "あなたはそのとき何をしていましたか",
    memo: "過去進行形の疑問文で、過去のある時点でしていたことをたずねます。"
  },
  {
    grade: "中2",
    unit: "過去進行形",
    type: "grammar",
    q: "\"She was not (wasn't) sleeping.\" の意味は？",
    a: "彼女は寝ていなかった",
    memo: "過去進行形の否定文はwas/wereのあとにnotを置きます。"
  },
  {
    grade: "中2",
    unit: "過去進行形",
    type: "grammar",
    q: "\"I ___ (walk) in the park when it started to rain.\" に入る適切な形は？",
    a: "was walking",
    memo: "過去のある時点で進行中だった動作を表すため、過去進行形を使います。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"I will ___ (visit) Kyoto next week.\" に入る適切な形は？",
    a: "visit",
    memo: "willのあとの動詞は原形を使います。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"It is going to rain tomorrow.\" の意味は？",
    a: "明日は雨が降りそうだ",
    memo: "be going toは、すでに決まっていることや予測を表します。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"I will help you.\" の意味は？",
    a: "私はあなたを手伝います（手伝うつもりです）",
    memo: "willはその場で決めた意志などを表すことが多いです。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"Will you come to the party?\" に「はい」と答える正しい形は？",
    a: "Yes, I will.",
    memo: "willの疑問文にはwillを使って答えます。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"He is not going to play soccer.\" の意味は？",
    a: "彼はサッカーをするつもりはない",
    memo: "be going toの否定文はbe動詞のあとにnotを置きます。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"I ___ be a doctor in the future.\" に入る適切な語は？",
    a: "will",
    memo: "未来のことを表すときはwillを使います。"
  },
  {
    grade: "中2",
    unit: "未来表現（will・be going to）",
    type: "grammar",
    q: "\"be going to\" のあとの動詞の形は？",
    a: "動詞の原形",
    memo: "be going toのあとには動詞の原形を置きます。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"There ___ a book on the desk.\" に入る適切な語は？",
    a: "is",
    memo: "単数の主語（a book）のときはisを使います。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"There ___ two cats in the room.\" に入る適切な語は？",
    a: "are",
    memo: "複数の主語（two cats）のときはareを使います。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"There is a pen on the table.\" の意味は？",
    a: "机の上にペンが1本あります",
    memo: "There is/areは「〜がある・いる」という意味を表します。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"Is there a park near here?\" に「はい」と答える正しい形は？",
    a: "Yes, there is.",
    memo: "There is/areの疑問文には、there is/areを使って答えます。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"There is not (isn't) any milk in the fridge.\" の意味は？",
    a: "冷蔵庫にはミルクが（1つも）ない",
    memo: "There is/areの否定文はis/areのあとにnotを置きます。"
  },
  {
    grade: "中2",
    unit: "There is/are構文",
    type: "grammar",
    q: "\"How many books are there on the desk?\" の意味は？",
    a: "机の上に本は何冊ありますか",
    memo: "How manyを使って数をたずねる表現です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"To swim is fun.\" のように、「〜すること」という意味で主語や目的語になる不定詞の用法を何という？",
    a: "名詞的用法",
    memo: "「〜すること」という意味の不定詞の用法を名詞的用法といいます。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"I want to be a doctor.\" の \"to be\" の用法は？",
    a: "名詞的用法",
    memo: "wantの目的語として「〜になること」を表す名詞的用法です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"I have a lot of homework to do.\" のように、「〜するための」と名詞を修飾する不定詞の用法を何という？",
    a: "形容詞的用法",
    memo: "名詞を修飾する不定詞の用法を形容詞的用法といいます。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"I went to the library to study.\" のように、「〜するために」と目的を表す不定詞の用法を何という？",
    a: "副詞的用法",
    memo: "目的を表す不定詞の用法を副詞的用法といいます。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"I was happy to see you.\" のように、感情の原因を表す不定詞の用法は？",
    a: "副詞的用法",
    memo: "感情の原因を表す不定詞も副詞的用法の一種です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"something to drink\" の意味は？",
    a: "何か飲むもの",
    memo: "不定詞の形容詞的用法で「飲むための何か」という意味です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"It is important to study English.\" の \"It\" は何を指す？",
    a: "形式的な主語（実際の主語はto study English）",
    memo: "このItは形式的な主語で、実際の主語は不定詞以下の内容です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "不定詞の基本の形は？",
    a: "to+動詞の原形",
    memo: "不定詞は「to+動詞の原形」という形で表されます。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"want to ~\" の意味は？",
    a: "〜したい",
    memo: "want to ~は「〜したい」という意味を表します。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"try to ~\" の意味は？",
    a: "〜しようとする",
    memo: "try to ~は「〜しようとする」という意味を表します。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"need to ~\" の意味は？",
    a: "〜する必要がある",
    memo: "need to ~は「〜する必要がある」という意味を表します。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"How to cook\" の意味は？",
    a: "料理の仕方",
    memo: "「how to+動詞の原形」は「〜のしかた」という意味です。"
  },
  {
    grade: "中2",
    unit: "不定詞",
    type: "grammar",
    q: "\"What to do\" の意味は？",
    a: "何をすべきか",
    memo: "「what to+動詞の原形」は「何を〜すべきか」という意味です。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "\"Swimming is fun.\" の \"Swimming\" のように、動詞にingをつけて名詞の働きをする形を何という？",
    a: "動名詞",
    memo: "動詞のing形で名詞の働きをするものを動名詞といいます。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "\"I like playing tennis.\" の \"playing\" の働きは？",
    a: "likeの目的語（動名詞）",
    memo: "動名詞は動詞の目的語になることができます。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "\"finish ~ing\" の意味は？",
    a: "〜し終える",
    memo: "finishのあとには動名詞（ing形）が続き、「〜し終える」という意味になります。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "\"enjoy ~ing\" の意味は？",
    a: "〜を楽しむ",
    memo: "enjoyのあとには動名詞が続き、「〜を楽しむ」という意味になります。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "動名詞のあとに続けられない品詞は？（動詞の原形は続けられない）",
    a: "動詞の原形はそのまま続けられない",
    memo: "動名詞（ing形）自体が動詞の役割をした上で名詞化しているため、そのあとに動詞の原形は続きません。"
  },
  {
    grade: "中2",
    unit: "動名詞",
    type: "grammar",
    q: "\"Reading books is interesting.\" の主語は？",
    a: "Reading books（動名詞句）",
    memo: "動名詞は文の主語になることもできます。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"tall\" の比較級は？",
    a: "taller",
    memo: "短い形容詞は語尾にerをつけて比較級にします。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"tall\" の最上級は？",
    a: "tallest",
    memo: "短い形容詞は語尾にestをつけて最上級にします。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"big\" の比較級は？",
    a: "bigger",
    memo: "短母音+子音字で終わる語は、子音字を重ねてerをつけます。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"happy\" の比較級は？",
    a: "happier",
    memo: "子音字+yで終わる語は、yをiにかえてerをつけます。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"beautiful\" のような長い形容詞の比較級の作り方は？",
    a: "more beautiful",
    memo: "長い形容詞は前にmoreをつけて比較級にします。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"beautiful\" のような長い形容詞の最上級の作り方は？",
    a: "most beautiful",
    memo: "長い形容詞は前にmostをつけて最上級にします。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"good\" の比較級は？",
    a: "better",
    memo: "goodは不規則に変化し、比較級はbetterです。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"good\" の最上級は？",
    a: "best",
    memo: "goodは不規則に変化し、最上級はbestです。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"I am taller than Tom.\" の意味は？",
    a: "私はトムより背が高い",
    memo: "「比較級+than」で「〜より…」という意味になります。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"This is the tallest building in Japan.\" の意味は？",
    a: "これは日本でいちばん高い建物です",
    memo: "最上級の前にはtheをつけ、「いちばん〜」という意味になります。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"as ~ as ...\" の意味は？",
    a: "…と同じくらい〜",
    memo: "as ~ as ...は「…と同じくらい〜」という同等比較を表します。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"I am as tall as my brother.\" の意味は？",
    a: "私は兄（弟）と同じくらいの背の高さだ",
    memo: "as ~ as構文で、2つのものが同じ程度であることを表します。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"not as ~ as ...\" の意味は？",
    a: "…ほど〜ではない",
    memo: "not as ~ as ...は「…ほど〜ではない」という意味になります。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"Which is faster, a car or a train?\" のように、2つを比べる疑問文で使う語は？",
    a: "which",
    memo: "2つのうちどちらかをたずねるときはwhichを使います。"
  },
  {
    grade: "中2",
    unit: "比較",
    type: "grammar",
    q: "\"I like summer the best of all seasons.\" の \"the best\" は何の最上級？",
    a: "goodまたはwellの最上級",
    memo: "the bestはgood/wellの最上級で「いちばん」という意味です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"I was reading a book when he came.\" の \"when\" の意味は？",
    a: "〜するとき",
    memo: "whenは「〜するとき」という意味を表す接続詞です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"If it rains tomorrow, I will stay home.\" の \"if\" の意味は？",
    a: "もし〜ならば",
    memo: "ifは「もし〜ならば」という条件を表す接続詞です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"I was tired because I worked hard.\" の \"because\" の意味は？",
    a: "〜なので（理由）",
    memo: "becauseは理由を表す接続詞です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"I think that he is right.\" の \"that\" の働きは？",
    a: "〜ということ（thinkの目的語となる節を導く）",
    memo: "thatは「〜ということ」という意味で、名詞節を導きます。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"Though it was raining, we went out.\" の \"though\" の意味は？",
    a: "〜だけれども（逆接）",
    memo: "thoughは「〜だけれども」という逆接を表す接続詞です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "if節（条件を表す節）の中では、未来のことでも動詞は何形で表す？",
    a: "現在形",
    memo: "if節の中では、未来のことでも現在形で表すのが原則です。"
  },
  {
    grade: "中2",
    unit: "接続詞",
    type: "grammar",
    q: "\"before\" と \"after\" の意味の違いは？",
    a: "before：〜する前に／after：〜したあとに",
    memo: "beforeは「〜する前に」、afterは「〜したあとに」という意味です。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"must\" の意味は？",
    a: "〜しなければならない",
    memo: "mustは「〜しなければならない」という義務を表します。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"have to\" の意味は？",
    a: "〜しなければならない",
    memo: "have toもmustと似た「〜しなければならない」という意味です。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"must not\" の意味は？",
    a: "〜してはいけない",
    memo: "must notは禁止を表す表現です。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"don't have to\" の意味は？",
    a: "〜する必要はない",
    memo: "don't have toは「〜する必要はない」という意味で、must notとは意味が異なります。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"should\" の意味は？",
    a: "〜すべきだ（するほうがよい）",
    memo: "shouldは「〜すべきだ」という助言や義務を表します。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"may\" の意味の1つは？",
    a: "〜してもよい（許可）",
    memo: "mayは許可を表す助動詞です。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "\"May I use this pen?\" の意味は？",
    a: "このペンを使ってもいいですか",
    memo: "May I ~?は「〜してもいいですか」と許可を求める表現です。"
  },
  {
    grade: "中2",
    unit: "助動詞",
    type: "grammar",
    q: "助動詞のあとに続く動詞の形は？",
    a: "動詞の原形",
    memo: "助動詞のあとの動詞は、主語に関わらずいつも原形を使います。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"This book is written by him.\" のような文の形を何という？",
    a: "受け身（受動態）",
    memo: "「be動詞+過去分詞」で表される文を受け身（受動態）といいます。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "受け身の基本の形は？",
    a: "be動詞+過去分詞",
    memo: "受け身は「be動詞+過去分詞」の形で表されます。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"This letter was written by Tom.\" の意味は？",
    a: "この手紙はトムによって書かれました",
    memo: "受け身の文で、「〜によって」はbyで表します。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"English is spoken in many countries.\" の意味は？",
    a: "英語は多くの国で話されています",
    memo: "受け身の文で「話されている」という意味を表します。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"This room is not used now.\" の意味は？",
    a: "この部屋は今、使われていません",
    memo: "受け身の否定文はbe動詞のあとにnotを置きます。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"Is this cake made by you?\" に「はい」と答える正しい形は？",
    a: "Yes, it is.",
    memo: "受け身の疑問文には、be動詞を使ってYes/Noで答えます。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"speak\" の過去分詞は？",
    a: "spoken",
    memo: "speakの過去分詞はspokenです。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"write\" の過去分詞は？",
    a: "written",
    memo: "writeの過去分詞はwrittenです。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "\"make\" の過去分詞は？",
    a: "made",
    memo: "makeの過去分詞はmadeです。"
  },
  {
    grade: "中2",
    unit: "受け身（受動態）",
    type: "grammar",
    q: "能動態の文を受け身にするとき、能動態の目的語はどうなる？",
    a: "受け身の文の主語になる",
    memo: "能動態の目的語を主語にして、受け身の文を作ります。"
  },
];