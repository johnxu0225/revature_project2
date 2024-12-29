import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login: React.FC = () => {
  return (
    <Box className="login-container">
      {/* Left Side: Text */}
      <Box className="login-text">
        <Typography variant="h3" gutterBottom>
          Start Your Budget Now!
        </Typography>
        <Typography variant="body1">
          Here we aim to make{" "}
          <span className="highlight-text">managing your money simple</span> and
          <span className="highlight-text"> stress-free</span> by tracking your
          spending, setting goals, and keeping you on top of your finances—all
          in one easy place. With features like{" "}
          <span className="highlight-text">
            custom budgets, bill reminders,{" "}
          </span>
          and <span className="highlight-text">real-time updates, </span> they
          help you make smarter choices and{" "}
          <span className="highlight-text">take control of your finances effortlessly!</span>
        </Typography>
      </Box>

      {/* Right Side: Form */}
      <Box className="login-form">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Divider />
        <form>
          <TextField
            className="textfield"
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            className="textfield"
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Button
            className="button1"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
        </form>
        {/* Link to Register */}
        <Box mt={2}>
          <Typography variant="h6" align="center">
            New Here?
            <Link to="/register" className="signup-link">
              Sign up Now!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
