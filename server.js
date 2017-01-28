var express = require('express');
var app = express();
var Grid = require('./game/grid.js');
var bodyParser = require('body-parser');
var grid;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(req, res) {
	 grid = new Grid({h:7,w:7});
	grid.populateWith(0);
	res.sendFile(__dirname + '/public/html/game.html')
})

app.post('/populateCell', function(req, res) {
	var cell = req.body.cellId.split('');
	var position = {x: cell[0], y: cell[1]};
	grid.populateParticular(position);
	res.send("success");
})

app.get('/newGeneration', function(req, res) {
	grid = grid.produceNewGeneration();
	var liveCells = grid.liveCells();
	var deadCells = grid.deadCells();
	res.send({live:liveCells, dead: deadCells});
})

app.listen(3000, function() {console.log('listening at : 3000..')});