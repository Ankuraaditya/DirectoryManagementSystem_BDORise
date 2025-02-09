import { useEffect, useState } from "react";
import { fetchBusinesses, deleteBusiness, fetchCategories } from "../api/api";
import {
    Button, Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, MenuItem, Select, FormControl, InputLabel, TablePagination, TableFooter
} from "@mui/material";
import axios from "axios";

function Home() {
    const [businesses, setBusinesses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editBusiness, setEditBusiness] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");  // Search Query
    const [page, setPage] = useState(0);  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(10);  // Max records per page

    useEffect(() => {
        fetchBusinesses()
            .then((res) => setBusinesses(res.data.sort((a, b) => a.name.localeCompare(b.name))))
            .catch((err) => console.error("Error fetching businesses:", err));

        fetchCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleDelete = (id) => {
        deleteBusiness(id).then(() => {
            setBusinesses(businesses.filter((biz) => biz.businessID !== id));
        });
    };

    const handleEditClick = (business) => {
      console.log("edit button clicked");
        setEditBusiness(business);
        setOpen(true);
        console.log("edit button clicked2");
    };

    const handleClose = () => {
        setOpen(false);
        setEditBusiness(null);
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:5245/api/Businesses/${editBusiness.businessID}`, editBusiness)
            .then(() => {
                setBusinesses(businesses.map(biz => biz.businessID === editBusiness.businessID ? editBusiness : biz));
                setOpen(false);
            })
            .catch((err) => console.error("Error updating business:", err));
    };

    // Filter businesses based on search query
    const filteredBusinesses = businesses.filter((biz) =>
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <Typography variant="h4" sx={{ mb: 2 }}>Business Directory</Typography>

            {/* Search Bar */}
            <TextField
                fullWidth
                label="Search by Name or City"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" href="/add-business" sx={{ mb: 2 }}>Add Business</Button>

            {/* Business Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Address</strong></TableCell>
                            <TableCell><strong>State/Zip</strong></TableCell>
                            <TableCell><strong>Contact</strong></TableCell>
                            <TableCell><strong>Website</strong></TableCell>
                            <TableCell><strong>Rating</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBusinesses.length > 0 ? (
                            filteredBusinesses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate results
                                .map((biz) => (
                                    <TableRow key={biz.businessID}>
                                        <TableCell>{biz.name}</TableCell>
                                        <TableCell>
                                            {categories.find(cat => cat.categoryID === biz.categoryID)?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>{biz.address}</TableCell>
                                        <TableCell>{biz.state}, {biz.zipCode}</TableCell>
                                        <TableCell>{biz.phoneNumber}</TableCell>
                                        <TableCell>
                                            <a href={biz.website} target="_blank" rel="noopener noreferrer">{biz.website}</a>
                                        </TableCell>
                                        <TableCell>{biz.rating}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(biz)}>Edit</Button>
                                            <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(biz.businessID)} sx={{ ml: 1 }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">No businesses found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    { /*edit button dialuge*/}
                    <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Business</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="dense" value={editBusiness?.name || ""} onChange={(e) => setEditBusiness({ ...editBusiness, name: e.target.value })} />
                    
                    {/* Category Dropdown */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="categoryID"
                            value={editBusiness?.categoryID || ""}
                            onChange={(e) => setEditBusiness({ ...editBusiness, categoryID: e.target.value })}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryID} value={category.categoryID}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField label="Address" fullWidth margin="dense" value={editBusiness?.address || ""} onChange={(e) => setEditBusiness({ ...editBusiness, address: e.target.value })} />
                    <TextField label="State" fullWidth margin="dense" value={editBusiness?.state || ""} onChange={(e) => setEditBusiness({ ...editBusiness, state: e.target.value })} />
                    <TextField label="Zip Code" fullWidth margin="dense" value={editBusiness?.zipCode || ""} onChange={(e) => setEditBusiness({ ...editBusiness, zipCode: e.target.value })} />
                    <TextField label="Phone Number" fullWidth margin="dense" value={editBusiness?.phoneNumber || ""} onChange={(e) => setEditBusiness({ ...editBusiness, phoneNumber: e.target.value })} />
                    <TextField label="Website" fullWidth margin="dense" value={editBusiness?.website || ""} onChange={(e) => setEditBusiness({ ...editBusiness, website: e.target.value })} />
                    <TextField label="Rating" fullWidth margin="dense" type="number" value={editBusiness?.rating || ""} onChange={(e) => setEditBusiness({ ...editBusiness, rating: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>

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

export default Home;
