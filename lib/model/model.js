export class Model {
    constructor() { }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new Model();
            return this.instance;
        }
    }
}
//# sourceMappingURL=model.js.map