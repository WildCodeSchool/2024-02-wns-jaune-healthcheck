import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UpdateTierForm from "@/components/profile/subscription/UpdateTierForm";
import { Roles } from "@/constants/role";

type MockDialogProps = {
    children: JSX.Element;
    open?: boolean;
};

type MockButtonProps = {
    children: string;
    onClick: () => void;
    variant?: string;
};

const mockToast = vi.fn();
const mockSubscriptionUpdateTier = vi.fn();

vi.mock("@/components/ui/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

vi.mock("@/generated/graphql-types", () => ({
    useChangeSubscriptionTierMutation: () => [
        mockSubscriptionUpdateTier,
        { loading: false },
    ],
}));

vi.mock("@/components/ui/dialog.tsx", () => ({
    Dialog: ({ children, open }: MockDialogProps) =>
        open ? <div data-testid="dialog">{children}</div> : null,
    DialogContent: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogTitle: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-title">{children}</div>
    ),
    DialogDescription: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-description">{children}</div>
    ),
    DialogFooter: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-footer">{children}</div>
    ),
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick, variant }: MockButtonProps) => (
        <button
            data-testid={`button-${variant || "default"}`}
            onClick={onClick}
        >
            {children}
        </button>
    ),
}));

describe("UpdateTierForm", () => {
    const closeUpdateTier = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("must show subscription form to Premium", async () => {
        render(
            <UpdateTierForm
                tier={false}
                premium={true}
                closeUpdateTier={closeUpdateTier}
            />,
        );

        expect(screen.getByTestId("dialog")).toBeInTheDocument();

        const dialogTitle = screen.getByTestId("dialog-title");
        expect(dialogTitle.textContent).toContain(
            "Passer à la formule Premium",
        );

        expect(screen.getByText("Souscrire")).toBeInTheDocument();
        expect(screen.getByText("Ne pas changer")).toBeInTheDocument();
    });

    it("must close form on 'Ne pas changer' click", async () => {
        render(
            <UpdateTierForm
                tier={false}
                premium={true}
                closeUpdateTier={closeUpdateTier}
            />,
        );

        fireEvent.click(screen.getByText("Ne pas changer"));

        expect(closeUpdateTier).toHaveBeenCalledTimes(1);
    });

    it("must submit the mutation and show a success message", async () => {
        mockSubscriptionUpdateTier.mockImplementation(({ onCompleted }) => {
            onCompleted({
                changeSubscriptionTier: JSON.stringify({
                    id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
                    email: "pierre@health-checker.fr",
                    username: "Pierre",
                    role: Roles.PREMIUM,
                }),
            });
            return Promise.resolve({
                data: { changeSubscriptionTier: true },
            });
        });

        render(
            <UpdateTierForm
                tier={false}
                premium={true}
                closeUpdateTier={closeUpdateTier}
            />,
        );

        await act(async () => {
            fireEvent.click(screen.getByText("Souscrire"));
        });

        expect(mockSubscriptionUpdateTier).toHaveBeenCalled();

        expect(
            screen.getByText((content) => {
                return content.includes(
                    "Votre demande de modification a été validée",
                );
            }),
        ).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(3500);
        });

        expect(closeUpdateTier).toHaveBeenCalled();
    });

    it("must show error message when mutation fails", async () => {
        mockSubscriptionUpdateTier.mockImplementation(({ onError }) => {
            onError?.(new Error("Erreur lors du changement de formule"));
            return Promise.reject(
                new Error("Erreur lors du changement de formule"),
            );
        });

        render(
            <UpdateTierForm
                tier={false}
                premium={true}
                closeUpdateTier={closeUpdateTier}
            />,
        );

        await act(async () => {
            fireEvent.click(screen.getByText("Souscrire"));
        });

        expect(mockSubscriptionUpdateTier).toHaveBeenCalled();

        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: "destructive",
                description: expect.stringContaining("Erreur"),
            }),
        );

        expect(screen.getByText("Souscrire")).toBeInTheDocument();

        expect(closeUpdateTier).not.toHaveBeenCalled();
    });
});
