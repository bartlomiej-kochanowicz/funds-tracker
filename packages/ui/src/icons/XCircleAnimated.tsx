import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const XCircleanimated = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={twMerge(className, "lucide lucide-x-circle")}
		{...rest}
	>
		<motion.circle
			cx="12"
			cy="12"
			r="10"
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 0.1 }}
		/>
		<motion.path
			d="m15 9-6 6"
			initial={{ opacity: 0, pathLength: 0 }}
			animate={{ opacity: 1, pathLength: 1 }}
			transition={{ delay: 0.3, duration: 0.3 }}
		/>
		<motion.path
			d="m9 9 6 6"
			initial={{ opacity: 0, pathLength: 0 }}
			animate={{ opacity: 1, pathLength: 1 }}
			transition={{ delay: 0.6, duration: 0.5 }}
		/>
	</svg>
);
