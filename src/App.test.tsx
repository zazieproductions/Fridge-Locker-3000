import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe('App', () => {
  it('renders the whole fever dream', () => {
    render(<App />);

    // header marquee
    expect(screen.getByText(/ABYSS OF CORN AND REFRIGERATION/)).toBeInTheDocument();
    // all four sections mount
    expect(screen.getByText('FRIDGE LOCKER 3000')).toBeInTheDocument();
    expect(screen.getByText('CORN ZONE')).toBeInTheDocument();
    expect(screen.getByText('Blues Metal Emporium')).toBeInTheDocument();
    expect(screen.getByText("Options You Don't Need")).toBeInTheDocument();
    // footer marquee
    expect(screen.getByText(/DO NOT EAT THE FRIDGE CORN/)).toBeInTheDocument();
  });

  it('repeatedly warns about the fridge corn, even within a single sentence', () => {
    render(<App />);
    const warning = screen.getByText(/DO NOT EAT THE FRIDGE CORN/);
    expect(warning.textContent).toMatch(
      /DO NOT EAT THE FRIDGE CORN[\s\S]*DO NOT EAT THE FRIDGE CORN/,
    );
  });
});
