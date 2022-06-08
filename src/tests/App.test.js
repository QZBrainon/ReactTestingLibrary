import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const allLinks = screen.getAllByRole('link');
  const firstLink = allLinks[0];
  const secondLink = allLinks[1];
  const thirdLink = allLinks[2];
  expect(firstLink).toHaveTextContent('Home');
  expect(secondLink).toHaveTextContent('About');
  expect(thirdLink).toHaveTextContent('Favorite Pokémons');
});

test('Testa redirecionamento ao clicar Home', () => {
//   renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  console.log(homeLink, '----------------------------------');
  userEvent.click(homeLink);
  const { pathname } = history.location;
  const titleEl = screen.getByRole('heading',
    { name: /Encountered pokémons/i, level: 2 });
  expect(titleEl).toBeInTheDocument();
  expect(pathname).toBe('/');
});

test('Testa redirecionamento ao clicar About', () => {
//   renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByText('About');
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  const titleEl = screen.getByRole('heading',
    { name: /About Pokédex/i, level: 2 });
  expect(titleEl).toBeInTheDocument();
  expect(pathname).toBe('/about');
});

test('Testa redirecionamento ao clicar Pokémons Favoritados', () => {
//   renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const favLink = screen.getByText('Favorite Pokémons');
  userEvent.click(favLink);
  const { pathname } = history.location;
  const titleEl = screen.getByRole('heading',
    { name: /Favorite pokémons/i, level: 2 });
  expect(titleEl).toBeInTheDocument();
  expect(pathname).toBe('/favorites');
});

test('Testa redirecionamento p/ pagina nao encontrada', () => {
  const { history } = renderWithRouter(<App />);
  history.push('pagina que nao existe');
  const notFoundTitle = screen.getByRole('heading', {
    name: /Page requested not found /i,
    level: 2 });
  expect(notFoundTitle).toBeInTheDocument();
});

// test('Testa se o primeiro link possui texto "About"', () => {
//   render(<App />);
//   const secondLink = screen.getByRole('link', { name: /about/i });
//   expect(secondLink).toBeInTheDocument();
// });

// test('Testa se o terceiro link possui texto "Favorite Pokémons"', () => {
//   render(<App />);
//   const thirdLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
//   expect(thirdLink).toBeInTheDocument();
// });
