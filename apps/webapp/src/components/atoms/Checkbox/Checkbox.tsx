import { Icon } from "components/atoms/Icon";
import { Spreader } from "components/atoms/Spreader";
import { Text } from "components/atoms/Text";
import { FC, forwardRef, Fragment, HTMLProps, ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

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
					<Icon icon={FaCheck} />
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
