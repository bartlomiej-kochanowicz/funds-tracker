import { createCalendar, fromDate, getLocalTimeZone } from "@internationalized/date";
import { DateValue, useDateField } from "@react-aria/datepicker";
import { DateFieldStateOptions, useDateFieldState } from "@react-stately/datepicker";
import { forwardRef, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { DateSegment } from "./DateSegment";

interface DateTimeInputProps
	extends Omit<DateFieldStateOptions<DateValue>, "createCalendar" | "value" | "onChange"> {
	className?: string;
	value?: Date;
	onChange?: (date?: Date) => void;
}

export const DateTimeInput = forwardRef<HTMLDivElement, DateTimeInputProps>(props => {
	const { className, value, onChange } = props;

	const state = useDateFieldState({
		...props,
		value: value ? fromDate(value, getLocalTimeZone()) : undefined,
		onChange: date => onChange?.(date?.toDate(getLocalTimeZone())),
		createCalendar,
	});

	const ref = useRef(null);
	const { fieldProps } = useDateField(props, state, ref);

	return (
		<div
			className={twMerge(
				"inline-flex gap-1 h-10 items-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>div]:hover:ring-offset-accent",
				className,
			)}
			{...fieldProps}
			ref={ref}
		>
			{state.segments.map((segment, i) => (
				<DateSegment
					key={i}
					segment={segment}
					state={state}
				/>
			))}
		</div>
	);
});
