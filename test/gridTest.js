var Grid = require('../game/grid');
var assert = require('assert');

describe('Grid', function () {

    var size = {h: 3, w: 3};
    var grid = new Grid(size);

    it('should initialise a (2,2) grid with all ones', function () {    
        grid.populateWith(1);
        var position = {x: 0, y: 0};
        assert.equal(grid.stateAt(position), 1);
    });
    it('should initialise a (2,2) grid with all zeros', function () {
        var grid = new Grid(size);
        grid.populateWith(0);
        var position = {x: 0, y: 0};
        assert.equal(grid.stateAt(position), 0);
    });
    it('should poplate only 0,0 and 0,1 cells', function () {
        var grid = new Grid(size);
        grid.populateWith(0);
        var position1 = {x: 0, y: 0};
        var position2 = {x: 0, y: 1};
        var positions = [position1, position2];
        grid.populateParticulars(positions);
        assert.equal(grid.stateAt(position1), 1);
        assert.equal(grid.stateAt(position2), 1);
        assert.equal(grid.stateAt({x:1, y:1}), 0);
    });
    it('should poplate only (0,0)th cell', function () {
        var grid = new Grid(size);
        grid.populateWith(0);
        var position = {x: 0, y: 0};
        grid.populateParticular(position);
        assert.equal(grid.stateAt(position), 1);
        assert.equal(grid.stateAt({x:1, y:1}), 0);
    });
    it('should kill a cell', function () {
        var grid = new Grid({h: 2, w: 2});
        grid.populateWith(1);
        var position = {x: 0, y: 1};
        grid.kill(position);
        assert.equal(grid.stateAt(position), 0);
    });
    it('should give left neighbour of a cell', function () {
        var cellPosition = {x:0, y:1};
        var neighbourCellPosition = grid.leftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.y, 0);
        assert.equal(neighbourCellPosition.x, 0);
    });
    it('should give rightmost neighbour if there is no neighbour to the left of a cell', function () {
        var cellPosition = {x:0, y:0};
        var neighbourCellPosition = grid.leftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.y, 2);
        assert.equal(neighbourCellPosition.x, 0);
    });
    it('should give right neighbour of a cell', function () {
        var cellPosition = {x:0, y:1};
        var neighbourCellPosition = grid.rightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.y, 2);
        assert.equal(neighbourCellPosition.x, 0);
    });
    it('should give leftmost neighbour if there is no neighbour to the right of a cell', function () {
        var cellPosition = {x:0, y:2};
        var neighbourCellPosition = grid.rightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.y, 0);
        assert.equal(neighbourCellPosition.x, 0);
    });
    it('should give top neighbour of a cell', function () {
        var cellPosition = {x:2, y:0};
        var neighbourCellPosition = grid.topNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 1);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give bottommost neighbour if there is no neighbour to the top of a cell', function () {
        var cellPosition = {x:0, y:0};
        var neighbourCellPosition = grid.topNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 2);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give bottom neighbour of a cell', function () {
        var cellPosition = {x:0, y:0};
        var neighbourCellPosition = grid.bottomNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 1);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give topmost neighbour if there is no neighbour to the top of a cell', function () {
        var cellPosition = {x:2, y:0};
        var neighbourCellPosition = grid.bottomNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 0);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give topLeft neighbour of a cell', function () {
        var cellPosition = {x:1, y:1};
        var neighbourCellPosition = grid.topLeftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 0);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give bottommost neighbour if there is no neighbour to the topLeft of a cell', function () {
        var cellPosition = {x:0, y:1};
        var neighbourCellPosition = grid.topLeftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 2);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give bottomLeft neighbour of a cell', function () {
        var cellPosition = {x:1, y:1};
        var neighbourCellPosition = grid.bottomLeftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 2);
        assert.equal(neighbourCellPosition.y, 0);
    });
    it('should give topMost neighbour if there is no neighbour to the bottomLeft of a cell', function () {
        var cellPosition = {x:2, y:0};
        var neighbourCellPosition = grid.bottomLeftNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 0);
        assert.equal(neighbourCellPosition.y, 2);
    });
    it('should give topRight neighbour of a cell', function () {
        var cellPosition = {x:1, y:1};
        var neighbourCellPosition = grid.topRightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 0);
        assert.equal(neighbourCellPosition.y, 2);
    });
    it('should give bottommost neighbour if there is no neighbour to the topRight of a cell', function () {
        var cellPosition = {x:0, y:1};
        var neighbourCellPosition = grid.topRightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 2);
        assert.equal(neighbourCellPosition.y, 2);
    });
    it('should give bottomRight neighbour of a cell', function () {
        var cellPosition = {x:1, y:1};
        var neighbourCellPosition = grid.bottomRightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 2);
        assert.equal(neighbourCellPosition.y, 2);
    });
    it('should give bottommost neighbour if there is no neighbour to the bottomRight of a cell', function () {
        var cellPosition = {x:2, y:0};
        var neighbourCellPosition = grid.bottomRightNeighbour(cellPosition);
        assert.equal(neighbourCellPosition.x, 0);
        assert.equal(neighbourCellPosition.y, 1);
    });
    it('should tell the number of live neighbours around a cell', function () {
        var cellPosition = {x: 1, y: 1};
        grid.kill({x: 0, y: 1});
        var totalNeighbours = grid.neighbourCountFor(cellPosition);
        assert.equal(totalNeighbours, 7);
    });
    it('should tell the number of live neighbours around a topLeft cell', function () {
        var grid = new Grid({h:5, w:5});
        grid.populateWith(1);
        var cellPosition = {x: 0, y: 0};
        var totalNeighbours = grid.neighbourCountFor(cellPosition);
        assert.equal(totalNeighbours, 8);
    });
    it('should regenerate the colony', function () {
        var grid = new Grid({h:7, w:7});
        grid.populateWith(0);
        var positions = [{x:4,y:2},{x:4,y:3},{x:4,y:4},{x:2,y:3},{x:3,y:4}];
        grid.populateParticulars(positions);
        var firstGen = grid.produceNewGeneration();
        assert.equal(firstGen.stateAt({x:3,y:2}), 1);
        assert.equal(firstGen.stateAt({x:3,y:4}), 1);
        assert.equal(firstGen.stateAt({x:4,y:3}), 1);
        assert.equal(firstGen.stateAt({x:4,y:4}), 1);
        assert.equal(firstGen.stateAt({x:5,y:3}), 1);
        assert.equal(firstGen.stateAt({x:5,y:2}), 0);
        assert.equal(firstGen.stateAt({x:5,y:1}), 0);
    });
    it('should give the indices of the grid which are alive', function() {
        var grid = new Grid({h:7, w:7});
        grid.populateWith(0);
        var positions = [{x:4,y:2},{x:4,y:3},{x:4,y:4}];
        grid.populateParticulars(positions);
        var indices = grid.liveCells()
        assert.deepEqual(indices, ['42','43','44']);
    });
    it('should give the indices of the grid which are dead', function() {
        var grid = new Grid({h:2, w:2});
        grid.populateWith(0);
        var positions = [{x:0,y:0},{x:0,y:1},{x:1,y:0}];
        grid.populateParticulars(positions);
        var indices = grid.deadCells()
        assert.deepEqual(indices, ['11']);
    });
});