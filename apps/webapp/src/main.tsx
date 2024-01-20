import "base";
import "react-toastify/dist/ReactToastify.css";
import "@funds-tracker/ui/src/index.css";

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
