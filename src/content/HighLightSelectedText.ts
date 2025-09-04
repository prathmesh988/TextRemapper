export function highlightSelectedText(
    showNotification: (message: string, type: "success" | "error") => void
) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "#ffeb3b";
    span.style.padding = "2px 4px";
    span.style.borderRadius = "3px";
    span.title = "Highlighted by TextRemapper";

    try {
      range.surroundContents(span);
      showNotification("🖍️ Text highlighted!", "success");
    } catch (error) {
      console.error("Error highlighting text:", error);
      showNotification("❌ Could not highlight text", "error");
    }
  }
}