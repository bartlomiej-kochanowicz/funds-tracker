import { Calendar as CalendarIcon } from "lucide-react";
import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";

type DatePickerProps = {
	value: Date | null;
	onChange: (date?: Date) => void;
	formatDate: (date: Date) => string;
	placeholder: string;
	className?: string;
} & Omit<ComponentProps<typeof Calendar>, "mode" | "selected">;

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
	({ value, onChange, formatDate, placeholder, className, ...rest }, ref) => {
		const handleSelect = (date?: Date) => {
			if (!date) return;

			onChange(date);
		};

		return (
			<Popover>
				<Popover.Trigger asChild>
					<Button
						variant="outline"
						className={twMerge(
							"justify-start text-left font-normal",
							!value && "text-muted-foreground",
							className,
						)}
						ref={ref}
					>
						<CalendarIcon className="mr-2 size-4" />

						{value ? formatDate(value) : <span>{placeholder}</span>}
					</Button>
				</Popover.Trigger>
				<Popover.Content className="w-auto p-0">
					<Calendar
						mode="single"
						selected={value || undefined}
						onSelect={handleSelect}
						initialFocus
						{...rest}
					/>
				</Popover.Content>
			</Popover>
		);
	},
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
