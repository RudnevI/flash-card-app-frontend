import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfileList from "./components/profiles/ProfileList";
import CollectionList from "./components/collections/CollectionList";
import Options from "./components/Options";
import CardList from "./components/cards/CardList";
import Master from "./components/management/Master";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<App/>}>
                        <Route index element={<ProfileList/>}></Route>
                        <Route path="collections/:profileId" element={<CollectionList/>}></Route>
                        <Route path="options" element={<Options/>}></Route>
                        <Route path="collection/:collectionId" element={<CardList/>}></Route>
                        <Route path="manage" element={<Master/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
