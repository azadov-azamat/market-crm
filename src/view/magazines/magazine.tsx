// import React from 'react';

import MagazineBox from "../../components/box/magazine-box.tsx";

export default function Magazine() {

    const magazinesList = [
        {id: 1, text: "Qurilish do'koni", img: "https://ishu.uz/uploads/objects/3216/lg-4817b6-1920x1147.jpg"},
        {id: 2, text: "Maishiy texnika do'koni", img: "https://i.ytimg.com/vi/COXrvSGCeD4/maxresdefault.jpg"},
        {id: 3, text: "Oziq-ovqat do'koni", img: "https://www.gazeta.uz/media/img/2019/07/26Nvbk15632795931476_b.jpg"}
    ]
    return (
        <section className={"w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mt-20"}>
            {magazinesList.map((item, index) => <MagazineBox key={index} id={item.id} text={item.text} img={item.img}/>)}
        </section>
    );
}