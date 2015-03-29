var express = require('express')
var fs = require('fs');
var cameralogic = require('./cameralogic');



var app = express()


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})


app.use(express.static('public'));
app.use(express.static('pictures'));
app.use(express.static('raw'));









// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})


app.get('/preview/', function (req, res) {
  res.send('starting scan at lowest definition for preview!');

  //TODO : call here whatever logic is needed for a scan


})

app.get('/snap/', function (req, res) {
  if(cameralogic.snap(cameralogic.SD)){
    res.send('starting scan at standard definition!');
    
  }else{
    res.send('cannot scan yet, the camera is already in use !');
    
  }
	

})

app.get('/snap/:definition', function (req, res) {
  res.send('starting scan!');

  //TODO : call here whatever logic is needed for a scan



})


app.get('/collection', function (req, res) {
  res.send('list of images!');

  //TODO : return here the list of the pictures already taken

})

app.get('/picture/:id', function (req, res) {
  res.send('the picture!');

  //TODO : return here the considered image

})

app.get('/raw/:id', function (req, res) {
  res.send('the raw picture!');

  //TODO : return here the considered image

})

app.get('/picture/last', function (req, res) {
  res.send('the last picture!');

  //TODO : return here the last pictures taken

})