import { DateRangePicker, ScrollArea, ScrollBar, ToggleGroup } from "@funds-tracker/ui";
import { useTranslation } from "react-i18next";

import { useSummaryChartContext } from "../../context";

export const SummaryChartOptions = () => {
	const { t } = useTranslation();

	const { range, timeFrame, handleRangeChange, handleTimeFrameChange } = useSummaryChartContext();

	return (
		<ScrollArea>
			<div className="flex gap-4 pb-4">
				<ToggleGroup
					value={timeFrame}
					onValueChange={handleTimeFrameChange}
					variant="outline"
					type="single"
				>
					<ToggleGroup.Item
						value="1d"
						aria-label="Toggle one day"
					>
						1d
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="1w"
						aria-label="Toggle one week"
					>
						1w
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="1m"
						aria-label="Toggle one month"
					>
						1m
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="3m"
						aria-label="Toggle three months"
					>
						3m
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="6m"
						aria-label="Toggle six months"
					>
						6m
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="1y"
						aria-label="Toggle one year"
						className="whitespace-nowrap"
					>
						{t("date.1y")}
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="5y"
						aria-label="Toggle 5 years"
						className="whitespace-nowrap"
					>
						{t("date.5y")}
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="custom"
						aria-label="Toggle custom"
					>
						{t("common.custom")}
					</ToggleGroup.Item>
				</ToggleGroup>
				{timeFrame === "custom" && (
					<DateRangePicker
						value={range}
						onChange={handleRangeChange}
						toDate={new Date()}
					/>
				)}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
