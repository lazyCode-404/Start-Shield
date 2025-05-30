import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import "./UserSettings.css";

function UserSettings() {
    const { backendActor, userInfo, identity, login } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Helper pentru a forța array-uri
    const safeArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);

    // Încarcă datele utilizatorului folosind principalul din context
    useEffect(() => {
        const fetchUserData = async () => {
            if (!backendActor || !identity) {
                setLoading(false);
                return;
            }
            try {
                const principal = identity.getPrincipal();
                if (!principal || principal.isAnonymous()) {
                    setAuthError("Principal invalid sau anonim");
                    setLoading(false);
                    return;
                }
                const result = await backendActor.getUserById(principal);
                if (result.length > 0) {
                    setSelectedUser(result[0]);
                    setUpdatedUser({ ...result[0] });
                } else {
                    // Userul nu există, îl creăm
                    const newUser = {
                        name: userInfo?.name || "New User",
                        email: userInfo?.email || "",
                        phone: [],
                        address: [],
                        photo: [],
                        photoId: [],
                        taxId: "",
                        registrationNumber: ""
                    };
                    const created = await backendActor.createUser(
                        principal,
                        newUser.name,
                        newUser.email,
                        newUser.address,
                        newUser.phone,
                        newUser.photo,
                        newUser.photoId,
                        newUser.taxId,
                        newUser.registrationNumber
                    );
                    if (created) {
                        setSelectedUser(newUser);
                        setUpdatedUser(newUser);
                    } else {
                        setAuthError("Nu s-a putut crea utilizatorul");
                    }
                }
            } catch (error) {
                console.error("Error fetching/creating user:", error);
                setAuthError("Eroare la încărcarea/crearea utilizatorului");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [backendActor, identity, userInfo]);

    const handleEditToggle = () => {
        setEditProfile(!editProfile);
        if (!editProfile) {
            setUpdatedUser({ ...selectedUser });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const field = name.split(".")[1];
            setUpdatedUser({
                ...updatedUser,
                address: {
                    ...updatedUser.address,
                    [field]: value
                }
            });
        } else {
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            if (!identity) throw new Error("Nu există identitate autentificată!");
            const principal = identity.getPrincipal();
            if (!principal || principal.isAnonymous()) {
                throw new Error("Principal invalid sau anonim");
            }

            const addr = updatedUser.address || {};
            const hasAddress = Object.values(addr).some(val => val && val.length > 0);

            const userAddress = hasAddress
                ? {
                    street: addr.street && addr.street.length > 0 ? addr.street : null,
                    country: addr.country && addr.country.length > 0 ? addr.country : null,
                    city: addr.city && addr.city.length > 0 ? addr.city : null,
                    postalCode: addr.postalCode && addr.postalCode.length > 0 ? addr.postalCode : null,
                    state: addr.state && addr.state.length > 0 ? addr.state : null,
                    number: addr.number && addr.number.length > 0 ? addr.number : null
                }
                : null;

            // phone, photo, photoId trebuie să fie string sau null
            const phone = updatedUser.phone && updatedUser.phone[0] ? [updatedUser.phone[0]] : [];
            const photoId = updatedUser.photoId && updatedUser.photoId[0] ? [updatedUser.photoId[0]] : [];
            const photo = updatedUser.photo && updatedUser.photo.length > 0 ? [new Uint8Array(updatedUser.photo)] : [];

            // Log parametrii
            console.log("Datele trimise către updateUser:", {
                principal: principal.toText(),
                name: updatedUser.name,
                email: updatedUser.email,
                userAddress: userAddress,
                phone,
                photo,
                photoId
            });

            // Apelează updateUser cu parametrii corecți
            const updated = await backendActor.updateUser(
                principal,
                updatedUser.name,
                updatedUser.email,
                userAddress ? [userAddress] : [],
                phone,
                photo,
                photoId
            );

            if (updated) {
                setSelectedUser(updatedUser);
                setEditProfile(false);
                alert("Profilul a fost actualizat cu succes pe blockchain!");
            } else {
                alert("Nu s-a putut actualiza profilul.");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert(`Eroare la actualizare: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Funcție pentru a gestiona reautentificarea
    const handleReAuthenticate = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Eroare la reautentificare:", error);
            alert("Nu s-a putut realiza autentificarea");
        }
    };

    if (loading) return <div className="loading-container">Se încarcă datele...</div>;
    if (authError) {
        return (
            <div className="auth-error-container">
                <h2>Eroare de autentificare</h2>
                <p>{authError}</p>
                <button className="auth-button" onClick={handleReAuthenticate}>
                    Autentificare
                </button>
            </div>
        );
    }
    if (!selectedUser) return <div>Nu s-a găsit niciun utilizator.</div>;

    return (
        <div className="user-settings-container">
            <h1>Setări utilizator</h1>
            <div className="section">
                <h2>Gestionare profil</h2>
                <div className="profile-management">
                    <div className="user-card">
                        <p><strong>Nume:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Telefon:</strong> {selectedUser.phone?.join(", ")}</p>
                        <p><strong>Cod fiscal:</strong> {selectedUser.taxId}</p>
                        <p><strong>Nr. înregistrare companie:</strong> {selectedUser.registrationNumber}</p>
                        <p><strong>Strada:</strong> {selectedUser.address?.street || "-"}</p>
                        <p><strong>Număr:</strong> {selectedUser.address?.number || "-"}</p>
                        <p><strong>Oraș:</strong> {selectedUser.address?.city || "-"}</p>
                        <p><strong>Județ:</strong> {selectedUser.address?.state || "-"}</p>
                        <p><strong>Țară:</strong> {selectedUser.address?.country || "-"}</p>
                        <p><strong>Cod poștal:</strong> {selectedUser.address?.postalCode || "-"}</p>
                    </div>
                    <button className="edit-button" onClick={handleEditToggle}>
                        {editProfile ? "Anulează" : "Editează profilul"}
                    </button>
                    {editProfile && (
                        <div className="edit-form">
                            <label>
                                Nume:
                                <input type="text" name="name" value={updatedUser.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
                            </label>
                            <label>
                                Telefon:
                                <input type="text" name="phone" value={updatedUser.phone?.[0] || ""} onChange={(e) =>
                                    setUpdatedUser({ ...updatedUser, phone: [e.target.value] })
                                } />
                            </label>
                            <label>
                                Cod fiscal:
                                <input type="text" name="taxId" value={updatedUser.taxId} onChange={handleInputChange} />
                            </label>
                            <label>
                                Nr. înregistrare companie:
                                <input type="text" name="registrationNumber" value={updatedUser.registrationNumber} onChange={handleInputChange} />
                            </label>
                            <label>
                                Strada:
                                <input
                                    type="text"
                                    name="address.street"
                                    value={updatedUser.address?.street || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Număr:
                                <input
                                    type="text"
                                    name="address.number"
                                    value={updatedUser.address?.number || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Oraș:
                                <input
                                    type="text"
                                    name="address.city"
                                    value={updatedUser.address?.city || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Județ:
                                <input
                                    type="text"
                                    name="address.state"
                                    value={updatedUser.address?.state || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Țară:
                                <input
                                    type="text"
                                    name="address.country"
                                    value={updatedUser.address?.country || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Cod poștal:
                                <input
                                    type="text"
                                    name="address.postalCode"
                                    value={updatedUser.address?.postalCode || ""}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button className="save-button" onClick={handleSaveProfile}>
                                Salvează modificările
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="section">
                <h2>Setări de securitate</h2>
                <div className="security-settings">
                    <ul>
                        <li>
                            <strong>Schimbă parola</strong>
                            <p>Asigură-te că parola ta este puternică și actualizată regulat.</p>
                            <button className="security-button" onClick={() => alert("Funcționalitatea de schimbare a parolei va fi disponibilă în curând!")}>
                                Schimbă parola
                            </button>
                        </li>
                        <li>
                            <strong>Activează autentificarea în doi pași</strong>
                            <p>
                                Adaugă un strat suplimentar de securitate contului tău activând 2FA.
                            </p>
                            <button className="security-button">Activează 2FA</button>
                        </li>
                        <li>
                            <strong>Actualizează întrebările de securitate</strong>
                            <p>Menține întrebările de securitate actualizate pentru recuperarea contului.</p>
                            <button className="security-button">Actualizează întrebările</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;