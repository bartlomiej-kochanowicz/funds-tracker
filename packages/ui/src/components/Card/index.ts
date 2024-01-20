import {
	Card as CardComponent,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./Card";

type CardType = typeof CardComponent;

interface ICard extends CardType {
	Content: typeof CardContent;
	Description: typeof CardDescription;
	Footer: typeof CardFooter;
	Header: typeof CardHeader;
	Title: typeof CardTitle;
}

export const Card = Object.assign(CardComponent, {
	Content: CardContent,
	Description: CardDescription,
	Footer: CardFooter,
	Header: CardHeader,
	Title: CardTitle,
}) as ICard;
