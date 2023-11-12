import clsx from "clsx";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { forwardRef, ReactNode, useRef } from "react";
import { AriaButtonProps, FocusRing, useButton } from "react-aria";

import { mergeRefs } from "../../../helpers/mergeRefs";

const sizes = {
	xSmall: "px-4 py-2 text-xs",
	small: "px-4 py-2 text-sm",
	base: "px-6 py-2.5 text-sm",
	large: "px-6 py-3 text-base",
	xLarge: "px-7 py-3.5 text-base",
};

const colors = {
	blue: {
		button: "bg-blue-500 text-white enabled:hover:bg-blue-600  disabled:opacity-50",
		ring: "ring-blue-300",
	},
	black: {
		button: "bg-zinc-950 text-white enabled:hover:bg-zinc-800 disabled:opacity-50",
		ring: "ring-zinc-300",
	},
	gray: {
		button: "bg-neutral-500 text-white enabled:hover:bg-neutral-600 disabled:opacity-50",
		ring: "ring-neutral-300",
	},
};

interface ButtonProps extends AriaButtonProps {
	children?: ReactNode;
	className?: string;
	size?: keyof typeof sizes;
	color?: keyof typeof colors;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, size = "base", color = "blue", ...rest }, propsRef) => {
		const controls = useAnimation();
		const ref = useRef<HTMLButtonElement>(null);

		const { buttonProps } = useButton(
			{
				onPressStart: () => {
					controls.stop();
				},
				onPressEnd: () => {
					controls.start({
						transition: { duration: 0.4 },
					});
				},
				...rest,
			},

			ref,
		);

		return (
			<FocusRing focusRingClass={clsx("ring", colors[color].ring)}>
				<motion.button
					{...(buttonProps as HTMLMotionProps<"button">)}
					animate={controls}
					style={{
						WebkitTapHighlightColor: "transparent",
					}}
					className={clsx(
						"transform touch-none select-none rounded-xl transition-transform focus:outline-none enabled:active:scale-97 disabled:cursor-not-allowed",
						sizes[size],
						colors[color].button,
						className,
					)}
					ref={mergeRefs([ref, propsRef])}
				>
					{children}
				</motion.button>
			</FocusRing>
		);
	},
);
