import BasketBox from "../../components/box/basket-box.tsx";

export default function Basket() {

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

        }
    ]

    return (
        <div className={"flex flex-col md:flex-row w-full h-auto"}>
            <div className="w-full xl:w-7/12 flex flex-col gap-5">
                {
                    productList.map(({name, img, price, measure, count}, ind) => (
                        <BasketBox
                            key={ind}
                            text={name}
                            img={img}
                            price={price}
                            measure={measure}
                            count={count}
                        />
                    ))
                }
            </div>
            <div className="w-full xl:w-5/12 border">

            </div>
        </div>
    );
}