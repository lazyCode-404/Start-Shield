import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';

const ConnectivityCheck = () => {
    const { backendActor } = useAuth();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Adăugăm un state pentru încărcare

    useEffect(() => {
        if (backendActor) {
            setLoading(true); // Setăm starea de încărcare
            backendActor.healthCheck()
                .then(response => {
                    setMessage(response);
                })
                .catch(error => {
                    console.error("Eroare de conectare la backend:", error);
                    setMessage("Eroare de conectare la backend!");
                })
                .finally(() => {
                    setLoading(false); // Indiferent de rezultat, oprim încărcarea
                });
        } else {
            setMessage("Backend actor is not available!");
            setLoading(false);
        }
    }, [backendActor]);

    return (
        <div>
            {loading ? <p>Verificarea conexiunii...</p> : <p>{message}</p>}
        </div>
    );
};

export default ConnectivityCheck;

