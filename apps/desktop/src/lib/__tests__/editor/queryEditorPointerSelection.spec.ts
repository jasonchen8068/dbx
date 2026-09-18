import { describe, expect, it } from "vitest";
import { startsQueryEditorRectangularSelection, startsQueryEditorSelectionDrag, startsQueryEditorSelectionMoveDrag, usesQueryEditorObjectNavigationModifier } from "@/lib/editor/queryEditorPointerSelection";

describe("query editor pointer selection", () => {
  it("starts rectangular selection for Alt+left drag", () => {
    expect(startsQueryEditorRectangularSelection({ altKey: true, button: 0 })).toBe(true);
  });

  it("starts rectangular selection for middle-button drag", () => {
    expect(startsQueryEditorRectangularSelection({ altKey: false, button: 1 })).toBe(true);
  });

  it("leaves ordinary left clicks to the normal cursor handler", () => {
    expect(startsQueryEditorRectangularSelection({ altKey: false, button: 0 })).toBe(false);
  });

  it("leaves multi-click and Shift selection gestures to CodeMirror", () => {
    expect(startsQueryEditorSelectionDrag({ detail: 0, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(true);
    expect(startsQueryEditorSelectionDrag({ detail: 1, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(true);
    expect(startsQueryEditorSelectionDrag({ detail: 1, shiftKey: true, ctrlKey: false, metaKey: false })).toBe(false);
    expect(startsQueryEditorSelectionDrag({ detail: 2, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(false);
    expect(startsQueryEditorSelectionDrag({ detail: 3, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(false);
  });

  it("takes over the drag only when Cmd or Ctrl is held", () => {
    expect(startsQueryEditorSelectionMoveDrag({ detail: 1, shiftKey: false, ctrlKey: true, metaKey: false })).toBe(true);
    expect(startsQueryEditorSelectionMoveDrag({ detail: 1, shiftKey: false, ctrlKey: false, metaKey: true })).toBe(true);
    expect(startsQueryEditorSelectionMoveDrag({ detail: 1, shiftKey: true, ctrlKey: true, metaKey: false })).toBe(true);
  });

  it("leaves plain presses inside a selection to CodeMirror", () => {
    expect(startsQueryEditorSelectionMoveDrag({ detail: 1, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(false);
    expect(startsQueryEditorSelectionMoveDrag({ detail: 0, shiftKey: false, ctrlKey: false, metaKey: false })).toBe(false);
    expect(startsQueryEditorSelectionMoveDrag({ detail: 2, shiftKey: false, ctrlKey: true, metaKey: false })).toBe(false);
  });

  it("uses Cmd or Ctrl without Alt for object navigation", () => {
    expect(usesQueryEditorObjectNavigationModifier({ altKey: false, ctrlKey: false, metaKey: true })).toBe(true);
    expect(usesQueryEditorObjectNavigationModifier({ altKey: false, ctrlKey: true, metaKey: false })).toBe(true);
  });

  it("leaves Alt+Cmd and Alt+Ctrl to multi-cursor selection", () => {
    expect(usesQueryEditorObjectNavigationModifier({ altKey: true, ctrlKey: false, metaKey: true })).toBe(false);
    expect(usesQueryEditorObjectNavigationModifier({ altKey: true, ctrlKey: true, metaKey: false })).toBe(false);
  });

  it("does not treat an unmodified pointer event as object navigation", () => {
    expect(usesQueryEditorObjectNavigationModifier({ altKey: false, ctrlKey: false, metaKey: false })).toBe(false);
  });
});
