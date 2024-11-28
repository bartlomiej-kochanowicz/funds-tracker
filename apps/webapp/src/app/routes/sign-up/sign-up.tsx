import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@funds-tracker/ui";
import { paths } from "config/paths";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();

	return (
		<Dialog
			open
			onOpenChange={() => {
				navigate(paths.homepage);
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
