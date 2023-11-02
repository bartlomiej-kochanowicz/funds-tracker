import clsx from "clsx";
import { Spacer } from "components/atoms";
import { Profile } from "components/molecules";
import { debounce } from "helpers/debounce";
import { FC, Fragment, lazy, useCallback, useEffect, useState } from "react";

import { SettingsDropdown } from "./components/SettingsDropdown";

const LogoNameHorizontal = lazy(() =>
	import("assets/logo/logo-name-horizontal.svg").then(({ ReactComponent: component }) => ({
		default: component,
	})),
);

const LogoNameHorizontalDark = lazy(() =>
	import("assets/logo/logo-name-horizontal-dark.svg").then(({ ReactComponent: component }) => ({
		default: component,
	})),
);

interface MobileTopbarProps {
	isDashboard: boolean;
}

export const MobileTopbar: FC<MobileTopbarProps> = ({ isDashboard }) => {
	const isDark = false;

	const [visible, setVisible] = useState(window.pageYOffset !== 0);

	const onScroll = debounce(
		useCallback(() => {
			const currentScrollPos = window.pageYOffset;

			if (currentScrollPos > 0) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		}, []),
		100,
	);

	useEffect(() => {
		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [onScroll]);

	return (
		<div
			className={
				(clsx(
					"fixed left-0 right-0 top-0 z-[1] flex items-center bg-gray-100 px-4 py-2 dark:bg-gray-900",
					isDashboard ? "justify-center" : "justify-between",
				),
				visible ? "border border-gray-300" : undefined)
			}
		>
			{isDashboard && (
				<div className="flex flex-col">
					<Spacer $space="0.25" />
					{isDark && <LogoNameHorizontal height="18px" />}

					{!isDark && <LogoNameHorizontalDark height="18px" />}
					<Spacer $space="0.25" />
				</div>
			)}

			{!isDashboard && (
				<Fragment>
					<SettingsDropdown />

					<Profile />
				</Fragment>
			)}
		</div>
	);
};

MobileTopbar.displayName = "MobileTopbar";
