var connect=require('connect');
var url=require('url');
var app=connect().use(connect.static(__dirname+'/'))
.use(function(req,res){
	req.paredUrl=url.parse(req.url,true);
	var pathname=req.paredUrl.pathname;
	console.log('pathname:'+pathname);
	if(pathname==='/'){
		require('./chatroom')().getRoom(req,res);
	}else{
		res.end('error url');
	}
}).listen(9000);
var clients=[];
var io = require('socket.io').listen(app);
var chat = io.of('/chat')
.on('connection',function(socket){
	clients.push(socket);
	socket.on('sendMessage', function (data) {
	    console.log('sendMessage:'+data);
	    console.log('clients.length:'+clients.length);
	    for(var key in clients){
	    		console.log(['socket:',clients[key]]);
	    		clients[key].emit('getMessage',data);
	    }
	});
})
console.log('chatroom server startup on http://localhost:9000');