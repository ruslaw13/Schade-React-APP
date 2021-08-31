import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({});
    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (formData.password !== formData.passwordConfirmation) {
            return setError("Wachtwoorden komen niet overeen");
        } else {
            setError("");
            signup(formData.email, formData.password);
            history.push("/");
        }
    };

    return (
        <section className='section'>
            <h2 className='h2'>Registration</h2>
            {error && <div>{error}</div>}
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group' id='email'>
                    <label className='form__label' htmlFor='email-input'>
                        Email
                    </label>
                    <input
                        className='form__input'
                        id='email-input'
                        type='email'
                        name='email'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form__group' id='password'>
                    <label
                        className='form__label text'
                        htmlFor='password-input'>
                        Wachtwoord
                    </label>
                    <input
                        className='form__input text'
                        id='password-input'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form__group' id='password-confirm'>
                    <label
                        className='form__label text'
                        htmlFor='password-confirm-input'>
                        Wachtwoordbevestiging
                    </label>
                    <input
                        className='form__input text'
                        id='password-confirm-input'
                        type='password'
                        name='passwordConfirmation'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className='button section__button'
                    type='submit'>
                    Aanmelden
                </button>
            </form>
            <div className='text section__text'>
                Heeft u al een profiel? <Link to='/logowanie'>Log in</Link>
            </div>
        </section>
    );
}
