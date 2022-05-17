import { Binder } from "./binder.js";
export class View {
    constructor() {
        // create Binder instance
        this.binder = new Binder();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new View();
            return this.instance;
        }
    }
}
//# sourceMappingURL=view.js.map