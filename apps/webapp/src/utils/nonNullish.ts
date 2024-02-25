export const validateNonNullish = (value: any | any[]): boolean => {
	if (Array.isArray(value)) {
		return value.map(v => validateNonNullish(v)).every(v => v);
	}

	return value !== null && value !== undefined;
};
