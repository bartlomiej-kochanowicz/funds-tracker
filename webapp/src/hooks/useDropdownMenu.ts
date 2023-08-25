import {
  ButtonHTMLAttributes,
  createRef,
  DetailedHTMLProps,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export type ItemButton = {
  onClick?: () => void;
  to?: undefined;
};

export type ItemLink = {
  to?: string;
  onClick?: undefined;
};

export type ItemBase =
  | {
      to?: undefined;
      onClick?: undefined;
    }
  | ItemButton
  | ItemLink;

export interface TriggerProps<TriggerElement extends HTMLElement>
  extends Pick<
    DetailedHTMLProps<ButtonHTMLAttributes<TriggerElement>, TriggerElement>,
    'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
  > {
  ref: RefObject<TriggerElement>;
}

export interface ItemProps {
  onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => void;
  tabIndex: number;
  role: string;
  ref: RefObject<HTMLElement>;
}

export interface DropdownMenuOptions {
  initFocusIndex?: number;
}

interface DropdownMenuResponse<TriggerElement extends HTMLElement> {
  readonly inputProps: TriggerProps<TriggerElement>;
  readonly buttonProps: TriggerProps<TriggerElement>;
  readonly itemProps: ItemProps[];
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly moveFocus: (itemIndex: number) => void;
}

export const useDropdownMenu = <
  Item extends ItemBase,
  TriggerElement extends HTMLElement = HTMLButtonElement,
>(
  items: Item[],
  options?: DropdownMenuOptions,
): DropdownMenuResponse<TriggerElement> => {
  const itemCount = items.length;
  const initFocusIndex = options?.initFocusIndex;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentFocusIndex = useRef<number | null>(null);
  const firstRun = useRef(true);
  const clickedOpen = useRef(false);

  const navigate = useNavigate();
  const triggerRef = useRef<TriggerElement>(null);
  const itemRefs = useMemo<RefObject<HTMLElement>[]>(
    () => Array.from({ length: itemCount }, () => createRef<HTMLElement>()),
    [itemCount],
  );

  const isKeyboardEvent = (e: ReactKeyboardEvent | ReactMouseEvent): e is ReactKeyboardEvent =>
    (e as ReactKeyboardEvent).key !== undefined;

  const moveFocus = useCallback(
    (itemIndex: number): void => {
      if (itemRefs[itemIndex]) {
        currentFocusIndex.current = itemIndex;
        itemRefs[itemIndex].current?.focus();
      }
    },
    [itemRefs],
  );

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (isOpen && (!clickedOpen.current || initFocusIndex)) {
      moveFocus(initFocusIndex || 0);
    } else if (!isOpen) {
      clickedOpen.current = false;
    }
  }, [isOpen, moveFocus, initFocusIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const removalTracker = {
      removed: false,
    };

    const handleEveryClick = (event: MouseEvent): void => {
      setTimeout(() => {
        if (!(event.target instanceof Element)) {
          return;
        }

        if (event.target.closest('[role="menu"]') instanceof Element) {
          return;
        }

        setIsOpen(false);
      }, 10);
    };

    setTimeout(() => {
      if (removalTracker.removed) {
        return;
      }

      document.addEventListener('click', handleEveryClick, false);
    }, 1);

    return (): void => {
      removalTracker.removed = true;

      document.removeEventListener('click', handleEveryClick, false);
    };
  }, [isOpen]);

  useEffect(() => {
    const disableArrowScroll = (event: KeyboardEvent): void => {
      if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', disableArrowScroll, false);

    return (): void => document.removeEventListener('keydown', disableArrowScroll);
  }, [isOpen]);

  useEffect(() => {
    itemRefs.forEach((ref, index) => {
      ref.current?.addEventListener(
        'mouseover',
        () => {
          moveFocus(index);
        },
        false,
      );
    });

    return (): void => {
      itemRefs.forEach((ref, index) => {
        ref.current?.removeEventListener(
          'mouseover',
          () => {
            moveFocus(index);
          },
          false,
        );
      });
    };
  }, [itemRefs, isOpen, moveFocus]);

  const buttonListener = (e: ReactKeyboardEvent | ReactMouseEvent): void => {
    if (isKeyboardEvent(e)) {
      const { key } = e;

      if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(key)) {
        return;
      }

      if ((key === 'Tab' || key === 'ArrowDown') && clickedOpen.current && isOpen) {
        e.preventDefault();
        moveFocus(0);
      }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }

      if (key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    } else {
      if (!initFocusIndex) {
        clickedOpen.current = !isOpen;
      }

      setIsOpen(!isOpen);
    }
  };

  const inputListener = (e: ReactKeyboardEvent | ReactMouseEvent): void => {
    if (isKeyboardEvent(e)) {
      const { key } = e;

      if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(key)) {
        return;
      }

      if ((key === 'Tab' || key === 'ArrowDown') && clickedOpen.current && isOpen) {
        e.preventDefault();
        moveFocus(0);
      }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }

      if (key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
      // @ts-ignore
    } else {
      if (!initFocusIndex) {
        clickedOpen.current = !isOpen;
      }

      setIsOpen(!isOpen);
    }
  };

  const itemListener = (e: ReactKeyboardEvent<HTMLElement>, index: number): void => {
    const { key } = e;

    if (['Tab', 'Shift', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', ' '].includes(key)) {
      let newFocusIndex = currentFocusIndex.current;

      const { to, onClick } = items[index];

      if (key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();

        return;
      }
      if (key === 'Tab') {
        setIsOpen(false);

        return;
      }
      if ((key === 'Enter' || key === ' ') && onClick) {
        onClick();
        setIsOpen(false);

        return;
      }
      if ((key === 'Enter' || key === ' ') && to) {
        navigate(to);

        setIsOpen(false);

        return;
      }

      if (newFocusIndex !== null) {
        if (key === 'ArrowUp') {
          newFocusIndex -= 1;
        } else if (key === 'ArrowDown') {
          newFocusIndex += 1;
        }

        if (newFocusIndex > itemRefs.length - 1) {
          newFocusIndex = 0;
        } else if (newFocusIndex < 0) {
          newFocusIndex = itemRefs.length - 1;
        }
      }

      if (newFocusIndex !== null) {
        moveFocus(newFocusIndex);
      }

      return;
    }

    if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(key)) {
      const newIndex = itemRefs.findIndex(
        ref =>
          ref.current?.innerText?.toLowerCase().startsWith(key.toLowerCase()) ||
          ref.current?.textContent?.toLowerCase().startsWith(key.toLowerCase()) ||
          ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(key.toLowerCase()),
      );

      if (newIndex !== -1) {
        moveFocus(newIndex);
      }
    }
  };

  const buttonProps: TriggerProps<TriggerElement> = {
    onKeyDown: buttonListener,
    onClick: buttonListener,
    tabIndex: 0,
    ref: triggerRef,
    role: 'button',
    'aria-haspopup': true,
    'aria-expanded': isOpen,
  };

  const inputProps: TriggerProps<TriggerElement> = {
    onKeyDown: inputListener,
    onClick: inputListener,
    tabIndex: 0,
    ref: triggerRef,
    'aria-haspopup': true,
    'aria-expanded': isOpen,
  };

  const itemProps = Array.from({ length: itemCount }, (_ignore, index) => ({
    onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => itemListener(e, index),
    tabIndex: -1,
    role: 'menuitem',
    ref: itemRefs[index],
  }));

  return { inputProps, buttonProps, itemProps, isOpen, setIsOpen, moveFocus } as const;
};
