import "base";
import "@funds-tracker/ui/src/index.css";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/app";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
