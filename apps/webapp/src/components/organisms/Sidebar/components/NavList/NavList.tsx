import { NavListItem } from "components/organisms/Sidebar/components/NavListItem";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

import { List, ListItem, StyledNavLink } from "./NavList.styles";

interface NavListProps {
	navigation: { to: string; title: string; icon: ForwardRefExoticComponent<LucideProps> }[];
}

export const NavList = ({ navigation }: NavListProps) => (
	<nav>
		<List>
			{navigation.map(({ to, title, icon }) => (
				<ListItem key={title}>
					<StyledNavLink to={to}>
						{(props: { isActive: boolean }) => (
							<NavListItem
								title={title}
								icon={icon}
								{...props}
							/>
						)}
					</StyledNavLink>
				</ListItem>
			))}
		</List>
	</nav>
);
