/**
 * Common types for TextRemapper extension
 */

export interface TextRemapperState {
  selectionPopup: HTMLDivElement | null;
  selectedText: string;
  isInitialized: boolean;
}

export type NotificationType = "success" | "error" | "info";

export type ShowNotificationFn = (message: string, type: NotificationType) => void;

export interface PopupPosition {
  x: number;
  y: number;
}

export interface ActionButtonHandler {
  selector: string;
  handler: (event: Event) => void;
}
