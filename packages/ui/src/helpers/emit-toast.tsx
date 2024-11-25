import { toast } from "sonner";

import { CheckCircleAnimated } from "../icons/CheckCircleAnimated";
import { XCircleanimated } from "../icons/XCircleAnimated";

const emitSuccessToast = (message: string) => {
	toast(
		<div className="flex w-full items-center justify-between">
			<span>{message}</span>

			<CheckCircleAnimated className="text-primary" />
		</div>,
	);
};

const emitErrorToast = (message: string) => {
	toast(
		<div className="flex w-full items-center justify-between">
			<span>{message}</span>

			<XCircleanimated className="text-destructive" />
		</div>,
	);
};

export { emitErrorToast, emitSuccessToast };
