import { Box, Button, TextField, Typography } from "@mui/material";
import "./AddMoney.css";
import { useEffect, useState } from "react";
import { EnvelopeListCard } from "./EnvelopeListCard";
import { Envelope } from './AddMoneyInterfaces';
import axios from "axios";
import useStore from "../../stores";

export const AddMoney: React.FC = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");
    const [enableBtn, setEnableBtn] = useState(true);
    const [error, setError] = useState("");
	const user = useStore((state: any) => state.user);
	// const setUser = useStore((state: any) => state.setUser);

    console.log(user);
    
    let envs: Envelope[] = [];

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            envs.reduce((acc, env) => acc + parseInt(env.amount), 0) == parseInt(amount) && 
            parseInt(amount) > 0
        ) {
            // TODO: send data to backend
            envs.forEach(async (env) => {
                if (parseInt(env.amount) > 0) {
                    await axios.post("http://localhost:8080/envelopes/allocate/id", {
                        title: title,
                        transactionDescription: desc,
                        transactionAmount: parseInt(env.amount),
                        category: ""
                    }, {
                        headers: {
                            // "Content-Type": "application/json"
                            "Authentication": "Bearer " // TODO: Add token here
                        }
                    });
                }
            });
        }
    };

    // TODO: remove when fetch is implemented
    for (let i = 0; i < 5; i++) {
        const [amountTemp, setAmountTemp] = useState("0");
        envs.push({
            envelope_id: i,
            user_id: 1,
            envelope_description: "temp",
            balance: 50,
            max_limit: 50,
            envelope_history: [],
            amount: amountTemp,
            setAmount: setAmountTemp
        });
    }

    // Fetches all envelopes
    useEffect(() => {
        axios.get("http://localhost:8080/envelopes", {
            headers: {
                // "Content-Type": "application/json",
                "Authentication": "Bearer " // TODO: Add token here
            }
        }).then((response) => {
            console.log(response.data);
            // TODO: add to envs
            // const [amountTemp, setAmountTemp] = useState("0");
            // envs.push({
            //     envelope_id: response.data.envelope_id,
            //     user_id: response.data.user_id,
            //     envelope_description: response.data.description,
            //     balance: response.data.balance,
            //     max_limit: response.data.limit,
            //     envelope_history: response.data.history,
            //     amount: amountTemp,
            //     setAmount: setAmountTemp
            // });
        });
    }, []);

    // Error checks amount usage as envelopes fill
    useEffect(() => {
        const sum = envs.reduce((acc, env) => acc + parseInt(env.amount), 0);
        if (amount == "" && sum != 0) {
            setError("Error: Amount not set yet");
            return;
        } else if (sum > parseInt(amount)) {
            setError("Error: set more than amount");
        } else {
            setError("");
            if (parseInt(amount) == sum) {
                setEnableBtn(false);
            } else {
                setEnableBtn(true);
            }
        }
    }, [envs, amount]);

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
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setDesc(e.target.value)}
                        multiline
                        rows={4}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={enableBtn}>
                        Add Money
                    </Button>
                </form>
            </Box>
            <Box className="add-envelope-container">
                <Box>
                    <Typography variant="h5" sx={{ color: "red", margin: "auto", width: "fit-content" }}>
                        {error}
                    </Typography>
                </Box>
                <Box className="envelope-list">
                    {envs.map((env, index) => {
                        let color = "envelope-header-warning";
                        if (env.balance == env.max_limit) {
                            color = "envelope-header-good";
                        } else if (env.balance < 0) {
                            color = "envelope-header-danger";
                        }

                        return (
                            <div style={{ height: "fit-content" }} key={index}>
                                <EnvelopeListCard colorClass={color} envelope={env} />
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}