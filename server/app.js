
import express from 'express';
import {router} from './routes/router.js';
import './models/booking_model.js'
import cors from 'cors';

let app = express();

app.listen(5000, () => console.log('Listening on port 5000'));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT']
}));

app.use(express.json());
app.use('/api', router);

