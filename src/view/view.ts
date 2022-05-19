import { Binder } from "./binder.js";

export class View {
    private static instance: View;
    // create Binder instance
    binder = new Binder(this);
    private constructor() { }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new View();
            return this.instance;
        }
    }

    changeCurrentTaskTab(tab: HTMLSpanElement) {
        // get the old current task tab
        const oldTab = document.querySelector('.tabs-container>.tab--active') as HTMLSpanElement;
        // get the borderBottomColor
        const color = getComputedStyle(oldTab).borderBottomColor;
        // animate the removing border
        let removeAnimation = oldTab.animate(
            [
                // keyframes
                // from
                {
                    borderBottomColor: color
                },
                // to
                {
                    borderBottomColor: 'transparent'
                }
            ],
            {
                duration: 300,
                fill: "forwards"
            }
        )
        removeAnimation.addEventListener('finish', () => {
            oldTab.classList.remove('tab--active');
        });
        // animate the adding border
        let addAnimation = tab.animate(
            [
                // keyframes
                // from
                {
                    borderBottomColor: 'transparent'
                },
                // to
                {
                    borderBottomColor: color
                }
            ],
            {
                duration: 300,
                fill: "forwards"
            }
        )
        addAnimation.addEventListener('finish', () => {
            tab.classList.add('tab--active');
        });
    }
}