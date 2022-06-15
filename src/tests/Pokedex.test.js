import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ false }
  />);
});

test('Testa se o texto Encountered pokémons aparece na tela', () => {
  const titleEl = screen.getByRole('heading',
    { name: /Encountered pokémons/i, level: 2 });
  expect(titleEl).toBeInTheDocument();
});

test('Testa se o botao com nome Proximo pokemon aparece na tela', () => {
  const buttonEl = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(buttonEl).toBeInTheDocument();
});

test('Testa se os proximos pokemons sao mostrados um a um ao clicar no botao', () => {
  pokemons.forEach((pokemon) => {
    const pkmName = screen.getByText(pokemon.name);
    expect(pkmName).toBeInTheDocument();
    const buttonEl = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(buttonEl);
  });
  const firstPkmName = screen.getByText('Pikachu');
  expect(firstPkmName).toBeInTheDocument();
});

test('Testa se é mostrado apenas um pokemon por vez', () => {
  const pkmImg = screen.getAllByRole('img');
  expect(pkmImg).toHaveLength(1);
});

test('Testa se existe um botao de filtragem para cada tipo, sem repetiçoes', () => {
  pokemons.forEach((pokemon) => {
    const filterBtnName = screen.getByRole('button', { name: pokemon.type });
    expect(filterBtnName).toBeInTheDocument();
  });
  const allBtnsByType = screen.getAllByTestId('pokemon-type-button');
  const totalLength = 7;
  expect(allBtnsByType).toHaveLength(totalLength);
});

test('Testa se o botao ALL esta sempre visivel', () => {
  const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });
  pokemons.forEach((pokemon) => {
    const filterBtnName = screen.getByRole('button', { name: pokemon.type });
    expect(filterBtnName).toBeInTheDocument();
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(nextBtn);
    expect(allBtn).toBeInTheDocument();
  });
});

test('O botao que reseta o filtro tem o texto ALL', () => {
  const allFilterBtn = screen.getByRole('button', { name: /all/i });
  expect(allFilterBtn).toBeInTheDocument();
});

test('Ao clicar no botao ALL o filtro deve ser resetado', () => {
  const allFilterBtn = screen.getByRole('button', { name: /all/i });
  userEvent.click(allFilterBtn);
  const firstPkm = screen.getByText('Pikachu');
  expect(firstPkm).toBeInTheDocument();
});

test('Ao carregar a pagina o botao ALL esta selecionado', () => {
  const allFilterBtn = screen.getByRole('button', { name: /all/i });
  expect(allFilterBtn).toBeInTheDocument();
});
