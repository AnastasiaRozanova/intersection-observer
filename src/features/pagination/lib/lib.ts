// eslint-disable-next-line complexity
export const getPagination = (pagesNumber: number, pagesToDisplay: number, activePage: number) => {
    const items = [];

    /* *
     * Если страниц больше одной,
     * то всегда выводим со стрелками
     */
    if (pagesNumber < 2) {
        for (let index = 0; index < pagesNumber; index++) {
            items.push(['page-button', index + 1]);
        }
    }
    /* *
     * Не выводим троеточие,
     * если недостаточно страниц
     */
    if (pagesNumber - pagesToDisplay <= pagesToDisplay && pagesNumber > 2) {
        items.push(['left-button']);
        for (let index = 0; index < pagesNumber; index++) {
            items.push(['page-button', index + 1]);
        }
        items.push(['right-button']);
    } else {
        items.push(['left-button']);

        for (let index = 0; index < pagesNumber; index++) {
            // <- 1 2 3 4 5 ... 15 ->
            if (activePage < pagesToDisplay + 1) {
                if (index + 1 <= pagesToDisplay + 2) {
                    items.push(['page-button', index + 1]);
                    continue;
                }

                if (index + 1 === pagesNumber) {
                    items.push(['empty-button', index], ['page-button', index + 1]);
                    continue;
                }
            }

            // <- 1 ... 7 8 9 ... 15 ->
            if (activePage > pagesToDisplay && activePage < pagesNumber - pagesToDisplay) {
                if (!index || index + 1 === pagesNumber) {
                    items.push(['page-button', index + 1]);
                    continue;
                }

                if (index + 1 === activePage - 2 || index + 1 === activePage + 2) {
                    items.push(['empty-button', index]);
                    continue;
                }

                if (
                    index + 1 === activePage - 1 ||
                    index + 1 === activePage + 1 ||
                    index + 1 === activePage
                ) {
                    items.push(['page-button', index + 1]);
                    continue;
                }
            }

            // <- 1 ... 11 12 13 14 15 ->
            if (activePage >= pagesNumber - pagesToDisplay) {
                if (index + 1 === pagesNumber - pagesToDisplay - 2) {
                    items.push(['page-button', 1], ['empty-button', index]);
                    continue;
                }

                if (index + 1 >= pagesNumber - pagesToDisplay - 2) {
                    items.push(['page-button', index + 1]);
                }
            }
        }

        items.push(['right-button']);
    }

    return items;
};
