import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FridgeSection } from './FridgeSection';

afterEach(cleanup);

describe('FridgeSection', () => {
  it('announces itself', () => {
    render(<FridgeSection />);
    expect(screen.getByText('FRIDGE LOCKER 3000')).toBeInTheDocument();
  });

  it('locks the visitor in, and never truly lets them out', async () => {
    const user = userEvent.setup();
    render(<FridgeSection />);

    const lockButton = screen.getByRole('button', { name: 'LOCK ME IN!' });
    await user.click(lockButton);

    expect(screen.getByText('LOCKED IN FOREVER!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'UNLOCK (IMPOSSIBLE)' })).toBeInTheDocument();
  });

  it('adjusts the internal temperature', () => {
    render(<FridgeSection />);

    expect(screen.getByText(/INTERNAL TEMP:/)).toHaveTextContent('INTERNAL TEMP: 32°F');
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '-40' } });
    expect(screen.getByText(/INTERNAL TEMP:/)).toHaveTextContent('INTERNAL TEMP: -40°F');
  });

  it('rejects every protocol with the traditional corn error', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<FridgeSection />);

    await user.click(screen.getByRole('button', { name: 'FREEZE' }));
    expect(alertSpy).toHaveBeenCalledWith('INITIATING FREEZE PROTOCOL... ERROR: TOO MUCH CORN');
  });
});
