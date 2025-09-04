import { showNotification } from "./TranslateText";

export function searchText(text: string) {
  const encodedText = encodeURIComponent(text);
  const searchUrl = `https://www.google.com/search?q=${encodedText}`;
  window.open(searchUrl, "_blank");
  showNotification("🔍 Searching Google...", "info");
}
