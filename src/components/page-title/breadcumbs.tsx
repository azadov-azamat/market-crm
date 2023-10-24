// import React from 'react';
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {Breadcrumbs} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

interface BreadcumbsComponentProps {
    data: BreadCumbsDataProps[]
}

export default function BreadcumbsComponent({data}: BreadcumbsComponentProps) {
    const navigate = useNavigate()
    return (
        <Breadcrumbs className={"px-0 bg-transparent"}>
            {
                data.map((item, ind) => {
                    const isLast = (data.length - 1) === ind

                    return (
                        <p key={ind} className={!isLast ? "opacity-60" : ""}
                           onClick={() => !isLast && navigate(item.link)}>
                            {item.name}
                        </p>
                    )
                })
            }
        </Breadcrumbs>
    );
}