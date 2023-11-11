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
			className={`group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-violet-600 focus:text-white ${
				!segment.isEditable ? "text-gray-500" : "text-gray-800"
			}`}
		>
			<span
				aria-hidden="true"
				className="block w-full text-center italic text-gray-500 group-focus:text-white"
				style={{
					visibility: segment.isPlaceholder ? undefined : "hidden",
					height: segment.isPlaceholder ? undefined : "0",
					pointerEvents: "none",
				}}
			>
				{segment.placeholder}
			</span>
			{segment.isPlaceholder ? "" : segment.text}
		</div>
	);
};
