import { useList } from 'effector-react';
import { pokemonModel } from '../index';
import { Pokemon } from './pokemon';
import React, { FC } from 'react';

export const PokemonList: FC = () => {
    const pokemons = useList(pokemonModel.$pokemons, (item) => (
        <Pokemon image={item.sprites.other.dream_world.front_default} name={item.name} id={'9'} />
    ));
    return pokemons;
};
