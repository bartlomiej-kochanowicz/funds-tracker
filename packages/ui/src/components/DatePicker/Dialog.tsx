import { type ReactNode, useRef } from "react";
import { type AriaDialogProps, useDialog } from "react-aria";

interface DialogProps extends AriaDialogProps {
	title?: string;
	children?: ReactNode;
}

export const Dialog = ({ title, children, ...props }: DialogProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { dialogProps } = useDialog(props, ref);

	return (
		<div
			{...dialogProps}
			ref={ref}
		>
			{children}
		</div>
	);
};
