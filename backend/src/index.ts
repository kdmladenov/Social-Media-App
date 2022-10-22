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
import storiesController from './controllers/stories-controller.js';
import reactionsController from './controllers/reactions-controller.js';
import schoolsController from './controllers/schools-controller.js';
import workplacesController from './controllers/workplaces-controller.js';
import friendsController from './controllers/friends-controller.js';
import reactionsImagesController from './controllers/reactions-images-controller.js';
import commentsImagesController from './controllers/comments-images-controller.js';
import imagesController from './controllers/images-controller.js';
import savedPostsController from './controllers/saved-posts-controller.js';
import locationsController from './controllers/locations-controller.js';

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authController);
app.use('/users', usersController);
app.use('/friends', friendsController);
app.use('/posts', postsController);
app.use('/images', imagesController);
app.use('/stories', storiesController);
app.use('/comments', commentsController);
app.use('/comments-images', commentsImagesController);
app.use('/reactions', reactionsController);
app.use('/reactions-images', reactionsImagesController);
app.use('/schools', schoolsController);
app.use('/saved-posts', savedPostsController);
app.use('/workplaces', workplacesController);
app.use('/locations', locationsController);

app.use('/storage/images', express.static('storage/images'));
app.use('/storage/avatars', express.static('storage/avatars'));
app.use('/storage/covers', express.static('storage/covers'));
app.use('/storage/stories', express.static('storage/stories'));
app.use('/storage/post-images', express.static('storage/post-images'));

app.all('*', (req, res) => res.status(404).send({ message: 'Resource not found!' }));

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
