import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { AriaLinkOptions, useLink } from "react-aria";

interface LinkProps extends AriaLinkOptions {
	children?: ReactNode;
	className?: string;
}

export const Link = (props: LinkProps) => {
	const ref = useRef<HTMLAnchorElement>(null);
	const { linkProps } = useLink(props, ref);

	const { children, className } = props;

	return (
		<a
			{...linkProps}
			ref={ref}
			className={clsx(className, "text-blue-500 hover:underline")}
		>
			{children}
		</a>
	);
};
