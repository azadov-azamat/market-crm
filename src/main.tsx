import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/scss/main.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

const LazyApp = React.lazy(() => import('./App.tsx'))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                // hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <ThemeProvider>
                <LazyApp/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(app)

