import { SearchInstrumentsQuery, SearchInstrumentsQueryVariables } from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Badge, Input, Menu, Spreader } from 'components/atoms';
import { resetIdCounter, useCombobox } from 'downshift';
import { SEARCH_INSTRUMENTS } from 'graphql/query/instruments/SearchInstruments';
import { debounce } from 'helpers/debounce';
import { FC, Fragment } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

interface SearchInstrumentsProps {
  placement?: PlacementType;
  triggerOffset?: number;
  onChange: (instrument: SearchInstrumentsQuery['searchInstruments'][0]) => void;
}

export const SearchInstruments: FC<SearchInstrumentsProps> = ({
  placement = 'bottom-center',
  triggerOffset = 5,
  onChange,
}) => {
  const [findInstruments, { data }] = useLazyQuery<
    SearchInstrumentsQuery,
    SearchInstrumentsQueryVariables
  >(SEARCH_INSTRUMENTS, {
    fetchPolicy: 'no-cache',
  });

  const items = data?.searchInstruments || [];

  resetIdCounter();

  const findItemsButChill = debounce<typeof findInstruments>(findInstruments, 350);

  const { isOpen, highlightedIndex, inputValue, getMenuProps, getInputProps, getItemProps } =
    useCombobox({
      items,
      onInputValueChange: () => {
        findItemsButChill({
          variables: {
            data: {
              name: inputValue,
            },
          },
        });
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (selectedItem) {
          onChange(selectedItem);
        }
      },
      itemToString: item => item?.symbol || '',
    });

  const showMenu = isOpen && items.length > 0;

  const { renderLayer, triggerProps, layerProps, triggerBounds } = useLayer({
    isOpen,
    placement,
    auto: true,
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
        {...getInputProps(triggerProps)}
      />
      {renderLayer(
        <Menu
          {...getMenuProps(layerProps)}
          style={{
            width: triggerBounds?.width,
            display: showMenu ? 'block' : 'none',
            ...layerProps.style,
          }}
        >
          {showMenu &&
            items.map((item, index) => (
              <Menu.Item
                key={item.symbol}
                highlighted={highlightedIndex === index}
                {...getItemProps({ item, index })}
              >
                <Badge>{item.symbol}</Badge>

                <Spreader spread="0.25" />

                {item.longname || item.symbol}
              </Menu.Item>
            ))}
        </Menu>,
      )}
    </Fragment>
  );
};
