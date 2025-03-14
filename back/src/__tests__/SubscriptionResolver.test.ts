import MyContext from "@/types/MyContext";
import { User, Roles } from "../entities/User";
import SubscriptionResolver from "../resolvers/SubscriptionResolver";
import Stripe from "stripe";

jest.mock("stripe");

describe("SubscriptionResolver", () => {
    let subscriptionResolver: SubscriptionResolver;
    let mockContext: MyContext;
    let mockUser: User;

    const mockStripeCustomer = {
        id: "cus_mock",
        email: "pierre@health-checker.fr",
    };

    const mockSubscription = {
        id: "sub_mock",
        items: {
            data: [{ id: "si_mock" }],
        },
    };

    const mockSetupIntent = {
        client_secret: "seti_mock_secret",
    };

    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = {
            id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
            username: "Pierre",
            email: "pierre@health-checker.fr",
            role: Roles.FREE,
            save: jest.fn().mockResolvedValue(undefined),
        } as unknown as User;

        User.findOneBy = jest.fn().mockResolvedValue(mockUser);

        mockContext = {
            res: {
                setHeader: jest.fn(),
            },
            payload: {
                id: mockUser.id,
                email: mockUser.email,
            },
        };

        const mockStripeMethods = {
            customers: {
                list: jest.fn().mockResolvedValue({ data: [] }),
                create: jest.fn().mockResolvedValue(mockStripeCustomer),
                update: jest.fn().mockResolvedValue({}),
            },
            setupIntents: {
                create: jest.fn().mockResolvedValue(mockSetupIntent),
            },
            paymentMethods: {
                attach: jest.fn().mockResolvedValue({}),
            },
            subscriptions: {
                create: jest.fn().mockResolvedValue(mockSubscription),
                list: jest.fn().mockResolvedValue({ data: [mockSubscription] }),
                update: jest.fn().mockResolvedValue(mockSubscription),
                cancel: jest.fn().mockResolvedValue({}),
            },
        };

        (Stripe as unknown as jest.Mock).mockImplementation(
            () => mockStripeMethods,
        );

        process.env.STRIPE_SECRET_KEY = "sk_test_mock";
        process.env.STRIPE_TIER_PRICE_ID = "price_tier_mock";
        process.env.STRIPE_PREMIUM_PRICE_ID = "price_premium_mock";

        subscriptionResolver = new SubscriptionResolver();
    });

    describe("createStripeSetupIntent", () => {
        it("must create Stripe intent setup", async () => {
            const result =
                await subscriptionResolver.createStripeSetupIntent(mockContext);

            expect(result).toBe("seti_mock_secret");
        });

        it("must fail if there isn't a user authenticated", async () => {
            mockContext.payload = undefined;

            await expect(
                subscriptionResolver.createStripeSetupIntent(mockContext),
            ).rejects.toThrow("User unauthenticated");
        });
    });

    describe("createSubscription", () => {
        it("must create a Tier subscription", async () => {
            const paymentMethodId = "pm_mock";
            const priceKey = Roles.TIER;

            const result = await subscriptionResolver.createSubscription(
                mockContext,
                paymentMethodId,
                priceKey,
            );

            expect(User.findOneBy).toHaveBeenCalledWith({
                id: mockContext.payload!.id,
            });

            expect(mockUser.role).toBe(Roles.TIER);
            expect(mockUser.save).toHaveBeenCalled();

            const userDataResponse = JSON.parse(result);
            expect(userDataResponse).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                role: mockUser.role,
            });
        });

        it("must create a Premium subscription", async () => {
            const paymentMethodId = "pm_mock";
            const priceKey = Roles.PREMIUM;

            await subscriptionResolver.createSubscription(
                mockContext,
                paymentMethodId,
                priceKey,
            );

            expect(mockUser.role).toBe(Roles.PREMIUM);
            expect(mockUser.save).toHaveBeenCalled();
        });

        it("must fail if there isn't a user authenticated", async () => {
            mockContext.payload = undefined;

            await expect(
                subscriptionResolver.createSubscription(
                    mockContext,
                    "pm_mock",
                    Roles.TIER,
                ),
            ).rejects.toThrow("User unauthenticated");
        });
    });

    describe("changeSubscriptionTier", () => {
        it("must update an existing subscription", async () => {
            const newPriceKey = Roles.PREMIUM;

            const result = await subscriptionResolver.changeSubscriptionTier(
                mockContext,
                newPriceKey,
            );

            expect(User.findOneBy).toHaveBeenCalledWith({
                id: mockContext.payload!.id,
            });

            expect(mockUser.role).toBe(Roles.PREMIUM);
            expect(mockUser.save).toHaveBeenCalled();

            const userDataResponse = JSON.parse(result);
            expect(userDataResponse).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                role: mockUser.role,
            });
        });

        it("must fail if there isn't an active subscription", async () => {
            const stripeSpy = Stripe as unknown as jest.Mock;
            const mockStripeInstance = stripeSpy.mock.results[0].value;
            mockStripeInstance.subscriptions.list.mockResolvedValueOnce({
                data: [],
            });

            await expect(
                subscriptionResolver.changeSubscriptionTier(
                    mockContext,
                    Roles.PREMIUM,
                ),
            ).rejects.toThrow("Aucun abonnement actif n'a été trouvé.");
        });
    });

    describe("cancelSubscription", () => {
        it("must cancel an existing subscription", async () => {
            const result =
                await subscriptionResolver.cancelSubscription(mockContext);

            expect(User.findOneBy).toHaveBeenCalledWith({
                id: mockContext.payload!.id,
            });

            expect(mockUser.role).toBe(Roles.FREE);
            expect(mockUser.save).toHaveBeenCalled();

            const userDataResponse = JSON.parse(result);
            expect(userDataResponse).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                role: mockUser.role,
            });
        });

        it("musn't fail if there isn't an active subscription", async () => {
            const stripeSpy = Stripe as unknown as jest.Mock;
            const mockStripeInstance = stripeSpy.mock.results[0].value;
            mockStripeInstance.subscriptions.list.mockResolvedValueOnce({
                data: [],
            });

            const result =
                await subscriptionResolver.cancelSubscription(mockContext);

            const userDataResponse = JSON.parse(result);
            expect(userDataResponse).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                role: mockUser.role,
            });
        });
    });
});
