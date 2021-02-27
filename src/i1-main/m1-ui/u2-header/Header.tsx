import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../u3-routes/Routes";
import s from './Header.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";


function Header() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)

    return (
        <div className={s.background}>
            {!isLoggedIn ?
                <div className={s.nav_links}>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                    </div>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active}
                                 to={PATH.REGISTRATION}>Registration</NavLink>
                    </div>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.RECOVERY}>Forgot
                            Password?</NavLink>
                    </div>
                </div>
                :
                <div className={s.nav_links}>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.PROFILE}>Profile</NavLink>
                    </div>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.PACKS}>Packs</NavLink>
                    </div>
                    <div className={s.nav_container}>
                        <NavLink className={s.title_nav} activeClassName={s.active} to={PATH.LOGOUT}>Logout</NavLink>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header;
