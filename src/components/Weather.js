import React, { useState, useEffect } from "react";
import WeatherInput from "./WeatherInput";
import WeatherDetails from "./WeatherDetails";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

function Weather() {
    const [weather, setWeather] = useState({
        name: "",
        weather: [{ description: "" }],
        wind: { speed: "" },
        main: { temp: "", feels_like: "", pressure: "", humidity: "" },
    });
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const { currentUser } = useAuth();

    useEffect(() => {
        const profileDataRef = db.ref("profileData/" + currentUser.uid);
        navigator.geolocation.getCurrentPosition(
            position => {
                const fetchData = async () => {
                    const initialData = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=nl&appid=00dfd1bb3c25295cf177f090b450f1ec` //Voer de KEY API van openweather
                    );
                    const jsonResponse = await initialData.json();
                    await setWeather(jsonResponse);
                    profileDataRef.update({ city: jsonResponse.name });
                };
                fetchData();
            },
            () => {
                profileDataRef.once("value", snapshot => {
                    if (snapshot.val() === null) {
                        setIsInputVisible(true);
                    } else {
                        if (snapshot.val().city.length !== 0) {
                            setIsInputVisible(false);
                            fetch(
                                `https://api.openweathermap.org/data/2.5/weather?q=${
                                    snapshot.val().city
                                }&units=metric&lang=pl&appid=00dfd1bb3c25295cf177f090b450f1ec` //Voer de KEY API van openweather
                            )
                                .then(res => res.json())
                                .then(res => setWeather(res));
                        }
                    }
                });
            }
        );
    }, [currentUser.uid]);

    const weatherHandler = e => {
        e.preventDefault();

        setIsInputVisible(false);

        const userRef = db.ref("profileData/" + currentUser.uid);
        userRef.set({ city });

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=nl&appid=00dfd1bb3c25295cf177f090b450f1ec` //Voer de KEY API van openweather
        )
            .then(res => res.json())
            .then(res => {
                if (res.cod === 404) {
                    setError("De stad is niet gevonden");
                } else {
                    setWeather(res);
                }
            });
    };
    const inputHandler = e => {
        const { value } = e.target;
        setCity(value);
    };
    return (
        <React.Fragment>
            <section className='section'>
                {isInputVisible && (
                    <WeatherInput
                        onWeather={weatherHandler}
                        onChange={inputHandler}
                        value={city}
                    />
                )}
                {error && <p>{error}</p>}
                <WeatherDetails data={weather} />
            </section>
            <Navigation />
        </React.Fragment>
    );
}

export default Weather;
