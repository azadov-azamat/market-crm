// import React from 'react';

import {Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {MagazinesDataProps} from "../../interface/redux/variable.interface.ts";

export default function MagazineBox(props: MagazinesDataProps) {
    const {name, src, id} = props
    const navigate = useNavigate()

    return (
        <Card shadow color={"white"} className={'md:w-72 sm:w-64 w-60 md:h-72 sm:h-64 h-60 cursor-pointer'}
              onClick={() => navigate(`/seller/products/${id}`)}>
            <CardBody>
                <LazyLoadImage effect={"black-and-white"}
                               className={"w-full md:h-40 sm:h-36 h-28 object-cover"} alt={name}
                               src={src}
                />
                <Typography variant={"small"} className={"text-center font-bold text-lg mt-3"}>
                    {name}
                </Typography>
            </CardBody>
        </Card>
    );
}