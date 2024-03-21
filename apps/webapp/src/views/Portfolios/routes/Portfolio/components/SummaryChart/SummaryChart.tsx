import { Card, ToggleGroup } from "@funds-tracker/ui";

type SummaryChartProps = {
	uuid: string;
};

export const SummaryChart = ({ uuid }: SummaryChartProps) => {
	return (
		<Card>
			<Card.Content>
				<ToggleGroup
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
			</Card.Content>
		</Card>
	);
};
