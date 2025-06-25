import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./PokemonTile.css";
import LoadingContent from "./LoadingContent.jsx";
import Oops from "./Oops.jsx";

function PokemonTile({entry}) {

    const [pokemon, setPokemon] = useState({loaded:false});

    async function loadPokemon(controller){
        try{
            const response =  await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${entry.name}`,{
                    signal: controller.signal
                });

            response.data.loaded=true;

            setPokemon(response.data);
        }
        catch(err){
            console.warn(err);
            setPokemon({failed:true, fail_msg:"The pokemon ran away i gues..."});
        }
    }

    useEffect(()=>{
        const controller = new AbortController();

        loadPokemon(controller);

        return function cleanup() {
            controller.abort();
        }
    },[])

    return (<div className="pokemon-tile">
                {pokemon.failed && <Oops msg={pokemon.fail_msg}/>}
                {pokemon.loaded === false && <LoadingContent/>}
                {pokemon.loaded && <>
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