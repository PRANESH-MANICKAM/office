import { createContext } from "react";
import { IPokemonContext } from "../../interface/pokemon.interface";

const PokemonContext = createContext<IPokemonContext | null>(null);
export default PokemonContext;
