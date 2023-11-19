import { Nullable } from '../../../shared/api';

export interface ButtonProps {
    activePage: number;
    onPageChange: (activePage: number) => void;
    pagesNumber?: number;
    disabled?: boolean;
}

export interface AccountPaginationProps {
    total: Nullable<number>;
    perPage: number;
    activePage: number;
    loadedNotifications?: number;
    className?: string;
}
