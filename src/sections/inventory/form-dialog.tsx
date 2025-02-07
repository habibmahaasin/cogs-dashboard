import { Alert, Box, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import AlertDialogSlide from 'src/components/dialog/dialog';
import useInventory from 'src/hooks/use-inventory';

// ----------------------------------------------------------------------

interface FormDialogProps {
  openFormModal: boolean;
  setOpenFormModal: (open: boolean) => void;
  action?: string;
}

export default function FormDialog({ openFormModal, setOpenFormModal, action }: FormDialogProps) {
  const { input, handleInputChange, addInventoryItem, handleResetValues, handleUpdateItem } =
    useInventory();
  const [status, setStatus] = useState('');
  const [error, setError] = useState({
    item: false,
    qty: false,
    uom: false,
    price_per_qty: false,
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={status !== ''}
        onClose={() => setStatus('')}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setStatus('')}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {status}
        </Alert>
      </Snackbar>

      <AlertDialogSlide
        title="Items Information"
        open={openFormModal}
        onClose={async () => {
          handleResetValues();
          setOpenFormModal(false);
          setError({ item: false, qty: false, uom: false, price_per_qty: false });
        }}
        agreeText="Save"
        disagreeText="Cancel"
        onAgree={async () => {
          const { id, item, qty, uom, price_per_qty } = input;

          if (!item || !qty || !uom || !price_per_qty) {
            setError({ item: !item, qty: !qty, uom: !uom, price_per_qty: !price_per_qty });
            setStatus('Please fill in all the required fields');
            return;
          }

          const actionHandler = action === 'add' ? addInventoryItem : handleUpdateItem;
          const newItem = {
            id: action === 'add' ? Math.random().toString(36).substring(7) : id,
            item,
            qty,
            uom,
            price_per_qty,
          };

          await actionHandler(newItem);
          setStatus(`Item Successfully ${action === 'add' ? 'Added to' : 'Updated in'} Inventory`);
          setError({ item: false, qty: false, uom: false, price_per_qty: false });

          setOpenFormModal(false);
          await handleResetValues();
        }}
      >
        <Box paddingTop={2} display="flex" gap={2} flexDirection="column">
          <TextField
            fullWidth
            error={error.item}
            label="Item Name"
            value={input.item}
            onChange={(e) => handleInputChange('item', e.target.value)}
          />
          <TextField
            fullWidth
            error={error.qty}
            label="Quantity"
            type="number"
            value={input.qty}
            onChange={(e) => handleInputChange('qty', e.target.value)}
          />
          <TextField
            fullWidth
            error={error.uom}
            label="Unit of Measurement (UoM)"
            value={input.uom}
            onChange={(e) => handleInputChange('uom', e.target.value)}
          />
          <TextField
            fullWidth
            error={error.price_per_qty}
            label="Price per Quantity"
            value={input.price_per_qty}
            onChange={(e) => handleInputChange('price_per_qty', e.target.value)}
          />
        </Box>
      </AlertDialogSlide>
    </>
  );
}
