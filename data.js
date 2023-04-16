const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/IOT_F_P', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// create a schema for the sensor data
const sensorDataSchema = new mongoose.Schema({
    data: String,
    sDate: Date,
    sTime: String,
    ip: String
});

// create a model for the sensor data
const SensorData = mongoose.model('SensorData', sensorDataSchema);

// set the timezone
process.env.TZ = 'Asia/Kolkata';

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const { data } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sDate = new Date().toISOString().slice(0, 10);
    const sTime = new Date().toLocaleTimeString();

    // create a new instance of the sensor data model
    const sensorData = new SensorData({ data, sDate, sTime, ip });

    // save the sensor data to the database
    sensorData.save()
        .then(() => res.send('success'))
        .catch(err => {
            console.error(err);
            res.send('failed');
        });
});

app.listen(3000, () => console.log('Listening on port 3000'));
