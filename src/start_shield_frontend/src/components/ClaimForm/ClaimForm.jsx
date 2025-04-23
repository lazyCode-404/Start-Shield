// // src/frontend/src/components/ClaimForm.jsx
// import React, { useState, useEffect } from 'react';
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
//     CircularProgress
// } from '../../../../../node_modules/@mui/material';

// function ClaimForm({ claimActor, refreshClaims }) {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         policyId: '',
//         amount: '',
//         description: '',
//         evidenceUrls: ['']
//     });
//     const [policies, setPolicies] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);

//     // Fetch user's policies
//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 setLoading(true);
//                 // This would typically come from a policy actor
//                 // For now, we'll simulate it
//                 const userPolicies = await claimActor.getUserPolicies();
//                 setPolicies(userPolicies);
//             } catch (err) {
//                 console.error("Error fetching policies:", err);
//                 setError("Failed to load your policies. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPolicies();
//     }, [claimActor]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleEvidenceUrlChange = (index, value) => {
//         const newEvidenceUrls = [...formData.evidenceUrls];
//         newEvidenceUrls[index] = value;
//         setFormData({
//             ...formData,
//             evidenceUrls: newEvidenceUrls
//         });
//     };

//     const addEvidenceUrl = () => {
//         setFormData({
//             ...formData,
//             evidenceUrls: [...formData.evidenceUrls, '']
//         });
//     };

//     const removeEvidenceUrl = (index) => {
//         const newEvidenceUrls = formData.evidenceUrls.filter((_, i) => i !== index);
//         setFormData({
//             ...formData,
//             evidenceUrls: newEvidenceUrls
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess(false);

//         // Validate form
//         if (!formData.policyId) {
//             setError("Please select a policy");
//             return;
//         }

//         if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
//             setError("Please enter a valid amount");
//             return;
//         }

//         if (!formData.description) {
//             setError("Please provide a description");
//             return;
//         }

//         // Filter out empty evidence URLs
//         const evidenceUrls = formData.evidenceUrls.filter(url => url.trim() !== '');

//         try {
//             setSubmitting(true);

//             const result = await claimActor.submitClaim(
//                 Number(formData.policyId),
//                 Number(formData.amount),
//                 formData.description,
//                 evidenceUrls
//             );

//             if (result.err) {
//                 setError(result.err);
//             } else {
//                 setSuccess(true);
//                 refreshClaims();

//                 // Reset form
//                 setFormData({
//                     policyId: '',
//                     amount: '',
//                     description: '',
//                     evidenceUrls: ['']
//                 });

//                 // Redirect to dashboard after a short delay
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 2000);
//             }
//         } catch (err) {
//             console.error("Error submitting claim:", err);
//             setError("Failed to submit claim. Please try again.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom>
//                 Submit a New Claim
//             </Typography>

//             {error && (
//                 <Alert severity="error" sx={{ mb: 3 }}>
//                     {error}
//                 </Alert>
//             )}

//             {success && (
//                 <Alert severity="success" sx={{ mb: 3 }}>
//                     Claim submitted successfully!
//                 </Alert>
//             )}

//             {loading ? (
//                 <Box display="flex" justifyContent="center" my={4}>
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="policy-select-label">Select Policy</InputLabel>
//                                 <Select
//                                     labelId="policy-select-label"
//                                     id="policyId"
//                                     name="policyId"
//                                     value={formData.policyId}
//                                     onChange={handleChange}
//                                     label="Select Policy"
//                                     required
//                                 >
//                                     {policies.map((policy) => (
//                                         <MenuItem key={policy.id} value={policy.id}>
//                                             Policy #{policy.id} - Coverage: {policy.coverage} ICP
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Claim Amount"
//                                 name="amount"
//                                 type="number"
//                                 value={formData.amount}
//                                 onChange={handleChange}
//                                 required
//                                 InputProps={{ inputProps: { min: 1 } }}
//                             />
//                         </Grid>

//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Description"
//                                 name="description"
//                                 multiline
//                                 rows={4}
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Please describe what happened and why you're making this claim"
//                             />
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Evidence URLs
//                             </Typography>

//                             {formData.evidenceUrls.map((url, index) => (
//                                 <Box key={index} sx={{ display: 'flex', mb: 2 }}>
//                                     <TextField
//                                         fullWidth
//                                         label={`Evidence URL ${index + 1}`}
//                                         value={url}
//                                         onChange={(e) => handleEvidenceUrlChange(index, e.target.value)}
//                                         placeholder="https://example.com/evidence"
//                                         sx={{ mr: 1 }}
//                                     />
//                                     {formData.evidenceUrls.length > 1 && (
//                                         <Button
//                                             variant="outlined"
//                                             color="error"
//                                             onClick={() => removeEvidenceUrl(index)}
//                                         >
//                                             Remove
//                                         </Button>
//                                     )}
//                                 </Box>
//                             ))}

//                             <Button
//                                 variant="outlined"
//                                 onClick={addEvidenceUrl}
//                                 sx={{ mt: 1 }}
//                             >
//                                 Add Another URL
//                             </Button>
//                         </Grid>

//                         <Grid item xs={12} sx={{ mt: 2 }}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 size="large"
//                                 disabled={submitting}
//                                 fullWidth
//                             >
//                                 {submitting ? <CircularProgress size={24} /> : 'Submit Claim'}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             )}
//         </Paper>
//     );
// }

// export default ClaimForm;

import React, { useState, useEffect } from 'react';
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
    FloatingLabel
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClaimForm.css';

function ClaimForm({ claimActor, refreshClaims }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        policyId: '',
        amount: '',
        description: '',
        evidenceUrls: ['']
    });
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Fetch user's policies
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                setLoading(true);
                const userPolicies = await claimActor.getUserPolicies();
                setPolicies(userPolicies);
            } catch (err) {
                console.error("Error fetching policies:", err);
                setError("Failed to load your policies. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, [claimActor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEvidenceUrlChange = (index, value) => {
        const newEvidenceUrls = [...formData.evidenceUrls];
        newEvidenceUrls[index] = value;
        setFormData({
            ...formData,
            evidenceUrls: newEvidenceUrls
        });
    };

    const addEvidenceUrl = () => {
        setFormData({
            ...formData,
            evidenceUrls: [...formData.evidenceUrls, '']
        });
    };

    const removeEvidenceUrl = (index) => {
        const newEvidenceUrls = formData.evidenceUrls.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            evidenceUrls: newEvidenceUrls
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validate form
        if (!formData.policyId) {
            setError("Please select a policy");
            return;
        }

        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        if (!formData.description) {
            setError("Please provide a description");
            return;
        }

        // Filter out empty evidence URLs
        const evidenceUrls = formData.evidenceUrls.filter(url => url.trim() !== '');

        try {
            setSubmitting(true);

            const result = await claimActor.submitClaim(
                Number(formData.policyId),
                Number(formData.amount),
                formData.description,
                evidenceUrls
            );

            if (result.err) {
                setError(result.err);
            } else {
                setSuccess(true);
                refreshClaims();

                // Reset form
                setFormData({
                    policyId: '',
                    amount: '',
                    description: '',
                    evidenceUrls: ['']
                });

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            console.error("Error submitting claim:", err);
            setError("Failed to submit claim. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="claim-form-container">
            <Card className="claim-form-card">
                <Card.Body>
                    <h2 className="claim-form-title">Submit a New Claim</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Claim submitted successfully!</Alert>}

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="policyId">
                                <Form.Label>Select Policy</Form.Label>
                                <Form.Select
                                    name="policyId"
                                    value={formData.policyId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a policy</option>
                                    {policies.map((policy) => (
                                        <option key={policy.id} value={policy.id}>
                                            Policy #{policy.id} - Coverage: {policy.coverage} ICP
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>Claim Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <FloatingLabel controlId="floatingTextarea2" label="Description">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Please describe what happened and why you're making this claim"
                                        style={{ height: '100px' }}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="evidenceUrls">
                                <Form.Label>Evidence URLs</Form.Label>
                                {formData.evidenceUrls.map((url, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <Form.Control
                                            type="url"
                                            placeholder="https://example.com/evidence"
                                            value={url}
                                            onChange={(e) => handleEvidenceUrlChange(index, e.target.value)}
                                        />
                                        {formData.evidenceUrls.length > 1 && (
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => removeEvidenceUrl(index)}
                                                className="ms-2"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button variant="outline-secondary" onClick={addEvidenceUrl}>
                                    Add Another URL
                                </Button>
                            </Form.Group>

                            <div className="text-center">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <Spinner animation="border" size="sm" role="status">
                                            <span className="visually-hidden">Submitting...</span>
                                        </Spinner>
                                    ) : (
                                        'Submit Claim'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ClaimForm;