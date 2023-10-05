import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dictionary} from "../../helpers/enumuration/dictionary";
import i18n from "i18next";
import {
    BasketsDataProps,
    ClientDataProps, DebtorDataProps,
    InitialStateProps,
    LoginDataProps,
    MixedPayDataProps,
    OrderDataProps,
    ProductsDataProps, SaleDataProps
} from "../../interface/redux/variable.interface";
import {toast} from "react-toastify";
import {getMgId} from "../../config/servise.ts";
import {http, http_auth, TOKEN} from "../../config/api.ts";
import {UrlParamsDataProps} from "../../interface/search/search.interface.ts";

export const login = createAsyncThunk('app/login', async (data: LoginDataProps) => {
    const response = await http.post('/auth', data)
    return response.data
})

export const getUserMe = createAsyncThunk('app/getUserMe', async (_, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/sellers/me')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createClient = createAsyncThunk('clients/createClient', async (data: ClientDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/clients', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getClients = createAsyncThunk('clients/getClients', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/clients', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const getStores = createAsyncThunk('store/getStores', async (_, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/stores')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createSale = createAsyncThunk('sale/createSale', async (data: SaleDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/sales', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getSales = createAsyncThunk('sale/getSales', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/sales', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getSaleById = createAsyncThunk('sale/getSaleById', async (data: string, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/sales/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const createDebt = createAsyncThunk('debts/createDebt', async (data: DebtorDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/debts', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createProduct = createAsyncThunk('product/createProduct', async (data: ProductsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/products', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProducts = createAsyncThunk('product/getProducts', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/products', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProductById = createAsyncThunk('product/getProductById', async (data: string, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/products/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProductsSearch = createAsyncThunk('product/getProductsSearch', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/products', {
            params: data
        })
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
    products: [],
    product: null,
    fltProduct: [],
    baskets: [],
    debtor: null,
    orders: [],
    mixedPay: [],
    adresses: [
        {id: 1, adressName: 'Turtkul'},
        {id: 2, adressName: 'Urganch'},
        {id: 3, adressName: "Ellikqal'a"}
    ],
    sales: [],
    sale: null,
    clients: [],
    client: null,

    currentPage: 0,
    pageCount: 0,
    limit: 0,
    totalCount: 0
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
    setListBasket: (state: InitialStateProps, action: PayloadAction<BasketsDataProps[] | []>) => {
        state.baskets = action.payload
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
    setDebtorData: (state: InitialStateProps, action: PayloadAction<ClientDataProps | null>) => {
        state.client = action.payload
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

        builder.addCase(getUserMe.fulfilled, (state: InitialStateProps, action) => {
            state.userData = action.payload?.data
            state.loading = false
        })
        builder.addCase(getUserMe.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getUserMe.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(getClients.fulfilled, (state: InitialStateProps, action) => {
            state.clients = action.payload.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.loading = false
        })
        builder.addCase(getClients.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getClients.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(getSales.fulfilled, (state: InitialStateProps, action) => {
            state.sales = action.payload.data
            state.loading = false
        })
        builder.addCase(getSales.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getSales.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(getSaleById.fulfilled, (state: InitialStateProps, action) => {
            state.sale = action.payload.data
            state.loading = false
        })
        builder.addCase(getSaleById.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getSaleById.rejected, (state: InitialStateProps) => {
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

        builder.addCase(getProductById.fulfilled, (state: InitialStateProps, action) => {
            state.product = action.payload.data
            state.loading = false
        })
        builder.addCase(getProductById.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getProductById.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(getProductsSearch.fulfilled, (state: InitialStateProps, action) => {
            state.fltProduct = action.payload.data
            state.loading = false
        })
        builder.addCase(getProductsSearch.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getProductsSearch.rejected, (state: InitialStateProps) => {
            state.loading = false
        })

        builder.addCase(createProduct.fulfilled, (state: InitialStateProps, action) => {
            addProduct(action.payload.data)
            state.loading = false
        })
        builder.addCase(createProduct.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(createProduct.rejected, (state: InitialStateProps) => {
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
    setMixedPayList, addProduct,
    setListBasket
} = variableSlice.actions;
export default variableSlice.reducer