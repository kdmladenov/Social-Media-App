import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import { PORT } from '../config';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

app.use('/storage/images', express.static('storage/images'));
app.use('/storage/avatars', express.static('storage/avatars'));


app.all('*', (req, res) => res.status(404).send({ message: 'Resource not found!' }));



app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
