import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
// import { matBlack } from "../../constants/color"; // Will be replaced by theme
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin.auth";

const Link = styled(LinkComponent)(({ theme }) => ({
  textDecoration: 'none',
  borderRadius: '2rem',
  padding: '1rem 2rem',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main, // Or a slightly darker text.primary
    backgroundColor: alpha(theme.palette.primary.main, 0.08), // Subtle hover background
  },
}));

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  
const logoutHandler = () => {
    dispatch(adminLogout());
};

  return (
    <Stack
      width={w} // Defaults to 100%, will fill its container (Grid cell or Drawer paper)
      direction={"column"}
      p={{ xs: "1.5rem", md: "2rem", lg: "3rem" }} // Responsive padding
      spacing={{ xs: "1.5rem", md: "2rem", lg: "3rem" }} // Responsive spacing
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper, // Sidebar background
        height: "100%", // Fill height of parent container
        boxSizing: 'border-box',
        overflowY: 'auto', // Add scroll for smaller heights if content overflows
      })}
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              (theme) => (location.pathname === tab.path && {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                ":hover": {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.dark, // Darken on hover for active
                },
              })
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography fontSize={"1.2rem"}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};


const AdminLayout = ({ children }) => {

  const {isAdmin} = useSelector(state => state.auth);

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const handleClose = () => setIsMobile(false);

  if(!isAdmin) return <Navigate to="/admin" />

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={(theme) => ({
          bgcolor: theme.palette.grey[100], // Main content background
        })}
      >
        {children}
      </Grid>
      <Drawer
        open={isMobile}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '280px', // Fixed width for the drawer
            boxSizing: 'border-box',
          },
        }}
      >
        <Sidebar /> {/* Sidebar will take 100% width of the Drawer paper */}
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
