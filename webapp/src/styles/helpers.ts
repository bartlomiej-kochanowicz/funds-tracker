import { DefaultTheme } from 'styled-components';

export const borderColor = ({
  isDark,
  $error,
}: {
  isDark: boolean;
  $error: boolean;
}): keyof DefaultTheme['colors'] => {
  if ($error) {
    return 'error';
  }

  return isDark ? 'text' : 'gray300';
};
