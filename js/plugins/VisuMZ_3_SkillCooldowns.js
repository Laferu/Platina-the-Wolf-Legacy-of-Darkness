//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * - VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Cooldowns> should now be working properly.
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x1deb=['tdFzK','\x5cI[%1]','applyCDWUmodifiers','BhIUB','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','200687Vdound','ARRAYFUNC','applyCDWUnotetagsRate','EnemyStypeCooldown','exzKY','applyClearCooldownEffects','ADbDc','notetag2','format','applyCDWUnotetagsFlat','LThCP','BattleManager_processTurn','Step3','drawSkillCooldown','subject','RegExp','EhYnc','OumBg','ERarl','onBattleStart','TlPIj','ShQqO','ARRAYSTRUCT','(\x5cd+\x5c.?\x5cd+)','isBypassWarmups','traitObjects','vLOXz','Game_Battler_onTurnEnd','1yibOPY','UmpkZ','includes','notetag1','onBattleEnd','areSkillCooldownsReady','onCooldownUpdate','_updatedSkillCooldowns','Show','drawTextEx','EVAL','members','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','389PxQOoX','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','onWarmupUpdateJS','ZhBPs','Cooldown','onWarmupReadyJS','NIDSx','inBattle','BRNcX','width','skillTypes','applyChangeGlobalWarmupEffects','jADcx','Game_Action_applyItemUserEffect','Icon','cooldown','onWarmupUpdate','aaZRk','FOBIx','addCooldown','qelrS','mUpCm','OnReadyJS','clearWarmups','VisuMZ_1_SkillsStatesCore','gHRBv','EnemySkillCooldown','kXfeq','parameters','gjbQz','applyGlobalCooldowns','skills','initSkillCooldowns','vnXyb','TextFmt','rawWarmup','\x5cHexColor<%1>','Step2','XfVpd','drawSkillWarmup','name','notetag4','warmupJS','notetag3','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','OperateValues','return\x200','meetsSkillConditions','FontSize','parse','setWarmup','isBypassCooldowns','vCGiD','ARRAYNUM','clearCooldowns','Step4','_subject','Global_%1_%2','1SsPnot','ceil','resetFontSettings','eUSYe','pWvut','RIPyf','getSkillTypes','eGFrP','SkillCooldowns','exit','applyItemUserEffect','zavGx','drawSkillCost','replace','actor','SkillsStatesCore','Parse_Notetags_Skill_JS','applySkillCooldownEffects','cooldownJS','status','onCooldownReady','RATE','CCkhK','fGMnN','clamp','EcXcf','wDBlY','onWarmupReady','kOmFH','nGmqj','onCooldownUpdateJS','PLUS','note','textSizeEx','VisuMZ_SkillsStatesCore_Parse_Notetags_Skill_JS','applyChangeStypeWarmupEffects','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','applyChangeWarmupEffects','fHyvV','processTurn','WARMUP','paySkillCost','IkPvS','version','Stype_%1_%2_%3','CqxrG','qjSbg','filter','ARRAYJSON','registerCommand','prepareUpdateSkillCooldowns','XrqQA','match','hLJpd','hFZcB','paySkillCooldown','\x5cFS[%1]','Game_BattlerBase_initMembers','aaNAD','177757STvOXp','updateCooldowns','525dshSwa','ifwkp','432082mXYvDX','BwXoJ','MaxTurns','prepareSkillWarmups','SuFEm','_skillCooldowns','EnemyGlobalCooldown','max','getSkillIdWithName','initMembers','OnUpdateJS','trim','DNooU','STR','UmRiW','Game_Battler_onBattleEnd','FLAT','FontColor','pdYsP','map','item','VisuMZ_1_MessageCore','onCooldownReadyJS','LKoKc','getStypeIdWithName','JgfLF','(\x5cd+)([%％])','updateWarmups','187602pdHmPo','Step1','attackSkillId','toUpperCase','applyChangeStypeCooldownEffects','LEDES','applyChangeCooldownEffects','description','areSkillWarmupsReady','applyCooldown','Warmup','VFrgm','<GLOBAL\x20%1\x20%2:[\x20]%3>','ySeuq','WAIT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WorRu','Preemptive','MNjYa','jMwRe','hVPxr','Window_Base_drawSkillCost','141102QjNogM','aYemN','ActorStypeCooldown','Settings','Skill_%1_%2_%3','_skillWarmups','LdClX','ConvertParams','Game_BattlerBase_meetsSkillConditions','Game_Battler_onBattleStart','Game_BattlerBase_paySkillCost','prototype','guardSkillId','call','setCooldown','pYlna','stmLW','onTurnEnd','applyChangeGlobalCooldownEffects','juFUi','87272EYPYtc','applyWarmup','yQMhi','applyStypeCooldowns','warmup','JSON','iXsSk','NUM','addWarmup'];function _0x36f0(_0x3bbc36,_0x5005c9){_0x3bbc36=_0x3bbc36-0x14e;let _0x1debcc=_0x1deb[_0x3bbc36];return _0x1debcc;}const _0x5970c0=_0x36f0;(function(_0x732f15,_0x1b1bbb){const _0x2a928c=_0x36f0;while(!![]){try{const _0x421b7b=-parseInt(_0x2a928c(0x237))+-parseInt(_0x2a928c(0x229))*parseInt(_0x2a928c(0x15b))+parseInt(_0x2a928c(0x215))+parseInt(_0x2a928c(0x168))*parseInt(_0x2a928c(0x1e1))+-parseInt(_0x2a928c(0x1ff))+-parseInt(_0x2a928c(0x1df))*parseInt(_0x2a928c(0x1a4))+parseInt(_0x2a928c(0x1e3));if(_0x421b7b===_0x1b1bbb)break;else _0x732f15['push'](_0x732f15['shift']());}catch(_0x5d469b){_0x732f15['push'](_0x732f15['shift']());}}}(_0x1deb,0x1e4bb));var label=_0x5970c0(0x1ac),tier=tier||0x0,dependencies=[_0x5970c0(0x181)],pluginData=$plugins[_0x5970c0(0x1d3)](function(_0x546a0e){const _0x26136d=_0x5970c0;return _0x546a0e[_0x26136d(0x1b7)]&&_0x546a0e[_0x26136d(0x206)][_0x26136d(0x15d)]('['+label+']');})[0x0];VisuMZ[label][_0x5970c0(0x218)]=VisuMZ[label][_0x5970c0(0x218)]||{},VisuMZ[_0x5970c0(0x21c)]=function(_0x1f9b9d,_0x36b80b){const _0x316149=_0x5970c0;for(const _0x54607a in _0x36b80b){if(_0x54607a[_0x316149(0x1d8)](/(.*):(.*)/i)){if(_0x316149(0x1ce)!==_0x316149(0x1ce)){function _0x27849e(){const _0x4aa052=_0x316149,_0x516f3a=_0x4efc2b[_0x4aa052(0x1aa)](_0x4b27e2);_0x516f3a[_0x4aa052(0x15d)](_0x36cc40)&&this['subject']()['addCooldown'](_0x18fc76['id'],_0x2e75d8);}}else{const _0x4911e4=String(RegExp['$1']),_0x5ca479=String(RegExp['$2'])[_0x316149(0x202)]()[_0x316149(0x1ee)]();let _0x156e87,_0x2c2b0d,_0x2fa29c;switch(_0x5ca479){case _0x316149(0x230):_0x156e87=_0x36b80b[_0x54607a]!==''?Number(_0x36b80b[_0x54607a]):0x0;break;case _0x316149(0x19f):_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d[_0x316149(0x1f6)](_0x33dbb4=>Number(_0x33dbb4));break;case _0x316149(0x165):_0x156e87=_0x36b80b[_0x54607a]!==''?eval(_0x36b80b[_0x54607a]):null;break;case'ARRAYEVAL':_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d[_0x316149(0x1f6)](_0x4a65ff=>eval(_0x4a65ff));break;case _0x316149(0x22e):_0x156e87=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):'';break;case _0x316149(0x1d4):_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d['map'](_0x2f4919=>JSON[_0x316149(0x19b)](_0x2f4919));break;case'FUNC':_0x156e87=_0x36b80b[_0x54607a]!==''?new Function(JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a])):new Function(_0x316149(0x198));break;case _0x316149(0x238):_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d[_0x316149(0x1f6)](_0x246662=>new Function(JSON[_0x316149(0x19b)](_0x246662)));break;case _0x316149(0x1f0):_0x156e87=_0x36b80b[_0x54607a]!==''?String(_0x36b80b[_0x54607a]):'';break;case'ARRAYSTR':_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d['map'](_0x13638f=>String(_0x13638f));break;case'STRUCT':_0x2fa29c=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):{},_0x156e87=VisuMZ[_0x316149(0x21c)]({},_0x2fa29c);break;case _0x316149(0x155):_0x2c2b0d=_0x36b80b[_0x54607a]!==''?JSON[_0x316149(0x19b)](_0x36b80b[_0x54607a]):[],_0x156e87=_0x2c2b0d[_0x316149(0x1f6)](_0x45f130=>VisuMZ[_0x316149(0x21c)]({},JSON['parse'](_0x45f130)));break;default:continue;}_0x1f9b9d[_0x4911e4]=_0x156e87;}}}return _0x1f9b9d;},(_0x4a68c4=>{const _0x54c3f0=_0x5970c0,_0x310bfe=_0x4a68c4[_0x54c3f0(0x191)];for(const _0x4ae92b of dependencies){if(!Imported[_0x4ae92b]){alert(_0x54c3f0(0x20e)[_0x54c3f0(0x23f)](_0x310bfe,_0x4ae92b)),SceneManager[_0x54c3f0(0x1ad)]();break;}}const _0x2fc7d4=_0x4a68c4[_0x54c3f0(0x206)];if(_0x2fc7d4[_0x54c3f0(0x1d8)](/\[Version[ ](.*?)\]/i)){const _0x9adec5=Number(RegExp['$1']);_0x9adec5!==VisuMZ[label][_0x54c3f0(0x1cf)]&&(alert(_0x54c3f0(0x167)['format'](_0x310bfe,_0x9adec5)),SceneManager['exit']());}if(_0x2fc7d4[_0x54c3f0(0x1d8)](/\[Tier[ ](\d+)\]/i)){if('hpiue'!==_0x54c3f0(0x1da)){const _0x5680d9=Number(RegExp['$1']);if(_0x5680d9<tier){if(_0x54c3f0(0x20a)!==_0x54c3f0(0x20a)){function _0x156a77(){const _0x3bc994=_0x54c3f0;_0x45c0c8=_0x5a3867[_0x3bc994(0x1eb)](_0x58d97c['$1']),_0x2a11f7=_0x129bbf(_0x180068['$2']);}}else alert(_0x54c3f0(0x16a)[_0x54c3f0(0x23f)](_0x310bfe,_0x5680d9,tier)),SceneManager[_0x54c3f0(0x1ad)]();}else tier=Math[_0x54c3f0(0x1ea)](_0x5680d9,tier);}else{function _0x4ffbcc(){const _0x3cc72e=_0x54c3f0;if(!_0x38fb29[_0x3cc72e(0x170)]())return;const _0x732800=_0x836284['SkillCooldowns'][_0x3cc72e(0x218)][_0x3cc72e(0x209)];if(_0x732800[_0x3cc72e(0x1ed)])_0x732800['OnUpdateJS'][_0x3cc72e(0x222)](this,_0x2d7f17);_0x3a5af0['SkillCooldowns'][_0x3cc72e(0x16b)][_0x236c23]&&_0x230995['SkillCooldowns'][_0x3cc72e(0x16b)][_0x53635d]['call'](this,_0x41f2b6);}}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x4a68c4[_0x54c3f0(0x185)]);})(pluginData),VisuMZ[_0x5970c0(0x197)]=function(_0x4088ff,_0x5a99f3,_0x1a974f){switch(_0x1a974f){case'=':return _0x5a99f3;break;case'+':return _0x4088ff+_0x5a99f3;break;case'-':return _0x4088ff-_0x5a99f3;break;case'*':return _0x4088ff*_0x5a99f3;break;case'/':return _0x4088ff/_0x5a99f3;break;case'%':return _0x4088ff%_0x5a99f3;break;}return _0x4088ff;},PluginManager['registerCommand'](pluginData[_0x5970c0(0x191)],'ActorSkillCooldown',_0x3cafd9=>{const _0x1b1ee4=_0x5970c0;if(!$gameParty['inBattle']())return;VisuMZ[_0x1b1ee4(0x21c)](_0x3cafd9,_0x3cafd9);const _0x4bdee0=_0x3cafd9[_0x1b1ee4(0x200)],_0x2d351f=_0x3cafd9[_0x1b1ee4(0x18e)],_0x23c7f0=_0x3cafd9[_0x1b1ee4(0x243)],_0xe54fec=_0x3cafd9[_0x1b1ee4(0x1a1)];for(const _0x2d6ca3 of _0x4bdee0){if(_0x1b1ee4(0x204)!==_0x1b1ee4(0x1d9)){const _0x347fae=$gameActors[_0x1b1ee4(0x1b2)](_0x2d6ca3);if(!_0x347fae)continue;for(const _0x3f1c86 of _0x2d351f){let _0x9adb14=_0x347fae[_0x1b1ee4(0x178)](_0x3f1c86);_0x9adb14=VisuMZ[_0x1b1ee4(0x197)](_0x9adb14,_0xe54fec,_0x23c7f0),_0x347fae[_0x1b1ee4(0x223)](_0x3f1c86,_0x9adb14);}}else{function _0x397495(){const _0x1aa9c2=_0x1b1ee4;let _0x54a814=0x0,_0x952c63=0x0;if(_0x56b478['match'](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x54a814=_0x5048d2(_0x20a0f4['$1']),_0x952c63=_0x54a935(_0x21454e['$2']);else _0x1720be[_0x1aa9c2(0x1d8)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x54a814=_0x5c79e4[_0x1aa9c2(0x1eb)](_0x34b51b['$1']),_0x952c63=_0x41aa01(_0x56ace6['$2']));this[_0x1aa9c2(0x245)]()[_0x1aa9c2(0x231)](_0x54a814,_0x952c63);}}}}),PluginManager['registerCommand'](pluginData['name'],_0x5970c0(0x217),_0x26564c=>{const _0x18506a=_0x5970c0;if(!$gameParty[_0x18506a(0x170)]())return;VisuMZ[_0x18506a(0x21c)](_0x26564c,_0x26564c);const _0x2f10a6=_0x26564c[_0x18506a(0x200)],_0x253093=_0x26564c[_0x18506a(0x18e)],_0x37d300=_0x26564c[_0x18506a(0x243)],_0x52e95f=_0x26564c[_0x18506a(0x1a1)];for(const _0xbe9540 of _0x2f10a6){if(_0x18506a(0x232)===_0x18506a(0x1d1)){function _0x1575db(){const _0x55b7e5=_0x18506a;_0x2a41ec['SkillCooldowns'][_0x55b7e5(0x1f9)][_0x1fc60c]['call'](this,_0x5e8233);}}else{const _0x1826ab=$gameActors[_0x18506a(0x1b2)](_0xbe9540);if(!_0x1826ab)continue;for(const _0x57d814 of _0x253093){if('iBaqG'!==_0x18506a(0x1af))for(const _0x1d301b of _0x1826ab[_0x18506a(0x188)]()){if(!_0x1d301b)continue;if(!DataManager[_0x18506a(0x1aa)](_0x1d301b)[_0x18506a(0x15d)](_0x57d814))continue;const _0x3a4e0b=_0x1d301b['id'];let _0x229c1f=_0x1826ab[_0x18506a(0x178)](_0x3a4e0b);_0x229c1f=VisuMZ[_0x18506a(0x197)](_0x229c1f,_0x52e95f,_0x37d300),_0x1826ab[_0x18506a(0x223)](_0x3a4e0b,_0x229c1f);}else{function _0x594d83(){var _0xa84f7d=_0x174f63(_0xfb911b['$1']);_0x23089e+=_0xa84f7d;}}}}}}),PluginManager[_0x5970c0(0x1d5)](pluginData[_0x5970c0(0x191)],'ActorGlobalCooldown',_0x5c3f32=>{const _0x2068fe=_0x5970c0;if(!$gameParty[_0x2068fe(0x170)]())return;VisuMZ[_0x2068fe(0x21c)](_0x5c3f32,_0x5c3f32);const _0x482de5=_0x5c3f32[_0x2068fe(0x200)],_0x132986=_0x5c3f32[_0x2068fe(0x18e)],_0x4acf6a=_0x5c3f32[_0x2068fe(0x243)];for(const _0x510fb7 of _0x482de5){if(_0x2068fe(0x1a8)!==_0x2068fe(0x1ca)){const _0x253b48=$gameActors[_0x2068fe(0x1b2)](_0x510fb7);if(!_0x253b48)continue;for(const _0xf5d59a of _0x253b48[_0x2068fe(0x188)]()){if(!_0xf5d59a)continue;const _0x5c5dad=_0xf5d59a['id'];let _0x5299ff=_0x253b48[_0x2068fe(0x178)](_0x5c5dad);_0x5299ff=VisuMZ[_0x2068fe(0x197)](_0x5299ff,_0x4acf6a,_0x132986),_0x253b48[_0x2068fe(0x223)](_0x5c5dad,_0x5299ff);}}else{function _0x598374(){const _0x2bdca4=_0x2068fe;_0x4bf7fa&&_0x55bfb3[_0x2bdca4(0x17c)](_0x5d205d['id'],_0x5a2adb);}}}}),PluginManager[_0x5970c0(0x1d5)](pluginData[_0x5970c0(0x191)],_0x5970c0(0x183),_0x1c737f=>{const _0x36bca5=_0x5970c0;if(!$gameParty['inBattle']())return;VisuMZ[_0x36bca5(0x21c)](_0x1c737f,_0x1c737f);const _0x439e50=_0x1c737f[_0x36bca5(0x200)],_0xdfaaf1=_0x1c737f['Step2'],_0x311b85=_0x1c737f[_0x36bca5(0x243)],_0x3a7d7e=_0x1c737f['Step4'];for(const _0x51980d of _0x439e50){const _0x1ef707=$gameTroop[_0x36bca5(0x166)]()[_0x51980d];if(!_0x1ef707)continue;for(const _0x562863 of _0xdfaaf1){let _0x42ab33=_0x1ef707[_0x36bca5(0x178)](_0x562863);_0x42ab33=VisuMZ['OperateValues'](_0x42ab33,_0x3a7d7e,_0x311b85),_0x1ef707['setCooldown'](_0x562863,_0x42ab33);}}}),PluginManager[_0x5970c0(0x1d5)](pluginData['name'],_0x5970c0(0x23a),_0x100880=>{const _0x294b42=_0x5970c0;if(!$gameParty[_0x294b42(0x170)]())return;VisuMZ['ConvertParams'](_0x100880,_0x100880);const _0x133032=_0x100880[_0x294b42(0x200)],_0x1dd4e7=_0x100880[_0x294b42(0x18e)],_0x29af1a=_0x100880[_0x294b42(0x243)],_0x533c1d=_0x100880['Step4'];for(const _0x3efe54 of _0x133032){const _0x18b995=$gameTroop[_0x294b42(0x166)]()[_0x3efe54];if(!_0x18b995)continue;for(const _0x325198 of _0x1dd4e7){if(_0x294b42(0x1a9)!==_0x294b42(0x17e))for(const _0x5d119b of _0x18b995[_0x294b42(0x188)]()){if(!_0x5d119b)continue;if(!DataManager[_0x294b42(0x1aa)](_0x5d119b)[_0x294b42(0x15d)](_0x325198))continue;const _0x3d2109=_0x5d119b['id'];let _0x4917f8=_0x18b995[_0x294b42(0x178)](_0x3d2109);_0x4917f8=VisuMZ[_0x294b42(0x197)](_0x4917f8,_0x533c1d,_0x29af1a),_0x18b995[_0x294b42(0x223)](_0x3d2109,_0x4917f8);}else{function _0x559ad2(){const _0x50fdbd=_0x294b42;_0x2f8010&&this[_0x50fdbd(0x208)](_0x33021d['id'],_0x1d7877);}}}}}),PluginManager[_0x5970c0(0x1d5)](pluginData['name'],_0x5970c0(0x1e9),_0x2a9c99=>{const _0x80b62b=_0x5970c0;if(!$gameParty[_0x80b62b(0x170)]())return;VisuMZ[_0x80b62b(0x21c)](_0x2a9c99,_0x2a9c99);const _0x578255=_0x2a9c99['Step1'],_0x5b2aad=_0x2a9c99[_0x80b62b(0x18e)],_0x9e63fa=_0x2a9c99[_0x80b62b(0x243)];for(const _0x4a7c94 of _0x578255){if(_0x80b62b(0x150)!==_0x80b62b(0x1e7)){const _0x17b777=$gameTroop[_0x80b62b(0x166)]()[_0x4a7c94];if(!_0x17b777)continue;for(const _0x72ae17 of _0x17b777[_0x80b62b(0x188)]()){if(!_0x72ae17)continue;const _0x45f662=_0x72ae17['id'];let _0x59075a=_0x17b777[_0x80b62b(0x178)](_0x45f662);_0x59075a=VisuMZ[_0x80b62b(0x197)](_0x59075a,_0x9e63fa,_0x5b2aad),_0x17b777[_0x80b62b(0x223)](_0x45f662,_0x59075a);}}else{function _0x5a0eaa(){const _0x952f3e=_0x80b62b,_0x452714=this[_0x952f3e(0x1e8)][_0x45ad43]||0x0;this[_0x952f3e(0x1e8)][_0x1ebf13]-=_0x5c8475,this[_0x952f3e(0x161)](_0x330fdb);if(this[_0x952f3e(0x1e8)][_0xfda925]<=0x0){if(_0x452714>0x0)this[_0x952f3e(0x1b8)](_0x2f89ab);delete this[_0x952f3e(0x1e8)][_0x54f795];}}}}}),VisuMZ['SkillCooldowns'][_0x5970c0(0x1b6)]={},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x193)]={},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x1c2)]={},VisuMZ['SkillCooldowns'][_0x5970c0(0x16b)]={},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x1f9)]={},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x16e)]={},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x1c6)]=VisuMZ[_0x5970c0(0x1b3)][_0x5970c0(0x1b4)],VisuMZ[_0x5970c0(0x1b3)][_0x5970c0(0x1b4)]=function(_0x447566){const _0x3d7608=_0x5970c0;VisuMZ['SkillCooldowns'][_0x3d7608(0x1c6)]['call'](this,_0x447566);const _0x4405b5=_0x447566[_0x3d7608(0x1c4)],_0x3b8ead=_0x3d7608(0x195),_0x4d729f='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x4405b5[_0x3d7608(0x1d8)](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x30888d=String(RegExp['$1']),_0x5f3f89='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x3d7608(0x23f)](_0x30888d);VisuMZ[_0x3d7608(0x1ac)]['cooldownJS'][_0x447566['id']]=new Function(_0x5f3f89);}if(_0x4405b5[_0x3d7608(0x1d8)](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0x41a14d=String(RegExp['$1']),_0xa188de=_0x3d7608(0x1c8)[_0x3d7608(0x23f)](_0x41a14d);VisuMZ['SkillCooldowns'][_0x3d7608(0x193)][_0x447566['id']]=new Function(_0xa188de);}if(_0x4405b5[_0x3d7608(0x1d8)](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){const _0xa8f960=String(RegExp['$1']),_0x5e1210=_0x3b8ead['format'](_0xa8f960);VisuMZ[_0x3d7608(0x1ac)][_0x3d7608(0x1c2)][_0x447566['id']]=new Function(_0x5e1210);}if(_0x4405b5[_0x3d7608(0x1d8)](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){if('kOmFH'===_0x3d7608(0x1c0)){const _0x57636e=String(RegExp['$1']),_0x5d15b6=_0x4d729f['format'](_0x57636e);VisuMZ[_0x3d7608(0x1ac)]['onWarmupUpdateJS'][_0x447566['id']]=new Function(_0x5d15b6);}else{function _0x1a7f6f(){const _0x145574=_0x3d7608;for(const _0x2252df of this[_0x145574(0x188)]()){if(_0x2252df){const _0x32153a=_0x286787['getSkillTypes'](_0x2252df);_0x32153a[_0x145574(0x15d)](_0x23c1bc)&&this[_0x145574(0x208)](_0x2252df['id'],_0x2f2660);}}}}}if(_0x4405b5['match'](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){if(_0x3d7608(0x241)==='LThCP'){const _0x319642=String(RegExp['$1']),_0x247ef5=_0x3b8ead[_0x3d7608(0x23f)](_0x319642);VisuMZ[_0x3d7608(0x1ac)][_0x3d7608(0x1f9)][_0x447566['id']]=new Function(_0x247ef5);}else{function _0x42792c(){const _0x549c1e=_0x3d7608,_0x477607=_0x428159(_0x8fef08['$1']);for(const _0x54d255 of _0x58aec9[_0x549c1e(0x188)]()){_0x54d255&&_0xf33709[_0x549c1e(0x17c)](_0x54d255['id'],_0x477607);}}}}if(_0x4405b5[_0x3d7608(0x1d8)](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){const _0x1cdaa7=String(RegExp['$1']),_0x197fb2=_0x4d729f['format'](_0x1cdaa7);VisuMZ['SkillCooldowns']['onWarmupReadyJS'][_0x447566['id']]=new Function(_0x197fb2);}},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x242)]=BattleManager[_0x5970c0(0x1cb)],BattleManager[_0x5970c0(0x1cb)]=function(){const _0x3f50b2=_0x5970c0;if(this[_0x3f50b2(0x1a2)])this[_0x3f50b2(0x1a2)][_0x3f50b2(0x1d6)]();VisuMZ[_0x3f50b2(0x1ac)][_0x3f50b2(0x242)][_0x3f50b2(0x222)](this);},VisuMZ['SkillCooldowns']['Game_Action_applyItemUserEffect']=Game_Action[_0x5970c0(0x220)][_0x5970c0(0x1ae)],Game_Action[_0x5970c0(0x220)][_0x5970c0(0x1ae)]=function(_0x1111ea){const _0x29a154=_0x5970c0;VisuMZ[_0x29a154(0x1ac)][_0x29a154(0x176)]['call'](this,_0x1111ea),this[_0x29a154(0x1b5)](_0x1111ea);},Game_Action[_0x5970c0(0x220)][_0x5970c0(0x1b5)]=function(_0x45f352){const _0x1c48e7=_0x5970c0;this[_0x1c48e7(0x23c)](_0x45f352),this[_0x1c48e7(0x205)](_0x45f352),this[_0x1c48e7(0x203)](_0x45f352),this[_0x1c48e7(0x227)](_0x45f352),this[_0x1c48e7(0x1c9)](_0x45f352),this[_0x1c48e7(0x1c7)](_0x45f352),this[_0x1c48e7(0x174)](_0x45f352);},Game_Action['prototype']['applyClearCooldownEffects']=function(_0x47f5c5){const _0x589f92=_0x5970c0,_0x3b5890=this[_0x589f92(0x1f7)]()[_0x589f92(0x1c4)];_0x3b5890[_0x589f92(0x1d8)](/<CLEAR USER COOLDOWNS>/i)&&this['subject']()[_0x589f92(0x1a0)]();_0x3b5890[_0x589f92(0x1d8)](/<CLEAR TARGET COOLDOWNS>/i)&&_0x47f5c5['clearCooldowns']();if(_0x3b5890[_0x589f92(0x1d8)](/<CLEAR USER WARMUPS>/i)){if(_0x589f92(0x1ab)==='HVCsj'){function _0x578e85(){const _0x43f842=_0x589f92;_0x31c402[_0x43f842(0x1ac)]['Game_Action_applyItemUserEffect'][_0x43f842(0x222)](this,_0x1b2fec),this[_0x43f842(0x1b5)](_0x58ce9d);}}else this[_0x589f92(0x245)]()[_0x589f92(0x180)]();}if(_0x3b5890[_0x589f92(0x1d8)](/<CLEAR TARGET WARMUPS>/i)){if(_0x589f92(0x1ef)==='DNooU')_0x47f5c5[_0x589f92(0x180)]();else{function _0x1b21ac(){const _0x4c3358=_0x589f92,_0x4426b4=_0x2004dd[_0x4c3358(0x1aa)](_0xa6a21d);_0x4426b4[_0x4c3358(0x15d)](_0x406621)&&_0x2f1174[_0x4c3358(0x231)](_0x2aa918['id'],_0x4a5806);}}}},Game_Action['prototype'][_0x5970c0(0x205)]=function(_0x47f729){const _0x8cb050=_0x5970c0,_0x1d776f=this['item']()[_0x8cb050(0x1c4)],_0x58e404=_0x1d776f['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x58e404){if('ifwkp'===_0x8cb050(0x1e2))for(const _0x1af178 of _0x58e404){let _0x517f3f=0x0,_0x4b8122=0x0;if(_0x1af178[_0x8cb050(0x1d8)](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x517f3f=Number(RegExp['$1']),_0x4b8122=Number(RegExp['$2']);else _0x1af178[_0x8cb050(0x1d8)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x517f3f=DataManager[_0x8cb050(0x1eb)](RegExp['$1']),_0x4b8122=Number(RegExp['$2']));this[_0x8cb050(0x245)]()[_0x8cb050(0x17c)](_0x517f3f,_0x4b8122);}else{function _0x2384d7(){const _0x42c18c=_0x8cb050,_0x993f2b=_0x924589['SkillCooldowns'][_0x42c18c(0x218)];if(_0x993f2b[_0x42c18c(0x209)]['Show']&&_0x49acc8[_0x42c18c(0x18c)](_0x51fe77['id'])>0x0)this[_0x42c18c(0x190)](_0x3d8cfa,_0x18acfa,_0x2ad686,_0x3de238,_0x4241f6);else _0x993f2b[_0x42c18c(0x16d)]['Show']&&_0xf0029e[_0x42c18c(0x178)](_0x3e0762['id'])>0x0?this[_0x42c18c(0x244)](_0x46c0c4,_0x17f362,_0x517d2d,_0x4715a8,_0xe992d2):_0x4a6fc6['SkillCooldowns'][_0x42c18c(0x214)]['call'](this,_0x3e4c98,_0x442b39,_0x37b788,_0x3041a8,_0x33ef9a);}}}const _0x26da87=_0x1d776f[_0x8cb050(0x1d8)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x26da87){if(_0x8cb050(0x211)!==_0x8cb050(0x211)){function _0x110044(){const _0x22a18a=_0x8cb050;if(!_0x182fc6[_0x22a18a(0x170)]())return;const _0x3ff445=_0x4ef900[_0x22a18a(0x1ac)][_0x22a18a(0x218)][_0x22a18a(0x16d)];if(_0x3ff445[_0x22a18a(0x1ed)])_0x3ff445['OnUpdateJS'][_0x22a18a(0x222)](this,_0x29a6bc);_0x54fd90[_0x22a18a(0x1ac)][_0x22a18a(0x1c2)][_0x1aacd2]&&_0x3b73ac[_0x22a18a(0x1ac)]['onCooldownUpdateJS'][_0x45bd33]['call'](this,_0x3a8597);}}else for(const _0x3e1808 of _0x26da87){let _0xfde89=0x0,_0x27b5a1=0x0;if(_0x3e1808[_0x8cb050(0x1d8)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0xfde89=Number(RegExp['$1']),_0x27b5a1=Number(RegExp['$2']);else _0x3e1808[_0x8cb050(0x1d8)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0xfde89=DataManager['getSkillIdWithName'](RegExp['$1']),_0x27b5a1=Number(RegExp['$2']));_0x47f729[_0x8cb050(0x17c)](_0xfde89,_0x27b5a1);}}},Game_Action[_0x5970c0(0x220)]['applyChangeStypeCooldownEffects']=function(_0x51061e){const _0x4952d5=_0x5970c0,_0x87b6e8=this['item']()[_0x4952d5(0x1c4)],_0x1daa51=_0x87b6e8[_0x4952d5(0x1d8)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x1daa51)for(const _0x22714e of _0x1daa51){let _0x33501d=0x0,_0x3208be=0x0;if(_0x22714e[_0x4952d5(0x1d8)](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x4952d5(0x21b)==='tGGIy'){function _0x584987(){var _0x2caadb=_0x134644(_0x3448c4['$1']);_0xa0ef01*=_0x2caadb;}}else _0x33501d=Number(RegExp['$1']),_0x3208be=Number(RegExp['$2']);}else{if(_0x22714e[_0x4952d5(0x1d8)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x4952d5(0x18a)===_0x4952d5(0x18a))_0x33501d=DataManager[_0x4952d5(0x1eb)](RegExp['$1']),_0x3208be=Number(RegExp['$2']);else{function _0x1673e3(){const _0x21dffb=_0x4952d5,_0x9b918f=_0x523e18(_0x399e83['$1']);for(const _0x25c80b of this[_0x21dffb(0x245)]()[_0x21dffb(0x188)]()){_0x25c80b&&this[_0x21dffb(0x245)]()[_0x21dffb(0x17c)](_0x25c80b['id'],_0x9b918f);}}}}}for(const _0x1af6eb of this['subject']()['skills']()){if(_0x1af6eb){const _0x557b60=DataManager['getSkillTypes'](_0x1af6eb);_0x557b60[_0x4952d5(0x15d)](_0x33501d)&&this[_0x4952d5(0x245)]()['addCooldown'](_0x1af6eb['id'],_0x3208be);}}}const _0x4c61ec=_0x87b6e8[_0x4952d5(0x1d8)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4c61ec)for(const _0x25c209 of _0x4c61ec){if(_0x4952d5(0x154)===_0x4952d5(0x1d7)){function _0x4f6eef(){const _0x5fc17b=_0x4952d5;this[_0x5fc17b(0x208)](_0x418ca4['id'],_0x46877f);}}else{let _0x5192c9=0x0,_0x2fdfb3=0x0;if(_0x25c209[_0x4952d5(0x1d8)](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x4952d5(0x182)===_0x4952d5(0x23d)){function _0x4901d4(){const _0x17fb9e=_0x4952d5;if(_0x5b8f2e){const _0xf2646d=_0x483978['getSkillTypes'](_0x590c48);_0xf2646d['includes'](_0x4c792a)&&_0x498761[_0x17fb9e(0x231)](_0xc312b0['id'],_0xbbe3d5);}}}else _0x5192c9=Number(RegExp['$1']),_0x2fdfb3=Number(RegExp['$2']);}else _0x25c209[_0x4952d5(0x1d8)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x5192c9=DataManager[_0x4952d5(0x1eb)](RegExp['$1']),_0x2fdfb3=Number(RegExp['$2']));for(const _0x3f44de of _0x51061e[_0x4952d5(0x188)]()){if(_0x3f44de){const _0x52ac38=DataManager[_0x4952d5(0x1aa)](_0x3f44de);_0x52ac38[_0x4952d5(0x15d)](_0x5192c9)&&_0x51061e[_0x4952d5(0x17c)](_0x3f44de['id'],_0x2fdfb3);}}}}},Game_Action[_0x5970c0(0x220)][_0x5970c0(0x227)]=function(_0x234346){const _0x3eb8b2=_0x5970c0,_0x4c1a0a=this[_0x3eb8b2(0x1f7)]()[_0x3eb8b2(0x1c4)];if(_0x4c1a0a[_0x3eb8b2(0x1d8)](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x3eb8b2(0x186)===_0x3eb8b2(0x186)){const _0x6d6308=Number(RegExp['$1']);for(const _0x2ab9a7 of this['subject']()[_0x3eb8b2(0x188)]()){if(_0x3eb8b2(0x17d)==='YzpyA'){function _0x4f1a4a(){const _0x1a1d8f=_0x3eb8b2,_0x535e90=_0x480702[_0x1a1d8f(0x1ac)][_0x1a1d8f(0x218)][_0x1a1d8f(0x209)];let _0x48c076='';_0x48c076+=_0x1a1d8f(0x1dc)[_0x1a1d8f(0x23f)](_0x535e90[_0x1a1d8f(0x19a)]);const _0x1d2e5c=_0x535e90[_0x1a1d8f(0x1f4)];_0x1d2e5c[_0x1a1d8f(0x1d8)](/#(.*)/i)&&_0x384aba[_0x1a1d8f(0x1f8)]?_0x48c076+=_0x1a1d8f(0x18d)[_0x1a1d8f(0x23f)](_0x374d13(_0x2aa6a3['$1'])):_0x48c076+='\x5cC[%1]'['format'](_0x1d2e5c);const _0x50ee16=_0x368206[_0x1a1d8f(0x22d)](_0x51c793['id']),_0x668867=_0x535e90['Icon']>0x0?_0x1a1d8f(0x233)[_0x1a1d8f(0x23f)](_0x535e90['Icon']):'';_0x48c076+=_0x535e90['TextFmt']['format'](_0x50ee16,_0x668867);const _0x176852=this[_0x1a1d8f(0x1c5)](_0x48c076,_0x414be5,_0x5b3580,_0x5d840d),_0x6dc8d3=_0x4df58a+_0x5aa162-_0x176852[_0x1a1d8f(0x172)];this[_0x1a1d8f(0x164)](_0x48c076,_0x6dc8d3,_0x122557,_0x38e1d0),this[_0x1a1d8f(0x1a6)]();}}else{if(_0x2ab9a7){if('aaZRk'===_0x3eb8b2(0x17a))this['subject']()[_0x3eb8b2(0x17c)](_0x2ab9a7['id'],_0x6d6308);else{function _0x32fdf7(){const _0x3c90fa=_0x3eb8b2;if(_0xc9b74f){const _0x3dbb25=_0x11e099[_0x3c90fa(0x1aa)](_0x256d69);_0x3dbb25[_0x3c90fa(0x15d)](_0xf3cba5)&&this[_0x3c90fa(0x208)](_0x2ab840['id'],_0x3a3d8e);}}}}}}}else{function _0x148ff9(){const _0x8e04a=_0x3eb8b2,_0x537ef6=_0x4ab203(_0x4cb2aa['$1']);_0x537ef6<_0x2d9154?(_0x380578(_0x8e04a(0x16a)[_0x8e04a(0x23f)](_0x5a31ca,_0x537ef6,_0x43bb82)),_0x5bece6['exit']()):_0x356e79=_0x2057ff[_0x8e04a(0x1ea)](_0x537ef6,_0x4e42b8);}}}if(_0x4c1a0a['match'](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x3eb8b2(0x18f)!==_0x3eb8b2(0x18f)){function _0x479169(){const _0xba8e0a=_0x3eb8b2;if(!_0x4e5adc[_0xba8e0a(0x1ac)][_0xba8e0a(0x21d)][_0xba8e0a(0x222)](this,_0x2c54ff))return![];if(!this[_0xba8e0a(0x207)](_0x64aea4))return![];if(!this['areSkillCooldownsReady'](_0x3eccf7))return![];return!![];}}else{const _0x5bf802=Number(RegExp['$1']);for(const _0x41c162 of _0x234346[_0x3eb8b2(0x188)]()){_0x41c162&&_0x234346['addCooldown'](_0x41c162['id'],_0x5bf802);}}}},Game_Action[_0x5970c0(0x220)][_0x5970c0(0x1c9)]=function(_0x45c351){const _0x1d920b=_0x5970c0,_0x4a41b1=this['item']()[_0x1d920b(0x1c4)],_0x442d15=_0x4a41b1[_0x1d920b(0x1d8)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x442d15)for(const _0x13300d of _0x442d15){let _0x5808fb=0x0,_0x4d64e8=0x0;if(_0x13300d[_0x1d920b(0x1d8)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x5808fb=Number(RegExp['$1']),_0x4d64e8=Number(RegExp['$2']);else _0x13300d[_0x1d920b(0x1d8)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x5808fb=DataManager[_0x1d920b(0x1eb)](RegExp['$1']),_0x4d64e8=Number(RegExp['$2']));this[_0x1d920b(0x245)]()[_0x1d920b(0x231)](_0x5808fb,_0x4d64e8);}const _0x3e8715=_0x4a41b1[_0x1d920b(0x1d8)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3e8715){if('ZqDFE'!=='ZqDFE'){function _0x3d4e15(){const _0x5924f3=_0x1d920b;if(_0x25a4e9>0x0)this['onCooldownReady'](_0x391259);delete this[_0x5924f3(0x1e8)][_0x361e86];}}else for(const _0x3936bd of _0x3e8715){let _0x1d73b5=0x0,_0x1663d1=0x0;if(_0x3936bd[_0x1d920b(0x1d8)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x1d920b(0x14f)===_0x1d920b(0x14f))_0x1d73b5=Number(RegExp['$1']),_0x1663d1=Number(RegExp['$2']);else{function _0x10687c(){var _0x4db798=_0x4d0d3b(_0x4ecae9['$1'])/0x64;_0x3c47ce*=_0x4db798;}}}else{if(_0x3936bd[_0x1d920b(0x1d8)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x1d920b(0x22f)===_0x1d920b(0x22f))_0x1d73b5=DataManager[_0x1d920b(0x1eb)](RegExp['$1']),_0x1663d1=Number(RegExp['$2']);else{function _0x252b20(){const _0x5d547a=_0x1d920b;for(const _0x1c7523 of _0xf08a22){let _0x328beb=0x0,_0x486fd0=0x0;if(_0x1c7523[_0x5d547a(0x1d8)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x328beb=_0x458af6(_0x5913c5['$1']),_0x486fd0=_0xaf55f0(_0xe3b61e['$2']);else _0x1c7523[_0x5d547a(0x1d8)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x328beb=_0x40ddbc[_0x5d547a(0x1eb)](_0x38231c['$1']),_0x486fd0=_0x1456c2(_0x531a44['$2']));_0x140452['addWarmup'](_0x328beb,_0x486fd0);}}}}}_0x45c351[_0x1d920b(0x231)](_0x1d73b5,_0x1663d1);}}},Game_Action[_0x5970c0(0x220)][_0x5970c0(0x1c7)]=function(_0x1b9f1b){const _0x177ea6=_0x5970c0,_0x3b3922=this[_0x177ea6(0x1f7)]()[_0x177ea6(0x1c4)],_0x3db786=_0x3b3922[_0x177ea6(0x1d8)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3db786)for(const _0x4f6967 of _0x3db786){let _0x1edbc6=0x0,_0x35fb35=0x0;if(_0x4f6967[_0x177ea6(0x1d8)](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if('QQVnK'!=='QQVnK'){function _0x2c1a29(){const _0x28bd42=_0x177ea6;for(const _0x43f507 of this[_0x28bd42(0x188)]()){_0x43f507&&this[_0x28bd42(0x208)](_0x43f507['id'],_0x7f6088);}}}else _0x1edbc6=Number(RegExp['$1']),_0x35fb35=Number(RegExp['$2']);}else{if(_0x4f6967['match'](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x177ea6(0x1f1)===_0x177ea6(0x1f1))_0x1edbc6=DataManager['getSkillIdWithName'](RegExp['$1']),_0x35fb35=Number(RegExp['$2']);else{function _0x3c1351(){const _0x5e0b1b=_0x177ea6,_0x5f5a27=_0x10f225(_0x57a840['$1']),_0x539fb7='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5e0b1b(0x23f)](_0x5f5a27);_0x51eade['SkillCooldowns']['warmupJS'][_0x5db9f1['id']]=new _0x3de517(_0x539fb7);}}}}for(const _0x3cc3e0 of this[_0x177ea6(0x245)]()[_0x177ea6(0x188)]()){if(_0x3cc3e0){const _0x1cc9ce=DataManager[_0x177ea6(0x1aa)](_0x3cc3e0);if(_0x1cc9ce[_0x177ea6(0x15d)](_0x1edbc6)){if('atrFU'===_0x177ea6(0x1e4)){function _0x5603ef(){const _0x25e69d=_0x177ea6;_0x2134c1[_0x25e69d(0x1ac)][_0x25e69d(0x1b6)][_0x40f621['id']]['call'](this,_0x3c0c08);}}else this['subject']()[_0x177ea6(0x231)](_0x3cc3e0['id'],_0x35fb35);}}}}const _0x226ca9=_0x3b3922[_0x177ea6(0x1d8)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x226ca9)for(const _0x519808 of _0x226ca9){if(_0x177ea6(0x175)===_0x177ea6(0x175)){let _0x58acac=0x0,_0x4d1c61=0x0;if(_0x519808['match'](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x177ea6(0x1fc)==='UPeCj'){function _0x260a9f(){const _0x1ffb7e=_0x177ea6;let _0x499953=_0x38d36e[_0x1ffb7e(0x178)](_0x2b0ae0);_0x499953=_0x35e096[_0x1ffb7e(0x197)](_0x499953,_0x46c94b,_0x21f603),_0xb79525[_0x1ffb7e(0x223)](_0x5a00e7,_0x499953);}}else _0x58acac=Number(RegExp['$1']),_0x4d1c61=Number(RegExp['$2']);}else{if(_0x519808[_0x177ea6(0x1d8)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x177ea6(0x20c)!==_0x177ea6(0x20c)){function _0x23e3f6(){const _0x2a3d6b=_0x177ea6;for(const _0x23f38c of _0x8a1c95){let _0x1d4474=0x0,_0xd4f178=0x0;if(_0x23f38c[_0x2a3d6b(0x1d8)](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x1d4474=_0x3358e9(_0x199b9b['$1']),_0xd4f178=_0x10162e(_0x42f472['$2']);else _0x23f38c[_0x2a3d6b(0x1d8)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x1d4474=_0x20c6f1[_0x2a3d6b(0x1eb)](_0x3656b7['$1']),_0xd4f178=_0x3eaafb(_0x3b89e4['$2']));this[_0x2a3d6b(0x245)]()['addCooldown'](_0x1d4474,_0xd4f178);}}}else _0x58acac=DataManager['getSkillIdWithName'](RegExp['$1']),_0x4d1c61=Number(RegExp['$2']);}}for(const _0x2689b8 of _0x1b9f1b[_0x177ea6(0x188)]()){if(_0x2689b8){if(_0x177ea6(0x1fa)!==_0x177ea6(0x1fa)){function _0x4956e0(){const _0x1bc69b=_0x177ea6;_0xeaff03(_0x1bc69b(0x167)['format'](_0x8208e3,_0x515d58)),_0x213e46[_0x1bc69b(0x1ad)]();}}else{const _0x49646d=DataManager['getSkillTypes'](_0x2689b8);_0x49646d[_0x177ea6(0x15d)](_0x58acac)&&_0x1b9f1b[_0x177ea6(0x231)](_0x2689b8['id'],_0x4d1c61);}}}}else{function _0x5c4b31(){const _0x10b6be=_0x177ea6,_0x3574fa=_0x2cd521(_0x5bb48f['$1']);this[_0x10b6be(0x187)](_0x3574fa);}}}},Game_Action[_0x5970c0(0x220)]['applyChangeGlobalWarmupEffects']=function(_0x27230c){const _0x1f8641=_0x5970c0,_0x4bb3cf=this[_0x1f8641(0x1f7)]()[_0x1f8641(0x1c4)];if(_0x4bb3cf['match'](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x1f8641(0x17b)==='FOBIx'){const _0x273e7f=Number(RegExp['$1']);for(const _0x38b8ce of this['subject']()['skills']()){if(_0x1f8641(0x213)==='hVPxr')_0x38b8ce&&this[_0x1f8641(0x245)]()[_0x1f8641(0x231)](_0x38b8ce['id'],_0x273e7f);else{function _0x46261b(){const _0x54e16e=_0x1f8641;this[_0x54e16e(0x208)](_0x5a33f7['id'],_0x1a4770);}}}}else{function _0x41da34(){const _0x2cd214=_0x1f8641;_0x45d20a+=_0x2cd214(0x18d)[_0x2cd214(0x23f)](_0x306bc8(_0x2b8e65['$1']));}}}if(_0x4bb3cf[_0x1f8641(0x1d8)](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x195bce=Number(RegExp['$1']);for(const _0x34d270 of _0x27230c[_0x1f8641(0x188)]()){_0x34d270&&_0x27230c[_0x1f8641(0x231)](_0x34d270['id'],_0x195bce);}}},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x1dd)]=Game_BattlerBase['prototype'][_0x5970c0(0x1ec)],Game_BattlerBase[_0x5970c0(0x220)]['initMembers']=function(){const _0xcb73c8=_0x5970c0;VisuMZ[_0xcb73c8(0x1ac)][_0xcb73c8(0x1dd)][_0xcb73c8(0x222)](this),this[_0xcb73c8(0x189)]();},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x189)]=function(){const _0x4dde36=_0x5970c0;this[_0x4dde36(0x1a0)](),this['clearWarmups']();},Game_BattlerBase[_0x5970c0(0x220)]['clearCooldowns']=function(){const _0x4491f3=_0x5970c0;this[_0x4491f3(0x1e8)]={};},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x178)]=function(_0x5b54cd){const _0x3d0245=_0x5970c0;if(this['_skillCooldowns']===undefined)this[_0x3d0245(0x189)]();if(this[_0x3d0245(0x19d)]())return 0x0;return this[_0x3d0245(0x1e8)][_0x5b54cd]||0x0;},Game_BattlerBase['prototype'][_0x5970c0(0x19d)]=function(_0x27ecf8){const _0x546927=_0x5970c0;if(!$gameParty['inBattle']())return!![];if(this[_0x546927(0x201)]()===_0x27ecf8)return!![];if(this[_0x546927(0x221)]()===_0x27ecf8)return!![];const _0x21c409=$dataSkills[_0x27ecf8];if(_0x21c409&&_0x21c409[_0x546927(0x1c4)][_0x546927(0x1d8)](/<BYPASS COOLDOWNS>/i))return!![];if(_0x21c409&&_0x21c409[_0x546927(0x191)]['toUpperCase']()==='WAIT')return!![];return![];},Game_BattlerBase['prototype'][_0x5970c0(0x161)]=function(_0x4e1e25){const _0x25718c=_0x5970c0;if(!$gameParty[_0x25718c(0x170)]())return;const _0x413d34=VisuMZ[_0x25718c(0x1ac)][_0x25718c(0x218)][_0x25718c(0x16d)];if(_0x413d34['OnUpdateJS'])_0x413d34['OnUpdateJS'][_0x25718c(0x222)](this,_0x4e1e25);VisuMZ['SkillCooldowns'][_0x25718c(0x1c2)][_0x4e1e25]&&VisuMZ[_0x25718c(0x1ac)]['onCooldownUpdateJS'][_0x4e1e25]['call'](this,_0x4e1e25);},Game_BattlerBase[_0x5970c0(0x220)]['onCooldownReady']=function(_0x160169){const _0x2a1b9f=_0x5970c0;if(!$gameParty['inBattle']())return;const _0x156ed5=VisuMZ['SkillCooldowns'][_0x2a1b9f(0x218)]['Cooldown'];if(_0x156ed5['OnReadyJS'])_0x156ed5[_0x2a1b9f(0x17f)][_0x2a1b9f(0x222)](this,_0x160169);VisuMZ[_0x2a1b9f(0x1ac)][_0x2a1b9f(0x1f9)][_0x160169]&&VisuMZ[_0x2a1b9f(0x1ac)]['onCooldownReadyJS'][_0x160169]['call'](this,_0x160169);},Game_BattlerBase['prototype'][_0x5970c0(0x223)]=function(_0x1486c6,_0x20d542){const _0x32aaa5=_0x5970c0;if(this[_0x32aaa5(0x1e8)]===undefined)this['initSkillCooldowns']();if(this[_0x32aaa5(0x19d)](_0x1486c6))return;_0x20d542=Math[_0x32aaa5(0x1a5)](_0x20d542),_0x20d542=_0x20d542['clamp'](0x0,VisuMZ[_0x32aaa5(0x1ac)][_0x32aaa5(0x218)][_0x32aaa5(0x16d)][_0x32aaa5(0x1e5)]);const _0x4dc025=this[_0x32aaa5(0x178)](_0x1486c6);;this[_0x32aaa5(0x1e8)][_0x1486c6]=_0x20d542;if(this['_skillCooldowns'][_0x1486c6]<=0x0){if(_0x32aaa5(0x212)===_0x32aaa5(0x159)){function _0x11c456(){_0x4dcf2a=_0x1555b5['getSkillIdWithName'](_0x1d8690['$1']),_0x425c4e=_0xd9d583(_0x1785d2['$2']);}}else{if(_0x4dc025>0x0)this[_0x32aaa5(0x1b8)](_0x1486c6);delete this[_0x32aaa5(0x1e8)][_0x1486c6];}}},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x17c)]=function(_0x31f51e,_0xde9af5){const _0xe3261c=_0x5970c0;if(this[_0xe3261c(0x1e8)]===undefined)this[_0xe3261c(0x189)]();this['_skillCooldowns'][_0x31f51e]=this[_0xe3261c(0x1e8)][_0x31f51e]||0x0,this[_0xe3261c(0x223)](_0x31f51e,this[_0xe3261c(0x1e8)][_0x31f51e]+_0xde9af5);},Game_BattlerBase[_0x5970c0(0x220)]['applyCooldown']=function(_0x326302,_0x4b3e48){const _0x34e83c=_0x5970c0;_0x4b3e48=this[_0x34e83c(0x234)](_0x326302,_0x4b3e48,'COOLDOWN'),this[_0x34e83c(0x223)](_0x326302,Math[_0x34e83c(0x1ea)](_0x4b3e48,this[_0x34e83c(0x178)](_0x326302)));},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x22c)]=function(_0x30ca2e,_0x233ef0){const _0x24a668=_0x5970c0;for(const _0x5cc106 of this[_0x24a668(0x188)]()){if(_0x24a668(0x22b)!==_0x24a668(0x22b)){function _0x4d6b83(){const _0x1af335=_0x24a668;return _0x1e3a93['status']&&_0x1d80ff[_0x1af335(0x206)][_0x1af335(0x15d)]('['+_0x3056c9+']');}}else{if(_0x5cc106){const _0x344f14=DataManager[_0x24a668(0x1aa)](_0x5cc106);_0x344f14[_0x24a668(0x15d)](_0x30ca2e)&&this[_0x24a668(0x208)](_0x5cc106['id'],_0x233ef0);}}}},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x187)]=function(_0x389ffc){const _0x58f72d=_0x5970c0;for(const _0x549bbc of this[_0x58f72d(0x188)]()){if(_0x549bbc){if('hnvgX'===_0x58f72d(0x1be)){function _0x27afed(){const _0x2336f5=_0x58f72d;if(this[_0x2336f5(0x201)]()===_0x4e15ac)return!![];if(this[_0x2336f5(0x221)]()===_0x197d1b)return!![];const _0x146a31=_0x7f58be[_0x955b1e];if(_0x146a31&&_0x146a31[_0x2336f5(0x1c4)]['match'](/<BYPASS WARMUPS>/i))return!![];if(_0x146a31&&_0x146a31['name']['toUpperCase']()===_0x2336f5(0x20d))return!![];return![];}}else this[_0x58f72d(0x208)](_0x549bbc['id'],_0x389ffc);}}},Game_BattlerBase['prototype'][_0x5970c0(0x1e0)]=function(_0x390169){const _0x2d0d44=_0x5970c0;_0x390169=_0x390169||0x1;for(const _0x56a7e7 in this[_0x2d0d44(0x1e8)]){const _0x1d1d2a=this[_0x2d0d44(0x1e8)][_0x56a7e7]||0x0;this[_0x2d0d44(0x1e8)][_0x56a7e7]-=_0x390169,this[_0x2d0d44(0x161)](_0x56a7e7);if(this[_0x2d0d44(0x1e8)][_0x56a7e7]<=0x0){if(_0x1d1d2a>0x0)this[_0x2d0d44(0x1b8)](_0x56a7e7);delete this[_0x2d0d44(0x1e8)][_0x56a7e7];}}},Game_BattlerBase['prototype'][_0x5970c0(0x180)]=function(){const _0x1f4d14=_0x5970c0;this[_0x1f4d14(0x21a)]={};},Game_BattlerBase[_0x5970c0(0x220)]['warmup']=function(_0x4821a3){const _0x103adf=_0x5970c0;return this[_0x103adf(0x18c)](_0x4821a3)+this[_0x103adf(0x178)](_0x4821a3);},Game_BattlerBase[_0x5970c0(0x220)]['rawWarmup']=function(_0x18c823){const _0x4be6c8=_0x5970c0;if(this[_0x4be6c8(0x21a)]===undefined)this[_0x4be6c8(0x189)]();if(this['isBypassWarmups']())return 0x0;return this[_0x4be6c8(0x21a)][_0x18c823]||0x0;},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x157)]=function(_0x4f07df){const _0x12f45c=_0x5970c0;if(this[_0x12f45c(0x201)]()===_0x4f07df)return!![];if(this['guardSkillId']()===_0x4f07df)return!![];const _0x86033c=$dataSkills[_0x4f07df];if(_0x86033c&&_0x86033c[_0x12f45c(0x1c4)][_0x12f45c(0x1d8)](/<BYPASS WARMUPS>/i))return!![];if(_0x86033c&&_0x86033c['name'][_0x12f45c(0x202)]()===_0x12f45c(0x20d))return!![];return![];},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x179)]=function(_0x8b189c){const _0x4aefa9=_0x5970c0;if(!$gameParty[_0x4aefa9(0x170)]())return;const _0x47885b=VisuMZ[_0x4aefa9(0x1ac)][_0x4aefa9(0x218)][_0x4aefa9(0x209)];if(_0x47885b[_0x4aefa9(0x1ed)])_0x47885b['OnUpdateJS'][_0x4aefa9(0x222)](this,_0x8b189c);VisuMZ[_0x4aefa9(0x1ac)][_0x4aefa9(0x16b)][_0x8b189c]&&VisuMZ[_0x4aefa9(0x1ac)]['onWarmupUpdateJS'][_0x8b189c][_0x4aefa9(0x222)](this,_0x8b189c);},Game_BattlerBase['prototype'][_0x5970c0(0x1bf)]=function(_0x240aff){const _0x541f19=_0x5970c0;if(!$gameParty[_0x541f19(0x170)]())return;const _0x4367ae=VisuMZ['SkillCooldowns']['Settings']['Warmup'];if(_0x4367ae[_0x541f19(0x17f)])_0x4367ae[_0x541f19(0x17f)][_0x541f19(0x222)](this,_0x240aff);},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x19c)]=function(_0x5a1f3a,_0xd28f9a){const _0x196e4e=_0x5970c0;if(this[_0x196e4e(0x21a)]===undefined)this['initSkillCooldowns']();if(this[_0x196e4e(0x157)](_0x5a1f3a))return;_0xd28f9a=Math[_0x196e4e(0x1a5)](_0xd28f9a),_0xd28f9a=_0xd28f9a[_0x196e4e(0x1bc)](0x0,VisuMZ[_0x196e4e(0x1ac)][_0x196e4e(0x218)]['Warmup'][_0x196e4e(0x1e5)]);const _0x28232c=this[_0x196e4e(0x18c)](_0x5a1f3a);;this['_skillWarmups'][_0x5a1f3a]=_0xd28f9a;if(this['_skillWarmups'][_0x5a1f3a]<=0x0){if(_0x196e4e(0x235)===_0x196e4e(0x1c1)){function _0x5afa95(){const _0x7f4b52=_0x196e4e,_0x324118=_0x22fbd9['getSkillTypes'](_0x436e03);_0x324118['includes'](_0x5c0b2a)&&this[_0x7f4b52(0x245)]()[_0x7f4b52(0x231)](_0x1b8f65['id'],_0x439406);}}else{if(_0x28232c>0x0)this['onWarmupReady'](_0x5a1f3a);delete this[_0x196e4e(0x21a)][_0x5a1f3a];}}},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x231)]=function(_0x261e80,_0xbb9f7d){const _0x4b0c92=_0x5970c0;if(this[_0x4b0c92(0x21a)]===undefined)this['initSkillCooldowns']();this[_0x4b0c92(0x21a)][_0x261e80]=this[_0x4b0c92(0x21a)][_0x261e80]||0x0;if(this[_0x4b0c92(0x22d)](_0x261e80)<=0x0)return;this[_0x4b0c92(0x19c)](_0x261e80,this[_0x4b0c92(0x21a)][_0x261e80]+_0xbb9f7d);},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x22a)]=function(_0x3cb2b1,_0x552616){const _0x30e3da=_0x5970c0;_0x552616=this[_0x30e3da(0x234)](_0x3cb2b1,_0x552616,_0x30e3da(0x1cc)),this[_0x30e3da(0x19c)](_0x3cb2b1,Math[_0x30e3da(0x1ea)](_0x552616,this['warmup'](_0x3cb2b1)));},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x1fe)]=function(_0x11aa4f){const _0x27674c=_0x5970c0;_0x11aa4f=_0x11aa4f||0x1;for(const _0x35376e in this[_0x27674c(0x21a)]){const _0x20e210=this['_skillWarmups'][_0x35376e]||0x0;this[_0x27674c(0x21a)][_0x35376e]-=_0x11aa4f;if(this[_0x27674c(0x21a)][_0x35376e]<=0x0){if(_0x27674c(0x225)!==_0x27674c(0x225)){function _0x453b69(){const _0x3712a3=_0x27674c;if(_0x16cc6c>0x0)this[_0x3712a3(0x1b8)](_0x438467);delete this['_skillCooldowns'][_0x42dd3b];}}else{if(_0x20e210>0x0)this['onWarmupReady'](_0x35376e);delete this[_0x27674c(0x21a)][_0x35376e];}}}},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x21d)]=Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x199)],Game_BattlerBase[_0x5970c0(0x220)]['meetsSkillConditions']=function(_0x1689e6){const _0x15c247=_0x5970c0;if(!VisuMZ[_0x15c247(0x1ac)][_0x15c247(0x21d)][_0x15c247(0x222)](this,_0x1689e6))return![];if(!this['areSkillWarmupsReady'](_0x1689e6))return![];if(!this['areSkillCooldownsReady'](_0x1689e6))return![];return!![];},Game_BattlerBase['prototype'][_0x5970c0(0x207)]=function(_0xdf6ee8){const _0x4264bc=_0x5970c0;return this[_0x4264bc(0x18c)](_0xdf6ee8['id'])<=0x0;},Game_BattlerBase['prototype'][_0x5970c0(0x160)]=function(_0xbbd7ea){const _0x496ab6=_0x5970c0;return this[_0x496ab6(0x178)](_0xbbd7ea['id'])<=0x0;},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x21f)]=Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x1cd)],Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x1cd)]=function(_0x18e7f9){const _0x207597=_0x5970c0;VisuMZ['SkillCooldowns'][_0x207597(0x21f)][_0x207597(0x222)](this,_0x18e7f9),this['paySkillCooldown'](_0x18e7f9);},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x1db)]=function(_0x3c36c7){const _0x15a98d=_0x5970c0;if(!$gameParty[_0x15a98d(0x170)]())return;const _0x530e4b=_0x3c36c7['note'];_0x530e4b[_0x15a98d(0x1d8)](/<COOLDOWN:[ ](\d+)>/i)&&this[_0x15a98d(0x208)](_0x3c36c7['id'],Number(RegExp['$1']));if(VisuMZ[_0x15a98d(0x1ac)][_0x15a98d(0x1b6)][_0x3c36c7['id']]){if(_0x15a98d(0x228)===_0x15a98d(0x228))VisuMZ[_0x15a98d(0x1ac)][_0x15a98d(0x1b6)][_0x3c36c7['id']]['call'](this,_0x3c36c7);else{function _0x84fe4f(){const _0x4885e5=_0x15a98d;for(const _0x348332 of _0x36580c){let _0x2cc06d=0x0,_0x5e6514=0x0;if(_0x348332[_0x4885e5(0x1d8)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x2cc06d=_0x13f70d(_0x5f9790['$1']),_0x5e6514=_0x154627(_0x272528['$2']);else _0x348332[_0x4885e5(0x1d8)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x2cc06d=_0x20b8ed[_0x4885e5(0x1eb)](_0x40a947['$1']),_0x5e6514=_0x4a6464(_0x4bc4eb['$2']));_0x37fd4b[_0x4885e5(0x17c)](_0x2cc06d,_0x5e6514);}}}}const _0x59a8ca=_0x530e4b[_0x15a98d(0x1d8)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x59a8ca)for(const _0x226c77 of _0x59a8ca){let _0x3f180f=0x0,_0x4557e9=0x0;if(_0x226c77[_0x15a98d(0x1d8)](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x3f180f=Number(RegExp['$1']),_0x4557e9=Number(RegExp['$2']);else _0x226c77['match'](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x3f180f=DataManager[_0x15a98d(0x1eb)](RegExp['$1']),_0x4557e9=Number(RegExp['$2']));const _0x32015d=$dataSkills[_0x3f180f];if(_0x32015d){if(_0x15a98d(0x1ba)===_0x15a98d(0x153)){function _0x108b53(){_0x4bfb49=_0x7eb15c(_0x4bd06f['$1']),_0x1d1832=_0x1bca50(_0x9c6c74['$2']);}}else this['applyCooldown'](_0x32015d['id'],_0x4557e9);}}const _0x7417fa=_0x530e4b[_0x15a98d(0x1d8)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x7417fa)for(const _0x4e3a8f of _0x7417fa){let _0x8b3d5e=0x0,_0x28eef8=0x0;if(_0x4e3a8f[_0x15a98d(0x1d8)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x8b3d5e=Number(RegExp['$1']),_0x28eef8=Number(RegExp['$2']);else _0x4e3a8f[_0x15a98d(0x1d8)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x8b3d5e=DataManager[_0x15a98d(0x1fb)](RegExp['$1']),_0x28eef8=Number(RegExp['$2']));this[_0x15a98d(0x22c)](_0x8b3d5e,_0x28eef8);}if(_0x530e4b[_0x15a98d(0x1d8)](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){const _0x5686ee=Number(RegExp['$1']);this[_0x15a98d(0x187)](_0x5686ee);}},Game_BattlerBase[_0x5970c0(0x220)][_0x5970c0(0x234)]=function(_0x40a6b3,_0x4697d9,_0xb79a18){const _0x2511b5=_0x5970c0,_0x227728=$dataSkills[_0x40a6b3];if(!_0x227728)return _0x4697d9;const _0x1de784=this['applyCDWUnotetagsFlat'](_0x227728,_0xb79a18,_0x2511b5(0x1c3)),_0x8a2c0c=this[_0x2511b5(0x239)](_0x227728,_0xb79a18,_0x2511b5(0x1b9)),_0x7a3b05=this[_0x2511b5(0x240)](_0x227728,_0xb79a18,_0x2511b5(0x1f3));return Math[_0x2511b5(0x1a5)]((_0x4697d9+_0x1de784)*_0x8a2c0c+_0x7a3b05);},VisuMZ['SkillCooldowns']['RegExp']={},Game_BattlerBase['prototype'][_0x5970c0(0x240)]=function(_0xdff132,_0x337c1c,_0x98e325){const _0xf9eb47=_0x5970c0,_0xaadd9a=_0xdff132['id'],_0x34b914=_0xdff132['name'][_0xf9eb47(0x1ee)](),_0x186005=VisuMZ[_0xf9eb47(0x1ac)]['RegExp'],_0x30ab7a=_0xf9eb47(0x219)[_0xf9eb47(0x23f)](_0xaadd9a,_0x337c1c,_0x98e325);_0x186005[_0x30ab7a]=_0x186005[_0x30ab7a]||{};const _0x40dded=_0xf9eb47(0x196);_0x186005[_0x30ab7a][_0xf9eb47(0x15e)]=_0x186005[_0x30ab7a][_0xf9eb47(0x15e)]||new RegExp(_0x40dded[_0xf9eb47(0x23f)](_0xaadd9a,_0x337c1c,_0x98e325),'i'),_0x186005[_0x30ab7a][_0xf9eb47(0x23e)]=_0x186005[_0x30ab7a][_0xf9eb47(0x23e)]||new RegExp(_0x40dded[_0xf9eb47(0x23f)](_0x34b914,_0x337c1c,_0x98e325),'i');const _0xfdeee=DataManager[_0xf9eb47(0x1aa)](_0xdff132);for(const _0x1c83d9 of _0xfdeee){const _0x4d3533=_0xf9eb47(0x1d0)[_0xf9eb47(0x23f)](_0x1c83d9,_0x337c1c,_0x98e325);let _0x4ea392=$dataSystem['skillTypes'][Number(_0x1c83d9)][_0xf9eb47(0x202)]()['trim']();_0x4ea392=_0x4ea392[_0xf9eb47(0x1b1)](/\x1I\[(\d+)\]/gi,''),_0x4ea392=_0x4ea392[_0xf9eb47(0x1b1)](/\\I\[(\d+)\]/gi,''),_0x186005[_0x4d3533]=_0x186005[_0x4d3533]||{};const _0xd129d8=_0xf9eb47(0x169);_0x186005[_0x4d3533]['notetag1']=_0x186005[_0x4d3533]['notetag1']||new RegExp(_0xd129d8['format'](_0x1c83d9,_0x337c1c,_0x98e325),'i'),_0x186005[_0x4d3533][_0xf9eb47(0x23e)]=_0x186005[_0x4d3533][_0xf9eb47(0x23e)]||new RegExp(_0xd129d8[_0xf9eb47(0x23f)](_0x4ea392,_0x337c1c,_0x98e325),'i');}const _0x4dd9c8=_0xf9eb47(0x236),_0x5e9ae1=_0xf9eb47(0x1a3)[_0xf9eb47(0x23f)](_0x337c1c,_0x98e325);_0x186005[_0x5e9ae1]=_0x186005[_0x5e9ae1]||new RegExp(_0x4dd9c8[_0xf9eb47(0x23f)](_0x337c1c,_0x98e325),'i');const _0x489e08=(_0x345ef5,_0x27b125)=>{const _0xbf84fa=_0xf9eb47;if(_0xbf84fa(0x16f)===_0xbf84fa(0x16f)){if(!_0x27b125)return _0x345ef5;const _0x51b312=_0x27b125[_0xbf84fa(0x1c4)];if(_0x51b312[_0xbf84fa(0x1d8)](_0x186005[_0x30ab7a]['notetag1'])){var _0x411973=Number(RegExp['$1']);_0x345ef5+=_0x411973;}if(_0x51b312[_0xbf84fa(0x1d8)](_0x186005[_0x30ab7a]['notetag2'])){if(_0xbf84fa(0x1a7)!==_0xbf84fa(0x1a7)){function _0x170ffd(){const _0x2667e0=_0xbf84fa;this['subject']()[_0x2667e0(0x17c)](_0x165da1['id'],_0x264c16);}}else{var _0x411973=Number(RegExp['$1']);_0x345ef5+=_0x411973;}}for(const _0x45b809 of _0xfdeee){const _0x47183f=_0xbf84fa(0x1d0)[_0xbf84fa(0x23f)](_0x45b809,_0x337c1c,_0x98e325);if(_0x51b312['match'](_0x186005[_0x47183f][_0xbf84fa(0x15e)])){var _0x411973=Number(RegExp['$1']);_0x345ef5+=_0x411973;}if(_0x51b312[_0xbf84fa(0x1d8)](_0x186005[_0x47183f][_0xbf84fa(0x23e)])){var _0x411973=Number(RegExp['$1']);_0x345ef5+=_0x411973;}}if(_0x51b312['match'](_0x186005[_0x5e9ae1])){if(_0xbf84fa(0x1de)!==_0xbf84fa(0x1de)){function _0xef5d0c(){const _0x53f9fd=_0xbf84fa;this[_0x53f9fd(0x245)]()[_0x53f9fd(0x231)](_0x1eaecc['id'],_0xb108e1);}}else{var _0x411973=Number(RegExp['$1']);_0x345ef5+=_0x411973;}}return _0x345ef5;}else{function _0x6f073(){const _0xea1242=_0xbf84fa;this[_0xea1242(0x245)]()[_0xea1242(0x17c)](_0x9f43ea['id'],_0x21bfcc);}}};return this['traitObjects']()['reduce'](_0x489e08,0x0);},Game_BattlerBase[_0x5970c0(0x220)]['applyCDWUnotetagsRate']=function(_0x1ca644,_0x449828,_0x2de8cc){const _0x1b8619=_0x5970c0,_0x2961f9=_0x1ca644['id'],_0x4671cc=_0x1ca644[_0x1b8619(0x191)][_0x1b8619(0x1ee)](),_0x2b3360=VisuMZ[_0x1b8619(0x1ac)][_0x1b8619(0x14e)],_0x345195=_0x1b8619(0x1fd),_0x3a46ff=_0x1b8619(0x156),_0x353787=_0x1b8619(0x219)[_0x1b8619(0x23f)](_0x2961f9,_0x449828,_0x2de8cc);_0x2b3360[_0x353787]=_0x2b3360[_0x353787]||{};const _0xd025a5='<SKILL\x20%1\x20%2\x20%3:[\x20]%4>';_0x2b3360[_0x353787]['notetag1']=_0x2b3360[_0x353787][_0x1b8619(0x15e)]||new RegExp(_0xd025a5[_0x1b8619(0x23f)](_0x2961f9,_0x449828,_0x2de8cc,_0x345195),'i'),_0x2b3360[_0x353787][_0x1b8619(0x23e)]=_0x2b3360[_0x353787][_0x1b8619(0x23e)]||new RegExp(_0xd025a5[_0x1b8619(0x23f)](_0x4671cc,_0x449828,_0x2de8cc,_0x345195),'i'),_0x2b3360[_0x353787][_0x1b8619(0x194)]=_0x2b3360[_0x353787][_0x1b8619(0x194)]||new RegExp(_0xd025a5[_0x1b8619(0x23f)](_0x2961f9,_0x449828,_0x2de8cc,_0x3a46ff),'i'),_0x2b3360[_0x353787]['notetag4']=_0x2b3360[_0x353787]['notetag4']||new RegExp(_0xd025a5[_0x1b8619(0x23f)](_0x4671cc,_0x449828,_0x2de8cc,_0x3a46ff),'i');const _0x5b4ee7=DataManager[_0x1b8619(0x1aa)](_0x1ca644);for(const _0x30b23b of _0x5b4ee7){if(_0x1b8619(0x1bb)==='fGMnN'){const _0x46c645='Stype_%1_%2_%3'['format'](_0x30b23b,_0x449828,_0x2de8cc);let _0x3f2c31=$dataSystem[_0x1b8619(0x173)][Number(_0x30b23b)][_0x1b8619(0x202)]()[_0x1b8619(0x1ee)]();_0x3f2c31=_0x3f2c31[_0x1b8619(0x1b1)](/\x1I\[(\d+)\]/gi,''),_0x3f2c31=_0x3f2c31['replace'](/\\I\[(\d+)\]/gi,''),_0x2b3360[_0x46c645]=_0x2b3360[_0x46c645]||{};const _0x212ac4='<STYPE\x20%1\x20%2\x20%3:[\x20]%4>';_0x2b3360[_0x46c645]['notetag1']=_0x2b3360[_0x46c645]['notetag1']||new RegExp(_0x212ac4[_0x1b8619(0x23f)](_0x30b23b,_0x449828,_0x2de8cc,_0x345195),'i'),_0x2b3360[_0x46c645][_0x1b8619(0x23e)]=_0x2b3360[_0x46c645][_0x1b8619(0x23e)]||new RegExp(_0x212ac4['format'](_0x3f2c31,_0x449828,_0x2de8cc,_0x345195),'i'),_0x2b3360[_0x46c645][_0x1b8619(0x194)]=_0x2b3360[_0x46c645][_0x1b8619(0x194)]||new RegExp(_0x212ac4[_0x1b8619(0x23f)](_0x30b23b,_0x449828,_0x2de8cc,_0x3a46ff),'i'),_0x2b3360[_0x46c645][_0x1b8619(0x192)]=_0x2b3360[_0x46c645][_0x1b8619(0x192)]||new RegExp(_0x212ac4[_0x1b8619(0x23f)](_0x3f2c31,_0x449828,_0x2de8cc,_0x3a46ff),'i');}else{function _0x20bf90(){var _0xd85af6=_0x432daa(_0x39e25e['$1'])/0x64;_0x4168d2*=_0xd85af6;}}}const _0x5cca8c=_0x1b8619(0x20b),_0x4cebf3=_0x1b8619(0x1a3)['format'](_0x449828,_0x2de8cc);_0x2b3360[_0x4cebf3]=_0x2b3360[_0x4cebf3]||{},_0x2b3360[_0x4cebf3][_0x1b8619(0x15e)]=_0x2b3360[_0x4cebf3][_0x1b8619(0x15e)]||new RegExp(_0x5cca8c[_0x1b8619(0x23f)](_0x449828,_0x2de8cc,_0x345195),'i'),_0x2b3360[_0x4cebf3][_0x1b8619(0x23e)]=_0x2b3360[_0x4cebf3][_0x1b8619(0x23e)]||new RegExp(_0x5cca8c[_0x1b8619(0x23f)](_0x449828,_0x2de8cc,_0x3a46ff),'i');const _0x2c0e49=(_0x839ff4,_0x7790d0)=>{const _0x5c7642=_0x1b8619;if(!_0x7790d0)return _0x839ff4;const _0x5c4595=_0x7790d0[_0x5c7642(0x1c4)];if(_0x5c4595['match'](_0x2b3360[_0x353787][_0x5c7642(0x15e)])){if(_0x5c7642(0x224)!==_0x5c7642(0x1f5)){var _0x593306=Number(RegExp['$1'])/0x64;_0x839ff4*=_0x593306;}else{function _0x2830c6(){const _0x40cc6a=_0x5c7642;let _0x4da631=0x0,_0x3df046=0x0;if(_0x2bf923[_0x40cc6a(0x1d8)](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x4da631=_0x8d4391(_0x31ea35['$1']),_0x3df046=_0x271afd(_0x5eb027['$2']);else _0x4fffe3[_0x40cc6a(0x1d8)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x4da631=_0x1643e7[_0x40cc6a(0x1eb)](_0x334a70['$1']),_0x3df046=_0x429622(_0x30c72d['$2']));const _0x379a5f=_0x5d5134[_0x4da631];_0x379a5f&&this[_0x40cc6a(0x208)](_0x379a5f['id'],_0x3df046);}}}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x353787]['notetag2'])){var _0x593306=Number(RegExp['$1'])/0x64;_0x839ff4*=_0x593306;}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x353787]['notetag3'])){if(_0x5c7642(0x19e)!==_0x5c7642(0x19e)){function _0x57db40(){const _0x51a2be=_0x5c7642;if(_0x5ec48e){const _0x3e7b9e=_0x24fe7f[_0x51a2be(0x1aa)](_0x58e39f);_0x3e7b9e[_0x51a2be(0x15d)](_0x512d49)&&this[_0x51a2be(0x245)]()[_0x51a2be(0x231)](_0x225dfb['id'],_0x58b0f3);}}}else{var _0x593306=Number(RegExp['$1']);_0x839ff4*=_0x593306;}}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x353787][_0x5c7642(0x192)])){var _0x593306=Number(RegExp['$1']);_0x839ff4*=_0x593306;}for(const _0x40975c of _0x5b4ee7){const _0x2f2afa=_0x5c7642(0x1d0)[_0x5c7642(0x23f)](_0x40975c,_0x449828,_0x2de8cc);if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x2f2afa][_0x5c7642(0x15e)])){var _0x593306=Number(RegExp['$1'])/0x64;_0x839ff4*=_0x593306;}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x2f2afa][_0x5c7642(0x23e)])){if(_0x5c7642(0x16c)==='ZhBPs'){var _0x593306=Number(RegExp['$1'])/0x64;_0x839ff4*=_0x593306;}else{function _0x744800(){_0x2e6920=_0x21c10b(_0x563cd4['$1']),_0x195e3f=_0x2d4689(_0x39001c['$2']);}}}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x2f2afa][_0x5c7642(0x194)])){if(_0x5c7642(0x20f)==='WorRu'){var _0x593306=Number(RegExp['$1']);_0x839ff4*=_0x593306;}else{function _0x5ae8eb(){const _0x12c06c=_0x5c7642;_0x11e6e2[_0x12c06c(0x231)](_0x53a809['id'],_0x46c1a4);}}}if(_0x5c4595['match'](_0x2b3360[_0x2f2afa][_0x5c7642(0x192)])){var _0x593306=Number(RegExp['$1']);_0x839ff4*=_0x593306;}}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x4cebf3][_0x5c7642(0x15e)])){if(_0x5c7642(0x1bd)!==_0x5c7642(0x184)){var _0x593306=Number(RegExp['$1'])/0x64;_0x839ff4*=_0x593306;}else{function _0x148f61(){_0x553a65=_0x5b4fc5['getStypeIdWithName'](_0xf5d224['$1']),_0x503847=_0x54412c(_0xe399d5['$2']);}}}if(_0x5c4595[_0x5c7642(0x1d8)](_0x2b3360[_0x4cebf3][_0x5c7642(0x23e)])){var _0x593306=Number(RegExp['$1']);_0x839ff4*=_0x593306;}return _0x839ff4;};return this[_0x1b8619(0x158)]()['reduce'](_0x2c0e49,0x1);},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x21e)]=Game_Battler['prototype']['onBattleStart'],Game_Battler['prototype'][_0x5970c0(0x152)]=function(_0x4b8f12){const _0x5164c3=_0x5970c0;VisuMZ['SkillCooldowns'][_0x5164c3(0x21e)][_0x5164c3(0x222)](this,_0x4b8f12),this['clearCooldowns'](),this[_0x5164c3(0x180)](),this[_0x5164c3(0x1e6)](_0x4b8f12);},Game_Battler['prototype'][_0x5970c0(0x1e6)]=function(_0x435150){const _0x320ea3=_0x5970c0;for(const _0x13d008 of this[_0x320ea3(0x188)]()){if(!_0x13d008)continue;const _0x4aba6b=_0x13d008['id'],_0x204a1c=_0x13d008[_0x320ea3(0x1c4)];if(_0x204a1c[_0x320ea3(0x1d8)](/<WARMUP:[ ](\d+)>/i)){if(_0x320ea3(0x15c)==='UmpkZ')this[_0x320ea3(0x22a)](_0x4aba6b,Number(RegExp['$1']));else{function _0x22fbcb(){const _0x23a182=_0x320ea3;if(!_0x1aafa4[_0x23a182(0x170)]())return;const _0x431b52=_0x2424f6['SkillCooldowns'][_0x23a182(0x218)]['Warmup'];if(_0x431b52[_0x23a182(0x17f)])_0x431b52[_0x23a182(0x17f)][_0x23a182(0x222)](this,_0x42a441);}}}if(VisuMZ[_0x320ea3(0x1ac)][_0x320ea3(0x193)][_0x13d008['id']]){if('eOqTx'!==_0x320ea3(0x1d2))VisuMZ[_0x320ea3(0x1ac)][_0x320ea3(0x193)][_0x13d008['id']][_0x320ea3(0x222)](this,_0x13d008);else{function _0x50908e(){var _0x60a1bc=_0x20878d(_0x105f24['$1']);_0x4b735c*=_0x60a1bc;}}}}if(_0x435150){const _0x1f2695=VisuMZ[_0x320ea3(0x1ac)][_0x320ea3(0x218)][_0x320ea3(0x209)][_0x320ea3(0x210)]||0x0;this['updateWarmups'](_0x1f2695);}},Game_Battler[_0x5970c0(0x220)][_0x5970c0(0x1d6)]=function(){const _0x42e2b0=_0x5970c0;if(this[_0x42e2b0(0x162)])return;if(this['_instantCast'])return;this[_0x42e2b0(0x162)]=!![],this[_0x42e2b0(0x1e0)](),this[_0x42e2b0(0x1fe)]();},VisuMZ['SkillCooldowns'][_0x5970c0(0x15a)]=Game_Battler[_0x5970c0(0x220)][_0x5970c0(0x226)],Game_Battler[_0x5970c0(0x220)][_0x5970c0(0x226)]=function(){const _0x54ee1d=_0x5970c0;this[_0x54ee1d(0x162)]=![],VisuMZ[_0x54ee1d(0x1ac)][_0x54ee1d(0x15a)]['call'](this);},VisuMZ[_0x5970c0(0x1ac)][_0x5970c0(0x1f2)]=Game_Battler['prototype'][_0x5970c0(0x15f)],Game_Battler[_0x5970c0(0x220)][_0x5970c0(0x15f)]=function(){const _0x372c19=_0x5970c0;VisuMZ['SkillCooldowns'][_0x372c19(0x1f2)][_0x372c19(0x222)](this),this[_0x372c19(0x1a0)](),this[_0x372c19(0x180)]();},VisuMZ['SkillCooldowns'][_0x5970c0(0x214)]=Window_Base[_0x5970c0(0x220)][_0x5970c0(0x1b0)],Window_Base[_0x5970c0(0x220)]['drawSkillCost']=function(_0x5ee8ee,_0x53e9d2,_0x949836,_0x52a03e,_0xaa6c4b){const _0xf0c1f5=_0x5970c0,_0x1da170=VisuMZ[_0xf0c1f5(0x1ac)][_0xf0c1f5(0x218)];if(_0x1da170[_0xf0c1f5(0x209)][_0xf0c1f5(0x163)]&&_0x5ee8ee[_0xf0c1f5(0x18c)](_0x53e9d2['id'])>0x0){if(_0xf0c1f5(0x23b)!==_0xf0c1f5(0x151))this['drawSkillWarmup'](_0x5ee8ee,_0x53e9d2,_0x949836,_0x52a03e,_0xaa6c4b);else{function _0x460e8f(){const _0x18824a=_0xf0c1f5,_0x10034d=_0x235ee1(_0x264a4a['$1']),_0x4f7334=_0x4388b5['format'](_0x10034d);_0x145777[_0x18824a(0x1ac)]['onCooldownReadyJS'][_0x314d0c['id']]=new _0x569e19(_0x4f7334);}}}else _0x1da170[_0xf0c1f5(0x16d)][_0xf0c1f5(0x163)]&&_0x5ee8ee[_0xf0c1f5(0x178)](_0x53e9d2['id'])>0x0?this[_0xf0c1f5(0x244)](_0x5ee8ee,_0x53e9d2,_0x949836,_0x52a03e,_0xaa6c4b):VisuMZ[_0xf0c1f5(0x1ac)][_0xf0c1f5(0x214)]['call'](this,_0x5ee8ee,_0x53e9d2,_0x949836,_0x52a03e,_0xaa6c4b);},Window_Base[_0x5970c0(0x220)]['drawSkillWarmup']=function(_0x460203,_0x2a8d60,_0x4789d5,_0x401d82,_0x8f21a9){const _0x30ea32=_0x5970c0,_0xfa72ec=VisuMZ[_0x30ea32(0x1ac)][_0x30ea32(0x218)][_0x30ea32(0x209)];let _0x2b7640='';_0x2b7640+=_0x30ea32(0x1dc)[_0x30ea32(0x23f)](_0xfa72ec[_0x30ea32(0x19a)]);const _0x2299c6=_0xfa72ec[_0x30ea32(0x1f4)];if(_0x2299c6['match'](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']){if(_0x30ea32(0x216)===_0x30ea32(0x216))_0x2b7640+=_0x30ea32(0x18d)[_0x30ea32(0x23f)](String(RegExp['$1']));else{function _0x373e62(){const _0x2131cb=_0x30ea32;_0x30fddd[_0x2131cb(0x1ac)][_0x2131cb(0x1c2)][_0x444843]['call'](this,_0x14f16f);}}}else _0x2b7640+='\x5cC[%1]'[_0x30ea32(0x23f)](_0x2299c6);const _0x14eaf7=_0x460203[_0x30ea32(0x22d)](_0x2a8d60['id']),_0x3a8d9e=_0xfa72ec[_0x30ea32(0x177)]>0x0?_0x30ea32(0x233)[_0x30ea32(0x23f)](_0xfa72ec[_0x30ea32(0x177)]):'';_0x2b7640+=_0xfa72ec[_0x30ea32(0x18b)][_0x30ea32(0x23f)](_0x14eaf7,_0x3a8d9e);const _0x5aa854=this[_0x30ea32(0x1c5)](_0x2b7640,_0x4789d5,_0x401d82,_0x8f21a9),_0x5517fa=_0x4789d5+_0x8f21a9-_0x5aa854[_0x30ea32(0x172)];this[_0x30ea32(0x164)](_0x2b7640,_0x5517fa,_0x401d82,_0x8f21a9),this['resetFontSettings']();},Window_Base[_0x5970c0(0x220)][_0x5970c0(0x244)]=function(_0x30c23c,_0x15be06,_0x5ded01,_0x50680f,_0x15c532){const _0x357f67=_0x5970c0,_0x3f392f=VisuMZ[_0x357f67(0x1ac)][_0x357f67(0x218)][_0x357f67(0x16d)];let _0x453d07='';_0x453d07+=_0x357f67(0x1dc)[_0x357f67(0x23f)](_0x3f392f[_0x357f67(0x19a)]);const _0x53a7e0=_0x3f392f[_0x357f67(0x1f4)];if(_0x53a7e0[_0x357f67(0x1d8)](/#(.*)/i)&&Imported[_0x357f67(0x1f8)]){if('tYsgt'!==_0x357f67(0x171))_0x453d07+=_0x357f67(0x18d)[_0x357f67(0x23f)](String(RegExp['$1']));else{function _0x19796b(){const _0x4e49b2=_0x357f67;let _0xc22c0f=0x0,_0x585904=0x0;if(_0x47f145[_0x4e49b2(0x1d8)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0xc22c0f=_0x3caa66(_0x3aba7c['$1']),_0x585904=_0x2ff6f2(_0x1dc6fd['$2']);else _0x41296d['match'](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0xc22c0f=_0x24d9c2[_0x4e49b2(0x1eb)](_0x19e0e5['$1']),_0x585904=_0x569a0a(_0x3ad3e1['$2']));_0x528e68[_0x4e49b2(0x17c)](_0xc22c0f,_0x585904);}}}else _0x453d07+='\x5cC[%1]'[_0x357f67(0x23f)](_0x53a7e0);const _0x4aac5a=_0x30c23c[_0x357f67(0x178)](_0x15be06['id']),_0x4fae71=_0x3f392f[_0x357f67(0x177)]>0x0?_0x357f67(0x233)[_0x357f67(0x23f)](_0x3f392f['Icon']):'';_0x453d07+=_0x3f392f['TextFmt'][_0x357f67(0x23f)](_0x4aac5a,_0x4fae71);const _0x22e239=this[_0x357f67(0x1c5)](_0x453d07,_0x5ded01,_0x50680f,_0x15c532),_0xaff608=_0x5ded01+_0x15c532-_0x22e239[_0x357f67(0x172)];this[_0x357f67(0x164)](_0x453d07,_0xaff608,_0x50680f,_0x15c532),this[_0x357f67(0x1a6)]();};