import { Spreader } from "components/atoms/Spreader";
import { Check } from "lucide-react";
import { FC, forwardRef, Fragment, HTMLProps, ReactNode } from "react";
import { Text } from "ui";

import { Container, Input, Marker } from "./Checkbox.styles";

interface CheckboxProps extends Pick<HTMLProps<HTMLInputElement>, "onChange" | "id" | "name"> {
	label: string | ReactNode;
}

const Label: FC<{ children: ReactNode }> = ({ children }) => <Text>{children}</Text>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ id, name, label, onChange }, ref) => {
		const isLabelString = typeof label === "string";

		return (
			<Container htmlFor={id}>
				<Input
					type="checkbox"
					id={id}
					name={name}
					onChange={onChange}
					ref={ref}
				/>

				<Marker>
					<Check />
				</Marker>

				{isLabelString ? (
					<Fragment>
						<Spreader $spread="0.25" />

						<Label>{label}</Label>
					</Fragment>
				) : (
					label
				)}
			</Container>
		);
	},
);

Checkbox.displayName = "Checkbox";
