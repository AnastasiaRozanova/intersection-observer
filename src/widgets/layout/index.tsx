import { PropsWithChildren } from 'react';
import { IconsSprite } from '../../shared/ui';
import styles from './styles.module.scss';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => (
    <div className={styles.pageWrap}>
        {children}

        <IconsSprite />
    </div>
);
