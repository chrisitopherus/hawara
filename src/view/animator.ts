import { View } from "./view.js";

export class Animator {
    constructor(private viewInstance: View) { }

    /**
     * Method for animating the previous task tab.
     * @param tab Previous tab element.
     * @param color Starting color of the animation.
     */
    taskTabRemove(tab: HTMLSpanElement, color: string) {
        // remove active class
        tab.classList.remove('tab--active');
        tab.animate(
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
    }

    /**
     * Method for animating the new task tab.
     * @param tab New tab element.
     * @param color Ending color of the animation.
     */
    taskTabAdd(tab: HTMLSpanElement, color: string) {
        // add active class
        tab.classList.add('tab--active');
        tab.animate(
            [
                // keyframes
                // from
                {
                    borderBottomColor: document.querySelector('html')!.classList.contains('mode--light') ? 'rgba(83, 96, 238, 0.400)' : 'rgba(80, 47, 201, 0.400)'
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
    }

    /**
     * Method for animating the task swapping.
     * @param taskElement Task element of the dragged element.
     * @param swapElement Swap partner element.
     */
    swapTasks(taskElement: HTMLDivElement, swapElement: HTMLDivElement) {
        const taskElementInfos = {
            start: taskElement.getBoundingClientRect().y,
            end: swapElement.getBoundingClientRect().y
        };
        const swapElementInfos = {
            start: taskElementInfos.end,
            end: taskElementInfos.start
        };

        const animationFirst = taskElement.animate(
            [
                // keyframes
                // from
                {
                    transform: `translateY(0px)`,
                    zIndex: "10"
                },
                // to
                {
                    transform: `translateY(${taskElementInfos.end - taskElementInfos.start}px)`
                }
            ],
            {
                fill: "none",
                duration: 300,
                easing: "ease-in"
            }
        )
        animationFirst.addEventListener('finish', () => { })
        return swapElement.animate(
            [
                // keyframes
                // from
                {
                    transform: `translateY(0px)`,
                    zIndex: "10"
                },
                // to
                {
                    transform: `translateY(${swapElementInfos.end - swapElementInfos.start}px)`
                }
            ],
            {
                fill: "none",
                duration: 300,
                easing: "ease-in"
            }
        )
    }

    /**
     * Method for handling the deletion of the cloned element.
     * @param taskElement Original element.
     * @param clone Cloned element.
     * @returns The Animation.
     */
    cloneRemoval(taskElement: HTMLDivElement, clone: HTMLDivElement, scrollState: number) {
        let start: number;
        if (clone.style.transform) {
            start = +clone.style.transform.split('(')[1].split('px)')[0];
        } else {
            return null;
        }
        return clone.animate(
            [
                // keyframes
                // from
                {
                    transform: `translateY(${start}px)`
                },
                // to
                {
                    transform: `translateY(0px)`,
                    top: `${taskElement.getBoundingClientRect().y - this.viewInstance.taskContainer.getBoundingClientRect().y + scrollState}px`
                }
            ],
            {
                duration: 500,
                fill: "none",
                easing: "ease-out"
            }
        )
    }
}