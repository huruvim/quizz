import {applyMiddleware, combineReducers, createStore} from 'redux'
import {testReducer} from "./test-reducer";
import {authReducer} from "./auth-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registration-reducer";

import {recoveryReducer} from "./recovery-reducer";
import thunk from 'redux-thunk';
import {packsReducer} from "../../i2-features/f2-Table/t1-Packs/packs-reducer";



const rootReducer = combineReducers({
    test: testReducer,
    isLoggedIn: authReducer,
    profile: profileReducer,
    isRegistered: registrationReducer,
    recovery: recoveryReducer,
    packs: packsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
