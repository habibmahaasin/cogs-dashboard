import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement<any, any> }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface AlertDialogSlideProps {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  agreeText?: string;
  disagreeText?: string;
  onAgree?: () => void;
  onDisagree?: () => void;
}

export default function AlertDialogSlide({
  title,
  children,
  open,
  onClose,
  agreeText = 'Agree',
  disagreeText = 'Disagree',
  onAgree,
  onDisagree,
}: AlertDialogSlideProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className="pt-24">{children}</DialogContent>
      <DialogActions
        style={{
          padding: '24px',
        }}
      >
        <Button variant="outlined" color="error" onClick={onDisagree || onClose}>
          {disagreeText}
        </Button>
        <Button variant="contained" color="primary" onClick={onAgree || onClose}>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
