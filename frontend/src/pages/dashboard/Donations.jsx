import { Grid } from "@mui/material"
import DonationForm from "../../components/cards/forms/Donationform"
import DonationChart from "../../components/cards/charts-tables/Donationchart"

export default function Donations() {

  return (
    <>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 9, lg: 7 }}>
          <DonationChart />
           </Grid>
           <Grid size={{ xs: 12, md: 6, lg: 4 }}>
           <DonationForm />
           </Grid>
        </Grid>
    </>
  );
}
