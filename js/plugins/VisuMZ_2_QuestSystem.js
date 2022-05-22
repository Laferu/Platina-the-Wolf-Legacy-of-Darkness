//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
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
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 * 
 * - [[RawTitle]] - Inserts the title of the quest without any text codes
 *   removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 * 
 * ---
 * 
 * === Control Variable Script Functions ===
 * 
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 * 
 * ---
 * 
 * totalQuestsAvailable()
 * 
 * - Returns the total number of quests available for the player.
 * 
 * ---
 * 
 * totalQuestsCompleted()
 * 
 * - Returns the total number of quests completed by the player.
 * 
 * ---
 * 
 * totalQuestsFailed()
 * 
 * - Returns the total number of quests failed by the player.
 * 
 * ---
 * 
 * totalQuestsRevealed()
 * 
 * - Returns the total number of quests visible to the player.
 * 
 * ---
 * 
 * totalQuestsInGame()
 * 
 * - Returns the total number of quests available in-game.
 * 
 * ---
 * 
 * getQuestDescriptionIndex(questKey)
 * 
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestObjectives(questKey)
 * 
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalQuestObjectives(questKey)
 * 
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestRewards(questKey)
 * 
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 * 
 * ---
 * 
 * totalQuestRewards(questKey)
 * 
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 * 
 * ---
 * 
 * getQuestSubtextIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 * 
 * ---
 * 
 * getQuestQuoteIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 * 
 * ---
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * isQuestObjectiveCompleted(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveFailed(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveUncleared(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardClaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardDenied(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardUnclaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
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
 * === Action Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Enemy Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Item Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 * 
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
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
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
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
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The quest of the title. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
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
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * JavaScript Functions
 * ============================================================================
 *
 * These are some new JavaScript functions that you can use for the
 * 'JS: On Load' Plugin Parameter found in the Quest settings.
 *
 * Using these require you to have an adequate understanding of how JavaScript
 * works in order to successfully use it.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.12: July 9, 2021
 * * Feature Update!
 * ** Improved calculations for determining window size. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Feature!
 * ** Added new [[Marker]] to Quest Log format and Quest Tracker formats.
 * *** [[RawTitle]] - Inserts the title of the quest without any text codes
 *     removed. Keep in mind that icons do NOT resize based on the text size.
 * 
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 * 
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 * 
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 * 
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
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
 * @param QuestSystem
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
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The quest of the title. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
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
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
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
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
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
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
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
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x242b=['_quest','objectives','hAQKh','refreshQuestTrackerWindow','getQuestLogFmt','mainCommandWidth','questTrackerShow','fgEgd','addLoadListener','completed','Show','createQuestRewards','\x1bWrapBreak[0]','Game_BattlerBase_addNewState','buttonAssistText1','drawItemStyleIconText','questTrackerWindow','_scrollBaseX','known','questsCompleted','setTrackedQuest','updateOrigin','auto','addCommand','isQuestCompleted','setQuestSubtext','createContents','currentCategory','clear','VisibleObjectives','CmdTextAlign','isAlive','commandNameWindowDrawText','NJJiY','QuestSubtext','LogWindow_BgType','initialize','PHDMl','addKnownQuestsCommand','Game_Battler_useItem','createQuestLabelWindow','deactivate','Categories','_textHeight','createCommandNameWindow','HFbMJ','_labelWindow','QuestRewards','overallHeight','_scrollBaseY','tracked','createCommandWindow','makeCommandList','updateDelayRefresh','questButtonAssistActive','xpChL','show','questObjectiveClearedFmt','questObjectivesCompleted','setQuestRewards','text','doesCategoryHaveQuestsAvailable','1141352ebVITa','164531TlROsx','Quests','ARRAYNUM','claimed','questsFailed','questKnownCmd','showTracker','questCompletedCmd','pagedown','refresh','itemTextAlign','questJournalSystemUseItem','getEmptyLogFmt','setQuestStatus','QCxqH','call','Objective_Failed_Fmt','isSceneMap','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','PositionOn','bind','setBackgroundType','questData','EVAL','QuestSet','match','index','isQuestFailed','includes','ThCYv','FmBOO','Scene_Boot_onDatabaseLoaded','deny','ehcEY','smoothScrollDown','VisibleRewards','removed','createQuestListWindow','setQuestDescription','onCommandOk','currentExt','bitmap','createQuestLogWindow','activate','setHandler','name','132713wrxJge','AobZJ','resetFontSettings','TargetID','addOriginalCommands','join','format','CategoryName','uYDDF','FusPT','wordWrapSupport','map','IKZnl','Window_Options_addGeneralOptions','numItems','currentQuest','update','isRightInputMode','quotes','questTrackerFmt','replace','isPressed','drawIcon','finalizeWordWrapSupport','BgSettings','QuestData','LogFmt','setCategoryFilter','description','windowPadding','contentsHeight','questTrackerPosition','QuestDescription','CmdStyle','PsHtf','Rewards','640975yXoqPY','questCommandName','BgFilename1','NUM','trackedQuest','maxCommands','getBackgroundOpacity','statusText','addCompletedQuestsCommand','onListCancel','questKnownIcon','drawItem','questQuote','846465SHedJy','STRUCT','isActor','Name','visibilityLevel','fail','TrackerShowHide','questFailedIcon','denied','Title','LineBreakSpace','TrackerFmt','deselect','Keys','getConfigValue','createQuestSubtext','categoryList','updateCommandNameWindow','setQuest','openCloseCurrentCategory','center','bCtDG','FailedQuests','onListQuest','boxWidth','makeData','_commandNameWindow','uiInputPosition','updateVisibility','ShowMainMenu','questSubtext','PgvSQ','_logWindow','drawItemStyleIcon','pageup','makeQuestList','active','isFailedQuestsVisible','gainItem','Scene_Options_maxCommands','setValue','category','QuestLabel_BgType','questRewardsClaimedFmt','scaleSprite','createSpriteset','uGsTJ','convertLineBreaksForWordWrap','ARRAYJSON','setQuestForQuestTrackerWindow','addQuestCommandAutomatically','addQuestCommand','SnapshotOpacity','CommandWindow_Failed_Icon','AdjustRect','commandQuest','createEmptyText','setListWindow','updatePageUpDownScroll','innerWidth','buttonAssistText4','isEnemy','addQuestSystemCommands','sort','commandStyle','_hasDiedBefore','parameters','CommandWindow_Failed_Text','questCategoryClosedFmt','zkBwK','origin','questListWindowRect','Difficulty','General','version','textSizeEx','Scene_Map_createSpriteset','questEmptyText','ListWindow_Rect','addNewState','ListWindowCategoryCloseFmt','OnLoadQuestJS','_scrollX','questJournalSystemAddDeath','ShowName','changePaintOpacity','setQuestTrackerVisible','_questTrackerWindow','_backSprite1','noQuestsLabel','questTrackedQuestFmt','qaJjn','subtext','QuestObjectives','MainMenu','isCompletedQuestsEnabled','requestRefresh','733888EaivXn','jukRV','trim','enemy','questsKnown','PviUF','updateLogWindow','xteCv','CompletedQuests','QuestLabel_Rect','NwcKY','_quests','addChild','deathStateId','height','noMessageCoreRemoveEscapeCodes','lFyXf','activeBgType','RtUCN','Status','TrackerWindow_Scale','ZpHDa','itemLineRect','TrackerChangeQuest','\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a','width','createQuestQuote','lykDu','questTrackerOnRight','NrBMa','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','concat','questRewards','TrackedQuest','adjustSprite','baseTextRect','scale','processWheelScroll','process_VisuMZ_QuestSystem_Data','tradeItemWithParty','maxItems','clamp','complete','questRewardsDenied','questRewardsDeniedFmt','prototype','QuestSystem','isCategoryOpen','makeDeepCopy','shown','applyData','_messageWindow','drawTextEx','ButtonAssistExpand','filter','iconText','push','isquestMenuShown','questButtonAssistCollapse','unshift','SystemShowQuestMenu','setQuestObjectives','questObjectiveNormalFmt','_isRefreshingQuestTrackerWindow','dOckP','SystemCallSceneQuest','Objectives','isQuestKnown','enabled','note','questFailedCmd','nbnTY','Window_MenuCommand_addOriginalCommands','commandSymbol','rewards','Subtext','questRewardsNormalFmt','callUpdateHelp','NPsuh','itemPadding','CommandWindow_Completed_Icon','opacity','remove','createQuestDescription','1351937rXOXVa','LogWindow_Rect','initCategories','_tradeItemWithParty','_scene','return\x200','MMAmE','_categoryStatus','From','questObjectives','commandNameWindowDrawBackground','Game_Map_refresh','length','ListWindow_BgType','Key','AddPositionOption','failed','toUpperCase','createQuestTrackerWindow','addCategoryCommand','_commandWindow','_categoryFilter','isFailedQuestsEnabled','QuestQuote','isOkEnabled','isCurrentCategoryOpen','TrackerRefreshWindow','questObjectivesFailed','smoothSelect','scrollBlockHeight','mIzVF','GtUcM','<BR>','Tracker','Settings','nNzaR','ConvertParams','commandName','addGeneralOptions','onListCategory','CommandWindow_BgType','DLJiy','TrackerWindow_Rect','applyWordWrapEntry','cursorPagedown','loadTitle1','addQuestSystemquestTrackerPositionCommand','uyIMo','parse','openness','lnxuu','onDatabaseLoaded','Objective_Completed_Fmt','BRBuK','createQuestObjectives','FUNC','commandWindowRect','questTrackerPosOff','JSON','quest','wHigy','questRewardsClaimed','CommandWindow_Completed_Text','_questTrackerRefresh','questDescription','ListWindowCategoryOpenFmt','questLabelWindowRect','smoothScrollUp','rNtQC','TargetIDs','\x5cI[%1]%2','ConfigManager_makeData','_doodadEditorMode','ARRAYEVAL','Quotes','questLogWindowRect','isQuestCommandEnabled','questButtonAssistPageUpDn','_backSprite2','questCompletedIcon','MessageCore','Reward_Completed_Fmt','SystemEnableQuestMenu','_delayDraw','isKnownQuestsEnabled','initQuestSystem','EnableMainMenu','helpAreaHeight','questObjectiveFailedFmt','joinQuestEntries','lineHeight','commandStyleCheck','AddShowOption','rewardsDenied','Game_System_initialize','defaultQuestTrackerFmt','TrackerWindow_BgType','uiMenuStyle','iconWidth','Game_Party_gainItem','currentSymbol','questTrackerPosOn','questJournalSystemGainItem','OVTuU','isQuestTrackerVisible','registerCommand','VisuMZ_1_MessageCore','contents','scrollBlockWidth','scrollSpeed','floor','QuestOrder','setLabelWindow','BgFilename2','<WORDWRAP>%1','CommandWindow_Rect','commandNameWindowCenter','addWindow','left','icon','calculateTextHeight','createBackground','updateLabelWindow','CommandWindow_Known_Text','questLogFmt','bPBaD','setBackgroundOpacity','_scrollY','value','Enable','drawAllText','objectivesCompleted','ConfigManager_applyData','applyWordWrap','setQuestQuote','addQuestSystemquestTrackerShowCommand','objectivesFailed','centerSprite','getTotalCategoryQuests','isquestMenuEnabled','Game_Map_requestRefresh','iconHeight','createQuestText','Description','noQuestsListed','updateScrollBase','_listWindow','koXEJ','cancel','exit','ButtonAssistPageUpDown','FRXWj','round','isCommandEnabled','useItem','1oSXjbk','njpXp','setLogWindow','constructor','paint','rewardsClaimed','Scene_Menu_createCommandWindow','create','Game_Actor_tradeItemWithParty','right','addNoQuestsListedCommand','Window'];function _0x3e0f(_0x57e8c5,_0x222981){return _0x3e0f=function(_0x242b7a,_0x3e0ffc){_0x242b7a=_0x242b7a-0xf6;let _0xbf7ce6=_0x242b[_0x242b7a];return _0xbf7ce6;},_0x3e0f(_0x57e8c5,_0x222981);}const _0x21aa64=_0x3e0f;(function(_0x1c3f20,_0xb218d2){const _0x1af85d=_0x3e0f;while(!![]){try{const _0x535bef=-parseInt(_0x1af85d(0x161))*parseInt(_0x1af85d(0x1ac))+-parseInt(_0x1af85d(0x1fe))+-parseInt(_0x1af85d(0x1da))+parseInt(_0x1af85d(0x20b))+parseInt(_0x1af85d(0x26c))+parseInt(_0x1af85d(0x2c0))+-parseInt(_0x1af85d(0x1ab));if(_0x535bef===_0xb218d2)break;else _0x1c3f20['push'](_0x1c3f20['shift']());}catch(_0x56bf86){_0x1c3f20['push'](_0x1c3f20['shift']());}}}(_0x242b,0xd02ef));var label=_0x21aa64(0x29a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21aa64(0x2a2)](function(_0x2cc92a){const _0x211dc8=_0x21aa64;return _0x2cc92a['status']&&_0x2cc92a[_0x211dc8(0x1f6)][_0x211dc8(0x1c8)]('['+label+']');})[0x0];VisuMZ[label][_0x21aa64(0x2e2)]=VisuMZ[label][_0x21aa64(0x2e2)]||{},VisuMZ['ConvertParams']=function(_0x4b5054,_0x1d37ca){const _0x4225e1=_0x21aa64;for(const _0x10a608 in _0x1d37ca){if(_0x10a608[_0x4225e1(0x1c5)](/(.*):(.*)/i)){const _0x4995cb=String(RegExp['$1']),_0xd1ff0d=String(RegExp['$2'])[_0x4225e1(0x2d1)]()['trim']();let _0x5bac50,_0xc67d3,_0x3f609d;switch(_0xd1ff0d){case _0x4225e1(0x201):_0x5bac50=_0x1d37ca[_0x10a608]!==''?Number(_0x1d37ca[_0x10a608]):0x0;break;case _0x4225e1(0x1ae):_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON[_0x4225e1(0xf6)](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3['map'](_0x48ea8e=>Number(_0x48ea8e));break;case _0x4225e1(0x1c3):_0x5bac50=_0x1d37ca[_0x10a608]!==''?eval(_0x1d37ca[_0x10a608]):null;break;case _0x4225e1(0x10f):_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON[_0x4225e1(0xf6)](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3[_0x4225e1(0x1e5)](_0x1719a6=>eval(_0x1719a6));break;case _0x4225e1(0x100):_0x5bac50=_0x1d37ca[_0x10a608]!==''?JSON[_0x4225e1(0xf6)](_0x1d37ca[_0x10a608]):'';break;case _0x4225e1(0x23b):_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON['parse'](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3[_0x4225e1(0x1e5)](_0x33c3a4=>JSON['parse'](_0x33c3a4));break;case _0x4225e1(0xfd):_0x5bac50=_0x1d37ca[_0x10a608]!==''?new Function(JSON['parse'](_0x1d37ca[_0x10a608])):new Function(_0x4225e1(0x2c5));break;case'ARRAYFUNC':_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON[_0x4225e1(0xf6)](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3[_0x4225e1(0x1e5)](_0x539486=>new Function(JSON[_0x4225e1(0xf6)](_0x539486)));break;case'STR':_0x5bac50=_0x1d37ca[_0x10a608]!==''?String(_0x1d37ca[_0x10a608]):'';break;case'ARRAYSTR':_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON[_0x4225e1(0xf6)](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3[_0x4225e1(0x1e5)](_0x5cf3eb=>String(_0x5cf3eb));break;case _0x4225e1(0x20c):_0x3f609d=_0x1d37ca[_0x10a608]!==''?JSON['parse'](_0x1d37ca[_0x10a608]):{},_0x5bac50=VisuMZ[_0x4225e1(0x2e4)]({},_0x3f609d);break;case'ARRAYSTRUCT':_0xc67d3=_0x1d37ca[_0x10a608]!==''?JSON['parse'](_0x1d37ca[_0x10a608]):[],_0x5bac50=_0xc67d3[_0x4225e1(0x1e5)](_0x49e655=>VisuMZ[_0x4225e1(0x2e4)]({},JSON[_0x4225e1(0xf6)](_0x49e655)));break;default:continue;}_0x4b5054[_0x4995cb]=_0x5bac50;}}return _0x4b5054;},(_0x43673d=>{const _0x3fc4c9=_0x21aa64,_0x318462=_0x43673d[_0x3fc4c9(0x1d9)];for(const _0x543ae7 of dependencies){if(!Imported[_0x543ae7]){if(_0x3fc4c9(0x174)===_0x3fc4c9(0x174)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3fc4c9(0x1e0)](_0x318462,_0x543ae7)),SceneManager[_0x3fc4c9(0x15b)]();break;}else{this['_categoryStatus']={};for(const _0x5a38ff of _0x2e50b4[_0x3fc4c9(0x29a)][_0x3fc4c9(0x2e2)]['Categories']){this['_categoryStatus'][_0x5a38ff['CategoryName']]=!![];}this[_0x3fc4c9(0x2d5)]=_0x3fc4c9(0x17f);}}}const _0x4cae71=_0x43673d[_0x3fc4c9(0x1f6)];if(_0x4cae71[_0x3fc4c9(0x1c5)](/\[Version[ ](.*?)\]/i)){const _0x32d021=Number(RegExp['$1']);_0x32d021!==VisuMZ[label][_0x3fc4c9(0x255)]&&(alert(_0x3fc4c9(0x28a)[_0x3fc4c9(0x1e0)](_0x318462,_0x32d021)),SceneManager[_0x3fc4c9(0x15b)]());}if(_0x4cae71['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ec334=Number(RegExp['$1']);if(_0x3ec334<tier){if(_0x3fc4c9(0x1e6)===_0x3fc4c9(0x2e9)){_0x1635e0=_0x8535cc['toUpperCase']()[_0x3fc4c9(0x26e)]();const _0x22d1b1=_0x6ce1d5[_0x3fc4c9(0x101)](_0x4f02ea);if(!_0x22d1b1)return-0x1;_0x15dca2[_0x3fc4c9(0x229)](_0x24a778);const _0x4ef1d0=_0x2bef5f['questData']()[_0x3fc4c9(0x267)];return _0x4ef1d0[_0x6956b3]||0x0;}else alert(_0x3fc4c9(0x1be)[_0x3fc4c9(0x1e0)](_0x318462,_0x3ec334,tier)),SceneManager[_0x3fc4c9(0x15b)]();}else tier=Math['max'](_0x3ec334,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3fc4c9(0x2e2)],_0x43673d[_0x3fc4c9(0x24d)]);})(pluginData),PluginManager[_0x21aa64(0x12f)](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x1c4),_0x541eac=>{const _0x635c1d=_0x21aa64;VisuMZ[_0x635c1d(0x2e4)](_0x541eac,_0x541eac);const _0x43b384=_0x541eac[_0x635c1d(0x218)],_0x1bc55e=_0x541eac[_0x635c1d(0x27f)];for(const _0xa70231 of _0x43b384){$gameSystem['setQuestStatus'](_0xa70231,_0x1bc55e);}SceneManager[_0x635c1d(0x1bd)]()&&SceneManager[_0x635c1d(0x2c4)][_0x635c1d(0x170)]();}),PluginManager[_0x21aa64(0x12f)](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x1fa),_0x11350a=>{const _0x24b47f=_0x21aa64;VisuMZ[_0x24b47f(0x2e4)](_0x11350a,_0x11350a);const _0x4015b4=_0x11350a[_0x24b47f(0x218)],_0x4af226=_0x11350a[_0x24b47f(0x1dd)];for(const _0xa49613 of _0x4015b4){$gameSystem[_0x24b47f(0x1d2)](_0xa49613,_0x4af226);}SceneManager['isSceneMap']()&&SceneManager['_scene'][_0x24b47f(0x170)]();}),PluginManager['registerCommand'](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x268),_0x2594db=>{const _0xfafeb9=_0x21aa64;VisuMZ[_0xfafeb9(0x2e4)](_0x2594db,_0x2594db);const _0x1e6137=_0x2594db[_0xfafeb9(0x218)],_0x5f27f6=_0x2594db[_0xfafeb9(0x10b)],_0x3e9cdf=_0x2594db[_0xfafeb9(0x27f)];for(const _0x3a3214 of _0x1e6137){_0xfafeb9(0x2ba)!=='MHrfY'?$gameSystem[_0xfafeb9(0x2a9)](_0x3a3214,_0x5f27f6,_0x3e9cdf):this[_0xfafeb9(0x173)]=!![];}SceneManager[_0xfafeb9(0x1bd)]()&&SceneManager[_0xfafeb9(0x2c4)]['refreshQuestTrackerWindow']();}),PluginManager[_0x21aa64(0x12f)](pluginData['name'],_0x21aa64(0x2d7),_0x5b1c9f=>{const _0x4f4462=_0x21aa64;VisuMZ[_0x4f4462(0x2e4)](_0x5b1c9f,_0x5b1c9f);const _0x2da852=_0x5b1c9f[_0x4f4462(0x218)],_0x100c71=_0x5b1c9f[_0x4f4462(0x1dd)];for(const _0x386e2b of _0x2da852){$gameSystem[_0x4f4462(0x14c)](_0x386e2b,_0x100c71);}SceneManager[_0x4f4462(0x1bd)]()&&SceneManager[_0x4f4462(0x2c4)][_0x4f4462(0x170)]();}),PluginManager[_0x21aa64(0x12f)](pluginData['name'],_0x21aa64(0x19c),_0x11d19d=>{const _0x5dda77=_0x21aa64;VisuMZ[_0x5dda77(0x2e4)](_0x11d19d,_0x11d19d);const _0x348428=_0x11d19d[_0x5dda77(0x218)],_0x30d24e=_0x11d19d['TargetIDs'],_0x580ec6=_0x11d19d['Status'];for(const _0x11dc36 of _0x348428){if(_0x5dda77(0x159)==='koXEJ')$gameSystem[_0x5dda77(0x1a8)](_0x11dc36,_0x30d24e,_0x580ec6);else{const _0xe8329a=_0x23c49c[_0x5dda77(0x1c5)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0xe8329a)for(const _0x5823b2 of _0xe8329a){_0x5823b2[_0x5dda77(0x1c5)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x23efe2=_0x42a53a(_0x3c02f5['$1']),_0x1a88df=_0xd53e92(_0x3a2c30['$2'])*_0x112085,_0x48fa96=_0x2d67f4[_0x5dda77(0x146)](_0x23efe2);_0x231980['setValue'](_0x23efe2,_0x48fa96+_0x1a88df);}}}SceneManager['isSceneMap']()&&SceneManager['_scene'][_0x5dda77(0x170)]();}),PluginManager['registerCommand'](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x18f),_0x3526de=>{const _0x558b5c=_0x21aa64;VisuMZ[_0x558b5c(0x2e4)](_0x3526de,_0x3526de);const _0x35c842=_0x3526de['Keys'],_0x3cf0e0=_0x3526de[_0x558b5c(0x1dd)];for(const _0x31f747 of _0x35c842){$gameSystem['setQuestSubtext'](_0x31f747,_0x3cf0e0);}SceneManager[_0x558b5c(0x1bd)]()&&SceneManager[_0x558b5c(0x2c4)][_0x558b5c(0x170)]();}),PluginManager['registerCommand'](pluginData['name'],_0x21aa64(0x283),_0xa7ece5=>{const _0x428da5=_0x21aa64;VisuMZ[_0x428da5(0x2e4)](_0xa7ece5,_0xa7ece5);const _0x40acc5=_0xa7ece5[_0x428da5(0x2ce)];$gameSystem[_0x428da5(0x181)](_0x40acc5),SceneManager['isSceneMap']()&&('NrBMa'===_0x428da5(0x289)?SceneManager['_scene'][_0x428da5(0x170)]():_0x2f4677=_0x428da5(0x10c)[_0x428da5(0x1e0)](_0x1623c1,_0x29ad83));}),PluginManager['registerCommand'](pluginData['name'],_0x21aa64(0x2da),_0x56f598=>{const _0x52cc73=_0x21aa64;if(!SceneManager[_0x52cc73(0x1bd)]())return;SceneManager[_0x52cc73(0x2c4)]['refreshQuestTrackerWindow']();}),PluginManager['registerCommand'](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x211),_0x1ab7aa=>{const _0x1b3ff3=_0x21aa64;VisuMZ[_0x1b3ff3(0x2e4)](_0x1ab7aa,_0x1ab7aa),$gameSystem['setQuestTrackerVisible'](_0x1ab7aa[_0x1b3ff3(0x177)]),SceneManager[_0x1b3ff3(0x1bd)]()&&SceneManager[_0x1b3ff3(0x2c4)][_0x1b3ff3(0x170)]();}),PluginManager[_0x21aa64(0x12f)](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x2ad),_0xa03bcc=>{const _0x2aad07=_0x21aa64;if($gameParty['inBattle']())return;SceneManager[_0x2aad07(0x2a4)](Scene_Quest);}),PluginManager[_0x21aa64(0x12f)](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x118),_0x1a60e3=>{const _0xc4f02a=_0x21aa64;VisuMZ[_0xc4f02a(0x2e4)](_0x1a60e3,_0x1a60e3),$gameSystem[_0xc4f02a(0x1c2)]()[_0xc4f02a(0x2b0)]=_0x1a60e3[_0xc4f02a(0x147)];}),PluginManager[_0x21aa64(0x12f)](pluginData[_0x21aa64(0x1d9)],_0x21aa64(0x2a8),_0x56b6a9=>{const _0xbe7029=_0x21aa64;VisuMZ['ConvertParams'](_0x56b6a9,_0x56b6a9),$gameSystem[_0xbe7029(0x1c2)]()[_0xbe7029(0x29d)]=_0x56b6a9[_0xbe7029(0x177)];}),VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x1cb)]=Scene_Boot['prototype'][_0x21aa64(0xf9)],Scene_Boot[_0x21aa64(0x299)][_0x21aa64(0xf9)]=function(){const _0x4e4639=_0x21aa64;VisuMZ[_0x4e4639(0x29a)][_0x4e4639(0x1cb)][_0x4e4639(0x1bb)](this),this[_0x4e4639(0x292)]();},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x135)]=[],VisuMZ[_0x21aa64(0x29a)]['QuestData']={},Scene_Boot['prototype'][_0x21aa64(0x292)]=function(){const _0x400a20=_0x21aa64;for(const _0x425a9b of VisuMZ[_0x400a20(0x29a)][_0x400a20(0x2e2)][_0x400a20(0x197)]){if(_0x400a20(0x273)===_0x400a20(0x273)){if(!_0x425a9b)continue;for(const _0x5d3cf4 of _0x425a9b[_0x400a20(0x1ad)]){if(!_0x5d3cf4)continue;_0x5d3cf4[_0x400a20(0x234)]=_0x425a9b,_0x5d3cf4[_0x400a20(0x155)]['unshift'](''),_0x5d3cf4[_0x400a20(0x2ae)][_0x400a20(0x2a7)](''),_0x5d3cf4[_0x400a20(0x1fd)]['unshift'](''),_0x5d3cf4[_0x400a20(0x2b7)][_0x400a20(0x2a7)](''),_0x5d3cf4['Quotes']['unshift']('');const _0x227e6e=_0x5d3cf4[_0x400a20(0x2ce)][_0x400a20(0x2d1)]()[_0x400a20(0x26e)]();VisuMZ[_0x400a20(0x29a)][_0x400a20(0x135)][_0x400a20(0x2a4)](_0x227e6e),VisuMZ[_0x400a20(0x29a)]['QuestData'][_0x227e6e]=_0x5d3cf4;}}else _0x756aa2[_0x400a20(0x186)](_0x21fd2e,_0x2842bf);}},ConfigManager['questTrackerShow']=!![],ConfigManager[_0x21aa64(0x1f9)]=!![],VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x10d)]=ConfigManager[_0x21aa64(0x224)],ConfigManager[_0x21aa64(0x224)]=function(){const _0x375d24=_0x21aa64,_0x4c5b9b=VisuMZ[_0x375d24(0x29a)]['ConfigManager_makeData']['call'](this);return _0x4c5b9b[_0x375d24(0x173)]=this[_0x375d24(0x173)],_0x4c5b9b[_0x375d24(0x1f9)]=this[_0x375d24(0x1f9)],_0x4c5b9b;},VisuMZ[_0x21aa64(0x29a)]['ConfigManager_applyData']=ConfigManager[_0x21aa64(0x29e)],ConfigManager['applyData']=function(_0x2372da){const _0x4f56fb=_0x21aa64;VisuMZ['QuestSystem'][_0x4f56fb(0x14a)]['call'](this,_0x2372da),'questTrackerShow'in _0x2372da?_0x4f56fb(0x281)!==_0x4f56fb(0x281)?this[_0x4f56fb(0x109)](_0x1b1929[_0x4f56fb(0x133)]):this[_0x4f56fb(0x173)]=_0x2372da[_0x4f56fb(0x173)]:this[_0x4f56fb(0x173)]=!![],'questTrackerPosition'in _0x2372da?this[_0x4f56fb(0x1f9)]=_0x2372da[_0x4f56fb(0x1f9)]:this[_0x4f56fb(0x1f9)]=!![];},ImageManager[_0x21aa64(0x208)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['CommandWindow_Known_Icon'],ImageManager[_0x21aa64(0x115)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x2bc)],ImageManager[_0x21aa64(0x212)]=VisuMZ[_0x21aa64(0x29a)]['Settings']['General'][_0x21aa64(0x240)],TextManager[_0x21aa64(0x1ff)]=VisuMZ[_0x21aa64(0x29a)]['Settings'][_0x21aa64(0x269)][_0x21aa64(0x20e)],TextManager['questKnownCmd']=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x141)],TextManager[_0x21aa64(0x1b3)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)]['General'][_0x21aa64(0x104)],TextManager[_0x21aa64(0x2b2)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x24e)],TextManager['questCategoryOpenedFmt']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x107)],TextManager['questCategoryClosedFmt']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x25b)],TextManager[_0x21aa64(0x264)]=VisuMZ[_0x21aa64(0x29a)]['Settings'][_0x21aa64(0x254)]['EmptyTitleLabel'],TextManager['noQuestsListed']=VisuMZ[_0x21aa64(0x29a)]['Settings'][_0x21aa64(0x254)]['NoQuestListed'],TextManager[_0x21aa64(0x142)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x1f4)],TextManager[_0x21aa64(0x258)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['LogEmpty'],TextManager['questObjectiveNormalFmt']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['Objective_Normal_Fmt'],TextManager[_0x21aa64(0x1a6)]=VisuMZ[_0x21aa64(0x29a)]['Settings']['General'][_0x21aa64(0xfa)],TextManager[_0x21aa64(0x11e)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x1bc)],TextManager[_0x21aa64(0x2b8)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['Reward_Normal_Fmt'],TextManager[_0x21aa64(0x236)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)]['General'][_0x21aa64(0x117)],TextManager[_0x21aa64(0x298)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)]['General']['Reward_Failed_Fmt'],TextManager['questButtonAssistPageUpDn']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x15c)],TextManager[_0x21aa64(0x1a3)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x1a3)],TextManager['questButtonAssistExpand']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x254)][_0x21aa64(0x2a1)],TextManager[_0x21aa64(0x2a6)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['ButtonAssistCollapse'],TextManager[_0x21aa64(0x125)]=_0x21aa64(0x284),TextManager[_0x21aa64(0x1ed)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)]['Tracker'][_0x21aa64(0x216)]||TextManager[_0x21aa64(0x125)],TextManager['questTrackedQuestFmt']=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x254)]['ListWindowTrackedQuest'],TextManager['questTrackerShow']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x2e1)][_0x21aa64(0x25f)],TextManager[_0x21aa64(0x1f9)]=VisuMZ[_0x21aa64(0x29a)]['Settings'][_0x21aa64(0x2e1)]['PositionName'],TextManager['questTrackerPosOff']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x2e1)]['PositionOff'],TextManager[_0x21aa64(0x12b)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x2e1)][_0x21aa64(0x1bf)],SceneManager['isSceneMap']=function(){const _0x389157=_0x21aa64;return this['_scene']&&this[_0x389157(0x2c4)][_0x389157(0x164)]===Scene_Map;},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x124)]=Game_System[_0x21aa64(0x299)][_0x21aa64(0x191)],Game_System[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(){const _0xad0791=_0x21aa64;VisuMZ['QuestSystem'][_0xad0791(0x124)][_0xad0791(0x1bb)](this),this['initQuestSystem']();},Game_System['prototype'][_0x21aa64(0x11b)]=function(){const _0x472cb1=_0x21aa64,_0x4e12ca=VisuMZ[_0x472cb1(0x29a)]['Settings'][_0x472cb1(0x254)],_0x2d6fcf=VisuMZ[_0x472cb1(0x29a)][_0x472cb1(0x2e2)][_0x472cb1(0x269)];this['_quests']={'shown':_0x2d6fcf[_0x472cb1(0x228)],'enabled':_0x2d6fcf[_0x472cb1(0x11c)],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x4e12ca[_0x472cb1(0x28d)][_0x472cb1(0x2d1)]()[_0x472cb1(0x26e)](),'showTracker':!![]};for(const _0x513802 of _0x4e12ca['KnownQuests']){this[_0x472cb1(0x1b9)](_0x513802,_0x472cb1(0x17f));}for(const _0x4bf3c1 of _0x4e12ca[_0x472cb1(0x274)]){if(_0x472cb1(0x1c9)!==_0x472cb1(0x22a))this['setQuestStatus'](_0x4bf3c1,_0x472cb1(0x176));else{_0x29bad2=_0x44460a['toUpperCase']()[_0x472cb1(0x26e)]();const _0x5bb1fc=_0x3fe736[_0x472cb1(0x101)](_0x539328);if(!_0x5bb1fc)return-0x1;_0x2e109a[_0x472cb1(0x106)](_0x39d64a);const _0x3d6e76=_0x5b0082[_0x472cb1(0x1c2)]()[_0x472cb1(0x1f6)];return _0x3d6e76[_0x1f67ab]||0x0;}}for(const _0x4d2161 of _0x4e12ca[_0x472cb1(0x221)]){this[_0x472cb1(0x1b9)](_0x4d2161,_0x472cb1(0x2d0));}},Game_System[_0x21aa64(0x299)][_0x21aa64(0x101)]=function(_0x5a48c1){const _0x513168=_0x21aa64;return _0x5a48c1=_0x5a48c1[_0x513168(0x2d1)]()['trim'](),VisuMZ[_0x513168(0x29a)][_0x513168(0x1f3)][_0x5a48c1];},Game_System['prototype'][_0x21aa64(0x1c2)]=function(){const _0x426c67=_0x21aa64;if(this[_0x426c67(0x277)]===undefined)this['initQuestSystem']();return this[_0x426c67(0x277)];},Game_System[_0x21aa64(0x299)][_0x21aa64(0x2a5)]=function(){const _0x38a7aa=_0x21aa64;return this[_0x38a7aa(0x1c2)]()[_0x38a7aa(0x29d)];},Game_System[_0x21aa64(0x299)][_0x21aa64(0x151)]=function(){const _0x3cac92=_0x21aa64;return this[_0x3cac92(0x1c2)]()[_0x3cac92(0x2b0)];},Game_System[_0x21aa64(0x299)][_0x21aa64(0x1b9)]=function(_0x1a9099,_0x3d1ca7){const _0x26dd35=_0x21aa64;_0x1a9099=_0x1a9099[_0x26dd35(0x2d1)]()['trim']();if(!VisuMZ['QuestSystem']['QuestData'][_0x1a9099])return;const _0x4699ae=this[_0x26dd35(0x1c2)]();_0x4699ae[_0x26dd35(0x17f)]=_0x4699ae[_0x26dd35(0x17f)]||[],_0x4699ae['completed']=_0x4699ae[_0x26dd35(0x176)]||[],_0x4699ae['failed']=_0x4699ae[_0x26dd35(0x2d0)]||[],_0x4699ae['known'][_0x26dd35(0x2be)](_0x1a9099),_0x4699ae[_0x26dd35(0x176)][_0x26dd35(0x2be)](_0x1a9099),_0x4699ae[_0x26dd35(0x2d0)][_0x26dd35(0x2be)](_0x1a9099);if(_0x3d1ca7!==_0x26dd35(0x2be))_0x4699ae[_0x3d1ca7][_0x26dd35(0x2a4)](_0x1a9099);_0x1a9099===_0x4699ae[_0x26dd35(0x19f)][_0x26dd35(0x2d1)]()[_0x26dd35(0x26e)]()&&(_0x3d1ca7!==_0x26dd35(0x17f)&&this[_0x26dd35(0x181)](''));},Game_System[_0x21aa64(0x299)][_0x21aa64(0x270)]=function(){const _0x53c95f=_0x21aa64,_0x40294d=this[_0x53c95f(0x1c2)]();return _0x40294d[_0x53c95f(0x17f)]=_0x40294d[_0x53c95f(0x17f)]||[],_0x40294d[_0x53c95f(0x17f)]['map'](_0xdd735b=>this['quest'](_0xdd735b))[_0x53c95f(0x2be)](null);},Game_System['prototype'][_0x21aa64(0x2af)]=function(_0x40e790){const _0x1c44cc=_0x21aa64,_0x348a51=this['questData']();return _0x348a51['known']=_0x348a51['known']||[],_0x40e790=_0x40e790['toUpperCase']()[_0x1c44cc(0x26e)](),_0x348a51[_0x1c44cc(0x17f)][_0x1c44cc(0x1c8)](_0x40e790);},Game_System['prototype'][_0x21aa64(0x180)]=function(){const _0x404ab9=_0x21aa64,_0x54d8f8=this[_0x404ab9(0x1c2)]();return _0x54d8f8[_0x404ab9(0x176)]=_0x54d8f8[_0x404ab9(0x176)]||[],_0x54d8f8[_0x404ab9(0x176)][_0x404ab9(0x1e5)](_0xacc8fa=>this[_0x404ab9(0x101)](_0xacc8fa))[_0x404ab9(0x2be)](null);},Game_System['prototype']['isQuestCompleted']=function(_0x458e67){const _0x210096=_0x21aa64,_0x1aa6ac=this[_0x210096(0x1c2)]();return _0x1aa6ac['completed']=_0x1aa6ac['completed']||[],_0x458e67=_0x458e67[_0x210096(0x2d1)]()[_0x210096(0x26e)](),_0x1aa6ac[_0x210096(0x176)][_0x210096(0x1c8)](_0x458e67);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x1b0)]=function(){const _0x3d22ad=_0x21aa64,_0x2aaef0=this['questData']();return _0x2aaef0[_0x3d22ad(0x2d0)]=_0x2aaef0[_0x3d22ad(0x2d0)]||[],_0x2aaef0[_0x3d22ad(0x2d0)]['map'](_0x819621=>this[_0x3d22ad(0x101)](_0x819621))[_0x3d22ad(0x2be)](null);},Game_System['prototype']['isQuestFailed']=function(_0x51a62c){const _0x2f9ef7=_0x21aa64,_0x26c5a6=this['questData']();return _0x26c5a6['failed']=_0x26c5a6[_0x2f9ef7(0x2d0)]||[],_0x51a62c=_0x51a62c[_0x2f9ef7(0x2d1)]()[_0x2f9ef7(0x26e)](),_0x26c5a6[_0x2f9ef7(0x2d0)][_0x2f9ef7(0x1c8)](_0x51a62c);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x106)]=function(_0x22b62d){const _0x2568d6=_0x21aa64;_0x22b62d=_0x22b62d[_0x2568d6(0x2d1)]()[_0x2568d6(0x26e)]();const _0x28f574=this[_0x2568d6(0x101)](_0x22b62d);if(!_0x28f574)return'';const _0x3b1e0f=this[_0x2568d6(0x1c2)]()['description'];_0x3b1e0f[_0x22b62d]=_0x3b1e0f[_0x22b62d]||0x1;const _0x37510d=_0x3b1e0f[_0x22b62d];return _0x28f574[_0x2568d6(0x155)][_0x37510d]||'';},Game_System[_0x21aa64(0x299)][_0x21aa64(0x1d2)]=function(_0x3b19bf,_0x3be35b){const _0x473a91=_0x21aa64;_0x3b19bf=_0x3b19bf['toUpperCase']()[_0x473a91(0x26e)]();const _0x15be76=this[_0x473a91(0x101)](_0x3b19bf);if(!_0x15be76)return'';const _0x1a6701=this[_0x473a91(0x1c2)]()['description'];_0x1a6701[_0x3b19bf]=_0x3be35b;},Game_System[_0x21aa64(0x299)][_0x21aa64(0x2c9)]=function(_0x37e366){const _0x480419=_0x21aa64;_0x37e366=_0x37e366[_0x480419(0x2d1)]()[_0x480419(0x26e)]();const _0x4c696c=this[_0x480419(0x101)](_0x37e366);if(!_0x4c696c)return'';const _0x5c54ca=this[_0x480419(0x1c2)]();return _0x5c54ca[_0x480419(0x16e)]=_0x5c54ca[_0x480419(0x16e)]||{},!_0x5c54ca[_0x480419(0x16e)][_0x37e366]&&(_0x5c54ca['objectives'][_0x37e366]=JsonEx[_0x480419(0x29c)](_0x4c696c[_0x480419(0x18a)])),_0x5c54ca[_0x480419(0x16e)][_0x37e366][_0x480419(0x24a)]((_0x67f1e2,_0x530615)=>_0x67f1e2-_0x530615);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x2a9)]=function(_0x416341,_0x45bbb2,_0x2286fc){const _0x22a811=_0x21aa64;_0x416341=_0x416341['toUpperCase']()['trim']();const _0x39fded=this[_0x22a811(0x101)](_0x416341);if(!_0x39fded)return'';const _0x83e64d=this[_0x22a811(0x1c2)]();_0x83e64d[_0x22a811(0x16e)]=_0x83e64d[_0x22a811(0x16e)]||{};!_0x83e64d[_0x22a811(0x16e)][_0x416341]&&(_0x83e64d[_0x22a811(0x16e)][_0x416341]=JsonEx['makeDeepCopy'](_0x39fded['VisibleObjectives']));_0x83e64d[_0x22a811(0x16e)][_0x416341]=_0x83e64d[_0x22a811(0x16e)][_0x416341]||[],_0x83e64d['objectivesCompleted'][_0x416341]=_0x83e64d['objectivesCompleted'][_0x416341]||[],_0x83e64d[_0x22a811(0x14e)][_0x416341]=_0x83e64d[_0x22a811(0x14e)][_0x416341]||[];for(const _0x50a4dc of _0x45bbb2){_0x83e64d['objectives'][_0x416341][_0x22a811(0x2be)](_0x50a4dc),_0x83e64d[_0x22a811(0x149)][_0x416341][_0x22a811(0x2be)](_0x50a4dc),_0x83e64d[_0x22a811(0x14e)][_0x416341][_0x22a811(0x2be)](_0x50a4dc);switch(_0x2286fc){case _0x22a811(0x1a5):case _0x22a811(0x17f):_0x83e64d['objectives'][_0x416341][_0x22a811(0x2a4)](_0x50a4dc);break;case _0x22a811(0x296):case _0x22a811(0x176):_0x83e64d['objectivesCompleted'][_0x416341]['push'](_0x50a4dc);break;case _0x22a811(0x210):case'failed':_0x83e64d['objectivesFailed'][_0x416341]['push'](_0x50a4dc);break;case _0x22a811(0x2be):case _0x22a811(0x1d0):break;}}},Game_System['prototype']['questObjectivesCompleted']=function(_0x42f2e1){const _0xcbc0aa=_0x21aa64;_0x42f2e1=_0x42f2e1[_0xcbc0aa(0x2d1)]()['trim']();const _0x236c51=this[_0xcbc0aa(0x101)](_0x42f2e1);if(!_0x236c51)return'';const _0x3f1505=this[_0xcbc0aa(0x1c2)]();return _0x3f1505['objectivesCompleted']=_0x3f1505['objectivesCompleted']||{},_0x3f1505['objectivesCompleted'][_0x42f2e1]=_0x3f1505[_0xcbc0aa(0x149)][_0x42f2e1]||[],_0x3f1505[_0xcbc0aa(0x149)][_0x42f2e1][_0xcbc0aa(0x24a)]((_0x34a7b8,_0x1bc603)=>_0x34a7b8-_0x1bc603);},Game_System[_0x21aa64(0x299)]['questObjectivesFailed']=function(_0x2c2bb3){const _0x115e99=_0x21aa64;_0x2c2bb3=_0x2c2bb3[_0x115e99(0x2d1)]()[_0x115e99(0x26e)]();const _0x455a58=this[_0x115e99(0x101)](_0x2c2bb3);if(!_0x455a58)return'';const _0x5b58b9=this[_0x115e99(0x1c2)]();return _0x5b58b9[_0x115e99(0x14e)]=_0x5b58b9['objectivesFailed']||{},_0x5b58b9[_0x115e99(0x14e)][_0x2c2bb3]=_0x5b58b9[_0x115e99(0x14e)][_0x2c2bb3]||[],_0x5b58b9[_0x115e99(0x14e)][_0x2c2bb3][_0x115e99(0x24a)]((_0x293502,_0x12ed89)=>_0x293502-_0x12ed89);},Game_System[_0x21aa64(0x299)]['questRewards']=function(_0x1bd722){const _0x3840e0=_0x21aa64;_0x1bd722=_0x1bd722[_0x3840e0(0x2d1)]()['trim']();const _0x440be5=this[_0x3840e0(0x101)](_0x1bd722);if(!_0x440be5)return'';const _0x21486d=this[_0x3840e0(0x1c2)]();return _0x21486d[_0x3840e0(0x2b6)]=_0x21486d[_0x3840e0(0x2b6)]||{},!_0x21486d['rewards'][_0x1bd722]&&(_0x21486d['rewards'][_0x1bd722]=JsonEx[_0x3840e0(0x29c)](_0x440be5['VisibleRewards'])),_0x21486d['rewards'][_0x1bd722]['sort']((_0x1d50ac,_0x277efc)=>_0x1d50ac-_0x277efc);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x1a8)]=function(_0xb1ce2c,_0x53252b,_0x571f0f){const _0x4052a7=_0x21aa64;_0xb1ce2c=_0xb1ce2c['toUpperCase']()['trim']();const _0xfb6377=this['quest'](_0xb1ce2c);if(!_0xfb6377)return'';const _0x3674e5=this['questData']();_0x3674e5['rewards']=_0x3674e5[_0x4052a7(0x2b6)]||{};!_0x3674e5['rewards'][_0xb1ce2c]&&(_0x4052a7(0x2b3)!==_0x4052a7(0x2b3)?(_0x5d7a97[_0x4052a7(0x2c4)][_0x4052a7(0x170)](),this['_isRefreshingQuestTrackerWindow']=![]):_0x3674e5[_0x4052a7(0x2b6)][_0xb1ce2c]=JsonEx[_0x4052a7(0x29c)](_0xfb6377['VisibleRewards']));_0x3674e5['rewards'][_0xb1ce2c]=_0x3674e5[_0x4052a7(0x2b6)][_0xb1ce2c]||[],_0x3674e5[_0x4052a7(0x166)][_0xb1ce2c]=_0x3674e5[_0x4052a7(0x166)][_0xb1ce2c]||[],_0x3674e5[_0x4052a7(0x123)][_0xb1ce2c]=_0x3674e5[_0x4052a7(0x123)][_0xb1ce2c]||[];for(const _0xe08d9f of _0x53252b){if(_0x4052a7(0x27c)===_0x4052a7(0x2ac))_0x387a7d['_scene'][_0x4052a7(0x170)]();else{_0x3674e5[_0x4052a7(0x2b6)][_0xb1ce2c]['remove'](_0xe08d9f),_0x3674e5['rewardsClaimed'][_0xb1ce2c][_0x4052a7(0x2be)](_0xe08d9f),_0x3674e5[_0x4052a7(0x123)][_0xb1ce2c][_0x4052a7(0x2be)](_0xe08d9f);switch(_0x571f0f){case _0x4052a7(0x1a5):case _0x4052a7(0x17f):_0x3674e5[_0x4052a7(0x2b6)][_0xb1ce2c]['push'](_0xe08d9f);break;case'claim':case _0x4052a7(0x1af):_0x3674e5[_0x4052a7(0x166)][_0xb1ce2c][_0x4052a7(0x2a4)](_0xe08d9f);break;case _0x4052a7(0x1cc):case _0x4052a7(0x213):_0x3674e5[_0x4052a7(0x123)][_0xb1ce2c][_0x4052a7(0x2a4)](_0xe08d9f);break;case _0x4052a7(0x2be):case _0x4052a7(0x1d0):break;}}}},Game_System[_0x21aa64(0x299)][_0x21aa64(0x103)]=function(_0x43ade7){const _0x14106c=_0x21aa64;_0x43ade7=_0x43ade7[_0x14106c(0x2d1)]()[_0x14106c(0x26e)]();const _0x35772f=this['quest'](_0x43ade7);if(!_0x35772f)return'';const _0x517186=this[_0x14106c(0x1c2)]();return _0x517186[_0x14106c(0x166)]=_0x517186[_0x14106c(0x166)]||{},_0x517186[_0x14106c(0x166)][_0x43ade7]=_0x517186['rewardsClaimed'][_0x43ade7]||[],_0x517186[_0x14106c(0x166)][_0x43ade7][_0x14106c(0x24a)]((_0x29ce42,_0x2926cb)=>_0x29ce42-_0x2926cb);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x297)]=function(_0x279a1f){const _0x3ea034=_0x21aa64;_0x279a1f=_0x279a1f[_0x3ea034(0x2d1)]()[_0x3ea034(0x26e)]();const _0x427f10=this[_0x3ea034(0x101)](_0x279a1f);if(!_0x427f10)return'';const _0xcfd669=this[_0x3ea034(0x1c2)]();return _0xcfd669[_0x3ea034(0x123)]=_0xcfd669[_0x3ea034(0x123)]||{},_0xcfd669[_0x3ea034(0x123)][_0x279a1f]=_0xcfd669['rewardsDenied'][_0x279a1f]||[],_0xcfd669[_0x3ea034(0x123)][_0x279a1f][_0x3ea034(0x24a)]((_0x14c850,_0x1c74e0)=>_0x14c850-_0x1c74e0);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x229)]=function(_0x50e175){const _0x1feb7e=_0x21aa64;_0x50e175=_0x50e175[_0x1feb7e(0x2d1)]()['trim']();const _0x59aff1=this['quest'](_0x50e175);if(!_0x59aff1)return'';const _0x40779e=this[_0x1feb7e(0x1c2)]()[_0x1feb7e(0x267)];_0x40779e[_0x50e175]=_0x40779e[_0x50e175]||0x1;const _0x12d7df=_0x40779e[_0x50e175];return _0x59aff1[_0x1feb7e(0x2b7)][_0x12d7df]||'';},Game_System[_0x21aa64(0x299)][_0x21aa64(0x186)]=function(_0x51fcf0,_0x5dbdae){const _0x1e31c6=_0x21aa64;_0x51fcf0=_0x51fcf0[_0x1e31c6(0x2d1)]()[_0x1e31c6(0x26e)]();const _0x17c030=this[_0x1e31c6(0x101)](_0x51fcf0);if(!_0x17c030)return'';const _0x578856=this[_0x1e31c6(0x1c2)]()[_0x1e31c6(0x267)];_0x578856[_0x51fcf0]=_0x5dbdae;},Game_System[_0x21aa64(0x299)][_0x21aa64(0x20a)]=function(_0x418c1b){const _0x5e31a1=_0x21aa64;_0x418c1b=_0x418c1b[_0x5e31a1(0x2d1)]()[_0x5e31a1(0x26e)]();const _0x411878=this[_0x5e31a1(0x101)](_0x418c1b);if(!_0x411878)return'';const _0x1d706e=this['questData']()[_0x5e31a1(0x1ec)];_0x1d706e[_0x418c1b]=_0x1d706e[_0x418c1b]||0x1;const _0x135f9e=_0x1d706e[_0x418c1b];return _0x411878[_0x5e31a1(0x110)][_0x135f9e]||'';},Game_System[_0x21aa64(0x299)][_0x21aa64(0x14c)]=function(_0x449ab3,_0x4b22dc){const _0x1e73c5=_0x21aa64;_0x449ab3=_0x449ab3[_0x1e73c5(0x2d1)]()[_0x1e73c5(0x26e)]();const _0x4620f7=this[_0x1e73c5(0x101)](_0x449ab3);if(!_0x4620f7)return'';const _0x33667d=this[_0x1e73c5(0x1c2)]()['quotes'];_0x33667d[_0x449ab3]=_0x4b22dc;},Game_System['prototype'][_0x21aa64(0x202)]=function(){const _0x15f8fe=_0x21aa64,_0x248082=this[_0x15f8fe(0x1c2)]();return this['quest'](_0x248082[_0x15f8fe(0x19f)]);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x181)]=function(_0x7c687f,_0x28b2fa){const _0x4718dc=_0x21aa64,_0x1eac10=this[_0x4718dc(0x1c2)]();if(_0x28b2fa&&_0x1eac10['tracked']===_0x7c687f)_0x7c687f='';_0x1eac10[_0x4718dc(0x19f)]=_0x7c687f,SceneManager[_0x4718dc(0x1bd)]()&&SceneManager['_scene'][_0x4718dc(0x23c)](_0x7c687f);},Game_System[_0x21aa64(0x299)][_0x21aa64(0x12e)]=function(){const _0x328ca8=_0x21aa64,_0x4c9c69=this['questData']();return _0x4c9c69[_0x328ca8(0x1b2)];},Game_System[_0x21aa64(0x299)][_0x21aa64(0x261)]=function(_0x56f17f){const _0x202fa9=_0x21aa64,_0x174979=this[_0x202fa9(0x1c2)]();_0x174979['showTracker']=_0x56f17f;},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x17a)]=Game_BattlerBase[_0x21aa64(0x299)]['addNewState'],Game_BattlerBase['prototype'][_0x21aa64(0x25a)]=function(_0x2832a3){const _0x2c8c60=_0x21aa64,_0x186000=this[_0x2c8c60(0x18c)]();VisuMZ[_0x2c8c60(0x29a)]['Game_BattlerBase_addNewState']['call'](this,_0x2832a3),this[_0x2c8c60(0x25e)](_0x2832a3,_0x186000);},Game_BattlerBase[_0x21aa64(0x299)]['questJournalSystemAddDeath']=function(_0x26a32c,_0x2b35a6){const _0x222277=_0x21aa64;if(_0x26a32c!==this[_0x222277(0x279)]())return;if(!this[_0x222277(0x248)]())return;if(!_0x2b35a6)return;if(!this['isDead']())return;if(this[_0x222277(0x24c)])return;this[_0x222277(0x24c)]=!![];const _0x527d0b=this[_0x222277(0x26f)]()[_0x222277(0x2b1)],_0x4400dc=_0x527d0b[_0x222277(0x1c5)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x4400dc){if(_0x222277(0x220)==='usESO')_0x3a42ff[_0x222277(0x2a4)](_0x2c6653);else for(const _0x2eecc6 of _0x4400dc){if(_0x222277(0xf8)!==_0x222277(0xf8)){_0x394818=_0x476665[_0x222277(0x2d1)]()['trim']();const _0x3f1cf1=this[_0x222277(0x101)](_0xbc54d6);if(!_0x3f1cf1)return'';const _0x1d2216=this[_0x222277(0x1c2)]()[_0x222277(0x1ec)];_0x1d2216[_0x51a86d]=_0x1d2216[_0x24ec26]||0x1;const _0x1b33d7=_0x1d2216[_0x57425a];return _0x3f1cf1[_0x222277(0x110)][_0x1b33d7]||'';}else{_0x2eecc6['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x3c12ef=Number(RegExp['$1']),_0x49fd7d=Number(RegExp['$2']),_0x5e6965=$gameVariables[_0x222277(0x146)](_0x3c12ef);$gameVariables[_0x222277(0x233)](_0x3c12ef,_0x5e6965+_0x49fd7d);}}}},VisuMZ['QuestSystem'][_0x21aa64(0x194)]=Game_Battler[_0x21aa64(0x299)][_0x21aa64(0x160)],Game_Battler[_0x21aa64(0x299)][_0x21aa64(0x160)]=function(_0x177c7d){const _0x94e4b0=_0x21aa64;VisuMZ[_0x94e4b0(0x29a)][_0x94e4b0(0x194)][_0x94e4b0(0x1bb)](this,_0x177c7d),this['questJournalSystemUseItem'](_0x177c7d);},Game_Battler[_0x21aa64(0x299)][_0x21aa64(0x1b7)]=function(_0x47df46){const _0x19cc6a=_0x21aa64;if(!_0x47df46)return;if(!this[_0x19cc6a(0x20d)]())return;const _0x59b835=_0x47df46[_0x19cc6a(0x2b1)],_0x4cc927=_0x59b835[_0x19cc6a(0x1c5)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x4cc927)for(const _0x1b7f0d of _0x4cc927){_0x1b7f0d[_0x19cc6a(0x1c5)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x228cd0=Number(RegExp['$1']),_0x16987f=Number(RegExp['$2']),_0xde03=$gameVariables[_0x19cc6a(0x146)](_0x228cd0);$gameVariables[_0x19cc6a(0x233)](_0x228cd0,_0xde03+_0x16987f);}},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x169)]=Game_Actor[_0x21aa64(0x299)][_0x21aa64(0x293)],Game_Actor[_0x21aa64(0x299)][_0x21aa64(0x293)]=function(_0x55984c,_0x3cbf6b){const _0x5648d5=_0x21aa64;$gameTemp[_0x5648d5(0x2c3)]=!![];const _0xd686dd=VisuMZ[_0x5648d5(0x29a)][_0x5648d5(0x169)][_0x5648d5(0x1bb)](this,_0x55984c,_0x3cbf6b);return $gameTemp[_0x5648d5(0x2c3)]=undefined,_0xd686dd;},VisuMZ['QuestSystem']['Game_Party_gainItem']=Game_Party[_0x21aa64(0x299)][_0x21aa64(0x231)],Game_Party[_0x21aa64(0x299)][_0x21aa64(0x231)]=function(_0x39848b,_0x7328d3,_0x3824f9){const _0x379354=_0x21aa64;VisuMZ[_0x379354(0x29a)][_0x379354(0x129)]['call'](this,_0x39848b,_0x7328d3,_0x3824f9),this['questJournalSystemGainItem'](_0x39848b,_0x7328d3);},Game_Party['prototype'][_0x21aa64(0x12c)]=function(_0x119a4b,_0x71a8dc){const _0x5b47b3=_0x21aa64;if(!_0x119a4b)return;if($gameTemp[_0x5b47b3(0x2c3)])return;const _0x254cf4=_0x119a4b[_0x5b47b3(0x2b1)];if(_0x71a8dc>0x0){if(_0x5b47b3(0x1a4)===_0x5b47b3(0x12d)){const _0x16ddd7=this[_0x5b47b3(0x1e9)](),_0xd35ff2=this[_0x5b47b3(0x19b)];_0xd35ff2[_0x5b47b3(0x131)]['clear']();const _0x579932=_0x16ddd7?_0x16ddd7[_0x5b47b3(0x214)]:_0x12ea70[_0x5b47b3(0x264)],_0x43a6dd=_0xd35ff2[_0x5b47b3(0x256)](_0x579932)[_0x5b47b3(0x285)],_0x29be05=_0xd35ff2[_0x5b47b3(0x2bb)]()+_0x55ba61[_0x5b47b3(0x15e)]((_0xd35ff2[_0x5b47b3(0x246)]-_0x43a6dd)/0x2);_0xd35ff2[_0x5b47b3(0x2a0)](_0x579932,_0x29be05,0x0,_0xd35ff2['innerWidth']);}else{const _0x1a6851=_0x254cf4[_0x5b47b3(0x1c5)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x1a6851)for(const _0x4e08b6 of _0x1a6851){_0x4e08b6[_0x5b47b3(0x1c5)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x52f0fa=Number(RegExp['$1']),_0xa87cb0=Number(RegExp['$2'])*_0x71a8dc,_0x47e581=$gameVariables[_0x5b47b3(0x146)](_0x52f0fa);$gameVariables['setValue'](_0x52f0fa,_0x47e581+_0xa87cb0);}}}else{if(_0x71a8dc<0x0){if(_0x5b47b3(0x1e2)===_0x5b47b3(0x250)){if(!this[_0x5b47b3(0x262)])return;this[_0x5b47b3(0x262)][_0x5b47b3(0x1b5)]();}else{const _0x4f63da=_0x254cf4[_0x5b47b3(0x1c5)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x4f63da)for(const _0x3300f9 of _0x4f63da){_0x3300f9[_0x5b47b3(0x1c5)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x579136=Number(RegExp['$1']),_0x4e8db3=Number(RegExp['$2'])*_0x71a8dc,_0x3802ab=$gameVariables[_0x5b47b3(0x146)](_0x579136);$gameVariables[_0x5b47b3(0x233)](_0x579136,_0x3802ab+_0x4e8db3);}}}}const _0xb7fda0=_0x254cf4[_0x5b47b3(0x1c5)](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0xb7fda0){if(_0x5b47b3(0x19a)===_0x5b47b3(0x10a)){this[_0x5b47b3(0x2e5)](_0x357eb6)[_0x5b47b3(0x1c5)](/\\I\[(\d+)\]/i);const _0x2c7ae0=_0x35ab62(_0x165d1e['$1'])||0x0,_0x2c0ac0=this[_0x5b47b3(0x282)](_0x551b3c),_0x561c95=_0x2c0ac0['x']+_0x46a900[_0x5b47b3(0x134)]((_0x2c0ac0[_0x5b47b3(0x285)]-_0x4a6d11[_0x5b47b3(0x128)])/0x2),_0x112be7=_0x2c0ac0['y']+(_0x2c0ac0[_0x5b47b3(0x27a)]-_0x11f349[_0x5b47b3(0x153)])/0x2;this[_0x5b47b3(0x1f0)](_0x2c7ae0,_0x561c95,_0x112be7);}else for(const _0x12d824 of _0xb7fda0){_0x12d824[_0x5b47b3(0x1c5)](/<TRACK WITH VARIABLE (\d+)>/i);const _0x5b64d4=Number(RegExp['$1']),_0x3a05ca=$gameParty[_0x5b47b3(0x1e8)](_0x119a4b);$gameVariables['setValue'](_0x5b64d4,_0x3a05ca);}}},VisuMZ['QuestSystem']['Game_Map_requestRefresh']=Game_Map[_0x21aa64(0x299)][_0x21aa64(0x26b)],Game_Map[_0x21aa64(0x299)][_0x21aa64(0x26b)]=function(){const _0x452c62=_0x21aa64;VisuMZ['QuestSystem'][_0x452c62(0x152)][_0x452c62(0x1bb)](this),SceneManager[_0x452c62(0x1bd)]()&&!this['_isRefreshingQuestTrackerWindow']&&(this[_0x452c62(0x2ab)]=!![]);},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2cb)]=Game_Map[_0x21aa64(0x299)][_0x21aa64(0x1b5)],Game_Map['prototype']['refresh']=function(){const _0x274dd7=_0x21aa64;VisuMZ[_0x274dd7(0x29a)][_0x274dd7(0x2cb)][_0x274dd7(0x1bb)](this),SceneManager[_0x274dd7(0x1bd)]()&&this['_isRefreshingQuestTrackerWindow']&&(SceneManager[_0x274dd7(0x2c4)][_0x274dd7(0x170)](),this[_0x274dd7(0x2ab)]=![]);},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x257)]=Scene_Map[_0x21aa64(0x299)][_0x21aa64(0x238)],Scene_Map['prototype'][_0x21aa64(0x238)]=function(){const _0x106d32=_0x21aa64;VisuMZ[_0x106d32(0x29a)][_0x106d32(0x257)][_0x106d32(0x1bb)](this),this['createQuestTrackerWindow']();},Scene_Map[_0x21aa64(0x299)][_0x21aa64(0x2d2)]=function(){const _0x50fb62=_0x21aa64;if(!SceneManager[_0x50fb62(0x1bd)]())return;const _0x671768=this[_0x50fb62(0x17d)](),_0x390a05=new Window_QuestTracker(_0x671768);this['addChild'](_0x390a05),this[_0x50fb62(0x262)]=_0x390a05;},Scene_Map[_0x21aa64(0x299)][_0x21aa64(0x288)]=function(){const _0x3a51ce=_0x21aa64;return ConfigManager[_0x3a51ce(0x1f9)];},Scene_Map[_0x21aa64(0x299)][_0x21aa64(0x17d)]=function(){const _0x897167=_0x21aa64;return VisuMZ[_0x897167(0x29a)]['Settings']['Window'][_0x897167(0x2ea)][_0x897167(0x1bb)](this);},Scene_Map[_0x21aa64(0x299)]['refreshQuestTrackerWindow']=function(){const _0x2a55ff=_0x21aa64;if(!this[_0x2a55ff(0x262)])return;this[_0x2a55ff(0x262)][_0x2a55ff(0x1b5)]();},Scene_Map[_0x21aa64(0x299)]['setQuestForQuestTrackerWindow']=function(_0x42a76e){const _0x47d79c=_0x21aa64;if(!this['_questTrackerWindow'])return;_0x42a76e=_0x42a76e['toUpperCase']()['trim']();const _0x9d57e4=$gameSystem[_0x47d79c(0x101)](_0x42a76e);this['_questTrackerWindow']['setQuest'](_0x9d57e4);},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x167)]=Scene_Menu[_0x21aa64(0x299)][_0x21aa64(0x1a0)],Scene_Menu[_0x21aa64(0x299)]['createCommandWindow']=function(){const _0x2ee80c=_0x21aa64;VisuMZ[_0x2ee80c(0x29a)][_0x2ee80c(0x167)][_0x2ee80c(0x1bb)](this),this[_0x2ee80c(0x2d4)][_0x2ee80c(0x1d8)]('quest',this[_0x2ee80c(0x242)][_0x2ee80c(0x1c0)](this));},Scene_Menu[_0x21aa64(0x299)]['commandQuest']=function(){const _0x35d023=_0x21aa64;SceneManager[_0x35d023(0x2a4)](Scene_Quest);},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x232)]=Scene_Options[_0x21aa64(0x299)][_0x21aa64(0x203)],Scene_Options[_0x21aa64(0x299)]['maxCommands']=function(){const _0x1b7558=_0x21aa64;let _0x51c683=VisuMZ['QuestSystem'][_0x1b7558(0x232)][_0x1b7558(0x1bb)](this);if(VisuMZ[_0x1b7558(0x29a)]['Settings']['Tracker'][_0x1b7558(0x241)]){if(VisuMZ[_0x1b7558(0x29a)][_0x1b7558(0x2e2)][_0x1b7558(0x2e1)][_0x1b7558(0x122)])_0x51c683++;if(VisuMZ['QuestSystem'][_0x1b7558(0x2e2)][_0x1b7558(0x2e1)][_0x1b7558(0x2cf)])_0x51c683++;}return _0x51c683;};function Scene_Quest(){const _0x472193=_0x21aa64;this[_0x472193(0x191)](...arguments);}Scene_Quest[_0x21aa64(0x299)]=Object[_0x21aa64(0x168)](Scene_MenuBase[_0x21aa64(0x299)]),Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x164)]=Scene_Quest,Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(){const _0x538ae3=_0x21aa64;Scene_MenuBase['prototype'][_0x538ae3(0x191)][_0x538ae3(0x1bb)](this);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x11d)]=function(){return 0x0;},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x1eb)]=function(){const _0x529f42=_0x21aa64;if(ConfigManager[_0x529f42(0x127)]&&ConfigManager[_0x529f42(0x226)]!==undefined){if(_0x529f42(0x287)!==_0x529f42(0x287)){_0x45c808=_0x4df0b6['toUpperCase']()['trim']();const _0x20bf6c=_0x3ce303[_0x529f42(0x101)](_0x16be50);if(!_0x20bf6c)return![];_0x63208a['questObjectives'](_0xe24a72);const _0x381694=_0x17fe54[_0x529f42(0x1c2)]()[_0x529f42(0x14e)];if(!_0x381694[_0x576364])return![];return _0x381694[_0x300b70][_0x529f42(0x1c8)](_0x32107b);}else return ConfigManager[_0x529f42(0x226)];}else return ConfigManager[_0x529f42(0x127)]===![]?![]:Scene_MenuBase[_0x529f42(0x299)][_0x529f42(0x1eb)][_0x529f42(0x1bb)](this);},Scene_Quest['prototype'][_0x21aa64(0x172)]=function(){const _0x243f70=_0x21aa64;return(Graphics[_0x243f70(0x223)]-0x230)[_0x243f70(0x295)](0xf0,Math['floor'](Graphics[_0x243f70(0x223)]/0x2));},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x168)]=function(){const _0x2e7d64=_0x21aa64;Scene_MenuBase[_0x2e7d64(0x299)][_0x2e7d64(0x168)][_0x2e7d64(0x1bb)](this),this[_0x2e7d64(0x1a0)](),this[_0x2e7d64(0x195)](),this[_0x2e7d64(0x1d6)](),this[_0x2e7d64(0x1d1)]();},Scene_Quest[_0x21aa64(0x299)]['createCommandWindow']=function(){const _0x42c1f3=_0x21aa64,_0x598382=this[_0x42c1f3(0xfe)](),_0x419e5a=new Window_QuestCommand(_0x598382);_0x419e5a[_0x42c1f3(0x1d8)](_0x42c1f3(0x17f),this['onCommandOk'][_0x42c1f3(0x1c0)](this)),_0x419e5a['setHandler'](_0x42c1f3(0x176),this[_0x42c1f3(0x1d3)]['bind'](this)),_0x419e5a['setHandler'](_0x42c1f3(0x2d0),this[_0x42c1f3(0x1d3)][_0x42c1f3(0x1c0)](this)),_0x419e5a[_0x42c1f3(0x1d8)](_0x42c1f3(0x15a),this['popScene'][_0x42c1f3(0x1c0)](this)),this[_0x42c1f3(0x13b)](_0x419e5a),this[_0x42c1f3(0x2d4)]=_0x419e5a,_0x419e5a[_0x42c1f3(0x1c1)](VisuMZ['QuestSystem']['Settings'][_0x42c1f3(0x16c)][_0x42c1f3(0x2e8)]);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0xfe)]=function(){const _0x1e6c62=_0x21aa64;return VisuMZ[_0x1e6c62(0x29a)][_0x1e6c62(0x2e2)][_0x1e6c62(0x16c)][_0x1e6c62(0x139)][_0x1e6c62(0x1bb)](this);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x195)]=function(){const _0x594386=_0x21aa64,_0x5db10c=this['questLabelWindowRect'](),_0x1e06eb=new Window_Base(_0x5db10c);this[_0x594386(0x13b)](_0x1e06eb),this[_0x594386(0x19b)]=_0x1e06eb,_0x1e06eb[_0x594386(0x1c1)](VisuMZ[_0x594386(0x29a)][_0x594386(0x2e2)][_0x594386(0x16c)][_0x594386(0x235)]);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x108)]=function(){const _0x4951f4=_0x21aa64;return VisuMZ['QuestSystem']['Settings'][_0x4951f4(0x16c)][_0x4951f4(0x275)][_0x4951f4(0x1bb)](this);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x1d6)]=function(){const _0x1d6f05=_0x21aa64,_0x1bb6b6=this[_0x1d6f05(0x111)](),_0x1f4154=new Window_QuestLog(_0x1bb6b6);this[_0x1d6f05(0x13b)](_0x1f4154),this['_logWindow']=_0x1f4154,_0x1f4154[_0x1d6f05(0x1c1)](VisuMZ[_0x1d6f05(0x29a)][_0x1d6f05(0x2e2)][_0x1d6f05(0x16c)][_0x1d6f05(0x190)]);},Scene_Quest['prototype']['questLogWindowRect']=function(){const _0x4cd8c4=_0x21aa64;return VisuMZ['QuestSystem'][_0x4cd8c4(0x2e2)][_0x4cd8c4(0x16c)][_0x4cd8c4(0x2c1)]['call'](this);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x1d1)]=function(){const _0x57edbe=_0x21aa64,_0xc9185b=this[_0x57edbe(0x252)](),_0x4872f1=new Window_QuestList(_0xc9185b);_0x4872f1[_0x57edbe(0x1d8)](_0x57edbe(0x234),this[_0x57edbe(0x2e7)][_0x57edbe(0x1c0)](this)),_0x4872f1['setHandler'](_0x57edbe(0x101),this['onListQuest'][_0x57edbe(0x1c0)](this)),_0x4872f1[_0x57edbe(0x1d8)](_0x57edbe(0x15a),this['onListCancel'][_0x57edbe(0x1c0)](this)),this['addWindow'](_0x4872f1),this[_0x57edbe(0x158)]=_0x4872f1,_0x4872f1[_0x57edbe(0x1c1)](VisuMZ[_0x57edbe(0x29a)][_0x57edbe(0x2e2)][_0x57edbe(0x16c)][_0x57edbe(0x2cd)]),this['_commandWindow'][_0x57edbe(0x244)](this[_0x57edbe(0x158)]),this[_0x57edbe(0x158)][_0x57edbe(0x136)](this[_0x57edbe(0x19b)]),this[_0x57edbe(0x158)][_0x57edbe(0x163)](this['_logWindow']);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x252)]=function(){const _0x5017d8=_0x21aa64;return VisuMZ[_0x5017d8(0x29a)]['Settings']['Window'][_0x5017d8(0x259)][_0x5017d8(0x1bb)](this);},Scene_Quest[_0x21aa64(0x299)]['onCommandOk']=function(){const _0x597023=_0x21aa64;this[_0x597023(0x158)]['activate'](),this[_0x597023(0x158)][_0x597023(0x2dc)](0x0);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x2e7)]=function(){const _0xe404f6=_0x21aa64;this[_0xe404f6(0x158)][_0xe404f6(0x21e)](),this[_0xe404f6(0x158)][_0xe404f6(0x1d7)]();},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x222)]=function(){const _0x5dbefd=_0x21aa64,_0x313d28=this['_listWindow']['currentQuest'](),_0x54f78a=_0x313d28['Key'][_0x5dbefd(0x2d1)]()[_0x5dbefd(0x26e)]();$gameSystem[_0x5dbefd(0x181)](_0x54f78a,!![]),this[_0x5dbefd(0x158)][_0x5dbefd(0x1b5)](),this['_listWindow']['activate']();},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x207)]=function(){const _0x5b9c02=_0x21aa64;this[_0x5b9c02(0x158)][_0x5b9c02(0x217)](),this['_commandWindow']['activate']();},Scene_Quest['prototype'][_0x21aa64(0x17b)]=function(){const _0x38e9f8=_0x21aa64;return TextManager[_0x38e9f8(0x113)];},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x247)]=function(){const _0x58457f=_0x21aa64;if(this['_listWindow']&&this[_0x58457f(0x158)][_0x58457f(0x22f)]){if(this[_0x58457f(0x158)]['currentQuest']())return this[_0x58457f(0x158)][_0x58457f(0x2d8)]()?TextManager[_0x58457f(0x1a3)]:'';else return this[_0x58457f(0x158)][_0x58457f(0x2d9)]()?TextManager['questButtonAssistCollapse']:TextManager['questButtonAssistExpand'];}return Scene_MenuBase[_0x58457f(0x299)][_0x58457f(0x247)][_0x58457f(0x1bb)](this);},Scene_Quest[_0x21aa64(0x299)][_0x21aa64(0x13f)]=function(){const _0x2c9bcf=_0x21aa64;Scene_MenuBase[_0x2c9bcf(0x299)][_0x2c9bcf(0x13f)]['call'](this),this[_0x2c9bcf(0x144)](this[_0x2c9bcf(0x204)]()),this['createCustomBackgroundImages']();},Scene_Quest['prototype']['getBackgroundOpacity']=function(){const _0x3b48f6=_0x21aa64;return VisuMZ[_0x3b48f6(0x29a)][_0x3b48f6(0x2e2)][_0x3b48f6(0x1f2)][_0x3b48f6(0x23f)];},Scene_Quest[_0x21aa64(0x299)]['createCustomBackgroundImages']=function(){const _0x5716e3=_0x21aa64,_0x480b0e={'BgFilename1':VisuMZ[_0x5716e3(0x29a)][_0x5716e3(0x2e2)][_0x5716e3(0x1f2)][_0x5716e3(0x200)],'BgFilename2':VisuMZ[_0x5716e3(0x29a)][_0x5716e3(0x2e2)][_0x5716e3(0x1f2)]['BgFilename2']};_0x480b0e&&(_0x480b0e['BgFilename1']!==''||_0x480b0e[_0x5716e3(0x137)]!=='')&&(this[_0x5716e3(0x263)]=new Sprite(ImageManager[_0x5716e3(0x2ed)](_0x480b0e[_0x5716e3(0x200)])),this[_0x5716e3(0x114)]=new Sprite(ImageManager['loadTitle2'](_0x480b0e[_0x5716e3(0x137)])),this['addChild'](this[_0x5716e3(0x263)]),this[_0x5716e3(0x278)](this[_0x5716e3(0x114)]),this[_0x5716e3(0x263)][_0x5716e3(0x1d5)]['addLoadListener'](this['adjustSprite']['bind'](this,this[_0x5716e3(0x263)])),this['_backSprite2'][_0x5716e3(0x1d5)][_0x5716e3(0x175)](this[_0x5716e3(0x28e)][_0x5716e3(0x1c0)](this,this[_0x5716e3(0x114)])));},Scene_Quest['prototype'][_0x21aa64(0x28e)]=function(_0x366421){const _0x4052f1=_0x21aa64;this[_0x4052f1(0x237)](_0x366421),this[_0x4052f1(0x14f)](_0x366421);},VisuMZ[_0x21aa64(0x29a)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x21aa64(0x299)][_0x21aa64(0x1de)],Window_MenuCommand[_0x21aa64(0x299)]['addOriginalCommands']=function(){const _0x2d1b56=_0x21aa64;VisuMZ[_0x2d1b56(0x29a)][_0x2d1b56(0x2b4)][_0x2d1b56(0x1bb)](this),this[_0x2d1b56(0x23e)]();},Window_MenuCommand[_0x21aa64(0x299)]['addQuestCommand']=function(){const _0x42c78c=_0x21aa64;if(!this[_0x42c78c(0x23d)]())return;if(!this['isQuestCommandVisible']())return;const _0x35cbb1=TextManager['questCommandName'],_0x4cf4a1=this[_0x42c78c(0x112)]();this[_0x42c78c(0x184)](_0x35cbb1,_0x42c78c(0x101),_0x4cf4a1);},Window_MenuCommand['prototype'][_0x21aa64(0x23d)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x21aa64(0x299)]['isQuestCommandVisible']=function(){const _0x3dc207=_0x21aa64;return $gameSystem[_0x3dc207(0x2a5)]();},Window_MenuCommand['prototype']['isQuestCommandEnabled']=function(){const _0x172f69=_0x21aa64;return $gameSystem[_0x172f69(0x151)]();},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x1e7)]=Window_Options[_0x21aa64(0x299)][_0x21aa64(0x2e6)],Window_Options['prototype'][_0x21aa64(0x2e6)]=function(){const _0x7b4f23=_0x21aa64;VisuMZ['QuestSystem'][_0x7b4f23(0x1e7)][_0x7b4f23(0x1bb)](this),this[_0x7b4f23(0x249)]();},Window_Options[_0x21aa64(0x299)]['addQuestSystemCommands']=function(){const _0x5b94f7=_0x21aa64;VisuMZ[_0x5b94f7(0x29a)]['Settings']['Tracker'][_0x5b94f7(0x122)]&&this[_0x5b94f7(0x14d)](),VisuMZ['QuestSystem'][_0x5b94f7(0x2e2)][_0x5b94f7(0x2e1)]['AddPositionOption']&&this[_0x5b94f7(0x2ee)]();},Window_Options['prototype'][_0x21aa64(0x14d)]=function(){const _0x5f2d56=_0x21aa64,_0x1b7a6e=TextManager[_0x5f2d56(0x173)],_0x124db7='questTrackerShow';this[_0x5f2d56(0x184)](_0x1b7a6e,_0x124db7);},Window_Options['prototype'][_0x21aa64(0x2ee)]=function(){const _0x24630f=_0x21aa64,_0x32e6ff=TextManager[_0x24630f(0x1f9)],_0x14ee76=_0x24630f(0x1f9);this[_0x24630f(0x184)](_0x32e6ff,_0x14ee76);},VisuMZ[_0x21aa64(0x29a)]['Window_Options_statusText']=Window_Options[_0x21aa64(0x299)][_0x21aa64(0x205)],Window_Options[_0x21aa64(0x299)]['statusText']=function(_0x4d3227){const _0x41e6e4=_0x21aa64,_0x4d2773=this[_0x41e6e4(0x2b5)](_0x4d3227);if(_0x4d2773===_0x41e6e4(0x1f9)){if(_0x41e6e4(0x239)!=='gYAaZ'){const _0x5e915a=this[_0x41e6e4(0x219)](_0x4d2773);return _0x5e915a?TextManager[_0x41e6e4(0x12b)]:TextManager[_0x41e6e4(0xff)];}else return this[_0x41e6e4(0x158)][_0x41e6e4(0x2d8)]()?_0x533e12[_0x41e6e4(0x1a3)]:'';}return VisuMZ[_0x41e6e4(0x29a)]['Window_Options_statusText'][_0x41e6e4(0x1bb)](this,_0x4d3227);};function Window_QuestCommand(){this['initialize'](...arguments);}Window_QuestCommand['prototype']=Object['create'](Window_Command[_0x21aa64(0x299)]),Window_QuestCommand['prototype'][_0x21aa64(0x164)]=Window_QuestCommand,Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(_0x35896a){const _0x363e4b=_0x21aa64;Window_Command[_0x363e4b(0x299)][_0x363e4b(0x191)][_0x363e4b(0x1bb)](this,_0x35896a),this[_0x363e4b(0x199)](_0x35896a);},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x199)]=function(_0x280c92){const _0x4a768f=_0x21aa64,_0x5658d7=new Rectangle(0x0,0x0,_0x280c92['width'],_0x280c92[_0x4a768f(0x27a)]);this[_0x4a768f(0x225)]=new Window_Base(_0x5658d7),this[_0x4a768f(0x225)][_0x4a768f(0x2bd)]=0x0,this[_0x4a768f(0x278)](this[_0x4a768f(0x225)]),this[_0x4a768f(0x21c)]();},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x2b9)]=function(){const _0x31363d=_0x21aa64;Window_Command[_0x31363d(0x299)][_0x31363d(0x2b9)][_0x31363d(0x1bb)](this);if(this[_0x31363d(0x225)])this['updateCommandNameWindow']();if(this[_0x31363d(0x158)])this[_0x31363d(0x158)][_0x31363d(0x1f5)](this[_0x31363d(0x12a)]());},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x21c)]=function(){const _0x281347=_0x21aa64,_0x2b9621=this[_0x281347(0x225)];_0x2b9621[_0x281347(0x131)]['clear']();const _0x506e1f=this[_0x281347(0x121)](this[_0x281347(0x1c6)]());if(_0x506e1f===_0x281347(0x13d)){if(_0x281347(0x1ba)!==_0x281347(0x1ba)){const _0x4f8f8a=this[_0x281347(0x282)](this[_0x281347(0x1c6)]());let _0x25396e=this[_0x281347(0x2e5)](this[_0x281347(0x1c6)]());_0x25396e=_0x25396e[_0x281347(0x1ee)](/\\I\[(\d+)\]/gi,''),_0x1c9c47['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x25396e,_0x4f8f8a),this['commandNameWindowDrawText'](_0x25396e,_0x4f8f8a),this[_0x281347(0x13a)](_0x25396e,_0x4f8f8a);}else{const _0xbac1f6=this[_0x281347(0x282)](this[_0x281347(0x1c6)]());let _0x11029d=this[_0x281347(0x2e5)](this[_0x281347(0x1c6)]());_0x11029d=_0x11029d[_0x281347(0x1ee)](/\\I\[(\d+)\]/gi,''),_0x2b9621['resetFontSettings'](),this[_0x281347(0x2ca)](_0x11029d,_0xbac1f6),this[_0x281347(0x18d)](_0x11029d,_0xbac1f6),this[_0x281347(0x13a)](_0x11029d,_0xbac1f6);}}},Window_QuestCommand['prototype']['commandNameWindowDrawBackground']=function(_0x5a7176,_0x2b5489){},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x18d)]=function(_0x48a139,_0x1f09fb){const _0x795a7e=_0x21aa64,_0x4140d6=this[_0x795a7e(0x225)];_0x4140d6['drawText'](_0x48a139,0x0,_0x1f09fb['y'],_0x4140d6[_0x795a7e(0x246)],_0x795a7e(0x21f));},Window_QuestCommand[_0x21aa64(0x299)]['commandNameWindowCenter']=function(_0x1880f5,_0x47fd5d){const _0x31a4d2=_0x21aa64,_0x313cd3=this[_0x31a4d2(0x225)],_0x461e80=$gameSystem[_0x31a4d2(0x1f7)](),_0x6a5852=_0x47fd5d['x']+Math[_0x31a4d2(0x134)](_0x47fd5d[_0x31a4d2(0x285)]/0x2)+_0x461e80;_0x313cd3['x']=_0x313cd3[_0x31a4d2(0x285)]/-0x2+_0x6a5852,_0x313cd3['y']=Math[_0x31a4d2(0x134)](_0x47fd5d[_0x31a4d2(0x27a)]/0x2);},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x1a1)]=function(){const _0x3edea1=_0x21aa64;this[_0x3edea1(0x193)](),this[_0x3edea1(0x206)](),this['addFailedQuestsCommand']();},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x193)]=function(){const _0x12b368=_0x21aa64,_0x36fcc3='known',_0x21dc9b=ImageManager[_0x12b368(0x208)];let _0x236055=TextManager[_0x12b368(0x1b1)];_0x21dc9b>0x0&&this[_0x12b368(0x24b)]()!==_0x12b368(0x1a9)&&(_0x12b368(0x2de)!==_0x12b368(0x2de)?this[_0x12b368(0x1f9)]=_0x58daec[_0x12b368(0x1f9)]:_0x236055='\x5cI[%1]%2'[_0x12b368(0x1e0)](_0x21dc9b,_0x236055));const _0x138ec9=this['isKnownQuestsEnabled']();this['addCommand'](_0x236055,_0x36fcc3,_0x138ec9);},Window_QuestCommand[_0x21aa64(0x299)]['isKnownQuestsEnabled']=function(){const _0x5688b4=_0x21aa64;return $gameSystem[_0x5688b4(0x270)]()[_0x5688b4(0x2cc)]>0x0;},Window_QuestCommand['prototype'][_0x21aa64(0x206)]=function(){const _0x31f4c7=_0x21aa64,_0x509299=_0x31f4c7(0x176),_0x4040b7=ImageManager[_0x31f4c7(0x115)];let _0x3ac46d=TextManager[_0x31f4c7(0x1b3)];if(_0x4040b7>0x0&&this[_0x31f4c7(0x24b)]()!==_0x31f4c7(0x1a9)){if(_0x31f4c7(0x27e)===_0x31f4c7(0x143)){const _0x5b6abd=this[_0x31f4c7(0x1c2)]();return _0x5b6abd[_0x31f4c7(0x17f)]=_0x5b6abd[_0x31f4c7(0x17f)]||[],_0x5b6abd[_0x31f4c7(0x17f)]['map'](_0x87f685=>this[_0x31f4c7(0x101)](_0x87f685))[_0x31f4c7(0x2be)](null);}else _0x3ac46d='\x5cI[%1]%2'[_0x31f4c7(0x1e0)](_0x4040b7,_0x3ac46d);}const _0x378ebf=this[_0x31f4c7(0x26a)]();this[_0x31f4c7(0x184)](_0x3ac46d,_0x509299,_0x378ebf);},Window_QuestCommand[_0x21aa64(0x299)]['isCompletedQuestsEnabled']=function(){const _0x3a1c10=_0x21aa64;return $gameSystem[_0x3a1c10(0x180)]()[_0x3a1c10(0x2cc)]>0x0;},Window_QuestCommand[_0x21aa64(0x299)]['addFailedQuestsCommand']=function(){const _0xa2b2f9=_0x21aa64;if(!this[_0xa2b2f9(0x230)]())return;const _0x8a66c8='failed',_0xfa0ad6=ImageManager[_0xa2b2f9(0x212)];let _0x484144=TextManager[_0xa2b2f9(0x2b2)];_0xfa0ad6>0x0&&this['commandStyle']()!==_0xa2b2f9(0x1a9)&&(_0x484144=_0xa2b2f9(0x10c)[_0xa2b2f9(0x1e0)](_0xfa0ad6,_0x484144));const _0x42a2b1=this[_0xa2b2f9(0x2d6)]();this['addCommand'](_0x484144,_0x8a66c8,_0x42a2b1);},Window_QuestCommand[_0x21aa64(0x299)]['isFailedQuestsVisible']=function(){const _0x551758=_0x21aa64;return VisuMZ[_0x551758(0x29a)][_0x551758(0x2e2)][_0x551758(0x16c)]['ShowFailed'];},Window_QuestCommand[_0x21aa64(0x299)]['isFailedQuestsEnabled']=function(){const _0x40eaff=_0x21aa64;return $gameSystem['questsFailed']()[_0x40eaff(0x2cc)]>0x0;},Window_QuestCommand[_0x21aa64(0x299)]['totalCommands']=function(){const _0x2feb59=_0x21aa64;return this[_0x2feb59(0x230)]()?0x3:0x2;},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x1b6)]=function(){const _0x68e07f=_0x21aa64;return VisuMZ[_0x68e07f(0x29a)][_0x68e07f(0x2e2)][_0x68e07f(0x16c)][_0x68e07f(0x18b)];},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x209)]=function(_0x2d17a9){const _0x24c619=_0x21aa64,_0x12dad7=this['commandStyleCheck'](_0x2d17a9);if(_0x12dad7===_0x24c619(0x2a3))this[_0x24c619(0x17c)](_0x2d17a9);else{if(_0x12dad7===_0x24c619(0x13d))this[_0x24c619(0x22c)](_0x2d17a9);else{if(_0x24c619(0x2c6)===_0x24c619(0x276))return _0x16a122()+_0x2db485()+_0x46254d();else Window_HorzCommand['prototype'][_0x24c619(0x209)]['call'](this,_0x2d17a9);}}},Window_QuestCommand[_0x21aa64(0x299)]['commandStyle']=function(){const _0x3da809=_0x21aa64;return VisuMZ['QuestSystem'][_0x3da809(0x2e2)]['Window'][_0x3da809(0x1fb)];},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x121)]=function(_0x1aced3){const _0x13866c=_0x21aa64;if(_0x1aced3<0x0)return _0x13866c(0x1a9);const _0x40e48d=this['commandStyle']();if(_0x40e48d!=='auto')return _0x40e48d;else{if(this[_0x13866c(0x294)]()>0x0){const _0x1759a3=this[_0x13866c(0x2e5)](_0x1aced3);if(_0x1759a3[_0x13866c(0x1c5)](/\\I\[(\d+)\]/i)){if(_0x13866c(0x1e3)==='CCCRT'){const _0x19af5b=_0x13866c(0x17f),_0x54f7d8=_0x13a1b6[_0x13866c(0x208)];let _0x22ce61=_0x14fbec['questKnownCmd'];_0x54f7d8>0x0&&this[_0x13866c(0x24b)]()!==_0x13866c(0x1a9)&&(_0x22ce61=_0x13866c(0x10c)['format'](_0x54f7d8,_0x22ce61));const _0x6702c7=this[_0x13866c(0x11a)]();this[_0x13866c(0x184)](_0x22ce61,_0x19af5b,_0x6702c7);}else{const _0x1d880d=this[_0x13866c(0x282)](_0x1aced3),_0x439336=this['textSizeEx'](_0x1759a3)[_0x13866c(0x285)];return _0x439336<=_0x1d880d[_0x13866c(0x285)]?_0x13866c(0x2a3):_0x13866c(0x13d);}}}}return _0x13866c(0x1a9);},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x17c)]=function(_0x1da771){const _0x5c7f90=_0x21aa64,_0x1804ea=this['itemLineRect'](_0x1da771),_0x33d861=this[_0x5c7f90(0x2e5)](_0x1da771),_0x4ae99d=this[_0x5c7f90(0x256)](_0x33d861)[_0x5c7f90(0x285)];this[_0x5c7f90(0x260)](this[_0x5c7f90(0x15f)](_0x1da771));const _0x58c72e=this[_0x5c7f90(0x1b6)]();if(_0x58c72e===_0x5c7f90(0x16a))this[_0x5c7f90(0x2a0)](_0x33d861,_0x1804ea['x']+_0x1804ea[_0x5c7f90(0x285)]-_0x4ae99d,_0x1804ea['y'],_0x4ae99d);else{if(_0x58c72e===_0x5c7f90(0x21f)){if(_0x5c7f90(0x2e3)!==_0x5c7f90(0x26d)){const _0xf642e4=_0x1804ea['x']+Math[_0x5c7f90(0x134)]((_0x1804ea[_0x5c7f90(0x285)]-_0x4ae99d)/0x2);this['drawTextEx'](_0x33d861,_0xf642e4,_0x1804ea['y'],_0x4ae99d);}else this[_0x5c7f90(0x1b9)](_0x1daa5a,'failed');}else this['drawTextEx'](_0x33d861,_0x1804ea['x'],_0x1804ea['y'],_0x4ae99d);}},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x22c)]=function(_0x4e6624){const _0x3a84d0=_0x21aa64;this[_0x3a84d0(0x2e5)](_0x4e6624)[_0x3a84d0(0x1c5)](/\\I\[(\d+)\]/i);const _0x5d6da6=Number(RegExp['$1'])||0x0,_0x3323c6=this[_0x3a84d0(0x282)](_0x4e6624),_0x2c566e=_0x3323c6['x']+Math[_0x3a84d0(0x134)]((_0x3323c6[_0x3a84d0(0x285)]-ImageManager[_0x3a84d0(0x128)])/0x2),_0x1efde4=_0x3323c6['y']+(_0x3323c6[_0x3a84d0(0x27a)]-ImageManager[_0x3a84d0(0x153)])/0x2;this[_0x3a84d0(0x1f0)](_0x5d6da6,_0x2c566e,_0x1efde4);},Window_QuestCommand[_0x21aa64(0x299)][_0x21aa64(0x244)]=function(_0x595967){const _0x1642ae=_0x21aa64;this['_listWindow']=_0x595967,this[_0x1642ae(0x2b9)]();};function Window_QuestList(){const _0x5fa949=_0x21aa64;this[_0x5fa949(0x191)](...arguments);}Window_QuestList[_0x21aa64(0x21b)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)][_0x21aa64(0x197)],Window_QuestList['prototype']=Object[_0x21aa64(0x168)](Window_Command[_0x21aa64(0x299)]),Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x164)]=Window_QuestList,Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(_0x32a8df){const _0x8f4c71=_0x21aa64;this['initCategories'](),Window_Command[_0x8f4c71(0x299)][_0x8f4c71(0x191)][_0x8f4c71(0x1bb)](this,_0x32a8df),this['createCommandNameWindow'](_0x32a8df),this['deactivate'](),this[_0x8f4c71(0x217)]();},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2c2)]=function(){const _0x1bb0aa=_0x21aa64;this['_categoryStatus']={};for(const _0x80431b of VisuMZ['QuestSystem'][_0x1bb0aa(0x2e2)][_0x1bb0aa(0x197)]){this[_0x1bb0aa(0x2c7)][_0x80431b[_0x1bb0aa(0x1e1)]]=!![];}this[_0x1bb0aa(0x2d5)]=_0x1bb0aa(0x17f);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x1f5)]=function(_0x14c25a){const _0x10d924=_0x21aa64;if(this[_0x10d924(0x2d5)]===_0x14c25a)return;this['_categoryFilter']=_0x14c25a,this['refresh']();},Window_QuestList['prototype'][_0x21aa64(0x21e)]=function(){const _0x48f367=_0x21aa64,_0x38200d=this[_0x48f367(0x188)]();this[_0x48f367(0x2c7)][_0x38200d[_0x48f367(0x1e1)]]=!this['_categoryStatus'][_0x38200d[_0x48f367(0x1e1)]],this['refresh'](),this[_0x48f367(0x2b9)]();},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2d9)]=function(){const _0x11b08a=_0x21aa64,_0x51a66a=this[_0x11b08a(0x188)]();return _0x51a66a&&this[_0x11b08a(0x2c7)][_0x51a66a[_0x11b08a(0x1e1)]];},Window_QuestList[_0x21aa64(0x299)]['createCommandNameWindow']=function(_0x420fd0){const _0x1e2d7a=_0x21aa64,_0x1cf9eb=new Rectangle(0x0,0x0,_0x420fd0['width'],_0x420fd0[_0x1e2d7a(0x27a)]);this[_0x1e2d7a(0x225)]=new Window_Base(_0x1cf9eb),this['_commandNameWindow'][_0x1e2d7a(0x2bd)]=0x0,this['addChild'](this[_0x1e2d7a(0x225)]),this[_0x1e2d7a(0x21c)]();},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2b9)]=function(){const _0x83ff4=_0x21aa64;Window_Command['prototype'][_0x83ff4(0x2b9)][_0x83ff4(0x1bb)](this);if(this[_0x83ff4(0x225)])this[_0x83ff4(0x21c)]();if(this[_0x83ff4(0x19b)])this[_0x83ff4(0x140)]();if(this['_logWindow'])this[_0x83ff4(0x272)]();},Window_QuestList['prototype'][_0x21aa64(0x21c)]=function(){const _0xcca7b6=_0x21aa64,_0x2fffdc=this['_commandNameWindow'];_0x2fffdc[_0xcca7b6(0x131)][_0xcca7b6(0x189)]();const _0x4d74c1=this['commandStyleCheck'](this[_0xcca7b6(0x1c6)]());if(_0x4d74c1===_0xcca7b6(0x13d)){const _0x5a99a6=this[_0xcca7b6(0x282)](this[_0xcca7b6(0x1c6)]());let _0x54cfc1=this['commandName'](this[_0xcca7b6(0x1c6)]());_0x54cfc1=_0x54cfc1['replace'](/\\I\[(\d+)\]/gi,''),_0x2fffdc[_0xcca7b6(0x1dc)](),this['commandNameWindowDrawBackground'](_0x54cfc1,_0x5a99a6),this[_0xcca7b6(0x18d)](_0x54cfc1,_0x5a99a6),this[_0xcca7b6(0x13a)](_0x54cfc1,_0x5a99a6);}},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2ca)]=function(_0x188088,_0x271d8b){},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x18d)]=function(_0x54d9e8,_0x16b766){const _0x3b368b=_0x21aa64,_0x2bbc34=this[_0x3b368b(0x225)];_0x2bbc34['drawText'](_0x54d9e8,0x0,_0x16b766['y'],_0x2bbc34[_0x3b368b(0x246)],'center');},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x13a)]=function(_0x48ee27,_0x1df569){const _0x1dde93=_0x21aa64,_0x1b37f5=this[_0x1dde93(0x225)],_0x1ef0d7=$gameSystem[_0x1dde93(0x1f7)](),_0x5c9d00=_0x1df569['x']+Math[_0x1dde93(0x134)](_0x1df569[_0x1dde93(0x285)]/0x2)+_0x1ef0d7;_0x1b37f5['x']=_0x1b37f5['width']/-0x2+_0x5c9d00,_0x1b37f5['y']=Math[_0x1dde93(0x134)](_0x1df569[_0x1dde93(0x27a)]/0x2);},Window_QuestList['prototype'][_0x21aa64(0x1a1)]=function(){const _0x25cdc0=_0x21aa64;for(const _0x42a292 of Window_QuestList[_0x25cdc0(0x21b)]){if(_0x25cdc0(0x2df)!==_0x25cdc0(0x271)){if(!_0x42a292)continue;if(!this[_0x25cdc0(0x1aa)](_0x42a292))continue;this['addCategoryCommand'](_0x42a292),this[_0x25cdc0(0x22e)](_0x42a292);}else _0x2cea58['QuestSystem'][_0x25cdc0(0x152)][_0x25cdc0(0x1bb)](this),_0x475818['isSceneMap']()&&!this['_isRefreshingQuestTrackerWindow']&&(this[_0x25cdc0(0x2ab)]=!![]);}this['_list'][_0x25cdc0(0x2cc)]<=0x0&&(_0x25cdc0(0x16f)===_0x25cdc0(0x16f)?this[_0x25cdc0(0x16b)]():_0x5585fb[_0x25cdc0(0x2b6)][_0x60b04a]=_0x121b0d['makeDeepCopy'](_0x387865[_0x25cdc0(0x1cf)]));},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x16b)]=function(){const _0x28780e=_0x21aa64;this['addCommand'](TextManager[_0x28780e(0x156)],_0x28780e(0x15a),![]);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x1aa)]=function(_0x209ccd){const _0xf7c693=_0x21aa64;for(const _0x1095eb of _0x209ccd[_0xf7c693(0x1ad)]){if(!_0x1095eb)continue;switch(this[_0xf7c693(0x2d5)]){case _0xf7c693(0x17f):if($gameSystem['isQuestKnown'](_0x1095eb[_0xf7c693(0x2ce)]))return!![];break;case'completed':if($gameSystem[_0xf7c693(0x185)](_0x1095eb[_0xf7c693(0x2ce)]))return!![];break;case _0xf7c693(0x2d0):if($gameSystem[_0xf7c693(0x1c7)](_0x1095eb[_0xf7c693(0x2ce)]))return!![];break;}}return![];},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2d3)]=function(_0x3a1ce7){const _0x1a3f9c=_0x21aa64,_0x34e923=this[_0x1a3f9c(0x29b)](_0x3a1ce7)?TextManager['questCategoryOpenedFmt']:TextManager[_0x1a3f9c(0x24f)],_0x12e84b=this[_0x1a3f9c(0x150)](_0x3a1ce7)[_0x1a3f9c(0x2cc)],_0x3aef48=_0x34e923[_0x1a3f9c(0x1e0)](_0x3a1ce7[_0x1a3f9c(0x1e1)],_0x12e84b);this[_0x1a3f9c(0x184)](_0x3aef48,_0x1a3f9c(0x234),!![],_0x3a1ce7);},Window_QuestList['prototype'][_0x21aa64(0x150)]=function(_0x7f0ee4){const _0x1a98e6=_0x21aa64;switch(this['_categoryFilter']){case _0x1a98e6(0x17f):return $gameSystem[_0x1a98e6(0x270)]()[_0x1a98e6(0x2a2)](_0x26ec8a=>_0x26ec8a['category']===_0x7f0ee4);break;case _0x1a98e6(0x176):return $gameSystem[_0x1a98e6(0x180)]()[_0x1a98e6(0x2a2)](_0x499d36=>_0x499d36[_0x1a98e6(0x234)]===_0x7f0ee4);break;case _0x1a98e6(0x2d0):return $gameSystem[_0x1a98e6(0x1b0)]()[_0x1a98e6(0x2a2)](_0x4b5c8d=>_0x4b5c8d[_0x1a98e6(0x234)]===_0x7f0ee4);break;}return[];},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x22e)]=function(_0x4d40d8){const _0x5d03f0=_0x21aa64;if(!this[_0x5d03f0(0x29b)](_0x4d40d8))return;for(const _0x4f8859 of _0x4d40d8[_0x5d03f0(0x1ad)]){if('qaJjn'===_0x5d03f0(0x266)){if(!_0x4f8859)continue;switch(this[_0x5d03f0(0x2d5)]){case _0x5d03f0(0x17f):if($gameSystem[_0x5d03f0(0x2af)](_0x4f8859[_0x5d03f0(0x2ce)]))this[_0x5d03f0(0x23e)](_0x4f8859);break;case _0x5d03f0(0x176):if($gameSystem['isQuestCompleted'](_0x4f8859['Key']))this[_0x5d03f0(0x23e)](_0x4f8859);break;case _0x5d03f0(0x2d0):if($gameSystem[_0x5d03f0(0x1c7)](_0x4f8859[_0x5d03f0(0x2ce)]))this[_0x5d03f0(0x23e)](_0x4f8859);break;}}else this[_0x5d03f0(0x2c2)](),_0x59170b[_0x5d03f0(0x299)][_0x5d03f0(0x191)][_0x5d03f0(0x1bb)](this,_0x2c63e5),this[_0x5d03f0(0x199)](_0x53dd10),this[_0x5d03f0(0x196)](),this[_0x5d03f0(0x217)]();}},Window_QuestList['prototype'][_0x21aa64(0x29b)]=function(_0x2b8fc1){const _0x10c6c5=_0x21aa64;return this[_0x10c6c5(0x2c7)][_0x2b8fc1[_0x10c6c5(0x1e1)]];},Window_QuestList['prototype'][_0x21aa64(0x23e)]=function(_0x4aeade){const _0x21f64c=_0x21aa64;let _0x1116aa=_0x4aeade['Title'];_0x4aeade===$gameSystem[_0x21f64c(0x202)]()&&(_0x1116aa=TextManager[_0x21f64c(0x265)][_0x21f64c(0x1e0)](_0x1116aa)),this[_0x21f64c(0x184)](_0x1116aa,_0x21f64c(0x101),!![],_0x4aeade);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x1b6)]=function(){const _0x40bdb9=_0x21aa64;return _0x40bdb9(0x13c);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x209)]=function(_0x204493){const _0x50c282=_0x21aa64,_0x485232=this['commandStyleCheck'](_0x204493);if(_0x485232===_0x50c282(0x2a3))this['drawItemStyleIconText'](_0x204493);else _0x485232===_0x50c282(0x13d)?this[_0x50c282(0x22c)](_0x204493):Window_HorzCommand['prototype'][_0x50c282(0x209)][_0x50c282(0x1bb)](this,_0x204493);},Window_QuestList['prototype']['commandStyle']=function(){const _0x5c4bbe=_0x21aa64;return _0x5c4bbe(0x2a3);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x121)]=function(_0x45d30c){const _0x599b07=_0x21aa64;if(_0x45d30c<0x0)return _0x599b07(0x1a9);const _0x1bcc0e=this[_0x599b07(0x24b)]();if(_0x1bcc0e!==_0x599b07(0x183)){if(_0x599b07(0x162)!=='njpXp')_0x361f34['isPressed'](_0x599b07(0x1b4))&&this[_0x599b07(0x1ce)](_0x16fa75[_0x599b07(0x133)]),_0x2e57e8['isPressed'](_0x599b07(0x22d))&&this['smoothScrollUp'](_0x44f66b[_0x599b07(0x133)]);else return _0x1bcc0e;}else{if(this[_0x599b07(0x294)]()>0x0){if('Bfywg'!=='Bfywg')return _0x75b799[_0x599b07(0x1b0)]()[_0x599b07(0x2cc)]>0x0;else{const _0x41393a=this[_0x599b07(0x2e5)](_0x45d30c);if(_0x41393a[_0x599b07(0x1c5)](/\\I\[(\d+)\]/i)){if('yJrJl'==='UqteZ')this[_0x599b07(0x17c)](_0x3d91de);else{const _0x481e49=this[_0x599b07(0x282)](_0x45d30c),_0x642637=this[_0x599b07(0x256)](_0x41393a)[_0x599b07(0x285)];if(_0x642637<=_0x481e49['width'])return _0x599b07(0x2a3);else{if(_0x599b07(0x1ca)!==_0x599b07(0x15d))return _0x599b07(0x13d);else{const _0x57be5e=this[_0x599b07(0x225)];_0x57be5e['drawText'](_0xb3f367,0x0,_0x519d9c['y'],_0x57be5e[_0x599b07(0x246)],_0x599b07(0x21f));}}}}}}}return _0x599b07(0x1a9);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x17c)]=function(_0x1b6617){const _0x281c96=_0x21aa64,_0x3df22a=this[_0x281c96(0x282)](_0x1b6617),_0x14ab5d=this['commandName'](_0x1b6617),_0x19b5b1=this[_0x281c96(0x256)](_0x14ab5d)[_0x281c96(0x285)];this[_0x281c96(0x260)](this[_0x281c96(0x15f)](_0x1b6617));const _0x3b3ba4=this[_0x281c96(0x1b6)]();if(_0x3b3ba4===_0x281c96(0x16a)){if('sXFfg'!==_0x281c96(0x18e))this[_0x281c96(0x2a0)](_0x14ab5d,_0x3df22a['x']+_0x3df22a['width']-_0x19b5b1,_0x3df22a['y'],_0x19b5b1);else{_0x109015=_0x292298['toUpperCase']()[_0x281c96(0x26e)]();const _0x2a2566=this['quest'](_0xf94029);if(!_0x2a2566)return'';const _0x214220=this[_0x281c96(0x1c2)]();return _0x214220[_0x281c96(0x123)]=_0x214220[_0x281c96(0x123)]||{},_0x214220['rewardsDenied'][_0x5403e3]=_0x214220['rewardsDenied'][_0x4befdf]||[],_0x214220['rewardsDenied'][_0x138670][_0x281c96(0x24a)]((_0x3b61ff,_0x4b2747)=>_0x3b61ff-_0x4b2747);}}else{if(_0x3b3ba4===_0x281c96(0x21f)){if(_0x281c96(0x1fc)===_0x281c96(0x1fc)){const _0x4e0a92=_0x3df22a['x']+Math[_0x281c96(0x134)]((_0x3df22a[_0x281c96(0x285)]-_0x19b5b1)/0x2);this['drawTextEx'](_0x14ab5d,_0x4e0a92,_0x3df22a['y'],_0x19b5b1);}else{const _0x49a567=this[_0x281c96(0x2e5)](_0x201003);if(_0x49a567['match'](/\\I\[(\d+)\]/i)){const _0x4702f6=this[_0x281c96(0x282)](_0x4d259e),_0x5e8d80=this['textSizeEx'](_0x49a567)[_0x281c96(0x285)];return _0x5e8d80<=_0x4702f6[_0x281c96(0x285)]?_0x281c96(0x2a3):_0x281c96(0x13d);}}}else this['drawTextEx'](_0x14ab5d,_0x3df22a['x'],_0x3df22a['y'],_0x19b5b1);}},Window_QuestList['prototype'][_0x21aa64(0x22c)]=function(_0x45bfa8){const _0x304071=_0x21aa64;this[_0x304071(0x2e5)](_0x45bfa8)[_0x304071(0x1c5)](/\\I\[(\d+)\]/i);const _0x54576f=Number(RegExp['$1'])||0x0,_0xc7cc3e=this[_0x304071(0x282)](_0x45bfa8),_0x4a8544=_0xc7cc3e['x']+Math[_0x304071(0x134)]((_0xc7cc3e[_0x304071(0x285)]-ImageManager[_0x304071(0x128)])/0x2),_0x530883=_0xc7cc3e['y']+(_0xc7cc3e[_0x304071(0x27a)]-ImageManager['iconHeight'])/0x2;this[_0x304071(0x1f0)](_0x54576f,_0x4a8544,_0x530883);},Window_QuestList['prototype']['currentCategory']=function(){const _0xc91fe6=_0x21aa64;return this[_0xc91fe6(0x12a)]()===_0xc91fe6(0x234)?this[_0xc91fe6(0x1d4)]():null;},Window_QuestList['prototype'][_0x21aa64(0x1e9)]=function(){const _0x268678=_0x21aa64;return this['currentSymbol']()===_0x268678(0x101)?this['currentExt']():null;},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x136)]=function(_0x576a56){const _0x392f45=_0x21aa64;this[_0x392f45(0x19b)]=_0x576a56,this[_0x392f45(0x2b9)]();},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x140)]=function(){const _0x8463c2=_0x21aa64,_0xaec1ad=this['currentQuest'](),_0x2bea13=this['_labelWindow'];_0x2bea13[_0x8463c2(0x131)]['clear']();const _0x5970d0=_0xaec1ad?_0xaec1ad[_0x8463c2(0x214)]:TextManager['noQuestsLabel'],_0x3a1dac=_0x2bea13[_0x8463c2(0x256)](_0x5970d0)[_0x8463c2(0x285)],_0x4c5d82=_0x2bea13[_0x8463c2(0x2bb)]()+Math[_0x8463c2(0x15e)]((_0x2bea13[_0x8463c2(0x246)]-_0x3a1dac)/0x2);_0x2bea13[_0x8463c2(0x2a0)](_0x5970d0,_0x4c5d82,0x0,_0x2bea13['innerWidth']);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x163)]=function(_0x35b9ee){const _0x5f5a8d=_0x21aa64;this['_logWindow']=_0x35b9ee,this[_0x5f5a8d(0x2b9)]();},Window_QuestList['prototype'][_0x21aa64(0x272)]=function(){const _0x1af523=_0x21aa64,_0x200a01=this[_0x1af523(0x1e9)](),_0x57107f=this[_0x1af523(0x22b)];_0x57107f[_0x1af523(0x21d)](_0x200a01);},Window_QuestList[_0x21aa64(0x299)][_0x21aa64(0x2ec)]=function(){},Window_QuestList[_0x21aa64(0x299)]['cursorPageup']=function(){},Window_QuestList[_0x21aa64(0x299)]['isOkEnabled']=function(){const _0x4b5f2e=_0x21aa64;return this[_0x4b5f2e(0x1e9)]()?this[_0x4b5f2e(0x2d5)]===_0x4b5f2e(0x17f):Window_Command[_0x4b5f2e(0x299)][_0x4b5f2e(0x2d8)]['call'](this);};function Window_QuestLog(){const _0x4565e2=_0x21aa64;this[_0x4565e2(0x191)](...arguments);}Window_QuestLog[_0x21aa64(0x1e4)]=VisuMZ['QuestSystem'][_0x21aa64(0x2e2)]['Window']['LogWindow_Auto_WordWrap'],Window_QuestLog[_0x21aa64(0x133)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x16c)]['LogWindow_ScrollSpeed'],Window_QuestLog[_0x21aa64(0x299)]=Object[_0x21aa64(0x168)](Window_Scrollable[_0x21aa64(0x299)]),Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x164)]=Window_QuestLog,Window_QuestLog[_0x21aa64(0x119)]=0x19,Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(_0xd6ac58){const _0x20fb25=_0x21aa64;this[_0x20fb25(0x198)]=0x0,this[_0x20fb25(0x119)]=0x0,Window_Scrollable[_0x20fb25(0x299)][_0x20fb25(0x191)][_0x20fb25(0x1bb)](this,_0xd6ac58),this['_quest']=null,this[_0x20fb25(0x1b5)]();},Window_QuestLog['prototype'][_0x21aa64(0x1f8)]=function(){const _0x287e26=_0x21aa64;return Math['max'](this[_0x287e26(0x198)],0x1);},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x19d)]=function(){const _0x4f0b14=_0x21aa64;return this[_0x4f0b14(0x1f8)]();},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x1ea)]=function(){const _0x2a023a=_0x21aa64;Window_Scrollable[_0x2a023a(0x299)][_0x2a023a(0x1ea)][_0x2a023a(0x1bb)](this),this[_0x2a023a(0x1a2)]();},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x1a2)]=function(){const _0x86d103=_0x21aa64;if(this[_0x86d103(0x119)]--===0x0)this[_0x86d103(0x1b5)]();},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x182)]=function(){const _0x239b62=_0x21aa64,_0x21e2ef=this[_0x239b62(0x132)]()||0x1,_0x3a1e91=this[_0x239b62(0x2dd)]()||0x1,_0xdc4f42=this[_0x239b62(0x25d)]-this[_0x239b62(0x25d)]%_0x21e2ef,_0x1da432=this[_0x239b62(0x145)]-this[_0x239b62(0x145)]%_0x3a1e91;(_0xdc4f42!==this[_0x239b62(0x17e)]||_0x1da432!==this[_0x239b62(0x19e)])&&(_0x239b62(0x102)!==_0x239b62(0x102)?(_0x11a4a8[_0x239b62(0x29a)]['Scene_Menu_createCommandWindow'][_0x239b62(0x1bb)](this),this[_0x239b62(0x2d4)][_0x239b62(0x1d8)](_0x239b62(0x101),this[_0x239b62(0x242)]['bind'](this))):(this[_0x239b62(0x157)](_0xdc4f42,_0x1da432),this[_0x239b62(0x165)]())),this['origin']['x']=this[_0x239b62(0x25d)],this[_0x239b62(0x251)]['y']=this[_0x239b62(0x145)];},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x291)]=function(){const _0x38dd95=_0x21aa64;Window_Scrollable[_0x38dd95(0x299)]['processWheelScroll'][_0x38dd95(0x1bb)](this),this[_0x38dd95(0x245)]();},Window_QuestLog[_0x21aa64(0x299)]['updatePageUpDownScroll']=function(){const _0x6e1507=_0x21aa64;Input[_0x6e1507(0x1ef)]('pagedown')&&(_0x6e1507(0x2ef)!==_0x6e1507(0xfb)?this['smoothScrollDown'](Window_QuestLog[_0x6e1507(0x133)]):_0x1e2b27[_0x6e1507(0x1b9)](_0x5adfdd,_0x3f1bd1)),Input[_0x6e1507(0x1ef)]('pageup')&&this[_0x6e1507(0x109)](Window_QuestLog[_0x6e1507(0x133)]);},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x21d)]=function(_0x5e4d40){const _0x59d9ea=_0x21aa64;if(this[_0x59d9ea(0x16d)]===_0x5e4d40)return;this[_0x59d9ea(0x16d)]=_0x5e4d40,this['_delayDraw']=Window_QuestLog[_0x59d9ea(0x119)];},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x1b5)]=function(){const _0x2f0ec0=_0x21aa64;this[_0x2f0ec0(0x131)][_0x2f0ec0(0x189)](),this[_0x2f0ec0(0x13e)](),this[_0x2f0ec0(0x187)](),this['drawAllText']();},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x13e)]=function(){const _0x3af6f6=_0x21aa64;if(![]){const _0x2634dc=this[_0x3af6f6(0x28f)](),_0x5c5bee=this[_0x3af6f6(0x16d)]?this[_0x3af6f6(0x154)]():this[_0x3af6f6(0x243)](),_0x4e9487=this[_0x3af6f6(0x256)](_0x5c5bee[_0x3af6f6(0x26e)]());this[_0x3af6f6(0x198)]=_0x4e9487[_0x3af6f6(0x27a)];if(this[_0x3af6f6(0x164)]===Window_QuestLog){this[_0x3af6f6(0x198)]+=this[_0x3af6f6(0x120)]();if(Window_QuestLog['wordWrapSupport']){if(_0x3af6f6(0x1cd)!==_0x3af6f6(0x192))this[_0x3af6f6(0x198)]+=this[_0x3af6f6(0x120)]()*0x4;else{_0x5501e2=_0x2e19cb[_0x3af6f6(0x2d1)]()[_0x3af6f6(0x26e)]();const _0x16ee45=_0x3e797e[_0x3af6f6(0x101)](_0x35c5a4);return _0x16ee45?_0x16ee45[_0x3af6f6(0x2ae)][_0x3af6f6(0x2cc)]-0x1:0x0;}}}}const _0x44a91d=this[_0x3af6f6(0x16d)]?this[_0x3af6f6(0x154)]():this['createEmptyText']();this['_textHeight']=this[_0x3af6f6(0x256)](_0x44a91d[_0x3af6f6(0x26e)]())[_0x3af6f6(0x27a)];},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x148)]=function(){const _0x5ac012=_0x21aa64,_0x4d34a5=this[_0x5ac012(0x16d)]?this[_0x5ac012(0x154)]():this[_0x5ac012(0x243)]();this[_0x5ac012(0x2a0)](_0x4d34a5,0x0,0x0,this[_0x5ac012(0x246)]),this[_0x5ac012(0x145)]=0x0,this[_0x5ac012(0x251)]['y']=0x0;},Window_QuestLog[_0x21aa64(0x299)]['createEmptyText']=function(){const _0x27bd9c=_0x21aa64;VisuMZ[_0x27bd9c(0x29a)][_0x27bd9c(0x2e2)][_0x27bd9c(0x254)]['OnLoadQuestJS']();let _0x42e8be=this[_0x27bd9c(0x1b8)]();return _0x42e8be=VisuMZ[_0x27bd9c(0x29a)][_0x27bd9c(0x14b)](_0x42e8be),_0x42e8be=VisuMZ[_0x27bd9c(0x29a)][_0x27bd9c(0x1f1)](_0x42e8be),_0x42e8be;},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x1b8)]=function(){const _0x16f49e=_0x21aa64;return TextManager[_0x16f49e(0x258)];},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x154)]=function(){const _0x117718=_0x21aa64,_0x1efc50=this[_0x117718(0x16d)],_0x3f8dde=_0x1efc50[_0x117718(0x2ce)][_0x117718(0x2d1)]()[_0x117718(0x26e)]();if(_0x1efc50['OnLoadQuestJS'])_0x1efc50[_0x117718(0x25c)][_0x117718(0x1bb)](this);let _0x46c356=this[_0x117718(0x171)]();return _0x46c356=VisuMZ['QuestSystem']['convertLineBreaksForWordWrap'](_0x46c356),_0x46c356=_0x46c356['replace'](/\[\[RAWTITLE\]\]/gi,_0x1efc50[_0x117718(0x214)]),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[TITLE\]\]/gi,_0x1efc50['Title'][_0x117718(0x1ee)](/\\I\[(\d+)\]/gi,'')[_0x117718(0x26e)]()),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[DIFFICULTY\]\]/gi,_0x1efc50[_0x117718(0x253)][_0x117718(0x26e)]()),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[FROM\]\]/gi,_0x1efc50[_0x117718(0x2c8)][_0x117718(0x26e)]()),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[LOCATION\]\]/gi,_0x1efc50['Location']['trim']()),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[DESCRIPTION\]\]/gi,this[_0x117718(0x2bf)](_0x3f8dde)),_0x46c356=_0x46c356['replace'](/\[\[OBJECTIVES\]\]/gi,this[_0x117718(0xfc)](_0x1efc50,_0x3f8dde)),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[REWARDS\]\]/gi,this[_0x117718(0x178)](_0x1efc50,_0x3f8dde)),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[SUBTEXT\]\]/gi,this[_0x117718(0x21a)](_0x3f8dde)),_0x46c356=_0x46c356[_0x117718(0x1ee)](/\[\[QUOTE\]\]/gi,this['createQuestQuote'](_0x3f8dde)),_0x46c356=VisuMZ[_0x117718(0x29a)][_0x117718(0x1f1)](_0x46c356),_0x46c356=VisuMZ[_0x117718(0x29a)][_0x117718(0x27b)](_0x46c356),_0x46c356[_0x117718(0x26e)]();},Window_QuestLog[_0x21aa64(0x299)]['getQuestLogFmt']=function(){const _0x4f0220=_0x21aa64;return TextManager[_0x4f0220(0x142)];},Window_QuestLog[_0x21aa64(0x299)][_0x21aa64(0x2bf)]=function(_0x2d1786){const _0x3d355a=_0x21aa64;let _0x2865c3=$gameSystem['questDescription'](_0x2d1786);return _0x2865c3=VisuMZ['QuestSystem'][_0x3d355a(0x1f1)](_0x2865c3),_0x2865c3[_0x3d355a(0x26e)]();},Window_QuestLog[_0x21aa64(0x299)]['createQuestObjectives']=function(_0xd3186f,_0x43f819){const _0x32246e=_0x21aa64,_0x4f31c4=[],_0x2ddf8d=$gameSystem[_0x32246e(0x2c9)](_0x43f819),_0x211a88=$gameSystem[_0x32246e(0x1a7)](_0x43f819),_0x762414=$gameSystem[_0x32246e(0x2db)](_0x43f819),_0x18a23b=_0x2ddf8d[_0x32246e(0x28b)](_0x211a88)[_0x32246e(0x28b)](_0x762414)['sort']((_0x466d96,_0x385aa5)=>_0x466d96-_0x385aa5);for(const _0x559178 of _0x18a23b){if(!_0xd3186f[_0x32246e(0x2ae)][_0x559178])continue;const _0x34b2de=_0xd3186f['Objectives'][_0x559178];let _0x63998=TextManager[_0x32246e(0x2aa)];if(_0x211a88[_0x32246e(0x1c8)](_0x559178))_0x63998=TextManager[_0x32246e(0x1a6)];if(_0x762414['includes'](_0x559178))_0x63998=TextManager[_0x32246e(0x11e)];_0x4f31c4['push'](VisuMZ[_0x32246e(0x29a)][_0x32246e(0x2eb)](_0x63998[_0x32246e(0x1e0)](_0x34b2de)[_0x32246e(0x26e)]()));}let _0x363b32=VisuMZ['QuestSystem'][_0x32246e(0x11f)](_0x4f31c4);return _0x363b32;},Window_QuestLog[_0x21aa64(0x299)]['createQuestRewards']=function(_0x205d74,_0x72c61b){const _0xcae7e4=_0x21aa64,_0x210a36=[],_0x3e672a=$gameSystem[_0xcae7e4(0x28c)](_0x72c61b),_0x3805af=$gameSystem[_0xcae7e4(0x103)](_0x72c61b),_0x4c5a6b=$gameSystem[_0xcae7e4(0x297)](_0x72c61b),_0x1f7a2b=_0x3e672a['concat'](_0x3805af)['concat'](_0x4c5a6b)[_0xcae7e4(0x24a)]((_0xa55328,_0x1f6d42)=>_0xa55328-_0x1f6d42);for(const _0x28f8de of _0x1f7a2b){if(!_0x205d74[_0xcae7e4(0x1fd)][_0x28f8de])continue;const _0xe1ae8f=_0x205d74[_0xcae7e4(0x1fd)][_0x28f8de];let _0x3b6cbc=TextManager[_0xcae7e4(0x2b8)];if(_0x3805af['includes'](_0x28f8de))_0x3b6cbc=TextManager[_0xcae7e4(0x236)];if(_0x4c5a6b['includes'](_0x28f8de))_0x3b6cbc=TextManager[_0xcae7e4(0x298)];_0x210a36[_0xcae7e4(0x2a4)](VisuMZ['QuestSystem'][_0xcae7e4(0x2eb)](_0x3b6cbc[_0xcae7e4(0x1e0)](_0xe1ae8f)[_0xcae7e4(0x26e)]()));}let _0x31f147=VisuMZ['QuestSystem']['joinQuestEntries'](_0x210a36);return _0x31f147;},Window_QuestLog[_0x21aa64(0x299)]['createQuestSubtext']=function(_0xe5b872){const _0x1c6451=_0x21aa64;let _0x24459a=$gameSystem[_0x1c6451(0x229)](_0xe5b872);return _0x24459a=VisuMZ['QuestSystem']['finalizeWordWrapSupport'](_0x24459a),_0x24459a['trim']();},Window_QuestLog['prototype'][_0x21aa64(0x286)]=function(_0x2c4465){const _0x3b54e6=_0x21aa64;let _0xc0e832=$gameSystem[_0x3b54e6(0x20a)](_0x2c4465);return _0xc0e832=VisuMZ['QuestSystem'][_0x3b54e6(0x1f1)](_0xc0e832),_0xc0e832[_0x3b54e6(0x26e)]();};function Window_QuestTracker(){const _0x1857f9=_0x21aa64;this[_0x1857f9(0x191)](...arguments);}Window_QuestTracker[_0x21aa64(0x299)]=Object['create'](Window_QuestLog[_0x21aa64(0x299)]),Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x164)]=Window_QuestTracker,Window_QuestTracker['scale']=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)]['Window'][_0x21aa64(0x280)],Window_QuestTracker[_0x21aa64(0x27d)]=VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x2e2)][_0x21aa64(0x16c)][_0x21aa64(0x126)],Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x191)]=function(_0x36866a){const _0x31e2bc=_0x21aa64;Window_QuestLog[_0x31e2bc(0x299)][_0x31e2bc(0x191)]['call'](this,_0x36866a),this[_0x31e2bc(0x21d)]($gameSystem[_0x31e2bc(0x202)]()),this['scale']['x']=this['scale']['y']=Window_QuestTracker[_0x31e2bc(0x290)],this[_0x31e2bc(0x227)]();},Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x1f8)]=function(){return Math['max'](this['_textHeight'],0x1);},Window_QuestTracker['prototype'][_0x21aa64(0x1b8)]=function(){return'';},Window_QuestTracker[_0x21aa64(0x299)]['getQuestLogFmt']=function(){const _0x1b710a=_0x21aa64;return TextManager[_0x1b710a(0x1ed)];},Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x187)]=function(){const _0x1e1a2d=_0x21aa64;this[_0x1e1a2d(0x27a)]=this[_0x1e1a2d(0x1f8)]()+$gameSystem[_0x1e1a2d(0x1f7)]()*0x2,Window_QuestLog['prototype'][_0x1e1a2d(0x187)][_0x1e1a2d(0x1bb)](this);},Window_QuestTracker[_0x21aa64(0x299)]['setQuest']=function(_0x38274a){const _0x3af25a=_0x21aa64;if(this[_0x3af25a(0x16d)]===_0x38274a)return;this[_0x3af25a(0x16d)]=_0x38274a,this[_0x3af25a(0x1b5)]();},Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x1b5)]=function(){const _0x38a230=_0x21aa64;if($gameTemp[_0x38a230(0x105)])return;$gameTemp['_questTrackerRefresh']=!![],Window_QuestLog['prototype'][_0x38a230(0x1b5)]['call'](this),this[_0x38a230(0x1c1)](this[_0x38a230(0x16d)]?Window_QuestTracker[_0x38a230(0x27d)]:0x2),$gameTemp[_0x38a230(0x105)]=![];},Window_QuestTracker[_0x21aa64(0x299)]['update']=function(){const _0x2e95f2=_0x21aa64;Window_QuestLog[_0x2e95f2(0x299)][_0x2e95f2(0x1ea)][_0x2e95f2(0x1bb)](this),this['updateVisibility']();},Window_QuestTracker['prototype'][_0x21aa64(0x227)]=function(){const _0x9245d5=_0x21aa64,_0xf917ba=this[_0x9245d5(0x20f)]();this[_0x9245d5(0xf7)]=_0xf917ba;},Window_QuestTracker[_0x21aa64(0x299)][_0x21aa64(0x20f)]=function(){const _0x346b79=_0x21aa64;if(!ConfigManager['questTrackerShow'])return 0x0;if($gameTemp[_0x346b79(0x10e)])return 0x0;const _0x361c42=SceneManager[_0x346b79(0x2c4)];if(_0x361c42&&_0x361c42[_0x346b79(0x29f)]){if(_0x361c42[_0x346b79(0x29f)][_0x346b79(0xf7)]>0x0)return 0x0;}if(!this[_0x346b79(0x16d)])return 0x0;return $gameSystem[_0x346b79(0x12e)]()?0xff:0x0;},VisuMZ['QuestSystem'][_0x21aa64(0x1f1)]=function(_0xf68fcc){const _0x10ab7b=_0x21aa64;if(!Window_QuestLog[_0x10ab7b(0x1e4)])return _0xf68fcc;if(!Imported[_0x10ab7b(0x130)])return _0xf68fcc;return _0xf68fcc=_0x10ab7b(0x138)[_0x10ab7b(0x1e0)](_0xf68fcc),_0xf68fcc;},VisuMZ['QuestSystem'][_0x21aa64(0x27b)]=function(_0x417775){const _0x451d8e=_0x21aa64;if(Imported[_0x451d8e(0x130)])return _0x417775;return _0x417775=_0x417775[_0x451d8e(0x1ee)](/<COLORLOCK>/gi,''),_0x417775=_0x417775[_0x451d8e(0x1ee)](/<\/COLORLOCK>/gi,''),_0x417775;},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x14b)]=function(_0x140e04){const _0x410348=_0x21aa64;if(!Window_QuestLog[_0x410348(0x1e4)])return _0x140e04[_0x410348(0x1ee)](/<(?:BR|LINEBREAK)>/gi,'');if(!Imported['VisuMZ_1_MessageCore'])return _0x140e04[_0x410348(0x1ee)](/<(?:BR|LINEBREAK)>/gi,'');if(VisuMZ[_0x410348(0x116)]['Settings']['WordWrap'][_0x410348(0x215)])_0x140e04=_0x140e04[_0x410348(0x1ee)](/[\n\r]+/g,_0x410348(0x179));else{if(_0x410348(0x1db)!==_0x410348(0x1db)){_0x31a232=_0x319961[_0x410348(0x2d1)]()['trim']();const _0x380318=_0x3e2f0d[_0x410348(0x101)](_0x36029a);if(!_0x380318)return![];_0x5064b6['questObjectives'](_0x236a9d);const _0x3ffc5f=_0x338e5d['questData']()['objectivesCompleted'];if(!_0x3ffc5f[_0x1c8755])return![];return _0x3ffc5f[_0x4a6300][_0x410348(0x1c8)](_0x4aecf8);}else _0x140e04=_0x140e04[_0x410348(0x1ee)](/[\n\r]+/g,'');}return _0x140e04;},VisuMZ[_0x21aa64(0x29a)][_0x21aa64(0x23a)]=function(_0x4f5b7e){const _0x1a188f=_0x21aa64;if(!Window_QuestLog[_0x1a188f(0x1e4)])return _0x4f5b7e;if(!Imported['VisuMZ_1_MessageCore'])return _0x4f5b7e;return _0x4f5b7e['trim']()['replace'](/[\n\r]/g,_0x1a188f(0x2e0));},VisuMZ['QuestSystem'][_0x21aa64(0x2eb)]=function(_0x232e3d){const _0x2be984=_0x21aa64;if(!Window_QuestLog['wordWrapSupport'])return _0x232e3d;if(!Imported[_0x2be984(0x130)])return _0x232e3d;return VisuMZ[_0x2be984(0x29a)]['applyWordWrap'](_0x232e3d[_0x2be984(0x26e)]());},VisuMZ[_0x21aa64(0x29a)]['joinQuestEntries']=function(_0x52fbf2){const _0x23aa06=_0x21aa64;if(!Window_QuestLog[_0x23aa06(0x1e4)])return _0x52fbf2[_0x23aa06(0x1df)]('\x0a')[_0x23aa06(0x26e)]();if(!Imported[_0x23aa06(0x130)])return _0x52fbf2[_0x23aa06(0x1df)]('\x0a')[_0x23aa06(0x26e)]();return _0x52fbf2['join']('<BR>')['trim']();},totalQuestsAvailable=function(){const _0x48820b=_0x21aa64;return $gameSystem[_0x48820b(0x1c2)]()[_0x48820b(0x17f)][_0x48820b(0x2cc)];},totalQuestsCompleted=function(){const _0x2514b7=_0x21aa64;return $gameSystem[_0x2514b7(0x1c2)]()['completed']['length'];},totalQuestsFailed=function(){const _0x4b1c20=_0x21aa64;return $gameSystem[_0x4b1c20(0x1c2)]()[_0x4b1c20(0x2d0)][_0x4b1c20(0x2cc)];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0x382745=_0x21aa64;return VisuMZ[_0x382745(0x29a)]['QuestOrder'][_0x382745(0x2cc)];},getQuestDescriptionIndex=function(_0x1b2c70){const _0x514dae=_0x21aa64;_0x1b2c70=_0x1b2c70['toUpperCase']()['trim']();const _0x2a83cd=$gameSystem[_0x514dae(0x101)](_0x1b2c70);if(!_0x2a83cd)return-0x1;$gameSystem[_0x514dae(0x106)](_0x1b2c70);const _0x39e3b7=$gameSystem[_0x514dae(0x1c2)]()['description'];return _0x39e3b7[_0x1b2c70]||0x0;},totalVisibleQuestObjectives=function(_0x34a3c6){const _0x2c2d5a=_0x21aa64;_0x34a3c6=_0x34a3c6[_0x2c2d5a(0x2d1)]()['trim']();const _0x5218a3=$gameSystem[_0x2c2d5a(0x101)](_0x34a3c6);if(!_0x5218a3)return-0x1;$gameSystem['questObjectives'](_0x34a3c6);const _0x1cc286=$gameSystem[_0x2c2d5a(0x1c2)]()[_0x2c2d5a(0x16e)]||{};if(!_0x1cc286[_0x34a3c6])return 0x0;return _0x1cc286[_0x34a3c6][_0x2c2d5a(0x2cc)];},totalQuestObjectives=function(_0xe66c1c){const _0x14bf18=_0x21aa64;_0xe66c1c=_0xe66c1c[_0x14bf18(0x2d1)]()[_0x14bf18(0x26e)]();const _0x3c629e=$gameSystem[_0x14bf18(0x101)](_0xe66c1c);return _0x3c629e?_0x3c629e[_0x14bf18(0x2ae)][_0x14bf18(0x2cc)]-0x1:0x0;},totalVisibleQuestRewards=function(_0x4c89fd){const _0x289e1b=_0x21aa64;_0x4c89fd=_0x4c89fd[_0x289e1b(0x2d1)]()[_0x289e1b(0x26e)]();const _0x545892=$gameSystem['quest'](_0x4c89fd);if(!_0x545892)return-0x1;$gameSystem[_0x289e1b(0x28c)](_0x4c89fd);const _0x1533c1=$gameSystem[_0x289e1b(0x1c2)]()[_0x289e1b(0x2b6)]||{};if(!_0x1533c1[_0x4c89fd])return 0x0;return _0x1533c1[_0x4c89fd][_0x289e1b(0x2cc)];},totalQuestRewards=function(_0x4fc682){const _0x3eb4f4=_0x21aa64;_0x4fc682=_0x4fc682['toUpperCase']()[_0x3eb4f4(0x26e)]();const _0x4c14bd=$gameSystem[_0x3eb4f4(0x101)](_0x4fc682);return _0x4c14bd?_0x4c14bd[_0x3eb4f4(0x1fd)][_0x3eb4f4(0x2cc)]-0x1:0x0;},getQuestSubtextIndex=function(_0x2813d1){const _0x1a2732=_0x21aa64;_0x2813d1=_0x2813d1[_0x1a2732(0x2d1)]()[_0x1a2732(0x26e)]();const _0x549a0d=$gameSystem[_0x1a2732(0x101)](_0x2813d1);if(!_0x549a0d)return-0x1;$gameSystem[_0x1a2732(0x229)](_0x2813d1);const _0x5a0c31=$gameSystem[_0x1a2732(0x1c2)]()[_0x1a2732(0x267)];return _0x5a0c31[_0x2813d1]||0x0;},getQuestQuoteIndex=function(_0x50409a){const _0x3f8624=_0x21aa64;_0x50409a=_0x50409a['toUpperCase']()['trim']();const _0x2bcf99=$gameSystem[_0x3f8624(0x101)](_0x50409a);if(!_0x2bcf99)return-0x1;$gameSystem[_0x3f8624(0x20a)](_0x50409a);const _0x2d50f9=$gameSystem[_0x3f8624(0x1c2)]()['quotes'];return _0x2d50f9[_0x50409a]||0x0;},isQuestObjectiveCompleted=function(_0x5084f6,_0x44c6d6){const _0x34f668=_0x21aa64;_0x5084f6=_0x5084f6[_0x34f668(0x2d1)]()['trim']();const _0x1a8352=$gameSystem['quest'](_0x5084f6);if(!_0x1a8352)return![];$gameSystem[_0x34f668(0x2c9)](_0x5084f6);const _0x309235=$gameSystem[_0x34f668(0x1c2)]()['objectivesCompleted'];if(!_0x309235[_0x5084f6])return![];return _0x309235[_0x5084f6][_0x34f668(0x1c8)](_0x44c6d6);},isQuestObjectiveFailed=function(_0x16c3b0,_0x22d42e){const _0x2fce2c=_0x21aa64;_0x16c3b0=_0x16c3b0[_0x2fce2c(0x2d1)]()['trim']();const _0x1938fa=$gameSystem[_0x2fce2c(0x101)](_0x16c3b0);if(!_0x1938fa)return![];$gameSystem[_0x2fce2c(0x2c9)](_0x16c3b0);const _0x375a98=$gameSystem[_0x2fce2c(0x1c2)]()['objectivesFailed'];if(!_0x375a98[_0x16c3b0])return![];return _0x375a98[_0x16c3b0][_0x2fce2c(0x1c8)](_0x22d42e);},isQuestObjectiveUncleared=function(_0x341b20,_0x237d5b){const _0xca5a5b=_0x21aa64;_0x341b20=_0x341b20[_0xca5a5b(0x2d1)]()['trim']();const _0xcb65d4=$gameSystem[_0xca5a5b(0x101)](_0x341b20);if(!_0xcb65d4)return![];$gameSystem[_0xca5a5b(0x2c9)](_0x341b20);const _0x3097d0=$gameSystem[_0xca5a5b(0x1c2)]()[_0xca5a5b(0x16e)];if(!_0x3097d0[_0x341b20])return![];return _0x3097d0[_0x341b20]['includes'](_0x237d5b);},isQuestRewardClaimed=function(_0xa68305,_0x19c6cb){const _0x8a3a4a=_0x21aa64;_0xa68305=_0xa68305[_0x8a3a4a(0x2d1)]()[_0x8a3a4a(0x26e)]();const _0x318ebd=$gameSystem[_0x8a3a4a(0x101)](_0xa68305);if(!_0x318ebd)return![];$gameSystem['questRewards'](_0xa68305);const _0x3c4433=$gameSystem[_0x8a3a4a(0x1c2)]()[_0x8a3a4a(0x166)];if(!_0x3c4433[_0xa68305])return![];return _0x3c4433[_0xa68305]['includes'](_0x19c6cb);},isQuestRewardDenied=function(_0x26c849,_0xfcf7a7){const _0x3db9e3=_0x21aa64;_0x26c849=_0x26c849[_0x3db9e3(0x2d1)]()[_0x3db9e3(0x26e)]();const _0x3261b4=$gameSystem[_0x3db9e3(0x101)](_0x26c849);if(!_0x3261b4)return![];$gameSystem[_0x3db9e3(0x28c)](_0x26c849);const _0x19361f=$gameSystem[_0x3db9e3(0x1c2)]()[_0x3db9e3(0x123)];if(!_0x19361f[_0x26c849])return![];return _0x19361f[_0x26c849][_0x3db9e3(0x1c8)](_0xfcf7a7);},isQuestRewardUnclaimed=function(_0x4a0438,_0xe59580){const _0x4ab2df=_0x21aa64;_0x4a0438=_0x4a0438[_0x4ab2df(0x2d1)]()[_0x4ab2df(0x26e)]();const _0x3c4229=$gameSystem[_0x4ab2df(0x101)](_0x4a0438);if(!_0x3c4229)return![];$gameSystem[_0x4ab2df(0x28c)](_0x4a0438);const _0x3c70e2=$gameSystem[_0x4ab2df(0x1c2)]()[_0x4ab2df(0x2b6)];if(!_0x3c70e2[_0x4a0438])return![];return _0x3c70e2[_0x4a0438]['includes'](_0xe59580);};