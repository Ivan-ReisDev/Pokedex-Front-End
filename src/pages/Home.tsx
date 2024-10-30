import Dropdown from "../components/Dropdown"

const Home = () => {
  return (
    <div className="min-w-[80%] flex items-center  min-h-screen flex-col overflow-hidden">
        <h1 className="mb-4">Escolha uma região ou liste todos os pokemons</h1>
        <Dropdown/>
    </div>
  )
}

export default Home