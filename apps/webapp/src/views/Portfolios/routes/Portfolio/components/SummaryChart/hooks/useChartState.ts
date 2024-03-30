import { DateRangeType } from "@funds-tracker/ui";
import { subDays } from "date-fns";
import { useState } from "react";

export const useChartState = () => {
	const [{ range, timeFrame }, setState] = useState<{
		range: DateRangeType | undefined;
		timeFrame: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "5y" | "max";
	}>({
		range: {
			from: subDays(new Date(), 30),
			to: new Date(),
		},
		timeFrame: "1m",
	});

	const handleRangeChange = (range?: DateRangeType) => {
		setState(state => ({ ...state, range }));
	};
	const handleTimeFrameChange = timeFrame => {
		setState(state => ({ ...state, timeFrame }));
	};

	return { range, timeFrame, handleRangeChange, handleTimeFrameChange };
};
