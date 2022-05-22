/*:
-------------------------------------------------------------------------------
@title Target Any Scope
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Aug 22, 2020
@filename HIME_TargetAnyScope.js
@website https://himeworks.com/2020/08/target-any-scope
@target MZ

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
@plugindesc v1.0 - Allows you to create skills that target anyone or everyone
@help 
-------------------------------------------------------------------------------
== Description ==

 RPG Maker provides some skill and item scopes like "for one ally"
 or "for all enemies" but there isn't really an option to target anyone or
 everyone.
 
 This plugin provides you with the ability to do so.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
  and maybe become a patron!
- Please provide credits to HimeWorks

== Change Log ==

== Usage ==

 Two note-tags are available for items or skills
 
   <scope: any one>
   <scope: any all>
   
 "any one" allows you to select any alive actor or enemy
 "any all" will target all alive actors or enemies

-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_TargetAnyScope = 1;
TH.TargetAnyScope = TH.TargetAnyScope || {}; 

function Window_BattleAll() {
    this.initialize.apply(this, arguments);
}

Window_BattleAll.prototype = Object.create(Window_BattleEnemy.prototype);
Window_BattleAll.prototype.constructor = Window_BattleAll;

(function($) {
  
  $.AnyOneRegex = /<scope:\s*any\s+one\s*>/i
  $.AnyAllRegex = /<scope:\s*any\s+all\s*>/i
  
  $.isForAnyOne = function(item) {
    if (item.forAnyOne === undefined) {
      var match = item.note.match($.AnyOneRegex);
      item.forAnyOne = !!match
    }
    return item.forAnyOne;
  }
  
  $.isForAnyAll = function(item) {
    console.log(item);
    if (item.forAnyAll === undefined) {
      var match = item.note.match($.AnyAllRegex);
      item.forAnyAll = !!match
    }
    return item.forAnyAll;
  }
  
  var TH_GameAction_isForOne = Game_Action.prototype.isForOne
  Game_Action.prototype.isForOne = function() {
    return this.isForAnyOne() || TH_GameAction_isForOne.call(this);
  };

  var TH_GameAction_isForAll = Game_Action.prototype.isForAll
  Game_Action.prototype.isForAll = function() {
    return this.isForAnyAll() || TH_GameAction_isForAll.call(this);
  };
  
  var TH_GameAction_needsSelection = Game_Action.prototype.needsSelection
  Game_Action.prototype.needsSelection = function() {
    return this.isForAnyOne() || TH_GameAction_needsSelection.call(this);
  };

  
  Game_Action.prototype.isForAnyOne = function() {
    return $.isForAnyOne(this.item());
  };
  
  Game_Action.prototype.isForAnyAll = function() {
    console.log('here');
    return $.isForAnyAll(this.item())
  }
  
  Game_Action.prototype.isForAny = function() {
    return this.isForAnyOne() || this.isForAnyAll();
  }
  
  var TH_GameAction_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
  Game_Action.prototype.targetsForOpponents = function() {
    if (this.isForAny()) {
      return this.targetsForAny();
    }
    return TH_GameAction_targetsForOpponents.call(this);
  }
  
  var TH_GameAction_targetsForFriends = Game_Action.prototype.targetsForFriends
  Game_Action.prototype.targetsForFriends = function() {
    if (this.isForAny()) {
      return this.targetsForAny();
    }
    return TH_GameAction_targetsForFriends.call(this);
  }
  
  // 
  Game_Action.prototype.targetsForAny = function() {
    var targets = [];
    var battlers = BattleManager.allBattleMembers();
    if (this.isForAnyAll()) {
    
      // hardcodeonly alive members
      for (var i = 0; i < battlers.length; i++) {
        var battler = battlers[i];
        if (battler.isAlive()) {
          targets.push(battler);
        }
      }
      
    }
    else if (this.isForAnyOne()) {
      var battler = battlers[this._targetIndex];
      // assume we target next friend
      var unit = battler.friendsUnit();
      targets.push(unit.smoothTarget(battler.index()));
    }
    return targets;
  }
  
  Window_BattleAll.prototype.refresh = function() {
    this._enemies = []
    var battlers = BattleManager.allBattleMembers();
    for (var i = 0; i < battlers.length; i++) {
      var battler = battlers[i];
      if (battler.isAlive()) {
        this._enemies.push(battler);
      }
    }
    
    Window_Selectable.prototype.refresh.call(this);
  };
  
  var TH_WindowBattleAll_hide = Window_BattleAll.prototype.hide
  Window_BattleAll.prototype.hide = function() {
    TH_WindowBattleAll_hide.call(this);
    var battler = this.enemy()
    if (battler) {
      battler.deselect();
    }
  };
  
  var TH_WindowBattleAll_select = Window_BattleAll.prototype.select;
  Window_BattleAll.prototype.select = function(index) {
    var battler = this.enemy()
    if (battler) {
      battler.deselect();
    }
    TH_WindowBattleAll_select.call(this, index);
    var battler =this.enemy()
    if (battler) {
      battler.select();
    }
  };

  var TH_SceneBattle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive
  Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return this._anyTargetWindow.active || TH_SceneBattle_isAnyInputWindowActive.call(this);
  };
  
  var TH_SceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    TH_SceneBattle_createAllWindows.call(this);
    this.createAnyTargetsWindow();
  }
  
  Scene_Battle.prototype.createAnyTargetsWindow = function() {
    // for MZ
    if (this.enemyWindowRect) {
      this._anyTargetWindow = new Window_BattleAll(this.enemyWindowRect());
    }
    else {
      this._anyTargetWindow = new Window_BattleAll(0, this._statusWindow.y);
    }
    
    this._anyTargetWindow.setHandler('ok',     this.onAnyTargetOk.bind(this));
    this._anyTargetWindow.setHandler('cancel', this.onAnyTargetCancel.bind(this));
    this.addWindow(this._anyTargetWindow);
  }
  
  Scene_Battle.prototype.onAnyTargetOk = function() {
    
    var action = BattleManager.inputtingAction();
    this._anyTargetWindow.hide();
    
    // hack.
    this.onEnemyOk();
    action.setTarget(this._anyTargetWindow.index());
  }
  
  Scene_Battle.prototype.onAnyTargetCancel = function() {
    this._anyTargetWindow.hide();
    this.onEnemyCancel();
  }
  
  var TH_SceneBattle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection
  Scene_Battle.prototype.selectEnemySelection = function() {
    var action = BattleManager.inputtingAction();
    if (action.isForAny()) {
      this.startAllSelection();
    }
    else {
      TH_SceneBattle_selectEnemySelection.call(this);
    }
  }
  
  var TH_SceneBattle_selectActorSelection = Scene_Battle.prototype.selectActorSelection
  Scene_Battle.prototype.selectActorSelection = function() {
    var action = BattleManager.inputtingAction();
    if (action.isForAny()) {
      this.startAllSelection();
    }
    else {
      TH_SceneBattle_selectActorSelection.call(this);
    }
  }
  
  Scene_Battle.prototype.startAllSelection = function() {
    this._anyTargetWindow.refresh();
    this._anyTargetWindow.show();
    this._anyTargetWindow.activate();
  }

  
  // MZ stuff
  var TH_SceneBattle_startActorSelection = Scene_Battle.prototype.startActorSelection
  Scene_Battle.prototype.startActorSelection = function() {
    var action = BattleManager.inputtingAction();
    if (action.isForAny()) {
      this.startAllSelection();
    }
    else {
      TH_SceneBattle_startActorSelection.call(this);
    }
  }
  
  var TH_SceneBattle_startEnemySelection = Scene_Battle.prototype.startEnemySelection
  Scene_Battle.prototype.startEnemySelection = function() {
    var action = BattleManager.inputtingAction();
    if (action.isForAny()) {
      this.startAllSelection();
    }
    else {
      TH_SceneBattle_startEnemySelection.call(this);
    }
  }
  
})(TH.TargetAnyScope);