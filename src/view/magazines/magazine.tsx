// import React from 'react';

import MagazineBox from "../../components/box/magazine-box.tsx";

export default function Magazine() {

    const magazinesList = [
        {text: "Qurilish do'koni", img: "https://ishu.uz/uploads/objects/3216/lg-4817b6-1920x1147.jpg"},
        {text: "Maishiy texnika do'koni", img: "https://i.ytimg.com/vi/COXrvSGCeD4/maxresdefault.jpg"},
        {text: "Oziq-ovqat do'koni", img: "https://www.gazeta.uz/media/img/2019/07/26Nvbk15632795931476_b.jpg"}
    ]
    return (
        <section className={"w-full h-screen flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10"}>
            {magazinesList.map((item, index) => <MagazineBox key={index} text={item.text} img={item.img}/>)}
        </section>
    );
}