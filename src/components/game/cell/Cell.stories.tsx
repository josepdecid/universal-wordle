import { ComponentStory, ComponentMeta } from '@storybook/react';
import Cell, { CellProps, InputState } from './Cell';

const args: CellProps = {
  cellIndex: 0,
  covered: true,
  selected: false,
};

export default {
  args,
  component: Cell,
  title: 'Game/Cell',
} as ComponentMeta<typeof Cell>;

const CellStory: ComponentStory<typeof Cell> = (args: CellProps) => {
  return (
    <div style={{ backgroundColor: 'black', height: '100px', padding: '50px' }}>
      <Cell {...args} />
    </div>
  );
};

export const EmptyAndUnselected = CellStory.bind({});

export const EmptyAndSelected = CellStory.bind({});
EmptyAndSelected.args = { selected: true };

export const CoveredWithAValue = CellStory.bind({});
CoveredWithAValue.args = { value: 'A' };

export const UncoveredWithCorrectValue = CellStory.bind({});
UncoveredWithCorrectValue.args = {
  value: 'A',
  covered: false,
  inputState: InputState.Correct,
};

export const UncoveredWithMissplacedValue = CellStory.bind({});
UncoveredWithMissplacedValue.args = {
  value: 'A',
  covered: false,
  inputState: InputState.Missplaced,
};

export const UncoveredWithMissingValue = CellStory.bind({});
UncoveredWithMissingValue.args = {
  value: 'A',
  covered: false,
  inputState: InputState.Missing,
};
