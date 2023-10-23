import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {getDebtList} from '../../redux/reducers/variable'
import qs from "qs";
import {Card, CardBody, Typography} from '@material-tailwind/react';
import DateFormatClockComponent from '../../components/date-format/oclock';
import {formatter} from "../../config/servise.ts";
import {DebtorSidebar} from "../basket/debtor-sidebar.tsx";
import {BiPlus} from "react-icons/bi";

export default function DebtsList() {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {client, debts} = useAppSelector(state => state.variables)
    const [amount, setAmount] = React.useState<number>(0)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const [active, setActive] = React.useState<string>('active')
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)

    const toggleActive = (id: string) => {
        setActive(id)
        navigate({
            search: qs.stringify({
                filter: JSON.stringify({
                    clientId: client?.id,
                    debtStatus: id
                })
            })
        })
    }

    React.useEffect(() => {
        let num = 0
        debts.forEach(item => {
            num += item.debt
        })
        setAmount(num)
    }, [debts])

    // React.useEffect(() => {
    //     if (client) {
    //         navigate({
    //             search: qs.stringify({
    //                 filter: JSON.stringify({
    //                     clientId: client?.id,
    //                     debtStatus: "active"
    //                 })
    //             })
    //         })
    //     }
    // }, [client])

    React.useEffect(() => {
        if (location.search) {
            dispatch(getDebtList({...query}))
        } else {
            dispatch(getDebtList({
                filter: JSON.stringify({
                    clientId: client?.id,
                    debtStatus: "active"
                })
            }))
        }
    }, [location.search])

    React.useEffect(() => {
        return () => {
            dispatch({
                type: "debts/getDebtList/fulfilled",
                payload: {
                    data: []
                }
            })
        }
    }, [])

    return (
        <div className="w-full h-96 flex flex-col justify-between">
            <Card className='my-3'>
                <CardBody className='flex md:flex-row flex-col gap-8 justify-center text-center'>
                    <Typography onClick={() => toggleActive("active")} variant='paragraph'
                                className={`md:text-base cursor-pointer text-sm ${active === "active" && "border-b-2 border-black"}`}>Aktiv</Typography>
                    <Typography onClick={() => toggleActive("archive")} variant='paragraph'
                                className={`md:text-base cursor-pointer text-sm ${active === "archive" && "border-b-2 border-black"}`}>Arxiv</Typography>
                </CardBody>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {
                    debts.map((item, ind) => (
                        <Card key={ind}
                              className={item.debt > 0 ? "border-2 border-green-500" : "border-2 border-red-500"}>
                            <CardBody className='py-2 px-3 flex flex-col gap-2'>
                                <div className="flex md:flex-row flex-col">
                                    <Typography variant="small"
                                                className="text-base font-bold">Sana: &nbsp;</Typography>
                                    <Typography variant="small" className="text-base"> <DateFormatClockComponent
                                        currentDate={item?.createdAt}/></Typography>
                                </div>
                                <div className="flex md:flex-row flex-col">
                                    <Typography variant="small"
                                                className="text-base font-bold">Summa: &nbsp;</Typography>
                                    <Typography variant="small"
                                                className="text-base">{formatter.format(item?.debt)}</Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
            <div className="flex">
                <Card className='md:w-2/12 w-full relative'>
                    <CardBody className='py-2 px-3 flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <Typography variant="small" className="text-base font-bold">Jami: &nbsp;</Typography>
                            <div className="flex gap-4 items-center">
                                <Typography variant="small" className="text-base"> {formatter.format(amount)}</Typography>
                                {active !== 'archive' && <div className={"border border-black rounded p-1"}>
                                    <BiPlus onClick={toggleDebt}/>
                                </div>}
                            </div>
                        </div>
                    </CardBody>
                    {amount < 0 && <div
                        className="absolute -right-2 -top-1 bg-red-500 text-white px-1 py-0 rounded text-xs">Qarzdor</div>}
                </Card>
            </div>
            <DebtorSidebar totalPrice={100} open={isDebt} toggle={toggleDebt} debtUser={client}/>
        </div>
    )
}