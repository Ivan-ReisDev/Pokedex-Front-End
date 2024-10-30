export interface IApiResponse {
    profile: Profile;
    type: TypeData;
}

interface Profile {
    abilities: AbilityData[];
    types: TypeSlot[];
    forms: Form[];
    stats: StatData[]; 
}

interface AbilityData {
    ability: NamedResource;
    isHidden: boolean;
}

interface NamedResource {
    name: string;
    url: string;
}

interface TypeSlot {
    slot: number;
    type: NamedResource;
}

interface Form {
    name: string;
    url: string;
}

interface StatData {
    base_stat: number; 
    effort: number;    
    stat: NamedResource; 
}

interface TypeData {
    damage_relations: DamageRelations;
}

interface DamageRelations {
    double_damage_from: NamedResource[]; 
    double_damage_to: NamedResource[];   
}
