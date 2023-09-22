import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dictionary} from "../../helpers/enumuration/dictionary";
import i18n from "i18next";
import {
    BasketsDataProps,
    DebtorDataProps,
    InitialStateProps,
    OrderDataProps
} from "../../interface/redux/variable.interface";

// export const login = createAsyncThunk('variables/login', async (data: authDataProps, {rejectWithValue}) => {
//     try {
//         const response = await http.post(`/auth/login`, data)
//         if (response.data === null) return rejectWithValue(response?.data)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error)
//     }
// })

const initialState: InitialStateProps = {
    lang: localStorage.getItem('i18nextLng') || 'ru',
    loading: false,
    userData: null,
    magazines: [
        {id: 1, name: "Qurilish do'koni", src: "https://ishu.uz/uploads/objects/3216/lg-4817b6-1920x1147.jpg"},
        {id: 2, name: "Maishiy texnika do'koni", src: "https://i.ytimg.com/vi/COXrvSGCeD4/maxresdefault.jpg"},
        {id: 3, name: "Oziq-ovqat do'koni", src: "https://www.gazeta.uz/media/img/2019/07/26Nvbk15632795931476_b.jpg"}
    ],
    products: [
        {
            id: 1,
            name: "Девид Николлс: Бир кун. Бир муҳаббат тарихи",
            price: 89000,
            count: 33,
            src: "https://assets.asaxiy.uz/product/items/desktop/830f94c696251a0d3f27e1e3d80db2752022060312004999754V1ODsFDnNF.jpg.webp",
            measure: "dona"

        },
        {
            id: 2,
            name: "Телевизор Moonx 43S800 Full HD Android TV",
            price: 49000,
            count: 2,
            src: "https://assets.asaxiy.uz/product/items/desktop/eea5369de0178e4d20e2756a7060d41d2023012922310923268UpQzTRhNBA.jpeg.webp",
            measure: "kg"

        },
        {
            id: 3,
            name: "Смарт часы Green Lion Ultra Active чёрный. ХИТ",
            price: 449000,
            count: 56.2,
            src: "https://assets.asaxiy.uz/product/items/desktop/03afdbd66e7929b125f8597834fa83a42023062311345416211AQjAgTedp4.jpg.webp",
            measure: "kg"

        },
        {
            id: 4,
            name: "Планшет для детей CCIT KT100 Pro 1Gb/8Gb",
            price: 15979000,
            count: 0,
            src: "https://assets.asaxiy.uz/product/items/desktop/5e15bdd3e1a68.jpeg.webp",
            measure: "litr"

        },
        {
            id: 5,
            name: "Беспроводная мышь T-Wolf Q4",
            price: 249000,
            count: 56.5,
            src: "https://assets.asaxiy.uz/product/items/desktop/c4ca4238a0b923820dcc509a6f75849b2022110316262130550KRisxVR7tC.jpg.webp",
            measure: "kg"

        }
    ],
    fltProduct: [],
    baskets: [],
    debtor: null,
    orders: []
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
        // @ts-ignore
        state.baskets.push(action.payload)
    },
    incrementBasket: (state: InitialStateProps, action: PayloadAction<number>) => {
        const baskets = state.baskets
        baskets[baskets.findIndex(item => item.id === action.payload)].amount += 1
    },
    decrementBasket: (state: InitialStateProps, action: PayloadAction<number>) => {
        const baskets = state.baskets
        const crnInd = baskets.findIndex(item => item.id === action.payload)
        baskets[crnInd].amount -= 1

        if (baskets[crnInd].amount <= 0) {
            state.baskets = baskets.filter(item => item.id !== baskets[crnInd].id)
        }
    },
    removeBasket: (state: InitialStateProps, action: PayloadAction<number>) => {
        state.baskets = state.baskets.filter(item => item.id !== action.payload)
    },
    setDiscountBasket: (state: InitialStateProps, action: PayloadAction<any>) => {
        const baskets = state.baskets
        const crnInd = baskets.findIndex(item => item.id === action.payload?.id)
        baskets[crnInd].discount = action.payload?.discount
    },
    setDebtorData: (state: InitialStateProps, action: PayloadAction<DebtorDataProps>) => {
        state.debtor = action.payload
    },
    setOrder: (state: InitialStateProps, action: PayloadAction<OrderDataProps>) => {
        // @ts-ignore
        state.orders.push(action.payload)
    },
    filterProduct: (state: InitialStateProps, action: PayloadAction<string>) => {
        const products = state.products
        if (action.payload.length === 0) {
            state.fltProduct = []
        } else {
            state.fltProduct = products.filter(item => item.name.match(action.payload))
                .concat(products.filter(item => item.price >= Number(action.payload)))
        }
    }
}

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers
})

export const {
    setLang, logoutFunc,
    setBasket, removeBasket,
    incrementBasket, decrementBasket,
    setDiscountBasket, setDebtorData,
    setOrder, filterProduct
} = variableSlice.actions;
export default variableSlice.reducer