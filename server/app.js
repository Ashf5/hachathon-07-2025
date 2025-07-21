
import express from 'express';
import './models/booking_model.js'

let app = express();

app.listen(5000, () => console.log('Listening on port 5000'));

app.use(express.json());

