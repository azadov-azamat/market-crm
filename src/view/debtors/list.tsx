import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getDebtList } from '../../redux/reducers/variable'
import qs from "qs";
import { Card, CardBody, Typography } from '@material-tailwind/react';
import DateFormatClockComponent from '../../components/date-format/oclock';

export default function DebtsList() {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
   
    const {client, debts} = useAppSelector(state => state.variables)
    const [amount, setAmount] = React.useState<number>(0)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    React.useEffect(()=>{
        let num = 0
        debts.forEach(item=> {
                num += item.debt
        })
        setAmount(num)
    }, [debts])

    React.useEffect(() => {
        if(client){
            navigate({
                search: qs.stringify({
                    filter: JSON.stringify({clientId: client?.id})
                })
            })
        }
    }, [client])

    React.useEffect(()=>{
        if (location.search) {
            dispatch(getDebtList({...query}))
        } else {
            dispatch(getDebtList({}))
        }
    }, [location.search])

    React.useEffect(()=>{
        return ()=>{
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {
                debts.map((item, ind) => (
                    <Card key={ind} className={item.debt > 0 ? "border-2 border-green-500" : "border-2 border-red-500"}>
                        <CardBody className='py-2 px-3 flex flex-col gap-2'>
                        <div className="flex md:flex-row flex-col">
                           <Typography variant="small" className="text-base font-bold">Sana: &nbsp;</Typography>
                           <Typography variant="small" className="text-base"> <DateFormatClockComponent currentDate={item?.createdAt}/></Typography>
                           </div>
                           <div className="flex md:flex-row flex-col">
                           <Typography variant="small" className="text-base font-bold">Summa: &nbsp;</Typography>
                           <Typography variant="small" className="text-base">{item?.debt} sum</Typography>
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
                           <Typography variant="small" className="text-base"> {amount} sum</Typography>
                           </div>
            </CardBody>
            {amount < 0 && <div className="absolute -right-2 -top-1 bg-red-500 text-white px-1 py-0 rounded text-xs">Qarzdor</div>}
        </Card>
        </div>
        </div>
    )
}