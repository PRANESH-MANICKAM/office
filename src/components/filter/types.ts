export interface IFilterProps {
    isFilterEnable: (isFilter: boolean) => void;
}

export interface IInitialState {
    pokemonsList: any[];
    allPokemonsList: any[];
    pokemonSelectedId: null | number;
    pokemonData: null | any;
    isLoading: boolean;
    isLoadMoreInprogress: boolean;
    pokemonsTypes: any[];
    pokemonGenderList: any[];
}

export interface IPokemonContext {
    state: IInitialState;
    dispatch: React.Dispatch<any>;
    getPokemonData: (isReset?: boolean) => void;
    getPokemonDetailsListByUrl: (results: any[]) => Promise<any[]>;
    setAppLoading: (loading: boolean) => void;
}
