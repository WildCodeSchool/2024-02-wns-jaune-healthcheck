import { UrlSubscriber } from "../subscribers/UrlSubscribers";
import { Url } from "../entities/Url";
import { History } from "../entities/History";
import {
    EntityManager,
    InsertEvent,
    UpdateEvent,
    Connection,
    QueryRunner,
} from "typeorm";
import axios from "axios";

jest.mock("axios");

describe("UrlSubscriber", () => {
    let subscriber: UrlSubscriber;
    let mockEntityManager: jest.Mocked<EntityManager>;
    let mockUrl: Partial<Url>;
    let mockConnection: Partial<Connection>;
    let mockQueryRunner: Partial<QueryRunner>;

    beforeEach(() => {
        subscriber = new UrlSubscriber();
        mockEntityManager = {
            findOne: jest.fn(),
            save: jest.fn(),
            transaction: jest.fn((cb) => cb(mockEntityManager)),
        } as unknown as jest.Mocked<EntityManager>;

        mockUrl = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            path: "https://example.com",
        };

        mockConnection = {} as Partial<Connection>;
        mockQueryRunner = {} as Partial<QueryRunner>;

        (axios.get as jest.Mock).mockResolvedValue({
            data: "Mock response",
            status: 200,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should listen to Url entity", () => {
        expect(subscriber.listenTo()).toBe(Url);
    });

    describe("afterInsert", () => {
        it("should log URL response after insert", async () => {
            const mockEvent: Partial<InsertEvent<Url>> = {
                entity: mockUrl as Url,
                manager: mockEntityManager,
                connection: mockConnection as Connection,
                queryRunner: mockQueryRunner as QueryRunner,
                metadata: {} as any,
            };

            mockEntityManager.findOne.mockResolvedValue(mockUrl as Url);

            await subscriber.afterInsert(mockEvent as InsertEvent<Url>);

            expect(mockEntityManager.findOne).toHaveBeenCalledWith(Url, {
                where: { id: mockUrl.id },
            });
            expect(axios.get).toHaveBeenCalledWith(mockUrl.path);
            expect(mockEntityManager.save).toHaveBeenCalledWith(
                expect.any(History),
            );
        });
    });

    describe("afterUpdate", () => {
        it("should log URL response after update", async () => {
            const mockEvent: Partial<UpdateEvent<Url>> = {
                entity: mockUrl as Url,
                manager: mockEntityManager,
                connection: mockConnection as Connection,
                queryRunner: mockQueryRunner as QueryRunner,
                metadata: {} as any,
            };

            mockEntityManager.findOne.mockResolvedValue(mockUrl as Url);

            await subscriber.afterUpdate(mockEvent as UpdateEvent<Url>);

            expect(mockEntityManager.findOne).toHaveBeenCalledWith(Url, {
                where: { id: mockUrl.id },
            });
            expect(axios.get).toHaveBeenCalledWith(mockUrl.path);
            expect(mockEntityManager.save).toHaveBeenCalledWith(
                expect.any(History),
            );
        });
    });

    it("should handle errors when logging URL response", async () => {
        const mockEvent: Partial<InsertEvent<Url>> = {
            entity: mockUrl as Url,
            manager: mockEntityManager,
            connection: mockConnection as Connection,
            queryRunner: mockQueryRunner as QueryRunner,
            metadata: {} as any,
        };

        mockEntityManager.findOne.mockResolvedValue(mockUrl as Url);
        (axios.get as jest.Mock).mockRejectedValue(new Error("Network error"));

        const consoleSpy = jest.spyOn(console, "error").mockImplementation();

        await subscriber.afterInsert(mockEvent as InsertEvent<Url>);

        expect(consoleSpy).toHaveBeenCalledWith(
            "Failed to log URL response",
            expect.any(Error),
        );

        consoleSpy.mockRestore();
    });
});
