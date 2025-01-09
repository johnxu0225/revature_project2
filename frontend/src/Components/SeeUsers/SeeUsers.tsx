import { Box, Typography } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function () {
    const [users, setUsers] = useState([
        { id: 1, firstName: "John", lastName: "Doe", username: "johndoe", role: "ROLE_MANAGER" },
        { id: 2, firstName: "Jane", lastName: "Smith", username: "janesmith", role: "ROLE_EMPLOYEE" },
    ]);

    useEffect(() => {
        // Fetch users from the server
        fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Auth
            }
        })
    }, []);
    return (
        <Box sx={{ width: "75vw", margin: "auto", paddingTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                All Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "50px" }}>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell sx={{ width: "150px" }}>Role</TableCell>
                            <TableCell sx={{ width: "250px" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{ width: "50px" }}>{user.id}</TableCell>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell sx={{ width: "150px" }}>{user.role}</TableCell>
                                <TableCell sx={{ width: "250px" }}>
                                    {user.role == "ROLE_EMPLOYEE" &&
                                        <Button variant="contained" color="secondary" sx={{ marginRight: "1rem" }}>
                                            Promote
                                        </Button>
                                    }
                                    <Button variant="contained" color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
