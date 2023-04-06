import { SearchInstrumentsQuery, SearchInstrumentsQueryVariables } from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Input, Menu } from 'components/atoms';
import { resetIdCounter, useCombobox } from 'downshift';
import { AnimatePresence } from 'framer-motion';
import { SEARCH_INSTRUMENTS } from 'graphql/query/instruments/SearchInstruments';
import { debounce } from 'helpers/debounce';
import { FC, Fragment } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

interface SearchInstrumentsProps {
  placement?: PlacementType;
  triggerOffset?: number;
}

export const SearchInstruments: FC<SearchInstrumentsProps> = ({
  placement = 'bottom-center',
  triggerOffset = 5,
}) => {
  const [findInstruments, { loading, data, error }] = useLazyQuery<
    SearchInstrumentsQuery,
    SearchInstrumentsQueryVariables
  >(SEARCH_INSTRUMENTS, {
    fetchPolicy: 'no-cache',
  });

  const items = data?.searchInstruments || [];

  resetIdCounter();

  const findItemsButChill = debounce<typeof findInstruments>(findInstruments, 350);

  const { isOpen, inputValue, getMenuProps, getInputProps, highlightedIndex, getItemProps } =
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
        console.log(selectedItem);
      },
      itemToString: item => item?.symbol || '',
    });

  const showMenu = isOpen && items.length > 0;

  const { renderLayer, triggerProps, layerProps, triggerBounds, layerSide } = useLayer({
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
        <AnimatePresence>
          <Menu
            {...getMenuProps(layerProps)}
            style={{
              width: triggerBounds?.width, // we want the same width as the input
              ...layerProps.style,
            }}
          >
            {showMenu &&
              items.map((item, index) => (
                <Menu.Item
                  key={item.symbol}
                  {...getItemProps({ item, index })}
                >
                  {item.longname}
                </Menu.Item>
              ))}
          </Menu>
        </AnimatePresence>,
      )}
    </Fragment>
  );
};
