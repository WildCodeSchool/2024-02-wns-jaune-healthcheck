import { Url } from "../../../entities/Url";
import { User } from "../../../entities/User";
import { History } from "../../../entities/History";
import dataSource from "../../dataSource";
import { testHistories, testUser, testUrls } from "./dataset";

async function generateFixtures() {
    try {
        await dataSource.initialize();
        console.log("Data source initialized successfully.");

        const [url1, url2] = await Promise.all(
            testUrls.map((data) => Url.save({ ...data })),
        );

        await User.save({ ...testUser });

        await Url.save({
            id: "737fbb42-1dd9-40c5-a29e-604407a7bc7b",
            name: "Private Excalidraw",
            path: "https://excalidraw.com",
            private: true,
            user: { id: testUser.id },
        });

        await Promise.all([
            History.save({ ...testHistories[0], url: url1 }),
            History.save({ ...testHistories[1], url: url2 }),
        ]);

        console.log("Fixtures generated successfully!");
    } catch (error) {
        console.error("Error while generating fixtures:", error);
    } finally {
        await dataSource.destroy();
    }
}

generateFixtures();
