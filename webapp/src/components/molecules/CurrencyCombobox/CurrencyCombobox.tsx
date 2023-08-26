import { Currency } from '__generated__/graphql';
import { Box, Icon, Image, Input, Menu, Spreader } from 'components/atoms';
import { InputProps } from 'components/atoms/Input';
import { currencyFlags } from 'constants/currencyFlags';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useCombobox } from 'hooks/useCombobox';
import { forwardRef, Fragment, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { mergeRefs, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

interface CurrencyComboboxProps extends Omit<InputProps, 'onChange' | 'type'> {
  placement?: PlacementType;
  triggerOffset?: number;
  onChange: (currency: Currency) => void;
  defaultValue?: Currency;
}

export const CurrencyCombobox = forwardRef<HTMLInputElement, CurrencyComboboxProps>(
  ({ placement = 'bottom-start', triggerOffset = 5, onChange, defaultValue, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const { t } = useTranslation();

    const items = useMemo(
      () =>
        CURRENCIES_ARRAY.map(currency => ({ value: currency, label: t(`currency.${currency}`) })),
      [t],
    );

    const {
      items: menuItems,
      inputProps: comboboxInputProps,
      isOpen,
      inputProps,
      itemProps,
    } = useCombobox<(typeof items)[0]>({
      items: items.filter(item => item.value.toLowerCase().includes(inputValue.toLowerCase())),
      onInputValueChange: setInputValue,
      onItemSelect: newItem => {
        onChange(newItem.value);
      },
      defaultValue,
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
          {...rest}
          {...inputProps}
          {...comboboxInputProps}
          ref={mergeRefs(ref, triggerRef, inputProps.ref, triggerProps.ref, comboboxInputProps.ref)}
          defaultValue={defaultValue}
        />

        {renderLayer(
          isOpen && (
            <Menu
              $isInModal={isInModal}
              role="menu"
              {...layerProps}
              style={{
                minWidth: triggerBounds?.width,
                maxWidth: '90vh',
                maxHeight: '35vh',
                ...layerProps.style,
              }}
            >
              {menuItems.map(({ value, label, ...itemRest }, index) => {
                const { isSelected, ...itemPropsRest } = itemProps[index];

                return (
                  <Menu.Item
                    key={value}
                    $variant="combobox"
                    $isSelected={isSelected}
                    {...itemRest}
                    {...itemPropsRest}
                  >
                    <Box
                      $flex
                      $justifyContent="space-between"
                      $alignItems="center"
                      $width="100%"
                    >
                      <Box
                        $flex
                        $alignItems="center"
                      >
                        <Image
                          src={currencyFlags[value]}
                          $height="16px"
                          $width="auto"
                          alt={label}
                          loading="lazy"
                        />

                        <Spreader $spread="0.25" />

                        {label}
                      </Box>

                      <Spreader $spread="0.25" />

                      {isSelected && <Icon icon={FaCheck} />}
                    </Box>
                  </Menu.Item>
                );
              })}
            </Menu>
          ),
        )}
      </Fragment>
    );
  },
);
