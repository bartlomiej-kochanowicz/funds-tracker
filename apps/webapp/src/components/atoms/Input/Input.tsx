import { Currency } from "__generated__/graphql";
import { CalendarDays, Search } from "lucide-react";
import { forwardRef, HTMLProps, ReactNode } from "react";
import CurrencyInputComponent, {
	CurrencyInputProps as CurrencyInputFieldProps,
} from "react-currency-input-field";
import { useTranslation } from "react-i18next";
import { Text } from "ui";

import { Error, StyledInput, Unit, Wrapper } from "./Input.styles";

interface InputCommonProps {
	error?: string;
	unit?: ReactNode;
	$width?: "auto" | "fit-content" | `${number}px` | `${number}%`;
	$flexGrow?: number;
	label?: string | ReactNode;
	defaultValue?: string | number;
}

export interface DefaultInputProps
	extends InputCommonProps,
		Pick<
			HTMLProps<HTMLInputElement>,
			| "onChange"
			| "onBlur"
			| "id"
			| "name"
			| "placeholder"
			| "min"
			| "max"
			| "disabled"
			| "autoFocus"
		> {
	type?: "text" | "number" | "password" | "email" | "date";
}

export interface CurrencyInputProps
	extends InputCommonProps,
		Omit<CurrencyInputFieldProps, "width"> {
	type?: "currency";
	currency: Currency;
	unit?: undefined;
}

export interface SearchInputProps extends InputCommonProps, Omit<CurrencyInputFieldProps, "width"> {
	type?: "search";
	currency?: undefined;
}

export type InputProps = DefaultInputProps | CurrencyInputProps | SearchInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, unit, $width = "auto", $flexGrow, label, type, ...rest }, ref) => {
		const { i18n } = useTranslation();

		if (type === "currency") {
			const { currency, ...currencyTypeRest } = rest as CurrencyInputProps;

			return (
				<Wrapper
					$width={$width}
					$flexGrow={$flexGrow}
				>
					{label && <Text className="text-sm text-gray-600">{label}</Text>}

					<CurrencyInputComponent
						intlConfig={{ locale: i18n.language, currency }}
						customInput={Input}
						ref={ref}
						{...currencyTypeRest}
					/>

					{error && <Error role="alert">{error}</Error>}

					{unit && <Unit>{unit}</Unit>}
				</Wrapper>
			);
		}

		const hasIcon = type === "search" || type === "date";
		const hasUnit = Boolean(unit);
		const hasError = Boolean(error);

		const inputType = () => {
			switch (type) {
				case "search":
				case "date":
					return undefined;
				default:
					return type;
			}
		};

		return (
			<Wrapper
				$width={$width}
				$flexGrow={$flexGrow}
			>
				{label && <Text className="text-sm text-gray-600">{label}</Text>}

				{hasIcon && type === "search" && <Search />}
				{hasIcon && type === "date" && <CalendarDays />}

				<StyledInput
					$error={hasError}
					aria-invalid={hasError}
					ref={ref}
					$hasUnit={hasUnit}
					$hasIcon={hasIcon}
					type={inputType()}
					{...rest}
				/>

				{error && <Error role="alert">{error}</Error>}

				{unit && <Unit>{unit}</Unit>}
			</Wrapper>
		);
	},
);

Input.displayName = "Input";
