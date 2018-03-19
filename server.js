const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = 'b539a8bdca160ad8a6657e8d664b0879';
const city = 'portland';

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.render('index', { weather: null, error: null });
});

app.post('/', function(req, res){

  var city = req.body.city;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function(err, response, body){
    if(err){
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      var weather = JSON.parse(body);
      if(weather.main == undefined){
          res.render('index', { weather: null, error: 'Error, please try again' });

      } else {
        var weather = JSON.parse(body);
        var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(weather.main.temp);
        res.render('index', { weather: weatherText, error: null});
      }
    }
  });

  // let city = req.body.city;
  // let url = '';

  // res.render('index');
  // console.log(req.body.city);
})

app.listen(3000, function(){
  console.log('Example app listening');
});
