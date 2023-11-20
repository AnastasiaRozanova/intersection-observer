import { clsx } from 'clsx';
import { useRef, useEffect } from 'react';
import { useIntersectionObserser } from '../../shared/hooks';
//@ts-ignore
import styles from './styles.module.scss';

export const Animation = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);

	const callback = () => boxRef.current?.classList.add('animate');
	const elseCallback = () => boxRef.current?.classList.remove('animate');

	useIntersectionObserser(divRef, callback, elseCallback);

	return (
			<div className={styles.animationWrap} ref={divRef}>
				<div className={styles.box} ref={boxRef} />
			</div>
	)
}
