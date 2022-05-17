import { AnyAction } from 'redux';
import { ActionTypes } from '../ActionTypes';

type CounterState = {
  value: number;
};

export const initialState: CounterState = {
  value: 0,
};

export function reduce(
  state: CounterState = initialState,
  action: AnyAction,
): CounterState {
  switch (action.type) {
    case ActionTypes.COUNTER__INC:
      return {
        ...state,
        value: state.value + 1,
      };

    case ActionTypes.COUNTER__DEC:
      return { ...state, value: state.value - 1 };

    default:
      return state;
  }
}
