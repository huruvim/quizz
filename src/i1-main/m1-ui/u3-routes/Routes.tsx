import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Error404 from "../u4-components/co2-Error404/Error404";
import {Login} from "../../../i2-features/f1-Login/Login";
import {Registration} from "../../../i2-features/f3-Registration/Registration";
import {Profile} from "../u4-components/co1-Profile/Profile";
import {Recovery} from "../../../i2-features/f2-Recovery/Recovery";
import {CreateNewPassword} from "../../../i2-features/f2-Recovery/CreateNewPassword";
import {Test} from "../../../i2-features/f0-test/Test";


export const PATH = {
    LOGIN: "/login",
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY: '/recovery',
    CREATE_NEW_PASSWORD: '/create-new-password',
    TEST: '/super-inputs'



    // add paths
}

function Routes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>
                {/*в начале мы попадаем на страницу "/" и переходим сразу на страницу PRE_JUNIOR*/}
                {/*exact нужен чтоб указать полное совподение (что после "/" ничего не будет)*/}
                {/*<Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>*/}
                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RECOVERY} render={() => <Recovery/>}/>
                <Route path={`${PATH.CREATE_NEW_PASSWORD}/:token`}  render={() => <CreateNewPassword/>}/>
                <Route path={PATH.RECOVERY} exact render={() => <Recovery/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>


                <Route path={'/404'} render={() => <Error404/>}/>

                <Redirect from={'*'} to={'/404'}/>

            </Switch>
        </div>
    );
}

export default Routes;
