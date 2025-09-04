export const InitializeEventListeners = (
    selectionPopup: HTMLDivElement | null,
    showPopup: (x: number, y: number, text: string) => void,
    hidePopup: () => void
) => {
    let isPopupVisible = false;
    let selectionTimeout: number | null = null;

    document.addEventListener("mouseup", (event) => {
      // Clear any existing timeout
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
      }

      // Don't show popup if clicking inside the existing popup
      if (selectionPopup && selectionPopup.contains(event.target as Node)) {
        return;
      }

      // Use a longer timeout to prevent conflicts with popup interactions
      selectionTimeout = window.setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length > 0 && !isPopupVisible) {
          const rect = selection?.getRangeAt(0).getBoundingClientRect();
          if (rect) {
            const x = rect.left + (rect.width / 2) + window.pageXOffset;
            const y = rect.top + window.pageYOffset;
            showPopup(x, y, text);
            isPopupVisible = true;
          }
        } else if (!text || text.length === 0) {
          hidePopup();
          isPopupVisible = false;
        }
      }, 150); // Increased timeout to prevent conflicts
    });

    // Hide popup when clicking elsewhere with better logic
    document.addEventListener("mousedown", (event) => {
      const target = event.target as Node;
      
      // Don't hide if clicking inside popup
      if (selectionPopup && selectionPopup.contains(target)) {
        return;
      }

      // Hide popup and update state
      if (isPopupVisible) {
        hidePopup();
        isPopupVisible = false;
      }
    });

    // Hide popup on scroll
    document.addEventListener("scroll", () => {
      if (isPopupVisible) {
        hidePopup();
        isPopupVisible = false;
      }
    });

    // Hide popup when selection changes
    document.addEventListener("selectionchange", () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (!text && isPopupVisible) {
        hidePopup();
        isPopupVisible = false;
      }
    });

    // Handle messages from popup/background script
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      console.log("Content script received message:", request);

      switch (request.action) {
        case "getPageText":
          const selection = window.getSelection();
          const selectedText = selection?.toString() || "";
          const pageText = document.body.innerText || "";

          sendResponse({
            selectedText,
            pageText,
            url: window.location.href,
            title: document.title,
          });
          break;

        case "hidePopup":
          hidePopup();
          isPopupVisible = false;
          sendResponse({ success: true });
          break;

        default:
          sendResponse({ error: "Unknown action" });
      }

      return true;
    });

}