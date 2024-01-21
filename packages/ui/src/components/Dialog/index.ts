import {
	Dialog as DialogComponent,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "./Dialog";

type DialogType = typeof DialogComponent;

interface IDialog extends DialogType {
	Close: typeof DialogClose;
	Content: typeof DialogContent;
	Description: typeof DialogDescription;
	Footer: typeof DialogFooter;
	Header: typeof DialogHeader;
	Overlay: typeof DialogOverlay;
	Portal: typeof DialogPortal;
	Title: typeof DialogTitle;
	Trigger: typeof DialogTrigger;
}

export const Dialog = Object.assign(DialogComponent, {
	Close: DialogClose,
	Content: DialogContent,
	Description: DialogDescription,
	Footer: DialogFooter,
	Header: DialogHeader,
	Overlay: DialogOverlay,
	Portal: DialogPortal,
	Title: DialogTitle,
	Trigger: DialogTrigger,
}) as IDialog;
