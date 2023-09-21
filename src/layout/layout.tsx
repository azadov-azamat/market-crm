import {LayoutProps} from "./layout.props";
import NavbarComponent from "../components/navbar";

function Layout({children}: LayoutProps): JSX.Element {

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