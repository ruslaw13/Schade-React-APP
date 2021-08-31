import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const DamageForm = () => {
    const [form, setForm] = useState({ status: "Geaccepteerd in het systeem" });
    const { currentUser } = useAuth();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setForm(prevState => ({
                ...prevState,
                place: `${position.coords.latitude}, ${position.coords.longitude}`
            }));
        });
    }, []);

    const onSubmitHandler = e => {
        e.preventDefault();
        const appStatsRef = db.ref("appStats");
        appStatsRef.once("value", snapshot => {
            if (!snapshot.hasChild("allUsersDamageEvents")) {
                appStatsRef.update({ allUsersDamageEvents: 1 });
            } else {
                appStatsRef.update({
                    allUsersDamageEvents:
                        snapshot.val().allUsersDamageEvents + 1,
                });
            }
        });
        const userRef = db.ref("events/" + currentUser.uid);
        const newUserRef = userRef.push();
        newUserRef.set(form);
        setForm({ status: "Geaccepteerd in het systeem" });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <form onSubmit={onSubmitHandler} className='form'>
            <div className='form__group'>
                <label className='form__label'>Plaats van het incident</label>
                <input
                    name='place'
                    className='form__input'
                    type='text'
                    value={form.place ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>
                    Kenteken beschadigd voertuig
                </label>
                <input
                    name='plateNumber'
                    className='form__input'
                    type='text'
                    value={form.plateNumber ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>Wat was er beschadigd</label>
                <input
                    name='damageDescription'
                    className='form__input'
                    type='text'
                    value={form.damageDescription ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>
                    Wat is de prioriteit van de schade?
                </label>
                <div className='form__radio-inner'>
                    <label htmlFor='high' className='form__radio'>
                        Hoog
                    </label>
                    <input
                        name='prioritaire'
                        id='high'
                        onChange={handleChange}
                        className='form__radio'
                        type='radio'
                        value='Hoog'
                    />
                </div>
                <div className='form__radio-inner'>
                    <label htmlFor='low' className='form__radio'>
                        Laag
                    </label>
                    <input
                        name='prioritaire'
                        id='low'
                        onChange={handleChange}
                        className='form__radio'
                        type='radio'
                        value='Laag'
                    />
                </div>
            </div>
            <button className='button form__button'>Versturen</button>
        </form>
    );
};

export default DamageForm;
