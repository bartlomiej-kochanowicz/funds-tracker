import { Box, Button, Spacer, Spreader, Text } from "components/atoms";
import { Plus } from "lucide-react";

interface EmptyListProps {
	handleAppend: () => void;
	i18n: {
		title: string;
		button: string;
	};
}

export const EmptyList = ({ handleAppend, i18n }: EmptyListProps) => (
	<Box
		$flex
		$flexDirection="column"
		$alignItems="center"
	>
		<Text
			$textAlign="center"
			$fontWeight="700"
		>
			{i18n.title}
		</Text>

		<Spacer $space="0.25" />

		<Button
			$color="secondary"
			onClick={handleAppend}
		>
			{i18n.button}

			<Spreader $spread="0.25" />

			<Plus />
		</Button>
	</Box>
);

EmptyList.displayName = "CreateCashAccountsEmptyList";
