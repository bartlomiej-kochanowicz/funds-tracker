import { Heading, Spacer } from "components/atoms";
import { ClearCentered } from "layouts/ClearCentered";
import { FC } from "react";
import { Text } from "ui";

export const NotFound: FC = () => (
	<ClearCentered>
		<Heading $textAlign="center">404</Heading>

		<Spacer $space="0.25" />

		<Text className="text-center  text-gray-400">Page not found</Text>
	</ClearCentered>
);
