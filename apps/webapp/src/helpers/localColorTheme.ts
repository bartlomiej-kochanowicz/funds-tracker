import type { ColorThemeType } from "constants/common";
import { loadStore, removeStore, saveStore } from "utils/localStorage";

export const setLocalColorTheme = (colorTheme: ColorThemeType) =>
	saveStore(colorTheme, "colorTheme");
export const removeLocalColorTheme = () => removeStore("colorTheme");
export const getLocalColorTheme = (): ColorThemeType | undefined => loadStore("colorTheme");
