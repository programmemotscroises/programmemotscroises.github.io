(function () {
  "use strict";

  const vowels = new Set(["A", "E", "I", "O", "U", "Y"]);
  const isConsonant = (ch) => /^[A-Z]$/.test(ch) && !vowels.has(ch);
  const sanitizeLetters = (s) => (s || "").toUpperCase().replace(/[^A-Z]/g, "");

  const dom = {
    pattern: null,
    allowed: null,
    forbidden: null,
    results: null,
    summary: null,
    title: null,
    year: null,
    searchBtn: null,
    clearBtn: null,
  };

  function getWordListByLength(len) {
    try {
      const raw = localStorage.getItem(String(len));
      if (!raw) return [];
      // If base.js stored arrays, they may be serialized as JS array string. Try to parse robustly.
      if (raw.startsWith("[")) {
        // Some older data might be single-quoted. Normalize quotes before JSON.parse.
        const normalized = raw.replace(/'/g, '"');
        try {
          return JSON.parse(normalized);
        } catch {
          /* fallthrough */
        }
      }
      // Fallback: split by comma
      return raw
        .split(",")
        .map((s) => s.replace(/[\[\]\s]/g, ""))
        .filter(Boolean);
    } catch {
      return [];
    }
  }

  function scoreWord(pattern, word, allowedSet, forbiddenSet) {
    if (word.length !== pattern.length) return { ok: false, score: Infinity };
    let score = 0;
    for (let i = 0; i < pattern.length; i++) {
      const p = pattern[i];
      const w = word[i];
      if (p === "*") {
        if (
          (allowedSet.size && !allowedSet.has(w)) ||
          (forbiddenSet.size && forbiddenSet.has(w))
        ) {
          score += 1; // penalize if violates global constraints
        }
        continue;
      }
      if (p === "/") {
        if (!vowels.has(w)) score += 1;
        if (
          (allowedSet.size && !allowedSet.has(w)) ||
          (forbiddenSet.size && forbiddenSet.has(w))
        )
          score += 1;
        continue;
      }
      if (p === "#") {
        if (!isConsonant(w)) score += 1;
        if (
          (allowedSet.size && !allowedSet.has(w)) ||
          (forbiddenSet.size && forbiddenSet.has(w))
        )
          score += 1;
        continue;
      }
      // exact letter expected
      if (w !== p) score += 1;
    }
    return { ok: true, score };
  }

  function search() {
    const patternRaw = (dom.pattern.value || "").trim().toUpperCase();
    if (!patternRaw) {
      render([], 0, "Entrez un modèle de mot.");
      return;
    }
    const allowed = new Set(sanitizeLetters(dom.allowed.value));
    const forbidden = new Set(sanitizeLetters(dom.forbidden.value));
    const list = getWordListByLength(patternRaw.length);
    const scored = [];
    for (const w of list) {
      const word = String(w).toUpperCase();
      const { ok, score } = scoreWord(patternRaw, word, allowed, forbidden);
      if (ok) {
        scored.push({ word, score });
      }
    }
    scored.sort((a, b) => a.score - b.score || a.word.localeCompare(b.word));
    // Split exact matches first, then nearest up to a cap
    const exact = scored.filter((x) => x.score === 0).slice(0, 200);
    const near = scored.filter((x) => x.score > 0).slice(0, 200);
    render(
      exact,
      near,
      list.length,
      exact.length ? undefined : "Aucun exact. Propositions proches affichées."
    );
  }

  function render(exactItems, nearItems, poolSize, message) {
    dom.results.innerHTML = "";
    if (message) {
      dom.summary.textContent = message;
    } else {
      dom.summary.textContent = "";
    }
    const total = (exactItems?.length || 0) + (nearItems?.length || 0);
    if (total === 0) {
      dom.results.innerHTML = `<div class="result-item"><span>Aucun résultat</span></div>`;
      dom.title.textContent = "Résultats";
      return;
    }
    dom.title.textContent = `Résultats (${total})`;

    const renderItem = (item) => {
      const badgeLabel = item.score === 0 ? "Exact" : `Hamming +${item.score}`;
      let badgeClass = "exact";
      if (item.score === 1) badgeClass = "h1";
      else if (item.score === 2) badgeClass = "h2";
      else if (item.score >= 3) badgeClass = "h3";
      const el = document.createElement("div");
      el.className = "result-item";
      el.innerHTML = `
        <span>${item.word}</span>
        <span class="item-actions">
          <span class="badge ${badgeClass}">${badgeLabel}</span>
          <a class="btn" target="_blank" rel="noopener" href="https://www.larousse.fr/dictionnaires/francais/${item.word.toLowerCase()}">Définition</a>
        </span>`;
      dom.results.appendChild(el);
    };

    // Exact first
    exactItems.forEach(renderItem);

    // Separator if we have near matches
    if (nearItems.length > 0) {
      const sep = document.createElement("div");
      sep.className = "separator";
      sep.textContent = "Proches (Hamming +1 et plus)";
      dom.results.appendChild(sep);
      nearItems.forEach(renderItem);
    }
  }

  function clearAll() {
    dom.pattern.value = "";
    dom.allowed.value = "";
    dom.forbidden.value = "";
    dom.pattern.focus();
    render([], 0);
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  function init() {
    dom.pattern = document.getElementById("pattern");
    dom.allowed = document.getElementById("allowed");
    dom.forbidden = document.getElementById("forbidden");
    dom.results = document.getElementById("results");
    dom.summary = document.getElementById("summary");
    dom.title = document.getElementById("resultsTitle");
    dom.searchBtn = document.getElementById("searchBtn");
    dom.clearBtn = document.getElementById("clearBtn");
    dom.year = document.getElementById("year");

    if (dom.year) {
      dom.year.textContent = String(new Date().getFullYear());
    }

    dom.searchBtn.addEventListener("click", search);
    dom.clearBtn.addEventListener("click", clearAll);
    dom.pattern.addEventListener("keydown", onEnter);
    dom.allowed.addEventListener("keydown", onEnter);
    dom.forbidden.addEventListener("keydown", onEnter);

    // live search on pattern change for a snappy feel
    dom.pattern.addEventListener("input", () => {
      if (dom.pattern.value.length) search();
      else render([], [], 0);
    });

    // Helper buttons for mobile input
    document.querySelectorAll(".helper-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const char = btn.dataset.char;
        const action = btn.dataset.action;
        if (action === "clear") {
          dom.pattern.value = "";
          dom.pattern.focus();
          render([], [], 0);
        } else if (char) {
          const input = dom.pattern;
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          const before = input.value.substring(0, start);
          const after = input.value.substring(end);
          input.value = before + char + after;
          input.focus();
          input.setSelectionRange(start + 1, start + 1);
          if (input.value.length) search();
        }
      });
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
