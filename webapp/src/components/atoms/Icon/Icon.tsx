import { FC } from 'react';
import { IconType } from 'react-icons';
import { DefaultTheme } from 'styled-components';

import { StyledIcon } from './Icon.styles';

interface IconProps {
  icon: IconType;
  size?: keyof DefaultTheme['font']['size'];
  color?: keyof DefaultTheme['colors'];
}

export const Icon: FC<IconProps> = ({ icon: IconComponent, size = '1', color }) => (
  <StyledIcon
    as={IconComponent}
    size={size}
    color={color}
  />
);
