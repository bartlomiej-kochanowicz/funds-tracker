import { Button, Command, Popover, ScrollArea } from "@funds-tracker/ui";
import clsx from "clsx";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface CurrencyComboboxProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	defautValue?: string;
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
											onChange(currentValue.toUpperCase());
											setOpen(false);
										}}
									>
										<div className="flex w-full items-center justify-between">
											<span>
												{t(`currency.${currency}`)} ({currency})
											</span>

											{value?.toLowerCase() === currency.toLowerCase() ? (
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
