export interface Draggable {
    dragHandler: (event: MouseEvent) => unknown;
    dropHandler: (event: MouseEvent) => unknown;
    dragStartHandler: (event: MouseEvent) => unknown;
    dragOverHandler: (event: MouseEvent) => unknown;
}