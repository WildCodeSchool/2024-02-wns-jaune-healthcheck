import { Url } from "../entities/Url";
import PaginateUrls from "@/types/PaginatesUrls";
import UrlResolver from "../resolvers/UrlResolver";
import MyContext from "../types/MyContext";
import JwtPayload from "../types/JwtPayload";
import dataSource from "@/database/dataSource";

type PartialUrl = Partial<Url>;

const mockUrl: PartialUrl = {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "Test URL",
    path: "https://example.com",
};

const mockUrls: PartialUrl[] = [mockUrl];
const mockPaginateUrls: PaginateUrls = {
    urls: mockUrls as Url[],
    totalPages: 1,
    currentPage: 1,
    previousPage: 1,
    nextPage: 1,
};

const mockContext: MyContext = {
    res: {
        setHeader: jest.fn(),
    },
    payload: {
        id: "testId",
        email: "test@test.fr",
    } as JwtPayload,
};

describe("Unit Test Url Resolver", () => {
    let urlResolver: UrlResolver;

    beforeAll(async () => {
        await dataSource.initialize();
        urlResolver = new UrlResolver();
    });

    afterAll(async () => {
        await dataSource.destroy();
        jest.restoreAllMocks();
    });

    it("Query urls whith context should return a pagination of urls", async () => {
        jest.spyOn(Url, "getPaginateUrls").mockImplementation(() =>
            Promise.resolve(mockPaginateUrls as PaginateUrls),
        );

        const result = await urlResolver.urls(mockContext, 1, "", "");
        expect(result).toEqual(mockPaginateUrls);
    });

    it("Query urls whith context should throw an error when fetching urls fails", async () => {
        jest.spyOn(Url, "getPaginateUrls").mockRejectedValue(
            new Error("Internal server error"),
        );
        await expect(urlResolver.urls(mockContext, 1, "", "")).rejects.toThrow(
            "Internal server error",
        );
    });

    it("Query urls whithout context should return a pagination of urls", async () => {
        jest.spyOn(Url, "getPaginateUrls").mockImplementation(() =>
            Promise.resolve(mockPaginateUrls as PaginateUrls),
        );

        const result = await urlResolver.urls({} as MyContext, 1, "", "");
        expect(result).toEqual(mockPaginateUrls);
    });

    it("Query urls whithout context should throw an error when fetching urls fails", async () => {
        jest.spyOn(Url, "getPaginateUrls").mockRejectedValue(
            new Error("Internal server error"),
        );
        await expect(
            urlResolver.urls({} as MyContext, 1, "", ""),
        ).rejects.toThrow("Internal server error");
    });

    it("Query url should return an Url", async () => {
        jest.spyOn(Url, "createQueryBuilder").mockReturnValue({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(mockUrl as Url),
        } as any);

        const result = await urlResolver.url(
            mockContext,
            "123e4567-e89b-12d3-a456-426614174001",
        );
        expect(result).toEqual(mockUrl);
    });

    it("Query url should throw an error when fetching url fails", async () => {
        jest.spyOn(Url, "createQueryBuilder").mockReturnValue({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getOne: jest
                .fn()
                .mockRejectedValue(
                    new Error("URL non trouvée ou accès non autorisé"),
                ),
        } as any);

        await expect(
            urlResolver.url(
                mockContext,
                "123e4567-e89b-12d3-a456-426614174001",
            ),
        ).rejects.toThrow("URL non trouvée ou accès non autorisé");
    });
});
