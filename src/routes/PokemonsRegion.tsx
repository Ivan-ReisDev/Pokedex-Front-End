import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PokedexContext } from "../context/PokedexContext";
import { useQuery } from "@tanstack/react-query";
import InfoPokemons from "../pages/InfoPokemons";
import Preloader from "../components/Preloader";

export const PokemonsRegion = () => {
    const { region } = useParams();

    const context = useContext(PokedexContext);

    if (!context) {
        throw new Error("PokedexContext must be used within a PokedexProvider");
    }

    const { getPokemonsRegion, setRegion, getAllPokemons } = context;

    // Defina o tipo esperado para os dados
    const { data, isLoading, error } = useQuery({
        queryKey: ["regionPokemons", region],
        queryFn: async () => {
            if (region === "Todos") {
                const allPokemons = await getAllPokemons();
                return allPokemons; // Certifique-se de que isso retorna IApiResponseAll | null
            }
            const regionPokemons = await getPokemonsRegion(region as string);
            return regionPokemons; // Certifique-se de que isso também retorna IApiResponseAll | null
        },
    });

    if (isLoading) return <Preloader />;
    if (error) return <div>{error.message}</div>; 
    
    setRegion(""); // Reset the region after fetching
    return data ? <InfoPokemons data={data} /> : <div>User not found</div>;
};
