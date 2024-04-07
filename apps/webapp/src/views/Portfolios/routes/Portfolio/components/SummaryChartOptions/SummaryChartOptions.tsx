import { DateRangePicker, ScrollArea, ToggleGroup } from "@funds-tracker/ui";

import { useSummaryChartContext } from "../../context";

export const SummaryChartOptions = () => {
	const { range, timeFrame, handleRangeChange, handleTimeFrameChange } = useSummaryChartContext();

	return (
		<div className="mb-4 flex flex-wrap gap-4">
			<ScrollArea>
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
					>
						1y
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="5y"
						aria-label="Toggle max"
					>
						5y
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="max"
						aria-label="Toggle max"
					>
						Max
					</ToggleGroup.Item>
					<ToggleGroup.Item
						value="custom"
						aria-label="Toggle custom"
					>
						Custom
					</ToggleGroup.Item>
				</ToggleGroup>
			</ScrollArea>
			{timeFrame === "custom" && (
				<DateRangePicker
					value={range}
					onChange={handleRangeChange}
					toDate={new Date()}
				/>
			)}
		</div>
	);
};
