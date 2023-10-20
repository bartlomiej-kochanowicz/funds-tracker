import { Datepicker } from "components/atoms";
import { useDatepicker } from "hooks/useDatepicker";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

export const DateField = () => {
	const { t } = useTranslation();

	const { control, setValue } = useFormContext();

	const datepickerProps = useDatepicker({
		control,
		name: "date",
		setValue,
	});

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.purchase_date")}
			htmlFor="date"
		>
			<Datepicker
				{...datepickerProps}
				maxDate={new Date()}
			/>
		</FormField>
	);
};
