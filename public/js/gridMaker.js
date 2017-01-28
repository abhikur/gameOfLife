function makeGrid() {
	var grid = [];
	for(i=0; i < 7; i++) {
		var tag = '<div class="row">';
		for(j=0; j < 7; j++) {
			tag += '<button class="butt" id="' + i + j + '"onclick="clicked(\'' + i + j + '\')"></button>';
		}
		tag += '</div><br>';
		grid.push(tag);
	}
	grid.push('<br><button onclick="startGame()">start</button>');
	return grid.join('');
}

function insertGrid() {
	var grid = makeGrid();
	document.querySelectorAll('.container')[0].innerHTML = grid;
}

window.onload = function() {
	insertGrid();
}