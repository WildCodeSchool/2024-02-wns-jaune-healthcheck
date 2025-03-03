import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UpdateTierForm from "@/components/profile/subscription/UpdateTierForm";
import * as GraphQLHooks from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { ApolloClient } from "@apollo/client";

type mockDialogProps = {
    children: JSX.Element;
    open?: boolean;
};

type mockButtonProps = {
    children: string;
    onClick: () => void;
    variant?: string;
};

vi.mock("@/components/ui/use-toast", () => ({
    toast: vi.fn(),
}));

vi.mock("@/stores/authStore", () => ({
    default: vi.fn(),
}));

vi.mock("@/components/ui/dialog.tsx", () => ({
    Dialog: ({ children, open }: mockDialogProps) =>
        open ? <div data-testid="dialog">{children}</div> : null,
    DialogContent: ({ children }: mockDialogProps) => (
        <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: mockDialogProps) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogTitle: ({ children }: mockDialogProps) => (
        <div data-testid="dialog-title">{children}</div>
    ),
    DialogDescription: ({ children }: mockDialogProps) => (
        <div data-testid="dialog-description">{children}</div>
    ),
    DialogFooter: ({ children }: mockDialogProps) => (
        <div data-testid="dialog-footer">{children}</div>
    ),
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick, variant }: mockButtonProps) => (
        <button
            data-testid={`button-${variant || "default"}`}
            onClick={onClick}
        >
            {children}
        </button>
    ),
}));

vi.mock("lucide-react", () => ({
    Check: () => <span data-testid="check-icon">✓</span>,
    X: () => <span data-testid="x-icon">✗</span>,
}));

describe("UpdateTierForm", () => {
    const closeUpdateTier = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(
            GraphQLHooks,
            "useChangeSubscriptionTierMutation",
        ).mockReturnValue([
            vi.fn().mockImplementation(({ onCompleted }) => {
                onCompleted({
                    changeSubscriptionTier: JSON.stringify({
                        id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
                        email: "pierre@health-checker.fr",
                        username: "Pierre",
                        role: "PREMIUM",
                    }),
                });
                return Promise.resolve({
                    data: { changeSubscriptionTier: true },
                });
            }),
            {
                loading: false,
                called: false,
                client: {} as ApolloClient<object>,
                reset: function (): void {
                    throw new Error("Function not implemented.");
                },
            },
        ]);

        const mockMe = vi.fn();
        vi.mocked(useAuthStore).mockReturnValue(mockMe);
    });

    it("devrait afficher le formulaire de changement vers Premium", async () => {
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

    it("devrait fermer le formulaire quand on clique sur Annuler", async () => {
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

    it("devrait soumettre la mutation et afficher un message de succès", async () => {
        render(
            <UpdateTierForm
                tier={false}
                premium={true}
                closeUpdateTier={closeUpdateTier}
            />,
        );

        fireEvent.click(screen.getByText("Souscrire"));

        await waitFor(() => {
            expect(
                screen.getByText((content) => {
                    return (
                        content.includes("modification") &&
                        content.includes("validée")
                    );
                }),
            ).toBeInTheDocument();
        });

        expect(useAuthStore()).toHaveBeenCalled();

        await new Promise((resolve) => setTimeout(resolve, 3600));
        expect(closeUpdateTier).toHaveBeenCalled();
    });
});
