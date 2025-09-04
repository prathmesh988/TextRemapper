export async function copyTextToClipboard(
  text: string, 
  showNotification: (message: string, type: "success" | "error") => void
) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification("📋 Text copied to clipboard!", "success");
  } catch (error) {
    console.error("Error copying text:", error);
    showNotification("❌ Failed to copy text", "error");
  }
}
