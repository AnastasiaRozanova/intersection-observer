import React from 'react';
import { clsx } from 'clsx';
import { Button, Icon } from '../../../shared/ui';
import { ButtonProps } from '../lib';
// @ts-ignore
import styles from './styles.module.scss';

export const LeftButton = ({ activePage, onPageChange, disabled }: ButtonProps) => (
    <li className={styles.paginationItem}>
        <Button
            disabled={disabled}
            className={styles.paginationButton}
            onClick={() => onPageChange(activePage - 1)}
        >
            <Icon id="arrow-left" width={20} height={20} />
        </Button>
    </li>
);

export const RightButton = ({ activePage, onPageChange, disabled }: ButtonProps) => (
    <li className={styles.paginationItem}>
        <Button
            disabled={disabled}
            className={styles.paginationButton}
            onClick={() => onPageChange(activePage + 1)}
        >
            <Icon id="arrow-right" width={20} height={20} />
        </Button>
    </li>
);

export const EmptyButton = () => (
    <li className={styles.paginationItem}>
        <Button className={clsx(styles.paginationButton, styles.paginationButtonEmpty)}>
            ...
        </Button>
    </li>
);

export const PageButton = ({
    activePage,
    onPageChange,
    index,
    disabled,
}: ButtonProps & { index: number }) => (
    <li className={styles.paginationItem}>
        <Button
            disabled={disabled}
            onClick={index !== activePage ? () => onPageChange(index) : undefined}
            className={clsx(
                styles.paginationButton,
                index === activePage && styles.paginationButtonActive,
            )}
        >
            {index}
        </Button>
    </li>
);
