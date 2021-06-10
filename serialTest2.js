//Serial
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var fs = require('fs');
//var csv = require('fast-csv');
//var ws = fs.createWriteStream('my.csv',{flag: 'a'});
var json2csv = require('json2csv').parse;
var newLine = '\r\n';
var i = 1;




var sp = new  serialport(
    'COM13',
    {
    baudRate: 9600,
    databits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});
//const parser = new serialport.parsers.Readline();
//port.pipe(parser);
var datos;
var datosString;
var stringContainer;
    
//sp.on('open', function() {
//	console.log('open');
sp.on('data', function(data) {
	datos = data;
	sleep(3000);
	//console.log(data);
	datosString = data.toString('utf8');
	console.log(datosString);
	
	var res = datosString.split(",");
	console.log("Lo primero que llega es" + res[0]);
	

	var TEAMID,MISSIONTIME,PACKETCOUNT,PACKETTYPE,MODE,SP1RELEASED,SP2RELEASED,ALTITUDE,TEMP,VOLTAGE,GPSTIME,GPSLATITUDE,GPSLONGITUDE,GPSALTITUDE,GPSSATS,SOFTWARESTATE,SP1PACKETCOUNT,SP2PACKETCOUNT,CMDECHO;

        for (let i = 0; i < res.length; i++) {
            //res[i]= res[i].replace("<","");
          //res[i]= res[i].replace(">","");
          
          
      }
      
	  
	  if(res[3] == "C"){
	  	  console.log("Es un paquete de container");
	  	  TEAMID = res[0];
          MISSIONTIME = res[1];
          PACKETCOUNT = res[2];
          PACKETCOUNT = i;
          PACKETTYPE = res[3];
          MODE = res[4];
          SP1RELEASED = res[5];
          SP2RELEASED = res[6];
          ALTITUDE = res[7];
          TEMP = res[8];
          VOLTAGE = res[9];
          GPSTIME = res[10];
          GPSLATITUDE = res[11];
          GPSLONGITUDE = res[12];
          GPSALTITUDE = res[13];
          GPSSATS = res[14];
          SOFTWARESTATE = res[15];
          SP1PACKETCOUNT = res[16];
          SP2PACKETCOUNT = res[17];
          CMDECHO = res[18];
	  	  console.log(TEAMID);
	      console.log(MISSIONTIME);
	      console.log(PACKETCOUNT);
	      console.log(PACKETTYPE);
	      console.log(MODE);
	      console.log(SP1RELEASED);
	      console.log(SP2RELEASED);
	      console.log(ALTITUDE);
	      console.log(TEMP);
	      console.log(VOLTAGE);
	      console.log(GPSTIME);
	      console.log(GPSLATITUDE);
	      console.log(GPSLONGITUDE);
	      console.log(GPSALTITUDE);
	      console.log(GPSSATS);
	      console.log(SOFTWARESTATE);
	      console.log(SP1PACKETCOUNT);
	      console.log(SP2PACKETCOUNT);
	      console.log(CMDECHO);

	      ///Guardar en csv
	      var fields = ['TEAM_ID','MISSION_TIME','PACKETCOUNT','PACKETTYPE','MODE','SP1RELEASED','SP2RELEASED','ALTITUDE','TEMP','VOLTAGE','GPSTIME','GPSLATITUDE','GPSLONGITUDE','GPSALTITUDE','GPSSATS','SOFTWARESTATE','SP1PACKETCOUNT','SP2PACKETCOUNT','CMDECHO'];
	      
	      var toCSV = [
	      	TEAMID,
	      	MISSIONTIME,
	      	PACKETCOUNT,
	      	PACKETTYPE,
	      	MODE,
	      	SP1RELEASED,
	      	SP2RELEASED,
	      	ALTITUDE,
	      	TEMP,
	      	VOLTAGE,
	      	GPSTIME,
	      	GPSLATITUDE,
	      	GPSLONGITUDE,
	      	GPSALTITUDE,
	      	GPSSATS,
	      	SOFTWARESTATE,
	      	SP1PACKETCOUNT,
	      	SP2PACKETCOUNT,
	      	CMDECHO

	      	];

	      fs.stat('Flight_2092_C.csv', function (err, stat) {
			  if (err == null) {
			    console.log('File exists, writing new data...');
			   // fs.truncate('team2092.csv', 0, function(){console.log('clear done... ');})
			    //write the actual data and end with newline
			    var csv = toCSV + newLine;

			    fs.appendFile('Flight_2092_C.csv', csv, function (err) {
			      if (err) throw err;
			      console.log('The "data to append" was appended to file!');
			    });
			  } else {
			    //write the headers and newline
			    console.log('New file, just writing headers');
			    fields = fields + newLine;

			    fs.writeFile('Flight_2092_C.csv', fields, function (err) {
			      if (err) throw err;
			      console.log('file saved');
			    });
			  }
			});
	      i++;

	  }
	  else if(res[3] == "S1"){
		console.log("Es un paquete de SP1");
		  TEAMID = res[0];
          MISSIONTIME = res[1];
          PACKETCOUNT = res[2];
          PACKETTYPE = res[3];
          SPALTITUDE = res[4];
          SPTEMP = res[5];
          SPROTATIONRATE = res[6];
          console.log(TEAMID);
	      console.log(MISSIONTIME);
	      console.log(PACKETCOUNT);
	      console.log(PACKETTYPE);
	      console.log(SPALTITUDE);
	      console.log(SPTEMP);
	      console.log(SPROTATIONRATE);

	      var fields = ['TEAM_ID','MISSION_TIME','PACKETCOUNT','PACKETTYPE','SP_ALTITUDE','SP_TEMP','SP_ROTATION_RATE'];
	      var toCSV = [
	      	TEAMID,
	      	MISSIONTIME,
	      	PACKETCOUNT,
	      	PACKETTYPE,
	      	SPALTITUDE,
	      	SPTEMP,
	      	SPROTATIONRATE
	      	];


	      	      fs.stat('Flight_2092_S1.csv', function (err, stat) {
			  if (err == null) {
			    console.log('File exists, writing new data...');
			   // fs.truncate('team2092.csv', 0, function(){console.log('clear done... ');})
			    //write the actual data and end with newline
			    var csv = toCSV + newLine;

			    fs.appendFile('Flight_2092_S1.csv', csv, function (err) {
			      if (err) throw err;
			      console.log('The "data to append" was appended to file!');
			    });
			  } else {
			    //write the headers and newline
			    console.log('New file, just writing headers');
			    fields = fields + newLine;

			    fs.writeFile('Flight_2092_S1.csv', fields, function (err) {
			      if (err) throw err;
			      console.log('file saved');
			    });
			  }
			});
	      i++;

	  }
	  else if(res[3] == "S2"){
	  	console.log("Es un paquete de SP2");
	  	TEAMID = res[0];
          MISSIONTIME = res[1];
          PACKETCOUNT = res[2];
          PACKETTYPE = res[3];
          SPALTITUDE = res[4];
          SPTEMP = res[5];
          SPROTATIONRATE = res[6];
          console.log(TEAMID);
	      console.log(MISSIONTIME);
	      console.log(PACKETCOUNT);
	      console.log(PACKETTYPE);
	      console.log(SPALTITUDE);
	      console.log(SPTEMP);
	      console.log(SPROTATIONRATE);


	      var fields = ['TEAM_ID','MISSION_TIME','PACKETCOUNT','PACKETTYPE','SP_ALTITUDE','SP_TEMP','SP_ROTATION_RATE'];
	      var toCSV = [
	      	TEAMID,
	      	MISSIONTIME,
	      	PACKETCOUNT,
	      	PACKETTYPE,
	      	SPALTITUDE,
	      	SPTEMP,
	      	SPROTATIONRATE
	      	];


	      	      fs.stat('Flight_2092_S2.csv', function (err, stat) {
			  if (err == null) {
			    console.log('File exists, writing new data...');
			   // fs.truncate('team2092.csv', 0, function(){console.log('clear done... ');})
			    //write the actual data and end with newline
			    var csv = toCSV + newLine;

			    fs.appendFile('Flight_2092_S2.csv', csv, function (err) {
			      if (err) throw err;
			      console.log('The "data to append" was appended to file!');
			    });
			  } else {
			    //write the headers and newline
			    console.log('New file, just writing headers');
			    fields = fields + newLine;

			    fs.writeFile('Flight_2092_S2.csv', fields, function (err) {
			      if (err) throw err;
			      console.log('file saved');
			    });
			  }
			});
	      i++;
	  } 


	  


		



//	});
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
//var contData = "2092,12:13:43,13,C,S,SP1_ON,SP2_ON,20,20,50,12:13:43,93.323243,75.234323,450,5,OK,45,50,CMDECHO";
//var sp1 = "2092,12:13:43,13,S1,20,25,345";
//var sp2 = "2092,12:13:43,13,S2,30,25,340";







