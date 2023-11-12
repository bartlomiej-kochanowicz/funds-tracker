import { getWeeksInMonth } from "@internationalized/date";
import { type AriaCalendarGridProps, useCalendarGrid, useLocale } from "react-aria";
import { type CalendarState } from "react-stately";

import { CalendarCell } from "./CalendarCell";

interface CalendarGridProps extends AriaCalendarGridProps {
	state: CalendarState;
}

export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
	const { locale } = useLocale();
	const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

	const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

	return (
		<table
			{...gridProps}
			cellPadding="0"
			className="flex-1"
		>
			<thead
				{...headerProps}
				className="text-gray-600 dark:text-gray-400"
			>
				<tr>
					{weekDays.map((day, index) => (
						<th
							className="text-center"
							key={index}
						>
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map(weekIndex => (
					<tr key={weekIndex}>
						{state.getDatesInWeek(weekIndex).map((date, index) =>
							date ? (
								<CalendarCell
									key={index}
									state={state}
									date={date}
								/>
							) : (
								<td
									key={index}
									aria-label="empty cell"
								/>
							),
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};
