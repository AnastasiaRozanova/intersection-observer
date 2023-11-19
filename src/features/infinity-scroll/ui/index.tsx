import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { useIntersectionObserser } from '../../../shared/hooks';
// @ts-ignore
import styles from './styles.module.scss';

type InfinityScrollProps = {
    callback: () => void;
} & PropsWithChildren;

export const InfinityScroll: FC<InfinityScrollProps> = ({ children, callback }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useIntersectionObserser(divRef, callback);

    return (
        <div className={styles.layout}>
            {children}
            <div ref={divRef} className={styles.intersection} />
        </div>
    );
};
