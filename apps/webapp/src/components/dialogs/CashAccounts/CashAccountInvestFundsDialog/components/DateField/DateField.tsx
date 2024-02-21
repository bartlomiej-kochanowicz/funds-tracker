/* import { DatePicker, useDatepicker } from "@funds-tracker/ui";
import { getLocalTimeZone, today } from "@internationalized/date";
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
			<DatePicker
				{...datepickerProps}
				maxValue={today(getLocalTimeZone())}
			/>
		</FormField>
	);
};
 */

export const DateField = () => {
	return null;
};
