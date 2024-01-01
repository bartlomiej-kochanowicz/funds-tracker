import { LogoutMutation } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Avatar, Button, Menu, Text } from "@faunds-tracker/ui";
import { useUserContext } from "contexts/UserContext";
import { LOGOUT } from "graphql/mutations/authentication/Logout";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

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

	/* return (
		<Dropdown
			items={items}
			placement="bottom-end"
			triggerOffset={0}
		>
		display: flex;
	align-items: center;
	background-color: transparent;
	border: none;
	cursor: pointer;
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
	); */

	return (
		<Menu
			onAction={a => {
				console.log(a);
			}}
			placement="bottom right"
			// eslint-disable-next-line react/no-unstable-nested-components
			triggerElement={(props, ref, isOpen) => (
				<Button
					noAnimation
					color="transparent"
					className="flex items-center !px-0 !py-0"
					{...props}
					ref={ref}
				>
					{withName && (
						<Fragment>
							<Avatar name={user.name} />

							<Text className="ml-1 max-w-[250px] font-bold">
								{t("common.hi")}, {user.name}!
							</Text>
						</Fragment>
					)}

					{!withName && (
						<Avatar
							name={user.name}
							className="mr-2"
						/>
					)}

					{isOpen ? <ChevronUp /> : <ChevronDown />}
				</Button>
			)}
		>
			<Menu.Section>
				<Menu.Item key="sign-out">{t("common.sign_out")}</Menu.Item>
			</Menu.Section>
		</Menu>
	);
};
