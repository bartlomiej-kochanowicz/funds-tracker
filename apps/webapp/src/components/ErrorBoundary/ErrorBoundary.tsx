import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
	{ children: ReactNode; fallback: ReactNode },
	{ hasError: boolean }
> {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { fallback, children } = this.props;
		const { hasError } = this.state;

		if (hasError) {
			return fallback;
		}

		return children;
	}
}
