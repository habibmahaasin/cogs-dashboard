import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Portal } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Iconify } from 'src/components/iconify';
import { InventoryItem } from 'src/_mock';
import useInventory from 'src/hooks/use-inventory';
import AlertDialogSlide from 'src/components/dialog/dialog';
import FormDialog from './form-dialog';
import DeleteDialog from './delete-confirmation-dialog';

// ----------------------------------------------------------------------

type InventoryTableRowProps = {
  row: InventoryItem;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: InventoryTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { handleDeleteItem, handleSetInputValues } = useInventory();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(async () => {
    await handleSetInputValues(row);
    setOpenPopover(null);
    setOpenFormModal(true);
  }, [handleSetInputValues, row]);

  return (
    <>
      <Portal>
        <FormDialog
          openFormModal={openFormModal}
          setOpenFormModal={setOpenFormModal}
          action="update"
        />
        <DeleteDialog
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          rowId={row.id}
        />
      </Portal>

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {row.item}
          </Box>
        </TableCell>

        <TableCell>{row.qty}</TableCell>

        <TableCell>{row.uom}</TableCell>
        <TableCell>{row.price_per_qty}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={async () => {
              await setOpenPopover(null);
              setOpenDeleteModal(true);
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
