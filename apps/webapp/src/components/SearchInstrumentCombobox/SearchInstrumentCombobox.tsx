/* import {
	InstrumentType,
	SearchInstrumentQuery,
	SearchInstrumentQueryVariables,
} from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { Badge, Text } from "@funds-tracker/ui";
import { Input, Loader, Menu, Spreader } from "components/atoms";
import type { SearchInputProps } from "components/atoms/Input";
import { SEARCH_INSTRUMENT } from "graphql/query/instruments/SearchInstrument";
import { useCombobox } from "hooks/useCombobox";
import { forwardRef, Fragment, useMemo, useRef } from "react";
import { mergeRefs, useLayer } from "react-laag";
import { PlacementType } from "react-laag/dist/PlacementType";

interface SearchInstrumentComboboxProps extends Omit<SearchInputProps, "onChange"> {
	placement?: PlacementType;
	triggerOffset?: number;
	onChange: (instrument: SearchInstrumentQuery["searchInstrument"][0]) => void;
	instrumentType: InstrumentType;
}

export const SearchInstrumentCombobox = forwardRef<HTMLInputElement, SearchInstrumentComboboxProps>(
	(
		{ placement = "bottom-start", triggerOffset = 5, onChange, instrumentType, currency, ...rest },
		ref,
	) => {
		const [findInstruments, { data, loading, updateQuery }] = useLazyQuery<
			SearchInstrumentQuery,
			SearchInstrumentQueryVariables
		>(SEARCH_INSTRUMENT, {
			fetchPolicy: "network-only",
		});

		const items = useMemo(
			() =>
				data?.searchInstrument.map(({ Code, Exchange, ...itemRest }) => ({
					value: `${Code}.${Exchange}`,
					Code,
					Exchange,
					...itemRest,
				})) || [],
			[data?.searchInstrument],
		);

		const {
			items: menuItems,
			inputProps: comboboxInputProps,
			isOpen,
			inputProps,
			itemProps,
		} = useCombobox<(typeof items)[0]>({
			items,
			onInputValueChange: inputValue => {
				if (!inputValue) {
					updateQuery(prev => ({ ...prev, searchInstrument: [] }));

					return;
				}

				findInstruments({
					variables: {
						data: {
							name: inputValue,
							type: instrumentType,
						},
					},
				});
			},
			onItemSelect: newSelectedItem => {
				if (newSelectedItem && onChange) {
					onChange(newSelectedItem);
				}
			},
		});

		const triggerRef = useRef<HTMLInputElement>(null);

		const isInModal = Boolean(triggerRef.current?.closest('[data-modal="true"]'));

		const { renderLayer, triggerProps, layerProps, triggerBounds } = useLayer({
			isOpen,
			placement,
			auto: true,
			container: isInModal
				? (document.querySelector('[data-modal="true"]') as HTMLElement)
				: undefined,
			possiblePlacements: [
				"top-start",
				"top-center",
				"top-end",
				"bottom-start",
				"bottom-center",
				"bottom-end",
			],
			triggerOffset,
		});

		return (
			<Fragment>
				<Input
					type="search"
					unit={
						loading ? (
							<div className="flex h-full flex-col justify-center">
								<Loader $size="small" />
							</div>
						) : undefined
					}
					{...rest}
					{...inputProps}
					{...comboboxInputProps}
					ref={mergeRefs(ref, triggerRef, inputProps.ref, triggerProps.ref)}
				/>

				{renderLayer(
					isOpen && (
						<Menu
							$isInModal={isInModal}
							role="menu"
							{...layerProps}
							style={{
								minWidth: triggerBounds?.width,
								maxWidth: "90vh",
								maxHeight: "35vh",
								...layerProps.style,
							}}
						>
							{menuItems.map((item, index) => (
								<Menu.Item
									key={`${item.Code}.${item.Exchange}`}
									onClick={item.onClick}
									$maxWidth={triggerBounds?.width ? `${triggerBounds.width}px` : undefined}
									{...itemProps[index]}
								>
									<Badge>{item.value}</Badge>

									<Spreader $spread="0.25" />

									<Text>{item.Name}</Text>

									<Spreader $spread="0.1" />

									<Text>({item.Currency})</Text>
								</Menu.Item>
							))}
						</Menu>
					),
				)}
			</Fragment>
		);
	},
);
 */

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

interface SearchInstrumentComboboxProps {
	instrumentType: InstrumentType;
	onChange: (value: SearchInstrumentQuery["searchInstrument"][0]) => void;
	onBlur: () => void;
	disabled?: boolean;
	value: SearchInstrumentQuery["searchInstrument"][0];
}

export const SearchInstrumentCombobox = forwardRef<HTMLInputElement, SearchInstrumentComboboxProps>(
	({ value, onChange, onBlur, disabled, instrumentType }) => {
		const [open, setOpen] = useState(false);

		const { t } = useTranslation();

		const [findInstruments, { data, loading /* , updateQuery */ }] = useLazyQuery<
			SearchInstrumentQuery,
			SearchInstrumentQueryVariables
		>(SEARCH_INSTRUMENT, {
			fetchPolicy: "network-only",
		});

		const handleInputChange = (name: string) => {
			findInstruments({
				variables: {
					data: {
						name,
						type: instrumentType,
					},
				},
			});
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
						className="w-full justify-between"
						onBlur={onBlur}
						disabled={disabled}
					>
						{value.Name || t("input.search_instrument.placeholder")}
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
	},
);
