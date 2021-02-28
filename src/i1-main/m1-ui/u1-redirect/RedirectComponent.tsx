import {PATH} from "../u3-routes/Routes";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import {authMe} from "../../m2-bll/auth-reducer";
import {Spin} from "antd";

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type AuthRedirectPagePropsType = DivPropsType & {}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {
        children,
        ...restProps
    }
) => {
    const user = useSelector((store: AppRootStateType) => store.profile);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.isLoggedIn.isLoggedIn)
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(user._id === ""); // !!! add request /auth/me
    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRendering) {
            // if (isLoggedIn) console.log("Error");
            if (user._id === "") {
                dispatch(authMe());
            }
            setFirstRendering(false); // + rerender
        } else {
            if (!redirect && ((spin) || (!spin && user._id === ""))) {
                setTimeout(() => setRedirect(true), 1500);
            }
            if (isLoggedIn && spin) setSpin(false);
        }
    }, [firstRendering, setFirstRendering, user._id, setRedirect, isLoggedIn,
        dispatch, redirect, spin, setSpin]);

    if (redirect) return <Redirect to={PATH.LOGIN}/>;
    if (spin) return <Spin spinning={true}/>;

    return (
        <>
            {/*<Log s={renderLog || "rendering AuthRedirectPage"}/>*/}
            <div {...restProps}>
                {children}
            </div>
        </>
    );
});

export default AuthRedirectPage;