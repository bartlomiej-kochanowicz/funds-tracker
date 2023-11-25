import { Select } from "components/atoms";
import instruments from "constants/selectors/instruments";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useSelect } from "hooks/useSelect";
import { InvestFundsFormValues } from "components/dialogs/InvestFunds/helpers/defaultValues";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

interface SelectInstrumentTypeProps {}

export const SelectInstrumentType: FC<SelectInstrumentTypeProps> = () => {
	const isPhone = useBreakpoint("phone", "max");

	const { t } = useTranslation();

	const {
		register,
		formState: { errors },
	} = useFormContext<InvestFundsFormValues>();

	const instrumentTypeSelectProps = useSelect<InvestFundsFormValues>({
		register,
		name: "instrumentType",
		errors,
	});

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.instrumentType")}
			htmlFor="instrumentType"
		>
			<Select
				items={instruments}
				placeholder={t("modal.InvestFunds.form.select.portfolio.instrumentType.placeholder")}
				flexGrow={1}
				width={isPhone ? "100%" : "auto"}
				{...instrumentTypeSelectProps}
			/>
		</FormField>
	);
};
