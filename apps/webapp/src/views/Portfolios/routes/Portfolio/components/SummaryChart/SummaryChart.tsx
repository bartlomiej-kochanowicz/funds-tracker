import { Card, DateRangePicker, DateRangeType, ToggleGroup } from "@funds-tracker/ui";
import { subDays } from "date-fns";
import { useState } from "react";

type SummaryChartProps = {
	uuid: string;
};

export const SummaryChart = ({ uuid }: SummaryChartProps) => {
	const [{ range, timeFrame }] = useState<{
		range: DateRangeType | undefined;
		timeFrame: "max" | "1y" | "1m" | "1w" | "1d";
	}>({
		range: {
			from: subDays(new Date(), 30),
			to: new Date(),
		},
		timeFrame: "max",
	});

	const handleRangeChange = () => {};
	const handleTimeFrameChange = () => {};

	return (
		<Card>
			<Card.Content>
				<div className="flex flex-wrap gap-4">
					<DateRangePicker
						value={range}
						onChange={handleRangeChange}
						toDate={new Date()}
					/>
					<ToggleGroup
						value={timeFrame}
						onChange={handleTimeFrameChange}
						variant="outline"
						type="single"
					>
						<ToggleGroup.Item
							value="max"
							aria-label="Toggle max"
						>
							Max
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="1y"
							aria-label="Toggle one year"
						>
							1y
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="1m"
							aria-label="Toggle one month"
						>
							1m
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="1w"
							aria-label="Toggle one week"
						>
							1w
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="1d"
							aria-label="Toggle one day"
						>
							1d
						</ToggleGroup.Item>
					</ToggleGroup>
				</div>
			</Card.Content>
		</Card>
	);
};
