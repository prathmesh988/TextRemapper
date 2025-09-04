export function createSelectionPopup(): HTMLDivElement {
  const popup = document.createElement("div");
  popup.id = "text-remapper-popup";
  popup.innerHTML = `
    <div class="tr-popup-content">
      <div class="tr-popup-header">
        <span class="tr-popup-title">Text Options</span>
        <button class="tr-popup-close" id="tr-close-btn">×</button>
      </div>
      <div class="tr-popup-actions">
        <button class="tr-popup-btn" id="tr-save-note">
          📝 Save as Note
        </button>
        <button class="tr-popup-btn" id="tr-highlight-text">
          🖍️ Highlight
        </button>
        <button class="tr-popup-btn" id="tr-copy-text">
          📋 Copy
        </button>
        <button class="tr-popup-btn" id="tr-translate-text">
          🌐 Translate
        </button>
        <button class="tr-popup-btn" id="tr-search-text">
          🔍 Search
        </button>
      </div>
    </div>
  `;

  // Add styles
  popup.style.cssText = `
    position: fixed;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    min-width: 250px;
    max-width: 300px;
    display: none;
    visibility: hidden;
    pointer-events: auto;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  `;

  // Add internal styles
  const style = document.createElement("style");
  style.textContent = `
    #text-remapper-popup .tr-popup-content {
      padding: 0;
    }
    
    #text-remapper-popup .tr-popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #f5f5f5;
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid #e0e0e0;
    }
    
    #text-remapper-popup .tr-popup-title {
      font-weight: 600;
      color: #333;
    }
    
    #text-remapper-popup .tr-popup-close {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    
    #text-remapper-popup .tr-popup-close:hover {
      background-color: #e0e0e0;
    }
    
    #text-remapper-popup .tr-popup-actions {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    #text-remapper-popup .tr-popup-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 13px;
      text-align: left;
      width: 100%;
    }
    
    #text-remapper-popup .tr-popup-btn:hover {
      background: #f8f9fa;
      border-color: #1976d2;
      color: #1976d2;
    }
    
    #text-remapper-popup .tr-popup-btn:active {
      transform: translateY(1px);
    }
    
    @media (prefers-color-scheme: dark) {
      #text-remapper-popup {
        background: #2d3748;
        border-color: #4a5568;
        color: white;
      }
      
      #text-remapper-popup .tr-popup-header {
        background: #374151;
        border-bottom-color: #4a5568;
      }
      
      #text-remapper-popup .tr-popup-title {
        color: white;
      }
      
      #text-remapper-popup .tr-popup-close {
        color: #cbd5e0;
      }
      
      #text-remapper-popup .tr-popup-btn {
        background: #374151;
        border-color: #4a5568;
        color: white;
      }
      
      #text-remapper-popup .tr-popup-btn:hover {
        background: #4a5568;
        border-color: #63b3ed;
        color: #63b3ed;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(popup);

  return popup;
}



