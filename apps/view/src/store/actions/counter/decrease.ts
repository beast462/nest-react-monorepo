import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function decrease(): AppThunkAction<Action<void>, void> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.COUNTER__DEC,
      payload: undefined,
    });
}
