import { IPokemonSpecies } from "../../../interface/pokemon.interface";

export interface IDetailsHeaderProps {
    data: any;
    speciesData?: IPokemonSpecies;
    backClick: () => void;
    closeClick: () => void;
    forwordClick: () => void;
}
