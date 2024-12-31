import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom"; // Import useNavigate
import "./Personalize.css";

export const Personalize: React.FC = () => {
  return (
    <Box className="personalize-container">
      {/* Left Side: Text */}
      <Box className="personalize-text">
        <Typography variant="h3" gutterBottom>
          Get To Know You!
        </Typography>
        <Typography variant="body1">
          We’d love to get to know you better! By sharing your first name, last
          name, and email, we can
          <span className="highlight-text"> personalize </span> our experience
          on our site and keep you in the loop with
          <span className="highlight-text"> updates</span> and info you’ll love.
          Don’t worry— we’ll always
          <span className="highlight-text"> respect your privacy</span> and keep
          your
          <span className="highlight-text"> details safe!</span>
        </Typography>
      </Box>

      {/* Right Side: Form */}
      <Box className="personalize-form">
        <Typography variant="h4" align="center" gutterBottom>
          Personalize
        </Typography>
        <Divider />
        <form>
          <TextField
            className="textfield"
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            className="textfield"
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            className="textfield"
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <Button
            className="button3"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Save & Continue
          </Button>
        </form>

        {/* Go Back Link */}
        <Box mt={2}>
          <Typography variant="h6" align="center">
            <Link to="/register" className="go-back-link">
              Go Back
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
