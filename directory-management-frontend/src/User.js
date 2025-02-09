import { useEffect, useState } from "react";
import { fetchBusinesses } from "./api/api";
import {
    Container, Typography, TextField, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination, TableFooter, TableSortLabel
} from "@mui/material";

function User() {
    const [businesses, setBusinesses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        fetchBusinesses()
            .then((res) => setBusinesses(res.data))
            .catch((err) => console.error("Error fetching businesses:", err));
    }, []);

    // Filter businesses based on search query
    const filteredBusinesses = businesses.filter((biz) =>
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting function
    const handleSort = (column) => {
        const isAscending = sortColumn === column && sortDirection === "asc";
        setSortColumn(column);
        setSortDirection(isAscending ? "desc" : "asc");

        setBusinesses((prevBusinesses) =>
            [...prevBusinesses].sort((a, b) => {
                if (a[column] < b[column]) return isAscending ? 1 : -1;
                if (a[column] > b[column]) return isAscending ? -1 : 1;
                return 0;
            })
        );
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>Business Directory</Typography>

            {/* Search Bar */}
            <TextField
                fullWidth
                label="Search by Name or City"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Business Table */}
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === "name"}
                                    direction={sortDirection}
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === "city"}
                                    direction={sortDirection}
                                    onClick={() => handleSort("city")}
                                >
                                    City
                                </TableSortLabel>
                            </TableCell>
                            <TableCell><strong>State</strong></TableCell>
                            <TableCell><strong>Rating</strong></TableCell>
                            <TableCell><strong>Website</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBusinesses.length > 0 ? (
                            filteredBusinesses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((biz) => (
                                    <TableRow key={biz.businessID}>
                                        <TableCell>{biz.name}</TableCell>
                                        <TableCell>{biz.city}</TableCell>
                                        <TableCell>{biz.state}</TableCell>
                                        <TableCell>{biz.rating}</TableCell>
                                        <TableCell>
                                            <a href={biz.website} target="_blank" rel="noopener noreferrer">{biz.website}</a>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No businesses found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    {/* Pagination */}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={filteredBusinesses.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelDisplayedRows={({ from, to, count }) =>
                                    `Showing ${from}-${to} of ${count} records`
                                }
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default User;
