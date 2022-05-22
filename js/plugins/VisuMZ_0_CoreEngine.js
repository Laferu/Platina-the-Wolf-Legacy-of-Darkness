//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.61;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.61] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
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
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
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
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x526668=_0x5eef;function _0x1e26(){const _0x2cb3c4=['random','paramX','Scene_Map_createSpritesetFix','hide','PreserveNumbers','Scene_Map_createMenuButton','Game_Picture_calcEasing','return\x200','checkSmartEventCollision','SNJOl','uiAreaHeight','NSCaJ','aCTLz','HELP','SParamVocab7','_lastPluginCommandInterpreter','BuyBgType','CallHandlerJS','updateDocumentTitle','NameInputMessage','DocumentTitleFmt','integer','updateFauxAnimations','Location','Scene_Battle_createCancelButton','level','currentLevelExp','TranslucentOpacity','STRUCT','PictureID','CNT','cursorUp','backOpacity','NQiPm','Game_Interpreter_command122','join','Window_Base_drawFace','Scene_Base_createWindowLayer','PixelateImageRendering','BattleManager_update','Game_Action_itemHit','charAt','OptionsBgType','innerWidth','FLPqI','createBackground','initialize','up2','terminate','playTestF6','SUBTRACT','ActorMPColor','rHQQQ','createCustomBackgroundImages','dummyWindowRect','getBackgroundOpacity','Bitmap_initialize','home','IconIndex','XParamVocab4','DNKUx','ENTER','INSERT','updateKeyText','playTestCtrlT','clearForcedGameTroopSettingsCoreEngine','clearOnceParallelInterpreters','_statusWindow','_customModified','isPressed','IconXParam1','_battlerName','deathColor','Scene_Base_terminate','dDgzD','%1〘End\x20Choice\x20Selection〙%1','playEscape','gXZiY','removeFauxAnimation','Chance','JSON','Scene_Map_updateScene','IconSParam9','Scene_Battle_createSpritesetFix','defaultInputMode','fontSize','subjectHitRate','EXR','ovMOc','DrawIcons','salSF','GOizN','forceOutOfPlaytest','addWindow','performEscape','traitsPi','BTB','_helpWindow','ExportCurMapText','Script\x20Call\x20Error','DATABASE','IconSParam8','IconParam1','CTWdF','StatusParamsBgType','faceHeight','Flat2','textAlign','stencilFunc','list','currentClass','HeMvd','IKKFH','ColorGaugeBack','STENCIL_BUFFER_BIT','targetContentsOpacity','xDZEp','OkText','parallaxes','lZRHX','Scene_MenuBase_mainAreaTop','tpGaugeColor2','exit','buttonAssistKey1','ErGte','eHBbT','_fauxAnimationSprites','slotWindowRect','isPhysical','Game_Interpreter_PluginCommand','KUAoD','ARRAYFUNC','MODECHANGE','IconParam6','gosPh','NUM_LOCK','fillRect','removePointAnimation','systemColor','ZKoOz','BottomHelp','updatePosition','isPlaying','_clickHandler','(\x5cd+)([%％])>','_opacity','Game_BattlerBase_refresh','SystemSetWindowPadding','setSkill','_targetScaleX','drawItem','onLoad','loadTitle1','Window_Base_drawText','DataManager_setupNewGame','VVJJB','Graphics_printError','Window_NumberInput_start','LQkEQ','NONCONVERT','boxWidth','globalAlpha','_battleField','REC','ToLUo','IconSet','Origin','goldWindowRect','qiklo','TPB\x20WAIT','ECQlz','Game_Map_setup','fromCharCode','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','touchUI','HaiBj','uyXMp','EaiTQ','nw.gui','setBackgroundOpacity','getColorDataFromPluginParameters','([\x5c+\x5c-]\x5cd+)([%％])>','_registerKeyInput','nickname','_inputString','Scene_Battle_createSpriteset_detach','REPLACE','createBuffer','ParamArrow','buttonAssistKey4','IGeaD','Scene_Item_create','Y:\x20%1','cucvG','cursorPageup','_statusEquipWindow','dJGAE','Pixelated','playCursorSound','setMoveEasingType','clamp','format','processKeyboardBackspace','siKQQ','TRAIT_PARAM','StatusEquipRect','WIN_OEM_FINISH','connected','NTJFL','MDsiy','processKeyboardDelete','currentExp','dPGwY','markCoreEngineModified','NUMPAD0','_lastY','paramName','Mute','SwitchActorText','ForceNoPlayTest','backspace','ONE_MINUS_SRC_ALPHA','checkCacheKey','_centerElementCoreEngine','checkSubstitute','PihQn','Bitmap_drawTextOutline','processPointAnimationRequests','UoQkT','encounterStepsMinimum','setSize','XParamVocab7','bitmap','Game_BattlerBase_initMembers','getColor','PictureShowIcon','JUNJA','useDigitGrouping','LevelUpFullMp','updateEffekseer','createFauxAnimationQueue','contentsBack','StatusRect','pictureButtons','1.4.4','normal','mainFontSize','seVolume','Window_NameInput_cursorPagedown','getCoreEngineScreenShakeStyle','equips','ZUaWJ','send','onEscapeSuccess','isEnabled','_drawTextOutline','itemHitImprovedAccuracy','Scene_Battle_update','cDrOB','SmartEventCollisionPriority','AIkxl','MvAnimationRate','BTestArmors','Input_shouldPreventDefault','XParamVocab0','horizontal','gXiFs','COROj','_statusParamsWindow','deselect','EemcI','drawParamName','reserveNewGameCommonEvent','ColorTPGauge2','Rate1','isForFriend','Scene_Map_createSpriteset','GoldOverlap','BlurFilter','ESC','_downArrowSprite','OpenSpeed','isMaskingEnabled','TGR','HelpRect','isMagical','SgGvu','OutlineColorGauge','canUse','process_VisuMZ_CoreEngine_Notetags','itemEva','RevertPreserveNumbers','_commandList','setupCoreEngine','WIdTG','jLost','_duration','stringKeyMap','IxFJV','ColorManager_loadWindowskin','responseText','updateDashToggle','isTpb','setViewport','buttonAssistOffset3','ActorBgType','pop','isNormalPriority','SPACE','IconSParam0','onerror','CTB','vertical','_forcedBattleSys','optSideView','_pictureName','mFhRU','OXGbQ','SaveMenu','_mapNameWindow','forceStencil','createTextState','mhp','_setupEventHandlers','hit','INOUTQUART','dcxAT','VisuMZ_1_OptionsCore','tab','SwitchToggleRange','DigitGroupingLocale','BattleManager_checkSubstitute','Game_Interpreter_command105','OUTEXPO','30AWMQrO','_pauseSignSprite','SystemLoadAudio','%1:\x20Exit\x20','ColorMaxLvGauge2','hOodO','stop','TqpKW','yjsrX','_hideTileShadows','Window_Selectable_processTouch','onload','sparamPlus','createPointAnimationTargets','bJWNL','_mirror','contents','sYCPR','IjfZQ','wxjtA','scaleMode','add','Window_Base_drawCharacter','_baseTexture','adfoM','mTUSr','ParseEnemyNotetags','offsetX','createCancelButton','darwin','processBack','start','CLOSE_BRACKET','ParseClassNotetags','drawActorExpGauge','BattleManager_processEscape','note','Game_Picture_y','onXhrError','displayX','KzLIW','prsOR','test','createJsQuickFunction','Input_clear','loadSystem','bitmapHeight','default','URL','areTileShadowsHidden','index','colSpacing','createTitleButtons','Game_Action_setAttack','_centerElement','xULjL','_listWindow','_digitGrouping','BottomButtons','pagedown','_updateFilterArea','TfKBc','context','createCommandWindow','TextCodeClassNames','battlebacks1','tilesets','isInputting','veAfj','_scaleX','mapId','Sprite_Actor_setActorHome','transform','repositionEnemiesByResolution','getCombinedScrollingText','startMove','_anchor','Scene_Boot_onDatabaseLoaded','dJHyU','ATTN','Graphics_centerElement','maxGold','subject','layoutSettings','setActionState','canAttack','platform','Sprite_Animation_setViewport','mainCommandWidth','QFhcS','tCPVN','_backSprite','drawGauge','_stored_maxLvGaugeColor2','ColorHPGauge2','mpColor','xrbVi','PIPE','FunctionName','drawIcon','EnableNumberInput','XParamVocab9','original','rOrdb','switchModes','Window','removeAllPointAnimations','_changingClass','_pageupButton','WASD','KANA','eWWcH','EREOF','mpGaugeColor2','Mjeod','reserveCommonEvent','ARyDP','resetBattleSystem','updatePositionCoreEngineShakeHorz','visible','NUMPAD9','LineHeight','lGUwt','Flat','drawCharacter','F17','consumeItem','loadTitle2','flush','FHNFN','destroyed','innerHeight','currentValue','makeEncounterCount','exec','IhNfG','strokeRect','itemSuccessRate','updateLastTarget','mCyjO','targetEvaRate','targetOpacity','(\x5cd+)>','makeInputButtonString','process_VisuMZ_CoreEngine_Settings','onKeyDownKeysF6F7','_shakePower','wJydG','updatePointAnimations','GXtGv','VisuMZ_2_BattleSystemCTB','Max','popScene','CzAKS','WIN_OEM_CLEAR','ExtractStrFromTroop','jtpDq','VdXuQ','isGamepadConnected','gaugeLineHeight','sTcLR','pictures','subtitle','RIGHT','_coreEasing','LqRhL','_dimmerSprite','BuyRect','WIN_ICO_00','advanced','SCKhb','12iBKZpM','command111','yPamh','MULTIPLY','updateMotion','OUTSINE','picture','bABSk','punMD','LaGKR','MrNUH','BJIae','MDF','titles1','contains','TnfdB','Airze','textWidth','uGGSG','concat','GoldBgType','setAttack','ZOOM','VisuMZ_2_BattleSystemOTB','ExtDisplayedParams','wSBLw','Game_Interpreter_command355','processKeyboardHandling','tRNaR','uvjPG','snapForBackground','Window_NameInput_cursorPageup','adjustPictureAntiZoom','Bitmap_clearRect','expRate','OptionsRect','moveRelativeToResolutionChange','measureTextWidth','NumberRect','coreEngineRepositionEnemies','qTkqm','wtNUU','paramValueByName','_active','Icon','CustomParamType','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','ApplyEasing','bwuvG','VariableEvalReference','_repositioned','Graphics_defaultStretchMode','GoldFontSize','MRF','_clientArea','xJAXg','exportAllTroopStrings','processSoundTimings','WPqgz','BgFilename1','Scene_Base_terminateAnimationClearBugFix','ColorMaxLvGauge1','create','command355','constructor','pageup','ExportAllTroopText','NcOTx','ShowJS','getInputMultiButtonStrings','muKMS','loadWindowskin','keyMapper','VOLUME_UP','FDR','SParamVocab1','SceneManager_initialize','Map%1.json','rKvpB','loadIconBitmap','ParseTilesetNotetags','paramBase','overrideMimeType','version','isDying','kdmVP','RightMenus','number','TextManager_param','menu','drawAllParams','Upper\x20Left','type','setupNewGame','Game_Actor_changeClass','textBaseline','_stored_powerUpColor','_onKeyPress','mpCostColor','GoldIcon','IconXParam7','avTnk','initCoreEngineScreenShake','origin','ColorTPGauge1','runCombinedScrollingTextAsCode','setMainFontSize','Game_Picture_move','substring','cursorDown','process_VisuMZ_CoreEngine_RegExp','Bitmap_gradientFillRect','ARRAYEVAL','isSceneBattle','QBAAU','volume','App','CommandBgType','writeFile','lineHeight','VOLUME_MUTE','targetX','height','NumberBgType','updateCoreEasing','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SEPARATOR','setCoreEngineScreenShakeStyle','DigitGroupingDamageSprites','skillTypes','NipCH','bYQzq','maxItems','GgRqE','PRINT','WIttQ','GREATER_THAN','UzrlA','learnings','escape','ALT','vMDmM','get','25361eUivPL','#%1','xparamPlus','sellWindowRect','needsUpdate','numActions','Wait','drawCurrentParam','OUTBOUNCE','SLvpc','render','OTB','top','INOUTBOUNCE','SzzjI','replace','WIN_OEM_BACKTAB','isOpen','_mode','F23','sparam','updatePositionCoreEngineShakeOriginal','PTB','DWVcg','initMembers','sqrt','FXyzD','filterArea','applyCoreEasing','processAlwaysEscape','BINtd','SkillMenu','windowOpacity','ValueJS','DigitGroupingGaugeSprites','DTB','backgroundBitmap','UrIYV','DETACH_PICTURE_CONTAINER','Input_pollGamepads','CreateBattleSystemID','onInputBannedWords','\x0a\x0a\x0a\x0a\x0a','keypress','getInputButtonString','makeAutoBattleActions','updateCurrentEvent','Sprite_Button_updateOpacity','IconXParam5','XParameterFormula','ImprovedAccuracySystem','SEMICOLON','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','keyRepeatWait','STB','drawParamText','RTEES','Input_update','_stored_mpGaugeColor2','clearCachedKeys','Window_EquipItem_isEnabled','pow','updateWaitMode','NUMPAD7','repositionCancelButtonSideButtonLayout','VisuMZ_2_BattleSystemFTB','setValue','battleSystem','shake','onInputOk','offsetY','name','CustomParamAbb','createTroopNote','removeOnceParallelInterpreter','updatePositionCoreEngineShakeVert','YdBhH','LEFT','_cache','_digitGroupingEx','SKRXc','naYYG','makeFontSmaller','OutlineColorDmg','IxGuA','code','F20','pucCg','setActorHomeRepositioned','isKeyItem','ParseArmorNotetags','setupButtonImage','zfxsK','Window_StatusBase_drawActorLevel','eMsKY','reservePlayTestNewGameCommonEvent','SubfolderParse','IconSParam2','paramBaseAboveLevel99','BdaZk','Scene_MenuBase_mainAreaHeight','Axpdz','uEcKx','KkEyK','Padding','isSceneMap','_movementDuration','RowSpacing','XParamVocab6','push','RequireFocus','statusParamsWindowRect','kVSSK','Type','END','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','cancel','asin','ColorPowerUp','QAblU','Scene_Unlisted','VisuMZ_2_BattleSystemETB','BTestWeapons','textHeight','TitlePicButtons','DimColor2','MenuBg','processTouch','_categoryWindow','resize','_backSprite2','Swifp','skipBranch','PictureEraseRange','_buyWindow','gaugeBackColor','indexOf','faces','_commandWindow','Spriteset_Base_updatePosition','Sprite_Picture_updateOrigin','calcEasing','SceneManager_onKeyDown','AutoStretch','_isButtonHidden','OPDZG','iconWidth','levelUp','isNumpadPressed','WindowLayer_render','0.00','lYnrM','SystemSetFontSize','oJSJc','FiKhC','setLastPluginCommandInterpreter','KeyboardInput','updateOrigin','updateMainMultiply','MenuLayout','targets','alvsa','itemPadding','sparamRate','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_sideButtonLayout','maxLevel','padZero','save','missed','_colorTone','Color','GKust','Bitmap_blt','mLArD','PositionJS','xparamRate1','isEventRunning','max','EISU','GGtvl','CRSEL','_colorCache','jWblk','terms','Smooth','gainGold','isBusy','right','string','parse','playTestF7','Untitled','stretch','setSideView','rightArrowWidth','PRESERVCONVERSION(%1)','requestPointAnimation','LiVtQ','_stored_tpGaugeColor2','EQUALS','Window_Selectable_drawBackgroundRect','Scene_Map_createSpriteset_detach','Bitmap_drawText','button','Bitmap_measureTextWidth','SParamVocab8','setupRate','ScreenResolution','areButtonsOutsideMainUI','getCustomBackgroundSettings','getGamepads','XParamVocab1','IconXParam2','GoldRect','bEtAr','kdeiB','InputBgType','itemLineRect','CancelText','OUTQUINT','_addShadow','isMaxLevel','profileWindowRect','mainAreaTop','IDs','Scene_Shop_create','Sprite_Animation_processSoundTimings','IconSParam1','isEnemy','jOjKH','Scene_Map_update','QUESTION_MARK','powerDownColor','Bitmap_strokeRect','getLevel','Game_Temp_initialize','AntiZoomPictures','nOTBi','SIJWv','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','gaugeRate','drawActorSimpleStatus','yScrollLinkedOffset','command105','_goldWindow','buttonAssistOffset1','RepositionEnemies130','EXCLAMATION','TextJS','randomInt','itemBackColor1','LESS_THAN','prlEN','SceneManager_exit','rnTCX','DOWN','reaSK','setEnemyAction','Window_NameInput_initialize','setupValueFont','blt','resetTextColor','apply','abs','setClickHandler','ookKG','kVnan','data/','INBACK','EXSEL','isRepeated','Scene_Name_create','enter','catchUnknownError','INOUTQUAD','cJpgK','opacity','UNDERSCORE','TOeUI','SellBgType','FontWidthFix','sEUNP','SParamVocab3','ButtonFadeSpeed','showDevTools','targetSpritePosition','IconParam3','phKWv','_pictureContainer','catchException','tlJrp','_balloonQueue','fSvFI','setAction','trim','font','Vvelo','ItemStyle','prototype','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','areButtonsHidden','processEscape','AllTroops','cMkuv','Renderer','zBSRz','XhkIa','updateData','MiKYh','toUpperCase','applyForcedGameTroopSettingsCoreEngine','defineProperty','F6key','loadMapData','inputWindowRect','wGIUR','ASxVO','MCR','getLastPluginCommandInterpreter','useFontWidthFix','FkdmZ','faceWidth','displayY','sparamFlat1','MAX_SAFE_INTEGER','Window_NameInput_cursorDown','buttonAssistCancel','ScaleX','yKlOv','Spriteset_Battle_createEnemies','enableDigitGroupingEx','pTcGb','keyCode','DpQjv','map','retrieveFauxAnimation','removeAllFauxAnimations','BlendMode','isMenuButtonAssistEnabled','SLASH','SwitchRandomizeRange','updateScene','OUTELASTIC','addLoadListener','filter','playMiss','NUMPAD5','loadGameImagesCoreEngine','drawSegment','SParamVocab2','lJWOb','_viewportSize','centerSprite','LbVOt','ParseStateNotetags','_coreEngineShakeStyle','INCUBIC','ZMjxg','drawCurrencyValue','randomJS','padding','valueOutlineColor','_scaleY','exportAllMapStrings','ItemBgType','_upArrowSprite','DigitGroupingStandardText','hpColor','parameters','Scene_Status_create','evaded','guardSkillId','190017xtZXmi','suGCI','WNHCk','setColorTone','JsFci','BTestItems','_rate','RzhZt','slice','item','SceneManager_isGameActive','animationId','_gamepadWait','rcvAo','CKcSM','BoxMargin','dimColor2','sparamPlus2','META','buttonAreaHeight','setSideButtonLayout','updatePadding','MgHFa','movePageButtonSideButtonLayout','isSideButtonLayout','VmNqB','maxBattleMembers','IconParam7','buttonAssistWindowButtonRect','xxjQR','DRtsK','KslWR','DummyRect','_editWindow','setBattleSystem','uiAreaWidth','Window_NameInput_cursorRight','CIRCUMFLEX','CEV','Manual','PGDN','rgba(0,\x200,\x200,\x201.0)','kQGvr','removeChild','updatePlayTestF7','isBottomHelpMode','targetObjects','outlineColorDmg','openURL','status','command357','TextStr','AMPERSAND','setBackgroundType','isCancelled','nah','lOvgN','processFauxAnimationRequests','playCursor','Sprite_Gauge_currentValue','helpAreaBottom','application/json','Center','skillTypeWindowRect','getBattleSystem','KUWIQ','_pictureCoordinatesWindow','buttonAssistWindowRect','buttonAssistKey3','isActiveTpb','cursorRight','animationNextDelay','gameTitle','clearZoom','repeat','_screenY','Keyboard','center','itemHeight','HIT','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','hpGaugeColor2','F24','textColor','ParseWeaponNotetags','1638296JaVaoY','isBottomButtonMode','_stored_maxLvGaugeColor1','setHandler','drawTextTopAligned','_hideButtons','MAXMP','NUM','isSideView','TitleCommandList','CrNWK','rPUUM','_buttonAssistWindow','owSyT','reduce','ExportString','ehqnD','startAutoNewGame','Window_NameInput_cursorUp','BaseTexture','sv_enemies','drawBackgroundRect','updatePictureCoordinates','F18','StartID','IconSParam4','initDigitGrouping','Window_Base_createTextState','buttonAssistText5','SParamVocab0','RepositionEnemies','_actor','_targetX','clear','Game_Action_numRepeats','animations','cos','outlineColor','params','IconParam5','updateBackOpacity','Game_Interpreter_updateWaitMode','Scene_Boot_loadSystemImages','SParamVocab6','NUMPAD8','_mp','GmLqF','loadPicture','Sprite_Battler_startMove','bYqSK','Spriteset_Base_update','VKXjP','jrBfT','ActorRect','isItemStyle','_baseSprite','Window_Base_initialize','ARRAYNUM','Scene_Map_initialize','buttonAssistKey5','fadeSpeed','XParamVocab2','paramY','worldTransform','ColSpacing','Troop%1','pendingColor','ColorCrisis','yHRyE','members','isAnimationOffsetXMirrored','mainAreaBottom','_cacheScaleX','_CoreEngineSettings','XlExb','_tempActor','_maxDigits','vaAOC','UjFNG','CRIED','startAnimation','Spriteset_Base_destroy','win32','STENCIL_TEST','processCursorMove','pwKZU','LUK','cursorLeft','createPointAnimationQueue','font-smooth','RPGMAKER_VERSION','snYvY','attackSkillId','anchorCoreEasing','AccuracyBoost','smallParamFontSize','doesNameContainBannedWords','helpAreaHeight','MRG','_logWindow','DOLLAR','Window_NameInput_cursorLeft','LoadError','position','ySwuk','itemHit','pMxuT','makeCoreEngineCommandList','skills','EnableNameInput','blendFunc','_tilemap','saxyA','setCoreEngineUpdateWindowBg','QwertyLayout','createButtonAssistWindow','xALtX','moveMenuButtonSideButtonLayout','Scene_Boot_startNormalGame','shift','Spriteset_Base_isAnimationPlaying','framebuffer','Title','_pagedownButton','child_process','retreat','Window_Selectable_processCursorMove','maxLvGaugeColor1','endAction','StatusBgType','ceil','kIbwR','paramFlat','batch','addChildToBack','_stored_tpGaugeColor1','setGuard','isAnimationPlaying','KwAcj','SwitchRandomizeOne','_inputSpecialKeyCode','MIDzs','BuLUS','WIN_OEM_FJ_LOYA','_mainSprite','talpt','HANJA','ImgLoad','joUYh','ItemBackColor1','Game_Action_itemEva','BTestAddedQuantity','_targetOffsetX','Duration','_stored_gaugeBackColor','ColorTPCost','_list','_shakeSpeed','gylCi','processDigitChange','AnimationMirrorOffset','encounterStep','processCursorMoveModernControls','crisisColor','imageSmoothingEnabled','XiMES','Scene_Battle_createSpriteset','pointX','_backSprite1','wVQUs','length','call','CRWJq','initCoreEngine','createFauxAnimation','wBjsF','hrFvb','_playtestF7Looping','kxBDx','updateAnchor','ParseItemNotetags','_windowLayer','Game_Picture_x','TdQMG','IconXParam9','Game_Actor_paramBase','hALOe','eva','isGameActive','select','%2%1%3','measureText','Input_setupEventHandlers','_buttonType','numberShowButton','paramMax','ParamName','RegExp','isOptionValid','editWindowRect','sparamFlatJS','_phase','param','SParamVocab4','isTouchedInsideFrame','rNPMv','Game_Interpreter_command111','TOpWO','RpBKT','inBattle','CategoryBgType','IconXParam4','ExtractStrFromList','Exported_Script_%1.txt','TRG','BgFilename2','process_VisuMZ_CoreEngine_jsQuickFunctions','QoL','evade','cSpEc','INCIRC','WIN_OEM_WSCTRL','ItemMenu','playOk','Bitmap_drawCircle','Scene_Map_updateMainMultiply','paramWidth','DefaultStyle','ModernControls','lEPmS','lVvAg','Rate2','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','xAtSb','CLOSE_CURLY_BRACKET','updatePictureAntiZoom','text','IconSParam3','Window_NameInput_refresh','_margin','ItemRect','vqDWe','ScaleY','_action','CategoryRect','vdfic','uHPTQ','_subject','waiting','log','MEV','MAXHP','SystemSetSideView','blockWidth','ColorExpGauge2','_profileWindow','BgType','pages','DOUBLE_QUOTE','makeDocumentTitle','FadeSpeed','ETB','isMapScrollLinked','drawGameSubtitle','OpenConsole','ShowItemBackground','Window_Selectable_itemRect','StatusParamsRect','ShopMenu','bgsVolume','Window_NumberInput_processDigitChange','buttonAssistOk','_windowskin','_onceParallelInterpreters','QcxLg','Game_Picture_updateMove','clearRect','statusEquipWindowRect','zBdpQ','_internalTextures','actorWindowRect','XTlDZ','Scene_MenuBase_createBackground','Window_NameInput_processHandling','toLowerCase','includes','HMhBf','cancelShowButton','img/%1/','ColorSystem','mKSqJ','updateMain','70762GSTOzb','LevelUpFullHp','CAsUf','bind','SDSNG','Map%1','isItem','setMute','refreshDimmerBitmap','animationBaseDelay','bWJlH','onNameOk','enemy','PictureEasingType','expGaugeColor1','toLocaleString','(\x5cd+\x5c.?\x5cd+)>','$dataMap','xparamRate2','ButtonAssist','PGUP','Scene_MenuBase_createCancelButton','stypeId','showPointAnimations','Window_ShopSell_isEnabled','createMenuButton','QUOTE','sceneTerminationClearEffects','ParseSkillNotetags','_pointAnimationQueue','GET','dimColor1','Basic','VisuMZ_2_BattleSystemPTB','EQUAL','Window_Gold_refresh','Gold','KeySHIFT','F14','bitmapWidth','VisuMZ_2_BattleSystemBTB','_spriteset','drawFace','MSvAb','restore','loXFC','INOUTELASTIC','kWTPO','Sprite_Button_initialize','FontSize','enemies','_paramPlus','xparamRateJS','createDimmerSprite','createPointAnimationSprite','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Symbol','EscapeAlways','CoreEngine','F7key','joIkP','ZfQAP','Plus2','_numberWindow','targetScaleX','mainAreaTopSideButtonLayout','ExportStrFromAllTroops','ColorMPGauge2','KpfuD','sparamFlat2','_stored_expGaugeColor2','isExpGaugeDrawn','createPageButtons','TextFmt','CommandRect','drawNewParam','DisplayedParams','moveCancelButtonSideButtonLayout','xparamFlatJS','rSfzS','xdg-open','pagedownShowButton','XOkSt','numberWindowRect','AGI','ParseActorNotetags','ZWSBM','_movementWholeDuration','_shakeDuration','_animation','SParamVocab9','EVgdz','isClosed','updateOpen','OUTCIRC','vKbyj','mpGaugeColor1','altKey','KEEP','SideView','GameEnd','toString','TextCodeNicknames','OUTCUBIC','isHandled','helpAreaTop','NoTileShadows','Window_Base_update','_stored_hpGaugeColor2','pqXVd','IqGZm','FontShadows','setupCustomRateCoreEngine','nextLevelExp','sparamPlus1','CustomParamNames','_effectsContainer','_timerSprite','YEmyl','ACCEPT','PAUSE','_pointAnimationSprites','STR','isSmartEventCollisionOn','_stored_tpCostColor','startNormalGame','EXECUTE','_skillTypeWindow','isArrowPressed','NUMPAD2','DnWtS','show','alwaysDash','KeyTAB','addOnceParallelInterpreter','KeyUnlisted','IconSParam7','IconParam2','alpha','initialBattleSystem','xparamFlat2','command122','isRightInputMode','eeoCt','lVLPH','NEAREST','actor','RMnBA','updateOnceParallelInterpreters','statusWindowRect','Scene_Options_create','currencyUnit','AMWeY','_refreshBack','IconXParam8','_stored_hpGaugeColor1','ColorPowerDown','onMoveEnd','WIN_OEM_FJ_TOUROKU','addCommand','GetParamIcon','WIN_OEM_PA3','OpenURL','createEnemies','isPointAnimationPlaying','jsonToZip','〘Scrolling\x20Text〙\x0a','drawText','jiGHi','storeMapData','scaleSprite','DrawItemBackgroundJS','description','INQUART','SystemLoadImages','CFRhu','_opening','move','%1〘Choice\x20%2〙\x20%3%1','sparamRateJS','Scene_MenuBase_helpAreaTop','CONVERT','adjustBoxSize','drawValue','sin','resetFontSettings','initMembersCoreEngine','bgm','toFixed','renderNoMask','isTriggered','traitObjects','setFrame','_playTestFastMode','PositionX','LMPzO','eeuWq','Linear','GroupDigits','HRG','mainAreaHeight','PERIOD','mute','getPointAnimationLayer','createPointAnimation','isGamepadTriggered','WIN_OEM_ATTN','enableDigitGrouping','WIN_OEM_PA2','YKmUP','erasePicture','EnableJS','PictureFilename','_targetAnchor','WICkH','Game_Actor_levelUp','width','round','gCGRi','eventsXyNt','floor','Window_Base_drawIcon','buttonAssistKey%1','OUTQUART','sWytn','remove','qVXSP','%1/','keyboard','DefaultMode','INOUTCUBIC','_stored_systemColor','XParamVocab8','_coreEasingType','mtdLQ','drawGameTitle','updateMove','VisuMZ_2_BattleSystemSTB','DigitGroupingExText','ExtJS','gdCuJ','createChildSprite','KJKzP','Sprite_AnimationMV_updatePosition','ONE','HOME','measureTextWidthNoRounding','nRmhv','Rttrn','scale','isPlaytest','NameMenu','VariableJsBlock','playBuzzer','allowShiftScrolling','Total','_backgroundFilter','buttonAssistWindowSideRect','UJPiq','stencilOp','SideButtons','WIN_OEM_PA1','processKeyboardHome','NewGameBoot','CommandWidth','_itemWindow','_stored_mpGaugeColor1','NewGameCommonEventAll','maxCols','xScrollLinkedOffset','XParamVocab5','MAX_GL_TEXTURES','buttonAssistOffset4','Conditional\x20Branch\x20Script\x20Error','rgba(0,\x200,\x200,\x200.7)','initialLevel','_fauxAnimationQueue','nihXz','MultiKeyFmt','PUJBg','F12','Scene_Title_drawGameTitle','tjDEA','Show\x20Scrolling\x20Text\x20Script\x20Error','Game_System_initialize','TPB\x20ACTIVE','bgs','Sprite_Picture_loadBitmap','match','ButtonHeight','sparamRate1','ILxDj','parseForcedGameTroopSettingsCoreEngine','Game_Event_isCollidedWithEvents','addEventListener','isCursorMovable','categoryWindowRect','F21','SnapshotOpacity','_lastX','SLEEP','WIN_OEM_CUSEL','SwitchToggleOne','XeKbj','_pictureCoordinatesMode','PictureEraseAll','_targetY','ColorMPGauge1','numRepeats','tpGaugeColor1','createWindowLayer','horzJS','enable','disable','_pressed','Window_Selectable_cursorDown','CommandList','Page','hGOso','isAnimationForEach','duration','updateShadow','background','Power','ConvertParams','clearStencil','Scene_GameEnd_createBackground','》Comment《\x0a%1\x0a','mirror','_moveEasingType','HelpBgType','INELASTIC','CLOSE_PAREN','BattleSystem','isMVAnimation','hHRip','yIGXI','playOnceParallelInterpreter','setTargetAnchor','requestFauxAnimation','UpdatePictureCoordinates','commandWindowRows','Settings','dtvQq','ShowDevTools','loadSystemImages','HIFtx','gold','ALWAYS','Window_Selectable_cursorUp','<%1\x20%2:[\x20]','PDR','children','processCursorHomeEndTrigger','GovYx','itemBackColor2','updateClose','_stored_crisisColor','Game_Character_processMoveCommand','paramRate','SCROLL_LOCK','isWindowMaskingEnabled','\x5c}❪TAB❫\x5c{','_shouldPreventDefault','Zevyf','useDigitGroupingEx','atbActive','OPEN_BRACKET','WIN_OEM_FJ_JISHO','createDigits','setEasingType','VOLUME_DOWN','itemRect','openness','vYGxw','WIN_OEM_ENLW','windowRect','anchor','destroyCoreEngineMarkedBitmaps','CLEAR','AnimationPoint','INQUAD','bgmVolume','listWindowRect','mainAreaHeightSideButtonLayout','ZERO','EVA','refresh','Tilemap_addShadow','_screenX','SbonK','ProfileRect','qglDn','PRINTSCREEN','targetY','onKeyDown','ColorExpGauge1','Game_Event_start','contentsOpacity','F19','mqLIt','image-rendering','sparamFlatBonus','EndingID','itemWindowRect','helpWindowRect','INSINE','VKgGU','_origin','sbMtV','_scene','BifEt','process_VisuMZ_CoreEngine_CustomParameters','dashToggle','_stored_ctGaugeColor1','GoldChange','Window_NameInput_processTouch','TCR','endAnimation','gainSilentTp','hideButtonFromView','CAPSLOCK','value','Game_Action_updateLastTarget','PositionY','drawTextEx','BannedWords','INQUINT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','initVisuMZCoreEngine','Scene_Map_updateMain','ZcRfy','Param','_refreshArrows','powerUpColor','showPicture','isCollidedWithEvents','setup','gdPoh','GLdnc','FTB','ColorDeath','outbounce','_onKeyDown','gradientFillRect','vAPeP','_width','PERCENT','IconParam4','ListBgType','_targetOffsetY','drawGameVersion','BasicParameterFormula','INOUTCIRC','OUTBACK','buttonAssistText1','addChild','buttonAssistSwitch','Sprite_AnimationMV_processTimingData','SystemSetBattleSystem','PHA','isOpenAndActive','ZDIjQ','INBOUNCE','_commonEventLayers','LINEAR','EVAL','ATK','left','updatePositionCoreEngine','processKeyboardDigitChange','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','min','processTouchModernControls','_pollGamepads','Subtitle','NUMPAD4','isSpecialCode','Plus1','mmp','commandWindowRect','Flat1','isActor','IconXParam6','SlotBgType','determineSideButtonLayoutValid','_troopId','LXhyv','IconSParam6','CvWkV','buttonAssistText%1','open','Jndtz','SParameterFormula','_bitmap','ItemBackColor2','drawGoldItemStyle','maxTp','filters','_muteSound','_hp','dJKzh','hPsMc','XParamVocab3','IconXParam0','vertJS','Game_Screen_initialize','CommonEventID','_isPlaytest','IconParam0','style','_offsetY','_realScale','xparam','ctGaugeColor2','Key%1','updatePositionCoreEngineShakeRand','lxInF','〘Common\x20Event\x20%1:\x20%2〙\x20End','loadBitmap','KFTgf','buttonAssistText4','sparamPlusJS','_currentMap','calcCoreEasing','Control\x20Variables\x20Script\x20Error','TimeProgress','easingType','dMNkq','maxLvGaugeColor2','makeActionList','drawCircle','ekqMt','initCoreEasing','ExportCurTroopText','ScreenShake','createCustomParameter','DELETE','isInstanceOfSceneMap','_offsetX','VlTbL','iconHeight','drawActorLevel','jPKAt','INOUTEXPO','ExtractStrFromMap','Enable','_makeFontNameText','drawIconBySize','PQelG','itypeId','update','helpAreaTopSideButtonLayout','jaSAi','Bitmap_fillRect','titleCommandWindow','wXTWw','paramchangeTextColor','ShowButtons','changeTextColor','WIN_ICO_HELP','processKeyboardEnd','ADD','endBattlerActions','OnLoadJS','cursorPagedown','YlLmb','ULdUC','\x20Origin:\x20%1','INEXPO','playCancel','mDRSs','openingSpeed','applyEasing','NUMPAD6','BackOpacity','changeClass','_closing','setWindowPadding','isUseModernControls','expGaugeColor2','_smooth','wXkfF','EditBgType','_inputWindow','onDatabaseLoaded','IZBvA','xvkRf','nBmnp','SellRect','ActorTPColor','_cancelButton','end','buttons','Sprite_destroy','levelUpRecovery','PLAY','_hovered','FontSmoothing','option','DEF','pictureId','buttonY','WIN_OEM_AUTO','jIanz','ARRAYSTRUCT','Scene_Boot_updateDocumentTitle','JcpoF','Unnamed','operation','ColorCTGauge1','DetachMapPictureContainer','Game_Picture_initBasic','_data','_context','FrqSx','valueOutlineWidth','down','animationShouldMirror','cUCcf','OsTil','text%1','rowSpacing','332420uHVwPZ','_target','showFauxAnimations','_storedStack','_optionsWindow','_encounterCount','targetScaleY','nJnIh','NUMPAD3','SkillTypeBgType','_targetScaleY','KeyItemProtect','result','MAT','637000JBugRo','startShake','boxHeight','isGamepadButtonPressed','characters','_height','_slotWindow','initButtonHidden','textSizeEx','isNwjs','updateOpacity','_backgroundSprite','HYPHEN_MINUS','processHandling','Scene_Name_onInputOk','OS_KEY','Layer','hpGaugeColor1','tcqHJ','key%1','_drawTextShadow','originalJS','_cacheScaleY','Game_Party_consumeItem','aDuQu','createSpriteset','NdZFa','COMMA','onButtonImageLoad','ParseAllNotetags','_number','lHAZv','vGhqM','Scene_Menu_create','outlineColorGauge','ctrl','9582552dBRJeb','Window_StatusBase_drawActorSimpleStatus','sZqlZ','kgeGI','_forcedTroopView','smoothSelect','makeDeepCopy','JpxSf','AllMaps','Scene_Base_create','INOUTSINE','canEquip','_destroyInternalTextures','Speed','wholeDuration','isFullDocumentTitle','ZdjQK','_blank','registerCommand','Sprite_Gauge_gaugeRate','getButtonAssistLocation','_storedMapText','%1〘Choice\x20Cancel〙%1','inbounce','1.3.0','_targetOpacity','ListRect','meVolume','MDR','〘Common\x20Event\x20%1:\x20%2〙\x20Start','GRD','adjustSprite','ASTERISK','CustomParamIcons','IconSParam5','setCommonEvent','Bitmap_resize','FkeDs','CRI','Scene_Equip_create','titles2','ubXwL','_defaultStretchMode','_actorWindow','destroy','_isWindow','system','_createInternalTextures','setViewportCoreEngineFix','createFauxAnimationSprite','process_VisuMZ_CoreEngine_Functions'];_0x1e26=function(){return _0x2cb3c4;};return _0x1e26();}(function(_0x280f54,_0x44222a){const _0x5a90ea=_0x5eef,_0x35b9db=_0x280f54();while(!![]){try{const _0x56e61f=parseInt(_0x5a90ea(0x66d))/0x1+parseInt(_0x5a90ea(0x2f0))/0x2*(-parseInt(_0x5a90ea(0x4f4))/0x3)+-parseInt(_0x5a90ea(0x549))/0x4+parseInt(_0x5a90ea(0x8dc))/0x5+-parseInt(_0x5a90ea(0x245))/0x6*(parseInt(_0x5a90ea(0x37f))/0x7)+-parseInt(_0x5a90ea(0x8ea))/0x8+parseInt(_0x5a90ea(0x90e))/0x9;if(_0x56e61f===_0x44222a)break;else _0x35b9db['push'](_0x35b9db['shift']());}catch(_0x337b27){_0x35b9db['push'](_0x35b9db['shift']());}}}(_0x1e26,0x4cd02));var label=_0x526668(0x6a7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x526668(0x4d8)](function(_0x389cf0){const _0x3c4af7=_0x526668;return _0x389cf0[_0x3c4af7(0x525)]&&_0x389cf0['description'][_0x3c4af7(0x666)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x526668(0x7c3)]||{},VisuMZ[_0x526668(0x7b1)]=function(_0x4829a0,_0x5f1a0d){const _0x33690d=_0x526668;for(const _0x5ace1f in _0x5f1a0d){if(_0x5ace1f[_0x33690d(0x78d)](/(.*):(.*)/i)){if(_0x33690d(0x616)!==_0x33690d(0x616))this['_editWindow'][_0x33690d(0x25a)](_0x57826b[_0xfc82a2])?_0xf6e615[_0x33690d(0x628)]():_0x1a8715[_0x33690d(0x76a)]();else{const _0x196209=String(RegExp['$1']),_0x94def3=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x398bf0,_0x4085ab,_0x3698c3;switch(_0x94def3){case _0x33690d(0x550):_0x398bf0=_0x5f1a0d[_0x5ace1f]!==''?Number(_0x5f1a0d[_0x5ace1f]):0x0;break;case _0x33690d(0x582):_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON['parse'](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x479075=>Number(_0x479075));break;case _0x33690d(0x83f):_0x398bf0=_0x5f1a0d[_0x5ace1f]!==''?eval(_0x5f1a0d[_0x5ace1f]):null;break;case _0x33690d(0x360):_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x34a331=>eval(_0x34a331));break;case _0x33690d(0x991):_0x398bf0=_0x5f1a0d[_0x5ace1f]!==''?JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f]):'';break;case'ARRAYJSON':_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON['parse'](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x21d6be=>JSON[_0x33690d(0x43d)](_0x21d6be));break;case'FUNC':_0x398bf0=_0x5f1a0d[_0x5ace1f]!==''?new Function(JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f])):new Function(_0x33690d(0x948));break;case _0x33690d(0x9c4):_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x37a28e=>new Function(JSON[_0x33690d(0x43d)](_0x37a28e)));break;case _0x33690d(0x6e7):_0x398bf0=_0x5f1a0d[_0x5ace1f]!==''?String(_0x5f1a0d[_0x5ace1f]):'';break;case'ARRAYSTR':_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON['parse'](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x489086=>String(_0x489086));break;case _0x33690d(0x95d):_0x3698c3=_0x5f1a0d[_0x5ace1f]!==''?JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f]):{},_0x4829a0[_0x196209]={},VisuMZ[_0x33690d(0x7b1)](_0x4829a0[_0x196209],_0x3698c3);continue;case _0x33690d(0x8ca):_0x4085ab=_0x5f1a0d[_0x5ace1f]!==''?JSON[_0x33690d(0x43d)](_0x5f1a0d[_0x5ace1f]):[],_0x398bf0=_0x4085ab[_0x33690d(0x4ce)](_0x569c88=>VisuMZ[_0x33690d(0x7b1)]({},JSON[_0x33690d(0x43d)](_0x569c88)));break;default:continue;}_0x4829a0[_0x196209]=_0x398bf0;}}}return _0x4829a0;},VisuMZ['CoreEngine'][_0x526668(0x47d)]=SceneManager[_0x526668(0x9bb)],SceneManager[_0x526668(0x9bb)]=function(){const _0x1b7921=_0x526668;VisuMZ[_0x1b7921(0x6a7)][_0x1b7921(0x47d)][_0x1b7921(0x5f4)](this);if(Utils[_0x1b7921(0x5a3)]>=_0x1b7921(0xa35)){if(_0x1b7921(0x4f6)===_0x1b7921(0x221)){_0x1303ad[_0x1b7921(0x4aa)]['update'][_0x1b7921(0x5f4)](this),this[_0x1b7921(0x7ae)]();if(this[_0x1b7921(0x568)])this[_0x1b7921(0x2f4)]();else this[_0x1b7921(0x988)]!==''&&(this[_0x1b7921(0x988)]='');}else{if(typeof nw==='object')nw[_0x1b7921(0x364)]['quit']();}}},(_0x516fe4=>{const _0x447d62=_0x526668,_0x256c42=_0x516fe4[_0x447d62(0x3c6)];for(const _0x39ee6e of dependencies){if(_0x447d62(0x46e)===_0x447d62(0x46e)){if(!Imported[_0x39ee6e]){alert(_0x447d62(0x36d)[_0x447d62(0xa0a)](_0x256c42,_0x39ee6e)),SceneManager[_0x447d62(0x9bb)]();break;}}else return _0x1f1471['layoutSettings']['EditRect'][_0x447d62(0x5f4)](this);}const _0x554118=_0x516fe4[_0x447d62(0x719)];if(_0x554118[_0x447d62(0x78d)](/\[Version[ ](.*?)\]/i)){if(_0x447d62(0x3e5)!==_0x447d62(0x3e5))this[_0x447d62(0xa03)]();else{const _0x138cd1=Number(RegExp['$1']);_0x138cd1!==VisuMZ[label][_0x447d62(0x343)]&&('KUWIQ'!==_0x447d62(0x535)?this[_0x447d62(0x781)]=[]:(alert(_0x447d62(0x844)[_0x447d62(0xa0a)](_0x256c42,_0x138cd1)),SceneManager[_0x447d62(0x9bb)]()));}}if(_0x554118[_0x447d62(0x78d)](/\[Tier[ ](\d+)\]/i)){const _0x2bff6a=Number(RegExp['$1']);_0x2bff6a<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x447d62(0xa0a)](_0x256c42,_0x2bff6a,tier)),SceneManager[_0x447d62(0x9bb)]()):tier=Math['max'](_0x2bff6a,tier);}VisuMZ[_0x447d62(0x7b1)](VisuMZ[label][_0x447d62(0x7c3)],_0x516fe4['parameters']);})(pluginData),((()=>{const _0x283923=_0x526668;if(VisuMZ[_0x283923(0x6a7)][_0x283923(0x7c3)][_0x283923(0x622)][_0x283923(0x3df)]??!![]){if(_0x283923(0x76f)===_0x283923(0x747)){if(_0x3f28f7[_0x283923(0x6a7)]['Settings'][_0x283923(0x622)]['EscapeAlways'])this['processAlwaysEscape']();else return _0x3754ff[_0x283923(0x6a7)]['BattleManager_processEscape'][_0x283923(0x5f4)](this);}else for(const _0x367ac2 in $plugins){const _0x403d03=$plugins[_0x367ac2];_0x403d03[_0x283923(0x3c6)]['match'](/(.*)\/(.*)/i)&&(_0x403d03[_0x283923(0x3c6)]=String(RegExp['$2'][_0x283923(0x4a6)]()));}}})()),PluginManager['registerCommand'](pluginData['name'],_0x526668(0x7e9),_0x9cd2c=>{const _0x354b84=_0x526668;if(!SceneManager[_0x354b84(0x807)])return;if(!SceneManager[_0x354b84(0x807)][_0x354b84(0x696)])return;VisuMZ[_0x354b84(0x7b1)](_0x9cd2c,_0x9cd2c);const _0x154393=Math[_0x354b84(0x746)](_0x9cd2c[_0x354b84(0x5f0)]),_0x2efc68=Math[_0x354b84(0x746)](_0x9cd2c['pointY']);$gameTemp['requestPointAnimation'](_0x154393,_0x2efc68,_0x9cd2c['AnimationID'],_0x9cd2c['Mirror'],_0x9cd2c[_0x354b84(0xa1a)]);}),PluginManager['registerCommand'](pluginData[_0x526668(0x3c6)],'ExportAllMapText',_0x4f94d2=>{const _0x1838b3=_0x526668;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x1838b3(0x807)][_0x1838b3(0x31b)]=![],VisuMZ[_0x1838b3(0x6a7)]['ExportStrFromAllMaps']();}),PluginManager['registerCommand'](pluginData['name'],_0x526668(0x332),_0x20ec04=>{const _0x1a564b=_0x526668;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x1a564b(0x8f3)]())return;SceneManager['_scene'][_0x1a564b(0x31b)]=![],VisuMZ[_0x1a564b(0x6a7)][_0x1a564b(0x6af)]();}),PluginManager['registerCommand'](pluginData[_0x526668(0x3c6)],_0x526668(0x9a3),_0x1fb076=>{const _0x5d6f25=_0x526668;if(!$gameTemp[_0x5d6f25(0x767)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x5d6f25(0x28b)]()<=0x0)return;VisuMZ[_0x5d6f25(0x7b1)](_0x1fb076,_0x1fb076);const _0x48e975=_0x5d6f25(0x672)['format']($gameMap[_0x5d6f25(0x28b)]()[_0x5d6f25(0x426)](0x3)),_0x23e71b=VisuMZ[_0x5d6f25(0x6a7)][_0x5d6f25(0x88e)]($gameMap[_0x5d6f25(0x28b)]());VisuMZ[_0x5d6f25(0x6a7)][_0x5d6f25(0x558)](_0x23e71b,_0x48e975,!![]);}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x883),_0x2a0cd8=>{const _0x5c5bcd=_0x526668;if(!$gameTemp[_0x5c5bcd(0x767)]())return;if(!Utils[_0x5c5bcd(0x8f3)]())return;if(!$gameParty[_0x5c5bcd(0x61a)]())return;VisuMZ[_0x5c5bcd(0x7b1)](_0x2a0cd8,_0x2a0cd8);const _0x234682=_0x5c5bcd(0x58a)[_0x5c5bcd(0xa0a)]($gameTroop[_0x5c5bcd(0x853)][_0x5c5bcd(0x426)](0x4)),_0x11da9b=VisuMZ[_0x5c5bcd(0x6a7)]['ExtractStrFromTroop']($gameTroop[_0x5c5bcd(0x853)]);VisuMZ['CoreEngine'][_0x5c5bcd(0x558)](_0x11da9b,_0x234682,!![]);}),VisuMZ[_0x526668(0x6a7)][_0x526668(0x558)]=function(_0x2945a8,_0x2f4b1c,_0x3ca1cf){const _0x5dacc6=_0x526668,_0x473037=require('fs');let _0x15f26e='Exported_Script_%1.txt'['format'](_0x2f4b1c||'0');_0x473037[_0x5dacc6(0x366)](_0x15f26e,_0x2945a8,_0x53ed9f=>{const _0x1311e0=_0x5dacc6;if(_0x1311e0(0x58d)!==_0x1311e0(0x58d))return this[_0x1311e0(0x64f)]()?this[_0x1311e0(0x472)]():_0x2cb23c[_0x1311e0(0x6a7)][_0x1311e0(0x26a)]['call'](this);else{if(_0x53ed9f){if(_0x1311e0(0x320)==='aVBAg')this[_0x1311e0(0x869)]=![];else throw err;}else{if(_0x3ca1cf){if(_0x1311e0(0x69c)!==_0x1311e0(0x2ac))alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x1311e0(0xa0a)](_0x15f26e));else{var _0x138d03=_0x1f9fc1(_0x22a478['$1'])/0x64;_0x3eb68c+=_0x138d03;}}}}});},VisuMZ[_0x526668(0x6a7)]['ExportStrFromAllMaps']=function(){const _0x5d3112=_0x526668,_0x4b2fd9=[];for(const _0x15a8ff of $dataMapInfos){if(_0x5d3112(0x999)!==_0x5d3112(0x999))return _0x9cc40e[_0x5d3112(0x6a7)][_0x5d3112(0x7c3)]['UI'][_0x5d3112(0x64d)];else{if(!_0x15a8ff)continue;_0x4b2fd9['push'](_0x15a8ff['id']);}}const _0x395ebf=_0x4b2fd9[_0x5d3112(0x5f3)]*0x64+Math[_0x5d3112(0x479)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x395ebf)),this[_0x5d3112(0x923)]=[],this[_0x5d3112(0x878)]=$dataMap;for(const _0x4ce995 of _0x4b2fd9){_0x5d3112(0x804)!==_0x5d3112(0x804)?(_0x103d8b[_0x5d3112(0x6a7)][_0x5d3112(0x682)][_0x5d3112(0x5f4)](this),_0x2ace14[_0x5d3112(0x50c)]()&&this['moveCancelButtonSideButtonLayout']()):VisuMZ[_0x5d3112(0x6a7)][_0x5d3112(0x4b9)](_0x4ce995);}setTimeout(VisuMZ[_0x5d3112(0x6a7)][_0x5d3112(0x4eb)][_0x5d3112(0x670)](this),_0x395ebf);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x4b9)]=function(_0x33d029){const _0x488dcc=_0x526668,_0x3125f5='Map%1.json'['format'](_0x33d029[_0x488dcc(0x426)](0x3)),_0x1d4383=new XMLHttpRequest(),_0x24634d=_0x488dcc(0x48b)+_0x3125f5;_0x1d4383['open']('GET',_0x24634d),_0x1d4383[_0x488dcc(0x342)](_0x488dcc(0x531)),_0x1d4383['onload']=()=>this[_0x488dcc(0x716)](_0x1d4383,_0x33d029,_0x3125f5,_0x24634d),_0x1d4383[_0x488dcc(0x22d)]=()=>DataManager[_0x488dcc(0x26b)]('$dataMap',_0x3125f5,_0x24634d),_0x1d4383[_0x488dcc(0x1f3)]();},VisuMZ['CoreEngine'][_0x526668(0x716)]=function(_0x333329,_0x5463ad,_0x1ec9a7,_0x459199){const _0x53523a=_0x526668;$dataMap=JSON[_0x53523a(0x43d)](_0x333329[_0x53523a(0x223)]),DataManager[_0x53523a(0x9d8)]($dataMap),this[_0x53523a(0x923)][_0x5463ad]=VisuMZ[_0x53523a(0x6a7)]['ExtractStrFromMap'](_0x5463ad),$dataMap=this[_0x53523a(0x878)];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x4eb)]=function(){const _0x252a9e=_0x526668,_0x100bf1=_0x252a9e(0x916);this[_0x252a9e(0x923)][_0x252a9e(0x74e)](undefined)['remove']('')[_0x252a9e(0x74e)](null);const _0x4f5fd0=this[_0x252a9e(0x923)][_0x252a9e(0x964)]('\x0a\x0a\x0a\x0a\x0a')[_0x252a9e(0x4a6)]();VisuMZ[_0x252a9e(0x6a7)][_0x252a9e(0x558)](_0x4f5fd0,_0x100bf1,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x88e)]=function(_0x5630a1){const _0x523db4=_0x526668;if(!$dataMap)return'';let _0x1b5eae='█'[_0x523db4(0x53e)](0x46)+'\x0a\x0a',_0xdada0f='═'[_0x523db4(0x53e)](0x46)+'\x0a\x0a',_0x36a63b='';this[_0x523db4(0x83d)]=0x0;for(const _0x18ca50 of $dataMap['events']){if(!_0x18ca50)continue;let _0x44e93e=_0x18ca50['id'],_0x5bf0a2=_0x18ca50['name'],_0xe9ca6a=_0x18ca50[_0x523db4(0x64a)];for(const _0x3c58ee of _0xe9ca6a){const _0x5114bf=_0xe9ca6a['indexOf'](_0x3c58ee)+0x1;let _0x240823=_0xdada0f+_0x523db4(0x6a4),_0x2a5901=VisuMZ[_0x523db4(0x6a7)][_0x523db4(0x61d)](_0x3c58ee['list']);if(_0x2a5901[_0x523db4(0x5f3)]>0x0){if(_0x36a63b[_0x523db4(0x5f3)]>0x0)_0x36a63b+=_0xdada0f+_0x523db4(0x3a9);else{const _0x2161ee=$dataMapInfos[_0x5630a1][_0x523db4(0x3c6)];_0x36a63b+=_0x1b5eae+_0x523db4(0x3f2)[_0x523db4(0xa0a)](_0x5630a1,_0x2161ee||_0x523db4(0x8cd))+_0x1b5eae;}_0x36a63b+=_0x240823[_0x523db4(0xa0a)](_0x44e93e,_0x5bf0a2,_0x5114bf,_0x2a5901);}}}if(_0x36a63b['length']>0x0){if(_0x523db4(0x205)!==_0x523db4(0x875))_0x36a63b+=_0xdada0f;else{_0x2e29cb[_0x523db4(0x7b1)](_0x188dc1,_0x10a82d);const _0x154684=_0x2fac1d['round'](_0x5a17ab['PictureID'])[_0x523db4(0xa09)](0x1,0x64),_0x30468f=_0x4918[_0x523db4(0x7c3)],_0x4070ea=_0x30468f[_0x523db4(0x9e7)][_0x523db4(0xa09)](0x0,0x1),_0x1fb1a8=_0x2ab4f8[_0x523db4(0x746)](_0x30468f[_0x523db4(0x72f)]||0x0),_0x4054a3=_0x3ec595['round'](_0x30468f[_0x523db4(0x815)]||0x0),_0x247631=_0x16223a[_0x523db4(0x746)](_0x30468f['ScaleX']||0x0),_0x28b495=_0x557ed0[_0x523db4(0x746)](_0x30468f['ScaleY']||0x0),_0x3f8cea=_0x1b8b6f[_0x523db4(0x746)](_0x30468f['Opacity'])[_0x523db4(0xa09)](0x0,0xff),_0x59872e=_0x30468f[_0x523db4(0x4d1)],_0x24ff3f=_0x523db4(0x631),_0x32625f=_0x20efe0['Smooth']?_0x523db4(0x438):_0x523db4(0xa06),_0x5ce5aa=_0x24ff3f['format'](_0x5d4e6d[_0x523db4(0x97b)],_0x32625f);_0x4c9af0[_0x523db4(0x820)](_0x154684,_0x5ce5aa,_0x4070ea,_0x1fb1a8,_0x4054a3,_0x247631,_0x28b495,_0x3f8cea,_0x59872e);}}return _0x36a63b;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x6af)]=function(){const _0x359230=_0x526668,_0x561104=$dataTroops['length']*0xa+Math[_0x359230(0x479)](0xa);alert(_0x359230(0x423)[_0x359230(0xa0a)](_0x561104));const _0x407e54=[];for(const _0x25b3fa of $dataTroops){if(!_0x25b3fa)continue;const _0x22e42c=_0x25b3fa['id'];_0x407e54[_0x22e42c]=VisuMZ['CoreEngine'][_0x359230(0x2e0)](_0x22e42c);}setTimeout(VisuMZ[_0x359230(0x6a7)][_0x359230(0x328)][_0x359230(0x670)](this,_0x407e54),_0x561104);},VisuMZ[_0x526668(0x6a7)]['ExtractStrFromTroop']=function(_0x46944b){const _0x5628d2=_0x526668;if(!$dataTroops[_0x46944b])return'';let _0x13c088='█'[_0x5628d2(0x53e)](0x46)+'\x0a\x0a',_0x1a7205='═'[_0x5628d2(0x53e)](0x46)+'\x0a\x0a',_0x488385='';this[_0x5628d2(0x83d)]=0x0;const _0x59e318=$dataTroops[_0x46944b];let _0x525504=_0x59e318[_0x5628d2(0x64a)];for(const _0xb6ff98 of _0x525504){const _0x5775ca=_0x525504[_0x5628d2(0x407)](_0xb6ff98)+0x1;let _0x8dc328=_0x1a7205+_0x5628d2(0x3b3),_0xff2d61=VisuMZ[_0x5628d2(0x6a7)][_0x5628d2(0x61d)](_0xb6ff98[_0x5628d2(0x9ae)]);if(_0xff2d61[_0x5628d2(0x5f3)]>0x0){if(_0x488385[_0x5628d2(0x5f3)]>0x0)_0x488385+=_0x1a7205+_0x5628d2(0x3a9);else{if(_0x5628d2(0x854)===_0x5628d2(0x457))return _0x1da17f[_0x5628d2(0x836)];else _0x488385+=_0x13c088+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x5628d2(0xa0a)](_0x46944b,_0x59e318[_0x5628d2(0x3c6)]||_0x5628d2(0x8cd))+_0x13c088;}_0x488385+=_0x8dc328[_0x5628d2(0xa0a)](_0x5775ca,_0xff2d61);}}return _0x488385[_0x5628d2(0x5f3)]>0x0&&(_0x488385+=_0x1a7205),_0x488385;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x328)]=function(_0x45319a){const _0x20fd27=_0x526668,_0x4e3843=_0x20fd27(0x4ae);_0x45319a['remove'](undefined)[_0x20fd27(0x74e)]('')[_0x20fd27(0x74e)](null);const _0x3edbc9=_0x45319a[_0x20fd27(0x964)]('\x0a\x0a\x0a\x0a\x0a')[_0x20fd27(0x4a6)]();VisuMZ['CoreEngine'][_0x20fd27(0x558)](_0x3edbc9,_0x4e3843,!![]),SceneManager['_scene'][_0x20fd27(0x31b)]=!![];},VisuMZ['CoreEngine'][_0x526668(0x61d)]=function(_0x972efb){const _0x32f367=_0x526668;let _0xe7695b='\x0a'+'─'[_0x32f367(0x53e)](0x46)+'\x0a',_0x2849c4='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x4f9d09='';for(const _0x51f2cc of _0x972efb){if(_0x32f367(0x302)!==_0x32f367(0x9f2)){if(!_0x51f2cc)continue;if(_0x51f2cc[_0x32f367(0x3d4)]===0x65)_0x4f9d09+=_0xe7695b+'\x0a',_0x4f9d09+='〘Show\x20Text〙\x0a',_0x51f2cc[_0x32f367(0x4f0)][0x4]!==''&&_0x51f2cc['parameters'][0x4]!==undefined&&(_0x32f367(0x784)===_0x32f367(0x42d)?this[_0x32f367(0x409)][_0x32f367(0x529)](_0x361c33[_0x32f367(0x298)][_0x32f367(0x365)]):_0x4f9d09+='【%1】\x0a'[_0x32f367(0xa0a)](_0x51f2cc[_0x32f367(0x4f0)][0x4]));else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x191)_0x4f9d09+='%1\x0a'[_0x32f367(0xa0a)](_0x51f2cc[_0x32f367(0x4f0)][0x0]);else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x192)_0x4f9d09+=_0xe7695b,_0x4f9d09+=_0x32f367(0x71f)[_0x32f367(0xa0a)](_0x2849c4,_0x51f2cc[_0x32f367(0x4f0)][0x0]+0x1,_0x51f2cc[_0x32f367(0x4f0)][0x1]);else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x193)_0x4f9d09+=_0xe7695b,_0x4f9d09+=_0x32f367(0x924)['format'](_0x2849c4);else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x194)_0x4f9d09+=_0xe7695b,_0x4f9d09+=_0x32f367(0x98c)[_0x32f367(0xa0a)](_0x2849c4);else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x69){if(_0x32f367(0x94c)===_0x32f367(0x94c))_0x4f9d09+=_0xe7695b+'\x0a',_0x4f9d09+=_0x32f367(0x713);else return _0x48b3dd[_0x32f367(0x298)]['ActorRect']['call'](this);}else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x6c){if(_0x32f367(0x808)!==_0x32f367(0x808))return _0x16e04b[_0x32f367(0x525)]&&_0x131c5f['description'][_0x32f367(0x666)]('['+_0x514534+']');else _0x4f9d09+=_0xe7695b+'\x0a',_0x4f9d09+=_0x32f367(0x7b4)['format'](_0x51f2cc[_0x32f367(0x4f0)][0x0]);}else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x198)_0x32f367(0x24a)===_0x32f367(0x377)?this[_0x32f367(0x89e)]():_0x4f9d09+='%1\x0a'['format'](_0x51f2cc[_0x32f367(0x4f0)][0x0]);else{if(_0x51f2cc[_0x32f367(0x3d4)]===0x75){if(_0x32f367(0x787)===_0x32f367(0x787)){const _0x5ba932=$dataCommonEvents[_0x51f2cc['parameters'][0x0]];if(_0x5ba932&&this['_commonEventLayers']<=0xa){this[_0x32f367(0x83d)]++;let _0x1f4a00=VisuMZ['CoreEngine'][_0x32f367(0x61d)](_0x5ba932[_0x32f367(0x9ae)]);if(_0x1f4a00[_0x32f367(0x5f3)]>0x0){if('gLAzT'!=='HfUUp')_0x4f9d09+=_0xe7695b,_0x4f9d09+=_0x2849c4,_0x4f9d09+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'['format'](_0x5ba932['id'],_0x5ba932[_0x32f367(0x3c6)]),_0x4f9d09+=_0x2849c4,_0x4f9d09+=_0x1f4a00,_0x4f9d09+=_0x2849c4,_0x4f9d09+=_0x32f367(0x873)[_0x32f367(0xa0a)](_0x5ba932['id'],_0x5ba932['name']),_0x4f9d09+=_0x2849c4;else{_0x173bd0['playOk']();if(!_0x602b40['isNwjs']()){const _0x11879c=_0x273b0e[_0x32f367(0x858)](_0x7f8c71,_0x32f367(0x91f));}else{const _0x2c5d4f=_0x518ccd[_0x32f367(0x29b)]==_0x32f367(0x262)?_0x32f367(0x858):_0x2ec1e1['platform']==_0x32f367(0x59b)?_0x32f367(0x264):'xdg-open';_0x7981ff(_0x32f367(0x5c5))[_0x32f367(0x2cb)](_0x2c5d4f+'\x20'+_0x1d6756);}}}this[_0x32f367(0x83d)]--;}}else _0x177fe2[_0x32f367(0x6a7)][_0x32f367(0x62a)][_0x32f367(0x5f4)](this),_0xa21cfa['_playTestFastMode']&&!_0x1749d1[_0x32f367(0x43a)]()&&(this[_0x32f367(0x66c)](),_0xb5de7b['updateEffekseer']());}}}}}}}}}}else{if(this[_0x32f367(0x860)])return;_0x408f8f[_0x32f367(0x6a7)][_0x32f367(0x462)][_0x32f367(0x5f4)](this);}}if(_0x4f9d09[_0x32f367(0x5f3)]>0x0){if(_0x32f367(0x2e1)===_0x32f367(0x2e1))_0x4f9d09+=_0xe7695b;else{if(_0x2c2db2['VisuMZ_1_BattleCore'])_0x1fe47b[_0x32f367(0x7be)](_0x2b54b0);else _0x5e135c&&_0x313eef[_0x32f367(0x767)]()&&_0x1d0171(_0x32f367(0x4ab));}}return _0x4f9d09;},PluginManager['registerCommand'](pluginData[_0x526668(0x3c6)],_0x526668(0x70f),_0xe041c3=>{const _0x5416ea=_0x526668;VisuMZ[_0x5416ea(0x7b1)](_0xe041c3,_0xe041c3);const _0x3b7bb7=_0xe041c3[_0x5416ea(0x275)];VisuMZ[_0x5416ea(0x524)](_0x3b7bb7);}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x80c),_0x37e0f9=>{const _0x12e35a=_0x526668;VisuMZ[_0x12e35a(0x7b1)](_0x37e0f9,_0x37e0f9);const _0x54a302=_0x37e0f9[_0x12e35a(0x813)]||0x0;$gameParty[_0x12e35a(0x439)](_0x54a302);}),PluginManager['registerCommand'](pluginData['name'],'MapOnceParallel',_0x5ee50c=>{const _0x5a6003=_0x526668;if(!SceneManager[_0x5a6003(0x3e8)]())return;VisuMZ[_0x5a6003(0x7b1)](_0x5ee50c,_0x5ee50c);const _0x57a6fb=_0x5ee50c[_0x5a6003(0x868)];SceneManager[_0x5a6003(0x807)]['playOnceParallelInterpreter'](_0x57a6fb);}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],'PictureCoordinatesMode',_0x5b7e64=>{const _0x569d1d=_0x526668;if(!$gameTemp[_0x569d1d(0x767)]())return;if(!Utils[_0x569d1d(0x8f3)]())return;VisuMZ[_0x569d1d(0x7b1)](_0x5b7e64,_0x5b7e64);const _0x5563c0=_0x5b7e64[_0x569d1d(0x95e)]||0x1;$gameTemp[_0x569d1d(0x79d)]=_0x5563c0;}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x67a),_0x14f487=>{const _0x261949=_0x526668;VisuMZ['ConvertParams'](_0x14f487,_0x14f487);const _0x3cd254=_0x14f487[_0x261949(0x8c6)]||0x1,_0xe57e9=_0x14f487[_0x261949(0x87c)]||_0x261949(0x732),_0x1dcb34=$gameScreen[_0x261949(0x2f6)](_0x3cd254);_0x1dcb34&&(_0x261949(0xa02)==='QidQK'?this[_0x261949(0x435)]={}:_0x1dcb34['setEasingType'](_0xe57e9));}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x79e),_0x448f13=>{const _0x4a0309=_0x526668;for(let _0x840756=0x1;_0x840756<=0x64;_0x840756++){$gameScreen[_0x4a0309(0x73f)](_0x840756);}}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x404),_0x5a4cbc=>{const _0x4a4db4=_0x526668;VisuMZ['ConvertParams'](_0x5a4cbc,_0x5a4cbc);const _0x1f10a7=Math['min'](_0x5a4cbc[_0x4a4db4(0x561)],_0x5a4cbc[_0x4a4db4(0x800)]),_0x252cf8=Math[_0x4a4db4(0x431)](_0x5a4cbc[_0x4a4db4(0x561)],_0x5a4cbc['EndingID']);for(let _0x6b34f1=_0x1f10a7;_0x6b34f1<=_0x252cf8;_0x6b34f1++){if(_0x4a4db4(0x69a)===_0x4a4db4(0x4e1)){const _0x17cd08='_stored_powerDownColor';this['_colorCache']=this[_0x4a4db4(0x435)]||{};if(this[_0x4a4db4(0x435)][_0x17cd08])return this[_0x4a4db4(0x435)][_0x17cd08];const _0x4c46b4=_0x52c599['CoreEngine'][_0x4a4db4(0x7c3)]['Color']['ColorPowerDown'];return this['getColorDataFromPluginParameters'](_0x17cd08,_0x4c46b4);}else $gameScreen['erasePicture'](_0x6b34f1);}}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0xa2c),_0x442f01=>{const _0x4cb3cd=_0x526668;VisuMZ[_0x4cb3cd(0x7b1)](_0x442f01,_0x442f01);const _0x51fe5a=Math[_0x4cb3cd(0x746)](_0x442f01[_0x4cb3cd(0x95e)])[_0x4cb3cd(0xa09)](0x1,0x64),_0x1c0961=_0x442f01[_0x4cb3cd(0x7c3)],_0x55aed1=_0x1c0961[_0x4cb3cd(0x9e7)]['clamp'](0x0,0x1),_0xc38425=Math[_0x4cb3cd(0x746)](_0x1c0961['PositionX']||0x0),_0x438c4f=Math[_0x4cb3cd(0x746)](_0x1c0961[_0x4cb3cd(0x815)]||0x0),_0x2ca29b=Math[_0x4cb3cd(0x746)](_0x1c0961[_0x4cb3cd(0x4c7)]||0x0),_0xdfe285=Math[_0x4cb3cd(0x746)](_0x1c0961[_0x4cb3cd(0x63b)]||0x0),_0x1ff8e6=Math[_0x4cb3cd(0x746)](_0x1c0961['Opacity'])[_0x4cb3cd(0xa09)](0x0,0xff),_0x203899=_0x1c0961[_0x4cb3cd(0x4d1)],_0x126ca1=_0x4cb3cd(0x631),_0x444592=_0x442f01[_0x4cb3cd(0x438)]?_0x4cb3cd(0x438):_0x4cb3cd(0xa06),_0x593de9=_0x126ca1[_0x4cb3cd(0xa0a)](_0x442f01[_0x4cb3cd(0x97b)],_0x444592);$gameScreen[_0x4cb3cd(0x820)](_0x51fe5a,_0x593de9,_0x55aed1,_0xc38425,_0x438c4f,_0x2ca29b,_0xdfe285,_0x1ff8e6,_0x203899);}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x884),_0x3b1212=>{const _0x43e155=_0x526668;VisuMZ[_0x43e155(0x7b1)](_0x3b1212,_0x3b1212);const _0xac6456=_0x3b1212['Type']||_0x43e155(0x941),_0x475955=_0x3b1212[_0x43e155(0x7b0)][_0x43e155(0xa09)](0x1,0x9),_0x23ef4d=_0x3b1212[_0x43e155(0x91b)][_0x43e155(0xa09)](0x1,0x9),_0x57e35d=_0x3b1212[_0x43e155(0x5e2)]||0x1,_0x12c08b=_0x3b1212[_0x43e155(0x385)];$gameScreen[_0x43e155(0x36f)](_0xac6456),$gameScreen[_0x43e155(0x8eb)](_0x475955,_0x23ef4d,_0x57e35d);if(_0x12c08b){const _0xf1d553=$gameTemp[_0x43e155(0x4be)]();if(_0xf1d553)_0xf1d553['wait'](_0x57e35d);}}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x417),_0x41f619=>{const _0x118022=_0x526668;VisuMZ[_0x118022(0x7b1)](_0x41f619,_0x41f619);const _0x46468c=_0x41f619[_0x118022(0x8c4)]||0x1;$gameSystem[_0x118022(0x35a)](_0x46468c);}),PluginManager['registerCommand'](pluginData['name'],_0x526668(0x645),_0x35b164=>{const _0x54c0a1=_0x526668;if($gameParty['inBattle']())return;VisuMZ[_0x54c0a1(0x7b1)](_0x35b164,_0x35b164);const _0x4fc7de=_0x35b164[_0x54c0a1(0x8c4)];if(_0x4fc7de[_0x54c0a1(0x78d)](/Front/i))$gameSystem['setSideView'](![]);else{if(_0x4fc7de[_0x54c0a1(0x78d)](/Side/i)){if('jtqYL'===_0x54c0a1(0x4e5)){const _0x394970=_0x53bd2c['nickname']()[_0x54c0a1(0x38e)](/\\I\[(\d+)\]/gi,'');this[_0x54c0a1(0x714)](_0x57a4b0[_0x54c0a1(0x9f8)](),_0x26262b,_0xd703e3,_0x49ffc6);}else $gameSystem[_0x54c0a1(0x441)](!![]);}else $gameSystem[_0x54c0a1(0x441)](!$gameSystem[_0x54c0a1(0x551)]());}}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x247),_0x3471a7=>{const _0x5f5000=_0x526668;if($gameParty[_0x5f5000(0x61a)]())return;VisuMZ[_0x5f5000(0x7b1)](_0x3471a7,_0x3471a7);const _0x476fed=[_0x5f5000(0x728),_0x5f5000(0x78b),'me','se'];for(const _0x4609b1 of _0x476fed){const _0x2c6c1f=_0x3471a7[_0x4609b1],_0x74859f=_0x5f5000(0x750)[_0x5f5000(0xa0a)](_0x4609b1);for(const _0x2b3c6d of _0x2c6c1f){if(_0x5f5000(0x554)!=='dBqOd')AudioManager[_0x5f5000(0x9fc)](_0x74859f,_0x2b3c6d);else for(const _0x312d30 of _0x566c46[_0x5f5000(0x21b)]){if(_0x312d30[_0x5f5000(0x334)][_0x5f5000(0x5f4)](this)){const _0x56571b=_0x312d30['Symbol'];let _0x2c65e8=_0x312d30[_0x5f5000(0x527)];if(['',_0x5f5000(0x43f)][_0x5f5000(0x666)](_0x2c65e8))_0x2c65e8=_0x312d30[_0x5f5000(0x478)][_0x5f5000(0x5f4)](this);const _0x2ff553=_0x312d30[_0x5f5000(0x740)]['call'](this),_0x92addf=_0x312d30['ExtJS']['call'](this);this['addCommand'](_0x2c65e8,_0x56571b,_0x2ff553,_0x92addf),this['setHandler'](_0x56571b,_0x312d30[_0x5f5000(0x952)][_0x5f5000(0x670)](this,_0x92addf));}}}}}),PluginManager['registerCommand'](pluginData[_0x526668(0x3c6)],_0x526668(0x71b),_0x16ebc9=>{const _0x462d3e=_0x526668;if($gameParty[_0x462d3e(0x61a)]())return;VisuMZ[_0x462d3e(0x7b1)](_0x16ebc9,_0x16ebc9);const _0x59c55b=[_0x462d3e(0x56c),_0x462d3e(0x286),'battlebacks2',_0x462d3e(0x8ee),_0x462d3e(0x69f),'faces','parallaxes',_0x462d3e(0x2e6),'sv_actors',_0x462d3e(0x55d),_0x462d3e(0x93c),_0x462d3e(0x287),_0x462d3e(0x2fd),_0x462d3e(0x936)];for(const _0x21efb6 of _0x59c55b){if(_0x462d3e(0x556)!==_0x462d3e(0x88c)){const _0x321480=_0x16ebc9[_0x21efb6],_0x27e6c8=_0x462d3e(0x669)['format'](_0x21efb6);for(const _0xbf4229 of _0x321480){ImageManager[_0x462d3e(0x874)](_0x27e6c8,_0xbf4229);}}else var _0x162b04=_0x5dbea1[_0x462d3e(0x31f)](_0x4a21a6*0x2,_0x462d3e(0x925))*0.5;}}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x5d4),_0x1ec39b=>{const _0x2e6804=_0x526668;if($gameParty[_0x2e6804(0x61a)]())return;VisuMZ['ConvertParams'](_0x1ec39b,_0x1ec39b);const _0x44d5ab=_0x1ec39b[_0x2e6804(0x460)],_0x130f19=(_0x1ec39b[_0x2e6804(0x990)]||0x0)/0x64;for(const _0x384c24 of _0x44d5ab){const _0x16c125=Math[_0x2e6804(0x941)]()<=_0x130f19;$gameSwitches['setValue'](_0x384c24,_0x16c125);}}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x4d4),_0x2e8912=>{const _0x57ae11=_0x526668;if($gameParty[_0x57ae11(0x61a)]())return;VisuMZ[_0x57ae11(0x7b1)](_0x2e8912,_0x2e8912);const _0x79ac51=Math[_0x57ae11(0x845)](_0x2e8912[_0x57ae11(0x561)],_0x2e8912['EndingID']),_0x57e689=Math[_0x57ae11(0x431)](_0x2e8912[_0x57ae11(0x561)],_0x2e8912[_0x57ae11(0x800)]),_0x44dadf=(_0x2e8912[_0x57ae11(0x990)]||0x0)/0x64;for(let _0x3a25d9=_0x79ac51;_0x3a25d9<=_0x57e689;_0x3a25d9++){const _0xc23b39=Math[_0x57ae11(0x941)]()<=_0x44dadf;$gameSwitches[_0x57ae11(0x3c1)](_0x3a25d9,_0xc23b39);}}),PluginManager[_0x526668(0x920)](pluginData['name'],_0x526668(0x79b),_0x32d0da=>{const _0x3f43e6=_0x526668;if($gameParty[_0x3f43e6(0x61a)]())return;VisuMZ[_0x3f43e6(0x7b1)](_0x32d0da,_0x32d0da);const _0x1be310=_0x32d0da[_0x3f43e6(0x460)];for(const _0x3ada95 of _0x1be310){const _0x22232c=$gameSwitches[_0x3f43e6(0x813)](_0x3ada95);$gameSwitches[_0x3f43e6(0x3c1)](_0x3ada95,!_0x22232c);}}),PluginManager['registerCommand'](pluginData[_0x526668(0x3c6)],_0x526668(0x240),_0x217139=>{const _0x4b1ea7=_0x526668;if($gameParty[_0x4b1ea7(0x61a)]())return;VisuMZ[_0x4b1ea7(0x7b1)](_0x217139,_0x217139);const _0xbf3878=Math[_0x4b1ea7(0x845)](_0x217139[_0x4b1ea7(0x561)],_0x217139['EndingID']),_0x3b36c4=Math[_0x4b1ea7(0x431)](_0x217139[_0x4b1ea7(0x561)],_0x217139['EndingID']);for(let _0x188cf0=_0xbf3878;_0x188cf0<=_0x3b36c4;_0x188cf0++){const _0xe5e304=$gameSwitches['value'](_0x188cf0);$gameSwitches[_0x4b1ea7(0x3c1)](_0x188cf0,!_0xe5e304);}}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x838),_0x13f8e5=>{const _0x4476b3=_0x526668;if($gameParty[_0x4476b3(0x61a)]())return;VisuMZ[_0x4476b3(0x7b1)](_0x13f8e5,_0x13f8e5);const _0x55e4e7=_0x13f8e5[_0x4476b3(0x8c4)][_0x4476b3(0x4b5)]()[_0x4476b3(0x4a6)](),_0x440585=VisuMZ[_0x4476b3(0x6a7)][_0x4476b3(0x3a7)](_0x55e4e7);$gameSystem[_0x4476b3(0x516)](_0x440585);}),VisuMZ[_0x526668(0x6a7)][_0x526668(0x3a7)]=function(_0x1c9cf8){const _0x41e156=_0x526668;_0x1c9cf8=_0x1c9cf8||'DATABASE',_0x1c9cf8=String(_0x1c9cf8)[_0x41e156(0x4b5)]()[_0x41e156(0x4a6)]();switch(_0x1c9cf8){case _0x41e156(0x3a2):return 0x0;case _0x41e156(0x78a):Imported[_0x41e156(0x23e)]&&(ConfigManager[_0x41e156(0x7db)]=!![]);return 0x1;case _0x41e156(0x9ea):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x41e156(0x7db)]=![]);return 0x2;case _0x41e156(0x22e):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x41e156(0x22e);break;case'STB':if(Imported[_0x41e156(0x75a)]){if(_0x41e156(0x4cb)!=='pTcGb'){let _0x4885ff=_0x33cc35[_0xe9ffee],_0x265691=this[_0x41e156(0x8f2)](_0x4885ff)[_0x41e156(0x745)],_0xd46d4e=_0x499bc5[_0x41e156(0x749)]((this['contents'][_0x41e156(0x745)]-_0x265691)/0x2);this[_0x41e156(0x816)](_0x4885ff,_0xd46d4e,_0x5ecfc6),_0x6a245f+=this[_0x41e156(0x367)]();}else return _0x41e156(0x3b5);}break;case _0x41e156(0x9a1):if(Imported[_0x41e156(0x695)]){if('RMOpf'===_0x41e156(0x24d))_0x30300a[_0x41e156(0x80f)]();else return _0x41e156(0x9a1);}break;case _0x41e156(0x825):if(Imported['VisuMZ_2_BattleSystemFTB'])return'dDgzD'!==_0x41e156(0x98b)?this[_0x41e156(0x77a)]():_0x41e156(0x825);break;case'OTB':if(Imported[_0x41e156(0x307)]){if('VUBYM'==='VUBYM')return _0x41e156(0x38a);else for(let _0x3d5afe=0x1;_0x3d5afe<=0x64;_0x3d5afe++){_0x62abff[_0x41e156(0x73f)](_0x3d5afe);}}break;case'ETB':if(Imported[_0x41e156(0x3f8)])return _0x41e156(0x64e);break;case _0x41e156(0x395):if(Imported[_0x41e156(0x68e)]){if(_0x41e156(0x91e)!=='ZdjQK'){const _0x58920f=this[_0x41e156(0x942)]()-this['itemPadding']()*0x2;this[_0x41e156(0x3b6)](_0x5d228e,_0x3bec0c,_0x58920f,_0x26c22b,![]);}else return'PTB';}break;}return $dataSystem[_0x41e156(0x3c2)];},PluginManager['registerCommand'](pluginData['name'],_0x526668(0x9d4),_0x265c0d=>{const _0x3a850f=_0x526668;VisuMZ[_0x3a850f(0x7b1)](_0x265c0d,_0x265c0d);const _0x1fe58f=_0x265c0d[_0x3a850f(0x8c4)]||0x1;$gameSystem[_0x3a850f(0x8af)](_0x1fe58f);}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x321),_0x594a62=>{const _0x273c08=_0x526668;VisuMZ[_0x273c08(0x7b1)](_0x594a62,_0x594a62);const _0x165448=_0x594a62['id']||0x1,_0x204a27=_0x594a62['operation'],_0x525333=_0x594a62['operand']||0x0;let _0x52af35=$gameVariables[_0x273c08(0x813)](_0x165448)||0x0;switch(_0x204a27){case'=':_0x52af35=_0x525333;break;case'+':_0x52af35+=_0x525333;break;case'-':_0x52af35-=_0x525333;break;case'*':_0x52af35*=_0x525333;break;case'/':_0x52af35/=_0x525333;break;case'%':_0x52af35%=_0x525333;break;}_0x52af35=_0x52af35||0x0,$gameVariables[_0x273c08(0x3c1)](_0x165448,_0x52af35);}),PluginManager[_0x526668(0x920)](pluginData[_0x526668(0x3c6)],_0x526668(0x769),_0x29e7b0=>{const _0x4a7606=_0x526668;VisuMZ[_0x4a7606(0x7b1)](_0x29e7b0,_0x29e7b0);const _0x3953eb=_0x29e7b0['id']()||0x1,_0x4aaefd=_0x29e7b0[_0x4a7606(0x8ce)],_0x3da66a=_0x29e7b0['operand']()||0x0;let _0x5b14dc=$gameVariables[_0x4a7606(0x813)](_0x3953eb)||0x0;switch(_0x4aaefd){case'=':_0x5b14dc=_0x3da66a;break;case'+':_0x5b14dc+=_0x3da66a;break;case'-':_0x5b14dc-=_0x3da66a;break;case'*':_0x5b14dc*=_0x3da66a;break;case'/':_0x5b14dc/=_0x3da66a;break;case'%':_0x5b14dc%=_0x3da66a;break;}_0x5b14dc=_0x5b14dc||0x0,$gameVariables['setValue'](_0x3953eb,_0x5b14dc);}),VisuMZ[_0x526668(0x6a7)][_0x526668(0x292)]=Scene_Boot[_0x526668(0x4aa)][_0x526668(0x8b6)],Scene_Boot['prototype'][_0x526668(0x8b6)]=function(){const _0x50a18a=_0x526668;VisuMZ[_0x50a18a(0x6a7)][_0x50a18a(0x292)][_0x50a18a(0x5f4)](this),this[_0x50a18a(0x35e)](),this[_0x50a18a(0x218)](),this[_0x50a18a(0x2d5)](),this[_0x50a18a(0x940)](),this[_0x50a18a(0x809)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x60e)]={},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x35e)]=function(){const _0x5b46f3=_0x526668,_0x1e6996=[_0x5b46f3(0x644),_0x5b46f3(0x54f),_0x5b46f3(0x840),_0x5b46f3(0x8c5),_0x5b46f3(0x8e9),_0x5b46f3(0x2fc),'AGI',_0x5b46f3(0x59f)],_0x4e0f92=['HIT',_0x5b46f3(0x7ef),'CRI',_0x5b46f3(0x51a),_0x5b46f3(0x643),_0x5b46f3(0x325),_0x5b46f3(0x95f),_0x5b46f3(0x734),'MRG',_0x5b46f3(0x61f)],_0x1768f0=[_0x5b46f3(0x212),_0x5b46f3(0x92c),_0x5b46f3(0x9e4),_0x5b46f3(0x839),_0x5b46f3(0x4bd),_0x5b46f3(0x80e),_0x5b46f3(0x7cc),_0x5b46f3(0x92a),_0x5b46f3(0x33a),_0x5b46f3(0x998)],_0xc92ef6=[_0x1e6996,_0x4e0f92,_0x1768f0],_0x101601=['Plus',_0x5b46f3(0x84b),'Plus2',_0x5b46f3(0x2dc),'Rate',_0x5b46f3(0x209),_0x5b46f3(0x630),_0x5b46f3(0x2c0),_0x5b46f3(0x84e),_0x5b46f3(0x9ab)];for(const _0x312d88 of _0xc92ef6){let _0x2071fe='';if(_0x312d88===_0x1e6996)_0x2071fe=_0x5b46f3(0x613);if(_0x312d88===_0x4e0f92)_0x2071fe=_0x5b46f3(0x86e);if(_0x312d88===_0x1768f0)_0x2071fe=_0x5b46f3(0x393);for(const _0x43d755 of _0x101601){if(_0x5b46f3(0x1f2)!==_0x5b46f3(0x8d4)){let _0x495186='%1%2'['format'](_0x2071fe,_0x43d755);VisuMZ[_0x5b46f3(0x6a7)]['RegExp'][_0x495186]=[],VisuMZ[_0x5b46f3(0x6a7)][_0x5b46f3(0x60e)][_0x495186+'JS']=[];let _0x4c2d88=_0x5b46f3(0x7cb);if(['Plus',_0x5b46f3(0x2c0)][_0x5b46f3(0x666)](_0x43d755))_0x5b46f3(0x896)!==_0x5b46f3(0x9dc)?_0x4c2d88+='([\x5c+\x5c-]\x5cd+)>':(_0x20113b+=this[_0x5b46f3(0x5e5)][_0x29ed41][_0x5b46f3(0x4f0)][0x0]+'\x0a',_0x3e0cbd++);else{if([_0x5b46f3(0x84b),'Flat1'][_0x5b46f3(0x666)](_0x43d755))_0x4c2d88+=_0x5b46f3(0x9f6);else{if([_0x5b46f3(0x6ab),'Flat2'][_0x5b46f3(0x666)](_0x43d755))_0x4c2d88+=_0x5b46f3(0x544);else{if(_0x43d755===_0x5b46f3(0x2dc))_0x5b46f3(0x5e7)===_0x5b46f3(0x5e7)?_0x4c2d88+=_0x5b46f3(0x2d3):(this[_0x5b46f3(0x7e2)]-=this[_0x5b46f3(0x8a9)](),this[_0x5b46f3(0x6c9)]()&&(this[_0x5b46f3(0x8ae)]=![]));else{if(_0x43d755===_0x5b46f3(0x209))_0x4c2d88+=_0x5b46f3(0x9d1);else _0x43d755===_0x5b46f3(0x630)&&(_0x4c2d88+=_0x5b46f3(0x67d));}}}}for(const _0x273c15 of _0x312d88){let _0x2809c2=_0x43d755[_0x5b46f3(0x38e)](/[\d+]/g,'')[_0x5b46f3(0x4b5)]();const _0x110530=_0x4c2d88['format'](_0x273c15,_0x2809c2);VisuMZ['CoreEngine'][_0x5b46f3(0x60e)][_0x495186][_0x5b46f3(0x3ec)](new RegExp(_0x110530,'i'));const _0x282259='<JS\x20%1\x20%2:[\x20](.*)>'[_0x5b46f3(0xa0a)](_0x273c15,_0x2809c2);VisuMZ[_0x5b46f3(0x6a7)][_0x5b46f3(0x60e)][_0x495186+'JS'][_0x5b46f3(0x3ec)](new RegExp(_0x282259,'i'));}}else this[_0x5b46f3(0x3ff)][_0x5b46f3(0x529)](_0x5472e1[_0x5b46f3(0x298)][_0x5b46f3(0x61b)]);}}},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x218)]=function(){const _0x23a1bd=_0x526668;if(VisuMZ[_0x23a1bd(0x907)])return;},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x2d5)]=function(){const _0x3017b2=_0x526668,_0x3c6cb4=VisuMZ[_0x3017b2(0x6a7)]['Settings'];_0x3c6cb4[_0x3017b2(0x622)][_0x3017b2(0x651)]&&(_0x3017b2(0xa12)===_0x3017b2(0xa12)?VisuMZ[_0x3017b2(0x7c5)](!![]):this[_0x3017b2(0x474)][_0x3017b2(0x529)](_0x35f321[_0x3017b2(0x298)][_0x3017b2(0x304)]));_0x3c6cb4[_0x3017b2(0x622)][_0x3017b2(0x62d)]&&(Input[_0x3017b2(0x338)][0x23]=_0x3017b2(0x8bd),Input[_0x3017b2(0x338)][0x24]=_0x3017b2(0x97a));if(_0x3c6cb4[_0x3017b2(0x680)]){if('DavGG'!=='DavGG'){_0xc2ea60[_0x3017b2(0x6a7)][_0x3017b2(0x814)][_0x3017b2(0x5f4)](this,_0x3c1d5b);if(_0x53d933[_0x3017b2(0x6a7)][_0x3017b2(0x7c3)][_0x3017b2(0x622)][_0x3017b2(0x3b1)])return;const _0x95e3bd=_0x22b49d[_0x3017b2(0x8e8)]();_0x95e3bd[_0x3017b2(0x428)]&&(0x1-this[_0x3017b2(0x219)](_0x2349f5)>this[_0x3017b2(0x5b2)](_0x3addfa)&&(_0x95e3bd[_0x3017b2(0x428)]=![],_0x95e3bd[_0x3017b2(0x4f2)]=!![]));}else{const _0x362900=_0x3c6cb4[_0x3017b2(0x680)];_0x362900[_0x3017b2(0x692)]=_0x362900[_0x3017b2(0x692)]||'\x5c}❪SHIFT❫\x5c{',_0x362900[_0x3017b2(0x6f2)]=_0x362900[_0x3017b2(0x6f2)]||_0x3017b2(0x7d7);}}_0x3c6cb4['KeyboardInput'][_0x3017b2(0x2b2)]&&(Input['keyMapper'][0x57]='up',Input[_0x3017b2(0x338)][0x41]=_0x3017b2(0x841),Input['keyMapper'][0x53]=_0x3017b2(0x8d6),Input[_0x3017b2(0x338)][0x44]=_0x3017b2(0x43b),Input[_0x3017b2(0x338)][0x45]=_0x3017b2(0x280)),_0x3c6cb4[_0x3017b2(0x41b)]['DashToggleR']&&(Input[_0x3017b2(0x338)][0x52]='dashToggle'),_0x3c6cb4[_0x3017b2(0x81d)][_0x3017b2(0x6b9)]=_0x3c6cb4[_0x3017b2(0x81d)]['DisplayedParams'][_0x3017b2(0x4ce)](_0xdb5ab1=>_0xdb5ab1['toUpperCase']()[_0x3017b2(0x4a6)]()),_0x3c6cb4['Param'][_0x3017b2(0x308)]=_0x3c6cb4[_0x3017b2(0x81d)][_0x3017b2(0x308)][_0x3017b2(0x4ce)](_0x2affe7=>_0x2affe7['toUpperCase']()['trim']());},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x940)]=function(){const _0x4b8eab=_0x526668;this[_0x4b8eab(0x621)]();},Scene_Boot[_0x526668(0x4aa)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x5cdd4d=_0x526668,_0x29c2be=VisuMZ[_0x5cdd4d(0x6a7)][_0x5cdd4d(0x7c3)]['jsQuickFunc'];for(const _0x5bdc2b of _0x29c2be){if(_0x5cdd4d(0x24c)!==_0x5cdd4d(0x24c)){if(this['_hideTileShadows']===_0x12a489)this[_0x5cdd4d(0x21c)]();return this['_hideTileShadows'];}else{const _0x39f959=_0x5bdc2b['FunctionName'][_0x5cdd4d(0x38e)](/[ ]/g,''),_0x29ee9e=_0x5bdc2b['CodeJS'];VisuMZ['CoreEngine'][_0x5cdd4d(0x270)](_0x39f959,_0x29ee9e);}}},VisuMZ['CoreEngine'][_0x526668(0x270)]=function(_0x3b007f,_0x205f39){const _0x511a27=_0x526668;if(!!window[_0x3b007f]){if($gameTemp[_0x511a27(0x767)]())console[_0x511a27(0x642)](_0x511a27(0x9ee)[_0x511a27(0xa0a)](_0x3b007f));}const _0x8e2ae3=_0x511a27(0x819)[_0x511a27(0xa0a)](_0x3b007f,_0x205f39);window[_0x3b007f]=new Function(_0x8e2ae3);},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x809)]=function(){const _0x468aa6=_0x526668,_0x4e8543=VisuMZ['CoreEngine'][_0x468aa6(0x7c3)]['CustomParam'];if(!_0x4e8543)return;for(const _0x36e761 of _0x4e8543){if(!_0x36e761)continue;VisuMZ[_0x468aa6(0x6a7)][_0x468aa6(0x885)](_0x36e761);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x526668(0x6a7)]['CustomParamIcons']={},VisuMZ[_0x526668(0x6a7)][_0x526668(0x31d)]={},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3c7)]={},VisuMZ[_0x526668(0x6a7)][_0x526668(0x885)]=function(_0x3d0937){const _0x42d670=_0x526668,_0x12960b=_0x3d0937['Abbreviation'],_0x343e73=_0x3d0937[_0x42d670(0x60d)],_0x4f9466=_0x3d0937['Icon'],_0x5203ff=_0x3d0937[_0x42d670(0x3f0)],_0x1e202c=new Function(_0x3d0937['ValueJS']);VisuMZ[_0x42d670(0x6a7)][_0x42d670(0x6e0)][_0x12960b[_0x42d670(0x4b5)]()[_0x42d670(0x4a6)]()]=_0x343e73,VisuMZ['CoreEngine'][_0x42d670(0x92f)][_0x12960b[_0x42d670(0x4b5)]()[_0x42d670(0x4a6)]()]=_0x4f9466,VisuMZ['CoreEngine'][_0x42d670(0x31d)][_0x12960b[_0x42d670(0x4b5)]()[_0x42d670(0x4a6)]()]=_0x5203ff,VisuMZ[_0x42d670(0x6a7)][_0x42d670(0x3c7)][_0x12960b['toUpperCase']()[_0x42d670(0x4a6)]()]=_0x12960b,Object['defineProperty'](Game_BattlerBase['prototype'],_0x12960b,{'get'(){const _0x24db0f=_0x42d670;if(_0x24db0f(0x51e)===_0x24db0f(0x51e)){const _0x3c58aa=_0x1e202c['call'](this);return _0x5203ff===_0x24db0f(0x956)?Math[_0x24db0f(0x746)](_0x3c58aa):_0x3c58aa;}else{if(_0xcdd259)_0x1c1bb0[_0x24db0f(0x689)](_0x550416);}}});},VisuMZ[_0x526668(0x907)]=function(){const _0x1f0c0d=_0x526668;for(const _0x50371c of $dataActors){if(_0x50371c)VisuMZ[_0x1f0c0d(0x6c2)](_0x50371c);}for(const _0x2337dd of $dataClasses){if('BBcbV'===_0x1f0c0d(0x98e)){const _0x21c056=_0x4b8fdd[_0x1f0c0d(0x858)](_0x25380d,_0x1f0c0d(0x91f));}else{if(_0x2337dd)VisuMZ[_0x1f0c0d(0x266)](_0x2337dd);}}for(const _0x7058bc of $dataSkills){if(_0x1f0c0d(0x327)===_0x1f0c0d(0x33e))_0x244525['VisuMZ_2_BattleSystemBTB']&&(this[_0x1f0c0d(0x230)]=_0x1f0c0d(0x9a1));else{if(_0x7058bc)VisuMZ[_0x1f0c0d(0x689)](_0x7058bc);}}for(const _0x214eed of $dataItems){if(_0x214eed)VisuMZ[_0x1f0c0d(0x5fd)](_0x214eed);}for(const _0x4c256b of $dataWeapons){if(_0x4c256b)VisuMZ[_0x1f0c0d(0x548)](_0x4c256b);}for(const _0x53904a of $dataArmors){if(_0x1f0c0d(0x39d)!==_0x1f0c0d(0x39d)){var _0x3c02b0=_0x7d3323(_0x111de5['$1']);try{_0x51374b*=_0x4ee1c6(_0x3c02b0);}catch(_0x328ab3){if(_0x2cdef0['isPlaytest']())_0x409444[_0x1f0c0d(0x642)](_0x328ab3);}}else{if(_0x53904a)VisuMZ[_0x1f0c0d(0x3d9)](_0x53904a);}}for(const _0x2663d7 of $dataEnemies){if(_0x1f0c0d(0x48a)==='kVnan'){if(_0x2663d7)VisuMZ[_0x1f0c0d(0x25f)](_0x2663d7);}else{if(this[_0x1f0c0d(0x277)]()===this[_0x1f0c0d(0x595)]-0x1)return;_0x3da1e3[_0x1f0c0d(0x56a)](),this[_0x1f0c0d(0x7f0)](),_0x2522cb[_0x1f0c0d(0x52e)](),this[_0x1f0c0d(0x606)](this[_0x1f0c0d(0x595)]-0x1);}}for(const _0x46c3f0 of $dataStates){if(_0x46c3f0)VisuMZ[_0x1f0c0d(0x4e2)](_0x46c3f0);}for(const _0x59a62f of $dataTilesets){if(_0x59a62f)VisuMZ[_0x1f0c0d(0x340)](_0x59a62f);}},VisuMZ[_0x526668(0x6c2)]=function(_0x20d16c){},VisuMZ['ParseClassNotetags']=function(_0x5af0cc){},VisuMZ[_0x526668(0x689)]=function(_0xcbb7a2){},VisuMZ[_0x526668(0x5fd)]=function(_0x27f5fb){},VisuMZ[_0x526668(0x548)]=function(_0x426901){},VisuMZ[_0x526668(0x3d9)]=function(_0x57118b){},VisuMZ[_0x526668(0x25f)]=function(_0x4289f9){},VisuMZ[_0x526668(0x4e2)]=function(_0x43d46e){},VisuMZ['ParseTilesetNotetags']=function(_0x3f953e){},VisuMZ[_0x526668(0x6a7)][_0x526668(0x6c2)]=VisuMZ[_0x526668(0x6c2)],VisuMZ[_0x526668(0x6c2)]=function(_0x18c9d2){const _0x2ee5f7=_0x526668;VisuMZ['CoreEngine'][_0x2ee5f7(0x6c2)][_0x2ee5f7(0x5f4)](this,_0x18c9d2);const _0x1f52da=_0x18c9d2['note'];if(_0x1f52da[_0x2ee5f7(0x78d)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x2ee5f7(0x38d)!==_0x2ee5f7(0x379)){_0x18c9d2[_0x2ee5f7(0x425)]=Number(RegExp['$1']);if(_0x18c9d2['maxLevel']===0x0)_0x18c9d2[_0x2ee5f7(0x425)]=Number[_0x2ee5f7(0x4c4)];}else this[_0x2ee5f7(0x96f)](...arguments);}_0x1f52da[_0x2ee5f7(0x78d)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x18c9d2[_0x2ee5f7(0x780)]=Math[_0x2ee5f7(0x845)](Number(RegExp['$1']),_0x18c9d2[_0x2ee5f7(0x425)]));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x266)]=VisuMZ[_0x526668(0x266)],VisuMZ[_0x526668(0x266)]=function(_0x4d4457){const _0x19a8e8=_0x526668;VisuMZ[_0x19a8e8(0x6a7)][_0x19a8e8(0x266)][_0x19a8e8(0x5f4)](this,_0x4d4457);if(_0x4d4457[_0x19a8e8(0x37a)]){if('GjnaI'!==_0x19a8e8(0x9b1))for(const _0x2cb521 of _0x4d4457[_0x19a8e8(0x37a)]){_0x2cb521['note'][_0x19a8e8(0x78d)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2cb521[_0x19a8e8(0x95a)]=Math[_0x19a8e8(0x431)](Number(RegExp['$1']),0x1));}else return _0x129d49[_0x19a8e8(0x298)]['InputRect'][_0x19a8e8(0x5f4)](this);}},VisuMZ['CoreEngine'][_0x526668(0x25f)]=VisuMZ[_0x526668(0x25f)],VisuMZ['ParseEnemyNotetags']=function(_0x378ea1){const _0x526dc9=_0x526668;VisuMZ[_0x526dc9(0x6a7)]['ParseEnemyNotetags'][_0x526dc9(0x5f4)](this,_0x378ea1),_0x378ea1[_0x526dc9(0x95a)]=0x1;const _0x344ca0=_0x378ea1[_0x526dc9(0x269)];if(_0x344ca0[_0x526dc9(0x78d)](/<LEVEL:[ ](\d+)>/i))_0x378ea1['level']=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<MAXHP:[ ](\d+)>/i))_0x378ea1[_0x526dc9(0x56f)][0x0]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<MAXMP:[ ](\d+)>/i))_0x378ea1[_0x526dc9(0x56f)][0x1]=Number(RegExp['$1']);if(_0x344ca0['match'](/<ATK:[ ](\d+)>/i))_0x378ea1[_0x526dc9(0x56f)][0x2]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<DEF:[ ](\d+)>/i))_0x378ea1[_0x526dc9(0x56f)][0x3]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<MAT:[ ](\d+)>/i))_0x378ea1['params'][0x4]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<MDF:[ ](\d+)>/i))_0x378ea1['params'][0x5]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<AGI:[ ](\d+)>/i))_0x378ea1['params'][0x6]=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<LUK:[ ](\d+)>/i))_0x378ea1['params'][0x7]=Number(RegExp['$1']);if(_0x344ca0['match'](/<EXP:[ ](\d+)>/i))_0x378ea1['exp']=Number(RegExp['$1']);if(_0x344ca0[_0x526dc9(0x78d)](/<GOLD:[ ](\d+)>/i))_0x378ea1[_0x526dc9(0x7c8)]=Number(RegExp['$1']);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x323)]=Graphics[_0x526668(0x938)],Graphics[_0x526668(0x938)]=function(){const _0x4539e0=_0x526668;switch(VisuMZ[_0x4539e0(0x6a7)][_0x4539e0(0x7c3)]['QoL'][_0x4539e0(0x40e)]){case'stretch':return!![];case _0x4539e0(0xa36):return![];default:return VisuMZ[_0x4539e0(0x6a7)][_0x4539e0(0x323)][_0x4539e0(0x5f4)](this);}},VisuMZ['CoreEngine'][_0x526668(0x9dd)]=Graphics['printError'],Graphics['printError']=function(_0x48218a,_0x58da63,_0x556371=null){const _0x20bdd5=_0x526668;VisuMZ[_0x20bdd5(0x6a7)][_0x20bdd5(0x9dd)]['call'](this,_0x48218a,_0x58da63,_0x556371),VisuMZ[_0x20bdd5(0x7c5)](![]);},VisuMZ['CoreEngine'][_0x526668(0x295)]=Graphics[_0x526668(0x27b)],Graphics[_0x526668(0x27b)]=function(_0x1d1e0f){const _0x3008b7=_0x526668;VisuMZ[_0x3008b7(0x6a7)][_0x3008b7(0x295)][_0x3008b7(0x5f4)](this,_0x1d1e0f),this[_0x3008b7(0xa20)](_0x1d1e0f);},Graphics[_0x526668(0xa20)]=function(_0xac1a16){const _0x3196a4=_0x526668;VisuMZ[_0x3196a4(0x6a7)]['Settings'][_0x3196a4(0x622)][_0x3196a4(0x8c3)]&&(_0xac1a16['style'][_0x3196a4(0x5a2)]='none');if(VisuMZ[_0x3196a4(0x6a7)]['Settings']['QoL'][_0x3196a4(0x967)]){if(_0x3196a4(0x715)!==_0x3196a4(0x50d))_0xac1a16[_0x3196a4(0x86b)][_0x3196a4(0x7fe)]='pixelated';else{const _0x3ea38=_0x39e198('fs');let _0x86bdec=_0x3196a4(0x61e)[_0x3196a4(0xa0a)](_0x11dfff||'0');_0x3ea38[_0x3196a4(0x366)](_0x86bdec,_0x294d89,_0x5a358b=>{const _0x10ff9c=_0x3196a4;if(_0x5a358b)throw _0x1440af;else _0x3b1950&&_0x4769c9(_0x10ff9c(0x46f)[_0x10ff9c(0xa0a)](_0x86bdec));});}}const _0x2bf2c1=Math[_0x3196a4(0x431)](0x0,Math[_0x3196a4(0x749)](_0xac1a16[_0x3196a4(0x745)]*this['_realScale'])),_0x287ad0=Math[_0x3196a4(0x431)](0x0,Math[_0x3196a4(0x749)](_0xac1a16[_0x3196a4(0x36a)]*this[_0x3196a4(0x86d)]));_0xac1a16['style'][_0x3196a4(0x745)]=_0x2bf2c1+'px',_0xac1a16['style'][_0x3196a4(0x36a)]=_0x287ad0+'px';},VisuMZ[_0x526668(0x6a7)]['Bitmap_initialize']=Bitmap[_0x526668(0x4aa)]['initialize'],Bitmap[_0x526668(0x4aa)][_0x526668(0x96f)]=function(_0x5b27e2,_0x41efc9){const _0x138af7=_0x526668;VisuMZ[_0x138af7(0x6a7)][_0x138af7(0x979)][_0x138af7(0x5f4)](this,_0x5b27e2,_0x41efc9),this[_0x138af7(0x8b2)]=!(VisuMZ[_0x138af7(0x6a7)][_0x138af7(0x7c3)][_0x138af7(0x622)][_0x138af7(0x967)]??!![]);},Bitmap['prototype']['markCoreEngineModified']=function(){this['_customModified']=!![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x8bf)]=Sprite[_0x526668(0x4aa)]['destroy'],Sprite[_0x526668(0x4aa)][_0x526668(0x93a)]=function(){const _0x1ebc75=_0x526668;VisuMZ['CoreEngine']['Sprite_destroy'][_0x1ebc75(0x5f4)](this),this[_0x1ebc75(0x7e7)]();},Sprite[_0x526668(0x4aa)][_0x526668(0x7e7)]=function(){const _0x39ea21=_0x526668;if(!this[_0x39ea21(0xa29)])return;if(!this[_0x39ea21(0xa29)][_0x39ea21(0x985)])return;this['bitmap'][_0x39ea21(0x25c)]&&!this[_0x39ea21(0x85b)]['_baseTexture'][_0x39ea21(0x2c7)]&&this[_0x39ea21(0xa29)][_0x39ea21(0x93a)]();},VisuMZ[_0x526668(0x6a7)]['Bitmap_resize']=Bitmap[_0x526668(0x4aa)][_0x526668(0x400)],Bitmap['prototype'][_0x526668(0x400)]=function(_0x24f839,_0x481c56){const _0x5251a5=_0x526668;VisuMZ[_0x5251a5(0x6a7)][_0x5251a5(0x932)]['call'](this,_0x24f839,_0x481c56),this[_0x5251a5(0xa16)]();},VisuMZ['CoreEngine'][_0x526668(0x42c)]=Bitmap[_0x526668(0x4aa)][_0x526668(0x484)],Bitmap[_0x526668(0x4aa)][_0x526668(0x484)]=function(_0x5550b7,_0xf15a4e,_0x54cac4,_0x548826,_0x579695,_0x22b163,_0x1a5171,_0x46d6c1,_0x2b3b88){const _0x51c27d=_0x526668;_0xf15a4e=Math[_0x51c27d(0x746)](_0xf15a4e),_0x54cac4=Math[_0x51c27d(0x746)](_0x54cac4),_0x548826=Math[_0x51c27d(0x746)](_0x548826),_0x579695=Math[_0x51c27d(0x746)](_0x579695),_0x22b163=Math['round'](_0x22b163),_0x1a5171=Math['round'](_0x1a5171),VisuMZ[_0x51c27d(0x6a7)]['Bitmap_blt']['call'](this,_0x5550b7,_0xf15a4e,_0x54cac4,_0x548826,_0x579695,_0x22b163,_0x1a5171,_0x46d6c1,_0x2b3b88),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x526668(0x311)]=Bitmap[_0x526668(0x4aa)][_0x526668(0x65d)],Bitmap[_0x526668(0x4aa)][_0x526668(0x65d)]=function(_0x1cbdaa,_0x5139a2,_0x2e1ef8,_0x2c2c43){const _0x4f61b9=_0x526668;VisuMZ[_0x4f61b9(0x6a7)][_0x4f61b9(0x311)][_0x4f61b9(0x5f4)](this,_0x1cbdaa,_0x5139a2,_0x2e1ef8,_0x2c2c43),this[_0x4f61b9(0xa16)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x897)]=Bitmap[_0x526668(0x4aa)][_0x526668(0x9c9)],Bitmap[_0x526668(0x4aa)][_0x526668(0x9c9)]=function(_0x317aa0,_0x4cec05,_0x1bfe7,_0x48e37d,_0x4e65cd){const _0x3a8d74=_0x526668;VisuMZ[_0x3a8d74(0x6a7)][_0x3a8d74(0x897)][_0x3a8d74(0x5f4)](this,_0x317aa0,_0x4cec05,_0x1bfe7,_0x48e37d,_0x4e65cd),this['markCoreEngineModified']();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x469)]=Bitmap[_0x526668(0x4aa)][_0x526668(0x2cd)],Bitmap[_0x526668(0x4aa)][_0x526668(0x2cd)]=function(_0x612102,_0x1e356c,_0x4f18d2,_0x449ef8,_0x2a8e95){const _0x14ad6e=_0x526668;VisuMZ[_0x14ad6e(0x6a7)]['Bitmap_strokeRect'][_0x14ad6e(0x5f4)](this,_0x612102,_0x1e356c,_0x4f18d2,_0x449ef8,_0x2a8e95),this[_0x14ad6e(0xa16)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x35f)]=Bitmap[_0x526668(0x4aa)]['gradientFillRect'],Bitmap[_0x526668(0x4aa)][_0x526668(0x829)]=function(_0x5495d3,_0x32bb61,_0x230091,_0x27b0e5,_0x21bde5,_0x1ecc1a,_0x58b703){const _0x3c471b=_0x526668;VisuMZ[_0x3c471b(0x6a7)][_0x3c471b(0x35f)][_0x3c471b(0x5f4)](this,_0x5495d3,_0x32bb61,_0x230091,_0x27b0e5,_0x21bde5,_0x1ecc1a,_0x58b703),this[_0x3c471b(0xa16)]();},VisuMZ['CoreEngine'][_0x526668(0x629)]=Bitmap[_0x526668(0x4aa)][_0x526668(0x880)],Bitmap[_0x526668(0x4aa)]['drawCircle']=function(_0x26bd98,_0x450fba,_0x1d396c,_0x1c63fd){const _0x24c1b2=_0x526668;_0x26bd98=Math[_0x24c1b2(0x746)](_0x26bd98),_0x450fba=Math['round'](_0x450fba),_0x1d396c=Math[_0x24c1b2(0x746)](_0x1d396c),VisuMZ['CoreEngine']['Bitmap_drawCircle'][_0x24c1b2(0x5f4)](this,_0x26bd98,_0x450fba,_0x1d396c,_0x1c63fd),this[_0x24c1b2(0xa16)]();},VisuMZ[_0x526668(0x6a7)]['Bitmap_measureTextWidth']=Bitmap[_0x526668(0x4aa)][_0x526668(0x315)],Bitmap[_0x526668(0x4aa)][_0x526668(0x315)]=function(_0xcee822){const _0x588624=_0x526668;return Math[_0x588624(0x5cb)](VisuMZ[_0x588624(0x6a7)][_0x588624(0x44c)][_0x588624(0x5f4)](this,_0xcee822));},VisuMZ['CoreEngine'][_0x526668(0x44a)]=Bitmap[_0x526668(0x4aa)]['drawText'],Bitmap[_0x526668(0x4aa)][_0x526668(0x714)]=function(_0x2b06f3,_0x3b862c,_0x5839aa,_0x37a67e,_0x510741,_0x4b604d){const _0x4358b0=_0x526668;_0x3b862c=Math['round'](_0x3b862c),_0x5839aa=Math[_0x4358b0(0x746)](_0x5839aa),_0x37a67e=Math[_0x4358b0(0x746)](_0x37a67e),_0x510741=Math['round'](_0x510741),VisuMZ['CoreEngine'][_0x4358b0(0x44a)][_0x4358b0(0x5f4)](this,_0x2b06f3,_0x3b862c,_0x5839aa,_0x37a67e,_0x510741,_0x4b604d),this[_0x4358b0(0xa16)]();},VisuMZ[_0x526668(0x6a7)]['Bitmap_drawTextOutline']=Bitmap['prototype']['_drawTextOutline'],Bitmap[_0x526668(0x4aa)]['_drawTextOutline']=function(_0x14f88a,_0x2f9bb3,_0x2926cd,_0x2b9245){const _0x51edf0=_0x526668;if(VisuMZ['CoreEngine']['Settings']['QoL'][_0x51edf0(0x6dc)]){if(_0x51edf0(0x911)!==_0x51edf0(0x7bc))this[_0x51edf0(0x8fe)](_0x14f88a,_0x2f9bb3,_0x2926cd,_0x2b9245);else{this[_0x51edf0(0x5fc)]();const _0x52f81c=this[_0x51edf0(0x21f)];_0x8e917b[_0x51edf0(0x6a7)][_0x51edf0(0x65c)]['call'](this),_0x52f81c>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x51edf0(0x569)],this['_y']=this[_0x51edf0(0x79f)],this[_0x51edf0(0x28a)]=this[_0x51edf0(0x9d6)],this[_0x51edf0(0x4ea)]=this[_0x51edf0(0x8e6)],this[_0x51edf0(0x9d2)]=this[_0x51edf0(0x927)],this[_0x51edf0(0x291)]&&(this[_0x51edf0(0x291)]['x']=this['_targetAnchor']['x'],this[_0x51edf0(0x291)]['y']=this[_0x51edf0(0x742)]['y']));}}else VisuMZ[_0x51edf0(0x6a7)][_0x51edf0(0xa23)]['call'](this,_0x14f88a,_0x2f9bb3,_0x2926cd,_0x2b9245);},Bitmap[_0x526668(0x4aa)]['_drawTextShadow']=function(_0x2a87ee,_0x43a5a1,_0x47a2c4,_0x34a410){const _0x486683=_0x526668,_0x5628ab=this[_0x486683(0x283)];_0x5628ab['fillStyle']=this[_0x486683(0x56e)],_0x5628ab['fillText'](_0x2a87ee,_0x43a5a1+0x2,_0x47a2c4+0x2,_0x34a410);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x271)]=Input['clear'],Input[_0x526668(0x56a)]=function(){const _0x344eab=_0x526668;VisuMZ['CoreEngine'][_0x344eab(0x271)][_0x344eab(0x5f4)](this),this[_0x344eab(0x9f9)]=undefined,this[_0x344eab(0x5d5)]=undefined,this['_gamepadWait']=Input[_0x344eab(0x3b4)];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3b8)]=Input[_0x526668(0x894)],Input[_0x526668(0x894)]=function(){const _0x6be312=_0x526668;VisuMZ[_0x6be312(0x6a7)][_0x6be312(0x3b8)][_0x6be312(0x5f4)](this);if(this[_0x6be312(0x500)])this[_0x6be312(0x500)]--;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3a6)]=Input[_0x526668(0x847)],Input['_pollGamepads']=function(){const _0x33668f=_0x526668;if(this[_0x33668f(0x500)])return;VisuMZ[_0x33668f(0x6a7)][_0x33668f(0x3a6)][_0x33668f(0x5f4)](this);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x609)]=Input[_0x526668(0x23a)],Input[_0x526668(0x23a)]=function(){const _0x26afd6=_0x526668;VisuMZ[_0x26afd6(0x6a7)][_0x26afd6(0x609)][_0x26afd6(0x5f4)](this),document[_0x26afd6(0x793)]('keypress',this['_onKeyPress']['bind'](this));},VisuMZ['CoreEngine']['Input_onKeyDown']=Input[_0x526668(0x828)],Input[_0x526668(0x828)]=function(_0xfde69){const _0x442222=_0x526668;this['_inputSpecialKeyCode']=_0xfde69[_0x442222(0x4cc)],VisuMZ[_0x442222(0x6a7)]['Input_onKeyDown'][_0x442222(0x5f4)](this,_0xfde69);},Input[_0x526668(0x351)]=function(_0xf91601){this['_registerKeyInput'](_0xf91601);},Input[_0x526668(0x9f7)]=function(_0x399807){const _0x31054d=_0x526668;this[_0x31054d(0x5d5)]=_0x399807[_0x31054d(0x4cc)];let _0x5817f4=String[_0x31054d(0x9ed)](_0x399807['charCode']);this[_0x31054d(0x9f9)]===undefined?this[_0x31054d(0x9f9)]=_0x5817f4:this[_0x31054d(0x9f9)]+=_0x5817f4;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x1fe)]=Input[_0x526668(0x7d8)],Input[_0x526668(0x7d8)]=function(_0x703794){const _0x4ac10e=_0x526668;if(_0x703794===0x8)return![];return VisuMZ[_0x4ac10e(0x6a7)]['Input_shouldPreventDefault']['call'](this,_0x703794);},Input['isSpecialCode']=function(_0x5f3c8c){const _0x3218f5=_0x526668;if(_0x5f3c8c[_0x3218f5(0x78d)](/backspace/i))return this[_0x3218f5(0x5d5)]===0x8;if(_0x5f3c8c[_0x3218f5(0x78d)](/enter/i))return this[_0x3218f5(0x5d5)]===0xd;if(_0x5f3c8c[_0x3218f5(0x78d)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input['isNumpadPressed']=function(){const _0x3f910c=_0x526668;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x3f910c(0x2fe)](this['_inputSpecialKeyCode']);},Input['isArrowPressed']=function(){const _0x3a86e8=_0x526668;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3a86e8(0x5d5)]);},Input[_0x526668(0x2e3)]=function(){const _0x20b931=_0x526668;if(navigator[_0x20b931(0x452)]){if('njQvj'!=='JJZOx'){const _0x32b532=navigator[_0x20b931(0x452)]();if(_0x32b532){if(_0x20b931(0x59e)==='pwKZU')for(const _0x2401da of _0x32b532){if(_0x2401da&&_0x2401da[_0x20b931(0xa10)])return!![];}else _0x20165c=_0x3effdc[_0x20b931(0x746)](_0x24cffc),_0x132162=_0x1c62c6['round'](_0x22f618),_0x33ba4c=_0x36783c[_0x20b931(0x746)](_0x19ac11),_0x4cb6df=_0x9e9794[_0x20b931(0x746)](_0x42b8bc),_0x2caeb3=_0x7fb3a8[_0x20b931(0x746)](_0x128ce2),_0xea18c7=_0x120bbf[_0x20b931(0x746)](_0x696c3f),_0x529350[_0x20b931(0x6a7)]['Bitmap_blt'][_0x20b931(0x5f4)](this,_0x369993,_0x15f69a,_0x446c50,_0x198181,_0x42b6e9,_0x559c1a,_0x2ee7c0,_0x29801d,_0x44d527),this[_0x20b931(0xa16)]();}}else{const _0x2b9760=this[_0x20b931(0x326)][_0x20b931(0x588)][_0x20b931(0x486)](new _0x20f2a7(0x0,0x0)),_0x304117=this['_clientArea'][_0x20b931(0x39a)];_0x304117['x']=_0x2b9760['x']+this['origin']['x'],_0x304117['y']=_0x2b9760['y']+this['origin']['y'],_0x304117[_0x20b931(0x745)]=_0x17670c['ceil'](this[_0x20b931(0x96c)]*this[_0x20b931(0x766)]['x']),_0x304117[_0x20b931(0x36a)]=_0x1e5d21['ceil'](this[_0x20b931(0x2c8)]*this['scale']['y']);}}return![];},Input[_0x526668(0x73a)]=function(){const _0x8d4605=_0x526668;if(navigator[_0x8d4605(0x452)]){if(_0x8d4605(0x3d6)!==_0x8d4605(0x3d6)){_0x92db50=_0x26930d(_0x327436||'')[_0x8d4605(0x4b5)]();const _0xbc3ee7=_0x1549d6[_0x8d4605(0x6a7)][_0x8d4605(0x7c3)][_0x8d4605(0x81d)];if(_0x4717cf==='MAXHP')return _0x44cf75[_0x8d4605(0x437)][_0x8d4605(0x56f)][0x0];if(_0x32bf5f===_0x8d4605(0x54f))return _0xe61918[_0x8d4605(0x437)][_0x8d4605(0x56f)][0x1];if(_0x4f0912===_0x8d4605(0x840))return _0x5ddd0f[_0x8d4605(0x437)][_0x8d4605(0x56f)][0x2];if(_0x35ee66===_0x8d4605(0x8c5))return _0x3cd965[_0x8d4605(0x437)][_0x8d4605(0x56f)][0x3];if(_0xcc1f4c===_0x8d4605(0x8e9))return _0x1ff501['terms'][_0x8d4605(0x56f)][0x4];if(_0x428c29===_0x8d4605(0x2fc))return _0x5e15ff[_0x8d4605(0x437)]['params'][0x5];if(_0x277761===_0x8d4605(0x6c1))return _0x5e5975[_0x8d4605(0x437)][_0x8d4605(0x56f)][0x6];if(_0x30d5b4===_0x8d4605(0x59f))return _0x33711b['terms']['params'][0x7];if(_0x5d1fa1===_0x8d4605(0x543))return _0xbc3ee7[_0x8d4605(0x1ff)];if(_0x4818a9===_0x8d4605(0x7ef))return _0xbc3ee7[_0x8d4605(0x453)];if(_0x59df35==='CRI')return _0xbc3ee7['XParamVocab2'];if(_0x5ab785===_0x8d4605(0x51a))return _0xbc3ee7['XParamVocab3'];if(_0x239be1===_0x8d4605(0x643))return _0xbc3ee7[_0x8d4605(0x97c)];if(_0x2a9b6b===_0x8d4605(0x325))return _0xbc3ee7[_0x8d4605(0x77b)];if(_0x3c8723===_0x8d4605(0x95f))return _0xbc3ee7[_0x8d4605(0x3eb)];if(_0x116769===_0x8d4605(0x734))return _0xbc3ee7[_0x8d4605(0xa28)];if(_0x5c4a11===_0x8d4605(0x5ab))return _0xbc3ee7[_0x8d4605(0x755)];if(_0x96d3b8===_0x8d4605(0x61f))return _0xbc3ee7[_0x8d4605(0x2aa)];if(_0x5738ad==='TGR')return _0xbc3ee7['SParamVocab0'];if(_0x27968c===_0x8d4605(0x92c))return _0xbc3ee7['SParamVocab1'];if(_0x444c0e==='REC')return _0xbc3ee7['SParamVocab2'];if(_0x48498f===_0x8d4605(0x839))return _0xbc3ee7[_0x8d4605(0x49a)];if(_0x29433b===_0x8d4605(0x4bd))return _0xbc3ee7[_0x8d4605(0x614)];if(_0x5d03e7===_0x8d4605(0x80e))return _0xbc3ee7['SParamVocab5'];if(_0x1b742c==='PDR')return _0xbc3ee7[_0x8d4605(0x574)];if(_0x197c49===_0x8d4605(0x92a))return _0xbc3ee7[_0x8d4605(0x94f)];if(_0x362c81===_0x8d4605(0x33a))return _0xbc3ee7[_0x8d4605(0x44d)];if(_0x14a68a===_0x8d4605(0x998))return _0xbc3ee7[_0x8d4605(0x6c7)];if(_0x1a22c1['CoreEngine'][_0x8d4605(0x6e0)][_0x3e434a])return _0x4b0752[_0x8d4605(0x6a7)][_0x8d4605(0x6e0)][_0x3279a5];return'';}else{const _0x44a56d=navigator[_0x8d4605(0x452)]();if(_0x44a56d){if(_0x8d4605(0x757)!==_0x8d4605(0x757)){var _0x41d345=_0x1c4a61(_0x219048['$1']);try{_0x576802=_0x11aca5[_0x8d4605(0x431)](_0x2b165c,_0x20b51d(_0x451883(_0x41d345)));}catch(_0x13d298){if(_0x27a5aa['isPlaytest']())_0x2c8a22[_0x8d4605(0x642)](_0x13d298);}}else for(const _0x5a0958 of _0x44a56d){if(_0x5a0958&&_0x5a0958[_0x8d4605(0xa10)]){if(_0x8d4605(0xa25)!=='tcZIX'){if(this[_0x8d4605(0x8ed)](_0x5a0958))return!![];}else _0x292e1b['CoreEngine'][_0x8d4605(0x7d3)][_0x8d4605(0x5f4)](this,_0x1295ef);}}}}}return![];},Input[_0x526668(0x8ed)]=function(_0x49e5ba){const _0x350c06=_0x526668,_0x46d721=_0x49e5ba[_0x350c06(0x8be)];for(let _0x4c515b=0x0;_0x4c515b<_0x46d721[_0x350c06(0x5f3)];_0x4c515b++){if(_0x46d721[_0x4c515b]['pressed'])return!![];}return![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x7f1)]=Tilemap['prototype'][_0x526668(0x45c)],Tilemap[_0x526668(0x4aa)][_0x526668(0x45c)]=function(_0x4cfe81,_0x1a3b31,_0x3cd0e0,_0x5089b3){const _0x3a2e3c=_0x526668;if($gameMap&&$gameMap[_0x3a2e3c(0x276)]())return;VisuMZ[_0x3a2e3c(0x6a7)]['Tilemap_addShadow'][_0x3a2e3c(0x5f4)](this,_0x4cfe81,_0x1a3b31,_0x3cd0e0,_0x5089b3);},Tilemap[_0x526668(0x4b0)][_0x526668(0x4aa)][_0x526668(0x93d)]=function(){const _0x1daec7=_0x526668;this[_0x1daec7(0x91a)]();for(let _0x10accf=0x0;_0x10accf<Tilemap[_0x1daec7(0x8fa)][_0x1daec7(0x77c)];_0x10accf++){if('haQNw'==='zEbCq'){_0x597a70[_0x1daec7(0xa38)]!==0x0?(_0x21ab10['bgmVolume']=0x0,_0x5847a9[_0x1daec7(0x656)]=0x0,_0x444f24[_0x1daec7(0x929)]=0x0,_0x5aafe0[_0x1daec7(0xa38)]=0x0):(_0x159285[_0x1daec7(0x7eb)]=0x64,_0x3b0480[_0x1daec7(0x656)]=0x64,_0x282ac3[_0x1daec7(0x929)]=0x64,_0x293ff2[_0x1daec7(0xa38)]=0x64);_0x27918c[_0x1daec7(0x427)]();if(this[_0x1daec7(0x807)][_0x1daec7(0x330)]===_0xe41d29){if(this[_0x1daec7(0x807)]['_optionsWindow'])this[_0x1daec7(0x807)][_0x1daec7(0x8e0)][_0x1daec7(0x7f0)]();if(this[_0x1daec7(0x807)]['_listWindow'])this[_0x1daec7(0x807)][_0x1daec7(0x27d)]['refresh']();}}else{const _0x33fd40=new PIXI[(_0x1daec7(0x55c))]();_0x33fd40[_0x1daec7(0xa27)](0x800,0x800),VisuMZ[_0x1daec7(0x6a7)]['Settings'][_0x1daec7(0x622)]['PixelateImageRendering']&&('HTiQH'!==_0x1daec7(0x4a4)?_0x33fd40[_0x1daec7(0x259)]=PIXI['SCALE_MODES'][_0x1daec7(0x6fe)]:_0x2e3ffa=_0x37f86a['concat'](_0x22f057)),this[_0x1daec7(0x660)][_0x1daec7(0x3ec)](_0x33fd40);}}},WindowLayer[_0x526668(0x4aa)]['isMaskingEnabled']=function(){const _0x38babe=_0x526668;if(SceneManager&&SceneManager[_0x38babe(0x807)]){if('kHkrc'===_0x38babe(0x790))return;else return SceneManager[_0x38babe(0x807)][_0x38babe(0x7d6)]();}else return!![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x414)]=WindowLayer[_0x526668(0x4aa)][_0x526668(0x389)],WindowLayer[_0x526668(0x4aa)][_0x526668(0x389)]=function render(_0x49927b){const _0x239dc1=_0x526668;this[_0x239dc1(0x211)]()?VisuMZ['CoreEngine'][_0x239dc1(0x414)][_0x239dc1(0x5f4)](this,_0x49927b):'YdBhH'===_0x239dc1(0x3cb)?this[_0x239dc1(0x72a)](_0x49927b):this[_0x239dc1(0x913)]((_0x4958ed+_0x246497)%_0x6ce933);},WindowLayer['prototype'][_0x526668(0x72a)]=function render(_0x1d03b2){const _0x2e5b5e=_0x526668;if(!this['visible'])return;const _0x1d2863=new PIXI['Graphics'](),_0x5c9f16=_0x1d03b2['gl'],_0x16a15c=this['children']['clone']();_0x1d03b2[_0x2e5b5e(0x5c2)][_0x2e5b5e(0x237)](),_0x1d2863[_0x2e5b5e(0x28d)]=this[_0x2e5b5e(0x28d)],_0x1d03b2['batch'][_0x2e5b5e(0x2c5)](),_0x5c9f16[_0x2e5b5e(0x7a5)](_0x5c9f16[_0x2e5b5e(0x59c)]);while(_0x16a15c[_0x2e5b5e(0x5f3)]>0x0){const _0x485c02=_0x16a15c[_0x2e5b5e(0x5c0)]();_0x485c02[_0x2e5b5e(0x93b)]&&_0x485c02[_0x2e5b5e(0x2bc)]&&_0x485c02[_0x2e5b5e(0x7e2)]>0x0&&(_0x2e5b5e(0x233)!==_0x2e5b5e(0x233)?this[_0x2e5b5e(0x5be)]():(_0x5c9f16[_0x2e5b5e(0x9ad)](_0x5c9f16[_0x2e5b5e(0x68f)],0x0,~0x0),_0x5c9f16[_0x2e5b5e(0x770)](_0x5c9f16[_0x2e5b5e(0x6cf)],_0x5c9f16[_0x2e5b5e(0x6cf)],_0x5c9f16[_0x2e5b5e(0x6cf)]),_0x485c02['render'](_0x1d03b2),_0x1d03b2[_0x2e5b5e(0x5ce)]['flush'](),_0x1d2863[_0x2e5b5e(0x56a)](),_0x5c9f16[_0x2e5b5e(0x9ad)](_0x5c9f16[_0x2e5b5e(0x7c9)],0x1,~0x0),_0x5c9f16['stencilOp'](_0x5c9f16[_0x2e5b5e(0x9fb)],_0x5c9f16[_0x2e5b5e(0x9fb)],_0x5c9f16[_0x2e5b5e(0x9fb)]),_0x5c9f16[_0x2e5b5e(0x5b7)](_0x5c9f16[_0x2e5b5e(0x7ee)],_0x5c9f16[_0x2e5b5e(0x761)]),_0x1d2863[_0x2e5b5e(0x389)](_0x1d03b2),_0x1d03b2[_0x2e5b5e(0x5ce)][_0x2e5b5e(0x2c5)](),_0x5c9f16[_0x2e5b5e(0x5b7)](_0x5c9f16[_0x2e5b5e(0x761)],_0x5c9f16[_0x2e5b5e(0xa1e)])));}_0x5c9f16[_0x2e5b5e(0x7a6)](_0x5c9f16[_0x2e5b5e(0x59c)]),_0x5c9f16[_0x2e5b5e(0x56a)](_0x5c9f16[_0x2e5b5e(0x9b3)]),_0x5c9f16[_0x2e5b5e(0x7b2)](0x0),_0x1d03b2[_0x2e5b5e(0x5ce)][_0x2e5b5e(0x2c5)]();for(const _0x4a8cc7 of this[_0x2e5b5e(0x7cd)]){!_0x4a8cc7[_0x2e5b5e(0x93b)]&&_0x4a8cc7[_0x2e5b5e(0x2bc)]&&(_0x2e5b5e(0x75f)==='nAFpg'?_0x2c9b43['CoreEngine'][_0x2e5b5e(0x7c3)][_0x2e5b5e(0x41e)][_0x2e5b5e(0x5c3)][_0x2e5b5e(0x650)]['call'](this):_0x4a8cc7['render'](_0x1d03b2));}_0x1d03b2['batch'][_0x2e5b5e(0x2c5)]();},DataManager[_0x526668(0x3d8)]=function(_0x15272f){const _0x939618=_0x526668;return this['isItem'](_0x15272f)&&_0x15272f[_0x939618(0x893)]===0x2;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x9db)]=DataManager[_0x526668(0x34d)],DataManager[_0x526668(0x34d)]=function(){const _0x56c8de=_0x526668;VisuMZ[_0x56c8de(0x6a7)][_0x56c8de(0x9db)][_0x56c8de(0x5f4)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x56c8de(0x207)]();},DataManager[_0x526668(0x3de)]=function(){const _0x45a952=_0x526668;if($gameTemp[_0x45a952(0x767)]()){if('MHIbP'!=='MHIbP')return _0x4381ed['CoreEngine'][_0x45a952(0x5ff)][_0x45a952(0x5f4)](this);else{const _0x39f846=VisuMZ[_0x45a952(0x6a7)][_0x45a952(0x7c3)][_0x45a952(0x622)]['NewGameCommonEvent'];if(_0x39f846>0x0)$gameTemp[_0x45a952(0x2b8)](_0x39f846);}}},DataManager[_0x526668(0x207)]=function(){const _0x56d282=_0x526668,_0x1d0527=VisuMZ[_0x56d282(0x6a7)][_0x56d282(0x7c3)][_0x56d282(0x622)][_0x56d282(0x778)]||0x0;if(_0x1d0527>0x0)$gameTemp[_0x56d282(0x2b8)](_0x1d0527);},DataManager[_0x526668(0x3c8)]=function(_0x3f41ed){const _0x4024b0=_0x526668,_0x318830=$dataTroops[_0x3f41ed];if(!_0x318830)return'';let _0x3cc4e9='';_0x3cc4e9+=_0x318830['name'];for(const _0x3ee5bc of _0x318830[_0x4024b0(0x64a)]){for(const _0x41796b of _0x3ee5bc[_0x4024b0(0x9ae)]){[0x6c,0x198][_0x4024b0(0x666)](_0x41796b['code'])&&(_0x3cc4e9+='\x0a',_0x3cc4e9+=_0x41796b[_0x4024b0(0x4f0)][0x0]);}}return _0x3cc4e9;};(VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x622)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x526668(0x6a7)]['Scene_Base_create']=Scene_Base[_0x526668(0x4aa)]['create'],Scene_Base['prototype']['create']=function(){const _0x1e0949=_0x526668;VisuMZ[_0x1e0949(0x6a7)][_0x1e0949(0x917)][_0x1e0949(0x5f4)](this),$scene=this;},$spriteset=null,VisuMZ[_0x526668(0x6a7)]['Scene_Map_createSpriteset']=Scene_Map['prototype'][_0x526668(0x903)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x903)]=function(){const _0x19ce93=_0x526668;VisuMZ[_0x19ce93(0x6a7)][_0x19ce93(0x20b)]['call'](this),$spriteset=this[_0x19ce93(0x696)];},VisuMZ['CoreEngine'][_0x526668(0x5ef)]=Scene_Battle[_0x526668(0x4aa)][_0x526668(0x903)],Scene_Battle['prototype'][_0x526668(0x903)]=function(){const _0x40d610=_0x526668;VisuMZ[_0x40d610(0x6a7)][_0x40d610(0x5ef)]['call'](this),$spriteset=this[_0x40d610(0x696)];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x98a)]=Scene_Base[_0x526668(0x4aa)][_0x526668(0x971)],Scene_Base[_0x526668(0x4aa)][_0x526668(0x971)]=function(){const _0x5c74d5=_0x526668;VisuMZ[_0x5c74d5(0x6a7)][_0x5c74d5(0x98a)][_0x5c74d5(0x5f4)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x526668(0x6a7)]['BattleManager_update']=BattleManager[_0x526668(0x894)],BattleManager[_0x526668(0x894)]=function(_0x365cc7){const _0x266654=_0x526668;VisuMZ[_0x266654(0x6a7)][_0x266654(0x968)][_0x266654(0x5f4)](this,_0x365cc7),$subject=this['_subject'],$targets=this['_targets'],$target=this[_0x266654(0x8dd)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x526668(0x6a7)][_0x526668(0x7fa)]=Game_Event[_0x526668(0x4aa)][_0x526668(0x264)],Game_Event[_0x526668(0x4aa)][_0x526668(0x264)]=function(){const _0x18fcd4=_0x526668;VisuMZ['CoreEngine'][_0x18fcd4(0x7fa)][_0x18fcd4(0x5f4)](this),$event=this;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x466)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x894)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x296601=_0x526668;VisuMZ[_0x296601(0x6a7)][_0x296601(0x466)][_0x296601(0x5f4)](this),$gameMap[_0x296601(0x3ad)]();},Game_Map[_0x526668(0x4aa)][_0x526668(0x3ad)]=function(){const _0x2c54d7=_0x526668;!this[_0x2c54d7(0x430)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x5b84e2){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x5b84e2);},$onceParallel=function(_0x3ab64a){const _0x8543eb=_0x526668;if(SceneManager[_0x8543eb(0x3e8)]()){if(_0x8543eb(0x66f)!=='aTQNR')$scene[_0x8543eb(0x7be)](_0x3ab64a);else{this[_0x8543eb(0x279)]();const _0x4a6dc2=_0x1dba13[_0x8543eb(0x898)][_0x8543eb(0x7af)],_0x191109=this[_0x8543eb(0x84d)]();this[_0x8543eb(0x409)]=new _0x596806(_0x191109),this[_0x8543eb(0x409)]['setBackgroundType'](_0x4a6dc2);const _0x22aee4=this[_0x8543eb(0x84d)]();this[_0x8543eb(0x409)]['move'](_0x22aee4['x'],_0x22aee4['y'],_0x22aee4['width'],_0x22aee4[_0x8543eb(0x36a)]),this['addWindow'](this[_0x8543eb(0x409)]);}}else{if(SceneManager[_0x8543eb(0x361)]()){if('nynyk'===_0x8543eb(0x388))return _0x2a0364[_0x8543eb(0x298)][_0x8543eb(0x63d)][_0x8543eb(0x5f4)](this);else{if(Imported['VisuMZ_1_BattleCore'])$scene[_0x8543eb(0x7be)](_0x3ab64a);else $gameTemp&&$gameTemp[_0x8543eb(0x767)]()&&alert(_0x8543eb(0x4ab));}}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x8543eb(0x31e));}});;StorageManager[_0x526668(0x712)]=function(_0x148173){return new Promise((_0x3290a3,_0x48c981)=>{const _0x822c07=_0x5eef;try{if('pCbfW'!=='KmeNi'){const _0x5ea472=pako['deflate'](_0x148173,{'to':_0x822c07(0x43c),'level':0x1});if(_0x5ea472[_0x822c07(0x5f3)]>=0xc350){}_0x3290a3(_0x5ea472);}else this[_0x822c07(0x8bc)]['y']=_0x3cbc33['boxHeight']-this[_0x822c07(0x507)]();}catch(_0x34f186){'lxInF'!==_0x822c07(0x872)?(this[_0x822c07(0x2bc)]=![],this[_0x822c07(0x494)]=0x0,this['x']=_0x3c2697['width']*0xa,this['y']=_0x8091a2['height']*0xa):_0x48c981(_0x34f186);}});},TextManager[_0x526668(0x220)]=['','','','CANCEL','','',_0x526668(0x94e),'','BACKSPACE','TAB','','',_0x526668(0x7e8),_0x526668(0x97e),'ENTER_SPECIAL','','SHIFT','CTRL',_0x526668(0x37c),_0x526668(0x6e5),_0x526668(0x812),_0x526668(0x2b3),_0x526668(0x432),_0x526668(0xa2d),'FINAL',_0x526668(0x5db),'',_0x526668(0x20e),_0x526668(0x722),_0x526668(0x9e0),_0x526668(0x6e4),_0x526668(0x9c5),_0x526668(0x22b),_0x526668(0x681),_0x526668(0x51c),_0x526668(0x3f1),_0x526668(0x762),_0x526668(0x3cc),'UP',_0x526668(0x2e8),_0x526668(0x47f),'SELECT',_0x526668(0x376),_0x526668(0x6eb),_0x526668(0x7f6),_0x526668(0x97f),_0x526668(0x886),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x526668(0x3b2),_0x526668(0x47b),_0x526668(0x447),_0x526668(0x378),_0x526668(0x467),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x526668(0x8f9),'','CONTEXT_MENU','',_0x526668(0x799),_0x526668(0xa17),'NUMPAD1',_0x526668(0x6ee),_0x526668(0x8e4),_0x526668(0x849),_0x526668(0x4da),_0x526668(0x8ab),_0x526668(0x3be),_0x526668(0x575),_0x526668(0x2bd),_0x526668(0x2f3),_0x526668(0x89f),_0x526668(0x36e),_0x526668(0x973),'DECIMAL','DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0x526668(0x785),'F13',_0x526668(0x693),'F15','F16',_0x526668(0x2c2),_0x526668(0x560),_0x526668(0x7fc),_0x526668(0x3d5),_0x526668(0x796),'F22',_0x526668(0x392),_0x526668(0x546),'','','','','','','','',_0x526668(0x9c8),_0x526668(0x7d5),_0x526668(0x7dd),'WIN_OEM_FJ_MASSHOU',_0x526668(0x70b),_0x526668(0x5d8),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x526668(0x519),_0x526668(0x477),_0x526668(0x64b),'HASH',_0x526668(0x5ad),_0x526668(0x82c),_0x526668(0x528),_0x526668(0x495),'OPEN_PAREN',_0x526668(0x7b9),_0x526668(0x92e),'PLUS',_0x526668(0x2a6),_0x526668(0x8f6),'OPEN_CURLY_BRACKET',_0x526668(0x633),'TILDE','','','','',_0x526668(0x368),_0x526668(0x7e0),_0x526668(0x339),'','',_0x526668(0x3b2),'EQUALS',_0x526668(0x905),'MINUS',_0x526668(0x736),_0x526668(0x4d3),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x526668(0x7dc),'BACK_SLASH',_0x526668(0x265),_0x526668(0x687),'',_0x526668(0x506),'ALTGR','',_0x526668(0x89d),_0x526668(0x2ed),'','WIN_ICO_CLEAR','','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x526668(0x772),_0x526668(0x73d),_0x526668(0x70e),_0x526668(0x626),_0x526668(0x79a),_0x526668(0x73b),_0x526668(0xa0f),'WIN_OEM_COPY',_0x526668(0x8c8),_0x526668(0x7e4),_0x526668(0x38f),_0x526668(0x294),_0x526668(0x434),_0x526668(0x48d),_0x526668(0x2b5),_0x526668(0x8c1),_0x526668(0x306),'','PA1',_0x526668(0x2df),''],TextManager[_0x526668(0x658)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)]['ButtonAssist'][_0x526668(0x9b6)],TextManager[_0x526668(0x4c6)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x680)][_0x526668(0x45a)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine']['Settings'][_0x526668(0x680)][_0x526668(0xa1b)],VisuMZ[_0x526668(0x6a7)][_0x526668(0x348)]=TextManager[_0x526668(0x613)],TextManager[_0x526668(0x613)]=function(_0x42179e){const _0x2f54e2=_0x526668;if(typeof _0x42179e===_0x2f54e2(0x347))return VisuMZ[_0x2f54e2(0x6a7)]['TextManager_param'][_0x2f54e2(0x5f4)](this,_0x42179e);else{if(_0x2f54e2(0x74f)===_0x2f54e2(0x74f))return this[_0x2f54e2(0xa19)](_0x42179e);else this['_closing']=![];}},TextManager['paramName']=function(_0x52c276){const _0x200113=_0x526668;_0x52c276=String(_0x52c276||'')[_0x200113(0x4b5)]();const _0x152416=VisuMZ['CoreEngine']['Settings'][_0x200113(0x81d)];if(_0x52c276===_0x200113(0x644))return $dataSystem['terms'][_0x200113(0x56f)][0x0];if(_0x52c276==='MAXMP')return $dataSystem[_0x200113(0x437)][_0x200113(0x56f)][0x1];if(_0x52c276===_0x200113(0x840))return $dataSystem[_0x200113(0x437)]['params'][0x2];if(_0x52c276===_0x200113(0x8c5))return $dataSystem[_0x200113(0x437)][_0x200113(0x56f)][0x3];if(_0x52c276===_0x200113(0x8e9))return $dataSystem[_0x200113(0x437)][_0x200113(0x56f)][0x4];if(_0x52c276===_0x200113(0x2fc))return $dataSystem['terms']['params'][0x5];if(_0x52c276===_0x200113(0x6c1))return $dataSystem[_0x200113(0x437)][_0x200113(0x56f)][0x6];if(_0x52c276==='LUK')return $dataSystem[_0x200113(0x437)]['params'][0x7];if(_0x52c276===_0x200113(0x543))return _0x152416[_0x200113(0x1ff)];if(_0x52c276===_0x200113(0x7ef))return _0x152416[_0x200113(0x453)];if(_0x52c276==='CRI')return _0x152416[_0x200113(0x586)];if(_0x52c276===_0x200113(0x51a))return _0x152416[_0x200113(0x864)];if(_0x52c276===_0x200113(0x643))return _0x152416['XParamVocab4'];if(_0x52c276===_0x200113(0x325))return _0x152416['XParamVocab5'];if(_0x52c276===_0x200113(0x95f))return _0x152416[_0x200113(0x3eb)];if(_0x52c276===_0x200113(0x734))return _0x152416['XParamVocab7'];if(_0x52c276==='MRG')return _0x152416[_0x200113(0x755)];if(_0x52c276===_0x200113(0x61f))return _0x152416[_0x200113(0x2aa)];if(_0x52c276===_0x200113(0x212))return _0x152416[_0x200113(0x566)];if(_0x52c276===_0x200113(0x92c))return _0x152416[_0x200113(0x33b)];if(_0x52c276===_0x200113(0x9e4))return _0x152416[_0x200113(0x4dd)];if(_0x52c276===_0x200113(0x839))return _0x152416['SParamVocab3'];if(_0x52c276===_0x200113(0x4bd))return _0x152416[_0x200113(0x614)];if(_0x52c276===_0x200113(0x80e))return _0x152416['SParamVocab5'];if(_0x52c276===_0x200113(0x7cc))return _0x152416[_0x200113(0x574)];if(_0x52c276===_0x200113(0x92a))return _0x152416[_0x200113(0x94f)];if(_0x52c276===_0x200113(0x33a))return _0x152416[_0x200113(0x44d)];if(_0x52c276===_0x200113(0x998))return _0x152416[_0x200113(0x6c7)];if(VisuMZ['CoreEngine'][_0x200113(0x6e0)][_0x52c276])return VisuMZ[_0x200113(0x6a7)][_0x200113(0x6e0)][_0x52c276];return'';},TextManager['getInputButtonString']=function(_0xc8989b){const _0x2f0ec3=_0x526668;if(_0xc8989b==='cancel')_0xc8989b='escape';let _0x3c3e4c=[];for(let _0x2be6d4 in Input[_0x2f0ec3(0x338)]){_0x2be6d4=Number(_0x2be6d4);if(_0x2be6d4>=0x60&&_0x2be6d4<=0x69)continue;if([0x12,0x20][_0x2f0ec3(0x666)](_0x2be6d4))continue;_0xc8989b===Input[_0x2f0ec3(0x338)][_0x2be6d4]&&('bABSk'!==_0x2f0ec3(0x2f7)?(_0x57e755[_0x2f0ec3(0x6a7)][_0x2f0ec3(0x959)][_0x2f0ec3(0x5f4)](this),_0x30fb4b[_0x2f0ec3(0x50c)]()&&this[_0x2f0ec3(0x3bf)]()):_0x3c3e4c[_0x2f0ec3(0x3ec)](_0x2be6d4));}for(let _0x4cf3a7=0x0;_0x4cf3a7<_0x3c3e4c[_0x2f0ec3(0x5f3)];_0x4cf3a7++){if('lJWOb'===_0x2f0ec3(0x4de))_0x3c3e4c[_0x4cf3a7]=TextManager[_0x2f0ec3(0x220)][_0x3c3e4c[_0x4cf3a7]];else{const _0x17b56a=this[_0x2f0ec3(0x283)];_0x17b56a[_0x2f0ec3(0x427)](),_0x17b56a[_0x2f0ec3(0x4a7)]=this['_makeFontNameText']();const _0x4b272e=_0x17b56a[_0x2f0ec3(0x608)](_0x364f74)[_0x2f0ec3(0x745)];return _0x17b56a[_0x2f0ec3(0x699)](),_0x4b272e;}}return this['makeInputButtonString'](_0x3c3e4c);},TextManager[_0x526668(0x2d4)]=function(_0x32730f){const _0x56ff91=_0x526668,_0x34a7b0=VisuMZ[_0x56ff91(0x6a7)][_0x56ff91(0x7c3)][_0x56ff91(0x680)],_0x4775e2=_0x34a7b0[_0x56ff91(0x6f4)],_0x351a2c=_0x32730f[_0x56ff91(0x229)](),_0x4f75d1=_0x56ff91(0x870)[_0x56ff91(0xa0a)](_0x351a2c);return _0x34a7b0[_0x4f75d1]?_0x34a7b0[_0x4f75d1]:_0x4775e2[_0x56ff91(0xa0a)](_0x351a2c);},TextManager[_0x526668(0x335)]=function(_0x47d3c2,_0x1fc094){const _0x52efeb=_0x526668,_0x2b5bcf=VisuMZ[_0x52efeb(0x6a7)][_0x52efeb(0x7c3)][_0x52efeb(0x680)],_0x4d9e7d=_0x2b5bcf[_0x52efeb(0x783)],_0x1ecc2a=this[_0x52efeb(0x3ab)](_0x47d3c2),_0x4da8f7=this[_0x52efeb(0x3ab)](_0x1fc094);return _0x4d9e7d[_0x52efeb(0xa0a)](_0x1ecc2a,_0x4da8f7);},VisuMZ[_0x526668(0x6a7)]['ColorManager_loadWindowskin']=ColorManager[_0x526668(0x337)],ColorManager[_0x526668(0x337)]=function(){const _0x2611ac=_0x526668;VisuMZ['CoreEngine'][_0x2611ac(0x222)][_0x2611ac(0x5f4)](this),this['_colorCache']=this[_0x2611ac(0x435)]||{};},ColorManager[_0x526668(0x9f5)]=function(_0x2b85f0,_0x14bca8){const _0x2ac0af=_0x526668;_0x14bca8=String(_0x14bca8),this['_colorCache']=this[_0x2ac0af(0x435)]||{};if(_0x14bca8['match'](/#(.*)/i))this[_0x2ac0af(0x435)][_0x2b85f0]=_0x2ac0af(0x380)['format'](String(RegExp['$1']));else{if(_0x2ac0af(0x6fc)!==_0x2ac0af(0x319))this[_0x2ac0af(0x435)][_0x2b85f0]=this[_0x2ac0af(0x547)](Number(_0x14bca8));else{const _0x5725a0=_0x1ab6a6[_0x29d987[_0x2ac0af(0x4f0)][0x0]];if(_0x5725a0&&this['_commonEventLayers']<=0xa){this[_0x2ac0af(0x83d)]++;let _0x29119a=_0x48f6e1[_0x2ac0af(0x6a7)][_0x2ac0af(0x61d)](_0x5725a0[_0x2ac0af(0x9ae)]);_0x29119a[_0x2ac0af(0x5f3)]>0x0&&(_0x98d4b5+=_0x4b23cb,_0x5b4859+=_0x3f6e69,_0x41fe06+=_0x2ac0af(0x92b)[_0x2ac0af(0xa0a)](_0x5725a0['id'],_0x5725a0['name']),_0x1e64ea+=_0x362605,_0x5e12c3+=_0x29119a,_0x1dffd5+=_0x45e7ca,_0x447383+=_0x2ac0af(0x873)[_0x2ac0af(0xa0a)](_0x5725a0['id'],_0x5725a0[_0x2ac0af(0x3c6)]),_0x2ccbb7+=_0x44df03),this[_0x2ac0af(0x83d)]--;}}}return this[_0x2ac0af(0x435)][_0x2b85f0];},ColorManager[_0x526668(0xa2b)]=function(_0x461233){const _0x91e396=_0x526668;return _0x461233=String(_0x461233),_0x461233['match'](/#(.*)/i)?'#%1'[_0x91e396(0xa0a)](String(RegExp['$1'])):this[_0x91e396(0x547)](Number(_0x461233));},ColorManager[_0x526668(0x3ba)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x32cb4e=_0x526668,_0x1962d9='_stored_normalColor';this[_0x32cb4e(0x435)]=this[_0x32cb4e(0x435)]||{};if(this['_colorCache'][_0x1962d9])return this['_colorCache'][_0x1962d9];const _0x59af68=VisuMZ[_0x32cb4e(0x6a7)][_0x32cb4e(0x7c3)][_0x32cb4e(0x42a)]['ColorNormal'];return this[_0x32cb4e(0x9f5)](_0x1962d9,_0x59af68);},ColorManager['systemColor']=function(){const _0x5581d6=_0x526668,_0x1a95ee=_0x5581d6(0x754);this[_0x5581d6(0x435)]=this[_0x5581d6(0x435)]||{};if(this[_0x5581d6(0x435)][_0x1a95ee])return this['_colorCache'][_0x1a95ee];const _0x19bbb1=VisuMZ[_0x5581d6(0x6a7)]['Settings']['Color'][_0x5581d6(0x66a)];return this[_0x5581d6(0x9f5)](_0x1a95ee,_0x19bbb1);},ColorManager[_0x526668(0x5ec)]=function(){const _0x11cc45=_0x526668,_0x7c24c6=_0x11cc45(0x7d2);this[_0x11cc45(0x435)]=this[_0x11cc45(0x435)]||{};if(this[_0x11cc45(0x435)][_0x7c24c6])return this[_0x11cc45(0x435)][_0x7c24c6];const _0x31414d=VisuMZ[_0x11cc45(0x6a7)][_0x11cc45(0x7c3)][_0x11cc45(0x42a)][_0x11cc45(0x58c)];return this['getColorDataFromPluginParameters'](_0x7c24c6,_0x31414d);},ColorManager[_0x526668(0x989)]=function(){const _0x110b3a=_0x526668,_0x1c4c0c='_stored_deathColor';this[_0x110b3a(0x435)]=this[_0x110b3a(0x435)]||{};if(this[_0x110b3a(0x435)][_0x1c4c0c])return this[_0x110b3a(0x435)][_0x1c4c0c];const _0x143e93=VisuMZ[_0x110b3a(0x6a7)][_0x110b3a(0x7c3)][_0x110b3a(0x42a)][_0x110b3a(0x826)];return this[_0x110b3a(0x9f5)](_0x1c4c0c,_0x143e93);},ColorManager[_0x526668(0x406)]=function(){const _0x4b9e7a=_0x526668,_0x4e0532=_0x4b9e7a(0x5e3);this[_0x4b9e7a(0x435)]=this[_0x4b9e7a(0x435)]||{};if(this[_0x4b9e7a(0x435)][_0x4e0532])return this[_0x4b9e7a(0x435)][_0x4e0532];const _0x2ecdff=VisuMZ[_0x4b9e7a(0x6a7)][_0x4b9e7a(0x7c3)]['Color'][_0x4b9e7a(0x9b2)];return this[_0x4b9e7a(0x9f5)](_0x4e0532,_0x2ecdff);},ColorManager[_0x526668(0x8fb)]=function(){const _0x5c6b03=_0x526668,_0x3ce559=_0x5c6b03(0x708);this[_0x5c6b03(0x435)]=this[_0x5c6b03(0x435)]||{};if(this['_colorCache'][_0x3ce559])return this[_0x5c6b03(0x435)][_0x3ce559];const _0x7c5f68=VisuMZ[_0x5c6b03(0x6a7)][_0x5c6b03(0x7c3)]['Color']['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x3ce559,_0x7c5f68);},ColorManager[_0x526668(0x545)]=function(){const _0x24fe4c=_0x526668,_0x4a41ca=_0x24fe4c(0x6d9);this[_0x24fe4c(0x435)]=this[_0x24fe4c(0x435)]||{};if(this[_0x24fe4c(0x435)][_0x4a41ca])return this[_0x24fe4c(0x435)][_0x4a41ca];const _0x3f0aa3=VisuMZ[_0x24fe4c(0x6a7)]['Settings'][_0x24fe4c(0x42a)][_0x24fe4c(0x2a3)];return this['getColorDataFromPluginParameters'](_0x4a41ca,_0x3f0aa3);},ColorManager[_0x526668(0x6cd)]=function(){const _0x310ddf=_0x526668,_0x3a4920=_0x310ddf(0x777);this[_0x310ddf(0x435)]=this[_0x310ddf(0x435)]||{};if(this['_colorCache'][_0x3a4920])return this['_colorCache'][_0x3a4920];const _0x359ea7=VisuMZ[_0x310ddf(0x6a7)][_0x310ddf(0x7c3)][_0x310ddf(0x42a)][_0x310ddf(0x7a0)];return this[_0x310ddf(0x9f5)](_0x3a4920,_0x359ea7);},ColorManager[_0x526668(0x2b6)]=function(){const _0x24e92d=_0x526668,_0x1e7ca1=_0x24e92d(0x3b9);this[_0x24e92d(0x435)]=this[_0x24e92d(0x435)]||{};if(this[_0x24e92d(0x435)][_0x1e7ca1])return this[_0x24e92d(0x435)][_0x1e7ca1];const _0x1dee88=VisuMZ['CoreEngine'][_0x24e92d(0x7c3)][_0x24e92d(0x42a)][_0x24e92d(0x6b0)];return this['getColorDataFromPluginParameters'](_0x1e7ca1,_0x1dee88);},ColorManager[_0x526668(0x352)]=function(){const _0x4f9ee5=_0x526668,_0x1c6d17='_stored_mpCostColor';this[_0x4f9ee5(0x435)]=this[_0x4f9ee5(0x435)]||{};if(this[_0x4f9ee5(0x435)][_0x1c6d17])return this[_0x4f9ee5(0x435)][_0x1c6d17];const _0x5f04ce=VisuMZ[_0x4f9ee5(0x6a7)][_0x4f9ee5(0x7c3)][_0x4f9ee5(0x42a)]['ColorMPCost'];return this[_0x4f9ee5(0x9f5)](_0x1c6d17,_0x5f04ce);},ColorManager[_0x526668(0x81f)]=function(){const _0x11136e=_0x526668,_0x2b9128=_0x11136e(0x350);this[_0x11136e(0x435)]=this[_0x11136e(0x435)]||{};if(this[_0x11136e(0x435)][_0x2b9128])return this[_0x11136e(0x435)][_0x2b9128];const _0x46bf2c=VisuMZ[_0x11136e(0x6a7)]['Settings'][_0x11136e(0x42a)][_0x11136e(0x3f5)];return this[_0x11136e(0x9f5)](_0x2b9128,_0x46bf2c);},ColorManager[_0x526668(0x468)]=function(){const _0x2465c5=_0x526668,_0x22ec8a='_stored_powerDownColor';this[_0x2465c5(0x435)]=this[_0x2465c5(0x435)]||{};if(this['_colorCache'][_0x22ec8a])return this['_colorCache'][_0x22ec8a];const _0x39fa48=VisuMZ['CoreEngine'][_0x2465c5(0x7c3)][_0x2465c5(0x42a)][_0x2465c5(0x709)];return this[_0x2465c5(0x9f5)](_0x22ec8a,_0x39fa48);},ColorManager['ctGaugeColor1']=function(){const _0xfb25a=_0x526668,_0x3e87e8=_0xfb25a(0x80b);this[_0xfb25a(0x435)]=this[_0xfb25a(0x435)]||{};if(this[_0xfb25a(0x435)][_0x3e87e8])return this['_colorCache'][_0x3e87e8];const _0x1ef5d6=VisuMZ[_0xfb25a(0x6a7)][_0xfb25a(0x7c3)][_0xfb25a(0x42a)]['ColorCTGauge1'];return this[_0xfb25a(0x9f5)](_0x3e87e8,_0x1ef5d6);},ColorManager[_0x526668(0x86f)]=function(){const _0x6e0d71=_0x526668,_0x3a3d5a='_stored_ctGaugeColor2';this[_0x6e0d71(0x435)]=this[_0x6e0d71(0x435)]||{};if(this[_0x6e0d71(0x435)][_0x3a3d5a])return this[_0x6e0d71(0x435)][_0x3a3d5a];const _0x369846=VisuMZ[_0x6e0d71(0x6a7)][_0x6e0d71(0x7c3)][_0x6e0d71(0x42a)]['ColorCTGauge2'];return this['getColorDataFromPluginParameters'](_0x3a3d5a,_0x369846);},ColorManager[_0x526668(0x7a2)]=function(){const _0x279cba=_0x526668,_0x2e2e1b=_0x279cba(0x5d0);this[_0x279cba(0x435)]=this['_colorCache']||{};if(this[_0x279cba(0x435)][_0x2e2e1b])return this[_0x279cba(0x435)][_0x2e2e1b];const _0x48c575=VisuMZ[_0x279cba(0x6a7)][_0x279cba(0x7c3)]['Color'][_0x279cba(0x358)];return this[_0x279cba(0x9f5)](_0x2e2e1b,_0x48c575);},ColorManager[_0x526668(0x9ba)]=function(){const _0x14c8be=_0x526668,_0x17182b=_0x14c8be(0x446);this[_0x14c8be(0x435)]=this[_0x14c8be(0x435)]||{};if(this[_0x14c8be(0x435)][_0x17182b])return this['_colorCache'][_0x17182b];const _0x3b16e6=VisuMZ[_0x14c8be(0x6a7)]['Settings']['Color'][_0x14c8be(0x208)];return this['getColorDataFromPluginParameters'](_0x17182b,_0x3b16e6);},ColorManager['tpCostColor']=function(){const _0x1d9b94=_0x526668,_0x33dfc0=_0x1d9b94(0x6e9);this[_0x1d9b94(0x435)]=this['_colorCache']||{};if(this[_0x1d9b94(0x435)][_0x33dfc0])return this[_0x1d9b94(0x435)][_0x33dfc0];const _0x56a25f=VisuMZ[_0x1d9b94(0x6a7)][_0x1d9b94(0x7c3)][_0x1d9b94(0x42a)][_0x1d9b94(0x5e4)];return this[_0x1d9b94(0x9f5)](_0x33dfc0,_0x56a25f);},ColorManager[_0x526668(0x58b)]=function(){const _0x2971c9=_0x526668,_0xecae4f='_stored_pendingColor';this[_0x2971c9(0x435)]=this[_0x2971c9(0x435)]||{};if(this[_0x2971c9(0x435)][_0xecae4f])return this[_0x2971c9(0x435)][_0xecae4f];const _0x9de407=VisuMZ['CoreEngine'][_0x2971c9(0x7c3)][_0x2971c9(0x42a)][_0x2971c9(0x5e4)];return this[_0x2971c9(0x9f5)](_0xecae4f,_0x9de407);},ColorManager[_0x526668(0x67b)]=function(){const _0xf5deae=_0x526668,_0x28ee07='_stored_expGaugeColor1';this['_colorCache']=this[_0xf5deae(0x435)]||{};if(this[_0xf5deae(0x435)][_0x28ee07])return this[_0xf5deae(0x435)][_0x28ee07];const _0x38fd4e=VisuMZ[_0xf5deae(0x6a7)][_0xf5deae(0x7c3)][_0xf5deae(0x42a)][_0xf5deae(0x7f9)];return this['getColorDataFromPluginParameters'](_0x28ee07,_0x38fd4e);},ColorManager['expGaugeColor2']=function(){const _0x529dd4=_0x526668,_0x4bad8b=_0x529dd4(0x6b3);this[_0x529dd4(0x435)]=this[_0x529dd4(0x435)]||{};if(this[_0x529dd4(0x435)][_0x4bad8b])return this[_0x529dd4(0x435)][_0x4bad8b];const _0x4619ce=VisuMZ[_0x529dd4(0x6a7)][_0x529dd4(0x7c3)]['Color'][_0x529dd4(0x647)];return this[_0x529dd4(0x9f5)](_0x4bad8b,_0x4619ce);},ColorManager[_0x526668(0x5c8)]=function(){const _0x276e89=_0x526668,_0x2da1b4=_0x276e89(0x54b);this[_0x276e89(0x435)]=this[_0x276e89(0x435)]||{};if(this[_0x276e89(0x435)][_0x2da1b4])return this[_0x276e89(0x435)][_0x2da1b4];const _0x495497=VisuMZ[_0x276e89(0x6a7)][_0x276e89(0x7c3)]['Color'][_0x276e89(0x32d)];return this[_0x276e89(0x9f5)](_0x2da1b4,_0x495497);},ColorManager[_0x526668(0x87e)]=function(){const _0x1961ba=_0x526668,_0x5cf069='_stored_maxLvGaugeColor2';this[_0x1961ba(0x435)]=this[_0x1961ba(0x435)]||{};if(this[_0x1961ba(0x435)][_0x5cf069])return this[_0x1961ba(0x435)][_0x5cf069];const _0x3532a4=VisuMZ[_0x1961ba(0x6a7)][_0x1961ba(0x7c3)]['Color']['ColorMaxLvGauge2'];return this['getColorDataFromPluginParameters'](_0x5cf069,_0x3532a4);},ColorManager[_0x526668(0x4ef)]=function(_0x55818e){const _0x575be3=_0x526668;return VisuMZ[_0x575be3(0x6a7)][_0x575be3(0x7c3)][_0x575be3(0x42a)]['ActorHPColor'][_0x575be3(0x5f4)](this,_0x55818e);},ColorManager[_0x526668(0x2a4)]=function(_0x34604f){const _0x126fc1=_0x526668;return VisuMZ[_0x126fc1(0x6a7)][_0x126fc1(0x7c3)]['Color'][_0x126fc1(0x974)]['call'](this,_0x34604f);},ColorManager['tpColor']=function(_0x53c5a2){const _0x4e2d2c=_0x526668;return VisuMZ[_0x4e2d2c(0x6a7)]['Settings'][_0x4e2d2c(0x42a)][_0x4e2d2c(0x8bb)]['call'](this,_0x53c5a2);},ColorManager[_0x526668(0x89a)]=function(_0x1cd2ae){const _0x263eb2=_0x526668;return VisuMZ[_0x263eb2(0x6a7)]['Settings'][_0x263eb2(0x42a)]['ParamChange']['call'](this,_0x1cd2ae);},ColorManager['damageColor']=function(_0x37ec14){const _0x2c3cb5=_0x526668;return VisuMZ['CoreEngine'][_0x2c3cb5(0x7c3)][_0x2c3cb5(0x42a)]['DamageColor'][_0x2c3cb5(0x5f4)](this,_0x37ec14);},ColorManager[_0x526668(0x56e)]=function(){const _0x2350dd=_0x526668;return VisuMZ[_0x2350dd(0x6a7)][_0x2350dd(0x7c3)]['Color']['OutlineColor'];},ColorManager[_0x526668(0x523)]=function(){const _0x23be93=_0x526668;return VisuMZ[_0x23be93(0x6a7)][_0x23be93(0x7c3)]['Color'][_0x23be93(0x3d2)]||_0x23be93(0x77f);},ColorManager[_0x526668(0x90c)]=function(){const _0x80d832=_0x526668;return VisuMZ['CoreEngine'][_0x80d832(0x7c3)][_0x80d832(0x42a)][_0x80d832(0x216)]||_0x80d832(0x51d);},ColorManager[_0x526668(0x68c)]=function(){const _0x5ca267=_0x526668;return VisuMZ[_0x5ca267(0x6a7)][_0x5ca267(0x7c3)][_0x5ca267(0x42a)]['DimColor1'];},ColorManager[_0x526668(0x504)]=function(){const _0x3df8fc=_0x526668;return VisuMZ['CoreEngine'][_0x3df8fc(0x7c3)]['Color'][_0x3df8fc(0x3fc)];},ColorManager[_0x526668(0x47a)]=function(){const _0x1704f8=_0x526668;return VisuMZ['CoreEngine'][_0x1704f8(0x7c3)]['Color'][_0x1704f8(0x5de)];},ColorManager[_0x526668(0x7d0)]=function(){const _0x659613=_0x526668;return VisuMZ['CoreEngine'][_0x659613(0x7c3)]['Color'][_0x659613(0x85c)];},SceneManager[_0x526668(0x8df)]=[],SceneManager[_0x526668(0x361)]=function(){const _0x58b59e=_0x526668;return this[_0x58b59e(0x807)]&&this['_scene'][_0x58b59e(0x330)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x275f86=_0x526668;return this[_0x275f86(0x807)]&&this[_0x275f86(0x807)][_0x275f86(0x330)]===Scene_Map;},SceneManager[_0x526668(0x887)]=function(){const _0x26157c=_0x526668;return this[_0x26157c(0x807)]&&this[_0x26157c(0x807)]instanceof Scene_Map;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x33c)]=SceneManager[_0x526668(0x96f)],SceneManager[_0x526668(0x96f)]=function(){const _0x3b6c55=_0x526668;VisuMZ['CoreEngine']['SceneManager_initialize'][_0x3b6c55(0x5f4)](this),this[_0x3b6c55(0x81a)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x40d)]=SceneManager[_0x526668(0x7f8)],SceneManager[_0x526668(0x7f8)]=function(_0x4ea76b){const _0x280316=_0x526668;if($gameTemp)this['onKeyDownKeysF6F7'](_0x4ea76b);VisuMZ[_0x280316(0x6a7)][_0x280316(0x40d)][_0x280316(0x5f4)](this,_0x4ea76b);},SceneManager['onKeyDownKeysF6F7']=function(_0x28c259){const _0x6a7c90=_0x526668;if(!_0x28c259['ctrlKey']&&!_0x28c259[_0x6a7c90(0x6ce)]){if('IZBvA'!==_0x6a7c90(0x8b7))return this[_0x6a7c90(0x807)]&&this[_0x6a7c90(0x807)]['constructor']===_0x6dcc6d;else switch(_0x28c259[_0x6a7c90(0x4cc)]){case 0x54:this[_0x6a7c90(0x981)]();break;case 0x75:this[_0x6a7c90(0x972)]();break;case 0x76:if(Input[_0x6a7c90(0x986)](_0x6a7c90(0x5c0))||Input['isPressed'](_0x6a7c90(0x90d)))return;this['playTestF7']();break;}}},SceneManager['playTestF6']=function(){const _0x54cc75=_0x526668;if($gameTemp[_0x54cc75(0x767)]()&&VisuMZ[_0x54cc75(0x6a7)][_0x54cc75(0x7c3)][_0x54cc75(0x622)][_0x54cc75(0x4b8)]){ConfigManager[_0x54cc75(0xa38)]!==0x0?(ConfigManager[_0x54cc75(0x7eb)]=0x0,ConfigManager[_0x54cc75(0x656)]=0x0,ConfigManager[_0x54cc75(0x929)]=0x0,ConfigManager[_0x54cc75(0xa38)]=0x0):(ConfigManager[_0x54cc75(0x7eb)]=0x64,ConfigManager[_0x54cc75(0x656)]=0x64,ConfigManager[_0x54cc75(0x929)]=0x64,ConfigManager[_0x54cc75(0xa38)]=0x64);ConfigManager[_0x54cc75(0x427)]();if(this[_0x54cc75(0x807)]['constructor']===Scene_Options){if(this[_0x54cc75(0x807)][_0x54cc75(0x8e0)])this[_0x54cc75(0x807)][_0x54cc75(0x8e0)][_0x54cc75(0x7f0)]();if(this[_0x54cc75(0x807)][_0x54cc75(0x27d)])this[_0x54cc75(0x807)][_0x54cc75(0x27d)][_0x54cc75(0x7f0)]();}}},SceneManager[_0x526668(0x43e)]=function(){const _0x27a329=_0x526668;if($gameTemp['isPlaytest']()&&VisuMZ[_0x27a329(0x6a7)][_0x27a329(0x7c3)][_0x27a329(0x622)][_0x27a329(0x6a8)]){if(_0x27a329(0x293)===_0x27a329(0x7ab))return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x27a329(0x5d5)]);else $gameTemp[_0x27a329(0x72e)]=!$gameTemp[_0x27a329(0x72e)];}},SceneManager[_0x526668(0x981)]=function(){const _0x3490bd=_0x526668;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x3490bd(0x361)]())return;for(const _0x5ade1d of $gameParty[_0x3490bd(0x58e)]()){if(!_0x5ade1d)continue;_0x5ade1d[_0x3490bd(0x810)](_0x5ade1d[_0x3490bd(0x85e)]());}},SceneManager[_0x526668(0x81a)]=function(){const _0x37624e=_0x526668;this[_0x37624e(0x424)]=![],this[_0x37624e(0x54e)]=!VisuMZ[_0x37624e(0x6a7)][_0x37624e(0x7c3)]['UI'][_0x37624e(0x89b)];},SceneManager[_0x526668(0x508)]=function(_0x423183){const _0x28f6f9=_0x526668;VisuMZ['CoreEngine']['Settings']['UI'][_0x28f6f9(0x771)]&&(this['_sideButtonLayout']=_0x423183);},SceneManager[_0x526668(0x50c)]=function(){const _0x2e43b5=_0x526668;return this[_0x2e43b5(0x424)];},SceneManager[_0x526668(0x4ac)]=function(){return this['_hideButtons'];},SceneManager[_0x526668(0x450)]=function(){const _0x69c724=_0x526668;return this[_0x69c724(0x4ac)]()||this[_0x69c724(0x50c)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x4fe)]=SceneManager[_0x526668(0x605)],SceneManager['isGameActive']=function(){const _0x57b0eb=_0x526668;if(VisuMZ['CoreEngine']['Settings'][_0x57b0eb(0x622)][_0x57b0eb(0x3ed)])return VisuMZ[_0x57b0eb(0x6a7)][_0x57b0eb(0x4fe)]['call'](this);else{if(_0x57b0eb(0x2e2)==='VdXuQ')return!![];else this[_0x57b0eb(0x9f9)]+=_0x1b70ce;}},SceneManager[_0x526668(0x4a1)]=function(_0x38ee9e){const _0x452a3a=_0x526668;if(_0x38ee9e instanceof Error)this['catchNormalError'](_0x38ee9e);else{if(_0x38ee9e instanceof Array&&_0x38ee9e[0x0]===_0x452a3a(0x5af))this['catchLoadError'](_0x38ee9e);else{if(_0x452a3a(0x8b8)==='wvLQk')return!![];else this[_0x452a3a(0x491)](_0x38ee9e);}}this[_0x452a3a(0x24b)]();},VisuMZ[_0x526668(0x6a7)]['BattleManager_processEscape']=BattleManager[_0x526668(0x4ad)],BattleManager[_0x526668(0x4ad)]=function(){const _0x19ac94=_0x526668;if(VisuMZ[_0x19ac94(0x6a7)][_0x19ac94(0x7c3)][_0x19ac94(0x622)][_0x19ac94(0x6a6)])this[_0x19ac94(0x39c)]();else return _0x19ac94(0x3dd)===_0x19ac94(0x3dd)?VisuMZ[_0x19ac94(0x6a7)][_0x19ac94(0x268)]['call'](this):this['_fauxAnimationQueue']['shift']();},BattleManager[_0x526668(0x39c)]=function(){const _0x22b2e1=_0x526668;return $gameParty[_0x22b2e1(0x99f)](),SoundManager[_0x22b2e1(0x98d)](),this[_0x22b2e1(0x1f4)](),!![];},BattleManager[_0x526668(0x225)]=function(){const _0x4a415d=_0x526668;return $gameSystem[_0x4a415d(0x534)]()>=0x1;},BattleManager[_0x526668(0x539)]=function(){const _0x49503b=_0x526668;return $gameSystem[_0x49503b(0x534)]()===0x1;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x46b)]=Game_Temp[_0x526668(0x4aa)][_0x526668(0x96f)],Game_Temp[_0x526668(0x4aa)][_0x526668(0x96f)]=function(){const _0x57f6d6=_0x526668;VisuMZ[_0x57f6d6(0x6a7)]['Game_Temp_initialize']['call'](this),this['forceOutOfPlaytest'](),this[_0x57f6d6(0xa31)](),this['createPointAnimationQueue']();},Game_Temp[_0x526668(0x4aa)][_0x526668(0x99d)]=function(){const _0x311938=_0x526668;if(VisuMZ['CoreEngine'][_0x311938(0x7c3)][_0x311938(0x622)][_0x311938(0xa1c)]){if(_0x311938(0x410)!==_0x311938(0x410)){const _0x193481=_0x53bb1a[_0x311938(0x680)];_0x193481[_0x311938(0x692)]=_0x193481['KeySHIFT']||'\x5c}❪SHIFT❫\x5c{',_0x193481[_0x311938(0x6f2)]=_0x193481[_0x311938(0x6f2)]||'\x5c}❪TAB❫\x5c{';}else this[_0x311938(0x869)]=![];}},Game_Temp[_0x526668(0x4aa)][_0x526668(0x41a)]=function(_0x2721f3){const _0x273fb6=_0x526668;this[_0x273fb6(0x950)]=_0x2721f3;},Game_Temp[_0x526668(0x4aa)][_0x526668(0x4be)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0x526668(0x982)]=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x526668(0x4aa)][_0x526668(0x4b6)]=function(_0x1eda5a){const _0x110852=_0x526668;$gameMap&&$dataMap&&$dataMap['note']&&(_0x110852(0x82a)!=='ByFFZ'?this[_0x110852(0x791)]($dataMap['note']):(this[_0x110852(0x27e)]=_0x58778f[_0x110852(0x6a7)][_0x110852(0x7c3)][_0x110852(0x622)]['DigitGroupingStandardText'],this[_0x110852(0x3ce)]=_0x5266e4['CoreEngine'][_0x110852(0x7c3)][_0x110852(0x622)][_0x110852(0x75b)]));const _0x278f99=$dataTroops[_0x1eda5a];if(_0x278f99){let _0x3a9bce=DataManager[_0x110852(0x3c8)](_0x278f99['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x3a9bce);}},Game_Temp['prototype'][_0x526668(0x791)]=function(_0x230e8d){const _0x16724b=_0x526668;if(!_0x230e8d)return;if(_0x230e8d['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if('hAFwx'!==_0x16724b(0x902))this[_0x16724b(0x912)]='FV';else{const _0x3b0eb9=_0xe1daa8['loadSystem'](_0x16724b(0x9e6)),_0x34f8e1=_0x1060b3[_0x16724b(0x411)],_0x4dd0bf=_0x486e08['iconHeight'],_0x5714e4=_0x857f1d%0x10*_0x34f8e1,_0x353bd3=_0x59310c[_0x16724b(0x749)](_0x21a81d/0x10)*_0x4dd0bf,_0x748023=_0x11ba48,_0x263cd7=_0x319671;this[_0x16724b(0x255)][_0x16724b(0x8d3)][_0x16724b(0x5ed)]=_0x4f4aa4,this['contents'][_0x16724b(0x484)](_0x3b0eb9,_0x5714e4,_0x353bd3,_0x34f8e1,_0x4dd0bf,_0x3818e1,_0x65f957,_0x748023,_0x263cd7),this[_0x16724b(0x255)]['_context'][_0x16724b(0x5ed)]=!![];}}else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2bdf7a=String(RegExp['$1']);if(_0x2bdf7a['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))_0x16724b(0x57d)===_0x16724b(0x57d)?this[_0x16724b(0x912)]='FV':this[_0x16724b(0x491)](_0x7c266b);else{if(_0x2bdf7a[_0x16724b(0x78d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x16724b(0x2fb)===_0x16724b(0x2fb))this[_0x16724b(0x912)]='SV';else return _0x3a0138[_0x16724b(0x4aa)][_0x16724b(0x1f5)][_0x16724b(0x5f4)](this,_0x5ee232);}}}}}if(_0x230e8d[_0x16724b(0x78d)](/<(?:DTB)>/i))_0x16724b(0x889)!==_0x16724b(0x889)?(_0x212313[_0x16724b(0x6a7)][_0x16724b(0x609)]['call'](this),_0x535857[_0x16724b(0x793)](_0x16724b(0x3aa),this[_0x16724b(0x351)]['bind'](this))):this[_0x16724b(0x230)]=0x0;else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:TPB|ATB)[ ]ACTIVE>/i))_0x16724b(0x4b1)!==_0x16724b(0x618)?this[_0x16724b(0x230)]=0x1:this[_0x16724b(0x230)]=0x0;else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x16724b(0x230)]=0x2;else{if(_0x230e8d['match'](/<(?:CTB)>/i)){if(Imported[_0x16724b(0x2db)]){if('NAfcO'!==_0x16724b(0x258))this[_0x16724b(0x230)]='CTB';else{if(_0x1ca540)_0x49fc62['ParseItemNotetags'](_0x402347);}}}else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:STB)>/i))_0x16724b(0x8e3)!==_0x16724b(0x5fb)?Imported[_0x16724b(0x75a)]&&(this[_0x16724b(0x230)]=_0x16724b(0x3b5)):this[_0x16724b(0x5d1)]();else{if(_0x230e8d['match'](/<(?:BTB)>/i)){if(Imported[_0x16724b(0x695)]){if(_0x16724b(0x202)!=='rdWEt')this[_0x16724b(0x230)]=_0x16724b(0x9a1);else{let _0x3eb84f=_0x544eb6[_0x16724b(0x487)](_0x1842ae)[_0x16724b(0x6d2)]();this[_0x16724b(0xa2e)]()&&(_0x3eb84f=_0x3503e2['GroupDigits'](_0x3eb84f));const _0x2f4407=this[_0x16724b(0x996)](),_0x3d4400=_0x2f2008[_0x16724b(0x749)](_0x2f4407*0.75);for(let _0x49c4e7=0x0;_0x49c4e7<_0x3eb84f['length'];_0x49c4e7++){const _0x4f666a=this[_0x16724b(0x75e)](_0x3d4400,_0x2f4407);_0x4f666a[_0x16724b(0xa29)][_0x16724b(0x714)](_0x3eb84f[_0x49c4e7],0x0,0x0,_0x3d4400,_0x2f4407,_0x16724b(0x541)),_0x4f666a['x']=(_0x49c4e7-(_0x3eb84f[_0x16724b(0x5f3)]-0x1)/0x2)*_0x3d4400,_0x4f666a['dy']=-_0x49c4e7;}}}}else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:FTB)>/i))Imported[_0x16724b(0x3c0)]&&(this[_0x16724b(0x230)]=_0x16724b(0x825));else{if(_0x230e8d['match'](/<(?:OTB)>/i))Imported[_0x16724b(0x307)]&&('DFCqU'==='DFCqU'?this['_forcedBattleSys']=_0x16724b(0x38a):this[_0x16724b(0x230)]=_0x16724b(0x825));else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:ETB)>/i))_0x16724b(0x6e3)!==_0x16724b(0x3ef)?Imported[_0x16724b(0x3f8)]&&(_0x16724b(0x501)===_0x16724b(0x501)?this[_0x16724b(0x230)]=_0x16724b(0x64e):_0x3df9ed+=_0x2e97b8[_0x16724b(0x4aa)][_0x16724b(0x367)]()):_0x529f17[_0x16724b(0x6a7)][_0x16724b(0x30a)][_0x16724b(0x5f4)](this);else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:PTB)>/i))'gXiFs'!==_0x16724b(0x201)?this[_0x16724b(0x2ad)](_0x16724b(0x274)):Imported[_0x16724b(0x68e)]&&(_0x16724b(0x419)===_0x16724b(0x2de)?(this[_0x16724b(0x515)]&&this[_0x16724b(0x515)][_0x16724b(0x529)](_0x6d52d1[_0x16724b(0x298)][_0x16724b(0x8b4)]),this[_0x16724b(0x8b5)]&&this[_0x16724b(0x8b5)]['setBackgroundType'](_0x15cc60['layoutSettings']['InputBgType'])):this['_forcedBattleSys']=_0x16724b(0x395));else{if(_0x230e8d[_0x16724b(0x78d)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x19a356=String(RegExp['$1']);if(_0x19a356[_0x16724b(0x78d)](/DTB/i))_0x16724b(0x667)!==_0x16724b(0x6cc)?this['_forcedBattleSys']=0x0:_0x3b565d=_0x27bdfd['concat'](_0xb5195d);else{if(_0x19a356['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x19a356[_0x16724b(0x78d)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x16724b(0x230)]=0x2;else{if(_0x19a356[_0x16724b(0x78d)](/CTB/i))Imported[_0x16724b(0x2db)]&&('ZSyKb'==='ZSyKb'?this[_0x16724b(0x230)]='CTB':_0x5c6318+=_0x16724b(0x9d1));else{if(_0x19a356[_0x16724b(0x78d)](/STB/i))_0x16724b(0x677)!==_0x16724b(0x373)?Imported[_0x16724b(0x75a)]&&(this[_0x16724b(0x230)]=_0x16724b(0x3b5)):this[_0x16724b(0x2ad)](_0x16724b(0x274));else{if(_0x19a356[_0x16724b(0x78d)](/BTB/i))_0x16724b(0x26e)==='prsOR'?Imported[_0x16724b(0x695)]&&(this['_forcedBattleSys']='BTB'):this[_0x16724b(0x9a2)][_0x16724b(0x529)](_0x1b25aa[_0x16724b(0x298)][_0x16724b(0x7b7)]);else{if(_0x19a356[_0x16724b(0x78d)](/FTB/i)){if(_0x16724b(0x7c4)==='FnIOF')return this[_0x16724b(0x409)]?this[_0x16724b(0x409)][_0x16724b(0x374)]():_0xba670f[_0x16724b(0x6a7)]['Settings'][_0x16724b(0x552)]['length'];else Imported[_0x16724b(0x3c0)]&&(this[_0x16724b(0x230)]=_0x16724b(0x825));}else{if(_0x19a356[_0x16724b(0x78d)](/OTB/i)){if(_0x16724b(0x96d)!==_0x16724b(0x96d))return _0x6cd6bb;else Imported[_0x16724b(0x307)]&&(_0x16724b(0x7e3)===_0x16724b(0x7e3)?this[_0x16724b(0x230)]=_0x16724b(0x38a):(_0x3bcb1f[_0x16724b(0x6a7)][_0x16724b(0x946)][_0x16724b(0x5f4)](this),_0x4fa2fd[_0x16724b(0x50c)]()&&this[_0x16724b(0x5be)]()));}else{if(_0x19a356[_0x16724b(0x78d)](/ETB/i))Imported[_0x16724b(0x3f8)]&&(this[_0x16724b(0x230)]='ETB');else _0x19a356[_0x16724b(0x78d)](/PTB/i)&&(_0x16724b(0x6bc)!==_0x16724b(0x6bc)?(this[_0x16724b(0x908)]=_0x37f76e(_0x1cbb9e(this[_0x16724b(0x908)])[_0x16724b(0x35c)](0x1)),this[_0x16724b(0x908)]=_0x3d0474[_0x16724b(0x431)](0x0,this['_number']),_0x125e0d[_0x16724b(0x56a)](),this[_0x16724b(0x7f0)](),_0x466f33[_0x16724b(0x52e)](),this[_0x16724b(0x606)](this[_0x16724b(0x595)]-0x1)):Imported[_0x16724b(0x68e)]&&(_0x16724b(0x2d0)===_0x16724b(0x234)?(_0x19a706[_0x16724b(0x56a)](),this[_0x16724b(0x263)]()):this['_forcedBattleSys']=_0x16724b(0x395)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x526668(0x4aa)][_0x526668(0xa31)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x526668(0x4aa)][_0x526668(0x7c0)]=function(_0x491d5c,_0x90908a,_0x3cdabf,_0x4e9428){const _0x22626e=_0x526668;if(!this['showFauxAnimations']())return;_0x3cdabf=_0x3cdabf||![],_0x4e9428=_0x4e9428||![];if($dataAnimations[_0x90908a]){if(_0x22626e(0x502)===_0x22626e(0x502)){const _0x3122fc={'targets':_0x491d5c,'animationId':_0x90908a,'mirror':_0x3cdabf,'mute':_0x4e9428};this[_0x22626e(0x781)][_0x22626e(0x3ec)](_0x3122fc);for(const _0x336466 of _0x491d5c){_0x336466[_0x22626e(0x599)]&&('neHLA'===_0x22626e(0x4b2)?(_0x3adca9['_x']=_0x1c2763['_x'],_0x1a9784['_y']=_0x5abd7f['_y']):_0x336466[_0x22626e(0x599)]());}}else _0x35152a['se'][_0x22626e(0x363)]=0x0;}},Game_Temp[_0x526668(0x4aa)][_0x526668(0x8de)]=function(){return!![];},Game_Temp['prototype'][_0x526668(0x4cf)]=function(){const _0x5ab68e=_0x526668;return this[_0x5ab68e(0x781)][_0x5ab68e(0x5c0)]();},Game_Temp[_0x526668(0x4aa)]['createPointAnimationQueue']=function(){const _0x51ccf6=_0x526668;this[_0x51ccf6(0x68a)]=[];},Game_Temp[_0x526668(0x4aa)][_0x526668(0x444)]=function(_0x1acdf9,_0x3cbd2b,_0x20c519,_0x3dd7a8,_0x3bc8a5){const _0x2468af=_0x526668;if(!this[_0x2468af(0x684)]())return;_0x3dd7a8=_0x3dd7a8||![],_0x3bc8a5=_0x3bc8a5||![];if($dataAnimations[_0x20c519]){if(_0x2468af(0x5a4)===_0x2468af(0x5a4)){const _0x59187e={'x':_0x1acdf9,'y':_0x3cbd2b,'animationId':_0x20c519,'mirror':_0x3dd7a8,'mute':_0x3bc8a5};this[_0x2468af(0x68a)]['push'](_0x59187e);}else{const _0x389fc3=this[_0x2468af(0x638)],_0x48ab87=_0x3907ef[_0x2468af(0x431)](0x0,this['_width']-_0x389fc3*0x2),_0x324517=_0x4b9886[_0x2468af(0x431)](0x0,this['_height']-_0x389fc3*0x2),_0x119bc8=this[_0x2468af(0x2a0)],_0x427fd9=_0x119bc8[_0x2468af(0x7cd)][0x0];_0x119bc8['bitmap']=this[_0x2468af(0x659)],_0x119bc8['setFrame'](0x0,0x0,0x60,0x60),_0x119bc8[_0x2468af(0x71e)](_0x389fc3,_0x389fc3),_0x119bc8[_0x2468af(0x766)]['x']=_0x48ab87/0x60,_0x119bc8['scale']['y']=_0x324517/0x60,_0x427fd9['bitmap']=this[_0x2468af(0x659)],_0x427fd9['setFrame'](0x0,0x60,0x60,0x60),_0x427fd9[_0x2468af(0x71e)](0x0,0x0,_0x48ab87,_0x324517),_0x427fd9[_0x2468af(0x766)]['x']=0x1/_0x119bc8[_0x2468af(0x766)]['x'],_0x427fd9['scale']['y']=0x1/_0x119bc8[_0x2468af(0x766)]['y'],_0x119bc8[_0x2468af(0x4f7)](this[_0x2468af(0x429)]);}}},Game_Temp[_0x526668(0x4aa)][_0x526668(0x684)]=function(){return!![];},Game_Temp[_0x526668(0x4aa)]['retrievePointAnimation']=function(){const _0x33f090=_0x526668;return this[_0x33f090(0x68a)][_0x33f090(0x5c0)]();},VisuMZ[_0x526668(0x6a7)]['Game_System_initialize']=Game_System['prototype']['initialize'],Game_System[_0x526668(0x4aa)][_0x526668(0x96f)]=function(){const _0x187b9c=_0x526668;VisuMZ[_0x187b9c(0x6a7)][_0x187b9c(0x789)]['call'](this),this[_0x187b9c(0x5f6)]();},Game_System[_0x526668(0x4aa)][_0x526668(0x5f6)]=function(){const _0x596e7f=_0x526668;this[_0x596e7f(0x592)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x596e7f(0x6f8)](),'FontSize':$dataSystem[_0x596e7f(0x2ee)][_0x596e7f(0x996)],'Padding':0xc};},Game_System[_0x526668(0x4aa)][_0x526668(0x551)]=function(){const _0x3f82f6=_0x526668;if($gameTemp[_0x3f82f6(0x912)]==='SV')return!![];else{if($gameTemp[_0x3f82f6(0x912)]==='FV')return![];}if(this[_0x3f82f6(0x592)]===undefined)this[_0x3f82f6(0x5f6)]();if(this[_0x3f82f6(0x592)][_0x3f82f6(0x6d0)]===undefined)this[_0x3f82f6(0x5f6)]();return this[_0x3f82f6(0x592)]['SideView'];},Game_System[_0x526668(0x4aa)][_0x526668(0x441)]=function(_0x59dbf2){const _0x210973=_0x526668;if(this[_0x210973(0x592)]===undefined)this[_0x210973(0x5f6)]();if(this[_0x210973(0x592)][_0x210973(0x6d0)]===undefined)this['initCoreEngine']();this[_0x210973(0x592)][_0x210973(0x6d0)]=_0x59dbf2;},Game_System[_0x526668(0x4aa)][_0x526668(0x2ba)]=function(){const _0x5b54d8=_0x526668;if(this[_0x5b54d8(0x592)]===undefined)this['initCoreEngine']();this[_0x5b54d8(0x592)][_0x5b54d8(0x7ba)]=this[_0x5b54d8(0x6f8)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x380179=_0x526668,_0x455632=(VisuMZ['CoreEngine'][_0x380179(0x7c3)]['BattleSystem']||_0x380179(0x9a5))['toUpperCase']()['trim']();return VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x455632);},Game_System[_0x526668(0x4aa)][_0x526668(0x534)]=function(){const _0x48d95c=_0x526668;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x48d95c(0x230)];if(this[_0x48d95c(0x592)]===undefined)this[_0x48d95c(0x5f6)]();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x48d95c(0x2ba)]();return this['_CoreEngineSettings'][_0x48d95c(0x7ba)];},Game_System[_0x526668(0x4aa)][_0x526668(0x516)]=function(_0x44e98e){const _0x5ee8ef=_0x526668;if(this[_0x5ee8ef(0x592)]===undefined)this[_0x5ee8ef(0x5f6)]();if(this[_0x5ee8ef(0x592)][_0x5ee8ef(0x7ba)]===undefined)this[_0x5ee8ef(0x2ba)]();this['_CoreEngineSettings']['BattleSystem']=_0x44e98e;},Game_System['prototype'][_0x526668(0xa37)]=function(){const _0x238df1=_0x526668;if(this[_0x238df1(0x592)]===undefined)this[_0x238df1(0x5f6)]();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x238df1(0x5f6)]();return this['_CoreEngineSettings'][_0x238df1(0x69e)];},Game_System[_0x526668(0x4aa)][_0x526668(0x35a)]=function(_0x20afdb){const _0x19216c=_0x526668;if(this[_0x19216c(0x592)]===undefined)this[_0x19216c(0x5f6)]();if(this[_0x19216c(0x592)][_0x19216c(0x87b)]===undefined)this[_0x19216c(0x5f6)]();this[_0x19216c(0x592)]['FontSize']=_0x20afdb;},Game_System[_0x526668(0x4aa)]['windowPadding']=function(){const _0x28ecde=_0x526668;if(this[_0x28ecde(0x592)]===undefined)this[_0x28ecde(0x5f6)]();if(this[_0x28ecde(0x592)]['Padding']===undefined)this['initCoreEngine']();return this[_0x28ecde(0x592)][_0x28ecde(0x3e7)];},Game_System['prototype'][_0x526668(0x8af)]=function(_0x539429){const _0x100422=_0x526668;if(this[_0x100422(0x592)]===undefined)this[_0x100422(0x5f6)]();if(this[_0x100422(0x592)][_0x100422(0x87b)]===undefined)this[_0x100422(0x5f6)]();this[_0x100422(0x592)][_0x100422(0x3e7)]=_0x539429;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x867)]=Game_Screen[_0x526668(0x4aa)][_0x526668(0x96f)],Game_Screen[_0x526668(0x4aa)][_0x526668(0x96f)]=function(){const _0x5d7d12=_0x526668;VisuMZ[_0x5d7d12(0x6a7)]['Game_Screen_initialize'][_0x5d7d12(0x5f4)](this),this[_0x5d7d12(0x356)]();},Game_Screen[_0x526668(0x4aa)][_0x526668(0x356)]=function(){const _0x1ce88e=_0x526668,_0x3b1404=VisuMZ[_0x1ce88e(0x6a7)][_0x1ce88e(0x7c3)][_0x1ce88e(0x884)];this[_0x1ce88e(0x4e3)]=_0x3b1404?.[_0x1ce88e(0x62c)]||_0x1ce88e(0x941);},Game_Screen['prototype'][_0x526668(0xa3a)]=function(){const _0x2192d3=_0x526668;if(this[_0x2192d3(0x4e3)]===undefined)this[_0x2192d3(0x356)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x526668(0x4aa)][_0x526668(0x36f)]=function(_0x2a489b){const _0x4aaf90=_0x526668;if(this[_0x4aaf90(0x4e3)]===undefined)this[_0x4aaf90(0x356)]();this[_0x4aaf90(0x4e3)]=_0x2a489b[_0x4aaf90(0x665)]()[_0x4aaf90(0x4a6)]();},Game_Picture['prototype'][_0x526668(0x64f)]=function(){const _0x126538=_0x526668;if($gameParty[_0x126538(0x61a)]())return![];return this[_0x126538(0x3c6)]()&&this['name']()[_0x126538(0x96a)](0x0)==='!';},VisuMZ[_0x526668(0x6a7)]['Game_Picture_x']=Game_Picture[_0x526668(0x4aa)]['x'],Game_Picture[_0x526668(0x4aa)]['x']=function(){const _0x2f0954=_0x526668;return this['isMapScrollLinked']()?this['xScrollLinkedOffset']():VisuMZ[_0x2f0954(0x6a7)][_0x2f0954(0x5ff)][_0x2f0954(0x5f4)](this);},Game_Picture[_0x526668(0x4aa)][_0x526668(0x77a)]=function(){const _0x27696b=_0x526668,_0x56bc95=$gameMap[_0x27696b(0x26c)]()*$gameMap['tileWidth']();return this['_x']-_0x56bc95;},VisuMZ[_0x526668(0x6a7)]['Game_Picture_y']=Game_Picture[_0x526668(0x4aa)]['y'],Game_Picture[_0x526668(0x4aa)]['y']=function(){const _0x2f1513=_0x526668;if(this['isMapScrollLinked']()){if(_0x2f1513(0x99c)!==_0x2f1513(0x99c))_0x4a4357['CoreEngine']['Window_Gold_refresh'][_0x2f1513(0x5f4)](this);else return this['yScrollLinkedOffset']();}else{if(_0x2f1513(0x915)!==_0x2f1513(0x824))return VisuMZ[_0x2f1513(0x6a7)][_0x2f1513(0x26a)][_0x2f1513(0x5f4)](this);else{_0x12fd0d['ConvertParams'](_0x382890,_0x332ad6);const _0x18e012=_0x3bda25[_0x2f1513(0x845)](_0x3ebf56['StartID'],_0x5ee11a['EndingID']),_0x5c987d=_0x4b430f[_0x2f1513(0x431)](_0x1218da[_0x2f1513(0x561)],_0x35e243[_0x2f1513(0x800)]);for(let _0x5aa9eb=_0x18e012;_0x5aa9eb<=_0x5c987d;_0x5aa9eb++){_0x127b8f[_0x2f1513(0x73f)](_0x5aa9eb);}}}},Game_Picture[_0x526668(0x4aa)][_0x526668(0x472)]=function(){const _0x53ceaf=_0x526668,_0x3bef40=$gameMap[_0x53ceaf(0x4c2)]()*$gameMap['tileHeight']();return this['_y']-_0x3bef40;},Game_Picture['prototype'][_0x526668(0x7df)]=function(_0x26b13b){const _0x57123b=_0x526668;this[_0x57123b(0x756)]=_0x26b13b;},VisuMZ['CoreEngine'][_0x526668(0x947)]=Game_Picture[_0x526668(0x4aa)][_0x526668(0x40c)],Game_Picture['prototype'][_0x526668(0x40c)]=function(_0x1a52fa){const _0x2f0174=_0x526668;this[_0x2f0174(0x756)]=this[_0x2f0174(0x756)]||0x0;if([0x0,0x1,0x2,0x3][_0x2f0174(0x666)](this['_coreEasingType'])){if(_0x2f0174(0x6b1)===_0x2f0174(0x6b1))return VisuMZ[_0x2f0174(0x6a7)][_0x2f0174(0x947)][_0x2f0174(0x5f4)](this,_0x1a52fa);else{const _0x126600=_0x2f0174(0x33d)[_0x2f0174(0xa0a)](_0x7fc2e['padZero'](0x3)),_0x5e293a=new _0x2a90a0(),_0x16dd19=_0x2f0174(0x48b)+_0x126600;_0x5e293a[_0x2f0174(0x858)](_0x2f0174(0x68b),_0x16dd19),_0x5e293a[_0x2f0174(0x342)]('application/json'),_0x5e293a[_0x2f0174(0x250)]=()=>this[_0x2f0174(0x716)](_0x5e293a,_0x4e18a3,_0x126600,_0x16dd19),_0x5e293a[_0x2f0174(0x22d)]=()=>_0x5c9653[_0x2f0174(0x26b)](_0x2f0174(0x67e),_0x126600,_0x16dd19),_0x5e293a['send']();}}else{if(_0x2f0174(0x2ff)==='TnfdB')return VisuMZ[_0x2f0174(0x31f)](_0x1a52fa,this['_coreEasingType']);else _0x500504[_0x2f0174(0x34d)](),_0x38de28['goto'](_0x3b26ff);}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x969)]=Game_Action['prototype'][_0x526668(0x5b2)],Game_Action['prototype']['itemHit']=function(_0x268304){const _0x139a87=_0x526668;if(VisuMZ[_0x139a87(0x6a7)][_0x139a87(0x7c3)][_0x139a87(0x622)][_0x139a87(0x3b1)])return'lcwmG'===_0x139a87(0x9cc)?(this[_0x139a87(0x3cd)]=this[_0x139a87(0x3cd)]||{},this[_0x139a87(0x3cd)][_0x591b9c]!==_0x505071):this['itemHitImprovedAccuracy'](_0x268304);else{if('TDvVs'==='TDvVs')return VisuMZ[_0x139a87(0x6a7)][_0x139a87(0x969)][_0x139a87(0x5f4)](this,_0x268304);else _0x345ebe[_0x139a87(0x6a7)]['Sprite_Actor_setActorHome'][_0x139a87(0x5f4)](this,_0xf5365a);}},Game_Action[_0x526668(0x4aa)][_0x526668(0x1f7)]=function(_0x3cf574){const _0x2a37af=_0x526668,_0x5cb12c=this[_0x2a37af(0x2ce)](_0x3cf574),_0x5dd1e7=this[_0x2a37af(0x997)](_0x3cf574),_0x18010e=this[_0x2a37af(0x2d1)](_0x3cf574);return _0x5cb12c*(_0x5dd1e7-_0x18010e);},VisuMZ['CoreEngine'][_0x526668(0x5df)]=Game_Action['prototype']['itemEva'],Game_Action['prototype'][_0x526668(0x219)]=function(_0x49eed2){const _0x5e121c=_0x526668;return VisuMZ['CoreEngine'][_0x5e121c(0x7c3)][_0x5e121c(0x622)][_0x5e121c(0x3b1)]?0x0:VisuMZ[_0x5e121c(0x6a7)][_0x5e121c(0x5df)][_0x5e121c(0x5f4)](this,_0x49eed2);},Game_Action[_0x526668(0x4aa)][_0x526668(0x2ce)]=function(_0x9180d8){const _0x5cc5d4=_0x526668;return this[_0x5cc5d4(0x4fd)]()['successRate']*0.01;},Game_Action[_0x526668(0x4aa)][_0x526668(0x997)]=function(_0x46016a){const _0x46f02e=_0x526668;if(VisuMZ[_0x46f02e(0x6a7)]['Settings'][_0x46f02e(0x622)][_0x46f02e(0x5a7)]&&this[_0x46f02e(0x673)]())return 0x1;if(this[_0x46f02e(0x9c1)]()){if('cUCcf'!==_0x46f02e(0x8d8)){let _0x21bac9=this[_0x46f02e(0x277)]();const _0x482dad=this[_0x46f02e(0x374)](),_0x25af0d=this[_0x46f02e(0x779)]();if(this[_0x46f02e(0x8b0)]()&&(_0x21bac9<_0x482dad||_0x297de4&&_0x25af0d===0x1)){_0x21bac9+=_0x25af0d;if(_0x21bac9>=_0x482dad)_0x21bac9=_0x482dad-0x1;this['smoothSelect'](_0x21bac9);}else!this['isUseModernControls']()&&((_0x21bac9<_0x482dad-_0x25af0d||_0x3100b5&&_0x25af0d===0x1)&&this['smoothSelect']((_0x21bac9+_0x25af0d)%_0x482dad));}else{if(VisuMZ[_0x46f02e(0x6a7)][_0x46f02e(0x7c3)][_0x46f02e(0x622)][_0x46f02e(0x5a7)]&&this[_0x46f02e(0x297)]()[_0x46f02e(0x84f)]()){if('babcO'!=='babcO')this[_0x46f02e(0x4e8)]=0x0;else return this[_0x46f02e(0x297)]()[_0x46f02e(0x23b)]+0.05;}else return this[_0x46f02e(0x297)]()['hit'];}}else return 0x1;},Game_Action[_0x526668(0x4aa)][_0x526668(0x2d1)]=function(_0x309abf){const _0x4b4b8f=_0x526668;if(this[_0x4b4b8f(0x297)]()[_0x4b4b8f(0x84f)]()===_0x309abf[_0x4b4b8f(0x84f)]())return 0x0;if(this['isPhysical']()){if(VisuMZ[_0x4b4b8f(0x6a7)]['Settings']['QoL'][_0x4b4b8f(0x5a7)]&&_0x309abf[_0x4b4b8f(0x464)]()){if(_0x4b4b8f(0x256)===_0x4b4b8f(0x309)){const _0x53150d=this[_0x4b4b8f(0x9af)]()[_0x4b4b8f(0x56f)][_0x10879f][0x63],_0x9af996=this[_0x4b4b8f(0x9af)]()['params'][_0x451f9f][0x62];return _0x53150d+(_0x53150d-_0x9af996)*(this[_0x4b4b8f(0x95a)]-0x63);}else return _0x309abf[_0x4b4b8f(0x604)]-0.05;}else return _0x309abf[_0x4b4b8f(0x604)];}else{if(this[_0x4b4b8f(0x214)]())return _0x309abf['mev'];else{if(_0x4b4b8f(0x257)==='IjfZQ')return 0x0;else this[_0x4b4b8f(0x230)]='CTB';}}},VisuMZ[_0x526668(0x6a7)]['Game_Action_updateLastTarget']=Game_Action['prototype'][_0x526668(0x2cf)],Game_Action[_0x526668(0x4aa)][_0x526668(0x2cf)]=function(_0x585e9){const _0x1f01fe=_0x526668;VisuMZ[_0x1f01fe(0x6a7)][_0x1f01fe(0x814)]['call'](this,_0x585e9);if(VisuMZ['CoreEngine'][_0x1f01fe(0x7c3)][_0x1f01fe(0x622)][_0x1f01fe(0x3b1)])return;const _0x305a85=_0x585e9[_0x1f01fe(0x8e8)]();_0x305a85[_0x1f01fe(0x428)]&&(0x1-this[_0x1f01fe(0x219)](_0x585e9)>this[_0x1f01fe(0x5b2)](_0x585e9)&&(_0x305a85[_0x1f01fe(0x428)]=![],_0x305a85[_0x1f01fe(0x4f2)]=!![]));},VisuMZ[_0x526668(0x6a7)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x397)],Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x397)]=function(){const _0x428111=_0x526668;this[_0x428111(0x3cd)]={},VisuMZ[_0x428111(0x6a7)][_0x428111(0xa2a)][_0x428111(0x5f4)](this);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x9d3)]=Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x7f0)],Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x7f0)]=function(){const _0x22c4f4=_0x526668;this[_0x22c4f4(0x3cd)]={},VisuMZ[_0x22c4f4(0x6a7)][_0x22c4f4(0x9d3)][_0x22c4f4(0x5f4)](this);},Game_BattlerBase[_0x526668(0x4aa)]['checkCacheKey']=function(_0x33b385){const _0x31790b=_0x526668;return this[_0x31790b(0x3cd)]=this['_cache']||{},this[_0x31790b(0x3cd)][_0x33b385]!==undefined;},Game_BattlerBase[_0x526668(0x4aa)]['paramPlus']=function(_0x2c8efb){const _0x14ea9b=_0x526668,_0x566558=(_0x99f484,_0x6611b1)=>{const _0x501981=_0x5eef;if(_0x501981(0x37d)===_0x501981(0x37d)){if(!_0x6611b1)return _0x99f484;if(_0x6611b1[_0x501981(0x269)]['match'](VisuMZ[_0x501981(0x6a7)][_0x501981(0x60e)]['paramPlus'][_0x2c8efb])){var _0x32fd1b=Number(RegExp['$1']);_0x99f484+=_0x32fd1b;}if(_0x6611b1[_0x501981(0x269)][_0x501981(0x78d)](VisuMZ[_0x501981(0x6a7)][_0x501981(0x60e)]['paramPlusJS'][_0x2c8efb])){if(_0x501981(0x8c9)!==_0x501981(0x8c9))_0x54065c[_0x501981(0x6a7)]['Bitmap_resize']['call'](this,_0x395e4c,_0x4e3247),this[_0x501981(0xa16)]();else{var _0x36ee4d=String(RegExp['$1']);try{_0x99f484+=eval(_0x36ee4d);}catch(_0x3b60e6){if($gameTemp[_0x501981(0x767)]())console[_0x501981(0x642)](_0x3b60e6);}}}return _0x99f484;}else _0x113592[_0x501981(0x6a7)]['Scene_Battle_createSpriteset']['call'](this),_0x4f9bb4=this['_spriteset'];};return this['traitObjects']()[_0x14ea9b(0x557)](_0x566558,this[_0x14ea9b(0x6a0)][_0x2c8efb]);},Game_BattlerBase['prototype']['paramMax']=function(_0x1cd48f){const _0x4e7a8a=_0x526668;var _0x3fe835=_0x4e7a8a(0x68d)+(this[_0x4e7a8a(0x84f)]()?'Actor':'Enemy')+'ParamMax'+_0x1cd48f;if(this[_0x4e7a8a(0xa1f)](_0x3fe835))return this[_0x4e7a8a(0x3cd)][_0x3fe835];this[_0x4e7a8a(0x3cd)][_0x3fe835]=eval(VisuMZ[_0x4e7a8a(0x6a7)][_0x4e7a8a(0x7c3)][_0x4e7a8a(0x81d)][_0x3fe835]);const _0x14e1a4=(_0x2c4807,_0x1b7cac)=>{const _0x1b0b69=_0x4e7a8a;if(_0x1b0b69(0x83b)!==_0x1b0b69(0x3e2)){if(!_0x1b7cac)return _0x2c4807;if(_0x1b7cac[_0x1b0b69(0x269)]['match'](VisuMZ[_0x1b0b69(0x6a7)][_0x1b0b69(0x60e)][_0x1b0b69(0x60c)][_0x1cd48f])){var _0x4ec658=Number(RegExp['$1']);if(_0x4ec658===0x0)_0x4ec658=Number[_0x1b0b69(0x4c4)];_0x2c4807=Math['max'](_0x2c4807,_0x4ec658);}if(_0x1b7cac[_0x1b0b69(0x269)][_0x1b0b69(0x78d)](VisuMZ[_0x1b0b69(0x6a7)][_0x1b0b69(0x60e)]['paramMaxJS'][_0x1cd48f])){if(_0x1b0b69(0x5f9)!=='hrFvb')return this[_0x1b0b69(0x521)]()?this[_0x1b0b69(0x590)]():0x0;else{var _0x59da5a=String(RegExp['$1']);try{_0x2c4807=Math[_0x1b0b69(0x431)](_0x2c4807,Number(eval(_0x59da5a)));}catch(_0x1d6ed3){if($gameTemp[_0x1b0b69(0x767)]())console[_0x1b0b69(0x642)](_0x1d6ed3);}}}return _0x2c4807;}else{const _0xf15332=_0x5f297d[_0x1b0b69(0x6a7)]['Settings'][_0x1b0b69(0x884)];this['_coreEngineShakeStyle']=_0xf15332?.['DefaultStyle']||_0x1b0b69(0x941);}};if(this[_0x4e7a8a(0x3cd)][_0x3fe835]===0x0)this[_0x4e7a8a(0x3cd)][_0x3fe835]=Number[_0x4e7a8a(0x4c4)];return this['_cache'][_0x3fe835]=this[_0x4e7a8a(0x72c)]()[_0x4e7a8a(0x557)](_0x14e1a4,this[_0x4e7a8a(0x3cd)][_0x3fe835]),this['_cache'][_0x3fe835];},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x7d4)]=function(_0x8f49ee){const _0x484b6f=_0x526668,_0x58f3e7=this[_0x484b6f(0x9a0)](Game_BattlerBase[_0x484b6f(0xa0d)],_0x8f49ee),_0x45d05a=(_0x20771a,_0x56d9b0)=>{const _0x198545=_0x484b6f;if('muKMS'===_0x198545(0x336)){if(!_0x56d9b0)return _0x20771a;if(_0x56d9b0[_0x198545(0x269)][_0x198545(0x78d)](VisuMZ[_0x198545(0x6a7)][_0x198545(0x60e)]['paramRate1'][_0x8f49ee])){var _0x583fd6=Number(RegExp['$1'])/0x64;_0x20771a*=_0x583fd6;}if(_0x56d9b0['note'][_0x198545(0x78d)](VisuMZ[_0x198545(0x6a7)][_0x198545(0x60e)]['paramRate2'][_0x8f49ee])){if(_0x198545(0x94a)==='govxI')return _0x571a67(_0x129bb8)[_0x198545(0x67c)](_0x3489f6,_0x298ba1)+'.';else{var _0x583fd6=Number(RegExp['$1']);_0x20771a*=_0x583fd6;}}if(_0x56d9b0['note'][_0x198545(0x78d)](VisuMZ[_0x198545(0x6a7)][_0x198545(0x60e)]['paramRateJS'][_0x8f49ee])){if('mMdPc'!==_0x198545(0x445)){var _0x52d791=String(RegExp['$1']);try{if(_0x198545(0x62e)!=='vWrCC')_0x20771a*=eval(_0x52d791);else return _0x5bab9e[_0x198545(0x50c)]()||_0x20b3a9['areButtonsHidden']()?_0x2b41fa[_0x198545(0x6a7)]['Settings'][_0x198545(0x680)][_0x198545(0x958)]:'button';}catch(_0x310d97){if($gameTemp[_0x198545(0x767)]())console['log'](_0x310d97);}}else _0x1c6eb4['CoreEngine']['Settings'][_0x198545(0x622)][_0x198545(0x6dc)]?this[_0x198545(0x8fe)](_0x470b3a,_0x296b6a,_0x760927,_0x5c188b):_0xf886a9[_0x198545(0x6a7)][_0x198545(0xa23)][_0x198545(0x5f4)](this,_0x1c4d95,_0x3935d1,_0x4555b1,_0x48d759);}return _0x20771a;}else{const _0x106466=_0xf1f544[_0x198545(0x6a7)][_0x198545(0x7c3)][_0x198545(0x41b)];return this[_0x198545(0x8b5)][_0x198545(0x391)]===_0x198545(0x751)?_0x106466[_0x198545(0x540)]||_0x198545(0x540):_0x106466[_0x198545(0x51b)]||_0x198545(0x51b);}};return this[_0x484b6f(0x72c)]()['reduce'](_0x45d05a,_0x58f3e7);},Game_BattlerBase[_0x526668(0x4aa)]['paramFlatBonus']=function(_0x228a68){const _0x4a24cb=_0x526668,_0x4073ad=(_0x35b007,_0x511c4b)=>{const _0x3f3be4=_0x5eef;if(!_0x511c4b)return _0x35b007;if(_0x511c4b[_0x3f3be4(0x269)][_0x3f3be4(0x78d)](VisuMZ[_0x3f3be4(0x6a7)][_0x3f3be4(0x60e)][_0x3f3be4(0x5cd)][_0x228a68])){var _0x1b681b=Number(RegExp['$1']);_0x35b007+=_0x1b681b;}if(_0x511c4b[_0x3f3be4(0x269)][_0x3f3be4(0x78d)](VisuMZ[_0x3f3be4(0x6a7)][_0x3f3be4(0x60e)]['paramFlatJS'][_0x228a68])){if('rffpy'===_0x3f3be4(0x2f8))return this[_0x3f3be4(0x297)]()['hit']+0.05;else{var _0x20453b=String(RegExp['$1']);try{if('NcOTx'===_0x3f3be4(0x333))_0x35b007+=eval(_0x20453b);else{this[_0x3f3be4(0x83d)]++;let _0x26a2f2=_0x3c03b8[_0x3f3be4(0x6a7)][_0x3f3be4(0x61d)](_0x5d3957[_0x3f3be4(0x9ae)]);_0x26a2f2[_0x3f3be4(0x5f3)]>0x0&&(_0x2b58ac+=_0x546306,_0x57281c+=_0x547c32,_0x58d6f8+=_0x3f3be4(0x92b)[_0x3f3be4(0xa0a)](_0x32275b['id'],_0x42f43d['name']),_0x4297f7+=_0x4dc1b4,_0x150d7b+=_0x26a2f2,_0x221fc6+=_0x12ee8d,_0xfabc87+=_0x3f3be4(0x873)[_0x3f3be4(0xa0a)](_0x49650d['id'],_0xbb22e7['name']),_0x104a81+=_0x34a25b),this[_0x3f3be4(0x83d)]--;}}catch(_0x4ca2d9){if('mopYJ'===_0x3f3be4(0x73e)){if(this['x']===0x0)this['x']=_0x3b61d9[_0x3f3be4(0x746)](_0x472674[_0x3f3be4(0x745)]/0x2);if(this['y']===0x0)this['y']=_0xc34ecf[_0x3f3be4(0x746)](_0x160c77[_0x3f3be4(0x36a)]/0x2);}else{if($gameTemp['isPlaytest']())console[_0x3f3be4(0x642)](_0x4ca2d9);}}}}return _0x35b007;};return this[_0x4a24cb(0x72c)]()[_0x4a24cb(0x557)](_0x4073ad,0x0);},Game_BattlerBase['prototype'][_0x526668(0x613)]=function(_0x525ffa){const _0x42853b=_0x526668;let _0x37536b=_0x42853b(0x613)+_0x525ffa+_0x42853b(0x76c);if(this[_0x42853b(0xa1f)](_0x37536b))return this['_cache'][_0x37536b];return this['_cache'][_0x37536b]=Math[_0x42853b(0x746)](VisuMZ[_0x42853b(0x6a7)][_0x42853b(0x7c3)]['Param'][_0x42853b(0x831)][_0x42853b(0x5f4)](this,_0x525ffa)),this[_0x42853b(0x3cd)][_0x37536b];},Game_BattlerBase['prototype'][_0x526668(0x381)]=function(_0x5375c4){const _0x1e8483=_0x526668,_0x5915e5=(_0xd2b78f,_0x1234e8)=>{const _0x149058=_0x5eef;if(!_0x1234e8)return _0xd2b78f;if(_0x1234e8['note'][_0x149058(0x78d)](VisuMZ[_0x149058(0x6a7)][_0x149058(0x60e)]['xparamPlus1'][_0x5375c4])){var _0x356a99=Number(RegExp['$1'])/0x64;_0xd2b78f+=_0x356a99;}if(_0x1234e8[_0x149058(0x269)][_0x149058(0x78d)](VisuMZ['CoreEngine'][_0x149058(0x60e)]['xparamPlus2'][_0x5375c4])){var _0x356a99=Number(RegExp['$1']);_0xd2b78f+=_0x356a99;}if(_0x1234e8[_0x149058(0x269)][_0x149058(0x78d)](VisuMZ['CoreEngine'][_0x149058(0x60e)]['xparamPlusJS'][_0x5375c4])){var _0x12850b=String(RegExp['$1']);try{if('DtGYJ'!=='DtGYJ'){if(_0x72b5c1)this[_0x149058(0x2d6)](_0x3798cd);_0x233bf0[_0x149058(0x6a7)][_0x149058(0x40d)][_0x149058(0x5f4)](this,_0x7e21f2);}else _0xd2b78f+=eval(_0x12850b);}catch(_0x546102){if($gameTemp['isPlaytest']())console[_0x149058(0x642)](_0x546102);}}return _0xd2b78f;};return this[_0x1e8483(0x72c)]()[_0x1e8483(0x557)](_0x5915e5,0x0);},Game_BattlerBase[_0x526668(0x4aa)]['xparamRate']=function(_0xecd272){const _0x3fe954=_0x526668,_0x2f9309=(_0x29b965,_0xef173c)=>{const _0x13a671=_0x5eef;if(!_0xef173c)return _0x29b965;if(_0xef173c[_0x13a671(0x269)][_0x13a671(0x78d)](VisuMZ[_0x13a671(0x6a7)][_0x13a671(0x60e)][_0x13a671(0x42f)][_0xecd272])){if(_0x13a671(0x553)!==_0x13a671(0x553))_0x2cf7d6['setEasingType'](_0x268db3);else{var _0x1a0984=Number(RegExp['$1'])/0x64;_0x29b965*=_0x1a0984;}}if(_0xef173c['note'][_0x13a671(0x78d)](VisuMZ[_0x13a671(0x6a7)][_0x13a671(0x60e)][_0x13a671(0x67f)][_0xecd272])){var _0x1a0984=Number(RegExp['$1']);_0x29b965*=_0x1a0984;}if(_0xef173c['note'][_0x13a671(0x78d)](VisuMZ['CoreEngine'][_0x13a671(0x60e)][_0x13a671(0x6a1)][_0xecd272])){if(_0x13a671(0x480)!=='QiQpk'){var _0x478ae4=String(RegExp['$1']);try{if('qNovk'==='qNovk')_0x29b965*=eval(_0x478ae4);else{if(this[_0x13a671(0x8d2)][_0x13a671(0x8fd)[_0x13a671(0xa0a)](_0x50c113)]!==_0x38ac15[_0x13a671(0x74b)['format'](_0x1001f0)]())return this[_0x13a671(0x7f0)]();if(this[_0x13a671(0x8d2)]['text%1'[_0x13a671(0xa0a)](_0x17186e)]!==_0x4b22e5['buttonAssistText%1'[_0x13a671(0xa0a)](_0x4e9ec3)]())return this[_0x13a671(0x7f0)]();}}catch(_0x4e0d55){if($gameTemp[_0x13a671(0x767)]())console['log'](_0x4e0d55);}}else return![];}return _0x29b965;};return this['traitObjects']()[_0x3fe954(0x557)](_0x2f9309,0x1);},Game_BattlerBase[_0x526668(0x4aa)]['xparamFlatBonus']=function(_0x481f60){const _0x4d57cb=_0x526668,_0x14cb4a=(_0xc969f6,_0x686588)=>{const _0x207930=_0x5eef;if('RpBKT'!==_0x207930(0x619)){var _0x2a3d09=_0x92fcd1(_0x45a68a['$1']);try{_0x113cd3+=_0x3ac5a7(_0x2a3d09);}catch(_0x276968){if(_0x3bdd0c[_0x207930(0x767)]())_0x59d93d['log'](_0x276968);}}else{if(!_0x686588)return _0xc969f6;if(_0x686588[_0x207930(0x269)][_0x207930(0x78d)](VisuMZ[_0x207930(0x6a7)][_0x207930(0x60e)]['xparamFlat1'][_0x481f60])){var _0x49487a=Number(RegExp['$1'])/0x64;_0xc969f6+=_0x49487a;}if(_0x686588[_0x207930(0x269)][_0x207930(0x78d)](VisuMZ[_0x207930(0x6a7)][_0x207930(0x60e)][_0x207930(0x6f9)][_0x481f60])){if('hLVBK'!=='BcWmy'){var _0x49487a=Number(RegExp['$1']);_0xc969f6+=_0x49487a;}else return![];}if(_0x686588[_0x207930(0x269)][_0x207930(0x78d)](VisuMZ[_0x207930(0x6a7)][_0x207930(0x60e)][_0x207930(0x6bb)][_0x481f60])){var _0x144d94=String(RegExp['$1']);try{_0xc969f6+=eval(_0x144d94);}catch(_0x34d6e6){if($gameTemp['isPlaytest']())console[_0x207930(0x642)](_0x34d6e6);}}return _0xc969f6;}};return this[_0x4d57cb(0x72c)]()[_0x4d57cb(0x557)](_0x14cb4a,0x0);},Game_BattlerBase['prototype'][_0x526668(0x86e)]=function(_0x47cfe6){const _0x369f6a=_0x526668;let _0x2e3aa4=_0x369f6a(0x86e)+_0x47cfe6+'Total';if(this[_0x369f6a(0xa1f)](_0x2e3aa4))return this[_0x369f6a(0x3cd)][_0x2e3aa4];return this[_0x369f6a(0x3cd)][_0x2e3aa4]=VisuMZ[_0x369f6a(0x6a7)][_0x369f6a(0x7c3)][_0x369f6a(0x81d)][_0x369f6a(0x3b0)]['call'](this,_0x47cfe6),this[_0x369f6a(0x3cd)][_0x2e3aa4];},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x251)]=function(_0x295e5b){const _0x2f7473=_0x526668,_0x230d24=(_0x3dbe1c,_0x301aa3)=>{const _0x4b2414=_0x5eef;if(!_0x301aa3)return _0x3dbe1c;if(_0x301aa3[_0x4b2414(0x269)][_0x4b2414(0x78d)](VisuMZ['CoreEngine'][_0x4b2414(0x60e)][_0x4b2414(0x6df)][_0x295e5b])){if(_0x4b2414(0x909)===_0x4b2414(0x909)){var _0x73d153=Number(RegExp['$1'])/0x64;_0x3dbe1c+=_0x73d153;}else _0x4fb814+=_0x4b2414(0x67d);}if(_0x301aa3[_0x4b2414(0x269)]['match'](VisuMZ[_0x4b2414(0x6a7)][_0x4b2414(0x60e)][_0x4b2414(0x505)][_0x295e5b])){var _0x73d153=Number(RegExp['$1']);_0x3dbe1c+=_0x73d153;}if(_0x301aa3[_0x4b2414(0x269)][_0x4b2414(0x78d)](VisuMZ[_0x4b2414(0x6a7)][_0x4b2414(0x60e)][_0x4b2414(0x877)][_0x295e5b])){var _0x3f5c55=String(RegExp['$1']);try{_0x3dbe1c+=eval(_0x3f5c55);}catch(_0x422ce5){if($gameTemp[_0x4b2414(0x767)]())console[_0x4b2414(0x642)](_0x422ce5);}}return _0x3dbe1c;};return this[_0x2f7473(0x72c)]()[_0x2f7473(0x557)](_0x230d24,0x0);},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x422)]=function(_0xfbf9f2){const _0x94777f=_0x526668,_0x55a6e1=(_0xc24386,_0x4f8619)=>{const _0x547707=_0x5eef;if(!_0x4f8619)return _0xc24386;if(_0x4f8619[_0x547707(0x269)][_0x547707(0x78d)](VisuMZ[_0x547707(0x6a7)][_0x547707(0x60e)][_0x547707(0x78f)][_0xfbf9f2])){var _0x21d433=Number(RegExp['$1'])/0x64;_0xc24386*=_0x21d433;}if(_0x4f8619[_0x547707(0x269)][_0x547707(0x78d)](VisuMZ[_0x547707(0x6a7)]['RegExp']['sparamRate2'][_0xfbf9f2])){var _0x21d433=Number(RegExp['$1']);_0xc24386*=_0x21d433;}if(_0x4f8619[_0x547707(0x269)]['match'](VisuMZ[_0x547707(0x6a7)][_0x547707(0x60e)][_0x547707(0x720)][_0xfbf9f2])){var _0x1d1586=String(RegExp['$1']);try{if('gfnEX'!==_0x547707(0x62f))_0xc24386*=eval(_0x1d1586);else{const _0x573065='_stored_expGaugeColor2';this[_0x547707(0x435)]=this[_0x547707(0x435)]||{};if(this[_0x547707(0x435)][_0x573065])return this['_colorCache'][_0x573065];const _0xab94a9=_0x45e6de['CoreEngine'][_0x547707(0x7c3)][_0x547707(0x42a)]['ColorExpGauge2'];return this[_0x547707(0x9f5)](_0x573065,_0xab94a9);}}catch(_0x37ce98){if($gameTemp[_0x547707(0x767)]())console['log'](_0x37ce98);}}return _0xc24386;};return this[_0x94777f(0x72c)]()[_0x94777f(0x557)](_0x55a6e1,0x1);},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x7ff)]=function(_0x14055b){const _0x5b51b8=_0x526668,_0x1aaf71=(_0x4dd19e,_0x2834ee)=>{const _0x1360d0=_0x5eef;if(!_0x2834ee)return _0x4dd19e;if(_0x2834ee[_0x1360d0(0x269)][_0x1360d0(0x78d)](VisuMZ[_0x1360d0(0x6a7)]['RegExp'][_0x1360d0(0x4c3)][_0x14055b])){if(_0x1360d0(0x5d7)===_0x1360d0(0x5d7)){var _0x121dda=Number(RegExp['$1'])/0x64;_0x4dd19e+=_0x121dda;}else this[_0x1360d0(0x474)][_0x1360d0(0x529)](_0x3d1f06[_0x1360d0(0x298)][_0x1360d0(0x304)]);}if(_0x2834ee[_0x1360d0(0x269)][_0x1360d0(0x78d)](VisuMZ[_0x1360d0(0x6a7)][_0x1360d0(0x60e)][_0x1360d0(0x6b2)][_0x14055b])){var _0x121dda=Number(RegExp['$1']);_0x4dd19e+=_0x121dda;}if(_0x2834ee['note'][_0x1360d0(0x78d)](VisuMZ['CoreEngine'][_0x1360d0(0x60e)][_0x1360d0(0x611)][_0x14055b])){var _0x5be1d8=String(RegExp['$1']);try{_0x4dd19e+=eval(_0x5be1d8);}catch(_0x3f52a3){if(_0x1360d0(0x345)!==_0x1360d0(0x345))_0x233441['CoreEngine'][_0x1360d0(0x9dd)]['call'](this,_0x52e197,_0x1e4f9e,_0x2baa34),_0xb89af8[_0x1360d0(0x7c5)](![]);else{if($gameTemp['isPlaytest']())console[_0x1360d0(0x642)](_0x3f52a3);}}}return _0x4dd19e;};return this['traitObjects']()[_0x5b51b8(0x557)](_0x1aaf71,0x0);},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x393)]=function(_0x3f8d74){const _0x1568a7=_0x526668;let _0x1b1fb2=_0x1568a7(0x393)+_0x3f8d74+_0x1568a7(0x76c);if(this['checkCacheKey'](_0x1b1fb2))return this[_0x1568a7(0x3cd)][_0x1b1fb2];return this[_0x1568a7(0x3cd)][_0x1b1fb2]=VisuMZ[_0x1568a7(0x6a7)]['Settings']['Param'][_0x1568a7(0x85a)][_0x1568a7(0x5f4)](this,_0x3f8d74),this[_0x1568a7(0x3cd)][_0x1b1fb2];},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x31a)]=function(_0x4962b9,_0x2e1448){const _0x13fca3=_0x526668;if(typeof paramId===_0x13fca3(0x347))return this[_0x13fca3(0x613)](_0x4962b9);_0x4962b9=String(_0x4962b9||'')[_0x13fca3(0x4b5)]();if(_0x4962b9===_0x13fca3(0x644))return this['param'](0x0);if(_0x4962b9===_0x13fca3(0x54f))return this[_0x13fca3(0x613)](0x1);if(_0x4962b9===_0x13fca3(0x840))return this[_0x13fca3(0x613)](0x2);if(_0x4962b9===_0x13fca3(0x8c5))return this[_0x13fca3(0x613)](0x3);if(_0x4962b9==='MAT')return this[_0x13fca3(0x613)](0x4);if(_0x4962b9===_0x13fca3(0x2fc))return this[_0x13fca3(0x613)](0x5);if(_0x4962b9===_0x13fca3(0x6c1))return this[_0x13fca3(0x613)](0x6);if(_0x4962b9===_0x13fca3(0x59f))return this[_0x13fca3(0x613)](0x7);if(_0x4962b9===_0x13fca3(0x543))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x86e)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x4962b9===_0x13fca3(0x7ef))return _0x2e1448?String(Math[_0x13fca3(0x746)](this['xparam'](0x1)*0x64))+'%':this[_0x13fca3(0x86e)](0x1);if(_0x4962b9===_0x13fca3(0x934))return _0x2e1448?String(Math[_0x13fca3(0x746)](this['xparam'](0x2)*0x64))+'%':this[_0x13fca3(0x86e)](0x2);if(_0x4962b9===_0x13fca3(0x51a))return _0x2e1448?String(Math['round'](this[_0x13fca3(0x86e)](0x3)*0x64))+'%':this[_0x13fca3(0x86e)](0x3);if(_0x4962b9===_0x13fca3(0x643))return _0x2e1448?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x13fca3(0x86e)](0x4);if(_0x4962b9===_0x13fca3(0x325))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x86e)](0x5)*0x64))+'%':this[_0x13fca3(0x86e)](0x5);if(_0x4962b9===_0x13fca3(0x95f))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x86e)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x4962b9===_0x13fca3(0x734))return _0x2e1448?String(Math['round'](this[_0x13fca3(0x86e)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x4962b9===_0x13fca3(0x5ab))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x86e)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x4962b9===_0x13fca3(0x61f))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x86e)](0x9)*0x64))+'%':this[_0x13fca3(0x86e)](0x9);if(_0x4962b9==='TGR')return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x0)*0x64))+'%':this[_0x13fca3(0x393)](0x0);if(_0x4962b9===_0x13fca3(0x92c))return _0x2e1448?String(Math[_0x13fca3(0x746)](this['sparam'](0x1)*0x64))+'%':this[_0x13fca3(0x393)](0x1);if(_0x4962b9===_0x13fca3(0x9e4))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x2)*0x64))+'%':this[_0x13fca3(0x393)](0x2);if(_0x4962b9===_0x13fca3(0x839))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x3)*0x64))+'%':this[_0x13fca3(0x393)](0x3);if(_0x4962b9==='MCR')return _0x2e1448?String(Math[_0x13fca3(0x746)](this['sparam'](0x4)*0x64))+'%':this[_0x13fca3(0x393)](0x4);if(_0x4962b9===_0x13fca3(0x80e))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x4962b9===_0x13fca3(0x7cc))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x6)*0x64))+'%':this[_0x13fca3(0x393)](0x6);if(_0x4962b9===_0x13fca3(0x92a))return _0x2e1448?String(Math[_0x13fca3(0x746)](this['sparam'](0x7)*0x64))+'%':this[_0x13fca3(0x393)](0x7);if(_0x4962b9===_0x13fca3(0x33a))return _0x2e1448?String(Math[_0x13fca3(0x746)](this[_0x13fca3(0x393)](0x8)*0x64))+'%':this[_0x13fca3(0x393)](0x8);if(_0x4962b9===_0x13fca3(0x998))return _0x2e1448?String(Math['round'](this[_0x13fca3(0x393)](0x9)*0x64))+'%':this[_0x13fca3(0x393)](0x9);if(VisuMZ['CoreEngine'][_0x13fca3(0x3c7)][_0x4962b9]){if('swsrP'===_0x13fca3(0x596))return _0x3f0b55[_0x13fca3(0x298)][_0x13fca3(0x639)]['call'](this);else{const _0x7a74d4=VisuMZ['CoreEngine'][_0x13fca3(0x3c7)][_0x4962b9],_0x36fa1c=this[_0x7a74d4];return VisuMZ['CoreEngine'][_0x13fca3(0x31d)][_0x4962b9]===_0x13fca3(0x956)?_0x36fa1c:_0x2e1448?String(Math[_0x13fca3(0x746)](_0x36fa1c*0x64))+'%':_0x36fa1c;}}return'';},Game_BattlerBase[_0x526668(0x4aa)][_0x526668(0x344)]=function(){const _0x244dfa=_0x526668;return this['isAlive']()&&this[_0x244dfa(0x861)]<this['mhp']*VisuMZ[_0x244dfa(0x6a7)]['Settings'][_0x244dfa(0x81d)]['CrisisRate'];},Game_Battler['prototype']['performMiss']=function(){const _0x38ce84=_0x526668;SoundManager[_0x38ce84(0x4d9)](),this['requestMotion'](_0x38ce84(0x623));},VisuMZ[_0x526668(0x6a7)]['Game_Actor_paramBase']=Game_Actor[_0x526668(0x4aa)]['paramBase'],Game_Actor[_0x526668(0x4aa)][_0x526668(0x341)]=function(_0x32cee1){const _0x310ae8=_0x526668;if(this['level']>0x63)return this[_0x310ae8(0x3e1)](_0x32cee1);return VisuMZ[_0x310ae8(0x6a7)][_0x310ae8(0x602)][_0x310ae8(0x5f4)](this,_0x32cee1);},Game_Actor[_0x526668(0x4aa)]['paramBaseAboveLevel99']=function(_0x351098){const _0x548f6f=_0x526668,_0xcb2c40=this['currentClass']()[_0x548f6f(0x56f)][_0x351098][0x63],_0x10d135=this[_0x548f6f(0x9af)]()['params'][_0x351098][0x62];return _0xcb2c40+(_0xcb2c40-_0x10d135)*(this[_0x548f6f(0x95a)]-0x63);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x34e)]=Game_Actor[_0x526668(0x4aa)][_0x526668(0x8ad)],Game_Actor[_0x526668(0x4aa)][_0x526668(0x8ad)]=function(_0x4f581a,_0x6384f5){const _0x3f83ca=_0x526668;$gameTemp[_0x3f83ca(0x2b0)]=!![],VisuMZ[_0x3f83ca(0x6a7)][_0x3f83ca(0x34e)][_0x3f83ca(0x5f4)](this,_0x4f581a,_0x6384f5),$gameTemp[_0x3f83ca(0x2b0)]=undefined;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x744)]=Game_Actor[_0x526668(0x4aa)][_0x526668(0x412)],Game_Actor[_0x526668(0x4aa)][_0x526668(0x412)]=function(){const _0x3e6dd2=_0x526668;VisuMZ[_0x3e6dd2(0x6a7)]['Game_Actor_levelUp'][_0x3e6dd2(0x5f4)](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor[_0x526668(0x4aa)][_0x526668(0x8c0)]=function(){const _0x2fe3a7=_0x526668;this[_0x2fe3a7(0x3cd)]={};if(VisuMZ['CoreEngine'][_0x2fe3a7(0x7c3)][_0x2fe3a7(0x622)][_0x2fe3a7(0x66e)])this[_0x2fe3a7(0x861)]=this['mhp'];if(VisuMZ[_0x2fe3a7(0x6a7)]['Settings'][_0x2fe3a7(0x622)][_0x2fe3a7(0xa2f)])this['_mp']=this[_0x2fe3a7(0x84c)];},Game_Actor['prototype'][_0x526668(0x312)]=function(){const _0x33f0a9=_0x526668;if(this[_0x33f0a9(0x45d)]())return 0x1;const _0x585f9f=this[_0x33f0a9(0x6de)]()-this['currentLevelExp'](),_0x1cd626=this[_0x33f0a9(0xa14)]()-this[_0x33f0a9(0x95b)]();return(_0x1cd626/_0x585f9f)['clamp'](0x0,0x1);},Game_Actor[_0x526668(0x4aa)][_0x526668(0x72c)]=function(){const _0x5908b9=_0x526668,_0x139ead=Game_Battler[_0x5908b9(0x4aa)][_0x5908b9(0x72c)][_0x5908b9(0x5f4)](this);for(const _0x2001f4 of this[_0x5908b9(0xa3b)]()){_0x5908b9(0x465)==='jOjKH'?_0x2001f4&&_0x139ead[_0x5908b9(0x3ec)](_0x2001f4):this['cursorUp'](_0x1d5e31[_0x5908b9(0x72b)]('up'));}return _0x139ead[_0x5908b9(0x3ec)](this[_0x5908b9(0x9af)](),this[_0x5908b9(0x6ff)]()),_0x139ead;},Object[_0x526668(0x4b7)](Game_Enemy[_0x526668(0x4aa)],_0x526668(0x95a),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy['prototype'][_0x526668(0x46a)]=function(){const _0x4e83b3=_0x526668;return this[_0x4e83b3(0x679)]()[_0x4e83b3(0x95a)];},Game_Enemy[_0x526668(0x4aa)]['moveRelativeToResolutionChange']=function(){const _0x50ccdc=_0x526668;if(!this['_repositioned']){if(_0x50ccdc(0x94d)!==_0x50ccdc(0x418)){this[_0x50ccdc(0x53f)]+=Math['round']((Graphics[_0x50ccdc(0x36a)]-0x270)/0x2),this[_0x50ccdc(0x53f)]-=Math[_0x50ccdc(0x749)]((Graphics[_0x50ccdc(0x36a)]-Graphics[_0x50ccdc(0x8ec)])/0x2);if($gameSystem[_0x50ccdc(0x551)]()){if('uyXMp'!==_0x50ccdc(0x9f1)){if(this[_0x50ccdc(0x95a)]>0x63)return this['paramBaseAboveLevel99'](_0x322ea5);return _0x553f32[_0x50ccdc(0x6a7)][_0x50ccdc(0x602)]['call'](this,_0x4a31e7);}else this[_0x50ccdc(0x7f2)]-=Math[_0x50ccdc(0x749)]((Graphics[_0x50ccdc(0x745)]-Graphics['boxWidth'])/0x2);}else{if(_0x50ccdc(0x2fa)===_0x50ccdc(0x215))return _0x9e0d76['layoutSettings'][_0x50ccdc(0x8ba)]['call'](this);else this[_0x50ccdc(0x7f2)]+=Math[_0x50ccdc(0x746)]((Graphics[_0x50ccdc(0x9e1)]-0x330)/0x2);}}else return _0x516a70=_0x4096a3['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5d95a3,_0x1eafac)=>_0x53ce47(_0x4eb07a(_0x1eafac))),_0x274d10;}this[_0x50ccdc(0x322)]=!![];},Game_Party[_0x526668(0x4aa)][_0x526668(0x296)]=function(){const _0x1602b5=_0x526668;return VisuMZ['CoreEngine'][_0x1602b5(0x7c3)][_0x1602b5(0x691)]['GoldMax'];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x901)]=Game_Party[_0x526668(0x4aa)][_0x526668(0x2c3)],Game_Party[_0x526668(0x4aa)][_0x526668(0x2c3)]=function(_0x3b13ab){const _0x5e0b0e=_0x526668;if(VisuMZ[_0x5e0b0e(0x6a7)][_0x5e0b0e(0x7c3)]['QoL'][_0x5e0b0e(0x8e7)]&&DataManager[_0x5e0b0e(0x3d8)](_0x3b13ab))return;VisuMZ['CoreEngine'][_0x5e0b0e(0x901)][_0x5e0b0e(0x5f4)](this,_0x3b13ab);},Game_Party[_0x526668(0x4aa)]['setupBattleTestItems']=function(){const _0x5d93fb=_0x526668,_0x1fba73=VisuMZ[_0x5d93fb(0x6a7)]['Settings'][_0x5d93fb(0x622)],_0x58881f=_0x1fba73[_0x5d93fb(0x5e0)]??0x63;let _0x51938f=[];(_0x1fba73[_0x5d93fb(0x4f9)]??!![])&&(_0x51938f=_0x51938f['concat']($dataItems));(_0x1fba73[_0x5d93fb(0x3f9)]??!![])&&(_0x51938f=_0x51938f[_0x5d93fb(0x303)]($dataWeapons));(_0x1fba73[_0x5d93fb(0x1fd)]??!![])&&(_0x51938f=_0x51938f[_0x5d93fb(0x303)]($dataArmors));for(const _0x29d4f5 of _0x51938f){if(_0x5d93fb(0x2bf)!==_0x5d93fb(0x2bf))_0x1305b1[_0x5d93fb(0x6a7)][_0x5d93fb(0x979)]['call'](this,_0x1afc97,_0x222a8a),this['_smooth']=!(_0x489104[_0x5d93fb(0x6a7)][_0x5d93fb(0x7c3)][_0x5d93fb(0x622)]['PixelateImageRendering']??!![]);else{if(!_0x29d4f5)continue;if(_0x29d4f5[_0x5d93fb(0x3c6)][_0x5d93fb(0x4a6)]()<=0x0)continue;if(_0x29d4f5['name']['match'](/-----/i))continue;this['gainItem'](_0x29d4f5,_0x58881f);}}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop[_0x526668(0x4aa)][_0x526668(0x822)],Game_Troop[_0x526668(0x4aa)]['setup']=function(_0x5ab5c6){const _0x4414d0=_0x526668;$gameTemp[_0x4414d0(0x982)](),$gameTemp[_0x4414d0(0x4b6)](_0x5ab5c6),VisuMZ[_0x4414d0(0x6a7)]['Game_Troop_setup'][_0x4414d0(0x5f4)](this,_0x5ab5c6);},VisuMZ[_0x526668(0x6a7)]['Game_Map_setup']=Game_Map[_0x526668(0x4aa)]['setup'],Game_Map[_0x526668(0x4aa)][_0x526668(0x822)]=function(_0x45beb9){const _0x2b23f6=_0x526668;VisuMZ[_0x2b23f6(0x6a7)][_0x2b23f6(0x9ec)][_0x2b23f6(0x5f4)](this,_0x45beb9),this['setupCoreEngine'](_0x45beb9);},Game_Map[_0x526668(0x4aa)]['setupCoreEngine']=function(){const _0x3ed38c=_0x526668;this[_0x3ed38c(0x24e)]=VisuMZ['CoreEngine'][_0x3ed38c(0x7c3)][_0x3ed38c(0x622)][_0x3ed38c(0x6d7)]||![];if($dataMap&&$dataMap[_0x3ed38c(0x269)]){if($dataMap[_0x3ed38c(0x269)][_0x3ed38c(0x78d)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x3ed38c(0x269)][_0x3ed38c(0x78d)](/<HIDE TILE SHADOWS>/i))this[_0x3ed38c(0x24e)]=!![];}},Game_Map[_0x526668(0x4aa)][_0x526668(0x276)]=function(){const _0x34df86=_0x526668;if(this[_0x34df86(0x24e)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x7d3)]=Game_Character['prototype']['processMoveCommand'],Game_Character['prototype']['processMoveCommand']=function(_0xd97383){const _0x4838d8=_0x526668;try{if('EnmBM'!=='CFvhU')VisuMZ[_0x4838d8(0x6a7)]['Game_Character_processMoveCommand'][_0x4838d8(0x5f4)](this,_0xd97383);else{this['_inputSpecialKeyCode']=_0x1f840b[_0x4838d8(0x4cc)];let _0xa960cb=_0x202eb1[_0x4838d8(0x9ed)](_0x4e89ee['charCode']);this['_inputString']===_0x2d2144?this['_inputString']=_0xa960cb:this[_0x4838d8(0x9f9)]+=_0xa960cb;}}catch(_0x10bb3c){if(_0x4838d8(0x3b7)===_0x4838d8(0x624))return 0x0;else{if($gameTemp[_0x4838d8(0x767)]())console[_0x4838d8(0x642)](_0x10bb3c);}}},Game_Player['prototype'][_0x526668(0x2ca)]=function(){const _0xca340a=_0x526668,_0x5bf487=$gameMap[_0xca340a(0x5ea)]();this['_encounterCount']=Math[_0xca340a(0x479)](_0x5bf487)+Math['randomInt'](_0x5bf487)+this[_0xca340a(0xa26)]();},Game_Player['prototype'][_0x526668(0xa26)]=function(){const _0x1159f9=_0x526668;return $dataMap&&$dataMap['note']&&$dataMap[_0x1159f9(0x269)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x1159f9(0x6a7)][_0x1159f9(0x7c3)][_0x1159f9(0x622)]['EncounterRateMinimum'];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x792)]=Game_Event['prototype'][_0x526668(0x821)],Game_Event[_0x526668(0x4aa)]['isCollidedWithEvents']=function(_0x392998,_0x1f4c21){const _0x44c422=_0x526668;if(this[_0x44c422(0x6e8)]()){if(_0x44c422(0xa11)!==_0x44c422(0x49f))return this[_0x44c422(0x949)](_0x392998,_0x1f4c21);else{const _0x201b85=_0x7ed039[_0x44c422(0x452)]();if(_0x201b85)for(const _0xd64cec of _0x201b85){if(_0xd64cec&&_0xd64cec['connected'])return!![];}}}else{if(_0x44c422(0x6a9)!==_0x44c422(0x74d))return VisuMZ['CoreEngine'][_0x44c422(0x792)][_0x44c422(0x5f4)](this,_0x392998,_0x1f4c21);else this['_sideButtonLayout']=_0x3f8d01;}},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x14763f=_0x526668;return VisuMZ[_0x14763f(0x6a7)][_0x14763f(0x7c3)][_0x14763f(0x622)][_0x14763f(0x1fa)];},Game_Event[_0x526668(0x4aa)][_0x526668(0x949)]=function(_0x5ec978,_0x3d89f9){const _0x321e48=_0x526668;if(!this[_0x321e48(0x22a)]())return _0x321e48(0x2f2)==='dIeLk'?_0x88f66d[_0x321e48(0x6a7)][_0x321e48(0x3bb)]['call'](this,_0x257f5f):![];else{const _0x19b615=$gameMap[_0x321e48(0x748)](_0x5ec978,_0x3d89f9)[_0x321e48(0x4d8)](_0x66bb1f=>_0x66bb1f['isNormalPriority']());return _0x19b615[_0x321e48(0x5f3)]>0x0;}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x243)]=Game_Interpreter['prototype'][_0x526668(0x473)],Game_Interpreter['prototype']['command105']=function(_0xadcfde){const _0x2bcfe9=_0x526668,_0x560ef1=this[_0x2bcfe9(0x28f)]();return _0x560ef1[_0x2bcfe9(0x78d)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2bcfe9(0x359)](_0x560ef1):VisuMZ[_0x2bcfe9(0x6a7)][_0x2bcfe9(0x243)][_0x2bcfe9(0x5f4)](this,_0xadcfde);},Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x28f)]=function(){const _0x8f3d13=_0x526668;let _0x130577='',_0x5f4dee=this['_index']+0x1;while(this[_0x8f3d13(0x5e5)][_0x5f4dee]&&this[_0x8f3d13(0x5e5)][_0x5f4dee][_0x8f3d13(0x3d4)]===0x195){_0x8f3d13(0x600)==='TdQMG'?(_0x130577+=this[_0x8f3d13(0x5e5)][_0x5f4dee]['parameters'][0x0]+'\x0a',_0x5f4dee++):this['_itemWindow'][_0x8f3d13(0x529)](_0xf9f12c['layoutSettings'][_0x8f3d13(0x4ec)]);}return _0x130577;},Game_Interpreter['prototype'][_0x526668(0x359)]=function(_0x4e3eb8){const _0x14699a=_0x526668;try{if(_0x14699a(0x355)==='avTnk')eval(_0x4e3eb8);else{_0x3096eb=_0x4a9605(_0x8676a9)[_0x14699a(0x4b5)]();const _0x5e82a8=_0x3f2f30['CoreEngine'][_0x14699a(0x7c3)][_0x14699a(0x81d)];if(_0x35e305===_0x14699a(0x644))return _0x5e82a8[_0x14699a(0x86a)];if(_0x416e78===_0x14699a(0x54f))return _0x5e82a8[_0x14699a(0x9a7)];if(_0x599c61==='ATK')return _0x5e82a8[_0x14699a(0x6f6)];if(_0x129170==='DEF')return _0x5e82a8[_0x14699a(0x49e)];if(_0x2d7040===_0x14699a(0x8e9))return _0x5e82a8['IconParam4'];if(_0x5531d0===_0x14699a(0x2fc))return _0x5e82a8['IconParam5'];if(_0x35a748===_0x14699a(0x6c1))return _0x5e82a8[_0x14699a(0x9c6)];if(_0x123685===_0x14699a(0x59f))return _0x5e82a8[_0x14699a(0x50f)];if(_0x3ea3e7===_0x14699a(0x543))return _0x5e82a8[_0x14699a(0x865)];if(_0x197769===_0x14699a(0x7ef))return _0x5e82a8[_0x14699a(0x987)];if(_0x5833b8===_0x14699a(0x934))return _0x5e82a8[_0x14699a(0x454)];if(_0x5ac484===_0x14699a(0x51a))return _0x5e82a8['IconXParam3'];if(_0x584567===_0x14699a(0x643))return _0x5e82a8[_0x14699a(0x61c)];if(_0xb0ec71==='MRF')return _0x5e82a8[_0x14699a(0x3af)];if(_0x32d934===_0x14699a(0x95f))return _0x5e82a8[_0x14699a(0x850)];if(_0x40821e==='HRG')return _0x5e82a8[_0x14699a(0x354)];if(_0x3fced2===_0x14699a(0x5ab))return _0x5e82a8[_0x14699a(0x707)];if(_0x344f86==='TRG')return _0x5e82a8[_0x14699a(0x601)];if(_0x5d4dc6===_0x14699a(0x212))return _0x5e82a8[_0x14699a(0x22c)];if(_0x373a7f===_0x14699a(0x92c))return _0x5e82a8[_0x14699a(0x463)];if(_0x94474e===_0x14699a(0x9e4))return _0x5e82a8[_0x14699a(0x3e0)];if(_0x15032d==='PHA')return _0x5e82a8[_0x14699a(0x636)];if(_0x37ee5d===_0x14699a(0x4bd))return _0x5e82a8[_0x14699a(0x562)];if(_0x283e34==='TCR')return _0x5e82a8[_0x14699a(0x930)];if(_0x123d9b===_0x14699a(0x7cc))return _0x5e82a8[_0x14699a(0x855)];if(_0x3134c4===_0x14699a(0x92a))return _0x5e82a8[_0x14699a(0x6f5)];if(_0x68baa8===_0x14699a(0x33a))return _0x5e82a8['IconSParam8'];if(_0x3bf08c==='EXR')return _0x5e82a8['IconSParam9'];if(_0x23205d[_0x14699a(0x6a7)][_0x14699a(0x92f)][_0x5b47f9])return _0x36a3d0[_0x14699a(0x6a7)]['CustomParamIcons'][_0x1132b5]||0x0;return 0x0;}}catch(_0x1c517f){$gameTemp[_0x14699a(0x767)]()&&(console[_0x14699a(0x642)](_0x14699a(0x788)),console[_0x14699a(0x642)](_0x1c517f));}return!![];},VisuMZ['CoreEngine'][_0x526668(0x617)]=Game_Interpreter['prototype'][_0x526668(0x2f1)],Game_Interpreter['prototype'][_0x526668(0x2f1)]=function(_0x37ec57){const _0x3c1aa3=_0x526668;try{_0x3c1aa3(0x731)===_0x3c1aa3(0x731)?VisuMZ[_0x3c1aa3(0x6a7)][_0x3c1aa3(0x617)][_0x3c1aa3(0x5f4)](this,_0x37ec57):(_0x3f2797[_0x3c1aa3(0x6a7)][_0x3c1aa3(0x8bf)][_0x3c1aa3(0x5f4)](this),this['destroyCoreEngineMarkedBitmaps']());}catch(_0x5dff57){if(_0x3c1aa3(0x975)===_0x3c1aa3(0x9c7))return _0x3f5a53(_0x27cc1e['$1']);else $gameTemp[_0x3c1aa3(0x767)]()&&(console['log'](_0x3c1aa3(0x77e)),console[_0x3c1aa3(0x642)](_0x5dff57)),this[_0x3c1aa3(0x403)]();}return!![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x963)]=Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x6fa)],Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x6fa)]=function(_0x149f23){const _0x2a52e6=_0x526668;try{VisuMZ[_0x2a52e6(0x6a7)][_0x2a52e6(0x963)][_0x2a52e6(0x5f4)](this,_0x149f23);}catch(_0x2725b2){$gameTemp[_0x2a52e6(0x767)]()&&(console[_0x2a52e6(0x642)](_0x2a52e6(0x87a)),console[_0x2a52e6(0x642)](_0x2725b2));}return!![];},VisuMZ[_0x526668(0x6a7)]['Game_Interpreter_command355']=Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x32f)],Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x32f)]=function(){const _0x20166f=_0x526668;try{VisuMZ[_0x20166f(0x6a7)][_0x20166f(0x30a)][_0x20166f(0x5f4)](this);}catch(_0x5b256d){'CRIED'!==_0x20166f(0x598)?(_0x4765a0[_0x20166f(0x338)][0x57]='up',_0x558f8e[_0x20166f(0x338)][0x41]='left',_0x10ae52[_0x20166f(0x338)][0x53]=_0x20166f(0x8d6),_0x54255f[_0x20166f(0x338)][0x44]=_0x20166f(0x43b),_0x10efaa['keyMapper'][0x45]='pagedown'):$gameTemp[_0x20166f(0x767)]()&&(console[_0x20166f(0x642)](_0x20166f(0x9a4)),console[_0x20166f(0x642)](_0x5b256d));}return!![];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x9c2)]=Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x526)],Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x526)]=function(_0x3d2d1a){const _0x486ac9=_0x526668;return $gameTemp[_0x486ac9(0x41a)](this),VisuMZ[_0x486ac9(0x6a7)]['Game_Interpreter_PluginCommand'][_0x486ac9(0x5f4)](this,_0x3d2d1a);},Scene_Base[_0x526668(0x4aa)][_0x526668(0x585)]=function(){const _0x8c11ea=_0x526668;return VisuMZ[_0x8c11ea(0x6a7)][_0x8c11ea(0x7c3)]['UI']['FadeSpeed'];},Scene_Base[_0x526668(0x4aa)]['isBottomHelpMode']=function(){const _0x5280e9=_0x526668;return VisuMZ[_0x5280e9(0x6a7)][_0x5280e9(0x7c3)]['UI'][_0x5280e9(0x9cd)];},Scene_Base[_0x526668(0x4aa)][_0x526668(0x54a)]=function(){const _0x48e500=_0x526668;return VisuMZ['CoreEngine'][_0x48e500(0x7c3)]['UI'][_0x48e500(0x27f)];},Scene_Base['prototype'][_0x526668(0x6fb)]=function(){const _0x3a3a00=_0x526668;return VisuMZ['CoreEngine'][_0x3a3a00(0x7c3)]['UI'][_0x3a3a00(0x346)];},Scene_Base[_0x526668(0x4aa)][_0x526668(0x29d)]=function(){const _0x34da7e=_0x526668;return VisuMZ[_0x34da7e(0x6a7)][_0x34da7e(0x7c3)]['UI'][_0x34da7e(0x775)];},Scene_Base['prototype']['buttonAreaHeight']=function(){const _0x1062fa=_0x526668;return VisuMZ[_0x1062fa(0x6a7)][_0x1062fa(0x7c3)]['UI'][_0x1062fa(0x78e)];},Scene_Base['prototype'][_0x526668(0x7d6)]=function(){const _0x1e5c2f=_0x526668;return VisuMZ[_0x1e5c2f(0x6a7)][_0x1e5c2f(0x7c3)][_0x1e5c2f(0x2ae)]['EnableMasking'];},VisuMZ['CoreEngine'][_0x526668(0x966)]=Scene_Base[_0x526668(0x4aa)][_0x526668(0x7a3)],Scene_Base['prototype'][_0x526668(0x7a3)]=function(){const _0x209045=_0x526668;VisuMZ['CoreEngine'][_0x209045(0x966)][_0x209045(0x5f4)](this),this[_0x209045(0x5bc)](),this[_0x209045(0x5fe)]['x']=Math[_0x209045(0x746)](this['_windowLayer']['x']),this[_0x209045(0x5fe)]['y']=Math[_0x209045(0x746)](this[_0x209045(0x5fe)]['y']);},Scene_Base['prototype'][_0x526668(0x5bc)]=function(){},Scene_Base[_0x526668(0x4aa)][_0x526668(0x9bc)]=function(){const _0x4c86fc=_0x526668;return TextManager[_0x4c86fc(0x335)](_0x4c86fc(0x331),_0x4c86fc(0x280));},Scene_Base[_0x526668(0x4aa)]['buttonAssistKey2']=function(){const _0xd9a53d=_0x526668;return TextManager[_0xd9a53d(0x3ab)](_0xd9a53d(0x23f));},Scene_Base[_0x526668(0x4aa)][_0x526668(0x538)]=function(){const _0x5d2101=_0x526668;return TextManager['getInputButtonString'](_0x5d2101(0x5c0));},Scene_Base[_0x526668(0x4aa)][_0x526668(0x9fe)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x526668(0x4aa)][_0x526668(0x584)]=function(){const _0x459079=_0x526668;return TextManager[_0x459079(0x3ab)](_0x459079(0x3f3));},Scene_Base[_0x526668(0x4aa)]['buttonAssistText1']=function(){const _0x1553a2=_0x526668;if(this[_0x1553a2(0x2b1)]&&this[_0x1553a2(0x2b1)][_0x1553a2(0x2bc)])return TextManager[_0x1553a2(0x836)];else{if(_0x1553a2(0x57c)===_0x1553a2(0x21d)){const _0x405c3f=this[_0x1553a2(0x421)](),_0x1673a7=this[_0x1553a2(0x587)](_0x255776);this[_0x1553a2(0x9d7)](_0x405c3f,_0x1673a7,_0x3136ad),_0x4ce075++;}else return'';}},Scene_Base[_0x526668(0x4aa)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x526668(0x4aa)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x526668(0x4aa)][_0x526668(0x876)]=function(){const _0x47847c=_0x526668;return TextManager[_0x47847c(0x658)];},Scene_Base[_0x526668(0x4aa)][_0x526668(0x565)]=function(){const _0x31804=_0x526668;return TextManager[_0x31804(0x4c6)];},Scene_Base[_0x526668(0x4aa)][_0x526668(0x475)]=function(){return 0x0;},Scene_Base[_0x526668(0x4aa)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x526668(0x4aa)][_0x526668(0x227)]=function(){return 0x0;},Scene_Base['prototype'][_0x526668(0x77d)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x573)]=Scene_Boot[_0x526668(0x4aa)][_0x526668(0x7c6)],Scene_Boot[_0x526668(0x4aa)][_0x526668(0x7c6)]=function(){const _0x253a84=_0x526668;VisuMZ['CoreEngine'][_0x253a84(0x573)][_0x253a84(0x5f4)](this),this[_0x253a84(0x4db)]();},Scene_Boot[_0x526668(0x4aa)]['loadGameImagesCoreEngine']=function(){const _0x2db0bc=_0x526668,_0xedb39c=[_0x2db0bc(0x56c),_0x2db0bc(0x286),'battlebacks2',_0x2db0bc(0x8ee),'enemies',_0x2db0bc(0x408),_0x2db0bc(0x9b7),_0x2db0bc(0x2e6),'sv_actors',_0x2db0bc(0x55d),_0x2db0bc(0x93c),_0x2db0bc(0x287),_0x2db0bc(0x2fd),_0x2db0bc(0x936)];for(const _0x278e25 of _0xedb39c){const _0x188d84=VisuMZ[_0x2db0bc(0x6a7)][_0x2db0bc(0x7c3)][_0x2db0bc(0x5dc)][_0x278e25],_0x4bfc49=_0x2db0bc(0x669)[_0x2db0bc(0xa0a)](_0x278e25);for(const _0x49a71f of _0x188d84){ImageManager[_0x2db0bc(0x874)](_0x4bfc49,_0x49a71f);}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x5bf)]=Scene_Boot[_0x526668(0x4aa)][_0x526668(0x6ea)],Scene_Boot['prototype']['startNormalGame']=function(){const _0x44b5d1=_0x526668;Utils[_0x44b5d1(0x60f)](_0x44b5d1(0x26f))&&VisuMZ[_0x44b5d1(0x6a7)]['Settings']['QoL'][_0x44b5d1(0x774)]?this[_0x44b5d1(0x55a)]():VisuMZ[_0x44b5d1(0x6a7)][_0x44b5d1(0x5bf)][_0x44b5d1(0x5f4)](this);},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x55a)]=function(){DataManager['setupNewGame'](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x723)]=function(){const _0x1e9cdf=_0x526668,_0x22a165=$dataSystem[_0x1e9cdf(0x2ee)][_0x1e9cdf(0x517)],_0x3f5eb3=$dataSystem[_0x1e9cdf(0x2ee)][_0x1e9cdf(0x94b)],_0x154ba5=VisuMZ['CoreEngine'][_0x1e9cdf(0x7c3)]['UI'][_0x1e9cdf(0x503)];Graphics['boxWidth']=_0x22a165-_0x154ba5*0x2,Graphics[_0x1e9cdf(0x8ec)]=_0x3f5eb3-_0x154ba5*0x2,this[_0x1e9cdf(0x852)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x8cb)]=Scene_Boot['prototype']['updateDocumentTitle'],Scene_Boot[_0x526668(0x4aa)][_0x526668(0x953)]=function(){const _0xfb9d37=_0x526668;this[_0xfb9d37(0x91d)]()?this[_0xfb9d37(0x64c)]():VisuMZ['CoreEngine'][_0xfb9d37(0x8cb)][_0xfb9d37(0x5f4)](this);},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x91d)]=function(){const _0x50ce57=_0x526668;if(Scene_Title[_0x50ce57(0x2e7)]==='')return![];if(Scene_Title[_0x50ce57(0x2e7)]===_0x50ce57(0x848))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x50ce57(0x415))return![];return!![];},Scene_Boot[_0x526668(0x4aa)][_0x526668(0x64c)]=function(){const _0x52a837=_0x526668,_0x19969d=$dataSystem[_0x52a837(0x53c)],_0x103e64=Scene_Title[_0x52a837(0x2e7)]||'',_0x9d94ba=Scene_Title[_0x52a837(0x343)]||'',_0x1773be=VisuMZ[_0x52a837(0x6a7)][_0x52a837(0x7c3)]['MenuLayout']['Title'][_0x52a837(0x955)],_0x23a515=_0x1773be[_0x52a837(0xa0a)](_0x19969d,_0x103e64,_0x9d94ba);document['title']=_0x23a515;},Scene_Boot[_0x526668(0x4aa)]['determineSideButtonLayoutValid']=function(){const _0x19e8e0=_0x526668;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x19e8e0(0x771)]){if(_0x19e8e0(0x597)==='Sizaq')this[_0x19e8e0(0x984)][_0x19e8e0(0x529)](_0x56f731[_0x19e8e0(0x298)][_0x19e8e0(0x5ca)]);else{const _0x52e431=Graphics[_0x19e8e0(0x745)]-Graphics['boxWidth']-VisuMZ[_0x19e8e0(0x6a7)][_0x19e8e0(0x7c3)]['UI'][_0x19e8e0(0x503)]*0x2,_0x17a876=Sprite_Button[_0x19e8e0(0x4aa)][_0x19e8e0(0x646)]['call'](this)*0x4;if(_0x52e431>=_0x17a876)SceneManager[_0x19e8e0(0x508)](!![]);}}},Scene_Title[_0x526668(0x2e7)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)][_0x526668(0x5c3)][_0x526668(0x848)],Scene_Title[_0x526668(0x343)]=VisuMZ['CoreEngine'][_0x526668(0x7c3)][_0x526668(0x41e)][_0x526668(0x5c3)]['Version'],Scene_Title[_0x526668(0xa34)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x3fb)],VisuMZ[_0x526668(0x6a7)][_0x526668(0x786)]=Scene_Title[_0x526668(0x4aa)][_0x526668(0x758)],Scene_Title[_0x526668(0x4aa)][_0x526668(0x758)]=function(){const _0x74a26f=_0x526668;VisuMZ[_0x74a26f(0x6a7)][_0x74a26f(0x7c3)][_0x74a26f(0x41e)][_0x74a26f(0x5c3)][_0x74a26f(0x758)][_0x74a26f(0x5f4)](this);if(Scene_Title[_0x74a26f(0x2e7)]!==''&&Scene_Title[_0x74a26f(0x2e7)]!==_0x74a26f(0x848))this[_0x74a26f(0x650)]();if(Scene_Title[_0x74a26f(0x343)]!==''&&Scene_Title[_0x74a26f(0x343)]!=='0.00')this[_0x74a26f(0x830)]();},Scene_Title[_0x526668(0x4aa)]['drawGameSubtitle']=function(){const _0xa368f5=_0x526668;VisuMZ[_0xa368f5(0x6a7)][_0xa368f5(0x7c3)][_0xa368f5(0x41e)][_0xa368f5(0x5c3)][_0xa368f5(0x650)][_0xa368f5(0x5f4)](this);},Scene_Title[_0x526668(0x4aa)]['drawGameVersion']=function(){const _0x38289a=_0x526668;VisuMZ[_0x38289a(0x6a7)][_0x38289a(0x7c3)]['MenuLayout']['Title']['drawGameVersion']['call'](this);},Scene_Title['prototype'][_0x526668(0x284)]=function(){const _0x5f50ea=_0x526668;this[_0x5f50ea(0x279)]();const _0x3fe13d=$dataSystem[_0x5f50ea(0x898)][_0x5f50ea(0x7af)],_0x395b9c=this[_0x5f50ea(0x84d)]();this[_0x5f50ea(0x409)]=new Window_TitleCommand(_0x395b9c),this[_0x5f50ea(0x409)]['setBackgroundType'](_0x3fe13d);const _0x3d803a=this['commandWindowRect']();this[_0x5f50ea(0x409)]['move'](_0x3d803a['x'],_0x3d803a['y'],_0x3d803a[_0x5f50ea(0x745)],_0x3d803a[_0x5f50ea(0x36a)]),this[_0x5f50ea(0x99e)](this[_0x5f50ea(0x409)]);},Scene_Title[_0x526668(0x4aa)][_0x526668(0x7c2)]=function(){const _0x474f30=_0x526668;return this['_commandWindow']?this[_0x474f30(0x409)][_0x474f30(0x374)]():VisuMZ[_0x474f30(0x6a7)][_0x474f30(0x7c3)][_0x474f30(0x552)]['length'];},Scene_Title['prototype'][_0x526668(0x84d)]=function(){const _0x353171=_0x526668;return VisuMZ[_0x353171(0x6a7)][_0x353171(0x7c3)][_0x353171(0x41e)][_0x353171(0x5c3)][_0x353171(0x6b7)][_0x353171(0x5f4)](this);},Scene_Title['prototype']['createTitleButtons']=function(){const _0x38dd56=_0x526668;for(const _0x1d9d8b of Scene_Title[_0x38dd56(0xa34)]){if(_0x38dd56(0x3db)===_0x38dd56(0x7d9))for(const _0x2a1d9b of _0x30cf6a[_0x38dd56(0x21b)]){if(_0x2a1d9b[_0x38dd56(0x334)][_0x38dd56(0x5f4)](this)){const _0x4346d=_0x2a1d9b[_0x38dd56(0x6a5)];let _0x1a251c=_0x2a1d9b['TextStr'];if(['','Untitled']['includes'](_0x1a251c))_0x1a251c=_0x2a1d9b[_0x38dd56(0x478)][_0x38dd56(0x5f4)](this);const _0x438c1e=_0x2a1d9b[_0x38dd56(0x740)][_0x38dd56(0x5f4)](this),_0x274773=_0x2a1d9b['ExtJS'][_0x38dd56(0x5f4)](this);this[_0x38dd56(0x70c)](_0x1a251c,_0x4346d,_0x438c1e,_0x274773),this[_0x38dd56(0x54c)](_0x4346d,_0x2a1d9b[_0x38dd56(0x952)][_0x38dd56(0x670)](this,_0x274773));}}else{const _0x45b36f=new Sprite_TitlePictureButton(_0x1d9d8b);this[_0x38dd56(0x835)](_0x45b36f);}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x583)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x96f)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x96f)]=function(){const _0x3e7bbe=_0x526668;VisuMZ[_0x3e7bbe(0x6a7)]['Scene_Map_initialize'][_0x3e7bbe(0x5f4)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x3e7bbe(0x983)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x62a)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x41d)],Scene_Map['prototype'][_0x526668(0x41d)]=function(){const _0x3645ea=_0x526668;VisuMZ[_0x3645ea(0x6a7)]['Scene_Map_updateMainMultiply']['call'](this),$gameTemp[_0x3645ea(0x72e)]&&!$gameMessage[_0x3645ea(0x43a)]()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map['prototype'][_0x526668(0x971)]=function(){const _0x2d2aef=_0x526668;Scene_Message['prototype']['terminate'][_0x2d2aef(0x5f4)](this);if(!SceneManager['isNextScene'](Scene_Battle)){if(_0x2d2aef(0x2c6)==='JJnlh')return this[_0x2d2aef(0x4bf)]()?this[_0x2d2aef(0x255)][_0x2d2aef(0x763)](_0x4afba7):_0x45c225[_0x2d2aef(0x4aa)][_0x2d2aef(0x301)][_0x2d2aef(0x5f4)](this,_0x541652);else this['_spriteset'][_0x2d2aef(0x894)](),this[_0x2d2aef(0x236)][_0x2d2aef(0x944)](),this['_windowLayer'][_0x2d2aef(0x2bc)]=![],SceneManager[_0x2d2aef(0x30e)]();}$gameScreen[_0x2d2aef(0x53d)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x526668(0x946)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x686)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x686)]=function(){const _0x15f4fa=_0x526668;VisuMZ['CoreEngine'][_0x15f4fa(0x946)][_0x15f4fa(0x5f4)](this),SceneManager[_0x15f4fa(0x50c)]()&&this[_0x15f4fa(0x5be)]();},Scene_Map['prototype'][_0x526668(0x5be)]=function(){const _0x265d6d=_0x526668;this['_menuButton']['x']=Graphics[_0x265d6d(0x9e1)]+0x4;},VisuMZ[_0x526668(0x6a7)]['Scene_Map_updateScene']=Scene_Map[_0x526668(0x4aa)][_0x526668(0x4d5)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x4d5)]=function(){const _0x4dfa97=_0x526668;VisuMZ[_0x4dfa97(0x6a7)][_0x4dfa97(0x992)]['call'](this),this[_0x4dfa97(0x224)]();},Scene_Map[_0x526668(0x4aa)][_0x526668(0x224)]=function(){const _0x2c03bb=_0x526668;Input['isTriggered'](_0x2c03bb(0x80a))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x2c03bb(0x6f1)],ConfigManager[_0x2c03bb(0x427)]());},VisuMZ[_0x526668(0x6a7)][_0x526668(0x81b)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x66c)],Scene_Map['prototype'][_0x526668(0x66c)]=function(){const _0x51a859=_0x526668;VisuMZ[_0x51a859(0x6a7)][_0x51a859(0x81b)][_0x51a859(0x5f4)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x526668(0x4aa)][_0x526668(0x983)]=function(){const _0x252629=_0x526668;this[_0x252629(0x65a)]=[];},Scene_Map[_0x526668(0x4aa)][_0x526668(0x701)]=function(){const _0x3bf6cb=_0x526668;if(!this[_0x3bf6cb(0x65a)])return;for(const _0x39bcce of this[_0x3bf6cb(0x65a)]){if(_0x3bf6cb(0x7f3)==='bFxuw')return _0x49f06d[_0x3bf6cb(0x51b)]||_0x3bf6cb(0x51b);else _0x39bcce&&_0x39bcce[_0x3bf6cb(0x894)]();}},Scene_Map[_0x526668(0x4aa)][_0x526668(0x7be)]=function(_0x24df28){const _0x54ef11=_0x526668,_0x5507d1=$dataCommonEvents[_0x24df28];if(!_0x5507d1)return;const _0x3d329b=new Game_OnceParallelInterpreter();this[_0x54ef11(0x6f3)](_0x3d329b),_0x3d329b[_0x54ef11(0x931)](_0x24df28);},Scene_Map['prototype'][_0x526668(0x6f3)]=function(_0x3b817c){const _0x540c4f=_0x526668;this[_0x540c4f(0x65a)]=this['_onceParallelInterpreters']||[],this[_0x540c4f(0x65a)][_0x540c4f(0x3ec)](_0x3b817c);},Scene_Map[_0x526668(0x4aa)][_0x526668(0x3c9)]=function(_0x3a1642){const _0x544331=_0x526668;this[_0x544331(0x65a)]=this[_0x544331(0x65a)]||[],this[_0x544331(0x65a)][_0x544331(0x74e)](_0x3a1642);};function Game_OnceParallelInterpreter(){const _0x5f9823=_0x526668;this[_0x5f9823(0x96f)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x526668(0x32e)](Game_Interpreter[_0x526668(0x4aa)]),Game_OnceParallelInterpreter['prototype'][_0x526668(0x330)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x526668(0x4aa)]['setCommonEvent']=function(_0x474df9){const _0x536ea6=_0x526668,_0x357b31=$dataCommonEvents[_0x474df9];if(_0x357b31)_0x536ea6(0x65f)==='jNVIf'?_0x1fc5cc[_0x536ea6(0x718)][_0x536ea6(0x5f4)](this,_0x2f5978):this[_0x536ea6(0x822)](_0x357b31[_0x536ea6(0x9ae)],0x0);else{if(_0x536ea6(0x782)!==_0x536ea6(0x782))return!![];else this[_0x536ea6(0x971)]();}},Game_OnceParallelInterpreter[_0x526668(0x4aa)][_0x526668(0x971)]=function(){const _0x326de9=_0x526668;if(!SceneManager['isSceneMap']())return;SceneManager[_0x326de9(0x807)][_0x326de9(0x3c9)](this),Game_Interpreter[_0x326de9(0x4aa)]['terminate'][_0x326de9(0x5f4)](this);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x721)]=Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x6d6)],Scene_MenuBase['prototype'][_0x526668(0x6d6)]=function(){const _0x448062=_0x526668;let _0x32116b=0x0;SceneManager[_0x448062(0x450)]()?_0x32116b=this[_0x448062(0x895)]():_0x32116b=VisuMZ[_0x448062(0x6a7)][_0x448062(0x721)][_0x448062(0x5f4)](this);if(this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()===_0x448062(0x38b)){if(_0x448062(0x5f2)!==_0x448062(0x5f2)){if(_0x2c19ad[_0x448062(0x767)]())_0x378681['log'](_0x448062(0x9ee)[_0x448062(0xa0a)](_0x3d6056));}else _0x32116b+=Window_ButtonAssist[_0x448062(0x4aa)][_0x448062(0x367)]();}return _0x32116b;},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x895)]=function(){const _0xf78847=_0x526668;if(this[_0xf78847(0x521)]()){if(_0xf78847(0x2ef)!==_0xf78847(0x3cf))return this[_0xf78847(0x590)]();else _0xa88d98['CoreEngine'][_0xf78847(0xa00)][_0xf78847(0x5f4)](this),this['setCoreEngineUpdateWindowBg']();}else return 0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x45f)],Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x45f)]=function(){const _0x47e1e8=_0x526668;if(SceneManager[_0x47e1e8(0x450)]()){if(_0x47e1e8(0x862)===_0x47e1e8(0x862))return this[_0x47e1e8(0x6ae)]();else this[_0x47e1e8(0x255)][_0x47e1e8(0x996)]+=0x6;}else return VisuMZ[_0x47e1e8(0x6a7)][_0x47e1e8(0x9b9)][_0x47e1e8(0x5f4)](this);},Scene_MenuBase['prototype'][_0x526668(0x6ae)]=function(){const _0x46cdca=_0x526668;if(!this[_0x46cdca(0x521)]()){if(_0x46cdca(0x6fd)===_0x46cdca(0xa0c))this['_clickHandler']&&this[_0x46cdca(0x9d0)]();else return this[_0x46cdca(0x530)]();}else{if(_0x46cdca(0x23d)===_0x46cdca(0x23d))return 0x0;else this[_0x46cdca(0x2ad)](_0x46cdca(0x751));}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3e3)]=Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x735)],Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x735)]=function(){const _0x20fbb8=_0x526668;let _0xdd56dd=0x0;return SceneManager[_0x20fbb8(0x450)]()?_0x20fbb8(0x97d)!==_0x20fbb8(0x97d)?_0x499f89=(0x1-_0x5dc0d9(_0x5df166['$1']))*-_0x4eef72:_0xdd56dd=this['mainAreaHeightSideButtonLayout']():_0xdd56dd=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']['call'](this),this[_0x20fbb8(0x4d2)]()&&this[_0x20fbb8(0x922)]()!=='button'&&(_0xdd56dd-=Window_ButtonAssist[_0x20fbb8(0x4aa)][_0x20fbb8(0x367)]()),_0xdd56dd;},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x7ed)]=function(){const _0xed8e22=_0x526668;return Graphics[_0xed8e22(0x8ec)]-this['helpAreaHeight']();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x663)]=Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x96e)],Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x96e)]=function(){const _0x226c54=_0x526668;this[_0x226c54(0x76d)]=new PIXI['filters'][(_0x226c54(0x20d))](clamp=!![]),this[_0x226c54(0x8f5)]=new Sprite(),this[_0x226c54(0x8f5)][_0x226c54(0xa29)]=SceneManager[_0x226c54(0x3a3)](),this[_0x226c54(0x8f5)][_0x226c54(0x85f)]=[this[_0x226c54(0x76d)]],this[_0x226c54(0x835)](this['_backgroundSprite']),this['setBackgroundOpacity'](0xc0),this[_0x226c54(0x9f4)](this['getBackgroundOpacity']()),this[_0x226c54(0x976)]();},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x978)]=function(){const _0x1365bd=_0x526668,_0x57ca58=String(this[_0x1365bd(0x330)]['name']),_0x113d94=this[_0x1365bd(0x451)](_0x57ca58);if(_0x113d94)return _0x1365bd(0x4fb)===_0x1365bd(0x3d0)?_0xbba4ee:_0x113d94[_0x1365bd(0x797)];else{if(_0x1365bd(0x27c)!==_0x1365bd(0x27c)){if(_0xef8bf3[_0x1365bd(0x767)]())_0x5ab4dd['log'](_0x4504d1);}else return 0xc0;}},Scene_MenuBase['prototype'][_0x526668(0x976)]=function(){const _0x56a2d7=_0x526668,_0x253530=String(this['constructor'][_0x56a2d7(0x3c6)]),_0x3b3630=this[_0x56a2d7(0x451)](_0x253530);if(_0x3b3630&&(_0x3b3630['BgFilename1']!==''||_0x3b3630[_0x56a2d7(0x620)]!=='')){if(_0x56a2d7(0x42b)!==_0x56a2d7(0x42b)){var _0x2ec823=_0x5992de(_0x16658b['$1']);_0x203858*=_0x2ec823;}else this['_backSprite1']=new Sprite(ImageManager[_0x56a2d7(0x9d9)](_0x3b3630[_0x56a2d7(0x32b)])),this[_0x56a2d7(0x401)]=new Sprite(ImageManager[_0x56a2d7(0x2c4)](_0x3b3630[_0x56a2d7(0x620)])),this[_0x56a2d7(0x835)](this[_0x56a2d7(0x5f1)]),this[_0x56a2d7(0x835)](this[_0x56a2d7(0x401)]),this[_0x56a2d7(0x5f1)]['bitmap'][_0x56a2d7(0x4d7)](this['adjustSprite']['bind'](this,this[_0x56a2d7(0x5f1)])),this[_0x56a2d7(0x401)][_0x56a2d7(0xa29)][_0x56a2d7(0x4d7)](this[_0x56a2d7(0x92d)][_0x56a2d7(0x670)](this,this[_0x56a2d7(0x401)]));}},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x451)]=function(_0x185eaa){const _0x174226=_0x526668;return VisuMZ[_0x174226(0x6a7)][_0x174226(0x7c3)][_0x174226(0x3fd)][_0x185eaa]||VisuMZ['CoreEngine'][_0x174226(0x7c3)]['MenuBg'][_0x174226(0x3f7)];},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x92d)]=function(_0x559148){const _0x52e7cf=_0x526668;this[_0x52e7cf(0x717)](_0x559148),this['centerSprite'](_0x559148);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x682)]=Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x261)],Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x261)]=function(){const _0x5a2a94=_0x526668;VisuMZ[_0x5a2a94(0x6a7)][_0x5a2a94(0x682)][_0x5a2a94(0x5f4)](this),SceneManager['isSideButtonLayout']()&&this[_0x5a2a94(0x6ba)]();},Scene_MenuBase[_0x526668(0x4aa)]['moveCancelButtonSideButtonLayout']=function(){const _0x88f5a7=_0x526668;this[_0x88f5a7(0x8bc)]['x']=Graphics[_0x88f5a7(0x9e1)]+0x4;},VisuMZ[_0x526668(0x6a7)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x526668(0x4aa)]['createPageButtons'],Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x6b5)]=function(){const _0x6868f=_0x526668;VisuMZ[_0x6868f(0x6a7)]['Scene_MenuBase_createPageButtons'][_0x6868f(0x5f4)](this),SceneManager[_0x6868f(0x50c)]()&&('mqxhq'===_0x6868f(0x7f5)?_0x139e32[_0x6868f(0x7be)](_0x6df829):this['movePageButtonSideButtonLayout']());},Scene_MenuBase['prototype'][_0x526668(0x50b)]=function(){const _0x292203=_0x526668;this['_pageupButton']['x']=-0x1*(this['_pageupButton'][_0x292203(0x745)]+this[_0x292203(0x5c4)]['width']+0x8),this[_0x292203(0x5c4)]['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x526668(0x4aa)]['isMenuButtonAssistEnabled']=function(){const _0x39e407=_0x526668;return VisuMZ['CoreEngine'][_0x39e407(0x7c3)][_0x39e407(0x680)][_0x39e407(0x88f)];},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x922)]=function(){const _0x46a127=_0x526668;if(SceneManager[_0x46a127(0x50c)]()||SceneManager['areButtonsHidden']())return VisuMZ[_0x46a127(0x6a7)][_0x46a127(0x7c3)][_0x46a127(0x680)][_0x46a127(0x958)];else{if(_0x46a127(0x5da)!=='DHgAz')return'button';else _0x2a016b+='(\x5cd+)>';}},Scene_MenuBase['prototype'][_0x526668(0x5bc)]=function(){const _0xb02ab5=_0x526668;if(!this[_0xb02ab5(0x4d2)]())return;const _0x46e68a=this[_0xb02ab5(0x537)]();this[_0xb02ab5(0x555)]=new Window_ButtonAssist(_0x46e68a),this[_0xb02ab5(0x99e)](this[_0xb02ab5(0x555)]);},Scene_MenuBase[_0x526668(0x4aa)][_0x526668(0x537)]=function(){const _0x1d54ef=_0x526668;if(this[_0x1d54ef(0x922)]()===_0x1d54ef(0x44b)){if(_0x1d54ef(0xa22)!=='PihQn')this[_0x1d54ef(0x3a8)]();else return this[_0x1d54ef(0x510)]();}else{if(_0x1d54ef(0x21e)===_0x1d54ef(0x21e))return this[_0x1d54ef(0x76e)]();else{const _0x1cde50=(_0x4de4dc[_0x1d54ef(0x6a7)][_0x1d54ef(0x7c3)][_0x1d54ef(0x7ba)]||_0x1d54ef(0x9a5))[_0x1d54ef(0x4b5)]()[_0x1d54ef(0x4a6)]();return _0x1999c0[_0x1d54ef(0x6a7)][_0x1d54ef(0x3a7)](_0x1cde50);}}},Scene_MenuBase[_0x526668(0x4aa)]['buttonAssistWindowButtonRect']=function(){const _0x5aead5=_0x526668,_0x5e5761=ConfigManager[_0x5aead5(0x9ef)]?(Sprite_Button[_0x5aead5(0x4aa)][_0x5aead5(0x646)]()+0x6)*0x2:0x0,_0x18e36b=this[_0x5aead5(0x8c7)](),_0x190c67=Graphics[_0x5aead5(0x9e1)]-_0x5e5761*0x2,_0x59d575=this[_0x5aead5(0x507)]();return new Rectangle(_0x5e5761,_0x18e36b,_0x190c67,_0x59d575);},Scene_MenuBase['prototype']['buttonAssistWindowSideRect']=function(){const _0x4b36a5=_0x526668,_0x14970e=Graphics[_0x4b36a5(0x9e1)],_0x4d913c=Window_ButtonAssist[_0x4b36a5(0x4aa)][_0x4b36a5(0x367)](),_0x23e13e=0x0;let _0x485ed4=0x0;return this[_0x4b36a5(0x922)]()===_0x4b36a5(0x38b)?_0x485ed4=0x0:_0x485ed4=Graphics['boxHeight']-_0x4d913c,new Rectangle(_0x23e13e,_0x485ed4,_0x14970e,_0x4d913c);},Scene_Menu[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)]['MainMenu'],VisuMZ[_0x526668(0x6a7)]['Scene_Menu_create']=Scene_Menu[_0x526668(0x4aa)]['create'],Scene_Menu['prototype'][_0x526668(0x32e)]=function(){const _0x293798=_0x526668;VisuMZ[_0x293798(0x6a7)][_0x293798(0x90b)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x286e23=_0x526668;this[_0x286e23(0x409)]&&this[_0x286e23(0x409)][_0x286e23(0x529)](Scene_Menu[_0x286e23(0x298)][_0x286e23(0x365)]),this[_0x286e23(0x474)]&&this[_0x286e23(0x474)][_0x286e23(0x529)](Scene_Menu['layoutSettings'][_0x286e23(0x304)]),this[_0x286e23(0x984)]&&('biGWs'==='biGWs'?this[_0x286e23(0x984)]['setBackgroundType'](Scene_Menu[_0x286e23(0x298)]['StatusBgType']):_0x431f6c[_0x286e23(0x6a7)]['Window_NameInput_processHandling'][_0x286e23(0x5f4)](this));},Scene_Menu[_0x526668(0x4aa)][_0x526668(0x84d)]=function(){const _0x26626f=_0x526668;return Scene_Menu[_0x26626f(0x298)][_0x26626f(0x6b7)][_0x26626f(0x5f4)](this);},Scene_Menu[_0x526668(0x4aa)][_0x526668(0x9e8)]=function(){const _0x30b13a=_0x526668;return Scene_Menu[_0x30b13a(0x298)][_0x30b13a(0x455)][_0x30b13a(0x5f4)](this);},Scene_Menu[_0x526668(0x4aa)]['statusWindowRect']=function(){const _0x2360c6=_0x526668;return Scene_Menu[_0x2360c6(0x298)][_0x2360c6(0xa33)][_0x2360c6(0x5f4)](this);},Scene_Item[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)]['Settings'][_0x526668(0x41e)][_0x526668(0x627)],VisuMZ[_0x526668(0x6a7)][_0x526668(0xa00)]=Scene_Item[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Item[_0x526668(0x4aa)][_0x526668(0x32e)]=function(){const _0x18b7cb=_0x526668;VisuMZ[_0x18b7cb(0x6a7)][_0x18b7cb(0xa00)][_0x18b7cb(0x5f4)](this),this[_0x18b7cb(0x5ba)]();},Scene_Item[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x4b2b56=_0x526668;this[_0x4b2b56(0x9a2)]&&this[_0x4b2b56(0x9a2)][_0x4b2b56(0x529)](Scene_Item[_0x4b2b56(0x298)]['HelpBgType']);if(this[_0x4b2b56(0x3ff)]){if(_0x4b2b56(0x499)===_0x4b2b56(0x559))return _0x4fce79[_0x4b2b56(0x6a7)]['Settings'][_0x4b2b56(0x680)][_0x4b2b56(0x958)];else this[_0x4b2b56(0x3ff)][_0x4b2b56(0x529)](Scene_Item[_0x4b2b56(0x298)][_0x4b2b56(0x61b)]);}this[_0x4b2b56(0x776)]&&('ZLBRy'===_0x4b2b56(0x881)?this['makeCoreEngineCommandList']():this[_0x4b2b56(0x776)][_0x4b2b56(0x529)](Scene_Item[_0x4b2b56(0x298)][_0x4b2b56(0x4ec)]));if(this[_0x4b2b56(0x939)]){if('FOMeA'===_0x4b2b56(0x9b5))return _0x38989f['actor']()['canUse'](_0x4b0b91);else this['_actorWindow']['setBackgroundType'](Scene_Item[_0x4b2b56(0x298)][_0x4b2b56(0x228)]);}},Scene_Item[_0x526668(0x4aa)][_0x526668(0x802)]=function(){const _0x591c0f=_0x526668;return Scene_Item['layoutSettings'][_0x591c0f(0x213)]['call'](this);},Scene_Item[_0x526668(0x4aa)][_0x526668(0x795)]=function(){const _0x46d2f3=_0x526668;return Scene_Item['layoutSettings'][_0x46d2f3(0x63d)][_0x46d2f3(0x5f4)](this);},Scene_Item[_0x526668(0x4aa)][_0x526668(0x801)]=function(){const _0x533892=_0x526668;return Scene_Item['layoutSettings'][_0x533892(0x639)][_0x533892(0x5f4)](this);},Scene_Item[_0x526668(0x4aa)][_0x526668(0x661)]=function(){const _0x4d6948=_0x526668;return Scene_Item[_0x4d6948(0x298)]['ActorRect'][_0x4d6948(0x5f4)](this);},Scene_Skill[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)]['Settings'][_0x526668(0x41e)][_0x526668(0x39e)],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x526668(0x4aa)]['create'],Scene_Skill['prototype'][_0x526668(0x32e)]=function(){const _0x12190c=_0x526668;VisuMZ[_0x12190c(0x6a7)]['Scene_Skill_create'][_0x12190c(0x5f4)](this),this[_0x12190c(0x5ba)]();},Scene_Skill[_0x526668(0x4aa)]['setCoreEngineUpdateWindowBg']=function(){const _0x31fbd0=_0x526668;this['_helpWindow']&&('adfoM'===_0x31fbd0(0x25d)?this[_0x31fbd0(0x9a2)][_0x31fbd0(0x529)](Scene_Skill[_0x31fbd0(0x298)][_0x31fbd0(0x7b7)]):this[_0x31fbd0(0x3bf)]());this[_0x31fbd0(0x6ec)]&&this[_0x31fbd0(0x6ec)][_0x31fbd0(0x529)](Scene_Skill['layoutSettings'][_0x31fbd0(0x8e5)]);this['_statusWindow']&&this[_0x31fbd0(0x984)][_0x31fbd0(0x529)](Scene_Skill[_0x31fbd0(0x298)][_0x31fbd0(0x5ca)]);this[_0x31fbd0(0x776)]&&(_0x31fbd0(0x2e5)!==_0x31fbd0(0x2e5)?this[_0x31fbd0(0x8e0)]&&this[_0x31fbd0(0x8e0)][_0x31fbd0(0x529)](_0x90dd55[_0x31fbd0(0x298)][_0x31fbd0(0x96b)]):this[_0x31fbd0(0x776)]['setBackgroundType'](Scene_Skill[_0x31fbd0(0x298)]['ItemBgType']));if(this[_0x31fbd0(0x939)]){if(_0x31fbd0(0x90a)!==_0x31fbd0(0x90a))return _0x12908b[_0x31fbd0(0x6a7)]['Settings']['UI'][_0x31fbd0(0x9cd)];else this[_0x31fbd0(0x939)][_0x31fbd0(0x529)](Scene_Skill[_0x31fbd0(0x298)][_0x31fbd0(0x228)]);}},Scene_Skill[_0x526668(0x4aa)]['helpWindowRect']=function(){const _0x322c01=_0x526668;return Scene_Skill[_0x322c01(0x298)][_0x322c01(0x213)][_0x322c01(0x5f4)](this);},Scene_Skill[_0x526668(0x4aa)][_0x526668(0x533)]=function(){const _0x210c6e=_0x526668;return Scene_Skill[_0x210c6e(0x298)]['SkillTypeRect'][_0x210c6e(0x5f4)](this);},Scene_Skill[_0x526668(0x4aa)][_0x526668(0x702)]=function(){const _0x324a23=_0x526668;return Scene_Skill[_0x324a23(0x298)]['StatusRect'][_0x324a23(0x5f4)](this);},Scene_Skill[_0x526668(0x4aa)]['itemWindowRect']=function(){const _0x706393=_0x526668;return Scene_Skill[_0x706393(0x298)][_0x706393(0x639)][_0x706393(0x5f4)](this);},Scene_Skill[_0x526668(0x4aa)][_0x526668(0x661)]=function(){const _0x44ec45=_0x526668;return Scene_Skill['layoutSettings'][_0x44ec45(0x57e)][_0x44ec45(0x5f4)](this);},Scene_Equip[_0x526668(0x298)]=VisuMZ['CoreEngine'][_0x526668(0x7c3)][_0x526668(0x41e)]['EquipMenu'],VisuMZ[_0x526668(0x6a7)]['Scene_Equip_create']=Scene_Equip[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Equip['prototype']['create']=function(){const _0x30f8cc=_0x526668;VisuMZ[_0x30f8cc(0x6a7)][_0x30f8cc(0x935)]['call'](this),this[_0x30f8cc(0x5ba)]();},Scene_Equip[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x180d07=_0x526668;this[_0x180d07(0x9a2)]&&(_0x180d07(0x5b1)!==_0x180d07(0x5b1)?(_0x445826+=_0x53083c(_0x49def2['$1']),_0x39ab5c+=_0x4ac632(_0xa4f80['$2'])):this[_0x180d07(0x9a2)][_0x180d07(0x529)](Scene_Equip[_0x180d07(0x298)]['HelpBgType']));if(this[_0x180d07(0x984)]){if(_0x180d07(0x289)===_0x180d07(0x289))this[_0x180d07(0x984)][_0x180d07(0x529)](Scene_Equip[_0x180d07(0x298)]['StatusBgType']);else{const _0x4bd891=this[_0x180d07(0x459)](_0x3cbb1e),_0x16cf61=_0x379c63[_0x180d07(0x6a7)][_0x180d07(0x7c3)][_0x180d07(0x81d)]['DisplayedParams'][_0x2f58a5],_0x503acb=_0x51a924[_0x180d07(0x613)](_0x16cf61),_0x4a374b=this[_0x180d07(0x568)][_0x180d07(0x31a)](_0x16cf61,!![]);this['drawParamText'](_0x4bd891['x'],_0x4bd891['y'],0xa0,_0x16cf61,![]),this[_0x180d07(0x485)](),this[_0x180d07(0x714)](_0x4a374b,_0x4bd891['x']+0xa0,_0x4bd891['y'],0x3c,_0x180d07(0x43b));}}this[_0x180d07(0x409)]&&(_0x180d07(0x892)===_0x180d07(0x892)?this[_0x180d07(0x409)][_0x180d07(0x529)](Scene_Equip[_0x180d07(0x298)][_0x180d07(0x365)]):this[_0x180d07(0x860)]=_0x5910c0),this[_0x180d07(0x8f0)]&&this['_slotWindow'][_0x180d07(0x529)](Scene_Equip[_0x180d07(0x298)][_0x180d07(0x851)]),this['_itemWindow']&&this[_0x180d07(0x776)]['setBackgroundType'](Scene_Equip[_0x180d07(0x298)][_0x180d07(0x4ec)]);},Scene_Equip['prototype'][_0x526668(0x802)]=function(){const _0x3aeb18=_0x526668;return Scene_Equip[_0x3aeb18(0x298)][_0x3aeb18(0x213)][_0x3aeb18(0x5f4)](this);},Scene_Equip[_0x526668(0x4aa)][_0x526668(0x702)]=function(){const _0x2bb07e=_0x526668;return Scene_Equip[_0x2bb07e(0x298)][_0x2bb07e(0xa33)][_0x2bb07e(0x5f4)](this);},Scene_Equip[_0x526668(0x4aa)]['commandWindowRect']=function(){const _0x1ee4d4=_0x526668;return Scene_Equip[_0x1ee4d4(0x298)][_0x1ee4d4(0x6b7)][_0x1ee4d4(0x5f4)](this);},Scene_Equip[_0x526668(0x4aa)][_0x526668(0x9c0)]=function(){return Scene_Equip['layoutSettings']['SlotRect']['call'](this);},Scene_Equip[_0x526668(0x4aa)]['itemWindowRect']=function(){const _0x1f3fab=_0x526668;return Scene_Equip[_0x1f3fab(0x298)][_0x1f3fab(0x639)]['call'](this);},Scene_Status['layoutSettings']=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)]['MenuLayout']['StatusMenu'],VisuMZ[_0x526668(0x6a7)][_0x526668(0x4f1)]=Scene_Status[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Status['prototype'][_0x526668(0x32e)]=function(){const _0x444b7c=_0x526668;VisuMZ[_0x444b7c(0x6a7)][_0x444b7c(0x4f1)]['call'](this),this[_0x444b7c(0x5ba)]();},Scene_Status[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x12293=_0x526668;this[_0x12293(0x648)]&&this[_0x12293(0x648)][_0x12293(0x529)](Scene_Status[_0x12293(0x298)]['ProfileBgType']);if(this[_0x12293(0x984)]){if(_0x12293(0x5b3)!==_0x12293(0x433))this[_0x12293(0x984)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x12293(0x5ca)]);else{const _0x39115e=this[_0x12293(0x62b)](),_0xf7814e=this['_tempActor']['paramValueByName'](_0x160feb),_0x24800f=_0xf7814e-this[_0x12293(0x568)][_0x12293(0x31a)](_0x3e9897);this[_0x12293(0x89c)](_0x5d4a46['paramchangeTextColor'](_0x24800f)),this[_0x12293(0x714)](this[_0x12293(0x594)][_0x12293(0x31a)](_0x22de32,!![]),_0x3cf729,_0x57d7f9,_0x39115e,_0x12293(0x43b));}}if(this[_0x12293(0x203)]){if(_0x12293(0x5f8)==='UXrrx')return 0x24;else this[_0x12293(0x203)][_0x12293(0x529)](Scene_Status[_0x12293(0x298)][_0x12293(0x9a9)]);}this[_0x12293(0xa04)]&&this['_statusEquipWindow'][_0x12293(0x529)](Scene_Status[_0x12293(0x298)]['StatusEquipBgType']);},Scene_Status[_0x526668(0x4aa)][_0x526668(0x45e)]=function(){const _0x1ddd64=_0x526668;return Scene_Status[_0x1ddd64(0x298)]['ProfileRect'][_0x1ddd64(0x5f4)](this);},Scene_Status[_0x526668(0x4aa)][_0x526668(0x702)]=function(){const _0xd9b444=_0x526668;return Scene_Status[_0xd9b444(0x298)][_0xd9b444(0xa33)]['call'](this);},Scene_Status[_0x526668(0x4aa)][_0x526668(0x3ee)]=function(){const _0x5b08e3=_0x526668;return Scene_Status[_0x5b08e3(0x298)][_0x5b08e3(0x654)][_0x5b08e3(0x5f4)](this);},Scene_Status[_0x526668(0x4aa)][_0x526668(0x65e)]=function(){const _0x1f412f=_0x526668;return Scene_Status[_0x1f412f(0x298)][_0x1f412f(0xa0e)][_0x1f412f(0x5f4)](this);},Scene_Options[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)]['OptionsMenu'],VisuMZ[_0x526668(0x6a7)][_0x526668(0x703)]=Scene_Options[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Options['prototype'][_0x526668(0x32e)]=function(){const _0x409fe7=_0x526668;VisuMZ['CoreEngine']['Scene_Options_create'][_0x409fe7(0x5f4)](this),this[_0x409fe7(0x5ba)]();},Scene_Options[_0x526668(0x4aa)]['setCoreEngineUpdateWindowBg']=function(){const _0x4b942e=_0x526668;this['_optionsWindow']&&this[_0x4b942e(0x8e0)][_0x4b942e(0x529)](Scene_Options[_0x4b942e(0x298)][_0x4b942e(0x96b)]);},Scene_Options['prototype']['optionsWindowRect']=function(){const _0x231825=_0x526668;return Scene_Options[_0x231825(0x298)][_0x231825(0x313)][_0x231825(0x5f4)](this);},Scene_Save[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)][_0x526668(0x235)],Scene_Save[_0x526668(0x4aa)][_0x526668(0x32e)]=function(){const _0x21d531=_0x526668;Scene_File['prototype']['create'][_0x21d531(0x5f4)](this),this[_0x21d531(0x5ba)]();},Scene_Save[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x4cf3df=_0x526668;this[_0x4cf3df(0x9a2)]&&(_0x4cf3df(0x5d6)!=='LIroT'?this[_0x4cf3df(0x9a2)][_0x4cf3df(0x529)](Scene_Save[_0x4cf3df(0x298)][_0x4cf3df(0x7b7)]):this[_0x4cf3df(0x255)][_0x4cf3df(0x996)]>=0x18&&(this['contents'][_0x4cf3df(0x996)]-=0x6)),this[_0x4cf3df(0x27d)]&&this['_listWindow'][_0x4cf3df(0x529)](Scene_Save[_0x4cf3df(0x298)][_0x4cf3df(0x82e)]);},Scene_Save['prototype']['helpWindowRect']=function(){const _0x1379d2=_0x526668;return Scene_Save[_0x1379d2(0x298)][_0x1379d2(0x213)]['call'](this);},Scene_Save[_0x526668(0x4aa)][_0x526668(0x7ec)]=function(){const _0x487c64=_0x526668;return Scene_Save[_0x487c64(0x298)][_0x487c64(0x928)][_0x487c64(0x5f4)](this);},Scene_Load[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)]['LoadMenu'],Scene_Load['prototype']['create']=function(){const _0x36ea88=_0x526668;Scene_File[_0x36ea88(0x4aa)][_0x36ea88(0x32e)][_0x36ea88(0x5f4)](this),this[_0x36ea88(0x5ba)]();},Scene_Load[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x549b19=_0x526668;this[_0x549b19(0x9a2)]&&this[_0x549b19(0x9a2)][_0x549b19(0x529)](Scene_Load[_0x549b19(0x298)]['HelpBgType']),this[_0x549b19(0x27d)]&&this[_0x549b19(0x27d)]['setBackgroundType'](Scene_Load[_0x549b19(0x298)][_0x549b19(0x82e)]);},Scene_Load['prototype'][_0x526668(0x802)]=function(){const _0x5b09be=_0x526668;return Scene_Load[_0x5b09be(0x298)]['HelpRect'][_0x5b09be(0x5f4)](this);},Scene_Load[_0x526668(0x4aa)][_0x526668(0x7ec)]=function(){const _0x1c0ac7=_0x526668;return Scene_Load[_0x1c0ac7(0x298)][_0x1c0ac7(0x928)][_0x1c0ac7(0x5f4)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x526668(0x6a7)]['Settings'][_0x526668(0x41e)][_0x526668(0x6d1)],VisuMZ[_0x526668(0x6a7)][_0x526668(0x7b3)]=Scene_GameEnd['prototype'][_0x526668(0x96e)],Scene_GameEnd[_0x526668(0x4aa)][_0x526668(0x96e)]=function(){const _0x455636=_0x526668;Scene_MenuBase['prototype'][_0x455636(0x96e)][_0x455636(0x5f4)](this);},Scene_GameEnd[_0x526668(0x4aa)][_0x526668(0x284)]=function(){const _0x12e49f=_0x526668,_0x1d4d84=this['commandWindowRect']();this[_0x12e49f(0x409)]=new Window_GameEnd(_0x1d4d84),this[_0x12e49f(0x409)][_0x12e49f(0x54c)](_0x12e49f(0x3f3),this[_0x12e49f(0x2dd)][_0x12e49f(0x670)](this)),this[_0x12e49f(0x99e)](this[_0x12e49f(0x409)]),this['_commandWindow']['setBackgroundType'](Scene_GameEnd[_0x12e49f(0x298)][_0x12e49f(0x365)]);},Scene_GameEnd[_0x526668(0x4aa)][_0x526668(0x84d)]=function(){const _0x227de8=_0x526668;return Scene_GameEnd[_0x227de8(0x298)][_0x227de8(0x6b7)][_0x227de8(0x5f4)](this);},Scene_Shop[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)][_0x526668(0x655)],VisuMZ[_0x526668(0x6a7)][_0x526668(0x461)]=Scene_Shop[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Shop[_0x526668(0x4aa)][_0x526668(0x32e)]=function(){const _0x43921c=_0x526668;VisuMZ[_0x43921c(0x6a7)][_0x43921c(0x461)][_0x43921c(0x5f4)](this),this[_0x43921c(0x5ba)]();},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x5ba)]=function(){const _0x2d1b1a=_0x526668;if(this[_0x2d1b1a(0x9a2)]){if(_0x2d1b1a(0x593)===_0x2d1b1a(0x593))this['_helpWindow'][_0x2d1b1a(0x529)](Scene_Shop['layoutSettings'][_0x2d1b1a(0x7b7)]);else return'';}this[_0x2d1b1a(0x474)]&&this[_0x2d1b1a(0x474)]['setBackgroundType'](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x304)]),this[_0x2d1b1a(0x409)]&&this[_0x2d1b1a(0x409)]['setBackgroundType'](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x365)]),this['_dummyWindow']&&this['_dummyWindow'][_0x2d1b1a(0x529)](Scene_Shop[_0x2d1b1a(0x298)]['DummyBgType']),this['_numberWindow']&&this[_0x2d1b1a(0x6ac)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x2d1b1a(0x36b)]),this[_0x2d1b1a(0x984)]&&this[_0x2d1b1a(0x984)][_0x2d1b1a(0x529)](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x5ca)]),this['_buyWindow']&&this[_0x2d1b1a(0x405)][_0x2d1b1a(0x529)](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x951)]),this[_0x2d1b1a(0x3ff)]&&this[_0x2d1b1a(0x3ff)]['setBackgroundType'](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x61b)]),this['_sellWindow']&&this['_sellWindow'][_0x2d1b1a(0x529)](Scene_Shop[_0x2d1b1a(0x298)][_0x2d1b1a(0x497)]);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x802)]=function(){const _0x2704e1=_0x526668;return Scene_Shop[_0x2704e1(0x298)][_0x2704e1(0x213)][_0x2704e1(0x5f4)](this);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x9e8)]=function(){const _0xf31acb=_0x526668;return Scene_Shop[_0xf31acb(0x298)][_0xf31acb(0x455)][_0xf31acb(0x5f4)](this);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x84d)]=function(){const _0x28aa54=_0x526668;return Scene_Shop[_0x28aa54(0x298)]['CommandRect'][_0x28aa54(0x5f4)](this);},Scene_Shop['prototype'][_0x526668(0x977)]=function(){const _0xf31baf=_0x526668;return Scene_Shop[_0xf31baf(0x298)][_0xf31baf(0x514)][_0xf31baf(0x5f4)](this);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x6c0)]=function(){const _0x578bed=_0x526668;return Scene_Shop[_0x578bed(0x298)][_0x578bed(0x316)]['call'](this);},Scene_Shop[_0x526668(0x4aa)]['statusWindowRect']=function(){const _0x358571=_0x526668;return Scene_Shop[_0x358571(0x298)][_0x358571(0xa33)][_0x358571(0x5f4)](this);},Scene_Shop['prototype']['buyWindowRect']=function(){const _0x36fbbb=_0x526668;return Scene_Shop['layoutSettings'][_0x36fbbb(0x2ec)]['call'](this);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x795)]=function(){const _0x4b0504=_0x526668;return Scene_Shop[_0x4b0504(0x298)][_0x4b0504(0x63d)][_0x4b0504(0x5f4)](this);},Scene_Shop[_0x526668(0x4aa)][_0x526668(0x382)]=function(){const _0x53d1c6=_0x526668;return Scene_Shop[_0x53d1c6(0x298)][_0x53d1c6(0x8ba)][_0x53d1c6(0x5f4)](this);},Scene_Name[_0x526668(0x298)]=VisuMZ[_0x526668(0x6a7)]['Settings']['MenuLayout'][_0x526668(0x768)],VisuMZ[_0x526668(0x6a7)][_0x526668(0x48f)]=Scene_Name[_0x526668(0x4aa)][_0x526668(0x32e)],Scene_Name['prototype'][_0x526668(0x32e)]=function(){const _0x12a206=_0x526668;VisuMZ[_0x12a206(0x6a7)][_0x12a206(0x48f)][_0x12a206(0x5f4)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x526668(0x4aa)]['setCoreEngineUpdateWindowBg']=function(){const _0x331e76=_0x526668;this['_editWindow']&&this[_0x331e76(0x515)][_0x331e76(0x529)](Scene_Name['layoutSettings'][_0x331e76(0x8b4)]),this[_0x331e76(0x8b5)]&&('cFvaR'!=='cFvaR'?(this[_0x331e76(0x391)]=this[_0x331e76(0x995)](),_0x3ce21f[_0x331e76(0x6a7)]['Window_NameInput_initialize']['call'](this,_0x3e400c),this[_0x331e76(0x391)]===_0x331e76(0x274)?this[_0x331e76(0x606)](0x0):(_0x1012c2[_0x331e76(0x56a)](),this[_0x331e76(0x204)]())):this[_0x331e76(0x8b5)][_0x331e76(0x529)](Scene_Name[_0x331e76(0x298)][_0x331e76(0x458)]));},Scene_Name[_0x526668(0x4aa)][_0x526668(0x5aa)]=function(){return 0x0;},Scene_Name['prototype'][_0x526668(0x610)]=function(){const _0x2c449b=_0x526668;return Scene_Name['layoutSettings']['EditRect'][_0x2c449b(0x5f4)](this);},Scene_Name['prototype'][_0x526668(0x4ba)]=function(){const _0x2735bf=_0x526668;return Scene_Name[_0x2735bf(0x298)]['InputRect'][_0x2735bf(0x5f4)](this);},Scene_Name[_0x526668(0x4aa)][_0x526668(0x5b6)]=function(){const _0x34f71c=_0x526668;if(!this[_0x34f71c(0x8b5)])return![];return VisuMZ[_0x34f71c(0x6a7)]['Settings'][_0x34f71c(0x41b)][_0x34f71c(0x5b6)];},Scene_Name['prototype']['buttonAssistKey1']=function(){const _0x4cc707=_0x526668;if(this['EnableNameInput']())return TextManager[_0x4cc707(0x3ab)](_0x4cc707(0x23f));else{if(_0x4cc707(0x9be)===_0x4cc707(0x8a3)){if(_0x5a8a90&&_0x4bf46c['connected']){if(this[_0x4cc707(0x8ed)](_0x59df4d))return!![];}}else return Scene_MenuBase[_0x4cc707(0x4aa)]['buttonAssistKey1'][_0x4cc707(0x5f4)](this);}},Scene_Name['prototype']['buttonAssistText1']=function(){const _0x3888a3=_0x526668;if(this[_0x3888a3(0x5b6)]()){const _0x5a7d03=VisuMZ[_0x3888a3(0x6a7)]['Settings']['KeyboardInput'];if(this[_0x3888a3(0x8b5)][_0x3888a3(0x391)]===_0x3888a3(0x751))return _0x5a7d03['Keyboard']||_0x3888a3(0x540);else{if(_0x3888a3(0x5d3)===_0x3888a3(0x5d3))return _0x5a7d03[_0x3888a3(0x51b)]||'Manual';else _0x2318a6[_0x3888a3(0x6a7)][_0x3888a3(0x8d1)][_0x3888a3(0x5f4)](this),this[_0x3888a3(0x291)]={'x':0x0,'y':0x0},this[_0x3888a3(0x742)]={'x':0x0,'y':0x0};}}else return Scene_MenuBase[_0x3888a3(0x4aa)][_0x3888a3(0x834)][_0x3888a3(0x5f4)](this);},VisuMZ['CoreEngine'][_0x526668(0x8f8)]=Scene_Name[_0x526668(0x4aa)]['onInputOk'],Scene_Name['prototype'][_0x526668(0x3c4)]=function(){const _0x241e43=_0x526668;this[_0x241e43(0x5a9)]()?this[_0x241e43(0x3a8)]():VisuMZ['CoreEngine'][_0x241e43(0x8f8)][_0x241e43(0x5f4)](this);},Scene_Name[_0x526668(0x4aa)][_0x526668(0x5a9)]=function(){const _0x33fc44=_0x526668,_0x10ce32=VisuMZ['CoreEngine'][_0x33fc44(0x7c3)]['KeyboardInput'];if(!_0x10ce32)return![];const _0x475f12=_0x10ce32[_0x33fc44(0x817)];if(!_0x475f12)return![];const _0x3f0ae8=this[_0x33fc44(0x515)][_0x33fc44(0x3c6)]()[_0x33fc44(0x665)]();for(const _0x2f667b of _0x475f12){if(_0x3f0ae8[_0x33fc44(0x666)](_0x2f667b[_0x33fc44(0x665)]()))return!![];}return![];},Scene_Name[_0x526668(0x4aa)]['onInputBannedWords']=function(){const _0x4a8320=_0x526668;SoundManager[_0x4a8320(0x76a)]();},VisuMZ[_0x526668(0x6a7)][_0x526668(0x1f8)]=Scene_Battle[_0x526668(0x4aa)][_0x526668(0x894)],Scene_Battle[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x5a935f=_0x526668;VisuMZ['CoreEngine'][_0x5a935f(0x1f8)][_0x5a935f(0x5f4)](this);if($gameTemp[_0x5a935f(0x72e)])this[_0x5a935f(0x520)]();},Scene_Battle['prototype'][_0x526668(0x520)]=function(){const _0xc19e35=_0x526668;!BattleManager[_0xc19e35(0x288)]()&&!this[_0xc19e35(0x5fa)]&&!$gameMessage[_0xc19e35(0x43a)]()&&(this[_0xc19e35(0x5fa)]=!![],this['update'](),SceneManager[_0xc19e35(0xa30)](),this[_0xc19e35(0x5fa)]=![]);},VisuMZ[_0x526668(0x6a7)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x526668(0x4aa)]['createCancelButton'],Scene_Battle[_0x526668(0x4aa)]['createCancelButton']=function(){const _0x383156=_0x526668;VisuMZ['CoreEngine'][_0x383156(0x959)][_0x383156(0x5f4)](this);if(SceneManager[_0x383156(0x50c)]()){if(_0x383156(0x662)!==_0x383156(0x87d))this[_0x383156(0x3bf)]();else{const _0x50fc5a=_0x383156(0x80b);this['_colorCache']=this[_0x383156(0x435)]||{};if(this[_0x383156(0x435)][_0x50fc5a])return this[_0x383156(0x435)][_0x50fc5a];const _0x9fb799=_0x2519fa['CoreEngine']['Settings'][_0x383156(0x42a)][_0x383156(0x8cf)];return this['getColorDataFromPluginParameters'](_0x50fc5a,_0x9fb799);}}},Scene_Battle[_0x526668(0x4aa)][_0x526668(0x3bf)]=function(){const _0x45818b=_0x526668;this[_0x45818b(0x8bc)]['x']=Graphics['boxWidth']+0x4,this[_0x45818b(0x54a)]()?this[_0x45818b(0x8bc)]['y']=Graphics[_0x45818b(0x8ec)]-this['buttonAreaHeight']():this['_cancelButton']['y']=0x0;},VisuMZ['CoreEngine'][_0x526668(0x69d)]=Sprite_Button['prototype'][_0x526668(0x96f)],Sprite_Button['prototype'][_0x526668(0x96f)]=function(_0x313ed8){const _0x58d1ae=_0x526668;VisuMZ[_0x58d1ae(0x6a7)][_0x58d1ae(0x69d)]['call'](this,_0x313ed8),this['initButtonHidden']();},Sprite_Button['prototype'][_0x526668(0x8f1)]=function(){const _0x467033=_0x526668,_0xfde9fc=VisuMZ[_0x467033(0x6a7)]['Settings']['UI'];this[_0x467033(0x40f)]=![];switch(this[_0x467033(0x60a)]){case'cancel':this['_isButtonHidden']=!_0xfde9fc[_0x467033(0x668)];break;case _0x467033(0x331):case _0x467033(0x280):this['_isButtonHidden']=!_0xfde9fc[_0x467033(0x6be)];break;case _0x467033(0x8d6):case'up':case'down2':case _0x467033(0x970):case'ok':this[_0x467033(0x40f)]=!_0xfde9fc[_0x467033(0x60b)];break;case _0x467033(0x349):this['_isButtonHidden']=!_0xfde9fc['menuShowButton'];break;}},VisuMZ[_0x526668(0x6a7)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x526668(0x4aa)]['updateOpacity'],Sprite_Button[_0x526668(0x4aa)]['updateOpacity']=function(){const _0x3ffcee=_0x526668;if(SceneManager[_0x3ffcee(0x4ac)]()||this[_0x3ffcee(0x40f)]){if(_0x3ffcee(0x47c)!==_0x3ffcee(0x2cc))this[_0x3ffcee(0x811)]();else return this[_0x3ffcee(0x64f)]()?this[_0x3ffcee(0x77a)]():_0x5ae750['CoreEngine'][_0x3ffcee(0x5ff)][_0x3ffcee(0x5f4)](this);}else VisuMZ[_0x3ffcee(0x6a7)][_0x3ffcee(0x3ae)]['call'](this);},Sprite_Button[_0x526668(0x4aa)][_0x526668(0x811)]=function(){const _0xe1eb0a=_0x526668;this[_0xe1eb0a(0x2bc)]=![],this['opacity']=0x0,this['x']=Graphics[_0xe1eb0a(0x745)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x579)]=Sprite_Battler['prototype']['startMove'],Sprite_Battler['prototype'][_0x526668(0x290)]=function(_0x17a3d3,_0x3e2a8b,_0x46abfc){const _0xe3e2ea=_0x526668;(this[_0xe3e2ea(0x5e1)]!==_0x17a3d3||this[_0xe3e2ea(0x82f)]!==_0x3e2a8b)&&(this[_0xe3e2ea(0xa08)](_0xe3e2ea(0x732)),this[_0xe3e2ea(0x6c4)]=_0x46abfc),VisuMZ[_0xe3e2ea(0x6a7)]['Sprite_Battler_startMove'][_0xe3e2ea(0x5f4)](this,_0x17a3d3,_0x3e2a8b,_0x46abfc);},Sprite_Battler['prototype'][_0x526668(0xa08)]=function(_0x5aee47){const _0x3f42f6=_0x526668;this[_0x3f42f6(0x7b6)]=_0x5aee47;},Sprite_Battler[_0x526668(0x4aa)][_0x526668(0x759)]=function(){const _0x34f32c=_0x526668;if(this['_movementDuration']<=0x0)return;const _0x374436=this[_0x34f32c(0x3e9)],_0x6db07=this[_0x34f32c(0x6c4)],_0x8dce8c=this[_0x34f32c(0x7b6)];this['_offsetX']=this[_0x34f32c(0x8aa)](this[_0x34f32c(0x888)],this['_targetOffsetX'],_0x374436,_0x6db07,_0x8dce8c),this[_0x34f32c(0x86c)]=this[_0x34f32c(0x8aa)](this['_offsetY'],this['_targetOffsetY'],_0x374436,_0x6db07,_0x8dce8c),this['_movementDuration']--;if(this[_0x34f32c(0x3e9)]<=0x0)this[_0x34f32c(0x70a)]();},Sprite_Battler[_0x526668(0x4aa)]['applyEasing']=function(_0x5ff85e,_0x585baa,_0x2aa75e,_0x35aa8f,_0x1a0833){const _0x544da7=_0x526668,_0x27d414=VisuMZ['ApplyEasing']((_0x35aa8f-_0x2aa75e)/_0x35aa8f,_0x1a0833||_0x544da7(0x732)),_0x37993c=VisuMZ[_0x544da7(0x31f)]((_0x35aa8f-_0x2aa75e+0x1)/_0x35aa8f,_0x1a0833||_0x544da7(0x732)),_0x33236e=(_0x5ff85e-_0x585baa*_0x27d414)/(0x1-_0x27d414);return _0x33236e+(_0x585baa-_0x33236e)*_0x37993c;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x28c)]=Sprite_Actor['prototype']['setActorHome'],Sprite_Actor[_0x526668(0x4aa)]['setActorHome']=function(_0x56e86f){const _0x5bd7f1=_0x526668;if(VisuMZ['CoreEngine'][_0x5bd7f1(0x7c3)]['UI']['RepositionActors']){if('qlveG'==='FffiI'){try{_0x29fbff[_0x5bd7f1(0x6a7)]['Game_Interpreter_command122']['call'](this,_0x4d769c);}catch(_0x10fb5d){_0x2dfb74[_0x5bd7f1(0x767)]()&&(_0x4873ce[_0x5bd7f1(0x642)](_0x5bd7f1(0x87a)),_0x5ad343['log'](_0x10fb5d));}return!![];}else this[_0x5bd7f1(0x3d7)](_0x56e86f);}else VisuMZ['CoreEngine'][_0x5bd7f1(0x28c)]['call'](this,_0x56e86f);},Sprite_Actor[_0x526668(0x4aa)][_0x526668(0x3d7)]=function(_0x437c6f){const _0x508d97=_0x526668;let _0x28c0d8=Math[_0x508d97(0x746)](Graphics[_0x508d97(0x745)]/0x2+0xc0);_0x28c0d8-=Math[_0x508d97(0x749)]((Graphics[_0x508d97(0x745)]-Graphics[_0x508d97(0x9e1)])/0x2),_0x28c0d8+=_0x437c6f*0x20;let _0xafc8a6=Graphics['height']-0xc8-$gameParty[_0x508d97(0x50e)]()*0x30;_0xafc8a6-=Math[_0x508d97(0x749)]((Graphics[_0x508d97(0x36a)]-Graphics[_0x508d97(0x8ec)])/0x2),_0xafc8a6+=_0x437c6f*0x30,this['setHome'](_0x28c0d8,_0xafc8a6);},Sprite_Actor['prototype'][_0x526668(0x5c6)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x526668(0x4aa)][_0x526668(0x674)]=function(_0x5d1284){const _0xacac40=_0x526668;this[_0xacac40(0x860)]=_0x5d1284;},VisuMZ['CoreEngine']['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x526668(0x4aa)]['processSoundTimings'],Sprite_Animation[_0x526668(0x4aa)][_0x526668(0x329)]=function(){const _0x231621=_0x526668;if(this['_muteSound'])return;VisuMZ[_0x231621(0x6a7)]['Sprite_Animation_processSoundTimings'][_0x231621(0x5f4)](this);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x29c)]=Sprite_Animation['prototype'][_0x526668(0x226)],Sprite_Animation['prototype'][_0x526668(0x226)]=function(_0x381f7f){const _0x1507c6=_0x526668;if(this[_0x1507c6(0x58f)]())_0x1507c6(0x910)!==_0x1507c6(0x3e4)?this[_0x1507c6(0x93e)](_0x381f7f):_0x20b74a[_0x1507c6(0x3ec)](_0x298aa6);else{if(_0x1507c6(0x66b)!==_0x1507c6(0x765))VisuMZ[_0x1507c6(0x6a7)][_0x1507c6(0x29c)]['call'](this,_0x381f7f);else return _0x46c05b[_0x1507c6(0x6a7)][_0x1507c6(0x7c1)]();}},Sprite_Animation[_0x526668(0x4aa)][_0x526668(0x58f)]=function(){const _0x17d17d=_0x526668;if(!this['_animation'])return![];const _0x51d75a=this[_0x17d17d(0x6c6)]['name']||'';if(_0x51d75a[_0x17d17d(0x78d)](/<MIRROR OFFSET X>/i))return!![];if(_0x51d75a[_0x17d17d(0x78d)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x17d17d(0x6a7)][_0x17d17d(0x7c3)][_0x17d17d(0x622)][_0x17d17d(0x5e9)];},Sprite_Animation['prototype'][_0x526668(0x93e)]=function(_0x114a2e){const _0x574e07=_0x526668,_0xeef1b0=this[_0x574e07(0x4df)],_0x107e40=this[_0x574e07(0x4df)],_0x4ba4ed=this[_0x574e07(0x6c6)][_0x574e07(0x260)]*(this[_0x574e07(0x254)]?-0x1:0x1)-_0xeef1b0/0x2,_0x58d13a=this['_animation'][_0x574e07(0x3c5)]-_0x107e40/0x2,_0x5b1cba=this['targetPosition'](_0x114a2e);_0x114a2e['gl']['viewport'](_0x4ba4ed+_0x5b1cba['x'],_0x58d13a+_0x5b1cba['y'],_0xeef1b0,_0x107e40);},Sprite_Animation[_0x526668(0x4aa)][_0x526668(0x49d)]=function(_0x58bf8e){const _0x47edc0=_0x526668;if(_0x58bf8e[_0x47edc0(0x5d9)]){}const _0x968926=this[_0x47edc0(0x6c6)]['name'];let _0x1bc1e7=_0x58bf8e[_0x47edc0(0x36a)]*_0x58bf8e[_0x47edc0(0x766)]['y'],_0x30e5b3=0x0,_0x39ae07=-_0x1bc1e7/0x2;if(_0x968926[_0x47edc0(0x78d)](/<(?:HEAD|HEADER|TOP)>/i))_0x39ae07=-_0x1bc1e7;if(_0x968926[_0x47edc0(0x78d)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x39ae07=0x0;if(this['_animation']['alignBottom'])_0x39ae07=0x0;if(_0x968926[_0x47edc0(0x78d)](/<(?:LEFT)>/i))_0x30e5b3=-_0x58bf8e[_0x47edc0(0x745)]/0x2;if(_0x968926[_0x47edc0(0x78d)](/<(?:RIGHT)>/i))_0x30e5b3=_0x58bf8e[_0x47edc0(0x745)]/0x2;_0x968926['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x30e5b3=Number(RegExp['$1'])*_0x58bf8e[_0x47edc0(0x745)]);_0x968926['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x39ae07=(0x1-Number(RegExp['$1']))*-_0x1bc1e7);_0x968926[_0x47edc0(0x78d)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x30e5b3=Number(RegExp['$1'])*_0x58bf8e[_0x47edc0(0x745)],_0x39ae07=(0x1-Number(RegExp['$2']))*-_0x1bc1e7);if(_0x968926[_0x47edc0(0x78d)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x30e5b3+=Number(RegExp['$1']);if(_0x968926[_0x47edc0(0x78d)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x39ae07+=Number(RegExp['$1']);_0x968926['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&('RWCGu'!==_0x47edc0(0x81c)?(_0x30e5b3+=Number(RegExp['$1']),_0x39ae07+=Number(RegExp['$2'])):_0x1b247e['scaleMode']=_0x18382b['SCALE_MODES'][_0x47edc0(0x6fe)]);const _0x4db346=new Point(_0x30e5b3,_0x39ae07);return _0x58bf8e['updateTransform'](),_0x58bf8e[_0x47edc0(0x588)]['apply'](_0x4db346);},Sprite_AnimationMV['prototype'][_0x526668(0x44e)]=function(){const _0x3aee71=_0x526668;this[_0x3aee71(0x4fa)]=VisuMZ['CoreEngine'][_0x3aee71(0x7c3)][_0x3aee71(0x622)][_0x3aee71(0x1fc)]??0x4,this[_0x3aee71(0x6dd)](),this['_rate']=this[_0x3aee71(0x4fa)]['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x526668(0x4aa)][_0x526668(0x6dd)]=function(){const _0x27f470=_0x526668;if(!this[_0x27f470(0x6c6)]);const _0x1141ba=this[_0x27f470(0x6c6)][_0x27f470(0x3c6)]||'';_0x1141ba[_0x27f470(0x78d)](/<RATE:[ ](\d+)>/i)&&(_0x27f470(0x4af)==='XvVvX'?this['_skillTypeWindow']['setBackgroundType'](_0x255942['layoutSettings']['SkillTypeBgType']):this[_0x27f470(0x4fa)]=(Number(RegExp['$1'])||0x1)[_0x27f470(0xa09)](0x1,0xa));},Sprite_AnimationMV[_0x526668(0x4aa)][_0x526668(0x674)]=function(_0x5b9539){const _0x5a3af8=_0x526668;this[_0x5a3af8(0x860)]=_0x5b9539;},VisuMZ[_0x526668(0x6a7)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV['prototype']['processTimingData'],Sprite_AnimationMV['prototype']['processTimingData']=function(_0x59224d){const _0x380488=_0x526668;if(this[_0x380488(0x860)]){_0x59224d=JsonEx['makeDeepCopy'](_0x59224d);if(_0x59224d['se']){if(_0x380488(0x705)!==_0x380488(0x2da))_0x59224d['se'][_0x380488(0x363)]=0x0;else{const _0x389e19=this[_0x380488(0x277)]();_0x341f8c[_0x380488(0x72b)](_0x380488(0x97a))&&this[_0x380488(0x913)](_0x42aa03['min'](this[_0x380488(0x277)](),0x0)),_0x1428e0['isTriggered'](_0x380488(0x8bd))&&this[_0x380488(0x913)](_0x54f6be[_0x380488(0x431)](this[_0x380488(0x277)](),this[_0x380488(0x374)]()-0x1)),this[_0x380488(0x277)]()!==_0x389e19&&this[_0x380488(0xa07)]();}}}VisuMZ[_0x380488(0x6a7)][_0x380488(0x837)][_0x380488(0x5f4)](this,_0x59224d);},VisuMZ[_0x526668(0x6a7)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x526668(0x4aa)][_0x526668(0x9ce)],Sprite_AnimationMV[_0x526668(0x4aa)][_0x526668(0x9ce)]=function(){const _0x4ffff3=_0x526668;VisuMZ['CoreEngine'][_0x4ffff3(0x760)][_0x4ffff3(0x5f4)](this);if(this['_animation'][_0x4ffff3(0x5b0)]===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics[_0x4ffff3(0x745)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics['height']/0x2);}},Sprite_Damage['prototype'][_0x526668(0x7de)]=function(_0x569f4c){const _0x3b77c4=_0x526668;let _0x13dcba=Math[_0x3b77c4(0x487)](_0x569f4c)[_0x3b77c4(0x6d2)]();this['useDigitGrouping']()&&(_0x3b77c4(0x4f8)==='JsFci'?_0x13dcba=VisuMZ[_0x3b77c4(0x733)](_0x13dcba):this[_0x3b77c4(0x811)]());const _0x415c97=this['fontSize'](),_0x58c91b=Math[_0x3b77c4(0x749)](_0x415c97*0.75);for(let _0x89fc9e=0x0;_0x89fc9e<_0x13dcba[_0x3b77c4(0x5f3)];_0x89fc9e++){const _0x1af85f=this[_0x3b77c4(0x75e)](_0x58c91b,_0x415c97);_0x1af85f[_0x3b77c4(0xa29)][_0x3b77c4(0x714)](_0x13dcba[_0x89fc9e],0x0,0x0,_0x58c91b,_0x415c97,_0x3b77c4(0x541)),_0x1af85f['x']=(_0x89fc9e-(_0x13dcba[_0x3b77c4(0x5f3)]-0x1)/0x2)*_0x58c91b,_0x1af85f['dy']=-_0x89fc9e;}},Sprite_Damage['prototype'][_0x526668(0xa2e)]=function(){const _0x267d98=_0x526668;return VisuMZ['CoreEngine']['Settings'][_0x267d98(0x622)][_0x267d98(0x370)];},Sprite_Damage['prototype'][_0x526668(0x4e9)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ['CoreEngine'][_0x526668(0x921)]=Sprite_Gauge[_0x526668(0x4aa)]['gaugeRate'],Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x470)]=function(){const _0x5d5dc5=_0x526668;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x5d5dc5(0x5f4)](this)[_0x5d5dc5(0xa09)](0x0,0x1);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x52f)]=Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x2c9)],Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x2c9)]=function(){const _0xa4e243=_0x526668;let _0x1c7700=VisuMZ[_0xa4e243(0x6a7)]['Sprite_Gauge_currentValue'][_0xa4e243(0x5f4)](this);return _0x1c7700;},Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x724)]=function(){const _0x195315=_0x526668;let _0x78034b=this[_0x195315(0x2c9)]();this['useDigitGrouping']()&&(_0x195315(0x764)===_0x195315(0x764)?_0x78034b=VisuMZ[_0x195315(0x733)](_0x78034b):(_0x34aadd+=_0x5dcf97,_0x1bb500+=_0x195315(0x71f)['format'](_0x417668,_0x2369c1[_0x195315(0x4f0)][0x0]+0x1,_0x3797d3[_0x195315(0x4f0)][0x1])));const _0x54cd70=this[_0x195315(0x694)]()-0x1,_0x17b063=this[_0x195315(0x3fa)]?this[_0x195315(0x3fa)]():this[_0x195315(0x273)]();this[_0x195315(0x483)](),this['bitmap'][_0x195315(0x714)](_0x78034b,0x0,0x0,_0x54cd70,_0x17b063,_0x195315(0x43b));},Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x8d5)]=function(){return 0x3;},Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0xa2e)]=function(){const _0x2affcc=_0x526668;return VisuMZ['CoreEngine'][_0x2affcc(0x7c3)][_0x2affcc(0x622)][_0x2affcc(0x3a1)];},Sprite_Gauge[_0x526668(0x4aa)][_0x526668(0x4e9)]=function(){const _0x7a4b7c=_0x526668;return ColorManager[_0x7a4b7c(0x90c)]();},VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x526668(0x4aa)][_0x526668(0x874)],Sprite_Picture['prototype'][_0x526668(0x874)]=function(){const _0x1f9619=_0x526668;this[_0x1f9619(0x232)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x1f9619(0x33f)](Number(RegExp['$1'])):VisuMZ[_0x1f9619(0x6a7)][_0x1f9619(0x78c)][_0x1f9619(0x5f4)](this);},Sprite_Picture[_0x526668(0x4aa)][_0x526668(0x33f)]=function(_0x47df7a){const _0x528d8c=_0x526668,_0x2226f0=ImageManager[_0x528d8c(0x411)],_0x333490=ImageManager[_0x528d8c(0x88a)],_0x35e9a6=this['_pictureName'][_0x528d8c(0x78d)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x2226f0,_0x333490);const _0x39e236=ImageManager[_0x528d8c(0x272)](_0x528d8c(0x9e6)),_0x2ecc37=_0x47df7a%0x10*_0x2226f0,_0x218f5a=Math[_0x528d8c(0x749)](_0x47df7a/0x10)*_0x333490;this[_0x528d8c(0xa29)]['smooth']=_0x35e9a6,this[_0x528d8c(0xa29)][_0x528d8c(0x484)](_0x39e236,_0x2ecc37,_0x218f5a,_0x2226f0,_0x333490,0x0,0x0,_0x2226f0,_0x333490);};function Sprite_TitlePictureButton(){const _0x449bab=_0x526668;this[_0x449bab(0x96f)](...arguments);}Sprite_TitlePictureButton['prototype']=Object['create'](Sprite_Clickable[_0x526668(0x4aa)]),Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x330)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x96f)]=function(_0x167740){const _0xb14680=_0x526668;Sprite_Clickable[_0xb14680(0x4aa)][_0xb14680(0x96f)][_0xb14680(0x5f4)](this),this[_0xb14680(0x8d2)]=_0x167740,this[_0xb14680(0x9d0)]=null,this[_0xb14680(0x822)]();},Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x822)]=function(){const _0x2d47fc=_0x526668;this['x']=Graphics[_0x2d47fc(0x745)],this['y']=Graphics[_0x2d47fc(0x36a)],this[_0x2d47fc(0x2bc)]=![],this[_0x2d47fc(0x3da)]();},Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x3da)]=function(){const _0x309f10=_0x526668;this[_0x309f10(0xa29)]=ImageManager[_0x309f10(0x578)](this[_0x309f10(0x8d2)][_0x309f10(0x741)]),this[_0x309f10(0xa29)][_0x309f10(0x4d7)](this[_0x309f10(0x906)][_0x309f10(0x670)](this));},Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x906)]=function(){const _0x3d0dcf=_0x526668;this[_0x3d0dcf(0x8d2)][_0x3d0dcf(0x8a1)][_0x3d0dcf(0x5f4)](this),this[_0x3d0dcf(0x8d2)][_0x3d0dcf(0x42e)][_0x3d0dcf(0x5f4)](this),this['setClickHandler'](this[_0x3d0dcf(0x8d2)][_0x3d0dcf(0x952)]['bind'](this));},Sprite_TitlePictureButton[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x518e53=_0x526668;Sprite_Clickable[_0x518e53(0x4aa)][_0x518e53(0x894)]['call'](this),this[_0x518e53(0x8f4)](),this[_0x518e53(0x3fe)]();},Sprite_TitlePictureButton['prototype'][_0x526668(0x585)]=function(){const _0x4858bc=_0x526668;return VisuMZ[_0x4858bc(0x6a7)][_0x4858bc(0x7c3)][_0x4858bc(0x41e)][_0x4858bc(0x5c3)][_0x4858bc(0x49b)];},Sprite_TitlePictureButton['prototype'][_0x526668(0x8f4)]=function(){const _0x1e5216=_0x526668;this[_0x1e5216(0x7a7)]||this[_0x1e5216(0x8c2)]?this[_0x1e5216(0x494)]=0xff:(this[_0x1e5216(0x494)]+=this[_0x1e5216(0x2bc)]?this[_0x1e5216(0x585)]():-0x1*this['fadeSpeed'](),this['opacity']=Math[_0x1e5216(0x845)](0xc0,this['opacity']));},Sprite_TitlePictureButton['prototype'][_0x526668(0x488)]=function(_0x2d5f46){const _0xb3be6f=_0x526668;this[_0xb3be6f(0x9d0)]=_0x2d5f46;},Sprite_TitlePictureButton[_0x526668(0x4aa)]['onClick']=function(){const _0xf1107=_0x526668;this[_0xf1107(0x9d0)]&&this[_0xf1107(0x9d0)]();},VisuMZ[_0x526668(0x6a7)]['Spriteset_Base_initialize']=Spriteset_Base['prototype'][_0x526668(0x96f)],Spriteset_Base[_0x526668(0x4aa)]['initialize']=function(){const _0x310690=_0x526668;VisuMZ['CoreEngine']['Spriteset_Base_initialize'][_0x310690(0x5f4)](this),this[_0x310690(0x727)]();},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x727)]=function(){const _0x1fe06c=_0x526668;this[_0x1fe06c(0x9bf)]=[],this[_0x1fe06c(0x6e6)]=[],this['_cacheScaleX']=this[_0x1fe06c(0x766)]['x'],this[_0x1fe06c(0x900)]=this[_0x1fe06c(0x766)]['y'];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x59a)]=Spriteset_Base[_0x526668(0x4aa)]['destroy'],Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x93a)]=function(_0x519cff){const _0x3cabdd=_0x526668;this[_0x3cabdd(0x4d0)](),this[_0x3cabdd(0x2af)](),VisuMZ[_0x3cabdd(0x6a7)][_0x3cabdd(0x59a)][_0x3cabdd(0x5f4)](this,_0x519cff);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x57b)]=Spriteset_Base[_0x526668(0x4aa)]['update'],Spriteset_Base['prototype'][_0x526668(0x894)]=function(){const _0x79a07d=_0x526668;VisuMZ[_0x79a07d(0x6a7)][_0x79a07d(0x57b)][_0x79a07d(0x5f4)](this),this[_0x79a07d(0x634)](),this[_0x79a07d(0x957)](),this[_0x79a07d(0x2d9)]();},Spriteset_Base['prototype'][_0x526668(0x634)]=function(){const _0x4b62b8=_0x526668;if(!VisuMZ[_0x4b62b8(0x6a7)][_0x4b62b8(0x7c3)]['QoL'][_0x4b62b8(0x46c)])return;if(this[_0x4b62b8(0x591)]===this[_0x4b62b8(0x766)]['x']&&this['_cacheScaleY']===this['scale']['y'])return;this[_0x4b62b8(0x310)](),this[_0x4b62b8(0x591)]=this['scale']['x'],this[_0x4b62b8(0x900)]=this['scale']['y'];},Spriteset_Base[_0x526668(0x4aa)]['adjustPictureAntiZoom']=function(){const _0x20b826=_0x526668;if(SceneManager[_0x20b826(0x3e8)]()&&Spriteset_Map[_0x20b826(0x3a5)]){if('cbyHK'===_0x20b826(0x7bd)){if(_0x4c7e8d)_0x552e3b[_0x20b826(0x4e2)](_0x56c795);}else return;}else{if(SceneManager[_0x20b826(0x361)]()&&Spriteset_Battle[_0x20b826(0x3a5)])return;}this[_0x20b826(0x766)]['x']!==0x0&&(_0x20b826(0xa05)===_0x20b826(0xa05)?(this['_pictureContainer'][_0x20b826(0x766)]['x']=0x1/this['scale']['x'],this[_0x20b826(0x4a0)]['x']=-(this['x']/this[_0x20b826(0x766)]['x'])):_0x17524a['loadBitmap'](_0x151641,_0x182857)),this[_0x20b826(0x766)]['y']!==0x0&&(this[_0x20b826(0x4a0)]['scale']['y']=0x1/this[_0x20b826(0x766)]['y'],this[_0x20b826(0x4a0)]['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x40a)]=Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x9ce)],Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x9ce)]=function(){const _0x2ef8a2=_0x526668;VisuMZ['CoreEngine'][_0x2ef8a2(0x40a)][_0x2ef8a2(0x5f4)](this),this[_0x2ef8a2(0x842)]();},Spriteset_Base[_0x526668(0x4aa)]['updatePositionCoreEngine']=function(){const _0xb7790c=_0x526668;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0xb7790c(0x746)]($gameScreen[_0xb7790c(0x3c3)]());const _0x2bf8d9=$gameScreen[_0xb7790c(0xa3a)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0xb7790c(0x2ab):this['updatePositionCoreEngineShakeOriginal']();break;case _0xb7790c(0x200):this[_0xb7790c(0x2bb)]();break;case _0xb7790c(0x22f):this[_0xb7790c(0x3ca)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x394)]=function(){const _0x44a04d=_0x526668,_0x1f271c=VisuMZ[_0x44a04d(0x6a7)][_0x44a04d(0x7c3)][_0x44a04d(0x884)];if(_0x1f271c&&_0x1f271c[_0x44a04d(0x8ff)]){if(_0x44a04d(0x2b9)==='BdvKt'){const _0x298a98=_0x524d3d+(this[_0x44a04d(0x367)]()-_0x4b2b80[_0x44a04d(0x88a)])/0x2;this[_0x44a04d(0x2a8)](_0xeff4d4,_0x2bc869+(_0x12478d-_0x4015c2['iconWidth']),_0x298a98),_0x1ccac6-=_0x287749[_0x44a04d(0x411)]+0x4;}else return _0x1f271c[_0x44a04d(0x8ff)]['call'](this);}this['x']+=Math[_0x44a04d(0x746)]($gameScreen[_0x44a04d(0x3c3)]());},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x871)]=function(){const _0xe1ee26=_0x526668,_0x2b0c92=VisuMZ[_0xe1ee26(0x6a7)][_0xe1ee26(0x7c3)][_0xe1ee26(0x884)];if(_0x2b0c92&&_0x2b0c92[_0xe1ee26(0x4e7)])return _0x2b0c92[_0xe1ee26(0x4e7)][_0xe1ee26(0x5f4)](this);const _0xc39ca6=$gameScreen[_0xe1ee26(0x2d7)]*0.75,_0x57393a=$gameScreen[_0xe1ee26(0x5e6)]*0.6,_0x504d2d=$gameScreen['_shakeDuration'];this['x']+=Math[_0xe1ee26(0x746)](Math[_0xe1ee26(0x479)](_0xc39ca6)-Math[_0xe1ee26(0x479)](_0x57393a))*(Math[_0xe1ee26(0x845)](_0x504d2d,0x1e)*0.5),this['y']+=Math[_0xe1ee26(0x746)](Math[_0xe1ee26(0x479)](_0xc39ca6)-Math['randomInt'](_0x57393a))*(Math[_0xe1ee26(0x845)](_0x504d2d,0x1e)*0.5);},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x2bb)]=function(){const _0x47e696=_0x526668,_0x39936a=VisuMZ[_0x47e696(0x6a7)]['Settings'][_0x47e696(0x884)];if(_0x39936a&&_0x39936a[_0x47e696(0x7a4)])return _0x39936a[_0x47e696(0x7a4)][_0x47e696(0x5f4)](this);const _0x3d315b=$gameScreen[_0x47e696(0x2d7)]*0.75,_0x5ce970=$gameScreen[_0x47e696(0x5e6)]*0.6,_0x17bb60=$gameScreen[_0x47e696(0x6c5)];this['x']+=Math[_0x47e696(0x746)](Math[_0x47e696(0x479)](_0x3d315b)-Math[_0x47e696(0x479)](_0x5ce970))*(Math[_0x47e696(0x845)](_0x17bb60,0x1e)*0.5);},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x3ca)]=function(){const _0x55fe40=_0x526668,_0xb0ea5e=VisuMZ[_0x55fe40(0x6a7)][_0x55fe40(0x7c3)][_0x55fe40(0x884)];if(_0xb0ea5e&&_0xb0ea5e[_0x55fe40(0x866)])return _0xb0ea5e[_0x55fe40(0x866)][_0x55fe40(0x5f4)](this);const _0x51ec59=$gameScreen[_0x55fe40(0x2d7)]*0.75,_0x57059e=$gameScreen['_shakeSpeed']*0.6,_0x21dee2=$gameScreen[_0x55fe40(0x6c5)];this['y']+=Math[_0x55fe40(0x746)](Math[_0x55fe40(0x479)](_0x51ec59)-Math['randomInt'](_0x57059e))*(Math[_0x55fe40(0x845)](_0x21dee2,0x1e)*0.5);},Spriteset_Base[_0x526668(0x4aa)]['updateFauxAnimations']=function(){const _0x435121=_0x526668;for(const _0x428b35 of this['_fauxAnimationSprites']){!_0x428b35[_0x435121(0x9cf)]()&&(_0x435121(0x8a4)===_0x435121(0x8a4)?this['removeFauxAnimation'](_0x428b35):this[_0x435121(0x96f)](...arguments));}this['processFauxAnimationRequests']();},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x52d)]=function(){const _0x5902d6=_0x526668;for(;;){if(_0x5902d6(0x300)!==_0x5902d6(0x318)){const _0x5d14e0=$gameTemp[_0x5902d6(0x4cf)]();if(_0x5d14e0)this[_0x5902d6(0x5f7)](_0x5d14e0);else break;}else _0xdee083[_0x5902d6(0x6a7)][_0x5902d6(0x57b)]['call'](this),this[_0x5902d6(0x634)](),this[_0x5902d6(0x957)](),this['updatePointAnimations']();}},Spriteset_Base['prototype'][_0x526668(0x5f7)]=function(_0x5f3110){const _0x37f94b=_0x526668,_0xdfe2e1=$dataAnimations[_0x5f3110[_0x37f94b(0x4ff)]],_0x317638=_0x5f3110[_0x37f94b(0x41f)],_0x262d42=_0x5f3110[_0x37f94b(0x7b5)],_0x59474b=_0x5f3110['mute'];let _0xaf3561=this[_0x37f94b(0x676)]();const _0xab59c4=this[_0x37f94b(0x53b)]();if(this['isAnimationForEach'](_0xdfe2e1))for(const _0x28da31 of _0x317638){this[_0x37f94b(0x93f)]([_0x28da31],_0xdfe2e1,_0x262d42,_0xaf3561,_0x59474b),_0xaf3561+=_0xab59c4;}else this['createFauxAnimationSprite'](_0x317638,_0xdfe2e1,_0x262d42,_0xaf3561,_0x59474b);},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x93f)]=function(_0x1a834,_0xbaac27,_0x317dd7,_0x5a2649,_0x2a2870){const _0x44147d=_0x526668,_0x5ae27b=this[_0x44147d(0x7bb)](_0xbaac27),_0x2b7721=new(_0x5ae27b?Sprite_AnimationMV:Sprite_Animation)(),_0x13b4fd=this['makeTargetSprites'](_0x1a834);if(this[_0x44147d(0x8d7)](_0x1a834[0x0])){if('TRHLx'!==_0x44147d(0x32a))_0x317dd7=!_0x317dd7;else return 0x0;}_0x2b7721[_0x44147d(0x522)]=_0x1a834,_0x2b7721[_0x44147d(0x822)](_0x13b4fd,_0xbaac27,_0x317dd7,_0x5a2649),_0x2b7721[_0x44147d(0x674)](_0x2a2870),this[_0x44147d(0x6e1)]['addChild'](_0x2b7721),this[_0x44147d(0x9bf)][_0x44147d(0x3ec)](_0x2b7721);},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x98f)]=function(_0x47f768){const _0x342d97=_0x526668;this[_0x342d97(0x9bf)][_0x342d97(0x74e)](_0x47f768),this[_0x342d97(0x6e1)]['removeChild'](_0x47f768);for(const _0x4358ca of _0x47f768[_0x342d97(0x522)]){_0x4358ca[_0x342d97(0x80f)]&&(_0x342d97(0x8a8)===_0x342d97(0x8a8)?_0x4358ca[_0x342d97(0x80f)]():_0x7b3e2[_0x342d97(0x7db)]=![]);}_0x47f768['destroy']();},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x4d0)]=function(){const _0x3e3a03=_0x526668;for(const _0x2e07b7 of this[_0x3e3a03(0x9bf)]){this[_0x3e3a03(0x98f)](_0x2e07b7);}},Spriteset_Base[_0x526668(0x4aa)]['isFauxAnimationPlaying']=function(){const _0x53f7da=_0x526668;return this[_0x53f7da(0x9bf)]['length']>0x0;},Spriteset_Base[_0x526668(0x4aa)]['updatePointAnimations']=function(){const _0x2f56c2=_0x526668;for(const _0x290420 of this[_0x2f56c2(0x6e6)]){if(_0x2f56c2(0x489)!==_0x2f56c2(0x6c3))!_0x290420['isPlaying']()&&this[_0x2f56c2(0x9ca)](_0x290420);else{if(_0x1ca9d7[_0x2f56c2(0x767)]())_0x1fa6ab[_0x2f56c2(0x642)](_0x35cfa8);}}this[_0x2f56c2(0xa24)]();},Spriteset_Base[_0x526668(0x4aa)]['processPointAnimationRequests']=function(){const _0x5a5acd=_0x526668;for(;;){if('IIIns'===_0x5a5acd(0x9c3))this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this[_0x5a5acd(0x7ce)]()):_0x4eb7c2['CoreEngine'][_0x5a5acd(0x5c7)][_0x5a5acd(0x5f4)](this);else{const _0x27d1cf=$gameTemp['retrievePointAnimation']();if(_0x27d1cf)_0x5a5acd(0x4a2)===_0x5a5acd(0x4b4)?(_0x96a9a8[_0x5a5acd(0x6a7)][_0x5a5acd(0x935)][_0x5a5acd(0x5f4)](this),this[_0x5a5acd(0x5ba)]()):this[_0x5a5acd(0x739)](_0x27d1cf);else{if('MoHOh'===_0x5a5acd(0x2a5))_0x31e04c[_0x5a5acd(0x6a7)][_0x5a5acd(0x703)]['call'](this),this[_0x5a5acd(0x5ba)]();else break;}}}},Spriteset_Base['prototype'][_0x526668(0x739)]=function(_0x2b44e3){const _0x525506=_0x526668,_0x49e633=$dataAnimations[_0x2b44e3['animationId']],_0xe5fee4=this[_0x525506(0x252)](_0x2b44e3),_0xaface5=_0x2b44e3['mirror'],_0x1358b0=_0x2b44e3[_0x525506(0x737)];let _0x5a2fd7=this['animationBaseDelay']();const _0x520c06=this[_0x525506(0x53b)]();if(this[_0x525506(0x7ac)](_0x49e633))for(const _0x56b58f of _0xe5fee4){this[_0x525506(0x6a3)]([_0x56b58f],_0x49e633,_0xaface5,_0x5a2fd7,_0x1358b0),_0x5a2fd7+=_0x520c06;}else this['createPointAnimationSprite'](_0xe5fee4,_0x49e633,_0xaface5,_0x5a2fd7,_0x1358b0);},Spriteset_Base['prototype'][_0x526668(0x252)]=function(_0x377ec2){const _0x590ad3=_0x526668,_0x12708b=new Sprite_Clickable();_0x12708b['x']=_0x377ec2['x'],_0x12708b['y']=_0x377ec2['y'],_0x12708b['z']=0x64;const _0x44d98e=this[_0x590ad3(0x738)]();return _0x44d98e[_0x590ad3(0x835)](_0x12708b),[_0x12708b];},Spriteset_Base['prototype'][_0x526668(0x738)]=function(){return this;},Spriteset_Map[_0x526668(0x4aa)][_0x526668(0x738)]=function(){const _0x3aa1e7=_0x526668;return this[_0x3aa1e7(0x5b8)]||this;},Spriteset_Battle['prototype'][_0x526668(0x738)]=function(){const _0x214f2c=_0x526668;return this[_0x214f2c(0x9e3)]||this;},Spriteset_Base[_0x526668(0x4aa)]['createPointAnimationSprite']=function(_0x3da110,_0x41c14b,_0x21e1b5,_0x1d2ee2,_0x53623f){const _0x1bfb69=_0x526668,_0x533d2a=this[_0x1bfb69(0x7bb)](_0x41c14b),_0x4f89f5=new(_0x533d2a?Sprite_AnimationMV:Sprite_Animation)();_0x4f89f5[_0x1bfb69(0x522)]=_0x3da110,_0x4f89f5[_0x1bfb69(0x822)](_0x3da110,_0x41c14b,_0x21e1b5,_0x1d2ee2),_0x4f89f5[_0x1bfb69(0x674)](_0x53623f),this[_0x1bfb69(0x6e1)][_0x1bfb69(0x835)](_0x4f89f5),this[_0x1bfb69(0x6e6)][_0x1bfb69(0x3ec)](_0x4f89f5);},Spriteset_Base['prototype'][_0x526668(0x9ca)]=function(_0x481792){const _0x2c647d=_0x526668;this['_pointAnimationSprites'][_0x2c647d(0x74e)](_0x481792),this[_0x2c647d(0x6e1)]['removeChild'](_0x481792);for(const _0x2c4979 of _0x481792[_0x2c647d(0x522)]){if(_0x2c647d(0x29e)!==_0x2c647d(0x698)){if(_0x2c4979[_0x2c647d(0x80f)]){if(_0x2c647d(0x904)===_0x2c647d(0x904))_0x2c4979[_0x2c647d(0x80f)]();else return this[_0x2c647d(0x679)]()[_0x2c647d(0x95a)];}const _0x407bf3=this['getPointAnimationLayer']();if(_0x407bf3)_0x407bf3['removeChild'](_0x2c4979);}else _0x3214c8[_0x2c647d(0x73f)](_0x58caf5);}_0x481792['destroy']();},Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x2af)]=function(){const _0x25ea82=_0x526668;for(const _0x47e35b of this[_0x25ea82(0x6e6)]){this[_0x25ea82(0x9ca)](_0x47e35b);}},Spriteset_Base['prototype'][_0x526668(0x711)]=function(){const _0x1cdb5a=_0x526668;return this[_0x1cdb5a(0x6e6)][_0x1cdb5a(0x5f3)]>0x0;},VisuMZ['CoreEngine'][_0x526668(0x5c1)]=Spriteset_Base[_0x526668(0x4aa)][_0x526668(0x5d2)],Spriteset_Base[_0x526668(0x4aa)]['isAnimationPlaying']=function(){const _0x33e352=_0x526668;return VisuMZ['CoreEngine'][_0x33e352(0x5c1)]['call'](this)||this[_0x33e352(0x711)]();},Spriteset_Map[_0x526668(0x3a5)]=VisuMZ['CoreEngine'][_0x526668(0x7c3)]['QoL'][_0x526668(0x8d0)]||![],VisuMZ[_0x526668(0x6a7)]['Scene_Map_createSpriteset_detach']=Scene_Map['prototype'][_0x526668(0x903)],Scene_Map[_0x526668(0x4aa)][_0x526668(0x903)]=function(){const _0x3c1c3a=_0x526668;VisuMZ['CoreEngine'][_0x3c1c3a(0x449)][_0x3c1c3a(0x5f4)](this);if(!Spriteset_Map[_0x3c1c3a(0x3a5)])return;const _0x33f146=this['_spriteset'];if(!_0x33f146)return;this[_0x3c1c3a(0x4a0)]=_0x33f146[_0x3c1c3a(0x4a0)];if(!this[_0x3c1c3a(0x4a0)])return;this[_0x3c1c3a(0x835)](this[_0x3c1c3a(0x4a0)]);},Spriteset_Battle[_0x526668(0x3a5)]=VisuMZ['CoreEngine'][_0x526668(0x7c3)][_0x526668(0x622)]['DetachBattlePictureContainer']||![],VisuMZ[_0x526668(0x6a7)][_0x526668(0x9fa)]=Scene_Battle[_0x526668(0x4aa)][_0x526668(0x903)],Scene_Battle[_0x526668(0x4aa)]['createSpriteset']=function(){const _0x360553=_0x526668;VisuMZ['CoreEngine'][_0x360553(0x9fa)][_0x360553(0x5f4)](this);if(!Spriteset_Battle[_0x360553(0x3a5)])return;const _0x552793=this[_0x360553(0x696)];if(!_0x552793)return;this[_0x360553(0x4a0)]=_0x552793[_0x360553(0x4a0)];if(!this[_0x360553(0x4a0)])return;this[_0x360553(0x835)](this[_0x360553(0x4a0)]);},Spriteset_Battle[_0x526668(0x4aa)][_0x526668(0x96e)]=function(){const _0x40a62c=_0x526668;this[_0x40a62c(0x76d)]=new PIXI[(_0x40a62c(0x85f))]['BlurFilter'](clamp=!![]),this[_0x40a62c(0x8f5)]=new Sprite(),this[_0x40a62c(0x8f5)][_0x40a62c(0xa29)]=SceneManager[_0x40a62c(0x3a3)](),this[_0x40a62c(0x8f5)][_0x40a62c(0x85f)]=[this[_0x40a62c(0x76d)]],this[_0x40a62c(0x580)][_0x40a62c(0x835)](this[_0x40a62c(0x8f5)]);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x4c9)]=Spriteset_Battle['prototype'][_0x526668(0x710)],Spriteset_Battle['prototype'][_0x526668(0x710)]=function(){const _0x5760cc=_0x526668;if(this[_0x5760cc(0x317)]()){if(_0x5760cc(0x9a8)!=='CTWdF')return _0x14f94c[_0x5760cc(0x298)]['HelpRect'][_0x5760cc(0x5f4)](this);else this['repositionEnemiesByResolution']();}VisuMZ[_0x5760cc(0x6a7)]['Spriteset_Battle_createEnemies'][_0x5760cc(0x5f4)](this);},Spriteset_Battle[_0x526668(0x4aa)]['coreEngineRepositionEnemies']=function(){const _0x589ba8=_0x526668,_0x54a4cb=VisuMZ[_0x589ba8(0x6a7)][_0x589ba8(0x7c3)][_0x589ba8(0x44f)];if(!_0x54a4cb)return![];if(Utils[_0x589ba8(0x5a3)]>=_0x589ba8(0x926)&&!_0x54a4cb[_0x589ba8(0x476)])return'zjgnk'!=='zjgnk'?_0x52ee08['layoutSettings'][_0x589ba8(0xa33)][_0x589ba8(0x5f4)](this):![];return _0x54a4cb[_0x589ba8(0x567)];},Spriteset_Battle['prototype'][_0x526668(0x28e)]=function(){const _0x1e6452=_0x526668;for(member of $gameTroop[_0x1e6452(0x58e)]()){_0x1e6452(0x823)===_0x1e6452(0x823)?member[_0x1e6452(0x314)]():(this[_0x1e6452(0x8a0)](this[_0x1e6452(0x640)]),this[_0x1e6452(0x640)]=null);}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base['prototype'][_0x526668(0x96f)],Window_Base[_0x526668(0x4aa)][_0x526668(0x96f)]=function(_0x65374c){const _0x274a97=_0x526668;_0x65374c['x']=Math[_0x274a97(0x746)](_0x65374c['x']),_0x65374c['y']=Math[_0x274a97(0x746)](_0x65374c['y']),_0x65374c['width']=Math[_0x274a97(0x746)](_0x65374c[_0x274a97(0x745)]),_0x65374c[_0x274a97(0x36a)]=Math['round'](_0x65374c['height']),this[_0x274a97(0x563)](),VisuMZ['CoreEngine'][_0x274a97(0x581)][_0x274a97(0x5f4)](this,_0x65374c),this[_0x274a97(0x882)]();},Window_Base[_0x526668(0x4aa)]['initDigitGrouping']=function(){const _0x52d617=_0x526668;this[_0x52d617(0x27e)]=VisuMZ['CoreEngine'][_0x52d617(0x7c3)][_0x52d617(0x622)][_0x52d617(0x4ee)],this[_0x52d617(0x3ce)]=VisuMZ[_0x52d617(0x6a7)][_0x52d617(0x7c3)][_0x52d617(0x622)][_0x52d617(0x75b)];},Window_Base[_0x526668(0x4aa)][_0x526668(0x367)]=function(){const _0x4c7750=_0x526668;return VisuMZ[_0x4c7750(0x6a7)]['Settings']['Window'][_0x4c7750(0x2be)];},Window_Base[_0x526668(0x4aa)][_0x526668(0x421)]=function(){const _0x551f80=_0x526668;return VisuMZ[_0x551f80(0x6a7)][_0x551f80(0x7c3)]['Window']['ItemPadding'];},Window_Base['prototype'][_0x526668(0x571)]=function(){const _0x1e17f2=_0x526668;$gameSystem[_0x1e17f2(0x39f)]?'xALtX'===_0x1e17f2(0x5bd)?this[_0x1e17f2(0x961)]=$gameSystem[_0x1e17f2(0x39f)]():(_0x42b880[_0x1e17f2(0x6a7)]['Scene_Map_updateMain'][_0x1e17f2(0x5f4)](this),this[_0x1e17f2(0x701)]()):this['backOpacity']=VisuMZ[_0x1e17f2(0x6a7)][_0x1e17f2(0x7c3)]['Window'][_0x1e17f2(0x8ac)];},Window_Base['prototype']['translucentOpacity']=function(){const _0x1c8e21=_0x526668;return VisuMZ['CoreEngine'][_0x1c8e21(0x7c3)][_0x1c8e21(0x2ae)][_0x1c8e21(0x95c)];},Window_Base[_0x526668(0x4aa)][_0x526668(0x8a9)]=function(){const _0x2288d0=_0x526668;return VisuMZ[_0x2288d0(0x6a7)]['Settings'][_0x2288d0(0x2ae)][_0x2288d0(0x210)];},VisuMZ[_0x526668(0x6a7)][_0x526668(0x6d8)]=Window_Base[_0x526668(0x4aa)][_0x526668(0x894)],Window_Base[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x8e2553=_0x526668;VisuMZ['CoreEngine']['Window_Base_update'][_0x8e2553(0x5f4)](this),this[_0x8e2553(0x36c)]();},Window_Base['prototype'][_0x526668(0x6ca)]=function(){const _0x2abe8c=_0x526668;if(this[_0x2abe8c(0x71d)]){this[_0x2abe8c(0x7e2)]+=this[_0x2abe8c(0x8a9)]();if(this[_0x2abe8c(0x390)]()){if(_0x2abe8c(0x806)===_0x2abe8c(0x806))this[_0x2abe8c(0x71d)]=![];else{if(_0x4158e4[_0x2abe8c(0x666)](_0x1ab37c[_0x2abe8c(0x665)]()))return!![];}}}},Window_Base[_0x526668(0x4aa)][_0x526668(0x7d1)]=function(){const _0x1835b4=_0x526668;if(this[_0x1835b4(0x8ae)]){this[_0x1835b4(0x7e2)]-=this[_0x1835b4(0x8a9)]();if(this[_0x1835b4(0x6c9)]()){if(_0x1835b4(0x899)==='wXTWw')this[_0x1835b4(0x8ae)]=![];else return _0x2bc902['actor']()?_0x15b6cf['actor']()[_0x1835b4(0x217)](_0x453c58):_0x1649ac[_0x1835b4(0x4aa)][_0x1835b4(0x1f5)][_0x1835b4(0x5f4)](this,_0x5d2ae1);}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x9da)]=Window_Base[_0x526668(0x4aa)][_0x526668(0x714)],Window_Base[_0x526668(0x4aa)][_0x526668(0x714)]=function(_0x2220a8,_0x2b03e5,_0x54e2d3,_0x418c7a,_0x7ea99a){const _0x4dcb8d=_0x526668;if(this[_0x4dcb8d(0xa2e)]())_0x2220a8=VisuMZ[_0x4dcb8d(0x733)](_0x2220a8);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x4dcb8d(0x5f4)](this,_0x2220a8,_0x2b03e5,_0x54e2d3,_0x418c7a,_0x7ea99a);},Window_Base[_0x526668(0x4aa)][_0x526668(0xa2e)]=function(){const _0x5a31aa=_0x526668;return this[_0x5a31aa(0x27e)];},VisuMZ[_0x526668(0x6a7)]['Window_Base_createTextState']=Window_Base[_0x526668(0x4aa)][_0x526668(0x238)],Window_Base['prototype'][_0x526668(0x238)]=function(_0x3be04d,_0x2742d4,_0x324d05,_0x4fbd1f){const _0x1da0bf=_0x526668;var _0x12be54=VisuMZ['CoreEngine'][_0x1da0bf(0x564)][_0x1da0bf(0x5f4)](this,_0x3be04d,_0x2742d4,_0x324d05,_0x4fbd1f);if(this[_0x1da0bf(0x7da)]())_0x12be54[_0x1da0bf(0x635)]=VisuMZ[_0x1da0bf(0x733)](_0x12be54[_0x1da0bf(0x635)]);return _0x12be54;},Window_Base[_0x526668(0x4aa)]['useDigitGroupingEx']=function(){const _0x491f84=_0x526668;return this[_0x491f84(0x3ce)];},Window_Base[_0x526668(0x4aa)][_0x526668(0x73c)]=function(_0x32ace3){const _0x839d35=_0x526668;this[_0x839d35(0x27e)]=_0x32ace3;},Window_Base[_0x526668(0x4aa)][_0x526668(0x4ca)]=function(_0x31262c){const _0x212e7f=_0x526668;this[_0x212e7f(0x3ce)]=_0x31262c;},VisuMZ[_0x526668(0x6a7)]['Window_Base_drawIcon']=Window_Base[_0x526668(0x4aa)]['drawIcon'],Window_Base[_0x526668(0x4aa)][_0x526668(0x2a8)]=function(_0x224f6f,_0x3c7f07,_0x415487){const _0x3b9340=_0x526668;_0x3c7f07=Math[_0x3b9340(0x746)](_0x3c7f07),_0x415487=Math[_0x3b9340(0x746)](_0x415487),VisuMZ[_0x3b9340(0x6a7)][_0x3b9340(0x74a)][_0x3b9340(0x5f4)](this,_0x224f6f,_0x3c7f07,_0x415487);},VisuMZ[_0x526668(0x6a7)]['Window_Base_drawFace']=Window_Base[_0x526668(0x4aa)]['drawFace'],Window_Base[_0x526668(0x4aa)][_0x526668(0x697)]=function(_0x4e6663,_0x2ef44e,_0x564edf,_0xc8143,_0x150b54,_0x355f19){const _0x32e558=_0x526668;_0x150b54=_0x150b54||ImageManager[_0x32e558(0x4c1)],_0x355f19=_0x355f19||ImageManager[_0x32e558(0x9aa)],_0x564edf=Math['round'](_0x564edf),_0xc8143=Math['round'](_0xc8143),_0x150b54=Math[_0x32e558(0x746)](_0x150b54),_0x355f19=Math[_0x32e558(0x746)](_0x355f19),VisuMZ[_0x32e558(0x6a7)][_0x32e558(0x965)][_0x32e558(0x5f4)](this,_0x4e6663,_0x2ef44e,_0x564edf,_0xc8143,_0x150b54,_0x355f19);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x25b)]=Window_Base['prototype']['drawCharacter'],Window_Base[_0x526668(0x4aa)][_0x526668(0x2c1)]=function(_0x5b7309,_0x32d27f,_0x5b63a4,_0x316549){const _0x57d582=_0x526668;_0x5b63a4=Math['round'](_0x5b63a4),_0x316549=Math[_0x57d582(0x746)](_0x316549),VisuMZ[_0x57d582(0x6a7)][_0x57d582(0x25b)][_0x57d582(0x5f4)](this,_0x5b7309,_0x32d27f,_0x5b63a4,_0x316549);},VisuMZ[_0x526668(0x6a7)]['Window_Selectable_itemRect']=Window_Selectable['prototype'][_0x526668(0x7e1)],Window_Selectable[_0x526668(0x4aa)]['itemRect']=function(_0x27c4e7){const _0x4f5cda=_0x526668;let _0x59a3d5=VisuMZ[_0x4f5cda(0x6a7)][_0x4f5cda(0x653)][_0x4f5cda(0x5f4)](this,_0x27c4e7);return _0x59a3d5['x']=Math[_0x4f5cda(0x746)](_0x59a3d5['x']),_0x59a3d5['y']=Math[_0x4f5cda(0x746)](_0x59a3d5['y']),_0x59a3d5[_0x4f5cda(0x745)]=Math[_0x4f5cda(0x746)](_0x59a3d5[_0x4f5cda(0x745)]),_0x59a3d5[_0x4f5cda(0x36a)]=Math[_0x4f5cda(0x746)](_0x59a3d5[_0x4f5cda(0x36a)]),_0x59a3d5;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x90f)]=Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x471)],Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x471)]=function(_0x4780b6,_0x103531,_0x42a4e6){const _0x30ec7f=_0x526668;_0x103531=Math[_0x30ec7f(0x746)](_0x103531),_0x42a4e6=Math[_0x30ec7f(0x746)](_0x42a4e6),VisuMZ[_0x30ec7f(0x6a7)]['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x4780b6,_0x103531,_0x42a4e6);},Window_Base[_0x526668(0x4aa)][_0x526668(0x882)]=function(){const _0x22757e=_0x526668;this[_0x22757e(0x2e9)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x22757e(0x766)]['x'],'targetScaleY':this[_0x22757e(0x766)]['y'],'targetOpacity':this[_0x22757e(0x494)],'targetBackOpacity':this[_0x22757e(0x961)],'targetContentsOpacity':this[_0x22757e(0x7fb)]};},Window_Base[_0x526668(0x4aa)][_0x526668(0x36c)]=function(){const _0x4cb0c6=_0x526668;if(!this[_0x4cb0c6(0x2e9)])return;if(this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x7ad)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x369)]),this['y']=this[_0x4cb0c6(0x39b)](this['y'],this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x7f7)]),this['scale']['x']=this['applyCoreEasing'](this[_0x4cb0c6(0x766)]['x'],this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x6ad)]),this['scale']['y']=this[_0x4cb0c6(0x39b)](this['scale']['y'],this['_coreEasing'][_0x4cb0c6(0x8e2)]),this['opacity']=this[_0x4cb0c6(0x39b)](this[_0x4cb0c6(0x494)],this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x2d2)]),this[_0x4cb0c6(0x961)]=this[_0x4cb0c6(0x39b)](this[_0x4cb0c6(0x961)],this['_coreEasing']['targetBackOpacity']),this['contentsOpacity']=this['applyCoreEasing'](this[_0x4cb0c6(0x7fb)],this[_0x4cb0c6(0x2e9)]['targetContentsOpacity']),this[_0x4cb0c6(0x2e9)][_0x4cb0c6(0x7ad)]--;},Window_Base[_0x526668(0x4aa)]['applyCoreEasing']=function(_0x331c61,_0x2e7355){const _0x458e2d=_0x526668;if(!this[_0x458e2d(0x2e9)])return _0x2e7355;const _0x158c4e=this[_0x458e2d(0x2e9)]['duration'],_0x1d3513=this['_coreEasing'][_0x458e2d(0x91c)],_0x2c4647=this['calcCoreEasing']((_0x1d3513-_0x158c4e)/_0x1d3513),_0x1ac1fe=this[_0x458e2d(0x879)]((_0x1d3513-_0x158c4e+0x1)/_0x1d3513),_0xcb0fc3=(_0x331c61-_0x2e7355*_0x2c4647)/(0x1-_0x2c4647);return _0xcb0fc3+(_0x2e7355-_0xcb0fc3)*_0x1ac1fe;},Window_Base[_0x526668(0x4aa)][_0x526668(0x879)]=function(_0x30b2e3){const _0x430198=_0x526668;if(!this['_coreEasing'])return _0x30b2e3;return VisuMZ[_0x430198(0x31f)](_0x30b2e3,this[_0x430198(0x2e9)][_0x430198(0x34c)]||_0x430198(0x83e));},Window_Base[_0x526668(0x4aa)][_0x526668(0x5a6)]=function(_0x5c4cae,_0x436c59){const _0x1a5acf=_0x526668;if(!this[_0x1a5acf(0x2e9)])return;this['x']=this[_0x1a5acf(0x2e9)]['targetX'],this['y']=this[_0x1a5acf(0x2e9)]['targetY'],this[_0x1a5acf(0x766)]['x']=this[_0x1a5acf(0x2e9)]['targetScaleX'],this[_0x1a5acf(0x766)]['y']=this[_0x1a5acf(0x2e9)][_0x1a5acf(0x8e2)],this['opacity']=this['_coreEasing']['targetOpacity'],this['backOpacity']=this[_0x1a5acf(0x2e9)]['targetBackOpacity'],this['contentsOpacity']=this['_coreEasing'][_0x1a5acf(0x9b4)],this['setupCoreEasing'](_0x5c4cae,_0x436c59,this['x'],this['y'],this[_0x1a5acf(0x766)]['x'],this[_0x1a5acf(0x766)]['y'],this[_0x1a5acf(0x494)],this[_0x1a5acf(0x961)],this[_0x1a5acf(0x7fb)]);},Window_Base[_0x526668(0x4aa)]['setupCoreEasing']=function(_0x1dccbf,_0x27dd4f,_0x48266d,_0x2cedb3,_0x47415a,_0xf02286,_0xa2c7f1,_0x494922,_0x3cae7f){const _0x3be08e=_0x526668;this[_0x3be08e(0x2e9)]={'duration':_0x1dccbf,'wholeDuration':_0x1dccbf,'type':_0x27dd4f,'targetX':_0x48266d,'targetY':_0x2cedb3,'targetScaleX':_0x47415a,'targetScaleY':_0xf02286,'targetOpacity':_0xa2c7f1,'targetBackOpacity':_0x494922,'targetContentsOpacity':_0x3cae7f};},Window_Base[_0x526668(0x4aa)][_0x526668(0x4e6)]=function(_0x4a5b4a,_0x4849e7,_0x49a763,_0x5c34a1,_0x4a0fb0){const _0x342a0f=_0x526668;this['resetFontSettings'](),this[_0x342a0f(0x255)][_0x342a0f(0x996)]=VisuMZ['CoreEngine'][_0x342a0f(0x7c3)][_0x342a0f(0x691)][_0x342a0f(0x324)];const _0x3f3c05=VisuMZ[_0x342a0f(0x6a7)]['Settings'][_0x342a0f(0x691)]['GoldIcon'];if(_0x3f3c05>0x0&&_0x4849e7===TextManager[_0x342a0f(0x704)]){const _0x16e99e=_0x5c34a1+(this[_0x342a0f(0x367)]()-ImageManager[_0x342a0f(0x88a)])/0x2;this[_0x342a0f(0x2a8)](_0x3f3c05,_0x49a763+(_0x4a0fb0-ImageManager['iconWidth']),_0x16e99e),_0x4a0fb0-=ImageManager[_0x342a0f(0x411)]+0x4;}else this[_0x342a0f(0x89c)](ColorManager[_0x342a0f(0x9cb)]()),this[_0x342a0f(0x714)](_0x4849e7,_0x49a763,_0x5c34a1,_0x4a0fb0,_0x342a0f(0x43b)),_0x4a0fb0-=this[_0x342a0f(0x301)](_0x4849e7)+0x6;this[_0x342a0f(0x485)]();const _0x1184e6=this['textWidth'](this[_0x342a0f(0x27e)]?VisuMZ[_0x342a0f(0x733)](_0x4a5b4a):_0x4a5b4a);_0x1184e6>_0x4a0fb0?this[_0x342a0f(0x714)](VisuMZ[_0x342a0f(0x6a7)][_0x342a0f(0x7c3)][_0x342a0f(0x691)][_0x342a0f(0x20c)],_0x49a763,_0x5c34a1,_0x4a0fb0,_0x342a0f(0x43b)):_0x342a0f(0x63e)==='vdfic'?this[_0x342a0f(0x714)](_0x4a5b4a,_0x49a763,_0x5c34a1,_0x4a0fb0,_0x342a0f(0x43b)):(_0x5996d8[_0x342a0f(0x6a7)][_0x342a0f(0x469)][_0x342a0f(0x5f4)](this,_0x3163f7,_0x88b02,_0xd53953,_0xf00c88,_0x2ac4c2),this[_0x342a0f(0xa16)]()),this[_0x342a0f(0x726)]();},Window_Base[_0x526668(0x4aa)]['drawIconBySize']=function(_0x22cd4a,_0x4ef1a9,_0x35e133,_0x18e0a9,_0x5dadc2){const _0x39e312=_0x526668,_0x236fd7=ImageManager[_0x39e312(0x272)](_0x39e312(0x9e6)),_0x2a7853=ImageManager[_0x39e312(0x411)],_0x239517=ImageManager['iconHeight'],_0x36a6df=_0x22cd4a%0x10*_0x2a7853,_0x3e63e5=Math[_0x39e312(0x749)](_0x22cd4a/0x10)*_0x239517,_0x5611ef=_0x18e0a9,_0x32dfd2=_0x18e0a9;this[_0x39e312(0x255)][_0x39e312(0x8d3)][_0x39e312(0x5ed)]=_0x5dadc2,this[_0x39e312(0x255)][_0x39e312(0x484)](_0x236fd7,_0x36a6df,_0x3e63e5,_0x2a7853,_0x239517,_0x4ef1a9,_0x35e133,_0x5611ef,_0x32dfd2),this[_0x39e312(0x255)]['_context']['imageSmoothingEnabled']=!![];},Window_Base[_0x526668(0x4aa)][_0x526668(0x2a1)]=function(_0x51d99b,_0x226731,_0x17ec16,_0x1fe57e,_0x31d606,_0x32329d){const _0x40dee0=_0x526668,_0x38852f=Math[_0x40dee0(0x749)]((_0x17ec16-0x2)*_0x1fe57e),_0x79d0a=Sprite_Gauge[_0x40dee0(0x4aa)]['gaugeHeight'][_0x40dee0(0x5f4)](this),_0x424ae8=_0x226731+this[_0x40dee0(0x367)]()-_0x79d0a-0x2;this[_0x40dee0(0x255)][_0x40dee0(0x9c9)](_0x51d99b,_0x424ae8,_0x17ec16,_0x79d0a,ColorManager['gaugeBackColor']()),this[_0x40dee0(0x255)][_0x40dee0(0x829)](_0x51d99b+0x1,_0x424ae8+0x1,_0x38852f,_0x79d0a-0x2,_0x31d606,_0x32329d);},Window_Selectable[_0x526668(0x4aa)][_0x526668(0x35d)]=function(_0x1b5885){const _0x55d054=_0x526668;let _0x3c9c3e=this[_0x55d054(0x277)]();const _0x376185=this['maxItems'](),_0x4e87a9=this[_0x55d054(0x779)]();if(this[_0x55d054(0x8b0)]()&&(_0x3c9c3e<_0x376185||_0x1b5885&&_0x4e87a9===0x1)){if('AyGuJ'===_0x55d054(0x396)){if(_0x448996['inBattle']())return;_0x47b85e[_0x55d054(0x7b1)](_0x2c815f,_0x511896);const _0x290ca7=_0x4a17c4[_0x55d054(0x8c4)];if(_0x290ca7[_0x55d054(0x78d)](/Front/i))_0x177696['setSideView'](![]);else _0x290ca7[_0x55d054(0x78d)](/Side/i)?_0x308ada[_0x55d054(0x441)](!![]):_0x65dcc9['setSideView'](!_0x422c4e[_0x55d054(0x551)]());}else{_0x3c9c3e+=_0x4e87a9;if(_0x3c9c3e>=_0x376185)_0x3c9c3e=_0x376185-0x1;this[_0x55d054(0x913)](_0x3c9c3e);}}else!this['isUseModernControls']()&&((_0x3c9c3e<_0x376185-_0x4e87a9||_0x1b5885&&_0x4e87a9===0x1)&&this['smoothSelect']((_0x3c9c3e+_0x4e87a9)%_0x376185));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x7a8)]=Window_Selectable['prototype'][_0x526668(0x35d)],Window_Selectable[_0x526668(0x4aa)][_0x526668(0x35d)]=function(_0x213437){const _0x1e1ed2=_0x526668;this[_0x1e1ed2(0x8b0)]()&&_0x213437&&this['maxCols']()===0x1&&this[_0x1e1ed2(0x277)]()===this[_0x1e1ed2(0x374)]()-0x1?this[_0x1e1ed2(0x913)](0x0):_0x1e1ed2(0x4bc)===_0x1e1ed2(0x375)?(_0x4671c4[_0x1e1ed2(0x642)](_0x1e1ed2(0x788)),_0x41d75e[_0x1e1ed2(0x642)](_0x22a00e)):VisuMZ[_0x1e1ed2(0x6a7)]['Window_Selectable_cursorDown'][_0x1e1ed2(0x5f4)](this,_0x213437);},Window_Selectable[_0x526668(0x4aa)][_0x526668(0x960)]=function(_0x4533f9){const _0x51436b=_0x526668;let _0x3de806=Math['max'](0x0,this[_0x51436b(0x277)]());const _0x5d9da2=this[_0x51436b(0x374)](),_0x321162=this[_0x51436b(0x779)]();if(this[_0x51436b(0x8b0)]()&&_0x3de806>0x0||_0x4533f9&&_0x321162===0x1){if(_0x51436b(0x8fc)!==_0x51436b(0x416)){_0x3de806-=_0x321162;if(_0x3de806<=0x0)_0x3de806=0x0;this['smoothSelect'](_0x3de806);}else _0x4be7d3[_0x51436b(0x6a7)][_0x51436b(0x295)]['call'](this,_0x116d6b),this['_centerElementCoreEngine'](_0x15b1a9);}else!this[_0x51436b(0x8b0)]()&&((_0x3de806>=_0x321162||_0x4533f9&&_0x321162===0x1)&&this[_0x51436b(0x913)]((_0x3de806-_0x321162+_0x5d9da2)%_0x5d9da2));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x7ca)]=Window_Selectable[_0x526668(0x4aa)]['cursorUp'],Window_Selectable[_0x526668(0x4aa)][_0x526668(0x960)]=function(_0x18e0d9){const _0x100327=_0x526668;this[_0x100327(0x8b0)]()&&_0x18e0d9&&this['maxCols']()===0x1&&this[_0x100327(0x277)]()===0x0?_0x100327(0x493)!==_0x100327(0x493)?this[_0x100327(0x592)]={'SideView':_0x326c64[_0x100327(0x231)],'BattleSystem':this[_0x100327(0x6f8)](),'FontSize':_0x38e35a[_0x100327(0x2ee)][_0x100327(0x996)],'Padding':0xc}:this[_0x100327(0x913)](this[_0x100327(0x374)]()-0x1):VisuMZ[_0x100327(0x6a7)][_0x100327(0x7ca)][_0x100327(0x5f4)](this,_0x18e0d9);},Window_Selectable[_0x526668(0x4aa)]['isUseModernControls']=function(){const _0x13c0da=_0x526668;return VisuMZ[_0x13c0da(0x6a7)][_0x13c0da(0x7c3)][_0x13c0da(0x622)][_0x13c0da(0x62d)];},VisuMZ['CoreEngine'][_0x526668(0x5c7)]=Window_Selectable[_0x526668(0x4aa)]['processCursorMove'],Window_Selectable['prototype'][_0x526668(0x59d)]=function(){const _0x32d314=_0x526668;this[_0x32d314(0x8b0)]()?(this[_0x32d314(0x5eb)](),this[_0x32d314(0x7ce)]()):VisuMZ['CoreEngine'][_0x32d314(0x5c7)][_0x32d314(0x5f4)](this);},Window_Selectable[_0x526668(0x4aa)]['allowShiftScrolling']=function(){return!![];},Window_Selectable['prototype'][_0x526668(0x5eb)]=function(){const _0x52c17d=_0x526668;if(this[_0x52c17d(0x794)]()){if('Vvelo'!==_0x52c17d(0x4a8))_0x4d5bed(_0x3970f2);else{const _0x1cb6d9=this[_0x52c17d(0x277)]();if(Input[_0x52c17d(0x48e)](_0x52c17d(0x8d6))){if(_0x52c17d(0x63f)===_0x52c17d(0x5f5))return _0x49e91d[_0x52c17d(0x6a7)][_0x52c17d(0x7c3)][_0x52c17d(0x42a)]['OutlineColor'];else{if(Input[_0x52c17d(0x986)](_0x52c17d(0x5c0))&&this['allowShiftScrolling']())'zzTnT'==='zzTnT'?this[_0x52c17d(0x8a2)]():(this['scaleSprite'](_0x5f39cf),this[_0x52c17d(0x4e0)](_0x253abd));else{if('FkeDs'!==_0x52c17d(0x933)){const _0x364eac=_0x66976d[_0xc69a64];_0x364eac?this[_0x52c17d(0x822)](_0x364eac[_0x52c17d(0x9ae)],0x0):this['terminate']();}else this[_0x52c17d(0x35d)](Input[_0x52c17d(0x72b)](_0x52c17d(0x8d6)));}}}if(Input['isRepeated']('up')){if(Input[_0x52c17d(0x986)](_0x52c17d(0x5c0))&&this[_0x52c17d(0x76b)]()){if(_0x52c17d(0x1fb)!==_0x52c17d(0x1fb)){if(this[_0x52c17d(0x391)]===_0x52c17d(0x751)&&!_0x569c23[_0x52c17d(0x6ed)]())return;if(_0x2dd6e7['isNumpadPressed']())return;_0x66f79c[_0x52c17d(0x6a7)][_0x52c17d(0x55b)]['call'](this,_0x1181f3),this['switchModes'](_0x52c17d(0x274));}else this[_0x52c17d(0xa03)]();}else this['cursorUp'](Input['isTriggered']('up'));}if(Input['isRepeated'](_0x52c17d(0x43b))){if('QBAAU'!==_0x52c17d(0x362))return _0x4f99f0[_0x52c17d(0x6a7)][_0x52c17d(0x7c3)][_0x52c17d(0x622)][_0x52c17d(0x1fa)];else this['cursorRight'](Input[_0x52c17d(0x72b)]('right'));}if(Input['isRepeated']('left')){if(_0x52c17d(0x513)!==_0x52c17d(0x2b7))this['cursorLeft'](Input['isTriggered'](_0x52c17d(0x841)));else{if(_0x1c58f6[_0x52c17d(0x61a)]())return;_0x5d674f[_0x52c17d(0x7b1)](_0x311087,_0x21e641);const _0x2f1589=_0x1a38d5['min'](_0x5318be[_0x52c17d(0x561)],_0x1b13a9['EndingID']),_0x133634=_0x368b2f['max'](_0x33395b[_0x52c17d(0x561)],_0x12164d[_0x52c17d(0x800)]),_0x184051=(_0xa9bb5e[_0x52c17d(0x990)]||0x0)/0x64;for(let _0x4da368=_0x2f1589;_0x4da368<=_0x133634;_0x4da368++){const _0x3b0864=_0x5e8a39[_0x52c17d(0x941)]()<=_0x184051;_0x3a9140[_0x52c17d(0x3c1)](_0x4da368,_0x3b0864);}}}!this[_0x52c17d(0x6d5)](_0x52c17d(0x280))&&Input[_0x52c17d(0x48e)](_0x52c17d(0x280))&&('PoVwx'===_0x52c17d(0x4f5)?this[_0x52c17d(0xa0b)]():this[_0x52c17d(0x8a2)]());if(!this['isHandled'](_0x52c17d(0x331))&&Input[_0x52c17d(0x48e)]('pageup')){if(_0x52c17d(0x9ff)!=='IGeaD')for(const _0x185187 of _0x44ea23){this[_0x52c17d(0x93f)]([_0x185187],_0x536c0b,_0x2b2f1f,_0x52e72c,_0x2132fb),_0xec63c7+=_0x458ca6;}else this[_0x52c17d(0xa03)]();}this[_0x52c17d(0x277)]()!==_0x1cb6d9&&(_0x52c17d(0x3a4)!==_0x52c17d(0x962)?this[_0x52c17d(0xa07)]():(_0x2aaddd[_0x52c17d(0x6a7)][_0x52c17d(0x46b)][_0x52c17d(0x5f4)](this),this['forceOutOfPlaytest'](),this['createFauxAnimationQueue'](),this[_0x52c17d(0x5a1)]()));}}},Window_Selectable['prototype'][_0x526668(0x7ce)]=function(){const _0x6adb52=_0x526668;if(this[_0x6adb52(0x794)]()){if(_0x6adb52(0x47e)!=='FkDsK'){const _0xb1045d=this[_0x6adb52(0x277)]();if(Input[_0x6adb52(0x72b)]('home')){if(_0x6adb52(0x8d9)===_0x6adb52(0x372)){const _0xbb61b3=_0x48d275[_0x6adb52(0x5ea)]();this[_0x6adb52(0x8e1)]=_0x3c0c62['randomInt'](_0xbb61b3)+_0x2324b2[_0x6adb52(0x479)](_0xbb61b3)+this[_0x6adb52(0xa26)]();}else this[_0x6adb52(0x913)](Math[_0x6adb52(0x845)](this[_0x6adb52(0x277)](),0x0));}Input[_0x6adb52(0x72b)](_0x6adb52(0x8bd))&&(_0x6adb52(0x30d)===_0x6adb52(0x436)?(_0x1167ed[_0x6adb52(0x6a7)][_0x6adb52(0x35f)][_0x6adb52(0x5f4)](this,_0x1e4987,_0x26bada,_0x5d0f4f,_0x9d08e,_0xf5b47e,_0x4dc52f,_0x269564),this[_0x6adb52(0xa16)]()):this[_0x6adb52(0x913)](Math[_0x6adb52(0x431)](this[_0x6adb52(0x277)](),this[_0x6adb52(0x374)]()-0x1))),this[_0x6adb52(0x277)]()!==_0xb1045d&&this[_0x6adb52(0xa07)]();}else _0x180c6c[_0x6adb52(0x56a)](),this[_0x6adb52(0x391)]==='keyboard'?this[_0x6adb52(0x2ad)](_0x6adb52(0x274)):this[_0x6adb52(0x2ad)]('keyboard');}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x24f)]=Window_Selectable[_0x526668(0x4aa)][_0x526668(0x3fe)],Window_Selectable[_0x526668(0x4aa)][_0x526668(0x3fe)]=function(){const _0x58ffc0=_0x526668;if(this['isUseModernControls']())this[_0x58ffc0(0x846)]();else{if(_0x58ffc0(0x4c8)!==_0x58ffc0(0x4c8))return _0x51bd5[_0x58ffc0(0x4aa)][_0x58ffc0(0x301)]['call'](this,_0xe21917);else VisuMZ[_0x58ffc0(0x6a7)]['Window_Selectable_processTouch'][_0x58ffc0(0x5f4)](this);}},Window_Selectable[_0x526668(0x4aa)][_0x526668(0x846)]=function(){const _0xa5a3c9=_0x526668;VisuMZ['CoreEngine'][_0xa5a3c9(0x24f)]['call'](this);},Window_Selectable['prototype'][_0x526668(0x278)]=function(){const _0x3a7fd0=_0x526668;return VisuMZ[_0x3a7fd0(0x6a7)]['Settings'][_0x3a7fd0(0x2ae)][_0x3a7fd0(0x589)];},Window_Selectable[_0x526668(0x4aa)][_0x526668(0x8db)]=function(){const _0x24692f=_0x526668;return VisuMZ['CoreEngine']['Settings'][_0x24692f(0x2ae)][_0x24692f(0x3ea)];},Window_Selectable[_0x526668(0x4aa)]['itemHeight']=function(){const _0x5daeb3=_0x526668;return Window_Scrollable[_0x5daeb3(0x4aa)][_0x5daeb3(0x542)][_0x5daeb3(0x5f4)](this)+VisuMZ[_0x5daeb3(0x6a7)][_0x5daeb3(0x7c3)]['Window']['ItemHeight'];;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x448)]=Window_Selectable[_0x526668(0x4aa)][_0x526668(0x55e)],Window_Selectable['prototype'][_0x526668(0x55e)]=function(_0x1056cc){const _0x2f2f9e=_0x526668,_0x539c52=VisuMZ[_0x2f2f9e(0x6a7)][_0x2f2f9e(0x7c3)]['Window'];if(_0x539c52[_0x2f2f9e(0x652)]===![])return;_0x539c52[_0x2f2f9e(0x718)]?_0x2f2f9e(0x856)===_0x2f2f9e(0x2ea)?(_0x163c4c[_0x2f2f9e(0x6a7)]['Scene_Map_createSpriteset'][_0x2f2f9e(0x5f4)](this),_0x30ed4b=this[_0x2f2f9e(0x696)]):_0x539c52[_0x2f2f9e(0x718)][_0x2f2f9e(0x5f4)](this,_0x1056cc):VisuMZ[_0x2f2f9e(0x6a7)][_0x2f2f9e(0x448)]['call'](this,_0x1056cc);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x690)]=Window_Gold[_0x526668(0x4aa)][_0x526668(0x7f0)],Window_Gold[_0x526668(0x4aa)][_0x526668(0x7f0)]=function(){const _0x467dc5=_0x526668;if(this[_0x467dc5(0x57f)]()){if(_0x467dc5(0x1f9)!=='MBkph')this[_0x467dc5(0x85d)]();else return _0x4047f0[_0x467dc5(0x41a)](this),_0x22b255[_0x467dc5(0x6a7)]['Game_Interpreter_PluginCommand'][_0x467dc5(0x5f4)](this,_0x17aa2d);}else VisuMZ[_0x467dc5(0x6a7)]['Window_Gold_refresh'][_0x467dc5(0x5f4)](this);},Window_Gold['prototype'][_0x526668(0x57f)]=function(){const _0x233847=_0x526668;if(TextManager[_0x233847(0x704)]!==this[_0x233847(0x704)]())return![];return VisuMZ[_0x233847(0x6a7)]['Settings'][_0x233847(0x691)][_0x233847(0x4a9)];},Window_Gold['prototype'][_0x526668(0x85d)]=function(){const _0xf4155f=_0x526668;this[_0xf4155f(0x726)](),this[_0xf4155f(0x255)][_0xf4155f(0x56a)](),this[_0xf4155f(0x255)][_0xf4155f(0x996)]=VisuMZ[_0xf4155f(0x6a7)][_0xf4155f(0x7c3)]['Gold']['GoldFontSize'];const _0x4a30b7=VisuMZ[_0xf4155f(0x6a7)][_0xf4155f(0x7c3)]['Gold'][_0xf4155f(0x353)],_0x103872=this[_0xf4155f(0x459)](0x0);if(_0x4a30b7>0x0){const _0x347d89=_0x103872['y']+(this[_0xf4155f(0x367)]()-ImageManager['iconHeight'])/0x2;this[_0xf4155f(0x2a8)](_0x4a30b7,_0x103872['x'],_0x347d89);const _0x202a53=ImageManager[_0xf4155f(0x411)]+0x4;_0x103872['x']+=_0x202a53,_0x103872[_0xf4155f(0x745)]-=_0x202a53;}this['changeTextColor'](ColorManager[_0xf4155f(0x9cb)]()),this[_0xf4155f(0x714)](this[_0xf4155f(0x704)](),_0x103872['x'],_0x103872['y'],_0x103872[_0xf4155f(0x745)],_0xf4155f(0x841));const _0x355eb5=this[_0xf4155f(0x301)](this[_0xf4155f(0x704)]())+0x6;;_0x103872['x']+=_0x355eb5,_0x103872[_0xf4155f(0x745)]-=_0x355eb5,this[_0xf4155f(0x485)]();const _0x54530c=this['value'](),_0x58b7a7=this[_0xf4155f(0x301)](this[_0xf4155f(0x27e)]?VisuMZ[_0xf4155f(0x733)](this['value']()):this[_0xf4155f(0x813)]());_0x58b7a7>_0x103872[_0xf4155f(0x745)]?this[_0xf4155f(0x714)](VisuMZ[_0xf4155f(0x6a7)][_0xf4155f(0x7c3)]['Gold'][_0xf4155f(0x20c)],_0x103872['x'],_0x103872['y'],_0x103872[_0xf4155f(0x745)],_0xf4155f(0x43b)):this['drawText'](this['value'](),_0x103872['x'],_0x103872['y'],_0x103872[_0xf4155f(0x745)],_0xf4155f(0x43b)),this[_0xf4155f(0x726)]();},Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x3b6)]=function(_0x486602,_0x4eeda7,_0x4cb1d0,_0x3de8a4,_0x520e18){const _0xa38cb9=_0x526668;_0x3de8a4=String(_0x3de8a4||'')[_0xa38cb9(0x4b5)]();if(VisuMZ[_0xa38cb9(0x6a7)][_0xa38cb9(0x7c3)][_0xa38cb9(0x81d)][_0xa38cb9(0x99a)]){const _0xc10e97=VisuMZ['GetParamIcon'](_0x3de8a4);_0x520e18?(this[_0xa38cb9(0x891)](_0xc10e97,_0x486602,_0x4eeda7,this[_0xa38cb9(0x2e4)]()),_0x4cb1d0-=this['gaugeLineHeight']()+0x2,_0x486602+=this[_0xa38cb9(0x2e4)]()+0x2):(this[_0xa38cb9(0x2a8)](_0xc10e97,_0x486602+0x2,_0x4eeda7+0x2),_0x4cb1d0-=ImageManager[_0xa38cb9(0x411)]+0x4,_0x486602+=ImageManager[_0xa38cb9(0x411)]+0x4);}const _0x4123f1=TextManager[_0xa38cb9(0x613)](_0x3de8a4);this[_0xa38cb9(0x726)](),this[_0xa38cb9(0x89c)](ColorManager[_0xa38cb9(0x9cb)]()),_0x520e18?(this[_0xa38cb9(0x255)]['fontSize']=this[_0xa38cb9(0x5a8)](),this['contents'][_0xa38cb9(0x714)](_0x4123f1,_0x486602,_0x4eeda7,_0x4cb1d0,this[_0xa38cb9(0x2e4)](),_0xa38cb9(0x841))):this['drawText'](_0x4123f1,_0x486602,_0x4eeda7,_0x4cb1d0),this[_0xa38cb9(0x726)]();},Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x5a8)]=function(){const _0x308c90=_0x526668;return $gameSystem[_0x308c90(0xa37)]()-0x8;},Window_StatusBase[_0x526668(0x4aa)]['drawActorClass']=function(_0x2c7f9f,_0x14b0a1,_0x5ec2df,_0x324cba){const _0x46d24b=_0x526668;_0x324cba=_0x324cba||0xa8,this[_0x46d24b(0x485)]();if(VisuMZ[_0x46d24b(0x6a7)][_0x46d24b(0x7c3)]['UI'][_0x46d24b(0x285)])this['drawTextEx'](_0x2c7f9f[_0x46d24b(0x9af)]()[_0x46d24b(0x3c6)],_0x14b0a1,_0x5ec2df,_0x324cba);else{if(_0x46d24b(0xa15)!==_0x46d24b(0x9f0)){const _0x1aa607=_0x2c7f9f[_0x46d24b(0x9af)]()[_0x46d24b(0x3c6)][_0x46d24b(0x38e)](/\\I\[(\d+)\]/gi,'');this[_0x46d24b(0x714)](_0x1aa607,_0x14b0a1,_0x5ec2df,_0x324cba);}else return _0x46d24b(0x3b5);}},Window_StatusBase[_0x526668(0x4aa)]['drawActorNickname']=function(_0x1d1888,_0x4a7a7d,_0x1e419b,_0x34665c){const _0x374fe0=_0x526668;_0x34665c=_0x34665c||0x10e,this[_0x374fe0(0x485)]();if(VisuMZ['CoreEngine'][_0x374fe0(0x7c3)]['UI'][_0x374fe0(0x6d3)])this['drawTextEx'](_0x1d1888[_0x374fe0(0x9f8)](),_0x4a7a7d,_0x1e419b,_0x34665c);else{if(_0x374fe0(0x5b9)==='xUKak'){this[_0x374fe0(0x726)](),this[_0x374fe0(0x255)][_0x374fe0(0x56a)](),this[_0x374fe0(0x255)]['fontSize']=_0x4f1bfe[_0x374fe0(0x6a7)][_0x374fe0(0x7c3)][_0x374fe0(0x691)][_0x374fe0(0x324)];const _0x10acc9=_0x59d9b9['CoreEngine'][_0x374fe0(0x7c3)]['Gold'][_0x374fe0(0x353)],_0x3d7a1f=this[_0x374fe0(0x459)](0x0);if(_0x10acc9>0x0){const _0x13f4fd=_0x3d7a1f['y']+(this[_0x374fe0(0x367)]()-_0x2ef4bc[_0x374fe0(0x88a)])/0x2;this[_0x374fe0(0x2a8)](_0x10acc9,_0x3d7a1f['x'],_0x13f4fd);const _0x302ea7=_0x27e9b9['iconWidth']+0x4;_0x3d7a1f['x']+=_0x302ea7,_0x3d7a1f[_0x374fe0(0x745)]-=_0x302ea7;}this[_0x374fe0(0x89c)](_0x1b2a84[_0x374fe0(0x9cb)]()),this[_0x374fe0(0x714)](this[_0x374fe0(0x704)](),_0x3d7a1f['x'],_0x3d7a1f['y'],_0x3d7a1f[_0x374fe0(0x745)],'left');const _0x3b98cc=this[_0x374fe0(0x301)](this[_0x374fe0(0x704)]())+0x6;;_0x3d7a1f['x']+=_0x3b98cc,_0x3d7a1f[_0x374fe0(0x745)]-=_0x3b98cc,this[_0x374fe0(0x485)]();const _0x1dbb0e=this['value'](),_0x1f185b=this[_0x374fe0(0x301)](this[_0x374fe0(0x27e)]?_0x3b384e[_0x374fe0(0x733)](this[_0x374fe0(0x813)]()):this['value']());_0x1f185b>_0x3d7a1f[_0x374fe0(0x745)]?this['drawText'](_0x3c9b0c[_0x374fe0(0x6a7)][_0x374fe0(0x7c3)][_0x374fe0(0x691)][_0x374fe0(0x20c)],_0x3d7a1f['x'],_0x3d7a1f['y'],_0x3d7a1f[_0x374fe0(0x745)],'right'):this[_0x374fe0(0x714)](this['value'](),_0x3d7a1f['x'],_0x3d7a1f['y'],_0x3d7a1f[_0x374fe0(0x745)],_0x374fe0(0x43b)),this[_0x374fe0(0x726)]();}else{const _0x327e98=_0x1d1888[_0x374fe0(0x9f8)]()[_0x374fe0(0x38e)](/\\I\[(\d+)\]/gi,'');this[_0x374fe0(0x714)](_0x1d1888[_0x374fe0(0x9f8)](),_0x4a7a7d,_0x1e419b,_0x34665c);}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3dc)]=Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x88b)],Window_StatusBase['prototype'][_0x526668(0x88b)]=function(_0x3de2cc,_0x32840c,_0x97e9b0){const _0x4898c5=_0x526668;if(this[_0x4898c5(0x6b4)]())this['drawActorExpGauge'](_0x3de2cc,_0x32840c,_0x97e9b0);VisuMZ[_0x4898c5(0x6a7)][_0x4898c5(0x3dc)][_0x4898c5(0x5f4)](this,_0x3de2cc,_0x32840c,_0x97e9b0);},Window_StatusBase[_0x526668(0x4aa)][_0x526668(0x6b4)]=function(){const _0x59cc11=_0x526668;return VisuMZ[_0x59cc11(0x6a7)]['Settings']['UI']['LvExpGauge'];},Window_StatusBase['prototype'][_0x526668(0x267)]=function(_0x254804,_0xe6393e,_0x1b44cc){const _0x86b512=_0x526668;if(!_0x254804)return;if(!_0x254804['isActor']())return;const _0x5ca751=0x80,_0x20983a=_0x254804[_0x86b512(0x312)]();let _0x3c5cdc=ColorManager[_0x86b512(0x67b)](),_0x5c69ca=ColorManager[_0x86b512(0x8b1)]();if(_0x20983a>=0x1){if(_0x86b512(0x99b)!==_0x86b512(0x99b))return!![];else _0x3c5cdc=ColorManager[_0x86b512(0x5c8)](),_0x5c69ca=ColorManager[_0x86b512(0x87e)]();}this[_0x86b512(0x2a1)](_0xe6393e,_0x1b44cc,_0x5ca751,_0x20983a,_0x3c5cdc,_0x5c69ca);},Window_EquipStatus['prototype'][_0x526668(0x34a)]=function(){const _0x2aaaf7=_0x526668;let _0x449b99=0x0;for(const _0xeaba3c of VisuMZ[_0x2aaaf7(0x6a7)][_0x2aaaf7(0x7c3)][_0x2aaaf7(0x81d)]['DisplayedParams']){if(_0x2aaaf7(0x71c)===_0x2aaaf7(0x8b3))this[_0x2aaaf7(0x89c)](_0x445d29['systemColor']()),this[_0x2aaaf7(0x714)](_0x34f9e5,_0x52cd15,_0x28b4fd,_0x39e243,_0x2aaaf7(0x43b)),_0x1f1e27-=this[_0x2aaaf7(0x301)](_0x4b0690)+0x6;else{const _0x5a4333=this[_0x2aaaf7(0x421)](),_0x1ace2f=this[_0x2aaaf7(0x587)](_0x449b99);this[_0x2aaaf7(0x9d7)](_0x5a4333,_0x1ace2f,_0xeaba3c),_0x449b99++;}}},Window_EquipStatus[_0x526668(0x4aa)][_0x526668(0x206)]=function(_0xdfb31d,_0x25dabc,_0x35a25a){const _0x146491=_0x526668,_0x296cd9=this[_0x146491(0x942)]()-this[_0x146491(0x421)]()*0x2;this[_0x146491(0x3b6)](_0xdfb31d,_0x25dabc,_0x296cd9,_0x35a25a,![]);},Window_EquipStatus[_0x526668(0x4aa)][_0x526668(0x386)]=function(_0x31a2c6,_0x5dd4e0,_0x4af1db){const _0x2d0b79=_0x526668,_0x5f0588=this[_0x2d0b79(0x62b)]();this[_0x2d0b79(0x485)](),this[_0x2d0b79(0x714)](this[_0x2d0b79(0x568)][_0x2d0b79(0x31a)](_0x4af1db,!![]),_0x31a2c6,_0x5dd4e0,_0x5f0588,_0x2d0b79(0x43b));},Window_EquipStatus[_0x526668(0x4aa)]['drawRightArrow']=function(_0x52132d,_0x55d6da){const _0x4ef512=_0x526668,_0x1e0b00=this[_0x4ef512(0x442)]();this[_0x4ef512(0x89c)](ColorManager['systemColor']());const _0x220b75=VisuMZ['CoreEngine'][_0x4ef512(0x7c3)]['UI'][_0x4ef512(0x9fd)];this[_0x4ef512(0x714)](_0x220b75,_0x52132d,_0x55d6da,_0x1e0b00,_0x4ef512(0x541));},Window_EquipStatus[_0x526668(0x4aa)][_0x526668(0x6b8)]=function(_0x50a4e8,_0x5e85e7,_0x553d10){const _0x519c25=_0x526668,_0x205054=this[_0x519c25(0x62b)](),_0x57a8a9=this[_0x519c25(0x594)][_0x519c25(0x31a)](_0x553d10),_0x5a2f8d=_0x57a8a9-this['_actor'][_0x519c25(0x31a)](_0x553d10);this[_0x519c25(0x89c)](ColorManager[_0x519c25(0x89a)](_0x5a2f8d)),this[_0x519c25(0x714)](this[_0x519c25(0x594)][_0x519c25(0x31a)](_0x553d10,!![]),_0x50a4e8,_0x5e85e7,_0x205054,'right');},VisuMZ[_0x526668(0x6a7)][_0x526668(0x3bb)]=Window_EquipItem[_0x526668(0x4aa)]['isEnabled'],Window_EquipItem['prototype'][_0x526668(0x1f5)]=function(_0x46d793){const _0x3f2a66=_0x526668;if(_0x46d793&&this[_0x3f2a66(0x568)]){if(_0x3f2a66(0x253)===_0x3f2a66(0x253))return this[_0x3f2a66(0x568)][_0x3f2a66(0x919)](_0x46d793);else!this[_0x3f2a66(0x430)]()&&_0x160b21!==null&&(_0xbdf0db=null);}else return VisuMZ['CoreEngine'][_0x3f2a66(0x3bb)][_0x3f2a66(0x5f4)](this,_0x46d793);},Window_StatusParams[_0x526668(0x4aa)][_0x526668(0x374)]=function(){const _0x1b3866=_0x526668;return VisuMZ[_0x1b3866(0x6a7)]['Settings']['Param'][_0x1b3866(0x6b9)][_0x1b3866(0x5f3)];},Window_StatusParams[_0x526668(0x4aa)]['drawItem']=function(_0x4ce888){const _0x4b8e33=_0x526668,_0x96a568=this[_0x4b8e33(0x459)](_0x4ce888),_0x1d380c=VisuMZ[_0x4b8e33(0x6a7)][_0x4b8e33(0x7c3)][_0x4b8e33(0x81d)][_0x4b8e33(0x6b9)][_0x4ce888],_0x2beba0=TextManager[_0x4b8e33(0x613)](_0x1d380c),_0x4e78e5=this[_0x4b8e33(0x568)][_0x4b8e33(0x31a)](_0x1d380c,!![]);this['drawParamText'](_0x96a568['x'],_0x96a568['y'],0xa0,_0x1d380c,![]),this[_0x4b8e33(0x485)](),this[_0x4b8e33(0x714)](_0x4e78e5,_0x96a568['x']+0xa0,_0x96a568['y'],0x3c,_0x4b8e33(0x43b));};if(VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41b)][_0x526668(0x5b6)]){VisuMZ[_0x526668(0x6a7)]['Settings']['KeyboardInput'][_0x526668(0x5bb)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x526668(0x7aa),'OK']);;VisuMZ[_0x526668(0x6a7)][_0x526668(0x482)]=Window_NameInput[_0x526668(0x4aa)]['initialize'],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x96f)]=function(_0x574b21){const _0x34ffb1=_0x526668;this[_0x34ffb1(0x391)]=this[_0x34ffb1(0x995)](),VisuMZ['CoreEngine'][_0x34ffb1(0x482)][_0x34ffb1(0x5f4)](this,_0x574b21);if(this[_0x34ffb1(0x391)]===_0x34ffb1(0x274)){if(_0x34ffb1(0x4cd)===_0x34ffb1(0x4cd))this['select'](0x0);else{try{_0xceb291[_0x34ffb1(0x6a7)]['Game_Interpreter_command355'][_0x34ffb1(0x5f4)](this);}catch(_0x2c5064){_0x3bbd03['isPlaytest']()&&(_0x20aae8[_0x34ffb1(0x642)]('Script\x20Call\x20Error'),_0x29811d[_0x34ffb1(0x642)](_0x2c5064));}return!![];}}else Input['clear'](),this['deselect']();},Window_NameInput[_0x526668(0x4aa)][_0x526668(0x995)]=function(){const _0x272eb2=_0x526668;if(Input['isGamepadConnected']())return _0x272eb2(0x274);return VisuMZ[_0x272eb2(0x6a7)]['Settings'][_0x272eb2(0x41b)][_0x272eb2(0x752)]||_0x272eb2(0x751);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x664)]=Window_NameInput[_0x526668(0x4aa)][_0x526668(0x8f7)],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x8f7)]=function(){const _0x76b404=_0x526668;if(!this[_0x76b404(0x390)]())return;if(!this['active'])return;if(this[_0x76b404(0x391)]===_0x76b404(0x751)&&Input[_0x76b404(0x73a)]()){if(_0x76b404(0x25e)!==_0x76b404(0x25e)){if(_0x530ed1&&_0x819b18[_0x76b404(0x276)]())return;_0x405965[_0x76b404(0x6a7)][_0x76b404(0x7f1)]['call'](this,_0x11292d,_0x3ae586,_0x59d6e1,_0x8b8e39);}else this[_0x76b404(0x2ad)]('default');}else{if(Input[_0x76b404(0x84a)]('backspace'))Input[_0x76b404(0x56a)](),this[_0x76b404(0x263)]();else{if(Input[_0x76b404(0x72b)]('tab')){if(_0x76b404(0x420)!==_0x76b404(0x7fd)){Input['clear']();if(this['_mode']===_0x76b404(0x751))this['switchModes'](_0x76b404(0x274));else{if(_0x76b404(0x282)===_0x76b404(0x6bf)){const _0x49620d=_0x76b404(0x2a2);this['_colorCache']=this[_0x76b404(0x435)]||{};if(this['_colorCache'][_0x49620d])return this[_0x76b404(0x435)][_0x49620d];const _0x21b2c6=_0x4c1f3e[_0x76b404(0x6a7)][_0x76b404(0x7c3)][_0x76b404(0x42a)][_0x76b404(0x249)];return this[_0x76b404(0x9f5)](_0x49620d,_0x21b2c6);}else this[_0x76b404(0x2ad)](_0x76b404(0x751));}}else{var _0x28f4f4=_0x593723(_0x350a6b['$1'])/0x64;_0x49521e+=_0x28f4f4;}}else{if(this['_mode']==='keyboard')this['processKeyboardHandling']();else{if(Input[_0x76b404(0x84a)](_0x76b404(0x37b))){if('hCZHr'===_0x76b404(0x79c))return _0x18513e[_0x76b404(0x298)][_0x76b404(0xa33)][_0x76b404(0x5f4)](this);else Input[_0x76b404(0x56a)](),this['switchModes'](_0x76b404(0x751));}else{if(_0x76b404(0x6db)===_0x76b404(0x6aa))return'#%1'['format'](_0x2e3c62(_0x3b9314['$1']));else VisuMZ['CoreEngine'][_0x76b404(0x664)][_0x76b404(0x5f4)](this);}}}}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x80d)]=Window_NameInput['prototype'][_0x526668(0x3fe)],Window_NameInput['prototype'][_0x526668(0x3fe)]=function(){const _0x88f542=_0x526668;if(!this[_0x88f542(0x83a)]())return;if(this[_0x88f542(0x391)]===_0x88f542(0x751)){if(_0x88f542(0x9e5)===_0x88f542(0x9e5)){if(TouchInput[_0x88f542(0x72b)]()&&this[_0x88f542(0x615)]())this[_0x88f542(0x2ad)](_0x88f542(0x274));else TouchInput[_0x88f542(0x52a)]()&&(_0x88f542(0x50a)===_0x88f542(0x50a)?this['switchModes']('default'):this[_0x88f542(0x984)][_0x88f542(0x529)](_0x48db91[_0x88f542(0x298)][_0x88f542(0x5ca)]));}else return _0x1074ad['CoreEngine'][_0x88f542(0x7c3)][_0x88f542(0x42a)][_0x88f542(0x8bb)]['call'](this,_0x2ce33b);}else{if(_0x88f542(0x8cc)===_0x88f542(0x8cc))VisuMZ[_0x88f542(0x6a7)][_0x88f542(0x80d)]['call'](this);else{const _0x575a39=_0x3d5d06[_0x88f542(0x6a7)]['Settings'][_0x88f542(0x680)],_0x2282d7=_0x575a39[_0x88f542(0x783)],_0x5f5598=this[_0x88f542(0x3ab)](_0x113d78),_0x20ae46=this[_0x88f542(0x3ab)](_0x13e9b0);return _0x2282d7[_0x88f542(0xa0a)](_0x5f5598,_0x20ae46);}}},Window_NameInput[_0x526668(0x4aa)][_0x526668(0x30b)]=function(){const _0x1a9dec=_0x526668;if(Input[_0x1a9dec(0x84a)](_0x1a9dec(0x490)))Input[_0x1a9dec(0x56a)](),this[_0x1a9dec(0x678)]();else{if(Input[_0x1a9dec(0x9f9)]!==undefined){let _0x582ac5=Input[_0x1a9dec(0x9f9)],_0x33d09f=_0x582ac5[_0x1a9dec(0x5f3)];for(let _0x2f27dd=0x0;_0x2f27dd<_0x33d09f;++_0x2f27dd){this[_0x1a9dec(0x515)][_0x1a9dec(0x25a)](_0x582ac5[_0x2f27dd])?SoundManager['playOk']():_0x1a9dec(0x859)!==_0x1a9dec(0x3d3)?SoundManager[_0x1a9dec(0x76a)]():(_0x411495[_0x1a9dec(0x6a7)][_0x1a9dec(0x7fa)]['call'](this),_0x28e403=this);}Input[_0x1a9dec(0x56a)]();}}},Window_NameInput[_0x526668(0x4aa)]['switchModes']=function(_0x12c6d5){const _0x4e4840=_0x526668;let _0x3a9e04=this[_0x4e4840(0x391)];this[_0x4e4840(0x391)]=_0x12c6d5;if(_0x3a9e04!==this[_0x4e4840(0x391)]){if(_0x4e4840(0x6c8)!==_0x4e4840(0x512))this[_0x4e4840(0x7f0)](),SoundManager[_0x4e4840(0x628)](),this[_0x4e4840(0x391)]===_0x4e4840(0x274)?_0x4e4840(0x5dd)!==_0x4e4840(0x577)?this[_0x4e4840(0x606)](0x0):_0x3fcade[_0x4e4840(0x6a7)][_0x4e4840(0x7c3)]['UI'][_0x4e4840(0x771)]&&(this[_0x4e4840(0x424)]=_0x27a2d3):_0x4e4840(0x937)!=='ubXwL'?(this[_0x4e4840(0x4d0)](),this[_0x4e4840(0x2af)](),_0xa65e6d['CoreEngine'][_0x4e4840(0x59a)][_0x4e4840(0x5f4)](this,_0x53e2f0)):this[_0x4e4840(0x606)](-0x1);else return _0x3be546[_0x4e4840(0x6a7)][_0x4e4840(0x4fe)]['call'](this);}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x4c5)]=Window_NameInput['prototype'][_0x526668(0x35d)],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x35d)]=function(_0x145db6){const _0x5b3902=_0x526668;if(this['_mode']===_0x5b3902(0x751)&&!Input[_0x5b3902(0x6ed)]())return;if(Input[_0x5b3902(0x413)]())return;VisuMZ[_0x5b3902(0x6a7)][_0x5b3902(0x4c5)][_0x5b3902(0x5f4)](this,_0x145db6),this['switchModes'](_0x5b3902(0x274));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x55b)]=Window_NameInput[_0x526668(0x4aa)]['cursorUp'],Window_NameInput['prototype'][_0x526668(0x960)]=function(_0x2d3443){const _0x2a0518=_0x526668;if(this[_0x2a0518(0x391)]===_0x2a0518(0x751)&&!Input[_0x2a0518(0x6ed)]())return;if(Input[_0x2a0518(0x413)]())return;VisuMZ[_0x2a0518(0x6a7)][_0x2a0518(0x55b)][_0x2a0518(0x5f4)](this,_0x2d3443),this[_0x2a0518(0x2ad)]('default');},VisuMZ[_0x526668(0x6a7)][_0x526668(0x518)]=Window_NameInput[_0x526668(0x4aa)][_0x526668(0x53a)],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x53a)]=function(_0x756529){const _0x28a8e7=_0x526668;if(this[_0x28a8e7(0x391)]===_0x28a8e7(0x751)&&!Input['isArrowPressed']())return;if(Input[_0x28a8e7(0x413)]())return;VisuMZ[_0x28a8e7(0x6a7)][_0x28a8e7(0x518)]['call'](this,_0x756529),this[_0x28a8e7(0x2ad)](_0x28a8e7(0x274));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x5ae)]=Window_NameInput['prototype'][_0x526668(0x5a0)],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x5a0)]=function(_0x2c7aaf){const _0x367ad6=_0x526668;if(this[_0x367ad6(0x391)]===_0x367ad6(0x751)&&!Input['isArrowPressed']())return;if(Input[_0x367ad6(0x413)]())return;VisuMZ[_0x367ad6(0x6a7)][_0x367ad6(0x5ae)][_0x367ad6(0x5f4)](this,_0x2c7aaf),this['switchModes']('default');},VisuMZ['CoreEngine'][_0x526668(0xa39)]=Window_NameInput[_0x526668(0x4aa)][_0x526668(0x8a2)],Window_NameInput[_0x526668(0x4aa)]['cursorPagedown']=function(){const _0x3a4d6c=_0x526668;if(this[_0x3a4d6c(0x391)]===_0x3a4d6c(0x751))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3a4d6c(0x6a7)][_0x3a4d6c(0xa39)][_0x3a4d6c(0x5f4)](this),this[_0x3a4d6c(0x2ad)](_0x3a4d6c(0x274));},VisuMZ[_0x526668(0x6a7)][_0x526668(0x30f)]=Window_NameInput[_0x526668(0x4aa)]['cursorPageup'],Window_NameInput[_0x526668(0x4aa)][_0x526668(0xa03)]=function(){const _0x279875=_0x526668;if(this[_0x279875(0x391)]===_0x279875(0x751))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x279875(0x6a7)][_0x279875(0x30f)][_0x279875(0x5f4)](this),this[_0x279875(0x2ad)]('default');},VisuMZ[_0x526668(0x6a7)]['Window_NameInput_refresh']=Window_NameInput['prototype']['refresh'],Window_NameInput[_0x526668(0x4aa)][_0x526668(0x7f0)]=function(){const _0x384dc7=_0x526668;if(this[_0x384dc7(0x391)]===_0x384dc7(0x751)){if(_0x384dc7(0x57a)==='yoWGt'){const _0xb75dbf=_0x25cc8b['Abbreviation'],_0x553a4f=_0x395443[_0x384dc7(0x60d)],_0xf6ccbe=_0x2baab7[_0x384dc7(0x31c)],_0xc2baf8=_0x4a651d[_0x384dc7(0x3f0)],_0x472598=new _0x439a17(_0xebe2e1[_0x384dc7(0x3a0)]);_0x426014['CoreEngine'][_0x384dc7(0x6e0)][_0xb75dbf[_0x384dc7(0x4b5)]()['trim']()]=_0x553a4f,_0x5be71c['CoreEngine'][_0x384dc7(0x92f)][_0xb75dbf[_0x384dc7(0x4b5)]()[_0x384dc7(0x4a6)]()]=_0xf6ccbe,_0x31d870[_0x384dc7(0x6a7)][_0x384dc7(0x31d)][_0xb75dbf[_0x384dc7(0x4b5)]()[_0x384dc7(0x4a6)]()]=_0xc2baf8,_0x2e5fd7['CoreEngine'][_0x384dc7(0x3c7)][_0xb75dbf[_0x384dc7(0x4b5)]()['trim']()]=_0xb75dbf,_0x5bbb89['defineProperty'](_0x85f32e[_0x384dc7(0x4aa)],_0xb75dbf,{'get'(){const _0x2dc2c0=_0x384dc7,_0x305bfd=_0x472598[_0x2dc2c0(0x5f4)](this);return _0xc2baf8===_0x2dc2c0(0x956)?_0x26ca4d[_0x2dc2c0(0x746)](_0x305bfd):_0x305bfd;}});}else{this[_0x384dc7(0x255)][_0x384dc7(0x56a)](),this[_0x384dc7(0xa32)]['clear'](),this[_0x384dc7(0x485)]();let _0x2cce68=VisuMZ['CoreEngine']['Settings'][_0x384dc7(0x41b)][_0x384dc7(0x954)]['split']('\x0a'),_0xb9ee89=_0x2cce68[_0x384dc7(0x5f3)],_0x401bf7=(this[_0x384dc7(0x2c8)]-_0xb9ee89*this[_0x384dc7(0x367)]())/0x2;for(let _0x3cc99c=0x0;_0x3cc99c<_0xb9ee89;++_0x3cc99c){if('IFBJT'!=='ooevl'){let _0x112476=_0x2cce68[_0x3cc99c],_0x4a2ef3=this[_0x384dc7(0x8f2)](_0x112476)[_0x384dc7(0x745)],_0x2fc2e1=Math[_0x384dc7(0x749)]((this[_0x384dc7(0x255)]['width']-_0x4a2ef3)/0x2);this[_0x384dc7(0x816)](_0x112476,_0x2fc2e1,_0x401bf7),_0x401bf7+=this[_0x384dc7(0x367)]();}else this['smoothSelect'](0x0);}}}else{if(_0x384dc7(0x75d)===_0x384dc7(0x75d))VisuMZ[_0x384dc7(0x6a7)][_0x384dc7(0x637)]['call'](this);else return _0x5cef43[_0x384dc7(0x298)][_0x384dc7(0x7f4)][_0x384dc7(0x5f4)](this);}};};VisuMZ[_0x526668(0x6a7)][_0x526668(0x685)]=Window_ShopSell[_0x526668(0x4aa)][_0x526668(0x1f5)],Window_ShopSell[_0x526668(0x4aa)][_0x526668(0x1f5)]=function(_0x370a8f){const _0x3965cf=_0x526668;if(VisuMZ[_0x3965cf(0x6a7)][_0x3965cf(0x7c3)]['QoL']['KeyItemProtect']&&DataManager[_0x3965cf(0x3d8)](_0x370a8f))return _0x3965cf(0x5cc)===_0x3965cf(0x8b9)?0x0:![];else{if(_0x3965cf(0x9bd)===_0x3965cf(0x9bd))return VisuMZ[_0x3965cf(0x6a7)]['Window_ShopSell_isEnabled'][_0x3965cf(0x5f4)](this,_0x370a8f);else{if(this[_0x3965cf(0x640)])this['_logWindow'][_0x3965cf(0x5c9)](this['_subject']);this['_phase']='turn',this['_subject']&&this[_0x3965cf(0x640)][_0x3965cf(0x384)]()===0x0&&(this['endBattlerActions'](this[_0x3965cf(0x640)]),this[_0x3965cf(0x640)]=null);}}},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0x8b0)]=function(){return![];};function _0x5eef(_0x36901a,_0x2cdd2a){const _0x1e2686=_0x1e26();return _0x5eef=function(_0x5eef32,_0x4a8063){_0x5eef32=_0x5eef32-0x1f2;let _0x9048d6=_0x1e2686[_0x5eef32];return _0x9048d6;},_0x5eef(_0x36901a,_0x2cdd2a);}VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41b)][_0x526668(0x2a9)]&&(VisuMZ[_0x526668(0x6a7)]['Window_NumberInput_start']=Window_NumberInput['prototype']['start'],Window_NumberInput['prototype'][_0x526668(0x264)]=function(){const _0x3e10ec=_0x526668;VisuMZ['CoreEngine'][_0x3e10ec(0x9de)]['call'](this),this[_0x3e10ec(0x606)](this[_0x3e10ec(0x595)]-0x1),Input[_0x3e10ec(0x56a)]();},VisuMZ[_0x526668(0x6a7)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x526668(0x4aa)][_0x526668(0x5e8)],Window_NumberInput['prototype'][_0x526668(0x5e8)]=function(){const _0x543a93=_0x526668;if(!this[_0x543a93(0x83a)]())return;if(Input['isNumpadPressed']()){if(_0x543a93(0x4c0)!==_0x543a93(0x7cf))this[_0x543a93(0x843)]();else{const _0x1ebb95=_0x543a93(0x6e9);this[_0x543a93(0x435)]=this[_0x543a93(0x435)]||{};if(this['_colorCache'][_0x1ebb95])return this[_0x543a93(0x435)][_0x1ebb95];const _0x5156df=_0x2126b6[_0x543a93(0x6a7)][_0x543a93(0x7c3)][_0x543a93(0x42a)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x1ebb95,_0x5156df);}}else{if(Input[_0x543a93(0x84a)](_0x543a93(0xa1d))){if('OjypK'!=='BqiBH')this[_0x543a93(0xa0b)]();else{const _0x48a0cf=_0x145b9f[_0x543a93(0x2a7)][_0x543a93(0x38e)](/[ ]/g,''),_0x5dd84d=_0x2824b6['CodeJS'];_0x5a733a[_0x543a93(0x6a7)][_0x543a93(0x270)](_0x48a0cf,_0x5dd84d);}}else{if(Input[_0x543a93(0x5d5)]===0x2e)this[_0x543a93(0xa13)]();else{if(Input[_0x543a93(0x5d5)]===0x24)this[_0x543a93(0x773)]();else Input[_0x543a93(0x5d5)]===0x23?this[_0x543a93(0x89e)]():'TOeUI'===_0x543a93(0x496)?VisuMZ[_0x543a93(0x6a7)][_0x543a93(0x657)]['call'](this):_0x3aa58c['CoreEngine'][_0x543a93(0x78c)][_0x543a93(0x5f4)](this);}}}},Window_NumberInput[_0x526668(0x4aa)]['processCursorMove']=function(){const _0x5d62d9=_0x526668;if(!this[_0x5d62d9(0x794)]())return;Input[_0x5d62d9(0x413)]()?_0x5d62d9(0x6da)!=='WLPPZ'?this['processKeyboardDigitChange']():_0x2d68d2[_0x5d62d9(0x9fc)](_0x5ff445,_0x42863a):Window_Selectable[_0x5d62d9(0x4aa)][_0x5d62d9(0x59d)]['call'](this);},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0x7ce)]=function(){},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0x843)]=function(){const _0x922543=_0x526668;if(String(this['_number'])[_0x922543(0x5f3)]>=this[_0x922543(0x595)])return;const _0x422782=Number(String(this[_0x922543(0x908)])+Input['_inputString']);if(isNaN(_0x422782))return;this['_number']=_0x422782;const _0x32c0e8='9'[_0x922543(0x53e)](this[_0x922543(0x595)]);this[_0x922543(0x908)]=this['_number'][_0x922543(0xa09)](0x0,_0x32c0e8),Input[_0x922543(0x56a)](),this['refresh'](),SoundManager[_0x922543(0x52e)](),this[_0x922543(0x606)](this[_0x922543(0x595)]-0x1);},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0xa0b)]=function(){const _0x1866f2=_0x526668;this[_0x1866f2(0x908)]=Number(String(this[_0x1866f2(0x908)])[_0x1866f2(0x4fc)](0x0,-0x1)),this['_number']=Math[_0x1866f2(0x431)](0x0,this[_0x1866f2(0x908)]),Input['clear'](),this[_0x1866f2(0x7f0)](),SoundManager[_0x1866f2(0x52e)](),this['select'](this[_0x1866f2(0x595)]-0x1);},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0xa13)]=function(){const _0xd2a44b=_0x526668;this['_number']=Number(String(this[_0xd2a44b(0x908)])[_0xd2a44b(0x35c)](0x1)),this[_0xd2a44b(0x908)]=Math[_0xd2a44b(0x431)](0x0,this[_0xd2a44b(0x908)]),Input[_0xd2a44b(0x56a)](),this[_0xd2a44b(0x7f0)](),SoundManager['playCursor'](),this[_0xd2a44b(0x606)](this[_0xd2a44b(0x595)]-0x1);},Window_NumberInput[_0x526668(0x4aa)][_0x526668(0x773)]=function(){const _0x2962bf=_0x526668;if(this[_0x2962bf(0x277)]()===0x0)return;Input['clear'](),this[_0x2962bf(0x7f0)](),SoundManager[_0x2962bf(0x52e)](),this[_0x2962bf(0x606)](0x0);},Window_NumberInput['prototype'][_0x526668(0x89e)]=function(){const _0x557f15=_0x526668;if(this[_0x557f15(0x277)]()===this['_maxDigits']-0x1)return;Input[_0x557f15(0x56a)](),this['refresh'](),SoundManager[_0x557f15(0x52e)](),this[_0x557f15(0x606)](this[_0x557f15(0x595)]-0x1);});;Window_TitleCommand[_0x526668(0x21b)]=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)]['TitleCommandList'],Window_TitleCommand[_0x526668(0x4aa)]['makeCommandList']=function(){const _0x5a72e4=_0x526668;this[_0x5a72e4(0x5b4)]();},Window_TitleCommand[_0x526668(0x4aa)][_0x526668(0x5b4)]=function(){const _0x17af8e=_0x526668;for(const _0x30c9c5 of Window_TitleCommand[_0x17af8e(0x21b)]){if(_0x17af8e(0x29f)===_0x17af8e(0x700))_0x2fbb76['CoreEngine'][_0x17af8e(0x24f)][_0x17af8e(0x5f4)](this);else{if(_0x30c9c5[_0x17af8e(0x334)][_0x17af8e(0x5f4)](this)){if('oHXDp'===_0x17af8e(0x632))return _0x3dfd68['PreserveNumbers'](_0x33e7be,'<','>');else{const _0x1c9872=_0x30c9c5[_0x17af8e(0x6a5)];let _0xff3e7d=_0x30c9c5[_0x17af8e(0x527)];if(['',_0x17af8e(0x43f)][_0x17af8e(0x666)](_0xff3e7d))_0xff3e7d=_0x30c9c5[_0x17af8e(0x478)]['call'](this);const _0x4a095c=_0x30c9c5[_0x17af8e(0x740)][_0x17af8e(0x5f4)](this),_0x51582b=_0x30c9c5[_0x17af8e(0x75c)][_0x17af8e(0x5f4)](this);this[_0x17af8e(0x70c)](_0xff3e7d,_0x1c9872,_0x4a095c,_0x51582b),this[_0x17af8e(0x54c)](_0x1c9872,_0x30c9c5[_0x17af8e(0x952)][_0x17af8e(0x670)](this,_0x51582b));}}}}},Window_GameEnd['_commandList']=VisuMZ[_0x526668(0x6a7)][_0x526668(0x7c3)][_0x526668(0x41e)][_0x526668(0x6d1)][_0x526668(0x7a9)],Window_GameEnd[_0x526668(0x4aa)]['makeCommandList']=function(){const _0x394bcb=_0x526668;this[_0x394bcb(0x5b4)]();},Window_GameEnd['prototype'][_0x526668(0x5b4)]=function(){const _0x15b4d7=_0x526668;for(const _0x32dc2b of Window_GameEnd[_0x15b4d7(0x21b)]){if(_0x15b4d7(0x603)===_0x15b4d7(0x603)){if(_0x32dc2b['ShowJS'][_0x15b4d7(0x5f4)](this)){if('IMRQF'===_0x15b4d7(0x511)){const _0x7f9088=_0x18377b[_0x15b4d7(0x9e1)],_0x3d48ad=_0x183133['prototype'][_0x15b4d7(0x367)](),_0x4a0c7b=0x0;let _0x79e010=0x0;return this[_0x15b4d7(0x922)]()===_0x15b4d7(0x38b)?_0x79e010=0x0:_0x79e010=_0x54531a[_0x15b4d7(0x8ec)]-_0x3d48ad,new _0x315bc2(_0x4a0c7b,_0x79e010,_0x7f9088,_0x3d48ad);}else{const _0x196af3=_0x32dc2b[_0x15b4d7(0x6a5)];let _0x579faf=_0x32dc2b['TextStr'];if(['',_0x15b4d7(0x43f)][_0x15b4d7(0x666)](_0x579faf))_0x579faf=_0x32dc2b['TextJS'][_0x15b4d7(0x5f4)](this);const _0x11239e=_0x32dc2b['EnableJS'][_0x15b4d7(0x5f4)](this),_0x1597eb=_0x32dc2b[_0x15b4d7(0x75c)][_0x15b4d7(0x5f4)](this);this[_0x15b4d7(0x70c)](_0x579faf,_0x196af3,_0x11239e,_0x1597eb),this[_0x15b4d7(0x54c)](_0x196af3,_0x32dc2b[_0x15b4d7(0x952)][_0x15b4d7(0x670)](this,_0x1597eb));}}}else _0x581a21+=_0x2280c1(_0x62fec8);}};function Window_ButtonAssist(){const _0x5e1d49=_0x526668;this[_0x5e1d49(0x96f)](...arguments);}Window_ButtonAssist[_0x526668(0x4aa)]=Object[_0x526668(0x32e)](Window_Base[_0x526668(0x4aa)]),Window_ButtonAssist['prototype'][_0x526668(0x330)]=Window_ButtonAssist,Window_ButtonAssist[_0x526668(0x4aa)]['initialize']=function(_0xef2b0b){const _0x42d84d=_0x526668;this[_0x42d84d(0x8d2)]={},Window_Base[_0x42d84d(0x4aa)][_0x42d84d(0x96f)][_0x42d84d(0x5f4)](this,_0xef2b0b),this[_0x42d84d(0x529)](VisuMZ[_0x42d84d(0x6a7)]['Settings'][_0x42d84d(0x680)][_0x42d84d(0x649)]||0x0),this[_0x42d84d(0x7f0)]();},Window_ButtonAssist['prototype']['makeFontBigger']=function(){const _0xfcdd90=_0x526668;this[_0xfcdd90(0x255)][_0xfcdd90(0x996)]<=0x60&&(this['contents'][_0xfcdd90(0x996)]+=0x6);},Window_ButtonAssist[_0x526668(0x4aa)][_0x526668(0x3d1)]=function(){const _0x2eccd7=_0x526668;this[_0x2eccd7(0x255)][_0x2eccd7(0x996)]>=0x18&&(this[_0x2eccd7(0x255)][_0x2eccd7(0x996)]-=0x6);},Window_ButtonAssist['prototype'][_0x526668(0x894)]=function(){const _0x261352=_0x526668;Window_Base[_0x261352(0x4aa)][_0x261352(0x894)][_0x261352(0x5f4)](this),this[_0x261352(0x980)]();},Window_ButtonAssist[_0x526668(0x4aa)][_0x526668(0x509)]=function(){const _0x5515bc=_0x526668;this[_0x5515bc(0x4e8)]=SceneManager[_0x5515bc(0x807)]['getButtonAssistLocation']()!==_0x5515bc(0x44b)?0x0:0x8;},Window_ButtonAssist[_0x526668(0x4aa)][_0x526668(0x980)]=function(){const _0x2bfe35=_0x526668,_0x50670b=SceneManager[_0x2bfe35(0x807)];for(let _0x3288f7=0x1;_0x3288f7<=0x5;_0x3288f7++){if(_0x2bfe35(0x9eb)!==_0x2bfe35(0x9eb)){const _0x3472d4=_0x2bfe35(0x754);this[_0x2bfe35(0x435)]=this[_0x2bfe35(0x435)]||{};if(this[_0x2bfe35(0x435)][_0x3472d4])return this[_0x2bfe35(0x435)][_0x3472d4];const _0x2c5f84=_0xe30823[_0x2bfe35(0x6a7)]['Settings'][_0x2bfe35(0x42a)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x3472d4,_0x2c5f84);}else{if(this['_data'][_0x2bfe35(0x8fd)[_0x2bfe35(0xa0a)](_0x3288f7)]!==_0x50670b[_0x2bfe35(0x74b)[_0x2bfe35(0xa0a)](_0x3288f7)]())return this[_0x2bfe35(0x7f0)]();if(this[_0x2bfe35(0x8d2)][_0x2bfe35(0x8da)[_0x2bfe35(0xa0a)](_0x3288f7)]!==_0x50670b[_0x2bfe35(0x857)[_0x2bfe35(0xa0a)](_0x3288f7)]())return'DwpMc'!=='DwpMc'?[0x25,0x26,0x27,0x28][_0x2bfe35(0x2fe)](this[_0x2bfe35(0x5d5)]):this[_0x2bfe35(0x7f0)]();}}},Window_ButtonAssist[_0x526668(0x4aa)][_0x526668(0x7f0)]=function(){const _0x2f8102=_0x526668;this[_0x2f8102(0x255)]['clear']();for(let _0x2e1372=0x1;_0x2e1372<=0x5;_0x2e1372++){this[_0x2f8102(0x4dc)](_0x2e1372);}},Window_ButtonAssist[_0x526668(0x4aa)][_0x526668(0x4dc)]=function(_0x5ef818){const _0x55cbec=_0x526668,_0x4fab4b=this['innerWidth']/0x5,_0x2629a5=SceneManager[_0x55cbec(0x807)],_0x18c570=_0x2629a5[_0x55cbec(0x74b)[_0x55cbec(0xa0a)](_0x5ef818)](),_0x1738ed=_0x2629a5[_0x55cbec(0x857)[_0x55cbec(0xa0a)](_0x5ef818)]();this['_data']['key%1'['format'](_0x5ef818)]=_0x18c570,this[_0x55cbec(0x8d2)]['text%1'[_0x55cbec(0xa0a)](_0x5ef818)]=_0x1738ed;if(_0x18c570==='')return;if(_0x1738ed==='')return;const _0x345dd8=_0x2629a5['buttonAssistOffset%1'[_0x55cbec(0xa0a)](_0x5ef818)](),_0x4abaf8=this[_0x55cbec(0x421)](),_0x4ba805=_0x4fab4b*(_0x5ef818-0x1)+_0x4abaf8+_0x345dd8,_0xd7091=VisuMZ['CoreEngine'][_0x55cbec(0x7c3)][_0x55cbec(0x680)][_0x55cbec(0x6b6)];this['drawTextEx'](_0xd7091['format'](_0x18c570,_0x1738ed),_0x4ba805,0x0,_0x4fab4b-_0x4abaf8*0x2);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x572)]=Game_Interpreter[_0x526668(0x4aa)]['updateWaitMode'],Game_Interpreter[_0x526668(0x4aa)][_0x526668(0x3bd)]=function(){const _0x5db2fd=_0x526668;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ['CoreEngine'][_0x5db2fd(0x7c1)]();return VisuMZ[_0x5db2fd(0x6a7)][_0x5db2fd(0x572)][_0x5db2fd(0x5f4)](this);},VisuMZ[_0x526668(0x6a7)]['UpdatePictureCoordinates']=function(){const _0x28c383=_0x526668,_0x5e077f=$gameTemp[_0x28c383(0x79d)]||0x0;(_0x5e077f<0x0||_0x5e077f>0x64||TouchInput[_0x28c383(0x52a)]()||Input[_0x28c383(0x72b)](_0x28c383(0x3f3)))&&(_0x28c383(0x2b4)===_0x28c383(0x9b0)?_0x3c0141[_0x28c383(0x599)]&&_0x2a5b6f[_0x28c383(0x599)]():($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x28c383(0x56a)](),TouchInput[_0x28c383(0x56a)]()));const _0x2645de=$gameScreen['picture'](_0x5e077f);return _0x2645de&&(_0x2645de['_x']=TouchInput['_x'],_0x2645de['_y']=TouchInput['_y']),VisuMZ[_0x28c383(0x6a7)][_0x28c383(0x55f)](),$gameTemp[_0x28c383(0x79d)]!==undefined;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x55f)]=function(){const _0x9afa85=_0x526668,_0x2219dc=SceneManager['_scene'];if(!_0x2219dc)return;if(!_0x2219dc['_pictureCoordinatesWindow']){if('mtxaS'==='mtxaS')SoundManager['playLoad'](),_0x2219dc[_0x9afa85(0x536)]=new Window_PictureCoordinates(),_0x2219dc['addChild'](_0x2219dc[_0x9afa85(0x536)]);else{const _0x5bba64=_0x1832d2[_0x9afa85(0x79d)]||0x0;(_0x5bba64<0x0||_0x5bba64>0x64||_0x4f685a[_0x9afa85(0x52a)]()||_0x1afac3[_0x9afa85(0x72b)]('cancel'))&&(_0x389ce2[_0x9afa85(0x79d)]=_0xc069a6,_0x4204fa[_0x9afa85(0x56a)](),_0x3fa229[_0x9afa85(0x56a)]());const _0x325bfd=_0x3cb9ca[_0x9afa85(0x2f6)](_0x5bba64);return _0x325bfd&&(_0x325bfd['_x']=_0x29aaa5['_x'],_0x325bfd['_y']=_0x276432['_y']),_0x3455b0['CoreEngine']['updatePictureCoordinates'](),_0x5dfbe7[_0x9afa85(0x79d)]!==_0x389bfd;}}if($gameTemp[_0x9afa85(0x79d)]===undefined){if('QAblU'===_0x9afa85(0x3f6))SoundManager[_0x9afa85(0x8a7)](),_0x2219dc[_0x9afa85(0x51f)](_0x2219dc[_0x9afa85(0x536)]),_0x2219dc[_0x9afa85(0x536)]=undefined;else{const _0x5d36c9=_0x9afa85(0x4ae);_0x230534[_0x9afa85(0x74e)](_0x342791)[_0x9afa85(0x74e)]('')[_0x9afa85(0x74e)](null);const _0xa34d3a=_0x5cdd9e[_0x9afa85(0x964)](_0x9afa85(0x3a9))[_0x9afa85(0x4a6)]();_0x2115d8[_0x9afa85(0x6a7)][_0x9afa85(0x558)](_0xa34d3a,_0x5d36c9,!![]),_0x4c636b[_0x9afa85(0x807)][_0x9afa85(0x31b)]=!![];}}};function Window_PictureCoordinates(){const _0x3abeed=_0x526668;this[_0x3abeed(0x96f)](...arguments);}Window_PictureCoordinates[_0x526668(0x4aa)]=Object[_0x526668(0x32e)](Window_Base['prototype']),Window_PictureCoordinates['prototype'][_0x526668(0x330)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x526668(0x4aa)][_0x526668(0x96f)]=function(){const _0x4686e6=_0x526668;this['_lastOrigin']=_0x4686e6(0x52b),this[_0x4686e6(0x798)]='nah',this[_0x4686e6(0xa18)]=_0x4686e6(0x52b);const _0x1a4ead=this['windowRect']();Window_Base['prototype']['initialize']['call'](this,_0x1a4ead),this[_0x4686e6(0x529)](0x2);},Window_PictureCoordinates[_0x526668(0x4aa)][_0x526668(0x7e5)]=function(){const _0x43b73b=_0x526668;let _0x794a95=0x0,_0x484f4a=Graphics[_0x43b73b(0x36a)]-this[_0x43b73b(0x367)](),_0x46f0b7=Graphics[_0x43b73b(0x745)],_0xd24c47=this[_0x43b73b(0x367)]();return new Rectangle(_0x794a95,_0x484f4a,_0x46f0b7,_0xd24c47);},Window_PictureCoordinates[_0x526668(0x4aa)][_0x526668(0x509)]=function(){const _0x1b0122=_0x526668;this[_0x1b0122(0x4e8)]=0x0;},Window_PictureCoordinates[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x30c837=_0x526668;Window_Base['prototype']['update']['call'](this),this[_0x30c837(0x4b3)]();},Window_PictureCoordinates[_0x526668(0x4aa)]['updateData']=function(){const _0x37b787=_0x526668;if(!this[_0x37b787(0x383)]())return;this[_0x37b787(0x7f0)]();},Window_PictureCoordinates['prototype']['needsUpdate']=function(){const _0x4392bb=_0x526668,_0x5217a1=$gameTemp[_0x4392bb(0x79d)],_0x332483=$gameScreen['picture'](_0x5217a1);return _0x332483?this['_lastOrigin']!==_0x332483['_origin']||this[_0x4392bb(0x798)]!==_0x332483['_x']||this[_0x4392bb(0xa18)]!==_0x332483['_y']:![];},Window_PictureCoordinates['prototype'][_0x526668(0x7f0)]=function(){const _0xb7d7d5=_0x526668;this['contents'][_0xb7d7d5(0x56a)]();const _0x588750=$gameTemp[_0xb7d7d5(0x79d)],_0x5e6be2=$gameScreen[_0xb7d7d5(0x2f6)](_0x588750);if(!_0x5e6be2)return;this['_lastOrigin']=_0x5e6be2[_0xb7d7d5(0x805)],this['_lastX']=_0x5e6be2['_x'],this[_0xb7d7d5(0xa18)]=_0x5e6be2['_y'];const _0x189dcf=ColorManager[_0xb7d7d5(0x47a)]();this[_0xb7d7d5(0x255)]['fillRect'](0x0,0x0,this['innerWidth'],this['innerHeight'],_0x189dcf);const _0x15fa8f=_0xb7d7d5(0x8a5)[_0xb7d7d5(0xa0a)](_0x5e6be2[_0xb7d7d5(0x805)]===0x0?_0xb7d7d5(0x34b):_0xb7d7d5(0x532)),_0x22049b='X:\x20%1'['format'](_0x5e6be2['_x']),_0x3bce64=_0xb7d7d5(0xa01)[_0xb7d7d5(0xa0a)](_0x5e6be2['_y']),_0x3b2351=_0xb7d7d5(0x248)[_0xb7d7d5(0xa0a)](TextManager[_0xb7d7d5(0x3ab)](_0xb7d7d5(0x3f3)));let _0x25569d=Math[_0xb7d7d5(0x749)](this[_0xb7d7d5(0x96c)]/0x4);this['drawText'](_0x15fa8f,_0x25569d*0x0,0x0,_0x25569d),this[_0xb7d7d5(0x714)](_0x22049b,_0x25569d*0x1,0x0,_0x25569d,'center'),this[_0xb7d7d5(0x714)](_0x3bce64,_0x25569d*0x2,0x0,_0x25569d,'center');const _0x3d1005=this[_0xb7d7d5(0x8f2)](_0x3b2351)[_0xb7d7d5(0x745)],_0x1fb4f3=this['innerWidth']-_0x3d1005;this[_0xb7d7d5(0x816)](_0x3b2351,_0x1fb4f3,0x0,_0x3d1005);},VisuMZ[_0x526668(0x7c5)]=function(_0x2b6c37){const _0x34d188=_0x526668;if(Utils['isOptionValid'](_0x34d188(0x26f))){var _0x576320=require(_0x34d188(0x9f3))[_0x34d188(0x2ae)][_0x34d188(0x37e)]();SceneManager[_0x34d188(0x49c)]();if(_0x2b6c37)setTimeout(_0x576320['focus']['bind'](_0x576320),0x190);}},VisuMZ[_0x526668(0x31f)]=function(_0x4c5823,_0x21c737){const _0x3ebbae=_0x526668;_0x21c737=_0x21c737[_0x3ebbae(0x4b5)]();var _0x582f9a=1.70158,_0x57f4bc=0.7;switch(_0x21c737){case _0x3ebbae(0x83e):return _0x4c5823;case _0x3ebbae(0x803):return-0x1*Math[_0x3ebbae(0x56d)](_0x4c5823*(Math['PI']/0x2))+0x1;case _0x3ebbae(0x2f5):return Math[_0x3ebbae(0x725)](_0x4c5823*(Math['PI']/0x2));case _0x3ebbae(0x918):return-0.5*(Math[_0x3ebbae(0x56d)](Math['PI']*_0x4c5823)-0x1);case _0x3ebbae(0x7ea):return _0x4c5823*_0x4c5823;case'OUTQUAD':return _0x4c5823*(0x2-_0x4c5823);case _0x3ebbae(0x492):return _0x4c5823<0.5?0x2*_0x4c5823*_0x4c5823:-0x1+(0x4-0x2*_0x4c5823)*_0x4c5823;case _0x3ebbae(0x4e4):return _0x4c5823*_0x4c5823*_0x4c5823;case _0x3ebbae(0x6d4):var _0x21dce4=_0x4c5823-0x1;return _0x21dce4*_0x21dce4*_0x21dce4+0x1;case _0x3ebbae(0x753):return _0x4c5823<0.5?0x4*_0x4c5823*_0x4c5823*_0x4c5823:(_0x4c5823-0x1)*(0x2*_0x4c5823-0x2)*(0x2*_0x4c5823-0x2)+0x1;case _0x3ebbae(0x71a):return _0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823;case _0x3ebbae(0x74c):var _0x21dce4=_0x4c5823-0x1;return 0x1-_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4;case _0x3ebbae(0x23c):var _0x21dce4=_0x4c5823-0x1;return _0x4c5823<0.5?0x8*_0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823:0x1-0x8*_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4;case _0x3ebbae(0x818):return _0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823;case _0x3ebbae(0x45b):var _0x21dce4=_0x4c5823-0x1;return 0x1+_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4;case'INOUTQUINT':var _0x21dce4=_0x4c5823-0x1;return _0x4c5823<0.5?0x10*_0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823*_0x4c5823:0x1+0x10*_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4*_0x21dce4;case _0x3ebbae(0x8a6):if(_0x4c5823===0x0){if(_0x3ebbae(0x65b)!==_0x3ebbae(0x9e9))return 0x0;else _0x42c5d1[_0x3ebbae(0x6a7)]['Game_Action_setAttack'][_0x3ebbae(0x5f4)](this);}return Math[_0x3ebbae(0x3bc)](0x2,0xa*(_0x4c5823-0x1));case _0x3ebbae(0x244):if(_0x4c5823===0x1)return 0x1;return-Math[_0x3ebbae(0x3bc)](0x2,-0xa*_0x4c5823)+0x1;case _0x3ebbae(0x88d):if(_0x4c5823===0x0||_0x4c5823===0x1)return _0x4c5823;var _0x1f52c3=_0x4c5823*0x2,_0xcbab33=_0x1f52c3-0x1;if(_0x1f52c3<0x1){if(_0x3ebbae(0x6ef)!==_0x3ebbae(0x6ef))this[_0x3ebbae(0x435)][_0x431cc4]=this['textColor'](_0x343079(_0x505e85));else return 0.5*Math['pow'](0x2,0xa*_0xcbab33);}return 0.5*(-Math['pow'](0x2,-0xa*_0xcbab33)+0x2);case _0x3ebbae(0x625):var _0x1f52c3=_0x4c5823/0x1;return-0x1*(Math[_0x3ebbae(0x398)](0x1-_0x1f52c3*_0x4c5823)-0x1);case _0x3ebbae(0x6cb):var _0x21dce4=_0x4c5823-0x1;return Math[_0x3ebbae(0x398)](0x1-_0x21dce4*_0x21dce4);case _0x3ebbae(0x832):var _0x1f52c3=_0x4c5823*0x2,_0xcbab33=_0x1f52c3-0x2;if(_0x1f52c3<0x1)return-0.5*(Math[_0x3ebbae(0x398)](0x1-_0x1f52c3*_0x1f52c3)-0x1);return 0.5*(Math['sqrt'](0x1-_0xcbab33*_0xcbab33)+0x1);case _0x3ebbae(0x48c):return _0x4c5823*_0x4c5823*((_0x582f9a+0x1)*_0x4c5823-_0x582f9a);case _0x3ebbae(0x833):var _0x1f52c3=_0x4c5823/0x1-0x1;return _0x1f52c3*_0x1f52c3*((_0x582f9a+0x1)*_0x1f52c3+_0x582f9a)+0x1;break;case'INOUTBACK':var _0x1f52c3=_0x4c5823*0x2,_0x51c47c=_0x1f52c3-0x2,_0x160728=_0x582f9a*1.525;if(_0x1f52c3<0x1)return 0.5*_0x1f52c3*_0x1f52c3*((_0x160728+0x1)*_0x1f52c3-_0x160728);return 0.5*(_0x51c47c*_0x51c47c*((_0x160728+0x1)*_0x51c47c+_0x160728)+0x2);case _0x3ebbae(0x7b8):if(_0x4c5823===0x0||_0x4c5823===0x1){if('VISmF'!=='VISmF')_0x4c4658=_0x57faa5[_0x3ebbae(0x431)](_0x50d98e,_0x3d60b5(_0x36a84a(_0x474f71)));else return _0x4c5823;}var _0x1f52c3=_0x4c5823/0x1,_0xcbab33=_0x1f52c3-0x1,_0x410e1c=0x1-_0x57f4bc,_0x160728=_0x410e1c/(0x2*Math['PI'])*Math[_0x3ebbae(0x3f4)](0x1);return-(Math[_0x3ebbae(0x3bc)](0x2,0xa*_0xcbab33)*Math['sin']((_0xcbab33-_0x160728)*(0x2*Math['PI'])/_0x410e1c));case _0x3ebbae(0x4d6):var _0x410e1c=0x1-_0x57f4bc,_0x1f52c3=_0x4c5823*0x2;if(_0x4c5823===0x0||_0x4c5823===0x1)return _0x4c5823;var _0x160728=_0x410e1c/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x3ebbae(0x3bc)](0x2,-0xa*_0x1f52c3)*Math['sin']((_0x1f52c3-_0x160728)*(0x2*Math['PI'])/_0x410e1c)+0x1;case _0x3ebbae(0x69b):var _0x410e1c=0x1-_0x57f4bc;if(_0x4c5823===0x0||_0x4c5823===0x1)return _0x4c5823;var _0x1f52c3=_0x4c5823*0x2,_0xcbab33=_0x1f52c3-0x1,_0x160728=_0x410e1c/(0x2*Math['PI'])*Math[_0x3ebbae(0x3f4)](0x1);if(_0x1f52c3<0x1)return'ywdtN'===_0x3ebbae(0x52c)?_0x48e0fe['eva']:-0.5*(Math[_0x3ebbae(0x3bc)](0x2,0xa*_0xcbab33)*Math[_0x3ebbae(0x725)]((_0xcbab33-_0x160728)*(0x2*Math['PI'])/_0x410e1c));return Math[_0x3ebbae(0x3bc)](0x2,-0xa*_0xcbab33)*Math[_0x3ebbae(0x725)]((_0xcbab33-_0x160728)*(0x2*Math['PI'])/_0x410e1c)*0.5+0x1;case _0x3ebbae(0x387):var _0x1f52c3=_0x4c5823/0x1;if(_0x1f52c3<0x1/2.75){if(_0x3ebbae(0x9df)===_0x3ebbae(0x9df))return 7.5625*_0x1f52c3*_0x1f52c3;else _0x15211c['CoreEngine'][_0x3ebbae(0x966)][_0x3ebbae(0x5f4)](this),this[_0x3ebbae(0x5bc)](),this['_windowLayer']['x']=_0x17d425[_0x3ebbae(0x746)](this[_0x3ebbae(0x5fe)]['x']),this[_0x3ebbae(0x5fe)]['y']=_0x375804[_0x3ebbae(0x746)](this['_windowLayer']['y']);}else{if(_0x1f52c3<0x2/2.75){var _0x51c47c=_0x1f52c3-1.5/2.75;return 7.5625*_0x51c47c*_0x51c47c+0.75;}else{if(_0x1f52c3<2.5/2.75){var _0x51c47c=_0x1f52c3-2.25/2.75;return 7.5625*_0x51c47c*_0x51c47c+0.9375;}else{var _0x51c47c=_0x1f52c3-2.625/2.75;return 7.5625*_0x51c47c*_0x51c47c+0.984375;}}}case _0x3ebbae(0x83c):var _0x4e01bb=0x1-VisuMZ['ApplyEasing'](0x1-_0x4c5823,_0x3ebbae(0x827));return _0x4e01bb;case _0x3ebbae(0x38c):if(_0x4c5823<0.5)var _0x4e01bb=VisuMZ[_0x3ebbae(0x31f)](_0x4c5823*0x2,_0x3ebbae(0x925))*0.5;else var _0x4e01bb=VisuMZ['ApplyEasing'](_0x4c5823*0x2-0x1,'outbounce')*0.5+0.5;return _0x4e01bb;default:return _0x4c5823;}},VisuMZ[_0x526668(0x70d)]=function(_0x2b62e5){const _0x510602=_0x526668;_0x2b62e5=String(_0x2b62e5)[_0x510602(0x4b5)]();const _0x26f4ab=VisuMZ[_0x510602(0x6a7)][_0x510602(0x7c3)][_0x510602(0x81d)];if(_0x2b62e5===_0x510602(0x644))return _0x26f4ab[_0x510602(0x86a)];if(_0x2b62e5===_0x510602(0x54f))return _0x26f4ab[_0x510602(0x9a7)];if(_0x2b62e5===_0x510602(0x840))return _0x26f4ab[_0x510602(0x6f6)];if(_0x2b62e5==='DEF')return _0x26f4ab[_0x510602(0x49e)];if(_0x2b62e5===_0x510602(0x8e9))return _0x26f4ab[_0x510602(0x82d)];if(_0x2b62e5==='MDF')return _0x26f4ab[_0x510602(0x570)];if(_0x2b62e5===_0x510602(0x6c1))return _0x26f4ab[_0x510602(0x9c6)];if(_0x2b62e5===_0x510602(0x59f))return _0x26f4ab['IconParam7'];if(_0x2b62e5===_0x510602(0x543))return _0x26f4ab[_0x510602(0x865)];if(_0x2b62e5===_0x510602(0x7ef))return _0x26f4ab[_0x510602(0x987)];if(_0x2b62e5==='CRI')return _0x26f4ab[_0x510602(0x454)];if(_0x2b62e5===_0x510602(0x51a))return _0x26f4ab['IconXParam3'];if(_0x2b62e5===_0x510602(0x643))return _0x26f4ab[_0x510602(0x61c)];if(_0x2b62e5===_0x510602(0x325))return _0x26f4ab[_0x510602(0x3af)];if(_0x2b62e5===_0x510602(0x95f))return _0x26f4ab[_0x510602(0x850)];if(_0x2b62e5==='HRG')return _0x26f4ab['IconXParam7'];if(_0x2b62e5===_0x510602(0x5ab))return _0x26f4ab['IconXParam8'];if(_0x2b62e5===_0x510602(0x61f))return _0x26f4ab['IconXParam9'];if(_0x2b62e5==='TGR')return _0x26f4ab[_0x510602(0x22c)];if(_0x2b62e5==='GRD')return _0x26f4ab[_0x510602(0x463)];if(_0x2b62e5===_0x510602(0x9e4))return _0x26f4ab[_0x510602(0x3e0)];if(_0x2b62e5==='PHA')return _0x26f4ab[_0x510602(0x636)];if(_0x2b62e5==='MCR')return _0x26f4ab[_0x510602(0x562)];if(_0x2b62e5==='TCR')return _0x26f4ab[_0x510602(0x930)];if(_0x2b62e5===_0x510602(0x7cc))return _0x26f4ab[_0x510602(0x855)];if(_0x2b62e5===_0x510602(0x92a))return _0x26f4ab['IconSParam7'];if(_0x2b62e5===_0x510602(0x33a))return _0x26f4ab[_0x510602(0x9a6)];if(_0x2b62e5===_0x510602(0x998))return _0x26f4ab[_0x510602(0x993)];if(VisuMZ[_0x510602(0x6a7)]['CustomParamIcons'][_0x2b62e5])return VisuMZ[_0x510602(0x6a7)][_0x510602(0x92f)][_0x2b62e5]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x27e196,_0xce0794,_0x24be8d){const _0x3e5d1c=_0x526668;if(_0x24be8d===undefined&&_0x27e196%0x1===0x0)return _0x27e196;if(_0x24be8d!==undefined&&[_0x3e5d1c(0x644),_0x3e5d1c(0x54f),_0x3e5d1c(0x840),_0x3e5d1c(0x8c5),'MAT',_0x3e5d1c(0x2fc),_0x3e5d1c(0x6c1),_0x3e5d1c(0x59f)][_0x3e5d1c(0x666)](String(_0x24be8d)[_0x3e5d1c(0x4b5)]()[_0x3e5d1c(0x4a6)]()))return _0x27e196;_0xce0794=_0xce0794||0x0;if(VisuMZ[_0x3e5d1c(0x6a7)]['CustomParamAbb'][_0x24be8d]){if(_0x3e5d1c(0x743)===_0x3e5d1c(0x743)){if(VisuMZ[_0x3e5d1c(0x6a7)][_0x3e5d1c(0x31d)][_0x24be8d]===_0x3e5d1c(0x956))return _0x27e196;else{if(_0x3e5d1c(0x5ee)!==_0x3e5d1c(0x5ee))switch(_0x2079b0['CoreEngine']['Settings'][_0x3e5d1c(0x622)]['AutoStretch']){case _0x3e5d1c(0x440):return!![];case _0x3e5d1c(0xa36):return![];default:return _0x23c147['CoreEngine'][_0x3e5d1c(0x323)][_0x3e5d1c(0x5f4)](this);}else return String((_0x27e196*0x64)[_0x3e5d1c(0x729)](_0xce0794))+'%';}}else{this[_0x3e5d1c(0x3cd)]={};if(_0x10cf52[_0x3e5d1c(0x6a7)][_0x3e5d1c(0x7c3)][_0x3e5d1c(0x622)][_0x3e5d1c(0x66e)])this[_0x3e5d1c(0x861)]=this[_0x3e5d1c(0x239)];if(_0x23837e['CoreEngine'][_0x3e5d1c(0x7c3)]['QoL'][_0x3e5d1c(0xa2f)])this[_0x3e5d1c(0x576)]=this[_0x3e5d1c(0x84c)];}}return String((_0x27e196*0x64)['toFixed'](_0xce0794))+'%';},VisuMZ[_0x526668(0x733)]=function(_0x463d48){const _0xb63fa7=_0x526668;_0x463d48=String(_0x463d48);if(!_0x463d48)return _0x463d48;if(typeof _0x463d48!==_0xb63fa7(0x43c))return _0x463d48;const _0x431167=VisuMZ[_0xb63fa7(0x6a7)][_0xb63fa7(0x7c3)][_0xb63fa7(0x622)][_0xb63fa7(0x241)]||'en-US',_0xdcd1e5={'maximumFractionDigits':0x6};_0x463d48=_0x463d48[_0xb63fa7(0x38e)](/\[(.*?)\]/g,(_0x3dc1cd,_0x271433)=>{return VisuMZ['PreserveNumbers'](_0x271433,'[',']');}),_0x463d48=_0x463d48[_0xb63fa7(0x38e)](/<(.*?)>/g,(_0xe75fe1,_0x3832aa)=>{const _0x147221=_0xb63fa7;if('VyoPl'!==_0x147221(0x46d))return VisuMZ[_0x147221(0x945)](_0x3832aa,'<','>');else _0x3d8271('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x147221(0xa0a)](_0x2f319b,_0x4befea,_0x4227bf)),_0x284695[_0x147221(0x9bb)]();}),_0x463d48=_0x463d48['replace'](/\{\{(.*?)\}\}/g,(_0x23f0f8,_0x3095b7)=>{const _0x4b010b=_0xb63fa7;return VisuMZ[_0x4b010b(0x945)](_0x3095b7,'','');}),_0x463d48=_0x463d48['replace'](/(\d+\.?\d*)/g,(_0x49dc87,_0x380ccb)=>{const _0x1997b3=_0xb63fa7;let _0x5a1d2d=_0x380ccb;if(_0x5a1d2d[0x0]==='0')return _0x5a1d2d;if(_0x5a1d2d[_0x5a1d2d[_0x1997b3(0x5f3)]-0x1]==='.')return Number(_0x5a1d2d)['toLocaleString'](_0x431167,_0xdcd1e5)+'.';else return _0x5a1d2d[_0x5a1d2d[_0x1997b3(0x5f3)]-0x1]===','?Number(_0x5a1d2d)[_0x1997b3(0x67c)](_0x431167,_0xdcd1e5)+',':Number(_0x5a1d2d)[_0x1997b3(0x67c)](_0x431167,_0xdcd1e5);});let _0x42fa02=0x3;while(_0x42fa02--){_0x463d48=VisuMZ['RevertPreserveNumbers'](_0x463d48);}return _0x463d48;},VisuMZ['PreserveNumbers']=function(_0x22ace9,_0x2507df,_0x17841c){const _0x526618=_0x526668;return _0x22ace9=_0x22ace9['replace'](/(\d)/gi,(_0xcc9044,_0x298b23)=>_0x526618(0x443)[_0x526618(0xa0a)](Number(_0x298b23))),_0x526618(0x607)['format'](_0x22ace9,_0x2507df,_0x17841c);},VisuMZ[_0x526668(0x21a)]=function(_0x59f0aa){const _0x241775=_0x526668;return _0x59f0aa=_0x59f0aa[_0x241775(0x38e)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x598a7a,_0x6612ba)=>Number(parseInt(_0x6612ba))),_0x59f0aa;},VisuMZ[_0x526668(0x524)]=function(_0x50c120){const _0x46cd56=_0x526668;SoundManager['playOk']();if(!Utils['isNwjs']()){if(_0x46cd56(0x671)!==_0x46cd56(0x456)){const _0x300e6c=window['open'](_0x50c120,_0x46cd56(0x91f));}else this['_forcedTroopView']='FV';}else{if(_0x46cd56(0x63a)!=='vqDWe')return _0x136ecc['CoreEngine'][_0x46cd56(0x7c3)][_0x46cd56(0x2ae)][_0x46cd56(0x95c)];else{const _0x2e90af=process[_0x46cd56(0x29b)]=='darwin'?_0x46cd56(0x858):process[_0x46cd56(0x29b)]==_0x46cd56(0x59b)?_0x46cd56(0x264):_0x46cd56(0x6bd);require('child_process')['exec'](_0x2e90af+'\x20'+_0x50c120);}}},Game_Picture[_0x526668(0x4aa)]['anchor']=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x526668(0x8d1)]=Game_Picture[_0x526668(0x4aa)]['initBasic'],Game_Picture[_0x526668(0x4aa)]['initBasic']=function(){const _0x24769f=_0x526668;VisuMZ[_0x24769f(0x6a7)][_0x24769f(0x8d1)]['call'](this),this[_0x24769f(0x291)]={'x':0x0,'y':0x0},this[_0x24769f(0x742)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine']['Game_Picture_updateMove']=Game_Picture[_0x526668(0x4aa)]['updateMove'],Game_Picture[_0x526668(0x4aa)][_0x526668(0x759)]=function(){const _0x4d4152=_0x526668;this[_0x4d4152(0x5fc)]();const _0x406deb=this[_0x4d4152(0x21f)];VisuMZ['CoreEngine']['Game_Picture_updateMove'][_0x4d4152(0x5f4)](this);if(_0x406deb>0x0&&this[_0x4d4152(0x21f)]<=0x0){if(_0x4d4152(0x26d)!=='KzLIW')return this['isItem'](_0x2a873c)&&_0x12c181[_0x4d4152(0x893)]===0x2;else this['_x']=this[_0x4d4152(0x569)],this['_y']=this[_0x4d4152(0x79f)],this['_scaleX']=this['_targetScaleX'],this[_0x4d4152(0x4ea)]=this[_0x4d4152(0x8e6)],this[_0x4d4152(0x9d2)]=this['_targetOpacity'],this[_0x4d4152(0x291)]&&(this['_anchor']['x']=this[_0x4d4152(0x742)]['x'],this['_anchor']['y']=this[_0x4d4152(0x742)]['y']);}},VisuMZ[_0x526668(0x6a7)]['Game_Picture_show']=Game_Picture[_0x526668(0x4aa)][_0x526668(0x6f0)],Game_Picture[_0x526668(0x4aa)][_0x526668(0x6f0)]=function(_0x5f4513,_0x42e464,_0x13dd21,_0x4224e0,_0x380894,_0x5fbe10,_0x5c4d87,_0x57bc22){const _0x59b263=_0x526668;VisuMZ[_0x59b263(0x6a7)]['Game_Picture_show'][_0x59b263(0x5f4)](this,_0x5f4513,_0x42e464,_0x13dd21,_0x4224e0,_0x380894,_0x5fbe10,_0x5c4d87,_0x57bc22),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x42e464]||{'x':0x0,'y':0x0});},VisuMZ[_0x526668(0x6a7)][_0x526668(0x35b)]=Game_Picture['prototype'][_0x526668(0x71e)],Game_Picture[_0x526668(0x4aa)][_0x526668(0x71e)]=function(_0x1ba39e,_0x417daf,_0x1af672,_0x38633e,_0x380dda,_0x39997e,_0x112b0b,_0x3f0839,_0x26a677){const _0x30f88b=_0x526668;VisuMZ[_0x30f88b(0x6a7)][_0x30f88b(0x35b)][_0x30f88b(0x5f4)](this,_0x1ba39e,_0x417daf,_0x1af672,_0x38633e,_0x380dda,_0x39997e,_0x112b0b,_0x3f0839,_0x26a677),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1ba39e]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x526668(0x5fc)]=function(){const _0x8602d1=_0x526668;this[_0x8602d1(0x21f)]>0x0&&(this[_0x8602d1(0x291)]['x']=this[_0x8602d1(0x8aa)](this[_0x8602d1(0x291)]['x'],this[_0x8602d1(0x742)]['x']),this[_0x8602d1(0x291)]['y']=this[_0x8602d1(0x8aa)](this[_0x8602d1(0x291)]['y'],this[_0x8602d1(0x742)]['y']));},Game_Picture[_0x526668(0x4aa)]['setAnchor']=function(_0x32ab8b){const _0x197343=_0x526668;this[_0x197343(0x291)]=_0x32ab8b,this['_targetAnchor']=JsonEx[_0x197343(0x914)](this[_0x197343(0x291)]);},Game_Picture[_0x526668(0x4aa)][_0x526668(0x7bf)]=function(_0x115dbb){const _0xd3243d=_0x526668;this[_0xd3243d(0x742)]=_0x115dbb;},VisuMZ[_0x526668(0x6a7)][_0x526668(0x40b)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x526668(0x4aa)][_0x526668(0x41c)]=function(){const _0x3eb7f3=_0x526668,_0x23cc44=this[_0x3eb7f3(0x2f6)]();!_0x23cc44[_0x3eb7f3(0x7e6)]()?VisuMZ[_0x3eb7f3(0x6a7)][_0x3eb7f3(0x40b)][_0x3eb7f3(0x5f4)](this):(this['anchor']['x']=_0x23cc44[_0x3eb7f3(0x7e6)]()['x'],this['anchor']['y']=_0x23cc44[_0x3eb7f3(0x7e6)]()['y']);},Game_Action[_0x526668(0x4aa)][_0x526668(0x481)]=function(_0x1c90e7){const _0x80657a=_0x526668;if(_0x1c90e7){if(_0x80657a(0x7c7)===_0x80657a(0x863))this[_0x80657a(0x9a2)][_0x80657a(0x529)](_0x1baecf[_0x80657a(0x298)][_0x80657a(0x7b7)]);else{const _0x5948fe=_0x1c90e7['skillId'];if(_0x5948fe===0x1&&this[_0x80657a(0x297)]()[_0x80657a(0x5a5)]()!==0x1){if(_0x80657a(0x3e6)===_0x80657a(0x402)){const _0x2007c4=this[_0x80657a(0x82b)],_0x3fc043=this[_0x80657a(0x8ef)],_0x201302=0x18,_0x4a55c0=_0x201302/0x2,_0x727d3f=0x60+_0x201302,_0x1aa1a1=0x0+_0x201302;this['_downArrowSprite']['bitmap']=this[_0x80657a(0x659)],this[_0x80657a(0x20f)][_0x80657a(0x7e6)]['x']=0.5,this[_0x80657a(0x20f)]['anchor']['y']=0.5,this['_downArrowSprite'][_0x80657a(0x72d)](_0x727d3f+_0x4a55c0,_0x1aa1a1+_0x4a55c0+_0x201302,_0x201302,_0x4a55c0),this[_0x80657a(0x20f)][_0x80657a(0x71e)](_0x374750[_0x80657a(0x746)](_0x2007c4/0x2),_0x358fbc['round'](_0x3fc043-_0x4a55c0)),this[_0x80657a(0x4ed)][_0x80657a(0xa29)]=this[_0x80657a(0x659)],this[_0x80657a(0x4ed)]['anchor']['x']=0.5,this['_upArrowSprite'][_0x80657a(0x7e6)]['y']=0.5,this['_upArrowSprite'][_0x80657a(0x72d)](_0x727d3f+_0x4a55c0,_0x1aa1a1,_0x201302,_0x4a55c0),this[_0x80657a(0x4ed)][_0x80657a(0x71e)](_0x168c28[_0x80657a(0x746)](_0x2007c4/0x2),_0x356d5e[_0x80657a(0x746)](_0x4a55c0));}else this[_0x80657a(0x305)]();}else{if(_0x5948fe===0x2&&this[_0x80657a(0x297)]()[_0x80657a(0x4f3)]()!==0x2){if(_0x80657a(0x730)===_0x80657a(0x730))this[_0x80657a(0x5d1)]();else return this[_0x80657a(0x949)](_0x3325cc,_0x34e2cb);}else{if('qMgEx'!==_0x80657a(0x399))this[_0x80657a(0x9d5)](_0x5948fe);else{var _0x1a5c50=_0x372c57(_0xce5f27['$1'])/0x64;_0x253e51*=_0x1a5c50;}}}}}else this[_0x80657a(0x56a)]();},Game_Actor[_0x526668(0x4aa)]['usableSkills']=function(){const _0x52080b=_0x526668;return this[_0x52080b(0x5b5)]()[_0x52080b(0x4d8)](_0x492a43=>this['canUse'](_0x492a43)&&this[_0x52080b(0x371)]()[_0x52080b(0x666)](_0x492a43[_0x52080b(0x683)]));},Window_Base[_0x526668(0x4aa)][_0x526668(0x6a2)]=function(){const _0x2c7697=_0x526668;this['_dimmerSprite']=new Sprite(),this[_0x2c7697(0x2eb)][_0x2c7697(0xa29)]=new Bitmap(0x0,0x0),this[_0x2c7697(0x2eb)]['x']=0x0,this[_0x2c7697(0x5cf)](this[_0x2c7697(0x2eb)]);},Window_Base['prototype'][_0x526668(0x675)]=function(){const _0x36cd56=_0x526668;if(this[_0x36cd56(0x2eb)]){const _0x1efb51=this[_0x36cd56(0x2eb)][_0x36cd56(0xa29)],_0x17a80c=this[_0x36cd56(0x745)],_0x2f8aac=this[_0x36cd56(0x36a)],_0x30c66c=this[_0x36cd56(0x4e8)],_0x42d5a8=ColorManager[_0x36cd56(0x68c)](),_0x125e2a=ColorManager[_0x36cd56(0x504)]();_0x1efb51['resize'](_0x17a80c,_0x2f8aac),_0x1efb51[_0x36cd56(0x829)](0x0,0x0,_0x17a80c,_0x30c66c,_0x125e2a,_0x42d5a8,!![]),_0x1efb51[_0x36cd56(0x9c9)](0x0,_0x30c66c,_0x17a80c,_0x2f8aac-_0x30c66c*0x2,_0x42d5a8),_0x1efb51[_0x36cd56(0x829)](0x0,_0x2f8aac-_0x30c66c,_0x17a80c,_0x30c66c,_0x42d5a8,_0x125e2a,!![]),this['_dimmerSprite'][_0x36cd56(0x72d)](0x0,0x0,_0x17a80c,_0x2f8aac);}},Game_Actor[_0x526668(0x4aa)][_0x526668(0x3ac)]=function(){const _0x253694=_0x526668;for(let _0x50d4dd=0x0;_0x50d4dd<this['numActions']();_0x50d4dd++){const _0x112265=this[_0x253694(0x87f)]();let _0x238acf=Number['MIN_SAFE_INTEGER'];this[_0x253694(0x4a5)](_0x50d4dd,_0x112265[0x0]);for(const _0x15aa70 of _0x112265){const _0x46e833=_0x15aa70['evaluate']();_0x46e833>_0x238acf&&(_0x238acf=_0x46e833,this[_0x253694(0x4a5)](_0x50d4dd,_0x15aa70));}}this[_0x253694(0x299)](_0x253694(0x641));},Window_BattleItem[_0x526668(0x4aa)]['isEnabled']=function(_0x226783){const _0x355839=_0x526668;if(BattleManager[_0x355839(0x6ff)]())return BattleManager[_0x355839(0x6ff)]()[_0x355839(0x217)](_0x226783);else{if(_0x355839(0x4bb)!==_0x355839(0x4bb))this[_0x355839(0x9a2)]&&this[_0x355839(0x9a2)]['setBackgroundType'](_0x377daf[_0x355839(0x298)]['HelpBgType']),this[_0x355839(0x27d)]&&this[_0x355839(0x27d)][_0x355839(0x529)](_0x515f51['layoutSettings'][_0x355839(0x82e)]);else return Window_ItemList['prototype'][_0x355839(0x1f5)][_0x355839(0x5f4)](this,_0x226783);}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x943)]=Scene_Map[_0x526668(0x4aa)][_0x526668(0x903)],Scene_Map[_0x526668(0x4aa)]['createSpriteset']=function(){const _0x1c97db=_0x526668;VisuMZ[_0x1c97db(0x6a7)][_0x1c97db(0x943)][_0x1c97db(0x5f4)](this);const _0x451b1a=this[_0x1c97db(0x696)][_0x1c97db(0x6e2)];if(_0x451b1a)this['addChild'](_0x451b1a);},VisuMZ[_0x526668(0x6a7)][_0x526668(0x994)]=Scene_Battle[_0x526668(0x4aa)]['createSpriteset'],Scene_Battle[_0x526668(0x4aa)][_0x526668(0x903)]=function(){const _0x1bad2b=_0x526668;VisuMZ[_0x1bad2b(0x6a7)]['Scene_Battle_createSpritesetFix']['call'](this);const _0x3fed2c=this[_0x1bad2b(0x696)][_0x1bad2b(0x6e2)];if(_0x3fed2c)this['addChild'](_0x3fed2c);},Sprite_Actor[_0x526668(0x4aa)][_0x526668(0x894)]=function(){const _0x553683=_0x526668;Sprite_Battler[_0x553683(0x4aa)]['update'][_0x553683(0x5f4)](this),this[_0x553683(0x7ae)]();if(this['_actor'])this[_0x553683(0x2f4)]();else{if(this['_battlerName']!==''){if(_0x553683(0x30c)==='khEtq')return _0x1ce56a[_0x553683(0x6a7)][_0x553683(0x7c3)][_0x553683(0x622)][_0x553683(0x370)];else this['_battlerName']='';}}},Window[_0x526668(0x4aa)][_0x526668(0x81e)]=function(){const _0x2828f4=_0x526668,_0x4c1290=this[_0x2828f4(0x82b)],_0x3840c8=this[_0x2828f4(0x8ef)],_0x1a29c2=0x18,_0x1b9a2f=_0x1a29c2/0x2,_0x552f75=0x60+_0x1a29c2,_0x5c9df6=0x0+_0x1a29c2;this[_0x2828f4(0x20f)][_0x2828f4(0xa29)]=this[_0x2828f4(0x659)],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x2828f4(0x20f)][_0x2828f4(0x7e6)]['y']=0.5,this[_0x2828f4(0x20f)][_0x2828f4(0x72d)](_0x552f75+_0x1b9a2f,_0x5c9df6+_0x1b9a2f+_0x1a29c2,_0x1a29c2,_0x1b9a2f),this[_0x2828f4(0x20f)][_0x2828f4(0x71e)](Math[_0x2828f4(0x746)](_0x4c1290/0x2),Math[_0x2828f4(0x746)](_0x3840c8-_0x1b9a2f)),this['_upArrowSprite'][_0x2828f4(0xa29)]=this[_0x2828f4(0x659)],this[_0x2828f4(0x4ed)]['anchor']['x']=0.5,this[_0x2828f4(0x4ed)][_0x2828f4(0x7e6)]['y']=0.5,this['_upArrowSprite']['setFrame'](_0x552f75+_0x1b9a2f,_0x5c9df6,_0x1a29c2,_0x1b9a2f),this[_0x2828f4(0x4ed)]['move'](Math[_0x2828f4(0x746)](_0x4c1290/0x2),Math[_0x2828f4(0x746)](_0x1b9a2f));},Window[_0x526668(0x4aa)]['_refreshPauseSign']=function(){const _0x5a197b=_0x526668,_0x1e42b4=0x90,_0x1e51e8=0x60,_0x17ac88=0x18;this['_pauseSignSprite'][_0x5a197b(0xa29)]=this[_0x5a197b(0x659)],this['_pauseSignSprite']['anchor']['x']=0.5,this[_0x5a197b(0x246)][_0x5a197b(0x7e6)]['y']=0x1,this[_0x5a197b(0x246)][_0x5a197b(0x71e)](Math[_0x5a197b(0x746)](this[_0x5a197b(0x82b)]/0x2),this[_0x5a197b(0x8ef)]),this[_0x5a197b(0x246)]['setFrame'](_0x1e42b4,_0x1e51e8,_0x17ac88,_0x17ac88),this[_0x5a197b(0x246)][_0x5a197b(0x6f7)]=0xff;},Window[_0x526668(0x4aa)][_0x526668(0x281)]=function(){const _0x2eab73=_0x526668,_0x5bb0af=this[_0x2eab73(0x326)][_0x2eab73(0x588)][_0x2eab73(0x486)](new Point(0x0,0x0)),_0x42c66e=this['_clientArea'][_0x2eab73(0x39a)];_0x42c66e['x']=_0x5bb0af['x']+this[_0x2eab73(0x357)]['x'],_0x42c66e['y']=_0x5bb0af['y']+this[_0x2eab73(0x357)]['y'],_0x42c66e[_0x2eab73(0x745)]=Math['ceil'](this[_0x2eab73(0x96c)]*this[_0x2eab73(0x766)]['x']),_0x42c66e[_0x2eab73(0x36a)]=Math[_0x2eab73(0x5cb)](this[_0x2eab73(0x2c8)]*this[_0x2eab73(0x766)]['y']);},Window[_0x526668(0x4aa)][_0x526668(0x706)]=function(){const _0x124660=_0x526668,_0x8f9566=this[_0x124660(0x638)],_0x2df0af=Math[_0x124660(0x431)](0x0,this[_0x124660(0x82b)]-_0x8f9566*0x2),_0x22343f=Math[_0x124660(0x431)](0x0,this[_0x124660(0x8ef)]-_0x8f9566*0x2),_0x5abcf5=this[_0x124660(0x2a0)],_0x10545f=_0x5abcf5[_0x124660(0x7cd)][0x0];_0x5abcf5['bitmap']=this['_windowskin'],_0x5abcf5[_0x124660(0x72d)](0x0,0x0,0x60,0x60),_0x5abcf5[_0x124660(0x71e)](_0x8f9566,_0x8f9566),_0x5abcf5[_0x124660(0x766)]['x']=_0x2df0af/0x60,_0x5abcf5[_0x124660(0x766)]['y']=_0x22343f/0x60,_0x10545f['bitmap']=this[_0x124660(0x659)],_0x10545f[_0x124660(0x72d)](0x0,0x60,0x60,0x60),_0x10545f[_0x124660(0x71e)](0x0,0x0,_0x2df0af,_0x22343f),_0x10545f['scale']['x']=0x1/_0x5abcf5['scale']['x'],_0x10545f[_0x124660(0x766)]['y']=0x1/_0x5abcf5[_0x124660(0x766)]['y'],_0x5abcf5['setColorTone'](this[_0x124660(0x429)]);},Game_Temp[_0x526668(0x4aa)][_0x526668(0x688)]=function(){const _0x19b553=_0x526668;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this['_pointAnimationQueue']=[],this[_0x19b553(0x4a3)]=[];},VisuMZ[_0x526668(0x6a7)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x526668(0x4aa)][_0x526668(0x971)],Scene_Base[_0x526668(0x4aa)][_0x526668(0x971)]=function(){const _0x450357=_0x526668;if($gameTemp)$gameTemp[_0x450357(0x688)]();VisuMZ[_0x450357(0x6a7)][_0x450357(0x32c)][_0x450357(0x5f4)](this);},Bitmap[_0x526668(0x4aa)][_0x526668(0x763)]=function(_0x1a2b41){const _0x65271d=_0x526668,_0x342a8e=this[_0x65271d(0x283)];_0x342a8e[_0x65271d(0x427)](),_0x342a8e[_0x65271d(0x4a7)]=this[_0x65271d(0x890)]();const _0x279e87=_0x342a8e[_0x65271d(0x608)](_0x1a2b41)[_0x65271d(0x745)];return _0x342a8e[_0x65271d(0x699)](),_0x279e87;},Window_Message[_0x526668(0x4aa)]['textWidth']=function(_0x27025e){const _0x216238=_0x526668;if(this[_0x216238(0x4bf)]())return this['contents']['measureTextWidthNoRounding'](_0x27025e);else{if('GByht'==='EtEfM')_0x2e465e[_0x216238(0x389)](_0x45bcff);else return Window_Base[_0x216238(0x4aa)][_0x216238(0x301)][_0x216238(0x5f4)](this,_0x27025e);}},Window_Message[_0x526668(0x4aa)]['useFontWidthFix']=function(){const _0x2ee6d5=_0x526668;return VisuMZ[_0x2ee6d5(0x6a7)][_0x2ee6d5(0x7c3)][_0x2ee6d5(0x622)][_0x2ee6d5(0x498)]??!![];},VisuMZ['CoreEngine'][_0x526668(0x56b)]=Game_Action[_0x526668(0x4aa)][_0x526668(0x7a1)],Game_Action[_0x526668(0x4aa)][_0x526668(0x7a1)]=function(){const _0xde0056=_0x526668;if(this[_0xde0056(0x4fd)]())return VisuMZ['CoreEngine']['Game_Action_numRepeats'][_0xde0056(0x5f4)](this);else{if(_0xde0056(0x2f9)===_0xde0056(0x2f9))return 0x0;else{const _0x4fd1cf=_0xde0056(0x5e3);this[_0xde0056(0x435)]=this['_colorCache']||{};if(this['_colorCache'][_0x4fd1cf])return this['_colorCache'][_0x4fd1cf];const _0x2b2ecc=_0x3f3005[_0xde0056(0x6a7)]['Settings']['Color'][_0xde0056(0x9b2)];return this['getColorDataFromPluginParameters'](_0x4fd1cf,_0x2b2ecc);}}},VisuMZ[_0x526668(0x6a7)][_0x526668(0x27a)]=Game_Action[_0x526668(0x4aa)][_0x526668(0x305)],Game_Action['prototype'][_0x526668(0x305)]=function(){const _0x1fbda8=_0x526668;this[_0x1fbda8(0x297)]()&&this[_0x1fbda8(0x297)]()[_0x1fbda8(0x29a)]()?VisuMZ['CoreEngine'][_0x1fbda8(0x27a)][_0x1fbda8(0x5f4)](this):this[_0x1fbda8(0x56a)]();},Sprite_Name[_0x526668(0x4aa)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x526668(0x4aa)]['redraw']=function(){const _0x343006=_0x526668,_0x20da1c=this['name'](),_0x55aa92=this[_0x343006(0x694)](),_0x495b1e=this['bitmapHeight']();this['setupFont'](),this[_0x343006(0xa29)][_0x343006(0x56a)](),this[_0x343006(0xa29)][_0x343006(0x54d)](_0x20da1c,0x0,0x0,_0x55aa92,_0x495b1e,_0x343006(0x841));},Bitmap['prototype'][_0x526668(0x54d)]=function(_0x3ad817,_0x3338b6,_0x45f0a5,_0x5e58ee,_0x4bf3ab,_0x3e4d91){const _0x10de57=_0x526668,_0x110d6e=this['context'],_0xc655b2=_0x110d6e[_0x10de57(0x9e2)];_0x5e58ee=_0x5e58ee||0xffffffff;let _0x3a0312=_0x3338b6,_0xedb965=Math[_0x10de57(0x746)](_0x45f0a5+0x18/0x2+this[_0x10de57(0x996)]*0.35);_0x3e4d91===_0x10de57(0x541)&&(_0x3a0312+=_0x5e58ee/0x2);if(_0x3e4d91===_0x10de57(0x43b)){if(_0x10de57(0x2d8)!==_0x10de57(0x9b8))_0x3a0312+=_0x5e58ee;else return _0x5a0ebc[_0x10de57(0x6a7)][_0x10de57(0x26a)]['call'](this);}_0x110d6e[_0x10de57(0x427)](),_0x110d6e[_0x10de57(0x4a7)]=this[_0x10de57(0x890)](),_0x110d6e[_0x10de57(0x9ac)]=_0x3e4d91,_0x110d6e[_0x10de57(0x34f)]='alphabetic',_0x110d6e['globalAlpha']=0x1,this[_0x10de57(0x1f6)](_0x3ad817,_0x3a0312,_0xedb965,_0x5e58ee),_0x110d6e['globalAlpha']=_0xc655b2,this['_drawTextBody'](_0x3ad817,_0x3a0312,_0xedb965,_0x5e58ee),_0x110d6e[_0x10de57(0x699)](),this[_0x10de57(0x25c)][_0x10de57(0x894)]();},VisuMZ['CoreEngine'][_0x526668(0x242)]=BattleManager['checkSubstitute'],BattleManager[_0x526668(0xa21)]=function(_0xa169ff){const _0x50d7ad=_0x526668;if(this[_0x50d7ad(0x63c)][_0x50d7ad(0x20a)]())return![];return VisuMZ[_0x50d7ad(0x6a7)]['BattleManager_checkSubstitute']['call'](this,_0xa169ff);},BattleManager[_0x526668(0x5c9)]=function(){const _0x31988e=_0x526668;if(this[_0x31988e(0x640)])this[_0x31988e(0x5ac)]['endAction'](this[_0x31988e(0x640)]);this[_0x31988e(0x612)]='turn',this[_0x31988e(0x640)]&&this[_0x31988e(0x640)][_0x31988e(0x384)]()===0x0&&(this['endBattlerActions'](this['_subject']),this['_subject']=null);};