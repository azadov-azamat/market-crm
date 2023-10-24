// import React from 'react';

import {Card, CardBody} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {StoresDataProps} from "../../interface/redux/variable.interface.ts";
import {noIMG} from "../../config/api.ts";
import DateFormatComponent from "../date-format";

export default function MagazineBox(props: StoresDataProps) {
    const {storeName, storeImgUrl, id, createdAt} = props
    const navigate = useNavigate()

    return (
        <Card shadow color={"white"} className={'md:w-72 sm:w-64 w-60 cursor-pointer border border-black'}
              onClick={() => {
                  navigate(`/seller/products/${id}`)
                  localStorage.setItem("mgId", String(id))
              }}>
            <CardBody className={"flex flex-col justify-center items-center"}>
                <LazyLoadImage effect={"blur"}
                               className={"w-full md:h-40 sm:h-36 h-28 object-cover"} alt={storeName}
                               src={storeImgUrl || noIMG}
                />
                <span className={"text-center font-bold text-lg mt-3"}>
                    {storeName}
                </span>
            </CardBody>
            <div className="w-full flex justify-end px-2 py-1 text-xs">
                <DateFormatComponent currentDate={createdAt}/>
            </div>
        </Card>
    );
}