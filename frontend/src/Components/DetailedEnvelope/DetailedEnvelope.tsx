import {CloseOutlined, ExpandCircleDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, IconButton, ListItem, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import {UserInfo} from "../../stores";
import useStore  from "../../stores";

import './DetailedEnvelope.scss';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Transaction {
  transactionId: number;
  title: string;
  transactionAmount: number;
  datetime: Date;
  transactionDescription: string;
  category: string;
}

interface OutgoingTransaction {
  title: string;
  transactionAmount: number;
  transactionDescription: string;
  category: string;
}

interface Envelope {
  envelopeId: number;
  user: any;
  envelopeDescription: string;
  maxLimit: number;
  balance: number;
}

interface EnvelopeHistory {
  amountHistoryId: number;
  envelope: Envelope;
  transaction: Transaction;
  envelopeAmount: number;
}


export const DetailedEnvelope:React.FC = () =>{

    const statusColors = { low: "#8b4dfe", high: "#23A455" };
    const [statusColor, setStatusColor] = useState(statusColors.high);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [envelopeHistory, setEnvelopeHistory] = useState<EnvelopeHistory[]>([]);

    const [remaining, setRemaining] = useState(0);

    const [transactionMenu, setTransactionMenu] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [transactiontoEdit, setTransactiontoEdit] = useState<Transaction>({transactionId: 0, title: "", transactionAmount: 0, datetime: new Date(), transactionDescription: "", category: ""});
    const [transactiontoCreate, setTransactiontoCreate] = useState<OutgoingTransaction>({title: "", transactionAmount: 0, transactionDescription: "", category: ""});
    const [createAmountError, setCreateAmountError] = useState(false);

    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); 

    const user:UserInfo = useStore((state: any) => state.user);

    
    // get the value from URL to use as envelope id when routed from main envelope screen
    const { id } = useParams();
    const navigate = useNavigate();
  

    const [envelope, setEnvelope] = useState<Envelope>({
      envelopeId: 0,
      user: null,
      envelopeDescription: "",
      maxLimit: 0,
      balance: 0,
    });

    const [amountHistoryWithDate, setAmountHistoryWithDate] = useState([{}]);

    const toastAlert = (message:string) => {
      setAlertMessage(message);
      setShowAlert(true);
    }

    const changeEditTransactionValues = (event:any) =>{
      setTransactiontoEdit({...transactiontoEdit, [event.target.name]: event.target.value});
    }

    const editTransactionValues = async(event:any) =>{
      event.preventDefault();

      let currentTransaction = transactions.find((transaction) => transaction.transactionId === transactiontoEdit.transactionId);

      if (currentTransaction?.title !== transactiontoEdit.title) {
        console.log("Title changed from ", currentTransaction?.title, " to ", transactiontoEdit.title);
        try{
          await axios.patch(`http://localhost:8080/transactions/title/${transactiontoEdit.transactionId}`,transactiontoEdit.title,{headers: {Authorization:`Bearer ${user.token}`, "Content-Type": "text/plain"}, withCredentials: true});
          setTransactions(transactions.map((transaction) => {
            if (transaction.transactionId === transactiontoEdit.transactionId) {
              return {...transaction, title: transactiontoEdit.title};
            } else {
              return transaction;
             }
            }));
          toastAlert("Title changed successfully!");
          }
          catch(err){
            toastAlert("Error editing transaction title.");
        }

      }

      if (currentTransaction?.transactionDescription !== transactiontoEdit.transactionDescription) {
        console.log("Description changed from ", currentTransaction?.transactionDescription, " to ", transactiontoEdit.transactionDescription);

         try{
          await axios.patch(`http://localhost:8080/transactions/description/${transactiontoEdit.transactionId}`,transactiontoEdit.transactionDescription,{headers: {Authorization:`Bearer ${user.token}`, "Content-Type": "text/plain"}, withCredentials: true});
          setTransactions(transactions.map((transaction) => {
            if (transaction.transactionId === transactiontoEdit.transactionId) {
              return {...transaction, transactionDescription: transactiontoEdit.transactionDescription};
            } else {
              return transaction;
             }
            }));
            toastAlert("Description changed successfully!");
          }
          catch(err){
           toastAlert("Error editing transaction description.");
        }
      }

      if (currentTransaction?.category !== transactiontoEdit.category) {
        console.log("Category changed from ", currentTransaction?.category, " to ", transactiontoEdit.category);

      }
      
    }

    const changeCreateTransactionValues = (event:any) =>{

      if (event.target.name === "transactionAmount") {
        if (parseInt(event.target.value) > envelope.balance) {
          setCreateAmountError(true);
          return;
        }
        else{
          setCreateAmountError(false);
        }
      }
        setTransactiontoCreate({...transactiontoCreate, [event.target.name]: event.target.value});
    }


    const handleCreateClose = () =>{
      setTransactiontoCreate({title: "", transactionAmount: 0, transactionDescription: "", category: ""});
      setOpenCreate(false);
      setCreateAmountError(false);

    }

    const createTransaction = async(event:any) => {
      event.preventDefault();
      let newTransaction = {
        title: transactiontoCreate.title,
        transactionDescription: transactiontoCreate.transactionDescription,
        transactionAmount: transactiontoCreate.transactionAmount,
        category: transactiontoCreate.category,
      };
        axios.post(`http://localhost:8080/envelopes/spend/${id}`,newTransaction,{headers: {Authorization:`Bearer ${user.token}`, "Content-Type": "application/json"}, withCredentials: true})
        .then((response) => {
          setTransactions([...transactions, {transactionId: response.data.transactionId, title: response.data.title, transactionAmount: response.data.transactionAmount, datetime: new Date(response.data.datetime), transactionDescription: response.data.transactionDescription, category: response.data.category}]);
          setEnvelope({...envelope, balance: envelope.balance + response.data.transactionAmount});
          setRemaining(remaining+response.data.transactionAmount);
          toastAlert("Transaction created successfully!");
        }).catch((err) => {
          toastAlert("Error creating transaction.");
        });
    }

    useEffect(()=>{

      //fetch envelope info
      axios
        .get(`http://localhost:8080/envelopes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setEnvelope({
            envelopeId: response.data.envelope_id,
            user: response.data.user,
            envelopeDescription: response.data.envelopeDescription,
            maxLimit: response.data.maxLimit,
            balance: response.data.balance,
          });
          setRemaining(response.data.maxLimit - response.data.balance);
          if (response.data.maxLimit - response.data.balance < 100) {
            setStatusColor(statusColors.low);
          }
        })
        .catch((err) => {
          if (err.response.data)
          console.error(err);
        });

      //fetch transactions
      axios
        .get(`http://localhost:8080/transactions/envelope/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (
            response.data.body ===
            `Transaction with Envelope id ${id} does not exist`
          ) {
            setTransactions([]);
          } else {
            let fetchedTransactions = [];
            for (let i = 0; i < response.data.body.length; i++) {
              let transaction = response.data.body[i];
              let newTransaction = {
                transactionId: transaction.transactionId,
                title: transaction.title,
                transactionAmount: transaction.transactionAmount,
                datetime: new Date(transaction.datetime),
                transactionDescription: transaction.transactionDescription,
                category: transaction.category,
              };
              fetchedTransactions.push(newTransaction);
            }
            setTransactions(fetchedTransactions);
            toastAlert("Welcome!");
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // get envelope balance history
      axios
        .get(`http://localhost:8080/envelopes/history/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.body === `Envelope history with Envelope id ${id} does not exist`) {
            setEnvelopeHistory([]);
          }
          else{
            let fetchedEnvelopeHistory = [];
            for (let i = 0; i < response.data.length; i++) {
              let envelopeHistory = response.data[i];
              let newEnvelopeHistory = {
                amountHistoryId: envelopeHistory.amountHistoryId,
                envelope: envelopeHistory.envelope,
                transaction: envelopeHistory.transaction,
                envelopeAmount: envelopeHistory.envelopeAmount,
              };
              fetchedEnvelopeHistory.push(newEnvelopeHistory);
            }
            setEnvelopeHistory(fetchedEnvelopeHistory);
          }
        })
        .catch((err) => {
          console.error(err);
        });
        
      /*
      setTransactions([
     {transactionId: 1, title: "Movie Outing", amount: -100, date: new Date("2022-03-05"), description: "Went to the movies with friends.",category: "Entertainment"},
      {transactionId: 2, title: "Paycheck", amount: 500, date: new Date("2022-03-05"), description: "Bi-weekly paycheck.",category: "Income"},
      {transactionId: 3, title: "Groceries", amount: -50, date: new Date("2025-01-09T13:48:27.697493"), description: "Groceries for the week.",category: "Food"},
      {transactionId: 4, title: "Gas", amount: -25, date: new Date("2022-03-05"), description: "Filled up the car, then did a bunch of other stuff. Now, where was I? blah blah blah", category: "Transportation"},
      {transactionId: 5, title: "Dinner", amount: -30, date: new Date("2022-03-05"), description: "Dinner with friends.", category: "Food"},
      {transactionId: 6, title: "Paycheck", amount: 500, date: new Date("2021-03-05"), description: "Bi-weekly paycheck.", category: "Income"},
    ]);
    
      
      setEnvelope({envelopeID:0,user_id:1,envelope_description: "Basically Whatever Goes", max_limit: 4000, balance: 5000});

      
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
      */

      setLoading(false);
    },[user])


    return (
      <>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            <br />
            <br />
            {/* using Grids from MUI to layout components. Root container element. */}
            <Grid2
              container
              spacing={2}
              sx={{
                margin: "auto",
                alignItems: "center",
                maxWidth: { xs: "90%", md: "70%" },
              }}
              id="mainContainer"
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
                      backgroundColor: statusColor,
                      color: "white",
                      textAlign: "center",
                    }}
                    title={
                      <>
                        <Stack direction="row">
                          <ListItem
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                              {envelope.envelopeDescription}
                            </Typography>
                          </ListItem>
                          <ListItem
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                              ${envelope.balance}
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
                        <Typography variant="h5" sx={{}}>
                          Envelope Limit
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="h5">
                          ${envelope.maxLimit}
                        </Typography>
                      </Grid2>
                      <Grid2 size={12}>
                        <Divider />
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          Remaining
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="h5">
                          {remaining > 0 ? (
                            <>${remaining}</>
                          ) : (
                            <>-${Math.abs(remaining)}</>
                          )}
                        </Typography>
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
                          <Button
                            onClick={() => {
                              setTransactionMenu(true);
                            }}
                            id="newButton"
                            variant="contained"
                          >
                            New
                          </Button>
                          <Menu
                            open={transactionMenu}
                            onClose={() => {
                              setTransactionMenu(false);
                            }}
                            anchorEl={document.getElementById("newButton")}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                navigate("/add");
                              }}
                            >
                              Add
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setOpenCreate(true);
                                setTransactionMenu(false);
                              }}
                            >
                              Spend
                            </MenuItem>
                          </Menu>
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
                        .sort(
                          (a, b) => b.datetime.getTime() - a.datetime.getTime()
                        )
                        .map((transaction) => (
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
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    {transaction.title}
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
                                    setOpenEdit(true);
                                  }}
                                >
                                  Edit
                                </Button>
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
                    <Box sx={{ width: "100%", height: "315px" }}>
                      <LineChart
                        series={[
                          {
                            data: envelopeHistory.map((history) => {
                              return history.envelopeAmount;
                            }),
                            color: "#8b4dfe",
                          },
                        ]}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>

            {/* Dialog for creating transactions */}
            <Dialog
              open={openCreate}
              onClose={() => {
                handleCreateClose();
              }}
            >
              <DialogTitle>
                Spending from {envelope.envelopeDescription}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Enter details below.</DialogContentText>
                <br />
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="createTitle"
                    name="title"
                    label="Title"
                    required
                    onChange={changeCreateTransactionValues}
                  />
                  <TextField
                    id="createTransactionDescription"
                    name="transactionDescription"
                    label="Description"
                    multiline
                    required
                    maxRows={5}
                    onChange={changeCreateTransactionValues}
                  />
                  <TextField
                    error={createAmountError}
                    id="createTransactionAmount"
                    name="transactionAmount"
                    label="Amount"
                    type="number"
                    helperText={
                      createAmountError
                        ? "Amount exceeds envelope balance."
                        : ""
                    }
                    required
                    onChange={changeCreateTransactionValues}
                  />
                  <TextField
                    id="createTransactionCategory"
                    name="category"
                    label="Category"
                    multiline
                    maxRows={5}
                    required
                    onChange={changeCreateTransactionValues}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleCreateClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    createAmountError ||
                    transactiontoCreate.title === "" ||
                    transactiontoCreate.transactionAmount === 0 ||
                    transactiontoCreate.transactionDescription === "" ||
                    transactiontoCreate.category === ""
                  }
                  type="submit"
                  onClick={(e) => {
                    createTransaction(e);
                    setTransactiontoCreate({
                      title: "",
                      transactionAmount: 0,
                      transactionDescription: "",
                      category: "",
                    });
                    setOpenCreate(false);
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {/* Dialog for editing transactions */}
            <Dialog
              open={openEdit}
              onClose={() => {
                setOpenEdit(false);
              }}
            >
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <br />
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="editTitle"
                    name="title"
                    label="Title"
                    defaultValue={transactiontoEdit.title}
                    onChange={changeEditTransactionValues}
                    error={transactiontoEdit.title === ""}
                  />
                  <TextField
                    id="editTransactionDescription"
                    name="transactionDescription"
                    label="Description"
                    multiline
                    maxRows={5}
                    error={transactiontoEdit.transactionDescription === ""}
                    defaultValue={transactiontoEdit.transactionDescription}
                    onChange={changeEditTransactionValues}
                  />
                  {/* <TextField
                    id="editTransactionCategory"
                    name="category"
                    label="Category"
                    defaultValue={transactiontoEdit.category}
                    onChange={changeEditTransactionValues}
                  />*/}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    transactiontoEdit.title === "" ||
                    transactiontoEdit.transactionDescription === ""
                  }
                  type="submit"
                  onClick={(e) => {
                    editTransactionValues(e);
                    setOpenEdit(false);
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={showAlert}
              autoHideDuration={6000}
              onClose={() => {
                setShowAlert(false);
              }}
              message={alertMessage}
              action={
                <>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                      setShowAlert(false);
                    }}
                  >
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </>
              }
            />
          </>
        )}
      </>
    );
  
}
