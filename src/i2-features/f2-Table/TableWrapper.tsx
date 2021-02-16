import React, {useEffect} from 'react';
import {Space, Table} from "antd";
import 'antd/dist/antd.css';
import {CardPacksType} from "../../i1-main/m3-dal/api";
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC} from './t1-Packs/packs-reducer';
import {AppRootStateType} from "../../i1-main/m2-bll/store";

export const TableWrapper = () => {

    const state = useSelector<AppRootStateType, Array<CardPacksType>>(s => s.packs.cardPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        debugger
        dispatch(getCardsTC())
    }, [dispatch])

    const columns = [
        //Название Колоды
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20px',
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
                    <a>Add to basket</a>
                    <a>Update</a>
                    <a>Delete</a>
                </Space>
            ),
        },
        //
    ];

    const data = state.map((pack) => ({
        name: pack.name,
        cardsCount: pack.cardsCount,
        lastUpdate: pack.updated,
        grade: pack.grade


    }))



    // function onChange(sorter: {}) {
    //     // console.log('params', sorter);
    // }
    // function onPaginationChange(e: ChangeEvent<HTMLInputElement>) {
    //     setRangeValue(+e.currentTarget.value)
    // }
    return (
        <>
            <Table
                dataSource={data}
                columns={columns}
                bordered
                pagination={{ position: ['topRight'], defaultPageSize: 10, pageSizeOptions: ['3', '5', '10', '20', '25'] }}
                // onChange={onChange}

        />
        </>
    )
}
//pageSize: rangeValue