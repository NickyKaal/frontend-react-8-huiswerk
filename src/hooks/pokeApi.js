import axios from "axios";
import React from "react";
import useSafeApiCall from "./useSafeApiCall.js";

export function useFetchPokemonIndexPage() {
    const [pageIndex, setPageIndex] = React.useState(1);
    const [pokemonIndexPage, setPokemonIndexPage] = React.useState([]);
    const [error, setError] = React.useState("");
    const [loaded, toggleLoaded] = React.useState(false);
    const [failed, toggleFailed] = React.useState(false);
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
            toggleLoaded(false);
            toggleFailed(false);

            const response =  await axios.get(
                `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_LIMIT}&offset=${pageIndex*PAGE_LIMIT}`,{
                    signal: controller.signal
                });


            setPokemonIndexPage(response.data.results);
        }
        catch(err){
            console.error(err);
            toggleFailed(true);
            setError("Oops.. Something went wrong");
            setPokemonIndexPage([]);
        }
        finally {
            toggleLoaded(true);
        }
    }

    useSafeApiCall(loadPageIndex);

    useSafeApiCall((controller)=>{
        if( pageIndex > 1){
            loadPageIndex(controller);
    }},[pageIndex]);


    return {pageIndex,pokemonIndexPage,error,loaded,failed,navigatePage}
}

export function useFetchPokemon(entry) {

    const [pokemon, setPokemon] = React.useState({}),
        [ failed, toggleFailed] = React.useState(false),
        [error , setError] = React.useState(""),
        [loaded, toggleLoaded] = React.useState(false);

    async function loadPokemon(controller){
        try{
            toggleLoaded(false);
            toggleFailed( false);
            setError( "");
            setPokemon({});

            const response =  await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${entry.name}`,{
                    signal: controller.signal
                });

            setPokemon(response.data);
        }
        catch(err){
            console.warn(err);
            toggleFailed( true);
            setError( "The pokemon ran away i gues...");
        }
        finally {
            toggleLoaded(true);
        }
    }

    useSafeApiCall(loadPokemon);

    return {pokemon,loaded,failed,error};
}