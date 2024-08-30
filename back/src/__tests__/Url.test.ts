import dataSource from "../database/dataSource";
import { Url } from "../entities/Url";

describe("Integration Test Url Entity", () => {
    beforeAll(async () => {
        await dataSource.initialize();
    });
    afterAll(async () => {
        await dataSource.destroy();
    });

    it("getPaginateUrls method should return a list of Url", async () => {
        const paginateUrls = await Url.getPaginateUrls(1);

        // Check if the result has the expected structure
        expect(paginateUrls).toHaveProperty("urls");
        expect(paginateUrls).toHaveProperty("totalPages");
        expect(paginateUrls).toHaveProperty("currentPage");
        expect(paginateUrls).toHaveProperty("previousPage");
        expect(paginateUrls).toHaveProperty("nextPage");
        expect(Array.isArray(paginateUrls.urls)).toBe(true);

        // Check if values have the expected structure
        paginateUrls.urls.forEach((url) => {
            expect(url).toHaveProperty("id");
            expect(url).toHaveProperty("name");
            expect(url).toHaveProperty("path");
        });
    });

    it("getPaginateUrls method whith searchText should return a list of Url", async () => {
        const paginateUrls = await Url.getPaginateUrls(1, "a");

        // Check if the result has the expected structure
        expect(paginateUrls).toHaveProperty("urls");
        expect(paginateUrls).toHaveProperty("totalPages");
        expect(paginateUrls).toHaveProperty("currentPage");
        expect(paginateUrls).toHaveProperty("previousPage");
        expect(paginateUrls).toHaveProperty("nextPage");
        expect(Array.isArray(paginateUrls.urls)).toBe(true);

        // Check if values have the expected structure
        paginateUrls.urls.forEach((url) => {
            expect(url).toHaveProperty("id");
            expect(url).toHaveProperty("name");
            expect(url).toHaveProperty("path");
        });
    });

    it("getPaginateUrls method whith searchText and sortField should return a list of Url", async () => {
        const paginateUrls = await Url.getPaginateUrls(1, "a", "name");

        // Check if the result has the expected structure
        expect(paginateUrls).toHaveProperty("urls");
        expect(paginateUrls).toHaveProperty("totalPages");
        expect(paginateUrls).toHaveProperty("currentPage");
        expect(paginateUrls).toHaveProperty("previousPage");
        expect(paginateUrls).toHaveProperty("nextPage");
        expect(Array.isArray(paginateUrls.urls)).toBe(true);

        // Check if values have the expected structure
        paginateUrls.urls.forEach((url) => {
            expect(url).toHaveProperty("id");
            expect(url).toHaveProperty("name");
            expect(url).toHaveProperty("path");
        });
    });

    it("getPaginateUrls method whith connected user and private url should return a list of Url", async () => {
        const paginateUrls = await Url.getPaginateUrls(
            1,
            "a",
            "name",
            true,
            "741fbb42-1dd9-40c5-a29e-604407a7bc8c",
        );

        // Check if the result has the expected structure
        expect(paginateUrls).toHaveProperty("urls");
        expect(paginateUrls).toHaveProperty("totalPages");
        expect(paginateUrls).toHaveProperty("currentPage");
        expect(paginateUrls).toHaveProperty("previousPage");
        expect(paginateUrls).toHaveProperty("nextPage");
        expect(Array.isArray(paginateUrls.urls)).toBe(true);

        // Check if values have the expected structure
        paginateUrls.urls.forEach((url) => {
            expect(url).toHaveProperty("id");
            expect(url).toHaveProperty("name");
            expect(url).toHaveProperty("path");
        });
    });

    it("getPaginateUrls method whith connected user and public url should return a list of Url", async () => {
        const paginateUrls = await Url.getPaginateUrls(
            1,
            "a",
            "name",
            false,
            "741fbb42-1dd9-40c5-a29e-604407a7bc8c",
        );

        // Check if the result has the expected structure
        expect(paginateUrls).toHaveProperty("urls");
        expect(paginateUrls).toHaveProperty("totalPages");
        expect(paginateUrls).toHaveProperty("currentPage");
        expect(paginateUrls).toHaveProperty("previousPage");
        expect(paginateUrls).toHaveProperty("nextPage");
        expect(Array.isArray(paginateUrls.urls)).toBe(true);

        // Check if values have the expected structure
        paginateUrls.urls.forEach((url) => {
            expect(url).toHaveProperty("id");
            expect(url).toHaveProperty("name");
            expect(url).toHaveProperty("path");
        });
    });

    it("findOneByOrFail method should return a single Url", async () => {
        const url = await Url.findOneByOrFail({
            id: "737fbb42-1dd9-40c5-a29e-604407a7bc7b",
        });
        expect(url).toBeInstanceOf(Url);
    });
});
