// import React from 'react';

import MagazineBox from "../../components/box/magazine-box.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {StoresDataProps} from "../../interface/redux/variable.interface.ts";

export default function Magazine() {

    const {stores} = useAppSelector(state => state.variables)

    return (
        <section className={"w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mt-20"}>
            {stores.map((item: StoresDataProps, index) =>
                <MagazineBox
                    key={index}
                    id={item.id}
                    storeName={item.storeName}
                    storeImgUrl={item.storeImgUrl}
                />
            )}
        </section>
    );
}