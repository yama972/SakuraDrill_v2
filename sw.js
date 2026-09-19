/////////////////////////////////////////////////////
// 🌸 SakuraDrill オフライン対応（Service Worker）
//
// 【これは何？】
// 電波が届かない場所（車の中・旅行先など）でも、一時的に
// SakuraDrillを開いて使えるようにするためのしくみです。
//
// 【動き方】
// ・オンラインのときは、これまで通り毎回ネットから最新の
//   ファイルを取りに行きます（index.html自身が持っている
//   自動更新のしくみには一切手を加えていません）。
//   取得できたファイルは、次にオフラインになったときのために
//   このキャッシュにも保存し直しておきます。
// ・ネットにつながらないとき（fetchが失敗したとき）だけ、
//   前回までに保存しておいたファイルを代わりに使います。
//
// 【メンテナンスのお約束】
// ・答えデータ（data/フォルダ）の中身を書きかえるだけなら、
//   このファイルは何も変えなくてOK（オンラインで開いた時に
//   自動的に新しい中身がキャッシュに保存し直されるため）。
// ・新しい教科・学年の問題ファイルを「追加」してindex.htmlに
//   読み込みタグを増やしたときだけ、下のPRECACHE_URLSにも
//   同じファイル名を追加し、CACHE_VERSIONの日付を上げてください。
//   （そうしないと、そのファイルを一度もオンラインで開かないまま
//   　オフラインになった場合に、その教科だけ表示できません。）
/////////////////////////////////////////////////////

const CACHE_VERSION = "20260916-2";
const CACHE_NAME = `sakuradrill-offline-${CACHE_VERSION}`;

const PRECACHE_URLS = [
    "./",
    "index.html",
    "style.css",
    "version.txt",
    "sounds/correct.mp3",
    "sounds/wrong.mp3",
    "data/eigo/chu1_eigo.js",
    "data/eigo/chu2_eigo.js",
    "data/eigo/chu3_eigo.js",
    "data/eigo/grade34_eigo.js",
    "data/eigo/grade5_eigo.js",
    "data/eigo/grade6_eigo.js",
    "data/grades/elementary_high.js",
    "data/grades/elementary_low.js",
    "data/grades/grade3_social_studies.js",
    "data/grades/grade4_social_studies.js",
    "data/grades/grade5_social_studies.js",
    "data/grades/grade6_social_studies.js",
    "data/grades/high_school.js",
    "data/grades/middle_school.js",
    "data/kokugo/chu1_kokugo.js",
    "data/kokugo/chu2_kokugo.js",
    "data/kokugo/chu3_kokugo.js",
    "data/kokugo/grade1_kokugo.js",
    "data/kokugo/grade2_kokugo.js",
    "data/kokugo/grade3_kokugo.js",
    "data/kokugo/grade4_kokugo.js",
    "data/kokugo/grade5_kokugo.js",
    "data/kokugo/grade6_kokugo.js",
    "data/kokugo/kanji_writing.js",
    "data/math/chu1_math.js",
    "data/math/chu2_math.js",
    "data/math/chu3_math.js",
    "data/math/grade1_math.js",
    "data/math/grade2_math.js",
    "data/math/grade3_math.js",
    "data/math/grade4_math.js",
    "data/math/grade5_math.js",
    "data/math/grade6_math.js",
    "data/niigata/niigata.js",
    "data/niigata/sado.js",
    "data/prefectures/aichi.js",
    "data/prefectures/akita.js",
    "data/prefectures/aomori.js",
    "data/prefectures/chiba.js",
    "data/prefectures/ehime.js",
    "data/prefectures/fukui.js",
    "data/prefectures/fukuoka.js",
    "data/prefectures/fukushima.js",
    "data/prefectures/gifu.js",
    "data/prefectures/gunma.js",
    "data/prefectures/hiroshima.js",
    "data/prefectures/hokkaido.js",
    "data/prefectures/hyogo.js",
    "data/prefectures/ibaraki.js",
    "data/prefectures/ishikawa.js",
    "data/prefectures/iwate.js",
    "data/prefectures/japan_questions.js",
    "data/prefectures/kagawa.js",
    "data/prefectures/kagoshima.js",
    "data/prefectures/kanagawa.js",
    "data/prefectures/kochi.js",
    "data/prefectures/kumamoto.js",
    "data/prefectures/kyoto.js",
    "data/prefectures/mie.js",
    "data/prefectures/miyagi.js",
    "data/prefectures/miyazaki.js",
    "data/prefectures/nagano.js",
    "data/prefectures/nagasaki.js",
    "data/prefectures/nara.js",
    "data/prefectures/niigata.js",
    "data/prefectures/oita.js",
    "data/prefectures/okayama.js",
    "data/prefectures/okinawa.js",
    "data/prefectures/osaka.js",
    "data/prefectures/saga.js",
    "data/prefectures/saitama.js",
    "data/prefectures/shiga.js",
    "data/prefectures/shimane.js",
    "data/prefectures/shizuoka.js",
    "data/prefectures/tochigi.js",
    "data/prefectures/tokushima.js",
    "data/prefectures/tokyo.js",
    "data/prefectures/tottori.js",
    "data/prefectures/toyama.js",
    "data/prefectures/wakayama.js",
    "data/prefectures/yamagata.js",
    "data/prefectures/yamaguchi.js",
    "data/prefectures/yamanashi.js",
    "data/prefectures/うんちく問題/japan47_trivia.js",
    "data/rika/chu1_rika.js",
    "data/rika/chu2_rika.js",
    "data/rika/chu3_rika.js",
    "data/rika/grade3_rika.js",
    "data/rika/grade4_rika.js",
    "data/rika/grade5_rika.js",
    "data/rika/grade6_rika.js",
    "script.js"
];

// 🌸 インストール時：すべてのファイルをまとめて保存しておく。
// 🌸 1つでも取得に失敗するとcache.addAll全体が失敗してしまうため、
// 🌸 ファイルごとに取りに行き、失敗したものだけ諦めるようにする。
self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            return Promise.all(
                PRECACHE_URLS.map((url) =>
                    cache.add(url).catch((err) => {

                        console.log(
                            "🌸 オフライン用の保存に失敗（このファイルだけ）:",
                            url,
                            err
                        );

                    })
                )
            );

        })

    );

    // 🌸 待たずにすぐ新しいService Workerを有効にする
    self.skipWaiting();

});

// 🌸 有効化時：古いバージョンのキャッシュを片づける
self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then((names) => {

            return Promise.all(
                names
                    .filter(
                        (name) =>
                            name.startsWith("sakuradrill-offline-") &&
                            name !== CACHE_NAME
                    )
                    .map((name) => caches.delete(name))
            );

        })

    );

    self.clients.claim();

});

// 🌸 リクエストごとの処理：
// 🌸 まずネットワークを試し（＝オンラインのときは今まで通り最新の
// 🌸 内容が表示される）、取得できたら次回オフライン用に保存し直す。
// 🌸 ネットワークが失敗したとき（＝オフラインのとき）だけ、
// 🌸 保存しておいたファイルの中から一番近いものを探して使う。
self.addEventListener("fetch", (event) => {

    // 🌸 このアプリ自身（同じ場所）へのGETリクエストだけを対象にする
    if (event.request.method !== "GET") return;

    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin !== self.location.origin) return;

    event.respondWith(

        fetch(event.request)
            .then((response) => {

                const responseClone = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });

                return response;

            })
            .catch(() => {

                // 🌸 ファイル名の後ろに付く「?v=...」のようなバージョン
                // 🌸 番号がビルドごとに変わっても、同じファイルの
                // 🌸 保存済みコピーを見つけられるようにする
                return caches
                    .match(event.request, { ignoreSearch: true })
                    .then((cached) => {

                        if (cached) return cached;

                        return new Response(
                            "🌸 オフラインのため、このファイルはまだ保存されていません。",
                            {
                                status: 503,
                                statusText: "Offline"
                            }
                        );

                    });

            })

    );

});
