import { useState } from "react";

import {
	ConfirmDeleteCashAccount,
	type ConfirmDeleteCashAccountProps,
} from "./ConfirmDeleteCashAccountDialog";

export const useConfirmDeleteCashAccountDialog = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	return {
		open: handleOpen,
		dialog: (props: Omit<ConfirmDeleteCashAccountProps, "open" | "setOpen">) => (
			<ConfirmDeleteCashAccount
				open={open}
				setOpen={setOpen}
				{...props}
			/>
		),
	};
};
