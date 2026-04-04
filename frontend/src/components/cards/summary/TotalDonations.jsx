import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import { colors } from "../../../../theme";
import { fetcher } from "../../../api/fetcher";
import useSWR from "swr";

export default function TotalDonations() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { data: donations } = useSWR(
    "http://localhost:8000/api/donations/",
    fetcher,
  );
  
// console.log(donations[0].total_donations) 


  return (
    <>
      <Card elevation={1} sx={{ borderRadius: 4, mb: 2 }}>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Donations
          </Typography>            
                <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{
                alignContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
                gap: 1,
              }}>
              <Typography variant="h4" component="p"  sx={{ color: `${color.secondary[500]}` }}>
                ${donations?.[0]?.total_donations}
                {/*{donations[0] != 'undefined' ?  `$${donations?[0]?.total_donations}` : " "}               */}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Year to date
            </Typography>
          </Stack>      
      </CardContent>
      </Card>
    </>
  );
}

// `$${donations[0].total_donations}`