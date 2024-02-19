import { FC, ReactNode } from "react";

interface IFormFieldProps {
	children: ReactNode;
	label: string;
	htmlFor: string;
}

export const FormField: FC<IFormFieldProps> = ({ children, label, htmlFor }) => (
	<div className="flex flex-col gap-1 md:flex-row md:items-center">
		<label
			className="w-[150px] font-bold text-gray-900 dark:text-white"
			htmlFor={htmlFor}
		>
			{label}:
		</label>

		{children}
	</div>
);
