import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import { colors } from "../../../../theme";
import {fetcher} from "../../../api/fetcher.js"
import { API_BASE } from "../../../api/config";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

export default function DevelopToday() {
  const today = dayjs();
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const { userToken } = useContext(AuthContext);

  const { data: developments } = useSWR(
    userToken ? [`${API_BASE}/api/developments/?date=${today.format("YYYY-MM-DD")}`, userToken] : null, fetcher,
  );


  return (
    <Card elevation={1} sx={{ borderRadius: 4, mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle">Development</Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}>
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="h4"               
                sx={{ color: `${color.secondary[500]}` }}>
                {developments?.length}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Today
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
