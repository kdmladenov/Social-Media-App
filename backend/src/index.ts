import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';
import postsController from './controllers/posts-controller.js';
import commentsController from './controllers/comments-controller.js';

import jwtStrategy from './authentication/strategy.js';
import { PORT } from '../config.js';
import HttpException from './models/HttpException.js';

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authController);
app.use('/users', usersController);
app.use('/posts', postsController);
app.use('/comments', commentsController);

app.use('/storage/images', express.static('storage/images'));
app.use('/storage/avatars', express.static('storage/avatars'));

app.all('*', (req, res) => res.status(404).send({ message: 'Resource not found!' }));

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
