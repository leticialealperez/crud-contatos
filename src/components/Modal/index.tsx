import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, {useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizar, excluir, buscarContatoPorID } from '../../store/modules/contatos/contatosSlice';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    mode: ModeModal
}

type ModeModal = 'edit' | 'delete' | ''

function Modal({ open, handleClose, id, mode }: ModalProps) {
    const [nameUpdated, setNameUpdated] = useState('');
    const [phoneUpdated, setPhoneUpdated] = useState('');

    const contato = useAppSelector((state) => buscarContatoPorID(state, id));

    const dispatch = useAppDispatch();

    useEffect(() => {
        
        if(contato) {
            setNameUpdated(contato.name)
            setPhoneUpdated(contato.phone)
        }
        
    }, [contato, id])


    const handleConfirm = () => {
        switch(mode) {
            case 'delete': 
                dispatch(excluir(id))
                handleClose()
            break

            case 'edit': 
                dispatch(atualizar({ id, name: nameUpdated, phone: phoneUpdated }))
                handleClose()
            break
            default:
        }
    }


    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            {mode === 'delete' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja excluir o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ao confirmar esta ação não poderá ser desfeita.
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )}
            {mode === 'edit' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Editar recado`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Informe o nome e o telefone.
                        </DialogContentText>
                        <>
                            <TextField value={nameUpdated} name='name' label='Nome' onChange={(ev) => setNameUpdated(ev.target.value)}/>
                            <TextField value={phoneUpdated} name='phone' label='Telefone' onChange={(ev) => setPhoneUpdated(ev.target.value)} />
                        
                        </>
                    </DialogContent>
                </React.Fragment>
            )}
            <DialogActions>
                <Button onClick={handleClose} autoFocus color='error' variant='outlined'>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color='info' variant='contained'>Confirmo</Button>
            </DialogActions>
        </Dialog>
    )
}


export { Modal }