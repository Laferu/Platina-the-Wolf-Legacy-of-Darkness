//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.16] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * - VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills and uses them in order as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
 * 
 * ---
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - Replace 'x' and 'y' with any of the following:
 *
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
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
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
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
 * @param BattleAI
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
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 */
//=============================================================================

const _0x14a3cf=_0x42b5;(function(_0x29a87f,_0x3b9f20){const _0x495de6=_0x42b5,_0xd31abf=_0x29a87f();while(!![]){try{const _0x2f619a=parseInt(_0x495de6(0x308))/0x1+-parseInt(_0x495de6(0x2f8))/0x2*(parseInt(_0x495de6(0x357))/0x3)+parseInt(_0x495de6(0x2ab))/0x4+-parseInt(_0x495de6(0x363))/0x5+parseInt(_0x495de6(0x341))/0x6*(parseInt(_0x495de6(0x2d7))/0x7)+parseInt(_0x495de6(0x266))/0x8*(parseInt(_0x495de6(0x38b))/0x9)+parseInt(_0x495de6(0x36e))/0xa*(-parseInt(_0x495de6(0x216))/0xb);if(_0x2f619a===_0x3b9f20)break;else _0xd31abf['push'](_0xd31abf['shift']());}catch(_0x7e10c9){_0xd31abf['push'](_0xd31abf['shift']());}}}(_0x2655,0x1f861));var label=_0x14a3cf(0x307),tier=tier||0x0,dependencies=[_0x14a3cf(0x21b)],pluginData=$plugins[_0x14a3cf(0x381)](function(_0x28d2c7){const _0x20c8b0=_0x14a3cf;return _0x28d2c7[_0x20c8b0(0x345)]&&_0x28d2c7[_0x20c8b0(0x33b)][_0x20c8b0(0x2f7)]('['+label+']');})[0x0];function _0x42b5(_0x19bdf4,_0x279507){const _0x26552f=_0x2655();return _0x42b5=function(_0x42b5ff,_0x5adcd7){_0x42b5ff=_0x42b5ff-0x1db;let _0x2d5f54=_0x26552f[_0x42b5ff];return _0x2d5f54;},_0x42b5(_0x19bdf4,_0x279507);}function _0x2655(){const _0x5332a7=['LJAPp','MDF','aiApplyMevTgrInfluenceRate','eOieF','aiApplyElementalTgrInfluenceRate','isConfused','HIGHEST','gambit','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','wNViU','Game_Troop_setup','PHA','POSITIVE','gUIQK','tSNGY','doesTargetMeetAnyConditions','iBinL','GLZYg','MAX_SAFE_INTEGER','MRG','isForDeadFriend','hasXParamAIKnowledge','_aiKnowledge','meetsHpCondition','mevRates','filterForcedTargeting','xparam','6629cgeJxD','aiStyle','apply','buff','MAXHP','eUYnI','opponentsUnit','ZDvmb','Game_Action_makeTargets','currentAction','hasForcedTargets','map','guardSkillId','ARRAYNUM','FIRST','MAT','DdKrT','return\x200','determineActionByAIisStillValid','abEBG','SZASU','GXHAx','value1','%1\x20%2\x20%3','deadMembers','reduce','gKhmC','applyBattleAI','CigPz','OizOc','friendsUnit','floor','includes','215740qZRuuS','Game_BattlerBase_sparam','ALWAYS','GzqXc','BattleManager_startAction','length','EFFECT_REMOVE_BUFF','attackSkillId','Jnzpx','NUM','MpDamage%1','LEVEL','EnemyAILevel','WNrWX','AddState%1','BattleAI','192511EvDZnG','Default','Game_Unit_initialize','wKTQk','HIT','addElementAIKnowledge','isPlaytest','APuBl','selectAllActionsClassic','ARRAYSTRUCT','tpRate','TP%','elementRates','TvfHy','_stateIDs','mevInfluenceRate','CNT','HRG','Game_Temp_initialize','elementInfluence','level','split','XSMsE','setSkill','makeAutoBattleActionsWithEnemyAI','LIlBt','mev','EVAL','Etuof','isStateAffected','mpRate','PDR','Settings','getAllConditions','highestTgrMember','EFFECT_RECOVER_MP','getAnyConditions','HuuEH','fMnqV','attackElements','FUNC','call','replace','RemoveState%1','eva','startAction','_elementIDs','EnemyRatingVariance','random','ActorStyleAI','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','description','Weight','tDaBF','getNextSubject','JSON','isConditionalAI','534eIkeZG','fTEOW','doesAIApplyEvaTgrInfluence','actorId','status','applyBattleAiTgrInfluences','isBuffAffected','MJNyz','endAction','elementKnowledgeRate','toLowerCase','autoRemovalTiming','createFilterTarget','UnknownElementRate','addAIKnowledge','mhp','ElementTgr','Game_Action_apply','AGI','enemyId','PACSe','meetsMpCondition','3UNooyC','aiEvaTgr','scykE','EnableAllCon','needsSelection','doesAIApplyElementalTgrInfluence','KpUpk','FRHYl','determineTargetActionByAIisStillValid','STRUCT','charAt','dataId','427970oouegm','value','randomInt','EuZZG','For\x20more\x20information,\x20view\x20the\x20help\x20file.','MXsAd','aiElementTgr','SBTlA','makeTargets','TCMvH','uZKiJ','2745830iykCYC','isForEveryone','MAXMP','mqXLd','slice','classic','clearAIKnowledge','aiApplyEvaTgrInfluenceRate','mmp','rating','MCR','aiLevel','XmyTv','ThyZH','EVA','bypassEvaTgr','eTbTQ','format','trim','filter','setup','is%1Affected','uNaoC','max','Game_Enemy_isActionValid','unvMr','debuff','aiMevTgr','REC','15417QBJfFW','_buffTurns','EFFECT_REMOVE_STATE','fDmNh','meetsSwitchCondition','noCondition','selectAllActions','BJIWa','_applyAIForcedTargetFilters','TRG','doesTargetMeetCondition','The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a','iFlHl','value2','isAggroAffected','ATK','GRD','parse','referenceEnemyForAI','hRhPA','actions','LUEIj','user','makeAutoBattleActions','DMVyh','log','aMoMa','sparam','nAwLh','LearnKnowledge','currentClass','setAiTgrInfluences','aHyps','QlmUM','getEnemyIdWithName','doesAIApplyMevTgrInfluence','_regexp','doesTargetMeetAllConditions','initBattleAI','exit','evaRates','canGuard','vszah','isPhysical','determineLineValue','bypassElementTgr','getDefaultAllConditions','ShuffleArray','cpFsi','_aiTgrInfluence','TTZZS','hjPid','elementIds','HpRecover%1','statesByCategory','SwwAX','getElementIdWithName','toUpperCase','bnPou','ARRAYEVAL','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','elementInfluenceRate','qGLxp','clearForcedTargets','isDetermineActionByAI','ITjav','OnSpotAI','_forceValidTargets','Game_Actor_makeAutoBattleActions','name','11jYmlWc','canAttack','EvaTgr','EnemyStyleAI','gtaMr','VisuMZ_1_BattleCore','MWErj','numActions','BattleManager_getNextSubject','ARRAYFUNC','MP%','AxJwi','forceValidTargets','Game_Action_itemTargetCandidates','VisuMZ_4_AggroControl','itemTargetCandidates','meetsPartyLevelCondition','GNHHy','turnCount','hasElementAIKnowledge','iUdPE','EvaTgrRate','Game_Unit_randomTarget','CRI','enemy','AddDebuff%1','FBozY','AddBuff%1','elementRate','param','wttJe','isMax%1Affected','AuKiw','VisuMZ_1_SkillsStatesCore','maxTp','jLviX','damage','IsgGK','WuyxU','isAutoBattle','MRF','actor','DCbYa','elements','determineNewValidAIAction','prototype','makeActions','forcedTargets','jedtF','remove','MDR','skillId','aiKnowledge','isForOpponent','JRPlJ','subject','isMagical','vkkhC','aiTarget','QFdkk','HpDrain%1','EFFECT_ADD_STATE','isActor','General','CJCdp','Game_Unit_aliveMembers','UTUBF','code','ktXKO','makeDefaultConditions','indexOf','getStateIdWithName','version','npWUx','initialize','jqusD','concat','passesAILevel','action','randomTarget','1032qKrTCN','clearAiTgrInfluence','SjeoU','doesTargetMeetAIConditions','ZSexy','hpRate','FlBJz','HpDamage%1','The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a','bypassMevTgr','isSkill','tggJk','meetsStateCondition','BattleManager_endAction','checkSkillTargets','effects','item','aiRatingVariance','dmkCl','mxjoH','casual','EzySh','BOUdv','ActorRatingVariance','setEnemyAction','VMDFX','UFmcy','selectAllActionsGambit','uEkQg','meetsCondition','Any','parameters','kbhKi','addXParamAIKnowledge','hxrSn','LUK','uyBBo','aiTgrInfluence','USER','clamp','EnableAnyCon','RemoveDebuff%1','MpRecover%1','yniXA','isTpb','push','getDefaultAnyConditions','mELRq','hasValidTargets','PExns','note','Game_Battler_turnCount','selectAllActionsRandom','states','ConvertParams','xgeoR','isActionValid','XCUFg','aliveMembers','meetsTurnCondition','uymNj','plEOf','_subject','All','LAST','match','eYTjp','elementId','makeValidTargets','397588uqJKSK','ElementTgrRate','vSBTO','Caexw','jjRpP','TGR','ActorAILevel','selectAction','isEnemy','_alertTurnCount','evaInfluenceRate','_stateTurns','NEGATIVE','DEF','xGGFR','qjaOp'];_0x2655=function(){return _0x5332a7;};return _0x2655();}VisuMZ[label][_0x14a3cf(0x328)]=VisuMZ[label][_0x14a3cf(0x328)]||{},VisuMZ[_0x14a3cf(0x29c)]=function(_0x42b2de,_0x2b2b51){const _0x5f3d77=_0x14a3cf;for(const _0x17bd60 in _0x2b2b51){if(_0x17bd60['match'](/(.*):(.*)/i)){const _0x4dfa2f=String(RegExp['$1']),_0x1fd8b9=String(RegExp['$2'])[_0x5f3d77(0x209)]()['trim']();let _0x3ec05b,_0x45d68a,_0x15d564;switch(_0x1fd8b9){case _0x5f3d77(0x301):_0x3ec05b=_0x2b2b51[_0x17bd60]!==''?Number(_0x2b2b51[_0x17bd60]):0x0;break;case _0x5f3d77(0x2e4):_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a['map'](_0x5111ae=>Number(_0x5111ae));break;case _0x5f3d77(0x323):_0x3ec05b=_0x2b2b51[_0x17bd60]!==''?eval(_0x2b2b51[_0x17bd60]):null;break;case _0x5f3d77(0x20b):_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a[_0x5f3d77(0x2e2)](_0x3023dd=>eval(_0x3023dd));break;case _0x5f3d77(0x33f):_0x3ec05b=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):'';break;case'ARRAYJSON':_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a['map'](_0x170120=>JSON[_0x5f3d77(0x1e1)](_0x170120));break;case _0x5f3d77(0x330):_0x3ec05b=_0x2b2b51[_0x17bd60]!==''?new Function(JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60])):new Function(_0x5f3d77(0x2e8));break;case _0x5f3d77(0x21f):_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a['map'](_0x59fa3f=>new Function(JSON[_0x5f3d77(0x1e1)](_0x59fa3f)));break;case'STR':_0x3ec05b=_0x2b2b51[_0x17bd60]!==''?String(_0x2b2b51[_0x17bd60]):'';break;case'ARRAYSTR':_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON['parse'](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a['map'](_0x5ba7e4=>String(_0x5ba7e4));break;case _0x5f3d77(0x360):_0x15d564=_0x2b2b51[_0x17bd60]!==''?JSON[_0x5f3d77(0x1e1)](_0x2b2b51[_0x17bd60]):{},_0x3ec05b=VisuMZ[_0x5f3d77(0x29c)]({},_0x15d564);break;case _0x5f3d77(0x311):_0x45d68a=_0x2b2b51[_0x17bd60]!==''?JSON['parse'](_0x2b2b51[_0x17bd60]):[],_0x3ec05b=_0x45d68a[_0x5f3d77(0x2e2)](_0x3b5664=>VisuMZ[_0x5f3d77(0x29c)]({},JSON[_0x5f3d77(0x1e1)](_0x3b5664)));break;default:continue;}_0x42b2de[_0x4dfa2f]=_0x3ec05b;}}return _0x42b2de;},(_0x3d88e4=>{const _0x3236b3=_0x14a3cf,_0x3dca3d=_0x3d88e4[_0x3236b3(0x215)];for(const _0x1ff74c of dependencies){if(_0x3236b3(0x203)!==_0x3236b3(0x246)){if(!Imported[_0x1ff74c]){if(_0x3236b3(0x27f)===_0x3236b3(0x27f)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3236b3(0x37f)](_0x3dca3d,_0x1ff74c)),SceneManager[_0x3236b3(0x1f7)]();break;}else{const _0x1943bf=_0x359138[_0x3236b3(0x25c)](_0x25174d);_0x4ad851=this[_0x3236b3(0x213)][0x0];for(const _0xc9b6ac of this[_0x3236b3(0x213)]){if(_0x304452&&_0xc9b6ac['sparam'](_0x1943bf)>_0x1518f6['sparam'](_0x1943bf))_0x2be613=_0xc9b6ac;if(_0x40ad75&&_0xc9b6ac['sparam'](_0x1943bf)<_0x4b39f9[_0x3236b3(0x1eb)](_0x1943bf))_0x44ab26=_0xc9b6ac;}return _0x570f05;}}}else{if(_0x5778fa&&_0x1b7aa7[_0x3236b3(0x29b)]()['length']>_0x3850d0[_0x3236b3(0x29b)]()['length'])_0x1db445=_0x32b2d6;if(_0x2c38d3&&_0x1e872c[_0x3236b3(0x29b)]()[_0x3236b3(0x2fd)]<_0x20843a[_0x3236b3(0x29b)]()[_0x3236b3(0x2fd)])_0x3b3cec=_0x1d434d;}}const _0x582fae=_0x3d88e4[_0x3236b3(0x33b)];if(_0x582fae[_0x3236b3(0x2a7)](/\[Version[ ](.*?)\]/i)){const _0x4a2187=Number(RegExp['$1']);_0x4a2187!==VisuMZ[label]['version']&&(alert(_0x3236b3(0x20c)[_0x3236b3(0x37f)](_0x3dca3d,_0x4a2187)),SceneManager[_0x3236b3(0x1f7)]());}if(_0x582fae[_0x3236b3(0x2a7)](/\[Tier[ ](\d+)\]/i)){const _0x328d57=Number(RegExp['$1']);_0x328d57<tier?(alert(_0x3236b3(0x2c3)['format'](_0x3dca3d,_0x328d57,tier)),SceneManager['exit']()):tier=Math[_0x3236b3(0x385)](_0x328d57,tier);}VisuMZ[_0x3236b3(0x29c)](VisuMZ[label][_0x3236b3(0x328)],_0x3d88e4[_0x3236b3(0x285)]);})(pluginData);function AIManager(){throw new Error('This\x20is\x20a\x20static\x20class');}AIManager['_regexp']={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x14a3cf(0x340)]=function(_0x34b687){const _0x51f689=_0x14a3cf;if(!_0x34b687)return![];return this[_0x51f689(0x329)](_0x34b687)[_0x51f689(0x2fd)]>0x0||this[_0x51f689(0x32c)](_0x34b687)['length']>0x0;},AIManager['getAllConditions']=function(_0x1bad03){const _0x476412=_0x14a3cf;if(_0x1bad03[_0x476412(0x298)]['match'](AIManager['_regexp'][_0x476412(0x390)]))return[];else return _0x1bad03['note'][_0x476412(0x2a7)](AIManager[_0x476412(0x1f4)]['allCondition'])?String(RegExp['$1'])['split'](/[\r\n]+/)[_0x476412(0x247)](''):this['getDefaultAllConditions'](_0x1bad03);},AIManager[_0x14a3cf(0x32c)]=function(_0x46144d){const _0x53408e=_0x14a3cf;if(_0x46144d['note'][_0x53408e(0x2a7)](AIManager[_0x53408e(0x1f4)]['noCondition'])){if(_0x53408e(0x315)===_0x53408e(0x315))return[];else{_0x43ca9d=this[_0x53408e(0x213)][0x0];for(const _0xcb86a6 of this['_forceValidTargets']){if(_0x3ea091&&_0xcb86a6['maxTp']()>_0x21849f['maxTp']())_0x3ee2ce=_0xcb86a6;if(_0x2bbd65&&_0xcb86a6[_0x53408e(0x238)]()<_0x44dadd[_0x53408e(0x238)]())_0x195390=_0xcb86a6;}return _0x3b8d14;}}else{if(_0x46144d[_0x53408e(0x298)][_0x53408e(0x2a7)](AIManager[_0x53408e(0x1f4)]['anyCondition'])){if(_0x53408e(0x33d)===_0x53408e(0x202)){if(!_0x4c04fe['BattleAI'][_0x53408e(0x328)][_0x53408e(0x255)][_0x53408e(0x1ed)])return!![];const _0x2320e0=_0x59c608[_0x53408e(0x2a7)](/EVA/i)?_0x53408e(0x1f8):_0x53408e(0x2d4);this[_0x53408e(0x24a)]()[_0x2320e0]=this[_0x53408e(0x24a)]()[_0x2320e0]||[];const _0x1e3d36=_0x39069a['isActor']()?_0x521a45[_0x53408e(0x344)]():_0x3b4450['enemyId']();return this[_0x53408e(0x24a)]()[_0x2320e0][_0x53408e(0x2f7)](_0x1e3d36);}else return String(RegExp['$1'])[_0x53408e(0x31d)](/[\r\n]+/)[_0x53408e(0x247)]('');}else{if(_0x53408e(0x200)!==_0x53408e(0x2af))return this[_0x53408e(0x294)](_0x46144d);else{const _0x4d8815=_0x5b9098[_0x53408e(0x208)](_0x2158ec(_0x15310c['$1']));return this[_0x53408e(0x34a)](_0x562f51,_0x35b0c6,_0x17a03d,_0x4d8815);}}}},AIManager[_0x14a3cf(0x1fe)]=function(_0x169b92){const _0x2c00cf=_0x14a3cf;if(!VisuMZ[_0x2c00cf(0x307)][_0x2c00cf(0x328)][_0x2c00cf(0x309)][_0x2c00cf(0x35a)])return[];if(_0x169b92['note'][_0x2c00cf(0x2a7)](AIManager[_0x2c00cf(0x1f4)]['anyCondition']))return[];return this['makeDefaultConditions'](_0x169b92,_0x2c00cf(0x2a5));},AIManager[_0x14a3cf(0x294)]=function(_0x22956b){const _0xd4769f=_0x14a3cf;if(!VisuMZ[_0xd4769f(0x307)]['Settings']['Default'][_0xd4769f(0x28e)])return[];if(_0x22956b[_0xd4769f(0x298)][_0xd4769f(0x2a7)](AIManager[_0xd4769f(0x1f4)]['allCondition']))return[];return this[_0xd4769f(0x25b)](_0x22956b,_0xd4769f(0x284));},AIManager['makeDefaultConditions']=function(_0xd7cf02,_0x851bbe){const _0x42081a=_0x14a3cf;if(!_0xd7cf02)return[];const _0x4173aa=VisuMZ[_0x42081a(0x307)][_0x42081a(0x328)][_0x42081a(0x309)],_0x28e362=[_0x42081a(0x2db),_0x42081a(0x370),_0x42081a(0x1df),_0x42081a(0x2b8),_0x42081a(0x2e6),'MDF','AGI',_0x42081a(0x289)],_0x5c4201=_0xd7cf02[_0x42081a(0x23a)]['type'],_0x19bc1d=_0xd7cf02[_0x42081a(0x275)];let _0x2ab859=[],_0x5e0e00='',_0x664e99='';switch(_0x5c4201){case 0x1:_0x5e0e00=_0x42081a(0x26d)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));break;case 0x2:_0x5e0e00=_0x42081a(0x302)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99['split'](/[\r\n]+/)[_0x42081a(0x247)](''));break;case 0x3:_0x5e0e00='HpRecover%1'['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));break;case 0x4:_0x5e0e00=_0x42081a(0x290)['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));break;case 0x5:_0x5e0e00=_0x42081a(0x252)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));break;case 0x6:_0x5e0e00='MpDrain%1'[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));break;}for(const _0x7ae734 of _0x19bc1d){if(!_0x7ae734)continue;switch(_0x7ae734[_0x42081a(0x259)]){case Game_Action['EFFECT_RECOVER_HP']:if(_0x7ae734[_0x42081a(0x2ed)]>0x0||_0x7ae734['value2']>0x0){if(_0x42081a(0x286)!==_0x42081a(0x286))return _0x3af367[_0x36510f(_0x1ff385['$1'])[_0x42081a(0x34b)]()[_0x42081a(0x380)]()];else _0x5e0e00='HpRecover%1'[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)[_0x42081a(0x247)](''));}else(_0x7ae734[_0x42081a(0x2ed)]<0x0||_0x7ae734['value2']<0x0)&&(_0x5e0e00=_0x42081a(0x26d)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859['concat'](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)['remove']('')));break;case Game_Action[_0x42081a(0x32b)]:if(_0x7ae734[_0x42081a(0x2ed)]>0x0||_0x7ae734[_0x42081a(0x1dd)]>0x0)_0x42081a(0x2a8)!==_0x42081a(0x2a8)?_0x53b31a[_0x42081a(0x243)]['selectAllActions'][_0x42081a(0x331)](this,_0x412628):(_0x5e0e00=_0x42081a(0x290)['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99['split'](/[\r\n]+/)['remove']('')));else{if(_0x7ae734[_0x42081a(0x2ed)]<0x0||_0x7ae734[_0x42081a(0x1dd)]<0x0){if('Oiesx'===_0x42081a(0x371))return _0x478313[_0x42081a(0x243)]['meetsTurnCondition'][_0x42081a(0x331)](this,_0x108134,_0x227c80);else _0x5e0e00=_0x42081a(0x302)['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00],_0x2ab859=_0x2ab859['concat'](_0x664e99['split'](/[\r\n]+/)['remove'](''));}}break;case Game_Action[_0x42081a(0x253)]:if(_0x7ae734[_0x42081a(0x362)]===0x0)continue;_0x5e0e00=_0x42081a(0x306)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00]['format'](_0x7ae734['dataId']),_0x2ab859=_0x2ab859['concat'](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x42081a(0x38d)]:_0x5e0e00=_0x42081a(0x333)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00][_0x42081a(0x37f)](_0x7ae734[_0x42081a(0x362)]),_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99['split'](/[\r\n]+/)[_0x42081a(0x247)](''));break;case Game_Action['EFFECT_ADD_BUFF']:_0x5e0e00=_0x42081a(0x231)[_0x42081a(0x37f)](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00][_0x42081a(0x37f)](_0x28e362[_0x7ae734[_0x42081a(0x362)]]),_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)['remove'](''));break;case Game_Action['EFFECT_ADD_DEBUFF']:_0x5e0e00=_0x42081a(0x22f)['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00][_0x42081a(0x37f)](_0x28e362[_0x7ae734[_0x42081a(0x362)]]),_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99[_0x42081a(0x31d)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x42081a(0x2fe)]:_0x5e0e00='RemoveBuff%1'['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00][_0x42081a(0x37f)](_0x28e362[_0x7ae734[_0x42081a(0x362)]]),_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99['split'](/[\r\n]+/)[_0x42081a(0x247)](''));break;case Game_Action['EFFECT_REMOVE_DEBUFF']:_0x5e0e00=_0x42081a(0x28f)['format'](_0x851bbe),_0x664e99=_0x4173aa[_0x5e0e00][_0x42081a(0x37f)](_0x28e362[_0x7ae734[_0x42081a(0x362)]]),_0x2ab859=_0x2ab859[_0x42081a(0x262)](_0x664e99['split'](/[\r\n]+/)[_0x42081a(0x247)](''));break;}}return _0x2ab859;},AIManager[_0x14a3cf(0x222)]=function(_0x1c81a7,_0x44d832){const _0x1b8e1e=_0x14a3cf;this[_0x1b8e1e(0x213)]=this['makeValidTargets'](_0x1c81a7,_0x44d832);},AIManager['clearForcedTargets']=function(){const _0x486f6b=_0x14a3cf;this[_0x486f6b(0x213)]=[];},AIManager[_0x14a3cf(0x245)]=function(){const _0x4465d2=_0x14a3cf;return this[_0x4465d2(0x213)]=this[_0x4465d2(0x213)]||[],this['_forceValidTargets'];},AIManager[_0x14a3cf(0x2e1)]=function(){const _0x3ffa2f=_0x14a3cf;return this[_0x3ffa2f(0x245)]()['length']>0x0;},AIManager[_0x14a3cf(0x296)]=function(_0x2feb21,_0x409800){const _0x36d5d6=_0x14a3cf;if(!_0x2feb21)return![];if(!_0x409800)return![];if(!DataManager[_0x36d5d6(0x270)](_0x409800))return;if(this['isConditionalAI'](_0x409800)){if(_0x36d5d6(0x251)===_0x36d5d6(0x251))return this[_0x36d5d6(0x2aa)](_0x2feb21,_0x409800)['length']>=0x1;else{const _0xd6e37a=this[_0x36d5d6(0x254)]()?this['actor']()[_0x36d5d6(0x298)]:this['enemy']()[_0x36d5d6(0x298)];if(_0xd6e37a[_0x36d5d6(0x2a7)](_0x55329c['_regexp'][_0x36d5d6(0x37d)]))return![];else{if(_0xd6e37a[_0x36d5d6(0x2a7)](_0xa4caa4[_0x36d5d6(0x1f4)]['aiEvaTgr']))return this['aiApplyEvaTgrInfluenceRate']()>0x0;}}}else return'fahRC'!==_0x36d5d6(0x2bb)?!![]:_0x5067ef[_0x36d5d6(0x350)];},AIManager[_0x14a3cf(0x2aa)]=function(_0x5cc27d,_0x188c1b){const _0x2aa4a7=_0x14a3cf;let _0x4cca43=[];if(this['isConditionalAI'](_0x188c1b)){if(_0x2aa4a7(0x28a)===_0x2aa4a7(0x28a)){const _0x92b44d=this[_0x2aa4a7(0x329)](_0x188c1b),_0x41e0b8=this[_0x2aa4a7(0x32c)](_0x188c1b),_0x542710=new Game_Action(_0x5cc27d);_0x542710[_0x2aa4a7(0x31f)](_0x188c1b['id']);let _0x55b659=AIManager[_0x2aa4a7(0x274)](_0x5cc27d,_0x542710);_0x4cca43=_0x55b659[_0x2aa4a7(0x381)](_0x28a5cd=>this[_0x2aa4a7(0x269)](_0x5cc27d,_0x28a5cd,_0x188c1b,_0x92b44d,_0x41e0b8));}else{const _0x184b2d=this['isActor']()?this[_0x2aa4a7(0x23f)]()[_0x2aa4a7(0x298)]:this[_0x2aa4a7(0x22e)]()[_0x2aa4a7(0x298)];if(_0x184b2d[_0x2aa4a7(0x2a7)](_0x3a5558[_0x2aa4a7(0x1f4)][_0x2aa4a7(0x1fd)]))return![];else{if(_0x184b2d[_0x2aa4a7(0x2a7)](_0x16757e[_0x2aa4a7(0x1f4)][_0x2aa4a7(0x369)]))return this['aiApplyElementalTgrInfluenceRate']()>0x0;}}}return _0x4cca43;},AIManager[_0x14a3cf(0x274)]=function(_0x40a199,_0x22bb5c){const _0x4f6eda=_0x14a3cf;let _0x4b5f69=[];if(Imported['VisuMZ_2_AggroControlSystem']&&_0x22bb5c[_0x4f6eda(0x1de)]()){if(_0x4f6eda(0x239)===_0x4f6eda(0x32d))_0x441ce5['BattleAI'][_0x4f6eda(0x2c6)][_0x4f6eda(0x331)](this,_0x484a52),this[_0x4f6eda(0x374)]();else{const _0xf70f28=_0x22bb5c[_0x4f6eda(0x24b)]()?_0x40a199[_0x4f6eda(0x2dd)]():_0x40a199[_0x4f6eda(0x2f5)]();_0x4b5f69=[_0xf70f28['highestTgrMember']()];}}else{if(_0x22bb5c[_0x4f6eda(0x36f)]())_0x4b5f69=$gameParty['aliveMembers']()[_0x4f6eda(0x262)]($gameTroop[_0x4f6eda(0x2a0)]());else{if(_0x22bb5c[_0x4f6eda(0x24b)]()){if(_0x4f6eda(0x280)===_0x4f6eda(0x280))_0x4b5f69=_0x40a199[_0x4f6eda(0x2dd)]()['aliveMembers']();else return _0x3861ca[_0x4f6eda(0x304)];}else{if(_0x22bb5c['isForDeadFriend']())_0x4b5f69=_0x40a199[_0x4f6eda(0x2f5)]()[_0x4f6eda(0x2ef)]();else _0x22bb5c['isForFriend']()&&!_0x22bb5c[_0x4f6eda(0x2d0)]()&&(_0x4b5f69=_0x40a199[_0x4f6eda(0x2f5)]()[_0x4f6eda(0x2a0)]());}}}return _0x4b5f69;},AIManager['doesTargetMeetAIConditions']=function(_0x4091f9,_0x6326f0,_0x43d734,_0x3b30cb,_0x35c8b){const _0x13393a=_0x14a3cf;return this[_0x13393a(0x1f5)](_0x4091f9,_0x6326f0,_0x43d734,_0x3b30cb)&&this[_0x13393a(0x2cb)](_0x4091f9,_0x6326f0,_0x43d734,_0x35c8b);},AIManager[_0x14a3cf(0x1f5)]=function(_0x5ec4b5,_0x4a4f0e,_0x255a2a,_0x2d77ac){const _0x11aa3a=_0x14a3cf;if(_0x2d77ac['length']<=0x0)return!![];for(const _0x26aae8 of _0x2d77ac){if('MXsAd'!==_0x11aa3a(0x368))return _0x20b880[_0x11aa3a(0x326)]();else{if(!_0x26aae8)continue;if(_0x26aae8[_0x11aa3a(0x2fd)]<=0x0)continue;if(!this[_0x11aa3a(0x263)](_0x5ec4b5))return!![];if(!this[_0x11aa3a(0x395)](_0x5ec4b5,_0x4a4f0e,_0x255a2a,_0x26aae8))return![];}}return!![];},AIManager['doesTargetMeetAnyConditions']=function(_0x590810,_0x29e6cd,_0x19f599,_0x8f51c8){const _0x26c0e4=_0x14a3cf;if(_0x8f51c8[_0x26c0e4(0x2fd)]<=0x0)return!![];for(const _0x2973d5 of _0x8f51c8){if(_0x26c0e4(0x27c)!==_0x26c0e4(0x282)){if(!_0x2973d5)continue;if(_0x2973d5[_0x26c0e4(0x2fd)]<=0x0)continue;if(!this[_0x26c0e4(0x263)](_0x590810))return!![];if(this[_0x26c0e4(0x395)](_0x590810,_0x29e6cd,_0x19f599,_0x2973d5))return!![];}else{let _0x39610a=_0x1a1d27['BattleAI'][_0x26c0e4(0x257)]['call'](this);if(this[_0x26c0e4(0x393)]){const _0x2cacc3=_0x497c16[_0x26c0e4(0x245)]();_0x39610a=_0x39610a[_0x26c0e4(0x381)](_0x1d4a8c=>_0x2cacc3[_0x26c0e4(0x2f7)](_0x1d4a8c));}return _0x39610a;}}return![];},AIManager[_0x14a3cf(0x263)]=function(_0xdf0018){const _0xfb3b51=_0x14a3cf,_0x58c007=_0xdf0018[_0xfb3b51(0x379)]();return Math[_0xfb3b51(0x365)](0x64)<_0x58c007;},AIManager['doesTargetMeetCondition']=function(_0x33e555,_0x9a1712,_0x28191a,_0x3c04d6){const _0x32dff0=_0x14a3cf,_0x575ad3=[_0x32dff0(0x2db),_0x32dff0(0x370),_0x32dff0(0x1df),_0x32dff0(0x2b8),_0x32dff0(0x2e6),_0x32dff0(0x2bc),_0x32dff0(0x353),'LUK'];if(_0x3c04d6[_0x32dff0(0x209)]()[_0x32dff0(0x380)]()===_0x32dff0(0x2fa))return!![];const _0x11828d=_0x33e555;if(!VisuMZ['BattleAI'][_0x32dff0(0x328)]['General'][_0x32dff0(0x212)]){if(_0x3c04d6['match'](/turnCount\(\)/i)){if($gameTemp[_0x32dff0(0x30e)]()&&!this['_alertTurnCount']){if(_0x32dff0(0x359)===_0x32dff0(0x20e)){const _0x80589f=_0xf9dd6e(_0x1983d3['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x420c57:_0x24fdb3;return _0x80589f[_0x32dff0(0x254)]();}else{let _0x13e603='The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a';_0x13e603+=_0x3c04d6+'\x0a\x0a',_0x13e603+=_0x32dff0(0x1db),_0x13e603+='For\x20more\x20information,\x20view\x20the\x20help\x20file.',alert(_0x13e603),this[_0x32dff0(0x2b4)]=!![];}}return![];}}if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x19ef46=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x3f8dd8=this[_0x32dff0(0x1fc)](_0x33e555,_0x9a1712,_0x28191a,_0x19ef46[0x0]),_0x1cfe39=_0x19ef46[0x1],_0xb5a2c9=this['determineLineValue'](_0x33e555,_0x9a1712,_0x28191a,_0x19ef46[0x2]);window[_0x32dff0(0x1e6)]=window['a']=window['b']=undefined;const _0x4d97b9=_0x32dff0(0x2ee)['format'](_0x3f8dd8,_0x1cfe39,_0xb5a2c9);try{return eval(_0x4d97b9);}catch(_0x34e6d7){return $gameTemp[_0x32dff0(0x30e)]()&&(console[_0x32dff0(0x1e9)](_0x32dff0(0x33a)[_0x32dff0(0x37f)](_0x3c04d6)),console['log'](_0x34e6d7)),!![];}}else{if(_0x3c04d6['match'](/(\d+\.?\d*)([%％]) CHANCE/i)){const _0x117158=Number(RegExp['$1'])*0.01;return Math[_0x32dff0(0x338)]()<_0x117158;}else{if(_0x3c04d6['match'](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){if(_0x32dff0(0x279)!==_0x32dff0(0x29d)){const _0x2bd563=Number(RegExp['$1']),_0x463e2e=String(RegExp['$2'])[_0x32dff0(0x34b)](),_0x497ffd=_0x463e2e[_0x32dff0(0x2a7)](/ON|TRUE/i);return $gameSwitches[_0x32dff0(0x364)](_0x2bd563)===_0x497ffd;}else return _0x23ef87['MAX_SAFE_INTEGER'];}else{if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) IS ACTOR/i)){if(_0x32dff0(0x2ca)!==_0x32dff0(0x258)){const _0x25c5ed=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return _0x25c5ed[_0x32dff0(0x254)]();}else return this[_0x32dff0(0x245)]()[_0x32dff0(0x2fd)]>0x0;}else{if(_0x3c04d6['match'](/(.*) IS ENEMY/i)){const _0x53b608=String(RegExp['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return _0x53b608[_0x32dff0(0x2b3)]();}else{if(_0x3c04d6['match'](/(.*) HAS STATE (\d+)/i)){const _0x16e00c=$dataStates[Number(RegExp['$2'])],_0x195a99=String(RegExp['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return _0x195a99['states']()['includes'](_0x16e00c);}else{if(_0x3c04d6['match'](/(.*) HAS STATE (.*)/i)){const _0x179af9=$dataStates[DataManager['getStateIdWithName'](RegExp['$2'])],_0x4c2619=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return _0x4c2619[_0x32dff0(0x29b)]()[_0x32dff0(0x2f7)](_0x179af9);}else{if(_0x3c04d6['match'](/(.*) NOT STATE (\d+)/i)){if(_0x32dff0(0x29f)!=='PNrdf'){const _0x5bac9b=$dataStates[Number(RegExp['$2'])],_0x41d0dc=String(RegExp['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return!_0x41d0dc[_0x32dff0(0x29b)]()[_0x32dff0(0x2f7)](_0x5bac9b);}else{const _0x15ceb3=_0x202669[_0x32dff0(0x24b)]()?_0xfb199e[_0x32dff0(0x2dd)]():_0x321568['friendsUnit']();_0x2e5502=[_0x15ceb3[_0x32dff0(0x32a)]()];}}else{if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) NOT STATE (.*)/i)){if(_0x32dff0(0x392)===_0x32dff0(0x227)){if(_0x45f67c[_0x32dff0(0x30e)]()&&!this[_0x32dff0(0x2b4)]){let _0x24685e=_0x32dff0(0x26e);_0x24685e+=_0x31ff0f+'\x0a\x0a',_0x24685e+=_0x32dff0(0x1db),_0x24685e+=_0x32dff0(0x367),_0x4004e0(_0x24685e),this['_alertTurnCount']=!![];}return![];}else{const _0x326a0c=$dataStates[DataManager[_0x32dff0(0x25d)](RegExp['$2'])],_0x54e36a=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712;return!_0x54e36a['states']()['includes'](_0x326a0c);}}else{if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x1c6d0b=_0x575ad3[_0x32dff0(0x25c)](String(RegExp['$2'])[_0x32dff0(0x209)]()['trim']()),_0x4a5715=String(RegExp['$3'])[_0x32dff0(0x34b)]()[_0x32dff0(0x380)](),_0xe84e8=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712,_0x28409c=_0x32dff0(0x383)[_0x32dff0(0x37f)](_0x4a5715['charAt'](0x0)[_0x32dff0(0x209)]()+_0x4a5715[_0x32dff0(0x372)](0x1));return _0xe84e8[_0x28409c](_0x1c6d0b);}else{if(_0x3c04d6['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){if('SGIyX'==='SGIyX'){const _0x3d9802=_0x575ad3[_0x32dff0(0x25c)](String(RegExp['$2'])[_0x32dff0(0x209)]()['trim']()),_0x11a427=String(RegExp['$3'])[_0x32dff0(0x34b)]()[_0x32dff0(0x380)](),_0x4caa3c=String(RegExp['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712,_0x3ffc56=_0x32dff0(0x235)[_0x32dff0(0x37f)](_0x11a427[_0x32dff0(0x361)](0x0)[_0x32dff0(0x209)]()+_0x11a427[_0x32dff0(0x372)](0x1));return _0x4caa3c[_0x3ffc56](_0x3d9802);}else{const _0x49e441=this[_0x32dff0(0x254)]()?this['actor']()[_0x32dff0(0x298)]:this[_0x32dff0(0x22e)]()[_0x32dff0(0x298)];if(_0x49e441[_0x32dff0(0x2a7)](_0x3d66c6[_0x32dff0(0x1f4)][_0x32dff0(0x26f)]))return![];else{if(_0x49e441[_0x32dff0(0x2a7)](_0x348992[_0x32dff0(0x1f4)]['aiMevTgr']))return this[_0x32dff0(0x2bd)]()>0x0;}}}else{if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x39a535=_0x575ad3[_0x32dff0(0x25c)](String(RegExp['$2'])[_0x32dff0(0x209)]()[_0x32dff0(0x380)]()),_0x360474=String(RegExp['$3'])[_0x32dff0(0x34b)]()['trim'](),_0x437871=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712,_0x40042a='is%1Affected'[_0x32dff0(0x37f)](_0x360474['charAt'](0x0)['toUpperCase']()+_0x360474[_0x32dff0(0x372)](0x1));return!_0x437871[_0x40042a](_0x39a535);}else{if(_0x3c04d6[_0x32dff0(0x2a7)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){if('eJnyD'==='EeKYQ')_0x5b4df7[_0x32dff0(0x1e9)](_0x32dff0(0x33a)[_0x32dff0(0x37f)](_0x2fae9e)),_0x2d9073[_0x32dff0(0x1e9)](_0x258c1e);else{const _0x5db216=_0x575ad3[_0x32dff0(0x25c)](String(RegExp['$2'])['toUpperCase']()['trim']()),_0x134530=String(RegExp['$3'])['toLowerCase']()[_0x32dff0(0x380)](),_0x199e9d=String(RegExp['$1'])[_0x32dff0(0x2a7)](/(?:USER|SUBJECT)/i)?_0x11828d:_0x9a1712,_0x22deaa=_0x32dff0(0x235)[_0x32dff0(0x37f)](_0x134530[_0x32dff0(0x361)](0x0)[_0x32dff0(0x209)]()+_0x134530[_0x32dff0(0x372)](0x1));return!_0x199e9d[_0x22deaa](_0x5db216);}}}}}}}}}}}}}}return!![];},AIManager[_0x14a3cf(0x1fc)]=function(_0x53cc2f,_0x1da799,_0x4d9123,_0x2749f1){const _0x1e6926=_0x14a3cf,_0x49e9a3=[_0x1e6926(0x2db),_0x1e6926(0x370),_0x1e6926(0x1df),_0x1e6926(0x2b8),_0x1e6926(0x2e6),_0x1e6926(0x2bc),'AGI',_0x1e6926(0x289)];window[_0x1e6926(0x1e6)]=_0x53cc2f,window['a']=user,window['b']=_0x1da799;const _0x4a6bac=_0x2749f1,_0x49b971=user[_0x1e6926(0x2dd)]();let _0x34191f=_0x2749f1[_0x1e6926(0x2a7)](/(?:USER|SUBJECT)/i)?user:_0x1da799;_0x2749f1=_0x2749f1[_0x1e6926(0x332)](/\b(\d+)([%％])/gi,(_0x1ba0de,_0x395dad)=>Number(_0x395dad)*0.01);if(_0x2749f1[_0x1e6926(0x2a7)](/(?:VAR|VARIABLE) (\d+)/i))return $gameVariables[_0x1e6926(0x364)](Number(RegExp['$1']));if(_0x2749f1['match'](/TEAM ALIVE MEMBERS/i))return _0x34191f[_0x1e6926(0x2f5)]()[_0x1e6926(0x2a0)]()['length'];if(_0x2749f1[_0x1e6926(0x2a7)](/TEAM DEAD MEMBERS/i))return _0x1e6926(0x25a)===_0x1e6926(0x1ec)?_0x25b546[_0x1e6926(0x2ce)]:_0x34191f[_0x1e6926(0x2f5)]()[_0x1e6926(0x2ef)]()[_0x1e6926(0x2fd)];if(_0x2749f1[_0x1e6926(0x2a7)](/ELEMENT (\d+) RATE/i)){const _0x3ec195=Number(RegExp['$1']);return this[_0x1e6926(0x34a)](_0x53cc2f,_0x1da799,_0x34191f,_0x3ec195);}else{if(_0x2749f1['match'](/ELEMENT (.*) RATE/i)){if('HHuyx'===_0x1e6926(0x30f))_0x28fe8f['BattleAI'][_0x1e6926(0x214)][_0x1e6926(0x331)](this);else{const _0x1cb489=DataManager['getElementIdWithName'](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x53cc2f,_0x1da799,_0x34191f,_0x1cb489);}}else{if(_0x2749f1[_0x1e6926(0x2a7)](/(.*) ELEMENT RATE/i)){const _0x4aae13=DataManager[_0x1e6926(0x208)](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x53cc2f,_0x1da799,_0x34191f,_0x4aae13);}}}if(_0x2749f1[_0x1e6926(0x2a7)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){if(_0x1e6926(0x2be)===_0x1e6926(0x2de))return _0x2a5ce7[_0x1e6926(0x243)]['meetsStateCondition'][_0x1e6926(0x331)](this,_0xedaed6);else{const _0x7fb673=_0x49e9a3[_0x1e6926(0x25c)](String(RegExp['$1'])[_0x1e6926(0x209)]()[_0x1e6926(0x380)]()),_0x4203c6=String(RegExp['$2'])[_0x1e6926(0x34b)]()[_0x1e6926(0x380)]();return _0x34191f[_0x1e6926(0x2da)](_0x7fb673)*(_0x4203c6===_0x1e6926(0x2da)?0x1:-0x1);}}if(_0x2749f1[_0x1e6926(0x2a7)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x781522=_0x49e9a3[_0x1e6926(0x25c)](String(RegExp['$1'])[_0x1e6926(0x209)]()['trim']()),_0x159627=String(RegExp['$2'])[_0x1e6926(0x34b)]()[_0x1e6926(0x380)]();if(_0x159627===_0x1e6926(0x2da)&&_0x34191f[_0x1e6926(0x347)](_0x781522)){if(_0x1e6926(0x291)===_0x1e6926(0x2b9))for(let _0x3d7974=0x0;_0x3d7974<this[_0x1e6926(0x21d)]();_0x3d7974++){const _0x46cea9=_0x307c98[0x0];this[_0x1e6926(0x264)](_0x3d7974)[_0x1e6926(0x27e)](_0x46cea9);}else return _0x34191f[_0x1e6926(0x38c)][_0x781522];}else{if(_0x159627===_0x1e6926(0x388)&&_0x34191f['isDebuffAffected'](_0x781522))return _0x34191f[_0x1e6926(0x38c)][_0x781522];}return 0x0;}if(_0x2749f1[_0x1e6926(0x2a7)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x34dffc=Number(RegExp['$1']);if(_0x34191f[_0x1e6926(0x325)](_0x34dffc)){if('SwwAX'===_0x1e6926(0x207)){const _0x2e7c9d=$dataStates[_0x34dffc];if(_0x2e7c9d&&_0x2e7c9d[_0x1e6926(0x34c)]===0x0){if(_0x1e6926(0x38e)===_0x1e6926(0x38e))return Number[_0x1e6926(0x2ce)];else this[_0x1e6926(0x2e9)](),_0x3cef64[_0x1e6926(0x307)][_0x1e6926(0x273)]['call'](this);}else{if('WuyxU'===_0x1e6926(0x23c))return _0x34191f[_0x1e6926(0x2b6)][_0x34dffc]||0x0;else{this[_0x1e6926(0x24a)]()[_0x3e0453]=this[_0x1e6926(0x24a)]()[_0x1b3f77]||[];const _0x307e68=_0x4f03c6[_0x1e6926(0x254)]()?_0x5e532c[_0x1e6926(0x344)]():_0x45a854['enemyId']();!this['aiKnowledge']()[_0x2dd531][_0x1e6926(0x2f7)](_0x307e68)&&this[_0x1e6926(0x24a)]()[_0x47eff4][_0x1e6926(0x293)](_0x307e68);}}}else return this[_0x1e6926(0x2bf)]()>0x0;}else{if(_0x34191f[_0x1e6926(0x29b)]()[_0x1e6926(0x2f7)]($dataStates[_0x34dffc]))return Number[_0x1e6926(0x2ce)];else{if('PbavB'!==_0x1e6926(0x2f3))return 0x0;else{if(_0x26ea22&&_0x12d113[_0x1e6926(0x326)]()>_0x228a6b[_0x1e6926(0x326)]())_0x5bad23=_0xb9f656;if(_0x34be5f&&_0x1bbfb3[_0x1e6926(0x326)]()<_0x250f64[_0x1e6926(0x326)]())_0x499565=_0x5e1e15;}}}}else{if(_0x2749f1['match'](/STATE (.*) (?:TURN|TURNS)/i)){const _0x196439=DataManager[_0x1e6926(0x25d)](RegExp['$1']);if(_0x34191f[_0x1e6926(0x325)](_0x196439)){const _0x3245fb=$dataStates[_0x196439];if(_0x3245fb&&_0x3245fb[_0x1e6926(0x34c)]===0x0)return Number[_0x1e6926(0x2ce)];else{if(_0x1e6926(0x1dc)===_0x1e6926(0x35d)){if(this['_aiKnowledge']===_0xbb5e07)this[_0x1e6926(0x374)]();return this[_0x1e6926(0x2d2)];}else return _0x34191f['_stateTurns'][_0x196439]||0x0;}}else return _0x34191f[_0x1e6926(0x29b)]()['includes']($dataStates[_0x196439])?Number[_0x1e6926(0x2ce)]:0x0;}}if(_0x2749f1[_0x1e6926(0x2a7)](/\bHP([%％])/i))return _0x34191f[_0x1e6926(0x26b)]();else{if(_0x2749f1[_0x1e6926(0x2a7)](/\bMP([%％])/i)){if('uNaoC'===_0x1e6926(0x384))return _0x34191f[_0x1e6926(0x326)]();else _0x8c0500[_0x1e6926(0x244)]();}else{if(_0x2749f1[_0x1e6926(0x2a7)](/\bTP([%％])/i))return _0x34191f[_0x1e6926(0x312)]();else{if(_0x2749f1[_0x1e6926(0x2a7)](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0x34191f[_0x1e6926(0x350)];else{if(_0x2749f1[_0x1e6926(0x2a7)](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0x1e6926(0x2f1)===_0x1e6926(0x23b)?_0x460c13['_stateTurns'][_0x3ba177]||0x0:_0x34191f[_0x1e6926(0x376)];else{if(_0x2749f1[_0x1e6926(0x2a7)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x34191f[_0x1e6926(0x238)]();}}}}}if(_0x2749f1[_0x1e6926(0x2a7)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x34191f[String(RegExp['$1'])['toLowerCase']()['trim']()];try{if(_0x1e6926(0x2ea)==='cYEyj')_0x3c7816=_0x4d2b1b['aliveMembers']()[_0x1e6926(0x262)](_0x50889f[_0x1e6926(0x2a0)]());else return eval(_0x2749f1);}catch(_0x21e967){if(_0x1e6926(0x1fa)===_0x1e6926(0x300)){_0x432c08=this[_0x1e6926(0x213)][0x0];const _0x5de1d6=_0x1e6926(0x2c8);for(const _0x476a2f of this[_0x1e6926(0x213)]){if(_0x272546&&_0x476a2f['statesByCategory'](_0x5de1d6)[_0x1e6926(0x2fd)]>_0x32b0c2[_0x1e6926(0x206)](_0x5de1d6)[_0x1e6926(0x2fd)])_0x1c12cd=_0x476a2f;if(_0x43a818&&_0x476a2f[_0x1e6926(0x206)](_0x5de1d6)[_0x1e6926(0x2fd)]<_0x45a553[_0x1e6926(0x206)](_0x5de1d6)[_0x1e6926(0x2fd)])_0x3d1300=_0x476a2f;}return _0x28d2ee;}else return $gameTemp['isPlaytest']()&&(console[_0x1e6926(0x1e9)](_0x1e6926(0x2c4)[_0x1e6926(0x37f)](_0x4a6bac)),console['log'](_0x21e967)),0x0;}},AIManager[_0x14a3cf(0x34a)]=function(_0x2bdf87,_0x3c15eb,_0xa20c45,_0x5380d6){const _0x415a3b=_0x14a3cf;if(_0x2bdf87[_0x415a3b(0x254)]()===_0xa20c45[_0x415a3b(0x254)]())return _0xa20c45['elementRate'](_0x5380d6);else return _0xa20c45[_0x415a3b(0x2dd)]()[_0x415a3b(0x229)](_0x5380d6,_0xa20c45)?_0xa20c45[_0x415a3b(0x232)](_0x5380d6):VisuMZ[_0x415a3b(0x307)][_0x415a3b(0x328)][_0x415a3b(0x255)][_0x415a3b(0x34e)];},AIManager[_0x14a3cf(0x2d5)]=function(_0x2304c4,_0x28e1a1){const _0x405a62=_0x14a3cf;if(!_0x28e1a1)return;if(!_0x28e1a1['note'][_0x405a62(0x2a7)](AIManager[_0x405a62(0x1f4)][_0x405a62(0x250)]))return;const _0x302c7=String(RegExp['$1'])[_0x405a62(0x209)]()[_0x405a62(0x380)]();let _0x32e8fa=this[_0x405a62(0x34d)](_0x2304c4,_0x302c7);_0x32e8fa&&(this[_0x405a62(0x213)]=[_0x32e8fa]);},AIManager[_0x14a3cf(0x34d)]=function(_0x51e094,_0x433d0e){const _0x22596b=_0x14a3cf,_0x572ce0=[_0x22596b(0x2db),_0x22596b(0x370),'ATK',_0x22596b(0x2b8),_0x22596b(0x2e6),_0x22596b(0x2bc),_0x22596b(0x353),_0x22596b(0x289)],_0x9f1bcf=[_0x22596b(0x30c),_0x22596b(0x37c),_0x22596b(0x22d),'CEV','MEV',_0x22596b(0x23e),_0x22596b(0x318),_0x22596b(0x319),_0x22596b(0x2cf),_0x22596b(0x394)],_0x55b0a3=[_0x22596b(0x2b0),_0x22596b(0x1e0),_0x22596b(0x38a),_0x22596b(0x2c7),_0x22596b(0x378),'TCR',_0x22596b(0x327),_0x22596b(0x248),'FDR','EXR'];let _0x216e97=null;if(_0x433d0e===_0x22596b(0x28c)){if('FTWyB'===_0x22596b(0x2ba))return _0x54b533['maxTp']();else{if(this['_forceValidTargets'][_0x22596b(0x2f7)](_0x51e094))return'vjbAt'==='dhPmf'?_0x4315c6[_0x433621(_0x55ebee['$1'])]:_0x51e094;}}else{if(_0x433d0e===_0x22596b(0x2e5)){if('thSJC'===_0x22596b(0x1e5))_0x30dcff[_0x22596b(0x307)]['Game_Action_apply'][_0x22596b(0x331)](this,_0x58a7df),this[_0x22596b(0x2f2)](_0x3c8db9);else return this[_0x22596b(0x213)][0x0];}else{if(_0x433d0e===_0x22596b(0x2a6)){if(_0x22596b(0x1ea)===_0x22596b(0x1ea))return this[_0x22596b(0x213)][this[_0x22596b(0x213)][_0x22596b(0x2fd)]-0x1];else{const _0x1a84ae=_0x2d9561(_0x42feab['$1']);_0x1a84ae!==_0x49ce0a[_0x3c9e0b][_0x22596b(0x25e)]&&(_0x5e98e8(_0x22596b(0x20c)[_0x22596b(0x37f)](_0x301ade,_0x1a84ae)),_0x40c827[_0x22596b(0x1f7)]());}}else{if(_0x433d0e[_0x22596b(0x2a7)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x2515e6=String(RegExp['$1'])[_0x22596b(0x209)]()[_0x22596b(0x380)]()===_0x22596b(0x2c1),_0x255a7e=!_0x2515e6,_0x243da1=String(RegExp['$2'])[_0x22596b(0x209)]()[_0x22596b(0x380)]();if(_0x572ce0['includes'](_0x243da1)){const _0x1df2c8=_0x572ce0[_0x22596b(0x25c)](_0x243da1);_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0xe127ad of this[_0x22596b(0x213)]){if(_0x2515e6&&_0xe127ad[_0x22596b(0x233)](_0x1df2c8)>_0x216e97[_0x22596b(0x233)](_0x1df2c8))_0x216e97=_0xe127ad;if(_0x255a7e&&_0xe127ad[_0x22596b(0x233)](_0x1df2c8)<_0x216e97[_0x22596b(0x233)](_0x1df2c8))_0x216e97=_0xe127ad;}return _0x216e97;}if(_0x9f1bcf[_0x22596b(0x2f7)](_0x243da1)){if(_0x22596b(0x387)===_0x22596b(0x387)){const _0x5e4e69=_0x9f1bcf[_0x22596b(0x25c)](_0x243da1);_0x216e97=this['_forceValidTargets'][0x0];for(const _0x52d89f of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x52d89f['xparam'](_0x5e4e69)>_0x216e97[_0x22596b(0x2d6)](_0x5e4e69))_0x216e97=_0x52d89f;if(_0x255a7e&&_0x52d89f[_0x22596b(0x2d6)](_0x5e4e69)<_0x216e97['xparam'](_0x5e4e69))_0x216e97=_0x52d89f;}return _0x216e97;}else{if(_0x5d9a71['action']&&_0x124f39['action']['isAggroAffected']())return 0x1;}}if(_0x55b0a3[_0x22596b(0x2f7)](_0x243da1)){if(_0x22596b(0x278)==='KTKeg')_0x4cf160(_0x22596b(0x2c3)['format'](_0x137921,_0x105523,_0x1d09df)),_0x291ae3[_0x22596b(0x1f7)]();else{const _0x1792e8=_0x55b0a3['indexOf'](_0x243da1);_0x216e97=this['_forceValidTargets'][0x0];for(const _0x4bd892 of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x4bd892[_0x22596b(0x1eb)](_0x1792e8)>_0x216e97[_0x22596b(0x1eb)](_0x1792e8))_0x216e97=_0x4bd892;if(_0x255a7e&&_0x4bd892[_0x22596b(0x1eb)](_0x1792e8)<_0x216e97[_0x22596b(0x1eb)](_0x1792e8))_0x216e97=_0x4bd892;}return _0x216e97;}}if(_0x243da1==='HP'){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x14b8b0 of this['_forceValidTargets']){if(_0x22596b(0x297)===_0x22596b(0x37a)){const _0x1025bf=_0x2ce498[_0x22596b(0x25c)](_0x4b3f55(_0x488def['$2'])[_0x22596b(0x209)]()[_0x22596b(0x380)]()),_0x1ed739=_0x4ccbec(_0x5abecf['$3'])['toLowerCase']()[_0x22596b(0x380)](),_0x34d664=_0x104045(_0x15be1a['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x13a0c5:_0x35ae70,_0x1f879a=_0x22596b(0x383)[_0x22596b(0x37f)](_0x1ed739[_0x22596b(0x361)](0x0)[_0x22596b(0x209)]()+_0x1ed739[_0x22596b(0x372)](0x1));return _0x34d664[_0x1f879a](_0x1025bf);}else{if(_0x2515e6&&_0x14b8b0['hp']>_0x216e97['hp'])_0x216e97=_0x14b8b0;if(_0x255a7e&&_0x14b8b0['hp']<_0x216e97['hp'])_0x216e97=_0x14b8b0;}}return _0x216e97;}if(_0x243da1==='HP%'){if('mELRq'===_0x22596b(0x295)){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x4a46bc of this['_forceValidTargets']){if(_0x2515e6&&_0x4a46bc[_0x22596b(0x26b)]()>_0x216e97[_0x22596b(0x26b)]())_0x216e97=_0x4a46bc;if(_0x255a7e&&_0x4a46bc[_0x22596b(0x26b)]()<_0x216e97[_0x22596b(0x26b)]())_0x216e97=_0x4a46bc;}return _0x216e97;}else return 0x0;}if(_0x243da1==='MP'){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x545e9b of this['_forceValidTargets']){if(_0x22596b(0x271)===_0x22596b(0x271)){if(_0x2515e6&&_0x545e9b['mp']>_0x216e97['mp'])_0x216e97=_0x545e9b;if(_0x255a7e&&_0x545e9b['mp']<_0x216e97['mp'])_0x216e97=_0x545e9b;}else this[_0x22596b(0x310)](_0x3d1837);}return _0x216e97;}if(_0x243da1===_0x22596b(0x220)){if(_0x22596b(0x230)===_0x22596b(0x230)){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x42e49a of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x42e49a[_0x22596b(0x326)]()>_0x216e97[_0x22596b(0x326)]())_0x216e97=_0x42e49a;if(_0x255a7e&&_0x42e49a[_0x22596b(0x326)]()<_0x216e97[_0x22596b(0x326)]())_0x216e97=_0x42e49a;}return _0x216e97;}else return _0x232f3c[_0x22596b(0x345)]&&_0x16504d['description']['includes']('['+_0x3e2f44+']');}if(_0x243da1==='TP'){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x5d42ea of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x5d42ea['tp']>_0x216e97['tp'])_0x216e97=_0x5d42ea;if(_0x255a7e&&_0x5d42ea['tp']<_0x216e97['tp'])_0x216e97=_0x5d42ea;}return _0x216e97;}if(_0x243da1===_0x22596b(0x313)){if(_0x22596b(0x37e)!==_0x22596b(0x2a3)){_0x216e97=this['_forceValidTargets'][0x0];for(const _0x1f2717 of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x1f2717[_0x22596b(0x312)]()>_0x216e97[_0x22596b(0x312)]())_0x216e97=_0x1f2717;if(_0x255a7e&&_0x1f2717[_0x22596b(0x312)]()<_0x216e97[_0x22596b(0x312)]())_0x216e97=_0x1f2717;}return _0x216e97;}else return this['getDefaultAnyConditions'](_0x1fc800);}if(_0x243da1==='MAXTP'){if(_0x22596b(0x2dc)===_0x22596b(0x25f)){const _0x519efc=_0x252285(this['aiStyle']())[_0x22596b(0x34b)]()[_0x22596b(0x380)]();if(['random','casual'][_0x22596b(0x2f7)](_0x519efc))this['selectAllActionsRandom'](_0x1228d0);else _0x519efc===_0x22596b(0x2c2)?this[_0x22596b(0x281)](_0x25fc5f):this['selectAllActionsClassic'](_0x3323c1);}else{_0x216e97=this['_forceValidTargets'][0x0];for(const _0x41ff02 of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x41ff02[_0x22596b(0x238)]()>_0x216e97[_0x22596b(0x238)]())_0x216e97=_0x41ff02;if(_0x255a7e&&_0x41ff02[_0x22596b(0x238)]()<_0x216e97[_0x22596b(0x238)]())_0x216e97=_0x41ff02;}return _0x216e97;}}if(_0x243da1===_0x22596b(0x303)){_0x216e97=this['_forceValidTargets'][0x0];for(const _0x3c3e82 of this[_0x22596b(0x213)]){if('hRhPA'===_0x22596b(0x1e3)){if(_0x2515e6&&(_0x3c3e82[_0x22596b(0x31c)]||0x0)>(_0x216e97[_0x22596b(0x31c)]||0x0))_0x216e97=_0x3c3e82;if(_0x255a7e&&(_0x3c3e82[_0x22596b(0x31c)]||0x0)<(_0x216e97[_0x22596b(0x31c)]||0x0))_0x216e97=_0x3c3e82;}else return _0x329a09[_0x22596b(0x2ce)];}return _0x216e97;}if(_0x243da1==='STATE\x20COUNT'&&Imported[_0x22596b(0x237)]){_0x216e97=this[_0x22596b(0x213)][0x0];for(const _0x56b087 of this[_0x22596b(0x213)]){if(_0x2515e6&&_0x56b087[_0x22596b(0x29b)]()[_0x22596b(0x2fd)]>_0x216e97['states']()[_0x22596b(0x2fd)])_0x216e97=_0x56b087;if(_0x255a7e&&_0x56b087[_0x22596b(0x29b)]()[_0x22596b(0x2fd)]<_0x216e97[_0x22596b(0x29b)]()[_0x22596b(0x2fd)])_0x216e97=_0x56b087;}return _0x216e97;}if(_0x243da1==='POSITIVE\x20STATE\x20COUNT'&&Imported[_0x22596b(0x237)]){if(_0x22596b(0x31e)!=='BPLgO'){_0x216e97=this[_0x22596b(0x213)][0x0];const _0x1edd92=_0x22596b(0x2c8);for(const _0x54ad60 of this[_0x22596b(0x213)]){if(_0x22596b(0x2ec)===_0x22596b(0x240))_0x3241dd=this['elements']();else{if(_0x2515e6&&_0x54ad60[_0x22596b(0x206)](_0x1edd92)[_0x22596b(0x2fd)]>_0x216e97[_0x22596b(0x206)](_0x1edd92)[_0x22596b(0x2fd)])_0x216e97=_0x54ad60;if(_0x255a7e&&_0x54ad60[_0x22596b(0x206)](_0x1edd92)[_0x22596b(0x2fd)]<_0x216e97[_0x22596b(0x206)](_0x1edd92)[_0x22596b(0x2fd)])_0x216e97=_0x54ad60;}}return _0x216e97;}else{if(_0x5af83e&&(_0x677940['level']||0x0)>(_0x53eeb5[_0x22596b(0x31c)]||0x0))_0x279054=_0x4f96b6;if(_0xc2c312&&(_0x2d6c7e[_0x22596b(0x31c)]||0x0)<(_0x4aced2[_0x22596b(0x31c)]||0x0))_0x486626=_0x2f8329;}}if(_0x243da1==='NEGATIVE\x20STATE\x20COUNT'&&Imported['VisuMZ_1_SkillsStatesCore']){_0x216e97=this[_0x22596b(0x213)][0x0];const _0x2351ba=_0x22596b(0x2b7);for(const _0x50d09b of this['_forceValidTargets']){if(_0x22596b(0x2c9)===_0x22596b(0x2c9)){if(_0x2515e6&&_0x50d09b[_0x22596b(0x206)](_0x2351ba)[_0x22596b(0x2fd)]>_0x216e97[_0x22596b(0x206)](_0x2351ba)[_0x22596b(0x2fd)])_0x216e97=_0x50d09b;if(_0x255a7e&&_0x50d09b[_0x22596b(0x206)](_0x2351ba)[_0x22596b(0x2fd)]<_0x216e97[_0x22596b(0x206)](_0x2351ba)[_0x22596b(0x2fd)])_0x216e97=_0x50d09b;}else return![];}return _0x216e97;}}}}}return null;},DataManager[_0x14a3cf(0x208)]=function(_0x232ad9){const _0x4eda1d=_0x14a3cf;_0x232ad9=_0x232ad9['toUpperCase']()[_0x4eda1d(0x380)](),this[_0x4eda1d(0x336)]=this['_elementIDs']||{};if(this[_0x4eda1d(0x336)][_0x232ad9])return this['_elementIDs'][_0x232ad9];let _0x3da128=0x1;for(const _0x258440 of $dataSystem[_0x4eda1d(0x241)]){if('vwmms'!==_0x4eda1d(0x2e7)){if(!_0x258440)continue;let _0x5948ea=_0x258440['toUpperCase']();_0x5948ea=_0x5948ea[_0x4eda1d(0x332)](/\x1I\[(\d+)\]/gi,''),_0x5948ea=_0x5948ea[_0x4eda1d(0x332)](/\\I\[(\d+)\]/gi,''),this[_0x4eda1d(0x336)][_0x5948ea]=_0x3da128,_0x3da128++;}else _0x529bb8[_0x4eda1d(0x204)][_0x4eda1d(0x293)](_0xce6d37[_0x4eda1d(0x276)]()[_0x4eda1d(0x23a)][_0x4eda1d(0x2a9)]);}return this[_0x4eda1d(0x336)][_0x232ad9]||0x0;},DataManager[_0x14a3cf(0x25d)]=function(_0x31364c){const _0x5cd593=_0x14a3cf;_0x31364c=_0x31364c['toUpperCase']()[_0x5cd593(0x380)](),this[_0x5cd593(0x316)]=this[_0x5cd593(0x316)]||{};if(this['_stateIDs'][_0x31364c])return this[_0x5cd593(0x316)][_0x31364c];for(const _0x7f7c55 of $dataStates){if('FlBJz'!==_0x5cd593(0x26c)){const _0x22efff=_0x27aec9[_0x5bffc1(_0x4cef8f['$2'])],_0x34ccb5=_0x3707c2(_0x1b0c8e['$1'])[_0x5cd593(0x2a7)](/(?:USER|SUBJECT)/i)?_0xe5538c:_0x46d760;return!_0x34ccb5['states']()[_0x5cd593(0x2f7)](_0x22efff);}else{if(!_0x7f7c55)continue;this[_0x5cd593(0x316)][_0x7f7c55[_0x5cd593(0x215)][_0x5cd593(0x209)]()[_0x5cd593(0x380)]()]=_0x7f7c55['id'];}}return this[_0x5cd593(0x316)][_0x31364c]||0x0;},VisuMZ['BattleAI'][_0x14a3cf(0x21e)]=BattleManager[_0x14a3cf(0x33e)],BattleManager[_0x14a3cf(0x33e)]=function(){const _0x351170=_0x14a3cf,_0x4b5f1d=VisuMZ[_0x351170(0x307)][_0x351170(0x21e)][_0x351170(0x331)](this);if(_0x4b5f1d&&_0x4b5f1d[_0x351170(0x210)]()){if(_0x351170(0x24f)!=='vkkhC'){if(_0x2f067a['isActor']()===_0x470cce[_0x351170(0x254)]())return _0x15981e['elementRate'](_0x401a2e);else return _0x86982d['opponentsUnit']()[_0x351170(0x229)](_0x3616d1,_0x564196)?_0x447f8e[_0x351170(0x232)](_0x1fdc7b):_0x149dc9['BattleAI'][_0x351170(0x328)][_0x351170(0x255)]['UnknownElementRate'];}else{const _0x35109c=_0x4b5f1d['currentAction']();if(!_0x35109c||_0x35109c&&!_0x35109c[_0x351170(0x276)]())_0x4b5f1d[_0x351170(0x244)]();else VisuMZ['BattleAI'][_0x351170(0x328)][_0x351170(0x255)][_0x351170(0x212)]&&('vSBTO'===_0x351170(0x2ad)?_0x4b5f1d[_0x351170(0x244)]():this[_0x351170(0x281)](_0x3d5419));}}return _0x4b5f1d;},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x2fc)]=BattleManager[_0x14a3cf(0x335)],BattleManager[_0x14a3cf(0x335)]=function(){const _0x5299d6=_0x14a3cf;this['determineActionByAIisStillValid']();if(this[_0x5299d6(0x2a4)][_0x5299d6(0x2e0)]()){if(_0x5299d6(0x27b)!=='nViXp')VisuMZ[_0x5299d6(0x307)][_0x5299d6(0x2fc)][_0x5299d6(0x331)](this);else return this['aiApplyMevTgrInfluenceRate']()>0x0;}else this['endAction']();},VisuMZ['BattleAI']['BattleManager_endAction']=BattleManager[_0x14a3cf(0x349)],BattleManager[_0x14a3cf(0x349)]=function(){const _0x5ef0de=_0x14a3cf;this[_0x5ef0de(0x2e9)](),VisuMZ['BattleAI']['BattleManager_endAction']['call'](this);},BattleManager[_0x14a3cf(0x2e9)]=function(){const _0x5f46a0=_0x14a3cf;this[_0x5f46a0(0x35f)](this[_0x5f46a0(0x2a4)]);},BattleManager[_0x14a3cf(0x35f)]=function(_0x4a94e0){const _0x50b35a=_0x14a3cf;if(!_0x4a94e0)return;if(_0x4a94e0[_0x50b35a(0x2d8)]()==='random')return;if(!_0x4a94e0[_0x50b35a(0x210)]())return;const _0x3d27a0=_0x4a94e0[_0x50b35a(0x2e0)]();if(!_0x3d27a0)return;const _0x47d830=_0x3d27a0['item']();if(_0x4a94e0['_bypassAiValidCheck'])return;if(AIManager[_0x50b35a(0x296)](_0x4a94e0,_0x47d830)&&_0x4a94e0['canUse'](_0x47d830))return;_0x4a94e0[_0x50b35a(0x242)]();},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x31a)]=Game_Temp[_0x14a3cf(0x243)][_0x14a3cf(0x260)],Game_Temp['prototype'][_0x14a3cf(0x260)]=function(){const _0x17a8d6=_0x14a3cf;VisuMZ[_0x17a8d6(0x307)][_0x17a8d6(0x31a)][_0x17a8d6(0x331)](this),this[_0x17a8d6(0x267)]();},Game_Temp[_0x14a3cf(0x243)][_0x14a3cf(0x267)]=function(){this['_aiTgrInfluence']={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp[_0x14a3cf(0x243)][_0x14a3cf(0x28b)]=function(){const _0x3c6289=_0x14a3cf;if(this[_0x3c6289(0x201)]===undefined)this['clearAiTgrInfluence']();return this[_0x3c6289(0x201)];},Game_Temp[_0x14a3cf(0x243)][_0x14a3cf(0x1ef)]=function(_0x4f1a38,_0x337b0c){const _0x5d5cd9=_0x14a3cf;this['clearAiTgrInfluence']();const _0xed140d=this[_0x5d5cd9(0x28b)]();_0xed140d[_0x5d5cd9(0x264)]=_0x337b0c;if(_0x4f1a38[_0x5d5cd9(0x35c)]()){_0xed140d[_0x5d5cd9(0x31b)]=!![],_0xed140d[_0x5d5cd9(0x20d)]=_0x4f1a38[_0x5d5cd9(0x2bf)](),_0xed140d['elementIds']=[];if(Imported['VisuMZ_1_ElementStatusCore']){if('CCUrN'===_0x5d5cd9(0x20a)){const _0x4522e4=_0x58bd18[0x0];this[_0x5d5cd9(0x264)](_0x2d7d40)[_0x5d5cd9(0x27e)](_0x4522e4);}else _0xed140d[_0x5d5cd9(0x204)]=_0xed140d['elementIds']['concat'](_0x337b0c[_0x5d5cd9(0x241)]());}else{if(_0x337b0c[_0x5d5cd9(0x276)]()[_0x5d5cd9(0x23a)]['elementId']<0x0){if('LIlBt'===_0x5d5cd9(0x321))_0xed140d[_0x5d5cd9(0x204)]=_0xed140d[_0x5d5cd9(0x204)][_0x5d5cd9(0x262)](_0x4f1a38[_0x5d5cd9(0x32f)]());else{_0x21b872=this['_forceValidTargets'][0x0];for(const _0x55c6d6 of this[_0x5d5cd9(0x213)]){if(_0x18265f&&_0x55c6d6['tp']>_0x42576c['tp'])_0xca10a3=_0x55c6d6;if(_0x3276f4&&_0x55c6d6['tp']<_0x210f43['tp'])_0x55cfcf=_0x55c6d6;}return _0x38cca9;}}else _0xed140d[_0x5d5cd9(0x204)][_0x5d5cd9(0x293)](_0x337b0c[_0x5d5cd9(0x276)]()['damage'][_0x5d5cd9(0x2a9)]);}}if(_0x337b0c[_0x5d5cd9(0x1fb)]()&&_0x4f1a38[_0x5d5cd9(0x343)]()){if(_0x5d5cd9(0x234)!=='wttJe')return 0x0;else _0xed140d[_0x5d5cd9(0x2b5)]=_0x4f1a38[_0x5d5cd9(0x375)]();}_0x337b0c['isMagical']()&&_0x4f1a38[_0x5d5cd9(0x1f3)]()&&(_0xed140d['mevInfluenceRate']=_0x4f1a38['aiApplyMevTgrInfluenceRate']());},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x2df)]=Game_Action[_0x14a3cf(0x243)]['makeTargets'],Game_Action['prototype'][_0x14a3cf(0x36b)]=function(){const _0x43ce19=_0x14a3cf;if(this['isSkill']()&&this[_0x43ce19(0x24d)]()[_0x43ce19(0x210)]()){AIManager[_0x43ce19(0x222)](this['subject'](),this[_0x43ce19(0x276)]());if(this[_0x43ce19(0x35b)]()){if(_0x43ce19(0x26a)!==_0x43ce19(0x26a))return _0x393ec7[_0x43ce19(0x232)](_0x5c4a27);else AIManager[_0x43ce19(0x2d5)](this[_0x43ce19(0x24d)](),this[_0x43ce19(0x276)]());}}$gameTemp[_0x43ce19(0x1ef)](this[_0x43ce19(0x24d)](),this);const _0x1b30b5=VisuMZ['BattleAI'][_0x43ce19(0x2df)][_0x43ce19(0x331)](this);return $gameTemp[_0x43ce19(0x267)](),AIManager[_0x43ce19(0x20f)](),_0x1b30b5;},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x223)]=Game_Action[_0x14a3cf(0x243)][_0x14a3cf(0x225)],Game_Action['prototype'][_0x14a3cf(0x225)]=function(){const _0x5e2cb5=_0x14a3cf,_0x26e99c=this[_0x5e2cb5(0x24d)](),_0x535938=this[_0x5e2cb5(0x276)]();let _0x163add=VisuMZ[_0x5e2cb5(0x307)]['Game_Action_itemTargetCandidates'][_0x5e2cb5(0x331)](this);if(_0x26e99c[_0x5e2cb5(0x210)]()&&AIManager[_0x5e2cb5(0x296)](_0x26e99c,_0x535938)){let _0x13eb88=AIManager['makeValidTargets'](_0x26e99c,_0x535938);_0x163add=_0x163add[_0x5e2cb5(0x381)](_0x30f222=>_0x13eb88[_0x5e2cb5(0x2f7)](_0x30f222));}return _0x163add;},VisuMZ[_0x14a3cf(0x307)]['Game_Action_apply']=Game_Action[_0x14a3cf(0x243)]['apply'],Game_Action['prototype'][_0x14a3cf(0x2d9)]=function(_0x534d7e){const _0x518f9a=_0x14a3cf;VisuMZ['BattleAI'][_0x518f9a(0x352)][_0x518f9a(0x331)](this,_0x534d7e),this['applyBattleAI'](_0x534d7e);},Game_Action[_0x14a3cf(0x243)]['applyBattleAI']=function(_0x47e235){const _0x11745f=_0x14a3cf;if(!_0x47e235)return;if(this[_0x11745f(0x24d)]()[_0x11745f(0x254)]()===_0x47e235['isActor']())return;let _0x3aee56=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x3aee56=this[_0x11745f(0x241)]();else this['item']()[_0x11745f(0x23a)][_0x11745f(0x2a9)]<0x0?_0x3aee56=this[_0x11745f(0x24d)]()[_0x11745f(0x32f)]():_0x3aee56=[this['item']()[_0x11745f(0x23a)]['elementId']];_0x47e235[_0x11745f(0x34f)](_0x3aee56,this[_0x11745f(0x1fb)](),this[_0x11745f(0x24e)]());},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x2f9)]=Game_BattlerBase[_0x14a3cf(0x243)][_0x14a3cf(0x1eb)],Game_BattlerBase[_0x14a3cf(0x243)][_0x14a3cf(0x1eb)]=function(_0xb0a95d){const _0x2fec4a=_0x14a3cf;let _0x372b2d=VisuMZ['BattleAI'][_0x2fec4a(0x2f9)]['call'](this,_0xb0a95d);return _0xb0a95d===0x0&&(_0x2fec4a(0x236)!==_0x2fec4a(0x236)?this[_0x2fec4a(0x210)]()?this[_0x2fec4a(0x320)]():_0x15379b['BattleAI'][_0x2fec4a(0x214)]['call'](this):_0x372b2d*=this['applyBattleAiTgrInfluences']()),_0x372b2d;},Game_BattlerBase[_0x14a3cf(0x243)][_0x14a3cf(0x346)]=function(){const _0x5e3fe9=_0x14a3cf,_0x3f57fb=$gameTemp[_0x5e3fe9(0x28b)](),_0x1ef481=this['opponentsUnit']();if(Imported[_0x5e3fe9(0x224)]){if(_0x3f57fb[_0x5e3fe9(0x264)]&&_0x3f57fb[_0x5e3fe9(0x264)][_0x5e3fe9(0x1de)]())return 0x1;}let _0x153784=0x1;if(_0x3f57fb['elementInfluence'])for(const _0x131c40 of _0x3f57fb[_0x5e3fe9(0x204)]){if(_0x5e3fe9(0x261)===_0x5e3fe9(0x261)){if(_0x1ef481['hasElementAIKnowledge'](_0x131c40,this)){if('fMnqV'!==_0x5e3fe9(0x32e))return _0x2ab455[_0x5e3fe9(0x243)][_0x5e3fe9(0x29e)][_0x5e3fe9(0x331)](this,_0x49ab09);else _0x153784*=this[_0x5e3fe9(0x232)](_0x131c40)*_0x3f57fb[_0x5e3fe9(0x20d)];}}else _0x40a25b['filterForcedTargeting'](this['subject'](),this[_0x5e3fe9(0x276)]());}if(_0x1ef481[_0x5e3fe9(0x2d1)](_0x5e3fe9(0x334),this)){if('AxJwi'===_0x5e3fe9(0x221))_0x153784*=0x1-this[_0x5e3fe9(0x334)]*_0x3f57fb[_0x5e3fe9(0x2b5)];else return![];}return _0x1ef481[_0x5e3fe9(0x2d1)]('mev',this)&&(_0x153784*=0x1-this[_0x5e3fe9(0x322)]*_0x3f57fb[_0x5e3fe9(0x317)]),_0x153784[_0x5e3fe9(0x28d)](0.001,0x3e8);},Game_BattlerBase[_0x14a3cf(0x243)][_0x14a3cf(0x2d8)]=function(){const _0x497c9c=_0x14a3cf;return _0x497c9c(0x373);},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x210)]=function(){if(this['isConfused']())return![];return!![];},Game_Battler[_0x14a3cf(0x243)]['determineNewValidAIAction']=function(){},Game_Battler['prototype']['doesAIApplyElementalTgrInfluence']=function(){const _0x583b13=_0x14a3cf;if(this[_0x583b13(0x254)]()||this[_0x583b13(0x2b3)]()){if('gtaMr'!==_0x583b13(0x21a)){_0x3c3f1c[_0x583b13(0x243)]['determineNewValidAIAction'][_0x583b13(0x331)](this);if(this['numActions']()>0x0){const _0xbb3fb7=this['enemy']()[_0x583b13(0x1e4)][_0x583b13(0x381)](_0x354374=>this[_0x583b13(0x29e)](_0x354374));_0xbb3fb7[_0x583b13(0x2fd)]>0x0?this['selectAllActions'](_0xbb3fb7):this['clearActions']();}}else{const _0x5e6496=this[_0x583b13(0x254)]()?this[_0x583b13(0x23f)]()['note']:this[_0x583b13(0x22e)]()[_0x583b13(0x298)];if(_0x5e6496[_0x583b13(0x2a7)](AIManager[_0x583b13(0x1f4)][_0x583b13(0x1fd)]))return![];else{if(_0x5e6496[_0x583b13(0x2a7)](AIManager[_0x583b13(0x1f4)][_0x583b13(0x369)])){if(_0x583b13(0x342)!==_0x583b13(0x36d))return this[_0x583b13(0x2bf)]()>0x0;else{if(_0x1dea61&&_0x737a77['hp']>_0x5e2d28['hp'])_0x5a5aca=_0x342ddf;if(_0x3ad725&&_0x2c9c64['hp']<_0x3e96a0['hp'])_0x12853a=_0x330cf6;}}}}}return VisuMZ[_0x583b13(0x307)][_0x583b13(0x328)][_0x583b13(0x33c)][_0x583b13(0x351)];},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x2bf)]=function(){const _0x39a6ab=_0x14a3cf;if(this[_0x39a6ab(0x254)]()||this['isEnemy']()){const _0x3e162f=this[_0x39a6ab(0x254)]()?this[_0x39a6ab(0x23f)]()['note']:this[_0x39a6ab(0x22e)]()[_0x39a6ab(0x298)];if(_0x3e162f[_0x39a6ab(0x2a7)](AIManager[_0x39a6ab(0x1f4)]['aiElementTgr']))return _0x39a6ab(0x268)!==_0x39a6ab(0x268)?_0x4bae2a[_0x39a6ab(0x243)]['meetsHpCondition']['call'](this,_0x2b2d51,_0x4267ce):eval(RegExp['$1']);}return VisuMZ[_0x39a6ab(0x307)][_0x39a6ab(0x328)][_0x39a6ab(0x33c)][_0x39a6ab(0x2ac)];},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x343)]=function(){const _0xf2a3b4=_0x14a3cf;if(this[_0xf2a3b4(0x254)]()||this[_0xf2a3b4(0x2b3)]()){const _0x17bf87=this['isActor']()?this['actor']()['note']:this[_0xf2a3b4(0x22e)]()[_0xf2a3b4(0x298)];if(_0x17bf87[_0xf2a3b4(0x2a7)](AIManager['_regexp']['bypassEvaTgr']))return![];else{if(_0x17bf87[_0xf2a3b4(0x2a7)](AIManager[_0xf2a3b4(0x1f4)]['aiEvaTgr']))return this[_0xf2a3b4(0x375)]()>0x0;}}return VisuMZ[_0xf2a3b4(0x307)]['Settings'][_0xf2a3b4(0x33c)][_0xf2a3b4(0x218)];},Game_Battler['prototype']['aiApplyEvaTgrInfluenceRate']=function(){const _0x399c27=_0x14a3cf;if(this[_0x399c27(0x254)]()||this[_0x399c27(0x2b3)]()){if('adKQY'===_0x399c27(0x366))return _0x2ce491[_0x399c27(0x243)]['meetsMpCondition'][_0x399c27(0x331)](this,_0x270759,_0x11123c);else{const _0x54be29=this['isActor']()?this['actor']()['note']:this[_0x399c27(0x22e)]()[_0x399c27(0x298)];if(_0x54be29['match'](AIManager[_0x399c27(0x1f4)]['aiEvaTgr']))return eval(RegExp['$1']);}}return VisuMZ[_0x399c27(0x307)][_0x399c27(0x328)][_0x399c27(0x33c)][_0x399c27(0x22b)];},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x1f3)]=function(){const _0x3a16c9=_0x14a3cf;if(this[_0x3a16c9(0x254)]()||this[_0x3a16c9(0x2b3)]()){const _0x3f5d94=this[_0x3a16c9(0x254)]()?this[_0x3a16c9(0x23f)]()[_0x3a16c9(0x298)]:this[_0x3a16c9(0x22e)]()['note'];if(_0x3f5d94[_0x3a16c9(0x2a7)](AIManager[_0x3a16c9(0x1f4)][_0x3a16c9(0x26f)]))return _0x3a16c9(0x2cc)!==_0x3a16c9(0x348)?![]:_0x3e3a75[_0x3a16c9(0x243)][_0x3a16c9(0x226)][_0x3a16c9(0x331)](this,_0x1c6782);else{if(_0x3f5d94[_0x3a16c9(0x2a7)](AIManager[_0x3a16c9(0x1f4)][_0x3a16c9(0x389)]))return this[_0x3a16c9(0x2bd)]()>0x0;}}return VisuMZ[_0x3a16c9(0x307)]['Settings'][_0x3a16c9(0x33c)][_0x3a16c9(0x218)];},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x2bd)]=function(){const _0x2d93e0=_0x14a3cf;if(this[_0x2d93e0(0x254)]()||this[_0x2d93e0(0x2b3)]()){if(_0x2d93e0(0x2f4)!==_0x2d93e0(0x2f4))_0x2d5a1=_0x151dc5[_0x2d93e0(0x2f5)]()[_0x2d93e0(0x2ef)]();else{const _0x2934f5=this[_0x2d93e0(0x254)]()?this[_0x2d93e0(0x23f)]()[_0x2d93e0(0x298)]:this['enemy']()[_0x2d93e0(0x298)];if(_0x2934f5[_0x2d93e0(0x2a7)](AIManager[_0x2d93e0(0x1f4)][_0x2d93e0(0x389)]))return eval(RegExp['$1']);}}return VisuMZ[_0x2d93e0(0x307)][_0x2d93e0(0x328)][_0x2d93e0(0x33c)][_0x2d93e0(0x22b)];},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x379)]=function(){const _0x28bb41=_0x14a3cf,_0x3d86db=VisuMZ[_0x28bb41(0x307)][_0x28bb41(0x328)][_0x28bb41(0x255)];if(this[_0x28bb41(0x254)]()||this[_0x28bb41(0x2b3)]()){if(_0x28bb41(0x2fb)===_0x28bb41(0x2eb))this[_0x28bb41(0x24a)]()[_0x30f21a][_0x28bb41(0x293)](_0x3d4b78);else{const _0x332f8e=this[_0x28bb41(0x254)]()?this[_0x28bb41(0x23f)]()[_0x28bb41(0x298)]:this[_0x28bb41(0x22e)]()['note'];if(_0x332f8e['match'](AIManager[_0x28bb41(0x1f4)]['aiLevel']))return Number(RegExp['$1'])['clamp'](0x0,0x64);else{if(this['isActor']())return _0x3d86db[_0x28bb41(0x2b1)];else{if(this['isEnemy']())return _0x3d86db[_0x28bb41(0x304)];}}}}return _0x3d86db[_0x28bb41(0x304)];},Game_Battler[_0x14a3cf(0x243)]['addAIKnowledge']=function(_0x349c19,_0x5e6650,_0x3f746d){const _0x3b4b5f=_0x14a3cf,_0x14c161=this[_0x3b4b5f(0x2dd)]();if(_0x349c19&&_0x349c19['length']>0x0){if(_0x3b4b5f(0x2cd)!==_0x3b4b5f(0x36a))for(const _0xfd11da of _0x349c19){_0x14c161[_0x3b4b5f(0x30d)](_0xfd11da,this);}else{const _0x54b84a=_0x37cc2a['indexOf'](_0x332968(_0x2c5432['$2'])[_0x3b4b5f(0x209)]()[_0x3b4b5f(0x380)]()),_0x4c59f5=_0x1e2fb2(_0xd3138c['$3'])['toLowerCase']()[_0x3b4b5f(0x380)](),_0x2a80c0=_0x15d886(_0x5d1807['$1'])[_0x3b4b5f(0x2a7)](/(?:USER|SUBJECT)/i)?_0x2f7686:_0x31c35a,_0x24be34=_0x3b4b5f(0x235)['format'](_0x4c59f5[_0x3b4b5f(0x361)](0x0)[_0x3b4b5f(0x209)]()+_0x4c59f5['slice'](0x1));return!_0x2a80c0[_0x24be34](_0x54b84a);}}if(_0x5e6650){if(_0x3b4b5f(0x35e)!==_0x3b4b5f(0x35e))return _0x6c47f0[_0x3b4b5f(0x2f5)]()[_0x3b4b5f(0x2a0)]()[_0x3b4b5f(0x2fd)];else _0x14c161[_0x3b4b5f(0x287)](_0x3b4b5f(0x1f8),this);}if(_0x3f746d){if(_0x3b4b5f(0x24c)===_0x3b4b5f(0x24c))_0x14c161[_0x3b4b5f(0x287)](_0x3b4b5f(0x2d4),this);else{const _0x273108=this[_0x3b4b5f(0x254)]()?this['actor']()['note']:this[_0x3b4b5f(0x22e)]()[_0x3b4b5f(0x298)];if(_0x273108[_0x3b4b5f(0x2a7)](_0x84ca69['_regexp']['aiEvaTgr']))return _0x53576d(_0x1fc21a['$1']);}}},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x2d1)]=function(_0x7357e5){const _0x488957=_0x14a3cf,_0x41378c=this[_0x488957(0x2dd)]();return _0x41378c[_0x488957(0x2d1)](_0x7357e5,this);},Game_Battler[_0x14a3cf(0x243)]['aiRatingVariance']=function(){const _0x203eaf=_0x14a3cf,_0x549f06=VisuMZ[_0x203eaf(0x307)]['Settings'][_0x203eaf(0x255)];if(this['isActor']()||this[_0x203eaf(0x2b3)]()){if(_0x203eaf(0x1f1)==='QlmUM'){const _0x46599c=this[_0x203eaf(0x254)]()?this[_0x203eaf(0x23f)]()['note']:this[_0x203eaf(0x22e)]()[_0x203eaf(0x298)];if(_0x46599c[_0x203eaf(0x2a7)](AIManager[_0x203eaf(0x1f4)][_0x203eaf(0x277)]))return Number(RegExp['$1'])[_0x203eaf(0x28d)](0x0,0x9);else{if(this[_0x203eaf(0x254)]())return _0x549f06[_0x203eaf(0x27d)]['clamp'](0x0,0x9);else{if(this[_0x203eaf(0x2b3)]()){if('ORsWK'===_0x203eaf(0x2c5)){const _0x2f78bd=_0x52b2b2[_0x203eaf(0x25c)](_0x49b295(_0x387b7f['$2'])[_0x203eaf(0x209)]()['trim']()),_0x146226=_0x21ab62(_0x3f6e40['$3'])[_0x203eaf(0x34b)]()['trim'](),_0x41be74=_0x3ecc4f(_0x1c7a03['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x299a35:_0x15f269,_0x2a1dcc=_0x203eaf(0x235)['format'](_0x146226['charAt'](0x0)[_0x203eaf(0x209)]()+_0x146226[_0x203eaf(0x372)](0x1));return _0x41be74[_0x2a1dcc](_0x2f78bd);}else return _0x549f06[_0x203eaf(0x337)][_0x203eaf(0x28d)](0x0,0x9);}}}}else{if(_0x4c5cad&&_0x272f00[_0x203eaf(0x26b)]()>_0x55f66a[_0x203eaf(0x26b)]())_0x360357=_0xb63196;if(_0x224257&&_0x43aa73[_0x203eaf(0x26b)]()<_0x4b70d0[_0x203eaf(0x26b)]())_0x3615e1=_0x197191;}}return _0x549f06['EnemyRatingVariance'][_0x203eaf(0x28d)](0x0,0x9);},VisuMZ['BattleAI'][_0x14a3cf(0x299)]=Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x228)],Game_Battler['prototype'][_0x14a3cf(0x228)]=function(){const _0x4d1b27=_0x14a3cf;return VisuMZ[_0x4d1b27(0x307)][_0x4d1b27(0x328)]['General'][_0x4d1b27(0x212)]&&!BattleManager[_0x4d1b27(0x292)]()?$gameTroop[_0x4d1b27(0x228)]():VisuMZ[_0x4d1b27(0x307)]['Game_Battler_turnCount'][_0x4d1b27(0x331)](this);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x210)]=function(){const _0x4e090d=_0x14a3cf;if(this[_0x4e090d(0x2c0)]())return![];return this[_0x4e090d(0x23d)]()&&this[_0x4e090d(0x1e2)]();},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x1e2)]=function(){const _0x254d6e=_0x14a3cf,_0x3be73c=this[_0x254d6e(0x1ee)]()[_0x254d6e(0x298)];if(_0x3be73c[_0x254d6e(0x2a7)](/<NO REFERENCE AI>/i))return null;else{if(_0x3be73c[_0x254d6e(0x2a7)](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x3be73c[_0x254d6e(0x2a7)](/<REFERENCE AI: (.*)>/i))return $dataEnemies[DataManager[_0x254d6e(0x1f2)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ[_0x254d6e(0x307)][_0x254d6e(0x328)][_0x254d6e(0x255)]['ActorAIReference']];},Game_Actor[_0x14a3cf(0x243)]['aiStyle']=function(){const _0x30a8da=_0x14a3cf,_0x8e13ac=this[_0x30a8da(0x1ee)]()[_0x30a8da(0x298)];if(_0x8e13ac['match'](AIManager[_0x30a8da(0x1f4)][_0x30a8da(0x2d8)])){if('vUeXi'===_0x30a8da(0x1f0)){const _0x546fcf=_0x1205c2[_0x30a8da(0x25c)](_0x4edae0);_0xd7f0db=this[_0x30a8da(0x213)][0x0];for(const _0x139b64 of this['_forceValidTargets']){if(_0x1ec2e&&_0x139b64[_0x30a8da(0x2d6)](_0x546fcf)>_0x67605f[_0x30a8da(0x2d6)](_0x546fcf))_0xb59433=_0x139b64;if(_0x1cbddf&&_0x139b64[_0x30a8da(0x2d6)](_0x546fcf)<_0x1dcbaf[_0x30a8da(0x2d6)](_0x546fcf))_0x196829=_0x139b64;}return _0x1a74a5;}else return String(RegExp['$1'])[_0x30a8da(0x34b)]()[_0x30a8da(0x380)]();}return VisuMZ['BattleAI'][_0x30a8da(0x328)]['General'][_0x30a8da(0x339)];},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x242)]=function(){const _0x2efd0b=_0x14a3cf;Game_Battler[_0x2efd0b(0x243)][_0x2efd0b(0x242)][_0x2efd0b(0x331)](this),this[_0x2efd0b(0x1e7)]();},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x214)]=Game_Actor['prototype'][_0x14a3cf(0x1e7)],Game_Actor['prototype'][_0x14a3cf(0x1e7)]=function(){const _0xaf0a82=_0x14a3cf;if(this['isDetermineActionByAI']()){if('uymNj'!==_0xaf0a82(0x2a2)){const _0x1b244e=this['isActor']()?this['actor']()[_0xaf0a82(0x298)]:this[_0xaf0a82(0x22e)]()[_0xaf0a82(0x298)];if(_0x1b244e['match'](_0x1d35c8[_0xaf0a82(0x1f4)][_0xaf0a82(0x369)]))return _0x4e8430(_0x13f0d0['$1']);}else this[_0xaf0a82(0x320)]();}else VisuMZ['BattleAI'][_0xaf0a82(0x214)]['call'](this);},Game_Actor['prototype'][_0x14a3cf(0x320)]=function(){const _0x2c961c=_0x14a3cf;if(this[_0x2c961c(0x21d)]()>0x0){const _0xec23d3=this['usableSkills']();if(this[_0x2c961c(0x217)]())_0xec23d3[_0x2c961c(0x293)]($dataSkills[this['attackSkillId']()]);if(this[_0x2c961c(0x1f9)]())_0xec23d3[_0x2c961c(0x293)]($dataSkills[this[_0x2c961c(0x2e3)]()]);const _0x304a3d=this['referenceEnemyForAI'](),_0x6e50df=JsonEx['makeDeepCopy'](_0x304a3d[_0x2c961c(0x1e4)]);for(const _0x53a144 of _0x6e50df){if(_0x53a144[_0x2c961c(0x249)]===0x1)_0x53a144['skillId']=this[_0x2c961c(0x2ff)]();if(_0x53a144[_0x2c961c(0x249)]===0x2)_0x53a144[_0x2c961c(0x249)]=this[_0x2c961c(0x2e3)]();}const _0x5cc6a9=_0x6e50df[_0x2c961c(0x381)](_0x44b64b=>this[_0x2c961c(0x29e)](_0x44b64b)&&_0xec23d3[_0x2c961c(0x2f7)]($dataSkills[_0x44b64b[_0x2c961c(0x249)]]));if(_0x5cc6a9[_0x2c961c(0x2fd)]>0x0){if(_0x2c961c(0x211)!=='ITjav')return _0x53336f[_0x2c961c(0x2f5)]()['deadMembers']()[_0x2c961c(0x2fd)];else{this[_0x2c961c(0x391)](_0x5cc6a9);return;}}}VisuMZ[_0x2c961c(0x307)][_0x2c961c(0x214)]['call'](this);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x283)]=function(_0x5275d2){const _0x5d851f=_0x14a3cf;return Game_Enemy['prototype'][_0x5d851f(0x283)][_0x5d851f(0x331)](this,_0x5275d2);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x2a1)]=function(_0x1203aa,_0x327b76){const _0x16f11d=_0x14a3cf;return Game_Enemy['prototype']['meetsTurnCondition'][_0x16f11d(0x331)](this,_0x1203aa,_0x327b76);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x2d3)]=function(_0x11aaee,_0x1af775){const _0x4a6f10=_0x14a3cf;return Game_Enemy['prototype'][_0x4a6f10(0x2d3)]['call'](this,_0x11aaee,_0x1af775);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x356)]=function(_0x270eca,_0x169a50){const _0x50a281=_0x14a3cf;return Game_Enemy[_0x50a281(0x243)][_0x50a281(0x356)][_0x50a281(0x331)](this,_0x270eca,_0x169a50);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x272)]=function(_0x4e1553){const _0x1e6c08=_0x14a3cf;return Game_Enemy[_0x1e6c08(0x243)][_0x1e6c08(0x272)][_0x1e6c08(0x331)](this,_0x4e1553);},Game_Actor['prototype'][_0x14a3cf(0x226)]=function(_0x5d1ae7){const _0x4f8d1a=_0x14a3cf;return Game_Enemy[_0x4f8d1a(0x243)][_0x4f8d1a(0x226)][_0x4f8d1a(0x331)](this,_0x5d1ae7);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x38f)]=function(_0x3bdced){const _0x34a2a8=_0x14a3cf;return Game_Enemy[_0x34a2a8(0x243)][_0x34a2a8(0x38f)][_0x34a2a8(0x331)](this,_0x3bdced);},Game_Enemy[_0x14a3cf(0x243)][_0x14a3cf(0x2d8)]=function(){const _0x13bceb=_0x14a3cf,_0x57bdb4=this[_0x13bceb(0x22e)]()['note'];if(_0x57bdb4[_0x13bceb(0x2a7)](AIManager[_0x13bceb(0x1f4)]['aiStyle'])){if(_0x13bceb(0x355)!=='zjaHI')return String(RegExp['$1'])[_0x13bceb(0x34b)]()[_0x13bceb(0x380)]();else{if(!_0x15910e)return;if(this[_0x13bceb(0x24d)]()[_0x13bceb(0x254)]()===_0x1eb9ef[_0x13bceb(0x254)]())return;let _0x48e68a=[];if(_0xc4fe0b['VisuMZ_1_ElementStatusCore'])_0x48e68a=this['elements']();else this[_0x13bceb(0x276)]()[_0x13bceb(0x23a)][_0x13bceb(0x2a9)]<0x0?_0x48e68a=this[_0x13bceb(0x24d)]()['attackElements']():_0x48e68a=[this[_0x13bceb(0x276)]()['damage']['elementId']];_0x2e05e7[_0x13bceb(0x34f)](_0x48e68a,this[_0x13bceb(0x1fb)](),this[_0x13bceb(0x24e)]());}}return VisuMZ['BattleAI'][_0x13bceb(0x328)][_0x13bceb(0x255)][_0x13bceb(0x219)];},VisuMZ['BattleAI'][_0x14a3cf(0x386)]=Game_Enemy[_0x14a3cf(0x243)][_0x14a3cf(0x29e)],Game_Enemy[_0x14a3cf(0x243)]['isActionValid']=function(_0x37bf65){const _0x3c845c=_0x14a3cf;if(!VisuMZ['BattleAI'][_0x3c845c(0x386)][_0x3c845c(0x331)](this,_0x37bf65))return![];if(this[_0x3c845c(0x2d8)]()==='random')return!![];return AIManager[_0x3c845c(0x296)](this,$dataSkills[_0x37bf65[_0x3c845c(0x249)]]);},Game_Actor['prototype'][_0x14a3cf(0x29e)]=function(_0x3ca3e6){const _0x371c36=_0x14a3cf;return Game_Enemy['prototype'][_0x371c36(0x29e)][_0x371c36(0x331)](this,_0x3ca3e6);},Game_Enemy[_0x14a3cf(0x243)][_0x14a3cf(0x2b2)]=function(_0x1ff6e9,_0x54d514){const _0x339088=_0x14a3cf,_0x4b3f21=_0x1ff6e9[_0x339088(0x2f0)]((_0x268524,_0x5078c9)=>_0x268524+_0x5078c9[_0x339088(0x377)]-_0x54d514,0x0);if(_0x4b3f21>=0x0){if(_0x339088(0x256)===_0x339088(0x21c))_0x31d96d[_0x339088(0x243)][_0x339088(0x242)][_0x339088(0x331)](this),this[_0x339088(0x1e7)]();else{let _0x3aeecd=Math[_0x339088(0x365)](_0x4b3f21);for(const _0x182418 of _0x1ff6e9){if('diDaM'!=='OOxOY'){_0x3aeecd-=_0x182418[_0x339088(0x377)]-_0x54d514;if(_0x3aeecd<=0x0)return _0x339088(0x30b)===_0x339088(0x30b)?_0x182418:_0x369b18['_buffTurns'][_0x16c8e6];}else{if(this['isActor']()||this[_0x339088(0x2b3)]()){const _0x4a83fc=this[_0x339088(0x254)]()?this[_0x339088(0x23f)]()[_0x339088(0x298)]:this[_0x339088(0x22e)]()['note'];if(_0x4a83fc[_0x339088(0x2a7)](_0x1c2e98[_0x339088(0x1f4)][_0x339088(0x37d)]))return![];else{if(_0x4a83fc[_0x339088(0x2a7)](_0x1fb27e[_0x339088(0x1f4)][_0x339088(0x358)]))return this[_0x339088(0x375)]()>0x0;}}return _0x33845e[_0x339088(0x307)][_0x339088(0x328)][_0x339088(0x33c)][_0x339088(0x218)];}}}}else return null;},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x2b2)]=function(_0x206217,_0x3e13f4){const _0x4c39c2=_0x14a3cf;return Game_Enemy[_0x4c39c2(0x243)][_0x4c39c2(0x2b2)][_0x4c39c2(0x331)](this,_0x206217,_0x3e13f4);},Game_Enemy[_0x14a3cf(0x243)][_0x14a3cf(0x391)]=function(_0x5466d8){const _0x3387dd=_0x14a3cf,_0x100b27=String(this['aiStyle']())['toLowerCase']()[_0x3387dd(0x380)]();if([_0x3387dd(0x338),_0x3387dd(0x27a)][_0x3387dd(0x2f7)](_0x100b27))this[_0x3387dd(0x29a)](_0x5466d8);else _0x100b27===_0x3387dd(0x2c2)?this[_0x3387dd(0x281)](_0x5466d8):this[_0x3387dd(0x310)](_0x5466d8);},Game_Actor[_0x14a3cf(0x243)][_0x14a3cf(0x391)]=function(_0x2c272b){const _0x51018e=_0x14a3cf;Game_Enemy[_0x51018e(0x243)][_0x51018e(0x391)][_0x51018e(0x331)](this,_0x2c272b);},Game_Battler[_0x14a3cf(0x243)][_0x14a3cf(0x310)]=function(_0x4a019a){const _0x429aeb=_0x14a3cf,_0x39367b=Math['max'](..._0x4a019a[_0x429aeb(0x2e2)](_0x232dcd=>_0x232dcd[_0x429aeb(0x377)])),_0x427739=_0x39367b-this[_0x429aeb(0x277)](),_0x2bca68=this[_0x429aeb(0x21d)]();_0x4a019a=_0x4a019a[_0x429aeb(0x381)](_0x1b4f81=>_0x1b4f81['rating']>=_0x427739);for(let _0x3afa7e=0x0;_0x3afa7e<_0x2bca68;_0x3afa7e++){_0x4a019a=VisuMZ[_0x429aeb(0x307)]['ShuffleArray'](_0x4a019a);const _0x3ad7e9=this['selectAction'](_0x4a019a,_0x427739);this[_0x429aeb(0x264)](_0x3afa7e)[_0x429aeb(0x27e)](_0x3ad7e9);}},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x1ff)]=function(_0x246dee){const _0x46077a=_0x14a3cf;var _0x5eb443,_0x309c1a,_0x32f087;for(_0x32f087=_0x246dee['length']-0x1;_0x32f087>0x0;_0x32f087--){if(_0x46077a(0x37b)===_0x46077a(0x324)){const _0x3d2570=_0x31533b[_0x46077a(0x25c)](_0x3f21a6);_0x2b19fd=this[_0x46077a(0x213)][0x0];for(const _0x34a2ba of this['_forceValidTargets']){if(_0x2db012&&_0x34a2ba[_0x46077a(0x233)](_0x3d2570)>_0x254991['param'](_0x3d2570))_0x9418a7=_0x34a2ba;if(_0x1cc112&&_0x34a2ba[_0x46077a(0x233)](_0x3d2570)<_0x3a8742[_0x46077a(0x233)](_0x3d2570))_0x29b05a=_0x34a2ba;}return _0x231ae5;}else _0x5eb443=Math[_0x46077a(0x2f6)](Math[_0x46077a(0x338)]()*(_0x32f087+0x1)),_0x309c1a=_0x246dee[_0x32f087],_0x246dee[_0x32f087]=_0x246dee[_0x5eb443],_0x246dee[_0x5eb443]=_0x309c1a;}return _0x246dee;},Game_Battler['prototype']['selectAllActionsGambit']=function(_0xc2371e){const _0x567e71=_0x14a3cf;for(let _0x3b2289=0x0;_0x3b2289<this[_0x567e71(0x21d)]();_0x3b2289++){const _0x1100c4=_0xc2371e[0x0];this[_0x567e71(0x264)](_0x3b2289)[_0x567e71(0x27e)](_0x1100c4);}},Game_Battler[_0x14a3cf(0x243)]['selectAllActionsRandom']=function(_0x1feaa0){const _0x2efe9e=_0x14a3cf;for(let _0x13c947=0x0;_0x13c947<this['numActions']();_0x13c947++){if(_0x2efe9e(0x305)!==_0x2efe9e(0x36c)){const _0x11f8df=_0x1feaa0[Math[_0x2efe9e(0x365)](_0x1feaa0[_0x2efe9e(0x2fd)])];this[_0x2efe9e(0x264)](_0x13c947)[_0x2efe9e(0x27e)](_0x11f8df);}else{if(_0x3cc3ca&&_0x595fd1['param'](_0x4e082b)>_0x48a3ca[_0x2efe9e(0x233)](_0x13326d))_0x4d07fb=_0x169e4d;if(_0x1e3a4d&&_0x2a6fe6['param'](_0x166570)<_0x573baa[_0x2efe9e(0x233)](_0x37cedd))_0x5057c7=_0x51ab64;}}},Game_Enemy[_0x14a3cf(0x243)][_0x14a3cf(0x242)]=function(){const _0x3d92b2=_0x14a3cf;Game_Battler['prototype'][_0x3d92b2(0x242)][_0x3d92b2(0x331)](this);if(this['numActions']()>0x0){if(_0x3d92b2(0x288)==='hxrSn'){const _0x154a6e=this[_0x3d92b2(0x22e)]()[_0x3d92b2(0x1e4)][_0x3d92b2(0x381)](_0x4be9ce=>this[_0x3d92b2(0x29e)](_0x4be9ce));_0x154a6e[_0x3d92b2(0x2fd)]>0x0?'hbwio'!==_0x3d92b2(0x1e8)?this['selectAllActions'](_0x154a6e):_0x8f0075=_0x2ecbcd[_0x3d92b2(0x2f5)]()[_0x3d92b2(0x2a0)]():this['clearActions']();}else _0x3a3381=_0x3d92b2(0x205)[_0x3d92b2(0x37f)](_0x469a8),_0x459e74=_0x18b085[_0x584e78],_0xe7f8fa=_0x658879['concat'](_0x57530d[_0x3d92b2(0x31d)](/[\r\n]+/)[_0x3d92b2(0x247)](''));}},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x30a)]=Game_Unit[_0x14a3cf(0x243)]['initialize'],Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x260)]=function(){const _0x1a2cd5=_0x14a3cf;VisuMZ[_0x1a2cd5(0x307)][_0x1a2cd5(0x30a)][_0x1a2cd5(0x331)](this),this[_0x1a2cd5(0x1f6)]();},Game_Unit[_0x14a3cf(0x243)]['initBattleAI']=function(){const _0x8aab92=_0x14a3cf;this[_0x8aab92(0x393)]=![],this['clearAIKnowledge']();},VisuMZ[_0x14a3cf(0x307)]['Game_Unit_aliveMembers']=Game_Unit['prototype'][_0x14a3cf(0x2a0)],Game_Unit[_0x14a3cf(0x243)]['aliveMembers']=function(){const _0x101f92=_0x14a3cf;let _0x3f7b8a=VisuMZ[_0x101f92(0x307)]['Game_Unit_aliveMembers'][_0x101f92(0x331)](this);if(this[_0x101f92(0x393)]){const _0x5605f0=AIManager['forcedTargets']();_0x3f7b8a=_0x3f7b8a[_0x101f92(0x381)](_0x553725=>_0x5605f0[_0x101f92(0x2f7)](_0x553725));}return _0x3f7b8a;},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x22c)]=Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x265)],Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x265)]=function(){const _0x310064=_0x14a3cf;AIManager['hasForcedTargets']()&&('BZjnR'===_0x310064(0x2ae)?this[_0x310064(0x29a)](_0x9316e7):this[_0x310064(0x393)]=!![]);const _0x3a4550=VisuMZ[_0x310064(0x307)][_0x310064(0x22c)][_0x310064(0x331)](this);return this[_0x310064(0x393)]=![],_0x3a4550;},Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x374)]=function(){const _0x36c76a=_0x14a3cf;this[_0x36c76a(0x2d2)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x24a)]=function(){const _0x114c15=_0x14a3cf;if(this[_0x114c15(0x2d2)]===undefined)this['clearAIKnowledge']();return this[_0x114c15(0x2d2)];},Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x287)]=function(_0x32d1c7,_0x2bef4c){const _0x32ad25=_0x14a3cf;this['aiKnowledge']()[_0x32d1c7]=this[_0x32ad25(0x24a)]()[_0x32d1c7]||[];const _0x3142dd=_0x2bef4c['isActor']()?_0x2bef4c[_0x32ad25(0x344)]():_0x2bef4c[_0x32ad25(0x354)]();!this[_0x32ad25(0x24a)]()[_0x32d1c7]['includes'](_0x3142dd)&&this['aiKnowledge']()[_0x32d1c7][_0x32ad25(0x293)](_0x3142dd);},Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x2d1)]=function(_0x1384dd,_0x273663){const _0x2a9b6d=_0x14a3cf;if(!VisuMZ[_0x2a9b6d(0x307)][_0x2a9b6d(0x328)][_0x2a9b6d(0x255)]['LearnKnowledge'])return!![];const _0x53f652=_0x1384dd['match'](/EVA/i)?_0x2a9b6d(0x1f8):_0x2a9b6d(0x2d4);this[_0x2a9b6d(0x24a)]()[_0x53f652]=this[_0x2a9b6d(0x24a)]()[_0x53f652]||[];const _0x2f0534=_0x273663['isActor']()?_0x273663['actorId']():_0x273663[_0x2a9b6d(0x354)]();return this[_0x2a9b6d(0x24a)]()[_0x53f652][_0x2a9b6d(0x2f7)](_0x2f0534);},Game_Unit[_0x14a3cf(0x243)][_0x14a3cf(0x30d)]=function(_0xe032f4,_0x954c79){const _0x4a3601=_0x14a3cf;this['aiKnowledge']()['elementRates']=this['aiKnowledge']()['elementRates']||{};const _0x460aa3=this[_0x4a3601(0x24a)]()['elementRates'];_0x460aa3[_0xe032f4]=_0x460aa3[_0xe032f4]||[];const _0x58c081=_0x954c79['isActor']()?_0x954c79[_0x4a3601(0x344)]():_0x954c79[_0x4a3601(0x354)]();if(!_0x460aa3[_0xe032f4][_0x4a3601(0x2f7)](_0x58c081)){if(_0x4a3601(0x22a)===_0x4a3601(0x22a))_0x460aa3[_0xe032f4][_0x4a3601(0x293)](_0x58c081);else{if(this[_0x4a3601(0x213)][_0x4a3601(0x2f7)](_0x58fa57))return _0x2e0ed6;}}},Game_Unit[_0x14a3cf(0x243)]['hasElementAIKnowledge']=function(_0x4b9faa,_0x24b387){const _0x535535=_0x14a3cf;if(!VisuMZ[_0x535535(0x307)][_0x535535(0x328)][_0x535535(0x255)]['LearnKnowledge'])return!![];this[_0x535535(0x24a)]()[_0x535535(0x314)]=this[_0x535535(0x24a)]()['elementRates']||{};const _0x325cce=this['aiKnowledge']()[_0x535535(0x314)];_0x325cce[_0x4b9faa]=_0x325cce[_0x4b9faa]||[];const _0x2e46ed=_0x24b387[_0x535535(0x254)]()?_0x24b387['actorId']():_0x24b387['enemyId']();return _0x325cce[_0x4b9faa][_0x535535(0x2f7)](_0x2e46ed);},VisuMZ[_0x14a3cf(0x307)][_0x14a3cf(0x2c6)]=Game_Troop[_0x14a3cf(0x243)]['setup'],Game_Troop['prototype'][_0x14a3cf(0x382)]=function(_0x5ef213){const _0x18d48b=_0x14a3cf;VisuMZ[_0x18d48b(0x307)][_0x18d48b(0x2c6)][_0x18d48b(0x331)](this,_0x5ef213),this[_0x18d48b(0x374)]();};