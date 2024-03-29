import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ComponentProps } from "react";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";

type DateRangePickerProps = {
	className?: string;
	value?: DateRange;
	onChange: (date?: DateRange) => void;
} & Omit<ComponentProps<typeof Calendar>, "mode" | "selected">;

const DateRangePicker = ({ className, value, onChange, ...rest }: DateRangePickerProps) => (
	<div className={twMerge("grid gap-2", className)}>
		<Popover>
			<Popover.Trigger asChild>
				<Button
					id="date"
					variant="outline"
					className={twMerge(
						"w-[300px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 size-4" />
					{value?.from &&
						(value.to ? (
							<>
								{format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
							</>
						) : (
							format(value.from, "LLL dd, y")
						))}

					{!value?.from && <span>Pick a date</span>}
				</Button>
			</Popover.Trigger>
			<Popover.Content
				className="w-auto p-0"
				align="start"
			>
				<Calendar
					initialFocus
					mode="range"
					defaultMonth={value?.from}
					selected={value}
					onSelect={onChange}
					numberOfMonths={2}
					{...rest}
				/>
			</Popover.Content>
		</Popover>
	</div>
);

DateRangePicker.displayName = "DateRangePicker";

export type { DateRange as DateRangeType };

export { DateRangePicker };
