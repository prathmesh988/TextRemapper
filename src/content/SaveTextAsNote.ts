export async function saveTextAsNote(text: string,
    showNotification: (message: string, type: "success" | "error") => void
    
) {
  try {
    // Send message to popup/background script to save note
    await chrome.runtime.sendMessage({
      action: "saveNote",
      data: {
        title: `Note from ${window.location.hostname}`,
        content: text,
        url: window.location.href,
        timestamp: Date.now(),
      },
    });

    showNotification("💾 Text saved as note!", "success");
  } catch (error) {
    console.error("Error saving note:", error);
    showNotification("❌ Failed to save note", "error");
  }
}