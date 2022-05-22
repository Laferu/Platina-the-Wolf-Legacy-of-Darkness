//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.23] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param PartySystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x521d2e=_0x317e;(function(_0x397780,_0x392b68){const _0x48afb7=_0x317e,_0x2a7cab=_0x397780();while(!![]){try{const _0x17fc7b=parseInt(_0x48afb7(0x1e7))/0x1+-parseInt(_0x48afb7(0x22c))/0x2*(parseInt(_0x48afb7(0x2f4))/0x3)+parseInt(_0x48afb7(0x253))/0x4+parseInt(_0x48afb7(0x240))/0x5+-parseInt(_0x48afb7(0x2ff))/0x6+-parseInt(_0x48afb7(0x1a7))/0x7+parseInt(_0x48afb7(0x23a))/0x8*(parseInt(_0x48afb7(0x1a9))/0x9);if(_0x17fc7b===_0x392b68)break;else _0x2a7cab['push'](_0x2a7cab['shift']());}catch(_0x328020){_0x2a7cab['push'](_0x2a7cab['shift']());}}}(_0x364c,0xe3f38));function _0x364c(){const _0x35372a=['AssistSwapIn','currentSymbol','clear','drawDarkRect','_callSceneParty','visible','isFTB','reservePartyLabelRect','swapOrderPartySystemPlugin','Game_Party_initialize','isEnabled','drawSvActor','battlePartySwitchCooldown','MoveRandomToActive','ActivePartyLabelRect','fillRect','postPartySwitchMenuTurnBased','width','updateBattlePartySwitchCooldown','BattleSwitchWindowBgType','contents','uiInputPosition','center','ARRAYEVAL','Window_PartyCommand_updateHelp','LockIcon','Require','paintOpacity','toUpperCase','formation','processDrawItem','updateBattleProcess','_helpWindow','battlerName','getBackgroundOpacity','Game_Party_addActor','padding','ARRAYSTRUCT','initialize','_windowLayer','VisuMZ_2_BattleSystemSTB','drawActorPartyIcons','max','members','CallPartyScene','sortActors','Sprite_Actor_update','applyBattlePartySwitchCooldown','windowPadding','createStatusWindow','statusLabelRect','terminate','_actorCommandWindow','Game_Actor_setup','push','emptyPartyMember','isQueueFormationMenu','MaxBattleMembers','actor','EVAL','parameters','_partyLocked','onReserveOk','CoreEngine','faceWidth','battleLayoutStyle','addCustomCommands','reserveParty','3DNCOIb','battlePartyChangeIcon','processPartySwitchMember','NUM','maxItems','return\x200','BattlePartyCmd','BattleHelpSwitch','status','_statusPartyWindow','regenerateAll','701118OWgGLk','onPartySwitchOk','reselect','ReserveBattlerOffsetY','statusWindowRect','isCurrentItemEnabled','reserveTransfer','setBattler','VisuMZ_2_BattleSystemOTB','addCommand','addNonBattleTestMembers','ActiveParty','_partyRequired','_backSprite2','drawItemEmpty','getParamValue','itemPadding','ActivePartyWindowRect','addWindow','startSwitchOutAnimation','canSwitchPartyInBattle','trim','isPlaytest','loadFace','itemHeight','innerHeight','VisuMZ_2_BattleSystemPTB','DrawBackRect','removeActor','createPartySwitchWindow','activePartyLabelRect','isNextSceneBattleTransitionable','SnapshotOpacity','name','ARRAYJSON','VisuMZ_0_CoreEngine','_partyCommandWindow','LockPartyMembers','isPreviousSceneBattleTransitionable','BattleSwitchWindowRect','Value','General','innerWidth','PartyCmdWinAddParty','requiredPartyMemberIcon','_otb_actionBattlersNext','setBackgroundOpacity','VisuMZ_2_BattleSystemCTB','pendingIndex','setStatusWindow','isSceneBattle','ReservePartyLabelRect','Game_Party_swapOrder','index','defaultMaxBattleMembers','select','_callPartyMemberSwitch','battlePartyChangeCmd','update','_pageupButton','playEquip','clearPartySwitchCommandCooldown','_activePartyWindow','otbReturnBattlerToTurnOrders','BackRectColor','drawActorPartyIconsVert','initBattleMembers','loadCharacter','createPageButtons','round','constructor','isActor','switchStateIconActor','level','maxBattleMembers','mapId','isImmediateTpb','characterName','PartySystem','tpbImmediateAction','buttonAssistKey3','assistSwapInPartyMember','BattleManager_setup','_partySystemBattleCommandCooldown','_lastIndex','checkShiftRemoveShortcut','rearrangePartyActors','checkShiftSortShortcut','_currentActor','addActor','createReservePartyLabel','updatePartySwitch','ReserveParty','parse','callPartyMemberSwitch','_inputting','resetFontSettings','Window_ActorCommand_updateHelp','activeParty','reservePartyWindowRect','VisuMZ_1_BattleCore','processCursorMove','updateTurnOrderCTB','placeBasicGauges','_actionBattlers','AssistSwapPosition','Scene_Battle_createActorCommandWindow','_actor','battlePartySwitchCmdHelp','Game_Battler_regenerateAll','_spriteset','changeTextColor','AddRemoveCmd','loadTitle2','processShiftSortShortcut','drawParamText','battleMembers','processOk','ceil','_pagedownButton','onReserveCancel','lineHeight','_actorGraphic','direction','callUpdateHelp','actorId','gaugeBackColor','updateHelp','height','_battleSystemIncompatibilityError','snapForBackground','allMembers','itemRectWithPadding','ARRAYSTR','commandFormation','activate','BgSettings','isOkEnabled','changePaintOpacity','drawItemStatus','itemLineRect','callFormation','_backSprite1','assistRemovePartyMember','onPartySwitchCancel','isSTB','clearPartyBattleCommandCooldown','7540694CtdkqM','startOpacity','909RmlBJO','_battleMaxSize','playOkSound','VisuMZ_1_MainMenuCore','setupBattleTest','playCursorSound','isFormationCommandEnabled','isPreviousScene','getPartySystemBackColor','setPartyRequirement','_reservePartyLabel','changeMaxBattleMembers','selectActor','isShiftShortcutEnabled','assistSwapOutPartyMember','cursorUp','log','ActorCmdWinAddParty','clearTpbChargeTime','filter','Game_Unit_inBattle','Game_Battler_onBattleStart','onBattlePartySwitch','battlePartySwitchCmd','AssistSwapOut','QueuePartyScene','SceneManager_isPreviousSceneBattleTransitionable','create','description','_partySwitchDuration','onBattleStart','StatusLabelRect','equips','_clickHandler','partySwitchWindowRectStandard','_partySystemSwitchOut','drawItemImageFace','postPartySwitchMenuTpb','VisuMZ_2_BattleSystemBTB','iconWidth','Scene_Battle_isTimeActive','indexOf','initPartySystem','open','setupBattleTestMembers','faceName','smoothSelect','drawItemImageSprite','drawItemImageSvActor','drawParamName','_tpbState','call','Scene_Base_isAutosaveEnabled','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ReserveCol','swapOrder','isBTB','ReservePartyWindowBgType','anyRequiredPartyMembersInReserve','Game_Party_setupBattleTest','ReservePartyLabelBgType','RequireIcon','875967MZkFSi','rawBattleMembers','startMove','isCTB','right','drawActorName','drawActorClass','drawRemoveCommand','loadTitle1','DisplayedParams','setupStartingMembers','remove','centerSprite','createActivePartyLabel','Actors','addChild','ReservePartyWindowRect','onActiveOk','face','drawItem','makeActionOrders','updateTurnOrderSTB','isRightInputMode','cursorPagedown','bind','lockPartyMemberIcon','isRequiredInParty','bitmap','teamBasedFirstAvailableMember','initEquips','sprite','_tpbChargeTime','loadSvActor','skillItemWindowRectBorderStyle','battlePartyChangeCmdHelp','Scene_Battle_createAllWindows','buttonAssistText1','registerCommand','includes','nameStartPosition','param','_rowThickness','battler','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ConvertParams','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','toLowerCase','isPartyCommandEnabled','map','isFormationCommandAdded','setup','_scene','ActiveBattlerOffsetX','_statusWindow','drawItemDarkRect','assistSwapPositions','_activePartyLabel','prototype','ActivePartyGraphic','isCancelEnabled','addFormationCommand','cursorDown','preparePartySwitchMember','increaseTurn','requestRefresh','drawText','buttonAssistText3','ReserveSpriteOffsetX','ActivePartyWindowBgType','1064942yQKpIh','ReserveBattlerOffsetX','setPartyLock','Game_Troop_increaseTurn','_partySwitchTargetActor','hasBattleSystemIncompatibilities','Settings','VisuMZ_2_BattleSystemFTB','ReserveItemThickness','changeLevel','sortActionOrdersBTB','isSceneMap','addRemoveCommand','isAppeared','119656LXjiTf','createCustomBackgroundImages','isTriggered','refreshAllWindows','setText','refresh','361880zgfGdH','loadFaceImages','Empty','createActorCommandWindow','STRUCT','partySwitchWindowRectBorder','quickSwap','_partyMemberSwitchWindow','text','cursorPageup','drawActorFace','dimColor1','_tpbSceneChangeCacheActor','Game_Party_removeActor','updatePadding','setBattlePartySwitchCooldown','cursorVisible','commandPartyMemberSwitch','PartyCmdCooldown','805016fqEnzi','itemRect','ActiveTpbFormationMessage','findSymbol','isFormationChangeOk','splice','shift','addText','min','setBackgroundType','#%1','BgFilename2','FUNC','reserveMembers','createAllWindows','_logWindow','cancel','removeActorFromBattleMembers','drawActorCharacter','makeActions','uiMenuStyle','ActivePartyLabelBgType','iconHeight','isPartyCommandAdded','length','ActiveSpriteOffsetX','stepForward','partyChangeRefresh','commandStyle','createBackground','concat','_reservePartyWindow','loadPartyImages','Remove','createPartyCommandWindowBattleCore','ARRAYNUM','gradientFillRect','deactivate','charged','drawIcon','currentActor','activePartyWindowRect','clearBypassAutoSave','textColor','getColor','isTpb','isOTB','initMaxBattleMembers','partySwitchWindowRect','isSceneParty','drawActorPartyIconsHorz','active','createStatusLabel','setHandler','isActiveTpb','adjustSprite','_battleMembers','svbattler','removePartyMember','isShiftRemoveShortcutEnabled','inBattle','ActiveSpriteOffsetY','faceHeight','removePartyCommand','close','drawItemImage','actorParams','JSON','StatusWindowRect','Index','exit','addLoadListener','checkInitBattleMembers','isShowPartySwitchOutAnimation','addActorToBattleMembersAtIndex','BgFilename1','_actors','addActorToBattleMembers','drawParamValue','match','_statusPartyLabel','ChangeMaxBattleMembers','Scene_Battle_isAnyInputWindowActive','format','setActor','Window','BattleSwitchOut','_partySwitchBattleCommandCooldown','border','_subject','ReserveSpriteOffsetY','Vocab','StatusLabelBgType'];_0x364c=function(){return _0x35372a;};return _0x364c();}var label=_0x521d2e(0x162),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x521d2e(0x1bc)](function(_0x9eba4e){const _0x36fed4=_0x521d2e;return _0x9eba4e[_0x36fed4(0x2fc)]&&_0x9eba4e[_0x36fed4(0x1c5)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x521d2e(0x232)]||{},VisuMZ[_0x521d2e(0x213)]=function(_0x4efe5d,_0x1c4e11){const _0x3fd02d=_0x521d2e;for(const _0x1557cf in _0x1c4e11){if(_0x1557cf[_0x3fd02d(0x2a2)](/(.*):(.*)/i)){const _0x46ce28=String(RegExp['$1']),_0x49226b=String(RegExp['$2'])[_0x3fd02d(0x2cc)]()['trim']();let _0x250a25,_0x211ae2,_0x139f8b;switch(_0x49226b){case _0x3fd02d(0x2f7):_0x250a25=_0x1c4e11[_0x1557cf]!==''?Number(_0x1c4e11[_0x1557cf]):0x0;break;case _0x3fd02d(0x276):_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON['parse'](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2[_0x3fd02d(0x217)](_0x154f23=>Number(_0x154f23));break;case _0x3fd02d(0x2eb):_0x250a25=_0x1c4e11[_0x1557cf]!==''?eval(_0x1c4e11[_0x1557cf]):null;break;case _0x3fd02d(0x2c7):_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2[_0x3fd02d(0x217)](_0x30494b=>eval(_0x30494b));break;case _0x3fd02d(0x296):_0x250a25=_0x1c4e11[_0x1557cf]!==''?JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf]):'';break;case _0x3fd02d(0x321):_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON['parse'](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2['map'](_0x2dfcfb=>JSON[_0x3fd02d(0x171)](_0x2dfcfb));break;case _0x3fd02d(0x25f):_0x250a25=_0x1c4e11[_0x1557cf]!==''?new Function(JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf])):new Function(_0x3fd02d(0x2f9));break;case'ARRAYFUNC':_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2['map'](_0x301818=>new Function(JSON[_0x3fd02d(0x171)](_0x301818)));break;case'STR':_0x250a25=_0x1c4e11[_0x1557cf]!==''?String(_0x1c4e11[_0x1557cf]):'';break;case _0x3fd02d(0x199):_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2[_0x3fd02d(0x217)](_0x234173=>String(_0x234173));break;case _0x3fd02d(0x244):_0x139f8b=_0x1c4e11[_0x1557cf]!==''?JSON['parse'](_0x1c4e11[_0x1557cf]):{},_0x250a25=VisuMZ[_0x3fd02d(0x213)]({},_0x139f8b);break;case _0x3fd02d(0x2d5):_0x211ae2=_0x1c4e11[_0x1557cf]!==''?JSON[_0x3fd02d(0x171)](_0x1c4e11[_0x1557cf]):[],_0x250a25=_0x211ae2['map'](_0x1acbe2=>VisuMZ['ConvertParams']({},JSON[_0x3fd02d(0x171)](_0x1acbe2)));break;default:continue;}_0x4efe5d[_0x46ce28]=_0x250a25;}}return _0x4efe5d;},(_0x28ee0c=>{const _0x18d098=_0x521d2e,_0x23fd51=_0x28ee0c[_0x18d098(0x320)];for(const _0x5c1757 of dependencies){if(!Imported[_0x5c1757]){alert(_0x18d098(0x212)[_0x18d098(0x2a6)](_0x23fd51,_0x5c1757)),SceneManager[_0x18d098(0x299)]();break;}}const _0x212a35=_0x28ee0c[_0x18d098(0x1c5)];if(_0x212a35[_0x18d098(0x2a2)](/\[Version[ ](.*?)\]/i)){const _0xb2f303=Number(RegExp['$1']);_0xb2f303!==VisuMZ[label]['version']&&(alert(_0x18d098(0x1de)[_0x18d098(0x2a6)](_0x23fd51,_0xb2f303)),SceneManager['exit']());}if(_0x212a35[_0x18d098(0x2a2)](/\[Tier[ ](\d+)\]/i)){const _0x38584f=Number(RegExp['$1']);_0x38584f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x18d098(0x2a6)](_0x23fd51,_0x38584f,tier)),SceneManager[_0x18d098(0x299)]()):tier=Math['max'](_0x38584f,tier);}VisuMZ[_0x18d098(0x213)](VisuMZ[label][_0x18d098(0x232)],_0x28ee0c[_0x18d098(0x2ec)]);})(pluginData),PluginManager[_0x521d2e(0x20c)](pluginData[_0x521d2e(0x320)],_0x521d2e(0x2dc),_0xb4bced=>{const _0x537b92=_0x521d2e;SceneManager[_0x537b92(0x2e6)](Scene_Party);}),PluginManager['registerCommand'](pluginData[_0x521d2e(0x320)],_0x521d2e(0x2a4),_0x4a6fcf=>{const _0x235d91=_0x521d2e;if($gameParty[_0x235d91(0x28f)]())return;VisuMZ[_0x235d91(0x213)](_0x4a6fcf,_0x4a6fcf);const _0x4103f4=_0x4a6fcf[_0x235d91(0x13c)];$gameParty[_0x235d91(0x1b4)](_0x4103f4);}),PluginManager[_0x521d2e(0x20c)](pluginData['name'],'MoveActorsToActive',_0x4ce5be=>{const _0x499703=_0x521d2e;if(!SceneManager[_0x499703(0x237)]())return;VisuMZ[_0x499703(0x213)](_0x4ce5be,_0x4ce5be);const _0x1c9d48=_0x4ce5be[_0x499703(0x1f5)];for(const _0x4e081d of _0x1c9d48){$gameParty['addActorToBattleMembers'](_0x4e081d);}$gamePlayer[_0x499703(0x23f)]();}),PluginManager[_0x521d2e(0x20c)](pluginData[_0x521d2e(0x320)],'MoveActorsToReserve',_0x329cf1=>{const _0x4e291c=_0x521d2e;if(!SceneManager[_0x4e291c(0x237)]())return;VisuMZ[_0x4e291c(0x213)](_0x329cf1,_0x329cf1);const _0x30914f=_0x329cf1[_0x4e291c(0x1f5)];for(const _0x3f10c8 of _0x30914f){if($gameParty[_0x4e291c(0x188)]()[_0x4e291c(0x26b)]<=0x1)break;$gameParty['removeActorFromBattleMembers'](_0x3f10c8);}$gamePlayer['refresh']();}),PluginManager[_0x521d2e(0x20c)](pluginData[_0x521d2e(0x320)],'MovePartyIndexToReserve',_0x25e27a=>{const _0x4abf8b=_0x521d2e;if(!SceneManager[_0x4abf8b(0x237)]())return;if($gameParty['battleMembers']()[_0x4abf8b(0x26b)]<=0x1)return;if(!$gameParty[_0x4abf8b(0x28b)])return;if($gameParty[_0x4abf8b(0x28b)]['length']<=0x0)return;VisuMZ['ConvertParams'](_0x25e27a,_0x25e27a);const _0x538a82=_0x25e27a[_0x4abf8b(0x298)],_0x59e546=$gameParty[_0x4abf8b(0x28b)][_0x538a82];$gameParty[_0x4abf8b(0x264)](_0x59e546),$gamePlayer[_0x4abf8b(0x23f)]();}),PluginManager['registerCommand'](pluginData[_0x521d2e(0x320)],_0x521d2e(0x2bd),_0x11ed69=>{const _0x1bf8bf=_0x521d2e;if(!SceneManager['isSceneMap']())return;if($gameParty[_0x1bf8bf(0x188)]()[_0x1bf8bf(0x26b)]>=$gameParty[_0x1bf8bf(0x15e)]())return;if($gameParty[_0x1bf8bf(0x260)]()[_0x1bf8bf(0x26b)]<=0x0)return;const _0x20bed4=$gameParty['reserveMembers'](),_0x2ea0dc=_0x20bed4[Math['floor'](Math['random']()*_0x20bed4[_0x1bf8bf(0x26b)])],_0xd327e3=_0x2ea0dc[_0x1bf8bf(0x191)]();$gameParty['addActorToBattleMembers'](_0xd327e3),$gamePlayer[_0x1bf8bf(0x23f)]();}),PluginManager[_0x521d2e(0x20c)](pluginData[_0x521d2e(0x320)],_0x521d2e(0x139),_0x181fd9=>{const _0x159ff6=_0x521d2e;VisuMZ[_0x159ff6(0x213)](_0x181fd9,_0x181fd9);const _0x4083b7=_0x181fd9[_0x159ff6(0x1f5)][_0x159ff6(0x217)](_0x43f559=>$gameActors[_0x159ff6(0x2ea)](_0x43f559))['remove'](null),_0x2e253b=_0x181fd9['Lock'];for(const _0x1502d6 of _0x4083b7){if(!_0x1502d6)continue;_0x1502d6[_0x159ff6(0x22e)](_0x2e253b);}}),PluginManager[_0x521d2e(0x20c)](pluginData[_0x521d2e(0x320)],'RequirePartyMembers',_0x4394a7=>{const _0x56cb5b=_0x521d2e;VisuMZ['ConvertParams'](_0x4394a7,_0x4394a7);const _0x1964cb=_0x4394a7[_0x56cb5b(0x1f5)][_0x56cb5b(0x217)](_0x1b3031=>$gameActors[_0x56cb5b(0x2ea)](_0x1b3031))[_0x56cb5b(0x1f2)](null),_0x2d5c50=_0x4394a7[_0x56cb5b(0x2ca)];for(const _0x345026 of _0x1964cb){if(!_0x345026)continue;_0x345026[_0x56cb5b(0x1b2)](_0x2d5c50);}}),ImageManager[_0x521d2e(0x200)]=VisuMZ['PartySystem']['Settings'][_0x521d2e(0x13d)][_0x521d2e(0x2c9)],ImageManager[_0x521d2e(0x140)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x13d)][_0x521d2e(0x1e6)],TextManager[_0x521d2e(0x176)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2ae)][_0x521d2e(0x30a)],TextManager[_0x521d2e(0x2f3)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)]['Vocab'][_0x521d2e(0x170)],TextManager['statusParty']=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2ae)]['Status'],TextManager[_0x521d2e(0x2e7)]=VisuMZ['PartySystem'][_0x521d2e(0x232)][_0x521d2e(0x2ae)][_0x521d2e(0x242)],TextManager[_0x521d2e(0x28d)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)]['Vocab'][_0x521d2e(0x274)],TextManager[_0x521d2e(0x21e)]=VisuMZ['PartySystem']['Settings'][_0x521d2e(0x2ae)][_0x521d2e(0x17d)],TextManager[_0x521d2e(0x1a3)]=VisuMZ['PartySystem']['Settings'][_0x521d2e(0x2ae)]['AssistRemove'],TextManager['assistSortPartyMembers']=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)]['Vocab']['AssistSort'],TextManager[_0x521d2e(0x165)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2ae)][_0x521d2e(0x2b0)],TextManager[_0x521d2e(0x1b7)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2ae)][_0x521d2e(0x1c1)],ColorManager[_0x521d2e(0x27f)]=function(_0x2148de){const _0x50ad2b=_0x521d2e;return _0x2148de=String(_0x2148de),_0x2148de['match'](/#(.*)/i)?_0x50ad2b(0x25d)[_0x50ad2b(0x2a6)](String(RegExp['$1'])):this[_0x50ad2b(0x27e)](Number(_0x2148de));},SceneManager[_0x521d2e(0x284)]=function(){const _0x5576d9=_0x521d2e;return this['_scene']&&this[_0x5576d9(0x21a)][_0x5576d9(0x15a)]===Scene_Party;},SceneManager[_0x521d2e(0x237)]=function(){const _0x2f89ee=_0x521d2e;return this[_0x2f89ee(0x21a)]&&this[_0x2f89ee(0x21a)]['constructor']===Scene_Map;},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x166)]=BattleManager['setup'],BattleManager['setup']=function(_0x4f48d9,_0x19bc0f,_0x56c93e){const _0x50bf99=_0x521d2e;VisuMZ[_0x50bf99(0x162)][_0x50bf99(0x166)][_0x50bf99(0x1dc)](this,_0x4f48d9,_0x19bc0f,_0x56c93e),$gameParty[_0x50bf99(0x1a6)]();},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x1be)]=Game_Battler['prototype'][_0x521d2e(0x1c7)],Game_Battler[_0x521d2e(0x220)][_0x521d2e(0x1c7)]=function(_0xfb4ca8){const _0x1a3c04=_0x521d2e;VisuMZ['PartySystem'][_0x1a3c04(0x1be)][_0x1a3c04(0x1dc)](this,_0xfb4ca8);if(this[_0x1a3c04(0x15b)]())this['clearPartySwitchCommandCooldown']();},VisuMZ['PartySystem']['Game_Battler_regenerateAll']=Game_Battler[_0x521d2e(0x220)][_0x521d2e(0x2fe)],Game_Battler['prototype']['regenerateAll']=function(){const _0x5d6b3a=_0x521d2e;VisuMZ[_0x5d6b3a(0x162)][_0x5d6b3a(0x181)][_0x5d6b3a(0x1dc)](this);if(this[_0x5d6b3a(0x15b)]()&&$gameParty[_0x5d6b3a(0x28f)]())this[_0x5d6b3a(0x2c2)]();},VisuMZ['PartySystem'][_0x521d2e(0x2e5)]=Game_Actor[_0x521d2e(0x220)]['setup'],Game_Actor['prototype'][_0x521d2e(0x219)]=function(_0x47499c){const _0x35b8a1=_0x521d2e;VisuMZ['PartySystem'][_0x35b8a1(0x2e5)]['call'](this,_0x47499c),this[_0x35b8a1(0x1d3)](),this[_0x35b8a1(0x151)]();},Game_Actor[_0x521d2e(0x220)][_0x521d2e(0x1d3)]=function(){const _0x3a8fd9=_0x521d2e;this[_0x3a8fd9(0x2ed)]=![],this[_0x3a8fd9(0x30b)]=![];},Game_Actor['prototype'][_0x521d2e(0x257)]=function(){const _0x1d5043=_0x521d2e;if(this[_0x1d5043(0x2ed)]===undefined)this['initPartySystem']();return!this[_0x1d5043(0x2ed)];},Game_Actor['prototype'][_0x521d2e(0x22e)]=function(_0x36057b){const _0x24e349=_0x521d2e;if(this[_0x24e349(0x2ed)]===undefined)this[_0x24e349(0x1d3)]();this[_0x24e349(0x2ed)]=_0x36057b;},Game_Actor[_0x521d2e(0x220)]['isRequiredInParty']=function(){const _0x30b496=_0x521d2e;if(this['_partyRequired']===undefined)this[_0x30b496(0x1d3)]();return this['_partyRequired'];},Game_Actor['prototype'][_0x521d2e(0x1b2)]=function(_0x5778fc){const _0x59c7c6=_0x521d2e;if(this[_0x59c7c6(0x30b)]===undefined)this[_0x59c7c6(0x1d3)]();this[_0x59c7c6(0x30b)]=_0x5778fc;},Game_Actor[_0x521d2e(0x220)]['clearPartySwitchCommandCooldown']=function(){const _0x4e9ff3=_0x521d2e;this[_0x4e9ff3(0x2aa)]=0x0;},Game_Actor['prototype'][_0x521d2e(0x313)]=function(){const _0x53be9f=_0x521d2e;if(this[_0x53be9f(0x2aa)]===undefined)this[_0x53be9f(0x151)]();if(!this[_0x53be9f(0x257)]())return![];if(this[_0x53be9f(0x201)]())return![];return this[_0x53be9f(0x2aa)]<=0x0;},Game_Actor[_0x521d2e(0x220)][_0x521d2e(0x2bc)]=function(){const _0x4b5d85=_0x521d2e;if(this[_0x4b5d85(0x2aa)]===undefined)this[_0x4b5d85(0x151)]();return this['_partySwitchBattleCommandCooldown'];},Game_Actor[_0x521d2e(0x220)]['setBattlePartySwitchCooldown']=function(_0x1081bc){const _0x47cc99=_0x521d2e;if(this[_0x47cc99(0x2aa)]===undefined)this[_0x47cc99(0x151)]();this[_0x47cc99(0x2aa)]=_0x1081bc||0x0;},Game_Actor[_0x521d2e(0x220)][_0x521d2e(0x2df)]=function(){const _0x553429=_0x521d2e;if(this[_0x553429(0x2aa)]===undefined)this[_0x553429(0x151)]();const _0x9b30ea=VisuMZ['PartySystem'][_0x553429(0x232)][_0x553429(0x13d)]['ActorCmdCooldown'];this[_0x553429(0x24f)](_0x9b30ea);},Game_Actor['prototype'][_0x521d2e(0x2c2)]=function(){const _0x3ef7f0=_0x521d2e;if(this[_0x3ef7f0(0x2aa)]===undefined)this[_0x3ef7f0(0x151)]();this[_0x3ef7f0(0x2aa)]--;},Game_Actor[_0x521d2e(0x220)][_0x521d2e(0x1bf)]=function(_0x4d03fe){const _0x28f8ba=_0x521d2e;Imported[_0x28f8ba(0x143)]&&BattleManager[_0x28f8ba(0x1ea)]()&&BattleManager[_0x28f8ba(0x17a)]();Imported[_0x28f8ba(0x2d8)]&&BattleManager[_0x28f8ba(0x1a5)]()&&(BattleManager[_0x28f8ba(0x1fc)](),BattleManager[_0x28f8ba(0x2ac)]=this,BattleManager[_0x28f8ba(0x16c)]=this);if(Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager[_0x28f8ba(0x1e1)]()){BattleManager['_subject']=undefined,BattleManager[_0x28f8ba(0x16c)]=this;const _0x16d8b4=BattleManager[_0x28f8ba(0x17c)]['indexOf'](_0x4d03fe);BattleManager[_0x28f8ba(0x17c)][_0x16d8b4]=this,BattleManager[_0x28f8ba(0x236)]();}Imported[_0x28f8ba(0x233)]&&BattleManager[_0x28f8ba(0x2b6)]()&&(BattleManager['_subject']=this,BattleManager[_0x28f8ba(0x16c)]=this);if(Imported[_0x28f8ba(0x307)]&&BattleManager[_0x28f8ba(0x281)]()){BattleManager[_0x28f8ba(0x2ac)]=this,BattleManager['_currentActor']=this;for(let _0x28e75d=0x0;_0x28e75d<BattleManager[_0x28f8ba(0x17c)][_0x28f8ba(0x26b)];_0x28e75d++){const _0x4bb2fe=BattleManager[_0x28f8ba(0x17c)][_0x28e75d];_0x4bb2fe===_0x4d03fe&&(BattleManager['_actionBattlers'][_0x28e75d]=this);}for(let _0x2d7584=0x0;_0x2d7584<BattleManager[_0x28f8ba(0x141)][_0x28f8ba(0x26b)];_0x2d7584++){const _0x5524ff=BattleManager[_0x28f8ba(0x141)][_0x2d7584];_0x5524ff===_0x4d03fe&&(BattleManager[_0x28f8ba(0x141)][_0x2d7584]=this);}}},VisuMZ['PartySystem'][_0x521d2e(0x1bd)]=Game_Unit[_0x521d2e(0x220)][_0x521d2e(0x28f)],Game_Unit[_0x521d2e(0x220)][_0x521d2e(0x28f)]=function(){const _0x2bf57a=_0x521d2e;if(SceneManager['isSceneParty']())return![];return VisuMZ[_0x2bf57a(0x162)][_0x2bf57a(0x1bd)][_0x2bf57a(0x1dc)](this);},Game_Party[_0x521d2e(0x14a)]=VisuMZ['PartySystem'][_0x521d2e(0x232)]['General'][_0x521d2e(0x2e9)],VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x2b9)]=Game_Party['prototype'][_0x521d2e(0x2d6)],Game_Party[_0x521d2e(0x220)][_0x521d2e(0x2d6)]=function(){const _0x2155fd=_0x521d2e;VisuMZ[_0x2155fd(0x162)][_0x2155fd(0x2b9)]['call'](this),this[_0x2155fd(0x1a6)](),this[_0x2155fd(0x282)](),this['initBattleMembers']();},Game_Party['prototype'][_0x521d2e(0x1a6)]=function(){this['_partySystemBattleCommandCooldown']=0x0;},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x313)]=function(){const _0x5ac158=_0x521d2e;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x5ac158(0x1a6)]();return this[_0x5ac158(0x167)]<=0x0;},Game_Party['prototype'][_0x521d2e(0x2bc)]=function(){const _0x16b859=_0x521d2e;if(this[_0x16b859(0x167)]===undefined)this[_0x16b859(0x1a6)]();return this[_0x16b859(0x167)];},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x24f)]=function(_0x530b57){const _0x5bebb4=_0x521d2e;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x5bebb4(0x1a6)]();this['_partySystemBattleCommandCooldown']=_0x530b57;},Game_Party['prototype'][_0x521d2e(0x2df)]=function(){const _0x4ca811=_0x521d2e;if(this[_0x4ca811(0x167)]===undefined)this['clearPartyBattleCommandCooldown']();this[_0x4ca811(0x167)]=VisuMZ['PartySystem'][_0x4ca811(0x232)][_0x4ca811(0x13d)][_0x4ca811(0x252)]||0x0;},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x2c2)]=function(){const _0x17b488=_0x521d2e;if(this[_0x17b488(0x167)]===undefined)this[_0x17b488(0x1a6)]();this['_partySystemBattleCommandCooldown']--;},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x282)]=function(){const _0x14a456=_0x521d2e;this[_0x14a456(0x1aa)]=0x0;},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1b4)]=function(_0x38ae8c){const _0x58ea79=_0x521d2e;this[_0x58ea79(0x1aa)]=_0x38ae8c,this[_0x58ea79(0x156)](!![]),$gamePlayer&&$gamePlayer['followers']()&&$gamePlayer['followers']()[_0x58ea79(0x1b4)]();},Game_Followers[_0x521d2e(0x220)][_0x521d2e(0x1b4)]=function(){const _0x2742f6=_0x521d2e;if(!SceneManager[_0x2742f6(0x237)]())return;this[_0x2742f6(0x219)]();const _0x48217d=$gameMap[_0x2742f6(0x15f)](),_0x2f1294=$gamePlayer['x'],_0x49477f=$gamePlayer['y'],_0xfdfc45=$gamePlayer[_0x2742f6(0x18f)]();$gameTemp['_bypassAutoSavePartySystem']=!![],$gamePlayer[_0x2742f6(0x305)](_0x48217d,_0x2f1294,_0x49477f,_0xfdfc45,0x0),setTimeout(this['clearBypassAutoSave'][_0x2742f6(0x1ff)](this),0x7d0);},Game_Followers[_0x521d2e(0x220)][_0x521d2e(0x27d)]=function(){$gameTemp['_bypassAutoSavePartySystem']=![];},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x1dd)]=Scene_Base[_0x521d2e(0x220)]['isAutosaveEnabled'],Scene_Base[_0x521d2e(0x220)]['isAutosaveEnabled']=function(){const _0x348391=_0x521d2e;if($gameTemp['_bypassAutoSavePartySystem'])return![];return VisuMZ[_0x348391(0x162)][_0x348391(0x1dd)][_0x348391(0x1dc)](this);},Game_Party['prototype']['maxBattleMembers']=function(){const _0x14a6a5=_0x521d2e;if(this['_battleMaxSize']===undefined)this[_0x14a6a5(0x156)]();return this[_0x14a6a5(0x1aa)]||Game_Party[_0x14a6a5(0x14a)];},Game_Party[_0x521d2e(0x220)]['checkInitBattleMembers']=function(){const _0x239ddf=_0x521d2e;if(this['_battleMaxSize']===undefined)this['initBattleMembers']();if(!this['_battleMembers'])this['initBattleMembers']();while(this[_0x239ddf(0x28b)]['length']<this[_0x239ddf(0x1aa)]){this['_battleMembers'][_0x239ddf(0x2e6)](0x0);}},Game_Party['prototype'][_0x521d2e(0x156)]=function(_0x41a121){const _0x579bf6=_0x521d2e;!_0x41a121&&(this['_battleMaxSize']=Game_Party['defaultMaxBattleMembers']);this[_0x579bf6(0x28b)]=this['_actors']['slice'](0x0,this[_0x579bf6(0x1aa)]);while(this['_battleMembers'][_0x579bf6(0x26b)]<this[_0x579bf6(0x1aa)]){this[_0x579bf6(0x28b)][_0x579bf6(0x2e6)](0x0);}if($gamePlayer)$gamePlayer['refresh']();},Game_Party['prototype'][_0x521d2e(0x188)]=function(){const _0x5376c1=_0x521d2e;return this['rawBattleMembers']()[_0x5376c1(0x1bc)](_0x3bdbb2=>!!_0x3bdbb2);},Game_Party['prototype'][_0x521d2e(0x1e8)]=function(){const _0xca85f1=_0x521d2e;this[_0xca85f1(0x29b)]();const _0x55df37=this[_0xca85f1(0x28b)][_0xca85f1(0x217)](_0x3eec9f=>$gameActors['actor'](_0x3eec9f));return SceneManager[_0xca85f1(0x284)]()?_0x55df37:_0x55df37[_0xca85f1(0x1bc)](_0x130625=>_0x130625&&_0x130625[_0xca85f1(0x239)]());},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x260)]=function(){const _0x3de7d6=_0x521d2e,_0x3b5657=this[_0x3de7d6(0x188)]();return this['allMembers']()['filter'](_0xf9785d=>!_0x3b5657[_0x3de7d6(0x20d)](_0xf9785d));},VisuMZ[_0x521d2e(0x162)]['Game_Party_setupStartingMembers']=Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1f1)],Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1f1)]=function(){const _0x342940=_0x521d2e;VisuMZ[_0x342940(0x162)]['Game_Party_setupStartingMembers'][_0x342940(0x1dc)](this),this[_0x342940(0x156)]();},VisuMZ['PartySystem'][_0x521d2e(0x1e4)]=Game_Party[_0x521d2e(0x220)]['setupBattleTest'],Game_Party['prototype'][_0x521d2e(0x1ad)]=function(){const _0x56e027=_0x521d2e;VisuMZ['PartySystem'][_0x56e027(0x1e4)][_0x56e027(0x1dc)](this),this[_0x56e027(0x309)]();},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1d5)]=function(){const _0x727e8e=_0x521d2e;this[_0x727e8e(0x1aa)]=Game_Party[_0x727e8e(0x14a)],this['_battleMembers']=[],this[_0x727e8e(0x29f)]=[];for(const _0x470b1d of $dataSystem['testBattlers']){const _0x900a9d=$gameActors[_0x727e8e(0x2ea)](_0x470b1d[_0x727e8e(0x191)]);if(!_0x900a9d)continue;_0x900a9d[_0x727e8e(0x235)](_0x470b1d[_0x727e8e(0x15d)],![]),_0x900a9d[_0x727e8e(0x204)](_0x470b1d[_0x727e8e(0x1c9)]),_0x900a9d['recoverAll'](),this['_battleMembers'][_0x727e8e(0x2e6)](_0x470b1d[_0x727e8e(0x191)]),this[_0x727e8e(0x29f)][_0x727e8e(0x2e6)](_0x470b1d[_0x727e8e(0x191)]);}while(this['_battleMembers'][_0x727e8e(0x26b)]<this[_0x727e8e(0x1aa)]){this['_battleMembers'][_0x727e8e(0x2e6)](0x0);}while(this[_0x727e8e(0x28b)][_0x727e8e(0x26b)]>this[_0x727e8e(0x15e)]()){this[_0x727e8e(0x28b)]['pop']();}if($gamePlayer)$gamePlayer[_0x727e8e(0x23f)]();},Game_Party[_0x521d2e(0x220)]['addNonBattleTestMembers']=function(){const _0x5036ff=_0x521d2e,_0x1488ff=this[_0x5036ff(0x188)]();for(let _0x540777=0x1;_0x540777<$dataActors[_0x5036ff(0x26b)];_0x540777++){const _0x315b46=$gameActors['actor'](_0x540777);if(!_0x315b46)continue;if(_0x315b46['name']()[_0x5036ff(0x26b)]<=0x0)continue;if(_0x315b46[_0x5036ff(0x320)]()[_0x5036ff(0x2a2)](/-----/i))continue;if(_0x1488ff[_0x5036ff(0x20d)](_0x315b46))continue;this[_0x5036ff(0x29f)][_0x5036ff(0x2e6)](_0x315b46[_0x5036ff(0x191)]());}},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x2d3)]=Game_Party['prototype'][_0x521d2e(0x16d)],Game_Party[_0x521d2e(0x220)][_0x521d2e(0x16d)]=function(_0x4c70d0){const _0x4caed9=_0x521d2e;VisuMZ[_0x4caed9(0x162)]['Game_Party_addActor']['call'](this,_0x4c70d0),this[_0x4caed9(0x2a0)](_0x4c70d0),SceneManager[_0x4caed9(0x146)]()&&(Imported[_0x4caed9(0x307)]&&BattleManager[_0x4caed9(0x281)]()&&(BattleManager['removeActionBattlersOTB'](),BattleManager[_0x4caed9(0x153)]($gameActors[_0x4caed9(0x2ea)](_0x4c70d0))));},Game_Party[_0x521d2e(0x220)]['addActorToBattleMembers']=function(_0x2a5405){const _0x2c952f=_0x521d2e;this[_0x2c952f(0x29b)]();if(this[_0x2c952f(0x28b)]['includes'](_0x2a5405))return;if(!this[_0x2c952f(0x29f)][_0x2c952f(0x20d)](_0x2a5405))return;if(!this[_0x2c952f(0x28b)][_0x2c952f(0x20d)](0x0))return;const _0x3282bf=$gameActors[_0x2c952f(0x2ea)](_0x2a5405);if(!_0x3282bf)return;const _0x28152c=this[_0x2c952f(0x28b)][_0x2c952f(0x1d2)](0x0);if(_0x28152c<0x0)return;this[_0x2c952f(0x28b)][_0x28152c]=_0x2a5405,SceneManager[_0x2c952f(0x146)]()&&(_0x3282bf[_0x2c952f(0x1c7)](),_0x3282bf[_0x2c952f(0x266)]()),this['partyChangeRefresh']();},Game_Party['prototype'][_0x521d2e(0x29d)]=function(_0x19a637,_0x88640){const _0x2b249e=_0x521d2e;this[_0x2b249e(0x29b)]();if(this[_0x2b249e(0x28b)]['includes'](_0x19a637))return;if(!this[_0x2b249e(0x28b)][_0x2b249e(0x20d)](0x0))return;const _0x5d6d5c=$gameActors[_0x2b249e(0x2ea)](_0x19a637);if(!_0x5d6d5c)return;this[_0x2b249e(0x28b)][_0x88640]=_0x19a637,_0x5d6d5c[_0x2b249e(0x266)](),this[_0x2b249e(0x26e)]();},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x24d)]=Game_Party[_0x521d2e(0x220)][_0x521d2e(0x31b)],Game_Party[_0x521d2e(0x220)][_0x521d2e(0x31b)]=function(_0x227d64){const _0x59b953=_0x521d2e;this[_0x59b953(0x264)](_0x227d64),VisuMZ[_0x59b953(0x162)]['Game_Party_removeActor']['call'](this,_0x227d64);},Game_Party['prototype'][_0x521d2e(0x264)]=function(_0x109c12){const _0x555844=_0x521d2e;this[_0x555844(0x29b)]();if(!this[_0x555844(0x28b)][_0x555844(0x20d)](_0x109c12))return;if(_0x109c12<=0x0)return;const _0x166e8c=this[_0x555844(0x28b)][_0x555844(0x1d2)](_0x109c12);this[_0x555844(0x28b)][_0x166e8c]=0x0,this[_0x555844(0x29f)][_0x555844(0x1f2)](_0x109c12),this[_0x555844(0x29f)][_0x555844(0x2e6)](_0x109c12),this['partyChangeRefresh']();},Game_Party['prototype'][_0x521d2e(0x26e)]=function(){const _0x13d783=_0x521d2e;this[_0x13d783(0x16a)](),$gamePlayer[_0x13d783(0x23f)](),$gameMap[_0x13d783(0x227)]();},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x16a)]=function(){const _0x1b5217=_0x521d2e;this['checkInitBattleMembers']();const _0x2267f8=this['battleMembers']()[_0x1b5217(0x271)](this[_0x1b5217(0x260)]());this[_0x1b5217(0x29f)]=_0x2267f8['map'](_0x6a26fd=>_0x6a26fd?_0x6a26fd[_0x1b5217(0x191)]():0x0)[_0x1b5217(0x1f2)](0x0);},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x2dd)]=function(){const _0xad571a=_0x521d2e;this['_actors']['sort']((_0x1f7a90,_0x3d8445)=>_0x1f7a90-_0x3d8445),this['rearrangePartyActors'](),this[_0xad571a(0x26e)]();},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1e3)]=function(){const _0x45c433=_0x521d2e;for(const _0xec84aa of this[_0x45c433(0x260)]()){if(!_0xec84aa)continue;if(_0xec84aa['isRequiredInParty']())return!![];}return![];},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x148)]=Game_Party[_0x521d2e(0x220)][_0x521d2e(0x1e0)],Game_Party[_0x521d2e(0x220)]['swapOrder']=function(_0x3c3265,_0x21aa09){const _0x40fef4=_0x521d2e;VisuMZ['PartySystem'][_0x40fef4(0x148)]['call'](this,_0x3c3265,_0x21aa09),this[_0x40fef4(0x2b8)](_0x3c3265,_0x21aa09);},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x2b8)]=function(_0x218a03,_0x4e5f94){const _0xbf6242=_0x521d2e;this[_0xbf6242(0x28b)]=[];for(let _0x12421e=0x0;_0x12421e<this['_actors'][_0xbf6242(0x26b)];_0x12421e++){if(this[_0xbf6242(0x28b)][_0xbf6242(0x26b)]>=this[_0xbf6242(0x15e)]())break;this[_0xbf6242(0x28b)][_0x12421e]=this[_0xbf6242(0x29f)][_0x12421e];}$gamePlayer[_0xbf6242(0x23f)]();},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x22f)]=Game_Troop['prototype'][_0x521d2e(0x226)],Game_Troop[_0x521d2e(0x220)][_0x521d2e(0x226)]=function(){const _0x2632dd=_0x521d2e;VisuMZ[_0x2632dd(0x162)][_0x2632dd(0x22f)][_0x2632dd(0x1dc)](this),$gameParty['updateBattlePartySwitchCooldown']();},Scene_Menu[_0x521d2e(0x220)][_0x521d2e(0x19a)]=function(){const _0x83a70b=_0x521d2e;SceneManager[_0x83a70b(0x2e6)](Scene_Party);};function _0x317e(_0x5bcef3,_0x2f458f){const _0x364ce0=_0x364c();return _0x317e=function(_0x317e43,_0x2b0e36){_0x317e43=_0x317e43-0x139;let _0x38e12e=_0x364ce0[_0x317e43];return _0x38e12e;},_0x317e(_0x5bcef3,_0x2f458f);}function Scene_Party(){const _0x18afcc=_0x521d2e;this[_0x18afcc(0x2d6)](...arguments);}Scene_Party['prototype']=Object['create'](Scene_MenuBase['prototype']),Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x15a)]=Scene_Party,Scene_Party[_0x521d2e(0x220)]['initialize']=function(){const _0x4e89b5=_0x521d2e;this[_0x4e89b5(0x273)](),Scene_MenuBase['prototype'][_0x4e89b5(0x2d6)][_0x4e89b5(0x1dc)](this);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x1fd)]=function(){const _0x5b9629=_0x521d2e;if(ConfigManager[_0x5b9629(0x267)]&&ConfigManager[_0x5b9629(0x2c5)]!==undefined)return ConfigManager[_0x5b9629(0x2c5)];else return ConfigManager['uiMenuStyle']===![]?![]:Scene_MenuBase['prototype']['isRightInputMode']['call'](this);},Scene_Party['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Party['prototype']['needsPageButtons']=function(){return!![];},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x158)]=function(){const _0xd2647a=_0x521d2e;Scene_MenuBase[_0xd2647a(0x220)][_0xd2647a(0x158)]['call'](this),this[_0xd2647a(0x14f)][_0xd2647a(0x1ca)]=undefined,this[_0xd2647a(0x18b)]['_clickHandler']=undefined;},Scene_Party[_0x521d2e(0x220)]['loadPartyImages']=function(){const _0x5a1db1=_0x521d2e;for(const _0x32d4f6 of $gameParty[_0x5a1db1(0x2db)]()){ImageManager[_0x5a1db1(0x316)](_0x32d4f6['faceName']()),ImageManager[_0x5a1db1(0x157)](_0x32d4f6[_0x5a1db1(0x161)]()),ImageManager[_0x5a1db1(0x207)](_0x32d4f6[_0x5a1db1(0x2d1)]());}},Scene_Party[_0x521d2e(0x220)]['create']=function(){const _0x867976=_0x521d2e;Scene_MenuBase[_0x867976(0x220)]['create'][_0x867976(0x1dc)](this),this[_0x867976(0x1f4)](),this['createActivePartyWindow'](),this[_0x867976(0x16e)](),this['createReservePartyWindow'](),this[_0x867976(0x287)](),this[_0x867976(0x2e1)]();},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x1f4)]=function(){const _0x487e0a=_0x521d2e,_0x3df3c8=this[_0x487e0a(0x31d)]();this[_0x487e0a(0x21f)]=new Window_PartyLabel(_0x3df3c8,TextManager[_0x487e0a(0x176)]),this[_0x487e0a(0x21f)][_0x487e0a(0x25c)](VisuMZ[_0x487e0a(0x162)][_0x487e0a(0x232)]['Window'][_0x487e0a(0x268)]),this[_0x487e0a(0x311)](this[_0x487e0a(0x21f)]);},Scene_Party[_0x521d2e(0x220)]['activePartyLabelRect']=function(){const _0x24ebc2=_0x521d2e;return VisuMZ[_0x24ebc2(0x162)][_0x24ebc2(0x232)][_0x24ebc2(0x2a8)][_0x24ebc2(0x2be)][_0x24ebc2(0x1dc)](this);},Scene_Party['prototype']['createActivePartyWindow']=function(){const _0x21e4bf=_0x521d2e,_0x5748cb=this[_0x21e4bf(0x27c)]();this[_0x21e4bf(0x152)]=new Window_PartyActive(_0x5748cb),this['_activePartyWindow']['setBackgroundType'](VisuMZ[_0x21e4bf(0x162)][_0x21e4bf(0x232)][_0x21e4bf(0x2a8)][_0x21e4bf(0x22b)]),this[_0x21e4bf(0x152)]['setHandler']('ok',this[_0x21e4bf(0x1f8)]['bind'](this)),this['_activePartyWindow'][_0x21e4bf(0x288)](_0x21e4bf(0x263),this['popScene'][_0x21e4bf(0x1ff)](this)),this['addWindow'](this[_0x21e4bf(0x152)]);},Scene_Party[_0x521d2e(0x220)]['activePartyWindowRect']=function(){const _0x85bc0b=_0x521d2e;return VisuMZ[_0x85bc0b(0x162)][_0x85bc0b(0x232)]['Window'][_0x85bc0b(0x310)][_0x85bc0b(0x1dc)](this);},Scene_Party[_0x521d2e(0x220)]['onActiveOk']=function(){const _0x9134bf=_0x521d2e;this[_0x9134bf(0x272)][_0x9134bf(0x19b)](),this[_0x9134bf(0x272)][_0x9134bf(0x301)]();},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x16e)]=function(){const _0xf71d7d=_0x521d2e,_0x30c0b1=this[_0xf71d7d(0x2b7)]();this['_reservePartyLabel']=new Window_PartyLabel(_0x30c0b1,TextManager['reserveParty']),this['_reservePartyLabel'][_0xf71d7d(0x25c)](VisuMZ[_0xf71d7d(0x162)][_0xf71d7d(0x232)][_0xf71d7d(0x2a8)][_0xf71d7d(0x1e5)]),this['addWindow'](this[_0xf71d7d(0x1b3)]);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x2b7)]=function(){const _0x399f90=_0x521d2e;return VisuMZ[_0x399f90(0x162)][_0x399f90(0x232)][_0x399f90(0x2a8)][_0x399f90(0x147)][_0x399f90(0x1dc)](this);},Scene_Party['prototype']['createReservePartyWindow']=function(){const _0x4fed30=_0x521d2e,_0x2aa9c4=this[_0x4fed30(0x177)]();this[_0x4fed30(0x272)]=new Window_PartyReserve(_0x2aa9c4),this[_0x4fed30(0x272)][_0x4fed30(0x25c)](VisuMZ[_0x4fed30(0x162)][_0x4fed30(0x232)][_0x4fed30(0x2a8)][_0x4fed30(0x1e2)]),this['_reservePartyWindow']['setHandler']('ok',this[_0x4fed30(0x2ee)][_0x4fed30(0x1ff)](this)),this['_reservePartyWindow'][_0x4fed30(0x288)]('cancel',this[_0x4fed30(0x18c)][_0x4fed30(0x1ff)](this)),this[_0x4fed30(0x311)](this['_reservePartyWindow']);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x177)]=function(){const _0x1b5a7b=_0x521d2e;return VisuMZ[_0x1b5a7b(0x162)]['Settings']['Window'][_0x1b5a7b(0x1f7)][_0x1b5a7b(0x1dc)](this);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x2ee)]=function(){const _0x31513e=_0x521d2e,_0x28505b=this[_0x31513e(0x272)][_0x31513e(0x144)](),_0x4690d9=this[_0x31513e(0x152)][_0x31513e(0x27b)]();if(_0x28505b<0x0){if(_0x4690d9)$gameParty[_0x31513e(0x264)](_0x4690d9['actorId']());}else{const _0x544bc0=this['_reservePartyWindow'][_0x31513e(0x27b)]()[_0x31513e(0x191)](),_0x23371e=this[_0x31513e(0x152)][_0x31513e(0x149)]();if(_0x4690d9)$gameParty[_0x31513e(0x264)](_0x4690d9[_0x31513e(0x191)]());$gameParty[_0x31513e(0x29d)](_0x544bc0,_0x23371e);}this[_0x31513e(0x23d)](),this[_0x31513e(0x18c)]();},Scene_Party['prototype']['refreshAllWindows']=function(){const _0x365254=_0x521d2e;this[_0x365254(0x152)][_0x365254(0x23f)](),this[_0x365254(0x272)][_0x365254(0x23f)]();},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x18c)]=function(){const _0x278d22=_0x521d2e;this[_0x278d22(0x272)]['deactivate'](),this['_reservePartyWindow']['deselect'](),this[_0x278d22(0x152)][_0x278d22(0x19b)]();},Scene_Party['prototype'][_0x521d2e(0x287)]=function(){const _0x37d336=_0x521d2e,_0x1561ef=this[_0x37d336(0x2e2)]();this[_0x37d336(0x2a3)]=new Window_PartyLabel(_0x1561ef,TextManager['statusParty']),this['_statusPartyLabel']['setBackgroundType'](VisuMZ[_0x37d336(0x162)][_0x37d336(0x232)][_0x37d336(0x2a8)][_0x37d336(0x2af)]),this[_0x37d336(0x311)](this['_statusPartyLabel']);},Scene_Party['prototype'][_0x521d2e(0x2e2)]=function(){const _0x3c9dcf=_0x521d2e;return VisuMZ[_0x3c9dcf(0x162)][_0x3c9dcf(0x232)][_0x3c9dcf(0x2a8)][_0x3c9dcf(0x1c8)][_0x3c9dcf(0x1dc)](this);},Scene_Party['prototype'][_0x521d2e(0x2e1)]=function(){const _0x39334c=_0x521d2e,_0x59b4d3=this[_0x39334c(0x303)]();this[_0x39334c(0x2fd)]=new Window_PartyStatus(_0x59b4d3),this[_0x39334c(0x2fd)][_0x39334c(0x25c)](VisuMZ[_0x39334c(0x162)]['Settings'][_0x39334c(0x2a8)]['StatusWindowBgType']),this[_0x39334c(0x311)](this[_0x39334c(0x2fd)]),this[_0x39334c(0x272)][_0x39334c(0x145)](this[_0x39334c(0x2fd)]),this['_activePartyWindow'][_0x39334c(0x145)](this[_0x39334c(0x2fd)]);},Scene_Party['prototype'][_0x521d2e(0x303)]=function(){const _0x10edf6=_0x521d2e;return VisuMZ['PartySystem']['Settings'][_0x10edf6(0x2a8)][_0x10edf6(0x297)]['call'](this);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x164)]=function(){const _0x34bfe4=_0x521d2e;return TextManager['getInputButtonString'](_0x34bfe4(0x259));},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x20b)]=function(){const _0x511c2b=_0x521d2e;return TextManager[_0x511c2b(0x21e)];},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x229)]=function(){const _0x42744c=_0x521d2e,_0x163a4a=this['_activePartyWindow'],_0x3fd05c=this[_0x42744c(0x272)];if(_0x163a4a&&_0x163a4a[_0x42744c(0x286)]&&_0x163a4a['currentActor']()&&_0x163a4a[_0x42744c(0x28e)]())return TextManager[_0x42744c(0x1a3)];else return _0x3fd05c&&_0x3fd05c['active']&&$gameParty['reserveMembers']()[_0x42744c(0x26b)]>0x0?TextManager['assistSortPartyMembers']:'';},Scene_Party[_0x521d2e(0x220)]['buttonAssistText4']=function(){const _0x27144f=_0x521d2e;if(this['_activePartyWindow']&&this[_0x27144f(0x152)]['active'])return TextManager[_0x27144f(0x1b7)];else return this[_0x27144f(0x272)]&&this[_0x27144f(0x272)]['active']?TextManager[_0x27144f(0x165)]:Scene_MenuBase[_0x27144f(0x220)]['buttonAssistText4']['call'](this);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x270)]=function(){const _0xa2b6df=_0x521d2e;Scene_MenuBase[_0xa2b6df(0x220)][_0xa2b6df(0x270)][_0xa2b6df(0x1dc)](this),this[_0xa2b6df(0x142)](this[_0xa2b6df(0x2d2)]()),this['createCustomBackgroundImages']();},Scene_Party[_0x521d2e(0x220)]['getBackgroundOpacity']=function(){const _0x415515=_0x521d2e;return VisuMZ[_0x415515(0x162)][_0x415515(0x232)][_0x415515(0x19c)][_0x415515(0x31f)];},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x23b)]=function(){const _0xf7b966=_0x521d2e,_0x14441a={'BgFilename1':VisuMZ[_0xf7b966(0x162)][_0xf7b966(0x232)][_0xf7b966(0x19c)][_0xf7b966(0x29e)],'BgFilename2':VisuMZ['PartySystem']['Settings'][_0xf7b966(0x19c)][_0xf7b966(0x25e)]};_0x14441a&&(_0x14441a['BgFilename1']!==''||_0x14441a[_0xf7b966(0x25e)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0xf7b966(0x1ef)](_0x14441a['BgFilename1'])),this[_0xf7b966(0x30c)]=new Sprite(ImageManager[_0xf7b966(0x185)](_0x14441a[_0xf7b966(0x25e)])),this['addChild'](this[_0xf7b966(0x1a2)]),this[_0xf7b966(0x1f6)](this['_backSprite2']),this[_0xf7b966(0x1a2)][_0xf7b966(0x202)][_0xf7b966(0x29a)](this['adjustSprite'][_0xf7b966(0x1ff)](this,this[_0xf7b966(0x1a2)])),this[_0xf7b966(0x30c)]['bitmap'][_0xf7b966(0x29a)](this[_0xf7b966(0x28a)]['bind'](this,this[_0xf7b966(0x30c)])));},Scene_Party[_0x521d2e(0x220)]['adjustSprite']=function(_0x27f005){const _0x3b506f=_0x521d2e;this['scaleSprite'](_0x27f005),this[_0x3b506f(0x1f3)](_0x27f005);},Scene_Party[_0x521d2e(0x220)][_0x521d2e(0x2e3)]=function(){const _0x568da6=_0x521d2e;Scene_MenuBase[_0x568da6(0x220)][_0x568da6(0x2e3)][_0x568da6(0x1dc)](this),$gameParty[_0x568da6(0x26e)]();},Window_StatusBase[_0x521d2e(0x220)][_0x521d2e(0x2d9)]=function(_0x129729,_0x2c64ce,_0x38dc55,_0x1068e6){const _0x44398c=_0x521d2e;if(!_0x129729)return;_0x1068e6?this[_0x44398c(0x155)](_0x129729,_0x2c64ce,_0x38dc55):this[_0x44398c(0x285)](_0x129729,_0x2c64ce,_0x38dc55);},Window_StatusBase[_0x521d2e(0x220)][_0x521d2e(0x285)]=function(_0x1a1fb1,_0x48cb95,_0x394935){const _0x1bf750=_0x521d2e;_0x394935+=Math[_0x1bf750(0x159)]((this['lineHeight']()-ImageManager[_0x1bf750(0x269)])/0x2),!_0x1a1fb1[_0x1bf750(0x257)]()&&(this[_0x1bf750(0x27a)](ImageManager['lockPartyMemberIcon'],_0x48cb95,_0x394935),_0x48cb95+=ImageManager[_0x1bf750(0x1d0)]+0x4),_0x1a1fb1[_0x1bf750(0x201)]()&&(this['drawIcon'](ImageManager[_0x1bf750(0x140)],_0x48cb95,_0x394935),_0x48cb95+=ImageManager[_0x1bf750(0x1d0)]+0x4);},Window_StatusBase[_0x521d2e(0x220)][_0x521d2e(0x155)]=function(_0x4177bd,_0x18fc94,_0x1ca4c8){const _0x5277d8=_0x521d2e;let _0x2d4b4b=0x0;if(!_0x4177bd['isFormationChangeOk']())_0x2d4b4b+=0x1;if(_0x4177bd[_0x5277d8(0x201)]())_0x2d4b4b+=0x1;if(_0x2d4b4b<=0x1)return this[_0x5277d8(0x285)](_0x4177bd,_0x18fc94,_0x1ca4c8);_0x1ca4c8+=Math[_0x5277d8(0x159)]((this[_0x5277d8(0x18d)]()-ImageManager['iconHeight'])/0x2),_0x1ca4c8-=Math[_0x5277d8(0x159)](this[_0x5277d8(0x18d)]()/0x2),this[_0x5277d8(0x27a)](ImageManager[_0x5277d8(0x200)],_0x18fc94,_0x1ca4c8),_0x1ca4c8+=this['lineHeight'](),this['drawIcon'](ImageManager[_0x5277d8(0x140)],_0x18fc94,_0x1ca4c8);};function Window_PartyLabel(){const _0x319ac4=_0x521d2e;this[_0x319ac4(0x2d6)](...arguments);}Window_PartyLabel[_0x521d2e(0x220)]=Object[_0x521d2e(0x1c4)](Window_Base['prototype']),Window_PartyLabel[_0x521d2e(0x220)][_0x521d2e(0x15a)]=Window_PartyLabel,Window_PartyLabel['prototype']['initialize']=function(_0x1012ee,_0xdda0a1){const _0xece1b6=_0x521d2e;Window_Base[_0xece1b6(0x220)][_0xece1b6(0x2d6)][_0xece1b6(0x1dc)](this,_0x1012ee),this[_0xece1b6(0x23e)](_0xdda0a1);},Window_PartyLabel['prototype'][_0x521d2e(0x24e)]=function(){const _0xbc0561=_0x521d2e;this[_0xbc0561(0x2d4)]=0x0;},Window_PartyLabel[_0x521d2e(0x220)]['setText']=function(_0x459cb0){const _0x1630b2=_0x521d2e;this['contents'][_0x1630b2(0x2b2)](),this[_0x1630b2(0x228)](_0x459cb0,0x0,0x0,this[_0x1630b2(0x13e)],_0x1630b2(0x2c6));};function Window_PartyActive(){const _0x10cd82=_0x521d2e;this[_0x10cd82(0x2d6)](...arguments);}Window_PartyActive[_0x521d2e(0x220)]=Object[_0x521d2e(0x1c4)](Window_StatusBase[_0x521d2e(0x220)]),Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x15a)]=Window_PartyActive,Window_PartyActive[_0x521d2e(0x18e)]=VisuMZ[_0x521d2e(0x162)]['Settings'][_0x521d2e(0x2a8)][_0x521d2e(0x221)],Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x2d6)]=function(_0x29b391){const _0xcd8130=_0x521d2e;Window_StatusBase[_0xcd8130(0x220)][_0xcd8130(0x2d6)][_0xcd8130(0x1dc)](this,_0x29b391),this['refresh'](),this[_0xcd8130(0x19b)](),this['smoothSelect'](0x0);},Window_PartyActive[_0x521d2e(0x220)]['addRemoveCommand']=function(){const _0x156905=_0x521d2e;return VisuMZ[_0x156905(0x162)][_0x156905(0x232)]['General'][_0x156905(0x184)];},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x2f8)]=function(){const _0x1e7539=_0x521d2e;return $gameParty[_0x1e7539(0x15e)]();},Window_PartyActive[_0x521d2e(0x220)]['maxCols']=function(){const _0x3da4c0=_0x521d2e;return $gameParty[_0x3da4c0(0x15e)]();},Window_PartyActive[_0x521d2e(0x220)]['itemHeight']=function(){const _0x46ff1d=_0x521d2e;return this[_0x46ff1d(0x318)];},Window_PartyActive[_0x521d2e(0x220)]['actor']=function(_0xee28e1){const _0xb3c93=_0x521d2e;return $gameParty[_0xb3c93(0x1e8)]()[_0xee28e1];},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x27b)]=function(){const _0x1e235c=_0x521d2e;return this[_0x1e235c(0x2ea)](this[_0x1e235c(0x149)]());},Window_PartyActive['prototype'][_0x521d2e(0x304)]=function(){const _0x1bc497=_0x521d2e,_0x30b053=this[_0x1bc497(0x2ea)](this['index']());return _0x30b053?_0x30b053[_0x1bc497(0x257)]():!![];},Window_PartyActive['prototype'][_0x521d2e(0x222)]=function(){const _0x1aaed5=_0x521d2e;if($gameParty[_0x1aaed5(0x2db)]()[_0x1aaed5(0x26b)]<=0x0)return!![];if($gameParty['anyRequiredPartyMembersInReserve']())return![];return $gameParty['battleMembers']()[_0x1aaed5(0x26b)]>0x0;},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x179)]=function(){const _0x5524fb=_0x521d2e;Window_StatusBase['prototype'][_0x5524fb(0x179)][_0x5524fb(0x1dc)](this),this[_0x5524fb(0x169)]();},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x224)]=function(_0x3b7890){const _0x40bc2c=_0x521d2e;this[_0x40bc2c(0x19d)]()&&this[_0x40bc2c(0x189)]();},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x1fe)]=function(){const _0x7d5398=_0x521d2e,_0x254bf8=this[_0x7d5398(0x149)](),_0xd3aae3=_0x254bf8+0x1>=this[_0x7d5398(0x2f8)]()?0x0:_0x254bf8+0x1;this[_0x7d5398(0x246)](_0x254bf8,_0xd3aae3);},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x249)]=function(){const _0xb96b6b=_0x521d2e,_0x10108e=this['index'](),_0x3899db=_0x10108e-0x1<0x0?this['maxItems']()-0x1:_0x10108e-0x1;this[_0xb96b6b(0x246)](_0x10108e,_0x3899db);},Window_PartyActive[_0x521d2e(0x220)]['quickSwap']=function(_0x2d51e4,_0x47051c){const _0x11d1b9=_0x521d2e,_0x175f43=this[_0x11d1b9(0x2ea)](_0x2d51e4),_0x410139=this['actor'](_0x47051c);if(_0x175f43&&!_0x175f43[_0x11d1b9(0x257)]())return;if(_0x410139&&!_0x410139['isFormationChangeOk']())return;const _0x262c53=$gameParty[_0x11d1b9(0x28b)];_0x262c53[_0x2d51e4]=_0x410139?_0x410139['actorId']():0x0,_0x262c53[_0x47051c]=_0x175f43?_0x175f43[_0x11d1b9(0x191)]():0x0,this['refresh'](),this[_0x11d1b9(0x1ae)](),this[_0x11d1b9(0x1d7)](_0x47051c);},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x169)]=function(){const _0x5baadb=_0x521d2e;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x5baadb(0x23c)]('shift')){const _0x2bf9d4=this[_0x5baadb(0x27b)]();this['processShiftRemoveShortcut']();}},Window_PartyActive['prototype']['processShiftRemoveShortcut']=function(){const _0x1f87c7=_0x521d2e;SoundManager[_0x1f87c7(0x150)]();const _0x20a9b0=this[_0x1f87c7(0x27b)]();$gameParty['removeActorFromBattleMembers'](_0x20a9b0[_0x1f87c7(0x191)]()),this[_0x1f87c7(0x190)](),SceneManager[_0x1f87c7(0x21a)][_0x1f87c7(0x23d)]();},Window_PartyActive[_0x521d2e(0x220)]['isShiftRemoveShortcutEnabled']=function(){const _0x47cd5a=_0x521d2e;if(!this[_0x47cd5a(0x238)]())return![];const _0x3183c9=this[_0x47cd5a(0x27b)]();return this[_0x47cd5a(0x286)]&&_0x3183c9&&_0x3183c9[_0x47cd5a(0x257)]();},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x1fa)]=function(_0xb85c52){const _0x12cd69=_0x521d2e,_0x50a5cf=this[_0x12cd69(0x2ea)](_0xb85c52);if(!_0x50a5cf)return this['drawItemEmpty'](_0xb85c52);this[_0x12cd69(0x174)]();const _0x55c2ed=this['itemRect'](_0xb85c52);this[_0x12cd69(0x294)](_0xb85c52);const _0x46b526=_0x55c2ed['y']+_0x55c2ed['height']-this[_0x12cd69(0x18d)]();this[_0x12cd69(0x2b3)](_0x55c2ed['x'],_0x46b526,_0x55c2ed[_0x12cd69(0x2c1)],0x2),this[_0x12cd69(0x2d9)](_0x50a5cf,_0x55c2ed['x']+0x2,_0x55c2ed['y']),this[_0x12cd69(0x1ec)](_0x50a5cf,_0x55c2ed['x'],_0x46b526,_0x55c2ed[_0x12cd69(0x2c1)]);},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x30d)]=function(_0x33eb98){const _0x15ffea=_0x521d2e;this['resetFontSettings']();const _0x2bc96d=this[_0x15ffea(0x254)](_0x33eb98);this[_0x15ffea(0x21d)](_0x2bc96d['x'],_0x2bc96d['y'],_0x2bc96d[_0x15ffea(0x2c1)],_0x2bc96d[_0x15ffea(0x194)]);const _0x315dc2=_0x2bc96d['y']+Math[_0x15ffea(0x159)]((_0x2bc96d['height']-this[_0x15ffea(0x18d)]())/0x2);this[_0x15ffea(0x183)](ColorManager['systemColor']()),this[_0x15ffea(0x228)](TextManager[_0x15ffea(0x2e7)],_0x2bc96d['x'],_0x315dc2,_0x2bc96d[_0x15ffea(0x2c1)],'center');},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x21d)]=function(_0x1cc937,_0x50239d,_0x476d17,_0x228a0f,_0x2d100d){const _0x3e64c3=_0x521d2e;_0x2d100d=Math[_0x3e64c3(0x2da)](_0x2d100d||0x1,0x1);while(_0x2d100d--){_0x228a0f=_0x228a0f||this[_0x3e64c3(0x18d)](),this[_0x3e64c3(0x2c4)]['paintOpacity']=0xa0;const _0x5f579b=ColorManager[_0x3e64c3(0x192)]();this[_0x3e64c3(0x2c4)][_0x3e64c3(0x2bf)](_0x1cc937+0x1,_0x50239d+0x1,_0x476d17-0x2,_0x228a0f-0x2,_0x5f579b),this['contents'][_0x3e64c3(0x2cb)]=0xff;}},Window_PartyActive['prototype'][_0x521d2e(0x294)]=function(_0x2cf36c){const _0x288776=_0x521d2e;switch(Window_PartyActive[_0x288776(0x18e)]['toLowerCase']()[_0x288776(0x314)]()){case _0x288776(0x1f9):this[_0x288776(0x1cd)](_0x2cf36c);break;case _0x288776(0x205):this[_0x288776(0x1d8)](_0x2cf36c);break;case _0x288776(0x28c):Imported[_0x288776(0x1ac)]&&this[_0x288776(0x1d9)](_0x2cf36c);break;};},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x1cd)]=function(_0x5a16e1){const _0x5e2eb6=_0x521d2e,_0x432b99=this[_0x5e2eb6(0x2ea)](_0x5a16e1),_0x16dce1=this[_0x5e2eb6(0x254)](_0x5a16e1),_0x67b33a=Math['min'](ImageManager[_0x5e2eb6(0x2f0)],_0x16dce1['width']-0x2),_0x3e522b=_0x16dce1[_0x5e2eb6(0x194)]-0x2;this[_0x5e2eb6(0x19e)](_0x432b99[_0x5e2eb6(0x257)]());const _0x267ff6=Math['round'](_0x16dce1['x']+(_0x16dce1[_0x5e2eb6(0x2c1)]-_0x67b33a)/0x2);this[_0x5e2eb6(0x24a)](_0x432b99,_0x267ff6,_0x16dce1['y']+0x1,_0x67b33a,_0x3e522b),this[_0x5e2eb6(0x19e)](!![]);},Window_PartyActive[_0x521d2e(0x220)]['drawItemImageSprite']=function(_0x279402){const _0x35ed83=_0x521d2e,_0x314388=this[_0x35ed83(0x2ea)](_0x279402),_0x348445=this[_0x35ed83(0x254)](_0x279402),_0x2d70c4=VisuMZ[_0x35ed83(0x162)]['Settings'][_0x35ed83(0x2a8)],_0x121265=_0x348445['x']+Math[_0x35ed83(0x159)](_0x348445[_0x35ed83(0x2c1)]/0x2)+_0x2d70c4[_0x35ed83(0x26c)],_0x5a87f9=_0x348445['y']+_0x348445[_0x35ed83(0x194)]-this[_0x35ed83(0x18d)]()-_0x2d70c4[_0x35ed83(0x290)];this['drawActorCharacter'](_0x314388,_0x121265,_0x5a87f9);},Window_PartyActive['prototype'][_0x521d2e(0x1d9)]=function(_0x4d4b3d){const _0x1b338=_0x521d2e,_0x1d7b58=this[_0x1b338(0x2ea)](_0x4d4b3d),_0x345fd8=_0x1d7b58[_0x1b338(0x2d1)](),_0x330b93=this[_0x1b338(0x254)](_0x4d4b3d),_0x8f48c5=VisuMZ[_0x1b338(0x162)]['Settings'][_0x1b338(0x2a8)],_0x240202=_0x330b93['x']+Math[_0x1b338(0x159)](_0x330b93[_0x1b338(0x2c1)]/0x2)+_0x8f48c5[_0x1b338(0x21b)],_0x1c6889=_0x330b93['y']+_0x330b93['height']-this[_0x1b338(0x18d)]()-_0x8f48c5['ActiveBattlerOffsetY'];this[_0x1b338(0x2bb)](_0x345fd8,_0x240202,_0x1c6889);},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x2b3)]=function(_0x1055d1,_0x508e82,_0x2fb16c,_0x38353d){const _0x3ae359=_0x521d2e,_0x2a5cb2=ColorManager[_0x3ae359(0x24b)](),_0x1c9a8d=ColorManager['dimColor2'](),_0x1a8773=_0x2fb16c/0x2,_0x349947=this[_0x3ae359(0x18d)]();while(_0x38353d--){this[_0x3ae359(0x2c4)]['gradientFillRect'](_0x1055d1,_0x508e82,_0x1a8773,_0x349947,_0x1c9a8d,_0x2a5cb2),this[_0x3ae359(0x2c4)][_0x3ae359(0x277)](_0x1055d1+_0x1a8773,_0x508e82,_0x1a8773,_0x349947,_0x2a5cb2,_0x1c9a8d);}},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x1ec)]=function(_0x111249,_0xa5d4e,_0x1af8bf,_0x4f0b89){const _0x47012a=_0x521d2e;_0x4f0b89=_0x4f0b89||0xa8,this[_0x47012a(0x183)](ColorManager['hpColor'](_0x111249)),this[_0x47012a(0x228)](_0x111249[_0x47012a(0x320)](),_0xa5d4e,_0x1af8bf,_0x4f0b89,_0x47012a(0x2c6));},Window_PartyActive[_0x521d2e(0x220)][_0x521d2e(0x145)]=function(_0x441b87){const _0x51d340=_0x521d2e;this[_0x51d340(0x21c)]=_0x441b87,this[_0x51d340(0x190)]();},Window_PartyActive['prototype'][_0x521d2e(0x190)]=function(){const _0x249a74=_0x521d2e;if(this[_0x249a74(0x21c)])this['_statusWindow'][_0x249a74(0x2a7)](this[_0x249a74(0x2ea)](this[_0x249a74(0x149)]()));};function Window_PartyReserve(){const _0x243110=_0x521d2e;this[_0x243110(0x2d6)](...arguments);}Window_PartyReserve[_0x521d2e(0x220)]=Object[_0x521d2e(0x1c4)](Window_StatusBase['prototype']),Window_PartyReserve[_0x521d2e(0x220)]['constructor']=Window_PartyReserve,Window_PartyReserve[_0x521d2e(0x18e)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2a8)]['ReservePartyGraphic'],Window_PartyReserve[_0x521d2e(0x210)]=VisuMZ[_0x521d2e(0x162)]['Settings'][_0x521d2e(0x2a8)][_0x521d2e(0x234)],Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x2d6)]=function(_0x2cdc68){const _0x219b01=_0x521d2e;Window_StatusBase[_0x219b01(0x220)][_0x219b01(0x2d6)]['call'](this,_0x2cdc68),this[_0x219b01(0x168)]=0x0,this[_0x219b01(0x23f)]();},Window_PartyReserve[_0x521d2e(0x220)]['maxCols']=function(){const _0x622445=_0x521d2e;return VisuMZ[_0x622445(0x162)]['Settings'][_0x622445(0x2a8)][_0x622445(0x1df)]||0x1;},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x317)]=function(){const _0x2d8c94=_0x521d2e;return this[_0x2d8c94(0x18d)]()*Window_PartyReserve[_0x2d8c94(0x210)]+0x6;},Window_PartyReserve[_0x521d2e(0x220)]['addRemoveCommand']=function(){const _0x3778a4=_0x521d2e;return VisuMZ[_0x3778a4(0x162)][_0x3778a4(0x232)][_0x3778a4(0x13d)]['AddRemoveCmd'];},Window_PartyReserve['prototype'][_0x521d2e(0x2f8)]=function(){const _0x4fd5fe=_0x521d2e;let _0x22081c=$gameParty[_0x4fd5fe(0x260)]()['length'];if(this[_0x4fd5fe(0x238)]())_0x22081c++;return _0x22081c;},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x2ea)]=function(_0xf22bcb){const _0x2cb7de=_0x521d2e;return $gameParty[_0x2cb7de(0x260)]()[_0xf22bcb];},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x27b)]=function(){const _0x2e0315=_0x521d2e;return this[_0x2e0315(0x2ea)](this[_0x2e0315(0x149)]());},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1ab)]=function(){const _0x20d7c2=_0x521d2e;SoundManager[_0x20d7c2(0x150)]();},Window_PartyReserve['prototype'][_0x521d2e(0x304)]=function(){const _0x462d8c=_0x521d2e,_0x55f8d6=this['actor'](this[_0x462d8c(0x149)]());return _0x55f8d6?_0x55f8d6[_0x462d8c(0x257)]():!![];},Window_PartyReserve['prototype'][_0x521d2e(0x179)]=function(){const _0x2a237d=_0x521d2e;Window_StatusBase['prototype']['processCursorMove']['call'](this),this[_0x2a237d(0x16b)]();},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1b8)]=function(_0x466c74){const _0x199508=_0x521d2e;this[_0x199508(0x149)]()<=0x0?this['processCancel']():Window_StatusBase[_0x199508(0x220)][_0x199508(0x1b8)]['call'](this,_0x466c74);},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1fe)]=function(){const _0x2df4d4=_0x521d2e,_0x1732ec=this[_0x2df4d4(0x149)](),_0x33ec75=_0x1732ec+0x1>=this['maxItems']()-0x1?0x0:_0x1732ec+0x1;this[_0x2df4d4(0x246)](_0x1732ec,_0x33ec75);},Window_PartyReserve['prototype'][_0x521d2e(0x249)]=function(){const _0x4477f1=_0x521d2e,_0x5e2e74=this[_0x4477f1(0x149)](),_0x2845fd=_0x5e2e74-0x1<0x0?this[_0x4477f1(0x2f8)]()-0x2:_0x5e2e74-0x1;this[_0x4477f1(0x246)](_0x5e2e74,_0x2845fd);},Window_PartyReserve[_0x521d2e(0x220)]['quickSwap']=function(_0x5be56a,_0x4e9243){const _0x369d1d=_0x521d2e,_0x1a0c4d=this[_0x369d1d(0x2ea)](_0x5be56a),_0xd868a=this[_0x369d1d(0x2ea)](_0x4e9243);if(!_0x1a0c4d?.[_0x369d1d(0x257)]()||!_0xd868a?.[_0x369d1d(0x257)]())return;else{if(!_0x1a0c4d||!_0xd868a)return;}const _0x300fe1=$gameParty[_0x369d1d(0x29f)],_0x1afe39=_0x300fe1['indexOf'](_0x1a0c4d[_0x369d1d(0x191)]()),_0x2144eb=_0x300fe1[_0x369d1d(0x1d2)](_0xd868a['actorId']());_0x300fe1[_0x1afe39]=_0xd868a?_0xd868a[_0x369d1d(0x191)]():0x0,_0x300fe1[_0x2144eb]=_0x1a0c4d?_0x1a0c4d[_0x369d1d(0x191)]():0x0,this[_0x369d1d(0x23f)](),this[_0x369d1d(0x1ae)](),this['smoothSelect'](_0x4e9243);},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x16b)]=function(){const _0x551cad=_0x521d2e;if(!this[_0x551cad(0x1b6)]())return;Input['isTriggered']('shift')&&this[_0x551cad(0x186)]();},Window_PartyReserve['prototype'][_0x521d2e(0x186)]=function(){const _0x566373=_0x521d2e;SoundManager[_0x566373(0x150)](),$gameParty[_0x566373(0x2dd)](),this[_0x566373(0x1d7)](0x0),SceneManager[_0x566373(0x21a)][_0x566373(0x23d)]();},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1b6)]=function(){const _0x22c6e7=_0x521d2e;return this[_0x22c6e7(0x286)];},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x144)]=function(){const _0x3ad8f4=this['currentActor']();return _0x3ad8f4?_0x3ad8f4['index']():-0x1;},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x14b)]=function(_0x203bfd){const _0x26b277=_0x521d2e;Window_StatusBase[_0x26b277(0x220)]['select'][_0x26b277(0x1dc)](this,_0x203bfd);if(_0x203bfd>=0x0)this[_0x26b277(0x168)]=_0x203bfd;},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x301)]=function(){const _0x375b76=_0x521d2e;this[_0x375b76(0x168)]=Math[_0x375b76(0x25b)](this[_0x375b76(0x168)],this[_0x375b76(0x2f8)]()-0x1),this['smoothSelect'](this[_0x375b76(0x168)]),this['ensureCursorVisible'](!![]),this[_0x375b76(0x250)]=!![];},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1fa)]=function(_0x4644f4){const _0x131418=_0x521d2e,_0x406611=this['actor'](_0x4644f4);if(!_0x406611)return this[_0x131418(0x1ee)](_0x4644f4);const _0x128663=this[_0x131418(0x1a0)](_0x4644f4);this['drawItemImage'](_0x4644f4);const _0x34a28d=0xa8,_0x4038aa=Window_PartyReserve['_rowThickness']===0x1,_0xdddc28=ImageManager['iconWidth']*(_0x4038aa?0x2:0x1),_0x146f0d=this[_0x131418(0x20e)]()+this['itemPadding'](),_0x397d39=_0x128663[_0x131418(0x2c1)]-_0x34a28d,_0x2b7c55=_0x128663['x']+_0xdddc28+Math[_0x131418(0x25b)](_0x146f0d,_0x397d39),_0x299ee1=_0x4038aa?![]:!![];this[_0x131418(0x19e)](_0x406611['isFormationChangeOk']()),this['drawActorPartyIcons'](_0x406611,_0x128663['x'],_0x128663['y'],_0x299ee1),this[_0x131418(0x1ec)](_0x406611,_0x2b7c55,_0x128663['y'],_0x34a28d),this[_0x131418(0x19e)](!![]);},Window_PartyReserve['prototype'][_0x521d2e(0x20e)]=function(){const _0x38084a=_0x521d2e,_0x34759b=VisuMZ[_0x38084a(0x162)][_0x38084a(0x232)][_0x38084a(0x2a8)];switch(Window_PartyReserve[_0x38084a(0x18e)][_0x38084a(0x215)]()[_0x38084a(0x314)]()){case _0x38084a(0x1f9):return ImageManager[_0x38084a(0x2f0)];case _0x38084a(0x205):return _0x34759b[_0x38084a(0x22a)]*0x2;case _0x38084a(0x28c):return _0x34759b[_0x38084a(0x22d)]*0x2;};},Window_PartyReserve[_0x521d2e(0x220)]['drawRemoveCommand']=function(_0x2a5905){const _0x4b9f16=_0x521d2e,_0x1391fb=this[_0x4b9f16(0x1a0)](_0x2a5905);this['changePaintOpacity'](!![]);const _0x5c7d08=TextManager['removePartyMember'];this[_0x4b9f16(0x228)](_0x5c7d08,_0x1391fb['x'],_0x1391fb['y'],_0x1391fb[_0x4b9f16(0x2c1)],'center');},Window_PartyReserve['prototype']['drawItemImage']=function(_0x1a2717){const _0x23fe37=_0x521d2e;switch(Window_PartyReserve[_0x23fe37(0x18e)][_0x23fe37(0x215)]()[_0x23fe37(0x314)]()){case _0x23fe37(0x1f9):this['drawItemImageFace'](_0x1a2717);break;case _0x23fe37(0x205):this['drawItemImageSprite'](_0x1a2717);break;case _0x23fe37(0x28c):Imported[_0x23fe37(0x1ac)]&&this[_0x23fe37(0x1d9)](_0x1a2717);break;};},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1cd)]=function(_0xfe5049){const _0x353a9a=_0x521d2e,_0x1f45c6=this['actor'](_0xfe5049),_0x56b8e0=this[_0x353a9a(0x254)](_0xfe5049),_0x2093f7=Window_PartyReserve[_0x353a9a(0x210)]===0x1;_0x56b8e0['x']+=ImageManager[_0x353a9a(0x1d0)]*(_0x2093f7?0x2:0x1);const _0x2e8d34=ImageManager[_0x353a9a(0x2f0)],_0x24d460=_0x56b8e0[_0x353a9a(0x194)]-0x2;this[_0x353a9a(0x19e)](_0x1f45c6[_0x353a9a(0x257)]()),this[_0x353a9a(0x24a)](_0x1f45c6,_0x56b8e0['x']+0x1,_0x56b8e0['y']+0x1,_0x2e8d34,_0x24d460),this['changePaintOpacity'](!![]);},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1d8)]=function(_0xb44bb4){const _0x28c726=_0x521d2e,_0x3b0c25=this['actor'](_0xb44bb4),_0x5bad5f=this[_0x28c726(0x254)](_0xb44bb4),_0x5a3ef0=Window_PartyReserve[_0x28c726(0x210)]===0x1;_0x5bad5f['x']+=ImageManager[_0x28c726(0x1d0)]*(_0x5a3ef0?0x2:0x1);const _0x3c998c=VisuMZ[_0x28c726(0x162)][_0x28c726(0x232)]['Window'],_0x46ee10=_0x5bad5f['x']+_0x3c998c[_0x28c726(0x22a)]+this[_0x28c726(0x30f)](),_0x835060=_0x5bad5f['y']+_0x5bad5f['height']-_0x3c998c[_0x28c726(0x2ad)];this[_0x28c726(0x265)](_0x3b0c25,_0x46ee10,_0x835060);},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x1d9)]=function(_0x3f0f42){const _0x3ea58f=_0x521d2e,_0xbbe41c=this['actor'](_0x3f0f42),_0x1d08bc=_0xbbe41c[_0x3ea58f(0x2d1)](),_0x3f51a1=this[_0x3ea58f(0x254)](_0x3f0f42),_0x539a8a=Window_PartyReserve[_0x3ea58f(0x210)]===0x1;_0x3f51a1['x']+=ImageManager[_0x3ea58f(0x1d0)]*(_0x539a8a?0x2:0x1);const _0x51edf3=VisuMZ[_0x3ea58f(0x162)][_0x3ea58f(0x232)][_0x3ea58f(0x2a8)],_0x2882dd=_0x3f51a1['x']+_0x51edf3[_0x3ea58f(0x22d)]+this['itemPadding'](),_0x3a97b9=_0x3f51a1['y']+_0x3f51a1['height']-_0x51edf3[_0x3ea58f(0x302)];this['drawSvActor'](_0x1d08bc,_0x2882dd,_0x3a97b9);},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x145)]=function(_0xedd2a2){const _0xda29fc=_0x521d2e;this[_0xda29fc(0x21c)]=_0xedd2a2,this[_0xda29fc(0x190)]();},Window_PartyReserve[_0x521d2e(0x220)][_0x521d2e(0x190)]=function(){const _0x25127e=_0x521d2e;this[_0x25127e(0x21c)]&&this[_0x25127e(0x21c)][_0x25127e(0x2a7)](this[_0x25127e(0x2ea)](this[_0x25127e(0x149)]()));};function Window_PartyStatus(){const _0x5cd24a=_0x521d2e;this[_0x5cd24a(0x2d6)](...arguments);}Window_PartyStatus[_0x521d2e(0x220)]=Object[_0x521d2e(0x1c4)](Window_StatusBase[_0x521d2e(0x220)]),Window_PartyStatus['prototype'][_0x521d2e(0x15a)]=Window_PartyStatus,Window_PartyStatus['prototype']['initialize']=function(_0x21f5e4){const _0x5b123b=_0x521d2e;this[_0x5b123b(0x17f)]=null,Window_StatusBase[_0x5b123b(0x220)][_0x5b123b(0x2d6)][_0x5b123b(0x1dc)](this,_0x21f5e4);},Window_PartyStatus[_0x521d2e(0x220)]['drawItemDarkRect']=function(_0x3c7e4c,_0x5ecf27,_0x2548f5,_0x2e0353,_0x2d81f9){const _0x3b7a67=_0x521d2e;if(VisuMZ[_0x3b7a67(0x162)][_0x3b7a67(0x232)][_0x3b7a67(0x13d)][_0x3b7a67(0x31a)]===![])return;_0x2d81f9=Math[_0x3b7a67(0x2da)](_0x2d81f9||0x1,0x1);while(_0x2d81f9--){_0x2e0353=_0x2e0353||this['lineHeight'](),this[_0x3b7a67(0x2c4)][_0x3b7a67(0x2cb)]=0xa0;const _0x1128c4=ColorManager[_0x3b7a67(0x1b1)]();this[_0x3b7a67(0x2c4)][_0x3b7a67(0x2bf)](_0x3c7e4c+0x1,_0x5ecf27+0x1,_0x2548f5-0x2,_0x2e0353-0x2,_0x1128c4),this[_0x3b7a67(0x2c4)][_0x3b7a67(0x2cb)]=0xff;}},ColorManager[_0x521d2e(0x1b1)]=function(){const _0x3d7ff7=_0x521d2e,_0x136a8b=VisuMZ[_0x3d7ff7(0x162)]['Settings'][_0x3d7ff7(0x13d)];let _0x146cf8=_0x136a8b[_0x3d7ff7(0x154)]!==undefined?_0x136a8b[_0x3d7ff7(0x154)]:0x13;return ColorManager[_0x3d7ff7(0x27f)](_0x146cf8);},Window_PartyStatus[_0x521d2e(0x220)][_0x521d2e(0x2a7)]=function(_0x2c5c7f){const _0x5bfc1d=_0x521d2e;if(this[_0x5bfc1d(0x17f)]===_0x2c5c7f)return;this[_0x5bfc1d(0x17f)]=_0x2c5c7f;if(_0x2c5c7f){const _0x56bd56=ImageManager[_0x5bfc1d(0x316)](_0x2c5c7f[_0x5bfc1d(0x1d6)]());_0x56bd56[_0x5bfc1d(0x29a)](this[_0x5bfc1d(0x23f)]['bind'](this));}else this['refresh']();},Window_PartyStatus[_0x521d2e(0x220)][_0x521d2e(0x23f)]=function(){const _0xa73625=_0x521d2e;Window_StatusBase[_0xa73625(0x220)][_0xa73625(0x23f)][_0xa73625(0x1dc)](this),this[_0xa73625(0x2c4)][_0xa73625(0x2b2)](),this[_0xa73625(0x174)](),VisuMZ[_0xa73625(0x162)]['Settings'][_0xa73625(0x2a8)]['StatusWindowDraw'][_0xa73625(0x1dc)](this);},Window_PartyStatus['prototype']['refreshOG']=function(){const _0x3b81fa=_0x521d2e;if(!this[_0x3b81fa(0x17f)]){this['drawItemDarkRect'](0x0,0x0,this['innerWidth'],this[_0x3b81fa(0x318)]);const _0x229668=Math[_0x3b81fa(0x159)]((this[_0x3b81fa(0x318)]-this[_0x3b81fa(0x18d)]())/0x2);this['changeTextColor'](ColorManager['systemColor']()),this[_0x3b81fa(0x228)](TextManager[_0x3b81fa(0x2e7)],0x0,_0x229668,this[_0x3b81fa(0x13e)],_0x3b81fa(0x2c6));return;}this[_0x3b81fa(0x24a)](this[_0x3b81fa(0x17f)],0x1,0x0,ImageManager[_0x3b81fa(0x2f0)],ImageManager['faceHeight']),this['drawActorSimpleStatus'](this[_0x3b81fa(0x17f)],ImageManager[_0x3b81fa(0x2f0)]+0x24,0x0);const _0x48e0f9=this[_0x3b81fa(0x18d)](),_0x24b340=this['actorParams'](),_0x24f909=Math[_0x3b81fa(0x159)](this[_0x3b81fa(0x13e)]/0x2),_0x24d790=Math[_0x3b81fa(0x18a)](_0x24b340['length']/0x2)*_0x48e0f9,_0x169a34=0x0;let _0x3024e2=0x0,_0x3d8bba=ImageManager[_0x3b81fa(0x291)]+_0x48e0f9/0x2;for(const _0x192e44 of _0x24b340){this[_0x3b81fa(0x21d)](_0x3024e2,_0x3d8bba,_0x24f909,_0x48e0f9),this[_0x3b81fa(0x1da)](_0x192e44,_0x3024e2,_0x3d8bba,_0x24f909),this[_0x3b81fa(0x2a1)](_0x192e44,_0x3024e2,_0x3d8bba,_0x24f909),_0x3024e2===_0x169a34?_0x3024e2+=_0x24f909:(_0x3024e2=_0x169a34,_0x3d8bba+=_0x48e0f9);}},Window_PartyStatus[_0x521d2e(0x220)][_0x521d2e(0x295)]=function(){const _0x3324c4=_0x521d2e;return Imported[_0x3324c4(0x322)]?VisuMZ[_0x3324c4(0x2ef)][_0x3324c4(0x232)]['Param'][_0x3324c4(0x1f0)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0x521d2e(0x220)]['drawParamName']=function(_0x3b3c53,_0x1d1559,_0x12da29,_0x54f2ee){const _0x343c71=_0x521d2e,_0x464aab=this[_0x343c71(0x30f)]();_0x54f2ee-=_0x464aab*0x2;if(Imported[_0x343c71(0x322)])this[_0x343c71(0x187)](_0x1d1559+_0x464aab,_0x12da29,_0x54f2ee,_0x3b3c53,![]);else{const _0x136458=TextManager['param'](_0x3b3c53);this[_0x343c71(0x183)](ColorManager['systemColor']()),this[_0x343c71(0x228)](_0x136458,_0x1d1559+_0x464aab,_0x12da29,_0x54f2ee);}},Window_PartyStatus[_0x521d2e(0x220)][_0x521d2e(0x2a1)]=function(_0x2d5cbe,_0x1cc7b3,_0x2cfa48,_0x447836){const _0x136442=_0x521d2e;this[_0x136442(0x174)]();const _0x56039c=this['itemPadding'](),_0x16f76e=this['getParamValue'](_0x2d5cbe);this['drawText'](_0x16f76e,_0x1cc7b3+_0x56039c,_0x2cfa48,_0x447836-_0x56039c*0x2,_0x136442(0x1eb));},Window_PartyStatus['prototype'][_0x521d2e(0x30e)]=function(_0x23c0c8){const _0xaf111f=_0x521d2e,_0x18a979=this[_0xaf111f(0x17f)];return Imported[_0xaf111f(0x322)]?_0x18a979['paramValueByName'](_0x23c0c8,!![]):_0x18a979[_0xaf111f(0x20f)](_0x23c0c8);};function Window_PartyBattleSwitch(){const _0x2812e5=_0x521d2e;this[_0x2812e5(0x2d6)](...arguments);}Window_PartyBattleSwitch[_0x521d2e(0x220)]=Object[_0x521d2e(0x1c4)](Window_StatusBase[_0x521d2e(0x220)]),Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x15a)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x2d6)]=function(_0x57bf68){const _0x30f3c3=_0x521d2e;Window_StatusBase[_0x30f3c3(0x220)][_0x30f3c3(0x2d6)][_0x30f3c3(0x1dc)](this,_0x57bf68),this[_0x30f3c3(0x25c)](VisuMZ[_0x30f3c3(0x162)][_0x30f3c3(0x232)][_0x30f3c3(0x2a8)][_0x30f3c3(0x2c3)]),this['openness']=0x0;},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x241)]=function(){const _0xe8dda3=_0x521d2e;for(const _0x583acc of $gameParty['allMembers']()){ImageManager[_0xe8dda3(0x316)](_0x583acc[_0xe8dda3(0x1d6)]());}},Window_PartyBattleSwitch[_0x521d2e(0x220)]['maxCols']=function(){return 0x1;},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x2ea)]=function(_0x2f060f){const _0x280402=_0x521d2e;return $gameParty[_0x280402(0x260)]()[_0x2f060f];},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x27b)]=function(){const _0x4bd008=_0x521d2e;return this[_0x4bd008(0x2ea)](this['index']());},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x317)]=function(){const _0x4cf1a0=_0x521d2e;return this[_0x4cf1a0(0x18d)]()*0x2+0x8;},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x2f8)]=function(){const _0x5be0b3=_0x521d2e;return $gameParty['reserveMembers']()[_0x5be0b3(0x26b)];},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x19b)]=function(){const _0x6ab4c6=_0x521d2e;Window_StatusBase[_0x6ab4c6(0x220)][_0x6ab4c6(0x19b)][_0x6ab4c6(0x1dc)](this),this[_0x6ab4c6(0x1d4)](),this[_0x6ab4c6(0x23f)](),this[_0x6ab4c6(0x1d7)](0x0);},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x278)]=function(){const _0x30dafe=_0x521d2e;Window_StatusBase['prototype'][_0x30dafe(0x278)][_0x30dafe(0x1dc)](this),this['close']();},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x304)]=function(){const _0x42dee1=_0x521d2e;return this['isEnabled'](this[_0x42dee1(0x27b)]());},Window_PartyBattleSwitch['prototype'][_0x521d2e(0x2ba)]=function(_0x59fc6a){const _0x589e94=_0x521d2e;if(!_0x59fc6a)return![];return _0x59fc6a[_0x589e94(0x257)]()&&_0x59fc6a['isAlive']();},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x1fa)]=function(_0x5042cc){const _0xe5decf=_0x521d2e,_0x1a619c=this['actor'](_0x5042cc);if(!_0x1a619c)return;const _0x526c62=ImageManager[_0xe5decf(0x316)](_0x1a619c[_0xe5decf(0x1d6)]());_0x526c62[_0xe5decf(0x29a)](this[_0xe5decf(0x2ce)][_0xe5decf(0x1ff)](this,_0x5042cc));},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x2ce)]=function(_0x4550a3){const _0x1f1367=_0x521d2e;this[_0x1f1367(0x294)](_0x4550a3),this[_0x1f1367(0x19f)](_0x4550a3);},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x294)]=function(_0x6e822d){const _0x1d8f53=_0x521d2e,_0x24cdb9=this[_0x1d8f53(0x2ea)](_0x6e822d),_0x345b6d=this[_0x1d8f53(0x254)](_0x6e822d);this[_0x1d8f53(0x19e)](this[_0x1d8f53(0x2ba)](_0x24cdb9)),this[_0x1d8f53(0x24a)](_0x24cdb9,_0x345b6d['x']+0x1,_0x345b6d['y']+0x1,ImageManager['faceWidth'],_0x345b6d[_0x1d8f53(0x194)]-0x2),this[_0x1d8f53(0x19e)](!![]);},Window_PartyBattleSwitch[_0x521d2e(0x220)][_0x521d2e(0x19f)]=function(_0x458064){const _0x5d4cc3=_0x521d2e,_0x2ec877=this['actor'](_0x458064),_0x3cb218=this[_0x5d4cc3(0x198)](_0x458064),_0x243abd=_0x3cb218['x']+ImageManager[_0x5d4cc3(0x2f0)]+0x24,_0x54065c=_0x243abd+0xb4;this['changePaintOpacity'](this['isEnabled'](_0x2ec877)),this[_0x5d4cc3(0x1ec)](_0x2ec877,_0x243abd,_0x3cb218['y']),this[_0x5d4cc3(0x1ed)](_0x2ec877,_0x243abd,_0x3cb218['y']+this[_0x5d4cc3(0x18d)]()),this[_0x5d4cc3(0x17b)](_0x2ec877,_0x54065c,_0x3cb218['y']),this[_0x5d4cc3(0x19e)](!![]);};Imported[_0x521d2e(0x178)]&&(ImageManager[_0x521d2e(0x2f5)]=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)]['General']['BattlePartyIcon']??0x4b,TextManager['battlePartyChangeCmd']=VisuMZ['PartySystem'][_0x521d2e(0x232)]['Vocab'][_0x521d2e(0x2fa)],TextManager[_0x521d2e(0x209)]=VisuMZ['PartySystem'][_0x521d2e(0x232)][_0x521d2e(0x2ae)]['BattleHelpFormation'],TextManager[_0x521d2e(0x1c0)]=VisuMZ[_0x521d2e(0x162)]['Settings']['Vocab'][_0x521d2e(0x2a9)],TextManager[_0x521d2e(0x180)]=VisuMZ['PartySystem']['Settings'][_0x521d2e(0x2ae)][_0x521d2e(0x2fb)],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x2ae)][_0x521d2e(0x1c2)],VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x1c3)]=SceneManager['isPreviousSceneBattleTransitionable'],SceneManager[_0x521d2e(0x13a)]=function(){const _0x202cae=_0x521d2e;if(SceneManager['isPreviousScene'](Scene_Party))return!![];return VisuMZ[_0x202cae(0x162)]['SceneManager_isPreviousSceneBattleTransitionable']['call'](this);},VisuMZ[_0x521d2e(0x162)]['SceneManager_isNextSceneBattleTransitionable']=SceneManager[_0x521d2e(0x31e)],SceneManager[_0x521d2e(0x31e)]=function(){if(SceneManager['isNextScene'](Scene_Party))return!![];return VisuMZ['PartySystem']['SceneManager_isNextSceneBattleTransitionable']['call'](this);},SceneManager[_0x521d2e(0x237)]=function(){const _0x30f203=_0x521d2e;return this[_0x30f203(0x21a)]&&this['_scene'][_0x30f203(0x15a)]===Scene_Map;},VisuMZ['PartySystem'][_0x521d2e(0x20a)]=Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x261)],Scene_Battle['prototype'][_0x521d2e(0x261)]=function(){const _0xc7a876=_0x521d2e;VisuMZ[_0xc7a876(0x162)][_0xc7a876(0x20a)][_0xc7a876(0x1dc)](this),this['createPartySwitchWindow'](),this['postPartySwitchMenuTpb'](),this[_0xc7a876(0x2c0)]();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x31c)]=function(){const _0x518d56=_0x521d2e,_0xf248d2=this[_0x518d56(0x283)]();this['_partyMemberSwitchWindow']=new Window_PartyBattleSwitch(_0xf248d2),this[_0x518d56(0x311)](this[_0x518d56(0x247)]),this[_0x518d56(0x247)][_0x518d56(0x288)]('ok',this[_0x518d56(0x300)][_0x518d56(0x1ff)](this)),this[_0x518d56(0x247)][_0x518d56(0x288)](_0x518d56(0x263),this['onPartySwitchCancel'][_0x518d56(0x1ff)](this));},Scene_Battle[_0x521d2e(0x220)]['partySwitchWindowRect']=function(){const _0x5b10b7=_0x521d2e,_0xf545e5=this[_0x5b10b7(0x2f1)]();return _0xf545e5===_0x5b10b7(0x2ab)?this[_0x5b10b7(0x245)]():this[_0x5b10b7(0x1cb)]();},Scene_Battle['prototype'][_0x521d2e(0x1cb)]=function(){const _0x3f3d08=_0x521d2e;return VisuMZ[_0x3f3d08(0x162)][_0x3f3d08(0x232)][_0x3f3d08(0x2a8)][_0x3f3d08(0x13b)][_0x3f3d08(0x1dc)](this);},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x245)]=function(){const _0x11804b=_0x521d2e,_0x188e1d=this[_0x11804b(0x208)](),_0x1e36a1=$gameSystem[_0x11804b(0x2e0)]()*0x2;return _0x188e1d[_0x11804b(0x2c1)]=0x204+_0x1e36a1,_0x188e1d;},VisuMZ['PartySystem'][_0x521d2e(0x2a5)]=Scene_Battle['prototype']['isAnyInputWindowActive'],Scene_Battle[_0x521d2e(0x220)]['isAnyInputWindowActive']=function(){const _0x535cad=_0x521d2e;if(this[_0x535cad(0x247)]&&this[_0x535cad(0x247)][_0x535cad(0x286)])return!![];if(this['_partySystemSwitchOut'])return!![];if(this['_callPartyMemberSwitch'])return!![];if(this[_0x535cad(0x2b4)])return!![];return VisuMZ[_0x535cad(0x162)][_0x535cad(0x2a5)][_0x535cad(0x1dc)](this);},VisuMZ[_0x521d2e(0x162)]['Scene_Battle_createPartyCommandWindowBattleCore']=Scene_Battle[_0x521d2e(0x220)]['createPartyCommandWindowBattleCore'],Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x275)]=function(){const _0x5a0fc6=_0x521d2e;VisuMZ[_0x5a0fc6(0x162)]['Scene_Battle_createPartyCommandWindowBattleCore']['call'](this),this['_partyCommandWindow'][_0x5a0fc6(0x288)]('formation',this[_0x5a0fc6(0x19a)]['bind'](this));},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x19a)]=function(){const _0xe9b7e4=_0x521d2e;this['isQueueFormationMenu']()?(this[_0xe9b7e4(0x2b4)]=!![],this['_logWindow'][_0xe9b7e4(0x25a)](TextManager[_0xe9b7e4(0x255)][_0xe9b7e4(0x2a6)](TextManager['formation']))):this['callFormation']();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x2e8)]=function(){const _0x2dd91c=_0x521d2e;return BattleManager[_0x2dd91c(0x289)]();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x1a1)]=function(){const _0x5a1b62=_0x521d2e;this[_0x5a1b62(0x2b4)]=![],this[_0x5a1b62(0x182)][_0x5a1b62(0x14e)](),this[_0x5a1b62(0x2d7)][_0x5a1b62(0x2b5)]=![],SceneManager[_0x5a1b62(0x196)](),SceneManager[_0x5a1b62(0x2e6)](Scene_Party),$gameParty[_0x5a1b62(0x2df)](),BattleManager['isTpb']()&&(BattleManager[_0x5a1b62(0x24c)]=BattleManager[_0x5a1b62(0x2ea)]());},VisuMZ['PartySystem']['Scene_Battle_updateBattleProcess']=Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x2cf)],Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x2cf)]=function(){const _0x237347=_0x521d2e;VisuMZ['PartySystem']['Scene_Battle_updateBattleProcess'][_0x237347(0x1dc)](this),this[_0x237347(0x2b4)]&&!BattleManager[_0x237347(0x2ac)]&&this[_0x237347(0x1a1)](),this['_callPartyMemberSwitch']&&!BattleManager[_0x237347(0x2ac)]&&this['callPartyMemberSwitch']();},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x1d1)]=Scene_Battle[_0x521d2e(0x220)]['isTimeActive'],Scene_Battle['prototype']['isTimeActive']=function(){const _0x41fed0=_0x521d2e;if(BattleManager[_0x41fed0(0x289)]()){if(this[_0x41fed0(0x247)]&&this[_0x41fed0(0x247)][_0x41fed0(0x286)])return![];}return VisuMZ[_0x41fed0(0x162)][_0x41fed0(0x1d1)][_0x41fed0(0x1dc)](this);},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x17e)]=Scene_Battle[_0x521d2e(0x220)]['createActorCommandWindow'],Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x243)]=function(){const _0x3433e3=_0x521d2e;VisuMZ['PartySystem'][_0x3433e3(0x17e)][_0x3433e3(0x1dc)](this),this[_0x3433e3(0x2e4)][_0x3433e3(0x288)](_0x3433e3(0x2cd),this[_0x3433e3(0x251)]['bind'](this));},Scene_Battle[_0x521d2e(0x220)]['commandPartyMemberSwitch']=function(){const _0x473948=_0x521d2e;this[_0x473948(0x2e8)]()?(this[_0x473948(0x14c)]=!![],this[_0x473948(0x262)]['addText'](TextManager[_0x473948(0x255)][_0x473948(0x2a6)](TextManager['formation']))):this[_0x473948(0x172)]();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x172)]=function(){const _0x257874=_0x521d2e;this[_0x257874(0x14c)]=![],this['_logWindow']['clear'](),BattleManager[_0x257874(0x2ea)]()&&this[_0x257874(0x247)]['activate']();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x300)]=function(){const _0x727174=_0x521d2e,_0x3d4bf9=this[_0x727174(0x247)][_0x727174(0x27b)]();_0x3d4bf9?this[_0x727174(0x225)](_0x3d4bf9):(this[_0x727174(0x247)][_0x727174(0x278)](),this[_0x727174(0x2e4)]['activate']());},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x225)]=function(_0x325b95){const _0x4c83f0=_0x521d2e,_0x2dd330=BattleManager[_0x4c83f0(0x2ea)](),_0x2d06f9=_0x2dd330[_0x4c83f0(0x211)]();this[_0x4c83f0(0x247)]['deactivate'](),this[_0x4c83f0(0x29c)]()&&_0x2d06f9?(this[_0x4c83f0(0x1cc)]=!![],_0x2d06f9[_0x4c83f0(0x312)](_0x325b95)):this[_0x4c83f0(0x2f6)](_0x325b95);},Scene_Battle['prototype'][_0x521d2e(0x29c)]=function(){const _0x47081b=_0x521d2e;return VisuMZ[_0x47081b(0x162)]['Settings'][_0x47081b(0x13d)]['SwitchOutAnimation'];},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x2f6)]=function(_0xdc1a36){const _0x3e44b1=_0x521d2e;this[_0x3e44b1(0x1cc)]=![];const _0x4284e2=BattleManager[_0x3e44b1(0x2ea)](),_0x4ed430=_0x4284e2[_0x3e44b1(0x211)]();$gameParty[_0x3e44b1(0x28b)][_0x4284e2['index']()]=_0xdc1a36[_0x3e44b1(0x191)](),$gameParty[_0x3e44b1(0x26e)]();if(this[_0x3e44b1(0x160)]())_0xdc1a36[_0x3e44b1(0x206)]=_0x4284e2['_tpbChargeTime'],_0xdc1a36[_0x3e44b1(0x1db)]=_0x3e44b1(0x279);else BattleManager[_0x3e44b1(0x280)]()&&_0xdc1a36[_0x3e44b1(0x1bb)]();BattleManager[_0x3e44b1(0x16c)]=_0xdc1a36,_0xdc1a36[_0x3e44b1(0x2df)](),_0xdc1a36[_0x3e44b1(0x266)](),_0xdc1a36['onBattlePartySwitch'](_0x4284e2),_0x4ed430&&_0x4ed430[_0x3e44b1(0x306)](_0xdc1a36),this[_0x3e44b1(0x21c)]['switchStateIconActor'](_0x4284e2,_0xdc1a36),this['_statusWindow'][_0x3e44b1(0x23f)](),this[_0x3e44b1(0x2e4)][_0x3e44b1(0x219)](_0xdc1a36),this[_0x3e44b1(0x2e4)]['smoothSelect'](0x0),this[_0x3e44b1(0x2e4)][_0x3e44b1(0x19b)](),this[_0x3e44b1(0x2e4)]['_debug']=!![];},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x160)]=function(){const _0x1f4386=_0x521d2e;if(!BattleManager['isTpb']())return![];const _0x38c404=VisuMZ[_0x1f4386(0x162)][_0x1f4386(0x232)][_0x1f4386(0x13d)];return _0x38c404[_0x1f4386(0x163)]===undefined&&(_0x38c404['tpbImmediateAction']=!![]),_0x38c404[_0x1f4386(0x163)];},Window_StatusBase[_0x521d2e(0x220)][_0x521d2e(0x15c)]=function(_0x2cdd39,_0xbe93d){const _0xa67e5d=_0x521d2e,_0x4f939f='actor%1-stateIcon'[_0xa67e5d(0x2a6)](_0x2cdd39[_0xa67e5d(0x191)]()),_0x2cf0ee=this['createInnerSprite'](_0x4f939f,Sprite_StateIcon);_0x2cf0ee['setup'](_0xbe93d);},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x1a4)]=function(){const _0x48953e=_0x521d2e;this['_partyMemberSwitchWindow'][_0x48953e(0x278)](),this[_0x48953e(0x2e4)]['activate'](),this['_actorCommandWindow'][_0x48953e(0x23f)]();},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x1ce)]=function(){const _0x29f5bc=_0x521d2e;if(!BattleManager[_0x29f5bc(0x280)]())return;if(!SceneManager[_0x29f5bc(0x1b0)](Scene_Party))return;this[_0x29f5bc(0x323)][_0x29f5bc(0x278)](),this['_partyCommandWindow'][_0x29f5bc(0x293)](),this['_actorCommandWindow']['deactivate'](),this[_0x29f5bc(0x2e4)][_0x29f5bc(0x293)](),BattleManager[_0x29f5bc(0x16c)]=null,BattleManager[_0x29f5bc(0x173)]=![];},Scene_Battle[_0x521d2e(0x220)][_0x521d2e(0x2c0)]=function(){const _0x3deb16=_0x521d2e;if(BattleManager[_0x3deb16(0x280)]())return;if(!SceneManager[_0x3deb16(0x1b0)](Scene_Party))return;Imported[_0x3deb16(0x1cf)]&&BattleManager[_0x3deb16(0x1e1)]()&&BattleManager[_0x3deb16(0x1fb)](),Imported[_0x3deb16(0x233)]&&BattleManager[_0x3deb16(0x2b6)]()&&(BattleManager['_currentActor']=$gameParty[_0x3deb16(0x203)](),BattleManager[_0x3deb16(0x2ac)]=BattleManager[_0x3deb16(0x2ea)](),BattleManager['_inputting']=!![],this[_0x3deb16(0x2e4)][_0x3deb16(0x219)](BattleManager[_0x3deb16(0x2ea)]()),this[_0x3deb16(0x21c)][_0x3deb16(0x1b5)](BattleManager[_0x3deb16(0x2ea)]())),Imported['VisuMZ_2_BattleSystemETB']&&BattleManager['isETB']()&&(BattleManager[_0x3deb16(0x16c)]=$gameParty[_0x3deb16(0x203)](),BattleManager[_0x3deb16(0x2ac)]=BattleManager[_0x3deb16(0x2ea)](),BattleManager[_0x3deb16(0x173)]=!![],this[_0x3deb16(0x2e4)][_0x3deb16(0x219)](BattleManager[_0x3deb16(0x2ea)]()),this[_0x3deb16(0x21c)][_0x3deb16(0x1b5)](BattleManager['actor']())),Imported[_0x3deb16(0x319)]&&BattleManager['isPTB']()&&(BattleManager[_0x3deb16(0x16c)]=$gameParty[_0x3deb16(0x203)](),BattleManager[_0x3deb16(0x2ac)]=BattleManager[_0x3deb16(0x2ea)](),BattleManager[_0x3deb16(0x173)]=!![],this['_actorCommandWindow'][_0x3deb16(0x219)](BattleManager[_0x3deb16(0x2ea)]()),this['_statusWindow'][_0x3deb16(0x1b5)](BattleManager[_0x3deb16(0x2ea)]()));},Game_Party[_0x521d2e(0x220)][_0x521d2e(0x203)]=function(){const _0x3edbf0=_0x521d2e;let _0x416386=this[_0x3edbf0(0x188)]();return _0x416386[0x0];},Sprite_Actor[_0x521d2e(0x1c6)]=0xc,Sprite_Actor[_0x521d2e(0x220)][_0x521d2e(0x312)]=function(_0x5ed057){const _0x49b1c6=_0x521d2e;this['_partySwitchTargetActor']=_0x5ed057;const _0x3b327b=Sprite_Actor[_0x49b1c6(0x1c6)];this[_0x49b1c6(0x1e9)](0x12c,0x0,_0x3b327b),this[_0x49b1c6(0x1a8)](0x0,_0x3b327b),this[_0x49b1c6(0x1c6)]=_0x3b327b;},Sprite_Actor[_0x521d2e(0x220)]['startSwitchInAnimation']=function(_0xe2be08){const _0xfa8d58=_0x521d2e;if(SceneManager[_0xfa8d58(0x146)]()){SceneManager[_0xfa8d58(0x21a)]['processPartySwitchMember'](_0xe2be08);const _0x93a3e8=Sprite_Actor[_0xfa8d58(0x1c6)];this[_0xfa8d58(0x26d)](),this[_0xfa8d58(0x1a8)](0xff,_0x93a3e8);}this[_0xfa8d58(0x230)]=null;},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x2de)]=Sprite_Actor[_0x521d2e(0x220)]['update'],Sprite_Actor['prototype']['update']=function(){const _0x25dd80=_0x521d2e;VisuMZ[_0x25dd80(0x162)][_0x25dd80(0x2de)][_0x25dd80(0x1dc)](this);if(this[_0x25dd80(0x1c6)])this['updatePartySwitch']();},Sprite_Actor['prototype'][_0x521d2e(0x16f)]=function(){const _0x518dbd=_0x521d2e;this[_0x518dbd(0x1c6)]=this[_0x518dbd(0x1c6)]||0x0,this[_0x518dbd(0x1c6)]--,this['_partySwitchDuration']<=0x0&&this['startSwitchInAnimation'](this[_0x518dbd(0x230)]);},Window_PartyCommand['prototype'][_0x521d2e(0x2f2)]=function(){this['addFormationCommand']();},Window_PartyCommand[_0x521d2e(0x220)][_0x521d2e(0x223)]=function(){const _0x1a2643=_0x521d2e;if(!this[_0x1a2643(0x218)]())return;if(this['hasBattleSystemIncompatibilities']()){$gameTemp[_0x1a2643(0x315)]()&&!BattleManager[_0x1a2643(0x195)]&&(console[_0x1a2643(0x1b9)](_0x1a2643(0x214)),BattleManager[_0x1a2643(0x195)]=!![]);return;}const _0x4b3b00=this[_0x1a2643(0x26f)](),_0x23b35f=ImageManager['battlePartyChangeIcon'],_0x444cc8=_0x4b3b00==='text'?TextManager['battlePartyChangeCmd']:'\x5cI[%1]%2'['format'](_0x23b35f,TextManager[_0x1a2643(0x14d)]),_0x154b04=this[_0x1a2643(0x1af)]();this[_0x1a2643(0x308)](_0x444cc8,_0x1a2643(0x2cd),_0x154b04);},Window_PartyCommand[_0x521d2e(0x220)][_0x521d2e(0x218)]=function(){const _0x1445f0=_0x521d2e;if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x1445f0(0x281)]())return![];return VisuMZ['PartySystem']['Settings'][_0x1445f0(0x13d)][_0x1445f0(0x13f)];},Window_PartyCommand[_0x521d2e(0x220)][_0x521d2e(0x231)]=function(){const _0x1f7a77=_0x521d2e;if(Imported[_0x1f7a77(0x2d8)]&&BattleManager[_0x1f7a77(0x1a5)]())return!![];return![];},Window_PartyCommand['prototype'][_0x521d2e(0x1af)]=function(){const _0x33f1ac=_0x521d2e;if($gameParty[_0x33f1ac(0x197)]()['length']<=0x1)return![];if(!$gameParty[_0x33f1ac(0x313)]())return![];return $gameSystem['isFormationEnabled']();},VisuMZ['PartySystem'][_0x521d2e(0x232)][_0x521d2e(0x2c8)]=Window_PartyCommand[_0x521d2e(0x220)][_0x521d2e(0x193)],Window_PartyCommand['prototype'][_0x521d2e(0x193)]=function(){const _0x42d6e8=_0x521d2e,_0xd46de5=this[_0x42d6e8(0x2b1)]();switch(_0xd46de5){case _0x42d6e8(0x2cd):this['_helpWindow'][_0x42d6e8(0x23e)](TextManager[_0x42d6e8(0x209)]);break;default:VisuMZ[_0x42d6e8(0x162)][_0x42d6e8(0x232)][_0x42d6e8(0x2c8)][_0x42d6e8(0x1dc)](this);break;}},Window_ActorCommand['prototype']['addPartyCommand']=function(){const _0x4d39bd=_0x521d2e;if(!this[_0x4d39bd(0x26a)]())return;this['findSymbol'](_0x4d39bd(0x2cd))>=0x0&&this['removePartyCommand']();const _0x1cf99f=this[_0x4d39bd(0x26f)](),_0x590dbe=ImageManager[_0x4d39bd(0x2f5)],_0x596770=_0x1cf99f===_0x4d39bd(0x248)?TextManager[_0x4d39bd(0x1c0)]:'\x5cI[%1]%2'[_0x4d39bd(0x2a6)](_0x590dbe,TextManager['battlePartyChangeCmd']),_0x7a7856=this[_0x4d39bd(0x216)]();this['addCommand'](_0x596770,_0x4d39bd(0x2cd),_0x7a7856);},Window_ActorCommand[_0x521d2e(0x220)]['isPartyCommandAdded']=function(){const _0x3e0399=_0x521d2e;if(!this[_0x3e0399(0x17f)])return![];return VisuMZ[_0x3e0399(0x162)][_0x3e0399(0x232)][_0x3e0399(0x13d)][_0x3e0399(0x1ba)];},Window_ActorCommand[_0x521d2e(0x220)]['isPartyCommandEnabled']=function(){const _0x29f8bb=_0x521d2e;if($gameParty['allMembers']()[_0x29f8bb(0x26b)]<=0x1)return![];if(!this[_0x29f8bb(0x17f)])return![];if(!this[_0x29f8bb(0x17f)][_0x29f8bb(0x313)]())return![];return this[_0x29f8bb(0x17f)][_0x29f8bb(0x257)]();},VisuMZ[_0x521d2e(0x162)][_0x521d2e(0x232)][_0x521d2e(0x175)]=Window_ActorCommand[_0x521d2e(0x220)][_0x521d2e(0x193)],Window_ActorCommand[_0x521d2e(0x220)]['updateHelp']=function(){const _0x4e830b=_0x521d2e,_0x44869e=this[_0x4e830b(0x2b1)]();if(!_0x44869e)return;switch(_0x44869e[_0x4e830b(0x215)]()){case _0x4e830b(0x2cd):this[_0x4e830b(0x2d0)][_0x4e830b(0x23e)](TextManager[_0x4e830b(0x180)]);break;default:VisuMZ[_0x4e830b(0x162)][_0x4e830b(0x232)][_0x4e830b(0x175)][_0x4e830b(0x1dc)](this);break;}},Window_ActorCommand[_0x521d2e(0x220)][_0x521d2e(0x292)]=function(){const _0x50abc6=_0x521d2e;while(this[_0x50abc6(0x256)](_0x50abc6(0x2cd))>=0x0){const _0x47432c=this[_0x50abc6(0x256)](_0x50abc6(0x2cd));this['_list'][_0x50abc6(0x258)](_0x47432c,0x1);}});;