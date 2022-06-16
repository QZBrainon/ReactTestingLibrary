import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente PokemonDetails', () => {
  const pikachu = pokemons[0];
  const { name, summary, foundAt } = pikachu;

  test('Testa se a pagina tem um texto <name> Details sendo <name> o nome do pokemon',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', { name: /details/i });
      userEvent.click(detailsLink);
      const titleEl = screen.getByRole('heading', { name: `${name} Details` });
      const summaryEl = screen.getByRole('heading', { name: /summary/i, level: 2 });
      const pkmDetails = screen.getByText(summary);
      expect(titleEl).toBeInTheDocument();
      expect(detailsLink).not.toBeInTheDocument();
      expect(summaryEl).toBeInTheDocument();
      expect(pkmDetails).toBeInTheDocument();
    });

  test('Testa se existe uma seção com os mapas na pagina de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);
    const locationHeadingEl = screen.getByRole(
      'heading', { name: `Game Locations of ${name}` },
    );
    const totalLength = foundAt.length;
    const locationMapEl = screen.getAllByAltText(`${name} location`);
    expect(locationHeadingEl).toBeInTheDocument();
    expect(locationMapEl).toHaveLength(totalLength);
    foundAt.forEach(({ location, map }, index) => {
      const mapEl = screen.getAllByAltText(`${name} location`);
      const locationEl = screen.getByText(location);
      expect(locationEl).toBeInTheDocument();
      expect(mapEl[index]).toHaveAttribute('src', map);
      expect(mapEl[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  test('Testa se o usuario pode favoritar um pokemon ao clicar em favoritar', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
  });
});
