import { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = forwardRef<
	React.ElementRef<typeof LabelPrimitiveRoot>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitiveRoot> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitiveRoot
		ref={ref}
		className={twMerge(labelVariants(), className)}
		{...props}
	/>
));

Label.displayName = LabelPrimitiveRoot.displayName;

export { Label };
