import { useDispatch, useSelector } from 'react-redux';
import { InventoryItem } from 'src/_mock';
import {
  pushData,
  onChangeInput,
  resetValues,
  deleteDataById,
  updateValues,
  setInputValues,
} from 'src/store/slices/inventorySlice';
import { RootState } from 'src/store/store';

const useInventory = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state: RootState) => state.inventory.data);
  const input = useSelector((state: RootState) => state.inventory.input);

  const addInventoryItem = (item: InventoryItem) => {
    dispatch(pushData(item));
  };

  const handleResetValues = () => {
    dispatch(resetValues());
  };

  const handleInputChange = (item: keyof typeof input, value: string) => {
    dispatch(onChangeInput({ item, value }));
  };

  const handleDeleteItem = (id: string) => {
    dispatch(deleteDataById(id));
  };

  const handleSetInputValues = (item: InventoryItem) => {
    dispatch(setInputValues(item));
  };

  const handleUpdateItem = (item: InventoryItem) => {
    dispatch(updateValues(item));
  };

  return {
    inventory,
    input,
    addInventoryItem,
    handleInputChange,
    handleResetValues,
    handleDeleteItem,
    handleUpdateItem,
    handleSetInputValues,
  };
};

export default useInventory;
