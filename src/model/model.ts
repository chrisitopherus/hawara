// import classes
import { Task } from "./task.js";
// types
import { ComponentConfig } from '../view/component';
import { Position } from "../controller/task";

export class Model {
    private static instance: Model;
    tasks: Task[] = [];
    private _mouseState: Position = { x: 0, y: 0 };
    get mouseState(): Readonly<Position> {
        return this._mouseState;
    }
    set mouseState(value: Position) { this._mouseState = value; };
    private _scrollState: number = 0;
    get scrollState(): Readonly<number> { return this._scrollState; };
    set scrollState(value: number) { this._scrollState = value; };

    private constructor() { }

    /**
     * Method for making sure that there is a only one view instance.
     * @returns Instance of model.
     * @static
     */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new Model();
            return this.instance;
        }
    }

    /**
     * Method for creating a new task.
     * @param config Information about the task.
     * @returns A new task.
     */
    createTask(config: ComponentConfig["task"]) {
        const task = new Task(config, this.tasks.length);
        this.tasks.push(task);
        return task;
    }

    /**
     * Method for swapping tasks inside the model.
     * @param draggedTask Task element that is being dragged.
     * @param otherTask Task element that is being dragged over.
     * @param dir Direction of the dragging.
     * @returns Tuple of elements or null if otherTask element was not found in the model.
     */
    swapTasks(draggedTask: HTMLDivElement, otherTask: HTMLDivElement, dir: "up" | "down") {
        const indexTup: [number, number] = [-1, -1];
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].element === draggedTask) {
                indexTup[0] = i;
            }
            if (this.tasks[i].element === otherTask) {
                indexTup[1] = i;
            }
            if (indexTup[0] !== -1 && indexTup[1] !== -1) break;
        }
        if (indexTup[0] !== -1 && indexTup[1] !== -1) {
            // ! making sure that only 1 time per intersection its swapped
            if (dir === "down" && indexTup[0] !== indexTup[1] || dir === "up" && indexTup[0] !== indexTup[1]) {
                // swap tasks
                [this.tasks[indexTup[0]].order, this.tasks[indexTup[1]].order] = [this.tasks[indexTup[1]].order, this.tasks[indexTup[0]].order];
                [this.tasks[indexTup[0]], this.tasks[indexTup[1]]] = [this.tasks[indexTup[1]], this.tasks[indexTup[0]]];
                // return the elements
                return [draggedTask, otherTask] as [HTMLDivElement, HTMLDivElement];
            }
        }
        return null;
    }

    /**
     * Method for removing a task.
     * @param index Position of the task to remove.
     */
    deleteTask(index: number) {
        // remove task
        this.tasks.splice(index, 1);
    }
}