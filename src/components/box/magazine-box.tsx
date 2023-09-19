// import React from 'react';

import {Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface MagazineBoxProps {
    text: string,
    img: string
}

export default function MagazineBox(props: MagazineBoxProps) {
    const {text, img} = props

    return (
        <Card shadow color={"white"} className={'md:w-72 sm:w-64 w-60 md:h-72 sm:h-64 h-56 cursor-pointer   '}>
            <CardBody>
                <LazyLoadImage effect={"black-and-white"}
                               className={"w-full md:h-40 sm:h-36 h-28 object-cover"} alt={text}
                               src={img}
                />
                <Typography variant={"small"} className={"text-center font-bold text-lg mt-3"}>
                    {text}
                </Typography>
            </CardBody>
        </Card>
    );
}