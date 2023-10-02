import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dictionary} from "../../helpers/enumuration/dictionary";
import i18n from "i18next";
import {
    BasketsDataProps,
    DebtorDataProps,
    InitialStateProps, LoginDataProps,
    MixedPayDataProps,
    OrderDataProps, ProductsDataProps
} from "../../interface/redux/variable.interface";
import {toast} from "react-toastify";
import {getMgId} from "../../config/servise.ts";
import {http, http_auth, TOKEN} from "../../config/api.ts";

export const login = createAsyncThunk('app/login', async (data: LoginDataProps) => {
    const response = await http.post('/auth', data)
    return response.data
})

export const getStores = createAsyncThunk('store/getStores', async (_, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/stores')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProducts = createAsyncThunk('product/getProducts', async (_, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/products')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const initialState: InitialStateProps = {
    lang: localStorage.getItem('i18nextLng') || 'ru',
    loading: false,
    userData: null,
    stores: [],
    // products: [
    //     {
    //         id: 1,
    //         storeId: 1,
    //         adressId: 1,
    //         productName: "Девид Николлс: Бир кун. Бир муҳаббат тарихи",
    //         productPrice: 89000,
    //         productQuantity: 33,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/830f94c696251a0d3f27e1e3d80db2752022060312004999754V1ODsFDnNF.jpg.webp",
    //         productMeasure: "dona"
    //
    //     },
    //     {
    //         id: 2,
    //         storeId: 1,
    //         adressId: 1,
    //         productName: "Телевизор Moonx 43S800 Full HD Android TV",
    //         productPrice: 49000,
    //         productQuantity: 2,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/eea5369de0178e4d20e2756a7060d41d2023012922310923268UpQzTRhNBA.jpeg.webp",
    //         productMeasure: "kg"
    //
    //     },
    //     {
    //         id: 3,
    //         storeId: 2,
    //         adressId: 2,
    //         productName: "Смарт часы Green Lion Ultra Active чёрный. ХИТ",
    //         productPrice: 449000,
    //         productQuantity: 31.2,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/c4ca4238a0b923820dcc509a6f75849b2022110316262130550KRisxVR7tC.jpg.webp",
    //         productMeasure: "kg"
    //
    //     },
    //     {
    //         id: 4,
    //         storeId: 2,
    //         adressId: 2,
    //         productName: "Планшет для детей CCIT KT100 Pro 1Gb/8Gb",
    //         productPrice: 15979000,
    //         productQuantity: 0,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/5e15bdd3e1a68.jpeg.webp",
    //         productMeasure: "dona"
    //
    //     },
    //     {
    //         id: 5,
    //         storeId: 3,
    //         adressId: 3,
    //         productName: "Беспроводная мышь T-Wolf Q4",
    //         productPrice: 249000,
    //         productQuantity: 56.5,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/c4ca4238a0b923820dcc509a6f75849b2022110316262130550KRisxVR7tC.jpg.webp",
    //         productMeasure: "litr"
    //
    //     },
    //     {
    //         id: 6,
    //         storeId: 3,
    //         adressId: 3,
    //         productName: "Беспроводная мышь T-Wolf Q4",
    //         productPrice: 249000,
    //         productQuantity: 23.2,
    //         productImgUrl: "https://assets.asaxiy.uz/product/items/desktop/eea5369de0178e4d20e2756a7060d41d2023012922310923268UpQzTRhNBA.jpeg.webp",
    //         productMeasure: "kg"
    //
    //     }
    // ],
    products: [],
    fltProduct: [],
    baskets: [],
    debtor: null,
    orders: [],
    mixedPay: [],
    debtors: [
        {
            name: "Azamat Azadov",
            phoneNumber: "+998932052443",
            payType: "naqd",
            paidSum: 89000,
            givenSum: 30000,
            expDate: "20/01/2024",
            address: "Yangi Obof MFY"
        },
        {
            name: "Ivan Ivanov",
            phoneNumber: "+998932052443",
            payType: "transfer",
            paidSum: 200000,
            givenSum: 50000,
            expDate: "20/01/2024",
            address: "Yangi Obof MFY"
        },
        {
            name: "Andrey Malaxov",
            phoneNumber: "+998932052443",
            payType: "terminal",
            paidSum: 1500000,
            givenSum: 100000,
            expDate: "20/01/2024",
            address: "Yangi Obof MFY"
        }
    ],
    adresses: [
        {id: 1, adressName: 'Turtkul'},
        {id: 2, adressName: 'Urganch'},
        {id: 3, adressName: "Ellikqal'a"}
    ],
    sales: []
}

const reducers = {
    setLang: (state: InitialStateProps, action: PayloadAction<number>) => {
        const langIndex = action.payload
        state.lang = Dictionary[langIndex]
        i18n.changeLanguage(Dictionary[langIndex])
    },
    logoutFunc: (state: InitialStateProps) => {
        state.userData = null
        localStorage.clear()
    },
    setBasket: (state: InitialStateProps, action: PayloadAction<BasketsDataProps>) => {
        state.baskets = [...state.baskets, action.payload]
    },
    incrementBasket: (state: InitialStateProps, action: PayloadAction<any>) => {
        const baskets = state.baskets
        baskets[baskets.findIndex(item => item.id === Number(action.payload?.id))].amount = String(action.payload?.amount)
    },
    removeBasket: (state: InitialStateProps, action: PayloadAction<number>) => {
        state.baskets = state.baskets.filter(item => item.id !== action.payload)
    },
    setDiscountBasket: (state: InitialStateProps, action: PayloadAction<any>) => {
        const baskets = state.baskets
        const crnInd = baskets.findIndex(item => item.id === Number(action.payload?.id))
        baskets[crnInd].discount = Number(action.payload?.discount) || 0
    },
    setDebtorData: (state: InitialStateProps, action: PayloadAction<DebtorDataProps>) => {
        state.debtor = action.payload
    },
    setOrder: (state: InitialStateProps, action: PayloadAction<OrderDataProps>) => {
        state.orders = [...state.orders, action.payload]
    },
    filterProduct: (state: InitialStateProps, action: PayloadAction<string>) => {
        const products = state.products
        if (action.payload.length === 0) {
            state.fltProduct = []
        } else {
            state.fltProduct = products.filter(item => item.storeId === Number(getMgId() || 1))
                .filter(item => item.productName.match(action.payload))
                .concat(products.filter(item => item.productPrice >= Number(action.payload)))
        }
    },
    setMixedPayList: (state: InitialStateProps, action: PayloadAction<MixedPayDataProps[]>) => {
        state.mixedPay = action.payload
    },
    addProduct: (state: InitialStateProps, action: PayloadAction<ProductsDataProps>) => {
        state.products = [...state.products, action.payload]
        toast.success("Mahsulot qo'shildi")
    }
}

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state: InitialStateProps, action) => {
            state.userData = action.payload?.data?.seller
            localStorage.setItem(TOKEN, action.payload.data?.token)
            state.loading = false
        })
        builder.addCase(login.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(login.rejected, (state: InitialStateProps) => {
            toast.error("Login yoki parol noto'g'ri! iltimos qayta urinib ko'ting")
            state.loading = false
        })

        builder.addCase(getStores.fulfilled, (state: InitialStateProps, action) => {
            state.stores = action.payload.data
            state.loading = false
        })
        builder.addCase(getStores.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getStores.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(getProducts.fulfilled, (state: InitialStateProps, action) => {
            state.products = action.payload.data
            state.loading = false
        })
        builder.addCase(getProducts.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getProducts.rejected, (state: InitialStateProps) => {
            state.loading = false
        })
    }
})

export const {
    setLang, logoutFunc,
    setBasket, removeBasket,
    incrementBasket,
    // decrementBasket,
    setDiscountBasket, setDebtorData,
    setOrder, filterProduct,
    setMixedPayList, addProduct
} = variableSlice.actions;
export default variableSlice.reducer