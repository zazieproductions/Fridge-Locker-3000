import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CornZone, CORN_CELL_COUNT } from './CornZone';

afterEach(cleanup);

describe('CornZone', () => {
  it('is the Corn Zone', () => {
    render(<CornZone />);
    expect(screen.getByText('CORN ZONE')).toBeInTheDocument();
  });

  it('offers exactly nine cobs', () => {
    render(<CornZone />);
    for (let i = 1; i <= CORN_CELL_COUNT; i++) {
      expect(screen.getByText(`CORN ${i}`)).toBeInTheDocument();
    }
    expect(screen.getByText(/CONSUME THE COB/)).toBeInTheDocument();
  });

  it('teleports a cob to a random pose when clicked, with no reset button', () => {
    render(<CornZone />);
    const cob = screen.getByText('CORN 1');

    expect(cob.style.transform).toBe('');
    fireEvent.click(cob);
    expect(cob.style.transform).toMatch(/scale\(\d/);
    expect(cob.style.transform).toMatch(/rotate\(/);
  });
});
