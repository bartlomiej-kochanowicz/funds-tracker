import clsx from "clsx";
import { debounce } from "helpers/debounce";
import { useMatches } from "hooks/useMatches";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { Profile } from "../Profile";
import { BackButton } from "./Topbar.styles";

const withBackButton = [ROUTES.PORTFOLIOS.PORTFOLIO];

export const Topbar = () => {
	const { t } = useTranslation();

	const [visible, setVisible] = useState(window.pageYOffset !== 0);

	const renderBackButton = useMatches(withBackButton);

	const navigate = useNavigate();

	const handleBackToPreviousPage = () => navigate(-1);

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
			className={clsx(
				"fixed left-0 right-0 top-0 z-10 flex items-center px-14 py-1",
				renderBackButton ? "justify-between" : "justify-end",
				renderBackButton && " pb-[230px] pl-1 pr-14 pt-1",
				visible && "border-b border-gray-200",
			)}
		>
			{renderBackButton ? (
				<BackButton onClick={handleBackToPreviousPage}>
					<ChevronLeft className="mr-0.5" />

					{t("common.back")}
				</BackButton>
			) : null}

			<Profile withName />
		</div>
	);
};
