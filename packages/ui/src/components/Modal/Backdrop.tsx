import { motion } from "framer-motion";
import { forwardRef, MouseEventHandler, ReactNode } from "react";

interface BackdropProps {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
	({ children, onClick, ...rest }, ref) => (
		<motion.div
			ref={ref}
			onClick={onClick}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm backdrop-filter"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			{...rest}
		>
			{children}
		</motion.div>
	),
);
