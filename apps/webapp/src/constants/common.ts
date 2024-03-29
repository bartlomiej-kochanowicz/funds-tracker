export const MAX_CASH_ACCOUNTS = 10;
export const MAX_PORTFOLIOS = 10;

export type ColorThemeType = keyof typeof COLOR_THEME;

export const COLOR_THEME = {
	LIGHT: "LIGHT",
	DARK: "DARK",
} as const;

export const EMPTY_VALIDATION_MESSAGE = "‎";
