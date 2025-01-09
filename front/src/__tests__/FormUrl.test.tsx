import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormUrl from "@/components/landing/FormUrl";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_NEW_URL } from "@/graphql/mutation";
import { MemoryRouter } from "react-router-dom";

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
                isPrivate: false,
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

describe("Form url tests", () => {
    it("should contain a form", () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <FormUrl />
                </MemoryRouter>
            </MockedProvider>,
        );

        const formTag = screen.getByRole("add-url-form");
        expect(formTag).toBeInTheDocument();
    });

    it("should render loading on add", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <FormUrl />
                </MemoryRouter>
            </MockedProvider>,
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
                            content.includes("Chargement...")
                        );
                    }),
                ).toBeInTheDocument(),
            { timeout: 2000 },
        );
    });
});
