import { Router } from 'express';
import deleteUserHandler from '../controllers/quit.controller';

const quitRoutes = Router();

quitRoutes.delete('/', deleteUserHandler);

export default quitRoutes;
