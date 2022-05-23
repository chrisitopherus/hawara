// MV
import { Model } from "../model/model.js";
import { View } from "../view/view.js";
// import utilities
import { dir } from '../util/dir.js';

export interface Position {
    x: number;
    y: number;
}

export interface Clone {
    element: HTMLDivElement,
    position: Position
}

export class TaskController {
    currentDraggedTask: HTMLDivElement | null = null;
    currentTaskClone: Clone | null = null;
    previousCoordinate: number = 0;
    private taskContainer = document.getElementById('tasksTableBody') as HTMLDivElement;
    constructor(private viewInstance: View, private modelInstance: Model) {

    }

    /**
     * Method handling the start of a task drag operation.
     * @param event The mouse event.
     */
    taskDragStartHandler = (event: MouseEvent) => {
        // update mouse state
        this.modelInstance.mouseState = {
            x: event.clientX,
            y: event.clientY
        };
        console.log('drag started');
        //! prevent text highlighting etc.
        event.preventDefault();
        const icon = event.currentTarget as HTMLElement;
        this.currentDraggedTask = icon.parentElement!.parentElement! as HTMLDivElement;
        // creating a clone
        this.currentTaskClone = {
            element: this.currentDraggedTask.cloneNode(true) as HTMLDivElement,
            position: {
                x: this.currentDraggedTask.getBoundingClientRect().x - this.taskContainer.getBoundingClientRect().x + this.taskContainer.scrollLeft,
                y: this.currentDraggedTask.getBoundingClientRect().y - this.taskContainer.getBoundingClientRect().y + this.taskContainer.scrollTop
            }
        };
        // set starting position as previous position
        this.previousCoordinate = this.currentTaskClone.position.y;
        // styling the task
        this.viewInstance.stylingDraggedTask(this.currentDraggedTask);
        // changing cursor
        this.viewInstance.controlGrabbingCursor();
        // inititalize the clone
        this.viewInstance.createTaskClone(this.currentTaskClone);
    }

    /**
     * Method handling the dragging of a task drag operation.
     * @param event The mouse event.
     */
    taskDragHandler = (event: MouseEvent) => {
        if (this.currentDraggedTask && this.currentTaskClone) {
            // update mouse state
            this.modelInstance.mouseState = {
                x: event.clientX,
                y: event.clientY
            };
            // move the clone to the current y position of the mouse
            this.viewInstance.moveDraggedTask(this.currentTaskClone, event.clientY);
            // update the clone position
            this.currentTaskClone.position = {
                x: this.currentTaskClone.element.getBoundingClientRect().x,
                y: this.currentTaskClone.element.getBoundingClientRect().y
            };
            // call dragover checker
            this.taskDragOverHandler(this.currentTaskClone.position.y);
            // update previous position
            this.previousCoordinate = this.currentTaskClone.position.y;
        }
    }

    taskCheckForAutoScroll() {

    }

    /**
     * Method for handling and checking if the dragged cloned task is intersecting with another task.
     * @param y Position y.
     * @param setDirection `Optional` If set then the direction will not be checked.
     */
    taskDragOverHandler(y: number, setDirection?: "up" | "down") {
        if (this.currentTaskClone && this.currentDraggedTask) {
            // get height of cloned task
            const height = this.currentTaskClone!.element.getBoundingClientRect().height;
            // get coordinates of cloned task
            const x = this.currentTaskClone.position.x;
            const topY = y;
            const bottomY = y + height;

            // determine movement direction
            let direction: "up" | "down" | "none" = dir(this.previousCoordinate, topY);
            if (setDirection) {
                direction = setDirection;
            }
            let foundElement: HTMLDivElement;

            // checking direction to find accordingly an element
            if (direction === 'none') {
                //! do nothing
                return undefined;
            }
            else if (direction === 'down') {
                // moving down so check bottom position
                foundElement = document.elementFromPoint(x, bottomY) as HTMLDivElement;
            } else {
                // moving up so check top position
                foundElement = document.elementFromPoint(x, topY) as HTMLDivElement;
            }
            if (foundElement === this.currentDraggedTask) { // check if found element is the dragged element
                //! do nothing
                return undefined;
            }
            // console.log({ foundElement });
            // swap elments in model
            const tup = this.modelInstance.swapTasks(this.currentDraggedTask, foundElement, direction);
            // if elements got swapped in model then swap in the view.
            if (tup) {
                // update the view -> swapping tasks
                this.viewInstance.swapTasks(tup, direction);
            }
        }
    }

    /**
     * Method handling the drop of a task drag operation.
     * @param event The mouse event.
     */
    taskDropHandler = (event: MouseEvent) => {
        if (this.currentDraggedTask && this.currentTaskClone) {
            console.log('dropped');
            // remove special styling
            this.viewInstance.controlGrabbingCursor();
            // remove clone and style from element
            // storing reference
            const temp = [this.currentDraggedTask, this.currentTaskClone.element] as const;
            this.currentDraggedTask = null;
            this.currentTaskClone = null;
            this.viewInstance.removeTaskClone(temp[0], temp[1], this.modelInstance.scrollState);
        }
    }
}