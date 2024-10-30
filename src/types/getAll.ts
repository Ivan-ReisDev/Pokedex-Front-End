interface Pokemon {
    name: string;
    url: string;
  }
  
  interface PokemonEncounter {
    pokemon: Pokemon;
  }
  
  export interface EncounterGroup {
    name: string;
    pokemon_encounters: PokemonEncounter[];
  }
  
  export type IApiResponseAll = EncounterGroup[];