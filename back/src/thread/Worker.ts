import { Worker } from 'worker_threads';


class WorkerThread {
  private worker: Worker;

  constructor(taskPath: string) {
    this.worker = new Worker(taskPath);

    this.worker.on('message', (message) => {
      console.log('Message from worker:', message);
    });

    this.worker.on('error', (error) => {
      console.error('Worker error:', error);
    });

    this.worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }

  start() {
    console.log('Worker started');
  }

  stop() {
    this.worker.terminate();
  }
}

export default WorkerThread;