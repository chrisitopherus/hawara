// import Model, View
import { Model } from "../model/model.js";
import { View } from "../view/view.js";

export class Controller {
    private static instance: Controller;
    private constructor(private model: Model, private view: View) { }
    static getInstance(model: Model, view: View) {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new Controller(model, view);
            return this.instance;
        }
    }
}