import { createSelectionPopup } from "./CreateSelectionPoup";
import { InitializeEventListeners } from "./EventListners/InitializeEventListners";
import { highlightSelectedText } from "./HighLightSelectedText";
import { saveTextAsNote } from "./SaveTextAsNote";
import { searchText } from "./SearchText";
import { showNotification, translateText } from "./TranslateText";
import { TextRemapperState } from "./types";

export class TextRemapperPopup {
  private state: TextRemapperState;

  constructor(initialState: TextRemapperState) {
    this.state = initialState;
  }

  /**
   * Show popup at the specified position
   */
  showPopup = (x: number, y: number, text: string): void => {
    if (!this.state.selectionPopup) {
      this.state.selectionPopup = createSelectionPopup();
      this.setupPopupEventListeners();
    }

    this.state.selectedText = text;
    this.state.selectionPopup.style.display = "block";

    // Position the popup with smart viewport detection
    this.positionPopup(x, y);
  };

  /**
   * Hide popup
   */
  hidePopup = (): void => {
    if (this.state.selectionPopup) {
      this.state.selectionPopup.style.display = "none";
      this.state.selectionPopup.style.visibility = "hidden";
      // Clear selected text when hiding
      this.state.selectedText = "";
    }
  };

  /**
   * Position popup within viewport bounds
   */
  private positionPopup(x: number, y: number): void {
    if (!this.state.selectionPopup) return;

    // Force a layout calculation to get accurate dimensions
    this.state.selectionPopup.style.visibility = 'hidden';
    this.state.selectionPopup.style.display = 'block';
    
    const rect = this.state.selectionPopup.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Calculate popup position with better logic
    let popupX = x - (rect.width / 2); // Center horizontally on selection
    let popupY = y - rect.height - 15; // Position above selection with more margin

    // Horizontal positioning: ensure popup stays within viewport
    if (popupX < scrollLeft + 10) {
      popupX = scrollLeft + 10; // Too far left
    } else if (popupX + rect.width > scrollLeft + viewportWidth - 10) {
      popupX = scrollLeft + viewportWidth - rect.width - 10; // Too far right
    }

    // Vertical positioning: if popup goes above viewport, show below selection
    if (popupY < scrollTop + 10) {
      popupY = y + 25; // Show below selection with margin
    }

    // Final check: if popup goes below viewport when shown below, try to fit above
    if (popupY + rect.height > scrollTop + viewportHeight - 10) {
      const aboveY = y - rect.height - 15;
      if (aboveY >= scrollTop + 10) {
        popupY = aboveY; // Use above position if it fits
      } else {
        // If neither position works well, position at top of viewport
        popupY = scrollTop + 10;
      }
    }

    // Apply positioning and make visible
    this.state.selectionPopup.style.left = `${popupX}px`;
    this.state.selectionPopup.style.top = `${popupY}px`;
    this.state.selectionPopup.style.visibility = 'visible';
  }

  /**
   * Setup event listeners for popup buttons
   */
  private setupPopupEventListeners(): void {
    if (!this.state.selectionPopup) return;

    const buttonHandlers = {
      "#tr-close-btn": this.handleCloseClick,
      "#tr-save-note": this.handleSaveNoteClick,
      "#tr-highlight-text": this.handleHighlightClick,
      "#tr-copy-text": this.handleCopyClick,
      "#tr-translate-text": this.handleTranslateClick,
      "#tr-search-text": this.handleSearchClick,
    };

    // Attach event listeners with proper error handling
    Object.entries(buttonHandlers).forEach(([selector, handler]) => {
      const button = this.state.selectionPopup?.querySelector(selector);
      if (button) {
        button.addEventListener("click", handler);
      }
    });
  }

  /**
   * Event handlers for popup buttons
   */
  private handleCloseClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // Clear selection to prevent popup from reappearing
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
    
    this.hidePopup();
  };

  private handleSaveNoteClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    this.executeAction(() =>
      saveTextAsNote(this.state.selectedText, showNotification)
    );
  };

  private handleHighlightClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    this.executeAction(() => highlightSelectedText(showNotification));
  };

  private handleCopyClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    this.executeAction(() => this.copyTextToClipboard(this.state.selectedText));
  };

  private handleTranslateClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    this.executeAction(() => translateText(this.state.selectedText));
  };

  private handleSearchClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    this.executeAction(() => searchText(this.state.selectedText));
  };

  /**
   * Execute an action and hide popup
   */
  private executeAction(action: () => void | Promise<void>): void {
    try {
      action();
      
      // Clear selection after action to prevent popup from reappearing
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
      }, 100);
      
      this.hidePopup();
    } catch (error) {
      console.error("Error executing action:", error);
      showNotification("❌ Action failed", "error");
    }
  }

  /**
   * Copy text to clipboard with proper error handling
   */
  private async copyTextToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      showNotification("📋 Text copied to clipboard!", "success");
    } catch (error) {
      console.error("Error copying text:", error);
      showNotification("❌ Failed to copy text", "error");
    }
  }

  /**
   * Initialize the TextRemapper extension
   */
  initialize(): void {
    if (this.state.isInitialized) {
      console.warn("TextRemapper already initialized");
      return;
    }

    try {
      // Initialize event listeners
      InitializeEventListeners(
        this.state.selectionPopup,
        this.showPopup,
        this.hidePopup
      );

      this.state.isInitialized = true;
      console.log(
        "✅ TextRemapper successfully initialized on:",
        window.location.href
      );
    } catch (error) {
      console.error("❌ Failed to initialize TextRemapper:", error);
    }
  }

  /**
   * Get current state (for debugging)
   */
  getState(): TextRemapperState {
    return { ...this.state };
  }
}
