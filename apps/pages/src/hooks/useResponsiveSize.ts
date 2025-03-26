import { useWindowWidth } from ".";

export const useResponsiveSize = () => {
	const width = useWindowWidth();

	const getBreakpoint = (w: number) => {
		if (w >= 1536) return "2xl";
		if (w >= 1280) return "xl";
		if (w >= 1024) return "lg";
		if (w >= 768) return "md";
		if (w >= 640) return "sm";
		return "xs";
	};

	return { width, breakpoint: getBreakpoint(width) };
};