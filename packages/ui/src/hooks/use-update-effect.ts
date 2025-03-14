/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return  */
import { DependencyList, EffectCallback, useEffect } from "react";

import { useIsFirstRender } from "./use-is-first-render";

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const isFirst = useIsFirstRender();

	useEffect(() => {
		if (!isFirst) {
			return effect();
		}
	}, deps);
};

export { useUpdateEffect };
