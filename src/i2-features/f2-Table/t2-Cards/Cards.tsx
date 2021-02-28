import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {RespondCardType} from "../../../i1-main/m3-dal/api";
import {Redirect} from "react-router-dom";
import {Button, Input, Layout, Modal, Popconfirm, Space, Table} from "antd";
import {Content} from "antd/es/layout/layout";
import {addCardTC, currentPackIdAC, deleteCardTC, getCardsTC} from "./cards-reducer";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {ColumnsType} from "antd/es/table";

interface User {
    question: string
    answer: string
    grade: number
    lastUpdate: string
    key: string
}


export const Cards = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const state = useSelector<AppRootStateType, Array<RespondCardType>>(s => s.cards.cards)
    const cardsPack_id = useSelector<AppRootStateType, string>(s => s.cards.cardsPack_id)
    const dispatch = useDispatch()


    const handleSetQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    const handleSetAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }

    useEffect(() => {
        const packId = state.find(cr=> cr.cardsPack_id )
        if (packId) {
        dispatch(getCardsTC(cardsPack_id))
        }
    }, [dispatch])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(addCardTC({cardsPack_id, question, answer, }))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (cardsPack_id === '') {
        return <Redirect to={PATH.PACKS}/>
    }


    const columns: ColumnsType<User> = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '20px',
            render: (text: string, record) => {
                return <div>{text}</div>
            }
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            width: '20px',
            render: (text: string) => <div>{text}</div>
        },
        //Оценка колоды
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            sorter: {
                compare: (a: any, b: any) => a.grade - b.grade,
                multiple: 2
            },
            render: (grade: React.ReactNode) => (
                <Space size="middle">
                    <div>{grade}</div>
                </Space>
            ),
        },
        //посл. обновлен.
        {
            title: 'Last Update',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
        },
        //actions
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: { key: React.Key }) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const handleDelete = (key: React.Key) => {
        const packId = key.toString()
        dispatch(deleteCardTC(packId))
        dispatch(currentPackIdAC(packId))
    };
    const data: User[] = state.map((pack) => ({
        question: pack.question,
        answer: pack.answer,
        grade: pack.grade,
        lastUpdate: pack.updated.substr(0, 10).replace(/-/g, " "),
        key: pack._id,
    }))

    return (
        <>
            <Layout>
                <Button onClick={showModal}>Add Card</Button>
                <Modal title="Add Card" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <span>Question: </span><Input value={question} onChange={handleSetQuestion}/>
                    <span>Answer: </span><Input value={answer} onChange={handleSetAnswer}/>
                </Modal>
                <Content>
                    <Table
                        dataSource={data}
                        columns={columns}
                        bordered
                        pagination={{
                            position: ['topRight'],
                            defaultPageSize: 10,
                            pageSizeOptions: ['3', '5', '10', '20', '25']
                        }}

                    />
                </Content>
            </Layout>
        </>
    )
}