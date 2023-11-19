import { clsx } from 'clsx';
import { useRef, useEffect } from 'react';
import { useIntersectionObserser } from '../../shared/hooks';
//@ts-ignore
import styles from './styles.module.scss';

type AnimationProps = {
	isInView: boolean;
	callback: () => void;
}

export const Animation = ({ isInView, callback }: AnimationProps) => {
	const divRef = useRef<HTMLDivElement>(null);

	useIntersectionObserser(divRef, callback);

	return (
			<div className={styles.animationWrap} ref={divRef}>
				<div className={clsx(styles.box, isInView && styles.box_animate_2)}>
					<div>Кликни и начнется анимация</div>
				</div>
			</div>
	)
}
