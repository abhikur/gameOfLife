function Grid(size) {
    this.size = size;
    this.grid = [];
    this.allNeighbourPositions = ['leftNeighbour', 
                                  'rightNeighbour',
                                  'topNeighbour',
                                  'bottomNeighbour',
                                  'topLeftNeighbour',
                                  'topRightNeighbour',
                                  'bottomLeftNeighbour',
                                  'bottomRightNeighbour'
                                 ];
}

Grid.prototype.populateWith = function (state) {
    for (var i = 0; i < this.size.h; i++) {
        var row = [];
        for (var j = 0; j < this.size.w; j++) {
            row.push(state);
        }
        this.grid.push(row);
    }
};

Grid.prototype.populateParticulars = function(positions) {
    var self = this;
    positions.forEach(function(position) {
        self.grid[position.x][position.y] = 1;
    });
}

Grid.prototype.leftNeighbour = function (position) {
    var neighbour = {x:position.x};
    neighbour.y = position.y <= 0 ? this.size.w - 1 : position.y - 1;
    return neighbour;
};

Grid.prototype.rightNeighbour = function (position) {
    var neighbour = {x:position.x};
    neighbour.y = position.y >= this.size.w - 1 ? 0 : position.y + 1;
    return neighbour;
};

Grid.prototype.topNeighbour = function (position) {
    var neighbour = {y:position.y};
    neighbour.x = position.x <= 0 ? this.size.h - 1 : position.x - 1;
    return neighbour;
};

Grid.prototype.bottomNeighbour = function (position) {
    var neighbour = {y:position.y};
    neighbour.x = position.x >= this.size.h - 1 ? 0 : position.x + 1;
    return neighbour;
};

Grid.prototype.topLeftNeighbour = function (position) {
    var neighbour = {};
    neighbour.x = position.x <= 0 ? this.size.h - 1 : position.x - 1;
    neighbour.y = position.y <= 0 ? this.size.w - 1 : position.y - 1;
    return neighbour;
};

Grid.prototype.bottomLeftNeighbour = function (position) {
    var neighbour = {};
    neighbour.x = position.x >= this.size.h - 1 ? 0 : position.x + 1;
    neighbour.y = position.y <= 0 ? this.size.w - 1 : position.y - 1;
    return neighbour;
};

Grid.prototype.topRightNeighbour = function (position) {
    var neighbour = {};
    neighbour.x = position.x <= 0 ? this.size.h - 1 : position.x - 1;
    neighbour.y = position.y >= this.size.w - 1 ? 0 : position.y + 1;
    return neighbour;
};

Grid.prototype.bottomRightNeighbour = function (position) {
    var neighbour = {};
    neighbour.x = position.x >= this.size.h - 1 ? 0 : position.x + 1;
    neighbour.y = position.y >= this.size.w - 1 ? 0 : position.y + 1;
    return neighbour;
};

Grid.prototype.stateAt = function (position) {
    return this.grid[position.x][position.y];
};

Grid.prototype.kill = function (position) {
    this.grid[position.x][position.y] = 0;  
};

Grid.prototype.spawn = function (position) {
    this.grid[position.x][position.y] = 1;
};

Grid.prototype.neighbourCountFor = function (position) {
    var totalNeighbours = 0;
    var self = this;
    this.allNeighbourPositions.forEach(function (neighbour) {
        if(self.stateAt(self[neighbour](position)))
            totalNeighbours++
    });
    return totalNeighbours;
};

Grid.prototype.produceNewGeneration = function () {
    var newGrid = new Grid(this.size);
    newGrid.populateWith(0);
    var self = this;
    for (var i = 0; i < this.size.h; i++) {
        for (var j = 0; j < this.size.w; j++) {
            var position = {x:i, y:j};
            if(this.neighbourCountFor(position) < 2 || this.neighbourCountFor(position) > 3) newGrid.kill(position);
            else if(this.neighbourCountFor(position) == 3 ) newGrid.spawn(position);
            else if (this.neighbourCountFor(position) == 2 )
                newGrid.grid[position.x][position.y] = self.grid[position.x][position.y];
        }
    }
    return newGrid;
};

module.exports = Grid;