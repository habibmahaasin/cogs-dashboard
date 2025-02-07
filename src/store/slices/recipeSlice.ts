import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _inventory, InventoryItem } from 'src/_mock';
import { _recipe, RecipeItem } from 'src/_mock/_recipe';

interface RecipeSliceInterface {
  data: RecipeItem[];
  input: {
    selectedRecipe: string | null;
    qty: number;
  };
  totalPrice: number;
  error: string | null;
}

const initialState: RecipeSliceInterface = {
  data: _recipe,
  input: {
    selectedRecipe: null,
    qty: 0,
  },
  totalPrice: 0,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    onChangeInput: (
      state,
      action: PayloadAction<{ item: keyof RecipeSliceInterface['input']; value: string }>
    ) => {
      const { item, value } = action.payload;

      if (item === 'qty') {
        state.input[item] = parseFloat(value);
      } else {
        state.input[item] = value;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    calculatePrice: (state, action: PayloadAction<{ inventory: InventoryItem[] }>) => {
      const { inventory } = action.payload;
      const selectedRecipe = state.data.find(
        (recipe) => recipe.name === state.input.selectedRecipe
      );

      if (selectedRecipe) {
        const total = selectedRecipe.recipeDetail.reduce((acc, curr) => {
          const inventoryItem = inventory.find((item) => item.item === curr.item);
          if (!inventoryItem) {
            state.error = `Item ${curr.item} not found in inventory`;
            return acc;
          }

          return acc + (inventoryItem ? inventoryItem.price_per_qty * curr.qty : 0);
        }, 0);
        if (state.error) {
          state.totalPrice = 0;
        } else {
          state.totalPrice = JSON.parse(JSON.stringify(total * state.input.qty));
          state.error = null;
        }
      } else {
        state.totalPrice = 0;
      }
    },
  },
});

export const { onChangeInput, calculatePrice, setError, setTotalPrice } = recipeSlice.actions;
export default recipeSlice.reducer;
