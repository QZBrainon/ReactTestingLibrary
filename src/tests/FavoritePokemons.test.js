import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

test('testa se a mensagem No favorite pokemon found aparece', () => {
  renderWithRouter(<FavoritePokemons />);
  const textEl = screen.getByText(/No favorite pokemon found/i);
  expect(textEl).toBeInTheDocument();
});

test('Os pokemons favoritados aparecem na tela', () => {
  const pokemon = pokemons[0];
  renderWithRouter(<FavoritePokemons pokemons={ [pokemon] } />);
  const pkmName = screen.getByText('Pikachu');
  expect(pkmName).toBeInTheDocument();
});
