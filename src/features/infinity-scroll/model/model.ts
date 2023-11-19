import { createEffect, createEvent, createStore, sample } from 'effector';
import { pokemonModel } from '../../../entities/pokemon';
import { IMAGE_PER_PAGE_LIMIT } from '../../../shared/config';
import { api, Nullable } from '../../../shared/api';

const $offset = createStore(0);
const $count = createStore<Nullable<number>>(null);

const loadMore = createEvent<number>();
const getPokemonListFx = createEffect(async (offset: number) => {
    const { data } = await api.pokemons.getPokemonsList(IMAGE_PER_PAGE_LIMIT, offset);
    return data;
});

sample({
    clock: loadMore,
    source: {
        offset: $offset,
        total: $count,
    },
    filter: ({ offset, total }) => total === null || offset < total,
    fn: ({ offset }) => offset,
    target: getPokemonListFx,
});

sample({
    clock: getPokemonListFx.doneData,
    source: pokemonModel.$pokemonNames,
    fn: (pokemons, { results }) => [...pokemons, ...results],
    target: pokemonModel.$pokemonNames,
});

sample({
    clock: getPokemonListFx.doneData,
    fn: ({ results: pokemons }) => pokemons.map((pokemon) => pokemon.name),
    target: pokemonModel.loadMorePokemons,
});

sample({
    clock: getPokemonListFx.doneData,
    fn: ({ results: pokemons }) => pokemons.map((pokemon) => pokemon.name),
    target: pokemonModel.getPokemonByPage,
});

sample({
    clock: getPokemonListFx.doneData,
    fn: ({ count }) => count,
    target: $count,
});

sample({
    clock: getPokemonListFx.doneData,
    source: $offset,
    fn: (source, { results }) => source + results.length,
    target: $offset,
});

export const model = { loadMore };
