import React, {useEffect} from 'react';
import axios from "axios";
import PokemonTile from "./PokemonTile.jsx";
import "./DataBrowser.css";
import LoadingContent from "./LoadingContent.jsx";
import Oops from "./Oops.jsx";
import * as pokeApi from "../hooks/pokeApi.js";

function DataBrowser() {

    const {pokemonIndexPage,error,loaded,failed, navigatePage} = pokeApi.useFetchPokemonIndexPage();

    return (
        <div className="data-browser">
            <div className="buttons-container">
                <button type="button"  onClick={() => navigatePage(-1)}>Vorige</button>
                <button type="button"  onClick={() => navigatePage(1)}>Volgende</button>
            </div>

            {failed && <Oops msg={error}/>}
            <div className="result-pane">
                {loaded === false && <LoadingContent/>}
                {loaded && failed === false &&  pokemonIndexPage.map((entry)=><PokemonTile key={entry.name} entry={entry}/> )}
            </div>
        </div>
    );
}

export default DataBrowser;