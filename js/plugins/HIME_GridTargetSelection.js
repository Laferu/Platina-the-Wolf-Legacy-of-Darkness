/*:
-------------------------------------------------------------------------------
@title Grid Target Selection
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Sep 9, 2020
@filename HIME_GridTargetSelection.js
@url https://himeworks.com/2020/09/grid-battle-engine-target-selection/
@

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
@plugindesc v1.1 - Changes the way target selection is done, by selecting
tiles on the grid instead of actor/enemy selection
@help 
-------------------------------------------------------------------------------
== Description ==

In RPG Maker, we have items and skills which represent actions that battlers
use to interact with one another. For example, you have skills such as
â€œAttackâ€ or â€œGuardâ€ or â€œHealâ€, or you have items such as â€œPotionâ€ or
â€œMagic Waterâ€.

The list of targets for each action is based on the â€œscopeâ€, such as
â€œOne Allyâ€, â€œOne Enemyâ€, â€œAll Alive Alliesâ€ and so on. The game then presents
a list of targets that you can select based on that scope.

With grid-based target selection, I give you more freedom over who you want
to target. Instead of choosing an actor or enemy directly, you choose the tile
that theyâ€™re standing on, which could be an empty tile depending on the scope
of your action.

Combined with other battle mechanics such as Area of Effect or Grid Movement,
this add-on for the Grid Battle Engine can provide your game with an additional
element of strategy.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

* 1.1 - Sep 9, 2020
  - fixed "isEnabled" to check if node is selectable
* 1.0

== Usage ==

This plugin is mostly plug-n-play, but there are a few things to know
about how this plugin works.

-- Valid Grids -- 

You will only be able to select targets on grids that have a valid target.
For example, if your skill is for enemies only, you would only be able to
select grids that have enemies. On the other hand, if your skill is for
actors only, you would only be able to select grids that have actors.

For a single-grid battle, where all enemies and actors are on the same grid,
this doesnâ€™t really matter. For multi-grid battle, where enemies and actors
may be on different grids, this becomes more apparent.

-- Empty Tile Condition --

This is a special condition that allows you to target empty tiles. By default,
an action canâ€™t be used if there are no valid targets on the selected tile
(or around the tile, in the case of area of effect).

This isnâ€™t an issue normally, but there may be certain types of skills where
empty tile selection is required, such as moving to an empty tile.

To enable empty tile selection, add the note-tag

  <empty tile: required>

-- User Grid Only -- 

There are situations where you only want to be able to target the userâ€™s grid only.
You can use the note-tag

  <user grid only>
  
To force the game to only allow you to target the userâ€™s grid.

-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_GridTargetSelection = 1;
TH.GridTargetSelection = TH.GridTargetSelection || {}; 

function Window_GridBattleSelectable() {
    this.initialize.apply(this, arguments);
}

Window_GridBattleSelectable.prototype = Object.create(Window_GridSelectable.prototype);
Window_GridBattleSelectable.prototype.constructor = Window_GridBattleSelectable;

(function ($) {
  
  $.getScope = function(item) {
    var scope = item.meta.scope;
    if (scope) {
      return scope.trim();
    }
    return ""
  }
  
  GridManager.prototype.updateTargetSelection = function(node, action) {
    var action = BattleManager.inputtingAction();
    if (action) {
      this.clearHighlights(node);
      var grid = this.getGrid(node);
      grid._lastNode = node;
      grid.highlight(node, action);
    }
  }
  
  /************************************************************/
  
  var TH_WindowGridBattleSelectable_setGrid = Window_GridBattleSelectable.prototype.setGrid
  Window_GridBattleSelectable.prototype.setGrid = function(grid) { 
    TH_WindowGridBattleSelectable_setGrid.call(this, grid);
    this._nodeMap = {}
    var vnodes = grid.nodes;
    for (var i = 0; i < vnodes.length; i++) {
      var vnode = vnodes[i];
      var node = vnode.getValue();
      if (node) {
        this._nodeMap[node.id] = vnode;
      }
    }
  }
 
  var TH_WindowBattleGridSelectable_isCurrentItemEnabled = Window_GridBattleSelectable.prototype.isCurrentItemEnabled;
  Window_GridBattleSelectable.prototype.isCurrentItemEnabled = function() {
    var action = BattleManager.inputtingAction();
    var node = this.item();
    var targets = BattleManager.getTargets(node, action)
    var res = targets.some( battler => action.canTarget(battler))
    return res;
  }
  
  var TH_Window_GridBattleSelectable_select = Window_GridBattleSelectable.prototype.select
  Window_GridBattleSelectable.prototype.select = function(index) {
    var oldNode = this.item();
    if (oldNode) {
      BattleManager.clearHighlights(oldNode);
    }
    TH_Window_GridBattleSelectable_select.call(this, index);    
    var node = this.item();
    if (node) {
      BattleManager.actor().setLastNode(node);
      BattleManager.updateTargetSelection(node);
    }
  }
  
  Window_GridBattleSelectable.prototype.selectLast = function() {    
    var index = 0;
    if (this._grid) {
      var node = BattleManager.actor().lastNode();           
      if (node) {           
        var vnode = this._nodeMap[node.id];
        if (vnode) {
          index = vnode.row * this.maxCols() + vnode.col;
        }
      }
    }
    // activating a window will select it, so don't need to do it twice
    this._index = index;
  }
  
  /*******************************************************************/

  BattleManager.updateTargetSelection = function(node) {
    var action = this.inputtingAction();
    this._gridManager.updateTargetSelection(node, action);
  }  
  
  /************************************************************/
  
  var TH_GameAction_clear = Game_Action.prototype.clear
  Game_Action.prototype.clear = function() {
    TH_GameAction_clear.call(this);
    this._targetNode = null;
  }
  
  Game_Action.prototype.setTargetNode = function(node) {
    this._targetNode = node;
  }
  
  Game_Action.prototype.getTargetNode = function(node) {
    return this._targetNode;
  }
  
  var TH_GameAction_makeTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function() {
    var targets;
    if (this._targetNode) {
      targets = this.makeGridTargets();
    }
    else {
      targets = TH_GameAction_makeTargets.call(this);;
    }
    return targets;
  };
  
  Game_Action.prototype.makeGridTargets = function() {
    var targets = BattleManager.getTargets(this._targetNode, this);
    var battlers = []
    targets.forEach( target => {
      if (this.canTarget(target)) {
        battlers.push(target);
      }
    })
    return battlers;
  }  
  
  /************************************************************/
  
  var TH_GameBattler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    TH_GameBattler_initMembers.call(this);
    this._lastNode = null;
  }
  
  Game_Battler.prototype.setLastNode = function(node) {
    this._lastNodeId = node.id;
  }
  
  Game_Battler.prototype.lastNode = function() {
    return BattleManager.getBattleNode(this._lastNodeId);
  }
  
  /************************************************************/
  
  var TH_SceneBattle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive
  Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return this._gridCommandWindow.active || TH_SceneBattle_isAnyInputWindowActive.call(this)
  }
    
  var TH_SceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows
  Scene_Battle.prototype.createAllWindows = function() {    
    TH_SceneBattle_createAllWindows.call(this);
    this.createGridWindow();    
  };
  
  Scene_Battle.prototype.createGridWindow = function() {
    var height = Graphics.height - (Graphics.height - this._actorWindow.y);
    this._gridCommandWindow = new Window_GridBattleSelectable(0, 0, Graphics.width, height);
    this._gridCommandWindow.setHandler('ok', this.onGridOk.bind(this));
    this._gridCommandWindow.setHandler('cancel',  this.onGridCancel.bind(this));
    this.addChild(this._gridCommandWindow);    
  }
  
  // overwrite with grid targeting
  Scene_Battle.prototype.selectActorSelection = function() {
    this.startGridSelection();
  };
  
  // MZ
  Scene_Battle.prototype.startActorSelection = function() {
    this.startGridSelection();
  };
  
  // overwrite with grid targeting.
  Scene_Battle.prototype.selectEnemySelection = function() {
    this.startGridSelection();
  };
  
  // MZ
  Scene_Battle.prototype.startEnemySelection = function() {
    this.startGridSelection();
  };
  
  Scene_Battle.prototype.getGridForSelection = function() {
    var actor = BattleManager.actor();
    var action = BattleManager.inputtingAction();
    var grids = BattleManager.getAllGrids();    
    var gridSet = [];    
    var userGrid = BattleManager.getGrid(actor.getBattleNode())
    
    // determine if grid should be allowed
    grids.forEach( grid => {
      var nodes = grid.nodes;
      var addGrid = false;
      for (var i = 0; i < nodes.length; i++) {
        var battlers = nodes[i].getBattlers();
        for (var j = 0; j < battlers.length; j++) {
          if (action.canTarget(battlers[j])) {
            
            // if (action.isForOpponent() && userGrid !== grid) {
              // addGrid = true;
              // break;
            // }
            // else if (action.isForFriend() && userGrid === grid) {
              // addGrid = true;
              // break;
            // }            
            addGrid = true;
            break;
          }
        }
      }
      if (addGrid) {
        gridSet.push(grid)
      }
    });
    
    virtualGrid = BattleManager._gridManager.joinGrids(gridSet);
    return virtualGrid;
  }
  
  Scene_Battle.prototype.startGridSelection = function() {
    var grid = this.getGridForSelection();
    this._gridCommandWindow.setGrid(grid);
    this._gridCommandWindow.refresh();
    this._gridCommandWindow.selectLast();
    this._gridCommandWindow.activate();
  }
  
  var TH_SceneBattle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
  Scene_Battle.prototype.selectNextCommand = function() {
    TH_SceneBattle_selectNextCommand.call(this);
    var node = this._gridCommandWindow.item()
    if (node) {
      BattleManager.clearHighlights(node);
    }
  };
  
  Scene_Battle.prototype.onGridOk = function() {
    var action = BattleManager.inputtingAction();
    var node = this._gridCommandWindow.item();
    action.setTargetNode(node);
    this._skillWindow.hide();
    this._itemWindow.hide();
    this.selectNextCommand();
  }
  
  /* If there are extra command windows this will freeze the game
   * if they don't put it under onEnemyCancel!
   */
  Scene_Battle.prototype.onGridCancel = function() {
    this.onEnemyCancel();
    var node = this._gridCommandWindow.item();
    BattleManager.clearHighlights(node);
  }
  
})(TH.GridTargetSelection);