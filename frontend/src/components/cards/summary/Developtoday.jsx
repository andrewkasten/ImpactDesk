import { Card, CardContent, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";
import { colors } from "../../../../theme";
import {fetcher} from "../../../api/fetcher.js"

export default function DevelopToday() {
  const today = dayjs();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { data: developments } = useSWR(
    `http://localhost:8000/api/developments/?date=${today.format("YYYY-MM-DD")}`, fetcher,
  );
  // console.log(developments)
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
