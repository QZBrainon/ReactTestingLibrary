import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

test('Teste se a página contém um heading `h2` com o texto About Pokédex', () => {
  const headingEl = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(headingEl).toBeInTheDocument();
});

test('Contém 2 paragráfos com texto sobre Pokedéx', () => {
  const firstP = screen.getByText(/This application simulates a Pokédex/i);
  const secondP = screen.getByText(/One can filter Pokémons by type/i);
  expect(firstP).toBeInTheDocument();
  expect(secondP).toBeInTheDocument();
});

test('Imagem possui URL determinada', () => {
  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const pokedexImg = screen.getByRole('img');
  expect(pokedexImg).toHaveAttribute('src', url);
});
