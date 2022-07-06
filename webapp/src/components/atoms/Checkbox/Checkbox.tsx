import { FC, ReactNode, HTMLProps } from 'react';
import { Text } from 'components/atoms/Text';
import { FaCheck } from 'react-icons/fa';
import { Container, Input, Marker } from './Checkbox.styles';

interface CheckboxProps extends Pick<HTMLProps<HTMLInputElement>, 'onChange' | 'id' | 'name'> {
  label: string | ReactNode;
}

const Label: FC<{ children: ReactNode }> = ({ children }) => <Text ml={2}>{children}</Text>;

export const Checkbox: FC<CheckboxProps> = ({ id, name, label, onChange }) => {
  const isLabelString = typeof label === 'string';

  return (
    <Container htmlFor={id}>
      <Input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
      />

      <Marker>
        <FaCheck />
      </Marker>

      {isLabelString ? <Label>{label}</Label> : label}
    </Container>
  );
};
