export interface QueryEditorPointerEvent {
  altKey: boolean;
  button: number;
}

export interface QueryEditorSelectionDragEvent {
  detail: number;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

export interface QueryEditorObjectNavigationModifierEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

export function startsQueryEditorRectangularSelection(event: QueryEditorPointerEvent): boolean {
  return event.altKey || event.button === 1;
}

export function startsQueryEditorSelectionDrag(event: QueryEditorSelectionDragEvent): boolean {
  return !event.shiftKey && event.detail <= 1;
}

/**
 * Move/copy-by-drag requires an explicit Ctrl/Cmd. Without it, a press inside the
 * current selection must stay a CodeMirror selection gesture: the custom drag
 * suppresses CodeMirror's mousedown and owns the pointer for the whole gesture
 * (it only re-selects on mouseup), so the drawn selection freezes and an
 * accidental drag silently relocates the selected SQL.
 */
export function startsQueryEditorSelectionMoveDrag(event: QueryEditorSelectionDragEvent): boolean {
  return event.detail <= 1 && (event.ctrlKey || event.metaKey);
}

export function usesQueryEditorObjectNavigationModifier(event: QueryEditorObjectNavigationModifierEvent): boolean {
  return !event.altKey && (event.metaKey || event.ctrlKey);
}
