import { useUserContext } from "contexts/UserContext";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { useSummaryChartContext } from "../../context";
import { SummaryChartTooltip } from "../SummaryChartTooltip";

type SummaryChartProps = {
	uuid: string;
};

export const SummaryChart = ({ uuid }: SummaryChartProps) => {
	const { user } = useUserContext();

	const { timeFrame } = useSummaryChartContext();

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

	const convertValue = (value: number) =>
		formatCurrency(value, user.defaultCurrency, {
			withFractionDigits: false,
		});

	const convertDate = (date: string) =>
		formatDate(date, {
			withTime: false,
			yearFormat: timeFrame === "5y" || timeFrame === "max" ? "numeric" : "2-digit",
			withDay: timeFrame === "1d" || timeFrame === "1w" || timeFrame === "1m",
			withMonth:
				timeFrame === "1d" ||
				timeFrame === "1w" ||
				timeFrame === "1m" ||
				timeFrame === "3m" ||
				timeFrame === "6m" ||
				timeFrame === "1y",
			withYear:
				timeFrame === "3m" ||
				timeFrame === "6m" ||
				timeFrame === "1y" ||
				timeFrame === "5y" ||
				timeFrame === "max",
		});

	return (
		<ResponsiveContainer height={300}>
			<ComposedChart
				data={data}
				margin={{
					left: -8,
				}}
			>
				<defs>
					<linearGradient
						id="colorView"
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop
							offset="20%"
							stopColor="#3B82F6"
							stopOpacity={0.35}
						/>
						<stop
							offset="100%"
							stopColor="transparent"
							stopOpacity={0.5}
						/>
					</linearGradient>
				</defs>
				<Tooltip
					content={<SummaryChartTooltip currency={user.defaultCurrency} />}
					cursor={{
						strokeDasharray: "3",
					}}
				/>
				<CartesianGrid
					vertical={false}
					strokeOpacity={0.25}
				/>
				<XAxis
					dataKey="date"
					tickFormatter={convertDate}
					tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					dataKey="marketValue"
					tickFormatter={convertValue}
					tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
				/>
				<Area
					type="linear"
					dataKey="marketValue"
					stroke="#3B82F6"
					strokeWidth={2}
					strokeOpacity={1}
					fill="url(#colorView)"
				/>

				<Line
					dot={false}
					type="step"
					dataKey="cash"
					stroke="#82ca9d"
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};
