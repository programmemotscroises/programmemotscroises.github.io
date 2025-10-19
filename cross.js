(function () {
  "use strict";

  // Import shared search logic
  const vowels = new Set(["A", "E", "I", "O", "U", "Y"]);
  const isConsonant = (ch) => /^[A-Z]$/.test(ch) && !vowels.has(ch);

  function getWordListByLength(len) {
    try {
      const raw = localStorage.getItem(String(len));
      if (!raw) return [];
      if (raw.startsWith("[")) {
        const normalized = raw.replace(/'/g, '"');
        try {
          return JSON.parse(normalized);
        } catch {}
      }
      return raw
        .split(",")
        .map((s) => s.replace(/[\[\]\s]/g, ""))
        .filter(Boolean);
    } catch {
      return [];
    }
  }

  function scoreWord(pattern, word) {
    if (word.length !== pattern.length) return Infinity;
    let score = 0;
    for (let i = 0; i < pattern.length; i++) {
      const p = pattern[i];
      const w = word[i];
      if (p === "*") continue;
      if (p === "/" && !vowels.has(w)) score++;
      else if (p === "#" && !isConsonant(w)) score++;
      else if (p !== "/" && p !== "#" && w !== p) score++;
    }
    return score;
  }

  function findWords(pattern) {
    const list = getWordListByLength(pattern.length);
    const scored = [];
    for (const w of list) {
      const word = String(w).toUpperCase();
      const score = scoreWord(pattern, word);
      if (score < Infinity) scored.push({ word, score });
    }
    scored.sort((a, b) => a.score - b.score || a.word.localeCompare(b.word));
    return scored.slice(0, 100); // cap at 100
  }

  function findCrossings(words1, pos1, words2, pos2) {
    const results = [];
    for (const w1 of words1) {
      const char1 = w1.word[pos1];
      for (const w2 of words2) {
        const char2 = w2.word[pos2];
        if (char1 === char2) {
          results.push({ word1: w1.word, word2: w2.word, char: char1 });
        }
      }
    }
    return results;
  }

  // State
  let state = {
    pattern1: "",
    pattern2: "",
    pos1: -1,
    pos2: -1,
    words1: [],
    words2: [],
    crossings: [],
    currentIndex: 0,
  };

  const dom = {
    step1: null,
    step2: null,
    step3: null,
    input1: null,
    input2: null,
    btn1: null,
    btn2: null,
    wordDisplay: null,
    crossBtn: null,
    resultsContainer: null,
    prevBtn: null,
    nextBtn: null,
    counter: null,
    gridDisplay: null,
  };

  function showStep(n) {
    [dom.step1, dom.step2, dom.step3].forEach((el, i) => {
      if (el) el.style.display = i + 1 === n ? "block" : "none";
    });
  }

  function validateWords() {
    state.pattern1 = (dom.input1.value || "").trim().toUpperCase();
    state.pattern2 = (dom.input2.value || "").trim().toUpperCase();
    if (!state.pattern1 || !state.pattern2) {
      alert("Entrez les deux modèles de mots.");
      return;
    }
    state.words1 = findWords(state.pattern1);
    state.words2 = findWords(state.pattern2);
    if (state.words1.length === 0 || state.words2.length === 0) {
      alert("Aucun mot trouvé pour l'un des modèles.");
      return;
    }
    renderWordBoxes();
    showStep(2);
  }

  function renderWordBoxes() {
    dom.wordDisplay.innerHTML = "";
    const container = document.createElement("div");
    container.className = "word-boxes";

    const row1 = document.createElement("div");
    row1.className = "word-row";
    const label1 = document.createElement("span");
    label1.textContent = "Mot 1: ";
    label1.className = "word-label";
    row1.appendChild(label1);
    for (let i = 0; i < state.pattern1.length; i++) {
      const box = document.createElement("button");
      box.className = "word-box";
      box.textContent = state.pattern1[i];
      box.dataset.word = "1";
      box.dataset.pos = i;
      box.addEventListener("click", () => selectPos(1, i));
      row1.appendChild(box);
    }
    container.appendChild(row1);

    const row2 = document.createElement("div");
    row2.className = "word-row";
    const label2 = document.createElement("span");
    label2.textContent = "Mot 2: ";
    label2.className = "word-label";
    row2.appendChild(label2);
    for (let i = 0; i < state.pattern2.length; i++) {
      const box = document.createElement("button");
      box.className = "word-box";
      box.textContent = state.pattern2[i];
      box.dataset.word = "2";
      box.dataset.pos = i;
      box.addEventListener("click", () => selectPos(2, i));
      row2.appendChild(box);
    }
    container.appendChild(row2);

    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent =
      "Cliquez sur une case de chaque mot pour choisir la position de croisement.";
    container.appendChild(hint);

    dom.wordDisplay.appendChild(container);
  }

  function selectPos(word, pos) {
    if (word === 1) {
      state.pos1 = pos;
      document.querySelectorAll('.word-box[data-word="1"]').forEach((el, i) => {
        el.classList.toggle("selected", i === pos);
      });
    } else {
      state.pos2 = pos;
      document.querySelectorAll('.word-box[data-word="2"]').forEach((el, i) => {
        el.classList.toggle("selected", i === pos);
      });
    }
    dom.crossBtn.disabled = state.pos1 === -1 || state.pos2 === -1;
  }

  function computeCrossings() {
    if (state.pos1 === -1 || state.pos2 === -1) {
      alert("Sélectionnez les positions de croisement.");
      return;
    }
    state.crossings = findCrossings(
      state.words1,
      state.pos1,
      state.words2,
      state.pos2
    );
    if (state.crossings.length === 0) {
      alert("Aucun croisement possible avec ces positions.");
      return;
    }
    state.currentIndex = 0;
    renderCrossingsList();
    showStep(3);
  }

  function renderCrossingsList() {
    dom.gridDisplay.innerHTML = "";

    // Title
    const title = document.createElement("h3");
    title.textContent = `${state.crossings.length} croisement${
      state.crossings.length > 1 ? "s" : ""
    } trouvé${state.crossings.length > 1 ? "s" : ""}`;
    title.style.marginTop = "0";
    dom.gridDisplay.appendChild(title);

    // List of crossings
    const listContainer = document.createElement("div");
    listContainer.className = "crossings-list";

    state.crossings.forEach((crossing, index) => {
      const item = document.createElement("div");
      item.className = `crossing-item${
        index === state.currentIndex ? " active" : ""
      }`;
      item.innerHTML = `
        <div class="crossing-words">
          <span class="word-horizontal">${crossing.word1}</span>
          <span class="cross-icon">×</span>
          <span class="word-vertical">${crossing.word2}</span>
        </div>
      `;
      item.addEventListener("click", () => {
        state.currentIndex = index;
        renderCrossingsList();
      });
      listContainer.appendChild(item);
    });

    dom.gridDisplay.appendChild(listContainer);

    // Display selected crossing grid
    if (state.crossings.length > 0) {
      renderCrosswordGrid();
    }
  }

  function renderCrosswordGrid() {
    // Remove old grid if exists
    const oldGrid = dom.gridDisplay.querySelector(".crossword-display");
    if (oldGrid) oldGrid.remove();

    const crossing = state.crossings[state.currentIndex];
    const gridContainer = document.createElement("div");
    gridContainer.className = "crossword-display";

    // Calculate grid dimensions
    const word1 = crossing.word1;
    const word2 = crossing.word2;
    const gridWidth = Math.max(word1.length, state.pos1 + 1);
    const gridHeight = Math.max(word2.length, state.pos2 + 1);

    // Create a 2D grid
    const grid = [];
    for (let i = 0; i < gridHeight + word2.length; i++) {
      grid[i] = [];
      for (let j = 0; j < gridWidth + word1.length; j++) {
        grid[i][j] = null;
      }
    }

    // Place word1 horizontally at row = state.pos2
    const row1 = state.pos2;
    for (let i = 0; i < word1.length; i++) {
      grid[row1][i] = { char: word1[i], crossing: i === state.pos1 };
    }

    // Place word2 vertically at col = state.pos1
    const col2 = state.pos1;
    for (let i = 0; i < word2.length; i++) {
      if (i === state.pos2) {
        grid[i][col2].crossing = true; // Mark as crossing point
      } else {
        grid[i][col2] = { char: word2[i], crossing: false };
      }
    }

    // Render the grid
    const gridEl = document.createElement("div");
    gridEl.className = "crossword-table";

    // Find bounds of actual content
    let minRow = gridHeight,
      maxRow = 0,
      minCol = gridWidth,
      maxCol = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j]) {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      }
    }

    // Render only the bounds
    for (let i = minRow; i <= maxRow; i++) {
      const rowEl = document.createElement("div");
      rowEl.className = "crossword-row";
      for (let j = minCol; j <= maxCol; j++) {
        const cell = document.createElement("div");
        if (grid[i][j]) {
          cell.className = `crossword-cell${
            grid[i][j].crossing ? " crossing" : ""
          }`;
          cell.textContent = grid[i][j].char;
        } else {
          cell.className = "crossword-cell empty";
        }
        rowEl.appendChild(cell);
      }
      gridEl.appendChild(rowEl);
    }

    gridContainer.appendChild(gridEl);

    // Action links
    const actions = document.createElement("div");
    actions.className = "result-actions";
    const link1 = document.createElement("a");
    link1.href = `https://www.larousse.fr/dictionnaires/francais/${crossing.word1.toLowerCase()}`;
    link1.target = "_blank";
    link1.className = "btn";
    link1.textContent = `${crossing.word1} →`;
    const link2 = document.createElement("a");
    link2.href = `https://www.larousse.fr/dictionnaires/francais/${crossing.word2.toLowerCase()}`;
    link2.target = "_blank";
    link2.className = "btn";
    link2.textContent = `${crossing.word2} →`;
    actions.appendChild(link1);
    actions.appendChild(link2);
    gridContainer.appendChild(actions);

    dom.gridDisplay.appendChild(gridContainer);
  }

  function renderResults() {
    renderCrossingsList();
  }

  function prevCrossing() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCrossingsList();
    }
  }

  function nextCrossing() {
    if (state.currentIndex < state.crossings.length - 1) {
      state.currentIndex++;
      renderCrossingsList();
    }
  }

  function restart() {
    state = {
      pattern1: "",
      pattern2: "",
      pos1: -1,
      pos2: -1,
      words1: [],
      words2: [],
      crossings: [],
      currentIndex: 0,
    };
    dom.input1.value = "";
    dom.input2.value = "";
    showStep(1);
  }

  function init() {
    dom.step1 = document.getElementById("step1");
    dom.step2 = document.getElementById("step2");
    dom.step3 = document.getElementById("step3");
    dom.input1 = document.getElementById("pattern1");
    dom.input2 = document.getElementById("pattern2");
    dom.btn1 = document.getElementById("validateBtn");
    dom.wordDisplay = document.getElementById("wordDisplay");
    dom.crossBtn = document.getElementById("crossBtn");
    dom.resultsContainer = document.getElementById("resultsContainer");
    dom.gridDisplay = document.getElementById("gridDisplay");

    if (!dom.step1) return; // not on crossing page

    dom.btn1.addEventListener("click", validateWords);
    dom.crossBtn.addEventListener("click", computeCrossings);
    document.getElementById("restartBtn")?.addEventListener("click", restart);

    // Helper buttons for mobile input
    document.querySelectorAll(".helper-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const char = btn.dataset.char;
        const action = btn.dataset.action;
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;

        if (action === "clear") {
          input.value = "";
          input.focus();
        } else if (char) {
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          const before = input.value.substring(0, start);
          const after = input.value.substring(end);
          input.value = before + char + after;
          input.focus();
          input.setSelectionRange(start + 1, start + 1);
        }
      });
    });

    showStep(1);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
