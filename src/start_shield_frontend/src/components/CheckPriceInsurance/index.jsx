import React, {
    useState,
    useEffect
} from 'react';
import {
    Container,
    Button,
    Row,
    Table
} from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import {
    useAuth
} from "../../context/AppContext";
import {
    uploadToIPFS
} from "../../utils/ipfs";
import { useNavigate } from "react-router-dom"; // Pentru navigare către PaymentPage

const InsuranceForm = () => {
    const [hasAccount, setHasAccount] = useState(null);
    const [companySize, setCompanySize] = useState(null);
    const [owners, setOwners] = useState([{
        firstName: "",
        lastName: ""
    }]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const {
        backendActor,
        login,
        logout,
        isAuthenticated,
        userInfo,
        isActorReady
    } = useAuth();
    const [formData, setFormData] = useState({
        companyName: "",
        registrationNumber: "",
        email: "",
        phone: "",
        address: {
            country: "",
            state: "",
            city: "",
            street: "",
            number: "",
            postalCode: "",
        },
        insuranceType: "",
        additionalInfo: "",
        insuredValue: "",
        policyValue: "",
        paymentOption: "",
        premium: "declined",
        startDate: "",
        endDate: "",
        insuranceMonths: 12,
        termsAgreed: "declined",
        over18: "declined",
        discount: 0,
        commission: 0,
        tokensEarned: 0,
        rewardPercentage: 5,
        industryType: "",
        annualRevenue: "",
        employees: "",
    });
    const [companyData, setCompanyData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [principal, setPrincipal] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null); // Opțiunea selectată
    const navigate = useNavigate(); // Hook pentru navigare

    const annualDiscount = 10;
    const monthlyCommission = 5;

    useEffect(() => {
        const fetchPrincipal = async () => {
            if (isAuthenticated && backendActor) {
                try {
                    const p = await backendActor.getCallerPrincipal();
                    setPrincipal(p.toString());
                } catch (error) {
                    console.error("Error fetching principal:", error);
                }
            }
        };
        fetchPrincipal();
    }, [isAuthenticated, backendActor]);

    const calculateEndDate = () => {
        if (formData.startDate && formData.insuranceMonths) {
            const start = new Date(formData.startDate);
            start.setMonth(start.getMonth() + parseInt(formData.insuranceMonths));
            const endDate = start.toISOString().split("T")[0];
            setFormData((prev) => ({
                ...prev,
                endDate: endDate,
            }));
        }
    };

    useEffect(() => {
        calculateEndDate();
    }, [formData.startDate, formData.insuranceMonths]);

    useEffect(() => {
        if (formData.registrationNumber) {
            axios
                .get(`http://localhost:4943/api/company/${formData.registrationNumber}`)
                .then((response) => {
                    if (response.data) {
                        setFormData((prev) => ({
                            ...prev,
                            ...response.data,
                        }));
                        setOwners(response.data.owners || [{
                            firstName: "",
                            lastName: ""
                        }]);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [formData.registrationNumber]);

    const calculatePayment = () => {
        let payment = parseFloat(formData.policyValue) || 0;
        if (formData.paymentOption === "annual") {
            payment -= (annualDiscount / 100) * payment;
            formData.tokensEarned = (formData.rewardPercentage / 100) * formData.insuredValue;
        } else {
            payment += (monthlyCommission / 100) * payment;
            formData.tokensEarned = 0;
        }
        return payment.toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        setIsSubmitting(true);

        if (!isAuthenticated) {
            alert("You must log in to submit the form.");
            login();
            setIsSubmitting(false);
            return;
        }

        if (!backendActor) {
            console.error("Backend actor is not initialized.");
            alert("Backend actor is not initialized. Please try again.");
            setIsSubmitting(false);
            return;
        }

        try {
            if (!formData.termsAgreed || !formData.over18) {
                alert("You must agree to the terms and confirm you are over 18.");
                setIsSubmitting(false);
                return;
            }

            console.log("Data before submission:", {
                formData,
                owners,
                uploadedImages,
                uploadedDocuments
            });

            // Uploading data to RESTful API
            try {
                const restApiResponse = await axios.post("http://localhost:4943/api/apply", {
                    ...formData,
                    owners,
                    uploadedImages,
                    uploadedDocuments,
                });
                console.log("REST API response:", restApiResponse);
                alert("Data successfully sent to the RESTful API!");
            } catch (restApiError) {
                console.error("Error sending data to REST API:", restApiError);
                alert("Error sending data to REST API. Please check console.");
                setIsSubmitting(false);
                return;
            }

            // Adding the company to the Motoko backend
            try {
                const principal = await backendActor.getCallerPrincipal();

                // Construct the company object to match the backend's expected Company type
                const companyForBackend = {
                    companyName: formData.companyName,
                    registrationNumber: formData.registrationNumber,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        country: formData.address.country,
                        state: formData.address.state,
                        city: formData.address.city,
                        street: formData.address.street,
                        number: formData.address.number,
                        postalCode: formData.address.postalCode,
                    },
                    insuranceType: formData.insuranceType,
                    additionalInfo: formData.additionalInfo,
                    insuredValue: BigInt(Math.floor(Number(formData.insuredValue) || 0)),
                    policyValue: BigInt(Math.floor(Number(formData.policyValue) || 0)),
                    paymentOption: formData.paymentOption,
                    premium: formData.premium === "accepted" ? { accepted: null } : { declined: null },
                    discount: BigInt(annualDiscount),
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    insuranceMonths: BigInt(Math.floor(Number(formData.insuranceMonths) || 0)),
                    termsAgreed: formData.termsAgreed === "accepted" ? { accepted: null } : { declined: null },
                    over18: formData.over18 === "accepted" ? { accepted: null } : { declined: null },
                    // discount: BigInt(annualDiscount),
                    commission: BigInt(monthlyCommission),
                    tokensEarned: BigInt(Math.floor(Number(formData.tokensEarned) || 0)),
                    rewardPercentage: BigInt(formData.rewardPercentage),
                    industryType: formData.industryType,
                    annualRevenue: BigInt(Math.floor(Number(formData.annualRevenue) || 0)),
                    employees: BigInt(Math.floor(Number(formData.employees) || 0)),
                };

                console.log("Company data before backend submission:", {
                    principal,
                    company: companyForBackend // Use the constructed object
                });

                const addCompanyResult = await backendActor.addCompany(principal, companyForBackend);
                console.log("Backend canister response:", addCompanyResult);

                if (addCompanyResult) {
                    alert("Company successfully added to the backend canister!");
                    setCompanyData(prevData => [...prevData, companyForBackend]);
                } else {
                    alert("Failed to add company data to the backend.");
                }
            } catch (backendError) {
                console.error("Error adding company to backend:", backendError);
                alert("Error adding company to backend. Please check console.");
            }
        } catch (error) {
            console.error("An error occurred during submission:", error);
            alert("An error occurred during submission. Please check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleOwnerChange = (index, e) => {
        const {
            name,
            value
        } = e.target;
        const updatedOwners = [...owners];
        updatedOwners[index][name] = value;
        setOwners(updatedOwners);
    };

    const addOwner = () => {
        setOwners([...owners, {
            firstName: "",
            lastName: ""
        }]);
    };

    const handleAddressChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImageLinks = [];

        for (const file of files) {
            const ipfsUrl = await uploadToIPFS(file);
            if (ipfsUrl) {
                uploadedImageLinks.push(ipfsUrl);
            }
        }
        setUploadedImages(uploadedImageLinks);
    };

    const handleDocumentUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedDocumentLinks = [];

        for (const file of files) {
            const ipfsUrl = await uploadToIPFS(file);
            if (ipfsUrl) {
                uploadedDocumentLinks.push(ipfsUrl);
            }
        }
        setUploadedDocuments(uploadedDocumentLinks);
    };

    const handleLoginPrompt = () => {
        if (!isAuthenticated) {
            alert("Please log in to access this section.");
            login();
        } else {
            setHasAccount(true);
        }
    };

    const handleLogoutClick = () => {
        logout();
        setHasAccount(null);
        setCompanySize(null);
        setFormData({
            companyName: "",
            registrationNumber: "",
            email: "",
            phone: "",
            address: {
                country: "",
                state: "",
                city: "",
                street: "",
                number: "",
                postalCode: "",
            },
            insuranceType: "",
            additionalInfo: "",
            insuredValue: "",
            policyValue: "",
            paymentOption: "",
            premium: false,
            startDate: "",
            endDate: "",
            insuranceMonths: 12,
            termsAgreed: false,
            over18: false,
            discount: 0,
            commission: 0,
            tokensEarned: 0,
            rewardPercentage: 5,
            industryType: "",
            annualRevenue: "",
            employees: "",
        });
    };

    const AcceptanceField = ({ label, name }) => (
        <div className="form-group">
            <label>{label}</label>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name={name}
                        value="accepted"
                        checked={formData[name] === "accepted"}
                        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name={name}
                        value="declined"
                        checked={formData[name] === "declined"}
                        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                    />
                    No
                </label>
            </div>
        </div>
    );



    const UserTooltip = () => (
        <div className="user-tooltip">
            <p>Principal: {principal}</p>
            <p>Email: {userInfo.email}</p>
        </div>
    );

    const handlePaymentSelection = (option) => {
        setSelectedPaymentOption(option);
    };

    const handlePay = () => {
        if (!selectedPaymentOption) {
            alert("Please select a payment option.");
            return;
        }
        // Navigăm către pagina PaymentPage cu informațiile poliței
        navigate("/paymentPage", { 
            state: { 
                paymentOption: selectedPaymentOption, 
                policyValue: formData.policyValue, 
                policyOwner: principal, 
                policyDetails: formData // Transmitem toate detaliile poliței
            } 
        });
    };

    return (
        <div>
            <Container>
                {
                    hasAccount === null ? (
                        <div>
                            <h2> Do you have an account ? </h2>{
                                !isAuthenticated ? (
                                    <>
                                        <Button className="btn btn-primary" onClick={handleLoginPrompt} >
                                            Login to Continue
                                        </Button>
                                        <Button className="btn btn-secondary" onClick={() => setHasAccount(false)} >
                                            Continue as Guest
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="btn btn-danger" onClick={handleLogoutClick} >
                                            Logout
                                        </Button>
                                        <Button className="btn btn-secondary" onClick={() => setHasAccount(true)}>
                                            Welcome and pressme for next step!
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            <Container> {
                                userInfo && (
                                    <div className="user-info" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} >
                                        🧑💻 {userInfo.name}
                                        {isHovering && < UserTooltip />
                                        }
                                    </div>
                                )
                            } <h2> Select Company Size </h2> <
                                div style={
                                    {
                                        marginBottom: "5px"
                                    }
                                } >
                                    <label className="radio-button">
                                        <input type="radio"
                                            name="companySize"
                                            value="micro"
                                            checked={
                                                companySize === "micro"
                                            }
                                            onChange={
                                                () => setCompanySize("micro")
                                            }
                                        />
                                        Micro Company
                                    </label>
                                    <label className="radio-button" >
                                        <input type="radio"
                                            name="companySize"
                                            value="small"
                                            checked={
                                                companySize === "small"
                                            }
                                            onChange={
                                                () => setCompanySize("small")
                                            }
                                        />
                                        Small Company </label>
                                    <label className="radio-button" >
                                        <input type="radio"
                                            name="companySize"
                                            value="large"
                                            checked={
                                                companySize === "large"
                                            }
                                            onChange={
                                                () => setCompanySize("large")
                                            }
                                        />
                                        Large Company </label>
                                </div>
                            </Container> {
                                companySize && (
                                    <form onSubmit={handleSubmit}>
                                        <Container className="input-fild">
                                            <h3>Company Information</h3>

                                            {/* Registration Number Field */}
                                            <h4>Registration Information</h4>
                                            <input
                                                type="text"
                                                name="registrationNumber"
                                                placeholder="Registration Number"
                                                value={formData.registrationNumber}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        registrationNumber: value,
                                                    }));

                                                    // Fetch company details based on registration number
                                                    if (value) {
                                                        axios
                                                            .get(`http://localhost:4943/api/company/${value}`)
                                                            .then((response) => {
                                                                if (response.data) {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        ...response.data,
                                                                    }));
                                                                    setOwners(response.data.owners || [
                                                                        { firstName: "", lastName: "" },
                                                                    ]);
                                                                }
                                                            })
                                                            .catch((error) => console.error("Error fetching company data:", error));
                                                    }
                                                }}
                                            />

                                            {/* Owners Section */}
                                            <h4>Owners Information</h4>
                                            {owners.map((owner, index) => (
                                                <div key={index} className="owner-fields">
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        value={owner.firstName}
                                                        onChange={(e) => handleOwnerChange(index, e)}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                        value={owner.lastName}
                                                        onChange={(e) => handleOwnerChange(index, e)}
                                                    />
                                                </div>
                                            ))}
                                            <Button type="button" onClick={addOwner}>
                                                Add Owner
                                            </Button>
                                            {/* Address Section */}
                                            <h4>Address Information</h4>
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                value={formData.address.country}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={formData.address.state}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={formData.address.city}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="street"
                                                placeholder="Street"
                                                value={formData.address.street}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="number"
                                                placeholder="Number"
                                                value={formData.address.number}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="postalCode"
                                                placeholder="Postal Code"
                                                value={formData.address.postalCode}
                                                onChange={handleAddressChange}
                                            />

                                            {/* Other Fields */}
                                            <input
                                                type="text"
                                                name="companyName"
                                                placeholder="Company Name"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const formattedPhone = e.target.value
                                                        .replace(/\D/g, '') // Remove non-numeric characters
                                                        .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') // Add spaces
                                                        .trim();
                                                    handleInputChange({ target: { name: 'phone', value: formattedPhone } });
                                                }}
                                            />
                                            <input
                                                type="text"
                                                name="insuranceType"
                                                placeholder="Insurance Type"
                                                value={formData.insuranceType}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="additionalInfo"
                                                placeholder="Additional Info"
                                                value={formData.additionalInfo}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="insuredValue"
                                                placeholder="Insured Value"
                                                value={formData.insuredValue}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="policyValue"
                                                placeholder="Policy Value"
                                                value={formData.policyValue}
                                                onChange={handleInputChange}
                                            />

                                            {/* Acceptance Fields */}
                                            <AcceptanceField
                                                label="Do you agree to the terms?"
                                                name="termsAgreed"
                                            />
                                            <AcceptanceField
                                                label="Are you over 18?"
                                                name="over18"
                                            />

                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Submitting..." : "Submit Application"}
                                            </Button>
                                        </Container>
                                    </form>
                                )
                            }
                            {
                                showPayment && < PaymentPage policyValue={
                                    formData.policyValue
                                }
                                />
                            }
                        </>
                    )
                }
                <Container>
                    <h3>Insurance Payment Options</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Payment Option</th>
                                <th>Value</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Complete Payment</td>
                                <td>{(formData.policyValue - (annualDiscount / 100) * formData.policyValue).toFixed(2)} ICP</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        value="complete"
                                        onChange={() => handlePaymentSelection("complete")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Monthly Payment</td>
                                <td>{(parseFloat(formData.policyValue) + (monthlyCommission / 100) * formData.policyValue).toFixed(2)} ICP</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        value="monthly"
                                        onChange={() => handlePaymentSelection("monthly")}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={handlePay} disabled={!selectedPaymentOption}>
                        Pay
                    </Button>
                </Container>
            </Container>
        </div>
    );
};

export default InsuranceForm;


