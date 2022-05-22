//=============================================================================
// VisuStella MZ - HorrorEffects
// VisuMZ_2_HorrorEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_HorrorEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.HorrorEffects = VisuMZ.HorrorEffects || {};
VisuMZ.HorrorEffects.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [HorrorEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Horror_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This is a plugin for RPG Maker MZ that will allow you to add visual horror
 * effects to your game's title screen, maps, events, pictures, battle, etc.
 * You can turn on individual effects at a time or multiple simultaneously. The
 * effects include a noise effect, a glitch effect, and a TV effect, which is
 * commonly seen used in most horror films. Now, you can use these effects in
 * RPG Maker MZ, too!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A noise effect filter which creates specks of dots on the screen that
 *   can obscure it at various intensity rates.
 * * A glitch effect that will cause the screen to tear at custom intervals of
 *   varying frequency and strength.
 * * A TV effect that imitates the display of a cathode ray tube television
 *   with animated lines that travel across the screen at a determined speed.
 * * Apply these effects to the map screen, battle screen, title screen, and/or
 *   various entities on the screen such as events, pictures, actors, and
 *   enemies.
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
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Noise
 * 
 * The noise effect will cause specks of light that obscure the image the
 * filter is applied to. The intensity rate of the noise will make the image
 * more obscure and harder to see.
 *
 * ---
 *
 * Glitch
 * 
 * The glitch effect will cause bits of the screen to break up into various
 * pieces. These can be tied to a frequency and strength level that can control
 * how often the glitch effect occurs on screen.
 *
 * ---
 *
 * TV
 * 
 * This will create TV lines akin to a cathode ray tube television. The lines
 * will move vertically across the screen. These lines can have their thickness
 * levels changed and the speed at which the lines travel can also be altered.
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
 * The Horror Effects will also be available as Action Sequences in the
 * Battle Core's Action Sequence Plugin Commands. The Horror Action Sequences
 * will make use of the Battle Core's targeting system for more accurate
 * control over who and what to apply the Horror Effects for.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Battle Plugin Commands ===
 * 
 * ---
 *
 * Battle: Clear All Filters
 * - Clear all Horror Effects filters on the main battle screen.
 *
 * ---
 *
 * Battle: Glitch Create
 * - Creates the glitch effect on the main battle screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Battle: Glitch Remove
 * - Removes the glitch effect on the main battle screen.
 *
 * ---
 *
 * Battle: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Battle: Noise Remove
 * - Removes the noise effect on the main battle screen.
 *
 * ---
 *
 * Battle: TV Create
 * - Creates the TV effect on the main battle screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Battle: TV Remove
 * - Removes the TV effect on the main battle screen.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 *
 * Map: Clear All Filters
 * - Clear all Horror Effects filters on the main map screen.
 *
 * ---
 *
 * Map: Glitch Create
 * - Creates the glitch effect on the main map screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Map: Glitch Remove
 * - Removes the glitch effect on the main map screen.
 *
 * ---
 *
 * Map: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Map: Noise Remove
 * - Removes the noise effect on the main map screen.
 *
 * ---
 *
 * Map: TV Create
 * - Creates the TV effect on the main map screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Map: TV Remove
 * - Removes the TV effect on the main map screen.
 *
 * ---
 * 
 * === Event Plugin Commands ===
 * 
 * ---
 *
 * Event: Clear All Filters
 * - Clear all Horror Effects filters on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to clear horror effects from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: Glitch Create
 * - Creates the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Event: Glitch Remove
 * - Removes the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: Noise Create
 * - Creates the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Event: Noise Remove
 * - Removes the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: TV Create
 * - Creates the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Event: TV Remove
 * - Removes the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Clear All Filters
 * - Clear all Horror Effects filters on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to clear horror effects from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: Glitch Create
 * - Creates the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Picture: Glitch Remove
 * - Removes the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: Noise Create
 * - Creates the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Picture: Noise Remove
 * - Removes the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: TV Create
 * - Creates the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Picture: TV Remove
 * - Removes the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Clear All Filters
 * - Clear all Horror Effects filters on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to clear horror effects from.
 *
 * ---
 *
 * Actor: Glitch Create
 * - Creates the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Actor: Glitch Remove
 * - Removes the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: Noise Create
 * - Creates the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Actor: Noise Remove
 * - Removes the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: TV Create
 * - Creates the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Actor: TV Remove
 * - Removes the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Clear All Filters
 * - Clear all Horror Effects filters on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to clear horror effects from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: Glitch Create
 * - Creates the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Party: Glitch Remove
 * - Removes the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: Noise Create
 * - Creates the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Party: Noise Remove
 * - Removes the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: TV Create
 * - Creates the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Party: TV Remove
 * - Removes the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Clear All Filters
 * - Clear all Horror Effects filters on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to clear horror effects from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: Glitch Create
 * - Creates the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Enemy: Glitch Remove
 * - Removes the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: Noise Create
 * - Creates the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Enemy: Noise Remove
 * - Removes the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: TV Create
 * - Creates the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Enemy: TV Remove
 * - Removes the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Image Settings
 * ============================================================================
 *
 * These settings will allow you to apply Horror Effects to each of the title
 * images that you can set in Database > System 1 > Title Screen Images.
 * The settings for each of them can be applied differently from one another,
 * You can apply any of the Noise, Glitch, and/or TV effects.
 *
 * ---
 *
 * Noise
 * 
 *   Noise Effect?:
 *   - Apply the target with a noise effect?
 * 
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 * 
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Glitch
 * 
 *   Glitch Effect?:
 *   - Apply the target with a glitch effect?
 * 
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 * 
 *   Glitch Offset:
 *   - Default offset value.
 * 
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 * 
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 * 
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * TV Lines
 * 
 *   TV Effect?:
 *   - Apply the target with a TV effect?
 * 
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 * 
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 * 
 *   TV Animated:
 *   - Animate the TV?
 * 
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
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
 * Version 1.01: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 *
 * Version 1.00: December 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleClear
 * @text Battle: Clear All Filters
 * @desc Clear all Horror Effects filters on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchCreate
 * @text Battle: Glitch Create
 * @desc Creates the glitch effect on the main battle screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchRemove
 * @text Battle: Glitch Remove
 * @desc Removes the glitch effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseCreate
 * @text Battle: Noise Create
 * @desc Creates the noise effect on the main battle screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseRemove
 * @text Battle: Noise Remove
 * @desc Removes the noise effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVCreate
 * @text Battle: TV Create
 * @desc Creates the TV effect on the main battle screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVRemove
 * @text Battle: TV Remove
 * @desc Removes the TV effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapClear
 * @text Map: Clear All Filters
 * @desc Clear all Horror Effects filters on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchCreate
 * @text Map: Glitch Create
 * @desc Creates the glitch effect on the main map screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchRemove
 * @text Map: Glitch Remove
 * @desc Removes the glitch effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseCreate
 * @text Map: Noise Create
 * @desc Creates the noise effect on the main map screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseRemove
 * @text Map: Noise Remove
 * @desc Removes the noise effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVCreate
 * @text Map: TV Create
 * @desc Creates the TV effect on the main map screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVRemove
 * @text Map: TV Remove
 * @desc Removes the TV effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventClear
 * @text Event: Clear All Filters
 * @desc Clear all Horror Effects filters on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to clear horror effects from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchCreate
 * @text Event: Glitch Create
 * @desc Creates the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchRemove
 * @text Event: Glitch Remove
 * @desc Removes the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseCreate
 * @text Event: Noise Create
 * @desc Creates the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseRemove
 * @text Event: Noise Remove
 * @desc Removes the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVCreate
 * @text Event: TV Create
 * @desc Creates the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVRemove
 * @text Event: TV Remove
 * @desc Removes the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureClear
 * @text Picture: Clear All Filters
 * @desc Clear all Horror Effects filters on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to clear horror effects from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchCreate
 * @text Picture: Glitch Create
 * @desc Creates the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchRemove
 * @text Picture: Glitch Remove
 * @desc Removes the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseCreate
 * @text Picture: Noise Create
 * @desc Creates the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseRemove
 * @text Picture: Noise Remove
 * @desc Removes the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVCreate
 * @text Picture: TV Create
 * @desc Creates the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVRemove
 * @text Picture: TV Remove
 * @desc Removes the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorClear
 * @text Actor: Clear All Filters
 * @desc Clear all Horror Effects filters on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to clear horror effects from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchCreate
 * @text Actor: Glitch Create
 * @desc Creates the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchRemove
 * @text Actor: Glitch Remove
 * @desc Removes the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseCreate
 * @text Actor: Noise Create
 * @desc Creates the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseRemove
 * @text Actor: Noise Remove
 * @desc Removes the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVCreate
 * @text Actor: TV Create
 * @desc Creates the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVRemove
 * @text Actor: TV Remove
 * @desc Removes the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyClear
 * @text Party: Clear All Filters
 * @desc Clear all Horror Effects filters on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to clear horror effects from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchCreate
 * @text Party: Glitch Create
 * @desc Creates the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchRemove
 * @text Party: Glitch Remove
 * @desc Removes the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseCreate
 * @text Party: Noise Create
 * @desc Creates the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseRemove
 * @text Party: Noise Remove
 * @desc Removes the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVCreate
 * @text Party: TV Create
 * @desc Creates the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVRemove
 * @text Party: TV Remove
 * @desc Removes the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyClear
 * @text Enemy: Clear All Filters
 * @desc Clear all Horror Effects filters on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to clear horror effects from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchCreate
 * @text Enemy: Glitch Create
 * @desc Creates the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchRemove
 * @text Enemy: Glitch Remove
 * @desc Removes the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseCreate
 * @text Enemy: Noise Create
 * @desc Creates the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseRemove
 * @text Enemy: Noise Remove
 * @desc Removes the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVCreate
 * @text Enemy: TV Create
 * @desc Creates the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVRemove
 * @text Enemy: TV Remove
 * @desc Removes the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
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
 * @param HorrorEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Title1Settings:struct
 * @text Title 1 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 1 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
 *
 * @param Title2Settings:struct
 * @text Title 2 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 2 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
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
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param FilterNoise
 * @text Noise
 *
 * @param Noise:eval
 * @text Noise Effect?
 * @parent FilterNoise
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a noise effect?
 * @default true
 *
 * @param NoiseRate:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @param NoiseAni:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @param FilterGlitch
 * @text Glitch
 *
 * @param Glitch:eval
 * @text Glitch Effect?
 * @parent FilterGlitch
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a glitch effect?
 * @default true
 *
 * @param GlitchSlices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @param GlitchOffset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @param GlitchAni:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param GlitchAniFreq:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @param GlitchAniStr:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @param FilterTV
 * @text TV Lines
 *
 * @param TV:eval
 * @text TV Effect?
 * @parent FilterTV
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a TV effect?
 * @default true
 *
 * @param TVLineThickness:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @param TVCorner:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param TVAni:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @param TVAniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 */
//=============================================================================

const _0x4742=['updateHorrorGlitch','command357','PartyTVRemove','glitchFilter','glitch','_lastPluginCommandInterpreter','match','randomInt','format','createHorrorEffect','EnemyNoiseCreate','setHorrorGlitchSlices','ActorNoiseRemove','PartyGlitchRemove','animated','Sprite_Battler_setBattler','GlitchAni','initialize','offset','noise','PictureClear','EventTVCreate','getLastPluginCommandInterpreter','NoiseFilter','TVAni','setLastPluginCommandInterpreter','updateBitmap','indexOf','Game_Screen_clear','EventNoiseCreate','STRUCT','filters','setHorrorGlitchAnimated','version','setHorrorEffectToValue','frameCount','NoiseRate','359354mgLOIb','Spriteset_Battle_initialize','EnemyGlitchRemove','removeHorrorEffect','setHorrorTVLineThickness','MapClear','setHorrorTVAnimated','ARRAYSTR','10309aFMktS','EnemyIndex','ceil','_horrorFilters','max','aniStrength','makeDeepCopy','ARRAYFUNC','ARRAYSTRUCT','removeHorrorFilter','TVAniSpeed','needUpdate','leader','PartyGlitchCreate','ActorId','Glitch','1004461cDUdbE','includes','Game_Picture_erase','714461voIvAP','Game_BattlerBase_initialize','Title1Settings','refreshRequest','Game_Player_refresh','setHorrorGlitchOffset','createHorrorGlitch','seed','PictureGlitchRemove','setBattler','GlitchAniFreq','createHorrorNoise','PictureTVCreate','GlitchFilter','15352CzoUcL','setHorrorTVCornerSize','length','Settings','removeHorrorGlitch','MapNoiseRemove','parse','BattleNoiseCreate','Game_Follower_refresh','erase','EventId','Game_System_initialize','visible','EnemyTVCreate','_horrorFiltersSource','ActorGlitchCreate','EventGlitchCreate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_horrorFiltersGlitchSpecial','PictureId','Game_Picture_initialize','removeHorrorTV','status','NUM','aniSpeed','map','Filter','2TKJcrA','GlitchAniStr','97aRzFjq','push','synchronizeHorrorEffects','createHorrorFilter','PictureNoiseRemove','clearHorrorEffects','exit','STR','updateHorrorGlitchEffect','parameters','splice','ActorClear','HorrorEffects','event','217hBcDcW','trim','createBackground','picture','setHorrorNoiseRate','1PQWesk','Scene_Title_createBackground','MapGlitchRemove','return\x200','setHorrorNoiseAnimated','refresh','ConvertParams','PartyIndex','tvFilter','JSON','updateHorrorNoise','removeHorrorNoise','registerCommand','sliceMax','setHorrorEffectSettings','name','initMembers','Sprite_Picture_updateBitmap','vignetting','2079rZwCay','prototype','EVAL','MapNoiseCreate','EnemyGlitchCreate','PictureNoiseCreate','specialEffects','updateHorrorTV','PartyClear','MapTVRemove','synchronizeHorrorFiltersWithSource','415NROWfE','ARRAYEVAL','Spriteset_Map_initialize','actor','EnemyClear','sliceMin','BattleTVRemove','setHorrorGlitchStrength','update','call','GlitchSlices','lineWidth','createHorrorTV','Game_CharacterBase_initMembers','CRTFilter','Sprite_update','Title2Settings','aniFrequency','_eventId','Sprite_Picture_initialize','BattleTVCreate','BattleClear','NoiseAni','clear','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','filter','Noise','Game_Interpreter_PluginCommand','Sprite_initialize','PartyNoiseRemove','members','noiseFilter','222468xcFXlj','ARRAYJSON','updateHorrorEffects','ActorTVCreate','Sprite_Character_initialize','BattleGlitchCreate','setHorrorTVSpeed','PartyTVCreate','slices'];const _0x1c37=function(_0x1fcc1a,_0x20d566){_0x1fcc1a=_0x1fcc1a-0x8d;let _0x474250=_0x4742[_0x1fcc1a];return _0x474250;};const _0x87d98d=_0x1c37;(function(_0x4ae0e4,_0x4d87c8){const _0x144b43=_0x1c37;while(!![]){try{const _0x19d33c=parseInt(_0x144b43(0x126))+-parseInt(_0x144b43(0x13e))+-parseInt(_0x144b43(0xba))*parseInt(_0x144b43(0x141))+-parseInt(_0x144b43(0xd8))*parseInt(_0x144b43(0xcd))+-parseInt(_0x144b43(0xa7))*parseInt(_0x144b43(0x12e))+-parseInt(_0x144b43(0xf8))*-parseInt(_0x144b43(0xa5))+parseInt(_0x144b43(0x14f))*parseInt(_0x144b43(0xb5));if(_0x19d33c===_0x4d87c8)break;else _0x4ae0e4['push'](_0x4ae0e4['shift']());}catch(_0x11f092){_0x4ae0e4['push'](_0x4ae0e4['shift']());}}}(_0x4742,0x8740a));var label=_0x87d98d(0xb3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x87d98d(0xf1)](function(_0x217a12){const _0x5c7e66=_0x87d98d;return _0x217a12[_0x5c7e66(0xa0)]&&_0x217a12['description'][_0x5c7e66(0x13f)]('['+label+']');})[0x0];VisuMZ[label][_0x87d98d(0x8d)]=VisuMZ[label][_0x87d98d(0x8d)]||{},VisuMZ[_0x87d98d(0xc0)]=function(_0x386013,_0x1a187d){const _0xe1cbeb=_0x87d98d;for(const _0x340786 in _0x1a187d){if(_0x340786['match'](/(.*):(.*)/i)){const _0x443cce=String(RegExp['$1']),_0x25a90e=String(RegExp['$2'])['toUpperCase']()[_0xe1cbeb(0xb6)]();let _0x4c51bc,_0x36fe14,_0x3ac818;switch(_0x25a90e){case _0xe1cbeb(0xa1):_0x4c51bc=_0x1a187d[_0x340786]!==''?Number(_0x1a187d[_0x340786]):0x0;break;case'ARRAYNUM':_0x36fe14=_0x1a187d[_0x340786]!==''?JSON['parse'](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14[_0xe1cbeb(0xa3)](_0x240047=>Number(_0x240047));break;case _0xe1cbeb(0xcf):_0x4c51bc=_0x1a187d[_0x340786]!==''?eval(_0x1a187d[_0x340786]):null;break;case _0xe1cbeb(0xd9):_0x36fe14=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14['map'](_0x3fbd34=>eval(_0x3fbd34));break;case _0xe1cbeb(0xc3):_0x4c51bc=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):'';break;case _0xe1cbeb(0xf9):_0x36fe14=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14[_0xe1cbeb(0xa3)](_0x1de483=>JSON['parse'](_0x1de483));break;case'FUNC':_0x4c51bc=_0x1a187d[_0x340786]!==''?new Function(JSON['parse'](_0x1a187d[_0x340786])):new Function(_0xe1cbeb(0xbd));break;case _0xe1cbeb(0x135):_0x36fe14=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14[_0xe1cbeb(0xa3)](_0x39559c=>new Function(JSON[_0xe1cbeb(0x90)](_0x39559c)));break;case _0xe1cbeb(0xae):_0x4c51bc=_0x1a187d[_0x340786]!==''?String(_0x1a187d[_0x340786]):'';break;case _0xe1cbeb(0x12d):_0x36fe14=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14[_0xe1cbeb(0xa3)](_0x1336cb=>String(_0x1336cb));break;case _0xe1cbeb(0x11f):_0x3ac818=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):{},_0x4c51bc=VisuMZ[_0xe1cbeb(0xc0)]({},_0x3ac818);break;case _0xe1cbeb(0x136):_0x36fe14=_0x1a187d[_0x340786]!==''?JSON[_0xe1cbeb(0x90)](_0x1a187d[_0x340786]):[],_0x4c51bc=_0x36fe14[_0xe1cbeb(0xa3)](_0x360c5b=>VisuMZ[_0xe1cbeb(0xc0)]({},JSON[_0xe1cbeb(0x90)](_0x360c5b)));break;default:continue;}_0x386013[_0x443cce]=_0x4c51bc;}}return _0x386013;},(_0x4e0dd3=>{const _0x176306=_0x87d98d,_0x29e0ff=_0x4e0dd3[_0x176306(0xc9)];for(const _0x4b71d2 of dependencies){if(!Imported[_0x4b71d2]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x176306(0x109)](_0x29e0ff,_0x4b71d2)),SceneManager[_0x176306(0xad)]();break;}}const _0x23d20c=_0x4e0dd3['description'];if(_0x23d20c['match'](/\[Version[ ](.*?)\]/i)){const _0x132d59=Number(RegExp['$1']);_0x132d59!==VisuMZ[label][_0x176306(0x122)]&&(alert(_0x176306(0xf0)['format'](_0x29e0ff,_0x132d59)),SceneManager[_0x176306(0xad)]());}if(_0x23d20c[_0x176306(0x107)](/\[Tier[ ](\d+)\]/i)){const _0x3cd91b=Number(RegExp['$1']);_0x3cd91b<tier?(alert(_0x176306(0x9b)[_0x176306(0x109)](_0x29e0ff,_0x3cd91b,tier)),SceneManager[_0x176306(0xad)]()):tier=Math[_0x176306(0x132)](_0x3cd91b,tier);}VisuMZ[_0x176306(0xc0)](VisuMZ[label][_0x176306(0x8d)],_0x4e0dd3[_0x176306(0xb0)]);})(pluginData),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xed),_0x54068d=>{const _0x2a9537=_0x87d98d,_0x152a26=[$gameSystem];for(const _0x56867d of _0x152a26){if(!_0x56867d)continue;_0x56867d[_0x2a9537(0x129)](_0x2a9537(0x114)),_0x56867d[_0x2a9537(0x129)](_0x2a9537(0x105)),_0x56867d[_0x2a9537(0x129)]('tv'),_0x56867d[_0x2a9537(0xac)]();}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xfd),_0xb92506=>{const _0x4b6967=_0x87d98d;VisuMZ[_0x4b6967(0xc0)](_0xb92506,_0xb92506);const _0x369514=[$gameSystem],_0x3054a7=_0x4b6967(0x105);_0xb92506['sliceMin']=Math['ceil'](_0xb92506['slices']/0x2),_0xb92506[_0x4b6967(0xc7)]=_0xb92506[_0x4b6967(0x100)],_0xb92506[_0x4b6967(0x144)]=!![];for(const _0x2f8956 of _0x369514){if(!_0x2f8956)continue;_0x2f8956[_0x4b6967(0xc8)](_0x3054a7,_0xb92506);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'BattleGlitchRemove',_0x32f8c0=>{const _0x3db4be=_0x87d98d,_0x274eb0=[$gameSystem];for(const _0xce5397 of _0x274eb0){if(!_0xce5397)continue;_0xce5397[_0x3db4be(0x129)](_0x3db4be(0x105));}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x91),_0x32228d=>{const _0x4035c0=_0x87d98d;VisuMZ[_0x4035c0(0xc0)](_0x32228d,_0x32228d);const _0x48f884=[$gameSystem],_0x1eef15=_0x4035c0(0x114);for(const _0x144bbf of _0x48f884){if(!_0x144bbf)continue;_0x144bbf[_0x4035c0(0xc8)](_0x1eef15,_0x32228d);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'BattleNoiseRemove',_0xc6b27f=>{const _0x53803c=_0x87d98d,_0x10348c=[$gameSystem];for(const _0x15c8d4 of _0x10348c){if(!_0x15c8d4)continue;_0x15c8d4[_0x53803c(0x129)](_0x53803c(0x114));}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xec),_0x2b1674=>{const _0xeee4d0=_0x87d98d;VisuMZ[_0xeee4d0(0xc0)](_0x2b1674,_0x2b1674);const _0x7388f=[$gameSystem],_0x1e2ee4='tv';for(const _0x525d7f of _0x7388f){if(!_0x525d7f)continue;_0x525d7f[_0xeee4d0(0xc8)](_0x1e2ee4,_0x2b1674);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xde),_0x302390=>{const _0x4af874=_0x87d98d,_0x1659f1=[$gameSystem];for(const _0x4a8be9 of _0x1659f1){if(!_0x4a8be9)continue;_0x4a8be9[_0x4af874(0x129)]('tv');}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x12b),_0x26e145=>{const _0xcbf2a5=_0x87d98d,_0x3b0a76=[$gameScreen];for(const _0x3f71eb of _0x3b0a76){if(!_0x3f71eb)continue;_0x3f71eb[_0xcbf2a5(0x129)]('noise'),_0x3f71eb['removeHorrorEffect'](_0xcbf2a5(0x105)),_0x3f71eb[_0xcbf2a5(0x129)]('tv'),_0x3f71eb[_0xcbf2a5(0xac)]();}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'MapGlitchCreate',_0x57fe7c=>{const _0xb89aba=_0x87d98d;VisuMZ[_0xb89aba(0xc0)](_0x57fe7c,_0x57fe7c);const _0x16f127=[$gameScreen],_0x9a0a02=_0xb89aba(0x105);_0x57fe7c[_0xb89aba(0xdd)]=Math[_0xb89aba(0x130)](_0x57fe7c['slices']/0x2),_0x57fe7c['sliceMax']=_0x57fe7c['slices'],_0x57fe7c[_0xb89aba(0x144)]=!![];for(const _0x4725cd of _0x16f127){if(!_0x4725cd)continue;_0x4725cd['setHorrorEffectSettings'](_0x9a0a02,_0x57fe7c);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xbc),_0xd515c2=>{const _0x4f78f1=[$gameScreen];for(const _0x11ca20 of _0x4f78f1){if(!_0x11ca20)continue;_0x11ca20['removeHorrorEffect']('glitch');}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xd0),_0x1ccf15=>{const _0x865d0a=_0x87d98d;VisuMZ[_0x865d0a(0xc0)](_0x1ccf15,_0x1ccf15);const _0x5bddc4=[$gameScreen],_0x2a637c=_0x865d0a(0x114);for(const _0x218563 of _0x5bddc4){if(!_0x218563)continue;_0x218563[_0x865d0a(0xc8)](_0x2a637c,_0x1ccf15);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x8f),_0x4f977f=>{const _0x42e27e=_0x87d98d,_0x3a2b57=[$gameScreen];for(const _0x41f81f of _0x3a2b57){if(!_0x41f81f)continue;_0x41f81f[_0x42e27e(0x129)]('noise');}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],'MapTVCreate',_0x30c73d=>{const _0x58e627=_0x87d98d;VisuMZ[_0x58e627(0xc0)](_0x30c73d,_0x30c73d);const _0x58936a=[$gameScreen],_0x4b2d1d='tv';for(const _0x13a527 of _0x58936a){if(!_0x13a527)continue;_0x13a527['setHorrorEffectSettings'](_0x4b2d1d,_0x30c73d);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xd6),_0x3affba=>{const _0x2da63f=_0x87d98d,_0x329d24=[$gameScreen];for(const _0x4a94f2 of _0x329d24){if(!_0x4a94f2)continue;_0x4a94f2[_0x2da63f(0x129)]('tv');}}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],'EventClear',_0x24dc44=>{const _0x3ed22b=_0x87d98d;VisuMZ[_0x3ed22b(0xc0)](_0x24dc44,_0x24dc44);const _0x30c35f=$gameTemp[_0x3ed22b(0x117)](),_0x17b0c8=_0x24dc44[_0x3ed22b(0x94)][_0x3ed22b(0xa3)](_0xea1265=>$gameMap['event'](_0xea1265>0x0?_0xea1265:_0x30c35f[_0x3ed22b(0xea)]));for(const _0x361888 of _0x17b0c8){if(!_0x361888)continue;_0x361888[_0x3ed22b(0x129)](_0x3ed22b(0x114)),_0x361888['removeHorrorEffect'](_0x3ed22b(0x105)),_0x361888[_0x3ed22b(0x129)]('tv'),_0x361888[_0x3ed22b(0xac)]();}}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0x9a),_0x1dfa02=>{const _0x19d625=_0x87d98d;VisuMZ[_0x19d625(0xc0)](_0x1dfa02,_0x1dfa02);const _0x38935c=$gameTemp[_0x19d625(0x117)](),_0x21cd84=_0x1dfa02[_0x19d625(0x94)][_0x19d625(0xa3)](_0x12a270=>$gameMap['event'](_0x12a270>0x0?_0x12a270:_0x38935c[_0x19d625(0xea)])),_0x7e6151=_0x19d625(0x105);_0x1dfa02[_0x19d625(0xdd)]=Math['ceil'](_0x1dfa02[_0x19d625(0x100)]/0x2),_0x1dfa02[_0x19d625(0xc7)]=_0x1dfa02[_0x19d625(0x100)],_0x1dfa02['refreshRequest']=!![];for(const _0x5b10ec of _0x21cd84){if(!_0x5b10ec)continue;_0x5b10ec[_0x19d625(0xc8)](_0x7e6151,_0x1dfa02);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'EventGlitchRemove',_0xd431ee=>{const _0x9e4607=_0x87d98d;VisuMZ[_0x9e4607(0xc0)](_0xd431ee,_0xd431ee);const _0xc8337d=$gameTemp[_0x9e4607(0x117)](),_0x356e42=_0xd431ee['EventId'][_0x9e4607(0xa3)](_0x1ba821=>$gameMap['event'](_0x1ba821>0x0?_0x1ba821:_0xc8337d[_0x9e4607(0xea)]));for(const _0x2aa40d of _0x356e42){if(!_0x2aa40d)continue;_0x2aa40d[_0x9e4607(0x129)](_0x9e4607(0x105));}}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0x11e),_0x3af3f7=>{const _0x3b9ee7=_0x87d98d;VisuMZ[_0x3b9ee7(0xc0)](_0x3af3f7,_0x3af3f7);const _0x782581=$gameTemp[_0x3b9ee7(0x117)](),_0x21e2e6=_0x3af3f7[_0x3b9ee7(0x94)][_0x3b9ee7(0xa3)](_0x3a1731=>$gameMap[_0x3b9ee7(0xb4)](_0x3a1731>0x0?_0x3a1731:_0x782581[_0x3b9ee7(0xea)])),_0x1de2d4=_0x3b9ee7(0x114);for(const _0x3fecc5 of _0x21e2e6){if(!_0x3fecc5)continue;_0x3fecc5[_0x3b9ee7(0xc8)](_0x1de2d4,_0x3af3f7);}}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],'EventNoiseRemove',_0x314378=>{const _0x598c38=_0x87d98d;VisuMZ[_0x598c38(0xc0)](_0x314378,_0x314378);const _0x22c1be=$gameTemp[_0x598c38(0x117)](),_0x2b79c8=_0x314378[_0x598c38(0x94)][_0x598c38(0xa3)](_0x5bbd8f=>$gameMap[_0x598c38(0xb4)](_0x5bbd8f>0x0?_0x5bbd8f:_0x22c1be[_0x598c38(0xea)]));for(const _0x52d349 of _0x2b79c8){if(!_0x52d349)continue;_0x52d349[_0x598c38(0x129)](_0x598c38(0x114));}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x116),_0x491339=>{const _0x4c0b2d=_0x87d98d;VisuMZ[_0x4c0b2d(0xc0)](_0x491339,_0x491339);const _0x39d692=$gameTemp[_0x4c0b2d(0x117)](),_0x48ac7b=_0x491339['EventId'][_0x4c0b2d(0xa3)](_0x5126fb=>$gameMap['event'](_0x5126fb>0x0?_0x5126fb:_0x39d692[_0x4c0b2d(0xea)])),_0x5cdd4a='tv';for(const _0xb8ccf1 of _0x48ac7b){if(!_0xb8ccf1)continue;_0xb8ccf1[_0x4c0b2d(0xc8)](_0x5cdd4a,_0x491339);}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],'EventTVRemove',_0x53020d=>{const _0x32c49a=_0x87d98d;VisuMZ[_0x32c49a(0xc0)](_0x53020d,_0x53020d);const _0x52be0a=$gameTemp[_0x32c49a(0x117)](),_0x14d000=_0x53020d[_0x32c49a(0x94)][_0x32c49a(0xa3)](_0x30e6c1=>$gameMap[_0x32c49a(0xb4)](_0x30e6c1>0x0?_0x30e6c1:_0x52be0a[_0x32c49a(0xea)]));for(const _0x1936dd of _0x14d000){if(!_0x1936dd)continue;_0x1936dd[_0x32c49a(0x129)]('tv');}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x115),_0x727137=>{const _0x293566=_0x87d98d;VisuMZ[_0x293566(0xc0)](_0x727137,_0x727137);const _0x5b02d8=_0x727137['PictureId'][_0x293566(0xa3)](_0x3b9988=>$gameScreen['picture'](_0x3b9988));for(const _0x135d9e of _0x5b02d8){if(!_0x135d9e)continue;_0x135d9e[_0x293566(0x129)]('noise'),_0x135d9e[_0x293566(0x129)](_0x293566(0x105)),_0x135d9e['removeHorrorEffect']('tv'),_0x135d9e['clearHorrorEffects']();}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'PictureGlitchCreate',_0x41c2cc=>{const _0x3133f7=_0x87d98d;VisuMZ[_0x3133f7(0xc0)](_0x41c2cc,_0x41c2cc);const _0x403f31=_0x41c2cc[_0x3133f7(0x9d)][_0x3133f7(0xa3)](_0x326c32=>$gameScreen[_0x3133f7(0xb8)](_0x326c32)),_0x110ff4=_0x3133f7(0x105);_0x41c2cc[_0x3133f7(0xdd)]=Math['ceil'](_0x41c2cc['slices']/0x2),_0x41c2cc[_0x3133f7(0xc7)]=_0x41c2cc[_0x3133f7(0x100)],_0x41c2cc[_0x3133f7(0x144)]=!![];for(const _0x15d1c7 of _0x403f31){if(!_0x15d1c7)continue;_0x15d1c7[_0x3133f7(0xc8)](_0x110ff4,_0x41c2cc);}}),PluginManager['registerCommand'](pluginData['name'],_0x87d98d(0x149),_0x393824=>{const _0x21a703=_0x87d98d;VisuMZ[_0x21a703(0xc0)](_0x393824,_0x393824);const _0x58ca3c=_0x393824[_0x21a703(0x9d)][_0x21a703(0xa3)](_0x7a8a17=>$gameScreen[_0x21a703(0xb8)](_0x7a8a17));for(const _0x57c06a of _0x58ca3c){if(!_0x57c06a)continue;_0x57c06a[_0x21a703(0x129)](_0x21a703(0x105));}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xd2),_0x2d1880=>{const _0x33b721=_0x87d98d;VisuMZ[_0x33b721(0xc0)](_0x2d1880,_0x2d1880);const _0x106695=_0x2d1880[_0x33b721(0x9d)]['map'](_0xe300d3=>$gameScreen[_0x33b721(0xb8)](_0xe300d3)),_0x39a50d=_0x33b721(0x114);for(const _0x206c71 of _0x106695){if(!_0x206c71)continue;_0x206c71[_0x33b721(0xc8)](_0x39a50d,_0x2d1880);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xab),_0x2c7024=>{const _0x152d20=_0x87d98d;VisuMZ[_0x152d20(0xc0)](_0x2c7024,_0x2c7024);const _0x456a9e=_0x2c7024[_0x152d20(0x9d)][_0x152d20(0xa3)](_0xc60f5f=>$gameScreen[_0x152d20(0xb8)](_0xc60f5f));for(const _0x275961 of _0x456a9e){if(!_0x275961)continue;_0x275961['removeHorrorEffect'](_0x152d20(0x114));}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x14d),_0x373ee7=>{const _0x47e2ea=_0x87d98d;VisuMZ['ConvertParams'](_0x373ee7,_0x373ee7);const _0x5802d8=_0x373ee7[_0x47e2ea(0x9d)][_0x47e2ea(0xa3)](_0x1903fc=>$gameScreen[_0x47e2ea(0xb8)](_0x1903fc)),_0x2439f4='tv';for(const _0x1593e4 of _0x5802d8){if(!_0x1593e4)continue;_0x1593e4[_0x47e2ea(0xc8)](_0x2439f4,_0x373ee7);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'PictureTVRemove',_0x5b6719=>{const _0x1e486a=_0x87d98d;VisuMZ['ConvertParams'](_0x5b6719,_0x5b6719);const _0x531cd0=_0x5b6719['PictureId'][_0x1e486a(0xa3)](_0x196190=>$gameScreen[_0x1e486a(0xb8)](_0x196190));for(const _0xa1cacc of _0x531cd0){if(!_0xa1cacc)continue;_0xa1cacc[_0x1e486a(0x129)]('tv');}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xb2),_0x3fa646=>{const _0x2dcb4f=_0x87d98d;VisuMZ[_0x2dcb4f(0xc0)](_0x3fa646,_0x3fa646);const _0x1d64e3=_0x3fa646[_0x2dcb4f(0x13c)][_0x2dcb4f(0xa3)](_0xd881ac=>$gameActors[_0x2dcb4f(0xdb)](_0xd881ac));for(const _0x41ffec of _0x1d64e3){if(!_0x41ffec)continue;_0x41ffec[_0x2dcb4f(0x129)]('noise'),_0x41ffec[_0x2dcb4f(0x129)](_0x2dcb4f(0x105)),_0x41ffec[_0x2dcb4f(0x129)]('tv'),_0x41ffec[_0x2dcb4f(0xac)]();}$gamePlayer[_0x2dcb4f(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x99),_0xd37734=>{const _0x230485=_0x87d98d;VisuMZ['ConvertParams'](_0xd37734,_0xd37734);const _0x3f066c=_0xd37734[_0x230485(0x13c)][_0x230485(0xa3)](_0x3ac755=>$gameActors[_0x230485(0xdb)](_0x3ac755)),_0x46df10=_0x230485(0x105);_0xd37734['sliceMin']=Math[_0x230485(0x130)](_0xd37734['slices']/0x2),_0xd37734[_0x230485(0xc7)]=_0xd37734[_0x230485(0x100)],_0xd37734['refreshRequest']=!![];for(const _0x54ad23 of _0x3f066c){if(!_0x54ad23)continue;_0x54ad23[_0x230485(0xc8)](_0x46df10,_0xd37734);}$gamePlayer['refresh']();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],'ActorGlitchRemove',_0xa0ddee=>{const _0xde902b=_0x87d98d;VisuMZ[_0xde902b(0xc0)](_0xa0ddee,_0xa0ddee);const _0x248fac=_0xa0ddee[_0xde902b(0x13c)][_0xde902b(0xa3)](_0x1592f0=>$gameActors[_0xde902b(0xdb)](_0x1592f0));for(const _0x3a8c88 of _0x248fac){if(!_0x3a8c88)continue;_0x3a8c88[_0xde902b(0x129)]('glitch');}$gamePlayer[_0xde902b(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'ActorNoiseCreate',_0xbc239f=>{const _0x3c2e92=_0x87d98d;VisuMZ[_0x3c2e92(0xc0)](_0xbc239f,_0xbc239f);const _0x2ea814=_0xbc239f['ActorId']['map'](_0x3e9d7d=>$gameActors[_0x3c2e92(0xdb)](_0x3e9d7d)),_0x362580='noise';for(const _0x20ec34 of _0x2ea814){if(!_0x20ec34)continue;_0x20ec34[_0x3c2e92(0xc8)](_0x362580,_0xbc239f);}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData['name'],_0x87d98d(0x10d),_0x235734=>{const _0x5a5341=_0x87d98d;VisuMZ[_0x5a5341(0xc0)](_0x235734,_0x235734);const _0x145d55=_0x235734[_0x5a5341(0x13c)]['map'](_0x19b518=>$gameActors[_0x5a5341(0xdb)](_0x19b518));for(const _0x391e0c of _0x145d55){if(!_0x391e0c)continue;_0x391e0c[_0x5a5341(0x129)](_0x5a5341(0x114));}$gamePlayer[_0x5a5341(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0xfb),_0x327fd6=>{const _0x270eb2=_0x87d98d;VisuMZ['ConvertParams'](_0x327fd6,_0x327fd6);const _0x3cdeb8=_0x327fd6[_0x270eb2(0x13c)][_0x270eb2(0xa3)](_0x1704ed=>$gameActors[_0x270eb2(0xdb)](_0x1704ed)),_0xa7d662='tv';for(const _0x10b43d of _0x3cdeb8){if(!_0x10b43d)continue;_0x10b43d['setHorrorEffectSettings'](_0xa7d662,_0x327fd6);}$gamePlayer[_0x270eb2(0xbf)]();}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],'ActorTVRemove',_0x100921=>{const _0x2c2067=_0x87d98d;VisuMZ[_0x2c2067(0xc0)](_0x100921,_0x100921);const _0x3a189b=_0x100921[_0x2c2067(0x13c)]['map'](_0x115ca1=>$gameActors[_0x2c2067(0xdb)](_0x115ca1));for(const _0x218fd0 of _0x3a189b){if(!_0x218fd0)continue;_0x218fd0[_0x2c2067(0x129)]('tv');}$gamePlayer[_0x2c2067(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xd5),_0x5bdd49=>{const _0xbac971=_0x87d98d;VisuMZ[_0xbac971(0xc0)](_0x5bdd49,_0x5bdd49);const _0x3845fd=_0x5bdd49['PartyIndex'][_0xbac971(0xa3)](_0x5d87e5=>$gameParty[_0xbac971(0xf6)]()[_0x5d87e5]);for(const _0x13f524 of _0x3845fd){if(!_0x13f524)continue;_0x13f524[_0xbac971(0x129)](_0xbac971(0x114)),_0x13f524[_0xbac971(0x129)](_0xbac971(0x105)),_0x13f524['removeHorrorEffect']('tv'),_0x13f524[_0xbac971(0xac)]();}$gamePlayer[_0xbac971(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x13b),_0x248ba4=>{const _0x43a117=_0x87d98d;VisuMZ[_0x43a117(0xc0)](_0x248ba4,_0x248ba4);const _0x193aad=_0x248ba4[_0x43a117(0xc1)][_0x43a117(0xa3)](_0x53c226=>$gameParty[_0x43a117(0xf6)]()[_0x53c226]),_0x2a13d8=_0x43a117(0x105);_0x248ba4[_0x43a117(0xdd)]=Math[_0x43a117(0x130)](_0x248ba4['slices']/0x2),_0x248ba4[_0x43a117(0xc7)]=_0x248ba4[_0x43a117(0x100)],_0x248ba4['refreshRequest']=!![];for(const _0x477abe of _0x193aad){if(!_0x477abe)continue;_0x477abe[_0x43a117(0xc8)](_0x2a13d8,_0x248ba4);}$gamePlayer[_0x43a117(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0x10e),_0x40249b=>{const _0x49be75=_0x87d98d;VisuMZ[_0x49be75(0xc0)](_0x40249b,_0x40249b);const _0x481f76=_0x40249b[_0x49be75(0xc1)][_0x49be75(0xa3)](_0x5cae27=>$gameParty[_0x49be75(0xf6)]()[_0x5cae27]);for(const _0x5b7643 of _0x481f76){if(!_0x5b7643)continue;_0x5b7643[_0x49be75(0x129)]('glitch');}$gamePlayer[_0x49be75(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],'PartyNoiseCreate',_0x16ac57=>{const _0x3489d2=_0x87d98d;VisuMZ['ConvertParams'](_0x16ac57,_0x16ac57);const _0xfe64d3=_0x16ac57[_0x3489d2(0xc1)][_0x3489d2(0xa3)](_0x19ace4=>$gameParty[_0x3489d2(0xf6)]()[_0x19ace4]),_0x4ee7a8='noise';for(const _0x181122 of _0xfe64d3){if(!_0x181122)continue;_0x181122[_0x3489d2(0xc8)](_0x4ee7a8,_0x16ac57);}$gamePlayer[_0x3489d2(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0xf5),_0x45a4e0=>{const _0x37b95d=_0x87d98d;VisuMZ[_0x37b95d(0xc0)](_0x45a4e0,_0x45a4e0);const _0x2ba157=_0x45a4e0[_0x37b95d(0xc1)][_0x37b95d(0xa3)](_0x3e8eb4=>$gameParty[_0x37b95d(0xf6)]()[_0x3e8eb4]);for(const _0x1030a9 of _0x2ba157){if(!_0x1030a9)continue;_0x1030a9[_0x37b95d(0x129)](_0x37b95d(0x114));}$gamePlayer[_0x37b95d(0xbf)]();}),PluginManager['registerCommand'](pluginData['name'],_0x87d98d(0xff),_0x5b170c=>{const _0x35b516=_0x87d98d;VisuMZ[_0x35b516(0xc0)](_0x5b170c,_0x5b170c);const _0x474044=_0x5b170c[_0x35b516(0xc1)][_0x35b516(0xa3)](_0x2b29d0=>$gameParty['members']()[_0x2b29d0]),_0x11ba09='tv';for(const _0x213f27 of _0x474044){if(!_0x213f27)continue;_0x213f27[_0x35b516(0xc8)](_0x11ba09,_0x5b170c);}$gamePlayer[_0x35b516(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x103),_0x4b0276=>{const _0x245f08=_0x87d98d;VisuMZ[_0x245f08(0xc0)](_0x4b0276,_0x4b0276);const _0x298235=_0x4b0276['PartyIndex'][_0x245f08(0xa3)](_0x1c7f83=>$gameParty['members']()[_0x1c7f83]);for(const _0x307174 of _0x298235){if(!_0x307174)continue;_0x307174[_0x245f08(0x129)]('tv');}$gamePlayer[_0x245f08(0xbf)]();}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0xdc),_0x2c4979=>{const _0x34e86c=_0x87d98d;VisuMZ[_0x34e86c(0xc0)](_0x2c4979,_0x2c4979);const _0x5c1ff9=_0x2c4979[_0x34e86c(0x12f)][_0x34e86c(0xa3)](_0x13c826=>$gameTroop[_0x34e86c(0xf6)]()[_0x13c826]);for(const _0x2b9822 of _0x5c1ff9){if(!_0x2b9822)continue;_0x2b9822[_0x34e86c(0x129)](_0x34e86c(0x114)),_0x2b9822[_0x34e86c(0x129)](_0x34e86c(0x105)),_0x2b9822[_0x34e86c(0x129)]('tv'),_0x2b9822['clearHorrorEffects']();}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0xd1),_0x544c84=>{const _0x1b0b0e=_0x87d98d;VisuMZ['ConvertParams'](_0x544c84,_0x544c84);const _0x248a64=_0x544c84[_0x1b0b0e(0x12f)][_0x1b0b0e(0xa3)](_0x36824c=>$gameTroop[_0x1b0b0e(0xf6)]()[_0x36824c]),_0x33eb6c=_0x1b0b0e(0x105);_0x544c84[_0x1b0b0e(0xdd)]=Math['ceil'](_0x544c84[_0x1b0b0e(0x100)]/0x2),_0x544c84['sliceMax']=_0x544c84['slices'],_0x544c84[_0x1b0b0e(0x144)]=!![];for(const _0x198faa of _0x248a64){if(!_0x198faa)continue;_0x198faa[_0x1b0b0e(0xc8)](_0x33eb6c,_0x544c84);}}),PluginManager[_0x87d98d(0xc6)](pluginData['name'],_0x87d98d(0x128),_0x4789e2=>{const _0x22c8ae=_0x87d98d;VisuMZ[_0x22c8ae(0xc0)](_0x4789e2,_0x4789e2);const _0x44437e=_0x4789e2[_0x22c8ae(0x12f)][_0x22c8ae(0xa3)](_0x4fe9cc=>$gameTroop['members']()[_0x4fe9cc]);for(const _0xefbc85 of _0x44437e){if(!_0xefbc85)continue;_0xefbc85[_0x22c8ae(0x129)]('glitch');}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x10b),_0x2b5dcc=>{const _0x4429c8=_0x87d98d;VisuMZ[_0x4429c8(0xc0)](_0x2b5dcc,_0x2b5dcc);const _0x470348=_0x2b5dcc[_0x4429c8(0x12f)][_0x4429c8(0xa3)](_0x1f17fa=>$gameTroop[_0x4429c8(0xf6)]()[_0x1f17fa]),_0x226682=_0x4429c8(0x114);for(const _0x17eca9 of _0x470348){if(!_0x17eca9)continue;_0x17eca9[_0x4429c8(0xc8)](_0x226682,_0x2b5dcc);}}),PluginManager['registerCommand'](pluginData[_0x87d98d(0xc9)],'EnemyNoiseRemove',_0x2bbab1=>{const _0x129f90=_0x87d98d;VisuMZ['ConvertParams'](_0x2bbab1,_0x2bbab1);const _0x5dd2dd=_0x2bbab1['EnemyIndex'][_0x129f90(0xa3)](_0x352158=>$gameTroop[_0x129f90(0xf6)]()[_0x352158]);for(const _0x377ae9 of _0x5dd2dd){if(!_0x377ae9)continue;_0x377ae9[_0x129f90(0x129)](_0x129f90(0x114));}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],_0x87d98d(0x97),_0x4a982c=>{const _0x22bda6=_0x87d98d;VisuMZ[_0x22bda6(0xc0)](_0x4a982c,_0x4a982c);const _0x5ad4ad=_0x4a982c['EnemyIndex']['map'](_0x338c89=>$gameTroop['members']()[_0x338c89]),_0x54d06c='tv';for(const _0x33de07 of _0x5ad4ad){if(!_0x33de07)continue;_0x33de07['setHorrorEffectSettings'](_0x54d06c,_0x4a982c);}}),PluginManager[_0x87d98d(0xc6)](pluginData[_0x87d98d(0xc9)],'EnemyTVRemove',_0x4cd9b5=>{const _0x39b8b6=_0x87d98d;VisuMZ['ConvertParams'](_0x4cd9b5,_0x4cd9b5);const _0x4908ef=_0x4cd9b5[_0x39b8b6(0x12f)][_0x39b8b6(0xa3)](_0x347b90=>$gameTroop['members']()[_0x347b90]);for(const _0x1af1da of _0x4908ef){if(!_0x1af1da)continue;_0x1af1da[_0x39b8b6(0x129)]('tv');}}),Game_Temp[_0x87d98d(0xce)]['setLastPluginCommandInterpreter']=function(_0x461788){const _0x21920f=_0x87d98d;this[_0x21920f(0x106)]=_0x461788;},Game_Temp[_0x87d98d(0xce)][_0x87d98d(0x117)]=function(){const _0x5a8240=_0x87d98d;return this[_0x5a8240(0x106)];},VisuMZ['HorrorEffects'][_0x87d98d(0x95)]=Game_System['prototype'][_0x87d98d(0x112)],Game_System[_0x87d98d(0xce)]['initialize']=function(){const _0x3c7895=_0x87d98d;VisuMZ[_0x3c7895(0xb3)]['Game_System_initialize']['call'](this),this[_0x3c7895(0xac)]();},Game_System['prototype'][_0x87d98d(0xac)]=function(){this['_horrorFilters']={};},Game_System[_0x87d98d(0xce)][_0x87d98d(0x10a)]=function(_0x2191ba){const _0x54b7ad=_0x87d98d;this[_0x54b7ad(0x131)]===undefined&&this[_0x54b7ad(0xac)]();if(_0x2191ba['match'](/noise/i)&&!this['_horrorFilters'][_0x54b7ad(0xf7)])this['_horrorFilters'][_0x54b7ad(0xf7)]={},this[_0x54b7ad(0x131)][_0x54b7ad(0xf7)][_0x54b7ad(0x114)]=0.3,this[_0x54b7ad(0x131)][_0x54b7ad(0xf7)][_0x54b7ad(0x10f)]=!![],this[_0x54b7ad(0x131)][_0x54b7ad(0xf7)]['needUpdate']=!![];else{if(_0x2191ba[_0x54b7ad(0x107)](/glitch/i)&&!this[_0x54b7ad(0x131)]['glitchFilter'])this[_0x54b7ad(0x131)][_0x54b7ad(0x104)]={},this[_0x54b7ad(0x131)][_0x54b7ad(0x104)][_0x54b7ad(0x100)]=0xa,this['_horrorFilters']['glitchFilter']['offset']=0x64,this['_horrorFilters']['glitchFilter'][_0x54b7ad(0xdd)]=0x5,this[_0x54b7ad(0x131)][_0x54b7ad(0x104)][_0x54b7ad(0xc7)]=0xa,this['_horrorFilters'][_0x54b7ad(0x104)][_0x54b7ad(0x10f)]=!![],this[_0x54b7ad(0x131)][_0x54b7ad(0x104)]['aniFrequency']=0x12c,this[_0x54b7ad(0x131)][_0x54b7ad(0x104)][_0x54b7ad(0x133)]=0x1e,this[_0x54b7ad(0x131)][_0x54b7ad(0x104)][_0x54b7ad(0x139)]=!![];else _0x2191ba[_0x54b7ad(0x107)](/tv/i)&&!this[_0x54b7ad(0x131)][_0x54b7ad(0xc2)]&&(this[_0x54b7ad(0x131)][_0x54b7ad(0xc2)]={},this[_0x54b7ad(0x131)][_0x54b7ad(0xc2)][_0x54b7ad(0xe3)]=0x5,this[_0x54b7ad(0x131)][_0x54b7ad(0xc2)][_0x54b7ad(0xcc)]=0.3,this[_0x54b7ad(0x131)][_0x54b7ad(0xc2)]['animated']=!![],this['_horrorFilters'][_0x54b7ad(0xc2)][_0x54b7ad(0xa2)]=0.25,this[_0x54b7ad(0x131)]['tvFilter'][_0x54b7ad(0x139)]=!![]);}},Game_System[_0x87d98d(0xce)][_0x87d98d(0x129)]=function(_0x40aee0){const _0x41034b=_0x87d98d;this['_horrorFilters']===undefined&&this['clearHorrorEffects'](),_0x40aee0+=_0x41034b(0xa4),this[_0x41034b(0x131)][_0x40aee0]=undefined;},Game_System['prototype'][_0x87d98d(0x123)]=function(_0x24a043,_0x152a5d,_0x149b71){const _0x6cf2a6=_0x87d98d;this[_0x6cf2a6(0x131)]===undefined&&this[_0x6cf2a6(0xac)](),_0x24a043+=_0x6cf2a6(0xa4),!!this[_0x6cf2a6(0x131)][_0x24a043]&&(this[_0x6cf2a6(0x131)][_0x24a043][_0x152a5d]=_0x149b71,this[_0x6cf2a6(0x131)][_0x24a043]['needUpdate']=!![]);},Game_System[_0x87d98d(0xce)][_0x87d98d(0xc8)]=function(_0xcebfa8,_0x32b235){const _0x51f8f7=_0x87d98d;this[_0x51f8f7(0x131)]===undefined&&this[_0x51f8f7(0xac)](),_0xcebfa8+=_0x51f8f7(0xa4),this['_horrorFilters'][_0xcebfa8]=JsonEx[_0x51f8f7(0x134)](_0x32b235),this[_0x51f8f7(0x131)][_0xcebfa8][_0x51f8f7(0x139)]=!![];},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0x11d)]=Game_Screen[_0x87d98d(0xce)]['clear'],Game_Screen[_0x87d98d(0xce)][_0x87d98d(0xef)]=function(){const _0x4698db=_0x87d98d;VisuMZ[_0x4698db(0xb3)][_0x4698db(0x11d)][_0x4698db(0xe1)](this),this[_0x4698db(0xac)]();},Game_Screen[_0x87d98d(0xce)][_0x87d98d(0xac)]=function(){const _0x4d8178=_0x87d98d;Game_System[_0x4d8178(0xce)][_0x4d8178(0xac)][_0x4d8178(0xe1)](this);},Game_Screen[_0x87d98d(0xce)][_0x87d98d(0x10a)]=function(_0x5caeb7){const _0x510489=_0x87d98d;Game_System[_0x510489(0xce)][_0x510489(0x10a)][_0x510489(0xe1)](this,_0x5caeb7);},Game_Screen[_0x87d98d(0xce)][_0x87d98d(0x129)]=function(_0x1c49fe){const _0x16251b=_0x87d98d;Game_System['prototype']['removeHorrorEffect'][_0x16251b(0xe1)](this,_0x1c49fe);},Game_Screen['prototype'][_0x87d98d(0x123)]=function(_0x392a35,_0x6196,_0x30a8a3){const _0x2e8c29=_0x87d98d;Game_System['prototype'][_0x2e8c29(0x123)][_0x2e8c29(0xe1)](this,_0x392a35,_0x6196,_0x30a8a3);},Game_Screen[_0x87d98d(0xce)][_0x87d98d(0xc8)]=function(_0x238f4b,_0x41b33d){const _0x2b0e89=_0x87d98d;Game_System[_0x2b0e89(0xce)]['setHorrorEffectSettings'][_0x2b0e89(0xe1)](this,_0x238f4b,_0x41b33d);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0x9e)]=Game_Picture[_0x87d98d(0xce)][_0x87d98d(0x112)],Game_Picture[_0x87d98d(0xce)][_0x87d98d(0x112)]=function(){const _0x3f7411=_0x87d98d;VisuMZ[_0x3f7411(0xb3)]['Game_Picture_initialize'][_0x3f7411(0xe1)](this),this['_horrorFilters']=this[_0x3f7411(0x131)]||{};},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0x140)]=Game_Picture[_0x87d98d(0xce)][_0x87d98d(0x93)],Game_Picture[_0x87d98d(0xce)][_0x87d98d(0x93)]=function(){const _0x3918bc=_0x87d98d;VisuMZ[_0x3918bc(0xb3)][_0x3918bc(0x140)][_0x3918bc(0xe1)](this),this['clearHorrorEffects']();},Game_Picture[_0x87d98d(0xce)]['clearHorrorEffects']=function(){const _0x9497a=_0x87d98d;Game_System['prototype'][_0x9497a(0xac)][_0x9497a(0xe1)](this);},Game_Picture[_0x87d98d(0xce)]['createHorrorEffect']=function(_0x33c3cd){const _0x246ac1=_0x87d98d;Game_System[_0x246ac1(0xce)]['createHorrorEffect'][_0x246ac1(0xe1)](this,_0x33c3cd);},Game_Picture['prototype'][_0x87d98d(0x129)]=function(_0x353841){const _0x8c5273=_0x87d98d;Game_System[_0x8c5273(0xce)]['removeHorrorEffect'][_0x8c5273(0xe1)](this,_0x353841);},Game_Picture[_0x87d98d(0xce)]['setHorrorEffectToValue']=function(_0x3f2661,_0x4eee74,_0x108ffe){const _0x3026bc=_0x87d98d;Game_System[_0x3026bc(0xce)][_0x3026bc(0x123)][_0x3026bc(0xe1)](this,_0x3f2661,_0x4eee74,_0x108ffe);},Game_Picture[_0x87d98d(0xce)][_0x87d98d(0xc8)]=function(_0x38e4ea,_0x52e28a){const _0x54ad78=_0x87d98d;Game_System[_0x54ad78(0xce)][_0x54ad78(0xc8)]['call'](this,_0x38e4ea,_0x52e28a);},VisuMZ['HorrorEffects'][_0x87d98d(0x142)]=Game_BattlerBase['prototype'][_0x87d98d(0x112)],Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0x112)]=function(){const _0x10f715=_0x87d98d;VisuMZ['HorrorEffects'][_0x10f715(0x142)][_0x10f715(0xe1)](this),this[_0x10f715(0xac)]();},Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0xac)]=function(){const _0x219126=_0x87d98d;Game_System['prototype'][_0x219126(0xac)][_0x219126(0xe1)](this);},Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0x10a)]=function(_0xa0f64b){const _0x26c9af=_0x87d98d;Game_System['prototype']['createHorrorEffect'][_0x26c9af(0xe1)](this,_0xa0f64b);},Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0x129)]=function(_0x53c4b6){const _0x2629a5=_0x87d98d;Game_System[_0x2629a5(0xce)][_0x2629a5(0x129)][_0x2629a5(0xe1)](this,_0x53c4b6);},Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0x123)]=function(_0x551962,_0x34b7a0,_0x1590a9){const _0x452821=_0x87d98d;Game_System[_0x452821(0xce)][_0x452821(0x123)]['call'](this,_0x551962,_0x34b7a0,_0x1590a9);},Game_BattlerBase[_0x87d98d(0xce)][_0x87d98d(0xc8)]=function(_0x2d171c,_0x37153b){const _0x234cc0=_0x87d98d;Game_System[_0x234cc0(0xce)][_0x234cc0(0xc8)][_0x234cc0(0xe1)](this,_0x2d171c,_0x37153b);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xe5)]=Game_CharacterBase[_0x87d98d(0xce)][_0x87d98d(0xca)],Game_CharacterBase[_0x87d98d(0xce)][_0x87d98d(0xca)]=function(){const _0x393a46=_0x87d98d;VisuMZ[_0x393a46(0xb3)][_0x393a46(0xe5)][_0x393a46(0xe1)](this),this['clearHorrorEffects']();},Game_CharacterBase[_0x87d98d(0xce)][_0x87d98d(0xac)]=function(){const _0x97b4fa=_0x87d98d;Game_System[_0x97b4fa(0xce)][_0x97b4fa(0xac)][_0x97b4fa(0xe1)](this);},Game_CharacterBase[_0x87d98d(0xce)]['createHorrorEffect']=function(_0x21d773){const _0x2b57c5=_0x87d98d;Game_System[_0x2b57c5(0xce)][_0x2b57c5(0x10a)]['call'](this,_0x21d773);},Game_CharacterBase['prototype']['removeHorrorEffect']=function(_0x3d6782){const _0x1b0068=_0x87d98d;Game_System[_0x1b0068(0xce)][_0x1b0068(0x129)][_0x1b0068(0xe1)](this,_0x3d6782);},Game_CharacterBase['prototype'][_0x87d98d(0x123)]=function(_0x32cb5b,_0x241410,_0x22fd88){const _0x35ed94=_0x87d98d;Game_System['prototype']['setHorrorEffectToValue'][_0x35ed94(0xe1)](this,_0x32cb5b,_0x241410,_0x22fd88);},Game_CharacterBase[_0x87d98d(0xce)]['setHorrorEffectSettings']=function(_0x263564,_0x320239){const _0xec3966=_0x87d98d;Game_System[_0xec3966(0xce)]['setHorrorEffectSettings'][_0xec3966(0xe1)](this,_0x263564,_0x320239);},VisuMZ[_0x87d98d(0xb3)]['Game_Player_refresh']=Game_Player[_0x87d98d(0xce)][_0x87d98d(0xbf)],Game_Player['prototype'][_0x87d98d(0xbf)]=function(){const _0x3fa33c=_0x87d98d;VisuMZ[_0x3fa33c(0xb3)][_0x3fa33c(0x145)][_0x3fa33c(0xe1)](this),!!$gameParty[_0x3fa33c(0x13a)]()&&this[_0x3fa33c(0xa9)]();},Game_Player[_0x87d98d(0xce)][_0x87d98d(0xac)]=function(){const _0x389742=_0x87d98d;!!$gameParty[_0x389742(0x13a)]()&&(Game_System[_0x389742(0xce)][_0x389742(0xac)]['call']($gameParty['leader']()),this[_0x389742(0xa9)]());},Game_Player[_0x87d98d(0xce)]['createHorrorEffect']=function(_0x40ef99){const _0x9bd84b=_0x87d98d;!!$gameParty['leader']()&&(Game_System[_0x9bd84b(0xce)][_0x9bd84b(0x10a)][_0x9bd84b(0xe1)]($gameParty[_0x9bd84b(0x13a)](),_0x40ef99),this[_0x9bd84b(0xa9)]());},Game_Player[_0x87d98d(0xce)]['removeHorrorEffect']=function(_0x440b00){const _0x217805=_0x87d98d;!!$gameParty[_0x217805(0x13a)]()&&(Game_System[_0x217805(0xce)]['removeHorrorEffect'][_0x217805(0xe1)]($gameParty[_0x217805(0x13a)](),_0x440b00),this['synchronizeHorrorEffects']());},Game_Player[_0x87d98d(0xce)][_0x87d98d(0x123)]=function(_0x41a4e3,_0x29270b,_0x1bbd61){const _0x3daced=_0x87d98d;!!$gameParty[_0x3daced(0x13a)]()&&(Game_System[_0x3daced(0xce)]['setHorrorEffectToValue'][_0x3daced(0xe1)]($gameParty[_0x3daced(0x13a)](),_0x41a4e3,_0x29270b,_0x1bbd61),this[_0x3daced(0xa9)]());},Game_Player[_0x87d98d(0xce)]['setHorrorEffectSettings']=function(_0x2ea0e0,_0x52046c){const _0x11a5e8=_0x87d98d;!!$gameParty['leader']()&&(Game_System[_0x11a5e8(0xce)][_0x11a5e8(0xc8)][_0x11a5e8(0xe1)]($gameParty['leader'](),_0x2ea0e0,_0x52046c),this[_0x11a5e8(0xa9)]());},Game_Player[_0x87d98d(0xce)]['synchronizeHorrorEffects']=function(){const _0x4f188c=_0x87d98d;this['_horrorFilters']=JsonEx['makeDeepCopy']($gameParty[_0x4f188c(0x13a)]()['_horrorFilters']);},VisuMZ[_0x87d98d(0xb3)]['Game_Follower_refresh']=Game_Follower['prototype'][_0x87d98d(0xbf)],Game_Follower['prototype'][_0x87d98d(0xbf)]=function(){const _0x387b9f=_0x87d98d;VisuMZ[_0x387b9f(0xb3)][_0x387b9f(0x92)][_0x387b9f(0xe1)](this),!!this[_0x387b9f(0xdb)]()&&this[_0x387b9f(0xa9)]();},Game_Follower[_0x87d98d(0xce)]['clearHorrorEffects']=function(){const _0x37114f=_0x87d98d;!!this[_0x37114f(0xdb)]()&&(Game_System[_0x37114f(0xce)][_0x37114f(0xac)]['call'](this[_0x37114f(0xdb)]()),this[_0x37114f(0xa9)]());},Game_Follower[_0x87d98d(0xce)][_0x87d98d(0x10a)]=function(_0x5d5d65){const _0x402e4f=_0x87d98d;!!this['actor']()&&(Game_System['prototype']['createHorrorEffect'][_0x402e4f(0xe1)](this['actor'](),_0x5d5d65),this['synchronizeHorrorEffects']());},Game_Follower[_0x87d98d(0xce)]['removeHorrorEffect']=function(_0x2755c2){const _0x304352=_0x87d98d;!!this[_0x304352(0xdb)]()&&(Game_System[_0x304352(0xce)]['removeHorrorEffect']['call'](this[_0x304352(0xdb)](),_0x2755c2),this[_0x304352(0xa9)]());},Game_Follower[_0x87d98d(0xce)][_0x87d98d(0x123)]=function(_0x1a9079,_0x3c00b0,_0x4be749){const _0x8b984b=_0x87d98d;!!this['actor']()&&(Game_System['prototype'][_0x8b984b(0x123)][_0x8b984b(0xe1)](this[_0x8b984b(0xdb)](),_0x1a9079,_0x3c00b0,_0x4be749),this[_0x8b984b(0xa9)]());},Game_Follower[_0x87d98d(0xce)][_0x87d98d(0xc8)]=function(_0x50abca,_0x4a668c){const _0x223e60=_0x87d98d;!!this[_0x223e60(0xdb)]()&&(Game_System[_0x223e60(0xce)][_0x223e60(0xc8)]['call'](this[_0x223e60(0xdb)](),_0x50abca,_0x4a668c),this[_0x223e60(0xa9)]());},Game_Follower[_0x87d98d(0xce)]['synchronizeHorrorEffects']=function(){const _0x3e1a99=_0x87d98d;this['_horrorFilters']=JsonEx[_0x3e1a99(0x134)](this[_0x3e1a99(0xdb)]()[_0x3e1a99(0x131)]);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xf3)]=Game_Interpreter[_0x87d98d(0xce)][_0x87d98d(0x102)],Game_Interpreter[_0x87d98d(0xce)][_0x87d98d(0x102)]=function(_0x4064d5){const _0x2411a6=_0x87d98d;return $gameTemp[_0x2411a6(0x11a)](this),VisuMZ['HorrorEffects']['Game_Interpreter_PluginCommand']['call'](this,_0x4064d5);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xbb)]=Scene_Title[_0x87d98d(0xce)][_0x87d98d(0xb7)],Scene_Title[_0x87d98d(0xce)][_0x87d98d(0xb7)]=function(){const _0x7804dc=_0x87d98d;VisuMZ[_0x7804dc(0xb3)]['Scene_Title_createBackground']['call'](this);if(ConfigManager[_0x7804dc(0xd3)]===![])return;this['applyTitleHorrorEffects'](this['_backSprite1'],VisuMZ[_0x7804dc(0xb3)][_0x7804dc(0x8d)][_0x7804dc(0x143)]),this['applyTitleHorrorEffects'](this['_backSprite2'],VisuMZ[_0x7804dc(0xb3)][_0x7804dc(0x8d)][_0x7804dc(0xe8)]);},Scene_Title[_0x87d98d(0xce)]['applyTitleHorrorEffects']=function(_0x4f33ba,_0x1a9720){const _0x34fca7=_0x87d98d;!!_0x4f33ba&&!!_0x1a9720&&(!!_0x1a9720[_0x34fca7(0xf2)]&&(_0x4f33ba[_0x34fca7(0x14c)](),_0x4f33ba['setHorrorNoiseRate'](_0x1a9720[_0x34fca7(0x125)]),_0x4f33ba[_0x34fca7(0xbe)](_0x1a9720[_0x34fca7(0xee)])),!!_0x1a9720[_0x34fca7(0x13d)]&&(_0x4f33ba[_0x34fca7(0x147)](),_0x4f33ba[_0x34fca7(0x10c)](_0x1a9720[_0x34fca7(0xe2)]),_0x4f33ba[_0x34fca7(0x146)](_0x1a9720['GlitchOffset']),_0x4f33ba[_0x34fca7(0x121)](_0x1a9720[_0x34fca7(0x111)]),_0x4f33ba['setHorrorGlitchFrequency'](_0x1a9720[_0x34fca7(0x14b)]),_0x4f33ba['setHorrorGlitchStrength'](_0x1a9720[_0x34fca7(0xa6)])),!!_0x1a9720['TV']&&(_0x4f33ba[_0x34fca7(0xe4)](),_0x4f33ba[_0x34fca7(0x12a)](_0x1a9720['TVLineThickness']),_0x4f33ba[_0x34fca7(0x150)](_0x1a9720['TVCorner']),_0x4f33ba[_0x34fca7(0x12c)](_0x1a9720[_0x34fca7(0x119)]),_0x4f33ba[_0x34fca7(0xfe)](_0x1a9720[_0x34fca7(0x138)])));},VisuMZ[_0x87d98d(0xb3)]['Sprite_initialize']=Sprite[_0x87d98d(0xce)][_0x87d98d(0x112)],Sprite[_0x87d98d(0xce)]['initialize']=function(_0x3dad28){const _0x56b392=_0x87d98d;this['_horrorFilters']={},this[_0x56b392(0x98)]=this[_0x56b392(0x98)]||null,VisuMZ[_0x56b392(0xb3)][_0x56b392(0xf4)][_0x56b392(0xe1)](this,_0x3dad28);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xe7)]=Sprite['prototype'][_0x87d98d(0xe0)],Sprite[_0x87d98d(0xce)][_0x87d98d(0xe0)]=function(){const _0xfdf8=_0x87d98d;this[_0xfdf8(0xd7)](),VisuMZ[_0xfdf8(0xb3)][_0xfdf8(0xe7)][_0xfdf8(0xe1)](this),this[_0xfdf8(0xfa)]();},Sprite[_0x87d98d(0xce)][_0x87d98d(0xd7)]=function(){const _0x36a925=_0x87d98d;if(ConfigManager[_0x36a925(0xd3)]===![])return;if(!PIXI[_0x36a925(0x120)][_0x36a925(0x118)])return;if(!PIXI[_0x36a925(0x120)][_0x36a925(0x14e)])return;if(!PIXI[_0x36a925(0x120)][_0x36a925(0xe6)])return;if(!!this[_0x36a925(0x98)]&&!!this[_0x36a925(0x98)][_0x36a925(0x131)]){var _0x38d14d=this[_0x36a925(0x98)][_0x36a925(0x131)];if(!!_0x38d14d['noiseFilter']){!this['_horrorFilters'][_0x36a925(0xf7)]&&this[_0x36a925(0x14c)]();if(_0x38d14d[_0x36a925(0xf7)][_0x36a925(0x139)]){_0x38d14d[_0x36a925(0xf7)][_0x36a925(0x139)]=![];var _0x410ca8=[_0x36a925(0x114),_0x36a925(0x10f)];for(var _0x547693=0x0;_0x547693<_0x410ca8[_0x36a925(0x151)];_0x547693++){var _0x134bce=_0x410ca8[_0x547693];this[_0x36a925(0x131)][_0x36a925(0xf7)][_0x134bce]=_0x38d14d[_0x36a925(0xf7)][_0x134bce];}}}else!!this[_0x36a925(0x131)][_0x36a925(0xf7)]&&this[_0x36a925(0xc5)]();if(!!_0x38d14d[_0x36a925(0x104)]){!this[_0x36a925(0x131)][_0x36a925(0x104)]&&this[_0x36a925(0x147)]();if(_0x38d14d[_0x36a925(0x104)][_0x36a925(0x139)]){_0x38d14d[_0x36a925(0x104)][_0x36a925(0x139)]=![];var _0x410ca8=[_0x36a925(0x100),_0x36a925(0x113),_0x36a925(0xdd),_0x36a925(0xc7),_0x36a925(0x10f),_0x36a925(0xe9),_0x36a925(0x133),'refreshRequest'];for(var _0x547693=0x0;_0x547693<_0x410ca8['length'];_0x547693++){var _0x134bce=_0x410ca8[_0x547693];this[_0x36a925(0x131)][_0x36a925(0x104)][_0x134bce]=_0x38d14d[_0x36a925(0x104)][_0x134bce],_0x134bce===_0x36a925(0x144)&&(_0x38d14d['glitchFilter'][_0x134bce]=![]);}}}else!!this[_0x36a925(0x131)][_0x36a925(0x104)]&&this[_0x36a925(0x8e)]();if(!!_0x38d14d[_0x36a925(0xc2)]){!this['_horrorFilters'][_0x36a925(0xc2)]&&this[_0x36a925(0xe4)]();if(_0x38d14d[_0x36a925(0xc2)][_0x36a925(0x139)]){_0x38d14d[_0x36a925(0xc2)][_0x36a925(0x139)]=![];var _0x410ca8=['lineWidth','vignetting',_0x36a925(0x10f),_0x36a925(0xa2)];for(var _0x547693=0x0;_0x547693<_0x410ca8[_0x36a925(0x151)];_0x547693++){var _0x134bce=_0x410ca8[_0x547693];this['_horrorFilters'][_0x36a925(0xc2)][_0x134bce]=_0x38d14d[_0x36a925(0xc2)][_0x134bce];}}}else!!this['_horrorFilters'][_0x36a925(0xc2)]&&this['removeHorrorTV']();}},Sprite[_0x87d98d(0xce)][_0x87d98d(0xfa)]=function(){const _0x4aff13=_0x87d98d;this[_0x4aff13(0xc4)](),this['updateHorrorGlitch'](),this[_0x4aff13(0xd4)]();},Sprite[_0x87d98d(0xce)][_0x87d98d(0xaa)]=function(_0x5771c4){const _0x4d7618=_0x87d98d;this[_0x4d7618(0x120)]=this[_0x4d7618(0x120)]||[],this['filters'][_0x4d7618(0xa8)](_0x5771c4);},Sprite[_0x87d98d(0xce)]['removeHorrorFilter']=function(_0x585918){const _0x593f12=_0x87d98d;var _0x36f744=this[_0x593f12(0x120)][_0x593f12(0x11c)](_0x585918);this[_0x593f12(0x120)][_0x593f12(0xb1)](_0x36f744,0x1),this['filters']['length']===0x0&&(this['filters']=null);},Sprite[_0x87d98d(0xce)][_0x87d98d(0x14c)]=function(){const _0x32393c=_0x87d98d;if(!PIXI[_0x32393c(0x120)][_0x32393c(0x118)])return;!this[_0x32393c(0x131)]['noiseFilter']&&(this['_horrorFilters'][_0x32393c(0xf7)]=new PIXI[(_0x32393c(0x120))]['NoiseFilter'](),this['createHorrorFilter'](this[_0x32393c(0x131)][_0x32393c(0xf7)])),this[_0x32393c(0x131)][_0x32393c(0xf7)][_0x32393c(0x114)]=0.3,this[_0x32393c(0x131)]['noiseFilter'][_0x32393c(0x10f)]=!![];},Sprite['prototype'][_0x87d98d(0xc5)]=function(){const _0x33997c=_0x87d98d;!!this[_0x33997c(0x131)]['noiseFilter']&&(this[_0x33997c(0x137)](this[_0x33997c(0x131)][_0x33997c(0xf7)]),this[_0x33997c(0x131)][_0x33997c(0xf7)]=undefined);},Sprite[_0x87d98d(0xce)][_0x87d98d(0xc4)]=function(){const _0x392fab=_0x87d98d;if(!PIXI['filters'][_0x392fab(0x118)])return;!!this[_0x392fab(0x131)][_0x392fab(0xf7)]&&(this[_0x392fab(0x131)][_0x392fab(0xf7)]['animated']&&(this[_0x392fab(0x131)]['noiseFilter'][_0x392fab(0x148)]=Math['random']()*0x3));},Sprite[_0x87d98d(0xce)][_0x87d98d(0xb9)]=function(_0xd6d78f){const _0x5e0103=_0x87d98d;!!this['_horrorFilters'][_0x5e0103(0xf7)]&&(this[_0x5e0103(0x131)][_0x5e0103(0xf7)]['noise']=_0xd6d78f);},Sprite[_0x87d98d(0xce)][_0x87d98d(0xbe)]=function(_0x5af399){const _0x37755c=_0x87d98d;!!this[_0x37755c(0x131)][_0x37755c(0xf7)]&&(this[_0x37755c(0x131)][_0x37755c(0xf7)]['animated']=_0x5af399);},Sprite[_0x87d98d(0xce)][_0x87d98d(0x147)]=function(){const _0x1c06b5=_0x87d98d;if(!PIXI[_0x1c06b5(0x120)][_0x1c06b5(0x14e)])return;!this[_0x1c06b5(0x131)][_0x1c06b5(0x104)]&&(this['_horrorFilters'][_0x1c06b5(0x104)]=new PIXI[(_0x1c06b5(0x120))][(_0x1c06b5(0x14e))](),this[_0x1c06b5(0xaa)](this[_0x1c06b5(0x131)][_0x1c06b5(0x104)])),this[_0x1c06b5(0x131)][_0x1c06b5(0x104)][_0x1c06b5(0x100)]=0xa,this[_0x1c06b5(0x131)][_0x1c06b5(0x104)][_0x1c06b5(0x113)]=0x64,this['_horrorFilters']['glitchFilter'][_0x1c06b5(0xdd)]=0x5,this['_horrorFilters'][_0x1c06b5(0x104)][_0x1c06b5(0xc7)]=0xa,this[_0x1c06b5(0x131)][_0x1c06b5(0x104)][_0x1c06b5(0x10f)]=!![],this['_horrorFilters']['glitchFilter']['aniFrequency']=0x12c,this[_0x1c06b5(0x131)][_0x1c06b5(0x104)][_0x1c06b5(0x133)]=0x1e;},Sprite[_0x87d98d(0xce)][_0x87d98d(0x8e)]=function(){const _0x59a77a=_0x87d98d;!!this[_0x59a77a(0x131)]['glitchFilter']&&(this['removeHorrorFilter'](this[_0x59a77a(0x131)][_0x59a77a(0x104)]),this[_0x59a77a(0x131)][_0x59a77a(0x104)]=undefined);},Sprite[_0x87d98d(0xce)][_0x87d98d(0x101)]=function(){const _0x5e034e=_0x87d98d;if(!PIXI[_0x5e034e(0x120)][_0x5e034e(0x14e)])return;if(!!this['_horrorFilters'][_0x5e034e(0x104)]){if(this['_horrorFiltersGlitchSpecial']&&this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x5e034e(0x10f)]){var _0x1b30e3=new PIXI[(_0x5e034e(0x120))]['GlitchFilter'](),_0x7948d7=[_0x5e034e(0x100),_0x5e034e(0x113),_0x5e034e(0xdd),_0x5e034e(0xc7),'animated',_0x5e034e(0xe9),_0x5e034e(0x133),_0x5e034e(0x144)];this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x5e034e(0x144)]=![];for(var _0x2262de=0x0;_0x2262de<_0x7948d7[_0x5e034e(0x151)];_0x2262de++){var _0x2724d8=_0x7948d7[_0x2262de];_0x1b30e3[_0x2724d8]=this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x2724d8];}var _0x32c3f9=this['filters'][_0x5e034e(0x11c)](this[_0x5e034e(0x131)][_0x5e034e(0x104)]);this[_0x5e034e(0x120)][_0x32c3f9]=this[_0x5e034e(0xaf)](_0x1b30e3),this[_0x5e034e(0x131)]['glitchFilter']=this[_0x5e034e(0x120)][_0x32c3f9];}if(this['_horrorFiltersGlitchSpecial']&&this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x5e034e(0x144)]){this['_horrorFilters'][_0x5e034e(0x104)][_0x5e034e(0x144)]=![],this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x5e034e(0x10f)]=![];var _0x1b30e3=new PIXI['filters'][(_0x5e034e(0x14e))](),_0x7948d7=['slices',_0x5e034e(0x113),_0x5e034e(0xdd),_0x5e034e(0xc7),'animated','aniFrequency',_0x5e034e(0x133),'refreshRequest'];for(var _0x2262de=0x0;_0x2262de<_0x7948d7['length'];_0x2262de++){var _0x2724d8=_0x7948d7[_0x2262de];_0x1b30e3[_0x2724d8]=this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x2724d8],_0x2724d8===_0x5e034e(0x144)&&(this[_0x5e034e(0x131)][_0x5e034e(0x104)][_0x2724d8]=![]);}var _0x32c3f9=this[_0x5e034e(0x120)][_0x5e034e(0x11c)](this[_0x5e034e(0x131)]['glitchFilter']);_0x1b30e3[_0x5e034e(0xbf)](),this[_0x5e034e(0x120)][_0x32c3f9]=this['updateHorrorGlitchEffect'](_0x1b30e3),this['_horrorFilters'][_0x5e034e(0x104)]=this[_0x5e034e(0x120)][_0x32c3f9];}else this[_0x5e034e(0xaf)](this['_horrorFilters'][_0x5e034e(0x104)]);}},Sprite['prototype'][_0x87d98d(0xaf)]=function(_0x5e0f36){const _0x2b86b3=_0x87d98d;if(_0x5e0f36[_0x2b86b3(0x10f)]){var _0x432bbf=Graphics[_0x2b86b3(0x124)]%_0x5e0f36[_0x2b86b3(0xe9)],_0x9a9455=_0x5e0f36['aniStrength'];if(_0x432bbf<Math['randomInt'](_0x9a9455)+0x1){var _0x253194=_0x5e0f36['sliceMax']-_0x5e0f36[_0x2b86b3(0xdd)],_0x2df689=Math[_0x2b86b3(0x108)](_0x253194)+_0x5e0f36[_0x2b86b3(0xc7)];_0x5e0f36[_0x2b86b3(0x100)]=_0x2df689;}else _0x5e0f36[_0x2b86b3(0x100)]=0x0;}else{if(_0x5e0f36[_0x2b86b3(0x100)]===0x0){var _0x253194=_0x5e0f36[_0x2b86b3(0xc7)]-_0x5e0f36['sliceMin'],_0x2df689=Math[_0x2b86b3(0x108)](_0x253194)+_0x5e0f36[_0x2b86b3(0xc7)];_0x5e0f36[_0x2b86b3(0x100)]=_0x2df689;}else _0x5e0f36['refreshRequest']&&(_0x5e0f36[_0x2b86b3(0x144)]=undefined,_0x5e0f36['refresh']());}return _0x5e0f36;},Sprite[_0x87d98d(0xce)][_0x87d98d(0x10c)]=function(_0x1e1d54,_0x206b80,_0x1eb2c2){const _0x178655=_0x87d98d;!!this[_0x178655(0x131)][_0x178655(0x104)]&&(_0x206b80===undefined&&(_0x206b80=Math[_0x178655(0x130)](_0x1e1d54/0x2)),_0x1eb2c2===undefined&&(_0x1eb2c2=_0x1e1d54),this[_0x178655(0x131)][_0x178655(0x104)]['sliceMin']=_0x206b80,this['_horrorFilters'][_0x178655(0x104)][_0x178655(0xc7)]=_0x1eb2c2,this['_horrorFilters'][_0x178655(0x104)][_0x178655(0x100)]=_0x1e1d54,this[_0x178655(0x131)]['glitchFilter'][_0x178655(0xbf)]());},Sprite[_0x87d98d(0xce)][_0x87d98d(0x146)]=function(_0x18fa2f){const _0xd2e0be=_0x87d98d;!!this['_horrorFilters'][_0xd2e0be(0x104)]&&(this[_0xd2e0be(0x131)][_0xd2e0be(0x104)]['offset']=_0x18fa2f);},Sprite[_0x87d98d(0xce)]['setHorrorGlitchAnimated']=function(_0x4126e1){const _0x47a060=_0x87d98d;!!this[_0x47a060(0x131)][_0x47a060(0x104)]&&(this[_0x47a060(0x131)][_0x47a060(0x104)][_0x47a060(0x10f)]=_0x4126e1);},Sprite['prototype']['setHorrorGlitchFrequency']=function(_0x4b168f){const _0x267bf2=_0x87d98d;!!this['_horrorFilters'][_0x267bf2(0x104)]&&(this[_0x267bf2(0x131)]['glitchFilter'][_0x267bf2(0xe9)]=_0x4b168f);},Sprite[_0x87d98d(0xce)][_0x87d98d(0xdf)]=function(_0x461379){const _0x2f5ab4=_0x87d98d;!!this[_0x2f5ab4(0x131)][_0x2f5ab4(0x104)]&&(this[_0x2f5ab4(0x131)][_0x2f5ab4(0x104)][_0x2f5ab4(0x133)]=_0x461379);},Sprite[_0x87d98d(0xce)][_0x87d98d(0xe4)]=function(){const _0x1474bf=_0x87d98d;if(!PIXI[_0x1474bf(0x120)]['CRTFilter'])return;!this[_0x1474bf(0x131)][_0x1474bf(0xc2)]&&(this[_0x1474bf(0x131)][_0x1474bf(0xc2)]=new PIXI['filters'][(_0x1474bf(0xe6))](),this['createHorrorFilter'](this[_0x1474bf(0x131)][_0x1474bf(0xc2)])),this[_0x1474bf(0x131)][_0x1474bf(0xc2)][_0x1474bf(0xe3)]=0x5,this[_0x1474bf(0x131)][_0x1474bf(0xc2)][_0x1474bf(0xcc)]=0.3,this[_0x1474bf(0x131)][_0x1474bf(0xc2)]['animated']=!![],this[_0x1474bf(0x131)]['tvFilter']['aniSpeed']=0.25;},Sprite[_0x87d98d(0xce)][_0x87d98d(0x9f)]=function(){const _0x7c0893=_0x87d98d;!!this[_0x7c0893(0x131)][_0x7c0893(0xc2)]&&(this[_0x7c0893(0x137)](this['_horrorFilters'][_0x7c0893(0xc2)]),this[_0x7c0893(0x131)][_0x7c0893(0xc2)]=undefined);},Sprite['prototype'][_0x87d98d(0xd4)]=function(){const _0x524dc8=_0x87d98d;if(!PIXI['filters']['CRTFilter'])return;!!this['_horrorFilters'][_0x524dc8(0xc2)]&&(this[_0x524dc8(0x131)][_0x524dc8(0xc2)][_0x524dc8(0x10f)]&&(this[_0x524dc8(0x131)][_0x524dc8(0xc2)]['time']+=this[_0x524dc8(0x131)][_0x524dc8(0xc2)][_0x524dc8(0xa2)]));},Sprite[_0x87d98d(0xce)]['setHorrorTVLineThickness']=function(_0x2ea506){const _0x56d22f=_0x87d98d;!!this[_0x56d22f(0x131)][_0x56d22f(0xc2)]&&(this[_0x56d22f(0x131)][_0x56d22f(0xc2)][_0x56d22f(0xe3)]=_0x2ea506);},Sprite[_0x87d98d(0xce)][_0x87d98d(0x150)]=function(_0x219923){const _0x364de3=_0x87d98d;!!this[_0x364de3(0x131)][_0x364de3(0xc2)]&&(this[_0x364de3(0x131)][_0x364de3(0xc2)][_0x364de3(0xcc)]=_0x219923);},Sprite[_0x87d98d(0xce)][_0x87d98d(0x12c)]=function(_0x171c1a){const _0x45e8e5=_0x87d98d;!!this['_horrorFilters'][_0x45e8e5(0xc2)]&&(this[_0x45e8e5(0x131)][_0x45e8e5(0xc2)][_0x45e8e5(0x10f)]=_0x171c1a);},Sprite[_0x87d98d(0xce)]['setHorrorTVSpeed']=function(_0x168ab3){const _0x2cca50=_0x87d98d;!!this[_0x2cca50(0x131)]['tvFilter']&&(this[_0x2cca50(0x131)][_0x2cca50(0xc2)][_0x2cca50(0xa2)]=_0x168ab3);},VisuMZ['HorrorEffects'][_0x87d98d(0xfc)]=Sprite_Character[_0x87d98d(0xce)][_0x87d98d(0x112)],Sprite_Character['prototype'][_0x87d98d(0x112)]=function(_0x4bc6f2){const _0x31205e=_0x87d98d;VisuMZ['HorrorEffects']['Sprite_Character_initialize']['call'](this,_0x4bc6f2),this[_0x31205e(0x98)]=_0x4bc6f2,this[_0x31205e(0x9c)]=!![];},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0x110)]=Sprite_Battler[_0x87d98d(0xce)]['setBattler'],Sprite_Battler[_0x87d98d(0xce)][_0x87d98d(0x14a)]=function(_0x3e61bc){const _0x59ddb9=_0x87d98d;VisuMZ[_0x59ddb9(0xb3)]['Sprite_Battler_setBattler']['call'](this,_0x3e61bc),this['_horrorFiltersSource']=_0x3e61bc,this[_0x59ddb9(0x9c)]=!![];},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xeb)]=Sprite_Picture[_0x87d98d(0xce)][_0x87d98d(0x112)],Sprite_Picture['prototype'][_0x87d98d(0x112)]=function(_0x3d35e7){const _0x4a287d=_0x87d98d;VisuMZ[_0x4a287d(0xb3)][_0x4a287d(0xeb)][_0x4a287d(0xe1)](this,_0x3d35e7);},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xcb)]=Sprite_Picture[_0x87d98d(0xce)]['updateBitmap'],Sprite_Picture[_0x87d98d(0xce)][_0x87d98d(0x11b)]=function(){const _0x100563=_0x87d98d;VisuMZ['HorrorEffects'][_0x100563(0xcb)][_0x100563(0xe1)](this),this[_0x100563(0x96)]&&!this[_0x100563(0x98)]?this[_0x100563(0x98)]=this[_0x100563(0xb8)]():this[_0x100563(0x98)]=undefined;},VisuMZ[_0x87d98d(0xb3)][_0x87d98d(0xda)]=Spriteset_Map[_0x87d98d(0xce)][_0x87d98d(0x112)],Spriteset_Map[_0x87d98d(0xce)][_0x87d98d(0x112)]=function(){const _0x18b48f=_0x87d98d;VisuMZ['HorrorEffects'][_0x18b48f(0xda)][_0x18b48f(0xe1)](this),this[_0x18b48f(0x98)]=$gameScreen;},VisuMZ['HorrorEffects']['Spriteset_Battle_initialize']=Spriteset_Battle[_0x87d98d(0xce)]['initialize'],Spriteset_Battle[_0x87d98d(0xce)][_0x87d98d(0x112)]=function(){const _0x14d2db=_0x87d98d;VisuMZ[_0x14d2db(0xb3)][_0x14d2db(0x127)]['call'](this),this[_0x14d2db(0x98)]=$gameSystem;};