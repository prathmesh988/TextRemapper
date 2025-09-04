export function setupPopupEventListeners(
  selectionPopup: HTMLDivElement | null,
  hidePopup: () => void,
  selectedText: string,
  copyTextToClipboard: (text: string) => void,
  highlightSelectedText: () => void,
  saveTextAsNote: (text: string) => void,
  translateText: (text: string) => void,
  searchText: (text: string) => void
) {
  if (!selectionPopup) return;

  // Close button
  const closeBtn = selectionPopup.querySelector("#tr-close-btn");
  closeBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    hidePopup();
  });

  // Save as note button
  const saveNoteBtn = selectionPopup.querySelector("#tr-save-note");
  saveNoteBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    saveTextAsNote(selectedText);
    hidePopup();
  });

  // Highlight button
  const highlightBtn = selectionPopup.querySelector("#tr-highlight-text");
  highlightBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    highlightSelectedText();
    hidePopup();
  });

  // Copy button
  const copyBtn = selectionPopup.querySelector("#tr-copy-text");
  copyBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    copyTextToClipboard(selectedText);
    hidePopup();
  });

  // Translate button
  const translateBtn = selectionPopup.querySelector("#tr-translate-text");
  translateBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    translateText(selectedText);
    hidePopup();
  });

  // Search button
  const searchBtn = selectionPopup.querySelector("#tr-search-text");
  searchBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    searchText(selectedText);
    hidePopup();
  });
}
