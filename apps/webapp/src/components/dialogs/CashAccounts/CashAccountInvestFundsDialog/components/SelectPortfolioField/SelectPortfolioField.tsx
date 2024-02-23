import { GetPortfoliosQuery } from "__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Form, Select } from "@funds-tracker/ui";
import { GET_PORTFOLIOS } from "graphql/query/portfolios/GetPortfolios";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const SelectPortfolioField = () => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { data } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

	const { t } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="portfolio"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
						{t("modal.InvestFunds.form.label.portfolio")}
					</Form.Label>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value || undefined}
					>
						<Form.Control>
							<Select.Trigger className="w-full grow md:w-fit md:max-w-[350px] lg:max-w-[446px] [&>span]:truncate">
								<Select.Value
									placeholder={t("modal.InvestFunds.form.select.portfolio.placeholder")}
								/>
							</Select.Trigger>
						</Form.Control>
						<Select.Content>
							{data?.portfolios.map(({ uuid, name }) => (
								<Select.Item
									key={uuid}
									value={uuid}
								>
									{name}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</Form.Item>
			)}
		/>
	);
};
