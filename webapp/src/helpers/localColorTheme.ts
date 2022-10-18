import { saveStore, loadStore, removeStore } from 'utils/localStorage';
import type { ColorThemeType } from 'constants/common';

export const setLocalColorTheme = (colorTheme: ColorThemeType) =>
  saveStore(colorTheme, 'colorTheme');
export const removeLocalColorTheme = () => removeStore('colorTheme');
export const getLocalColorTheme = (): ColorThemeType | undefined => loadStore('colorTheme');
