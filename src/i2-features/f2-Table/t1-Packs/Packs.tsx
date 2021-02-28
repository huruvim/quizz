import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Input, Layout, Modal, Popconfirm, Space, Table} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {Content} from "antd/es/layout/layout";
import {NavLink, Redirect} from 'react-router-dom';
import {ColumnsType} from "antd/es/table";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {CardPacksType} from "../../../i1-main/m3-dal/api";
import {addPackTC, currentPackIdAC, deletePackTC, getPacksTC} from "./packs-reducer";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {authMe} from "../../../i1-main/m2-bll/auth-reducer";


interface User {
    name: string
    cardsCount: number
    grade: number
    lastUpdate: string
    key: string
}

export const Packs = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [packName, setPackName] = useState("")
    const [first, setFirst] = useState<boolean>(true);


    const state = useSelector<AppRootStateType, Array<CardPacksType>>(s => s.packs.cardPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        if(first) {
            dispatch(getPacksTC())
            setFirst(false)
        }
    }, [dispatch, first])

    //добовление имя колоды в useState
    const handleSetName = (event: ChangeEvent<HTMLInputElement>) => {
        setPackName(event.currentTarget.value)
    }

    //Показать модальное окно
    const showModal = () => {
        setIsModalVisible(true);
    };

    // При нажатии в модальном окне кнопки ок
    const handleOk = () => {
        // debugger
        setIsModalVisible(false);
        dispatch(addPackTC({name: packName}))
    };
    // закрытие модалки по кнопке cancel или X
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // забирается id колоды
    const myCallBack = (id: string) => {
        dispatch(currentPackIdAC(id))
    }

    const columns: ColumnsType<User> = [
        //Название Колоды
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            render: (value: React.ReactNode) => {
                return <div>
                    <NavLink to={PATH.CARDS}>{value}</NavLink>
                </div>;
            },
        },
        //Оценка колоды
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            sorter: {
                compare: (a, b) => a.grade - b.grade,
                multiple: 2
            },
            render: (grade: React.ReactNode) => (
                <Space size="middle">
                    <div>{grade}</div>
                </Space>
            ),
        },
        //колиество карт в колоде
        {
            title: 'Cards Count',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            sorter: {
                compare: (a, b) => a.cardsCount - b.cardsCount,
                multiple: 1
            },
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
            render: (s, record: { key: React.Key }) => (
                <div>
                    <Space size={'middle'}>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                        <NavLink to={PATH.LEARN} >Learn</NavLink>
                    </Space>

                </div>

            ),
        },
    ];
    const handleDelete = (key: React.Key) => {
        const packId = key.toString()
        dispatch(deletePackTC(packId))
        dispatch(currentPackIdAC(packId))
    };


    const data: User[] = state.map((pack) => ({
        name: pack.name,
        cardsCount: pack.cardsCount,
        lastUpdate: pack.updated.substr(0, 10).replace(/-/g, " "),
        grade: pack.grade,
        key: pack._id
    }))

    return (
        <>
            <Layout>
                <Button onClick={showModal}>Add Pack</Button>
                <Modal title="Add Pack" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <span>Pack name: </span><Input onChange={handleSetName}/>
                </Modal>
                <Content>
                    <Table<User>
                        dataSource={data}
                        columns={columns}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    myCallBack(record.key)
                                }, // click row
                            };
                        }}
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