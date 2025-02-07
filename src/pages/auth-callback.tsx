import { Box, Typography } from '@mui/material';
import { decode } from 'js-base64';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
// import { toast } from 'react-toastify';
// import { auth } from 'src/utils/firebase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get('t') ?? '';

  useEffect(() => {
    const signIn = async () => {
      toast.success(`Successfully Login, ${decode(token)}`);
      localStorage.setItem(
        'token',
        `${Math.random()
          .toString(36)
          .substring(2, 2 + 10)}_${token}`
      );
      localStorage.setItem('user', decode(token));
      setTimeout(() => {
        navigate('/');
      }, 2000);

      // if (isSignInWithEmailLink(auth, window.location.href)) {
      //   let email = localStorage.getItem('emailForSignIn');
      //   if (!email) {
      //     email = window.prompt('Enter your email for confirmation') ?? '';
      //   }
      //   try {
      //     const result = await signInWithEmailLink(auth, email, window.location.href);
      //     const idToken = await result.user.getIdToken();
      //     await localStorage.setItem('token', idToken);
      //     localStorage.removeItem('emailForSignIn');
      //     toast.success(`Welcome back, ${email}`);
      //     navigate('/');
      //   } catch (error) {
      //     toast.error(error.message);
      //   }
      // }
    };

    signIn();
  }, [navigate, token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="subtitle2">Verifying Magic Link...</Typography>
    </Box>
  );
};

export default AuthCallback;
