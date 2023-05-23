import { debounce } from 'helpers/debounce';
import { ChangeEvent, useMemo, useState } from 'react';

import { useDropdownMenu } from './useDropdownMenu';

interface IUseCombobox<Item> {
  items: (Item & {
    value: string | number;
  })[];
  onInputValueChange: (value: string) => void;
}

export const useCombobox = <Item>({ items, onInputValueChange }: IUseCombobox<Item>) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const menuItems = useMemo(
    () =>
      items.map(({ value, ...itemRest }) => ({
        onClick: () => setSelectedItem(items.find(item => item?.value === value) || null),
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

  const inputProps = {
    ...useDropdownInputProps,
    onChange: debounce(
      (e: ChangeEvent<HTMLInputElement>) => onInputValueChange(e.target.value),
      350,
    ),
  };

  return { selectedItem, items: menuItems, inputProps, itemProps, isOpen, setIsOpen };
};
