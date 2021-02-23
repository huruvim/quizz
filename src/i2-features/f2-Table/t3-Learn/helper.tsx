import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {RespondCardType} from "../../../i1-main/m3-dal/api";


export const Helper = () => {
    const state = useSelector<AppRootStateType, Array<RespondCardType>>(s => s.cards.cards)
    // const takeRandomCard = state.map((el) => {
    //         const container = [];
    //         container.push(el.question)
    //         return container
    //         })
    // const commonArray = takeRandomCard.flat()
    // const randomElement = commonArray[Math.floor(Math.random() * commonArray.length)];
    // debugger

    const random = state[Math.floor(Math.random() * state.length)]
    const sum = state.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    console.log(sum)

debugger

    return <div>
        {random}
    </div>
}