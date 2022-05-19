// import Model, View
import { Model } from "../model/model.js";
import { View } from "../view/view.js";

// import types
import { Sites } from "../types/sites";

// import clases
import { Binder } from "./binder.js";
export class Controller {
    private static instance: Controller;
    private binder = new Binder(this);
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

    tabClickHandler = (event: MouseEvent) => {
        const tab = event.currentTarget as HTMLSpanElement;
        if (tab.classList.contains('tab--active')) {
            //! do nothing
        } else {
            // TODO change the model
            // change the view
            this.view.changeCurrentTaskTab(tab);
        }
    }
}