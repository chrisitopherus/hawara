import { Binder } from "./binder.js";

export class View {
    private static instance: View;
    // create Binder instance
    binder = new Binder();
    private constructor() { }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new View();
            return this.instance;
        }
    }
}