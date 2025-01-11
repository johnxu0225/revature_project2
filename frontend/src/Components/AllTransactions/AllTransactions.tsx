import { Box, Button, Card, CardContent, CardHeader, Grid2, Menu, MenuItem, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import useStore, { UserInfo } from "../../stores";
import { Envelope, Transaction } from "./AllTransactionsInterface";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import TransactionCard from "./TransactionCard";


export const AllTransactions: React.FC = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [envelopes, setEnvelopes] = useState<Envelope[]>([]);

    const [filterMenu, setFilterMenu] = useState(false);

    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<string>("All");

    const user: UserInfo = useStore((state: any) => state.user);
    // const navigate = useNavigate();

    useEffect(() => {
        //fetch all envelope info
        axios
            .get(`http://localhost:8080/envelopes/user/${user.userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((response) => {
                const temp: Envelope[] = [];
                for (let i = 0; i < response.data.length; i++) {
                    temp.push({
                        envelopeId: response.data[i].envelopeId,
                        envelopeDescription: response.data[i].envelopeDescription,
                        maxLimit: response.data[i].maxLimit,
                        balance: response.data[i].balance,
                    });
                }
                setEnvelopes(temp);
            });
    }, [user]);

    useEffect(() => {
        const uniqueEnvelopeIds = envelopes.reduce<number[]>((acc, curr) => {
            if (!acc.includes(curr.envelopeId)) {
                acc.push(curr.envelopeId);
            }
            return acc;
        }, []);

        //fetch transactions
        for (let i = 0; i < uniqueEnvelopeIds.length; i++) {
            axios
                .get(`http://localhost:8080/transactions/envelope/${uniqueEnvelopeIds[i]}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    if (
                        response.data.body !==
                        `Transaction with Envelope id ${user.userId} does not exist`
                    ) {
                        let fetchedTransactions = [];
                        for (let i = 0; i < response.data.body.length; i++) {
                            let transaction = response.data.body[i];
                            console.log(transaction);
                            let newTransaction = {
                                transactionId: transaction.transactionId,
                                title: transaction.title,
                                transactionAmount: transaction.transactionAmount,
                                datetime: new Date(transaction.datetime),
                                transactionDescription: transaction.transactionDescription,
                                category: transaction.category,
                                envelopeId: transaction.envelope.envelopeId,
                            };
                            fetchedTransactions.push(newTransaction);
                        }
                        setTransactions([...transactions, ...fetchedTransactions]);
                        setAllCategories([...new Set(fetchedTransactions.map((transaction) => transaction.category))]);
                    }
                });
        }
    }, [envelopes]);


    return (
        <Box sx={{ padding: "20px", width: "75%", margin: "auto", height: "calc(100vh - 50px - 20px)" }}>
            <Grid2 size={{ xs: 12, md: 7 }} sx={{ height: "100%", overflow: "auto" }}>
                <Card variant="outlined" sx={{ boxShadow: 3, maxHeight: "100%", overflow: "auto" }}>
                    <CardHeader
                        title={
                            <>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                        Transactions
                                    </Typography>


                                    {/* Filter and Options buttons */}
                                    <Button id="categoryButton" size="small" onClick={() => { setFilterMenu(true) }}>
                                        Filter {filteredCategory === "All" ? "" : `: ${filteredCategory}`}
                                    </Button>

                                    {/* Menu for filtering transactions */}
                                    <Menu
                                        open={filterMenu}
                                        onClose={() => {
                                            setFilterMenu(false);
                                        }}
                                        anchorEl={document.getElementById("categoryButton")}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        sx={{ overflowY: "auto" }}
                                    >

                                        <MenuItem sx={{ fontWeight: "bold" }}
                                            onClick={() => {
                                                setFilteredCategory("All");
                                                setFilterMenu(false);
                                            }}>All</MenuItem>
                                        <MenuItem sx={{ fontWeight: "bold" }} disabled
                                        >Category</MenuItem>
                                        {allCategories.map((category) => {
                                            return (
                                                <MenuItem
                                                    onClick={() => {
                                                        setFilteredCategory(category);
                                                        setFilterMenu(false);
                                                    }}
                                                >
                                                    {category}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </Stack>
                            </>
                        }
                    />

                    {/* mapping out transactions to display in accordions. Sorting by transaction_id to display most recent transactions first. */}
                    <CardContent sx={{ overflowY: "auto", maxHeight: "100%" }}>
                        {transactions.length === 0 ? (
                            <Typography variant="h4" sx={{ textAlign: "center" }}>
                                No transactions.{" "}
                            </Typography>
                        ) : (
                            transactions
                                .filter((transaction) => transaction.category === filteredCategory || filteredCategory === "All")
                                .sort(
                                    (a, b) => b.datetime.getTime() - a.datetime.getTime()
                                )
                                .map((transaction) => {
                                    const name = envelopes.find( (envelope) =>
                                            envelope.envelopeId == transaction.envelopeId
                                    )?.envelopeDescription;
                                    return <TransactionCard envelopeName={name? name : "undefined"} transaction={transaction} />})
                        )}
                    </CardContent>
                </Card>
            </Grid2>
        </Box>
    )
}