import { createEffect, createEvent, createStore, sample } from 'effector';
import { api, ShortPokemon } from '../../shared/api';

const $pokemons = createStore<Record<string, any>[]>([]);

const getPokemon = createEvent<string>();

const getPokemonByPage = createEvent<string[]>();
const loadMorePokemons = createEvent<string[]>();
const $pokemonsArray = createStore<string[] | []>([]);

const getPokemonImagesFx = createEffect(async (array: string[]) => {
    array.forEach((item) => getPokemonFx(item));
});

sample({
    clock: [getPokemonByPage, loadMorePokemons],
    target: $pokemonsArray,
});

sample({
    clock: getPokemonByPage,
    fn: () => [],
    target: $pokemons,
});

sample({
    clock: $pokemonsArray,
    target: getPokemonImagesFx,
});

const getPokemonFx = createEffect(async (name: string) => {
    const { data } = await api.pokemons.getByName(name);
    return data;
});

sample({
    clock: getPokemon,
    target: getPokemonFx,
});

sample({
    clock: getPokemonFx.doneData,
    source: $pokemons,
    fn: (source, clock) => [...source, clock],
    target: $pokemons,
});

const $pokemonNames = createStore<ShortPokemon[]>([]);

export const model = {
    $pokemons,
    getPokemon,
    $pokemonNames,
    getPokemonByPage,
    loadMorePokemons,
};
