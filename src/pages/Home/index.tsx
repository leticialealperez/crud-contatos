import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { Modal } from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { adicionar, buscarContatos, getContatos } from '../../store/modules/contatos/contatosSlice';



function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [idSelecionado, setIdSelecionado] = useState('')
    const [mode, setMode] = useState<'edit' | 'delete' | ''>('');
    const [openModal, setOpenModal] = useState(false)
    const contatos = useAppSelector(buscarContatos);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getContatos())
    }, [])
    
    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                setName(value)
            break;

            case 'phone':
                setPhone(value)
            break;

            default:
        }
    }

    const handleSaveContact = () => {
        dispatch(adicionar({ name, phone }))
        alert("Recado adicionado!")
    }

    const handleEdit = (id: string) => {
        setMode('edit')
        setIdSelecionado(id);
        setOpenModal(true);
    }

    const handleDelete = (id: string) => {
        setMode('delete');
        setIdSelecionado(id);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleClear = () => {
        setName('')
        setPhone('')
        setMode('')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columnSpacing={3} alignItems={'center'} marginY={5} padding={2}>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Nome' name='name' value={name} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Telefone' name='phone' value={phone} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' color='secondary' size='large' onClick={handleSaveContact}>Salvar</Button>
                </Grid>
            </Grid>
            <Grid container paddingX={3}>
                <Grid xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="center">Telefone</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contatos.map((contato) => (
                                    <TableRow
                                        key={contato.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {contato.id}
                                        </TableCell>
                                        <TableCell align="center">{contato.name}</TableCell>
                                        <TableCell align="center">{contato.phone}</TableCell>
                                        <TableCell align="center">
                                            <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleEdit(contato.id)}>Editar</Button>
                                            <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleDelete(contato.id)}>Apagar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Modal mode={mode} id={idSelecionado} open={openModal} handleClose={handleCloseModal}/>
        </Box>
    )
}


export { Home }