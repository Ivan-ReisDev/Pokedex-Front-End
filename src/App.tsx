import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageBasic from './pages/PageBasic';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonsRegion } from './routes/PokemonsRegion';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}> 
      <Routes>
        <Route path='/' element={<PageBasic />}>
          <Route index element={<Home />} />
          <Route path={`pokemons/region/:region`} element={<PokemonsRegion />} />
        </Route>
      </Routes>
    </QueryClientProvider> 
  );
}

export default App;
