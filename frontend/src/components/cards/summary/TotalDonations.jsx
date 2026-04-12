import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { colors } from "../../../../theme";
import { fetcher } from "../../../api/fetcher";
import useSWR from "swr";
import { API_BASE } from "../../../api/config";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

export default function TotalDonations() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { userToken } = useContext(AuthContext);

  const { data: donations } = useSWR(
    userToken ? [`${API_BASE}/api/donations/`, userToken] : null,
    fetcher,
  );

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