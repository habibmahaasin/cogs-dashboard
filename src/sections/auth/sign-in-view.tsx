import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import { sendSignInLinkToEmail } from 'firebase/auth';
// import { auth } from 'src/utils/firebase';
import { toast } from 'react-toastify';
import FakeMagicLinkDialog from './fake-magic-link';

// ----------------------------------------------------------------------

export function SignInView() {
  const [email, setEmail] = useState<string>('');
  const [openMagicLink, setOpenMagicLink] = useState<boolean>(false);

  // const handleSendLink = async () => {
  //   if (!email) return toast.error('Email is required');

  //   const actionCodeSettings = {
  //     url: `${window.location.origin}/auth/callback`,
  //     handleCodeInApp: true,
  //   };

  //   try {
  //     await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  //     toast.success(`The sign-in link has been sent to ${email}`);
  //     localStorage.setItem('emailForSignIn', email);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }

  //   return null;
  // };

  return (
    <>
      <FakeMagicLinkDialog
        openMagicLink={openMagicLink}
        setOpenMagicLink={setOpenMagicLink}
        action="Sign in"
        email={email}
      />
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="email"
          required
          label="Email address"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) return toast.error('Email is required');
            if (!emailRegex.test(email)) return toast.error('Invalid email format');

            return setOpenMagicLink(true);
          }}
        >
          Sign in
        </LoadingButton>
      </Box>
    </>
  );
}
