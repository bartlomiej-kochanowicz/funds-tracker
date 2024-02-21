import {
	InstrumentType,
	SearchInstrumentQuery,
	SearchInstrumentQueryVariables,
} from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { Badge, Button, Command, Loader, Popover, ScrollArea, Text } from "@funds-tracker/ui";
import { SEARCH_INSTRUMENT } from "graphql/query/instruments/SearchInstrument";
import { ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
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

	const { t } = useTranslation();

	const [findInstruments, { data, loading /* , updateQuery */ }] = useLazyQuery<
		SearchInstrumentQuery,
		SearchInstrumentQueryVariables
	>(SEARCH_INSTRUMENT, {
		fetchPolicy: "network-only",
	});

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
			onOpenChange={setOpen}
		>
			<Popover.Trigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={twMerge("w-full justify-between", className)}
					onBlur={onBlur}
					disabled={disabled}
					ref={ref}
				>
					{value?.Name || t("input.search_instrument.placeholder")}

					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content
				className="!p-0"
				align="start"
			>
				<Command>
					<Command.Input
						onValueChange={handleInputChange}
						placeholder={t(`input.search_instrument.placeholder.${instrumentType}`)}
					/>
					{/* <Command.Empty>{t("form.currency.select.search.empty")}</Command.Empty> */}
					<Command.Group>
						<ScrollArea className="h-44 pr-3">
							{!data && loading && <Loader className="mx-auto" />}

							{data &&
								!loading &&
								data.searchInstrument.map(({ Name, Code, Currency, ...rest }) => {
									return (
										<Command.Item
											key={Code}
											onSelect={() => {
												onChange({ Name, Code, Currency, ...rest });
												setOpen(false);
											}}
										>
											<Badge>{Code}</Badge>

											<Text>{Name}</Text>

											<Text>({Currency})</Text>
										</Command.Item>
									);
								})}
						</ScrollArea>
					</Command.Group>
				</Command>
			</Popover.Content>
		</Popover>
	);
});
