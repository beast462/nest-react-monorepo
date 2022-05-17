import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function increase(): AppThunkAction<Action<void>, void> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.COUNTER__INC,
      payload: undefined,
    });
}
