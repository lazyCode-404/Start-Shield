import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Principal } from '@dfinity/principal';

const EditUser = ({ user, setActiveSubSection }) => {
    const { backendActor } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({
        country: null,
        state: null,
        city: null,
        street: null,
        number: null,
        postalCode: null
    });
    const [photo, setPhoto] = useState(null);
    const [photoId, setPhotoId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    // Get userId safely
    const getUserId = () => {
        if (userData.userId) return userData.userId;
        if (userData.principal) {
            return typeof userData.principal.toText === 'function' 
                ? userData.principal 
                : Principal.fromText(userData.principal.toString());
        }
        return null;
    };
    
    const userId = getUserId();
    
    const handleBack = () => {
        navigate(-1);
    };

    // Populate form with user data
    useEffect(() => {
        if (userData) {
            console.log("Populating form with user data:", userData);
            setName(userData.name || '');
            setEmail(userData.email || '');
            setPhone(userData.phone?.[0] || '');
            
            // Handle address properly
            const userAddress = userData.address?.[0] || {
                country: null,
                state: null,
                city: null,
                street: null,
                number: null,
                postalCode: null
            };
            
            setAddress(userAddress);
            setPhoto(userData.photo || null);
            setPhotoId(userData.photoId?.[0] || '');
        }
    }, [userData]);

    // Fetch fresh user data after update
    const refreshUserData = async () => {
        if (!backendActor || !userId) return;
        
        try {
            const updatedUser = await backendActor.getUserById(userId);
            if (updatedUser) {
                setUserData(Array.isArray(updatedUser) && updatedUser.length > 0 
                    ? updatedUser[0] 
                    : updatedUser);
            }
        } catch (error) {
            console.error("Failed to refresh user data:", error);
        }
    };

    const handleAddressChange = (field, value) => {
        setAddress((prev) => ({
            ...prev,
            [field]: value === '' ? null : value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                setPhoto(Array.from(uint8Array));
            };
            reader.readAsArrayBuffer(file);
        } else {
            setPhoto(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(true);
    
        try {
            // Check if we have any address data
            const hasAddressData = Object.values(address).some(val => val !== null && val !== "");
            
            // Format the address correctly for Candid
            const formattedAddress = hasAddressData ? [{
                country: address.country || "",
                state: address.state || "",
                city: address.city || "",
                street: address.street || "",
                number: address.number || "",
                postalCode: address.postalCode || ""
            }] : [];
    
            const success = await backendActor.updateUser(
                userId,
                name,
                email,
                formattedAddress,
                phone ? [phone] : [],
                photo ? [photo] : [],
                photoId ? [photoId] : []
            );
    
            if (success) {
                // Instead of navigating away, refresh the data
                await refreshUserData();
                alert("User updated successfully!");
            } else {
                console.error("Failed to update user.");
            }
        } catch (error) {
            console.error("An error occurred while updating user:", error);
        } finally {
            setIsEditing(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    placeholder="Country"
                    value={address.country || ''}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={address.state || ''}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={address.city || ''}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Street"
                    value={address.street || ''}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Number"
                    value={address.number || ''}
                    onChange={(e) => handleAddressChange('number', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={address.postalCode || ''}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                />
            </div>
            <div>
                <label>Upload Photo</label>
                <input type="file" onChange={handlePhotoChange} />
            </div>
            <div>
                <label>Photo ID</label>
                <input type="text" value={photoId} onChange={(e) => setPhotoId(e.target.value)} />
            </div>
            <button type="submit" disabled={isEditing}>
                {isEditing ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={handleBack} disabled={isEditing}>Înapoi</button>
        </form>
    );
};

export default EditUser;


