import { DateRangeType } from "@funds-tracker/ui";
import { subDays } from "date-fns";
import { createContext, ReactNode, useContext, useState } from "react";

type TimeFrame = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "5y" | "custom";

const timeFrameDays: Record<TimeFrame, number> = {
	"1d": 1,
	"1w": 7,
	"1m": 30,
	"3m": 90,
	"6m": 180,
	"1y": 365,
	"5y": 1825,
	custom: 30,
};

const useSummaryChartContextState = () => {
	const [{ range, timeFrame }, setState] = useState<{
		range: DateRangeType;
		timeFrame: TimeFrame;
	}>({
		range: {
			from: subDays(new Date(), 30),
			to: new Date(),
		},
		timeFrame: "1m",
	});

	const handleRangeChange = (range?: DateRangeType) => {
		if (!range) return;

		setState(state => ({ ...state, range }));
	};

	const handleTimeFrameChange = (timeFrame: TimeFrame) => {
		if (!timeFrame) return;

		setState(state => ({
			...state,
			range: {
				from: subDays(new Date(), timeFrameDays[timeFrame]),
				to: new Date(),
			},
			timeFrame,
		}));
	};

	return { range, timeFrame, handleRangeChange, handleTimeFrameChange };
};

type SummaryChartContextType = ReturnType<typeof useSummaryChartContextState>;

const SummaryChartContext = createContext<SummaryChartContextType | undefined>(undefined);

type ProviderProps = {
	children: ReactNode;
};

export const SummaryChartContextProvider = ({ children }: ProviderProps) => {
	const value = useSummaryChartContextState();

	return <SummaryChartContext.Provider value={value}>{children}</SummaryChartContext.Provider>;
};

export const useSummaryChartContext = () => {
	const value = useContext(SummaryChartContext);

	if (!value) {
		throw new Error("useSummaryChartContext must be used inside SummaryChartContextProvider");
	}

	return value;
};
