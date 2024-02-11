import { createElement, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Heading = Object.fromEntries(
	new Map(
		(
			[
				["h1", "text-5xl font-extrabold"],
				["h2", "text-4xl font-bold"],
				["h3", "text-3xl font-bold"],
				["h4", "text-2xl font-bold"],
				["h5", "text-xl font-bold"],
				["h6", "text-lg font-bold"],
			] as const
		).map(([level, className]) => [
			level.toUpperCase(),
			({ className: topClassName, ...rest }: HTMLAttributes<HTMLHeadingElement>) =>
				createElement(level, {
					className: twMerge("text-gray-900 dark:text-white", className, topClassName),
					...rest,
				}),
		]),
	),
) as unknown as Record<
	"H1" | "H2" | "H3" | "H4" | "H5" | "H6",
	(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element
>;
