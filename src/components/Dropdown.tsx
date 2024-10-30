import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PokedexContext } from '../context/PokedexContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Dropdown() {
  const context = React.useContext(PokedexContext);

  if (!context) {
    throw new Error("PokedexContext must be used within a PokedexProvider");
  }

  const { getRegion,  region, setRegion } = context;

  const { data, isLoading, error } = useQuery({
    queryKey: ["region"],
    queryFn: getRegion,
    enabled: !!context, 
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar as regiões.</div>;
  }

  if (!data || !data.results) {
    return <div>Nenhuma região encontrada.</div>;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
    navigate(`pokemons/region/${event.target.value}`);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Região</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          label="Região"
          onChange={handleChange}
        >
          {data.results.map((region) => (
            <MenuItem key={region.name} value={region.name}>{region.name}</MenuItem>
          ))}
          <MenuItem value={"Todos"}>Todos</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
