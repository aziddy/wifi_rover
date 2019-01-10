
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname)));

var webPageSocket;
var roverSocket;

var webPageSockets = new Array();

app.get('/', function(req, res) {
	
	 res.sendFile("index.html");

});

io.on('connection', function(socket) {
	console.log("User Connected");
	
	socket.on('disconnect', function() {
		console.log("disconnected");
		//if(socket.id == webPageSocket){
		//	webPageSocket = null;
		//}
		
		try {
			for (var i = 0; i < webPageSockets.length; i++) { 
				if(socket.id == webPageSockets[i]){
					webPageSockets.splice(i, 1);
				}
			}
		} catch(err) {
			console.log(err);
			console.log("Removing from array error");
		}
		

		
		console.log(webPageSockets);
		
	});
	
	
	
	
	
	socket.on('initWeb', function(msg) {
		console.log("initWeb");
		//webPageSocket = socket.id;
		webPageSockets.push(socket.id);
		console.log(webPageSockets);
	});
	
	socket.on('initPi', function(msg) {
		console.log("initPi");
		roverSocket = socket.id;
	});
	
	
	
	
	socket.on('my_message', function(msg) {
		console.log("yeet");
	});
	
	
	// from car
	
	socket.on('video', function(msg) {
		/*
		if(!(webPageSocket == null)){
			socket.broadcast.to(webPageSocket).emit('video', msg);
		}*/
		if(webPageSockets.length > 0){
			try {
				for (var i = 0; i < webPageSockets.length; i++) { 
					socket.broadcast.to(webPageSockets[i]).emit('video', msg);
				}
			} catch(err) {
				console.log(err);
				console.log(" array error");
			}
		}
	});
	
	
	// to car
	
	socket.on('foward', function(msg) {
		console.log("foward yeet");
		socket.broadcast.to(roverSocket).emit('foward', 1);
	});

	socket.on('backward', function(msg) {
		console.log("backward yeet");
		socket.broadcast.to(roverSocket).emit('backward', 1);
	});

	socket.on('left', function(msg) {
		console.log("left yeet");
		socket.broadcast.to(roverSocket).emit('left', 1);
	});
	
	socket.on('right', function(msg) {
		console.log("right yeet");
		socket.broadcast.to(roverSocket).emit('right', 1);
	});
	
});

console.log("Start Wifi_Rover Server");







http.listen(5555, function() {
	console.log('listening on *:5555');

});