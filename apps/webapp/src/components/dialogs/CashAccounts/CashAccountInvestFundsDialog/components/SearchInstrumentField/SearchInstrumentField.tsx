/* import { InstrumentType } from "__generated__/graphql";
import { InvestFundsFormValues } from "components/modals/InvestFunds/helpers/defaultValues";
import { SearchInstrumentCombobox } from "components/molecules";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useRegisterCombobox } from "hooks/useRegisterCombobox";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

export const SearchInstrumentField = () => {
	const { t } = useTranslation();

	const { control, watch } = useFormContext<InvestFundsFormValues>();

	const searchInstrumentCombobox = useRegisterCombobox<InvestFundsFormValues>({
		control,
		name: "instrument",
	});

	const watchInstrumentType = watch("instrumentType");

	const isPhone = useBreakpoint("phone", "max");

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.instrument")}
			htmlFor="instrument"
		>
			<SearchInstrumentCombobox
				{...searchInstrumentCombobox}
				instrumentType={watchInstrumentType as unknown as InstrumentType}
				id="instrument"
				placeholder={t(`input.search_instrument.placeholder.${watchInstrumentType}`)}
				$flexGrow={1}
				$width={isPhone ? "100%" : "auto"}
			/>
		</FormField>
	);
};
 */

export const SearchInstrumentField = () => {
	return <div>search instrument field</div>;
};
