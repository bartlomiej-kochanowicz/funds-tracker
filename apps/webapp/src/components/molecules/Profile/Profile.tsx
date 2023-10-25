import { LogoutMutation } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Dropdown, Spreader } from "components/atoms";
import type { DropdownItems } from "components/atoms/Dropdown";
import { useUserContext } from "contexts/UserContext";
import { LOGOUT } from "graphql/mutations/authentication/Logout";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text } from "ui";

import { ProfileContainer } from "./Profile.styles";

interface ProfileProps {
	withName?: boolean;
}

export const Profile: FC<ProfileProps> = ({ withName = false }) => {
	const { user } = useUserContext();

	const { t } = useTranslation();

	const { clearUser: onCompleted } = useUserContext();

	const [logout] = useMutation<LogoutMutation>(LOGOUT, {
		onCompleted,
	});

	const handleSignOut = async () => {
		await logout();
	};

	const items = [
		{
			value: "sign-out",
			icon: LogOut,
			label: t("common.sign_out"),
			onClick: handleSignOut,
			divider: "top",
		},
	] satisfies DropdownItems;

	return (
		<Dropdown
			items={items}
			placement="bottom-end"
			triggerOffset={0}
		>
			{({ isOpen, ...rest }) => (
				<ProfileContainer {...rest}>
					{withName && (
						<Fragment>
							<Avatar name={user.name} />

							<Spreader $spread="0.25" />

							<Text className="max-w-[250px] font-bold">
								{t("common.hi")}, {user.name}!
							</Text>
						</Fragment>
					)}

					{!withName && <Avatar name={user.name} />}

					<Spreader $spread="0.5" />

					{isOpen ? <ChevronUp /> : <ChevronDown />}
				</ProfileContainer>
			)}
		</Dropdown>
	);
};
