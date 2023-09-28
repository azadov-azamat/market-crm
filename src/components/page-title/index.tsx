import {Typography} from "@material-tailwind/react";
// import React from "react";

interface PageTitleProps {
    title: string;
}

export default function PageTitle({title}: PageTitleProps) {
    return (
        <div className="w-full h-auto flex justify-center items-center border-b-2 mb-2 pb-2 border-white">
            <Typography
                variant="h2"
                className={"md:text-2xl  text-xl font-bold"}
            >
                {title}
            </Typography>
        </div>
    );
}