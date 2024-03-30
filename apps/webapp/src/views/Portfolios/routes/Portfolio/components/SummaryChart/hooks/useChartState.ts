import { DateRangeType } from "@funds-tracker/ui";
import { subDays } from "date-fns";
import { useState } from "react";

export const useChartState = () => {
	const [{ range, timeFrame }, setState] = useState<{
		range: DateRangeType | undefined;
		timeFrame: "1y" | "1m" | "1w" | "1d";
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
