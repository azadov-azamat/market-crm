import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {getFirms, setFirm} from "../../redux/reducers/firm-currency.ts";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import {getStores} from "../../redux/reducers/variable.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {Card, CardBody} from "@material-tailwind/react";
import TableComponent from "../../components/table";
import {TableColumn} from "react-data-table-component";
import {FaEye, FaFilter} from "react-icons/fa";
import {BiPencil, BiPlus} from "react-icons/bi";
import {firmDataProps} from "../../interface/redux/firm-currency.interface.ts";
import DateFormatClockComponent from "../../components/date-format/oclock.tsx";
import AddFirm from "./add-firm.tsx";
import FilterFirms from "./filter-firms.tsx";
import ButtonComponent from "../../components/button";

export default function Firms() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        firms, currentPage,
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


    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    React.useLayoutEffect(() => {
        if (location.search) {
            dispatch(getFirms({...query}))
        } else {
            dispatch(getFirms({}))
        }

        return () => {
            dispatch({
                type: 'firmCurrency/getFirms/fulfilled',
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
            name: "Korxonalar",
            link: ``
        }
    ]

    function editItem(item: firmDataProps) {
        dispatch(setFirm(item))
        toggleCreate()
    }

    const basicColumns: TableColumn<any>[] = [
        {
            width: '50px',
            wrap: true,
            cell: (row: firmDataProps) => (
                <><FaEye className={"text-lg text-green-500 cursor-pointer"}
                         onClick={() => navigate(`/seller/firm/${row.id}`)}/></>
            )
        },
        {
            name: 'Nomi',
            width: '200px',
            wrap: true,
            selector: (row: firmDataProps) => row.firmName
        },
        {
            name: "INN",
            width: '150px',
            wrap: true,
            selector: (row: firmDataProps) => row.firmINN
        },
        {
            name: "Ro'yxatdan o'tgan vaqt",
            wrap: true,
            width: '200px',
            cell: (row: firmDataProps) => <DateFormatClockComponent currentDate={row.createdAt}/>
        },
        {
            name: "O'zgartirish kiritilgan vaqt",
            wrap: true,
            width: '200px',
            cell: (row: firmDataProps) => <DateFormatClockComponent currentDate={row.updatedAt}/>
        },
        {
            name: 'Holat',
            width: '100px',
            cell: (row: firmDataProps) => (
                <div className={'flex gap-2'}>
                    <BiPencil width={30} className={"cursor-pointer text-orange-500 text-base"}
                              onClick={() => editItem(row)}
                    />
                </div>
            )
        }
    ]

    return (
        <div>
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
            <Card>
                <CardBody>
                    <TableComponent
                        data={firms}
                        size={firms.length}
                        limit={limit}
                        columns={basicColumns}
                        progressPending={loading}
                        totalPages={pageCount}
                        currentPage={currentPage}
                        totalCount={totalCount}
                    />
                </CardBody>
            </Card>
            <AddFirm open={createModal} toggle={toggleCreate}/>
            <FilterFirms open={filter} toggle={handleFilter}/>
        </div>
    );
}