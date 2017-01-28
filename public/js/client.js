function clicked(id) {
	var dataToPost = {cellId:id};
	$.post('/populateCell', dataToPost, function(res) {
		$('#'+id).css({"background-color": "green"});
	})
}

function startGame() {
	setInterval(function() {
		$.get('/newGeneration', function(res) {

			res.live.forEach(function(id) {
				$('#'+id).css({"background-color": "green"});
			})
			res.dead.forEach(function(id) {
				$('#'+id).css({"background-color": "lightgrey"});	
			})
		})
	}, 1000)
}