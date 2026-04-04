import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import TablePeople from "../../components/cards/charts-tables/TablePeople"
import ContactForm from "../../components/cards/forms/Contactform"
import TableOrganization from "../../components/cards/charts-tables/TableOrganization"

export default function Contacts() {
 
  return (
      <>
       <Typography color="primary"variant="h3" textAlign="center"> 
            Contacts
            </Typography>
        <Grid container spacing={2}>        
          <Grid size={{ xs: 12 }}>
            <TablePeople />
            </Grid>
            <Grid size={{ xs: 12 }}>
            <TableOrganization />
            </Grid>
            <Grid size={{xs: 12, md: 11, lg: 12}}>
            <ContactForm />
          </Grid>
        </Grid>
      </>
  );
}
