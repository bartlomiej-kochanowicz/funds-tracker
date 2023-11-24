import clsx from "clsx";
import { AlertCircle, CalendarDays } from "lucide-react";
import { useRef } from "react";
import { type DateValue, useDatePicker } from "react-aria";
import { type DatePickerStateOptions, useDatePickerState } from "react-stately";

import { Popover } from "../Popover";
import { Text } from "../Text";
import { Calendar } from "./Calendar";
import { DateField } from "./DateField";
import { Dialog } from "./Dialog";
import { FieldButton } from "./FieldButton";

interface DatePickerProps<T extends DateValue = DateValue> extends DatePickerStateOptions<T> {}

export const DatePicker = <T extends DateValue = DateValue>(props: DatePickerProps<T>) => {
	const state = useDatePickerState(props);
	const ref = useRef<HTMLDivElement>(null);
	const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } =
		useDatePicker(props, state, ref);

	const { label, isDisabled } = props;

	return (
		<div className="relative inline-flex flex-col text-left">
			<Text
				{...labelProps}
				className="mb-2 block text-sm"
			>
				{label}
			</Text>
			<div
				{...groupProps}
				ref={ref}
				className={clsx("group flex", isDisabled && "cursor-not-allowed opacity-50")}
			>
				<div
					className={clsx(
						"relative flex items-center rounded-l-xl border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm transition-colors dark:border-gray-600 dark:bg-neutral-700",
						!isDisabled &&
							"group-focus-within:border-blue-500 group-hover:border-gray-400 group-focus-within:group-hover:border-blue-500",
					)}
				>
					<DateField {...fieldProps} />
					{state.isInvalid && <AlertCircle className="absolute right-1 h-6 w-6 text-red-500" />}
				</div>
				<FieldButton
					{...buttonProps}
					isDisabled={isDisabled}
					isPressed={state.isOpen}
				>
					<CalendarDays className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 dark:text-white" />
				</FieldButton>
			</div>
			{state.isOpen && !isDisabled && (
				<Popover
					triggerRef={ref}
					state={state}
					placement="bottom start"
					className="p-2"
				>
					<Dialog {...dialogProps}>
						<Calendar {...calendarProps} />
					</Dialog>
				</Popover>
			)}
		</div>
	);
};
