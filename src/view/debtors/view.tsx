import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {BreadCumbsDataProps} from '../../interface/modal/modal.interface'
import {formatter, getMgId, handleSwitchPayType} from '../../config/servise'
import {getClientById, getStores} from '../../redux/reducers/variable'
import BreadcumbsComponent from '../../components/page-title/breadcumbs'
import {Card, CardBody, Typography} from '@material-tailwind/react'
import SoldProducts from '../sales/sold'
import DebtsList from './list'
import {MixedPayDataProps} from '../../interface/redux/variable.interface'
import DateFormatClockComponent from '../../components/date-format/oclock'

export default function ViewDebtor() {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {stores, client} = useAppSelector(state => state.variables)
    const [active, setActive] = React.useState<string>('1')

    const toggleActive = (id: string) => {
        setActive(id)
        navigate({
            search: ""
        })
    }

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
            name: "Qarzdorlar",
            link: `/seller/debtors`
        },
        {
            name: String(client?.clientName),
            link: ``
        }
    ]

    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    React.useEffect(() => {
        dispatch(getClientById(String(id)))

        return () => {
            dispatch({
                type: "clients/getClientById/fulfilled",
                payload: {
                    data: null
                }
            })
        }
    }, [id])

    return (
        <div className={"flex flex-col gap-2"}>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <Card className='my-3'>
                <CardBody className='flex md:flex-row flex-col gap-8 justify-center text-center'>
                    <Typography onClick={() => toggleActive("1")} variant='paragraph'
                                className={`md:text-base cursor-pointer text-sm ${active === "1" && "border-b-2 border-black"}`}>Savdo
                        bo'limi</Typography>
                    <Typography onClick={() => toggleActive("2")} variant='paragraph'
                                className={`md:text-base cursor-pointer text-sm ${active === "2" && "border-b-2 border-black"}`}>Qarzlar
                        bo'limi</Typography>
                    <Typography onClick={() => toggleActive("3")} variant='paragraph'
                                className={`md:text-base cursor-pointer text-sm ${active === "3" && "border-b-2 border-black"}`}>To'lovlar
                        bo'limi</Typography>
                </CardBody>
            </Card>

            {active === "1" && <SoldProducts/>}

            {active === "2" && <DebtsList/>}

            {active === "3" && <PaymentComponent payments={client?.payments || []}/>}
        </div>
    )
}

interface PaymentComponentDataProps {
    payments: MixedPayDataProps[] | []
}

const PaymentComponent = ({payments}: PaymentComponentDataProps) => {
    return (
        <div className="">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
                {
                    payments.map((item, ind) => (
                        <Card key={ind}>
                            <CardBody className='py-2 px-3 flex flex-col gap-1'>
                                <div className="flex md:flex-row flex-col">
                                    <Typography variant="small" className="text-base font-bold">O'tkazilgan
                                        narx: &nbsp;</Typography>
                                    <Typography variant="small"
                                                className="md:text-base text-sm">{formatter.format(item?.paymentAmount)}</Typography>
                                </div>
                                <div className="flex md:flex-row flex-col">
                                    <Typography variant="small" className="text-base font-bold">To'lov
                                        turi: &nbsp;</Typography>
                                    <Typography variant="small"
                                                className="md:text-base text-sm">{handleSwitchPayType(item?.paymentType)}</Typography>
                                </div>
                                <div className="flex md:flex-row flex-col">
                                    <Typography variant="small" className="text-base font-bold">To'lov
                                        sanasi: &nbsp;</Typography>
                                    <Typography variant="small" className="md:text-base text-sm">
                                        <DateFormatClockComponent currentDate={item?.createdAt}/></Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}