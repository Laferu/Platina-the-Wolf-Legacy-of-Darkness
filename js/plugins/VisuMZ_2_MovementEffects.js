//=============================================================================
// VisuStella MZ - Movement Effects
// VisuMZ_2_MovementEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MovementEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MovementEffects = VisuMZ.MovementEffects || {};
VisuMZ.MovementEffects.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [MovementEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Movement_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Movement in RPG Maker MZ can be kind of dull. There's next to no way of
 * interacting with the map. This plugin adds various means of doing so to add
 * more life to the environment. Dust Clouds can kick up when running around.
 * Footprints can be left in the sand. Footsteps can be heard making different
 * sounds based on the flooring. Added movement abilities like Smart Blink,
 * Smart Jump, and Smart Rush allow players more fun traversal options. And to
 * top it off, a smooth scrolling camera will ease in the screen to focus on
 * the player character instead of being locked-on firmly. Motion blurs and
 * motion trails are also made available to further emphasize movement.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Dust Clouds can kick up off the ground whenever characters run, giving the
 *   player a better understanding of what's going on.
 * * Dust Clouds can be customized, using images or generated with different
 *   colors. These settings can be altered mid-game as well.
 * * Footprints can appear when stepping over specific tiles marked by declared
 *   terrain tags or regions. This can be used over imprintable terrain like
 *   dirt, sand, or snow.
 * * Footprints can be modified in how they appear with custom images or with
 *   generated images. These modifications will be based on the sprite sheet
 *   frame used to generate them for accuracy.
 * * Footstep sounds can be added to give player feedback whenever the player
 *   character or events move on the screen.
 * * Apply different footstep sounds to different tiles on the map marked by
 *   either regions or terrain tags.
 * * Footsteps coming from events can have a distance factor applied to them,
 *   making them sound softer the further away they are and playing on specific
 *   sides of a stereo speaker.
 * * Motion Blur effects can be used to create more impactful scenes. Apply
 *   them to any character on the map screen be it the player character,
 *   followers, or events via Plugin Command!
 * * Motion Trails can added to emphasize movement. These are also inherently a
 *   part of the new movement abilities.
 * * Newly added movement abilities that pay attention to the terrain and any
 *   implemented restrictions. These abilities include Smart Blink, Smart Jump,
 *   and Smart Rush.
 * * Directional Movement Speed Modifiers can be adjusted globally to make
 *   characters move faster or slower in certain directions. This can be used
 *   to create an illusion that it's harder to move against the wind in a storm
 *   than with.
 * * Smart Blink is a new movement ability that can be activated via Plugin
 *   Command! The player teleports forward a set distance, ignoring any walls
 *   and/or obstacles in between unless restrictions prohibit the player from
 *   doing so.
 * * Smart Jump is a new movement ability that can be activated via Plugin
 *   Command! The player jumps forward a distance as long as it does not
 *   interfere with obstacles. It can scale past pits and small gaps in height.
 *   Height maps can also be declared for some verticality on the map.
 * * Smart Rush is a new movement ability that can be activated via Plugin
 *   Command! The player charges forward extremely fast, possibly colliding
 *   with events, and possibly creating new interactions with its switch
 *   toggling nature.
 * * Smooth Camera is an added feature to smoothly adjust the camera as the
 *   player traverses across the game's maps. The scrolling speed goes slower
 *   or faster depending if the player is walking or dashing.
 * * Plugin Commands allow you to adjust Smooth Camera settings midway through
 *   the game.
 * * Map notetags can forcefully enable or disable Smooth Camera.
 * * Players that find certain effects added through this plugin annoying (such
 *   as footprints, footsteps, smooth camera, etc) can have them turned off via
 *   the Options menu.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_EventsMoveCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Dust Cloud-Related Notetags ===
 * 
 * ---
 * 
 * <Force Dust Cloud>
 * 
 * - Used for: Map Notetags
 * - Forces Dust Clouds to be kicked up whenever characters are dashing
 *   regardless of whatever settings are found in the Plugin Parameters for
 *   this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Dust Clouds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 *
 * <No Dust Cloud>
 *
 * - Used for: Map Notetags
 * - This disables Dust Clouds from being kicked up whenever characters are
 *   dashing regardless of whatever settings are found in the Plugin Parameters
 *   for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 *
 * ---
 * 
 * === Footprints-Related Notetags ===
 * 
 * ---
 * 
 * <Footprint Region: x>
 * <Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions will have visible footprints when characters
 *   walk over those areas.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Region: x>
 * <No Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions CANNOT have footprints when characters walk
 *   over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * 
 * ---
 * 
 * <Region x Footprint Opacity: y>
 * 
 * - Used for: Map Notetags
 * - This changes the opacity of the footprints that spawn in region 'x' to
 *   have an opacity value of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that region.
 * 
 * ---
 * 
 * <Region x Footprint Duration: y>
 * 
 * - Used for: Map Notetags
 * - This changes the duration of the footprints that spawn in region 'x' to
 *   have a duration time of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that region.
 * 
 * ---
 * 
 * <Footprint Terrain Tag: x>
 * <Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which terrain tag marked tiles will have visible footprints
 *   when characters walk over those areas.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Terrain Tag: x>
 * <No Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which terrain tag marked tiles CANNOT have footprints when
 *   characters walk over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Opacity: y>
 * 
 * - Used for: Map Notetags
 * - This changes the opacity of the footprints that spawn in tiles with
 *   terrain tag 'x' to have an opacity value of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that tile.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Duration: y>
 * 
 * - Used for: Map Notetags
 * - This changes the duration of the footprints that spawn in tiles with
 *   terrain tag 'x' to have a duration time of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that tile.
 * 
 * ---
 * 
 * <Disable Footprints>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Prevents the character from being able to leave behind footprints.
 * 
 * ---
 * 
 * <Footprint d Pattern p Filename: filename>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Allows you to set a specific image to be used in place of a generated
 *   footprint for 'd' direction 'p' pattern.
 * - Using this will bypass any settings made for generated footprints.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Examples:
 *   - <Footprint Down Pattern 0 Filename: FootprintDownA>
 *   - <Footprint Left Pattern 2 Filename: FootprintLeftB>
 *   - <Footprint Right Pattern 0 Filename: FootprintRightA>
 * 
 * ---
 * 
 * <Footprint d Pattern p Width: x>
 * <Footprint d Pattern p Height: y>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the width
 *   and/or height of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' with a number representing the width of footprint in pixels.
 * - Replace 'y' with a number representing the height of footprint in pixels.
 * - Examples:
 *   - <Footprint Down Pattern 0 Width: 6>
 *   - <Footprint Left Pattern 2 Height: 4>
 * 
 * ---
 * 
 * <Footprint d Pattern p Offset: +x, +x>
 * <Footprint d Pattern p Offset: -x, -x>
 * <Footprint d Pattern p Offset: +x, -x>
 * <Footprint d Pattern p Offset: -x, +x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the offsets
 *   X and Y of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the footprint's x and y coordinates by.
 * - Examples:
 *   - <Footprint Up Pattern 0 Width: +4, +2>
 *   - <Footprint Right Pattern 2 Height: -6, -4>
 * 
 * ---
 * 
 * === Footsteps-Related Notetags ===
 * 
 * ---
 * 
 * <Force Footsteps>
 *
 * - Used for: Map Notetags
 * - Forces footstep sounds to be played whenever characters are walking on the
 *   screen, regardless of the settings found in the Plugin Parameters for the
 *   particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Footstep Sounds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 * 
 * <No Footsteps>
 *
 * - Used for: Map Notetags
 * - Prevents footstep sounds from being played whenever characters are walking
 *   on the screen, regardless of the settings found in the Plugin Parameters
 *   for the particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * 
 * ---
 * 
 * <Region x Footstep Sound: filename>
 * <Region x Footstep Sound: filename, volume>
 * <Region x Footstep Sound: filename, volume, pitch>
 * <Region x Footstep Sound: filename, volume, pitch, pan>
 * 
 * - Used for: Map Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will take priority over any terrain tags with unique footstep sounds.
 * 
 * ---
 * 
 * <No Region x Footsteps>
 * 
 * - Used for: Map Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * 
 * ---
 * 
 * <Terrain Tag x Footsteps: filename>
 * <Terrain Tag x Footsteps: filename, volume>
 * <Terrain Tag x Footsteps: filename, volume, pitch>
 * <Terrain Tag x Footsteps: filename, volume, pitch, pan>
 * 
 * - Used for: Tileset Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile with terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will have LESS priority than any regions with unique footstep sounds.
 * 
 * ---
 * 
 * <No Terrain Tag x Footsteps>
 * 
 * - Used for: Tileset Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * 
 * ---
 * 
 * <Enable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally disabled, this will enable
 *   them when moving.
 * - Footstep sounds coming from actors will be given priority to the party
 *   leader first before anyone else.
 * 
 * ---
 * 
 * <Disable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally enabled, this will disable
 *   them when moving.
 * 
 * ---
 * 
 * <Footsteps Volume: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the volume for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep volume.
 * 
 * ---
 * 
 * <Footsteps Pitch: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the pitch for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep pitch.
 * 
 * ---
 * 
 * <Footsteps Frame: x>
 * <Footsteps Frames: x, x, x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For those using the "Sound by Frame?" Plugin Parameter, this will cause
 *   the footstep sounds to trigger whenever the sprite changes to the listed
 *   frame(s) in order to match up the sound with the image of the sprite
 *   stepping on the ground.
 * - This will override the setting found in the Plugin Parameters for this
 *   specific actor or event.
 * - Replace 'x' with a number representing the frame. Frames start at 0 and
 *   increase by 1 going left to right.
 * 
 * ---
 * 
 * === Smart Blink-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Blink>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Blink from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Region: x>
 * <Smart Blink Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Terrain Tags: x>
 * <Smart Blink Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Region: x>
 * <Smart Blink Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Terrain Tags: x>
 * <Smart Blink Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * === Smart Jump-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Jump>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Jump from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Region: x>
 * <Smart Jump Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Terrain Tags: x>
 * <Smart Jump Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Region: x>
 * <Smart Jump Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Terrain Tags: x>
 * <Smart Jump Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Height-Based Regions: x, x>
 * <Smart Jump Height-Based Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Allows you to assign certain tiles to be marked as a specific height for
 *   Smart Jump to interact with.
 * - Replace 'x' with a number (0 to 255) representing the region ID to use as
 *   a height marker.
 *   - Insert multiple numbers to mark more regions.
 * - Height-Based Region interactions work as follows:
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 *   - Examples:
 *     - <Smart Jump Height-Based Regions: 10, 13, 15>
 *       - Region 10 will be considered the "ledge" region.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * ---
 * 
 * <Smart Jump Non-Land>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to land on this event.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass>
 * <Illegal Jump>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to leap past this event or on it.
 * 
 * ---
 * 
 * === Smart Rush-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Rush>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Rush from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Region: x>
 * <Smart Rush Non-Crash Region: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' region(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Terrain Tag: x>
 * <Smart Rush Non-Crash Terrain Tag: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' terrain tag(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific tileset.
 * 
 * ---
 * 
 * === Smooth Camera-Related Notetags ===
 * 
 * ---
 *
 * <Force Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This forcefully enables Smooth Camera scrolling regardless of whatever
 *   settings are found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Smooth Camera scrolling in the options
 *   menu, then this setting will be turned off.
 *
 * ---
 *
 * <No Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This disables Smooth Camera scrolling regardless of whatever settings are
 *   found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
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
 * === Dust Clouds Plugin Commands ===
 * 
 * ---
 * 
 * DUST CLOUDS: Enable/Disable
 * - Enable or Disable the Dust Clouds from spawning when dashing.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables Dust Clouds.
 * 
 * ---
 * 
 * DUST CLOUDS: Change Settings
 * - Alter the existing Dust Clouds settings.
 * 
 *   Appearance:
 * 
 *     Filename:
 *     - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *     Color:
 *     - Color of the dust cloud in #rrggbb format.
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the max radius of this dust cloud?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Fullness:
 *     - What is the fullness level (0.0 to 1.0)?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *   Animation:
 * 
 *     Duration:
 *     - How many frames will a dust cloud remain on screen?
 * 
 *     Starting Opacity:
 *     - What is the starting opacity (0-255)?
 *     - Dust cloud opacity will gradually go to 0.
 * 
 *     Starting Scale:
 *     - What is the starting scale (0.0 to 1.0)?
 *     - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 * 
 * === Footprints and Footsteps Plugin Commands ===
 * 
 * ---
 * 
 * FOOTPRINTS: Enable/Disable
 * - Enable or Disable footprint marks from being made.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footprint marks.
 * 
 * ---
 * 
 * FOOTSTEPS: Enable/Disable
 * - Enable or Disable footstep sounds from being played.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footstep sounds.
 * 
 * ---
 * 
 * === Motion Blur Plugin Commands ===
 * 
 * ---
 * 
 * MOTION BLUR: Player
 * - Plays a Motion Blur on the player sprite.
 * - Requires Pixi JS Filters!
 * 
 *   Apply to Followers?:
 *   - Apply this motion blur effect to followers, too?
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Follower(s)
 * - Plays a Motion Blur on the follower sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Event(s)
 * - Plays a Motion Blur on event sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * === Motion Trail Plugin Commands ===
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Player?
 * - Change Motion Trail settings for the player.
 * - This does NOT enable them. You must do that separately.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Follower(s)?
 * - Change Motion Trail settings for the follower(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Event(s)?
 * - Change Motion Trail settings for the event(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Player
 * - Immediately create a motion trail sprite for the player in the player's
 *   current position.
 * 
 *   Apply to Followers?:
 *   - Apply this effect to followers, too?
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Follower(s)
 * - Immediately create a motion trail sprite for the follower(s) in the
 *   follower(s)'s current position.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Event(s)
 * - Immediately create a motion trail sprite for the event(s) in the
 *   event(s)'s current position.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Player?
 * - Enables/disables Motion Trails for player sprite.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Follower(s)?
 * - Enables/disables Motion Trails for follower sprite(s).
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Event(s)?
 * - Enables/disables Motion Trails for event sprite(s).
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * === Smart Movement Plugin Commands ===
 * 
 * ---
 * 
 * SMART: Directional Move Speed Modifier
 * - Global!
 * - These settings allow you to adjust the movement speed modifiers when
 *   characters are facing certain directions.
 * - This can be used to help give a better illusion that in a storm (or such),
 *   it is harder to move against the wind than with.
 * 
 *   Standard Directions:
 * 
 *     Down Speed:
 *     Left Speed:
 *     Right Speed:
 *     Up Speed:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 *   Diagonal Directions:
 * 
 *     Lower Left:
 *     Lower Right:
 *     Upper Left:
 *     Upper Right:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 * ---
 * 
 * SMART: Smart Blink X Tiles
 * - Player uses "Smart Blink" to teleport forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player teleport forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Blink is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Blink?
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 * ---
 * 
 * SMART: Smart Jump X Tiles
 * - Player uses "Smart Jump" to leap forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player jump forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Jump is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Jump?
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 * ---
 * 
 * SMART: Smart Rush X Tiles
 * - Player uses "Smart Rush" to rush forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will player charge forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Rush is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Switch(es):
 *     - Which Switch(es) will turn ON during Smart Rush?
 *     - This Switch(es) will also turn OFF after.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Rush?
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *     Speed Rate:
 *     - How much faster is "Smart Rush" compared to Dashing?
 *     - You may use JavaScript code.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 * ---
 * 
 * Motion Trail Settings
 * - These are sub-settings found for Smart Blink, Smart Jump, and Smart Rush.
 * 
 *   General:
 * 
 *     Override?:
 *     - Override Motion Trail settings temporarily?
 *     - Otherwise, use current player Motion Trail settings.
 * 
 *   Settings:
 * 
 *     Delay:
 *     - How many frames to delay by when creating a motion trail?
 *     - The higher the delay, the less after images there are.
 * 
 *     Duration:
 *     - How many frames should the motion trail last?
 *     - What do you want to be its duration?
 * 
 *     Hue:
 *     - What do you want to be the hue for the motion trail?
 * 
 *     Starting Opacity:
 *     - What starting opacity value do you want for the motion trail?
 *     - Opacity values decrease over time.
 * 
 *     Tone:
 *     - What tone do you want for the motion trail?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * SMART: Wait for Smart Blink
 * - Waits for player to finish Smart Blinking before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Jump
 * - Waits for player to finish Smart Jumping before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Rush
 * - Waits for player to finish Smart Rushing before continuing.
 * 
 * ---
 * 
 * === Smooth Camera Plugin Commands ===
 * 
 * ---
 *
 * SMOOTH CAMERA: Enable/Disable
 * - Enable or Disable the Smooth Camera.
 *
 *   Enable/Disable?:
 *   - Enables or Disables Smooth Camera.
 *
 * ---
 *
 * SMOOTH CAMERA: Speed Change
 * - Change the scrolling speed for the Smooth Camera.
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dust Cloud Settings
 * ============================================================================
 *
 * Dust Clouds can appear when the player (or any character) is dashing. The
 * spawned dust clouds have some randomness to them so not all of them are the
 * same size and scale. You can use images for custom dust clouds or use plugin
 * generated dust clouds for those who don't have custom images to use.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Are Dust Clouds enabled by default?
 * 
 * ---
 * 
 * Appearance:
 * 
 *   Filename:
 *   - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *   Color:
 *   - Color of the dust cloud in #rrggbb format.
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the max radius of this dust cloud?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Fullness:
 *   - What is the fullness level (0.0 to 1.0)?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Animation:
 * 
 *   Duration:
 *   - How many frames will a dust cloud remain on screen?
 * 
 *   Starting Opacity:
 *   - What is the starting opacity (0-255)?
 *   - Dust cloud opacity will gradually go to 0.
 * 
 *   Starting Scale:
 *   - What is the starting scale (0.0 to 1.0)?
 *   - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footprint Mark Settings
 * ============================================================================
 *
 * Footprint marks can appear on certain tiles probably marked by specific
 * regions and/or terrain tags. They will not appear normally unless you change
 * up the settings.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footprint marks enabled by default?
 *
 * ---
 *
 * Appearance
 * 
 *   Opacity:
 *   - What is the starting opacity of the footprint?
 * 
 *   Duration:
 *   - How many frames will footprints remain on the screen
 *     before disappearing?
 * 
 *   Follower Variance:
 *   - What variance should followers have for their footprints?
 *   - This is to avoid them all stepping in the same place.
 *
 * ---
 *
 * Map Defaults
 * 
 *   Regions:
 *   - Which Regions will have footprints appear by default?
 * 
 *   Terrain Tags:
 *   - Which terrain tags will have footprints appear by default?
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Left:
 *   Right:
 *   Up:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footstep Sounds Settings
 * ============================================================================
 *
 * The following plugin parameters are used to modify the footstep sounds that
 * are played whenever characters move.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footstep sounds enabled by default?
 * 
 *   Sound by Frame?:
 *   - Play footstep sounds at certain sprite frames or with each tile step?
 *   - For those who want the Yanfly Engine Plugins timing, set this to false.
 *   - On the flipside, setting it to true will cause footstep sounds to occur
 *     whenever the sprite sets its foot down (assuming you setup the frames
 *     correctly with the plugin parameter below).
 * 
 *     Audible Frame(s):
 *     - Which sprite sheet "frames" will play a sound?
 *     - Sprite sheet Frames start at 0.
 * 
 *   Walk Animation Modifier:
 *   - What is the rate at which animations play for walking?
 *   - This is to ensure the sound effects synch up.
 * 
 *   Dash Animation Modifier:
 *   - What is the rate at which animations play for dashing?
 *   - This is to ensure the sound effects synch up.
 *
 * ---
 *
 * Default Sound
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
 * Distance
 * 
 *   Volume Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pan Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use an integer value.
 *
 * ---
 *
 * Actor Modifiers
 * 
 *   Enabled for Actors?:
 *   - Are footstep sounds enabled for actors by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for actors.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for actors.
 *   - Use a decimal value.
 *
 * ---
 *
 * Event Modifiers
 * 
 *   Enabled for Events?:
 *   - Are footstep sounds enabled for events by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for events.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for events.
 *   - Use a decimal value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Blink Settings
 * ============================================================================
 *
 * Smart Blink is a Plugin Command launched action. The action will cause the
 * player to teleport forward (up to) a measured distance, bypassing any
 * obstacles and/or walls inbetween. If the Plugin Command is placed at the end
 * of the event list, then the player is able to trigger any other events on
 * the tile that the player has landed on.
 * 
 * Smart Blinking can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot teleport past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Blink?:
 *   - Allow diagonal Smart Blinking?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Blink is able to cover.
 * 
 * ---
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     facing while blinking.
 *
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Jump Settings
 * ============================================================================
 *
 * Smart Jump is a Plugin Command launched action. The action will cause the
 * player to jump forward (up to) a measured distance, bypassing any obstacles
 * and/or walls inbetween. If the Plugin Command is placed at the end of the
 * event list, then the player is able to trigger any other events on the tile
 * that the player has landed on.
 * 
 * Smart Jumping can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot jump past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * Smart Jump also has height based interactions, allowing the player to jump
 * from equal height "regions" to another, such as scaling a cliff. Players can
 * also jump from higher regions to lower regions (as long as both are marked
 * as Height-Based Regions). Here are how Height-Based Regions interact:
 * 
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 * 
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 * 
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 * 
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 * 
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 * 
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 * 
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Jump?:
 *   - Allow diagonal Smart Jumping?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Jump is able to cover.
 * 
 *   Height-Based Regions:
 *   - Determine which regions are height-based.
 *   - The lowest value region will be a "ledge".
 * 
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Rush Settings
 * ============================================================================
 *
 * Smart Rush is a Plugin Command launched action. The action will cause the
 * player to rush forward at faster (normally) than dash speed. If the Plugin
 * Command is placed at the end of the event list, then the player is able to
 * collide with other events, possibly triggering them.
 * 
 * While rushing forward, any switches listed in the Plugin Command will be
 * turned to the ON position, then OFF position once the rushing is finished.
 * This means that any events that the player collides with can have a unique
 * interaction from being rushed into. Examples include making objects fall
 * from trees, breaking down locked doors, or smashing apart rubble.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Rushes.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Rush?:
 *   - Allow diagonal Smart Rushing?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Rush is able to cover.
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     rushing at.
 *
 * ---
 *
 * Crash Shake
 * 
 *   Enable Crash Shake?:
 *   - Cause the screen to shake after crashing into an entity?
 *   - Entities can be walls or events.
 * 
 *   Power Rate:
 *   - The power modifier for the screen shake upon crashing into something.
 * 
 *   Speed Rate:
 *   - The speed modifier for the screen shake upon crashing into something.
 * 
 *   Shaking Duration:
 *   - How many frames will the screen shake last after crashing into
 *     something?
 *
 * ---
 * 
 * Non-Crash
 * 
 *   Regions:
 *   - When crashing into these region-marked tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 *   Terrain Tags:
 *   - When crashing into these terrain tagged tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smooth Camera Scrolling Settings
 * ============================================================================
 *
 * Adjust the settings for smooth camera scrolling while the player moves.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters control the settings you see in the Options menu.
 * These are for players who might be bothered by some of the various features
 * found in the plugin and will grant them the ability to turn them on/off.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 * 
 * ---
 *
 * Dust Cloud:
 * 
 *   Add Option?:
 *   - Add the 'Dust Clouds' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * Smooth Camera:
 * 
 *   Add Option?:
 *   - Add the 'Smooth Scroll' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: March 31, 2022
 * * Bug Fixes!
 * ** <Terrain Tag x Footsteps: filename> notetag should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: April 4, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DustCloud
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_DustCloud
 * @text Category - Dust Clouds
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudEnableDisable
 * @text DUST CLOUDS: Enable/Disable
 * @desc Enable or Disable the Dust Clouds from spawning when dashing.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Enables or Disables Dust Clouds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudChangeSettings
 * @text DUST CLOUDS: Change Settings
 * @desc Alter the existing Dust Clouds settings.
 * 
 * @arg Appearance
 * 
 * @arg filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @arg color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @arg radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @arg fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @arg Animation
 *
 * @arg wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @arg startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @arg startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Footprints
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Footprints
 * @text Category - Footprints & Footsteps
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootprintsEnableDisable
 * @text FOOTPRINTS: Enable/Disable
 * @desc Enable or Disable footprint marks from being made.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Enables or Disables footprint marks.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootstepsEnableDisable
 * @text FOOTSTEPS: Enable/Disable
 * @desc Enable or Disable footstep sounds from being played.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Enables or Disables footstep sounds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionBlur
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionBlur
 * @text Category - Motion Blur
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurPlayer
 * @text MOTION BLUR: Player
 * @desc Plays a Motion Blur on the player sprite.
 * Requires Pixi JS Filters!
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this motion blur effect to followers, too?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurFollower
 * @text MOTION BLUR: Follower(s)
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurEvent
 * @text MOTION BLUR: Event(s)
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionTrails
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionTrails
 * @text Category - Motion Trails
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangePlayer
 * @text MOTION TRAIL: Change Settings For Player?
 * @desc Change Motion Trail settings for the player.
 * This does NOT enable them. You must do that separately.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeFollower
 * @text MOTION TRAIL: Change Settings For Follower(s)?
 * @desc Change Motion Trail settings for follower(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeEvent
 * @text MOTION TRAIL: Change Settings For Event(s)?
 * @desc Change Motion Trail settings for event(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForPlayer
 * @text MOTION TRAIL: Create For Player
 * @desc Immediately create a motion trail sprite for the player
 * in the player's current position.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this effect to followers, too?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForFollower
 * @text MOTION TRAIL: Create For Follower(s)
 * @desc Immediately create a motion trail sprite for the follower(s)
 * in the follower(s)'s current position.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to target.
 * Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForEvent
 * @text MOTION TRAIL: Create For Event(s)
 * @desc Immediately create a motion trail sprite for the event(s)
 * in the event(s)'s current position.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to target.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnablePlayer
 * @text MOTION TRAIL: Enable For Player?
 * @desc Enables/disables Motion Trails for player sprite.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableFollower
 * @text MOTION TRAIL: Enable For Follower(s)?
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableEvent
 * @text MOTION TRAIL: Enable For Event(s)?
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmartMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmartMove
 * @text Category - Smart Movements
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartDirMoveSpeedMod
 * @text SMART: Directional Move Speed Modifier
 * @desc Global! These settings allow you to adjust the movement speed
 * modifiers when characters are facing certain directions.
 * 
 * @arg Standard
 * @text Standard Directions
 *
 * @arg dir2:str
 * @text Down Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir4:str
 * @text Left Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir6:str
 * @text Right Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir8:str
 * @text Up Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 * 
 * @arg Diagonal
 * @text Diagonal Directions
 *
 * @arg dir1:str
 * @text Lower Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir3:str
 * @text Lower Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir7:str
 * @text Upper Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir9:str
 * @text Upper Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartBlinkDistance
 * @text SMART: Smart Blink X Tiles
 * @desc Player uses "Smart Blink" to teleport forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player teleport forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 60
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Blink is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Blink?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"60","hue:num":"0","opacityStart:num":"255","tone:eval":"[0, 192, 192, 128]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Blink.
 * @default Flash2
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Blink.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Blink.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Blink.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartJumpDistance
 * @text SMART: Smart Jump X Tiles
 * @desc Player uses "Smart Jump" to leap forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player jump forward?
 * You may use JavaScript code.
 * @default 2
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Jump is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Jump?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[0, 0, 0, 0]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Jump.
 * @default Jump1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Jump.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Jump.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Jump.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartRushDistance
 * @text SMART: Smart Rush X Tiles
 * @desc Player uses "Smart Rush" to rush forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will player charge forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Rush is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 *
 * @arg Switches:arraynum
 * @text Switch(es)
 * @parent Mechanics
 * @type switch[]
 * @desc Which Switch(es) will turn ON during Smart Rush?
 * This Switch(es) will also turn OFF after.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Rush?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"1","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[192, 0, 192, 128]"}
 *
 * @arg SpeedRate:eval
 * @text Speed Rate
 * @parent Visual
 * @desc How much faster is "Smart Rush" compared to Dashing?
 * You may use JavaScript code.
 * @default 1.50
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Rush.
 * @default Wind1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Rush.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Rush.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Rush.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartBlink
 * @text SMART: Wait for Smart Blink
 * @desc Waits for player to finish Smart Blinking before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartJump
 * @text SMART: Wait for Smart Jump
 * @desc Waits for player to finish Smart Jumping before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartRush
 * @text SMART: Wait for Smart Rush
 * @desc Waits for player to finish Smart Rushing before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmoothCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmoothCamera
 * @text Category - Smooth Camera
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraEnableDisable
 * @text SMOOTH CAMERA: Enable/Disable
 * @desc Enable or Disable the Smooth Camera.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Enables or Disables Smooth Camera.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraSpeedChange
 * @text SMOOTH CAMERA: Speed Change
 * @desc Change the scrolling speed for the Smooth Camera.
 *
 * @arg WalkSpeed
 * @text Walking Speed
 *
 * @arg HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg DashSpeed
 * @text Dashing Speed
 *
 * @arg HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @arg VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
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
 * @param MovementEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DustCloud:struct
 * @text Dust Cloud Settings
 * @type struct<DustCloud>
 * @desc Adjust the settings for kicked up dust clouds whenever a character is dashing.
 * @default {"Default":"","Enabled:eval":"true","Appearance":"","filename:str":"","color:str":"#ffffff","radius:num":"24","fullness:num":"0.20","Animation":"","wholeDuration:num":"20","startOpacity:num":"192","startScale:num":"0.2"}
 *
 * @param Footprints:struct
 * @text Footprint Marks Settings
 * @type struct<Footprints>
 * @desc Adjust the settings for footprint marks whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","Appearance":"","startOpacity:num":"64","wholeDuration:num":"600","followerVariance:num":"4","MapDefaults":"","DefaultRegions:arraynum":"[]","DefaultTerrainTags:arraynum":"[]","StandardDirections":"","dir2:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir4:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir6:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir8:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","DiagonalDirections":"","dir1:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir3:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir7:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir9:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}"}
 *
 * @param Footsteps:struct
 * @text Footstep Sounds Settings
 * @type struct<Footsteps>
 * @desc Adjust the settings for the sounds footsteps make whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","SoundByFrame:eval":"true","Frames:arraynum":"[\"0\",\"2\"]","FrameDashModifier:num":"1.5","Default":"","name:str":"Blow2","volume:num":"10","pitch:num":"120","pan:num":"0","Distance":"","distanceVolumeModifier:num":"-0.50","distancePitchModifier:num":"-0.00","distancePanModifier:num":"5","Actor":"","actorEnabled:eval":"true","actorVolumeModifier:num":"1.00","actorPitchModifier:num":"1.00","Event":"","eventEnabled:eval":"true","eventVolumeModifier:num":"1.00","eventPitchModifier:num":"1.00"}
 *
 * @param SmartBlink:struct
 * @text Smart Blink Settings
 * @type struct<SmartBlink>
 * @desc Settings involving the Smart Blink movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"-15","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartJump:struct
 * @text Smart Jump Settings
 * @type struct<SmartJump>
 * @desc Settings involving the Smart Jump movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","HeightBasedRegions:arraynum":"[]","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartRush:struct
 * @text Smart Rush Settings
 * @type struct<SmartRush>
 * @desc Settings involving the Smart Rush movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"15","Shake":"","Enable:eval":"true","ShakePowerRate:num":"3.0","ShakeSpeedRate:num":"3.0","ShakeDuration:num":"20","NonCrash":"","NonCrashRegions:arraynum":"[]","NonCrashTerrainTags:arraynum":"[]"}
 *
 * @param SmoothCamera:struct
 * @text Smooth Camera Scrolling
 * @type struct<SmoothCamera>
 * @desc Adjust the settings for smooth camera scrolling while the player moves.
 * @default {"Default":"","Enabled:eval":"true","WalkSpeed":"","HorzWalk:num":"24","VertWalk:num":"24","DashSpeed":"","HorzDash:num":"16","VertDash:num":"16"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Options settings for this plugin's various features.
 * @default {"Options":"","AdjustRect:eval":"true","DustCloud":"","AddDustCloud:eval":"true","DustCloudName:str":"Dust Clouds","Footprints":"","AddFootprints:eval":"true","FootprintsName:str":"Footprint Marks","Footsteps":"","AddFootsteps:eval":"true","FootstepsName:str":"Footstep Sounds","SmoothCamera":"","AddSmoothCamera:eval":"true","SmoothCameraName:str":"Smooth Scroll"}
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
 * Dust Cloud Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DustCloud:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Are Dust Clouds enabled by default?
 * @default true
 * 
 * @param Appearance
 * 
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @param fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @param Animation
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @param startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @param startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 */
/* ----------------------------------------------------------------------------
 * Footprints Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footprints:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Are footprint marks enabled by default?
 * @default true
 *
 * @param Appearance
 *
 * @param startOpacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity of the footprint?
 * @default 64
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Appearance
 * @type number
 * @desc How many frames will footprints remain on the screen before disappearing?
 * @default 600
 *
 * @param followerVariance:num
 * @text Follower Variance
 * @parent Appearance
 * @type number
 * @desc What variance should followers have for their footprints?
 * This is to avoid them all stepping in the same place.
 * @default 4
 * 
 * @param MapDefaults
 * @text Map Defaults
 *
 * @param DefaultRegions:arraynum
 * @text Regions
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which Regions will have footprints appear by default?
 * @default []
 *
 * @param DefaultTerrainTags:arraynum
 * @text Terrain Tags
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which terrain tags will have footprints appear by default?
 * @default []
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"-4\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPattern:
 * 
 * @param pattern0:struct
 * @text Pattern 0 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern1:struct
 * @text Pattern 1 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern2:struct
 * @text Pattern 2 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern3:struct
 * @text Pattern 3 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern4:struct
 * @text Pattern 4 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern5:struct
 * @text Pattern 5 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern6:struct
 * @text Pattern 6 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern7:struct
 * @text Pattern 7 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern8:struct
 * @text Pattern 8 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern9:struct
 * @text Pattern 9 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern10:struct
 * @text Pattern 10 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPatternData:
 *
 * @param Appearance
 *
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for a footprint for this data.
 * If used, ignore generated footprint settings.
 * @default 
 *
 * @param Generated
 *
 * @param width:num
 * @text Width
 * @parent Generated
 * @type number
 * @desc What is the width of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param height:num
 * @text Height
 * @parent Generated
 * @type number
 * @desc What is the height of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this footprint.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this footprint.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Footsteps Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footsteps:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled by default?
 * @default true
 *
 * @param SoundByFrame:eval
 * @text Sound by Frame?
 * @parent General
 * @type boolean
 * @on Sounds by Frames
 * @off Sounds by Steps
 * @desc Play footstep sounds at certain sprite frames or with each tile step?
 * @default true
 *
 * @param Frames:arraynum
 * @text Audible Frame(s)
 * @parent SoundByFrame:eval
 * @type number[]
 * @desc Which sprite sheet "frames" will play a sound?
 * Sprite sheet Frames start at 0.
 * @default ["0","2"]
 *
 * @param FrameWalkModifier:num
 * @text Walk Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for walking?
 * This is to ensure the sound effects synch up.
 * @default 1.0
 *
 * @param FrameDashModifier:num
 * @text Dash Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for dashing?
 * This is to ensure the sound effects synch up.
 * @default 1.5
 *
 * @param Default
 * @text Default Sound
 * 
 * @param name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Blow2
 *
 * @param volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 10
 *
 * @param pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Distance
 *
 * @param distanceVolumeModifier:num
 * @text Volume Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.50
 *
 * @param distancePitchModifier:num
 * @text Pitch Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.00
 *
 * @param distancePanModifier:num
 * @text Pan Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use an integer value.
 * @default 5
 *
 * @param Actor
 * @text Actor Modifiers
 *
 * @param actorEnabled:eval
 * @text Enabled for Actors?
 * @parent Actor
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for actors by default?
 * @default true
 *
 * @param actorVolumeModifier:num
 * @text Volume Modifier
 * @parent Actor
 * @desc Volume modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param actorPitchModifier:num
 * @text Pitch Modifier
 * @parent Actor
 * @desc Pitch modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param Event
 * @text Event Modifiers
 *
 * @param eventEnabled:eval
 * @text Enabled for Events?
 * @parent Event
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for events by default?
 * @default true
 *
 * @param eventVolumeModifier:num
 * @text Volume Modifier
 * @parent Event
 * @desc Volume modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 * @param eventPitchModifier:num
 * @text Pitch Modifier
 * @parent Event
 * @desc Pitch modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Blink Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartBlink:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Blink?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Blinking?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 * 
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default -15
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Jump Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartJump:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Jump?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Jumping?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param HeightBasedRegions:arraynum
 * @text Height-Based Regions
 * @parent Mechanics
 * @type number[]
 * @min 0
 * @max 255
 * @desc Determine which regions are height-based.
 * The lowest value region will be a "ledge".
 * @default []
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Rush Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartRush:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Rush?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Rush?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default 15
 *
 * @param Shake
 * @text Crash Shake
 *
 * @param Enable:eval
 * @text Enable Crash Shake?
 * @parent Shake
 * @type boolean
 * @on Enable Crash Shake
 * @off Disable Crash Shake
 * @desc Cause the screen to shake after crashing into an entity?
 * @default true
 *
 * @param ShakePowerRate:num
 * @text Power Rate
 * @parent Shake
 * @desc The power modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeSpeedRate:num
 * @text Speed Rate
 * @parent Shake
 * @desc The speed modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeDuration:num
 * @text Shaking Duration
 * @parent Shake
 * @type number
 * @min 1
 * @desc How many frames will the screen shake last after crashing into something?
 * @default 20
 *
 * @param NonCrash
 * @text Non-Crash
 *
 * @param NonCrashRegions:arraynum
 * @text Regions
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 255
 * @desc When crashing into these region-marked tiles, do not shake the screen.
 * @default []
 *
 * @param NonCrashTerrainTags:arraynum
 * @text Terrain Tags
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 7
 * @desc When crashing into these terrain tagged tiles, do not shake the screen.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smooth Camera Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmoothCamera:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Is the Smooth Camera enabled by default?
 * @default true
 *
 * @param WalkSpeed
 * @text Walking Speed
 *
 * @param HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param DashSpeed
 * @text Dashing Speed
 *
 * @param HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @param VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
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
 * @param DustCloud
 * @text Dust Cloud
 *
 * @param AddDustCloud:eval
 * @text Add Option?
 * @parent DustCloud
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Dust Clouds' option to the Options menu?
 * @default true
 *
 * @param DustCloudName:str
 * @text Option Name
 * @parent DustCloud
 * @desc Command name of the option.
 * @default Dust Clouds
 *
 * @param Footprints
 * @text Footprint Marks
 *
 * @param AddFootprints:eval
 * @text Add Option?
 * @parent Footprints
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footprint Marks' option to the Options menu?
 * @default true
 *
 * @param FootprintsName:str
 * @text Option Name
 * @parent Footprints
 * @desc Command name of the option.
 * @default Footprint Marks
 *
 * @param Footsteps
 * @text Footstep Sounds
 *
 * @param AddFootsteps:eval
 * @text Add Option?
 * @parent Footsteps
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footstep Sounds' option to the Options menu?
 * @default true
 *
 * @param FootstepsName:str
 * @text Option Name
 * @parent Footsteps
 * @desc Command name of the option.
 * @default Footstep Sounds
 *
 * @param SmoothCamera
 * @text Smooth Camera
 *
 * @param AddSmoothCamera:eval
 * @text Add Option?
 * @parent SmoothCamera
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Smooth Scroll' option to the Options menu?
 * @default true
 *
 * @param SmoothCameraName:str
 * @text Option Name
 * @parent SmoothCamera
 * @desc Command name of the option.
 * @default Smooth Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Motion Trail Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MotionTrail:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Override?
 * @parent General
 * @type boolean
 * @on Override Settings
 * @off Don't Override Settings
 * @desc Override Motion Trail settings temporarily?
 * @default true
 *
 * @param Settings
 *
 * @param delay:num
 * @text Delay
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @param duration:num
 * @text Duration
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param hue:num
 * @text Hue
 * @parent Settings
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @param opacityStart:num
 * @text Starting Opacity
 * @parent Settings
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @param tone:eval
 * @text Tone
 * @parent Settings
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 */
//=============================================================================

function _0x2682(_0x47e372,_0xad0187){const _0x2d8c2f=_0x2d8c();return _0x2682=function(_0x268225,_0x30fc22){_0x268225=_0x268225-0x19b;let _0x1bf453=_0x2d8c2f[_0x268225];return _0x1bf453;},_0x2682(_0x47e372,_0xad0187);}const _0x5f4be9=_0x2682;(function(_0xc944c7,_0x8627d5){const _0x4965e4=_0x2682,_0x5fdc31=_0xc944c7();while(!![]){try{const _0x5e4007=parseInt(_0x4965e4(0x1db))/0x1*(parseInt(_0x4965e4(0x39f))/0x2)+-parseInt(_0x4965e4(0x3d6))/0x3+parseInt(_0x4965e4(0x29c))/0x4*(parseInt(_0x4965e4(0x27d))/0x5)+-parseInt(_0x4965e4(0x33e))/0x6*(parseInt(_0x4965e4(0x2e5))/0x7)+parseInt(_0x4965e4(0x32b))/0x8+-parseInt(_0x4965e4(0x259))/0x9*(-parseInt(_0x4965e4(0x31c))/0xa)+-parseInt(_0x4965e4(0x215))/0xb*(parseInt(_0x4965e4(0x1a0))/0xc);if(_0x5e4007===_0x8627d5)break;else _0x5fdc31['push'](_0x5fdc31['shift']());}catch(_0x45861c){_0x5fdc31['push'](_0x5fdc31['shift']());}}}(_0x2d8c,0x772d0));var label=_0x5f4be9(0x3fc),tier=tier||0x0,dependencies=[_0x5f4be9(0x350),_0x5f4be9(0x3e7)],pluginData=$plugins['filter'](function(_0x3b2efa){const _0x42f5a7=_0x5f4be9;return _0x3b2efa[_0x42f5a7(0x315)]&&_0x3b2efa[_0x42f5a7(0x317)]['includes']('['+label+']');})[0x0];function _0x2d8c(){const _0x166071=['449855BJnmjA','Game_Map_changeTileset','SmartBlinkNonLandRegions','canShowDustCloud','TerrainTagFootprintOpacity','lineTo','parseTerrainTagBasedFootprints','updateDustClouds','BlurDuration','makeData','createDustCloudBasics','Cooldown','updateMovementEffectsMotionTrails','RdAfX','footsteps','pzAQj','isInAirship','makeDeepCopy','initMovementEffectsMotionTrails','SMART_RUSH_SHAKE_POWER_RATE','_motionBlurMovementEffectsAngleOffset','EoNua','_lastSmoothScrollY','updateMotionTrailSprites','GetDirAngle','initRegionTerrainTagFootstepSounds','FootstepsVolRate','updateFootprintSprite','clamp','isMoving','FootprintsWidth','Sprite_Picture_updatePosition','ZuiMD','increaseSteps','SmartJumpNonPassEvent','dir%1','substring','femUU','paintOpacity','isSmartRushing','_dustCloudBitmap','moveBySmartRush','ARRAYFUNC','AngleOffset','RegionFootprintDuration','getDirMoveSpeedMod','isTileSmartHeightJumpRegion','POcAb','status','NoDustCloud','description','TNjMp','_smartJumpRestriction','Index','isPlayerSmartRushing','30xMHJwL','pan','SmartRush','beginPath','kDGIU','MZuNV','forbidden','pQOzp','IconSet','setupPageSettings','MotionTrailCreateForFollower','parseRegionBasedSmartRush','startShake','distanceVolumeModifier','smartBlinkMotionTrailData','2124400sQqlkL','SMART_BLINK_FILTER_DURATION','toUpperCase','_pictureContainer','_smartRushSwitches','XBgFT','STRUCT','JXiwZ','floor','endSmartRush','FootprintRegions','includes','_smartRushCooldown','initRegionTerrainTagSmartRush','GldNZ','updatePosition','Game_CharacterBase_animationWait','updateScrollSmoothCamera','tileset','90KtpeUw','DQvsL','rfBFv','eventsXy','setupRegionTerrainTagFootstepSounds','isTransparent','volume','isInVehicle','isMovementSucceeded','adjustY','setupRegionTerrainTagSmartJump','readFlag','isDashing','meetFootstepFrames','dustCloud','straightenFacedDirection','checkEventTriggerHere','random','VisuMZ_0_CoreEngine','isMapScrollLinked','_direction','test','_regionFootstepSounds','leader','isVisible','isSmartRushEnabled','updateSmartBlinkCooldown','DGQcM','dsFsZ','tOERL','isSmartRushCrashShake','TerrainTagFootprintDuration','_eventIconSprite','sHyQX','isSmartBlinkEnabled','isTileSmartBlinkNonPassable','uAnol','sfxPan','Game_CharacterBase_updatePattern','tone','updateWaitMode','sfxPitch','NoTerrainTagFootstepSfx','Game_Player_updateScroll','follower','addColorStop','FootprintsEnableDisable','followers','SmartMoveWaitForSmartJump','dir7','_spriteset','parseTerrainTagBasedSmartBlink','deltaYFrom','rPWDC','ConfigManager_makeData','Hdujy','DustCloud','Sprite_Character_initialize','moveByInput','canSmoothScroll','map','parseTerrainTagBasedSmartRush','NJipH','addMovementEffectsFootprintsCommand','SmartJumpNonLandRegions','playFootstepSound','myugB','Settings','poCOs','center','OnSuccessCommonEventID','Spriteset_Map_update','maxCommands','parseDirectionText','scrollRight','_smartBlinkRestrictions','NonLandableTerrainTags','EjDjK','dir6','Duration','reserveTransfer','canSmartJump','exit','_smartBlinkDistance','parseRegionBasedFootprints','initMembers','blendMode','smoothCamera','Game_Event_clearPageSettings','CKYnr','jdKNy','smooth','centerY','AddSmoothCamera','vQyYA','MotionBlurFollower','fpGBg','1488038IveHOT','SMART_RUSH_SHAKE_SPEED_RATE','isCollidedWithCharacters','createMotionBlurMovementEffectsFilter','smartBlinkRelocate','direction','_footprintSprites','indexOf','getLastPluginCommandInterpreter','MotionBlurFilter','setValue','NonCrashRegions','_refresh','Frames','realMoveSpeed','UVQqU','volumeRate','updateSmoothScrollingContainer','format','initMovementEffectsSmoothCamera','checkMovementEffectsStringTags','SMART_BLINK_FILTER_ANGLE_OFFSET','meetFootprintFrames','setupRegionTerrainTagSmartRush','isJumping','tileHeight','drawDustCloud','_footprintMarksEnabled','HorzDash','_smoothCamera','max','HorzWalk','dir2','generatedFootprintBitmap','canCreateDustCloud','SpeedRate','Gmpac','XRLgz','canMakeFootstepSounds','CQggi','Game_Interpreter_updateWaitMode','jump','JXutV','setupDuration','uFYNR','_smartRushMotionTrailData','code','_smartBlink','ForceFootsteps','ARRAYNUM','updateSmartMovementCooldowns','fill','FootprintsOffset','randomizeAnimationCount','picture','1439463FtWDpQ','FrameWalkModifier','_shiftY','_lastSmoothScrollX','version','areMotionTrailsEnabled','NxQCf','ClnQi','mRadialArcConstant','_motionBlurMovementEffectsFilter','Enabled','parseRegionBasedSmartBlink','JSON','isTileSmartBlinkNonLandable','dir8','playFootsteps','_motionTrailLastRealY','VisuMZ_1_EventsMoveCore','QTbDg','Game_Player_isDashing','QnSGx','xxuAq','_baseTexture','arc','followerVariance','note','notSmartJumpPassable','_realX','applyData','setDirMoveSpeedMod','footprintOpacityAtXy','vert','scale','nGhJp','lower\x20left','ConfigManager_applyData','_smartBlinkMotionTrailData','setWaitMode','MovementEffects','_smartJumpCooldown','Game_Event_setupPageSettings','animationWait','parseRegionBasedSmartJump','_bushDepth','create','frameCount','_tilemap','_targetScaleY','isSmartJumpRegionLowestHeight','adjustX','fillStyle','SMART_RUSH_FILTER_ANGLE_OFFSET','stringify','attachIconSprite','STR','enabled','Options','_footstepSoundsEnabled','centerX','updateSmartRushCooldown','setupRegionTerrainTagSmartBlink','footstepsData','FUNC','straightenDiagonal','_footsteps','canSmartRush','SmartBlinkNonPassTerrainTags','_scene','dMnJw','dir3','playOnceParallelInterpreter','_waitMode','visible','xbKnG','AHAlt','cHfMP','isSmartMoveNonViableState','wyeuv','event','hCoAN','footprintsData','SmartJumpNonPassTerrainTags','_followerOffsetX','ARRAYEVAL','_motionBlurMovementEffectsDuration','_followers','yDWSI','velocity','cHQQj','SmartRushAntiCrashRegions','Game_Picture_isMapScrollLinked','parseRegionBasedFootstepSounds','Tgtbk','radius','page','_baseSprite','iuTug','FrameDashModifier','smartJump','createBitmap','Rjquz','NoSmooth','data','motionTrailData','notSmartJumpLandable','scrolledX','ErvSk','delay','FootprintTerrainTags','erueA','_duration','randomInt','initialize','NoSmartBlink','_footprints','WpcNm','SmartJumpDistance','ShakePowerRate','SmartBlink','YesFootstepsEvent','UlGfN','addMovementEffectsFootstepsCommand','ymebD','startBattle','scrolledY','cos','fYmRH','ShakeDuration','_dustCloudSprites','QJGFU','copyBasicProperties','_smartJumpRestrictions','pattern','vhpzY','right','startSmartRushCrashShake','SmartMoveWaitForSmartRush','drawCircle','_dirMoveSpeedMod','kimOV','_erased','DefaultRegions','setDirection','BattleManager_startBattle','MotionTrailCreateForPlayer','terrainTag','isSmartJumping','setupMovementEffectsCommentTags','startSmartRushCrashWalkBack','initMovementEffectsVariables','setColorTone','moveTo','_dustCloudData','addCommand','TerrainTagFootstepSfx','match','EventID','isSmoothCameraEnabled','Game_CharacterBase_initMembers','_character','qYRLl','SfNKh','hCzcn','NoSmartRush','SmartJumpNonPassRegions','dustCloudData','parameters','wholeDuration','addGeneralOptions','startSmartJump','ceil','Walk','Game_Map_setup','updateScrollLinkedPosition','Game_CharacterBase_realMoveSpeed','QJkRq','isTileSmartJumpNonLandable','#000000','2552988ygxbdY','nonLand','GDrcz','YIZed','WHlFR','canShowMotionTrails','findTargetSprite','loadSystem','ZYCLy','setFootstepSoundsEnabled','Distance','footprintDurationAtXy','lzSLC','isTrueMapScrollLinked','filters','setup','createFootprintForTarget','actor','NonPassableRegions','SmoothCamera','createMotionTrailContainers','startOpacity','Dash','seZaL','list','duration','changeTileset','canMakeFootprints','NoRegionFootstepSfx','_footprintsData','setSmartRushSwitch','isSmartJumpEnabled','MovementEffectsOptions','SmartRushAntiCrashTerrainTags','isOnLadder','Sprite_Character_update','straighten','createDustCloud','prototype','ApplyFootstepSfxModifiers','wXGww','trim','ConfigKeys','canSmartBlink','opacityStart','push','createLowerLayer','setupRegionTerrainTagFootprints','NoFootsteps','playSe','kjWaW','SMART_RUSH_FILTER_DURATION','_pattern','isHeightBasedRegion','anchor','QnwHr','initRegionTerrainTagSmartJump','lHxQL','NXNfG','1svRIfy','QBDRu','QcEBT','SMART_RUSH_SHAKE_ENABLED','Scene_Options_maxCommands','ForceSmooth','requestAnimation','FootstepsName','filename','createDustCloudForTarget','hexToRgba','setDustCloudData','AddFootprints','pattern%1','Enable','_motionTrailExpiredSprites','setMotionTrailSettings','applyFootstepSoundTileChanges','hfZSo','locate','updateOpacity','zpNSY','_terrainTagFootstepSounds','_wasEventScrolling','_smartJumpMotionTrailData','HRGim','height','MotionTrail','Spriteset_Map_createLowerLayer','setupMovementEffectsVariables','_opacityRate','createFootprint','roundXWithDirection','ARRAYSTR','NonFootprintTerrainTags','_jumpPeak','actorPitchModifier','YgsPt','registerCommand','rgba(0,0,0,0)','RegExp','origin','qVFWI','sin','distancePanModifier','_targetScaleX','setSmoothCameraEnabled','_animationCount','createMotionTrailSprite','_smartBlinkCooldown','upper\x20left','soundFrames','Game_CharacterBase_straighten','initMovementEffectsDustCloud','updateDustCloudSprite','nnWIr','tIbLX','split','11ppfvJn','SmoothCameraSpeedChange','meetsSmartJumpHeightConditions','Footprints','byAfo','sfxName','parse','eventPitchModifier','horz','NonCrashTerrainTags','isPassableByAnyDirection','NUM','SmartBlinkNonPassRegions','eventEnabled','isValid','Game_Player_moveByInput','bind','VnzcJ','updateFootprints','addChild','setupIconSprite','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateSmartJumpState','createRadialGradient','copyBitmapFrame','zeYGp','clone','eventVolumeModifier','measureSmartJumpDistance','updateAnimationCount','wwNYH','VertDash','hasStepAnime','AddFootsteps','WSmPj','updatePattern','MotionBlurEvent','RegionFootstepSfx','YesFootprintsEvent','constructor','NoFootstepsEvent','join','ForceDustCloud','width','actorEnabled','isSmartMoving','SmoothCameraEnableDisable','addMovementEffectsOptionCommands','smartJumpMotionTrailData','FootstepsPitchRate','SmartJumpHeightBasedRegions','tileWidth','lower\x20right','BXSAS','RegionFootprintOpacity','allowed','SmartJumpNonLandTerrainTags','startScale','AdjustRect','kQvgp','pitch','nvPuG','MotionTrailSettingsChangeFollower','poAqI','_jumpHeight','IzzHZ','getSmoothCameraSpeed','CatchAll','1000953FMDCml','_motionTrailSprites','ImmediateCreate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','HxDzY','bitmap','isAnimationPlaying','SmartBlinkDistance','distancePitchModifier','_followerOffsetY','loadPicture','_dustCloud','dir1','initMovementEffectsDirMoveSpeedMod','zCjvb','isSceneMap','SmartBlinkNonLandTerrainTags','addMovementEffectsDustCloudCommand','createSmartBlinkMotionTrailSprite','rgba(','offsetX','setupOpacity','NonLandableRegions','initRegionTerrainTagSmartBlink','parseTerrainTagBasedFootstepSounds','getStraightenDiagonalDirection','RKIam','smartRush','addMovementEffectsSmoothCameraCommand','initMovementEffectsFootstepSounds','_motionTrailLastRealX','dir9','SmartRushDistance','_ready','pop','concat','5mGifHw','hue','SoundByFrame','updateMotionBlurEffectFilter','Game_System_initialize','applyMotionTrailData','HLYNk','roundYWithDirection','length','_smartRushMode','eHzMK','Footsteps','lLaRK','dir4','abs','update','DustCloudName','updateSmartJumpCooldown','enableMotionTrails','processSmartJumpHeightFactor','measureSmartBlinkDistance','checkDustCloudChanges','actorVolumeModifier','XGxmH','_smartJumpMode','SmoothCameraName','shiftY','_smartJump','executeMove','color','jCDdY','3205876CRaROb','parseTerrainTagBasedSmartJump','ConvertParams','LedgeJumpRegion','isPlayFootstepSoundsByFrame','HeightBasedRegions','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','fullness','EVAL','removeChild','_realY','down','MotionTrailEnablePlayer','Game_Follower_initialize','FtKqk','setHue','allowDiagonal','Game_Player_reserveTransfer','createDustCloudBitmap','MotionTrailCreateForEvent','FootprintsName','_footstepCooldownDuration','NonPassableTerrainTags','_smartRush','ApplyFollowers','AnimationID','_frame','remove','SmartJumpLedgeRegion','eventId','regions','name','left','setupMovementEffectsNotetags','footprints','smartBlink','updateScroll','mMSIS','initMovementEffectsFootprintMarks','setSmoothCameraSpeed','regionId','isSmartRushCrashShakeTile','startMotionBlurEffect','oXONZ','SmartJump','_smartRushSpeedRate','Game_CharacterBase_increaseSteps','terrainTags','MotionTrailEnableEvent','SMART_RUSH_SHAKE_DURATION','call','MotionBlurPlayer','qmGPE','OvEFO','xOMHJ','VertWalk','opacity','setFootprintsEnabled','pitchRate','DustCloudChangeSettings','Window_Options_addGeneralOptions','SmartDirMoveSpeedMod','isUsingSmoothCamera','scrollUp','createFootprintBasics','AddDustCloud','_motionTrailSettings','context','vENCH','smartRushMotionTrailData','rlnnk','_cached_GeneratedFootprint_Image','vfuly'];_0x2d8c=function(){return _0x166071;};return _0x2d8c();}VisuMZ[label][_0x5f4be9(0x381)]=VisuMZ[label][_0x5f4be9(0x381)]||{},VisuMZ[_0x5f4be9(0x29e)]=function(_0x1ae3c8,_0xe8465d){const _0x13e429=_0x5f4be9;for(const _0x43236d in _0xe8465d){if(_0x43236d[_0x13e429(0x471)](/(.*):(.*)/i)){const _0x3047fe=String(RegExp['$1']),_0x25afd2=String(RegExp['$2'])[_0x13e429(0x32d)]()[_0x13e429(0x1c9)]();let _0x385b54,_0x939f71,_0x132fef;switch(_0x25afd2){case _0x13e429(0x220):_0x385b54=_0xe8465d[_0x43236d]!==''?Number(_0xe8465d[_0x43236d]):0x0;break;case _0x13e429(0x3d0):_0x939f71=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71[_0x13e429(0x37a)](_0x2d6485=>Number(_0x2d6485));break;case _0x13e429(0x2a4):_0x385b54=_0xe8465d[_0x43236d]!==''?eval(_0xe8465d[_0x43236d]):null;break;case _0x13e429(0x429):_0x939f71=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71['map'](_0x21ee8c=>eval(_0x21ee8c));break;case _0x13e429(0x3e2):_0x385b54=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):'';break;case'ARRAYJSON':_0x939f71=_0xe8465d[_0x43236d]!==''?JSON['parse'](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71[_0x13e429(0x37a)](_0x5dcf8e=>JSON[_0x13e429(0x21b)](_0x5dcf8e));break;case _0x13e429(0x414):_0x385b54=_0xe8465d[_0x43236d]!==''?new Function(JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d])):new Function('return\x200');break;case _0x13e429(0x30f):_0x939f71=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71[_0x13e429(0x37a)](_0x3295d5=>new Function(JSON[_0x13e429(0x21b)](_0x3295d5)));break;case _0x13e429(0x40c):_0x385b54=_0xe8465d[_0x43236d]!==''?String(_0xe8465d[_0x43236d]):'';break;case _0x13e429(0x1fc):_0x939f71=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71[_0x13e429(0x37a)](_0xb883db=>String(_0xb883db));break;case _0x13e429(0x331):_0x132fef=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):{},_0x385b54=VisuMZ[_0x13e429(0x29e)]({},_0x132fef);break;case'ARRAYSTRUCT':_0x939f71=_0xe8465d[_0x43236d]!==''?JSON[_0x13e429(0x21b)](_0xe8465d[_0x43236d]):[],_0x385b54=_0x939f71[_0x13e429(0x37a)](_0x40fd88=>VisuMZ[_0x13e429(0x29e)]({},JSON[_0x13e429(0x21b)](_0x40fd88)));break;default:continue;}_0x1ae3c8[_0x3047fe]=_0x385b54;}}return _0x1ae3c8;},(_0x4ebd3d=>{const _0x234c73=_0x5f4be9,_0x429bfc=_0x4ebd3d[_0x234c73(0x2bb)];for(const _0x3fffbb of dependencies){if(_0x234c73(0x421)!==_0x234c73(0x421))_0x438cdc[_0x234c73(0x3fc)][_0x234c73(0x1f7)][_0x234c73(0x2ce)](this),this['createDustCloudBasics'](),this['createFootprintBasics'](),this[_0x234c73(0x1b4)]();else{if(!Imported[_0x3fffbb]){alert(_0x234c73(0x2a2)[_0x234c73(0x3b1)](_0x429bfc,_0x3fffbb)),SceneManager[_0x234c73(0x390)]();break;}}}const _0x345418=_0x4ebd3d[_0x234c73(0x317)];if(_0x345418[_0x234c73(0x471)](/\[Version[ ](.*?)\]/i)){if('AXYvs'!==_0x234c73(0x1a4)){const _0xef5930=Number(RegExp['$1']);if(_0xef5930!==VisuMZ[label][_0x234c73(0x3da)]){if(_0x234c73(0x39c)!==_0x234c73(0x39c))for(const _0x5f5d11 of _0x1178c7){_0x5f5d11[_0x234c73(0x471)](_0x32c71b['NoTerrainTagFootstepSfx']);const _0xe16e18=_0x153653(_0x5c8382['$1'])[_0x234c73(0x301)](0x0,0x7);this[_0x234c73(0x1f1)][_0xe16e18]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else alert(_0x234c73(0x25c)['format'](_0x429bfc,_0xef5930)),SceneManager[_0x234c73(0x390)]();}}else this[_0x234c73(0x26b)]();}if(_0x345418[_0x234c73(0x471)](/\[Tier[ ](\d+)\]/i)){const _0xed53e1=Number(RegExp['$1']);if(_0xed53e1<tier){if(_0x234c73(0x219)===_0x234c73(0x219))alert(_0x234c73(0x22a)[_0x234c73(0x3b1)](_0x429bfc,_0xed53e1,tier)),SceneManager[_0x234c73(0x390)]();else{if(this[_0x234c73(0x298)]===_0x32d7ce)this[_0x234c73(0x348)]();const _0x306155=this[_0x234c73(0x298)]['HeightBasedRegions'][_0x234c73(0x3a6)](_0x40081f);return _0x306155===0x0;}}else{if(_0x234c73(0x3c9)==='eBDUW'){_0x565a35=_0x4ca268||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this['_smartBlinkRestrictions']=_0x155ff6[_0x234c73(0x2f6)](_0x4e0084),_0x5e04a1=this[_0x234c73(0x291)](_0x96f7a||0x1);if(!this[_0x234c73(0x1cb)](_0x453c3a))return![];const _0x4359e5=_0x43cfc1[_0x234c73(0x3fc)]['Settings'][_0x234c73(0x44c)];return this[_0x234c73(0x34d)](_0x4359e5),this[_0x234c73(0x391)]=_0x2d5a1e||0x1,this[_0x234c73(0x20c)]=_0x47a8e7||0x1,this[_0x234c73(0x3fa)]=_0x10662d[_0x234c73(0x2f6)](_0x2fc2c3),this[_0x234c73(0x3a3)](_0x1ccd13),!![];}else tier=Math[_0x234c73(0x3bd)](_0xed53e1,tier);}}VisuMZ[_0x234c73(0x29e)](VisuMZ[label]['Settings'],_0x4ebd3d[_0x234c73(0x47c)]);})(pluginData),PluginManager[_0x5f4be9(0x201)](pluginData['name'],'DustCloudEnableDisable',_0x5932df=>{const _0x413ebf=_0x5f4be9;VisuMZ[_0x413ebf(0x29e)](_0x5932df,_0x5932df);const _0x29a9f3=_0x5932df[_0x413ebf(0x1e9)];$gameSystem[_0x413ebf(0x47b)]()[_0x413ebf(0x40d)]=_0x29a9f3;}),PluginManager['registerCommand'](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x2d7),_0x30b4b5=>{const _0x23e1a6=_0x5f4be9;VisuMZ[_0x23e1a6(0x29e)](_0x30b4b5,_0x30b4b5);const _0x52d57f=JsonEx[_0x23e1a6(0x2f6)](_0x30b4b5);_0x52d57f[_0x23e1a6(0x40d)]=$gameSystem[_0x23e1a6(0x2e8)](),$gameSystem[_0x23e1a6(0x1e6)](_0x52d57f);}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x36c),_0x4972e8=>{const _0x5033ef=_0x5f4be9;VisuMZ[_0x5033ef(0x29e)](_0x4972e8,_0x4972e8);const _0x11ea12=_0x4972e8[_0x5033ef(0x1e9)];$gameSystem[_0x5033ef(0x2d5)](_0x11ea12);}),PluginManager['registerCommand'](pluginData['name'],'FootstepsEnableDisable',_0x57db83=>{const _0xd5e3cf=_0x5f4be9;VisuMZ[_0xd5e3cf(0x29e)](_0x57db83,_0x57db83);const _0x534ba7=_0x57db83[_0xd5e3cf(0x1e9)];$gameSystem[_0xd5e3cf(0x1a9)](_0x534ba7);}),PluginManager['registerCommand'](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x2cf),_0x2a5afd=>{const _0x5f5df2=_0x5f4be9;if(!SceneManager[_0x5f5df2(0x268)]())return;const _0x4f1638=SceneManager[_0x5f5df2(0x419)][_0x5f5df2(0x370)];if(!_0x4f1638)return;VisuMZ[_0x5f5df2(0x29e)](_0x2a5afd,_0x2a5afd);const _0x73141f=_0x2a5afd[_0x5f5df2(0x38d)]||0x1,_0x182d0b=_0x2a5afd[_0x5f5df2(0x310)]||0x0;let _0x319725=[$gamePlayer];if(_0x2a5afd['ApplyFollowers']){if('pDOUo'===_0x5f5df2(0x1d9)){const _0x140d83=this['_eventIconSprite'],_0x58652b=this[_0x5f5df2(0x435)][_0x5f5df2(0x35e)];_0x140d83['x']=_0x58652b['x'],_0x140d83['y']=_0x58652b['y'],_0x140d83[_0x5f5df2(0x2b6)]=_0x181b6c[_0x5f5df2(0x21b)](_0x2dbdb5[_0x5f5df2(0x40a)](_0x58652b[_0x5f5df2(0x2b6)])),_0x140d83['_refresh']();}else _0x319725=_0x319725[_0x5f5df2(0x27c)]($gamePlayer[_0x5f5df2(0x36d)]()[_0x5f5df2(0x43c)]());}for(const _0x1e536a of _0x319725){if(_0x5f5df2(0x2c1)!==_0x5f5df2(0x2c1))return this['_smartJumpMotionTrailData']||{'enabled':![]};else{if(!_0x1e536a)continue;const _0x465dee=_0x4f1638[_0x5f5df2(0x1a6)](_0x1e536a);_0x465dee&&(_0x5f5df2(0x3cb)==='eYrkG'?this[_0x5f5df2(0x3ce)]['NonPassableTerrainTags']=_0x260b0e['$1'][_0x5f5df2(0x214)](',')[_0x5f5df2(0x37a)](_0x2d543d=>(_0xa11f23(_0x2d543d)||0x0)['clamp'](0x0,0x7)):_0x465dee[_0x5f5df2(0x2c6)](_0x73141f,_0x182d0b));}}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],_0x5f4be9(0x39d),_0x3562c6=>{const _0x87cf58=_0x5f4be9;if(!SceneManager[_0x87cf58(0x268)]())return;const _0x1257af=SceneManager['_scene'][_0x87cf58(0x370)];if(!_0x1257af)return;VisuMZ[_0x87cf58(0x29e)](_0x3562c6,_0x3562c6);const _0x31ebb5=_0x3562c6[_0x87cf58(0x38d)]||0x1,_0x2598b6=_0x3562c6[_0x87cf58(0x310)]||0x0,_0x517fc2=_0x3562c6[_0x87cf58(0x31a)];let _0x2c9c4e=_0x517fc2[_0x87cf58(0x37a)](_0x3033a3=>$gamePlayer[_0x87cf58(0x36d)]()[_0x87cf58(0x36a)](_0x3033a3));for(const _0x11fbb0 of _0x2c9c4e){if(!_0x11fbb0)continue;const _0x4d4295=_0x1257af[_0x87cf58(0x1a6)](_0x11fbb0);_0x4d4295&&(_0x87cf58(0x237)!==_0x87cf58(0x3c6)?_0x4d4295['startMotionBlurEffect'](_0x31ebb5,_0x2598b6):(_0x4d97e5[_0x87cf58(0x3fc)][_0x87cf58(0x364)][_0x87cf58(0x2ce)](this),this[_0x87cf58(0x3b5)]()&&this[_0x87cf58(0x1bb)]()&&this[_0x87cf58(0x1fa)](),this['meetFootstepFrames']()&&this[_0x87cf58(0x3c5)]()&&this[_0x87cf58(0x37f)]()));}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x239),_0x4c7235=>{const _0x2af218=_0x5f4be9;if(!SceneManager[_0x2af218(0x268)]())return;const _0x175588=SceneManager[_0x2af218(0x419)]['_spriteset'];if(!_0x175588)return;VisuMZ['ConvertParams'](_0x4c7235,_0x4c7235);const _0x5c54de=_0x4c7235[_0x2af218(0x38d)]||0x1,_0x22cd5c=_0x4c7235[_0x2af218(0x310)]||0x0,_0x11649b=_0x4c7235[_0x2af218(0x472)],_0x2e2bb8=$gameTemp[_0x2af218(0x3a7)]();let _0x460946=_0x11649b[_0x2af218(0x37a)](_0x5cfe78=>$gameMap[_0x2af218(0x424)](_0x5cfe78||_0x2e2bb8[_0x2af218(0x2b9)]()));for(const _0x1929b2 of _0x460946){if(!_0x1929b2)continue;const _0x19ece3=_0x175588[_0x2af218(0x1a6)](_0x1929b2);_0x19ece3&&_0x19ece3[_0x2af218(0x2c6)](_0x5c54de,_0x22cd5c);}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x466),_0x540f51=>{const _0x1fe6a5=_0x5f4be9;if(!SceneManager[_0x1fe6a5(0x268)]())return;const _0x334da1=SceneManager['_scene'][_0x1fe6a5(0x370)];if(!_0x334da1)return;VisuMZ[_0x1fe6a5(0x29e)](_0x540f51,_0x540f51);let _0x29087a=[$gamePlayer];if(_0x540f51['ApplyFollowers']){if(_0x1fe6a5(0x254)===_0x1fe6a5(0x254))_0x29087a=_0x29087a['concat']($gamePlayer[_0x1fe6a5(0x36d)]()[_0x1fe6a5(0x43c)]());else{const _0x170fb0=_0x1ab9c5[_0x1fe6a5(0x433)],_0x2eb314=_0x170fb0*0x2,_0x1c050a=new _0x4e2c14(_0x2eb314,_0x2eb314),_0x190a78=_0x32a152[_0x1fe6a5(0x29a)],_0x4a57c4=_0x1e74f6[_0x1fe6a5(0x2a3)];_0x1c050a[_0x1fe6a5(0x3b9)](_0x170fb0,_0x190a78,_0x4a57c4),this['_dustCloudBitmap']=_0x1c050a;}}for(const _0x18f886 of _0x29087a){if(!_0x18f886)continue;const _0x5e3c34=_0x334da1[_0x1fe6a5(0x1a6)](_0x18f886);_0x5e3c34&&_0x5e3c34[_0x1fe6a5(0x20b)]();}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],_0x5f4be9(0x326),_0x59e87e=>{const _0x401b4b=_0x5f4be9;if(!SceneManager[_0x401b4b(0x268)]())return;const _0x2c6e51=SceneManager[_0x401b4b(0x419)][_0x401b4b(0x370)];if(!_0x2c6e51)return;VisuMZ[_0x401b4b(0x29e)](_0x59e87e,_0x59e87e);const _0x3ceebc=_0x59e87e[_0x401b4b(0x31a)];let _0xd13f91=_0x3ceebc[_0x401b4b(0x37a)](_0x481663=>$gamePlayer[_0x401b4b(0x36d)]()[_0x401b4b(0x36a)](_0x481663));for(const _0x14951e of _0xd13f91){if(!_0x14951e)continue;const _0x2c05b0=_0x2c6e51[_0x401b4b(0x1a6)](_0x14951e);_0x2c05b0&&_0x2c05b0[_0x401b4b(0x20b)]();}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],_0x5f4be9(0x2af),_0x1ddc0f=>{const _0x436ea9=_0x5f4be9;if(!SceneManager[_0x436ea9(0x268)]())return;const _0x4bc9f3=SceneManager[_0x436ea9(0x419)][_0x436ea9(0x370)];if(!_0x4bc9f3)return;VisuMZ[_0x436ea9(0x29e)](_0x1ddc0f,_0x1ddc0f);const _0x738277=_0x1ddc0f[_0x436ea9(0x472)],_0x3fee45=$gameTemp[_0x436ea9(0x3a7)]();let _0x2d6269=_0x738277[_0x436ea9(0x37a)](_0x54297a=>$gameMap[_0x436ea9(0x424)](_0x54297a||_0x3fee45[_0x436ea9(0x2b9)]()));for(const _0x3e8acf of _0x2d6269){if(!_0x3e8acf)continue;const _0x2b0ac6=_0x4bc9f3[_0x436ea9(0x1a6)](_0x3e8acf);_0x2b0ac6&&(_0x436ea9(0x420)!=='wJyHT'?_0x2b0ac6[_0x436ea9(0x20b)]():this[_0x436ea9(0x2d4)]=0x0);}}),PluginManager['registerCommand'](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x2a8),_0x289083=>{const _0x73f000=_0x5f4be9;if(!SceneManager[_0x73f000(0x268)]())return;VisuMZ['ConvertParams'](_0x289083,_0x289083);const _0x43aba0=_0x289083[_0x73f000(0x1e9)],_0x4c3244=_0x289083[_0x73f000(0x25b)];let _0x3784bb=[$gamePlayer];_0x289083[_0x73f000(0x2b4)]&&(_0x3784bb=_0x3784bb[_0x73f000(0x27c)]($gamePlayer[_0x73f000(0x36d)]()[_0x73f000(0x43c)]()));for(const _0x470f56 of _0x3784bb){if(!_0x470f56)continue;_0x470f56['enableMotionTrails'](_0x43aba0,_0x4c3244);}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],'MotionTrailEnableFollower',_0x3802ab=>{const _0x252a2f=_0x5f4be9;if(!SceneManager[_0x252a2f(0x268)]())return;VisuMZ[_0x252a2f(0x29e)](_0x3802ab,_0x3802ab);const _0x369eab=_0x3802ab[_0x252a2f(0x1e9)],_0x5966b3=_0x3802ab[_0x252a2f(0x25b)],_0x1ddada=_0x3802ab[_0x252a2f(0x31a)];let _0x5ef58a=_0x1ddada[_0x252a2f(0x37a)](_0x27443b=>$gamePlayer[_0x252a2f(0x36d)]()['follower'](_0x27443b));for(const _0x5a3224 of _0x5ef58a){if(!_0x5a3224)continue;_0x5a3224[_0x252a2f(0x28f)](_0x369eab,_0x5966b3);}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x2cc),_0x46c888=>{const _0x510413=_0x5f4be9;if(!SceneManager[_0x510413(0x268)]())return;VisuMZ[_0x510413(0x29e)](_0x46c888,_0x46c888);const _0x14c4ee=_0x46c888[_0x510413(0x1e9)],_0x1a2d24=_0x46c888[_0x510413(0x25b)],_0x1ced2d=_0x46c888['EventID'],_0x4b7eb5=$gameTemp[_0x510413(0x3a7)]();let _0x383140=_0x1ced2d[_0x510413(0x37a)](_0x244291=>$gameMap[_0x510413(0x424)](_0x244291||_0x4b7eb5[_0x510413(0x2b9)]()));for(const _0x23221 of _0x383140){if(!_0x23221)continue;_0x23221[_0x510413(0x28f)](_0x14c4ee,_0x1a2d24);}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],'MotionTrailSettingsChangePlayer',_0x11cbe5=>{const _0x4f8a4d=_0x5f4be9;if(!SceneManager[_0x4f8a4d(0x268)]())return;VisuMZ[_0x4f8a4d(0x29e)](_0x11cbe5,_0x11cbe5);const _0x20ba1f={'enabled':![],'delay':_0x11cbe5['delay']||0x1,'duration':_0x11cbe5[_0x4f8a4d(0x1b9)]||0x1,'hue':_0x11cbe5[_0x4f8a4d(0x27e)]||0x0,'opacityStart':_0x11cbe5[_0x4f8a4d(0x1cc)]||0x0,'tone':_0x11cbe5[_0x4f8a4d(0x365)]||[0x0,0x0,0x0,0x0]};let _0x2b1340=[$gamePlayer];_0x11cbe5['ApplyFollowers']&&(_0x2b1340=_0x2b1340['concat']($gamePlayer[_0x4f8a4d(0x36d)]()[_0x4f8a4d(0x43c)]()));for(const _0x5075a7 of _0x2b1340){if('wwNYH'!==_0x4f8a4d(0x233))for(const _0x318ef3 of _0xed77aa){_0x318ef3[_0x4f8a4d(0x471)](_0x4b3fdb[_0x4f8a4d(0x470)]);const _0x2af0f3=_0x22164e(_0x138035['$1'])[_0x4f8a4d(0x301)](0x0,0xff),_0x355f12=_0x1ce776(_0x28c18c['$2'])[_0x4f8a4d(0x214)](',')['map'](_0xf97945=>_0xf97945[_0x4f8a4d(0x1c9)]());this[_0x4f8a4d(0x1f1)][_0x2af0f3]={'name':_0x355f12[0x0]||'','volume':_0x1222a3(_0x355f12[0x1]??_0x4e3b0c[_0x4f8a4d(0x344)]),'pitch':_0x18df1f(_0x355f12[0x2]??_0x5a5136[_0x4f8a4d(0x251)]),'pan':_0x10c471(_0x355f12[0x3]??_0x208fdf[_0x4f8a4d(0x31d)])};}else{if(!_0x5075a7)continue;_0x5075a7[_0x4f8a4d(0x1eb)](_0x20ba1f);}}}),PluginManager['registerCommand'](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x253),_0x314f48=>{const _0x55b2d4=_0x5f4be9;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x314f48,_0x314f48);const _0x355995={'enabled':![],'delay':_0x314f48['delay']||0x1,'duration':_0x314f48[_0x55b2d4(0x1b9)]||0x1,'hue':_0x314f48[_0x55b2d4(0x27e)]||0x0,'opacityStart':_0x314f48[_0x55b2d4(0x1cc)]||0x0,'tone':_0x314f48[_0x55b2d4(0x365)]||[0x0,0x0,0x0,0x0]},_0x5617b4=_0x314f48['Index'];let _0x431286=_0x5617b4[_0x55b2d4(0x37a)](_0x35ccbb=>$gamePlayer['followers']()[_0x55b2d4(0x36a)](_0x35ccbb));for(const _0x30a771 of _0x431286){if(!_0x30a771)continue;_0x30a771[_0x55b2d4(0x1eb)](_0x355995);}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],'MotionTrailSettingsChangeEvent',_0x2ddebc=>{const _0x108a7d=_0x5f4be9;if(!SceneManager[_0x108a7d(0x268)]())return;VisuMZ[_0x108a7d(0x29e)](_0x2ddebc,_0x2ddebc);const _0x4ce634={'enabled':![],'delay':_0x2ddebc[_0x108a7d(0x441)]||0x1,'duration':_0x2ddebc[_0x108a7d(0x1b9)]||0x1,'hue':_0x2ddebc['hue']||0x0,'opacityStart':_0x2ddebc[_0x108a7d(0x1cc)]||0x0,'tone':_0x2ddebc[_0x108a7d(0x365)]||[0x0,0x0,0x0,0x0]},_0x3cc563=_0x2ddebc[_0x108a7d(0x472)],_0x4c40eb=$gameTemp[_0x108a7d(0x3a7)]();let _0x544061=_0x3cc563[_0x108a7d(0x37a)](_0x15c14a=>$gameMap[_0x108a7d(0x424)](_0x15c14a||_0x4c40eb[_0x108a7d(0x2b9)]()));for(const _0x2b6d0f of _0x544061){if('uhyvl'!==_0x108a7d(0x436)){if(!_0x2b6d0f)continue;_0x2b6d0f[_0x108a7d(0x1eb)](_0x4ce634);}else{const _0x21a03b=_0x6b9c2f[_0x108a7d(0x32c)],_0x4a94a1=_0x4a0a0e[_0x108a7d(0x3b4)];_0x2e04a8[_0x108a7d(0x2c6)](_0x21a03b,_0x4a94a1);}}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x2d9),_0x236df2=>{const _0x533760=_0x5f4be9;if(!SceneManager[_0x533760(0x268)]())return;VisuMZ['ConvertParams'](_0x236df2,_0x236df2);const _0x4adda3={'slower':-0x1,'normal':0x0,'faster':0x1};for(let _0x2b734a=0x1;_0x2b734a<0xa;_0x2b734a++){if(_0x2b734a===0x5)continue;const _0x43d4eb='dir%1'[_0x533760(0x3b1)](_0x2b734a),_0x8cd7ef=(_0x236df2[_0x43d4eb]||'normal')['toLowerCase']()[_0x533760(0x1c9)](),_0x112269=_0x4adda3[_0x8cd7ef]||0x0;$gameSystem[_0x533760(0x3f3)](_0x2b734a,_0x112269);}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],_0x5f4be9(0x260),_0x4bb928=>{const _0x3469bb=_0x5f4be9;if(!SceneManager[_0x3469bb(0x268)]())return;VisuMZ['ConvertParams'](_0x4bb928,_0x4bb928);const _0x1dd634=_0x4bb928[_0x3469bb(0x1aa)]||0x1,_0x39b412=_0x4bb928[_0x3469bb(0x2f0)]||0x1,_0x2afa6a=_0x4bb928[_0x3469bb(0x384)]||0x0,_0xd66723={'NonLandableRegions':_0x4bb928['NonLandableRegions'][_0x3469bb(0x22f)](),'NonLandableTerrainTags':_0x4bb928[_0x3469bb(0x38a)][_0x3469bb(0x22f)](),'NonPassableRegions':_0x4bb928[_0x3469bb(0x1b2)][_0x3469bb(0x22f)](),'NonPassableTerrainTags':_0x4bb928[_0x3469bb(0x2b2)][_0x3469bb(0x22f)]()},_0x509abd=_0x4bb928[_0x3469bb(0x2b5)]||0x0,_0x205a08=_0x4bb928['MotionTrail']||{'enabled':![]},_0x30c866={'name':_0x4bb928[_0x3469bb(0x21a)]||'','volume':_0x4bb928['sfxVolume']||0x0,'pitch':_0x4bb928[_0x3469bb(0x367)]||0x0,'pan':_0x4bb928['sfxPan']||0x0};if($gamePlayer[_0x3469bb(0x2bf)](_0x1dd634,_0x39b412,_0xd66723,_0x205a08)){_0x30c866[_0x3469bb(0x2bb)]!==''&&AudioManager[_0x3469bb(0x1d1)](_0x30c866);if(_0x509abd>0x0){if('EyDOI'!==_0x3469bb(0x323))$gameTemp[_0x3469bb(0x1e1)]([$gamePlayer],_0x509abd);else return this[_0x3469bb(0x30c)]()||this[_0x3469bb(0x468)]();}_0x2afa6a>0x0&&SceneManager[_0x3469bb(0x419)]['playOnceParallelInterpreter'](_0x2afa6a);}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],_0x5f4be9(0x44a),_0x123c6e=>{const _0x2498e1=_0x5f4be9;if(!SceneManager[_0x2498e1(0x268)]())return;VisuMZ[_0x2498e1(0x29e)](_0x123c6e,_0x123c6e);const _0x5b06e4=_0x123c6e[_0x2498e1(0x1aa)]||0x1,_0x34b407=_0x123c6e['Cooldown']||0x1,_0x4b0284=_0x123c6e[_0x2498e1(0x384)]||0x0,_0x3bebbb={'NonLandableRegions':_0x123c6e['NonLandableRegions'][_0x2498e1(0x22f)](),'NonLandableTerrainTags':_0x123c6e[_0x2498e1(0x38a)]['clone'](),'NonPassableRegions':_0x123c6e[_0x2498e1(0x1b2)]['clone'](),'NonPassableTerrainTags':_0x123c6e[_0x2498e1(0x2b2)][_0x2498e1(0x22f)]()},_0x3456d2=_0x123c6e[_0x2498e1(0x2b5)]||0x0,_0x3849c7=_0x123c6e[_0x2498e1(0x1f6)]||{'enabled':![]},_0x544cbf={'name':_0x123c6e[_0x2498e1(0x21a)]||'','volume':_0x123c6e['sfxVolume']||0x0,'pitch':_0x123c6e[_0x2498e1(0x367)]||0x0,'pan':_0x123c6e[_0x2498e1(0x363)]||0x0};if($gamePlayer[_0x2498e1(0x438)](_0x5b06e4,_0x34b407,_0x3bebbb,_0x3849c7)){if('lLaRK'===_0x2498e1(0x289))_0x544cbf[_0x2498e1(0x2bb)]!==''&&AudioManager[_0x2498e1(0x1d1)](_0x544cbf),_0x3456d2>0x0&&$gameTemp[_0x2498e1(0x1e1)]([$gamePlayer],_0x3456d2),_0x4b0284>0x0&&SceneManager[_0x2498e1(0x419)]['playOnceParallelInterpreter'](_0x4b0284);else{_0xc5abc7[_0x2498e1(0x471)](_0x5b5802[_0x2498e1(0x368)]);const _0x5da9d3=_0x2128cc(_0x525067['$1'])[_0x2498e1(0x301)](0x0,0x7);this[_0x2498e1(0x1f1)][_0x5da9d3]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x279),_0x49b22c=>{const _0x980cdd=_0x5f4be9;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x980cdd(0x29e)](_0x49b22c,_0x49b22c);const _0x3f6172=_0x49b22c[_0x980cdd(0x1aa)]||0x1,_0x4111ef=_0x49b22c[_0x980cdd(0x2f0)]||0x1,_0x43d8a0=_0x49b22c[_0x980cdd(0x384)]||0x0,_0x5687fb=_0x49b22c['Switches']||[],_0x35b34c=_0x49b22c[_0x980cdd(0x3c2)]||0x1,_0xca27cd=_0x49b22c['AnimationID']||0x0,_0x11d669=_0x49b22c[_0x980cdd(0x1f6)]||{'enabled':![]},_0x4f19a5={'name':_0x49b22c[_0x980cdd(0x21a)]||'','volume':_0x49b22c['sfxVolume']||0x0,'pitch':_0x49b22c[_0x980cdd(0x367)]||0x0,'pan':_0x49b22c[_0x980cdd(0x363)]||0x0};if($gamePlayer['smartRush'](_0x3f6172,_0x4111ef,_0x5687fb,_0x35b34c,_0x11d669)){if(_0x4f19a5[_0x980cdd(0x2bb)]!==''){if(_0x980cdd(0x362)!==_0x980cdd(0x362)){if(this[_0x980cdd(0x3bc)]===_0x5f0ea6)this[_0x980cdd(0x3b2)]();const _0x1b5214=(_0x185a5d?'vert':_0x980cdd(0x21d))+(_0x1c4678?'Dash':'Walk');return this[_0x980cdd(0x3bc)][_0x1b5214][_0x980cdd(0x301)](0x1,0x30);}else AudioManager[_0x980cdd(0x1d1)](_0x4f19a5);}if(_0xca27cd>0x0){if('tOERL'!==_0x980cdd(0x35b)){const _0x19e26f=_0x980cdd(0x3d3),_0x3ab653=_0x2f2b1d[_0x980cdd(0x471)](_0x27da99[_0x19e26f]);if(_0x3ab653)for(const _0x2baa06 of _0x3ab653){_0x2baa06[_0x980cdd(0x471)](_0x38a2b1[_0x19e26f]);const _0x434d07=_0x393958['$1'],_0x45e426=_0x53a3b6['$2'],_0x1e044d=_0x557c72['$3'],_0x614fd9=_0x980cdd(0x308)['format'](_0x47f01e[_0x980cdd(0x387)](_0x434d07)),_0x30f5e9=_0x980cdd(0x1e8)[_0x980cdd(0x3b1)](_0xb86bc6(_0x45e426)||0x0),_0x4bb653=_0x1e044d[_0x980cdd(0x214)](',')[_0x980cdd(0x37a)](_0x2e71d0=>_0x54e68(_0x2e71d0)||0x0);this[_0x980cdd(0x1bd)][_0x614fd9][_0x30f5e9][_0x980cdd(0x26d)]=_0x4bb653[0x0]||0x0,this['_footprintsData'][_0x614fd9][_0x30f5e9]['offsetY']=_0x4bb653[0x1]||0x0;}}else $gameTemp[_0x980cdd(0x1e1)]([$gamePlayer],_0xca27cd);}_0x43d8a0>0x0&&SceneManager['_scene'][_0x980cdd(0x41c)](_0x43d8a0);}}),PluginManager[_0x5f4be9(0x201)](pluginData['name'],'SmartMoveWaitForSmartBlink',_0x3d6832=>{const _0x2c7c2d=_0x5f4be9;if(!SceneManager[_0x2c7c2d(0x268)]())return;const _0x38e95e=$gameTemp['getLastPluginCommandInterpreter']();_0x38e95e[_0x2c7c2d(0x3fb)](_0x2c7c2d(0x2bf));}),PluginManager[_0x5f4be9(0x201)](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x36e),_0x172a29=>{const _0x47bd22=_0x5f4be9;if(!SceneManager[_0x47bd22(0x268)]())return;const _0x598fd3=$gameTemp[_0x47bd22(0x3a7)]();_0x598fd3['setWaitMode'](_0x47bd22(0x438));}),PluginManager['registerCommand'](pluginData['name'],_0x5f4be9(0x45e),_0x3506bf=>{const _0x5f43fc=_0x5f4be9;if(!SceneManager[_0x5f43fc(0x268)]())return;const _0x1c5feb=$gameTemp[_0x5f43fc(0x3a7)]();_0x1c5feb[_0x5f43fc(0x3fb)](_0x5f43fc(0x274));}),PluginManager['registerCommand'](pluginData[_0x5f4be9(0x2bb)],_0x5f4be9(0x243),_0x5b8dd4=>{const _0x50bfdb=_0x5f4be9;VisuMZ[_0x50bfdb(0x29e)](_0x5b8dd4,_0x5b8dd4);const _0x5a4910=_0x5b8dd4['Enable'];$gameSystem[_0x50bfdb(0x209)](_0x5a4910);}),PluginManager['registerCommand'](pluginData['name'],_0x5f4be9(0x216),_0x507444=>{const _0x5709e9=_0x5f4be9;VisuMZ[_0x5709e9(0x29e)](_0x507444,_0x507444),$gameSystem[_0x5709e9(0x2c3)](_0x507444[_0x5709e9(0x3be)],![],![]),$gameSystem['setSmoothCameraSpeed'](_0x507444[_0x5709e9(0x2d3)],!![],![]),$gameSystem[_0x5709e9(0x2c3)](_0x507444[_0x5709e9(0x3bb)],![],!![]),$gameSystem[_0x5709e9(0x2c3)](_0x507444[_0x5709e9(0x234)],!![],!![]);}),VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x203)]={'CatchAll':/(?:SMOOTH|DASH|FOOT|REGION|TERRAIN|SMART|JUMP)>/i,'ForceSmooth':/<FORCE SMOOTH (?:CAMERA|SCROLL)>/i,'NoSmooth':/<NO SMOOTH (?:CAMERA|SCROLL)>/i,'ForceDustCloud':/<FORCE (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'NoDustCloud':/<NO (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'ForceFootsteps':/<FORCE (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootsteps':/<NO (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'RegionFootstepSfx':/<REGION (\d+) FOOTSTEP SOUND:[ ](.*)>/gi,'NoRegionFootstepSfx':/<NO REGION (\d+) FOOTSTEP SOUND>/gi,'FootprintRegions':/<FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'NonFootprintRegions':/<NO FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'RegionFootprintOpacity':/<REGION (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'RegionFootprintDuration':/<REGION (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'NoSmartRush':/<NO SMART RUSH>/i,'SmartRushAntiCrashRegions':/<SMART RUSH NON-CRASH (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartBlink':/<NO SMART BLINK>/i,'SmartBlinkNonLandRegions':/<SMART BLINK NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartBlinkNonPassRegions':/<SMART BLINK NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartJump':/<NO SMART JUMP>/i,'SmartJumpNonLandRegions':/<SMART JUMP NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpNonPassRegions':/<SMART JUMP NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpHeightBasedRegions':/<SMART JUMP HEIGHT-BASED (?:REGION|REGIONS):[ ](.*?)>/i,'TerrainTagFootstepSfx':/<TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS):[ ](.*)>/gi,'NoTerrainTagFootstepSfx':/<NO TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS)>/gi,'FootprintTerrainTags':/<FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'NonFootprintTerrainTags':/<NO FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'TerrainTagFootprintOpacity':/<TERRAIN TAG (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'TerrainTagFootprintDuration':/<TERRAIN TAG (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'SmartRushAntiCrashTerrainTags':/<SMART RUSH NON-CRASH TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonLandTerrainTags':/<SMART BLINK NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonPassTerrainTags':/<SMART BLINK NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonLandTerrainTags':/<SMART JUMP NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonPassTerrainTags':/<SMART JUMP NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'YesFootstepsEvent':/<(?:ALLOW|ENABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootstepsEvent':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'FootstepsVolRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) VOLUME:[ ](\d+)([%％])>/i,'FootstepsPitchRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) PITCH:[ ](\d+)([%％])>/i,'FootstepsFrames':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) (?:FRAME|FRAMES):[ ](.*?)>/i,'YesFootprintsEvent':/<(?:ALLOW|ENABLE) FOOTPRINTS>/i,'NoFootprintsEvent':/<(?:NO|DISABLE) FOOTPRINTS>/i,'FootprintsFilename':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) FILENAME:[ ](.*?)>/gi,'FootprintsWidth':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) WIDTH:[ ](\d+)>/gi,'FootprintsHeight':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) HEIGHT:[ ](\d+)>/gi,'FootprintsOffset':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) OFFSET:[ ](.*?)>/gi,'SmartJumpNonLandEvent':/<(?:SMART JUMP NON-LAND|ILLEGAL JUMP)>/i,'SmartJumpNonPassEvent':/<(?:SMART JUMP NON-PASS|ILLEGAL JUMP)>/i},VisuMZ[_0x5f4be9(0x3fc)]['ConfigKeys']=[_0x5f4be9(0x34c),_0x5f4be9(0x2be),_0x5f4be9(0x2f3),'smoothCamera'],((()=>{const _0x3d5e8f=_0x5f4be9;for(const _0x3c2cb1 of VisuMZ[_0x3d5e8f(0x3fc)][_0x3d5e8f(0x1ca)]){ConfigManager[_0x3c2cb1]=!![];}})()),VisuMZ['MovementEffects'][_0x5f4be9(0x374)]=ConfigManager[_0x5f4be9(0x2ee)],ConfigManager[_0x5f4be9(0x2ee)]=function(){const _0x400efc=_0x5f4be9,_0x32f312=VisuMZ[_0x400efc(0x3fc)][_0x400efc(0x374)][_0x400efc(0x2ce)](this);for(const _0x3cc428 of VisuMZ[_0x400efc(0x3fc)][_0x400efc(0x1ca)]){_0x32f312[_0x3cc428]=this[_0x3cc428];}return _0x32f312;},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x3f9)]=ConfigManager[_0x5f4be9(0x3f2)],ConfigManager[_0x5f4be9(0x3f2)]=function(_0x12a23a){const _0x1b3c35=_0x5f4be9;VisuMZ[_0x1b3c35(0x3fc)][_0x1b3c35(0x3f9)][_0x1b3c35(0x2ce)](this,_0x12a23a);for(const _0x448ee9 of VisuMZ[_0x1b3c35(0x3fc)][_0x1b3c35(0x1ca)]){this['readFlag'](_0x12a23a,_0x448ee9,!![]);}},TextManager['MovementEffectsOptions']={'DustCloud':VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x40e)][_0x5f4be9(0x28d)],'Footprints':VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)]['Options'][_0x5f4be9(0x2b0)],'Footsteps':VisuMZ[_0x5f4be9(0x3fc)]['Settings'][_0x5f4be9(0x40e)][_0x5f4be9(0x1e2)],'SmoothCamera':VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x40e)][_0x5f4be9(0x296)]},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x1df)]=Scene_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x386)],Scene_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x386)]=function(){const _0x42da2c=_0x5f4be9;let _0x298ff7=VisuMZ['MovementEffects'][_0x42da2c(0x1df)][_0x42da2c(0x2ce)](this);const _0x5ce8a1=VisuMZ['MovementEffects'][_0x42da2c(0x381)]['Options'];if(_0x5ce8a1[_0x42da2c(0x24f)]&&_0x5ce8a1[_0x42da2c(0x2dd)])_0x298ff7++;if(_0x5ce8a1['AdjustRect']&&_0x5ce8a1[_0x42da2c(0x1e7)])_0x298ff7++;if(_0x5ce8a1[_0x42da2c(0x24f)]&&_0x5ce8a1[_0x42da2c(0x236)])_0x298ff7++;if(_0x5ce8a1[_0x42da2c(0x24f)]&&_0x5ce8a1[_0x42da2c(0x39b)])_0x298ff7++;return _0x298ff7;},VisuMZ[_0x5f4be9(0x3fc)]['Window_Options_addGeneralOptions']=Window_Options['prototype'][_0x5f4be9(0x47e)],Window_Options['prototype'][_0x5f4be9(0x47e)]=function(){const _0xfcf792=_0x5f4be9;VisuMZ[_0xfcf792(0x3fc)][_0xfcf792(0x2d8)]['call'](this),this[_0xfcf792(0x244)]();},Window_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x244)]=function(){const _0x4bc7b9=_0x5f4be9;VisuMZ[_0x4bc7b9(0x3fc)][_0x4bc7b9(0x381)][_0x4bc7b9(0x40e)]['AddDustCloud']&&this['addMovementEffectsDustCloudCommand']();VisuMZ[_0x4bc7b9(0x3fc)][_0x4bc7b9(0x381)][_0x4bc7b9(0x40e)]['AddFootprints']&&this[_0x4bc7b9(0x37d)]();VisuMZ[_0x4bc7b9(0x3fc)][_0x4bc7b9(0x381)][_0x4bc7b9(0x40e)][_0x4bc7b9(0x236)]&&this['addMovementEffectsFootstepsCommand']();if(VisuMZ[_0x4bc7b9(0x3fc)][_0x4bc7b9(0x381)]['Options']['AddSmoothCamera']){if(_0x4bc7b9(0x332)===_0x4bc7b9(0x332))this[_0x4bc7b9(0x275)]();else{const _0x428242=_0x1254bc[_0x4bc7b9(0x419)]['_spriteset'];if(_0x428242)_0x428242[_0x4bc7b9(0x1e4)](this);}}},Window_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x26a)]=function(){const _0x5d0f15=_0x5f4be9,_0x4056a3=TextManager[_0x5d0f15(0x1c0)][_0x5d0f15(0x376)],_0x490fbf=_0x5d0f15(0x34c);this[_0x5d0f15(0x46f)](_0x4056a3,_0x490fbf);},Window_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x37d)]=function(){const _0x40df7f=_0x5f4be9,_0x3a3d33=TextManager[_0x40df7f(0x1c0)][_0x40df7f(0x218)],_0x29062d='footprints';this[_0x40df7f(0x46f)](_0x3a3d33,_0x29062d);},Window_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x44f)]=function(){const _0x5fa4a7=_0x5f4be9,_0x3f8fa1=TextManager['MovementEffectsOptions'][_0x5fa4a7(0x288)],_0x17e4c8=_0x5fa4a7(0x2f3);this[_0x5fa4a7(0x46f)](_0x3f8fa1,_0x17e4c8);},Window_Options[_0x5f4be9(0x1c6)][_0x5f4be9(0x275)]=function(){const _0x3d5cf9=_0x5f4be9,_0x3f4d06=TextManager[_0x3d5cf9(0x1c0)][_0x3d5cf9(0x1b3)],_0x4afb86=_0x3d5cf9(0x395);this[_0x3d5cf9(0x46f)](_0x3f4d06,_0x4afb86);},ImageManager['generatedFootprintBitmap']=function(){const _0x316440=_0x5f4be9;if(this['_cached_GeneratedFootprint_Image'])return this[_0x316440(0x2e3)];const _0x4a40a4=0x64,_0x2301dc=0x64,_0x39a034=new Bitmap(_0x4a40a4,_0x2301dc);return _0x39a034[_0x316440(0x30b)]=0xff,_0x39a034[_0x316440(0x45f)](0x32,0x32,0x32,_0x316440(0x19f)),_0x39a034['_customModified']=![],this[_0x316440(0x2e3)]=_0x39a034,this['_cached_GeneratedFootprint_Image'];},SoundManager[_0x5f4be9(0x3e5)]=function(_0x5dd467){const _0x55599a=_0x5f4be9,_0x4d7873=VisuMZ[_0x55599a(0x3fc)][_0x55599a(0x381)][_0x55599a(0x288)],_0x31aec4={'name':_0x4d7873['name']??'Blow2','volume':_0x4d7873[_0x55599a(0x344)]??0xa,'pitch':_0x4d7873['pitch']??0x78,'pan':_0x4d7873[_0x55599a(0x31d)]??0x0};$gameMap[_0x55599a(0x1ec)](_0x31aec4,_0x5dd467);if(_0x31aec4==='')return;VisuMZ[_0x55599a(0x3fc)][_0x55599a(0x1c7)](_0x31aec4,_0x5dd467),AudioManager['playSe'](_0x31aec4);},VisuMZ['MovementEffects'][_0x5f4be9(0x1c7)]=function(_0x311306,_0x461c40){const _0x57f3d6=_0x5f4be9;if(!_0x311306)return;if(!_0x461c40)return;if(_0x461c40[_0x57f3d6(0x23c)]===Game_Event){if(_0x57f3d6(0x44e)===_0x57f3d6(0x1c8))_0x26a51b[_0x57f3d6(0x2bb)]!==''&&_0x3ed10d[_0x57f3d6(0x1d1)](_0x216ed7),_0x48724b>0x0&&_0x5b250d['requestAnimation']([_0x8467],_0x5d9ec7),_0x382925>0x0&&_0x28b493['_scene']['playOnceParallelInterpreter'](_0x11aa40);else{const _0x5cb9a4=VisuMZ[_0x57f3d6(0x3fc)][_0x57f3d6(0x381)][_0x57f3d6(0x288)],_0x473e97=$gamePlayer['deltaXFrom'](_0x461c40['x']),_0x59c9a7=$gamePlayer[_0x57f3d6(0x372)](_0x461c40['y']),_0x596507=Math[_0x57f3d6(0x28b)](_0x473e97)+Math[_0x57f3d6(0x28b)](_0x59c9a7);_0x596507>0x0&&(_0x311306[_0x57f3d6(0x344)]+=_0x596507*_0x5cb9a4[_0x57f3d6(0x329)],_0x311306['pitch']+=_0x596507*_0x5cb9a4[_0x57f3d6(0x261)]),_0x473e97!==0x0&&(_0x57f3d6(0x1d7)!==_0x57f3d6(0x1d7)?(_0x333f98['velocity']['x']=0x0,_0x38b1be['velocity']['y']=0x0,this[_0x57f3d6(0x2f9)]=0x0):_0x311306[_0x57f3d6(0x31d)]-=_0x473e97*_0x5cb9a4[_0x57f3d6(0x207)]);}}const _0x1badab=_0x461c40[_0x57f3d6(0x413)]();_0x1badab&&(_0x311306[_0x57f3d6(0x344)]*=_0x1badab['volumeRate']??0x1,_0x311306[_0x57f3d6(0x251)]*=_0x1badab['pitchRate']??0x1),_0x311306[_0x57f3d6(0x344)]=Math[_0x57f3d6(0x3bd)](0x0,_0x311306[_0x57f3d6(0x344)]),_0x311306[_0x57f3d6(0x251)]=Math['max'](0x0,_0x311306[_0x57f3d6(0x251)]),_0x311306[_0x57f3d6(0x31d)]=_0x311306[_0x57f3d6(0x31d)][_0x57f3d6(0x301)](-0x64,0x64);},TextManager[_0x5f4be9(0x387)]=function(_0x82c5f9){const _0x198ac2=_0x5f4be9;_0x82c5f9=_0x82c5f9['toLowerCase']()[_0x198ac2(0x1c9)]();switch(_0x82c5f9){case _0x198ac2(0x2a7):return 0x2;case _0x198ac2(0x2bc):return 0x4;case _0x198ac2(0x45c):return 0x6;case'up':return 0x8;case _0x198ac2(0x3f8):return 0x1;case _0x198ac2(0x249):return 0x3;case _0x198ac2(0x20d):return 0x7;case'upper\x20right':return 0x9;}return Number(_0x82c5f9)||0x0;},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x465)]=BattleManager[_0x5f4be9(0x451)],BattleManager[_0x5f4be9(0x451)]=function(){const _0x426821=_0x5f4be9;VisuMZ[_0x426821(0x3fc)][_0x426821(0x465)][_0x426821(0x2ce)](this);if($gamePlayer){if(_0x426821(0x205)!==_0x426821(0x1ac))$gamePlayer['endSmartRush']();else{if(this[_0x426821(0x264)]===_0x12e18d)this[_0x426821(0x210)]();this[_0x426821(0x264)]=_0x21bf7d[_0x426821(0x2f6)](_0x187cb0);}}},VisuMZ['MovementEffects'][_0x5f4be9(0x281)]=Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x446)],Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x446)]=function(){const _0x314443=_0x5f4be9;VisuMZ[_0x314443(0x3fc)][_0x314443(0x281)]['call'](this),this[_0x314443(0x3b2)](),this['initMovementEffectsDustCloud'](),this[_0x314443(0x276)](),this[_0x314443(0x2c2)](),this[_0x314443(0x266)]();},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x3b2)]=function(){const _0x3ad923=_0x5f4be9,_0x34f9bd=VisuMZ[_0x3ad923(0x3fc)][_0x3ad923(0x381)]['SmoothCamera'];this['_smoothCamera']={'enabled':_0x34f9bd[_0x3ad923(0x3e0)],'horzWalk':_0x34f9bd[_0x3ad923(0x3be)][_0x3ad923(0x301)](0x1,0x30),'vertWalk':_0x34f9bd[_0x3ad923(0x2d3)]['clamp'](0x1,0x30),'horzDash':_0x34f9bd[_0x3ad923(0x3bb)]['clamp'](0x1,0x30),'vertDash':_0x34f9bd['VertDash']['clamp'](0x1,0x30)};},Game_System['prototype'][_0x5f4be9(0x473)]=function(){const _0x22a1c8=_0x5f4be9;if(this[_0x22a1c8(0x3bc)]===undefined)this[_0x22a1c8(0x3b2)]();return this[_0x22a1c8(0x3bc)][_0x22a1c8(0x40d)];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x209)]=function(_0x831f1c){const _0x2a56c2=_0x5f4be9;if(this[_0x2a56c2(0x3bc)]===undefined)this[_0x2a56c2(0x3b2)]();this[_0x2a56c2(0x3bc)][_0x2a56c2(0x40d)]=_0x831f1c;},Game_System['prototype']['getSmoothCameraSpeed']=function(_0xd29ef8,_0xab214f){const _0x681c44=_0x5f4be9;if(this[_0x681c44(0x3bc)]===undefined)this[_0x681c44(0x3b2)]();const _0x86d404=(_0xd29ef8?_0x681c44(0x3f5):_0x681c44(0x21d))+(_0xab214f?_0x681c44(0x1b6):'Walk');return this[_0x681c44(0x3bc)][_0x86d404][_0x681c44(0x301)](0x1,0x30);},Game_System[_0x5f4be9(0x1c6)]['setSmoothCameraSpeed']=function(_0x258176,_0x284790,_0x17b5a3){const _0x3c9a96=_0x5f4be9;if(this[_0x3c9a96(0x3bc)]===undefined)this[_0x3c9a96(0x3b2)]();const _0x31d4ce=(_0x284790?_0x3c9a96(0x3f5):_0x3c9a96(0x21d))+(_0x17b5a3?_0x3c9a96(0x1b6):_0x3c9a96(0x481));this[_0x3c9a96(0x3bc)][_0x31d4ce]=_0x258176[_0x3c9a96(0x301)](0x1,0x30);},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x210)]=function(){const _0x2fd391=_0x5f4be9,_0x1064c6=VisuMZ[_0x2fd391(0x3fc)]['Settings'][_0x2fd391(0x376)];this['_dustCloud']={'enabled':_0x1064c6['Enabled'],'filename':_0x1064c6[_0x2fd391(0x1e3)]||'','color':_0x1064c6[_0x2fd391(0x29a)]||'#ffffff','radius':_0x1064c6['radius']||0x18,'fullness':_0x1064c6[_0x2fd391(0x2a3)]||0x0,'wholeDuration':_0x1064c6[_0x2fd391(0x47d)]||0x14,'startOpacity':_0x1064c6[_0x2fd391(0x1b5)]||0xc0,'startScale':_0x1064c6[_0x2fd391(0x24e)]||0.2};},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x47b)]=function(){const _0x5920d5=_0x5f4be9;if(this['_dustCloud']===undefined)this['initMovementEffectsDustCloud']();return this[_0x5920d5(0x264)];},Game_System[_0x5f4be9(0x1c6)]['setDustCloudData']=function(_0x180c7b){const _0x34ab57=_0x5f4be9;if(this[_0x34ab57(0x264)]===undefined)this['initMovementEffectsDustCloud']();this['_dustCloud']=JsonEx['makeDeepCopy'](_0x180c7b);},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x2e8)]=function(){const _0x284d60=_0x5f4be9;return this[_0x284d60(0x47b)]()[_0x284d60(0x40d)];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x276)]=function(){const _0x14c001=_0x5f4be9;this['_footstepSoundsEnabled']=VisuMZ[_0x14c001(0x3fc)][_0x14c001(0x381)][_0x14c001(0x288)]['Enabled'];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x3c5)]=function(){const _0x2fe91f=_0x5f4be9;if(this['_footstepSoundsEnabled']===undefined)this[_0x2fe91f(0x276)]();return this[_0x2fe91f(0x40f)];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x1a9)]=function(_0x54e8ca){const _0x13a263=_0x5f4be9;if(this[_0x13a263(0x40f)]===undefined)this[_0x13a263(0x276)]();this[_0x13a263(0x40f)]=_0x54e8ca;},Game_System[_0x5f4be9(0x1c6)]['initMovementEffectsFootprintMarks']=function(){const _0x4515f4=_0x5f4be9;this[_0x4515f4(0x3ba)]=VisuMZ[_0x4515f4(0x3fc)]['Settings'][_0x4515f4(0x218)][_0x4515f4(0x3e0)];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x1bb)]=function(){const _0x1f6094=_0x5f4be9;if(this[_0x1f6094(0x3ba)]===undefined)this[_0x1f6094(0x2c2)]();return this[_0x1f6094(0x3ba)];},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x2d5)]=function(_0x374068){const _0x1e22c5=_0x5f4be9;if(this[_0x1e22c5(0x3ba)]===undefined)this[_0x1e22c5(0x2c2)]();this[_0x1e22c5(0x3ba)]=_0x374068;},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x266)]=function(){const _0x347389=_0x5f4be9;this[_0x347389(0x460)]={'dir1':0x0,'dir2':0x0,'dir3':0x0,'dir4':0x0,'dir6':0x0,'dir7':0x0,'dir8':0x0,'dir9':0x0};},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x312)]=function(_0x1816f7){const _0x1ad8f2=_0x5f4be9;if(this[_0x1ad8f2(0x460)]===undefined)this[_0x1ad8f2(0x266)]();const _0x4248b9='dir%1'[_0x1ad8f2(0x3b1)](_0x1816f7);return this['_dirMoveSpeedMod'][_0x4248b9]||0x0;},Game_System[_0x5f4be9(0x1c6)][_0x5f4be9(0x3f3)]=function(_0x1a1712,_0x250552){const _0x5cf234=_0x5f4be9;if(this['_dirMoveSpeedMod']===undefined)this[_0x5cf234(0x266)]();const _0x398299=_0x5cf234(0x308)[_0x5cf234(0x3b1)](_0x1a1712);this[_0x5cf234(0x460)][_0x398299]=_0x250552||0x0;},VisuMZ[_0x5f4be9(0x3fc)]['Game_Picture_isMapScrollLinked']=Game_Picture[_0x5f4be9(0x1c6)][_0x5f4be9(0x351)],Game_Picture['prototype'][_0x5f4be9(0x351)]=function(){return![];},Game_Picture[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ad)]=function(){const _0x2c4760=_0x5f4be9;return VisuMZ[_0x2c4760(0x3fc)]['Game_Picture_isMapScrollLinked']['call'](this);},Game_Actor['prototype'][_0x5f4be9(0x413)]=function(){const _0x2d728a=_0x5f4be9;if(this[_0x2d728a(0x416)]===undefined)this[_0x2d728a(0x2bd)]();return this[_0x2d728a(0x416)];},Game_Actor['prototype']['setupMovementEffectsNotetags']=function(){const _0x1b41b6=_0x5f4be9;this[_0x1b41b6(0x46b)]();const _0x253459=this[_0x1b41b6(0x1b1)]()[_0x1b41b6(0x3ef)]||'';Game_Event[_0x1b41b6(0x1c6)][_0x1b41b6(0x3b3)][_0x1b41b6(0x2ce)](this,_0x253459);},Game_Actor[_0x5f4be9(0x1c6)][_0x5f4be9(0x46b)]=function(){const _0x44a64f=_0x5f4be9;{if(_0x44a64f(0x41a)==='sFitl'){_0x29b561[_0x44a64f(0x471)](_0x5b5556[_0xa0d63b]);const _0x5b1cd8=_0xa54485['$1'],_0x5afe76=_0x1a578d['$2'],_0x317954=_0x3e1151['$3'],_0x60d82='dir%1'[_0x44a64f(0x3b1)](_0x4e2f1b[_0x44a64f(0x387)](_0x5b1cd8)),_0x26b686='pattern%1'['format'](_0x2fb325(_0x5afe76)||0x0);this['_footprintsData'][_0x60d82][_0x26b686][_0x44a64f(0x1f5)]=_0x5c0bd2(_0x317954)||0x1;}else{const _0x5b7a9c=VisuMZ[_0x44a64f(0x3fc)][_0x44a64f(0x381)][_0x44a64f(0x288)];this['_footsteps']={'enabled':_0x5b7a9c[_0x44a64f(0x241)],'volumeRate':_0x5b7a9c[_0x44a64f(0x293)],'pitchRate':_0x5b7a9c[_0x44a64f(0x1ff)],'soundFrames':_0x5b7a9c[_0x44a64f(0x3ac)][_0x44a64f(0x22f)]()};}}{if(_0x44a64f(0x3dd)===_0x44a64f(0x3dd)){const _0x93a1ca=VisuMZ['MovementEffects']['Settings']['Footprints'];this[_0x44a64f(0x1bd)]={'enabled':!![],'dir1':JSON[_0x44a64f(0x21b)](JSON[_0x44a64f(0x40a)](_0x93a1ca['dir1'])),'dir2':JSON[_0x44a64f(0x21b)](JSON[_0x44a64f(0x40a)](_0x93a1ca[_0x44a64f(0x3bf)])),'dir3':JSON['parse'](JSON[_0x44a64f(0x40a)](_0x93a1ca['dir3'])),'dir4':JSON['parse'](JSON['stringify'](_0x93a1ca[_0x44a64f(0x28a)])),'dir6':JSON[_0x44a64f(0x21b)](JSON['stringify'](_0x93a1ca[_0x44a64f(0x38c)])),'dir7':JSON[_0x44a64f(0x21b)](JSON[_0x44a64f(0x40a)](_0x93a1ca[_0x44a64f(0x36f)])),'dir8':JSON[_0x44a64f(0x21b)](JSON['stringify'](_0x93a1ca[_0x44a64f(0x3e4)])),'dir9':JSON['parse'](JSON[_0x44a64f(0x40a)](_0x93a1ca[_0x44a64f(0x278)]))};}else _0x1d2137[_0x44a64f(0x1c6)][_0x44a64f(0x28c)][_0x44a64f(0x2ce)](this),this[_0x44a64f(0x33a)]();}},Game_Actor[_0x5f4be9(0x1c6)]['footprintsData']=function(){if(this['_footprintsData']===undefined)this['setupMovementEffectsNotetags']();return this['_footprintsData'];},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x482)]=Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1af)],Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1af)]=function(_0x1f61a4){const _0x351a1c=_0x5f4be9;VisuMZ['MovementEffects'][_0x351a1c(0x482)]['call'](this,_0x1f61a4),this[_0x351a1c(0x342)](),this[_0x351a1c(0x1cf)](),this[_0x351a1c(0x3b6)](),this[_0x351a1c(0x412)]();},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x2e6)]=Game_Map[_0x5f4be9(0x1c6)]['changeTileset'],Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ba)]=function(_0x471cdd){const _0x122f89=_0x5f4be9;VisuMZ[_0x122f89(0x3fc)]['Game_Map_changeTileset'][_0x122f89(0x2ce)](this,_0x471cdd),this[_0x122f89(0x342)](),this[_0x122f89(0x1cf)](),this[_0x122f89(0x3b6)](),this[_0x122f89(0x412)]();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2da)]=function(){const _0x2333b1=_0x5f4be9;if(!ConfigManager['smoothCamera'])return![];if($dataMap){if(_0x2333b1(0x213)!==_0x2333b1(0x213)){const _0x405b6f=_0x2a6886-_0x16d3c4,_0x34c1f8=_0x298a58*_0x1f86ad,_0x1f5426=_0x405b6f/(_0x34c1f8||0.01);_0x11bc43['scrollDown'](_0x1f5426);}else{const _0x2f5617=VisuMZ[_0x2333b1(0x3fc)]['RegExp'],_0x3581fe=$dataMap[_0x2333b1(0x3ef)]||'';if(_0x3581fe[_0x2333b1(0x471)](_0x2f5617[_0x2333b1(0x1e0)]))return!![];else{if(_0x3581fe['match'](_0x2f5617[_0x2333b1(0x43b)]))return![];}}}return $gameSystem[_0x2333b1(0x473)]();},Game_Map[_0x5f4be9(0x1c6)]['canShowDustCloud']=function(){const _0xa03c1=_0x5f4be9;if(!ConfigManager['dustCloud'])return![];if($dataMap){if(_0xa03c1(0x375)!=='Hdujy')this[_0xa03c1(0x44f)]();else{const _0x4d5767=VisuMZ[_0xa03c1(0x3fc)][_0xa03c1(0x203)],_0x51c82d=$dataMap[_0xa03c1(0x3ef)]||'';if(_0x51c82d[_0xa03c1(0x471)](_0x4d5767[_0xa03c1(0x23f)])){if(_0xa03c1(0x39e)!==_0xa03c1(0x373))return!![];else this['_smartJumpCooldown']--;}else{if(_0x51c82d[_0xa03c1(0x471)](_0x4d5767[_0xa03c1(0x316)]))return![];}}}return $gameSystem['canShowDustCloud']();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x3c5)]=function(){const _0x14fbef=_0x5f4be9;if(!ConfigManager['footsteps'])return![];if($dataMap){if('IZcFL'!=='clWXc'){const _0x4c57f5=VisuMZ[_0x14fbef(0x3fc)][_0x14fbef(0x203)],_0x4397c9=$dataMap[_0x14fbef(0x3ef)]||'';if(_0x4397c9[_0x14fbef(0x471)](_0x4c57f5[_0x14fbef(0x3cf)]))return!![];else{if(_0x4397c9[_0x14fbef(0x471)](_0x4c57f5[_0x14fbef(0x1d0)]))return![];}}else{_0xf6ad9f[_0x14fbef(0x3fc)][_0x14fbef(0x3f9)][_0x14fbef(0x2ce)](this,_0x1b0439);for(const _0x267329 of _0x1e5abc['MovementEffects'][_0x14fbef(0x1ca)]){this[_0x14fbef(0x349)](_0x363272,_0x267329,!![]);}}}return $gameSystem[_0x14fbef(0x3c5)]();},Game_Map[_0x5f4be9(0x1c6)]['setupRegionTerrainTagFootstepSounds']=function(){const _0x3ed725=_0x5f4be9;this[_0x3ed725(0x2fe)](),this[_0x3ed725(0x431)](),this[_0x3ed725(0x271)]();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2fe)]=function(){const _0x37d0a6=_0x5f4be9;this[_0x37d0a6(0x354)]={},this['_terrainTagFootstepSounds']={};},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x431)]=function(){const _0xae0d21=_0x5f4be9;if(!$dataMap)return;const _0x11473c=VisuMZ[_0xae0d21(0x3fc)][_0xae0d21(0x381)][_0xae0d21(0x288)],_0x394bcb=VisuMZ[_0xae0d21(0x3fc)][_0xae0d21(0x203)],_0x147548=$dataMap[_0xae0d21(0x3ef)]||'',_0x2dfa1a=_0x147548[_0xae0d21(0x471)](_0x394bcb[_0xae0d21(0x23a)]);if(_0x2dfa1a){if(_0xae0d21(0x461)===_0xae0d21(0x477)){const _0x39a4d6=_0xe6422d(_0x2eac0d['$1']);_0x39a4d6!==_0x242caa[_0x5696db][_0xae0d21(0x3da)]&&(_0x16c040(_0xae0d21(0x25c)['format'](_0x1b50e6,_0x39a4d6)),_0x34e2ca[_0xae0d21(0x390)]());}else for(const _0x5e39ae of _0x2dfa1a){if(_0xae0d21(0x226)==='VnzcJ'){_0x5e39ae[_0xae0d21(0x471)](_0x394bcb[_0xae0d21(0x23a)]);const _0x4d2d62=Number(RegExp['$1'])[_0xae0d21(0x301)](0x0,0xff),_0x3f837e=String(RegExp['$2'])[_0xae0d21(0x214)](',')['map'](_0x200fd4=>_0x200fd4[_0xae0d21(0x1c9)]());this[_0xae0d21(0x354)][_0x4d2d62]={'name':_0x3f837e[0x0]||'','volume':Number(_0x3f837e[0x1]??_0x11473c[_0xae0d21(0x344)]),'pitch':Number(_0x3f837e[0x2]??_0x11473c[_0xae0d21(0x251)]),'pan':Number(_0x3f837e[0x3]??_0x11473c[_0xae0d21(0x31d)])};}else this[_0xae0d21(0x37f)]();}}const _0x54d837=_0x147548[_0xae0d21(0x471)](_0x394bcb[_0xae0d21(0x1bc)]);if(_0x54d837){if('HnBPc'!==_0xae0d21(0x1a2))for(const _0x324279 of _0x54d837){_0x324279[_0xae0d21(0x471)](_0x394bcb[_0xae0d21(0x1bc)]);const _0x1f6878=Number(RegExp['$1'])[_0xae0d21(0x301)](0x0,0xff);this[_0xae0d21(0x354)][_0x1f6878]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else{{const _0xb3e374=_0x5f33e8[_0xae0d21(0x3fc)][_0xae0d21(0x381)][_0xae0d21(0x288)];this[_0xae0d21(0x416)]={'enabled':_0xb3e374[_0xae0d21(0x241)],'volumeRate':_0xb3e374[_0xae0d21(0x293)],'pitchRate':_0xb3e374[_0xae0d21(0x1ff)],'soundFrames':_0xb3e374[_0xae0d21(0x3ac)]['clone']()};}{const _0x4fd37f=_0x574e21[_0xae0d21(0x3fc)][_0xae0d21(0x381)]['Footprints'];this[_0xae0d21(0x1bd)]={'enabled':!![],'dir1':_0x9b2a28[_0xae0d21(0x21b)](_0xc1e292[_0xae0d21(0x40a)](_0x4fd37f[_0xae0d21(0x265)])),'dir2':_0x26f0ed[_0xae0d21(0x21b)](_0x5056c7[_0xae0d21(0x40a)](_0x4fd37f[_0xae0d21(0x3bf)])),'dir3':_0x577330[_0xae0d21(0x21b)](_0x502e8b[_0xae0d21(0x40a)](_0x4fd37f['dir3'])),'dir4':_0x28534d[_0xae0d21(0x21b)](_0x571b5c['stringify'](_0x4fd37f[_0xae0d21(0x28a)])),'dir6':_0x4e7460['parse'](_0x872157[_0xae0d21(0x40a)](_0x4fd37f[_0xae0d21(0x38c)])),'dir7':_0x43e094[_0xae0d21(0x21b)](_0x987bac['stringify'](_0x4fd37f[_0xae0d21(0x36f)])),'dir8':_0x2bc589[_0xae0d21(0x21b)](_0x1a24d0[_0xae0d21(0x40a)](_0x4fd37f[_0xae0d21(0x3e4)])),'dir9':_0x403208[_0xae0d21(0x21b)](_0x132be6['stringify'](_0x4fd37f[_0xae0d21(0x278)]))};}}}},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x271)]=function(){const _0x586c76=_0x5f4be9;if(!this['tileset']())return;const _0x2e3375=VisuMZ[_0x586c76(0x3fc)][_0x586c76(0x381)]['Footsteps'],_0x155a80=VisuMZ[_0x586c76(0x3fc)][_0x586c76(0x203)],_0x9f6617=this[_0x586c76(0x33d)]()[_0x586c76(0x3ef)]||'',_0x3bd114=_0x9f6617[_0x586c76(0x471)](_0x155a80[_0x586c76(0x470)]);if(_0x3bd114){if(_0x586c76(0x1da)!==_0x586c76(0x1da))return![];else for(const _0x54ac51 of _0x3bd114){if('MErWP'!==_0x586c76(0x42c)){_0x54ac51[_0x586c76(0x471)](_0x155a80[_0x586c76(0x470)]);const _0x5c9b13=Number(RegExp['$1'])[_0x586c76(0x301)](0x0,0xff),_0x36ffa4=String(RegExp['$2'])['split'](',')[_0x586c76(0x37a)](_0x4fcc51=>_0x4fcc51[_0x586c76(0x1c9)]());this[_0x586c76(0x1f1)][_0x5c9b13]={'name':_0x36ffa4[0x0]||'','volume':Number(_0x36ffa4[0x1]??_0x2e3375[_0x586c76(0x344)]),'pitch':Number(_0x36ffa4[0x2]??_0x2e3375[_0x586c76(0x251)]),'pan':Number(_0x36ffa4[0x3]??_0x2e3375['pan'])};}else _0x3a2f76=_0x3a1281[_0x586c76(0x27c)](_0x2b1fa7[_0x586c76(0x36d)]()[_0x586c76(0x43c)]());}}const _0x135a0e=_0x9f6617['match'](_0x155a80[_0x586c76(0x368)]);if(_0x135a0e)for(const _0x574e8b of _0x135a0e){_0x574e8b['match'](_0x155a80['NoTerrainTagFootstepSfx']);const _0x5087ba=Number(RegExp['$1'])[_0x586c76(0x301)](0x0,0x7);this['_terrainTagFootstepSounds'][_0x5087ba]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ec)]=function(_0x5dca90,_0x2cd6b5){const _0x3aef3d=_0x5f4be9;if(!_0x5dca90)return;if(!_0x2cd6b5)return;if(this[_0x3aef3d(0x354)]===undefined||this[_0x3aef3d(0x1f1)]===undefined){if(_0x3aef3d(0x256)===_0x3aef3d(0x256))this['setupRegionTerrainTagFootstepSounds']();else{if(this[_0x3aef3d(0x460)]===_0x3b040f)this[_0x3aef3d(0x266)]();const _0x301ae4='dir%1'[_0x3aef3d(0x3b1)](_0x401981);return this[_0x3aef3d(0x460)][_0x301ae4]||0x0;}}const _0xd2af0d=_0x2cd6b5['x'],_0x567929=_0x2cd6b5['y'],_0xd4c1fd=this[_0x3aef3d(0x2c4)](_0xd2af0d,_0x567929),_0x254437=this[_0x3aef3d(0x467)](_0xd2af0d,_0x567929),_0x49d8b5=[_0x3aef3d(0x2bb),_0x3aef3d(0x344),'pitch',_0x3aef3d(0x31d)];if(this['_terrainTagFootstepSounds'][_0x254437]){const _0x100b24=this[_0x3aef3d(0x1f1)][_0x254437];for(const _0x5d8cf2 of _0x49d8b5){_0x5dca90[_0x5d8cf2]=_0x100b24[_0x5d8cf2];}}if(this['_regionFootstepSounds'][_0xd4c1fd]){if(_0x3aef3d(0x1b7)==='TteII')for(const _0x101423 of _0x3f87eb){_0x101423[_0x3aef3d(0x471)](_0x51f564['TerrainTagFootprintDuration']);const _0x4ffa46=_0xec9a8e(_0x50e47e['$1'])[_0x3aef3d(0x301)](0x0,0xff),_0x2b884a=_0x231335['max'](0x1,_0x592ddc(_0x4dfdf2['$2']));this['_footprints'][_0x3aef3d(0x1b9)][_0x3aef3d(0x2cb)][_0x4ffa46]=_0x2b884a;}else{const _0x4f5893=this[_0x3aef3d(0x354)][_0xd4c1fd];for(const _0x2d9d8a of _0x49d8b5){_0x5dca90[_0x2d9d8a]=_0x4f5893[_0x2d9d8a];}}}},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1bb)]=function(_0x1429dc,_0xb616b5){const _0x14b3da=_0x5f4be9;if(!ConfigManager[_0x14b3da(0x2be)])return![];if(!$gameSystem['canMakeFootprints']())return![];if(this[_0x14b3da(0x448)]===undefined)this[_0x14b3da(0x1cf)]();const _0x166229=this['regionId'](_0x1429dc,_0xb616b5),_0x131fe9=this['terrainTag'](_0x1429dc,_0xb616b5);if(this[_0x14b3da(0x448)][_0x14b3da(0x322)][_0x14b3da(0x2ba)][_0x14b3da(0x336)](_0x166229))return![];if(this[_0x14b3da(0x448)]['forbidden']['terrainTags']['includes'](_0x131fe9))return![];if(this[_0x14b3da(0x448)][_0x14b3da(0x24c)][_0x14b3da(0x2ba)][_0x14b3da(0x336)](_0x166229))return!![];if(this[_0x14b3da(0x448)][_0x14b3da(0x24c)][_0x14b3da(0x2cb)][_0x14b3da(0x336)](_0x131fe9))return!![];return![];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1cf)]=function(){const _0x1e9ba0=_0x5f4be9;this['initRegionTerrainTagFootprints'](),this[_0x1e9ba0(0x392)](),this[_0x1e9ba0(0x2eb)]();},Game_Map[_0x5f4be9(0x1c6)]['initRegionTerrainTagFootprints']=function(){const _0x2c579d=_0x5f4be9,_0x11fd1c=VisuMZ[_0x2c579d(0x3fc)]['Settings'][_0x2c579d(0x218)];this[_0x2c579d(0x448)]={'allowed':{'regions':_0x11fd1c[_0x2c579d(0x463)][_0x2c579d(0x22f)](),'terrainTags':_0x11fd1c['DefaultTerrainTags']['clone']()},'forbidden':{'regions':[],'terrainTags':[]},'opacity':{'regions':{},'terrainTags':{}},'duration':{'regions':{},'terrainTags':{}}};},Game_Map['prototype'][_0x5f4be9(0x392)]=function(){const _0x1c846d=_0x5f4be9;if(!$dataMap)return;if(this[_0x1c846d(0x448)]===undefined)this[_0x1c846d(0x1cf)]();const _0x564268=VisuMZ[_0x1c846d(0x3fc)][_0x1c846d(0x203)],_0x5848b4=$dataMap[_0x1c846d(0x3ef)]||'';if(_0x5848b4[_0x1c846d(0x471)](_0x564268[_0x1c846d(0x335)])){if('EjDjK'===_0x1c846d(0x38b))this[_0x1c846d(0x448)][_0x1c846d(0x24c)][_0x1c846d(0x2ba)]=RegExp['$1'][_0x1c846d(0x214)](',')[_0x1c846d(0x37a)](_0x45a207=>(Number(_0x45a207)||0x0)[_0x1c846d(0x301)](0x0,0xff));else{{const _0x1deff7=_0x221cce[_0x1c846d(0x3fc)][_0x1c846d(0x381)]['Footsteps'];this[_0x1c846d(0x416)]={'enabled':_0x1deff7[_0x1c846d(0x222)],'volumeRate':_0x1deff7[_0x1c846d(0x230)],'pitchRate':_0x1deff7[_0x1c846d(0x21c)],'soundFrames':_0x1deff7[_0x1c846d(0x3ac)][_0x1c846d(0x22f)]()};}{const _0xc13c07=_0x18f860['MovementEffects'][_0x1c846d(0x381)][_0x1c846d(0x218)];this[_0x1c846d(0x1bd)]={'enabled':!![],'dir1':_0x58704a[_0x1c846d(0x21b)](_0x187bba[_0x1c846d(0x40a)](_0xc13c07[_0x1c846d(0x265)])),'dir2':_0x190062['parse'](_0x3b71b6['stringify'](_0xc13c07[_0x1c846d(0x3bf)])),'dir3':_0x225fe4['parse'](_0x203f2e['stringify'](_0xc13c07['dir3'])),'dir4':_0x2e8c2f[_0x1c846d(0x21b)](_0x5db2cc[_0x1c846d(0x40a)](_0xc13c07[_0x1c846d(0x28a)])),'dir6':_0x46d57b[_0x1c846d(0x21b)](_0x471465[_0x1c846d(0x40a)](_0xc13c07[_0x1c846d(0x38c)])),'dir7':_0x25472e[_0x1c846d(0x21b)](_0x2cb026['stringify'](_0xc13c07[_0x1c846d(0x36f)])),'dir8':_0x198d26['parse'](_0x5827b8[_0x1c846d(0x40a)](_0xc13c07[_0x1c846d(0x3e4)])),'dir9':_0xc23f47[_0x1c846d(0x21b)](_0x52859d['stringify'](_0xc13c07['dir9']))};}this[_0x1c846d(0x319)]={'nonLand':![],'nonPass':![]};}}_0x5848b4[_0x1c846d(0x471)](_0x564268['NonFootprintRegions'])&&('kIXtK'!==_0x1c846d(0x3f7)?this[_0x1c846d(0x448)][_0x1c846d(0x322)]['regions']=RegExp['$1'][_0x1c846d(0x214)](',')[_0x1c846d(0x37a)](_0x1370f7=>(Number(_0x1370f7)||0x0)[_0x1c846d(0x301)](0x0,0xff)):this['_smartJump'][_0x1c846d(0x1b2)]=_0x34b0d4['$1']['split'](',')[_0x1c846d(0x37a)](_0x15bbdc=>(_0x5abcca(_0x15bbdc)||0x0)['clamp'](0x0,0xff)));const _0x4a6870=_0x5848b4[_0x1c846d(0x471)](_0x564268['RegionFootprintOpacity']);if(_0x4a6870)for(const _0x1971b7 of _0x4a6870){_0x1971b7[_0x1c846d(0x471)](_0x564268[_0x1c846d(0x24b)]);const _0x2670b8=Number(RegExp['$1'])[_0x1c846d(0x301)](0x0,0xff),_0x4d6873=Number(RegExp['$2'])[_0x1c846d(0x301)](0x0,0xff);this[_0x1c846d(0x448)][_0x1c846d(0x2d4)][_0x1c846d(0x2ba)][_0x2670b8]=_0x4d6873;}const _0x58a558=_0x5848b4['match'](_0x564268[_0x1c846d(0x311)]);if(_0x58a558)for(const _0xab5e4 of _0x58a558){_0xab5e4['match'](_0x564268[_0x1c846d(0x311)]);const _0x461cdb=Number(RegExp['$1'])[_0x1c846d(0x301)](0x0,0xff),_0x40a7c9=Math['max'](0x1,Number(RegExp['$2']));this['_footprints']['duration'][_0x1c846d(0x2ba)][_0x461cdb]=_0x40a7c9;}},Game_Map[_0x5f4be9(0x1c6)]['parseTerrainTagBasedFootprints']=function(){const _0x148ea1=_0x5f4be9;if(!this[_0x148ea1(0x33d)]())return;if(this['_footprints']===undefined)this[_0x148ea1(0x1cf)]();const _0x5edd9a=VisuMZ[_0x148ea1(0x3fc)]['RegExp'],_0xa76f50=this['tileset']()[_0x148ea1(0x3ef)]||'';_0xa76f50[_0x148ea1(0x471)](_0x5edd9a[_0x148ea1(0x442)])&&(this[_0x148ea1(0x448)][_0x148ea1(0x24c)][_0x148ea1(0x2cb)]=RegExp['$1'][_0x148ea1(0x214)](',')[_0x148ea1(0x37a)](_0x3a6aaa=>(Number(_0x3a6aaa)||0x0)[_0x148ea1(0x301)](0x0,0x7)));_0xa76f50[_0x148ea1(0x471)](_0x5edd9a[_0x148ea1(0x1fd)])&&(_0x148ea1(0x432)!==_0x148ea1(0x432)?(_0x201aa7[_0x148ea1(0x3fc)]['Game_Player_reserveTransfer'][_0x148ea1(0x2ce)](this,_0x23db73,_0x2c14a8,_0x39412a,_0x50ea66,_0x65fc41),this[_0x148ea1(0x334)]()):this[_0x148ea1(0x448)][_0x148ea1(0x322)][_0x148ea1(0x2cb)]=RegExp['$1']['split'](',')[_0x148ea1(0x37a)](_0x3f39d1=>(Number(_0x3f39d1)||0x0)[_0x148ea1(0x301)](0x0,0x7)));const _0x31adad=_0xa76f50[_0x148ea1(0x471)](_0x5edd9a[_0x148ea1(0x2e9)]);if(_0x31adad){if(_0x148ea1(0x2e4)===_0x148ea1(0x43a))this['_footprints'][_0x148ea1(0x24c)][_0x148ea1(0x2cb)]=_0x589c1b['$1'][_0x148ea1(0x214)](',')[_0x148ea1(0x37a)](_0x1289cf=>(_0x45e5e5(_0x1289cf)||0x0)['clamp'](0x0,0x7));else for(const _0x166d04 of _0x31adad){_0x166d04[_0x148ea1(0x471)](_0x5edd9a[_0x148ea1(0x2e9)]);const _0x33688f=Number(RegExp['$1'])[_0x148ea1(0x301)](0x0,0xff),_0x5806b1=Number(RegExp['$2'])[_0x148ea1(0x301)](0x0,0xff);this[_0x148ea1(0x448)][_0x148ea1(0x2d4)][_0x148ea1(0x2cb)][_0x33688f]=_0x5806b1;}}const _0x1f8e62=_0xa76f50[_0x148ea1(0x471)](_0x5edd9a[_0x148ea1(0x35d)]);if(_0x1f8e62)for(const _0x16916d of _0x1f8e62){_0x16916d['match'](_0x5edd9a[_0x148ea1(0x35d)]);const _0x2ea585=Number(RegExp['$1'])[_0x148ea1(0x301)](0x0,0xff),_0x1cae1d=Math[_0x148ea1(0x3bd)](0x1,Number(RegExp['$2']));this['_footprints'][_0x148ea1(0x1b9)][_0x148ea1(0x2cb)][_0x2ea585]=_0x1cae1d;}},Game_Map[_0x5f4be9(0x1c6)]['footprintOpacityAtXy']=function(_0x28b89f,_0x1728b8){const _0x5b8f17=_0x5f4be9;if(this[_0x5b8f17(0x448)]===undefined)this['setupRegionTerrainTagFootprints']();const _0x26385b=VisuMZ[_0x5b8f17(0x3fc)][_0x5b8f17(0x381)][_0x5b8f17(0x218)],_0x486165=this[_0x5b8f17(0x2c4)](_0x28b89f,_0x1728b8),_0x26582d=this[_0x5b8f17(0x467)](_0x28b89f,_0x1728b8);if(this[_0x5b8f17(0x448)][_0x5b8f17(0x2d4)]['regions'][_0x486165]!==undefined)return _0x5b8f17(0x3ea)!==_0x5b8f17(0x382)?this[_0x5b8f17(0x448)][_0x5b8f17(0x2d4)][_0x5b8f17(0x2ba)][_0x486165]:!![];else{if(this[_0x5b8f17(0x448)][_0x5b8f17(0x2d4)][_0x5b8f17(0x2cb)][_0x26582d]!==undefined)return this[_0x5b8f17(0x448)][_0x5b8f17(0x2d4)][_0x5b8f17(0x2cb)][_0x26582d];}return _0x26385b[_0x5b8f17(0x1b5)];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ab)]=function(_0x23febe,_0x2b20e3){const _0x3018e1=_0x5f4be9;if(this['_footprints']===undefined)this[_0x3018e1(0x1cf)]();const _0x373982=VisuMZ['MovementEffects'][_0x3018e1(0x381)][_0x3018e1(0x218)],_0xe3124a=this[_0x3018e1(0x2c4)](_0x23febe,_0x2b20e3),_0x344c69=this[_0x3018e1(0x467)](_0x23febe,_0x2b20e3);if(this[_0x3018e1(0x448)][_0x3018e1(0x1b9)][_0x3018e1(0x2ba)][_0xe3124a]!==undefined)return this[_0x3018e1(0x448)][_0x3018e1(0x1b9)]['regions'][_0xe3124a];else{if(this['_footprints'][_0x3018e1(0x1b9)][_0x3018e1(0x2cb)][_0x344c69]!==undefined)return this[_0x3018e1(0x448)]['duration'][_0x3018e1(0x2cb)][_0x344c69];}return _0x373982[_0x3018e1(0x47d)];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x3b6)]=function(){const _0x30a8a9=_0x5f4be9;this[_0x30a8a9(0x338)](),this[_0x30a8a9(0x327)](),this[_0x30a8a9(0x37b)]();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x338)]=function(){const _0x130d2c=_0x5f4be9,_0x363a9d=VisuMZ[_0x130d2c(0x3fc)][_0x130d2c(0x381)][_0x130d2c(0x31e)];this[_0x130d2c(0x2b3)]={'enabled':!![],'NonCrashRegions':(_0x363a9d[_0x130d2c(0x3aa)]||[])[_0x130d2c(0x22f)](),'NonCrashTerrainTags':(_0x363a9d[_0x130d2c(0x21e)]||[])['clone']()};},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x327)]=function(){const _0x528574=_0x5f4be9,_0x39473b=VisuMZ['MovementEffects'][_0x528574(0x203)],_0x26b08d=$dataMap['note']||'';_0x26b08d[_0x528574(0x471)](_0x39473b[_0x528574(0x479)])&&(this[_0x528574(0x2b3)][_0x528574(0x40d)]=![]),_0x26b08d['match'](_0x39473b[_0x528574(0x42f)])&&(this[_0x528574(0x2b3)][_0x528574(0x3aa)]=RegExp['$1'][_0x528574(0x214)](',')['map'](_0xae86b4=>(Number(_0xae86b4)||0x0)[_0x528574(0x301)](0x0,0xff)));},Game_Map['prototype'][_0x5f4be9(0x37b)]=function(){const _0xcb8d97=_0x5f4be9,_0x5ab72e=VisuMZ[_0xcb8d97(0x3fc)][_0xcb8d97(0x203)];if(!this['tileset']())return;const _0x45e906=this[_0xcb8d97(0x33d)]()['note']||'';_0x45e906[_0xcb8d97(0x471)](_0x5ab72e[_0xcb8d97(0x1c1)])&&('ymebD'===_0xcb8d97(0x450)?this[_0xcb8d97(0x2b3)][_0xcb8d97(0x21e)]=RegExp['$1']['split'](',')['map'](_0x3cd99d=>(Number(_0x3cd99d)||0x0)[_0xcb8d97(0x301)](0x0,0x7)):this[_0xcb8d97(0x33c)](_0x435517,_0x3f74b7));},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x357)]=function(){const _0x2ee370=_0x5f4be9;if(this[_0x2ee370(0x2b3)]===undefined)this[_0x2ee370(0x3b6)]();return this[_0x2ee370(0x2b3)][_0x2ee370(0x40d)];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2c5)]=function(_0x2eda04,_0x24757b,_0x5078dc){const _0x1c4def=_0x5f4be9,_0x400ccf=this[_0x1c4def(0x1fb)](_0x2eda04,_0x5078dc),_0x1a7dba=this[_0x1c4def(0x284)](_0x24757b,_0x5078dc);if(_0x400ccf<0x0||_0x400ccf>=this[_0x1c4def(0x240)]())return![];if(_0x1a7dba<0x0||_0x1a7dba>=this[_0x1c4def(0x1f5)]())return![];const _0x3e2b12=this[_0x1c4def(0x2c4)](_0x400ccf,_0x1a7dba);if(this['_smartRush'][_0x1c4def(0x3aa)]['includes'](_0x3e2b12))return![];const _0x22f04e=this[_0x1c4def(0x467)](_0x400ccf,_0x1a7dba);if(this[_0x1c4def(0x2b3)][_0x1c4def(0x21e)][_0x1c4def(0x336)](_0x22f04e))return![];return Game_Player[_0x1c4def(0x1de)];},Game_Map['prototype']['setupRegionTerrainTagSmartBlink']=function(){const _0x12b9cb=_0x5f4be9;this['initRegionTerrainTagSmartBlink'](),this[_0x12b9cb(0x3e1)](),this[_0x12b9cb(0x371)]();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x270)]=function(){const _0x59821c=_0x5f4be9,_0x2529d7=VisuMZ[_0x59821c(0x3fc)][_0x59821c(0x381)][_0x59821c(0x44c)];this[_0x59821c(0x3ce)]={'enabled':!![],'NonLandableRegions':(_0x2529d7[_0x59821c(0x26f)]||[])['clone'](),'NonLandableTerrainTags':(_0x2529d7[_0x59821c(0x38a)]||[])[_0x59821c(0x22f)](),'NonPassableRegions':(_0x2529d7[_0x59821c(0x1b2)]||[])[_0x59821c(0x22f)](),'NonPassableTerrainTags':(_0x2529d7[_0x59821c(0x2b2)]||[])[_0x59821c(0x22f)]()};},Game_Map[_0x5f4be9(0x1c6)]['parseRegionBasedSmartBlink']=function(){const _0x513ef4=_0x5f4be9,_0x1ef0af=VisuMZ[_0x513ef4(0x3fc)]['RegExp'],_0x4573cf=$dataMap[_0x513ef4(0x3ef)]||'';if(_0x4573cf['match'](_0x1ef0af[_0x513ef4(0x447)])){if(_0x513ef4(0x37c)===_0x513ef4(0x440))return this[_0x513ef4(0x448)]['duration'][_0x513ef4(0x2cb)][_0x344a3d];else this[_0x513ef4(0x3ce)]['enabled']=![];}_0x4573cf[_0x513ef4(0x471)](_0x1ef0af[_0x513ef4(0x2e7)])&&(this[_0x513ef4(0x3ce)][_0x513ef4(0x26f)]=RegExp['$1']['split'](',')[_0x513ef4(0x37a)](_0x296db0=>(Number(_0x296db0)||0x0)[_0x513ef4(0x301)](0x0,0xff))),_0x4573cf['match'](_0x1ef0af[_0x513ef4(0x221)])&&(this[_0x513ef4(0x3ce)][_0x513ef4(0x1b2)]=RegExp['$1'][_0x513ef4(0x214)](',')[_0x513ef4(0x37a)](_0x385a37=>(Number(_0x385a37)||0x0)['clamp'](0x0,0xff)));},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x371)]=function(){const _0x4ce2ee=_0x5f4be9,_0x570bc7=VisuMZ[_0x4ce2ee(0x3fc)]['RegExp'];if(!this[_0x4ce2ee(0x33d)]())return;const _0x1914f4=this[_0x4ce2ee(0x33d)]()[_0x4ce2ee(0x3ef)]||'';_0x1914f4[_0x4ce2ee(0x471)](_0x570bc7[_0x4ce2ee(0x269)])&&(this[_0x4ce2ee(0x3ce)][_0x4ce2ee(0x38a)]=RegExp['$1'][_0x4ce2ee(0x214)](',')['map'](_0x142e5b=>(Number(_0x142e5b)||0x0)[_0x4ce2ee(0x301)](0x0,0x7))),_0x1914f4[_0x4ce2ee(0x471)](_0x570bc7[_0x4ce2ee(0x418)])&&(this[_0x4ce2ee(0x3ce)][_0x4ce2ee(0x2b2)]=RegExp['$1'][_0x4ce2ee(0x214)](',')[_0x4ce2ee(0x37a)](_0x4833c3=>(Number(_0x4833c3)||0x0)[_0x4ce2ee(0x301)](0x0,0x7)));},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x360)]=function(){const _0x58e380=_0x5f4be9;if(this['_smartBlink']===undefined)this[_0x58e380(0x412)]();return this['_smartBlink'][_0x58e380(0x40d)];},Game_Map[_0x5f4be9(0x1c6)]['isTileSmartBlinkNonPassable']=function(_0x3c3dd6,_0x2fafe8){const _0x312dd5=_0x5f4be9,_0xab3fae=this[_0x312dd5(0x2c4)](_0x3c3dd6,_0x2fafe8),_0x5a60fe=this[_0x312dd5(0x467)](_0x3c3dd6,_0x2fafe8);if(this['_smartBlink']===undefined)this[_0x312dd5(0x412)]();if(this[_0x312dd5(0x3ce)][_0x312dd5(0x1b2)][_0x312dd5(0x336)](_0xab3fae))return!![];if(this[_0x312dd5(0x3ce)]['NonPassableTerrainTags'][_0x312dd5(0x336)](_0x5a60fe))return!![];return![];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x3e3)]=function(_0xc2a789,_0x3b0a7a){const _0x538e2b=_0x5f4be9,_0x2e7153=this[_0x538e2b(0x2c4)](_0xc2a789,_0x3b0a7a),_0x5ae5e6=this[_0x538e2b(0x467)](_0xc2a789,_0x3b0a7a);if(this[_0x538e2b(0x3ce)]===undefined)this[_0x538e2b(0x412)]();if(this[_0x538e2b(0x3ce)][_0x538e2b(0x26f)]['includes'](_0x2e7153))return!![];if(this['_smartBlink']['NonLandableTerrainTags'][_0x538e2b(0x336)](_0x5ae5e6))return!![];return![];},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x348)]=function(){const _0x4ccfd6=_0x5f4be9;this[_0x4ccfd6(0x1d8)](),this[_0x4ccfd6(0x400)](),this[_0x4ccfd6(0x29d)]();},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1d8)]=function(){const _0x317754=_0x5f4be9,_0x5ab646=VisuMZ[_0x317754(0x3fc)][_0x317754(0x381)][_0x317754(0x2c8)];this[_0x317754(0x298)]={'enabled':!![],'HeightBasedRegions':(_0x5ab646[_0x317754(0x2a1)]||[])[_0x317754(0x22f)](),'NonLandableRegions':(_0x5ab646[_0x317754(0x26f)]||[])['clone'](),'NonLandableTerrainTags':(_0x5ab646[_0x317754(0x38a)]||[])[_0x317754(0x22f)](),'NonPassableRegions':(_0x5ab646[_0x317754(0x1b2)]||[])[_0x317754(0x22f)](),'NonPassableTerrainTags':(_0x5ab646['NonPassableTerrainTags']||[])[_0x317754(0x22f)]()};},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x400)]=function(){const _0x24a0a4=_0x5f4be9,_0x357f29=VisuMZ['MovementEffects'][_0x24a0a4(0x203)],_0x3178e2=$dataMap[_0x24a0a4(0x3ef)]||'';_0x3178e2[_0x24a0a4(0x471)](_0x357f29['NoSmartJump'])&&(this[_0x24a0a4(0x298)][_0x24a0a4(0x40d)]=![]);if(_0x3178e2[_0x24a0a4(0x471)](_0x357f29[_0x24a0a4(0x2b8)])){if(_0x24a0a4(0x2f4)!==_0x24a0a4(0x2f4)){let _0x561218='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x24a0a4(0x353)](_0x1bc7cf)){_0x561218=_0x58359f[_0x24a0a4(0x309)](0x1)[_0x24a0a4(0x214)]('');_0x561218[_0x24a0a4(0x285)]===0x3&&(_0x561218=[_0x561218[0x0],_0x561218[0x0],_0x561218[0x1],_0x561218[0x1],_0x561218[0x2],_0x561218[0x2]]);while(_0x561218[_0x24a0a4(0x285)]>0x6)_0x561218[_0x24a0a4(0x27b)]();return _0x561218='0x'+_0x561218['join'](''),_0x24a0a4(0x26c)+[(_0x561218>>0x10&0xff)[_0x24a0a4(0x301)](0x0,0xff),(_0x561218>>0x8&0xff)[_0x24a0a4(0x301)](0x0,0xff),(_0x561218&0xff)[_0x24a0a4(0x301)](0x0,0xff)][_0x24a0a4(0x23e)](',')+','+_0x8c7be[_0x24a0a4(0x301)](0x0,0x1)+')';}else return _0x24a0a4(0x202);}else this[_0x24a0a4(0x298)][_0x24a0a4(0x29f)]=Number(RegExp['$1'])[_0x24a0a4(0x301)](0x0,0xff);}_0x3178e2[_0x24a0a4(0x471)](_0x357f29[_0x24a0a4(0x247)])&&(this[_0x24a0a4(0x298)][_0x24a0a4(0x2a1)]=RegExp['$1'][_0x24a0a4(0x214)](',')['map'](_0xe63e9e=>(Number(_0xe63e9e)||0x0)[_0x24a0a4(0x301)](0x0,0xff)),this[_0x24a0a4(0x298)][_0x24a0a4(0x2a1)]['sort']()),_0x3178e2['match'](_0x357f29[_0x24a0a4(0x37e)])&&(this['_smartJump']['NonLandableRegions']=RegExp['$1'][_0x24a0a4(0x214)](',')[_0x24a0a4(0x37a)](_0x3472cb=>(Number(_0x3472cb)||0x0)[_0x24a0a4(0x301)](0x0,0xff))),_0x3178e2[_0x24a0a4(0x471)](_0x357f29[_0x24a0a4(0x47a)])&&(this['_smartJump'][_0x24a0a4(0x1b2)]=RegExp['$1'][_0x24a0a4(0x214)](',')['map'](_0x471943=>(Number(_0x471943)||0x0)['clamp'](0x0,0xff)));},Game_Map[_0x5f4be9(0x1c6)]['parseTerrainTagBasedSmartJump']=function(){const _0x39dbcf=_0x5f4be9,_0x29f15b=VisuMZ['MovementEffects'][_0x39dbcf(0x203)];if(!this[_0x39dbcf(0x33d)]())return;const _0xd1664=this['tileset']()[_0x39dbcf(0x3ef)]||'';_0xd1664[_0x39dbcf(0x471)](_0x29f15b[_0x39dbcf(0x24d)])&&(this[_0x39dbcf(0x298)][_0x39dbcf(0x38a)]=RegExp['$1'][_0x39dbcf(0x214)](',')[_0x39dbcf(0x37a)](_0x55a81c=>(Number(_0x55a81c)||0x0)[_0x39dbcf(0x301)](0x0,0x7))),_0xd1664[_0x39dbcf(0x471)](_0x29f15b[_0x39dbcf(0x427)])&&(_0x39dbcf(0x212)===_0x39dbcf(0x212)?this['_smartJump'][_0x39dbcf(0x2b2)]=RegExp['$1'][_0x39dbcf(0x214)](',')[_0x39dbcf(0x37a)](_0x88be2c=>(Number(_0x88be2c)||0x0)[_0x39dbcf(0x301)](0x0,0x7)):(this[_0x39dbcf(0x1f2)]=![],this[_0x39dbcf(0x3d9)]=this['_realX'],this[_0x39dbcf(0x2fb)]=this[_0x39dbcf(0x2a6)]));},Game_Map['prototype'][_0x5f4be9(0x1bf)]=function(){const _0x31f817=_0x5f4be9;if(this['_smartJump']===undefined)this['setupRegionTerrainTagSmartJump']();return this['_smartJump'][_0x31f817(0x40d)];},Game_Map[_0x5f4be9(0x1c6)]['isTileSmartHeightJumpRegion']=function(_0x1363d9,_0x2336c9){const _0x506eaf=_0x5f4be9;if(this[_0x506eaf(0x298)]===undefined)this[_0x506eaf(0x348)]();const _0x3aa0a6=this['regionId'](_0x1363d9,_0x2336c9);return this[_0x506eaf(0x1d5)](_0x3aa0a6);;},Game_Map['prototype']['isSmartJumpRegionLowestHeight']=function(_0x49ddf7){const _0x1234a2=_0x5f4be9;if(this[_0x1234a2(0x298)]===undefined)this[_0x1234a2(0x348)]();const _0x4c80ba=this[_0x1234a2(0x298)][_0x1234a2(0x2a1)][_0x1234a2(0x3a6)](_0x49ddf7);return _0x4c80ba===0x0;},Game_Map['prototype']['isHeightBasedRegion']=function(_0x1950db){const _0x38dd07=_0x5f4be9;if(this[_0x38dd07(0x298)]===undefined)this[_0x38dd07(0x348)]();return this[_0x38dd07(0x298)][_0x38dd07(0x2a1)][_0x38dd07(0x336)](_0x1950db);},Game_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x217)]=function(_0x414a63,_0x40004b,_0x77ee91){const _0x7f02c=_0x5f4be9,_0x482b55=$gamePlayer[_0x7f02c(0x2c4)](),_0x474958=this['regionId'](_0x414a63,_0x40004b);if(this[_0x7f02c(0x1d5)](_0x482b55)){const _0x275e49=$gamePlayer[_0x7f02c(0x3a4)]();if(this['isSmartJumpRegionLowestHeight'](_0x482b55)&&this['isSmartJumpRegionLowestHeight'](_0x474958))return!![];if(_0x275e49!==0x2&&this['isSmartJumpRegionLowestHeight'](_0x474958)){if(_0x7f02c(0x339)==='GldNZ'){if(_0x77ee91>=0x1)return![];}else this[_0x7f02c(0x35c)]()&&(_0x430e4b[_0x7f02c(0x45d)](this['_smartRushMode']),this[_0x7f02c(0x46a)]()),this[_0x7f02c(0x286)]=0x0;}if(this[_0x7f02c(0x1d5)](_0x474958))return _0x482b55>=_0x474958;else{if(_0x7f02c(0x3eb)===_0x7f02c(0x3eb)){const _0x1d3b25=this[_0x7f02c(0x298)][_0x7f02c(0x2a1)][_0x7f02c(0x3a6)](_0x482b55);return _0x1d3b25<=0x0;}else{const _0x555f0a=_0x221bff[_0x7f02c(0x3fc)][_0x7f02c(0x381)][_0x7f02c(0x218)];this[_0x7f02c(0x1bd)]={'enabled':!![],'dir1':_0x2bd306[_0x7f02c(0x21b)](_0x189799[_0x7f02c(0x40a)](_0x555f0a['dir1'])),'dir2':_0x412c83['parse'](_0x3b7673['stringify'](_0x555f0a[_0x7f02c(0x3bf)])),'dir3':_0x2b8db0[_0x7f02c(0x21b)](_0x5d6aa2[_0x7f02c(0x40a)](_0x555f0a[_0x7f02c(0x41b)])),'dir4':_0x49e149[_0x7f02c(0x21b)](_0x14ad5b[_0x7f02c(0x40a)](_0x555f0a[_0x7f02c(0x28a)])),'dir6':_0x4babd8[_0x7f02c(0x21b)](_0x46ac19[_0x7f02c(0x40a)](_0x555f0a[_0x7f02c(0x38c)])),'dir7':_0x3e4223[_0x7f02c(0x21b)](_0x49e385[_0x7f02c(0x40a)](_0x555f0a[_0x7f02c(0x36f)])),'dir8':_0x726803[_0x7f02c(0x21b)](_0x25911c[_0x7f02c(0x40a)](_0x555f0a[_0x7f02c(0x3e4)])),'dir9':_0x1e4598['parse'](_0x49b8a5['stringify'](_0x555f0a['dir9']))};}}}if(this['isHeightBasedRegion'](_0x474958)){if('BZJdh'!==_0x7f02c(0x2d0)){const _0x4e623a=this[_0x7f02c(0x298)][_0x7f02c(0x2a1)][_0x7f02c(0x3a6)](_0x474958);return _0x4e623a<=0x0;}else this['updateScrollLinkedPosition']();}else{if(_0x7f02c(0x2f2)!==_0x7f02c(0x19d))return!![];else this[_0x7f02c(0x286)]=0x0,_0x39bd67(this[_0x7f02c(0x1be)][_0x7f02c(0x225)](this,![]),0x32);}},Game_Map[_0x5f4be9(0x1c6)]['isTileSmartJumpNonPassable']=function(_0x3d5403,_0x4d4000){const _0x247898=_0x5f4be9,_0x5b75e0=this[_0x247898(0x2c4)](_0x3d5403,_0x4d4000),_0x577e9a=this[_0x247898(0x467)](_0x3d5403,_0x4d4000);if(this['_smartJump']===undefined)this['setupRegionTerrainTagSmartJump']();if(this[_0x247898(0x298)]['NonPassableRegions'][_0x247898(0x336)](_0x5b75e0))return!![];if(this['_smartJump'][_0x247898(0x2b2)][_0x247898(0x336)](_0x577e9a))return!![];const _0x366b8a=this[_0x247898(0x341)](_0x3d5403,_0x4d4000);for(const _0x108cb4 of _0x366b8a){if(_0x247898(0x1dd)!==_0x247898(0x1dd))_0x25c0c5[_0x247898(0x2c6)](_0x10f547,_0xd7d90a);else{if(!_0x108cb4)continue;if(_0x108cb4['_erased'])continue;if(_0x108cb4[_0x247898(0x3f0)]())return!![];}}return![];},Game_Map[_0x5f4be9(0x1c6)]['isTileSmartJumpNonLandable']=function(_0x39545e,_0x44a9b6){const _0x3bfddd=_0x5f4be9,_0x4633e7=this[_0x3bfddd(0x2c4)](_0x39545e,_0x44a9b6),_0x3e6780=this[_0x3bfddd(0x467)](_0x39545e,_0x44a9b6);if(this[_0x3bfddd(0x298)]===undefined)this[_0x3bfddd(0x348)]();if(this[_0x3bfddd(0x298)]['NonLandableRegions'][_0x3bfddd(0x336)](_0x4633e7))return!![];if(this[_0x3bfddd(0x298)][_0x3bfddd(0x38a)]['includes'](_0x3e6780))return!![];const _0x3805f7=this[_0x3bfddd(0x341)](_0x39545e,_0x44a9b6);for(const _0x52acf7 of _0x3805f7){if(!_0x52acf7)continue;if(_0x52acf7[_0x3bfddd(0x462)])continue;if(_0x52acf7['notSmartJumpLandable']())return!![];}return![];},VisuMZ['MovementEffects'][_0x5f4be9(0x474)]=Game_CharacterBase['prototype'][_0x5f4be9(0x393)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x393)]=function(){const _0x150092=_0x5f4be9;VisuMZ[_0x150092(0x3fc)][_0x150092(0x474)]['call'](this),this['initMovementEffectsMotionTrails']();},VisuMZ['MovementEffects']['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x5f4be9(0x1c6)]['increaseSteps'],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x306)]=function(){const _0x9b0b0c=_0x5f4be9;VisuMZ[_0x9b0b0c(0x3fc)][_0x9b0b0c(0x2ca)][_0x9b0b0c(0x2ce)](this);if(this[_0x9b0b0c(0x3c1)]())this['createDustCloud']();!this[_0x9b0b0c(0x2a0)]()&&this[_0x9b0b0c(0x3c5)]()&&this['playFootstepSound']();},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x364)]=Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x238)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x238)]=function(){const _0xfbcfab=_0x5f4be9;VisuMZ[_0xfbcfab(0x3fc)]['Game_CharacterBase_updatePattern'][_0xfbcfab(0x2ce)](this);if(this[_0xfbcfab(0x3b5)]()&&this['canMakeFootprints']()){if(_0xfbcfab(0x425)==='yuAPf'){const _0x420f7e=_0x27ab00['MovementEffectsOptions'][_0xfbcfab(0x288)],_0x2de09e=_0xfbcfab(0x2f3);this[_0xfbcfab(0x46f)](_0x420f7e,_0x2de09e);}else this[_0xfbcfab(0x1fa)]();}this[_0xfbcfab(0x34b)]()&&this[_0xfbcfab(0x3c5)]()&&this[_0xfbcfab(0x37f)]();},Game_CharacterBase[_0x5f4be9(0x1c6)]['canCreateDustCloud']=function(){const _0x261563=_0x5f4be9;if(this[_0x261563(0x23c)]===Game_Follower&&!this[_0x261563(0x356)]())return![];if(this[_0x261563(0x23c)]===Game_Player&&this['isInVehicle']())return![];if(!this[_0x261563(0x34a)]())return![];if(this[_0x261563(0x343)]())return![];return $gameMap[_0x261563(0x2e8)]();},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x1c5)]=function(){const _0x1b1391=_0x5f4be9,_0x438afd=SceneManager[_0x1b1391(0x419)][_0x1b1391(0x370)];if(_0x438afd)_0x438afd[_0x1b1391(0x1e4)](this);},Game_CharacterBase[_0x5f4be9(0x1c6)]['isPlayFootstepSoundsByFrame']=function(){const _0xecb167=_0x5f4be9;return VisuMZ[_0xecb167(0x3fc)][_0xecb167(0x381)][_0xecb167(0x288)][_0xecb167(0x27f)];},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x33b)]=Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x3ff)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x3ff)]=function(){const _0x525d9d=_0x5f4be9;let _0x34627=VisuMZ[_0x525d9d(0x3fc)]['Game_CharacterBase_animationWait'][_0x525d9d(0x2ce)](this);if(this[_0x525d9d(0x302)]()){const _0x5bcda4=VisuMZ[_0x525d9d(0x3fc)][_0x525d9d(0x381)][_0x525d9d(0x288)][_0x525d9d(0x3d7)]??1.5;_0x34627=Math[_0x525d9d(0x480)](_0x34627/Math[_0x525d9d(0x3bd)](_0x5bcda4,0x1));if(this[_0x525d9d(0x34a)]()){const _0x154413=VisuMZ[_0x525d9d(0x3fc)][_0x525d9d(0x381)]['Footsteps'][_0x525d9d(0x437)]??1.5;_0x34627=Math[_0x525d9d(0x480)](_0x34627/Math[_0x525d9d(0x3bd)](_0x154413,0x1));}}return _0x34627;},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x34b)]=function(){const _0x332413=_0x5f4be9;if(!this[_0x332413(0x2a0)]())return![];if(this[_0x332413(0x235)]()&&!this[_0x332413(0x302)]())return![];if(this[_0x332413(0x3b7)]())return![];if(this[_0x332413(0x1c2)]())return![];const _0x5eafc5=this[_0x332413(0x413)]()[_0x332413(0x20e)]??[];if(_0x5eafc5[_0x332413(0x285)]<=0x0)return!![];return _0x5eafc5['includes'](this[_0x332413(0x45a)]());},Game_CharacterBase['prototype'][_0x5f4be9(0x3c5)]=function(){const _0x218217=_0x5f4be9;if(this[_0x218217(0x23c)]===Game_Follower&&!this[_0x218217(0x356)]())return![];if(this['constructor']===Game_Player&&this[_0x218217(0x345)]())return![];if(this[_0x218217(0x343)]())return![];return this[_0x218217(0x413)]()[_0x218217(0x40d)]&&$gameMap[_0x218217(0x3c5)]();},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x37f)]=function(){const _0x1999f5=_0x5f4be9;SoundManager[_0x1999f5(0x3e5)](this);},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x413)]=function(){return{'enabled':!![],'volumeRate':0x1,'pitchRate':0x1};},Game_CharacterBase['prototype']['meetFootprintFrames']=function(){const _0xbccfa3=_0x5f4be9;if(this[_0xbccfa3(0x235)]()&&!this[_0xbccfa3(0x302)]())return![];if(this[_0xbccfa3(0x3b7)]())return![];if(this[_0xbccfa3(0x1c2)]())return![];const _0x1093c1='dir%1'['format'](this['_direction']),_0x52fe2f=_0xbccfa3(0x1e8)['format'](this['pattern']()),_0x33766d=this[_0xbccfa3(0x426)]();if(_0x33766d[_0x1093c1]){if(_0x33766d[_0x1093c1][_0x52fe2f]){if(_0xbccfa3(0x457)===_0xbccfa3(0x457)){if(_0x33766d[_0x1093c1][_0x52fe2f][_0xbccfa3(0x1e3)]!=='')return!![];if(_0x33766d[_0x1093c1][_0x52fe2f][_0xbccfa3(0x240)]>0x0)return!![];if(_0x33766d[_0x1093c1][_0x52fe2f]['height']>0x0)return!![];}else return this['_smartJumpMode'];}}return![];},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x1bb)]=function(){const _0x577149=_0x5f4be9;if(this['constructor']===Game_Follower&&!this[_0x577149(0x356)]())return![];if(this['constructor']===Game_Player&&this[_0x577149(0x345)]())return![];if(this[_0x577149(0x343)]())return![];const _0x412702=this['x'],_0x924060=this['y'];return this[_0x577149(0x426)]()[_0x577149(0x40d)]&&$gameMap[_0x577149(0x1bb)](_0x412702,_0x924060);},Game_CharacterBase['prototype'][_0x5f4be9(0x426)]=function(){const _0x3c83f0=_0x5f4be9,_0x9dc98f=VisuMZ['MovementEffects'][_0x3c83f0(0x381)][_0x3c83f0(0x218)];return{'enabled':!![],'dir1':_0x9dc98f['dir1'],'dir2':_0x9dc98f[_0x3c83f0(0x3bf)],'dir3':_0x9dc98f[_0x3c83f0(0x41b)],'dir4':_0x9dc98f['dir4'],'dir6':_0x9dc98f['dir6'],'dir7':_0x9dc98f[_0x3c83f0(0x36f)],'dir8':_0x9dc98f['dir8'],'dir9':_0x9dc98f[_0x3c83f0(0x278)]};},Game_CharacterBase['prototype']['createFootprint']=function(){const _0x503316=_0x5f4be9,_0x20ff22=SceneManager['_scene'][_0x503316(0x370)];if(_0x20ff22)_0x20ff22[_0x503316(0x1b0)](this);},Game_CharacterBase['prototype'][_0x5f4be9(0x2f7)]=function(){this['_motionTrailSettings']={'enabled':![],'delay':0x4,'duration':0x1e,'hue':0x0,'opacityStart':0x80,'tone':[0x0,0x0,0x0,0x0]};},Game_CharacterBase['prototype'][_0x5f4be9(0x43d)]=function(){const _0xf1772=_0x5f4be9;if(this['_motionTrailSettings']===undefined)this[_0xf1772(0x2f7)]();return this['_motionTrailSettings'];},Game_CharacterBase['prototype']['enableMotionTrails']=function(_0xbba92f,_0x4e9b7b){const _0x30f3a3=_0x5f4be9;this[_0x30f3a3(0x43d)]()[_0x30f3a3(0x40d)]=_0xbba92f;if(!SceneManager[_0x30f3a3(0x268)]())return;if(!_0xbba92f)return;if(!_0x4e9b7b)return;const _0x472dd4=SceneManager[_0x30f3a3(0x419)][_0x30f3a3(0x370)];if(_0x472dd4){if(_0x30f3a3(0x35f)!==_0x30f3a3(0x1f0)){const _0x4b49b1=_0x472dd4['findTargetSprite'](this);if(_0x4b49b1){if(_0x30f3a3(0x330)===_0x30f3a3(0x321)){const _0xf757e3=_0x5e794d[_0x30f3a3(0x3fc)]['Settings'][_0x30f3a3(0x218)];this['_footprintsData']={'enabled':!![],'dir1':_0x1ed3be['parse'](_0xae874[_0x30f3a3(0x40a)](_0xf757e3['dir1'])),'dir2':_0x3a6eeb[_0x30f3a3(0x21b)](_0x1f0cea[_0x30f3a3(0x40a)](_0xf757e3['dir2'])),'dir3':_0x52309d[_0x30f3a3(0x21b)](_0x333e67[_0x30f3a3(0x40a)](_0xf757e3[_0x30f3a3(0x41b)])),'dir4':_0x5b066e['parse'](_0x1af15c[_0x30f3a3(0x40a)](_0xf757e3['dir4'])),'dir6':_0x26835a[_0x30f3a3(0x21b)](_0x28eeae[_0x30f3a3(0x40a)](_0xf757e3[_0x30f3a3(0x38c)])),'dir7':_0x592589[_0x30f3a3(0x21b)](_0x113e95[_0x30f3a3(0x40a)](_0xf757e3['dir7'])),'dir8':_0x4d8483[_0x30f3a3(0x21b)](_0x5abf5b[_0x30f3a3(0x40a)](_0xf757e3[_0x30f3a3(0x3e4)])),'dir9':_0x1f67fa[_0x30f3a3(0x21b)](_0x49b68e[_0x30f3a3(0x40a)](_0xf757e3[_0x30f3a3(0x278)]))};}else _0x4b49b1[_0x30f3a3(0x20b)]();}}else{_0x355223['ConvertParams'](_0x156290,_0x5e767f);const _0x1c8ed5=_0x3f6b07[_0x30f3a3(0x1e9)];_0x502198[_0x30f3a3(0x209)](_0x1c8ed5);}}},Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x1eb)]=function(_0x370340,_0x3c4fc7){const _0x2868dc=_0x5f4be9,_0x43137d=this['motionTrailData']()['enabled'];this[_0x2868dc(0x2de)]=JsonEx[_0x2868dc(0x2f6)](_0x370340);if(_0x3c4fc7)return;this[_0x2868dc(0x2de)][_0x2868dc(0x40d)]=_0x43137d;},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x224)]=Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x378)],Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x378)]=function(){const _0x49cc4a=_0x5f4be9;if(this[_0x49cc4a(0x30c)]())this[_0x49cc4a(0x30e)]();else{if(this[_0x49cc4a(0x468)]())this[_0x49cc4a(0x22b)]();else{if(_0x49cc4a(0x398)!==_0x49cc4a(0x398)){const _0x3cfa20=_0x49cc4a(0x308)[_0x49cc4a(0x3b1)](this['_direction']),_0x1faa15=_0x49cc4a(0x1e8)[_0x49cc4a(0x3b1)](this[_0x49cc4a(0x1d4)]),_0x4592bf=this[_0x49cc4a(0x475)][_0x49cc4a(0x426)]();return _0x4592bf[_0x3cfa20][_0x1faa15];}else VisuMZ[_0x49cc4a(0x3fc)]['Game_Player_moveByInput'][_0x49cc4a(0x2ce)](this),this['updateSmartMovementCooldowns']();}}},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x3d1)]=function(){const _0x464468=_0x5f4be9;this['updateSmartRushCooldown'](),this[_0x464468(0x358)](),this[_0x464468(0x28e)]();},VisuMZ[_0x5f4be9(0x3fc)]['Game_Player_updateScroll']=Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x2c0)],Game_Player[_0x5f4be9(0x1c6)]['updateScroll']=function(_0x10944d,_0x583fe5){const _0x248ee7=_0x5f4be9;this[_0x248ee7(0x379)]()?this[_0x248ee7(0x33c)](_0x10944d,_0x583fe5):_0x248ee7(0x2d1)===_0x248ee7(0x22e)?_0x51036c[_0x248ee7(0x20b)]():VisuMZ[_0x248ee7(0x3fc)]['Game_Player_updateScroll']['call'](this,_0x10944d,_0x583fe5);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x379)]=function(){const _0x38f864=_0x5f4be9;if(!$gameMap[_0x38f864(0x2da)]())return![];if($gameMap['isScrolling']()){if('YIZed'===_0x38f864(0x1a3))return this[_0x38f864(0x1f2)]=!![],this[_0x38f864(0x3d9)]=this[_0x38f864(0x3f1)],this[_0x38f864(0x2fb)]=this[_0x38f864(0x2a6)],![];else this['_smartJump'][_0x38f864(0x26f)]=_0x2b6a45['$1']['split'](',')[_0x38f864(0x37a)](_0x581a64=>(_0x14b89a(_0x581a64)||0x0)[_0x38f864(0x301)](0x0,0xff));}if(this[_0x38f864(0x1f2)]){if('XHLhq'==='XHLhq')return(this[_0x38f864(0x3d9)]!==this['_realX']||this[_0x38f864(0x2fb)]!==this['_realY'])&&(_0x38f864(0x380)===_0x38f864(0x380)?(this[_0x38f864(0x1f2)]=![],this[_0x38f864(0x3d9)]=this[_0x38f864(0x3f1)],this['_lastSmoothScrollY']=this[_0x38f864(0x2a6)]):this[_0x38f864(0x379)]()?this[_0x38f864(0x33c)](_0x58c21d,_0x6e4b93):_0x435fef[_0x38f864(0x3fc)][_0x38f864(0x369)]['call'](this,_0x4dfaf8,_0x84d4a4)),!this[_0x38f864(0x1f2)];else{const _0xb4212=_0x52e2bc[_0x38f864(0x3fc)][_0x38f864(0x203)];if(!this[_0x38f864(0x33d)]())return;const _0x3891ce=this[_0x38f864(0x33d)]()[_0x38f864(0x3ef)]||'';_0x3891ce[_0x38f864(0x471)](_0xb4212['SmartJumpNonLandTerrainTags'])&&(this[_0x38f864(0x298)][_0x38f864(0x38a)]=_0x21a214['$1']['split'](',')['map'](_0x1d9c7e=>(_0x26253f(_0x1d9c7e)||0x0)[_0x38f864(0x301)](0x0,0x7))),_0x3891ce[_0x38f864(0x471)](_0xb4212[_0x38f864(0x427)])&&(this['_smartJump']['NonPassableTerrainTags']=_0x50fabc['$1'][_0x38f864(0x214)](',')[_0x38f864(0x37a)](_0x586aaf=>(_0x539575(_0x586aaf)||0x0)['clamp'](0x0,0x7)));}}return!![];},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x33c)]=function(_0x105e47,_0x33c8bb){const _0x3ea8bb=_0x5f4be9,_0x1c6fce=this[_0x3ea8bb(0x410)](),_0x5f2754=this[_0x3ea8bb(0x39a)](),_0x333825=this[_0x3ea8bb(0x43f)](),_0x243782=this[_0x3ea8bb(0x452)](),_0x4092ac=this[_0x3ea8bb(0x34a)]()||this[_0x3ea8bb(0x2f5)](),_0x22c4a4=$gameSystem[_0x3ea8bb(0x257)](![],_0x4092ac),_0x39c017=$gameSystem[_0x3ea8bb(0x257)](!![],_0x4092ac),_0x530feb=VisuMZ[_0x3ea8bb(0x3fc)][_0x3ea8bb(0x3de)]();if(_0x333825<_0x1c6fce){if(_0x3ea8bb(0x287)!==_0x3ea8bb(0x287))this[_0x3ea8bb(0x337)]&&this['_smartRushCooldown']--;else{const _0x35a9ef=_0x1c6fce-_0x333825,_0x457686=_0x22c4a4*_0x530feb,_0x437b63=_0x35a9ef/(_0x457686||0.01);$gameMap['scrollLeft'](_0x437b63);}}if(_0x333825>_0x1c6fce){if(_0x3ea8bb(0x454)!==_0x3ea8bb(0x454))this[_0x3ea8bb(0x1d8)](),this[_0x3ea8bb(0x400)](),this[_0x3ea8bb(0x29d)]();else{const _0x135b39=_0x333825-_0x1c6fce,_0x4bccad=_0x22c4a4*_0x530feb,_0x41328c=_0x135b39/(_0x4bccad||0.01);$gameMap[_0x3ea8bb(0x388)](_0x41328c);}}if(_0x243782>_0x5f2754){if('dhQeg'!=='eiFvA'){const _0x3d4909=_0x243782-_0x5f2754,_0x52e1b8=_0x39c017*_0x530feb,_0x160c2d=_0x3d4909/(_0x52e1b8||0.01);$gameMap['scrollDown'](_0x160c2d);}else{const _0x38dcfd=_0x29e537['MovementEffectsOptions'][_0x3ea8bb(0x376)],_0x2110df=_0x3ea8bb(0x34c);this[_0x3ea8bb(0x46f)](_0x38dcfd,_0x2110df);}}if(_0x243782<_0x5f2754){const _0x143716=_0x5f2754-_0x243782,_0x1da15c=_0x39c017*_0x530feb,_0x4fe6b9=_0x143716/(_0x1da15c||0.01);$gameMap[_0x3ea8bb(0x2db)](_0x4fe6b9);}},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x3de)]=function(){return 1.0017453;},VisuMZ['MovementEffects']['Game_CharacterBase_updateAnimationCount']=Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x232)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x232)]=function(){const _0x1d36eb=_0x5f4be9;VisuMZ[_0x1d36eb(0x3fc)]['Game_CharacterBase_updateAnimationCount']['call'](this),this['_footstepCooldownDuration']&&this['_footstepCooldownDuration']--;},Game_Player['prototype'][_0x5f4be9(0x37f)]=function(){const _0x6449c7=_0x5f4be9;Game_Character['prototype'][_0x6449c7(0x37f)][_0x6449c7(0x2ce)](this),this[_0x6449c7(0x2b1)]=0x3c;},Game_Player['prototype'][_0x5f4be9(0x413)]=function(){const _0x33f822=_0x5f4be9;return $gameParty[_0x33f822(0x355)]()?$gameParty[_0x33f822(0x355)]()[_0x33f822(0x413)]():Game_Character[_0x33f822(0x1c6)]['footstepsData'][_0x33f822(0x2ce)](this);},Game_Player['prototype'][_0x5f4be9(0x426)]=function(){const _0x5920d4=_0x5f4be9;return $gameParty[_0x5920d4(0x355)]()?$gameParty['leader']()['footprintsData']():Game_Character[_0x5920d4(0x1c6)][_0x5920d4(0x426)][_0x5920d4(0x2ce)](this);},Game_Player['prototype'][_0x5f4be9(0x242)]=function(){const _0x545c72=_0x5f4be9;return this['isSmartRushing']()||this[_0x545c72(0x468)]();},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x422)]=function(){const _0x196dda=_0x5f4be9;if(this['isJumping']())return!![];if(this[_0x196dda(0x345)]())return!![];if(this['isOnLadder']())return!![];return![];},Game_Player[_0x5f4be9(0x1c6)]['straightenFacedDirection']=function(_0x265f20){const _0x5dc2be=_0x5f4be9;if(!_0x265f20)return;if(_0x265f20[_0x5dc2be(0x2ac)])return;const _0x2c158c=this[_0x5dc2be(0x272)](_0x265f20);this[_0x5dc2be(0x464)](_0x2c158c);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x272)]=function(_0x107bc5){const _0x76d489=_0x5f4be9;if(!_0x107bc5)return this['direction']();if(_0x107bc5[_0x76d489(0x2ac)])return this[_0x76d489(0x3a4)]();const _0x37088d=this[_0x76d489(0x415)](this[_0x76d489(0x3a4)](),_0x107bc5);return _0x37088d;},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x415)]=function(_0x506179,_0x59889d){const _0x2e794e=_0x5f4be9;if(!_0x59889d)return _0x506179;if(_0x59889d[_0x2e794e(0x2ac)])return _0x506179;if(_0x506179===0x1)return 0x4;if(_0x506179===0x3)return 0x6;if(_0x506179===0x7)return 0x4;if(_0x506179===0x9)return 0x6;return _0x506179;},Game_Player[_0x5f4be9(0x409)]=VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x31e)][_0x5f4be9(0x310)]||0x0,Game_Player[_0x5f4be9(0x1d3)]=VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x31e)][_0x5f4be9(0x2ed)]||0x1,Game_Player[_0x5f4be9(0x1de)]=VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x31e)][_0x5f4be9(0x1e9)]||![],Game_Player[_0x5f4be9(0x2f8)]=VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)]['SmartRush'][_0x5f4be9(0x44b)]||0x1,Game_Player[_0x5f4be9(0x3a0)]=VisuMZ['MovementEffects'][_0x5f4be9(0x381)][_0x5f4be9(0x31e)]['ShakeSpeedRate']||0x1,Game_Player[_0x5f4be9(0x2cd)]=VisuMZ['MovementEffects'][_0x5f4be9(0x381)][_0x5f4be9(0x31e)][_0x5f4be9(0x455)]||0x1,Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x274)]=function(_0x38c454,_0x2b3585,_0x5dd212,_0x2688ea,_0x2004cd){const _0x48d6d3=_0x5f4be9;if(!this[_0x48d6d3(0x417)]())return![];const _0x2efcd3=VisuMZ['MovementEffects'][_0x48d6d3(0x381)][_0x48d6d3(0x31e)];return this[_0x48d6d3(0x34d)](_0x2efcd3),this[_0x48d6d3(0x286)]=_0x38c454,this[_0x48d6d3(0x337)]=_0x2b3585||0x1,this[_0x48d6d3(0x32f)]=(_0x5dd212||[])[_0x48d6d3(0x22f)](),this[_0x48d6d3(0x2c9)]=_0x2688ea||1.5,this[_0x48d6d3(0x3cc)]=JsonEx[_0x48d6d3(0x2f6)](_0x2004cd),this[_0x48d6d3(0x1be)](!![]),!![];},Game_Player['prototype']['canSmartRush']=function(){const _0x59499f=_0x5f4be9;if(!$gameMap[_0x59499f(0x357)]())return![];if(this[_0x59499f(0x337)])return![];if(this[_0x59499f(0x242)]())return![];if(this['isSmartMoveNonViableState']())return![];if(this[_0x59499f(0x343)]())return![];const _0x13c192=VisuMZ[_0x59499f(0x3fc)][_0x59499f(0x381)]['SmartRush'],_0x3671b3=this[_0x59499f(0x272)](_0x13c192);return this['canPass'](this['x'],this['y'],_0x3671b3);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x30c)]=function(){const _0x34c3a1=_0x5f4be9;return this['_smartRushMode']!==undefined&&this[_0x34c3a1(0x286)]>0x0;},VisuMZ['MovementEffects'][_0x5f4be9(0x3e9)]=Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x34a)],Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x34a)]=function(){const _0x42e8cc=_0x5f4be9;if(this[_0x42e8cc(0x30c)]())return!![];return VisuMZ[_0x42e8cc(0x3fc)][_0x42e8cc(0x3e9)]['call'](this);},VisuMZ['MovementEffects'][_0x5f4be9(0x19c)]=Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x3ad)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x3ad)]=function(){const _0x4bcc51=_0x5f4be9;let _0x26a4c3=VisuMZ[_0x4bcc51(0x3fc)][_0x4bcc51(0x19c)][_0x4bcc51(0x2ce)](this);return _0x26a4c3+=$gameSystem[_0x4bcc51(0x312)](this[_0x4bcc51(0x352)])*0x1,this===$gamePlayer&&this['isSmartRushing']()&&(_0x26a4c3*=this[_0x4bcc51(0x2c9)]||1.5),Math[_0x4bcc51(0x3bd)](0x1,_0x26a4c3);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x30e)]=function(){const _0x115924=_0x5f4be9;if(this[_0x115924(0x302)]())return;if(this[_0x115924(0x3b7)]())return;this[_0x115924(0x299)](this[_0x115924(0x3a4)]()),this[_0x115924(0x346)]()?_0x115924(0x3c4)===_0x115924(0x3c4)?(this[_0x115924(0x286)]=this[_0x115924(0x286)]||0x1,this[_0x115924(0x286)]--):_0x3242e5[_0x115924(0x1e1)]([_0x5449eb],_0x1805d3):(this[_0x115924(0x35c)]()&&($gameScreen[_0x115924(0x45d)](this['_smartRushMode']),this['startSmartRushCrashWalkBack']()),this[_0x115924(0x286)]=0x0),this[_0x115924(0x1c2)]()&&(this[_0x115924(0x286)]=0x0),this[_0x115924(0x286)]<=0x0&&(_0x115924(0x267)!=='zCjvb'?_0x27e330=_0x19b7eb[_0x115924(0x27c)](_0x16aa4b[_0x115924(0x36d)]()[_0x115924(0x43c)]()):setTimeout(this[_0x115924(0x1be)]['bind'](this,![]),0x32));},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x334)]=function(){const _0x58e866=_0x5f4be9;this[_0x58e866(0x286)]=0x0,setTimeout(this['setSmartRushSwitch'][_0x58e866(0x225)](this,![]),0x32);},Game_Screen[_0x5f4be9(0x1c6)][_0x5f4be9(0x45d)]=function(_0x165a5e){const _0x17a3d5=_0x5f4be9,_0x3b8b76=(_0x165a5e*Game_Player['SMART_RUSH_SHAKE_POWER_RATE'])['clamp'](0x1,0x9),_0x420973=(_0x165a5e*Game_Player[_0x17a3d5(0x3a0)])[_0x17a3d5(0x301)](0x1,0x9);this[_0x17a3d5(0x328)](_0x3b8b76,_0x420973,Game_Player['SMART_RUSH_SHAKE_DURATION']);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x46a)]=function(){const _0x4c561d=_0x5f4be9,_0x35da67=this[_0x4c561d(0x3a4)](),_0x2d0669=((this[_0x4c561d(0x2c9)]-0x1)*0x2)[_0x4c561d(0x301)](0.25,0.85),_0x1d377f=((this[_0x4c561d(0x2c9)]-0x1)*1.5)['clamp'](0.15,0.3);if([0x1,0x4,0x7][_0x4c561d(0x336)](_0x35da67))this[_0x4c561d(0x3f1)]-=_0x2d0669;if([0x3,0x6,0x9][_0x4c561d(0x336)](_0x35da67))this['_realX']+=_0x2d0669;if([0x7,0x8,0x9]['includes'](_0x35da67))this[_0x4c561d(0x2a6)]-=_0x2d0669;if([0x1,0x2,0x3]['includes'](_0x35da67))this[_0x4c561d(0x2a6)]+=_0x1d377f;},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x35c)]=function(){const _0xea16bd=_0x5f4be9;if(!Game_Player[_0xea16bd(0x1de)])return![];const _0x55af4c=this[_0xea16bd(0x3a4)](),_0xcf2816=this['x'],_0x131ac5=this['y'];return $gameMap[_0xea16bd(0x2c5)](_0xcf2816,_0x131ac5,_0x55af4c);},Game_Player['prototype'][_0x5f4be9(0x411)]=function(){const _0x31ea98=_0x5f4be9;this[_0x31ea98(0x337)]&&this[_0x31ea98(0x337)]--;},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x1be)]=function(_0x2976b6){const _0x402437=_0x5f4be9;this[_0x402437(0x32f)]=this[_0x402437(0x32f)]||[];for(const _0x53f021 of this[_0x402437(0x32f)]){$gameSwitches[_0x402437(0x3a9)](_0x53f021,_0x2976b6);}if(!_0x2976b6){if('eFIXd'==='eFIXd')this[_0x402437(0x286)]=0x0;else for(const _0x1136d7 of _0x508660){_0x1136d7[_0x402437(0x471)](_0x153521[_0x402437(0x1bc)]);const _0x1ff08a=_0x3c4623(_0x27b3a9['$1'])[_0x402437(0x301)](0x0,0xff);this[_0x402437(0x354)][_0x1ff08a]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}},VisuMZ['MovementEffects'][_0x5f4be9(0x2ad)]=Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x38e)],Game_Player['prototype'][_0x5f4be9(0x38e)]=function(_0x129b52,_0x26190b,_0x5f1073,_0x930b43,_0x24de39){const _0x1a4213=_0x5f4be9;VisuMZ[_0x1a4213(0x3fc)][_0x1a4213(0x2ad)][_0x1a4213(0x2ce)](this,_0x129b52,_0x26190b,_0x5f1073,_0x930b43,_0x24de39),this['endSmartRush']();},Game_Player[_0x5f4be9(0x32c)]=VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x381)][_0x5f4be9(0x44c)][_0x5f4be9(0x2ed)],Game_Player[_0x5f4be9(0x3b4)]=VisuMZ['MovementEffects'][_0x5f4be9(0x381)][_0x5f4be9(0x44c)][_0x5f4be9(0x310)],Game_Player['prototype'][_0x5f4be9(0x2bf)]=function(_0x535e91,_0x4908ce,_0xc8c5fb,_0xf2bc29){const _0x46f6e1=_0x5f4be9;_0xc8c5fb=_0xc8c5fb||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x46f6e1(0x389)]=JsonEx[_0x46f6e1(0x2f6)](_0xc8c5fb),_0x535e91=this[_0x46f6e1(0x291)](_0x535e91||0x1);if(!this[_0x46f6e1(0x1cb)](_0x535e91))return![];const _0x48c282=VisuMZ[_0x46f6e1(0x3fc)][_0x46f6e1(0x381)][_0x46f6e1(0x44c)];return this[_0x46f6e1(0x34d)](_0x48c282),this[_0x46f6e1(0x391)]=_0x535e91||0x1,this[_0x46f6e1(0x20c)]=_0x4908ce||0x1,this[_0x46f6e1(0x3fa)]=JsonEx[_0x46f6e1(0x2f6)](_0xf2bc29),this[_0x46f6e1(0x3a3)](_0x535e91),!![];},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x291)]=function(_0xe6f510){const _0x48efe7=_0x5f4be9,_0x2f9c84=this[_0x48efe7(0x389)],_0x3f999a=this[_0x48efe7(0x3a4)](),_0x1bac3b=VisuMZ[_0x48efe7(0x3fc)][_0x48efe7(0x381)][_0x48efe7(0x44c)];this['straightenFacedDirection'](_0x1bac3b);const _0x3164d7=this[_0x48efe7(0x3a4)]();let _0x302791=0x0,_0x4ee6b0=this['x'],_0x255538=this['y'],_0x1fddd5=0x0,_0x3722c9=0x0;if([0x1,0x4,0x7]['includes'](_0x3164d7))_0x1fddd5=-0x1;if([0x3,0x6,0x9]['includes'](_0x3164d7))_0x1fddd5=0x1;if([0x7,0x8,0x9][_0x48efe7(0x336)](_0x3164d7))_0x3722c9=-0x1;if([0x1,0x2,0x3][_0x48efe7(0x336)](_0x3164d7))_0x3722c9=0x1;for(let _0x6db06=0x1;_0x6db06<=_0xe6f510;_0x6db06++){_0x4ee6b0+=_0x1fddd5,_0x255538+=_0x3722c9;const _0x20a5f1=$gameMap['regionId'](_0x4ee6b0,_0x255538),_0x403034=$gameMap[_0x48efe7(0x467)](_0x4ee6b0,_0x255538);if(_0x2f9c84[_0x48efe7(0x1b2)][_0x48efe7(0x336)](_0x20a5f1))break;if(_0x2f9c84[_0x48efe7(0x2b2)][_0x48efe7(0x336)](_0x403034))break;if($gameMap[_0x48efe7(0x361)](_0x4ee6b0,_0x255538))break;if(_0x2f9c84[_0x48efe7(0x26f)][_0x48efe7(0x336)](_0x20a5f1))continue;if(_0x2f9c84[_0x48efe7(0x38a)][_0x48efe7(0x336)](_0x403034))continue;if($gameMap[_0x48efe7(0x3e3)](_0x4ee6b0,_0x255538))continue;if(!$gameMap[_0x48efe7(0x223)](_0x4ee6b0,_0x255538))continue;if(this[_0x48efe7(0x3a1)](_0x4ee6b0,_0x255538))continue;if(!$gameMap[_0x48efe7(0x21f)](_0x4ee6b0,_0x255538))continue;_0x302791=_0x6db06;}return this[_0x48efe7(0x464)](_0x3f999a),_0x302791;},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x1cb)]=function(_0x942ea9){const _0x149198=_0x5f4be9;if(!$gameMap[_0x149198(0x360)]())return![];if(this[_0x149198(0x20c)])return![];if(this[_0x149198(0x242)]())return![];if(this[_0x149198(0x422)]())return![];if(this[_0x149198(0x343)]())return![];return _0x942ea9>=0x1;},Game_Player['prototype'][_0x5f4be9(0x3a3)]=function(){const _0x43f782=_0x5f4be9,_0x5bf159=this[_0x43f782(0x391)],_0x3741cb=this[_0x43f782(0x3a4)]();let _0x313d94=this['x'],_0x33986c=this['y'];if([0x1,0x4,0x7][_0x43f782(0x336)](_0x3741cb))_0x313d94+=-_0x5bf159;if([0x3,0x6,0x9]['includes'](_0x3741cb))_0x313d94+=_0x5bf159;if([0x7,0x8,0x9][_0x43f782(0x336)](_0x3741cb))_0x33986c+=-_0x5bf159;if([0x1,0x2,0x3][_0x43f782(0x336)](_0x3741cb))_0x33986c+=_0x5bf159;this[_0x43f782(0x32a)]()[_0x43f782(0x40d)]&&this['createSmartBlinkMotionTrailSprite']();Game_Character[_0x43f782(0x1c6)][_0x43f782(0x1ee)][_0x43f782(0x2ce)](this,_0x313d94,_0x33986c),this[_0x43f782(0x42b)]['synchronize'](_0x313d94,_0x33986c,this['direction']());if(!$gameMap['isUsingSmoothCamera']())this[_0x43f782(0x383)](_0x313d94,_0x33986c);this['playSmartBlinkFilterEffect'](),setTimeout(this[_0x43f782(0x34e)][_0x43f782(0x225)](this,[0x1,0x2]),0x32);},Game_Player[_0x5f4be9(0x1c6)]['playSmartBlinkFilterEffect']=function(){const _0x438e2a=_0x5f4be9,_0x1b7c84=SceneManager[_0x438e2a(0x419)]['_spriteset'];if(_0x1b7c84){const _0x2922a5=this[_0x438e2a(0x36d)]()['visibleFollowers'](),_0x1d275a=[this]['concat'](_0x2922a5);for(const _0xc13b92 of _0x1d275a){if('eedLu'!=='eedLu'){this[_0x438e2a(0x456)]=this[_0x438e2a(0x456)]||[];const _0x2f9479=_0x5d73da[_0x438e2a(0x47b)]();this[_0x438e2a(0x46e)]=_0x11f421[_0x438e2a(0x21b)](_0xc482e9[_0x438e2a(0x40a)](_0x2f9479)),this[_0x438e2a(0x2ae)]();}else{const _0x1b8b7e=_0x1b7c84[_0x438e2a(0x1a6)](_0xc13b92);if(_0x1b8b7e){const _0x1bc6de=Game_Player[_0x438e2a(0x32c)],_0x1c8611=Game_Player[_0x438e2a(0x3b4)];_0x1b8b7e[_0x438e2a(0x2c6)](_0x1bc6de,_0x1c8611);}}}}},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x358)]=function(){const _0x3aca8d=_0x5f4be9;this['_smartBlinkCooldown']&&this[_0x3aca8d(0x20c)]--;},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x438)]=function(_0x4d56ad,_0x2dd79a,_0x305c6b,_0x3143ce){const _0x4f0522=_0x5f4be9;_0x305c6b=_0x305c6b||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x4f0522(0x459)]=JsonEx[_0x4f0522(0x2f6)](_0x305c6b);if(!this[_0x4f0522(0x38f)]())return![];const _0x231f6b=VisuMZ[_0x4f0522(0x3fc)][_0x4f0522(0x381)]['SmartJump'];return this[_0x4f0522(0x34d)](_0x231f6b),_0x4d56ad=this['measureSmartJumpDistance'](_0x4d56ad),this[_0x4f0522(0x295)]=!![],this['_smartJumpCooldown']=_0x2dd79a||0x1,this[_0x4f0522(0x1f3)]=JsonEx[_0x4f0522(0x2f6)](_0x3143ce),this[_0x4f0522(0x47f)](_0x4d56ad),!![];},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x38f)]=function(){const _0x29e470=_0x5f4be9;if(!$gameMap[_0x29e470(0x1bf)]())return![];if(this[_0x29e470(0x3fd)])return![];if(this[_0x29e470(0x242)]())return![];if(this[_0x29e470(0x422)]())return![];if(this['isTransparent']())return![];return!![];},Game_Player['prototype'][_0x5f4be9(0x468)]=function(){const _0x2b9a1d=_0x5f4be9;return this[_0x2b9a1d(0x295)];},Game_Player['prototype'][_0x5f4be9(0x231)]=function(_0x49e17a){const _0x429b2b=_0x5f4be9,_0x2cb000=this[_0x429b2b(0x459)],_0x31466d=this[_0x429b2b(0x3a4)]();let _0x38f899=0x0,_0x591454=this['x'],_0x373351=this['y'],_0x36d953=0x0,_0x543d55=0x0;if([0x1,0x4,0x7][_0x429b2b(0x336)](_0x31466d))_0x36d953=-0x1;if([0x3,0x6,0x9][_0x429b2b(0x336)](_0x31466d))_0x36d953=0x1;if([0x7,0x8,0x9]['includes'](_0x31466d))_0x543d55=-0x1;if([0x1,0x2,0x3][_0x429b2b(0x336)](_0x31466d))_0x543d55=0x1;for(let _0x3b53cd=0x1;_0x3b53cd<=_0x49e17a;_0x3b53cd++){_0x591454+=_0x36d953,_0x373351+=_0x543d55;if($gameMap['isLadder'](_0x591454,_0x373351))break;const _0x1e2c89=$gameMap['regionId'](_0x591454,_0x373351),_0x29ef8b=$gameMap['terrainTag'](_0x591454,_0x373351);if(_0x2cb000[_0x429b2b(0x1b2)][_0x429b2b(0x336)](_0x1e2c89))break;if(_0x2cb000[_0x429b2b(0x2b2)][_0x429b2b(0x336)](_0x29ef8b))break;if($gameMap['isTileSmartJumpNonPassable'](_0x591454,_0x373351))break;if(_0x2cb000[_0x429b2b(0x26f)][_0x429b2b(0x336)](_0x1e2c89))continue;if(_0x2cb000[_0x429b2b(0x38a)][_0x429b2b(0x336)](_0x29ef8b))continue;if($gameMap[_0x429b2b(0x19e)](_0x591454,_0x373351))continue;if(!$gameMap[_0x429b2b(0x223)](_0x591454,_0x373351))continue;if(this[_0x429b2b(0x3a1)](_0x591454,_0x373351))continue;if(!$gameMap[_0x429b2b(0x21f)](_0x591454,_0x373351))continue;if(!$gameMap['meetsSmartJumpHeightConditions'](_0x591454,_0x373351,_0x38f899))continue;_0x38f899=_0x3b53cd;}return _0x38f899;},Game_Player[_0x5f4be9(0x1c6)]['startSmartJump']=function(_0x32cf54){const _0x1fc99e=_0x5f4be9,_0xb394eb=this[_0x1fc99e(0x3a4)]();let _0x4905bd=0x0,_0x36529e=0x0;if([0x1,0x4,0x7][_0x1fc99e(0x336)](_0xb394eb))_0x4905bd+=-_0x32cf54;if([0x3,0x6,0x9][_0x1fc99e(0x336)](_0xb394eb))_0x4905bd+=_0x32cf54;if([0x7,0x8,0x9][_0x1fc99e(0x336)](_0xb394eb))_0x36529e+=-_0x32cf54;if([0x1,0x2,0x3][_0x1fc99e(0x336)](_0xb394eb))_0x36529e+=_0x32cf54;_0x36529e=this['processSmartJumpHeightFactor'](_0x4905bd,_0x36529e);const _0x3707f1=this[_0x1fc99e(0x3a4)]();this[_0x1fc99e(0x3c8)](_0x4905bd,_0x36529e),this[_0x1fc99e(0x464)](_0x3707f1);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x290)]=function(_0x31157b,_0x371afa){const _0x1445e2=_0x5f4be9;if(!$gameMap[_0x1445e2(0x313)](this['x'],this['y']))return _0x371afa;if($gameMap[_0x1445e2(0x406)](this['x'],this['y']))return _0x371afa;let _0x4e4e3c=this['x']+_0x31157b,_0x2edf2a=this['y']+_0x371afa;if(!$gameMap[_0x1445e2(0x313)](_0x4e4e3c,_0x2edf2a))return _0x371afa;const _0x2d0173=this[_0x1445e2(0x2c4)]();if($gameMap[_0x1445e2(0x406)](_0x2d0173))return _0x371afa;let _0x41d974=$gameMap[_0x1445e2(0x2c4)](_0x4e4e3c,_0x2edf2a);if(!$gameMap['isSmartJumpRegionLowestHeight'](_0x41d974))return _0x371afa;const _0x2da1c5=this[_0x1445e2(0x3a4)]();if(_0x2da1c5===0x2)return _0x371afa;if(_0x2da1c5===0x8)return _0x371afa;_0x371afa+=_0x2d0173-_0x41d974;for(;;){const _0x8cdbf2=_0x4e4e3c,_0x5766c8=this['y']+_0x371afa,_0x32f05b=$gameMap[_0x1445e2(0x2c4)](_0x8cdbf2,_0x5766c8);if($gameMap[_0x1445e2(0x313)](_0x8cdbf2,_0x5766c8)&&!$gameMap[_0x1445e2(0x406)](_0x32f05b)){if(_0x1445e2(0x273)===_0x1445e2(0x359))return this[_0x1445e2(0x1f2)]=!![],this[_0x1445e2(0x3d9)]=this[_0x1445e2(0x3f1)],this[_0x1445e2(0x2fb)]=this['_realY'],![];else{_0x371afa--;continue;}}if($gameMap[_0x1445e2(0x21f)](_0x8cdbf2,_0x5766c8)){if(_0x1445e2(0x2fa)===_0x1445e2(0x2fa))break;else{if(!_0x4641a6['footsteps'])return![];if(_0x140e84){const _0x2b1547=_0x2f97b6['MovementEffects'][_0x1445e2(0x203)],_0x1a6ccf=_0x55ace3[_0x1445e2(0x3ef)]||'';if(_0x1a6ccf[_0x1445e2(0x471)](_0x2b1547[_0x1445e2(0x3cf)]))return!![];else{if(_0x1a6ccf[_0x1445e2(0x471)](_0x2b1547['NoFootsteps']))return![];}}return _0x395ae7[_0x1445e2(0x3c5)]();}}_0x371afa--;if(_0x371afa<=0x0)break;}return _0x371afa;},Game_Player['prototype'][_0x5f4be9(0x22b)]=function(){const _0x1b2f7f=_0x5f4be9;if(this[_0x1b2f7f(0x3b7)]())return;this[_0x1b2f7f(0x295)]=![];if(this[_0x1b2f7f(0x3c1)]()){let _0x492a28=Math[_0x1b2f7f(0x3bd)](Math[_0x1b2f7f(0x480)](this[_0x1b2f7f(0x1fe)]/0x2),0x1);while(_0x492a28--)this[_0x1b2f7f(0x1c5)]();}if(this['canMakeFootstepSounds']())this[_0x1b2f7f(0x37f)]();setTimeout(this['checkEventTriggerHere']['bind'](this,[0x1,0x2]),0x32);},Game_Player['prototype']['updateSmartJumpCooldown']=function(){const _0x33a085=_0x5f4be9;this[_0x33a085(0x3fd)]&&this[_0x33a085(0x3fd)]--;},Game_Player['prototype'][_0x5f4be9(0x32a)]=function(){const _0x537b56=_0x5f4be9;return this[_0x537b56(0x3fa)]||{'enabled':![]};},Game_Player['prototype']['smartJumpMotionTrailData']=function(){const _0x54bd47=_0x5f4be9;return this[_0x54bd47(0x1f3)]||{'enabled':![]};},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x2e1)]=function(){const _0x3ffcbc=_0x5f4be9;return this[_0x3ffcbc(0x3cc)]||{'enabled':![]};},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x43d)]=function(){const _0x29a398=_0x5f4be9;if(this[_0x29a398(0x30c)]()&&this[_0x29a398(0x2e1)]()[_0x29a398(0x40d)])return this[_0x29a398(0x2e1)]();else{if(this[_0x29a398(0x468)]()&&this[_0x29a398(0x245)]()[_0x29a398(0x40d)]){if('tqMjr'===_0x29a398(0x25d))for(const _0x3b02a8 of _0x44d665){_0x3b02a8[_0x29a398(0x471)](_0x1f8d75[_0x2a9fb5]);const _0x5d0962=_0xf8bfb['$1'],_0x52b346=_0x24b695['$2'],_0x10d679=_0x1ebff6['$3'],_0x4eb27b=_0x29a398(0x308)[_0x29a398(0x3b1)](_0x530004[_0x29a398(0x387)](_0x5d0962)),_0x15a908=_0x29a398(0x1e8)[_0x29a398(0x3b1)](_0x297c4d(_0x52b346)||0x0);this[_0x29a398(0x1bd)][_0x4eb27b][_0x15a908][_0x29a398(0x1e3)]=_0x2f5518(_0x10d679)[_0x29a398(0x1c9)]();}else return this[_0x29a398(0x245)]();}}return Game_Character['prototype']['motionTrailData'][_0x29a398(0x2ce)](this);},Game_Player[_0x5f4be9(0x1c6)][_0x5f4be9(0x26b)]=function(){const _0x4c94ad=_0x5f4be9,_0x41b52d=SceneManager['_scene'][_0x4c94ad(0x370)];if(!_0x41b52d)return;const _0x1c0772=[this][_0x4c94ad(0x27c)](this[_0x4c94ad(0x36d)]()[_0x4c94ad(0x43c)]());for(const _0xc38460 of _0x1c0772){if(_0x4c94ad(0x305)!==_0x4c94ad(0x305))this[_0x4c94ad(0x448)][_0x4c94ad(0x322)][_0x4c94ad(0x2cb)]=_0x30836f['$1']['split'](',')[_0x4c94ad(0x37a)](_0x4c972e=>(_0x4c1caf(_0x4c972e)||0x0)[_0x4c94ad(0x301)](0x0,0x7));else{if(!_0xc38460)continue;oldData=JSON[_0x4c94ad(0x21b)](JSON[_0x4c94ad(0x40a)](_0xc38460['_motionTrailSettings']||{'enabled':![]})),_0xc38460[_0x4c94ad(0x1eb)](this['smartBlinkMotionTrailData']());const _0x3260ec=_0x41b52d[_0x4c94ad(0x1a6)](_0xc38460);_0x3260ec&&_0x3260ec[_0x4c94ad(0x20b)](),_0xc38460[_0x4c94ad(0x1eb)](oldData);}}},VisuMZ[_0x5f4be9(0x3fc)]['Game_Follower_initialize']=Game_Follower[_0x5f4be9(0x1c6)]['initialize'],Game_Follower['prototype'][_0x5f4be9(0x446)]=function(_0x2e50b5){const _0xc1dacd=_0x5f4be9;VisuMZ[_0xc1dacd(0x3fc)][_0xc1dacd(0x2a9)][_0xc1dacd(0x2ce)](this,_0x2e50b5),this[_0xc1dacd(0x3d4)]();},VisuMZ['MovementEffects'][_0x5f4be9(0x20f)]=Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x1c4)],Game_CharacterBase[_0x5f4be9(0x1c6)][_0x5f4be9(0x1c4)]=function(){const _0x33b591=_0x5f4be9;VisuMZ[_0x33b591(0x3fc)][_0x33b591(0x20f)][_0x33b591(0x2ce)](this),this[_0x33b591(0x3d4)]();},Game_CharacterBase['prototype'][_0x5f4be9(0x3d4)]=function(){},Game_Follower[_0x5f4be9(0x1c6)]['randomizeAnimationCount']=function(){const _0x23cc49=_0x5f4be9;this[_0x23cc49(0x20a)]=Math[_0x23cc49(0x445)](0xd);},Game_Follower[_0x5f4be9(0x1c6)][_0x5f4be9(0x37f)]=function(){const _0x2f2e47=_0x5f4be9;if($gamePlayer[_0x2f2e47(0x2b1)])return;Game_Character['prototype']['playFootstepSound'][_0x2f2e47(0x2ce)](this);},Game_Follower[_0x5f4be9(0x1c6)][_0x5f4be9(0x413)]=function(){const _0x50587a=_0x5f4be9;return this[_0x50587a(0x1b1)]()?this[_0x50587a(0x1b1)]()[_0x50587a(0x413)]():Game_Character['prototype']['footstepsData'][_0x50587a(0x2ce)](this);},Game_Follower[_0x5f4be9(0x1c6)][_0x5f4be9(0x426)]=function(){const _0xbfb2c1=_0x5f4be9;return this['actor']()?this[_0xbfb2c1(0x1b1)]()[_0xbfb2c1(0x426)]():Game_Character[_0xbfb2c1(0x1c6)]['footprintsData']['call'](this);},Game_Follower[_0x5f4be9(0x1c6)]['smartBlinkMotionTrailData']=function(){const _0xfc5614=_0x5f4be9;return $gamePlayer[_0xfc5614(0x32a)]();},Game_Follower[_0x5f4be9(0x1c6)][_0x5f4be9(0x245)]=function(){const _0x25d0fe=_0x5f4be9;return $gamePlayer[_0x25d0fe(0x245)]();},Game_Follower['prototype'][_0x5f4be9(0x2e1)]=function(){return $gamePlayer['smartRushMotionTrailData']();},Game_Follower['prototype'][_0x5f4be9(0x43d)]=function(){const _0x5193d3=_0x5f4be9;if($gamePlayer[_0x5193d3(0x30c)]()&&this[_0x5193d3(0x2e1)]()[_0x5193d3(0x40d)])return this['smartRushMotionTrailData']();else{if($gamePlayer[_0x5193d3(0x468)]()&&this[_0x5193d3(0x245)]()['enabled'])return this[_0x5193d3(0x245)]();}return Game_Character[_0x5193d3(0x1c6)][_0x5193d3(0x43d)][_0x5193d3(0x2ce)](this);},VisuMZ['MovementEffects'][_0x5f4be9(0x396)]=Game_Event[_0x5f4be9(0x1c6)]['clearPageSettings'],Game_Event[_0x5f4be9(0x1c6)]['clearPageSettings']=function(){const _0x3f7857=_0x5f4be9;VisuMZ['MovementEffects'][_0x3f7857(0x396)][_0x3f7857(0x2ce)](this),this[_0x3f7857(0x46b)]();},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x3fe)]=Game_Event['prototype'][_0x5f4be9(0x325)],Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x325)]=function(){const _0x355cc8=_0x5f4be9;VisuMZ[_0x355cc8(0x3fc)][_0x355cc8(0x3fe)][_0x355cc8(0x2ce)](this),this[_0x355cc8(0x1f8)]();},Game_Event[_0x5f4be9(0x1c6)]['setupMovementEffectsVariables']=function(){const _0x55379a=_0x5f4be9;if(!this['event']())return;this['initMovementEffectsVariables'](),this[_0x55379a(0x2bd)](),this[_0x55379a(0x469)]();},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x2bd)]=function(){const _0x2f6dfb=_0x5f4be9,_0x1df51f=this[_0x2f6dfb(0x424)]()[_0x2f6dfb(0x3ef)];if(_0x1df51f==='')return;this['checkMovementEffectsStringTags'](_0x1df51f);},Game_Event['prototype'][_0x5f4be9(0x469)]=function(){const _0x1c34e2=_0x5f4be9;if(!this[_0x1c34e2(0x434)]())return;const _0x2990a7=this[_0x1c34e2(0x1b8)]();let _0x60aa97='';for(const _0x352b82 of _0x2990a7){if('xOMHJ'!==_0x1c34e2(0x2d2)){const _0x463b3b=this[_0x1c34e2(0x424)]()[_0x1c34e2(0x3ef)];if(_0x463b3b==='')return;this['checkMovementEffectsStringTags'](_0x463b3b);}else{if([0x6c,0x198][_0x1c34e2(0x336)](_0x352b82['code'])){if(_0x60aa97!=='')_0x60aa97+='\x0a';_0x60aa97+=_0x352b82[_0x1c34e2(0x47c)][0x0];}}}this[_0x1c34e2(0x3b3)](_0x60aa97);},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x46b)]=function(){const _0x598517=_0x5f4be9;{const _0x12bee3=VisuMZ[_0x598517(0x3fc)][_0x598517(0x381)][_0x598517(0x288)];this['_footsteps']={'enabled':_0x12bee3[_0x598517(0x222)],'volumeRate':_0x12bee3[_0x598517(0x230)],'pitchRate':_0x12bee3['eventPitchModifier'],'soundFrames':_0x12bee3[_0x598517(0x3ac)][_0x598517(0x22f)]()};}{const _0x261c0f=VisuMZ[_0x598517(0x3fc)]['Settings'][_0x598517(0x218)];this[_0x598517(0x1bd)]={'enabled':!![],'dir1':JSON['parse'](JSON['stringify'](_0x261c0f['dir1'])),'dir2':JSON[_0x598517(0x21b)](JSON[_0x598517(0x40a)](_0x261c0f[_0x598517(0x3bf)])),'dir3':JSON[_0x598517(0x21b)](JSON[_0x598517(0x40a)](_0x261c0f[_0x598517(0x41b)])),'dir4':JSON[_0x598517(0x21b)](JSON[_0x598517(0x40a)](_0x261c0f[_0x598517(0x28a)])),'dir6':JSON[_0x598517(0x21b)](JSON[_0x598517(0x40a)](_0x261c0f['dir6'])),'dir7':JSON['parse'](JSON[_0x598517(0x40a)](_0x261c0f[_0x598517(0x36f)])),'dir8':JSON['parse'](JSON[_0x598517(0x40a)](_0x261c0f[_0x598517(0x3e4)])),'dir9':JSON['parse'](JSON['stringify'](_0x261c0f[_0x598517(0x278)]))};}this[_0x598517(0x319)]={'nonLand':![],'nonPass':![]};},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x3b3)]=function(_0x4a4e16){const _0x11cb22=_0x5f4be9,_0x416937=VisuMZ[_0x11cb22(0x3fc)][_0x11cb22(0x203)];if(!_0x4a4e16['match'](_0x416937[_0x11cb22(0x258)]))return;if(_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x11cb22(0x44d)])){if(_0x11cb22(0x2e2)==='MgTEs'){_0x46d12e[_0x11cb22(0x471)](_0x5b7fc8[_0x2606e7]);const _0x232598=_0x3b21cf['$1'],_0x51b8d7=_0x44e131['$2'],_0x505874=_0x2d06d7['$3'],_0x373ec4='dir%1'[_0x11cb22(0x3b1)](_0x9609dc[_0x11cb22(0x387)](_0x232598)),_0x7a5eb0=_0x11cb22(0x1e8)[_0x11cb22(0x3b1)](_0x1ef08a(_0x51b8d7)||0x0);this[_0x11cb22(0x1bd)][_0x373ec4][_0x7a5eb0][_0x11cb22(0x240)]=_0x4ce4bb(_0x505874)||0x1;}else this[_0x11cb22(0x416)][_0x11cb22(0x40d)]=!![];}else _0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x11cb22(0x23d)])&&('kQvgp'!==_0x11cb22(0x250)?(_0x27209b[_0x11cb22(0x45d)](this[_0x11cb22(0x286)]),this[_0x11cb22(0x46a)]()):this['_footsteps'][_0x11cb22(0x40d)]=![]);_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x11cb22(0x2ff)])&&(this[_0x11cb22(0x416)][_0x11cb22(0x3af)]=Number(RegExp['$1'])*0.01);_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x11cb22(0x246)])&&(this[_0x11cb22(0x416)][_0x11cb22(0x2d6)]=Number(RegExp['$1'])*0.01);_0x4a4e16[_0x11cb22(0x471)](_0x416937['FootstepsFrames'])&&(_0x11cb22(0x1a8)!==_0x11cb22(0x397)?this[_0x11cb22(0x416)][_0x11cb22(0x20e)]=String(RegExp['$1'])[_0x11cb22(0x214)](',')[_0x11cb22(0x37a)](_0x2563cd=>Number(_0x2563cd)||0x0):_0x107385['playSe'](_0x5ed4b1));if(_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x11cb22(0x23b)]))_0x11cb22(0x423)!==_0x11cb22(0x340)?this[_0x11cb22(0x1bd)]['enabled']=!![]:(this[_0x11cb22(0x42a)]=_0x1a1fa8[_0x11cb22(0x1d3)],_0xcf4379=_0x3623ce[_0x11cb22(0x409)]);else{if(_0x4a4e16[_0x11cb22(0x471)](_0x416937['NoFootprintsEvent'])){if(_0x11cb22(0x449)!==_0x11cb22(0x449)){const _0x5d4e14=this[_0x11cb22(0x1f1)][_0xb67703];for(const _0x10a2c4 of _0x3b7a5b){_0x20270a[_0x10a2c4]=_0x5d4e14[_0x10a2c4];}}else this[_0x11cb22(0x1bd)][_0x11cb22(0x40d)]=![];}}{const _0x4a1018='FootprintsFilename',_0x5515ce=_0x4a4e16['match'](_0x416937[_0x4a1018]);if(_0x5515ce){if(_0x11cb22(0x24a)!=='BXSAS')return _0x483813[_0x11cb22(0x3fc)][_0x11cb22(0x430)][_0x11cb22(0x2ce)](this);else for(const _0x205e62 of _0x5515ce){_0x205e62['match'](_0x416937[_0x4a1018]);const _0x24dcb3=RegExp['$1'],_0x223061=RegExp['$2'],_0x49f34d=RegExp['$3'],_0x323689=_0x11cb22(0x308)['format'](TextManager[_0x11cb22(0x387)](_0x24dcb3)),_0x16eec3=_0x11cb22(0x1e8)[_0x11cb22(0x3b1)](Number(_0x223061)||0x0);this[_0x11cb22(0x1bd)][_0x323689][_0x16eec3][_0x11cb22(0x1e3)]=String(_0x49f34d)[_0x11cb22(0x1c9)]();}}}{const _0x3d9945=_0x11cb22(0x303),_0xc7cc8e=_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x3d9945]);if(_0xc7cc8e){if(_0x11cb22(0x2c7)!==_0x11cb22(0x2c7)){_0x409474['match'](_0xe5724d[_0x11cb22(0x24b)]);const _0xdcbf07=_0x5349f6(_0x4a4092['$1'])[_0x11cb22(0x301)](0x0,0xff),_0x3425f6=_0x28749c(_0x160610['$2'])[_0x11cb22(0x301)](0x0,0xff);this[_0x11cb22(0x448)][_0x11cb22(0x2d4)][_0x11cb22(0x2ba)][_0xdcbf07]=_0x3425f6;}else for(const _0x247bba of _0xc7cc8e){_0x247bba['match'](_0x416937[_0x3d9945]);const _0x1c04f4=RegExp['$1'],_0x40c8c9=RegExp['$2'],_0x3abe91=RegExp['$3'],_0x3c36d5='dir%1'[_0x11cb22(0x3b1)](TextManager['parseDirectionText'](_0x1c04f4)),_0x10e92d=_0x11cb22(0x1e8)[_0x11cb22(0x3b1)](Number(_0x40c8c9)||0x0);this[_0x11cb22(0x1bd)][_0x3c36d5][_0x10e92d][_0x11cb22(0x240)]=Number(_0x3abe91)||0x1;}}}{if(_0x11cb22(0x3c3)==='Gmpac'){const _0x35ea62='FootprintsHeight',_0x227765=_0x4a4e16[_0x11cb22(0x471)](_0x416937[_0x35ea62]);if(_0x227765){if(_0x11cb22(0x33f)===_0x11cb22(0x320)){if(this[_0x11cb22(0x40f)]===_0x7a43c0)this['initMovementEffectsFootstepSounds']();this[_0x11cb22(0x40f)]=_0x58fb78;}else for(const _0x417332 of _0x227765){_0x417332[_0x11cb22(0x471)](_0x416937[_0x35ea62]);const _0xb1f4b9=RegExp['$1'],_0x72dc9a=RegExp['$2'],_0x147a7c=RegExp['$3'],_0x3957e8='dir%1'[_0x11cb22(0x3b1)](TextManager[_0x11cb22(0x387)](_0xb1f4b9)),_0x5a4e2b='pattern%1'[_0x11cb22(0x3b1)](Number(_0x72dc9a)||0x0);this[_0x11cb22(0x1bd)][_0x3957e8][_0x5a4e2b]['height']=Number(_0x147a7c)||0x1;}}}else{const _0x3d933a=this[_0x11cb22(0x3a4)]();let _0x2b6402=0x0,_0x535e1d=0x0;if([0x1,0x4,0x7][_0x11cb22(0x336)](_0x3d933a))_0x2b6402+=-_0x1fe19e;if([0x3,0x6,0x9][_0x11cb22(0x336)](_0x3d933a))_0x2b6402+=_0x14276a;if([0x7,0x8,0x9]['includes'](_0x3d933a))_0x535e1d+=-_0x5e1e3c;if([0x1,0x2,0x3][_0x11cb22(0x336)](_0x3d933a))_0x535e1d+=_0x303bfb;_0x535e1d=this[_0x11cb22(0x290)](_0x2b6402,_0x535e1d);const _0x376626=this[_0x11cb22(0x3a4)]();this[_0x11cb22(0x3c8)](_0x2b6402,_0x535e1d),this[_0x11cb22(0x464)](_0x376626);}}{const _0x10f042=_0x11cb22(0x3d3),_0x180820=_0x4a4e16['match'](_0x416937[_0x10f042]);if(_0x180820){if(_0x11cb22(0x3ae)!==_0x11cb22(0x3e8))for(const _0x390d9d of _0x180820){if(_0x11cb22(0x3dc)!==_0x11cb22(0x30a)){_0x390d9d['match'](_0x416937[_0x10f042]);const _0x5d1bf7=RegExp['$1'],_0x496416=RegExp['$2'],_0x2c4415=RegExp['$3'],_0x445bf7='dir%1'['format'](TextManager[_0x11cb22(0x387)](_0x5d1bf7)),_0x4283e5=_0x11cb22(0x1e8)[_0x11cb22(0x3b1)](Number(_0x496416)||0x0),_0x1b7284=_0x2c4415[_0x11cb22(0x214)](',')[_0x11cb22(0x37a)](_0x356025=>Number(_0x356025)||0x0);this[_0x11cb22(0x1bd)][_0x445bf7][_0x4283e5][_0x11cb22(0x26d)]=_0x1b7284[0x0]||0x0,this[_0x11cb22(0x1bd)][_0x445bf7][_0x4283e5]['offsetY']=_0x1b7284[0x1]||0x0;}else _0x5cacae[_0x11cb22(0x3fc)]['Game_Follower_initialize'][_0x11cb22(0x2ce)](this,_0x3ddb69),this['randomizeAnimationCount']();}else _0x48fb14[_0x11cb22(0x344)]*=_0x10d0c3[_0x11cb22(0x3af)]??0x1,_0x5d6c79['pitch']*=_0x3c0120['pitchRate']??0x1;}}_0x4a4e16['match'](_0x416937['SmartJumpNonLandEvent'])&&(this[_0x11cb22(0x319)][_0x11cb22(0x1a1)]=!![]),_0x4a4e16['match'](_0x416937[_0x11cb22(0x307)])&&(this[_0x11cb22(0x319)]['nonPass']=!![]);},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x413)]=function(){const _0x1311bc=_0x5f4be9;return this[_0x1311bc(0x416)]===undefined&&(_0x1311bc(0x200)!==_0x1311bc(0x200)?this[_0x1311bc(0x298)][_0x1311bc(0x29f)]=_0x5b96e8(_0x3ca7e3['$1'])[_0x1311bc(0x301)](0x0,0xff):this[_0x1311bc(0x1f8)]()),this[_0x1311bc(0x416)];},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x426)]=function(){const _0x495a4f=_0x5f4be9;return this[_0x495a4f(0x1bd)]===undefined&&this[_0x495a4f(0x1f8)](),this['_footprintsData'];},Game_Event[_0x5f4be9(0x1c6)][_0x5f4be9(0x43e)]=function(){const _0x5c351e=_0x5f4be9;if(this['_smartJumpRestriction']===undefined)this[_0x5c351e(0x1f8)]();return this[_0x5c351e(0x319)]['nonLand'];},Game_Event['prototype']['notSmartJumpPassable']=function(){const _0x3b9f96=_0x5f4be9;if(this[_0x3b9f96(0x319)]===undefined)this[_0x3b9f96(0x1f8)]();return this[_0x3b9f96(0x319)]['nonPass'];},VisuMZ['MovementEffects'][_0x5f4be9(0x3c7)]=Game_Interpreter[_0x5f4be9(0x1c6)][_0x5f4be9(0x366)],Game_Interpreter[_0x5f4be9(0x1c6)]['updateWaitMode']=function(){const _0x55b69c=_0x5f4be9;if(this[_0x55b69c(0x41d)]===_0x55b69c(0x2bf)){if($gamePlayer[_0x55b69c(0x25f)]()){if(_0x55b69c(0x2aa)===_0x55b69c(0x2aa))return!![];else{_0x4bf9ce[_0x55b69c(0x471)](_0x272311[_0x22afcf]);const _0x4e8001=_0x3dd298['$1'],_0x1b6983=_0x4ef25c['$2'],_0x4cf0ca=_0x53eebb['$3'],_0x518db9=_0x55b69c(0x308)['format'](_0xfcfd6['parseDirectionText'](_0x4e8001)),_0x13e3a6=_0x55b69c(0x1e8)['format'](_0x34277c(_0x1b6983)||0x0);this[_0x55b69c(0x1bd)][_0x518db9][_0x13e3a6][_0x55b69c(0x1e3)]=_0x14a517(_0x4cf0ca)[_0x55b69c(0x1c9)]();}}this['_waitMode']='';}else{if(this[_0x55b69c(0x41d)]===_0x55b69c(0x438)){if('msowa'!==_0x55b69c(0x283)){if($gamePlayer[_0x55b69c(0x468)]()){if('JPpWr'!==_0x55b69c(0x318))return!![];else{const _0x5e1559=_0x1a4187[_0x55b69c(0x3fc)][_0x55b69c(0x203)],_0x15cc3c=_0x5e31f9[_0x55b69c(0x3ef)]||'';if(_0x15cc3c[_0x55b69c(0x471)](_0x5e1559[_0x55b69c(0x23f)]))return!![];else{if(_0x15cc3c[_0x55b69c(0x471)](_0x5e1559['NoDustCloud']))return![];}}}this[_0x55b69c(0x41d)]='';}else{if([0x6c,0x198][_0x55b69c(0x336)](_0x34ac37[_0x55b69c(0x3cd)])){if(_0x3db3ce!=='')_0x27b8ca+='\x0a';_0x28d981+=_0x13b583['parameters'][0x0];}}}else{if(this[_0x55b69c(0x41d)]===_0x55b69c(0x274)){if(_0x55b69c(0x2e0)===_0x55b69c(0x35a)){const _0x4f8ca1=this['regionId'](_0x36bbf8,_0x353e57),_0x1bcabe=this['terrainTag'](_0x4c8104,_0x12d7f7);if(this[_0x55b69c(0x3ce)]===_0x3d003f)this[_0x55b69c(0x412)]();if(this['_smartBlink'][_0x55b69c(0x26f)][_0x55b69c(0x336)](_0x4f8ca1))return!![];if(this[_0x55b69c(0x3ce)][_0x55b69c(0x38a)][_0x55b69c(0x336)](_0x1bcabe))return!![];return![];}else{if($gamePlayer[_0x55b69c(0x30c)]())return!![];this['_waitMode']='';}}}}return VisuMZ[_0x55b69c(0x3fc)]['Game_Interpreter_updateWaitMode'][_0x55b69c(0x2ce)](this);},VisuMZ['MovementEffects']['Sprite_Character_initialize']=Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x446)],Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x446)]=function(_0x316c93){const _0x390a28=_0x5f4be9;VisuMZ[_0x390a28(0x3fc)][_0x390a28(0x377)][_0x390a28(0x2ce)](this,_0x316c93),this[_0x390a28(0x3a2)]();},VisuMZ['MovementEffects'][_0x5f4be9(0x1c3)]=Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x28c)],Sprite_Character['prototype']['update']=function(){const _0x3d4174=_0x5f4be9;VisuMZ[_0x3d4174(0x3fc)][_0x3d4174(0x1c3)][_0x3d4174(0x2ce)](this),this[_0x3d4174(0x280)](),this[_0x3d4174(0x2f1)]();},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x3a2)]=function(){const _0x2393b5=_0x5f4be9;if(!PIXI[_0x2393b5(0x1ae)]['MotionBlurFilter'])return;if(this[_0x2393b5(0x3df)])return;this['_motionBlurMovementEffectsFilter']=new PIXI['filters'][(_0x2393b5(0x3a8))](),this[_0x2393b5(0x42a)]=0x0,this[_0x2393b5(0x2f9)]=0x0,this['filters']=this[_0x2393b5(0x1ae)]||[],this[_0x2393b5(0x1ae)][_0x2393b5(0x1cd)](this['_motionBlurMovementEffectsFilter']);},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x2c6)]=function(_0x1db70e,_0xeb962f){const _0x6ada00=_0x5f4be9;if(!this[_0x6ada00(0x3df)])return;this[_0x6ada00(0x42a)]=_0x1db70e,this[_0x6ada00(0x2f9)]=_0xeb962f;},Sprite_Character[_0x5f4be9(0x1c6)]['isPlayerSmartRushing']=function(){const _0x356b8d=_0x5f4be9;if(!this[_0x356b8d(0x475)])return![];if(this[_0x356b8d(0x475)]!==$gamePlayer&&this['_character']['constructor']!==Game_Follower)return![];return $gamePlayer[_0x356b8d(0x30c)]();},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x280)]=function(){const _0xa7d2af=_0x5f4be9;if(!this[_0xa7d2af(0x3df)])return;const _0x278d45=this[_0xa7d2af(0x3df)];let _0x116375=this[_0xa7d2af(0x2f9)];this[_0xa7d2af(0x31b)]()&&(this['_motionBlurMovementEffectsDuration']=Game_Player[_0xa7d2af(0x1d3)],_0x116375=Game_Player[_0xa7d2af(0x409)]);if(this[_0xa7d2af(0x42a)]-->0x0){let _0x261c91=VisuMZ['MovementEffects'][_0xa7d2af(0x2fd)](this[_0xa7d2af(0x475)]);_0x261c91+=_0x116375;const _0x1df0ad=this[_0xa7d2af(0x42a)]['clamp'](0x0,0x1e);_0x278d45[_0xa7d2af(0x42d)]['x']=_0x1df0ad*Math[_0xa7d2af(0x453)](_0x261c91*Math['PI']/0xb4),_0x278d45[_0xa7d2af(0x42d)]['y']=-_0x1df0ad*Math[_0xa7d2af(0x206)](_0x261c91*Math['PI']/0xb4);}else{if('VtSpH'!=='VtSpH'){const _0x1bc9b4=this[_0xa7d2af(0x1a6)](_0xcf2c01);if(!_0x1bc9b4)return;this[_0xa7d2af(0x292)]();const _0x1feb0e=this[_0xa7d2af(0x46e)],_0x128d19=_0x1feb0e['startScale'],_0x591e57=new _0x40b89a();_0x591e57[_0xa7d2af(0x25e)]=this['_dustCloudBitmap'],_0x591e57[_0xa7d2af(0x2d4)]=_0x1feb0e[_0xa7d2af(0x1b5)],_0x591e57['_duration']=_0x1feb0e[_0xa7d2af(0x47d)],_0x591e57[_0xa7d2af(0x1d6)]['x']=0.5,_0x591e57[_0xa7d2af(0x1d6)]['y']=0x1,_0x591e57['scale']['x']=(_0x2229e4['random']()*_0x128d19)['clamp'](0.01,0.99),_0x591e57[_0xa7d2af(0x3f6)]['y']=(_0x5b2493['random']()*_0x128d19)['clamp'](0.01,0.99),_0x591e57['_targetScaleX']=0x1-(_0xf0719e[_0xa7d2af(0x34f)]()*_0x128d19*0x2)['clamp'](0x0,0.8),_0x591e57[_0xa7d2af(0x405)]=0x1-(_0x2d50b7['random']()*_0x128d19*0x2)[_0xa7d2af(0x301)](0x0,0.8);const _0x347057=0.25,_0xa76f1=0.05;_0x591e57[_0xa7d2af(0x3f1)]=_0x24f860[_0xa7d2af(0x3f1)]+_0x1f5845[_0xa7d2af(0x34f)]()*_0x347057+_0x152a15[_0xa7d2af(0x34f)]()*_0x347057-_0x347057,_0x591e57[_0xa7d2af(0x2a6)]=_0xd65319[_0xa7d2af(0x2a6)]+_0x5d1790[_0xa7d2af(0x34f)]()*_0xa76f1+_0x37d435['random']()*_0xa76f1-_0xa76f1,_0x591e57['z']=0x3,this[_0xa7d2af(0x456)][_0xa7d2af(0x1cd)](_0x591e57),this['_tilemap'][_0xa7d2af(0x228)](_0x591e57);}else _0x278d45['velocity']['x']=0x0,_0x278d45[_0xa7d2af(0x42d)]['y']=0x0,this[_0xa7d2af(0x2f9)]=0x0;}},VisuMZ['MovementEffects']['GetDirAngle']=function(_0x479369){const _0x847374=_0x5f4be9;if(!_0x479369)return 0x2d;const _0x1b5ea1=_0x479369[_0x847374(0x3a4)]();if(_0x1b5ea1===0x6)return 0x0;if(_0x1b5ea1===0x9)return 0x2d;if(_0x1b5ea1===0x8)return 0x5a;if(_0x1b5ea1===0x7)return 0x87;if(_0x1b5ea1===0x4)return 0xb4;if(_0x1b5ea1===0x1)return 0xe1;if(_0x1b5ea1===0x2)return 0x10e;if(_0x1b5ea1===0x3)return 0x13b;return 0x2d;},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x1a5)]=function(){const _0x560e9d=_0x5f4be9;if(!SceneManager[_0x560e9d(0x419)])return![];if(!SceneManager['_scene']['_spriteset'])return![];if(this[_0x560e9d(0x23c)]!==Sprite_Character)return![];if(!this['_character'])return![];if(this[_0x560e9d(0x475)][_0x560e9d(0x462)])return![];if(!this[_0x560e9d(0x41e)])return![];if(this[_0x560e9d(0x2d4)]<=0x0)return![];if(!this[_0x560e9d(0x2b6)])return![];if(!this[_0x560e9d(0x25e)])return![];if(this[_0x560e9d(0x2b6)]['width']===this['bitmap'][_0x560e9d(0x240)])return![];if(this[_0x560e9d(0x277)]===this['_character'][_0x560e9d(0x3f1)]&&this[_0x560e9d(0x3e6)]===this['_character'][_0x560e9d(0x2a6)]){if(_0x560e9d(0x42e)!==_0x560e9d(0x42e))this[_0x560e9d(0x25e)]=_0x2c4a40[_0x560e9d(0x3c0)](),this[_0x560e9d(0x3f6)]['x']=_0x65a0d7[_0x560e9d(0x240)]*0.01,this['scale']['y']=_0x372a0f[_0x560e9d(0x1f5)]*0.01,this[_0x560e9d(0x394)]=0x2;else return![];}return!![];},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x3db)]=function(){const _0x280937=_0x5f4be9;if(!this[_0x280937(0x475)])return![];return this['_character'][_0x280937(0x43d)]()[_0x280937(0x40d)];},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x2f1)]=function(){const _0x1ad753=_0x5f4be9;if(!this[_0x1ad753(0x1a5)]())return;if(!this[_0x1ad753(0x3db)]())return;const _0x5abc50=this[_0x1ad753(0x475)][_0x1ad753(0x43d)](),_0x3dffe6=_0x5abc50[_0x1ad753(0x441)]||0x1;Graphics[_0x1ad753(0x403)]%_0x3dffe6===0x0&&this['createMotionTrailSprite']();},Sprite_Character[_0x5f4be9(0x1c6)][_0x5f4be9(0x20b)]=function(){const _0x29751a=_0x5f4be9,_0x2e34e0=new Sprite_MapMotionTrail(this,this[_0x29751a(0x475)]),_0x1df7c5=SceneManager[_0x29751a(0x419)][_0x29751a(0x370)];_0x1df7c5[_0x29751a(0x25a)][_0x29751a(0x1cd)](_0x2e34e0),this[_0x29751a(0x277)]=this['_character']['_realX'],this[_0x29751a(0x3e6)]=this[_0x29751a(0x475)][_0x29751a(0x2a6)];const _0x4c31e0=_0x1df7c5[_0x29751a(0x404)];_0x4c31e0['addChild'](_0x2e34e0);};function Sprite_Footprint(){this['initialize'](...arguments);}Sprite_Footprint[_0x5f4be9(0x1c6)]=Object['create'](Sprite[_0x5f4be9(0x1c6)]),Sprite_Footprint['prototype'][_0x5f4be9(0x23c)]=Sprite_Footprint,Sprite_Footprint['prototype'][_0x5f4be9(0x446)]=function(_0x301684){const _0x5604eb=_0x5f4be9;this[_0x5604eb(0x475)]=_0x301684,Sprite[_0x5604eb(0x1c6)][_0x5604eb(0x446)]['call'](this),this['initMembers'](),this['createBitmap'](),this[_0x5604eb(0x26e)](),this[_0x5604eb(0x3ca)](),this[_0x5604eb(0x33a)]();},Sprite_Footprint[_0x5f4be9(0x1c6)][_0x5f4be9(0x393)]=function(){const _0x1725f9=_0x5f4be9;this[_0x1725f9(0x1d6)]['x']=0.5,this[_0x1725f9(0x1d6)]['y']=0x1,this['z']=0x0,this[_0x1725f9(0x3f1)]=this[_0x1725f9(0x475)][_0x1725f9(0x3f1)],this[_0x1725f9(0x2a6)]=this[_0x1725f9(0x475)]['_realY'],this['_direction']=this['_character'][_0x1725f9(0x352)],this[_0x1725f9(0x1d4)]=this[_0x1725f9(0x475)]['pattern'](),this[_0x1725f9(0x3d8)]=this[_0x1725f9(0x475)][_0x1725f9(0x297)](),this['_followerOffsetX']=0x0,this['_followerOffsetY']=0x0;if(this[_0x1725f9(0x475)][_0x1725f9(0x23c)]===Game_Follower){const _0x315f39=VisuMZ[_0x1725f9(0x3fc)][_0x1725f9(0x381)][_0x1725f9(0x218)][_0x1725f9(0x3ee)]||0x0;this[_0x1725f9(0x428)]=Math[_0x1725f9(0x445)](_0x315f39+0x1)+Math[_0x1725f9(0x445)](_0x315f39+0x1)-_0x315f39,this[_0x1725f9(0x262)]=Math['randomInt'](_0x315f39+0x1)+Math[_0x1725f9(0x445)](_0x315f39+0x1)-_0x315f39;}},Sprite_Footprint[_0x5f4be9(0x1c6)][_0x5f4be9(0x426)]=function(){const _0xbb0be5=_0x5f4be9,_0x166f6c=_0xbb0be5(0x308)[_0xbb0be5(0x3b1)](this[_0xbb0be5(0x352)]),_0x7dd3cb=_0xbb0be5(0x1e8)['format'](this['_pattern']),_0x28894f=this[_0xbb0be5(0x475)][_0xbb0be5(0x426)]();return _0x28894f[_0x166f6c][_0x7dd3cb];},Sprite_Footprint[_0x5f4be9(0x1c6)][_0x5f4be9(0x439)]=function(){const _0x51f720=_0x5f4be9,_0x3787ea=this['footprintsData']();_0x3787ea[_0x51f720(0x1e3)]!==''?_0x51f720(0x41f)!==_0x51f720(0x1d2)?(this[_0x51f720(0x25e)]=ImageManager[_0x51f720(0x263)](_0x3787ea[_0x51f720(0x1e3)]),this[_0x51f720(0x394)]=0x0):(this[_0x51f720(0x411)](),this[_0x51f720(0x358)](),this[_0x51f720(0x28e)]()):_0x51f720(0x45b)===_0x51f720(0x294)?this[_0x51f720(0x298)][_0x51f720(0x2b2)]=_0x410f38['$1']['split'](',')[_0x51f720(0x37a)](_0x3a56b0=>(_0x2cb529(_0x3a56b0)||0x0)[_0x51f720(0x301)](0x0,0x7)):(this[_0x51f720(0x25e)]=ImageManager['generatedFootprintBitmap'](),this[_0x51f720(0x3f6)]['x']=_0x3787ea[_0x51f720(0x240)]*0.01,this[_0x51f720(0x3f6)]['y']=_0x3787ea['height']*0.01,this[_0x51f720(0x394)]=0x2);},Sprite_Footprint[_0x5f4be9(0x1c6)]['setupOpacity']=function(){const _0x7c36a=_0x5f4be9,_0xb06b0c=this['_character']['x'],_0x57cfde=this[_0x7c36a(0x475)]['y'];this[_0x7c36a(0x2d4)]=$gameMap[_0x7c36a(0x3f4)](_0xb06b0c,_0x57cfde);},Sprite_Footprint[_0x5f4be9(0x1c6)][_0x5f4be9(0x3ca)]=function(){const _0x4ba334=_0x5f4be9,_0x40c091=this[_0x4ba334(0x475)]['x'],_0x4ac7ed=this['_character']['y'];this[_0x4ba334(0x444)]=$gameMap[_0x4ba334(0x1ab)](_0x40c091,_0x4ac7ed);},Sprite_Footprint[_0x5f4be9(0x1c6)][_0x5f4be9(0x28c)]=function(){const _0xb1a03e=_0x5f4be9;Sprite[_0xb1a03e(0x1c6)][_0xb1a03e(0x28c)]['call'](this),this['updatePosition']();},Sprite_Footprint['prototype'][_0x5f4be9(0x33a)]=function(){const _0xcb8df9=_0x5f4be9,_0x244b63=$gameMap[_0xcb8df9(0x248)](),_0xaaa7e=$gameMap[_0xcb8df9(0x3b8)]();this['x']=Math[_0xcb8df9(0x333)]($gameMap[_0xcb8df9(0x407)](this['_realX'])*_0x244b63+_0x244b63/0x2),this['x']+=this[_0xcb8df9(0x426)]()[_0xcb8df9(0x26d)]+this[_0xcb8df9(0x428)],this['y']=Math['floor']($gameMap[_0xcb8df9(0x347)](this[_0xcb8df9(0x2a6)])*_0xaaa7e+_0xaaa7e),this['y']+=this[_0xcb8df9(0x426)]()['offsetY']+this[_0xcb8df9(0x262)],this['y']-=this['_shiftY'];};function Sprite_MapMotionTrail(){this['initialize'](...arguments);}Sprite_MapMotionTrail[_0x5f4be9(0x1c6)]=Object[_0x5f4be9(0x402)](Sprite[_0x5f4be9(0x1c6)]),Sprite_MapMotionTrail[_0x5f4be9(0x1c6)]['constructor']=Sprite_MapMotionTrail,Sprite_MapMotionTrail['prototype'][_0x5f4be9(0x446)]=function(_0x46f462,_0x1683c6){const _0x436c94=_0x5f4be9;this[_0x436c94(0x435)]=_0x46f462,this[_0x436c94(0x475)]=_0x1683c6,Sprite[_0x436c94(0x1c6)][_0x436c94(0x446)]['call'](this),this[_0x436c94(0x458)](),this[_0x436c94(0x22d)](),this['applyMotionTrailData'](),this[_0x436c94(0x40b)](),this[_0x436c94(0x27a)]=!![];},Sprite_MapMotionTrail['prototype'][_0x5f4be9(0x458)]=function(){const _0x1cfdb7=_0x5f4be9,_0x37339f=$gameMap[_0x1cfdb7(0x3b8)](),_0x1b2ff9=(_0x37339f-0x1)/_0x37339f;this[_0x1cfdb7(0x1d6)]['x']=this[_0x1cfdb7(0x435)][_0x1cfdb7(0x1d6)]['x'],this[_0x1cfdb7(0x1d6)]['y']=this[_0x1cfdb7(0x435)][_0x1cfdb7(0x1d6)]['y'],this[_0x1cfdb7(0x2d4)]=this[_0x1cfdb7(0x435)]['opacity'],this[_0x1cfdb7(0x3f6)]['x']=this['_baseSprite'][_0x1cfdb7(0x3f6)]['x'],this[_0x1cfdb7(0x3f6)]['y']=this[_0x1cfdb7(0x435)][_0x1cfdb7(0x3f6)]['y'],this['x']=this[_0x1cfdb7(0x435)]['x'],this['y']=this[_0x1cfdb7(0x435)]['y'],this['z']=this['_baseSprite']['z'],this[_0x1cfdb7(0x3f1)]=this[_0x1cfdb7(0x475)][_0x1cfdb7(0x3f1)],this[_0x1cfdb7(0x2a6)]=this[_0x1cfdb7(0x475)][_0x1cfdb7(0x2a6)],this[_0x1cfdb7(0x3d8)]=this[_0x1cfdb7(0x475)]['shiftY'](),this[_0x1cfdb7(0x255)]=this[_0x1cfdb7(0x475)]['jumpHeight']();},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)][_0x5f4be9(0x22d)]=function(){const _0x252cc2=_0x5f4be9;this[_0x252cc2(0x25e)]=this[_0x252cc2(0x435)]['bitmap'];const _0x107a22=this[_0x252cc2(0x435)][_0x252cc2(0x401)];this['_baseSprite'][_0x252cc2(0x401)]=0x0,this['_baseSprite']['updateCharacterFrame'](),this[_0x252cc2(0x2b6)]=JSON[_0x252cc2(0x21b)](JSON[_0x252cc2(0x40a)](this[_0x252cc2(0x435)][_0x252cc2(0x2b6)])),this[_0x252cc2(0x435)]['_bushDepth']=_0x107a22,this[_0x252cc2(0x435)]['updateCharacterFrame'](),this[_0x252cc2(0x3ab)]();},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)]['motionTrailData']=function(){const _0x572138=_0x5f4be9;return this['_character'][_0x572138(0x43d)]();},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)][_0x5f4be9(0x282)]=function(){const _0x3d686c=_0x5f4be9,_0x526537=this[_0x3d686c(0x43d)]();this[_0x3d686c(0x444)]=_0x526537[_0x3d686c(0x1b9)]||0x1,this[_0x3d686c(0x2ab)](_0x526537[_0x3d686c(0x27e)]),this[_0x3d686c(0x46c)](_0x526537['tone']),this[_0x3d686c(0x1f9)]=(_0x526537[_0x3d686c(0x1cc)]/0xff)[_0x3d686c(0x301)](0x0,0x1),this[_0x3d686c(0x2d4)]=(this['opacity']*this[_0x3d686c(0x1f9)])['clamp'](0x0,0xff);},Sprite_MapMotionTrail['prototype'][_0x5f4be9(0x40b)]=function(){const _0x5da510=_0x5f4be9;this['createIconSprite'](),this[_0x5da510(0x229)]();},Sprite_MapMotionTrail['prototype']['createIconSprite']=function(){const _0x3d208b=_0x5f4be9;this[_0x3d208b(0x35e)]=new Sprite(),this['_eventIconSprite']['bitmap']=ImageManager[_0x3d208b(0x1a7)](_0x3d208b(0x324)),this[_0x3d208b(0x35e)][_0x3d208b(0x25e)][_0x3d208b(0x399)]=![],this[_0x3d208b(0x35e)][_0x3d208b(0x1d6)]['x']=0.5,this[_0x3d208b(0x35e)][_0x3d208b(0x1d6)]['y']=0x1,this[_0x3d208b(0x228)](this['_eventIconSprite']);},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)][_0x5f4be9(0x229)]=function(){const _0x15f3b8=_0x5f4be9,_0x176e50=this['_eventIconSprite'],_0x3ff9fa=this[_0x15f3b8(0x435)]['_eventIconSprite'];_0x176e50['x']=_0x3ff9fa['x'],_0x176e50['y']=_0x3ff9fa['y'],_0x176e50[_0x15f3b8(0x2b6)]=JSON[_0x15f3b8(0x21b)](JSON[_0x15f3b8(0x40a)](_0x3ff9fa[_0x15f3b8(0x2b6)])),_0x176e50[_0x15f3b8(0x3ab)]();},Sprite_MapMotionTrail['prototype']['update']=function(){const _0x5b5c5d=_0x5f4be9;Sprite[_0x5b5c5d(0x1c6)][_0x5b5c5d(0x28c)][_0x5b5c5d(0x2ce)](this),this[_0x5b5c5d(0x27a)]&&(_0x5b5c5d(0x29b)===_0x5b5c5d(0x29b)?(this[_0x5b5c5d(0x1ef)](),this[_0x5b5c5d(0x33a)]()):this[_0x5b5c5d(0x20c)]&&this['_smartBlinkCooldown']--);},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ef)]=function(){const _0x3c95ac=_0x5f4be9;if(this[_0x3c95ac(0x444)]<=0x0)return;const _0x22b8dc=this[_0x3c95ac(0x444)];this[_0x3c95ac(0x2d4)]=(this[_0x3c95ac(0x2d4)]*(_0x22b8dc-0x1)+0x0)/_0x22b8dc,this['_duration']--,this[_0x3c95ac(0x444)]<=0x0&&(_0x3c95ac(0x1dc)!==_0x3c95ac(0x252)?this['opacity']=0x0:(_0x51c20e[_0x3c95ac(0x3fc)][_0x3c95ac(0x1c3)]['call'](this),this[_0x3c95ac(0x280)](),this[_0x3c95ac(0x2f1)]()));},Sprite_MapMotionTrail[_0x5f4be9(0x1c6)][_0x5f4be9(0x33a)]=function(){const _0x22d461=_0x5f4be9,_0x36b511=$gameMap[_0x22d461(0x248)](),_0x5067ca=$gameMap[_0x22d461(0x3b8)]();this['x']=Math[_0x22d461(0x333)]($gameMap[_0x22d461(0x407)](this[_0x22d461(0x3f1)])*_0x36b511+_0x36b511/0x2),this['y']=Math['floor']($gameMap[_0x22d461(0x347)](this[_0x22d461(0x2a6)])*_0x5067ca+_0x5067ca),this['y']-=this['_shiftY']+this['_jumpHeight']+0.001;},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x1f7)]=Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ce)],Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1ce)]=function(){const _0x1f3e23=_0x5f4be9;VisuMZ[_0x1f3e23(0x3fc)][_0x1f3e23(0x1f7)][_0x1f3e23(0x2ce)](this),this[_0x1f3e23(0x2ef)](),this['createFootprintBasics'](),this['createMotionTrailContainers']();},VisuMZ[_0x5f4be9(0x3fc)][_0x5f4be9(0x385)]=Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x28c)],Spriteset_Map['prototype'][_0x5f4be9(0x28c)]=function(){const _0x3fd58e=_0x5f4be9;VisuMZ['MovementEffects'][_0x3fd58e(0x385)]['call'](this),this[_0x3fd58e(0x2ec)](),this[_0x3fd58e(0x227)](),this['updateMotionTrailSprites']();},VisuMZ[_0x5f4be9(0x3fc)]['Spriteset_Map_updateTilemap']=Spriteset_Map[_0x5f4be9(0x1c6)]['updateTilemap'],Spriteset_Map['prototype']['updateTilemap']=function(){const _0x11d847=_0x5f4be9;VisuMZ[_0x11d847(0x3fc)]['Spriteset_Map_updateTilemap']['call'](this),this[_0x11d847(0x404)][_0x11d847(0x204)]['x']=Math['ceil'](this['_tilemap'][_0x11d847(0x204)]['x']),this[_0x11d847(0x404)][_0x11d847(0x204)]['y']=Math[_0x11d847(0x480)](this[_0x11d847(0x404)][_0x11d847(0x204)]['y']),this[_0x11d847(0x3b0)]();},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x3b0)]=function(){const _0x59622a=_0x5f4be9;if(!this[_0x59622a(0x32e)])return;const _0x139e57=this[_0x59622a(0x32e)]['children'];for(const _0x8e503f of _0x139e57){if(_0x59622a(0x443)!=='erueA')_0x1cb6f0*=this[_0x59622a(0x2c9)]||1.5;else{if(!_0x8e503f)continue;if(!_0x8e503f[_0x59622a(0x3d5)]())continue;if(!_0x8e503f['picture']()[_0x59622a(0x1ad)]())continue;_0x8e503f['updatePosition']();}}},VisuMZ[_0x5f4be9(0x3fc)]['Sprite_Picture_updatePosition']=Sprite_Picture[_0x5f4be9(0x1c6)]['updatePosition'],Sprite_Picture['prototype'][_0x5f4be9(0x33a)]=function(){const _0x23a0ca=_0x5f4be9;VisuMZ[_0x23a0ca(0x3fc)][_0x23a0ca(0x304)][_0x23a0ca(0x2ce)](this),this[_0x23a0ca(0x3d5)]()[_0x23a0ca(0x1ad)]()&&(_0x23a0ca(0x476)!==_0x23a0ca(0x1f4)?this[_0x23a0ca(0x19b)]():this[_0x23a0ca(0x337)]--);},Sprite_Picture['prototype'][_0x5f4be9(0x19b)]=function(){const _0x1016af=_0x5f4be9;if(!SceneManager[_0x1016af(0x419)])return;if(!SceneManager[_0x1016af(0x419)]['_spriteset'])return;const _0x3c956f=SceneManager['_scene'][_0x1016af(0x370)][_0x1016af(0x404)];if(!_0x3c956f)return;this['x']-=Math[_0x1016af(0x333)](_0x3c956f['origin']['x']),this['y']-=Math['floor'](_0x3c956f['origin']['y']);},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2ef)]=function(){const _0x18b89c=_0x5f4be9;this['_dustCloudSprites']=this['_dustCloudSprites']||[];const _0x413890=$gameSystem[_0x18b89c(0x47b)]();this['_dustCloudData']=JSON['parse'](JSON[_0x18b89c(0x40a)](_0x413890)),this[_0x18b89c(0x2ae)]();},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x292)]=function(){const _0x37f553=_0x5f4be9;if(!this['_dustCloudData'])this[_0x37f553(0x2ef)]();else{const _0x3f48fb=$gameSystem[_0x37f553(0x47b)]();JSON[_0x37f553(0x40a)](this['_dustCloudData'])!==JSON[_0x37f553(0x40a)](_0x3f48fb)&&this[_0x37f553(0x2ef)]();}},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2ae)]=function(){const _0x4cdf51=_0x5f4be9,_0x115e50=this[_0x4cdf51(0x46e)];if(_0x115e50[_0x4cdf51(0x1e3)]!=='')this['_dustCloudBitmap']=ImageManager['loadPicture'](_0x115e50[_0x4cdf51(0x1e3)]);else{const _0x30e6e1=_0x115e50[_0x4cdf51(0x433)],_0x263c3d=_0x30e6e1*0x2,_0xcb6fda=new Bitmap(_0x263c3d,_0x263c3d),_0x3e4a96=_0x115e50['color'],_0x29c608=_0x115e50[_0x4cdf51(0x2a3)];_0xcb6fda[_0x4cdf51(0x3b9)](_0x30e6e1,_0x3e4a96,_0x29c608),this['_dustCloudBitmap']=_0xcb6fda;}},Bitmap[_0x5f4be9(0x1c6)]['drawDustCloud']=function(_0x52abcb,_0x1d32c3,_0x523f27){const _0xe97dd7=_0x5f4be9;_0x523f27=_0x523f27[_0xe97dd7(0x301)](0x0,0x1);const _0x34046a=this[_0xe97dd7(0x2df)],_0x59610d=0x168*(Math['PI']/0xb4),_0x217185=_0x52abcb*0x2,_0x16e285=_0x34046a[_0xe97dd7(0x22c)](_0x52abcb,_0x52abcb,0x0,_0x52abcb,_0x52abcb,_0x52abcb),_0x280928=ColorManager[_0xe97dd7(0x1e5)](_0x1d32c3,0x1),_0xb601dd=ColorManager[_0xe97dd7(0x1e5)](_0x1d32c3,0x0);_0x16e285[_0xe97dd7(0x36b)](0x0,_0x280928),_0x16e285['addColorStop'](_0x523f27,_0x280928),_0x16e285[_0xe97dd7(0x36b)](0x1,_0xb601dd),_0x34046a['save'](),_0x34046a[_0xe97dd7(0x408)]=_0x16e285,_0x34046a[_0xe97dd7(0x31f)](),_0x34046a[_0xe97dd7(0x46d)](_0x52abcb,_0x52abcb),_0x34046a[_0xe97dd7(0x2ea)](_0x217185,_0x52abcb),_0x34046a[_0xe97dd7(0x3ed)](_0x52abcb,_0x52abcb,_0x52abcb,0x0,_0x59610d),_0x34046a[_0xe97dd7(0x2ea)](_0x52abcb,_0x52abcb),_0x34046a[_0xe97dd7(0x3d2)](),_0x34046a['restore'](),this[_0xe97dd7(0x3ec)]['update']();},ColorManager[_0x5f4be9(0x1e5)]=function(_0x31736d,_0x55ea52){const _0x5bad2d=_0x5f4be9;let _0x2caafe='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x5bad2d(0x353)](_0x31736d)){_0x2caafe=_0x31736d[_0x5bad2d(0x309)](0x1)[_0x5bad2d(0x214)]('');_0x2caafe['length']===0x3&&(_0x2caafe=[_0x2caafe[0x0],_0x2caafe[0x0],_0x2caafe[0x1],_0x2caafe[0x1],_0x2caafe[0x2],_0x2caafe[0x2]]);while(_0x2caafe['length']>0x6)_0x2caafe['pop']();return _0x2caafe='0x'+_0x2caafe[_0x5bad2d(0x23e)](''),'rgba('+[(_0x2caafe>>0x10&0xff)[_0x5bad2d(0x301)](0x0,0xff),(_0x2caafe>>0x8&0xff)[_0x5bad2d(0x301)](0x0,0xff),(_0x2caafe&0xff)[_0x5bad2d(0x301)](0x0,0xff)][_0x5bad2d(0x23e)](',')+','+_0x55ea52[_0x5bad2d(0x301)](0x0,0x1)+')';}else return _0x5bad2d(0x202);},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1e4)]=function(_0x545a8e){const _0x2a6deb=_0x5f4be9,_0x5620e3=this[_0x2a6deb(0x1a6)](_0x545a8e);if(!_0x5620e3)return;this[_0x2a6deb(0x292)]();const _0x1afd3c=this[_0x2a6deb(0x46e)],_0x175477=_0x1afd3c[_0x2a6deb(0x24e)],_0x2ad4d7=new Sprite();_0x2ad4d7[_0x2a6deb(0x25e)]=this[_0x2a6deb(0x30d)],_0x2ad4d7['opacity']=_0x1afd3c[_0x2a6deb(0x1b5)],_0x2ad4d7[_0x2a6deb(0x444)]=_0x1afd3c[_0x2a6deb(0x47d)],_0x2ad4d7[_0x2a6deb(0x1d6)]['x']=0.5,_0x2ad4d7[_0x2a6deb(0x1d6)]['y']=0x1,_0x2ad4d7[_0x2a6deb(0x3f6)]['x']=(Math['random']()*_0x175477)[_0x2a6deb(0x301)](0.01,0.99),_0x2ad4d7[_0x2a6deb(0x3f6)]['y']=(Math[_0x2a6deb(0x34f)]()*_0x175477)[_0x2a6deb(0x301)](0.01,0.99),_0x2ad4d7['_targetScaleX']=0x1-(Math[_0x2a6deb(0x34f)]()*_0x175477*0x2)[_0x2a6deb(0x301)](0x0,0.8),_0x2ad4d7['_targetScaleY']=0x1-(Math['random']()*_0x175477*0x2)[_0x2a6deb(0x301)](0x0,0.8);const _0xed62fc=0.25,_0x4d583b=0.05;_0x2ad4d7[_0x2a6deb(0x3f1)]=_0x545a8e[_0x2a6deb(0x3f1)]+Math[_0x2a6deb(0x34f)]()*_0xed62fc+Math[_0x2a6deb(0x34f)]()*_0xed62fc-_0xed62fc,_0x2ad4d7[_0x2a6deb(0x2a6)]=_0x545a8e[_0x2a6deb(0x2a6)]+Math[_0x2a6deb(0x34f)]()*_0x4d583b+Math['random']()*_0x4d583b-_0x4d583b,_0x2ad4d7['z']=0x3,this[_0x2a6deb(0x456)][_0x2a6deb(0x1cd)](_0x2ad4d7),this[_0x2a6deb(0x404)]['addChild'](_0x2ad4d7);},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2ec)]=function(){const _0x405134=_0x5f4be9,_0x251cc3=[];for(const _0x1e048a of this[_0x405134(0x456)]){if(_0x405134(0x1ed)!=='YRtqa'){if(!_0x1e048a)continue;this[_0x405134(0x211)](_0x1e048a);if(_0x1e048a[_0x405134(0x444)]<=0x0)_0x251cc3[_0x405134(0x1cd)](_0x1e048a);}else this[_0x405134(0x275)]();}for(const _0x419b73 of _0x251cc3){if('OFUxI'!==_0x405134(0x314))this[_0x405134(0x404)][_0x405134(0x2a5)](_0x419b73),this[_0x405134(0x456)][_0x405134(0x2b7)](_0x419b73);else return this[_0x405134(0x245)]();}},Spriteset_Map[_0x5f4be9(0x1c6)]['updateDustCloudSprite']=function(_0x18bb1d){const _0x45053b=_0x5f4be9,_0x5ec44f=_0x18bb1d[_0x45053b(0x444)],_0x192efd=$gameMap['tileWidth'](),_0xb66288=$gameMap[_0x45053b(0x3b8)]();_0x18bb1d['x']=Math['floor']($gameMap[_0x45053b(0x407)](_0x18bb1d[_0x45053b(0x3f1)])*_0x192efd+_0x192efd/0x2),_0x18bb1d['y']=Math[_0x45053b(0x333)]($gameMap['adjustY'](_0x18bb1d[_0x45053b(0x2a6)])*_0xb66288+_0xb66288),_0x18bb1d[_0x45053b(0x3f6)]['x']=(_0x18bb1d[_0x45053b(0x3f6)]['x']*(_0x5ec44f-0x1)+_0x18bb1d[_0x45053b(0x208)])/_0x5ec44f,_0x18bb1d[_0x45053b(0x3f6)]['y']=(_0x18bb1d['scale']['y']*(_0x5ec44f-0x1)+_0x18bb1d['_targetScaleY'])/_0x5ec44f,_0x18bb1d['opacity']=_0x18bb1d[_0x45053b(0x2d4)]*(_0x5ec44f-0x1)/_0x5ec44f,_0x18bb1d[_0x45053b(0x444)]--;},Spriteset_Map['prototype'][_0x5f4be9(0x2dc)]=function(){const _0x472a61=_0x5f4be9;this['_footprintSprites']=this[_0x472a61(0x3a5)]||[];},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1b0)]=function(_0x9bd148){const _0x34186d=_0x5f4be9,_0x543a19=this[_0x34186d(0x1a6)](_0x9bd148);if(!_0x543a19)return;const _0x30fd38=new Sprite_Footprint(_0x9bd148);this[_0x34186d(0x3a5)][_0x34186d(0x1cd)](_0x30fd38),this[_0x34186d(0x404)]['addChild'](_0x30fd38);},Spriteset_Map[_0x5f4be9(0x1c6)]['updateFootprints']=function(){const _0x23bc3e=_0x5f4be9,_0x3396f4=[];for(const _0x1a4fa5 of this[_0x23bc3e(0x3a5)]){if(!_0x1a4fa5)continue;this[_0x23bc3e(0x300)](_0x1a4fa5);if(_0x1a4fa5['_duration']<=0x0)_0x3396f4[_0x23bc3e(0x1cd)](_0x1a4fa5);}for(const _0x3c65df of _0x3396f4){this['_tilemap'][_0x23bc3e(0x2a5)](_0x3c65df),this[_0x23bc3e(0x3a5)][_0x23bc3e(0x2b7)](_0x3c65df);}},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x300)]=function(_0x46e831){const _0x4e4f02=_0x5f4be9,_0x344b78=_0x46e831['_duration'];_0x46e831[_0x4e4f02(0x2d4)]=_0x46e831[_0x4e4f02(0x2d4)]*(_0x344b78-0x1)/_0x344b78,_0x46e831[_0x4e4f02(0x444)]--;},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x1b4)]=function(){const _0xb7bac9=_0x5f4be9;this[_0xb7bac9(0x25a)]=[],this[_0xb7bac9(0x1ea)]=[];},Spriteset_Map[_0x5f4be9(0x1c6)][_0x5f4be9(0x2fc)]=function(){const _0x35065d=_0x5f4be9;if(!this[_0x35065d(0x25a)])return;for(const _0x2ed035 of this['_motionTrailExpiredSprites']){if(!_0x2ed035)continue;this['_motionTrailExpiredSprites'][_0x35065d(0x2b7)](_0x2ed035),this[_0x35065d(0x404)][_0x35065d(0x2a5)](_0x2ed035);}for(const _0x31d47b of this[_0x35065d(0x25a)]){if(_0x35065d(0x478)!==_0x35065d(0x478))_0xbe96e[_0x35065d(0x419)]['playOnceParallelInterpreter'](_0x5267c6);else{if(!_0x31d47b)continue;if(_0x31d47b[_0x35065d(0x2d4)]>0x0)continue;this['_motionTrailSprites'][_0x35065d(0x2b7)](_0x31d47b),this[_0x35065d(0x1ea)]['push'](_0x31d47b);}}};