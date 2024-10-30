import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Modal from './Modal';
import { IApiResponseAll } from '../types/getAll';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface Column {
  id: 'pokemon' | 'regiao';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'pokemon', label: 'Pokémon', minWidth: 170 },
  { id: 'regiao', label: 'Região', minWidth: 170 },
];

interface PokemonData {
  name: string;
  url: string;
}

interface Encounter {
  pokemon: PokemonData;
}

interface Region {
  name: string;
  pokemon_encounters: Encounter[];
}

interface Props {
  data: Region | IApiResponseAll; 
}

const PokemonIcon = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
      <AddIcon sx={{ color: 'primary.main' }} /> {/* Ícone de adicionar */}
      <Typography variant="body1" sx={{ marginLeft: 1 }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
    </div>
  );
};

export default function TablePokemon({ data }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePokemonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName); 
    setOpen(true); 
  };

  const rows = data.flatMap(region =>
    region.pokemon_encounters.map(encounter => ({
      pokemon: encounter.pokemon.name,
      regiao: region.name,
    }))
  );

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: 3 }}>
        <TableContainer sx={{ overflow: 'visible' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={'left'} style={{ minWidth: column.minWidth }}>
                    <Typography variant="h6">{column.label}</Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={'left'}>
                            {column.id === 'pokemon' ? (
                              <PokemonIcon name={value} onClick={() => handlePokemonClick(value)} />
                            ) : (
                              <Typography variant="body1">{value}</Typography>
                            )}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal open={open} setOpen={setOpen} selectedPokemon={selectedPokemon} />
    </>
  );
}
