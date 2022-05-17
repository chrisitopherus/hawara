import { Model } from "../model/model.js";
import { View } from "../view/view.js";
export declare class Controller {
    private model;
    private view;
    private static instance;
    private constructor();
    static getInstance(model: Model, view: View): Controller;
}
//# sourceMappingURL=controller.d.ts.map