// import React from 'react';

import {Button, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {getMgId} from "../../config/servise.ts";

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className={"w-full h-[80vh] flex justify-center items-center"}>
            <div className="flex flex-col items-center gap-3">
                <Typography variant={"h4"}>
                    Oops! Not Found
                </Typography>
                <Button className={"normal-case"} onClick={() => navigate(`/seller/products/${getMgId()}`)}>Go Back</Button>
            </div>
        </div>
    );
}