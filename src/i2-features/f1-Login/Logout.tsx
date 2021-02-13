import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import {onLogoutAC} from "../../i1-main/m2-bll/auth-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../i1-main/m1-ui/u3-routes/Routes";

export const Logout: FC = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)

    useEffect(() => {
        dispatch(onLogoutAC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>

        </div>
    )
}
