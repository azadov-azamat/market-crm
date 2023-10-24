// import React from 'react';
import logo from '../../assets/logo.png'
import {LazyLoadImage} from "react-lazy-load-image-component";

export default function Spinner() {
    return (
        <div className={"w-full h-screen flex justify-center items-center bg-white"}>
            <LazyLoadImage
                effect={"black-and-white"}
                className={"w-44 md:w-56 animate-spin"}
                alt={"logo"}
                src={logo}
            />
        </div>
    );
}