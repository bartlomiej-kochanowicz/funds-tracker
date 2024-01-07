import { Panel } from "@funds-tracker/ui";
import { useParams } from "react-router-dom";

export const Portfolio = () => {
	const { uuid } = useParams<{ uuid: string }>();

	return <Panel>{uuid}</Panel>;
};
