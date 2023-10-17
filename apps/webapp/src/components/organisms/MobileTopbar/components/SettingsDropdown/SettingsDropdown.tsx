import { Dropdown, Icon } from "components/atoms";
import { DropdownItems } from "components/atoms/Dropdown";
import { FC } from "react";
import { FaCog } from "react-icons/fa";

import { ApperienceSwitcher } from "../ApperienceSwitcher";

export const SettingsDropdown: FC = () => {
	const items = [
		{ value: "test", label: "test", onClick: () => {} },
		{ value: "test2", label: "test2", to: "/test2", divider: "bottom" },
		{
			value: "apperience",
			label: ApperienceSwitcher,
		},
	] satisfies DropdownItems;

	return (
		<Dropdown items={items} placement="bottom-end">
			<Icon icon={FaCog} $size="1.5" $color="gray400" />
		</Dropdown>
	);
};

SettingsDropdown.displayName = "SettingsDropdown";
