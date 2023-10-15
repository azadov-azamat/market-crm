import {LayoutProps} from "./layout.props";
import NavbarComponent from "../components/navbar";
import {getToken} from "../config/api.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect, useLayoutEffect} from "react";
import {useAppDispatch} from "../redux/hooks.ts";
import {getUserMe} from "../redux/reducers/variable.ts";
import {unwrapResult} from "@reduxjs/toolkit";

function Layout({children}: LayoutProps): JSX.Element {

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (getToken() === null) {
            toast.error("Avtorizatsiyasiz ruhsat etilmaydi!")
            navigate("/")
        }
    }, [navigate]);

    useLayoutEffect(() => {
        if (getToken() !== null && pathname !== "/seller/magazines") {
            dispatch(getUserMe()).then(unwrapResult)
                .catch(e => {
                    if (e.response.status === 401) {
                        toast.error("Avtorizatsiyasiz ruhsat etilmaydi!")
                        navigate("/")
                    }
                })
        }
    }, [pathname]);

    return (
        <div className={'flex w-full flex-col'}>
            <NavbarComponent/>
            <main
                className={'w-full transition-transform duration-500 md:px-8 sm:px-6 px-5 sm:py-8 py-5'}>{children}</main>
            {/*<Footer/>*/}
        </div>
    );
}

export default Layout;