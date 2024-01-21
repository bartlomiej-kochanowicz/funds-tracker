import { Avatar as AvatarComponent, AvatarFallback, AvatarImage } from "./Avatar";

type AvatarType = typeof AvatarComponent;

interface IAvatar extends AvatarType {
	Fallback: typeof AvatarFallback;
	Image: typeof AvatarImage;
}

export const Avatar = Object.assign(AvatarComponent, {
	Fallback: AvatarFallback,
	Image: AvatarImage,
}) as IAvatar;
