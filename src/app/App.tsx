import React from 'react';
import { Layout, PaginatedPokemons, Pokemons } from '../widgets';
import { Tab, Tabs } from '../shared/ui';
import styles from './styles.module.scss';

function App() {
	return (
			<Layout>
				<Tabs navClassName={styles.stickyNav}>
					<Tab label="Бесконечный скролл">
						<Pokemons />
					</Tab>
					<Tab label="Пагинация">
						<PaginatedPokemons />
					</Tab>
				</Tabs>
			</Layout>
	);
}

export default App;
