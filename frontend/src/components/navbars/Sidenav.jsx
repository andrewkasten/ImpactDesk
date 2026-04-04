import { Sidebar, Menu, MenuItem } from "react-mui-sidebar";
import { Link, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import IconButton from "@mui/material/IconButton"
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { useState} from "react"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const pages = [
  {
    name: "Development",
    id: "/dashboard/developments",
    icon: EventOutlinedIcon,
  },
  {
    name: "Contacts",
    id: "/dashboard/contacts",
    icon: PermContactCalendarOutlinedIcon,
  },
  // {
  //   name: "Donations",
  //   id: "/dashboard/donations",
  //   icon: AccessibilityNewOutlinedIcon,
  // }, 
];

function Sidenav() {
  const theme = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const [collapse, setCollapse] = useState(false);

  const handleCollapseMenu = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <Sidebar     
        isCollapse={collapse}
        themeColor={"#2d8659"}
        showProfile={false}
        width="215px"   
        textColor = {theme.palette.mode === "dark" ? "rgba(255,255,255, 0.9)" : "rgba(0,0,0,0.9)"} 
       >
        <Stack sx={{minWidth:"100px"}}>
          
          <IconButton
            sx={{alignSelf: "end" }}
            onClick={handleCollapseMenu}
          >
            {/* if collapse is false left arrow else right arrow */}
            {!collapse ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightOutlinedIcon sx={{mr:2}}/>
            )}
          </IconButton>
        </Stack>
        <Menu subHeading="HOME">
          <MenuItem
            isSelected={pathname === "/dashboard"}
            badge={false}
            component={Link}
            link="/dashboard"
            icon={<DashboardOutlinedIcon />}
          >
            Impact Desk
          </MenuItem>
        </Menu>
        <Menu subHeading="DETAILS">
          {pages.map((page) => (
            <MenuItem
              isSelected={pathname === page.id}
              link={page.id}
              component={Link}
              icon={<page.icon />}
            >
              {page.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
}

export default Sidenav;
