import { Card, DateRangePicker, ToggleGroup } from "@funds-tracker/ui";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useChartState } from "./hooks/useChartState";

type SummaryChartProps = {
	uuid: string;
};

export const SummaryChart = ({ uuid }: SummaryChartProps) => {
	const { range, timeFrame, handleRangeChange, handleTimeFrameChange } = useChartState();

	const data = [
		{
			date: "2024-02-29",
			marketValue: 1000,
			cash: 500,
		},
		{
			date: "2024-03-01",
			marketValue: 995,
			cash: 500,
		},
		{
			date: "2024-03-02",
			marketValue: 1106,
			cash: 500,
		},
		{
			date: "2024-03-03",
			marketValue: 885,
			cash: 1000,
		},
		{
			date: "2024-03-04",
			marketValue: 1200,
			cash: 1500,
		},
		{
			date: "2024-03-05",
			marketValue: 1300,
			cash: 1600,
		},
		{
			date: "2024-03-06",
			marketValue: 1400,
			cash: 1700,
		},
		{
			date: "2024-03-07",
			marketValue: 1500,
			cash: 1800,
		},
		{
			date: "2024-03-08",
			marketValue: 1400,
			cash: 1800,
		},
	];

	return (
		<Card>
			<Card.Content>
				<ResponsiveContainer height={300}>
					<LineChart data={data}>
						<CartesianGrid />
						<XAxis dataKey="date" />
						<YAxis />
						<Line
							type="monotone"
							dataKey="marketValue"
							stroke="#8884d8"
						/>
						<Line
							type="monotone"
							dataKey="cash"
							stroke="#82ca9d"
						/>
					</LineChart>
				</ResponsiveContainer>
				<div className="flex flex-wrap justify-end gap-4">
					<DateRangePicker
						value={range}
						onChange={handleRangeChange}
						toDate={new Date()}
					/>
					<ToggleGroup
						value={timeFrame}
						onValueChange={handleTimeFrameChange}
						variant="outline"
						type="single"
					>
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
