import clsx from "clsx";
import { useMemo } from "react";

import { Initials } from "../../helpers/Initials";
import { Text } from "../Text";

interface AvatarProps {
	name: string;
	className?: string;
}

export const Avatar = ({ name, className }: AvatarProps) => {
	const initials = useMemo(() => new Initials(name), [name]);

	return (
		<div
			className={clsx(
				className,
				"flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700",
			)}
		>
			<Text className="text-lg font-bold text-white">{initials.getInitials()}</Text>
		</div>
	);
};
