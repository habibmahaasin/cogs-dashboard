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
        }}
        agreeText="Save"
        disagreeText="Cancel"
        onAgree={async () => {
          if (action === 'add') {
            await addInventoryItem({
              id: Math.random().toString(36).substring(7),
              item: input.item,
              qty: input.qty,
              uom: input.uom,
              price_per_qty: input.price_per_qty,
            });
            setStatus('Item Successfully Added to Inventory');
          } else {
            await handleUpdateItem({
              id: input.id,
              item: input.item,
              qty: input.qty,
              uom: input.uom,
              price_per_qty: input.price_per_qty,
            });
            setStatus('Item Successfully Updated in Inventory');
          }
          await handleResetValues();
          setOpenFormModal(false);
        }}
      >
        <Box paddingTop={2} display="flex" gap={2} flexDirection="column">
          <TextField
            fullWidth
            label="Item Name"
            value={input.item}
            onChange={(e) => handleInputChange('item', e.target.value)}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={input.qty}
            onChange={(e) => handleInputChange('qty', e.target.value)}
          />
          <TextField
            fullWidth
            label="Unit of Measurement (UoM)"
            value={input.uom}
            onChange={(e) => handleInputChange('uom', e.target.value)}
          />
          <TextField
            fullWidth
            label="Price per Quantity"
            value={input.price_per_qty}
            onChange={(e) => handleInputChange('price_per_qty', e.target.value)}
          />
        </Box>
      </AlertDialogSlide>
    </>
  );
}
