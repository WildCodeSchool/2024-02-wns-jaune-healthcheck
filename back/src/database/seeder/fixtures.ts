import { Url } from "../../entities/Url";
import { User } from "../../entities/User";
import { History } from "../../entities/History";
import dataSource from "../dataSource";
import { urlsData, historiesData } from "./dataInput";

async function generateFixtures() {
    try {
        await dataSource.initialize();
        console.log("Data source initialized successfully.");

        // for signle fetch
        await Url.save({
            ...urlsData[0],
            id: "737fbb42-1dd9-40c5-a29e-604407a7bc7b",
        });

        const savedUrls = await Promise.all(
            urlsData.map(async (urlData) => {
                const url = Url.create({ ...urlData });
                await url.save();
                return url;
            }),
        );

        await User.save({
            id: "741fbb42-1dd9-40c5-a29e-604407a7bc8c",
            username: "testuser",
            email: "testuser@test.fr",
            hashedPassword: "hashedPasswordTest",
        });

        await Url.save({
            id: "737fbb42-1dd9-40c5-a29e-604407a7bc7b",
            name: "TestUrl for fetch private urls",
            path: "https://excalidraw.com",
            private: true,
            user: { id: "741fbb42-1dd9-40c5-a29e-604407a7bc8c" },
        });

        await History.save({ ...historiesData[0], url: savedUrls[0] });
        await History.save({ ...historiesData[1], url: savedUrls[1] });
        console.log("Fixtures generated successfully!");
    } catch (error) {
        console.error("Error while generating fixtures:", error);
    } finally {
        await dataSource.destroy();
    }
}

generateFixtures();
