import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import idLogo from "../assets/id-logo.png";


export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 5 },
        py: { xs: 5, sm: 5 },
        textAlign: { sm: 'center', md: 'left' },
        
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          pt: { xs: 4, sm: 4 },
          borderTop: '1px solid',        
        }}
      >
        <div>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Typography variant="body3" sx={{ color: 'text.secondary', mt: 1 }}>
        Impact Desk
      </Typography>
      &nbsp;
     2026
    </Typography>
        </div>
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'left'}}
        >
          <img src={idLogo} alt="ImpactDesk logo" style={{ height: 48 }} />
        </Stack>
      </Box>
    </Container>
  );
}
