import { Worker } from "worker_threads";
import { Server } from "socket.io";

class WorkerThread {
    private worker: Worker;

    constructor(taskPath: string, wsServer: Server) {
        this.worker = new Worker(taskPath);

        this.worker.on("message", (message) => {
            console.log('=========> worker SEND');
            wsServer.emit("cron-job", message);
        });

        this.worker.on("error", (error) => {
            wsServer.emit("cron-job", `Error in worker: ${error.message}`);
        });

        this.worker.on("exit", (code) => {
            if (code !== 0) {
                wsServer.emit(
                    "cron-job",
                    `Worker stopped with exit code ${code}`,
                );
            }
        });
    }

    start() {
        console.log("Worker started");
    }

    stop() {
        this.worker.terminate();
    }
}

export default WorkerThread;
