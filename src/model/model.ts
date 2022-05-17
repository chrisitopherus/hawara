export class Model {
    private static instance: Model;
    private constructor() { }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new Model();
            return this.instance;
        }
    }
}