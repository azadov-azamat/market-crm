// import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";

const app = (
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
)
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(app)

