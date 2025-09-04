export function showPopup(
  x: number, 
  y: number, 
  selectionPopup: HTMLDivElement | null,
  createSelectionPopup: () => HTMLDivElement,
  setupPopupEventListeners: () => void
) {
  if (!selectionPopup) {
    selectionPopup = createSelectionPopup();
    setupPopupEventListeners();
  }

  selectionPopup.style.display = "block";

  // Position the popup
  const rect = selectionPopup.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  // Adjust position to keep popup in viewport
  let popupX = x;
  let popupY = y - rect.height - 10; // Position above selection by default

  // If popup goes off right edge, move it left
  if (popupX + rect.width > viewportWidth) {
    popupX = viewportWidth - rect.width - 10;
  }

  // If popup goes off left edge, move it right
  if (popupX < 10) {
    popupX = 10;
  }

  // If popup goes off top, show it below selection
  if (popupY < 10) {
    popupY = y + 20;
  }

  selectionPopup.style.left = `${popupX}px`;
  selectionPopup.style.top = `${popupY}px`;

  return selectionPopup;
}
