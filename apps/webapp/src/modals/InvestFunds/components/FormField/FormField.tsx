import { Spreader, Text } from "components/atoms";
import { FC, ReactNode } from "react";

interface IFormFieldProps {
	children: ReactNode;
	label: string;
	htmlFor: string;
}

export const FormField: FC<IFormFieldProps> = ({ children, label, htmlFor }) => (
	<div className="flex flex-col md:flex-row md:items-center">
		<Text
			as="label"
			$fontWeight="700"
			$width="150px"
			htmlFor={htmlFor}
		>
			{label}:
		</Text>

		<Spreader $spread="0.25" />

		{children}
	</div>
);
