import { Currency } from "__generated__/graphql";
import { Button, Command, Popover, ScrollArea } from "@funds-tracker/ui";
import clsx from "clsx";
import { currencyFlags } from "constants/currencyFlags";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface CurrencyComboboxProps {
	value: Currency;
	onChange: (value: Currency) => void;
	onBlur: () => void;
	defautValue?: Currency;
	disabled?: boolean;
}

export const CurrencyCombobox = forwardRef(
	({ value: valueFromProps, onChange, onBlur, defautValue, disabled }: CurrencyComboboxProps) => {
		const [open, setOpen] = useState(false);

		const { t } = useTranslation();

		const value = valueFromProps || defautValue;

		return (
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<Popover.Trigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
						onBlur={onBlur}
						disabled={disabled}
					>
						{value ? t(`currency.${value.toUpperCase()}`) : t("form.currency.select.placeholder")}
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content
					className="!p-0"
					align="start"
				>
					<Command>
						<Command.Input placeholder={t("form.currency.select.search.placeholder")} />
						<Command.Empty>{t("form.currency.select.search.empty")}</Command.Empty>
						<Command.Group>
							<ScrollArea className="h-72 pr-3">
								{CURRENCIES_ARRAY.map(currency => (
									<Command.Item
										key={currency}
										value={currency}
										onSelect={currentValue => {
											onChange(currentValue.toUpperCase() as Currency);
											setOpen(false);
										}}
									>
										<div className="flex w-full items-center justify-between">
											<div className="flex items-center gap-2">
												<img
													className="h-4 w-auto"
													src={currencyFlags[currency]}
													alt={currency}
												/>

												{t(`currency.${currency}`)}
											</div>

											{value.toLowerCase() === currency.toLowerCase() ? (
												<Check className={clsx("size-4 justify-self-end")} />
											) : null}
										</div>
									</Command.Item>
								))}
							</ScrollArea>
						</Command.Group>
					</Command>
				</Popover.Content>
			</Popover>
		);
	},
);
