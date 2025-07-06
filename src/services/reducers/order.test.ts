import orderReducer, { clearOrder, createOrder } from './order';

const initialState = {
  number: null,
  loading: false,
  error: null,
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearOrder', () => {
    const state = { ...initialState, number: 123, error: 'error' };
    expect(orderReducer(state, clearOrder())).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = { ...initialState, error: 'error' };
    expect(orderReducer(state, action)).toEqual({ ...initialState, loading: true });
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: { number: 42 } },
    };
    expect(orderReducer(initialState, action)).toEqual({ ...initialState, number: 42, loading: false });
  });

  it('should handle createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка' },
    };
    expect(orderReducer(initialState, action)).toEqual({ ...initialState, loading: false, error: 'Ошибка' });
  });
}); 