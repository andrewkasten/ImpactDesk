import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import { useTheme } from "@mui/material";
import { colors } from "../../../../theme";
import useSWR from "swr";
import { fetcher } from "../../../api/fetcher";

export default function TopDonors() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { data: people = [] } = useSWR(
    "http://localhost:8000/api/people/",
    fetcher,
  );
  //   console.log(people.sort((a,b) => b.donation_total - a.donation_total))
  // const sortTotal = people.sort((a,b) => b.donation_total - a.donation_total)

  const icons = [
    { icon: LooksOneOutlinedIcon, color: `${color.secondary[600]}` },
    { icon: LooksTwoOutlinedIcon, color: `${color.error[600]}` },
    { icon: Looks3OutlinedIcon, color: "#e8e8e8" },
    { icon: Looks4OutlinedIcon, color: "#f5d31f" },
    { icon: Looks5OutlinedIcon, color: `${color.primary[500]}` },
  ];
  return (
    <Card elevation={1} sx={{ borderRadius: 4, mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle">Top Donors</Typography>
        {people
          .sort((a, b) => b.donation_total - a.donation_total)
          .slice(0, 5)
          .map((donor, index) => {
            const Icon = icons[index].icon;
            const color = icons[index].color;
            return (
              <Box
                key={index}
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 1,
                }}
              >
                <List>
                  <ListItem
                    secondaryAction={
                      <ListItemText
                        primary={`${donor.first_name} ${donor.last_name}`}
                      ></ListItemText>
                    }
                    disablePadding
                  >
                    <ListItemIcon>
                      <Icon
                        sx={{ color: { color } }}
                        edge="end"
                        aria-label="icon 1 tp 5"
                      />
                    </ListItemIcon>
                  </ListItem>
                  <Divider sx={{ pt: 0.5 }} />
                </List>
              </Box>
            );
          })}
      </CardContent>
    </Card>
  );
}
