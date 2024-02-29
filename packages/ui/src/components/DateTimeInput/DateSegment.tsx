import { useDateSegment } from "@react-aria/datepicker";
import { DateFieldState, DateSegment as DateSegmentType } from "@react-stately/datepicker";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface DateSegmentProps {
	segment: DateSegmentType;
	state: DateFieldState;
}

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
	const ref = useRef(null);
	const { segmentProps } = useDateSegment(segment, state, ref);

	const { isPlaceholder } = segment;

	return (
		<div
			{...segmentProps}
			ref={ref}
			className={twMerge(
				"rounded focus-visible:text-white focus-visible:bg-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
				isPlaceholder && "text-muted-foreground",
			)}
		>
			{segment.text}
		</div>
	);
};
