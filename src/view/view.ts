// import classes
import { Binder } from "./binder.js";
import { Animator } from "./animator.js";
// import types and utilities
import { Component, ComponentConfig } from "./component.js";
import { Clone } from "../controller/task";

export class View {
    private static instance: View;
    // create Binder instance
    binder = new Binder(this);
    animator = new Animator(this);
    Component = Component;

    public taskContainer = document.getElementById('tasksTableBody') as HTMLDivElement;
    private constructor() {
    }
    /**
     * Method for making sure that there is a only one view instance.
     * @returns Instance of view.
     * @static
     */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new View();
            return this.instance;
        }
    }

    /**
     * Method for changing the current tab.
     * @param tab Clicked Tab Element.
     */
    changeCurrentTaskTab(tab: HTMLSpanElement) {
        // get the old current task tab
        const oldTab = document.querySelector('.tabs-container>.tab--active') as HTMLSpanElement;
        // get the borderBottomColor
        const color = getComputedStyle(oldTab).borderBottomColor;
        // animate the removing border
        this.animator.taskTabRemove(oldTab, color);
        // animate the adding border
        this.animator.taskTabAdd(tab, color);
    }

    /**
     * Method for controlling the cursor state of the html document.
     */
    controlGrabbingCursor() {
        const state = document.querySelector('html')!.style.cursor;
        console.log(state);
        if (state) {
            document.querySelector('html')!.style.cursor = state === 'default' ? 'grabbing' : 'default';
        } else {
            document.querySelector('html')!.style.cursor = 'grabbing';
        }
    }

    /**
     * Method for adding a new task.
     * @param taskElement Task element to add.
     */
    addTask(taskElement: HTMLDivElement) {
        // append the task element
        this.taskContainer.appendChild(taskElement);
    }

    /**
     * Method for styling the dragged task element.
     * @param task Task element that is being dragged.
     */
    stylingDraggedTask(task: HTMLDivElement) {
        // styling current drag target
        task.classList.add('task--dragged');
    }

    /**
     * Method for initialing the clone drag target.
     * @param clone The cloned element to be dragged.
     */
    createTaskClone(clone: Clone) {
        // move clone to initial position
        clone.element.style.top = `${clone.position.y}px`;
        clone.element.classList.add('task--clone');
        // append clone to dom
        document.getElementById('tasksTableBody')!.appendChild(clone.element);
    }

    /**
     * Method for moving the cloned drag target.
     * @param clone The cloned element that is being dragged.
     * @param mouseY Current y mouse position.
     */
    moveDraggedTask(clone: Clone, mouseY: number) {
        clone.element.style.transform = `translateY(${((mouseY - this.taskContainer.getBoundingClientRect().y) - clone.element.getBoundingClientRect().height / 2) - +clone.element.style.top.split('px')[0]}px)`;
    }

    /**
     * Method for swapping two tasks.
     * @param tasks Both task elements. `[0]` is the dragged element,  `[1]` is the swap element.
     * @param dir Direction of the dragging.
     */
    swapTasks(tasks: [HTMLDivElement, HTMLDivElement], dir: "up" | "down") {
        if (dir === "down") {
            tasks[1].insertAdjacentElement('afterend', tasks[0]);
        } else {
            console.log('up');
            tasks[1].insertAdjacentElement('beforebegin', tasks[0]);
        }
    }

    /**
     * Method for removing the task element.
     * @param taskElement Task element to remove.
     */
    removeTask(taskElement: HTMLDivElement) {
        // remove the task element
        taskElement.remove();
    }

    /**
     * Method for removing the clone of the dragged element and adjust styling accordingly.
     * @param taskElement The dragged element.
     * @param clone The clone of the dragged element.
     */
    removeTaskClone(taskElement: HTMLDivElement, clone: HTMLDivElement) {
        let animation = this.animator.cloneRemoval(taskElement, clone);
        animation.addEventListener('finish', () => {
            // remove clone from dom
            clone.remove();
            // remove class from element
            taskElement.classList.remove('task--dragged');
        })
    }
}