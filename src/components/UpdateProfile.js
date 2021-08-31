import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function UpdateProfile() {
    const { currentUser } = useAuth();
    const profileDataRef = db.ref("profileData/" + currentUser.uid);
    const [formData, setFormData] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        profileDataRef.once("value", () => profileDataRef.update(formData));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form__group'>
                    <label className='form__label'>Naam</label>
                    <input
                        name='firstName'
                        className='form__input'
                        type='text'
                        onChange={handleChange}
                    />
                </div>
                <div className='form__group'>
                    <label className='form__label'>Achternaam</label>
                    <input
                        name='lastName'
                        className='form__input'
                        type='text'
                        onChange={handleChange}
                    />
                </div>                
                <button className='button'>Versturen</button>
            </form>
        </React.Fragment>
    );
}
