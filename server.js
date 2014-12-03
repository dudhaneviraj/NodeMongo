
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');


var server = express();

server.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
server.set('ip',process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');
server.use(express.favicon());
server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(path.join(__dirname, 'public')));

// development only

if ('development' === server.get('env')) {
  server.use(express.errorHandler());
}

server.get('/', routes.getIndex);
server.get ('/insert', routes.getInsert);
server.get('/turn',routes.getTurn);
http.createServer(server).listen(server.get('port'),server.get('ip'), function(){
  console.log('Express server listening on port ' + server.get('port') + " On the address:"+server.get('ip'));
});