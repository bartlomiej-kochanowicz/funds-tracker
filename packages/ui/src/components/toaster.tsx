import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/src/components/toast";
import { ToasterToast } from "@/src/hooks/use-toast";

type Props = {
	toasts: ToasterToast[];
};

const Toaster = ({ toasts }: Props) => (
	<ToastProvider>
		{toasts.map(({ id, title, description, action, ...props }) => (
			<Toast
				key={id}
				{...props}
			>
				<div className="grid gap-1">
					{title && <ToastTitle>{title}</ToastTitle>}
					{description && <ToastDescription>{description}</ToastDescription>}
				</div>
				{action}
				<ToastClose />
			</Toast>
		))}
		<ToastViewport />
	</ToastProvider>
);

export { Toaster };
