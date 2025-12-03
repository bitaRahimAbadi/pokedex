'use client';
import { Pokemon } from "../utils/types";
import PokemonList from "./pokemon-list";
import SearchInput from "./search-input";
import React from "react";

export default function PokemonWrapper ({pokemons : initialPokemons}: {pokemons: Pokemon[]}) {
   const [filteredPokemons, setFilteredPokemons] = React.useState<Pokemon[]>(initialPokemons);

   const handleSearch = (search: string) => {
      const filtered = initialPokemons.filter(pokemon => 
         pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(filtered);
   }

   return(<>
         <SearchInput onSearch={handleSearch}/>
         <PokemonList pokemons={filteredPokemons} />
      </>);
}