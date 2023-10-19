
import ReactPaginate from 'react-paginate'
import {useLocation} from "react-router-dom"
import qs from 'qs'
import { Card, CardBody } from '@material-tailwind/react';
import { useAppDispatch } from "./redux/hooks";
import { getProducts } from "./redux/reducers/variable";

interface CustomPaginationDataProps{
    currentPage: number;
    size: number;
    totalPages: number;
    totalCount: number;
    limit: number;

}
export default function CustomPagination({currentPage, size, totalPages, limit, totalCount}: CustomPaginationDataProps){

    const dispatch = useAppDispatch()
    const location = useLocation()

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const startIndex = (currentPage === 1 ? (currentPage - 1) : ((currentPage - 1) * limit)) + 1
    const lastIndex = startIndex + (size - 1)

    const handlePaginate = (page: number) => {
        dispatch(getProducts({
                ...query,
                limit: 10,
                page: page + 1 || undefined
        }))
    }

   return (
        <Card className='mt-2'>
           <CardBody className="p-0 gap-4 flex items-center justify-between py-2 px-3">
           <p className={"hidden md:flex"}>Ma`lumotlar {startIndex} dan {lastIndex} gacha, {totalCount} ta dan
            </p>
            <p className={"flex md:hidden"}>{startIndex}/{lastIndex} - {totalCount}</p>
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