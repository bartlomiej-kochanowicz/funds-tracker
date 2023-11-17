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
			className={clsx(
				className,
				"rounded-md text-blue-500 outline-none ring-blue-300 transition duration-150 ease-in-out hover:underline focus:ring",
			)}
		>
			{children}
		</a>
	);
};
