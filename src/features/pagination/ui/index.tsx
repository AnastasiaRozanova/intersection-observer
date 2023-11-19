import React, { forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { Button } from '../../../shared/ui';
import { EmptyButton, LeftButton, PageButton, RightButton } from './button-types';
import { AccountPaginationProps, getPagination } from '../lib';
import { model } from '../model/model';
// @ts-ignore
import styles from './styles.module.scss';

const PAGES_TO_DISPLAY = 3;

export const Pagination = forwardRef<HTMLDivElement, AccountPaginationProps>(
    ({ total, perPage, activePage, loadedNotifications, className }, ref) => {
        const pagesNumber = useMemo(
            () => (total ? Math.ceil(total / perPage) : 1),
            [total, perPage],
        );

        if (pagesNumber === 1) {
            return null;
        }

        return (
            <div className={clsx(styles.paginationWrap, className)} ref={ref}>
                <Button
                    size="medium"
                    theme="primary"
                    onClick={() => model.loadMore(activePage + 1)}
                    className={styles.showMoreButton}
                    disabled={loadedNotifications === total || activePage === pagesNumber}
                >
                    Показать ещё
                </Button>

                <ul className={styles.paginationList}>
                    {getPagination(pagesNumber, PAGES_TO_DISPLAY, activePage).map((page) => {
                        switch (page[0]) {
                            case 'left-button':
                                return (
                                    <LeftButton
                                        key={page[0]}
                                        disabled={activePage === 1}
                                        activePage={activePage}
                                        onPageChange={model.getPokemonsByPage}
                                    />
                                );
                            case 'right-button':
                                return (
                                    <RightButton
                                        key={page[0]}
                                        disabled={activePage === pagesNumber}
                                        activePage={activePage}
                                        onPageChange={model.getPokemonsByPage}
                                        pagesNumber={pagesNumber}
                                    />
                                );
                            case 'empty-button':
                                return <EmptyButton key={page[0] + page[1]} />;
                            case 'page-button':
                                return (
                                    <PageButton
                                        key={page[1]}
                                        activePage={activePage}
                                        index={page[1] as number}
                                        onPageChange={model.getPokemonsByPage}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </ul>
            </div>
        );
    },
);
