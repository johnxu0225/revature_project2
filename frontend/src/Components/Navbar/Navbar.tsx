import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores";
import { Box, Card, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { AccountCircle, AttachMoney, MailOutline, MenuOpen } from "@mui/icons-material";


export const Navbar: React.FC = () => {
  const { user, setUser } = useStore(); // Access global user state and updater function
  const [userMenu, setUserMenu] = React.useState(false);
  const [userDrawer, setUserDrawer] = React.useState(false);
  const setSnackbar = useStore((state) => state.setSnackbar);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      loggedIn: false,
      userId: -1,
      username: "",
      role: "",
      firstName: "",
      lastName: "",
      token: "",
    });
    setSnackbar(true, "Logout successful!");
    navigate("/");
  };

  return (
    <AppBar position="static" id="appbar">
      <Toolbar>
        {/* Mobile menu button */}
        {user.loggedIn && (
          <Box
            className="button-container"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setUserDrawer(true)}
            >
              <MenuOpen />
            </IconButton>
          </Box>
        )}
        <Typography variant="h6" id="navbar-title" sx={{ flexGrow: 1 }}>
          BetterBudget
        </Typography>

        <Box
          className="button-container"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {user.loggedIn ? (
            <>
              <Link
                variant="h5"
                sx={{
                  color: "white",
                  textDecorationColor: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                underline="hover"
                onClick={() => navigate("/envelopes")}
              >
                Envelopes
              </Link>
              <Link
                variant="h5"
                sx={{
                  color: "white",
                  textDecorationColor: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                underline="hover"
                onClick={() => navigate("/transactions")}
              >
                Activity
              </Link>
              {user.role == "ROLE_MANAGER" && (
                <Link
                  variant="h5"
                  sx={{
                    color: "white",
                    textDecorationColor: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  underline="hover"
                  onClick={() => navigate("/users")}
                >
                  Users
                </Link>
              )}

              <IconButton
                size="large"
                color="inherit"
                id="user-menu"
                onClick={() => setUserMenu(true)}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={document.getElementById("user-menu")}
                open={userMenu}
                onClose={() => setUserMenu(false)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Card sx={{ padding: 2, margin: 1 }}>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="subtitle1">{user.username}</Typography>
                  {user.role === "ROLE_MANAGER" ? (
                    <Typography variant="subtitle2">Manager</Typography>
                  ) : (
                    <></>
                  )}
                </Card>
                <MenuItem
                  sx={{ color: "red", fontWeight: "bold" }}
                  onClick={() => {
                    setUserMenu(false);
                    handleLogout();
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                className="oval-button"
                color="inherit"
                component={Link}
                onClick={() => navigate("/")}
              >
                Login
              </Button>
              <Button
                className="oval-button"
                color="inherit"
                component={Link}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile drawer menu*/}
        <Drawer open={userDrawer} onClose={() => setUserDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItemButton
                onClick={() => {
                  setUserDrawer(false);
                  navigate("/envelopes");
                }}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Envelopes" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setUserDrawer(false);
                  navigate("/transactions");
                }}
              >
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Activity" />
              </ListItemButton>

              {user.role == "ROLE_MANAGER" && (
                <ListItemButton
                  onClick={() => {
                    setUserDrawer(false);
                    navigate("/users");
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              )}
            </List>
            <Card sx={{ padding: 2, margin: 1, textAlign: "center" }}>
              <Typography variant="h6">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1">{user.username}</Typography>
              {user.role === "ROLE_MANAGER" ? (
                <Typography variant="subtitle2">Manager</Typography>
              ) : (
                <></>
              )}
              <Button
                sx={{ color: "red" }}
                onClick={() => {
                  setUserDrawer(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </Card>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
