import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {Button, Divider, Layout, message} from "antd";
import {Content} from "antd/es/layout/layout";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {getCardsTC} from "../t2-Cards/cards-reducer";
import 'antd/dist/antd.css';
import s from './Learn.module.css'
import {cardsEvaluation} from "./learn-reducer";
import {authMe} from "../../../i1-main/m2-bll/auth-reducer";

export type CardType = {
    _id: string;
    cardsPack_id: string;

    answer: string;
    question: string;
    grade: number;
    shots: number;

    type: string;
    rating: number;
    // more_id: string;

    created: string;
    updated: string;
}

const messages = [
    'Не переживай ты всё равно красавчик',
    'Да ты всё и так знаешь, просто гонишь',
    'Ну ты красавчик',
    'Самурай, лети на собес!',
    'Ты стопудовый мидл не меньше!'
]


const getCard = (cards: Array<CardType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


export const Learn = () => {
    const {cards} = useSelector((store: AppRootStateType) => store.cards);
    // const {cards} = useSelector<AppRootStateType, CardType>(store => store.cards);
    const cardsPack_id = useSelector<AppRootStateType, string>(s => s.cards.cardsPack_id)
    const dispatch = useDispatch()

    const [first, setFirst] = useState<boolean>(true);
    const [check, setCheck] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(false)

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: '',
        question: '',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        // more_id: '',

        created: '',
        updated: '',
    });

    const myCallBack = useCallback((grade: number, card_id: string) => {
        message.info(messages[grade - 1], 2)
        dispatch(cardsEvaluation({grade, card_id}))
        setIsDisable(false)
        setIsDisabledButton(true)

    }, [setIsDisable, dispatch])

    const checkButton = useCallback((check: boolean) => {
        setCheck(check)
        if (cards.length > 0 && !check) {
            setCard(getCard(cards));
        }
        setIsDisabledButton(false)
    }, [setCheck])

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(cardsPack_id))
            setFirst(false);
        }

        if (cards.length > 0) setCard(getCard(cards));
        return () => {
            // console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cards, first])

    if (cardsPack_id === '') {
        return <Redirect to={PATH.PACKS}/>
    }

    return (
        <> {card &&
        <Layout className={s.layout}>
            <Content className={s.content}>
                <div>
                    <div className={s.question}>
                        <div className={s.question}>{card.question}</div>
                        <Button onClick={() => checkButton(true) } disabled={isDisabledButton}>CHECK</Button></div>
                    {check &&
                    <div>
                        <Divider/>
                        <div className={s.answer}>{card.answer}</div>
                        <div className={s.buttons}>
                            <div className={s.button}>
                                <Button onClick={() => myCallBack(1, card._id)} disabled={isDisabledButton}>I do not know it</Button>
                            </div>
                            <div className={s.button}>
                                <Button onClick={() => myCallBack(2, card._id)} disabled={isDisabledButton}>I am not sure</Button>
                            </div>
                            <div className={s.button}>
                                <Button onClick={() => myCallBack(3, card._id)} disabled={isDisabledButton}>I feel I knew it</Button>
                            </div>
                            <div className={s.button}>
                                <Button onClick={() => myCallBack(4, card._id)} disabled={isDisabledButton}>I know it</Button>
                            </div>
                            <div className={s.button}>
                                <Button onClick={() => myCallBack(5, card._id)} disabled={isDisabledButton}>I know well</Button>
                            </div>
                        </div>
                        <div className={s.nextButton}>
                            <Button disabled={isDisable} onClick={() => checkButton(false)}>NEXT</Button>
                        </div>
                        <Divider/>
                    </div>
                    }
                </div>
            </Content>
        </Layout>
        }
        </>
    )
}