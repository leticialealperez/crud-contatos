import { combineReducers } from '@reduxjs/toolkit';
import { contatosReducer } from './contatos/contatosSlice';



const rootReducer = combineReducers({
  contatos: contatosReducer,
});

export { rootReducer };

