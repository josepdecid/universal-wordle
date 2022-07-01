import '@testing-library/jest-dom';

import React from 'react';
import Cell, { getColorFromState, InputState, TRANSITION_DELAY } from './Cell';
import { cleanup, render } from '@testing-library/react';

describe('Cell component', () => {
  it('renders the Cell component with the default values', () => {
    const { getByTestId } = render(<Cell cellIndex={0} />);

    const cell = getByTestId('cell');
    expect(cell).toBeInTheDocument();
    expect(cell).not.toHaveClass('flip-cells');

    const cellFront = getByTestId('cell-front');
    expect(cellFront).not.toHaveClass('cell-cursor');
    expect(cellFront).toHaveTextContent('');

    const cellBack = getByTestId('cell-back');
    expect(cellBack).toHaveTextContent('');
  });

  it('contains the given value twice (front and back)', () => {
    const expectedValue = 'C';
    const { getAllByText } = render(
      <Cell cellIndex={0} value={expectedValue} />
    );

    const queryResults = getAllByText(expectedValue);
    expect(queryResults).toHaveLength(2);
  });

  it('adds a selected class to the front view that shows a cursor', () => {
    const { getByTestId } = render(<Cell cellIndex={0} selected={true} />);

    const cellFront = getByTestId('cell-front');
    expect(cellFront).toHaveClass('cell-cursor');

    const cellBack = getByTestId('cell-back');
    expect(cellBack).not.toHaveClass('cell-cursor');
  });

  it('sets the expected background color to the back view', () => {
    const states = [
      InputState.Correct,
      InputState.Missplaced,
      InputState.Missing,
      InputState.Empty,
    ];

    states.forEach((state) => {
      const expectedBackgroundColor = getColorFromState(state);

      const { getByTestId } = render(
        <Cell cellIndex={0} covered={false} inputState={state} value='A' />
      );

      const cellBack = getByTestId('cell-back');
      expect(cellBack).toHaveStyle({
        'background-color': expectedBackgroundColor,
      });

      cleanup();
    });
  });

  it('delays the flip animation proporitonal to the cell index', () => {
    const cellIndex = 3;
    const expectedDelay = `${TRANSITION_DELAY * cellIndex}s`;

    const { getByTestId } = render(<Cell cellIndex={cellIndex} />);

    const cellInner = getByTestId('cell-inner');
    expect(cellInner).toHaveStyle({ 'transition-delay': expectedDelay });
  });
});
