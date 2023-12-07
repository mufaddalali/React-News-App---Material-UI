import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Footer = () => {
  return (
   
    <Box sx={{ bgcolor: 'background.paper', p: 2 }} component="footer">
    <Typography variant="h6" align="center" gutterBottom color='text.primary'>
      Copyrights - Mufaddal Ali
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.primary"
      component="p"
    >
      News App - 2023
    </Typography>
  
  </Box>

  )
}

export default Footer
