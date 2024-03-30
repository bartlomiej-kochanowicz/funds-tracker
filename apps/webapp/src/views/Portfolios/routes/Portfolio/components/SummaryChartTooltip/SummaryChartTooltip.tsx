import { Currency } from "__generated__/graphql";
import { Text } from "@funds-tracker/ui";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const SummaryChartTooltip = (
	props?: TooltipProps<ValueType, NameType> & { currency: Currency },
) => {
	if (!props) return null;

	const { label, payload, currency } = props;

	if (!payload || !payload[0]) return null;

	const { value } = payload[0];

	return (
		<div className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md">
			<Text className="block font-bold">{formatCurrency(value as number, currency)}</Text>
			<Text className="block">{formatDate(label, { withTime: false })}</Text>
		</div>
	);
};
