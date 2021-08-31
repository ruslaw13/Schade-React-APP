import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";
import UpdateProfile from "./UpdateProfile";

function Profile() {
    const { currentUser } = useAuth();
    const [profileData, setProfileData] = useState({
        allUsersDamageEvents: 0,
        allUsersEvents: 0,
        userEvents: 0,
        userDamageEvents: 0,
        city: "",
        firstName: "",
        lastName: "",
    });
    const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);

    useEffect(() => {
        db.ref("appStats").once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    allUsersDamageEvents: snapshot.val().allUsersDamageEvents,
                    allUsersEvents: snapshot.val().allUsersEvents
                }));
            }
        });
        db.ref("profileData/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    city: snapshot.val().city,
                    firstName: snapshot.val().firstName,
                    lastName: snapshot.val().lastName,
                }));
            }
        });
        db.ref("events/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    userDamageEvents: Object.keys(snapshot.val()).length,
                }));
            }
        });
        db.ref("roadEvents/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    userEvents: Object.keys(snapshot.val()).length,
                }));
            }
        });
    }, [currentUser.uid]);

    const handleClick = e => {
        e.preventDefault();
        setIsUpdateProfileVisible(true);
    };
    const handleCancel = () => {
        setIsUpdateProfileVisible(false);
    };

    return (
        <React.Fragment>
            <section className='section'>
                <div className='profile'>
                    <p className='profile__text'>
                        Naam: {profileData.firstName}
                    </p>
                    <p className='profile__text'>
                        Achternaam: {profileData.lastName}
                    </p>
                    <p className='profile__text'>
                        Het door u gemelde schadebedrag:{" "}
                        {profileData.userDamageEvents}
                    </p>
                    <p className='profile__text'>
                        Aantal door u gemelde incidenten op de weg:{" "}
                        {profileData.userEvents}
                    </p>
                    <p className='profile__text'>
                        Totaal schade bedrag gemeld door alle chauffeurs:
                        {profileData.allUsersDamageEvents}
                    </p>
                    <p className='profile__text'>
                        Totaal aantal door alle chauffeurs op de weg gemelde incidenten:
                        {profileData.allUsersEvents}
                    </p>
                    <p className='profile__text'>
                        Weersvoorspelling voor de stad: {profileData.city}
                    </p>
                    <button className='button' onClick={handleClick}>
                        Update
                    </button>
                    {isUpdateProfileVisible && (
                        <button className='button' onClick={handleCancel}>
                            Annuleer
                        </button>
                    )}
                    {isUpdateProfileVisible && <UpdateProfile />}
                </div>
            </section>
            <Navigation />
        </React.Fragment>
    );
}

export default Profile;
