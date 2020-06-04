import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('items').insert([
        { title: 'Lampadas', image: 'lampadas.svg' },
        { title: 'Pilhas e baterias', image: 'baterias.svg' },
        { title: 'Papeis e papelao', image: 'papeis-papelao.svg' },
        { title: 'Residuos eletronicos', image: 'eletronicos.svg' },
        { title: 'Residuos Organicos', image: 'lampadas.svg' },
        { title: 'Oleo de Cozinha', image: 'oleo.svg' },
    ]);
}