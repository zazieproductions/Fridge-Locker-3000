import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BluesMetalShop } from './BluesMetalShop';

afterEach(cleanup);

describe('BluesMetalShop', () => {
  it('is the Blues Metal Emporium', () => {
    render(<BluesMetalShop />);
    expect(screen.getByText('Blues Metal Emporium')).toBeInTheDocument();
  });

  it('stocks all four joke products', () => {
    render(<BluesMetalShop />);
    expect(screen.getByText('Rust-Bucket Distortion Pedal')).toBeInTheDocument();
    expect(screen.getByText('Plasma Slide')).toBeInTheDocument();
    expect(screen.getByText('Fridge-Cooled Amp')).toBeInTheDocument();
    expect(screen.getByText('Corn-Cob Pick')).toBeInTheDocument();
  });

  it('prices things honestly for a shop that cannot transact', () => {
    render(<BluesMetalShop />);
    expect(screen.getByText('$666.66')).toBeInTheDocument();
    expect(screen.getByText('$0.99')).toBeInTheDocument();
    expect(screen.getAllByText('BUY NOW')).toHaveLength(4);
  });

  it('is currently playing Frozen Corn Blues in E minor', () => {
    render(<BluesMetalShop />);
    expect(screen.getByText(/FROZEN CORN BLUES IN E MINOR/)).toBeInTheDocument();
  });
});
