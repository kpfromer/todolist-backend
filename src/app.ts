import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import { userRoute } from './api/user';
import passport from 'passport';
import jwtStrategy from './config/JwtStrategy';
import { projectRoute } from './api/project';
import { todoRoute } from './api/todo';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Config
mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true });
passport.use('jwt', jwtStrategy);

// Routes

app.use('/auth', userRoute);
app.use('/todo', todoRoute);
app.use('/project', projectRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(config.get('port'), () => {
  console.log(`Listening on port ${config.get('port')}`);
});
