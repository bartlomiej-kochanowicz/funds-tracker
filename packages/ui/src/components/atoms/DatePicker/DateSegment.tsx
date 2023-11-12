import clsx from "clsx";
import { useRef } from "react";
import { useDateSegment } from "react-aria";
import { DateFieldState, type DateSegment as DateSegmentType } from "react-stately";

interface DateSegmentProps {
	segment: DateSegmentType;
	state: DateFieldState;
}

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { segmentProps } = useDateSegment(segment, state, ref);

	return (
		<div
			{...segmentProps}
			ref={ref}
			style={{
				...segmentProps.style,
				minWidth: segment.maxValue != null ? `${String(segment.maxValue).length}ch` : undefined,
			}}
			className={clsx(
				"group box-content rounded-md px-0.5 text-right tabular-nums outline-none focus:bg-blue-500 focus:text-white",
				!segment.isEditable ? "text-gray-500" : "text-gray-800",
			)}
		>
			<span
				aria-hidden="true"
				className={clsx(
					"pointer-events-none block w-full text-center text-gray-500 group-focus:text-white",
					!segment.isPlaceholder && "invisible h-0",
				)}
			>
				{segment.placeholder}
			</span>
			{segment.isPlaceholder ? "" : segment.text}
		</div>
	);
};
