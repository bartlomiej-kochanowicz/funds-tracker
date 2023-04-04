import { SearchInstrumentsQuery, SearchInstrumentsQueryVariables } from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Input } from 'components/atoms';
import { resetIdCounter, useCombobox } from 'downshift';
import { AnimatePresence, motion } from 'framer-motion';
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
      onInputValueChange() {
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
          {showMenu && (
            <motion.ul
              {...getMenuProps(layerProps)}
              className="combobox__menu"
              style={{
                width: triggerBounds?.width, // we want the same width as the input
                ...layerProps.style,
              }}
              initial={{ opacity: 0, scaleY: 0.75 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.75 }}
              transition={{
                duration: 0.125, // 125ms
              }}
            >
              {items.map((item, index) => (
                <li
                  key={item.symbol}
                  className="combobox__menu-item"
                  {...getItemProps({ item, index })}
                >
                  {item.symbol}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
      )}
    </Fragment>
  );
};
