import { GetPortfoliosQuery } from "__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Select } from "components/atoms";
import { GET_PORTFOLIOS } from "graphql/query/portfolios/GetPortfolios";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useSelect } from "hooks/useSelect";
import { InvestFundsFormValues } from "components/dialogs/InvestFunds/helpers/defaultValues";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

export const SelectPortfolioField = () => {
	const { t } = useTranslation();

	const { data: portfolios } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

	const selectPortfolioItems = useMemo(
		() =>
			portfolios?.portfolios.map(portfolio => ({
				label: portfolio.name,
				value: portfolio.uuid,
			})) || [],
		[portfolios],
	);

	const isPhone = useBreakpoint("phone", "max");

	const {
		register,
		formState: { errors },
	} = useFormContext<InvestFundsFormValues>();

	const portfolioSelectProps = useSelect<InvestFundsFormValues>({
		register,
		name: "portfolio",
		errors,
	});

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.portfolio")}
			htmlFor="portfolio"
		>
			<Select
				items={selectPortfolioItems}
				placeholder={t("modal.InvestFunds.form.select.portfolio.placeholder")}
				flexGrow={1}
				width={isPhone ? "100%" : "auto"}
				{...portfolioSelectProps}
			/>
		</FormField>
	);
};
