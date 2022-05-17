export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    static getInstance(model, view) {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new Controller(model, view);
            return this.instance;
        }
    }
}
//# sourceMappingURL=controller.js.map