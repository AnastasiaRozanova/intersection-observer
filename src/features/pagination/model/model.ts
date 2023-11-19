import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { status } from 'patronum';

import { pokemonModel } from '../../../entities/pokemon';
import { IMAGE_PER_PAGE_LIMIT } from '../../../shared/config';
import { api, Nullable } from '../../../shared/api';

const Gate = createGate();

const $offset = createStore(0);
const $activePage = createStore(Math.ceil($offset.getState() / IMAGE_PER_PAGE_LIMIT));
const $count = createStore<Nullable<number>>(null);

const getPokemons = async (offset: number) => {
    const { data } = await api.pokemons.getPokemonsList(IMAGE_PER_PAGE_LIMIT, offset);

    return data;
};

const getPokemonsByPage = createEvent<number>();
const getPokemonsByPageFx = createEffect(getPokemons);
const $getPokemonsByPageStatus = status({ effect: getPokemonsByPageFx });

const loadMore = createEvent<number>();
const loadMoreFx = createEffect(getPokemons);
const $loadMoreStatus = status({ effect: loadMoreFx });

sample({
    clock: Gate.open,
    fn: () => IMAGE_PER_PAGE_LIMIT,
    target: getPokemonsByPage,
});

sample({
    clock: loadMore,
    source: {
        offset: $offset,
        total: $count,
    },
    filter: ({ offset, total }) => total === null || offset < total,
    fn: ({ offset }) => offset,
    target: loadMoreFx,
});

sample({
    clock: loadMoreFx.doneData,
    source: pokemonModel.$pokemonNames,
    fn: (pokemons, { results }) => [...pokemons, ...results],
    target: pokemonModel.$pokemonNames,
});

sample({
    clock: loadMoreFx.doneData,
    fn: ({ results: pokemons }) => pokemons.map((pokemon) => pokemon.name),
    target: pokemonModel.loadMorePokemons,
});

sample({
    clock: $offset,
    fn: (offset) => Math.ceil(offset / IMAGE_PER_PAGE_LIMIT),
    target: $activePage,
});

sample({
    clock: getPokemonsByPage,
    fn: (page) => (page - 1) * IMAGE_PER_PAGE_LIMIT,
    target: [getPokemonsByPageFx, $offset],
});

sample({
    clock: getPokemonsByPageFx.doneData,
    fn: ({ results }) => results,
    target: pokemonModel.$pokemonNames,
});

sample({
    clock: getPokemonsByPageFx.doneData,
    fn: ({ results: pokemons }) => pokemons.map((pokemon) => pokemon.name),
    target: pokemonModel.getPokemonByPage,
});

sample({
    clock: [getPokemonsByPageFx.doneData, loadMoreFx.doneData],
    fn: ({ count }) => count,
    target: $count,
});

sample({
    clock: [getPokemonsByPageFx.doneData, loadMoreFx.doneData],
    source: $offset,
    fn: (source, { results }) => {
        return source + results.length;
    },
    target: $offset,
});

export const model = {
    loadMore,
    getPokemonsByPage,
    $count,
    $activePage,
    $getPokemonsByPageStatus,
    $loadMoreStatus
};
