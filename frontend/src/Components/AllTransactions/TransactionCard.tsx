import { Accordion, AccordionDetails, AccordionSummary, Button, ListItem, Stack, Typography } from "@mui/material";
import { Transaction } from "./AllTransactionsInterface";
import { ExpandCircleDown } from "@mui/icons-material";
import { useState } from "react";


export default function ({ envelopeName, transaction }: { envelopeName: string, transaction: Transaction }) {
    const [_openEdit, setOpenEdit] = useState(false);
    const [_transactiontoEdit, setTransactiontoEdit] = useState<Transaction>({ 
        transactionId: 0, 
        title: "", 
        transactionAmount: 0, 
        datetime: new Date(), 
        transactionDescription: "", 
        category: "",
        envelopeId: -1
    });
    const [_edited, setEdited] = useState(false);

    return (
        <Accordion sx={{ boxShadow: 1 }}>
            <AccordionSummary
                key={transaction.transactionId}
                expandIcon={<ExpandCircleDown />}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        width: "95%",
                    }}
                >
                    <ListItem>
                        <Typography>
                            Envelope: {envelopeName}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Title: {transaction.title}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Stack
                            direction={{
                                xs: "column-reverse",
                                md: "row",
                            }}
                            sx={{
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Typography color="palette.secondary.light">
                                {transaction.datetime.getMonth() + 1}/
                                {transaction.datetime.getDate()}/
                                {transaction.datetime
                                    .getFullYear()
                                    .toString()
                                    .substr(-2)}
                            </Typography>
                            {transaction.transactionAmount > 0 ? (
                                <Typography
                                    sx={{
                                        color: "green",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ${transaction.transactionAmount}
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    -$
                                    {Math.abs(
                                        transaction.transactionAmount
                                    )}
                                </Typography>
                            )}
                            {/* <Typography>
                                New total: lazy~~
                            </Typography> */}
                        </Stack>
                    </ListItem>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography>
                        {transaction.transactionDescription}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {transaction.category}
                    </Typography>
                    <Button
                        className="editButton"
                        onClick={() => {
                            setTransactiontoEdit(transaction);
                            setEdited(false);
                            setOpenEdit(true);
                        }}
                    >
                        Edit
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};