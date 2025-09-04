# TextRemapper Content Script Architecture

This document describes the modular architecture of the TextRemapper content script.

## 📁 File Structure

```
src/content/
├── main.ts                     # Main entry point and orchestration
├── types.ts                    # Shared TypeScript interfaces
├── CreateSelectionPopup.ts     # Popup UI creation and styling
├── ShowPopup.ts                # Popup positioning logic
├── SaveTextAsNote.ts           # Note saving functionality
├── HighLightSelectedText.ts    # Text highlighting feature  
├── CopyToClipBoard.ts          # Clipboard operations
├── TranslateText.ts            # Translation and notifications
├── SearchText.ts               # Search functionality
├── popup.ts                    # Additional popup utilities
└── EventListeners/
    ├── InitializeEventListeners.ts    # Global event listeners
    └── SetupPopupEventListeners.ts    # Popup button handlers
```

## 🏗️ Architecture Overview

### Main TextRemapper Class
The `TextRemapper` class in `main.ts` orchestrates all functionality:

- **State Management**: Centralized state for popup, selected text, and initialization
- **Event Coordination**: Manages the flow between different modules  
- **Error Handling**: Consistent error handling across all actions
- **Lifecycle Management**: Proper initialization and cleanup

### Modular Design Benefits

1. **Separation of Concerns**: Each file has a single, well-defined responsibility
2. **Reusability**: Functions can be imported and used in different contexts
3. **Testability**: Individual modules can be tested in isolation
4. **Maintainability**: Easier to modify specific features without affecting others
5. **Type Safety**: Shared types ensure consistency across modules

### Key Modules

#### UI Components
- `CreateSelectionPopup.ts`: Creates the popup DOM structure with styles
- `ShowPopup.ts`: Handles smart positioning within viewport bounds

#### Feature Modules  
- `SaveTextAsNote.ts`: Integrates with Chrome storage to save notes
- `HighLightSelectedText.ts`: Highlights selected text on the page
- `CopyToClipBoard.ts`: Handles clipboard API operations
- `TranslateText.ts`: Opens Google Translate + notification system
- `SearchText.ts`: Opens Google Search in new tab

#### Event Management
- `InitializeEventListeners.ts`: Sets up global page listeners (mouseup, scroll, etc.)
- `SetupPopupEventListeners.ts`: Binds click handlers to popup buttons

## 🔄 Data Flow

1. User selects text on webpage
2. `InitializeEventListeners` detects selection
3. `TextRemapper.showPopup()` is called
4. `CreateSelectionPopup` creates UI if needed
5. `ShowPopup` positions popup intelligently  
6. User clicks action button
7. Corresponding feature module executes action
8. `TranslateText.showNotification()` provides user feedback
9. Popup is hidden automatically

## 🎯 Usage Example

```typescript
// Import the main class
import { TextRemapper } from './main';

// Initialize
const textRemapper = new TextRemapper(state);
textRemapper.initialize();

// Access globally for debugging
window.textRemapper.getState();
```

## 🚀 Extension Points

To add new features:

1. Create new module in `src/content/`
2. Export function following the pattern: `(text: string, showNotification: ShowNotificationFn) => void`
3. Add button to `CreateSelectionPopup.ts`
4. Add event handler to `TextRemapper.setupPopupEventListeners()`
5. Import and use in `main.ts`

This architecture makes the codebase clean, maintainable, and easy to extend!
