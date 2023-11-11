import { useMemo } from "react";
import { Text } from "src/components/atoms/Text";
import { Initials } from "src/helpers/Initials";

interface AvatarProps {
	name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
	const initials = useMemo(() => new Initials(name), [name]);

	return (
		<div className="my-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
			<Text className="text-xl text-white">{initials.getInitials()}</Text>
		</div>
	);
};
