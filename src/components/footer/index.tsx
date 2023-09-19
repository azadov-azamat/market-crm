// import React from 'react';

import {BsGithub, BsInstagram, BsTelegram} from "react-icons/bs";

export default function Footer() {

    return (
        <footer className={"flex justify-between border-t w-full p-4"}>
            <div className="">
                ©2023 - A.A Zafar o'g'li
            </div>
            <div className="flex gap-3">
                <a target={"_blank"} href="https://github.com/azadov-azamat">
                    <BsGithub className={"text-2xl text-black"}/>
                </a>
                <a target={"_blank"} href="https://t.me/azamat_azadov">
                    <BsTelegram className={"text-2xl text-blue-500"}/>
                </a>
                <a target={"_blank"} href="https://www.instagram.com/azadov_azamat/">
                    <BsInstagram className={"text-2xl text-red-400"}/>
                </a>

            </div>
        </footer>
    );
}