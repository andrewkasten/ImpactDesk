import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export const pages = [
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