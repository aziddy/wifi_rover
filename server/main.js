
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname)));

var webPageSocket;
var roverSocket;

app.get('/', function(req, res) {
	
	/*sess=req.session;
	var loggedIn = sess.loggedIn;
	var loggedInUserEmail = sess.email;
	var loggedInUserId = sess.userid;
	
	var data = {
		loggedIn: loggedIn,
	   	loggedInUserEmail: loggedInUserEmail,
		title: "shit",
		body: "bagelss",
		firstName: "Alex",
		lastName: "Zidros",
		logged: true,
		tagline: "TAGRINErr"
	}; */
	//res.render('index', data);
	 res.sendFile("index.html");
	//res.send("<head><script src='/socket.io/socket.io.js'></script></head>yeet<script>var socket = io.connect();socket.emit('initWeb', 1);</script>");
});

io.on('connection', function(socket) {
	console.log("User Connected");
	
	socket.on('disconnect', function() {
		console.log("disconnected");
		socket.broadcast.emit('message', 'hello friends!');
		
		/*if(webPageSocket == socket.id){
			webPageSocket = null;
		}*/
		
	});
	
	
	
	
	
	socket.on('initWeb', function(msg) {
		console.log("initWeb");
		webPageSocket = socket.id;
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
		//console.log("yeet video");
		socket.broadcast.to(webPageSocket).emit('video', msg);
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

console.log("reee");







http.listen(5555, function() {
	console.log('listening on *:5555');

});