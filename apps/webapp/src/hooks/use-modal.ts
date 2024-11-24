import { useLocation } from "react-router";

type Props = {
	to: string;
};

const useModal = ({ to }: Props) => {
	const background = useLocation();

	return {
		to,
		state: {
			background,
		},
	};
};

export { useModal };
