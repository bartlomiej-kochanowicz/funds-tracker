import { H1, Panel } from "@faunds-tracker/ui";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-2">
			<H1>{t("navigation.home")}</H1>
			<div className="flex gap-2">
				<Panel className="grow">
					<br />
					<br />
					<br />
					<br />
				</Panel>
				<Panel className="grow" />
			</div>
			<Panel>
				<br />
				<br />
			</Panel>
			<Panel>
				<br />
				<br />
				<br />
			</Panel>
			<Panel>
				<br />
				<br />
			</Panel>
			<Panel>
				<br />
				<br />
				<br />
			</Panel>
			<Panel>
				<br />
				<br />
				<br />
				<br />
			</Panel>
			<Panel>
				<br />
				<br />
				<br />
				<br />
			</Panel>
		</div>
	);
};
