const mongoose = require('mongoose');
//mongoose.connect('mongosh "mongodb+srv://cluster0.bvvimlw.mongodb.net/myFirstDatabase" --apiVersion 1 --username vishal4855be21 --password v19YnT2Q84DSiD8b')
//mongoose.connect('mongodb+srv://<vishal4855be21>:<v19YnT2Q84DSiD8b>@cluster0.zfcyx.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

//mongoose.connect('mongodb+srv://Disha:mongodb123@cluster0.bvvimlw.mongodb.net/myFirstDatabase', {useNewUrlParser: true, useUnifiedTopology: true });

const Device = require('./models/device'); 
const Lighting = require('./models/lighting');
const Security = require('./models/security'); 
const AirCond = require('./models/acond');
const FloorRoom = require('./models/floor-room');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 5000;



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/test', (req, res) => {
  res.send('The API is working!');
});


app.get('/api/rooms', async (req, res) => {

  try {
    const floor = req.query.floor;
    const floorRoom = await FloorRoom.findOne({ floor: floor }).exec();
    const rooms = floorRoom.rooms;
    res.json(rooms);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/remove', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;
    let devices = [];

    console.log('Received GET request with query parameters:', { type, floor, room });

    if (type === '1') {
      devices = await Lighting.find({ floor: floor, room: room });
    } else if (type === '2') {
      devices = await AirCond.find({floor: floor, room: room });
    } else if (type === '3') {
      devices = await Security.find({floor: floor, room: room });
    }

    console.log('Retrieved devices:', devices);

    res.json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;
    const name = req.query.name;
    let data = [];

    console.log('Received GET request with query parameters:', { type, floor, room, name });

    if (type === '1') {
      data = await Lighting.find({ floor: floor, room: room, name: name});
    } else if (type === '2') {
      data = await AirCond.find({floor: floor, room: room, name: name });
    } else if (type === '3') {
      data = await Security.find({floor: floor, room: room, name: name });
    }
    const sensorData = data.map((item) => item.sensorData).flat();
    console.log('Retrieved data:', sensorData);

    res.json(sensorData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/remove', async (req, res) => {
  try {
    const type = req.body.type;
    const floor = req.body.floor;
    const room = req.body.room;
    const device = req.body.device;

    if (type === '1') {
      await Lighting.findOneAndRemove({ floor: floor, room: room, name: device });
      console.log('Device removed successfully');
    } else if (type === '2') {
      await AirCond.findOneAndRemove({ floor: floor, room: room, name: device });
    } else if (type === '3') {
      await Security.findOneAndRemove({ floor: floor, room: room, name: device });
    }

    console.log('Device removed successfully:', type, floor, room, device);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/api/lighting', async (req, res) => {
  try {
    const lightingData = await Lighting.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/api/security', async (req, res) => {
  try {
    const lightingData = await Security.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/api/aircond', async (req, res) => {
  try {
    const lightingData = await AirCond.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/api/lighting', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('Received POST request to /api/lighting');
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);
  const device = await AirCond.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Lighting({
    name,
    floor,
    room,
    status: false,
    sensorData: [1,10]
  });

  try {
    await newDevice.save();
    console.log('Successfully saved new device');
    res.send('successfully added device and data');
  } catch (err) {
    console.log('Error saving new device:', err);
    res.send(err);
  }
  }
  
});

app.post('/api/security', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('Received POST request to /api/security');
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);

  const device = await Security.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Security({
    name,
    floor,
    room,
    status: false,
    sensorData: [2,3,4,5]
  });

  try {
    await newDevice.save();
    console.log('Successfully saved new device');
    res.send('successfully added device and data');
  } catch (err) {
    console.log('Error saving new device:', err);
    res.send(err);
  }
  }
  
});

app.post('/api/aircond', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('Received POST request to /api/aircond');
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);
  const device = await AirCond.findOne({ name: name, floor:floor, room: room });
  if (!device) {
    const newDevice = new AirCond({
    name,
    floor,
    room,
    status: false,
    sensorData: [3,5,6,7]
  });

  try {
    await newDevice.save();
    console.log('Successfully saved new device');
    res.send('successfully added device and data');
  } catch (err) {
    console.log('Error saving new device:', err);
    res.send(err);
  }
  }

 
});






// const floors = [
//   {
//     floor: '1',
//     rooms: [1,2,3,4]
//   },
//   {
//     floor: '2',
//     rooms: [5,6,7,8]
//   },
//   {
//     floor: '3',
//     rooms: [9,10,11,12]
//   }
// ];

// FloorRoom.insertMany(floors).then(() => {
//   console.log('Inserted floors successfully');
// }).catch((err) => {
//   console.error('Failed to insert floors', err);
// }).finally(() => {
//   mongoose.connection.close();
// });



app.get('/devices', (req, res) => {
  Device.find({})
    .then(devices => {
      res.send(devices);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post('/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});




app.listen(port, () => {
  console.log(`listening on port ${port}`);
});