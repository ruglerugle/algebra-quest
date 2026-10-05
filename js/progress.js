/* ============================================================
   algebra-quest 進捗管理・クイズ判定（章ごと）
   quest-template（design-system.css）の見た目に対して、
   ステージ一覧の描画・localStorageでの進捗保存・クイズ正誤判定を行う。
   章（フォルダ）ごとに進捗を分けて保存する。
   ============================================================ */
(function (global) {
  "use strict";

  var BOOK_RECOMMEND = {
    title: "Amazonで「ガロア理論」の本を探す（群・環・体の入門書）",
    url: "https://www.amazon.co.jp/s?k=%E3%82%AC%E3%83%AD%E3%82%A2%E7%90%86%E8%AB%96+%E5%85%A5%E9%96%80&tag=senjin-22"
  };

  // 章の定義。answers は各ステージのクイズ正解（クイズカードの出現順に、正解の選択肢のインデックス）
  // ※ この CHAPTERS ブロックはビルダーが stage データから書き換える
  var CHAPTERS = /*CHAPTERS*/{
    "groups": {
      "no": 1,
      "title": "対称性を計算する",
      "next": "rings",
      "answers": {
        "1": [
          2,
          0,
          1
        ],
        "2": [
          0,
          2,
          1
        ],
        "3": [
          1,
          0,
          2
        ],
        "4": [
          2,
          1,
          0
        ],
        "5": [
          0,
          1,
          2
        ],
        "6": [
          1,
          2,
          0
        ],
        "7": [
          2,
          0,
          1
        ]
      },
      "stages": [
        {
          "n": 1,
          "title": "解けない15パズル",
          "sub": "謎と、正三角形の6つの動かし方"
        },
        {
          "n": 2,
          "title": "操作の掛け算表",
          "sub": "掛け算表から群の4つの条件へ"
        },
        {
          "n": 3,
          "title": "時計の算術",
          "sub": "余りの世界の足し算と掛け算"
        },
        {
          "n": 4,
          "title": "部分群とラグランジュの定理",
          "sub": "群をきれいに等分割する"
        },
        {
          "n": 5,
          "title": "秘密の鍵 ― RSA暗号",
          "sub": "群の性質で暗号を作る"
        },
        {
          "n": 6,
          "title": "入れ替えの偶奇",
          "sub": "転倒数で偶奇を見分ける"
        },
        {
          "n": 7,
          "title": "15パズルの謎を解く",
          "sub": "市松模様と偶置換"
        }
      ]
    },
    "rings": {
      "no": 2,
      "title": "素因数分解の世界",
      "next": "fields",
      "answers": {
        "1": [
          0,
          2,
          1
        ],
        "2": [
          1,
          0,
          2
        ],
        "3": [
          2,
          1,
          0
        ],
        "4": [
          0,
          1,
          2
        ],
        "5": [
          1,
          2,
          0
        ],
        "6": [
          2,
          0,
          1
        ],
        "7": [
          0,
          2,
          1
        ],
        "8": [
          1,
          2,
          0
        ]
      },
      "stages": [
        {
          "n": 1,
          "title": "2つの謎と数の世界",
          "sub": "素因数分解の謎と、環という舞台"
        },
        {
          "n": 2,
          "title": "単数と既約元",
          "sub": "ノルムで数の大きさを測る"
        },
        {
          "n": 3,
          "title": "「ただ1通り」の正体",
          "sub": "素元の性質が一意性を支える"
        },
        {
          "n": 4,
          "title": "余りのある割り算",
          "sub": "互除法で素数が素元であることを示す"
        },
        {
          "n": 5,
          "title": "2つの平方数の和",
          "sub": "1つ目の謎を解く"
        },
        {
          "n": 6,
          "title": "こわれた素因数分解",
          "sub": "既約元なのに素元でない数"
        },
        {
          "n": 7,
          "title": "数の代わりに倍数の集まり",
          "sub": "イデアルという「部品」"
        },
        {
          "n": 8,
          "title": "部品の掛け算",
          "sub": "こわれた素因数分解を修理する"
        }
      ]
    },
    "fields": {
      "no": 3,
      "title": "四則演算と作図",
      "next": "galois",
      "answers": {
        "1": [
          1,
          0,
          2
        ],
        "2": [
          2,
          1,
          0
        ],
        "3": [
          0,
          1,
          2
        ],
        "4": [
          1,
          2,
          0
        ],
        "5": [
          2,
          0,
          1
        ],
        "6": [
          0,
          2,
          1
        ],
        "7": [
          1,
          2,
          0
        ]
      },
      "stages": [
        {
          "n": 1,
          "title": "作図の約束と体",
          "sub": "四則と √ で作れる長さ"
        },
        {
          "n": 2,
          "title": "体をひろげる",
          "sub": "ℚ(√2) と拡大の次数"
        },
        {
          "n": 3,
          "title": "多項式の世界",
          "sub": "最小多項式と次数"
        },
        {
          "n": 4,
          "title": "次数の掛け算",
          "sub": "作図できる数の次数は 2 の累乗"
        },
        {
          "n": 5,
          "title": "解けない作図",
          "sub": "立方体倍積と角の三等分"
        },
        {
          "n": 6,
          "title": "正多角形の作図",
          "sub": "作図できる正 n 角形の判定"
        },
        {
          "n": 7,
          "title": "有限の体と QR コード",
          "sub": "有限体で誤りを直す"
        }
      ]
    },
    "galois": {
      "no": 4,
      "title": "方程式の対称性",
      "next": null,
      "answers": {
        "1": [
          2,
          1,
          0
        ],
        "2": [
          0,
          1,
          2
        ],
        "3": [
          1,
          2,
          0
        ],
        "4": [
          2,
          0,
          1
        ],
        "5": [
          0,
          2,
          1
        ],
        "6": [
          1,
          2,
          0
        ],
        "7": [
          2,
          0,
          1
        ]
      },
      "stages": [
        {
          "n": 1,
          "title": "解の公式の歴史",
          "sub": "2次から5次へ、300年の謎"
        },
        {
          "n": 2,
          "title": "解を入れ替える",
          "sub": "対称式と判別式"
        },
        {
          "n": 3,
          "title": "3次方程式を解く",
          "sub": "ω と ∛ で残りの対称性を崩す"
        },
        {
          "n": 4,
          "title": "ガロア群",
          "sub": "方程式ごとに決まる入れ替えの群"
        },
        {
          "n": 5,
          "title": "べき根で解けるとは",
          "sub": "√ や ∛ を足すと群はどう小さくなるか"
        },
        {
          "n": 6,
          "title": "5つの入れ替え",
          "sub": "交換子で3つ組の巡回を作る"
        },
        {
          "n": 7,
          "title": "解けない5次方程式",
          "sub": "x⁵−6x＋3 のガロア群と旅のまとめ"
        }
      ]
    }
  }/*/CHAPTERS*/;
  var ORDER = ["groups", "rings", "fields", "galois"];

  function keyOf(chap) { return "algebraQuest_" + chap + "_v1"; }

  function getCleared(chap) {
    try {
      var raw = JSON.parse(localStorage.getItem(keyOf(chap)) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch (e) {
      return [];
    }
  }

  function setCleared(chap, stageNum) {
    var cleared = getCleared(chap);
    if (cleared.indexOf(stageNum) === -1) {
      cleared.push(stageNum);
      try { localStorage.setItem(keyOf(chap), JSON.stringify(cleared)); } catch (e) { /* 保存できない環境 */ }
    }
  }

  function isUnlocked(stageNum, cleared) {
    if (stageNum === 1) return true;
    return cleared.indexOf(stageNum - 1) !== -1 || cleared.indexOf(stageNum) !== -1;
  }

  function renderSidebar(chap, currentStage) {
    var list = document.getElementById("side-list");
    if (!list) return;
    var C = CHAPTERS[chap], cleared = getCleared(chap);
    list.innerHTML = "";
    C.stages.forEach(function (stage) {
      var unlocked = isUnlocked(stage.n, cleared) || stage.n === currentStage;
      var isCleared = cleared.indexOf(stage.n) !== -1;
      var item = document.createElement(unlocked ? "a" : "div");
      item.className = "side-item";
      if (stage.n === currentStage) item.className += " active";
      if (!unlocked) item.className += " locked";
      if (unlocked) {
        item.href = "stage" + stage.n + ".html";
        item.setAttribute("aria-label", stage.title);
      } else {
        item.setAttribute("aria-disabled", "true");
      }
      var icon = isCleared ? "✅" : unlocked ? "🔓" : "🔒";
      item.innerHTML =
        '<span class="side-icon">' + icon + '</span>' +
        '<span class="side-text"><div class="side-main">STAGE' + stage.n + " " + stage.title + '</div>' +
        '<div class="side-sub">' + stage.sub + "</div></span>";
      list.appendChild(item);
    });
  }

  function clearedCount(chap) {
    var total = CHAPTERS[chap].stages.length;
    return getCleared(chap).filter(function (n) { return n >= 1 && n <= total; }).length;
  }

  function updateHeaderProgress(chap) {
    var done = clearedCount(chap), total = CHAPTERS[chap].stages.length;
    var label = document.getElementById("progress-label");
    var fill = document.getElementById("progress-fill");
    if (label) label.textContent = "クリア " + done + " / " + total;
    if (fill) {
      fill.style.width = Math.round((done / total) * 100) + "%";
      if (fill.parentNode && fill.parentNode.setAttribute) fill.parentNode.setAttribute("aria-valuenow", done);
    }
  }

  function markSolved(card) {
    card.setAttribute("data-solved", "true");
    var explain = card.querySelector(".quiz-explain");
    if (explain) explain.hidden = false;
  }

  function allSolved(root) {
    var cards = root.querySelectorAll(".quiz-card[data-quiz]");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute("data-solved") !== "true") return false;
    }
    return true;
  }

  function track(eventName, params) {
    if (typeof window.gtag === "function") window.gtag("event", eventName, params || {});
  }

  function initQuiz(chap, stageNum, onAllSolved) {
    var answers = CHAPTERS[chap].answers[stageNum] || [];
    var cards = document.querySelectorAll(".quiz-card[data-quiz]");
    // クイズのないステージでは onAllSolved が永久に呼ばれず「次へ」が押せなくなるため、先に解放する
    if (cards.length === 0) { onAllSolved(); return; }
    // 正解表の件数がクイズ数と食い違うと、該当カードが永久に正解できずステージがクリア不能になるので警告する
    if (answers.length !== cards.length && window.console && console.warn) {
      console.warn("[progress] " + chap + " STAGE" + stageNum + ": 正解表の件数(" + answers.length + ")がクイズ数(" + cards.length + ")と一致しません");
    }
    cards.forEach(function (card, cardIndex) {
      var live = document.createElement("p");
      live.className = "sr-only";
      live.setAttribute("aria-live", "polite");
      card.appendChild(live);
      var buttons = card.querySelectorAll(".choice-btn");
      buttons.forEach(function (btn, btnIndex) {
        btn.addEventListener("click", function () {
          if (card.getAttribute("data-solved") === "true") return;
          var correct = answers[cardIndex] === btnIndex;
          live.textContent = correct ? "正解です" : "不正解です。もう一度選んでください";
          if (correct) {
            // 正解のボタンは disabled にせず、フォーカスを保ったまま操作だけ止める
            buttons.forEach(function (b) { if (b !== btn) b.disabled = true; });
            btn.setAttribute("aria-disabled", "true");
            btn.classList.add("choice-ok");
            markSolved(card);
            if (allSolved(document)) onAllSolved();
          } else {
            btn.classList.add("choice-ng");
            track("quiz_wrong", { chapter: chap, stage: stageNum, quiz: cardIndex + 1, choice: btnIndex + 1 });
          }
        });
      });
    });
  }

  function setMissionAchieved() {
    var status = document.getElementById("mission-status");
    if (status) {
      status.textContent = "達成！";
      status.classList.add("ok");
    }
  }

  function showClearBanner() {
    if (document.querySelector(".stage-clear-banner")) return;
    var nav = document.querySelector(".stage-nav");
    if (!nav) return;
    var banner = document.createElement("div");
    banner.className = "stage-clear-banner";
    banner.setAttribute("role", "status");
    banner.textContent = "🎉 STAGE CLEAR!";
    nav.parentNode.insertBefore(banner, nav);
  }

  function enableNext(chap, stageNum) {
    var nextBtn = document.getElementById("btn-next");
    if (nextBtn) nextBtn.disabled = false;
    setCleared(chap, stageNum);
    updateHeaderProgress(chap);
    showClearBanner();
    track("stage_clear", { chapter: chap, stage: stageNum });
    if (clearedCount(chap) === CHAPTERS[chap].stages.length) track("chapter_clear", { chapter: chap });
  }

  function bindResetAll(chap) {
    var btn = document.getElementById("btn-reset-all");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (window.confirm("この章の進捗をリセットして最初からやり直しますか？")) {
        try { localStorage.removeItem(keyOf(chap)); } catch (e) { /* 保存できない環境 */ }
        window.location.href = "index.html";
      }
    });
  }

  function renderBookRecommend() {
    var el = document.getElementById("book-recommend");
    if (!el) return;
    el.innerHTML =
      '<p class="book-recommend-label">参考文献</p>' +
      '<div class="book-recommend-body"><div>' +
      '<p class="book-recommend-lead">もっと深く学びたい方へ</p>' +
      '<a href="' + BOOK_RECOMMEND.url + '" target="_blank" rel="sponsored noopener">' + BOOK_RECOMMEND.title + "</a>" +
      "</div></div>" +
      '<p class="book-recommend-note">※ Amazonのアソシエイトとして、当サイトは適格販売により収入を得ています。</p>';
  }

  function bindSidebarToggle() {
    var shell = document.getElementById("app-shell");
    if (!shell) return;
    function toggleSide() { shell.classList.toggle("side-collapsed"); }
    var t1 = document.getElementById("sidebar-toggle");
    var t2 = document.getElementById("head-nav-toggle");
    var backdrop = document.getElementById("side-backdrop");
    if (t1) t1.addEventListener("click", toggleSide);
    if (t2) t2.addEventListener("click", toggleSide);
    if (backdrop) backdrop.addEventListener("click", function () { shell.classList.add("side-collapsed"); });
  }

  function initStagePage(chap, stageNum) {
    // ロック中でも直URLアクセスは許可する（検索エンジン経由の流入を妨げないため）
    document.addEventListener("DOMContentLoaded", function () {
      var cleared = getCleared(chap);
      renderSidebar(chap, stageNum);
      updateHeaderProgress(chap);
      bindResetAll(chap);
      bindSidebarToggle();
      renderBookRecommend();

      var nextBtn = document.getElementById("btn-next");
      if (cleared.indexOf(stageNum) !== -1) {
        document.querySelectorAll(".quiz-card[data-quiz]").forEach(function (card) {
          markSolved(card);
          card.querySelectorAll(".choice-btn").forEach(function (b) { b.disabled = true; });
        });
        setMissionAchieved();
        if (nextBtn) nextBtn.disabled = false;
      } else if (!allSolved(document)) {
        if (nextBtn) nextBtn.disabled = true;
      }

      initQuiz(chap, stageNum, function () {
        setMissionAchieved();
        enableNext(chap, stageNum);
      });

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          var stages = CHAPTERS[chap].stages;
          window.location.href = stageNum < stages.length ? "stage" + (stageNum + 1) + ".html" : "complete.html";
        });
      }
    });
  }

  function initCompletePage(chap) {
    if (clearedCount(chap) < CHAPTERS[chap].stages.length) {
      window.location.replace("index.html");
      return;
    }
    document.addEventListener("DOMContentLoaded", function () {
      bindResetAll(chap);
      renderBookRecommend();
    });
  }

  function initCoverPage(chap) {
    document.addEventListener("DOMContentLoaded", function () {
      var cleared = getCleared(chap);
      document.querySelectorAll(".quest-card[data-stage]").forEach(function (card) {
        var n = parseInt(card.getAttribute("data-stage"), 10);
        if (!isUnlocked(n, cleared)) {
          card.classList.add("locked");
          card.removeAttribute("href");
        }
        if (cleared.indexOf(n) !== -1) {
          card.classList.add("cleared");
          var cta = card.querySelector(".q-cta");
          if (cta) cta.textContent = "クリア済み ✓";
        }
      });
      renderBookRecommend();
    });
  }

  // シリーズマップ：各章の進み具合を表示する
  function initSeriesPage() {
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("[data-chapter]").forEach(function (el) {
        var chap = el.getAttribute("data-chapter"), C = CHAPTERS[chap];
        if (!C) return;
        var done = clearedCount(chap), total = C.stages.length;
        var badge = el.querySelector(".ch-progress");
        if (badge) badge.textContent = done === total ? "クリア済み ✓" : "クリア " + done + " / " + total;
        if (done === total) el.classList.add("cleared");
      });
      renderBookRecommend();
    });
  }

  global.AQ = {
    CHAPTERS: CHAPTERS,
    ORDER: ORDER,
    getCleared: getCleared,
    initStagePage: initStagePage,
    initCoverPage: initCoverPage,
    initCompletePage: initCompletePage,
    initSeriesPage: initSeriesPage
  };
})(window);
