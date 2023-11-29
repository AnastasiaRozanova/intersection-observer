import React, { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export interface TabProps extends PropsWithChildren {
    id?: string | number;
    label?: React.ReactNode;
    href?: string;
}

export const Tab: FC<TabProps> = ({ id, children }) => (
    <section
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab`}
        className={styles.tabPanel}
    >
        {children}
    </section>
);
