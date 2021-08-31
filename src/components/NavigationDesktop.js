import React from "react";
import { NavLink } from "react-router-dom";

function NavigationDesktop(props) {
    return (
        <nav className='nav'>
            <NavLink
                exact
                to='/'
                className='nav__link'
                activeClassName='nav__link--active'>
                Huidige weer
            </NavLink>
            <NavLink
                exact
                to='/zglos-zdarzenie'
                className='nav__link'
                activeClassName='nav__link--active'>
                Nieuwe melding
            </NavLink>
            <NavLink
                exact
                to='/wszystkie-uszkodzenia'
                className='nav__link'
                activeClassName='nav__link--active'>
                Alle bekende schades
            </NavLink>
            <NavLink
                exact
                to='/profil'
                className='nav__link'
                activeClassName='nav__link--active'>
                Profiel
            </NavLink>
            <button className='nav__link button--nav' onClick={props.handleLogout}>
                Uitloggen
            </button>
        </nav>
    );
}

export default NavigationDesktop;
