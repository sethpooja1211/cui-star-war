import { render, screen } from '@testing-library/react';
import App from './App';

test('renders star war app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Planet Name/i);
  expect(linkElement).toBeInTheDocument();
});
