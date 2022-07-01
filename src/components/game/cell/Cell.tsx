import './Cell.css';
import { FC } from 'react';

export const TRANSITION_DELAY = 0.2;
export enum InputState {
  Empty,
  Missing,
  Missplaced,
  Correct,
}

export const getColorFromState = (state: InputState): string => {
  switch (state) {
    case InputState.Correct:
      return '#50a940';
    case InputState.Missplaced:
      return '#d69a2a';
    case InputState.Missing:
      return '#3a3a3c';
    default:
      return 'transparent';
  }
};

export interface CellProps {
  cellIndex: number;
  value?: string;
  inputState?: InputState;

  covered?: boolean;
  selected?: boolean;
}

const Cell: FC<CellProps> = ({
  cellIndex,
  value = '',
  inputState = InputState.Empty,
  covered = true,
  selected = false,
}) => {
  const selectedClass = selected && !value ? 'cell-cursor' : '';

  return (
    <div data-testId='cell' className={`cell ${covered ? '' : 'flip-cells'}`}>
      <div
        data-testId='cell-inner'
        className={`cell-inner ${covered ? '' : 'flip-cells'}`}
        style={{ transitionDelay: `${TRANSITION_DELAY * cellIndex}s` }}
      >
        <div data-testId='cell-front' className={`cell-front ${selectedClass}`}>
          {value}
        </div>
        <div
          data-testId='cell-back'
          className='cell-back'
          style={{ backgroundColor: getColorFromState(inputState) }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default Cell;
