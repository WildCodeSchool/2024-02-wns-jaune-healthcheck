import { parentPort } from "worker_threads";
import cron from "node-cron";
import checkUrl from "../tasks/checkUrlTask";
import checkuserNotif from "../tasks/checkUserNotif";

// Execute job every minute
cron.schedule("* * * * *", async () => {
    try {
        console.log('=========> cron jobs START');
        await checkUrl("Minute");
        if (parentPort) {
            console.log('=========> cron jobs END');
            parentPort.postMessage("Tâche minutière exécutée");
        }
    } catch (error) {
        if (parentPort) {
            parentPort.postMessage(
                `Erreur dans la tâche minutière: ${error.message}`,
            );
        }
    }
});

// Execute job every hour at minute 0
cron.schedule(
    "0 * * * *",
    async () => {
        try {
            await checkUrl("Heure");
            if (parentPort) {
                parentPort.postMessage("Tâche horaire exécutée");
            }
        } catch (error) {
            if (parentPort) {
                parentPort.postMessage(
                    `Erreur dans la tâche horaire: ${error.message}`,
                );
            }
        }
    },
    {
        timezone: "Europe/Paris",
    },
);

// Execute job every Day at 2:00 AM
cron.schedule(
    "0 2 * * *",
    async () => {
        try {
            await checkUrl(); // Public urls, no config allowed for user
            await checkUrl("Jour");
            await checkuserNotif("Jour");
            if (parentPort) {
                parentPort.postMessage("Tâche journalière exécutée");
            }
        } catch (error) {
            if (parentPort) {
                parentPort.postMessage(
                    `Erreur dans la tâche journalière: ${error.message}`,
                );
            }
        }
    },
    {
        timezone: "Europe/Paris",
    },
);

// Execute job every first day of the week at 2:00 AM
cron.schedule(
    "0 2 * * 0",
    async () => {
        try {
            await checkUrl("Semaine");
            await checkuserNotif("Semaine");
            if (parentPort) {
                parentPort.postMessage("Tâche hebdomadaire exécutée");
            }
        } catch (error) {
            if (parentPort) {
                parentPort.postMessage(
                    `Erreur dans la tâche hebdomadaire: ${error.message}`,
                );
            }
        }
    },
    {
        timezone: "Europe/Paris",
    },
);

// Execute job every first day of the month at 2:00 AM
cron.schedule("0 2 1 * *", async () => {
    try {
        await checkuserNotif("Mois");
        if (parentPort) {
            parentPort.postMessage("Tâche mensuelle exécutée");
        }
    } catch (error) {
        if (parentPort) {
            parentPort.postMessage(
                `Erreur dans la tâche mensuelle: ${error.message}`,
            );
        }
    }
});
