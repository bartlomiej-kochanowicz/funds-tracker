import { Heading, Spacer } from "components/atoms";
import { FullscreenClear } from "layouts/FullscreenClear";
import { FC } from "react";
import { Text } from "ui";

export const NotFound: FC = () => (
	<FullscreenClear>
		<Heading $textAlign="center">404</Heading>

		<Spacer $space="0.25" />

		<Text className="text-center  text-gray-400">Page not found</Text>
	</FullscreenClear>
);
