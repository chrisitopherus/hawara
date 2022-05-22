export interface Components {
    task: HTMLDivElement;
}

export interface ComponentConfig {
    task: {
        /**
         * Specifies the color of the dot.
         */
        dot: "orange" | "red" | "green";
        /**
         * specifies the name of the task.
         */
        name: string;
        /**
         * Specifies when the task was created.
         */
        created: string;
        /**
         * Specifies when the task is planned / will start.
         */
        time: string;
        /**
         * Specifies when the task should be done.
         */
        due: string;
    }
}

export class Component {
    /**
     * Method for building specified component.
     * @param component String representing the component.
     * @static
     */
    static build<T extends keyof Components>(component: T, config: ComponentConfig[T]): Components[T] {
        switch (component) {
            case "task":
                return this.taskBuilder(config) as Components[T];
            default:
                throw new Error(`Component "${component}" is not defined. If this is a mistake, please check the according types and implementation.`);
        }
    }

    /**
     * Method for building task Component.
     * @param config Configuration of the component.
     * @returns The Component.
     * @private
     * @static
     */
    private static taskBuilder(config: ComponentConfig["task"]) {
        /*
        <div class="task-row">
            <span class="task-cell task-cell--name">
                <svg xmlns="http://www.w3.org/2000/svg" class="drag-icon" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                        clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="tick-icon" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="dot dot--orange"></div>
                <span>
                    Video Script - Zucks Geheimkeller
                </span>
            </span>
            <span class="task-cell task-cell--created">
                Tomorrow at 9:30 am
            </span>
            <span class="task-cell task-cell--time">
                6 hrs
            </span>
            <span class="task-cell task-cell--due">
                <span>in 70 days</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </span>
        </div>
        */
        return $('<div class="task-row">')
            .append([
                $('<span class="task-cell task-cell--name">')
                    .append([
                        $('<svg xmlns="http://www.w3.org/2000/svg" class="drag-icon" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clip-rule="evenodd" /> </svg>'),
                        $('<svg xmlns="http://www.w3.org/2000/svg" class="tick-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'),
                        $(`<div class="dot dot--${config.dot}"></div>`),
                        $('<span>').text(config.name)
                    ]),
                $('<span class="task-cell task-cell--created">').text(config.created),
                $('<span class="task-cell task-cell--time">').text(config.time),
                $('<span class="task-cell task-cell--due">')
                    .append([
                        $("<span>").text(config.due),
                        $('<svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>')
                    ])
            ]).get(0);
    }
}