import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormUrl from "@/components/landing/FormUrl";
import App from "@/App";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_NEW_URL } from "@/graphql/mutation";

const mocks = [
    {
        delay: 2000,
        request: {
            query: CREATE_NEW_URL,
            variables: {
                urlData: {
                    name: "Google",
                    path: "https://www.google.com/",
                },
            },
        },
        result: {
            data: {
                createUrl: {
                    id: "1",
                    name: "Google",
                    path: "https://www.google.com/",
                },
            },
        },
    },
];

const failedMocks = [
    {
        delay: 2000,
        request: {
            query: CREATE_NEW_URL,
            variables: {
                urlData: {
                    name: "Google",
                    path: "//www.google.com/",
                },
            },
        },
        error: new Error(
            "Erreur de validation des données, l'url doit comporter un chemin valide ex: http(s)://..."
        )
    },
];

describe("Form url tests", () => {
    it("should contain a form", () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FormUrl />
            </MockedProvider>
        );

        const formTag = screen.getByRole("add-url-form");
        expect(formTag).toBeInTheDocument();
    });

    it("should render loading on add", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FormUrl />
            </MockedProvider>
        );

        const nameInput = screen.getByRole("name");
        fireEvent.change(nameInput, {
            target: { value: mocks[0].request.variables.urlData.name },
        });

        const pathInput = screen.getByRole("path");
        fireEvent.change(pathInput, {
            target: { value: mocks[0].request.variables.urlData.path },
        });

        const addButton = await screen.findByText("Ajouter");
        fireEvent.click(addButton);

        await waitFor(
            () =>
                expect(
                    screen.getByText((content, element) => {
                        return (
                            element?.tagName.toLowerCase() === "button" &&
                            content.includes("Ajout en cours")
                        );
                    })
                ).toBeInTheDocument(),
            { timeout: 2000 }
        );
    });
});
