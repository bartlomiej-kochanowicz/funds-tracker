import { LogoutMutation } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Avatar, Menu, PureButton } from "@faunds-tracker/ui";
import { useUserContext } from "contexts/UserContext";
import { LOGOUT } from "graphql/mutations/authentication/Logout";
import { LogOut, Settings } from "lucide-react";
import { Key } from "react-aria";
import { useTranslation } from "react-i18next";

export const Profile = () => {
	const { user } = useUserContext();

	const { t } = useTranslation();

	const { clearUser: onCompleted } = useUserContext();

	const [logout] = useMutation<LogoutMutation>(LOGOUT, {
		onCompleted,
	});

	const handleAction = async (key: Key) => {
		switch (key) {
			case "sign-out":
				await logout();

				break;
			default:
				break;
		}
	};

	return (
		<Menu
			onAction={handleAction}
			placement="bottom right"
			// eslint-disable-next-line react/no-unstable-nested-components
			triggerElement={(props, ref) => (
				<PureButton
					className="flex items-center rounded-full outline-none ring-blue-300 focus:ring-4 dark:ring-blue-800"
					{...props}
					ref={ref}
				>
					<Avatar name={user.name} />
				</PureButton>
			)}
		>
			<Menu.Section>
				<Menu.Item
					key="settings"
					textValue={t("common.settings")}
				>
					<div className="flex items-center gap-2">
						<Settings className="h-4 w-4" />

						{t("common.settings")}
					</div>
				</Menu.Item>
				<Menu.Item
					key="sign-out"
					textValue={t("common.sign_out")}
				>
					<div className="flex items-center gap-2">
						<LogOut className="h-4 w-4" />

						{t("common.sign_out")}
					</div>
				</Menu.Item>
			</Menu.Section>
		</Menu>
	);
};
