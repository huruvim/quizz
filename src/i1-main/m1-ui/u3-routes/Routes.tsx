import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Error404 from "../u4-components/co4-Error404/Error404";
import {Login} from "../u4-components/co1-Login/Login";
import {Registration} from "../u4-components/co2-Registration/Registration";
import {Profile} from "../u4-components/co3-Profile/Profile";
import {Recovery} from "../u4-components/co5-Recovery/Recovery";
import {CreateNewPassword} from "../u4-components/co5-Recovery/CreateNewPassword";
import {Test} from "../../../i2-features/f0-test/Test";


export const PATH = {
    LOGIN: "/login",
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY: '/recovery',
    CREATE_NEW_PASSWORD: '/create_new_password',
    TEST: '/super_inputs'



    // add paths
}

function Routes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>
                {/*в начале мы попадаем на страницу "/" и переходим сразу на страницу PRE_JUNIOR*/}
                {/*exact нужен чтоб указать полное совподение (что после "/" ничего не будет)*/}
                {/*<Route path={"/"} exact render={() => <Redirect to={PATH.PRE_JUNIOR}/>}/>*/}
                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RECOVERY} render={() => <Recovery/>}/>
                <Route path={PATH.CREATE_NEW_PASSWORD} render={() => <CreateNewPassword/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>


                <Route path={'/404'} render={() => <Error404/>}/>

                {/*// add routes*/}

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Redirect from={'*'} to={'/404'}/>

                {/*<Route render={() => <Error404/>}/>*/}

            </Switch>
        </div>
    );
}

export default Routes;