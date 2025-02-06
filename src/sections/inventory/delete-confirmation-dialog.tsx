import { Alert, Box, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import AlertDialogSlide from 'src/components/dialog/dialog';
import useInventory from 'src/hooks/use-inventory';

// ----------------------------------------------------------------------

interface DeleteDialogProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;
  rowId: string;
}

export default function DeleteDialog({
  openDeleteModal,
  setOpenDeleteModal,
  rowId,
}: DeleteDialogProps) {
  const { handleDeleteItem } = useInventory();
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
        title="Delete Confirmation"
        open={openDeleteModal}
        onClose={async () => {
          setOpenDeleteModal(false);
        }}
        agreeText="Delete"
        disagreeText="Cancel"
        onAgree={async () => {
          await handleDeleteItem(rowId);
          setStatus('Item Successfully Deleted');
          setOpenDeleteModal(false);
        }}
      >
        <Box paddingTop={2} display="flex" gap={2} flexDirection="column">
          Are you sure you want to delete this item?
        </Box>
      </AlertDialogSlide>
    </>
  );
}
