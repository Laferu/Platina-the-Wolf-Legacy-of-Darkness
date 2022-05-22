/*:
 * @target MV MZ
 * @plugindesc Touch not to avoid the event symbols when moving.
 * @author Shitsudo Kei
 *
 * @help There are no plugin commands in this plugin.
 * This plugin is compatible with RPG Maker MV and MZ.
 *
 * -Features
 * Reduce the pathfinding limit on touch moves to avoid event symbols and increase the encounter rate with symbol encounters.
 * Caution：Due to the impact of the change, the default touch-move pathfinding ability changes.
 *
 * I will not be responsible for any problems that may occur. Please understand. 
 * -License
 * This plugin is distributed under the MIT license.
 * Feel free to use it.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MV MZ
 * @plugindesc タッチ移動時イベントシンボルを避けないようにします。
 * @author 湿度ケイ
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMVとMZに対応しています。
 *
 * ■概要
 * タッチ移動時の経路探索上限を減らすことで、イベントシンボルを避けないようにし、シンボルエンカウントとのエンカウント率を上げます。
 * ※注意：副作用として通常のタッチ移動のスペックを大きく損ないます。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // overwrite
  //
  Game_Character.prototype.searchLimit = function() {
      return 2;
  };

})();
