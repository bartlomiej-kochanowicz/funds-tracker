import {
	Currency,
	InstrumentType,
	SearchInstrumentQuery,
	SearchInstrumentQueryVariables,
} from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
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
import { SEARCH_INSTRUMENT } from "graphql/query/instruments/SearchInstrument";
import { formatCurrency } from "helpers/formatCurrency";
import { ChevronsUpDown } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface SearchInstrumentComboboxProps {
	instrumentType: InstrumentType | null;
	onChange: (value: SearchInstrumentQuery["searchInstrument"][0]) => void;
	onBlur: () => void;
	disabled?: boolean;
	value: SearchInstrumentQuery["searchInstrument"][0] | null;
	className?: string;
}

export const SearchInstrumentCombobox = forwardRef<
	HTMLButtonElement,
	SearchInstrumentComboboxProps
>(({ value, onChange, onBlur, disabled, instrumentType, className }, ref) => {
	const [open, setOpen] = useState(false);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const { t } = useTranslation();

	const [findInstruments, { data, loading, updateQuery }] = useLazyQuery<
		SearchInstrumentQuery,
		SearchInstrumentQueryVariables
	>(SEARCH_INSTRUMENT, {
		fetchPolicy: "network-only",
	});

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
		if (instrumentType) {
			findInstruments({
				variables: {
					data: {
						name,
						type: instrumentType,
					},
				},
			});
		}
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
						{value?.Name || t("input.search_instrument.placeholder")}
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
						placeholder={t(`input.search_instrument.placeholder.${instrumentType}`)}
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
										const { Name, Exchange, Code, Currency: currency, previousClose } = instrument;

										const ticker = `${Code}.${Exchange}`;

										return (
											<Command.Item
												key={ticker}
												onSelect={() => {
													onChange(instrument);
													setOpen(false);
												}}
												className="flex items-center justify-between gap-2"
											>
												<div className="flex items-center gap-1">
													<Badge>{ticker}</Badge>

													<Text>{Name}</Text>
												</div>

												<Text>
													{formatCurrency(Number(previousClose.toFixed(2)), currency as Currency)}
												</Text>
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
});
