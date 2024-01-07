import { createCalendar } from "@internationalized/date";
import { useRef } from "react";
import { useDateField, useLocale } from "react-aria";
import { useDateFieldState } from "react-stately";

import { DateSegment } from "./DateSegment";

export const DateField = props => {
	const { locale } = useLocale();
	const state = useDateFieldState({
		...props,
		locale,
		createCalendar,
	});

	const ref = useRef<HTMLDivElement>(null);
	const { fieldProps } = useDateField(props, state, ref);

	return (
		<div
			{...fieldProps}
			ref={ref}
			className="flex"
		>
			{state.segments.map((segment, index) => (
				<DateSegment
					key={index}
					segment={segment}
					state={state}
				/>
			))}
		</div>
	);
};
