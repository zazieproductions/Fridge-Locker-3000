import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChaoticOptions } from './ChaoticOptions';

afterEach(cleanup);

describe('ChaoticOptions', () => {
  it('offers fifty checkboxes you do not need', () => {
    render(<ChaoticOptions />);
    expect(screen.getByText("Options You Don't Need")).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(50);
  });

  it('toggles one checkbox deterministically when the bystander roll fails', async () => {
    // 0.9 > BYSTANDER_TOGGLE_PROBABILITY (0.5): no random co-toggle.
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const user = userEvent.setup();
    render(<ChaoticOptions />);

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[0]!);

    expect(boxes[0]).toBeChecked();
    expect(boxes[1]).not.toBeChecked();
  });

  it('toggles a random bystander checkbox when the roll succeeds', async () => {
    // 0.1 <= 0.5: a bystander toggles; randomIndex picks floor(0.1 * 50) = 5.
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    const user = userEvent.setup();
    render(<ChaoticOptions />);

    const boxes = screen.getAllByRole('checkbox');
    await user.click(boxes[0]!);

    expect(boxes[0]).toBeChecked();
    expect(boxes[5]).toBeChecked(); // innocent bystander
    expect(boxes[1]).not.toBeChecked();
  });

  it('poses the four identity options', () => {
    render(<ChaoticOptions />);
    expect(screen.getByLabelText('I am a fridge')).toBeInTheDocument();
    expect(screen.getByLabelText('I am corn')).toBeInTheDocument();
    expect(screen.getByLabelText('I am blues metal')).toBeInTheDocument();
    expect(screen.getByLabelText('I am nothing')).toBeInTheDocument();
  });
});
