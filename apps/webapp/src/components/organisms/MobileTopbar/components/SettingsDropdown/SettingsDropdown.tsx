import { Dropdown } from "components/atoms";
import { DropdownItems } from "components/atoms/Dropdown";
import { Settings } from "lucide-react";
import { FC } from "react";

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
		<Dropdown
			items={items}
			placement="bottom-end"
		>
			<Settings />
		</Dropdown>
	);
};

SettingsDropdown.displayName = "SettingsDropdown";
