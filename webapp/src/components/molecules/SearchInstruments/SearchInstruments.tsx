import { SearchInstrumentsQuery, SearchInstrumentsQueryVariables } from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Badge, Input, Menu, Spreader, Text } from 'components/atoms';
import type { SearchInputProps } from 'components/atoms/Input';
import { SEARCH_INSTRUMENTS } from 'graphql/query/instruments/SearchInstruments';
import { useCombobox } from 'hooks/useCombobox';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { forwardRef, Fragment, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { mergeRefs, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

interface SearchInstrumentsProps extends Omit<SearchInputProps, 'onChange'> {
  placement?: PlacementType;
  triggerOffset?: number;
  onChange: (instrument: SearchInstrumentsQuery['searchInstruments'][0]) => void;
}

export const SearchInstruments = forwardRef<HTMLInputElement, SearchInstrumentsProps>(
  ({ placement = 'bottom-start', triggerOffset = 5, onChange, ...rest }, ref) => {
    const { t } = useTranslation();

    const [findInstruments, { data }] = useLazyQuery<
      SearchInstrumentsQuery,
      SearchInstrumentsQueryVariables
    >(SEARCH_INSTRUMENTS, {
      fetchPolicy: 'no-cache',
    });

    const items = useMemo(
      () =>
        data?.searchInstruments.map(({ Code, Exchange, ...itemRest }) => ({
          value: `${Code}.${Exchange}`,
          Code,
          Exchange,
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

    useUpdateEffect(() => {
      if (selectedItem && onChange) {
        onChange(selectedItem);
      }
    }, [selectedItem]);

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
          placeholder={t('input.search_instrument.placeholder')}
          {...rest}
          {...inputProps}
          {...comboboxInputProps}
          ref={mergeRefs(ref, triggerRef, inputProps.ref, triggerProps.ref)}
        />

        {renderLayer(
          isOpen && (
            <Menu
              isInModal={isInModal}
              role="menu"
              {...layerProps}
              style={{
                minWidth: triggerBounds?.width,
                maxWidth: '90vh',
                maxHeight: '35vh',
                ...layerProps.style,
              }}
            >
              {menuItems.map((item, index) => (
                <Menu.Item
                  key={`${item.Code}.${item.Exchange}`}
                  onClick={item.onClick}
                  {...itemProps[index]}
                >
                  <Badge>{item.Code}</Badge>

                  <Spreader spread="0.25" />

                  <Text maxWidth="175px">{item.Name}</Text>
                </Menu.Item>
              ))}
            </Menu>
          ),
        )}
      </Fragment>
    );
  },
);
