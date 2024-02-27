import { useTailwindBreakpoint } from "../../hooks/useTailwindBreakpoint";
import { Dialog, IDialog } from "../Dialog";
import { Drawer, IDrawer } from "../Drawer";

export const responsiveDialog: () => IDialog | IDrawer = () => {
	const isMd = useTailwindBreakpoint("md");

	return isMd ? Dialog : Drawer;
};
