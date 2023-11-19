import React, { CSSProperties, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { IconId } from '../svg-sprite';
//@ts-ignore
import styles from './styles.module.scss';

export interface IconProps extends Omit<HTMLAttributes<SVGElement>, 'id'> {
    id?: IconId;
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    fill?: CSSProperties['fill'];
}

export const Icon = React.memo(({ id, style, width, height, fill, className }: IconProps) => {
    if (!id) {
        return null;
    }

    return (
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            className={clsx(styles.svg, className)}
            style={{
                ...style,
                width,
                height,
                fill,
            }}
        >
            <use xlinkHref={`#${id}`} />
        </svg>
    );
});
