// import classes
import { Controller } from './controller.js';
// import types
import { Sites } from "../types/sites";

export class Binder {
    constructor(private controllerInstance: Controller) { }

    /**
     * Method for doing binding logic for a specified site.
     * @param site String representing the site.
     * @public
     */
    bind(site: Sites) {
        switch (site) {
            case "task":
                this.bindTask();
                break;
            default:
                const never: never = site;
        }
    }

    /**
     * Method for doing binding logic for the "task" site.
     * @private
     */
    private bindTask() {
        this.controllerInstance.view.binder.tabClickHandler(this.controllerInstance.tabClickHandler);
        this.controllerInstance.view.binder.taskContainerScrollHandler(this.controllerInstance.taskContainerScrollHandler);
        this.controllerInstance.view.binder.addTaskClickHandler(this.controllerInstance.addTaskClickHandler);
    }
}