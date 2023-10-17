import { darken, transparentize } from "color2k";
import { breakpoints } from "constants/breakpoints";
import { customMediaQuery } from "helpers/customMediaQuery";
import { rem } from "helpers/units";

export const Colors = {
	Green: "#7DCAC7",
	Blue: "#3F8CFF",
	Error: "#e74c3c",
	Success: "#07bc0c",
	Black: "#333333",
	White: "#ffffff",
	Gray500: "#4b4b4b",
	Gray400: "#666666",
	Gray300: "#7e7e7e",
	Gray200: "#e5e5e5",
	Gray100: "#f9f9fa",
	Transparent: "transparent",
	Background: "#f9f9fa",
};

export const theme = {
	isDark: false,
	colors: {
		green: Colors.Green,
		blue: Colors.Blue,
		error: Colors.Error,
		success: Colors.Success,
		black: Colors.Black,
		white: Colors.White,
		gray500: Colors.Gray500,
		gray400: Colors.Gray400,
		gray300: Colors.Gray300,
		gray200: Colors.Gray200,
		gray100: Colors.Gray100,
		text: Colors.Black,
		transparent: Colors.Transparent,
		background: Colors.Gray100,
		mobileTransparent: transparentize(Colors.Gray200, 0.4),
	},
	breakpoints: {
		desktopPlus: {
			min: customMediaQuery(breakpoints.desktopPlus),
			max: customMediaQuery(breakpoints.desktopPlus, "max"),
		},
		desktop: {
			min: customMediaQuery(breakpoints.desktop),
			max: customMediaQuery(breakpoints.desktop, "max"),
		},
		tablet: {
			min: customMediaQuery(breakpoints.tablet),
			max: customMediaQuery(breakpoints.tablet, "max"),
		},
		phone: {
			min: customMediaQuery(breakpoints.phone),
			max: customMediaQuery(breakpoints.phone, "max"),
		},
	},
	button: {
		size: {
			small: {
				fontSize: rem(0.75),
				lineHeigth: rem(1.25),
			},
			medium: {
				fontSize: rem(1),
				lineHeigth: rem(1.5),
			},
			large: {
				fontSize: rem(1.25),
				lineHeigth: rem(1.5),
			},
		},
		color: {
			primary: {
				background: Colors.Blue,
				font: Colors.White,
			},
			secondary: { background: Colors.Black, font: Colors.White },
			tertiary: { background: Colors.Gray300, font: Colors.White },
			error: {
				background: Colors.Error,
				font: Colors.White,
			},
			success: {
				background: Colors.Success,
				font: Colors.White,
			},
		},
	},
	padding: {
		tiny: `${rem(0.188)} ${rem(0.5)}`,
		tinyX: `0 ${rem(0.5)}`,
		tinyY: `${rem(0.188)} 0`,
		small: `${rem(0.25)} ${rem(0.75)}`,
		smallX: `0 ${rem(0.75)}`,
		smallY: `${rem(0.25)} 0`,
		medium: `${rem(0.5)} ${rem(1.25)}`,
		mediumX: `0 ${rem(1.25)}`,
		mediumY: `${rem(0.5)} 0`,
		large: `${rem(0.75)} ${rem(1.5)}`,
		largeX: `0 ${rem(1.5)}`,
		largeY: `${rem(0.75)} 0`,
		huge: `${rem(1.75)} ${rem(3)}`,
		hugeX: `0 ${rem(3)}`,
		hugeY: `${rem(1.75)} 0`,
	},
	font: {
		weight: {
			"400": "400",
			"500": "500",
			"700": "700",
		},
		size: {
			"0.75": rem(0.75),
			"0.875": rem(0.875),
			"1": rem(1),
			"1.25": rem(1.25),
			"1.5": rem(1.5),
			"2.5": rem(2.5),
		},
	},
	radius: {
		"0.7": rem(0.7),
		"6.25": rem(6.25),
		"1.25": rem(1.25),
		"0.375": rem(0.375),
	},
	loader: {
		size: {
			small: rem(1),
			medium: rem(1.5),
			large: rem(2),
		},
	},
	spacing: {
		"0.1": rem(0.1),
		"0.25": rem(0.25),
		"0.5": rem(0.5),
		"1": rem(1),
		"1.5": rem(1.5),
		"3.5": rem(3.5),
	},
	heading: {
		h1: { fontSize: rem(2.5) },
		h2: { fontSize: rem(1.5) },
		h3: { fontSize: rem(1.25) },
		h4: { fontSize: rem(1.25) },
		h5: {
			fontSize: rem(1.25),
		},
		h6: {
			fontSize: rem(1.25),
		},
	},
	shadows: {
		box: `0px 6px 10px 0px ${transparentize(Colors.Gray300, 0.86)},
          0px 1px 18px 0px  ${transparentize(Colors.Gray300, 0.88)},
      0px 3px 5px -1px ${transparentize(Colors.Gray300, 0.8)}`,
	},
	gradients: {
		blue: `linear-gradient(133deg, ${darken(Colors.Blue, 0.15)} 0%, ${Colors.Blue} 75%)`,
	},
	zIndex: {
		sidebar: 2,
		mobileNavigation: 1,
		topbar: 1,
		menu: {
			default: 3,
			modal: 101,
		},
		modal: {
			background: 100,
			modal: 101,
		},
	},
	transition: {
		primary: "0.3s ease-in-out",
	},
};

const darkColors = {
	green: Colors.Green,
	blue: Colors.Blue,
	error: Colors.Error,
	success: Colors.Success,
	black: Colors.Black,
	white: Colors.White,
	gray500: Colors.Gray100,
	gray400: Colors.Gray200,
	gray300: Colors.Gray300,
	gray200: Colors.Gray400,
	gray100: Colors.Gray500,
	text: Colors.White,
	transparent: Colors.Transparent,
	mobileTransparent: transparentize(Colors.Gray400, 0.3),
	background: Colors.Black,
};

export const darkTheme = {
	...JSON.parse(JSON.stringify(theme)),
	isDark: true,
	colors: darkColors,
	shadows: {
		box: `0px 6px 10px 0px ${transparentize(darken(Colors.Gray500, 0.15), 0.86)},
          0px 1px 18px 0px ${transparentize(darken(Colors.Gray500, 0.15), 0.88)},
		      0px 3px 5px -1px ${transparentize(darken(Colors.Gray500, 0.15), 0.8)}`,
	},
	button: {
		...JSON.parse(JSON.stringify(theme.button)),
		color: {
			...JSON.parse(JSON.stringify(theme.button.color)),

			secondary: { background: Colors.White, font: Colors.Black },
		},
	},
} as typeof theme;