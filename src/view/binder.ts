// import view
import { View } from "./view.js";

export class Binder {
    constructor(private viewInstance: View) { }

    /**
     * Method for binding taskTab click handler to all tab elements.
     * @param handler Click handler function.
     */
    tabClickHandler(handler: (e: MouseEvent) => unknown) {
        ([...(document.querySelector('.tabs-container')!.children)] as HTMLSpanElement[]).forEach(tab => {
            tab.addEventListener('click', handler);
        });
    }

    /**
     * Method for binding scroll handler to the taskContainer.
     * @param handler Scroll handler function.
     */
    taskContainerScrollHandler(handler: (e: Event) => unknown) {
        this.viewInstance.taskContainer.addEventListener('scroll', handler);
    }

    /**
     * Method for binding add task btn click handler.
     * @param handler Click handler function.
     */
    addTaskClickHandler(handler: (e: MouseEvent) => unknown) {
        document.getElementById('taskBtn')!.addEventListener('click', handler);
    }

    /**
     * Method for biding the dragstart event handler.
     * @param element Grab icon element.
     * @param handler Mousedown handler function.
     */
    taskDragStartHandler(element: HTMLElement, handler: (event: MouseEvent) => unknown) {
        element.addEventListener('mousedown', handler);
    }

    /**
     * Method for binding the drag event handler.
     * @param handler Mousemove handler function.
     */
    taskDragHandler(handler: (event: MouseEvent) => unknown) {
        document.addEventListener('mousemove', handler);
    }

    /**
     * Method for binding the drop event handler.
     * @param handler Mouseup handler function.
     */
    taskDropHandler(handler: (event: MouseEvent) => unknown) {
        window.addEventListener('mouseup', handler);
    }

    /**
     * Method for binding click handler to specified trash-icon element.
     * @param element Trash icon element.
     * @param handler Click handler function.
     */
    deleteTaskClickHandler(element: HTMLElement, handler: (e: MouseEvent) => unknown) {
        element.addEventListener('click', handler);
    }
}