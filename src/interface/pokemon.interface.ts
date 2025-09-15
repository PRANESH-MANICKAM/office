export interface IPokemonList {
    id: number;
    name: string;
    url: string;
}

export interface IPokemonState {
    pokemonsList: IPokemonList[];
    allPokemonsList: any[];
    pokemonSelectedId: number | null;
    pokemonData: any;
    isLoading: boolean;
    isLoadMoreInprogress: boolean;
    pokemonsTypes: any[];
    pokemonGenderList: any[];
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IPokemonData {
    stats: any[];
    name: string;
    id: number;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        }
    }
}

export interface IPokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
    }[];
    evolution_chain: {
        url: string;
    };
    gender_rate: number;
    egg_groups: {
        name: string;
        url: string;
    }[];
}

export interface IPokemonType {
    damage_relations: any;
}

export interface IPokemonContext {
    state: IPokemonState;
    dispatch: React.Dispatch<IAction>;
    getPokemonData: (isReset?: boolean) => void;
    getPokemonDetailsListByUrl: (results: any[]) => Promise<any[]>;
    setAppLoading: (loading: boolean) => void;
}
