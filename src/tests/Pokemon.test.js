import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  const pikachu = pokemons[0];
  const { id, name, type, averageWeight: { value, measurementUnit }, image } = pikachu;
  const averageWeight = `Average weight: ${value} ${measurementUnit}`;

  test('Testa se as informações do pokemon aparecem na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(`${name}`);
    const pokemonType = screen.getAllByText(`${type}`);
    const pokemonWeight = screen.getByText(averageWeight);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const imageEl = screen.getByAltText(`${name} sprite`);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveLength(2);
    expect(pokemonWeight).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', image); // use property instead of attribute
  });

  test('Testa se o link possui url /pokemons/<id>', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink.href).toContain(`pokemons/${id}`);
  });

  test('Testa se a aplicação é redirecionada ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe uma estrela nos pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    history.push('/');
    expect(screen.getByText(/pokédex/i)).toBeInTheDocument();
    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
