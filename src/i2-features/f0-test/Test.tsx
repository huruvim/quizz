import React, {useState} from "react";
import s from "./Test.module.css";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../i1-main/m1-ui/u4-components/SuperComponents/rc3-SuperCheckbox/SuperCheckbox";

export const Test = () => {
    const [checked, setChecked] = useState<boolean>(false);
    return (
        <div className={s.test}>
            Test will be here
            <div>
                1) <SuperButton
                red
                onClick={ () => alert('Good Job')}>Click on me</SuperButton>
            </div>
            <div>
                2) <SuperInputText/>
            </div>
            <div>
                3) <SuperCheckbox
                checked={checked}
                onChangeChecked={setChecked}/>
            </div>
        </div>
    )
}