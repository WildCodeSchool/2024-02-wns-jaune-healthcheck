import HistoryResolver from "../resolvers/HistoryResolver";
import { History } from "../entities/History";
import { Url } from "../entities/Url";

/**
 * Partial : Permet de rendre toutes les propriétés d'un type optionnelles
 * Permet donc de contourner le soucis de l'extends de BaseEntity
 */

type PartialHistory = Partial<History>;
type PartialUrl = Partial<Url>;

describe("HistoryResolver", () => {
    let resolver: HistoryResolver;

    beforeEach(() => {
        resolver = new HistoryResolver();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("histories", () => {
        it("should return an array of histories on success", async () => {
            const mockUrl: PartialUrl = {
                id: "123e4567-e89b-12d3-a456-426614174001",
                name: "Test URL",
                path: "https://example.com",
            };
            const mockHistories: PartialHistory[] = [
                {
                    id: "123e4567-e89b-12d3-a456-426614174000",
                    status_code: 200,
                    response: "OK",
                    url: mockUrl as Url,
                    created_at: new Date(),
                },
            ];
            const findSpy = jest
                .spyOn(History, "find")
                .mockResolvedValue(mockHistories as History[]);

            const result = await resolver.histories();

            expect(result).toEqual(mockHistories);
            expect(findSpy).toHaveBeenCalled();
        });

        it("should throw an error if the database query fails", async () => {
            jest.spyOn(History, "find").mockRejectedValue(
                new Error("Internal server error"),
            );

            await expect(resolver.histories()).rejects.toThrow(
                "Internal server error",
            );
        });
    });

    describe("history", () => {
        it("should return a single history on success", async () => {
            const mockUrl: PartialUrl = {
                id: "123e4567-e89b-12d3-a456-426614174001",
                name: "Test URL",
                path: "https://example.com",
            };
            const mockHistory: PartialHistory = {
                id: "123e4567-e89b-12d3-a456-426614174000",
                status_code: 200,
                response: "OK",
                url: mockUrl as Url,
                created_at: new Date(),
            };
            const findOneByOrFailSpy = jest
                .spyOn(History, "findOneByOrFail")
                .mockResolvedValue(mockHistory as History);

            const result = await resolver.history(
                "123e4567-e89b-12d3-a456-426614174000",
            );

            expect(result).toEqual(mockHistory);
            expect(findOneByOrFailSpy).toHaveBeenCalledWith({
                id: "123e4567-e89b-12d3-a456-426614174000",
            });
        });
    });
});
