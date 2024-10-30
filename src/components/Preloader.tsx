import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Preloader() {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#EBEBEB]'>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
  );
}