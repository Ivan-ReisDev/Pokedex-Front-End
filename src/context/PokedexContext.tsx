import { createContext, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../provider/axiosInstance';
import { IResults } from '../types/RegionInterface';
import { IRegion } from '../types/PokemonsRegion';
import { IApiResponse } from '../types/ProfilePokemon';
import { IApiResponseAll } from '../types/getAll';

interface IPokedexContext {
    getRegion: () => Promise<IResults | null | undefined>;
    setRegion: (region: string) => void;
    getProfilePokemon: (pokemon: string) => Promise<IApiResponse | null | undefined>;
    getPokemonsRegion: (region: string) => Promise<IRegion | null | undefined>;
    getAllPokemons: () => Promise<IApiResponseAll | null>;
    region: string;
}

const PokedexContext = createContext<IPokedexContext | undefined>(undefined);

interface PokedexProviderProps {
    children: ReactNode;
}

const PokedexProvider: React.FC<PokedexProviderProps> = ({ children }) => {

    const [region, setRegion] = useState<string>("");
    const getRegion = async (): Promise<IResults | null | undefined> => {
        try {
            const response = await axiosInstance.get("/region");
            if (response.status === 200) {
                const res: IResults = response.data;
                return res;
            }
            return null;
        } catch (error) {
            console.error("Error fetching region:", error);
            return null; 
        }
    };

    const getPokemonsRegion = async (region: string): Promise<IRegion | null | undefined> => {
        try {
            const response = await axiosInstance.get(`/pokemons/${region}`);
            if (response.status === 200) {
                const res: IRegion = response.data;
                return res;
            }
            return null;
        } catch (error) {
            console.error("Error fetching region:", error);
            return null; 
        }
    };

    const getProfilePokemon = async (pokemon: string): Promise<IApiResponse | null | undefined> => {
        try {
            const response = await axiosInstance.get(`/pokemon/${pokemon}`);
            if (response.status === 200) {
                const res: IApiResponse = response.data;
                return res;
            }
            return null;
        } catch (error) {
            console.error("Error fetching region:", error);
            return null; 
        }
    };

    const getAllPokemons = async (): Promise<IApiResponseAll | null> => {
        try {
            const newResponse: IApiResponseAll = []; 
            const regionsData = await getRegion();
    
            if (regionsData && regionsData.results) {
                
                const promises = regionsData.results.map(async (region) => {
                    try {
                        const result = await getPokemonsRegion(region.name);
                       
                        if (Array.isArray(result)) {
                            newResponse.push(...result); 
                        }
                        return result; 
                    } catch (error) {
                        console.error(`Error fetching pokemons for region ${region.name}:`, error);
                        return null; 
                    }
                });
    
                await Promise.all(promises);
            }
    
            return newResponse.length > 0 ? newResponse : null; 
    
        } catch (error) {
            console.error("Error fetching region:", error);
            return null; 
        }
    };
    
    
    
    return (
        <PokedexContext.Provider value={{ 
            getRegion,
            region,
            setRegion,
            getPokemonsRegion,
            getProfilePokemon,
            getAllPokemons
         }}>
            {children}
        </PokedexContext.Provider>
    );
};

PokedexProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PokedexProvider, PokedexContext };
