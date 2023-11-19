import { useEffect, RefObject } from "react";

export const useIntersectionObserser = (ref: RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const { current: element } = ref;
		if (element) {
			const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting) {
							callback();
						}
					},
					{ threshold: 0 },
			);
			observer.observe(element);
			return () => observer.unobserve(element);
		}
	}, []);
}
