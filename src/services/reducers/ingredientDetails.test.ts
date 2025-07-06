import ingredientDetailsReducer, {
    clearIngredientDetails,
    setIngredientDetails,
} from './ingredientDetails';

const ingredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'img',
  image_mobile: 'img_mob',
  image_large: 'img_lg',
  __v: 0,
};

describe('ingredientDetails reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: '' })).toEqual({ ingredient: null });
  });

  it('should handle setIngredientDetails', () => {
    expect(ingredientDetailsReducer(undefined, setIngredientDetails(ingredient))).toEqual({ ingredient });
  });

  it('should handle clearIngredientDetails', () => {
    const state = { ingredient };
    expect(ingredientDetailsReducer(state, clearIngredientDetails())).toEqual({ ingredient: null });
  });
}); 