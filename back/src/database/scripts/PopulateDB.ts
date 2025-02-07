import { Url } from "../../entities/Url";
import { urlsDataset } from "./fixtures/dataset";
import dataSource from "../../database/dataSource";

const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 1000;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function populateUrls() {
    try {
        await dataSource.initialize();
        console.log("Data source initialized");

        for (let i = 0; i < urlsDataset.length; i += BATCH_SIZE) {
            const batch = urlsDataset.slice(i, i + BATCH_SIZE);

            await dataSource.transaction(async (manager) => {
                for (const urlData of batch) {
                    const existingUrl = await manager.findOne(Url, {
                        where: { name: urlData.name },
                    });

                    if (!existingUrl) {
                        await manager.save(Url, urlData);
                    } else {
                        console.log(`🔍 URL déjà existante : ${urlData.name}`);
                    }
                }
            });

            if (i + BATCH_SIZE < urlsDataset.length) {
                console.log(
                    `Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...`,
                );
                await delay(DELAY_BETWEEN_BATCHES);
            }
        }
    } catch (error) {
        console.error("Error while populating urls", error);
    } finally {
        dataSource.destroy();
        console.log("Data source destroyed");
    }
}

populateUrls();
