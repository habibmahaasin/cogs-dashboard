import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import { encode } from 'js-base64';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from 'src/components/dialog/dialog';

// ----------------------------------------------------------------------

interface FakeMagicLinkProps {
  openMagicLink: boolean;
  setOpenMagicLink: (open: boolean) => void;
  action?: string;
  email?: string;
}

export default function FakeMagicLinkDialog({
  openMagicLink,
  setOpenMagicLink,
  action,
  email,
}: FakeMagicLinkProps) {
  const navigate = useNavigate();
  return (
    <>
      <AlertDialogSlide
        title="Sign in"
        open={openMagicLink}
        onClose={async () => {
          setOpenMagicLink(false);
        }}
        agreeText="Lanjutkan"
        disagreeText="Cancel"
        onAgree={async () => {
          if (email) window.open(`/auth/callback?t=${encode(email)}`, '_blank');
        }}
      >
        <Box paddingTop={2} display="flex" gap={2} flexDirection="column">
          <Typography variant="caption">
            Mohon Maaf sebelumnya, sebenernya udah implementasi magic link via firebase, tapi karena
            ada limit daily jadi saya ubah ke fake dialog ini dengan generate JWT yang disimpan di
            local storage untuk fake auth, untuk code integrasi firebase authnya bisa dilihat di
            repository github, terimakasih. - Mahaasin
          </Typography>
        </Box>
      </AlertDialogSlide>
    </>
  );
}
