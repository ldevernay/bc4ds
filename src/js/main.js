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

  var activeTags = new Set();

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

  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var visible = cardMatchesTags(card);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (noResultsEl) {
      noResultsEl.hidden = visibleCount !== 0;
    }

    if (statusEl) {
      statusEl.textContent =
        visibleCount === cards.length
          ? "Showing all " + cards.length + " stories."
          : "Showing " + visibleCount + " of " + cards.length + " stories.";
    }
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

      applyFilters();
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      activeTags.clear();
      tagButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", "false");
      });
      applyFilters();
    });
  }
  applyFilters();
})();
