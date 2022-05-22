/*:
-------------------------------------------------------------------------------
@target MV MZ
@title Grid Core
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.2
@date Sep 9, 2020
@filename HIME_GridCore.js
@url 

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.2 - Core grid functionality
@help 
-------------------------------------------------------------------------------
== Description ==

Just some core grid functionality.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.2 
 * changed node ID to include grid ID as well
1.1 - Aug 24, 2020
 * added support for grid union
 * added support for grid intersection

== Usage ==


-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_GridCore = 1;
TH.GridCore = TH.GridCore || {}; 

const GRID_WIDTH = 64 // hardcoded
const GRID_HEIGHT = 64 // hardcoded

// represents a node on the grid. Stores adjacent nodes

function TilePosition() {
    this.initialize.apply(this, arguments);
}

TilePosition.prototype.initialize = function(row, col) {
  this._row = row;
  this._column = col
}

Object.defineProperty(TilePosition.prototype, 'row', {
    get: function() {
      return this._row;
    },
    set: function(row) {
      this._row = row;
    },
    configurable: true
});

Object.defineProperty(TilePosition.prototype, 'column', {
    get: function() {
      return this._column;
    },
    set: function(column) {
      this._column = column;
    },
    configurable: true
});

function Node() {
    this.initialize.apply(this, arguments);
}

Node.prototype.initialize = function(grid, id, row, col) {
  this._grid = grid
  this._row = row;
  this._col = col
  this._id = grid._id + "_" + id
  this._index = id;
  this._edges = []
  this._width = 0
  this._height = 0    
  this._value = null
  this.init();
}

Object.defineProperty(Node.prototype, 'row', {
    get: function() {
      return this._row;
    },
    configurable: true
});

Object.defineProperty(Node.prototype, 'col', {
    get: function() {
      return this._col;
    },
    configurable: true
});

Object.defineProperty(Node.prototype, 'grid', {
    get: function() {
      return this._grid;
    },
    configurable: true
});

Object.defineProperty(Node.prototype, 'id', {
    get: function() {
      return this._id;
    },
    configurable: true
});

Object.defineProperty(Node.prototype, 'name', {
    get: function() {
      return (this._id + 1).toString();;
    },
    configurable: true
});

Object.defineProperty(Node.prototype, 'edges', {
    get: function() {
      return this._edges;
    },
    configurable: true
});

Node.prototype.setSize = function(width, height) {
  this._width = width;
  this._height = height
}


// don't use the constructor. I might change that at anytime
Node.prototype.init = function() {
}
  
Node.prototype.getValue = function() {
  return this._value;
} 

Node.prototype.setValue = function(value) {
  this._value = value;
}
  
Node.prototype.addEdge = function(node) {
  if (node === null) {
    return
  }
  // console.log(node)
  // console.log("Connecting " +  node.id + " to " + this.id)
  this._edges.push(node);
}

// This is our graph object. It holds references to a bunch of nodes.
// For simplicity, it is a square graph
function Grid() {
    this.initialize.apply(this, arguments);
}

Grid.prototype.initialize = function(id) {
  this._id = id;
  this._nodes = [];
  this._origin = new Point(0, 0);
  this._numRows = 0
  this._numCols = 0
  this._tileWidth = GRID_WIDTH // hardcoded for now
  this._tileHeight = GRID_HEIGHT  // hardcoded for now
  this._position = new Point(0, 0);
  this.init();
}

Object.defineProperty(Grid.prototype, 'nodes', {
    get: function() {
      return this._nodes;
    },
    configurable: true
});
  
// don't use the constructor. I might change that at anytime
Grid.prototype.init = function() {
}
  
Grid.prototype.getOrigin = function() {
  return this._origin;
}
  
Grid.prototype.setOrigin = function(x, y) {
  this._origin.x = x;
  this._origin.y = y;
}
  
Grid.prototype.setPosition = function(x, y) {
  this._position.x = x;
  this._position.y = y;
}
  
Grid.prototype.setTileWidth = function(width) {
  this._tileWidth = width
}
  
Grid.prototype.setTileHeight = function(height) {
  this._tileHeight = height
}
  
// Call build when you've set up the properties you want
// Will change this in the future to accept no parameters
// so that you need to say things like new Grid().rows(5).cols(5).build()
Grid.prototype.build = function(rows, cols) {
  this._numRows = rows;
  this._numCols = cols;
  var width = this._tileWidth;
  var height = this._tileHeight;
  for (var row = 0; row < this._numRows; row++) {    
    for (var col = 0; col < this._numCols; col++) {  
      var id = (row * this._numCols + col);
      var node = this.createNode(id, row, col);
      node.setSize(width, height);
      node.init();
      this.setNode(row, col, node);
    }
  }
  this.connectNodes();
}
  
Grid.prototype.setNode = function(row, col, node) {
  var index = row * this._numCols + col
  this._nodes[index] = node;
}

Grid.prototype.getNode = function(row, col) {
  if (row < 0 || row >= this._numRows || col < 0 || col >= this._numCols) {
    return null;
  }
  var index = row * this._numCols + col
  return this._nodes[index];
}
  
Grid.prototype.createNode = function(id, row, col) {
  return new Node(this, id, row, col);
}
  
Grid.prototype.connectNodes = function() {
}

/* Given this grid A and other grid B, take the intersection
 * of A and B and return all of the nodes from this grid
 * that are in the intersection
 */
Grid.prototype.intersect = function(otherGrid, position) {
  var rowOfs = position[0];
  var colOfs = position[1];
  
  var otherWidth = otherGrid._numCols;
  var otherHeight = otherGrid._numRows;
  var otherNodes = otherGrid.nodes;
  var otherOrigin = otherGrid.getOrigin();
  
  var nodes = new Set();
  for (var i = 0; i < otherNodes.length; i++) {
    var otherNode = otherNodes[i];
    var row = otherNode.row + rowOfs - otherOrigin.y;
    var col = otherNode.col + colOfs - otherOrigin.x;
    var node = this.getNode(row, col);
    if (node) {
      nodes.add(node);
    }
  }
  return nodes;
}

/* Given this grid A and other grid B, returns all of the
 * nodes from this grid subtract the ones that intersect
 * with B. Basically the opposite of intersect.
 */
Grid.prototype.subtract = function(otherGrid, position) {
  
  var intersect = this.intersect(otherGrid, position)
  var difference = this.nodes.filter( x => !intersect.has(x) )
  return difference;
}

// takes another grid and returns a new grid that is the union
// of both grids, at the specified position. TODO: support negative
Grid.prototype.union = function(otherGrid, position) {
  
  var grid1 = this;
  var grid2 = otherGrid;
      
  var rowOffset = position[0];
  var colOffset = position[1];
  
  // if row offset is negative (eg: join on left), just flip it
  // around to do a "join on right" operation instead
  if (rowOffset < 0) {
    rowOffset *= -1
    grid1 = otherGrid;
    grid2 = this;
  }
  if (colOffset < 0) {
    colOffset *= -1
    grid1 = otherGrid;
    grid2 = this;
  }
  
  // figure out the new width and height based on position and dimensions    
  var numRows = Math.max(grid1._numRows, grid2._numRows, grid1._numRows + grid2._numRows - (grid2._numRows - rowOffset))
  var numCols = Math.max(grid1._numCols, grid2._numCols, grid1._numCols + grid2._numCols - (grid2._numCols - colOffset))
  
  // build new virtual grid
  var newGrid = new window[grid1.constructor.name]();
  newGrid.build(numRows, numCols)
    
  grid2.nodes.forEach( node => {
    var row = node._row;
    var col = node._col;
    var vnode = newGrid.getNode(row, col)
    if (vnode) {
      vnode.setValue(node.getValue());
    }
  });
  
  // transfer value to new node
  grid1.nodes.forEach( node => {
    
    var row = node._row + rowOffset;
    var col = node._col + colOffset
    var vnode = newGrid.getNode(row, col)
    if (vnode) {
      vnode.setValue(node.getValue());
    }
  });        
  
  return newGrid;
}

// this is like union, except maybe easier to use. We provide a direction
// and an offset
Grid.prototype.join = function(otherGrid, direction, offset) {    
  var row = 0;
  var col = 0;
  var rowOffset = 0;
  var colOffset = 0;
  if (offset) {
    var rowOffset = offset[0];
    var colOffset = offset[1];
  }
  direction = direction.toLowerCase();
  if (direction === "right") {
    row = rowOffset;
    col = otherGrid._numCols + colOffset      
  }
  else if (direction === "down") {
    row = otherGrid._numRows + rowOffset;
    col = colOffset      
  }
  else if (direction === "left") {
    row = rowOffset;
    col = -this._numCols + colOffset
  }
  else if (direction === "up") {
    row = -this._numRows + rowOffset;
    col = colOffset * -1
  }   
  return this.union(otherGrid, [row, col]);    
}

Grid.Identity = function() {
  console.log(this);
}

function Sprite_Node() {
    this.initialize.apply(this, arguments);
}

Sprite_Node.prototype = Object.create(PIXI.Sprite.prototype);
Sprite_Node.prototype.constructor = Sprite_Node;

Sprite_Node.prototype.initialize = function(node) {
  PIXI.Sprite.prototype.constructor.call(this);
  this._node = node;
  this.init();
}

Sprite_Node.prototype.init = function() {    
  this.drawBorder();
  this.drawGridLine();
  
  // hardcoded. 
  // this.interactive = true;
  // this.buttonMode = true;
  // this.on('mousedown', this.onMouseDown)
      // .on('touchstart', this.onMouseDown)
      // .on('mouseup', this.onMouseUp)
      // .on('mouseupoutside', this.onMouseUp)
      // .on('touchend', this.onMouseUp)
      // .on('touchendoutside', this.onMouseUp)
      // .on('mouseover', this.onMouseOver)    
}

Sprite_Node.prototype.drawBorder = function() {
  this._borderSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
  if (this._node) {
    this._borderSprite.width = this._node._width
    this._borderSprite.height = this._node._height
  }
  this._borderSprite.alpha = 0.25
  this.addChild(this._borderSprite);    
}

Sprite_Node.prototype.drawGridLine = function() {
  this._gridLineSprite = new PIXI.Graphics();
  this._gridLineSprite.lineStyle(1, 0x000000);
  if (this._node) {
    this._gridLineSprite.drawRect(0, 0, this._node._width, this._node._height);
  }
  this.addChild(this._gridLineSprite)
}

Sprite_Node.prototype.update = function() {
}

// Also just a test thing
Sprite_Node.prototype.drawName = function() {    
  var name = this._node.name;
  var len = name.length;
  this._nameSpr = new PIXI.Text(name, {fontFamily : 'Arial', fontSize: 24, fill : 0xffFF00, align : 'center'});
  this._nameSpr.x += 5 - (1 * len)
  this._nameSpr.y += 24
  this.addChild(this._nameSpr);
}

Sprite_Node.prototype.drawPosition = function() {
  var name = "(" + this.x + "," + this.y +")"
  var len = name.length;
  this._posSpr = new PIXI.Text(name, {fontFamily : 'Arial', fontSize: 14, fill : 0xffFF00, align : 'center'});
  this.addChild(this._posSpr);
}

Sprite_Node.prototype.drawText = function(text) {
  this._posSpr = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: 14, fill : 0xffFF00, align : 'center'});
  this.addChild(this._posSpr);
}

Sprite_Node.prototype.onMouseOver = function(event) {
}

Sprite_Node.prototype.onMouseDown = function(event) {
  this.data = event.data
  this._isDown = true;
  this.alpha = 0.5;    
}

Sprite_Node.prototype.onMouseUp = function(event) {
  if (!this._isDown) {
    return
  }
  this.alpha = 1.0;
  this.data = null
}

function Sprite_Grid() {
    this.initialize.apply(this, arguments);
}

Sprite_Grid.prototype = Object.create(PIXI.Sprite.prototype);
Sprite_Grid.prototype.constructor = Sprite_Grid;

Sprite_Grid.prototype.initialize = function(grid) {
  PIXI.Sprite.prototype.constructor.call(this);
  this._grid = grid;
  this._nodeSprites = [];
  this.create();
}

Sprite_Grid.prototype.init = function() {
}

Object.defineProperty(Sprite_Grid.prototype, 'grid', {
  get: function() {
    return this._grid;
  },
  configurable: true
});

Sprite_Grid.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
}

Sprite_Grid.prototype.create = function() {
  var grid = this._grid
  for (var row = 0; row < grid._numRows; row++) {
    for (var col = 0; col < grid._numCols; col++) {
      var node = grid.getNode(row, col);
      var x = col * node._width + (col * 0)
      var y = row * node._height + (row * 0)
      var sprite = this.createSprite(node);
      sprite.x = x;
      sprite.y = y;
      this._nodeSprites.push(sprite)
      this.addChild(sprite)
      // sprite.refresh();
      // sprite.drawName();
      // sprite.drawPosition();
      
      NodeSpriteManager.addNode(node, sprite);
    }
  }
  NodeSpriteManager.addGrid(grid, this);
}

Sprite_Grid.prototype.createSprite = function(node) {
  return new Sprite_Node(node);
}

Sprite_Grid.prototype.update = function() {
  this._nodeSprites.forEach( spr => {
    spr.update();
  });
}

function Window_GridSelectable() {
    this.initialize.apply(this, arguments);
}

Window_GridSelectable.prototype = Object.create(Window_Selectable.prototype);
Window_GridSelectable.prototype.constructor = Window_GridSelectable;

Window_GridSelectable.prototype.initialize = function(x, y, width, height) {
  // MZ does this rect check. MV doesn't
  if (this.checkRectObject) {
    Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, height));
  }
  else {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);    
  }
  
  this.margin = 0;  
  this.padding = 0;    
  this.alpha = 0;
  
  // this.hide();
};

/* Re-use our window? What if we want multiple grids to be highlighted simultaneously?
 * Might need to rewrite
 */
Window_GridSelectable.prototype.setGrid = function(grid) { 
  
  // var x = grid._position.x
  // var y = grid._position.y
  // var width = grid._numCols * grid._tileWidth;
  // var height = grid._numRows * grid._tileHeight;
  
  this._grid = grid;
  var x = 0;
  var y = 0;
  var width = Graphics.width
  var height = Graphics.height;
  // MZ
  if (this.checkRectObject) {
    
    // battlefield has a Y offset for some reason
    y -= 24;
    this.move(x, y, width, height)
  }
  else {    
    this.x = x 
    this.y = y
    this.width = width 
    this.height = height
    this.refresh();
  }
}


Window_GridSelectable._makeCursorAlpha = function() {
  return 0;
}

Window_GridSelectable.prototype.standardPadding = function() {
  return 0;
};

Window_GridSelectable.prototype.spacing = function() {
  return 0;
};

// MZ
Window_GridSelectable.prototype.rowSpacing = function() {
  return 0;
};

// MZ
Window_GridSelectable.prototype.colSpacing = function() {
  return 0;
};

Window_GridSelectable.prototype.maxCols = function() {  
  return this._grid ? this._grid._numCols : 1;
}

Window_GridSelectable.prototype.itemWidth = function() {  
  return this._grid ? this._grid._tileWidth : 1;
}

Window_GridSelectable.prototype.itemHeight = function() {  
  return this._grid ? this._grid._tileHeight : 1;
}  

Window_GridSelectable.prototype.maxItems = function() {
  return this._grid ? this._grid._numRows * this._grid._numCols : 1;
};

Window_GridSelectable.prototype.itemRect = function(index) {
  var rect = new Rectangle();
  rect.width = this.itemWidth();
  rect.height = this.itemHeight();
  var node = this._grid.nodes[index].getNode();
  if (node) {
    var nodeSpr = NodeSpriteManager.getNodeSprite(node)
    rect.x = nodeSpr.parent.x + nodeSpr.x
    rect.y = nodeSpr.parent.y + nodeSpr.y
  }
  return rect;
};

var TH_WindowGridSelectable_select = Window_GridSelectable.prototype.select
Window_GridSelectable.prototype.select = function(index) {
  if (this._grid) {
    var node = this._grid.nodes[index].getValue();
    if (node) {
      TH_WindowGridSelectable_select.call(this, index);
    }
  }
  else {
    TH_WindowGridSelectable_select.call(this, index);
  }
}

// Window_GridSelectable.prototype.drawItemBackground = function(index) {
    // no
// };

Window_GridSelectable.prototype.item = function() {
  if (this._grid) {
    var index = this._index;
    var row = Math.floor(index / this._grid._numCols);
    var col = Math.floor(index % this._grid._numCols);
    return this._grid.getNode(row, col).getValue()
  }
  return null;
};

var TH_WindowGridSelectable_isCurrentItemEnabled = Window_GridSelectable.prototype.isCurrentItemEnabled;
Window_GridSelectable.prototype.isCurrentItemEnabled = function() {
  return true;
}

Window_GridSelectable.prototype.selectLast = function() {    
  var index = 0;
  if (this._grid) {
    var node = this._grid._lastNode
    if (node) {
      index = node.row * this.maxCols() + node.col;
    }
  }
  // activating a window will select it, so don't need to do it twice
  this._index = index;
}

/*
 * Manages all highlights for grids. All requests for highlights should
 * be made through the highlight manager
 */
function HighlightManager() {
  this.initialize.apply(this, arguments);
}

HighlightManager.prototype.initialize = function() {
  this._highlights = {}
}


/*
 * Caches sprites. For convenience if you need to look it up
 */
function _NodeSpriteManager() {
    this.initialize.apply(this, arguments);
}

_NodeSpriteManager.prototype.initialize = function() {
  this.clear();
}
  
_NodeSpriteManager.prototype.clear = function() {
  this._nodeMap = new Map();
  this._gridMap = new Map();
}

_NodeSpriteManager.prototype.addNode = function(node, nodeSprite) {
  this._nodeMap.set(node, nodeSprite);
}

_NodeSpriteManager.prototype.addGrid = function(grid, gridSprite) {
  this._gridMap.set(grid, gridSprite);
}

_NodeSpriteManager.prototype.getNodeSprite = function(node) {
  return this._nodeMap.get(node);
}

_NodeSpriteManager.prototype.getGridSprite = function(node) {
  return this._gridMap.get(node);
}

// hack?
const NodeSpriteManager = new _NodeSpriteManager();