import React, {ChangeEvent, useEffect, useState} from 'react';
import {Modal, Button, Layout, Space, Table, Input} from "antd";
import { Slider, Switch } from 'antd';
import style from "./TableWrapper.module.css"
import 'antd/dist/antd.css';
import {CardPacksType} from "../../i1-main/m3-dal/api";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, getCardsTC} from './t1-Packs/packs-reducer';
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import {Content, Header} from "antd/es/layout/layout";
import { NavLink } from 'react-router-dom';

export const TableWrapper = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [packName, setPackName] = useState("")

    const state = useSelector<AppRootStateType, Array<CardPacksType>>(s => s.packs.cardPacks)

    const dispatch = useDispatch()

    const handleSetName = (event: ChangeEvent<HTMLInputElement>) => {
      setPackName(event.currentTarget.value)
    }

    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(addPackTC({name: packName}))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        //Название Колоды
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20px',
            render: (text: string) => <NavLink to={"/pack"}>{text}</NavLink>
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
        //колиество карт в колоде
        {
            title: 'Cards Count',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            sorter: {
                compare: (a: any, b: any) => a.cardsCount - b.cardsCount,
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
            render: () => (
                <Space size="middle">
                    <Button>Update</Button>
                    <Button>Delete</Button>
                </Space>
            ),
        },
        //
    ];

    const data = state.map((pack) => ({
        name: pack.name,
        cardsCount: pack.cardsCount,
        lastUpdate: pack.updated.substr(0, 10).replace(/-/g, " "),
        grade: pack.grade,
        key: pack._id
    }))



    // function onChange(sorter: {}) {
    //     // console.log('params', sorter);
    // }
    // function onPaginationChange(e: ChangeEvent<HTMLInputElement>) {
    //     setRangeValue(+e.currentTarget.value)
    // }
    return (
        <>
            <Layout>
                {/*<Header style={{backgroundColor: "#ffffff"}}>*/}
                {/*    <Slider range defaultValue={[0, 100]}/>*/}
                {/*</Header>*/}
                <Button onClick={showModal} >Add Pack</Button>
                <Modal title="Add Pack" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <span>Pack name: </span><Input onChange={handleSetName}/>
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
                    //onChange={onChange}
                />
                </Content>
            </Layout>
        </>
    )
}
//pageSize: rangeValue