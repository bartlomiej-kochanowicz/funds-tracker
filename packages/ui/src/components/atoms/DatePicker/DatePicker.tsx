import { AlertCircle, CalendarDays } from "lucide-react";
import { useRef } from "react";
import { type DateValue, useDatePicker } from "react-aria";
import { type DatePickerStateOptions, useDatePickerState } from "react-stately";

import { Calendar } from "./Calendar";
import { DateField } from "./DateField";
import { Dialog } from "./Dialog";
import { FieldButton } from "./FieldButton";
import { Popover } from "./Popover";

interface DatePickerProps<T extends DateValue = DateValue> extends DatePickerStateOptions<T> {}

export const DatePicker = <T extends DateValue = DateValue>(props: DatePickerProps<T>) => {
	const state = useDatePickerState(props);
	const ref = useRef<HTMLDivElement>(null);
	const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } =
		useDatePicker(props, state, ref);

	const { label } = props;

	return (
		<div className="relative inline-flex flex-col text-left">
			<span
				{...labelProps}
				className="text-sm text-gray-800"
			>
				{label}
			</span>
			<div
				{...groupProps}
				ref={ref}
				className="group flex"
			>
				<div className="relative flex items-center rounded-l-md border border-gray-300 bg-white p-1 pr-10 transition-colors group-focus-within:border-blue-600 group-hover:border-gray-400 group-focus-within:group-hover:border-blue-600">
					<DateField {...fieldProps} />
					{state.isInvalid && <AlertCircle className="absolute right-1 h-6 w-6 text-red-500" />}
				</div>
				<FieldButton
					{...buttonProps}
					isPressed={state.isOpen}
				>
					<CalendarDays className="h-5 w-5 text-gray-700 group-focus-within:text-blue-600" />
				</FieldButton>
			</div>
			{state.isOpen && (
				<Popover
					triggerRef={ref}
					state={state}
					placement="bottom start"
				>
					<Dialog {...dialogProps}>
						<Calendar {...calendarProps} />
					</Dialog>
				</Popover>
			)}
		</div>
	);
};
