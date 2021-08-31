import React from "react";

const WeatherInput = props => {
    return (
        <form className='form' onSubmit={props.onWeather}>
            <div className='form__group'>
                <label className='form__label' htmlFor='city'>
                    Voer de naam van de stad in
                </label>
                <input
                    className='form__input'
                    id='city'
                    name='city'
                    type='text'
                    onChange={props.onChange}
                    value={props.value}
                />
            </div>
            <button className='button form__button'>Opslaan</button>
        </form>
    );
};

export default WeatherInput;
