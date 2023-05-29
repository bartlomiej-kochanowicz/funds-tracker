import { debounce } from 'helpers/debounce';
import { ChangeEvent, useMemo, useState } from 'react';

import { useDropdownMenu } from './useDropdownMenu';
import { useUpdateEffect } from './useUpdateEffect';

interface IUseCombobox<Item> {
  items: (Item & {
    value: string | number;
  })[];
  onInputValueChange: (value: string) => void;
}

export const useCombobox = <Item>({ items, onInputValueChange }: IUseCombobox<Item>) => {
  const [selectedItem, setSelectedItem] = useState<
    | (Item & {
        value: string | number;
      })
    | null
  >(null);

  const menuItems = useMemo(
    () =>
      items.map(({ value, ...itemRest }) => ({
        onClick: () => {
          setSelectedItem(items.find(item => item?.value === value) || null);
        },
        value,
        ...itemRest,
      })),
    [items],
  );

  const {
    inputProps: useDropdownInputProps,
    itemProps,
    isOpen,
    setIsOpen,
  } = useDropdownMenu<{}, HTMLInputElement>(menuItems);

  useUpdateEffect(() => {
    if (useDropdownInputProps.ref.current && selectedItem) {
      useDropdownInputProps.ref.current.focus();
      useDropdownInputProps.ref.current.value = String(selectedItem.value);
    }
  }, [selectedItem]);

  const inputProps = {
    ...useDropdownInputProps,
    onChange: debounce(
      (e: ChangeEvent<HTMLInputElement>) => onInputValueChange(e.target.value),
      350,
    ),
  };

  return {
    selectedItem,
    items: menuItems.map(item => ({
      ...item,
      onClick: () => {
        item.onClick();
        setIsOpen(false);
      },
    })),
    inputProps,
    itemProps,
    isOpen: isOpen && menuItems.length > 0,
    setIsOpen,
  };
};
