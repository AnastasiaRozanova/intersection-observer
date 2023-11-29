import React from 'react';
import { Skeleton } from '../../../shared/ui';
import styles from '../styles.module.scss';

type PokemonProps = {
    image: string;
    name: string;
    id: string;
};

export const Pokemon = ({ image, name, id }: PokemonProps) => (
    <div className={styles.pokemonWrapper} id={id}>
        {Boolean(image) && <img src={image} alt={name} className={styles.pokemonImage} />}
        {Boolean(!image) && <Skeleton width="100%" maxWidth="100px" height="84.5px" />}

        <p>{name}</p>
    </div>
);
