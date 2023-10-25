import React, {useEffect, useLayoutEffect} from "react";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    Collapse,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography
} from "@material-tailwind/react";
import {BiChevronDown, BiSearch} from "react-icons/bi";
import {useLocation, useNavigate} from "react-router-dom";
import {SlBasket} from "react-icons/sl";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {LazyLoadImage} from "react-lazy-load-image-component";
import SearchModal from "./search-modal.tsx";
import {getProductsSearch, logoutFunc} from "../../redux/reducers/variable.ts";
import * as InputComponent from "../inputs";
import {formatter, getMgId, roundMath} from "../../config/servise.ts";
// import qs from "qs";
import {noIMG} from "../../config/api.ts";
import logo from "../../assets/logo/logo-name.png";

export default function NavbarComponent(): JSX.Element {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {baskets, fltProduct, userData} = useAppSelector(state => state.variables)
    const {nbu} = useAppSelector(state => state.firms)

    const [search, setSearch] = React.useState<string>("")
    const [isModal, setModal] = React.useState<boolean>(false)

    const toggleModal = () => setModal(!isModal)

    // @ts-ignore
    const dollarCur = parseInt(nbu.find(item => item.Ccy === "USD")?.Rate)

    const [profileMenuItems, setProfileMenuItems] = React.useState([
        {
            label: "Mening profilim",
            onClick: () => navigate('/seller/profile')
        }
    ]);

    useLayoutEffect(() => {
        if (!getMgId()) {
            const data = [
                {
                    label: "Chiqish",
                    onClick: () => {
                        dispatch(logoutFunc())
                        navigate('/')
                    }
                }
            ]
            setProfileMenuItems(data)
        } else if (location.pathname === '/seller/magazines') {
            const data = [
                {
                    label: "Mening profilim",
                    onClick: () => navigate('/seller/profile')
                },
                {
                    label: "Chiqish",
                    onClick: () => {
                        dispatch(logoutFunc())
                        navigate('/')
                    }
                }
            ]
            setProfileMenuItems(data)
        } else {
            const data = [
                {
                    label: "Mening profilim",
                    onClick: () => navigate('/seller/profile')
                },
                {
                    label: "Sotilganlar mahsulotlar",
                    onClick: () => navigate("/seller/sold-products")
                },
                {
                    label: "Mahsulot qo'shish",
                    onClick: () => navigate("/seller/add-product")
                },
                {
                    label: "Qarzdorlar",
                    onClick: () => navigate("/seller/debtors")
                },
                {
                    label: "Korxonalar",
                    onClick: () => navigate("/seller/firms")
                },
                {
                    label: "Chiqish",
                    onClick: () => {
                        dispatch(logoutFunc())
                        navigate('/')
                    }
                },
            ]
            setProfileMenuItems(data)
        }
    }, [location.pathname]);


    useEffect(() => {
        if (search.length >= 3) {
            dispatch(getProductsSearch({
                filter: JSON.stringify({
                    storeId: getMgId()
                }),
                search: search
            }))
        } else {
            dispatch({
                type: 'product/getProductsSearch/fulfilled',
                payload: {
                    data: []
                }
            })
        }
    }, [search]);

    function ProfileMenu() {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);

        return (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-black p-0.5"
                            src={userData?.sellerImgUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
                        />
                        <BiChevronDown
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    {profileMenuItems.map(({label, onClick}, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                                key={label}
                                onClick={onClick}
                                className={`flex items-center gap-2 rounded ${
                                    isLastItem
                                        ? "text-red hover:bg-red/10 focus:bg-red/10 active:bg-red/10"
                                        : ""
                                }`}
                            >
                                <Typography
                                    as="span"
                                    variant="small"
                                    className={isLastItem ? "text-red" : "text-black/80"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        );
    }

    return (
        <nav
            className={"w-full flex justify-between items-center sm:h-20 h-16 bg-white md:px-4 sm:px-2 px-1 py-1 border shadow-md"}>
            <LazyLoadImage effect={"black-and-white"}
                           className={"w-44 md:w-56 cursor-pointer"}
                           onClick={() => navigate("/seller/magazines")}
                           alt={"logo"}
                           src={logo}
            />
            {location.pathname !== "/seller/magazines" && <div className="relative w-4/12 hidden md:block">
                <InputComponent.Text value={search}
                                     name={"search-item"}
                                     placeholder={"Mahsulotlarni qidirish"}
                                     onChange={(e: {
                                         target: { value: string; };
                                     }) => setSearch(e.target.value)}
                                     label={""}/>
                <Collapse open={fltProduct.length !== 0} className={"absolute z-10"}>
                    <Card className="w-full mt-3">
                        <CardBody className={"m-0 p-2"}>
                            {
                                fltProduct.map((item, ind) =>
                                    <div key={ind} className={"flex my-2 border rounded px-3 py-2 cursor-pointer"}
                                         onClick={() => {
                                             navigate(`/seller/product/${item.id}`)
                                             setSearch("")
                                         }}
                                    >
                                        <div className="w-2/12 h-20">
                                            <LazyLoadImage effect={"black-and-white"}
                                                           className={"object-cover object-center h-20"}
                                                           alt={item.productName}
                                                           src={item.productImgUrl || noIMG}
                                            />
                                        </div>
                                        <div className="w-10/12 flex flex-col justify-between pl-3">
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>
                                                {item.productName}
                                            </Typography>
                                            <div className="w-full flex justify-between items-end">
                                                <div className="">
                                                    <Typography variant={"small"} className={"font-bold text-xs"}>
                                                        {formatter.format(roundMath(item.productPrice * dollarCur))}
                                                    </Typography>
                                                    <Typography variant={"small"} className={"font-bold text-xs"}>
                                                        Model: {item.productModel}
                                                    </Typography>
                                                </div>
                                                <Typography variant={"small"} className={"font-medium text-xs"}>
                                                    Miqdori: {item.productQuantity} {item.productMeasure}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </CardBody>
                    </Card>
                </Collapse>
            </div>}
            <div className={"flex md:gap-3 gap-2 items-center"}>
                {location.pathname !== "/seller/magazines" && <>
                    <div className="block md:hidden ">
                        <BiSearch className={'text-2xl cursor-pointer'} onClick={toggleModal}/>
                    </div>
                    {baskets.length !== 0 ?
                        <Badge content={baskets.length} overlap="circular" className={"text-xs bg-red cursor-pointer"}>
                            <div className="p-1 md:p-2" onClick={() => navigate("/seller/baskets")}>
                                <SlBasket className={'text-2xl cursor-pointer'}/> {/* === korzinka icon === */}
                            </div>
                        </Badge> :
                        <div className="p-1 md:p-2 cursor-pointer" onClick={() => navigate("/seller/baskets")}>
                            <SlBasket className={'text-2xl '}/> {/* === korzinka icon === */}
                        </div>}
                </>}
                <ProfileMenu/>
            </div>
            <SearchModal open={isModal} toggle={toggleModal}/>
        </nav>
    );
}