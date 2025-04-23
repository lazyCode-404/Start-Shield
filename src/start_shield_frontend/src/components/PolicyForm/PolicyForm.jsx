// // src/frontend/src/components/PolicyForm.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Grid,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
//     Box,
//     Alert,
//     CircularProgress,
//     Slider,
//     InputAdornment
// } from '../../../../../node_modules@mui/material';

// function PolicyForm({ policyActor, refreshPolicies }) {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         policyType: 'basic',
//         coverage: 1000,
//         premium: 0 // This will be calculated
//     });
//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);

//     // Calculate premium based on policy type and coverage
//     const calculatePremium = (type, coverage) => {
//         let rate = 0;
//         switch (type) {
//             case 'basic':
//                 rate = 0.01; // 1% of coverage
//                 break;
//             case 'standard':
//                 rate = 0.05; // 5% of coverage
//                 break;
//             case 'premium':
//                 rate = 0.1; // 10% of coverage
//                 break;
//             default:
//                 rate = 0.01;
//         }
//         return Math.round(coverage * rate);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         const updatedFormData = {
//             ...formData,
//             [name]: value
//         };

//         // Recalculate premium when policy type or coverage changes
//         if (name === 'policyType' || name === 'coverage') {
//             updatedFormData.premium = calculatePremium(
//                 name === 'policyType' ? value : formData.policyType,
//                 name === 'coverage' ? value : formData.coverage
//             );
//         }

//         setFormData(updatedFormData);
//     };

//     const handleCoverageChange = (_, newValue) => {
//         const updatedFormData = {
//             ...formData,
//             coverage: newValue,
//             premium: calculatePremium(formData.policyType, newValue)
//         };
//         setFormData(updatedFormData);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess(false);

//         try {
//             setSubmitting(true);

//             // Convert policy type to variant for Motoko
//             const policyTypeVariant = {
//                 [formData.policyType]: null
//             };

//             const result = await policyActor.createPolicy(
//                 policyTypeVariant,
//                 Number(formData.coverage),
//                 Number(formData.premium)
//             );

//             if (result.err) {
//                 setError(result.err);
//             } else {
//                 setSuccess(true);
//                 refreshPolicies();

//                 // Reset form
//                 setFormData({
//                     policyType: 'basic',
//                     coverage: 1000,
//                     premium: calculatePremium('basic', 1000)
//                 });

//                 // Redirect to dashboard after a short delay
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 2000);
//             }
//         } catch (err) {
//             console.error("Error creating policy:", err);
//             setError("Failed to create policy. Please try again.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom>
//                 Create New Insurance Policy
//             </Typography>

//             {error && (
//                 <Alert severity="error" sx={{ mb: 3 }}>
//                     {error}
//                 </Alert>
//             )}

//             {success && (
//                 <Alert severity="success" sx={{ mb: 3 }}>
//                     Policy created successfully!
//                 </Alert>
//             )}

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel id="policy-type-label">Policy Type</InputLabel>
//                             <Select
//                                 labelId="policy-type-label"
//                                 id="policyType"
//                                 name="policyType"
//                                 value={formData.policyType}
//                                 onChange={handleChange}
//                                 label="Policy Type"
//                                 required
//                             >
//                                 <MenuItem value="basic">Basic</MenuItem>
//                                 <MenuItem value="standard">Standard</MenuItem>
//                                 <MenuItem value="premium">Premium</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <Typography gutterBottom>
//                             Coverage Amount (ICP)
//                         </Typography>
//                         <Slider
//                             value={formData.coverage}
//                             onChange={handleCoverageChange}
//                             aria-labelledby="coverage-slider"
//                             valueLabelDisplay="auto"
//                             min={100}
//                             max={10000}
//                             step={100}
//                         />
//                         <TextField
//                             fullWidth
//                             name="coverage"
//                             value={formData.coverage}
//                             onChange={handleChange}
//                             type="number"
//                             InputProps={{
//                                 startAdornment: <InputAdornment position="start">ICP</InputAdornment>,
//                                 inputProps: { min: 100, max: 10000 }
//                             }}
//                             sx={{ mt: 2 }}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Premium"
//                             name="premium"
//                             value={formData.premium}
//                             InputProps={{
//                                 readOnly: true,
//                                 startAdornment: <InputAdornment position="start">ICP</InputAdornment>,
//                             }}
//                             helperText="Premium is calculated based on policy type and coverage amount"
//                         />
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             size="large"
//                             disabled={submitting}
//                             fullWidth
//                         >
//                             {submitting ? <CircularProgress size={24} /> : 'Create Policy'}
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Paper>
//     );
// }

// export default PolicyForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    Spinner,
    Card,
    FloatingLabel,
    FormGroup,
    FormLabel,
    FormControl,
    FormSelect
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PolicyForm.css';

function PolicyForm({ policyActor, refreshPolicies }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        policyType: 'basic',
        coverage: 1000,
        premium: 0, // This will be calculated
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Calculate premium based on policy type and coverage
    const calculatePremium = (type, coverage) => {
        let rate = 0;
        switch (type) {
            case 'basic':
                rate = 0.01; // 1% of coverage
                break;
            case 'standard':
                rate = 0.05; // 5% of coverage
                break;
            case 'premium':
                rate = 0.1; // 10% of coverage
                break;
            default:
                rate = 0.01;
        }
        return Math.round(coverage * rate);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        // Recalculate premium when policy type or coverage changes
        if (name === 'policyType' || name === 'coverage') {
            updatedFormData.premium = calculatePremium(
                name === 'policyType' ? value : formData.policyType,
                name === 'coverage' ? value : formData.coverage
            );
        }

        setFormData(updatedFormData);
    };

    const handleCoverageChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        const updatedFormData = {
            ...formData,
            coverage: newValue,
            premium: calculatePremium(formData.policyType, newValue),
        };
        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            setSubmitting(true);

            // Convert policy type to variant for Motoko
            const policyTypeVariant = {
                [formData.policyType]: null,
            };

            const result = await policyActor.createPolicy(
                policyTypeVariant,
                Number(formData.coverage),
                Number(formData.premium)
            );

            if (result.err) {
                setError(result.err);
            } else {
                setSuccess(true);
                refreshPolicies();

                // Reset form
                setFormData({
                    policyType: 'basic',
                    coverage: 1000,
                    premium: calculatePremium('basic', 1000),
                });

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            console.error("Error creating policy:", err);
            setError("Failed to create policy. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="policy-form-container">
            <Card className="policy-form-card">
                <Card.Body>
                    <h2 className="policy-form-title">Create New Insurance Policy</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Policy created successfully!</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <FormLabel>Policy Type</FormLabel>
                            <FormSelect
                                name="policyType"
                                value={formData.policyType}
                                onChange={handleChange}
                                required
                            >
                                <option value="basic">Basic</option>
                                <option value="standard">Standard</option>
                                <option value="premium">Premium</option>
                            </FormSelect>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Coverage Amount (ICP)</FormLabel>
                            <Form.Range
                                name="coverage"
                                value={formData.coverage}
                                onChange={handleCoverageChange}
                                min={100}
                                max={10000}
                                step={100}
                            />
                            <FloatingLabel controlId="floatingCoverage" label="Coverage Amount">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter coverage amount"
                                    value={formData.coverage}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Premium</FormLabel>
                            <FloatingLabel controlId="floatingPremium" label="Premium">
                                <Form.Control
                                    type="text"
                                    placeholder="Premium"
                                    value={formData.premium}
                                    readOnly
                                />
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                                Premium is calculated based on policy type and coverage amount.
                            </Form.Text>
                        </FormGroup>

                        <div className="text-center">
                            <Button variant="primary" type="submit" disabled={submitting}>
                                {submitting ? (
                                    <Spinner animation="border" size="sm" role="status">
                                        <span className="visually-hidden">Submitting...</span>
                                    </Spinner>
                                ) : (
                                    'Create Policy'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PolicyForm;
