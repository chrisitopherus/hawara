// import types
import { ComponentConfig, Component } from "../view/component.js";

export class Task {
    Component = Component;
    element: HTMLDivElement;
    constructor(public info: ComponentConfig["task"], public order: number) {
        this.element = this.buildTask(info);
    }

    /**
     * Method for building task component.
     * @param info Information of the task component.
     * @returns Built task component.
     */
    buildTask(info: ComponentConfig["task"]) {
        return this.Component.build("task", info);
    }
}