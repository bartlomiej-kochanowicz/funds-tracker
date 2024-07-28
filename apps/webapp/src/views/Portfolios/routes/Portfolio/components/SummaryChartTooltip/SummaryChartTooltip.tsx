import { Text } from "@funds-tracker/ui";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const SummaryChartTooltip = (
	props?: TooltipProps<ValueType, NameType> & { currency: string },
) => {
	if (!props) return null;

	const { label, payload, currency } = props;

	if (!payload) return null;

	return (
		<div className="z-50 overflow-hidden rounded border bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md">
			{payload.map(entry => (
				<div
					className="flex items-center"
					key={entry.dataKey}
				>
					<span
						className="mr-1 block size-2 rounded-full"
						style={{
							backgroundColor: entry.color,
						}}
					/>
					<Text className="block text-xs font-bold">
						{formatCurrency(entry.value as number, currency)}
					</Text>
				</div>
			))}

			<Text className="block text-xs">{formatDate(label, { withTime: false })}</Text>
		</div>
	);
};
