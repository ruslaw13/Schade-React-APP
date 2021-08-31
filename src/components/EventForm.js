import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const EventForm = () => {
    const [form, setForm] = useState({ status: "Geaccepteerd in het systeem" });
    const { currentUser } = useAuth();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setForm(prevState => ({
                ...prevState,
                place: `${position.coords.latitude}, ${position.coords.longitude}`,
            }));
        });
    }, []);
    const handleSubmit = e => {
        e.preventDefault();
        db.ref("appStats").once("value", snapshot => {
            if (!snapshot.hasChild("allUsersEvents")) {
                db.ref("appStats").update({ allUsersEvents: 1 });
            } else {
                db.ref("appStats").update({
                    allUsersEvents:
                        snapshot.val().allUsersEvents + 1,
                });
            }
        });
        const userRef = db.ref("roadEvents/" + currentUser.uid);
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
        <form onSubmit={handleSubmit} className='form'>
            <div className='form__group'>
                <label className='form__label'>Het type</label>
                <select
                    name='eventType'
                    className='form__input'
                    onChange={handleChange}
                    defaultValue={'default'}
                    required>
                    <option disabled value='default'>
                        Selecteer het type van de melding
                    </option>
                    <option value='Snelheidscontrole'>
                        Snelheidscontrole
                    </option>
                    <option value='Defect voertuig'>Defect voertuig</option>
                    <option value='Ongeluk'>Ongeluk</option>
                    <option value='File'>File</option>
                    <option value='Rijbaan afsluiten'>Rijbaan afsluiten</option>
                    <option value='Wegwerkzaamheden'>Wegwerkzaamheden</option>
                </select>
            </div>
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
            <button className='button form__button'>Versturen</button>
        </form>
    );
};

export default EventForm;
