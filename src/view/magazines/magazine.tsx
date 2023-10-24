// import React from 'react';

import MagazineBox from "../../components/box/magazine-box.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {StoresDataProps} from "../../interface/redux/variable.interface.ts";
import React from "react";
import {getStores} from "../../redux/reducers/variable.ts";

export default function Magazine() {

    const dispatch = useAppDispatch()
    const {stores} = useAppSelector(state => state.variables)

    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    if (stores.length === 0) {
        return (
            <div>
                <div className={"w-full h-[80vh] flex justify-center items-center"}>
                    <div className="flex flex-col items-center gap-3 text-center">
                        <h4>
                            Do'kon mavjud emas
                        </h4>
                        <p>
                            Administrator bilan bog'laning, hozirda bironta ham do'kon ro'yhatga olinmagan!!!
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className={"w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 my-10 md:mt-20"}>
            {stores.map((item: StoresDataProps, index) =>
                <MagazineBox
                    key={index}
                    id={item.id}
                    storeName={item.storeName}
                    storeImgUrl={item.storeImgUrl}
                    createdAt={item.createdAt}
                />
            )}
        </section>
    );
}