
export interface IPokemon {
    id: number;
    name: string;
    stats: any[];
    abilities: any[];
    types: any[];
    species: any;
    height: number;
    weight: number;
}

export interface IPokemonSpecies {
    egg_groups: any[];
    flavor_text_entries: any[];
}

export interface IPokemonType {
    damage_relations: {
        double_damage_from: any[];
    };
}
