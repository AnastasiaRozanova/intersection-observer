import React, { PropsWithChildren, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '../../button';
//@ts-ignore
import styles from './styles.module.scss';

interface TabsProps extends PropsWithChildren {
    className?: string;
    navClassName?: string;
}

export const Tabs = ({ children, className, navClassName }: TabsProps) => {
    const [active, setActive] = useState(0);

    return (
        <div className={clsx(styles.tabs, className)}>
            <nav className={clsx(styles.tabsHead, navClassName)}>
                <div className={styles.tabsNav}>
                    {React.Children.map(children, (child, index) => {
                        if (!React.isValidElement(child)) {
                            return null;
                        }

                        return (
                            <Button
                                id={child.props.id}
                                className={clsx(styles.tabsButton, {
                                    [styles.isActive]: active === index,
                                })}
                                onClick={() => setActive(index)}
                                theme="text"
                                size="small"
                            >
                                {child.props.label}
                            </Button>
                        );
                    })}
                </div>
            </nav>

            <div className={styles.tabsContent}>{React.Children.toArray(children)[active]}</div>
        </div>
    );
};
