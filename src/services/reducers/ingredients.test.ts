import ingredientsReducer, { fetchIngredients } from './ingredients';

const initialState = {
  items: [],
  isLoading: false,
  hasError: false,
};

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    expect(ingredientsReducer(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: [{ _id: '1', name: 'Булка' }] };
    expect(ingredientsReducer(initialState, action)).toEqual({ ...initialState, items: [{ _id: '1', name: 'Булка' }], isLoading: false });
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    expect(ingredientsReducer(initialState, action)).toEqual({ ...initialState, isLoading: false, hasError: true });
  });
}); 