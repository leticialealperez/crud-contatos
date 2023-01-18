import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from './types';
import { RootState } from '../..';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../services/ApiService';

const adapter = createEntityAdapter<Contact>({
  selectId: (registro) => registro.id
})

// GET
export const getContatos = createAsyncThunk('contatos/getContatos', async () => {
  const resposta = await apiGet('/contacts')

  return resposta;
});


// POST
export const adicionar = createAsyncThunk('contatos/adicionar', async(dados: Omit<Contact, 'id'>) => {
  const resposta = await apiPost('/contacts', dados)

  return resposta
});


// PUT
export const atualizar = createAsyncThunk('contatos/atualizar', async (dados: Contact) => {
  const resposta = await apiPut(`/contacts/${dados.id}`, dados);

  return resposta;
});


// DELETE
export const excluir = createAsyncThunk('contatos/excluir', async (id: string) => {
  const resposta = await apiDelete(`/contacts/${id}`)

  return resposta
});

const contatosSlice = createSlice({
  name: 'contatos',
  initialState: adapter.getInitialState({
    loading: false
  }),
  reducers: {
    adicionar: adapter.addOne,
    excluir: adapter.removeOne,
    atualizar: adapter.updateOne,
  },
  extraReducers: (builder) => {
    // GET
    builder.addCase(getContatos.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getContatos.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.data)
    })

    // POST
    builder.addCase(adicionar.pending, (state) => {
      state.loading = true
    })
    builder.addCase(adicionar.fulfilled, (state, action) => {
      state.loading = false;

      if(action.payload.success) {
        adapter.addOne(state, action.payload.data)
      }

    })

    // PUT
    builder.addCase(atualizar.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(atualizar.fulfilled, (state, action) => {
      state.loading = false;

      if(action.payload.success) {
        adapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data})
      }
    })

    // DELETE
    builder.addCase(excluir.pending, (state) => {
      state.loading = true
    })
    builder.addCase(excluir.fulfilled, (state, action) => {
      state.loading = false;

      if(action.payload.success) {
        adapter.setAll(state, action.payload.data)
      }
    })
  }

});

export const { selectAll: buscarContatos, selectById: buscarContatoPorID } =
  adapter.getSelectors((state: RootState) => state.contatos);

export const contatosReducer = contatosSlice.reducer;


// OBJ, string, number, boolean ? - usa slice

// ARRAY ? - usa adapter
