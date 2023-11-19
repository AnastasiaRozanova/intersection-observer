import React, { CSSProperties, FC, useMemo } from 'react';
import { clsx } from 'clsx';
//@ts-ignore
import styles from './styles.module.scss';

interface SkeletonProps {
    display?: CSSProperties['display'];
    position?: CSSProperties['position'];
    maxWidth: CSSProperties['maxWidth'];
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    margin?: CSSProperties['margin'];
    radius?: CSSProperties['borderRadius'];
    top?: CSSProperties['top'];
    delay?: number;
    className?: string;
    aspectRatio?: number;
}

export const Skeleton: FC<SkeletonProps> = ({
    display,
    position,
    maxWidth,
    width,
    height,
    margin,
    radius,
    top,
    delay,
    className,
    aspectRatio,
}) => {
    const css = useMemo(
        () => ({
            display,
            position,
            maxWidth,
            width,
            height: aspectRatio ? 'auto' : height,
            margin,
            top,
            borderRadius: radius,
            animationDelay: `${delay}ms`,
        }),
        [display, position, width, height, margin, delay, top, radius, aspectRatio],
    );

    return (
        <div className={clsx(className, styles.skeleton)} style={css}>
            {aspectRatio && (
                <span className={styles.spacer} style={{ paddingBottom: `${aspectRatio}%` }} />
            )}
        </div>
    );
};
