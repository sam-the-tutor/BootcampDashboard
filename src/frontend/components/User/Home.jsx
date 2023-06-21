import React from 'react';
import LoadingCmp from '../../Loader';
import { useAuth } from '../../use-auth-client';
import { Box, Typography } from '@mui/material';

const Home = () => {
  
  const{ isLoading, setIsLoading} = useAuth();

  const pageStyle = {
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: '#191923',
    fontFamily: 'Arial, Roboto',
    fontSize: '2rem',
    fontWeight: 'bold',
  };



  return (<>
   <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(55deg, #191923, #FF650B)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'white',
            fontFamily: 'Pacifico, cursive',
            mb: 4,
          }}
        >
          Motoko Bootcamp
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          From Zero to Hero in One Week
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            transform: 'translate(-50%, -50%)',
            borderBottom: '2px dashed white',
          }}
        />
      </Box>
    </Box>
  {<LoadingCmp isLoading={isLoading} />}
  </>
  
  );
};
export default Home;
