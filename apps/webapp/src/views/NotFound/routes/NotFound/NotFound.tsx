import { Text } from "@faunds-tracker/ui";
import { Heading, Spacer } from "components/atoms";
import { ClearCentered } from "components/layouts/ClearCentered";
import { FC } from "react";

export const NotFound: FC = () => (
	<ClearCentered>
		<Heading $textAlign="center">404</Heading>

		<Spacer $space="0.25" />

		<Text className="text-center  text-gray-400">Page not found</Text>
	</ClearCentered>
);
