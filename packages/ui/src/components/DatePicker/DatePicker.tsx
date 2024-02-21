import { Calendar as CalendarIcon } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";

type DatePickerProps = {
	value: Date;
	onChange: (date?: Date) => void;
	formatDate: (date: Date) => string;
	placeholder: string;
} & Omit<ComponentProps<typeof Calendar>, "mode" | "selected">;

const DatePicker = ({ value, onChange, formatDate, placeholder, ...rest }: DatePickerProps) => (
	<Popover>
		<Popover.Trigger asChild>
			<Button
				variant="outline"
				className={twMerge(
					"w-[280px] justify-start text-left font-normal",
					!value && "text-muted-foreground",
				)}
			>
				<CalendarIcon className="mr-2 size-4" />

				{value ? formatDate(value) : <span>{placeholder}</span>}
			</Button>
		</Popover.Trigger>
		<Popover.Content className="w-auto p-0">
			<Calendar
				toDate={new Date()}
				mode="single"
				selected={value}
				onSelect={onChange}
				initialFocus
				{...rest}
			/>
		</Popover.Content>
	</Popover>
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
