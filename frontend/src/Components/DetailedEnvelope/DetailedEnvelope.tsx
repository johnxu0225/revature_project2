import { Description, ExpandCircleDown, ExpandMore, ExpandMoreOutlined, ExpandMoreRounded, ExpandMoreTwoTone, Info } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, Divider, Grid, Grid2, LinearProgress, ListItem, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material"


export const DetailedEnvelope:React.FC = () =>{


    let Transactions = [
      { id: 1, amount: 2350, date: "11/1/24", title: "Initial Deposit", description:"Money money money"},
      { id: 2, amount: -350, date: "11/1/24", title: "Sonic 3", description:"Fun family movie! Shadow rocks!"},
      { id: 3, amount: -350, date: "11/1/24", title: "The Substance", description:"Great movie!"},
    ];


    return (
      <>
        <br />
        <br />
        <Grid2
          container
          spacing={2}
          sx={{ margin: "auto", alignItems: "center", maxWidth: "90%" }}
        >
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 5,
              }}
              variant="outlined"
            >
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
                          Movie Outings
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          $1000
                        </Typography>
                      </ListItem>
                    </Stack>
                  </>
                }
              />

              <CardContent>
                <Grid2
                  container
                  spacing={2}
                  sx={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <Grid2 size={6} >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Balance
                    </Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography variant="h5">$5000</Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <Divider />
                  </Grid2>
                  <Grid2 size={6} >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Envelope Limit
                    </Typography>
                  </Grid2>
                  <Grid2 size={6} >
                    <Typography variant="h5">$1000</Typography>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>

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
                      <Button>New Transaction</Button>
                    </Stack>
                  </>
                }
              />
              <CardContent sx={{ overflowY: "auto", maxHeight: "350px" }}>
                <Stack direction="column">
                  {Transactions.sort((a, b) => b.id - a.id).map(
                    (transaction) => (
                      <Accordion sx={{ boxShadow: 1 }}>
                        <AccordionSummary
                          key={transaction.id}
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
                            <ListItem sx={{ justifyContent: { xs: "space-between", md: "space-around" } }}>
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
                                  ${Math.abs(transaction.amount)}
                                </Typography>
                              )}
                            </ListItem>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography >{transaction.description}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    )
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </>
    );
}