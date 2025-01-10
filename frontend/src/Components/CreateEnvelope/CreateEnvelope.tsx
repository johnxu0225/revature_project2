import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useStore, { UserInfo } from "../../stores";
import "./CreateEnvelope.css";


export const CreateEnvelope: React.FC = () => {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [limit, setLimit] = useState("");
    
    const user: UserInfo = useStore((state: any) => state.user);

    const handleCreateEnvelope = () => {

    };

    //  Shamelessly copied from Login
    return (
        <Box className="env-container">
            {/* Left Side: Text */}
            <Box className="env-text">
                <Typography variant="h3" gutterBottom>
                    Start Your Budget Now!
                </Typography>
                <Typography variant="body1">
                    Filling out a budget form is{" "}
                    <span className="highlight-text">super simple </span>
                    and helps you stay on top of your finances! Start by{" "}
                    <span className="highlight-text">giving your budget a name</span>, like{" "}
                    <span className="highlight-text">"Grocery Fund"</span> or{" "}
                    <span className="highlight-text">"Vacation Dreams"</span>,{" "}
                    to make it personal and fun. Then, add your 
                    <span className="highlight-text">current balance so you know exactly where you stand</span>.{" "}
                    Finally, set a{" "}
                    <span className="highlight-text">spending limit to keep things in check</span>{" "}
                    and make sure your money works for you.
                    
                </Typography>
            </Box>

            {/* Right Side: Form */}
            <Box className="env-form">
                <Typography variant="h4" align="center" gutterBottom>
                    Create Envelope
                </Typography>
                <Divider />
                <form onSubmit={handleCreateEnvelope}>
                    <TextField
                        className="textfield"
                        fullWidth
                        label="Envelope Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        className="textfield"
                        fullWidth
                        label="Initial Balance"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                    <TextField
                        className="textfield"
                        fullWidth
                        label="Set Limit"
                        variant="outlined"
                        margin="normal"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                    <Button
                        className="button1"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ marginTop: 2 }}
                    >
                        Create Envelope
                    </Button>
                </form>
            </Box>
        </Box>
    )
}