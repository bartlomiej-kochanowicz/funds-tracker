import { Button, Card, H1, toast } from "@funds-tracker/ui";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-2">
			<H1>{t("navigation.home")}</H1>
			<div className="flex gap-2">
				<Card className="grow">
					<Card.Header>Test</Card.Header>
					<Card.Content>
						<Button onClick={() => toast("Event has been created.")}>emit toast</Button>
						<br />
						<br />
						<br />
						<br />
					</Card.Content>
				</Card>
				<Card className="grow" />
			</div>
			<Card>
				<br />
				<br />
			</Card>
			<Card>
				<br />
				<br />
				<br />
			</Card>
			<Card>
				<br />
				<br />
			</Card>
			<Card>
				<br />
				<br />
				<br />
			</Card>
			<Card>
				<br />
				<br />
				<br />
				<br />
			</Card>
			<Card>
				<br />
				<br />
				<br />
				<br />
			</Card>
		</div>
	);
};
