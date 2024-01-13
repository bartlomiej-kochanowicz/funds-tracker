import { ReactNode, useRef } from "react";
import { useDialog } from "react-aria";

import { H3 } from "../Heading";

export interface DialogProps {
	children: ReactNode;
	title: string;
}

export const Dialog = (props: DialogProps) => {
	const dialogRef = useRef(null);

	const { title, children } = props;

	const { dialogProps, titleProps } = useDialog({ ...props, role: "alertdialog" }, dialogRef);

	return (
		<div
			{...dialogProps}
			ref={dialogRef}
			className="outline-none"
		>
			{title && <H3 {...titleProps}>{title}</H3>}

			<hr className="mb-4" />

			{children}
		</div>
	);
};
