export const unsafeCast = {
	ElementToHTMLElement: (node: Element) => node as HTMLElement,
};

export function exhaustiveCheck(param: never, type: string): never {
	throw new TypeError(`${param} is not a proper ${type}`);
}
