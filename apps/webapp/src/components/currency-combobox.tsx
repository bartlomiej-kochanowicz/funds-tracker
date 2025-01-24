import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea,
} from "@funds-tracker/ui";
import { CURRENCIES_ARRAY } from "constants/selectors/currency";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	defautValue?: string;
	disabled?: boolean;
};

const CurrencyCombobox = forwardRef(
	({ value: valueFromProps, onChange, onBlur, defautValue, disabled }: Props) => {
		const [open, setOpen] = useState(false);

		const { t } = useTranslation();

		const value = valueFromProps || defautValue;

		return (
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
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
				</PopoverTrigger>
				<PopoverContent
					className="!p-0"
					align="start"
				>
					<Command>
						<CommandInput placeholder={t("form.currency.select.search.placeholder")} />
						<CommandEmpty>{t("form.currency.select.search.empty")}</CommandEmpty>
						<CommandGroup>
							<ScrollArea className="h-72 pr-3">
								{CURRENCIES_ARRAY.map(currency => (
									<CommandItem
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
												<Check className="size-4 justify-self-end" />
											) : null}
										</div>
									</CommandItem>
								))}
							</ScrollArea>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		);
	},
);

CurrencyCombobox.displayName = "CurrencyCombobox";

export { CurrencyCombobox };
