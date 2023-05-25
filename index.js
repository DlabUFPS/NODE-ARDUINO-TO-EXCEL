'use strict';
var serialport = require('serialport');
var fs = require('fs');
var SerialPort = serialport.SerialPort;
var parsers = serialport.parsers;
var portName = process.argv[2];

var port = new SerialPort(portName, {
  baudrate: 9600,
  parser: parsers.readline('\r\n')
});

port.on('open', function() {
  var content =new Date()+"\r\n"+"Sensor 1;Sensor 2;Sensor 3;Sensor 4;Sensor 5;Sensor 6;Sensor 7;Sensor 8;Sensor 9;Sensor 10;Sensor 11;Sensor 12;Sensor 13;Sensor 14;Sensor 15;";
  console.log('Port open');
  fs.writeFile("data.csv",content+"\r\n", function(err) {
    if(err) {
        return console.log(err);
    }
    }); 
});

port.on('data', function(data) {
  console.log(data);
  fs.appendFile("data.csv", data+"\r\n", function(err) {
    if(err) {
        return console.log(err);
    }

    //console.log("The file was saved!");
}); 
});