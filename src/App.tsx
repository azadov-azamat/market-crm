// import React from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./config/constants.ts";
import Layout from "./layout/layout.tsx";
import './index.css'
import SignIn from "./view/login/sign-in.tsx";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<SignIn/>}/>
            {
                routes.map(route =>
                    <Route
                        key={route.id}
                        path={route.path}
                        element={
                            <Layout>
                                <route.component/>
                            </Layout>
                        }
                    />
                )
            }
        </Routes>
    )
}

export default App
