import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link } from "react-router-dom";

const pages = [
  {
    name: "Impact Desk",
    id: "/dashboard",
    icon: DashboardOutlinedIcon,
    label: "Impact Desk",
  },

  {
    name: "Development",
    id: "/dashboard/developments",
    icon: EventOutlinedIcon,
    label: "Development",
  },
  {
    name: "Contacts",
    id: "/dashboard/contacts",
    icon: PermContactCalendarOutlinedIcon,
    label: "Contacts",
  },
  {
    name: "Donations",
    id: "/dashboard/donations",
    icon: AccessibilityNewOutlinedIcon,
    label: "Donations",
  },
];
console.log(pages.id);
export default function Bottomnav() {
  const [value, setValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          {pages.map((page) => (
            <BottomNavigationAction
              key={page.id}
              sx={{ minWidth: 0 }}
              label={page.label}
              value={page.name}
              to={page.id}
              component={Link}
              icon={<page.icon />}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
