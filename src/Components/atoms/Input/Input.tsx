import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  id: string;
  name: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
}

export const Input = ({ label, id, name, value, onChange, defaultValue }: InputProps) => (
  <label htmlFor={id}>
    <span>{label}</span>

    <input
      type="text"
      name={name}
      id={id}
      {...(value && onChange ? { value, onChange } : {})}
      {...(defaultValue ? { defaultValue } : {})}
    />
  </label>
);

Input.displayName = 'Input';

Input.defaultProps = { value: null, onChange: null, defaultValue: null };
