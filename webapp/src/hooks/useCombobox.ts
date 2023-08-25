import { debounce } from 'helpers/debounce';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-laag';

import { useDropdownMenu } from './useDropdownMenu';
import { useUpdateEffect } from './useUpdateEffect';

interface IUseCombobox<Item> {
  items: Item[];
  onInputValueChange: (value: string) => void;
  onItemSelect?: (item: Item) => void;
}

export const useCombobox = <
  Item extends {
    value: string | number;
  },
>({
  items,
  onInputValueChange,
  onItemSelect,
}: IUseCombobox<Item>) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const menuItems = useMemo(
    () =>
      items.map(({ value, ...itemRest }) => ({
        // @ts-ignore TS2577 error couses TS7023 and vice versa - TODO: fix
        onClick: () => {
          const newSelectedItem = items.find(item => item?.value === value);

          if (onItemSelect && newSelectedItem) {
            onItemSelect(newSelectedItem);

            setSelectedItem(newSelectedItem);
          }
        },
        value,
        ...itemRest,
      })),
    [items, onItemSelect],
  );
  const itemIndex = items.findIndex(item => item.value === selectedItem?.value);
  const initFocusIndex = itemIndex === -1 ? undefined : itemIndex;

  const {
    inputProps: useDropdownInputProps,
    itemProps,
    isOpen,
    setIsOpen,
  } = useDropdownMenu<{}, HTMLInputElement>(menuItems, {
    initFocusIndex,
  });

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
    onBlur: () => {
      if (inputRef.current && selectedItem) {
        inputRef.current.value = String(selectedItem.value);
      }
    },
    ref: mergeRefs(inputRef, useDropdownInputProps.ref),
  };

  return {
    selectedItem,
    items: menuItems.map(item => ({
      ...item,
      // @ts-ignore TS2577 error couses TS7023 and vice versa - TODO: fix
      onClick: () => {
        item.onClick();
        setIsOpen(false);
      },
    })),
    inputProps,
    itemProps: itemProps.map((item, index) => ({
      ...item,
      isSelected: index === itemIndex,
    })),
    isOpen: isOpen && menuItems.length > 0,
    setIsOpen,
  };
};
