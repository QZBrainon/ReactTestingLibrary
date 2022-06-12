import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

test('Testa se o texto Page request no found aparece', () => {
  renderWithRouter(<NotFound />);
  const titleEl = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(titleEl).toBeInTheDocument();
});

test('Testa se aparece uma determinada imagem', () => {
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  renderWithRouter(<NotFound />);
  const imgEl = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(imgEl).toBeInTheDocument();
  expect(imgEl).toHaveAttribute('src', imgSrc);
});
