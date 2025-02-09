import { useState, useEffect } from "react";
import { addBusiness, fetchCategories } from "../api/api";
import { Button, Container, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddBusiness() {
    const [formData, setFormData] = useState({
        name: "",
        categoryID: "",  // Store category ID instead of name
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        website: "",
        rating: "",
    });

    const [categories, setCategories] = useState([]);  // Store category list

    const navigate = useNavigate();

    // Fetch categories when component loads
    useEffect(() => {
        fetchCategories()
            .then((res) => setCategories(res.data))  // Store categories from API
            .catch((err) => console.error("Error fetching categories:", err));
            console.log(categories)
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBusiness(formData).then(() => navigate("/"));
    };

    return (
        <Container>
            <Typography variant="h4">Add a Business</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" name="name" onChange={handleChange} required fullWidth margin="normal" />

                {/* Category Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="categoryID"
                        value={formData.categoryID}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.categoryID} value={category.categoryID}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField label="Address" name="address" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="City" name="city" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="State" name="state" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Zip Code" name="zipCode" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Phone Number" name="phoneNumber" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Website" name="website" onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Rating" name="rating" type="number" onChange={handleChange} fullWidth margin="normal" />

                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
}

export default AddBusiness;
