import constructorReducer, {
    addIngredient,
    clearConstructor,
    moveIngredient,
    removeIngredient,
} from './constructor';

const baseIngredient = {
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
const bun = { ...baseIngredient, type: 'bun', _id: '1', name: 'Булка' };
const sauce = { ...baseIngredient, type: 'sauce', _id: '2', name: 'Соус' };
const main = { ...baseIngredient, type: 'main', _id: '3', name: 'Мясо' };

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual({ bun: null, ingredients: [] });
  });

  it('should handle addIngredient (bun)', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(expect.objectContaining(bun));
  });

  it('should handle addIngredient (not bun)', () => {
    const state = constructorReducer(undefined, addIngredient(main));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining(main));
    expect(state.ingredients[0].uuid).toBeDefined();
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = constructorReducer(
      { bun: null, ingredients: [{ ...main, uuid: 'abc' }] },
      removeIngredient('abc')
    );
    expect(stateWithIngredient.ingredients).toEqual([]);
  });

  it('should handle moveIngredient', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...main, uuid: '1' },
        { ...sauce, uuid: '2' },
      ],
    };
    const newState = constructorReducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));
    expect(newState.ingredients[0].uuid).toBe('2');
    expect(newState.ingredients[1].uuid).toBe('1');
  });

  it('should handle clearConstructor', () => {
    const state = { bun: bun, ingredients: [{ ...main, uuid: '1' }] };
    expect(constructorReducer(state, clearConstructor())).toEqual({ bun: null, ingredients: [] });
  });
}); 