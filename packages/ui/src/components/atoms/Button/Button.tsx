import clsx from "clsx";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { FocusRing, PressEvent, useButton } from "react-aria";

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

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
	children?: ReactNode;
	size?: keyof typeof sizes;
	color?: keyof typeof colors;
}

export const Button = ({
	children,
	onClick,
	className,
	size = "base",
	color = "blue",
	disabled,
	...rest
}: ButtonProps) => {
	const controls = useAnimation();
	const ref = useRef<Element>(null);

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
			onPress: onClick as unknown as (e: PressEvent) => void | undefined,
			isDisabled: disabled,
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
					"transform touch-none select-none rounded-xl transition-transform focus:outline-none enabled:active:scale-99 disabled:cursor-not-allowed",
					sizes[size],
					colors[color].button,
					className,
				)}
				ref={ref}
			>
				{children}
			</motion.button>
		</FocusRing>
	);
};
