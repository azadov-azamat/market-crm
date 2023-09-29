import {useAppSelector} from "../../redux/hooks.ts";
import TableComponent from "../../components/table";
import {TableColumn} from "react-data-table-component";
import {DebtorDataProps} from "../../interface/redux/variable.interface.ts";
import {BiPencil} from "react-icons/bi";
import PageTitle from "../../components/page-title";
import {Card, CardBody} from "@material-tailwind/react";
import {DebtorSidebar} from "../baket/debtor-sidebar.tsx";
import React from "react";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";

export default function Debtors() {

    const {debtors, stores} = useAppSelector(state => state.variables)

    const [userAmount, setUserAmount] = React.useState<DebtorDataProps | null>(null)
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)

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
            name: "Qarzdorlar ro'yhati",
            link: ``
        }
    ]

    const basicColumns: TableColumn<any>[] = [
        {
            name: 'F.I.O',
            width: '150px',
            wrap: true,
            selector: (row: DebtorDataProps) => row.name
        },
        {
            name: "Telefon raqami",
            width: '150px',
            wrap: true,
            selector: (row: DebtorDataProps) => row.phoneNumber
        },
        {
            name: 'Berilgan summa',
            width: '120px',
            wrap: true,
            selector: (row: DebtorDataProps) => row.givenSum
        },
        {
            name: 'Umumiy summa',
            wrap: true,
            width: '120px',
            selector: (row: DebtorDataProps) => row.paidSum
        },
        {
            name: 'Qaytarish sanasi',
            wrap: true,
            width: '150px',
            selector: (row: DebtorDataProps) => row.expDate
        },
        {
            name: 'Manzili',
            wrap: true,
            width: '150px',
            selector: (row: DebtorDataProps) => row.address
        },
        {
            name: 'Holat',
            width: '100px',
            cell: (row: DebtorDataProps) => (
                <div className={'flex gap-2'}>
                    <BiPencil width={30} className={"cursor-pointer text-orange-500 text-base"}
                              onClick={() => {
                                  setUserAmount(row)
                                  toggleDebt()
                              }}
                    />
                    {/*<BiTrash width={20} className={"cursor-pointer text-red-500 text-base"}/>*/}
                </div>
            )
        }
    ]

    const total_count = debtors.length;
    const count_item = 10

    return (
        <div>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <Card>
                <CardBody>
                    <TableComponent data={debtors}
                        // progressPending={isLoading}
                                    columns={basicColumns}
                                    progressPending={false}
                        // totalPages={Math.ceil(total_count / (!query ? 15 : query.count))}
                                    totalPages={Math.ceil(total_count / count_item)}
                                    size={count_item}
                                    totalCount={total_count}
                    />
                </CardBody>
            </Card>
            <DebtorSidebar open={isDebt} toggle={toggleDebt} currentUser={userAmount}
                           totalPrice={userAmount?.paidSum || 0}/>
        </div>
    );
}