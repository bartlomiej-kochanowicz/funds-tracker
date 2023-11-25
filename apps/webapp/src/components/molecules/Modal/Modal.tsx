import clsx from "clsx";
import { Heading, Spacer, Spreader } from "components/atoms";
import { ErrorContent } from "components/ErrorContent";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import { X } from "lucide-react";
import { FC, Fragment, ReactNode, useCallback, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import FocusLock from "react-focus-lock";

import { Background, CloseButton, ModalComponent } from "./Modal.styles";

interface ModalComponentProps {
	closeModal: () => void;
	modalName: string;
	children: ReactNode;
}

export const Modal: FC<ModalComponentProps> = ({ closeModal, modalName, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const excludeElements = [
				document.activeElement?.attributes.getNamedItem("aria-expanded")?.value === "true",
				document.activeElement?.attributes.getNamedItem("role")?.value === "menuitem",
				document.activeElement?.attributes.getNamedItem("role")?.value === "option",
			].filter(Boolean);

			if (event.key === "Escape" && !excludeElements.length) {
				event.preventDefault();
				closeModal();
			}
		},
		[closeModal],
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown, true);

		return () => {
			document.removeEventListener("keydown", onKeyDown, true);
		};
	}, [onKeyDown]);

	return (
		<Fragment>
			<Background />

			<FocusLock>
				<div
					data-modal="true"
					aria-labelledby={modalName}
					role="dialog"
					aria-modal="true"
					tabIndex={-1}
					ref={modalRef}
				>
					<ModalComponent>
						<div className={clsx("flex", modalName ? "justify-between" : "justify-end")}>
							{modalName && (
								<Heading
									$level="h2"
									id={modalName}
								>
									{modalName}
								</Heading>
							)}

							<Spreader />

							<CloseButton
								onClick={closeModal}
								aria-label="close"
							>
								<X />
							</CloseButton>
						</div>

						<Spacer $space="0.5" />

						<ErrorBoundary FallbackComponent={ErrorContent}>{children}</ErrorBoundary>
					</ModalComponent>
				</div>
			</FocusLock>
		</Fragment>
	);
};
