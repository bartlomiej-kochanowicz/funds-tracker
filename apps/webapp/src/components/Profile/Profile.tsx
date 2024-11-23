import { Avatar, DropdownMenu, Loader } from "@funds-tracker/ui";
import { useUserContext } from "contexts/UserContext";
import { useMutationUserLogout } from "graphql/user/useMutationUserLogout";
import { LogOut, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

export const Profile = () => {
	const { user } = useUserContext();

	const { t } = useTranslation();

	const { clearUser: onCompleted } = useUserContext();

	const [logout, { loading }] = useMutationUserLogout({
		onCompleted,
	});

	const handleLogOut = async () => {
		await logout();
	};

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger>
				<Avatar>
					<Avatar.Fallback>{user.name}</Avatar.Fallback>
				</Avatar>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>{t("common.my.account")}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item asChild>
						<Link to={ROUTES.SETTINGS}>
							<Settings className="mr-2 size-4" />
							<span>{t("common.settings")}</span>
						</Link>
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onClick={handleLogOut}
						disabled={loading}
					>
						{loading ? <Loader className="mr-2" /> : <LogOut className="mr-2 size-4" />}

						<span>{t("common.log_out")}</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
