
import ReactPaginate from 'react-paginate'
import {useLocation, useNavigate} from "react-router-dom"
import qs from 'qs'
import { Card, CardBody } from '@material-tailwind/react';

interface CustomPaginationDataProps{
    currentPage: number;
    size: number;
    totalPages: number;
    totalCount: number;
    limit: number;

}
export default function CustomPagination({currentPage, size, totalPages, limit, totalCount}: CustomPaginationDataProps){

    const navigate = useNavigate()
    const location = useLocation()

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const startIndex = (currentPage === 1 ? (currentPage - 1) : ((currentPage - 1) * limit))
    const lastIndex = startIndex + (size - 1)

    const handlePaginate = (page: number) => {
        navigate({
            search: qs.stringify({
                ...query,
                page: page + 1 || undefined
            })
        })
    }

   return (
        <Card className='mt-2'>
           <CardBody className="p-0 gap-4 flex items-center justify-between py-1">
           <p className={"hidden md:flex"}>Ma`lumotlar {startIndex + 1} dan {lastIndex + 1} gacha, {totalCount} ta dan
            </p>
            <p className={"flex md:hidden"}>{startIndex + 1}/{lastIndex + 1} - {totalCount}</p>
            <div>
                <ReactPaginate
                    previousLabel={''}
                    nextLabel={''}
                    forcePage={currentPage - 1}
                    onPageChange={page => handlePaginate(page.selected)}
                    pageCount={totalPages}
                    breakLabel={'...'}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    activeClassName='active bg-blue-500 text-white'
                    pageClassName='page-item border p-2 px-3 rounded-[50%]'
                    breakClassName='page-item'
                    nextLinkClassName='page-link'
                    pageLinkClassName='page-link'
                    breakLinkClassName='page-link'
                    previousLinkClassName='page-link'
                    nextClassName='page-item next-item'
                    previousClassName='page-item prev-item'
                    containerClassName={'pagination react-paginate separated-pagination flex gap-2 pagination-sm justify-start pe-1'}
                />
            </div>
           </CardBody>
        </Card>
    )
}