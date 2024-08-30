class Semaphore {
    // This class allow to limite the number of concurrent tasks
    private permits: number;
    private tasks: (() => void)[] = [];

    constructor(permits: number) {
        this.permits = permits;
    }

    public async acquire(): Promise<void> {
        if (this.permits > 0) {
            this.permits--;
            return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            this.tasks.push(resolve);
        });
    }

    public release(): void {
        this.permits++;

        if (this.tasks.length > 0 && this.permits > 0) {
            this.permits--;
            const nextTask = this.tasks.shift();
            if (nextTask) nextTask();
        }
    }
}

export default Semaphore;
