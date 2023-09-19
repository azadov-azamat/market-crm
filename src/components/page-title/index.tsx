import {Typography} from "@material-tailwind/react";
// import React from "react";

interface PageTitleProps {
    title: string;
}

export default function PageTitle({title}: PageTitleProps) {
    return (
        <div className="w-full h-auto flex justify-center items-center border-b-2 border-white">
            <Typography
                variant="h2"
                className={"text-3xl font-bold"}
            >
                {title}
            </Typography>
        </div>
    );
}