import React from "react";
import s from './Error404.module.css'
// import girl from '../../u1-common/c1-assets/images/girl-dancer.gif'

function Error404() {
    return (
        <div className={s.error404}>
            <div className={s.error404_text}>404
            Page not found!</div><br/>
            <div className={s.girl}><img  alt=""/>
            </div>
        </div>
    )
}

export default Error404;
