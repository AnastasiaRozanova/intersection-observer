import { HTMLAttributes, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    theme?: string;
    isOutLined?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Button = ({
    theme,
    size = 'medium',
    isOutLined,
    onClick,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) => (
    <button
        className={clsx(
            styles.button,
            theme && styles[theme],
            size && styles[size],
            isOutLined && styles.outlined,
            disabled && styles.disabled,
            className,
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
);
