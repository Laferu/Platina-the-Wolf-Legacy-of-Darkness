/*:
-------------------------------------------------------------------------------
@title Grid Target Area
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.2
@date Aug 22, 2020
@filename HIME_GridTargetArea.js
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
@plugindesc v1.2 - Adds area of effect targeting
@help 
-------------------------------------------------------------------------------
== Description ==



== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

* 1.2
  - load area of effect data after we create game objects.  
* 1.1 - Aug 22, 2020
  - store "selecting actor" in actor and enemy selection windows.
    BattleManager.actor might actually change while updating index
  - fixed "select" overwrite for Window_BattleActor and Enemy  
* 1.0
  - initial release

== Usage ==

First, create a new map. This will be your "Area of Effect" map where you
set up all of you area of effects. Update the plugin parameter to point to
the ID of this new map.

  -- Area of Effect Regions --
  
You can create area of effects by drawing regions on the map. The position
of each region will be directly used as your area of effect in-game.

Area of effects are grouped by region ID, so you might consider drawing them
in their own area, though of course that's up to you.

  -- Area of Effect Events --
  
To add properties to your area of effect, we use events. Create an event
on the region, and then write two comments

  <area of effect>
  </area of effect>
  
Everything in between will be treated as data for that AOE tile.
There are two properties right now, which you will also create as comments.

  <name: AOE_NAME>
  
This is name you can use for your AOE. By default the name of the AOE is
the region ID like 1, 2, 3, etc but that might not be obvious when you're
assigning AOE's to your skills.

  <origin>
  
The origin is basically which AOE tile will be used drawn at your cursor.
By default it's the top-left corner of the AOE box, but you can change this
to any other valid AOE tile.

  -- Example --
  
Say you had a 3x3 square, and you wanted the very center tile to be the
origin of the AOE. You would create an event at that tile, and then in
a comment write
  
  <area of effect>
    <name: square3x3center>
    <origin>
  </area of effect>
  
  -- Assigning AOE to skills/items --
  
Use the following note-tag for skills and items

  <targetAOE: AOE_NAME>
  
Whre the AOE_NAME is the name you gave to your AOE. So with the example
before, I called it square3x3center, so now I will use the tag

  <targetAOE: square3x3center>
  
When you test your skill, you should see the AOE highlights.

-------------------------------------------------------------------------------
@param Area of Effect Map
@desc ID of the map(s) that holds all your area of effects.
@default 999
-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_GridTargetArea = 1;
TH.GridTargetArea = TH.GridTargetArea || {};

if (!Imported.TH_GridBattle) {
  throw new Error("Grid Target Area plugin must be placed below Grid Battle");
}

/* An area of effect object. Describes a lot of things... */
class TargetArea {
  constructor(id) {
    this.id = id
    this.name = id.toString();
    this._grid;
  }
  
  get grid() {
    return this._grid;
  }
  
  setGrid(grid) {
    this._grid = grid;
  }
  
  setName(name) {
    this.name = name;
  }
  
  getNodes() {
    return this._grid.nodes;
  }
  
  get width() {
    this._grid._numCols;
  }
  
  get height() {
    this._grid._numRows;
  }
}

/* Represents an area of effect */
class AOEGrid extends Grid {
  createNode(id, row, col) {
    return new AOENode(this, id, row, col);
  }
  
  // only return the nodes that have a value
  get nodes() {
    var nodes = [];
    for (var i = 0; i < this._nodes.length; i++) {
      var node = this._nodes[i];
      if (node.isActive()) {
        nodes.push(node);
      }
    }
    return nodes;
  }
}

/* An area of effect node. Holds some data */
class AOENode extends Node {
  
  init() {
    super.init();
    this._active = false;
  }
  
  isActive() {
    return this._active;
  }
  
  setActive(bool) {
    this._active = bool;
  }
}

class Sprite_AOENode extends Sprite_Node {
}

class Sprite_AOEGrid extends Sprite_Grid {
  createSprite(node) {    
    return new Sprite_Node(node)
  }
}

(function ($) {
  
  // get the last part of script URL
  var scriptName = document.currentScript.src.split("/").pop();
  var lastDot = scriptName.lastIndexOf(".")
  
  // get plugin parameters using script name as key
  $.params = PluginManager.parameters(scriptName.substring(0, lastDot));
  $.AreaOfEffectMap = Math.floor($.params["Area of Effect Map"].trim());
  
  $.SkillRegex = /<targetAOE:\s*(.+?)\s*>/i
  $.NameRegex = /<name:\s*(.+?)\s*>/i
  
  DataManager._databaseFiles.push(
    { name: '$dataAreaOfEffects', src: 'Map%1.json'.format($.AreaOfEffectMap.padZero(3)) }
  )
  
  $.collectAOEComments = function(list) {
    var res = []
    var add = false;
    for (var i = 0; i < list.length; i++) {
      var cmd = list[i];
      if (cmd.code === 108 || cmd.code == 408) {
        var s = cmd.parameters[0].toLowerCase();
        if (add) {
          res.push(s);
        }
        else if (s.contains("<area of effect>")) {
          add = true
          res.push(s);
        }
        else if (s.contains("</area of effect")) {
          res.push(s);
          add = false;
        }
      }
    }
    return res;
  }
  
  $.loadAOEEvent = function(aoe, grid, node, ev) {
    var list = ev.pages[0].list
    var comments = $.collectAOEComments(list);
    var match;
    for (var i = 0; i < comments.length; i++) {
      var s = comments[i];
      
      if (s.contains("<origin>")) {
        grid.setOrigin(node.col, node.row);
      }
      else if (s.contains("<no effect>")) {
        node.setActive(false);
      }
      else if (match = s.match($.NameRegex)) {
        aoe.setName(match[1]);
      }
    }
  }
  
  $.itemAOE = function(item) {
    if (!item) {
      return "";
    }
    if (item.targetAOE === undefined) {
      item.targetAOE = "";
      var match = item.note.match($.SkillRegex);
      if (match) {
        item.targetAOE = match[1];        
      }
    }
    return item.targetAOE;
  }
  
  var TH_DataManager_loadDataFile = DataManager.loadDataFile;
  DataManager.loadDataFile = function(name, src) {
    if (name === "$dataAreaOfEffects") {
      src = src.replace("Test_", "");
    }
    TH_DataManager_loadDataFile.call(this, name, src);
  }
  
  var TH_DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function(object) {
    if (object === $dataAreaOfEffects) {
      // we'll just store here for now unparsed
      $dataAreaOfEffects = object;
    }
    else {
      TH_DataManager_onLoad.call(this, object);
    }
  }
  
  var TH_DataManager_createGameObjects = DataManager.createGameObjects
  DataManager.createGameObjects = function() {
    TH_DataManager_createGameObjects.call(this);
    this.loadAreaOfEffects($dataAreaOfEffects);
  }
  
  DataManager.loadAreaOfEffects = function(mapObject) {
    if ($dataGridShapes !== null) {
      return
    }
    var tilePerLayer = mapObject.width * mapObject.height
    var regionTiles = mapObject.data.slice(tilePerLayer * 5)
    var events = {}
    $dataGridShapes = {}
    
    // cache events based on position
    for (var i = 1; i < mapObject.events.length; i++) {      
      var ev = mapObject.events[i];
      if (ev) {
        events[ev.y * mapObject.width + ev.x] = ev;
      }
    }
    
    // load regions from map into groups. Should probably move into core
    var map = new Map();
    for (var i = 0; i < regionTiles.length; i++) {
      var region = regionTiles[i];
      if (region > 0) {
        if (!map.has(region)) {
          map.set(region, [])
        }
        map.get(region).push(i)
      }
    }
    
    map.forEach( (arr, region) => {      
      // figure out the bounding box min-row, max-row, min-col, max-col
      var minRow = 99999;
      var maxRow = 0;
      var minCol = 99999;
      var maxCol = 0;
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i]
        var row = Math.floor(index / mapObject.width)
        var col = Math.floor(index % mapObject.width)
        
        minRow = Math.min(minRow, row);
        maxRow = Math.max(maxRow, row);
        
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
      }
      
      // generate indices for new map
      var aoe = new TargetArea(region);
      var rows = maxRow - minRow + 1
      var cols = maxCol - minCol + 1     
      var grid = new AOEGrid();
      grid.build(rows, cols);      
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i]
        var row = Math.floor(index / mapObject.width) - minRow
        var col = Math.floor(index % mapObject.width) - minCol
        
        var node = grid.getNode(row, col);
        node.setActive(true);
        
        // maybe some extra info to store with the node?
        var ev = events[index];
        if (ev) {
          $.loadAOEEvent(aoe, grid, node, ev);
        }        
      }
      aoe.setGrid(grid);
      // AOE default name is region ID, but can also be a manually chosen name
      $dataGridShapes[aoe.name] = aoe;
    });
  };

  GridManager.prototype.updateTargetSelection = function(node, action) {
    if (action) {      
      var battler = node._battler;
      if (battler) {
        this.getGrid(node).highlight(node, action);
      }
    }
  }
 
  /*************************************************************/
    
  BattleGrid.prototype.getTargetNodes = function(node, action) {    
    var target = $.itemAOE(action.item());
    target = target.toLowerCase().trim()
    var aoe = $dataGridShapes[target];
    if (aoe) {
      // use grid intersection! Fancy
      return this.intersect(aoe.grid, [node.row, node.col]);
    }
    else {
      // maybe it's defined as a method?
      var methodName = target + "Nodes";    
      if (this[methodName]) {
        return this[methodName].call(this, node);
      }
    }  
    
    // can't find anything? Just assume no AOE
    return [node];
  }
  
  BattleGrid.prototype.allemptyNodes = function(node) {
    if (!node) {
      return []
    }
    var nodes = [];
    this._nodes.forEach( node => {
      
      if (!node._battler) {
        nodes.push(node);
      }
    });
    return nodes;
  }
  
  BattleGrid.prototype.squareNodes = function(node) {
    if (!node) {
      return []
    }
    var srow = node.row
    var scol = node.col
    var nodes = new Set()
    for (var i = 0 ; i < 2; i++) {
      for (var j = 0; j < 2; j++) {
        var node = this.getNode(srow + i, scol + j)
        if (node) {
          nodes.add(node)
        }
      }
    }
    return Array.from(nodes);
  }

  /*************************************************************/  

  BattleManager.updateTargetSelection = function(node, action) {
    this._gridManager.updateTargetSelection(node, action);
  }
  
  // It's supposed to clear only the highlights for the given action
  // if we were supporting multiple action selection or something
  BattleManager.clearTargetHighlights = function(node, action) {
    this.clearHighlights(node);
  }
  
  /*************************************************************/  
  
  // Intercept targets before repeat. This is the final set of targets
  // that were chosen, so we need to perform AoE computation on these targets
  var TH_GameAction_repeatTargets = Game_Action.prototype.repeatTargets;
  Game_Action.prototype.repeatTargets = function(targets) {
    targets = this.getGridTargets(targets);
    return TH_GameAction_repeatTargets.call(this, targets);
  }
    
  // Given a list of targets, resolve AoE processing
  Game_Action.prototype.getGridTargets = function(targets) {        
    var newTargets = new Set()       
    
    targets.forEach( battler => {            
      if (battler) {
        newTargets.add(battler);
      }
    })
    
    // add more targets to the set. 
    // seems like we can have null targets as well.
    for (var i = 0; i < targets.length; i++) {
      if (targets[i]) {
        var otherTargets = this.getGridTarget(targets[i]);
        otherTargets.forEach( battler => {
          if (battler) {
            newTargets.add(battler);
          }
        })
      }
    }
    
    var battlers = []
    newTargets.forEach( target => {
      if (this.canTarget(target)) {
        
        battlers.push(target);
      }
    })
    return battlers;
  }  
  
  // get targets on the grid, given a specified node and action
  Game_Action.prototype.getGridTarget = function(target) {
    return BattleManager.getTargets(target.getBattleNode(), this);
  }

  /************************************************************/
  
  var TH_SceneBattle_onEnemyOk = Scene_Battle.prototype.onEnemyOk
  Scene_Battle.prototype.onEnemyOk = function() {    
    TH_SceneBattle_onEnemyOk.call(this);
    var enemy = this._enemyWindow.enemy();
    if (enemy) {
      BattleManager.clearHighlights(enemy.getBattleNode());
    }
  };

  var TH_SceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function() {    
    TH_SceneBattle_onEnemyCancel.call(this);
    var enemy = this._enemyWindow.enemy();
    if (enemy) {
      BattleManager.clearHighlights(enemy.getBattleNode());
    }
  };
  
  /* Store the actor that is currently making a selection */
  var TH_WindowBattleActor_show = Window_BattleActor.prototype.show
  Window_BattleActor.prototype.show = function() {
    TH_WindowBattleActor_show.call(this);
    this._selectingActor = BattleManager.actor();
  };
  
  var TH_WindowBattleActor_hide = Window_BattleActor.prototype.hide
  Window_BattleActor.prototype.hide = function() {
    TH_WindowBattleActor_hide.call(this);
    this._selectingActor = null;
  };
  
  var TH_WindowBattleActor_select = Window_BattleActor.prototype.select
  Window_BattleActor.prototype.select = function(index) {
    var lastActor = this.actor(this._index);
    if (lastActor) {
      BattleManager.clearTargetHighlights(lastActor.getBattleNode());
    }
    TH_WindowBattleActor_select.call(this, index);
    var actor = this.actor(this.index());
    if (this._selectingActor && actor) {                
      var node = actor.getBattleNode();
      var action = this._selectingActor.currentAction();
      BattleManager.updateTargetSelection(node, action);
    }
  };
  
  var TH_WindowBattleActor_processOk = Window_BattleActor.prototype.processOk
  Window_BattleActor.prototype.processOk = function() {
    TH_WindowBattleActor_processOk.call(this);
    var actor = this.actor(this.index());
    if (actor) {
      BattleManager.clearTargetHighlights(actor.getBattleNode());
    }
  }
  
  var TH_WindowBattleActor_processCancel = Window_BattleActor.prototype.processCancel
  Window_BattleActor.prototype.processCancel = function() {    
    TH_WindowBattleActor_processCancel.call(this);
    var actor = this.actor(this.index());
    if (actor) {
      BattleManager.clearTargetHighlights(actor.getBattleNode());
    }
  }
  
  /* Store the Enemy that is currently making a selection */
  var TH_WindowBattleEnemy_show = Window_BattleEnemy.prototype.show
  Window_BattleEnemy.prototype.show = function() {
    TH_WindowBattleEnemy_show.call(this);
    this._selectingActor = BattleManager.actor();
  };
  
  var TH_WindowBattleEnemy_hide = Window_BattleEnemy.prototype.hide
  Window_BattleEnemy.prototype.hide = function() {
    TH_WindowBattleEnemy_hide.call(this);
    this._selectingActor = null;
  };
  
  var TH_WindowBattleEnemy_select = Window_BattleEnemy.prototype.select
  Window_BattleEnemy.prototype.select = function(index) {
    var lastEnemy = this.enemy();
    if (lastEnemy) {
      BattleManager.clearTargetHighlights(lastEnemy.getBattleNode());
    }
    
    TH_WindowBattleEnemy_select.call(this, index);
    var enemy = this.enemy();
    if (this._selectingActor && enemy) {
      
      // we assume only actors should be selecting actions
      var node = enemy.getBattleNode();
      var action = this._selectingActor.currentAction();                  
      BattleManager.updateTargetSelection(node, action);
    }
  }
  
  var TH_WindowBattleEnemy_processOk = Window_BattleEnemy.prototype.processOk
  Window_BattleEnemy.prototype.processOk = function() {
    TH_WindowBattleEnemy_processOk.call(this);
    var enemy = this.enemy();
    if (enemy) {
      BattleManager.clearTargetHighlights(enemy.getBattleNode());
    }
  }
  
  var TH_WindowBattleEnemy_processCancel = Window_BattleEnemy.prototype.processCancel
  Window_BattleEnemy.prototype.processCancel = function() {
    TH_WindowBattleEnemy_processCancel.call(this);
    var enemy = this.enemy();
    if (enemy) {
      BattleManager.clearTargetHighlights(enemy.getBattleNode());
    }
  }
  
  
})(TH.GridTargetArea);