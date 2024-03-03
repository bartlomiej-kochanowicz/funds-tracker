import {
	AlertDialog as AlertDialogComponent,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./AlertDialog";

type AlertDialogType = typeof AlertDialogComponent;

interface IAlertDialog extends AlertDialogType {
	Action: typeof AlertDialogAction;
	Cancel: typeof AlertDialogCancel;
	Content: typeof AlertDialogContent;
	Description: typeof AlertDialogDescription;
	Footer: typeof AlertDialogFooter;
	Header: typeof AlertDialogHeader;
	Overlay: typeof AlertDialogOverlay;
	Portal: typeof AlertDialogPortal;
	Title: typeof AlertDialogTitle;
	Trigger: typeof AlertDialogTrigger;
}

export const Card = Object.assign(AlertDialogComponent, {
	Action: AlertDialogAction,
	Cancel: AlertDialogCancel,
	Content: AlertDialogContent,
	Description: AlertDialogDescription,
	Footer: AlertDialogFooter,
	Header: AlertDialogHeader,
	Overlay: AlertDialogOverlay,
	Portal: AlertDialogPortal,
	Title: AlertDialogTitle,
	Trigger: AlertDialogTrigger,
}) as IAlertDialog;
