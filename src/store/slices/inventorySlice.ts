import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _inventory, InventoryItem } from 'src/_mock';

interface InventorySliceInterface {
  data: InventoryItem[];
  input: InventoryItem;
}

const initialState: InventorySliceInterface = {
  data: _inventory,
  input: {
    id: '',
    item: '',
    qty: 0,
    uom: '',
    price_per_qty: 0,
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    onChangeInput: (
      state,
      action: PayloadAction<{ item: keyof InventorySliceInterface['input']; value: string }>
    ) => {
      const { item, value } = action.payload;

      if (item === 'qty' || item === 'price_per_qty') {
        state.input[item] = parseFloat(value);
      } else {
        state.input[item] = value;
      }
    },

    pushData: (state, action: PayloadAction<InventoryItem>) => {
      state.data.push(action.payload);
    },
    resetValues: (state) => {
      state.input = { id: '', item: '', qty: 0, uom: '', price_per_qty: 0 };
    },
    deleteDataById: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setInputValues: (state, action: PayloadAction<InventoryItem>) => {
      state.input = {
        id: action.payload.id,
        item: action.payload.item,
        qty: action.payload.qty,
        uom: action.payload.uom,
        price_per_qty: action.payload.price_per_qty,
      };
    },
    updateValues: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      state.data[index] = action.payload;
    },
  },
});

export const {
  pushData,
  onChangeInput,
  resetValues,
  deleteDataById,
  setInputValues,
  updateValues,
} = inventorySlice.actions;
export default inventorySlice.reducer;
