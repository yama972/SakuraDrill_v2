/////////////////////////////////////////////////////
// 🌸 SakuraDrill v7.5
// ENGINE INDEX
/////////////////////////////////////////////////////

/*
==========================================================
🌸 SakuraDrill ENGINE INDEX
==========================================================

Engine01　ユーザー管理　　　　　　【Stable】
Engine02　算数データベース　　　　【Stable】
Engine03　出題エンジン　　　　  　【Stable】

Engine04　予約
Engine05　予約
Engine06　予約
Engine07　予約
Engine08　予約

Engine09　Sakuraポイント　　　　【Stable】
Engine10　予約

EEngine11　新潟県たんけん　　　　　【Stable】
Engine12　社会ドリル　　　　　　【Stable】
Engine13　回答判定エンジン　　　【Stable】
Engine14　Sakura Quiz Core　　 【Design】

Engine15　効果音　　　　　　  　【Plan】
Engine16　桜吹雪　　　　　　  　【Plan】
Engine17　成績保存　　　　　  　【Plan】
Engine18　復習モード　　　　  　【Plan】
📝 Design … 設計中　　　🚧 Phase … 実装中
✅ Stable … 完成・運用中　💡 Plan … 今後の予定
==========================================================
Ctrl + F で Engine番号を検索すると
目的の場所へすぐ移動できます。
==========================================================
*/

/////////////////////////////////////////////////////
// 🌸 SDS（Sakura Development Standard）
/////////////////////////////////////////////////////

/*SDS-001
Sakura Choice Engine
同カテゴリ3択生成【採用】

SDS-002
ENGINE INDEX管理【採用】

SDS-003
1Step開発【採用】

SDS-004
動作確認→バックアップ【採用】*/

/////////////////////////////////////////////////////
// 🌸 Stable_10_19 Development Log
/////////////////////////////////////////////////////

/*
Phase1
☑ ENGINE INDEX

☑ Engine13土台

☑ SDS正式採用

□ initQuiz

□ showQuestion

□ Sakura Choice Engine

□ checkAnswer

□ finishQuiz
*/

/////////////////////////////////////////////////////
// 🌸 Common Settings
//
// Role
// ・アプリ全体の共通設定
//
// Contains
// ・APP_NAME
// ・APP_VERSION
// ・dailyMessages
/////////////////////////////////////////////////////

const APP_NAME = "🌸 SakuraDrill";
const APP_VERSION = "v7.5 Stable_10_24";
const dailyMessages = [
    "🌸 今日も一歩ずつ進もう！",
    "😊 まちがえても大丈夫！",
    "⭐ 今日も100点を目指そう！",
    "📚 コツコツ続けると力になるよ！",
    "🌸 あきらめない人は強い！",
    "💮 今日もチャレンジしてみよう！",
    "🎉 勉強すると未来が広がるよ！",
    "😊 ゆっくりでも大丈夫！",
    "🌸 きみならできる！",
    "🏆 今日もがんばろう！"
];

/* =========================
   State（全体状態）
========================= */
// 🌸 問題数設定（v7必須）
let maxQuestions = 10;
let users = [];
// 🌸 安全初期化
let questionCount = 0;
let score = 0;
let wrongList = [];
// 🌸 社会・復習モード
let socialWrongList = [];
// 🌸 小学2年 国語
let currentKokugoQuiz = [];
let kokugoIndex = 0;
let kokugoScore = 0;
let currentKokugoQuestion = null;
let kokugoMode = false;

// 🌸 国語・読みボード
let kokugoBoardAnswer = "";
// 🌸 国語・1問の回答済みフラグ
let kokugoAnswered = false;

// 🌸 理科（小学3〜6年・中学1年）
let currentRikaQuiz = [];
let rikaIndex = 0;
let rikaScore = 0;
let currentRikaQuestion = null;
let rikaAnswered = false;
let rikaMode = false;
let rikaWrongList = [];

// 🌸 英語（小学3〜6年・中学1年）
let currentEnglishQuiz = [];
let englishIndex = 0;
let englishScore = 0;
let currentEnglishQuestion = null;
let englishAnswered = false;
let englishMode = false;
let englishWrongList = [];

// 🌸 英語・間違えた単語の復習モード
let englishReviewMode = false;
let englishReviewScore = 0;

/////////////////////////////////////////////////////
// 🌸 算数テンキー状態
// answer = 回答
// next   = 次の問題
/////////////////////////////////////////////////////

let mathKeypadAction = "answer";

// 🌸 筆算メモ欄・筆算のマス目：テンキーの数字がどの入力欄に
// 書き込まれるかを記録する（null なら回答欄 answerInput）。
// ボタンをクリックすると focus が answerInput 側に移ってしまうため、
// document.activeElement ではなく、フォーカスされた瞬間に記録した
// この値（実際のDOM要素）で判定する。
let mathKeypadFocusedEl = null;
// 🌸 社会・復習モード管理
let socialReviewMode = false;
let socialReviewIndex = 0;
let socialReviewList = [];
let currentQuestion = {};
let currentUser = null;
let currentSubject = "math";
let currentUnit = "basic";
// 🌸 Sakura Point Engine
let sakuraPoint = 0;
/////////////////////////////////////////////////////
// 🌸 Engine20
// 学習記録データベース
/////////////////////////////////////////////////////

let studyRecord = {

    math: {
        answered: 0,
        correct: 0,
        studyTime: 0,

        // 🌸 Engine20
        // 算数・単元別記録
        units: {}
    },

    social: {
        answered: 0,
        correct: 0,
        studyTime: 0,

        // 🌸 Engine20
        // 社会・単元別記録
        units: {}
    },

    // 🌸 国語・学習記録
    kokugo: {
        answered: 0,
        correct: 0,
        studyTime: 0,

        // 🌸 国語・単元別記録
        units: {}
    },

    // 🌸 理科・学習記録
    rika: {
        answered: 0,
        correct: 0,
        studyTime: 0,

        // 🌸 理科・単元別記録
        units: {}
    },

    // 🌸 英語・学習記録
    english: {
        answered: 0,
        correct: 0,
        studyTime: 0,

        // 🌸 英語・単元別記録
        units: {}
    }
};

/////////////////////////////////////////////////////
// 🌸 Engine20 Phase6
// 今日の学習記録 保存
/////////////////////////////////////////////////////

function getTodayKey() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// 🌸 今日の学習記録を保存
function saveTodayStudyRecord() {

    if (!currentUser) return;

    const key =
        `sakuraStudyRecord_${currentUser.name}_${getTodayKey()}`;

    localStorage.setItem(
        key,
        JSON.stringify(studyRecord)
    );

    console.log(
        "🌸 今日の学習記録保存:",
        key,
        studyRecord
    );
}

// 🌸 今日の学習記録を読み込む
function loadTodayStudyRecord() {

    if (!currentUser) return;

    const key =
        `sakuraStudyRecord_${currentUser.name}_${getTodayKey()}`;

    const saved =
        localStorage.getItem(key);

    if (!saved) {

        console.log(
            "🌸 今日の学習記録はありません"
        );

        return;
    }

    try {

        const record =
            JSON.parse(saved);

        // 🌸 算数
        if (record.math) {

            studyRecord.math =
                record.math;
        }

        // 🌸 社会
        if (record.social) {

            studyRecord.social =
                record.social;

        // 🌸 Engine20
        // 以前の学習記録に units がない場合
        if (!studyRecord.social.units) {
        studyRecord.social.units = {};
    }
}

        // 🌸 国語
        if (record.kokugo) {

            studyRecord.kokugo =
                record.kokugo;

            // 🌸 Engine20
            // 以前の学習記録に units がない場合
            if (!studyRecord.kokugo.units) {
                studyRecord.kokugo.units = {};
            }
        }

        // 🌸 理科
        if (record.rika) {

            studyRecord.rika =
                record.rika;

            // 🌸 以前の学習記録に units がない場合
            if (!studyRecord.rika.units) {
                studyRecord.rika.units = {};
            }
        }

        // 🌸 英語
        if (record.english) {

            studyRecord.english =
                record.english;

            // 🌸 以前の学習記録に units がない場合
            if (!studyRecord.english.units) {
                studyRecord.english.units = {};
            }
        }

        console.log(
            "🌸 今日の学習記録を読み込み:",
            record
        );

    } catch (error) {

        console.error(
            "🌸 学習記録読み込みエラー:",
            error
        );
    }
}

/////////////////////////////////////////////////////
// 🌸 Engine20
// 学習記録 初期化
// ※ Sakura Point・ユーザー情報には触れない
/////////////////////////////////////////////////////

function resetStudyRecord() {

    studyRecord = {

        math: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        social: {
            answered: 0,
            correct: 0,
            studyTime: 0,

        // 🌸 Engine20
        // 社会・単元別記録
            units: {}
        },

        // 🌸 国語
        kokugo: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        // 🌸 理科
        rika: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        // 🌸 英語
        english: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        }

    };

    // 🌸 現在ユーザーの「今日の学習記録」だけ削除
    if (currentUser) {

        const key =
            `sakuraStudyRecord_${currentUser.name}_${getTodayKey()}`;

        localStorage.removeItem(key);

        console.log(
            "🌸 今日の学習記録を初期化:",
            key
        );
    }

    console.log(
        "🌸 学習記録初期化完了:",
        studyRecord
    );
}

/////////////////////////////////////////////////////
// 🌸 Engine20
// Stable引き渡し用・全学習記録初期化
// ※ Sakura Point・ユーザー情報には触れない
/////////////////////////////////////////////////////

function resetAllStudyRecords() {

    const keys = Object.keys(localStorage).filter(
        key => key.startsWith("sakuraStudyRecord_")
    );

    keys.forEach(key => {
        localStorage.removeItem(key);
    });

    // 🌸 現在表示中の学習記録も初期化
    studyRecord = {

        math: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        social: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        // 🌸 国語
        kokugo: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        // 🌸 理科
        rika: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        },

        // 🌸 英語
        english: {
            answered: 0,
            correct: 0,
            studyTime: 0,
            units: {}
        }

    };

    console.log(
        "🌸 全学習記録を初期化:",
        keys
    );

    console.log(
        "🌸 学習記録初期化完了:",
        studyRecord
    );
}

/////////////////////////////////////////////////////
// 🌸 Engine20 Phase4
// 学習時間タイマー
/////////////////////////////////////////////////////

let studyTimer = null;
let studyStartTime = 0;
let studyElapsedTime = 0;
let studyActive = false;
let studyLastActionTime = 0;

// 🌸 学習時間タイマー開始
function startStudyTimer() {

    studyStartTime = Date.now();
    studyLastActionTime = Date.now();

    studyActive = true;

    if (studyTimer) {
        clearInterval(studyTimer);
    }

    studyTimer = setInterval(() => {

        if (!studyActive) return;

        const now = Date.now();

        // 🌸 30秒間操作がなければ停止
        if (now - studyLastActionTime >= 30000) {

            studyElapsedTime +=
                studyLastActionTime - studyStartTime;

            studyActive = false;

            console.log(
                "🌸 学習時間タイマー停止（30秒無操作）"
            );

        }

    }, 1000);

    console.log("🌸 学習時間タイマースタート");
}

// 🌸 学習中の操作を記録
function studyActivity() {

    const now = Date.now();

    // 🌸 30秒停止後の操作 → 学習時間を再開
    if (!studyActive) {

        studyStartTime = now;
        studyLastActionTime = now;
        studyActive = true;

        console.log("🌸 学習時間タイマー再開");

        return;
    }

    // 🌸 学習中の操作
    studyLastActionTime = now;

    console.log("🌸 学習操作");
}

// 🌸 学習時間タイマー停止
function stopStudyTimer() {

    if (!studyActive) return;

    studyElapsedTime +=
        Date.now() - studyStartTime;

    studyActive = false;

    if (studyTimer) {
    clearInterval(studyTimer);
    studyTimer = null;
}

console.log(
    "🌸 学習時間:",
    Math.floor(studyElapsedTime / 1000),
    "秒"
);

}

// 🌸 1問分の学習時間を確定
function finishStudyQuestion(subject = "math") {

    // 現在計測中なら、ここまでの時間を加算
    if (studyActive) {

        studyElapsedTime +=
            Date.now() - studyStartTime;
    }

    // 🌸 今回の問題の学習時間
    const time = studyElapsedTime;

    // 🌸 教科別に学習時間を記録
    if (subject === "math") {

        studyRecord.math.studyTime += time;

    } else if (subject === "social") {

        studyRecord.social.studyTime += time;

    } else if (subject === "kokugo") {

    studyRecord.kokugo.studyTime += time;
    } else if (subject === "rika") {

    studyRecord.rika.studyTime += time;
    } else if (subject === "english") {

    studyRecord.english.studyTime += time;
    }

    console.log(
        "🌸 今回の学習時間:",
        Math.floor(time / 1000),
        "秒",
        "教科:",
        subject
    );

    // タイマー停止
    studyActive = false;

    if (studyTimer) {
        clearInterval(studyTimer);
        studyTimer = null;
    }

    // 🌸 次の問題のためにリセット
    studyElapsedTime = 0;

    return time;
}

/////////////////////////////////////////////////////
// 🌸 Engine02 データベース問題管理
/////////////////////////////////////////////////////

let currentQuiz = [];
let currentQuestionIndex = 0;

/////////////////////////////////////////////////////
// 🌸 学年別社会
/////////////////////////////////////////////////////

let socialScore = 0;

/////////////////////////////////////////////////////
// 🌸 Engine14
// 再挑戦エンジン
/////////////////////////////////////////////////////

let retrySocialChallenge = null;

/////////////////////////////////////////////////////
// 📚 復習モード
/////////////////////////////////////////////////////

let reviewMode = false;
let reviewIndex = 0;
let reviewList = [];
let reviewAnswered = false;
let answerChecked = false;
/////////////////////////////////////////////////////
// 🌸 Engine13 共通クイズエンジン
/////////////////////////////////////////////////////

let quizIndex = 0;
let correctCount = 0;

// =========================
// Challenge Engine
// =========================

let challengeType = "";
let challengeCount = 10;
let challengeCourse = "";

/* =========================
🔒 管理者パスワード
========================= */

const ADMIN_PASSWORD = "7146";

/////////////////////////////////////////////////////
// 🌸 Engine13 共通クイズ初期化
/////////////////////////////////////////////////////

function initQuiz(questionList){

    currentQuiz = [...questionList];
    quizIndex = 0;
    correctCount = 0;

}





/////////////////////////////////////////////////////
// 🌸 DOM取得
/////////////////////////////////////////////////////

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");

const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

// 🌸 nextBtn は算数・国語（読み／書き）・社会など複数の画面で
// 共有されているボタン。国語の画面では「けす／こたえる」の
// 右に並べたいので、表示するたびに該当のコントロール欄へ
// 移動させる。他の画面に戻るときは、この元の位置へ戻す。
const nextBtnHomeParent = nextBtn.parentElement;
const nextBtnHomeNext = nextBtn.nextElementSibling;

function restoreNextBtnHome() {
    if (nextBtn.parentElement !== nextBtnHomeParent) {
        nextBtnHomeParent.insertBefore(nextBtn, nextBtnHomeNext);
    }
}

const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");
const appTitle = document.getElementById("appTitle");

if (appTitle) {
    appTitle.textContent = `${APP_NAME} ${APP_VERSION}`;
}

/* ===================================
   🌸 Engine19 切替スイッチ
   false = Engine18
   true  = Engine19
=================================== */

const USE_ENGINE19 = true;
/////////////////////////////////////////////////////
// 🌸 Engine 01
// 🌸 User Engine
// Chapter 1
// SakuraDrill v7.5
//
// Status : Development
//
// Role
// ・利用者管理
// ・利用者読込み
// ・利用者保存
// ・利用者一覧表示
// ・利用者編集
// ・利用者操作
//
// Flow
// ・load
//      ↓
// ・save
//      ↓
// ・list
//      ↓
// ・action
//
// Functions
// ・loadUsers()
// ・saveUsers()
// ・renderUserList()
// ・showAddUserUI()
// ・addUser()
// ・deleteUser()
// ・renameUser()
// ・attachUserActions()
/////////////////////////////////////////////////////
/* =========================
   利用者データ読み込み
========================= */

function loadUsers() {
    const data = localStorage.getItem("users");

    // 🌸 バグ修正：保存データが壊れたJSONだった場合に
    // ここで例外が発生すると load イベント全体が止まり
    // ホーム画面が真っ白のまま固まってしまう
    let parsed = null;

    if (data) {
        try {
            parsed = JSON.parse(data);

            if (!Array.isArray(parsed)) {
                parsed = null;
            }

        } catch (error) {
            console.error(
                "🌸 ユーザーデータ読み込みエラー:",
                error
            );
            parsed = null;
        }
    }

    if (parsed) {

        // 🌸 旧データ対応（超重要）
        users = parsed.map(u => {
            if (typeof u === "string") {
                return {
                    name: u,
                    grade: "grade4",
                    icon: "😊"
                };
            }
            return u;
        });

    } else {
        users = [
            { name: "市華", grade: "grade4", icon: "👧" },
            { name: "心平", grade: "grade2", icon: "👦" }
        ];

        saveUsers();
    }
}


/* =========================
   利用者保存
========================= */

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function clearScreens() {

    // 🌸 国語画面用に移動させていた nextBtn を元の位置へ戻す
    restoreNextBtnHome();

    const screens = [

        "homeScreen",
        "gradeArea",
        "subjectArea",
        "adminArea",
        "challengeHomeArea",
        "challengeCourseArea",
        "kokugoCourseArea",

        "socialArea",
        "socialHome",
        "socialGradeArea",

        "prefectureChallengeArea",
        "regionChallengeArea",
        "nationArea",
        "japanChallengeArea",

        "exploreQuizArea",
        "exploreResult",

        "quizArea",
        "resultArea",
        "socialQuizArea",
        "socialResultArea",

        "weakHistoryArea",
        "japanFinishArea",

        // 🌸 Engine20 学習レポート
        "studyRecordArea"

    ];

    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = "none";
        }
    });

}

/* =========================
   🌸 全員のSakura Pointをリセット
========================= */

function resetAllPoints() {
    if (!confirm("🌸 全員のSakura Pointを0Pにしますか？")) {
    return;
    }
    users.forEach(user => {
        user.point = 0;
    });

    saveUsers();

    // 現在のユーザーも0Pにする
    if (currentUser) {
        currentUser.point = 0;
    }

    sakuraPoint = 0;

    showPoint();

    console.log("🌸 全員のポイントを0にしました。");

}

/* ===================================
   🌸 Management System
=================================== */

/* =========================
   🌸 Sakura Point 管理画面
========================= */

function showPointManager() {

    const password = prompt("🔒 管理者パスワードを入力してください");

    if (password === null) {
        return;
    }

    if (password !== ADMIN_PASSWORD) {

        alert("❌ パスワードが違います。");

        return;

    }

    clearScreens();

    const adminArea = document.getElementById("adminArea");

    if (!adminArea) return;

    adminArea.style.display = "block";

    updatePointManager();

}

/* =========================
   🌸 Sakura Point 一覧表示
========================= */

function updatePointManager() {

    const area = document.getElementById("pointManagerArea");

    if (!area) return;

    let html = "";

    users.forEach((user, index) => {

        html += `

<div class="pointCard">

    <h3>${user.icon} ${user.name}</h3>

    <p>🌸 現在： <strong>${user.point || 0}P</strong></p>

    <input
        type="number"
        id="pointInput${index}"
        placeholder="変更ポイント">

    <br><br>

<button onclick="addManagerPoint(${index})">＋ 加算</button>

<button onclick="subPoint(${index})">－ 減算</button>

<button onclick="changePoint(${index})">変更</button>

<button onclick="resetPoint(${index})">0P</button>

</div>

<hr>

`;

    });

    html += `

<button class="menuBtn"
        onclick="resetAllPoints();
                 updatePointManager();">

🌸 全員0P

</button>

`;

    area.innerHTML = html;

}


/* =========================
   利用者一覧表示
========================= */

function renderUserList() {
    const area = document.getElementById("userListArea");
    if (!area) return;

    area.innerHTML = "";

    users.forEach((user, index) => {

        const btn = document.createElement("button");

        btn.className = "mainBtn";

        btn.innerHTML = `${user.icon} ${user.name}`;

        btn.onclick = function () {
            selectUser(index);
        };

        area.appendChild(btn);
    });
}


/* =========================
   ユーザー追加（仮）
========================= */

function addUser(name, grade, icon) {
    users.push({
        name: name,
        grade: grade,
        icon: icon
    });

    saveUsers();
    renderUserList();
}

/////////////////////////////////////////////////////
// 🌸 Part2 UI：利用者操作機能
/////////////////////////////////////////////////////

/* =========================
   ユーザー削除
========================= */

function deleteUser(index) {

    const target = users[index];

    if (!confirm(`${target.name} を削除しますか？`)) {
        return;
    }

    users.splice(index, 1);

    saveUsers();
    renderUserList();

    console.log("🗑 削除:", target.name);
}

/* =========================
   ユーザー名変更
========================= */

function renameUser(index) {

    const target = users[index];

    const newName = prompt("新しい名前を入力してください", target.name);

    if (!newName || newName.trim() === "") {
        return;
    }

    users[index].name = newName.trim();

    saveUsers();
    renderUserList();

    console.log("✏ 変更:", newName);
}



/* =========================
   ボタン拡張（長押し想定）
========================= */

function attachUserActions() {

    const area = document.getElementById("userListArea");
    if (!area) return;

    const buttons = area.querySelectorAll("button");

    buttons.forEach((btn, index) => {

        // 右クリックで削除
        btn.oncontextmenu = function (e) {
            e.preventDefault();
            deleteUser(index);
        };

        // ダブルクリックで名前変更
        btn.ondblclick = function () {
            renameUser(index);
        };
    });
}

/* =========================
   renderUserList強化版（上書き）
========================= */

const originalRenderUserList = renderUserList;

renderUserList = function () {

    originalRenderUserList();

    attachUserActions();
}


/////////////////////////////////////////////////////
// 🌸 Part3 学習システム連動
/////////////////////////////////////////////////////

/* =========================
   ユーザー選択 → 学習開始
========================= */

function selectUser(index) {

    currentUser = users[index];

    console.log("🌸 選択ユーザー:", currentUser);

    // 🌸 バグ修正：毎回アラートが出て操作の邪魔になるため削除
    // （必要ならここに画面内メッセージ表示などに差し替え可能）

    // 学習準備
    startUserSession();
}

/* =========================
セッション開始
========================= */

function startUserSession() {

    console.log("🌸 セッション開始:", currentUser.name);

    // 🌸 今日の学習記録を読み込む
    loadTodayStudyRecord();

    // 🌸 現在のユーザーのポイントを反映
    sakuraPoint = currentUser.point || 0;

    // 🌸 表示更新
    showPoint();

    showScreen("grade");

}

/////////////////////////////////////////////////////
// 🌸 End of Engine 01
/////////////////////////////////////////////////////

// ==========================================
// 🌸 Engine02 Quiz Engine
// Version : Phase1
// ==========================================

const quizState = {

    questions: [],

    currentIndex: 0,

    currentQuestion: null,

    score: 0,

    isFinished: false

};

function resetQuizState() {

    quizState.questions = [];

    quizState.currentIndex = 0;

    quizState.currentQuestion = null;

    quizState.score = 0;

    quizState.isFinished = false;

}




/* =========================
   学年画面表示（安全版）
========================= */

function showGradeScreen() {
    console.log("showGradeScreen は現在未使用");
    console.log("🌸 学年画面表示");

    const gradeArea = document.getElementById("gradeArea");
    const quizArea = document.getElementById("quizArea");
    const resultArea = document.getElementById("resultArea");
    const homeScreen = document.getElementById("homeScreen");

    if (gradeArea) gradeArea.style.display = "block";
    if (quizArea) quizArea.style.display = "none";
    if (resultArea) resultArea.style.display = "none";
    if (homeScreen) homeScreen.style.display = "none";
}
/* =========================
   🌸 学年選択連動
   ========================= */

function setGrade(grade) {

    if (!currentUser) return;


    // =========================
    // 🌸 学年保存
    // =========================

    currentUser.grade = grade;

    saveUsers();


    console.log(
        "📘 学年設定:",
        grade
    );


    // =========================
    // 🌸 学年画面を閉じる
    // =========================

    const gradeArea =
        document.getElementById("gradeArea");

    if (gradeArea) {
        gradeArea.style.display = "none";
    }


    const resultArea =
        document.getElementById("resultArea");

    if (resultArea) {
        resultArea.style.display = "none";
    }


    // =========================
    // 🌸 学年別設定
    // =========================

    if (grade === "grade1") {

        currentUnit = "grade1";

    } else if (grade === "grade2") {

        currentUnit = "grade2";

    } else if (grade === "grade3") {

        currentUnit = "grade3";

    } else if (grade === "grade4") {

        currentUnit = "basic";

    } else if (grade === "grade5") {

        currentUnit = "medium";

    } else if (grade === "grade6") {

        currentUnit = "hard";

    } else if (grade === "grade7") {

        // 🌸 中学1年
        currentUnit = "juniorHigh1";

    }


    // =========================
    // 🌸 教科選択画面
    // =========================

    const subjectArea =
        document.getElementById("subjectArea");

    if (subjectArea) {

        subjectArea.style.display =
            "block";

    }


    // =========================
    // 🌸 中学1年は「算数」→「数学」
    // =========================

    const mathBtn =
        document.getElementById("mathBtn");

    if (mathBtn) {

        if (grade === "grade7") {

            mathBtn.innerHTML = `
                📐<br>
                <strong>数学</strong><br>
                <small>中学1年 数学</small>
            `;

        } else {

            mathBtn.innerHTML = `
                📐<br>
                <strong>算数</strong><br>
                <small>数字の世界へ！</small>
            `;

        }

    }


    // =========================
    // 🌸 国語表示
    // =========================

    const kokugoBtn =
        document.getElementById("kokugoBtn");

    if (kokugoBtn) {

        if (grade === "grade7") {

            kokugoBtn.innerHTML = `
                📖<br>
                <strong>国語</strong><br>
                <small>中学1年 国語</small>
            `;

            // 今回はまだ未実装
            kokugoBtn.classList.add("disabled");

        } else {

            // 🌸 バグ修正：全学年対応
            // 以前は「小学2年 国語」に固定表示されていた
            const kokugoGradeNum =
                getKokugoGradeNumber();

            kokugoBtn.innerHTML = `
                📖<br>
                <strong>国語</strong><br>
                <small>${
                    kokugoGradeNum
                        ? `小学${kokugoGradeNum}年 国語`
                        : "国語"
                }</small>
            `;

            kokugoBtn.classList.remove("disabled");

        }

    }


    // =========================
    // 🌸 社会表示
    // バグ修正：全学年対応
    // 小学3〜6年は学年別の社会ドリルへ直接、
    // それ以外（小学1・2年／中学1年）は
    // 従来どおり社会ホーム（新潟県たんけん等）へ
    // =========================

    const socialBtn =
        document.getElementById("socialBtn");

    if (socialBtn) {

        const socialGradeNum =
            (
                grade === "grade3" ||
                grade === "grade4" ||
                grade === "grade5" ||
                grade === "grade6"
            )
                ? Number(grade.replace("grade", ""))
                : null;

        if (socialGradeNum) {

            socialBtn.innerHTML = `
                🗾<br>
                <strong>社会</strong><br>
                <small>小学${socialGradeNum}年 社会</small>
            `;

        } else {

            socialBtn.innerHTML = `
                🗾<br>
                <strong>社会</strong><br>
                <small>🌾 新潟県たんけん など</small>
            `;

        }

    }


    // =========================
    // 🌸 理科表示
    // 小学3〜6年・中学1年はデータありのため有効化、
    // 小学1・2年はデータがまだないため無効のまま
    // =========================

    const scienceBtn =
        document.getElementById("scienceBtn");

    if (scienceBtn) {

        const rikaGradeLabel =
            getRikaGradeLabel();

        if (rikaGradeLabel) {

            scienceBtn.innerHTML = `
                🧪<br>
                <strong>理科</strong><br>
                <small>${rikaGradeLabel} 理科</small>
            `;

            scienceBtn.classList.remove("disabled");

        } else {

            scienceBtn.innerHTML = `
                🧪<br>
                <strong>理科</strong><br>
                <small>🌸 準備中</small>
            `;

            scienceBtn.classList.add("disabled");

        }

    }


    // =========================
    // 🌸 英語表示
    // 小学3〜6年・中学1年はデータありのため有効化、
    // 小学1・2年はデータがまだないため無効のまま
    // =========================

    const englishBtn =
        document.getElementById("englishBtn");

    if (englishBtn) {

        const englishGradeLabel =
            getEnglishGradeLabel();

        if (englishGradeLabel) {

            englishBtn.innerHTML = `
                🔤<br>
                <strong>英語</strong><br>
                <small>${englishGradeLabel} 英語</small>
            `;

            englishBtn.classList.remove("disabled");

        } else {

            englishBtn.innerHTML = `
                🔤<br>
                <strong>英語</strong><br>
                <small>🌸 準備中</small>
            `;

            englishBtn.classList.add("disabled");

        }

    }


    // =========================
    // 🌸 今日のひとこと
    // =========================

    showDailyMessage();

}

// ===================================
// 🌸 数学開始
// 小学生・中学1年 共通
// ===================================

function startSelectedMath() {

    console.log(
        "🌸 数学開始:",
        currentUser
    );

    console.log(
        "🌸 数学データ件数:",
        getMathDatabase().length
    );


    // 🌸 教科選択画面を閉じる

    const subjectArea =
        document.getElementById("subjectArea");

    if (subjectArea) {

        subjectArea.style.display = "none";

    }


    // 🌸 10問開始

    startQuiz(
        currentUnit,
        10
    );

}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語 ランダム問題取得
/////////////////////////////////////////////////////

function getRandomKokugoQuestions(count = 10) {

    const kokugoDatabase = getKokugoDatabase();

    if (!kokugoDatabase ||
        kokugoDatabase.length === 0) {

        return [];

    }

    const shuffled =
        [...kokugoDatabase];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled.slice(0, count);
}

// =========================
// 🌸 Engine12
// 社会ホーム
// バグ修正：全学年対応
// 小学3〜6年を選んでいる時は、選択中の学年の
// 社会ドリルへ直接進む（算数・国語と同じ流れに）。
// それ以外の学年では、従来どおり社会ホーム
// （新潟県たんけん・都道府県チャレンジ等）を表示する。
// =========================

function startSelectedSocial() {

    console.log(
        "🌸 社会開始:",
        currentUser && currentUser.grade
    );

    const gradeSocialStarters = {
        grade3: startGrade3Social,
        grade4: startGrade4Social,
        grade5: startGrade5Social,
        grade6: startGrade6Social
    };

    const starter =
        currentUser &&
        gradeSocialStarters[currentUser.grade];

    if (starter) {

        starter();
        return;

    }

    // 🌸 学年別データが無い場合は社会ホームへ
    document.getElementById("subjectArea").style.display = "none";
    document.getElementById("socialHome").style.display = "block";

}

document.getElementById("socialBtn").onclick =
    startSelectedSocial;

// =========================
// 🌸 日本全国チャレンジ開始
// =========================

document.getElementById("nationBtn").onclick = function(){

    clearScreens();

    startJapanChallenge();

};


/////////////////////////////////////////////////////
// 🌸 Part4 学習コア（問題・スコア・ログ）
/////////////////////////////////////////////////////

/* =========================
   学習開始（単元選択後）
========================= */

function startQuiz(unit, count = 10) {

    // 🌸 復習モード初期化
    reviewMode = false;
    reviewList = [];
    reviewIndex = 0;

    // 🌸 国語・理科・英語モードを終了（他教科から移動してきた場合の保険）
    kokugoMode = false;
    rikaMode = false;
    englishMode = false;

    resetQuizState();

    currentUnit = unit;
    questionCount = 0;
    score = 0;

    console.log("🌸 クイズ開始:", unit);

    // 🌸 中1数学データを取得
    const allQuestions = getMathDatabase();

    console.log(
        "🌸 数学データ件数:",
        allQuestions.length
    );

    // 🌸 10問ランダム出題
    quizState.questions =
        shuffleArray([
            ...allQuestions
        ]).slice(0, count);

    // 🌸 実際の出題数を設定
    maxQuestions =
        quizState.questions.length;

    console.log(
        "🌸 ランダム出題数:",
        maxQuestions
    );

    console.log(
        "🌸 今回の出題:",
        quizState.questions
    );

    // 🌸 第1問を表示
    showQuestion();

}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語
// 🌸 国語コース選択画面を表示
/////////////////////////////////////////////////////

function startGrade2Kokugo() {

    console.log(
        "🌸 国語コース選択:",
        currentUser && currentUser.grade
    );

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    // =========================================
    // 🌸 国語コース選択画面を表示
    // =========================================

    const kokugoCourse =
        document.getElementById(
            "kokugoCourseArea"
        );

    if (kokugoCourse) {

        kokugoCourse.style.display =
            "block";

    }

    // =========================================
    // 🌸 バグ修正：全学年対応
    // 「漢字の書き」「ミックス」は今のところ
    // 書き順データがある小学2年でのみ表示する。
    // タイトルも選択中の学年に合わせて表示する。
    // =========================================

    const gradeNum =
        getKokugoGradeNumber();

    const courseTitle =
        document.getElementById(
            "kokugoCourseTitle"
        );

    if (courseTitle) {

        courseTitle.textContent =
            gradeNum
                ? `📖 国語（小学${gradeNum}年）`
                : "📖 国語";

    }

    const isGrade2 =
        currentUser &&
        currentUser.grade === "grade2";

    const writingBtn =
        document.getElementById(
            "kokugoWritingCourseBtn"
        );

    if (writingBtn) {

        writingBtn.style.display =
            isGrade2 ? "inline-block" : "none";

    }

    const mixedBtn =
        document.getElementById(
            "kokugoMixedCourseBtn"
        );

    if (mixedBtn) {

        mixedBtn.style.display =
            isGrade2 ? "inline-block" : "none";

    }

    // =========================================
    // 🌸 問題画面・結果画面は非表示
    // =========================================

    const quiz =
        document.getElementById(
            "quizArea"
        );

    if (quiz) {

        quiz.style.display =
            "none";

    }

    const result =
        document.getElementById(
            "resultArea"
        );

    if (result) {

        result.style.display =
            "none";

    }

}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語
// 🌸 漢字の読みコース開始
/////////////////////////////////////////////////////

function startKokugoReading() {

    console.log(
        "🌸 国語：漢字の読みコース開始"
    );

    // =========================================
    // 🌸 バグ修正：全学年対応
    // 学年ごとの国語データから「漢字の読み」だけ取得
    // （以前は小学2年のデータに固定されていた）
    // =========================================

    const kanjiReadingQuestions =
        getKokugoDatabase().filter(
            question =>
                question.type === "kanjiReading"
        );

    console.log(
        "🌸 漢字の読み問題数:",
        kanjiReadingQuestions.length
    );

    // =========================================
    // 🌸 データ確認
    // =========================================

    if (
        kanjiReadingQuestions.length === 0
    ) {

        console.log(
            "🌸 漢字の読み問題がありません"
        );

        return;
    }

    // =========================================
// 🌸 読み問題をシャッフル
// 🌸 50問からランダム10問を出題
// =========================================

currentKokugoQuiz =
    shuffleArray(
        [...kanjiReadingQuestions]
    ).slice(0, 10);

console.log(
    "🌸 漢字の読み10問シャッフル完了:",
    currentKokugoQuiz
);

    console.log(
        "🌸 漢字の読み問題シャッフル完了:",
        currentKokugoQuiz
    );

    // =========================================
    // 🌸 国語状態リセット
    // =========================================

    kokugoIndex = 0;

    kokugoScore = 0;

    currentKokugoQuestion =
        null;

    kokugoAnswered =
        false;

    kokugoBoardAnswer =
        "";

    // =========================================
    // 🌸 国語モード開始
    // =========================================

    kokugoMode =
        true;

    // 🌸 理科・英語モードを終了（他教科から移動してきた場合の保険）
    rikaMode = false;
    englishMode = false;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    document.getElementById(
        "quizArea"
    ).style.display =
        "block";

    document.getElementById(
        "resultArea"
    ).style.display =
        "none";

    // =========================================
    // 🌸 算数テンキー非表示
    // =========================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );

    if (keypad) {

        keypad.style.display =
            "none";
    }

    hideHissanScratchPad();

    // =========================================
    // 🌸 スコア初期化
    // =========================================

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showKokugoQuestion();
}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語
// 🌸 漢字の書きコース開始
/////////////////////////////////////////////////////

function startKokugoWriting() {

    console.log(
        "🌸 国語：漢字の書きコース開始"
    );

    // =========================================
    // 🌸 バグ修正：正確な書き順データが今のところ
    // 小学2年の漢字にしかないため、他学年では
    // このコースを開始しない（ボタン自体も非表示にする）
    // =========================================

    if (!currentUser || currentUser.grade !== "grade2") {

        console.log(
            "🌸 漢字の書きコースは現在、小学2年のみ対応しています"
        );

        return;
    }

    // =========================================
    // 🌸 小学2年・漢字の書きだけ取得
    // =========================================

    const kanjiWritingQuestions =
        grade2KokugoQuestions.filter(
            question =>
                question.type === "kanjiWriting" &&
                question.unit === "漢字の書き（2年生）"
        );

    console.log(
        "🌸 小学2年・漢字の書き問題数:",
        kanjiWritingQuestions.length
    );

    // =========================================
    // 🌸 データ確認
    // =========================================

    if (
        kanjiWritingQuestions.length === 0
    ) {

        console.log(
            "🌸 漢字の書き問題がありません"
        );

        return;
    }

    // =========================================
// 🌸 漢字の書き問題をシャッフル
// 🌸 35問からランダム10問を出題
// =========================================

currentKokugoQuiz =
    shuffleArray(
        [...kanjiWritingQuestions]
    ).slice(0, 10);

console.log(
    "🌸 漢字の書き10問シャッフル完了:",
    currentKokugoQuiz
);

    // =========================================
    // 🌸 国語状態リセット
    // =========================================

    kokugoIndex = 0;

    kokugoScore = 0;

    currentKokugoQuestion =
        null;

    kokugoAnswered =
        false;

    kokugoBoardAnswer =
        "";

    // =========================================
    // 🌸 国語モード開始
    // =========================================

    kokugoMode =
        true;

    // 🌸 理科・英語モードを終了（他教科から移動してきた場合の保険）
    rikaMode = false;
    englishMode = false;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    const quiz =
        document.getElementById(
            "quizArea"
        );

    if (quiz) {

        quiz.style.display =
            "block";
    }

    const result =
        document.getElementById(
            "resultArea"
        );

    if (result) {

        result.style.display =
            "none";
    }

    // =========================================
    // 🌸 算数テンキー非表示
    // =========================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );

    if (keypad) {

        keypad.style.display =
            "none";
    }

    hideHissanScratchPad();

    // =========================================
    // 🌸 フィードバック初期化
    // =========================================

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showKokugoQuestion();
}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語
// 🌸 漢字の読み・書きミックスコース開始
/////////////////////////////////////////////////////

function startKokugoMixed() {

    console.log(
        "🌸 国語：読み・書きミックスコース開始"
    );

    // =========================================
    // 🌸 バグ修正：漢字の書きデータが小学2年にしかないため
    // ミックスコースも小学2年のみ対応（ボタン自体も非表示）
    // =========================================

    if (!currentUser || currentUser.grade !== "grade2") {

        console.log(
            "🌸 読み・書きミックスコースは現在、小学2年のみ対応しています"
        );

        return;
    }

    // =========================================
    // 🌸 漢字の読み50問を取得
    // =========================================

    const kanjiReadingQuestions =
        grade2KokugoQuestions.filter(
            question =>
                question.type === "kanjiReading" &&
                question.unit === "漢字の読み（2年生）"
        );

    // =========================================
    // 🌸 漢字の書き35問を取得
    // =========================================

    const kanjiWritingQuestions =
        grade2KokugoQuestions.filter(
            question =>
                question.type === "kanjiWriting" &&
                question.unit === "漢字の書き（2年生）"
        );

    console.log(
        "🌸 ミックス・読み問題数:",
        kanjiReadingQuestions.length
    );

    console.log(
        "🌸 ミックス・書き問題数:",
        kanjiWritingQuestions.length
    );

    // =========================================
    // 🌸 読み＋書き 合計
    // =========================================

    const mixedQuestions = [
        ...kanjiReadingQuestions,
        ...kanjiWritingQuestions
    ];

    console.log(
        "🌸 ミックス問題総数:",
        mixedQuestions.length
    );

    // =========================================
    // 🌸 データ確認
    // =========================================

    if (
        mixedQuestions.length === 0
    ) {

        console.log(
            "🌸 ミックス問題がありません"
        );

        return;
    }

    // =========================================
    // 🌸 85問をシャッフルして10問
    // =========================================

    currentKokugoQuiz =
        shuffleArray(
            [...mixedQuestions]
        ).slice(0, 10);

    console.log(
        "🌸 読み・書きミックス10問シャッフル完了:",
        currentKokugoQuiz
    );

    // =========================================
    // 🌸 国語状態リセット
    // =========================================

    kokugoIndex = 0;

    kokugoScore = 0;

    currentKokugoQuestion =
        null;

    kokugoAnswered =
        false;

    kokugoBoardAnswer =
        "";

    // =========================================
    // 🌸 国語モード開始
    // =========================================

    kokugoMode =
        true;

    // 🌸 理科・英語モードを終了（他教科から移動してきた場合の保険）
    rikaMode = false;
    englishMode = false;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    const quiz =
        document.getElementById(
            "quizArea"
        );

    if (quiz) {

        quiz.style.display =
            "block";
    }

    const result =
        document.getElementById(
            "resultArea"
        );

    if (result) {

        result.style.display =
            "none";
    }

    // =========================================
    // 🌸 算数テンキー非表示
    // =========================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );

    if (keypad) {

        keypad.style.display =
            "none";
    }

    hideHissanScratchPad();

    // =========================================
    // 🌸 フィードバック初期化
    // =========================================

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showKokugoQuestion();
}

/////////////////////////////////////////////////////
// 🌸 小学2年 国語 問題表示
/////////////////////////////////////////////////////

function showKokugoQuestion() {

    // 🌸 新しい問題なので回答状態をリセット
    kokugoAnswered = false;

    if (
        kokugoIndex >=
        currentKokugoQuiz.length
    ) {

        console.log(
            "🌸 国語10問終了"
        );

        return;
    }

    // 🌸 現在の問題
    currentKokugoQuestion =
        currentKokugoQuiz[kokugoIndex];

    console.log(
        "🌸 国語問題表示:",
        currentKokugoQuestion
    );

    // 🌸 問題文（問題番号は水色で本文とはっきり離す）
    questionText.innerHTML =
        `<div class="questionCounter">第${kokugoIndex + 1}問 / ${currentKokugoQuiz.length}</div>` +
        `<div class="questionBody">${currentKokugoQuestion.q}</div>`;

    // =================================================
    // 🌸 共通初期化
    // =================================================

    answerInput.value = "";

    answerInput.disabled = false;

    // 🌸 英語モードのヒント（IME案内）が残らないようにリセット
    answerInput.removeAttribute("lang");
    answerInput.setAttribute("inputmode", "text");
    answerInput.placeholder = "";

    feedback.textContent = "";

    nextBtn.style.display =
        "none";

    // 🌸 通常入力欄は初期状態で非表示
    answerInput.style.display =
        "none";

    // =================================================
    // 🌸 読みボードを非表示
    // =================================================

    const readingBoard =
        document.getElementById(
            "kokugoReadingBoard"
        );

    if (readingBoard) {

        readingBoard.style.display =
            "none";
    }

    // =================================================
    // 🌸 書きボードを非表示
    // =================================================

    const writingBoard =
        document.getElementById(
            "kokugoWritingBoard"
        );

    if (writingBoard) {

        writingBoard.style.display =
            "none";
    }

    // =================================================
    // 🌸 問題タイプによる切り替え
    // =================================================

    if (
        currentKokugoQuestion.type ===
        "kanjiReading"
    ) {

        // ---------------------------------------------
        // 🌸 漢字の読み
        // ---------------------------------------------

        console.log(
            "🌸 国語：読みボード表示"
        );

        answerInput.style.display =
            "none";

        createKokugoReadingBoard(
            String(
                currentKokugoQuestion.a
            )
        );

    } else if (
        currentKokugoQuestion.type ===
        "kanjiWriting"
    ) {

        // ---------------------------------------------
        // 🌸 漢字の書き
        // ---------------------------------------------

        console.log(
            "🌸 国語：漢字書きボード表示"
        );

        answerInput.style.display =
            "none";

        createKokugoWritingBoard(
            String(
                currentKokugoQuestion.a
            )
        );

    } else {

        // ---------------------------------------------
        // 🌸 その他の国語問題
        // ---------------------------------------------

        console.log(
            "🌸 国語：通常入力"
        );

        answerInput.style.display =
            "block";

        answerInput.disabled =
            false;

        answerInput.readOnly =
            false;
    }

    // =================================================
    // 🌸 Engine20
    // 国語・学習時間開始
    // =================================================

    startStudyTimer();
}

/////////////////////////////////////////////////////
// 🌸 国語・読みボード
/////////////////////////////////////////////////////

function createKokugoReadingBoard(correctAnswer) {

    const board =
        document.getElementById("kokugoReadingBoard");

    const answerArea =
        document.getElementById("kokugoReadingAnswer");

    const choices =
        document.getElementById("kokugoReadingChoices");

    if (!board || !answerArea || !choices) return;


    // =========================================
    // 🌸 「こたえる」ボタン
    // 通常問題・復習問題の両方に対応
    // =========================================

    const kokugoSubmitBtn =
        document.querySelector(
            '#kokugoReadingBoard button[onclick="submitKokugoAnswer()"],' +
            '#kokugoReadingBoard button[onclick="submitReviewKokugoAnswer()"]'
        );


    // =========================================
    // 🌸 新しい問題では「こたえる」を無効化
    // =========================================

    if (kokugoSubmitBtn) {

        kokugoSubmitBtn.disabled = true;

    }


    // =========================================
    // 🌸 回答をリセット
    // =========================================

    kokugoBoardAnswer = "";

    answerArea.textContent = "";

    choices.innerHTML = "";


    // =========================================
    // 🌸 正解文字を1文字ずつ取得
    // =========================================

    const answerChars =
        [...correctAnswer];


    // =========================================
    // 🌸 ひらがな・カタカナのランダム文字
    // =========================================

    const hiragana =
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

    const katakana =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";


    const isKatakana =
        /^[ァ-ヶー]+$/.test(correctAnswer);

    const charPool =
        isKatakana
            ? katakana
            : hiragana;


    // =========================================
    // 🌸 正解文字＋ランダム文字
    // =========================================

    const boardChars =
        [...answerChars];


    while (boardChars.length < 20) {

        const randomIndex =
            Math.floor(
                Math.random() * charPool.length
            );

        boardChars.push(
            charPool[randomIndex]
        );

    }


    // =========================================
    // 🌸 ボードをシャッフル
    // =========================================

    for (
        let i = boardChars.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            boardChars[i],
            boardChars[j]
        ] = [
            boardChars[j],
            boardChars[i]
        ];

    }


    // =========================================
    // 🌸 文字ボタン作成
    // =========================================

    boardChars.forEach(char => {

        const btn =
            document.createElement("button");

        btn.type = "button";

        btn.className =
            "kokugoReadingChar";

        btn.textContent =
            char;


        // =====================================
        // 🌸 文字クリック
        // =====================================

        btn.onclick = function () {

            kokugoBoardAnswer += char;

            answerArea.textContent =
                kokugoBoardAnswer;


            // =================================
            // 🌸 1文字以上選んだら
            // 「こたえる」を有効化
            // =================================

            if (
                kokugoSubmitBtn &&
                kokugoBoardAnswer.length > 0
            ) {

                kokugoSubmitBtn.disabled =
                    false;

            }

        };


        choices.appendChild(btn);

    });


    // =========================================
    // 🌸 読みボード表示
    // =========================================

    board.style.display =
        "block";

}

/////////////////////////////////////////////////////
// 🌸 国語・読みボードの答えを消す
/////////////////////////////////////////////////////

function clearKokugoReadingAnswer() {

    kokugoBoardAnswer = "";

    const answerArea =
        document.getElementById(
            "kokugoReadingAnswer"
        );

    if (answerArea) {

        answerArea.textContent = "";

    }

    // 🌸 「こたえる」を再び無効化
    const kokugoSubmitBtn =
        document.querySelector(
            '#kokugoReadingBoard button[onclick="submitKokugoAnswer()"]'
        );

    if (kokugoSubmitBtn) {

        kokugoSubmitBtn.disabled = true;

    }

}


/////////////////////////////////////////////////////
// 🌸 小学2年 国語 回答判定
/////////////////////////////////////////////////////

function submitKokugoAnswer() {

    // 🌸 すでに回答済みなら何もしない
    if (kokugoAnswered) {
        return;
    }

    // 🌸 この問題は回答済み
    kokugoAnswered = true;

    // =========================================
    // 🌸 バグ修正：復習モード（漢字の読み）
    // 復習モードでは currentKokugoQuestion ではなく
    // reviewList[reviewIndex] を使って採点し、
    // 次の問題ボタンも reviewNextQuestion() に
    // つなぎ直す必要がある
    // =========================================
    if (reviewMode) {

        const currentQuestion = reviewList[reviewIndex];

        if (!currentQuestion) {
            return;
        }

        const raw = kokugoBoardAnswer.trim();

        if (raw === "") {
            feedback.textContent = "⚠ 答えを入力してください。";
            return;
        }

        const correctAnswer = String(currentQuestion.correct).trim();
        const ok = raw === correctAnswer;

        if (ok) {

            reviewScore++;

            feedback.innerHTML = `
                <h3>⭕ 正解！</h3>
                <p>📖 <strong>解説</strong></p>
                <p>${currentQuestion.memo || ""}</p>
            `;

            playSound("correct");
            addPoint(10);
            showSakura();

            wrongList = wrongList.filter(
                item => item.question !== currentQuestion.question
            );

        } else {

            feedback.innerHTML = `
                <h3>❌ 不正解</h3>
                <p>正解は <strong>${correctAnswer}</strong> です。</p>
                <p>📖 <strong>解説</strong></p>
                <p>${currentQuestion.memo || ""}</p>
            `;

            playSound("wrong");
        }

        const kokugoSubmitBtnReview = document.querySelector(
            '#kokugoReadingBoard button[onclick="submitKokugoAnswer()"]'
        );

        if (kokugoSubmitBtnReview) {
            kokugoSubmitBtnReview.disabled = true;
        }

        const kokugoReadingControlsElReview =
            document.getElementById("kokugoReadingControls");

        if (kokugoReadingControlsElReview) {
            kokugoReadingControlsElReview.appendChild(nextBtn);
        }

        nextBtn.style.display = "inline-block";

        nextBtn.onclick = function () {
            reviewNextQuestion();
        };

        return;
    }

    const raw =

    currentKokugoQuestion.type === "kanjiReading"
        ? kokugoBoardAnswer.trim()
        : answerInput.value.trim();

    if (raw === "") {

        feedback.textContent =
            "⚠ 答えを入力してください。";

        return;
    }

    const userAnswer =
        raw;

    const correctAnswer =
        String(
            currentKokugoQuestion.a
        ).trim();
// 🌸 Engine20 Phase6-2
// 国語読み：柔軟判定対応

const correctAnswers =
    currentKokugoQuestion.answers ||
    [correctAnswer];

        // 🌸 Engine20
// 国語・単元別記録
const kokugoUnit =
    currentKokugoQuestion.unit;

// 🌸 以前の学習記録に units がない場合
if (!studyRecord.kokugo.units) {
    studyRecord.kokugo.units = {};
}

if (kokugoUnit) {

    if (!studyRecord.kokugo.units[kokugoUnit]) {

        studyRecord.kokugo.units[kokugoUnit] = {
            answered: 0,
            correct: 0
        };

    }

    studyRecord.kokugo.units[kokugoUnit].answered++;

}
    // 🌸 Engine20
    // 国語回答数
        studyRecord.kokugo.answered++;
        // 🌸 完全一致、または揺らぎ判定（記述式のみ／読みボードは対象外）
        if (
    correctAnswers.includes(userAnswer) ||
    (
        currentKokugoQuestion.type !== "kanjiReading" &&
        correctAnswers.some(a => isFuzzyTextMatch(userAnswer, a))
    )
) {

    kokugoScore++;

    // 🌸 Engine20
    // 国語正解数
    studyRecord.kokugo.correct++;

    // 🌸 国語・単元別正解数
    if (kokugoUnit && studyRecord.kokugo.units[kokugoUnit]) {
        studyRecord.kokugo.units[kokugoUnit].correct++;
    }

    feedback.innerHTML = `
            <h3>⭕ 正解！</h3>

            <p>
                📖 <strong>解説</strong>
            </p>

            <p>
                ${currentKokugoQuestion.memo || ""}
            </p>
        `;

        playSound("correct");

        addPoint(10);

        showSakura();

        } else {

        feedback.innerHTML = `
            <h3>❌ 不正解</h3>

            <p>
                正解は
                <strong>${correctAnswer}</strong>
                です。
            </p>

            <p>
                📖 <strong>解説</strong>
            </p>

            <p>
                ${currentKokugoQuestion.memo || ""}
            </p>
        `;

        playSound("wrong");


        // =========================
        // 🌸 国語・復習データ保存
        // =========================

        const record = {

            question:
                currentKokugoQuestion.q,

            correct:
                currentKokugoQuestion.a,

            userAnswer:
                userAnswer,

            isCorrect:
                false,

            unit:
                currentKokugoQuestion.unit,

            type:
                currentKokugoQuestion.type,

            inputType:
                currentKokugoQuestion.inputType,

            memo:
                currentKokugoQuestion.memo

        };


        console.log(
            "🌸 国語 wrongList record =",
            record
        );


        wrongList.push(record);


        console.log(
            "🌸 国語 wrongList =",
            wrongList
        );

    }

    // 🌸 Engine20
// 国語1問分の学習時間を確定
finishStudyQuestion("kokugo");

// 🌸 Engine20
// 今日の学習記録を自動保存
saveTodayStudyRecord();
// 🌸 国語「こたえる」ボタンを無効化
const kokugoSubmitBtn =
    document.querySelector(
        '#kokugoReadingBoard button[onclick="submitKokugoAnswer()"]'
    );

if (kokugoSubmitBtn) {
    kokugoSubmitBtn.disabled = true;
}
    answerInput.disabled = true;

    // 🌸 「次の問題」ボタンを「けす／こたえる」の右に並べる
    const kokugoReadingControlsEl =
        document.getElementById("kokugoReadingControls");

    if (kokugoReadingControlsEl) {
        kokugoReadingControlsEl.appendChild(nextBtn);
    }

    nextBtn.style.display = "inline-block";

        nextBtn.onclick = function () {

        kokugoIndex++;

        if (
            kokugoIndex >=
            currentKokugoQuiz.length
        ) {

            // =========================
            // 🌸 国語10問終了
            // =========================

            showKokugoResult();

            return;
        }

        answerInput.disabled = false;

        showKokugoQuestion();

    };

}

// =================================================
// 🌸 小学2年 国語 結果画面
// =================================================

function showKokugoResult() {

    console.log(
        "🌸 国語結果:",
        kokugoScore
    );

    console.log(
        "🌸 国語 wrongList:",
        wrongList
    );


    // =========================
    // 🌸 国語クイズ画面を非表示
    // バグ修正：存在しない id "kokugoQuizArea" を
    // 参照していたため、実際に問題を表示している
    // 共通の #quizArea が非表示にならず、
    // 結果画面に前の問題が重なって表示されていた
    // =========================

    const kokugoArea =
        document.getElementById(
            "quizArea"
        );

    if (kokugoArea) {

        kokugoArea.style.display =
            "none";

    }


    // =========================
    // 🌸 通常の結果画面を表示
    // =========================

    const resultArea =
        document.getElementById(
            "resultArea"
        );

    if (!resultArea) {

        console.error(
            "❌ resultArea が見つかりません"
        );

        return;

    }


    resultArea.innerHTML = "";


    resultArea.style.display =
        "block";


    // =========================
    // 🌸 結果表示
    // =========================

    resultArea.innerHTML = `

        <h2>
            🌸 国語10問終了！
        </h2>

        <p>
            <strong>
                スコア：${kokugoScore}点
            </strong>
        </p>

    `;


    // =========================
    // 🌸 間違えた問題
    // =========================

    const kokugoWrongList =
        wrongList.filter(
            item =>
                item.type === "kanjiReading" ||
                item.type === "kanjiWriting"
        );


    if (
        kokugoWrongList.length > 0
    ) {

        resultArea.innerHTML += `
            <h3>
                📉 間違えた問題
            </h3>
        `;


        kokugoWrongList.forEach(
            item => {

                resultArea.innerHTML += `

                    <div class="resultCard">

                        <p>
                            <strong>
                                問題：
                            </strong>
                            ${item.question}
                        </p>

                        <p>
                            ✍ あなたの答え：
                            ${item.userAnswer}
                        </p>

                        <p>
                            ✅ 正解：
                            ${item.correct}
                        </p>

                    </div>

                    <hr>

                `;

            }
        );

    } else {

        resultArea.innerHTML += `

            <p>
                🎉 全問正解です！
            </p>

        `;

    }


    // =========================
    // 🌸 ボタン
    // =========================

    resultArea.innerHTML += `

        <button onclick="startReview()">
            📚 復習する
        </button>

        <button onclick="backToGrade()">
            🎓 学年選択へ戻る
        </button>

        <button onclick="backToHome()">
            🏠 ホームへ戻る
        </button>

    `;


    console.log(
        "🌸 国語結果画面表示完了"
    );

}

/////////////////////////////////////////////////////
// 🌸 国語・漢字書き
// SVG書き順お手本表示
/////////////////////////////////////////////////////

function showKokugoWritingSVG(kanji) {

    // 🌸 漢字書きボード
    const board =
        document.getElementById(
            "kokugoWritingBoard"
        );

    // 🌸 お手本表示場所
    const target =
        document.getElementById(
            "kokugoWritingTarget"
        );

    if (!board || !target) {

        console.log(
            "🌸 漢字書きボード要素なし"
        );

        return;
    }

    const data =
        kokugoKanjiWritingData[kanji];

    if (!data) {

        console.log(
            "🌸 漢字書きデータなし:",
            kanji
        );

        return;
    }

    // 🌸 漢字書きボードを表示
    board.style.display = "block";

    // 🌸 お手本エリアをクリア
    target.innerHTML = "";

    // 🌸 SVG作成
    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    svg.setAttribute(
        "width",
        "220"
    );

    svg.setAttribute(
        "height",
        "220"
    );

    svg.setAttribute(
        "class",
        "kokugoWritingSVG"
    );

    // 🌸 書き順用の画を保存
    const paths = [];

    // 🌸 データの順番＝正しい書き順
    data.strokes.forEach(
        (stroke, index) => {

            const path =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );

            path.setAttribute(
                "d",
                stroke.d
            );

            path.setAttribute(
                "fill",
                "none"
            );

            path.setAttribute(
    "stroke",
    strokeIndex === 0
        ? "#1976d2"
        : "#ef9a9a"
);

            path.setAttribute(
                "stroke-width",
                "4"
            );

            path.setAttribute(
                "stroke-linecap",
                "round"
            );

            path.setAttribute(
                "stroke-linejoin",
                "round"
            );

            path.dataset.strokeIndex =
                index;

            // 🌸 最初は非表示
            path.style.opacity = "0";

            svg.appendChild(path);

            // 🌸 線の長さを取得
            const length =
                path.getTotalLength();

            path.style.strokeDasharray =
                length;

            path.style.strokeDashoffset =
                length;

            paths.push({
                path: path,
                length: length
            });

        }
    );

    // 🌸 SVGを表示
    target.appendChild(svg);

    console.log(
        "🌸 漢字SVG書き順表示:",
        kanji,
        data.strokeCount,
        "画"
    );

    // 🌸 1画ずつ表示
    let strokeIndex = 0;

    function drawNextStroke() {

        if (
            strokeIndex >=
            paths.length
        ) {

            console.log(
                "🌸 漢字書き順表示完了:",
                kanji
            );

            return;
        }

        const item =
            paths[strokeIndex];

        const path =
            item.path;

        // 🌸 現在の画を表示
        path.style.opacity = "1";

        // 🌸 書き始めから書き終わりまで描画
        path.style.transition =
            "stroke-dashoffset 700ms ease";

        path.style.strokeDashoffset =
            "0";

        console.log(
            "🌸 漢字書き順:",
            strokeIndex + 1,
            "画目"
        );

        strokeIndex++;

        // 🌸 次の画へ
        setTimeout(
            drawNextStroke,
            850
        );
    }

    // 🌸 書き順開始
    setTimeout(
        drawNextStroke,
        300
    );
}

/////////////////////////////////////////////////////
// 🌸 国語・漢字書きボード
// 🌸 赤いお手本の上に黒い回答を1画ずつ重ねる
// 🌸 黒い画は筆書きのように0.7秒で表示
/////////////////////////////////////////////////////

function createKokugoWritingBoard(kanji) {

    const board =
        document.getElementById(
            "kokugoWritingBoard"
        );

    const parts =
        document.getElementById(
            "kokugoWritingParts"
        );

    const answerBoard =
        document.getElementById(
            "kokugoWritingAnswerBoard"
        );

    const target =
        document.getElementById(
            "kokugoWritingTarget"
        );

    if (
        !board ||
        !parts ||
        !answerBoard ||
        !target
    ) {

        console.log(
            "🌸 漢字書きボードHTMLが見つかりません"
        );

        return;
    }

    // =================================================
    // 🌸 漢字データ取得
    // =================================================

    const data =
        kokugoKanjiWritingData[kanji];

    if (!data) {

        console.log(
            "🌸 漢字書きデータなし:",
            kanji
        );

        return;
    }

    console.log(
        "🌸 漢字書きボード作成:",
        kanji,
        data.strokeCount,
        "画"
    );

    // =================================================
    // 🌸 初期化
    // =================================================

    parts.innerHTML = "";

    answerBoard.innerHTML = "";

    target.innerHTML = "";

    kokugoWritingAnswer = [];

    // =================================================
    // 🌸 ボード表示
    // =================================================

    board.style.display = "block";

    // =================================================
    // 🌸 お手本エリア
    // =================================================

    target.style.position = "relative";

    target.style.width = "220px";

    target.style.height = "220px";

    target.style.margin = "0 auto";

    // =================================================
    // 🌸 赤いお手本SVG
    // =================================================

    const sampleSVG =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    sampleSVG.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    sampleSVG.setAttribute(
        "width",
        "220"
    );

    sampleSVG.setAttribute(
        "height",
        "220"
    );

    sampleSVG.setAttribute(
        "class",
        "kokugoWritingSampleSVG"
    );

    sampleSVG.style.position =
        "absolute";

    sampleSVG.style.left =
        "0";

    sampleSVG.style.top =
        "0";

    sampleSVG.style.zIndex =
        "1";

    sampleSVG.style.pointerEvents =
        "none";

    // =================================================
    // 🌸 赤いお手本を全画表示
    // =================================================

    data.strokes.forEach(
        stroke => {

            const samplePath =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );

            samplePath.setAttribute(
                "d",
                stroke.d
            );

            samplePath.setAttribute(
                "fill",
                "none"
            );

            samplePath.setAttribute(
                "stroke",
                "#e53935"
            );

            samplePath.setAttribute(
                "stroke-width",
                "4"
            );

            samplePath.setAttribute(
                "stroke-linecap",
                "round"
            );

            samplePath.setAttribute(
                "stroke-linejoin",
                "round"
            );

            sampleSVG.appendChild(
                samplePath
            );
        }
    );

    target.appendChild(
        sampleSVG
    );

    console.log(
        "🌸 赤いお手本表示:",
        kanji
    );

    // =================================================
    // 🌸 黒い回答用SVG
    // =================================================

    const answerSVG =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    answerSVG.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    answerSVG.setAttribute(
        "width",
        "220"
    );

    answerSVG.setAttribute(
        "height",
        "220"
    );

    answerSVG.setAttribute(
        "class",
        "kokugoWritingAnswerSVG"
    );

    answerSVG.style.position =
        "absolute";

    answerSVG.style.left =
        "0";

    answerSVG.style.top =
        "0";

    answerSVG.style.zIndex =
        "10";

    answerSVG.style.pointerEvents =
        "none";

    target.appendChild(
        answerSVG
    );

    // =================================================
    // 🌸 画番号をシャッフル
    // =================================================

    const strokeIndexes =
        data.strokes.map(
            (_, index) => index
        );

    for (
        let i =
            strokeIndexes.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            strokeIndexes[i],
            strokeIndexes[j]
        ] = [
            strokeIndexes[j],
            strokeIndexes[i]
        ];
    }

    // =================================================
    // 🌸 バラバラの画を作る
    // =================================================

    strokeIndexes.forEach(
        strokeIndex => {

            const stroke =
                data.strokes[
                    strokeIndex
                ];

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "kokugoWritingPart";

            button.dataset.strokeIndex =
                strokeIndex;

            // =================================================
            // 🌸 選択ボタン用SVG
            // =================================================

            const svg =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                );

            svg.setAttribute(
                "viewBox",
                "0 0 100 100"
            );

            svg.setAttribute(
                "width",
                "110"
            );

            svg.setAttribute(
                "height",
                "110"
            );

            svg.setAttribute(
                "preserveAspectRatio",
                "xMidYMid meet"
            );

            const path =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );

            path.setAttribute(
                "d",
                stroke.d
            );

            path.setAttribute(
                "fill",
                "none"
            );

            path.setAttribute(
                "stroke",
                "#333"
            );

            path.setAttribute(
                "stroke-width",
                "5"
            );

            path.setAttribute(
                "stroke-linecap",
                "round"
            );

            path.setAttribute(
                "stroke-linejoin",
                "round"
            );

            svg.appendChild(
                path
            );

            button.appendChild(
                svg
            );

            // =================================================
            // 🌸 画番号は表示しない
            // =================================================

            // 数字を表示しないことで
            // 答えを番号から推測できないようにする

            // =================================================
            // 🌸 画を選択
            // =================================================

            button.onclick =
                function () {

                    const nextIndex =
                        kokugoWritingAnswer.length;

                    // =================================================
                    // 🌸 書き順チェック
                    // =================================================

                    if (
                        strokeIndex !==
                        nextIndex
                    ) {

                        console.log(
                            "🌸 書き順違い"
                        );

                        button.classList.add(
                            "kokugoWritingWrong"
                        );

                        setTimeout(
                            () => {

                                button.classList.remove(
                                    "kokugoWritingWrong"
                                );

                            },
                            500
                        );

                        return;
                    }

                    // =================================================
                    // 🌸 正しい画
                    // =================================================

                    kokugoWritingAnswer.push(
                        strokeIndex
                    );

// =================================================
// 🌸 使用した画を黒にする
// =================================================

path.setAttribute(
    "stroke",
    "#111"
);

// =================================================
// 🌸 次に書く画を青にする
// =================================================

const nextStrokeIndex =
    kokugoWritingAnswer.length;

const nextButton =
    document.querySelector(
        `.kokugoWritingPart[data-stroke-index="${nextStrokeIndex}"]`
    );

if (nextButton) {

    const nextPath =
        nextButton.querySelector("path");

    if (nextPath) {

        nextPath.setAttribute(
            "stroke",
            "#1976d2"
        );
    }
}

                    // =================================================
                    // 🌸 黒い回答画を
                    // 🌸 赤いお手本の上へ追加
                    // =================================================

                    const answerPath =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "path"
                        );

                    answerPath.setAttribute(
                        "d",
                        stroke.d
                    );

                    answerPath.setAttribute(
                        "fill",
                        "none"
                    );

                    answerPath.setAttribute(
                        "stroke",
                        "#111"
                    );

                    answerPath.setAttribute(
                        "stroke-width",
                        "4"
                    );

                    answerPath.setAttribute(
                        "stroke-linecap",
                        "round"
                    );

                    answerPath.setAttribute(
                        "stroke-linejoin",
                        "round"
                    );

                    // =================================================
                    // 🌸 筆書きアニメーション
                    // 🌸 現在の0.7秒を維持
                    // =================================================

                    try {

                        const length =
                            answerPath.getTotalLength();

                        answerPath.style.strokeDasharray =
                            length;

                        answerPath.style.strokeDashoffset =
                            length;

                        answerPath.style.transition =
                            "stroke-dashoffset 0.7s ease";

                        answerSVG.appendChild(
                            answerPath
                        );

                        requestAnimationFrame(
                            () => {

                                answerPath.style.strokeDashoffset =
                                    "0";

                            }
                        );

                    } catch (error) {

                        answerSVG.appendChild(
                            answerPath
                        );
                    }

                    // =================================================
                    // 🌸 選択済みにする
                    // =================================================

                    button.disabled =
                        true;

                    button.classList.add(
                        "kokugoWritingUsed"
                    );

                    console.log(
                        "🌸 黒い回答を追加:",
                        nextIndex + 1,
                        "画目"
                    );

                    // =================================================
                    // 🌸 全画完成
                    // =================================================

                    if (
                        kokugoWritingAnswer.length ===
                        data.strokeCount
                    ) {

                        console.log(
                            "🌸 漢字書き順完成:",
                            kanji
                        );

                        const submitBtn =
                            document.querySelector(
                                '#kokugoWritingBoard button[onclick="submitKokugoWritingAnswer()"]'
                            );

                        if (submitBtn) {

                            submitBtn.disabled =
                                false;
                        }
                    }
                };

            parts.appendChild(
                button
            );
        }
    );

    // =================================================
    // 🌸 「こたえる」は最初は無効
    // =================================================

    const submitBtn =
        document.querySelector(
            '#kokugoWritingBoard button[onclick="submitKokugoWritingAnswer()"]'
        );

    if (submitBtn) {

        submitBtn.disabled =
            true;
    }

    console.log(
        "🌸 漢字書きボード表示完了:",
        kanji
    );
}

/////////////////////////////////////////////////////
// 🌸 国語・漢字書き
// 🌸 「けす」ボタン（選んだ画をやり直す）
// バグ修正：script.js に定義がなく、押すとエラーになっていた
/////////////////////////////////////////////////////

function clearKokugoWritingAnswer() {

    // 🌸 復習モード中は reviewList[reviewIndex] の答えを使う
    if (reviewMode) {

        const currentQuestion = reviewList[reviewIndex];

        if (!currentQuestion) {
            return;
        }

        createKokugoWritingBoard(
            String(currentQuestion.correct)
        );

        return;
    }

    if (!currentKokugoQuestion) {
        return;
    }

    // 🌸 ボードを作り直すことで
    // 選択済みの画・お手本表示をまとめて初期状態へ戻す
    createKokugoWritingBoard(
        String(currentKokugoQuestion.a)
    );
}

/////////////////////////////////////////////////////
// 🌸 国語・漢字書き
// 🌸 回答判定
/////////////////////////////////////////////////////

function submitKokugoWritingAnswer() {

    // 🌸 すでに回答済みなら何もしない
    if (kokugoAnswered) {
        return;
    }

    // =========================================
    // 🌸 バグ修正：復習モード（漢字の書き）
    // 復習モードでは currentKokugoQuestion ではなく
    // reviewList[reviewIndex] を使って採点し、
    // 次の問題ボタンも reviewNextQuestion() に
    // つなぎ直す必要がある
    // =========================================
    if (reviewMode) {

        const currentQuestion = reviewList[reviewIndex];

        if (!currentQuestion) {
            return;
        }

        const data =
            kokugoKanjiWritingData[
                String(currentQuestion.correct)
            ];

        if (!data) {
            console.log("🌸 漢字書き回答データ確認エラー（復習）");
            return;
        }

        if (kokugoWritingAnswer.length !== data.strokeCount) {
            console.log("🌸 まだ書き順が完成していません");
            return;
        }

        kokugoAnswered = true;
        reviewScore++;

        addPoint(10);
        showSakura();
        playSound("correct");

        const submitBtnReview = document.querySelector(
            '#kokugoWritingBoard button[onclick="submitKokugoWritingAnswer()"]'
        );

        if (submitBtnReview) {
            submitBtnReview.disabled = true;
        }

        feedback.innerHTML = `
            <h3>⭕ 正解！</h3>
            <p>
                「${currentQuestion.correct}」の
                書き順が正しくできました。
            </p>
        `;

        wrongList = wrongList.filter(
            item => item.question !== currentQuestion.question
        );

        const kokugoWritingControlsElReview =
            document.getElementById("kokugoWritingControls");

        if (kokugoWritingControlsElReview) {
            kokugoWritingControlsElReview.appendChild(nextBtn);
        }

        nextBtn.style.display = "inline-block";

        nextBtn.onclick = function () {
            reviewNextQuestion();
        };

        return;
    }

    // 🌸 全画が完成しているか確認
    if (
        !currentKokugoQuestion ||
        !currentKokugoQuestion.a ||
        !kokugoKanjiWritingData[
            currentKokugoQuestion.a
        ]
    ) {
        console.log(
            "🌸 漢字書き回答データ確認エラー"
        );

        return;
    }

    const data =
        kokugoKanjiWritingData[
            currentKokugoQuestion.a
        ];

    if (
        kokugoWritingAnswer.length !==
        data.strokeCount
    ) {

        console.log(
            "🌸 まだ書き順が完成していません"
        );

        return;
    }

    // 🌸 回答済みにする
    kokugoAnswered = true;

    // 🌸 Engine20
// 国語・単元別記録
const kokugoUnit =
    currentKokugoQuestion.unit;

// 🌸 以前の学習記録に units がない場合
if (!studyRecord.kokugo.units) {
    studyRecord.kokugo.units = {};
}

if (kokugoUnit) {

    if (!studyRecord.kokugo.units[kokugoUnit]) {

        studyRecord.kokugo.units[kokugoUnit] = {
            answered: 0,
            correct: 0
        };

    }

    studyRecord.kokugo.units[kokugoUnit].answered++;

}

// 🌸 Engine20
// 国語回答数
studyRecord.kokugo.answered++;

// 🌸 国語正解数
studyRecord.kokugo.correct++;

// 🌸 国語・単元別正解数
if (kokugoUnit) {
    studyRecord.kokugo.units[kokugoUnit].correct++;
}

    // 🌸 正解
    kokugoScore++;

    // 🌸 Sakura Point +10
    addPoint(10);

    // 🌸 正解演出
    showSakura();
    playSound("correct");

    // 🌸 こたえるボタンを無効化
    const submitBtn =
        document.querySelector(
            '#kokugoWritingBoard button[onclick="submitKokugoWritingAnswer()"]'
        );

    if (submitBtn) {
        submitBtn.disabled = true;
    }

    // 🌸 フィードバック
    feedback.innerHTML = `
        <h3>⭕ 正解！</h3>
        <p>
            「${currentKokugoQuestion.a}」の
            書き順が正しくできました。
        </p>
    `;

    // 🌸 スコア表示
    document.getElementById(
        "scoreText"
    ).textContent =
        `スコア: ${kokugoScore}`;

    // 🌸 今日の学習記録保存
    saveTodayStudyRecord();

    // 🌸 「次の問題」ボタンを「けす／こたえる」の右に並べる
    const kokugoWritingControlsEl =
        document.getElementById("kokugoWritingControls");

    if (kokugoWritingControlsEl) {
        kokugoWritingControlsEl.appendChild(nextBtn);
    }

    // 🌸 次の問題ボタン表示
    nextBtn.style.display =
        "inline-block";

    nextBtn.onclick =
        function () {

            kokugoIndex++;

            // 🌸 10問終了
            if (
                kokugoIndex >=
                currentKokugoQuiz.length
            ) {

                feedback.innerHTML = `
                    🌸 国語終了！
                    <br>
                    スコア：
                    ${kokugoScore}
                `;

                nextBtn.style.display =
                    "none";

                return;
            }

            // 🌸 次の問題
            showKokugoQuestion();
        };

    console.log(
        "🌸 漢字書き正解:",
        currentKokugoQuestion.a,
        "スコア:",
        kokugoScore
    );
}

/* =========================
   復習問題取得
========================= */

function getReviewQuestion() {

    const q = reviewList[reviewIndex];

    return {

        unit: q.unit ?? "復習モード",

        q: q.question,

        a: q.correct,

        type: q.type,

        memo: q.memo,

        source: "review"

    };

}


/* =========================
   問題取得
========================= */

function getNextQuestion(){

    if(reviewMode){
        return getReviewQuestion();
    }

    if(quizState.questions.length === 0){
        return null;
    }

    return quizState.questions[quizState.currentIndex];

}

/* =========================
   🌸 算数：筆算（縦書き計算）表示
   たし算・ひき算・かけ算・わり算・あまりのある
   わり算・小数の計算の問題文
   （例:「104 ÷ 13 = ?」「14.6 + 6.5 = ?」）を、
   日本の教科書と同じように「位（小数点）をそろえて
   右寄せ」で縦に並べたHTMLに変換する。
   答えの入力は今まで通り下の入力欄で行うため、
   ここでは見た目（式の建て方）だけを作る。
========================= */

function tryBuildHissan(question) {

    if (!question || !question.type) {
        return null;
    }

    // 🌸 分数のかけ算（分子どうし・分母どうしをかけて、約分する）
    // 🌸 わり算（÷）は書き方をまだ相談中なので、いったん対象外にする
    if (question.type === "fraction") {

        const fm = String(question.q).match(
            /^\s*(\d+)\s*\/\s*(\d+)\s*×\s*(\d+)\s*\/\s*(\d+)\s*=\s*\?(.*)$/
        );

        if (fm) {

            const fracHTML =
                buildHissanFractionMulBox(
                    fm[1], fm[2],
                    fm[3], fm[4],
                    question.a
                );

            if (fracHTML) {

                return {
                    html: fracHTML,
                    suffix: (fm[5] || "").trim(),
                    answerBoxes: true
                };

            }

        }

        return null;
    }

    // 🌸 方程式（一次方程式）：移項してxを孤立させる過程を
    // 筆算枠に表示する。xが両辺にある問題・かっこを展開する問題は
    // まだ仕組みが複雑になるので、いったん対象外にする（今まで通り
    // 直接入力）。
    if (question.type === "equation") {

        const eqHTML =
            buildHissanEquationBox(question);

        if (eqHTML) {

            return {
                html: eqHTML,
                suffix: "",
                answerBoxes: true
            };

        }

        return null;
    }

    const arithmeticTypes =
        ["add", "subtract", "multiply", "divide", "remainder", "decimal"];

    if (!arithmeticTypes.includes(question.type)) {
        return null;
    }

    const m = String(question.q).match(
        /^\s*(\d+(?:\.\d+)?)\s*([+\-×÷])\s*(\d+(?:\.\d+)?)\s*=\s*\?(.*)$/
    );

    if (!m) {
        return null;
    }

    const aStr = m[1];
    const op = m[2];
    const bStr = m[3];
    const suffix = (m[4] || "").trim();

    const a = parseFloat(aStr);
    const b = parseFloat(bStr);

    if (isNaN(a) || isNaN(b)) {
        return null;
    }

    const isDecimalQuestion =
        question.type === "decimal" ||
        aStr.includes(".") || bStr.includes(".");

    // 🌸 九九など、一桁どうしの単純な整数計算は筆算にせず今まで通り表示
    // （小数の単元は、けたの大小に関わらず「小数点をそろえる」練習として常に表示）
    const needsHissan =
        isDecimalQuestion ? true :
        (op === "÷") ? a >= 10 : Math.max(a, b) >= 10;

    if (!needsHissan) {
        return null;
    }

    // 🌸 答え（採点用の正解）から、筆算の答えマスに必要な桁数を割り出す。
    // 「7あまり3」のような複合形式は、先頭の数値部分だけを使う。
    let answerStr = "";

    if (question.a !== undefined && question.a !== null) {

        const am = String(question.a).match(/-?\d+(?:\.\d+)?/);

        if (am) {
            answerStr = am[0];
        }

    }

    let boxHTML;

    if (op === "÷") {

        boxHTML = buildHissanDivisionBox(aStr, bStr, answerStr);

    } else {

        const opSymbol =
            op === "+" ? "＋" : (op === "-" ? "－" : "×");

        boxHTML = buildHissanRowBox(aStr, bStr, opSymbol, answerStr);

    }

    // 🌸 式は今まで通り上（問題文）に表示したまま、この結果は
    // テンキーの横（筆算パネル）に表示する。答えマスがあるので
    // 常に answerBoxes:true として扱う。
    return { html: boxHTML, suffix: suffix, answerBoxes: true };

}


// 🌸 一次方程式：移項してxを孤立させる過程を筆算枠で見せる。
// 対応する形（qの書き方）：
// ・ax + b = c 、ax - b = c （2段階：移項してまとめる→わる）
// ・x + b = c 、x - b = c 、ax = c 、x/a = c （1段階：移項する／わる）
// xが両辺にある問題・かっこを展開する問題は対象外（null を返す）。
function buildHissanEquationBox(question) {

    const q = String(question.q || "").trim();

    let boxIndex = 0;

    // 🌸 1つの値を、符号（マイナスの時だけ）＋桁数ぶんの1桁マスに
    // 分けて書き込めるようにする（分数の筆算と同じ考え方）。
    const boxesFor = (value) => {

        const isNeg = value < 0;

        const digits =
            String(Math.abs(value)).split("");

        let html = "";

        if (isNeg) {

            const signIdx = boxIndex++;

            html += `<input type="text" inputmode="text" class="hissanAnswerBox hissanEquationBox" data-hissan-idx="${signIdx}" autocomplete="off">`;

        }

        digits.forEach(() => {

            const idx = boxIndex++;

            html += `<input type="text" inputmode="numeric" class="hissanAnswerBox hissanEquationBox" data-hissan-idx="${idx}" autocomplete="off">`;

        });

        return html;

    };

    // 🌸 xの項（例：-3x）を、符号＋数字のマスに続けて、
    // 最後に「x」のマスも1つ書き込めるようにする。
    const boxesForXTerm = (coeff) => {

        let html = boxesFor(coeff);

        const idx = boxIndex++;

        html += `<input type="text" inputmode="text" class="hissanAnswerBox hissanEquationBox" data-hissan-idx="${idx}" autocomplete="off">`;

        return html;

    };

    const stepRow = (label, givenText, boxValue, tailText, isXTerm) => `
        <div class="hissanEquationStep">
            <div class="hissanEquationStepLabel">${label}</div>
            <div class="hissanEquationRow">
                ${givenText ? `<span>${givenText}</span>` : ""}
                <span class="hissanEquationBoxes">${isXTerm ? boxesForXTerm(boxValue) : boxesFor(boxValue)}</span>
                ${tailText ? `<span>${tailText}</span>` : ""}
            </div>
        </div>
    `;

    // 🌸 1つの段の中に、書き込みマスが2か所ある時（例：xの項と
    // 定数項を同時にまとめる段）に使う。
    const stepRow2 = (label, part1, boxValue1, mid, boxValue2, tailText) => `
        <div class="hissanEquationStep">
            <div class="hissanEquationStepLabel">${label}</div>
            <div class="hissanEquationRow">
                ${part1 ? `<span>${part1}</span>` : ""}
                <span class="hissanEquationBoxes">${boxesFor(boxValue1)}</span>
                ${mid ? `<span>${mid}</span>` : ""}
                <span class="hissanEquationBoxes">${boxesFor(boxValue2)}</span>
                ${tailText ? `<span>${tailText}</span>` : ""}
            </div>
        </div>
    `;

    // =========================
    // 🌸 4段階：ax + b = cx + d （xが両辺にある）
    // 　（xの項を移項する→定数項を移項する→
    // 　　xの項と定数項をそれぞれまとめる→わる、の4段）
    // =========================

    let m =
        q.match(/^(\d+)x\s*([+\-])\s*(\d+)\s*=\s*(\d+)x\s*([+\-])\s*(\d+)(?!\d)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const bAbs = parseInt(m[3], 10);
        const b = m[2] === "+" ? bAbs : -bAbs;
        const c = parseInt(m[4], 10);
        const dAbs = parseInt(m[6], 10);
        const d = m[5] === "+" ? dAbs : -dAbs;

        if ([a, bAbs, c, dAbs].some(n => isNaN(n)) || a === 0 || c === 0) {
            return null;
        }

        const coefCombined = a - c;
        const constCombined = b - d;
        const dividend = -constCombined;
        const divisor = coefCombined;

        // 🌸 係数がマイナスになる問題・答えがマイナスになる問題は、
        // まだこの筆算枠では扱わない（今まで通り直接入力）
        if (
            divisor <= 0 ||
            dividend <= 0 ||
            dividend % divisor !== 0
        ) {
            return null;
        }

        const bSign = b >= 0 ? "+" : "-";
        const bText = `${a}x ${bSign} ${Math.abs(b)}`;

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 移項する（xの項、符号が変わる）", bText, -c, `= ${d}`, true)}
                ${stepRow("② 移項する（定数項、符号が変わる）", `${bText} - ${c}x`, -d, "= 0")}
                ${stepRow2("③ まとめる（xの項・定数項）", "", coefCombined, "x", constCombined, "= 0")}
                ${stepRow("④ xの係数でわる", `x = ${dividend} ÷ ${divisor} =`, dividend / divisor, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 4段階：a(x + b) = c
    // 　（分配法則で展開してから、今までの
    // 　　移項→まとめる→わる、の3段に続ける）
    // =========================

    m = q.match(/^(\d+)\(x\s*\+\s*(\d+)\)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const bInner = parseInt(m[2], 10);
        const c = parseInt(m[3], 10);

        if ([a, bInner, c].some(n => isNaN(n)) || a === 0) {
            return null;
        }

        const bExpanded = a * bInner;
        const combined = bExpanded - c;
        const dividend = c - bExpanded;

        if (dividend % a !== 0) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 分配法則で展開する", `${a} × ${bInner} =`, bExpanded, "")}
                ${stepRow("② 移項する（符号が変わる）", `${a}x + ${bExpanded}`, -c, "= 0")}
                ${stepRow("③ 定数項をまとめる", `${a}x`, combined, "= 0")}
                ${stepRow("④ xの係数でわる", `x = ${dividend} ÷ ${a} =`, dividend / a, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 4段階：a(x - b) = c
    // =========================

    m = q.match(/^(\d+)\(x\s*-\s*(\d+)\)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const bInner = parseInt(m[2], 10);
        const c = parseInt(m[3], 10);

        if ([a, bInner, c].some(n => isNaN(n)) || a === 0) {
            return null;
        }

        const bExpanded = a * bInner;
        const combined = -(bExpanded + c);
        const dividend = bExpanded + c;

        if (dividend % a !== 0) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 分配法則で展開する", `${a} × ${bInner} =`, bExpanded, "")}
                ${stepRow("② 移項する（符号が変わる）", `${a}x - ${bExpanded}`, -c, "= 0")}
                ${stepRow("③ 定数項をまとめる", `${a}x`, combined, "= 0")}
                ${stepRow("④ xの係数でわる", `x = ${dividend} ÷ ${a} =`, dividend / a, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 2段階：ax + b = c
    // =========================

    m = q.match(/^(\d+)x\s*\+\s*(\d+)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        const c = parseInt(m[3], 10);

        if ([a, b, c].some(n => isNaN(n)) || a === 0) {
            return null;
        }

        const combined = b - c;
        const dividend = c - b;

        if (dividend % a !== 0) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 移項する（符号が変わる）", `${a}x + ${b}`, -c, "= 0")}
                ${stepRow("② 定数項をまとめる", `${a}x`, combined, "= 0")}
                ${stepRow("③ xの係数でわる", `x = ${dividend} ÷ ${a} =`, dividend / a, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 2段階：ax - b = c
    // =========================

    m = q.match(/^(\d+)x\s*-\s*(\d+)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        const c = parseInt(m[3], 10);

        if ([a, b, c].some(n => isNaN(n)) || a === 0) {
            return null;
        }

        const combined = -(b + c);
        const dividend = b + c;

        if (dividend % a !== 0) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 移項する（符号が変わる）", `${a}x - ${b}`, -c, "= 0")}
                ${stepRow("② 定数項をまとめる", `${a}x`, combined, "= 0")}
                ${stepRow("③ xの係数でわる", `x = ${dividend} ÷ ${a} =`, dividend / a, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 1段階：x + b = c → x = c - b
    // =========================

    m = q.match(/^x\s*\+\s*(\d+)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const b = parseInt(m[1], 10);
        const c = parseInt(m[2], 10);

        if ([b, c].some(n => isNaN(n))) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 移項する", `x = ${c} - ${b} =`, c - b, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 1段階：x - b = c → x = c + b
    // =========================

    m = q.match(/^x\s*-\s*(\d+)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const b = parseInt(m[1], 10);
        const c = parseInt(m[2], 10);

        if ([b, c].some(n => isNaN(n))) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 移項する", `x = ${c} + ${b} =`, c + b, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 1段階：ax = c → x = c ÷ a
    // =========================

    m = q.match(/^(\d+)x\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const c = parseInt(m[2], 10);

        if ([a, c].some(n => isNaN(n)) || a === 0 || c % a !== 0) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① xの係数でわる", `x = ${c} ÷ ${a} =`, c / a, "")}
            </div>
        `;

        return html;

    }

    // =========================
    // 🌸 1段階：x/a = c → x = c × a
    // =========================

    m = q.match(/^x\s*\/\s*(\d+)\s*=\s*(\d+)(?!x)/);

    if (m) {

        const a = parseInt(m[1], 10);
        const c = parseInt(m[2], 10);

        if ([a, c].some(n => isNaN(n))) {
            return null;
        }

        const html = `
            <div class="hissanEquationPanel">
                ${stepRow("① 逆演算でxをもとめる", `x = ${c} × ${a} =`, c * a, "")}
            </div>
        `;

        return html;

    }

    // 🌸 xが両辺にある問題・かっこを展開する問題・文章題は対象外
    return null;

}


// 🌸 分数のかけ算：分子どうし・分母どうしをそれぞれかけ算として書き込み、
// できた分数（約分前）を、さらに約分した最終的な答えへつなげる。
// 「算数方式」と同じく、答えは1桁ずつのマスに分けて書き込む
// （2桁の答えになる場合もあるため、桁数はその都度の値から決める）。
function buildHissanFractionMulBox(aNumStr, aDenStr, bNumStr, bDenStr, answerRaw) {

    const aNum = parseInt(aNumStr, 10);
    const aDen = parseInt(aDenStr, 10);
    const bNum = parseInt(bNumStr, 10);
    const bDen = parseInt(bDenStr, 10);

    if ([aNum, aDen, bNum, bDen].some(n => isNaN(n))) {
        return null;
    }

    const prodNum = aNum * bNum;
    const prodDen = aDen * bDen;

    // 🌸 正解（約分後の分数、または整数）から、最終的な分子・分母を割り出す
    const ansStr = String(answerRaw == null ? "" : answerRaw).trim();

    let finalNum;
    let finalDen;

    if (ansStr.includes("/")) {

        const ansParts = ansStr.split("/");

        finalNum = parseInt(ansParts[0], 10);
        finalDen = parseInt(ansParts[1], 10);

    } else {

        finalNum = parseInt(ansStr, 10);
        finalDen = 1;
    }

    if (isNaN(finalNum) || isNaN(finalDen)) {
        return null;
    }

    let boxIndex = 0;

    // 🌸 1つの値を、桁数ぶんの1桁マスに分けて書き込めるようにする
    const digitBoxesFor = (value) => {

        const digits =
            String(Math.abs(value)).split("");

        return digits.map(() => {

            const idx = boxIndex++;

            return `<input type="text" inputmode="numeric" class="hissanAnswerBox hissanFracBox" data-hissan-idx="${idx}" autocomplete="off">`;

        }).join("");
    };

    const calcRow = (givenText, value) => `
        <div class="hissanFracRow">
            <span class="hissanFracGivenCalc">${givenText} =</span>
            <span class="hissanFracBoxes">${digitBoxesFor(value)}</span>
        </div>
    `;

    const boxesOnlyRow = (value) => `
        <div class="hissanFracRow">
            <span class="hissanFracBoxes">${digitBoxesFor(value)}</span>
        </div>
    `;

    // 🌸 ①分子どうし・分母どうしをかけ算する段
    const stepOneHTML = `
        <div class="hissanFracStep">
            ${calcRow(`${aNumStr} × ${bNumStr}`, prodNum)}
            <div class="hissanFracBar"></div>
            ${calcRow(`${aDenStr} × ${bDenStr}`, prodDen)}
        </div>
    `;

    // 🌸 ②約分した、最終的な答えの段
    // 　（答えが整数の場合は、分母の段（＝1）は表示しない）
    const stepTwoHTML =
        finalDen === 1
            ? `
        <div class="hissanFracStep">
            ${boxesOnlyRow(finalNum)}
        </div>
    `
            : `
        <div class="hissanFracStep">
            ${boxesOnlyRow(finalNum)}
            <div class="hissanFracBar"></div>
            ${boxesOnlyRow(finalDen)}
        </div>
    `;

    const html = `
        <div class="hissanFractionPanel">
            ${stepOneHTML}
            <div class="hissanFracArrow">↓ 約分すると</div>
            ${stepTwoHTML}
        </div>
    `;

    return html;

}


// 🌸 たし算・ひき算・かけ算 共通：位（小数点）をそろえて右寄せし、
// 上の式は数字ボードと同じ見た目の□で囲んで表示するだけ（読み取り専用）、
// 答えの段は空の入力マスにして、テンキーから書き込めるようにする。
function buildHissanRowBox(aStr, bStr, opSymbol, answerStr) {

    const parseNum = (numStr) => {
        const parts = String(numStr).split(".");
        return {
            intPart: parts[0] || "0",
            fracPart: parts.length > 1 ? parts[1] : ""
        };
    };

    const aP = parseNum(aStr);
    const bP = parseNum(bStr);
    const ansP = answerStr ? parseNum(answerStr) : { intPart: "", fracPart: "" };

    const maxIntLen = Math.max(aP.intPart.length, bP.intPart.length, ansP.intPart.length, 1);
    const maxFracLen = Math.max(aP.fracPart.length, bP.fracPart.length, ansP.fracPart.length, 0);
    const hasDot = maxFracLen > 0;

    let boxIndex = 0;

    // 🌸 与えられた数字（上の式）の段：数字ボードと同じ□で囲んで表示するだけ
    const givenRow = (numPart, opCellHTML) => {

        const intChars = numPart.intPart.split("");

        while (intChars.length < maxIntLen) {
            intChars.unshift("");
        }

        const digitCell = (c) =>
            c === ""
                ? `<span class="hissanDigitCell"></span>`
                : `<span class="hissanDigitCell hissanDigitFilled">${c}</span>`;

        const intCells = intChars.map(digitCell).join("");

        let dotCell = "";
        let fracCells = "";

        if (hasDot) {

            dotCell = `<span class="hissanDigitCell hissanDotCell">${numPart.fracPart !== "" ? "." : ""}</span>`;

            const fracChars = numPart.fracPart.split("");

            while (fracChars.length < maxFracLen) {
                fracChars.push("");
            }

            fracCells = fracChars.map(digitCell).join("");

        }

        return opCellHTML + intCells + dotCell + fracCells;

    };

    // 🌸 かけ算のかける数（６など）は、上の数の小数点に合わせるのではなく、
    // 小数点を無視していちばん右の桁（＝小数点の位置）にそろえて表示する
    // のが筆算の決まり（57×6として計算し、あとから答えに小数点を打つため）。
    const givenRowFlushRight = (numPart, opCellHTML) => {

        const digits = (numPart.intPart + numPart.fracPart).split("");
        const totalSlots = maxIntLen + maxFracLen;

        while (digits.length < totalSlots) {
            digits.unshift("");
        }

        const digitCell = (c) =>
            c === ""
                ? `<span class="hissanDigitCell"></span>`
                : `<span class="hissanDigitCell hissanDigitFilled">${c}</span>`;

        const intCells = digits.slice(0, maxIntLen).map(digitCell).join("");

        let dotCell = "";
        let fracCells = "";

        if (hasDot) {
            dotCell = `<span class="hissanDigitCell hissanDotCell"></span>`;
            fracCells = digits.slice(maxIntLen).map(digitCell).join("");
        }

        return opCellHTML + intCells + dotCell + fracCells;

    };

    // 🌸 答えの段：空の入力マス（テンキーから書き込める・採点はしない）。
    // たし算・ひき算は実際の筆算と同じく、下の位（一番右）から
    // 上の位（左）へ（＝繰り上がり・繰り下がりを1桁ずつ順番に
    // 計算するため）。
    // かけ算は、小数点以下（一番右）をまず計算して繰り上がりを
    // 出してから、整数部は上の位（左）から下の位（右）へ、
    // ふつうに数字を書く時と同じ順に書き込む（＝一の位より上は
    // 最後の掛け算でまとめて出た数をそのまま書き写すだけなので、
    // 読み書きと同じ左→右の順でよい）。
    const answerRow = () => {

        const intIdx = new Array(maxIntLen);
        const fracIdx = new Array(maxFracLen);

        for (let p = maxFracLen - 1; p >= 0; p--) {
            fracIdx[p] = boxIndex++;
        }

        if (opSymbol === "×") {

            for (let p = 0; p < maxIntLen; p++) {
                intIdx[p] = boxIndex++;
            }

        } else {

            for (let p = maxIntLen - 1; p >= 0; p--) {
                intIdx[p] = boxIndex++;
            }

        }

        let html = `<span class="hissanOp">&nbsp;</span>`;

        for (let p = 0; p < maxIntLen; p++) {
            html += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${intIdx[p]}" autocomplete="off">`;
        }

        if (hasDot) {

            html += `<span class="hissanDigitCell hissanDotCell">.</span>`;

            for (let p = 0; p < maxFracLen; p++) {
                html += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${fracIdx[p]}" autocomplete="off">`;
            }

        }

        return html;

    };

    const totalCols = maxIntLen + (hasDot ? 1 : 0) + maxFracLen;

    return `
        <div class="hissanWorksheet" style="grid-template-columns: 34px repeat(${totalCols}, 42px);">
            ${givenRow(aP, `<span class="hissanOp">&nbsp;</span>`)}
            ${opSymbol === "×"
                ? givenRowFlushRight(bP, `<span class="hissanOp">${opSymbol}</span>`)
                : givenRow(bP, `<span class="hissanOp">${opSymbol}</span>`)}
            <div class="hissanWorksheetLine" style="grid-column: 1 / ${totalCols + 2};"></div>
            ${answerRow()}
        </div>
    `;

}


// 🌸 わり算・あまり：わる数・わられる数は数字ボードと同じ□で囲んで表示し、
// 商（答え）は建て式の上に空の入力マスとして表示する（採点はしない）。
function buildHissanDivisionBox(aStr, bStr, answerStr) {

    const boxChars = (numStr) =>
        String(numStr)
            .split("")
            .map(c =>
                c === "."
                    ? `<span class="hissanDigitCell hissanDotCell">.</span>`
                    : `<span class="hissanDigitCell hissanDigitFilled">${c}</span>`
            )
            .join("");

    const ansParts = answerStr ? String(answerStr).split(".") : [""];
    const ansIntPart = ansParts[0] || "";
    const ansFracPart = ansParts.length > 1 ? ansParts[1] : "";
    const ansIntLen = Math.max(ansIntPart.length, 1);
    const ansFracLen = ansFracPart.length;

    // 🌸 わられる数（74 など）の桁パターン（整数部・小数部）に
    // そろえて、その真下に「商×わる数（ひく数）」と「あまり」を
    // 書き込むマスを作る。ノートを使わずに、この筆算欄だけで
    // 計算が完結するようにする。
    const aParts = String(aStr).split(".");
    const aIntPart = aParts[0] || "0";
    const aFracPart = aParts.length > 1 ? aParts[1] : "";
    const aIntLen = aIntPart.length;
    const aFracLen = aFracPart.length;
    const aHasDot = aFracPart !== "";

    // 🌸 記入の順番（実際に手で筆算する時と同じ）：
    //   ① 商 …下の位（右）から上の位（左）へ
    //      （繰り下がりのように、下の位の結果を見ながら
    //        上の位を決めるため）
    //   ② 商×わる数 …ふつうに数字を書く時と同じく、
    //      上の位（左）から下の位（右）へ
    //      （すでに計算できている数をそのまま書き写すだけなので、
    //        読み書きと同じ左→右の順でよい）
    //   ③ あまり …下の位（右）から上の位（左）へ
    //      （ひき算の繰り下がりがあるため）
    // ①→②→③ の順で、ひとまとまりずつマスに数字を入れていく。

    // 🌸 商・積・あまりを実際に計算し、あまりに必要な桁数だけ
    // マスを用意する（あまりが1桁なら、上の位の余分なマスは
    // 表示しない）。
    const aValue = parseFloat(aStr);
    const bValue = parseFloat(bStr);
    const quotientValue = parseFloat(answerStr || "0") || 0;

    const roundDecimals = Math.max(aFracLen, ansFracLen) + 2;
    const roundFactor = Math.pow(10, roundDecimals);

    const productValue =
        Math.round(quotientValue * bValue * roundFactor) / roundFactor;

    const remainderValue =
        Math.round((aValue - productValue) * roundFactor) / roundFactor;

    const remIntDigitCount =
        String(Math.floor(Math.abs(remainderValue) + 1e-9)).length;

    const remIntLen =
        Math.min(Math.max(remIntDigitCount, 1), aIntLen);

    let boxIndex = 0;

    // 🌸 ① 商のマス：下の位（右）から上の位（左）へ
    const quotientIntIdx = new Array(ansIntLen);
    const quotientFracIdx = new Array(ansFracLen);

    for (let p = ansFracLen - 1; p >= 0; p--) {
        quotientFracIdx[p] = boxIndex++;
    }

    for (let p = ansIntLen - 1; p >= 0; p--) {
        quotientIntIdx[p] = boxIndex++;
    }

    let quotientHTML = "";

    for (let p = 0; p < ansIntLen; p++) {
        quotientHTML += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${quotientIntIdx[p]}" autocomplete="off">`;
    }

    if (ansFracPart !== "") {

        quotientHTML += `<span class="hissanDigitCell hissanDotCell">.</span>`;

        for (let p = 0; p < ansFracLen; p++) {
            quotientHTML += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${quotientFracIdx[p]}" autocomplete="off">`;
        }

    }

    // 🌸 ② 商×わる数（積）のマス：上の位（左）から下の位（右）へ
    const productIntIdx = new Array(aIntLen);
    const productFracIdx = new Array(aFracLen);

    for (let p = 0; p < aIntLen; p++) {
        productIntIdx[p] = boxIndex++;
    }

    for (let p = 0; p < aFracLen; p++) {
        productFracIdx[p] = boxIndex++;
    }

    let productHTML = "";

    for (let p = 0; p < aIntLen; p++) {
        productHTML += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${productIntIdx[p]}" autocomplete="off">`;
    }

    if (aHasDot) {

        productHTML += `<span class="hissanDigitCell hissanDotCell">.</span>`;

        for (let p = 0; p < aFracLen; p++) {
            productHTML += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${productFracIdx[p]}" autocomplete="off">`;
        }

    }

    const subtractRowHTML = `<div class="hissanDivRow">${productHTML}</div>`;

    // 🌸 ③ あまりのマス：下の位（右）から上の位（左）へ。
    // わられる数と桁数をそろえつつ、実際にあまりが届かない
    // 上の位は空マス（枠なし）にしておく。
    const remainderFracIdx = new Array(aFracLen);
    const remainderIntIdx = new Array(remIntLen);

    for (let p = aFracLen - 1; p >= 0; p--) {
        remainderFracIdx[p] = boxIndex++;
    }

    for (let p = remIntLen - 1; p >= 0; p--) {
        remainderIntIdx[p] = boxIndex++;
    }

    let remainderHTML = "";

    for (let p = 0; p < aIntLen; p++) {

        const remP = p - (aIntLen - remIntLen);

        remainderHTML +=
            remP >= 0
                ? `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${remainderIntIdx[remP]}" autocomplete="off">`
                : `<span class="hissanDivBlankCell"></span>`;

    }

    if (aHasDot) {

        remainderHTML += `<span class="hissanDigitCell hissanDotCell">.</span>`;

        for (let p = 0; p < aFracLen; p++) {
            remainderHTML += `<input type="text" inputmode="numeric" class="hissanAnswerBox" data-hissan-idx="${remainderFracIdx[p]}" autocomplete="off">`;
        }

    }

    const remainderRowHTML = `<div class="hissanDivRow">${remainderHTML}</div>`;

    return `
        <div class="hissanDivPanel">
            <div class="hissanDivQuotientRow">${quotientHTML}</div>
            <div class="hissanDivWrap">
                <span class="hissanDivisor">${boxChars(bStr)}</span>
                <div class="hissanDivBracket">
                    <div class="hissanDivRow">${boxChars(aStr)}</div>
                    ${subtractRowHTML}
                    <div class="hissanDivSubLine"></div>
                    ${remainderRowHTML}
                </div>
            </div>
        </div>
    `;

}


// 🌸 筆算メモ欄（下書きスペース）を非表示にして中身も空にする。
// 算数から他の教科（国語・理科・英語）へ切り替える時に、
// 前の問題のメモが残ったまま表示されてしまわないようにする。
function hideHissanScratchPad() {

    const scratchWrap =
        document.getElementById("hissanScratchWrap");

    const panelContent =
        document.getElementById("hissanPanelContent");

    if (panelContent) {
        panelContent.innerHTML = "";
    }

    // 🌸 テンキーの書き込み先を回答欄に戻す
    mathKeypadFocusedEl = null;

    if (scratchWrap) {
        scratchWrap.style.display = "none";
    }

}


// 🌸 筆算のマス目（プリントのような、たし算・ひき算の答え欄）に
// タップ操作でフォーカスできるようにする。マス目は問題が変わる
// たびに qText.innerHTML で作り直されるので、そのたびに呼び出す。
function wireHissanAnswerBoxes() {

    const boxes = Array.from(
        document.querySelectorAll(".hissanAnswerBox")
    );

    const mainAnswerInputEl =
        document.getElementById("answerInput");

    // 🌸 data-hissan-idx の番号で前後のマスを探す。
    // 小数点の区切りがDOM上に挟まっていたり、答えのマスが
    // 「下の位（右）→上の位（左）」の計算順に並んでいたりしても、
    // 見た目の隣接ではなく、この番号で正しく前後へ進める。
    const boxByIdx = (idx) =>
        document.querySelector(
            `.hissanAnswerBox[data-hissan-idx="${idx}"]`
        );

    boxes.forEach((box) => {

        const idx = parseInt(box.dataset.hissanIdx, 10);

        box.addEventListener("focus", () => {
            mathKeypadFocusedEl = box;
        });

        // 🌸 実物のキーボードで直接入力した時も、数字だけに整えて
        // 次のマス（計算順で1つ上の位）へ自動で進む。最後のマスまで
        // 書き終えたら、今まで通り上の回答欄へカーソルを移動する。
        // 🌸 バグ修正：方程式の筆算枠では「－」だけが入るマスもあるため、
        // 数字に加えて「－」も残すようにする（他の筆算では今まで通り
        // 数字しか出てこないので影響なし）。
        box.addEventListener("input", () => {

            box.value = box.value
                .replace(/[^0-9\-]/g, "")
                .slice(-1);

            if (box.value) {

                const nextBox = boxByIdx(idx + 1);

                if (nextBox) {
                    nextBox.focus();
                } else if (mainAnswerInputEl) {
                    mainAnswerInputEl.focus();
                }

            }

        });

        // 🌸 マスが空の状態でバックスペースを押したら、
        // 1つ前のマス（計算順で1つ下の位）へ戻る
        box.addEventListener("keydown", (e) => {

            const prevBox = boxByIdx(idx - 1);

            if (
                e.key === "Backspace" &&
                box.value === "" &&
                prevBox
            ) {
                prevBox.focus();
            }

        });

    });

    // 🌸 タップしなくても、筆算の最初のマス（一番下の位＝計算を
    // 始める位）にカーソルを合わせておく（ノートを使わずに、
    // そのまま数字ボードで書き始められるように）
    const firstBox = boxByIdx(0);

    if (firstBox) {
        firstBox.focus();
    }

}


/* =========================
   問題表示（v6接続強化）
========================= */

function showQuestion() {

    mathKeypadAction = "answer";

    reviewAnswered = false;

    if (questionCount >= maxQuestions) {

        showResult();

        return;
    }


    // =========================
    // 🌸 問題取得（Engine03）
    // =========================

    if (reviewMode) {

        quizState.currentQuestion =
            getReviewQuestion();

    } else {

        quizState.currentQuestion =
            getNextQuestion();

    }


    console.log(
        "🌸 currentQuestion =",
        quizState.currentQuestion
    );


    // =========================
    // 🌸 Engine16 テンキー切替
    // =========================

    const answerType =
        getAnswerType(
            quizState.currentQuestion
        );


    console.log(
        "🌸 answerType =",
        answerType
    );


    // =================================
    // 🌸 国語読みボードを非表示
    // （国語→算数で切り替えた際に残らないように）
    // =================================

    const kokugoReadingBoardEl =
        document.getElementById(
            "kokugoReadingBoard"
        );

    if (kokugoReadingBoardEl) {

        kokugoReadingBoardEl.style.display =
            "none";

    }


    // =================================
    // 🌸 国語書きボードを非表示
    // =================================

    const kokugoWritingBoardEl =
        document.getElementById(
            "kokugoWritingBoard"
        );

    if (kokugoWritingBoardEl) {

        kokugoWritingBoardEl.style.display =
            "none";

    }


    const keypad =
        document.getElementById(
            "mathKeypad"
        );


    if (keypad) {

        // 🌸 入力方式に応じたテンキー生成
        createMathKeypad(
            answerType
        );

        keypad.style.display =
            "grid";

    }


    // =========================
    // 🌸 学習中ユーザー表示
    // =========================

    const userStatus =
        document.getElementById(
            "userStatus"
        );

    if (userStatus) {

        // 🌸 バグ修正：問題番号はここではなく、問題文の上に
        // 水色の「第N問 / 10」として表示するようにしたため、
        // ここでの重複表示は取りやめる
        userStatus.textContent =
            `👤 ${currentUser.name} さん`;

    }


    // =========================
    // 🌸 クイズ画面表示
    // =========================

    const qArea =
        document.getElementById(
            "quizArea"
        );

    const qText =
        document.getElementById(
            "questionText"
        );


    if (qArea) {

        showScreen("quiz");

    }


    // =========================
    // 🌸 単元名＋問題文
    // =========================

    if (qText) {

        // 🌸 バグ修正：問題番号「第N問 / 10」を問題文から
        // はっきり離し、水色で表示する（理科・国語・英語と統一）
        // 🌸 式は今まで通り、常にそのまま（横書き）で問題文に表示する。
        qText.innerHTML = `
            <div class="questionCounter">第${questionCount + 1}問 / ${maxQuestions}</div>
            <div class="questionBody">
                📚 ${quizState.currentQuestion.unit}
                <br><br>
                ${quizState.currentQuestion.q}
            </div>
        `;


        // 🌸 筆算パネル（採点なし）：桁の大きいたし算・ひき算・
        // かけ算・わり算・小数の問題では、テンキーの横に
        // 数字ボードと同じ□で囲んだ筆算を表示し、答えのマスへ
        // テンキーから書き込めるようにする。問題が変わるたびに
        // 中身を作り直す。
        const hissan = tryBuildHissan(quizState.currentQuestion);

        const scratchWrap =
            document.getElementById("hissanScratchWrap");

        const panelContent =
            document.getElementById("hissanPanelContent");

        // 🌸 新しい問題では、まず回答欄に書き込む状態に戻す
        mathKeypadFocusedEl = null;

        if (panelContent) {
            panelContent.innerHTML = hissan
                ? `${hissan.html}${hissan.suffix ? `<div class="hissanSuffix">${hissan.suffix}</div>` : ""}`
                : "";
        }

        if (scratchWrap) {
            scratchWrap.style.display = hissan ? "flex" : "none";
        }

        if (hissan) {
            wireHissanAnswerBoxes();
        }

    }


    // =========================
    // 🌸 Engine20 学習時間開始
    // =========================

    startStudyTimer();


    // =========================
    // 🌸 回答欄
    // =========================

    const input =
        document.getElementById(
            "answerInput"
        );


    if (input) {

        input.value = "";

        input.disabled = false;


        // 🌸 回答欄は表示
        input.style.display =
            "block";


        // 🌸 入力方式切替
        input.readOnly =
            !(
                answerType === "text" ||
                answerType === "english"
            );


        // 🌸 中1英語は大型入力欄
        input.classList.toggle(
            "englishInput",
            answerType === "english"
        );

        // 🌸 英語モードのヒント（IME案内）が残らないようにリセット
        input.removeAttribute("lang");
        input.setAttribute("inputmode", "text");
        input.placeholder = "";

    }


    // =========================
    // 🌸 次へボタン非表示
    // =========================

    nextBtn.style.display =
        "none";


    // =========================
    // 🌸 前回の回答表示クリア
    // =========================

    const fb =
        document.getElementById(
            "feedback"
        );


    if (fb) {

        fb.textContent =
            "";

    }


    // =========================
    // 🌸 カーソル
    // =========================

    if (input) {

        setTimeout(() => {

            // 🌸 筆算のマス目がある問題は、一番下の位（計算を
            // 始めるマス＝ data-hissan-idx="0"）にカーソルを合わせる。
            // マス目が無い問題は、今まで通り上の回答欄に合わせる。
            const firstHissanBox = document.querySelector(
                '.hissanAnswerBox[data-hissan-idx="0"]'
            );

            if (firstHissanBox) {
                firstHissanBox.focus();
            } else {
                input.focus();
            }

        }, 50);

    }

}

/* =========================
   回答処理（v7.5 Stable SDS版）
========================= */

function submitAnswer() {

    const input =
        document.getElementById("answerInput");

    if (!input) return;


    const raw = input.value;

    const fb =
        document.getElementById("feedback");

    console.log("🌸 submitAnswer raw =", raw);
    console.log("🌸 submitAnswer normalized =", normalizeAnswer(raw));
    console.log("🌸 submitAnswer correct =", quizState.currentQuestion.a);
    console.log("🌸 submitAnswer check =", checkAnswer(quizState.currentQuestion, raw));

    // 未入力チェック
    if (raw.trim() === "") {

        fb.textContent =
            "⚠ 未入力です";

        fb.style.color =
            "orange";

        return;
    }



    // =========================
    // 🌸 Engine13 回答判定
    // =========================

    const ans =
        normalizeAnswer(raw);


    const ok =
    checkAnswer(
        quizState.currentQuestion,
        ans
    );



    // =========================
    // 🌸 Engine20 単元記録
    // =========================

    const mathUnit =
        quizState.currentQuestion.unit;


    if (!studyRecord.math.units) {

        studyRecord.math.units = {};

    }


    if (mathUnit) {


        if (!studyRecord.math.units[mathUnit]) {

            studyRecord.math.units[mathUnit] = {

                answered:0,
                correct:0

            };

        }


        studyRecord.math.units[mathUnit].answered++;

    }



    studyRecord.math.answered++;




    // =========================
    // 🌸 判定表示
    // =========================


    if (ok) {


        score++;


        studyRecord.math.correct++;



        if (mathUnit) {

            studyRecord.math.units[mathUnit].correct++;

        }



        addPoint(10);


        showSakura();


        playSound("correct");



        fb.innerHTML = `

        🌸 正解 +1

        <br><br>

        💡 考え方

        <br>

        ${quizState.currentQuestion.memo || ""}

        `;


        fb.style.color =
            "green";



    } else {


        playSound("wrong");



        fb.innerHTML = `

        ❌ 不正解

        <br><br>

        💡 ヒント

        <br>

        ${quizState.currentQuestion.memo || ""}

        `;


        fb.style.color =
            "red";


    }




    // =========================
    // 🌸 出題進行
    // =========================


    questionCount++;

    quizState.currentIndex++;




    // =========================
    // 🌸 復習データ保存
    // =========================


    const record = {


        question:
            quizState.currentQuestion.q,


        correct:
            quizState.currentQuestion.a,


        userAnswer:
            ans,


        isCorrect:
            ok,


        unit:
            quizState.currentQuestion.unit,


        type:
            quizState.currentQuestion.type,


        // 🌸 バグ修正：復習モードで getAnswerType() に渡す時、
        // 学年（grade）が無いと「中1」などの学年別のキーボード
        // 判定ができず、間違ったテンキーが出てしまう。
        // 復習でも正しいテンキーを選べるよう、学年も記録しておく。
        grade:
            quizState.currentQuestion.grade,


        inputType:
            quizState.currentQuestion.inputType,


        memo:
            quizState.currentQuestion.memo


    };


    console.log(
        "🌸 record =",
        record
    );



    if (!ok) {

        wrongList.push(record);

    }




    // =========================
    // 🌸 Weak Engine
    // =========================


    updateWeakData(ok);




    // =========================
    // 🌸 Engine20
    // =========================


    finishStudyQuestion();


    saveTodayStudyRecord();




    // =========================
    // 🌸 スコア表示
    // =========================


    document.getElementById(
        "scoreText"
    ).textContent =

        `スコア: ${score}`;




    // =========================
    // 🌸 SDS
    // 回答後 → 次問題状態
    // =========================


    mathKeypadAction =
        "next";



    const okBtn =
        document.getElementById(
            "mathOKBtn"
        );


    if (okBtn) {


        okBtn.textContent =
            "➡ 次の問題";


    }


}

function nextQuestion() {
    showQuestion();
}


function showResult() {

    // 🌸 Phase15-3-3 結果画面リセット
    const resultArea = document.getElementById("resultArea");

    resultArea.innerHTML = "";

    document.getElementById("feedback").innerHTML =
        `🌸 終了！<br>
         スコア：${score}点<br>
         おつかれさまでした！`;

    console.log("📊 結果:", score);
    console.log("📉 wrongList =", wrongList);

    document.getElementById("quizArea").style.display = "none";

    resultArea.style.display = "block";

    resultArea.innerHTML = `
    <h2>🌸 おつかれさまでした！</h2>

    ${challengeCourse ? `<p><strong>🏆 コース：${challengeCourse}</strong></p>` : ""}

    <p><strong>スコア：${score}点</strong></p>
`;

    if (wrongList.length > 0) {

        resultArea.innerHTML += "<h3>📉 間違えた問題</h3>";

        wrongList.forEach(item => {

            resultArea.innerHTML += `
                <div class="resultCard">
                    <p><strong>問題：</strong>${item.question}</p>
                    <p>✍ あなたの答え：${item.userAnswer}</p>
                    <p>✅ 正解：${item.correct}</p>
                </div>
                <hr>
            `;

        });

    } else {

        resultArea.innerHTML += `
            <p>🎉 全問正解です！</p>
        `;

    }

    resultArea.innerHTML += `

        <button onclick="startReview()">
            📚 復習する
        </button>

        <button onclick="backToGrade()">
            🎓 学年選択へ戻る
        </button>

        <button onclick="backToHome()">
            🏠 ホームへ戻る
        </button>

    `;

    // 🌸 満点演出
    const perfectScore = challengeCourse ? challengeCount : 10;

    if (score === perfectScore) {

        resultArea.innerHTML += `
            <div class="perfect-score">
                🏆 満点おめでとう！🌸
            </div>
        `;

    }

}

function backToGrade() {

    clearScreens();   // 🌸 まず全部閉じる

    showScreen("grade");

    document.getElementById("feedback").textContent = "";
    document.getElementById("answerInput").value = "";

    wrongList = [];
}
// =========================
// 🏠 ホームへ戻る
// =========================
function backToHome() {

    // 入力欄などをリセット
    document.getElementById("feedback").textContent = "";
    document.getElementById("answerInput").value = "";

    wrongList = [];

    // 全画面を閉じる
    clearScreens();

    // ホーム画面を表示
    document.getElementById("homeScreen").style.display = "block";

}


/* =========================
   初期UIリセット
========================= */

function initUI() {

    const fb = document.getElementById("feedback");
    if (fb) fb.textContent = "";

    const scoreText = document.getElementById("scoreText");
    if (scoreText) scoreText.textContent = "スコア: 0";

    const input = document.getElementById("answerInput");
    if (input) input.value = "";
}

/* =========================
   起動時統合初期化（v7統合）
========================= */

window.addEventListener("load", function () {

    console.log(`${APP_NAME} ${APP_VERSION} 初期化開始`);

    loadUsers();
    renderUserList();

    initUI();

    // 🌸 筆算パネル：フォーカスされた入力欄を記録
    // （回答欄／筆算の答えマスのどちらにテンキーの数字を書き込むか）
    // 筆算の答えマスは問題ごとに動的に作られるため、それぞれの
    // フォーカスリスナーは wireHissanAnswerBoxes() 側で登録する。
    const mathAnswerInputEl =
        document.getElementById("answerInput");

    if (mathAnswerInputEl) {
        mathAnswerInputEl.addEventListener("focus", () => {
            mathKeypadFocusedEl = null;
        });
    }

console.log(`${APP_NAME} ${APP_VERSION} 起動完了`);

});

/* =========================
   安全フォールバック
========================= */

if (typeof setGrade !== "function") {
    console.warn("setGrade未定義（v6互換）");
}

if (typeof generateQuestion !== "function") {
    console.warn("generateQuestion未定義（v6互換）");
}

/////////////////////////////////////////////////////
// 🌸 v7 UX改善：アイコン選択UI
/////////////////////////////////////////////////////

let selectedIcon = "😊";

function showAddUserUI() {

    const area = document.getElementById("userListArea");

    const ui = document.createElement("div");
    ui.innerHTML = `
        <div class="addUserBox">
            <input id="newUserName" placeholder="名前を入力" />

            <div class="iconSelect">
                <button onclick="selectedIcon='👧'">👧</button>
                <button onclick="selectedIcon='👦'">👦</button>
                <button onclick="selectedIcon='⭐'">⭐</button>
                <button onclick="selectedIcon='😊'">😊</button>
            </div>

            <button onclick="addUserFromUI()">追加</button>
        </div>
    `;

    area.appendChild(ui);
}

function addUserFromUI() {

    const name = document.getElementById("newUserName").value;

    if (!name) return;

    users.push({
        name: name,
        grade: "grade4",
        icon: selectedIcon
    });

    saveUsers();
    renderUserList();
}

function generateQuestion(unit) {

    const grade = currentUser?.grade || "grade4";

    switch (grade) {

        case "grade2":
            return generateGrade2Question();

        case "grade4":
            return generateGrade4Question();

        default:
            return generateGrade4Question();
    }
}

// ========================
// 🌸 小学2年生
// ========================
function generateGrade2Question() {

    const type = Math.floor(Math.random() * 2);

    if (type === 0) {

        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;

        return {
            q: `${a} + ${b} = ?`,
            a: a + b
        };

    } else {

        let a = Math.floor(Math.random() * 20) + 1;
        let b = Math.floor(Math.random() * 20) + 1;

        if (a < b) [a, b] = [b, a];

        return {
            q: `${a} - ${b} = ?`,
            a: a - b
        };
    }
}


// ========================
// 🌸 小学4年生
// ========================
function generateGrade4Question() {

    const type = Math.floor(Math.random() * 3);

    // 3桁どうしの足し算
    if (type === 0) {

        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 900) + 100;

        return {
            q: `${a} + ${b} = ?`,
            a: a + b
        };
    }

    // 3桁どうしの引き算
    if (type === 1) {

        let a = Math.floor(Math.random() * 900) + 100;
        let b = Math.floor(Math.random() * 900) + 100;

        if (a < b) [a, b] = [b, a];

        return {
            q: `${a} - ${b} = ?`,
            a: a - b
        };
    }

    // 2桁×1桁
    const a = Math.floor(Math.random() * 90) + 10;
    const b = Math.floor(Math.random() * 8) + 2;

    return {
        q: `${a} × ${b} = ?`,
        a: a * b
    };
}




/////////////////////////////////////////////////////
// 🌸 Final：ログ表示UI
/////////////////////////////////////////////////////

function showLog() {

    const logs = JSON.parse(localStorage.getItem("log") || "[]");

    let html = "<h2>📊 学習ログ</h2>";

    if (logs.length === 0) {
        html += "<p>まだログがありません</p>";
    } else {

        logs.slice(-20).reverse().forEach(l => {

            html += `
                <div style="
                    margin:10px;
                    padding:10px;
                    border-radius:10px;
                    background:white;
                    box-shadow:0 2px 6px rgba(0,0,0,0.1);
                ">
                    <div>👤 ${l.user}</div>
                    <div>❓ ${l.question}</div>
                    <div>✏ あなた: ${l.yourAnswer}</div>
                    <div>🎯 正解: ${l.correctAnswer}</div>
                    <div>${l.result ? "🌸 正解" : "❌ 不正解"}</div>
                </div>
            `;
        });
    }

    const area = document.getElementById("resultArea");
    area.style.display = "block";
    area.innerHTML = html;
}

const screens = [

"homeScreen",
"gradeArea",
"subjectArea",
"subjectArea2",

"challengeHomeArea",
"challengeCourseArea",

"socialArea",
"socialHome",
"socialGradeArea",

"prefectureChallengeArea",
"regionChallengeArea",
"nationArea",
"japanChallengeArea",

"exploreQuizArea",
"exploreResult",

"quizArea",
"resultArea",
"socialQuizArea",
"socialResultArea",

"weakHistoryArea",
"japanFinishArea",

"adminArea"      // 🌸 これを追加

];

/////////////////////////////////////////////////////
// 🌸 SDS 共通シャッフル
/////////////////////////////////////////////////////

function shuffleArray(array){

    const result = [...array];

    for(let i = result.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];

    }

    return result;

}

/////////////////////////////////////////////////////
// 🌸 Engine02 Math Database
// 小学1～6年 ＋ 中学1年
/////////////////////////////////////////////////////

function getMathDatabase() {

    if (!currentUser) {
        return [];
    }

    switch (currentUser.grade) {

        case "grade1":
            return grade1Questions;

        case "grade2":
            return grade2Questions;

        case "grade3":
            return grade3Questions;

        case "grade4":
            return grade4Questions;

        case "grade5":
            return grade5Questions;

        case "grade6":
            return grade6Questions;

        // 🌸 中学1年
        case "grade7":
            return chu1MathQuestions;

        default:
            return [];
    }

}

// ===================================
// 🌸 国語データベース取得（全学年対応）
// 学年ごとの grade{N}KokugoQuestions を返す
// ===================================

function getKokugoDatabase() {

    if (!currentUser) {
        return [];
    }

    switch (currentUser.grade) {

        case "grade1":
            return grade1KokugoQuestions;

        case "grade2":
            return grade2KokugoQuestions;

        case "grade3":
            return grade3KokugoQuestions;

        case "grade4":
            return grade4KokugoQuestions;

        case "grade5":
            return grade5KokugoQuestions;

        case "grade6":
            return grade6KokugoQuestions;

        default:
            // 🌸 中学1年など、国語データが未対応の学年
            return [];
    }

}

// 🌸 "grade3" → 3 のように学年の数字だけを取り出す
function getKokugoGradeNumber() {

    if (!currentUser || !currentUser.grade) {
        return null;
    }

    const match =
        currentUser.grade.match(/^grade(\d+)$/);

    if (!match) {
        return null;
    }

    const num = Number(match[1]);

    // 🌸 国語データがあるのは小学1〜6年のみ
    if (num < 1 || num > 6) {
        return null;
    }

    return num;

}

// ===================================
// 🌸 理科データベース取得（小学3〜6年・中学1年対応）
// 小学1・2年は理科データが未対応のため空配列を返す
// ===================================

function getRikaDatabase() {

    if (!currentUser) {
        return [];
    }

    switch (currentUser.grade) {

        case "grade3":
            return grade3RikaQuestions;

        case "grade4":
            return grade4RikaQuestions;

        case "grade5":
            return grade5RikaQuestions;

        case "grade6":
            return grade6RikaQuestions;

        // 🌸 中学1年（既存データを活用）
        case "grade7":
            return chu1RikaQuestions;

        default:
            // 🌸 小学1・2年など、理科データが未対応の学年
            return [];
    }

}

// 🌸 理科のボタン表示用：「小学N年」「中学1年」のラベルを返す
function getRikaGradeLabel() {

    if (!currentUser || !currentUser.grade) {
        return null;
    }

    switch (currentUser.grade) {

        case "grade3":
            return "小学3年";

        case "grade4":
            return "小学4年";

        case "grade5":
            return "小学5年";

        case "grade6":
            return "小学6年";

        case "grade7":
            return "中学1年";

        default:
            return null;
    }

}

/////////////////////////////////////////////////////
// 🌸 理科 開始（小学3〜6年・中学1年）
// 学年別データから10問ランダム出題
/////////////////////////////////////////////////////

function startSelectedRika() {

    console.log(
        "🌸 理科開始:",
        currentUser && currentUser.grade
    );

    const rikaDatabase =
        getRikaDatabase();

    if (
        !rikaDatabase ||
        rikaDatabase.length === 0
    ) {

        console.log(
            "🌸 この学年の理科データはまだありません"
        );

        return;
    }

    // =========================================
    // 🌸 10問ランダム出題
    // =========================================

    currentRikaQuiz =
        shuffleArray(
            [...rikaDatabase]
        ).slice(0, 10);

    console.log(
        "🌸 理科10問シャッフル完了:",
        currentRikaQuiz
    );

    // =========================================
    // 🌸 理科状態リセット
    // =========================================

    rikaIndex = 0;
    rikaScore = 0;
    currentRikaQuestion = null;
    rikaAnswered = false;
    rikaWrongList = [];

    // =========================================
    // 🌸 理科モード開始（他教科モードは解除）
    // =========================================

    kokugoMode = false;
    reviewMode = false;
    rikaMode = true;
    englishMode = false;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    document.getElementById(
        "quizArea"
    ).style.display =
        "block";

    document.getElementById(
        "resultArea"
    ).style.display =
        "none";

    // =========================================
    // 🌸 算数テンキー非表示
    // =========================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );

    if (keypad) {

        keypad.style.display =
            "none";
    }

    hideHissanScratchPad();

    // =========================================
    // 🌸 理科・こたえるボタンを表示
    // =========================================

    const rikaControls =
        document.getElementById(
            "rikaControls"
        );

    if (rikaControls) {

        // 🌸 バグ修正：ここで display:block を指定すると
        // インラインスタイルがCSSの display:flex を
        // 上書きしてしまい、ボタンが横並びにならない
        rikaControls.style.display =
            "flex";
    }

    // =========================================
    // 🌸 スコア初期化
    // =========================================

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showRikaQuestion();

}

/////////////////////////////////////////////////////
// 🌸 理科・問題表示
/////////////////////////////////////////////////////

function showRikaQuestion() {

    rikaAnswered = false;

    if (
        rikaIndex >=
        currentRikaQuiz.length
    ) {

        showRikaResult();

        return;
    }

    currentRikaQuestion =
        currentRikaQuiz[rikaIndex];

    console.log(
        "🌸 理科問題表示:",
        currentRikaQuestion
    );

    questionText.innerHTML =
        `<div class="questionCounter">第${rikaIndex + 1}問 / ${currentRikaQuiz.length}</div>` +
        `<div class="questionBody">${currentRikaQuestion.q}</div>`;

    answerInput.value = "";
    answerInput.style.display = "block";
    answerInput.readOnly = false;
    answerInput.disabled = false;

    // 🌸 英語モードのヒント（IME案内）が残らないようにリセット
    answerInput.removeAttribute("lang");
    answerInput.setAttribute("inputmode", "text");
    answerInput.placeholder = "";

    feedback.textContent = "";

    // 🌸 理科は共通の「次の問題」ボタンを使わず、
    // 「こたえる」ボタン自体を回答後に「次の問題」ボタンへ
    // 切り替えるので、共通ボタンは常に隠しておく
    nextBtn.style.display = "none";

    // =========================================
    // 🌸 「こたえる」「けす」ボタンを毎回リセット
    // =========================================

    const rikaAnswerBtn =
        document.getElementById("rikaAnswerBtn");

    if (rikaAnswerBtn) {

        rikaAnswerBtn.textContent =
            "⭕ こたえる";

        rikaAnswerBtn.onclick =
            submitRikaAnswer;

        rikaAnswerBtn.disabled =
            false;
    }

    const rikaClearBtn =
        document.getElementById("rikaClearBtn");

    if (rikaClearBtn) {

        rikaClearBtn.style.display =
            "inline-block";

        rikaClearBtn.disabled =
            false;
    }

    startStudyTimer();

    // 🌸 出題したらカーソルを自動で入力欄に移動する
    answerInput.focus();

}

/////////////////////////////////////////////////////
// 🌸 理科・入力をけす
/////////////////////////////////////////////////////

function clearRikaAnswer() {

    if (rikaAnswered) {
        return;
    }

    answerInput.value = "";

    answerInput.focus();

}

/////////////////////////////////////////////////////
// 🌸 理科・回答判定
/////////////////////////////////////////////////////

function submitRikaAnswer() {

    // 🌸 すでに回答済みなら何もしない
    if (rikaAnswered) {
        return;
    }

    const raw =
        answerInput.value.trim();

    if (raw === "") {

        feedback.textContent =
            "⚠ 答えを入力してください。";

        return;
    }

    // 🌸 この問題は回答済み
    rikaAnswered = true;

    const userAnswer =
        raw;

    const correctAnswer =
        String(
            currentRikaQuestion.a
        ).trim();

    const correctAnswers =
        currentRikaQuestion.answers ||
        [correctAnswer];

    // 🌸 理科・単元別記録
    const rikaUnit =
        currentRikaQuestion.unit;

    if (!studyRecord.rika.units) {
        studyRecord.rika.units = {};
    }

    if (rikaUnit) {

        if (!studyRecord.rika.units[rikaUnit]) {

            studyRecord.rika.units[rikaUnit] = {
                answered: 0,
                correct: 0
            };
        }

        studyRecord.rika.units[rikaUnit].answered++;
    }

    studyRecord.rika.answered++;

    answerInput.disabled = true;

    // 🌸 完全一致、または揺らぎ判定（的を得ていれば正解）
    if (
        correctAnswers.includes(userAnswer) ||
        correctAnswers.some(
            a => isFuzzyTextMatch(userAnswer, a)
        )
    ) {

        rikaScore++;

        studyRecord.rika.correct++;

        if (rikaUnit && studyRecord.rika.units[rikaUnit]) {
            studyRecord.rika.units[rikaUnit].correct++;
        }

        feedback.innerHTML = `
            <h3>⭕ 正解！</h3>
            <p>📖 <strong>解説</strong></p>
            <p>${currentRikaQuestion.memo || ""}</p>
        `;

        playSound("correct");
        addPoint(10);
        showSakura();

    } else {

        rikaWrongList.push({
            question: currentRikaQuestion.q,
            correct: correctAnswer,
            userAnswer: userAnswer,
            unit: currentRikaQuestion.unit,
            type: currentRikaQuestion.type,
            memo: currentRikaQuestion.memo
        });

        feedback.innerHTML = `
            <h3>❌ 不正解</h3>
            <p>正解は <strong>${correctAnswer}</strong> です。</p>
            <p>📖 <strong>解説</strong></p>
            <p>${currentRikaQuestion.memo || ""}</p>
        `;

        playSound("wrong");
    }

    // =========================================
    // 🌸 「こたえる」ボタンを「次の問題」ボタンに切り替える
    // （共通の #nextBtn は理科では使わない）
    // =========================================

    const rikaAnswerBtn =
        document.getElementById("rikaAnswerBtn");

    if (rikaAnswerBtn) {

        rikaAnswerBtn.textContent =
            "➡ 次の問題";

        rikaAnswerBtn.onclick = function () {

            rikaIndex++;

            answerInput.disabled = false;

            showRikaQuestion();

        };
    }

    // 🌸 回答済みなので「けす」ボタンは隠す
    const rikaClearBtn =
        document.getElementById("rikaClearBtn");

    if (rikaClearBtn) {

        rikaClearBtn.style.display =
            "none";
    }

    // 🌸 理科1問分の学習時間を確定
    finishStudyQuestion("rika");

    // 🌸 今日の学習記録を自動保存
    saveTodayStudyRecord();

}

/////////////////////////////////////////////////////
// 🌸 理科・結果画面
/////////////////////////////////////////////////////

function showRikaResult() {

    console.log(
        "🌸 理科結果:",
        rikaScore
    );

    rikaMode = false;

    const rikaControls =
        document.getElementById(
            "rikaControls"
        );

    if (rikaControls) {

        rikaControls.style.display =
            "none";
    }

    const quizAreaEl =
        document.getElementById(
            "quizArea"
        );

    if (quizAreaEl) {

        quizAreaEl.style.display =
            "none";
    }

    const resultArea =
        document.getElementById(
            "resultArea"
        );

    if (!resultArea) {

        console.error(
            "❌ resultArea が見つかりません"
        );

        return;
    }

    resultArea.innerHTML = "";

    resultArea.style.display =
        "block";

    resultArea.innerHTML = `
        <h2>🌸 理科10問終了！</h2>
        <p><strong>スコア：${rikaScore}点</strong></p>
    `;

    if (rikaWrongList.length > 0) {

        resultArea.innerHTML += `
            <h3>📉 間違えた問題</h3>
        `;

        rikaWrongList.forEach(
            item => {

                resultArea.innerHTML += `
                    <div class="resultCard">
                        <p><strong>問題：</strong>${item.question}</p>
                        <p>✍ あなたの答え：${item.userAnswer}</p>
                        <p>✅ 正解：${item.correct}</p>
                    </div>
                    <hr>
                `;
            }
        );

    } else {

        resultArea.innerHTML += `
            <p>🎉 全問正解です！</p>
        `;
    }

    resultArea.innerHTML += `
        <button onclick="startSelectedRika()">🔁 もう一度</button>
        <button onclick="backToGrade()">🎓 学年選択へ戻る</button>
        <button onclick="backToHome()">🏠 ホームへ戻る</button>
    `;

    console.log(
        "🌸 理科結果画面表示完了"
    );

}

/////////////////////////////////////////////////////
// 🌸 英語（小学3〜6年・中学1年）
/////////////////////////////////////////////////////

function getEnglishDatabase() {

    if (!currentUser) {
        return [];
    }

    switch (currentUser.grade) {

        // 🌸 小3・小4は同じデータを共有
        case "grade3":
        case "grade4":
            return grade34EigoQuestions;

        case "grade5":
            return grade5EigoQuestions;

        case "grade6":
            return grade6EigoQuestions;

        // 🌸 中学1年（既存データを活用）
        case "grade7":
            return chu1EigoQuestions;

        default:
            // 🌸 小学1・2年など、英語データが未対応の学年
            return [];
    }

}

// 🌸 英語のボタン表示用：「小学N年」「中学1年」のラベルを返す
function getEnglishGradeLabel() {

    if (!currentUser || !currentUser.grade) {
        return null;
    }

    switch (currentUser.grade) {

        case "grade3":
            return "小学3年";

        case "grade4":
            return "小学4年";

        case "grade5":
            return "小学5年";

        case "grade6":
            return "小学6年";

        case "grade7":
            return "中学1年";

        default:
            return null;
    }

}

/////////////////////////////////////////////////////
// 🌸 英語 開始（小学3〜6年・中学1年）
// 学年別データから10問ランダム出題
/////////////////////////////////////////////////////

function startSelectedEnglish() {

    console.log(
        "🌸 英語開始:",
        currentUser && currentUser.grade
    );

    const englishDatabase =
        getEnglishDatabase();

    if (
        !englishDatabase ||
        englishDatabase.length === 0
    ) {

        console.log(
            "🌸 この学年の英語データはまだありません"
        );

        return;
    }

    // =========================================
    // 🌸 10問ランダム出題
    // =========================================

    currentEnglishQuiz =
        shuffleArray(
            [...englishDatabase]
        ).slice(0, 10);

    console.log(
        "🌸 英語10問シャッフル完了:",
        currentEnglishQuiz
    );

    // =========================================
    // 🌸 英語状態リセット
    // =========================================

    englishIndex = 0;
    englishScore = 0;
    currentEnglishQuestion = null;
    englishAnswered = false;
    englishWrongList = [];

    // =========================================
    // 🌸 英語モード開始（他教科モードは解除）
    // =========================================

    kokugoMode = false;
    reviewMode = false;
    rikaMode = false;
    englishMode = true;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    document.getElementById(
        "quizArea"
    ).style.display =
        "block";

    document.getElementById(
        "resultArea"
    ).style.display =
        "none";

    // =========================================
    // 🌸 算数テンキー非表示
    // =========================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );

    if (keypad) {

        keypad.style.display =
            "none";
    }

    hideHissanScratchPad();

    // =========================================
    // 🌸 英語・こたえるボタンを表示
    // =========================================

    const englishControls =
        document.getElementById(
            "englishControls"
        );

    if (englishControls) {

        // 🌸 バグ修正：ここで display:block を指定すると
        // インラインスタイルがCSSの display:flex を
        // 上書きしてしまい、ボタンが横並びにならない
        englishControls.style.display =
            "flex";
    }

    // =========================================
    // 🌸 スコア初期化
    // =========================================

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showEnglishQuestion();

}

/////////////////////////////////////////////////////
// 🌸 英語・問題表示
/////////////////////////////////////////////////////

function showEnglishQuestion() {

    englishAnswered = false;

    if (
        englishIndex >=
        currentEnglishQuiz.length
    ) {

        // 🌸 復習モードでは専用の結果画面を表示する
        if (englishReviewMode) {

            showEnglishReviewResult();

        } else {

            showEnglishResult();

        }

        return;
    }

    currentEnglishQuestion =
        currentEnglishQuiz[englishIndex];

    console.log(
        "🌸 英語問題表示:",
        currentEnglishQuestion
    );

    questionText.innerHTML =
        `<div class="questionCounter">第${englishIndex + 1}問 / ${currentEnglishQuiz.length}</div>` +
        `<div class="questionBody">${currentEnglishQuestion.q}</div>`;

    answerInput.value = "";
    answerInput.style.display = "block";
    answerInput.readOnly = false;
    answerInput.disabled = false;

    // 🌸 英語はスマホ等での自動大文字化・自動補正を止めておく
    // （小文字/大文字を答えさせる問題があるため）
    answerInput.setAttribute("autocapitalize", "none");
    answerInput.setAttribute("autocomplete", "off");
    answerInput.setAttribute("autocorrect", "off");
    answerInput.setAttribute("spellcheck", "false");

    // 🌸 バグ修正：日本語IME（ひらがな入力）がオンのままだと
    // 英単語が正しく入力できないため、ブラウザに「英語の入力欄」
    // であることを伝えるヒントを設定する。
    // ※ ime-mode はChromium系ブラウザでは廃止されており、
    // 　 Webページ側からOSのIMEを強制的にオフへ切り替える
    // 　 標準的な方法は現在は存在しないため、ヒント属性と
    // 　 画面上の案内で半角英数字入力をうながす。
    answerInput.setAttribute("lang", "en");
    answerInput.setAttribute("inputmode", "text");
    answerInput.placeholder =
        "💡 半角英数字（ABC）で入力してね";

    feedback.textContent = "";

    // 🌸 英語は共通の「次の問題」ボタンを使わず、
    // 「こたえる」ボタン自体を回答後に「次の問題」ボタンへ
    // 切り替えるので、共通ボタンは常に隠しておく
    nextBtn.style.display = "none";

    // =========================================
    // 🌸 「こたえる」「けす」ボタンを毎回リセット
    // =========================================

    const englishAnswerBtn =
        document.getElementById("englishAnswerBtn");

    if (englishAnswerBtn) {

        englishAnswerBtn.textContent =
            "⭕ こたえる";

        englishAnswerBtn.onclick =
            submitEnglishAnswer;

        englishAnswerBtn.disabled =
            false;
    }

    const englishClearBtn =
        document.getElementById("englishClearBtn");

    if (englishClearBtn) {

        englishClearBtn.style.display =
            "inline-block";

        englishClearBtn.disabled =
            false;
    }

    startStudyTimer();

    // 🌸 出題したらカーソルを自動で入力欄に移動する
    answerInput.focus();

}

/////////////////////////////////////////////////////
// 🌸 英語・入力をけす
/////////////////////////////////////////////////////

function clearEnglishAnswer() {

    if (englishAnswered) {
        return;
    }

    answerInput.value = "";

    answerInput.focus();

}

/////////////////////////////////////////////////////
// 🌸 英語・答え合わせ（大文字小文字・末尾記号のゆれを許容）
//
// 英単語・英文は基本的に大文字小文字を区別しないが、
// 「Aの小文字は？」のような1文字のアルファベット問題は
// 大文字・小文字の違いそのものが問われているため区別する。
// 正解に日本語（読み替え・文法用語など）が含まれる問題は
// 既存の揺らぎ判定（isFuzzyTextMatch）にまかせる。
/////////////////////////////////////////////////////

// 🌸 日本語IMEがオンのまま入力してしまい、全角英数字・全角記号に
// なってしまった場合の救済（全角！〜全角～ → 半角に変換）
function toHalfWidthAscii(text) {

    return String(text)
        .replace(
            /[！-～]/g,
            ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
        )
        .replace(/　/g, " ");

}

function normalizeEnglishAnswer(text) {

    return toHalfWidthAscii(text)
        .trim()
        // 🌸 カーブクォートをまっすぐなアポストロフィに統一
        .replace(/[’‘]/g, "'")
        // 🌸 連続する空白を1つに
        .replace(/\s+/g, " ")
        // 🌸 文末の記号を除去
        .replace(/[。.,！!？?]+$/g, "")
        .toLowerCase();

}

function isEnglishAnswerMatch(userAnswer, correctAnswer) {

    // 🌸 「（すな）」のような括弧つきの別解も候補に含める
    let variants =
        extractAnswerVariants(correctAnswer);

    // 🌸 「Do you like ~?」のように、文末に「〜」（穴埋めの記号）が
    // ついている問題は、「〜」を省いた文の形だけでも正解として扱う。
    // （文の組み立て方が分かっているかを見る問題なので、
    // 　記号の「〜」自体を書けるかどうかは問わない）
    const withoutTrailingTilde =
        variants
            .map(v =>
                String(v).replace(
                    /[\s　]*~[\s　]*[.!?？！。]?[\s　]*$/,
                    ""
                )
            )
            .filter(v => v.trim() !== "");

    variants = variants.concat(withoutTrailingTilde);

    return variants.some(variant => {

        const v = String(variant).trim();

        // 🌸 1文字のアルファベット（大文字/小文字を問う問題）は
        // 完全に同じ大文字・小文字でなければ正解にしない
        // （全角で入力されてしまった場合だけは救済する）
        if (/^[a-zA-Z]$/.test(v)) {

            return toHalfWidthAscii(userAnswer).trim() === v;

        }

        // 🌸 正解に日本語が含まれる場合（読み替え・文法用語など）は
        // 既存の日本語の揺らぎ判定を使う
        if (/[ぁ-んァ-ヶ一-龠]/.test(v)) {

            return (
                normalizeForFuzzyMatch(userAnswer) ===
                    normalizeForFuzzyMatch(v) ||
                isFuzzyTextMatch(userAnswer, v)
            );

        }

        // 🌸 英単語・英文：大文字小文字と文末記号のゆれを許容
        return (
            normalizeEnglishAnswer(userAnswer) ===
            normalizeEnglishAnswer(v)
        );

    });

}

/////////////////////////////////////////////////////
// 🌸 英語・回答判定
/////////////////////////////////////////////////////

function submitEnglishAnswer() {

    // 🌸 すでに回答済みなら何もしない
    if (englishAnswered) {
        return;
    }

    const raw =
        answerInput.value.trim();

    if (raw === "") {

        feedback.textContent =
            "⚠ 答えを入力してください。";

        return;
    }

    // 🌸 この問題は回答済み
    englishAnswered = true;

    const userAnswer =
        raw;

    const correctAnswer =
        String(
            currentEnglishQuestion.a
        ).trim();

    // 🌸 バグ修正：復習モード（間違えた単語だけを出題）では
    // 1問目の時にすでに学習記録は付いているので、ここでは
    // 二重に記録しない。スコアも本編とは別の englishReviewScore で数える。
    if (!englishReviewMode) {

        // 🌸 英語・単元別記録
        const englishUnit =
            currentEnglishQuestion.unit;

        if (!studyRecord.english.units) {
            studyRecord.english.units = {};
        }

        if (englishUnit) {

            if (!studyRecord.english.units[englishUnit]) {

                studyRecord.english.units[englishUnit] = {
                    answered: 0,
                    correct: 0
                };
            }

            studyRecord.english.units[englishUnit].answered++;
        }

        studyRecord.english.answered++;
    }

    answerInput.disabled = true;

    // 🌸 大文字小文字・末尾記号のゆれ、括弧内の別解を許容して判定
    if (
        isEnglishAnswerMatch(
            userAnswer,
            currentEnglishQuestion.a
        )
    ) {

        feedback.innerHTML = `
            <h3>⭕ 正解！</h3>
            <p>📖 <strong>解説</strong></p>
            <p>${currentEnglishQuestion.memo || ""}</p>
        `;

        playSound("correct");

        if (englishReviewMode) {

            // 🌸 復習で正解できた単語は、もう苦手リストに残さない
            englishReviewScore++;

            englishWrongList = englishWrongList.filter(
                item => item.question !== currentEnglishQuestion.q
            );

        } else {

            englishScore++;

            studyRecord.english.correct++;

            const englishUnit =
                currentEnglishQuestion.unit;

            if (englishUnit && studyRecord.english.units[englishUnit]) {
                studyRecord.english.units[englishUnit].correct++;
            }

            addPoint(10);
            showSakura();

        }

    } else {

        feedback.innerHTML = `
            <h3>❌ 不正解</h3>
            <p>正解は <strong>${correctAnswer}</strong> です。</p>
            <p>📖 <strong>解説</strong></p>
            <p>${currentEnglishQuestion.memo || ""}</p>
        `;

        playSound("wrong");

        // 🌸 復習中にまた間違えた単語は、すでに englishWrongList に
        // 入っているので重複して追加しない
        if (!englishReviewMode) {

            englishWrongList.push({
                question: currentEnglishQuestion.q,
                correct: correctAnswer,
                userAnswer: userAnswer,
                unit: currentEnglishQuestion.unit,
                type: currentEnglishQuestion.type,
                memo: currentEnglishQuestion.memo
            });

        }
    }

    // =========================================
    // 🌸 「こたえる」ボタンを「次の問題」ボタンに切り替える
    // （共通の #nextBtn は英語では使わない）
    // =========================================

    const englishAnswerBtn =
        document.getElementById("englishAnswerBtn");

    if (englishAnswerBtn) {

        englishAnswerBtn.textContent =
            "➡ 次の問題";

        englishAnswerBtn.onclick = function () {

            englishIndex++;

            answerInput.disabled = false;

            showEnglishQuestion();

        };
    }

    // 🌸 回答済みなので「けす」ボタンは隠す
    const englishClearBtn =
        document.getElementById("englishClearBtn");

    if (englishClearBtn) {

        englishClearBtn.style.display =
            "none";
    }

    if (!englishReviewMode) {

        // 🌸 英語1問分の学習時間を確定
        finishStudyQuestion("english");

        // 🌸 今日の学習記録を自動保存
        saveTodayStudyRecord();

    }

}

/////////////////////////////////////////////////////
// 🌸 英語・結果画面
/////////////////////////////////////////////////////

function showEnglishResult() {

    console.log(
        "🌸 英語結果:",
        englishScore
    );

    englishMode = false;

    const englishControls =
        document.getElementById(
            "englishControls"
        );

    if (englishControls) {

        englishControls.style.display =
            "none";
    }

    const quizAreaEl =
        document.getElementById(
            "quizArea"
        );

    if (quizAreaEl) {

        quizAreaEl.style.display =
            "none";
    }

    const resultArea =
        document.getElementById(
            "resultArea"
        );

    if (!resultArea) {

        console.error(
            "❌ resultArea が見つかりません"
        );

        return;
    }

    resultArea.innerHTML = "";

    resultArea.style.display =
        "block";

    resultArea.innerHTML = `
        <h2>🌸 英語10問終了！</h2>
        <p><strong>スコア：${englishScore}点</strong></p>
    `;

    if (englishWrongList.length > 0) {

        resultArea.innerHTML += `
            <h3>📉 間違えた問題</h3>
        `;

        englishWrongList.forEach(
            item => {

                resultArea.innerHTML += `
                    <div class="resultCard">
                        <p><strong>問題：</strong>${item.question}</p>
                        <p>✍ あなたの答え：${item.userAnswer}</p>
                        <p>✅ 正解：${item.correct}</p>
                    </div>
                    <hr>
                `;
            }
        );

        // 🌸 間違えた単語だけをもう一度出題する復習ボタン
        resultArea.innerHTML += `
            <button onclick="startEnglishReview()">📚 英語を復習する</button>
        `;

    } else {

        resultArea.innerHTML += `
            <p>🎉 全問正解です！</p>
        `;
    }

    resultArea.innerHTML += `
        <button onclick="startSelectedEnglish()">🔁 もう一度</button>
        <button onclick="backToGrade()">🎓 学年選択へ戻る</button>
        <button onclick="backToHome()">🏠 ホームへ戻る</button>
    `;

    console.log(
        "🌸 英語結果画面表示完了"
    );

}

/////////////////////////////////////////////////////
// 🌸 英語・間違えた単語の復習
/////////////////////////////////////////////////////

function startEnglishReview() {

    if (englishWrongList.length === 0) {

        alert("🌸 復習する問題はありません！");

        return;
    }

    // 🌸 間違えた単語だけを出題リストにする
    // （englishWrongList の形 {question, correct, ...} を
    // 　通常の出題データの形 {q, a, ...} に変換する）
    currentEnglishQuiz =
        englishWrongList.map(item => ({
            q: item.question,
            a: item.correct,
            unit: item.unit,
            type: item.type,
            memo: item.memo
        }));

    englishIndex = 0;
    englishReviewScore = 0;
    currentEnglishQuestion = null;
    englishAnswered = false;

    // =========================================
    // 🌸 復習モード開始（他教科モードは解除）
    // =========================================

    kokugoMode = false;
    reviewMode = false;
    rikaMode = false;
    englishMode = true;
    englishReviewMode = true;

    // =========================================
    // 🌸 画面整理
    // =========================================

    clearScreens();

    document.getElementById(
        "quizArea"
    ).style.display =
        "block";

    document.getElementById(
        "resultArea"
    ).style.display =
        "none";

    const englishControls =
        document.getElementById(
            "englishControls"
        );

    if (englishControls) {

        englishControls.style.display =
            "flex";
    }

    feedback.textContent =
        "";

    nextBtn.style.display =
        "none";

    document.getElementById(
        "scoreText"
    ).textContent =
        "スコア: 0";

    // =========================================
    // 🌸 1問目表示
    // =========================================

    showEnglishQuestion();

}

function showEnglishReviewResult() {

    console.log(
        "🌸 英語復習結果:",
        englishReviewScore
    );

    englishMode = false;
    englishReviewMode = false;

    const englishControls =
        document.getElementById(
            "englishControls"
        );

    if (englishControls) {

        englishControls.style.display =
            "none";
    }

    const quizAreaEl =
        document.getElementById(
            "quizArea"
        );

    if (quizAreaEl) {

        quizAreaEl.style.display =
            "none";
    }

    const resultArea =
        document.getElementById(
            "resultArea"
        );

    if (!resultArea) {

        console.error(
            "❌ resultArea が見つかりません"
        );

        return;
    }

    resultArea.innerHTML = "";

    resultArea.style.display =
        "block";

    resultArea.innerHTML = `
        <h2>🌸 英語の復習おつかれさまでした！</h2>
        <p><strong>復習結果：${englishReviewScore} / ${currentEnglishQuiz.length} 問正解</strong></p>
    `;

    if (englishWrongList.length > 0) {

        resultArea.innerHTML += `
            <h3>📉 もう一度復習しましょう</h3>
            <button onclick="startEnglishReview()">📚 残り問題を復習する</button>
        `;

    } else {

        resultArea.innerHTML += `
            <h3>🎉 苦手な単語を全部克服しました！</h3>
        `;
    }

    resultArea.innerHTML += `
        <button onclick="backToGrade()">🎓 学年選択へ戻る</button>
        <button onclick="backToHome()">🏠 ホームへ戻る</button>
    `;

    console.log(
        "🌸 英語復習結果画面表示完了"
    );

}

function setupEnterKey() {

    const input = document.getElementById("answerInput");

    if (!input) return;

    // 🌸 未回答の時：入力欄にフォーカスがある状態でEnterを押すと
    // 今まで通り「こたえる」を送信する
    input.onkeydown = function (e) {

        if (e.key !== "Enter") return;

        // 🌸 日本語IME変換確定のEnterでは送信しない
        if (e.isComposing) return;

        // 🌸 ブラウザの既定動作を止める
        e.preventDefault();

        // 🌸 バグ修正：ここで送信した直後、このEnterイベントが
        // documentまでバブリングすると、下の「次の問題」用リスナーが
        // 同じ1回のEnterで即座に反応してしまい、正解／不正解の
        // フィードバックを見る間もなく次の問題へ進んでしまう。
        // このEnterは「回答の送信」だけに使うよう、ここで止める。
        e.stopPropagation();

        if (reviewMode) {

    submitReviewAnswer();

} else if (rikaMode) {

    submitRikaAnswer();

} else if (englishMode) {

    submitEnglishAnswer();

} else if (kokugoMode) {

    submitKokugoAnswer();

} else {

    if (questionCount >= maxQuestions) return;

    submitAnswer();

}

    };

    // =========================================
    // 🌸 バグ修正：回答後は answerInput が disabled になり
    // 上のリスナーが反応しなくなるため、「次の問題」へ進む操作は
    // documentレベルのEnterで別途拾う。ボタンはそのまま残し、
    // キーボードでも進められるようにする追加の手段として扱う。
    // （理科の複雑な分岐・国語の漢字ボード・復習モードは対象外。
    // 　英語・理科・通常の算数だけを対象にする）
    // =========================================

    document.addEventListener("keydown", function (e) {

        if (e.key !== "Enter") return;

        if (e.isComposing) return;

        // 🌸 すでにボタン等にフォーカスがある時は、ブラウザ標準の
        // 「Enter＝クリック」動作に任せる（二重発火防止）
        const active = document.activeElement;

        if (
            active &&
            (active.tagName === "BUTTON" || active.tagName === "A")
        ) {
            return;
        }

        if (englishMode && englishAnswered) {

            const btn = document.getElementById("englishAnswerBtn");

            if (btn && btn.style.display !== "none" && !btn.disabled) {
                e.preventDefault();
                btn.click();
            }

        } else if (rikaMode && rikaAnswered) {

            const btn = document.getElementById("rikaAnswerBtn");

            if (btn && btn.style.display !== "none" && !btn.disabled) {
                e.preventDefault();
                btn.click();
            }

        } else if (
            !reviewMode &&
            !rikaMode &&
            !englishMode &&
            !kokugoMode &&
            mathKeypadAction === "next"
        ) {

            const okBtn = document.getElementById("mathOKBtn");

            const keypadEl = document.getElementById("mathKeypad");

            if (
                okBtn &&
                keypadEl &&
                keypadEl.style.display !== "none"
            ) {
                e.preventDefault();
                okBtn.click();
            }

        }

    });

}


function showUnitScreen() {

    const area = document.getElementById("unitArea");

    if (!area) return;

    area.style.display = "block";

    console.log("📘 単元選択へ");
}

setupEnterKey();


function updateWeakData(isCorrect) {

    if (!currentUser) return;

    let weak = JSON.parse(localStorage.getItem("weak") || "{}");

    // 🌸 バグ修正：未使用のグローバル currentQuestion ではなく
    // 実際に出題中の quizState.currentQuestion を参照する
    const key = quizState.currentQuestion?.q;

    if (!key) return;

    if (!weak[key]) {
        weak[key] = { ok: 0, ng: 0 };
    }

    if (isCorrect) {
        weak[key].ok++;
    } else {
        weak[key].ng++;
    }

    localStorage.setItem("weak", JSON.stringify(weak));
}

function saveLog(isCorrect, yourAnswer, correctAnswer) {

    if (!currentUser) return;

    const log = {
        user: currentUser.name,
        grade: currentUser.grade,
        question: currentQuestion.q,
        yourAnswer: yourAnswer,
        correctAnswer: correctAnswer,
        result: isCorrect,
        unit: currentUnit,
        time: new Date().toLocaleString()
    };

    let logs = JSON.parse(localStorage.getItem("log") || "[]");

    logs.push(log);

    localStorage.setItem("log", JSON.stringify(logs));

    updateWeakData(isCorrect); // v7.1追加（これだけ）
}

// 🌸 苦手データを一覧HTMLに変換（共通処理）
function renderWeakListHTML() {

    const weak = JSON.parse(localStorage.getItem("weak") || "{}");

    const entries = Object.entries(weak);

    if (entries.length === 0) {
        return "<p>まだデータがありません</p>";
    }

    entries.sort((a, b) => (b[1].ng - a[1].ng));

    return entries.map(([q, data]) => `
        <div style="margin:10px;padding:10px;border-radius:10px;background:#fff3f3;">
            <div>❓ ${q}</div>
            <div>⭕ 正解: ${data.ok}</div>
            <div>❌ ミス: ${data.ng}</div>
        </div>
    `).join("");
}

// 🌸 学年画面「📉 苦手分析を見る」から呼ばれる
// バグ修正：resultArea を上書きすると結果画面のボタンが消えてしまうため、
// 専用の weakHistoryArea を使うよう変更
function showWeakAnalysis() {

    console.log("wrongList =", wrongList);

    showWeakHistory();
}

// 🌸 結果画面「🌸 苦手分析」ボタンから呼ばれる
// バグ修正：script.js に定義がなく、押すとエラーになっていた
function showWeakHistory() {

    clearScreens();

    const listEl = document.getElementById("weakHistoryList");

    if (listEl) {
        listEl.innerHTML = renderWeakListHTML();
    }

    const area = document.getElementById("weakHistoryArea");

    if (area) {
        area.style.display = "block";
    }
}

// 🌸 苦手分析画面「🎓 学年へ戻る」ボタンから呼ばれる
// バグ修正：script.js に定義がなく、押すとエラーになっていた
function closeWeakHistory() {

    clearScreens();

    const area = document.getElementById("gradeArea");

    if (area) {
        area.style.display = "block";
    }
}

function mathAI(unit, grade) {

    const weak = JSON.parse(localStorage.getItem("weak") || "{}");
    const entries = Object.entries(weak);

    // 🌸 苦手なし → 通常問題
if (entries.length === 0) {

    return {
        ...generateQuestion(unit),
        source: "normal"
    };

}

// 🌸 AIでも毎回苦手問題にはしない
// 70% 苦手問題
// 30% 通常問題

if (Math.random() < 0.7) {

    entries.sort((a, b) => b[1].ng - a[1].ng);

    const target = entries[0][0];

    return createMathVariation(target);

}

return {
    ...generateQuestion(unit),
    source: "normal"
};

}

function createQuestionFromPattern(q) {

    const match = q.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);

    if (!match) {
        return generateQuestion(currentUnit);
    }

    let a = parseInt(match[1]);
    let op = match[2];
    let b = parseInt(match[3]);

    // 🌸 少しだけ数字を変える
    a += Math.floor(Math.random() * 3) - 1;
    b += Math.floor(Math.random() * 3) - 1;

    // 0未満防止
    if (a < 0) a = 0;
    if (b < 0) b = 0;

    let answer;

    switch (op) {

        case "+":
            answer = a + b;
            break;

        case "-":
            answer = a - b;
            break;

        case "*":
            answer = a * b;
            break;

        case "/":
            answer = a / b;
            break;
    }

    return {

        q: `${a} ${op} ${b} = ?`,
        a: answer,
        source: "ai"

    };
}


function getAIQuestion(unit) {

    const subject = currentSubject || "math";
    const grade = currentUser?.grade || "grade4";

    switch (subject) {

        case "math":
            return mathAI(unit, grade);

        case "japanese":
            return japaneseAI(unit, grade);

        case "english":
            return englishAI(unit, grade);

        case "science":
            return scienceAI(unit, grade);

        case "social":
            return socialAI(unit, grade);

        default:
            return generateQuestion(unit);
    }
}

function createMathVariation(q) {

    const match = q.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);

    if (!match) {
        return generateQuestion(currentUnit);
    }

    let a = parseInt(match[1]);
    let op = match[2];
    let b = parseInt(match[3]);

    // 🌸 ゆらぎ（AIっぽさ）
    a += Math.floor(Math.random() * 3) - 1;
    b += Math.floor(Math.random() * 3) - 1;

    if (a < 0) a = 0;
    if (b < 0) b = 0;

    let answer;

    switch (op) {
        case "+":
            answer = a + b;
            break;
        case "-":
            answer = a - b;
            break;
        case "*":
            answer = a * b;
            break;
        case "/":
            answer = b !== 0 ? a / b : 0;
            break;
    }

    return {
        q: `${a} ${op} ${b} = ?`,
        a: answer,
        source: "ai"
    };
}

function showScreen(screenName) {

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gradeArea").style.display = "none";
    document.getElementById("quizArea").style.display = "none";
    document.getElementById("resultArea").style.display = "none";

    if (screenName === "home") {
        document.getElementById("homeScreen").style.display = "block";
    }

    if (screenName === "grade") {
        document.getElementById("gradeArea").style.display = "block";
    }

    if (screenName === "quiz") {
        document.getElementById("quizArea").style.display = "block";
    }

    if (screenName === "result") {
        document.getElementById("resultArea").style.display = "block";
    }
}

/* =========================
   🌸 桜を舞わせる
========================= */

function showSakura() {

    for (let i = 0; i < 5; i++) {

        const petal = document.createElement("div");

        petal.className = "sakura";
        petal.textContent = "🌸";

        petal.style.left = (20 + Math.random() * 60) + "%";
        petal.style.animationDelay = (i * 0.15) + "s";

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 2200);

    }

}

/* =========================
   🔊 効果音
========================= */

function playSound(type) {

    let file = "";

    if (type === "correct") {
        file = "sounds/correct.mp3";
    }

    if (type === "wrong") {
        file = "sounds/wrong.mp3";
    }

    if (file === "") return;

    const audio = new Audio(file);

    audio.volume = 0.4;

    audio.play().catch(err => {
        console.log("🔊 効果音再生失敗:", err);
    });

}

// ========================
// 🌸 今日のひとこと表示
// ========================
function showDailyMessage() {
    const message =
        dailyMessages[Math.floor(Math.random() * dailyMessages.length)];

    document.getElementById("dailyMessage").textContent = message;
}

showDailyMessage()

/////////////////////////////////////////////////////
// 🌸 Engine 08
// 🌸 Review Engine
// Chapter 2
// SakuraDrill v7.4 Stable_13
//
// Role
// ・間違えた問題の復習
// ・Review Mode
// ・復習採点
// ・復習結果
//
// Functions
// ・startReview()
// ・showReviewQuestion()
// ・submitReviewAnswer()
// ・reviewNextQuestion()
// ・finishReview()
/////////////////////////////////////////////////////

// ========================
// 📚 復習モード（Step1）
// ========================
// ========================
// 📚 復習モード開始
// ========================

// 復習開始
function startReview() {

    if (wrongList.length === 0) {
        alert("🌸 復習する問題はありません！");
        return;
    }

    reviewMode = true;

    reviewList = [...wrongList];
    reviewIndex = 0;
    reviewScore = 0;

    resultArea.style.display = "none";
    quizArea.style.display = "block";

    nextBtn.style.display = "none";

    showReviewQuestion();

}
/* =========================
   🌸 復習問題表示
========================= */

function showReviewQuestion() {

    const currentQuestion =
        reviewList[reviewIndex];

    console.log(
        "🌸 reviewQuestion =",
        currentQuestion
    );


    // =================================
    // 🌸 復習開始時は「回答」状態
    // =================================

    mathKeypadAction = "answer";

    // 🌸 バグ修正：前の問題の「回答済み」フラグが
    // 残ったままだと、国語（漢字の読み・書き）の
    // 復習で「こたえる」を押しても何も起きなくなる
    kokugoAnswered = false;


    // =================================
    // 🌸 問題表示
    // =================================

    questionText.innerHTML =
        `<div class="questionCounter">📚 復習モード (${reviewIndex + 1}/${reviewList.length})</div>` +
        `<div class="questionBody">${currentQuestion.question}</div>`;


    // =================================
    // 🌸 既存入力欄を初期化
    // =================================

    answerInput.value = "";

    answerInput.disabled = false;

    answerInput.readOnly = false;

    answerInput.style.display = "block";


    // =================================
    // 🌸 国語読みボードを非表示
    // =================================

    const kokugoReadingBoard =
        document.getElementById(
            "kokugoReadingBoard"
        );

    if (kokugoReadingBoard) {

        kokugoReadingBoard.style.display =
            "none";

    }


    // =================================
    // 🌸 国語書きボードを非表示
    // =================================

    const kokugoWritingBoard =
        document.getElementById(
            "kokugoWritingBoard"
        );

    if (kokugoWritingBoard) {

        kokugoWritingBoard.style.display =
            "none";

    }


    // =================================
    // 🌸 算数テンキー
    // =================================

    const keypad =
        document.getElementById(
            "mathKeypad"
        );


    // =================================
    // 🌸 バグ修正：筆算パネルが前の問題のまま残る
    // 復習モードでは showQuestion() を通らないため、
    // ここで毎回パネルの中身を作り直さないと、通常モード
    // （または前の復習問題）の筆算がそのまま残ってしまい、
    // 今の復習問題と内容がズレて表示されてしまう。
    // まず一旦空にしておき、算数の問題であれば
    // このあとの分岐で改めて作り直す。
    // =================================

    const reviewScratchWrap =
        document.getElementById("hissanScratchWrap");

    const reviewPanelContent =
        document.getElementById("hissanPanelContent");

    mathKeypadFocusedEl = null;

    if (reviewPanelContent) {
        reviewPanelContent.innerHTML = "";
    }

    if (reviewScratchWrap) {
        reviewScratchWrap.style.display = "none";
    }


    // =================================
    // 🌸 国語復習
    // =================================

    if (
        currentQuestion.type ===
            "kanjiReading" ||
        currentQuestion.type ===
            "kanjiWriting"
    ) {

        // 🌸 国語では算数テンキーを使わない

        if (keypad) {

            keypad.style.display =
                "none";

        }


        // ---------------------------------
        // 🌸 漢字の読み
        // ---------------------------------

        if (
            currentQuestion.type ===
            "kanjiReading"
        ) {

            console.log(
                "🌸 復習：国語読みボード表示"
            );

            answerInput.style.display =
                "none";

            createKokugoReadingBoard(
                String(
                    currentQuestion.correct
                )
            );

        }


        // ---------------------------------
        // 🌸 漢字の書き
        // ---------------------------------

        else {

            console.log(
                "🌸 復習：国語書きボード表示"
            );

            answerInput.style.display =
                "none";

            createKokugoWritingBoard(
                String(
                    currentQuestion.correct
                )
            );

        }


    }

    // =================================
    // 🌸 その他の国語
    // バグ修正：以前は type === "word" も国語向けの
    // 判定に含めていたが、算数の文章題・概数問題なども
    // type: "word" を使っているため、算数の復習問題が
    // 誤って「国語の通常入力」扱いされ、テンキーが
    // 表示されなくなっていた。
    // 実際に国語データで使われている type だけを判定する。
    // =================================

    else if (
        currentQuestion.unit &&
        currentQuestion.type &&
        (
            currentQuestion.type === "antonym" ||
            currentQuestion.type === "classic" ||
            currentQuestion.type === "grammar" ||
            currentQuestion.type === "honorific" ||
            currentQuestion.type === "literature" ||
            currentQuestion.type === "proverb" ||
            currentQuestion.type === "reading" ||
            currentQuestion.type === "vocabulary"
        )
    ) {

        console.log(
            "🌸 復習：国語通常入力"
        );

        if (keypad) {

            keypad.style.display =
                "none";

        }

        answerInput.style.display =
            "block";

        answerInput.disabled =
            false;

        answerInput.readOnly =
            false;

    }

    // =================================
    // 🌸 算数復習
    // =================================

    else {

        console.log(
            "🌸 復習：算数テンキー表示"
        );

        answerInput.style.display =
            "block";


        if (keypad) {

            // 🌸 バグ修正：復習モードの問題データは
            // { question, correct, ... } という形だが、
            // getAnswerType() は通常モードと同じ { q, a, grade, ... }
            // の形を前提にしている。そのまま渡すと answer(=question.a)
            // や grade が undefined になり、中1などの学年別の
            // キーボード判定ができず、違うテンキーが出てしまう。
            const answerType =
                getAnswerType({
                    type: currentQuestion.type,
                    a: currentQuestion.correct,
                    grade: currentQuestion.grade,
                    inputType: currentQuestion.inputType
                });

            // 🌸 「数学用語12択」で正解を必ず選択肢に入れるため、
            // 復習問題の正解（currentQuestion.correct）を明示的に渡す
            createMathKeypad(
                answerType,
                currentQuestion.correct
            );

            keypad.style.display =
                "grid";

        }


        // =================================
        // 🌸 筆算パネル（採点なし）：復習モードの問題データは
        // { question, correct, ... } という形なので、通常モードの
        // { q, a, ... } に合わせて渡す。
        // =================================

        const reviewHissan = tryBuildHissan({
            type: currentQuestion.type,
            q: currentQuestion.question,
            a: currentQuestion.correct
        });

        if (reviewPanelContent) {
            reviewPanelContent.innerHTML = reviewHissan
                ? `${reviewHissan.html}${reviewHissan.suffix ? `<div class="hissanSuffix">${reviewHissan.suffix}</div>` : ""}`
                : "";
        }

        if (reviewScratchWrap) {
            reviewScratchWrap.style.display = reviewHissan ? "flex" : "none";
        }

        if (reviewHissan) {
            wireHissanAnswerBoxes();
        }

    }


    // =================================
    // 🌸 フィードバックをクリア
    // =================================

    feedback.textContent = "";


    // =================================
    // 🌸 次の問題ボタンを非表示
    // =================================

    nextBtn.style.display =
        "none";


    // =================================
    // 🌸 カーソル
    // =================================

    if (
        currentQuestion.type !==
            "kanjiReading" &&
        currentQuestion.type !==
            "kanjiWriting"
    ) {

        // 🌸 筆算マスがある場合は、そちらの最初のマス
        // （wireHissanAnswerBoxes 側で既にフォーカス済み）を
        // 上書きしないようにする。
        const reviewFirstHissanBox =
            document.querySelector(
                '.hissanAnswerBox[data-hissan-idx="0"]'
            );

        if (!reviewFirstHissanBox) {
            answerInput.focus();
        }

    }

}


function submitReviewAnswer() {

    const raw = answerInput.value;

    if (!raw.trim()) return;

    const currentQuestion = reviewList[reviewIndex];

    const ans = normalizeAnswer(raw);
    const correct = normalizeAnswer(currentQuestion.correct);

    let ok;

    switch (currentQuestion.type) {

        case "add":
        case "subtract":
        case "multiply":
        case "divide":
        case "decimal":
        case "area":
            ok = Number(ans) === Number(correct);
            break;

        case "volume": {

            // 🌸 バグ修正：中学の体積の答えは「96cm³」「45πcm³」のように
            // 単位やπを含む文字列のことがあり、Number()で比較すると
            // 常にNaN同士の比較になって正解でも不正解扱いになっていた。
            // 小学生の体積問題（答えが数字だけ）は今まで通り数値比較、
            // 単位を含む答えは他の図形問題と同じ完全一致／表記ゆれ判定にする。
            const correctIsPlainNumber =
                /^-?\d+(?:\.\d+)?$/.test(
                    String(correct).trim()
                );

            if (correctIsPlainNumber) {
                ok = Number(ans) === Number(correct);
            } else {
                ok =
                    ans === correct ||
                    isFuzzyTextMatch(raw, currentQuestion.correct);
            }

            break;

        }

        case "remainder":
            ok = ans === correct;
            break;

        case "fraction":
        case "geometry":
        case "word":
        case "time":
        default:
            // 🌸 完全一致、または揺らぎ判定
            // （数値の答えの場合は isFuzzyTextMatch 側で
            //   常に false になり、通常の一致判定のみ使われる）
            ok =
                ans === correct ||
                isFuzzyTextMatch(raw, currentQuestion.correct);
            break;
    }


    if (ok) {

    reviewScore++;

    feedback.innerHTML =
        `
        ⭕ 正解！<br><br>
        📖 <strong>解説</strong><br>
        ${currentQuestion.memo || "この問題の解説はありません。"}
        `;

    playSound("correct");


        // 🌸 Phase15-3-2
        // 復習で正解した問題を削除
        // 🌸 Phase15-3-2 復習正解処理
wrongList = wrongList.filter(item =>
    item.question !== currentQuestion.question
);

console.log(
    "📚 復習後 wrongList",
    wrongList
);


        console.log(
            "📚 復習正解 → wrongList更新",
            wrongList
        );


    } else {

    feedback.innerHTML =
        `
        ❌ 不正解<br>
        正解：<strong>${currentQuestion.correct}</strong><br><br>
        📖 <strong>解説</strong><br>
        ${currentQuestion.memo || "この問題の解説はありません。"}
        `;

    playSound("wrong");

}


    answerInput.disabled = true;


// 🌸 復習：OK → 次の問題へ
mathKeypadAction = "next";


const okBtn =
    document.getElementById("mathOKBtn");

if (okBtn) {

    okBtn.textContent =
        "➡ 次の問題";

}

}
function reviewNextQuestion() {

    reviewIndex++;

    console.log(
        "reviewIndex =", reviewIndex,
        "reviewList.length =", reviewList.length,
        "wrongList.length =", wrongList.length
    );

    if (reviewIndex < reviewList.length) {

        showReviewQuestion();

    } else {

        finishReview();

    }

}

function finishReview() {


    // 🌸 終了時の結果を保存
    const finalReviewScore =
        reviewScore;

    const finalReviewCount =
        reviewList.length;



    reviewMode = false;



    alert(
        `🌸 復習終了！\n\n${finalReviewScore} / ${finalReviewCount} 問正解`
    );



    quizArea.style.display = "none";

    resultArea.style.display = "block";



    resultArea.innerHTML = `


    <h2>🌸 復習おつかれさまでした！</h2>


    <p>
    📚 復習結果：
    ${finalReviewScore} / ${finalReviewCount} 問正解
    </p>



    ${
        wrongList.length > 0

        ?

        `
        <h3>📉 もう一度復習しましょう</h3>


        <button onclick="startReview()">

            📚 残り問題を復習する

        </button>
        `

        :

        `

        <h3>
        🎉 全ての苦手問題を克服しました！
        </h3>

        `
    }



    <button onclick="backToGrade()">

        🎓 学年選択へ戻る

    </button>



    <button onclick="backToHome()">

        🏠 ホームへ戻る

    </button>


    `;



    // 🌸 最後に初期化

    reviewList = [];

    reviewIndex = 0;

    reviewScore = 0;


}

/////////////////////////////////////////////////////
// 🌸 End of Engine 08
// Review Engine
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 Engine 09
// 🌸 Sakura Point Engine
// Chapter 3
// SakuraDrill v7.5
//
// Status : Stable
//
// Role
// ・Sakura Point管理
// ・ポイント読込み
// ・ポイント保存
// ・ポイント加算
// ・ポイント表示
//
// Functions
// ・loadPoint()
// ・savePoint()
// ・addPoint()
// ・showPoint()
/////////////////////////////////////////////////////


/* =========================
   Sakura Point 読込み
========================= */

function loadPoint() {

    if (!currentUser) return;

    sakuraPoint = currentUser.point || 0;

    showPoint();

    console.log("🌸 Point Loaded :", sakuraPoint);

}


/* =========================
   Sakura Point 保存
========================= */

function savePoint() {

    if (!currentUser) return;

    currentUser.point = sakuraPoint;

    saveUsers();

    console.log("🌸 Point Saved :", currentUser.point);

}


/* =========================
   Sakura Point 加算
========================= */

function addPoint(point) {

    // ポイント加算
    sakuraPoint += point;

    // マイナスにならない
    if (sakuraPoint < 0) {
        sakuraPoint = 0;
    }

    // 画面更新
    showPoint();

    // 保存
    savePoint();

    console.log(
        `🌸 Sakura Point : +${point} → ${sakuraPoint}P`
    );

}


/* =========================
Sakura Point 表示
========================= */

function showPoint() {

    const pointText = document.getElementById("pointText");
    const userStatus = document.getElementById("userStatus");

    // ユーザー名表示
    if (userStatus && currentUser) {
        userStatus.textContent = `👤 ${currentUser.name} さん`;
    }

    // ポイント表示
    if (!pointText) return;

    pointText.textContent =
        `🌸 Sakura Point : ${sakuraPoint}P`;
}


/////////////////////////////////////////////////////
// 🌸 End of Engine 09
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 Engine 11
// 🌸 Niigata Explore Engine
// SakuraDrill v7.5 Stable_10_04
//
// Status : Development
//
// Purpose
// ・新潟県を探検する学習マップ
//
// Role
// ・マップ画面表示
// ・地域選択
// ・地域データ管理
// ・地域状態管理
// ・現在地管理
// ・マップアニメーション
//
// Functions
// ・openNiigataMap()
// ・backToExplore()
// ・startArea()
// ・exploreAnimation()
//
// Data
// ・niigataAreas[]
/////////////////////////////////////////////////////


/////////////////////////////////////////////////////
// Phase1
// マップ画面制御
/////////////////////////////////////////////////////

const startSocialQuizBtn = document.getElementById("startSocialQuizBtn");

if (startSocialQuizBtn) {

    startSocialQuizBtn.addEventListener("click", openNiigataMap);

}

function openNiigataMap() {

    clearScreens();

    document.getElementById("socialArea").style.display = "block";
    document.getElementById("niigataMap").style.display = "block";

}
function backToExplore(){

    console.log("🌸 backToExplore");

    document.getElementById("exploreQuizArea").style.display = "none";
    document.getElementById("socialArea").style.display = "block";

}

function startArea(area, card) {
    // 🌸 前回の探検結果をリセット
    document.getElementById("exploreResult").style.display = "none";
    exploreAnimation(card);

    setTimeout(() => {

        if (area === "sado") {
            startSadoExplore();
            return;
        }

        if (area === "niigata") {
            startNiigataExplore();
            return;
        }

        const selectedArea = niigataAreas.find(a => a.id === area);
        const areaName = selectedArea ? selectedArea.name : area;

        alert(areaName + " を探検します！");

    }, 500);

}

/////////////////////////////////////////////////////
// Phase2
// 地域データ
/////////////////////////////////////////////////////

const niigataAreas = [

    {
        id: "niigata",
        name: "新潟市",
        icon: "🌊",
        unlocked: true,
        cleared: false
    },

    {
        id: "nagaoka",
        name: "長岡市",
        icon: "🎆",
        unlocked: false,
        cleared: false
    },

    {
        id: "sado",
        name: "佐渡市",
        icon: "🐦",
        unlocked: false,
        cleared: false
    },

    {
        id: "yahiko",
        name: "弥彦村",
        icon: "⛩️",
        unlocked: false,
        cleared: false
    }

];


/////////////////////////////////////////////////////
// Phase3
// マップアニメーション
/////////////////////////////////////////////////////

function exploreAnimation(card) {

    if (!card) return;

    card.classList.add("exploring");

    setTimeout(() => {

        card.classList.remove("exploring");

    }, 500);

}

/////////////////////////////////////////////////////
// Phase4
// 地域クリア管理
/////////////////////////////////////////////////////

function clearArea(areaId) {

    const area = niigataAreas.find(a => a.id === areaId);

    if (!area) return;

    area.cleared = true;

    console.log("🌸 地域クリア:", area.name);

}

function getExploreRate() {

    const cleared = niigataAreas.filter(a => a.cleared).length;

    return Math.round(cleared / niigataAreas.length * 100);

}

/////////////////////////////////////////////////////
// Phase5
// 地域紹介データ
/////////////////////////////////////////////////////

const areaInfo = {

    niigata: {

        name: "新潟市",

        icon: "🌊",

        message: "港町・新潟市を探検しよう！",

        topics: [

            "信濃川",
            "日本海",
            "新潟港"

        ]

    },

    nagaoka: {

        name: "長岡市",

        icon: "🎆",

        message: "花火のまち長岡へ出発！",

        topics: [

            "長岡花火",
            "信濃川",
            "錦鯉"

        ]

    },

    sado: {

        name: "佐渡市",

        icon: "🐦",

        message: "トキが暮らす佐渡島を探検しよう！",

        topics: [

            "佐渡金山",
            "トキ",
            "たらい舟"

        ]

    },

    yahiko: {

        name: "弥彦村",

        icon: "⛩️",

        message: "弥彦神社を探検しよう！",

        topics: [

            "弥彦神社",
            "ロープウェイ",
            "菊まつり"

        ]

    }

};

/////////////////////////////////////////////////////
// Phase5
// 佐渡市問題データ
/////////////////////////////////////////////////////

/* const sadoQuiz = [

    {
        question: "佐渡島で大切に守られている鳥は？",
        choices: ["トキ", "ツバメ", "ハト"],
        answer: "トキ",
        comment: "🌸 トキは国の特別天然記念物だよ！"
    },

    {
        question: "佐渡で有名なものは？",
        choices: ["佐渡金山", "東京タワー", "富士山"],
        answer: "佐渡金山",
        comment: "🌸 江戸時代から有名な金山なんだよ！"
    },

    {
        question: "佐渡で有名な船は？",
        choices: ["たらい舟", "潜水艦", "フェリー"],
        answer: "たらい舟",
        comment: "🌸 丸い船で海を進む珍しい船だよ！"
    }

];　*/

/////////////////////////////////////////////////////
// Phase5
// 新潟市問題データ
/////////////////////////////////////////////////////

/* const niigataQuiz = [

{
    question:"新潟市は新潟県の何でしょう？",
    choices:[
        "県庁所在地",
        "第2の都市",
        "港だけの町"
    ],
    answer:"県庁所在地",
    comment:"🌸 新潟市は新潟県の県庁所在地です。日本海側で初めての政令指定都市になりました。"
},

{
    question:"万代橋について正しいものはどれでしょう？",
    choices:[
        "6つのアーチがある橋",
        "つり橋",
        "木でできた橋"
    ],
    answer:"6つのアーチがある橋",
    comment:"🌸 万代橋は6つのアーチでできた橋で、国の重要文化財に指定されています。"
},

{
    question:"新潟市を流れる日本一長い川はどれでしょう？",
    choices:[
        "利根川",
        "石狩川",
        "信濃川"
    ],
    answer:"信濃川",
    comment:"🌸 信濃川は日本一長い川です。新潟市のまわりには日本一広い越後平野が広がっています。"
}

];

*/

/////////////////////////////////////////////////////
// Phase5
// 佐渡市探検開始
/////////////////////////////////////////////////////

function startSadoExplore(){

    console.log("🐦 佐渡市探検スタート");
    console.log(sadoQuiz[0]);

    currentExploreQuiz = sadoQuiz;

    exploreIndex = 0;

    showExploreQuiz();

}
/////////////////////////////////////////////////////
// Phase5
// 新潟市探検開始
/////////////////////////////////////////////////////

function startNiigataExplore(){

    console.log("🌉 新潟市探検スタート");

    currentExploreQuiz = niigataQuiz;

    exploreIndex = 0;

    showExploreQuiz();

}



/////////////////////////////////////////////////////
// Phase5
// 探検画面表示
/////////////////////////////////////////////////////

function showExploreQuiz(){

    document.getElementById("socialArea").style.display = "none";

    document.getElementById("exploreQuizArea").style.display = "block";

    document.getElementById("backToMapBtn").style.visibility = "hidden";

    const quiz = currentExploreQuiz[exploreIndex];

    document.getElementById("exploreTitle").textContent =
        "🗾 新潟県探検";

    document.getElementById("exploreMessage").innerHTML =
        `
        🌸 Sakura先生<br>
        「新潟県のことを探検しよう！」
        `;

    document.getElementById("exploreQuestion").textContent =
        quiz.q;

    const choices = document.getElementById("exploreChoices");

    choices.innerHTML = "";

    quiz.choices.forEach(choice => {

        choices.innerHTML += `
<button
class="challengeChoice"
onclick="answerExplore('${choice}')">

${choice}

</button>
`;

    });

}

/////////////////////////////////////////////////////
// Phase5
// 探検状態
/////////////////////////////////////////////////////

let currentExploreQuiz = [];
let exploreIndex = 0;
let currentExploreQuestion = null;
/////////////////////////////////////////////////////
// 🌸 Engine12 日本全国チャレンジ
/////////////////////////////////////////////////////

let currentJapanQuiz = [];

let japanIndex = 0;

let currentJapanQuestion = null;

const japanChallengeQuestions = [

    {
        prefecture: "北海道",
        q: "北海道の県庁所在地は？",
        choices: ["札幌市", "函館市", "旭川市"],
        a: "札幌市",
        memo: "北海道最大の都市です。"
    },

    {
        prefecture: "青森県",
        q: "りんごで有名な県は？",
        choices: ["青森県", "秋田県", "岩手県"],
        a: "青森県",
        memo: "青森県は日本一のりんご産地です。"
    },

    {
        prefecture: "宮城県",
        q: "仙台市がある県は？",
        choices: ["宮城県", "福島県", "山形県"],
        a: "宮城県",
        memo: "仙台市は東北地方最大の都市です。"
    },

    {
        prefecture: "東京都",
        q: "東京タワーがある都道府県は？",
        choices: ["東京都", "神奈川県", "千葉県"],
        a: "東京都",
        memo: "高さ333mで有名です。"
    },

    {
        prefecture: "神奈川県",
        q: "横浜中華街がある県は？",
        choices: ["神奈川県", "東京都", "埼玉県"],
        a: "神奈川県",
        memo: "日本最大級の中華街です。"
    },

    {
        prefecture: "静岡県",
        q: "富士山が見える県の一つは？",
        choices: ["静岡県", "長野県", "新潟県"],
        a: "静岡県",
        memo: "富士山は静岡県と山梨県にまたがっています。"
    },

    {
        prefecture: "新潟県",
        q: "佐渡金山がある島は？",
        choices: ["佐渡島", "淡路島", "隠岐島"],
        a: "佐渡島",
        memo: "世界文化遺産に登録されています。"
    },

    {
        prefecture: "長野県",
        q: "冬のオリンピックが開かれた県は？",
        choices: ["長野県", "群馬県", "富山県"],
        a: "長野県",
        memo: "1998年に冬季オリンピックが開催されました。"
    },

    {
        prefecture: "京都府",
        q: "金閣寺があるのは？",
        choices: ["京都府", "奈良県", "滋賀県"],
        a: "京都府",
        memo: "金色に輝く有名なお寺です。"
    },

    {
        prefecture: "奈良県",
        q: "大仏で有名な県は？",
        choices: ["奈良県", "大阪府", "兵庫県"],
        a: "奈良県",
        memo: "東大寺の大仏はとても有名です。"
    },

    {
        prefecture: "広島県",
        q: "宮島（厳島神社）がある県は？",
        choices: ["広島県", "山口県", "岡山県"],
        a: "広島県",
        memo: "海に浮かぶ大鳥居で有名です。"
    },

    {
        prefecture: "愛媛県",
        q: "みかんで有名な県は？",
        choices: ["愛媛県", "高知県", "徳島県"],
        a: "愛媛県",
        memo: "おいしいみかんがたくさん収穫されます。"
    },

    {
        prefecture: "福岡県",
        q: "博多ラーメンで有名な県は？",
        choices: ["福岡県", "佐賀県", "長崎県"],
        a: "福岡県",
        memo: "とんこつラーメンが有名です。"
    },

    {
        prefecture: "熊本県",
        q: "熊本城がある県は？",
        choices: ["熊本県", "宮崎県", "鹿児島県"],
        a: "熊本県",
        memo: "日本三名城の一つです。"
    },

    {
        prefecture: "沖縄県",
        q: "日本で一番南にある県は？",
        choices: ["沖縄県", "鹿児島県", "東京都"],
        a: "沖縄県",
        memo: "美しい海で有名です。"
    }

];


/////////////////////////////////////////////////////
// 🌸 Engine12 開始
/////////////////////////////////////////////////////

function startJapanChallenge(){

    // 🌸 全国チャレンジ開始画面を閉じる
    document.getElementById("nationArea").style.display = "none";

    // 🌸 問題画面を表示
    document.getElementById("japanChallengeArea").style.display = "block";

    // 🌸 終了画面をリセット
    document.getElementById("japanResultText").innerHTML = "";
    //document.getElementById("japanTeacherMessage").style.display = "none";
    document.getElementById("japanFinishArea").style.display = "none";

// 🌸 SDS ランダム40問抽出

currentJapanQuiz = shuffleArray(japanQuestions).slice(0,40);

console.log("問題数 =", currentJapanQuiz.length);
console.log(currentJapanQuiz[0]);

japanIndex = 0;
japanScore = 0;

currentJapanQuestion = null;

showJapanQuestion();
}

/////////////////////////////////////////////////////
// 🌸 Engine12 都道府県チャレンジ
/////////////////////////////////////////////////////





function startPrefectureChallenge(prefectureName) {

    console.log(`🌸 ${prefectureName}チャレンジ開始`);

    // もう一度挑戦ボタン用
    retrySocialChallenge = () => startPrefectureChallenge(prefectureName);

    // 画面切替
    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    // 都道府県だけ抽出
    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(
            q => q.unit === prefectureName
        );

    console.log(`${prefectureName}問題数:`, currentSocialQuiz.length);

    // シャッフルして10問抽出
    currentSocialQuiz =
        shuffleArray(currentSocialQuiz).slice(0, 10);

    // 3択生成
    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(question, grade4SocialStudiesQuestions);

    });

    // 初期化
    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    console.log("🌸 出題数:", currentSocialQuiz.length);

    // 最初の問題
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 北海道・東北地方 テストチャレンジ
/////////////////////////////////////////////////////

function startHokkaidoTohokuTest(){

    retrySocialChallenge = startHokkaidoTohokuTest;

    alert("北海道・東北テスト開始");

    console.log("🌸 北海道・東北テスト");

    // 画面切替
    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    // 🌸 grade4SocialStudiesQuestionsから北海道・東北地方を抽出
    const hokkaidoTohokuPrefectures = [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県"
    ];

    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(q =>
            hokkaidoTohokuPrefectures.includes(q.unit)
        );

    // 🌸 シャッフルして10問抽出
    currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);

    console.log("抽出件数:", currentSocialQuiz.length);
    console.log(currentSocialQuiz.map(q => q.q));

    console.table(
        currentSocialQuiz.reduce((count, q) => {
            count[q.unit] = (count[q.unit] || 0) + 1;
            return count;
        }, {})
    );

    // 10問抽出
    currentSocialQuiz = currentSocialQuiz.slice(0, 10);

    // 🌸 3択生成
    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(question, grade4SocialStudiesQuestions);

    });

    // 初期化
    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    // 最初の問題表示
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 関東地方テストチャレンジ
/////////////////////////////////////////////////////

function startKantoTest(){

    retrySocialChallenge = startKantoTest;

    alert("関東地方テスト開始");

    console.log("🌸 関東地方テスト");

    // 画面切替
    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    // 🌸 grade4SocialStudiesQuestionsから関東地方を抽出
    const kantoPrefectures = [
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県"
    ];

    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(q =>
            kantoPrefectures.includes(q.unit)
        );

    // 🌸 シャッフル
    currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);

    console.log("抽出件数:", currentSocialQuiz.length);
    console.log(currentSocialQuiz.map(q => q.q));

    console.table(
        currentSocialQuiz.reduce((count, q) => {
            count[q.unit] = (count[q.unit] || 0) + 1;
            return count;
        }, {})
    );

    // 10問抽出
    currentSocialQuiz = currentSocialQuiz.slice(0, 10);

    // 🌸 3択生成
    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(question, grade4SocialStudiesQuestions);

    });

    // 初期化
    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    // 最初の問題表示
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 中部地方テストチャレンジ
/////////////////////////////////////////////////////

function startChubuTest(){

    retrySocialChallenge = startChubuTest;

    alert("中部地方テスト開始");

    console.log("🌸 中部地方テスト");


    // 画面切替

    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";

    document.getElementById("socialQuizArea").style.display = "block";



    // 🌸 grade4SocialStudiesQuestionsから中部地方を抽出

    const chubuPrefectures = [
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県"
    ];



    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(q =>
            chubuPrefectures.includes(q.unit)
        );



    // 🌸 シャッフル

    currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);



    console.log(
        "抽出件数:",
        currentSocialQuiz.length
    );


    console.log(
        currentSocialQuiz.map(q => q.q)
    );



    console.table(
        currentSocialQuiz.reduce((count, q) => {

            count[q.unit] =
                (count[q.unit] || 0) + 1;

            return count;

        }, {})
    );



    // 10問抽出

    currentSocialQuiz =
        currentSocialQuiz.slice(0,10);



    // 🌸 3択生成

    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(
                question,
                grade4SocialStudiesQuestions
            );

    });



    // 初期化

    socialIndex = 0;

    socialScore = 0;

    currentSocialQuestion = null;



    console.log(
        "🌸 問題数:",
        currentSocialQuiz.length
    );



    // 最初の問題表示

    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 近畿地方テストチャレンジ
/////////////////////////////////////////////////////

function startKinkiTest(){

    retrySocialChallenge = startKinkiTest;

    alert("近畿地方テスト開始");

    console.log("🌸 近畿地方テスト");


    // 画面切替

    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";

    document.getElementById("socialQuizArea").style.display = "block";


    // 🌸 grade4SocialStudiesQuestionsから近畿地方を抽出

    const kinkiPrefectures = [
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県"
    ];


    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(q =>
            kinkiPrefectures.includes(q.unit)
        );


    // 🌸 シャッフル

    currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);


    console.log(
        "抽出件数:",
        currentSocialQuiz.length
    );


    console.log(
        currentSocialQuiz.map(q => q.q)
    );


    console.table(
        currentSocialQuiz.reduce((count, q) => {

            count[q.unit] =
                (count[q.unit] || 0) + 1;

            return count;

        }, {})
    );


    // 10問抽出

    currentSocialQuiz =
        currentSocialQuiz.slice(0,10);



    // 🌸 3択生成

    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(
                question,
                grade4SocialStudiesQuestions
            );

    });



    // 初期化

    socialIndex = 0;

    socialScore = 0;

    currentSocialQuestion = null;


    console.log(
        "🌸 問題数:",
        currentSocialQuiz.length
    );


    // 最初の問題表示

    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 中国地方テストチャレンジ
/////////////////////////////////////////////////////

function startChugokuTest(){

    retrySocialChallenge = startChugokuTest;

    alert("中国地方テスト開始");

    console.log("🌸 中国地方テスト");


    // 画面切替
    clearScreens();


    document.getElementById("socialResultArea").style.display = "none";

    document.getElementById("socialQuizArea").style.display = "block";


    // 🌸 grade4SocialStudiesQuestionsから中国地方を抽出

    const chugokuPrefectures = [
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県"
    ];


    currentSocialQuiz =
        grade4SocialStudiesQuestions.filter(q =>
            chugokuPrefectures.includes(q.unit)
        );


    // 🌸 シャッフル

    currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);



    console.log("抽出件数:", currentSocialQuiz.length);

    console.log(
        currentSocialQuiz.map(q => q.q)
    );


    console.table(
        currentSocialQuiz.reduce((count, q) => {

            count[q.unit] =
                (count[q.unit] || 0) + 1;

            return count;

        }, {})
    );


    // 10問抽出

    currentSocialQuiz =
        currentSocialQuiz.slice(0,10);



    // 🌸 3択生成

    currentSocialQuiz.forEach(question => {

        question.choices =
            generate3Choices(
                question,
                grade4SocialStudiesQuestions
            );

    });



    // 初期化

    socialIndex = 0;

    socialScore = 0;

    currentSocialQuestion = null;



    console.log(
        "🌸 問題数:",
        currentSocialQuiz.length
    );


    // 最初の問題表示

    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 四国地方テストチャレンジ
/////////////////////////////////////////////////////

function startShikokuTest(){

    retrySocialChallenge = startShikokuTest;
    alert("四国地方テスト開始");

    console.log("🌸 四国地方テスト");

    // 画面切替
    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    // 🌸 grade4SocialStudiesQuestionsから四国地方を抽出

const shikokuPrefectures = [
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県"
];


currentSocialQuiz =
    grade4SocialStudiesQuestions.filter(q =>
        shikokuPrefectures.includes(q.unit)
    );


// 🌸 シャッフル
currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);

    console.log("抽出件数:", currentSocialQuiz.length);
    console.log(currentSocialQuiz.map(q => q.q));

    console.table(
        currentSocialQuiz.reduce((count, q) => {
            count[q.unit] = (count[q.unit] || 0) + 1;
            return count;
        }, {})
    );

    // 10問抽出
    currentSocialQuiz = currentSocialQuiz.slice(0, 10);

    // 🌸 3択生成
    currentSocialQuiz.forEach(question => {
        question.choices =
            generate3Choices(question, grade4SocialStudiesQuestions);
    });

    // 初期化
    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    // 最初の問題表示
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 九州・沖縄地方テストチャレンジ
/////////////////////////////////////////////////////

function startKyushuTest(){

    retrySocialChallenge = startKyushuTest;
    alert("九州・沖縄地方テスト開始");

    console.log("🌸 九州・沖縄地方テスト");

    // 画面切替
    clearScreens();

    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    // 🌸 grade4SocialStudiesQuestionsから九州・沖縄地方を抽出

const kyushuPrefectures = [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県"
];


currentSocialQuiz =
    grade4SocialStudiesQuestions.filter(q =>
        kyushuPrefectures.includes(q.unit)
    );


// 🌸 シャッフル
currentSocialQuiz =
    shuffleArray(currentSocialQuiz).slice(0, 10);

    console.log("抽出件数:", currentSocialQuiz.length);
    console.log(currentSocialQuiz.map(q => q.q));

    console.table(
        currentSocialQuiz.reduce((count, q) => {
            count[q.unit] = (count[q.unit] || 0) + 1;
            return count;
        }, {})
    );

    // 10問抽出
    currentSocialQuiz = currentSocialQuiz.slice(0, 10);

    // 🌸 3択生成
    currentSocialQuiz.forEach(question => {
        question.choices =
            generate3Choices(question, grade4SocialStudiesQuestions);
    });

    // 初期化
    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    // 最初の問題表示
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 Engine14
// Sakura Quiz Core
//
// 共通選択肢表示
/////////////////////////////////////////////////////

function showChoices(question, questionList){

    // 🌸 choices がある場合
    if(question.choices){

        return shuffleArray([...question.choices]);

    }

    // 🌸 自動生成
    return generate3Choices(question, questionList);

}

/////////////////////////////////////////////////////
// 🌸 Engine14
// 問題表示
//
// Role
// ・問題番号表示
// ・問題文表示
/////////////////////////////////////////////////////

function displayQuestion(question, progressId, questionId, progressText){

    document.getElementById(progressId).textContent = progressText;

    document.getElementById(questionId).textContent = question.q;

}

/////////////////////////////////////////////////////
// 🌸 SDS-001
// Sakura Choice Engine
//
// Role
// ・3択生成
// ・choices[] がある場合は最優先
// ・choices[] がない場合は自動生成
//
// Used By
// ・全国チャレンジ
// ・学年別社会（予定）
// ・新潟県たんけん（予定）
//
// Status
// Stable
/////////////////////////////////////////////////////

function generate3Choices(question, questionList){

    // 🌸 choices がある場合はそのまま使う
    if(question.choices){

        return shuffleArray([...question.choices]);

    }

    // 🌸 正解を最初に入れる
    const choices = [question.a];

    // 🌸 同じ type の問題だけを候補にする
    let candidates = questionList.filter(q =>
        q.type === question.type &&
        q.a !== question.a
    );

    // 🌸 候補不足なら全問題から補う
    if(candidates.length < 2){

        candidates = questionList.filter(q =>
            q.a !== question.a
        );

    }

    shuffleArray(candidates);

    for(const item of candidates){

        if(choices.length >= 3) break;

        if(!choices.includes(item.a)){

            choices.push(item.a);

        }

    }

    shuffleArray(choices);

    return choices;

}
/////////////////////////////////////////////////////
// 🌸 小学4年社会開始
/////////////////////////////////////////////////////

function startGrade4Social(){

    retrySocialChallenge = startGrade4Social;
    console.log("🌸 小学4年社会スタート");

    // 画面切替
    clearScreens();
    // 🌸 結果画面を閉じる
document.getElementById("socialResultArea").style.display = "none";

// 🌸 クイズ画面を表示
document.getElementById("socialQuizArea").style.display = "block";

    // 問題を読み込む
    currentSocialQuiz = [...grade4SocialStudiesQuestions];

    // シャッフル
    currentSocialQuiz = shuffleArray(currentSocialQuiz);

    // 10問抽出
    currentSocialQuiz = currentSocialQuiz.slice(0,10);

// 🌸 3択生成
currentSocialQuiz.forEach(question => {

    question.choices =
        generate3Choices(question, grade4SocialStudiesQuestions);

});

    // 初期化
socialIndex = 0;
socialScore = 0;
currentSocialQuestion = null;

// 🌸 社会・復習モードをリセット
socialWrongList = [];
socialReviewMode = false;
socialReviewIndex = 0;
socialReviewList = [];

// 🌸 通常の社会学習に戻す
document.getElementById("nextSocialBtn").onclick =
    nextSocialQuestion;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    // 最初の問題表示
    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 小学3年・5年・6年社会
// バグ修正：ボタンにonclickが設定されておらず
// 押しても何も起きなかったため追加
/////////////////////////////////////////////////////

function startGrade3Social(){

    retrySocialChallenge = startGrade3Social;
    console.log("🌸 小学3年社会スタート");

    clearScreens();
    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    currentSocialQuiz = [...grade3SocialStudiesQuestions];
    currentSocialQuiz = shuffleArray(currentSocialQuiz);
    currentSocialQuiz = currentSocialQuiz.slice(0,10);

    currentSocialQuiz.forEach(question => {
        question.choices =
            generate3Choices(question, grade3SocialStudiesQuestions);
    });

    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    socialWrongList = [];
    socialReviewMode = false;
    socialReviewIndex = 0;
    socialReviewList = [];

    document.getElementById("nextSocialBtn").onclick =
        nextSocialQuestion;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    showSocialQuestion();

}

function startGrade5Social(){

    retrySocialChallenge = startGrade5Social;
    console.log("🌸 小学5年社会スタート");

    clearScreens();
    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    currentSocialQuiz = [...grade5SocialStudiesQuestions];
    currentSocialQuiz = shuffleArray(currentSocialQuiz);
    currentSocialQuiz = currentSocialQuiz.slice(0,10);

    currentSocialQuiz.forEach(question => {
        question.choices =
            generate3Choices(question, grade5SocialStudiesQuestions);
    });

    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    socialWrongList = [];
    socialReviewMode = false;
    socialReviewIndex = 0;
    socialReviewList = [];

    document.getElementById("nextSocialBtn").onclick =
        nextSocialQuestion;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    showSocialQuestion();

}

function startGrade6Social(){

    retrySocialChallenge = startGrade6Social;
    console.log("🌸 小学6年社会スタート");

    clearScreens();
    document.getElementById("socialResultArea").style.display = "none";
    document.getElementById("socialQuizArea").style.display = "block";

    currentSocialQuiz = [...grade6SocialStudiesQuestions];
    currentSocialQuiz = shuffleArray(currentSocialQuiz);
    currentSocialQuiz = currentSocialQuiz.slice(0,10);

    currentSocialQuiz.forEach(question => {
        question.choices =
            generate3Choices(question, grade6SocialStudiesQuestions);
    });

    socialIndex = 0;
    socialScore = 0;
    currentSocialQuestion = null;

    socialWrongList = [];
    socialReviewMode = false;
    socialReviewIndex = 0;
    socialReviewList = [];

    document.getElementById("nextSocialBtn").onclick =
        nextSocialQuestion;

    console.log("🌸 問題数:", currentSocialQuiz.length);

    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 Engine12 問題表示
/////////////////////////////////////////////////////

function showJapanQuestion(){

    if(japanIndex >= currentJapanQuiz.length){

        finishJapanChallenge();

        return;

    }

    currentJapanQuestion = currentJapanQuiz[japanIndex];

    document.getElementById("japanProgress").textContent =
    `第${japanIndex + 1}問 / ${currentJapanQuiz.length}問`;

    document.getElementById("japanQuestion").textContent =
        currentJapanQuestion.q;

    document.getElementById("japanMemo").textContent = "";

    document.getElementById("nextJapanBtn").style.display = "none";

const choices = document.getElementById("japanChoices");

choices.innerHTML = "";

// 🌸 SDS-001
const shuffledChoices =
    showChoices(currentJapanQuestion, currentJapanQuiz);

shuffledChoices.forEach(choice=>{

const btn = document.createElement("button");

btn.className = "challengeChoice";   // ← この1行を追加

btn.textContent = choice;

    btn.onclick = function(){

        submitJapanAnswer(choice);

    };

    choices.appendChild(btn);

});

}


/////////////////////////////////////////////////////
// 🌸 学年別社会 問題表示
/////////////////////////////////////////////////////

function showSocialQuestion(){

    if(socialIndex >= currentSocialQuiz.length){

    finishSocialChallenge();

    return;

}

    currentSocialQuestion = currentSocialQuiz[socialIndex];

    // 🌸 前回の解説を消す
    document.getElementById("socialMemo").innerHTML = "";

    // 🌸 次の問題ボタンを隠す
    document.getElementById("nextSocialBtn").style.display = "none";

    document.getElementById("socialProgress").textContent =
        `第${socialIndex + 1}問 / ${currentSocialQuiz.length}問`;

    document.getElementById("socialQuestion").textContent =
        currentSocialQuestion.q;

    console.log("🌸 問題表示");
    console.log(currentSocialQuestion);

    // 🌸 選択肢エリア
    const choices = document.getElementById("socialChoices");
    choices.innerHTML = "";

    // 🌸 Engine14
const shuffledChoices =
    showChoices(currentSocialQuestion, currentSocialQuiz);

    console.log("🌸 3択:", shuffledChoices);

    // 🌸 3択ボタン表示
    shuffledChoices.forEach(choice => {

        const btn = document.createElement("button");

        btn.className = "challengeChoice";

        btn.textContent = choice;

        btn.onclick = function(){

            checkSocialAnswer(choice);

        };

        choices.appendChild(btn);

    });

    // 🌸 Engine20 学習時間開始
    startStudyTimer();

}
/////////////////////////////////////////////////////
// 🌸 Engine12
// 学年別社会 判定
/////////////////////////////////////////////////////

function checkSocialAnswer(answer){

    // 🌸 一度回答したらボタンを無効化
    const buttons = document.querySelectorAll("#socialChoices button");

    buttons.forEach(btn => {

        btn.disabled = true;

    });

    const memo =
        document.getElementById("socialMemo");

    const nextBtn =
        document.getElementById("nextSocialBtn");
    // 🌸 Engine20
// 社会・単元別記録
const socialUnit =
    currentSocialQuestion.unit;

// 🌸 以前の学習記録に units がない場合
if (!studyRecord.social.units) {
    studyRecord.social.units = {};
}

if (socialUnit) {

    if (!studyRecord.social.units[socialUnit]) {

        studyRecord.social.units[socialUnit] = {
            answered: 0,
            correct: 0
        };

    }

    studyRecord.social.units[socialUnit].answered++;

}    
    // 🌸 Engine20
    // 社会回答数
    studyRecord.social.answered++;
    if(answer === currentSocialQuestion.a){

    socialScore++;

    // 🌸 Engine20
    studyRecord.social.correct++;

        // 🌸 Engine20
    // 社会・単元別正解数
    if (socialUnit) {
        studyRecord.social.units[socialUnit].correct++;
    }
    addPoint(10);

    // 🌸 さくら吹雪
    showSakura();

// 🌸 正解音
playSound("correct");

console.log("🌸 socialScore =", socialScore);

    memo.innerHTML =
    `
    <h3>🌸 正解！</h3>

    <p>${currentSocialQuestion.memo}</p>
    `;


    }else{
        // 🌸 社会・復習データ保存
const socialRecord = {

    question: currentSocialQuestion.q,

    correct: currentSocialQuestion.a,

    userAnswer: answer,

    unit: currentSocialQuestion.unit,

    type: currentSocialQuestion.type,

    memo: currentSocialQuestion.memo

};

console.log("🌸 socialRecord =", socialRecord);
socialWrongList.push(socialRecord);
    // 🌸 不正解音
    playSound("wrong");

    memo.innerHTML =
        `
        <h3>❌ ざんねん！</h3>

        <p>
        正解は
        <strong>${currentSocialQuestion.a}</strong>
        です。
        </p>

        <p>${currentSocialQuestion.memo}</p>
        `;

    }

    nextBtn.style.display = "block";
    // 🌸 Engine20
    // 社会1問分の学習時間を確定
    finishStudyQuestion("social");

    // 🌸 Engine20
    // 今日の学習記録を自動保存
    saveTodayStudyRecord();
}

/////////////////////////////////////////////////////
// 🌸 学年別社会
// 次の問題
/////////////////////////////////////////////////////

function nextSocialQuestion(){

    socialIndex++;

    showSocialQuestion();

}

/////////////////////////////////////////////////////
// 🌸 Engine12 解答判定
/////////////////////////////////////////////////////

function submitJapanAnswer(answer){

    const buttons = document.querySelectorAll("#japanChoices button");

    buttons.forEach(btn => {

        btn.disabled = true;

        if(btn.textContent !== currentJapanQuestion.a){

            btn.style.display = "none";

        }

    });

    const correctBtn = [...buttons].find(
        btn => btn.textContent === currentJapanQuestion.a
    );

    if(correctBtn){

        correctBtn.style.background =
            "linear-gradient(135deg,#66bb6a,#43a047)";

    }

if(answer === currentJapanQuestion.a){

    japanScore++;

    showSakura();               // 🌸 桜吹雪
    playSound("correct");       // 🔊 正解音

}else{

    playSound("wrong");         // 🔊 不正解音

}
const memo = document.getElementById("japanMemo");

if(answer === currentJapanQuestion.a){

    memo.innerHTML =
        "<h2 style='color:#2e7d32;'>🎉 正解！</h2>" +
        "<p>" + currentJapanQuestion.memo + "</p>";

}else{

    memo.innerHTML =
        "<h2 style='color:#d32f2f;'>❌ おしい！</h2>" +
        "<p>" + currentJapanQuestion.memo + "</p>";

}
    document.getElementById("nextJapanBtn").style.display = "inline-block";

}

/////////////////////////////////////////////////////
// 🌸 Engine12
// 学年別社会ドリル画面
/////////////////////////////////////////////////////

function openSocialGrade(){

    // 社会ホームを閉じる
    document.getElementById("socialHome").style.display = "none";

    // 学年選択を表示
    document.getElementById("socialGradeArea").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌸 Engine12 次の問題
/////////////////////////////////////////////////////

function nextJapanQuestion(){

    japanIndex++;

    if(japanIndex >= currentJapanQuiz.length){

        finishJapanChallenge();
        return;

    }

    showJapanQuestion();

}


/////////////////////////////////////////////////////
// 回答判定
/////////////////////////////////////////////////////

function answerExplore(choice){

    const quiz = currentExploreQuiz[exploreIndex];

    const result =
    document.getElementById("exploreResult");

    const next =
    document.getElementById("nextExploreBtn");

if(choice === quiz.a){

    showSakura();              // 🌸 桜吹雪
    playSound("correct");      // 🔊 正解音

    result.innerHTML =
    `
    <h3>🌸 正解！</h3>

    <p>${quiz.memo}</p>
    `;

}else{

    playSound("wrong");        // 🔊 不正解音

    result.innerHTML =
        result.innerHTML =
        `
        <h3>😊 おしい！</h3>

        <p>
        正解は
        <strong>${quiz.a}</strong>
        だよ。
        </p>

        <p>${quiz.memo}</p>
        `;

    }

    result.style.display="block";

    next.style.display="inline-block";

}

/////////////////////////////////////////////////////
// 次の問題
/////////////////////////////////////////////////////

function nextExploreQuestion(){

    exploreIndex++;

    if(exploreIndex >= currentExploreQuiz.length){

        finishExplore();

        return;

    }

    // 🌸 前の結果を消す
    document.getElementById("exploreResult").style.display = "none";
    document.getElementById("exploreResult").innerHTML = "";

    document.getElementById("nextExploreBtn").style.display = "none";

    showExploreQuiz();

}

/////////////////////////////////////////////////////
// Phase5
// 佐渡市探検クリア
/////////////////////////////////////////////////////

function finishSadoExplore() {

    document.getElementById("exploreQuestion").innerHTML = "";

    document.getElementById("exploreChoices").innerHTML = "";

    document.getElementById("exploreResult").style.display = "block";

    document.getElementById("exploreResult").innerHTML = `
        <h2>🎉 やったね！</h2>

        <h3>🐦 佐渡市探検成功！</h3>

        <p>
            トキ<br>
            佐渡金山<br>
            たらい舟
        </p>

        <p>
            🌸 また一つ新潟県のことが分かったね♪
        </p>

        <h3>
            次はどこへ探検に行こう？
        </h3>
    `;

    document.getElementById("nextExploreBtn").style.display = "none";

    // 🌸 追加
    document.getElementById("backToMapBtn").style.visibility = "visible";

}

/////////////////////////////////////////////////////
// Phase5
// 探検クリア 共通
/////////////////////////////////////////////////////

function finishExplore() {

    document.getElementById("exploreQuestion").innerHTML = "";

    document.getElementById("exploreChoices").innerHTML = "";

    document.getElementById("exploreResult").style.display = "block";


    document.getElementById("exploreResult").innerHTML = `
        <h2>🎉 やったね！</h2>

        <h3>🗾 探検成功！</h3>

        <p>
            🌸 新しい発見が増えたね！
        </p>

        <p>
            また一つ新潟県のことが分かったね♪
        </p>

        <h3>
            次はどこへ探検に行こう？
        </h3>
    `;


    document.getElementById("nextExploreBtn").style.display = "none";


    document.getElementById("backToMapBtn").style.visibility = "visible";

}



/////////////////////////////////////////////////////
// 🌸 教科選択へ戻る
/////////////////////////////////////////////////////

function backToSubject(){

    clearScreens();

    document.getElementById("socialHome").style.display = "none";
    document.getElementById("exploreQuizArea").style.display = "none";
    document.getElementById("japanChallengeArea").style.display = "none";

    document.getElementById("subjectArea").style.display = "block";

}
/////////////////////////////////////////////////////
// 🌸 Engine12
// 社会科ホーム表示
/////////////////////////////////////////////////////

function openSocialHome(){

    document.getElementById("subjectArea").style.display = "none";

    document.getElementById("socialHome").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌏 全国チャレンジ画面
/////////////////////////////////////////////////////

function openNationArea(){

    document.getElementById("socialHome").style.display = "none";

    document.getElementById("nationArea").style.display = "block";

}

// =========================
// 🌏 全国チャレンジ
// =========================

console.log(document.getElementById("nationBtn"));
console.log(document.getElementById("grade4SocialBtn"));

document.getElementById("nationBtn").onclick = function () {

    openNationArea();

};

/////////////////////////////////////////////////////
// 🌸 地方チャレンジ画面
/////////////////////////////////////////////////////

function openRegionChallenge(){

    console.log("🌸 地方チャレンジ開始");

    // 画面切替
    document.getElementById("socialHome").style.display = "none";

    document.getElementById("regionChallengeArea").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌸 都道府県チャレンジ画面
/////////////////////////////////////////////////////

function openPrefectureChallenge(){

    console.log("🌸 都道府県チャレンジ開始");

    clearScreens();

    document.getElementById("prefectureChallengeArea").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌸 Sakura Challenge Home
/////////////////////////////////////////////////////

function openChallengeHome(){

    console.log("🏆 Sakura Challenge");

    clearScreens();

    document.getElementById("challengeHomeArea").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌸 算数チャレンジ画面
/////////////////////////////////////////////////////
function openMathChallenge(){

    alert("📐 算数チャレンジ\n\nPhase14-3で作成します。");

}

/////////////////////////////////////////////////////
// 🌸 社会チャレンジ画面
/////////////////////////////////////////////////////
function openSocialChallenge(){

    alert("🗾 社会チャレンジ\n\nPhase14-3で作成します。");

}

/////////////////////////////////////////////////////
// 🌸 全国チャレンジ画面
/////////////////////////////////////////////////////
function openJapanChallenge(){

    alert("🌍 全国チャレンジ\n\nPhase14-3で作成します。");

}

/////////////////////////////////////////////////////
// 🌸 オープンチャレンジ画面
/////////////////////////////////////////////////////
function openMathChallengeCourse() {

    clearScreens();

    document.getElementById("challengeCourseArea").style.display = "block";

}


/////////////////////////////////////////////////////
// 🌸 戻る
/////////////////////////////////////////////////////
function backToChallengeHome() {

    openChallengeHome();

}

/////////////////////////////////////////////////////
// 🌸 Challenge コース選択
/////////////////////////////////////////////////////
function startBeginnerCourse() {

    challengeType = "math";
    challengeCount = 10;
    challengeCourse = "🌱 Beginner";

       startMathChallenge();

}

function startBronzeCourse() {

    challengeType = "math";
    challengeCount = 20;
    challengeCourse = "🥉 Bronze";

        startMathChallenge();

}

function startSilverCourse(){

    challengeType = "math";
    challengeCount = 30;
    challengeCourse = "🥈 Silver";

    startMathChallenge();

}

function startGoldCourse() {

    challengeType = "math";
    challengeCount = 40;
    challengeCourse = "🥇 Gold";

    startMathChallenge();

}

function startMasterCourse() {

    challengeType = "math";
    challengeCount = 50;
    challengeCourse = "👑 Master";

    startMathChallenge();

}

/////////////////////////////////////////////////////
// 🌸 算数Challenge開始
/////////////////////////////////////////////////////

function startMathChallenge(){

    console.log("🏆 算数Challenge開始");
    console.log("教科:", challengeType);
    console.log("問題数:", challengeCount);

    // 🌸 Challengeの問題数を設定
    maxQuestions = challengeCount;

    document.getElementById("challengeCourseArea").style.display = "none";

    startQuiz(currentUnit, challengeCount);

}

/////////////////////////////////////////////////////
// 🌸 Engine20
// 学習レポート表示
/////////////////////////////////////////////////////

function showStudyRecord() {

    // 🌸 画面を整理
    clearScreens();

    // 🌸 ユーザー名
    const userText =
        document.getElementById("studyRecordUser");

    if (userText && currentUser) {
        userText.textContent =
            `👤 ${currentUser.name} さん`;
    }

    // 🌸 算数
    const math =
        studyRecord.math;

    const mathRate =
        math.answered > 0
            ? Math.round(
                math.correct / math.answered * 100
              )
            : 0;

    const mathMinutes =
        Math.floor(math.studyTime / 60000);

    const mathSeconds =
        Math.floor(
            (math.studyTime % 60000) / 1000
        );

    document.getElementById("mathRecordText").innerHTML = `
        回答数：${math.answered}問<br>
        正解数：${math.correct}問<br>
        正解率：${mathRate}％<br>
        学習時間：${mathMinutes}分${mathSeconds}秒
    `;
        // 🌸 Engine20 Phase10
// 算数・単元別学習記録

const mathUnitText =
    document.getElementById("mathUnitRecordText");

if (mathUnitText) {

    const units = math.units || {};

    const unitNames = Object.keys(units);

    if (unitNames.length === 0) {

        mathUnitText.innerHTML =
            "まだ学習した単元はありません。";

    } else {

        mathUnitText.innerHTML =
            unitNames.map(unitName => {

                const unit = units[unitName];

                const unitRate =
    unit.answered > 0
        ? Math.round(
            unit.correct / unit.answered * 100
          )
        : 0;

        return `
        <div class="mathUnitRecord">
        <strong>${unitName}</strong><br>
        回答数：${unit.answered}問　
        正解数：${unit.correct}問　
        正解率：${unitRate}％
    </div>
    `;


            }).join("");
    }
}

    // 🌸 社会
    const social =
        studyRecord.social;

    const socialRate =
        social.answered > 0
            ? Math.round(
                social.correct / social.answered * 100
              )
            : 0;

    const socialMinutes =
        Math.floor(social.studyTime / 60000);

    const socialSeconds =
        Math.floor(
            (social.studyTime % 60000) / 1000
        );

    document.getElementById("socialRecordText").innerHTML = `
        回答数：${social.answered}問<br>
        正解数：${social.correct}問<br>
        正解率：${socialRate}％<br>
        学習時間：${socialMinutes}分${socialSeconds}秒
    `;
        // 🌸 Engine20 Phase14
// 社会・単元別学習記録

const socialUnitText =
    document.getElementById("socialUnitRecordText");

if (socialUnitText) {

    const units = social.units || {};

    const unitNames = Object.keys(units);

    if (unitNames.length === 0) {

        socialUnitText.innerHTML =
            "まだ学習した単元はありません。";

    } else {

        socialUnitText.innerHTML =
            unitNames.map(unitName => {

                const unit = units[unitName];

                const unitRate =
                    unit.answered > 0
                        ? Math.round(
                            unit.correct / unit.answered * 100
                          )
                        : 0;

                return `
                <div class="socialUnitRecord">
                    <strong>${unitName}</strong><br>
                    回答数：${unit.answered}問　
                    正解数：${unit.correct}問　
                    正解率：${unitRate}％
                </div>
                `;

            }).join("");
    }
}

        // 🌸 国語
    const kokugo =
        studyRecord.kokugo;

    const kokugoRate =
        kokugo.answered > 0
            ? Math.round(
                kokugo.correct / kokugo.answered * 100
              )
            : 0;

    const kokugoMinutes =
        Math.floor(kokugo.studyTime / 60000);

    const kokugoSeconds =
        Math.floor(
            (kokugo.studyTime % 60000) / 1000
        );

    document.getElementById("kokugoRecordText").innerHTML = `
        回答数：${kokugo.answered}問<br>
        正解数：${kokugo.correct}問<br>
        正解率：${kokugoRate}％<br>
        学習時間：${kokugoMinutes}分${kokugoSeconds}秒
    `;

    // 🌸 Engine20
    // 国語・単元別学習記録

    const kokugoUnitText =
        document.getElementById("kokugoUnitRecordText");

    if (kokugoUnitText) {

        const units = kokugo.units || {};

        const unitNames = Object.keys(units);

        if (unitNames.length === 0) {

            kokugoUnitText.innerHTML =
                "まだ学習した単元はありません。";

        } else {

            kokugoUnitText.innerHTML =
                unitNames.map(unitName => {

                    const unit = units[unitName];

                    const unitRate =
                        unit.answered > 0
                            ? Math.round(
                                unit.correct /
                                unit.answered * 100
                              )
                            : 0;

                    return `
                    <div class="kokugoUnitRecord">
                        <strong>${unitName}</strong><br>
                        回答数：${unit.answered}問　
                        正解数：${unit.correct}問　
                        正解率：${unitRate}％
                    </div>
                    `;

                }).join("");
        }
    }

    // 🌸 理科
    const rika =
        studyRecord.rika || { answered: 0, correct: 0, studyTime: 0, units: {} };

    const rikaRate =
        rika.answered > 0
            ? Math.round(
                rika.correct / rika.answered * 100
              )
            : 0;

    const rikaMinutes =
        Math.floor(rika.studyTime / 60000);

    const rikaSeconds =
        Math.floor(
            (rika.studyTime % 60000) / 1000
        );

    const rikaRecordTextEl =
        document.getElementById("rikaRecordText");

    if (rikaRecordTextEl) {

        rikaRecordTextEl.innerHTML = `
            回答数：${rika.answered}問<br>
            正解数：${rika.correct}問<br>
            正解率：${rikaRate}％<br>
            学習時間：${rikaMinutes}分${rikaSeconds}秒
        `;
    }

    // 🌸 理科・単元別学習記録

    const rikaUnitText =
        document.getElementById("rikaUnitRecordText");

    if (rikaUnitText) {

        const units = rika.units || {};

        const unitNames = Object.keys(units);

        if (unitNames.length === 0) {

            rikaUnitText.innerHTML =
                "まだ学習した単元はありません。";

        } else {

            rikaUnitText.innerHTML =
                unitNames.map(unitName => {

                    const unit = units[unitName];

                    const unitRate =
                        unit.answered > 0
                            ? Math.round(
                                unit.correct /
                                unit.answered * 100
                              )
                            : 0;

                    return `
                    <div class="rikaUnitRecord">
                        <strong>${unitName}</strong><br>
                        回答数：${unit.answered}問
                        正解数：${unit.correct}問
                        正解率：${unitRate}％
                    </div>
                    `;

                }).join("");
        }
    }

    // 🌸 英語
    const english =
        studyRecord.english || { answered: 0, correct: 0, studyTime: 0, units: {} };

    const englishRate =
        english.answered > 0
            ? Math.round(
                english.correct / english.answered * 100
              )
            : 0;

    const englishMinutes =
        Math.floor(english.studyTime / 60000);

    const englishSeconds =
        Math.floor(
            (english.studyTime % 60000) / 1000
        );

    const englishRecordTextEl =
        document.getElementById("englishRecordText");

    if (englishRecordTextEl) {

        englishRecordTextEl.innerHTML = `
            回答数：${english.answered}問<br>
            正解数：${english.correct}問<br>
            正解率：${englishRate}％<br>
            学習時間：${englishMinutes}分${englishSeconds}秒
        `;
    }

    // 🌸 英語・単元別学習記録

    const englishUnitText =
        document.getElementById("englishUnitRecordText");

    if (englishUnitText) {

        const units = english.units || {};

        const unitNames = Object.keys(units);

        if (unitNames.length === 0) {

            englishUnitText.innerHTML =
                "まだ学習した単元はありません。";

        } else {

            englishUnitText.innerHTML =
                unitNames.map(unitName => {

                    const unit = units[unitName];

                    const unitRate =
                        unit.answered > 0
                            ? Math.round(
                                unit.correct /
                                unit.answered * 100
                              )
                            : 0;

                    return `
                    <div class="rikaUnitRecord">
                        <strong>${unitName}</strong><br>
                        回答数：${unit.answered}問
                        正解数：${unit.correct}問
                        正解率：${unitRate}％
                    </div>
                    `;

                }).join("");
        }
    }

    // 🌸 Sakura Point
    const pointText =
        document.getElementById("studyRecordPoint");

    if (pointText && currentUser) {
        pointText.textContent =
            `${currentUser.point || 0}P`;
    }

    // 🌸 学習レポート表示
    const recordArea =
        document.getElementById("studyRecordArea");

    if (recordArea) {
        recordArea.style.display = "block";
    }

    console.log(
        "🌸 学習レポート表示:",
        studyRecord
    );
}


/////////////////////////////////////////////////////
// 🌸 教科選択へ戻る
/////////////////////////////////////////////////////

function backToSubjectHome(){

    clearScreens();

    document.getElementById("subjectArea").style.display = "block";

}
/////////////////////////////////////////////////////
// 🌸 社会ホームへ戻る
/////////////////////////////////////////////////////

function backToSocialHome(){

    console.count("backToSocialHome");

    clearScreens();

    document.getElementById("socialHome").style.display = "block";

}

/////////////////////////////////////////////////////
// 🌸 Engine12 終了
/////////////////////////////////////////////////////

function finishJapanChallenge(){

    clearScreens();

    document.getElementById("japanFinishArea").style.display = "block";

    document.getElementById("japanResultText").innerHTML = `
        <h3>${currentJapanQuiz.length}問中 ${japanScore}問正解！</h3>

        <p>
        正答率
        ${Math.round(japanScore/currentJapanQuiz.length*100)}％
        </p>
    `;

}

/////////////////////////////////////////////////////
// 🌸 Engine13
// 入力正規化
/////////////////////////////////////////////////////

function normalizeAnswer(text){

    return String(text)

        // 前後の空白削除
        .trim()

        // 全角スペース → 半角スペース
        .replace(/\u3000/g, " ")

        // 連続スペース削除
        .replace(/\s+/g, "")

        // 「あまり」の前後の空白を削除
        .replace(/\s*あまり\s*/g, "あまり")

        // 全角数字 → 半角数字
        .replace(/[０-９]/g, s =>
            String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
        )

        // 全角小数点 → 半角小数点
.replace(/．/g, ".")

// 半角・全角カンマ・半角読点 → 日本語の区切り「、」
.replace(/[,，､]/g, "、")

// 全角英字 x → 半角 x
.replace(/[ｘＸ]/g, "x")

// 全角イコール → 半角 =
.replace(/＝/g, "=")
// 🌸 全角・半角括弧を統一
.replace(/（/g, "(")
.replace(/）/g, ")")
        // 全角演算記号 → 半角
        .replace(/＋/g, "+")
        .replace(/－/g, "-")
        .replace(/ー/g, "-")
        .replace(/／/g, "/")
        // 全角英字 → 半角英字
        .replace(/[Ａ-Ｚａ-ｚ]/g, s =>
        String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
)
        
        // 全角英字の単位 → 半角
        .replace(/[ｃＣ][ｍＭ]/g, "cm")
        .replace(/[ｋＫ][ｇＧ]/g, "kg")
        .replace(/[ｋＫ][ｍＭ]/g, "km")
        .replace(/[ｇＧ]/g, "g")
        .replace(/[ｌＬ]/g, "L")    

        // 語尾の単位を吸収
        .replace(/kg$/i, "")
        .replace(/cm$/i, "")
        .replace(/km$/i, "")
        .replace(/mm$/i, "")
        .replace(/m$/i, "")
        .replace(/g$/i, "")
        .replace(/l$/i, "")

        .replace(/時$/, "")
        .replace(/じ$/, "")

        .replace(/度$/, "")
        .replace(/ど$/, "")

        .replace(/円$/, "")
        .replace(/えん$/, "")

        .replace(/個$/, "")
        .replace(/こ$/, "")
        .replace(/コ$/, "")

        // 余り → あまり
        .replace(/余り/g, "あまり")

        // 最後にもう一度「あまり」を正規化
        .replace(/\s*あまり\s*/g, "あまり");

}

/////////////////////////////////////////////////////
// 🌸 Engine13
// 回答判定（中1数学・π対応 完成版）
/////////////////////////////////////////////////////

function checkAnswer(question, raw) {

    const ans =
        normalizeAnswer(raw);

    let correct;

    if (Array.isArray(question.a)) {

        correct = question.a;

    } else {

        correct =
            normalizeAnswer(question.a);

    }


    // =========================
    // 🌸 πを含む答え
    // =========================

    if (
        typeof question.a === "string" &&
        /π|pi/i.test(question.a)
    ) {

        return checkPiAnswer(
            question.a,
            ans
        );

    }


    // =========================
    // 🌸 問題タイプ別
    // =========================

    switch (question.type) {

        case "remainder":

            return checkRemainder(
                correct,
                ans
            );


        case "geometry":

            return checkGeometry(
                correct,
                ans
            );


        case "fraction":

            return checkFraction(
                correct,
                ans
            );


        default:

            return checkNormal(
                correct,
                ans
            );

    }

}

/////////////////////////////////////////////////////
// 🌸 中1数学
// πを含む図形問題の判定
/////////////////////////////////////////////////////

function checkPiAnswer(correct, answer) {

    function normalizePi(value) {

        return String(value)

            .trim()

            .replace(/\s+/g, "")

            // π / pi を統一
            .replace(/pi/gi, "π")

            // 全角記号
            .replace(/＋/g, "+")
            .replace(/－/g, "-")

            // 単位表記統一
            .replace(/㎠/g, "cm²")
            .replace(/㎤/g, "cm³")
            .replace(/cm2$/i, "cm²")
            .replace(/cm3$/i, "cm³");

    }


    const correctValue =
        normalizePi(correct);

    const answerValue =
        normalizePi(answer);


    // =========================
    // 🌸 完全一致
    // =========================

    if (
        answerValue === correctValue
    ) {

        return true;

    }


    // =========================
    // 🌸 単位なしも許可
    // 例：
    // 45πcm³ ↔ 45π
    // =========================

    const stripUnit = value => {

        return value
            .replace(/cm²$/i, "")
            .replace(/cm³$/i, "")
            .replace(/cm$/i, "");

    };


    return (
        stripUnit(answerValue) ===
        stripUnit(correctValue)
    );

}


/////////////////////////////////////////////////////
// 通常判定
/////////////////////////////////////////////////////

function checkNormal(correct, ans){

    return Number(ans) === Number(correct)
        || ans === correct;

}

/////////////////////////////////////////////////////
// 🌸 全教科共通・記述式の「揺らぎ判定」
//
// 完全一致でなくても、答えの核心部分が
// 合っていれば正解として扱う。
// 例）正解「強くなる」→「強く」でも正解
// 例）正解「電磁石」→「電磁石になる」でも正解
//
// 数字の答え（算数など）には使わない：
// 「120」に対して「12」を正解にしてしまうと
// 算数の練習として意味がなくなるため、
// 正解が数値（または数値の文字列）のときは
// 必ず false を返し、通常の完全一致判定に任せる。
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 漢字 → ひらがな（読み）変換テーブル
//
// 正解が漢字で書かれていても、ひらがなで
// 答えた場合も正解にするための「読み」対応表。
// （例）正解「水」→ ユーザーが「みず」と入力しても正解
//
// すべての漢字を網羅するものではなく、理科・国語などの
// ドリルでよく出てくる単語を中心に登録している。
// 登録されていない漢字はそのまま（変換されない）ので、
// 未登録語があっても安全に動作する。
/////////////////////////////////////////////////////

const KANJI_READING_MAP = {
    "水": "みず",
    "空気": "くうき",
    "北": "きた",
    "南": "みなみ",
    "西から東へ": "にしからひがしへ",
    "西": "にし",
    "東": "ひがし",
    "春": "はる",
    "夏": "なつ",
    "秋": "あき",
    "冬": "ふゆ",
    "胸": "むね",
    "葉": "は",
    "骨": "ほね",
    "熱": "ねつ",
    "鉄": "てつ",
    "金属": "きんぞく",
    "電流": "でんりゅう",
    "直進": "ちょくしん",
    "回路": "かいろ",
    "極": "きょく",
    "乾電池": "かんでんち",
    "反射光": "はんしゃこう",
    "外骨格": "がいこっかく",
    "子葉": "しよう",
    "完全変態": "かんぜんへんたい",
    "不完全変態": "ふかんぜんへんたい",
    "磁石になる": "じしゃくになる",
    "黒い紙": "くろいかみ",
    "長い": "ながい",
    "通さない": "とおさない",
    "引き合う": "ひきあう",
    "振動している": "しんどうしている",
    "熱くなる": "あつくなる",
    "明るく": "あかるく",
    "反対になる": "はんたいになる",
    "大きくなる": "おおきくなる",
    "小さくなる": "ちいさくなる",
    "小さくてすむ": "ちいさくてすむ",
    "縮む": "ちぢむ",
    "強くなる": "つよくなる",
    "弱くなる": "よわくなる",
    "多くなる": "おおくなる",
    "短くなる": "みじかくなる",
    "長くなる": "ながくなる",
    "冬眠": "とうみん",
    "星座早見": "せいざはやみ",
    "晴れの日": "はれのひ",
    "校庭の土": "こうていのつち",
    "検流計": "けんりゅうけい",
    "湯気": "ゆげ",
    "直列つなぎ": "ちょくれつつなぎ",
    "へい列つなぎ": "へいれつつなぎ",
    "筋肉": "きんにく",
    "紅葉して落ちる": "こうようしておちる",
    "蒸発": "じょうはつ",
    "関節": "かんせつ",
    "雲の量": "くものりょう",
    "上流": "じょうりゅう",
    "下流": "かりゅう",
    "台風の目": "たいふうのめ",
    "周期": "しゅうき",
    "外側": "そとがわ",
    "子宮": "しきゅう",
    "振り子の長さ": "ふりこのながさ",
    "日光と肥料": "にっこうとひりょう",
    "水よう液": "すいようえき",
    "洪水": "こうずい",
    "精子": "せいし",
    "羊水": "ようすい",
    "運ぱん": "うんぱん",
    "適当な温度": "てきとうなおんど",
    "雲の広がりや動き": "くものひろがりやうごき",
    "電磁石": "でんじしゃく",
    "青むらさき色": "あおむらさきいろ",
    "しん食": "しんしょく",
    "たい積岩": "たいせきがん",
    "たい積": "たいせき",
    "ヨウ素液": "ようそえき",
    "しゅう曲": "しゅうきょく",
    "じん臓": "じんぞう",
    "だ液": "だえき",
    "つぶの大きい物": "つぶのおおきいもの",
    "二酸化炭素": "にさんかたんそ",
    "作用点": "さようてん",
    "光合成": "こうごうせい",
    "力点": "りきてん",
    "助けない": "たすけない",
    "化石": "かせき",
    "同じ": "おなじ",
    "地層": "ちそう",
    "地震": "じしん",
    "小腸": "しょうちょう",
    "師管": "しかん",
    "心臓": "しんぞう",
    "支点": "してん",
    "断層": "だんそう",
    "植物": "しょくぶつ",
    "気孔": "きこう",
    "消化管": "しょうかかん",
    "消化": "しょうか",
    "減る": "へる",
    "火成岩": "かせいがん",
    "発電": "はつでん",
    "白くにごる": "しろくにごる",
    "石灰水": "せっかいすい",
    "節電": "せつでん",
    "肺胞": "はいほう",
    "胃液": "いえき",
    "蒸散": "じょうさん",
    "血液の循環": "けつえきのじゅんかん",
    "道管": "どうかん",
    "酸性": "さんせい",
    "酸素": "さんそ",
    "電気の利用": "でんきのりよう",
    "食物連鎖": "しょくもつれんさ",
    "環境": "かんきょう",
    "中性": "ちゅうせい",
    "炭酸水": "たんさんすい"
};

// 🌸 長い語から先に置換することで、
// 「洪水」→「水」のように短い語に部分一致して
// 誤変換してしまうのを防ぐ
const KANJI_READING_KEYS =
    Object.keys(KANJI_READING_MAP)
        .sort((a, b) => b.length - a.length);

function applyKanjiReadings(text) {

    let result = String(text);

    KANJI_READING_KEYS.forEach(key => {

        if (result.includes(key)) {

            result =
                result.split(key).join(KANJI_READING_MAP[key]);

        }

    });

    return result;

}

function normalizeForFuzzyMatch(text) {

    return String(text)
        .trim()
        // 🌸 半角・全角の空白を除去
        .replace(/[\s　]/g, "")
        // 🌸 文末の記号を除去（。、.,！!？?）
        .replace(/[。、.,！!？?]/g, "")
        // 🌸 全角数字を半角に統一
        .replace(
            /[０-９]/g,
            ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
        );

}

// 🌸 「つぶが大きい土（すな）」のように、正解の中に
// 括弧つきの別解・言い換え（すな、影、はかり…）が
// 含まれている場合、括弧の中身や、括弧を取り除いた
// 本文もそれぞれ正解として扱えるように候補を展開する。
function extractAnswerVariants(correctAnswer) {

    const text = String(correctAnswer);

    const variants = [text];

    const parenPattern = /[（(]([^（）()]*)[）)]/g;

    let match;

    while ((match = parenPattern.exec(text)) !== null) {

        const inner = match[1].trim();

        if (inner) {
            variants.push(inner);
        }

    }

    const base = text.replace(parenPattern, "").trim();

    if (base && base !== text) {
        variants.push(base);
    }

    return variants;

}

// 🌸 揺らぎ判定の本体（括弧の展開は行わず、
// 1つの正解候補テキストに対してだけ判定する）
function coreFuzzyMatch(userAnswer, correctText) {

    const user =
        normalizeForFuzzyMatch(userAnswer);

    const correct =
        normalizeForFuzzyMatch(correctText);

    if (user === "" || correct === "") {
        return false;
    }

    if (user === correct) {
        return true;
    }

    // 🌸 漢字とひらがな（読み）の表記ゆれを許容する
    // 例）正解「水」→ ユーザーが「みず」と答えても正解
    const userReading =
        normalizeForFuzzyMatch(
            applyKanjiReadings(userAnswer)
        );

    const correctReading =
        normalizeForFuzzyMatch(
            applyKanjiReadings(correctText)
        );

    if (
        userReading !== "" &&
        userReading === correctReading
    ) {

        return true;

    }

    // 🌸 答えの半分以上（最低2文字）を正しく書けていれば
    // 「核心をとらえている」とみなす
    const minLen =
        Math.max(
            2,
            Math.ceil(correct.length * 0.5)
        );

    // 例）正解「強くなる」→ ユーザーが「強く」と書いた場合
    if (
        user.length >= minLen &&
        correct.startsWith(user)
    ) {

        return true;

    }

    // 例）正解「新月」→ ユーザーが「新月です」と書いた場合
    if (
        correct.length >= 2 &&
        user.startsWith(correct)
    ) {

        return true;

    }

    // 🌸 読み（ひらがな変換後）でも同様の部分一致を確認する
    // 例）正解「強くなる」の読みに対し「つよく」と答えた場合など、
    // 　　漢字・ひらがなが混在していても核心をとらえていれば正解にする
    if (correctReading !== "") {

        const minLenReading =
            Math.max(
                2,
                Math.ceil(correctReading.length * 0.5)
            );

        if (
            userReading.length >= minLenReading &&
            correctReading.startsWith(userReading)
        ) {

            return true;

        }

        if (
            correctReading.length >= 2 &&
            userReading.startsWith(correctReading)
        ) {

            return true;

        }

    }

    return false;

}

function isFuzzyTextMatch(userAnswer, correctAnswer) {

    // 🌸 数字・比（3:4）・分数（4/5）・単位付き数値（1m10cm）など
    // 「構造がきっちり決まった答え」には揺らぎ判定を使わない。
    // 漢字・ひらがなだけの、文章としての答えのときだけ使う。
    if (
        typeof correctAnswer === "number" ||
        /[0-9０-９:：/／]/.test(
            String(correctAnswer).trim()
        )
    ) {

        return false;

    }

    // 🌸 括弧つきの別解（例：「つぶが大きい土（すな）」の「すな」）も
    // 候補として展開し、いずれかに一致すれば正解とする
    const variants =
        extractAnswerVariants(correctAnswer);

    return variants.some(
        variant => coreFuzzyMatch(userAnswer, variant)
    );

}

/////////////////////////////////////////////////////
// あまり判定
/////////////////////////////////////////////////////

function checkRemainder(correct, ans){

    return ans === correct;

}

/////////////////////////////////////////////////////
// 分数判定（Phase2では通常判定）
/////////////////////////////////////////////////////

function checkFraction(correct, ans){

    return ans === correct;

}

/////////////////////////////////////////////////////
// 図形判定
/////////////////////////////////////////////////////

function checkGeometry(correct, ans){

    if(Array.isArray(correct)){

        return correct
            .map(x => normalizeAnswer(x))
            .includes(ans);

    }

    return ans === normalizeAnswer(correct);

}

/////////////////////////////////////////////////////
// 🌸 学年別社会 終了
/////////////////////////////////////////////////////

function finishSocialChallenge(){

    const rate =
        Math.round((socialScore / currentSocialQuiz.length) * 100);

    let comment = "";

    if(rate === 100){

        comment = "🌸 すばらしい！満点だね！";

    }else if(rate >= 80){

        comment = "🌸 とてもよくできました！";

    }else if(rate >= 60){

        comment = "🌸 あと少し！もう一度挑戦してみよう！";

    }else{

        comment = "🌸 大丈夫！ゆっくり覚えていこう！";

    }

    // 🌸 全画面を閉じる
    clearScreens();

    // 🌸 結果画面だけ表示
    document.getElementById("socialResultArea").style.display = "block";

    // 🌸 結果表示
    document.getElementById("socialResultText").innerHTML = `
        <h3>🎉 おつかれさまでした！</h3>

        <p>10問中 <strong>${socialScore}</strong> 問正解！</p>

        <p>正答率 <strong>${rate}%</strong></p>

        <p>${comment}</p>
    `;
    // 🌸 社会・復習ボタン
if (socialWrongList.length > 0) {

    document.getElementById("socialResultText").innerHTML += `

        <p style="margin-top:20px;">
            📚 <strong>まだ復習していない問題があります。</strong><br>
            復習して、もう一度覚えてみよう！
        </p>

        <button
            onclick="startSocialReview()"
            style="margin-top:10px;">
            📚 間違えた問題を復習する
        </button>

    `;

}
}

/////////////////////////////////////////////////////
// 🌸 社会・復習開始
/////////////////////////////////////////////////////

function startSocialReview() {

    if (socialWrongList.length === 0) {

        alert("🌸 復習する問題はありません！");

        return;
    }

    socialReviewMode = true;

    socialReviewList = [...socialWrongList];

    socialReviewIndex = 0;

    // 🌸 結果画面を閉じる
    clearScreens();

    // 🌸 社会クイズ画面を表示
    document.getElementById("socialQuizArea").style.display = "block";

    showSocialReviewQuestion();

}

/////////////////////////////////////////////////////
// 🌸 社会・復習問題表示
/////////////////////////////////////////////////////

function showSocialReviewQuestion() {

    const record =
        socialReviewList[socialReviewIndex];

    if (!record) return;

    console.log(
        "🌸 社会復習問題:",
        record
    );

    // 🌸 問題表示
    document.getElementById("socialProgress").textContent =
        `📚 復習 ${socialReviewIndex + 1}/${socialReviewList.length}`;

    document.getElementById("socialQuestion").textContent =
        record.question;

    // 🌸 前回の解説を消す
    document.getElementById("socialMemo").innerHTML = "";

    // 🌸 次へボタンを隠す
    document.getElementById("nextSocialBtn").style.display = "none";

    // 🌸 選択肢エリア
    const choicesArea =
        document.getElementById("socialChoices");

    choicesArea.innerHTML = "";

    // 🌸 元の問題から3択を取得
    const sourceQuestion =
        currentSocialQuiz.find(
            q => q.q === record.question
        );

    if (!sourceQuestion) {

        console.error(
            "🌸 社会復習：元問題が見つかりません",
            record.question
        );

        return;
    }

    const shuffledChoices =
        showChoices(
            sourceQuestion,
            currentSocialQuiz
        );

    shuffledChoices.forEach(choice => {

        const btn =
            document.createElement("button");

        btn.className =
            "challengeChoice";

        btn.textContent =
            choice;

        btn.onclick = function(){

            checkSocialReviewAnswer(choice);

        };

        choicesArea.appendChild(btn);

    });

}

/////////////////////////////////////////////////////
// 🌸 社会・復習回答判定
/////////////////////////////////////////////////////

function checkSocialReviewAnswer(answer) {

    const buttons =
        document.querySelectorAll("#socialChoices button");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    const currentReview =
        socialReviewList[socialReviewIndex];

    if (!currentReview) return;

    const nextBtn =
        document.getElementById("nextSocialBtn");

    const memo =
        document.getElementById("socialMemo");

    if (answer === currentReview.correct) {

        memo.innerHTML = `
            <h3>⭕ 正解！</h3>

            <p>
                📖 <strong>解説</strong>
            </p>

            <p>
                ${currentReview.memo || "この問題の解説はありません。"}
            </p>
        `;

        playSound("correct");

        // 🌸 正解した復習問題は復習リストから削除
        socialWrongList =
            socialWrongList.filter(item =>
                item.question !== currentReview.question
            );

        console.log(
            "🌸 社会復習正解 → socialWrongList更新",
            socialWrongList
        );

    } else {

        memo.innerHTML = `
            <h3>❌ 不正解</h3>

            <p>
                正解は
                <strong>${currentReview.correct}</strong>
                です。
            </p>

            <p>
                📖 <strong>解説</strong>
            </p>

            <p>
                ${currentReview.memo || "この問題の解説はありません。"}
            </p>
        `;

        playSound("wrong");

    }

    nextBtn.style.display = "block";

   // 🌸 社会復習・次の問題
nextBtn.onclick = function () {

    socialReviewIndex++;

    // 🌸 まだ今回の復習リストに問題が残っている
    if (
        socialReviewIndex <
        socialReviewList.length
    ) {

        showSocialReviewQuestion();

        return;
    }

    // 🌸 1周終了
    // まだ間違いが残っている場合は、残った問題だけ再復習
    if (socialWrongList.length > 0) {

        console.log(
            "🌸 まだ復習が必要:",
            socialWrongList
        );

        socialReviewList =
            [...socialWrongList];

        socialReviewIndex = 0;

        showSocialReviewQuestion();

        return;
    }

    // 🌸 全問題を正解して復習完了
    socialReviewMode = false;

    clearScreens();

    document.getElementById(
        "socialResultArea"
    ).style.display = "block";

    document.getElementById(
        "socialResultText"
    ).innerHTML = `
        <h3>🌸 社会の復習が終わりました！</h3>

        <p>
            🎉 すべての問題を正解できました！
        </p>

        <p>
            おつかれさまでした！
        </p>
    `;

    // 🌸 通常社会の次ボタンへ戻す
    nextBtn.onclick = nextSocialQuestion;

};

}

/////////////////////////////////////////////////////
// 🌸 地域チャレンジデータ
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 東北、北海道地方チャレンジデータ
/////////////////////////////////////////////////////

 const hokkaidoTohokuQuestions = [

    ...hokkaidoQuestions,
    ...aomoriQuestions,
    ...iwateQuestions,
    ...miyagiQuestions,
    ...akitaQuestions,
    ...yamagataQuestions,
    ...fukushimaQuestions

];


/////////////////////////////////////////////////////
// 🌸 関東地方チャレンジデータ
/////////////////////////////////////////////////////

const kantoQuestions = [

    ...ibarakiQuestions,
    ...tochigiQuestions,
    ...gunmaQuestions,
    ...saitamaQuestions,
    ...chibaQuestions,
    ...tokyoQuestions,
    ...kanagawaQuestions

];

/////////////////////////////////////////////////////
// 🌸 中部地方チャレンジデータ
/////////////////////////////////////////////////////
const chubuQuestions = [

    ...niigataQuestions,
    ...toyamaQuestions,
    ...ishikawaQuestions,
    ...fukuiQuestions,
    ...yamanashiQuestions,
    ...naganoQuestions,
    ...gifuQuestions,
    ...shizuokaQuestions,
    ...aichiQuestions

];

/////////////////////////////////////////////////////
// 🌸 近畿地方チャレンジデータ
/////////////////////////////////////////////////////
const kinkiQuestions = [

    ...mieQuestions,
    ...shigaQuestions,
    ...kyotoQuestions,
    ...osakaQuestions,
    ...hyogoQuestions,
    ...naraQuestions,
    ...wakayamaQuestions

];

/////////////////////////////////////////////////////
// 🌸 中国地方チャレンジデータ
/////////////////////////////////////////////////////
const chugokuQuestions = [

    ...tottoriQuestions,
    ...shimaneQuestions,
    ...okayamaQuestions,
    ...hiroshimaQuestions,
    ...yamaguchiQuestions

];

/////////////////////////////////////////////////////
// 🌸 四国地方チャレンジデータ
/////////////////////////////////////////////////////

const shikokuQuestions = [

    ...tokushimaQuestions,
    ...kagawaQuestions,
    ...ehimeQuestions,
    ...kochiQuestions

];

/////////////////////////////////////////////////////
// 🌸 九州・沖縄地方チャレンジデータ
/////////////////////////////////////////////////////

const kyushuQuestions = [

    ...fukuokaQuestions,
    ...sagaQuestions,
    ...nagasakiQuestions,
    ...kumamotoQuestions, 
    ...oitaQuestions, 
    ...miyazakiQuestions, 
    ...kagoshimaQuestions, 
    ...okinawaQuestions 

];
console.log("🌸 script.js 最後まで読み込みました");

/////////////////////////////////////////////////////
// 🌸 Engine16
// 回答形式取得
// 中1数学・入力方式自動判定 完成版
/////////////////////////////////////////////////////

function getAnswerType(question) {

    // =========================
    // 🌸 問題なし
    // =========================

    if (!question) {
        return "number";
    }


    // =========================
    // 🌸 明示された入力方式を最優先
    // =========================

    if (question.inputType) {
        return question.inputType;
    }


    // =========================
    // 🌸 中1数学
    // =========================

    if (question.grade === "中1") {

        const answer =
            question.a;


        // =========================
        // 🌸 πを含む答え
        // =========================

        if (
            typeof answer === "string" &&
            /π|pi/i.test(answer)
        ) {

            return "pi";

        }


        // =========================
        // 🌸 文字式
        // =========================

        if (question.type === "algebra") {

            return "algebra";

        }


        // =========================
        // 🌸 方程式（式を立てて解く）
        // 例：x+7=15、x=8
        // =========================

        if (question.type === "equation") {

            return "equation";

        }


        // =========================
        // 🌸 正負の数
        // =========================

        if (question.type === "integer") {

            return "integer";

        }


        // =========================
        // 🌸 小数
        // =========================

        if (question.type === "decimal") {

            return "decimal";

        }


        // =========================
        // 🌸 分数
        // =========================

        if (question.type === "fraction") {

            return "fraction";

        }


        // =========================
        // 🌸 帯分数
        // =========================

        if (question.type === "mixedFraction") {

            return "mixedFraction";

        }


        // =========================
        // 🌸 あまり
        // =========================

        if (question.type === "remainder") {

            return "remainder";

        }


        // =========================
        // 🌸 立体の体積
        // 例：96cm³ / 45πcm³ / 60
        // πの有無に関わらず、数字＋cm・cm²・cm³が
        // 押せるテンキー（pi）を使う。
        // 🌸 バグ修正：「type: volume」は空間図形の単元全体に
        // 使われていて、「高さ」「同じ数」「長方形」のような
        // 数字以外の用語が答えの問題も混ざっている。答えが
        // 数字（＋単位・π）の形をしている時だけ pi テンキーにし、
        // それ以外は下の数学用語チェックに進ませる。
        // =========================

        if (
            question.type === "volume" &&
            (
                typeof answer === "number" ||
                (
                    typeof answer === "string" &&
                    /^-?\d/.test(answer.trim())
                )
            )
        ) {

            return "pi";

        }


        // =========================
        // 🌸 数値判定
        // 例：
        // 90
        // -6
        // 3.5
        // =========================

        if (
            typeof answer === "number" ||
            (
                typeof answer === "string" &&
                /^-?\d+(?:\.\d+)?$/.test(
                    answer.trim()
                )
            )
        ) {

            return "number";

        }

        // =========================
        // 🌸 分数の倍（比例・反比例など）
        // 例：
        // 1/2倍
        // 2倍
        // =========================

        if (
            typeof answer === "string" &&
            /^\d+(?:\/\d+)?倍$/.test(
                answer.trim()
            )
        ) {

            return "fractionTimes";

        }

        // =========================
        // 🌸 座標
        // 例：
        // (2, 6)
        // (-3, 5)
        // =========================

        if (
            typeof answer === "string" &&
            /^\(\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*\)$/.test(
                answer.trim()
            )
        ) {
            return "coordinate";
        }

        // =========================
        // 🌸 数字以外の中1数学用語
        //
        // 例：
        // 平行
        // 長方形
        // 対称の軸
        // 双曲線
        // 中央値（メジアン）
        // 点対称な図形
        // 図形の移動（合同変換）
        // 高さ
        // 同じ数
        // =========================

        if (
            typeof answer === "string" &&
            answer.trim() !== ""
        ) {

            // 🌸 バグ修正：ここに来る答えが、必ずしも「数学用語12択」
            // （mathWord）に登録された言葉とは限らない。
            // 「1/2倍」のような、計算した数字＋単位の答えの場合は
            // 12択に正解が存在せず、違う選択肢しか出せなくなる。
            // 登録済みの言葉の中にある時だけ12択にして、
            // それ以外はふつうのキーボード入力（text）にする。
            const registeredMathWords =
                mathKeyLayouts.mathWord.filter(
                    key =>
                        key !== "C" &&
                        key !== "←" &&
                        key !== "OK"
                );

            if (registeredMathWords.includes(answer.trim())) {

                return "mathWord";

            }

            return "text";

        }

    }


    // =========================
    // 🌸 既存の小学生処理
    // =========================

    // 🌸 バグ修正：type だけで判断すると、"geometry"（図形）や
    // "time"（時こく）、"word"（文章題）は、実際には数字の答え
    // （例：「三角形のかどの数は？」→3）のことも、文字を含む答え
    // （例：「正方形」「3時20分」「1m10cm」）のこともある。
    // type だけで固定のテンキーに決め打ちせず、まず答え自体が
    // 数字かどうかを見てから、数字でない場合だけ type に応じた
    // 専用の文字テンキーを選ぶようにする。
    const isPlainNumericAnswer =
        typeof question.a === "number" ||
        (
            typeof question.a === "string" &&
            /^-?\d+(?:\.\d+)?$/.test(question.a.trim())
        );

    const looksDecimalAnswer =
        (
            typeof question.a === "number" &&
            !Number.isInteger(question.a)
        ) ||
        (
            typeof question.a === "string" &&
            /^-?\d+\.\d+$/.test(question.a.trim())
        );

    switch (question.type) {

        case "decimal":

            return "decimal";


        case "fraction":

            return "fraction";


        case "mixedFraction":

            return "mixedFraction";


        case "remainder":

            return "remainder";


        // =========================
        // 🌸 バグ修正：図形の名前を答える問題
        // （例：「4つの辺の長さがすべて同じ四角形の名前は？」→「正方形」）が
        // 数字専用テンキーになってしまい、文字が入力できなかった。
        // 三角形・四角形などの漢字が押せる専用テンキー（すでに
        // mathKeyLayouts.textGeometry として用意されていたが、
        // ここから呼び出されていなかった）を使う。
        // ただし「三角形のかどの数は？」のように答えが数字の
        // 場合は、今まで通り数字テンキーのままにする。
        // =========================

        case "geometry":

            if (!isPlainNumericAnswer) {
                return "textGeometry";
            }

            break;


        // =========================
        // 🌸 時こく・時間の答え（「午前」「時」「分」など）も
        // 同じ理由で専用テンキー（textTime）を使う。答えが数字
        // だけ（例：分数で表した時間など）の場合は数字テンキーのまま。
        // =========================

        case "time":

            if (!isPlainNumericAnswer) {
                return "textTime";
            }

            break;

    }

    // =========================
    // 🌸 バグ修正：円の面積・体積など
    // type が "decimal" と明示されていなくても
    // 答えが小数（例：50.24）の場合は
    // 小数点キーのあるテンキーを出す
    // （以前は整数専用テンキーになり、
    //   小数を入力できなかった）
    // =========================

    if (looksDecimalAnswer) {

        return "decimal";

    }

    // =========================
    // 🌸 バグ修正：type に "word"（文章題）などが使われていても、
    // 答えが数字ではない場合は数字専用テンキーでは入力できない。
    // 数字だけの答え（例：700）は今まで通り number のまま。
    // =========================

    if (
        typeof question.a === "string" &&
        question.a.trim() !== "" &&
        !isPlainNumericAnswer
    ) {

        // 🌸 「1m10cm」のように長さの単位（m・cm・mm）を含む
        // 答えは、長さ専用テンキー（textLength）を使う。
        if (/\d\s*(?:m|cm|mm)/.test(question.a)) {
            return "textLength";
        }

        // 🌸 それ以外（まだ専用テンキーが無い答え方）は、
        // ひとまず一番幅広い文字テンキー（text）にしておく。
        return "text";

    }

    return "number";

}

/////////////////////////////////////////////////////
// 🌸 Engine16
// 算数テンキー
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 Engine16
// テンキーレイアウト（中1数学対応 完成版）
/////////////////////////////////////////////////////

const mathKeyLayouts = {

    // =========================
    // 🌸 通常
    // =========================

    number: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","C","←",
        "OK"
    ],


    // =========================
    // 🌸 正負の数
    // =========================

    integer: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","-","C",
        "←","OK"
    ],


    // =========================
    // 🌸 文字と式
    // =========================

    algebra: [

        "7","8","9",

        "4","5","6",

        "1","2","3",

        "0","x","a",

        "+","-","²",

        "(",")","円",

        "C","←","OK"

    ],

    // =========================
    // 🌸 方程式（式を立てて解く）
    // 例：x+7=15、x=8
    // =========================

    equation: [

        "7","8","9",

        "4","5","6",

        "1","2","3",

        "0","x","=",

        "+","-","、",

        "C","←","OK"

    ],

    // =========================
    // 🌸 πを使う図形
    // =========================

    pi: [

        "7","8","9",

        "4","5","6",

        "1","2","3",

        "0","π","C",

        "+","-","cm",

        "cm²","cm³","←",

        "OK"

    ],


    // =========================
    // 🌸 小数
    // =========================

    decimal: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0",".","C","←",
        "OK"
    ],


    // =========================
    // 🌸 分数
    // =========================

    fraction: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","/","C","←",
        "OK"
    ],


    // =========================
    // 🌸 分数の倍（比例・反比例など）
    // 例：1/2倍
    // =========================

    fractionTimes: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","/","倍",
        "C","←","OK"
    ],


    // =========================
    // 🌸 あまり
    // =========================

    remainder: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","あまり","C","←",
        "OK"
    ],


    // =========================
    // 🌸 帯分数
    // =========================

    mixedFraction: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","/","と","C","←",
        "OK"
    ],


    // =========================
    // 🌸 共通文字入力
    // =========================

    text: [
        "三","四","角",
        "形","長","方",
        "正","時","分",
        "午","前","後",
        "C","←","OK"
    ],


    // =========================
    // 🌸 図形文字
    // =========================

    textGeometry: [
        "三","四","角",
        "形","長","方",
        "正","C","←",
        "OK"
    ],


    // =========================
    // 🌸 時刻
    // =========================

    textTime: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","時","時間",
        "分","秒","午前",
        "午後","C","←",
        "OK"
    ],


    // =========================
    // 🌸 長さ
    // =========================

    textLength: [
        "7","8","9",
        "4","5","6",
        "1","2","3",
        "0","m","cm",
        "mm","C","←",
        "OK"
    ],

// =========================
// 🌸 中1数学
// 数学用語テンキー
// =========================

mathWord: [

    "平行",
    "長方形",
    "正方形",

    "原点を通る直線",
    "双曲線",
    "対称の軸",
    "線分",

    "点対称な図形",
    "線対称",
    "図形の移動（合同変換）",

    "合同変換",
    "平均値",
    
    "中央値（メジアン）",
    "最頻値（モード）",
    "同じ数",

    "高さ",

    "底面",
    "半径",
    "直径",

"垂直",
"範囲（レンジ）",
"ヒストグラム",
"相対度数（確率）",
"C",
"←",
"OK"

]

};


/////////////////////////////////////////////////////
// 🌸 Engine16
// テンキー生成
/////////////////////////////////////////////////////

// 🌸 バグ修正：中1数学の「数学用語12択」は、正解を必ず選択肢に
// 入れるために quizState.currentQuestion.a を参照しているが、
// 復習モードでは quizState が更新されないため、正解が選択肢に
// 入らないことがあった。復習モードなど quizState を使わない場面では
// correctAnswerOverride で正解を明示的に渡せるようにする。
function createMathKeypad(type = "number", correctAnswerOverride) {

    const keypad =
        document.getElementById("mathKeypad");
        keypad.classList.toggle("wordMode", type === "mathWord");

    if (!keypad) return;

        keypad.innerHTML = "";

    // 🌸 バグ修正：「✏️ 手入力」ボタンを削除
    // （ユーザー要望により、テンキー入力のみのシンプルな構成へ）

    let layout;

if (type === "mathWord") {

    const currentAnswer =
        correctAnswerOverride !== undefined
            ? correctAnswerOverride
            : quizState.currentQuestion?.a;

    const candidates =
        mathKeyLayouts.mathWord.filter(
            key =>
                key !== "C" &&
                key !== "←" &&
                key !== "OK"
        );

            // 🌸 中1数学・数学用語12択
    // 登録済み数学用語から毎回ランダムに12個選ぶ

    const wordCandidates =
        mathKeyLayouts.mathWord.filter(
            key =>
                key !== "C" &&
                key !== "←" &&
                key !== "OK"
        );

        // 🌸 登録済み数学用語をシャッフル
    const shuffledWords =
        [...wordCandidates].sort(
            () => Math.random() - 0.5
        );

    // 🌸 正解が数学用語の場合は必ず12択に入れる
    if (
        currentAnswer &&
        wordCandidates.includes(currentAnswer)
    ) {

        const wrongCandidates =
            shuffledWords.filter(
                key => key !== currentAnswer
            );

        layout = [
            currentAnswer,
            ...wrongCandidates.slice(0, 11)
        ];

       // 🌸 12個を再シャッフル
layout.sort(
    () => Math.random() - 0.5
);

// 🌸 操作用ボタンを追加
layout.push("C", "←", "OK");

    } else {

        layout = [
    ...shuffledWords.slice(0, 12),
    "C",
    "←",
    "OK"
];

    }

    console.log(
        "🌸 数学用語12択:",
        layout
    );

} else {

    // 🌸 既存テンキー
    layout =
        mathKeyLayouts[type]
        ?? mathKeyLayouts.number;

}

    console.log("type =", type);
    console.log("mathKeyLayouts =", mathKeyLayouts);
    console.log("layout =", layout);


    // 🌸 新しいテンキーを作る時は必ず「回答」状態
    mathKeypadAction = "answer";


    layout.forEach(key => {

        const btn =
            document.createElement("button");

        btn.type = "button";

        btn.textContent = key;

        btn.className = "keypadBtn";

if (key === "図形の移動（合同変換）") {
    btn.classList.add("longWord");
}

// 🌸 バグ修正：「あまり」キーがボタン枠からはみ出るのを防ぐ
if (key === "あまり") {
    btn.classList.add("remainderBtn");
}
        if (key === "OK") {

            btn.classList.add("enterBtn");

            btn.id = "mathOKBtn";

        }


        btn.addEventListener("click", () => {

            console.log(
                "🌸 キークリック:",
                key
            );


            // 🌸 Engine20 学習時間
            studyActivity();


            const input =
                document.getElementById(
                    "answerInput"
                );

            if (!input) return;


            // 🌸 筆算メモ欄・筆算のマス目に最後にフォーカスしていた時は、
            // 数字ボタンをそちらへ書き込む。答え本体（answerInput）は
            // 今まで通りOKボタンで判定される。
            // （ボタンをクリックすると focus は button 側に移ってしまうため、
            //   document.activeElement ではなく mathKeypadFocusedEl で判定する）
            const target =
                (mathKeypadFocusedEl &&
                 document.body.contains(mathKeypadFocusedEl))
                    ? mathKeypadFocusedEl
                    : input;

            const isHissanAnswerBox =
                !!(target.classList &&
                   target.classList.contains("hissanAnswerBox"));

            // 🌸 筆算のマス目で次／前のマスへ自動で進む時は、
            // 最後にこの変数を書き換えてフォーカスする
            let focusTarget = target;


            switch (key) {


                case "C":

                    // 🌸 回答状態の時だけ入力
                    if (
                        mathKeypadAction ===
                        "answer"
                    ) {

                        target.value = "";

                    }

                    break;


                case "←":

                    // 🌸 回答状態の時だけ入力
                    if (
                        mathKeypadAction ===
                        "answer"
                    ) {

                        // 🌸 小数点の区切り（.）が実際のDOM上の
                        // きょうだい要素として間に挟まる場合があるため、
                        // 見た目の隣接ではなく data-hissan-idx の
                        // 番号で前後のマスを探す。
                        const prevIdxBox =
                            isHissanAnswerBox
                                ? document.querySelector(
                                    `.hissanAnswerBox[data-hissan-idx="${
                                        parseInt(target.dataset.hissanIdx, 10) - 1
                                    }"]`
                                )
                                : null;

                        // 🌸 バグ修正：筆算の最後のマスまで入力すると
                        // カーソルが回答欄（answerInput）へ自動で
                        // 移動する。そこで回答欄が空のまま「←」を
                        // 押しても、筆算のマスへ戻る手段が無く、
                        // 間違えたマスをテンキーで直せなかった。
                        // 回答欄が空の時は、筆算の一番最後のマスへ
                        // 戻れるようにする。
                        let lastHissanBox = null;

                        if (
                            !isHissanAnswerBox &&
                            target.value === ""
                        ) {

                            let maxIdx = -1;

                            document
                                .querySelectorAll(".hissanAnswerBox")
                                .forEach((box) => {

                                    const idx =
                                        parseInt(box.dataset.hissanIdx, 10);

                                    if (idx > maxIdx) {
                                        maxIdx = idx;
                                        lastHissanBox = box;
                                    }

                                });

                        }

                        if (
                            isHissanAnswerBox &&
                            target.value === "" &&
                            prevIdxBox
                        ) {

                            // 🌸 マスが空の時は1つ前のマスへ戻る
                            focusTarget = prevIdxBox;

                        } else if (lastHissanBox) {

                            // 🌸 回答欄が空の時は筆算の最後のマスへ戻る
                            focusTarget = lastHissanBox;

                        } else {

                            target.value =
                                target.value.slice(
                                    0,
                                    -1
                                );

                        }

                    }

                    break;


                case "OK":


                    // =================================
                    // 🌸 次の問題モード
                    // =================================

                    if (
                        mathKeypadAction ===
                        "next"
                    ) {

                        if (reviewMode) {

                            reviewNextQuestion();

                        } else {

                            nextQuestion();

                        }

                        break;
                    }


                    // =================================
                    // 🌸 回答モード
                    // =================================

                    if (reviewMode) {

    submitReviewAnswer();

} else {

    if (
        questionCount >=
        maxQuestions
    ) {

        return;

    }

    // 🌸 手入力の全角数字・全角マイナスを半角へ変換
    input.value = input.value
    .replace(/[−－]/g, "-");

submitAnswer();

}

                    break;


                default:

                    // 🌸 次の問題表示中は入力不可
                    if (
                        mathKeypadAction !==
                        "answer"
                    ) {

                        return;

                    }

                    if (isHissanAnswerBox) {

                        // 🌸 マスには1桁だけ。入れたら次のマスへ進む
                        // （小数点の区切りがDOM上に挟まっていても
                        // data-hissan-idx の番号で正しく次へ進める）。
                        // 筆算の最後のマスまで書き終えたら、今まで通り
                        // 上の回答欄へカーソルを移動する。
                        target.value = key;

                        const nextIdxBox = document.querySelector(
                            `.hissanAnswerBox[data-hissan-idx="${
                                parseInt(target.dataset.hissanIdx, 10) + 1
                            }"]`
                        );

                        if (nextIdxBox) {

                            focusTarget = nextIdxBox;

                        } else if (input) {

                            focusTarget = input;

                        }

                    } else {

                        target.value += key;

                    }

            }


            focusTarget.focus();

        });


        keypad.appendChild(btn);

    });

}

/* =========================
🌸 ポイント加算
========================= */

function addManagerPoint(index) {

    const input =
        document.getElementById("pointInput" + index);

    const value = Number(input.value);

    if (isNaN(value) || value <= 0) return;

    users[index].point =
        (users[index].point || 0) + value;

    saveUsers();

    updatePointManager();

}

/* =========================
🌸 ポイント減算
========================= */

function subPoint(index) {

    const input =
        document.getElementById("pointInput" + index);

    const value = Number(input.value);

    if (isNaN(value) || value <= 0) return;

    users[index].point =
        Math.max(
            0,
            (users[index].point || 0) - value
        );

    saveUsers();

    updatePointManager();

}

/* =========================
🌸 ポイント変更
========================= */

function changePoint(index) {

    const input =
        document.getElementById("pointInput" + index);

    const value = Number(input.value);

    if (isNaN(value) || value < 0) return;

    users[index].point = value;

    // 現在の利用者なら画面表示も更新
    if (currentUser && users[index] === currentUser) {
        currentUser.point = value;
        sakuraPoint = value;
        showPoint();
    }

    saveUsers();

    updatePointManager();
}

/* =========================
🌸 個人ポイントリセット
========================= */

function resetPoint(index) {
    if (!confirm("この利用者のポイントを0Pにしますか？")) {
    return;
    }
    users[index].point = 0;

    saveUsers();

    updatePointManager();

}


////////////////
// 🌸 Memo
// SakuraDrill v7.5 Stable_10_04
//
// Completed
// ✅ HTML整理
// ✅ Engine11統合
// ✅ 地域データ作成
// ✅ マップカード配置
// ✅ ホバー演出
// ✅ クリック演出
// ✅ 探検アニメーション
// ✅ clearArea()
// ✅ getExploreRate()
// ✅ HTML閉じタグ修正
// ✅ socialAreaレイアウト調整
//
// Next
// □ Phase4 Step2
// ・地域クリア表示
// ・カード桜色化
// ・探検率更新
//
// Future
// □ ロック地域
// □ 桜開花演出
// □ 新潟県制覇演出
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// 🌸 SakuraDrill Development Log
/////////////////////////////////////////////////////

/*
Stable_10_04

【Engine11】
・HTML整理
・Engine11統合
・Phase1完成
・Phase2完成
・Phase3完成
・Phase4基礎完成
・HTML閉じタグ修正
・socialArea余白調整
・算数画面復旧
・社会画面レイアウト調整

Next
・地域クリア表示
・桜色カード
・探検率自動更新
*/




/////////////////////////////////////////////////////
// 🌸 End of Engine 11
/////////////////////////////////////////////////////

