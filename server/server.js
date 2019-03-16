import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import notesRoute from './routes/notes';
import usersRoute from './routes/user';

// Configure environment variables for server
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Base url for our api
const baseUrl = '/api/v1';

// Body parser middleware for json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the database
mongoose.connect(process.env.REACT_APP_MONGODB_URI, { useNewUrlParser: true });

// TODO: Serve static content from react production build
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(`${baseUrl}/notes`, notesRoute);
app.use(`${baseUrl}/users`, usersRoute);

app.listen(port, () => `Listening on port ${port}`);
