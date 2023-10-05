import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {http_auth} from "../../config/api.ts";
import {FileInitialProps} from "../../interface/redux/file.interface.ts";

export const uploadFileServer = createAsyncThunk('file/uploadFileServer', async (data: any, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/upload', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState: FileInitialProps = {
    loading: false,
}

const reducers = {}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(uploadFileServer.fulfilled, (state: FileInitialProps) => {
            state.loading = false
        })
        builder.addCase(uploadFileServer.pending, (state: FileInitialProps) => {
            state.loading = true
        })
        builder.addCase(uploadFileServer.rejected, (state: FileInitialProps) => {
            toast.error("File error")
            state.loading = false
        })
    }
})

export const {

} = fileSlice.actions;
export default fileSlice.reducer