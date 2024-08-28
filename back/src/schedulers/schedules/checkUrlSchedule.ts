import { parentPort } from 'worker_threads';
import cron from 'node-cron';
import checkUrl from '../tasks/checkUrlTask';


// Execute job every minute
cron.schedule('* * * * *', async () => {
    try {
      await checkUrl('Minute');
      if (parentPort) {
        parentPort.postMessage('Tâche minutière exécutée');
      }
    } catch (error) {
      if (parentPort) {
        parentPort.postMessage(`Erreur dans la tâche minutière: ${error.message}`);
      }
    }
});

// Execute job every hour at minute 0
cron.schedule('0 * * * *', async() => {
    try {
      await checkUrl(); // Public urls, no config allowed for user
      await checkUrl('Heure');
      if (parentPort) {
        parentPort.postMessage('Tâche horaire exécutée');
      }
    } catch (error) {
      if (parentPort) {
        parentPort.postMessage(`Erreur dans la tâche horaire: ${error.message}`);
      }
    }
}, {
    timezone: "Europe/Paris"
});

// Execute job every Day at 2:00 AM
cron.schedule('0 2 * * *', async() => {
  try {
    await checkUrl(); // Public urls, no config allowed for user
    await checkUrl('Jour');
    if (parentPort) {
      parentPort.postMessage('Tâche journalière exécutée');
    }
  } catch (error) {
    console.error(error);
    if (parentPort) {
      parentPort.postMessage(`Erreur dans la tâche journalière: ${error.message}`);
    }
  }
}, {
  timezone: "Europe/Paris"
});

// Execute job every first day of the week at 2:00 AM
cron.schedule('0 2 * * 0', async() => {
  try {
    await checkUrl('Semaine');
    if (parentPort) {
      parentPort.postMessage('Tâche hebdomadaire exécutée');
    }
  } catch (error) {
    if (parentPort) {
      parentPort.postMessage(`Erreur dans la tâche hebdomadaire: ${error.message}`);
    }
  }
}, {
  timezone: "Europe/Paris"
});
