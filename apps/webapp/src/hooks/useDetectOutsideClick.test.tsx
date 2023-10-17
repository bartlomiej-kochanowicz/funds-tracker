import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import { useRef } from "react";

describe("useDetectOutsideClick tests", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});
	it("call callback function on click document", () => {
		const {
			result: { current: ref },
		} = renderHook(() => useRef(null));

		render(<div ref={ref} />);

		const mockHandler = vi.fn();

		renderHook(() => useDetectOutsideClick(ref, mockHandler));

		fireEvent.mouseDown(document);

		expect(mockHandler).toBeCalled();
	});

	it("do not call callback function on click ref", () => {
		const {
			result: { current: ref },
		} = renderHook(() => useRef(null));

		const { getByTestId } = render(<div ref={ref} data-testid="div-ref" />);

		const mockHandler = vi.fn();

		renderHook(() => useDetectOutsideClick(ref, mockHandler));

		const div = getByTestId("div-ref");

		fireEvent.mouseDown(div);

		expect(mockHandler).not.toBeCalled();
	});
});
