// import { Currency } from "__generated__/graphql";
import { Button, Command, Popover } from "@funds-tracker/ui";
import clsx from "clsx";
import { currencyFlags } from "constants/currencyFlags";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CurrencyCombobox = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const { t } = useTranslation();

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
					className="justify-between"
				>
					{value ? t(`currency.${value.toUpperCase()}`) : t("form.currency.select.placeholder")}
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content
				className="max-h-72 overflow-auto p-0"
				align="start"
			>
				<Command>
					<Command.Input placeholder={t("form.currency.select.placeholder")} />
					<Command.Empty>{t("form.currency.select.search.empty")}</Command.Empty>
					<Command.Group>
						{CURRENCIES_ARRAY.map(currency => (
							<Command.Item
								key={currency}
								value={currency}
								onSelect={currentValue => {
									setValue(currentValue === value ? "" : currentValue);
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

									{value === currency.toLowerCase() ? (
										<Check className={clsx("size-4 justify-self-end")} />
									) : null}
								</div>
							</Command.Item>
						))}
					</Command.Group>
				</Command>
			</Popover.Content>
		</Popover>
	);
};
