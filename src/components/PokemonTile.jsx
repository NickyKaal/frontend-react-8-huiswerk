import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./PokemonTile.css";
import LoadingContent from "./LoadingContent.jsx";
import Oops from "./Oops.jsx";
import * as pokeApi from "../hooks/pokeApi.js";

function PokemonTile({entry}) {

    const {pokemon, loaded, failed, error} = pokeApi.useFetchPokemon(entry);


    return (<div className="pokemon-tile">
                {failed && <Oops msg={error}/>}
                {loaded === false && <LoadingContent/>}
                {loaded && failed === false && <>
                    <h2>{pokemon.name}</h2>
                    <img className="pokemon-image" src={pokemon?.sprites?.front_default} alt={`Pokemon image of ${pokemon?.name}`} />
                    <p className="pokemon-details">Moves:<span>{pokemon.moves.length}</span></p>
                    <p className="pokemon-details">Weight:<span>{pokemon.weight}</span></p>
                    <p className="pokemon-details">Abilities:</p>
                    {pokemon.abilities.map(({ability}) => <div className="pokemon-ability" key={ability.name}>{ability.name}</div>)}
                </>}
            </div>
    );
}

export default PokemonTile;