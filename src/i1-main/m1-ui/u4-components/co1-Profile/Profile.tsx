import React, {useEffect, useState} from "react";
import s from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../u3-routes/Routes";
import {authMe} from "../../../m2-bll/auth-reducer";


export const Profile = () => {

    const name = useSelector<AppRootStateType, string>(s => s.profile.name)
    const avatar = useSelector<AppRootStateType, string | undefined>(s => s.profile.avatar)
    const publicCardPacksCount = useSelector<AppRootStateType, number>(s => s.profile.publicCardPacksCount)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)
    const dispatch = useDispatch()
    const [first, setFirst] = useState<boolean>(true);

    useEffect(() => {
        if (first) {
            dispatch(authMe())
            setFirst(false);
        }
    }, [first, dispatch])

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profile}>
            <div>{`your name is ${name}`}</div>
            {avatar ?<div>{`you face looks like this: ${avatar}`}</div> : null}
            <div>{`there is ${publicCardPacksCount} cards available`}</div>
        </div>
    )
}