import { useDispatch, useSelector } from 'react-redux';
import {
  calculatePrice,
  onChangeInput,
  setError,
  setTotalPrice,
} from 'src/store/slices/recipeSlice';
import { RootState } from 'src/store/store';
import useInventory from './use-inventory';

const useRecipe = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipe.data);
  const input = useSelector((state: RootState) => state.recipe.input);
  const totalPrice = useSelector((state: RootState) => state.recipe.totalPrice);
  const error = useSelector((state: RootState) => state.recipe.error);
  const { inventory } = useInventory();

  const handleInputChange = (item: keyof typeof input, value: string) => {
    dispatch(onChangeInput({ item, value }));
  };

  const handleCalculatePrice = () => {
    dispatch(calculatePrice({ inventory }));
  };

  const handleSetError = (value: string) => {
    dispatch(setError(value));
  };

  const handleSetTotalPrice = (value: number) => {
    dispatch(setTotalPrice(value));
  };

  return {
    recipe,
    input,
    handleInputChange,
    handleCalculatePrice,
    totalPrice,
    error,
    handleSetError,
    handleSetTotalPrice,
  };
};

export default useRecipe;
