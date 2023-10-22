import { useParams } from "react-router-dom";
import { Panel } from "ui";

export const Portfolio = () => {
	const { uuid } = useParams<{ uuid: string }>();

	return <Panel>{uuid}</Panel>;
};
