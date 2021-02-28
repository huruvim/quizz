import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Input, Layout, Modal, Popconfirm, Space, Spin, Table} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {Content} from "antd/es/layout/layout";
import {NavLink, Redirect} from 'react-router-dom';
import {ColumnsType} from "antd/es/table";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {CardPacksType} from "../../../i1-main/m3-dal/api";
import {addPackTC, currentPackIdAC, deletePackTC, getPacksTC, updatePack} from "./packs-reducer";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {message} from "antd/es";


interface User {
    name: string
    cardsCount: number
    creator: string
    lastUpdate: string
    key: string
}

export const Packs = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [packName, setPackName] = useState("")
    const [first, setFirst] = useState<boolean>(true);

    const [updateModalVisible, setUpdateModalVisible] = useState(false)
    const [updatePackName, setUpdatePackName] = useState("")


    // const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)


    const state = useSelector<AppRootStateType, Array<CardPacksType>>(s => s.packs.cardPacks)
    const currentId = useSelector<AppRootStateType, string>(s => s.packs.cardsPack_id)
    const isLoading = useSelector<AppRootStateType, boolean>(s => s.packs.isLoading)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)


    const dispatch = useDispatch()

    useEffect(() => {
        if (first) {
            dispatch(getPacksTC())
            setFirst(false)
        }
    }, [dispatch, first])
    ////
    const onOk = () => {
        if (updatePackName) {
        setUpdateModalVisible(false);
        dispatch(updatePack({_id: currentId, name: updatePackName}))
        setUpdatePackName('')
        } else {
            message.error(`Puck name must contain at least one regular character`)
        }
    };
    const onCancel = () => {
        setUpdateModalVisible(false);
        setUpdatePackName('')
    };
    const onUpdateName = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdatePackName(event.currentTarget.value)
    }

    const modalCallBack = () => {
        setUpdateModalVisible(true)
    }

    ////


    //addPack {
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
        if (packName) {
            setIsModalVisible(false);
            dispatch(addPackTC({name: packName}))
            setPackName('')
        }   else {
            message.error(`Puck name must contain at least one regular character`)
        }



    };
    // закрытие модалки по кнопке cancel или X
    const handleCancel = () => {
        setIsModalVisible(false)
        setPackName('')
    };
    // забирается id колоды
    const myCallBack = (id: string) => {
        dispatch(currentPackIdAC(id))
    }
    // }
    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const columns: ColumnsType<User> = [
        //Название Колоды
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '250px',
            render: (value: React.ReactNode) => {
                return <div>
                    <NavLink to={PATH.CARDS}>{value}</NavLink>
                </div>;
            },
        },
        //Создатель колоды
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            // sorter: {
            //     compare: (a, b) => a.grade - b.grade,
            //     multiple: 2
            // },
            width: '100',
            render: (creator: React.ReactNode) => (
                <Space size="middle">
                    <div>{creator}</div>
                </Space>
            ),
        },
        //колиество карт в колоде
        {
            title: 'Cards Count',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            width: '200',
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
                        <NavLink to={PATH.LEARN}>Learn</NavLink>
                        <a rel="stylesheet" onClick={() => {
                            modalCallBack()
                        }}>Update</a>
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
        creator: pack.user_name,
        key: pack._id
    }))

    return (
        <>
            <Spin spinning={isLoading}>
                <Layout>

                    <Button onClick={showModal}>Add Pack</Button>
                    <Modal title="Add Pack" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <span>Pack name: </span><Input onChange={handleSetName} value={packName}/>
                    </Modal>
                    <Modal title="Update pack name" visible={updateModalVisible} onOk={onOk} onCancel={onCancel}>
                        <span>Update pack name: </span><Input onChange={onUpdateName} value={updatePackName}/>
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
                            // bordered
                            pagination={{
                                position: ['topRight'],
                                defaultPageSize: 10,
                                pageSizeOptions: ['3', '5', '10', '20', '25']
                            }}
                        />
                    </Content>
                </Layout>
            </Spin>
        </>
    )
}