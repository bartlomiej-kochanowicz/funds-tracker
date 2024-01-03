import { Profile } from "../Profile";

export const Topbar = () => (
	<header className="sticky inset-x-0 top-0 z-10 flex w-full flex-wrap border-b border-gray-300 bg-white py-2.5 text-sm dark:border-neutral-700 dark:bg-zinc-800 sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64">
		<nav className="mx-auto flex w-full basis-full items-center justify-end px-4 sm:px-6 md:px-8">
			<Profile />
		</nav>
	</header>
);
