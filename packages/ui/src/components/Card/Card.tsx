import { forwardRef, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={twMerge(
				"rounded-lg border bg-card text-card-foreground shadow-s [&_.card-content]:has-[#card-footer]:pb-0 [&_.card-content]:has-[#card-header]:pt-0",
				className,
			)}
			{...props}
		/>
	),
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			id="card-header"
			className={twMerge("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, children, ...props }, ref) => (
		<h2
			ref={ref}
			className={twMerge("text-2xl font-semibold tracking-tight truncate", className)}
			{...props}
		>
			{children}
		</h2>
	),
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={twMerge("text-sm text-muted-foreground", className)}
			{...props}
		/>
	),
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={twMerge("p-4 md:p-6 card-content", className)}
			{...props}
		/>
	),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			id="card-footer"
			className={twMerge("flex items-center p-6 pt-0", className)}
			{...props}
		/>
	),
);
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
