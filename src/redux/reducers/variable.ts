import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dictionary} from "../../helpers/enumuration/dictionary";
import i18n from "i18next";
import {InitialStateProps} from "../../interface/redux/variable.interface";

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
    userData: null
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
    }
}

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers
})

export const {
    setLang, logoutFunc
} = variableSlice.actions;
export default variableSlice.reducer