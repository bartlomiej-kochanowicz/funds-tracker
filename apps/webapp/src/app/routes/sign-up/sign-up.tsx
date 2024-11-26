import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@funds-tracker/ui";
import { useNavigate } from "react-router";

const SignUp = () => {
	const navigate = useNavigate();

	return (
		<Dialog
			open
			onOpenChange={() => {
				navigate(-1);
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>SignUp modal</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { SignUp };
