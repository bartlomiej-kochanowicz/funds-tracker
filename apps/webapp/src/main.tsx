import "base";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
