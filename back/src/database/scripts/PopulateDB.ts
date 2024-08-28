import { Url } from "../../entities/Url";
import { urlsData } from "../seeder/dataInput";
import dataSource from "../../database/dataSource";

const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 1000; // 1 seconde

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertUrlBatch(
    urls: typeof urlsData,
    startIndex: number,
    batchSize: number,
) {
    return dataSource.transaction(async (transactionalEntityManager) => {
        for (let i = 0; i < batchSize && startIndex + i < urls.length; i++) {
            const urlData = urls[startIndex + i];
            const url = transactionalEntityManager.create(Url, urlData);
            await transactionalEntityManager.save(url);
            console.log(`Url ${startIndex + i + 1} saved.`);
        }
    });
}

async function populateUrls() {
    await dataSource.initialize();

    for (let i = 0; i < urlsData.length; i += BATCH_SIZE) {
        try {
            await insertUrlBatch(urlsData, i, BATCH_SIZE);
            console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1} completed.`);

            if (i + BATCH_SIZE < urlsData.length) {
                console.log(
                    `Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...`,
                );
                await delay(DELAY_BETWEEN_BATCHES);
            }
        } catch (error) {
            console.error(`Error in batch starting at index ${i}:`, error);
            // Optionnel : décidez ici si vous voulez continuer avec le prochain lot ou arrêter complètement
        }
    }

    console.log("Urls population completed");
}

populateUrls()
    .catch((error) => {
        console.error("Error while populating urls", error);
    })
    .finally(() => {
        dataSource.destroy(); // Assurez-vous de fermer la connexion à la base de données
    });
