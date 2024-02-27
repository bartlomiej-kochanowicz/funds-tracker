import {
	Drawer as DrawerComponent,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "./Drawer";

type DrawerType = typeof DrawerComponent;

interface IDrawer extends DrawerType {
	Close: typeof DrawerClose;
	Content: typeof DrawerContent;
	Description: typeof DrawerDescription;
	Footer: typeof DrawerFooter;
	Header: typeof DrawerHeader;
	Overlay: typeof DrawerOverlay;
	Portal: typeof DrawerPortal;
	Title: typeof DrawerTitle;
	Trigger: typeof DrawerTrigger;
}

export const Drawer = Object.assign(DrawerComponent, {
	Close: DrawerClose,
	Content: DrawerContent,
	Description: DrawerDescription,
	Footer: DrawerFooter,
	Header: DrawerHeader,
	Overlay: DrawerOverlay,
	Portal: DrawerPortal,
	Title: DrawerTitle,
	Trigger: DrawerTrigger,
}) as IDrawer;
