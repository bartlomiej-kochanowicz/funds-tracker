import { SearchInstrumentsQuery, SearchInstrumentsQueryVariables } from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Badge, Input, Menu, Spreader } from 'components/atoms';
import type { SearchInputProps } from 'components/atoms/Input';
import { SEARCH_INSTRUMENTS } from 'graphql/query/instruments/SearchInstruments';
import { useCombobox } from 'hooks/useCombobox';
import { FC, Fragment, useMemo, useRef } from 'react';
import { mergeRefs, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

interface SearchInstrumentsProps extends Omit<SearchInputProps, 'onChange'> {
  placement?: PlacementType;
  triggerOffset?: number;
  onChange: (instrument: SearchInstrumentsQuery['searchInstruments'][0]) => void;
}

export const SearchInstruments: FC<SearchInstrumentsProps> = ({
  placement = 'bottom-start',
  triggerOffset = 5,
  onChange,
  ...rest
}) => {
  const [findInstruments, { data }] = useLazyQuery<
    SearchInstrumentsQuery,
    SearchInstrumentsQueryVariables
  >(SEARCH_INSTRUMENTS, {
    fetchPolicy: 'no-cache',
  });

  const items = useMemo(
    () =>
      data?.searchInstruments.map(({ symbol, ...itemRest }) => ({
        value: symbol,
        symbol,
        ...itemRest,
      })) || [],
    [data?.searchInstruments],
  );

  const {
    selectedItem,
    items: menuItems,
    inputProps: comboboxInputProps,
    isOpen,
    inputProps,
    itemProps,
  } = useCombobox<(typeof items)[0]>({
    items,
    onInputValueChange: inputValue => {
      findInstruments({
        variables: {
          data: {
            name: inputValue,
          },
        },
      });
    },
  });

  console.log(selectedItem);

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
      'top-start',
      'top-center',
      'top-end',
      'bottom-start',
      'bottom-center',
      'bottom-end',
    ],
    triggerOffset,
  });

  return (
    <Fragment>
      <Input
        type="search"
        placeholder="Search instrument..."
        {...rest}
        {...inputProps}
        {...comboboxInputProps}
        ref={mergeRefs(triggerRef, inputProps.ref, triggerProps.ref)}
      />

      {renderLayer(
        isOpen && (
          <Menu
            isInModal={isInModal}
            role="menu"
            {...layerProps}
            style={{
              minWidth: triggerBounds?.width,
              ...layerProps.style,
            }}
          >
            {menuItems.map((item, index) => {
              return (
                <Menu.Item
                  key={item.symbol}
                  onClick={item.onClick}
                  {...itemProps[index]}
                >
                  <Badge>{item.symbol}</Badge>

                  <Spreader spread="0.25" />

                  {item.longname || item.symbol}
                </Menu.Item>
              );
            })}
          </Menu>
        ),
      )}
    </Fragment>
  );
};
