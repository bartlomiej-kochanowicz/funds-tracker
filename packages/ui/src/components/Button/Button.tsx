import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, ReactNode, useRef } from "react";
import { AriaButtonProps, FocusRing, useButton } from "react-aria";

import { mergeRefs } from "../../helpers/mergeRefs";
import { Loader } from "../Loader";

const sizes = {
	xs: "px-4 py-2 text-xs",
	sm: "px-4 py-2 text-sm",
	md: "px-6 py-2.5 text-sm",
	lg: "px-6 py-3 text-base",
	xl: "px-7 py-3.5 text-base",
};

const colors = {
	blue: "bg-blue-500 text-white enabled:hover:bg-blue-600",
	black: "bg-zinc-950 text-white enabled:hover:bg-zinc-800",
	gray: "bg-neutral-500 text-white enabled:hover:bg-neutral-600",
	transparent: "bg-transparent text-gray-900 dark:text-white",
};

interface ButtonProps extends AriaButtonProps {
	children?: ReactNode;
	className?: string;
	size?: keyof typeof sizes;
	color?: keyof typeof colors;
	isLoading?: boolean;
	hasIcon?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, size = "md", color = "blue", isLoading, hasIcon, ...rest }, propsRef) => {
		const ref = useRef<HTMLButtonElement>(null);

		const { buttonProps } = useButton(rest, ref);

		return (
			<FocusRing focusRingClass="ring-4 ring-blue-300 dark:ring-blue-800">
				<motion.button
					{...(buttonProps as HTMLMotionProps<"button">)}
					style={{
						WebkitTapHighlightColor: "transparent",
					}}
					className={clsx(
						"transform touch-none select-none rounded-xl transition-transform focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						sizes[size],
						colors[color],
						isLoading && "pointer-events-none flex items-center justify-center",
						hasIcon && "flex items-center gap-2",
						className,
					)}
					ref={mergeRefs([ref, propsRef])}
				>
					{!isLoading && children}
					{isLoading && (
						<Loader
							size="sm"
							className="dark:text-gray-200"
							data-testid="button-loader"
						/>
					)}
				</motion.button>
			</FocusRing>
		);
	},
);
