import { Box, Button, TextField, Typography } from "@mui/material";
import "./AddMoney.css";
import { useState } from "react";

export const AddMoney: React.FC = () => {
    const [amount, setAmount] = useState("");
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(amount);
    };

    return (
        <Box className="main-add-money-container">
            <Box className="add-money-container">
                <Typography variant="h3" gutterBottom>
                    Add Money
                </Typography>
                <form onSubmit={handleForm} className="add-money-form">
                    <TextField
                        label="Recieved From?"
                        fullWidth
                        margin="normal"
                        // onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <TextField
                        label="Amount"
                        fullWidth
                        margin="normal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        // onChange={(e) => setAmount(e.target.value)}
                        multiline
                        rows={4}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={false}>
                        Add Money
                    </Button>
                </form>
            </Box>
            <Box className="add-envelope-container">
            </Box>
        </Box>
    );
}