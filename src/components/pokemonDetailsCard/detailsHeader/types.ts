import { IPokemon, IPokemonSpecies } from "../../../interface/pokemon.interface";

export interface IDetailsHeaderProps {
    data: IPokemon;
    speciesData: IPokemonSpecies;
    backClick: () => void;
    closeClick: () => void;
    forwordClick: () => void;
}
