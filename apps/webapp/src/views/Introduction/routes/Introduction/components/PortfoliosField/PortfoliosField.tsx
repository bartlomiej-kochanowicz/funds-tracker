import { IntroductionCreatePortfoliosInput } from "__generated__/graphql";
import { Input, Spreader } from "components/atoms";
import { Trash2 } from "lucide-react";
import {
	DeepRequired,
	FieldErrorsImpl,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

interface PortfoliosFieldProps {
	register: UseFormRegister<IntroductionCreatePortfoliosInput>;
	errors: FieldErrorsImpl<DeepRequired<IntroductionCreatePortfoliosInput>>;
	index: number;
	remove: UseFieldArrayRemove;
}

export const PortfoliosField = ({ register, errors, index, remove }: PortfoliosFieldProps) => {
	const { t } = useTranslation();

	const handleRemoveField = () => remove(index);

	return (
		<div className="flex">
			<Input
				placeholder={t("add.portfolios.input.placeholder")}
				$flexGrow={1}
				{...register(`portfolios.${index}.name`)}
				error={errors.portfolios?.[index]?.name?.message}
			/>

			<Spreader $spread="0.25" />

			<Button
				className="shadow-none"
				color="black"
				onClick={handleRemoveField}
			>
				<Trash2 />
			</Button>
		</div>
	);
};
