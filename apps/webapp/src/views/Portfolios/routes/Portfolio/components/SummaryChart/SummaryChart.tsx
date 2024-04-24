import { Loader } from "@funds-tracker/ui";
import { useUserContext } from "contexts/UserContext";
import { differenceInDays } from "date-fns";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { useQueryPortfolioSummary } from "hooks/api/portfolios/useQueryPortfolioSummary";
import {
	Area,
	CartesianGrid,
	ComposedChart,
	Legend,
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

	const { range } = useSummaryChartContext();

	if (!range.from || !range.to) {
		return null;
	}

	const daysDifference = differenceInDays(range.to, range.from);

	const { data, loading } = useQueryPortfolioSummary({
		uuid,
		from: range.from,
		to: range.to,
	});

	const convertValue = (value: number) =>
		formatCurrency(value, user.defaultCurrency, {
			withFractionDigits: false,
		});

	const convertDate = (date: string) =>
		formatDate(date, {
			withTime: false,
			yearFormat: daysDifference >= 365 ? "numeric" : "2-digit",
			withDay: daysDifference <= 30,
			withMonth: daysDifference <= 365,
			withYear: daysDifference > 30,
		});

	if (loading || !data) {
		return (
			<div className="flex h-80 items-center justify-center">
				<Loader className="size-8" />
			</div>
		);
	}

	const {
		portfolioSummary: { data: chartData },
	} = data;

	return (
		<ResponsiveContainer height={320}>
			<ComposedChart
				data={chartData}
				margin={{
					left: -8,
				}}
			>
				<defs>
					<linearGradient
						id="gradient-primary"
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop
							offset="20%"
							stopColor="hsl(var(--primary))"
							stopOpacity={0.25}
						/>
						<stop
							offset="100%"
							stopColor="hsl(var(--primary))"
							stopOpacity={0.05}
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
					tickFormatter={convertValue}
					tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
					domain={[0, dataMax => dataMax * 1.05]}
				/>
				<Area
					type="linear"
					dataKey="marketValue"
					stroke="hsl(var(--primary))"
					strokeWidth={2}
					strokeOpacity={1}
					fill="url(#gradient-primary)"
					activeDot={{
						strokeWidth: 0,
					}}
				/>

				<Line
					dot={false}
					type="step"
					dataKey="cumulativeCash"
					stroke="hsl(var(--success))"
					activeDot={{
						strokeWidth: 0,
					}}
				/>
				<Legend
					payload={[
						{
							id: "marketValue",
							value: "Market Value",
							color: "hsl(var(--primary))",
						},
						{
							id: "cumulativeCash",
							value: "Cash",
							color: "hsl(var(--success))",
						},
					]}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};
