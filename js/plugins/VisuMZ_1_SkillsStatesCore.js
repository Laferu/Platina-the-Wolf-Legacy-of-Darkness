//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.30;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.30] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x2e8d91=_0x7850;(function(_0x4537ea,_0x36f9ec){const _0x48ca6c=_0x7850,_0x32a78f=_0x4537ea();while(!![]){try{const _0x1ee835=-parseInt(_0x48ca6c(0x1c3))/0x1*(parseInt(_0x48ca6c(0x29e))/0x2)+-parseInt(_0x48ca6c(0x3a1))/0x3+parseInt(_0x48ca6c(0x483))/0x4+parseInt(_0x48ca6c(0x20a))/0x5+parseInt(_0x48ca6c(0x3e5))/0x6*(parseInt(_0x48ca6c(0x1b8))/0x7)+parseInt(_0x48ca6c(0x2c1))/0x8+parseInt(_0x48ca6c(0x3d4))/0x9*(parseInt(_0x48ca6c(0x1bb))/0xa);if(_0x1ee835===_0x36f9ec)break;else _0x32a78f['push'](_0x32a78f['shift']());}catch(_0x351c6b){_0x32a78f['push'](_0x32a78f['shift']());}}}(_0x42b7,0x90199));var label=_0x2e8d91(0x367),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2e8d91(0x224)](function(_0x21282c){const _0x43d0a1=_0x2e8d91;return _0x21282c[_0x43d0a1(0x464)]&&_0x21282c['description']['includes']('['+label+']');})[0x0];function _0x7850(_0xe52caa,_0x2fcd7a){const _0x42b71a=_0x42b7();return _0x7850=function(_0x7850e0,_0x4f796e){_0x7850e0=_0x7850e0-0x1ad;let _0x21d541=_0x42b71a[_0x7850e0];return _0x21d541;},_0x7850(_0xe52caa,_0x2fcd7a);}function _0x42b7(){const _0x317b98=['_stypeIDs','stateMpSlipDamageJS','Sprite_Gauge_currentMaxValue','clearStateRetainType','_stateOrigin','fvDdT','usableSkills','Game_BattlerBase_initMembers','setBackgroundType','ALL','Window_SkillList_drawItem','OnTtT','aSECe','drawItemStyleIconText','drawActorIcons','_actor','addState','Parse_Notetags_State_Category','Sprite_Gauge_initMembers','addDebuff','onAddBuffGlobalJS','azBbA','mainCommandWidth','innerHeight','drawSkillCost','lHeJm','NQPZW','<enemy-%1>','currentValueSkillsStatesCore','itemLineRect','toLowerCase','_classIDs','ShowData','stypeId','TurnOffsetX','makeCurrentTroopUniqueID','Game_BattlerBase_eraseBuff','Actor','Isgof','includes','fontSize','BattleHiddenSkillTypes','adjustItemWidthByShopStatus','icon','getStateData','Window_SkillStatus_refresh','success','isStateCategoryAffected','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','qrTyI','FeTVy','updateCommandNameWindow','isStateCategoryResisted','SkillsStatesCore','hgxhP','Scene_Skill_skillTypeWindowRect','Game_BattlerBase_meetsSkillConditions','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','LMOYG','active','bogSw','TurnEndOnMap','makeCommandList','Scene_Skill_helpWindowRect','parse','ywZap','members','onAddDebuff','gaugeLineHeight','DataFontSize','makeSuccess','AGI','isSkillHidden','Kmnic','stateEraseJS','getCurrentTroopUniqueID','isGroupDefeatStateAffected','ListWindowCols','Window_StatusBase_placeGauge','setupSkillsStatesCore','createItemWindow','toUpperCase','traitsSet','drawTextEx','updateStateTurns','commandNameWindowDrawText','setStatusWindow','addPassiveStatesTraitSets','meetsSkillConditionsEnableJS','convertPassiveStates','totalStateCategory','xegDG','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isPassiveStateStackable','asGYE','makeResistedStateCategories','Parse_Notetags_Skill_JS','Parse_Notetags_State_SlipEffectJS','removeBuffsAuto','hBnDp','nXThZ','addPassiveStatesByNotetag','ljzHa','onEraseDebuffJS','add','FSBGX','priority','getSkillTypes','rAolF','NXnKv','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','1187310cgvszM','iLhit','dmPrK','jqzUs','redrawSkillsStatesCore','mainFontSize','IMFpD','CanPayJS','onEraseBuffJS','Game_Battler_regenerateAll','uiMenuStyle','Window_SkillList_maxCols','Game_BattlerBase_recoverAll','onExpireDebuffGlobalJS','gUuVU','slipTp','meetsPassiveStateGlobalConditionJS','CoreEngine','_scene','onAddStateCustomJS','bitmap','skills','JPlRO','_tempBattler','passiveStateObjects','Lrrsj','eOvYN','onExpireStateCustomJS','damage','name','wwSVN','Sprite_StateIcon_updateFrame','koksd','isStateRemoved','rxFXN','hqpEp','drawActorStateTurns','JaEST','onEraseStateGlobalJS','BbJfB','ktLDX','skillCostSeparator','QYdJf','isUseModernControls','checkCacheKey','MAT','isBuffPrevented','QhKAK','TCpmk','aAJTc','addPassiveStatesByPluginParameters','9wkGASD','setBuffTurns','clearStateOrigin','StackBuffMax','uiHelpPosition','map','canPaySkillCost','equips','increaseBuff','getSkillIdWithName','changeOutlineColor','testSkillStatesCoreNotetags','KbWpu','MaxTurns','hasStateCategory','hKHLn','meetsPassiveStateConditionClasses','8052roTDvn','QdsEg','AFmTK','reset','getStateIdWithName','commandStyle','inBattle','buff','itemWindowRect','fontFace','_skillTypeWindow','plZml','EWebG','debuffColor','_lastStatesActionEndFrameCount','getStateRetainType','aLyxO','length','xTbsi','stateMpSlipHealJS','dykYT','SkillConditionJS','lineHeight','Game_Battler_addDebuff','RRmPv','_checkingVisuMzPassiveStateObjects','isAllDead','scrollTo','kTYdi','placeGauge','replace','uKXPN','clearStatesWithStateRetain','ShowTurns','_hidden','state','skillId','xnkGg','enemyId','_stateMaxTurns','makeAdditionalSkillCostText','BattleManager_endAction','drawItem','isMaxDebuffAffected','KlwUo','AKVzN','TTCvz','cNoLJ','statusWindowRect','onAddStateGlobalJS','note','VuOTo','_stateDisplay','floor','_stateTurns','StackDebuffMax','FODAu','HiddenSkillTypes','onExpireState','onAddStateMakeCustomSlipValues','IsxxT','applyBuffTurnManipulationEffects','WrGLb','forgetSkill','gainMp','_result','dWQBB','_stored_buffColor','setup','skillTypes','MyZeY','textSizeEx','paramBuffRate','isBuffAffected','qrDqV','qVaXw','nMffq','qzHJz','tszco','oyXmw','setStateDisplay','greater','onExpireStateGlobalJS','dHyXM','_tempActor','zdMam','hdoww','_buffs','getStateOriginByKey','onAddState','setStateTurns','commandStyleCheck','mainFontFace','DEF','colSpacing','removeStatesByCategory','slice','drawActorStateData','stateData','lPrtq','iconHeight','GroupDigits','Scene_Boot_onDatabaseLoaded','stateCategoriesResisted','DataOffsetY','applySkillsStatesCoreEffects','checkSkillConditionsSwitchNotetags','qHFEu','maxItems','itemWindowRectSkillsStatesCore','_currentTroopUniqueID','%1\x20%2\x20%3','applyStateTurnManipulationEffects','test','createAllSkillCostText','onRegenerateCustomStateDamageOverTime','iconText','Global','_currentActor','gaugeBackColor','removeBuff','eraseState','hFhPb','WiwYG','KAUNn','dteJZ','calcWindowHeight','status','XBwIa','paySkillCost','NsMWv','kHKvD','changeTextColor','MAXHP','currentDisplayedValue','mainAreaHeight','Game_BattlerBase_eraseState','ActionEndUpdate','placeExactGauge','enBGa','isPartyAllAffectedByGroupDefeatStates','ljCTM','Scene_Skill_itemWindowRect','stateTurns','MqGhT','Game_BattlerBase_clearStates','slipMp','Window_StatusBase_drawActorIcons','parameters','drawExtendedSkillsStatesCoreStatus','loadBitmap','categories','EnmpX','UrvaP','IconStypeNorm','VisuMZ_1_ItemsEquipsCore','isLearnedSkill','onEraseDebuffGlobalJS','3261980poDeer','getCurrentStateOriginKey','kjgyu','tnIjx','convertGaugeTypeSkillsStatesCore','shift','getStateDisplay','Enemy','Parse_Notetags_State_PassiveJS','includesSkillsStatesCore','_states','heal','meetsSkillConditions','paramValueByName','iFCbm','clearStates','ParseStateNotetags','onEraseBuff','canUse','Game_Actor_forgetSkill','ShowShopStatus','gaugeRate','ToxMh','_stateIDs','skillEnableJS','shopStatusWindowRectSkillsStatesCore','CheckVisibleBattleNotetags','format','stateHpSlipHealJS','_colorCache','checkSkillTypeMatch','dubiO','ParseClassIDs','acENp','ParseSkillNotetags','ColorNegative','bfvzt','Game_BattlerBase_increaseBuff','addStateTurns','Game_BattlerBase_states','NtRtF','Scene_Skill_statusWindowRect','convertTargetToStateOriginKey','itemAt','Parse_Notetags_State_ApplyRemoveLeaveJS','SkillMenuStatusRect','drawItemStyleIcon','ParseAllNotetags','TextJS','yHEFo','addChild','GaugeDrawJS','jqHJE','useDigitGrouping','applyItemUserEffect','Game_Battler_isStateAddable','onAddDebuffJS','sPAac','commandNameWindowDrawBackground','debuffTurns','initialize','isStateAffected','ocsEp','Skills','createTurnDisplaySprite','2562tXIvnU','isPlaytest','drawActorIconsAllTurnCounters','91230KFaNCM','onExpireBuffJS','currentValue','passiveStates','onExpireDebuffJS','normalColor','autoRemovalTiming','ePLUl','5aWsdYE','TurnFontSize','gainHp','zwqwX','sort','endAction','ANY','knHwy','indexOf','#%1','createShopStatusWindow','opacity','commandNameWindowCenter','keys','meetsPassiveStateConditionJS','isSkillTypeMatchForUse','aRdUB','WqaxN','Window_SkillList_setActor','States','FUNC','getStypeIdWithName','qxRYl','_passiveStateResults','WMfyF','rFTxu','kGTby','shopStatusWidth','call','getCurrentStateActiveUser','OLjLR','onEraseDebuff','isBuffExpired','buttonAssistText1','buttonAssistSwitch','Param','onExpireBuff','alterSkillName','DbJhu','hide','actor','_turnDisplaySprite','hasSkill','text','FeCBq','stateTpSlipDamageJS','addPassiveStates','traitObjects','Game_BattlerBase_refresh','KKmob','isStateRestrict','learnSkill','hasState','drawParamText','isBottomHelpMode','currentClass','Window_SkillList_includes','VtlPz','getStateReapplyRulings','regenerateAll','checkShowHideJS','_subject','totalStateCategoryAffected','setDebuffTurns','Parse_Notetags_Skill_Cost','initMembersSkillsStatesCore','Game_BattlerBase_resetStateCounts','ciYdF','_skillIDs','callUpdateHelp','recoverAll','304915wzQKsA','pRCDX','drawIcon','groupDefeat','updateFrame','GewTk','GaugeMaxJS','death','round','EVAL','updateStatesActionEnd','buffIconIndex','_commandNameWindow','iconIndex','dVjbC','DisplayedParams','wZShU','resetTextColor','Game_BattlerBase_skillMpCost','TjRYu','split','_shopStatusWindow','updateTurnDisplaySprite','auto','process_VisuMZ_SkillsStatesCore_Notetags','index','filter','Wlxuj','GClyW','_stateSteps','MDF','isRightInputMode','ARRAYJSON','CheckVisibleSkillNotetags','onExpireDebuff','right','user','skillMpCost','outlineColor','SkillSceneAdjustSkillList','_cache','statusWidth','textColor','isActor','actions','ConvertParams','VisuMZ_0_CoreEngine','mpCost','YyfVm','uiInputPosition','onEraseBuffGlobalJS','isStateAddable','gradientFillRect','eraseBuff','lVHEM','gainSilentTp','jtlhk','Window_SkillList_updateHelp','maxCols','Game_BattlerBase_buffIconIndex','_stateRetainType','Game_BattlerBase_overwriteBuffTurns','ARRAYSTRUCT','process_VisuMZ_SkillsStatesCore_Skill_Notetags','Window_SkillType_initialize','width','NUM','stateHpSlipDamageJS','_stored_debuffColor','frameCount','_itemWindow','addPassiveStatesFromOtherPlugins','onAddStateJS','stateMaximumTurns','ATK','_stateData','ZrcXj','ReapplyRules','Game_Battler_addState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','GFJKK','max','Game_Troop_setup','shopStatusWindowRect','VisuMZ_2_ClassChangeSystem','_checkingTraitsSetSkillsStatesCore','Game_BattlerBase_traitsSet','statesByCategory','LayoutStyle','Game_Battler_addBuff','yvSmi','trim','buffTurns','number','_animationIndex','match','rLapJ','\x5cI[%1]%2','addBuffTurns','onAddBuff','removeOtherStatesOfSameCategory','setStateData','uzsYL','Sprite_Gauge_redraw','buffLength','VAPeL','PassiveStates','Game_Unit_isAllDead','drawText','VDHJT','commandName','Pvpoi','stateColor','removeStatesAuto','menuActor','removeState','log','<actor-%1>','hAhNp','helpAreaHeight','ShowJS','DataOffsetX','getClassIdWithName','fMyIm','_checkingPassiveStates','isMaxBuffAffected','WKYms','swTHs','ARRAYNUM','sadGY','value','gzVSj','_phase','_battler','onExpireBuffGlobalJS','ignore','stepsForTurn','MAXMP','untitled','_buffTurns','CheckIncompatibleStates','drawExtendedParameter','slipHp','Name','fontBold','onEraseStateJS','PayJS','Game_BattlerBase_die','293738ZElucO','Buffs','overwriteBuffTurns','retrieveStateColor','CalcJS','RFWOu','VEcuB','cieYd','boxWidth','applyStateCategoryRemovalEffects','_categoryWindow','ARRAYEVAL','PassiveConditionJS','AbIrc','addDebuffTurns','contents','stateTpSlipHealJS','JOXzZ','currentMaxValue','innerWidth','LUK','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','applyDebuffTurnManipulationEffects','canClearState','akLIx','iconWidth','height','drawActorBuffRates','helpWindowRectSkillsStatesCore','SyKAD','currentMaxValueSkillsStatesCore','buffColor','description','stateId','ceil','2748600MwEwgS','YtMeO','dwxpl','itemTextAlign','meetsSkillConditionsGlobalJS','stateExpireJS','SsZfP','ColorDebuff','eYYeu','die','AQzGx','meetsPassiveStateConditions','resetFontSettings','allIcons','meetsPassiveStateConditionSwitches','process_VisuMZ_SkillsStatesCore_State_Notetags','POSITIVE','push','CheckVisibleSwitchNotetags','updateVisibility','Game_Action_applyItemUserEffect','recover\x20all','updateHelp','VisuMZ_1_ElementStatusCore','isStateResist','onEraseStateCustomJS','skillVisibleJS','FexmG','item','multiclasses','drawActorBuffTurns','xdrmT','onRemoveState','updatedLayoutStyle','clearStateDisplay','setItem','isSkillUsableForAutoBattle','clamp','allowCreateShopStatusWindow','redraw','wYHpv','constructor','_costSettings','setStateRetainType','skill','initMembers','createPassiveStatesCache','dyrCx','qMOpj','<member-%1>','Game_Actor_skillTypes','qZzOu','exit','onExpireStateJS','actorId','<troop-%1>','getColorDataFromPluginParameters','maxSlipDamage','isUseSkillsStatesCoreUpdatedLayout','makeCommandName','skillTpCost','vnfwF','concat','setStateOrigin','return\x200','IYduU','fqvuI','center','setActor','isBuffOrDebuffAffected','version','_stypeId','prototype','xERrS','refresh','stateAddJS','_skills','Game_BattlerBase_decreaseBuff','clear','states','helpWindowRect','XKxMY','statusWindowRectSkillsStatesCore','ACeGw','tXfbE','skillTypeWindowRectSkillsStatesCore','onDatabaseLoaded','rhpEH','tpCost','VQJls','Scene_Skill_createItemWindow','enemy','Costs','yHHnF','TurnOffsetY','statePassiveConditionJS','aliveMembers','rgba(0,\x200,\x200,\x201)','mainAreaTop','isDebuffAffected','Settings','addBuff','remove','decreaseBuff','Sprite_Gauge_currentValue','skillTypeWindowRect','JZVSh','_statusWindow','onAddDebuffGlobalJS','anchor','ColorPositive','regenerateAllSkillsStatesCore','mNbAs'];_0x42b7=function(){return _0x317b98;};return _0x42b7();}VisuMZ[label][_0x2e8d91(0x325)]=VisuMZ[label][_0x2e8d91(0x325)]||{},VisuMZ['ConvertParams']=function(_0x151035,_0xa79b58){const _0x541f0b=_0x2e8d91;for(const _0x6101d3 in _0xa79b58){if(_0x6101d3['match'](/(.*):(.*)/i)){const _0x2c3e53=String(RegExp['$1']),_0x44a116=String(RegExp['$2'])[_0x541f0b(0x383)]()['trim']();let _0x139313,_0x2b48b1,_0x27e03b;switch(_0x44a116){case _0x541f0b(0x24c):_0x139313=_0xa79b58[_0x6101d3]!==''?Number(_0xa79b58[_0x6101d3]):0x0;break;case _0x541f0b(0x28a):_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1['map'](_0x35bc2d=>Number(_0x35bc2d));break;case _0x541f0b(0x213):_0x139313=_0xa79b58[_0x6101d3]!==''?eval(_0xa79b58[_0x6101d3]):null;break;case _0x541f0b(0x2a9):_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1[_0x541f0b(0x3d9)](_0x3eaef5=>eval(_0x3eaef5));break;case'JSON':_0x139313=_0xa79b58[_0x6101d3]!==''?JSON['parse'](_0xa79b58[_0x6101d3]):'';break;case _0x541f0b(0x22a):_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1['map'](_0x5c1e04=>JSON[_0x541f0b(0x372)](_0x5c1e04));break;case _0x541f0b(0x1d7):_0x139313=_0xa79b58[_0x6101d3]!==''?new Function(JSON['parse'](_0xa79b58[_0x6101d3])):new Function(_0x541f0b(0x301));break;case'ARRAYFUNC':_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1[_0x541f0b(0x3d9)](_0xa94ca=>new Function(JSON[_0x541f0b(0x372)](_0xa94ca)));break;case'STR':_0x139313=_0xa79b58[_0x6101d3]!==''?String(_0xa79b58[_0x6101d3]):'';break;case'ARRAYSTR':_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1[_0x541f0b(0x3d9)](_0x1145a3=>String(_0x1145a3));break;case'STRUCT':_0x27e03b=_0xa79b58[_0x6101d3]!==''?JSON[_0x541f0b(0x372)](_0xa79b58[_0x6101d3]):{},_0x151035[_0x2c3e53]={},VisuMZ[_0x541f0b(0x237)](_0x151035[_0x2c3e53],_0x27e03b);continue;case _0x541f0b(0x248):_0x2b48b1=_0xa79b58[_0x6101d3]!==''?JSON['parse'](_0xa79b58[_0x6101d3]):[],_0x139313=_0x2b48b1[_0x541f0b(0x3d9)](_0x9e3211=>VisuMZ[_0x541f0b(0x237)]({},JSON[_0x541f0b(0x372)](_0x9e3211)));break;default:continue;}_0x151035[_0x2c3e53]=_0x139313;}}return _0x151035;},(_0x23cfee=>{const _0xca196c=_0x2e8d91,_0x5039ed=_0x23cfee[_0xca196c(0x3be)];for(const _0x12c262 of dependencies){if(!Imported[_0x12c262]){if('PjtGQ'===_0xca196c(0x206))this[_0xca196c(0x33f)](_0x13b1f7);else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xca196c(0x49e)](_0x5039ed,_0x12c262)),SceneManager[_0xca196c(0x2f5)]();break;}}}const _0x51db0c=_0x23cfee[_0xca196c(0x2be)];if(_0x51db0c[_0xca196c(0x269)](/\[Version[ ](.*?)\]/i)){const _0x2d89d7=Number(RegExp['$1']);_0x2d89d7!==VisuMZ[label][_0xca196c(0x307)]&&(alert(_0xca196c(0x259)[_0xca196c(0x49e)](_0x5039ed,_0x2d89d7)),SceneManager['exit']());}if(_0x51db0c[_0xca196c(0x269)](/\[Tier[ ](\d+)\]/i)){if('bOpdO'!==_0xca196c(0x2e0)){const _0x17a63d=Number(RegExp['$1']);if(_0x17a63d<tier)alert(_0xca196c(0x2b3)['format'](_0x5039ed,_0x17a63d,tier)),SceneManager['exit']();else{if(_0xca196c(0x2a3)!==_0xca196c(0x486))tier=Math[_0xca196c(0x25b)](_0x17a63d,tier);else return _0x3ccbab[_0xca196c(0x367)]['Sprite_Gauge_currentMaxValue']['call'](this);}}else{let _0x206d8e=[this[_0xca196c(0x31c)]()];return _0x206d8e['concat'](this[_0xca196c(0x3b6)]());}}VisuMZ[_0xca196c(0x237)](VisuMZ[label][_0xca196c(0x325)],_0x23cfee[_0xca196c(0x479)]);})(pluginData),VisuMZ['SkillsStatesCore'][_0x2e8d91(0x44b)]=Scene_Boot[_0x2e8d91(0x309)][_0x2e8d91(0x317)],Scene_Boot[_0x2e8d91(0x309)][_0x2e8d91(0x317)]=function(){const _0x7e7967=_0x2e8d91;VisuMZ[_0x7e7967(0x367)][_0x7e7967(0x44b)]['call'](this),this[_0x7e7967(0x222)](),VisuMZ[_0x7e7967(0x367)][_0x7e7967(0x296)]();},Scene_Boot['prototype'][_0x2e8d91(0x222)]=function(){const _0x515108=_0x2e8d91;if(VisuMZ[_0x515108(0x4b2)])return;this[_0x515108(0x249)](),this[_0x515108(0x2d0)]();},Scene_Boot[_0x2e8d91(0x309)][_0x2e8d91(0x249)]=function(){const _0x2cd1e8=_0x2e8d91;for(const _0x347170 of $dataSkills){if(!_0x347170)continue;VisuMZ[_0x2cd1e8(0x367)]['Parse_Notetags_Skill_Cost'](_0x347170),VisuMZ[_0x2cd1e8(0x367)][_0x2cd1e8(0x392)](_0x347170);}},Scene_Boot[_0x2e8d91(0x309)][_0x2e8d91(0x2d0)]=function(){const _0x5d4a17=_0x2e8d91;for(const _0x4e7314 of $dataStates){if(!_0x4e7314)continue;VisuMZ['SkillsStatesCore'][_0x5d4a17(0x343)](_0x4e7314),VisuMZ[_0x5d4a17(0x367)][_0x5d4a17(0x48b)](_0x4e7314),VisuMZ[_0x5d4a17(0x367)][_0x5d4a17(0x393)](_0x4e7314),VisuMZ[_0x5d4a17(0x367)][_0x5d4a17(0x4af)](_0x4e7314);}},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x4a5)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x2e8d91(0x4a5)]=function(_0x395882){const _0x4a801a=_0x2e8d91;VisuMZ[_0x4a801a(0x367)]['ParseSkillNotetags']['call'](this,_0x395882),VisuMZ[_0x4a801a(0x367)][_0x4a801a(0x203)](_0x395882),VisuMZ[_0x4a801a(0x367)][_0x4a801a(0x392)](_0x395882);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x493)]=VisuMZ[_0x2e8d91(0x493)],VisuMZ[_0x2e8d91(0x493)]=function(_0x1da61a){const _0x1ff179=_0x2e8d91;VisuMZ[_0x1ff179(0x367)]['ParseStateNotetags'][_0x1ff179(0x1df)](this,_0x1da61a),VisuMZ[_0x1ff179(0x367)][_0x1ff179(0x343)](_0x1da61a),VisuMZ[_0x1ff179(0x367)]['Parse_Notetags_State_PassiveJS'](_0x1da61a),VisuMZ[_0x1ff179(0x367)]['Parse_Notetags_State_SlipEffectJS'](_0x1da61a),VisuMZ[_0x1ff179(0x367)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x1da61a);},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x203)]=function(_0xfd117){const _0x2fed21=_0x2e8d91,_0x2631ad=_0xfd117[_0x2fed21(0x417)];if(_0x2631ad[_0x2fed21(0x269)](/<MP COST:[ ](\d+)>/i)){if('kbLXE'!=='kbLXE'){if(typeof _0xc22c57!==_0x2fed21(0x267))_0x10b8e4=_0x58285d['id'];return this[_0x2fed21(0x41b)][_0x146919]||0x0;}else _0xfd117[_0x2fed21(0x239)]=Number(RegExp['$1']);}if(_0x2631ad[_0x2fed21(0x269)](/<TP COST:[ ](\d+)>/i)){if(_0x2fed21(0x1b5)==='XvNfQ'){if(!_0x4bf098['hasSkill'](_0x5e15cc))return![];}else _0xfd117[_0x2fed21(0x319)]=Number(RegExp['$1']);}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x49b)]={},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x2db)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x392)]=function(_0xdbd534){const _0x597039=_0x2e8d91,_0x1af53d=_0xdbd534[_0x597039(0x417)];if(_0x1af53d['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x203fde=String(RegExp['$1']),_0x23e8d1=_0x597039(0x362)['format'](_0x203fde);VisuMZ[_0x597039(0x367)][_0x597039(0x49b)][_0xdbd534['id']]=new Function(_0x597039(0x2ed),_0x23e8d1);}if(_0x1af53d['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4fdd8b=String(RegExp['$1']),_0x488744=_0x597039(0x3a0)['format'](_0x4fdd8b);VisuMZ['SkillsStatesCore'][_0x597039(0x2db)][_0xdbd534['id']]=new Function('skill',_0x488744);}},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x343)]=function(_0x2894c){const _0x22e26d=_0x2e8d91;_0x2894c[_0x22e26d(0x47c)]=[_0x22e26d(0x33b),_0x22e26d(0x1c9)];const _0x597e77=_0x2894c[_0x22e26d(0x417)],_0x1b42db=_0x597e77[_0x22e26d(0x269)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1b42db)for(const _0x77f67 of _0x1b42db){if(_0x22e26d(0x3c1)!==_0x22e26d(0x42b)){_0x77f67['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x8bb93e=String(RegExp['$1'])[_0x22e26d(0x383)]()[_0x22e26d(0x265)]()['split'](',');for(const _0x1c9d0b of _0x8bb93e){_0x2894c[_0x22e26d(0x47c)][_0x22e26d(0x2d2)](_0x1c9d0b[_0x22e26d(0x265)]());}}else for(const _0x554ac8 of _0x127dea){_0x554ac8[_0x22e26d(0x269)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x28dc9a=_0x2c3025(_0x6b3907['$1'])[_0x22e26d(0x383)]()['trim']()[_0x22e26d(0x21e)](',');for(const _0x26140b of _0x28dc9a){_0x39a7b6[_0x22e26d(0x47c)][_0x22e26d(0x2d2)](_0x26140b[_0x22e26d(0x265)]());}}}if(_0x597e77[_0x22e26d(0x269)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x22e26d(0x3f0)===_0x22e26d(0x3f0)){const _0x5ac622=RegExp['$1'][_0x22e26d(0x21e)](/[\r\n]+/);for(const _0x5b36ba of _0x5ac622){_0x2894c[_0x22e26d(0x47c)]['push'](_0x5b36ba['toUpperCase']()[_0x22e26d(0x265)]());}}else{if(_0x3aabf2['isLearnedSkill'](_0x2444fe))return!![];}}_0x597e77[_0x22e26d(0x269)](/<POSITIVE STATE>/i)&&('whTII'==='whTII'?_0x2894c['categories']['push'](_0x22e26d(0x2d1)):(_0x586f76[_0x22e26d(0x367)][_0x22e26d(0x3fc)][_0x22e26d(0x1df)](this,_0x1a90bc,_0x3f0ec4),this[_0x22e26d(0x324)](_0x322cf7)&&this[_0x22e26d(0x375)](_0x3be0c6,_0x1ac26e)));if(_0x597e77[_0x22e26d(0x269)](/<NEGATIVE STATE>/i)){if('Pvpoi'===_0x22e26d(0x279))_0x2894c[_0x22e26d(0x47c)][_0x22e26d(0x2d2)]('NEGATIVE');else return this[_0x22e26d(0x2a8)]&&this[_0x22e26d(0x2a8)]['isUseModernControls']();}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x320)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x48b)]=function(_0x742c71){const _0x453a64=_0x2e8d91,_0x49a8c6=_0x742c71[_0x453a64(0x417)];if(_0x49a8c6[_0x453a64(0x269)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x4e6eaf=String(RegExp['$1']),_0x2d978b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x453a64(0x49e)](_0x4e6eaf);VisuMZ['SkillsStatesCore'][_0x453a64(0x320)][_0x742c71['id']]=new Function(_0x453a64(0x408),_0x2d978b);}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x24d)]={},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x49f)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x333)]={},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x3f8)]={},VisuMZ[_0x2e8d91(0x367)]['stateTpSlipDamageJS']={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x2ae)]={},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x393)]=function(_0x1a1067){const _0x23ded5=_0x2e8d91,_0x172e94=_0x1a1067[_0x23ded5(0x417)],_0x3a42b2=_0x23ded5(0x36b);if(_0x172e94[_0x23ded5(0x269)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x13f873=String(RegExp['$1']),_0x19efb6=_0x3a42b2[_0x23ded5(0x49e)](_0x13f873,_0x23ded5(0x3bd),-0x1,_0x23ded5(0x298));VisuMZ[_0x23ded5(0x367)]['stateHpSlipDamageJS'][_0x1a1067['id']]=new Function(_0x23ded5(0x2bf),_0x19efb6);}else{if(_0x172e94[_0x23ded5(0x269)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x381b0c=String(RegExp['$1']),_0xf9bd65=_0x3a42b2[_0x23ded5(0x49e)](_0x381b0c,_0x23ded5(0x48e),0x1,_0x23ded5(0x298));VisuMZ[_0x23ded5(0x367)]['stateHpSlipHealJS'][_0x1a1067['id']]=new Function(_0x23ded5(0x2bf),_0xf9bd65);}}if(_0x172e94[_0x23ded5(0x269)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x33f1cb=String(RegExp['$1']),_0x462a8d=_0x3a42b2['format'](_0x33f1cb,_0x23ded5(0x3bd),-0x1,_0x23ded5(0x477));VisuMZ[_0x23ded5(0x367)][_0x23ded5(0x333)][_0x1a1067['id']]=new Function(_0x23ded5(0x2bf),_0x462a8d);}else{if(_0x172e94['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x23ded5(0x315)!==_0x23ded5(0x315))this[_0x23ded5(0x405)]();else{const _0x99c1b2=String(RegExp['$1']),_0x4ee762=_0x3a42b2[_0x23ded5(0x49e)](_0x99c1b2,'heal',0x1,_0x23ded5(0x477));VisuMZ[_0x23ded5(0x367)][_0x23ded5(0x3f8)][_0x1a1067['id']]=new Function(_0x23ded5(0x2bf),_0x4ee762);}}}if(_0x172e94[_0x23ded5(0x269)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x50ce84=String(RegExp['$1']),_0x1152ff=_0x3a42b2[_0x23ded5(0x49e)](_0x50ce84,_0x23ded5(0x3bd),-0x1,_0x23ded5(0x3b0));VisuMZ['SkillsStatesCore'][_0x23ded5(0x1f0)][_0x1a1067['id']]=new Function('stateId',_0x1152ff);}else{if(_0x172e94[_0x23ded5(0x269)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('OJIzn'===_0x23ded5(0x1e1))for(_0x117bb6 of _0x4af0a5[_0x23ded5(0x367)]['Settings'][_0x23ded5(0x31d)]){const _0x54f746=_0x3e59de[_0x23ded5(0x2a2)][_0x23ded5(0x1df)](this,_0x39920d);_0x35d40b[_0x23ded5(0x29c)][_0x23ded5(0x1df)](this,_0xdec436,_0x54f746);}else{const _0x11112d=String(RegExp['$1']),_0x4ef56c=_0x3a42b2[_0x23ded5(0x49e)](_0x11112d,'heal',0x1,_0x23ded5(0x3b0));VisuMZ[_0x23ded5(0x367)][_0x23ded5(0x2ae)][_0x1a1067['id']]=new Function(_0x23ded5(0x2bf),_0x4ef56c);}}}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x30c)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x37c)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x2c6)]={},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x4af)]=function(_0x162d74){const _0x1d9d60=_0x2e8d91,_0x15cf8f=_0x162d74[_0x1d9d60(0x417)],_0x74323=_0x1d9d60(0x38e);if(_0x15cf8f[_0x1d9d60(0x269)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x254317=String(RegExp['$1']),_0x32e11e=_0x74323[_0x1d9d60(0x49e)](_0x254317);VisuMZ['SkillsStatesCore'][_0x1d9d60(0x30c)][_0x162d74['id']]=new Function(_0x1d9d60(0x2bf),_0x32e11e);}if(_0x15cf8f[_0x1d9d60(0x269)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x3197a5=String(RegExp['$1']),_0x662498=_0x74323[_0x1d9d60(0x49e)](_0x3197a5);VisuMZ['SkillsStatesCore'][_0x1d9d60(0x37c)][_0x162d74['id']]=new Function(_0x1d9d60(0x2bf),_0x662498);}if(_0x15cf8f[_0x1d9d60(0x269)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if('ktLDX'!==_0x1d9d60(0x3c9))for(const _0x1f5b3e of _0x5965fa){_0x1f5b3e[_0x1d9d60(0x269)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x44d467=_0x10de28(_0x4de695['$1']),_0x5e9448=_0x50de6c(_0x3d221e['$2']);_0x47d665[_0x1d9d60(0x444)](_0x44d467,_0x5e9448);}else{const _0x1a7d24=String(RegExp['$1']),_0x8b4d3e=_0x74323['format'](_0x1a7d24);VisuMZ['SkillsStatesCore'][_0x1d9d60(0x2c6)][_0x162d74['id']]=new Function(_0x1d9d60(0x2bf),_0x8b4d3e);}}},VisuMZ[_0x2e8d91(0x367)]['CheckIncompatibleStates']=function(){const _0x4b8abc=_0x2e8d91;if(!VisuMZ[_0x4b8abc(0x367)][_0x4b8abc(0x325)][_0x4b8abc(0x1d6)][_0x4b8abc(0x46e)])return;for(const _0x5b3857 of $dataStates){if(_0x4b8abc(0x2c2)===_0x4b8abc(0x2c2)){if(!_0x5b3857)continue;_0x5b3857['restriction']===0x4&&_0x5b3857['autoRemovalTiming']===0x1&&(_0x4b8abc(0x431)!==_0x4b8abc(0x401)?_0x5b3857['autoRemovalTiming']=0x2:(_0x184ea5(_0x4b8abc(0x2b3)['format'](_0x561189,_0x4cd049,_0x286d06)),_0x552e48['exit']()));}else{if(this[_0x4b8abc(0x439)]||this[_0x4b8abc(0x3b8)])return;const _0x584690=_0x383735[_0x4b8abc(0x367)][_0x4b8abc(0x2c6)];if(_0x584690[_0x2623b4])_0x584690[_0x14de4a][_0x4b8abc(0x1df)](this,_0x532f9c);}}},DataManager['getClassIdWithName']=function(_0x34c3e5){const _0x17c91e=_0x2e8d91;_0x34c3e5=_0x34c3e5[_0x17c91e(0x383)]()[_0x17c91e(0x265)](),this[_0x17c91e(0x351)]=this[_0x17c91e(0x351)]||{};if(this['_classIDs'][_0x34c3e5])return this['_classIDs'][_0x34c3e5];for(const _0x27a5d5 of $dataClasses){if(!_0x27a5d5)continue;let _0x14a46f=_0x27a5d5[_0x17c91e(0x3be)];_0x14a46f=_0x14a46f['replace'](/\x1I\[(\d+)\]/gi,''),_0x14a46f=_0x14a46f['replace'](/\\I\[(\d+)\]/gi,''),this[_0x17c91e(0x351)][_0x14a46f['toUpperCase']()[_0x17c91e(0x265)]()]=_0x27a5d5['id'];}return this[_0x17c91e(0x351)][_0x34c3e5]||0x0;},DataManager[_0x2e8d91(0x39d)]=function(_0x248b31){const _0x49e7dc=_0x2e8d91;this[_0x49e7dc(0x332)]=this[_0x49e7dc(0x332)]||{};if(this[_0x49e7dc(0x332)][_0x248b31['id']])return this['_stypeIDs'][_0x248b31['id']];this[_0x49e7dc(0x332)][_0x248b31['id']]=[_0x248b31[_0x49e7dc(0x353)]];if(_0x248b31[_0x49e7dc(0x417)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5686e0=JSON[_0x49e7dc(0x372)]('['+RegExp['$1'][_0x49e7dc(0x269)](/\d+/g)+']');this['_stypeIDs'][_0x248b31['id']]=this[_0x49e7dc(0x332)][_0x248b31['id']][_0x49e7dc(0x2ff)](_0x5686e0);}else{if(_0x248b31[_0x49e7dc(0x417)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x49e7dc(0x1f4)!==_0x49e7dc(0x20f)){const _0x5a0768=RegExp['$1']['split'](',');for(const _0x586871 of _0x5a0768){const _0xac8f44=DataManager[_0x49e7dc(0x1d8)](_0x586871);if(_0xac8f44)this['_stypeIDs'][_0x248b31['id']][_0x49e7dc(0x2d2)](_0xac8f44);}}else{if(_0x326e3a&&this[_0x49e7dc(0x2b5)](_0x3d5a83))this[_0x49e7dc(0x45e)](_0x182f12['id']);}}}return this[_0x49e7dc(0x332)][_0x248b31['id']];},DataManager['getStypeIdWithName']=function(_0x20f9ed){const _0x330b76=_0x2e8d91;_0x20f9ed=_0x20f9ed[_0x330b76(0x383)]()['trim'](),this['_stypeIDs']=this[_0x330b76(0x332)]||{};if(this[_0x330b76(0x332)][_0x20f9ed])return this['_stypeIDs'][_0x20f9ed];for(let _0x5442ea=0x1;_0x5442ea<0x64;_0x5442ea++){if(_0x330b76(0x36e)!=='bogSw'){const _0x4fafd4=_0xdf6c03[_0x330b76(0x372)]('['+_0x4e4871['$1'][_0x330b76(0x269)](/\d+/g)+']');for(const _0x26a357 of _0x4fafd4){if(!_0x33bdac['hasSkill'](_0x26a357))return![];}return!![];}else{if(!$dataSystem['skillTypes'][_0x5442ea])continue;let _0x15faa4=$dataSystem[_0x330b76(0x42a)][_0x5442ea][_0x330b76(0x383)]()['trim']();_0x15faa4=_0x15faa4[_0x330b76(0x403)](/\x1I\[(\d+)\]/gi,''),_0x15faa4=_0x15faa4['replace'](/\\I\[(\d+)\]/gi,''),this[_0x330b76(0x332)][_0x15faa4]=_0x5442ea;}}return this[_0x330b76(0x332)][_0x20f9ed]||0x0;},DataManager[_0x2e8d91(0x3dd)]=function(_0x1f5e86){const _0x47ff64=_0x2e8d91;_0x1f5e86=_0x1f5e86[_0x47ff64(0x383)]()[_0x47ff64(0x265)](),this[_0x47ff64(0x207)]=this[_0x47ff64(0x207)]||{};if(this[_0x47ff64(0x207)][_0x1f5e86])return this[_0x47ff64(0x207)][_0x1f5e86];for(const _0x381c28 of $dataSkills){if(!_0x381c28)continue;this[_0x47ff64(0x207)][_0x381c28[_0x47ff64(0x3be)][_0x47ff64(0x383)]()[_0x47ff64(0x265)]()]=_0x381c28['id'];}return this[_0x47ff64(0x207)][_0x1f5e86]||0x0;},DataManager['getStateIdWithName']=function(_0x40b13c){const _0x2de349=_0x2e8d91;_0x40b13c=_0x40b13c[_0x2de349(0x383)]()[_0x2de349(0x265)](),this[_0x2de349(0x49a)]=this[_0x2de349(0x49a)]||{};if(this[_0x2de349(0x49a)][_0x40b13c])return this[_0x2de349(0x49a)][_0x40b13c];for(const _0x4c6558 of $dataStates){if(_0x2de349(0x47d)!==_0x2de349(0x47d))this['drawActorStateTurns'](_0x453d75,_0x54a634,_0x4c0737,_0x4bef2b);else{if(!_0x4c6558)continue;this['_stateIDs'][_0x4c6558[_0x2de349(0x3be)][_0x2de349(0x383)]()[_0x2de349(0x265)]()]=_0x4c6558['id'];}}return this['_stateIDs'][_0x40b13c]||0x0;},DataManager[_0x2e8d91(0x253)]=function(_0x438b82){const _0x3e5798=_0x2e8d91;this['_stateMaxTurns']=this[_0x3e5798(0x40c)]||{};if(this[_0x3e5798(0x40c)][_0x438b82])return this[_0x3e5798(0x40c)][_0x438b82];if($dataStates[_0x438b82][_0x3e5798(0x417)]['match'](/<MAX TURNS:[ ](\d+)>/i)){if(_0x3e5798(0x461)!=='QbLIV')this[_0x3e5798(0x40c)][_0x438b82]=Number(RegExp['$1']);else return!this[_0x3e5798(0x2d9)](_0x8f843b)&&!this[_0x3e5798(0x1f5)](_0x358528)&&!this[_0x3e5798(0x426)][_0x3e5798(0x3c2)](_0x204025);}else this[_0x3e5798(0x40c)][_0x438b82]=VisuMZ['SkillsStatesCore']['Settings']['States'][_0x3e5798(0x3e1)];return this[_0x3e5798(0x40c)][_0x438b82];},ColorManager['getColorDataFromPluginParameters']=function(_0x517850,_0x5af04b){const _0x1f0281=_0x2e8d91;_0x5af04b=String(_0x5af04b),this[_0x1f0281(0x4a0)]=this['_colorCache']||{};if(_0x5af04b[_0x1f0281(0x269)](/#(.*)/i))this['_colorCache'][_0x517850]=_0x1f0281(0x1cc)[_0x1f0281(0x49e)](String(RegExp['$1']));else{if(_0x1f0281(0x34c)!==_0x1f0281(0x31a))this[_0x1f0281(0x4a0)][_0x517850]=this['textColor'](Number(_0x5af04b));else{if(!_0x46d970['isLearnedSkill'](_0x5d7653))return![];}}return this[_0x1f0281(0x4a0)][_0x517850];},ColorManager['getColor']=function(_0x559d7c){const _0x8ab8e0=_0x2e8d91;return _0x559d7c=String(_0x559d7c),_0x559d7c['match'](/#(.*)/i)?_0x8ab8e0(0x1cc)[_0x8ab8e0(0x49e)](String(RegExp['$1'])):this[_0x8ab8e0(0x234)](Number(_0x559d7c));},ColorManager['stateColor']=function(_0xbdde4f){const _0x3cc648=_0x2e8d91;if(typeof _0xbdde4f==='number')_0xbdde4f=$dataStates[_0xbdde4f];const _0x1de569='_stored_state-%1-color'[_0x3cc648(0x49e)](_0xbdde4f['id']);this['_colorCache']=this[_0x3cc648(0x4a0)]||{};if(this['_colorCache'][_0x1de569])return this['_colorCache'][_0x1de569];const _0x200ca7=this[_0x3cc648(0x2a1)](_0xbdde4f);return this[_0x3cc648(0x2f9)](_0x1de569,_0x200ca7);},ColorManager[_0x2e8d91(0x2a1)]=function(_0x15958f){const _0x676b11=_0x2e8d91,_0x2b99b8=_0x15958f[_0x676b11(0x417)];if(_0x2b99b8[_0x676b11(0x269)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2b99b8['match'](/<POSITIVE STATE>/i))return VisuMZ[_0x676b11(0x367)][_0x676b11(0x325)]['States'][_0x676b11(0x32f)];else return _0x2b99b8[_0x676b11(0x269)](/<NEGATIVE STATE>/i)?VisuMZ[_0x676b11(0x367)][_0x676b11(0x325)]['States'][_0x676b11(0x4a6)]:VisuMZ[_0x676b11(0x367)][_0x676b11(0x325)][_0x676b11(0x1d6)]['ColorNeutral'];}},ColorManager[_0x2e8d91(0x2bd)]=function(){const _0x420c63=_0x2e8d91,_0x20834b=_0x420c63(0x428);this[_0x420c63(0x4a0)]=this[_0x420c63(0x4a0)]||{};if(this[_0x420c63(0x4a0)][_0x20834b])return this[_0x420c63(0x4a0)][_0x20834b];const _0x73f78f=VisuMZ[_0x420c63(0x367)][_0x420c63(0x325)]['Buffs']['ColorBuff'];return this[_0x420c63(0x2f9)](_0x20834b,_0x73f78f);},ColorManager[_0x2e8d91(0x3f2)]=function(){const _0x2e3f89=_0x2e8d91,_0x29a0a2=_0x2e3f89(0x24e);this[_0x2e3f89(0x4a0)]=this[_0x2e3f89(0x4a0)]||{};if(this[_0x2e3f89(0x4a0)][_0x29a0a2])return this[_0x2e3f89(0x4a0)][_0x29a0a2];const _0x367e93=VisuMZ['SkillsStatesCore'][_0x2e3f89(0x325)][_0x2e3f89(0x29f)][_0x2e3f89(0x2c8)];return this[_0x2e3f89(0x2f9)](_0x29a0a2,_0x367e93);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x40e)]=BattleManager[_0x2e8d91(0x1c8)],BattleManager['endAction']=function(){const _0x539b4c=_0x2e8d91;this[_0x539b4c(0x214)](),VisuMZ[_0x539b4c(0x367)][_0x539b4c(0x40e)]['call'](this);},BattleManager[_0x2e8d91(0x214)]=function(){const _0x4daf08=_0x2e8d91,_0x5ca6ef=VisuMZ[_0x4daf08(0x367)]['Settings'][_0x4daf08(0x1d6)];if(!_0x5ca6ef)return;if(_0x5ca6ef['ActionEndUpdate']===![])return;if(!this[_0x4daf08(0x200)])return;this[_0x4daf08(0x200)][_0x4daf08(0x214)]();},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x214)]=function(){const _0x1aec67=_0x2e8d91;if(BattleManager[_0x1aec67(0x28e)]!=='action')return;if(this[_0x1aec67(0x3f3)]===Graphics[_0x1aec67(0x24f)])return;this[_0x1aec67(0x3f3)]=Graphics[_0x1aec67(0x24f)];for(const _0x3a85d9 of this[_0x1aec67(0x48d)]){const _0x22368a=$dataStates[_0x3a85d9];if(!_0x22368a)continue;if(_0x22368a['autoRemovalTiming']!==0x1)continue;this['_stateTurns'][_0x3a85d9]>0x0&&this[_0x1aec67(0x41b)][_0x3a85d9]--;}this[_0x1aec67(0x27b)](0x1);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x386)]=function(){const _0xc4ddca=_0x2e8d91,_0x2dc968=VisuMZ[_0xc4ddca(0x367)][_0xc4ddca(0x325)][_0xc4ddca(0x1d6)];for(const _0x5ea0e7 of this[_0xc4ddca(0x48d)]){if(_0xc4ddca(0x433)===_0xc4ddca(0x433)){const _0x267f1b=$dataStates[_0x5ea0e7];if(_0x2dc968&&_0x2dc968['ActionEndUpdate']!==![]){if(_0x267f1b&&_0x267f1b['autoRemovalTiming']===0x1)continue;}this[_0xc4ddca(0x41b)][_0x5ea0e7]>0x0&&this[_0xc4ddca(0x41b)][_0x5ea0e7]--;}else this[_0xc4ddca(0x32d)](_0x503684,_0x40a852);}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x2d5)]=Game_Action[_0x2e8d91(0x309)][_0x2e8d91(0x1ad)],Game_Action[_0x2e8d91(0x309)][_0x2e8d91(0x1ad)]=function(_0x30641f){const _0x5bc7b9=_0x2e8d91;VisuMZ[_0x5bc7b9(0x367)][_0x5bc7b9(0x2d5)]['call'](this,_0x30641f),this['applySkillsStatesCoreEffects'](_0x30641f);},Game_Action[_0x2e8d91(0x309)][_0x2e8d91(0x44e)]=function(_0x3cd5c0){const _0xb3a135=_0x2e8d91;this[_0xb3a135(0x2a7)](_0x3cd5c0),this[_0xb3a135(0x455)](_0x3cd5c0),this[_0xb3a135(0x422)](_0x3cd5c0),this['applyDebuffTurnManipulationEffects'](_0x3cd5c0);},VisuMZ[_0x2e8d91(0x367)]['Game_Action_testApply']=Game_Action['prototype']['testApply'],Game_Action[_0x2e8d91(0x309)]['testApply']=function(_0x1504ce){const _0x59b363=_0x2e8d91;if(this[_0x59b363(0x3df)](_0x1504ce)){if(_0x59b363(0x3fd)===_0x59b363(0x38d)){if(typeof _0x2b963b!==_0x59b363(0x267))_0x279324=_0x3ca322['id'];const _0x280f12=this['stateData'](_0x315641);_0x280f12[_0x410247]=_0x15f0f4;}else return!![];}return VisuMZ[_0x59b363(0x367)]['Game_Action_testApply'][_0x59b363(0x1df)](this,_0x1504ce);},Game_Action['prototype']['testSkillStatesCoreNotetags']=function(_0x560721){const _0x32bf90=_0x2e8d91,_0xb8bc76=this[_0x32bf90(0x2dd)]()['note'];if(_0xb8bc76[_0x32bf90(0x269)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x461a25=String(RegExp['$1']);if(_0x560721[_0x32bf90(0x361)](_0x461a25))return!![];}if(_0xb8bc76[_0x32bf90(0x269)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x5c409a=Number(RegExp['$1']);if(_0x560721[_0x32bf90(0x1b4)](_0x5c409a))return!![];}else{if(_0xb8bc76['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x32bf90(0x438)!==_0x32bf90(0x33d)){const _0x1e31fb=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x560721[_0x32bf90(0x1b4)](_0x1e31fb))return!![];}else this[_0x32bf90(0x2ad)]['fontFace']=_0x598ae9[_0x32bf90(0x441)](),this[_0x32bf90(0x2ad)][_0x32bf90(0x35a)]=_0x5b4a16[_0x32bf90(0x3a6)](),this[_0x32bf90(0x21b)]();}}return![];},Game_Action[_0x2e8d91(0x309)]['applyStateCategoryRemovalEffects']=function(_0x222dd3){const _0x75c6ef=_0x2e8d91;if(_0x222dd3[_0x75c6ef(0x310)]()[_0x75c6ef(0x3f6)]<=0x0)return;const _0x4455ab=this[_0x75c6ef(0x2dd)]()['note'];{const _0x2fdce1=_0x4455ab['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x2fdce1){if(_0x75c6ef(0x373)===_0x75c6ef(0x3c4))return this[_0x75c6ef(0x232)]=this[_0x75c6ef(0x232)]||{},this[_0x75c6ef(0x232)][_0x5e83ae]!==_0x57d9d9;else for(const _0x5cb819 of _0x2fdce1){_0x5cb819['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x48269b=String(RegExp['$1']);_0x222dd3['removeStatesByCategoryAll'](_0x48269b);}}}{const _0x10f970=_0x4455ab[_0x75c6ef(0x269)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x10f970){if(_0x75c6ef(0x3f5)===_0x75c6ef(0x4b7)){let _0x46c865=_0x179b76[_0x75c6ef(0x367)][_0x75c6ef(0x4aa)]['call'](this);if(_0x201ed5[_0x75c6ef(0x286)])return _0x46c865;return _0x3e6604[_0x75c6ef(0x286)]=!![],this[_0x75c6ef(0x1f1)](_0x46c865),_0x472951['_checkingPassiveStates']=_0x586e08,_0x46c865;}else for(const _0x10e3fd of _0x10f970){_0x10e3fd[_0x75c6ef(0x269)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4549f2=String(RegExp['$1']),_0x3d50ff=Number(RegExp['$2']);_0x222dd3[_0x75c6ef(0x444)](_0x4549f2,_0x3d50ff);}}}},Game_Action[_0x2e8d91(0x309)]['applyStateTurnManipulationEffects']=function(_0x3660ad){const _0x4d5c83=_0x2e8d91,_0x3e542c=this[_0x4d5c83(0x2dd)]()[_0x4d5c83(0x417)],_0x50f20b=_0x3e542c[_0x4d5c83(0x269)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x50f20b){if('ToxMh'===_0x4d5c83(0x499))for(const _0x65d99f of _0x50f20b){let _0x338589=0x0,_0x1d6d2e=0x0;if(_0x65d99f[_0x4d5c83(0x269)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x4d5c83(0x1d9)==='HWbsN')for(let _0x24b022=0x0;_0x24b022<this[_0x4d5c83(0x272)]();_0x24b022++){if(this[_0x4d5c83(0x1e3)](_0x24b022)){const _0x549764=this[_0x4d5c83(0x43c)][_0x24b022];this[_0x4d5c83(0x45d)](_0x24b022);if(_0x549764>0x0)this[_0x4d5c83(0x1e7)](_0x24b022);if(_0x549764<0x0)this['onExpireDebuff'](_0x24b022);}}else _0x338589=Number(RegExp['$1']),_0x1d6d2e=Number(RegExp['$2']);}else{if(_0x65d99f[_0x4d5c83(0x269)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x4d5c83(0x2c9)!==_0x4d5c83(0x2c9))for(const _0x5f33e2 of _0x50599c){_0x5f33e2[_0x4d5c83(0x269)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xe6b8a5=_0x4ad757['indexOf'](_0x3b48cc(_0x5a6636['$1'])[_0x4d5c83(0x383)]()),_0x14b9a4=_0x1b10d3(_0x140d3b['$2']);_0xe6b8a5>=0x0&&(_0xdce5af[_0x4d5c83(0x26c)](_0xe6b8a5,_0x14b9a4),this['makeSuccess'](_0x485f33));}else _0x338589=DataManager[_0x4d5c83(0x3e9)](RegExp['$1']),_0x1d6d2e=Number(RegExp['$2']);}}_0x3660ad[_0x4d5c83(0x43f)](_0x338589,_0x1d6d2e),this[_0x4d5c83(0x378)](_0x3660ad);}else this[_0x4d5c83(0x324)](_0x28655a)&&(_0x49d114+=this[_0x4d5c83(0x266)](_0x4afe00),this[_0x4d5c83(0x43f)](_0x206cac,_0x5a466f));}const _0x44d53e=_0x3e542c[_0x4d5c83(0x269)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x44d53e)for(const _0x51a0bf of _0x44d53e){if(_0x4d5c83(0x3a7)!==_0x4d5c83(0x3a7))this[_0x4d5c83(0x2eb)][_0x4d5c83(0x4b6)][_0x4d5c83(0x1df)](this);else{let _0x207163=0x0,_0x5014af=0x0;if(_0x51a0bf[_0x4d5c83(0x269)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x207163=Number(RegExp['$1']),_0x5014af=Number(RegExp['$2']);else{if(_0x51a0bf[_0x4d5c83(0x269)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x4d5c83(0x302)!==_0x4d5c83(0x460))_0x207163=DataManager[_0x4d5c83(0x3e9)](RegExp['$1']),_0x5014af=Number(RegExp['$2']);else{if(this[_0x4d5c83(0x439)]||this[_0x4d5c83(0x3b8)])return;try{_0x34f6e6['SkillsStatesCore'][_0x4d5c83(0x325)][_0x4d5c83(0x1d6)][_0x4d5c83(0x252)][_0x4d5c83(0x1df)](this,_0x555688);}catch(_0x46845e){if(_0x5b2884[_0x4d5c83(0x1b9)]())_0x2e0936[_0x4d5c83(0x27e)](_0x46845e);}}}}_0x3660ad[_0x4d5c83(0x4a9)](_0x207163,_0x5014af),this[_0x4d5c83(0x378)](_0x3660ad);}}},Game_Action[_0x2e8d91(0x309)]['applyBuffTurnManipulationEffects']=function(_0x598a8e){const _0x287891=_0x2e8d91,_0x12f728=[_0x287891(0x46a),_0x287891(0x293),_0x287891(0x254),_0x287891(0x442),'MAT',_0x287891(0x228),_0x287891(0x379),_0x287891(0x2b2)],_0x3e76b0=this[_0x287891(0x2dd)]()['note'],_0x346739=_0x3e76b0['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x346739)for(const _0x5643db of _0x346739){if(_0x287891(0x2bb)!==_0x287891(0x2bb))_0x1bacdc[_0x287891(0x367)][_0x287891(0x325)][_0x287891(0x1d6)][_0x287891(0x29b)][_0x287891(0x1df)](this,_0x48f7af);else{_0x5643db[_0x287891(0x269)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2c2923=_0x12f728['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x1adca9=Number(RegExp['$2']);_0x2c2923>=0x0&&(_0x598a8e[_0x287891(0x3d5)](_0x2c2923,_0x1adca9),this['makeSuccess'](_0x598a8e));}}const _0x38636f=_0x3e76b0['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x38636f){if(_0x287891(0x411)!==_0x287891(0x395))for(const _0x59becf of _0x346739){_0x59becf['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x299018=_0x12f728['indexOf'](String(RegExp['$1'])[_0x287891(0x383)]()),_0x32f652=Number(RegExp['$2']);_0x299018>=0x0&&(_0x598a8e['addBuffTurns'](_0x299018,_0x32f652),this['makeSuccess'](_0x598a8e));}else _0x320000['SkillsStatesCore'][_0x287891(0x263)][_0x287891(0x1df)](this,_0x529b2f,_0x50d63b),this[_0x287891(0x42e)](_0x1fe429)&&this[_0x287891(0x26d)](_0x29ee39,_0x2e5c2d);}},Game_Action[_0x2e8d91(0x309)][_0x2e8d91(0x2b4)]=function(_0x23a11f){const _0x5385ec=_0x2e8d91,_0x2ad905=[_0x5385ec(0x46a),_0x5385ec(0x293),'ATK',_0x5385ec(0x442),_0x5385ec(0x3ce),'MDF',_0x5385ec(0x379),_0x5385ec(0x2b2)],_0x91bcd9=this[_0x5385ec(0x2dd)]()[_0x5385ec(0x417)],_0x35ecc1=_0x91bcd9['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x35ecc1)for(const _0x1e9cdf of _0x35ecc1){_0x1e9cdf[_0x5385ec(0x269)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x28b5a2=_0x2ad905[_0x5385ec(0x1cb)](String(RegExp['$1'])['toUpperCase']()),_0x14f96a=Number(RegExp['$2']);if(_0x28b5a2>=0x0){if('VktVf'!=='VktVf')return _0x1a2338=_0x197853(_0x60f79f),_0x388845['match'](/#(.*)/i)?_0x5385ec(0x1cc)['format'](_0x17d72e(_0x4ba346['$1'])):this[_0x5385ec(0x234)](_0x2f922e(_0x540b94));else _0x23a11f['setDebuffTurns'](_0x28b5a2,_0x14f96a),this[_0x5385ec(0x378)](_0x23a11f);}}const _0x3f35e6=_0x91bcd9['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3f35e6)for(const _0x22753e of _0x35ecc1){_0x22753e[_0x5385ec(0x269)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xc06443=_0x2ad905[_0x5385ec(0x1cb)](String(RegExp['$1'])[_0x5385ec(0x383)]()),_0xe5e8b=Number(RegExp['$2']);_0xc06443>=0x0&&(_0x23a11f['addDebuffTurns'](_0xc06443,_0xe5e8b),this[_0x5385ec(0x378)](_0x23a11f));}},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2ee)],Game_BattlerBase[_0x2e8d91(0x309)]['initMembers']=function(){const _0xf2a637=_0x2e8d91;this[_0xf2a637(0x232)]={},this[_0xf2a637(0x204)](),VisuMZ['SkillsStatesCore'][_0xf2a637(0x339)][_0xf2a637(0x1df)](this);},Game_BattlerBase['prototype'][_0x2e8d91(0x204)]=function(){const _0x1fa4ec=_0x2e8d91;this[_0x1fa4ec(0x246)]='',this[_0x1fa4ec(0x255)]={},this['_stateDisplay']={},this['_stateOrigin']={};},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x3cd)]=function(_0x3493db){const _0x35ade9=_0x2e8d91;return this[_0x35ade9(0x232)]=this[_0x35ade9(0x232)]||{},this[_0x35ade9(0x232)][_0x3493db]!==undefined;},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x1f3)]=Game_BattlerBase[_0x2e8d91(0x309)]['refresh'],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x30b)]=function(){const _0xcdb745=_0x2e8d91;this[_0xcdb745(0x232)]={},VisuMZ[_0xcdb745(0x367)][_0xcdb745(0x1f3)]['call'](this);},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x2e8d91(0x309)]['eraseState'],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x45e)]=function(_0x47e724){const _0xf0fee0=_0x2e8d91;let _0x275d25=this[_0xf0fee0(0x1b4)](_0x47e724);VisuMZ[_0xf0fee0(0x367)][_0xf0fee0(0x46d)][_0xf0fee0(0x1df)](this,_0x47e724);if(_0x275d25&&!this['isStateAffected'](_0x47e724))this[_0xf0fee0(0x2e1)](_0x47e724);},Game_BattlerBase['prototype'][_0x2e8d91(0x2e1)]=function(_0x34dd8e){const _0x5ba379=_0x2e8d91;this['clearStateData'](_0x34dd8e),this[_0x5ba379(0x2e3)](_0x34dd8e),this[_0x5ba379(0x3d6)](_0x34dd8e);},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase['prototype']['resetStateCounts'],Game_BattlerBase[_0x2e8d91(0x309)]['resetStateCounts']=function(_0x526561){const _0x34efde=_0x2e8d91,_0x54c3cd=$dataStates[_0x526561],_0x4d0bd2=this[_0x34efde(0x474)](_0x526561),_0x5164a5=this[_0x34efde(0x1fd)](_0x54c3cd)['toLowerCase']()[_0x34efde(0x265)]();switch(_0x5164a5){case _0x34efde(0x291):if(_0x4d0bd2<=0x0)VisuMZ[_0x34efde(0x367)][_0x34efde(0x205)][_0x34efde(0x1df)](this,_0x526561);break;case _0x34efde(0x3e8):VisuMZ[_0x34efde(0x367)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x526561);break;case _0x34efde(0x436):VisuMZ[_0x34efde(0x367)][_0x34efde(0x205)][_0x34efde(0x1df)](this,_0x526561),this[_0x34efde(0x41b)][_0x526561]=Math[_0x34efde(0x25b)](this[_0x34efde(0x41b)][_0x526561],_0x4d0bd2);break;case _0x34efde(0x39a):VisuMZ[_0x34efde(0x367)][_0x34efde(0x205)][_0x34efde(0x1df)](this,_0x526561),this[_0x34efde(0x41b)][_0x526561]+=_0x4d0bd2;break;default:VisuMZ[_0x34efde(0x367)][_0x34efde(0x205)][_0x34efde(0x1df)](this,_0x526561);break;}},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x1fd)]=function(_0x394b77){const _0x4edfbe=_0x2e8d91,_0x38c7f0=_0x394b77[_0x4edfbe(0x417)];return _0x38c7f0[_0x4edfbe(0x269)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):'qpega'==='qXYAt'?_0x4bcb32['SkillsStatesCore'][_0x4edfbe(0x329)][_0x4edfbe(0x1df)](this):VisuMZ[_0x4edfbe(0x367)][_0x4edfbe(0x325)][_0x4edfbe(0x1d6)][_0x4edfbe(0x257)];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x247)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2a0)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2a0)]=function(_0x4c980b,_0x427534){const _0x4814f3=_0x2e8d91,_0x9cd611=VisuMZ['SkillsStatesCore'][_0x4814f3(0x325)][_0x4814f3(0x29f)][_0x4814f3(0x257)],_0x5e7074=this[_0x4814f3(0x266)](_0x4c980b);switch(_0x9cd611){case _0x4814f3(0x291):if(_0x5e7074<=0x0)this[_0x4814f3(0x295)][_0x4c980b]=_0x427534;break;case _0x4814f3(0x3e8):this[_0x4814f3(0x295)][_0x4c980b]=_0x427534;break;case'greater':this[_0x4814f3(0x295)][_0x4c980b]=Math[_0x4814f3(0x25b)](_0x5e7074,_0x427534);break;case _0x4814f3(0x39a):this[_0x4814f3(0x295)][_0x4c980b]+=_0x427534;break;default:VisuMZ[_0x4814f3(0x367)][_0x4814f3(0x247)][_0x4814f3(0x1df)](this,_0x4c980b,_0x427534);break;}const _0x22020e=VisuMZ['SkillsStatesCore']['Settings'][_0x4814f3(0x29f)][_0x4814f3(0x3e1)];this[_0x4814f3(0x295)][_0x4c980b]=this[_0x4814f3(0x295)][_0x4c980b][_0x4814f3(0x2e6)](0x0,_0x22020e);},Game_BattlerBase['prototype'][_0x2e8d91(0x37e)]=function(){const _0x2faccb=_0x2e8d91;if(this[_0x2faccb(0x232)]['groupDefeat']!==undefined)return this[_0x2faccb(0x232)]['groupDefeat'];this[_0x2faccb(0x232)][_0x2faccb(0x20d)]=![];const _0x5ea264=this[_0x2faccb(0x310)]();for(const _0x9ebb04 of _0x5ea264){if(!_0x9ebb04)continue;if(_0x9ebb04[_0x2faccb(0x417)][_0x2faccb(0x269)](/<GROUP DEFEAT>/i)){if(_0x2faccb(0x3a2)!==_0x2faccb(0x3a2))return _0x5a0403[_0x2faccb(0x238)]&&_0x43a9ef[_0x2faccb(0x309)][_0x2faccb(0x3cc)]['call'](this);else{this[_0x2faccb(0x232)][_0x2faccb(0x20d)]=!![];break;}}}return this['_cache'][_0x2faccb(0x20d)];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x476)]=Game_BattlerBase['prototype'][_0x2e8d91(0x492)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x492)]=function(){const _0x585dea=_0x2e8d91;if(this[_0x585dea(0x3f4)]()!==''){if(_0x585dea(0x32b)===_0x585dea(0x39e)){for(_0x315745 of _0x413b2a[_0x585dea(0x367)][_0x585dea(0x325)][_0x585dea(0x31d)]){const _0x21cc8d=_0x13a5f2['CalcJS'][_0x585dea(0x1df)](this,_0x473449);if(!_0x6d4b90['CanPayJS'][_0x585dea(0x1df)](this,_0x249e90,_0x21cc8d))return![];}return!![];}else this[_0x585dea(0x405)]();}else VisuMZ[_0x585dea(0x367)]['Game_BattlerBase_clearStates'][_0x585dea(0x1df)](this),this[_0x585dea(0x204)]();},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x492)]=function(){const _0x50441c=_0x2e8d91;this[_0x50441c(0x227)]=this[_0x50441c(0x227)]||{},Game_Battler[_0x50441c(0x309)][_0x50441c(0x492)][_0x50441c(0x1df)](this);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x405)]=function(){const _0x16cbac=_0x2e8d91,_0x440d52=this[_0x16cbac(0x310)]();for(const _0x35fbcb of _0x440d52){if('enBGa'===_0x16cbac(0x470)){if(_0x35fbcb&&this[_0x16cbac(0x2b5)](_0x35fbcb))this[_0x16cbac(0x45e)](_0x35fbcb['id']);}else return _0x467b5a[_0x16cbac(0x3b3)][_0x16cbac(0x2ea)]===_0x141f67?_0x4e7d74[_0x16cbac(0x367)][_0x16cbac(0x3ac)][_0x16cbac(0x1df)](this):_0x496abc[_0x16cbac(0x367)]['Settings'][_0x16cbac(0x1b6)][_0x16cbac(0x37f)];}this[_0x16cbac(0x232)]={};},Game_BattlerBase['prototype'][_0x2e8d91(0x2b5)]=function(_0x3336ef){const _0x4ae411=_0x2e8d91,_0x54d495=this[_0x4ae411(0x3f4)]();if(_0x54d495!==''){const _0xf2d64=_0x3336ef[_0x4ae411(0x417)];if(_0x54d495===_0x4ae411(0x211)&&_0xf2d64['match'](/<NO DEATH CLEAR>/i))return![];if(_0x54d495===_0x4ae411(0x2d6)&&_0xf2d64['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x4ae411(0x1b4)](_0x3336ef['id']);},Game_BattlerBase[_0x2e8d91(0x309)]['getStateRetainType']=function(){const _0x23d662=_0x2e8d91;return this[_0x23d662(0x246)];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2ec)]=function(_0x1becad){this['_stateRetainType']=_0x1becad;},Game_BattlerBase['prototype'][_0x2e8d91(0x335)]=function(){const _0x222131=_0x2e8d91;this[_0x222131(0x246)]='';},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_die']=Game_BattlerBase[_0x2e8d91(0x309)]['die'],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2ca)]=function(){const _0x550db0=_0x2e8d91;this[_0x550db0(0x2ec)]('death'),VisuMZ[_0x550db0(0x367)][_0x550db0(0x29d)]['call'](this),this[_0x550db0(0x335)]();},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x3ad)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x209)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x209)]=function(){const _0x28d3a6=_0x2e8d91;this[_0x28d3a6(0x2ec)](_0x28d3a6(0x2d6)),VisuMZ['SkillsStatesCore'][_0x28d3a6(0x3ad)][_0x28d3a6(0x1df)](this),this[_0x28d3a6(0x335)]();},Game_BattlerBase['prototype'][_0x2e8d91(0x3da)]=function(_0x2cdf20){const _0x329424=_0x2e8d91;for(settings of VisuMZ[_0x329424(0x367)][_0x329424(0x325)]['Costs']){const _0x3170ab=settings[_0x329424(0x2a2)]['call'](this,_0x2cdf20);if(!settings[_0x329424(0x3a8)][_0x329424(0x1df)](this,_0x2cdf20,_0x3170ab))return![];}return!![];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x466)]=function(_0x35ce04){const _0x404acf=_0x2e8d91;for(settings of VisuMZ['SkillsStatesCore'][_0x404acf(0x325)][_0x404acf(0x31d)]){if(_0x404acf(0x43b)!=='SCvVp'){const _0x36b4a8=settings[_0x404acf(0x2a2)][_0x404acf(0x1df)](this,_0x35ce04);settings[_0x404acf(0x29c)][_0x404acf(0x1df)](this,_0x35ce04,_0x36b4a8);}else{const _0x372d90=_0x570cc0(_0x11bffa['$1']);_0x372d90<_0x9cd1de?(_0x541470(_0x404acf(0x2b3)[_0x404acf(0x49e)](_0x1f3963,_0x372d90,_0x3abdb2)),_0x58cec2['exit']()):_0x204adf=_0x2ca51f[_0x404acf(0x25b)](_0x372d90,_0x4037dd);}}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x36a)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x48f)],Game_BattlerBase['prototype'][_0x2e8d91(0x48f)]=function(_0x3fc213){const _0x5d8554=_0x2e8d91;if(!_0x3fc213)return![];if(!VisuMZ[_0x5d8554(0x367)]['Game_BattlerBase_meetsSkillConditions']['call'](this,_0x3fc213))return![];if(!this['checkSkillConditionsNotetags'](_0x3fc213))return![];if(!this[_0x5d8554(0x38a)](_0x3fc213))return![];if(!this[_0x5d8554(0x2c5)](_0x3fc213))return![];return!![];},Game_BattlerBase[_0x2e8d91(0x309)]['checkSkillConditionsNotetags']=function(_0x402dc4){const _0x25a33f=_0x2e8d91;if(!this[_0x25a33f(0x44f)](_0x402dc4))return![];return!![];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x44f)]=function(_0x43f6d9){const _0x545d91=_0x2e8d91,_0x5de0d3=_0x43f6d9[_0x545d91(0x417)];if(_0x5de0d3[_0x545d91(0x269)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x545d91(0x39f)!==_0x545d91(0x39f)){const _0x4b3482=_0xe8d0f8[_0x545d91(0x372)]('['+_0x57e5a7['$1']['match'](/\d+/g)+']');for(const _0x5a24a0 of _0x4b3482){if(!_0xad53b8[_0x545d91(0x28c)](_0x5a24a0))return![];}return!![];}else{const _0x58fa5c=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x2268df of _0x58fa5c){if('bhvkx'===_0x545d91(0x3e0))this[_0x545d91(0x2a7)](_0x4b38fe),this[_0x545d91(0x455)](_0x53f976),this[_0x545d91(0x422)](_0x369b1c),this[_0x545d91(0x2b4)](_0x21a659);else{if(!$gameSwitches[_0x545d91(0x28c)](_0x2268df))return![];}}return!![];}}if(_0x5de0d3[_0x545d91(0x269)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2035b3=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x40b7b5 of _0x2035b3){if(_0x545d91(0x2f4)!==_0x545d91(0x2a4)){if(!$gameSwitches[_0x545d91(0x28c)](_0x40b7b5))return![];}else{let _0x5ec4da=this[_0x545d91(0x1bd)]();return _0x191356[_0x545d91(0x238)]&&this[_0x545d91(0x4b8)]()&&(_0x5ec4da=_0x302e96[_0x545d91(0x44a)](_0x5ec4da)),_0x5ec4da;}}return!![];}if(_0x5de0d3[_0x545d91(0x269)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x545d91(0x448)===_0x545d91(0x448)){const _0x30a30f=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x2f8dc of _0x30a30f){if($gameSwitches['value'](_0x2f8dc))return!![];}return![];}else{const _0x5195d5=_0x586bce[_0x545d91(0x39c)],_0x2caf8e=_0x39356f[_0x545d91(0x39c)];if(_0x5195d5!==_0x2caf8e)return _0x2caf8e-_0x5195d5;return _0x5a2541-_0x2cf984;}}if(_0x5de0d3['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a0b4e=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x4a4880 of _0x4a0b4e){if(!$gameSwitches[_0x545d91(0x28c)](_0x4a4880))return!![];}return![];}if(_0x5de0d3[_0x545d91(0x269)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x545d91(0x3cb)==='QYdJf'){const _0xfa3230=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x198c5d of _0xfa3230){if('VtCrD'!==_0x545d91(0x3a4)){if(!$gameSwitches[_0x545d91(0x28c)](_0x198c5d))return!![];}else{const _0x2344b3=_0x2e8cc9[_0x545d91(0x417)],_0xe84d1c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x2344b3[_0x545d91(0x269)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x5c832f=_0x372be6(_0x31d829['$1']),_0x4bf278=_0xe84d1c[_0x545d91(0x49e)](_0x5c832f);_0x131430[_0x545d91(0x367)][_0x545d91(0x30c)][_0x525e61['id']]=new _0x4dfbd4('stateId',_0x4bf278);}if(_0x2344b3[_0x545d91(0x269)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x3a36ab=_0x466723(_0x21a5a8['$1']),_0x380444=_0xe84d1c[_0x545d91(0x49e)](_0x3a36ab);_0x22806f['SkillsStatesCore'][_0x545d91(0x37c)][_0x560e17['id']]=new _0xae1ad4('stateId',_0x380444);}if(_0x2344b3[_0x545d91(0x269)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x14f323=_0x194f23(_0x2dac0b['$1']),_0x5bd976=_0xe84d1c[_0x545d91(0x49e)](_0x14f323);_0x2ada40['SkillsStatesCore']['stateExpireJS'][_0x23c14f['id']]=new _0x3206c5(_0x545d91(0x2bf),_0x5bd976);}}}return![];}else return'<actor-%1>'['format'](_0x5ded3e[_0x545d91(0x2f7)]());}if(_0x5de0d3[_0x545d91(0x269)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x545d91(0x450)===_0x545d91(0x4a4)){if(this[_0x545d91(0x439)]||this['_tempBattler'])return;const _0x333573=_0x1bc325[_0x545d91(0x367)][_0x545d91(0x37c)];if(_0x333573[_0x1af87f])_0x333573[_0x168438]['call'](this,_0x3cdfab);}else{const _0x7e74e6=JSON[_0x545d91(0x372)]('['+RegExp['$1'][_0x545d91(0x269)](/\d+/g)+']');for(const _0x438c09 of _0x7e74e6){if($gameSwitches['value'](_0x438c09))return![];}return!![];}}return!![];},Game_BattlerBase['prototype']['meetsSkillConditionsEnableJS']=function(_0x1e335c){const _0x3e19f8=_0x2e8d91,_0x3bbca9=_0x1e335c[_0x3e19f8(0x417)],_0x1b3c0c=VisuMZ['SkillsStatesCore'][_0x3e19f8(0x49b)];if(_0x1b3c0c[_0x1e335c['id']])return _0x1b3c0c[_0x1e335c['id']][_0x3e19f8(0x1df)](this,_0x1e335c);else{if(_0x3e19f8(0x1db)!=='wmozp')return!![];else{if(!_0x238009['SkillsStatesCore'][_0x3e19f8(0x49d)](this[_0x3e19f8(0x341)],_0x28da94))return![];if(!_0x1075d1[_0x3e19f8(0x367)]['CheckVisibleSwitchNotetags'](this[_0x3e19f8(0x341)],_0x5afeca))return![];if(!_0x5038b7[_0x3e19f8(0x367)][_0x3e19f8(0x22b)](this['_actor'],_0x391ccb))return![];return!![];}}},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2c5)]=function(_0x41986d){const _0x592dae=_0x2e8d91;return VisuMZ[_0x592dae(0x367)][_0x592dae(0x325)][_0x592dae(0x1b6)][_0x592dae(0x3fa)][_0x592dae(0x1df)](this,_0x41986d);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x21c)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x22f)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x22f)]=function(_0x44187d){const _0x2c72cd=_0x2e8d91;for(settings of VisuMZ[_0x2c72cd(0x367)][_0x2c72cd(0x325)][_0x2c72cd(0x31d)]){if(settings['Name'][_0x2c72cd(0x383)]()==='MP')return settings[_0x2c72cd(0x2a2)]['call'](this,_0x44187d);}return VisuMZ[_0x2c72cd(0x367)][_0x2c72cd(0x21c)][_0x2c72cd(0x1df)](this,_0x44187d);},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase['prototype']['skillTpCost'],Game_BattlerBase['prototype'][_0x2e8d91(0x2fd)]=function(_0x3f59ac){const _0xada7a6=_0x2e8d91;for(settings of VisuMZ[_0xada7a6(0x367)][_0xada7a6(0x325)][_0xada7a6(0x31d)]){if(settings[_0xada7a6(0x299)]['toUpperCase']()==='TP')return settings[_0xada7a6(0x2a2)][_0xada7a6(0x1df)](this,_0x3f59ac);}return VisuMZ[_0xada7a6(0x367)]['Game_BattlerBase_skillTpCost'][_0xada7a6(0x1df)](this,_0x3f59ac);},Game_BattlerBase['prototype'][_0x2e8d91(0x1f7)]=function(_0x175fdb){const _0x45ed5f=_0x2e8d91;if(typeof _0x175fdb===_0x45ed5f(0x267))_0x175fdb=$dataStates[_0x175fdb];return this[_0x45ed5f(0x310)]()['includes'](_0x175fdb);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x4aa)]=Game_BattlerBase[_0x2e8d91(0x309)]['states'],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x310)]=function(){const _0x1fc670=_0x2e8d91;let _0xe7f852=VisuMZ[_0x1fc670(0x367)]['Game_BattlerBase_states']['call'](this);if($gameTemp[_0x1fc670(0x286)])return _0xe7f852;return $gameTemp['_checkingPassiveStates']=!![],this[_0x1fc670(0x1f1)](_0xe7f852),$gameTemp[_0x1fc670(0x286)]=undefined,_0xe7f852;},Game_BattlerBase[_0x2e8d91(0x309)]['addPassiveStates']=function(_0x2cf838){const _0x4bb2c9=_0x2e8d91,_0x2d5e86=this[_0x4bb2c9(0x1be)]();for(state of _0x2d5e86){if(!state)continue;if(!this[_0x4bb2c9(0x38f)](state)&&_0x2cf838['includes'](state))continue;_0x2cf838['push'](state);}_0x2d5e86[_0x4bb2c9(0x3f6)]>0x0&&_0x2cf838[_0x4bb2c9(0x1c7)]((_0x1053f3,_0x1489bb)=>{const _0xf6dad=_0x4bb2c9;if(_0xf6dad(0x4a7)!==_0xf6dad(0x3b7)){const _0x516c5d=_0x1053f3[_0xf6dad(0x39c)],_0x5bff20=_0x1489bb[_0xf6dad(0x39c)];if(_0x516c5d!==_0x5bff20)return _0x5bff20-_0x516c5d;return _0x1053f3-_0x1489bb;}else{if(!_0x4d6c40['value'](_0x5c0daa))return!![];}});},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x38f)]=function(_0x8cf346){const _0x560aad=_0x2e8d91;return _0x8cf346[_0x560aad(0x417)][_0x560aad(0x269)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x260)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x384)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x384)]=function(_0x138d68){const _0x1db7dd=_0x2e8d91;this[_0x1db7dd(0x25f)]=!![];let _0x3f7bc7=VisuMZ['SkillsStatesCore'][_0x1db7dd(0x260)]['call'](this,_0x138d68);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x3f7bc7;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x38b)]=function(){const _0x3c9217=_0x2e8d91;let _0x74c2bd=[];this[_0x3c9217(0x1da)]=this['_passiveStateResults']||{};for(;;){if('VDHJT'===_0x3c9217(0x277)){_0x74c2bd=[];let _0x14914b=!![];for(const _0x42c277 of this['_cache'][_0x3c9217(0x1be)]){const _0x5c7f4e=$dataStates[_0x42c277];if(!_0x5c7f4e)continue;let _0x1193ef=this[_0x3c9217(0x2cc)](_0x5c7f4e);this[_0x3c9217(0x1da)][_0x42c277]!==_0x1193ef&&(_0x14914b=![],this[_0x3c9217(0x1da)][_0x42c277]=_0x1193ef);if(!_0x1193ef)continue;_0x74c2bd[_0x3c9217(0x2d2)](_0x5c7f4e);}if(_0x14914b){if(_0x3c9217(0x25a)==='zRzeO')_0x56d6d5[_0x3c9217(0x367)][_0x3c9217(0x2d5)][_0x3c9217(0x1df)](this,_0x31034f),this[_0x3c9217(0x44e)](_0x5a656c);else break;}else{if(_0x3c9217(0x2b6)!==_0x3c9217(0x2b6))this[_0x3c9217(0x27d)](_0x3c4110[_0x3c9217(0x488)]());else{if(!this[_0x3c9217(0x25f)])this[_0x3c9217(0x30b)]();this[_0x3c9217(0x2ef)]();}}}else this['contents'][_0x3c9217(0x230)]=_0x1f2fd3;}return _0x74c2bd;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2cc)]=function(_0xafc732){const _0x559a8=_0x2e8d91;if(!this[_0x559a8(0x3e4)](_0xafc732))return![];if(!this['meetsPassiveStateConditionSwitches'](_0xafc732))return![];if(!this[_0x559a8(0x1d1)](_0xafc732))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0xafc732))return![];return!![];},Game_BattlerBase['prototype'][_0x2e8d91(0x3e4)]=function(_0x294df2){return!![];},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x3e4)]=function(_0x569ff9){const _0x5ac5b6=_0x2e8d91,_0x4af3a0=_0x569ff9[_0x5ac5b6(0x417)];if(_0x4af3a0[_0x5ac5b6(0x269)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x5ac5b6(0x289)!=='kREed'){const _0x43a6d8=String(RegExp['$1'])[_0x5ac5b6(0x21e)](',')[_0x5ac5b6(0x3d9)](_0x4b0b8b=>_0x4b0b8b[_0x5ac5b6(0x265)]()),_0x33ecf0=VisuMZ[_0x5ac5b6(0x367)]['ParseClassIDs'](_0x43a6d8);return _0x33ecf0[_0x5ac5b6(0x359)](this['currentClass']());}else this[_0x5ac5b6(0x300)](_0x386929),this[_0x5ac5b6(0x26e)](_0x5e6407),this['onAddStateMakeCustomSlipValues'](_0x56ab47),this[_0x5ac5b6(0x3b4)](_0x2725b1),this[_0x5ac5b6(0x416)](_0x24d65d);}if(_0x4af3a0[_0x5ac5b6(0x269)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if('BFMfp'!==_0x5ac5b6(0x3bb)){const _0x379d4f=String(RegExp['$1'])['split'](',')[_0x5ac5b6(0x3d9)](_0x131a94=>_0x131a94[_0x5ac5b6(0x265)]()),_0x848062=VisuMZ[_0x5ac5b6(0x367)][_0x5ac5b6(0x4a3)](_0x379d4f);let _0x789396=[this[_0x5ac5b6(0x1fa)]()];return Imported[_0x5ac5b6(0x25e)]&&this['multiclasses']&&(_0x789396=this[_0x5ac5b6(0x2de)]()),_0x848062['filter'](_0x1cd7bc=>_0x789396[_0x5ac5b6(0x359)](_0x1cd7bc))[_0x5ac5b6(0x3f6)]>0x0;}else{let _0x496f67=[this[_0x5ac5b6(0x1eb)](),this[_0x5ac5b6(0x1fa)]()];_0x496f67=_0x496f67[_0x5ac5b6(0x2ff)](this['equips']()['filter'](_0x58f926=>_0x58f926));for(const _0x25057a of this[_0x5ac5b6(0x30d)]){const _0x5967f7=_0x1a2e70[_0x25057a];if(_0x5967f7)_0x496f67[_0x5ac5b6(0x2d2)](_0x5967f7);}return _0x496f67;}}return Game_BattlerBase[_0x5ac5b6(0x309)][_0x5ac5b6(0x3e4)]['call'](this,_0x569ff9);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x4a3)]=function(_0x1e134b){const _0x5889b3=_0x2e8d91,_0x10cb14=[];for(let _0x3f013d of _0x1e134b){if(_0x5889b3(0x2f0)===_0x5889b3(0x1d3))_0x2ecd7c[_0x5889b3(0x367)][_0x5889b3(0x325)]['States'][_0x5889b3(0x252)][_0x5889b3(0x1df)](this,_0x366402);else{_0x3f013d=(String(_0x3f013d)||'')[_0x5889b3(0x265)]();const _0x9335e4=/^\d+$/[_0x5889b3(0x456)](_0x3f013d);if(_0x9335e4){if(_0x5889b3(0x368)!==_0x5889b3(0x368)){const _0x448c5a=this['commandStyleCheck'](_0x5cda6a);if(_0x448c5a===_0x5889b3(0x459))this[_0x5889b3(0x33f)](_0x3bf6b7);else _0x448c5a===_0x5889b3(0x35d)?this[_0x5889b3(0x4b1)](_0x1155cf):_0x1a1bcd['prototype'][_0x5889b3(0x40f)][_0x5889b3(0x1df)](this,_0x201204);}else _0x10cb14['push'](Number(_0x3f013d));}else{if(_0x5889b3(0x462)!==_0x5889b3(0x462)){const _0x8b8bef=this[_0x5889b3(0x42a)](),_0x222c9f=_0xe461f6[_0x5889b3(0x39d)](_0x56c78a),_0x5b7605=_0x8b8bef[_0x5889b3(0x224)](_0xd47de5=>_0x222c9f[_0x5889b3(0x359)](_0xd47de5));return _0x5b7605[_0x5889b3(0x3f6)]>0x0;}else _0x10cb14[_0x5889b3(0x2d2)](DataManager[_0x5889b3(0x284)](_0x3f013d));}}}return _0x10cb14[_0x5889b3(0x3d9)](_0x19b4b8=>$dataClasses[Number(_0x19b4b8)])[_0x5889b3(0x327)](null);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2cf)]=function(_0x46973e){const _0x1d5c19=_0x2e8d91,_0x475dbd=_0x46973e[_0x1d5c19(0x417)];if(_0x475dbd['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e78d7=JSON[_0x1d5c19(0x372)]('['+RegExp['$1'][_0x1d5c19(0x269)](/\d+/g)+']');for(const _0x161c36 of _0x2e78d7){if(!$gameSwitches[_0x1d5c19(0x28c)](_0x161c36))return![];}return!![];}if(_0x475dbd['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FSBGX'===_0x1d5c19(0x39b)){const _0x56a67e=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x245bda of _0x56a67e){if(_0x1d5c19(0x485)==='kjgyu'){if(!$gameSwitches['value'](_0x245bda))return![];}else return _0x573f16['SkillsStatesCore'][_0x1d5c19(0x325)]['States'][_0x1d5c19(0x36f)]??0x14;}return!![];}else{if(!_0x390853)return;_0x3a7ba7[_0x1d5c19(0x309)][_0x1d5c19(0x340)][_0x1d5c19(0x1df)](this,_0x242975,_0x50385d,_0x306704,_0x4f31af);}}if(_0x475dbd['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3961e6=JSON[_0x1d5c19(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2d0077 of _0x3961e6){if('fMyIm'!==_0x1d5c19(0x285))this[_0x1d5c19(0x41b)][_0x5dcb01]--;else{if($gameSwitches[_0x1d5c19(0x28c)](_0x2d0077))return!![];}}return![];}if(_0x475dbd['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1d5c19(0x26a)===_0x1d5c19(0x26a)){const _0x131038=JSON[_0x1d5c19(0x372)]('['+RegExp['$1'][_0x1d5c19(0x269)](/\d+/g)+']');for(const _0x441fa1 of _0x131038){if(_0x1d5c19(0x270)===_0x1d5c19(0x270)){if(!$gameSwitches['value'](_0x441fa1))return!![];}else{const _0x1a9491=this[_0x1d5c19(0x34f)](this[_0x1d5c19(0x223)]());let _0x1913e2=this[_0x1d5c19(0x278)](this[_0x1d5c19(0x223)]());_0x1913e2=_0x1913e2[_0x1d5c19(0x403)](/\\I\[(\d+)\]/gi,''),_0x534d0d[_0x1d5c19(0x2cd)](),this[_0x1d5c19(0x1b1)](_0x1913e2,_0x1a9491),this['commandNameWindowDrawText'](_0x1913e2,_0x1a9491),this[_0x1d5c19(0x1cf)](_0x1913e2,_0x1a9491);}}return![];}else return this[_0x1d5c19(0x48c)](_0x2ec1ee);}if(_0x475dbd['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x299e5c=JSON[_0x1d5c19(0x372)]('['+RegExp['$1'][_0x1d5c19(0x269)](/\d+/g)+']');for(const _0x14d096 of _0x299e5c){if(_0x1d5c19(0x467)===_0x1d5c19(0x2af)){const _0x49cc8d=this[_0x1d5c19(0x278)](_0x2f6cfc);if(_0x49cc8d[_0x1d5c19(0x269)](/\\I\[(\d+)\]/i)){const _0x19e71a=this['itemLineRect'](_0x2070ff),_0x247280=this[_0x1d5c19(0x42c)](_0x49cc8d)[_0x1d5c19(0x24b)];return _0x247280<=_0x19e71a[_0x1d5c19(0x24b)]?_0x1d5c19(0x459):_0x1d5c19(0x35d);}}else{if(!$gameSwitches['value'](_0x14d096))return!![];}}return![];}if(_0x475dbd[_0x1d5c19(0x269)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1d5c19(0x390)!=='XACSU'){const _0x33a5f5=JSON[_0x1d5c19(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x14cf3c of _0x33a5f5){if(_0x1d5c19(0x225)!==_0x1d5c19(0x264)){if($gameSwitches[_0x1d5c19(0x28c)](_0x14cf3c))return![];}else{if(!_0x43ac98[_0x1d5c19(0x480)])return![];else return this[_0x1d5c19(0x2fb)]()?!![]:_0x5bdd13[_0x1d5c19(0x367)]['Settings'][_0x1d5c19(0x1b6)][_0x1d5c19(0x497)];}}return!![];}else return this[_0x1d5c19(0x43c)][_0x2b1c97]===-_0x22c8b8[_0x1d5c19(0x367)]['Settings'][_0x1d5c19(0x29f)]['StackDebuffMax'];}return!![];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x1d1)]=function(_0x3d3562){const _0x4905ac=_0x2e8d91,_0xb83d41=VisuMZ[_0x4905ac(0x367)]['statePassiveConditionJS'];if(_0xb83d41[_0x3d3562['id']]&&!_0xb83d41[_0x3d3562['id']][_0x4905ac(0x1df)](this,_0x3d3562))return![];return!![];},Game_BattlerBase['prototype'][_0x2e8d91(0x3b1)]=function(_0x25355d){const _0x59835f=_0x2e8d91;return VisuMZ[_0x59835f(0x367)][_0x59835f(0x325)][_0x59835f(0x274)][_0x59835f(0x2aa)][_0x59835f(0x1df)](this,_0x25355d);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x1be)]=function(){const _0x4ae1ce=_0x2e8d91;if(this[_0x4ae1ce(0x3cd)]('passiveStates'))return this['convertPassiveStates']();if(this[_0x4ae1ce(0x3fe)])return[];return this[_0x4ae1ce(0x3fe)]=!![],this[_0x4ae1ce(0x2ef)](),this[_0x4ae1ce(0x3fe)]=undefined,this[_0x4ae1ce(0x38b)]();},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2ef)]=function(){const _0x2eb40d=_0x2e8d91;this[_0x2eb40d(0x3fe)]=!![],this[_0x2eb40d(0x232)][_0x2eb40d(0x1be)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x2eb40d(0x397)](),this['addPassiveStatesByPluginParameters'](),this[_0x2eb40d(0x3fe)]=undefined;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x251)]=function(){const _0x2b9ecb=_0x2e8d91;if(Imported[_0x2b9ecb(0x2d8)])this[_0x2b9ecb(0x389)]();},Game_BattlerBase[_0x2e8d91(0x309)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x397)]=function(){const _0x106960=_0x2e8d91,_0x4c0683=this[_0x106960(0x3b9)]();for(const _0x4e5423 of _0x4c0683){if(!_0x4e5423)continue;const _0x21ce1e=_0x4e5423[_0x106960(0x417)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x21ce1e)for(const _0x58e30c of _0x21ce1e){if(_0x106960(0x3c3)===_0x106960(0x3c3)){_0x58e30c[_0x106960(0x269)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x3bcd65=RegExp['$1'];if(_0x3bcd65['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if('dykYT'!==_0x106960(0x3f9)){const _0x44235c=this[_0x106960(0x23d)](_0x3e84ae);_0x89bcd6[_0x106960(0x367)][_0x106960(0x258)][_0x106960(0x1df)](this,_0x46221a);if(_0x44235c&&this[_0x106960(0x1f7)](_0x8a7225[_0x55a7f5])){this[_0x106960(0x43e)](_0x1df64e);;}}else{const _0x3aacf1=JSON[_0x106960(0x372)]('['+RegExp['$1'][_0x106960(0x269)](/\d+/g)+']');this[_0x106960(0x232)][_0x106960(0x1be)]=this[_0x106960(0x232)][_0x106960(0x1be)][_0x106960(0x2ff)](_0x3aacf1);}}else{const _0x25e3e0=_0x3bcd65['split'](',');for(const _0x644465 of _0x25e3e0){const _0x3dd091=DataManager[_0x106960(0x3e9)](_0x644465);if(_0x3dd091)this[_0x106960(0x232)][_0x106960(0x1be)][_0x106960(0x2d2)](_0x3dd091);}}}else{if(this[_0x106960(0x324)](_0x4767de)){const _0x105e78=_0x1cb0da['SkillsStatesCore'][_0x106960(0x325)]['Buffs'][_0x106960(0x3e1)];this[_0x106960(0x295)][_0xdc9e67]=_0x148e3b['clamp'](0x0,_0x105e78);}}}}},Game_BattlerBase['prototype'][_0x2e8d91(0x3d3)]=function(){const _0x5d948d=_0x2e8d91,_0x4a0695=VisuMZ[_0x5d948d(0x367)]['Settings'][_0x5d948d(0x274)][_0x5d948d(0x45a)];this[_0x5d948d(0x232)][_0x5d948d(0x1be)]=this[_0x5d948d(0x232)]['passiveStates']['concat'](_0x4a0695);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x474)]=function(_0x58a047){const _0xb007f9=_0x2e8d91;if(typeof _0x58a047!==_0xb007f9(0x267))_0x58a047=_0x58a047['id'];return this['_stateTurns'][_0x58a047]||0x0;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x43f)]=function(_0x2562cd,_0x4c5985){const _0x4674e9=_0x2e8d91;if(typeof _0x2562cd!=='number')_0x2562cd=_0x2562cd['id'];if(this[_0x4674e9(0x1b4)](_0x2562cd)){if(_0x4674e9(0x3ba)==='nXSaN'){if(!_0x2b3153[_0x4674e9(0x1ed)](_0x279cd6))return!![];}else{const _0x519906=DataManager[_0x4674e9(0x253)](_0x2562cd);this['_stateTurns'][_0x2562cd]=_0x4c5985['clamp'](0x0,_0x519906);if(this[_0x4674e9(0x41b)][_0x2562cd]<=0x0)this['removeState'](_0x2562cd);}}},Game_BattlerBase['prototype'][_0x2e8d91(0x4a9)]=function(_0x33cc8b,_0xe1941e){const _0x57712a=_0x2e8d91;if(typeof _0x33cc8b!==_0x57712a(0x267))_0x33cc8b=_0x33cc8b['id'];this[_0x57712a(0x1b4)](_0x33cc8b)&&(_0xe1941e+=this['stateTurns'](_0x33cc8b),this['setStateTurns'](_0x33cc8b,_0xe1941e));},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x356)]=Game_BattlerBase['prototype'][_0x2e8d91(0x23f)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x23f)]=function(_0xb2fc0e){const _0x14ffb0=_0x2e8d91,_0x5d6e94=this[_0x14ffb0(0x43c)][_0xb2fc0e];VisuMZ['SkillsStatesCore'][_0x14ffb0(0x356)][_0x14ffb0(0x1df)](this,_0xb2fc0e);if(_0x5d6e94>0x0)this[_0x14ffb0(0x494)](_0xb2fc0e);if(_0x5d6e94<0x0)this[_0x14ffb0(0x1e2)](_0xb2fc0e);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x4a8)]=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x3dc)],Game_BattlerBase['prototype'][_0x2e8d91(0x3dc)]=function(_0x529541){const _0x589054=_0x2e8d91;VisuMZ[_0x589054(0x367)][_0x589054(0x4a8)][_0x589054(0x1df)](this,_0x529541);if(!this[_0x589054(0x306)](_0x529541))this[_0x589054(0x23f)](_0x529541);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x30e)]=Game_BattlerBase['prototype'][_0x2e8d91(0x328)],Game_BattlerBase[_0x2e8d91(0x309)]['decreaseBuff']=function(_0xee522e){const _0x1e293c=_0x2e8d91;VisuMZ[_0x1e293c(0x367)][_0x1e293c(0x30e)][_0x1e293c(0x1df)](this,_0xee522e);if(!this[_0x1e293c(0x306)](_0xee522e))this['eraseBuff'](_0xee522e);},Game_BattlerBase[_0x2e8d91(0x309)]['onEraseBuff']=function(_0x20a600){},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x1e2)]=function(_0x2e9201){},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x287)]=function(_0x119a49){const _0x19937a=_0x2e8d91;return this[_0x19937a(0x43c)][_0x119a49]===VisuMZ[_0x19937a(0x367)][_0x19937a(0x325)][_0x19937a(0x29f)][_0x19937a(0x3d7)];},Game_BattlerBase['prototype'][_0x2e8d91(0x410)]=function(_0x4b7c39){const _0xeb1551=_0x2e8d91;return this['_buffs'][_0x4b7c39]===-VisuMZ[_0xeb1551(0x367)][_0xeb1551(0x325)][_0xeb1551(0x29f)][_0xeb1551(0x41c)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x215)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x215)]=function(_0x579e75,_0x5d71e4){const _0x1f9b8d=_0x2e8d91;return _0x579e75=_0x579e75[_0x1f9b8d(0x2e6)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x1f9b8d(0x245)][_0x1f9b8d(0x1df)](this,_0x579e75,_0x5d71e4);},Game_BattlerBase[_0x2e8d91(0x309)]['paramBuffRate']=function(_0x3b45dd){const _0x4f854e=_0x2e8d91,_0x395fc5=this[_0x4f854e(0x43c)][_0x3b45dd];return VisuMZ[_0x4f854e(0x367)]['Settings']['Buffs']['MultiplierJS'][_0x4f854e(0x1df)](this,_0x3b45dd,_0x395fc5);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x266)]=function(_0x5f2e81){return this['_buffTurns'][_0x5f2e81]||0x0;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x1b2)]=function(_0x1bed03){return this['buffTurns'](_0x1bed03);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x3d5)]=function(_0x32effa,_0x1c5db5){const _0x4b6bfe=_0x2e8d91;if(this[_0x4b6bfe(0x42e)](_0x32effa)){const _0x389509=VisuMZ[_0x4b6bfe(0x367)][_0x4b6bfe(0x325)]['Buffs'][_0x4b6bfe(0x3e1)];this[_0x4b6bfe(0x295)][_0x32effa]=_0x1c5db5[_0x4b6bfe(0x2e6)](0x0,_0x389509);}},Game_BattlerBase['prototype'][_0x2e8d91(0x26c)]=function(_0x18a423,_0x11d1af){const _0x1bafeb=_0x2e8d91;this[_0x1bafeb(0x42e)](_0x18a423)&&(_0x11d1af+=this[_0x1bafeb(0x266)](stateId),this[_0x1bafeb(0x43f)](_0x18a423,_0x11d1af));},Game_BattlerBase['prototype'][_0x2e8d91(0x202)]=function(_0x1a03e7,_0x5b9e65){const _0x5f5525=_0x2e8d91;if(this[_0x5f5525(0x324)](_0x1a03e7)){const _0x553aaf=VisuMZ[_0x5f5525(0x367)]['Settings']['Buffs'][_0x5f5525(0x3e1)];this[_0x5f5525(0x295)][_0x1a03e7]=_0x5b9e65[_0x5f5525(0x2e6)](0x0,_0x553aaf);}},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2ac)]=function(_0x3a1cd9,_0xdd762f){const _0x1b63fa=_0x2e8d91;this[_0x1b63fa(0x324)](_0x3a1cd9)&&(_0xdd762f+=this[_0x1b63fa(0x266)](stateId),this[_0x1b63fa(0x43f)](_0x3a1cd9,_0xdd762f));},Game_BattlerBase['prototype'][_0x2e8d91(0x447)]=function(_0xb00987){const _0x4a1886=_0x2e8d91;if(typeof _0xb00987!==_0x4a1886(0x267))_0xb00987=_0xb00987['id'];return this[_0x4a1886(0x255)]=this[_0x4a1886(0x255)]||{},this['_stateData'][_0xb00987]=this[_0x4a1886(0x255)][_0xb00987]||{},this[_0x4a1886(0x255)][_0xb00987];},Game_BattlerBase[_0x2e8d91(0x309)]['getStateData']=function(_0x2c2cd0,_0x3a4d52){const _0x16c8d2=_0x2e8d91;if(typeof _0x2c2cd0!==_0x16c8d2(0x267))_0x2c2cd0=_0x2c2cd0['id'];const _0x118bfa=this[_0x16c8d2(0x447)](_0x2c2cd0);return _0x118bfa[_0x3a4d52];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x26f)]=function(_0x2a6193,_0x34bd46,_0x189e4c){if(typeof _0x2a6193!=='number')_0x2a6193=_0x2a6193['id'];const _0x54d71a=this['stateData'](_0x2a6193);_0x54d71a[_0x34bd46]=_0x189e4c;},Game_BattlerBase[_0x2e8d91(0x309)]['clearStateData']=function(_0x29bcdf){const _0xb7a2ed=_0x2e8d91;if(typeof _0x29bcdf!==_0xb7a2ed(0x267))_0x29bcdf=_0x29bcdf['id'];this[_0xb7a2ed(0x255)]=this[_0xb7a2ed(0x255)]||{},this[_0xb7a2ed(0x255)][_0x29bcdf]={};},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x489)]=function(_0x23639e){const _0x40a922=_0x2e8d91;if(typeof _0x23639e!==_0x40a922(0x267))_0x23639e=_0x23639e['id'];return this[_0x40a922(0x419)]=this['_stateDisplay']||{},this['_stateDisplay'][_0x23639e]===undefined&&(_0x40a922(0x413)!=='vcTOT'?this['_stateDisplay'][_0x23639e]='':_0x58ff63[_0x40a922(0x47c)][_0x40a922(0x2d2)](_0x4899ac[_0x40a922(0x383)]()[_0x40a922(0x265)]())),this[_0x40a922(0x419)][_0x23639e];},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x435)]=function(_0x4d2de2,_0xae40c4){const _0x2ec503=_0x2e8d91;if(typeof _0x4d2de2!==_0x2ec503(0x267))_0x4d2de2=_0x4d2de2['id'];this['_stateDisplay']=this[_0x2ec503(0x419)]||{},this[_0x2ec503(0x419)][_0x4d2de2]=_0xae40c4;},Game_BattlerBase['prototype'][_0x2e8d91(0x2e3)]=function(_0x2a47e7){const _0x42f901=_0x2e8d91;if(typeof _0x2a47e7!==_0x42f901(0x267))_0x2a47e7=_0x2a47e7['id'];this[_0x42f901(0x419)]=this['_stateDisplay']||{},this[_0x42f901(0x419)][_0x2a47e7]='';},Game_BattlerBase[_0x2e8d91(0x309)]['getStateOrigin']=function(_0x5a0fc1){const _0x2f0478=_0x2e8d91;if(typeof _0x5a0fc1!==_0x2f0478(0x267))_0x5a0fc1=_0x5a0fc1['id'];this[_0x2f0478(0x336)]=this[_0x2f0478(0x336)]||{},this[_0x2f0478(0x336)][_0x5a0fc1]=this[_0x2f0478(0x336)][_0x5a0fc1]||_0x2f0478(0x22e);const _0x3538f1=this[_0x2f0478(0x336)][_0x5a0fc1];return this[_0x2f0478(0x43d)](_0x3538f1);},Game_BattlerBase['prototype'][_0x2e8d91(0x300)]=function(_0xd2b383,_0x408148){const _0x336435=_0x2e8d91;this[_0x336435(0x336)]=this[_0x336435(0x336)]||{};const _0x5a1664=_0x408148?this[_0x336435(0x4ad)](_0x408148):this[_0x336435(0x484)]();this[_0x336435(0x336)][_0xd2b383]=_0x5a1664;},Game_BattlerBase['prototype'][_0x2e8d91(0x3d6)]=function(_0x350167){const _0x57fce5=_0x2e8d91;this[_0x57fce5(0x336)]=this[_0x57fce5(0x336)]||{},delete this[_0x57fce5(0x336)][_0x350167];},Game_BattlerBase['prototype']['getCurrentStateOriginKey']=function(){const _0x48c267=_0x2e8d91,_0x13b872=this[_0x48c267(0x1e0)]();return this[_0x48c267(0x4ad)](_0x13b872);},Game_BattlerBase[_0x2e8d91(0x309)]['getCurrentStateActiveUser']=function(){const _0x4f01d3=_0x2e8d91;if($gameParty[_0x4f01d3(0x3eb)]()){if('nXThZ'===_0x4f01d3(0x396)){if(BattleManager['_subject']){if(_0x4f01d3(0x418)==='VuOTo')return BattleManager[_0x4f01d3(0x200)];else{if(typeof _0x4e4430!==_0x4f01d3(0x267))_0x4d5190=_0x1b08d5['id'];this[_0x4f01d3(0x255)]=this['_stateData']||{},this[_0x4f01d3(0x255)][_0x30e0b7]={};}}else{if(BattleManager[_0x4f01d3(0x45b)])return BattleManager['_currentActor'];}}else this[_0x4f01d3(0x469)](_0x5a6217['normalColor']()),this['changeOutlineColor'](_0xe39629[_0x4f01d3(0x230)]());}else{const _0x30f665=SceneManager[_0x4f01d3(0x3b3)];if(![Scene_Map,Scene_Item][_0x4f01d3(0x359)](_0x30f665[_0x4f01d3(0x2ea)]))return $gameParty[_0x4f01d3(0x27c)]();}return this;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x4ad)]=function(_0x50da7f){const _0x19979a=_0x2e8d91;if(!_0x50da7f)return _0x19979a(0x22e);if(_0x50da7f['isActor']()){if('ClFFw'!==_0x19979a(0x2f1))return'<actor-%1>'[_0x19979a(0x49e)](_0x50da7f[_0x19979a(0x2f7)]());else{if(typeof _0x3a38b8!==_0x19979a(0x267))_0x182e93=_0x5b53b5['id'];this[_0x19979a(0x1b4)](_0x4ae565)&&(_0x411684+=this[_0x19979a(0x474)](_0x28f5eb),this[_0x19979a(0x43f)](_0x324755,_0x26157b));}}else{const _0x396ca7=_0x19979a(0x34d)['format'](_0x50da7f[_0x19979a(0x40b)]()),_0x37f9ae=_0x19979a(0x2f2)[_0x19979a(0x49e)](_0x50da7f[_0x19979a(0x223)]()),_0x6a8f1a='<troop-%1>'[_0x19979a(0x49e)]($gameTroop[_0x19979a(0x37d)]());return'%1\x20%2\x20%3'[_0x19979a(0x49e)](_0x396ca7,_0x37f9ae,_0x6a8f1a);}return _0x19979a(0x22e);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x43d)]=function(_0x2c8527){const _0x709098=_0x2e8d91;if(_0x2c8527===_0x709098(0x22e))return this;else{if(_0x2c8527[_0x709098(0x269)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if(_0x709098(0x3af)!==_0x709098(0x4a2)){if($gameParty[_0x709098(0x3eb)]()&&_0x2c8527[_0x709098(0x269)](/<troop-(\d+)>/i)){const _0x595d49=Number(RegExp['$1']);if(_0x595d49===$gameTroop['getCurrentTroopUniqueID']()){if(_0x709098(0x226)!=='GClyW'){const _0x185d27=_0x102d5c[_0x709098(0x372)]('['+_0x90c24f['$1'][_0x709098(0x269)](/\d+/g)+']');for(const _0x55c3b7 of _0x185d27){if(!_0x45fdbb[_0x709098(0x28c)](_0x55c3b7))return!![];}return![];}else{if(_0x2c8527[_0x709098(0x269)](/<member-(\d+)>/i)){if(_0x709098(0x2fe)!==_0x709098(0x404))return $gameTroop[_0x709098(0x374)]()[Number(RegExp['$1'])];else{const _0xdc14a9=0x0,_0x11f1c7=this['helpAreaTop'](),_0x397c80=_0x37e8bb[_0x709098(0x2a6)],_0x5729d8=this[_0x709098(0x281)]();return new _0x1d630e(_0xdc14a9,_0x11f1c7,_0x397c80,_0x5729d8);}}}}}if(_0x2c8527['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}else _0x4d6809['setDebuffTurns'](_0x3ac14b,_0x542c6d),this[_0x709098(0x378)](_0x526b55);}}return this;},VisuMZ[_0x2e8d91(0x367)]['Game_Battler_addState']=Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x342)],Game_Battler[_0x2e8d91(0x309)]['addState']=function(_0x4a5e16){const _0x4a1077=_0x2e8d91,_0xc1c1b5=this[_0x4a1077(0x23d)](_0x4a5e16);VisuMZ[_0x4a1077(0x367)][_0x4a1077(0x258)][_0x4a1077(0x1df)](this,_0x4a5e16);if(_0xc1c1b5&&this[_0x4a1077(0x1f7)]($dataStates[_0x4a5e16])){this[_0x4a1077(0x43e)](_0x4a5e16);;}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x1ae)]=Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x23d)],Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x23d)]=function(_0x48e846){const _0x2fa90a=_0x2e8d91,_0x1338cc=$dataStates[_0x48e846];if(_0x1338cc&&_0x1338cc['note'][_0x2fa90a(0x269)](/<NO DEATH CLEAR>/i))return!this[_0x2fa90a(0x2d9)](_0x48e846)&&!this['isStateRestrict'](_0x48e846)&&!this[_0x2fa90a(0x426)]['isStateRemoved'](_0x48e846);return VisuMZ[_0x2fa90a(0x367)]['Game_Battler_isStateAddable'][_0x2fa90a(0x1df)](this,_0x48e846);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x43e)]=function(_0x4033cb){const _0x4a6e06=_0x2e8d91;this[_0x4a6e06(0x300)](_0x4033cb),this[_0x4a6e06(0x26e)](_0x4033cb),this['onAddStateMakeCustomSlipValues'](_0x4033cb),this[_0x4a6e06(0x3b4)](_0x4033cb),this[_0x4a6e06(0x416)](_0x4033cb);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x2e1)]=function(_0x9d2e3d){const _0x3baf32=_0x2e8d91;this['onEraseStateCustomJS'](_0x9d2e3d),this[_0x3baf32(0x3c7)](_0x9d2e3d),Game_BattlerBase['prototype'][_0x3baf32(0x2e1)][_0x3baf32(0x1df)](this,_0x9d2e3d);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x27b)]=function(_0x1b1aad){const _0x433c5d=_0x2e8d91;for(const _0x12e839 of this[_0x433c5d(0x310)]()){if(this['isStateExpired'](_0x12e839['id'])&&_0x12e839[_0x433c5d(0x1c1)]===_0x1b1aad){if(_0x433c5d(0x36c)===_0x433c5d(0x41d)){const _0x44d1df=this[_0x433c5d(0x457)](_0x5c8ce9,_0x1a7f05),_0x4ad7e4=this[_0x433c5d(0x42c)](_0x44d1df,_0x14475f,_0x54d01e,_0x171f3c),_0x293c72=_0x180a4a+_0x4775d7-_0x4ad7e4[_0x433c5d(0x24b)];this['drawTextEx'](_0x44d1df,_0x293c72,_0x4dcc75,_0xcc5090),this[_0x433c5d(0x2cd)]();}else this[_0x433c5d(0x27d)](_0x12e839['id']),this['onExpireState'](_0x12e839['id']),this[_0x433c5d(0x437)](_0x12e839['id']);}}},Game_Battler['prototype'][_0x2e8d91(0x41f)]=function(_0xe51232){const _0x247b7d=_0x2e8d91;this[_0x247b7d(0x3bc)](_0xe51232);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x3b4)]=function(_0x337828){const _0x513092=_0x2e8d91;if(this[_0x513092(0x439)]||this[_0x513092(0x3b8)])return;const _0x5ea0b0=VisuMZ[_0x513092(0x367)][_0x513092(0x30c)];if(_0x5ea0b0[_0x337828])_0x5ea0b0[_0x337828]['call'](this,_0x337828);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x2da)]=function(_0x135b02){const _0x3e2758=_0x2e8d91;if(this[_0x3e2758(0x439)]||this[_0x3e2758(0x3b8)])return;const _0x179247=VisuMZ[_0x3e2758(0x367)][_0x3e2758(0x37c)];if(_0x179247[_0x135b02])_0x179247[_0x135b02][_0x3e2758(0x1df)](this,_0x135b02);},Game_Battler['prototype']['onExpireStateCustomJS']=function(_0x196c30){const _0x5f07d5=_0x2e8d91;if(this[_0x5f07d5(0x439)]||this[_0x5f07d5(0x3b8)])return;const _0x45690e=VisuMZ[_0x5f07d5(0x367)][_0x5f07d5(0x2c6)];if(_0x45690e[_0x196c30])_0x45690e[_0x196c30]['call'](this,_0x196c30);},Game_Battler[_0x2e8d91(0x309)]['onAddStateGlobalJS']=function(_0x24109e){const _0x525067=_0x2e8d91;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x525067(0x367)][_0x525067(0x325)]['States'][_0x525067(0x252)]['call'](this,_0x24109e);}catch(_0xb69d62){if(_0x525067(0x45f)!==_0x525067(0x45f))this[_0x525067(0x3ae)](_0x53f4f5);else{if($gameTemp[_0x525067(0x1b9)]())console[_0x525067(0x27e)](_0xb69d62);}}},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x3c7)]=function(_0x2a8e79){const _0x42f049=_0x2e8d91;if(this[_0x42f049(0x439)]||this[_0x42f049(0x3b8)])return;try{VisuMZ[_0x42f049(0x367)][_0x42f049(0x325)][_0x42f049(0x1d6)][_0x42f049(0x29b)]['call'](this,_0x2a8e79);}catch(_0x1f0e48){if($gameTemp[_0x42f049(0x1b9)]())console['log'](_0x1f0e48);}},Game_Battler['prototype'][_0x2e8d91(0x437)]=function(_0x2e8a89){const _0x369c9e=_0x2e8d91;if(this[_0x369c9e(0x439)]||this['_tempBattler'])return;try{'AbIrc'===_0x369c9e(0x2ab)?VisuMZ[_0x369c9e(0x367)]['Settings']['States'][_0x369c9e(0x2f6)][_0x369c9e(0x1df)](this,_0x2e8a89):this['onExpireStateCustomJS'](_0x483d27);}catch(_0x327696){if($gameTemp[_0x369c9e(0x1b9)]())console['log'](_0x327696);}},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x261)]=function(_0x48c12a){const _0x1b22c9=_0x2e8d91;return _0x48c12a=_0x48c12a['toUpperCase']()[_0x1b22c9(0x265)](),this['states']()[_0x1b22c9(0x224)](_0x23ecfe=>_0x23ecfe[_0x1b22c9(0x47c)][_0x1b22c9(0x359)](_0x48c12a));},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x444)]=function(_0x26ad77,_0x252b1b){const _0x19cbcf=_0x2e8d91;_0x26ad77=_0x26ad77['toUpperCase']()['trim'](),_0x252b1b=_0x252b1b||0x0;const _0x3cf76e=this[_0x19cbcf(0x261)](_0x26ad77),_0x69933c=[];for(const _0x254245 of _0x3cf76e){if(!_0x254245)continue;if(_0x252b1b<=0x0)break;_0x69933c[_0x19cbcf(0x2d2)](_0x254245['id']),this[_0x19cbcf(0x426)][_0x19cbcf(0x360)]=!![],_0x252b1b--;}while(_0x69933c[_0x19cbcf(0x3f6)]>0x0){this[_0x19cbcf(0x27d)](_0x69933c[_0x19cbcf(0x488)]());}},Game_Battler[_0x2e8d91(0x309)]['removeStatesByCategoryAll']=function(_0x300176,_0x242ca6){const _0x5b64fe=_0x2e8d91;_0x300176=_0x300176[_0x5b64fe(0x383)]()[_0x5b64fe(0x265)](),_0x242ca6=_0x242ca6||[];const _0x2085f6=this['statesByCategory'](_0x300176),_0x38d828=[];for(const _0x2f08e0 of _0x2085f6){if(!_0x2f08e0)continue;if(_0x242ca6['includes'](_0x2f08e0))continue;_0x38d828['push'](_0x2f08e0['id']),this[_0x5b64fe(0x426)][_0x5b64fe(0x360)]=!![];}while(_0x38d828[_0x5b64fe(0x3f6)]>0x0){_0x5b64fe(0x20b)!==_0x5b64fe(0x23a)?this[_0x5b64fe(0x27d)](_0x38d828[_0x5b64fe(0x488)]()):(_0x46dcee=_0x29a138(_0x497f10['$1']),_0x5296bb=_0x263290(_0x3f9f66['$2']));}},Game_Battler[_0x2e8d91(0x309)]['isStateCategoryAffected']=function(_0x3459ea){const _0x298a19=_0x2e8d91;return this[_0x298a19(0x201)](_0x3459ea)>0x0;},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x3e2)]=function(_0xb11745){const _0x19e696=_0x2e8d91;return this[_0x19e696(0x38c)](_0xb11745)>0x0;},Game_Battler['prototype'][_0x2e8d91(0x201)]=function(_0x4eb023){const _0x24ade2=_0x2e8d91,_0x1ccd63=this['statesByCategory'](_0x4eb023)[_0x24ade2(0x224)](_0x4cbc42=>this[_0x24ade2(0x1b4)](_0x4cbc42['id']));return _0x1ccd63['length'];},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x38c)]=function(_0x5c1900){const _0x43592a=_0x2e8d91,_0x1cb81c=this[_0x43592a(0x261)](_0x5c1900);return _0x1cb81c[_0x43592a(0x3f6)];},VisuMZ[_0x2e8d91(0x367)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2d9)],Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x2d9)]=function(_0x3c95d8){const _0x4596ca=_0x2e8d91,_0x129508=$dataStates[_0x3c95d8];if(_0x129508&&_0x129508['categories'][_0x4596ca(0x3f6)]>0x0)for(const _0x8e51d2 of _0x129508[_0x4596ca(0x47c)]){if(this[_0x4596ca(0x366)](_0x8e51d2))return!![];}return VisuMZ[_0x4596ca(0x367)]['Game_BattlerBase_isStateResist']['call'](this,_0x3c95d8);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x366)]=function(_0x56d767){const _0xe36670=_0x2e8d91;let _0xa9a63c=_0xe36670(0x44c);if(this[_0xe36670(0x3cd)](_0xa9a63c))return this['_cache'][_0xa9a63c][_0xe36670(0x359)](_0x56d767);return this[_0xe36670(0x232)][_0xa9a63c]=this[_0xe36670(0x391)](),this[_0xe36670(0x232)][_0xa9a63c]['includes'](_0x56d767);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x391)]=function(){const _0x4bfd6a=_0x2e8d91,_0x3b5244=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x29ee60=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x58592d=[];for(const _0x13ceb4 of this[_0x4bfd6a(0x1f2)]()){if('GmEhU'===_0x4bfd6a(0x280)){if(typeof _0x347678===_0x4bfd6a(0x267))_0x5b5d90=_0x17241e[_0x5094db];return this[_0x4bfd6a(0x310)]()[_0x4bfd6a(0x359)](_0x581153);}else{if(!_0x13ceb4)continue;const _0x47d94c=_0x13ceb4[_0x4bfd6a(0x417)],_0x1d6c85=_0x47d94c['match'](_0x3b5244);if(_0x1d6c85)for(const _0x432b9d of _0x1d6c85){_0x432b9d[_0x4bfd6a(0x269)](_0x3b5244);const _0x537fde=String(RegExp['$1'])[_0x4bfd6a(0x21e)](',')[_0x4bfd6a(0x3d9)](_0x13cc8b=>String(_0x13cc8b)[_0x4bfd6a(0x383)]()['trim']());_0x58592d=_0x58592d[_0x4bfd6a(0x2ff)](_0x537fde);}if(_0x47d94c[_0x4bfd6a(0x269)](_0x29ee60)){if(_0x4bfd6a(0x475)!==_0x4bfd6a(0x364)){const _0x3b304e=String(RegExp['$1'])[_0x4bfd6a(0x21e)](/[\r\n]+/)[_0x4bfd6a(0x3d9)](_0x49a107=>String(_0x49a107)[_0x4bfd6a(0x383)]()['trim']());_0x58592d=_0x58592d['concat'](_0x3b304e);}else return this[_0x4bfd6a(0x2e2)]()[_0x4bfd6a(0x269)](/LOWER/i);}}}return _0x58592d;},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x26e)]=function(_0x18f61f){const _0x1b9471=_0x2e8d91,_0x2a64ed=$dataStates[_0x18f61f];if(!_0x2a64ed)return;const _0x154dc3=_0x2a64ed[_0x1b9471(0x417)]||'',_0xd1effa=_0x154dc3['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0xd1effa){if(_0x1b9471(0x3c6)!==_0x1b9471(0x3f1)){const _0x146c2c=[_0x2a64ed];for(const _0x416a94 of _0xd1effa){_0x416a94[_0x1b9471(0x269)](/<REMOVE OTHER (.*) STATES>/i);const _0x1eb4cb=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x1eb4cb,_0x146c2c);}}else{const _0x40c176=_0x76c838[_0x1b9471(0x372)]('['+_0x14be87['$1'][_0x1b9471(0x269)](/\d+/g)+']');for(const _0x16731d of _0x40c176){if(!_0x58b1f9[_0x1b9471(0x28c)](_0x16731d))return![];}return!![];}}},VisuMZ[_0x2e8d91(0x367)]['Game_Battler_addBuff']=Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x326)],Game_Battler['prototype'][_0x2e8d91(0x326)]=function(_0x23375e,_0x4a13b1){const _0x347ff3=_0x2e8d91;VisuMZ[_0x347ff3(0x367)]['Game_Battler_addBuff']['call'](this,_0x23375e,_0x4a13b1),this['isBuffAffected'](_0x23375e)&&this[_0x347ff3(0x26d)](_0x23375e,_0x4a13b1);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x3cf)]=function(_0x31f97f){},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x3fc)]=Game_Battler['prototype'][_0x2e8d91(0x345)],Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x345)]=function(_0x1ff643,_0x331502){const _0x2a98de=_0x2e8d91;VisuMZ['SkillsStatesCore'][_0x2a98de(0x3fc)]['call'](this,_0x1ff643,_0x331502);if(this[_0x2a98de(0x324)](_0x1ff643)){if(_0x2a98de(0x468)===_0x2a98de(0x468))this['onAddDebuff'](_0x1ff643,_0x331502);else{const _0x27b830=_0x3647f9[_0x2a98de(0x372)]('['+_0x498da8['$1']['match'](/\d+/g)+']');for(const _0x17abd4 of _0x27b830){if(!_0x4a72e6[_0x2a98de(0x28c)](_0x17abd4))return![];}return!![];}}},Game_Battler['prototype'][_0x2e8d91(0x394)]=function(){const _0x17dee8=_0x2e8d91;for(let _0x88424f=0x0;_0x88424f<this[_0x17dee8(0x272)]();_0x88424f++){if('oDpMu'!==_0x17dee8(0x37b)){if(this['isBuffExpired'](_0x88424f)){const _0x21aeb6=this[_0x17dee8(0x43c)][_0x88424f];this[_0x17dee8(0x45d)](_0x88424f);if(_0x21aeb6>0x0)this[_0x17dee8(0x1e7)](_0x88424f);if(_0x21aeb6<0x0)this[_0x17dee8(0x22c)](_0x88424f);}}else{_0x2c957e['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x30ebda=_0x230807['$1'];if(_0x30ebda['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x37a70c=_0x6cf43a[_0x17dee8(0x372)]('['+_0x4cf937['$1'][_0x17dee8(0x269)](/\d+/g)+']');this[_0x17dee8(0x232)][_0x17dee8(0x1be)]=this[_0x17dee8(0x232)][_0x17dee8(0x1be)][_0x17dee8(0x2ff)](_0x37a70c);}else{const _0x44963d=_0x30ebda[_0x17dee8(0x21e)](',');for(const _0x5dcd2a of _0x44963d){const _0x1f4dad=_0x399468[_0x17dee8(0x3e9)](_0x5dcd2a);if(_0x1f4dad)this['_cache'][_0x17dee8(0x1be)]['push'](_0x1f4dad);}}}}},Game_Battler[_0x2e8d91(0x309)]['onAddBuff']=function(_0x7dca9e,_0x2c1754){this['onAddBuffGlobalJS'](_0x7dca9e,_0x2c1754);},Game_Battler[_0x2e8d91(0x309)]['onAddDebuff']=function(_0x25af3a,_0x2bb90b){this['onAddDebuffGlobalJS'](_0x25af3a,_0x2bb90b);},Game_Battler[_0x2e8d91(0x309)]['onEraseBuff']=function(_0x579cca){const _0x22c565=_0x2e8d91;Game_BattlerBase[_0x22c565(0x309)]['onEraseBuff']['call'](this,_0x579cca),this['onEraseBuffGlobalJS'](_0x579cca);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x1e2)]=function(_0x5451f4){const _0x5a9018=_0x2e8d91;Game_BattlerBase[_0x5a9018(0x309)][_0x5a9018(0x1e2)][_0x5a9018(0x1df)](this,_0x5451f4),this[_0x5a9018(0x482)](_0x5451f4);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x1e7)]=function(_0x13184e){this['onExpireBuffGlobalJS'](_0x13184e);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x22c)]=function(_0x149457){const _0xf16b9f=_0x2e8d91;this[_0xf16b9f(0x3ae)](_0x149457);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x346)]=function(_0x51dce1,_0x5816fc){const _0x4feafe=_0x2e8d91;VisuMZ[_0x4feafe(0x367)]['Settings'][_0x4feafe(0x29f)]['onAddBuffJS'][_0x4feafe(0x1df)](this,_0x51dce1,_0x5816fc);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x32d)]=function(_0x5090a9,_0x299fe3){const _0x17f79b=_0x2e8d91;VisuMZ[_0x17f79b(0x367)][_0x17f79b(0x325)]['Buffs'][_0x17f79b(0x1af)]['call'](this,_0x5090a9,_0x299fe3);},Game_BattlerBase['prototype'][_0x2e8d91(0x23c)]=function(_0x22e87f){const _0x54ff78=_0x2e8d91;VisuMZ['SkillsStatesCore'][_0x54ff78(0x325)][_0x54ff78(0x29f)][_0x54ff78(0x3a9)][_0x54ff78(0x1df)](this,_0x22e87f);},Game_BattlerBase[_0x2e8d91(0x309)][_0x2e8d91(0x482)]=function(_0x28a1b2){const _0x5791cd=_0x2e8d91;VisuMZ[_0x5791cd(0x367)][_0x5791cd(0x325)][_0x5791cd(0x29f)][_0x5791cd(0x399)][_0x5791cd(0x1df)](this,_0x28a1b2);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x290)]=function(_0x3b3cb2){const _0x60c3d7=_0x2e8d91;VisuMZ[_0x60c3d7(0x367)][_0x60c3d7(0x325)][_0x60c3d7(0x29f)][_0x60c3d7(0x1bc)][_0x60c3d7(0x1df)](this,_0x3b3cb2);},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x3ae)]=function(_0x319d83){const _0x256664=_0x2e8d91;VisuMZ[_0x256664(0x367)][_0x256664(0x325)][_0x256664(0x29f)][_0x256664(0x1bf)][_0x256664(0x1df)](this,_0x319d83);},Game_Battler['prototype'][_0x2e8d91(0x420)]=function(_0x5decf7){const _0x248255=_0x2e8d91,_0x5c2897=VisuMZ[_0x248255(0x367)],_0x1e3f90=[_0x248255(0x24d),_0x248255(0x49f),_0x248255(0x333),_0x248255(0x3f8),_0x248255(0x1f0),_0x248255(0x2ae)];for(const _0xe9a1cf of _0x1e3f90){_0x5c2897[_0xe9a1cf][_0x5decf7]&&_0x5c2897[_0xe9a1cf][_0x5decf7]['call'](this,_0x5decf7);}},VisuMZ[_0x2e8d91(0x367)]['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0x2e8d91(0x1fe)],Game_Battler[_0x2e8d91(0x309)]['regenerateAll']=function(){const _0x5d1ebe=_0x2e8d91;this['recalculateSlipDamageJS'](),VisuMZ['SkillsStatesCore'][_0x5d1ebe(0x3aa)][_0x5d1ebe(0x1df)](this),this['setPassiveStateSlipDamageJS'](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x2e8d91(0x309)]['setPassiveStateSlipDamageJS']=function(){const _0x4a5f95=_0x2e8d91;for(const _0x1ceb48 of this[_0x4a5f95(0x1be)]()){if(!_0x1ceb48)continue;this[_0x4a5f95(0x420)](_0x1ceb48['id']);}},Game_Battler['prototype']['recalculateSlipDamageJS']=function(){const _0x481fd4=_0x2e8d91;for(const _0x232696 of this['states']()){if(_0x481fd4(0x430)!==_0x481fd4(0x318)){if(!_0x232696)continue;if(_0x232696['note'][_0x481fd4(0x269)](/<JS SLIP REFRESH>/i)){if(_0x481fd4(0x421)!=='iBkVY')this[_0x481fd4(0x420)](_0x232696['id']);else{this[_0x481fd4(0x2cd)]();const _0x5981fc=_0x4105ba[_0x3662c5];if(_0x5981fc)!_0x5364ce['includes'](_0x5981fc)&&this['drawActorStateTurns'](_0x1900cc,_0x5981fc,_0x1392b6,_0x3f48b9),this[_0x481fd4(0x446)](_0x137f27,_0x5981fc,_0x5caeb2,_0x3b6c1c),_0x11cd14['push'](_0x5981fc);else{const _0x51abdd=_0x53468b[_0x476f67-_0x57f0ca[_0x481fd4(0x3f6)]];this[_0x481fd4(0x2df)](_0x5f1ee2,_0x51abdd,_0x1e0ed7,_0x4df009),this['drawActorBuffRates'](_0x2000e6,_0x51abdd,_0x1fdf29,_0x2db4ba);}_0x4e3478+=_0x4d9273;}}}else{const _0x31c88b=_0x4da0f2[_0x481fd4(0x2a2)]['call'](_0x5dd795,_0x4bbb0d);return _0x27cb9f['ShowJS'][_0x481fd4(0x1df)](_0x192695,_0x35cf6f,_0x31c88b,_0x5deed2);}}},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x330)]=function(){const _0x6cac04=_0x2e8d91;if(!this['isAlive']())return;const _0x454ef6=this[_0x6cac04(0x310)]();for(const _0x402388 of _0x454ef6){if(_0x6cac04(0x2dc)!==_0x6cac04(0x1c6)){if(!_0x402388)continue;this[_0x6cac04(0x458)](_0x402388);}else{const _0x3baadc=this[_0x6cac04(0x2dd)]()['note'];if(_0x3baadc['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x360693=_0x5648b9(_0x139586['$1']);if(_0x126be2['isStateCategoryAffected'](_0x360693))return!![];}if(_0x3baadc[_0x6cac04(0x269)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x1d1ac2=_0x537860(_0x4db5e5['$1']);if(_0x31810c[_0x6cac04(0x1b4)](_0x1d1ac2))return!![];}else{if(_0x3baadc[_0x6cac04(0x269)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x2bc2d4=_0x58c491[_0x6cac04(0x3e9)](_0x41deaf['$1']);if(_0x4e7168[_0x6cac04(0x1b4)](_0x2bc2d4))return!![];}}return![];}}},Game_Battler[_0x2e8d91(0x309)][_0x2e8d91(0x458)]=function(_0x134968){const _0xc92493=_0x2e8d91,_0x420205=this[_0xc92493(0x35e)](_0x134968['id'],'slipHp')||0x0,_0x1d7480=-this[_0xc92493(0x2fa)](),_0x13e1a2=Math[_0xc92493(0x25b)](_0x420205,_0x1d7480);if(_0x13e1a2!==0x0)this[_0xc92493(0x1c5)](_0x13e1a2);const _0x16b4ea=this[_0xc92493(0x35e)](_0x134968['id'],_0xc92493(0x477))||0x0;if(_0x16b4ea!==0x0)this[_0xc92493(0x425)](_0x16b4ea);const _0x338c05=this[_0xc92493(0x35e)](_0x134968['id'],_0xc92493(0x3b0))||0x0;if(_0x338c05!==0x0)this[_0xc92493(0x241)](_0x338c05);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x2f3)]=Game_Actor['prototype'][_0x2e8d91(0x42a)],Game_Actor[_0x2e8d91(0x309)]['skillTypes']=function(){const _0x28360f=_0x2e8d91,_0x4bbdac=VisuMZ[_0x28360f(0x367)]['Game_Actor_skillTypes'][_0x28360f(0x1df)](this),_0x34674e=VisuMZ[_0x28360f(0x367)][_0x28360f(0x325)][_0x28360f(0x1b6)];let _0x503829=_0x34674e[_0x28360f(0x41e)];return $gameParty[_0x28360f(0x3eb)]()&&(_0x503829=_0x503829[_0x28360f(0x2ff)](_0x34674e[_0x28360f(0x35b)])),_0x4bbdac[_0x28360f(0x224)](_0x250136=>!_0x503829['includes'](_0x250136));},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x338)]=function(){const _0x35c809=_0x2e8d91;return this[_0x35c809(0x3b6)]()['filter'](_0x30b8c7=>this['isSkillUsableForAutoBattle'](_0x30b8c7));},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x2e5)]=function(_0x427af6){const _0x4aca12=_0x2e8d91;if(!this[_0x4aca12(0x495)](_0x427af6))return![];if(!_0x427af6)return![];if(!this['isSkillTypeMatchForUse'](_0x427af6))return![];if(this[_0x4aca12(0x37a)](_0x427af6))return![];return!![];},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x1d2)]=function(_0x1d74af){const _0x29ca23=_0x2e8d91,_0x48fbb0=this[_0x29ca23(0x42a)](),_0x5b1266=DataManager[_0x29ca23(0x39d)](_0x1d74af),_0x3a3418=_0x48fbb0[_0x29ca23(0x224)](_0x3aaea2=>_0x5b1266[_0x29ca23(0x359)](_0x3aaea2));return _0x3a3418[_0x29ca23(0x3f6)]>0x0;},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x37a)]=function(_0x306174){const _0x3be8d8=_0x2e8d91;if(!VisuMZ[_0x3be8d8(0x367)][_0x3be8d8(0x49d)](this,_0x306174))return!![];if(!VisuMZ[_0x3be8d8(0x367)]['CheckVisibleSwitchNotetags'](this,_0x306174))return!![];if(!VisuMZ[_0x3be8d8(0x367)][_0x3be8d8(0x22b)](this,_0x306174))return!![];return![];},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x3b9)]=function(){const _0x158377=_0x2e8d91;let _0x8daae8=[this['actor'](),this[_0x158377(0x1fa)]()];_0x8daae8=_0x8daae8['concat'](this[_0x158377(0x3db)]()[_0x158377(0x224)](_0x500838=>_0x500838));for(const _0x48d7ca of this[_0x158377(0x30d)]){if('jxZcc'!=='vyoaG'){const _0x2b02e0=$dataSkills[_0x48d7ca];if(_0x2b02e0)_0x8daae8[_0x158377(0x2d2)](_0x2b02e0);}else this[_0x158377(0x336)]=this['_stateOrigin']||{},delete this['_stateOrigin'][_0x2107ba];}return _0x8daae8;},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x3d3)]=function(){const _0x38d0a7=_0x2e8d91;Game_Battler[_0x38d0a7(0x309)][_0x38d0a7(0x3d3)]['call'](this);const _0x69d61=VisuMZ[_0x38d0a7(0x367)][_0x38d0a7(0x325)][_0x38d0a7(0x274)][_0x38d0a7(0x357)];this[_0x38d0a7(0x232)]['passiveStates']=this['_cache'][_0x38d0a7(0x1be)]['concat'](_0x69d61);},VisuMZ[_0x2e8d91(0x367)]['Game_Actor_learnSkill']=Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x1f6)],Game_Actor[_0x2e8d91(0x309)]['learnSkill']=function(_0x112fb7){const _0x1ad60e=_0x2e8d91;VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x1ad60e(0x1df)](this,_0x112fb7),this[_0x1ad60e(0x232)]={};},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x496)]=Game_Actor[_0x2e8d91(0x309)]['forgetSkill'],Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x424)]=function(_0x5d5b10){const _0x2e43c4=_0x2e8d91;VisuMZ[_0x2e43c4(0x367)][_0x2e43c4(0x496)]['call'](this,_0x5d5b10),this[_0x2e43c4(0x232)]={};},Game_Actor[_0x2e8d91(0x309)][_0x2e8d91(0x292)]=function(){const _0x2f9ebe=_0x2e8d91;return VisuMZ[_0x2f9ebe(0x367)][_0x2f9ebe(0x325)][_0x2f9ebe(0x1d6)][_0x2f9ebe(0x36f)]??0x14;},Game_Enemy[_0x2e8d91(0x309)][_0x2e8d91(0x3b9)]=function(){const _0x4649d2=_0x2e8d91;let _0x408580=[this[_0x4649d2(0x31c)]()];return _0x408580['concat'](this[_0x4649d2(0x3b6)]());},Game_Enemy[_0x2e8d91(0x309)]['addPassiveStatesByPluginParameters']=function(){const _0x5bba04=_0x2e8d91;Game_Battler[_0x5bba04(0x309)][_0x5bba04(0x3d3)][_0x5bba04(0x1df)](this);const _0x4aee1e=VisuMZ[_0x5bba04(0x367)]['Settings'][_0x5bba04(0x274)][_0x5bba04(0x48a)];this[_0x5bba04(0x232)]['passiveStates']=this['_cache'][_0x5bba04(0x1be)][_0x5bba04(0x2ff)](_0x4aee1e);},Game_Enemy[_0x2e8d91(0x309)]['skills']=function(){const _0x1bb06a=_0x2e8d91,_0x473f6a=[];for(const _0x55d35b of this[_0x1bb06a(0x31c)]()[_0x1bb06a(0x236)]){const _0x2132d7=$dataSkills[_0x55d35b[_0x1bb06a(0x409)]];if(_0x2132d7&&!_0x473f6a[_0x1bb06a(0x359)](_0x2132d7))_0x473f6a['push'](_0x2132d7);}return _0x473f6a;},Game_Enemy['prototype']['meetsStateCondition']=function(_0x2051b8){const _0x5f4061=_0x2e8d91;return this[_0x5f4061(0x1f7)]($dataStates[_0x2051b8]);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x275)]=Game_Unit[_0x2e8d91(0x309)][_0x2e8d91(0x3ff)],Game_Unit['prototype'][_0x2e8d91(0x3ff)]=function(){const _0xd21a2f=_0x2e8d91;if(this[_0xd21a2f(0x471)]())return!![];return VisuMZ[_0xd21a2f(0x367)][_0xd21a2f(0x275)][_0xd21a2f(0x1df)](this);},Game_Unit[_0x2e8d91(0x309)][_0x2e8d91(0x471)]=function(){const _0x74ba6e=_0x2e8d91,_0x5896d4=this[_0x74ba6e(0x321)]();for(const _0x12edd3 of _0x5896d4){if(!_0x12edd3[_0x74ba6e(0x37e)]())return![];}return!![];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x25c)]=Game_Troop[_0x2e8d91(0x309)]['setup'],Game_Troop[_0x2e8d91(0x309)]['setup']=function(_0xf4cc5c){const _0x342106=_0x2e8d91;VisuMZ[_0x342106(0x367)]['Game_Troop_setup'][_0x342106(0x1df)](this,_0xf4cc5c),this[_0x342106(0x355)]();},Game_Troop[_0x2e8d91(0x309)][_0x2e8d91(0x355)]=function(){const _0x2011b6=_0x2e8d91;this[_0x2011b6(0x453)]=Graphics[_0x2011b6(0x24f)];},Game_Troop[_0x2e8d91(0x309)][_0x2e8d91(0x37d)]=function(){const _0xe81237=_0x2e8d91;return this[_0xe81237(0x453)]=this['_currentTroopUniqueID']||Graphics[_0xe81237(0x24f)],this[_0xe81237(0x453)];},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x1f9)]=function(){const _0x4be319=_0x2e8d91;if(ConfigManager[_0x4be319(0x3ab)]&&ConfigManager[_0x4be319(0x3d8)]!==undefined){if(_0x4be319(0x491)===_0x4be319(0x2cb)){const _0xb0d89f=_0x433466[_0x4be319(0x367)][_0x4be319(0x320)];if(_0xb0d89f[_0x3cb743['id']]&&!_0xb0d89f[_0x4503c3['id']][_0x4be319(0x1df)](this,_0x5c0ead))return![];return!![];}else return ConfigManager[_0x4be319(0x3d8)];}else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4be319(0x2e2)]()['match'](/LOWER/i);else{if(_0x4be319(0x3e7)!==_0x4be319(0x3e7))return!![];else Scene_ItemBase[_0x4be319(0x309)][_0x4be319(0x229)][_0x4be319(0x1df)](this);}}},Scene_Skill[_0x2e8d91(0x309)]['isRightInputMode']=function(){const _0x483578=_0x2e8d91;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x483578(0x23b)]!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x483578(0x2fb)]()?this[_0x483578(0x2e2)]()[_0x483578(0x269)](/RIGHT/i):Scene_ItemBase[_0x483578(0x309)][_0x483578(0x229)][_0x483578(0x1df)](this);},Scene_Skill[_0x2e8d91(0x309)]['updatedLayoutStyle']=function(){const _0x1d9f3e=_0x2e8d91;return VisuMZ[_0x1d9f3e(0x367)]['Settings'][_0x1d9f3e(0x1b6)][_0x1d9f3e(0x262)];},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x3cc)]=function(){const _0x2ad0b6=_0x2e8d91;return this['_categoryWindow']&&this['_categoryWindow'][_0x2ad0b6(0x3cc)]();},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x2fb)]=function(){const _0x738e26=_0x2e8d91;return VisuMZ[_0x738e26(0x367)][_0x738e26(0x325)][_0x738e26(0x1b6)]['EnableLayout'];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x371)]=Scene_Skill['prototype'][_0x2e8d91(0x311)],Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x311)]=function(){const _0xe26b8e=_0x2e8d91;return this[_0xe26b8e(0x2fb)]()?this[_0xe26b8e(0x2ba)]():VisuMZ[_0xe26b8e(0x367)][_0xe26b8e(0x371)][_0xe26b8e(0x1df)](this);},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x2ba)]=function(){const _0xa004f=_0x2e8d91,_0x458228=0x0,_0x58b766=this['helpAreaTop'](),_0x378dcb=Graphics['boxWidth'],_0x259c81=this[_0xa004f(0x281)]();return new Rectangle(_0x458228,_0x58b766,_0x378dcb,_0x259c81);},VisuMZ[_0x2e8d91(0x367)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x32a)],Scene_Skill['prototype'][_0x2e8d91(0x32a)]=function(){const _0x3cb118=_0x2e8d91;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x3cb118(0x2c3)===_0x3cb118(0x2c3))return this[_0x3cb118(0x316)]();else{const _0x415b20=_0x50adc2[_0x3cb118(0x372)]('['+_0x550751['$1'][_0x3cb118(0x269)](/\d+/g)+']');for(const _0x28881f of _0x415b20){if(!_0x18c6b2[_0x3cb118(0x28c)](_0x28881f))return![];}return!![];}}else{if(_0x3cb118(0x1dd)!=='fhoKq')return VisuMZ[_0x3cb118(0x367)][_0x3cb118(0x369)]['call'](this);else{const _0x401be5=_0x272223[_0x3cb118(0x367)][_0x3cb118(0x473)][_0x3cb118(0x1df)](this);return this[_0x3cb118(0x2e7)]()&&this[_0x3cb118(0x35c)]()&&(_0x401be5[_0x3cb118(0x24b)]-=this[_0x3cb118(0x1de)]()),_0x401be5;}}},Scene_Skill['prototype'][_0x2e8d91(0x316)]=function(){const _0x49e619=_0x2e8d91,_0x29fb25=this['mainCommandWidth'](),_0x479fa3=this[_0x49e619(0x463)](0x3,!![]),_0x1dc66e=this['isRightInputMode']()?Graphics[_0x49e619(0x2a6)]-_0x29fb25:0x0,_0x5e6646=this['mainAreaTop']();return new Rectangle(_0x1dc66e,_0x5e6646,_0x29fb25,_0x479fa3);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x415)],Scene_Skill['prototype'][_0x2e8d91(0x415)]=function(){const _0x15c014=_0x2e8d91;if(this[_0x15c014(0x2fb)]()){if('NdwcZ'!==_0x15c014(0x303))return this[_0x15c014(0x313)]();else{const _0x1df81b=this[_0x15c014(0x35e)](_0x5e6ef5['id'],'slipHp')||0x0,_0x14ab7d=-this[_0x15c014(0x2fa)](),_0x4f4e26=_0x554f5f[_0x15c014(0x25b)](_0x1df81b,_0x14ab7d);if(_0x4f4e26!==0x0)this[_0x15c014(0x1c5)](_0x4f4e26);const _0x259072=this[_0x15c014(0x35e)](_0x5305e1['id'],_0x15c014(0x477))||0x0;if(_0x259072!==0x0)this[_0x15c014(0x425)](_0x259072);const _0x11cb22=this[_0x15c014(0x35e)](_0x1e2702['id'],_0x15c014(0x3b0))||0x0;if(_0x11cb22!==0x0)this[_0x15c014(0x241)](_0x11cb22);}}else return VisuMZ['SkillsStatesCore'][_0x15c014(0x4ac)][_0x15c014(0x1df)](this);},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x313)]=function(){const _0x2ec43f=_0x2e8d91,_0x86f831=Graphics['boxWidth']-this[_0x2ec43f(0x348)](),_0x410c49=this[_0x2ec43f(0x3ef)][_0x2ec43f(0x2b8)],_0x3dffe8=this['isRightInputMode']()?0x0:Graphics[_0x2ec43f(0x2a6)]-_0x86f831,_0xb9a26b=this[_0x2ec43f(0x323)]();return new Rectangle(_0x3dffe8,_0xb9a26b,_0x86f831,_0x410c49);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x31b)]=Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x382)],Scene_Skill[_0x2e8d91(0x309)]['createItemWindow']=function(){const _0x56f1fe=_0x2e8d91;VisuMZ['SkillsStatesCore'][_0x56f1fe(0x31b)][_0x56f1fe(0x1df)](this),this[_0x56f1fe(0x2e7)]()&&this[_0x56f1fe(0x1cd)]();},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x473)]=Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x3ed)],Scene_Skill['prototype'][_0x2e8d91(0x3ed)]=function(){const _0x367448=_0x2e8d91;if(this[_0x367448(0x2fb)]())return this[_0x367448(0x452)]();else{const _0xc7cb69=VisuMZ[_0x367448(0x367)][_0x367448(0x473)][_0x367448(0x1df)](this);return this[_0x367448(0x2e7)]()&&this[_0x367448(0x35c)]()&&(_0xc7cb69['width']-=this[_0x367448(0x1de)]()),_0xc7cb69;}},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x452)]=function(){const _0x4237e2=_0x2e8d91,_0x3b646e=Graphics['boxWidth']-this[_0x4237e2(0x1de)](),_0x48498b=this[_0x4237e2(0x46c)]()-this[_0x4237e2(0x32c)][_0x4237e2(0x2b8)],_0xa17851=this[_0x4237e2(0x229)]()?Graphics['boxWidth']-_0x3b646e:0x0,_0xe9fcde=this['_statusWindow']['y']+this[_0x4237e2(0x32c)][_0x4237e2(0x2b8)];return new Rectangle(_0xa17851,_0xe9fcde,_0x3b646e,_0x48498b);},Scene_Skill[_0x2e8d91(0x309)]['allowCreateShopStatusWindow']=function(){const _0x59ddb6=_0x2e8d91;if(!Imported[_0x59ddb6(0x480)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ['SkillsStatesCore'][_0x59ddb6(0x325)][_0x59ddb6(0x1b6)][_0x59ddb6(0x497)];},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x35c)]=function(){const _0xd9c3e1=_0x2e8d91;return VisuMZ['SkillsStatesCore'][_0xd9c3e1(0x325)][_0xd9c3e1(0x1b6)][_0xd9c3e1(0x231)];},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x1cd)]=function(){const _0x3f88ae=_0x2e8d91,_0xc6f818=this[_0x3f88ae(0x25d)]();this[_0x3f88ae(0x21f)]=new Window_ShopStatus(_0xc6f818),this['addWindow'](this[_0x3f88ae(0x21f)]),this[_0x3f88ae(0x250)][_0x3f88ae(0x388)](this[_0x3f88ae(0x21f)]);const _0x53637c=VisuMZ['SkillsStatesCore']['Settings'][_0x3f88ae(0x1b6)]['SkillSceneStatusBgType'];this[_0x3f88ae(0x21f)][_0x3f88ae(0x33a)](_0x53637c||0x0);},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x25d)]=function(){const _0x169cac=_0x2e8d91;if(this[_0x169cac(0x2fb)]()){if('lHeJm'!==_0x169cac(0x34b)){if(!_0x1b0725[_0x169cac(0x28c)](_0x1c8355))return![];}else return this[_0x169cac(0x49c)]();}else return VisuMZ[_0x169cac(0x367)][_0x169cac(0x325)][_0x169cac(0x1b6)][_0x169cac(0x4b0)][_0x169cac(0x1df)](this);},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x49c)]=function(){const _0x1d105b=_0x2e8d91,_0x4c3bf5=this['shopStatusWidth'](),_0x531fe1=this['_itemWindow'][_0x1d105b(0x2b8)],_0x73b127=this[_0x1d105b(0x229)]()?0x0:Graphics[_0x1d105b(0x2a6)]-this['shopStatusWidth'](),_0x14d3a0=this[_0x1d105b(0x250)]['y'];return new Rectangle(_0x73b127,_0x14d3a0,_0x4c3bf5,_0x531fe1);},Scene_Skill[_0x2e8d91(0x309)][_0x2e8d91(0x1de)]=function(){const _0x2edbd1=_0x2e8d91;if(Imported[_0x2edbd1(0x480)]){if(_0x2edbd1(0x28d)===_0x2edbd1(0x28d))return Scene_Shop[_0x2edbd1(0x309)][_0x2edbd1(0x233)]();else{if(!this['checkSkillConditionsSwitchNotetags'](_0x165291))return![];return!![];}}else return 0x0;},Scene_Skill['prototype'][_0x2e8d91(0x1e4)]=function(){const _0x1db66b=_0x2e8d91;return this[_0x1db66b(0x3ef)]&&this[_0x1db66b(0x3ef)][_0x1db66b(0x36d)]?TextManager[_0x1db66b(0x1e5)]:'';},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x344)]=Sprite_Gauge[_0x2e8d91(0x309)]['initMembers'],Sprite_Gauge['prototype'][_0x2e8d91(0x2ee)]=function(){const _0x3b6df3=_0x2e8d91;VisuMZ[_0x3b6df3(0x367)][_0x3b6df3(0x344)][_0x3b6df3(0x1df)](this),this['_costSettings']=null;},VisuMZ['SkillsStatesCore']['Sprite_Gauge_setup']=Sprite_Gauge['prototype']['setup'],Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x429)]=function(_0x29896d,_0x18a1fd){const _0x2dc490=_0x2e8d91;this['setupSkillsStatesCore'](_0x29896d,_0x18a1fd),_0x18a1fd=_0x18a1fd[_0x2dc490(0x350)](),VisuMZ[_0x2dc490(0x367)]['Sprite_Gauge_setup'][_0x2dc490(0x1df)](this,_0x29896d,_0x18a1fd);},Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x381)]=function(_0x5dd000,_0x3d81af){const _0x58037e=_0x2e8d91,_0x3631f3=VisuMZ[_0x58037e(0x367)][_0x58037e(0x325)][_0x58037e(0x31d)][_0x58037e(0x224)](_0x2d2fa6=>_0x2d2fa6[_0x58037e(0x299)]['toUpperCase']()===_0x3d81af[_0x58037e(0x383)]());if(_0x3631f3[_0x58037e(0x3f6)]>=0x1){if(_0x58037e(0x312)===_0x58037e(0x1b0)){let _0x2840da=this[_0x58037e(0x1b4)](_0x44dd9c);_0x1f78e6[_0x58037e(0x367)]['Game_BattlerBase_eraseState'][_0x58037e(0x1df)](this,_0x54a52c);if(_0x2840da&&!this[_0x58037e(0x1b4)](_0x4a24fd))this[_0x58037e(0x2e1)](_0x5303dc);}else this[_0x58037e(0x2eb)]=_0x3631f3[0x0];}else{if(_0x58037e(0x218)===_0x58037e(0x218))this[_0x58037e(0x2eb)]=null;else{const _0x4b070d=_0x25b0fd[_0x5189a8];if(_0x4b070d&&_0x4b070d[_0x58037e(0x47c)]['length']>0x0)for(const _0x3e7e85 of _0x4b070d[_0x58037e(0x47c)]){if(this[_0x58037e(0x366)](_0x3e7e85))return!![];}return _0x2436ca[_0x58037e(0x367)]['Game_BattlerBase_isStateResist'][_0x58037e(0x1df)](this,_0x4c66d1);}}},VisuMZ[_0x2e8d91(0x367)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x2e8d91(0x309)]['currentValue'],Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x1bd)]=function(){const _0x30c140=_0x2e8d91;return this[_0x30c140(0x28f)]&&this[_0x30c140(0x2eb)]?this[_0x30c140(0x34e)]():VisuMZ[_0x30c140(0x367)][_0x30c140(0x329)][_0x30c140(0x1df)](this);},Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x34e)]=function(){const _0x424cb3=_0x2e8d91;return this[_0x424cb3(0x2eb)]['GaugeCurrentJS']['call'](this[_0x424cb3(0x28f)]);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x334)]=Sprite_Gauge['prototype']['currentMaxValue'],Sprite_Gauge['prototype'][_0x2e8d91(0x2b0)]=function(){const _0x1403fe=_0x2e8d91;return this[_0x1403fe(0x28f)]&&this[_0x1403fe(0x2eb)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x1403fe(0x367)][_0x1403fe(0x334)]['call'](this);},Sprite_Gauge['prototype'][_0x2e8d91(0x2bc)]=function(){const _0x30bd1c=_0x2e8d91;return this[_0x30bd1c(0x2eb)]['GaugeMaxJS'][_0x30bd1c(0x1df)](this[_0x30bd1c(0x28f)]);},VisuMZ[_0x2e8d91(0x367)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x498)],Sprite_Gauge['prototype'][_0x2e8d91(0x498)]=function(){const _0x2fb2e2=_0x2e8d91,_0x19ad57=VisuMZ['SkillsStatesCore']['Sprite_Gauge_gaugeRate'][_0x2fb2e2(0x1df)](this);return _0x19ad57[_0x2fb2e2(0x2e6)](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x271)]=Sprite_Gauge['prototype'][_0x2e8d91(0x2e8)],Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x2e8)]=function(){const _0x2c29eb=_0x2e8d91;if(this[_0x2c29eb(0x28f)]&&this[_0x2c29eb(0x2eb)])this[_0x2c29eb(0x3b5)]['clear'](),this[_0x2c29eb(0x3a5)]();else{if(_0x2c29eb(0x2e9)===_0x2c29eb(0x242)){if(this[_0x2c29eb(0x1e3)](_0x5a3dfc)){const _0x525ccd=this['_buffs'][_0x44bb0c];this[_0x2c29eb(0x45d)](_0x540ad7);if(_0x525ccd>0x0)this[_0x2c29eb(0x1e7)](_0x39cada);if(_0x525ccd<0x0)this['onExpireDebuff'](_0x585bbe);}}else VisuMZ[_0x2c29eb(0x367)][_0x2c29eb(0x271)][_0x2c29eb(0x1df)](this);}},Sprite_Gauge[_0x2e8d91(0x309)][_0x2e8d91(0x46b)]=function(){const _0x524776=_0x2e8d91;let _0x27e0d7=this[_0x524776(0x1bd)]();if(Imported[_0x524776(0x238)]&&this[_0x524776(0x4b8)]()){if(_0x524776(0x256)===_0x524776(0x256))_0x27e0d7=VisuMZ[_0x524776(0x44a)](_0x27e0d7);else{if(this[_0x524776(0x3cd)](_0x524776(0x1be)))return this[_0x524776(0x38b)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x524776(0x3fe)]=!![],this[_0x524776(0x2ef)](),this['_checkingVisuMzPassiveStateObjects']=_0x15c57e,this[_0x524776(0x38b)]();}}return _0x27e0d7;},Sprite_Gauge[_0x2e8d91(0x309)]['redrawSkillsStatesCore']=function(){const _0x5dfe8d=_0x2e8d91;this[_0x5dfe8d(0x2eb)][_0x5dfe8d(0x4b6)][_0x5dfe8d(0x1df)](this);},Sprite_Gauge[_0x2e8d91(0x309)]['drawFullGauge']=function(_0x26d434,_0x460559,_0xa19068,_0x109233,_0x36e24a,_0x2521ab){const _0x2da318=_0x2e8d91,_0x2ad6eb=this[_0x2da318(0x498)](),_0x3566a4=Math[_0x2da318(0x41a)]((_0x36e24a-0x2)*_0x2ad6eb),_0x199588=_0x2521ab-0x2,_0x43dec2=this[_0x2da318(0x45c)]();this[_0x2da318(0x3b5)]['fillRect'](_0xa19068,_0x109233,_0x36e24a,_0x2521ab,_0x43dec2),this[_0x2da318(0x3b5)][_0x2da318(0x23e)](_0xa19068+0x1,_0x109233+0x1,_0x3566a4,_0x199588,_0x26d434,_0x460559);},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon['prototype'][_0x2e8d91(0x47b)],Sprite_StateIcon[_0x2e8d91(0x309)][_0x2e8d91(0x47b)]=function(){const _0x161912=_0x2e8d91;VisuMZ[_0x161912(0x367)]['Sprite_StateIcon_loadBitmap']['call'](this),this[_0x161912(0x1b7)]();},Sprite_StateIcon['prototype'][_0x2e8d91(0x1b7)]=function(){const _0x290509=_0x2e8d91,_0x19629a=Window_Base['prototype'][_0x290509(0x3fb)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite']['bitmap']=new Bitmap(ImageManager[_0x290509(0x2b7)],_0x19629a),this[_0x290509(0x1ec)]['anchor']['x']=this[_0x290509(0x32e)]['x'],this[_0x290509(0x1ec)][_0x290509(0x32e)]['y']=this['anchor']['y'],this[_0x290509(0x4b5)](this[_0x290509(0x1ec)]),this[_0x290509(0x2ad)]=this['_turnDisplaySprite']['bitmap'];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x3c0)]=Sprite_StateIcon[_0x2e8d91(0x309)]['updateFrame'],Sprite_StateIcon['prototype'][_0x2e8d91(0x20e)]=function(){const _0x5762ad=_0x2e8d91;VisuMZ[_0x5762ad(0x367)][_0x5762ad(0x3c0)]['call'](this),this[_0x5762ad(0x220)]();},Sprite_StateIcon[_0x2e8d91(0x309)]['drawText']=function(_0x5b6871,_0x3b4d7b,_0x558581,_0x44b003,_0x3ad4de){const _0x350ab3=_0x2e8d91;this[_0x350ab3(0x2ad)][_0x350ab3(0x276)](_0x5b6871,_0x3b4d7b,_0x558581,_0x44b003,this[_0x350ab3(0x2ad)][_0x350ab3(0x2b8)],_0x3ad4de);},Sprite_StateIcon['prototype']['updateTurnDisplaySprite']=function(){const _0x10d675=_0x2e8d91;this['resetFontSettings'](),this[_0x10d675(0x2ad)][_0x10d675(0x30f)]();const _0x23e4b6=this[_0x10d675(0x28f)];if(!_0x23e4b6)return;const _0xd8318a=_0x23e4b6[_0x10d675(0x310)]()[_0x10d675(0x224)](_0x1348cb=>_0x1348cb[_0x10d675(0x217)]>0x0),_0x5d0302=[...Array(0x8)[_0x10d675(0x1d0)]()][_0x10d675(0x224)](_0x26f24b=>_0x23e4b6[_0x10d675(0x3ec)](_0x26f24b)!==0x0),_0xfef1ba=this[_0x10d675(0x268)],_0x1a0f50=_0xd8318a[_0xfef1ba];if(_0x1a0f50)Window_Base['prototype'][_0x10d675(0x3c5)][_0x10d675(0x1df)](this,_0x23e4b6,_0x1a0f50,0x0,0x0),Window_Base[_0x10d675(0x309)][_0x10d675(0x446)][_0x10d675(0x1df)](this,_0x23e4b6,_0x1a0f50,0x0,0x0);else{const _0x4aeb25=_0x5d0302[_0xfef1ba-_0xd8318a['length']];if(_0x4aeb25===undefined)return;Window_Base[_0x10d675(0x309)]['drawActorBuffTurns']['call'](this,_0x23e4b6,_0x4aeb25,0x0,0x0),Window_Base['prototype'][_0x10d675(0x2b9)][_0x10d675(0x1df)](this,_0x23e4b6,_0x4aeb25,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x2e8d91(0x2cd)]=function(){const _0x58f195=_0x2e8d91;this[_0x58f195(0x2ad)][_0x58f195(0x3ee)]=$gameSystem[_0x58f195(0x441)](),this[_0x58f195(0x2ad)][_0x58f195(0x35a)]=$gameSystem[_0x58f195(0x3a6)](),this[_0x58f195(0x21b)]();},Sprite_StateIcon[_0x2e8d91(0x309)][_0x2e8d91(0x21b)]=function(){const _0x104a92=_0x2e8d91;this[_0x104a92(0x469)](ColorManager[_0x104a92(0x1c0)]()),this[_0x104a92(0x3de)](ColorManager[_0x104a92(0x230)]());},Sprite_StateIcon[_0x2e8d91(0x309)][_0x2e8d91(0x469)]=function(_0x10722b){const _0x1a7df1=_0x2e8d91;this[_0x1a7df1(0x2ad)][_0x1a7df1(0x234)]=_0x10722b;},Sprite_StateIcon[_0x2e8d91(0x309)][_0x2e8d91(0x3de)]=function(_0x142f69){const _0x47d4ef=_0x2e8d91;this['contents'][_0x47d4ef(0x230)]=_0x142f69;},Sprite_StateIcon[_0x2e8d91(0x309)][_0x2e8d91(0x1ea)]=function(){const _0x25484b=_0x2e8d91;this[_0x25484b(0x407)]=!![],this[_0x25484b(0x2d4)]();},Window_Base['prototype'][_0x2e8d91(0x34a)]=function(_0x3b716a,_0x5b48eb,_0x1f42a5,_0x5e92a0,_0x5a8388){const _0x18e3a1=_0x2e8d91,_0x5eb09b=this['createAllSkillCostText'](_0x3b716a,_0x5b48eb),_0x5df4c0=this[_0x18e3a1(0x42c)](_0x5eb09b,_0x1f42a5,_0x5e92a0,_0x5a8388),_0x3ed157=_0x1f42a5+_0x5a8388-_0x5df4c0[_0x18e3a1(0x24b)];this[_0x18e3a1(0x385)](_0x5eb09b,_0x3ed157,_0x5e92a0,_0x5a8388),this[_0x18e3a1(0x2cd)]();},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x457)]=function(_0x38b8fb,_0x39739b){const _0x24fbc5=_0x2e8d91;let _0x48d9f7='';for(settings of VisuMZ['SkillsStatesCore'][_0x24fbc5(0x325)]['Costs']){if(_0x24fbc5(0x4ab)==='CnMDy')return![];else{if(!this['isSkillCostShown'](_0x38b8fb,_0x39739b,settings))continue;if(_0x48d9f7[_0x24fbc5(0x3f6)]>0x0)_0x48d9f7+=this[_0x24fbc5(0x3ca)]();_0x48d9f7+=this['createSkillCostText'](_0x38b8fb,_0x39739b,settings);}}_0x48d9f7=this[_0x24fbc5(0x40d)](_0x38b8fb,_0x39739b,_0x48d9f7);if(_0x39739b[_0x24fbc5(0x417)][_0x24fbc5(0x269)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x24fbc5(0x3d2)!==_0x24fbc5(0x3d2))_0x380ac0[_0x24fbc5(0x367)][_0x24fbc5(0x325)][_0x24fbc5(0x29f)]['onEraseBuffJS'][_0x24fbc5(0x1df)](this,_0x37cb04);else{if(_0x48d9f7['length']>0x0)_0x48d9f7+=this[_0x24fbc5(0x3ca)]();_0x48d9f7+=String(RegExp['$1']);}}return _0x48d9f7;},Window_Base['prototype'][_0x2e8d91(0x40d)]=function(_0x8f289a,_0x319ac3,_0x16c5b6){return _0x16c5b6;},Window_Base[_0x2e8d91(0x309)]['isSkillCostShown']=function(_0x2ea9d9,_0x1167b2,_0x573d8e){const _0x6a525b=_0x2e8d91,_0x4bf23c=_0x573d8e[_0x6a525b(0x2a2)][_0x6a525b(0x1df)](_0x2ea9d9,_0x1167b2);return _0x573d8e[_0x6a525b(0x282)][_0x6a525b(0x1df)](_0x2ea9d9,_0x1167b2,_0x4bf23c,_0x573d8e);},Window_Base[_0x2e8d91(0x309)]['createSkillCostText']=function(_0x133e1f,_0x3dad77,_0x2529e0){const _0x1d57a6=_0x2e8d91,_0x1b938c=_0x2529e0[_0x1d57a6(0x2a2)]['call'](_0x133e1f,_0x3dad77);return _0x2529e0[_0x1d57a6(0x4b3)]['call'](_0x133e1f,_0x3dad77,_0x1b938c,_0x2529e0);},Window_Base[_0x2e8d91(0x309)]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x340)]=function(_0x45d54c,_0x4091f4,_0x551b74,_0x2704b7){const _0x89f366=_0x2e8d91;if(!_0x45d54c)return;VisuMZ[_0x89f366(0x367)][_0x89f366(0x478)]['call'](this,_0x45d54c,_0x4091f4,_0x551b74,_0x2704b7),this[_0x89f366(0x1ba)](_0x45d54c,_0x4091f4,_0x551b74,_0x2704b7);},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x1ba)]=function(_0x3f9fae,_0x52d837,_0x5dc8af,_0x4ef9ba){const _0x1d65d8=_0x2e8d91;_0x4ef9ba=_0x4ef9ba||0x90;const _0x45e8fb=ImageManager[_0x1d65d8(0x2b7)],_0x3b20d0=_0x3f9fae[_0x1d65d8(0x2ce)]()[_0x1d65d8(0x445)](0x0,Math[_0x1d65d8(0x41a)](_0x4ef9ba/_0x45e8fb)),_0x11d614=_0x3f9fae[_0x1d65d8(0x310)]()[_0x1d65d8(0x224)](_0x11c8d1=>_0x11c8d1[_0x1d65d8(0x217)]>0x0),_0x262b03=[...Array(0x8)[_0x1d65d8(0x1d0)]()][_0x1d65d8(0x224)](_0x595614=>_0x3f9fae[_0x1d65d8(0x3ec)](_0x595614)!==0x0),_0xabc44d=[];let _0x4138a3=_0x52d837;for(let _0x367152=0x0;_0x367152<_0x3b20d0[_0x1d65d8(0x3f6)];_0x367152++){if(_0x1d65d8(0x43a)===_0x1d65d8(0x43a)){this[_0x1d65d8(0x2cd)]();const _0x43823a=_0x11d614[_0x367152];if(_0x43823a)!_0xabc44d[_0x1d65d8(0x359)](_0x43823a)&&this[_0x1d65d8(0x3c5)](_0x3f9fae,_0x43823a,_0x4138a3,_0x5dc8af),this[_0x1d65d8(0x446)](_0x3f9fae,_0x43823a,_0x4138a3,_0x5dc8af),_0xabc44d[_0x1d65d8(0x2d2)](_0x43823a);else{const _0x19e227=_0x262b03[_0x367152-_0x11d614[_0x1d65d8(0x3f6)]];this['drawActorBuffTurns'](_0x3f9fae,_0x19e227,_0x4138a3,_0x5dc8af),this[_0x1d65d8(0x2b9)](_0x3f9fae,_0x19e227,_0x4138a3,_0x5dc8af);}_0x4138a3+=_0x45e8fb;}else{if(_0x5b4914[_0x1d65d8(0x235)]())_0x49f3eb=this[_0x1d65d8(0x487)](_0x250ecd,_0x60ff77);this['placeExactGauge'](_0x575496,_0x1247c0,_0x1567f7,_0x5a9837);}}},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x3c5)]=function(_0x3d2250,_0x23275b,_0x2a50b5,_0x3e8cff){const _0x520cfa=_0x2e8d91;if(!VisuMZ[_0x520cfa(0x367)][_0x520cfa(0x325)][_0x520cfa(0x1d6)][_0x520cfa(0x406)])return;if(!_0x3d2250[_0x520cfa(0x1b4)](_0x23275b['id']))return;if(_0x23275b[_0x520cfa(0x1c1)]===0x0)return;if(_0x23275b[_0x520cfa(0x417)][_0x520cfa(0x269)](/<HIDE STATE TURNS>/i))return;const _0x406a72=_0x3d2250[_0x520cfa(0x474)](_0x23275b['id']),_0xf2d7e5=ImageManager[_0x520cfa(0x2b7)],_0xef1fc0=ColorManager[_0x520cfa(0x27a)](_0x23275b);this[_0x520cfa(0x469)](_0xef1fc0),this['changeOutlineColor'](_0x520cfa(0x322)),this[_0x520cfa(0x2ad)][_0x520cfa(0x29a)]=!![],this['contents'][_0x520cfa(0x35a)]=VisuMZ[_0x520cfa(0x367)][_0x520cfa(0x325)][_0x520cfa(0x1d6)][_0x520cfa(0x1c4)],_0x2a50b5+=VisuMZ['SkillsStatesCore'][_0x520cfa(0x325)]['States']['TurnOffsetX'],_0x3e8cff+=VisuMZ[_0x520cfa(0x367)]['Settings'][_0x520cfa(0x1d6)][_0x520cfa(0x31f)],this[_0x520cfa(0x276)](_0x406a72,_0x2a50b5,_0x3e8cff,_0xf2d7e5,'right'),this[_0x520cfa(0x2ad)][_0x520cfa(0x29a)]=![],this[_0x520cfa(0x2cd)]();},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x446)]=function(_0x45f791,_0x5507d9,_0x399d80,_0x3b0ee3){const _0x2d4803=_0x2e8d91;if(!VisuMZ['SkillsStatesCore'][_0x2d4803(0x325)][_0x2d4803(0x1d6)][_0x2d4803(0x352)])return;const _0x430fd5=ImageManager[_0x2d4803(0x2b7)],_0x1b2111=ImageManager[_0x2d4803(0x449)]/0x2,_0xe67e7c=ColorManager[_0x2d4803(0x1c0)]();this[_0x2d4803(0x469)](_0xe67e7c),this[_0x2d4803(0x3de)](_0x2d4803(0x322)),this[_0x2d4803(0x2ad)]['fontBold']=!![],this[_0x2d4803(0x2ad)][_0x2d4803(0x35a)]=VisuMZ[_0x2d4803(0x367)][_0x2d4803(0x325)][_0x2d4803(0x1d6)][_0x2d4803(0x377)],_0x399d80+=VisuMZ[_0x2d4803(0x367)][_0x2d4803(0x325)][_0x2d4803(0x1d6)][_0x2d4803(0x283)],_0x3b0ee3+=VisuMZ['SkillsStatesCore'][_0x2d4803(0x325)]['States'][_0x2d4803(0x44d)];const _0x218432=String(_0x45f791['getStateDisplay'](_0x5507d9['id']));this[_0x2d4803(0x276)](_0x218432,_0x399d80,_0x3b0ee3,_0x430fd5,_0x2d4803(0x304)),this['contents'][_0x2d4803(0x29a)]=![],this[_0x2d4803(0x2cd)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x422951,_0x3a6f6e,_0x1e10fb,_0x516a6a){const _0x2e5a31=_0x2e8d91;if(!VisuMZ[_0x2e5a31(0x367)][_0x2e5a31(0x325)][_0x2e5a31(0x29f)][_0x2e5a31(0x406)])return;const _0x43e712=_0x422951[_0x2e5a31(0x3ec)](_0x3a6f6e);if(_0x43e712===0x0)return;const _0x3d1952=_0x422951[_0x2e5a31(0x266)](_0x3a6f6e),_0xf0d411=ImageManager[_0x2e5a31(0x2b7)],_0x1e0402=_0x43e712>0x0?ColorManager[_0x2e5a31(0x2bd)]():ColorManager['debuffColor']();this['changeTextColor'](_0x1e0402),this[_0x2e5a31(0x3de)](_0x2e5a31(0x322)),this[_0x2e5a31(0x2ad)][_0x2e5a31(0x29a)]=!![],this[_0x2e5a31(0x2ad)][_0x2e5a31(0x35a)]=VisuMZ[_0x2e5a31(0x367)]['Settings'][_0x2e5a31(0x29f)][_0x2e5a31(0x1c4)],_0x1e10fb+=VisuMZ[_0x2e5a31(0x367)][_0x2e5a31(0x325)][_0x2e5a31(0x29f)][_0x2e5a31(0x354)],_0x516a6a+=VisuMZ[_0x2e5a31(0x367)][_0x2e5a31(0x325)][_0x2e5a31(0x29f)][_0x2e5a31(0x31f)],this[_0x2e5a31(0x276)](_0x3d1952,_0x1e10fb,_0x516a6a,_0xf0d411,_0x2e5a31(0x22d)),this[_0x2e5a31(0x2ad)][_0x2e5a31(0x29a)]=![],this[_0x2e5a31(0x2cd)]();},Window_Base[_0x2e8d91(0x309)][_0x2e8d91(0x2b9)]=function(_0x129df4,_0x5abe77,_0x181734,_0x34e381){const _0x2add97=_0x2e8d91;if(!VisuMZ[_0x2add97(0x367)]['Settings'][_0x2add97(0x29f)][_0x2add97(0x352)])return;const _0x22a7f4=_0x129df4[_0x2add97(0x42d)](_0x5abe77),_0x51a73f=_0x129df4[_0x2add97(0x3ec)](_0x5abe77),_0xb6e2a3=ImageManager[_0x2add97(0x2b7)],_0x4fc49a=ImageManager['iconHeight']/0x2,_0x2af750=_0x51a73f>0x0?ColorManager[_0x2add97(0x2bd)]():ColorManager[_0x2add97(0x3f2)]();this[_0x2add97(0x469)](_0x2af750),this[_0x2add97(0x3de)](_0x2add97(0x322)),this[_0x2add97(0x2ad)][_0x2add97(0x29a)]=!![],this[_0x2add97(0x2ad)]['fontSize']=VisuMZ[_0x2add97(0x367)][_0x2add97(0x325)][_0x2add97(0x29f)][_0x2add97(0x377)],_0x181734+=VisuMZ[_0x2add97(0x367)]['Settings'][_0x2add97(0x29f)][_0x2add97(0x283)],_0x34e381+=VisuMZ[_0x2add97(0x367)][_0x2add97(0x325)][_0x2add97(0x29f)][_0x2add97(0x44d)];const _0x4c3e3b='%1%'[_0x2add97(0x49e)](Math[_0x2add97(0x212)](_0x22a7f4*0x64));this['drawText'](_0x4c3e3b,_0x181734,_0x34e381,_0xb6e2a3,_0x2add97(0x304)),this[_0x2add97(0x2ad)]['fontBold']=![],this[_0x2add97(0x2cd)]();},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x380)]=Window_StatusBase[_0x2e8d91(0x309)][_0x2e8d91(0x402)],Window_StatusBase[_0x2e8d91(0x309)][_0x2e8d91(0x402)]=function(_0x289b32,_0x513c55,_0x5b4fae,_0x41a1f5){const _0x30f6d3=_0x2e8d91;if(_0x289b32[_0x30f6d3(0x235)]())_0x513c55=this['convertGaugeTypeSkillsStatesCore'](_0x289b32,_0x513c55);this[_0x30f6d3(0x46f)](_0x289b32,_0x513c55,_0x5b4fae,_0x41a1f5);},Window_StatusBase[_0x2e8d91(0x309)]['placeExactGauge']=function(_0x3996e2,_0x274aef,_0x1c256b,_0x355fd9){const _0x27b7bb=_0x2e8d91;if(['none',_0x27b7bb(0x294)][_0x27b7bb(0x359)](_0x274aef[_0x27b7bb(0x350)]()))return;VisuMZ[_0x27b7bb(0x367)][_0x27b7bb(0x380)][_0x27b7bb(0x1df)](this,_0x3996e2,_0x274aef,_0x1c256b,_0x355fd9);},Window_StatusBase[_0x2e8d91(0x309)][_0x2e8d91(0x487)]=function(_0x56c34b,_0xec0484){const _0x3e3910=_0x2e8d91,_0x3f4459=_0x56c34b[_0x3e3910(0x1fa)]()[_0x3e3910(0x417)];if(_0xec0484==='hp'&&_0x3f4459['match'](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x3e3910(0x3e3)!==_0x3e3910(0x3e3)){const _0x2c409e=_0x19ffa2(_0x51a365['$1']),_0x4c2a4c=_0x3d6f2e[_0x3e3910(0x49e)](_0x2c409e,_0x3e3910(0x48e),0x1,_0x3e3910(0x298));_0x4898c9[_0x3e3910(0x367)]['stateHpSlipHealJS'][_0x2aaa69['id']]=new _0x532c2e(_0x3e3910(0x2bf),_0x4c2a4c);}else return String(RegExp['$1']);}else{if(_0xec0484==='mp'&&_0x3f4459[_0x3e3910(0x269)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x3e3910(0x273)===_0x3e3910(0x273))return String(RegExp['$1']);else{if(!_0x40b8c8)return _0x3e3910(0x22e);if(_0x14ba51[_0x3e3910(0x235)]())return _0x3e3910(0x27f)[_0x3e3910(0x49e)](_0x45add3[_0x3e3910(0x2f7)]());else{const _0x151120=_0x3e3910(0x34d)['format'](_0x3fd856[_0x3e3910(0x40b)]()),_0x5dcf1e=_0x3e3910(0x2f2)[_0x3e3910(0x49e)](_0x1d0652[_0x3e3910(0x223)]()),_0x4b1e57='<troop-%1>'[_0x3e3910(0x49e)](_0x3779a8[_0x3e3910(0x37d)]());return _0x3e3910(0x454)['format'](_0x151120,_0x5dcf1e,_0x4b1e57);}return'user';}}else{if(_0xec0484==='tp'&&_0x3f4459[_0x3e3910(0x269)](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3e3910(0x412)===_0x3e3910(0x412))return _0xec0484;else{if(_0x5656e7[_0x3e3910(0x481)](_0x2a0b14))return![];}}}}},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x478)]=Window_StatusBase[_0x2e8d91(0x309)][_0x2e8d91(0x340)],Window_StatusBase[_0x2e8d91(0x309)][_0x2e8d91(0x340)]=function(_0x1a60f8,_0x323c78,_0x267646,_0x49123e){const _0x4c50a7=_0x2e8d91;if(!_0x1a60f8)return;Window_Base[_0x4c50a7(0x309)][_0x4c50a7(0x340)][_0x4c50a7(0x1df)](this,_0x1a60f8,_0x323c78,_0x267646,_0x49123e);},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x24a)]=Window_SkillType['prototype'][_0x2e8d91(0x1b3)],Window_SkillType[_0x2e8d91(0x309)]['initialize']=function(_0x286899){const _0x5dd73f=_0x2e8d91;VisuMZ[_0x5dd73f(0x367)][_0x5dd73f(0x24a)][_0x5dd73f(0x1df)](this,_0x286899),this['createCommandNameWindow'](_0x286899);},Window_SkillType[_0x2e8d91(0x309)]['createCommandNameWindow']=function(_0x5b8339){const _0x132085=_0x2e8d91,_0xa373fd=new Rectangle(0x0,0x0,_0x5b8339['width'],_0x5b8339[_0x132085(0x2b8)]);this['_commandNameWindow']=new Window_Base(_0xa373fd),this[_0x132085(0x216)][_0x132085(0x1ce)]=0x0,this[_0x132085(0x4b5)](this[_0x132085(0x216)]),this[_0x132085(0x365)]();},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x208)]=function(){const _0x18ed75=_0x2e8d91;Window_Command[_0x18ed75(0x309)][_0x18ed75(0x208)][_0x18ed75(0x1df)](this);if(this['_commandNameWindow'])this[_0x18ed75(0x365)]();},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x365)]=function(){const _0x2a5836=_0x2e8d91,_0x278659=this[_0x2a5836(0x216)];_0x278659['contents']['clear']();const _0x2755ee=this[_0x2a5836(0x440)](this['index']());if(_0x2755ee===_0x2a5836(0x35d)&&this[_0x2a5836(0x451)]()>0x0){const _0x7b20ff=this[_0x2a5836(0x34f)](this[_0x2a5836(0x223)]());let _0x80482d=this[_0x2a5836(0x278)](this[_0x2a5836(0x223)]());_0x80482d=_0x80482d[_0x2a5836(0x403)](/\\I\[(\d+)\]/gi,''),_0x278659[_0x2a5836(0x2cd)](),this[_0x2a5836(0x1b1)](_0x80482d,_0x7b20ff),this['commandNameWindowDrawText'](_0x80482d,_0x7b20ff),this[_0x2a5836(0x1cf)](_0x80482d,_0x7b20ff);}},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x1b1)]=function(_0x435ee2,_0x1c537c){},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x387)]=function(_0x2b0ed3,_0x1f0abb){const _0x4147f2=_0x2e8d91,_0x3e55ff=this['_commandNameWindow'];_0x3e55ff[_0x4147f2(0x276)](_0x2b0ed3,0x0,_0x1f0abb['y'],_0x3e55ff['innerWidth'],_0x4147f2(0x304));},Window_SkillType['prototype'][_0x2e8d91(0x1cf)]=function(_0x372c00,_0x117861){const _0x1d545c=_0x2e8d91,_0xf42d6d=this[_0x1d545c(0x216)],_0x11c8f=$gameSystem['windowPadding'](),_0x5b048b=_0x117861['x']+Math[_0x1d545c(0x41a)](_0x117861[_0x1d545c(0x24b)]/0x2)+_0x11c8f;_0xf42d6d['x']=_0xf42d6d[_0x1d545c(0x24b)]/-0x2+_0x5b048b,_0xf42d6d['y']=Math['floor'](_0x117861[_0x1d545c(0x2b8)]/0x2);},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x3cc)]=function(){const _0x50af4b=_0x2e8d91;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x50af4b(0x309)]['isUseModernControls'][_0x50af4b(0x1df)](this);},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x370)]=function(){const _0x25830b=_0x2e8d91;if(!this['_actor'])return;const _0x3c9d8f=this[_0x25830b(0x341)][_0x25830b(0x42a)]();for(const _0x54a9bd of _0x3c9d8f){if(_0x25830b(0x3e6)!==_0x25830b(0x1dc)){const _0x3d6b7a=this[_0x25830b(0x2fc)](_0x54a9bd);this['addCommand'](_0x3d6b7a,_0x25830b(0x2ed),!![],_0x54a9bd);}else{const _0x2a3531=_0x40aae7[_0x25830b(0x417)];_0x2a3531[_0x25830b(0x269)](/<MP COST:[ ](\d+)>/i)&&(_0x547761[_0x25830b(0x239)]=_0x85be65(_0x4f7ffc['$1'])),_0x2a3531[_0x25830b(0x269)](/<TP COST:[ ](\d+)>/i)&&(_0x569d74[_0x25830b(0x319)]=_0x5059b4(_0x1fa1b3['$1']));}}},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x2fc)]=function(_0x2fd458){const _0x52dc60=_0x2e8d91;let _0x5da22c=$dataSystem[_0x52dc60(0x42a)][_0x2fd458];if(_0x5da22c[_0x52dc60(0x269)](/\\I\[(\d+)\]/i))return _0x5da22c;if(this[_0x52dc60(0x3ea)]()===_0x52dc60(0x1ee))return _0x5da22c;const _0x2d3944=VisuMZ[_0x52dc60(0x367)][_0x52dc60(0x325)][_0x52dc60(0x1b6)],_0x2bdfa5=$dataSystem['magicSkills'][_0x52dc60(0x359)](_0x2fd458),_0x5f1d49=_0x2bdfa5?_0x2d3944['IconStypeMagic']:_0x2d3944[_0x52dc60(0x47f)];return _0x52dc60(0x26b)[_0x52dc60(0x49e)](_0x5f1d49,_0x5da22c);},Window_SkillType['prototype'][_0x2e8d91(0x2c4)]=function(){const _0x1ce026=_0x2e8d91;return VisuMZ[_0x1ce026(0x367)][_0x1ce026(0x325)][_0x1ce026(0x1b6)]['CmdTextAlign'];},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x40f)]=function(_0x17b950){const _0xe2e04a=_0x2e8d91,_0x2658f8=this[_0xe2e04a(0x440)](_0x17b950);if(_0x2658f8===_0xe2e04a(0x459))_0xe2e04a(0x42f)===_0xe2e04a(0x423)?(!_0x51ac20['includes'](_0x1ef22e)&&this[_0xe2e04a(0x3c5)](_0x402d86,_0x970872,_0x1c2360,_0x485c68),this['drawActorStateData'](_0x891fba,_0x56446d,_0x333779,_0x36ae4c),_0x428d56[_0xe2e04a(0x2d2)](_0x1a34c5)):this[_0xe2e04a(0x33f)](_0x17b950);else{if(_0x2658f8==='icon')this[_0xe2e04a(0x4b1)](_0x17b950);else{if('FZpFl'!==_0xe2e04a(0x28b))Window_Command[_0xe2e04a(0x309)]['drawItem'][_0xe2e04a(0x1df)](this,_0x17b950);else{const _0x577279=_0x3c8b93(_0x27e832['$1']);if(_0xcd5000[_0xe2e04a(0x1b4)](_0x577279))return!![];}}}},Window_SkillType['prototype'][_0x2e8d91(0x3ea)]=function(){const _0x251d2c=_0x2e8d91;return VisuMZ[_0x251d2c(0x367)][_0x251d2c(0x325)][_0x251d2c(0x1b6)]['CmdStyle'];},Window_SkillType['prototype'][_0x2e8d91(0x440)]=function(_0x5545d7){const _0xa17c2d=_0x2e8d91;if(_0x5545d7<0x0)return'text';const _0x5d74ed=this[_0xa17c2d(0x3ea)]();if(_0x5d74ed!==_0xa17c2d(0x221))return _0x5d74ed;else{if(this['maxItems']()>0x0){const _0xc46ff0=this[_0xa17c2d(0x278)](_0x5545d7);if(_0xc46ff0[_0xa17c2d(0x269)](/\\I\[(\d+)\]/i)){if(_0xa17c2d(0x3d1)===_0xa17c2d(0x3f7))return this[_0xa17c2d(0x266)](_0x8ad1c4);else{const _0x2394cf=this[_0xa17c2d(0x34f)](_0x5545d7),_0x3b3fba=this[_0xa17c2d(0x42c)](_0xc46ff0)[_0xa17c2d(0x24b)];if(_0x3b3fba<=_0x2394cf[_0xa17c2d(0x24b)])return'iconText';else{if(_0xa17c2d(0x398)===_0xa17c2d(0x398))return _0xa17c2d(0x35d);else this[_0xa17c2d(0x32c)]&&this['_statusWindow']['constructor']===_0x43ded3&&this['_statusWindow'][_0xa17c2d(0x2e4)](this['itemAt'](0x0));}}}}}return _0xa17c2d(0x1ee);},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x33f)]=function(_0x4787f6){const _0x3d7c1e=_0x2e8d91,_0x1cb460=this[_0x3d7c1e(0x34f)](_0x4787f6),_0x584097=this[_0x3d7c1e(0x278)](_0x4787f6),_0x227bf1=this[_0x3d7c1e(0x42c)](_0x584097)['width'];this['changePaintOpacity'](this['isCommandEnabled'](_0x4787f6));const _0x1ef436=this['itemTextAlign']();if(_0x1ef436===_0x3d7c1e(0x22d))this['drawTextEx'](_0x584097,_0x1cb460['x']+_0x1cb460[_0x3d7c1e(0x24b)]-_0x227bf1,_0x1cb460['y'],_0x227bf1);else{if(_0x1ef436===_0x3d7c1e(0x304)){if('aSECe'!==_0x3d7c1e(0x33e)){if(this[_0x3d7c1e(0x471)]())return!![];return _0xd31829[_0x3d7c1e(0x367)]['Game_Unit_isAllDead'][_0x3d7c1e(0x1df)](this);}else{const _0xdb7026=_0x1cb460['x']+Math['floor']((_0x1cb460[_0x3d7c1e(0x24b)]-_0x227bf1)/0x2);this[_0x3d7c1e(0x385)](_0x584097,_0xdb7026,_0x1cb460['y'],_0x227bf1);}}else this[_0x3d7c1e(0x385)](_0x584097,_0x1cb460['x'],_0x1cb460['y'],_0x227bf1);}},Window_SkillType[_0x2e8d91(0x309)][_0x2e8d91(0x4b1)]=function(_0x25fea1){const _0x107f75=_0x2e8d91;this[_0x107f75(0x278)](_0x25fea1)['match'](/\\I\[(\d+)\]/i);const _0x2a3a4f=Number(RegExp['$1'])||0x0,_0x4c28a5=this[_0x107f75(0x34f)](_0x25fea1),_0x3c5496=_0x4c28a5['x']+Math[_0x107f75(0x41a)]((_0x4c28a5[_0x107f75(0x24b)]-ImageManager['iconWidth'])/0x2),_0x530170=_0x4c28a5['y']+(_0x4c28a5[_0x107f75(0x2b8)]-ImageManager[_0x107f75(0x449)])/0x2;this[_0x107f75(0x20c)](_0x2a3a4f,_0x3c5496,_0x530170);},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x35f)]=Window_SkillStatus[_0x2e8d91(0x309)][_0x2e8d91(0x30b)],Window_SkillStatus[_0x2e8d91(0x309)][_0x2e8d91(0x30b)]=function(){const _0x2a938c=_0x2e8d91;VisuMZ[_0x2a938c(0x367)]['Window_SkillStatus_refresh'][_0x2a938c(0x1df)](this);if(this['_actor'])this[_0x2a938c(0x47a)]();},Window_SkillStatus[_0x2e8d91(0x309)][_0x2e8d91(0x47a)]=function(){const _0x379ce8=_0x2e8d91;if(!Imported[_0x379ce8(0x238)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x11f5fc=this[_0x379ce8(0x376)]();let _0x2df189=this[_0x379ce8(0x443)]()/0x2+0xb4+0xb4+0xb4,_0x23035f=this[_0x379ce8(0x2b1)]-_0x2df189-0x2;if(_0x23035f>=0x12c){const _0x54f5c4=VisuMZ[_0x379ce8(0x3b2)]['Settings'][_0x379ce8(0x1e6)][_0x379ce8(0x219)],_0x3dc663=Math['floor'](_0x23035f/0x2)-0x18;let _0x295895=_0x2df189,_0x1b102b=Math[_0x379ce8(0x41a)]((this[_0x379ce8(0x349)]-Math[_0x379ce8(0x2c0)](_0x54f5c4[_0x379ce8(0x3f6)]/0x2)*_0x11f5fc)/0x2),_0x4e9793=0x0;for(const _0x91b694 of _0x54f5c4){this['drawExtendedParameter'](_0x295895,_0x1b102b,_0x3dc663,_0x91b694),_0x4e9793++,_0x4e9793%0x2===0x0?(_0x295895=_0x2df189,_0x1b102b+=_0x11f5fc):_0x295895+=_0x3dc663+0x18;}}this[_0x379ce8(0x2cd)]();},Window_SkillStatus[_0x2e8d91(0x309)][_0x2e8d91(0x297)]=function(_0x4d92d0,_0x316b25,_0x13b6eb,_0x554f76){const _0x5cdada=_0x2e8d91,_0x26f73c=this[_0x5cdada(0x376)]();this[_0x5cdada(0x2cd)](),this[_0x5cdada(0x1f8)](_0x4d92d0,_0x316b25,_0x13b6eb,_0x554f76,!![]),this[_0x5cdada(0x21b)](),this[_0x5cdada(0x2ad)][_0x5cdada(0x35a)]-=0x8;const _0x40cf10=this[_0x5cdada(0x341)][_0x5cdada(0x490)](_0x554f76,!![]);this[_0x5cdada(0x2ad)][_0x5cdada(0x276)](_0x40cf10,_0x4d92d0,_0x316b25,_0x13b6eb,_0x26f73c,_0x5cdada(0x22d));},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x1fb)]=Window_SkillList['prototype'][_0x2e8d91(0x359)],Window_SkillList['prototype'][_0x2e8d91(0x359)]=function(_0x59671d){const _0x5b988b=_0x2e8d91;return this[_0x5b988b(0x48c)](_0x59671d);},VisuMZ[_0x2e8d91(0x367)]['Window_SkillList_maxCols']=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x244)]=function(){const _0x20dc75=_0x2e8d91;if(SceneManager[_0x20dc75(0x3b3)][_0x20dc75(0x2ea)]===Scene_Battle){if(_0x20dc75(0x472)===_0x20dc75(0x472))return VisuMZ['SkillsStatesCore'][_0x20dc75(0x3ac)]['call'](this);else this['_hidden']=!![],this['updateVisibility']();}else return VisuMZ[_0x20dc75(0x367)][_0x20dc75(0x325)][_0x20dc75(0x1b6)][_0x20dc75(0x37f)];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x1d5)]=Window_SkillList['prototype'][_0x2e8d91(0x305)],Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x305)]=function(_0x59682d){const _0xaaa603=_0x2e8d91,_0x14dbfe=this[_0xaaa603(0x341)]!==_0x59682d;VisuMZ['SkillsStatesCore']['Window_SkillList_setActor'][_0xaaa603(0x1df)](this,_0x59682d),_0x14dbfe&&(this[_0xaaa603(0x32c)]&&this[_0xaaa603(0x32c)][_0xaaa603(0x2ea)]===Window_ShopStatus&&(_0xaaa603(0x30a)===_0xaaa603(0x331)?(_0xee04f6[_0xaaa603(0x309)][_0xaaa603(0x3c5)][_0xaaa603(0x1df)](this,_0x240357,_0x443b09,0x0,0x0),_0x54dae0[_0xaaa603(0x309)][_0xaaa603(0x446)]['call'](this,_0x551256,_0x194ff5,0x0,0x0)):this[_0xaaa603(0x32c)][_0xaaa603(0x2e4)](this[_0xaaa603(0x4ae)](0x0))));},Window_SkillList[_0x2e8d91(0x309)]['setStypeId']=function(_0x192c88){const _0x1cdcea=_0x2e8d91;if(this[_0x1cdcea(0x308)]===_0x192c88)return;this[_0x1cdcea(0x308)]=_0x192c88,this['refresh'](),this[_0x1cdcea(0x400)](0x0,0x0),this[_0x1cdcea(0x32c)]&&this[_0x1cdcea(0x32c)][_0x1cdcea(0x2ea)]===Window_ShopStatus&&this['_statusWindow'][_0x1cdcea(0x2e4)](this[_0x1cdcea(0x4ae)](0x0));},Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x48c)]=function(_0x416bfb){const _0x4f0698=_0x2e8d91;if(!_0x416bfb)return VisuMZ[_0x4f0698(0x367)][_0x4f0698(0x1fb)][_0x4f0698(0x1df)](this,_0x416bfb);if(!this[_0x4f0698(0x4a1)](_0x416bfb))return![];if(!this['checkShowHideNotetags'](_0x416bfb))return![];if(!this[_0x4f0698(0x1ff)](_0x416bfb))return![];return!![];},Window_SkillList[_0x2e8d91(0x309)]['checkSkillTypeMatch']=function(_0x1f90ed){const _0x2c547c=_0x2e8d91;return DataManager[_0x2c547c(0x39d)](_0x1f90ed)[_0x2c547c(0x359)](this[_0x2c547c(0x308)]);},Window_SkillList[_0x2e8d91(0x309)]['checkShowHideNotetags']=function(_0x131414){const _0x3d8f20=_0x2e8d91;if(!VisuMZ[_0x3d8f20(0x367)]['CheckVisibleBattleNotetags'](this[_0x3d8f20(0x341)],_0x131414))return![];if(!VisuMZ[_0x3d8f20(0x367)][_0x3d8f20(0x2d3)](this[_0x3d8f20(0x341)],_0x131414))return![];if(!VisuMZ[_0x3d8f20(0x367)][_0x3d8f20(0x22b)](this[_0x3d8f20(0x341)],_0x131414))return![];return!![];},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x49d)]=function(_0x217d61,_0x29c62a){const _0x5a5367=_0x2e8d91,_0x522b8d=_0x29c62a[_0x5a5367(0x417)];if(_0x522b8d[_0x5a5367(0x269)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x5a5367(0x3eb)]()){if(_0x5a5367(0x21a)===_0x5a5367(0x465))this['drawTextEx'](_0x5e740b,_0x158330['x'],_0x311bc6['y'],_0x62cacd);else return![];}else return _0x522b8d['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x5a5367(0x3eb)]()?![]:!![];},VisuMZ[_0x2e8d91(0x367)]['CheckVisibleSwitchNotetags']=function(_0x16abf8,_0x12536e){const _0x2081d2=_0x2e8d91,_0x352fb4=_0x12536e['note'];if(_0x352fb4[_0x2081d2(0x269)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38c2ca=JSON[_0x2081d2(0x372)]('['+RegExp['$1'][_0x2081d2(0x269)](/\d+/g)+']');for(const _0x69884d of _0x38c2ca){if('cLCsP'===_0x2081d2(0x240))_0x32d1ac[_0x2081d2(0x367)]['Sprite_StateIcon_loadBitmap']['call'](this),this[_0x2081d2(0x1b7)]();else{if(!$gameSwitches[_0x2081d2(0x28c)](_0x69884d))return![];}}return!![];}if(_0x352fb4[_0x2081d2(0x269)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b359c=JSON[_0x2081d2(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2a1458 of _0x2b359c){if(!$gameSwitches[_0x2081d2(0x28c)](_0x2a1458))return![];}return!![];}if(_0x352fb4[_0x2081d2(0x269)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2081d2(0x3c8)===_0x2081d2(0x3c8)){const _0x362e61=JSON['parse']('['+RegExp['$1'][_0x2081d2(0x269)](/\d+/g)+']');for(const _0xc67554 of _0x362e61){if($gameSwitches[_0x2081d2(0x28c)](_0xc67554))return!![];}return![];}else return this[_0x2081d2(0x2eb)][_0x2081d2(0x210)][_0x2081d2(0x1df)](this[_0x2081d2(0x28f)]);}if(_0x352fb4[_0x2081d2(0x269)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2081d2(0x1ca)!=='knHwy'){const _0x4fb2b3=new _0x4a3259(0x0,0x0,_0x25a10c[_0x2081d2(0x24b)],_0xd1c7c0[_0x2081d2(0x2b8)]);this[_0x2081d2(0x216)]=new _0x5241eb(_0x4fb2b3),this[_0x2081d2(0x216)][_0x2081d2(0x1ce)]=0x0,this['addChild'](this[_0x2081d2(0x216)]),this[_0x2081d2(0x365)]();}else{const _0x54e5d9=JSON[_0x2081d2(0x372)]('['+RegExp['$1'][_0x2081d2(0x269)](/\d+/g)+']');for(const _0x27f805 of _0x54e5d9){if(!$gameSwitches[_0x2081d2(0x28c)](_0x27f805))return!![];}return![];}}if(_0x352fb4[_0x2081d2(0x269)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3df209=JSON['parse']('['+RegExp['$1'][_0x2081d2(0x269)](/\d+/g)+']');for(const _0x39555b of _0x3df209){if(!$gameSwitches[_0x2081d2(0x28c)](_0x39555b))return!![];}return![];}if(_0x352fb4[_0x2081d2(0x269)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1baf7c=JSON[_0x2081d2(0x372)]('['+RegExp['$1'][_0x2081d2(0x269)](/\d+/g)+']');for(const _0x277f26 of _0x1baf7c){if($gameSwitches[_0x2081d2(0x28c)](_0x277f26))return![];}return!![];}return!![];},VisuMZ['SkillsStatesCore'][_0x2e8d91(0x22b)]=function(_0x340d07,_0x5767a5){const _0x1baff8=_0x2e8d91,_0x5447db=_0x5767a5['note'];if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x557cfc=JSON[_0x1baff8(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1a1a3b of _0x557cfc){if(!_0x340d07[_0x1baff8(0x481)](_0x1a1a3b))return![];}return!![];}else{if(_0x5447db['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xf5a5ab=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x12c06b of _0xf5a5ab){const _0x1b8452=DataManager[_0x1baff8(0x3dd)](_0x12c06b);if(!_0x1b8452)continue;if(!_0x340d07[_0x1baff8(0x481)](_0x1b8452))return![];}return!![];}}if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f9129=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x56bcf0 of _0x1f9129){if(!_0x340d07[_0x1baff8(0x481)](_0x56bcf0))return![];}return!![];}else{if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1baff8(0x1e9)===_0x1baff8(0x2a5)){const _0x4532e8=_0x494d96[_0x1baff8(0x367)][_0x1baff8(0x325)]['Buffs'][_0x1baff8(0x3e1)];this[_0x1baff8(0x295)][_0x278d51]=_0x50b83f[_0x1baff8(0x2e6)](0x0,_0x4532e8);}else{const _0x33e4db=RegExp['$1']['split'](',');for(const _0x3b6535 of _0x33e4db){const _0x313b2a=DataManager[_0x1baff8(0x3dd)](_0x3b6535);if(!_0x313b2a)continue;if(!_0x340d07[_0x1baff8(0x481)](_0x313b2a))return![];}return!![];}}}if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1baff8(0x1d4)===_0x1baff8(0x288))this[_0x1baff8(0x32c)]=_0x15e58a,this[_0x1baff8(0x208)]();else{const _0x33bf63=JSON['parse']('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x250bae of _0x33bf63){if(_0x340d07[_0x1baff8(0x481)](_0x250bae))return!![];}return![];}}else{if(_0x5447db['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4ee501=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x2ec68a of _0x4ee501){if(_0x1baff8(0x1fc)===_0x1baff8(0x1fc)){const _0x23b6cb=DataManager[_0x1baff8(0x3dd)](_0x2ec68a);if(!_0x23b6cb)continue;if(_0x340d07[_0x1baff8(0x481)](_0x23b6cb))return!![];}else{const _0x162b41='<enemy-%1>'[_0x1baff8(0x49e)](_0x2bbedc[_0x1baff8(0x40b)]()),_0x313fb5='<member-%1>'['format'](_0x269c77[_0x1baff8(0x223)]()),_0x2b4d4a=_0x1baff8(0x2f8)[_0x1baff8(0x49e)](_0x9dfe79[_0x1baff8(0x37d)]());return _0x1baff8(0x454)[_0x1baff8(0x49e)](_0x162b41,_0x313fb5,_0x2b4d4a);}}return![];}}if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1baff8(0x4b4)!==_0x1baff8(0x47e)){const _0x412a71=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x3e8c7c of _0x412a71){if(!_0x340d07[_0x1baff8(0x481)](_0x3e8c7c))return!![];}return![];}else{if(!_0x5663f4[_0x1baff8(0x28c)](_0x2e2678))return![];}}else{if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4da88f=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x5a0a68 of _0x4da88f){if(_0x1baff8(0x434)===_0x1baff8(0x3bf))return _0xbc2562(_0x2b3e7a['$1']);else{const _0x6fd0f8=DataManager[_0x1baff8(0x3dd)](_0x5a0a68);if(!_0x6fd0f8)continue;if(!_0x340d07[_0x1baff8(0x481)](_0x6fd0f8))return!![];}}return![];}}if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12ba90=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x5a02d5 of _0x12ba90){if(_0x1baff8(0x3a3)!==_0x1baff8(0x427)){if(!_0x340d07[_0x1baff8(0x481)](_0x5a02d5))return!![];}else return!![];}return![];}else{if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1baff8(0x1c2)===_0x1baff8(0x1c2)){const _0x371ef3=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x52852b of _0x371ef3){if(_0x1baff8(0x414)!==_0x1baff8(0x414))return this[_0x1baff8(0x452)]();else{const _0x4b98eb=DataManager[_0x1baff8(0x3dd)](_0x52852b);if(!_0x4b98eb)continue;if(!_0x340d07['isLearnedSkill'](_0x4b98eb))return!![];}}return![];}else{if(_0x584073[_0x1baff8(0x269)](/<member-(\d+)>/i))return _0x26f7a9['members']()[_0x4bc23e(_0x259371['$1'])];}}}if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24ae3d=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x3f129c of _0x24ae3d){if(_0x340d07['isLearnedSkill'](_0x3f129c))return![];}return!![];}else{if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4d52d1=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x2d7ea7 of _0x4d52d1){if('tlMUo'===_0x1baff8(0x347)){const _0x1de9db=_0x5d2adf[_0x1baff8(0x372)]('['+_0x5e93fb['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x2f4fb6 of _0x1de9db){if(!_0x5cc616['hasSkill'](_0x2f4fb6))return!![];}return![];}else{const _0xb74283=DataManager[_0x1baff8(0x3dd)](_0x2d7ea7);if(!_0xb74283)continue;if(_0x340d07[_0x1baff8(0x481)](_0xb74283))return![];}}return!![];}}if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1baff8(0x1ef)!==_0x1baff8(0x1ef))for(const _0x5b32a4 of _0x75f981){_0x5b32a4[_0x1baff8(0x269)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3b8e68=_0x49e4ee[_0x1baff8(0x1cb)](_0x2cd1e0(_0x9d8367['$1'])['toUpperCase']()),_0x171f78=_0x4724c9(_0x4270aa['$2']);_0x3b8e68>=0x0&&(_0x1c9095['setBuffTurns'](_0x3b8e68,_0x171f78),this[_0x1baff8(0x378)](_0x8df3e1));}else{const _0x58b225=JSON[_0x1baff8(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x11df9f of _0x58b225){if(!_0x340d07[_0x1baff8(0x1ed)](_0x11df9f))return![];}return!![];}}else{if(_0x5447db['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x346c1c=RegExp['$1']['split'](',');for(const _0x2d49f2 of _0x346c1c){const _0x828e83=DataManager[_0x1baff8(0x3dd)](_0x2d49f2);if(!_0x828e83)continue;if(!_0x340d07[_0x1baff8(0x1ed)](_0x828e83))return![];}return!![];}}if(_0x5447db['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x352c62=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x6dc626 of _0x352c62){if(!_0x340d07[_0x1baff8(0x1ed)](_0x6dc626))return![];}return!![];}else{if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x287b03=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x49a823 of _0x287b03){const _0x1ba1c3=DataManager[_0x1baff8(0x3dd)](_0x49a823);if(!_0x1ba1c3)continue;if(!_0x340d07[_0x1baff8(0x1ed)](_0x1ba1c3))return![];}return!![];}}if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x136692=JSON['parse']('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x51b51f of _0x136692){if(_0x1baff8(0x363)!==_0x1baff8(0x363)){if(_0x2e9091[_0x1baff8(0x28c)](_0x34cc13))return!![];}else{if(_0x340d07[_0x1baff8(0x1ed)](_0x51b51f))return!![];}}return![];}else{if(_0x5447db[_0x1baff8(0x269)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1baff8(0x432)!==_0x1baff8(0x432)){const _0x19faf3='_stored_debuffColor';this[_0x1baff8(0x4a0)]=this[_0x1baff8(0x4a0)]||{};if(this[_0x1baff8(0x4a0)][_0x19faf3])return this['_colorCache'][_0x19faf3];const _0x170cc2=_0x4f87d6['SkillsStatesCore'][_0x1baff8(0x325)][_0x1baff8(0x29f)][_0x1baff8(0x2c8)];return this[_0x1baff8(0x2f9)](_0x19faf3,_0x170cc2);}else{const _0x4ccb60=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x201191 of _0x4ccb60){if(_0x1baff8(0x3d0)!==_0x1baff8(0x3d0)){if(!this[_0x1baff8(0x341)])return;const _0x182ca0=this[_0x1baff8(0x341)][_0x1baff8(0x42a)]();for(const _0x883ba8 of _0x182ca0){const _0x171e88=this[_0x1baff8(0x2fc)](_0x883ba8);this['addCommand'](_0x171e88,_0x1baff8(0x2ed),!![],_0x883ba8);}}else{const _0x36ec15=DataManager[_0x1baff8(0x3dd)](_0x201191);if(!_0x36ec15)continue;if(_0x340d07['hasSkill'](_0x36ec15))return!![];}}return![];}}}if(_0x5447db['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2658fc=JSON[_0x1baff8(0x372)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x336aad of _0x2658fc){if(!_0x340d07['hasSkill'](_0x336aad))return!![];}return![];}else{if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x55a84d=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x5bfd57 of _0x55a84d){const _0x5d155b=DataManager['getSkillIdWithName'](_0x5bfd57);if(!_0x5d155b)continue;if(!_0x340d07[_0x1baff8(0x1ed)](_0x5d155b))return!![];}return![];}}if(_0x5447db['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc98c81=JSON['parse']('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x277060 of _0xc98c81){if(!_0x340d07['hasSkill'](_0x277060))return!![];}return![];}else{if(_0x5447db['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1baff8(0x337)!==_0x1baff8(0x358)){const _0xe8a5d6=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x55c35d of _0xe8a5d6){if(_0x1baff8(0x2c7)===_0x1baff8(0x40a)){const _0x34712e=_0x2ec796(_0x4851f3['$1']),_0x316863='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1baff8(0x49e)](_0x34712e);_0x2e849c[_0x1baff8(0x367)][_0x1baff8(0x320)][_0xbc1de0['id']]=new _0x4c8156(_0x1baff8(0x408),_0x316863);}else{const _0xf9815=DataManager[_0x1baff8(0x3dd)](_0x55c35d);if(!_0xf9815)continue;if(!_0x340d07['hasSkill'](_0xf9815))return!![];}}return![];}else this['_stateMaxTurns'][_0x125cdf]=_0x3d3c9f(_0x436266['$1']);}}if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a7610=JSON[_0x1baff8(0x372)]('['+RegExp['$1'][_0x1baff8(0x269)](/\d+/g)+']');for(const _0x47df23 of _0x1a7610){if(_0x1baff8(0x21d)!==_0x1baff8(0x21d)){if(typeof _0x487205!=='number')_0x4d7c22=_0x24eafa['id'];this[_0x1baff8(0x336)]=this[_0x1baff8(0x336)]||{},this[_0x1baff8(0x336)][_0x28969a]=this[_0x1baff8(0x336)][_0x49233c]||'user';const _0x213c24=this[_0x1baff8(0x336)][_0x2a18d5];return this[_0x1baff8(0x43d)](_0x213c24);}else{if(_0x340d07['hasSkill'](_0x47df23))return![];}}return!![];}else{if(_0x5447db[_0x1baff8(0x269)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3dc556=RegExp['$1'][_0x1baff8(0x21e)](',');for(const _0x3d3679 of _0x3dc556){const _0x11b9b8=DataManager['getSkillIdWithName'](_0x3d3679);if(!_0x11b9b8)continue;if(_0x340d07['hasSkill'](_0x11b9b8))return![];}return!![];}}return!![];},Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x1ff)]=function(_0x137d4e){const _0x16cc61=_0x2e8d91,_0x590e8b=_0x137d4e[_0x16cc61(0x417)],_0xd9a811=VisuMZ[_0x16cc61(0x367)][_0x16cc61(0x2db)];return _0xd9a811[_0x137d4e['id']]?_0xd9a811[_0x137d4e['id']][_0x16cc61(0x1df)](this,_0x137d4e):!![];},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x33c)]=Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x40f)],Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x40f)]=function(_0x1efa94){const _0xc6f3c8=_0x2e8d91,_0x1f6c21=this[_0xc6f3c8(0x4ae)](_0x1efa94),_0x907268=_0x1f6c21[_0xc6f3c8(0x3be)];if(_0x1f6c21)this[_0xc6f3c8(0x1e8)](_0x1f6c21);VisuMZ[_0xc6f3c8(0x367)][_0xc6f3c8(0x33c)]['call'](this,_0x1efa94);if(_0x1f6c21)_0x1f6c21['name']=_0x907268;},Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x1e8)]=function(_0x7cb9a3){const _0x10e459=_0x2e8d91;if(_0x7cb9a3&&_0x7cb9a3['note'][_0x10e459(0x269)](/<LIST NAME:[ ](.*)>/i)){if(_0x10e459(0x314)===_0x10e459(0x314)){_0x7cb9a3[_0x10e459(0x3be)]=String(RegExp['$1'])['trim']();for(;;){if(_0x10e459(0x31e)===_0x10e459(0x31e)){if(_0x7cb9a3[_0x10e459(0x3be)][_0x10e459(0x269)](/\\V\[(\d+)\]/gi))_0x7cb9a3[_0x10e459(0x3be)]=_0x7cb9a3[_0x10e459(0x3be)][_0x10e459(0x403)](/\\V\[(\d+)\]/gi,(_0x1918cc,_0x47b144)=>$gameVariables[_0x10e459(0x28c)](parseInt(_0x47b144)));else break;}else{if(!_0x2d11c5[_0x10e459(0x28c)](_0x5b8b69))return!![];}}}else{if(_0x1e5e45[_0x10e459(0x28c)](_0x45a8f4))return![];}}},Window_SkillList[_0x2e8d91(0x309)][_0x2e8d91(0x34a)]=function(_0x140e35,_0x2f0ebb,_0x16ade1,_0x153e04){const _0x2eb6ec=_0x2e8d91;Window_Base[_0x2eb6ec(0x309)][_0x2eb6ec(0x34a)][_0x2eb6ec(0x1df)](this,this[_0x2eb6ec(0x341)],_0x140e35,_0x2f0ebb,_0x16ade1,_0x153e04);},Window_SkillList[_0x2e8d91(0x309)]['setStatusWindow']=function(_0x4395f0){const _0x4f08b1=_0x2e8d91;this[_0x4f08b1(0x32c)]=_0x4395f0,this[_0x4f08b1(0x208)]();},VisuMZ[_0x2e8d91(0x367)][_0x2e8d91(0x243)]=Window_SkillList['prototype'][_0x2e8d91(0x2d7)],Window_SkillList[_0x2e8d91(0x309)]['updateHelp']=function(){const _0x286a5c=_0x2e8d91;VisuMZ[_0x286a5c(0x367)][_0x286a5c(0x243)][_0x286a5c(0x1df)](this),this[_0x286a5c(0x32c)]&&this[_0x286a5c(0x32c)][_0x286a5c(0x2ea)]===Window_ShopStatus&&this[_0x286a5c(0x32c)][_0x286a5c(0x2e4)](this[_0x286a5c(0x2dd)]());};