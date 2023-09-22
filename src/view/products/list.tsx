// import React from 'react';

import ProductBox from "../../components/box/product-box.tsx";

export default function ProductList() {

    const productList = [
        {
            name: "Девид Николлс: Бир кун. Бир муҳаббат тарихи",
            price: 89000,
            count: 33,
            img: "https://assets.asaxiy.uz/product/items/desktop/830f94c696251a0d3f27e1e3d80db2752022060312004999754V1ODsFDnNF.jpg.webp",
            measure: "dona"

        },
        {
            name: "Телевизор Moonx 43S800 Full HD Android TV",
            price: 49000,
            count: 2,
            img: "https://assets.asaxiy.uz/product/items/desktop/eea5369de0178e4d20e2756a7060d41d2023012922310923268UpQzTRhNBA.jpeg.webp",
            measure: "kg"

        },
        {
            name: "Смарт часы Green Lion Ultra Active чёрный. ХИТ",
            price: 449000,
            count: 56.2,
            img: "https://assets.asaxiy.uz/product/items/desktop/03afdbd66e7929b125f8597834fa83a42023062311345416211AQjAgTedp4.jpg.webp",
            measure: "kg"

        },
        {
            name: "Планшет для детей CCIT KT100 Pro 1Gb/8Gb",
            price: 15979000,
            count: 0,
            img: "https://assets.asaxiy.uz/product/items/desktop/5e15bdd3e1a68.jpeg.webp",
            measure: "litr"

        },
        {
            name: "Беспроводная мышь T-Wolf Q4",
            price: 249000,
            count: 56.5,
            img: "https://assets.asaxiy.uz/product/items/desktop/c4ca4238a0b923820dcc509a6f75849b2022110316262130550KRisxVR7tC.jpg.webp",
            measure: "kg"

        }
    ]
    return (
        <div
            className={"product-list w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5"}>
            {
                productList.map((item, ind) =>
                    <ProductBox
                        key={ind}
                        text={item.name}
                        img={item.img}
                        id={ind}
                        price={item.price}
                        measure={item.measure}
                        count={item.count}
                    />
                )
            }
        </div>
    );
}