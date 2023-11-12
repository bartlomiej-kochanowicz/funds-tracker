import { createCalendar } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";

import { CalendarButton } from "./CalendarButton";
import { CalendarGrid } from "./CalendarGrid";

export const Calendar = props => {
	const { locale } = useLocale();

	const state = useCalendarState({
		...props,
		locale,
		createCalendar,
	});

	const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

	return (
		<div
			{...calendarProps}
			className="inline-block text-gray-900 dark:text-white"
		>
			<div className="flex items-center pb-4">
				<h2 className="ml-2 flex-1 text-xl font-bold">{title}</h2>
				<CalendarButton {...prevButtonProps}>
					<ChevronLeft className="h-6 w-6" />
				</CalendarButton>
				<CalendarButton {...nextButtonProps}>
					<ChevronRight className="h-6 w-6" />
				</CalendarButton>
			</div>
			<CalendarGrid state={state} />
		</div>
	);
};
