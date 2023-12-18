import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user', { username: newUsername, password: newPassword });
            console.log(response.data);
            // Handle registration success
        } catch (error) {
            console.error(error);
            // Handle registration failure
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form>
                <label>New Username:</label>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                <br />
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <br />
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Register;
