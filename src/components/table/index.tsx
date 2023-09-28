import {TableInterfaceProps} from "../../interface/table/table.interface"
import DataTable from 'react-data-table-component'
import qs from 'qs'
import {useLocation, useNavigate} from "react-router-dom"
import ReactPaginate from 'react-paginate'
import {BiChevronUp} from "react-icons/bi"
import {useState} from "react"

export default function TableComponent({
                                           ref,
                                           data,
                                           totalCount,
                                           columns,
                                           totalPages,
                                           progressPending,
                                           size,
                                           isPagination = true,
                                           selectableRows,
                                           onSelectedRowsChange,
                                           ...rest
                                       }: TableInterfaceProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    const [currentPage, setCurrentPage] = useState<number>(1)

    const lastIndex = currentPage * (data.length < size ? data.length : size);
    const startIndex = (lastIndex < size ? size : lastIndex) - size;

    const currentItems = data.slice(startIndex, lastIndex);

    const handlePaginate = (page: number) => {
        setCurrentPage(page + 1)
        navigate({
            pathname: location.pathname,
            search: qs.stringify({
                ...query,
                page: page + 1 || undefined
            })
        })
    }

    const CustomPagination = () => (
        <div className='mt-2 flex items-center justify-between'>
            <p className={"hidden md:flex"}>Ma`lumotlar {startIndex + 1} dan {lastIndex} gacha, {totalCount} ta dan
            </p>
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
                    activeClassName='active bg-blue-400 text-white'
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
        </div>
    )

    return (
        <div className='react-dataTable'>
            <DataTable
                {...rest}
                noHeader
                actions={ref}
                data={currentItems}
                // onSort={handleSort}
                columns={columns}
                selectableRows={selectableRows}
                onSelectedRowsChange={onSelectedRowsChange}
                progressPending={progressPending}
                noDataComponent={"Ma`lumotlar topilmadi"}
                className='react-dataTable'
                sortIcon={<BiChevronUp width={10}/>}
                paginationPerPage={size}
                paginationDefaultPage={currentPage}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
            {
                isPagination && <CustomPagination/>
            }
        </div>
    );
}