import { Calendar as CalendarIcon } from "lucide-react";
import { type ComponentProps, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/src/components/button";
import { Calendar } from "@/src/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/popover";

type DatePickerProps = {
	value: Date | null;
	onChange: (date?: Date) => void;
	formatDate: (date: Date) => string;
	placeholder: string;
	className?: string;
} & Omit<ComponentProps<typeof Calendar>, "mode" | "selected">;

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
	({ value, onChange, formatDate, placeholder, className, ...rest }, ref) => {
		const [open, setOpen] = useState(false);

		const handleSelect = (date?: Date) => {
			if (!date) return;

			onChange(date);
			setOpen(false);
		};

		return (
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
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
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={value || undefined}
						onSelect={handleSelect}
						initialFocus
						{...rest}
					/>
				</PopoverContent>
			</Popover>
		);
	},
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
