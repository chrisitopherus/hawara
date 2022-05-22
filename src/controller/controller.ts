// import Model, View
import { Model } from "../model/model.js";
import { View } from "../view/view.js";

// import types
import { Sites } from "../types/sites";

// import clases
import { Binder } from "./binder.js";
import { TaskController } from "./task.js";

// import helpers
import { random } from "../util/random.js";
export class Controller {
    private static instance: Controller;
    private binder = new Binder(this);
    private taskController = new TaskController(this.view, this.model);
    private constructor(private model: Model, public view: View) {
        this.init("task");
    }
    /**
     * Method for making sure that there is a only one controller instance.
     * @static
     * @returns Instance of Controller.
     */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new Controller(Model.getInstance(), View.getInstance());
            return this.instance;
        }
    }

    /**
     * Method for making initialization logic for the Controller.
     * @param site String representing the site.
     * @private
     */
    private init(site: Sites) {
        switch (site) {
            case "task":
                this.binder.bind(site);
                break;
            default:
                const never: never = site;
        }
    }

    /**
     * Method for handling a click on a task tab element.
     * @param event The mouse event.
     */
    tabClickHandler = (event: MouseEvent) => {
        const tab = event.currentTarget as HTMLSpanElement;
        if (tab.classList.contains('tab--active')) {
            //! do nothing
        } else {
            // TODO change the model
            // change the view
            this.view.changeCurrentTaskTab(tab);
            console.log(this.model.tasks);
        }
    }

    /**
     * Method for handling a click on the add task btn.
     * @param event The mouse event.
     */
    addTaskClickHandler = (event: MouseEvent) => {
        // create a new task
        const task = this.model.createTask({
            name: 'Sample Task',
            created: 'Yesterday',
            dot: 'green',
            due: `in ${random(1, 5)} days`,
            time: '6 hrs'
        });
        // adding event listener to the new task element for deleting
        this.view.binder.deleteTaskClickHandler((task.element.querySelector('.trash-icon') as HTMLElement), this.deleteTaskClickHandler);
        // adding drag-and-drop listener to the new task element
        const dragIcon = task.element.querySelector('.drag-icon') as HTMLElement;
        // dragStart event
        this.view.binder.taskDragStartHandler(dragIcon, this.taskController.taskDragStartHandler);
        // drag event
        this.view.binder.taskDragHandler(this.taskController.taskDragHandler);
        // drop event
        this.view.binder.taskDropHandler(this.taskController.taskDropHandler);
        // append the task to the view.
        this.view.addTask(task.element);
    }

    /**
     * Method for removing a task.
     * @param event The mouse event.
     */
    deleteTaskClickHandler = (event: MouseEvent) => {
        const task = (event.currentTarget as HTMLElement).parentElement!.parentElement as HTMLDivElement;
        let counter = 0;
        //! creating copy since the length of the original array is manipulated while iterating through it.
        const copyOfTasks = [...this.model.tasks];
        for (let i = 0; i < copyOfTasks.length; ++i) {
            if (copyOfTasks[i].element === task) {
                // found the task
                // first delete the task from the model
                this.model.deleteTask(i);
                // then remove task from the view
                this.view.removeTask(task);
            } else {
                // reorder the tasks
                copyOfTasks[i].order = counter;
                counter++;
            }
        }
    }
}