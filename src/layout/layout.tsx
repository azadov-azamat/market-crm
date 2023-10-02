import {LayoutProps} from "./layout.props";
import NavbarComponent from "../components/navbar";
import {TOKEN} from "../config/api.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";

function Layout({children}: LayoutProps): JSX.Element {

    const navigate = useNavigate()

    const token = localStorage.getItem(TOKEN) || null

    useEffect(() => {
        if (token === null) {
            toast.error("Avtorizatsiyasiz ruhsat etilmaydi!")
            navigate("/")
        }
    }, [token]);

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