import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FormLogin from "@/components/auth/FormLogin";
import { Roles } from "@/constants/role";

type MockAuthStore = {
    login: () => void;
};

type MockDialogProps = {
    children: JSX.Element;
};

type MockButtonProps = {
    children: string;
    onClick: () => void;
    type: "button" | "submit" | "reset";
};

type MockFormProps = {
    children: JSX.Element;
    render?: (props: {
        field: { value: string; onChange: () => void };
    }) => JSX.Element;
};

type SubmitFunction = (data: { email: string; password: string }) => void;

const mockLogin = vi.fn();
const mockNavigate = vi.fn();
const mockToast = vi.fn();
const mockLoginMutation = vi.fn();
const mockSetOpenDialog = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("@/components/ui/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

vi.mock("@/stores/authStore", () => ({
    default: (selector: (store: MockAuthStore) => void) =>
        selector({ login: mockLogin }),
}));

vi.mock("@/generated/graphql-types", () => ({
    useLoginMutation: () => [mockLoginMutation, { loading: false }],
    loginSchema: {
        parse: vi.fn(),
    },
}));

vi.mock("@/components/ui/dialog.tsx", () => ({
    Dialog: ({ children }: MockDialogProps) => (
        <div data-testid="dialog">{children}</div>
    ),
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
    DialogClose: ({ children }: MockDialogProps) => (
        <div data-testid="dialog-close">{children}</div>
    ),
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick, type }: MockButtonProps) => (
        <button
            data-testid={`button-${type || "button"}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    ),
}));

vi.mock("@/components/ui/input", () => ({
    Input: vi.fn(({ role }) => <input data-testid={`input-${role}`} />),
}));

vi.mock("react-hook-form", () => ({
    useForm: () => ({
        register: vi.fn(),
        handleSubmit: (submit: SubmitFunction) => (event: SubmitEvent) => {
            event?.preventDefault?.();
            submit({
                email: "pierre@health-checker.fr",
                password: "password123",
            });
        },
        formState: { errors: {} },
        reset: vi.fn(),
        control: { register: vi.fn() },
    }),
}));

vi.mock("@/components/ui/form", () => ({
    Form: ({ children }: MockFormProps) => (
        <div data-testid="form" role="register-form">
            {children}
        </div>
    ),
    FormControl: ({ children }: MockFormProps) => (
        <div data-testid="form-control">{children}</div>
    ),
    FormField: ({ render }: MockFormProps) => (
        <div data-testid="form-field">
            {render?.({ field: { value: "", onChange: vi.fn() } })}
        </div>
    ),
    FormItem: ({ children }: MockFormProps) => (
        <div data-testid="form-item">{children}</div>
    ),
    FormLabel: ({ children }: MockFormProps) => (
        <div data-testid="form-label">{children}</div>
    ),
    FormMessage: () => <div data-testid="form-message"></div>,
}));

describe("FormLogin", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("must show login form", () => {
        render(<FormLogin setOpenDialog={mockSetOpenDialog} />);

        expect(screen.getByTestId("dialog-title").textContent).toContain(
            "Connexion",
        );

        expect(screen.getByTestId("input-email")).toBeInTheDocument();
        expect(screen.getByTestId("input-password")).toBeInTheDocument();

        expect(screen.getByTestId("button-submit").textContent).toContain(
            "Connexion",
        );
        expect(screen.getByText("Annuler")).toBeInTheDocument();
    });

    it("must submit login form successfully", async () => {
        mockLoginMutation.mockImplementation(({ onCompleted }) => {
            onCompleted?.({
                login: JSON.stringify({
                    id: "e5fb990e-f9d9-4858-82d1-1fd1755485a5",
                    username: "Pierre",
                    email: "pierre@health-checker.fr",
                    role: Roles.FREE,
                }),
            });
            return Promise.resolve();
        });

        render(<FormLogin setOpenDialog={mockSetOpenDialog} />);

        fireEvent.click(screen.getByTestId("button-submit"));

        expect(mockLogin).toHaveBeenCalled();
        expect(mockSetOpenDialog).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("must show an error on mutation fail", () => {
        mockLoginMutation.mockImplementation(({ onError }) => {
            onError?.();
            return Promise.reject(new Error("Erreur lors de la connexion"));
        });

        render(<FormLogin setOpenDialog={mockSetOpenDialog} />);

        fireEvent.click(screen.getByTestId("button-submit"));

        expect(mockLoginMutation).toHaveBeenCalled();

        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: "destructive",
                description: expect.stringContaining("échouée"),
            }),
        );

        expect(mockLogin).not.toHaveBeenCalled();
        expect(mockSetOpenDialog).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("must show 'Chargement...' during submit", () => {
        vi.mocked({ useLoginMutation: () => [vi.fn(), { loading: true }] });
        mockLoginMutation.mockImplementation(() => {});

        render(<FormLogin setOpenDialog={mockSetOpenDialog} />);

        fireEvent.click(screen.getByTestId("button-submit"));
        expect(mockLoginMutation).toHaveBeenCalled();
    });

    it("must close form on 'Annuler' click", () => {
        render(<FormLogin setOpenDialog={mockSetOpenDialog} />);

        fireEvent.click(screen.getByText("Annuler"));
    });
});
