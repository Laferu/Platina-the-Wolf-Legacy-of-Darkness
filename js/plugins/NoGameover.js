//=============================================================================
// NoGameover.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc If you lose in a battle, the game is not over.
 * @author yuwaka
 *
 * @param Switch ID
 * @desc The ID of the switch to turn on when lose in a battle.
 * @default 0
 * @type switch
 *
 * @help There are no plugin commands in this plugin.
 *
 *　Allow it to fade out automatically.
 *　Fade in at any time you put into the common event you call by switch.
 *
 *　Automatically "Change Menu Acsess" is "Disable".
 *　(To prevent the menu icon from blinking.)
 *　If necessary, remove the Disable.
 *　Comment out if you don't want to fade out or ban the menu.
 *
 *　If the "Battle Processing" use, if you have a set of defeats, that takes precedence.
 *
 * There are no plug-in commands.
 * This is a plugin for RPG Maker MZ only.
 * Please feel free to modify and use it in accordance with the terms of the RPG Maker.
 *
 * Special Thanks:I used the plugin for the RPG Maker MV sample game "Sea Pirate(Auther Tachi)" as a reference.
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘で全滅してもゲームオーバーにならない。
 * @author ゆわか
 *
 * @param Switch ID
 * @desc 戦闘で全滅したときにONにするスイッチのIDです。
 * @default 0
 * @type switch
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 *　自動的にフェードアウトするようにしています。
 *　フェードインはスイッチで呼び出すコモンイベントへ入れて
 *　好きなタイミングで行ってください。
 *
 *　自動的にメニューを禁止するようにしています。
 *　メニューアイコンの点滅を防ぐためです。
 *　必要に応じて、禁止を解いてください。
 *
 *　（フェードアウトやメニューを禁止したくなければ、コメントアウトしてね）
 *
 *　イベント中の戦闘で、敗北の設定をしている場合は、そちらが優先されます。
 *
 * プラグインコマンドはありません。
 * ＲＰＧツクールＭＺ専用のプラグインです。
 * ツクールの規約に沿って自由に改変、使用してください。
 *
 *　ＲＰＧツクールＭＶサンプルゲーム「シーピラート」のプラグインを
 *　参考にさせて頂きました。
 *　ありがとうございます。
 */

(function() {

    var parameters = PluginManager.parameters('NoGameover');
    var switchId = Number(parameters['Switch ID'] || 0);

//rpg_managers.jsより（戦闘で全滅した場合）
BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);//ゲームオーバーを表示するぜ
	    $gameSystem.disableMenu()//メニューを禁止するぜ
            $gameScreen.startFadeOut(10); //フェードアウトするぜ
	    $gameSwitches.setValue(switchId, true); //全滅したぜ
            $gameParty.reviveBattleMembers(); //みんな生き返るぜ
            SceneManager.pop(); //マップ画面へ移動するぜ
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};


})();
