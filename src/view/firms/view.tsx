import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {getCurrencies, getFirmById, setCurrency} from "../../redux/reducers/firm-currency.ts";
import {useLocation, useParams} from "react-router-dom";
import qs from "qs";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import {getStores} from "../../redux/reducers/variable.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {Card, CardBody} from "@material-tailwind/react";
import TableComponent from "../../components/table";
import {TableColumn} from "react-data-table-component";
import {BiPencil, BiPlus} from "react-icons/bi";
import {currencyDataProps} from "../../interface/redux/firm-currency.interface.ts";
import DateFormatClockComponent from "../../components/date-format/oclock.tsx";
import AddCurrency from "./add-currency.tsx";
import {FaFilter} from "react-icons/fa";
import FilterCurrencies from "./filter-currencies.tsx";
import ButtonComponent from "../../components/button";

export default function FirmView() {

    const {id} = useParams()
    const location = useLocation()

    const dispatch = useAppDispatch()
    const {
        currencies, currentPage,
        firm,
        pageCount,
        limit,
        totalCount,
        loading
    } = useAppSelector(state => state.firms)
    const {stores} = useAppSelector(state => state.variables)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const [createModal, setCreateModal] = React.useState(false)
    const [filter, setFilter] = React.useState(false)

    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    React.useLayoutEffect(() => {
        dispatch(getFirmById(String(id)))

        return () => {
            dispatch({
                type: 'firmCurrency/getFirmById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [id])


    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    React.useLayoutEffect(() => {
        if (location.search) {
            dispatch(getCurrencies({...query, filter: JSON.stringify({firmId: id})}))
        } else {
            dispatch(getCurrencies({filter: JSON.stringify({firmId: id})}))
        }

        return () => {
            dispatch({
                type: 'firmCurrency/getCurrencies/fulfilled',
                payload: {
                    data: []
                }
            })
        }
    }, [location.search])

    const breadCumbc: BreadCumbsDataProps[] = [
        {
            name: "Do'kon",
            link: "/seller/magazines"
        },
        {
            name: stores.find(item => item.id === Number(getMgId()))?.storeName || "",
            link: `/seller/products/${getMgId()}`
        },
        {
            name: firm?.firmName || "",
            link: `/seller/firms`
        },
        {
            name: "Mablag'lar",
            link: ""
        }
    ]

    function editItem(item: currencyDataProps) {
        dispatch(setCurrency(item))
        toggleCreate()
    }

    const basicColumns: TableColumn<any>[] = [
        // {
        //     width: '50px',
        //     wrap: true,
        //     cell: (row: currencyDataProps) => (
        //         <><FaEye className={"text-lg text-green-500 cursor-pointer"}
        //                  onClick={() => navigate(`/seller/firm/${row.id}`)}/></>
        //     )
        // },
        {
            name: "Mablag'",
            width: '200px',
            wrap: true,
            selector: (row: currencyDataProps) => row.currencyMoney
        },
        {
            name: "Izoh",
            width: '250px',
            wrap: true,
            selector: (row: currencyDataProps) => row.currencyOption
        },
        {
            name: "Ro'yxatdan o'tgan vaqt",
            wrap: true,
            width: '200px',
            cell: (row: currencyDataProps) => <DateFormatClockComponent currentDate={row.createdAt}/>
        },
        {
            name: "O'zgartirish kiritilgan vaqt",
            wrap: true,
            width: '200px',
            cell: (row: currencyDataProps) => <DateFormatClockComponent currentDate={row.updatedAt}/>
        },
        {
            name: 'Holat',
            width: '100px',
            cell: (row: currencyDataProps) => (
                <div className={'flex gap-2'}>
                    <BiPencil width={30} className={"cursor-pointer text-orange-500 text-base"}
                              onClick={() => editItem(row)}
                    />
                    {/*<BiTrash width={20} className={"cursor-pointer text-red-500 text-base"}/>*/}
                </div>
            )
        }
    ]

    return (
        <div className={"w-full "}>
            <div className="w-full flex justify-between items-center my-2 overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
                <div className="flex gap-2">
                    <ButtonComponent onClick={handleFilter} className="border border-green" outline
                                     label={<FaFilter size={16} className={'text-green'}/>}/>
                    <ButtonComponent
                        onClick={toggleCreate}
                        className="border border-green"
                        outline
                        label={<BiPlus size={16} className={'text-green'}/>}/>
                </div>
            </div>
            <Card className={"flex justify-center my-2 w-full border"}>
                <CardBody>
                    <div className="flex justify-center">
                        <span><b>{firm?.firmName} / {firm?.firmINN}</b> ga tegishli hisobot</span>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <TableComponent
                        data={currencies}
                        size={currencies.length}
                        limit={limit}
                        columns={basicColumns}
                        progressPending={loading}
                        totalPages={pageCount}
                        currentPage={currentPage}
                        totalCount={totalCount}
                    />
                </CardBody>
            </Card>
            <AddCurrency open={createModal} toggle={toggleCreate}/>
            <FilterCurrencies open={filter} toggle={handleFilter}/>
        </div>
    );
}