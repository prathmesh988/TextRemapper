export function translateText(text: string) {
  const encodedText = encodeURIComponent(text);
  const translateUrl = `https://translate.google.com/?text=${encodedText}&op=translate`;
  window.open(translateUrl, "_blank");
  showNotification("🌐 Opening Google Translate...", "info");
}

// Show notification
export function showNotification(
  message: string,
  type: "success" | "error" | "info" = "info"
) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"
    };
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    z-index: 10001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  `;

  // Add animation keyframes
  if (!document.querySelector("#tr-notification-styles")) {
    const style = document.createElement("style");
    style.id = "tr-notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
