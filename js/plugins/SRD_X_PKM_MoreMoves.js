/*:
 * @title Pokemon More Moves
 * @author LadyBaskerville
 * @filename SRD_X_PKM_MoreMoves.js
 *
 * @plugindesc Extension for SRD_PKM_4MovesOnly. Allows you to change the maximum amount of skills.
 *
 * @param Maximum
 * @desc This will be the maximum amount of Skills each Actor can learn. (Default: 4)
 * @default 4 
 *
 * @help 
 * Pokemon More Moves
 * Version 1.00
 * LadyBaskerville
 * SRD_X_PKM_MoreMoves.js
 * 
 * This is an extension plugin for SRD_PKM_4MovesOnly.
 * It allows you to change the maximum amount of skills
 * each actor can learn to something other than 4 in
 * the parameter of this plugin.
 * 
 * Terms of Use:
 * - You may use this plugin in non-commercial projects.
 * - You may use this plugin in commercial projects. 
 * - You may edit this plugin for your own needs.
 * - You may redistribute this plugin elsewhere. In that case,
 *   please link back to the original plugin thread if possible.
 * - Please credit me as LadyBaskerville if you use or redistribute
 *   this plugin or edits of it. Thank you :)
 * - Give credit to SumRndmDde as well (but you're doing that already, right?)
 */
 
var SRD = SRD || {};
SRD.PKM = SRD.PKM || {};
SRD.PKM.MoreMoves = {};

var Imported = Imported || {};
Imported.SRD_X_PKM_MoreMoves = true;

if (Imported.SRD_PKM_4MovesOnly) {
	
	SRD.PKM.MoreMoves.maximum = Number(PluginManager.parameters('SRD_X_PKM_MoreMoves')['Maximum'] || 4);
	
	SRD.PKM.MoreMoves._Game_Actor_initSkills = Game_Actor.prototype.initSkills;
	Game_Actor.prototype.initSkills = function() {
		this._skills = [];
		this.currentClass().learnings.forEach(function(learning) {
			if (learning.level <= this._level) {
				SRD.PKM.FourMovesOnly._Game_Actor_learnSkill.call(this, learning.skillId); //use the original learnSkill function for this (bug in 4MovesOnly?)
			}
		}, this);
		while(this._skills.length > SRD.PKM.MoreMoves.maximum) {
			this._skills.splice(0, 1);
		}
	};
	
	SRD.PKM.MoreMoves._Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		if (!this.isLearnedSkill(skillId)) {
			this.setMostRecentSkillId(skillId);
		}
		SRD.PKM.FourMovesOnly._Game_Actor_learnSkill.call(this, skillId); //call the aliased function from the original plugin
		if(this._skills.length > SRD.PKM.MoreMoves.maximum) {
			if($gameParty.forgetSkillReadyActorId() === 0) {
				var lines = [];
				for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
					lines[i] = SRD.PKM.FourMovesOnly.alertLines[i].replace(/\\actor/im, this._name);
				}
				for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
					if(lines[i].trim().length > 0) {
						$gameMessage.setBackground(SRD.PKM.FourMovesOnly.background);
						$gameMessage.add(lines[i]);
					}
				}
				$gameParty.setForgetSkillReady(1);
				$gameParty.setForgetSkillReadyActorId(this._actorId);
			} else {
				$gameParty.addForgetSkillReadyActorIds(this._actorId);
			}
		}
	};
} else {
	alert("Plugin SRD_X_PKM_MoreMoves requires SRD_PKM_4MovesOnly. Please make sure you have installed SRD_PKM_4MovesOnly and placed it above SRD_X_PKM_MoreMoves in your plugin list.");
}