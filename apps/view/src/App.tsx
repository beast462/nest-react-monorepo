import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from './store';
import { decrease } from './store/actions/counter/decrease';
import { increase } from './store/actions/counter/increase';

const connector = connect(
  (state: ApplicationState) => ({
    value: state.counter.value,
  }),
  {
    increase,
    decrease,
  },
);

function App({ value, increase, decrease }: ConnectedProps<typeof connector>) {
  return (
    <>
      <div>Counter: {value}</div>
      <div>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    </>
  );
}

export default connector(App);
