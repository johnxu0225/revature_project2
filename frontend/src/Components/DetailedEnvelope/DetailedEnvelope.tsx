import {ExpandCircleDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, Divider, Grid, Grid2, ListItem, Stack, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface Transaction {
  transaction_id: number;
  title: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface Envelope {
  envelope_id: number;
  user_id: number;
  envelope_description: string;
  max_limit: number;
  balance: number;
}

interface EnvelopeHistory {
  amount_history_id: number;
  envelope_id: number;
  transaction_id: number;
  envelope_amount: number;
}


export const DetailedEnvelope:React.FC = () =>{


    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [envelopeHistory, setEnvelopeHistory] = useState<EnvelopeHistory[]>([]);
    const [envelope, setEnvelope] = useState<Envelope>({
      envelope_id: 0,
      user_id: 0,
      envelope_description: "",
      max_limit: 0,
      balance: 0
    });

    useEffect(()=>{
      
      setTransactions([
     {transaction_id: 1, title: "Movie Outing", amount: -100, date: "10/10/21", description: "Went to the movies with friends.",category: "Entertainment"},
      {transaction_id: 2, title: "Paycheck", amount: 500, date: "10/12/21", description: "Bi-weekly paycheck.",category: "Income"},
      {transaction_id: 3, title: "Groceries", amount: -50, date: "10/20/21", description: "Groceries for the week.",category: "Food"},
      {transaction_id: 4, title: "Gas", amount: -25, date: "10/30/21", description: "Filled up the car.", category: "Transportation"},
      {transaction_id: 5, title: "Dinner", amount: -30, date: "11/1/21", description: "Dinner with friends.", category: "Food"},
      {transaction_id: 6, title: "Paycheck", amount: 500, date: "11/12/21", description: "Bi-weekly paycheck.", category: "Income"},
    ]);
      
      setEnvelope({envelope_id:0,user_id:1,envelope_description: "Basically Whatever Goes", max_limit: 4000, balance: 5000});

      setEnvelopeHistory([{
        amount_history_id: 1,
        envelope_id: 1,
        transaction_id: 1,
        envelope_amount: 5000
      },{
        amount_history_id: 2,
        envelope_id: 1,
        transaction_id: 2,
        envelope_amount: 5500
      },{
        amount_history_id: 3,
        envelope_id: 1,
        transaction_id: 3,
        envelope_amount: 5450
      },{
        amount_history_id: 4,
        envelope_id: 1,
        transaction_id: 4,
        envelope_amount: 5425
      },{
        amount_history_id: 5,
        envelope_id: 1,
        transaction_id: 5,
        envelope_amount: 5395
      },{
        amount_history_id: 6,
        envelope_id: 1,
        transaction_id: 6,
        envelope_amount: 5895
      }])
      const getEnvelopeAmountsWithDates = () => {
        return envelopeHistory
          .sort((a, b) => a.amount_history_id - b.amount_history_id)
          .map(history => {
            const transaction = transactions.find(t => t.transaction_id === history.transaction_id);
            return {
              envelope_amount: history.envelope_amount,
              date: transaction ? transaction.date : "Unknown date"
            };
          });
      };

      const envelopeAmountsWithDates = getEnvelopeAmountsWithDates();
      console.log(envelopeAmountsWithDates);
    },[])

    return (
      <>
        <br />
        <br />

        {/* using Grids from MUI to layout components. Root container element. */}
        <Grid2
          container
          spacing={2}
          sx={{ margin: "auto", alignItems: "center", maxWidth: "90%" }}
        >
          {/* Each subsequent child Grid2 element represents a row/column. Size of a row in a grid is 12, so we use size prop to adjust the width of the column. */}
          <Grid2
            size={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* card to display envelope details */}
            <Card
              sx={{
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 5,
                width: "100%",
              }}
              variant="outlined"
            >
              {/* CardHeader component to display envelope description and remaining amount (balance - max limit) */}
              <CardHeader
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
                title={
                  <>
                    <Stack direction="row">
                      <ListItem
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          {envelope.envelope_description}
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          ${envelope.balance - envelope.max_limit}
                        </Typography>
                      </ListItem>
                    </Stack>
                  </>
                }
              />
              {/* CardContent to display balance and max limit */}
              <CardContent>
                <Grid2
                  container
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Grid2 size={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Balance
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="h5">${envelope.balance}</Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <Divider />
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Envelope Limit
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="h5">${envelope.max_limit}</Typography>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>

          {/* Grid2 element with card inside to display transactions. Sizes are adjusted for different screen sizes with breakpoints. */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Card variant="outlined" sx={{ boxShadow: 3 }}>
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
                      <Button>New</Button>
                    </Stack>
                  </>
                }
              />

              {/* mapping out transactions to display in accordions. Sorting by transaction_id to display most recent transactions first. */}
              <CardContent sx={{ overflowY: "auto", maxHeight: "350px" }}>
                {transactions.length === 0 ? (
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    No transactions.{" "}
                  </Typography>
                ) : (
                  transactions
                    .sort((a, b) => b.transaction_id - a.transaction_id)
                    .map((transaction) => (
                      <Accordion sx={{ boxShadow: 1 }}>
                        <AccordionSummary
                          key={transaction.transaction_id}
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
                              <Typography sx={{ fontWeight: "bold" }}>
                                {transaction.title}
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Stack direction={{ xs: "column-reverse", md: "row" }} sx={{justifyContent: "space-between", width: "100%"}}>
                                <Typography>{transaction.date}</Typography>
                                {transaction.amount > 0 ? (
                                  <Typography
                                    sx={{ color: "green", fontWeight: "bold" }}
                                  >
                                    ${transaction.amount}
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{ color: "red", fontWeight: "bold" }}
                                  >
                                    -${Math.abs(transaction.amount)}
                                  </Typography>
                                )}
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
                            <Typography>{transaction.description}</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {" "}
                              {transaction.category}
                            </Typography>
                            <Button>Edit</Button>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    ))
                )}
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ boxShadow: 3 }}>
              <CardHeader
                title={
                  <>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Balance History
                    </Typography>
                  </>
                }
              />
              <CardContent>
                <Box sx={{ width: "100%", height: 200 }}>
                  <LineChart
                    series={[
                      {
                        data: envelopeHistory
                          .sort(
                            (a, b) => a.amount_history_id - b.amount_history_id
                          )
                          .map((history) => history.envelope_amount),
                        color: "green",
                      },
                    ]}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </>
    );
}