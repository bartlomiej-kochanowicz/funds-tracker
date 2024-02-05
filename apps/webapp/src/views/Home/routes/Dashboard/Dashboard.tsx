import {
	Button,
	Card,
	CheckCircleAnimated,
	emitErrorToast,
	emitSuccessToast,
	H1,
} from "@funds-tracker/ui";
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
						<Button onClick={() => emitSuccessToast("Success event has been created.")}>
							emit success toast
						</Button>
						<br />
						<br />
						<Button onClick={() => emitErrorToast("Error event has been created.")}>
							emit error toast
						</Button>
						<br />
						<br />
						<CheckCircleAnimated />
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
