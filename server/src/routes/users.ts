import express from 'express';
import signup from '../controllers/users/signup';
import login from '../controllers/users/login';
import google from '../controllers/users/google';
import { blockUnauthorized } from '../middleware/checkauth';
import signout from '../controllers/users/signout';
import logout from '../controllers/users/logout';
import email from '../controllers/users/email';

const userRouter = express.Router();
userRouter.delete('/signout', blockUnauthorized, signout);
userRouter.get('/email/:email', email);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/google', google);
userRouter.post('/logout', blockUnauthorized, logout);

export default userRouter;
