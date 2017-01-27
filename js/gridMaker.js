function makeGrid() {
	var grid = [];
	for(i=0; i < 7; i++) {
		var tag = '<div class="row">';
		for(j=0; j < 7; j++) {
			tag += '<div class="grid" id="' + i + j + '"><button class="butt"onclick="clicked()"></button></div>';
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