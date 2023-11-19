import { FC, PropsWithChildren, useEffect, useRef } from 'react';
// @ts-ignore
import styles from './styles.module.scss';

type InfinityScrollProps = {
    callback: () => void;
} & PropsWithChildren;

export const InfinityScroll: FC<InfinityScrollProps> = ({ children, callback }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { current: element } = divRef;
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

    return (
        <div className={styles.layout}>
            {children}
            <div ref={divRef} style={{ width: '100%', height: '2px', background: 'red' }} />
        </div>
    );
};
