export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonEncounter {
    pokemon: IPokemon;
}

export interface IRegion {
    name: string;
    pokemon_encounters: IPokemonEncounter[];
}