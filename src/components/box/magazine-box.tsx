// import React from 'react';

import {Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {StoresDataProps} from "../../interface/redux/variable.interface.ts";

export default function MagazineBox(props: StoresDataProps) {
    const {storeName, storeImgUrl, id} = props
    const navigate = useNavigate()

    return (
        <Card shadow color={"white"} className={'md:w-72 sm:w-64 w-60 md:h-72 sm:h-64 h-60 cursor-pointer'}
              onClick={() => {
                  navigate(`/seller/products/${id}`)
                  localStorage.setItem("mgId", String(id))
              }}>
            <CardBody className={"flex flex-col justify-center items-center"}>
                <LazyLoadImage effect={"black-and-white"}
                               className={"w-full md:h-40 sm:h-36 h-28 object-cover"} alt={storeName}
                               src={storeImgUrl}
                />
                <Typography variant={"small"} className={"text-center font-bold text-lg mt-3"}>
                    {storeName}
                </Typography>
            </CardBody>
        </Card>
    );
}