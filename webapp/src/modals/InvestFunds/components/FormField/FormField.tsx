import { Box, Spreader, Text } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, ReactNode } from 'react';

interface IFormFieldProps {
  children: ReactNode;
  label: string;
  htmlFor: string;
}

export const FormField: FC<IFormFieldProps> = ({ children, label, htmlFor }) => {
  const isPhone = useBreakpoint('phone', 'max');

  return (
    <Box
      $flex
      $alignItems={isPhone ? 'flex-start' : 'center'}
      $flexDirection={isPhone ? 'column' : 'row'}
    >
      <Text
        as="label"
        $fontWeight="700"
        $width="150px"
        htmlFor={htmlFor}
      >
        {label}:
      </Text>

      <Spreader $spread="0.25" />

      {children}
    </Box>
  );
};
