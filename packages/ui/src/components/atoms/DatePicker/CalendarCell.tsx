import { type CalendarDate } from "@internationalized/date";
import clsx from "clsx";
import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { type CalendarState } from "react-stately";

interface CalendarCellProps {
	state: CalendarState;
	date: CalendarDate;
}

export const CalendarCell = ({ state, date }: CalendarCellProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } =
		useCalendarCell({ date }, state, ref);

	const { focusProps, isFocusVisible } = useFocusRing();

	return (
		<td
			{...cellProps}
			className={`relative py-0.5 ${isFocusVisible ? "z-10" : "z-0"}`}
		>
			<div
				{...mergeProps(buttonProps, focusProps)}
				ref={ref}
				hidden={isOutsideVisibleRange}
				className={clsx(
					"group flex h-8 w-8 items-center justify-center rounded-md outline-none",
					isSelected && "bg-blue-500 text-white",
					isDisabled && "disabled cursor-not-allowed text-gray-400",
					isFocusVisible && "group-focus:z-2 ring-2 ring-blue-300 ring-offset-2",
					!isSelected && !isDisabled && "hover:bg-blue-200",
				)}
			>
				{formattedDate}
			</div>
		</td>
	);
};
