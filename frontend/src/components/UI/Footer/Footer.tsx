import {Container, Grid, Typography, useMediaQuery} from '@mui/material';


const Footer = () => {
  const isSmallScreen = useMediaQuery('(max-width:660px)');

  return (
    <Container maxWidth="xl">
      <Grid
        container
        display="flex"
        alignItems="center"
        color="white"
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Grid item xs={3} sx={{ display: isSmallScreen ? 'none' : '' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechGear Logistics
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;