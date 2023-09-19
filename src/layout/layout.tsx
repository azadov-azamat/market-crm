import {LayoutProps} from "./layout.props";
import NavbarComponent from "../components/navbar";

function Layout({children}: LayoutProps): JSX.Element {

    return (
        <div className={'flex w-full flex-col'}>
            <NavbarComponent/>
            <main
                className={'w-full bg-[#EEEEEE] transition-transform duration-500'}>{children}</main>
            {/*<Footer/>*/}
        </div>
    );
}

export default Layout;