import instruments from "../instruments";

export default instruments.map(instrument => ({
	value: instrument,
	label: `selectors.instruments.${instrument}`,
}));
