// import view
import { View } from "./view.js";

export class Binder {
    constructor(private viewInstance: View) { }

    tabClickHandler(handler: (e: MouseEvent) => unknown) {
        ([...(document.querySelector('.tabs-container')!.children)] as HTMLSpanElement[]).forEach(tab => {
            tab.addEventListener('click', handler);
        })
    }
}