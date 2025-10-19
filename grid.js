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
      if (p === "*" || p === " ") continue;
      if (p === "/" && !vowels.has(w)) score++;
      else if (p === "#" && !isConsonant(w)) score++;
      else if (p !== "/" && p !== "#" && w !== p) score++;
    }
    return score;
  }

  function findWords(pattern) {
    if (!pattern || pattern.replace(/\s/g, "").length === 0) return [];
    const list = getWordListByLength(pattern.length);
    const scored = [];
    for (const w of list) {
      const word = String(w).toUpperCase();
      const score = scoreWord(pattern, word);
      if (score < Infinity) scored.push({ word, score });
    }
    scored.sort((a, b) => a.score - b.score || a.word.localeCompare(b.word));
    return scored.slice(0, 50); // cap at 50 per word
  }

  let state = {
    gridSize: 15,
    grid: [],
    words: [], // {pattern, row, col, direction, length}
    solutions: [],
  };

  const dom = {
    gridSizeInput: null,
    createBtn: null,
    gridContainer: null,
    solveBtn: null,
    resultsContainer: null,
  };

  function createGrid() {
    const sizeInput = dom.gridSizeInput.value.trim();
    let size = 15;
    if (sizeInput) {
      const parsed = parseInt(sizeInput);
      if (parsed >= 5 && parsed <= 25) size = parsed;
    }
    state.gridSize = size;
    state.grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(""));
    renderGrid();
  }

  function renderGrid() {
    dom.gridContainer.innerHTML = "";
    const table = document.createElement("div");
    table.className = "grid-table";

    for (let row = 0; row < state.gridSize; row++) {
      const rowEl = document.createElement("div");
      rowEl.className = "grid-row";
      for (let col = 0; col < state.gridSize; col++) {
        const cell = document.createElement("input");
        cell.className = "grid-cell";
        cell.type = "text";
        cell.maxLength = 1;
        cell.value = state.grid[row][col] || "";
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("input", (e) => {
          const val = e.target.value.toUpperCase();
          state.grid[row][col] = val;
          e.target.value = val;
          // Auto-move to next cell
          if (val && col < state.gridSize - 1) {
            const nextCell = rowEl.children[col + 1];
            if (nextCell) nextCell.focus();
          }
        });
        cell.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !cell.value && col > 0) {
            const prevCell = rowEl.children[col - 1];
            if (prevCell) {
              prevCell.focus();
              prevCell.select();
            }
          }
        });
        rowEl.appendChild(cell);
      }
      table.appendChild(rowEl);
    }
    dom.gridContainer.appendChild(table);

    // Add solve button
    const actions = document.createElement("div");
    actions.className = "grid-actions";
    const solveBtn = document.createElement("button");
    solveBtn.className = "btn primary";
    solveBtn.textContent = "Résoudre la grille";
    solveBtn.addEventListener("click", solveGrid);
    const clearBtn = document.createElement("button");
    clearBtn.className = "btn danger";
    clearBtn.textContent = "Effacer la grille";
    clearBtn.addEventListener("click", () => {
      state.grid = Array(state.gridSize)
        .fill(null)
        .map(() => Array(state.gridSize).fill(""));
      renderGrid();
    });
    actions.appendChild(solveBtn);
    actions.appendChild(clearBtn);
    dom.gridContainer.appendChild(actions);
  }

  function extractWords() {
    state.words = [];
    // Extract horizontal words
    for (let row = 0; row < state.gridSize; row++) {
      let word = "";
      let startCol = -1;
      for (let col = 0; col <= state.gridSize; col++) {
        const char = col < state.gridSize ? state.grid[row][col] : "";
        if (char && char !== " ") {
          if (word === "") {
            startCol = col;
          }
          word += char;
        } else {
          if (word.length >= 2) {
            state.words.push({
              pattern: word,
              row,
              col: startCol,
              direction: "H",
              length: word.length,
            });
          }
          word = "";
          startCol = -1;
        }
      }
    }

    // Extract vertical words
    for (let col = 0; col < state.gridSize; col++) {
      let word = "";
      let startRow = -1;
      for (let row = 0; row <= state.gridSize; row++) {
        const char = row < state.gridSize ? state.grid[row][col] : "";
        if (char && char !== " ") {
          if (word === "") {
            startRow = row;
          }
          word += char;
        } else {
          if (word.length >= 2) {
            state.words.push({
              pattern: word,
              row: startRow,
              col,
              direction: "V",
              length: word.length,
            });
          }
          word = "";
          startRow = -1;
        }
      }
    }
  }

  function solveGrid() {
    extractWords();
    if (state.words.length === 0) {
      alert(
        "Aucun mot détecté dans la grille. Ajoutez des lettres, *, / ou # pour créer des mots."
      );
      return;
    }

    // Find candidates for each word
    const wordCandidates = state.words.map((w) => ({
      ...w,
      candidates: findWords(w.pattern),
    }));

    // Filter out words with no candidates
    const validWords = wordCandidates.filter((w) => w.candidates.length > 0);
    if (validWords.length === 0) {
      alert("Aucune solution trouvée pour les mots de la grille.");
      return;
    }

    // Find crossing constraints
    const crossings = [];
    for (let i = 0; i < validWords.length; i++) {
      for (let j = i + 1; j < validWords.length; j++) {
        const w1 = validWords[i];
        const w2 = validWords[j];
        const cross = findCrossing(w1, w2);
        if (cross) {
          crossings.push({ w1Index: i, w2Index: j, ...cross });
        }
      }
    }

    // Solve with backtracking
    const solutions = [];
    const assignment = Array(validWords.length).fill(null);

    function backtrack(wordIndex) {
      if (wordIndex === validWords.length) {
        // Found a solution
        solutions.push([...assignment]);
        return solutions.length < 20; // limit to 20 solutions
      }

      const word = validWords[wordIndex];
      for (const candidate of word.candidates) {
        assignment[wordIndex] = candidate.word;

        // Check all crossings involving this word
        let valid = true;
        for (const cross of crossings) {
          if (cross.w1Index === wordIndex && assignment[cross.w2Index]) {
            const c1 = assignment[wordIndex][cross.pos1];
            const c2 = assignment[cross.w2Index][cross.pos2];
            if (c1 !== c2) {
              valid = false;
              break;
            }
          }
          if (cross.w2Index === wordIndex && assignment[cross.w1Index]) {
            const c1 = assignment[cross.w1Index][cross.pos1];
            const c2 = assignment[wordIndex][cross.pos2];
            if (c1 !== c2) {
              valid = false;
              break;
            }
          }
        }

        if (valid && backtrack(wordIndex + 1)) return true;
      }

      assignment[wordIndex] = null;
      return false;
    }

    backtrack(0);

    if (solutions.length === 0) {
      alert("Aucune solution trouvée avec les contraintes de croisement.");
      return;
    }

    displaySolutions(validWords, solutions);
  }

  function findCrossing(w1, w2) {
    if (w1.direction === w2.direction) return null;

    const [hWord, vWord] = w1.direction === "H" ? [w1, w2] : [w2, w1];

    // Check if they intersect
    if (
      vWord.col >= hWord.col &&
      vWord.col < hWord.col + hWord.length &&
      hWord.row >= vWord.row &&
      hWord.row < vWord.row + vWord.length
    ) {
      const pos1 =
        w1.direction === "H" ? vWord.col - hWord.col : hWord.row - vWord.row;
      const pos2 =
        w1.direction === "H" ? hWord.row - vWord.row : vWord.col - hWord.col;
      return { pos1, pos2 };
    }
    return null;
  }

  function displaySolutions(words, solutions) {
    dom.resultsContainer.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = `${solutions.length} solution${
      solutions.length > 1 ? "s" : ""
    } trouvée${solutions.length > 1 ? "s" : ""}`;
    title.style.marginTop = "16px";
    dom.resultsContainer.appendChild(title);

    const list = document.createElement("div");
    list.className = "solutions-list";

    solutions.forEach((solution, idx) => {
      const item = document.createElement("div");
      item.className = "solution-item";

      const header = document.createElement("div");
      header.className = "solution-header";
      header.textContent = `Solution ${idx + 1}`;
      header.addEventListener("click", () => {
        displaySolutionGrid(words, solution);
        document
          .querySelectorAll(".solution-item")
          .forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      });

      const wordsList = document.createElement("div");
      wordsList.className = "solution-words";
      solution.forEach((word, i) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.className = words[i].direction === "H" ? "word-h" : "word-v";
        wordsList.appendChild(span);
      });

      item.appendChild(header);
      item.appendChild(wordsList);
      list.appendChild(item);

      // Auto-select first
      if (idx === 0) {
        item.classList.add("active");
        displaySolutionGrid(words, solution);
      }
    });

    dom.resultsContainer.appendChild(list);
  }

  function displaySolutionGrid(words, solution) {
    const existing = dom.resultsContainer.querySelector(
      ".solution-grid-display"
    );
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "solution-grid-display";

    const gridEl = document.createElement("div");
    gridEl.className = "solution-grid";

    // Create solution grid
    const solGrid = Array(state.gridSize)
      .fill(null)
      .map(() => Array(state.gridSize).fill(""));
    words.forEach((w, i) => {
      const word = solution[i];
      if (w.direction === "H") {
        for (let k = 0; k < word.length; k++) {
          solGrid[w.row][w.col + k] = word[k];
        }
      } else {
        for (let k = 0; k < word.length; k++) {
          solGrid[w.row + k][w.col] = word[k];
        }
      }
    });

    // Find bounds
    let minRow = state.gridSize,
      maxRow = 0,
      minCol = state.gridSize,
      maxCol = 0;
    for (let r = 0; r < state.gridSize; r++) {
      for (let c = 0; c < state.gridSize; c++) {
        if (solGrid[r][c]) {
          minRow = Math.min(minRow, r);
          maxRow = Math.max(maxRow, r);
          minCol = Math.min(minCol, c);
          maxCol = Math.max(maxCol, c);
        }
      }
    }

    // Render grid
    for (let r = minRow; r <= maxRow; r++) {
      const row = document.createElement("div");
      row.className = "crossword-row";
      for (let c = minCol; c <= maxCol; c++) {
        const cell = document.createElement("div");
        cell.className = solGrid[r][c]
          ? "crossword-cell"
          : "crossword-cell empty";
        cell.textContent = solGrid[r][c] || "";
        row.appendChild(cell);
      }
      gridEl.appendChild(row);
    }

    container.appendChild(gridEl);

    // Add word links
    const links = document.createElement("div");
    links.className = "result-actions";
    solution.forEach((word) => {
      const link = document.createElement("a");
      link.href = `https://www.larousse.fr/dictionnaires/francais/${word.toLowerCase()}`;
      link.target = "_blank";
      link.className = "btn";
      link.textContent = `${word} →`;
      links.appendChild(link);
    });
    container.appendChild(links);

    dom.resultsContainer.appendChild(container);
  }

  function init() {
    dom.gridSizeInput = document.getElementById("gridSizeInput");
    dom.createBtn = document.getElementById("createGridBtn");
    dom.gridContainer = document.getElementById("gridContainer");
    dom.resultsContainer = document.getElementById("resultsContainer");

    if (!dom.gridContainer) return; // not on this page

    dom.createBtn?.addEventListener("click", createGrid);

    // Auto-create default grid
    createGrid();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
