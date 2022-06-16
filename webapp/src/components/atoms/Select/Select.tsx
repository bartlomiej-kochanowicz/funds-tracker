import { FC, Fragment, HTMLProps, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLayer } from 'react-laag';
import { darken } from 'color2k';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Spreader } from 'components/atoms/Spreader';
import { Menu } from 'components/atoms/Menu';
import { composeRefs } from 'utils/composeRefs';

const StyledButton = styled.button<HTMLProps<HTMLButtonElement>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  ${({ theme }) => css`
    border-radius: ${theme.radius.secondary};
    border: 1px solid ${darken(theme.colors.lightGray, 0.05)};
    background-color: transparent;
    padding: ${theme.padding.medium.map(p => p).join(' ')};
    color: ${theme.colors.black};
    outline-color: ${theme.colors.blue};
    font-weight: ${theme.font.weight[500]};

    &:focus {
      background-color: ${darken(theme.colors.lightGray, 0.05)};
      color: ${theme.colors.blue};
      border: 1px solid ${theme.colors.blue};
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }
  `}
`;

interface ContentProps {
  isSelected: boolean;
}

const StyledContent = styled.div<ContentProps>`
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.black : theme.colors.gray)};
`;

type Item = {
  value: string | number;
  label: string;
};

interface SelectProps {
  options: Item[];
  placeholder?: string | null;
  defaultValue?: string | number | null;
}

export const Select: FC<SelectProps> = ({ options, defaultValue, placeholder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getDefaultSelected = (): Item | null =>
    defaultValue ? options.find(option => option.value === defaultValue) || null : null;

  const [selected, setSelected] = useState<Item | null>(getDefaultSelected());

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    overflowContainer: false,
    placement: 'bottom-center',
    auto: true,
    possiblePlacements: ['bottom-center', 'top-center'],
    triggerOffset: 5,
    onDisappear: disappearType => {
      if (disappearType === 'full') {
        setIsOpen(false);
      }
    },
    onOutsideClick: () => setIsOpen(false),
  });

  const handleOpen = () => setIsOpen(prev => !prev);

  const minMenuWidth = buttonRef.current?.offsetWidth ?? null;

  return (
    <Fragment>
      <StyledButton
        type="button"
        onClick={handleOpen}
        ref={composeRefs(buttonRef, triggerProps.ref)}
      >
        <StyledContent isSelected={Boolean(selected)}>
          {selected?.label ?? placeholder}
        </StyledContent>

        <Spreader />

        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </StyledButton>

      {isOpen &&
        renderLayer(
          <Menu
            minMenuWidth={minMenuWidth}
            {...layerProps}
          >
            {options.map(({ value, label, ...rest }) => {
              const handleSelect = () => {
                setSelected({ value, label, ...rest });

                setIsOpen(false);
              };

              return (
                <Menu.Item
                  onClick={handleSelect}
                  isSelected={selected?.value === value}
                  key={value}
                >
                  {label}
                </Menu.Item>
              );
            })}
          </Menu>,
        )}
    </Fragment>
  );
};

Select.displayName = 'Select';

Select.defaultProps = {
  placeholder: null,
  defaultValue: null,
};
