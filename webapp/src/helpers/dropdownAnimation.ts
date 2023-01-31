export const dropdownAnimation = (anmimationDirection: number) => ({
  initial: { opacity: 0.5, y: anmimationDirection },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: anmimationDirection },
  transition: { bounce: 0, duration: 0.1 },
});
