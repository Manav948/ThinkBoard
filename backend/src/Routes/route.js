import express from 'express';
import { getNotes, createNotes, updateNotes, deleteNotes, getNotesByid } from '../Controller/noteController.js';

const routes = express.Router();

routes.get('/', getNotes)
routes.get('/:id', getNotesByid)
routes.post('/', createNotes)
routes.put('/:id', updateNotes)
routes.delete('/:id', deleteNotes)

export default routes;