// Core imports

import type { TextRemapperState } from "./types";
import { TextRemapperPopup } from "./TextRemapper";
// Content script for text selection popup
console.log("TextRemapper content script loaded");

// Application state
const state: TextRemapperState = {
  selectionPopup: null,
  selectedText: "",
  isInitialized: false,
};

// Initialize the application
const textRemapper = new TextRemapperPopup(state);

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    textRemapper.initialize()
  );
} else {
  textRemapper.initialize();
}

// Make TextRemapper available globally for debugging
declare global {
  interface Window {
    textRemapper: TextRemapperPopup;
  }
}

window.textRemapper = textRemapper;
