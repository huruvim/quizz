import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {RespondCardType} from "../../../i1-main/m3-dal/api";
import {Redirect} from "react-router-dom";
import {Button, Divider, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {cardsAC, getCardsTC} from "../t2-Cards/cards-reducer";
import 'antd/dist/antd.css';
import s from './Learn.module.css'
import {cardsEvaluation} from "./learn-reducer";

export type CardType = {
    _id: string;
    cardsPack_id: string;

    answer: string;
    question: string;
    grade: number;
    shots: number;

    type: string;
    rating: number;
    more_id: string;

    created: string;
    updated: string;
}

const getCard = (cards: Array<CardType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}



export const Learn = () => {
    // const state = useSelector<AppRootStateType, Array<RespondCardType>>(s => s.cards.cards)
    const {cards} = useSelector((store: AppRootStateType) => store.cards);
    const cardsPack_id = useSelector<AppRootStateType, string>(s => s.cards.cardsPack_id)
    const dispatch = useDispatch()

    const [first, setFirst] = useState<boolean>(true);
    const [check, setCheck] = useState(false)
    const [isDisable, setIsDisable] = useState(true)

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    });

    const myCallBack = useCallback((grade: number, card_id: string) => {
        debugger
        dispatch(cardsEvaluation({grade, card_id}))
        setIsDisable(false)

    },[setIsDisable, dispatch])

    const checkButton = useCallback((check: boolean) => {
        debugger
        setCheck(check)
        if (cards.length > 0 && !check) {
            // dispatch
            setCard(getCard(cards));
        }
    },[setCheck])

    // const random = useCallback(() => {
    //     console.log('here')
    //     return state[Math.floor(Math.random() * state.length)]
    // },[state])


    useEffect(() => {
        debugger
        const packId = cards.find(cr => cr.cardsPack_id)
        if (first) {
            if (packId) {
                dispatch(getCardsTC(cardsPack_id))
            }
            setFirst(false);

        }
        if (cards.length > 0) setCard(getCard(cards));
        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cards, first])


    if (cardsPack_id === '') {
        return <Redirect to={PATH.PACKS}/>
    }


    debugger

    return (
        <> {card &&
            <Layout className={s.layout}>
                <Content className={s.content}>
                    <div>
                        <div className={s.question}>
                            <div className={s.question}>{card.question}</div>
                            <Divider/>
                            <Button onClick={() => checkButton(true)}>CHECK</Button></div>
                        {check &&
                        <div>
                            <div className={s.answer}>{card.answer}</div>
                            <div className={s.buttons}>
                                <div className={s.button}>
                                    <Button onClick={() => myCallBack(1, card._id)}>I know it about 20%</Button>
                                </div>
                                <div className={s.button}>
                                    <Button onClick={() => myCallBack(2, card._id)}>I know it about 40%</Button>
                                </div>
                                <div className={s.button}>
                                    <Button onClick={() => myCallBack(3, card._id)}>I know it about 60%</Button>
                                </div>
                                <div className={s.button}>
                                    <Button onClick={() => myCallBack(4, card._id)}>I know it about 80%</Button>
                                </div>
                                <div className={s.button}>
                                    <Button onClick={() => myCallBack(5, card._id)}>I know it about 100%</Button>
                                </div>
                            </div>
                            <Divider/>
                            <div className={s.nextButton}>
                                <Button disabled={isDisable} onClick={() => checkButton(false)}>NEXT</Button>
                            </div>

                        </div>
                        }
                    </div>
                </Content>
            </Layout>
        }
        </>
    )
}