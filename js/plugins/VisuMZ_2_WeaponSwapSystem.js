//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: December 9, 2021
 * * Compatibility Update!
 * ** Changing classes via the Class Change System plugin should no longer dupe
 *    weapons under specific circumstances. Update made by Olivia.
 * * Feature Update!
 * ** Upon an actor's turn to input a command, if the actor is barefisted while
 *    having available swap weapons, it will default the choice to the first
 *    available slot. Update made by Olivia.
 * ** The barefisted equip would occur before because when navigating the equip
 *    menu, the switched weapon type would change to whatever is selected. If
 *    you go to a slot without any weapons equipped, it would be as having a
 *    barehanded setup.
 * 
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WeaponSwapSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

const _0x8b0710=_0x3d4f;(function(_0x2c89fb,_0x21dc83){const _0x538cca=_0x3d4f,_0x1f605f=_0x2c89fb();while(!![]){try{const _0x43238e=parseInt(_0x538cca(0x211))/0x1*(parseInt(_0x538cca(0x2b7))/0x2)+parseInt(_0x538cca(0x1b9))/0x3*(-parseInt(_0x538cca(0x248))/0x4)+parseInt(_0x538cca(0x25b))/0x5*(parseInt(_0x538cca(0x2a5))/0x6)+parseInt(_0x538cca(0x20c))/0x7+-parseInt(_0x538cca(0x213))/0x8+-parseInt(_0x538cca(0x2a6))/0x9*(-parseInt(_0x538cca(0x2c5))/0xa)+parseInt(_0x538cca(0x1eb))/0xb*(-parseInt(_0x538cca(0x287))/0xc);if(_0x43238e===_0x21dc83)break;else _0x1f605f['push'](_0x1f605f['shift']());}catch(_0x3c675f){_0x1f605f['push'](_0x1f605f['shift']());}}}(_0x39e4,0xd10fe));function _0x39e4(){const _0x48d767=['STR','WEAPON_SWAP_SHOW_COMMAND','iconIndex','_itemWindow','WEAPON_SWAP_CHANGE_ATTACK_ICON','changeWeapon','_wtypeID','NUM','applyWeaponSwapAction','getSwapWeapon','attackSkillId','EyRSL','isWeaponSwapShortcutVisible','isWeapon','alterAttackCommand','Window_EquipSlot_isEnabled','ChangeAttackIcon','setupBattleTestMembers','onWeaponSwap','format','constructor','_equips','contentsOpacity','BattleHelpSwap','equipSlots','_swapWeapons','max','WeaponSwapSystem','_wtypeIDs','actor','replace','ARRAYFUNC','itemAt','837392eMETIi','requiredWtypeId1','return\x200','toUpperCase','updateSwapToNextAvailableWeapon','allMembers','Game_BattlerBase_meetsSkillConditions','wUExy','Window_ActorCommand_initialize','ShowSwapCommand','WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS','requestMotionRefresh','_weaponSwapShortcutSprite_Right','setSlotId','RegExp','Window_Base_playOkSound','Game_Party_setupBattleTestMembers','nonRemovableEtypes','Game_Actor_initEquips','15790SuBwem','call','includes','applyGlobal','ARRAYSTRUCT','YGnsn','tWwRV','Irqxg','addChild','Scene_Battle_createActorCommandWindow','trim','_slotId','itemRect','Mechanics','switchToWeaponType','Game_Actor_optimizeEquipments','_statusWindow','VisuMZ_1_BattleCore','padding','isEnabledWeaponSwap','SwapCommandName','_tempActor','QiAkP','subject','performWeaponSwap','processWeaponSwapRelease','qZqvu','ConvertParams','bccKk','_list','_actor','weaponSwapTypes','isEnabled','weaponTypes','_swappingWeapon','meetsAnyWeaponEquippedCondition','Game_Battler_requestMotionRefresh','parse','actorSlotNameWeaponSwap','yvgZr','ZzQYn','GUXCA','bioFb','isOptimizeEquipOk','284628wQdIPC','weaponSwap','canWeaponSwap','bestEquipWeapon','Window','actorSlotName','_firstOfEachWeaponType','opacity','SwitchWpnTypeNum','awINj','bmMmc','Game_Actor_equipSlots','status','optimizeEquipments','Window_EquipSlot_maxItems','bind','gUDiq','removeWeaponSwapCommand','nmbNd','unshift','openness','IEyfb','width','updateToNearestWeapon','swapWeaponNext','Window_ActorCommand','optimizeSwappableWeapons','maxItems','MRtTd','Switch\x20out\x20the\x20current\x20weapon.','942oXPmRX','8820369avwscD','zSncj','_currentweapontype','playEquip','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','weapons','lineHeight','Window_ActorCommand_addAttackCommand','ShowUnequippable','activate','nuBxY','MISSING\x20WEAPON\x20TYPE:\x20%1','itemAtWeaponSwap','clearEquipments','round','currentSymbol','isEquipWtypeOk','314852cOptOJ','Window_EquipItem_includes','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','bBkgq','item','ShowShortcutArrows','requiredWtypeId2','JRTeZ','setObject','log','Window_EquipSlot_itemAt','addWeaponSwapCommand','sFPRi','SwapShortcut','10ptMPwU','etypeId','AURpB','createWeaponSwapShortcutSprites','match','anchor','QxRCQ','commandWeaponSwap','createWeaponSwapTypes','clearSwappableWeapons','_cache','indexOf','version','_helpWindow','Game_Actor_isDualWield','Window_EquipItem_setSlotId','changeEquip','exit','rySTk','NkxRN','setFrame','BattleTestAllWeapons','WEAPON_SWAP_SHORTCUT_ENABLE','swapWeaponHelp','24JSspgc','height','map','_actorCommandWindow','LytyR','setSwapWeapon','xPKkQ','isSkill','Game_Actor_clearEquipments','isWeaponSwapShortcutEnabled','Window_StatusBase_actorSlotName','zSXwu','ARRAYJSON','isClearEquipOk','initWeaponSwapSystem','Window_EquipSlot_equipSlotIndex','meetsSkillConditions','sXcWj','Sprite_Actor_refreshMotion','tradeItemWithParty','upZtK','Game_Actor_isClearEquipOk','Window_EquipItem_isEnabled','push','canAddSkillCommand','findSymbol','prototype','\x5cI[%1]%2','jpmGq','supSS','setup','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','filter','commandStyle','updateArrows','SFOnU','initialize','visible','TKFsi','getFirstOfEachWeaponType','splice','EPyqa','Game_Actor_isOptimizeEquipOk','updateHelp','equipSlotIndex','note','maxItemsWeaponSwap','getWtypeIdWithName','QboSM','Game_Actor_changeEquip','330fCXLPY','ARRAYEVAL','_weaponSwapShortcutSprite_Left','attack','isDualWield','bitmap','aiGsH','Window_ActorCommand_setup','ZKYKn','_scene','performAttack','swapWeaponCmd','addAttackCommand','Window_EquipItem_initialize','RequireAnyWpn','gHLGK','swapWeaponIcon','setupBattleTestWeapons','name','upVsG','JnCmQ','cursorLeft','refreshMotion','updateWeaponSwapShortcutSprites','_inBattle','createActorCommandWindow','length','PpSxr','PWJrV','Window_ActorCommand_updateHelp','updateShortcutOpacity','calcEquipItemPerformance','Game_Actor_releaseUnequippableItems','10305127DdcABH','text','iCixB','refresh','battleCommandName','3SITWZk','getAllEquippedSwapWeapons','1420912vAhiEY','isSkillWtypeOk','xmAmT','_currentWeaponType','loadSystem','playOkSound','description','WEAPON_SWAP_SHORTCUT_ARROWS','_checkingWeaponSwaps','Settings','isEquipChangeOk','jQTxL','wtypeId','remove','releaseUnequippableItems','FUNC','iGHJR','ARRAYSTR','parent','swapWeaponPrevious'];_0x39e4=function(){return _0x48d767;};return _0x39e4();}function _0x3d4f(_0x9bb646,_0x4d4328){const _0x39e45c=_0x39e4();return _0x3d4f=function(_0x3d4f34,_0x52342a){_0x3d4f34=_0x3d4f34-0x1ac;let _0x2a09b2=_0x39e45c[_0x3d4f34];return _0x2a09b2;},_0x3d4f(_0x9bb646,_0x4d4328);}var label=_0x8b0710(0x242),tier=tier||0x0,dependencies=[_0x8b0710(0x26c),'VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins['filter'](function(_0x1ae654){const _0x367e35=_0x8b0710;return _0x1ae654[_0x367e35(0x293)]&&_0x1ae654[_0x367e35(0x219)][_0x367e35(0x25d)]('['+label+']');})[0x0];VisuMZ[label][_0x8b0710(0x21c)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x8b0710(0x276)]=function(_0x43bd92,_0x233f75){const _0x2e31c2=_0x8b0710;for(const _0x354f7b in _0x233f75){if(_0x2e31c2(0x275)!==_0x2e31c2(0x1e2)){if(_0x354f7b[_0x2e31c2(0x2c9)](/(.*):(.*)/i)){if(_0x2e31c2(0x1f3)===_0x2e31c2(0x1f3)){const _0x3aa4c9=String(RegExp['$1']),_0x5778d5=String(RegExp['$2'])[_0x2e31c2(0x24b)]()[_0x2e31c2(0x265)]();let _0x16693c,_0x4167e1,_0x1ecdd1;switch(_0x5778d5){case _0x2e31c2(0x22e):_0x16693c=_0x233f75[_0x354f7b]!==''?Number(_0x233f75[_0x354f7b]):0x0;break;case'ARRAYNUM':_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON['parse'](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1[_0x2e31c2(0x1bb)](_0x12e6db=>Number(_0x12e6db));break;case'EVAL':_0x16693c=_0x233f75[_0x354f7b]!==''?eval(_0x233f75[_0x354f7b]):null;break;case _0x2e31c2(0x1ec):_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON['parse'](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1['map'](_0x4e5dcd=>eval(_0x4e5dcd));break;case'JSON':_0x16693c=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):'';break;case _0x2e31c2(0x1c5):_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1[_0x2e31c2(0x1bb)](_0x3f6ea5=>JSON[_0x2e31c2(0x280)](_0x3f6ea5));break;case _0x2e31c2(0x222):_0x16693c=_0x233f75[_0x354f7b]!==''?new Function(JSON['parse'](_0x233f75[_0x354f7b])):new Function(_0x2e31c2(0x24a));break;case _0x2e31c2(0x246):_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1[_0x2e31c2(0x1bb)](_0x209b66=>new Function(JSON[_0x2e31c2(0x280)](_0x209b66)));break;case _0x2e31c2(0x227):_0x16693c=_0x233f75[_0x354f7b]!==''?String(_0x233f75[_0x354f7b]):'';break;case _0x2e31c2(0x224):_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1[_0x2e31c2(0x1bb)](_0x41cd22=>String(_0x41cd22));break;case'STRUCT':_0x1ecdd1=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):{},_0x16693c=VisuMZ['ConvertParams']({},_0x1ecdd1);break;case _0x2e31c2(0x25f):_0x4167e1=_0x233f75[_0x354f7b]!==''?JSON[_0x2e31c2(0x280)](_0x233f75[_0x354f7b]):[],_0x16693c=_0x4167e1[_0x2e31c2(0x1bb)](_0x17ae83=>VisuMZ[_0x2e31c2(0x276)]({},JSON['parse'](_0x17ae83)));break;default:continue;}_0x43bd92[_0x3aa4c9]=_0x16693c;}else _0x5dc306['log'](_0x2e31c2(0x2b1)[_0x2e31c2(0x23a)](_0x5d8fd6[_0x2e31c2(0x27c)][_0x36a3e1]['replace'](/\\I\[(\d+)\]/gi,'')));}}else _0x133a3a[_0x2e31c2(0x1d8)]?this[_0x2e31c2(0x22d)]=_0x1d7242+0x1:this[_0x2e31c2(0x22d)]=this[_0x2e31c2(0x279)][_0x2e31c2(0x27a)]()[_0x4c8745],_0x245c7b=0x0,_0x5e9652[_0x2e31c2(0x242)][_0x2e31c2(0x1b0)]['call'](this,_0x3cec2f),this[_0x2e31c2(0x279)][_0x2e31c2(0x269)](this[_0x2e31c2(0x22d)]),this['_statusWindow']&&this[_0x2e31c2(0x26b)][_0x2e31c2(0x20f)]();}return _0x43bd92;},(_0x578cad=>{const _0x2d0d65=_0x8b0710,_0x2dfdb1=_0x578cad[_0x2d0d65(0x1fd)];for(const _0x5b035b of dependencies){if(!Imported[_0x5b035b]){if(_0x2d0d65(0x2be)===_0x2d0d65(0x2be)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2d0d65(0x23a)](_0x2dfdb1,_0x5b035b)),SceneManager[_0x2d0d65(0x1b2)]();break;}else while(this[_0x2d0d65(0x1d2)]('weaponSwap')>=0x0){const _0x30b44e=this[_0x2d0d65(0x1d2)]('weaponSwap');this['_list']['splice'](_0x30b44e,0x1);}}}const _0x3faeaa=_0x578cad[_0x2d0d65(0x219)];if(_0x3faeaa[_0x2d0d65(0x2c9)](/\[Version[ ](.*?)\]/i)){if('bYDXs'!=='bYDXs')this[_0x2d0d65(0x239)](!![]);else{const _0x2ae1d7=Number(RegExp['$1']);if(_0x2ae1d7!==VisuMZ[label][_0x2d0d65(0x1ad)]){if(_0x2d0d65(0x284)==='GUXCA')alert(_0x2d0d65(0x2b9)['format'](_0x2dfdb1,_0x2ae1d7)),SceneManager[_0x2d0d65(0x1b2)]();else{const _0x477426=_0x1a0b98[_0x2d0d65(0x1d9)](_0x145113=>_0x145113&&_0x145113[_0x2d0d65(0x21f)]===_0x88e199),_0x5bfd42=_0x477426[0x0]||null;!_0x5bfd42&&_0x23799b[_0x2d0d65(0x2c0)](_0x2d0d65(0x2b1)[_0x2d0d65(0x23a)](_0x356297[_0x2d0d65(0x27c)][_0x101218][_0x2d0d65(0x245)](/\\I\[(\d+)\]/gi,''))),this[_0x2d0d65(0x28d)][_0x2d0d65(0x1d0)](_0x5bfd42);}}}}if(_0x3faeaa[_0x2d0d65(0x2c9)](/\[Tier[ ](\d+)\]/i)){const _0x25a584=Number(RegExp['$1']);_0x25a584<tier?(alert(_0x2d0d65(0x2aa)[_0x2d0d65(0x23a)](_0x2dfdb1,_0x25a584,tier)),SceneManager[_0x2d0d65(0x1b2)]()):tier=Math[_0x2d0d65(0x241)](_0x25a584,tier);}VisuMZ[_0x2d0d65(0x276)](VisuMZ[label][_0x2d0d65(0x21c)],_0x578cad['parameters']);})(pluginData),VisuMZ[_0x8b0710(0x242)]['RegExp']={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager['getFirstOfEachWeaponType']=function(){const _0x545a35=_0x8b0710;if(this[_0x545a35(0x28d)]){if(_0x545a35(0x1f1)===_0x545a35(0x1bd)){const _0x599159=_0x50ef17(_0x33a0bb['$1']);_0x599159<_0x54852f?(_0x3a371f(_0x545a35(0x2aa)['format'](_0x41e618,_0x599159,_0x2e17f4)),_0x130606[_0x545a35(0x1b2)]()):_0x1de0ed=_0x45b072['max'](_0x599159,_0x4aa818);}else return this[_0x545a35(0x28d)];}this[_0x545a35(0x28d)]=[];for(let _0x537c29=0x1;_0x537c29<$dataSystem[_0x545a35(0x27c)][_0x545a35(0x205)];_0x537c29++){const _0x608036=$dataWeapons[_0x545a35(0x1d9)](_0x4b8385=>_0x4b8385&&_0x4b8385[_0x545a35(0x21f)]===_0x537c29),_0x5e01e0=_0x608036[0x0]||null;!_0x5e01e0&&console['log']('MISSING\x20WEAPON\x20TYPE:\x20%1'[_0x545a35(0x23a)]($dataSystem[_0x545a35(0x27c)][_0x537c29]['replace'](/\\I\[(\d+)\]/gi,''))),this['_firstOfEachWeaponType'][_0x545a35(0x1d0)](_0x5e01e0);}return this[_0x545a35(0x28d)][_0x545a35(0x220)](null)[_0x545a35(0x220)](undefined),this['_firstOfEachWeaponType'];},DataManager['getWtypeIdWithName']=function(_0x2937ab){const _0x24b25b=_0x8b0710;_0x2937ab=_0x2937ab['toUpperCase']()[_0x24b25b(0x265)](),this[_0x24b25b(0x243)]=this['_wtypeIDs']||{};if(this[_0x24b25b(0x243)][_0x2937ab])return this['_wtypeIDs'][_0x2937ab];for(let _0x404695=0x1;_0x404695<0x64;_0x404695++){if(!$dataSystem[_0x24b25b(0x27c)][_0x404695])continue;let _0x374310=$dataSystem[_0x24b25b(0x27c)][_0x404695][_0x24b25b(0x24b)]()[_0x24b25b(0x265)]();_0x374310=_0x374310[_0x24b25b(0x245)](/\x1I\[(\d+)\]/gi,''),_0x374310=_0x374310[_0x24b25b(0x245)](/\\I\[(\d+)\]/gi,''),this[_0x24b25b(0x243)][_0x374310]=_0x404695;}return this[_0x24b25b(0x243)]['BARE\x20HANDS']=0x0,this[_0x24b25b(0x243)][_0x2937ab]||0x0;},ImageManager[_0x8b0710(0x1fb)]=VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x21c)]['UI']['SwapCommandIcon'],TextManager[_0x8b0710(0x1f6)]=VisuMZ[_0x8b0710(0x242)]['Settings']['UI'][_0x8b0710(0x26f)],TextManager['swapWeaponHelp']=VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x21c)]['UI'][_0x8b0710(0x23e)]??_0x8b0710(0x2a4),VisuMZ['WeaponSwapSystem']['Game_Action_applyGlobal']=Game_Action['prototype'][_0x8b0710(0x25e)],Game_Action[_0x8b0710(0x1d3)][_0x8b0710(0x25e)]=function(){const _0x36341f=_0x8b0710;VisuMZ[_0x36341f(0x242)]['Game_Action_applyGlobal'][_0x36341f(0x25c)](this),this[_0x36341f(0x272)]()&&this[_0x36341f(0x272)]()['isActor']()&&this['isSkill']()&&this[_0x36341f(0x272)]()[_0x36341f(0x22f)](this[_0x36341f(0x2bb)]());},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x24e)]=Game_BattlerBase[_0x8b0710(0x1d3)]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0x8b0710(0x1c9)]=function(_0x3b4759){const _0x4e18c9=_0x8b0710;return VisuMZ['WeaponSwapSystem'][_0x4e18c9(0x24e)]['call'](this,_0x3b4759)&&this[_0x4e18c9(0x27e)](_0x3b4759);},Game_BattlerBase['prototype'][_0x8b0710(0x27e)]=function(_0x1c9c53){return!![];},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x27f)]=Game_Battler[_0x8b0710(0x1d3)][_0x8b0710(0x253)],Game_Battler[_0x8b0710(0x1d3)]['requestMotionRefresh']=function(){const _0x478649=_0x8b0710;if(this['battler']()&&this[_0x478649(0x27d)]){if(_0x478649(0x2a3)==='MRtTd')return;else{if(!this['canWeaponSwap']())return;if(!_0x5d16a7[_0x478649(0x242)][_0x478649(0x1ce)]['call'](this,0x0))return;for(let _0x3028b5=0x1;_0x3028b5<_0x2498b7[_0x478649(0x27c)][_0x478649(0x205)];_0x3028b5++){this[_0x478649(0x269)](_0x3028b5),this['changeWeapon'](null);}this['refresh']();}}else{if(_0x478649(0x1ff)!==_0x478649(0x1ff))return this[_0x478649(0x28d)];else VisuMZ[_0x478649(0x242)][_0x478649(0x27f)][_0x478649(0x25c)](this);}},Game_Actor[_0x8b0710(0x252)]=VisuMZ['WeaponSwapSystem']['Settings'][_0x8b0710(0x268)][_0x8b0710(0x1b6)],VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x25a)]=Game_Actor[_0x8b0710(0x1d3)]['initEquips'],Game_Actor[_0x8b0710(0x1d3)]['initEquips']=function(_0x433b73){const _0x37cdad=_0x8b0710;VisuMZ[_0x37cdad(0x242)][_0x37cdad(0x25a)][_0x37cdad(0x25c)](this,_0x433b73),this[_0x37cdad(0x1c7)]();},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x1c7)]=function(){const _0xba49a5=_0x8b0710;this[_0xba49a5(0x240)]={};for(let _0x13b3f6=0x1;_0x13b3f6<$dataSystem[_0xba49a5(0x27c)][_0xba49a5(0x205)];_0x13b3f6++){this[_0xba49a5(0x240)][_0x13b3f6]=0x0;}this[_0xba49a5(0x216)]=0x0;for(const _0x2234d2 of this[_0xba49a5(0x2ab)]()){if(!_0x2234d2)continue;const _0x58f071=_0x2234d2[_0xba49a5(0x21f)];this[_0xba49a5(0x240)][_0x58f071]=_0x2234d2['id'],this[_0xba49a5(0x216)]=this[_0xba49a5(0x216)]||_0x58f071;}},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x289)]=function(){const _0x44aa43=_0x8b0710;return this[_0x44aa43(0x23f)]()[_0x44aa43(0x25d)](0x1);},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1af)]=Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x1ef)],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x1ef)]=function(){return![];},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x292)]=Game_Actor['prototype'][_0x8b0710(0x23f)],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x23f)]=function(){const _0x227748=_0x8b0710;let _0x3fbc73=VisuMZ[_0x227748(0x242)]['Game_Actor_equipSlots'][_0x227748(0x25c)](this);if(_0x3fbc73[_0x227748(0x25d)](0x1)){if(_0x227748(0x2cb)!==_0x227748(0x2cb)){if(this[_0x227748(0x28d)])return this['_firstOfEachWeaponType'];this[_0x227748(0x28d)]=[];for(let _0x3216eb=0x1;_0x3216eb<_0x134beb[_0x227748(0x27c)][_0x227748(0x205)];_0x3216eb++){const _0xa2942f=_0x225461[_0x227748(0x1d9)](_0x2d9099=>_0x2d9099&&_0x2d9099[_0x227748(0x21f)]===_0x3216eb),_0x4ce5c9=_0xa2942f[0x0]||null;!_0x4ce5c9&&_0x1bd8c3[_0x227748(0x2c0)](_0x227748(0x2b1)[_0x227748(0x23a)](_0x49ab4c[_0x227748(0x27c)][_0x3216eb][_0x227748(0x245)](/\\I\[(\d+)\]/gi,''))),this[_0x227748(0x28d)][_0x227748(0x1d0)](_0x4ce5c9);}return this['_firstOfEachWeaponType'][_0x227748(0x220)](null)[_0x227748(0x220)](_0x51bb05),this[_0x227748(0x28d)];}else _0x3fbc73[_0x227748(0x220)](0x1),_0x3fbc73[_0x227748(0x29a)](0x1);}return _0x3fbc73;},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x27a)]=function(){const _0xc0ad09=_0x8b0710;let _0x527b67=_0xc0ad09(0x27a);if(this['checkCacheKey'](_0x527b67))return this[_0xc0ad09(0x2cf)][_0x527b67];return this['_cache'][_0x527b67]=this[_0xc0ad09(0x2cd)](),this[_0xc0ad09(0x2cf)][_0x527b67];},Game_Actor['prototype'][_0x8b0710(0x2cd)]=function(){const _0xd3dc56=_0x8b0710,_0x4fe18b=[],_0x382ceb=$dataSystem['weaponTypes'][_0xd3dc56(0x205)];for(let _0x16e842=0x1;_0x16e842<_0x382ceb;_0x16e842++){if('OauvY'!==_0xd3dc56(0x1d5)){if(this[_0xd3dc56(0x2b6)](_0x16e842))_0x4fe18b['push'](_0x16e842);}else this[_0xd3dc56(0x240)][_0x3d3fbd]=0x0;}return _0x4fe18b;},Game_Actor['prototype'][_0x8b0710(0x230)]=function(_0x54160e){const _0x1725b7=_0x8b0710;return this[_0x1725b7(0x240)]===undefined&&this[_0x1725b7(0x1c7)](),this['_swapWeapons'][_0x54160e]=this[_0x1725b7(0x240)][_0x54160e]||0x0,$dataWeapons[this[_0x1725b7(0x240)][_0x54160e]]||null;},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x212)]=function(){const _0x5cd422=_0x8b0710;return this['weaponSwapTypes']()[_0x5cd422(0x1bb)](_0x42df9b=>this['getSwapWeapon'](_0x42df9b))['remove'](null)[_0x5cd422(0x220)](undefined);},Game_Actor[_0x8b0710(0x1d3)]['setSwapWeapon']=function(_0x340519,_0x103c78){const _0x3b15dc=_0x8b0710;this['_swapWeapons']===undefined&&this[_0x3b15dc(0x1c7)](),this[_0x3b15dc(0x240)][_0x340519]=_0x103c78,this[_0x3b15dc(0x20f)]();},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x29f)]=function(){const _0x174ef7=_0x8b0710;this['_swapWeapons']===undefined&&(_0x174ef7(0x262)!==_0x174ef7(0x206)?this[_0x174ef7(0x1c7)]():_0x576ce6[_0x174ef7(0x1b1)](this['_itemWindow']['_slotId'],null));const _0x56fc01=this[_0x174ef7(0x216)],_0x24e267=this['weaponSwapTypes']();let _0x1f738d=_0x24e267[_0x174ef7(0x1ac)](this['_currentWeaponType']);for(;;){_0x1f738d++;if(_0x1f738d>=_0x24e267[_0x174ef7(0x205)])_0x1f738d=0x0;if(this[_0x174ef7(0x230)](_0x24e267[_0x1f738d]))break;}const _0x266534=_0x24e267[_0x1f738d];this[_0x174ef7(0x269)](_0x266534),_0x266534!==_0x56fc01&&this[_0x174ef7(0x239)](!![]);},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x226)]=function(){const _0x17ab89=_0x8b0710;if(this[_0x17ab89(0x240)]===undefined){if(_0x17ab89(0x290)==='GMMmc')return _0x4182a7['WeaponSwapSystem']['Window_EquipItem_includes']['call'](this,_0x1937fb);else this[_0x17ab89(0x1c7)]();}const _0x38279b=this[_0x17ab89(0x216)],_0x4ff88b=this['weaponSwapTypes']();let _0x1fc0b4=_0x4ff88b['indexOf'](this[_0x17ab89(0x216)]);for(;;){_0x1fc0b4--;if(_0x1fc0b4<0x0)_0x1fc0b4=_0x4ff88b[_0x17ab89(0x205)]-0x1;if(this['getSwapWeapon'](_0x4ff88b[_0x1fc0b4]))break;}const _0x4fdf6a=_0x4ff88b[_0x1fc0b4];this[_0x17ab89(0x269)](_0x4fdf6a),_0x4fdf6a!==_0x38279b&&this[_0x17ab89(0x239)](!![]);},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x239)]=function(_0x239626){const _0x52be40=_0x8b0710,_0x3f1b25=this[_0x52be40(0x2ab)]()[0x0];_0x3f1b25&&_0x239626&&(this['_swappingWeapon']=!![],this[_0x52be40(0x1f5)]());},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x269)]=function(_0x501e22){const _0x1248a4=_0x8b0710;this[_0x1248a4(0x240)]===undefined&&this[_0x1248a4(0x1c7)]();_0x501e22=_0x501e22||0x0;if(!this[_0x1248a4(0x289)]())return;if(!this[_0x1248a4(0x2b6)](_0x501e22))return;this[_0x1248a4(0x216)]=_0x501e22,this[_0x1248a4(0x240)][_0x501e22]=this[_0x1248a4(0x240)][_0x501e22]||0x0;const _0x52b728=$dataWeapons[this[_0x1248a4(0x240)][_0x501e22]]||null;this[_0x1248a4(0x23c)][0x0][_0x1248a4(0x2bf)](_0x52b728),this[_0x1248a4(0x2cf)]={};},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1ea)]=Game_Actor['prototype'][_0x8b0710(0x1b1)],Game_Actor[_0x8b0710(0x1d3)]['changeEquip']=function(_0x4a2ce9,_0x1c54ca){const _0x46a425=_0x8b0710;if(DataManager['isWeapon'](_0x1c54ca)||_0x4a2ce9===0x0&&this[_0x46a425(0x289)]())this[_0x46a425(0x22c)](_0x1c54ca);else{if(_0x46a425(0x1e9)===_0x46a425(0x1e9))VisuMZ[_0x46a425(0x242)][_0x46a425(0x1ea)][_0x46a425(0x25c)](this,_0x4a2ce9,_0x1c54ca);else return!this[_0x46a425(0x259)]()['includes'](this[_0x46a425(0x2c6)]());}},Game_Actor['prototype'][_0x8b0710(0x22c)]=function(_0x1f40af){const _0x29bfcd=_0x8b0710;if(!!_0x1f40af){if('aYENI'!==_0x29bfcd(0x261)){const _0x4355a1=_0x1f40af[_0x29bfcd(0x21f)];this[_0x29bfcd(0x269)](_0x4355a1);const _0x476ffd=this[_0x29bfcd(0x2ab)]()[0x0];if(!!_0x476ffd){if(_0x29bfcd(0x1cd)!=='upZtK'){if(!this[_0x29bfcd(0x279)])return![];if(this['currentSymbol']()!==_0x29bfcd(0x1ee))return![];if(this['_actor'][_0x29bfcd(0x27a)]()[_0x29bfcd(0x205)]<=0x1)return![];return this[_0x29bfcd(0x279)][_0x29bfcd(0x212)]()[_0x29bfcd(0x205)]>0x1;}else this['tradeItemWithParty'](_0x1f40af,_0x476ffd);}else _0x29bfcd(0x299)===_0x29bfcd(0x299)?this[_0x29bfcd(0x1cc)](_0x1f40af,null):(this[_0x29bfcd(0x240)]===_0x37d533&&this[_0x29bfcd(0x1c7)](),this[_0x29bfcd(0x240)][_0x543c26]=_0x35bf73,this[_0x29bfcd(0x20f)]());this['setSwapWeapon'](_0x4355a1,_0x1f40af['id']),this[_0x29bfcd(0x269)](_0x4355a1);}else _0xd4e04['prototype']['cursorLeft'][_0x29bfcd(0x25c)](this,_0x33ab2b);}else{if(!!this[_0x29bfcd(0x2ab)]()[0x0]){const _0x4ce71e=this[_0x29bfcd(0x2ab)]()[0x0],_0x3d0106=_0x4ce71e[_0x29bfcd(0x21f)];this['switchToWeaponType'](_0x3d0106),this[_0x29bfcd(0x1cc)](null,_0x4ce71e),this[_0x29bfcd(0x1be)](_0x3d0106,0x0),this[_0x29bfcd(0x29e)]();}}this['refresh']();},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x24c)]=function(){const _0x453400=_0x8b0710;if(this[_0x453400(0x2ab)]()[_0x453400(0x205)]>0x0)return;const _0x46dfab=this[_0x453400(0x212)](),_0x5ea28a=_0x46dfab[0x0]||null,_0x432cf2=_0x5ea28a?_0x5ea28a['wtypeId']:0x0;this['switchToWeaponType'](_0x432cf2);},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x274)]=function(_0xca2d6e){const _0x58fe59=_0x8b0710;if(this['_checkingWeaponSwaps']||_0xca2d6e||this[_0x58fe59(0x270)])return;this['_checkingWeaponSwaps']=!![];let _0xbefe0=![];for(let _0x507810=0x1;_0x507810<$dataSystem[_0x58fe59(0x27c)][_0x58fe59(0x205)];_0x507810++){if(this['isEquipWtypeOk'](_0x507810))continue;const _0x36b2fa=this[_0x58fe59(0x230)](_0x507810);if(!_0x36b2fa)continue;this[_0x58fe59(0x240)][_0x507810]=0x0,$gameParty['gainItem'](_0x36b2fa,0x1),_0xbefe0=!![],this[_0x58fe59(0x23c)][0x0]['object']()===_0x36b2fa&&this['_equips'][0x0][_0x58fe59(0x2bf)](null);}if(_0xbefe0){const _0x4c900a=this[_0x58fe59(0x2ab)]()[0x0]||null;this['_currentWeaponType']=_0x4c900a?_0x4c900a[_0x58fe59(0x21f)]:0x0,this[_0x58fe59(0x20f)]();}this[_0x58fe59(0x21b)]=undefined;},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x20b)]=Game_Actor['prototype'][_0x8b0710(0x221)],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x221)]=function(_0x29bbdf){const _0x582f93=_0x8b0710;this['processWeaponSwapRelease'](_0x29bbdf),VisuMZ[_0x582f93(0x242)][_0x582f93(0x20b)]['call'](this,_0x29bbdf);},Game_Actor['prototype'][_0x8b0710(0x1fc)]=function(){const _0x28e9a1=_0x8b0710,_0x104e80=this['_currentWeaponType'],_0x439e81=DataManager[_0x28e9a1(0x1e0)]();for(const _0x192c29 of this[_0x28e9a1(0x27a)]()){if(this[_0x28e9a1(0x230)](_0x192c29))continue;const _0x4203f6=_0x439e81[_0x192c29-0x1];_0x4203f6&&this['setSwapWeapon'](_0x192c29,_0x4203f6['id']);}this[_0x28e9a1(0x269)](_0x104e80);},Game_Actor['prototype']['meetsAnyWeaponEquippedCondition']=function(_0x381c2d){const _0x8faf6=_0x8b0710;return _0x381c2d&&_0x381c2d[_0x8faf6(0x1e6)][_0x8faf6(0x2c9)](VisuMZ[_0x8faf6(0x242)][_0x8faf6(0x256)][_0x8faf6(0x1f9)])?!!this[_0x8faf6(0x2ab)]()[0x0]:!![];},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x214)]=function(_0x13954b){const _0x5207c6=_0x8b0710,_0x1caa47=_0x13954b[_0x5207c6(0x249)],_0x1882f4=_0x13954b['requiredWtypeId2'];if(_0x1caa47===0x0&&_0x1882f4===0x0)return!![];if(_0x1caa47>0x0&&!this[_0x5207c6(0x230)](_0x1caa47))return![];if(_0x1882f4>0x0&&!this['getSwapWeapon'](_0x1882f4))return![];return!![];},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x22f)]=function(_0x34e3aa){const _0x594833=_0x8b0710;if(!DataManager[_0x594833(0x1c0)](_0x34e3aa))return;const _0x37cd0b=VisuMZ[_0x594833(0x242)]['RegExp'];if(_0x34e3aa[_0x594833(0x1e6)]['match'](_0x37cd0b[_0x594833(0x28f)])){if(_0x594833(0x24f)===_0x594833(0x283))this[_0x594833(0x22c)](_0xcfa2a);else{this['switchToWeaponType'](Number(RegExp['$1']));return;}}else{if(_0x34e3aa[_0x594833(0x1e6)]['match'](_0x37cd0b['SwitchWpnTypeStr'])){const _0x15894a=DataManager[_0x594833(0x1e8)](RegExp['$1']);this[_0x594833(0x269)](_0x15894a);return;}}if(this[_0x594833(0x2a8)]===_0x34e3aa[_0x594833(0x249)]||this[_0x594833(0x2a8)]===_0x34e3aa['requiredWtypeId2']){if(_0x594833(0x207)!==_0x594833(0x207))return!![];else return;}if(_0x34e3aa['requiredWtypeId1']>0x0)this[_0x594833(0x269)](_0x34e3aa[_0x594833(0x249)]);else _0x34e3aa['requiredWtypeId2']>0x0&&this[_0x594833(0x269)](_0x34e3aa[_0x594833(0x2bd)]);},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x26a)]=Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x294)],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x294)]=function(){const _0x5a0334=_0x8b0710;VisuMZ[_0x5a0334(0x242)]['Game_Actor_optimizeEquipments'][_0x5a0334(0x25c)](this),this['optimizeSwappableWeapons']();},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1e3)]=Game_Actor[_0x8b0710(0x1d3)]['isOptimizeEquipOk'],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x286)]=function(_0x201a30){const _0x407117=_0x8b0710;if(this[_0x407117(0x289)]()&&_0x201a30===0x0)return![];return VisuMZ[_0x407117(0x242)][_0x407117(0x1e3)][_0x407117(0x25c)](this,_0x201a30);},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x2a1)]=function(){const _0x3de949=_0x8b0710;if(!this['canWeaponSwap']())return;if(!VisuMZ[_0x3de949(0x242)]['Game_Actor_isOptimizeEquipOk'][_0x3de949(0x25c)](this,0x0))return;const _0x4a9232=this['_currentWeaponType'];for(const _0x14d353 of this[_0x3de949(0x27a)]()){_0x3de949(0x1b3)!==_0x3de949(0x1b3)?_0x1bd4ba=_0x52a430[_0x3de949(0x27c)][_0x3de949(0x205)]-0x2:(this[_0x3de949(0x269)](_0x14d353),this[_0x3de949(0x22c)](this[_0x3de949(0x28a)](_0x14d353)));}this['switchToWeaponType'](_0x4a9232),this[_0x3de949(0x20f)]();},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x28a)]=function(_0x14a6fd){const _0x3130ba=_0x8b0710,_0x212c27=$gameParty[_0x3130ba(0x2ab)]()['filter'](_0x40e3ab=>_0x40e3ab[_0x3130ba(0x21f)]===_0x14a6fd);let _0x1c5b8c=null,_0x421712=-0x3e8;for(let _0x2d5232=0x0;_0x2d5232<_0x212c27['length'];_0x2d5232++){if(_0x3130ba(0x1b4)===_0x3130ba(0x1b4)){const _0x5b58fa=this[_0x3130ba(0x20a)](_0x212c27[_0x2d5232]);_0x5b58fa>_0x421712&&(_0x3130ba(0x291)!==_0x3130ba(0x291)?_0x234cee[_0x3130ba(0x234)](_0x7f0e0a)||_0x3b2b80===0x0&&this[_0x3130ba(0x289)]()?this[_0x3130ba(0x22c)](_0x2d037d):_0x300b7c['WeaponSwapSystem'][_0x3130ba(0x1ea)]['call'](this,_0x309e42,_0x45c7e8):(_0x421712=_0x5b58fa,_0x1c5b8c=_0x212c27[_0x2d5232]));}else return;}return _0x1c5b8c;},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1c1)]=Game_Actor[_0x8b0710(0x1d3)]['clearEquipments'],Game_Actor['prototype'][_0x8b0710(0x2b3)]=function(){const _0x6f432c=_0x8b0710;VisuMZ['WeaponSwapSystem'][_0x6f432c(0x1c1)][_0x6f432c(0x25c)](this),this[_0x6f432c(0x2ce)]();},VisuMZ[_0x8b0710(0x242)]['Game_Actor_isClearEquipOk']=Game_Actor['prototype'][_0x8b0710(0x1c6)],Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x1c6)]=function(_0x32a9da){const _0x509fbe=_0x8b0710;if(this[_0x509fbe(0x289)]()&&_0x32a9da===0x0)return![];return VisuMZ[_0x509fbe(0x242)]['Game_Actor_isClearEquipOk']['call'](this,_0x32a9da);},Game_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x2ce)]=function(){const _0x30d6dd=_0x8b0710;if(!this['canWeaponSwap']())return;if(!VisuMZ[_0x30d6dd(0x242)]['Game_Actor_isClearEquipOk'][_0x30d6dd(0x25c)](this,0x0))return;for(let _0x4ae6aa=0x1;_0x4ae6aa<$dataSystem[_0x30d6dd(0x27c)][_0x30d6dd(0x205)];_0x4ae6aa++){if(_0x30d6dd(0x1c4)!=='zSXwu')return![];else this[_0x30d6dd(0x269)](_0x4ae6aa),this[_0x30d6dd(0x22c)](null);}this[_0x30d6dd(0x20f)]();},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x258)]=Game_Party[_0x8b0710(0x1d3)][_0x8b0710(0x238)],Game_Party[_0x8b0710(0x1d3)]['setupBattleTestMembers']=function(){const _0x59f6da=_0x8b0710;VisuMZ['WeaponSwapSystem'][_0x59f6da(0x258)]['call'](this);for(const _0x58b5d7 of this[_0x59f6da(0x24d)]()){if(!_0x58b5d7)continue;_0x58b5d7['setupBattleTestWeapons']();}this[_0x59f6da(0x203)]=!![];},Scene_Equip[_0x8b0710(0x1d3)]['executeEquipChange']=function(){const _0x318609=_0x8b0710,_0x1830de=this[_0x318609(0x244)](),_0x31a9eb=this[_0x318609(0x22a)][_0x318609(0x266)],_0x2b495f=this[_0x318609(0x22a)][_0x318609(0x2bb)]();_0x1830de[_0x318609(0x1b1)](_0x31a9eb,_0x2b495f);},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x264)]=Scene_Battle[_0x8b0710(0x1d3)][_0x8b0710(0x204)],Scene_Battle[_0x8b0710(0x1d3)][_0x8b0710(0x204)]=function(){const _0x3acdac=_0x8b0710;VisuMZ[_0x3acdac(0x242)][_0x3acdac(0x264)][_0x3acdac(0x25c)](this);const _0x1c64ec=this['_actorCommandWindow'];_0x1c64ec['setHandler'](_0x3acdac(0x288),this[_0x3acdac(0x2cc)][_0x3acdac(0x296)](this));},Scene_Battle[_0x8b0710(0x1d3)][_0x8b0710(0x2cc)]=function(){const _0x51b82f=_0x8b0710,_0x307d95=BattleManager[_0x51b82f(0x244)]();_0x307d95['swapWeaponNext'](),this[_0x51b82f(0x1bc)][_0x51b82f(0x2af)](),this[_0x51b82f(0x1bc)][_0x51b82f(0x20f)]();},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x1cb)]=Sprite_Actor[_0x8b0710(0x1d3)][_0x8b0710(0x201)],Sprite_Actor['prototype'][_0x8b0710(0x201)]=function(){const _0x36a53a=_0x8b0710;this[_0x36a53a(0x279)]&&this[_0x36a53a(0x279)][_0x36a53a(0x27d)]&&(this[_0x36a53a(0x279)]['_swappingWeapon']=undefined),VisuMZ['WeaponSwapSystem']['Sprite_Actor_refreshMotion']['call'](this);},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x257)]=Window_Base[_0x8b0710(0x1d3)]['playOkSound'],Window_Base[_0x8b0710(0x1d3)][_0x8b0710(0x218)]=function(){const _0xe0965b=_0x8b0710;if(this[_0xe0965b(0x23b)]['name']===_0xe0965b(0x2a0)&&this[_0xe0965b(0x2b5)]()===_0xe0965b(0x288)){if(_0xe0965b(0x282)===_0xe0965b(0x282))SoundManager[_0xe0965b(0x2a9)]();else return _0x578b39[_0xe0965b(0x1b7)]&&this[_0xe0965b(0x2b5)]()===_0xe0965b(0x1ee)&&this['_actor']&&this['_actor'][_0xe0965b(0x289)]()&&this[_0xe0965b(0x279)][_0xe0965b(0x212)]()[_0xe0965b(0x205)]>0x1;}else{if(_0xe0965b(0x21e)===_0xe0965b(0x21e))VisuMZ['WeaponSwapSystem'][_0xe0965b(0x257)][_0xe0965b(0x25c)](this);else return;}},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x1c3)]=Window_StatusBase[_0x8b0710(0x1d3)]['actorSlotName'],Window_StatusBase[_0x8b0710(0x1d3)][_0x8b0710(0x28c)]=function(_0xef9b80,_0x3f7b16){const _0x278c21=_0x8b0710;if(_0xef9b80&&_0xef9b80[_0x278c21(0x289)]())return this['actorSlotNameWeaponSwap'](_0xef9b80,_0x3f7b16);else{if(_0x278c21(0x1fe)===_0x278c21(0x1fe))return VisuMZ[_0x278c21(0x242)]['Window_StatusBase_actorSlotName'][_0x278c21(0x25c)](this,_0xef9b80,_0x3f7b16);else _0x29c52b(_0x278c21(0x2b9)['format'](_0x29326a,_0x264997)),_0x40f967[_0x278c21(0x1b2)]();}},Window_StatusBase[_0x8b0710(0x1d3)][_0x8b0710(0x281)]=function(_0x43eb69,_0x2050e0){const _0x4dfd80=_0x8b0710;let _0x57a184=_0x43eb69[_0x4dfd80(0x27a)]()[_0x4dfd80(0x205)]-0x1;Window_EquipSlot[_0x4dfd80(0x1d8)]&&(_0x57a184=$dataSystem[_0x4dfd80(0x27c)][_0x4dfd80(0x205)]-0x2);if(_0x2050e0>_0x57a184)return _0x2050e0-=_0x57a184,VisuMZ[_0x4dfd80(0x242)][_0x4dfd80(0x1c3)][_0x4dfd80(0x25c)](this,_0x43eb69,_0x2050e0);else{let _0x5614fb='';if(Window_EquipSlot[_0x4dfd80(0x1d8)])_0x5614fb=$dataSystem[_0x4dfd80(0x27c)][_0x2050e0+0x1]||'';else{if(_0x4dfd80(0x277)!==_0x4dfd80(0x285)){const _0x1c2384=_0x43eb69['weaponSwapTypes']()[_0x2050e0];_0x5614fb=$dataSystem['weaponTypes'][_0x1c2384]||'';}else _0x4a9c44(_0x4dfd80(0x2aa)['format'](_0x52f5e4,_0x2b42ca,_0x5aadfc)),_0x2903c1['exit']();}return _0x5614fb=_0x5614fb['replace'](/\\I\[(\d+)\]/gi,''),_0x5614fb;}},Window_EquipSlot[_0x8b0710(0x1d8)]=VisuMZ['WeaponSwapSystem'][_0x8b0710(0x21c)]['UI'][_0x8b0710(0x2ae)],VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x295)]=Window_EquipSlot['prototype'][_0x8b0710(0x2a2)],Window_EquipSlot['prototype'][_0x8b0710(0x2a2)]=function(){const _0x58a02=_0x8b0710;if(this['_actor']&&this['_actor'][_0x58a02(0x289)]()){if('QiAkP'===_0x58a02(0x271))return this['maxItemsWeaponSwap']();else this[_0x58a02(0x1cc)](_0x1357d4,_0x475baa);}else return VisuMZ[_0x58a02(0x242)][_0x58a02(0x295)]['call'](this);},Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x1e7)]=function(){const _0x517352=_0x8b0710;let _0x244ecb=this['_actor'][_0x517352(0x23f)]()[_0x517352(0x205)]-0x1;if(Window_EquipSlot[_0x517352(0x1d8)])_0x244ecb+=$dataSystem[_0x517352(0x27c)][_0x517352(0x205)]-0x1;else{if(_0x517352(0x260)===_0x517352(0x2a7)){if(!_0x2f1651)return!this[_0x517352(0x259)]()['includes'](this[_0x517352(0x2c6)]());return _0x14ee27[_0x517352(0x242)]['Window_EquipItem_isEnabled'][_0x517352(0x25c)](this,_0x48350c);}else _0x244ecb+=this[_0x517352(0x279)][_0x517352(0x27a)]()['length'];}return _0x244ecb;},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x2c1)]=Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x247)],Window_EquipSlot[_0x8b0710(0x1d3)]['itemAt']=function(_0x46baf1){const _0x476644=_0x8b0710;return this['_actor']&&this[_0x476644(0x279)][_0x476644(0x289)]()?this[_0x476644(0x2b2)](_0x46baf1):VisuMZ[_0x476644(0x242)][_0x476644(0x2c1)]['call'](this,_0x46baf1);},Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x2b2)]=function(_0x16cc9a){const _0x5d7c91=_0x8b0710;let _0x4f5146=this[_0x5d7c91(0x279)]['weaponSwapTypes']()[_0x5d7c91(0x205)]-0x1;Window_EquipSlot[_0x5d7c91(0x1d8)]&&(_0x4f5146=$dataSystem[_0x5d7c91(0x27c)][_0x5d7c91(0x205)]-0x2);if(_0x16cc9a>_0x4f5146)return _0x5d7c91(0x2ba)==='bBkgq'?(_0x16cc9a-=_0x4f5146,VisuMZ[_0x5d7c91(0x242)][_0x5d7c91(0x2c1)][_0x5d7c91(0x25c)](this,_0x16cc9a)):this[_0x5d7c91(0x27a)]()[_0x5d7c91(0x1bb)](_0x54174a=>this[_0x5d7c91(0x230)](_0x54174a))[_0x5d7c91(0x220)](null)[_0x5d7c91(0x220)](_0x1f1810);else{if('dSUjW'!==_0x5d7c91(0x232)){let _0x67cf19=this[_0x5d7c91(0x279)][_0x5d7c91(0x27a)]()[_0x16cc9a];return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x67cf19=_0x16cc9a+0x1),this['_actor'][_0x5d7c91(0x230)](_0x67cf19);}else this[_0x5d7c91(0x28e)]-=0x20;}},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x236)]=Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x27b)],Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x27b)]=function(_0x2a9cba){const _0x565df9=_0x8b0710;return this[_0x565df9(0x279)]&&this['_actor'][_0x565df9(0x289)]()?_0x565df9(0x223)!==_0x565df9(0x1dc)?this[_0x565df9(0x26e)](_0x2a9cba):_0x3b0e33[_0x565df9(0x242)][_0x565df9(0x236)][_0x565df9(0x25c)](this,_0x376fb7):_0x565df9(0x1bf)!==_0x565df9(0x1bf)?this[_0x565df9(0x23f)]()[_0x565df9(0x25d)](0x1):VisuMZ[_0x565df9(0x242)]['Window_EquipSlot_isEnabled'][_0x565df9(0x25c)](this,_0x2a9cba);},Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x26e)]=function(_0x2e1586){const _0x18a152=_0x8b0710;let _0x528279=this[_0x18a152(0x279)][_0x18a152(0x27a)]()['length']-0x1;Window_EquipSlot[_0x18a152(0x1d8)]&&(_0x528279=$dataSystem['weaponTypes'][_0x18a152(0x205)]-0x2);if(_0x2e1586>_0x528279)return _0x2e1586-=_0x528279,VisuMZ[_0x18a152(0x242)]['Window_EquipSlot_isEnabled']['call'](this,_0x2e1586);else{if(!this[_0x18a152(0x279)][_0x18a152(0x21d)](0x0))return![];else return Window_EquipSlot[_0x18a152(0x1d8)]?this[_0x18a152(0x279)][_0x18a152(0x27a)]()[_0x18a152(0x25d)](_0x2e1586+0x1):!![];}},Window_EquipSlot[_0x8b0710(0x1d3)]['processShiftRemoveShortcut']=function(){const _0x4847dc=_0x8b0710;SoundManager[_0x4847dc(0x2a9)]();const _0xb58853=SceneManager['_scene']['_actor'];this[_0x4847dc(0x22a)][_0x4847dc(0x266)]>0x0?_0xb58853[_0x4847dc(0x1b1)](this[_0x4847dc(0x22a)][_0x4847dc(0x266)],null):(_0xb58853[_0x4847dc(0x269)](this[_0x4847dc(0x22a)][_0x4847dc(0x22d)]),_0xb58853[_0x4847dc(0x22c)](null));this['refresh'](),this[_0x4847dc(0x22a)][_0x4847dc(0x20f)](),this['callUpdateHelp']();const _0x1e725a=SceneManager[_0x4847dc(0x1f4)][_0x4847dc(0x26b)];if(_0x1e725a)_0x1e725a['refresh']();},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1c8)]=Window_EquipSlot[_0x8b0710(0x1d3)][_0x8b0710(0x1e5)],Window_EquipSlot['prototype']['equipSlotIndex']=function(){const _0x4769b9=_0x8b0710;let _0x32ec59=VisuMZ[_0x4769b9(0x242)][_0x4769b9(0x1c8)],_0x152ab1=this['_actor']['weaponSwapTypes']()[_0x4769b9(0x205)]-0x1;return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x152ab1=$dataSystem[_0x4769b9(0x27c)][_0x4769b9(0x205)]-0x2),Math[_0x4769b9(0x241)](0x0,_0x32ec59-_0x152ab1);},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1f8)]=Window_EquipItem['prototype'][_0x8b0710(0x1dd)],Window_EquipItem[_0x8b0710(0x1d3)][_0x8b0710(0x1dd)]=function(_0x367f0e){const _0x3e295e=_0x8b0710;VisuMZ['WeaponSwapSystem'][_0x3e295e(0x1f8)][_0x3e295e(0x25c)](this,_0x367f0e),this[_0x3e295e(0x22d)]=0x0;},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1b0)]=Window_EquipItem[_0x8b0710(0x1d3)][_0x8b0710(0x255)],Window_EquipItem['prototype'][_0x8b0710(0x255)]=function(_0x34e047){const _0x1f2bf3=_0x8b0710;if(!this[_0x1f2bf3(0x279)]){if('TKFsi'===_0x1f2bf3(0x1df))return VisuMZ[_0x1f2bf3(0x242)]['Window_EquipItem_setSlotId'][_0x1f2bf3(0x25c)](this,_0x34e047);else{const _0x511508=_0x2c5db0[this[_0x1f2bf3(0x279)][_0x1f2bf3(0x231)]()];if(!_0x511508)return;if(!this[_0x1f2bf3(0x1d1)](_0x511508))return;if(!_0x2d44b4[_0x1f2bf3(0x22b)])return;const _0x51a3f4=this[_0x1f2bf3(0x279)][_0x1f2bf3(0x2ab)]()[0x0];if(!_0x51a3f4)return;const _0x431dc9=this[_0x1f2bf3(0x1da)](),_0x1664aa=_0x40e49f[_0x1f2bf3(0x210)](_0x511508),_0x989899=_0x51a3f4[_0x1f2bf3(0x229)],_0x571d51=_0x431dc9===_0x1f2bf3(0x20d)?_0x1664aa:_0x1f2bf3(0x1d4)[_0x1f2bf3(0x23a)](_0x989899,_0x1664aa),_0x1b2d5f=this[_0x1f2bf3(0x1d2)](_0x1f2bf3(0x1ee));if(_0x1b2d5f>=0x0){const _0x1b86ad=this[_0x1f2bf3(0x278)][_0x1b2d5f];_0x1b86ad[_0x1f2bf3(0x1fd)]=_0x571d51;}}}let _0x33271f=this[_0x1f2bf3(0x279)][_0x1f2bf3(0x27a)]()[_0x1f2bf3(0x205)]-0x1;Window_EquipSlot[_0x1f2bf3(0x1d8)]&&(_0x33271f=$dataSystem['weaponTypes'][_0x1f2bf3(0x205)]-0x2);if(_0x34e047>_0x33271f)_0x34e047-=_0x33271f,this[_0x1f2bf3(0x22d)]=0x0,VisuMZ['WeaponSwapSystem'][_0x1f2bf3(0x1b0)][_0x1f2bf3(0x25c)](this,_0x34e047);else{if(Window_EquipSlot[_0x1f2bf3(0x1d8)])'supSS'===_0x1f2bf3(0x1d6)?this['_wtypeID']=_0x34e047+0x1:(_0x4e2a56=_0x4637db,_0x4940ff=_0x512433[_0x23d055]);else{if(_0x1f2bf3(0x2b0)!==_0x1f2bf3(0x2b0)){if(!_0x4af98f['WEAPON_SWAP_SHOW_COMMAND']&&!_0x467980)return;if(this[_0x1f2bf3(0x279)][_0x1f2bf3(0x27a)]()[_0x1f2bf3(0x205)]<=0x1)return;this[_0x1f2bf3(0x1d2)](_0x1f2bf3(0x288))>=0x0&&this[_0x1f2bf3(0x298)]();const _0x1426ea=this[_0x1f2bf3(0x1da)](),_0xde031a=_0x45acce[_0x1f2bf3(0x1f6)],_0x4e57fc=_0x32a1c9['swapWeaponIcon'],_0x3ac74b=_0x1426ea==='text'?_0xde031a:_0x1f2bf3(0x1d4)[_0x1f2bf3(0x23a)](_0x4e57fc,_0xde031a);this['addCommand'](_0x3ac74b,_0x1f2bf3(0x288));}else this[_0x1f2bf3(0x22d)]=this[_0x1f2bf3(0x279)]['weaponSwapTypes']()[_0x34e047];}_0x34e047=0x0,VisuMZ[_0x1f2bf3(0x242)][_0x1f2bf3(0x1b0)]['call'](this,_0x34e047),this[_0x1f2bf3(0x279)][_0x1f2bf3(0x269)](this[_0x1f2bf3(0x22d)]),this[_0x1f2bf3(0x26b)]&&(_0x1f2bf3(0x2c7)===_0x1f2bf3(0x2c7)?this['_statusWindow'][_0x1f2bf3(0x20f)]():_0x2ddead[_0x1f2bf3(0x242)][_0x1f2bf3(0x27f)]['call'](this));}},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x2b8)]=Window_EquipItem['prototype'][_0x8b0710(0x25d)],Window_EquipItem[_0x8b0710(0x1d3)]['includes']=function(_0x208d1){const _0x15be82=_0x8b0710;if(_0x208d1===null){if(_0x15be82(0x1ca)===_0x15be82(0x2c3))this[_0x15be82(0x272)]()[_0x15be82(0x22f)](this['item']());else return!this[_0x15be82(0x259)]()[_0x15be82(0x25d)](this[_0x15be82(0x2c6)]());}else{if(this[_0x15be82(0x266)]===0x0&&this[_0x15be82(0x22d)]!==0x0){if(_0x15be82(0x297)!=='gUDiq')_0x1070d5['remove'](0x1),_0x273d92[_0x15be82(0x29a)](0x1);else return _0x208d1['wtypeId']===this[_0x15be82(0x22d)];}else return VisuMZ[_0x15be82(0x242)][_0x15be82(0x2b8)][_0x15be82(0x25c)](this,_0x208d1);}},VisuMZ['WeaponSwapSystem'][_0x8b0710(0x1cf)]=Window_EquipItem['prototype'][_0x8b0710(0x27b)],Window_EquipItem[_0x8b0710(0x1d3)][_0x8b0710(0x27b)]=function(_0x6d0791){const _0x243872=_0x8b0710;if(!_0x6d0791)return!this[_0x243872(0x259)]()[_0x243872(0x25d)](this['etypeId']());return VisuMZ[_0x243872(0x242)][_0x243872(0x1cf)][_0x243872(0x25c)](this,_0x6d0791);},Window_ActorCommand[_0x8b0710(0x22b)]=VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x21c)]['UI'][_0x8b0710(0x237)],Window_ActorCommand[_0x8b0710(0x1b7)]=VisuMZ['WeaponSwapSystem'][_0x8b0710(0x21c)]['UI'][_0x8b0710(0x2c4)],Window_ActorCommand[_0x8b0710(0x21a)]=VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x21c)]['UI'][_0x8b0710(0x2bc)],Window_ActorCommand[_0x8b0710(0x228)]=VisuMZ['WeaponSwapSystem']['Settings']['UI'][_0x8b0710(0x251)],VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x250)]=Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1dd)],Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1dd)]=function(_0x22b6f2){const _0x4216d1=_0x8b0710;VisuMZ['WeaponSwapSystem'][_0x4216d1(0x250)][_0x4216d1(0x25c)](this,_0x22b6f2),this[_0x4216d1(0x2c8)]();},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x2ad)]=Window_ActorCommand['prototype'][_0x8b0710(0x1f7)],Window_ActorCommand[_0x8b0710(0x1d3)]['addAttackCommand']=function(){const _0x20b8da=_0x8b0710;if(this[_0x20b8da(0x279)])this[_0x20b8da(0x279)][_0x20b8da(0x24c)]();VisuMZ[_0x20b8da(0x242)]['Window_ActorCommand_addAttackCommand'][_0x20b8da(0x25c)](this);if(!this[_0x20b8da(0x279)][_0x20b8da(0x289)]())return;this[_0x20b8da(0x235)]();if(this[_0x20b8da(0x1d2)](_0x20b8da(0x288))>=0x0)return;this['addWeaponSwapCommand']();},Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x235)]=function(){const _0x59a1db=_0x8b0710,_0x3b95a8=$dataSkills[this['_actor'][_0x59a1db(0x231)]()];if(!_0x3b95a8)return;if(!this[_0x59a1db(0x1d1)](_0x3b95a8))return;if(!Window_ActorCommand['WEAPON_SWAP_CHANGE_ATTACK_ICON'])return;const _0x36e08f=this['_actor']['weapons']()[0x0];if(!_0x36e08f)return;const _0x457af4=this[_0x59a1db(0x1da)](),_0x4bb1ac=DataManager['battleCommandName'](_0x3b95a8),_0x3c9708=_0x36e08f['iconIndex'],_0xd93f3b=_0x457af4===_0x59a1db(0x20d)?_0x4bb1ac:_0x59a1db(0x1d4)[_0x59a1db(0x23a)](_0x3c9708,_0x4bb1ac),_0x340796=this[_0x59a1db(0x1d2)](_0x59a1db(0x1ee));if(_0x340796>=0x0){const _0x3749ba=this[_0x59a1db(0x278)][_0x340796];_0x3749ba[_0x59a1db(0x1fd)]=_0xd93f3b;}},Window_ActorCommand['prototype'][_0x8b0710(0x2c2)]=function(_0x2af482){const _0x5705e9=_0x8b0710;if(!Window_ActorCommand[_0x5705e9(0x228)]&&!_0x2af482)return;if(this[_0x5705e9(0x279)]['weaponSwapTypes']()[_0x5705e9(0x205)]<=0x1)return;this[_0x5705e9(0x1d2)](_0x5705e9(0x288))>=0x0&&this[_0x5705e9(0x298)]();const _0x44b412=this[_0x5705e9(0x1da)](),_0x4915f2=TextManager[_0x5705e9(0x1f6)],_0x2c4bf2=ImageManager[_0x5705e9(0x1fb)],_0x10a63c=_0x44b412===_0x5705e9(0x20d)?_0x4915f2:_0x5705e9(0x1d4)[_0x5705e9(0x23a)](_0x2c4bf2,_0x4915f2);this['addCommand'](_0x10a63c,_0x5705e9(0x288));},Window_ActorCommand['prototype'][_0x8b0710(0x298)]=function(){const _0x38a10a=_0x8b0710;while(this['findSymbol'](_0x38a10a(0x288))>=0x0){const _0x2c9536=this[_0x38a10a(0x1d2)](_0x38a10a(0x288));this[_0x38a10a(0x278)][_0x38a10a(0x1e1)](_0x2c9536,0x1);}},Window_ActorCommand[_0x8b0710(0x1d3)]['isWeaponSwapShortcutEnabled']=function(){const _0x4c7e7a=_0x8b0710;return Window_ActorCommand[_0x4c7e7a(0x1b7)]&&this[_0x4c7e7a(0x2b5)]()===_0x4c7e7a(0x1ee)&&this[_0x4c7e7a(0x279)]&&this['_actor'][_0x4c7e7a(0x289)]()&&this[_0x4c7e7a(0x279)]['getAllEquippedSwapWeapons']()[_0x4c7e7a(0x205)]>0x1;},Window_ActorCommand['prototype']['cursorRight']=function(_0x4feeda){const _0x4d3680=_0x8b0710;this['isWeaponSwapShortcutEnabled']()?this['performWeaponSwap'](!![]):Window_Command[_0x4d3680(0x1d3)]['cursorRight']['call'](this,_0x4feeda);},Window_ActorCommand['prototype'][_0x8b0710(0x200)]=function(_0x33296e){const _0x9aec24=_0x8b0710;this[_0x9aec24(0x1c2)]()?this[_0x9aec24(0x273)](![]):Window_Command[_0x9aec24(0x1d3)]['cursorLeft'][_0x9aec24(0x25c)](this,_0x33296e);},Window_ActorCommand['prototype']['performWeaponSwap']=function(_0x3a617f){const _0x14480d=_0x8b0710;_0x3a617f?_0x14480d(0x29c)!==_0x14480d(0x1fa)?this['_actor'][_0x14480d(0x29f)]():this[_0x14480d(0x23b)][_0x14480d(0x1fd)]===_0x14480d(0x2a0)&&this[_0x14480d(0x2b5)]()===_0x14480d(0x288)?_0x16dab8[_0x14480d(0x2a9)]():_0x5c6a92['WeaponSwapSystem'][_0x14480d(0x257)][_0x14480d(0x25c)](this):this[_0x14480d(0x279)][_0x14480d(0x226)](),SoundManager['playEquip'](),this[_0x14480d(0x20f)]();},Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x2c8)]=function(){const _0xa73d5b=_0x8b0710;if(!Window_ActorCommand[_0xa73d5b(0x1b7)])return;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS'])return;const _0x46cde1=[new Sprite(),new Sprite()];for(const _0xa02588 of _0x46cde1){if(_0xa73d5b(0x20e)!==_0xa73d5b(0x215))this[_0xa73d5b(0x263)](_0xa02588),_0xa02588[_0xa73d5b(0x28e)]=0x0,_0xa02588[_0xa73d5b(0x2ca)]['y']=0.5,_0xa02588[_0xa73d5b(0x1f0)]=ImageManager[_0xa73d5b(0x217)](_0xa73d5b(0x28b));else{const _0xcc49dd=_0x30ae37[_0xa73d5b(0x249)],_0x3cc3aa=_0x5a44ee[_0xa73d5b(0x2bd)];if(_0xcc49dd===0x0&&_0x3cc3aa===0x0)return!![];if(_0xcc49dd>0x0&&!this[_0xa73d5b(0x230)](_0xcc49dd))return![];if(_0x3cc3aa>0x0&&!this['getSwapWeapon'](_0x3cc3aa))return![];return!![];}}_0x46cde1[0x0][_0xa73d5b(0x2ca)]['x']=0x0,_0x46cde1[0x0][_0xa73d5b(0x1b5)](0x78,0x24,0x18,0x18),_0x46cde1[0x0]['x']=0x0,this[_0xa73d5b(0x1ed)]=_0x46cde1[0x0],_0x46cde1[0x1][_0xa73d5b(0x2ca)]['x']=0x1,_0x46cde1[0x1][_0xa73d5b(0x1b5)](0x90,0x24,0x18,0x18),_0x46cde1[0x1]['x']=this[_0xa73d5b(0x29d)],this[_0xa73d5b(0x254)]=_0x46cde1[0x1];},Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1db)]=function(){const _0x3dd8d3=_0x8b0710;Window_Scrollable[_0x3dd8d3(0x1d3)][_0x3dd8d3(0x1db)][_0x3dd8d3(0x25c)](this),this[_0x3dd8d3(0x202)]();},Window_ActorCommand['prototype']['updateWeaponSwapShortcutSprites']=function(){const _0x18bbb4=_0x8b0710;if(!Window_ActorCommand[_0x18bbb4(0x1b7)])return;if(!Window_ActorCommand[_0x18bbb4(0x21a)])return;VisuMZ[_0x18bbb4(0x242)][_0x18bbb4(0x209)][_0x18bbb4(0x25c)](this['_weaponSwapShortcutSprite_Left']),VisuMZ[_0x18bbb4(0x242)][_0x18bbb4(0x209)]['call'](this[_0x18bbb4(0x254)]);},Window_ActorCommand[_0x8b0710(0x1d3)]['isWeaponSwapShortcutVisible']=function(){const _0x5381cb=_0x8b0710;if(!this[_0x5381cb(0x279)])return![];if(this[_0x5381cb(0x2b5)]()!==_0x5381cb(0x1ee))return![];if(this['_actor'][_0x5381cb(0x27a)]()[_0x5381cb(0x205)]<=0x1)return![];return this[_0x5381cb(0x279)][_0x5381cb(0x212)]()[_0x5381cb(0x205)]>0x1;},VisuMZ[_0x8b0710(0x242)]['updateShortcutOpacity']=function(){const _0x1dbc6c=_0x8b0710;if(!this[_0x1dbc6c(0x225)][_0x1dbc6c(0x1de)]||this[_0x1dbc6c(0x225)][_0x1dbc6c(0x23d)]<0xff||this[_0x1dbc6c(0x225)][_0x1dbc6c(0x29b)]<0xff)this[_0x1dbc6c(0x28e)]=0x0;else{if(this['parent'][_0x1dbc6c(0x233)]()){var _0x41e0bb=this['parent'][_0x1dbc6c(0x267)](this[_0x1dbc6c(0x225)][_0x1dbc6c(0x1d2)]('attack')),_0x1654e5=_0x41e0bb['y']+this[_0x1dbc6c(0x225)][_0x1dbc6c(0x26d)];_0x1654e5>0x0&&_0x1654e5<this[_0x1dbc6c(0x225)][_0x1dbc6c(0x1ba)]-this[_0x1dbc6c(0x225)][_0x1dbc6c(0x26d)]*0x2&&('cwMSu'==='sLbfT'?(_0x16cc73['WeaponSwapSystem'][_0x1dbc6c(0x250)][_0x1dbc6c(0x25c)](this,_0x29240c),this[_0x1dbc6c(0x2c8)]()):(_0x1654e5+=Math[_0x1dbc6c(0x2b4)](this[_0x1dbc6c(0x225)][_0x1dbc6c(0x2ac)]()/0x2),this['opacity']=0xff,this['y']=_0x1654e5));}else this[_0x1dbc6c(0x28e)]-=0x20;}},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x1f2)]=Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1d7)],Window_ActorCommand[_0x8b0710(0x1d3)]['setup']=function(_0x55e01f){const _0x15ee91=_0x8b0710;VisuMZ['WeaponSwapSystem'][_0x15ee91(0x1f2)][_0x15ee91(0x25c)](this,_0x55e01f),this[_0x15ee91(0x254)]&&(this[_0x15ee91(0x254)]['x']=this[_0x15ee91(0x29d)]);},VisuMZ[_0x8b0710(0x242)][_0x8b0710(0x21c)]['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1e4)],Window_ActorCommand[_0x8b0710(0x1d3)][_0x8b0710(0x1e4)]=function(){const _0x5e3053=_0x8b0710,_0x29656c=this['currentSymbol']();switch(_0x29656c){case'weaponSwap':this[_0x5e3053(0x1ae)]['setText'](TextManager[_0x5e3053(0x1b8)]);break;default:VisuMZ[_0x5e3053(0x242)]['Settings'][_0x5e3053(0x208)][_0x5e3053(0x25c)](this);break;}};