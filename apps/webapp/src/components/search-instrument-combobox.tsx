/*
import { SearchInstrumentQuery } from "__generated__/graphql";
import {
	Badge,
	Button,
	Command,
	debounce,
	Loader,
	Popover,
	ScrollArea,
	Text,
} from "@funds-tracker/ui";
import { mergeRefs } from "@funds-tracker/ui/src/helpers/mergeRefs";
import { useLazyQueryInstrumentSearch } from "hooks/api/instruments/useLazyQueryInstrumentSearch";
import { ChevronsUpDown } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

type Props = {
	onChange: (value: SearchInstrumentQuery["searchInstrument"][0]) => void;
	onBlur: () => void;
	disabled?: boolean;
	value: SearchInstrumentQuery["searchInstrument"][0] | null;
	className?: string;
};

const SearchInstrumentCombobox = forwardRef<HTMLButtonElement, Props>(
	({ value, onChange, onBlur, disabled, className }, ref) => {
		const [open, setOpen] = useState(false);

		const triggerRef = useRef<HTMLButtonElement>(null);

		const { t } = useTranslation();

		const [findInstruments, { data, loading, updateQuery }] = useLazyQueryInstrumentSearch();

		const cleanSearchData = () => {
			updateQuery(prev => {
				if (prev) {
					return {
						...prev,
						searchInstrument: [],
					};
				}

				return prev;
			});
		};

		const handleOpenChange = (nextOpen: boolean) => {
			if (nextOpen) {
				cleanSearchData();
			}

			setOpen(nextOpen);
		};

		const handleInputChange = (name: string) => {
			findInstruments({
				variables: {
					data: {
						name,
					},
				},
			});
		};

		return (
			<Popover
				open={open}
				onOpenChange={handleOpenChange}
			>
				<Popover.Trigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={twMerge("justify-between", className)}
						onBlur={onBlur}
						disabled={disabled}
						ref={mergeRefs([triggerRef, ref])}
					>
						<span className="truncate">
							{value?.name || t("input.search_instrument.placeholder")}
						</span>

						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content
					className="w-fit !p-0"
					style={{
						width: triggerRef.current?.offsetWidth,
					}}
					align="start"
				>
					<Command shouldFilter={false}>
						<Command.Input
							onValueChange={debounce(handleInputChange)}
							placeholder={t(`input.search_instrument.placeholder.stocks`)}
						/>

						<Command.List>
							<Command.Group>
								<ScrollArea className="h-44 pr-3">
									{!data && loading && <Loader className="mx-auto mt-4" />}

									{data?.searchInstrument.length === 0 && (
										<Text
											muted
											className="mt-4 block text-center text-sm"
										>
											{t("form.search_instrument.empty")}
										</Text>
									)}

									{data &&
										data.searchInstrument.map(instrument => {
											const { symbol, currency, name, exchangeShortName } = instrument;

											return (
												<Command.Item
													key={symbol}
													onSelect={() => {
														onChange(instrument);
														setOpen(false);
													}}
													className="flex items-center justify-between gap-2 cursor-pointer"
												>
													<div className="flex items-center gap-1">
														<Badge>{symbol}</Badge>

														<Text>
															{name} ({currency.toUpperCase()})
														</Text>
													</div>

													<Text>{exchangeShortName}</Text>
												</Command.Item>
											);
										})}
								</ScrollArea>
							</Command.Group>
						</Command.List>
					</Command>
				</Popover.Content>
			</Popover>
		);
	},
);

SearchInstrumentCombobox.displayName = "SearchInstrumentCombobox";

export { SearchInstrumentCombobox };
 */
