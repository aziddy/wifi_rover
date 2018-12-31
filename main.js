var fs = require('fs'); // file system dependancy 
const express = require('express') // the web server stuff
const path = require('path')
const app = express() // intiate express server into app variable


app.use(express.static(path.join(__dirname, 'public'))) // allows use of static files



// https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6
// https://github.com/daspinola/video-stream-sample


console.log("hello")

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html')) // set static html file as response
})


app.get('/video', function(req, res) {
	const path = "media/SampleVideo_640x360_30mb.mp4"
	const metaData = fs.statSync(path) // grabs meta data about file
	const totalFileSize = metaData.size // gets file's total size
	
	
})
// create Read Stream that gets chuncks between start and end


// HTTP 206  (Partial Content)


/*
	CLIENT REQUEST -------
	GET /video.mp4 HTTP/1.1
	Range: bytes=1048576-2097152
	------ (I want bytes 1048576-2097152)
	
	SERVER RESPONSE -------
	HTTP/1.1 206 Partial Content
	Content-Range: bytes 1048576-2097152/3145728
	Content-Type: video/mp4
	------ (Here are the requested bytes in the body)
	
	
	$rangeLength = $rangeEnd - $rangeStart
	
	// Header Response Format

	Content-Range: bytes $rangeStart-$rangeEnd/$totalSize
	Accept-Ranges: bytes
	Content-Length: $rangeLength	// Chunck Size
	Content-Type: 'video/mp4'
	
	------------   pipes	 ------------
	| readable |  ------- >. | writable |
	-----------				 ------------
	
	*/
	
//	HTML5 media player will request mp4 bytes untill end of file







// start server on port 3000
app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
	
	
	
	
	


