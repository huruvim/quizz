import React from "react";
import s from "./Profile.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {AxiosResponseType} from "../../../m2-bll/auth-reducer";
import profilePic from "../../u1-common/c1-assets/images/smile.png"


export const Profile = () => {

    const profile = useSelector<AppRootStateType, AxiosResponseType>(s => s.profile)

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.avatar}><img src={profile.avatar ?? profilePic} alt="avatar"/></div>
                <div className={s.info}>
                    <div className={s.name}>{profile.name}</div>
                    <div className={s.text}>{`Tha amount of public cards you created is ${profile.publicCardPacksCount}`}</div>
                </div>
            </div>
        </div>
    )
}