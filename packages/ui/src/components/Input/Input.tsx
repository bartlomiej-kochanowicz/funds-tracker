import clsx from "clsx";
import { forwardRef } from "react";

import { Label } from "../Label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	htmlFor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, htmlFor, ...props }, ref) => {
		const element = (
			<input
				type={type}
				className={clsx(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);

		if (label) {
			return (
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor={htmlFor}>{label}</Label>
					{element}
				</div>
			);
		}

		return element;
	},
);

Input.displayName = "Input";

export { Input };
