import { GlobalStyle } from "styles/GlobalStyle";
import { render } from "utils/test-utils";

describe("Styles/GlobalStyle tests", () => {
	it("renders properly", () => {
		render(<GlobalStyle />);
	});
});
