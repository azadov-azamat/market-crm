import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {http_auth} from "../../config/api.ts";
import {
    currencyDataProps,
    FirmCurrencyInterface,
    firmDataProps
} from "../../interface/redux/firm-currency.interface.ts";
import {UrlParamsDataProps} from "../../interface/search/search.interface.ts";

export const getFirms = createAsyncThunk('firmCurrency/getFirms', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/firms', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getFirmById = createAsyncThunk('firmCurrency/getFirmById', async (data: string, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/firms/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createFirm = createAsyncThunk('firmCurrency/createFirm', async (data: firmDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/firms', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteFirm = createAsyncThunk('firmCurrency/deleteFirm', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/firms/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const patchFirm = createAsyncThunk('firmCurrency/patchFirm', async (data: any, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/firms/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const getCurrencies = createAsyncThunk('firmCurrency/getCurrencies', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/currencies', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getCurrencyById = createAsyncThunk('firmCurrency/getCurrencyById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/currencies/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createCurrency = createAsyncThunk('firmCurrency/createCurrency', async (data: currencyDataProps, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/currencies', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteCurrency = createAsyncThunk('firmCurrency/deleteCurrency', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/currencies/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const patchCurrency = createAsyncThunk('firmCurrency/patchCurrency', async (data: any, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/currencies/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState: FirmCurrencyInterface = {
    firms: [],
    firm: null,
    currencies: [],
    currency: null,
    currentPage: 0,
    limit: 10,
    pageCount: 0,
    totalCount: 0,
    loading: false,
}

const reducers = {
    setFirm: (state: FirmCurrencyInterface, action: PayloadAction<firmDataProps | null>) => {
        state.firm = action.payload
    },
    setCurrency: (state: FirmCurrencyInterface, action: PayloadAction<currencyDataProps | null>) => {
        state.currency = action.payload
    }
}

export const firmCurrencySlice = createSlice({
    name: 'firmCurrency',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(getFirms.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.firms = action.payload?.data.reverse()
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.loading = false
        })
        builder.addCase(getFirms.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(getFirms.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })


        builder.addCase(getFirmById.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.firm = action.payload.data
            state.loading = false
        })
        builder.addCase(getFirmById.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(getFirmById.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })


        builder.addCase(createFirm.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.firms = [...state.firms, action.payload?.data].reverse()
            state.loading = false
        })
        builder.addCase(createFirm.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(createFirm.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })

        builder.addCase(deleteFirm.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.firms = state.firms.filter(item => item.id !== action?.meta?.arg)
            state.loading = false
        })
        builder.addCase(deleteFirm.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(deleteFirm.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })

        builder.addCase(patchFirm.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.firms[state.firms.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.loading = false
        })
        builder.addCase(patchFirm.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(patchFirm.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })


        builder.addCase(getCurrencies.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.currencies = action.payload?.data.reverse()
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.loading = false
        })
        builder.addCase(getCurrencies.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(getCurrencies.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })


        builder.addCase(getCurrencyById.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.currency = action.payload.data
            state.loading = false
        })
        builder.addCase(getCurrencyById.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(getCurrencyById.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })


        builder.addCase(createCurrency.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.currencies = [...state.currencies, action.payload?.data].reverse()
            state.loading = false
        })
        builder.addCase(createCurrency.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(createCurrency.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })

        builder.addCase(deleteCurrency.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.currencies = state.currencies.filter(item => item.id !== action?.meta?.arg)
            state.loading = false
        })
        builder.addCase(deleteCurrency.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(deleteCurrency.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })

        builder.addCase(patchCurrency.fulfilled, (state: FirmCurrencyInterface, action) => {
            state.currencies[state.currencies.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.loading = false
        })
        builder.addCase(patchCurrency.pending, (state: FirmCurrencyInterface) => {
            state.loading = true
        })
        builder.addCase(patchCurrency.rejected, (state: FirmCurrencyInterface) => {
            toast.error("File error")
            state.loading = false
        })
    }
})

export const {setFirm, setCurrency} = firmCurrencySlice.actions;
export default firmCurrencySlice.reducer