import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Error404 from "../u4-components/co2-Error404/Error404";
import {Login} from "../../../i2-features/f1-Auth/f1-Login/Login";
import {Registration} from "../../../i2-features/f1-Auth/f3-Registration/Registration";
import {Profile} from "../u4-components/co1-Profile/Profile";
import {Recovery} from "../../../i2-features/f1-Auth/f2-Recovery/Recovery";
import {CreateNewPassword} from "../../../i2-features/f1-Auth/f2-Recovery/CreateNewPassword";
import {Logout} from "../../../i2-features/f1-Auth/f1-Login/Logout";
import {Cards} from "../../../i2-features/f2-Table/t2-Cards/Cards";
import {Packs} from "../../../i2-features/f2-Table/t1-Packs/Packs";
import {Learn} from "../../../i2-features/f2-Table/t3-Learn/Learn";


export const PATH = {
    LOGIN: "/login",
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY: '/recovery',
    CREATE_NEW_PASSWORD: '/create_new_password',
    LOGOUT: '/logout',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN: '/learn'



    // add paths
}

function Routes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>
                 {/*в начале мы попадаем  на страницу "/" и переходим сразу на страницу PRE_JUNIOR*/}
                {/*exact нужен чтоб указать полное совподение (что после "/" ничего не будет)*/}
                {/*<Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>*/}
                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                {/*<Route path={PATH.RECOVERY} render={() => <Recovery/>}/>*/}
                <Route path={`${PATH.CREATE_NEW_PASSWORD}/:resetPasswordToken`}  render={() => <CreateNewPassword/>}/>
                <Route path={PATH.RECOVERY} exact render={() => <Recovery/>}/>
                <Route path={PATH.LOGOUT} render={() => <Logout/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>

                <Route path={`${PATH.CARDS}/:packToken`} render={() => <Cards/>}/>
                <Route path={`${PATH.CARDS}`} exact render={() => <Cards/>}/>
                <Route path={`${PATH.LEARN}`} exact render={() => <Learn/>}/>



                <Route path={'/404'} render={() => <Error404/>}/>
                <Redirect from={'*'} to={'/404'}/>

            </Switch>
        </div>
    );
}

export default Routes;
