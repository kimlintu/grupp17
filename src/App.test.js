import { render, screen } from '@testing-library/react';
import App from './App';

test('Simple testing', () => {
  render(<App />);
  const a = 10;
  const b = 2;
  expect(b).toBeLessThan(a);
});
