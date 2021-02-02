import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../u3-routes/Routes";
import s from './Header.module.css'

function Header() {
    return (
        <div className={s.background}>
            <div className={s.nav_links}>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active}
                             to={PATH.REGISTRATION}>Registration</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.PROFILE}>Profile</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.RECOVERY}>Forgot
                        Password?</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.CREATE_NEW_PASSWORD}>Change
                        Password</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.TEST}>Super Buttons</NavLink>
                </div>
                <div className={s.nav_container}>
                    <NavLink className={s.title_nav} activeClassName={s.active} to={'/404'}>404 Error</NavLink>
                </div>

            </div>
        </div>
    )
}

export default Header;
