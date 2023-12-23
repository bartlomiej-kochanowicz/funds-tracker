import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const { screens } = fullConfig.theme;

export const useTailwindBreakpoint = (name: keyof typeof screens) => {
	const pixels = screens[name];
	const matchMediaQuery = `(min-width: ${pixels})`;
	const [match, setMatch] = useState(window.matchMedia(matchMediaQuery).matches);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMatch(window.matchMedia(matchMediaQuery).matches);
		}
	}, [matchMediaQuery]);

	useEffect(() => {
		const onMatch = (event: MediaQueryListEvent) => setMatch(event.matches);

		const matcher = window.matchMedia(matchMediaQuery);

		if (matcher?.addEventListener) {
			matcher.addEventListener("change", onMatch);
		} else {
			matcher.addListener(onMatch);
		}

		return () => {
			if (matcher?.removeEventListener) {
				matcher.removeEventListener("change", onMatch);
			} else {
				matcher.removeListener(onMatch);
			}
		};
	}, [pixels, matchMediaQuery]);

	return match;
};
