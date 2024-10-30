import TablePokemon from "../components/TablePokemon";
import { IApiResponseAll } from "../types/getAll";
import { IRegion } from "../types/PokemonsRegion";

interface Props {
    data: IRegion | IApiResponseAll;
}

const InfoPokemons = ({ data }: Props ) => {

  return (
    <div className="min-w-[80%] flex items-center  min-h-screen flex-col overflow-hidden">
        <h1 className="mb-4">Escolha um pokemon para mais informações</h1>
        <div className="w-[90%]">
        <TablePokemon 
        data={data}
        />
        </div>
    </div>
  )
}

export default InfoPokemons;


