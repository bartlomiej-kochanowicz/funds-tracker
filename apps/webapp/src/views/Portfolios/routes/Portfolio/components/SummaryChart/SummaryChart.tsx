import { Card, DateRangePicker, ToggleGroup } from "@funds-tracker/ui";
import { useUserContext } from "contexts/UserContext";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import {
	Area,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { useChartState } from "./hooks/useChartState";

type SummaryChartProps = {
	uuid: string;
};

export const SummaryChart = ({ uuid }: SummaryChartProps) => {
	const { user } = useUserContext();

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

	const convertValue = (value: number) => formatCurrency(value, user.defaultCurrency);

	const convertDate = (date: string) =>
		formatDate(date, {
			withTime: false,
			yearFormat: "2-digit",
			withDay: timeFrame === "1d" || timeFrame === "1w",
			withMonth:
				timeFrame === "1d" ||
				timeFrame === "1w" ||
				timeFrame === "1m" ||
				timeFrame === "3m" ||
				timeFrame === "6m",
			withYear:
				timeFrame === "1m" ||
				timeFrame === "3m" ||
				timeFrame === "6m" ||
				timeFrame === "1y" ||
				timeFrame === "5y" ||
				timeFrame === "max",
		});

	return (
		<Card>
			<Card.Content>
				<ResponsiveContainer height={300}>
					<LineChart
						data={data}
						margin={{
							left: 28,
							right: 8,
						}}
					>
						<defs>
							<linearGradient
								id="colorUv"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#129a74"
									stopOpacity={0.1}
								/>
								<stop
									offset="95%"
									stopColor="#FFFFFF"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Tooltip />
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickFormatter={convertDate}
						/>
						<YAxis tickFormatter={convertValue} />
						<Line
							strokeWidth={2}
							type="monotone"
							dataKey="marketValue"
							stroke="#8884d8"
							dot={false}
						/>
						<Area
							type="monotone"
							dataKey="marketValue"
							stroke="#8884d8"
							strokeWidth={2}
							fillOpacity={1}
							fill="url(#colorUv)"
						/>
						{/* <Line
							dot={false}
							type="monotone"
							dataKey="cash"
							stroke="#82ca9d"
						/> */}
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
						size="sm"
					>
						<ToggleGroup.Item
							value="max"
							aria-label="Toggle max"
						>
							Max
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="5y"
							aria-label="Toggle max"
						>
							5y
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="1y"
							aria-label="Toggle one year"
						>
							1y
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="6m"
							aria-label="Toggle six months"
						>
							6m
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="3m"
							aria-label="Toggle three months"
						>
							3m
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
