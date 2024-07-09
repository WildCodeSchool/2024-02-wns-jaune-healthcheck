import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App tests", () => {
    it("should contain main tag", () => {
        render(<App />);

        const mainTag = screen.getByRole("main");

        expect(mainTag).toBeInTheDocument();
    });
});
