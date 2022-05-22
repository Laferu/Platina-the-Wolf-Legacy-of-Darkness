/*:
 * @plugindesc Calls common events during battle
 * @param battleStartEventID
 * @desc The common event to call at the start of each battle
 * @default -1
 *
 * @param battleWinEventID
 * @desc The common event to call after winning a battle
 * @default -1
 *
 * @param battleEscapeEventID
 * @desc The common event to call after fleeing from a battle
 * @default -1
 *
 * @param partyWipeEventID
 * @desc The common event to call if all characters are knocked
 * out during battle
 * @default -1
 *
 * @param turnStartEventID
 * @desc The common event to call at the start of each turn after actions
 * are chosen
 * @default -1
 *
 * @param turnEndEventID
 * @desc The common event to call at the end of each turn.
 * @default -1
 *
 * @param actionEndEventID
 * @desc The common event to call at the end of each action
 * @default -1
 *
 * @author Michael Stroud
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 *
 * @help A negative value disables the event call.
 * After-battle common events do not trigger until the party has been
 * returned to the map. If the battle was triggered by an event, that
 * event will finish processing first.
 *
 * After-turn and after-action common events do not trigger at the end
 * of a battle.
 */
 
(function(){
  var parameters = PluginManager.parameters('BattleCommonEvents');
  var battleStart = Number(parameters['battleStartEventID'] || -1);
  var battleWin = Number(parameters['battleWinEventID'] || -1);
  var battleEscape = Number(parameters['battleEscapeEventID'] || -1);
  var partyWipe = Number(parameters['partyWipeEventID'] || -1);
  var inputStart = Number(parameters['inputStartEventID'] || -1);
  var turnStart = Number(parameters['turnStartEventID'] || -1);
  var turnEnd = Number(parameters['turnEndEventID'] || -1);
  var actionStart = Number(parameters['actionStartEventID'] || -1);
  var actionEnd = Number(parameters['actionEndEventID'] || -1);

  var _BattleManagerStartBattle = BattleManager.startBattle;
  BattleManager.startBattle = function() {
      _BattleManagerStartBattle.call(this);
      if (battleStart > 0){
          $gameTemp.reserveCommonEvent(battleStart);
      }
  };
 
  var _GameSystemOnBattleWin = Game_System.prototype.onBattleWin;
  Game_System.prototype.onBattleWin = function() {
      _GameSystemOnBattleWin.call(this);
      if (battleWin > 0){
          $gameTemp.reserveCommonEvent(battleWin);
      }
  }
 
  var _GameSystemOnBattleEscape = Game_System.prototype.onBattleEscape;
  Game_System.prototype.onBattleEscape = function() {
      _GameSystemOnBattleEscape.call(this);
      if (battleEscape > 0){
          $gameTemp.reserveCommonEvent(battleEscape);
      }
  }
 
  BattleManager.updateBattleEnd = function() {
  if (this.isBattleTest()) {
      AudioManager.stopBgm();
      SceneManager.exit();
  } else if ($gameParty.isAllDead()) {
      if (partyWipe > 0){
          $gameTemp.reserveCommonEvent(partyWipe);
          $gameParty.reviveBattleMembers();
          SceneManager.pop();
      }else{
          if (this._canLose) {
              $gameParty.reviveBattleMembers();
              SceneManager.pop();
          } else {
              SceneManager.goto(Scene_Gameover);
          }
      }
  } else {
      SceneManager.pop();
  }
  this._phase = null;
  };
 
  var _BattleManagerStartTurn = BattleManager.startTurn;
  BattleManager.startTurn = function() {
      _BattleManagerStartTurn.call(this);
      if (turnStart > 0){
          $gameTemp.reserveCommonEvent(turnStart);
      }
  };
 
  var _BattleManagerEndTurn = BattleManager.endTurn;
  BattleManager.endTurn = function(){
      _BattleManagerEndTurn.call(this);
      if (turnEnd > 0){
          $gameTemp.reserveCommonEvent(turnEnd);
      }
  }

  var _BattleManagerEndAction = BattleManager.endAction;
  BattleManager.endAction = function() {
      _BattleManagerEndAction.call(this);
      if (actionEnd > 0){
          $gameTemp.reserveCommonEvent(actionEnd);
      }
  };
})();