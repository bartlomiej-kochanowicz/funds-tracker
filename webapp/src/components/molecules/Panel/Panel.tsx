import { Box } from 'components/atoms';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
}

export const Panel: FC<PanelProps> = ({ children }) => {
  const { isDark } = useColorThemeContext();

  const isPhone = useBreakpoint('phone', 'max');

  return (
    <Box
      borderRadius="0.7"
      backgroundColor={isDark ? 'gray100' : 'white'}
      p={isPhone ? 'small' : 'large'}
    >
      {children}
    </Box>
  );
};
