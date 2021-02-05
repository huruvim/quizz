import React, {useState} from "react";
import s from "./Test.module.css";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../i1-main/m1-ui/u4-components/SuperComponents/rc3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan
    from "../../i1-main/m1-ui/u4-components/SuperComponents/rc4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../i1-main/m1-ui/u4-components/SuperComponents/rc5-SuperSelect/SuperSelect";
import SuperRadio from "../../i1-main/m1-ui/u4-components/SuperComponents/rc6-SuperRadio/SuperRadio";
import SuperRange from "../../i1-main/m1-ui/u4-components/SuperComponents/rc7-SuperRange/SuperRange";

export const Test = () => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("");
    const arr = ["Oxy", "Script", "Babushka"];
    const [value1, onChangeOption] = useState(arr[1]);
    const [value2, setValue2] = useState(0);

    const setMinValue = (newMinValue: number): void => {
        setValue2(newMinValue)
    }



    return (
        <div className={s.test}>
            My SuperButtons are here
            <div className={s.superComponent}>
                1) <SuperButton red onClick={ () => alert('Good Job')}>Click on me</SuperButton>
            </div>
            <div className={s.superComponent}>
                2) <SuperInputText/>
            </div>
            <div className={s.superComponent}>
                3) <SuperCheckbox checked={checked} onChangeChecked={setChecked}/>
            </div>
            <div className={s.superComponent}>
                4) <SuperEditableSpan value={value} onChangeText={setValue}
                                      spanProps={{children: value ? undefined : "you can edit me"}}/>
            </div>
            <div className={s.superComponent}>
                5) <SuperSelect options={arr} value={value1} onChangeOption={onChangeOption}/>
            </div>
            <div className={s.superComponent}>
                6) <SuperRadio name={"radio"} options={arr} value={value1} onChangeOption={onChangeOption}/>
            </div>
            <div className={s.superComponent}>
                7) <span>{value2}</span>
                <SuperRange name={"radio"} value={value2} onChangeRange={setMinValue}/>
            </div>
            <div className={s.superComponent}>
                Test
            </div>
        </div>
    )
}