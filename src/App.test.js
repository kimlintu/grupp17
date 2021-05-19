import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(document.body.textContent).toContain('LOADING PAGE');
});
