import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";

const DatePicker = () => {
	const [date, setDate] = useState<Date>();

	return (
		<Popover>
			<Popover.Trigger asChild>
				<Button
					variant="outline"
					className={twMerge(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 size-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</Popover.Content>
		</Popover>
	);
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
