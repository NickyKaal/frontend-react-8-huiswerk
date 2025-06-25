import React, {useEffect} from 'react';
import axios from "axios";
import PokemonTile from "./PokemonTile.jsx";
import "./DataBrowser.css";
import LoadingContent from "./LoadingContent.jsx";
import Oops from "./Oops.jsx";

function DataBrowser() {
    const [pageIndex, setPageIndex] = React.useState(1);
    const [pokemonIndexPage, setPokemonIndexPage] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState("");
    const PAGE_LIMIT = 20;

    function navigatePage(offset){

        if( offset < 0 && pageIndex <= 1 ){
            console.warn("cant navigate, already on first page");
        }
        else {

            setPageIndex(pageIndex + offset);
        }
    }

    async function loadPageIndex(controller){
        try{
            const response =  await axios.get(
                `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_LIMIT}&offset=${pageIndex*PAGE_LIMIT}`,{
                    signal: controller.signal
                });

            setPokemonIndexPage(response.data.results);
        }
        catch(err){
            console.error(err);
            setErrorMsg("Oops.. Something went wrong");
            setPokemonIndexPage([]);
        }
    }

    useEffect(()=>{
        const controller = new AbortController();

        loadPageIndex(controller);

        return function cleanup() {

            controller.abort();
        }
    },[]);

    useEffect(()=>{
        setErrorMsg("");

        const controller = new AbortController();

        if( pageIndex > 1) {
            loadPageIndex(controller);
        }

        return function cleanup() {

            controller.abort();
        }
    },[pageIndex]);

    return (
        <div className="data-browser">
            <div className="buttons-container">
                <button type="button"  onClick={() => navigatePage(-1)}>Vorige</button>
                <button type="button"  onClick={() => navigatePage(1)}>Volgende</button>
            </div>

            {errorMsg.length > 0 && <Oops msg={errorMsg}/>}
            <div className="result-pane">
                {errorMsg.length === 0 && pokemonIndexPage.length === 0 && <LoadingContent/>}
                {pokemonIndexPage.length  > 0 &&  pokemonIndexPage.map((entry)=><PokemonTile key={entry.name} entry={entry}/> )}
            </div>
        </div>
    );
}

export default DataBrowser;