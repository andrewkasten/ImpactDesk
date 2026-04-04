import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import DonationChart from "../../components/cards/charts-tables/Donationchart";
import { useTheme } from "@mui/material";
import { colors } from "../../../theme";
import DevelopToday from "../../components/cards/summary/Developtoday";
import TopDonors from "../../components/cards/summary/TopDonors";
import TotalDonations from "../../components/cards/summary/TotalDonations";

export default function DashboardHome() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const today = dayjs();

  return (
    <>
      <Typography variant="h4" sx={{ color: `${color.primary[500]}`, pb: 3 }}>
        Today {today.format("MM-DD")}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DevelopToday />
        </Grid>       
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TotalDonations />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        </Grid>        
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <DonationChart />
        </Grid>
         <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <TopDonors />
        </Grid>
      </Grid>
    </>
  );
}
