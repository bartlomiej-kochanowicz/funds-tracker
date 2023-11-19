import { useMemo } from "react";

import { Initials } from "../../../helpers/Initials";
import { Text } from "../Text";

interface AvatarProps {
	name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
	const initials = useMemo(() => new Initials(name), [name]);

	return (
		<div className="my-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700">
			<Text className="text-lg font-bold text-white">{initials.getInitials()}</Text>
		</div>
	);
};
