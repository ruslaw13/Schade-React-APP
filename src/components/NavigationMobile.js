import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

function NavigationMobile(props) {
    const navMobileRef = useRef(null);
    const navMobileLineTop = useRef(null);
    const navMobileLineMiddle = useRef(null);
    const navMobileLineBottom = useRef(null);

    const handleClick = e => {
        navMobileRef.current.classList.toggle("nav-mobile--visible");
        navMobileLineTop.current.classList.toggle("nav-mobile-button__line--top");
        navMobileLineMiddle.current.classList.toggle("nav-mobile-button__line--middle");
        navMobileLineBottom.current.classList.toggle("nav-mobile-button__line--bottom");
    };

    return (
        <React.Fragment>
            <ul ref={navMobileRef} className='nav-mobile'>
                <div className='nav-mobile__inner'>
                    <li className='nav-mobile__item'>
                        <NavLink
                            exact
                            to='/'
                            className='nav-mobile__link'
                            activeClassName='nav-mobile__link--active'>
                            Huidige weer
                        </NavLink>
                    </li>
                </div>
                <div className='nav-mobile__inner'>
                    <li className='nav-mobile__item'>
                        <NavLink
                            exact
                            to='/zglos-zdarzenie'
                            className='nav-mobile__link'
                            activeClassName='nav-mobile__link--active'>
                            Nieuwe melding
                        </NavLink>
                    </li>
                </div>
                <div className='nav-mobile__inner'>
                    <li className='nav-mobile__item'>
                        <NavLink
                            exact
                            to='/wszystkie-uszkodzenia'
                            className='nav-mobile__link'
                            activeClassName='nav-mobile__link--active'>
                            Alle bekende schades
                        </NavLink>
                    </li>
                </div>
                <div className='nav-mobile__inner'>
                    <li className='nav-mobile__item'>
                        <NavLink
                            exact
                            to='/profil'
                            className='nav-mobile__link'
                            activeClassName='nav-mobile__link--active'>
                            Profiel
                        </NavLink>
                    </li>
                </div>
                <div className='nav-mobile__inner'>
                    <li className='nav-mobile__item'>
                        <button
                            className='nav-mobile__logout'
                            onClick={props.handleLogout}>
                            Uitloggen
                        </button>
                    </li>
                </div>
            </ul>
            <div onClick={handleClick} className='nav-mobile-button'>
                <div className='nav-mobile-button__text'>Menu</div>
                <div className='nav-mobile-button__icon'>
                    <div
                        ref={navMobileLineTop}
                        id='top-line'
                        className='nav-mobile-button__line'></div>
                    <div
                        ref={navMobileLineMiddle}
                        id='middle-line'
                        className='nav-mobile-button__line'></div>
                    <div
                        ref={navMobileLineBottom}
                        id='bottom-line'
                        className='nav-mobile-button__line'></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavigationMobile;
