var http 	= require('http');
var fs 		= require('fs');
var	e 		= require('events');

try {
	var files 	= require('./files');
} catch(err) {
	console.log(' - Cannot find this module. It will not be loaded.');
}


var robots_txt;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

// Generate a new robots.txt file 
	robots_txt = 'robot_txt/robots-' + files.milliseconds_time() + '.txt';

	var ev = new e.EventEmitter();
	ev.setMaxListeners(100);
	ev.on('showMessage',showNewFileMessage);

// Prepare the new file for writing.
	fs.open(robots_txt, 'w', function (err, file) {});	

	res.write('<p>New robots.txt file: ' + robots_txt + '</p>');

	var original_robots_txt_file = fs.readFileSync(files.original_robots_text());

	fs.appendFile(robots_txt,original_robots_txt_file, (error)=>{/**/})

    // Get the lines of the array file
	path = files.suffix_file_name();
	fs.readFile(path,function(err,data) {

		var suffixes = fs.readFileSync(path).toString().split('\n');

		for (var i = 0; i < suffixes.length; i++) {
			suffix = suffixes[i];
		    res.write('Disallow: ' + suffix + '$<br/>');
		    fs.appendFile(robots_txt,'Disallow: ' + suffix + '$\n',(error)=>{/**/})
		}

	});

	ev.emit('showMessage');

}).listen(8080);

// Event Listeners

	var showNewFileMessage = function(){
		//console.clear();
		console.log(robots_txt + ' file has generated!!!');
	}