type Media = "min" | "max";

export const customMediaQuery = (width: number, type?: Media) =>
	`@media (${type ?? "min"}-width: ${width}px)`;
