import { useUnit } from 'effector-react';
import { FC } from 'react';
import { PokemonList } from '../../entities/pokemon';
import { paginationModel, InfinityScroll, Animation } from '../../features';
import { model } from '../../features/animation/model';

export const Pokemons: FC = () => {
    const inViewNumber = useUnit(model.$inViewNumber);

    console.log(`This block was in view ${inViewNumber} times`);

    return (
        <>
          <Animation />
          <InfinityScroll callback={paginationModel.loadMore}>
            <PokemonList />
          </InfinityScroll>
        </>
    )
};
