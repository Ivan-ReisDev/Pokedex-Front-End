import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import { TransitionProps } from '@mui/material/transitions';
import { PokedexContext } from '../context/PokedexContext';
import { useQuery } from '@tanstack/react-query';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPokemon: string | null;
}

export default function Modal({ open, setOpen, selectedPokemon }: ModalProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const context = React.useContext(PokedexContext);

    if (!context) {
        throw new Error("PokedexContext must be used within a PokedexProvider");
    }

    const { getProfilePokemon } = context;

    const { data, isLoading, error } = useQuery({
        queryKey: ["profilePokemon", selectedPokemon],
        queryFn: () => getProfilePokemon(selectedPokemon as string),
        enabled: !!selectedPokemon,
    });

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar dados do Pokémon.</div>;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{capitalize(selectedPokemon || 'Pokémon')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Aqui estão os detalhes de {capitalize(selectedPokemon || 'Pokémon')}.
                    </DialogContentText>
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Detalhes do Pokémon">
                            <Tab label="Tipos" />
                            <Tab label="Status" />
                            <Tab label="Desvantagens" />
                            <Tab label="Vantagens" />
                        </Tabs>
                    </Box>
                    
                    <Box role="tabpanel" hidden={tabIndex !== 0} p={2} mb={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6">Tipos do Pokémon</Typography>
                        {data?.profile?.types?.length ? (
                            <ul>
                                {data.profile.types.map((typeInfo) => (
                                    <li key={typeInfo.type.name}>{capitalize(typeInfo.type.name)}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">Tipos não encontrados.</Typography>
                        )}
                    </Box>
                    
                    <Box role="tabpanel" hidden={tabIndex !== 1} p={2} mb={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6">Status</Typography>
                        {data?.profile?.stats?.length ? (
                            <ul>
                                {data.profile.stats.map((stat) => (
                                    <li key={stat.stat.name}>
                                        {capitalize(stat.stat.name)}: {stat.base_stat}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">Status não encontrados.</Typography>
                        )}
                    </Box>
                    
                    <Box role="tabpanel" hidden={tabIndex !== 2} p={2} mb={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6">Desvantagens contra os tipos:</Typography>
                        {data?.type?.damage_relations?.double_damage_from?.length ? (
                            <ul>
                                {data.type.damage_relations.double_damage_from.map((type) => (
                                    <li key={type.name}>{capitalize(type.name)}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">Fraquezas não encontradas.</Typography>
                        )}
                    </Box>
                    
                    <Box role="tabpanel" hidden={tabIndex !== 3} p={2} mb={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6">Vantagem Contra tipos</Typography>
                        {data?.type?.damage_relations?.double_damage_to?.length ? (
                            <ul>
                                {data.type.damage_relations.double_damage_to.map((type) => (
                                    <li key={type.name}>{capitalize(type.name)}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">Pontos fortes não encontrados.</Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
