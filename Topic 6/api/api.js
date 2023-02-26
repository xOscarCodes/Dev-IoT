const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://charanpreet:<PASSWORD>@cluster0.y5qg6ce.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const bodyParser = require('body-parser');

const Device = require('./models/device');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

/**
* @api {get} /api/devices All Devices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (err == true) {
            return res.send(err);
        } else {
            return res.send(devices);
        }
    });
});


/**
* @api {post} /api/devices Add new device
* @apiGroup Device
* @apiExample {json} Successful Response:
*   {
*       "successfully added device and data"
*   }
* @apiParam {String} name User's name and device name 
* @apiParam {String} user User's name
* @apiParam {Object} sensorData Data from the sensor
* @apiParam {String} sensorData[ts] Device number
* @apiParam {Number} sensorData[temp] Device temperature
* @apiParam {Number} sensorData[loc] Device location
* @apiParam {Number} loc[lat] Device latitude 
* @apiParam {Number} loc[lon] Device longitude
* @apiParamExample {json} Example Post:
*  [
* {
*   "name": "Bob's iPhone",
*   "user": "bob",
*   "sensorData": [
*     {
*       "ts": "1529545935",
*       "temp": 14,
*       "loc": {
*         "lat": -37.839587,
*         "lon": 145.101386
*       }
*     }
*   ]
*  } 
*  ]
*/
app.post('/api/devices', (req, res) => {
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