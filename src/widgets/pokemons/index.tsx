import { FC } from 'react';
import { PokemonList } from '../../entities/pokemon';
import { paginationModel, InfinityScroll } from '../../features';

export const Pokemons: FC = () => {
    return (
        <InfinityScroll callback={paginationModel.loadMore}>
            <PokemonList />
        </InfinityScroll>
    );
};
