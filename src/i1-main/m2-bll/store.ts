import {applyMiddleware, combineReducers, createStore} from 'redux'
import {testReducer} from "./test-reducer";
import {authReducer} from "../m1-ui/u4-components/co1-Login/auth-reducer";
import {profileReducer} from "../m1-ui/u4-components/co3-Profile/profile-reducer";
import {registrationReducer} from "../m1-ui/u4-components/co2-Registration/registration-reducer";
import { recoveryReducer } from '../m1-ui/u4-components/co5-Recovery/Recovery-reducer';
import thunk from 'redux-thunk';



const rootReducer = combineReducers({
    test: testReducer,
    isLoggedIn: authReducer,
    profile: profileReducer,
    isRegistered: registrationReducer,
    recovery: recoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
