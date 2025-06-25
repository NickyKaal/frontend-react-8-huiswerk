import React from 'react';
import './MainBrowser.css';
import logo from '../assets/pokeapi_256.png';
import DataBrowser from "../components/DataBrowser.jsx";

function MainBrowser() {


    return (
        <main className="mainBrowser">
            <img src={logo}  alt="Pokemon logo" />
            <DataBrowser/>
        </main>
    );
}

export default MainBrowser;