import { useLocation } from "react-router-dom";

const compilePath = (path: string, caseSensitive = false, end = true): [RegExp, string[]] => {
	const paramNames: string[] = [];
	let regexpSource = `^${path
		.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
		.replace(/^\/*/, "/") // Make sure it has a leading /
		.replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
		.replace(/\/:(\w+)/g, (_: string, paramName: string) => {
			paramNames.push(paramName);
			return "/([^\\/]+)";
		})}`;

	if (path.endsWith("*")) {
		paramNames.push("*");
		regexpSource +=
			path === "*" || path === "/*"
				? "(.*)$" // Already matched the initial /, just match the rest
				: "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
	} else if (end) {
		// When matching to the end, ignore trailing slashes
		regexpSource += "\\/*$";
	} else if (path !== "" && path !== "/") {
		// If our path is non-empty and contains anything beyond an initial slash,
		// then we have _some_ form of path in our regex so we should expect to
		// match only if we find the end of this path segment.  Look for an optional
		// non-captured trailing slash (to match a portion of the URL) or the end
		// of the path (if we've matched to the end).  We used to do this with a
		// word boundary but that gives false positives on routes like
		// /user-preferences since `-` counts as a word boundary.
		regexpSource += "(?:(?=\\/|$))";
	} else {
		// Nothing to match for "" or "/"
	}

	const matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");

	return [matcher, paramNames];
};

const matchPath = (pattern: string, pathname: string) => {
	const [matcher] = compilePath(pattern);

	const match = pathname.match(matcher);

	if (!match) return false;

	return true;
};

export const useMatches = (patterns: string[]) => {
	const location = useLocation();

	const matches = patterns.some((pattern: string) => matchPath(pattern, location.pathname));

	return matches;
};
