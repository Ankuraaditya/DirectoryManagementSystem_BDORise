import { useState, useEffect } from "react";
import { addBusiness, fetchCategories } from "../api/api";
import {
    Button, Container, TextField, Typography, MenuItem,
    Select, FormControl, InputLabel, Alert, Grid, Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddBusiness() {
    const [formData, setFormData] = useState({
        name: "",
        categoryID: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        website: "",
        rating: "",
    });

    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // Validation function
    const validate = (name, value) => {
        let error = "";

        if (name === "zipCode" && !/^[0-9]{6}$/.test(value)) {
            error = "Zip Code must be exactly 6 digits.";
        }

        if (name === "phoneNumber" && !/^[0-9]{10}$/.test(value)) {
            error = "Phone Number must be exactly 10 digits.";
        }

        if (name === "rating" && (value < 1 || value > 5)) {
            error = "Rating must be between 1 and 5.";
        }

        if (name === "website" && value && !/^.+\..+/.test(value)) {
            error = "Enter a valid website URL.";
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) return;
        addBusiness(formData).then(() => navigate("/"));
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "30px" }}>
            <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
                <Typography variant="h4" gutterBottom align="center">
                    Add a Business
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Business Name" name="name" value={formData.name} onChange={handleChange} required fullWidth margin="normal" error={!!errors.name} helperText={errors.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal" error={!!errors.categoryID}>
                                <InputLabel>Category</InputLabel>
                                <Select name="categoryID" value={formData.categoryID} onChange={handleChange} required>
                                    {categories.map((category) => (
                                        <MenuItem key={category.categoryID} value={category.categoryID}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required fullWidth margin="normal" error={!!errors.address} helperText={errors.address} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="City" name="city" value={formData.city} onChange={handleChange} required fullWidth margin="normal" error={!!errors.city} helperText={errors.city} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="State" name="state" value={formData.state} onChange={handleChange} required fullWidth margin="normal" error={!!errors.state} helperText={errors.state} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} required fullWidth margin="normal" error={!!errors.zipCode} helperText={errors.zipCode} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Website" name="website" value={formData.website} onChange={handleChange} fullWidth margin="normal" error={!!errors.website} helperText={errors.website} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Rating (1-5)" name="rating" type="number" value={formData.rating} onChange={handleChange} fullWidth margin="normal" error={!!errors.rating} helperText={errors.rating} />
                        </Grid>
                    </Grid>
                    {Object.values(errors).some((error) => error) && (
                        <Alert severity="error" style={{ marginTop: "10px" }}>
                            Please correct the errors before submitting.
                        </Alert>
                    )}
                    <Grid container spacing={2} style={{ marginTop: "20px" }}>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={Object.values(errors).some((error) => error)}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/")}>Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default AddBusiness;
