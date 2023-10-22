import { Spacer, Spreader, Text } from "components/atoms";
import { Plus } from "lucide-react";
import { Button } from "ui";

interface EmptyListProps {
	handleAppend: () => void;
	i18n: {
		title: string;
		button: string;
	};
}

export const EmptyList = ({ handleAppend, i18n }: EmptyListProps) => (
	<div className="flex flex-col items-center">
		<Text
			$textAlign="center"
			$fontWeight="700"
		>
			{i18n.title}
		</Text>

		<Spacer $space="0.25" />

		<Button
			color="black"
			onClick={handleAppend}
		>
			{i18n.button}

			<Spreader $spread="0.25" />

			<Plus />
		</Button>
	</div>
);

EmptyList.displayName = "CreateCashAccountsEmptyList";
