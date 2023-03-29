import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import { lazy, Suspense } from "react";
import { MainPage } from '../pages'

import {  BrowserRouter as Router,Routes, Route } from "react-router-dom";

const ComicsPage = lazy(()=> import('../pages/comicsPages'));
const Page404 = lazy(()=>import('../pages/404'));
const SinglePage  = lazy(()=>import('../pages/SinglePage'));
const SingleComocLoyaut = lazy(()=>import('../pages/singleComicLayout/SingleComocLoyaut'));
const SingleCharLayout = lazy(()=>import('../pages/singleCharLayout/SingleCharLayout'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
            <main>
               <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComocLoyaut} type='comics'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharLayout} type='herois'/>}/>
                        <Route path="*" element={<Page404/>}/>               
                    </Routes>
               </Suspense>
            </main>
        </div>
        </Router>
       
    )
}

export default App;