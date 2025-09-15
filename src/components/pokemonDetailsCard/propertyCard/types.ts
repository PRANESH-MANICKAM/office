import { IPokemon, IPokemonSpecies, IPokemonType } from "../../../interface/pokemon.interface";

export interface IPropertyCardProps {
    speciesData: IPokemonSpecies;
    data: IPokemon;
    pokemonTypeData: IPokemonType;
}
