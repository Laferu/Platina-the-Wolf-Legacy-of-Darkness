//=============================================================================
// RPG Maker MZ - Passive Skill System - Version 1.4
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Implements a passive skill system.
 * @author Fomar0153
 *
 * @param Passive Skill Type Id
 * @type integer
 * @desc Enter a number that refers to the skill type id from the database (Types Tab).
 * @default 3
 *
 * @param Add Passive Skill Type in Skill Menu
 * @type boolean
 * @desc Add the passive skill set to everyone in your party when outside of battles.
 * @default true
 *
 * @param Passive Skill Max Points Formula
 * @type string
 * @desc Enter what formula you would like to use to determine max passive skill points.
 * @default this._level
 *
 * @param Passive Points Display Name
 * @type string
 * @desc Enter a label for the number of Passive Points you have.
 * @default PP
 *
 * @param Passive Skill Gauge Colour 1
 * @type integer
 * @desc Enter the colour you would like to use for the passive points gauge.
 * @default 28
 *
 * @param Passive Skill Gauge Colour 2
 * @type integer
 * @desc Enter the colour you would like to use for the passive points gauge.
 * @default 29
 *
 * @param PP Bar X Offset
 * @type integer
 * @desc By default the PP Bar will appear where TP would if it is visible. If you are using TP I recommend using -.
 * @default 0
 *
 * @param PP Bar Y Offset
 * @type integer
 * @desc By default the PP Bar will appear where TP would if it is visible. If you are using TP I recommend using 0.
 * @default 0
 *
 * @param Passive Skill On Icon Index
 * @type integer
 * @desc If you want to use the skill's original icon then set this to -1.
 * @default 160
 *
 * @param Passive Skill Off Icon Index
 * @type integer
 * @desc If you want to use the skill's original icon then set this to -1.
 * @default 16
 *
 * @param VisuMZ PP String
 * @type string
 * @desc Customise to change the visual display of PP.
 * @default \FS[22]\C[29]
 *
 * @help Fomar0153_PassiveSkills.js
 *
 * This plugin implements a passive skill system.
 * Passive skills should be of the skill type you set in the options.
 * Passive skills should add a state with the traits you want the passive skill to have.
 * The maximum number of passive skills you can equip is based on a formula you can edit.
 * A passive skill's mp cost is used to determine how many points it takes to equip.
 *
 * Version 1.0 -> 1.1
 * Fixed a bug where all non-PP bars, always displayed the max value.
 * Fixed a bug where the PP bars would show up in battle.
 *
 * Version 1.1 -> 1.2
 * Fixed a bug that could cause a crash if you attempted to activate a passive skill when you don't have any.
 * Fixed a display bug where the PP cost of passive skills could be displayed incorrectly when MP cost rate wasn't 1.
 *
 * Version 1.2 -> 1.3
 * Fixed another bug that prevented any non-passive skill from being used.
 *
 * Version 1.3 -> 1.4
 * Increased compatibility with menu plugins and skill learning plugins.
 */

var Fomar = Fomar || {};
Fomar.PassiveSkills = {};

Fomar.PassiveSkills.parameters = PluginManager.parameters('Fomar0153_PassiveSkills_VisuMZ_1_SkillsStatesCore_Patch');

Fomar.PassiveSkills.passiveSkillTypeId = parseInt(Fomar.PassiveSkills.parameters["Passive Skill Type Id"]);
Fomar.PassiveSkills.addPassiveSkillSet = (Fomar.PassiveSkills.parameters["Add Passive Skill Type in Skill Menu"] == "true");
Fomar.PassiveSkills.maxPP = Fomar.PassiveSkills.parameters["Passive Skill Max Points Formula"] || "0";
Fomar.PassiveSkills.PP = Fomar.PassiveSkills.parameters["Passive Points Display Name"] || "PP";
Fomar.PassiveSkills.passiveGuageColor1 = parseInt(Fomar.PassiveSkills.parameters["Passive Skill Gauge Colour 1"]);
Fomar.PassiveSkills.passiveGuageColor2 = parseInt(Fomar.PassiveSkills.parameters["Passive Skill Gauge Colour 2"]);
Fomar.PassiveSkills.PPBarOffsetX = parseInt(Fomar.PassiveSkills.parameters["PP Bar X Offset"] || 0);
Fomar.PassiveSkills.PPBarOffsetY = parseInt(Fomar.PassiveSkills.parameters["PP Bar Y Offset"] || 0);
Fomar.PassiveSkills.passiveSkillOnIconIndex = parseInt(Fomar.PassiveSkills.parameters["Passive Skill On Icon Index"] || -1);
Fomar.PassiveSkills.passiveSkillOffIconIndex = parseInt(Fomar.PassiveSkills.parameters["Passive Skill Off Icon Index"] || -1);
Fomar.PassiveSkills.visu = Fomar.PassiveSkills.parameters["VisuMZ PP String"] || "\FS[22]\C[29]";


var _0xa5dc=['passiveGuageColor1','label','_battler','Game_Actor_skillTypes','maxPP','mpCost','isEnabled','visu','hasSkill','push','currentMaxValue','PassiveSkills','gaugeColor2','Game_BattlerBase_skillMpCost','effects','Game_Actor_initMembers','Sprite_Gauge_currentMaxValue','forEach','_statusWindow','currentValue','remove','Sprite_gaugeColor2','Sprite_gaugeColor1','passiveGuageColor2','skillTypes','Game_Actor_refresh','Window_Base_createAllSkillCostText','PPBarOffsetX','passiveSkillTypeId','gaugeLineHeight','prototype','inBattle','reduce','initMembers','item','gaugeColor1','_itemWindow','_stypeId','call','actor','_statusType','includes','textColor','Sprite_Gauge_currentValue','length','Window_SkillList_isEnabled','passiveSkillOnIconIndex','iconIndex','Scene_Skill_useItem','useItem','Sprite_Gauge_label','stypeId','drawItemName','Game_Actor_traitObjects','placeGauge','passiveSkillOffIconIndex','createAllSkillCostText','refresh','traitObjects','_passiveSkills','Window_StatusBase_placeBasicGauges','currentPP','placeBasicGauges','addPassiveSkillSet','_actor'];(function(_0x31b0dd,_0xa5dcbc){var _0x455850=function(_0x15a0d6){while(--_0x15a0d6){_0x31b0dd['push'](_0x31b0dd['shift']());}};_0x455850(++_0xa5dcbc);}(_0xa5dc,0x134));var _0x4558=function(_0x31b0dd,_0xa5dcbc){_0x31b0dd=_0x31b0dd-0x0;var _0x455850=_0xa5dc[_0x31b0dd];return _0x455850;};(()=>{Fomar[_0x4558('0x1c')][_0x4558('0x20')]=Game_Actor[_0x4558('0x2f')]['initMembers'],Game_Actor['prototype'][_0x4558('0x32')]=function(){Fomar[_0x4558('0x1c')][_0x4558('0x20')][_0x4558('0x37')](this),this['_passiveSkills']=[];},Fomar[_0x4558('0x1c')][_0x4558('0x5')]=Game_Actor[_0x4558('0x2f')][_0x4558('0xa')],Game_Actor['prototype'][_0x4558('0xa')]=function(){const _0x15a0d6=Fomar[_0x4558('0x1c')][_0x4558('0x5')]['call'](this);for(var _0x43400f=0x0;_0x43400f<this[_0x4558('0xb')]['length'];_0x43400f++){var _0x44a642=$dataSkills[this[_0x4558('0xb')][_0x43400f]];_0x44a642[_0x4558('0x1f')][_0x4558('0x22')](_0x57af30=>{_0x57af30['code']==0x15&&_0x15a0d6[_0x4558('0x1a')]($dataStates[_0x57af30['dataId']]);});}return _0x15a0d6;},Fomar[_0x4558('0x1c')][_0x4558('0x14')]=Game_Actor[_0x4558('0x2f')][_0x4558('0x29')],Game_Actor['prototype'][_0x4558('0x29')]=function(){const _0x26c625=Fomar[_0x4558('0x1c')][_0x4558('0x14')][_0x4558('0x37')](this);return!$gameParty[_0x4558('0x30')]()?Fomar[_0x4558('0x1c')][_0x4558('0xf')]&&_0x26c625[_0x4558('0x1a')](Fomar[_0x4558('0x1c')][_0x4558('0x2d')]):_0x26c625[_0x4558('0x25')](Fomar['PassiveSkills'][_0x4558('0x2d')]),_0x26c625;},Game_Actor['prototype'][_0x4558('0xd')]=function(){return this[_0x4558('0x15')]()-this[_0x4558('0xb')][_0x4558('0x31')]((_0x2fe89e,_0x290b62)=>_0x2fe89e+$dataSkills[_0x290b62][_0x4558('0x16')],0x0);},Game_Actor[_0x4558('0x2f')][_0x4558('0x15')]=function(){return eval(Fomar['PassiveSkills'][_0x4558('0x15')]);},Fomar['PassiveSkills'][_0x4558('0x2a')]=Game_Actor[_0x4558('0x2f')]['refresh'],Game_Actor[_0x4558('0x2f')]['refresh']=function(){var _0x19e649=[];for(var _0x45424a=0x0;_0x45424a<this[_0x4558('0xb')][_0x4558('0x3d')];_0x45424a++){this[_0x4558('0x19')](this[_0x4558('0xb')][_0x45424a])&&_0x19e649[_0x4558('0x1a')](this['_passiveSkills'][_0x45424a]);}this[_0x4558('0xb')]=_0x19e649,Fomar['PassiveSkills'][_0x4558('0x2a')][_0x4558('0x37')](this);},Fomar['PassiveSkills'][_0x4558('0x1e')]=Game_BattlerBase[_0x4558('0x2f')]['skillMpCost'],Game_BattlerBase[_0x4558('0x2f')]['skillMpCost']=function(_0x4c0cfe){return _0x4c0cfe&&_0x4c0cfe[_0x4558('0x3')]==Fomar[_0x4558('0x1c')]['passiveSkillTypeId']?_0x4c0cfe[_0x4558('0x16')]:Fomar[_0x4558('0x1c')][_0x4558('0x1e')][_0x4558('0x37')](this,_0x4c0cfe);},Fomar[_0x4558('0x1c')][_0x4558('0xc')]=Window_StatusBase['prototype'][_0x4558('0xe')],Window_StatusBase[_0x4558('0x2f')][_0x4558('0xe')]=function(_0x1b0af1,_0x190999,_0x426dda){Fomar[_0x4558('0x1c')][_0x4558('0xc')][_0x4558('0x37')](this,_0x1b0af1,_0x190999,_0x426dda),!$gameParty[_0x4558('0x30')]()&&this[_0x4558('0x6')](_0x1b0af1,'pp',_0x190999+Fomar[_0x4558('0x1c')][_0x4558('0x2c')],_0x426dda+this[_0x4558('0x2e')]()*0x2+Fomar[_0x4558('0x1c')]['PPBarOffsetY']);},Fomar[_0x4558('0x1c')][_0x4558('0x3c')]=Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x24')],Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x24')]=function(){return this[_0x4558('0x13')]&&this['_statusType']=='pp'?this[_0x4558('0x13')][_0x4558('0xd')]():Fomar['PassiveSkills'][_0x4558('0x3c')]['call'](this);},Fomar[_0x4558('0x1c')][_0x4558('0x21')]=Sprite_Gauge['prototype'][_0x4558('0x1b')],Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x1b')]=function(){return this[_0x4558('0x13')]&&this[_0x4558('0x39')]=='pp'?this[_0x4558('0x13')][_0x4558('0x15')]():Fomar['PassiveSkills'][_0x4558('0x21')][_0x4558('0x37')](this);},Fomar[_0x4558('0x1c')]['Sprite_Gauge_label']=Sprite_Gauge[_0x4558('0x2f')]['label'],Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x12')]=function(){return this[_0x4558('0x39')]=='pp'?Fomar[_0x4558('0x1c')]['PP']:Fomar['PassiveSkills'][_0x4558('0x2')]['call'](this);},Fomar['PassiveSkills']['Sprite_gaugeColor1']=Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x34')],Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x34')]=function(){return this[_0x4558('0x39')]=='pp'?ColorManager[_0x4558('0x3b')](Fomar['PassiveSkills'][_0x4558('0x11')]):Fomar[_0x4558('0x1c')][_0x4558('0x27')][_0x4558('0x37')](this);},Fomar[_0x4558('0x1c')][_0x4558('0x26')]=Sprite_Gauge[_0x4558('0x2f')]['gaugeColor2'],Sprite_Gauge[_0x4558('0x2f')][_0x4558('0x1d')]=function(){return this[_0x4558('0x39')]=='pp'?ColorManager[_0x4558('0x3b')](Fomar[_0x4558('0x1c')][_0x4558('0x28')]):Fomar[_0x4558('0x1c')][_0x4558('0x26')][_0x4558('0x37')](this);},Fomar[_0x4558('0x1c')][_0x4558('0x3e')]=Window_SkillList[_0x4558('0x2f')][_0x4558('0x17')],Window_SkillList['prototype'][_0x4558('0x17')]=function(_0x5afbb7){if(!_0x5afbb7)return![];return this[_0x4558('0x36')]==Fomar['PassiveSkills'][_0x4558('0x2d')]?this[_0x4558('0x10')][_0x4558('0xb')][_0x4558('0x3a')](_0x5afbb7['id'])?!![]:this[_0x4558('0x10')][_0x4558('0xd')]()>=_0x5afbb7[_0x4558('0x16')]:Fomar[_0x4558('0x1c')]['Window_SkillList_isEnabled'][_0x4558('0x37')](this,_0x5afbb7);},Fomar[_0x4558('0x1c')][_0x4558('0x0')]=Scene_Skill[_0x4558('0x2f')][_0x4558('0x1')],Scene_Skill[_0x4558('0x2f')][_0x4558('0x1')]=function(){this[_0x4558('0x33')]()&&this['item']()[_0x4558('0x3')]==Fomar[_0x4558('0x1c')][_0x4558('0x2d')]?(this['actor']()['_passiveSkills'][_0x4558('0x3a')](this[_0x4558('0x33')]()['id'])?this[_0x4558('0x38')]()[_0x4558('0xb')][_0x4558('0x25')](this['item']()['id']):this[_0x4558('0x38')]()['_passiveSkills'][_0x4558('0x1a')](this[_0x4558('0x33')]()['id']),this[_0x4558('0x23')]['refresh'](),this[_0x4558('0x35')][_0x4558('0x9')](),this['actor']()[_0x4558('0x9')]()):Fomar[_0x4558('0x1c')][_0x4558('0x0')][_0x4558('0x37')](this);},Window_SkillList[_0x4558('0x2f')]['drawItemName']=function(_0x5047d9,_0x3a525c,_0x108c0f,_0x105f54){if(_0x5047d9&&_0x5047d9[_0x4558('0x3')]==Fomar[_0x4558('0x1c')][_0x4558('0x2d')]){if(this['_actor'][_0x4558('0xb')][_0x4558('0x3a')](_0x5047d9['id'])){if(Fomar[_0x4558('0x1c')][_0x4558('0x3f')]>0x0){const _0x118aa3=Object['assign']({},_0x5047d9);_0x118aa3[_0x4558('0x40')]=Fomar['PassiveSkills'][_0x4558('0x3f')],Window_Base['prototype'][_0x4558('0x4')][_0x4558('0x37')](this,_0x118aa3,_0x3a525c,_0x108c0f,_0x105f54);return;}}else{if(Fomar[_0x4558('0x1c')][_0x4558('0x7')]>0x0){const _0x2c1cfd=Object['assign']({},_0x5047d9);_0x2c1cfd['iconIndex']=Fomar['PassiveSkills'][_0x4558('0x7')],Window_Base[_0x4558('0x2f')][_0x4558('0x4')][_0x4558('0x37')](this,_0x2c1cfd,_0x3a525c,_0x108c0f,_0x105f54);return;}}}Window_Base[_0x4558('0x2f')][_0x4558('0x4')][_0x4558('0x37')](this,_0x5047d9,_0x3a525c,_0x108c0f,_0x105f54);},Fomar['PassiveSkills'][_0x4558('0x2b')]=Window_Base['prototype']['createAllSkillCostText'],Window_Base[_0x4558('0x2f')][_0x4558('0x8')]=function(_0x56674d,_0x5f4f79){return _0x5f4f79[_0x4558('0x3')]==Fomar[_0x4558('0x1c')][_0x4558('0x2d')]?Fomar[_0x4558('0x1c')][_0x4558('0x18')]+_0x5f4f79['mpCost']+'\x20'+Fomar[_0x4558('0x1c')]['PP']:Fomar[_0x4558('0x1c')][_0x4558('0x2b')][_0x4558('0x37')](this,_0x56674d,_0x5f4f79);};})();
