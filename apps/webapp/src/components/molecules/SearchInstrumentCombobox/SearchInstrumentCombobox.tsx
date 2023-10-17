import {
	InstrumentType,
	SearchInstrumentQuery,
	SearchInstrumentQueryVariables,
} from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { Badge, Box, Input, Loader, Menu, Spreader, Text } from "components/atoms";
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
							<Box $flex $flexDirection="column" $justifyContent="center" $height="100%">
								<Loader $size="small" />
							</Box>
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

									<Text $maxWidth="auto">{item.Name}</Text>

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
