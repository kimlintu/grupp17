import { render, screen } from '@testing-library/react';
import App from './App';

test('Server not running, should print loading page', () => {
  render(<App />);
  expect(document.body.textContent).toContain('LOADING PAGE');
});
