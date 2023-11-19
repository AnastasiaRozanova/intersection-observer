import axios from 'axios';
import { BASE_URL } from '../config';

export type Nullable<T> = null | T;

export type ShortPokemon = {
    name: string;
    url: string;
};

type Paginated<T> = {
    count: number;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: T[];
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const pokemons = {
    getByName: (name: string) => axiosInstance.get(`pokemon/${name}`),
    getPokemonsList: (limit: number, offset: number) =>
        axiosInstance.get<Paginated<ShortPokemon>>(`pokemon/`, {
            params: {
                limit,
                offset,
            },
        }),
};

export const api = {
    pokemons,
};
