/**
 * Business Case for Digital Sustainability — homepage filtering.
 *
 * Deliberately dependency-free and lightweight:
 * - No network requests, no third-party library.
 * - Filters the story cards that are already rendered server-side by
 *   Jekyll, so the page works (minus filtering) even if JS fails to load.
 * - Tag buttons use OR logic within the tag set
 */
(function () {
  "use strict";

  var grid = document.querySelector("[data-story-grid]");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-story-card]"));
  var tagButtons = Array.prototype.slice.call(document.querySelectorAll("[data-tag-button]"));
  var resetButton = document.querySelector("[data-tag-reset]");
  var statusEl = document.querySelector("[data-filter-status]");
  var noResultsEl = document.querySelector("[data-no-results]");
  var paginationEl = document.querySelector("[data-pagination]");

  var PAGE_SIZE = parseInt(grid.getAttribute("data-page-size"), 10) || 9;
  var activeTags = new Set();
  var currentPage = 1;

  function normalise(str) {
    return (str || "").toLowerCase().trim();
  }

  function cardMatchesTags(card) {
    if (activeTags.size === 0) return true;
    var cardTags = (card.getAttribute("data-tags") || "").split(" ");
    for (var i = 0; i < cardTags.length; i++) {
      if (activeTags.has(cardTags[i])) return true;
    }
    return false;
  }

  function goToPage(page, opts) {
    currentPage = page;
    render(opts);
    if (opts && opts.scroll) {
      grid.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;

    paginationEl.innerHTML = "";

    if (totalPages <= 1) {
      paginationEl.hidden = true;
      return;
    }
    paginationEl.hidden = false;

    var list = document.createElement("ul");
    list.className = "pagination__list";

    function addButton(label, page, opts) {
      opts = opts || {};
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.className = "pagination__button" + (opts.current ? " is-current" : "");
      if (opts.current) button.setAttribute("aria-current", "page");
      if (opts.disabled) button.disabled = true;
      if (opts.srLabel) {
        var srSpan = document.createElement("span");
        srSpan.className = "visually-hidden";
        srSpan.textContent = " " + opts.srLabel;
        button.appendChild(srSpan);
      }
      button.addEventListener("click", function () {
        goToPage(page, { scroll: true });
      });
      li.appendChild(button);
      list.appendChild(li);
    }

    addButton("‹ Previous", Math.max(1, currentPage - 1), {
      disabled: currentPage === 1,
      srLabel: "page",
    });

    for (var p = 1; p <= totalPages; p++) {
      addButton(String(p), p, {
        current: p === currentPage,
        srLabel: p === currentPage ? "(current page)" : "",
      });
    }

    addButton("Next ›", Math.min(totalPages, currentPage + 1), {
      disabled: currentPage === totalPages,
      srLabel: "page",
    });

    paginationEl.appendChild(list);
  }

  function render(opts) {
    opts = opts || {};
    if (opts.resetPage) currentPage = 1;

    var matching = cards.filter(function (card) {
      return cardMatchesTags(card);
    });

    var totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    var start = (currentPage - 1) * PAGE_SIZE;
    var pageItems = matching.slice(start, start + PAGE_SIZE);

    cards.forEach(function (card) {
      card.hidden = pageItems.indexOf(card) === -1;
    });

    if (noResultsEl) {
      noResultsEl.hidden = matching.length !== 0;
    }

    if (statusEl) {
      if (matching.length === 0) {
        statusEl.textContent = "No stories match your filters.";
      } else {
        var rangeStart = start + 1;
        var rangeEnd = Math.min(start + PAGE_SIZE, matching.length);
        statusEl.textContent =
          "Showing " + rangeStart + "–" + rangeEnd + " of " + matching.length +
          (matching.length === cards.length ? " stories." : " matching stories.") +
          (totalPages > 1 ? " Page " + currentPage + " of " + totalPages + "." : "");
      }
    }

    renderPagination(totalPages);
  }

  tagButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var tag = button.getAttribute("data-tag-button");
      var pressed = button.getAttribute("aria-pressed") === "true";

      if (pressed) {
        activeTags.delete(tag);
        button.setAttribute("aria-pressed", "false");
      } else {
        activeTags.add(tag);
        button.setAttribute("aria-pressed", "true");
      }

      render({ resetPage: true });
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      activeTags.clear();
      tagButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", "false");
      });
      render({ resetPage: true });
    });
  }

  render();
})();