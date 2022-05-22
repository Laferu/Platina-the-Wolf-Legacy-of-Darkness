//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * <Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type Number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type Number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x3b5d=['Lbygz','skillLearnReqListSkill','_scene','urwuM','setSkillLearnSkillSpriteFrame','PerAction','LrNxM','RequireFmt','xSDIq','990476KEKXtK','onSkillLearnItemOk','itemPadding','initSkillLearnSystemMenuAccess','show','shouldDrawRequirements','RlScP','_abilityPoints','initAbilityPoints','yjRjQ','constructor','select','JSON','ddcZY','vAGXH','isSkillLearnEnabled','skillPointsTotal','MaxResource','gainRewardsSkillPoints','ZvWEW','drawSkillLearnCost','Mysxe','StartingAbilityPoints','Armor','IQqEe','learnSkill','TextFmt','HnCKx','MAX_SAFE_INTEGER','jfSXs','abilityPointsVisible','drawItemName','hOSjV','LearnReqSwitchesAny','PPmIw','getSkillLearnArmorCost','DRRqD','iconIndex','trim','drawItem','max','iconHeight','vDolv','Scene_Boot_onDatabaseLoaded','skillLearningCost','return\x200','skillLearningTitle','getSkillLearnAbilityPointCost','Scene_Skill_create','registerCommand','_earnedSkillPoints','MgiER','onItemOk','MaGUK','skillLearnReqHeaderFmt','getSkillLearnItemCost','ShowVictory','removeChild','LearnJpCost','call','Scene_Skill_onItemOk','jsLearnReqDetailTxt','split','textSizeEx','contents','_skillLearnIngredientsWindow','khiRv','LvPEp','skillLearnReqSwitchFmt','Window_SkillStatus_refresh','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','CBWiQ','skillLearnSystemCommandName','resetTextColor','loseSkillPoints','skillPointsIcon','qgjRd','ARRAYSTR','Window_SkillList_includes','abilityPointsRate','bind','setSkillLearnSkillSpritePosition','skillPointsAbbr','eiHFO','gainRewardsAbilityPoints','createSkillLearnSkillSprite','jsLearnShowDetailTxt','setBackgroundType','parameters','Xjdae','skillLearnCancelCmd','ClassPoints','createSkillLearnCostText','map','PgeRN','refreshSkillLearnSystem','_windowLayer','jobPointsFmt','ivwRV','getClassPoints','bigPicture','LearnWeaponCost','_skillLearnConfirmWindow','setSkillLearnSystemMenuAccess','skillLearnItemFmt','atiqJ','706265yaunjM','loseClassPoints','MaLkt','level','updateSkillLearnAnimationSprite','Class-%1-%2','commandStyle','hKCdN','_skillIDs','CoiiP','_armorIDs','CUSTOM','skillLearnCmd','drawTextExRightAlign','Weapon-%1-%2','format','OhsOp','WEAPON','isConfirmEnabled','MFvpG','LMbYB','gainStartingSkillPoints','applyItemSkillLearnSystemUserEffect','ftFrn','AbilityPointsLose','skillLearnIngredientsWindowRect','rYiSt','match','left','getAbilityPoints','\x5cI[%1]','Animations','isBattleMember','UZqdw','KUyHF','iconWidth','setStypeId','innerWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','1OtbxYU','filter','right','DisplayedCosts','MXMes','AbilityPoints','optExtraExp','MwFDg','process_VisuMZ_SkillLearnSystem_Notetags','bdzhl','IngredientCost','applyAbilityPoints','status','FgnnF','LEVEL','isActor','ARRAYSTRUCT','isPlaytest','skillLearningName','addSkillPoints','isSkillLearnSystemMenuAccess','VisuMZ_2_ClassChangeSystem','MlgmX','createSkillLearnConfirmWindow','duhDo','onVWk','inBattle','concat','Game_Actor_setup','updateSkillLearnSpriteOpacity','addAbilityPoints','skillLearnReqMet','classPointsFull','earnedSkillPoints','Game_Action_applyItemUserEffect','KVyct','setHandler','Window_SkillList_maxCols','QqaCg','createTextJS','getSkillLearnWeaponCost','hide','add','gainAbilityPoints','opacity','getSkillLearnSkillPointCost','LearnArmorCost','State-%1-%2','GoldIcon','makeRewardsSkillPoints','_actor','_SkillLearnSystem_preventLevelUpGain','earnedAbilityPoints','LearnCostBatch','oXWMA','UXqhq','ARRAYEVAL','LearningTitle','ITEM','skillPointsRate','ParseSkillNotetags','createSkillLearnIngredientsWindow','NHkbC','awPcI','Window_SkillType_makeCommandList','PerEnemy','dvBYZ','571044lJDnDt','enemy','dQEYD','getItemIdWithName','_data','_earnedAbilityPoints','createSkillLearnAnimationIDs','drawJobPoints','abilityPointsFull','push','cancel','_learnPicture','bitmap','UwPxo','AZoAe','_skillLearnIconSpriteOpacitySpeed','visible','setup','PerLevelUp','Game_Battler_onBattleStart','LearnSpCost','SharedResource','createSkillLearnSystemWindows','Ezxgm','ParseAllNotetags','onSkillLearnConfirmOk','LearnSkillB','cfshQ','SkillPoints','LmSnl','subject','Show','seQXd','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Skill-%1-%2','Game_Actor_changeClass','text','FYIzo','applySkillPoints','ReqSwitchFmt','307nipvhC','setupBattleTestMembers','getSkillLearnGoldCost','Custom','toUpperCase','LearnItemCost','GVAix','fQbhj','jsLearnReqListTxt','Weapon','IconSet','_skillLearnAnimationSprite','skillLearnReqNotMet','MbdiF','IDfdQ','_skillLearnAnimationIDs','skillPointsFull','VLCMf','Window_SkillList_makeItemList','round','ReqNotMetFmt','LearnShowSwitchesAny','tHnbL','sfUBW','xeWzC','ReqSkillFmt','drawActorClassPoints','ShowAnimations','getSkillLearnSkillsFromClass','109zFzZEM','FadeSpeed','gainSkillPointsForMulticlasses','skillLearnReqLevelFmt','MenuAccess','QXyiP','resetFontSettings','scale','isLearnedSkill','UWNnI','LearnApCost','skillLearnGoldFmt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','YCoAa','skillLearnConfirmCmd','2981553kHSsVu','CDnhf','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','numItems','%1%2','newPage','skillLearnReqSkillFmt','_skillPoints','VisuMZ_1_SkillsStatesCore','JwUhz','skillLearnReqSeparatorFmt','LearnReqSwitchesAll','drawSkillCost','StartingSkillPoints','owUxX','1JhVbhP','currentClass','QKTOO','jJEXH','xeooh','makeCommandList','traitObjects','skillPoints','hCUaW','createVisibleJS','getSkillLearnCostText','actor','gainStartingAbilityPoints','bafME','Game_Actor_levelUp','ShowWindows','ormdi','version','destroy','Item-%1-%2','commandName','drawRequirements','kTDcM','isCommandEnabled','maxCols','FullText','STR','log','oLJbL','makeSkillLearnList','VMZXM','setSkillPoints','CoreEngine','onLoadBattleTestSkillLearnSystem','Parse_Notetags_CreateJS','dtYeY','setAbilityPoints','faceWidth','calcWindowHeight','Classes','cwEhC','playSkillLearn','user','indexOf','YWVpy','anchor','Actor-%1-%2','UvIek','AliveActors','Window_SkillList_drawItem','JNWtg','getJobPoints','DFkTK','StartClassSkillPoints','VictoryText','createActionJS','qoloW','_weaponIDs','jobPointsIcon','lrUAw','Window','TargetGainAbilityPoints','createCostJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','levelUpGainSkillPoints','GgyCP','Gold','Game_Party_setupBattleTestMembers','isSkillLearnMode','AbilityPointsRate','gainAbilityPointsForMulticlasses','EVAL','PjSYX','includes','LearnReqLevel','RegExp','LearnReqSkillsAll','switches','Enemy-%1-%2','getArmorIdWithName','yCZLS','jsLearnApCost','Item','MeaDa','isPlaying','abilityPointsAbbr','pgqxC','parse','showVisualGoldDisplay','makeRewardsAbilityPoints','GnNiK','changeClass','initialize','SkillPointsRate','\x5cI[%1]%2','Learned','create','sort','setSkillLearnSkillSpriteBitmap','nYjIp','ARRAYFUNC','deadMembers','description','startSkillLearnAnimation','unZbG','loadPicture','getWeaponIdWithName','inufW','shift','skillPointsFmt','allMembers','makeItemList','CXLQd','SkillPointsAdd','Actors','displayRewardsAbilityPoints','sTSRQ','playOkSound','DetailWindow_RectJS','skillLearnIncludes','jsLearnShowListTxt','getSkillLearnClassPointCost','getSkillPoints','itemLineRect','MDggH','lGjqm','abilityPointsTotal','test','VZIoS','Dsemm','dSOWW','ouNkq','isFinishedSkillLearnAnimating','LearnCpCost','colSpacing','XXJwy','axgXN','quantity','YwEUS','height','WuQvH','shouldDrawSkillLearnRequirements','_statusWindow','replace','eukqu','3419KcCGTF','displayRewards','drawSkillLearnRequirements','drawActorSimpleStatus','jsLearnShow','ConfirmWindow_RectJS','ConfirmWindow_BgType','length','isEnabled','Window_SkillList_isEnabled','cAxhB','canPayForSkillLearnSystem','skillLearnSeparationFmt','isMVAnimation','onDatabaseLoaded','SkillPointsSet','rHmDo','skillLearnAlreadyLearned','classPointsAbbr','SkillPointsGain','setupBattleTestMembersSkillLearnSystem','ReqSeparateFmt','finishSkillLearnAnimation','applySkillLearnSystemUserEffect','OmDyW','sNbDy','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','zZqOV','ReqMetFmt','skillPointsVisible','processPayForSkillLearnSystem','clear','nCxsl','rduio','classPointsIcon','levelUp','createKeyJS','loseItem','drawCurrencyValue','setFrame','drawActorFace','Settings','activate','GGRsD','Skill','_classIDs','ceil','SrSUO','Window_SkillList_drawSkillCost','LearnGoldCost','jsLearnCpCost','xFgMF','zahOK','SystemShowSkillLearnSystemMenu','ItemFmt','EnemySkillPoints','FPNFn','ttgCi','destroySkillLearnSprite','JRYiT','opacitySpeed','AbbrText','939681kuhBSD','DetailWindow_BgType','meetRequirementsForSkillLearnSystem','NCxUz','clamp','skillLearnReqTitle','processFinishSkillLearnAnimation','abilityPointsFmt','Name','STRUCT','Points','jsLearnReq','BattleManager_makeRewards','Icon','nPfNw','zlmxQ','exit','QwztT','width','ConvertParams','MDSlz','HwLaG','currencyUnit','_rewards','Armor-%1-%2','makeRewards','YGPlV','Window_SkillList_setStypeId','skillLearnArmorFmt','StatusWindowDrawJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_SkillLearnSystem_MenuAccess','drawTextExCenterAlign','RSXIl','ClassChangeSystem','LearnSkillA','DxCTL','levelA','Vjpfc','zTYht','yZnzq','_skillLearnIconSprite','jsOnLearn','sqWax','KqjVC','classPointsFmt','drawTextEx','Animation','YAaWH','onSkillLearnConfirmCancel','_skillLearnAnimationWait','skillLearnIcon','drawActorAbilityPoints','gainMulticlassRewardPoints','jsLearnJpCost','updateSkillLearnAnimation','NyKAx','GOLD','YnUxe','changePaintOpacity','Game_System_initialize','getClassIdWithName','_itemIDs','KFJmM','drawSkillPoints','gold','lineHeight','SWITCHES','ClxaP','drawIngredients','QjLRz','abilityPoints','initSkillPoints','fYzuc','onBattleStart','addCommand','bvkpp','note','VisuMZ_0_CoreEngine','NUM','cdtCY','skillLearnReqListLevel','UserGainSkillPoints','Game_Actor_learnSkill','jobPointsAbbr','HUCgF','DefaultCost','RequirementTitle','skillLearn','wQpYU','LearnShowSkillsAny','prototype','Wzqyl','innerHeight','min','eTLLa','loseAbilityPoints','NhStv','jsLearnSpCost','rLyid','item','yITkD','remove','_skillLearnBitmapSprite','_itemWindow','createSkillLearnAnimation','skillLearnWeaponFmt','process_VisuMZ_SkillLearnSystem_JS','NHcfI','ARRAYNUM','RJxgs','drawClassPoints','isTriggered','_skillLearnAnimationPlaying','skillLearnConfirmWindow','Scale','ScDIC','getSkillLearnJobPointCost','PaNpy','vnDEX','smooth','createConditionJS','MnxTl','getSkillIdWithName','itemWindowRect','loadSystem','SErwO','1895pjsmbp','getSkillLearnDisplayedCosts','currentSymbol','vgRkL','gainSkillPoints','IngredientName','destroySkillLearnAnimationSprite','floor','isSkill','SkillLearnSystem','nLfIL','LearnShowSwitchesAll','addChild','StartClassAbilityPoints','UserGainAbilityPoints','jobPointsFull','name','abilityPointsIcon','Rlgie','update','drawActorJobPoints','Scene_Skill_update','value','BattleManager_displayRewards','refresh','qWeWG','drawAbilityPoints','addWindow','LearnReqSkillsAny','OMKxF','ARMOR','_skillLearnSystem_drawItemMode','makeDeepCopy','ErsWn','reduce','members','isAlive','General','TXFbN'];const _0x4dbc53=_0x2826;(function(_0x43c17d,_0x1fdae5){const _0x4eccb1=_0x2826;while(!![]){try{const _0x3c0fb0=-parseInt(_0x4eccb1(0x19a))*-parseInt(_0x4eccb1(0x3a0))+parseInt(_0x4eccb1(0x318))*-parseInt(_0x4eccb1(0x2f1))+-parseInt(_0x4eccb1(0x287))+-parseInt(_0x4eccb1(0x1d8))+-parseInt(_0x4eccb1(0x35b))+parseInt(_0x4eccb1(0x383))*parseInt(_0x4eccb1(0x257))+-parseInt(_0x4eccb1(0x3af))*-parseInt(_0x4eccb1(0x3be));if(_0x3c0fb0===_0x1fdae5)break;else _0x43c17d['push'](_0x43c17d['shift']());}catch(_0x4d1786){_0x43c17d['push'](_0x43c17d['shift']());}}}(_0x3b5d,0xb1dcb));var label=_0x4dbc53(0x260),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4dbc53(0x319)](function(_0x3c991f){const _0x3e94ea=_0x4dbc53;return _0x3c991f[_0x3e94ea(0x324)]&&_0x3c991f[_0x3e94ea(0x16f)][_0x3e94ea(0x152)]('['+label+']');})[0x0];VisuMZ[label][_0x4dbc53(0x1c3)]=VisuMZ[label][_0x4dbc53(0x1c3)]||{},VisuMZ[_0x4dbc53(0x1eb)]=function(_0x3f106a,_0x4aa488){const _0x1ccd69=_0x4dbc53;for(const _0x1f7c04 in _0x4aa488){if(_0x1ccd69(0x2bc)===_0x1ccd69(0x2bc)){if(_0x1f7c04[_0x1ccd69(0x30c)](/(.*):(.*)/i)){const _0x189efe=String(RegExp['$1']),_0x31925e=String(RegExp['$2'])[_0x1ccd69(0x387)]()[_0x1ccd69(0x2ad)]();let _0x19ec6e,_0x47b1ae,_0xf7faa6;switch(_0x31925e){case _0x1ccd69(0x227):_0x19ec6e=_0x4aa488[_0x1f7c04]!==''?Number(_0x4aa488[_0x1f7c04]):0x0;break;case _0x1ccd69(0x245):_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON[_0x1ccd69(0x160)](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae[_0x1ccd69(0x2e4)](_0x2b8ec0=>Number(_0x2b8ec0));break;case _0x1ccd69(0x150):_0x19ec6e=_0x4aa488[_0x1f7c04]!==''?eval(_0x4aa488[_0x1f7c04]):null;break;case _0x1ccd69(0x350):_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON[_0x1ccd69(0x160)](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae['map'](_0x2c5906=>eval(_0x2c5906));break;case _0x1ccd69(0x293):_0x19ec6e=_0x4aa488[_0x1f7c04]!==''?JSON['parse'](_0x4aa488[_0x1f7c04]):'';break;case'ARRAYJSON':_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON[_0x1ccd69(0x160)](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae['map'](_0x1c05d4=>JSON[_0x1ccd69(0x160)](_0x1c05d4));break;case'FUNC':_0x19ec6e=_0x4aa488[_0x1f7c04]!==''?new Function(JSON[_0x1ccd69(0x160)](_0x4aa488[_0x1f7c04])):new Function(_0x1ccd69(0x2b4));break;case _0x1ccd69(0x16d):_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON['parse'](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae['map'](_0x428c1d=>new Function(JSON[_0x1ccd69(0x160)](_0x428c1d)));break;case _0x1ccd69(0x3d8):_0x19ec6e=_0x4aa488[_0x1f7c04]!==''?String(_0x4aa488[_0x1f7c04]):'';break;case _0x1ccd69(0x2d4):_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON['parse'](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae[_0x1ccd69(0x2e4)](_0x3d16da=>String(_0x3d16da));break;case _0x1ccd69(0x1e1):_0xf7faa6=_0x4aa488[_0x1f7c04]!==''?JSON['parse'](_0x4aa488[_0x1f7c04]):{},_0x19ec6e=VisuMZ[_0x1ccd69(0x1eb)]({},_0xf7faa6);break;case _0x1ccd69(0x328):_0x47b1ae=_0x4aa488[_0x1f7c04]!==''?JSON[_0x1ccd69(0x160)](_0x4aa488[_0x1f7c04]):[],_0x19ec6e=_0x47b1ae[_0x1ccd69(0x2e4)](_0x29bd85=>VisuMZ[_0x1ccd69(0x1eb)]({},JSON['parse'](_0x29bd85)));break;default:continue;}_0x3f106a[_0x189efe]=_0x19ec6e;}}else _0x5c06e3['id']=_0x2b991d(_0x37d927);}return _0x3f106a;},(_0x4d61fd=>{const _0xc39ca8=_0x4dbc53,_0x1a08c3=_0x4d61fd[_0xc39ca8(0x267)];for(const _0x555f86 of dependencies){if(_0xc39ca8(0x2e9)===_0xc39ca8(0x2e9)){if(!Imported[_0x555f86]){alert(_0xc39ca8(0x3ac)['format'](_0x1a08c3,_0x555f86)),SceneManager[_0xc39ca8(0x1e8)]();break;}}else{if(_0x17ac38[_0xc39ca8(0x329)]())_0xc07bde[_0xc39ca8(0x3d9)](_0x5564e9);return 0x0;}}const _0x1eed19=_0x4d61fd[_0xc39ca8(0x16f)];if(_0x1eed19[_0xc39ca8(0x30c)](/\[Version[ ](.*?)\]/i)){const _0x349994=Number(RegExp['$1']);_0x349994!==VisuMZ[label][_0xc39ca8(0x3cf)]&&(_0xc39ca8(0x1cd)===_0xc39ca8(0x171)?_0x2bdaf9+=_0x48f2de['round']((_0x136181-_0x2f9178)/0x2):(alert(_0xc39ca8(0x317)[_0xc39ca8(0x300)](_0x1a08c3,_0x349994)),SceneManager[_0xc39ca8(0x1e8)]()));}if(_0x1eed19[_0xc39ca8(0x30c)](/\[Tier[ ](\d+)\]/i)){const _0x31c7eb=Number(RegExp['$1']);_0x31c7eb<tier?(alert(_0xc39ca8(0x37c)[_0xc39ca8(0x300)](_0x1a08c3,_0x31c7eb,tier)),SceneManager[_0xc39ca8(0x1e8)]()):tier=Math[_0xc39ca8(0x2af)](_0x31c7eb,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0xc39ca8(0x1c3)],_0x4d61fd[_0xc39ca8(0x2df)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'AbilityPointsGain',_0x5120b4=>{const _0x5b6e7b=_0x4dbc53;VisuMZ[_0x5b6e7b(0x1eb)](_0x5120b4,_0x5120b4);const _0x37666d=_0x5120b4[_0x5b6e7b(0x17b)][_0x5b6e7b(0x2e4)](_0x403afc=>$gameActors[_0x5b6e7b(0x3c9)](_0x403afc)),_0x30bdc5=_0x5120b4[_0x5b6e7b(0x3e5)],_0x348ea0=_0x5120b4[_0x5b6e7b(0x1e2)];for(const _0x588c37 of _0x37666d){if(!_0x588c37)continue;for(const _0x74cec1 of _0x30bdc5){_0x5b6e7b(0x1c9)===_0x5b6e7b(0x191)?(_0x58f208[_0x5b6e7b(0x260)][_0x5b6e7b(0x334)][_0x5b6e7b(0x2c2)](this,_0x16e596),this[_0x5b6e7b(0x28f)](),this['gainStartingAbilityPoints'](),this[_0x5b6e7b(0x220)](),this['gainStartingSkillPoints']()):_0x588c37[_0x5b6e7b(0x343)](_0x348ea0,_0x74cec1);}}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],'AbilityPointsAdd',_0x2a97a0=>{const _0x29bc14=_0x4dbc53;VisuMZ[_0x29bc14(0x1eb)](_0x2a97a0,_0x2a97a0);const _0x51a408=_0x2a97a0['Actors']['map'](_0x3e5a1c=>$gameActors['actor'](_0x3e5a1c)),_0x99ff4=_0x2a97a0['Classes'],_0x5e74d9=_0x2a97a0['Points'];for(const _0x145630 of _0x51a408){if(!_0x145630)continue;for(const _0xfc8a82 of _0x99ff4){_0x145630[_0x29bc14(0x336)](_0x5e74d9,_0xfc8a82);}}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],_0x4dbc53(0x309),_0x224891=>{const _0x4fb7bd=_0x4dbc53;VisuMZ[_0x4fb7bd(0x1eb)](_0x224891,_0x224891);const _0x3ad283=_0x224891['Actors']['map'](_0x339436=>$gameActors[_0x4fb7bd(0x3c9)](_0x339436)),_0x4eb894=_0x224891[_0x4fb7bd(0x3e5)],_0x324142=_0x224891[_0x4fb7bd(0x1e2)];for(const _0x2091f9 of _0x3ad283){if(_0x4fb7bd(0x3ed)===_0x4fb7bd(0x3ed)){if(!_0x2091f9)continue;for(const _0x45ce7d of _0x4eb894){_0x2091f9[_0x4fb7bd(0x238)](_0x324142,_0x45ce7d);}}else{const _0x59ca95=_0x379e6e(_0x2a7b43['$1'])['split'](',')[_0x4fb7bd(0x2e4)](_0x53f452=>_0x5f41d3(_0x53f452));for(const _0x11e1c7 of _0x59ca95){const _0x4efd57=_0x2dddb5[_0x4fb7bd(0x156)][_0x11e1c7],_0x3c380e=_0x5a6264['value'](_0x11e1c7)?_0x2aae59:_0x36d1e8;_0x32a486+=_0x3c380e[_0x4fb7bd(0x300)](_0x4efd57)+'\x0a';}}}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],'AbilityPointsSet',_0x5f28a3=>{const _0x2ce45a=_0x4dbc53;VisuMZ[_0x2ce45a(0x1eb)](_0x5f28a3,_0x5f28a3);const _0x3d7d04=_0x5f28a3['Actors']['map'](_0x3799d7=>$gameActors[_0x2ce45a(0x3c9)](_0x3799d7)),_0x2a375b=_0x5f28a3['Classes'],_0x5d0f6f=_0x5f28a3[_0x2ce45a(0x1e2)];for(const _0x57f95f of _0x3d7d04){if(_0x2ce45a(0x2da)!=='eiHFO')_0x3ac540=_0x3e23ae[_0x2ce45a(0x236)](_0x273c4a[_0x2ce45a(0x3e3)],_0x313930),_0x1effc6+=_0x5f0374[_0x2ce45a(0x396)]((this['innerWidth']-_0x453af3-this[_0x2ce45a(0x289)]()*0x2-_0xca9d0b)/0x2);else{if(!_0x57f95f)continue;for(const _0x7220e5 of _0x2a375b){_0x57f95f[_0x2ce45a(0x3e2)](_0x5d0f6f,_0x7220e5);}}}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],_0x4dbc53(0x1ad),_0x4b470d=>{const _0x3e1d7b=_0x4dbc53;VisuMZ['ConvertParams'](_0x4b470d,_0x4b470d);const _0x294f27=_0x4b470d['Actors'][_0x3e1d7b(0x2e4)](_0x3e4622=>$gameActors[_0x3e1d7b(0x3c9)](_0x3e4622)),_0xae2b68=_0x4b470d[_0x3e1d7b(0x3e5)],_0x2c9b1e=_0x4b470d[_0x3e1d7b(0x1e2)];for(const _0x361d54 of _0x294f27){if(!_0x361d54)continue;for(const _0x3a1a9a of _0xae2b68){if('gcogy'!==_0x3e1d7b(0x286))_0x361d54['gainSkillPoints'](_0x2c9b1e,_0x3a1a9a);else return _0x5e8064;}}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],_0x4dbc53(0x17a),_0x44f310=>{const _0x292e2f=_0x4dbc53;VisuMZ[_0x292e2f(0x1eb)](_0x44f310,_0x44f310);const _0xccfc7=_0x44f310[_0x292e2f(0x17b)]['map'](_0x360535=>$gameActors[_0x292e2f(0x3c9)](_0x360535)),_0x3f145a=_0x44f310[_0x292e2f(0x3e5)],_0x55c7b7=_0x44f310[_0x292e2f(0x1e2)];for(const _0x52a21b of _0xccfc7){if(!_0x52a21b)continue;for(const _0x521499 of _0x3f145a){_0x52a21b[_0x292e2f(0x32b)](_0x55c7b7,_0x521499);}}}),PluginManager['registerCommand'](pluginData[_0x4dbc53(0x267)],'SkillPointsLose',_0x1e7210=>{const _0x2f58e9=_0x4dbc53;VisuMZ[_0x2f58e9(0x1eb)](_0x1e7210,_0x1e7210);const _0x5dc24b=_0x1e7210[_0x2f58e9(0x17b)]['map'](_0x1a9705=>$gameActors['actor'](_0x1a9705)),_0x5463bf=_0x1e7210[_0x2f58e9(0x3e5)],_0x1ab03c=_0x1e7210['Points'];for(const _0x515fd3 of _0x5dc24b){if('atiqJ'===_0x2f58e9(0x2f0)){if(!_0x515fd3)continue;for(const _0x65a6d2 of _0x5463bf){if(_0x2f58e9(0x27e)!=='aXWDf')_0x515fd3[_0x2f58e9(0x2d1)](_0x1ab03c,_0x65a6d2);else{const _0x2d1ce3=_0x15378b[_0x2f58e9(0x225)];if(_0x2d1ce3[_0x2f58e9(0x30c)](_0x2b553a)){const _0x4556d5=_0x5641f4(_0x18b272['$1']),_0x40ee73=_0x2f58e9(0x2cd)[_0x2f58e9(0x300)](_0x4556d5),_0x2e81c2=_0x45a2fe['SkillLearnSystem'][_0x2f58e9(0x1be)](_0x28b73d,_0x470487);_0x331ee3[_0x2f58e9(0x260)]['JS'][_0x2e81c2]=new _0x10fb27(_0x40ee73);}}}}else _0x96acd0[_0x2f58e9(0x3dd)](_0x1d7ab6,_0x10c6a4);}}),PluginManager[_0x4dbc53(0x2b8)](pluginData['name'],_0x4dbc53(0x1a9),_0x2f308f=>{const _0x2eae99=_0x4dbc53;VisuMZ[_0x2eae99(0x1eb)](_0x2f308f,_0x2f308f);const _0x2407bf=_0x2f308f['Actors'][_0x2eae99(0x2e4)](_0x379395=>$gameActors[_0x2eae99(0x3c9)](_0x379395)),_0x317add=_0x2f308f['Classes'],_0x4094ee=_0x2f308f[_0x2eae99(0x1e2)];for(const _0x413d50 of _0x2407bf){if(_0x2eae99(0x1f2)===_0x2eae99(0x1f2)){if(!_0x413d50)continue;for(const _0x4de02c of _0x317add){_0x413d50[_0x2eae99(0x3dd)](_0x4094ee,_0x4de02c);}}else return _0x3cef00=_0x478291[_0x2eae99(0x205)],_0x196190[_0x2eae99(0x300)](_0x437645,_0x3009bd[_0x2eae99(0x1ac)],'\x5cI[%1]'[_0x2eae99(0x300)](_0x49d382[_0x2eae99(0x1bc)]),_0x474b3e[_0x2eae99(0x338)]);}}),PluginManager[_0x4dbc53(0x2b8)](pluginData[_0x4dbc53(0x267)],_0x4dbc53(0x1cf),_0x47087b=>{const _0x3f6075=_0x4dbc53;VisuMZ[_0x3f6075(0x1eb)](_0x47087b,_0x47087b),$gameSystem[_0x3f6075(0x2ee)](_0x47087b[_0x3f6075(0x37a)]);}),VisuMZ['SkillLearnSystem'][_0x4dbc53(0x2b2)]=Scene_Boot[_0x4dbc53(0x233)][_0x4dbc53(0x1a8)],Scene_Boot[_0x4dbc53(0x233)][_0x4dbc53(0x1a8)]=function(){const _0x3469e7=_0x4dbc53;VisuMZ[_0x3469e7(0x260)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_SkillLearnSystem_Notetags']();},Scene_Boot[_0x4dbc53(0x233)][_0x4dbc53(0x320)]=function(){const _0x4cc7d8=_0x4dbc53;if(VisuMZ[_0x4cc7d8(0x373)])return;this[_0x4cc7d8(0x243)]();},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x154)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN (?:SKILL|SKILLS):[ ](.*)>/gi,'LearnSkillB':/<LEARN (?:SKILL|SKILLS)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL|SKILLS)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ['SkillLearnSystem']['JS']={},Scene_Boot[_0x4dbc53(0x233)][_0x4dbc53(0x243)]=function(){const _0x7e718c=_0x4dbc53,_0x35590a=$dataActors[_0x7e718c(0x333)]($dataSkills);for(const _0x27a1f9 of _0x35590a){if(_0x7e718c(0x1ba)===_0x7e718c(0x390)){if(this[_0x7e718c(0x259)]()==='ok'){}else _0x202167['prototype'][_0x7e718c(0x17e)][_0x7e718c(0x2c2)](this);}else{if(!_0x27a1f9)continue;VisuMZ['SkillLearnSystem'][_0x7e718c(0x3e0)](_0x27a1f9);}}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x354)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x4dbc53(0x354)]=function(_0x545f4b){const _0x2e4f62=_0x4dbc53;VisuMZ[_0x2e4f62(0x260)][_0x2e4f62(0x354)][_0x2e4f62(0x2c2)](this,_0x545f4b),VisuMZ['SkillLearnSystem'][_0x2e4f62(0x3e0)](_0x545f4b);},VisuMZ[_0x4dbc53(0x260)]['Parse_Notetags_CreateJS']=function(_0x2b9806){const _0x4093e2=_0x4dbc53,_0x3bfbdd=VisuMZ[_0x4093e2(0x260)]['RegExp'];VisuMZ[_0x4093e2(0x260)][_0x4093e2(0x3fc)](_0x2b9806,_0x4093e2(0x15a),_0x3bfbdd[_0x4093e2(0x15a)]),VisuMZ['SkillLearnSystem'][_0x4093e2(0x3fc)](_0x2b9806,_0x4093e2(0x1cc),_0x3bfbdd['jsLearnCpCost']),VisuMZ['SkillLearnSystem'][_0x4093e2(0x3fc)](_0x2b9806,_0x4093e2(0x20e),_0x3bfbdd[_0x4093e2(0x20e)]),VisuMZ[_0x4093e2(0x260)]['createCostJS'](_0x2b9806,_0x4093e2(0x23a),_0x3bfbdd[_0x4093e2(0x23a)]),VisuMZ[_0x4093e2(0x260)][_0x4093e2(0x3c7)](_0x2b9806,_0x4093e2(0x19e),_0x3bfbdd[_0x4093e2(0x19e)]),VisuMZ[_0x4093e2(0x260)]['createConditionJS'](_0x2b9806,'jsLearnReq',_0x3bfbdd[_0x4093e2(0x1e3)]),VisuMZ['SkillLearnSystem'][_0x4093e2(0x33f)](_0x2b9806,_0x4093e2(0x181),_0x3bfbdd[_0x4093e2(0x181)]),VisuMZ[_0x4093e2(0x260)][_0x4093e2(0x33f)](_0x2b9806,'jsLearnShowDetailTxt',_0x3bfbdd[_0x4093e2(0x2dd)]),VisuMZ['SkillLearnSystem']['createTextJS'](_0x2b9806,'jsLearnReqListTxt',_0x3bfbdd['jsLearnReqListTxt']),VisuMZ[_0x4093e2(0x260)][_0x4093e2(0x33f)](_0x2b9806,_0x4093e2(0x2c4),_0x3bfbdd['jsLearnReqDetailTxt']),VisuMZ[_0x4093e2(0x260)]['createActionJS'](_0x2b9806,_0x4093e2(0x202),_0x3bfbdd['jsOnLearn']);},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x3fc)]=function(_0x1939b5,_0x2ce62a,_0x2f6c54){const _0x45ab32=_0x4dbc53,_0x2b28aa=_0x1939b5['note'];if(_0x2b28aa[_0x45ab32(0x30c)](_0x2f6c54)){if('OLxnu'===_0x45ab32(0x3e1)){if(!_0x59b7a4[_0x45ab32(0x260)]['JS'][_0x26c530][_0x45ab32(0x2c2)](this,this,_0x206f83))return![];}else{const _0x27b13f=String(RegExp['$1']),_0x39c0cd='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x27b13f),_0x2dcfc1=VisuMZ[_0x45ab32(0x260)][_0x45ab32(0x1be)](_0x1939b5,_0x2ce62a);VisuMZ['SkillLearnSystem']['JS'][_0x2dcfc1]=new Function(_0x39c0cd);}}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x3c7)]=function(_0x1fdc2d,_0x51ac33,_0xe99f1b){const _0x5c129b=_0x4dbc53,_0x27a22f=_0x1fdc2d[_0x5c129b(0x225)];if(_0x27a22f[_0x5c129b(0x30c)](_0xe99f1b)){const _0x1416e1=String(RegExp['$1']),_0x54cb62='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x1416e1),_0xa1d47a=VisuMZ['SkillLearnSystem'][_0x5c129b(0x1be)](_0x1fdc2d,_0x51ac33);VisuMZ[_0x5c129b(0x260)]['JS'][_0xa1d47a]=new Function(_0x54cb62);}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x251)]=function(_0x57b57a,_0x25192f,_0x12a6d0){const _0x565c95=_0x4dbc53,_0x20d1b1=_0x57b57a[_0x565c95(0x225)];if(_0x20d1b1[_0x565c95(0x30c)](_0x12a6d0)){if(_0x565c95(0x35d)==='NaPJP'){if(!this[_0x565c95(0x249)])return;this[_0x565c95(0x335)](),this[_0x565c95(0x2f5)](),this['isFinishedSkillLearnAnimating']()&&this[_0x565c95(0x1de)]();}else{const _0x2da4c3=String(RegExp['$1']),_0x2985b6=_0x565c95(0x1f6)['format'](_0x2da4c3),_0x8367c8=VisuMZ['SkillLearnSystem'][_0x565c95(0x1be)](_0x57b57a,_0x25192f);VisuMZ[_0x565c95(0x260)]['JS'][_0x8367c8]=new Function(_0x2985b6);}}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x33f)]=function(_0x3150f3,_0x3109b5,_0x2415d7){const _0xd1988=_0x4dbc53,_0x16a601=_0x3150f3[_0xd1988(0x225)];if(_0x16a601[_0xd1988(0x30c)](_0x2415d7)){if(_0xd1988(0x2e0)===_0xd1988(0x3c1))_0x19cc63=_0x3fa703;else{const _0x3f2fe5=String(RegExp['$1']),_0x6c5677=_0xd1988(0x1b4)[_0xd1988(0x300)](_0x3f2fe5),_0x33bb8f=VisuMZ[_0xd1988(0x260)][_0xd1988(0x1be)](_0x3150f3,_0x3109b5);VisuMZ[_0xd1988(0x260)]['JS'][_0x33bb8f]=new Function(_0x6c5677);}}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x3f5)]=function(_0x27b2c2,_0x241454,_0x2574f3){const _0x5b8641=_0x4dbc53,_0x53c9e0=_0x27b2c2[_0x5b8641(0x225)];if(_0x53c9e0['match'](_0x2574f3)){const _0x8722c1=String(RegExp['$1']),_0x44ef34=_0x5b8641(0x2cd)['format'](_0x8722c1),_0x42a785=VisuMZ[_0x5b8641(0x260)][_0x5b8641(0x1be)](_0x27b2c2,_0x241454);VisuMZ['SkillLearnSystem']['JS'][_0x42a785]=new Function(_0x44ef34);}},VisuMZ[_0x4dbc53(0x260)]['createKeyJS']=function(_0x3a6813,_0x340299){const _0x5cade5=_0x4dbc53;let _0x53b52f='';if($dataActors[_0x5cade5(0x152)](_0x3a6813))_0x53b52f='Actor-%1-%2'['format'](_0x3a6813['id'],_0x340299);if($dataClasses['includes'](_0x3a6813))_0x53b52f=_0x5cade5(0x2f6)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataSkills['includes'](_0x3a6813))_0x53b52f=_0x5cade5(0x37d)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataItems[_0x5cade5(0x152)](_0x3a6813))_0x53b52f=_0x5cade5(0x3d1)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataWeapons['includes'](_0x3a6813))_0x53b52f=_0x5cade5(0x2ff)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataArmors[_0x5cade5(0x152)](_0x3a6813))_0x53b52f=_0x5cade5(0x1f0)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataEnemies[_0x5cade5(0x152)](_0x3a6813))_0x53b52f='Enemy-%1-%2'[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);if($dataStates[_0x5cade5(0x152)](_0x3a6813))_0x53b52f=_0x5cade5(0x347)[_0x5cade5(0x300)](_0x3a6813['id'],_0x340299);return _0x53b52f;},DataManager[_0x4dbc53(0x215)]=function(_0x975190){const _0x58ab7c=_0x4dbc53;_0x975190=_0x975190[_0x58ab7c(0x387)]()[_0x58ab7c(0x2ad)](),this['_classIDs']=this[_0x58ab7c(0x1c7)]||{};if(this[_0x58ab7c(0x1c7)][_0x975190])return this[_0x58ab7c(0x1c7)][_0x975190];for(const _0x51bef8 of $dataClasses){if(_0x58ab7c(0x23b)==='tkWKn')this['initSkillLearnSystemMenuAccess']();else{if(!_0x51bef8)continue;let _0x155b8f=_0x51bef8[_0x58ab7c(0x267)];_0x155b8f=_0x155b8f[_0x58ab7c(0x198)](/\x1I\[(\d+)\]/gi,''),_0x155b8f=_0x155b8f[_0x58ab7c(0x198)](/\\I\[(\d+)\]/gi,''),this[_0x58ab7c(0x1c7)][_0x155b8f[_0x58ab7c(0x387)]()['trim']()]=_0x51bef8['id'];}}return this[_0x58ab7c(0x1c7)][_0x975190]||0x0;},DataManager['getSkillIdWithName']=function(_0x91ce83){const _0x155850=_0x4dbc53;_0x91ce83=_0x91ce83[_0x155850(0x387)]()[_0x155850(0x2ad)](),this[_0x155850(0x2f9)]=this[_0x155850(0x2f9)]||{};if(this[_0x155850(0x2f9)][_0x91ce83])return this[_0x155850(0x2f9)][_0x91ce83];for(const _0x27b29b of $dataSkills){if(_0x155850(0x179)!==_0x155850(0x1fe)){if(!_0x27b29b)continue;this[_0x155850(0x2f9)][_0x27b29b[_0x155850(0x267)][_0x155850(0x387)]()[_0x155850(0x2ad)]()]=_0x27b29b['id'];}else this[_0x155850(0x1b0)]();}return this[_0x155850(0x2f9)][_0x91ce83]||0x0;},DataManager[_0x4dbc53(0x35e)]=function(_0x3e71bf){const _0x345f08=_0x4dbc53;_0x3e71bf=_0x3e71bf['toUpperCase']()['trim'](),this['_itemIDs']=this[_0x345f08(0x216)]||{};if(this[_0x345f08(0x216)][_0x3e71bf])return this['_itemIDs'][_0x3e71bf];for(const _0x512840 of $dataItems){if(!_0x512840)continue;this[_0x345f08(0x216)][_0x512840[_0x345f08(0x267)]['toUpperCase']()[_0x345f08(0x2ad)]()]=_0x512840['id'];}return this[_0x345f08(0x216)][_0x3e71bf]||0x0;},DataManager['getWeaponIdWithName']=function(_0x12c479){const _0x42a73b=_0x4dbc53;_0x12c479=_0x12c479[_0x42a73b(0x387)]()[_0x42a73b(0x2ad)](),this['_weaponIDs']=this[_0x42a73b(0x3f7)]||{};if(this[_0x42a73b(0x3f7)][_0x12c479])return this[_0x42a73b(0x3f7)][_0x12c479];for(const _0x30de94 of $dataWeapons){if('hOSjV'===_0x42a73b(0x2a7)){if(!_0x30de94)continue;this[_0x42a73b(0x3f7)][_0x30de94['name'][_0x42a73b(0x387)]()['trim']()]=_0x30de94['id'];}else this[_0x42a73b(0x240)][_0x42a73b(0x341)](),this['_skillLearnIngredientsWindow']['show'](),this[_0x42a73b(0x2c8)][_0x42a73b(0x26f)](),this[_0x42a73b(0x2ed)][_0x42a73b(0x28b)](),this[_0x42a73b(0x2ed)][_0x42a73b(0x26f)](),this[_0x42a73b(0x2ed)][_0x42a73b(0x1c4)](),this['_skillLearnConfirmWindow'][_0x42a73b(0x292)](0x0);}return this[_0x42a73b(0x3f7)][_0x12c479]||0x0;},DataManager[_0x4dbc53(0x158)]=function(_0x50a9d5){const _0x40058b=_0x4dbc53;_0x50a9d5=_0x50a9d5[_0x40058b(0x387)]()[_0x40058b(0x2ad)](),this['_armorIDs']=this[_0x40058b(0x2fb)]||{};if(this[_0x40058b(0x2fb)][_0x50a9d5])return this[_0x40058b(0x2fb)][_0x50a9d5];for(const _0x22ab4f of $dataArmors){if(!_0x22ab4f)continue;this[_0x40058b(0x2fb)][_0x22ab4f[_0x40058b(0x267)][_0x40058b(0x387)]()['trim']()]=_0x22ab4f['id'];}return this[_0x40058b(0x2fb)][_0x50a9d5]||0x0;},DataManager[_0x4dbc53(0x39f)]=function(_0x6accd5){const _0x51f75d=_0x4dbc53;if(!$dataClasses[_0x6accd5])return[];const _0x565b23=[],_0x50e732=$dataClasses[_0x6accd5]['note'],_0xe2701f=VisuMZ[_0x51f75d(0x260)]['RegExp'],_0x3eb295=_0x50e732[_0x51f75d(0x30c)](_0xe2701f['LearnSkillA']);if(_0x3eb295)for(const _0x2c10a3 of _0x3eb295){if(!_0x2c10a3)continue;_0x2c10a3[_0x51f75d(0x30c)](_0xe2701f[_0x51f75d(0x1fb)]);const _0x117fa1=String(RegExp['$1'])[_0x51f75d(0x2c5)](',')[_0x51f75d(0x2e4)](_0x530318=>_0x530318[_0x51f75d(0x2ad)]());;for(let _0xc3b067 of _0x117fa1){if(_0x51f75d(0x3c0)!==_0x51f75d(0x389)){_0xc3b067=(String(_0xc3b067)||'')[_0x51f75d(0x2ad)]();const _0x36cff8=/^\d+$/[_0x51f75d(0x188)](_0xc3b067);_0x36cff8?_0x51f75d(0x239)===_0x51f75d(0x284)?_0x4775c7['prototype']['initialize']['call'](this,_0x44870f):_0x565b23[_0x51f75d(0x364)](Number(_0xc3b067)):_0x565b23[_0x51f75d(0x364)](DataManager['getSkillIdWithName'](_0xc3b067));}else this[_0x51f75d(0x21d)]();}}const _0x1d8844=_0x50e732[_0x51f75d(0x30c)](_0xe2701f[_0x51f75d(0x375)]);if(_0x1d8844)for(const _0x2ea525 of _0x1d8844){if(!_0x2ea525)continue;_0x2ea525[_0x51f75d(0x30c)](_0xe2701f[_0x51f75d(0x1fb)]);const _0x3a2a72=String(RegExp['$1'])['split'](/[\r\n]+/);for(let _0x3b5f4b of _0x3a2a72){if(_0x51f75d(0x203)!==_0x51f75d(0x203))_0x1d5c07=_0x18bbfc[_0x51f75d(0x215)](_0x30798d);else{_0x3b5f4b=(String(_0x3b5f4b)||'')[_0x51f75d(0x2ad)]();const _0x5783ca=/^\d+$/[_0x51f75d(0x188)](_0x3b5f4b);_0x5783ca?'zmEZY'!=='zmEZY'?_0xab8168[_0x51f75d(0x260)]['Window_SkillList_drawSkillCost'][_0x51f75d(0x2c2)](this,_0x4cf4bf,_0x4c6a02,_0x9ae21c,_0xafe357):_0x565b23[_0x51f75d(0x364)](Number(_0x3b5f4b)):_0x565b23['push'](DataManager[_0x51f75d(0x253)](_0x3b5f4b));}}}return _0x565b23[_0x51f75d(0x16a)]((_0x28a747,_0x13f78c)=>_0x28a747-_0x13f78c)[_0x51f75d(0x319)]((_0x5c68e0,_0x4878ee,_0x31581a)=>_0x31581a[_0x51f75d(0x3e9)](_0x5c68e0)===_0x4878ee);},DataManager['getSkillLearnAbilityPointCost']=function(_0x4f9dcd){const _0x31152b=_0x4dbc53;if(!_0x4f9dcd)return 0x0;if(!DataManager['isSkill'](_0x4f9dcd))return 0x0;const _0x1e7618=VisuMZ['SkillLearnSystem'][_0x31152b(0x154)],_0xe3c7e8=_0x4f9dcd[_0x31152b(0x225)];if(_0xe3c7e8[_0x31152b(0x30c)](_0x1e7618[_0x31152b(0x3aa)])){if(_0x31152b(0x2a9)!==_0x31152b(0x2a9))this['addCommand'](_0x25630e[_0x31152b(0x3ae)],'ok',this[_0x31152b(0x303)]()),this[_0x31152b(0x223)](_0x1e194c[_0x31152b(0x2e1)],_0x31152b(0x365));else return Number(RegExp['$1']);}if(_0xe3c7e8[_0x31152b(0x30c)](_0x1e7618['LearnCostBatch'])){const _0x1b73fd=String(RegExp['$1'])[_0x31152b(0x2c5)](/[\r\n]+/);for(const _0x5e4a43 of _0x1b73fd){if(_0x31152b(0x189)!==_0x31152b(0x3f0)){if(_0x5e4a43[_0x31152b(0x30c)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi)){if('yjRjQ'!==_0x31152b(0x290)){const _0x3bdd27=_0x13195d(_0x2efcb2['$1']),_0x130885=_0x31152b(0x148)[_0x31152b(0x300)](_0x3bdd27),_0x11ffe3=_0x38838e['SkillLearnSystem'][_0x31152b(0x1be)](_0x6cfe2c,_0x2fcb12);_0x5e5edc[_0x31152b(0x260)]['JS'][_0x11ffe3]=new _0x23b493(_0x130885);}else return Number(RegExp['$1']);}}else _0x1309cd['push'](_0x2e22a8);}}const _0x37ec76=VisuMZ[_0x31152b(0x260)][_0x31152b(0x1be)](_0x4f9dcd,_0x31152b(0x15a));if(VisuMZ[_0x31152b(0x260)]['JS'][_0x37ec76]){const _0x4df0c7=SceneManager[_0x31152b(0x280)][_0x31152b(0x3e8)]();return VisuMZ[_0x31152b(0x260)]['JS'][_0x37ec76][_0x31152b(0x2c2)](this,_0x4df0c7,_0x4f9dcd);}return VisuMZ[_0x31152b(0x260)][_0x31152b(0x1c3)][_0x31152b(0x31d)][_0x31152b(0x22e)];},DataManager[_0x4dbc53(0x182)]=function(_0x396fae){const _0x20c996=_0x4dbc53;if(!_0x396fae)return 0x0;if(!DataManager[_0x20c996(0x25f)](_0x396fae))return 0x0;const _0x58811b=VisuMZ[_0x20c996(0x260)]['RegExp'],_0x127c85=_0x396fae[_0x20c996(0x225)];if(_0x127c85[_0x20c996(0x30c)](_0x58811b[_0x20c996(0x18e)]))return Number(RegExp['$1']);if(_0x127c85['match'](_0x58811b['LearnCostBatch'])){if(_0x20c996(0x325)!==_0x20c996(0x325))return _0x3b7e0c(_0x5e3397['$1']);else{const _0x1c4bf8=String(RegExp['$1'])[_0x20c996(0x2c5)](/[\r\n]+/);for(const _0x4ef97b of _0x1c4bf8){if(_0x4ef97b[_0x20c996(0x30c)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}}const _0x3972a7=VisuMZ[_0x20c996(0x260)][_0x20c996(0x1be)](_0x396fae,_0x20c996(0x1cc));if(VisuMZ['SkillLearnSystem']['JS'][_0x3972a7]){const _0x159756=SceneManager[_0x20c996(0x280)][_0x20c996(0x3e8)]();return VisuMZ[_0x20c996(0x260)]['JS'][_0x3972a7][_0x20c996(0x2c2)](this,_0x159756,_0x396fae);}return VisuMZ[_0x20c996(0x1fa)]['Settings'][_0x20c996(0x2e2)][_0x20c996(0x22e)];},DataManager['getSkillLearnJobPointCost']=function(_0x4a062d){const _0x28d6a2=_0x4dbc53;if(!_0x4a062d)return 0x0;if(!DataManager[_0x28d6a2(0x25f)](_0x4a062d))return 0x0;const _0x9b88d1=VisuMZ['SkillLearnSystem'][_0x28d6a2(0x154)],_0x4c807c=_0x4a062d[_0x28d6a2(0x225)];if(_0x4c807c[_0x28d6a2(0x30c)](_0x9b88d1[_0x28d6a2(0x2c1)]))return Number(RegExp['$1']);if(_0x4c807c['match'](_0x9b88d1[_0x28d6a2(0x34d)])){if(_0x28d6a2(0x369)===_0x28d6a2(0x234)){const _0x5133c7=_0x6ede76[_0x28d6a2(0x225)];if(_0x5133c7['match'](_0x3ce4ff)){const _0x2f5d49=_0x52cbd1(_0x3b554f['$1']),_0x51d3bc=_0x28d6a2(0x1f6)[_0x28d6a2(0x300)](_0x2f5d49),_0x3afd30=_0x363e6b[_0x28d6a2(0x260)][_0x28d6a2(0x1be)](_0x2ecb3b,_0x2adaf8);_0xa91e61[_0x28d6a2(0x260)]['JS'][_0x3afd30]=new _0x546db5(_0x51d3bc);}}else{const _0x20e614=String(RegExp['$1'])[_0x28d6a2(0x2c5)](/[\r\n]+/);for(const _0x542db7 of _0x20e614){if(_0x28d6a2(0x1b2)!==_0x28d6a2(0x151)){if(_0x542db7[_0x28d6a2(0x30c)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}else{if(_0x4b0145[_0x28d6a2(0x373)])return;this[_0x28d6a2(0x243)]();}}}}const _0x3b0a00=VisuMZ[_0x28d6a2(0x260)][_0x28d6a2(0x1be)](_0x4a062d,'jsLearnJpCost');if(VisuMZ[_0x28d6a2(0x260)]['JS'][_0x3b0a00]){const _0x40226f=SceneManager[_0x28d6a2(0x280)]['user']();return VisuMZ[_0x28d6a2(0x260)]['JS'][_0x3b0a00][_0x28d6a2(0x2c2)](this,_0x40226f,_0x4a062d);}return VisuMZ[_0x28d6a2(0x1fa)][_0x28d6a2(0x1c3)]['JobPoints']['DefaultCost'];},DataManager[_0x4dbc53(0x345)]=function(_0x5adac1){const _0x11c541=_0x4dbc53;if(!_0x5adac1)return 0x0;if(!DataManager[_0x11c541(0x25f)](_0x5adac1))return 0x0;const _0x171f7f=VisuMZ[_0x11c541(0x260)]['RegExp'],_0x5744c8=_0x5adac1['note'];if(_0x5744c8[_0x11c541(0x30c)](_0x171f7f[_0x11c541(0x36f)]))return Number(RegExp['$1']);if(_0x5744c8[_0x11c541(0x30c)](_0x171f7f[_0x11c541(0x34d)])){if(_0x11c541(0x3f6)===_0x11c541(0x33e))_0x3adb6c[_0x11c541(0x364)](_0x10be98);else{const _0x45b9e0=String(RegExp['$1'])[_0x11c541(0x2c5)](/[\r\n]+/);for(const _0x41e3c9 of _0x45b9e0){if(_0x41e3c9[_0x11c541(0x30c)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}}const _0x4b4f73=VisuMZ[_0x11c541(0x260)][_0x11c541(0x1be)](_0x5adac1,_0x11c541(0x23a));if(VisuMZ[_0x11c541(0x260)]['JS'][_0x4b4f73]){const _0x4a941b=SceneManager[_0x11c541(0x280)]['user']();return VisuMZ[_0x11c541(0x260)]['JS'][_0x4b4f73][_0x11c541(0x2c2)](this,_0x4a941b,_0x5adac1);}return VisuMZ[_0x11c541(0x260)]['Settings'][_0x11c541(0x377)][_0x11c541(0x22e)];},DataManager[_0x4dbc53(0x2be)]=function(_0x1f1530){const _0x55f03c=_0x4dbc53;if(!_0x1f1530)return 0x0;if(!DataManager[_0x55f03c(0x25f)](_0x1f1530))return 0x0;const _0x15b2fc=VisuMZ[_0x55f03c(0x260)][_0x55f03c(0x154)],_0x54b449=_0x1f1530[_0x55f03c(0x225)],_0x2f2822=[],_0x461730=_0x54b449['match'](_0x15b2fc[_0x55f03c(0x388)]);if(_0x461730){if(_0x55f03c(0x269)===_0x55f03c(0x3e6))_0x2707f5!==''?_0x596ad9=_0x23eacf[_0x55f03c(0x300)](_0x203b1b,_0x4b78a1):_0x2edf36=_0xdfcc9a;else for(const _0x32f241 of _0x461730){if(_0x55f03c(0x208)!==_0x55f03c(0x3a9)){if(!_0x32f241)continue;_0x32f241[_0x55f03c(0x30c)](_0x15b2fc[_0x55f03c(0x388)]);const _0x1793f4=String(RegExp['$1']),_0x3e4a98={'id':0x0,'quantity':Number(RegExp['$2'])},_0x33eefe=/^\d+$/[_0x55f03c(0x188)](_0x1793f4);if(_0x33eefe)_0x3e4a98['id']=Number(_0x1793f4);else{if(_0x55f03c(0x24e)!==_0x55f03c(0x24e)){if(_0x11e77['match'](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return _0x3d1261(_0x156fa4['$1']);}else _0x3e4a98['id']=DataManager[_0x55f03c(0x35e)](_0x1793f4);}_0x3e4a98['id']>0x0&&_0x2f2822[_0x55f03c(0x364)](_0x3e4a98);}else{if(_0x316356['isPlaytest']())_0x349616[_0x55f03c(0x3d9)](_0x186136);return 0x0;}}}if(_0x54b449['match'](_0x15b2fc['LearnCostBatch'])){if(_0x55f03c(0x3a5)===_0x55f03c(0x3a5)){const _0x5f1e31=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0xec7541 of _0x5f1e31){if(_0xec7541['match'](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x413183=String(RegExp['$1']),_0x1c6905={'id':0x0,'quantity':Number(RegExp['$2'])},_0x525f79=/^\d+$/[_0x55f03c(0x188)](_0x413183);_0x525f79?_0x1c6905['id']=Number(_0x413183):_0x1c6905['id']=DataManager[_0x55f03c(0x35e)](_0x413183),_0x1c6905['id']>0x0&&_0x2f2822[_0x55f03c(0x364)](_0x1c6905);}}}else{const _0x2fa73f=this[_0x55f03c(0x14d)]();_0x388054[_0x55f03c(0x260)][_0x55f03c(0x1f3)][_0x55f03c(0x2c2)](this,_0x5058ed);if(_0x2fa73f!==this[_0x55f03c(0x14d)]()){const _0x558d35=_0x4770b3['_scene'];if(!_0x558d35)return;const _0x33a3b3=_0x558d35['_statusWindow'];if(_0x33a3b3)_0x33a3b3[_0x55f03c(0x26f)]();}}}return _0x2f2822;},DataManager[_0x4dbc53(0x340)]=function(_0x42dfd3){const _0x227627=_0x4dbc53;if(!_0x42dfd3)return 0x0;if(!DataManager[_0x227627(0x25f)](_0x42dfd3))return 0x0;const _0x384190=VisuMZ[_0x227627(0x260)][_0x227627(0x154)],_0x5a6472=_0x42dfd3[_0x227627(0x225)],_0xd902e2=[],_0x160605=_0x5a6472[_0x227627(0x30c)](_0x384190['LearnWeaponCost']);if(_0x160605)for(const _0x4b2ea8 of _0x160605){if(!_0x4b2ea8)continue;_0x4b2ea8[_0x227627(0x30c)](_0x384190[_0x227627(0x2ec)]);const _0x585b61=String(RegExp['$1']),_0x572f65={'id':0x0,'quantity':Number(RegExp['$2'])},_0x138850=/^\d+$/[_0x227627(0x188)](_0x585b61);_0x138850?_0x227627(0x29a)!==_0x227627(0x2e5)?_0x572f65['id']=Number(_0x585b61):(this[_0x227627(0x23f)][_0x227627(0x367)]=_0x899b0[_0x227627(0x255)](_0x227627(0x38d)),this[_0x227627(0x23f)][_0x227627(0x367)][_0x227627(0x250)]=![]):_0x572f65['id']=DataManager['getWeaponIdWithName'](_0x585b61),_0x572f65['id']>0x0&&_0xd902e2[_0x227627(0x364)](_0x572f65);}if(_0x5a6472[_0x227627(0x30c)](_0x384190[_0x227627(0x34d)])){if(_0x227627(0x3f2)===_0x227627(0x3f2)){const _0x2873c6=String(RegExp['$1'])[_0x227627(0x2c5)](/[\r\n]+/);for(const _0x5e1b4d of _0x2873c6){if(_0x5e1b4d[_0x227627(0x30c)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x4da091=String(RegExp['$1']),_0x425604={'id':0x0,'quantity':Number(RegExp['$2'])},_0x10a189=/^\d+$/[_0x227627(0x188)](_0x4da091);_0x10a189?_0x425604['id']=Number(_0x4da091):_0x425604['id']=DataManager[_0x227627(0x173)](_0x4da091),_0x425604['id']>0x0&&(_0x227627(0x3b8)!==_0x227627(0x3b8)?_0x2f5360=_0x42b11e||this[_0x227627(0x3bf)]()['id']:_0xd902e2[_0x227627(0x364)](_0x425604));}}}else{this[_0x227627(0x28e)]===_0x314672&&this['initAbilityPoints']();const _0x378d10=_0x16cfb9[_0x227627(0x260)][_0x227627(0x1c3)][_0x227627(0x31d)];_0x378d10[_0x227627(0x370)]?_0x427cc5=0x0:_0x3dc1a8=_0xc322be||this[_0x227627(0x3bf)]()['id'];this[_0x227627(0x28e)][_0x45c49e]=this[_0x227627(0x28e)][_0x339673]||0x0,this[_0x227627(0x28e)][_0x423a70]=_0x10e462[_0x227627(0x396)](_0x34cf24||0x0);const _0x9d0cc4=_0x378d10[_0x227627(0x298)]||_0x11438a[_0x227627(0x2a3)];this[_0x227627(0x28e)][_0xcee79c]=this['_abilityPoints'][_0x38e89c][_0x227627(0x1dc)](0x0,_0x9d0cc4);}}return _0xd902e2;},DataManager[_0x4dbc53(0x2aa)]=function(_0x3b9e8a){const _0x31b66f=_0x4dbc53;if(!_0x3b9e8a)return 0x0;if(!DataManager[_0x31b66f(0x25f)](_0x3b9e8a))return 0x0;const _0x98a854=VisuMZ[_0x31b66f(0x260)][_0x31b66f(0x154)],_0x592c25=_0x3b9e8a[_0x31b66f(0x225)],_0x63a63f=[],_0xa870a5=_0x592c25[_0x31b66f(0x30c)](_0x98a854[_0x31b66f(0x346)]);if(_0xa870a5){if('zHtHd'===_0x31b66f(0x23d)){const _0x1edb25=_0x1726a8[_0x2c4176],_0x2308db=_0x54ea98[_0x31b66f(0x260)][_0x31b66f(0x1be)](_0x1edb25,_0x31b66f(0x202));_0x3aeff0[_0x31b66f(0x260)]['JS'][_0x2308db]&&_0xbf624['SkillLearnSystem']['JS'][_0x2308db][_0x31b66f(0x2c2)](this,this,_0x1edb25);}else for(const _0x443778 of _0xa870a5){if(_0x31b66f(0x274)!==_0x31b66f(0x274)){const _0x4e10ec=_0x2b4d86(_0x31bd57['$1'])[_0x31b66f(0x2c5)](/[\r\n]+/);for(const _0x1f9983 of _0x4e10ec){if(_0x1f9983[_0x31b66f(0x30c)](/GOLD:[ ](\d+)/gi))return _0x4368df(_0x19c369['$1']);}}else{if(!_0x443778)continue;_0x443778[_0x31b66f(0x30c)](_0x98a854[_0x31b66f(0x346)]);const _0x19b9a0=String(RegExp['$1']),_0x26a8b0={'id':0x0,'quantity':Number(RegExp['$2'])},_0x202403=/^\d+$/[_0x31b66f(0x188)](_0x19b9a0);_0x202403?_0x26a8b0['id']=Number(_0x19b9a0):_0x26a8b0['id']=DataManager['getArmorIdWithName'](_0x19b9a0),_0x26a8b0['id']>0x0&&_0x63a63f[_0x31b66f(0x364)](_0x26a8b0);}}}if(_0x592c25['match'](_0x98a854[_0x31b66f(0x34d)])){if(_0x31b66f(0x38a)===_0x31b66f(0x38a)){const _0x2fc419=String(RegExp['$1'])[_0x31b66f(0x2c5)](/[\r\n]+/);for(const _0x741955 of _0x2fc419){if(_0x31b66f(0x278)===_0x31b66f(0x278)){if(_0x741955['match'](/ARMOR[ ](.*):[ ](\d+)/gi)){if(_0x31b66f(0x34f)!=='UXqhq')return _0x27054c(_0x3dbe02['$1']);else{const _0x107dec=String(RegExp['$1']),_0xfd679b={'id':0x0,'quantity':Number(RegExp['$2'])},_0x458419=/^\d+$/[_0x31b66f(0x188)](_0x107dec);if(_0x458419)_0xfd679b['id']=Number(_0x107dec);else{if('vphjA'==='OYThP'){const _0x1f1f65=_0x13a780(_0x5041c7['$1']);this[_0x31b66f(0x379)]()['gainAbilityPoints'](_0x1f1f65);}else _0xfd679b['id']=DataManager['getArmorIdWithName'](_0x107dec);}_0xfd679b['id']>0x0&&(_0x31b66f(0x185)!==_0x31b66f(0x185)?this[_0x31b66f(0x165)](...arguments):_0x63a63f[_0x31b66f(0x364)](_0xfd679b));}}}else _0x233b33['id']=_0xae5e6d(_0x5b7626);}}else{if(this[_0x31b66f(0x34b)])return;const _0x2402e7=_0x38bda3[_0x31b66f(0x260)][_0x31b66f(0x1c3)][_0x31b66f(0x31d)];let _0x20885e=0x0;try{_0x20885e=_0x258619(_0x2402e7['PerLevelUp']);}catch(_0x38f2bd){if(_0x4d478c[_0x31b66f(0x329)]())_0x7bec5f[_0x31b66f(0x3d9)](_0x38f2bd);}this[_0x31b66f(0x343)](_0x20885e,_0x59d110);}}return _0x63a63f;},DataManager[_0x4dbc53(0x385)]=function(_0x5e6f63){const _0x492edb=_0x4dbc53;if(!_0x5e6f63)return 0x0;if(!DataManager[_0x492edb(0x25f)](_0x5e6f63))return 0x0;const _0x1bb161=VisuMZ['SkillLearnSystem']['RegExp'],_0x461101=_0x5e6f63[_0x492edb(0x225)];if(_0x461101[_0x492edb(0x30c)](_0x1bb161[_0x492edb(0x1cb)]))return Number(RegExp['$1']);if(_0x461101[_0x492edb(0x30c)](_0x1bb161[_0x492edb(0x34d)])){const _0x5ea203=String(RegExp['$1'])[_0x492edb(0x2c5)](/[\r\n]+/);for(const _0x363430 of _0x5ea203){if(_0x363430[_0x492edb(0x30c)](/GOLD:[ ](\d+)/gi))return Number(RegExp['$1']);}}return 0x0;},TextManager[_0x4dbc53(0x20b)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3a4)][_0x4dbc53(0x1e5)],ImageManager[_0x4dbc53(0x268)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x31d)][_0x4dbc53(0x1e5)],ImageManager['skillPointsIcon']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x377)][_0x4dbc53(0x1e5)],SoundManager[_0x4dbc53(0x3e7)]=function(){const _0x3a1083=_0x4dbc53;AudioManager['playStaticSe'](VisuMZ['SkillLearnSystem'][_0x3a1083(0x1c3)]['Sound']);},TextManager[_0x4dbc53(0x1ab)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x27c)][_0x4dbc53(0x168)],TextManager[_0x4dbc53(0x2bd)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)][_0x4dbc53(0x285)],TextManager[_0x4dbc53(0x3b9)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)][_0x4dbc53(0x1af)],TextManager[_0x4dbc53(0x3a3)]=VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1c3)]['General']['ReqLevelFmt'],TextManager['skillLearnReqSkillFmt']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)]['General'][_0x4dbc53(0x39c)],TextManager[_0x4dbc53(0x2cb)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)][_0x4dbc53(0x382)],TextManager['skillLearnSeparationFmt']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)]['SeparationFmt'],TextManager[_0x4dbc53(0x2ef)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x27c)][_0x4dbc53(0x1d0)],TextManager[_0x4dbc53(0x242)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)]['WeaponFmt'],TextManager[_0x4dbc53(0x1f4)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)]['ArmorFmt'],TextManager['skillLearnGoldFmt']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x27c)]['GoldFmt'],TextManager[_0x4dbc53(0x2fd)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x3a4)][_0x4dbc53(0x1e0)],TextManager[_0x4dbc53(0x1dd)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)][_0x4dbc53(0x22f)],TextManager[_0x4dbc53(0x337)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)][_0x4dbc53(0x1b6)],TextManager[_0x4dbc53(0x38f)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)][_0x4dbc53(0x397)],TextManager[_0x4dbc53(0x229)]=VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)]['ReqLevelFmt'],TextManager[_0x4dbc53(0x27f)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)]['ReqSkillFmt'],TextManager['skillLearnReqListSwitch']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)]['Window'][_0x4dbc53(0x382)],TextManager[_0x4dbc53(0x2b5)]=VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1c3)]['Window'][_0x4dbc53(0x351)],TextManager[_0x4dbc53(0x32a)]=VisuMZ['SkillLearnSystem']['Settings']['Window'][_0x4dbc53(0x25c)],TextManager[_0x4dbc53(0x2b3)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x3fa)][_0x4dbc53(0x322)],TextManager['skillLearningOwned']=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)]['Window']['IngredientOwned'],TextManager[_0x4dbc53(0x3ae)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x3fa)]['ConfirmCmd'],TextManager[_0x4dbc53(0x2e1)]=VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1c3)]['Window']['CancelCmd'],TextManager[_0x4dbc53(0x363)]=VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1c3)][_0x4dbc53(0x31d)]['FullText'],TextManager[_0x4dbc53(0x15e)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x31d)][_0x4dbc53(0x1d7)],TextManager[_0x4dbc53(0x1df)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x31d)][_0x4dbc53(0x2a1)],TextManager[_0x4dbc53(0x393)]=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x377)][_0x4dbc53(0x3d7)],TextManager['skillPointsAbbr']=VisuMZ[_0x4dbc53(0x260)]['Settings'][_0x4dbc53(0x377)]['AbbrText'],TextManager[_0x4dbc53(0x176)]=VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x1c3)][_0x4dbc53(0x377)][_0x4dbc53(0x2a1)],VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1e4)]=BattleManager[_0x4dbc53(0x1f1)],BattleManager[_0x4dbc53(0x1f1)]=function(){const _0x1c3c73=_0x4dbc53;VisuMZ[_0x1c3c73(0x260)][_0x1c3c73(0x1e4)][_0x1c3c73(0x2c2)](this),this[_0x1c3c73(0x162)](),this[_0x1c3c73(0x2db)](),this[_0x1c3c73(0x349)](),this[_0x1c3c73(0x299)]();},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x26e)]=BattleManager[_0x4dbc53(0x19b)],BattleManager[_0x4dbc53(0x19b)]=function(){const _0x576f7e=_0x4dbc53;VisuMZ[_0x576f7e(0x260)][_0x576f7e(0x26e)][_0x576f7e(0x2c2)](this),this[_0x576f7e(0x17c)](),this['displayRewardsSkillPoints']();},BattleManager['makeRewardsAbilityPoints']=function(){const _0x5cf303=_0x4dbc53;this[_0x5cf303(0x1ef)]['abilityPoints']=$gameTroop[_0x5cf303(0x187)]();},BattleManager[_0x4dbc53(0x17c)]=function(){const _0x52ce08=_0x4dbc53;if(!this[_0x52ce08(0x2a5)]())return;$gameMessage[_0x52ce08(0x3b4)]();const _0xbe7691=$gameParty[_0x52ce08(0x27a)](),_0x30ad41=VisuMZ['SkillLearnSystem']['Settings'][_0x52ce08(0x31d)],_0x2ff08c=_0x30ad41[_0x52ce08(0x3f4)];for(const _0x5c6494 of _0xbe7691){if(!_0x5c6494)continue;const _0x515834=_0x2ff08c[_0x52ce08(0x300)](_0x5c6494[_0x52ce08(0x267)](),_0x5c6494[_0x52ce08(0x34c)](),TextManager[_0x52ce08(0x15e)],TextManager[_0x52ce08(0x1df)]);$gameMessage[_0x52ce08(0x342)]('\x5c.'+_0x515834);}},BattleManager['gainRewardsAbilityPoints']=function(){const _0x2c89b2=_0x4dbc53;this[_0x2c89b2(0x1ef)][_0x2c89b2(0x21f)]=this['_rewards'][_0x2c89b2(0x21f)]||0x0;let _0x4918fd=$gameParty[_0x2c89b2(0x177)]();VisuMZ['SkillLearnSystem'][_0x2c89b2(0x1c3)]['AbilityPoints'][_0x2c89b2(0x3ee)]&&(_0x2c89b2(0x1a4)!==_0x2c89b2(0x1a4)?_0x35aff5['id']=_0x2769ad['getWeaponIdWithName'](_0x44415c):_0x4918fd=_0x4918fd['filter'](_0x276417=>_0x276417[_0x2c89b2(0x27b)]()));for(const _0x1d8940 of _0x4918fd){if(!_0x1d8940)continue;if(!$dataSystem[_0x2c89b2(0x31e)]&&!_0x1d8940[_0x2c89b2(0x311)]())continue;_0x1d8940['gainAbilityPoints'](this[_0x2c89b2(0x1ef)]['abilityPoints']),_0x1d8940['gainAbilityPointsForMulticlasses'](this[_0x2c89b2(0x1ef)][_0x2c89b2(0x21f)]);}},BattleManager[_0x4dbc53(0x2a5)]=function(){const _0x5b4309=_0x4dbc53;return VisuMZ[_0x5b4309(0x260)][_0x5b4309(0x1c3)][_0x5b4309(0x31d)]['ShowVictory'];},BattleManager[_0x4dbc53(0x349)]=function(){const _0x408ca2=_0x4dbc53;this[_0x408ca2(0x1ef)][_0x408ca2(0x3c5)]=$gameTroop[_0x408ca2(0x297)]();},BattleManager['displayRewardsSkillPoints']=function(){const _0x2f2d3b=_0x4dbc53;if(!this[_0x2f2d3b(0x1b7)]())return;$gameMessage['newPage']();const _0x259c78=$gameParty[_0x2f2d3b(0x27a)](),_0x2ce8cb=VisuMZ[_0x2f2d3b(0x260)]['Settings'][_0x2f2d3b(0x377)],_0x3f3669=_0x2ce8cb[_0x2f2d3b(0x3f4)];for(const _0x21e74f of _0x259c78){if(_0x2f2d3b(0x1aa)===_0x2f2d3b(0x29c))_0x5c631f=_0x3beaab['skillLearnReqSwitchFmt'][_0x2f2d3b(0x300)](_0x550fa1[_0x2f2d3b(0x156)][_0x1d96ba]||''),_0x3e96f3[_0x2f2d3b(0x1a1)]>0x0&&(_0x107fbb!==''?_0x5ea95f=_0x53b7f0[_0x2f2d3b(0x300)](_0x2d576a,_0x44fb25):_0x4e37ad=_0x217b45);else{if(!_0x21e74f)continue;const _0x4734ef=_0x3f3669[_0x2f2d3b(0x300)](_0x21e74f[_0x2f2d3b(0x267)](),_0x21e74f['earnedSkillPoints'](),TextManager[_0x2f2d3b(0x2d9)],TextManager[_0x2f2d3b(0x176)]);$gameMessage[_0x2f2d3b(0x342)]('\x5c.'+_0x4734ef);}}},BattleManager['gainRewardsSkillPoints']=function(){const _0x35556f=_0x4dbc53;this['_rewards'][_0x35556f(0x3c5)]=this[_0x35556f(0x1ef)]['skillPoints']||0x0;let _0x365035=$gameParty[_0x35556f(0x177)]();VisuMZ[_0x35556f(0x260)][_0x35556f(0x1c3)][_0x35556f(0x377)][_0x35556f(0x3ee)]&&(_0x365035=_0x365035['filter'](_0x231286=>_0x231286[_0x35556f(0x27b)]()));for(const _0x50311e of _0x365035){if(_0x35556f(0x372)!=='Ezxgm')_0x52bb8d['id']=_0x17658e(_0x56e289);else{if(!_0x50311e)continue;if(!$dataSystem['optExtraExp']&&!_0x50311e[_0x35556f(0x311)]())continue;_0x50311e['gainSkillPoints'](this[_0x35556f(0x1ef)][_0x35556f(0x3c5)]),_0x50311e[_0x35556f(0x3a2)](this[_0x35556f(0x1ef)][_0x35556f(0x3c5)]);}}},BattleManager[_0x4dbc53(0x1b7)]=function(){const _0x33c3aa=_0x4dbc53;return VisuMZ['SkillLearnSystem']['Settings']['SkillPoints'][_0x33c3aa(0x2bf)];},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x214)]=Game_System['prototype'][_0x4dbc53(0x165)],Game_System[_0x4dbc53(0x233)][_0x4dbc53(0x165)]=function(){const _0x1a460f=_0x4dbc53;VisuMZ[_0x1a460f(0x260)][_0x1a460f(0x214)][_0x1a460f(0x2c2)](this),this[_0x1a460f(0x28a)]();},Game_System[_0x4dbc53(0x233)][_0x4dbc53(0x28a)]=function(){const _0x399e39=_0x4dbc53;this[_0x399e39(0x1f7)]=VisuMZ[_0x399e39(0x260)]['Settings'][_0x399e39(0x3a4)]['ShowMenu'];},Game_System['prototype'][_0x4dbc53(0x32c)]=function(){const _0x3ea08d=_0x4dbc53;return this['_SkillLearnSystem_MenuAccess']===undefined&&(_0x3ea08d(0x31f)!==_0x3ea08d(0x31f)?this[_0x3ea08d(0x288)]():this[_0x3ea08d(0x28a)]()),this[_0x3ea08d(0x1f7)];},Game_System[_0x4dbc53(0x233)][_0x4dbc53(0x2ee)]=function(_0x152a81){const _0x2f3963=_0x4dbc53;this['_SkillLearnSystem_MenuAccess']===undefined&&(_0x2f3963(0x195)===_0x2f3963(0x376)?_0x55f16c=_0x1cff66:this[_0x2f3963(0x28a)]()),this[_0x2f3963(0x1f7)]=_0x152a81;},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x33a)]=Game_Action[_0x4dbc53(0x233)]['applyItemUserEffect'],Game_Action['prototype']['applyItemUserEffect']=function(_0x5cd444){const _0xf017bd=_0x4dbc53;VisuMZ['SkillLearnSystem'][_0xf017bd(0x33a)][_0xf017bd(0x2c2)](this,_0x5cd444),this[_0xf017bd(0x1b1)](_0x5cd444);},Game_Action[_0x4dbc53(0x233)][_0x4dbc53(0x1b1)]=function(_0x45b0e2){const _0xb3e35a=_0x4dbc53;if(this[_0xb3e35a(0x23c)]())this[_0xb3e35a(0x307)](_0x45b0e2);},Game_Action['prototype'][_0x4dbc53(0x307)]=function(_0x4bcf5f){const _0x2f02ba=_0x4dbc53,_0x482b37=VisuMZ[_0x2f02ba(0x260)][_0x2f02ba(0x154)],_0x1bd2bf=this[_0x2f02ba(0x23c)]()[_0x2f02ba(0x225)];if($gameParty[_0x2f02ba(0x332)]()){if(this[_0x2f02ba(0x379)]()['isActor']()&&_0x1bd2bf['match'](_0x482b37[_0x2f02ba(0x265)])){if(_0x2f02ba(0x368)===_0x2f02ba(0x368)){const _0x42d802=eval(RegExp['$1']);this[_0x2f02ba(0x379)]()['gainAbilityPoints'](_0x42d802);}else{const _0x263a9d=_0x13b666[_0x2f02ba(0x156)][_0x4274aa],_0x1cf143=_0x599799['value'](_0x22e8e7)?_0x5721c2:_0x52c3ac;_0x517dbe+=_0x1cf143['format'](_0x263a9d)+'\x0a';}}else this[_0x2f02ba(0x323)]();if(_0x4bcf5f[_0x2f02ba(0x327)]()&&_0x1bd2bf[_0x2f02ba(0x30c)](_0x482b37[_0x2f02ba(0x3fb)])){if('NyKAx'===_0x2f02ba(0x210)){const _0x59ee57=eval(RegExp['$1']);_0x4bcf5f['gainAbilityPoints'](_0x59ee57);}else{const _0x5914fa=_0x4cba35(_0x4f353e['$1']);_0x5914fa!==_0x7e292b[_0x5f54b6]['version']&&(_0x44cf7d(_0x2f02ba(0x317)[_0x2f02ba(0x300)](_0x3dfa54,_0x5914fa)),_0x1c3eec[_0x2f02ba(0x1e8)]());}}}if($gameParty[_0x2f02ba(0x332)]()){if('lhUNl'==='lhUNl'){if(this[_0x2f02ba(0x379)]()[_0x2f02ba(0x327)]()&&_0x1bd2bf[_0x2f02ba(0x30c)](_0x482b37[_0x2f02ba(0x22a)])){if(_0x2f02ba(0x294)===_0x2f02ba(0x294)){const _0xb9eb24=eval(RegExp['$1']);this[_0x2f02ba(0x379)]()[_0x2f02ba(0x25b)](_0xb9eb24);}else{const _0xf9af5c=_0x25ad1e[_0x2f02ba(0x183)](_0x2e1073);this['drawSkillPoints'](_0xf9af5c,_0x34f23d,_0x2cedfa,_0x3ad15e,_0x5266c0);}}else{if(_0x2f02ba(0x308)===_0x2f02ba(0x2fa))return _0x10de07[_0x2f02ba(0x260)]['JS'][_0x1c96ea][_0x2f02ba(0x2c2)](this,this[_0x2f02ba(0x34a)],_0x34ba6f);else this[_0x2f02ba(0x381)]();}if(_0x4bcf5f[_0x2f02ba(0x327)]()&&_0x1bd2bf[_0x2f02ba(0x30c)](_0x482b37['TargetGainSkillPoints'])){const _0x484a5a=eval(RegExp['$1']);_0x4bcf5f[_0x2f02ba(0x25b)](_0x484a5a);}}else _0x3bf516=_0x26ad93[_0x2f02ba(0x260)]['JS'][_0x391071][_0x2f02ba(0x2c2)](this,_0x2313a1,_0x23ab23),this[_0x2f02ba(0x206)](_0x5ed85a,_0xa88a1c,_0x60fdce);}if(_0x1bd2bf[_0x2f02ba(0x30c)](/<NOTETAG>/i)){}},Game_Action[_0x4dbc53(0x233)][_0x4dbc53(0x323)]=function(){const _0x485210=_0x4dbc53;if(!$gameParty[_0x485210(0x332)]())return;if(!this[_0x485210(0x379)]()[_0x485210(0x327)]())return;const _0x51ff54=VisuMZ[_0x485210(0x260)]['Settings'][_0x485210(0x31d)];let _0x51228f=0x0;try{_0x51228f=eval(_0x51ff54[_0x485210(0x283)]);}catch(_0x235241){if(_0x485210(0x312)===_0x485210(0x312)){if($gameTemp[_0x485210(0x329)]())console[_0x485210(0x3d9)](_0x235241);}else _0x3d577f[_0x485210(0x238)](_0x33da0d,_0x292a60);}this[_0x485210(0x379)]()['gainAbilityPoints'](_0x51228f);},Game_Action[_0x4dbc53(0x233)]['applySkillPoints']=function(){const _0x41d65f=_0x4dbc53;if(!$gameParty[_0x41d65f(0x332)]())return;if(!this[_0x41d65f(0x379)]()['isActor']())return;const _0x35205c=VisuMZ[_0x41d65f(0x260)]['Settings']['SkillPoints'];let _0x2caef0=0x0;try{_0x2caef0=eval(_0x35205c[_0x41d65f(0x283)]);}catch(_0x1aaf90){if($gameTemp[_0x41d65f(0x329)]())console[_0x41d65f(0x3d9)](_0x1aaf90);}this[_0x41d65f(0x379)]()['gainSkillPoints'](_0x2caef0);},VisuMZ['SkillLearnSystem']['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x4dbc53(0x222)],Game_Battler[_0x4dbc53(0x233)][_0x4dbc53(0x222)]=function(_0x3c0d3a){const _0x11a940=_0x4dbc53;VisuMZ['SkillLearnSystem'][_0x11a940(0x36e)]['call'](this,_0x3c0d3a),this[_0x11a940(0x327)]()&&(this[_0x11a940(0x360)]=this[_0x11a940(0x30e)](),this['_earnedSkillPoints']=this[_0x11a940(0x183)]());},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x334)]=Game_Actor['prototype'][_0x4dbc53(0x36c)],Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x36c)]=function(_0x50a0cc){const _0x344c9e=_0x4dbc53;VisuMZ[_0x344c9e(0x260)][_0x344c9e(0x334)][_0x344c9e(0x2c2)](this,_0x50a0cc),this[_0x344c9e(0x28f)](),this[_0x344c9e(0x3ca)](),this[_0x344c9e(0x220)](),this[_0x344c9e(0x306)]();},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x37e)]=Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x164)],Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x164)]=function(_0x345284,_0x352f1f){const _0x45a414=_0x4dbc53;this[_0x45a414(0x34b)]=!![],VisuMZ[_0x45a414(0x260)][_0x45a414(0x37e)][_0x45a414(0x2c2)](this,_0x345284,_0x352f1f),this[_0x45a414(0x34b)]=undefined;},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x3cc)]=Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x1bd)],Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x1bd)]=function(){const _0x97ecfd=_0x4dbc53;VisuMZ[_0x97ecfd(0x260)][_0x97ecfd(0x3cc)][_0x97ecfd(0x2c2)](this),this['levelUpGainAbilityPoints'](this[_0x97ecfd(0x3bf)]()['id']),this[_0x97ecfd(0x149)](this[_0x97ecfd(0x3bf)]()['id']);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x28f)]=function(){const _0x1239b8=_0x4dbc53;this[_0x1239b8(0x28e)]={};},Game_Actor['prototype'][_0x4dbc53(0x3ca)]=function(){const _0x5a6332=_0x4dbc53,_0x5ded4b=VisuMZ['SkillLearnSystem'][_0x5a6332(0x154)],_0x103bb4=this[_0x5a6332(0x3c9)]()[_0x5a6332(0x225)];if(_0x103bb4[_0x5a6332(0x30c)](_0x5ded4b[_0x5a6332(0x29d)])){const _0x4d835a=eval(RegExp['$1']);this[_0x5a6332(0x343)](_0x4d835a);}const _0x4d203f=VisuMZ[_0x5a6332(0x260)]['Settings'][_0x5a6332(0x31d)];if(!_0x4d203f[_0x5a6332(0x370)])return;const _0x16a50c=_0x103bb4['match'](_0x5ded4b[_0x5a6332(0x264)]);if(_0x16a50c)for(const _0x50e2f7 of _0x16a50c){if(!_0x50e2f7)continue;_0x50e2f7[_0x5a6332(0x30c)](_0x5ded4b['StartClassAbilityPoints']);const _0x1a7795=String(RegExp['$1']),_0x1578f4=eval(RegExp['$2']),_0x1c2677=/^\d+$/['test'](_0x1a7795);let _0x349264=0x0;_0x1c2677?_0x349264=Number(_0x1a7795):_0x349264=DataManager[_0x5a6332(0x215)](_0x1a7795),this[_0x5a6332(0x343)](_0x1578f4,_0x349264);}},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x30e)]=function(_0x43c3c3){const _0x14fd31=_0x4dbc53;this[_0x14fd31(0x28e)]===undefined&&this[_0x14fd31(0x28f)]();const _0x3683e5=VisuMZ[_0x14fd31(0x260)][_0x14fd31(0x1c3)][_0x14fd31(0x31d)];return _0x3683e5[_0x14fd31(0x370)]?_0x14fd31(0x2b1)!==_0x14fd31(0x1bb)?_0x43c3c3=0x0:_0x5828da[_0x14fd31(0x364)](_0x47030f(_0x4076a5)):_0x14fd31(0x399)===_0x14fd31(0x231)?_0x4590a2=_0x34906a||this[_0x14fd31(0x3bf)]()['id']:_0x43c3c3=_0x43c3c3||this[_0x14fd31(0x3bf)]()['id'],this[_0x14fd31(0x28e)][_0x43c3c3]=this[_0x14fd31(0x28e)][_0x43c3c3]||0x0,Math[_0x14fd31(0x396)](this['_abilityPoints'][_0x43c3c3]);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x3e2)]=function(_0x1d878e,_0x1c194f){const _0x429b9d=_0x4dbc53;this[_0x429b9d(0x28e)]===undefined&&this[_0x429b9d(0x28f)]();const _0x5de55f=VisuMZ[_0x429b9d(0x260)][_0x429b9d(0x1c3)][_0x429b9d(0x31d)];_0x5de55f[_0x429b9d(0x370)]?_0x1c194f=0x0:_0x1c194f=_0x1c194f||this[_0x429b9d(0x3bf)]()['id'];this[_0x429b9d(0x28e)][_0x1c194f]=this[_0x429b9d(0x28e)][_0x1c194f]||0x0,this['_abilityPoints'][_0x1c194f]=Math['round'](_0x1d878e||0x0);const _0x3600c8=_0x5de55f['MaxResource']||Number['MAX_SAFE_INTEGER'];this[_0x429b9d(0x28e)][_0x1c194f]=this[_0x429b9d(0x28e)][_0x1c194f]['clamp'](0x0,_0x3600c8);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x343)]=function(_0xb287f9,_0x2161ab){const _0x206d41=_0x4dbc53;_0xb287f9>0x0&&(_0xb287f9*=this['abilityPointsRate']()),this[_0x206d41(0x336)](_0xb287f9,_0x2161ab);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x14f)]=function(_0x117c16){const _0x29a104=_0x4dbc53;if(!Imported[_0x29a104(0x32d)])return;_0x117c16>0x0&&(_0x29a104(0x261)===_0x29a104(0x2d3)?_0x49292f[_0x29a104(0x343)](_0x4cc73e,_0x506f3f):_0x117c16*=this[_0x29a104(0x2d6)]()),this[_0x29a104(0x20d)](_0x117c16,'Ability');},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x336)]=function(_0x970ee5,_0x1a4fcb){const _0x3b36fc=_0x4dbc53,_0x1f6912=VisuMZ[_0x3b36fc(0x260)]['Settings'][_0x3b36fc(0x31d)];_0x1f6912[_0x3b36fc(0x370)]?_0x1a4fcb=0x0:'HojUh'!==_0x3b36fc(0x1db)?_0x1a4fcb=_0x1a4fcb||this[_0x3b36fc(0x3bf)]()['id']:_0xc998fa=_0x547777[_0x3b36fc(0x253)](_0x5522c4),_0x970ee5+=this[_0x3b36fc(0x30e)](_0x1a4fcb),this[_0x3b36fc(0x3e2)](_0x970ee5,_0x1a4fcb);},Game_Actor['prototype'][_0x4dbc53(0x238)]=function(_0x1a7390,_0x1a2bc9){const _0x28aba1=_0x4dbc53;this[_0x28aba1(0x336)](-_0x1a7390,_0x1a2bc9);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x2d6)]=function(){const _0x29289b=_0x4dbc53;return this[_0x29289b(0x3c4)]()['reduce']((_0x5a0dd5,_0x517e81)=>{const _0x8473bd=_0x29289b;return _0x517e81&&_0x517e81[_0x8473bd(0x225)][_0x8473bd(0x30c)](VisuMZ[_0x8473bd(0x260)][_0x8473bd(0x154)][_0x8473bd(0x14e)])?_0x5a0dd5*(Number(RegExp['$1'])*0.01):_0x5a0dd5;},0x1);},Game_Actor[_0x4dbc53(0x233)]['levelUpGainAbilityPoints']=function(_0x1f0273){const _0x312cc3=_0x4dbc53;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x3c1f12=VisuMZ[_0x312cc3(0x260)][_0x312cc3(0x1c3)]['AbilityPoints'];let _0x31ed70=0x0;try{_0x31ed70=eval(_0x3c1f12['PerLevelUp']);}catch(_0xac9b68){if($gameTemp['isPlaytest']())console[_0x312cc3(0x3d9)](_0xac9b68);}this['gainAbilityPoints'](_0x31ed70,_0x1f0273);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x34c)]=function(){const _0x1e1930=_0x4dbc53;return this[_0x1e1930(0x360)]=this['_earnedAbilityPoints']||0x0,this[_0x1e1930(0x30e)]()-this['_earnedAbilityPoints'];},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x220)]=function(){this['_skillPoints']={};},Game_Actor['prototype'][_0x4dbc53(0x306)]=function(){const _0x5ba3e1=_0x4dbc53,_0x31b9f1=VisuMZ[_0x5ba3e1(0x260)][_0x5ba3e1(0x154)],_0x2cf6b4=this[_0x5ba3e1(0x3c9)]()['note'];if(_0x2cf6b4[_0x5ba3e1(0x30c)](_0x31b9f1[_0x5ba3e1(0x3bc)])){if(_0x5ba3e1(0x2c9)!==_0x5ba3e1(0x2c9))this[_0x5ba3e1(0x3db)]();else{const _0x5a869a=eval(RegExp['$1']);this[_0x5ba3e1(0x25b)](_0x5a869a);}}const _0x5d2916=VisuMZ['SkillLearnSystem'][_0x5ba3e1(0x1c3)][_0x5ba3e1(0x377)];if(!_0x5d2916[_0x5ba3e1(0x370)])return;const _0x51b8e7=_0x2cf6b4[_0x5ba3e1(0x30c)](_0x31b9f1[_0x5ba3e1(0x3f3)]);if(_0x51b8e7)for(const _0x2e0ca2 of _0x51b8e7){if(!_0x2e0ca2)continue;_0x2e0ca2[_0x5ba3e1(0x30c)](_0x31b9f1[_0x5ba3e1(0x3f3)]);const _0x58d2b7=String(RegExp['$1']),_0xbb44e1=eval(RegExp['$2']),_0x2bb416=/^\d+$/[_0x5ba3e1(0x188)](_0x58d2b7);let _0x531ac3=0x0;_0x2bb416?'rhVqG'===_0x5ba3e1(0x3d4)?this[_0x5ba3e1(0x1ef)][_0x5ba3e1(0x3c5)]=_0x3dcfe4[_0x5ba3e1(0x297)]():_0x531ac3=Number(_0x58d2b7):_0x531ac3=DataManager[_0x5ba3e1(0x215)](_0x58d2b7),this[_0x5ba3e1(0x25b)](_0xbb44e1,_0x531ac3);}},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x183)]=function(_0x5e615d){const _0x3d9fa5=_0x4dbc53;if(this[_0x3d9fa5(0x3b6)]===undefined){if('GnNiK'===_0x3d9fa5(0x163))this['initSkillPoints']();else return _0x24adce*(_0x3ce4ae(_0x4fca8b['$1'])*0.01);}const _0x3c5a98=VisuMZ[_0x3d9fa5(0x260)][_0x3d9fa5(0x1c3)][_0x3d9fa5(0x377)];return _0x3c5a98[_0x3d9fa5(0x370)]?'vnDEX'!==_0x3d9fa5(0x24f)?(_0x59be2a[_0x3d9fa5(0x260)][_0x3d9fa5(0x214)][_0x3d9fa5(0x2c2)](this),this[_0x3d9fa5(0x28a)]()):_0x5e615d=0x0:_0x5e615d=_0x5e615d||this[_0x3d9fa5(0x3bf)]()['id'],this['_skillPoints'][_0x5e615d]=this['_skillPoints'][_0x5e615d]||0x0,Math[_0x3d9fa5(0x396)](this[_0x3d9fa5(0x3b6)][_0x5e615d]);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x3dd)]=function(_0x39b579,_0x4fefb5){const _0x4c4de0=_0x4dbc53;this[_0x4c4de0(0x3b6)]===undefined&&this['initSkillPoints']();const _0xa92d91=VisuMZ['SkillLearnSystem'][_0x4c4de0(0x1c3)][_0x4c4de0(0x377)];_0xa92d91[_0x4c4de0(0x370)]?_0x4fefb5=0x0:_0x4fefb5=_0x4fefb5||this[_0x4c4de0(0x3bf)]()['id'];this[_0x4c4de0(0x3b6)][_0x4fefb5]=this[_0x4c4de0(0x3b6)][_0x4fefb5]||0x0,this['_skillPoints'][_0x4fefb5]=Math['round'](_0x39b579||0x0);const _0x4323d7=_0xa92d91[_0x4c4de0(0x298)]||Number[_0x4c4de0(0x2a3)];this[_0x4c4de0(0x3b6)][_0x4fefb5]=this[_0x4c4de0(0x3b6)][_0x4fefb5][_0x4c4de0(0x1dc)](0x0,_0x4323d7);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x25b)]=function(_0x517b5a,_0x413729){const _0x5da000=_0x4dbc53;_0x517b5a>0x0&&(_0x517b5a*=this['skillPointsRate']()),this[_0x5da000(0x32b)](_0x517b5a,_0x413729);},Game_Actor['prototype'][_0x4dbc53(0x3a2)]=function(_0x394284){const _0x4e13d7=_0x4dbc53;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x394284>0x0&&('Hlkde'!=='Hlkde'?this[_0x4e13d7(0x19c)](_0x486a99,_0x9bb802,_0x20110d,_0x3741e5):_0x394284*=this[_0x4e13d7(0x353)]()),this[_0x4e13d7(0x20d)](_0x394284,_0x4e13d7(0x1c6));},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x32b)]=function(_0x1e5a4b,_0x14264a){const _0x1806cf=_0x4dbc53,_0x4b49aa=VisuMZ['SkillLearnSystem'][_0x1806cf(0x1c3)][_0x1806cf(0x377)];if(_0x4b49aa['SharedResource']){if(_0x1806cf(0x200)===_0x1806cf(0x200))_0x14264a=0x0;else return _0x14cd32['SkillLearnSystem'][_0x1806cf(0x1c3)][_0x1806cf(0x3fa)][_0x1806cf(0x19f)]['call'](this);}else{if('AzWqx'===_0x1806cf(0x27d))try{return _0x3049ad(_0x3b8e43['$1']);}catch(_0x2ee9e7){if(_0x59bfd6['isPlaytest']())_0x5b7fa3[_0x1806cf(0x3d9)](_0x2ee9e7);return 0x0;}else _0x14264a=_0x14264a||this['currentClass']()['id'];}_0x1e5a4b+=this['getSkillPoints'](_0x14264a),this[_0x1806cf(0x3dd)](_0x1e5a4b,_0x14264a);},Game_Actor[_0x4dbc53(0x233)]['loseSkillPoints']=function(_0x2611f6,_0x5e1779){const _0x5101b9=_0x4dbc53;this[_0x5101b9(0x32b)](-_0x2611f6,_0x5e1779);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x353)]=function(){const _0x4ece85=_0x4dbc53;return this['traitObjects']()[_0x4ece85(0x279)]((_0x198e7f,_0x165859)=>{const _0x578a28=_0x4ece85;if(_0x165859&&_0x165859['note'][_0x578a28(0x30c)](VisuMZ[_0x578a28(0x260)]['RegExp'][_0x578a28(0x166)])){if(_0x578a28(0x25a)!==_0x578a28(0x25a)){let _0x489cb6='';if(_0x5d0630[_0x578a28(0x152)](_0x2f6a9a))_0x489cb6=_0x578a28(0x3ec)[_0x578a28(0x300)](_0x5ef18f['id'],_0x1a9e03);if(_0x2593b2['includes'](_0x6a097c))_0x489cb6='Class-%1-%2'[_0x578a28(0x300)](_0x21b1ca['id'],_0x3d8b4f);if(_0x31d67f[_0x578a28(0x152)](_0x27c03c))_0x489cb6=_0x578a28(0x37d)[_0x578a28(0x300)](_0x3f5288['id'],_0x12e5e8);if(_0x51d094['includes'](_0x3f85a6))_0x489cb6='Item-%1-%2'['format'](_0x2e0e2c['id'],_0x353d79);if(_0x37c2ce[_0x578a28(0x152)](_0x31f902))_0x489cb6=_0x578a28(0x2ff)['format'](_0x2b3e44['id'],_0x4528dc);if(_0xa5e492[_0x578a28(0x152)](_0x3fbab9))_0x489cb6=_0x578a28(0x1f0)[_0x578a28(0x300)](_0x461e97['id'],_0x25c10b);if(_0x9aa7c3[_0x578a28(0x152)](_0x50ce7e))_0x489cb6=_0x578a28(0x157)[_0x578a28(0x300)](_0x37bf64['id'],_0x31ef38);if(_0x13c84d['includes'](_0x488114))_0x489cb6='State-%1-%2'[_0x578a28(0x300)](_0x5e462d['id'],_0x563852);return _0x489cb6;}else return _0x198e7f*(Number(RegExp['$1'])*0.01);}else return _0x198e7f;},0x1);},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x149)]=function(_0x95caed){const _0x3a8f73=_0x4dbc53;if(this[_0x3a8f73(0x34b)])return;const _0xf49be5=VisuMZ[_0x3a8f73(0x260)][_0x3a8f73(0x1c3)][_0x3a8f73(0x377)];let _0x329ebf=0x0;try{_0x329ebf=eval(_0xf49be5[_0x3a8f73(0x36d)]);}catch(_0xec4dc0){if($gameTemp[_0x3a8f73(0x329)]())console[_0x3a8f73(0x3d9)](_0xec4dc0);}this[_0x3a8f73(0x25b)](_0x329ebf,_0x95caed);},Game_Actor['prototype'][_0x4dbc53(0x339)]=function(){const _0x159792=_0x4dbc53;return this[_0x159792(0x2b9)]=this[_0x159792(0x2b9)]||0x0,this[_0x159792(0x183)]()-this[_0x159792(0x2b9)];},Game_Actor['prototype'][_0x4dbc53(0x1da)]=function(_0x2db513){const _0x5f12e0=_0x4dbc53;if(!_0x2db513)return![];const _0x110642=VisuMZ[_0x5f12e0(0x260)][_0x5f12e0(0x1be)](_0x2db513,_0x5f12e0(0x1e3));if(VisuMZ['SkillLearnSystem']['JS'][_0x110642]){if(!VisuMZ[_0x5f12e0(0x260)]['JS'][_0x110642][_0x5f12e0(0x2c2)](this,this,_0x2db513))return![];}const _0x5fd8a7=VisuMZ[_0x5f12e0(0x260)][_0x5f12e0(0x154)],_0x4163aa=_0x2db513['note'];if(_0x4163aa[_0x5f12e0(0x30c)](_0x5fd8a7['LearnReqLevel'])){const _0x2f4212=Number(RegExp['$1']);if(_0x2f4212>this['level'])return![];}if(_0x4163aa[_0x5f12e0(0x30c)](_0x5fd8a7[_0x5f12e0(0x155)])){const _0x43a8a9=String(RegExp['$1'])[_0x5f12e0(0x2c5)](',')[_0x5f12e0(0x2e4)](_0xe0b8e=>_0xe0b8e['trim']());for(const _0x118aba of _0x43a8a9){let _0x4001a5=0x0;const _0x5c7ad8=/^\d+$/[_0x5f12e0(0x188)](_0x118aba);if(_0x5c7ad8)_0x4001a5=Number(_0x118aba);else{if(_0x5f12e0(0x2ab)!==_0x5f12e0(0x2ab)){const _0x5d40d1=_0x263b01[_0x5f12e0(0x156)][_0x136123],_0x5ec235=_0x30dba5[_0x5f12e0(0x26d)](_0xc075bd)?_0x51f7eb:_0x25a28e;_0x5c970b+=_0x5ec235[_0x5f12e0(0x300)](_0x5d40d1)+'\x0a';}else _0x4001a5=DataManager[_0x5f12e0(0x253)](_0x118aba);}if(!this[_0x5f12e0(0x3a8)](_0x4001a5))return![];}}if(_0x4163aa['match'](_0x5fd8a7[_0x5f12e0(0x273)])){const _0x3331d=String(RegExp['$1'])[_0x5f12e0(0x2c5)](',')[_0x5f12e0(0x2e4)](_0x571972=>_0x571972[_0x5f12e0(0x2ad)]());let _0x3e218c=![];for(const _0x49f701 of _0x3331d){let _0x2155d4=0x0;const _0x319eef=/^\d+$/[_0x5f12e0(0x188)](_0x49f701);_0x319eef?_0x5f12e0(0x305)!==_0x5f12e0(0x305)?_0x4bb7d1['SkillLearnSystem']['Scene_Skill_onItemOk'][_0x5f12e0(0x2c2)](this):_0x2155d4=Number(_0x49f701):_0x2155d4=DataManager[_0x5f12e0(0x253)](_0x49f701);if($dataSkills[_0x2155d4])console[_0x5f12e0(0x3d9)]($dataSkills[_0x2155d4][_0x5f12e0(0x267)],this['isLearnedSkill'](_0x2155d4));if(this['isLearnedSkill'](_0x2155d4)){_0x3e218c=!![];break;}}if(!_0x3e218c)return![];}if(_0x4163aa[_0x5f12e0(0x30c)](_0x5fd8a7[_0x5f12e0(0x3ba)])){if(_0x5f12e0(0x18a)===_0x5f12e0(0x18a)){const _0x43a801=String(RegExp['$1'])['split'](',')[_0x5f12e0(0x2e4)](_0x33e158=>Number(_0x33e158));for(const _0x27c0c1 of _0x43a801){if(!$gameSwitches['value'](_0x27c0c1))return![];}}else{const _0x9a4e9b=_0x54077e(_0x49bdf6['$1']),_0x3ebf97=_0x5f12e0(0x2cd)[_0x5f12e0(0x300)](_0x9a4e9b),_0x5d174f=_0x5e2a9d[_0x5f12e0(0x260)][_0x5f12e0(0x1be)](_0x49a4ed,_0xb107df);_0x402294[_0x5f12e0(0x260)]['JS'][_0x5d174f]=new _0x2cc8f3(_0x3ebf97);}}if(_0x4163aa[_0x5f12e0(0x30c)](_0x5fd8a7[_0x5f12e0(0x2a8)])){const _0x5db4ed=String(RegExp['$1'])[_0x5f12e0(0x2c5)](',')[_0x5f12e0(0x2e4)](_0x281218=>Number(_0x281218));let _0x20333e=![];for(const _0x1fb642 of _0x5db4ed){if($gameSwitches['value'](_0x1fb642)){_0x20333e=!![];break;}}if(!_0x20333e)return![];}return!![];},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x1a5)]=function(_0x4045a8){const _0x21d6a6=_0x4dbc53;if(!_0x4045a8)return![];const _0x1a67b7=DataManager[_0x21d6a6(0x2b6)](_0x4045a8);if(_0x1a67b7>this[_0x21d6a6(0x30e)]())return![];const _0x5a39c9=DataManager['getSkillLearnSkillPointCost'](_0x4045a8);if(_0x5a39c9>this[_0x21d6a6(0x183)]())return![];const _0x24cd8e=DataManager[_0x21d6a6(0x385)](_0x4045a8);if(_0x24cd8e>$gameParty['gold']())return![];if(Imported[_0x21d6a6(0x32d)]){const _0x49b23e=DataManager[_0x21d6a6(0x182)](_0x4045a8);if(_0x49b23e>this[_0x21d6a6(0x2ea)]())return![];const _0x26f59b=DataManager[_0x21d6a6(0x24d)](_0x4045a8);if(_0x26f59b>this[_0x21d6a6(0x3f1)]())return![];}const _0x119f40=DataManager[_0x21d6a6(0x2be)](_0x4045a8);for(const _0x3dc80b of _0x119f40){if('DtUsx'!=='VlZhO'){if(!_0x3dc80b)continue;const _0x315701=$dataItems[_0x3dc80b['id']];if(_0x315701&&_0x3dc80b['quantity']>$gameParty['numItems'](_0x315701))return![];}else this[_0x21d6a6(0x240)][_0x21d6a6(0x28b)](),this['_itemWindow'][_0x21d6a6(0x1c4)](),this[_0x21d6a6(0x2c8)][_0x21d6a6(0x341)](),this[_0x21d6a6(0x2ed)][_0x21d6a6(0x341)]();}const _0x238a56=DataManager[_0x21d6a6(0x340)](_0x4045a8);for(const _0x5b0de5 of _0x238a56){if(!_0x5b0de5)continue;const _0x2d885b=$dataWeapons[_0x5b0de5['id']];if(_0x2d885b&&_0x5b0de5['quantity']>$gameParty['numItems'](_0x2d885b))return![];}const _0x54dde=DataManager['getSkillLearnArmorCost'](_0x4045a8);for(const _0x41f5d1 of _0x54dde){if(!_0x41f5d1)continue;const _0xd83d4d=$dataArmors[_0x41f5d1['id']];if(_0xd83d4d&&_0x41f5d1['quantity']>$gameParty[_0x21d6a6(0x3b2)](_0xd83d4d))return![];}return!![];},Game_Actor[_0x4dbc53(0x233)][_0x4dbc53(0x1b8)]=function(_0x132a96){const _0x4e7cbd=_0x4dbc53;if(!_0x132a96)return;const _0x26184e=DataManager['getSkillLearnAbilityPointCost'](_0x132a96);this['loseAbilityPoints'](_0x26184e);const _0x78b49d=DataManager[_0x4e7cbd(0x345)](_0x132a96);this['loseSkillPoints'](_0x78b49d);const _0x4becb7=DataManager[_0x4e7cbd(0x385)](_0x132a96);$gameParty['loseGold'](_0x4becb7);if(Imported[_0x4e7cbd(0x32d)]){const _0x3289f5=DataManager[_0x4e7cbd(0x182)](_0x132a96);this[_0x4e7cbd(0x2f2)](_0x3289f5);const _0x1cb204=DataManager[_0x4e7cbd(0x24d)](_0x132a96);this['loseJobPoints'](_0x1cb204);}const _0x3d0bf2=DataManager['getSkillLearnItemCost'](_0x132a96);for(const _0xc2edbe of _0x3d0bf2){if(_0x4e7cbd(0x252)===_0x4e7cbd(0x252)){if(!_0xc2edbe)continue;const _0x1806ba=$dataItems[_0xc2edbe['id']],_0x17c1af=_0xc2edbe['quantity'];$gameParty[_0x4e7cbd(0x1bf)](_0x1806ba,_0x17c1af);}else this[_0x4e7cbd(0x29b)](_0xe4345c,_0x1ac30b,_0x210872,_0xb19524);}const _0x13b401=DataManager[_0x4e7cbd(0x340)](_0x132a96);for(const _0x36f484 of _0x13b401){if(!_0x36f484)continue;const _0x4c0fdc=$dataWeapons[_0x36f484['id']],_0x5937cf=_0x36f484[_0x4e7cbd(0x192)];$gameParty[_0x4e7cbd(0x1bf)](_0x4c0fdc,_0x5937cf);}const _0x4d9c7f=DataManager[_0x4e7cbd(0x2aa)](_0x132a96);for(const _0x80b123 of _0x4d9c7f){if(_0x4e7cbd(0x281)!==_0x4e7cbd(0x281))_0x4a6f8e['loseSkillPoints'](_0x46c6c5,_0x2e950d);else{if(!_0x80b123)continue;const _0x39ba55=$dataArmors[_0x80b123['id']],_0x17670d=_0x80b123[_0x4e7cbd(0x192)];$gameParty[_0x4e7cbd(0x1bf)](_0x39ba55,_0x17670d);}}this[_0x4e7cbd(0x2a0)](_0x132a96['id']),this[_0x4e7cbd(0x26f)]();},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x22b)]=Game_Actor[_0x4dbc53(0x233)]['learnSkill'],Game_Actor['prototype'][_0x4dbc53(0x2a0)]=function(_0x548cb0){const _0x4db3f7=_0x4dbc53,_0xebcff6=!this[_0x4db3f7(0x3a8)](_0x548cb0);VisuMZ[_0x4db3f7(0x260)][_0x4db3f7(0x22b)][_0x4db3f7(0x2c2)](this,_0x548cb0);if(_0xebcff6&&this['isLearnedSkill'](_0x548cb0)){if(_0x4db3f7(0x1d3)===_0x4db3f7(0x204))return this[_0x4db3f7(0x3c4)]()[_0x4db3f7(0x279)]((_0x3187dd,_0x594fd7)=>{const _0x413ab8=_0x4db3f7;return _0x594fd7&&_0x594fd7[_0x413ab8(0x225)][_0x413ab8(0x30c)](_0x3c594a[_0x413ab8(0x260)][_0x413ab8(0x154)][_0x413ab8(0x166)])?_0x3187dd*(_0x5c78b9(_0x3b1cbf['$1'])*0.01):_0x3187dd;},0x1);else{const _0x35631b=$dataSkills[_0x548cb0],_0x3ce74e=VisuMZ[_0x4db3f7(0x260)][_0x4db3f7(0x1be)](_0x35631b,'jsOnLearn');VisuMZ[_0x4db3f7(0x260)]['JS'][_0x3ce74e]&&(_0x4db3f7(0x378)!==_0x4db3f7(0x378)?_0x3c3d8d=_0x246854:VisuMZ['SkillLearnSystem']['JS'][_0x3ce74e][_0x4db3f7(0x2c2)](this,this,_0x35631b));}}},Game_Actor['prototype'][_0x4dbc53(0x3df)]=function(){const _0x4f4b8e=_0x4dbc53,_0xd8edd2=DataManager[_0x4f4b8e(0x39f)](this[_0x4f4b8e(0x3bf)]()['id']);for(const _0x2a74e8 of _0xd8edd2){if('YmsUa'!==_0x4f4b8e(0x16c)){const _0xd3de9d=$dataSkills[_0x2a74e8];if(!_0xd3de9d)continue;if(_0xd3de9d[_0x4f4b8e(0x267)][_0x4f4b8e(0x2ad)]()==='')continue;if(_0xd3de9d[_0x4f4b8e(0x267)][_0x4f4b8e(0x30c)](/-----/i))continue;this['learnSkill'](_0x2a74e8);}else _0x44b938=_0x5e6bd4||this[_0x4f4b8e(0x3bf)]()['id'];}},Game_Enemy[_0x4dbc53(0x233)][_0x4dbc53(0x21f)]=function(){const _0x2e9496=_0x4dbc53,_0xb00e41=VisuMZ[_0x2e9496(0x260)][_0x2e9496(0x1c3)][_0x2e9496(0x31d)],_0x55e72c=VisuMZ[_0x2e9496(0x260)]['RegExp'],_0x247721=this[_0x2e9496(0x35c)]()['note'];if(_0x247721[_0x2e9496(0x30c)](_0x55e72c['EnemyAbilityPoints'])){if(_0x2e9496(0x29f)===_0x2e9496(0x29f))try{return eval(RegExp['$1']);}catch(_0x8d86f6){if(_0x2e9496(0x228)!==_0x2e9496(0x190)){if($gameTemp[_0x2e9496(0x329)]())console[_0x2e9496(0x3d9)](_0x8d86f6);return 0x0;}else this[_0x2e9496(0x366)]=_0x1470b0(_0x40c17c['$1']);}else{const _0x357f3f=_0x5b722a[_0x2e9496(0x280)][_0x2e9496(0x23c)](),_0x1adeb6=_0x322c91['_scene'][_0x2e9496(0x3e8)]();return _0x1adeb6&&!_0x1adeb6['meetRequirementsForSkillLearnSystem'](_0x357f3f);}}try{return eval(_0xb00e41[_0x2e9496(0x359)]);}catch(_0x39a6fd){if($gameTemp[_0x2e9496(0x329)]())console[_0x2e9496(0x3d9)](_0x39a6fd);return 0x0;}},Game_Enemy[_0x4dbc53(0x233)]['skillPoints']=function(){const _0x55326=_0x4dbc53,_0x3c08a3=VisuMZ['SkillLearnSystem']['Settings']['SkillPoints'],_0x2a9300=VisuMZ[_0x55326(0x260)][_0x55326(0x154)],_0x18cf20=this[_0x55326(0x35c)]()['note'];if(_0x18cf20[_0x55326(0x30c)](_0x2a9300[_0x55326(0x1d1)])){if('inufW'!==_0x55326(0x174))return this[_0x55326(0x16e)]()['reduce']((_0x1075de,_0x361a17)=>_0x1075de+_0x361a17[_0x55326(0x21f)](),0x0);else try{return eval(RegExp['$1']);}catch(_0x2ee25b){if($gameTemp[_0x55326(0x329)]())console[_0x55326(0x3d9)](_0x2ee25b);return 0x0;}}try{if(_0x55326(0x1c5)!=='ZYRng')return eval(_0x3c08a3[_0x55326(0x359)]);else{const _0x48f6e1=_0x37a887[_0x55326(0x260)][_0x55326(0x1c3)][_0x55326(0x207)][_0x55326(0x24b)]||0x8;this[_0x55326(0x23f)]['scale']['x']=_0x48f6e1,this[_0x55326(0x23f)][_0x55326(0x3a7)]['y']=_0x48f6e1;}}catch(_0x476e0d){if($gameTemp[_0x55326(0x329)]())console[_0x55326(0x3d9)](_0x476e0d);return 0x0;}},VisuMZ['SkillLearnSystem']['Game_Party_setupBattleTestMembers']=Game_Party[_0x4dbc53(0x233)]['setupBattleTestMembers'],Game_Party[_0x4dbc53(0x233)][_0x4dbc53(0x384)]=function(){const _0x1644e7=_0x4dbc53;VisuMZ[_0x1644e7(0x260)][_0x1644e7(0x14c)][_0x1644e7(0x2c2)](this),this[_0x1644e7(0x1ae)]();},Game_Party[_0x4dbc53(0x233)]['setupBattleTestMembersSkillLearnSystem']=function(){const _0x5d2cc3=_0x4dbc53;for(const _0x50f949 of this[_0x5d2cc3(0x177)]()){if(_0x5d2cc3(0x331)!==_0x5d2cc3(0x331))_0x1d7942=_0x304013['format'](_0x3da41a,_0x2f5e84);else{if(!_0x50f949)continue;_0x50f949[_0x5d2cc3(0x3df)]();}}},Game_Troop[_0x4dbc53(0x233)][_0x4dbc53(0x187)]=function(){const _0x204817=_0x4dbc53;return this[_0x204817(0x16e)]()['reduce']((_0x55e080,_0x502710)=>_0x55e080+_0x502710[_0x204817(0x21f)](),0x0);},Game_Troop[_0x4dbc53(0x233)][_0x4dbc53(0x297)]=function(){const _0x2cc2c8=_0x4dbc53;return this[_0x2cc2c8(0x16e)]()[_0x2cc2c8(0x279)]((_0x1ffea1,_0x470fef)=>_0x1ffea1+_0x470fef[_0x2cc2c8(0x3c5)](),0x0);},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x2b7)]=Scene_Skill['prototype'][_0x4dbc53(0x169)],Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x169)]=function(){const _0x5d6992=_0x4dbc53;VisuMZ[_0x5d6992(0x260)][_0x5d6992(0x2b7)][_0x5d6992(0x2c2)](this),this[_0x5d6992(0x371)]();},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x371)]=function(){const _0x217244=_0x4dbc53;this[_0x217244(0x355)](),this['createSkillLearnConfirmWindow']();},Scene_Skill['prototype'][_0x4dbc53(0x355)]=function(){const _0x23e272=_0x4dbc53,_0x211727=this[_0x23e272(0x30a)]();this[_0x23e272(0x2c8)]=new Window_SkillLearnIngredients(_0x211727),this['addWindow'](this[_0x23e272(0x2c8)]),this[_0x23e272(0x2c8)][_0x23e272(0x341)]();const _0x3aae35=VisuMZ[_0x23e272(0x260)]['Settings'][_0x23e272(0x3fa)][_0x23e272(0x1d9)];this['_skillLearnIngredientsWindow'][_0x23e272(0x2de)](_0x3aae35);},Scene_Skill['prototype']['skillLearnIngredientsWindowRect']=function(){const _0x4c7835=_0x4dbc53;if(VisuMZ[_0x4c7835(0x260)][_0x4c7835(0x1c3)][_0x4c7835(0x3fa)][_0x4c7835(0x17f)])return VisuMZ[_0x4c7835(0x260)]['Settings'][_0x4c7835(0x3fa)][_0x4c7835(0x17f)]['call'](this);const _0x56faf9=this[_0x4c7835(0x254)](),_0x55ed14=_0x56faf9['x'],_0x4e1d93=_0x56faf9['y'],_0x418ac2=_0x56faf9['width'],_0xa75b7a=_0x56faf9['height']-this[_0x4c7835(0x3e4)](0x2,![]);return new Rectangle(_0x55ed14,_0x4e1d93,_0x418ac2,_0xa75b7a);},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x32f)]=function(){const _0x4dadcb=_0x4dbc53,_0xac30f0=this[_0x4dadcb(0x24a)]();this[_0x4dadcb(0x2ed)]=new Window_SkillLearnConfirm(_0xac30f0),this[_0x4dadcb(0x272)](this['_skillLearnConfirmWindow']),this[_0x4dadcb(0x2ed)][_0x4dadcb(0x33c)]('ok',this[_0x4dadcb(0x374)][_0x4dadcb(0x2d7)](this)),this[_0x4dadcb(0x2ed)][_0x4dadcb(0x33c)](_0x4dadcb(0x365),this[_0x4dadcb(0x209)][_0x4dadcb(0x2d7)](this)),this[_0x4dadcb(0x2ed)][_0x4dadcb(0x341)]();const _0x167a43=VisuMZ[_0x4dadcb(0x260)][_0x4dadcb(0x1c3)][_0x4dadcb(0x3fa)][_0x4dadcb(0x1a0)];this[_0x4dadcb(0x2ed)][_0x4dadcb(0x2de)](_0x167a43);},Scene_Skill[_0x4dbc53(0x233)]['skillLearnConfirmWindow']=function(){const _0x32eb87=_0x4dbc53;if(VisuMZ['SkillLearnSystem'][_0x32eb87(0x1c3)]['Window'][_0x32eb87(0x19f)]){if(_0x32eb87(0x217)==='KFJmM')return VisuMZ[_0x32eb87(0x260)]['Settings'][_0x32eb87(0x3fa)]['ConfirmWindow_RectJS'][_0x32eb87(0x2c2)](this);else _0x30f2e7['push'](_0x422a95);}const _0x539b85=this[_0x32eb87(0x254)](),_0x5d6bfa=_0x539b85['width'],_0x2b930c=this[_0x32eb87(0x3e4)](0x2,![]),_0x20ed73=_0x539b85['x'],_0x22e7ea=_0x539b85['y']+_0x539b85[_0x32eb87(0x194)]-_0x2b930c;return new Rectangle(_0x20ed73,_0x22e7ea,_0x5d6bfa,_0x2b930c);},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x2c3)]=Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x2bb)],Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x2bb)]=function(){const _0x54cd5c=_0x4dbc53;this[_0x54cd5c(0x240)]['isSkillLearnMode']()?this[_0x54cd5c(0x288)]():_0x54cd5c(0x3f9)===_0x54cd5c(0x3f9)?VisuMZ['SkillLearnSystem']['Scene_Skill_onItemOk']['call'](this):_0x369269=_0x243419[_0x54cd5c(0x1a6)]['format'](_0x198980,_0xae7978);},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x288)]=function(){const _0x5cb3a4=_0x4dbc53;this[_0x5cb3a4(0x240)][_0x5cb3a4(0x341)](),this['_skillLearnIngredientsWindow'][_0x5cb3a4(0x28b)](),this[_0x5cb3a4(0x2c8)][_0x5cb3a4(0x26f)](),this[_0x5cb3a4(0x2ed)][_0x5cb3a4(0x28b)](),this[_0x5cb3a4(0x2ed)][_0x5cb3a4(0x26f)](),this[_0x5cb3a4(0x2ed)][_0x5cb3a4(0x1c4)](),this[_0x5cb3a4(0x2ed)][_0x5cb3a4(0x292)](0x0);},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x374)]=function(){const _0x5ba4ad=_0x4dbc53;if(VisuMZ[_0x5ba4ad(0x260)]['Settings']['Animation'][_0x5ba4ad(0x39e)])this['startSkillLearnAnimation']();else{if(_0x5ba4ad(0x304)!==_0x5ba4ad(0x304))return this[_0x5ba4ad(0x3c4)]()[_0x5ba4ad(0x279)]((_0x238995,_0x467951)=>{const _0x2047b1=_0x5ba4ad;return _0x467951&&_0x467951[_0x2047b1(0x225)]['match'](_0x4fc7c6['SkillLearnSystem'][_0x2047b1(0x154)][_0x2047b1(0x14e)])?_0x238995*(_0x3678a0(_0x183c48['$1'])*0.01):_0x238995;},0x1);else this[_0x5ba4ad(0x1b0)]();}},Scene_Skill['prototype']['onSkillLearnConfirmCancel']=function(){const _0x324dee=_0x4dbc53;this[_0x324dee(0x240)][_0x324dee(0x28b)](),this[_0x324dee(0x240)]['activate'](),this[_0x324dee(0x2c8)]['hide'](),this['_skillLearnConfirmWindow']['hide']();},Scene_Skill['prototype']['finishSkillLearnAnimation']=function(){const _0x2baefb=_0x4dbc53;this['_windowLayer']['visible']=!![],this[_0x2baefb(0x249)]=![],SoundManager[_0x2baefb(0x3e7)](),this[_0x2baefb(0x3e8)]()[_0x2baefb(0x1b8)](this[_0x2baefb(0x23c)]()),this[_0x2baefb(0x209)](),this[_0x2baefb(0x240)][_0x2baefb(0x26f)](),this[_0x2baefb(0x197)][_0x2baefb(0x26f)]();},VisuMZ['SkillLearnSystem']['Scene_Skill_update']=Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x26a)],Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x26a)]=function(){const _0x1ba416=_0x4dbc53;VisuMZ[_0x1ba416(0x260)][_0x1ba416(0x26c)][_0x1ba416(0x2c2)](this),this[_0x1ba416(0x20f)]();},Scene_Skill[_0x4dbc53(0x233)]['startSkillLearnAnimation']=function(){const _0x24904e=_0x4dbc53;this['_skillLearnAnimationPlaying']=!![],this[_0x24904e(0x20a)]=0x14,this[_0x24904e(0x2e7)][_0x24904e(0x36b)]=VisuMZ[_0x24904e(0x260)]['Settings'][_0x24904e(0x207)][_0x24904e(0x3cd)]||![],this[_0x24904e(0x2dc)]();},Scene_Skill[_0x4dbc53(0x233)]['createSkillLearnSkillSprite']=function(){const _0x2450c2=_0x4dbc53;this[_0x2450c2(0x201)]=new Sprite(),this[_0x2450c2(0x263)](this[_0x2450c2(0x201)]),this[_0x2450c2(0x16b)](),this['setSkillLearnSkillSpriteFrame'](),this[_0x2450c2(0x2d8)](),this['setSkillLearnSkillSpriteOpacity'](),this[_0x2450c2(0x361)](),this[_0x2450c2(0x241)](this[_0x2450c2(0x392)][_0x2450c2(0x175)]());},Scene_Skill['prototype'][_0x4dbc53(0x16b)]=function(){const _0xec3edc=_0x4dbc53,_0x5e885e=VisuMZ[_0xec3edc(0x260)][_0xec3edc(0x154)],_0x57af07=this[_0xec3edc(0x23c)]()[_0xec3edc(0x225)];this[_0xec3edc(0x366)]='';if(_0x57af07[_0xec3edc(0x30c)](_0x5e885e['learnPicture']))this[_0xec3edc(0x366)]=String(RegExp['$1']);else{if(_0x57af07[_0xec3edc(0x30c)](_0x5e885e[_0xec3edc(0x2eb)])){if(_0xec3edc(0x1ff)===_0xec3edc(0x193)){const _0x9bb916=this[_0xec3edc(0x24a)]();this[_0xec3edc(0x2ed)]=new _0x5a3d17(_0x9bb916),this[_0xec3edc(0x272)](this[_0xec3edc(0x2ed)]),this[_0xec3edc(0x2ed)]['setHandler']('ok',this[_0xec3edc(0x374)]['bind'](this)),this['_skillLearnConfirmWindow'][_0xec3edc(0x33c)](_0xec3edc(0x365),this[_0xec3edc(0x209)][_0xec3edc(0x2d7)](this)),this[_0xec3edc(0x2ed)][_0xec3edc(0x341)]();const _0x57da8f=_0x18ebeb[_0xec3edc(0x260)][_0xec3edc(0x1c3)][_0xec3edc(0x3fa)][_0xec3edc(0x1a0)];this[_0xec3edc(0x2ed)][_0xec3edc(0x2de)](_0x57da8f);}else this[_0xec3edc(0x366)]=String(RegExp['$1']);}}this[_0xec3edc(0x23f)]=new Sprite();this[_0xec3edc(0x366)]?this[_0xec3edc(0x23f)][_0xec3edc(0x367)]=ImageManager[_0xec3edc(0x172)](this['_learnPicture']):(this[_0xec3edc(0x23f)][_0xec3edc(0x367)]=ImageManager[_0xec3edc(0x255)](_0xec3edc(0x38d)),this[_0xec3edc(0x23f)][_0xec3edc(0x367)][_0xec3edc(0x250)]=![]);this[_0xec3edc(0x23f)][_0xec3edc(0x3eb)]['x']=0.5,this[_0xec3edc(0x23f)]['anchor']['y']=0.5;if(!this[_0xec3edc(0x366)]){if(_0xec3edc(0x159)!==_0xec3edc(0x3ce)){const _0x16d47d=VisuMZ[_0xec3edc(0x260)][_0xec3edc(0x1c3)][_0xec3edc(0x207)][_0xec3edc(0x24b)]||0x8;this[_0xec3edc(0x23f)][_0xec3edc(0x3a7)]['x']=_0x16d47d,this[_0xec3edc(0x23f)][_0xec3edc(0x3a7)]['y']=_0x16d47d;}else{_0x902933=(_0x48d118(_0x2b1703)||'')[_0xec3edc(0x2ad)]();const _0xd9d6bf=/^\d+$/[_0xec3edc(0x188)](_0x256d98);_0xd9d6bf?_0x343af4[_0xec3edc(0x364)](_0x32ce4d(_0x638ce1)):_0x5979d3[_0xec3edc(0x364)](_0x55ed84[_0xec3edc(0x253)](_0x577734));}}this[_0xec3edc(0x201)][_0xec3edc(0x263)](this[_0xec3edc(0x23f)]);},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x282)]=function(){const _0x103390=_0x4dbc53;if(this[_0x103390(0x366)])return;const _0x55bbe9=this[_0x103390(0x23c)](),_0x3ec12f=_0x55bbe9[_0x103390(0x2ac)],_0x1777d4=ImageManager[_0x103390(0x314)],_0x47f7e8=ImageManager[_0x103390(0x2b0)],_0x70f171=_0x3ec12f%0x10*_0x1777d4,_0x145cf3=Math[_0x103390(0x25e)](_0x3ec12f/0x10)*_0x47f7e8;this[_0x103390(0x23f)][_0x103390(0x1c1)](_0x70f171,_0x145cf3,_0x1777d4,_0x47f7e8);},Scene_Skill[_0x4dbc53(0x233)]['setSkillLearnSkillSpritePosition']=function(){const _0x1ae5d1=_0x4dbc53;this[_0x1ae5d1(0x201)]['x']=Math[_0x1ae5d1(0x396)](Graphics[_0x1ae5d1(0x1ea)]/0x2);const _0x5d38b4=Math[_0x1ae5d1(0x396)](ImageManager['iconHeight']*this['_skillLearnIconSprite'][_0x1ae5d1(0x3a7)]['y']);this[_0x1ae5d1(0x201)]['y']=Math['round']((Graphics[_0x1ae5d1(0x194)]+_0x5d38b4)/0x2);},Scene_Skill[_0x4dbc53(0x233)]['setSkillLearnSkillSpriteOpacity']=function(){const _0x19b987=_0x4dbc53;this['_skillLearnIconSpriteOpacitySpeed']=VisuMZ['SkillLearnSystem'][_0x19b987(0x1c3)][_0x19b987(0x207)][_0x19b987(0x3a1)]||0x1,this[_0x19b987(0x23c)]()[_0x19b987(0x225)][_0x19b987(0x30c)](VisuMZ['SkillLearnSystem'][_0x19b987(0x154)][_0x19b987(0x1d6)])&&(this[_0x19b987(0x36a)]=Math['max'](Number(RegExp['$1']),0x1)),this[_0x19b987(0x201)][_0x19b987(0x344)]=0x0;},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x361)]=function(){const _0x1eac4a=_0x4dbc53;this[_0x1eac4a(0x392)]=[];if(this[_0x1eac4a(0x23c)]()[_0x1eac4a(0x225)][_0x1eac4a(0x30c)](VisuMZ[_0x1eac4a(0x260)][_0x1eac4a(0x154)]['animationIDs'])){if(_0x1eac4a(0x1e7)===_0x1eac4a(0x1e7))this[_0x1eac4a(0x392)]=RegExp['$1']['split'](',')[_0x1eac4a(0x2e4)](_0x2deed9=>Number(_0x2deed9));else{const _0x508dbb=_0x3e4bdc[_0x1eac4a(0x260)]['JS'][_0x58f879][_0x1eac4a(0x2c2)](this,_0x5bf6d6,_0x5e0464);_0x5bfec5+=_0x508dbb+'\x0a';}}else _0x1eac4a(0x1e6)!==_0x1eac4a(0x22d)?this[_0x1eac4a(0x392)]=this[_0x1eac4a(0x392)][_0x1eac4a(0x333)](VisuMZ['SkillLearnSystem'][_0x1eac4a(0x1c3)][_0x1eac4a(0x207)][_0x1eac4a(0x310)]):_0x1563ab['id']=_0x48b9b9[_0x1eac4a(0x173)](_0x4721c2);},Scene_Skill[_0x4dbc53(0x233)]['createSkillLearnAnimation']=function(_0xe206d2){const _0x23bc51=_0x4dbc53,_0x11035f=$dataAnimations[_0xe206d2];if(!_0x11035f)return;const _0x5562f4=this[_0x23bc51(0x1a7)](_0x11035f);this['_skillLearnAnimationSprite']=new(_0x5562f4?Sprite_AnimationMV:Sprite_Animation)();const _0x199adf=[this['_skillLearnIconSprite']],_0x2694a3=0x0;this[_0x23bc51(0x38e)][_0x23bc51(0x36c)](_0x199adf,_0x11035f,![],_0x2694a3,null),this[_0x23bc51(0x263)](this[_0x23bc51(0x38e)]);},Scene_Skill[_0x4dbc53(0x233)]['isMVAnimation']=function(_0x30b119){return!!_0x30b119['frames'];},Scene_Skill['prototype'][_0x4dbc53(0x20f)]=function(){const _0x37541b=_0x4dbc53;if(!this[_0x37541b(0x249)])return;this[_0x37541b(0x335)](),this['updateSkillLearnAnimationSprite'](),this[_0x37541b(0x18d)]()&&(_0x37541b(0x199)!==_0x37541b(0x199)?(this[_0x37541b(0x1f7)]===_0x44f6f8&&this['initSkillLearnSystemMenuAccess'](),this[_0x37541b(0x1f7)]=_0x49212c):this[_0x37541b(0x1de)]());},Scene_Skill['prototype'][_0x4dbc53(0x335)]=function(){const _0x3de0b9=_0x4dbc53;this[_0x3de0b9(0x201)][_0x3de0b9(0x344)]+=this[_0x3de0b9(0x36a)];},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x2f5)]=function(){const _0x3c844a=_0x4dbc53;if(!this['_skillLearnAnimationSprite'])return;if(this['_skillLearnAnimationSprite'][_0x3c844a(0x15d)]())return;this[_0x3c844a(0x25d)](),this[_0x3c844a(0x241)](this['_skillLearnAnimationIDs']['shift']());},Scene_Skill['prototype'][_0x4dbc53(0x25d)]=function(){const _0x371100=_0x4dbc53;if(!this[_0x371100(0x38e)])return;this[_0x371100(0x2c0)](this[_0x371100(0x38e)]),this[_0x371100(0x38e)][_0x371100(0x3d0)](),this[_0x371100(0x38e)]=undefined;},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x1d4)]=function(){const _0x28445b=_0x4dbc53;if(!this[_0x28445b(0x201)])return;this['removeChild'](this[_0x28445b(0x201)]),this['_skillLearnIconSprite'][_0x28445b(0x3d0)](),this[_0x28445b(0x201)]=undefined;},Scene_Skill[_0x4dbc53(0x233)][_0x4dbc53(0x18d)]=function(){const _0x34e41e=_0x4dbc53;if(TouchInput['isReleased']())return!![];if(Input[_0x34e41e(0x248)]('ok'))return!![];if(Input[_0x34e41e(0x248)](_0x34e41e(0x365)))return!![];if(this[_0x34e41e(0x201)][_0x34e41e(0x344)]<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this['_skillLearnAnimationWait']--<=0x0;},Scene_Skill['prototype']['processFinishSkillLearnAnimation']=function(){const _0x2a1135=_0x4dbc53;this[_0x2a1135(0x25d)](),this[_0x2a1135(0x1d4)](),this['finishSkillLearnAnimation'](),TouchInput[_0x2a1135(0x1b9)](),Input[_0x2a1135(0x1b9)]();},Window_Base[_0x4dbc53(0x233)][_0x4dbc53(0x271)]=function(_0x3d21f1,_0x595ed9,_0x24bf97,_0x590fd4,_0x49ff0f){const _0x2552ba=_0x4dbc53;_0x49ff0f=_0x49ff0f||_0x2552ba(0x30d);const _0x52dc41=_0x2552ba(0x30f)[_0x2552ba(0x300)](ImageManager['abilityPointsIcon']),_0xefeb2a=TextManager[_0x2552ba(0x1df)],_0x148262=_0xefeb2a[_0x2552ba(0x300)](_0x3d21f1,TextManager[_0x2552ba(0x15e)],_0x52dc41,TextManager[_0x2552ba(0x363)]),_0xbe8b8b=this[_0x2552ba(0x2c6)](_0x148262)[_0x2552ba(0x1ea)];if(_0x49ff0f===_0x2552ba(0x30d)){if(_0x2552ba(0x15f)!==_0x2552ba(0x2ba))_0x595ed9+=0x0;else{let _0x3c7fab=_0x5330e3[_0x2552ba(0x2fd)];if(_0x3c7fab[_0x2552ba(0x30c)](/\\I\[(\d+)\]/i))return _0x3c7fab;if(!_0x3a9b90[_0x2552ba(0x3b7)])return _0x3c7fab;if(this[_0x2552ba(0x2f7)]()===_0x2552ba(0x37f))return _0x3c7fab;const _0xfdf9a6=_0x1c6c25[_0x2552ba(0x20b)];return _0x2552ba(0x167)[_0x2552ba(0x300)](_0xfdf9a6,_0x3c7fab);}}else _0x49ff0f==='center'?_0x595ed9+=Math[_0x2552ba(0x396)]((_0x590fd4-_0xbe8b8b)/0x2):_0x595ed9+=_0x590fd4-_0xbe8b8b;this['drawTextEx'](_0x148262,_0x595ed9,_0x24bf97);},Window_Base[_0x4dbc53(0x233)]['drawActorAbilityPoints']=function(_0x2469b0,_0x507c83,_0x35b459,_0x4807c3,_0x5a1874,_0x5eee56){const _0x4d2f97=_0x4dbc53,_0x1ec55c=_0x2469b0['getAbilityPoints'](_0x507c83);this[_0x4d2f97(0x271)](_0x1ec55c,_0x35b459,_0x4807c3,_0x5a1874,_0x5eee56);},Window_Base['prototype'][_0x4dbc53(0x218)]=function(_0x4d8a07,_0x3a1456,_0x2d7e31,_0x1bbb61,_0x5911da){const _0x24791c=_0x4dbc53;_0x5911da=_0x5911da||_0x24791c(0x30d);const _0x33e82a=_0x24791c(0x30f)['format'](ImageManager[_0x24791c(0x2d2)]),_0x255bca=TextManager['skillPointsFmt'],_0x3dec7c=_0x255bca[_0x24791c(0x300)](_0x4d8a07,TextManager['skillPointsAbbr'],_0x33e82a,TextManager[_0x24791c(0x393)]),_0xe46333=this[_0x24791c(0x2c6)](_0x3dec7c)['width'];if(_0x5911da===_0x24791c(0x30d))_0x3a1456+=0x0;else _0x5911da==='center'?_0x3a1456+=Math['round']((_0x1bbb61-_0xe46333)/0x2):_0x3a1456+=_0x1bbb61-_0xe46333;this[_0x24791c(0x206)](_0x3dec7c,_0x3a1456,_0x2d7e31);},Window_Base[_0x4dbc53(0x233)]['drawActorSkillPoints']=function(_0x3b7b35,_0x3bc421,_0x391bd8,_0x4fab62,_0x480aea,_0x50f34e){const _0x23ab1b=_0x4dbc53,_0x13a64b=_0x3b7b35[_0x23ab1b(0x183)](_0x3bc421);this[_0x23ab1b(0x218)](_0x13a64b,_0x391bd8,_0x4fab62,_0x480aea,_0x50f34e);},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x358)]=Window_SkillType[_0x4dbc53(0x233)][_0x4dbc53(0x3c3)],Window_SkillType[_0x4dbc53(0x233)][_0x4dbc53(0x3c3)]=function(){const _0x47d976=_0x4dbc53;VisuMZ['SkillLearnSystem']['Window_SkillType_makeCommandList'][_0x47d976(0x2c2)](this),this['addSkillLearnSystemCommand']();},Window_SkillType[_0x4dbc53(0x233)]['addSkillLearnSystemCommand']=function(){const _0x51934b=_0x4dbc53;if(!$gameSystem[_0x51934b(0x32c)]())return;if(!this[_0x51934b(0x34a)])return;let _0x1c516c=this[_0x51934b(0x2cf)]();const _0x44328f=this[_0x51934b(0x34a)]['skillTypes']()[0x0];this['addCommand'](_0x1c516c,'skill',!![],_0x51934b(0x230));},Window_SkillType[_0x4dbc53(0x233)]['skillLearnSystemCommandName']=function(){const _0x21b530=_0x4dbc53;let _0x5d4729=TextManager[_0x21b530(0x2fd)];if(_0x5d4729[_0x21b530(0x30c)](/\\I\[(\d+)\]/i))return _0x5d4729;if(!Imported[_0x21b530(0x3b7)])return _0x5d4729;if(this[_0x21b530(0x2f7)]()===_0x21b530(0x37f))return _0x5d4729;const _0x4be5d4=TextManager[_0x21b530(0x20b)];return _0x21b530(0x167)[_0x21b530(0x300)](_0x4be5d4,_0x5d4729);},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x2cc)]=Window_SkillStatus['prototype'][_0x4dbc53(0x26f)],Window_SkillStatus[_0x4dbc53(0x233)][_0x4dbc53(0x26f)]=function(){const _0x5a4d57=_0x4dbc53;this[_0x5a4d57(0x3a6)](),this[_0x5a4d57(0x14d)]()?this[_0x5a4d57(0x2e6)]():VisuMZ['SkillLearnSystem'][_0x5a4d57(0x2cc)][_0x5a4d57(0x2c2)](this);},Window_SkillStatus[_0x4dbc53(0x233)]['isSkillLearnMode']=function(){const _0x21841b=_0x4dbc53,_0x58beba=SceneManager['_scene'];if(!_0x58beba)return![];const _0x20d5b9=_0x58beba[_0x21841b(0x240)];if(!_0x20d5b9)return![];return _0x20d5b9[_0x21841b(0x14d)]&&_0x20d5b9[_0x21841b(0x14d)]();},Window_SkillStatus[_0x4dbc53(0x233)]['refreshSkillLearnSystem']=function(){const _0x153b3e=_0x4dbc53;if(!this[_0x153b3e(0x34a)])return;Window_StatusBase[_0x153b3e(0x233)][_0x153b3e(0x26f)][_0x153b3e(0x2c2)](this);if(VisuMZ[_0x153b3e(0x260)][_0x153b3e(0x1c3)][_0x153b3e(0x27c)][_0x153b3e(0x1f5)]){if(_0x153b3e(0x1f9)===_0x153b3e(0x391)){if(!_0x27f4f1[_0x153b3e(0x26d)](_0x31c308))return![];}else{VisuMZ[_0x153b3e(0x260)][_0x153b3e(0x1c3)]['General']['StatusWindowDrawJS']['call'](this);return;}}const _0x57fd08=this[_0x153b3e(0x18f)]()/0x2,_0x512634=this[_0x153b3e(0x235)],_0x1612ea=_0x512634/0x2-this[_0x153b3e(0x21a)]()*1.5;this[_0x153b3e(0x1c2)](this['_actor'],_0x57fd08+0x1,0x0,0x90,_0x512634),this[_0x153b3e(0x19d)](this[_0x153b3e(0x34a)],_0x57fd08+0xb4,_0x1612ea);let _0x430000=this[_0x153b3e(0x18f)]()/0x2+0xb4+0xb4+0xb4,_0x345d1e=this[_0x153b3e(0x316)]-_0x430000-0x2;if(_0x345d1e<0x12c)return;const _0x1c5180=this[_0x153b3e(0x258)](),_0x168723=Math[_0x153b3e(0x25e)](this['innerHeight']/this[_0x153b3e(0x21a)]()),_0x165bf6=Math[_0x153b3e(0x1c8)](_0x1c5180[_0x153b3e(0x1a1)]/_0x168723);let _0xb09cb6=_0x430000,_0x2d8e74=Math['max'](Math['round']((this[_0x153b3e(0x235)]-this[_0x153b3e(0x21a)]()*Math[_0x153b3e(0x1c8)](_0x1c5180[_0x153b3e(0x1a1)]/_0x165bf6))/0x2),0x0);const _0x5d4422=_0x2d8e74;let _0x548955=(this[_0x153b3e(0x316)]-_0xb09cb6-this[_0x153b3e(0x289)]()*0x2*_0x165bf6)/_0x165bf6;if(_0x165bf6===0x1){if(_0x153b3e(0x2ca)!=='LvPEp')return _0x46440b*(_0x533e6f(_0x4e456c['$1'])*0.01);else _0x548955=Math['min'](ImageManager['faceWidth'],_0x548955),_0xb09cb6+=Math['round']((this['innerWidth']-_0xb09cb6-this[_0x153b3e(0x289)]()*0x2-_0x548955)/0x2);}for(const _0x1eabae of _0x1c5180){switch(_0x1eabae){case'AP':this[_0x153b3e(0x20c)](this[_0x153b3e(0x34a)],this[_0x153b3e(0x34a)]['currentClass']()['id'],_0xb09cb6,_0x2d8e74,_0x548955,'right');break;case'CP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x153b3e(0x39d)](this[_0x153b3e(0x34a)],this['_actor']['currentClass']()['id'],_0xb09cb6,_0x2d8e74,_0x548955,'right');break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x153b3e(0x26b)](this[_0x153b3e(0x34a)],this[_0x153b3e(0x34a)][_0x153b3e(0x3bf)]()['id'],_0xb09cb6,_0x2d8e74,_0x548955,_0x153b3e(0x31a));break;case'SP':this['drawActorSkillPoints'](this[_0x153b3e(0x34a)],this[_0x153b3e(0x34a)][_0x153b3e(0x3bf)]()['id'],_0xb09cb6,_0x2d8e74,_0x548955,_0x153b3e(0x31a));break;case _0x153b3e(0x14b):this[_0x153b3e(0x1c0)]($gameParty[_0x153b3e(0x219)](),TextManager[_0x153b3e(0x1ee)],_0xb09cb6,_0x2d8e74,_0x548955);break;default:continue;}_0x2d8e74+=this[_0x153b3e(0x21a)](),_0x2d8e74+this[_0x153b3e(0x21a)]()>this[_0x153b3e(0x235)]&&(_0x2d8e74=_0x5d4422,_0xb09cb6+=_0x548955+this['itemPadding']()*0x2);}},Window_SkillStatus[_0x4dbc53(0x233)][_0x4dbc53(0x258)]=function(){const _0x512ebe=_0x4dbc53,_0x3e533c=JsonEx[_0x512ebe(0x277)](VisuMZ[_0x512ebe(0x260)][_0x512ebe(0x1c3)][_0x512ebe(0x27c)][_0x512ebe(0x31b)]);return!Imported['VisuMZ_2_ClassChangeSystem']&&(_0x3e533c['remove']('CP'),_0x3e533c[_0x512ebe(0x23e)]('JP')),_0x3e533c[_0x512ebe(0x23e)](_0x512ebe(0x15b))[_0x512ebe(0x23e)](_0x512ebe(0x38c))[_0x512ebe(0x23e)](_0x512ebe(0x29e));},Window_SkillList['prototype'][_0x4dbc53(0x14d)]=function(){const _0x4b9cf1=_0x4dbc53;return this['_stypeId']===_0x4b9cf1(0x230);},VisuMZ[_0x4dbc53(0x260)]['Window_SkillList_setStypeId']=Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x315)],Window_SkillList['prototype'][_0x4dbc53(0x315)]=function(_0x378797){const _0x5195a6=_0x4dbc53,_0x4acf1d=this['isSkillLearnMode']();VisuMZ[_0x5195a6(0x260)][_0x5195a6(0x1f3)][_0x5195a6(0x2c2)](this,_0x378797);if(_0x4acf1d!==this['isSkillLearnMode']()){if(_0x5195a6(0x3ad)!==_0x5195a6(0x3ad))this['_rewards'][_0x5195a6(0x21f)]=_0x555bda[_0x5195a6(0x187)]();else{const _0x3e6e97=SceneManager[_0x5195a6(0x280)];if(!_0x3e6e97)return;const _0x178773=_0x3e6e97['_statusWindow'];if(_0x178773)_0x178773[_0x5195a6(0x26f)]();}}},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x33d)]=Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x3d6)],Window_SkillList['prototype'][_0x4dbc53(0x3d6)]=function(){const _0x407d1c=_0x4dbc53;return this[_0x407d1c(0x14d)]()?0x1:VisuMZ[_0x407d1c(0x260)][_0x407d1c(0x33d)][_0x407d1c(0x2c2)](this);},VisuMZ[_0x4dbc53(0x260)]['Window_SkillList_makeItemList']=Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x178)],Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x178)]=function(){const _0x4b9fae=_0x4dbc53;if(this[_0x4b9fae(0x34a)]&&this['isSkillLearnMode']()){if(_0x4b9fae(0x28d)!==_0x4b9fae(0x186))this[_0x4b9fae(0x3db)]();else{const _0x46457f=_0x36b9fa[_0x4b9fae(0x280)]['user']();return _0x5977f6[_0x4b9fae(0x260)]['JS'][_0x2efc7d][_0x4b9fae(0x2c2)](this,_0x46457f,_0x4638a4);}}else{if(_0x4b9fae(0x34e)==='hFBIR'){if(!_0x2cbbb6[_0x4b9fae(0x26d)](_0x275647))return![];}else VisuMZ[_0x4b9fae(0x260)][_0x4b9fae(0x395)]['call'](this);}},Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x3db)]=function(){const _0x54a717=_0x4dbc53,_0x29c8e2=DataManager[_0x54a717(0x39f)](this[_0x54a717(0x34a)][_0x54a717(0x3bf)]()['id']);this[_0x54a717(0x35f)]=_0x29c8e2['map'](_0x38b2b9=>$dataSkills[_0x38b2b9])[_0x54a717(0x319)](_0x54725e=>this[_0x54a717(0x152)](_0x54725e));},VisuMZ[_0x4dbc53(0x260)]['Window_SkillList_includes']=Window_SkillList['prototype'][_0x4dbc53(0x152)],Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x152)]=function(_0x112b74){const _0x3a367d=_0x4dbc53;return this[_0x3a367d(0x14d)]()?this['skillLearnIncludes'](_0x112b74):VisuMZ[_0x3a367d(0x260)][_0x3a367d(0x2d5)][_0x3a367d(0x2c2)](this,_0x112b74);},Window_SkillList['prototype'][_0x4dbc53(0x180)]=function(_0x1073fd){const _0x54e950=_0x4dbc53;if(!_0x1073fd)return![];if(_0x1073fd['name'][_0x54e950(0x1a1)]<=0x0)return![];if(_0x1073fd[_0x54e950(0x267)][_0x54e950(0x30c)](/-----/i))return![];const _0x46ed22=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x1073fd,'jsLearnShow');if(VisuMZ[_0x54e950(0x260)]['JS'][_0x46ed22]){if(!VisuMZ[_0x54e950(0x260)]['JS'][_0x46ed22][_0x54e950(0x2c2)](this,this[_0x54e950(0x34a)],_0x1073fd))return![];}const _0x57109e=VisuMZ['SkillLearnSystem'][_0x54e950(0x154)],_0x15b987=_0x1073fd['note'];if(_0x15b987[_0x54e950(0x30c)](_0x57109e['LearnShowLevel'])){if(_0x54e950(0x3da)===_0x54e950(0x3da)){const _0x14edb9=Number(RegExp['$1']);if(_0x14edb9>this[_0x54e950(0x34a)][_0x54e950(0x2f4)])return![];}else this[_0x54e950(0x355)](),this['createSkillLearnConfirmWindow']();}if(_0x15b987['match'](_0x57109e['LearnShowSkillsAll'])){const _0x113736=String(RegExp['$1'])[_0x54e950(0x2c5)](',')['map'](_0x28193e=>_0x28193e[_0x54e950(0x2ad)]());;for(const _0x1b1c02 of _0x113736){if(_0x54e950(0x39a)===_0x54e950(0x39a)){let _0x790c1d=0x0;const _0x5208f0=/^\d+$/['test'](_0x1b1c02);if(_0x5208f0)'WefbU'!=='hUIIz'?_0x790c1d=Number(_0x1b1c02):_0x22c65a=_0x398109(_0x222657);else{if('FXWKL'==='FXWKL')_0x790c1d=DataManager[_0x54e950(0x253)](_0x1b1c02);else return _0x20b29e=_0x374e1d[_0x54e950(0x2e8)],_0x249dd8[_0x54e950(0x300)](_0x169610,_0x3b3ea4[_0x54e950(0x22c)],'\x5cI[%1]'['format'](_0x242265[_0x54e950(0x3f8)]),_0xd24507[_0x54e950(0x266)]);}if(!this[_0x54e950(0x34a)]['isLearnedSkill'](_0x790c1d))return![];}else _0x4ac6b0=_0x5774f2[_0x54e950(0x2cb)][_0x54e950(0x300)](_0x55920d[_0x54e950(0x156)][_0x4e64c0]||''),_0x2dfbf2['length']>0x0&&(_0x3029de!==''?_0x1dad19=_0x10d9d1[_0x54e950(0x300)](_0x515d85,_0xa03d5):_0xeabc5b=_0x2c1a92);}}if(_0x15b987[_0x54e950(0x30c)](_0x57109e[_0x54e950(0x232)])){const _0x517ab1=String(RegExp['$1'])[_0x54e950(0x2c5)](',')[_0x54e950(0x2e4)](_0x30b30b=>_0x30b30b['trim']());;let _0x2dc733=![];for(const _0x166bae of _0x517ab1){let _0xdd3f72=0x0;const _0x26e684=/^\d+$/[_0x54e950(0x188)](_0x166bae);_0x26e684?_0xdd3f72=Number(_0x166bae):_0xdd3f72=DataManager[_0x54e950(0x253)](_0x166bae);if(this['_actor'][_0x54e950(0x3a8)](_0xdd3f72)){_0x2dc733=!![];break;}}if(!_0x2dc733)return![];}if(_0x15b987[_0x54e950(0x30c)](_0x57109e[_0x54e950(0x262)])){const _0x23c742=String(RegExp['$1'])['split'](',')[_0x54e950(0x2e4)](_0x3bcf6f=>Number(_0x3bcf6f));for(const _0x4cc82c of _0x23c742){if(!$gameSwitches[_0x54e950(0x26d)](_0x4cc82c))return![];}}if(_0x15b987[_0x54e950(0x30c)](_0x57109e[_0x54e950(0x398)])){const _0x1d104a=String(RegExp['$1'])[_0x54e950(0x2c5)](',')[_0x54e950(0x2e4)](_0x3a90c1=>Number(_0x3a90c1));let _0x5e7c77=![];for(const _0x3186b4 of _0x1d104a){if(_0x54e950(0x244)!==_0x54e950(0x224)){if($gameSwitches[_0x54e950(0x26d)](_0x3186b4)){_0x5e7c77=!![];break;}}else{if(this[_0x54e950(0x23c)]())this[_0x54e950(0x307)](_0x3ef920);}}if(!_0x5e7c77)return![];}return _0x1073fd;},VisuMZ['SkillLearnSystem'][_0x4dbc53(0x1a3)]=Window_SkillList['prototype'][_0x4dbc53(0x1a2)],Window_SkillList[_0x4dbc53(0x233)]['isEnabled']=function(_0x48c567){const _0x557c26=_0x4dbc53;return this[_0x557c26(0x34a)]&&this[_0x557c26(0x14d)]()?this[_0x557c26(0x296)](_0x48c567):VisuMZ['SkillLearnSystem'][_0x557c26(0x1a3)][_0x557c26(0x2c2)](this,_0x48c567);},VisuMZ[_0x4dbc53(0x260)][_0x4dbc53(0x3ef)]=Window_SkillList[_0x4dbc53(0x233)]['drawItem'],Window_SkillList['prototype'][_0x4dbc53(0x2ae)]=function(_0x3a6a2a){const _0xf04ed3=_0x4dbc53;this['_skillLearnSystem_drawItemMode']=this[_0xf04ed3(0x14d)](),VisuMZ[_0xf04ed3(0x260)][_0xf04ed3(0x3ef)]['call'](this,_0x3a6a2a),this[_0xf04ed3(0x276)]=![];},Window_SkillList['prototype'][_0x4dbc53(0x296)]=function(_0x2ffa4a){const _0x540d9b=_0x4dbc53;if(!_0x2ffa4a)return![];if(_0x2ffa4a[_0x540d9b(0x267)]['length']<=0x0)return![];if(_0x2ffa4a[_0x540d9b(0x267)][_0x540d9b(0x30c)](/-----/i))return![];if(this[_0x540d9b(0x34a)]['isLearnedSkill'](_0x2ffa4a['id']))return![];if(this[_0x540d9b(0x276)]){if(!this['_actor'][_0x540d9b(0x1da)](_0x2ffa4a))return![];return this[_0x540d9b(0x34a)][_0x540d9b(0x1a5)](_0x2ffa4a);}return!![];},VisuMZ['SkillLearnSystem']['Window_SkillList_drawSkillCost']=Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x3bb)],Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x3bb)]=function(_0x5b53f7,_0x28d3e6,_0x315d62,_0x46abc3){const _0x34ee53=_0x4dbc53;if(this[_0x34ee53(0x14d)]()){if(this[_0x34ee53(0x196)](_0x5b53f7))this[_0x34ee53(0x19c)](_0x5b53f7,_0x28d3e6,_0x315d62,_0x46abc3);else{if(_0x34ee53(0x18c)===_0x34ee53(0x18c))this[_0x34ee53(0x29b)](_0x5b53f7,_0x28d3e6,_0x315d62,_0x46abc3);else{if(_0x3566df['isPlaytest']())_0x4db771['log'](_0x999d2c);return 0x0;}}}else VisuMZ['SkillLearnSystem'][_0x34ee53(0x1ca)]['call'](this,_0x5b53f7,_0x28d3e6,_0x315d62,_0x46abc3);},Window_SkillList['prototype']['shouldDrawSkillLearnRequirements']=function(_0x4809fe){const _0x210acc=_0x4dbc53;return this[_0x210acc(0x34a)]&&!this[_0x210acc(0x34a)][_0x210acc(0x1da)](_0x4809fe);},Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x19c)]=function(_0x18a93f,_0x4d0f78,_0x2a8f1f,_0x2b5f17){const _0x1485ab=_0x4dbc53,_0x360974=this['getSkillLearnRequirementText'](_0x18a93f),_0x34978e=this[_0x1485ab(0x2c6)](_0x360974)[_0x1485ab(0x1ea)];_0x4d0f78+=_0x2b5f17-_0x34978e,this['drawTextEx'](_0x360974,_0x4d0f78,_0x2a8f1f);},Window_SkillList[_0x4dbc53(0x233)]['getSkillLearnRequirementText']=function(_0x50ab6b){const _0xf48642=_0x4dbc53,_0x41077a=VisuMZ[_0xf48642(0x260)][_0xf48642(0x1c3)][_0xf48642(0x27c)],_0x185182=TextManager['skillLearnReqSeparatorFmt'],_0x40fc10=VisuMZ[_0xf48642(0x260)]['RegExp'],_0x1990f4=_0x50ab6b[_0xf48642(0x225)];let _0x424c38='',_0x5e5297='';const _0x4997f3=[_0xf48642(0x326),'SKILLS','SWITCHES',_0xf48642(0x2fc)];for(const _0xab1cd8 of _0x4997f3){if(_0xf48642(0x321)!==_0xf48642(0x321))this['_skillLearnAnimationIDs']=_0x18e16c['$1']['split'](',')[_0xf48642(0x2e4)](_0x393981=>_0x1f6275(_0x393981));else switch(_0xab1cd8){case _0xf48642(0x326):if(_0x1990f4[_0xf48642(0x30c)](_0x40fc10[_0xf48642(0x153)])){if(_0xf48642(0x295)!==_0xf48642(0x295))_0x25476e['id']=_0x3c0eab(_0x3de88f);else{const _0x4659f3=Number(RegExp['$1']);_0x5e5297=TextManager[_0xf48642(0x3a3)][_0xf48642(0x300)](_0x4659f3,TextManager[_0xf48642(0x2f4)],TextManager[_0xf48642(0x1fd)]),_0x5e5297['length']>0x0&&(_0x424c38!==''?'pRKYX'===_0xf48642(0x1b3)?_0x188968[_0xf48642(0x364)](_0x10a0eb[_0xf48642(0x253)](_0x432a51)):_0x424c38=_0x185182[_0xf48642(0x300)](_0x424c38,_0x5e5297):_0x424c38=_0x5e5297);}}break;case'SKILLS':if(_0x1990f4[_0xf48642(0x30c)](_0x40fc10[_0xf48642(0x155)])){const _0x4209c5=String(RegExp['$1'])[_0xf48642(0x2c5)](',')[_0xf48642(0x2e4)](_0x5c1115=>_0x5c1115[_0xf48642(0x2ad)]());;for(const _0x5e6ed3 of _0x4209c5){let _0x11bc3f=0x0;const _0x1b2722=/^\d+$/[_0xf48642(0x188)](_0x5e6ed3);_0x1b2722?_0x11bc3f=Number(_0x5e6ed3):_0xf48642(0x1b5)!==_0xf48642(0x1b5)?this[_0xf48642(0x336)](-_0x68164f,_0x3a6159):_0x11bc3f=DataManager[_0xf48642(0x253)](_0x5e6ed3);if($dataSkills[_0x11bc3f]){const _0x10a7de=$dataSkills[_0x11bc3f];_0x5e5297=TextManager[_0xf48642(0x3b5)][_0xf48642(0x300)](_0xf48642(0x30f)[_0xf48642(0x300)](_0x10a7de['iconIndex']),_0x10a7de[_0xf48642(0x267)]);if(_0x5e5297[_0xf48642(0x1a1)]>0x0){if(_0x424c38!=='')_0x424c38=_0x185182['format'](_0x424c38,_0x5e5297);else{if(_0xf48642(0x1d5)===_0xf48642(0x3cb)){const _0x260458=_0x2f667a['makeDeepCopy'](_0x49ccc3['SkillLearnSystem'][_0xf48642(0x1c3)][_0xf48642(0x27c)][_0xf48642(0x31b)]);return!_0x4be8ae[_0xf48642(0x32d)]&&(_0x260458[_0xf48642(0x23e)]('CP'),_0x260458[_0xf48642(0x23e)]('JP')),_0x260458[_0xf48642(0x23e)](_0xf48642(0x15b))[_0xf48642(0x23e)]('Weapon')['remove']('Armor');}else _0x424c38=_0x5e5297;}}}}}if(_0x1990f4['match'](_0x40fc10[_0xf48642(0x273)])){const _0x5c9843=String(RegExp['$1'])[_0xf48642(0x2c5)](',')[_0xf48642(0x2e4)](_0x48e364=>_0x48e364[_0xf48642(0x2ad)]());;for(const _0x497532 of _0x5c9843){let _0x132e21=0x0;const _0x36ae94=/^\d+$/['test'](_0x497532);if(_0x36ae94){if(_0xf48642(0x2ce)!==_0xf48642(0x270))_0x132e21=Number(_0x497532);else{const _0x2e35fb=_0x5b34ae['SkillLearnSystem']['RegExp'];_0x1b63bc['SkillLearnSystem'][_0xf48642(0x3fc)](_0x56853e,_0xf48642(0x15a),_0x2e35fb[_0xf48642(0x15a)]),_0x46fa18[_0xf48642(0x260)][_0xf48642(0x3fc)](_0x62487d,'jsLearnCpCost',_0x2e35fb[_0xf48642(0x1cc)]),_0xbc836c[_0xf48642(0x260)]['createCostJS'](_0x357fda,_0xf48642(0x20e),_0x2e35fb[_0xf48642(0x20e)]),_0x14cfac[_0xf48642(0x260)][_0xf48642(0x3fc)](_0x2309c5,'jsLearnSpCost',_0x2e35fb[_0xf48642(0x23a)]),_0x56581b['SkillLearnSystem']['createVisibleJS'](_0x2604f8,_0xf48642(0x19e),_0x2e35fb[_0xf48642(0x19e)]),_0xd4f880['SkillLearnSystem'][_0xf48642(0x251)](_0x32c0d2,_0xf48642(0x1e3),_0x2e35fb['jsLearnReq']),_0x4665f9['SkillLearnSystem']['createTextJS'](_0x4516b3,_0xf48642(0x181),_0x2e35fb[_0xf48642(0x181)]),_0x422a13[_0xf48642(0x260)][_0xf48642(0x33f)](_0x5398ce,_0xf48642(0x2dd),_0x2e35fb[_0xf48642(0x2dd)]),_0x1b9d74[_0xf48642(0x260)]['createTextJS'](_0x1e89bf,_0xf48642(0x38b),_0x2e35fb[_0xf48642(0x38b)]),_0x4bc0f3['SkillLearnSystem'][_0xf48642(0x33f)](_0x1d5990,'jsLearnReqDetailTxt',_0x2e35fb[_0xf48642(0x2c4)]),_0x446571[_0xf48642(0x260)]['createActionJS'](_0x11f8f1,_0xf48642(0x202),_0x2e35fb[_0xf48642(0x202)]);}}else _0xf48642(0x313)===_0xf48642(0x380)?_0xaf1b61!==''?_0x123e3d=_0x3d11cf[_0xf48642(0x300)](_0x147a0d,_0x322a82):_0x3d6bda=_0x5b5b89:_0x132e21=DataManager[_0xf48642(0x253)](_0x497532);if($dataSkills[_0x132e21]){if(_0xf48642(0x212)==='YnUxe'){const _0x1deb35=$dataSkills[_0x132e21];_0x5e5297=TextManager[_0xf48642(0x3b5)][_0xf48642(0x300)](_0xf48642(0x30f)[_0xf48642(0x300)](_0x1deb35['iconIndex']),_0x1deb35[_0xf48642(0x267)]);if(_0x5e5297[_0xf48642(0x1a1)]>0x0){if(_0xf48642(0x221)===_0xf48642(0x1d2)){if(!_0xad6582[_0xf48642(0x32d)])return;_0x585add>0x0&&(_0x121fd0*=this[_0xf48642(0x353)]()),this[_0xf48642(0x20d)](_0x305b55,_0xf48642(0x1c6));}else{if(_0x424c38!==''){if(_0xf48642(0x18b)!=='dSOWW'){const _0x49e7c6=_0x9786d8[_0x28981a];_0x1e175b=_0x48303c[_0xf48642(0x3b5)][_0xf48642(0x300)](_0xf48642(0x30f)[_0xf48642(0x300)](_0x49e7c6['iconIndex']),_0x49e7c6[_0xf48642(0x267)]),_0x4ca7ee[_0xf48642(0x1a1)]>0x0&&(_0x6fd23d!==''?_0x3f7c4f=_0x9318b7[_0xf48642(0x300)](_0x1beb88,_0x3559c0):_0x2c2ecd=_0x44c2af);}else _0x424c38=_0x185182[_0xf48642(0x300)](_0x424c38,_0x5e5297);}else _0x424c38=_0x5e5297;}}}else _0x34eb0a=_0x2f6f0a['getSkillIdWithName'](_0x276d4f);}}}break;case _0xf48642(0x21b):if(_0x1990f4[_0xf48642(0x30c)](_0x40fc10[_0xf48642(0x3ba)])){if(_0xf48642(0x357)===_0xf48642(0x357)){const _0x503adc=String(RegExp['$1'])['split'](',')[_0xf48642(0x2e4)](_0xf1eb44=>_0xf1eb44[_0xf48642(0x2ad)]());;for(const _0x261406 of _0x503adc){if('ysoYh'!=='ysoYh')_0x3b868d=_0x1104fb[_0xf48642(0x253)](_0x5c2ca8);else{if($dataSystem['switches'][_0x261406]){if(_0xf48642(0x394)===_0xf48642(0x394)){_0x5e5297=TextManager[_0xf48642(0x2cb)][_0xf48642(0x300)]($dataSystem['switches'][_0x261406]||'');if(_0x5e5297['length']>0x0){if('sLKCK'==='qyjWP')this[_0xf48642(0x276)]=this[_0xf48642(0x14d)](),_0x150610[_0xf48642(0x260)][_0xf48642(0x3ef)][_0xf48642(0x2c2)](this,_0x39fed8),this['_skillLearnSystem_drawItemMode']=![];else{if(_0x424c38!=='')_0xf48642(0x1fc)!==_0xf48642(0x1fc)?_0x1cae03=_0x30d440:_0x424c38=_0x185182[_0xf48642(0x300)](_0x424c38,_0x5e5297);else{if(_0xf48642(0x15c)===_0xf48642(0x33b))return![];else _0x424c38=_0x5e5297;}}}}else return 0x1;}}}}else{const _0x2e1a56=_0x28d904['_scene'][_0xf48642(0x3e8)]();return _0x12495f['SkillLearnSystem']['JS'][_0x1b86fb][_0xf48642(0x2c2)](this,_0x2e1a56,_0x1e117a);}}if(_0x1990f4[_0xf48642(0x30c)](_0x40fc10[_0xf48642(0x2a8)])){if('NyBKe'!==_0xf48642(0x30b)){const _0x573706=String(RegExp['$1'])[_0xf48642(0x2c5)](',')['map'](_0x2d11c7=>_0x2d11c7['trim']());;for(const _0x1cf6a1 of _0x573706){if(_0xf48642(0x246)!==_0xf48642(0x246)){const _0x3c6626=_0x4444b8(_0x249ca9['$1']);_0x2f2a01[_0xf48642(0x25b)](_0x3c6626);}else{if($dataSystem['switches'][_0x1cf6a1]){if(_0xf48642(0x237)!==_0xf48642(0x237)){const _0x5e36bd=_0x5474c8[_0xf48642(0x39f)](this[_0xf48642(0x34a)][_0xf48642(0x3bf)]()['id']);this['_data']=_0x5e36bd[_0xf48642(0x2e4)](_0xdd35eb=>_0x5e7b8e[_0xdd35eb])[_0xf48642(0x319)](_0x21229c=>this[_0xf48642(0x152)](_0x21229c));}else{_0x5e5297=TextManager[_0xf48642(0x2cb)][_0xf48642(0x300)]($dataSystem[_0xf48642(0x156)][_0x1cf6a1]||'');if(_0x5e5297[_0xf48642(0x1a1)]>0x0){if('LqNgH'===_0xf48642(0x3c2)){const _0x2df615=_0x925a04(_0x403d13['$1']);_0x5b1ae4['gainAbilityPoints'](_0x2df615);}else{if(_0x424c38!==''){if(_0xf48642(0x3dc)===_0xf48642(0x3dc))_0x424c38=_0x185182[_0xf48642(0x300)](_0x424c38,_0x5e5297);else{const _0x533a32=_0x514867(_0x42f15c['$1']),_0x9552aa=_0xf48642(0x3b1)['format'](_0x533a32),_0x1fa735=_0x12baa0[_0xf48642(0x260)]['createKeyJS'](_0x11bf45,_0x37c662);_0x215669[_0xf48642(0x260)]['JS'][_0x1fa735]=new _0x3f170c(_0x9552aa);}}else _0x424c38=_0x5e5297;}}}}}}}else{const _0xd348d7=_0x256a69[_0xf48642(0x182)](_0x17600c);if(_0xd348d7>this[_0xf48642(0x2ea)]())return![];const _0x3788b2=_0x4a4bf1[_0xf48642(0x24d)](_0x4809e5);if(_0x3788b2>this['getJobPoints']())return![];}}break;case _0xf48642(0x2fc):const _0x318277=VisuMZ[_0xf48642(0x260)][_0xf48642(0x1be)](_0x50ab6b,'jsLearnReqListTxt');VisuMZ[_0xf48642(0x260)]['JS'][_0x318277]&&(_0xf48642(0x1ed)!=='HwLaG'?_0xa161c7=_0x28e1f4['format'](_0x2e0206,_0x420a32):(_0x5e5297=VisuMZ['SkillLearnSystem']['JS'][_0x318277][_0xf48642(0x2c2)](this,this[_0xf48642(0x34a)],_0x50ab6b),_0x5e5297[_0xf48642(0x1a1)]>0x0&&(_0x424c38!==''?_0x424c38=_0x185182[_0xf48642(0x300)](_0x424c38,_0x5e5297):_0xf48642(0x24c)===_0xf48642(0x35a)?this[_0xf48642(0x28f)]():_0x424c38=_0x5e5297)));break;}}return _0x424c38=TextManager[_0xf48642(0x2bd)][_0xf48642(0x300)](_0x424c38),_0x424c38[_0xf48642(0x2ad)]();},Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x29b)]=function(_0x2c69b5,_0x38e24d,_0xe719f5,_0x1d0398){const _0x38252d=_0x4dbc53,_0x45e429=this[_0x38252d(0x3c8)](_0x2c69b5),_0x394465=this[_0x38252d(0x2c6)](_0x45e429)[_0x38252d(0x1ea)];_0x38e24d+=_0x1d0398-_0x394465,this[_0x38252d(0x206)](_0x45e429,_0x38e24d,_0xe719f5);},Window_SkillList[_0x4dbc53(0x233)][_0x4dbc53(0x3c8)]=function(_0x5a7476){const _0x233080=_0x4dbc53;if(this[_0x233080(0x34a)]&&this['_actor'][_0x233080(0x3a8)](_0x5a7476['id'])){if(_0x233080(0x31c)===_0x233080(0x2a2)){const _0x164e6e=_0xdc2b6b[_0x1afbe6];if(!_0x164e6e)return;const _0xe6b364=this[_0x233080(0x1a7)](_0x164e6e);this[_0x233080(0x38e)]=new(_0xe6b364?_0x2e436e:_0x53e7f5)();const _0x28dbda=[this['_skillLearnIconSprite']],_0x457641=0x0;this[_0x233080(0x38e)][_0x233080(0x36c)](_0x28dbda,_0x164e6e,![],_0x457641,null),this[_0x233080(0x263)](this['_skillLearnAnimationSprite']);}else return TextManager['skillLearnAlreadyLearned'];}const _0x29ab1d=VisuMZ[_0x233080(0x260)][_0x233080(0x1c3)][_0x233080(0x27c)],_0x3d4068=TextManager[_0x233080(0x1a6)];let _0x2583e2='';const _0x557df8=JsonEx[_0x233080(0x277)](_0x29ab1d['DisplayedCosts']);_0x557df8[_0x233080(0x364)](_0x233080(0x386));for(const _0x1389e0 of _0x557df8){if(!_0x1389e0)continue;const _0x5da45a=this[_0x233080(0x2e3)](_0x5a7476,_0x1389e0)[_0x233080(0x2ad)]();_0x5da45a[_0x233080(0x1a1)]>0x0&&(_0x2583e2!==''?_0x233080(0x21c)===_0x233080(0x14a)?_0x17bcb3=_0x365eeb(_0x50b1e1['PerAction']):_0x2583e2=_0x3d4068[_0x233080(0x300)](_0x2583e2,_0x5da45a):_0x2583e2=_0x5da45a);}return _0x2583e2[_0x233080(0x2ad)]();},Window_SkillList[_0x4dbc53(0x233)]['createSkillLearnCostText']=function(_0x1ce994,_0x5112a9){const _0x58e9b2=_0x4dbc53;let _0x8d791f=0x0,_0x22dfc8='',_0x33fa9a='';switch(_0x5112a9[_0x58e9b2(0x387)]()[_0x58e9b2(0x2ad)]()){case'AP':_0x8d791f=DataManager[_0x58e9b2(0x2b6)](_0x1ce994);if(_0x8d791f>0x0){if(_0x58e9b2(0x2f8)!==_0x58e9b2(0x256))return _0x22dfc8=TextManager[_0x58e9b2(0x1df)],_0x22dfc8[_0x58e9b2(0x300)](_0x8d791f,TextManager[_0x58e9b2(0x15e)],_0x58e9b2(0x30f)[_0x58e9b2(0x300)](ImageManager['abilityPointsIcon']),TextManager[_0x58e9b2(0x363)]);else _0x1895f8['SkillLearnSystem'][_0x58e9b2(0x1c3)][_0x58e9b2(0x207)][_0x58e9b2(0x39e)]?this[_0x58e9b2(0x170)]():this[_0x58e9b2(0x1b0)]();}break;case'SP':_0x8d791f=DataManager[_0x58e9b2(0x345)](_0x1ce994);if(_0x8d791f>0x0)return _0x22dfc8=TextManager[_0x58e9b2(0x176)],_0x22dfc8[_0x58e9b2(0x300)](_0x8d791f,TextManager[_0x58e9b2(0x2d9)],'\x5cI[%1]'[_0x58e9b2(0x300)](ImageManager[_0x58e9b2(0x2d2)]),TextManager['skillPointsFull']);break;case _0x58e9b2(0x352):_0x8d791f=DataManager[_0x58e9b2(0x2be)](_0x1ce994),_0x22dfc8=TextManager['skillLearnItemFmt'];for(const _0x1e7c09 of _0x8d791f){if('jfSXs'!==_0x58e9b2(0x2a4)){let _0x43ccb0=0x0;const _0x5d0f20=/^\d+$/[_0x58e9b2(0x188)](_0x57f71d);_0x5d0f20?_0x43ccb0=_0x5db64d(_0x1307a5):_0x43ccb0=_0x144135[_0x58e9b2(0x253)](_0x5bc198);if(!this[_0x58e9b2(0x3a8)](_0x43ccb0))return![];}else{if(!_0x1e7c09)continue;const _0x3d9cc1=$dataItems[_0x1e7c09['id']];if(!_0x3d9cc1)continue;const _0x4d7fdc=_0x22dfc8[_0x58e9b2(0x300)](_0x1e7c09[_0x58e9b2(0x192)],_0x58e9b2(0x30f)[_0x58e9b2(0x300)](_0x3d9cc1[_0x58e9b2(0x2ac)]),_0x3d9cc1[_0x58e9b2(0x267)]);_0x33fa9a!==''?_0x33fa9a=TextManager[_0x58e9b2(0x1a6)][_0x58e9b2(0x300)](_0x33fa9a,_0x4d7fdc):_0x33fa9a=_0x4d7fdc;}}return _0x33fa9a;case'WEAPON':_0x8d791f=DataManager[_0x58e9b2(0x340)](_0x1ce994),_0x22dfc8=TextManager[_0x58e9b2(0x242)];for(const _0x53c6ba of _0x8d791f){if(!_0x53c6ba)continue;const _0x465e81=$dataWeapons[_0x53c6ba['id']];if(!_0x465e81)continue;const _0x5afce3=_0x22dfc8['format'](_0x53c6ba[_0x58e9b2(0x192)],_0x58e9b2(0x30f)[_0x58e9b2(0x300)](_0x465e81[_0x58e9b2(0x2ac)]),_0x465e81[_0x58e9b2(0x267)]);if(_0x33fa9a!=='')_0x33fa9a=TextManager['skillLearnSeparationFmt'][_0x58e9b2(0x300)](_0x33fa9a,_0x5afce3);else{if(_0x58e9b2(0x1ce)!==_0x58e9b2(0x17d))_0x33fa9a=_0x5afce3;else{const _0x5ba0b5=_0x2a981f(_0x4fddb7['$1'])[_0x58e9b2(0x2c5)](/[\r\n]+/);for(const _0x314e07 of _0x5ba0b5){if(_0x314e07['match'](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return _0x291455(_0x2c4c80['$1']);}}}}return _0x33fa9a;case _0x58e9b2(0x275):_0x8d791f=DataManager['getSkillLearnArmorCost'](_0x1ce994),_0x22dfc8=TextManager[_0x58e9b2(0x1f4)];for(const _0x4fbdc9 of _0x8d791f){if(!_0x4fbdc9)continue;const _0x26cee1=$dataArmors[_0x4fbdc9['id']];if(!_0x26cee1)continue;const _0x52b4ed=_0x22dfc8[_0x58e9b2(0x300)](_0x4fbdc9[_0x58e9b2(0x192)],_0x58e9b2(0x30f)['format'](_0x26cee1[_0x58e9b2(0x2ac)]),_0x26cee1[_0x58e9b2(0x267)]);if(_0x33fa9a!==''){if('Vtdau'===_0x58e9b2(0x3c6))return _0x268ef9&&_0x33e165['note'][_0x58e9b2(0x30c)](_0x2bc984[_0x58e9b2(0x260)][_0x58e9b2(0x154)][_0x58e9b2(0x166)])?_0x22e1a7*(_0x191059(_0x5f3372['$1'])*0.01):_0x4be2aa;else _0x33fa9a=TextManager[_0x58e9b2(0x1a6)][_0x58e9b2(0x300)](_0x33fa9a,_0x52b4ed);}else _0x33fa9a=_0x52b4ed;}return _0x33fa9a;case'GOLD':_0x8d791f=DataManager[_0x58e9b2(0x385)](_0x1ce994);if(_0x8d791f>0x0)return _0x22dfc8=TextManager[_0x58e9b2(0x3ab)],_0x22dfc8[_0x58e9b2(0x300)](_0x8d791f,Imported[_0x58e9b2(0x226)]?_0x58e9b2(0x30f)['format'](VisuMZ[_0x58e9b2(0x3de)][_0x58e9b2(0x1c3)][_0x58e9b2(0x14b)][_0x58e9b2(0x348)]):TextManager['currencyUnit'],TextManager[_0x58e9b2(0x1ee)]);break;case _0x58e9b2(0x2fc):const _0x2dfb72=VisuMZ[_0x58e9b2(0x260)][_0x58e9b2(0x1be)](_0x1ce994,_0x58e9b2(0x181));if(VisuMZ['SkillLearnSystem']['JS'][_0x2dfb72]){if(_0x58e9b2(0x1e9)!==_0x58e9b2(0x1ec))return VisuMZ[_0x58e9b2(0x260)]['JS'][_0x2dfb72][_0x58e9b2(0x2c2)](this,this[_0x58e9b2(0x34a)],_0x1ce994);else{if(!_0x10807e[_0x58e9b2(0x332)]())return;if(!this[_0x58e9b2(0x379)]()['isActor']())return;const _0x1c50d3=_0x3d6f6f[_0x58e9b2(0x260)][_0x58e9b2(0x1c3)]['SkillPoints'];let _0x4897aa=0x0;try{_0x4897aa=_0x115f44(_0x1c50d3['PerAction']);}catch(_0x2727b3){if(_0xd7de37['isPlaytest']())_0x2b6c74[_0x58e9b2(0x3d9)](_0x2727b3);}this[_0x58e9b2(0x379)]()[_0x58e9b2(0x25b)](_0x4897aa);}}break;case'CP':if(Imported[_0x58e9b2(0x32d)]){_0x8d791f=DataManager[_0x58e9b2(0x182)](_0x1ce994);if(_0x8d791f>0x0)return'QzzWP'==='Ggdoo'?_0x3957ab(_0x17ddf9['$1']):(_0x22dfc8=TextManager['classPointsFmt'],_0x22dfc8[_0x58e9b2(0x300)](_0x8d791f,TextManager['classPointsAbbr'],'\x5cI[%1]'['format'](ImageManager[_0x58e9b2(0x1bc)]),TextManager['classPointsFull']));break;}case'JP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x8d791f=DataManager[_0x58e9b2(0x24d)](_0x1ce994);if(_0x8d791f>0x0)return _0x22dfc8=TextManager[_0x58e9b2(0x2e8)],_0x22dfc8['format'](_0x8d791f,TextManager['jobPointsAbbr'],_0x58e9b2(0x30f)['format'](ImageManager['jobPointsIcon']),TextManager['jobPointsFull']);break;}}return'';},Window_ActorCommand[_0x4dbc53(0x233)][_0x4dbc53(0x14d)]=function(){return![];};function _0x2826(_0x185d22,_0x143c30){return _0x2826=function(_0x3b5da2,_0x282654){_0x3b5da2=_0x3b5da2-0x148;let _0x42f788=_0x3b5d[_0x3b5da2];return _0x42f788;},_0x2826(_0x185d22,_0x143c30);}function Window_SkillLearnIngredients(){const _0x4abcce=_0x4dbc53;this[_0x4abcce(0x165)](...arguments);}Window_SkillLearnIngredients[_0x4dbc53(0x233)]=Object[_0x4dbc53(0x169)](Window_Base[_0x4dbc53(0x233)]),Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x291)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x165)]=function(_0x2cb95a){const _0x32b112=_0x4dbc53;Window_Base[_0x32b112(0x233)][_0x32b112(0x165)][_0x32b112(0x2c2)](this,_0x2cb95a);},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x26f)]=function(){const _0x307e57=_0x4dbc53;this[_0x307e57(0x2c7)][_0x307e57(0x1b9)](),this[_0x307e57(0x3a6)]();if(this[_0x307e57(0x28c)]()){if('EPZir'===_0x307e57(0x3b0))return _0x154eb8(_0x474a3e['$1']);else this['drawRequirements']();}else this[_0x307e57(0x21d)]();},Window_SkillLearnIngredients['prototype']['drawTextExCenterAlign']=function(_0x1acec3,_0x599b04,_0x5438a9,_0x446766){const _0x4c28d0=_0x4dbc53,_0x3e72ff=this['textSizeEx'](_0x1acec3)[_0x4c28d0(0x1ea)],_0x3f45dc=_0x599b04+Math[_0x4c28d0(0x396)]((_0x446766-_0x3e72ff)/0x2);this[_0x4c28d0(0x206)](_0x1acec3,_0x3f45dc,_0x5438a9);},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x2fe)]=function(_0x63fa57,_0x504d11,_0x41d484,_0x1e3f92){const _0x5079d4=_0x4dbc53,_0x229c6e=this[_0x5079d4(0x2c6)](_0x63fa57)[_0x5079d4(0x1ea)],_0x3cfe05=_0x504d11+Math['round'](_0x1e3f92-_0x229c6e);this[_0x5079d4(0x206)](_0x63fa57,_0x3cfe05,_0x41d484);},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x28c)]=function(){const _0x4ce0e0=_0x4dbc53,_0x4bad8d=SceneManager[_0x4ce0e0(0x280)][_0x4ce0e0(0x23c)](),_0xa94803=SceneManager['_scene'][_0x4ce0e0(0x3e8)]();return _0xa94803&&!_0xa94803[_0x4ce0e0(0x1da)](_0x4bad8d);},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x3d3)]=function(){const _0x3265c4=_0x4dbc53,_0x31a95f=SceneManager['_scene'][_0x3265c4(0x23c)](),_0x2e8288=VisuMZ[_0x3265c4(0x260)][_0x3265c4(0x154)],_0x3322c5=_0x31a95f[_0x3265c4(0x225)],_0x4ad70a=SceneManager[_0x3265c4(0x280)][_0x3265c4(0x3e8)](),_0x34d0f9=this[_0x3265c4(0x21a)](),_0x5445a4=TextManager[_0x3265c4(0x337)],_0x430a37=TextManager[_0x3265c4(0x38f)];let _0x14685b=0x0,_0x36a49a=0x0;const _0x224d05=_0x3265c4(0x30f)[_0x3265c4(0x300)](_0x31a95f[_0x3265c4(0x2ac)]),_0x55df63=TextManager['skillLearnReqTitle'][_0x3265c4(0x300)](_0x224d05,_0x31a95f['name']);this['drawTextExCenterAlign'](_0x55df63,_0x14685b,_0x36a49a,this[_0x3265c4(0x316)]),_0x36a49a+=Math[_0x3265c4(0x396)](_0x34d0f9*1.5);let _0xf7bd5d='';if(_0x3322c5[_0x3265c4(0x30c)](_0x2e8288['LearnReqLevel'])){const _0x20b10=Number(RegExp['$1']),_0x3ecad4=TextManager[_0x3265c4(0x229)][_0x3265c4(0x300)](_0x20b10,TextManager[_0x3265c4(0x2f4)],TextManager[_0x3265c4(0x1fd)]),_0x501c56=_0x4ad70a['level']>=_0x20b10?_0x5445a4:_0x430a37;_0xf7bd5d+=_0x501c56[_0x3265c4(0x300)](_0x3ecad4)+'\x0a';}if(_0x3322c5['match'](_0x2e8288[_0x3265c4(0x155)])){if(_0x3265c4(0x2f3)!==_0x3265c4(0x356)){const _0x44ac7c=String(RegExp['$1'])[_0x3265c4(0x2c5)](',')[_0x3265c4(0x2e4)](_0x523037=>_0x523037[_0x3265c4(0x2ad)]());;for(const _0x2b9b4f of _0x44ac7c){if('owUxX'===_0x3265c4(0x3bd)){let _0x4a1254=0x0;const _0x49bfb8=/^\d+$/[_0x3265c4(0x188)](_0x2b9b4f);_0x49bfb8?_0x4a1254=Number(_0x2b9b4f):_0x4a1254=DataManager[_0x3265c4(0x253)](_0x2b9b4f);const _0x46a9d0=$dataSkills[_0x4a1254];if(_0x46a9d0){const _0x5c93a4=TextManager[_0x3265c4(0x27f)]['format'](_0x3265c4(0x30f)['format'](_0x46a9d0['iconIndex']),_0x46a9d0['name']),_0x260333=_0x4ad70a[_0x3265c4(0x3a8)](_0x4a1254)?_0x5445a4:_0x430a37;_0xf7bd5d+=_0x260333['format'](_0x5c93a4)+'\x0a';}}else{const _0x342959=_0xdc63da(_0x5046da['$1']),_0x4e5970={'id':0x0,'quantity':_0x806bc9(_0x54f006['$2'])},_0x31a948=/^\d+$/['test'](_0x342959);_0x31a948?_0x4e5970['id']=_0x54aa8d(_0x342959):_0x4e5970['id']=_0x33675b[_0x3265c4(0x158)](_0x342959),_0x4e5970['id']>0x0&&_0x5db2fd[_0x3265c4(0x364)](_0x4e5970);}}}else _0x4a9215=_0x367a2b(_0x2e28f6);}if(_0x3322c5[_0x3265c4(0x30c)](_0x2e8288[_0x3265c4(0x273)])){const _0x43537e=String(RegExp['$1'])[_0x3265c4(0x2c5)](',')['map'](_0x26a0ad=>_0x26a0ad['trim']());;for(const _0x40ea52 of _0x43537e){if(_0x3265c4(0x39b)==='xeWzC'){let _0x5ccb0c=0x0;const _0x2b6c84=/^\d+$/[_0x3265c4(0x188)](_0x40ea52);if(_0x2b6c84)_0x3265c4(0x301)===_0x3265c4(0x330)?(this[_0x3265c4(0x201)]=new _0x20e942(),this['addChild'](this[_0x3265c4(0x201)]),this[_0x3265c4(0x16b)](),this[_0x3265c4(0x282)](),this[_0x3265c4(0x2d8)](),this['setSkillLearnSkillSpriteOpacity'](),this[_0x3265c4(0x361)](),this[_0x3265c4(0x241)](this[_0x3265c4(0x392)][_0x3265c4(0x175)]())):_0x5ccb0c=Number(_0x40ea52);else{if(_0x3265c4(0x32e)!==_0x3265c4(0x32e)){const _0x2edbc3=_0x337dcc[_0x3265c4(0x277)](_0xfec283[_0x3265c4(0x260)][_0x3265c4(0x1c3)][_0x3265c4(0x27c)][_0x3265c4(0x31b)]);return _0x2edbc3[_0x3265c4(0x364)](_0x3265c4(0x386)),_0x2edbc3;}else _0x5ccb0c=DataManager[_0x3265c4(0x253)](_0x40ea52);}const _0x2d6385=$dataSkills[_0x5ccb0c];if(_0x2d6385){const _0x1e9a87=TextManager[_0x3265c4(0x27f)]['format']('\x5cI[%1]'[_0x3265c4(0x300)](_0x2d6385['iconIndex']),_0x2d6385['name']),_0xc91d88=_0x4ad70a[_0x3265c4(0x3a8)](_0x5ccb0c)?_0x5445a4:_0x430a37;_0xf7bd5d+=_0xc91d88[_0x3265c4(0x300)](_0x1e9a87)+'\x0a';}}else _0x435028[_0x3265c4(0x233)][_0x3265c4(0x17e)][_0x3265c4(0x2c2)](this);}}if(_0x3322c5[_0x3265c4(0x30c)](_0x2e8288[_0x3265c4(0x3ba)])){const _0x34a340=String(RegExp['$1'])[_0x3265c4(0x2c5)](',')[_0x3265c4(0x2e4)](_0x466cbe=>Number(_0x466cbe));for(const _0x2ba0af of _0x34a340){const _0x336c4c=$dataSystem[_0x3265c4(0x156)][_0x2ba0af],_0x1de951=$gameSwitches[_0x3265c4(0x26d)](_0x2ba0af)?_0x5445a4:_0x430a37;_0xf7bd5d+=_0x1de951[_0x3265c4(0x300)](_0x336c4c)+'\x0a';}}if(_0x3322c5[_0x3265c4(0x30c)](_0x2e8288[_0x3265c4(0x2a8)])){const _0x2c1924=String(RegExp['$1'])[_0x3265c4(0x2c5)](',')['map'](_0x4031ef=>Number(_0x4031ef));for(const _0x153316 of _0x2c1924){if(_0x3265c4(0x3ea)===_0x3265c4(0x3ea)){const _0x31eada=$dataSystem['switches'][_0x153316],_0x23d488=$gameSwitches[_0x3265c4(0x26d)](_0x153316)?_0x5445a4:_0x430a37;_0xf7bd5d+=_0x23d488[_0x3265c4(0x300)](_0x31eada)+'\x0a';}else{const _0x5ecb68=_0x345b16[_0x3265c4(0x280)][_0x3265c4(0x3e8)]();return _0x4d2144[_0x3265c4(0x260)]['JS'][_0x4e522c]['call'](this,_0x5ecb68,_0x269b41);}}}const _0x185b18=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x31a95f,_0x3265c4(0x2c4));if(VisuMZ[_0x3265c4(0x260)]['JS'][_0x185b18]){const _0x558533=VisuMZ[_0x3265c4(0x260)]['JS'][_0x185b18][_0x3265c4(0x2c2)](this,_0x4ad70a,_0x31a95f);_0xf7bd5d+=_0x558533+'\x0a';}this[_0x3265c4(0x1f8)](_0xf7bd5d,_0x14685b,_0x36a49a,this[_0x3265c4(0x316)]);},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x21d)]=function(){const _0x1ac4f3=_0x4dbc53,_0x532210=SceneManager[_0x1ac4f3(0x280)][_0x1ac4f3(0x23c)](),_0x46e8b3=SceneManager[_0x1ac4f3(0x280)][_0x1ac4f3(0x3e8)](),_0x5a00bf=this[_0x1ac4f3(0x258)]();let _0x1f17be=0x0,_0x4793eb=0x0;const _0x4f18c2=this['lineHeight'](),_0x501117=Math['round'](this['innerWidth']/0x2),_0x290c92=Math['round'](this[_0x1ac4f3(0x316)]/0x4),_0x2d057e=0x0,_0x2533ec=_0x501117,_0x58e619=_0x501117+_0x290c92,_0x224544='\x5cI[%1]'['format'](_0x532210[_0x1ac4f3(0x2ac)]),_0x56ed17=TextManager['skillLearningTitle'][_0x1ac4f3(0x300)](_0x224544,_0x532210['name']);this[_0x1ac4f3(0x1f8)](_0x56ed17,_0x1f17be,_0x4793eb,this[_0x1ac4f3(0x316)]),_0x4793eb+=_0x4f18c2,this[_0x1ac4f3(0x1f8)](TextManager[_0x1ac4f3(0x32a)],_0x2d057e,_0x4793eb,_0x501117),this[_0x1ac4f3(0x1f8)](TextManager['skillLearningCost'],_0x2533ec,_0x4793eb,_0x290c92),this[_0x1ac4f3(0x1f8)](TextManager['skillLearningOwned'],_0x58e619,_0x4793eb,_0x290c92),_0x4793eb+=_0x4f18c2;const _0x449306=_0x2d057e+this[_0x1ac4f3(0x289)]();for(const _0x4b0f44 of _0x5a00bf){this[_0x1ac4f3(0x3a6)]();let _0xdfa367='',_0x42321d=0x0,_0x277c1f=0x0,_0x49762d='';switch(_0x4b0f44['toUpperCase']()['trim']()){case'AP':_0x42321d=DataManager[_0x1ac4f3(0x2b6)](_0x532210);if(_0x42321d<=0x0)continue;this[_0x1ac4f3(0x271)](_0x42321d,_0x2533ec,_0x4793eb,_0x290c92,_0x1ac4f3(0x31a)),_0xdfa367=_0x1ac4f3(0x167)[_0x1ac4f3(0x300)](ImageManager[_0x1ac4f3(0x268)],TextManager[_0x1ac4f3(0x363)]),this[_0x1ac4f3(0x206)](_0xdfa367,_0x449306,_0x4793eb),_0x277c1f=_0x46e8b3[_0x1ac4f3(0x30e)](),this[_0x1ac4f3(0x271)](_0x277c1f,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)](),_0x1ac4f3(0x31a));break;case'SP':_0x42321d=DataManager['getSkillLearnSkillPointCost'](_0x532210);if(_0x42321d<=0x0)continue;this['drawSkillPoints'](_0x42321d,_0x2533ec,_0x4793eb,_0x290c92,'right'),_0xdfa367=_0x1ac4f3(0x167)['format'](ImageManager['skillPointsIcon'],TextManager[_0x1ac4f3(0x393)]),this['drawTextEx'](_0xdfa367,_0x449306,_0x4793eb),_0x277c1f=_0x46e8b3[_0x1ac4f3(0x183)](),this[_0x1ac4f3(0x218)](_0x277c1f,_0x58e619,_0x4793eb,_0x290c92-this['itemPadding'](),'right');break;case _0x1ac4f3(0x211):_0x42321d=DataManager[_0x1ac4f3(0x385)](_0x532210);if(_0x42321d<=0x0)continue;this[_0x1ac4f3(0x1c0)](_0x42321d,TextManager['currencyUnit'],_0x2533ec,_0x4793eb,_0x290c92);const _0x5b4dbf=Imported[_0x1ac4f3(0x226)]?_0x1ac4f3(0x30f)[_0x1ac4f3(0x300)](VisuMZ[_0x1ac4f3(0x3de)]['Settings'][_0x1ac4f3(0x14b)][_0x1ac4f3(0x348)]):TextManager['currencyUnit'];_0xdfa367=_0x1ac4f3(0x3b3)[_0x1ac4f3(0x300)](_0x5b4dbf,TextManager[_0x1ac4f3(0x1ee)]),this['drawTextEx'](_0xdfa367,_0x449306,_0x4793eb),_0x277c1f=$gameParty['gold'](),this['drawCurrencyValue'](_0x277c1f,TextManager['currencyUnit'],_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)]());break;case _0x1ac4f3(0x352):const _0x42bbc2=DataManager[_0x1ac4f3(0x2be)](_0x532210);if(_0x42bbc2[_0x1ac4f3(0x1a1)]<=0x0)continue;for(const _0x2b76ac of _0x42bbc2){if(_0x1ac4f3(0x21e)===_0x1ac4f3(0x21e)){if(!_0x2b76ac)continue;const _0x20b6c2=$dataItems[_0x2b76ac['id']];_0x49762d=TextManager['skillLearnItemFmt'],this[_0x1ac4f3(0x2a6)](_0x20b6c2,_0x449306,_0x4793eb,_0x501117-_0x449306),_0xdfa367=_0x49762d[_0x1ac4f3(0x300)](_0x2b76ac[_0x1ac4f3(0x192)],_0x1ac4f3(0x30f)[_0x1ac4f3(0x300)](_0x20b6c2['iconIndex']),_0x20b6c2[_0x1ac4f3(0x267)]),this[_0x1ac4f3(0x2fe)](_0xdfa367,_0x2533ec,_0x4793eb,_0x290c92),_0xdfa367=_0x49762d[_0x1ac4f3(0x300)]($gameParty[_0x1ac4f3(0x3b2)](_0x20b6c2),_0x1ac4f3(0x30f)[_0x1ac4f3(0x300)](_0x20b6c2[_0x1ac4f3(0x2ac)]),_0x20b6c2[_0x1ac4f3(0x267)]),this[_0x1ac4f3(0x2fe)](_0xdfa367,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)]()),_0x4793eb+=_0x4f18c2;if(_0x4793eb+_0x4f18c2>this[_0x1ac4f3(0x235)])return;}else _0x2189b7!==''?_0x267197=_0x41b16a[_0x1ac4f3(0x300)](_0xf3f79b,_0x4d50fb):_0x77d6c6=_0x77dd04;}continue;case _0x1ac4f3(0x302):const _0x4a58b7=DataManager[_0x1ac4f3(0x340)](_0x532210);if(_0x4a58b7[_0x1ac4f3(0x1a1)]<=0x0)continue;for(const _0x3d1295 of _0x4a58b7){if(!_0x3d1295)continue;const _0x328fc8=$dataWeapons[_0x3d1295['id']];_0x49762d=TextManager['skillLearnWeaponFmt'],this[_0x1ac4f3(0x2a6)](_0x328fc8,_0x449306,_0x4793eb,_0x501117-_0x449306),_0xdfa367=_0x49762d['format'](_0x3d1295[_0x1ac4f3(0x192)],_0x1ac4f3(0x30f)[_0x1ac4f3(0x300)](_0x328fc8[_0x1ac4f3(0x2ac)]),_0x328fc8[_0x1ac4f3(0x267)]),this[_0x1ac4f3(0x2fe)](_0xdfa367,_0x2533ec,_0x4793eb,_0x290c92),_0xdfa367=_0x49762d[_0x1ac4f3(0x300)]($gameParty[_0x1ac4f3(0x3b2)](_0x328fc8),'\x5cI[%1]'[_0x1ac4f3(0x300)](_0x328fc8[_0x1ac4f3(0x2ac)]),_0x328fc8[_0x1ac4f3(0x267)]),this[_0x1ac4f3(0x2fe)](_0xdfa367,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)]()),_0x4793eb+=_0x4f18c2;if(_0x4793eb+_0x4f18c2>this['innerHeight'])return;}continue;case _0x1ac4f3(0x275):const _0x2e5204=DataManager['getSkillLearnArmorCost'](_0x532210);if(_0x2e5204[_0x1ac4f3(0x1a1)]<=0x0)continue;for(const _0x5dcdc4 of _0x2e5204){if(!_0x5dcdc4)continue;const _0x3bac90=$dataArmors[_0x5dcdc4['id']];_0x49762d=TextManager[_0x1ac4f3(0x1f4)],this[_0x1ac4f3(0x2a6)](_0x3bac90,_0x449306,_0x4793eb,_0x501117-_0x449306),_0xdfa367=_0x49762d[_0x1ac4f3(0x300)](_0x5dcdc4[_0x1ac4f3(0x192)],_0x1ac4f3(0x30f)[_0x1ac4f3(0x300)](_0x3bac90['iconIndex']),_0x3bac90[_0x1ac4f3(0x267)]),this[_0x1ac4f3(0x2fe)](_0xdfa367,_0x2533ec,_0x4793eb,_0x290c92),_0xdfa367=_0x49762d['format']($gameParty[_0x1ac4f3(0x3b2)](_0x3bac90),'\x5cI[%1]'[_0x1ac4f3(0x300)](_0x3bac90[_0x1ac4f3(0x2ac)]),_0x3bac90[_0x1ac4f3(0x267)]),this['drawTextExRightAlign'](_0xdfa367,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)]()),_0x4793eb+=_0x4f18c2;if(_0x4793eb+_0x4f18c2>this[_0x1ac4f3(0x235)])return;}continue;case _0x1ac4f3(0x2fc):const _0x47ab47=VisuMZ[_0x1ac4f3(0x260)][_0x1ac4f3(0x1be)](_0x532210,_0x1ac4f3(0x2dd));if(VisuMZ['SkillLearnSystem']['JS'][_0x47ab47])_0xdfa367=VisuMZ[_0x1ac4f3(0x260)]['JS'][_0x47ab47][_0x1ac4f3(0x2c2)](this,_0x46e8b3,_0x532210),this['drawTextEx'](_0xdfa367,_0x449306,_0x4793eb);else{if(_0x1ac4f3(0x37b)!==_0x1ac4f3(0x37b))return this[_0x1ac4f3(0x16e)]()['reduce']((_0x2cd724,_0xd2c7a5)=>_0x2cd724+_0xd2c7a5['skillPoints'](),0x0);else continue;}break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x42321d=DataManager[_0x1ac4f3(0x182)](_0x532210)||0x0;if(_0x42321d<=0x0)continue;this[_0x1ac4f3(0x247)](_0x42321d,_0x2533ec,_0x4793eb,_0x290c92,_0x1ac4f3(0x31a)),_0xdfa367=_0x1ac4f3(0x167)[_0x1ac4f3(0x300)](ImageManager[_0x1ac4f3(0x1bc)],TextManager[_0x1ac4f3(0x338)]),this[_0x1ac4f3(0x206)](_0xdfa367,_0x449306,_0x4793eb),_0x277c1f=_0x46e8b3['getClassPoints'](),this[_0x1ac4f3(0x247)](_0x277c1f,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)](),_0x1ac4f3(0x31a));}break;case'JP':if(Imported[_0x1ac4f3(0x32d)]){_0x42321d=DataManager[_0x1ac4f3(0x24d)](_0x532210)||0x0;if(_0x42321d<=0x0)continue;this[_0x1ac4f3(0x362)](_0x42321d,_0x2533ec,_0x4793eb,_0x290c92,'right'),_0xdfa367=_0x1ac4f3(0x167)[_0x1ac4f3(0x300)](ImageManager[_0x1ac4f3(0x3f8)],TextManager[_0x1ac4f3(0x266)]),this[_0x1ac4f3(0x206)](_0xdfa367,_0x449306,_0x4793eb),_0x277c1f=_0x46e8b3[_0x1ac4f3(0x3f1)](),this[_0x1ac4f3(0x362)](_0x277c1f,_0x58e619,_0x4793eb,_0x290c92-this[_0x1ac4f3(0x289)](),'right');}break;default:continue;}_0x4793eb+=_0x4f18c2;if(_0x4793eb+_0x4f18c2>this[_0x1ac4f3(0x235)])return;}},Window_SkillLearnIngredients[_0x4dbc53(0x233)]['getSkillLearnDisplayedCosts']=function(){const _0x5a9107=_0x4dbc53,_0x5e9b72=JsonEx[_0x5a9107(0x277)](VisuMZ[_0x5a9107(0x260)][_0x5a9107(0x1c3)]['General']['DisplayedCosts']);return _0x5e9b72[_0x5a9107(0x364)]('Custom'),_0x5e9b72;},Window_SkillLearnIngredients[_0x4dbc53(0x233)][_0x4dbc53(0x161)]=function(){return![];};function Window_SkillLearnConfirm(){const _0x1ed51c=_0x4dbc53;this[_0x1ed51c(0x165)](...arguments);}Window_SkillLearnConfirm[_0x4dbc53(0x233)]=Object[_0x4dbc53(0x169)](Window_HorzCommand['prototype']),Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x291)]=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x165)]=function(_0x4b0104){const _0x26c890=_0x4dbc53;Window_HorzCommand[_0x26c890(0x233)]['initialize'][_0x26c890(0x2c2)](this,_0x4b0104);},Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x3d6)]=function(){return 0x2;},Window_SkillLearnConfirm[_0x4dbc53(0x233)]['itemHeight']=function(){const _0x237620=_0x4dbc53;return this[_0x237620(0x235)];},Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x3c3)]=function(){const _0x2e0b24=_0x4dbc53;this[_0x2e0b24(0x223)](TextManager['skillLearnConfirmCmd'],'ok',this['isConfirmEnabled']()),this[_0x2e0b24(0x223)](TextManager['skillLearnCancelCmd'],_0x2e0b24(0x365));},Window_SkillLearnConfirm['prototype'][_0x4dbc53(0x303)]=function(){const _0xc6a40c=_0x4dbc53,_0x3e22f9=SceneManager['_scene'];if(!_0x3e22f9)return![];const _0x2d6cc7=_0x3e22f9[_0xc6a40c(0x3e8)]();if(!_0x2d6cc7)return![];const _0x11d25e=_0x3e22f9['item']();if(!_0x11d25e)return![];if(!_0x2d6cc7[_0xc6a40c(0x1da)](_0x11d25e))return![];return _0x2d6cc7[_0xc6a40c(0x1a5)](_0x11d25e);},Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x2ae)]=function(_0x34e4e5){const _0x11a3cc=_0x4dbc53,_0x1ff9a7=this[_0x11a3cc(0x184)](_0x34e4e5);this[_0x11a3cc(0x2d0)](),this[_0x11a3cc(0x213)](this[_0x11a3cc(0x3d5)](_0x34e4e5));const _0x224074=this[_0x11a3cc(0x3d2)](_0x34e4e5),_0x44172d=this[_0x11a3cc(0x2c6)](_0x224074)[_0x11a3cc(0x1ea)];_0x1ff9a7['x']+=Math[_0x11a3cc(0x396)]((_0x1ff9a7[_0x11a3cc(0x1ea)]-_0x44172d)/0x2),this[_0x11a3cc(0x206)](_0x224074,_0x1ff9a7['x'],_0x1ff9a7['y'],_0x44172d);},Window_SkillLearnConfirm[_0x4dbc53(0x233)][_0x4dbc53(0x17e)]=function(){const _0x334092=_0x4dbc53;if(this['currentSymbol']()==='ok'){}else Window_HorzCommand[_0x334092(0x233)][_0x334092(0x17e)][_0x334092(0x2c2)](this);};