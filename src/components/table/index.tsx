import {TableInterfaceProps} from "../../interface/table/table.interface"
import DataTable from 'react-data-table-component'
import qs from 'qs'
import {useLocation, useNavigate} from "react-router-dom"
import {BiChevronUp} from "react-icons/bi"
import CustomComponentPagination from "../../custom-pagination.tsx";
// import React from "react";

export default function TableComponent({
                                           ref,
                                           data,
                                           totalCount,
                                           currentPage,
                                           columns,
                                           totalPages,
                                           progressPending,
                                           size,
                                           limit,
                                           isPagination = true,
                                           selectableRows,
                                           onSelectedRowsChange,
                                           ...rest
                                       }: TableInterfaceProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    // const startIndex = (currentPage === 1 ? (currentPage - 1) : ((currentPage - 1) * limit)) + 1
    // const lastIndex = startIndex + (size - 1)


    // const currentItems = data.slice(startIndex, lastIndex);

    const handlePaginate = (page: number) => {
        navigate({
            search: qs.stringify({
                ...query,
                page: page || 0,
                limit: 10
            })
        })
    }

    const CustomPagination = () => (
        <div className='mt-2 flex items-center justify-between'>
            <CustomComponentPagination
                limit={limit}
                size={size}
                totalCount={totalCount}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePaginate={handlePaginate}
            />
            {/*<p className={"hidden md:flex"}>Ma`lumotlar {startIndex} dan {lastIndex} gacha, {totalCount} ta dan*/}
            {/*</p>*/}
            {/*<div>*/}
            {/*    <ReactPaginate*/}
            {/*        previousLabel={''}*/}
            {/*        nextLabel={''}*/}
            {/*        forcePage={currentPage - 1}*/}
            {/*        onPageChange={page => handlePaginate(page.selected)}*/}
            {/*        pageCount={totalPages}*/}
            {/*        breakLabel={'...'}*/}
            {/*        pageRangeDisplayed={2}*/}
            {/*        marginPagesDisplayed={2}*/}
            {/*        activeClassName='active bg-blue-400 text-white'*/}
            {/*        pageClassName='page-item border p-2 px-3 rounded-[50%]'*/}
            {/*        breakClassName='page-item'*/}
            {/*        nextLinkClassName='page-link'*/}
            {/*        pageLinkClassName='page-link'*/}
            {/*        breakLinkClassName='page-link'*/}
            {/*        previousLinkClassName='page-link'*/}
            {/*        nextClassName='page-item next-item'*/}
            {/*        previousClassName='page-item prev-item'*/}
            {/*        containerClassName={'pagination react-paginate separated-pagination flex gap-2 pagination-sm justify-start pe-1'}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    )

    return (
        <div className='react-dataTable'>
            <DataTable
                {...rest}
                noHeader
                actions={ref}
                data={data}
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