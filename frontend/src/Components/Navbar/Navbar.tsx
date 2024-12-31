import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static" id="appbar">
      <Toolbar>
        <Typography variant="h6" id="navbar-title" sx={{ flexGrow: 1 }}>
          Project Name
        </Typography>
        <div className="button-container">
          <Button
            className="oval-button"
            color="inherit"
            component={Link}
            to="/"
          >
            Login
          </Button>
          <Button
            className="oval-button"
            color="inherit"
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
