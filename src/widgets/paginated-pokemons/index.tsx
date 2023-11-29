import React, { FC, useLayoutEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import { Pagination, paginationModel } from '../../features';
import { PokemonList } from '../../entities/pokemon';
import { IMAGE_PER_PAGE_LIMIT } from '../../shared/config';
import { Loader } from '../../shared/ui';
import styles from './styles.module.scss';

export const PaginatedPokemons: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [total, activePage, loadMoreStatus, getPokemonsByPageStatus] = useUnit([
        paginationModel.$count,
        paginationModel.$activePage,
        paginationModel.$loadMoreStatus,
        paginationModel.$getPokemonsByPageStatus
    ]);

    useLayoutEffect(() => {
        function scrollHandler(this: any) {
            if (ref.current) {
                ref.current.classList.toggle(styles.isScroll, this.scrollY > 108);
            }
        }

        window.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [ref]);

    const isLoading = loadMoreStatus === 'pending' || getPokemonsByPageStatus === 'pending';

    return (
        <>
            <Pagination
                ref={ref}
                total={total}
                activePage={activePage}
                perPage={IMAGE_PER_PAGE_LIMIT}
                className={styles.paginationSticky}
            />

            {isLoading ? (
                <div className={styles.loaderWrap}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.pokemonList}>
                    <PokemonList />
                </div>
             )}
        </>
    );
};
