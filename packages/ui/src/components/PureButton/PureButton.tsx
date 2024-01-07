import { forwardRef, ReactNode, useRef } from "react";
import { useButton } from "react-aria";

import { mergeRefs } from "../../helpers/mergeRefs";

interface PureButtonProps {
	children?: ReactNode;
	className?: string;
}

export const PureButton = forwardRef<HTMLButtonElement, PureButtonProps>(
	({ children, className, ...rest }, propsRef) => {
		const ref = useRef<HTMLButtonElement>(null);

		const { buttonProps } = useButton(rest, ref);

		return (
			<button
				type="button"
				className={className}
				{...buttonProps}
				ref={mergeRefs([ref, propsRef])}
			>
				{children}
			</button>
		);
	},
);
