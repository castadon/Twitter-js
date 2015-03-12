var express = require( 'express' );
var app = express();
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');

var socketio = require('socket.io');




swig.setDefaults({ cache: false });


var morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

var io = socketio.listen(server);
app.use('/', routes(io));

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
// 	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// 	res.render( 'index', {title: 'Hall of Shame', people: people} );
//   	//res.send('hello world')
// })
// app.get('/news', function(req, res) {
// 	res.send('news!');
// })



