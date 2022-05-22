//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.37;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.37] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
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
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x2d0910=_0x1c00;(function(_0x5ca073,_0x80f315){const _0x5c130b=_0x1c00,_0x373282=_0x5ca073();while(!![]){try{const _0x41f17c=parseInt(_0x5c130b(0x4d7))/0x1*(parseInt(_0x5c130b(0x5ee))/0x2)+-parseInt(_0x5c130b(0x631))/0x3+-parseInt(_0x5c130b(0x653))/0x4*(-parseInt(_0x5c130b(0x372))/0x5)+parseInt(_0x5c130b(0x429))/0x6+-parseInt(_0x5c130b(0x202))/0x7*(parseInt(_0x5c130b(0x371))/0x8)+parseInt(_0x5c130b(0x407))/0x9*(-parseInt(_0x5c130b(0x489))/0xa)+parseInt(_0x5c130b(0x5ab))/0xb;if(_0x41f17c===_0x80f315)break;else _0x373282['push'](_0x373282['shift']());}catch(_0x39eb2e){_0x373282['push'](_0x373282['shift']());}}}(_0xc9b2,0x1d83c));var label=_0x2d0910(0x1f1),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2d0910(0x2cc)](function(_0x509f7f){const _0x5361a0=_0x2d0910;return _0x509f7f[_0x5361a0(0x5ec)]&&_0x509f7f[_0x5361a0(0x5b5)][_0x5361a0(0x495)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2d0910(0x48d)]||{},VisuMZ[_0x2d0910(0x1c2)]=function(_0x19d017,_0x306bb2){const _0xd3495b=_0x2d0910;for(const _0x488edf in _0x306bb2){if(_0x488edf['match'](/(.*):(.*)/i)){if(_0xd3495b(0x1ba)===_0xd3495b(0x1ba)){const _0x4c5dab=String(RegExp['$1']),_0x2c5f78=String(RegExp['$2'])[_0xd3495b(0x3ea)]()['trim']();let _0x117d93,_0xf995e4,_0x4a0b82;switch(_0x2c5f78){case'NUM':_0x117d93=_0x306bb2[_0x488edf]!==''?Number(_0x306bb2[_0x488edf]):0x0;break;case _0xd3495b(0x5a5):_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4[_0xd3495b(0x638)](_0x4f187f=>Number(_0x4f187f));break;case _0xd3495b(0x203):_0x117d93=_0x306bb2[_0x488edf]!==''?eval(_0x306bb2[_0x488edf]):null;break;case'ARRAYEVAL':_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4[_0xd3495b(0x638)](_0x59da56=>eval(_0x59da56));break;case _0xd3495b(0x316):_0x117d93=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):'';break;case _0xd3495b(0x456):_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4[_0xd3495b(0x638)](_0x43f585=>JSON[_0xd3495b(0x36d)](_0x43f585));break;case _0xd3495b(0x2c6):_0x117d93=_0x306bb2[_0x488edf]!==''?new Function(JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf])):new Function('return\x200');break;case'ARRAYFUNC':_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4['map'](_0x509680=>new Function(JSON[_0xd3495b(0x36d)](_0x509680)));break;case'STR':_0x117d93=_0x306bb2[_0x488edf]!==''?String(_0x306bb2[_0x488edf]):'';break;case _0xd3495b(0x4e7):_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4[_0xd3495b(0x638)](_0xa8d498=>String(_0xa8d498));break;case'STRUCT':_0x4a0b82=_0x306bb2[_0x488edf]!==''?JSON['parse'](_0x306bb2[_0x488edf]):{},_0x19d017[_0x4c5dab]={},VisuMZ['ConvertParams'](_0x19d017[_0x4c5dab],_0x4a0b82);continue;case _0xd3495b(0x53f):_0xf995e4=_0x306bb2[_0x488edf]!==''?JSON[_0xd3495b(0x36d)](_0x306bb2[_0x488edf]):[],_0x117d93=_0xf995e4[_0xd3495b(0x638)](_0x229397=>VisuMZ['ConvertParams']({},JSON['parse'](_0x229397)));break;default:continue;}_0x19d017[_0x4c5dab]=_0x117d93;}else return _0x2b1995[_0xd3495b(0x1f1)]['Game_CharacterBase_realMoveSpeed'][_0xd3495b(0x5a1)](this)-this[_0xd3495b(0x344)];}}return _0x19d017;},(_0x1c5e54=>{const _0x29ad72=_0x2d0910,_0x47cbe4=_0x1c5e54[_0x29ad72(0x215)];for(const _0x16d4d3 of dependencies){if(!Imported[_0x16d4d3]){alert(_0x29ad72(0x3f2)['format'](_0x47cbe4,_0x16d4d3)),SceneManager[_0x29ad72(0x26b)]();break;}}const _0x1e751e=_0x1c5e54['description'];if(_0x1e751e[_0x29ad72(0x672)](/\[Version[ ](.*?)\]/i)){const _0x1e42ba=Number(RegExp['$1']);_0x1e42ba!==VisuMZ[label][_0x29ad72(0x4eb)]&&(alert(_0x29ad72(0x4c4)[_0x29ad72(0x1cf)](_0x47cbe4,_0x1e42ba)),SceneManager[_0x29ad72(0x26b)]());}if(_0x1e751e[_0x29ad72(0x672)](/\[Tier[ ](\d+)\]/i)){if(_0x29ad72(0x1e3)!==_0x29ad72(0x64b)){const _0x46c90e=Number(RegExp['$1']);_0x46c90e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x29ad72(0x1cf)](_0x47cbe4,_0x46c90e,tier)),SceneManager[_0x29ad72(0x26b)]()):tier=Math[_0x29ad72(0x674)](_0x46c90e,tier);}else{if(_0x2c67a6===0x0)return _0x4b3a2f;return _0x433386[_0x29ad72(0x3b6)](_0x1692f9);}}VisuMZ[_0x29ad72(0x1c2)](VisuMZ[label][_0x29ad72(0x48d)],_0x1c5e54[_0x29ad72(0x5e0)]);})(pluginData),VisuMZ[_0x2d0910(0x2b7)]=function(_0x3385e7,_0x3c8751,_0x5569eb){switch(_0x5569eb){case'=':return _0x3c8751;break;case'+':return _0x3385e7+_0x3c8751;break;case'-':return _0x3385e7-_0x3c8751;break;case'*':return _0x3385e7*_0x3c8751;break;case'/':return _0x3385e7/_0x3c8751;break;case'%':return _0x3385e7%_0x3c8751;break;}return _0x3385e7;},PluginManager[_0x2d0910(0x348)](pluginData['name'],_0x2d0910(0x25d),_0x3a0ccf=>{const _0x2e4a65=_0x2d0910;VisuMZ[_0x2e4a65(0x1c2)](_0x3a0ccf,_0x3a0ccf);switch(_0x3a0ccf['Value']){case _0x2e4a65(0x563):$gameSystem[_0x2e4a65(0x2d5)](!![]);break;case _0x2e4a65(0x419):$gameSystem[_0x2e4a65(0x2d5)](![]);break;case _0x2e4a65(0x688):$gameSystem[_0x2e4a65(0x2d5)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'CallEvent',_0x318dae=>{const _0x568f75=_0x2d0910;VisuMZ[_0x568f75(0x1c2)](_0x318dae,_0x318dae);const _0x22e477=$gameTemp[_0x568f75(0x2f6)](),_0x2c540a={'mapId':_0x318dae['MapId'],'eventId':_0x318dae[_0x568f75(0x46b)]||_0x22e477['eventId'](),'pageId':_0x318dae[_0x568f75(0x44e)]};if(_0x2c540a[_0x568f75(0x1c1)]<=0x0)_0x2c540a[_0x568f75(0x1c1)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x568f75(0x347)](_0x2c540a);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x367),_0x41a543=>{const _0x3b8c92=_0x2d0910;VisuMZ[_0x3b8c92(0x1c2)](_0x41a543,_0x41a543);switch(_0x41a543[_0x3b8c92(0x3fa)]){case _0x3b8c92(0x466):$gameSystem[_0x3b8c92(0x649)](!![]);break;case _0x3b8c92(0x4ed):$gameSystem[_0x3b8c92(0x649)](![]);break;case _0x3b8c92(0x688):$gameSystem[_0x3b8c92(0x649)](!$gameSystem[_0x3b8c92(0x1f6)]());break;}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x358),_0x533382=>{const _0x682794=_0x2d0910;VisuMZ[_0x682794(0x1c2)](_0x533382,_0x533382);const _0x414d6a=$gameTemp['getLastPluginCommandInterpreter']();_0x533382[_0x682794(0x4ce)]=_0x533382[_0x682794(0x4ce)]||$gameMap[_0x682794(0x1c1)](),$gameSystem[_0x682794(0x69d)](_0x533382['MapId'],_0x533382['EventId']||_0x414d6a[_0x682794(0x550)](),_0x533382[_0x682794(0x4cb)],_0x533382[_0x682794(0x4d3)],_0x533382['IconBufferY'],_0x533382[_0x682794(0x22b)]);}),PluginManager[_0x2d0910(0x348)](pluginData['name'],'EventIconDelete',_0x1b63bd=>{const _0x9f15d5=_0x2d0910;VisuMZ['ConvertParams'](_0x1b63bd,_0x1b63bd);const _0x55206d=$gameTemp[_0x9f15d5(0x2f6)]();_0x1b63bd[_0x9f15d5(0x4ce)]=_0x1b63bd[_0x9f15d5(0x4ce)]||$gameMap[_0x9f15d5(0x1c1)](),$gameSystem[_0x9f15d5(0x328)](_0x1b63bd[_0x9f15d5(0x4ce)],_0x1b63bd[_0x9f15d5(0x46b)]||_0x55206d[_0x9f15d5(0x550)]());}),PluginManager['registerCommand'](pluginData['name'],_0x2d0910(0x39a),_0xa3cb54=>{const _0x41b84a=_0x2d0910;if($gameMap)for(const _0x1c7bc5 of $gameMap[_0x41b84a(0x42d)]()){if(_0x41b84a(0x368)===_0x41b84a(0x368))_0x1c7bc5['refresh']();else return _0x3ed842>0x0?0x8:0x2;}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'EventLabelVisible',_0x2eea5d=>{const _0x3a4dae=_0x2d0910;VisuMZ['ConvertParams'](_0x2eea5d,_0x2eea5d);switch(_0x2eea5d[_0x3a4dae(0x3f5)]){case _0x3a4dae(0x270):$gameSystem[_0x3a4dae(0x30f)](!![]);break;case _0x3a4dae(0x671):$gameSystem['setEventLabelsVisible'](![]);break;case'Toggle':$gameSystem[_0x3a4dae(0x30f)](!$gameSystem[_0x3a4dae(0x207)]());break;}}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],_0x2d0910(0x1c3),_0x2a7ed6=>{const _0x43893d=_0x2d0910;VisuMZ[_0x43893d(0x1c2)](_0x2a7ed6,_0x2a7ed6);const _0x55cfbc=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x592aba=$gameMap[_0x43893d(0x3b6)](_0x2a7ed6[_0x43893d(0x46b)]||_0x55cfbc[_0x43893d(0x550)]());if(_0x592aba)_0x592aba[_0x43893d(0x575)]();}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x4a7),_0x49f378=>{const _0x28e6aa=_0x2d0910;VisuMZ[_0x28e6aa(0x1c2)](_0x49f378,_0x49f378);const _0x36db9e=$gameTemp['getLastPluginCommandInterpreter'](),_0x1b4a36=_0x49f378[_0x28e6aa(0x4ce)]||$gameMap['mapId'](),_0x27d892=_0x49f378['EventId']||_0x36db9e['eventId'](),_0xec2fdc=_0x49f378[_0x28e6aa(0x2aa)]||0x0,_0x8df1b3=_0x49f378['PosY']||0x0,_0x40b087=_0x49f378[_0x28e6aa(0x1c0)]||0x2,_0xcd85a1=((_0x49f378[_0x28e6aa(0x44e)]||0x1)-0x1)[_0x28e6aa(0x480)](0x0,0x13),_0x3e59fb=_0x49f378['MoveRouteIndex']||0x0;$gameSystem[_0x28e6aa(0x2ce)](_0x1b4a36,_0x27d892,_0xec2fdc,_0x8df1b3,_0x40b087,_0xcd85a1,_0x3e59fb);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x3f0),_0x5afbac=>{const _0x4652b3=_0x2d0910;VisuMZ[_0x4652b3(0x1c2)](_0x5afbac,_0x5afbac);const _0xaed80d=$gameTemp[_0x4652b3(0x2f6)](),_0xf25aa0=_0x5afbac[_0x4652b3(0x4ce)]||$gameMap[_0x4652b3(0x1c1)](),_0x34d99d=_0x5afbac['EventId']||_0xaed80d[_0x4652b3(0x550)]();$gameSystem['deleteSavedEventLocationKey'](_0xf25aa0,_0x34d99d);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],_0x2d0910(0x66f),_0x4f7470=>{const _0x481a07=_0x2d0910;VisuMZ[_0x481a07(0x1c2)](_0x4f7470,_0x4f7470);const _0x4dd9eb=_0x4f7470[_0x481a07(0x4a4)];$gameTimer[_0x481a07(0x40d)](_0x4dd9eb);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x269),_0x147843=>{const _0x2d7384=_0x2d0910;$gameTimer[_0x2d7384(0x40d)](0x0);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x694),_0x512a4e=>{const _0x20baab=_0x2d0910;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x512a4e,_0x512a4e);let _0xed4012=0x0;_0xed4012+=_0x512a4e[_0x20baab(0x1d4)],_0xed4012+=_0x512a4e[_0x20baab(0x69b)]*0x3c,_0xed4012+=_0x512a4e[_0x20baab(0x31a)]*0x3c*0x3c,_0xed4012+=_0x512a4e[_0x20baab(0x5da)]*0x3c*0x3c*0x3c,$gameTimer[_0x20baab(0x38b)](_0xed4012);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x54c),_0xa26ff0=>{const _0x1a429a=_0x2d0910;if(!$gameTimer[_0x1a429a(0x302)]())return;VisuMZ[_0x1a429a(0x1c2)](_0xa26ff0,_0xa26ff0);let _0x15e87f=0x0;_0x15e87f+=_0xa26ff0['Frames'],_0x15e87f+=_0xa26ff0[_0x1a429a(0x69b)]*0x3c,_0x15e87f+=_0xa26ff0[_0x1a429a(0x31a)]*0x3c*0x3c,_0x15e87f+=_0xa26ff0[_0x1a429a(0x5da)]*0x3c*0x3c*0x3c,$gameTimer[_0x1a429a(0x64c)](_0x15e87f);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x506),_0x4ee614=>{const _0x1f49f1=_0x2d0910;if(!$gameTimer[_0x1f49f1(0x302)]())return;$gameTimer[_0x1f49f1(0x388)]();}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'EventTimerResume',_0x46f84a=>{const _0x4362ad=_0x2d0910;if(!$gameTimer[_0x4362ad(0x302)]())return;$gameTimer[_0x4362ad(0x430)]();}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x437),_0xffe2d=>{const _0x2ca6a5=_0x2d0910;VisuMZ[_0x2ca6a5(0x1c2)](_0xffe2d,_0xffe2d);const _0xd068e7=_0xffe2d[_0x2ca6a5(0x2a2)]||0x0;$gameTimer[_0x2ca6a5(0x491)](_0xd068e7);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],'FollowerSetGlobalChase',_0x327013=>{const _0x1dbd33=_0x2d0910;VisuMZ[_0x1dbd33(0x1c2)](_0x327013,_0x327013);const _0x18130a=!_0x327013['Chase'];$gameSystem[_0x1dbd33(0x2fb)](_0x18130a);}),PluginManager['registerCommand'](pluginData['name'],_0x2d0910(0x3e9),_0x5cb081=>{const _0x497055=_0x2d0910;VisuMZ[_0x497055(0x1c2)](_0x5cb081,_0x5cb081);const _0x2b70f0=(_0x5cb081[_0x497055(0x67d)]||0x0)-0x1,_0x42b0f1=!_0x5cb081[_0x497055(0x633)],_0x3b3d49=$gamePlayer['followers']()['follower'](_0x2b70f0);if(_0x3b3d49)_0x3b3d49['setChaseOff'](_0x42b0f1);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],_0x2d0910(0x4a1),_0x15a9ec=>{const _0x3c9a20=_0x2d0910;VisuMZ[_0x3c9a20(0x1c2)](_0x15a9ec,_0x15a9ec);const _0x16a087=_0x15a9ec['FollowerID'];$gameSystem[_0x3c9a20(0x666)](_0x16a087);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x1d7),_0x1d7c31=>{const _0x262fda=_0x2d0910;VisuMZ[_0x262fda(0x1c2)](_0x1d7c31,_0x1d7c31),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x262fda(0x2fb)](![]);for(const _0x54f75f of $gamePlayer[_0x262fda(0x5b3)]()[_0x262fda(0x690)]){if(_0x54f75f)_0x54f75f[_0x262fda(0x6a0)](![]);}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x43f),_0x184534=>{const _0x4e7b34=_0x2d0910;VisuMZ['ConvertParams'](_0x184534,_0x184534);const _0x22a213=$gameTemp[_0x4e7b34(0x2f6)]();_0x184534[_0x4e7b34(0x4ce)]=_0x184534['MapId']||$gameMap[_0x4e7b34(0x1c1)]();const _0x38c281=[_0x184534[_0x4e7b34(0x4ce)],_0x184534['EventId']||_0x22a213[_0x4e7b34(0x550)](),_0x184534['Letter']],_0x5236b8=_0x184534[_0x4e7b34(0x425)],_0x2410b1=$gameSelfSwitches[_0x4e7b34(0x420)](_0x38c281)||![];$gameSwitches[_0x4e7b34(0x3a3)](_0x5236b8,_0x2410b1);}),PluginManager['registerCommand'](pluginData['name'],_0x2d0910(0x1dc),_0x350b19=>{const _0x28e201=_0x2d0910;VisuMZ[_0x28e201(0x1c2)](_0x350b19,_0x350b19);const _0x38183c=$gameTemp[_0x28e201(0x2f6)]();_0x350b19[_0x28e201(0x4ce)]=_0x350b19[_0x28e201(0x4ce)]||$gameMap['mapId']();const _0x56ce69=[_0x350b19[_0x28e201(0x4ce)],_0x350b19[_0x28e201(0x46b)]||_0x38183c[_0x28e201(0x550)](),_0x28e201(0x54d)['format'](_0x350b19[_0x28e201(0x675)])],_0x50ee91=_0x350b19[_0x28e201(0x425)],_0x3e42d1=$gameSelfSwitches['value'](_0x56ce69)||![];$gameSwitches['setValue'](_0x50ee91,_0x3e42d1);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x55b),_0x110a7c=>{const _0x25cecc=_0x2d0910;VisuMZ[_0x25cecc(0x1c2)](_0x110a7c,_0x110a7c);const _0x20a47a=$gameTemp['getLastPluginCommandInterpreter']();_0x110a7c[_0x25cecc(0x4ce)]=_0x110a7c[_0x25cecc(0x4ce)]||$gameMap[_0x25cecc(0x1c1)]();const _0x428847=[_0x110a7c[_0x25cecc(0x4ce)],_0x110a7c['EventId']||_0x20a47a[_0x25cecc(0x550)](),'Self\x20Variable\x20%1'[_0x25cecc(0x1cf)](_0x110a7c['VariableId'])],_0x558cd4=_0x110a7c[_0x25cecc(0x699)],_0x460164=$gameSelfSwitches['value'](_0x428847)||![];$gameVariables[_0x25cecc(0x3a3)](_0x558cd4,_0x460164);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'MorphEventTo',_0x347145=>{const _0x17a5ca=_0x2d0910;VisuMZ[_0x17a5ca(0x1c2)](_0x347145,_0x347145);if(!$gameMap)return;const _0x5d9fe7=$gameTemp[_0x17a5ca(0x2f6)](),_0xd73f70=_0x347145[_0x17a5ca(0x607)];_0x347145['Step1MapId']=_0x347145[_0x17a5ca(0x31b)]||$gameMap[_0x17a5ca(0x1c1)](),_0x347145[_0x17a5ca(0x2f3)]=_0x347145[_0x17a5ca(0x2f3)]||$gameMap[_0x17a5ca(0x1c1)](),_0x347145[_0x17a5ca(0x2c8)]=_0x347145['TemplateName']['toUpperCase']()[_0x17a5ca(0x61f)]();if(!_0xd73f70&&_0x347145['Step1MapId']!==$gameMap[_0x17a5ca(0x1c1)]())return;if($gameMap[_0x17a5ca(0x1c1)]()===_0x347145['Step1MapId']){if('pWnlJ'!==_0x17a5ca(0x673))this[_0x17a5ca(0x595)][_0x17a5ca(0x338)]=_0x34265a(_0x125c69['$1']),this[_0x17a5ca(0x595)]['offsetY']=_0x1f28ba(_0x5381be['$2']);else{const _0x21a6da=$gameMap['event'](_0x347145[_0x17a5ca(0x3fd)]||_0x5d9fe7[_0x17a5ca(0x550)]());if(!_0x21a6da)return;_0x347145[_0x17a5ca(0x2c8)]!==_0x17a5ca(0x5df)?_0x21a6da[_0x17a5ca(0x29e)](_0x347145[_0x17a5ca(0x2c8)]):_0x21a6da[_0x17a5ca(0x5bd)](_0x347145[_0x17a5ca(0x2f3)],_0x347145['Step2EventId']||_0x5d9fe7[_0x17a5ca(0x550)]());}}_0xd73f70&&$gameSystem[_0x17a5ca(0x41d)](_0x347145['Step1MapId'],_0x347145[_0x17a5ca(0x3fd)],_0x347145[_0x17a5ca(0x2c8)],_0x347145[_0x17a5ca(0x2f3)],_0x347145[_0x17a5ca(0x396)]);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x1ed),_0x54f578=>{const _0xe1c173=_0x2d0910;VisuMZ[_0xe1c173(0x1c2)](_0x54f578,_0x54f578);if(!$gameMap)return;const _0x2ffd0a=$gameTemp[_0xe1c173(0x2f6)]();_0x54f578['MapId']=_0x54f578[_0xe1c173(0x4ce)]||$gameMap[_0xe1c173(0x1c1)]();if($gameMap[_0xe1c173(0x1c1)]()===_0x54f578[_0xe1c173(0x4ce)]){const _0x2f5dca=$gameMap['event'](_0x54f578['EventId']||_0x2ffd0a[_0xe1c173(0x550)]());_0x2f5dca[_0xe1c173(0x449)]();}_0x54f578[_0xe1c173(0x56a)]&&(_0xe1c173(0x22e)===_0xe1c173(0x5bf)?_0x68760d[_0xe1c173(0x575)](this):$gameSystem[_0xe1c173(0x235)](_0x54f578[_0xe1c173(0x4ce)],_0x54f578[_0xe1c173(0x46b)]||_0x2ffd0a[_0xe1c173(0x550)]()));}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],'PlayerMovementChange',_0x464667=>{const _0x48f9aa=_0x2d0910;VisuMZ['ConvertParams'](_0x464667,_0x464667),$gameSystem['setPlayerControlDisable'](!_0x464667[_0x48f9aa(0x466)]);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'PlayerMovementDiagonal',_0x582e8a=>{const _0x285e0b=_0x2d0910;VisuMZ['ConvertParams'](_0x582e8a,_0x582e8a),$gameSystem[_0x285e0b(0x27a)](_0x582e8a[_0x285e0b(0x272)]);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x4bb),_0x5b8d51=>{const _0xd6c886=_0x2d0910;VisuMZ['ConvertParams'](_0x5b8d51,_0x5b8d51),$gameSystem[_0xd6c886(0x52a)]($gamePlayer,_0x5b8d51[_0xd6c886(0x4cb)],_0x5b8d51['IconBufferX'],_0x5b8d51[_0xd6c886(0x647)],_0x5b8d51['IconBlendMode']);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'PlayerIconDelete',_0x2f505b=>{const _0x56ca7a=_0x2d0910;VisuMZ[_0x56ca7a(0x1c2)](_0x2f505b,_0x2f505b),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'SelfSwitchABCD',_0x12efdf=>{const _0x4f0f1b=_0x2d0910;VisuMZ['ConvertParams'](_0x12efdf,_0x12efdf);const _0x2545c4=$gameTemp['getLastPluginCommandInterpreter']();_0x12efdf[_0x4f0f1b(0x4ce)]=_0x12efdf[_0x4f0f1b(0x4ce)]||$gameMap['mapId']();const _0x438599=[_0x12efdf['MapId'],_0x12efdf[_0x4f0f1b(0x46b)]||_0x2545c4[_0x4f0f1b(0x550)](),_0x12efdf[_0x4f0f1b(0x4df)]];switch(_0x12efdf[_0x4f0f1b(0x3fa)]){case'ON':$gameSelfSwitches[_0x4f0f1b(0x3a3)](_0x438599,!![]);break;case'OFF':$gameSelfSwitches[_0x4f0f1b(0x3a3)](_0x438599,![]);break;case _0x4f0f1b(0x688):$gameSelfSwitches[_0x4f0f1b(0x3a3)](_0x438599,!$gameSelfSwitches[_0x4f0f1b(0x420)](_0x438599));break;}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'SelfSwitchID',_0x2174b4=>{const _0xe5bb82=_0x2d0910;VisuMZ['ConvertParams'](_0x2174b4,_0x2174b4);const _0x3b988d=$gameTemp[_0xe5bb82(0x2f6)]();_0x2174b4[_0xe5bb82(0x4ce)]=_0x2174b4[_0xe5bb82(0x4ce)]||$gameMap[_0xe5bb82(0x1c1)]();const _0x3da1e4=[_0x2174b4[_0xe5bb82(0x4ce)],_0x2174b4['EventId']||_0x3b988d[_0xe5bb82(0x550)](),_0xe5bb82(0x54d)[_0xe5bb82(0x1cf)](_0x2174b4[_0xe5bb82(0x675)])];switch(_0x2174b4[_0xe5bb82(0x3fa)]){case'ON':$gameSelfSwitches[_0xe5bb82(0x3a3)](_0x3da1e4,!![]);break;case _0xe5bb82(0x652):$gameSelfSwitches[_0xe5bb82(0x3a3)](_0x3da1e4,![]);break;case _0xe5bb82(0x688):$gameSelfSwitches[_0xe5bb82(0x3a3)](_0x3da1e4,!$gameSelfSwitches[_0xe5bb82(0x420)](_0x3da1e4));break;}}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x486),_0xb173f7=>{const _0x1bfd43=_0x2d0910;VisuMZ[_0x1bfd43(0x1c2)](_0xb173f7,_0xb173f7);const _0x292cdb=$gameTemp[_0x1bfd43(0x2f6)]();_0xb173f7['MapId']=_0xb173f7['MapId']||$gameMap[_0x1bfd43(0x1c1)]();const _0x5a8102=[_0xb173f7['MapId'],_0xb173f7[_0x1bfd43(0x46b)]||_0x292cdb[_0x1bfd43(0x550)](),_0x1bfd43(0x682)[_0x1bfd43(0x1cf)](_0xb173f7[_0x1bfd43(0x33b)])],_0xff5d37=VisuMZ[_0x1bfd43(0x2b7)]($gameSelfSwitches[_0x1bfd43(0x420)](_0x5a8102),_0xb173f7[_0x1bfd43(0x3fa)],_0xb173f7[_0x1bfd43(0x20a)]);$gameSelfSwitches[_0x1bfd43(0x3a3)](_0x5a8102,_0xff5d37);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x61a),_0x131caa=>{const _0x314050=_0x2d0910;VisuMZ[_0x314050(0x1c2)](_0x131caa,_0x131caa);const _0x4e3c7b=$gameTemp[_0x314050(0x2f6)](),_0x12cdcc={'template':_0x131caa[_0x314050(0x2c8)],'mapId':_0x131caa[_0x314050(0x4ce)]||$gameMap['mapId'](),'eventId':_0x131caa['EventId']||_0x4e3c7b[_0x314050(0x550)](),'x':_0x131caa[_0x314050(0x2aa)],'y':_0x131caa[_0x314050(0x39e)],'spawnPreserved':_0x131caa['Preserve'],'spawnEventId':$gameMap[_0x314050(0x635)][_0x314050(0x290)]+0x3e8},_0x3d0064=_0x131caa['SuccessSwitchId']||0x0;if(!VisuMZ[_0x314050(0x613)][_0x12cdcc[_0x314050(0x1c1)]]&&_0x12cdcc[_0x314050(0x1c1)]!==$gameMap[_0x314050(0x1c1)]()){let _0x2daae1=_0x314050(0x561)[_0x314050(0x1cf)](_0x12cdcc['mapId']);_0x2daae1+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2daae1+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x2daae1+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x2daae1+=_0x314050(0x49e)[_0x314050(0x1cf)](_0x12cdcc['mapId']),alert(_0x2daae1);return;}const _0x49fa7c=$gameMap[_0x314050(0x2cd)](_0x12cdcc,_0x131caa[_0x314050(0x4fc)],_0x131caa[_0x314050(0x56c)]);_0x3d0064&&$gameSwitches[_0x314050(0x3a3)](_0x3d0064,!!_0x49fa7c);}),PluginManager['registerCommand'](pluginData['name'],_0x2d0910(0x4d1),_0x1abcb5=>{const _0x378f0b=_0x2d0910;VisuMZ[_0x378f0b(0x1c2)](_0x1abcb5,_0x1abcb5);const _0x103fe3=$gameTemp[_0x378f0b(0x2f6)](),_0x32a1e6={'template':_0x1abcb5[_0x378f0b(0x2c8)],'mapId':_0x1abcb5[_0x378f0b(0x4ce)]||$gameMap[_0x378f0b(0x1c1)](),'eventId':_0x1abcb5[_0x378f0b(0x46b)]||_0x103fe3['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1abcb5['Preserve'],'spawnEventId':$gameMap[_0x378f0b(0x635)]['length']+0x3e8},_0x363a22=_0x1abcb5['SuccessSwitchId']||0x0;if(!VisuMZ[_0x378f0b(0x613)][_0x32a1e6[_0x378f0b(0x1c1)]]&&_0x32a1e6[_0x378f0b(0x1c1)]!==$gameMap[_0x378f0b(0x1c1)]()){if('VvRuz'===_0x378f0b(0x292)){let _0x26711a='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x378f0b(0x1cf)](_0x32a1e6[_0x378f0b(0x1c1)]);_0x26711a+=_0x378f0b(0x2ab),_0x26711a+=_0x378f0b(0x24f),_0x26711a+=_0x378f0b(0x4c6),_0x26711a+=_0x378f0b(0x49e)[_0x378f0b(0x1cf)](_0x32a1e6[_0x378f0b(0x1c1)]),alert(_0x26711a);return;}else{this[_0x378f0b(0x564)]--;if(this[_0x378f0b(0x564)]<=0x0&&this[_0x378f0b(0x432)]!==_0x378f0b(0x579))this[_0x378f0b(0x404)]();}}const _0x173b75=$gameMap[_0x378f0b(0x41a)](_0x32a1e6,_0x1abcb5['Region'],_0x1abcb5[_0x378f0b(0x4fc)],_0x1abcb5[_0x378f0b(0x56c)]);_0x363a22&&$gameSwitches['setValue'](_0x363a22,!!_0x173b75);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],_0x2d0910(0x48f),_0x193a84=>{const _0x52e5e3=_0x2d0910;VisuMZ[_0x52e5e3(0x1c2)](_0x193a84,_0x193a84);const _0x4e3c7a=$gameTemp[_0x52e5e3(0x2f6)](),_0x440cce={'template':_0x193a84[_0x52e5e3(0x2c8)],'mapId':_0x193a84['MapId']||$gameMap['mapId'](),'eventId':_0x193a84[_0x52e5e3(0x46b)]||_0x4e3c7a['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x193a84[_0x52e5e3(0x274)],'spawnEventId':$gameMap[_0x52e5e3(0x635)]['length']+0x3e8},_0xde4415=_0x193a84[_0x52e5e3(0x55e)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x440cce[_0x52e5e3(0x1c1)]]&&_0x440cce[_0x52e5e3(0x1c1)]!==$gameMap[_0x52e5e3(0x1c1)]()){let _0x25d1ac=_0x52e5e3(0x561)['format'](_0x440cce[_0x52e5e3(0x1c1)]);_0x25d1ac+=_0x52e5e3(0x2ab),_0x25d1ac+=_0x52e5e3(0x24f),_0x25d1ac+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x25d1ac+=_0x52e5e3(0x49e)[_0x52e5e3(0x1cf)](_0x440cce[_0x52e5e3(0x1c1)]),alert(_0x25d1ac);return;}const _0x1f7b01=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x440cce,_0x193a84[_0x52e5e3(0x5b8)],_0x193a84[_0x52e5e3(0x4fc)],_0x193a84[_0x52e5e3(0x56c)]);if(_0xde4415){if('hOGCV'!=='hOGCV')return!!this[_0x52e5e3(0x3d5)](_0x49aeeb);else $gameSwitches['setValue'](_0xde4415,!!_0x1f7b01);}}),PluginManager[_0x2d0910(0x348)](pluginData['name'],_0x2d0910(0x45c),_0x37ad4a=>{const _0x26329b=_0x2d0910;VisuMZ[_0x26329b(0x1c2)](_0x37ad4a,_0x37ad4a);const _0x4c87a7=$gameTemp[_0x26329b(0x2f6)]();$gameMap[_0x26329b(0x3ce)](_0x37ad4a[_0x26329b(0x3d8)]||_0x4c87a7[_0x26329b(0x550)]());}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],'SpawnEventDespawnAtXY',_0x4036eb=>{const _0x1760ca=_0x2d0910;VisuMZ[_0x1760ca(0x1c2)](_0x4036eb,_0x4036eb);const _0x5724cb=_0x4036eb[_0x1760ca(0x2aa)],_0x13683d=_0x4036eb['PosY'];$gameMap['despawnAtXY'](_0x5724cb,_0x13683d);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],'SpawnEventDespawnRegions',_0x7f7b8f=>{const _0x36459e=_0x2d0910;VisuMZ[_0x36459e(0x1c2)](_0x7f7b8f,_0x7f7b8f),$gameMap[_0x36459e(0x2dc)](_0x7f7b8f['Region']);}),PluginManager[_0x2d0910(0x348)](pluginData[_0x2d0910(0x215)],_0x2d0910(0x303),_0x1decab=>{const _0x137f43=_0x2d0910;VisuMZ[_0x137f43(0x1c2)](_0x1decab,_0x1decab),$gameMap[_0x137f43(0x473)](_0x1decab[_0x137f43(0x5b8)]);}),PluginManager['registerCommand'](pluginData[_0x2d0910(0x215)],_0x2d0910(0x50c),_0x1a99c4=>{const _0xb09778=_0x2d0910;VisuMZ[_0xb09778(0x1c2)](_0x1a99c4,_0x1a99c4),$gameMap[_0xb09778(0x1d5)]();}),VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3d9)]=Scene_Boot[_0x2d0910(0x3c7)][_0x2d0910(0x240)],Scene_Boot[_0x2d0910(0x3c7)][_0x2d0910(0x240)]=function(){const _0x2edc66=_0x2d0910;VisuMZ[_0x2edc66(0x1f1)]['Scene_Boot_onDatabaseLoaded'][_0x2edc66(0x5a1)](this),this[_0x2edc66(0x5d4)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x2edc66(0x1f1)][_0x2edc66(0x2e3)])VisuMZ[_0x2edc66(0x1f1)][_0x2edc66(0x2e3)][_0x2edc66(0x51c)]();},VisuMZ[_0x2d0910(0x613)]=[],VisuMZ[_0x2d0910(0x5a8)]={},Scene_Boot[_0x2d0910(0x3c7)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x7bbd38=_0x2d0910;if(DataManager[_0x7bbd38(0x5d5)]()||DataManager[_0x7bbd38(0x25c)]())return;const _0x280608=VisuMZ['EventsMoveCore'][_0x7bbd38(0x48d)][_0x7bbd38(0x625)],_0x5046b0=_0x280608['PreloadMaps'][_0x7bbd38(0x2ef)](0x0);for(const _0xeadf74 of _0x280608[_0x7bbd38(0x683)]){if('RqscX'===_0x7bbd38(0x651)){if(!this[_0x7bbd38(0x5cf)]())_0x4406c5=this[_0x7bbd38(0x457)](_0x7b1f18);_0x30f378[_0x7bbd38(0x1f1)][_0x7bbd38(0x369)][_0x7bbd38(0x5a1)](this,_0x35bcef);}else{_0xeadf74[_0x7bbd38(0x1bc)]=_0xeadf74['Name'][_0x7bbd38(0x3ea)]()[_0x7bbd38(0x61f)](),VisuMZ['EventTemplates'][_0xeadf74[_0x7bbd38(0x1bc)]]=_0xeadf74;if(!_0x5046b0[_0x7bbd38(0x495)](_0xeadf74[_0x7bbd38(0x435)]))_0x5046b0[_0x7bbd38(0x3eb)](_0xeadf74[_0x7bbd38(0x435)]);}}for(const _0x4868c8 of _0x5046b0){if(VisuMZ['PreloadedMaps'][_0x4868c8])continue;const _0x5090f0=_0x7bbd38(0x5fe)[_0x7bbd38(0x1cf)](_0x4868c8[_0x7bbd38(0x431)](0x3)),_0x214fb3=_0x7bbd38(0x584)['format'](_0x4868c8);DataManager[_0x7bbd38(0x376)](_0x214fb3,_0x5090f0),setTimeout(this[_0x7bbd38(0x1d3)]['bind'](this,_0x4868c8,_0x214fb3),0x64);}},Scene_Boot['prototype'][_0x2d0910(0x1d3)]=function(_0x459d9e,_0x364ee7){const _0xb95a64=_0x2d0910;if(window[_0x364ee7]){if(_0xb95a64(0x3ff)===_0xb95a64(0x57a))return this['processMoveRouteMoveRepeat'](0x3,_0x2430cd(_0x5d61e7['$1']));else VisuMZ[_0xb95a64(0x613)][_0x459d9e]=window[_0x364ee7],window[_0x364ee7]=undefined;}else setTimeout(this[_0xb95a64(0x1d3)][_0xb95a64(0x20b)](this,_0x459d9e,_0x364ee7),0x64);},VisuMZ[_0x2d0910(0x31f)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x2d0910(0x4a9)]=[],VisuMZ[_0x2d0910(0x1cb)]=[],VisuMZ[_0x2d0910(0x5b7)]=[],VisuMZ['MapVariables']=[],Scene_Boot[_0x2d0910(0x3c7)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x2de24d=_0x2d0910;for(let _0x2b76c8=0x1;_0x2b76c8<$dataSystem[_0x2de24d(0x69a)][_0x2de24d(0x290)];_0x2b76c8++){if($dataSystem[_0x2de24d(0x69a)][_0x2b76c8][_0x2de24d(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches']['push'](_0x2b76c8);if($dataSystem[_0x2de24d(0x69a)][_0x2b76c8][_0x2de24d(0x672)](/<SELF>/i))VisuMZ[_0x2de24d(0x322)][_0x2de24d(0x3eb)](_0x2b76c8);if($dataSystem[_0x2de24d(0x69a)][_0x2b76c8][_0x2de24d(0x672)](/<MAP>/i))VisuMZ['MapSwitches'][_0x2de24d(0x3eb)](_0x2b76c8);}for(let _0x4a66c8=0x1;_0x4a66c8<$dataSystem[_0x2de24d(0x5d0)][_0x2de24d(0x290)];_0x4a66c8++){if($dataSystem[_0x2de24d(0x5d0)][_0x4a66c8][_0x2de24d(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2de24d(0x1cb)][_0x2de24d(0x3eb)](_0x4a66c8);if($dataSystem[_0x2de24d(0x5d0)][_0x4a66c8][_0x2de24d(0x672)](/<SELF>/i))VisuMZ[_0x2de24d(0x5b7)]['push'](_0x4a66c8);if($dataSystem[_0x2de24d(0x5d0)][_0x4a66c8][_0x2de24d(0x672)](/<MAP>/i))VisuMZ[_0x2de24d(0x657)][_0x2de24d(0x3eb)](_0x4a66c8);}},VisuMZ['EventsMoveCore'][_0x2d0910(0x2e3)]={},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2e3)][_0x2d0910(0x51c)]=function(){const _0x5e8a79=_0x2d0910;this[_0x5e8a79(0x247)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ['EventsMoveCore'][_0x2d0910(0x2e3)][_0x2d0910(0x582)]=function(){const _0x37dc73=_0x2d0910;this['_commonEvents']=[];for(const _0x496287 of $dataCommonEvents){if(!_0x496287)continue;VisuMZ[_0x37dc73(0x1f1)][_0x37dc73(0x2e3)][_0x37dc73(0x664)](_0x496287);if(_0x496287[_0x37dc73(0x308)][_0x37dc73(0x290)]>0x0)this['_commonEvents'][_0x37dc73(0x3eb)](_0x496287['id']);}},VisuMZ[_0x2d0910(0x1f1)]['CustomPageConditions'][_0x2d0910(0x5d1)]=function(_0x41db99,_0xc3cce4){const _0x5497f4=_0x2d0910;return this[_0x5497f4(0x247)][_0x5497f4(0x39c)](_0x41db99,_0xc3cce4),this[_0x5497f4(0x247)]['execute'](),this[_0x5497f4(0x247)][_0x5497f4(0x52e)];},VisuMZ['EventsMoveCore'][_0x2d0910(0x2e3)]['loadCPC']=function(_0x687ab2){const _0x21aa9c=_0x2d0910;let _0x32e973=![];_0x687ab2[_0x21aa9c(0x308)]=[];for(const _0x3b75ef of _0x687ab2[_0x21aa9c(0x222)]){if('NFrbA'!=='tjXOX'){if([0x6c,0x198][_0x21aa9c(0x495)](_0x3b75ef[_0x21aa9c(0x213)])){if(_0x21aa9c(0x532)===_0x21aa9c(0x532)){const _0x4d9b39=_0x3b75ef[_0x21aa9c(0x5e0)][0x0];if(_0x4d9b39['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x21aa9c(0x642)!==_0x21aa9c(0x642)?this[_0x21aa9c(0x29e)](_0x28f0cd,!![]):_0x32e973=!![];else _0x4d9b39['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x32e973=![]);}else this[_0x21aa9c(0x3ce)](_0x1f0936['_eventId']);}_0x32e973&&_0x687ab2[_0x21aa9c(0x308)][_0x21aa9c(0x3eb)](_0x3b75ef);}else return this['isOnRope']()?0x4:0x2;}},getSelfSwitchValue=function(_0x2bb84e,_0x21eeea,_0x533dc8){const _0x5e46e8=_0x2d0910;let _0xaa5894=[_0x2bb84e,_0x21eeea,_0x5e46e8(0x54d)[_0x5e46e8(0x1cf)](_0x533dc8)];return typeof _0x533dc8==='string'&&(_0xaa5894=[_0x2bb84e,_0x21eeea,_0x533dc8[_0x5e46e8(0x3ea)]()['trim']()]),$gameSelfSwitches[_0x5e46e8(0x420)](_0xaa5894);},getMapSwitchValue=function(_0x4d57b3,_0x300ef4){const _0x56a499=_0x2d0910;let _0xc3da80=[0x0,0x0,_0x56a499(0x2b2)[_0x56a499(0x1cf)](_0x4d57b3,_0x300ef4)];return $gameSelfSwitches[_0x56a499(0x420)](_0xc3da80);},getMapVariableValue=function(_0x255e42,_0x3da293){const _0x8ce544=_0x2d0910;let _0x1e43da=[0x0,0x0,_0x8ce544(0x478)[_0x8ce544(0x1cf)](_0x255e42,_0x3da293)];return $gameSelfSwitches[_0x8ce544(0x420)](_0x1e43da);},getSelfVariableValue=function(_0x356b52,_0x398964,_0x486aa4){const _0x54f090=_0x2d0910,_0x335a29=[_0x356b52,_0x398964,_0x54f090(0x682)['format'](_0x486aa4)];return $gameSelfSwitches[_0x54f090(0x420)](_0x335a29);},setSelfSwitchValue=function(_0x5d5ee3,_0x142a72,_0x113b5c,_0x12a491){const _0x55d533=_0x2d0910;let _0x2e99c8=[_0x5d5ee3,_0x142a72,_0x55d533(0x54d)['format'](_0x113b5c)];typeof _0x113b5c===_0x55d533(0x566)&&('WEWjs'===_0x55d533(0x1db)?this['_labelWindow'][_0x55d533(0x393)]=this['_labelWindow']['text'][_0x55d533(0x263)](/\\V\[(\d+)\]/gi,(_0x3dcfd9,_0x56a7a6)=>_0x3a6e38[_0x55d533(0x420)](_0xa3876a(_0x56a7a6))):_0x2e99c8=[_0x5d5ee3,_0x142a72,_0x113b5c[_0x55d533(0x3ea)]()[_0x55d533(0x61f)]()]),$gameSelfSwitches[_0x55d533(0x3a3)](_0x2e99c8,_0x12a491);},setSelfVariableValue=function(_0x5c435b,_0x5917ee,_0x657375,_0x3e35fc){const _0x2beab8=_0x2d0910,_0x83f860=[_0x5c435b,_0x5917ee,_0x2beab8(0x682)['format'](_0x657375)];$gameSelfSwitches[_0x2beab8(0x3a3)](_0x83f860,_0x3e35fc);},setMapSwitchValue=function(_0x23db02,_0x5f02cb,_0x7c8f15){const _0x2b9a05=_0x2d0910;let _0x1a3500=[0x0,0x0,_0x2b9a05(0x2b2)[_0x2b9a05(0x1cf)](_0x23db02,_0x5f02cb)];$gameSelfSwitches[_0x2b9a05(0x3a3)](_0x1a3500,_0x7c8f15);},setMapVariableValue=function(_0x2f5401,_0x30b0c3,_0x5236f8){const _0x2a1d96=_0x2d0910;let _0x42797c=[0x0,0x0,_0x2a1d96(0x478)[_0x2a1d96(0x1cf)](_0x2f5401,_0x30b0c3)];$gameSelfSwitches[_0x2a1d96(0x3a3)](_0x42797c,_0x5236f8);},DataManager[_0x2d0910(0x5f3)]=function(_0x136baa){const _0x1ac455=_0x2d0910;if(SceneManager[_0x1ac455(0x389)][_0x1ac455(0x3a1)]===Scene_Debug)return![];return VisuMZ[_0x1ac455(0x31f)][_0x1ac455(0x495)](_0x136baa);},DataManager[_0x2d0910(0x3ad)]=function(_0xd32eeb){const _0x11c8cc=_0x2d0910;if(SceneManager['_scene'][_0x11c8cc(0x3a1)]===Scene_Debug)return![];return VisuMZ[_0x11c8cc(0x1cb)]['includes'](_0xd32eeb);},DataManager[_0x2d0910(0x237)]=function(_0x136fd9){const _0x5f568c=_0x2d0910;if(SceneManager[_0x5f568c(0x389)][_0x5f568c(0x3a1)]===Scene_Debug)return![];return VisuMZ[_0x5f568c(0x322)][_0x5f568c(0x495)](_0x136fd9);},DataManager[_0x2d0910(0x373)]=function(_0x4a8e2a){const _0x55570d=_0x2d0910;if(SceneManager[_0x55570d(0x389)][_0x55570d(0x3a1)]===Scene_Debug)return![];return VisuMZ[_0x55570d(0x5b7)][_0x55570d(0x495)](_0x4a8e2a);},DataManager['isMapSwitch']=function(_0x2da51d){const _0x125c03=_0x2d0910;if(BattleManager[_0x125c03(0x5d5)]())return![];return VisuMZ[_0x125c03(0x4a9)][_0x125c03(0x495)](_0x2da51d);},DataManager['isMapVariable']=function(_0x27328d){const _0x1ea068=_0x2d0910;if(BattleManager['isBattleTest']())return![];return VisuMZ['MapVariables'][_0x1ea068(0x495)](_0x27328d);},VisuMZ['EventsMoveCore']['Game_Temp_setDestination']=Game_Temp[_0x2d0910(0x3c7)][_0x2d0910(0x27d)],Game_Temp[_0x2d0910(0x3c7)]['setDestination']=function(_0x58e5fd,_0x402118){const _0x505e23=_0x2d0910;if(this[_0x505e23(0x629)](_0x58e5fd,_0x402118))return;VisuMZ[_0x505e23(0x1f1)][_0x505e23(0x2c7)]['call'](this,_0x58e5fd,_0x402118);},Game_Temp[_0x2d0910(0x3c7)]['isEventClickTriggered']=function(_0x12b92a,_0x143134){const _0x3cd2d1=_0x2d0910,_0x3f1d3f=$gameMap[_0x3cd2d1(0x5ce)](_0x12b92a,_0x143134);for(const _0x48b7a8 of _0x3f1d3f){if(_0x48b7a8&&_0x48b7a8[_0x3cd2d1(0x496)]())return _0x48b7a8[_0x3cd2d1(0x48b)](),!![];}return![];},Game_Temp['prototype'][_0x2d0910(0x3b1)]=function(_0x32a21d){const _0x26a92a=_0x2d0910;this[_0x26a92a(0x5cc)]=_0x32a21d;},Game_Temp[_0x2d0910(0x3c7)][_0x2d0910(0x2f6)]=function(){const _0x565470=_0x2d0910;return this[_0x565470(0x5cc)];},Game_Temp['prototype'][_0x2d0910(0x559)]=function(_0xd9a338){this['_selfTarget']=_0xd9a338;},Game_Temp[_0x2d0910(0x3c7)][_0x2d0910(0x21d)]=function(){const _0x1369d3=_0x2d0910;this[_0x1369d3(0x58b)]=undefined;},Game_Temp['prototype'][_0x2d0910(0x578)]=function(){const _0xef2dd=_0x2d0910;return this[_0xef2dd(0x58b)];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x586)]=Game_System['prototype'][_0x2d0910(0x51c)],Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x51c)]=function(){const _0x2d281d=_0x2d0910;VisuMZ[_0x2d281d(0x1f1)][_0x2d281d(0x586)][_0x2d281d(0x5a1)](this),this[_0x2d281d(0x2d4)](),this[_0x2d281d(0x5ad)]();},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x2d4)]=function(){const _0xf5fdda=_0x2d0910;this[_0xf5fdda(0x1f2)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0xf5fdda(0x537)]={},this[_0xf5fdda(0x650)]=[],this[_0xf5fdda(0x591)]={},this[_0xf5fdda(0x321)]={},this[_0xf5fdda(0x301)]=![],this[_0xf5fdda(0x320)]=_0xf5fdda(0x5d2);},Game_System['prototype'][_0x2d0910(0x1f6)]=function(){const _0x3202a=_0x2d0910;if(this[_0x3202a(0x1f2)]===undefined)this[_0x3202a(0x2d4)]();if(this['_EventsMoveCoreSettings'][_0x3202a(0x1f9)]===undefined)this[_0x3202a(0x2d4)]();return this['_EventsMoveCoreSettings']['DashingEnable'];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x649)]=function(_0x53f9d5){const _0x548126=_0x2d0910;if(this[_0x548126(0x1f2)]===undefined)this[_0x548126(0x2d4)]();if(this[_0x548126(0x1f2)]['DashingEnable']===undefined)this[_0x548126(0x2d4)]();this[_0x548126(0x1f2)][_0x548126(0x1f9)]=_0x53f9d5;},Game_System['prototype'][_0x2d0910(0x484)]=function(){const _0x570801=_0x2d0910;if(this[_0x570801(0x1f2)]===undefined)this[_0x570801(0x2d4)]();if(this['_EventsMoveCoreSettings'][_0x570801(0x450)]===undefined)this[_0x570801(0x2d4)]();return this[_0x570801(0x1f2)][_0x570801(0x450)];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x2d5)]=function(_0x206f15){const _0x21811e=_0x2d0910;if(this[_0x21811e(0x1f2)]===undefined)this[_0x21811e(0x2d4)]();if(this[_0x21811e(0x1f2)][_0x21811e(0x450)]===undefined)this[_0x21811e(0x2d4)]();this[_0x21811e(0x1f2)][_0x21811e(0x450)]=_0x206f15;},Game_System['prototype'][_0x2d0910(0x207)]=function(){const _0x2abda2=_0x2d0910;if(this[_0x2abda2(0x1f2)]===undefined)this['initEventsMoveCore']();if(this[_0x2abda2(0x1f2)]['VisibleEventLabels']===undefined)this[_0x2abda2(0x2d4)]();return this[_0x2abda2(0x1f2)][_0x2abda2(0x460)];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x30f)]=function(_0x17169f){const _0x4374ae=_0x2d0910;if(this[_0x4374ae(0x1f2)]===undefined)this[_0x4374ae(0x2d4)]();if(this[_0x4374ae(0x1f2)]['VisibleEventLabels']===undefined)this[_0x4374ae(0x2d4)]();this[_0x4374ae(0x1f2)][_0x4374ae(0x460)]=_0x17169f;},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x423)]=function(){const _0x36c7d1=_0x2d0910;return this[_0x36c7d1(0x301)]===undefined&&(this[_0x36c7d1(0x301)]=![]),this[_0x36c7d1(0x301)];},Game_System[_0x2d0910(0x3c7)]['setPlayerControlDisable']=function(_0x2f1bfe){this['_DisablePlayerControl']=_0x2f1bfe;},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x395)]=function(){const _0x121f02=_0x2d0910;return this[_0x121f02(0x320)];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x27a)]=function(_0x57e773){const _0x12c424=_0x2d0910;this[_0x12c424(0x320)]=String(_0x57e773)['toLowerCase']()[_0x12c424(0x61f)]();},Game_System['prototype'][_0x2d0910(0x1e8)]=function(_0xf759e4){const _0x2300a2=_0x2d0910;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();if(!_0xf759e4)return null;if(_0xf759e4===$gamePlayer)return this[_0x2300a2(0x537)][_0x2300a2(0x291)];else{const _0x5cebd5=VisuMZ[_0x2300a2(0x1f1)][_0x2300a2(0x48d)],_0x3c59ba=_0x2300a2(0x68e)[_0x2300a2(0x1cf)](_0xf759e4['_mapId'],_0xf759e4[_0x2300a2(0x4b1)]);return this['_EventIcons'][_0x3c59ba]=this[_0x2300a2(0x537)][_0x3c59ba]||{'iconIndex':0x0,'bufferX':_0x5cebd5[_0x2300a2(0x4ab)][_0x2300a2(0x5ed)],'bufferY':_0x5cebd5[_0x2300a2(0x4ab)][_0x2300a2(0x1bb)],'blendMode':_0x5cebd5[_0x2300a2(0x4ab)][_0x2300a2(0x2d9)]},this[_0x2300a2(0x537)][_0x3c59ba];}},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x52a)]=function(_0x5486f9,_0x5700e0,_0x144a02,_0x5ebf7a,_0x541bd3){const _0x23af22=_0x2d0910;if(this[_0x23af22(0x537)]===undefined)this[_0x23af22(0x2d4)]();const _0x7e3ed=_0x5486f9===$gamePlayer?_0x23af22(0x291):_0x23af22(0x68e)[_0x23af22(0x1cf)](_0x5486f9['_mapId'],_0x5486f9[_0x23af22(0x4b1)]);this[_0x23af22(0x537)][_0x7e3ed]={'iconIndex':_0x5700e0,'bufferX':_0x144a02,'bufferY':_0x5ebf7a,'blendMode':_0x541bd3};},Game_System['prototype'][_0x2d0910(0x69d)]=function(_0x22cf5f,_0x5ce256,_0x43f581,_0x5e2b7d,_0x391fbc,_0x3dad38){const _0x217d99=_0x2d0910;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x1defa2=_0x217d99(0x68e)[_0x217d99(0x1cf)](_0x22cf5f,_0x5ce256);this[_0x217d99(0x537)][_0x1defa2]={'iconIndex':_0x43f581,'bufferX':_0x5e2b7d,'bufferY':_0x391fbc,'blendMode':_0x3dad38};},Game_System['prototype'][_0x2d0910(0x65d)]=function(_0x2ba31c){const _0x34eff9=_0x2d0910;if(this['_EventIcons']===undefined)this[_0x34eff9(0x2d4)]();if(!_0x2ba31c)return null;_0x2ba31c===$gamePlayer?delete this[_0x34eff9(0x537)][_0x34eff9(0x291)]:this[_0x34eff9(0x328)](_0x2ba31c[_0x34eff9(0x555)],_0x2ba31c['_eventId']);},Game_System[_0x2d0910(0x3c7)]['deleteIconsOnEventsDataKey']=function(_0x137f5e,_0x42361e){const _0x2077b6=_0x2d0910;if(this[_0x2077b6(0x537)]===undefined)this[_0x2077b6(0x2d4)]();const _0x5315c6=_0x2077b6(0x68e)[_0x2077b6(0x1cf)](_0x137f5e,_0x42361e);delete this[_0x2077b6(0x537)][_0x5315c6];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x378)]=function(_0x20c42){const _0x8d6b0=_0x2d0910;if(this[_0x8d6b0(0x321)]===undefined)this[_0x8d6b0(0x2d4)]();if(!_0x20c42)return null;const _0x2806c8='Map%1-Event%2'[_0x8d6b0(0x1cf)](_0x20c42[_0x8d6b0(0x555)],_0x20c42[_0x8d6b0(0x4b1)]);return this[_0x8d6b0(0x321)][_0x2806c8];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x575)]=function(_0x2142c3){const _0x837ad9=_0x2d0910;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x2142c3)return;const _0x5d9d2a=_0x837ad9(0x68e)[_0x837ad9(0x1cf)](_0x2142c3[_0x837ad9(0x555)],_0x2142c3['_eventId']);this['_SavedEventLocations'][_0x5d9d2a]={'direction':_0x2142c3[_0x837ad9(0x462)](),'x':Math[_0x837ad9(0x66a)](_0x2142c3['x']),'y':Math[_0x837ad9(0x66a)](_0x2142c3['y']),'pageIndex':_0x2142c3[_0x837ad9(0x34a)],'moveRouteIndex':_0x2142c3[_0x837ad9(0x2d3)]};},Game_System['prototype'][_0x2d0910(0x4aa)]=function(_0x510e92){const _0x3ee9e2=_0x2d0910;if(this[_0x3ee9e2(0x321)]===undefined)this[_0x3ee9e2(0x2d4)]();if(!_0x510e92)return;this[_0x3ee9e2(0x5b6)](_0x510e92[_0x3ee9e2(0x555)],_0x510e92[_0x3ee9e2(0x4b1)]);},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x5b6)]=function(_0x255ff6,_0x2e188f){const _0x43355c=_0x2d0910;if(this['_SavedEventLocations']===undefined)this[_0x43355c(0x2d4)]();const _0x4a4cc6=_0x43355c(0x68e)[_0x43355c(0x1cf)](_0x255ff6,_0x2e188f);delete this[_0x43355c(0x321)][_0x4a4cc6];},Game_System[_0x2d0910(0x3c7)]['createSaveEventLocationData']=function(_0x548e76,_0x351ea4,_0x71ffe4,_0x378fc7,_0xc75f69,_0x7c2737,_0x542971){const _0x289b47=_0x2d0910;if(this[_0x289b47(0x321)]===undefined)this['initEventsMoveCore']();const _0x2dcdca='Map%1-Event%2'[_0x289b47(0x1cf)](_0x548e76,_0x351ea4);this[_0x289b47(0x321)][_0x2dcdca]={'direction':_0xc75f69,'x':Math['round'](_0x71ffe4),'y':Math['round'](_0x378fc7),'pageIndex':_0x7c2737,'moveRouteIndex':_0x542971};},Game_System['prototype'][_0x2d0910(0x2db)]=function(_0x84caff){const _0x416e89=_0x2d0910;if(this[_0x416e89(0x591)]===undefined)this['initEventsMoveCore']();if(!_0x84caff)return;const _0x2ff576='Map%1-Event%2'[_0x416e89(0x1cf)](_0x84caff['_mapId'],_0x84caff['_eventId']);return this['_PreservedEventMorphData'][_0x2ff576];},Game_System['prototype']['savePreservedMorphEventDataKey']=function(_0x11bf03,_0x4c7f95,_0x173897,_0x19c40a,_0x2c4827){const _0x4152bf=_0x2d0910;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x13bbdc=_0x4152bf(0x68e)[_0x4152bf(0x1cf)](_0x11bf03,_0x4c7f95);this[_0x4152bf(0x591)][_0x13bbdc]={'template':_0x173897,'mapId':_0x19c40a,'eventId':_0x2c4827};},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x235)]=function(_0x107334,_0x8d5d0){const _0x243d94=_0x2d0910;if(this['_PreservedEventMorphData']===undefined)this[_0x243d94(0x2d4)]();const _0x2425a8=_0x243d94(0x68e)[_0x243d94(0x1cf)](_0x107334,_0x8d5d0);delete this['_PreservedEventMorphData'][_0x2425a8];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x55c)]=function(_0x2c659f){const _0x3d363e=_0x2d0910;if(this[_0x3d363e(0x650)]===undefined)this[_0x3d363e(0x2d4)]();return this[_0x3d363e(0x650)][_0x2c659f]=this[_0x3d363e(0x650)][_0x2c659f]||[],this[_0x3d363e(0x650)][_0x2c659f];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x59b)]=function(_0xe0b223){const _0x1e745d=_0x2d0910,_0x1586ae=this[_0x1e745d(0x55c)](_0xe0b223);for(const _0x387577 of _0x1586ae){if('RdfAy'!==_0x1e745d(0x40b)){if(!_0x387577)continue;if(_0x387577['_spawnPreserved'])continue;const _0x366a90=_0x1586ae['indexOf'](_0x387577);_0x1586ae[_0x366a90]=null;}else{let _0x78110a=this['_moveSpeed'];return this[_0x1e745d(0x61c)]()&&(_0x78110a+=this[_0x1e745d(0x64e)]()),this[_0x1e745d(0x5eb)](_0x78110a);}}},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x5ad)]=function(){const _0x68182=_0x2d0910;this['_followerControlID']=0x0,this[_0x68182(0x695)]=![];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x57c)]=function(){const _0x5e35bc=_0x2d0910;if(this['_followerControlID']===undefined)this[_0x5e35bc(0x5ad)]();return this[_0x5e35bc(0x438)];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x666)]=function(_0x5f4558){const _0x18e9af=_0x2d0910;if(this['_followerControlID']===undefined)this[_0x18e9af(0x5ad)]();this['_followerControlID']=_0x5f4558;;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3e7)]=Game_Interpreter['prototype'][_0x2d0910(0x56e)],Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x56e)]=function(_0xfa2705){const _0xf6da1e=_0x2d0910;if(!$gameParty[_0xf6da1e(0x3bf)]()&&_0xfa2705<0x0){if('dDvOO'===_0xf6da1e(0x362)){const _0x3fd1c6=_0x3d3b84,_0x424652=_0x654279[_0xf6da1e(0x5e0)];if(_0x30cb4f[_0xf6da1e(0x213)]===_0x3fd1c6[_0xf6da1e(0x676)]){let _0x444eba=_0x56da5e[_0xf6da1e(0x5e0)][0x0];_0x444eba=this[_0xf6da1e(0x2f1)](_0x444eba),_0x444eba=this[_0xf6da1e(0x239)](_0x444eba),this[_0xf6da1e(0x2ea)](_0x1845b0,_0x444eba);}else _0xef36c7['EventsMoveCore']['Game_Character_processMoveCommand'][_0xf6da1e(0x5a1)](this,_0xffff60);}else{let _0x1454ad=$gameSystem[_0xf6da1e(0x57c)]();if(_0x1454ad>0x0){if(_0xf6da1e(0x2d1)==='MwuBl')return $gamePlayer[_0xf6da1e(0x5b3)]()[_0xf6da1e(0x5a0)](_0x1454ad-0x1);else{const _0x304bac=this[_0xf6da1e(0x455)],_0x5174dd=this['_randomHomeY'];return this['turnAwayFromPoint'](_0x304bac,_0x5174dd);}}}}return VisuMZ[_0xf6da1e(0x1f1)]['Game_Interpreter_character'][_0xf6da1e(0x5a1)](this,_0xfa2705);},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x2e1)]=function(){const _0x51b0d8=_0x2d0910;if(this[_0x51b0d8(0x695)]===undefined)this[_0x51b0d8(0x5ad)]();return this[_0x51b0d8(0x695)];},Game_System[_0x2d0910(0x3c7)][_0x2d0910(0x2fb)]=function(_0xf4b3d2){const _0xf4a452=_0x2d0910;if(this[_0xf4a452(0x695)]===undefined)this[_0xf4a452(0x5ad)]();this[_0xf4a452(0x695)]=_0xf4b3d2;;},VisuMZ['EventsMoveCore'][_0x2d0910(0x573)]=Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x51c)],Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x51c)]=function(){const _0x5a1b42=_0x2d0910;VisuMZ[_0x5a1b42(0x1f1)][_0x5a1b42(0x573)][_0x5a1b42(0x5a1)](this),this[_0x5a1b42(0x2d4)]();},Game_Timer['prototype'][_0x2d0910(0x2d4)]=function(){const _0x149b95=_0x2d0910;this[_0x149b95(0x4b7)]=![],this['_speed']=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer['prototype']['update']=function(_0x5ed380){const _0x3e38=_0x2d0910;if(!_0x5ed380)return;if(!this['_working'])return;if(this['_paused'])return;if(this['_frames']<=0x0)return;if(this[_0x3e38(0x3c1)]===undefined)this[_0x3e38(0x2d4)]();this[_0x3e38(0x551)]+=this[_0x3e38(0x3c1)],this[_0x3e38(0x551)]<=0x0&&this[_0x3e38(0x44f)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2a1)]=Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x605)],Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x605)]=function(_0x3bff91){const _0x2f9fc6=_0x2d0910;VisuMZ[_0x2f9fc6(0x1f1)][_0x2f9fc6(0x2a1)]['call'](this,_0x3bff91);if(this['_paused']===undefined)this[_0x2f9fc6(0x2d4)]();this[_0x2f9fc6(0x4b7)]=![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x421)]=Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x628)],Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x628)]=function(){const _0x564427=_0x2d0910;VisuMZ['EventsMoveCore'][_0x564427(0x421)][_0x564427(0x5a1)](this);if(this[_0x564427(0x4b7)]===undefined)this[_0x564427(0x2d4)]();this[_0x564427(0x4b7)]=![];},Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x388)]=function(){const _0x3456a2=_0x2d0910;if(this['_frames']<=0x0)return;this[_0x3456a2(0x4b7)]=!![],this['_working']=!![];},Game_Timer[_0x2d0910(0x3c7)]['resume']=function(){const _0x1f577e=_0x2d0910;if(this[_0x1f577e(0x551)]<=0x0)return;this[_0x1f577e(0x4b7)]=![],this['_working']=!![];},Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x38b)]=function(_0x16481b){const _0x5513fe=_0x2d0910;this[_0x5513fe(0x551)]=this[_0x5513fe(0x551)]||0x0,this[_0x5513fe(0x551)]+=_0x16481b,this[_0x5513fe(0x3e1)]=!![],this[_0x5513fe(0x551)]=Math[_0x5513fe(0x674)](0x1,this[_0x5513fe(0x551)]);},Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x64c)]=function(_0x159275){const _0x466cf9=_0x2d0910;this[_0x466cf9(0x551)]=this[_0x466cf9(0x551)]||0x0,this[_0x466cf9(0x551)]=_0x159275,this[_0x466cf9(0x3e1)]=!![],this[_0x466cf9(0x551)]=Math[_0x466cf9(0x674)](0x1,this[_0x466cf9(0x551)]);},Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x491)]=function(_0xb22ef7){const _0x254d2c=_0x2d0910;this[_0x254d2c(0x3c1)]=_0xb22ef7,this[_0x254d2c(0x3e1)]=!![],_0xb22ef7>0x0&&(this['_frames']=Math[_0x254d2c(0x674)](this['_frames'],0x1));},Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x40d)]=function(_0x3b419f){const _0x10631f=_0x2d0910;if(this[_0x10631f(0x384)]===undefined)this[_0x10631f(0x2d4)]();this[_0x10631f(0x384)]=_0x3b419f;},VisuMZ[_0x2d0910(0x1f1)]['Game_Timer_onExpire']=Game_Timer[_0x2d0910(0x3c7)]['onExpire'],Game_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x44f)]=function(){const _0x1e8cef=_0x2d0910;if(this[_0x1e8cef(0x384)]===undefined)this[_0x1e8cef(0x2d4)]();this['_expireCommonEvent']?'pRDzc'===_0x1e8cef(0x600)?this['createLabelWindowForTarget'](_0x5115ba):$gameTemp[_0x1e8cef(0x3bc)](this['_expireCommonEvent']):VisuMZ[_0x1e8cef(0x1f1)][_0x1e8cef(0x44b)][_0x1e8cef(0x5a1)](this);},VisuMZ[_0x2d0910(0x1f1)]['Game_Message_add']=Game_Message[_0x2d0910(0x3c7)][_0x2d0910(0x266)],Game_Message[_0x2d0910(0x3c7)][_0x2d0910(0x266)]=function(_0x3f74b4){const _0x4fc479=_0x2d0910;VisuMZ[_0x4fc479(0x1f1)][_0x4fc479(0x5b4)]['call'](this,_0x3f74b4),this['_selfEvent']=$gameTemp[_0x4fc479(0x578)]();},Game_Message['prototype'][_0x2d0910(0x4c2)]=function(){const _0x216e45=_0x2d0910;$gameTemp[_0x216e45(0x559)](this[_0x216e45(0x2ff)]);},VisuMZ[_0x2d0910(0x1f1)]['Game_Switches_value']=Game_Switches[_0x2d0910(0x3c7)][_0x2d0910(0x420)],Game_Switches[_0x2d0910(0x3c7)][_0x2d0910(0x420)]=function(_0x3f8811){const _0x59a4b1=_0x2d0910;if(DataManager[_0x59a4b1(0x5f3)](_0x3f8811)){if(_0x59a4b1(0x68c)===_0x59a4b1(0x370))this[_0x59a4b1(0x280)][_0x59a4b1(0x69e)]()!==this[_0x59a4b1(0x3d2)]&&(this[_0x59a4b1(0x3d2)]=this[_0x59a4b1(0x280)][_0x59a4b1(0x69e)](),this[_0x59a4b1(0x5fd)]());else return!!this['advancedValue'](_0x3f8811);}else{if(DataManager[_0x59a4b1(0x237)](_0x3f8811))return!!this[_0x59a4b1(0x445)](_0x3f8811);else{if(DataManager[_0x59a4b1(0x663)](_0x3f8811)){if(_0x59a4b1(0x33d)==='jjhWf'){this[_0x59a4b1(0x268)](),this[_0x59a4b1(0x3c5)][_0x59a4b1(0x241)]();const _0x307c3c=this['_text'][_0x59a4b1(0x643)](/[\r\n]+/);let _0x94bbd0=0x0;for(const _0x2eb068 of _0x307c3c){const _0x50e937=this[_0x59a4b1(0x504)](_0x2eb068),_0x1eaa26=_0x57db6b['floor']((this[_0x59a4b1(0x1b7)]-_0x50e937[_0x59a4b1(0x697)])/0x2);this['drawTextEx'](_0x2eb068,_0x1eaa26,_0x94bbd0),_0x94bbd0+=_0x50e937[_0x59a4b1(0x288)];}}else return!!this['mapValue'](_0x3f8811);}else return VisuMZ[_0x59a4b1(0x1f1)][_0x59a4b1(0x515)][_0x59a4b1(0x5a1)](this,_0x3f8811);}}},Game_Switches[_0x2d0910(0x50a)]={},Game_Switches[_0x2d0910(0x3c7)][_0x2d0910(0x5dd)]=function(_0x364b30){const _0xb54933=_0x2d0910;if(!Game_Switches[_0xb54933(0x50a)][_0x364b30]){$dataSystem[_0xb54933(0x69a)][_0x364b30][_0xb54933(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x32b95f=_0xb54933(0x3be)['format'](String(RegExp['$1']));Game_Switches[_0xb54933(0x50a)][_0x364b30]=new Function(_0xb54933(0x519),_0x32b95f);}const _0x3b3aab=$gameTemp[_0xb54933(0x578)]()||this;return Game_Switches[_0xb54933(0x50a)][_0x364b30]['call'](_0x3b3aab,_0x364b30);},Game_Switches[_0x2d0910(0x3c7)][_0x2d0910(0x445)]=function(_0x407b4a){const _0x320dc0=_0x2d0910,_0x232ea2=$gameTemp[_0x320dc0(0x578)]()||this;if(_0x232ea2[_0x320dc0(0x3a1)]!==Game_Event){if(_0x320dc0(0x39d)===_0x320dc0(0x355)){_0x55172b[_0x320dc0(0x672)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x23ae02=_0x1558d1(_0x58b568['$1'])[_0x320dc0(0x2b6)]()[_0x320dc0(0x61f)](),_0x29d23a=_0x485010(_0x430cfc['$2'])[_0x320dc0(0x2b6)]()['trim']();const _0xcbb9d1=_0x6212f0[_0x320dc0(0x36d)]('['+_0x42e0a8['$3']['match'](/\d+/g)+']');_0x23ae02=_0x23ae02['charAt'](0x0)['toUpperCase']()+_0x23ae02[_0x320dc0(0x2ef)](0x1),_0x29d23a=_0x29d23a[_0x320dc0(0x547)](0x0)['toUpperCase']()+_0x29d23a[_0x320dc0(0x2ef)](0x1);const _0x4b5f8b='%1%2'[_0x320dc0(0x1cf)](_0x23ae02,_0x29d23a);if(_0x4f7528[_0x4b5f8b])_0x22d004[_0x4b5f8b]=_0x1e5597[_0x4b5f8b][_0x320dc0(0x500)](_0xcbb9d1);}else return VisuMZ[_0x320dc0(0x1f1)][_0x320dc0(0x515)][_0x320dc0(0x5a1)](this,_0x407b4a);}else{if(_0x320dc0(0x4c0)===_0x320dc0(0x451)){const _0x296136=_0x4d4553['_spawnData']['mapId'],_0x2d5e5e=_0x7b90c3[_0x320dc0(0x40f)][_0x320dc0(0x550)];return _0x12ac1a[_0x320dc0(0x646)](_0x296136,_0x2d5e5e);}else{const _0x30c179=[_0x232ea2['_mapId'],_0x232ea2[_0x320dc0(0x4b1)],_0x320dc0(0x54d)[_0x320dc0(0x1cf)](_0x407b4a)];return $gameSelfSwitches['value'](_0x30c179);}}},Game_Switches[_0x2d0910(0x3c7)]['mapValue']=function(_0x3cca86){const _0xcf4185=_0x2d0910,_0x203fc8=$gameMap?$gameMap[_0xcf4185(0x1c1)]():0x0,_0x4fe2d3=[0x0,0x0,_0xcf4185(0x2b2)['format'](_0x203fc8,_0x3cca86)];return $gameSelfSwitches['value'](_0x4fe2d3);},VisuMZ['EventsMoveCore']['Game_Switches_setValue']=Game_Switches[_0x2d0910(0x3c7)][_0x2d0910(0x3a3)],Game_Switches['prototype'][_0x2d0910(0x3a3)]=function(_0x1187af,_0x4fa929){const _0x3632ca=_0x2d0910;if(DataManager[_0x3632ca(0x237)](_0x1187af)){if(_0x3632ca(0x612)===_0x3632ca(0x594))return!!this[_0x3632ca(0x52d)];else this[_0x3632ca(0x50f)](_0x1187af,_0x4fa929);}else DataManager[_0x3632ca(0x663)](_0x1187af)?this[_0x3632ca(0x4b0)](_0x1187af,_0x4fa929):'gGELt'!==_0x3632ca(0x534)?VisuMZ[_0x3632ca(0x1f1)][_0x3632ca(0x648)][_0x3632ca(0x5a1)](this,_0x1187af,_0x4fa929):this[_0x3632ca(0x26c)][_0x3632ca(0x5a2)]=_0x104734(_0x218975['$1']);},Game_Switches['prototype'][_0x2d0910(0x50f)]=function(_0x38512d,_0x1167b9){const _0x3882b9=_0x2d0910,_0x3a2882=$gameTemp['getSelfTarget']()||this;if(_0x3a2882[_0x3882b9(0x3a1)]!==Game_Event)VisuMZ['EventsMoveCore']['Game_Switches_setValue'][_0x3882b9(0x5a1)](this,_0x38512d,_0x1167b9);else{const _0x5a6433=[_0x3a2882[_0x3882b9(0x555)],_0x3a2882[_0x3882b9(0x4b1)],_0x3882b9(0x54d)['format'](_0x38512d)];$gameSelfSwitches[_0x3882b9(0x3a3)](_0x5a6433,_0x1167b9);}},Game_Switches['prototype'][_0x2d0910(0x4b0)]=function(_0x6c078f,_0xd76595){const _0x45a17e=_0x2d0910,_0x4b6499=$gameMap?$gameMap[_0x45a17e(0x1c1)]():0x0,_0x389cd2=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x45a17e(0x1cf)](_0x4b6499,_0x6c078f)];return $gameSelfSwitches[_0x45a17e(0x3a3)](_0x389cd2,_0xd76595);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x53d)]=Game_Variables[_0x2d0910(0x3c7)]['value'],Game_Variables[_0x2d0910(0x3c7)]['value']=function(_0x598cb7){const _0x342c22=_0x2d0910;if(DataManager[_0x342c22(0x3ad)](_0x598cb7))return _0x342c22(0x610)===_0x342c22(0x51e)?_0x2acfca['EventsMoveCore'][_0x342c22(0x5aa)][_0x342c22(0x5a1)](this,_0x4eda42):this[_0x342c22(0x5dd)](_0x598cb7);else{if(DataManager[_0x342c22(0x373)](_0x598cb7))return this['selfValue'](_0x598cb7);else return DataManager[_0x342c22(0x224)](_0x598cb7)?this['mapValue'](_0x598cb7):VisuMZ[_0x342c22(0x1f1)][_0x342c22(0x53d)][_0x342c22(0x5a1)](this,_0x598cb7);}},Game_Variables[_0x2d0910(0x50a)]={},Game_Variables['prototype'][_0x2d0910(0x5dd)]=function(_0x1b143e){const _0x28fe1c=_0x2d0910;if(!Game_Variables['advancedFunc'][_0x1b143e]){if(_0x28fe1c(0x542)===_0x28fe1c(0x4dd))_0x263425=_0x4fcb56;else{$dataSystem[_0x28fe1c(0x5d0)][_0x1b143e][_0x28fe1c(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x25e35c=_0x28fe1c(0x3be)[_0x28fe1c(0x1cf)](String(RegExp['$1']));Game_Variables[_0x28fe1c(0x50a)][_0x1b143e]=new Function(_0x28fe1c(0x54f),_0x25e35c);}}const _0xe74d35=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x28fe1c(0x50a)][_0x1b143e][_0x28fe1c(0x5a1)](_0xe74d35,_0x1b143e);},Game_Variables[_0x2d0910(0x3c7)][_0x2d0910(0x445)]=function(_0x6b8238){const _0x3e8d0a=_0x2d0910,_0x57a55d=$gameTemp['getSelfTarget']()||this;if(_0x57a55d[_0x3e8d0a(0x3a1)]!==Game_Event){if(_0x3e8d0a(0x1fe)===_0x3e8d0a(0x1e7)){if(this[_0x3e8d0a(0x321)]===_0x1a0c1f)this[_0x3e8d0a(0x2d4)]();if(!_0x2995d0)return;const _0x2accdf=_0x3e8d0a(0x68e)[_0x3e8d0a(0x1cf)](_0x115319[_0x3e8d0a(0x555)],_0x34d847[_0x3e8d0a(0x4b1)]);this[_0x3e8d0a(0x321)][_0x2accdf]={'direction':_0x3af3be['direction'](),'x':_0x49c688[_0x3e8d0a(0x66a)](_0x20dbb8['x']),'y':_0x5cabfe[_0x3e8d0a(0x66a)](_0xa08ce2['y']),'pageIndex':_0x4c2126[_0x3e8d0a(0x34a)],'moveRouteIndex':_0x309506[_0x3e8d0a(0x2d3)]};}else return VisuMZ[_0x3e8d0a(0x1f1)][_0x3e8d0a(0x53d)]['call'](this,_0x6b8238);}else{const _0x3be00b=[_0x57a55d[_0x3e8d0a(0x555)],_0x57a55d[_0x3e8d0a(0x4b1)],_0x3e8d0a(0x682)[_0x3e8d0a(0x1cf)](_0x6b8238)];return $gameSelfSwitches['value'](_0x3be00b);}},Game_Variables[_0x2d0910(0x3c7)][_0x2d0910(0x3d5)]=function(_0x43e918){const _0x46c03f=_0x2d0910,_0x49f425=$gameMap?$gameMap[_0x46c03f(0x1c1)]():0x0,_0x4e3d0a=[0x0,0x0,_0x46c03f(0x478)['format'](_0x49f425,_0x43e918)];return $gameSelfSwitches[_0x46c03f(0x420)](_0x4e3d0a)||0x0;},VisuMZ['EventsMoveCore'][_0x2d0910(0x54a)]=Game_Variables['prototype'][_0x2d0910(0x3a3)],Game_Variables[_0x2d0910(0x3c7)][_0x2d0910(0x3a3)]=function(_0x1142a1,_0x41d946){const _0x1958ba=_0x2d0910;if(DataManager[_0x1958ba(0x373)](_0x1142a1)){if(_0x1958ba(0x1fd)===_0x1958ba(0x306)){if([0x2,0x4,0x6,0x8][_0x1958ba(0x495)](_0xfadade))return 0x4;if([0x1,0x3,0x7,0x9][_0x1958ba(0x495)](_0x47e47c))return 0x5;}else this[_0x1958ba(0x50f)](_0x1142a1,_0x41d946);}else{if(DataManager['isMapVariable'](_0x1142a1)){if(_0x1958ba(0x47b)===_0x1958ba(0x47b))this[_0x1958ba(0x4b0)](_0x1142a1,_0x41d946);else{_0x47d09b[_0x1958ba(0x1c2)](_0x4affcc,_0x57fc7f);const _0x449df8=_0x1731b4[_0x1958ba(0x2f6)]();_0x3de480['MapId']=_0x399bdb[_0x1958ba(0x4ce)]||_0x20c08a[_0x1958ba(0x1c1)]();const _0x5bd626=[_0x5a7c38['MapId'],_0x511dba[_0x1958ba(0x46b)]||_0x449df8[_0x1958ba(0x550)](),'Self\x20Variable\x20%1'[_0x1958ba(0x1cf)](_0x4d607e['VariableId'])],_0x63c7ca=_0x371fd5[_0x1958ba(0x699)],_0x584c2a=_0x3bb03e[_0x1958ba(0x420)](_0x5bd626)||![];_0x2d5db5[_0x1958ba(0x3a3)](_0x63c7ca,_0x584c2a);}}else VisuMZ[_0x1958ba(0x1f1)]['Game_Variables_setValue'][_0x1958ba(0x5a1)](this,_0x1142a1,_0x41d946);}},Game_Variables[_0x2d0910(0x3c7)][_0x2d0910(0x50f)]=function(_0x41f0d1,_0x1767cd){const _0x3732b1=_0x2d0910,_0x4069e0=$gameTemp[_0x3732b1(0x578)]()||this;if(_0x4069e0[_0x3732b1(0x3a1)]!==Game_Event)VisuMZ[_0x3732b1(0x1f1)]['Game_Variables_setValue'][_0x3732b1(0x5a1)](this,_0x41f0d1,_0x1767cd);else{const _0x38391a=[_0x4069e0[_0x3732b1(0x555)],_0x4069e0[_0x3732b1(0x4b1)],_0x3732b1(0x682)[_0x3732b1(0x1cf)](_0x41f0d1)];$gameSelfSwitches[_0x3732b1(0x3a3)](_0x38391a,_0x1767cd);}},Game_Variables[_0x2d0910(0x3c7)][_0x2d0910(0x4b0)]=function(_0xd257da,_0x225fc3){const _0x48c0cd=_0x2d0910,_0x432a42=$gameMap?$gameMap['mapId']():0x0,_0x2e661f=[0x0,0x0,_0x48c0cd(0x478)[_0x48c0cd(0x1cf)](_0x432a42,_0xd257da)];$gameSelfSwitches[_0x48c0cd(0x3a3)](_0x2e661f,_0x225fc3);},VisuMZ['EventsMoveCore'][_0x2d0910(0x483)]=Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x420)],Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x420)]=function(_0x312c46){const _0x4babcf=_0x2d0910;if(_0x312c46[0x2][_0x4babcf(0x672)](/(?:SELF|MAP)/i))return _0x4babcf(0x46e)!==_0x4babcf(0x46e)?_0x32a618[_0x4babcf(0x3b6)](this[_0x4babcf(0x4b1)])&&_0x27c6dd[_0x4babcf(0x1f1)]['CustomPageConditions'][_0x4babcf(0x5d1)](_0x47da0f[_0x4babcf(0x308)],this['_eventId']):this[_0x4babcf(0x445)](_0x312c46);else{return VisuMZ[_0x4babcf(0x1f1)][_0x4babcf(0x483)]['call'](this,_0x312c46);;}},Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x445)]=function(_0x5eabac){const _0x4b0804=_0x2d0910;return _0x5eabac[0x2][_0x4b0804(0x672)](/VAR/i)?this[_0x4b0804(0x690)][_0x5eabac]||0x0:!!this[_0x4b0804(0x690)][_0x5eabac];},VisuMZ[_0x2d0910(0x1f1)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x3a3)],Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x3a3)]=function(_0x55bf9d,_0x1e77bd){const _0x18b481=_0x2d0910;if(_0x55bf9d[0x2][_0x18b481(0x672)](/(?:SELF|MAP)/i)){if(_0x18b481(0x2f5)!==_0x18b481(0x2f5)){if(_0x41f182)_0xafcb7a[_0x18b481(0x6a0)](![]);}else this[_0x18b481(0x50f)](_0x55bf9d,_0x1e77bd);}else VisuMZ[_0x18b481(0x1f1)][_0x18b481(0x2fa)][_0x18b481(0x5a1)](this,_0x55bf9d,_0x1e77bd);},Game_SelfSwitches[_0x2d0910(0x3c7)][_0x2d0910(0x50f)]=function(_0x1dff5c,_0x515e01){const _0x49426c=_0x2d0910;this['_data'][_0x1dff5c]=_0x1dff5c[0x2][_0x49426c(0x672)](/VAR/i)?_0x515e01:!!_0x515e01,this[_0x49426c(0x3bb)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x428)]=Game_Enemy[_0x2d0910(0x3c7)]['meetsSwitchCondition'],Game_Enemy[_0x2d0910(0x3c7)][_0x2d0910(0x24c)]=function(_0x378e7f){const _0x4cd138=_0x2d0910;$gameTemp[_0x4cd138(0x559)](this);const _0x3be3a6=VisuMZ[_0x4cd138(0x1f1)][_0x4cd138(0x428)][_0x4cd138(0x5a1)](this,_0x378e7f);return $gameTemp[_0x4cd138(0x21d)](),_0x3be3a6;},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop[_0x2d0910(0x3c7)][_0x2d0910(0x265)],Game_Troop['prototype']['meetsConditions']=function(_0x1666f1){const _0x3f700=_0x2d0910;$gameTemp[_0x3f700(0x559)](this);const _0x30cfc7=VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions'][_0x3f700(0x5a1)](this,_0x1666f1);return $gameTemp[_0x3f700(0x21d)](),_0x30cfc7;},VisuMZ['EventsMoveCore'][_0x2d0910(0x57e)]=Game_Map['prototype'][_0x2d0910(0x39c)],Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x39c)]=function(_0x504908){const _0xaabe73=_0x2d0910;this[_0xaabe73(0x59b)](_0x504908),this[_0xaabe73(0x403)](),VisuMZ[_0xaabe73(0x1f1)][_0xaabe73(0x57e)][_0xaabe73(0x5a1)](this,_0x504908),this[_0xaabe73(0x403)](),this[_0xaabe73(0x5b1)](),this['setupRegionRestrictions'](),this['setupSaveEventLocations'](),this[_0xaabe73(0x2e4)](),this[_0xaabe73(0x2b0)](),this[_0xaabe73(0x5de)](),this[_0xaabe73(0x403)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x38c)]=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x3f3)],Game_Map['prototype'][_0x2d0910(0x3f3)]=function(){const _0x1b9f28=_0x2d0910;VisuMZ['EventsMoveCore'][_0x1b9f28(0x38c)][_0x1b9f28(0x5a1)](this),this[_0x1b9f28(0x1c7)]();},Game_Map[_0x2d0910(0x2d6)]=0xc8,Game_Map[_0x2d0910(0x3c7)]['determineEventOverload']=function(){const _0x357235=_0x2d0910,_0x441263=Game_Map['_eventOverloadThreshold'];this[_0x357235(0x5c7)]=this[_0x357235(0x42d)]()[_0x357235(0x290)]>_0x441263;if(this[_0x357235(0x5c7)]&&$gameTemp[_0x357235(0x5a4)]()){}},Game_Map['prototype'][_0x2d0910(0x353)]=function(){const _0x4e2eac=_0x2d0910;return this[_0x4e2eac(0x5c7)];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x403)]=function(){const _0x2a9e71=_0x2d0910;this[_0x2a9e71(0x453)]=undefined;},Game_Map[_0x2d0910(0x3c7)]['setupDiagonalSupport']=function(){const _0x341985=_0x2d0910;this['_diagonalSupport']=VisuMZ[_0x341985(0x1f1)]['Settings'][_0x341985(0x4a0)][_0x341985(0x34c)];const _0x59d64c=$dataMap[_0x341985(0x571)]||'';if(_0x59d64c[_0x341985(0x672)](/<DIAGONAL MOVEMENT: ON>/i)){if(_0x341985(0x2c4)!==_0x341985(0x2c4))return this[_0x341985(0x464)](0x4,_0x16abe3(_0x4855e8['$1']));else this[_0x341985(0x4fe)]=!![];}else _0x59d64c['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x341985(0x4fe)]=![]);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x44a)]=function(){const _0x1136a5=_0x2d0910,_0x155b31=$gameSystem[_0x1136a5(0x395)]();if(_0x155b31===_0x1136a5(0x526))return!![];if(_0x155b31===_0x1136a5(0x639))return![];if(this[_0x1136a5(0x4fe)]===undefined)this[_0x1136a5(0x5b1)]();return this[_0x1136a5(0x4fe)];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x49d)]=function(_0xf71410,_0x2a5761){const _0x1ccbbc=_0x2d0910;if([0x1,0x4,0x7][_0x1ccbbc(0x495)](_0x2a5761))_0xf71410-=0x1;if([0x3,0x6,0x9][_0x1ccbbc(0x495)](_0x2a5761))_0xf71410+=0x1;return this['roundX'](_0xf71410);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x53b)]=function(_0x3f7c2e,_0x25697a){const _0x143326=_0x2d0910;if([0x1,0x2,0x3][_0x143326(0x495)](_0x25697a))_0x3f7c2e+=0x1;if([0x7,0x8,0x9][_0x143326(0x495)](_0x25697a))_0x3f7c2e-=0x1;return this[_0x143326(0x2dd)](_0x3f7c2e);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x3dc)]=function(_0x4604c0,_0x18760f,_0x19f9c1,_0x556346){const _0x24d5e7=_0x2d0910;return Math[_0x24d5e7(0x674)](Math['abs'](this[_0x24d5e7(0x5c0)](_0x4604c0,_0x19f9c1)),Math[_0x24d5e7(0x23a)](this[_0x24d5e7(0x2d2)](_0x18760f,_0x556346)));},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x5ca)]=function(){const _0x30f1bc=_0x2d0910,_0x28c93a=VisuMZ[_0x30f1bc(0x1f1)][_0x30f1bc(0x48d)][_0x30f1bc(0x264)],_0x163f5e={},_0x4cee5f=[_0x30f1bc(0x563),_0x30f1bc(0x47f),'Dock'],_0x58e365=[_0x30f1bc(0x232),_0x30f1bc(0x2b8),_0x30f1bc(0x291),_0x30f1bc(0x5e6),_0x30f1bc(0x5cd),_0x30f1bc(0x3d1),_0x30f1bc(0x2a0),_0x30f1bc(0x312)];for(const _0x316cb7 of _0x4cee5f){for(const _0x3944d5 of _0x58e365){if('zNZYk'!==_0x30f1bc(0x402)){const _0x4690ab=_0x30f1bc(0x65e)['format'](_0x3944d5,_0x316cb7);_0x28c93a[_0x4690ab]&&(_0x163f5e[_0x4690ab]=_0x28c93a[_0x4690ab][_0x30f1bc(0x2ef)](0x0));}else{if(_0x15f963[_0x30f1bc(0x637)]())return!![];return this['_saveEventLocation'];}}}const _0x3cbfcb=$dataMap['note']||'',_0x259ac1=_0x3cbfcb[_0x30f1bc(0x672)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x259ac1){if(_0x30f1bc(0x476)==='DYBMX'){const _0x14a337=_0x16f998(_0x2f32f9['$1']),_0x1a3946=_0x5b5005(_0x561934['$2']),_0x2e2a6d=this[_0x30f1bc(0x63b)](_0x52a05e);return this['processMoveRouteMoveTo'](_0x14a337,_0x1a3946,_0x2e2a6d);}else for(const _0x50c1f4 of _0x259ac1){_0x50c1f4[_0x30f1bc(0x672)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x51657e=String(RegExp['$1'])[_0x30f1bc(0x2b6)]()[_0x30f1bc(0x61f)](),_0x3e7d4d=String(RegExp['$2'])[_0x30f1bc(0x2b6)]()[_0x30f1bc(0x61f)]();const _0x50c79e=JSON[_0x30f1bc(0x36d)]('['+RegExp['$3'][_0x30f1bc(0x672)](/\d+/g)+']');_0x51657e=_0x51657e[_0x30f1bc(0x547)](0x0)[_0x30f1bc(0x3ea)]()+_0x51657e[_0x30f1bc(0x2ef)](0x1),_0x3e7d4d=_0x3e7d4d['charAt'](0x0)['toUpperCase']()+_0x3e7d4d[_0x30f1bc(0x2ef)](0x1);const _0x58a287='%1%2'[_0x30f1bc(0x1cf)](_0x51657e,_0x3e7d4d);if(_0x163f5e[_0x58a287])_0x163f5e[_0x58a287]=_0x163f5e[_0x58a287]['concat'](_0x50c79e);}}this[_0x30f1bc(0x211)]=_0x163f5e;},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x219)]=function(_0x52ad76,_0x3f2dc2,_0x55c39f,_0x265d47){const _0x2d078d=_0x2d0910,_0x55c871=this[_0x2d078d(0x49d)](_0x52ad76,_0x55c39f),_0x13b7d5=this[_0x2d078d(0x53b)](_0x3f2dc2,_0x55c39f),_0x17be3a=this['regionId'](_0x55c871,_0x13b7d5),_0x229bfc=this[_0x2d078d(0x211)];if(_0x229bfc[_0x2d078d(0x208)][_0x2d078d(0x495)](_0x17be3a)){if('rmktd'==='rmktd')return!![];else _0x385d3e=this[_0x2d078d(0x32d)](_0xd0b3c5,_0x562831);}else{if(_0x265d47===_0x2d078d(0x2bb))return _0x2d078d(0x1ea)==='qmhGH'?_0x229bfc[_0x2d078d(0x346)]['includes'](_0x17be3a)||_0x229bfc[_0x2d078d(0x5d9)][_0x2d078d(0x495)](_0x17be3a):_0x3fec6a[_0x2d078d(0x346)][_0x2d078d(0x495)](_0x3c61d0)||_0x2f00fa['WalkAllow'][_0x2d078d(0x495)](_0x37d0d8);else{if(_0x265d47===_0x2d078d(0x3b6)){if(_0x2d078d(0x602)!=='OhRau')this[_0x2d078d(0x58b)]=_0x3ea868;else return _0x229bfc[_0x2d078d(0x29f)][_0x2d078d(0x495)](_0x17be3a)||_0x229bfc[_0x2d078d(0x5d9)][_0x2d078d(0x495)](_0x17be3a);}else{if(_0x229bfc[_0x2d078d(0x4ef)]['includes'](_0x17be3a))return!![];else{if('LTLub'===_0x2d078d(0x698)){const _0x2eab64=_0x521616[_0x2d078d(0x2db)](this);if(!_0x2eab64)return;const _0x3ec86f=_0x2eab64[_0x2d078d(0x3df)]['toUpperCase']()[_0x2d078d(0x61f)]();_0x3ec86f!==_0x2d078d(0x5df)?this[_0x2d078d(0x29e)](_0x3ec86f,!![]):this[_0x2d078d(0x5bd)](_0x2eab64[_0x2d078d(0x1c1)],_0x2eab64[_0x2d078d(0x550)],!![]);}else{const _0x469e17=_0x2d078d(0x50e)[_0x2d078d(0x1cf)](_0x265d47[_0x2d078d(0x547)](0x0)[_0x2d078d(0x3ea)]()+_0x265d47[_0x2d078d(0x2ef)](0x1));if(_0x229bfc[_0x469e17])return _0x229bfc[_0x469e17][_0x2d078d(0x495)](_0x17be3a);}}}}}return![];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x21b)]=function(_0x522986,_0x268e25,_0x477197,_0x55d372){const _0x322189=_0x2d0910,_0x38f513=this[_0x322189(0x49d)](_0x522986,_0x477197),_0x59bd4b=this[_0x322189(0x53b)](_0x268e25,_0x477197),_0x3d3bea=this[_0x322189(0x63a)](_0x38f513,_0x59bd4b),_0x178b48=this[_0x322189(0x211)];if(_0x178b48['AllForbid'][_0x322189(0x495)](_0x3d3bea))return!![];else{if(_0x55d372===_0x322189(0x2bb))return _0x178b48['PlayerForbid'][_0x322189(0x495)](_0x3d3bea)||_0x178b48[_0x322189(0x217)]['includes'](_0x3d3bea);else{if(_0x55d372==='event'){if(_0x322189(0x624)===_0x322189(0x624))return _0x178b48[_0x322189(0x2c1)]['includes'](_0x3d3bea)||_0x178b48['WalkForbid'][_0x322189(0x495)](_0x3d3bea);else _0x2f5811[_0x7f5593]?(_0x1a2d22['PreloadedMaps'][_0x52b316]=_0x1f560c[_0x29a613],_0x515fa7[_0x1c789b]=_0x573419):_0x2a10dc(this[_0x322189(0x1d3)][_0x322189(0x20b)](this,_0x410d11,_0x5e5995),0x64);}else{if(_0x178b48[_0x322189(0x414)]['includes'](_0x3d3bea)){if(_0x322189(0x3c2)===_0x322189(0x3c2))return!![];else{for(let _0x16378a=0x1;_0x16378a<_0x5afa8d[_0x322189(0x69a)][_0x322189(0x290)];_0x16378a++){if(_0x2900af[_0x322189(0x69a)][_0x16378a]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x1a0f8f[_0x322189(0x31f)][_0x322189(0x3eb)](_0x16378a);if(_0x19e024['switches'][_0x16378a]['match'](/<SELF>/i))_0x6df832[_0x322189(0x322)]['push'](_0x16378a);if(_0x39f556[_0x322189(0x69a)][_0x16378a][_0x322189(0x672)](/<MAP>/i))_0x2bc221['MapSwitches'][_0x322189(0x3eb)](_0x16378a);}for(let _0x47dfe5=0x1;_0x47dfe5<_0x3bc9f2[_0x322189(0x5d0)][_0x322189(0x290)];_0x47dfe5++){if(_0x4c74d5[_0x322189(0x5d0)][_0x47dfe5][_0x322189(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x46d7f7[_0x322189(0x1cb)][_0x322189(0x3eb)](_0x47dfe5);if(_0x1b8d1b[_0x322189(0x5d0)][_0x47dfe5][_0x322189(0x672)](/<SELF>/i))_0x3503fa[_0x322189(0x5b7)][_0x322189(0x3eb)](_0x47dfe5);if(_0x3e5f78[_0x322189(0x5d0)][_0x47dfe5][_0x322189(0x672)](/<MAP>/i))_0x2df91b[_0x322189(0x657)][_0x322189(0x3eb)](_0x47dfe5);}}}else{if(_0x322189(0x5af)!==_0x322189(0x5c3)){const _0x3bc166='%1Forbid'[_0x322189(0x1cf)](_0x55d372[_0x322189(0x547)](0x0)[_0x322189(0x3ea)]()+_0x55d372[_0x322189(0x2ef)](0x1));if(_0x178b48[_0x3bc166])return _0x178b48[_0x3bc166][_0x322189(0x495)](_0x3d3bea);}else{if(!_0xc5f32c[_0x322189(0x50a)][_0x12290a]){_0x5bd7d0[_0x322189(0x5d0)][_0x1a8523]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2dcaad=_0x322189(0x3be)[_0x322189(0x1cf)](_0x2989ba(_0x2d2578['$1']));_0x3d6588[_0x322189(0x50a)][_0x453da1]=new _0x3de642(_0x322189(0x54f),_0x2dcaad);}const _0x2c3543=_0x46ba57[_0x322189(0x578)]()||this;return _0x35912a[_0x322189(0x50a)][_0x2a205f][_0x322189(0x5a1)](_0x2c3543,_0x4c08ed);}}}}}return![];},Game_Map[_0x2d0910(0x3c7)]['isRegionDockable']=function(_0x24ce78,_0x2337a2,_0x14a658,_0x5874f9){const _0x4ea414=_0x2d0910;_0x14a658=_0x5874f9===_0x4ea414(0x5fb)?0x5:_0x14a658;const _0x43595a=this[_0x4ea414(0x49d)](_0x24ce78,_0x14a658),_0x37564d=this[_0x4ea414(0x53b)](_0x2337a2,_0x14a658),_0x6973d1=this[_0x4ea414(0x63a)](_0x43595a,_0x37564d),_0x55c13b=this[_0x4ea414(0x211)];if(_0x55c13b['VehicleDock'][_0x4ea414(0x495)](_0x6973d1))return!![];else{const _0x48e2d2=_0x4ea414(0x1fc)[_0x4ea414(0x1cf)](_0x5874f9['charAt'](0x0)['toUpperCase']()+_0x5874f9[_0x4ea414(0x2ef)](0x1));if(_0x55c13b[_0x48e2d2])return _0x55c13b[_0x48e2d2][_0x4ea414(0x495)](_0x6973d1);}return![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x4d5)]=Game_Map['prototype'][_0x2d0910(0x5fd)],Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x5fd)]=function(){const _0x397f9f=_0x2d0910;VisuMZ[_0x397f9f(0x1f1)][_0x397f9f(0x4d5)][_0x397f9f(0x5a1)](this),this[_0x397f9f(0x23f)]();},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x23f)]=function(){const _0x194fe4=_0x2d0910;this[_0x194fe4(0x58f)]=![];if(this[_0x194fe4(0x42d)]()[_0x194fe4(0x1da)](_0x159949=>_0x159949[_0x194fe4(0x254)]())){if(_0x194fe4(0x53e)===_0x194fe4(0x5c8))this[_0x194fe4(0x453)]=_0x2b464e;else{this[_0x194fe4(0x58f)]=!![];return;}}if(this['events']()[_0x194fe4(0x1da)](_0x5bc967=>_0x5bc967[_0x194fe4(0x330)]())){if(_0x194fe4(0x5a9)!==_0x194fe4(0x5a9)){let _0x25ce5b=this[_0x194fe4(0x4f5)]['direction']();if(this['_character'][_0x194fe4(0x5cb)]){if(_0x25ce5b===0x4)_0x25ce5b=0x6;else _0x25ce5b===0x6&&(_0x25ce5b=0x4);}return(_0x25ce5b-0x2)/0x2;}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x194fe4(0x4c3)][_0x194fe4(0x1da)](_0x206892=>_0x206892[_0x194fe4(0x254)]())){this[_0x194fe4(0x58f)]=!![];return;}if(this['_commonEvents'][_0x194fe4(0x1da)](_0x4b8445=>_0x4b8445[_0x194fe4(0x330)]())){if(_0x194fe4(0x668)===_0x194fe4(0x5e9))this['scale']['x']=0x1/_0x3892c5[_0x194fe4(0x307)](),this[_0x194fe4(0x40e)]['y']=0x1/_0x3fbe55[_0x194fe4(0x307)](),this[_0x194fe4(0x4ad)]=_0x4dbc2c[_0x194fe4(0x307)]();else{this[_0x194fe4(0x58f)]=!![];return;}}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x539)]=Game_Map['prototype'][_0x2d0910(0x68b)],Game_Map[_0x2d0910(0x3c7)]['update']=function(_0xff6eca){const _0x3344f5=_0x2d0910;this[_0x3344f5(0x350)](),VisuMZ[_0x3344f5(0x1f1)][_0x3344f5(0x539)][_0x3344f5(0x5a1)](this,_0xff6eca);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x350)]=function(){const _0x543bf7=_0x2d0910;if(!this['_needsPeriodicRefresh'])return;this[_0x543bf7(0x59f)]=this[_0x543bf7(0x59f)]||0x3c,this[_0x543bf7(0x59f)]--,this[_0x543bf7(0x59f)]<=0x0&&(_0x543bf7(0x1eb)!==_0x543bf7(0x1eb)?_0x3cf4b3[_0x543bf7(0x470)]([this],_0x546afa):(this[_0x543bf7(0x2f4)](),this[_0x543bf7(0x59f)]=0x3c));},VisuMZ[_0x2d0910(0x1f1)]['Game_Map_isDashDisabled']=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x3c0)],Game_Map['prototype']['isDashDisabled']=function(){const _0x2dec0f=_0x2d0910;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x2dec0f(0x1f1)][_0x2dec0f(0x41f)][_0x2dec0f(0x5a1)](this);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x363)]=function(){const _0x4a46d8=_0x2d0910;this[_0x4a46d8(0x33a)]=![];const _0x579e82=$dataMap['note']||'';_0x579e82['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x637)]=function(){const _0x10f98a=_0x2d0910;if(this[_0x10f98a(0x33a)]===undefined)this[_0x10f98a(0x363)]();return this[_0x10f98a(0x33a)];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x59b)]=function(_0x5b74a1){const _0x96f29b=_0x2d0910;if(_0x5b74a1!==this['mapId']()&&$gamePlayer){if(_0x96f29b(0x32a)===_0x96f29b(0x32a))$gameSystem[_0x96f29b(0x59b)](this[_0x96f29b(0x1c1)]());else{const _0x1d9b71=this[_0x96f29b(0x482)](_0x2c0270),_0x18e7d9=this[_0x96f29b(0x43c)](_0x575e4a);}}},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2e4)]=function(){const _0x1309e8=_0x2d0910;this[_0x1309e8(0x635)]=$gameSystem[_0x1309e8(0x55c)](this['mapId']()),this[_0x1309e8(0x36e)]=!![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2f7)]=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x42d)],Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x42d)]=function(){const _0x25a83e=_0x2d0910;if(this[_0x25a83e(0x453)])return this[_0x25a83e(0x453)];const _0x21e04a=VisuMZ[_0x25a83e(0x1f1)][_0x25a83e(0x2f7)]['call'](this),_0x7d78fb=_0x21e04a['concat'](this['_spawnedEvents']||[]);return this[_0x25a83e(0x453)]=_0x7d78fb[_0x25a83e(0x2cc)](_0x4ec498=>!!_0x4ec498),this[_0x25a83e(0x453)];},VisuMZ[_0x2d0910(0x1f1)]['Game_Map_event']=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x3b6)],Game_Map[_0x2d0910(0x3c7)]['event']=function(_0xefca29){const _0x1cdb56=_0x2d0910;if(_0xefca29>=0x3e8){if('BSnOO'===_0x1cdb56(0x463)){const _0x4a3e41=_0x15b2f2[_0x1cdb56(0x3b6)](_0x55b21a[_0x1cdb56(0x3fd)]||_0x17ace7[_0x1cdb56(0x550)]());if(!_0x4a3e41)return;_0x58bea5[_0x1cdb56(0x2c8)]!==_0x1cdb56(0x5df)?_0x4a3e41[_0x1cdb56(0x29e)](_0x511575[_0x1cdb56(0x2c8)]):_0x4a3e41[_0x1cdb56(0x5bd)](_0x5c24c6[_0x1cdb56(0x2f3)],_0x3fb733[_0x1cdb56(0x396)]||_0x19e8a5[_0x1cdb56(0x550)]());}else return _0xefca29-=0x3e8,this['_spawnedEvents'][_0xefca29];}else return VisuMZ[_0x1cdb56(0x1f1)]['Game_Map_event']['call'](this,_0xefca29);},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x4be)]=function(_0x49090d){const _0x581dcf=_0x2d0910,_0x4c24e9=this[_0x581dcf(0x3b6)](_0x49090d);if(_0x4c24e9)_0x4c24e9[_0x581dcf(0x4e6)]();},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x357)]=function(){const _0x9e6446=_0x2d0910,_0x32c79d={'template':_0x9e6446(0x23b),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x9e6446(0x635)][_0x9e6446(0x290)]+0x3e8};this[_0x9e6446(0x383)](_0x32c79d);},Game_Map[_0x2d0910(0x3c7)]['checkExistingEntitiesAt']=function(_0x16a84d,_0x3e1d33){const _0x519b13=_0x2d0910;if(this[_0x519b13(0x5ce)](_0x16a84d,_0x3e1d33)[_0x519b13(0x290)]>0x0)return!![];if($gamePlayer['x']===_0x16a84d&&$gamePlayer['y']===_0x3e1d33)return!![];if(this[_0x519b13(0x67e)]()[_0x519b13(0x67b)](_0x16a84d,_0x3e1d33))return!![];if(this[_0x519b13(0x4ba)]()[_0x519b13(0x67b)](_0x16a84d,_0x3e1d33))return!![];return![];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x4fb)]=function(_0x19d214,_0x40552e,_0x1c29d2){const _0x503e9b=_0x2d0910;$gameTemp[_0x503e9b(0x40f)]=_0x19d214;const _0x107116=new Game_Event(_0x19d214[_0x503e9b(0x1c1)],_0x19d214['eventId']);$gameTemp[_0x503e9b(0x40f)]=undefined,_0x107116[_0x503e9b(0x5fd)]();let _0x54ba19=_0x40552e-_0x107116[_0x503e9b(0x5ea)][_0x503e9b(0x309)],_0x23ad3d=_0x40552e+_0x107116[_0x503e9b(0x5ea)][_0x503e9b(0x309)],_0x5cafdf=_0x1c29d2-_0x107116[_0x503e9b(0x5ea)]['up'],_0x2d84c3=_0x1c29d2+_0x107116[_0x503e9b(0x5ea)][_0x503e9b(0x218)];for(let _0x542b2b=_0x54ba19;_0x542b2b<=_0x23ad3d;_0x542b2b++){if(_0x503e9b(0x252)===_0x503e9b(0x252))for(let _0x573851=_0x5cafdf;_0x573851<=_0x2d84c3;_0x573851++){if(this[_0x503e9b(0x62e)](_0x542b2b,_0x573851))return![];}else{let _0x36dee8=0x0;if(_0x31c6b2)_0x21bdf9['_moveAllowPlayerCollision']=!![];_0x3bb443[_0x503e9b(0x44a)]()?_0x36dee8=this[_0x503e9b(0x32d)](_0x2fedb3,_0xd13aa2):_0x36dee8=this['findDirectionTo'](_0x34ccb7,_0xb74bcc);if(_0x34b155)_0x215160[_0x503e9b(0x62b)]=![];this['executeMoveDir8'](_0x36dee8),this[_0x503e9b(0x27b)](!![]);}}return!![];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x383)]=function(_0x35d44b){const _0x2f8eb2=_0x2d0910;$gameTemp[_0x2f8eb2(0x40f)]=_0x35d44b;const _0xa9f2af=new Game_Event(_0x35d44b[_0x2f8eb2(0x1c1)],_0x35d44b[_0x2f8eb2(0x550)]);$gameTemp[_0x2f8eb2(0x40f)]=undefined,this[_0x2f8eb2(0x635)]['push'](_0xa9f2af),_0xa9f2af['setupSpawn'](_0x35d44b),this[_0x2f8eb2(0x403)]();},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2cd)]=function(_0xca6074,_0x2d50bc,_0x231f62){const _0x223b83=_0x2d0910,_0x4387b9=_0xca6074[_0x223b83(0x3df)][_0x223b83(0x3ea)]()[_0x223b83(0x61f)]();if(_0x4387b9!==_0x223b83(0x5df)){const _0x2efdb5=VisuMZ[_0x223b83(0x5a8)][_0x4387b9];if(_0x2efdb5){if(_0x223b83(0x47e)===_0x223b83(0x313)){const _0x8376a1=_0x3387ae[_0x223b83(0x378)](this);if(!_0x8376a1)return;this[_0x223b83(0x40a)](_0x8376a1['x'],_0x8376a1['y']),this[_0x223b83(0x2ca)](_0x8376a1[_0x223b83(0x462)]),this[_0x223b83(0x34a)]===_0x8376a1[_0x223b83(0x2df)]&&(this[_0x223b83(0x2d3)]=_0x8376a1[_0x223b83(0x538)]);}else _0xca6074[_0x223b83(0x1c1)]=_0x2efdb5[_0x223b83(0x435)],_0xca6074['eventId']=_0x2efdb5[_0x223b83(0x3d8)];}}const _0x51ded0=_0xca6074['x'],_0x44e11c=_0xca6074['y'];if(!this[_0x223b83(0x452)](_0x51ded0,_0x44e11c))return![];if(_0x2d50bc){if('tzTjZ'!=='TrkgW'){if(this[_0x223b83(0x62e)](_0x51ded0,_0x44e11c))return![];if(!this[_0x223b83(0x4fb)](_0xca6074,_0x51ded0,_0x44e11c))return![];}else return this['characterPatternYBasic']();}if(_0x231f62){if(!this['isPassableByAnyDirection'](_0x51ded0,_0x44e11c))return![];}return this[_0x223b83(0x383)](_0xca6074),!![];},Game_Map[_0x2d0910(0x3c7)]['prepareSpawnedEventAtRegion']=function(_0x55a11b,_0x385eba,_0xc5b21b,_0x56fd57){const _0x5f3f68=_0x2d0910,_0x333f5e=[],_0x4aa083=this[_0x5f3f68(0x697)](),_0x4f373f=this['height']();for(let _0x2f2ac1=0x0;_0x2f2ac1<_0x4aa083;_0x2f2ac1++){for(let _0x10cfd4=0x0;_0x10cfd4<_0x4f373f;_0x10cfd4++){if(!_0x385eba['includes'](this[_0x5f3f68(0x63a)](_0x2f2ac1,_0x10cfd4)))continue;if(!this['isValid'](_0x2f2ac1,_0x10cfd4))continue;if(_0xc5b21b){if(this[_0x5f3f68(0x62e)](_0x2f2ac1,_0x10cfd4))continue;if(!this[_0x5f3f68(0x4fb)](_0x55a11b,_0x2f2ac1,_0x10cfd4))continue;}if(_0x56fd57){if(_0x5f3f68(0x43a)===_0x5f3f68(0x43a)){if(!this[_0x5f3f68(0x691)](_0x2f2ac1,_0x10cfd4))continue;}else return _0x237522>0x0?0x4:0x6;}_0x333f5e[_0x5f3f68(0x3eb)]([_0x2f2ac1,_0x10cfd4]);}}if(_0x333f5e[_0x5f3f68(0x290)]>0x0){const _0x4e43e5=_0x333f5e[Math['randomInt'](_0x333f5e[_0x5f3f68(0x290)])];return _0x55a11b['x']=_0x4e43e5[0x0],_0x55a11b['y']=_0x4e43e5[0x1],this[_0x5f3f68(0x383)](_0x55a11b),!![];}return![];},Game_Map[_0x2d0910(0x3c7)]['prepareSpawnedEventAtTerrainTag']=function(_0x48de7b,_0x5d72ee,_0x2e141f,_0x590454){const _0x9943c=_0x2d0910,_0x2ad855=[],_0x4bf929=this[_0x9943c(0x697)](),_0x11914b=this[_0x9943c(0x288)]();for(let _0x3ccb3e=0x0;_0x3ccb3e<_0x4bf929;_0x3ccb3e++){for(let _0x3e805a=0x0;_0x3e805a<_0x11914b;_0x3e805a++){if('zpMqe'!=='ARQlV'){if(!_0x5d72ee[_0x9943c(0x495)](this['terrainTag'](_0x3ccb3e,_0x3e805a)))continue;if(!this['isValid'](_0x3ccb3e,_0x3e805a))continue;if(_0x2e141f){if(this[_0x9943c(0x62e)](_0x3ccb3e,_0x3e805a))continue;if(!this[_0x9943c(0x4fb)](_0x48de7b,_0x3ccb3e,_0x3e805a))continue;}if(_0x590454){if(!this['isPassableByAnyDirection'](_0x3ccb3e,_0x3e805a))continue;}_0x2ad855['push']([_0x3ccb3e,_0x3e805a]);}else _0x2b5ac7[_0x9943c(0x1f1)][_0x9943c(0x66e)][_0x9943c(0x5a1)](this),_0x251555[_0x9943c(0x276)]&&_0x7de6e2['isPressed'](_0xf625cb[_0x9943c(0x41e)][_0x9943c(0x48d)][_0x9943c(0x1e6)]['FastForwardKey'])&&_0x3f05af[_0x9943c(0x241)]();}}if(_0x2ad855['length']>0x0){if('qSZGY'!==_0x9943c(0x43b)){const _0x23a756=_0x2ad855[Math[_0x9943c(0x44d)](_0x2ad855[_0x9943c(0x290)])];return _0x48de7b['x']=_0x23a756[0x0],_0x48de7b['y']=_0x23a756[0x1],this[_0x9943c(0x383)](_0x48de7b),!![];}else{if(!_0x348f92[_0x9943c(0x302)]())return;_0x2e3d6b['ConvertParams'](_0x1f813d,_0x55f4c0);let _0x1f0163=0x0;_0x1f0163+=_0x33eabd[_0x9943c(0x1d4)],_0x1f0163+=_0x2f4bf7[_0x9943c(0x69b)]*0x3c,_0x1f0163+=_0x45d4a3['Minutes']*0x3c*0x3c,_0x1f0163+=_0x626ac1[_0x9943c(0x5da)]*0x3c*0x3c*0x3c,_0x5a9660['gainFrames'](_0x1f0163);}}return![];},Game_Map[_0x2d0910(0x3c7)]['isPassableByAnyDirection']=function(_0x2c2f18,_0xc97674){const _0x358cb7=_0x2d0910;if(this[_0x358cb7(0x249)](_0x2c2f18,_0xc97674,0x2))return!![];if(this[_0x358cb7(0x249)](_0x2c2f18,_0xc97674,0x4))return!![];if(this[_0x358cb7(0x249)](_0x2c2f18,_0xc97674,0x6))return!![];if(this[_0x358cb7(0x249)](_0x2c2f18,_0xc97674,0x8))return!![];return![];},Game_Map['prototype'][_0x2d0910(0x3ce)]=function(_0x2c0fdc){const _0x159879=_0x2d0910;if(_0x2c0fdc<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x5d3771=this[_0x159879(0x3b6)](_0x2c0fdc);_0x5d3771[_0x159879(0x40a)](-0x1,-0x1),_0x5d3771[_0x159879(0x4e6)](),this[_0x159879(0x635)][_0x2c0fdc-0x3e8]=null,this[_0x159879(0x403)]();},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2a8)]=function(){const _0x5a8203=_0x2d0910;for(const _0x29a4ef of this['_spawnedEvents']){if(_0x5a8203(0x34f)===_0x5a8203(0x34f)){if(_0x29a4ef)return _0x29a4ef;}else return this[_0x5a8203(0x301)]===_0x3dd100&&(this[_0x5a8203(0x301)]=![]),this['_DisablePlayerControl'];}return null;},Game_Map[_0x2d0910(0x3c7)]['firstSpawnedEventID']=function(){const _0x1eb3f0=_0x2d0910,_0x3436ca=this[_0x1eb3f0(0x2a8)]();return _0x3436ca?_0x3436ca[_0x1eb3f0(0x4b1)]:0x0;},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x3fe)]=function(){const _0x259d9c=_0x2d0910,_0x59be3d=this['_spawnedEvents'][_0x259d9c(0x2ef)](0x0)[_0x259d9c(0x568)]();for(const _0x2a6dc8 of _0x59be3d){if(_0x2a6dc8)return _0x2a6dc8;}return null;},Game_Map['prototype'][_0x2d0910(0x549)]=function(){const _0x55ac0a=_0x2d0910,_0x35dace=this[_0x55ac0a(0x3fe)]();return _0x35dace?_0x35dace[_0x55ac0a(0x4b1)]:0x0;},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x354)]=function(_0x85b519,_0x262ae4){const _0x1bcc3e=_0x2d0910,_0x47fd85=this['eventsXy'](_0x85b519,_0x262ae4);for(const _0x26acad of _0x47fd85){if(_0x1bcc3e(0x5f2)!==_0x1bcc3e(0x503)){if(!_0x26acad)continue;if(_0x26acad[_0x1bcc3e(0x680)]())this[_0x1bcc3e(0x3ce)](_0x26acad['_eventId']);}else this[_0x1bcc3e(0x51c)](...arguments);}},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2dc)]=function(_0x5d1f86){const _0x5ef113=_0x2d0910;for(const _0x163158 of this[_0x5ef113(0x635)]){if(!_0x163158)continue;if(_0x5d1f86[_0x5ef113(0x495)](_0x163158[_0x5ef113(0x63a)]())){if(_0x5ef113(0x418)===_0x5ef113(0x418))this['despawnEventId'](_0x163158['_eventId']);else return _0x5ba8d2[_0x5ef113(0x1f1)][_0x5ef113(0x515)][_0x5ef113(0x5a1)](this,_0x149055);}}},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x473)]=function(_0x2c1c4b){const _0x268b7e=_0x2d0910;for(const _0x8913ce of this[_0x268b7e(0x635)]){if(_0x268b7e(0x64f)!==_0x268b7e(0x64f)){const _0xcb0e15=this['_randomHomeX'],_0x127b25=this[_0x268b7e(0x405)];return this[_0x268b7e(0x4ee)](_0xcb0e15,_0x127b25);}else{if(!_0x8913ce)continue;_0x2c1c4b[_0x268b7e(0x495)](_0x8913ce[_0x268b7e(0x67c)]())&&this[_0x268b7e(0x3ce)](_0x8913ce[_0x268b7e(0x4b1)]);}}},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x1d5)]=function(){const _0x56ad18=_0x2d0910;for(const _0x50ef46 of this[_0x56ad18(0x635)]){if(!_0x50ef46)continue;this['despawnEventId'](_0x50ef46[_0x56ad18(0x4b1)]);}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2fe)]=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x468)],Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x468)]=function(_0x1ec6c5){const _0x2a4729=_0x2d0910;VisuMZ[_0x2a4729(0x1f1)]['Game_Map_unlockEvent'][_0x2a4729(0x5a1)](this,_0x1ec6c5);if(_0x1ec6c5>=0x3e8){const _0x577436=this[_0x2a4729(0x3b6)](_0x1ec6c5);if(_0x577436)_0x577436[_0x2a4729(0x632)]();}},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2b0)]=function(){const _0x2dfe8b=_0x2d0910;this[_0x2dfe8b(0x1b8)]=![],this[_0x2dfe8b(0x641)]=![];if(!$dataMap)return;const _0x53abd8=$dataMap[_0x2dfe8b(0x571)]||'';if(_0x53abd8[_0x2dfe8b(0x672)](/<HIDE PLAYER>/i))this[_0x2dfe8b(0x1b8)]=![],this['_forceHidePlayer']=!![];else{if(_0x53abd8[_0x2dfe8b(0x672)](/<SHOW PLAYER>/i)){if('JqFHw'!==_0x2dfe8b(0x33e))this[_0x2dfe8b(0x1b8)]=!![],this[_0x2dfe8b(0x641)]=![];else{_0x52d056[_0x2dfe8b(0x1c2)](_0x956377,_0x501744);const _0x33723e=_0x488a28[_0x2dfe8b(0x2f6)]();_0x38bffc[_0x2dfe8b(0x4ce)]=_0x401481[_0x2dfe8b(0x4ce)]||_0x5a8a41['mapId']();const _0x5201ef=[_0x4f739e[_0x2dfe8b(0x4ce)],_0x5e3208['EventId']||_0x33723e['eventId'](),_0x2dfe8b(0x54d)[_0x2dfe8b(0x1cf)](_0x509b07[_0x2dfe8b(0x675)])],_0x2a405e=_0x21011f['TargetSwitchId'],_0x893a59=_0x54f2ad[_0x2dfe8b(0x420)](_0x5201ef)||![];_0x3c8ee7['setValue'](_0x2a405e,_0x893a59);}}}},Game_Map['prototype'][_0x2d0910(0x49b)]=function(){const _0x5919bb=_0x2d0910;return this['_forceShowPlayer']===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x5919bb(0x1b8)];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x465)]=function(){const _0x24b8e4=_0x2d0910;if(this['_forceHidePlayer']===undefined){if(_0x24b8e4(0x4f2)===_0x24b8e4(0x4f2))this['setupPlayerVisibilityOverrides']();else return this[_0x24b8e4(0x2ca)](0x3);}return this[_0x24b8e4(0x641)];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x401)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x505)]=function(){const _0x50695f=_0x2d0910;if(this===$gamePlayer){if($gameMap[_0x50695f(0x49b)]())return![];if($gameMap[_0x50695f(0x465)]())return!![];}return VisuMZ['EventsMoveCore']['Game_CharacterBase_isTransparent'][_0x50695f(0x5a1)](this);},Game_Map[_0x2d0910(0x3c7)]['setupFollowerVisibilityOverrides']=function(){const _0x3fde48=_0x2d0910;this[_0x3fde48(0x2b4)]=![],this[_0x3fde48(0x24b)]=![];if(!$dataMap)return;const _0x2739ea=$dataMap['note']||'';if(_0x2739ea[_0x3fde48(0x672)](/<HIDE FOLLOWERS>/i)){if(_0x3fde48(0x23e)===_0x3fde48(0x60d)){if(this[_0x3fde48(0x591)]===_0x5e4a12)this[_0x3fde48(0x2d4)]();const _0x1af116='Map%1-Event%2'[_0x3fde48(0x1cf)](_0x35a98d,_0x2bea85);this['_PreservedEventMorphData'][_0x1af116]={'template':_0x2751d7,'mapId':_0x320fb6,'eventId':_0x1a61ff};}else this[_0x3fde48(0x2b4)]=![],this[_0x3fde48(0x24b)]=!![];}else _0x2739ea[_0x3fde48(0x672)](/<SHOW FOLLOWERS>/i)&&(this[_0x3fde48(0x2b4)]=!![],this[_0x3fde48(0x24b)]=![]);},Game_Map[_0x2d0910(0x3c7)]['areFollowersForceShown']=function(){const _0x2be7a1=_0x2d0910;return this[_0x2be7a1(0x2b4)]===undefined&&this[_0x2be7a1(0x5de)](),this[_0x2be7a1(0x2b4)];},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x39b)]=function(){const _0x1dd07c=_0x2d0910;return this[_0x1dd07c(0x24b)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x1dd07c(0x24b)];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x26d)]=Game_Followers[_0x2d0910(0x3c7)][_0x2d0910(0x55d)],Game_Followers['prototype'][_0x2d0910(0x55d)]=function(){const _0x364539=_0x2d0910;if($gameMap['areFollowersForceShown']())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ[_0x364539(0x1f1)][_0x364539(0x26d)]['call'](this);},Game_CommonEvent['prototype'][_0x2d0910(0x254)]=function(){const _0x41fba3=_0x2d0910,_0xd3e91e=this[_0x41fba3(0x3b6)]();return this[_0x41fba3(0x57d)]()&&_0xd3e91e['trigger']>=0x1&&DataManager[_0x41fba3(0x5f3)](_0xd3e91e[_0x41fba3(0x519)]);},Game_CommonEvent['prototype'][_0x2d0910(0x330)]=function(){const _0x32de03=_0x2d0910;return VisuMZ['EventsMoveCore'][_0x32de03(0x2e3)][_0x32de03(0x4c3)]['includes'](this['_commonEventId']);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x42c)]=Game_CommonEvent[_0x2d0910(0x3c7)][_0x2d0910(0x57d)],Game_CommonEvent['prototype'][_0x2d0910(0x57d)]=function(){const _0xd33ecd=_0x2d0910;if(VisuMZ[_0xd33ecd(0x1f1)]['Game_CommonEvent_isActive'][_0xd33ecd(0x5a1)](this)){if('GioWo'!==_0xd33ecd(0x56d))return!![];else{_0x2643e6['Name']=_0x145f54['Name'][_0xd33ecd(0x3ea)]()[_0xd33ecd(0x61f)](),_0x3f7315['EventTemplates'][_0x13453c['Name']]=_0x205a62;if(!_0x2a1c60[_0xd33ecd(0x495)](_0x3e3543['MapID']))_0x3871dc[_0xd33ecd(0x3eb)](_0x2dfb41[_0xd33ecd(0x435)]);}}else return VisuMZ[_0xd33ecd(0x1f1)][_0xd33ecd(0x2e3)][_0xd33ecd(0x5d1)](this[_0xd33ecd(0x3b6)]()[_0xd33ecd(0x308)],this['_commonEventId']);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x28a)]=Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2fd)],Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x2fd)]=function(){const _0x5443e2=_0x2d0910,_0x5c58b8=VisuMZ[_0x5443e2(0x1f1)][_0x5443e2(0x28a)]['call'](this),_0x59474c=VisuMZ[_0x5443e2(0x1f1)][_0x5443e2(0x2e3)][_0x5443e2(0x4c3)][_0x5443e2(0x638)](_0x2a0a7d=>$dataCommonEvents[_0x2a0a7d]);return _0x5c58b8[_0x5443e2(0x500)](_0x59474c)[_0x5443e2(0x2cc)]((_0x1eacc0,_0x30435e,_0x2bed2e)=>_0x2bed2e[_0x5443e2(0x1c9)](_0x1eacc0)===_0x30435e);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3d6)]=Game_CharacterBase[_0x2d0910(0x3c7)]['initMembers'],Game_CharacterBase['prototype'][_0x2d0910(0x60f)]=function(){const _0x1748d1=_0x2d0910;VisuMZ[_0x1748d1(0x1f1)]['Game_CharacterBase_initMembers']['call'](this),this[_0x1748d1(0x345)]();},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x345)]=function(){const _0x42c4e=_0x2d0910;this[_0x42c4e(0x599)]=![],this['clearPose'](),this['clearDashing'](),this[_0x42c4e(0x326)](),this['clearStepPattern']();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x659)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x246)],Game_CharacterBase['prototype'][_0x2d0910(0x246)]=function(){const _0x4e6886=_0x2d0910;let _0x2a484d=VisuMZ[_0x4e6886(0x1f1)][_0x4e6886(0x659)]['call'](this);return _0x2a484d=this['adjustMoveSynchOpacityDelta'](_0x2a484d),_0x2a484d;},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x1f3)]=function(_0x5be4a4){return _0x5be4a4;},Game_CharacterBase[_0x2d0910(0x3c7)]['isSpriteVS8dir']=function(){const _0x31e459=_0x2d0910;if(this['constructor']===Game_Player&&this[_0x31e459(0x359)]()){if(_0x31e459(0x640)!==_0x31e459(0x53a))return this[_0x31e459(0x1df)]()[_0x31e459(0x375)]()['match'](/\[VS8\]/i);else{const _0x5e7bf3=_0x28d5fb[_0x31e459(0x3b6)](_0xe84213(_0xc035d6['$1']));return this[_0x31e459(0x317)](_0x5e7bf3);}}else return Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x31e459(0x296)]()?!![]:this[_0x31e459(0x375)]()[_0x31e459(0x672)](/\[VS8\]/i);},VisuMZ[_0x2d0910(0x1f1)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x462)],Game_CharacterBase[_0x2d0910(0x3c7)]['direction']=function(){const _0x1d8cbe=_0x2d0910;if(!$dataMap)return this['_direction']||0x2;if(this[_0x1d8cbe(0x4bd)]()&&!this[_0x1d8cbe(0x1c5)]()&&this[_0x1d8cbe(0x5cf)]())return _0x1d8cbe(0x5a7)===_0x1d8cbe(0x533)?!![]:this['directionOnLadderSpriteVS8dir']();else{if(this[_0x1d8cbe(0x4bd)]()&&!this['isJumping']())return 0x8;else return this[_0x1d8cbe(0x256)]()&&this['isSpriteVS8dir']()?_0x1d8cbe(0x342)!==_0x1d8cbe(0x342)?this['vehicle']()[_0x1d8cbe(0x60b)](_0x1b36fe,_0x4207ea,_0x9c8ce8):this[_0x1d8cbe(0x415)]():VisuMZ[_0x1d8cbe(0x1f1)][_0x1d8cbe(0x45b)][_0x1d8cbe(0x5a1)](this);}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x369)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x2ca)],Game_CharacterBase['prototype'][_0x2d0910(0x2ca)]=function(_0x4ef4ef){const _0x34ffeb=_0x2d0910;if(!this[_0x34ffeb(0x5cf)]())_0x4ef4ef=this[_0x34ffeb(0x457)](_0x4ef4ef);VisuMZ['EventsMoveCore'][_0x34ffeb(0x369)]['call'](this,_0x4ef4ef);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x457)]=function(_0x1be57a){const _0x57ed1f=_0x2d0910;if(_0x1be57a===0x1)return this[_0x57ed1f(0x251)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x1be57a===0x3)return this[_0x57ed1f(0x251)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x1be57a===0x7)return this[_0x57ed1f(0x251)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x1be57a===0x9)return this[_0x57ed1f(0x251)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x1be57a;},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x424)]=function(_0x3c7267){const _0xf628c0=_0x2d0910;return[0x1,0x3,0x5,0x7,0x9][_0xf628c0(0x495)](_0x3c7267);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x589)]=function(){const _0x238a28=_0x2d0910;return this[_0x238a28(0x38a)]||0x0;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x22f)]=Game_CharacterBase['prototype']['moveStraight'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x497)]=function(_0x5ca373){const _0x10f0c6=_0x2d0910;this[_0x10f0c6(0x38a)]=_0x5ca373,VisuMZ[_0x10f0c6(0x1f1)][_0x10f0c6(0x22f)]['call'](this,_0x5ca373);},Game_CharacterBase['prototype']['executeMoveDir8']=function(_0x57862d){const _0x26d22c=_0x2d0910;if(!this[_0x26d22c(0x424)](_0x57862d))return this['moveStraight'](_0x57862d);let _0x1318d3=0x0,_0x5395c9=0x0;switch(_0x57862d){case 0x1:_0x1318d3=0x4,_0x5395c9=0x2;break;case 0x3:_0x1318d3=0x6,_0x5395c9=0x2;break;case 0x7:_0x1318d3=0x4,_0x5395c9=0x8;break;case 0x9:_0x1318d3=0x6,_0x5395c9=0x8;break;}if(VisuMZ[_0x26d22c(0x1f1)][_0x26d22c(0x48d)]['Movement']['StrictCollision']){if('hjSaw'===_0x26d22c(0x329))this[_0x26d22c(0x5de)]();else{if(!this[_0x26d22c(0x251)](this['_x'],this['_y'],_0x1318d3))return this['moveStraight'](_0x5395c9);if(!this['canPass'](this['_x'],this['_y'],_0x5395c9))return this[_0x26d22c(0x497)](_0x1318d3);if(!this[_0x26d22c(0x365)](this['_x'],this['_y'],_0x1318d3,_0x5395c9)){let _0xe7928c=VisuMZ[_0x26d22c(0x1f1)][_0x26d22c(0x48d)][_0x26d22c(0x4a0)][_0x26d22c(0x37e)]?_0x1318d3:_0x5395c9;return this[_0x26d22c(0x497)](_0xe7928c);}}}this[_0x26d22c(0x38a)]=_0x57862d,this[_0x26d22c(0x4bc)](_0x1318d3,_0x5395c9);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3fb)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x2f9)],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x2f9)]=function(){const _0x7c637d=_0x2d0910;let _0xd2b707=this[_0x7c637d(0x344)];if(this[_0x7c637d(0x61c)]()){if(_0x7c637d(0x446)===_0x7c637d(0x3fc)){if(this[_0x7c637d(0x295)]())this[_0x7c637d(0x246)]+=this[_0x7c637d(0x62d)]();else _0x1b73e5[_0x7c637d(0x389)][_0x7c637d(0x4ff)]>0x0?this[_0x7c637d(0x246)]=0x0:this[_0x7c637d(0x246)]-=this[_0x7c637d(0x62d)]();}else _0xd2b707+=this[_0x7c637d(0x64e)]();}return this[_0x7c637d(0x5eb)](_0xd2b707);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x64e)]=function(){const _0x3a9dc2=_0x2d0910,_0x562354=VisuMZ[_0x3a9dc2(0x1f1)][_0x3a9dc2(0x48d)][_0x3a9dc2(0x4a0)];return _0x562354[_0x3a9dc2(0x275)]!==undefined?_0x3a9dc2(0x43e)!==_0x3a9dc2(0x4fa)?_0x562354[_0x3a9dc2(0x275)]:_0x4ee97d[_0x3a9dc2(0x1f1)]['Game_Variables_value']['call'](this,_0x15792e):VisuMZ[_0x3a9dc2(0x1f1)]['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x3a9dc2(0x344)];},Game_CharacterBase[_0x2d0910(0x3c7)]['adjustDir8MovementSpeed']=function(_0x3a17d3){const _0x2d5311=_0x2d0910,_0x4a7a65=VisuMZ['EventsMoveCore'][_0x2d5311(0x48d)]['Movement'];if(!_0x4a7a65['SlowerSpeed'])return _0x3a17d3;return[0x1,0x3,0x7,0x9][_0x2d5311(0x495)](this[_0x2d5311(0x38a)])&&(_0x3a17d3*=_0x4a7a65[_0x2d5311(0x2e8)]||0.01),_0x3a17d3;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x282)]=Game_CharacterBase[_0x2d0910(0x3c7)]['isDashing'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x61c)]=function(){const _0x4a9c4b=_0x2d0910;if(this['_forceDashing'])return!![];return VisuMZ[_0x4a9c4b(0x1f1)][_0x4a9c4b(0x282)][_0x4a9c4b(0x5a1)](this);},Game_CharacterBase[_0x2d0910(0x3c7)]['isDashingAndMoving']=function(){const _0x48c7fe=_0x2d0910;return this[_0x48c7fe(0x61c)]()&&this[_0x48c7fe(0x4fd)]===0x0;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x242)]=Game_CharacterBase[_0x2d0910(0x3c7)]['pattern'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x498)]=function(){const _0x4823d9=_0x2d0910;if(this[_0x4823d9(0x256)]()){if(_0x4823d9(0x5e2)==='KTAnW')return this['getPosingCharacterPattern']();else _0x4fa875[_0x4823d9(0x1f1)]['CustomPageConditions'][_0x4823d9(0x664)](_0x974ae5);}else{if(_0x4823d9(0x37c)!==_0x4823d9(0x37c))this[_0x4823d9(0x3ce)](_0x2d693f['_eventId']);else return VisuMZ[_0x4823d9(0x1f1)][_0x4823d9(0x242)][_0x4823d9(0x5a1)](this);}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x494)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x4e0)],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x4e0)]=function(){const _0x5b8a33=_0x2d0910;VisuMZ['EventsMoveCore'][_0x5b8a33(0x494)][_0x5b8a33(0x5a1)](this),this[_0x5b8a33(0x404)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x411)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x670)],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x670)]=function(){const _0x21a7aa=_0x2d0910;if(this[_0x21a7aa(0x5cf)]())return this[_0x21a7aa(0x2e7)]();return VisuMZ[_0x21a7aa(0x1f1)]['Game_CharacterBase_characterIndex'][_0x21a7aa(0x5a1)](this);},Game_CharacterBase['prototype'][_0x2d0910(0x2e7)]=function(){const _0x475f92=_0x2d0910,_0x7f4e33=this['direction']();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x475f92(0x495)](_0x7f4e33))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x7f4e33))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x475f92(0x256)]())return this[_0x475f92(0x636)]();else{if(this[_0x475f92(0x408)]){if([0x2,0x4,0x6,0x8]['includes'](_0x7f4e33))return 0x4;if([0x1,0x3,0x7,0x9][_0x475f92(0x495)](_0x7f4e33))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x475f92(0x3a6)]()){if(_0x475f92(0x3b3)!==_0x475f92(0x660)){if([0x2,0x4,0x6,0x8][_0x475f92(0x495)](_0x7f4e33))return 0x4;if([0x1,0x3,0x7,0x9][_0x475f92(0x495)](_0x7f4e33))return 0x5;}else{if(!_0x38311c&&_0x321e35[_0x475f92(0x315)]())return![];if(!_0x459a12&&_0x1c5b27[_0x475f92(0x343)]())return![];if([_0x475f92(0x5a6),_0x475f92(0x29a)][_0x475f92(0x495)](this['activationProximityType']()))return!![];return _0x3f0dbb[_0x475f92(0x5d8)](this);}}else{if(this['isDashingAndMoving']()){if('vEFOg'==='mTZzx')this[_0x475f92(0x243)][_0x475f92(0x40e)]['x']=_0x38c149[_0x475f92(0x46f)](0x1,this[_0x475f92(0x243)]['scale']['x']+0.1),this[_0x475f92(0x243)][_0x475f92(0x40e)]['y']=_0x414a4c[_0x475f92(0x46f)](0x1,this[_0x475f92(0x243)][_0x475f92(0x40e)]['y']+0.1);else{if([0x2,0x4,0x6,0x8][_0x475f92(0x495)](_0x7f4e33))return 0x2;if([0x1,0x3,0x7,0x9][_0x475f92(0x495)](_0x7f4e33))return 0x3;}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x7f4e33))return 0x0;if([0x1,0x3,0x7,0x9][_0x475f92(0x495)](_0x7f4e33))return 0x1;}}}}}}},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x3a6)]=function(){const _0x44bc26=_0x2d0910;return VisuMZ[_0x44bc26(0x1f1)]['Settings'][_0x44bc26(0x2ae)][_0x44bc26(0x4e2)];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x36c)]=function(){const _0x49d68a=_0x2d0910;return this[_0x49d68a(0x4bd)]()&&this['terrainTag']()===VisuMZ[_0x49d68a(0x1f1)][_0x49d68a(0x48d)][_0x49d68a(0x5c9)][_0x49d68a(0x562)];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x63e)]=function(){const _0x6b5f=_0x2d0910;return this[_0x6b5f(0x36c)]()?0x4:'TeaqB'!=='paLmk'?0x2:_0x63dafc[_0x6b5f(0x1f1)][_0x6b5f(0x587)][_0x6b5f(0x5a1)](this)+(this[_0x6b5f(0x61b)]||0x0);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3af)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x68b)],Game_CharacterBase[_0x2d0910(0x3c7)]['update']=function(){const _0x5b1933=_0x2d0910;VisuMZ[_0x5b1933(0x1f1)][_0x5b1933(0x3af)][_0x5b1933(0x5a1)](this),this[_0x5b1933(0x5c1)]();},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x5c1)]=function(){const _0x262671=_0x2d0910;this[_0x262671(0x564)]=this[_0x262671(0x564)]||0x0;if(this['_poseDuration']>0x0){this[_0x262671(0x564)]--;if(this[_0x262671(0x564)]<=0x0&&this[_0x262671(0x432)]!=='ZZZ')this['clearPose']();}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x68d)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x4bc)],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x4bc)]=function(_0x9d7ef4,_0x440962){const _0x37a325=_0x2d0910;VisuMZ[_0x37a325(0x1f1)][_0x37a325(0x68d)][_0x37a325(0x5a1)](this,_0x9d7ef4,_0x440962);if(this[_0x37a325(0x5cf)]())this[_0x37a325(0x3a5)](_0x9d7ef4,_0x440962);},Game_CharacterBase['prototype'][_0x2d0910(0x3a5)]=function(_0xb019,_0x3e18ad){const _0x5709e2=_0x2d0910;if(_0xb019===0x4&&_0x3e18ad===0x2)this['setDirection'](0x1);if(_0xb019===0x6&&_0x3e18ad===0x2)this['setDirection'](0x3);if(_0xb019===0x4&&_0x3e18ad===0x8)this[_0x5709e2(0x2ca)](0x7);if(_0xb019===0x6&&_0x3e18ad===0x8)this[_0x5709e2(0x2ca)](0x9);},VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x684)],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x684)]=function(){const _0x44f60b=_0x2d0910;if(this[_0x44f60b(0x256)]()&&this[_0x44f60b(0x61e)]()===_0x44f60b(0x579))return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']['call'](this);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x580)]=function(_0x4fb8f8,_0x306dd3){const _0x51ace1=_0x2d0910;if(_0x4fb8f8['match'](/Z/i))_0x4fb8f8=_0x51ace1(0x579);if(_0x4fb8f8[_0x51ace1(0x672)](/SLEEP/i))_0x4fb8f8=_0x51ace1(0x579);this[_0x51ace1(0x5cf)]()&&(this[_0x51ace1(0x432)]=_0x4fb8f8[_0x51ace1(0x3ea)]()[_0x51ace1(0x61f)](),this['_poseDuration']=_0x306dd3||Infinity);},Game_CharacterBase['prototype'][_0x2d0910(0x61e)]=function(){const _0x466bb0=_0x2d0910;return this[_0x466bb0(0x5cf)]()?(this[_0x466bb0(0x432)]||'')[_0x466bb0(0x3ea)]()[_0x466bb0(0x61f)]():''['toUpperCase']()[_0x466bb0(0x61f)]();},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x5c4)]=function(_0x63f789,_0xfd2786){const _0x5f426e=_0x2d0910;if(this['isSpriteVS8dir']()){if('yQmmH'===_0x5f426e(0x544))_0x321cd2['x']=_0x265ac0?_0x373062[_0x5f426e(0x5a2)]:0x0,_0x18b47f['y']=_0x17063f?-this['height']+_0x45e684[_0x5f426e(0x382)]:0x0;else{const _0xfa01c0=['',_0x5f426e(0x5bb),_0x5f426e(0x510),_0x5f426e(0x5f6),_0x5f426e(0x2c3),_0x5f426e(0x54e),_0x5f426e(0x397),_0x5f426e(0x569),_0x5f426e(0x406),_0x5f426e(0x552),_0x5f426e(0x579),'','','','',''][_0x63f789];this[_0x5f426e(0x580)](_0xfa01c0,_0xfd2786);}}},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x404)]=function(){const _0x436110=_0x2d0910;this[_0x436110(0x432)]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x256)]=function(){const _0x7a3337=_0x2d0910;return this[_0x7a3337(0x5cf)]()&&!!this[_0x7a3337(0x432)];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x636)]=function(){const _0x33588c=_0x2d0910,_0x2884b6=this[_0x33588c(0x432)]['toUpperCase']();switch(this[_0x33588c(0x432)][_0x33588c(0x3ea)]()[_0x33588c(0x61f)]()){case _0x33588c(0x3cc):case _0x33588c(0x1bd):case'VICTORY':case _0x33588c(0x4a8):case'KNEEL':case _0x33588c(0x4c9):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x415)]=function(){const _0x494277=_0x2d0910;switch(this['_pose']['toUpperCase']()){case _0x494277(0x5bb):case _0x494277(0x510):case _0x494277(0x5f6):case'!':case'?':return 0x2;break;case'HEART':case'ANGER':case _0x494277(0x397):return 0x4;break;case _0x494277(0x3cc):case _0x494277(0x1bd):case _0x494277(0x30b):case _0x494277(0x569):case _0x494277(0x406):case'LIGHT\x20BULB':return 0x6;break;case'HURT':case _0x494277(0x3f8):case _0x494277(0x4c9):case _0x494277(0x579):case _0x494277(0x531):return 0x8;break;default:return VisuMZ[_0x494277(0x1f1)][_0x494277(0x369)][_0x494277(0x5a1)](this);break;}},Game_CharacterBase[_0x2d0910(0x3c7)]['getPosingCharacterPattern']=function(){const _0x89d544=_0x2d0910;switch(this[_0x89d544(0x432)][_0x89d544(0x3ea)]()){case'ITEM':case _0x89d544(0x4a8):case _0x89d544(0x5bb):case'!':case _0x89d544(0x2c3):case _0x89d544(0x569):return 0x0;break;case _0x89d544(0x1bd):case _0x89d544(0x3f8):case _0x89d544(0x510):case'?':case _0x89d544(0x54e):case'SILENCE':return 0x1;break;case _0x89d544(0x30b):case _0x89d544(0x4c9):case _0x89d544(0x5f6):case _0x89d544(0x397):case _0x89d544(0x552):return 0x2;break;default:return VisuMZ[_0x89d544(0x1f1)][_0x89d544(0x242)][_0x89d544(0x5a1)](this);break;}},Game_CharacterBase[_0x2d0910(0x3c7)]['forceCarrying']=function(){const _0x3bd2f6=_0x2d0910;this[_0x3bd2f6(0x408)]=!![];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x327)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x3b8)]=function(){const _0x3ba955=_0x2d0910;this[_0x3ba955(0x34d)]=!![];},Game_CharacterBase[_0x2d0910(0x3c7)]['clearDashing']=function(){const _0x399165=_0x2d0910;this[_0x399165(0x34d)]=![];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x5c2)]=function(){const _0x5c5972=_0x2d0910;if(this[_0x5c5972(0x417)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x5c5972(0x25b)]==='')return![];if(this['constructor']===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase['prototype']['isShadowShrink']=function(){const _0x569e69=_0x2d0910;if(this['isOnLadder']())return!![];if(this[_0x569e69(0x3a1)]===Game_Player&&this[_0x569e69(0x359)]())return!![];return![];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x1ff)]=function(){const _0x52da20=_0x2d0910;return VisuMZ[_0x52da20(0x1f1)][_0x52da20(0x48d)][_0x52da20(0x4a0)][_0x52da20(0x2a3)];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x5f0)]=function(){const _0x192ec4=_0x2d0910;return this[_0x192ec4(0x3aa)]();},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x349)]=function(){const _0xe3b32=_0x2d0910,_0x5df9b3=$gameMap['tileHeight']();return Math[_0xe3b32(0x286)](this['scrolledY']()*_0x5df9b3+_0x5df9b3);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x32d)]=function(_0x183aaf,_0x555fe7){const _0x54318d=_0x2d0910,_0x44fe6=this['searchLimit'](),_0x3c15e9=$gameMap[_0x54318d(0x697)](),_0x1217a1=[],_0xe44d83=[],_0x35f1cd=[],_0x8348cc={};let _0x5246f7=_0x8348cc;if(this['x']===_0x183aaf&&this['y']===_0x555fe7)return 0x0;_0x8348cc['parent']=null,_0x8348cc['x']=this['x'],_0x8348cc['y']=this['y'],_0x8348cc['g']=0x0,_0x8348cc['f']=$gameMap[_0x54318d(0x434)](_0x8348cc['x'],_0x8348cc['y'],_0x183aaf,_0x555fe7),_0x1217a1['push'](_0x8348cc),_0xe44d83[_0x54318d(0x3eb)](_0x8348cc['y']*_0x3c15e9+_0x8348cc['x']);while(_0x1217a1[_0x54318d(0x290)]>0x0){if('CuKXL'===_0x54318d(0x4d9)){let _0x1ef7d0=0x0;for(let _0x2b9006=0x0;_0x2b9006<_0x1217a1[_0x54318d(0x290)];_0x2b9006++){if(_0x54318d(0x459)!==_0x54318d(0x459)){_0x34745b['EventsMoveCore'][_0x54318d(0x3cb)][_0x54318d(0x5a1)](this,_0x12399c);if(this['canStartLocalEvents']()){this[_0x54318d(0x620)](_0x41dab3);if(_0x26be62[_0x54318d(0x495)](0x0)&&this[_0x54318d(0x1bf)]()==='standing')this[_0x54318d(0x3ec)](this['x'],this['y']);else(_0x55f846['includes'](0x1)||_0x5b17da[_0x54318d(0x495)](0x2))&&this[_0x54318d(0x21e)]();}}else _0x1217a1[_0x2b9006]['f']<_0x1217a1[_0x1ef7d0]['f']&&(_0x1ef7d0=_0x2b9006);}const _0x4f4d72=_0x1217a1[_0x1ef7d0],_0x1ce951=_0x4f4d72['x'],_0x274767=_0x4f4d72['y'],_0x4513da=_0x274767*_0x3c15e9+_0x1ce951,_0x4352b7=_0x4f4d72['g'];_0x1217a1[_0x54318d(0x209)](_0x1ef7d0,0x1),_0xe44d83[_0x54318d(0x209)](_0xe44d83[_0x54318d(0x1c9)](_0x4513da),0x1),_0x35f1cd[_0x54318d(0x3eb)](_0x4513da);if(_0x4f4d72['x']===_0x183aaf&&_0x4f4d72['y']===_0x555fe7){if('jyOUM'===_0x54318d(0x5b0)){_0x5246f7=_0x4f4d72;break;}else _0x516c28=_0x417d43[_0x54318d(0x560)](_0x429645),_0xd2fbcb[_0x54318d(0x1f1)][_0x54318d(0x5e3)][_0x54318d(0x5a1)](this,_0x1127f4);}if(_0x4352b7>=_0x44fe6){if('Euwuq'!==_0x54318d(0x3ae))this[_0x54318d(0x51c)]['apply'](this,arguments);else continue;}const _0x39e274=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x5a16f9=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x29ae6c=0x1;_0x29ae6c<0xa;_0x29ae6c++){if(_0x29ae6c===0x5)continue;const _0x3e39a4=_0x29ae6c,_0x56360e=_0x39e274[_0x29ae6c],_0x3fa0ae=_0x5a16f9[_0x29ae6c],_0x3c5a68=$gameMap[_0x54318d(0x49d)](_0x1ce951,_0x3e39a4),_0x3e12c8=$gameMap[_0x54318d(0x53b)](_0x274767,_0x3e39a4),_0x22557f=_0x3e12c8*_0x3c15e9+_0x3c5a68;if(_0x35f1cd[_0x54318d(0x495)](_0x22557f))continue;if(this[_0x54318d(0x3a1)]===Game_Player&&VisuMZ[_0x54318d(0x1f1)][_0x54318d(0x48d)][_0x54318d(0x4a0)][_0x54318d(0x1fb)]){if(!this[_0x54318d(0x251)](_0x1ce951,_0x274767,_0x56360e))continue;if(!this[_0x54318d(0x251)](_0x1ce951,_0x274767,_0x3fa0ae))continue;}if(!this['canPassDiagonally'](_0x1ce951,_0x274767,_0x56360e,_0x3fa0ae))continue;const _0x1d4053=_0x4352b7+0x1,_0x2988de=_0xe44d83[_0x54318d(0x1c9)](_0x22557f);if(_0x2988de<0x0||_0x1d4053<_0x1217a1[_0x2988de]['g']){let _0x584470={};if(_0x2988de>=0x0)_0x584470=_0x1217a1[_0x2988de];else{if(_0x54318d(0x323)===_0x54318d(0x4b8)){if(!this[_0x54318d(0x251)](this['_x'],this['_y'],_0x498860))return this[_0x54318d(0x497)](_0x456d05);if(!this[_0x54318d(0x251)](this['_x'],this['_y'],_0xce2f73))return this[_0x54318d(0x497)](_0xcfb72d);if(!this[_0x54318d(0x365)](this['_x'],this['_y'],_0x39da85,_0x227537)){let _0x1a4781=_0x1cf9ac[_0x54318d(0x1f1)][_0x54318d(0x48d)][_0x54318d(0x4a0)][_0x54318d(0x37e)]?_0x1af629:_0x5337a8;return this[_0x54318d(0x497)](_0x1a4781);}}else _0x1217a1[_0x54318d(0x3eb)](_0x584470),_0xe44d83[_0x54318d(0x3eb)](_0x22557f);}_0x584470[_0x54318d(0x5f1)]=_0x4f4d72,_0x584470['x']=_0x3c5a68,_0x584470['y']=_0x3e12c8,_0x584470['g']=_0x1d4053,_0x584470['f']=_0x1d4053+$gameMap[_0x54318d(0x434)](_0x3c5a68,_0x3e12c8,_0x183aaf,_0x555fe7),(!_0x5246f7||_0x584470['f']-_0x584470['g']<_0x5246f7['f']-_0x5246f7['g'])&&(_0x5246f7=_0x584470);}}}else{const _0x5f3787=_0x5bdf9a[_0x54318d(0x395)]();if(_0x5f3787==='enable')return!![];if(_0x5f3787===_0x54318d(0x639))return![];if(this[_0x54318d(0x4fe)]===_0x1b19d4)this['setupDiagonalSupport']();return this[_0x54318d(0x4fe)];}}let _0x5abb16=_0x5246f7;while(_0x5abb16[_0x54318d(0x5f1)]&&_0x5abb16[_0x54318d(0x5f1)]!==_0x8348cc){_0x5abb16=_0x5abb16[_0x54318d(0x5f1)];}const _0x517237=$gameMap[_0x54318d(0x5c0)](_0x5abb16['x'],_0x8348cc['x']),_0x14b1f3=$gameMap[_0x54318d(0x2d2)](_0x5abb16['y'],_0x8348cc['y']);if(_0x517237<0x0&&_0x14b1f3>0x0)return 0x1;if(_0x517237>0x0&&_0x14b1f3>0x0)return 0x3;if(_0x517237<0x0&&_0x14b1f3<0x0)return 0x7;if(_0x517237>0x0&&_0x14b1f3<0x0)return 0x9;if(_0x14b1f3>0x0)return 0x2;if(_0x517237<0x0)return 0x4;if(_0x517237>0x0)return 0x6;if(_0x14b1f3<0x0)return 0x8;const _0x3cab7d=this[_0x54318d(0x482)](_0x183aaf),_0x24ae02=this['deltaYFrom'](_0x555fe7);if(Math['abs'](_0x3cab7d)>Math[_0x54318d(0x23a)](_0x24ae02))return _0x3cab7d>0x0?0x4:0x6;else{if(_0x24ae02!==0x0)return _0x24ae02>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x228)]=Game_CharacterBase[_0x2d0910(0x3c7)]['canPass'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x251)]=function(_0x1c5cfc,_0x55ed6b,_0x52cb4a){const _0x3c8282=_0x2d0910;if(this['_vehicleType']===_0x3c8282(0x5fb))return this[_0x3c8282(0x1df)]()[_0x3c8282(0x4f1)](_0x1c5cfc,_0x55ed6b,_0x52cb4a);else{if('XkFpW'===_0x3c8282(0x60c))return VisuMZ[_0x3c8282(0x1f1)][_0x3c8282(0x228)][_0x3c8282(0x5a1)](this,_0x1c5cfc,_0x55ed6b,_0x52cb4a);else{if(this['_SavedEventLocations']===_0x5d9ed7)this[_0x3c8282(0x2d4)]();const _0x15086f=_0x3c8282(0x68e)['format'](_0x581929,_0x34bc89);delete this['_SavedEventLocations'][_0x15086f];}}},Game_CharacterBase['prototype'][_0x2d0910(0x326)]=function(){const _0x5f391c=_0x2d0910;this[_0x5f391c(0x61b)]=0x0,this[_0x5f391c(0x28c)]=0x0;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x587)]=Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x3aa)],Game_CharacterBase['prototype']['screenX']=function(){const _0x1b1291=_0x2d0910;return VisuMZ[_0x1b1291(0x1f1)][_0x1b1291(0x587)][_0x1b1291(0x5a1)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x1b9)]=Game_CharacterBase[_0x2d0910(0x3c7)]['screenY'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x41c)]=function(){const _0xf6b6cb=_0x2d0910;return VisuMZ['EventsMoveCore'][_0xf6b6cb(0x1b9)][_0xf6b6cb(0x5a1)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x39f)]=function(){const _0x2b2331=_0x2d0910;this[_0x2b2331(0x656)]='';},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x433)]=Game_CharacterBase[_0x2d0910(0x3c7)]['updatePattern'],Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x1f8)]=function(){const _0x3ffde1=_0x2d0910;if(this['_patternLocked'])return;if(this[_0x3ffde1(0x394)]())return;VisuMZ[_0x3ffde1(0x1f1)][_0x3ffde1(0x433)]['call'](this);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x394)]=function(){const _0x50ab35=_0x2d0910;if(!this[_0x50ab35(0x684)]()&&this['_stopCount']>0x0)return![];switch(String(this[_0x50ab35(0x656)])['toUpperCase']()[_0x50ab35(0x61f)]()){case _0x50ab35(0x5fa):this[_0x50ab35(0x1f7)]+=0x1;if(this[_0x50ab35(0x1f7)]>0x2)this[_0x50ab35(0x381)](0x0);break;case _0x50ab35(0x2b9):this[_0x50ab35(0x1f7)]-=0x1;if(this[_0x50ab35(0x1f7)]<0x0)this[_0x50ab35(0x381)](0x2);break;case _0x50ab35(0x685):case'SPIN\x20CW':this[_0x50ab35(0x54b)]();break;case _0x50ab35(0x3e5):case _0x50ab35(0x2e9):case _0x50ab35(0x2cb):case'SPIN\x20ACW':this[_0x50ab35(0x1e5)]();break;default:return![];}return!![];},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x1e8)]=function(){const _0x1d42a1=_0x2d0910;return $gameSystem[_0x1d42a1(0x1e8)](this);},Game_CharacterBase['prototype'][_0x2d0910(0x2c9)]=function(){const _0x295983=_0x2d0910,_0x16cc03=this[_0x295983(0x1e8)]();if(!_0x16cc03)return![];return _0x16cc03['iconIndex']>0x0;},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x4f7)]=function(){const _0x3f6501=_0x2d0910,_0x28466c=this['direction']();return $gameMap[_0x3f6501(0x49d)](this['x'],_0x28466c);},Game_CharacterBase[_0x2d0910(0x3c7)]['frontY']=function(){const _0x9e95f0=_0x2d0910,_0x4cd045=this[_0x9e95f0(0x462)]();return $gameMap[_0x9e95f0(0x53b)](this['y'],_0x4cd045);},Game_CharacterBase['prototype'][_0x2d0910(0x253)]=function(){const _0x42a06d=_0x2d0910,_0x1dafb7=this[_0x42a06d(0x62a)](this[_0x42a06d(0x462)]());return $gameMap[_0x42a06d(0x49d)](this['x'],_0x1dafb7);},Game_CharacterBase[_0x2d0910(0x3c7)][_0x2d0910(0x601)]=function(){const _0xabedc4=_0x2d0910,_0x3f49cc=this[_0xabedc4(0x62a)](this[_0xabedc4(0x462)]());return $gameMap['roundYWithDirection'](this['y'],_0x3f49cc);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x5e3)]=Game_Character['prototype'][_0x2d0910(0x24a)],Game_Character[_0x2d0910(0x3c7)]['setMoveRoute']=function(_0x27f8a2){const _0x3e7813=_0x2d0910;route=JsonEx[_0x3e7813(0x560)](_0x27f8a2),VisuMZ[_0x3e7813(0x1f1)][_0x3e7813(0x5e3)][_0x3e7813(0x5a1)](this,route);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x261)]=Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x3e0)],Game_Character['prototype'][_0x2d0910(0x3e0)]=function(_0x3b6ee6){const _0x15440f=_0x2d0910;route=JsonEx[_0x15440f(0x560)](_0x3b6ee6),VisuMZ[_0x15440f(0x1f1)][_0x15440f(0x261)][_0x15440f(0x5a1)](this,route);},VisuMZ['EventsMoveCore'][_0x2d0910(0x524)]=Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x3cd)],Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x3cd)]=function(_0x11a7eb){const _0x228e3b=_0x2d0910,_0x5486c7=Game_Character,_0x430a32=_0x11a7eb['parameters'];if(_0x11a7eb['code']===_0x5486c7[_0x228e3b(0x676)]){let _0x1af8e9=_0x11a7eb['parameters'][0x0];_0x1af8e9=this[_0x228e3b(0x2f1)](_0x1af8e9),_0x1af8e9=this[_0x228e3b(0x239)](_0x1af8e9),this[_0x228e3b(0x2ea)](_0x11a7eb,_0x1af8e9);}else{if('hOyAN'!==_0x228e3b(0x2c0))VisuMZ[_0x228e3b(0x1f1)][_0x228e3b(0x524)][_0x228e3b(0x5a1)](this,_0x11a7eb);else return this[_0x228e3b(0x4b6)](_0x5e5f37['$1'],_0x4dc84a['$2']);}},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x2f1)]=function(_0x3cc58e){const _0x1fc713=_0x2d0910,_0x4e524e=/\$gameVariables\.value\((\d+)\)/gi,_0xa583a9=/\\V\[(\d+)\]/gi;while(_0x3cc58e['match'](_0x4e524e)){_0x3cc58e=_0x3cc58e[_0x1fc713(0x263)](_0x4e524e,(_0x3ce085,_0x180b14)=>$gameVariables[_0x1fc713(0x420)](parseInt(_0x180b14)));}while(_0x3cc58e[_0x1fc713(0x672)](_0xa583a9)){_0x1fc713(0x364)!==_0x1fc713(0x488)?_0x3cc58e=_0x3cc58e[_0x1fc713(0x263)](_0xa583a9,(_0x16ea39,_0x4d7fcc)=>$gameVariables[_0x1fc713(0x420)](parseInt(_0x4d7fcc))):(this[_0x1fc713(0x3c1)]=_0x3ac7a8,this[_0x1fc713(0x3e1)]=!![],_0x14bc4a>0x0&&(this['_frames']=_0x18ef1b[_0x1fc713(0x674)](this['_frames'],0x1)));}return _0x3cc58e;},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x239)]=function(_0x485bb8){const _0x25ebbd=_0x2d0910,_0x362ec1=/\\SELFVAR\[(\d+)\]/gi;while(_0x485bb8['match'](_0x362ec1)){_0x485bb8=_0x485bb8[_0x25ebbd(0x263)](_0x362ec1,(_0x33103c,_0x4c15b3)=>getSelfVariableValue(this[_0x25ebbd(0x555)],this[_0x25ebbd(0x4b1)],parseInt(_0x4c15b3)));}return _0x485bb8;},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x2ea)]=function(_0x12a99b,_0x54fc66){const _0xe6e04d=_0x2d0910;if(_0x54fc66[_0xe6e04d(0x672)](/ANIMATION:[ ](\d+)/i))return this[_0xe6e04d(0x3f1)](Number(RegExp['$1']));if(_0x54fc66['match'](/BALLOON:[ ](.*)/i))return this[_0xe6e04d(0x65f)](String(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/FADE IN:[ ](\d+)/i))return _0xe6e04d(0x577)===_0xe6e04d(0x577)?this['processMoveRouteFadeIn'](Number(RegExp['$1'])):this['screenX']();if(_0x54fc66[_0xe6e04d(0x672)](/FADE OUT:[ ](\d+)/i)){if(_0xe6e04d(0x2be)!==_0xe6e04d(0x3ee))return this[_0xe6e04d(0x512)](Number(RegExp['$1']));else{if(_0x3a6cdd[_0xe6e04d(0x389)]['constructor']===_0x463df7)return![];return _0xe6b719[_0xe6e04d(0x5b7)][_0xe6e04d(0x495)](_0x5c5bcf);}}if(_0x54fc66[_0xe6e04d(0x672)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0xe6e04d(0x3b4)]();if(_0x54fc66[_0xe6e04d(0x672)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0xe6e04d(0x327)]();if(_0x54fc66[_0xe6e04d(0x672)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0xe6e04d(0x3b8)]();if(_0x54fc66['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0xe6e04d(0x4cd)]();if(_0x54fc66['match'](/HUG:[ ]LEFT/i)){if(_0xe6e04d(0x692)!=='XMTAw')return this[_0xe6e04d(0x5f4)]('left');else _0x3e1dee=0x4;}if(_0x54fc66[_0xe6e04d(0x672)](/HUG:[ ]RIGHT/i))return this[_0xe6e04d(0x5f4)]('right');if(_0x54fc66[_0xe6e04d(0x672)](/INDEX:[ ](\d+)/i)){if('wEIDD'!=='wEIDD')this[_0xe6e04d(0x497)](_0x254e10>0x0?0x4:0x6),!this[_0xe6e04d(0x1dd)]()&&_0x4236f3!==0x0&&this[_0xe6e04d(0x497)](_0x23a83b>0x0?0x8:0x2);else return this[_0xe6e04d(0x48a)](Number(RegExp['$1']));}if(_0x54fc66[_0xe6e04d(0x672)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0xe6e04d(0x59e)!==_0xe6e04d(0x59e))_0x5a9c41[_0xe6e04d(0x1f1)][_0xe6e04d(0x557)]['call'](this,_0x37f4c8,_0x2197f9),this[_0xe6e04d(0x588)](),this['setupMorphEvent'](),this[_0xe6e04d(0x42e)]();else{const _0x2516d4=this[_0xe6e04d(0x4ec)]+Number(RegExp['$1']);return this[_0xe6e04d(0x48a)](_0x2516d4);}}if(_0x54fc66[_0xe6e04d(0x672)](/JUMP FORWARD:[ ](\d+)/i))return _0xe6e04d(0x536)===_0xe6e04d(0x536)?this[_0xe6e04d(0x413)](Number(RegExp['$1'])):this['setDirection'](0x9);if(_0x54fc66[_0xe6e04d(0x672)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xe6e04d(0x334)===_0xe6e04d(0x334))return this[_0xe6e04d(0x696)](Number(RegExp['$1']),Number(RegExp['$2']));else this['updateEventIconSprite']();}if(_0x54fc66[_0xe6e04d(0x672)](/JUMP TO EVENT:[ ](\d+)/i)){if(_0xe6e04d(0x689)===_0xe6e04d(0x5ff))this[_0xe6e04d(0x635)]=_0x220802[_0xe6e04d(0x55c)](this['mapId']()),this['_needsRefresh']=!![];else{const _0x1a90de=$gameMap['event'](Number(RegExp['$1']));return this[_0xe6e04d(0x317)](_0x1a90de);}}if(_0x54fc66[_0xe6e04d(0x672)](/JUMP TO PLAYER/i)){if(_0xe6e04d(0x250)===_0xe6e04d(0x64d))_0xf3f38f['isSupportDiagonalMovement']()?this[_0xe6e04d(0x2b3)](_0x3b612b):_0x1d5798[_0xe6e04d(0x1f1)][_0xe6e04d(0x27c)]['call'](this,_0x5548ba);else return this['processMoveRouteJumpToCharacter']($gamePlayer);}if(_0x54fc66[_0xe6e04d(0x672)](/JUMP TO HOME/i)&&this['eventId']){const _0x2a8c17=this[_0xe6e04d(0x455)],_0x410925=this[_0xe6e04d(0x405)];return this[_0xe6e04d(0x696)](_0x2a8c17,_0x410925);}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x2dd4f9=String(RegExp['$1']),_0x326f89=this[_0xe6e04d(0x63b)](_0x54fc66);return this[_0xe6e04d(0x337)](_0x2dd4f9,_0x326f89);}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xe6e04d(0x4af)!==_0xe6e04d(0x4af)){const _0x5b3457=_0x2ed5f5[_0xe6e04d(0x578)]()||this;if(_0x5b3457[_0xe6e04d(0x3a1)]!==_0x6ddb23)return _0x3ac503[_0xe6e04d(0x1f1)][_0xe6e04d(0x53d)][_0xe6e04d(0x5a1)](this,_0x109ef1);else{const _0xbba270=[_0x5b3457[_0xe6e04d(0x555)],_0x5b3457['_eventId'],_0xe6e04d(0x682)['format'](_0x4ced94)];return _0x4d6b5c[_0xe6e04d(0x420)](_0xbba270);}}else{const _0x312fa7=Number(RegExp['$1']),_0x17efd1=Number(RegExp['$2']),_0x29ad2c=this[_0xe6e04d(0x63b)](_0x54fc66);return this['processMoveRouteMoveTo'](_0x312fa7,_0x17efd1,_0x29ad2c);}}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE TO EVENT:[ ](\d+)/i)){if('ZkidX'===_0xe6e04d(0x318)){_0x278b85[_0xe6e04d(0x1c2)](_0x2175e7,_0x1be13d);const _0x551e03=_0x1742b8[_0xe6e04d(0x2aa)],_0x8cf0d0=_0x22aba0[_0xe6e04d(0x39e)];_0x72a471['despawnAtXY'](_0x551e03,_0x8cf0d0);}else{const _0x2ff62b=$gameMap['event'](Number(RegExp['$1'])),_0x216588=this[_0xe6e04d(0x63b)](_0x54fc66);return this[_0xe6e04d(0x52c)](_0x2ff62b,_0x216588);}}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE TO PLAYER/i)){if(_0xe6e04d(0x1f4)!==_0xe6e04d(0x4f6)){const _0x5402e0=this[_0xe6e04d(0x63b)](_0x54fc66);return this[_0xe6e04d(0x52c)]($gamePlayer,_0x5402e0);}else this[_0xe6e04d(0x545)]();}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE TO HOME/i)&&this[_0xe6e04d(0x550)]){const _0x1a66fe=this['_randomHomeX'],_0x289e63=this['_randomHomeY'],_0x10010b=this[_0xe6e04d(0x63b)](_0x54fc66);return this[_0xe6e04d(0x458)](_0x1a66fe,_0x289e63,_0x10010b);}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0xe6e04d(0x464)](0x1,Number(RegExp['$1']));if(_0x54fc66['match'](/MOVE DOWN:[ ](\d+)/i))return this[_0xe6e04d(0x464)](0x2,Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0xe6e04d(0x416)===_0xe6e04d(0x540)){if(this===_0x4f8f1c){if(_0x236e8e['isPlayerForceShown']())return![];if(_0x1a578f[_0xe6e04d(0x465)]())return!![];}return _0x4bbedd[_0xe6e04d(0x1f1)][_0xe6e04d(0x401)][_0xe6e04d(0x5a1)](this);}else return this[_0xe6e04d(0x464)](0x3,Number(RegExp['$1']));}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE LEFT:[ ](\d+)/i))return this[_0xe6e04d(0x464)](0x4,Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/MOVE RIGHT:[ ](\d+)/i)){if('TLHvQ'==='TLHvQ')return this[_0xe6e04d(0x464)](0x6,Number(RegExp['$1']));else{_0x12aca8[_0xe6e04d(0x1f1)][_0xe6e04d(0x3d9)][_0xe6e04d(0x5a1)](this),this[_0xe6e04d(0x5d4)](),this[_0xe6e04d(0x3b9)]();if(_0x4ee4bf[_0xe6e04d(0x1f1)]['CustomPageConditions'])_0xcaffa5[_0xe6e04d(0x1f1)][_0xe6e04d(0x2e3)][_0xe6e04d(0x51c)]();}}if(_0x54fc66[_0xe6e04d(0x672)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0xe6e04d(0x464)](0x7,Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/MOVE UP:[ ](\d+)/i))return this[_0xe6e04d(0x464)](0x8,Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1f5027=Math[_0xe6e04d(0x66a)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x1f5027[_0xe6e04d(0x480)](0x0,0xff));}if(_0x54fc66[_0xe6e04d(0x672)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x1916ff=this[_0xe6e04d(0x644)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0xe6e04d(0x2d0)](_0x1916ff['clamp'](0x0,0xff));}if(_0x54fc66[_0xe6e04d(0x672)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x12fb14=this['_opacity']+Number(RegExp['$1']);return this[_0xe6e04d(0x2d0)](_0x12fb14['clamp'](0x0,0xff));}if(_0x54fc66['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0xe6e04d(0x603)](Number(RegExp['$1']));if(_0x54fc66[_0xe6e04d(0x672)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x54fc66['match'](/POSE:[ ](.*)/i)){const _0x5886d8=String(RegExp['$1'])[_0xe6e04d(0x3ea)]()['trim']();return this[_0xe6e04d(0x580)](_0x5886d8);}if(_0x54fc66[_0xe6e04d(0x672)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2988e0=Number(RegExp['$1']),_0x143082=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x2988e0,_0x143082);}if(_0x54fc66[_0xe6e04d(0x672)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x35a331=$gameMap[_0xe6e04d(0x3b6)](Number(RegExp['$1']));return this[_0xe6e04d(0x441)](_0x35a331);}if(_0x54fc66['match'](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x54fc66['match'](/STEP TOWARD HOME/i)&&this[_0xe6e04d(0x550)]){const _0x5364d8=this[_0xe6e04d(0x455)],_0x2cd0e2=this[_0xe6e04d(0x405)];return this['processMoveRouteStepTo'](_0x5364d8,_0x2cd0e2);}if(_0x54fc66['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xe6e04d(0x502)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x54fc66['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x2266a8=$gameMap[_0xe6e04d(0x3b6)](Number(RegExp['$1']));return this[_0xe6e04d(0x1cd)](_0x2266a8);}if(_0x54fc66[_0xe6e04d(0x672)](/STEP AWAY FROM PLAYER/i))return this[_0xe6e04d(0x1cd)]($gamePlayer);if(_0x54fc66[_0xe6e04d(0x672)](/STEP AWAY FROM HOME/i)&&this[_0xe6e04d(0x550)]){if(_0xe6e04d(0x336)===_0xe6e04d(0x336)){const _0x1db13b=this[_0xe6e04d(0x455)],_0x3ee83d=this[_0xe6e04d(0x405)];return this['moveAwayFromPoint'](_0x1db13b,_0x3ee83d);}else{const _0x3fea09=_0x2176e3[_0xe6e04d(0x578)]()||this;if(_0x3fea09[_0xe6e04d(0x3a1)]!==_0x4e91e4)return _0x5e978f[_0xe6e04d(0x1f1)]['Game_Switches_value'][_0xe6e04d(0x5a1)](this,_0x1774b1);else{const _0x3ded3c=[_0x3fea09[_0xe6e04d(0x555)],_0x3fea09[_0xe6e04d(0x4b1)],_0xe6e04d(0x54d)['format'](_0x4399a8)];return _0x27a819[_0xe6e04d(0x420)](_0x3ded3c);}}}if(_0x54fc66[_0xe6e04d(0x672)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xe6e04d(0x57b)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x54fc66['match'](/TURN TO EVENT:[ ](\d+)/i)){const _0x4c6a7f=$gameMap[_0xe6e04d(0x3b6)](Number(RegExp['$1']));return this[_0xe6e04d(0x4d0)](_0x4c6a7f);}if(_0x54fc66[_0xe6e04d(0x672)](/TURN TO PLAYER/i)){if('KpVWM'==='tkemD'){const _0x98764=this['lastSpawnedEvent']();return _0x98764?_0x98764[_0xe6e04d(0x4b1)]:0x0;}else return this[_0xe6e04d(0x4d0)]($gamePlayer);}if(_0x54fc66[_0xe6e04d(0x672)](/TURN TO HOME/i)&&this['eventId']){const _0x4769e0=this[_0xe6e04d(0x455)],_0x28905b=this[_0xe6e04d(0x405)];return this[_0xe6e04d(0x3b7)](_0x4769e0,_0x28905b);}if(_0x54fc66[_0xe6e04d(0x672)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x54fc66[_0xe6e04d(0x672)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x20ba9f=$gameMap[_0xe6e04d(0x3b6)](Number(RegExp['$1']));return this[_0xe6e04d(0x4e1)](_0x20ba9f);}if(_0x54fc66[_0xe6e04d(0x672)](/TURN AWAY FROM PLAYER/i)){if(_0xe6e04d(0x287)!==_0xe6e04d(0x56f))return this[_0xe6e04d(0x4e1)]($gamePlayer);else _0x37d31f[0x2]=_0x508432(_0x5bc3ac)['charAt'](0x0)[_0xe6e04d(0x3ea)]()[_0xe6e04d(0x61f)]();}if(_0x54fc66[_0xe6e04d(0x672)](/TURN AWAY FROM HOME/i)&&this[_0xe6e04d(0x550)]){if(_0xe6e04d(0x2bc)===_0xe6e04d(0x3a0)){_0x43d35d[_0xe6e04d(0x1f1)]['Game_Map_unlockEvent'][_0xe6e04d(0x5a1)](this,_0x245322);if(_0x3dc932>=0x3e8){const _0x36cc3a=this[_0xe6e04d(0x3b6)](_0x1c517b);if(_0x36cc3a)_0x36cc3a['unlock']();}}else{const _0x26e53a=this[_0xe6e04d(0x455)],_0x1788af=this[_0xe6e04d(0x405)];return this[_0xe6e04d(0x4ca)](_0x26e53a,_0x1788af);}}if(_0x54fc66[_0xe6e04d(0x672)](/TURN LOWER LEFT/i))return this[_0xe6e04d(0x2ca)](0x1);if(_0x54fc66['match'](/TURN LOWER RIGHT/i))return this[_0xe6e04d(0x2ca)](0x3);if(_0x54fc66['match'](/TURN UPPER LEFT/i))return this[_0xe6e04d(0x2ca)](0x7);if(_0x54fc66['match'](/TURN UPPER RIGHT/i))return this[_0xe6e04d(0x2ca)](0x9);if(_0x54fc66['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0xe6e04d(0x4b6)](RegExp['$1'],RegExp['$2']);if(_0x54fc66[_0xe6e04d(0x672)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0xe6e04d(0x4d2)](RegExp['$1'],RegExp['$2']);if(_0x54fc66[_0xe6e04d(0x672)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xe6e04d(0x2de)!=='qYmXj'){const _0x4d7fa1=this[_0xe6e04d(0x455)],_0x1494fd=this[_0xe6e04d(0x405)];return this['processMoveRouteJumpTo'](_0x4d7fa1,_0x1494fd);}else return this[_0xe6e04d(0x4ee)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x54fc66['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0xe6e04d(0x5f9)==='AEBWr'){if(!_0x1c6ccb[_0xe6e04d(0x50a)][_0xa883b4]){_0xa87c3[_0xe6e04d(0x69a)][_0x131342][_0xe6e04d(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4501cb=_0xe6e04d(0x3be)[_0xe6e04d(0x1cf)](_0x7ca40e(_0x276c80['$1']));_0x21b82b[_0xe6e04d(0x50a)][_0x115aa9]=new _0x27a5c7(_0xe6e04d(0x519),_0x4501cb);}const _0x5b1a61=_0x3622b2[_0xe6e04d(0x578)]()||this;return _0x31025f[_0xe6e04d(0x50a)][_0x3752b6][_0xe6e04d(0x5a1)](_0x5b1a61,_0x1e972f);}else{const _0x4b38bf=$gameMap[_0xe6e04d(0x3b6)](Number(RegExp['$1']));return this[_0xe6e04d(0x2eb)](_0x4b38bf);}}if(_0x54fc66['match'](/TELEPORT TO PLAYER/i)){if(_0xe6e04d(0x617)!==_0xe6e04d(0x525))return this[_0xe6e04d(0x2eb)]($gamePlayer);else{const _0x34d025=_0x2dee86[_0xe6e04d(0x47a)]();return _0x419f7b[_0xe6e04d(0x286)](this[_0xe6e04d(0x400)]()*_0x34d025+_0x34d025);}}if(_0x54fc66[_0xe6e04d(0x672)](/TELEPORT TO HOME/i)&&this[_0xe6e04d(0x550)]){const _0x204825=this[_0xe6e04d(0x455)],_0xac2513=this[_0xe6e04d(0x405)];return this[_0xe6e04d(0x4ee)](_0x204825,_0xac2513);}try{VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand'][_0xe6e04d(0x5a1)](this,_0x12a99b);}catch(_0x22e849){if($gameTemp[_0xe6e04d(0x5a4)]())console['log'](_0x22e849);}},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x3f1)]=function(_0x5d356b){const _0x50da85=_0x2d0910;$gameTemp[_0x50da85(0x470)]([this],_0x5d356b);},Game_Character['prototype'][_0x2d0910(0x65f)]=function(_0x12df04){const _0x58982d=_0x2d0910;let _0x2fe18f=0x0;switch(_0x12df04[_0x58982d(0x3ea)]()[_0x58982d(0x61f)]()){case'!':case _0x58982d(0x5bb):_0x2fe18f=0x1;break;case'?':case _0x58982d(0x510):_0x2fe18f=0x2;break;case'MUSIC':case _0x58982d(0x493):case _0x58982d(0x5f6):case'MUSIC-NOTE':case _0x58982d(0x572):_0x2fe18f=0x3;break;case'HEART':case _0x58982d(0x2c5):_0x2fe18f=0x4;break;case'ANGER':_0x2fe18f=0x5;break;case _0x58982d(0x397):_0x2fe18f=0x6;break;case'COBWEB':case _0x58982d(0x32f):case'FRUSTRATION':_0x2fe18f=0x7;break;case'SILENCE':case _0x58982d(0x56b):_0x2fe18f=0x8;break;case'LIGHT':case _0x58982d(0x332):case _0x58982d(0x552):case _0x58982d(0x304):case _0x58982d(0x2d7):_0x2fe18f=0x9;break;case'Z':case'ZZ':case _0x58982d(0x579):case'SLEEP':_0x2fe18f=0xa;break;case _0x58982d(0x5e4):_0x2fe18f=0xb;break;case _0x58982d(0x3a4):_0x2fe18f=0xc;break;case _0x58982d(0x1c8):_0x2fe18f=0xd;break;case _0x58982d(0x517):_0x2fe18f=0xe;break;case _0x58982d(0x509):_0x2fe18f=0xf;break;}$gameTemp['requestBalloon'](this,_0x2fe18f);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x5a3)]=function(_0x57ce69){const _0x32e4f2=_0x2d0910;_0x57ce69+=this[_0x32e4f2(0x644)],this[_0x32e4f2(0x2d0)](_0x57ce69['clamp'](0x0,0xff));if(this[_0x32e4f2(0x644)]<0xff)this[_0x32e4f2(0x2d3)]--;},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteFadeOut']=function(_0x570a61){const _0x27bb39=_0x2d0910;_0x570a61=this[_0x27bb39(0x644)]-_0x570a61,this[_0x27bb39(0x2d0)](_0x570a61[_0x27bb39(0x480)](0x0,0xff));if(this[_0x27bb39(0x644)]>0x0)this[_0x27bb39(0x2d3)]--;},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteHugWall']=function(_0x574d65){const _0x4d4d83=_0x2d0910,_0x36446e=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x6404c7=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x223ab8=this[_0x4d4d83(0x462)](),_0x329860=(_0x574d65===_0x4d4d83(0x309)?_0x36446e:_0x6404c7)[_0x223ab8],_0x162c2f=(_0x574d65===_0x4d4d83(0x309)?_0x6404c7:_0x36446e)[_0x223ab8];if(this['canPass'](this['x'],this['y'],_0x329860))_0x574d65===_0x4d4d83(0x309)?this[_0x4d4d83(0x1e5)]():this[_0x4d4d83(0x54b)]();else{if(!this[_0x4d4d83(0x251)](this['x'],this['y'],this[_0x4d4d83(0x462)]())){if(this[_0x4d4d83(0x251)](this['x'],this['y'],_0x162c2f))_0x574d65===_0x4d4d83(0x309)?this[_0x4d4d83(0x54b)]():this['turnLeft90']();else{if('CittL'!=='ZqRTf')this['turn180']();else{if(_0xa2bfa0)for(const _0x18dfbb of _0x354207['events']()){_0x18dfbb['refresh']();}}}}}this['canPass'](this['x'],this['y'],this[_0x4d4d83(0x462)]())&&(_0x4d4d83(0x3dd)===_0x4d4d83(0x3dd)?this['moveForward']():(this['_paused']=![],this['_speed']=-0x1,this['_expireCommonEvent']=0x0));},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x48a)]=function(_0x4f91b){const _0x123fed=_0x2d0910;if(ImageManager[_0x123fed(0x23d)](this[_0x123fed(0x25b)]))return;_0x4f91b=_0x4f91b[_0x123fed(0x480)](0x0,0x7),this[_0x123fed(0x3c4)](this[_0x123fed(0x25b)],_0x4f91b);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x413)]=function(_0x4508ad){const _0x17bc07=_0x2d0910;switch(this[_0x17bc07(0x462)]()){case 0x1:this[_0x17bc07(0x60e)](-_0x4508ad,_0x4508ad);break;case 0x2:this[_0x17bc07(0x60e)](0x0,_0x4508ad);break;case 0x3:this[_0x17bc07(0x60e)](_0x4508ad,_0x4508ad);break;case 0x4:this[_0x17bc07(0x60e)](-_0x4508ad,0x0);break;case 0x6:this[_0x17bc07(0x60e)](_0x4508ad,0x0);break;case 0x7:this[_0x17bc07(0x60e)](-_0x4508ad,-_0x4508ad);break;case 0x8:this['jump'](0x0,-_0x4508ad);break;case 0x9:this[_0x17bc07(0x60e)](_0x4508ad,-_0x4508ad);break;}},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteJumpTo']=function(_0x4918db,_0x35d4bb){const _0x3ab12c=_0x2d0910,_0x34cc5d=Math[_0x3ab12c(0x66a)](_0x4918db-this['x']),_0xad8252=Math['round'](_0x35d4bb-this['y']);this['jump'](_0x34cc5d,_0xad8252);},Game_Character['prototype'][_0x2d0910(0x317)]=function(_0x26d2e9){if(_0x26d2e9)this['processMoveRouteJumpTo'](_0x26d2e9['x'],_0x26d2e9['y']);},Game_Character['prototype'][_0x2d0910(0x5bc)]=function(_0x75192c,_0x44a1b8,_0x4a88a6){const _0x1f40c3=_0x2d0910;let _0x28e631=0x0;if(_0x4a88a6)$gameTemp[_0x1f40c3(0x62b)]=!![];$gameMap['isSupportDiagonalMovement']()?_0x1f40c3(0x4a2)!==_0x1f40c3(0x4a2)?this[_0x1f40c3(0x29c)]['filename']=_0x8c0280(_0xe67271['$1']):_0x28e631=this[_0x1f40c3(0x32d)](_0x75192c,_0x44a1b8):_0x28e631=this[_0x1f40c3(0x385)](_0x75192c,_0x44a1b8);if(_0x4a88a6)$gameTemp[_0x1f40c3(0x62b)]=![];this['executeMoveDir8'](_0x28e631),this[_0x1f40c3(0x27b)](!![]);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x441)]=function(_0x38bd7e){const _0x5b59da=_0x2d0910;if(_0x38bd7e)this[_0x5b59da(0x5bc)](_0x38bd7e['x'],_0x38bd7e['y']);},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteStepFrom']=function(_0x1d329c,_0x262fdc){const _0x365878=_0x2d0910,_0x65b2c=this['deltaXFrom'](_0x1d329c),_0x3dee77=this[_0x365878(0x43c)](_0x262fdc);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x63b)]=function(_0x5bba84){const _0x405f91=_0x2d0910;if(_0x5bba84['match'](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x5bba84[_0x405f91(0x672)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2f8)]=Game_Event['prototype']['isCollidedWithPlayerCharacters'],Game_Event['prototype'][_0x2d0910(0x391)]=function(_0x5a270f,_0x52135e){const _0x2d8a5a=_0x2d0910;if($gameTemp[_0x2d8a5a(0x62b)])return![];return VisuMZ[_0x2d8a5a(0x1f1)][_0x2d8a5a(0x2f8)][_0x2d8a5a(0x5a1)](this,_0x5a270f,_0x52135e);},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteMoveUntilStop']=function(_0x5da75a,_0x1d91af){const _0x476f02=_0x2d0910,_0x27272a=['',_0x476f02(0x35c),'DOWN','LOWER\x20RIGHT',_0x476f02(0x3ca),'',_0x476f02(0x665),_0x476f02(0x3b5),'UP',_0x476f02(0x64a)],_0x1f6710=_0x27272a[_0x476f02(0x1c9)](_0x5da75a[_0x476f02(0x3ea)]()[_0x476f02(0x61f)]());if(_0x1f6710<=0x0)return;if(_0x1d91af)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x476f02(0x251)](this['x'],this['y'],_0x1f6710)){if('mGnAG'===_0x476f02(0x20d)){if(_0x1d91af)$gameTemp[_0x476f02(0x62b)]=![];this[_0x476f02(0x2b3)](_0x1f6710),this[_0x476f02(0x2d3)]-=0x1;}else return _0x27ac44['isDashing']();}if(_0x1d91af)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x458)]=function(_0xd1ebff,_0x19e0f0,_0x564208){const _0x50c7b7=_0x2d0910;this['processMoveRouteStepTo'](_0xd1ebff,_0x19e0f0,_0x564208);if(this['x']!==_0xd1ebff||this['y']!==_0x19e0f0)this[_0x50c7b7(0x2d3)]--;},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x52c)]=function(_0x11cb54,_0x3618f0){const _0x28144f=_0x2d0910;if(_0x11cb54)this[_0x28144f(0x458)](_0x11cb54['x'],_0x11cb54['y'],_0x3618f0);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x464)]=function(_0xfa0cca,_0x320165){const _0x3bec8c=_0x2d0910;_0x320165=_0x320165||0x0;const _0x118273={'code':0x1,'indent':null,'parameters':[]};_0x118273[_0x3bec8c(0x213)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0xfa0cca],this[_0x3bec8c(0x5dc)][_0x3bec8c(0x222)][this[_0x3bec8c(0x2d3)]][_0x3bec8c(0x5e0)][0x0]='';while(_0x320165--){this[_0x3bec8c(0x5dc)][_0x3bec8c(0x222)]['splice'](this[_0x3bec8c(0x2d3)]+0x1,0x0,_0x118273);}},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x603)]=function(_0x42f6fb){const _0x1ff9da=_0x2d0910;this['_patternLocked']=!![],this[_0x1ff9da(0x381)](_0x42f6fb);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x4b6)]=function(_0x31d8ad,_0x48a295){const _0x3088b3=_0x2d0910;if(this===$gamePlayer)return;const _0x20d367=[this[_0x3088b3(0x555)],this[_0x3088b3(0x4b1)],'A'];if(_0x31d8ad[_0x3088b3(0x672)](/\b[ABCD]\b/i)){if('jUadh'!=='jUadh')return this['_activationProximity']['regionList']||[];else _0x20d367[0x2]=String(_0x31d8ad)['charAt'](0x0)['toUpperCase']()['trim']();}else _0x20d367[0x2]=_0x3088b3(0x54d)[_0x3088b3(0x1cf)](_0x31d8ad);switch(_0x48a295[_0x3088b3(0x3ea)]()[_0x3088b3(0x61f)]()){case'ON':case'TRUE':$gameSelfSwitches[_0x3088b3(0x3a3)](_0x20d367,!![]);break;case'OFF':case'FALSE':$gameSelfSwitches['setValue'](_0x20d367,![]);break;case _0x3088b3(0x20c):$gameSelfSwitches[_0x3088b3(0x3a3)](_0x20d367,!$gameSelfSwitches['value'](_0x20d367));break;}},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x4d2)]=function(_0xcf8197,_0x43478a){const _0x3e63b4=_0x2d0910;if(this===$gamePlayer)return;const _0x24ba13=[this[_0x3e63b4(0x555)],this[_0x3e63b4(0x4b1)],'Self\x20Variable\x20%1'[_0x3e63b4(0x1cf)](_0xcf8197)];$gameSelfSwitches[_0x3e63b4(0x3a3)](_0x24ba13,Number(_0x43478a));},Game_Character[_0x2d0910(0x3c7)]['processMoveRouteTeleportTo']=function(_0x6d9fc6,_0xf57cbc){this['locate'](_0x6d9fc6,_0xf57cbc);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x2eb)]=function(_0xbbbcdf){const _0x598878=_0x2d0910;if(_0xbbbcdf)this[_0x598878(0x4ee)](_0xbbbcdf['x'],_0xbbbcdf['y']);},Game_Character['prototype'][_0x2d0910(0x54b)]=function(){const _0x5e536e=_0x2d0910;switch(this['direction']()){case 0x1:this[_0x5e536e(0x2ca)](0x7);break;case 0x2:this[_0x5e536e(0x2ca)](0x4);break;case 0x3:this[_0x5e536e(0x2ca)](0x1);break;case 0x4:this[_0x5e536e(0x2ca)](0x8);break;case 0x6:this[_0x5e536e(0x2ca)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0x5e536e(0x2ca)](0x3);break;}},Game_Character['prototype'][_0x2d0910(0x1e5)]=function(){const _0x205146=_0x2d0910;switch(this[_0x205146(0x462)]()){case 0x1:this[_0x205146(0x2ca)](0x3);break;case 0x2:this[_0x205146(0x2ca)](0x6);break;case 0x3:this[_0x205146(0x2ca)](0x9);break;case 0x4:this[_0x205146(0x2ca)](0x2);break;case 0x6:this[_0x205146(0x2ca)](0x8);break;case 0x7:this[_0x205146(0x2ca)](0x1);break;case 0x8:this[_0x205146(0x2ca)](0x4);break;case 0x9:this[_0x205146(0x2ca)](0x7);break;}},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x310)]=function(_0x52d3d6,_0x537a05,_0x37f659){const _0x26f157=_0x2d0910,_0x35151e=this[_0x26f157(0x482)](_0x52d3d6),_0x10079f=this[_0x26f157(0x43c)](_0x537a05);if($gameMap['isSupportDiagonalMovement']()){if('PbtGT'==='PbtGT'){if(_0x37f659||this[_0x26f157(0x5cf)]()){if(_0x35151e>0x0&&_0x10079f<0x0)return 0x1;if(_0x35151e<0x0&&_0x10079f<0x0)return 0x3;if(_0x35151e>0x0&&_0x10079f>0x0)return 0x7;if(_0x35151e<0x0&&_0x10079f>0x0)return 0x9;}}else return this[_0x26f157(0x3b4)]();}if(Math[_0x26f157(0x23a)](_0x35151e)>Math[_0x26f157(0x23a)](_0x10079f))return _0x35151e>0x0?0x4:0x6;else{if(_0x10079f!==0x0)return _0x10079f>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x377)]=function(_0x57b938,_0x56d814,_0x5890de){const _0x5ddefd=_0x2d0910,_0x423ea=this[_0x5ddefd(0x482)](_0x57b938),_0x5706d3=this[_0x5ddefd(0x43c)](_0x56d814);if($gameMap[_0x5ddefd(0x44a)]()){if(_0x5890de||this[_0x5ddefd(0x5cf)]()){if(_0x423ea>0x0&&_0x5706d3<0x0)return 0x9;if(_0x423ea<0x0&&_0x5706d3<0x0)return 0x7;if(_0x423ea>0x0&&_0x5706d3>0x0)return 0x3;if(_0x423ea<0x0&&_0x5706d3>0x0)return 0x1;}}if(Math[_0x5ddefd(0x23a)](_0x423ea)>Math[_0x5ddefd(0x23a)](_0x5706d3)){if(_0x5ddefd(0x341)!==_0x5ddefd(0x4c1))return _0x423ea>0x0?0x6:0x4;else{if(this[_0x5ddefd(0x604)])return;if(_0x4d91be[_0x5ddefd(0x2e1)]())return;_0x98213c[_0x5ddefd(0x1f1)][_0x5ddefd(0x554)]['call'](this,_0x3d8572);}}else{if(_0x5706d3!==0x0){if(_0x5ddefd(0x325)==='mMkoK')return _0x5706d3>0x0?0x2:0x8;else _0x4aaf30[_0x5ddefd(0x1f1)][_0x5ddefd(0x2f2)][_0x5ddefd(0x5a1)](this),this['initMembersEventsMoveCore'](),this['createIconSprite']();}}return 0x0;},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x57b)]=function(_0x33913a,_0x44aa0d){const _0xaaade2=_0x2d0910,_0x340ee8=this['getDirectionToPoint'](_0x33913a,_0x44aa0d,!![]);if(_0x340ee8)this[_0xaaade2(0x2b3)](_0x340ee8);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x502)]=function(_0x58a95b,_0x251be9){const _0x3feb59=_0x2d0910,_0x23e0a8=this[_0x3feb59(0x377)](_0x58a95b,_0x251be9,!![]);if(_0x23e0a8)this[_0x3feb59(0x2b3)](_0x23e0a8);},Game_Character[_0x2d0910(0x3c7)]['turnTowardPoint']=function(_0x592df3,_0x4e4e82){const _0x5d738b=_0x2d0910,_0x5112d1=this['getDirectionToPoint'](_0x592df3,_0x4e4e82,![]);if(_0x5112d1)this[_0x5d738b(0x2ca)](_0x5112d1);},Game_Character['prototype']['turnAwayFromPoint']=function(_0x1cbb95,_0xf19e86){const _0x234883=_0x2d0910,_0x472618=this[_0x234883(0x377)](_0x1cbb95,_0xf19e86,![]);if(_0x472618)this[_0x234883(0x2ca)](_0x472618);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x30c)]=function(_0x4e27e7){const _0x38be8f=_0x2d0910;if(_0x4e27e7)this[_0x38be8f(0x57b)](_0x4e27e7['x'],_0x4e27e7['y']);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x1cd)]=function(_0x5392be){const _0x57f903=_0x2d0910;if(_0x5392be)this[_0x57f903(0x502)](_0x5392be['x'],_0x5392be['y']);},Game_Character[_0x2d0910(0x3c7)][_0x2d0910(0x4d0)]=function(_0x54fb0a){const _0x53cb3a=_0x2d0910;if(_0x54fb0a)this[_0x53cb3a(0x3b7)](_0x54fb0a['x'],_0x54fb0a['y']);},Game_Character['prototype'][_0x2d0910(0x4e1)]=function(_0x4dde67){const _0x22a21c=_0x2d0910;if(_0x4dde67)this[_0x22a21c(0x4ca)](_0x4dde67['x'],_0x4dde67['y']);},VisuMZ[_0x2d0910(0x1f1)]['Game_Player_isDashing']=Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x61c)],Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x61c)]=function(){const _0x711c1b=_0x2d0910;if(this[_0x711c1b(0x34d)])return!![];return VisuMZ['EventsMoveCore'][_0x711c1b(0x30d)][_0x711c1b(0x5a1)](this);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x576)]=Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x4ea)],Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x4ea)]=function(){const _0x4be63b=_0x2d0910;return $gameMap[_0x4be63b(0x44a)]()?this[_0x4be63b(0x311)]():VisuMZ[_0x4be63b(0x1f1)]['Game_Player_getInputDirection'][_0x4be63b(0x5a1)](this);},Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x311)]=function(){const _0x43931c=_0x2d0910;return Input[_0x43931c(0x693)];},Game_Player['prototype'][_0x2d0910(0x35b)]=function(){const _0x19a5b6=_0x2d0910;if($gameSystem['isPlayerControlDisabled']())return 0x0;if(!this[_0x19a5b6(0x2a9)]()&&this[_0x19a5b6(0x289)]()){let _0x375512=this[_0x19a5b6(0x4ea)]();if(_0x375512>0x0){if(_0x19a5b6(0x1ca)!==_0x19a5b6(0x1c6))$gameTemp[_0x19a5b6(0x4b4)]();else{if(this['constructor']===_0x3734bd&&this[_0x19a5b6(0x359)]())return this[_0x19a5b6(0x1df)]()['characterName']()['match'](/\[VS8\]/i);else return _0x263a80['VisuMZ_2_DragonbonesUnion']&&this[_0x19a5b6(0x296)]()?!![]:this[_0x19a5b6(0x375)]()[_0x19a5b6(0x672)](/\[VS8\]/i);}}else{if($gameTemp[_0x19a5b6(0x21a)]()){const _0x4faa2e=$gameTemp['destinationX'](),_0x85509f=$gameTemp['destinationY'](),_0x461e9b=$gameMap[_0x19a5b6(0x44a)](),_0x22e7eb=$gameMap[_0x19a5b6(0x691)](_0x4faa2e,_0x85509f),_0x10d989=$gameMap[_0x19a5b6(0x47d)](_0x4faa2e,_0x85509f)[_0x19a5b6(0x290)]<=0x0;if(_0x461e9b&&_0x22e7eb&&_0x10d989)_0x375512=this[_0x19a5b6(0x32d)](_0x4faa2e,_0x85509f);else{if(_0x19a5b6(0x69c)===_0x19a5b6(0x69c))_0x375512=this[_0x19a5b6(0x385)](_0x4faa2e,_0x85509f);else return this[_0x19a5b6(0x5cc)];}}}if(_0x375512>0x0)this['_inputTime']=this[_0x19a5b6(0x58c)]||0x0,this[_0x19a5b6(0x35a)]()?this[_0x19a5b6(0x2ca)](_0x375512):this['executeMove'](_0x375512),this['_inputTime']++;else{if('IqyBW'!=='CglIO')this[_0x19a5b6(0x58c)]=0x0;else{const _0x5723b9=_0x5ca018['event'](_0x29c31c(_0x476ac6['$1']));return this['processMoveRouteStepToCharacter'](_0x5723b9);}}}},Game_Player['prototype'][_0x2d0910(0x35a)]=function(){const _0x473b54=_0x2d0910,_0x477437=VisuMZ[_0x473b54(0x1f1)][_0x473b54(0x48d)][_0x473b54(0x4a0)];if(!_0x477437[_0x473b54(0x3ef)])return![];if($gameTemp[_0x473b54(0x21a)]())return![];if(this[_0x473b54(0x61c)]()||this[_0x473b54(0x2a9)]()||this[_0x473b54(0x4bd)]())return![];return this[_0x473b54(0x58c)]<_0x477437[_0x473b54(0x679)];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x27c)]=Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x339)],Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x339)]=function(_0x4e36bc){const _0x2fd50d=_0x2d0910;$gameMap[_0x2fd50d(0x44a)]()?this[_0x2fd50d(0x2b3)](_0x4e36bc):VisuMZ[_0x2fd50d(0x1f1)][_0x2fd50d(0x27c)][_0x2fd50d(0x5a1)](this,_0x4e36bc);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x467)]=Game_Player['prototype'][_0x2d0910(0x60b)],Game_Player['prototype']['isMapPassable']=function(_0x1575dc,_0x418366,_0x42d57c){const _0x42ea6e=_0x2d0910;if($gameMap[_0x42ea6e(0x219)](_0x1575dc,_0x418366,_0x42d57c,_0x42ea6e(0x2bb)))return this[_0x42ea6e(0x359)]()&&this['vehicle']()?this['vehicle']()['isMapPassable'](_0x1575dc,_0x418366,_0x42d57c):!![];if($gameMap[_0x42ea6e(0x21b)](_0x1575dc,_0x418366,_0x42d57c,_0x42ea6e(0x2bb)))return![];return VisuMZ[_0x42ea6e(0x1f1)][_0x42ea6e(0x467)]['call'](this,_0x1575dc,_0x418366,_0x42d57c);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x3cb)]=Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x4a6)],Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x4a6)]=function(_0x15a82e){const _0x5b8f7c=_0x2d0910;VisuMZ[_0x5b8f7c(0x1f1)][_0x5b8f7c(0x3cb)][_0x5b8f7c(0x5a1)](this,_0x15a82e);if(this[_0x5b8f7c(0x236)]()){this[_0x5b8f7c(0x620)](_0x15a82e);if(_0x15a82e[_0x5b8f7c(0x495)](0x0)&&this[_0x5b8f7c(0x1bf)]()===_0x5b8f7c(0x32c))this[_0x5b8f7c(0x3ec)](this['x'],this['y']);else(_0x15a82e[_0x5b8f7c(0x495)](0x1)||_0x15a82e[_0x5b8f7c(0x495)](0x2))&&this['startMapCommonEventOnTouch']();}},VisuMZ[_0x2d0910(0x1f1)]['Game_Player_checkEventTriggerThere']=Game_Player[_0x2d0910(0x3c7)]['checkEventTriggerThere'],Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x442)]=function(_0x301549){const _0xb501dd=_0x2d0910;VisuMZ['EventsMoveCore'][_0xb501dd(0x46d)][_0xb501dd(0x5a1)](this,_0x301549);if(this[_0xb501dd(0x236)]()&&_0x301549[_0xb501dd(0x495)](0x0)&&this[_0xb501dd(0x1bf)]()===_0xb501dd(0x1cc)){const _0x5d8448=this[_0xb501dd(0x462)](),_0x5807ea=$gameMap[_0xb501dd(0x49d)](this['x'],_0x5d8448),_0x156c6f=$gameMap[_0xb501dd(0x53b)](this['y'],_0x5d8448);this['startMapCommonEventOnOK'](_0x5807ea,_0x156c6f);}},Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x620)]=function(_0x4a3499){const _0x1eec5e=_0x2d0910;if($gameMap[_0x1eec5e(0x315)]())return;if($gameMap[_0x1eec5e(0x343)]())return;const _0x1bcfc0=$gameMap[_0x1eec5e(0x42d)]();for(const _0x543d3a of _0x1bcfc0){if(_0x1eec5e(0x21f)!==_0x1eec5e(0x4b2)){if(!_0x543d3a)continue;if(!_0x543d3a[_0x1eec5e(0x4e8)](_0x4a3499))continue;if(this[_0x1eec5e(0x608)](_0x543d3a))return _0x543d3a['start']();if(this[_0x1eec5e(0x5d8)](_0x543d3a))return _0x543d3a[_0x1eec5e(0x605)]();}else _0x522526[_0x1eec5e(0x3a3)](_0x3a828e,!!_0x33136b);}},Game_Player[_0x2d0910(0x3c7)]['meetActivationRegionConditions']=function(_0x2e0b8e){const _0x1dff74=_0x2d0910;if($gameMap[_0x1dff74(0x315)]())return![];if($gameMap[_0x1dff74(0x343)]())return![];return _0x2e0b8e[_0x1dff74(0x5ac)]()[_0x1dff74(0x495)](this[_0x1dff74(0x63a)]());},Game_Player['prototype']['meetActivationProximityConditions']=function(_0x401604){const _0x6b4fe5=_0x2d0910;if($gameMap[_0x6b4fe5(0x315)]())return![];if($gameMap[_0x6b4fe5(0x343)]())return![];if([_0x6b4fe5(0x5a6),_0x6b4fe5(0x29a)]['includes'](_0x401604['activationProximityType']()))return![];const _0x2017f7=_0x401604[_0x6b4fe5(0x1d6)](),_0x3c359a=_0x401604['activationProximityDistance']();switch(_0x2017f7){case _0x6b4fe5(0x206):const _0x45018f=$gameMap[_0x6b4fe5(0x434)](this['x'],this['y'],_0x401604['x'],_0x401604['y']);return _0x401604[_0x6b4fe5(0x294)]()>=_0x45018f;break;case _0x6b4fe5(0x33f):return _0x3c359a>=Math[_0x6b4fe5(0x23a)](_0x401604[_0x6b4fe5(0x482)](this['x']))&&_0x3c359a>=Math[_0x6b4fe5(0x23a)](_0x401604[_0x6b4fe5(0x43c)](this['y']));break;case _0x6b4fe5(0x3d4):return _0x3c359a>=Math[_0x6b4fe5(0x23a)](_0x401604[_0x6b4fe5(0x43c)](this['y']));break;case'column':return _0x3c359a>=Math['abs'](_0x401604['deltaXFrom'](this['x']));break;case _0x6b4fe5(0x5d2):return![];break;}},Game_Player['prototype'][_0x2d0910(0x3ec)]=function(_0x28da42,_0x450ca3){const _0x59d86e=_0x2d0910;if($gameMap[_0x59d86e(0x315)]())return;if($gameMap[_0x59d86e(0x343)]())return;let _0x54c8c1=VisuMZ[_0x59d86e(0x1f1)]['Settings'][_0x59d86e(0x5e5)],_0x15cf5d=$gameMap[_0x59d86e(0x63a)](_0x28da42,_0x450ca3);const _0x32ee5b=_0x59d86e(0x262)['format'](_0x15cf5d);if(_0x54c8c1[_0x32ee5b]){if(_0x59d86e(0x616)==='xlDYH')return _0x254861[_0x59d86e(0x693)];else $gameTemp[_0x59d86e(0x3bc)](_0x54c8c1[_0x32ee5b]);}},Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x1bf)]=function(){const _0x46004c=_0x2d0910;return VisuMZ[_0x46004c(0x1f1)]['Settings'][_0x46004c(0x3e6)];},Game_Player[_0x2d0910(0x3c7)][_0x2d0910(0x21e)]=function(){const _0x323963=_0x2d0910;if($gameMap[_0x323963(0x315)]())return;if($gameMap[_0x323963(0x343)]())return;let _0x3f5f9b=VisuMZ[_0x323963(0x1f1)][_0x323963(0x48d)][_0x323963(0x567)];const _0xbad46e=_0x323963(0x262)['format'](this[_0x323963(0x63a)]());_0x3f5f9b[_0xbad46e]&&$gameTemp['reserveCommonEvent'](_0x3f5f9b[_0xbad46e]);},VisuMZ['EventsMoveCore'][_0x2d0910(0x2b5)]=Game_Player['prototype'][_0x2d0910(0x4e0)],Game_Player['prototype'][_0x2d0910(0x4e0)]=function(){const _0x4c6a91=_0x2d0910;VisuMZ[_0x4c6a91(0x1f1)][_0x4c6a91(0x2b5)][_0x4c6a91(0x5a1)](this),VisuMZ[_0x4c6a91(0x410)](0x0);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x46a)]=Game_Follower[_0x2d0910(0x3c7)]['initialize'],Game_Follower[_0x2d0910(0x3c7)]['initialize']=function(_0x240345){const _0x13fc47=_0x2d0910;VisuMZ[_0x13fc47(0x1f1)][_0x13fc47(0x46a)][_0x13fc47(0x5a1)](this,_0x240345),this['_chaseOff']=![];},Game_Follower['prototype']['isDashing']=function(){const _0x59aadd=_0x2d0910;return $gamePlayer[_0x59aadd(0x61c)]();},Game_Follower[_0x2d0910(0x3c7)][_0x2d0910(0x4c7)]=function(){const _0x22d163=_0x2d0910;return $gamePlayer[_0x22d163(0x4c7)]();},Game_Follower[_0x2d0910(0x3c7)][_0x2d0910(0x2f9)]=function(){const _0xe73f1e=_0x2d0910;return $gamePlayer[_0xe73f1e(0x2f9)]();},Game_Follower[_0x2d0910(0x3c7)][_0x2d0910(0x6a0)]=function(_0x1bccda){const _0x2fa980=_0x2d0910;this[_0x2fa980(0x604)]=_0x1bccda;},VisuMZ[_0x2d0910(0x1f1)]['Game_Follower_chaseCharacter']=Game_Follower[_0x2d0910(0x3c7)]['chaseCharacter'],Game_Follower['prototype']['chaseCharacter']=function(_0x389f5c){const _0x3a5c38=_0x2d0910;if(this['_chaseOff'])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ['EventsMoveCore'][_0x3a5c38(0x554)]['call'](this,_0x389f5c);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x5f5)]=Game_Vehicle['prototype'][_0x2d0910(0x60b)],Game_Vehicle[_0x2d0910(0x3c7)][_0x2d0910(0x60b)]=function(_0x1f6173,_0x482769,_0x25a46b){const _0x2eceea=_0x2d0910;if($gameMap['isRegionAllowPass'](_0x1f6173,_0x482769,_0x25a46b,this[_0x2eceea(0x37b)]))return!![];if($gameMap[_0x2eceea(0x21b)](_0x1f6173,_0x482769,_0x25a46b,this[_0x2eceea(0x37b)]))return![];return VisuMZ[_0x2eceea(0x1f1)][_0x2eceea(0x5f5)]['call'](this,_0x1f6173,_0x482769,_0x25a46b);},Game_Vehicle[_0x2d0910(0x3c7)][_0x2d0910(0x4f1)]=function(_0x464445,_0x1db876,_0x438c88){const _0x30f470=_0x2d0910;if($gameMap['isRegionAllowPass'](_0x464445,_0x1db876,_0x438c88,this['_type']))return!![];if($gameMap[_0x30f470(0x21b)](_0x464445,_0x1db876,_0x438c88,this[_0x30f470(0x37b)]))return![];return VisuMZ['EventsMoveCore'][_0x30f470(0x228)][_0x30f470(0x5a1)]($gamePlayer,_0x464445,_0x1db876,_0x438c88);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x556)]=Game_Vehicle['prototype'][_0x2d0910(0x283)],Game_Vehicle[_0x2d0910(0x3c7)][_0x2d0910(0x283)]=function(_0x4816dc,_0x10f66f,_0x50fa71){const _0x51962f=_0x2d0910;if($gameMap[_0x51962f(0x520)](_0x4816dc,_0x10f66f,_0x50fa71,this[_0x51962f(0x37b)]))return!![];const _0x588bde=this[_0x51962f(0x37b)][_0x51962f(0x547)](0x0)[_0x51962f(0x3ea)]()+this[_0x51962f(0x37b)]['slice'](0x1),_0x5cc794=_0x51962f(0x30e)[_0x51962f(0x1cf)](_0x588bde);if(VisuMZ[_0x51962f(0x1f1)]['Settings'][_0x51962f(0x264)][_0x5cc794]){if(_0x51962f(0x60a)!==_0x51962f(0x60a))this[_0x51962f(0x1e4)]=!![],_0x5737c2[_0x51962f(0x1f1)][_0x51962f(0x598)][_0x51962f(0x5a1)](this),this['setupEventsMoveCoreEffects'](),this[_0x51962f(0x1e4)]=![];else return![];}else{if(_0x51962f(0x281)===_0x51962f(0x281))return VisuMZ['EventsMoveCore'][_0x51962f(0x556)][_0x51962f(0x5a1)](this,_0x4816dc,_0x10f66f,_0x50fa71);else{this[_0x51962f(0x58f)]=!![];return;}}},VisuMZ[_0x2d0910(0x1f1)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle['prototype'][_0x2d0910(0x1e2)],Game_Vehicle[_0x2d0910(0x3c7)][_0x2d0910(0x1e2)]=function(){const _0x319834=_0x2d0910;VisuMZ['EventsMoveCore'][_0x319834(0x4b9)]['call'](this);const _0x191e18=VisuMZ[_0x319834(0x1f1)]['Settings'][_0x319834(0x4a0)];if(this['isBoat']()){if(_0x319834(0x2b1)==='rDNBW'){const _0x35d42a=_0x319834(0x65e)['format'](_0x38e6b8,_0x3d01dc);_0x2cee32[_0x35d42a]&&(_0x515836[_0x35d42a]=_0x3153a7[_0x35d42a]['slice'](0x0));}else{if(_0x191e18[_0x319834(0x583)])this[_0x319834(0x29d)](_0x191e18[_0x319834(0x583)]);}}else{if(this['isShip']()){if(_0x191e18[_0x319834(0x581)])this['setMoveSpeed'](_0x191e18[_0x319834(0x581)]);}else{if(this['isAirship']()){if(_0x191e18[_0x319834(0x622)])this[_0x319834(0x29d)](_0x191e18[_0x319834(0x622)]);}}}},VisuMZ[_0x2d0910(0x1f1)]['Game_Event_initialize']=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x51c)],Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x51c)]=function(_0x478dcd,_0x247a53){const _0x2bfda5=_0x2d0910;VisuMZ[_0x2bfda5(0x1f1)][_0x2bfda5(0x557)][_0x2bfda5(0x5a1)](this,_0x478dcd,_0x247a53),this[_0x2bfda5(0x588)](),this[_0x2bfda5(0x28f)](),this[_0x2bfda5(0x42e)]();},Game_Map[_0x2d0910(0x3c7)][_0x2d0910(0x646)]=function(_0x540b23,_0x5c20a8){const _0x49a2e5=_0x2d0910;return _0x540b23===$gameMap[_0x49a2e5(0x1c1)]()?$dataMap['events'][_0x5c20a8]:VisuMZ['PreloadedMaps'][_0x540b23][_0x49a2e5(0x42d)][_0x5c20a8];},VisuMZ['EventsMoveCore'][_0x2d0910(0x333)]=Game_Event[_0x2d0910(0x3c7)]['event'],Game_Event['prototype'][_0x2d0910(0x3b6)]=function(){const _0x82f5e7=_0x2d0910;if(this[_0x82f5e7(0x314)]!==undefined){const _0x4d77fe=this[_0x82f5e7(0x314)][_0x82f5e7(0x1c1)],_0x3a647e=this['_eventMorphData'][_0x82f5e7(0x550)];return $gameMap[_0x82f5e7(0x646)](_0x4d77fe,_0x3a647e);}if(this[_0x82f5e7(0x2e0)]!==undefined){const _0x5bf860=this[_0x82f5e7(0x2e0)][_0x82f5e7(0x1c1)],_0x24dbdf=this[_0x82f5e7(0x2e0)][_0x82f5e7(0x550)];return $gameMap[_0x82f5e7(0x646)](_0x5bf860,_0x24dbdf);}if(this[_0x82f5e7(0x52d)]!==undefined){if('pWaLj'===_0x82f5e7(0x30a)){const _0x33d9c5=[_0x539295[_0x82f5e7(0x555)],_0x2d22d6[_0x82f5e7(0x4b1)],_0x82f5e7(0x682)[_0x82f5e7(0x1cf)](_0x147758)];return _0x23b52d['value'](_0x33d9c5);}else{const _0x15f921=this[_0x82f5e7(0x52d)][_0x82f5e7(0x1c1)],_0x2105af=this[_0x82f5e7(0x52d)][_0x82f5e7(0x550)];return $gameMap[_0x82f5e7(0x646)](_0x15f921,_0x2105af);}}if($gameTemp[_0x82f5e7(0x40f)]!==undefined){if(_0x82f5e7(0x214)==='FvLLE')this[_0x82f5e7(0x255)]=!![];else{const _0x3f3be6=$gameTemp[_0x82f5e7(0x40f)][_0x82f5e7(0x1c1)],_0x5f2104=$gameTemp[_0x82f5e7(0x40f)][_0x82f5e7(0x550)];return $gameMap[_0x82f5e7(0x646)](_0x3f3be6,_0x5f2104);}}return VisuMZ[_0x82f5e7(0x1f1)][_0x82f5e7(0x333)][_0x82f5e7(0x5a1)](this);},Game_Event['prototype'][_0x2d0910(0x259)]=function(_0x21192b,_0x29100a){const _0x1b244a=_0x2d0910;if(_0x21192b===0x0||_0x29100a===0x0)return![];if(!VisuMZ[_0x1b244a(0x613)][_0x21192b]&&_0x21192b!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&console[_0x1b244a(0x5db)](_0x1b244a(0x427)[_0x1b244a(0x1cf)](_0x21192b)),![];return!![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x66e)]=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x605)],Game_Event[_0x2d0910(0x3c7)]['start']=function(){const _0x4ad803=_0x2d0910;VisuMZ['EventsMoveCore'][_0x4ad803(0x66e)][_0x4ad803(0x5a1)](this),Imported[_0x4ad803(0x276)]&&Input['isPressed'](VisuMZ[_0x4ad803(0x41e)][_0x4ad803(0x48d)]['General'][_0x4ad803(0x36a)])&&Input['clear']();},Game_Event['prototype']['setupCopyEvent']=function(){const _0x598e4a=_0x2d0910,_0x4d49fd=this[_0x598e4a(0x3b6)]()[_0x598e4a(0x571)];if(_0x4d49fd==='')return;if(DataManager['isBattleTest']()||DataManager['isEventTest']())return;const _0x13c64b=VisuMZ[_0x598e4a(0x1f1)]['Settings'][_0x598e4a(0x625)];let _0x140d1d=null,_0x474670=0x0,_0x4464b1=0x0;if(_0x4d49fd[_0x598e4a(0x672)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))'vMmNV'!==_0x598e4a(0x2a4)?(_0x474670=Number(RegExp['$1']),_0x4464b1=Number(RegExp['$2'])):(this[_0x598e4a(0x38f)]['regionList']=_0x4efb8a[_0x598e4a(0x36d)]('['+_0x4014e3['$1']['match'](/\d+/g)+']'),this['_activationProximity'][_0x598e4a(0x528)]='region');else{if(_0x4d49fd[_0x598e4a(0x672)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x474670=Number(RegExp['$1']),_0x4464b1=Number(RegExp['$2']);else{if(_0x4d49fd['match'](/<COPY EVENT:[ ](.*?)>/i)){if(_0x598e4a(0x3ac)!==_0x598e4a(0x4ae)){const _0x1d7155=String(RegExp['$1'])[_0x598e4a(0x3ea)]()[_0x598e4a(0x61f)]();_0x140d1d=VisuMZ[_0x598e4a(0x5a8)][_0x1d7155];if(!_0x140d1d)return;_0x474670=_0x140d1d[_0x598e4a(0x435)],_0x4464b1=_0x140d1d[_0x598e4a(0x3d8)];}else{const _0x35c211=new _0x589f29(0x0,0x0,0x1,0x1);this[_0x598e4a(0x1b6)]=new _0x121200(_0x35c211),this[_0x598e4a(0x1b6)][_0x598e4a(0x52b)]=0x0;}}}}if(!this['checkValidEventerMap'](_0x474670,_0x4464b1))return;_0x13c64b[_0x598e4a(0x33c)][_0x598e4a(0x5a1)](this,_0x474670,_0x4464b1,this);if(_0x140d1d)_0x140d1d[_0x598e4a(0x33c)]['call'](this,_0x474670,_0x4464b1,this);this['_eventCopyData']={'mapId':_0x474670,'eventId':_0x4464b1},this[_0x598e4a(0x34a)]=-0x2,this['refresh'](),_0x13c64b[_0x598e4a(0x234)][_0x598e4a(0x5a1)](this,_0x474670,_0x4464b1,this);if(_0x140d1d)_0x140d1d[_0x598e4a(0x234)][_0x598e4a(0x5a1)](this,_0x474670,_0x4464b1,this);$gameMap[_0x598e4a(0x403)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x28f)]=function(){const _0x12c507=_0x2d0910,_0x77eaf4=$gameSystem[_0x12c507(0x2db)](this);if(!_0x77eaf4)return;const _0x5ce5a8=_0x77eaf4[_0x12c507(0x3df)]['toUpperCase']()[_0x12c507(0x61f)]();_0x5ce5a8!=='UNTITLED'?this[_0x12c507(0x29e)](_0x5ce5a8,!![]):this['morphInto'](_0x77eaf4['mapId'],_0x77eaf4[_0x12c507(0x550)],!![]);},Game_Event[_0x2d0910(0x3c7)]['morphInto']=function(_0x21928e,_0x74df36,_0x503a7e){const _0x358e84=_0x2d0910;if(!this['checkValidEventerMap'](_0x21928e,_0x74df36))return;const _0x2c49ae=VisuMZ['EventsMoveCore']['Settings']['Template'];if(!_0x503a7e)_0x2c49ae[_0x358e84(0x223)][_0x358e84(0x5a1)](this,_0x21928e,_0x74df36,this);this['_eventMorphData']={'mapId':_0x21928e,'eventId':_0x74df36},this[_0x358e84(0x34a)]=-0x2,this[_0x358e84(0x5fd)]();if(!_0x503a7e)_0x2c49ae[_0x358e84(0x615)][_0x358e84(0x5a1)](this,_0x21928e,_0x74df36,this);$gameMap[_0x358e84(0x403)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x29e)]=function(_0x190953,_0x4eaf9a){const _0x20ccd5=_0x2d0910;_0x190953=_0x190953[_0x20ccd5(0x3ea)]()[_0x20ccd5(0x61f)]();const _0x12bb84=VisuMZ[_0x20ccd5(0x5a8)][_0x190953];if(!_0x12bb84)return;const _0x374411=_0x12bb84['MapID'],_0x44b296=_0x12bb84[_0x20ccd5(0x3d8)];if(!this[_0x20ccd5(0x259)](_0x374411,_0x44b296))return;if(!_0x4eaf9a)_0x12bb84[_0x20ccd5(0x223)][_0x20ccd5(0x5a1)](this,_0x374411,_0x44b296,this);this['morphInto'](_0x374411,_0x44b296,_0x4eaf9a);if(!_0x4eaf9a)_0x12bb84['PostMorphJS'][_0x20ccd5(0x5a1)](this,_0x374411,_0x44b296,this);if($gameMap)$gameMap[_0x20ccd5(0x403)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x449)]=function(){const _0x2f63af=_0x2d0910;this['_eventMorphData']=undefined,this[_0x2f63af(0x34a)]=-0x2,this['refresh']();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x360)]=function(_0x58ba97){const _0xf842e2=_0x2d0910,_0x29bfde=VisuMZ[_0xf842e2(0x1f1)]['Settings'][_0xf842e2(0x625)],_0x4fb288=_0x58ba97['template'][_0xf842e2(0x3ea)]()[_0xf842e2(0x61f)](),_0x12ef04=!['',_0xf842e2(0x5df)]['includes'](_0x4fb288);let _0x256ddb=0x0,_0xa5b147=0x0;if(_0x12ef04){const _0x167d30=VisuMZ[_0xf842e2(0x5a8)][_0x4fb288];if(!_0x167d30)return;_0x256ddb=_0x167d30[_0xf842e2(0x435)],_0xa5b147=_0x167d30['EventID'];}else _0xf842e2(0x36b)===_0xf842e2(0x469)?(this[_0xf842e2(0x551)]=this[_0xf842e2(0x551)]||0x0,this[_0xf842e2(0x551)]=_0x109a2c,this[_0xf842e2(0x3e1)]=!![],this['_frames']=_0xc0a101[_0xf842e2(0x674)](0x1,this[_0xf842e2(0x551)])):(_0x256ddb=_0x58ba97[_0xf842e2(0x1c1)],_0xa5b147=_0x58ba97[_0xf842e2(0x550)]);if(!this[_0xf842e2(0x259)](_0x256ddb,_0xa5b147))return;if(_0x12ef04){const _0x6fc271=VisuMZ[_0xf842e2(0x5a8)][_0x4fb288];_0x6fc271[_0xf842e2(0x59a)]['call'](this,_0x256ddb,_0xa5b147,this);}_0x29bfde[_0xf842e2(0x59a)][_0xf842e2(0x5a1)](this,_0x256ddb,_0xa5b147,this),this[_0xf842e2(0x52d)]=_0x58ba97,this[_0xf842e2(0x34a)]=-0x2,this[_0xf842e2(0x555)]=$gameMap[_0xf842e2(0x1c1)](),this['_eventId']=_0x58ba97[_0xf842e2(0x2ad)],this['_spawnPreserved']=_0x58ba97[_0xf842e2(0x41b)],this[_0xf842e2(0x40a)](_0x58ba97['x'],_0x58ba97['y']),this['setDirection'](_0x58ba97[_0xf842e2(0x462)]),this['refresh']();if(_0x12ef04){const _0x329ef3=VisuMZ['EventTemplates'][_0x4fb288];if(!_0x329ef3)return;_0x329ef3[_0xf842e2(0x412)]['call'](this,_0x256ddb,_0xa5b147,this);}_0x29bfde[_0xf842e2(0x412)][_0xf842e2(0x5a1)](this,_0x256ddb,_0xa5b147,this);const _0x5221c4=SceneManager[_0xf842e2(0x389)];if(_0x5221c4&&_0x5221c4[_0xf842e2(0x5ba)])_0x5221c4[_0xf842e2(0x5ba)][_0xf842e2(0x340)](this);},Game_Event[_0x2d0910(0x3c7)]['isSpawnedEvent']=function(){const _0x56c8ad=_0x2d0910;return!!this[_0x56c8ad(0x52d)];},VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings']=Game_Event['prototype'][_0x2d0910(0x267)],Game_Event['prototype'][_0x2d0910(0x267)]=function(){const _0x71a85f=_0x2d0910;VisuMZ[_0x71a85f(0x1f1)]['Game_Event_clearPageSettings'][_0x71a85f(0x5a1)](this),this['initEventsMoveCoreEffects']();},VisuMZ['EventsMoveCore'][_0x2d0910(0x598)]=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x293)],Game_Event[_0x2d0910(0x3c7)]['setupPageSettings']=function(){const _0xb00b83=_0x2d0910;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0xb00b83(0x1f1)][_0xb00b83(0x598)][_0xb00b83(0x5a1)](this),this[_0xb00b83(0x20e)](),this[_0xb00b83(0x1e4)]=![];},Game_Event[_0x2d0910(0x3c7)]['setupEventsMoveCoreEffects']=function(){const _0x33f9f1=_0x2d0910;if(!this['event']())return;this['initEventsMoveCoreEffects'](),this[_0x33f9f1(0x409)](),this[_0x33f9f1(0x61d)](),this[_0x33f9f1(0x492)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x409)]=function(){const _0x3042c7=_0x2d0910,_0x5e3766=this[_0x3042c7(0x3b6)]()[_0x3042c7(0x571)];if(_0x5e3766==='')return;this[_0x3042c7(0x324)](_0x5e3766);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x61d)]=function(){const _0x143579=_0x2d0910;if(!this[_0x143579(0x3c9)]())return;const _0x269395=this[_0x143579(0x222)]();let _0x2e04e8='';for(const _0xeccb69 of _0x269395){if([0x6c,0x198][_0x143579(0x495)](_0xeccb69[_0x143579(0x213)])){if(_0x2e04e8!=='')_0x2e04e8+='\x0a';_0x2e04e8+=_0xeccb69[_0x143579(0x5e0)][0x0];}}this[_0x143579(0x324)](_0x2e04e8);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x386)]=function(){const _0x4bc1ef=_0x2d0910,_0x514842=VisuMZ[_0x4bc1ef(0x1f1)]['Settings'];this[_0x4bc1ef(0x38f)]={'type':_0x4bc1ef(0x5a6),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x4bc1ef(0x44c)]=![],this[_0x4bc1ef(0x38e)]=![],this[_0x4bc1ef(0x5ea)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x4bc1ef(0x26c)]=$gameSystem[_0x4bc1ef(0x1e8)](this),this[_0x4bc1ef(0x595)]={'text':'','visibleRange':_0x514842['Label'][_0x4bc1ef(0x523)],'offsetX':_0x514842[_0x4bc1ef(0x374)]['OffsetX'],'offsetY':_0x514842['Label'][_0x4bc1ef(0x1d1)]},this[_0x4bc1ef(0x5cb)]=![],this[_0x4bc1ef(0x511)]=[],this[_0x4bc1ef(0x28d)]={'target':-0x1,'type':_0x4bc1ef(0x436),'delay':0x1,'opacityDelta':0x0},this[_0x4bc1ef(0x448)]=_0x514842[_0x4bc1ef(0x4a0)]['RandomMoveWeight']??0x0,this[_0x4bc1ef(0x48e)]=![],this[_0x4bc1ef(0x29c)]={'visible':!![],'filename':_0x514842[_0x4bc1ef(0x4a0)][_0x4bc1ef(0x2a3)]},this[_0x4bc1ef(0x326)](),this['clearStepPattern']();},Game_Event[_0x2d0910(0x3c7)]['checkEventsMoveCoreStringTags']=function(_0x512a75){const _0x445371=_0x2d0910;if(_0x512a75[_0x445371(0x672)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x445371(0x38f)][_0x445371(0x623)]=JSON[_0x445371(0x36d)]('['+RegExp['$1'][_0x445371(0x672)](/\d+/g)+']'),this['_activationProximity'][_0x445371(0x528)]=_0x445371(0x29a);else{if(_0x512a75[_0x445371(0x672)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x445371(0x65c)!==_0x445371(0x65c)){if(_0x4e7c00[this['_callEventMap']])this[_0x445371(0x5ae)]='',this['startCallEvent']();else return!![];}else type=String(RegExp['$1'])[_0x445371(0x2b6)]()[_0x445371(0x61f)](),this[_0x445371(0x38f)][_0x445371(0x528)]=type,this['_activationProximity'][_0x445371(0x434)]=Number(RegExp['$2']);}}if(_0x512a75[_0x445371(0x672)](/<ALWAYS UPDATE MOVEMENT>/i)){if('dNAnl'==='dNAnl')this[_0x445371(0x68a)]=!![];else{if(_0x2c949a[_0x445371(0x69a)][_0x4d4916][_0x445371(0x672)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x281dc0['AdvancedSwitches'][_0x445371(0x3eb)](_0x535063);if(_0x51613f['switches'][_0x5907c7][_0x445371(0x672)](/<SELF>/i))_0x3122fa['SelfSwitches'][_0x445371(0x3eb)](_0x35fd91);if(_0x4603c7[_0x445371(0x69a)][_0x2d270e][_0x445371(0x672)](/<MAP>/i))_0x31180f[_0x445371(0x4a9)]['push'](_0x36fc7e);}}_0x512a75[_0x445371(0x672)](/<CLICK TRIGGER>/i)&&(this[_0x445371(0x44c)]=!![]);_0x512a75['match'](/<CUSTOM Z:[ ](.*?)>/i)&&(_0x445371(0x57f)!==_0x445371(0x529)?this['_customZ']=Number(RegExp['$1'])||0x0:_0x5c5732[_0x445371(0x3bc)](this[_0x445371(0x384)]));const _0x560100=_0x512a75[_0x445371(0x672)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x560100)for(const _0x10f587 of _0x560100){if(_0x10f587[_0x445371(0x672)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x381890=String(RegExp['$1'])[_0x445371(0x2b6)]()[_0x445371(0x61f)](),_0x180381=Number(RegExp['$2']);this[_0x445371(0x5ea)][_0x381890]=_0x180381;}}if(_0x512a75['match'](/<ICON:[ ](\d+)>/i)){if('qkbtk'!==_0x445371(0x65b))this['_eventIcon'][_0x445371(0x55a)]=Number(RegExp['$1']);else{let _0x532feb=_0x13aea1[_0x445371(0x5e0)][0x0];_0x532feb=this[_0x445371(0x2f1)](_0x532feb),_0x532feb=this[_0x445371(0x239)](_0x532feb),this[_0x445371(0x2ea)](_0x1ced0e,_0x532feb);}}_0x512a75[_0x445371(0x672)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x26c)]['bufferX']=Number(RegExp['$1']));if(_0x512a75[_0x445371(0x672)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x445371(0x220)!=='VAYgy')return!![];else this['_eventIcon']['bufferY']=Number(RegExp['$1']);}_0x512a75[_0x445371(0x672)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x26c)]['bufferX']=Number(RegExp['$1']),this[_0x445371(0x26c)][_0x445371(0x382)]=Number(RegExp['$2']));if(_0x512a75[_0x445371(0x672)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0xbb7d7c=String(RegExp['$1'])['toUpperCase']()[_0x445371(0x61f)](),_0x21b40a=[_0x445371(0x585),_0x445371(0x4dc),_0x445371(0x1c4),'SCREEN'];this['_eventIcon'][_0x445371(0x611)]=_0x21b40a[_0x445371(0x1c9)](_0xbb7d7c)[_0x445371(0x480)](0x0,0x3);}if(_0x512a75['match'](/<LABEL:[ ](.*?)>/i)){if(_0x445371(0x5c5)==='CQeIN')this[_0x445371(0x595)][_0x445371(0x393)]=String(RegExp['$1'])[_0x445371(0x61f)]();else return this['_forceShowPlayer']===_0x59846b&&this['setupPlayerVisibilityOverrides'](),this['_forceShowPlayer'];}if(_0x512a75['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x445371(0x487)==='GqAii')return![];else this['_labelWindow'][_0x445371(0x393)]=String(RegExp['$1'])[_0x445371(0x61f)]();}_0x512a75[_0x445371(0x672)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetX']=Number(RegExp['$1']));_0x512a75[_0x445371(0x672)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x595)]['offsetY']=Number(RegExp['$1']));_0x512a75[_0x445371(0x672)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x595)]['offsetX']=Number(RegExp['$1']),this[_0x445371(0x595)][_0x445371(0x655)]=Number(RegExp['$2']));$gameTemp[_0x445371(0x559)](this);for(;;){if(this['_labelWindow']['text'][_0x445371(0x672)](/\\V\[(\d+)\]/gi))this[_0x445371(0x595)][_0x445371(0x393)]=this[_0x445371(0x595)][_0x445371(0x393)][_0x445371(0x263)](/\\V\[(\d+)\]/gi,(_0x3c5359,_0x172a9f)=>$gameVariables[_0x445371(0x420)](parseInt(_0x172a9f)));else{if(_0x445371(0x4db)==='LsHVX')break;else this[_0x445371(0x2b0)]();}}$gameTemp[_0x445371(0x21d)]();_0x512a75['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x445371(0x595)]['visibleRange']=Number(RegExp['$1']));_0x512a75['match'](/<MIRROR SPRITE>/i)&&(this[_0x445371(0x5cb)]=!![]);if(_0x512a75[_0x445371(0x672)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x31489a=JSON['parse']('['+RegExp['$1'][_0x445371(0x672)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x445371(0x511)][_0x445371(0x500)](_0x31489a),this[_0x445371(0x511)]['remove'](0x0);}if(_0x512a75['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x13eae1=String(RegExp['$1']);if(_0x13eae1[_0x445371(0x672)](/PLAYER/i))this['_moveSynch'][_0x445371(0x204)]=0x0;else _0x13eae1[_0x445371(0x672)](/EVENT[ ](\d+)/i)&&(this['_moveSynch']['target']=Number(RegExp['$1']));}_0x512a75[_0x445371(0x672)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x445371(0x528)]=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x512a75[_0x445371(0x672)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if('LdVAM'===_0x445371(0x565))this[_0x445371(0x28d)][_0x445371(0x50b)]=Number(RegExp['$1']);else{if(_0x3a593a['isBattleTest']())return![];return _0x4a44c7[_0x445371(0x657)]['includes'](_0x1e0dc6);}}_0x512a75[_0x445371(0x672)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x445371(0x593)]=Number(RegExp['$1']));if(_0x512a75[_0x445371(0x672)](/<TRUE RANDOM MOVE>/i))this[_0x445371(0x448)]=0x0;else{if(_0x512a75['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x445371(0x3c6)!=='thFas'){if(_0x5ee83c[_0x445371(0x315)]())return;if(_0x22a40b[_0x445371(0x343)]())return;let _0x87c943=_0x492370['EventsMoveCore'][_0x445371(0x48d)][_0x445371(0x567)];const _0x5ca732=_0x445371(0x262)[_0x445371(0x1cf)](this['regionId']());_0x87c943[_0x5ca732]&&_0x51aac4['reserveCommonEvent'](_0x87c943[_0x5ca732]);}else this[_0x445371(0x448)]=Number(RegExp['$1'])||0x0;}}_0x512a75['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x445371(0x48e)]=!![]),_0x512a75[_0x445371(0x672)](/<HIDE SHADOW>/i)&&(this[_0x445371(0x29c)]['visible']=![]),_0x512a75[_0x445371(0x672)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x445371(0x29c)]['filename']=String(RegExp['$1'])),_0x512a75[_0x445371(0x672)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x445371(0x63d)!==_0x445371(0x356)?this[_0x445371(0x61b)]=Number(RegExp['$1']):this[_0x445371(0x1e5)]()),_0x512a75[_0x445371(0x672)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x28c)]=Number(RegExp['$1'])),_0x512a75[_0x445371(0x672)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x445371(0x61b)]=Number(RegExp['$1']),this[_0x445371(0x28c)]=Number(RegExp['$2'])),_0x512a75['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this['_stepPattern']=String(RegExp['$1'])[_0x445371(0x3ea)]()[_0x445371(0x61f)]());},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x492)]=function(){const _0x1a280f=_0x2d0910;this[_0x1a280f(0x53c)]();},Game_Event[_0x2d0910(0x3c7)]['isNearTheScreen']=function(){const _0x9a53c6=_0x2d0910;if(this[_0x9a53c6(0x68a)])return!![];return Game_Character[_0x9a53c6(0x3c7)][_0x9a53c6(0x62c)][_0x9a53c6(0x5a1)](this);},VisuMZ[_0x2d0910(0x1f1)]['Game_Event_updateSelfMovement']=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x230)],Game_Event[_0x2d0910(0x3c7)]['updateSelfMovement']=function(){const _0x262cac=_0x2d0910;if(this[_0x262cac(0x244)]())return;VisuMZ[_0x262cac(0x1f1)][_0x262cac(0x35d)][_0x262cac(0x5a1)](this);if(this[_0x262cac(0x2a9)]()){if('wmsbQ'===_0x262cac(0x3da))VisuMZ['MoveAllSynchTargets'](this[_0x262cac(0x4b1)]);else return this[_0x262cac(0x603)](_0x33e1f8(_0x579a2a['$1']));}},Game_Event[_0x2d0910(0x3c7)]['isPreventSelfMovement']=function(){const _0x520056=_0x2d0910,_0x37133d=VisuMZ[_0x520056(0x1f1)][_0x520056(0x48d)][_0x520056(0x4a0)];if($gameMap[_0x520056(0x315)]()&&_0x37133d[_0x520056(0x22d)])return!![];if($gameMessage[_0x520056(0x521)]()&&_0x37133d[_0x520056(0x4d6)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0x520056(0x37a)]()>=0x0)return!![];return![];},Game_Event[_0x2d0910(0x3c7)]['updateShadowChanges']=function(){const _0x1e396b=_0x2d0910,_0x3160eb=SceneManager[_0x1e396b(0x389)][_0x1e396b(0x5ba)];if(_0x3160eb){const _0x3c9a04=_0x3160eb[_0x1e396b(0x390)](this);if(_0x3c9a04&&_0x3c9a04[_0x1e396b(0x243)]&&_0x3c9a04[_0x1e396b(0x243)][_0x1e396b(0x271)]!==this[_0x1e396b(0x1ff)]()){if(_0x1e396b(0x522)!==_0x1e396b(0x426))_0x3c9a04[_0x1e396b(0x243)][_0x1e396b(0x271)]=this[_0x1e396b(0x1ff)](),_0x3c9a04[_0x1e396b(0x243)]['bitmap']=ImageManager[_0x1e396b(0x58e)](_0x3c9a04['_shadowSprite'][_0x1e396b(0x271)]);else{var _0x4d94ce=this['x']-this[_0x1e396b(0x5ea)][_0x1e396b(0x309)],_0xa9eeb=this['x']+this[_0x1e396b(0x5ea)][_0x1e396b(0x1be)],_0xd54ad0=this['y']-this[_0x1e396b(0x5ea)]['up'],_0x487e48=this['y']+this[_0x1e396b(0x5ea)]['down'];return _0x4d94ce<=_0x52650c&&_0x41c2ca<=_0xa9eeb&&_0xd54ad0<=_0x56b588&&_0x268763<=_0x487e48;}}}},Game_Event['prototype'][_0x2d0910(0x1ff)]=function(){const _0xf76756=_0x2d0910;return this['_shadowGraphic'][_0xf76756(0x47c)];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x5c2)]=function(){const _0x44ea3c=_0x2d0910;if(!this[_0x44ea3c(0x29c)]['visible'])return![];return Game_CharacterBase[_0x44ea3c(0x3c7)][_0x44ea3c(0x5c2)][_0x44ea3c(0x5a1)](this);},Game_Event[_0x2d0910(0x3c7)]['labelWindowText']=function(){const _0x224a28=_0x2d0910;return this[_0x224a28(0x595)][_0x224a28(0x393)];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x677)]=function(){const _0x2b47ac=_0x2d0910;return this[_0x2b47ac(0x595)][_0x2b47ac(0x444)];},Game_Event['prototype']['isMapPassable']=function(_0x54b197,_0x2880b7,_0x45f74a){const _0x3f3987=_0x2d0910;if(this['hasMoveOnlyRegions']())return this[_0x3f3987(0x2af)](_0x54b197,_0x2880b7,_0x45f74a);if($gameMap[_0x3f3987(0x219)](_0x54b197,_0x2880b7,_0x45f74a,_0x3f3987(0x3b6)))return!![];if($gameMap['isRegionForbidPass'](_0x54b197,_0x2880b7,_0x45f74a,_0x3f3987(0x3b6)))return![];return Game_Character['prototype'][_0x3f3987(0x60b)][_0x3f3987(0x5a1)](this,_0x54b197,_0x2880b7,_0x45f74a);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1f5)]=function(){const _0x444032=_0x2d0910;if(this[_0x444032(0x511)]===undefined)this[_0x444032(0x386)]();return this[_0x444032(0x511)][_0x444032(0x290)]>0x0;},Game_Event[_0x2d0910(0x3c7)]['isMoveOnlyRegionPassable']=function(_0x16a3bf,_0xf18d08,_0x93969e){const _0x8ce906=_0x2d0910,_0x5b93c1=$gameMap[_0x8ce906(0x49d)](_0x16a3bf,_0x93969e),_0x118419=$gameMap[_0x8ce906(0x53b)](_0xf18d08,_0x93969e),_0x509408=$gameMap[_0x8ce906(0x63a)](_0x5b93c1,_0x118419);return this[_0x8ce906(0x511)][_0x8ce906(0x495)](_0x509408);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x4e5)]=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1ee)],Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1ee)]=function(){const _0x43082d=_0x2d0910;return this[_0x43082d(0x255)]=![],this[_0x43082d(0x63c)]=![],this[_0x43082d(0x3b6)]()?VisuMZ[_0x43082d(0x1f1)][_0x43082d(0x4e5)][_0x43082d(0x5a1)](this):-0x1;},VisuMZ['EventsMoveCore'][_0x2d0910(0x40c)]=Game_Event['prototype'][_0x2d0910(0x265)],Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x265)]=function(_0x31e2a9){const _0x2d8975=_0x2d0910;this[_0x2d8975(0x5be)](_0x31e2a9),$gameTemp['registerSelfTarget'](this);const _0x26db9b=VisuMZ[_0x2d8975(0x1f1)][_0x2d8975(0x40c)]['call'](this,_0x31e2a9);return $gameTemp['clearSelfTarget'](),_0x26db9b;},Game_Event[_0x2d0910(0x3c7)]['hasAdvancedSwitchVariable']=function(){const _0x2cf314=_0x2d0910;return this[_0x2cf314(0x255)];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x5be)]=function(_0x4ade03){const _0x8f120f=_0x2d0910,_0x4a970b=_0x4ade03[_0x8f120f(0x66b)];if(_0x4a970b[_0x8f120f(0x27e)]&&DataManager[_0x8f120f(0x5f3)](_0x4a970b[_0x8f120f(0x619)]))'ZEHFR'===_0x8f120f(0x3ab)?this[_0x8f120f(0x255)]=!![]:this['updateShadowChanges']();else{if(_0x4a970b['switch2Valid']&&DataManager[_0x8f120f(0x5f3)](_0x4a970b[_0x8f120f(0x2ac)]))this[_0x8f120f(0x255)]=!![];else _0x4a970b[_0x8f120f(0x518)]&&DataManager['isAdvancedVariable'](_0x4a970b['variableId'])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event['prototype'][_0x2d0910(0x496)]=function(){const _0x1e96b9=_0x2d0910;if(this[_0x1e96b9(0x3bd)])return![];return this['_clickTrigger'];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x48b)]=function(){const _0x26a2de=_0x2d0910;$gameTemp[_0x26a2de(0x4b4)](),this['start']();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x2ee)]=function(_0x1f2dcd,_0x553fc7){const _0x391edf=_0x2d0910;if(this[_0x391edf(0x5ea)]){if(_0x391edf(0x69f)===_0x391edf(0x3f7))_0x3ac5ea[_0x391edf(0x3eb)](0x1,0x3,0x7,0x9);else return this[_0x391edf(0x3d0)](_0x1f2dcd,_0x553fc7);}else{if(_0x391edf(0x626)!==_0x391edf(0x687))return Game_Character[_0x391edf(0x3c7)][_0x391edf(0x2ee)]['call'](this,_0x1f2dcd,_0x553fc7);else{if(!this[_0x391edf(0x259)](_0x3f5011,_0x474bb2))return;const _0x5d1bcb=_0x2eb7ba['EventsMoveCore'][_0x391edf(0x48d)][_0x391edf(0x625)];if(!_0x4b8929)_0x5d1bcb['PreMorphJS'][_0x391edf(0x5a1)](this,_0x3336d8,_0x1bfb88,this);this[_0x391edf(0x314)]={'mapId':_0x5c93ec,'eventId':_0x1bd8d3},this[_0x391edf(0x34a)]=-0x2,this['refresh']();if(!_0x575b9b)_0x5d1bcb[_0x391edf(0x615)]['call'](this,_0x4200e4,_0x7019d7,this);_0x3bbb16['clearEventCache']();}}},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x3d0)]=function(_0x27db6a,_0x4fed04){const _0x4d76d8=_0x2d0910;var _0xbe5282=this['x']-this[_0x4d76d8(0x5ea)]['left'],_0x206bc3=this['x']+this[_0x4d76d8(0x5ea)][_0x4d76d8(0x1be)],_0x5d4745=this['y']-this[_0x4d76d8(0x5ea)]['up'],_0x280188=this['y']+this[_0x4d76d8(0x5ea)][_0x4d76d8(0x218)];return _0xbe5282<=_0x27db6a&&_0x27db6a<=_0x206bc3&&_0x5d4745<=_0x4fed04&&_0x4fed04<=_0x280188;},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x251)]=function(_0xf79bf4,_0x322bad,_0x4c9126){const _0x288aa2=_0x2d0910;for(let _0x4f5c2f=-this[_0x288aa2(0x5ea)][_0x288aa2(0x309)];_0x4f5c2f<=this[_0x288aa2(0x5ea)][_0x288aa2(0x1be)];_0x4f5c2f++){for(let _0x113e2b=-this[_0x288aa2(0x5ea)]['up'];_0x113e2b<=this[_0x288aa2(0x5ea)][_0x288aa2(0x218)];_0x113e2b++){if(!Game_Character[_0x288aa2(0x3c7)][_0x288aa2(0x251)][_0x288aa2(0x5a1)](this,_0xf79bf4+_0x4f5c2f,_0x322bad+_0x113e2b,_0x4c9126))return![];}}return!![];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1ec)]=function(_0x3fa008,_0x1f275a){const _0xcf90e3=_0x2d0910;if(Imported[_0xcf90e3(0x508)]&&this[_0xcf90e3(0x2a5)]())return this[_0xcf90e3(0x592)](_0x3fa008,_0x1f275a);else{if(_0xcf90e3(0x398)===_0xcf90e3(0x1e9)){if(this[_0xcf90e3(0x1f5)]())return this[_0xcf90e3(0x2af)](_0x511877,_0x355ae3,_0x340808);if(_0x1f2305[_0xcf90e3(0x219)](_0x35a161,_0x309d64,_0xffca75,'event'))return!![];if(_0x463346[_0xcf90e3(0x21b)](_0x2fddb5,_0x1bca66,_0x40c464,_0xcf90e3(0x3b6)))return![];return _0x17591f[_0xcf90e3(0x3c7)][_0xcf90e3(0x60b)][_0xcf90e3(0x5a1)](this,_0x3a0e13,_0x1ab9e2,_0x7d90df);}else{const _0x3ce311=$gameMap[_0xcf90e3(0x47d)](_0x3fa008,_0x1f275a)[_0xcf90e3(0x2cc)](_0x7ba2d0=>_0x7ba2d0!==this);return _0x3ce311[_0xcf90e3(0x290)]>0x0;}}},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x592)]=function(_0x1ec7be,_0x4a453d){const _0x20ca7e=_0x2d0910;if(!this[_0x20ca7e(0x1d8)]())return![];else{const _0x44f1f3=$gameMap[_0x20ca7e(0x47d)](_0x1ec7be,_0x4a453d)[_0x20ca7e(0x2cc)](_0x2f9502=>_0x2f9502!==this&&_0x2f9502[_0x20ca7e(0x1d8)]());return _0x44f1f3[_0x20ca7e(0x290)]>0x0;}},Game_Event[_0x2d0910(0x3c7)]['activationProximityType']=function(){const _0xba3220=_0x2d0910;return this['_activationProximity']['type']||_0xba3220(0x5a6);},Game_Event['prototype'][_0x2d0910(0x294)]=function(){const _0xc1bb85=_0x2d0910;return this[_0xc1bb85(0x38f)]['distance']||0x0;},Game_Event['prototype']['activationRegionList']=function(){const _0x4f6d01=_0x2d0910;return this[_0x4f6d01(0x38f)]['regionList']||[];},Game_Event['prototype'][_0x2d0910(0x4e0)]=function(){const _0x1fbb71=_0x2d0910;Game_Character['prototype'][_0x1fbb71(0x4e0)]['call'](this);if([_0x1fbb71(0x5a6),_0x1fbb71(0x29a)]['includes'](this['activationProximityType']()))return;$gamePlayer[_0x1fbb71(0x620)]([0x2]);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x501)]=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x5b2)],Game_Event[_0x2d0910(0x3c7)]['checkEventTriggerAuto']=function(){const _0x2ef4d9=_0x2d0910;if(this[_0x2ef4d9(0x2e2)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x2ef4d9(0x66c)](![]))return;VisuMZ[_0x2ef4d9(0x1f1)][_0x2ef4d9(0x501)][_0x2ef4d9(0x5a1)](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event['prototype'][_0x2d0910(0x5d3)],Game_Event['prototype']['updateParallel']=function(){const _0x5383ee=_0x2d0910;if(!this['_interpreter'])return;if(!this[_0x5383ee(0x24d)](!![]))return;if(!this[_0x5383ee(0x66c)](!![]))return;VisuMZ['EventsMoveCore']['Game_Event_updateParallel'][_0x5383ee(0x5a1)](this);},Game_Event[_0x2d0910(0x3c7)]['checkRegionEventTrigger']=function(_0x504377){const _0x54ecd6=_0x2d0910;if(!_0x504377&&$gameMap[_0x54ecd6(0x315)]())return![];if(!_0x504377&&$gameMap[_0x54ecd6(0x343)]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x54ecd6(0x608)](this);},Game_Event[_0x2d0910(0x3c7)]['checkActivationProximity']=function(_0x5e8a66){const _0x536cce=_0x2d0910;if(!_0x5e8a66&&$gameMap[_0x536cce(0x315)]())return![];if(!_0x5e8a66&&$gameMap[_0x536cce(0x343)]())return![];if([_0x536cce(0x5a6),_0x536cce(0x29a)][_0x536cce(0x495)](this[_0x536cce(0x1d6)]()))return!![];return $gamePlayer[_0x536cce(0x5d8)](this);},VisuMZ['MoveAllSynchTargets']=function(_0x412adf){const _0x1cf427=_0x2d0910;for(const _0x18504b of $gameMap[_0x1cf427(0x42d)]()){if(!_0x18504b)continue;_0x18504b[_0x1cf427(0x37a)]()===_0x412adf&&_0x18504b[_0x1cf427(0x3c3)]();}},VisuMZ[_0x2d0910(0x546)]=function(_0x36d2fb){const _0x25bd0e=_0x2d0910;if(_0x36d2fb===0x0)return $gamePlayer;return $gameMap[_0x25bd0e(0x3b6)](_0x36d2fb);},Game_Event['prototype'][_0x2d0910(0x37a)]=function(){const _0x46f5c9=_0x2d0910;return this[_0x46f5c9(0x28d)]['target'];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x37d)]=function(){const _0x20e94c=_0x2d0910;return this[_0x20e94c(0x28d)][_0x20e94c(0x528)];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x2f9)]=function(){const _0x3b29a4=_0x2d0910;if(this[_0x3b29a4(0x37a)]()>=0x0){const _0x15ee88=VisuMZ[_0x3b29a4(0x546)](this[_0x3b29a4(0x37a)]());if(_0x15ee88)return _0x15ee88[_0x3b29a4(0x2f9)]();}return Game_Character['prototype'][_0x3b29a4(0x2f9)][_0x3b29a4(0x5a1)](this);},Game_Event['prototype'][_0x2d0910(0x3c3)]=function(){const _0xdd3337=_0x2d0910;this[_0xdd3337(0x28d)][_0xdd3337(0x43d)]=this[_0xdd3337(0x28d)][_0xdd3337(0x43d)]||0x0,this[_0xdd3337(0x28d)]['timer']--;if(this[_0xdd3337(0x28d)][_0xdd3337(0x43d)]>0x0)return;this[_0xdd3337(0x28d)][_0xdd3337(0x43d)]=this[_0xdd3337(0x28d)][_0xdd3337(0x50b)],this['processMoveSynch']();},Game_Event['prototype']['adjustMoveSynchOpacityDelta']=function(_0x517794){const _0x27a345=_0x2d0910;if(this['moveSynchTarget']()>=0x0){if(_0x27a345(0x34b)===_0x27a345(0x3d7))_0x38920a=_0x4f793a['replace'](_0x183bf9,(_0x1c4ca5,_0x3b2a9a)=>_0x594bbc[_0x27a345(0x420)](_0x679493(_0x3b2a9a)));else{const _0x5bab1c=VisuMZ[_0x27a345(0x546)](this[_0x27a345(0x37a)]());if(_0x5bab1c){if(_0x27a345(0x3a7)!==_0x27a345(0x380)){const _0x455941=$gameMap['distance'](this[_0x27a345(0x558)],this[_0x27a345(0x285)],_0x5bab1c[_0x27a345(0x558)],_0x5bab1c[_0x27a345(0x285)])-0x1,_0x236acb=Math[_0x27a345(0x46f)]($gameMap[_0x27a345(0x392)](),$gameMap[_0x27a345(0x47a)]()),_0x40c631=this[_0x27a345(0x28d)][_0x27a345(0x593)]||0x0;_0x517794-=Math[_0x27a345(0x674)](0x0,_0x455941)*_0x236acb*_0x40c631;}else return _0x36bdb9['followers']()[_0x27a345(0x5a0)](_0x27300a-0x1);}}}return _0x517794;},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x5c6)]=function(){const _0xdf6898=_0x2d0910;switch(this['moveSynchType']()){case _0xdf6898(0x436):this['processMoveSynchRandom']();break;case _0xdf6898(0x4d8):this[_0xdf6898(0x1d2)]();break;case _0xdf6898(0x2cf):this[_0xdf6898(0x335)]();break;case _0xdf6898(0x686):this['processMoveSynchCustom']();break;case _0xdf6898(0x248):case'copy':this[_0xdf6898(0x51b)]();break;case _0xdf6898(0x667):case _0xdf6898(0x200):this[_0xdf6898(0x238)]();break;case _0xdf6898(0x474):case _0xdf6898(0x5e7):case _0xdf6898(0x678):case _0xdf6898(0x55f):this[_0xdf6898(0x2d8)]();break;case'mirror\x20vertical':case _0xdf6898(0x4bf):case'mirror\x20vert':case _0xdf6898(0x52f):this['processMoveSynchMirrorVert']();break;default:this[_0xdf6898(0x4a3)]();break;}this['update']();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x4a3)]=function(){const _0x334270=_0x2d0910,_0x559162=[0x2,0x4,0x6,0x8];$gameMap[_0x334270(0x44a)]()&&_0x559162[_0x334270(0x3eb)](0x1,0x3,0x7,0x9);const _0x4d791d=[];for(const _0x2bf522 of _0x559162){if(this[_0x334270(0x251)](this['x'],this['y'],_0x2bf522))_0x4d791d[_0x334270(0x3eb)](_0x2bf522);}if(_0x4d791d['length']>0x0){const _0x12fc86=_0x4d791d[Math[_0x334270(0x44d)](_0x4d791d[_0x334270(0x290)])];this['executeMoveDir8'](_0x12fc86);}},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1d2)]=function(){const _0xf2cc17=_0x2d0910,_0x5bedba=VisuMZ['GetMoveSynchTarget'](this[_0xf2cc17(0x37a)]());this[_0xf2cc17(0x30c)](_0x5bedba);},Game_Event['prototype'][_0x2d0910(0x335)]=function(){const _0x21c05a=_0x2d0910,_0x5e4452=VisuMZ[_0x21c05a(0x546)](this[_0x21c05a(0x37a)]());this[_0x21c05a(0x1cd)](_0x5e4452);},Game_Event['prototype'][_0x2d0910(0x38d)]=function(){const _0x49e276=_0x2d0910;this[_0x49e276(0x63f)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x51b)]=function(){const _0x13cb87=_0x2d0910,_0x4f77b9=VisuMZ['GetMoveSynchTarget'](this[_0x13cb87(0x37a)]());this[_0x13cb87(0x2b3)](_0x4f77b9[_0x13cb87(0x589)]());},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x238)]=function(){const _0xc98874=_0x2d0910,_0x451bd6=VisuMZ[_0xc98874(0x546)](this[_0xc98874(0x37a)]());this[_0xc98874(0x2b3)](this[_0xc98874(0x62a)](_0x451bd6[_0xc98874(0x589)]()));},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x2d8)]=function(){const _0x326a46=_0x2d0910,_0x4be376=VisuMZ[_0x326a46(0x546)](this[_0x326a46(0x37a)]()),_0x2f54ea=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x4be376[_0x326a46(0x589)]()];this[_0x326a46(0x2b3)](_0x2f54ea);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x4a5)]=function(){const _0x148bc5=_0x2d0910,_0x58e957=VisuMZ[_0x148bc5(0x546)](this['moveSynchTarget']()),_0xa56257=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x58e957[_0x148bc5(0x589)]()];this[_0x148bc5(0x2b3)](_0xa56257);},Game_Event[_0x2d0910(0x3c7)]['restoreSavedEventPosition']=function(){const _0x434d7a=_0x2d0910,_0x45f575=$gameSystem[_0x434d7a(0x378)](this);if(!_0x45f575)return;this[_0x434d7a(0x40a)](_0x45f575['x'],_0x45f575['y']),this[_0x434d7a(0x2ca)](_0x45f575[_0x434d7a(0x462)]),this[_0x434d7a(0x34a)]===_0x45f575['pageIndex']&&(_0x434d7a(0x1ef)!==_0x434d7a(0x42b)?this['_moveRouteIndex']=_0x45f575[_0x434d7a(0x538)]:this[_0x434d7a(0x630)]());},Game_Event[_0x2d0910(0x3c7)]['updateMove']=function(){const _0x12e868=_0x2d0910;Game_Character[_0x12e868(0x3c7)][_0x12e868(0x26a)]['call'](this),this[_0x12e868(0x34e)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x5f7)]=function(){const _0x33c2b4=_0x2d0910;if($gameMap[_0x33c2b4(0x637)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x34e)]=function(){const _0x3f0bec=_0x2d0910;if(!this[_0x3f0bec(0x5f7)]())return;this[_0x3f0bec(0x575)]();},Game_Event['prototype'][_0x2d0910(0x575)]=function(){$gameSystem['saveEventLocation'](this);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x45a)]=function(){const _0x1a431a=_0x2d0910;$gameSystem[_0x1a431a(0x4aa)](this);},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x1e8)]=function(){const _0x14b17f=_0x2d0910;return $gameSystem[_0x14b17f(0x1e8)](this)?Game_Character[_0x14b17f(0x3c7)][_0x14b17f(0x1e8)][_0x14b17f(0x5a1)](this):{'iconIndex':0x0,'bufferX':settings[_0x14b17f(0x4ab)]['BufferX'],'bufferY':settings[_0x14b17f(0x4ab)][_0x14b17f(0x1bb)],'blendMode':settings['Icon'][_0x14b17f(0x2d9)]};},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x330)]=function(){const _0x5d6b40=_0x2d0910;return this[_0x5d6b40(0x63c)];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x29b)]=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x265)],Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x265)]=function(_0xd4eb19){const _0x39dc39=_0x2d0910,_0x25e420=VisuMZ[_0x39dc39(0x1f1)][_0x39dc39(0x29b)][_0x39dc39(0x5a1)](this,_0xd4eb19);if(!_0x25e420)return![];return this['meetsCPC'](_0xd4eb19);},Game_Event['prototype']['meetsCPC']=function(_0x523425){const _0x4777e2=_0x2d0910;VisuMZ[_0x4777e2(0x1f1)][_0x4777e2(0x2e3)][_0x4777e2(0x664)](_0x523425),this[_0x4777e2(0x63c)]=_0x523425['CPC']['length']>0x0;_0x523425[_0x4777e2(0x308)]===undefined&&VisuMZ[_0x4777e2(0x1f1)][_0x4777e2(0x2e3)][_0x4777e2(0x664)](_0x523425);if(_0x523425[_0x4777e2(0x308)][_0x4777e2(0x290)]>0x0)return _0x4777e2(0x221)===_0x4777e2(0x4e4)?this['processMoveRouteFadeIn'](_0x47cca6(_0x2d0c4c['$1'])):$gameMap['event'](this[_0x4777e2(0x4b1)])&&VisuMZ[_0x4777e2(0x1f1)][_0x4777e2(0x2e3)][_0x4777e2(0x5d1)](_0x523425[_0x4777e2(0x308)],this[_0x4777e2(0x4b1)]);return!![];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x454)]=Game_Troop[_0x2d0910(0x3c7)]['meetsConditions'],Game_Troop['prototype'][_0x2d0910(0x265)]=function(_0x19ddaa){const _0x24e0f5=_0x2d0910;var _0x1c0830=VisuMZ['EventsMoveCore'][_0x24e0f5(0x454)][_0x24e0f5(0x5a1)](this,_0x19ddaa);return _0x1c0830&&this[_0x24e0f5(0x227)](_0x19ddaa);},Game_Troop[_0x2d0910(0x3c7)][_0x2d0910(0x227)]=function(_0x3f153c){const _0x1882e5=_0x2d0910;_0x3f153c['CPC']===undefined&&VisuMZ[_0x1882e5(0x1f1)][_0x1882e5(0x2e3)]['loadCPC'](_0x3f153c);if(_0x3f153c[_0x1882e5(0x308)]['length']>0x0)return VisuMZ[_0x1882e5(0x1f1)][_0x1882e5(0x2e3)]['metCPC'](_0x3f153c['CPC'],0x0);return!![];},VisuMZ[_0x2d0910(0x1f1)]['Game_Event_locate']=Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x40a)],Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x40a)]=function(_0x4c079e,_0x2604ed){const _0xd6d926=_0x2d0910;VisuMZ[_0xd6d926(0x1f1)][_0xd6d926(0x51d)][_0xd6d926(0x5a1)](this,_0x4c079e,_0x2604ed),this[_0xd6d926(0x455)]=_0x4c079e,this[_0xd6d926(0x405)]=_0x2604ed;},VisuMZ['EventsMoveCore'][_0x2d0910(0x1f0)]=Game_Event['prototype']['moveTypeRandom'],Game_Event['prototype'][_0x2d0910(0x530)]=function(){const _0x119587=_0x2d0910,_0x44433d=$gameMap[_0x119587(0x434)](this['x'],this['y'],this[_0x119587(0x455)],this[_0x119587(0x405)]),_0x2fdf36=_0x44433d*(this[_0x119587(0x448)]||0x0);Math['random']()>=_0x2fdf36?VisuMZ['EventsMoveCore'][_0x119587(0x1f0)][_0x119587(0x5a1)](this):this[_0x119587(0x3ba)]();},Game_Event[_0x2d0910(0x3c7)][_0x2d0910(0x3ba)]=function(){const _0x2a5965=_0x2d0910,_0x517842=this['deltaXFrom'](this['_randomHomeX']),_0x563aff=this[_0x2a5965(0x43c)](this[_0x2a5965(0x405)]);if(Math[_0x2a5965(0x23a)](_0x517842)>Math[_0x2a5965(0x23a)](_0x563aff)){if(_0x2a5965(0x22a)!=='mtkWv'){if(!this['isPassableByAnyDirection'](_0x26b564,_0x52ee55))return![];}else this['moveStraight'](_0x517842>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x563aff!==0x0&&this[_0x2a5965(0x497)](_0x563aff>0x0?0x8:0x2);}else _0x563aff!==0x0&&(this[_0x2a5965(0x497)](_0x563aff>0x0?0x8:0x2),!this[_0x2a5965(0x1dd)]()&&_0x517842!==0x0&&this[_0x2a5965(0x497)](_0x517842>0x0?0x4:0x6));},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2ba)]=Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x662)],Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x662)]=function(){const _0x216917=_0x2d0910;if(this[_0x216917(0x5ae)]==='CallEvent'){if(window[this[_0x216917(0x645)]]){if(_0x216917(0x58d)===_0x216917(0x2ed))return _0x1d5b09[_0x216917(0x1f1)][_0x216917(0x48d)][_0x216917(0x2ae)][_0x216917(0x4e2)];else this[_0x216917(0x5ae)]='',this[_0x216917(0x273)]();}else return!![];}else{if(_0x216917(0x513)!==_0x216917(0x1d9))return VisuMZ['EventsMoveCore'][_0x216917(0x2ba)][_0x216917(0x5a1)](this);else{const _0x2d3558=_0x44972c['conditions'];if(_0x2d3558[_0x216917(0x27e)]&&_0x5ee82c[_0x216917(0x5f3)](_0x2d3558[_0x216917(0x619)]))this[_0x216917(0x255)]=!![];else{if(_0x2d3558[_0x216917(0x233)]&&_0x4b6abb[_0x216917(0x5f3)](_0x2d3558[_0x216917(0x2ac)]))this[_0x216917(0x255)]=!![];else _0x2d3558['variableValid']&&_0x565d86['isAdvancedVariable'](_0x2d3558[_0x216917(0x54f)])&&(this[_0x216917(0x255)]=!![]);}}}},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x45d)]=Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x2a7)],Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x2a7)]=function(){const _0x57fba3=_0x2d0910,_0x361334=$gameMap&&this['_eventId']?$gameMap[_0x57fba3(0x3b6)](this['_eventId']):null;$gameTemp[_0x57fba3(0x559)](_0x361334);const _0x36c44b=VisuMZ[_0x57fba3(0x1f1)][_0x57fba3(0x45d)][_0x57fba3(0x5a1)](this);return $gameTemp['clearSelfTarget'](),_0x36c44b;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x4cf)]=Game_Interpreter[_0x2d0910(0x3c7)]['command357'],Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x4c5)]=function(_0x109f31){const _0xfcb23e=_0x2d0910;return $gameTemp[_0xfcb23e(0x3b1)](this),VisuMZ[_0xfcb23e(0x1f1)][_0xfcb23e(0x4cf)][_0xfcb23e(0x5a1)](this,_0x109f31);},Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x347)]=function(_0x574f02){const _0x258b6c=_0x2d0910;this[_0x258b6c(0x3a8)]=_0x574f02;const _0xde9aa1='Map%1.json'[_0x258b6c(0x1cf)](_0x574f02['mapId'][_0x258b6c(0x431)](0x3));this[_0x258b6c(0x645)]='$callEventMap'+Graphics[_0x258b6c(0x49a)]+'_'+this['eventId'](),DataManager[_0x258b6c(0x376)](this[_0x258b6c(0x645)],_0xde9aa1);if(window[this[_0x258b6c(0x645)]]){if('lAYnY'===_0x258b6c(0x24e))return _0x4d6a09[_0x258b6c(0x48b)](),!![];else this[_0x258b6c(0x273)]();}else _0x258b6c(0x201)===_0x258b6c(0x201)?this[_0x258b6c(0x25a)]('CallEvent'):(_0x33aea3['EventsMoveCore']['Spriteset_Map_createShadow'][_0x258b6c(0x5a1)](this),this[_0x258b6c(0x443)]());},Game_Interpreter[_0x2d0910(0x3c7)][_0x2d0910(0x273)]=function(){const _0x32ef0a=_0x2d0910,_0x229649=this['_callEventData'],_0x5273ad=window[this[_0x32ef0a(0x645)]],_0x36710a=_0x5273ad[_0x32ef0a(0x42d)][_0x229649[_0x32ef0a(0x550)]];if(_0x36710a&&_0x36710a['pages'][_0x229649[_0x32ef0a(0x3c8)]-0x1]){if(_0x32ef0a(0x609)===_0x32ef0a(0x627)){_0x4155bb['_spawnData']=_0x4a21e9;const _0x593112=new _0x51da82(_0x32920b[_0x32ef0a(0x1c1)],_0x1fb03a['eventId']);_0xcc8867[_0x32ef0a(0x40f)]=_0x2abc4d,_0x593112[_0x32ef0a(0x5fd)]();let _0x255019=_0x1f168a-_0x593112[_0x32ef0a(0x5ea)][_0x32ef0a(0x309)],_0x434891=_0x43748d+_0x593112[_0x32ef0a(0x5ea)][_0x32ef0a(0x309)],_0x1f5da3=_0x5b58db-_0x593112[_0x32ef0a(0x5ea)]['up'],_0x1325f6=_0x1e5910+_0x593112[_0x32ef0a(0x5ea)][_0x32ef0a(0x218)];for(let _0x4a0df4=_0x255019;_0x4a0df4<=_0x434891;_0x4a0df4++){for(let _0x2a46a9=_0x1f5da3;_0x2a46a9<=_0x1325f6;_0x2a46a9++){if(this[_0x32ef0a(0x62e)](_0x4a0df4,_0x2a46a9))return![];}}return!![];}else{const _0x23ffdd=_0x36710a[_0x32ef0a(0x3e2)][_0x229649[_0x32ef0a(0x3c8)]-0x1][_0x32ef0a(0x222)];this[_0x32ef0a(0x26f)](_0x23ffdd,this['eventId']());}}window[this['_callEventMap']]=undefined,this[_0x32ef0a(0x645)]=undefined,this[_0x32ef0a(0x3a8)]=undefined;};function Game_CPCInterpreter(){const _0x12bad3=_0x2d0910;this[_0x12bad3(0x51c)][_0x12bad3(0x216)](this,arguments);}function _0x1c00(_0x3569c8,_0x619d03){const _0xc9b235=_0xc9b2();return _0x1c00=function(_0x1c00ab,_0x5d4e68){_0x1c00ab=_0x1c00ab-0x1b5;let _0x37101b=_0xc9b235[_0x1c00ab];return _0x37101b;},_0x1c00(_0x3569c8,_0x619d03);};Game_CPCInterpreter['prototype']=Object[_0x2d0910(0x32e)](Game_Interpreter[_0x2d0910(0x3c7)]),Game_CPCInterpreter['prototype'][_0x2d0910(0x3a1)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x2d0910(0x3c7)][_0x2d0910(0x241)]=function(){const _0xca7946=_0x2d0910;Game_Interpreter[_0xca7946(0x3c7)]['clear']['call'](this),this[_0xca7946(0x52e)]=![];},Game_CPCInterpreter[_0x2d0910(0x3c7)][_0x2d0910(0x2bd)]=function(){const _0xe0e11a=_0x2d0910;while(this[_0xe0e11a(0x258)]()){if(_0xe0e11a(0x2a6)!==_0xe0e11a(0x46c))this[_0xe0e11a(0x2a7)]();else{this[_0xe0e11a(0x564)]=this[_0xe0e11a(0x564)]||0x0;if(this[_0xe0e11a(0x564)]>0x0){this[_0xe0e11a(0x564)]--;if(this[_0xe0e11a(0x564)]<=0x0&&this['_pose']!=='ZZZ')this['clearPose']();}}}},Game_CPCInterpreter['prototype'][_0x2d0910(0x361)]=function(_0x156f8a){const _0x1e6ecf=_0x2d0910;Game_Interpreter[_0x1e6ecf(0x3c7)][_0x1e6ecf(0x361)][_0x1e6ecf(0x5a1)](this,_0x156f8a);if(this[_0x1e6ecf(0x26e)][_0x1e6ecf(0x1da)](_0x32ae0a=>_0x32ae0a['match'](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x1e6ecf(0x553)==='QXRyh')return this[_0x1e6ecf(0x3f1)](_0x45d168(_0x52fcf2['$1']));else this['_cpc']=!![];}return!![];},VisuMZ[_0x2d0910(0x1f1)]['Scene_Map_startEncounterEffect']=Scene_Map['prototype'][_0x2d0910(0x5e8)],Scene_Map[_0x2d0910(0x3c7)][_0x2d0910(0x5e8)]=function(){const _0x425d4c=_0x2d0910;VisuMZ['EventsMoveCore'][_0x425d4c(0x67f)]['call'](this),this['_spriteset']['hideShadows']();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x351)]=Scene_Load[_0x2d0910(0x3c7)]['onLoadSuccess'],Scene_Load[_0x2d0910(0x3c7)][_0x2d0910(0x439)]=function(){const _0x5ca370=_0x2d0910;if($gameMap)$gameMap[_0x5ca370(0x403)]();VisuMZ[_0x5ca370(0x1f1)][_0x5ca370(0x351)][_0x5ca370(0x5a1)](this);},VisuMZ['EventsMoveCore'][_0x2d0910(0x2f2)]=Sprite_Character[_0x2d0910(0x3c7)]['initMembers'],Sprite_Character['prototype'][_0x2d0910(0x60f)]=function(){const _0x385a89=_0x2d0910;VisuMZ[_0x385a89(0x1f1)][_0x385a89(0x2f2)][_0x385a89(0x5a1)](this),this[_0x385a89(0x65a)](),this[_0x385a89(0x606)]();},Sprite_Character['prototype']['initMembersEventsMoveCore']=function(){const _0x219b8d=_0x2d0910;this[_0x219b8d(0x59d)]=0xff;},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x606)]=function(){const _0x23ef1d=_0x2d0910;this[_0x23ef1d(0x28b)]=new Sprite(),this['_eventIconSprite']['bitmap']=ImageManager[_0x23ef1d(0x58e)](_0x23ef1d(0x4e3)),this[_0x23ef1d(0x28b)]['bitmap']['smooth']=![],this[_0x23ef1d(0x28b)][_0x23ef1d(0x37f)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x23ef1d(0x297)]['x']=0.5,this[_0x23ef1d(0x28b)][_0x23ef1d(0x297)]['y']=0x1,this[_0x23ef1d(0x618)](this[_0x23ef1d(0x28b)]);},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x5cf)]=function(){const _0x1666ee=_0x2d0910;return this[_0x1666ee(0x25b)]&&this[_0x1666ee(0x25b)][_0x1666ee(0x672)](/\[VS8\]/i);},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x3f6)]=function(){const _0x3440af=_0x2d0910;return this[_0x3440af(0x5cf)]()&&VisuMZ[_0x3440af(0x1f1)][_0x3440af(0x48d)][_0x3440af(0x2ae)]['AutoBuffer'];},VisuMZ[_0x2d0910(0x1f1)]['Sprite_Character_update']=Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x68b)],Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x68b)]=function(){const _0x49a82e=_0x2d0910;VisuMZ[_0x49a82e(0x1f1)][_0x49a82e(0x479)][_0x49a82e(0x5a1)](this);if(VisuMZ['EventsMoveCore'][_0x49a82e(0x48d)][_0x49a82e(0x4a0)][_0x49a82e(0x5fc)]){if('MVXFY'===_0x49a82e(0x477))this[_0x49a82e(0x231)]();else{const _0xbc3c8c=_0x2fe2e4[_0x49a82e(0x58e)]('IconSet'),_0x164437=_0x342ee7['iconWidth'],_0x4b1b0a=_0x44d435['iconHeight'],_0x1fd167=_0x5664c7%0x10*_0x164437,_0x32954f=_0x5b4524[_0x49a82e(0x286)](_0x3627b6/0x10)*_0x4b1b0a,_0x51e690=_0x22dfb7[_0x49a82e(0x46f)](this[_0x49a82e(0x28e)]()),_0x168428=_0x36767e[_0x49a82e(0x46f)](this['iconSize']());this[_0x49a82e(0x3c5)][_0x49a82e(0x4ac)](_0xbc3c8c,_0x1fd167,_0x32954f,_0x164437,_0x4b1b0a,_0x4f4146,_0x7f5fbc,_0x51e690,_0x168428);}}this['_shadowSprite']&&(_0x49a82e(0x42a)===_0x49a82e(0x42a)?this['updateShadow']():(_0x1f67dc[_0x49a82e(0x4c2)](),_0x1687ec['EventsMoveCore'][_0x49a82e(0x1b5)][_0x49a82e(0x5a1)](this),_0x337e45[_0x49a82e(0x21d)]()));if(this[_0x49a82e(0x28b)]){if(_0x49a82e(0x481)===_0x49a82e(0x27f))return _0x34add8[_0x49a82e(0x37f)](0x0,0x0,0x0,0x0);else this[_0x49a82e(0x42f)]();}this[_0x49a82e(0x31d)](),this[_0x49a82e(0x35f)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x32b)]=Sprite_Character[_0x2d0910(0x3c7)]['setTileBitmap'],Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x2da)]=function(){const _0x19e01b=_0x2d0910;VisuMZ['EventsMoveCore']['Sprite_Character_setTileBitmap'][_0x19e01b(0x5a1)](this),this[_0x19e01b(0x654)][_0x19e01b(0x614)](this[_0x19e01b(0x279)][_0x19e01b(0x20b)](this));},VisuMZ['EventsMoveCore'][_0x2d0910(0x634)]=Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x51f)],Sprite_Character['prototype'][_0x2d0910(0x51f)]=function(){const _0x51df89=_0x2d0910;VisuMZ[_0x51df89(0x1f1)]['Sprite_Character_setCharacterBitmap']['call'](this),this[_0x51df89(0x654)][_0x51df89(0x614)](this[_0x51df89(0x279)][_0x51df89(0x20b)](this));},Sprite_Character[_0x2d0910(0x3c7)]['updateBitmapSmoothing']=function(){const _0x59d62e=_0x2d0910;if(!this[_0x59d62e(0x654)])return;this[_0x59d62e(0x654)][_0x59d62e(0x514)]=!!VisuMZ[_0x59d62e(0x1f1)][_0x59d62e(0x48d)][_0x59d62e(0x4a0)]['BitmapSmoothing'];},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x590)]=Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x4f8)],Sprite_Character[_0x2d0910(0x3c7)]['characterPatternY']=function(){const _0x3567a7=_0x2d0910;if(this[_0x3567a7(0x5cf)]()){if(_0x3567a7(0x59c)!=='Bcqli')return this[_0x3567a7(0x226)]();else{if(!_0x181451[_0x3567a7(0x302)]())return;_0x74b07[_0x3567a7(0x430)]();}}else{if(_0x3567a7(0x58a)===_0x3567a7(0x58a))return this[_0x3567a7(0x2e5)]();else _0x5e2677['y']+=0x1;}},Sprite_Character[_0x2d0910(0x3c7)]['characterPatternYVS8']=function(){const _0x5eee2e=_0x2d0910,_0x5c3c21=this[_0x5eee2e(0x4f5)][_0x5eee2e(0x462)]();let _0x20744d=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x5eee2e(0x4f5)]['_mirrorSprite']&&(_0x20744d=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x20744d[_0x5c3c21]-0x2)/0x2;},Sprite_Character['prototype'][_0x2d0910(0x2e5)]=function(){const _0x325c25=_0x2d0910;let _0xa1aafd=this['_character'][_0x325c25(0x462)]();if(this[_0x325c25(0x4f5)][_0x325c25(0x5cb)]){if(_0xa1aafd===0x4)_0xa1aafd=0x6;else{if(_0xa1aafd===0x6){if('PUuqY'===_0x325c25(0x5b9))return this[_0x325c25(0x5cf)]()?this[_0x325c25(0x226)]():this[_0x325c25(0x2e5)]();else _0xa1aafd=0x4;}}}return(_0xa1aafd-0x2)/0x2;},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x231)]=function(){const _0x4c3372=_0x2d0910;this['rotation']=0x0;if(this[_0x4c3372(0x1e0)]()){const _0x2e54aa=VisuMZ[_0x4c3372(0x1f1)][_0x4c3372(0x48d)][_0x4c3372(0x4a0)],_0x58e4ca=this[_0x4c3372(0x4f5)][_0x4c3372(0x462)]();let _0x516ad9=0x0;if([0x1,0x4,0x7]['includes'](_0x58e4ca))_0x516ad9=_0x2e54aa[_0x4c3372(0x36f)];if([0x3,0x6,0x9][_0x4c3372(0x495)](_0x58e4ca))_0x516ad9=_0x2e54aa[_0x4c3372(0x50d)];if([0x2,0x8]['includes'](_0x58e4ca)){if(_0x4c3372(0x3e3)!==_0x4c3372(0x23c))_0x516ad9=[-_0x2e54aa[_0x4c3372(0x658)],0x0,_0x2e54aa[_0x4c3372(0x658)]][this[_0x4c3372(0x4f5)][_0x4c3372(0x498)]()];else return this[_0x4c3372(0x464)](0x7,_0x131688(_0x36821a['$1']));}if(this['_reflection'])_0x516ad9*=-0x1;this[_0x4c3372(0x3de)]=_0x516ad9;}},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x1e0)]=function(){const _0x37d0d6=_0x2d0910;if(this[_0x37d0d6(0x1d0)])return![];return this[_0x37d0d6(0x4f5)][_0x37d0d6(0x4c7)]()&&!this['_character'][_0x37d0d6(0x4bd)]()&&!this[_0x37d0d6(0x4f5)][_0x37d0d6(0x256)]()&&this[_0x37d0d6(0x245)]()===0x0;},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x225)]=function(){const _0x134792=_0x2d0910;this[_0x134792(0x243)]['x']=this[_0x134792(0x4f5)][_0x134792(0x5f0)](),this[_0x134792(0x243)]['y']=this['_character']['shadowY'](),this[_0x134792(0x243)][_0x134792(0x246)]=this['opacity'],this[_0x134792(0x243)]['visible']=this[_0x134792(0x4f5)][_0x134792(0x5c2)](),this[_0x134792(0x243)][_0x134792(0x2fc)]=this['_hidden'];if(!this[_0x134792(0x4f5)][_0x134792(0x1ce)]()){if(_0x134792(0x596)===_0x134792(0x596))this['_shadowSprite'][_0x134792(0x40e)]['x']=Math['min'](0x1,this[_0x134792(0x243)]['scale']['x']+0.1),this['_shadowSprite'][_0x134792(0x40e)]['y']=Math[_0x134792(0x46f)](0x1,this[_0x134792(0x243)][_0x134792(0x40e)]['y']+0.1);else return _0x18dca5[_0x134792(0x1f1)][_0x134792(0x228)][_0x134792(0x5a1)](this,_0x2e2f19,_0x4f3509,_0x15d584);}else{if('sXUxi'===_0x134792(0x31e))return this['_lastMovedDirection']||0x0;else this[_0x134792(0x243)][_0x134792(0x40e)]['x']=Math['max'](0x0,this[_0x134792(0x243)][_0x134792(0x40e)]['x']-0.1),this[_0x134792(0x243)]['scale']['y']=Math[_0x134792(0x674)](0x0,this[_0x134792(0x243)][_0x134792(0x40e)]['y']-0.1);}},Sprite_Character[_0x2d0910(0x3c7)]['updateEventIconSprite']=function(){const _0x4165cd=_0x2d0910,_0x140c69=this[_0x4165cd(0x28b)],_0x4583a3=this[_0x4165cd(0x245)]();if(_0x4583a3<=0x0)return _0x140c69[_0x4165cd(0x37f)](0x0,0x0,0x0,0x0);else{if(_0x4165cd(0x543)!=='ZHXQN'){const _0x487550=_0x4b5038(_0x13f81d['$1']);_0x487550!==_0x42b8b9[_0x57b8db][_0x4165cd(0x4eb)]&&(_0x39ef84(_0x4165cd(0x4c4)[_0x4165cd(0x1cf)](_0x45220e,_0x487550)),_0x3ca29a[_0x4165cd(0x26b)]());}else{const _0x98e9e2=ImageManager[_0x4165cd(0x3f9)],_0x962790=ImageManager['iconHeight'],_0x2e5d3a=_0x4583a3%0x10*_0x98e9e2,_0x9b988f=Math[_0x4165cd(0x286)](_0x4583a3/0x10)*_0x962790;_0x140c69['setFrame'](_0x2e5d3a,_0x9b988f,_0x98e9e2,_0x962790),this[_0x4165cd(0x3cf)]=!![];}}const _0x25bc6d=this[_0x4165cd(0x4f5)]['getEventIconData']();if(this[_0x4165cd(0x3f6)]()){if(_0x4165cd(0x3ed)===_0x4165cd(0x3ed))this[_0x4165cd(0x4f4)](_0x140c69);else{const _0x129a19=[_0x41ccfc,_0x39d2af,_0x4165cd(0x682)[_0x4165cd(0x1cf)](_0x43793c)];_0x4e8423[_0x4165cd(0x3a3)](_0x129a19,_0x23b044);}}else{if(_0x4165cd(0x527)!==_0x4165cd(0x527)){if(_0x58aff0)this[_0x4165cd(0x4ee)](_0x9d9144['x'],_0x53e3ee['y']);}else _0x140c69['x']=_0x25bc6d?_0x25bc6d['bufferX']:0x0,_0x140c69['y']=_0x25bc6d?-this[_0x4165cd(0x288)]+_0x25bc6d['bufferY']:0x0;}_0x140c69[_0x4165cd(0x611)]=_0x25bc6d?_0x25bc6d[_0x4165cd(0x611)]:0x0,this[_0x4165cd(0x45e)](_0x140c69),this['addChild'](_0x140c69),_0x140c69[_0x4165cd(0x3de)]=-this[_0x4165cd(0x3de)];},Sprite_Character[_0x2d0910(0x3c7)]['updateEventCustomZ']=function(){const _0x58a857=_0x2d0910;if(!this[_0x58a857(0x4f5)])return;if(this[_0x58a857(0x4f5)]['_customZ']===undefined)return;if(this[_0x58a857(0x4f5)]['_customZ']===![])return;this['z']=this[_0x58a857(0x4f5)]['_customZ'];if(this['z']<0x0){if(_0x58a857(0x5e1)!==_0x58a857(0x5e1))return this[_0x58a857(0x255)];else this['_shadowSprite']['z']=this['z']-0x1;}else this[_0x58a857(0x243)]['z']=0x0;},Sprite_Character[_0x2d0910(0x3c7)][_0x2d0910(0x35f)]=function(){const _0x447f9f=_0x2d0910;if(!this[_0x447f9f(0x4f5)])return;let _0x23be33=!!this[_0x447f9f(0x4f5)][_0x447f9f(0x5cb)];this[_0x447f9f(0x40e)]['x']=Math[_0x447f9f(0x23a)](this[_0x447f9f(0x40e)]['x'])*(_0x23be33?-0x1:0x1);},Sprite_Character['prototype'][_0x2d0910(0x4f4)]=function(_0x20ab3e){const _0x33ba90=_0x2d0910;_0x20ab3e['x']=0x0,_0x20ab3e['y']=-this[_0x33ba90(0x288)]+this[_0x33ba90(0x288)]*0x2/0x5,this[_0x33ba90(0x4f5)][_0x33ba90(0x498)]()!==0x1&&(_0x20ab3e['y']+=0x1);},Sprite_Character['prototype']['getEventIconIndex']=function(){const _0x58e3c6=_0x2d0910;if(!this[_0x58e3c6(0x4f5)])return 0x0;if(this['_character'][_0x58e3c6(0x3bd)])return 0x0;const _0x5aaa48=this[_0x58e3c6(0x4f5)][_0x58e3c6(0x1e8)]();return _0x5aaa48?_0x5aaa48[_0x58e3c6(0x55a)]||0x0:0x0;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x48c)]=Sprite_Balloon[_0x2d0910(0x3c7)]['setup'],Sprite_Balloon[_0x2d0910(0x3c7)][_0x2d0910(0x39c)]=function(_0xbc01f3,_0x463a2d){const _0x138599=_0x2d0910;VisuMZ[_0x138599(0x1f1)][_0x138599(0x48c)][_0x138599(0x5a1)](this,_0xbc01f3,_0x463a2d),VisuMZ[_0x138599(0x1f1)][_0x138599(0x48d)][_0x138599(0x2ae)][_0x138599(0x422)]&&this[_0x138599(0x66d)]['_character'][_0x138599(0x5c4)](_0x463a2d,this['_duration']);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x4f9)]=Sprite_Balloon[_0x2d0910(0x3c7)]['updatePosition'],Sprite_Balloon['prototype'][_0x2d0910(0x257)]=function(){const _0x2987b9=_0x2d0910;VisuMZ[_0x2987b9(0x1f1)][_0x2987b9(0x4f9)][_0x2987b9(0x5a1)](this),this[_0x2987b9(0x31c)]();},Sprite_Balloon['prototype'][_0x2d0910(0x31c)]=function(){const _0x1fb6bb=_0x2d0910;if(this['_target'][_0x1fb6bb(0x4f5)][_0x1fb6bb(0x5cf)]()){if('keDki'===_0x1fb6bb(0x2ec)){const _0x2cc13a=_0x35b23b(_0x5a8457['$1']),_0x182975=this[_0x1fb6bb(0x63b)](_0x758063);return this[_0x1fb6bb(0x337)](_0x2cc13a,_0x182975);}else this['x']+=VisuMZ[_0x1fb6bb(0x1f1)][_0x1fb6bb(0x48d)][_0x1fb6bb(0x2ae)][_0x1fb6bb(0x1e1)],this['y']+=VisuMZ[_0x1fb6bb(0x1f1)][_0x1fb6bb(0x48d)]['VS8'][_0x1fb6bb(0x2bf)];}},Sprite_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x4cc)]=function(){const _0x11b829=_0x2d0910;this['bitmap']=new Bitmap(Math[_0x11b829(0x66a)](Graphics[_0x11b829(0x574)]/0x2),0x30),this['bitmap'][_0x11b829(0x621)]=this[_0x11b829(0x621)](),this['bitmap'][_0x11b829(0x669)]=this[_0x11b829(0x669)](),this[_0x11b829(0x654)][_0x11b829(0x300)]=ColorManager['outlineColor']();},Sprite_Timer[_0x2d0910(0x3c7)][_0x2d0910(0x21c)]=function(){const _0x2a53f6=_0x2d0910,_0x286ef9=Math[_0x2a53f6(0x286)](this[_0x2a53f6(0x535)]/0x3c/0x3c),_0x2be551=Math[_0x2a53f6(0x286)](this[_0x2a53f6(0x535)]/0x3c)%0x3c,_0x6689a6=this['_seconds']%0x3c;let _0x341bcb=_0x2be551[_0x2a53f6(0x431)](0x2)+':'+_0x6689a6[_0x2a53f6(0x431)](0x2);if(_0x286ef9>0x0)_0x341bcb='%1:%2'[_0x2a53f6(0x1cf)](_0x286ef9,_0x341bcb);return _0x341bcb;};function Sprite_EventLabel(){const _0x5f370d=_0x2d0910;this[_0x5f370d(0x51c)](...arguments);}function _0xc9b2(){const _0x28e52d=['initMembers','oUIhz','blendMode','TipQo','PreloadedMaps','addLoadListener','PostMorphJS','DxSmi','pUItS','addChild','switch1Id','SpawnEventAtXY','_spriteOffsetX','isDashing','setupEventsMoveCoreCommentTags','getPose','trim','checkEventTriggerEventsMoveCore','fontFace','AirshipSpeed','regionList','hSCfL','Template','JJZQO','TqBjv','stop','isEventClickTriggered','reverseDir','_moveAllowPlayerCollision','isNearTheScreen','opacitySpeed','checkExistingEntitiesAt','_visiblePlayerX','turn180','296574CdVIQj','unlock','Chase','Sprite_Character_setCharacterBitmap','_spawnedEvents','getPosingCharacterIndex','isSaveEventLocations','map','disable','regionId','checkCollisionKeywords','_CPCs','kdrAC','directionOnLadderSpriteVS8dir','updateRoutineMove','AZUfS','_forceHidePlayer','TaWZv','split','_opacity','_callEventMap','referEvent','IconBufferY','Game_Switches_setValue','setDashingEnabled','UPPER\x20RIGHT','STaim','setFrames','uelYn','dashSpeedModifier','QfmsQ','_MapSpawnedEventData','KzDDr','OFF','356RKfsCF','bitmap','offsetY','_stepPattern','MapVariables','TiltVert','Game_CharacterBase_opacity','initMembersEventsMoveCore','fsrJm','jPofy','deleteIconsOnEventsData','%1%2','processMoveRouteBalloon','yTbQb','needsUpdate','updateWaitMode','isMapSwitch','loadCPC','RIGHT','setControlledFollowerID','reverse\x20mimic','JtHnc','fontSize','round','conditions','checkActivationProximity','_target','Game_Event_start','EventTimerExpireEvent','characterIndex','Hidden','match','pWnlJ','max','SwitchId','ROUTE_SCRIPT','labelWindowRange','mirror\x20horz','TurnInPlaceDelay','XjKMz','posNt','terrainTag','FollowerID','boat','Scene_Map_startEncounterEffect','isSpawnedEvent','drawing','Self\x20Variable\x20%1','List','hasStepAnime','SPIN\x20CLOCKWISE','custom','qlYgh','Toggle','XuOnK','_alwaysUpdateMove','update','sADlj','Game_CharacterBase_moveDiagonally','Map%1-Event%2','resetFontSettings','_data','isPassableByAnyDirection','mcGie','dir8','EventTimerFramesGain','_followerChaseOff','processMoveRouteJumpTo','width','fFpSS','TargetVariableId','switches','Seconds','xBdXG','setEventIconDataKey','labelWindowText','xtVql','setChaseOff','Window_ScrollText_startMessage','_proxyWindow','innerWidth','_forceShowPlayer','Game_CharacterBase_screenY','nDnZd','BufferY','Name','HMPH','right','startMapCommonEventOnOKTarget','Direction','mapId','ConvertParams','EventLocationSave','MULTIPLY','isJumping','QOuPX','refreshIfNeeded','USER-DEFINED\x203','indexOf','Tedka','AdvancedVariables','front','moveAwayFromCharacter','isShadowShrink','format','_dragonbones','OffsetY','processMoveSynchApproach','VisuMZ_Setup_Preload_Map','Frames','despawnEverything','activationProximityType','FollowerReset','isNormalPriority','yReoR','some','boDED','SwitchGetSelfSwitchID','isMovementSucceeded','_eventScreenX','vehicle','isAllowCharacterTilt','BalloonOffsetX','initMoveSpeed','yITEg','_activationProximityAutoTriggerBypass','turnLeft90','General','FUqGI','getEventIconData','kWOhl','qmhGH','umHZI','isCollidedWithEvents','MorphEventRemove','findProperPageIndex','DkFnI','Game_Event_moveTypeRandom','EventsMoveCore','_EventsMoveCoreSettings','adjustMoveSynchOpacityDelta','csEmX','hasMoveOnlyRegions','isDashingEnabled','_pattern','updatePattern','DashingEnable','Window_EventItem_onOk','StrictCollision','%1Dock','IXozy','MvBtG','shadowFilename','reverse\x20copy','uAcgs','7HTCQFf','EVAL','target','processOk','radius','eventLabelsVisible','AllAllow','splice','Operation','bind','TOGGLE','mGnAG','setupEventsMoveCoreEffects','Window_NumberInput_processOk','_characterSprites','_regionRules','drawText','code','dbsUF','name','apply','WalkForbid','down','isRegionAllowPass','isDestinationValid','isRegionForbidPass','timerText','clearSelfTarget','startMapCommonEventOnTouch','tDGQp','VAYgy','ShNUs','list','PreMorphJS','isMapVariable','updateShadow','characterPatternYVS8','CPCsMet','Game_CharacterBase_canPass','move','mtkWv','IconBlendMode','updateOpacity','StopAutoMoveEvents','viATY','Game_CharacterBase_moveStraight','updateSelfMovement','updateTilt','All','switch2Valid','PostCopyJS','deletePreservedMorphEventDataKey','canStartLocalEvents','isSelfSwitch','processMoveSynchReverseMimic','convertSelfVariableValuesInScriptCall','abs','Button','ZQrxx','isBigCharacter','ekgCU','checkNeedForPeriodicRefresh','onDatabaseLoaded','clear','Game_CharacterBase_pattern','_shadowSprite','isPreventSelfMovement','getEventIconIndex','opacity','_interpreter','mimic','isPassable','setMoveRoute','_forceHideFollower','meetsSwitchCondition','checkRegionEventTrigger','hUpqW','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','UEpiu','canPass','bBCTF','backX','hasAdvancedSwitchVariable','_advancedSwitchVariable','isPosing','updatePosition','isRunning','checkValidEventerMap','setWaitMode','_characterName','isEventTest','AutoMoveEvents','isTargetEventValidForLabelWindow','createLabelWindows','defaultFontSize','Game_Character_forceMoveRoute','Region%1','replace','Region','meetsConditions','add','clearPageSettings','resizeWindow','EventTimerExpireClear','updateMove','exit','_eventIcon','Game_Followers_isVisible','_comments','setupChild','Visible','_filename','Setting','startCallEvent','Preserve','DashModifier','VisuMZ_1_MessageCore','iconHeight','setBackgroundType','updateBitmapSmoothing','setPlayerDiagonalSetting','setMovementSuccess','Game_Player_executeMove','setDestination','switch1Valid','mJDPZ','_event','MwtNr','Game_CharacterBase_isDashing','isLandOk','Game_Message_setNumberInput','_realY','floor','jrCAJ','height','canMove','Game_Map_parallelCommonEvents','_eventIconSprite','_spriteOffsetY','_moveSynch','iconSize','setupMorphEvent','length','Player','VvRuz','setupPageSettings','activationProximityDistance','isLabelVisible','hasDragonbones','anchor','OpacitySpeed','createContents','region','Game_Event_meetsConditionsCPC','_shadowGraphic','setMoveSpeed','morphIntoTemplate','EventAllow','Ship','Game_Timer_start','Speed','DefaultShadow','Fxwyn','isSmartEventCollisionOn','ouolu','executeCommand','firstSpawnedEvent','isMoving','PosX','of\x20Preloaded\x20Maps.\x0a\x0a','switch2Id','spawnEventId','VS8','isMoveOnlyRegionPassable','setupPlayerVisibilityOverrides','NxHNw','Map\x20%1\x20Switch\x20%2','executeMoveDir8','_forceShowFollower','Game_Player_increaseSteps','toLowerCase','OperateValues','Walk','RIGHT\x20TO\x20LEFT','Game_Interpreter_updateWaitMode','player','SBDJM','execute','nFOiL','BalloonOffsetY','WlOpq','EventForbid','Window_Message_startMessage','HEART','YCJkX','LOVE','FUNC','Game_Temp_setDestination','TemplateName','hasEventIcon','setDirection','SPIN\x20ANTICLOCKWISE','filter','prepareSpawnedEventAtXY','createSaveEventLocationData','away','setOpacity','MwuBl','deltaY','_moveRouteIndex','initEventsMoveCore','setAllowEventAutoMovement','_eventOverloadThreshold','LIGHTBULB','processMoveSynchMirrorHorz','BlendMode','setTileBitmap','getPreservedMorphEventData','despawnRegions','roundY','qYmXj','pageIndex','_eventCopyData','isStopFollowerChasing','_trigger','CustomPageConditions','setupSpawnedEvents','characterPatternYBasic','_eventErased','characterIndexVS8','DiagonalSpeedMultiplier','SPIN\x20CCW','processMoveCommandEventsMoveCore','processMoveRouteTeleportToCharacter','vkMVQ','RsYSx','pos','slice','_selfTargetNumberInput','convertVariableValuesInScriptCall','Sprite_Character_initMembers','Step2MapId','requestRefresh','rglSx','getLastPluginCommandInterpreter','Game_Map_events','Game_Event_isCollidedWithPlayerCharacters','realMoveSpeed','Game_SelfSwitches_setValue','setStopFollowerChasing','_hidden','parallelCommonEvents','Game_Map_unlockEvent','_selfEvent','outlineColor','_DisablePlayerControl','isWorking','SpawnEventDespawnTerrainTags','LIGHT-BULB','_eventPageIndex','vHzRh','zoomScale','CPC','left','bSpkh','VICTORY','moveTowardCharacter','Game_Player_isDashing','%1DockRegionOnly','setEventLabelsVisible','getDirectionToPoint','getInputDir8','Airship','mKZBd','_eventMorphData','isEventRunning','JSON','processMoveRouteJumpToCharacter','AraaA','FontSize','Minutes','Step1MapId','updateVS8BalloonOffsets','updateEventCustomZ','KUNUv','AdvancedSwitches','_PlayerDiagonalSetting','_SavedEventLocations','SelfSwitches','hhnrV','checkEventsMoveCoreStringTags','mMkoK','clearSpriteOffsets','clearCarrying','deleteIconsOnEventsDataKey','qZFxQ','FhjrW','Sprite_Character_setTileBitmap','standing','findDiagonalDirectionTo','create','ANNOYED','hasCPCs','setNumberInput','BULB','Game_Event_event','YKnpK','processMoveSynchAway','TUtIr','processMoveRouteMoveUntilStop','offsetX','executeMove','_saveEventLocations','VariableId','PreCopyJS','gTrwA','ivlSC','square','createSpawnedEvent','djGhu','szlfG','isAnyEventStarting','_moveSpeed','initEventsMoveCoreSettings','PlayerAllow','pluginCommandCallEvent','registerCommand','shadowY','_pageIndex','EsAoB','EnableDir8','_forceDashing','autosaveEventLocation','EFiSE','updatePeriodicRefresh','Scene_Load_onLoadSuccess','drawIcon','isEventOverloaded','despawnAtXY','hddzB','iBUmI','setupSpawnTest','EventIconChange','isInVehicle','isTurnInPlace','moveByInput','LOWER\x20LEFT','Game_Event_updateSelfMovement','_cacheVisibility','updateEventMirrorSprite','setupSpawn','command108','eiSee','setupSaveEventLocations','ZInhd','canPassDiagonally','createLabelWindowForTarget','DashEnableToggle','QnoVI','Game_CharacterBase_setDirection','FastForwardKey','KyexK','isOnRope','parse','_needsRefresh','TiltLeft','dEseB','1502008DKylcS','3130FcePAt','isSelfVariable','Label','characterName','loadDataFile','getDirectionFromPoint','getSavedEventLocation','_visiblePlayerY','moveSynchTarget','_type','kpzVV','moveSynchType','FavorHorz','setFrame','gMmPP','setPattern','bufferY','createSpawnedEventWithData','_expireCommonEvent','findDirectionTo','initEventsMoveCoreEffects','setItemChoice','pause','_scene','_lastMovedDirection','gainFrames','Game_Map_setupEvents','processMoveSynchCustom','_customZ','_activationProximity','findTargetSprite','isCollidedWithPlayerCharacters','tileWidth','text','updatePatternEventsMoveCore','getPlayerDiagonalSetting','Step2EventId','SWEAT','EkdmY','qGHTM','EventLabelRefresh','areFollowersForceHidden','setup','OvcMd','PosY','clearStepPattern','AdHlN','constructor','CVkEt','setValue','USER-DEFINED\x202','setDiagonalDirection','useCarryPoseForIcons','WfcMy','_callEventData','updateScale','screenX','ZEHFR','aOYVh','isAdvancedVariable','Euwuq','Game_CharacterBase_update','ShowShadows','setLastPluginCommandInterpreter','onCancel','hczSW','forceCarrying','UPPER\x20LEFT','event','turnTowardPoint','forceDashing','process_VisuMZ_EventsMoveCore_Switches_Variables','moveBackToRandomHome','onChange','reserveCommonEvent','_erased','return\x20%1','inBattle','isDashDisabled','_speed','byxJM','updateMoveSynch','setImage','contents','thFas','prototype','pageId','page','LEFT','Game_Player_checkEventTriggerHere','ITEM','processMoveCommand','despawnEventId','visible','posEventsMoveCore','Boat','_text','_labelWindows','row','mapValue','Game_CharacterBase_initMembers','CxSJF','EventID','Scene_Boot_onDatabaseLoaded','wmsbQ','CejJr','absDistance','SkOaB','rotation','template','forceMoveRoute','_working','pages','LTxMq','_visibleEventY','SPIN\x20COUNTERCLOCKWISE','RegionOkTarget','Game_Interpreter_character','Fhoic','FollowerSetTargetChase','toUpperCase','push','startMapCommonEventOnOK','snTGF','BkiCg','EnableTurnInPlace','EventLocationDelete','processMoveRouteAnimation','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setupEvents','fittingHeight','Visibility','isAutoBufferIcon','ActeK','KNEEL','iconWidth','Value','Game_CharacterBase_realMoveSpeed','zXNZm','Step1EventId','lastSpawnedEvent','DbHuK','scrolledY','Game_CharacterBase_isTransparent','OVdXU','clearEventCache','clearPose','_randomHomeY','SILENCE','45549mckezW','_forceCarrying','setupEventsMoveCoreNotetags','locate','ecZfO','Game_Event_meetsConditions','setCommonEvent','scale','_spawnData','MoveAllSynchTargets','Game_CharacterBase_characterIndex','PostSpawnJS','processMoveRouteJumpForward','VehicleForbid','getPosingCharacterDirection','RvUJE','isTile','HqSDC','Stop','prepareSpawnedEventAtRegion','spawnPreserved','screenY','savePreservedMorphEventDataKey','MessageCore','Game_Map_isDashDisabled','value','Game_Timer_stop','AutoBalloon','isPlayerControlDisabled','isDiagonalDirection','TargetSwitchId','VPFyt','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','Game_Enemy_meetsSwitchCondition','985956qOziwZ','QIiCa','JxMsw','Game_CommonEvent_isActive','events','restoreSavedEventPosition','updateEventIconSprite','resume','padZero','_pose','Game_CharacterBase_updatePattern','distance','MapID','random','EventTimerSpeed','_followerControlID','onLoadSuccess','uVlJV','MZeIy','deltaYFrom','timer','eyIDY','SwitchGetSelfSwitchABCD','mainFontSize','processMoveRouteStepToCharacter','checkEventTriggerThere','createShadows','visibleRange','selfValue','xdqnG','_tilemap','_randomMoveWeight','removeMorph','isSupportDiagonalMovement','Game_Timer_onExpire','_clickTrigger','randomInt','PageId','onExpire','EventAutoMovement','PpEUQ','isValid','_eventCache','Game_Troop_meetsConditionsCPC','_randomHomeX','ARRAYJSON','correctFacingDirection','processMoveRouteMoveTo','gETYS','deleteEventLocation','Game_CharacterBase_direction','SpawnEventDespawnEventID','Game_Interpreter_executeCommand','removeChild','spriteId','VisibleEventLabels','processDrawIcon','direction','FzlKX','processMoveRouteMoveRepeat','isPlayerForceHidden','Enable','Game_Player_isMapPassable','unlockEvent','ysmOl','Game_Follower_initialize','EventId','UprLK','Game_Player_checkEventTriggerThere','BSdWQ','min','requestAnimation','iAIqf','_visibleEventX','despawnTerrainTags','mirror\x20horizontal','createLowerLayer','mTHmL','MVXFY','Map\x20%1\x20Variable\x20%2','Sprite_Character_update','tileHeight','peTWy','filename','eventsXyNt','FRHAV','Forbid','clamp','tGgcP','deltaXFrom','Game_SelfSwitches_value','isAllowEventAutoMovement','SpriteBased','SelfVariableID','OchQn','Wswyz','390FbEDmc','processMoveRouteSetIndex','onClickTrigger','Sprite_Balloon_setup','Settings','_saveEventLocation','SpawnEventAtTerrainTag','_counter','changeSpeed','updateEventsMoveCoreTagChanges','NOTE','Game_CharacterBase_increaseSteps','includes','hasClickTrigger','moveStraight','pattern','createCharacterShadow','frameCount','isPlayerForceShown','createProxyWindow','roundXWithDirection','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','zDhyj','Movement','FollowerSetControl','cDOdS','processMoveSynchRandom','CommonEventID','processMoveSynchMirrorVert','checkEventTriggerHere','EventLocationCreate','HURT','MapSwitches','deleteSavedEventLocation','Icon','blt','_screenZoomScale','sQPDN','xMeLV','setMapValue','_eventId','rXdeS','createShadow','clearDestination','_selfTargetItemChoice','processMoveRouteSelfSwitch','_paused','ffNaZ','Game_Vehicle_initMoveSpeed','ship','PlayerIconChange','moveDiagonally','isOnLadder','eraseEvent','vertical\x20mirror','HKdNW','sqLZt','registerSelfEvent','_commonEvents','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','command357','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','isDashingAndMoving','xCpXA','COLLAPSE','turnAwayFromPoint','IconIndex','createBitmap','clearDashing','MapId','Game_Interpreter_PluginCommand','turnTowardCharacter','SpawnEventAtRegion','processMoveRouteSelfVariable','IconBufferX','_eventScreenY','Game_Map_refresh','StopAutoMoveMessages','28081gOckBf','approach','CuKXL','itemPadding','LsHVX','ADDITIVE','eGvpZ','Window_EventItem_onCancel','Letter','increaseSteps','turnAwayFromCharacter','CarryPose','IconSet','oesmE','Game_Event_findProperPageIndex','erase','ARRAYSTR','isTriggerIn','lineHeight','getInputDirection','version','_characterIndex','Disable','processMoveRouteTeleportTo','VehicleAllow','mXSis','isAirshipPassable','gggaK','drawTextEx','autoEventIconBuffer','_character','RnHSJ','frontX','characterPatternY','Sprite_Balloon_updatePosition','lIPCd','isSpawnHitboxCollisionOk','Collision','_stopCount','_diagonalSupport','_encounterEffectDuration','concat','Game_Event_checkEventTriggerAuto','moveAwayFromPoint','zdhNx','textSizeEx','isTransparent','EventTimerPause','windowPadding','VisuMZ_0_CoreEngine','USER-DEFINED\x205','advancedFunc','delay','SpawnEventDespawnEverything','TiltRight','%1Allow','setSelfValue','QUESTION','_moveOnlyRegions','processMoveRouteFadeOut','yfUDd','smooth','Game_Switches_value','Spriteset_Map_createLowerLayer','USER-DEFINED\x204','variableValid','switchId','onOk','processMoveSynchMimic','initialize','Game_Event_locate','SJDUM','setCharacterBitmap','isRegionDockable','isBusy','WDlII','VisibleRange','Game_Character_processMoveCommand','jJPNE','enable','fOKGR','type','hkrkP','setEventIconData','padding','processMoveRouteMoveToCharacter','_eventSpawnData','_cpc','vert\x20mirror','moveTypeRandom','SLEEP','BdgJX','SDeql','FTzij','_seconds','qjUid','_EventIcons','moveRouteIndex','Game_Map_update','wEKQx','roundYWithDirection','updateShadowChanges','Game_Variables_value','aYnQh','ARRAYSTRUCT','fjAMV','AbHVd','qrRdg','ZHXQN','pjpwQ','moveForward','GetMoveSynchTarget','charAt','_eventLabelOffsetX','lastSpawnedEventID','Game_Variables_setValue','turnRight90','EventTimerFramesSet','Self\x20Switch\x20%1','ANGER','variableId','eventId','_frames','LIGHT\x20BULB','KKejA','Game_Follower_chaseCharacter','_mapId','Game_Vehicle_isLandOk','Game_Event_initialize','_realX','registerSelfTarget','iconIndex','VariableGetSelfVariableID','getMapSpawnedEventData','isVisible','SuccessSwitchId','horz\x20mirror','makeDeepCopy','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','Rope','Allow','_poseDuration','LdVAM','string','RegionTouch','reverse','COBWEB','RemovePreserve','...','Passability','bYJub','character','UIona','updateText','note','MUSICNOTE','Game_Timer_initialize','boxWidth','saveEventLocation','Game_Player_getInputDirection','nkpjS','getSelfTarget','ZZZ','TsHom','moveTowardPoint','getControlledFollowerID','isActive','Game_Map_setup','kzcDM','setPose','ShipSpeed','determineCommonEventsWithCPC','BoatSpeed','$preloadedMap_%1','NORMAL','Game_System_initialize','Game_CharacterBase_screenX','setupCopyEvent','lastMovedDirection','BJUVP','_selfTarget','_inputTime','trtLX','loadSystem','_needsPeriodicRefresh','Sprite_Character_characterPatternY','_PreservedEventMorphData','checkSmartEventCollision','opacityDelta','RSped','_labelWindow','FPndp','_cacheSystemVisible','Game_Event_setupPageSettings','_patternLocked','PreSpawnJS','removeTemporaryMapSpawnedEvents','KLayi','_shadowOpacity','wYmMw','_periodicRefreshTimer','follower','call','bufferX','processMoveRouteFadeIn','isPlaytest','ARRAYNUM','none','jJAix','EventTemplates','bscEe','Game_Map_event','3306567ItFFfW','activationRegionList','initFollowerController','_waitMode','WnJub','jyOUM','setupDiagonalSupport','checkEventTriggerAuto','followers','Game_Message_add','description','deleteSavedEventLocationKey','SelfVariables','TerrainTags','tUHYM','_spriteset','EXCLAMATION','processMoveRouteStepTo','morphInto','checkAdvancedSwitchVariablePresent','CuzyE','deltaX','updatePose','isShadowVisible','apsRp','setBalloonPose','CQeIN','processMoveSynch','_eventOverload','VolYW','TerrainTag','setupRegionRestrictions','_mirrorSprite','_lastPluginCommandInterpreter','Vehicle','eventsXy','isSpriteVS8dir','variables','metCPC','default','updateParallel','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','isBattleTest','XOinQ','_eventLabelOffsetY','meetActivationProximityConditions','WalkAllow','Hours','log','_moveRoute','advancedValue','setupFollowerVisibilityOverrides','UNTITLED','parameters','TRrro','KTAnW','Game_Character_setMoveRoute','USER-DEFINED\x201','RegionOk','Event','horizontal\x20mirror','startEncounterEffect','wFpVS','_addedHitbox','adjustDir8MovementSpeed','status','BufferX','6ogzWaT','contentsOpacity','shadowX','parent','IDTKF','isAdvancedSwitch','processMoveRouteHugWall','Game_Vehicle_isMapPassable','MUSIC\x20NOTE','isSaveEventLocation','startMessage','rPAWO','LEFT\x20TO\x20RIGHT','airship','EnableDashTilt','refresh','Map%1.json','lQADx','BmdrA','backY','OhRau','processMoveRoutePatternLock','_chaseOff','start','createIconSprite','Step2Preserve','meetActivationRegionConditions','wKAEV','gIUhf','isMapPassable','XkFpW','CGGdE','jump'];_0xc9b2=function(){return _0x28e52d;};return _0xc9b2();}Sprite_EventLabel[_0x2d0910(0x3c7)]=Object[_0x2d0910(0x32e)](Sprite[_0x2d0910(0x3c7)]),Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x3a1)]=Sprite_EventLabel,Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x51c)]=function(_0x495e1e){const _0x41b6e9=_0x2d0910;this['_event']=_0x495e1e,Sprite[_0x41b6e9(0x3c7)][_0x41b6e9(0x51c)][_0x41b6e9(0x5a1)](this),this['initMembers'](),this[_0x41b6e9(0x49c)]();},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x60f)]=function(){const _0x4d0ea1=_0x2d0910;this[_0x4d0ea1(0x297)]['x']=0.5,this[_0x4d0ea1(0x297)]['y']=0x1;},Sprite_EventLabel['prototype'][_0x2d0910(0x49c)]=function(){const _0x456520=_0x2d0910,_0xb827b6=new Rectangle(0x0,0x0,0x1,0x1);this['_proxyWindow']=new Window_Base(_0xb827b6),this['_proxyWindow'][_0x456520(0x52b)]=0x0;},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x68b)]=function(){const _0x4749af=_0x2d0910;Sprite['prototype'][_0x4749af(0x68b)][_0x4749af(0x5a1)](this),this['updateText'](),this[_0x4749af(0x3a9)](),this[_0x4749af(0x257)](),this['updateOpacity']();},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x570)]=function(){const _0xce3f28=_0x2d0910;this[_0xce3f28(0x280)]['labelWindowText']()!==this[_0xce3f28(0x3d2)]&&(this[_0xce3f28(0x3d2)]=this[_0xce3f28(0x280)][_0xce3f28(0x69e)](),this[_0xce3f28(0x5fd)]());},Sprite_EventLabel['prototype']['refresh']=function(){const _0x5ea1c3=_0x2d0910;if(!this[_0x5ea1c3(0x1b6)])return;this[_0x5ea1c3(0x268)](),this[_0x5ea1c3(0x212)]();},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x268)]=function(){const _0x28bf84=_0x2d0910,_0x3cbf73=this[_0x28bf84(0x1b6)]['textSizeEx'](this['_text']),_0x66dd4f=this[_0x28bf84(0x1b6)][_0x28bf84(0x4da)](),_0x1b7721=_0x3cbf73[_0x28bf84(0x697)]+_0x66dd4f*0x2,_0x54d272=_0x3cbf73[_0x28bf84(0x288)];this[_0x28bf84(0x1b6)][_0x28bf84(0x229)](0x0,0x0,_0x1b7721,_0x54d272),this['_proxyWindow'][_0x28bf84(0x299)](),this[_0x28bf84(0x654)]=this[_0x28bf84(0x1b6)]['contents'];},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x212)]=function(){const _0x190d53=_0x2d0910,_0x25e96d=this[_0x190d53(0x1b6)][_0x190d53(0x4da)]();this[_0x190d53(0x1b6)][_0x190d53(0x4f3)](this[_0x190d53(0x3d2)],_0x25e96d,0x0);},Sprite_EventLabel['prototype'][_0x2d0910(0x3a9)]=function(){const _0x1c7a37=_0x2d0910,_0x12f611=VisuMZ['EventsMoveCore'][_0x1c7a37(0x48d)][_0x1c7a37(0x374)][_0x1c7a37(0x319)],_0x4559c9=$gameSystem[_0x1c7a37(0x440)]()||0x1;this[_0x1c7a37(0x40e)]['x']=this[_0x1c7a37(0x40e)]['y']=_0x12f611/_0x4559c9;},Sprite_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x257)]=function(){const _0xf686ab=_0x2d0910;if(!SceneManager[_0xf686ab(0x389)])return;if(!SceneManager[_0xf686ab(0x389)][_0xf686ab(0x5ba)])return;const _0x4ece77=SceneManager[_0xf686ab(0x389)][_0xf686ab(0x5ba)][_0xf686ab(0x390)](this[_0xf686ab(0x280)]);if(!_0x4ece77)return;this['x']=this['_event'][_0xf686ab(0x3aa)](),this['x']+=this[_0xf686ab(0x280)][_0xf686ab(0x595)][_0xf686ab(0x338)],this['y']=this[_0xf686ab(0x280)][_0xf686ab(0x41c)]()-_0x4ece77[_0xf686ab(0x288)],this['y']+=$gameSystem[_0xf686ab(0x507)]()*-0.5,this['y']+=this[_0xf686ab(0x280)][_0xf686ab(0x595)][_0xf686ab(0x655)];},Sprite_EventLabel['prototype']['updateOpacity']=function(){const _0x46511a=_0x2d0910;if(this[_0x46511a(0x295)]())'BScVt'===_0x46511a(0x67a)?this[_0x46511a(0x243)]['z']=0x0:this[_0x46511a(0x246)]+=this['opacitySpeed']();else{if(SceneManager[_0x46511a(0x389)][_0x46511a(0x4ff)]>0x0)_0x46511a(0x4c8)!==_0x46511a(0x4c8)?(this[_0x46511a(0x297)]['x']=0.5,this[_0x46511a(0x297)]['y']=0x1):this[_0x46511a(0x246)]=0x0;else{if('qGHTM'===_0x46511a(0x399))this[_0x46511a(0x246)]-=this[_0x46511a(0x62d)]();else return!!this[_0x46511a(0x445)](_0x3e7a20);}}},Sprite_EventLabel[_0x2d0910(0x3c7)]['isLabelVisible']=function(){const _0xef1969=_0x2d0910;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.[_0xef1969(0x3bd)])return![];if(SceneManager[_0xef1969(0x389)]['_encounterEffectDuration']>0x0)return![];const _0x266897=$gamePlayer['x'],_0x1afb06=$gamePlayer['y'],_0x33c666=this[_0xef1969(0x280)]['x'],_0x46a004=this[_0xef1969(0x280)]['y'];if(this['_visiblePlayerX']===_0x266897&&this['_visiblePlayerY']===_0x1afb06&&this[_0xef1969(0x472)]===_0x33c666&&this[_0xef1969(0x3e4)]===_0x46a004)return this[_0xef1969(0x35e)];this[_0xef1969(0x62f)]=$gamePlayer['x'],this[_0xef1969(0x379)]=$gamePlayer['y'],this[_0xef1969(0x472)]=this[_0xef1969(0x280)]['x'],this[_0xef1969(0x3e4)]=this['_event']['y'];if($gameMap[_0xef1969(0x3dc)](_0x266897,_0x1afb06,_0x33c666,_0x46a004)>this[_0xef1969(0x280)][_0xef1969(0x677)]())return this[_0xef1969(0x35e)]=![],![];return this[_0xef1969(0x35e)]=!![],!![];},Sprite_EventLabel['prototype'][_0x2d0910(0x62d)]=function(){const _0x3ec0a3=_0x2d0910;return VisuMZ[_0x3ec0a3(0x1f1)][_0x3ec0a3(0x48d)][_0x3ec0a3(0x374)][_0x3ec0a3(0x298)];},VisuMZ['EventsMoveCore'][_0x2d0910(0x516)]=Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x475)],Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x475)]=function(){const _0x118815=_0x2d0910;VisuMZ[_0x118815(0x1f1)][_0x118815(0x516)]['call'](this),this['createLabelWindows']();},VisuMZ[_0x2d0910(0x1f1)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x2d0910(0x3c7)]['createShadow'],Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x4b3)]=function(){const _0x165f07=_0x2d0910;VisuMZ[_0x165f07(0x1f1)]['Spriteset_Map_createShadow']['call'](this),this['createShadows']();},Spriteset_Map[_0x2d0910(0x3c7)]['createShadows']=function(){const _0x51947e=_0x2d0910;if(!VisuMZ[_0x51947e(0x1f1)]['Settings'][_0x51947e(0x4a0)]['ShowShadows'])return;for(const _0x52ba19 of this['_characterSprites']){_0x51947e(0x3db)!=='ejDbc'?this[_0x51947e(0x499)](_0x52ba19):(this[_0x51947e(0x3d2)]=this[_0x51947e(0x280)][_0x51947e(0x69e)](),this[_0x51947e(0x5fd)]());}},Spriteset_Map[_0x2d0910(0x3c7)]['createCharacterShadow']=function(_0xe828f2){const _0x2c12aa=_0x2d0910;_0xe828f2[_0x2c12aa(0x243)]=new Sprite(),_0xe828f2[_0x2c12aa(0x243)][_0x2c12aa(0x271)]=_0xe828f2[_0x2c12aa(0x4f5)][_0x2c12aa(0x1ff)](),_0xe828f2[_0x2c12aa(0x243)][_0x2c12aa(0x654)]=ImageManager[_0x2c12aa(0x58e)](_0xe828f2[_0x2c12aa(0x243)]['_filename']),_0xe828f2['_shadowSprite'][_0x2c12aa(0x297)]['x']=0.5,_0xe828f2['_shadowSprite'][_0x2c12aa(0x297)]['y']=0x1,_0xe828f2[_0x2c12aa(0x243)]['z']=0x0,this['_tilemap']['addChild'](_0xe828f2[_0x2c12aa(0x243)]);},Spriteset_Map[_0x2d0910(0x3c7)]['hideShadows']=function(){const _0x5adcf9=_0x2d0910;if(!VisuMZ['EventsMoveCore'][_0x5adcf9(0x48d)][_0x5adcf9(0x4a0)][_0x5adcf9(0x3b0)])return;for(const _0x14a14 of this[_0x5adcf9(0x210)]){this['_tilemap'][_0x5adcf9(0x45e)](_0x14a14['_shadowSprite']);}},Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x25f)]=function(){const _0x5c15aa=_0x2d0910;this[_0x5c15aa(0x3d3)]=[];for(const _0x108880 of $gameMap[_0x5c15aa(0x42d)]()){this['createLabelWindowForTarget'](_0x108880);}},Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x366)]=function(_0x4c56a8){const _0x2104af=_0x2d0910;if(!this['isTargetEventValidForLabelWindow'](_0x4c56a8))return;let _0x36a0eb;const _0x42d66a=VisuMZ[_0x2104af(0x1f1)][_0x2104af(0x48d)][_0x2104af(0x374)][_0x2104af(0x485)]??!![];_0x36a0eb=_0x42d66a?new Sprite_EventLabel(_0x4c56a8):new Window_EventLabel(_0x4c56a8),_0x36a0eb['z']=0x8,_0x36a0eb[_0x2104af(0x45f)]=Sprite[_0x2104af(0x490)]++,this[_0x2104af(0x447)]['addChild'](_0x36a0eb),this[_0x2104af(0x3d3)]['push'](_0x36a0eb);},Spriteset_Map[_0x2d0910(0x3c7)][_0x2d0910(0x25e)]=function(_0x13d57c){const _0x34d92=_0x2d0910,_0x3e5dc9=_0x13d57c['event']();if(_0x3e5dc9['note'][_0x34d92(0x672)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3e5dc9['note'][_0x34d92(0x672)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x311ea4 of _0x3e5dc9[_0x34d92(0x3e2)]){let _0x250f17='';for(const _0x11e7b2 of _0x311ea4[_0x34d92(0x222)]){[0x6c,0x198][_0x34d92(0x495)](_0x11e7b2['code'])&&(_0x250f17+=_0x11e7b2['parameters'][0x0]);}if(_0x250f17['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x250f17[_0x34d92(0x672)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return _0x34d92(0x5d6)!=='FsESn'?!![]:!![];}return![];},Spriteset_Map[_0x2d0910(0x3c7)]['createSpawnedEvent']=function(_0x35b4da){const _0x28c15b=_0x2d0910;this[_0x28c15b(0x210)]=this['_characterSprites']||[];const _0x1b5f53=new Sprite_Character(_0x35b4da);this['_characterSprites'][_0x28c15b(0x3eb)](_0x1b5f53),this['_tilemap']['addChild'](_0x1b5f53),this[_0x28c15b(0x499)](_0x1b5f53),this[_0x28c15b(0x366)](_0x35b4da),_0x1b5f53[_0x28c15b(0x68b)]();},VisuMZ['EventsMoveCore'][_0x2d0910(0x284)]=Game_Message[_0x2d0910(0x3c7)][_0x2d0910(0x331)],Game_Message[_0x2d0910(0x3c7)]['setNumberInput']=function(_0x316982,_0xa8c43){const _0x3eedec=_0x2d0910;this[_0x3eedec(0x2f0)]=$gameTemp[_0x3eedec(0x578)](),VisuMZ[_0x3eedec(0x1f1)][_0x3eedec(0x284)][_0x3eedec(0x5a1)](this,_0x316982,_0xa8c43);},VisuMZ[_0x2d0910(0x1f1)]['Window_NumberInput_start']=Window_NumberInput['prototype'][_0x2d0910(0x605)],Window_NumberInput['prototype']['start']=function(){const _0xb4447b=_0x2d0910;$gameTemp[_0xb4447b(0x559)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0xb4447b(0x1f1)]['Window_NumberInput_start'][_0xb4447b(0x5a1)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x20f)]=Window_NumberInput[_0x2d0910(0x3c7)][_0x2d0910(0x205)],Window_NumberInput[_0x2d0910(0x3c7)]['processOk']=function(){const _0x4ba2a3=_0x2d0910;$gameTemp[_0x4ba2a3(0x559)]($gameMessage[_0x4ba2a3(0x2f0)]),VisuMZ['EventsMoveCore'][_0x4ba2a3(0x20f)][_0x4ba2a3(0x5a1)](this),$gameTemp[_0x4ba2a3(0x21d)](),$gameMessage[_0x4ba2a3(0x2f0)]=undefined;},VisuMZ[_0x2d0910(0x1f1)]['Game_Message_setItemChoice']=Game_Message[_0x2d0910(0x3c7)][_0x2d0910(0x387)],Game_Message[_0x2d0910(0x3c7)]['setItemChoice']=function(_0xb1e69f,_0x3d36a9){const _0x2199ac=_0x2d0910;this['_selfTargetItemChoice']=$gameTemp[_0x2199ac(0x578)](),VisuMZ[_0x2199ac(0x1f1)]['Game_Message_setItemChoice']['call'](this,_0xb1e69f,_0x3d36a9);},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x1fa)]=Window_EventItem[_0x2d0910(0x3c7)]['onOk'],Window_EventItem['prototype'][_0x2d0910(0x51a)]=function(){const _0x192793=_0x2d0910;$gameTemp[_0x192793(0x559)]($gameMessage[_0x192793(0x4b5)]),VisuMZ[_0x192793(0x1f1)][_0x192793(0x1fa)]['call'](this),$gameTemp[_0x192793(0x21d)](),$gameMessage[_0x192793(0x4b5)]=undefined;},VisuMZ['EventsMoveCore'][_0x2d0910(0x4de)]=Window_EventItem[_0x2d0910(0x3c7)][_0x2d0910(0x3b2)],Window_EventItem[_0x2d0910(0x3c7)][_0x2d0910(0x3b2)]=function(){const _0x497f97=_0x2d0910;$gameTemp[_0x497f97(0x559)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x497f97(0x1f1)]['Window_EventItem_onCancel'][_0x497f97(0x5a1)](this),$gameTemp[_0x497f97(0x21d)](),$gameMessage[_0x497f97(0x4b5)]=undefined;},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x2c2)]=Window_Message[_0x2d0910(0x3c7)]['startMessage'],Window_Message['prototype'][_0x2d0910(0x5f8)]=function(){const _0x4c1388=_0x2d0910;$gameMessage[_0x4c1388(0x4c2)](),VisuMZ[_0x4c1388(0x1f1)][_0x4c1388(0x2c2)][_0x4c1388(0x5a1)](this),$gameTemp[_0x4c1388(0x21d)]();},VisuMZ[_0x2d0910(0x1f1)][_0x2d0910(0x1b5)]=Window_ScrollText[_0x2d0910(0x3c7)][_0x2d0910(0x5f8)],Window_ScrollText[_0x2d0910(0x3c7)][_0x2d0910(0x5f8)]=function(){const _0x18347c=_0x2d0910;$gameMessage[_0x18347c(0x4c2)](),VisuMZ[_0x18347c(0x1f1)][_0x18347c(0x1b5)][_0x18347c(0x5a1)](this),$gameTemp[_0x18347c(0x21d)]();};function Window_EventLabel(){const _0x592a1e=_0x2d0910;this[_0x592a1e(0x51c)](...arguments);}Window_EventLabel['prototype']=Object[_0x2d0910(0x32e)](Window_Base[_0x2d0910(0x3c7)]),Window_EventLabel[_0x2d0910(0x3c7)]['constructor']=Window_EventLabel,Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x51c)]=function(_0x20533b){const _0x15f7f4=_0x2d0910;this[_0x15f7f4(0x280)]=_0x20533b;const _0x23c79a=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this[_0x15f7f4(0x3f4)](0x1));this[_0x15f7f4(0x60f)](),Window_Base[_0x15f7f4(0x3c7)][_0x15f7f4(0x51c)]['call'](this,_0x23c79a),this['contentsOpacity']=0x0,this[_0x15f7f4(0x278)](0x2),this[_0x15f7f4(0x3d2)]='';},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x60f)]=function(){const _0x3c3cf9=_0x2d0910;this[_0x3c3cf9(0x2e6)]=![],this[_0x3c3cf9(0x4ad)]=$gameScreen[_0x3c3cf9(0x307)](),this[_0x3c3cf9(0x1de)]=this[_0x3c3cf9(0x280)][_0x3c3cf9(0x3aa)](),this[_0x3c3cf9(0x4d4)]=this[_0x3c3cf9(0x280)][_0x3c3cf9(0x41c)](),this[_0x3c3cf9(0x548)]=this['_event'][_0x3c3cf9(0x595)][_0x3c3cf9(0x338)],this['_eventLabelOffsetY']=this['_event'][_0x3c3cf9(0x595)]['offsetY'],this['_eventPageIndex']=this[_0x3c3cf9(0x280)][_0x3c3cf9(0x34a)],this[_0x3c3cf9(0x35e)]=this[_0x3c3cf9(0x295)](),this[_0x3c3cf9(0x597)]=$gameSystem[_0x3c3cf9(0x207)](),this[_0x3c3cf9(0x62f)]=$gamePlayer['x'],this[_0x3c3cf9(0x379)]=$gamePlayer['y'],this[_0x3c3cf9(0x472)]=this[_0x3c3cf9(0x280)]['x'],this[_0x3c3cf9(0x3e4)]=this[_0x3c3cf9(0x280)]['y'];},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x68b)]=function(){const _0xfef12=_0x2d0910;Window_Base[_0xfef12(0x3c7)]['update'][_0xfef12(0x5a1)](this);if(!this['needsUpdate']())return;this[_0xfef12(0x570)](),this['updateScale'](),this['updatePosition'](),this[_0xfef12(0x22c)]();},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x661)]=function(){const _0x474d35=_0x2d0910;if(!this[_0x474d35(0x280)])return![];if(!this[_0x474d35(0x280)][_0x474d35(0x595)])return![];if(this[_0x474d35(0x305)]!==this[_0x474d35(0x280)][_0x474d35(0x34a)])return!![];if(this[_0x474d35(0x280)]['_erased']&&!this['_eventErased'])return!![];if(this[_0x474d35(0x280)][_0x474d35(0x595)]['text']==='')return![];if(this[_0x474d35(0x4ad)]!==$gameScreen[_0x474d35(0x307)]())return!![];if(this['_eventScreenX']!==this[_0x474d35(0x280)][_0x474d35(0x3aa)]())return!![];if(this['_eventScreenY']!==this[_0x474d35(0x280)][_0x474d35(0x41c)]())return!![];if(this[_0x474d35(0x548)]!==this[_0x474d35(0x280)][_0x474d35(0x595)][_0x474d35(0x338)])return!![];if(this['_eventLabelOffsetY']!==this[_0x474d35(0x280)][_0x474d35(0x595)][_0x474d35(0x655)])return!![];if(this[_0x474d35(0x62f)]!==$gamePlayer['x'])return!![];if(this[_0x474d35(0x379)]!==$gamePlayer['y'])return!![];if(this[_0x474d35(0x472)]!==this[_0x474d35(0x280)]['x'])return!![];if(this[_0x474d35(0x3e4)]!==this[_0x474d35(0x280)]['y'])return!![];if(this[_0x474d35(0x597)]!==$gameSystem[_0x474d35(0x207)]())return!![];if(this[_0x474d35(0x35e)]&&this[_0x474d35(0x5ef)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x474d35(0x5ef)]>0x0)return!![];if(SceneManager[_0x474d35(0x389)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x570)]=function(){const _0x1a6809=_0x2d0910;this[_0x1a6809(0x280)][_0x1a6809(0x69e)]()!==this[_0x1a6809(0x3d2)]&&(this[_0x1a6809(0x3d2)]=this[_0x1a6809(0x280)][_0x1a6809(0x69e)](),this[_0x1a6809(0x5fd)]());},Window_EventLabel['prototype'][_0x2d0910(0x3a9)]=function(){const _0x227490=_0x2d0910;this[_0x227490(0x40e)]['x']=0x1/$gameScreen[_0x227490(0x307)](),this[_0x227490(0x40e)]['y']=0x1/$gameScreen['zoomScale'](),this[_0x227490(0x4ad)]=$gameScreen[_0x227490(0x307)]();},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x257)]=function(){const _0x242420=_0x2d0910;if(!SceneManager[_0x242420(0x389)])return;if(!SceneManager['_scene'][_0x242420(0x5ba)])return;const _0x12c4eb=SceneManager['_scene'][_0x242420(0x5ba)][_0x242420(0x390)](this[_0x242420(0x280)]);if(!_0x12c4eb)return;this['x']=Math['round'](this[_0x242420(0x280)][_0x242420(0x3aa)]()-Math[_0x242420(0x286)](this['width']*this[_0x242420(0x40e)]['x']/0x2)),this['x']+=this[_0x242420(0x280)][_0x242420(0x595)][_0x242420(0x338)],this['y']=this[_0x242420(0x280)][_0x242420(0x41c)]()-_0x12c4eb[_0x242420(0x288)],this['y']+=Math[_0x242420(0x66a)]($gameSystem[_0x242420(0x507)]()*0.5),this['y']-=Math[_0x242420(0x66a)](this[_0x242420(0x288)]*this['scale']['y']),this['y']+=this[_0x242420(0x280)][_0x242420(0x595)][_0x242420(0x655)],this[_0x242420(0x2e6)]=this[_0x242420(0x280)][_0x242420(0x3bd)],this['_eventScreenX']=this[_0x242420(0x280)][_0x242420(0x3aa)](),this['_eventScreenY']=this[_0x242420(0x280)][_0x242420(0x41c)](),this[_0x242420(0x548)]=this['_event']['_labelWindow'][_0x242420(0x338)],this[_0x242420(0x5d7)]=this['_event'][_0x242420(0x595)][_0x242420(0x655)],this[_0x242420(0x305)]=this[_0x242420(0x280)][_0x242420(0x34a)],this[_0x242420(0x2e6)]&&(_0x242420(0x541)===_0x242420(0x471)?(this[_0x242420(0x654)]=new _0x5c46d4(_0x490990[_0x242420(0x66a)](_0x397c86['boxWidth']/0x2),0x30),this[_0x242420(0x654)]['fontFace']=this[_0x242420(0x621)](),this[_0x242420(0x654)][_0x242420(0x669)]=this['fontSize'](),this['bitmap'][_0x242420(0x300)]=_0x571519[_0x242420(0x300)]()):this['contentsOpacity']=0x0);},Window_EventLabel['prototype'][_0x2d0910(0x22c)]=function(){const _0x4a7085=_0x2d0910;if(this[_0x4a7085(0x295)]())this[_0x4a7085(0x5ef)]+=this[_0x4a7085(0x62d)]();else{if(SceneManager[_0x4a7085(0x389)][_0x4a7085(0x4ff)]>0x0){if(_0x4a7085(0x3e8)===_0x4a7085(0x3a2)){if(this[_0x4a7085(0x68a)])return!![];return _0xc0fbd6[_0x4a7085(0x3c7)][_0x4a7085(0x62c)][_0x4a7085(0x5a1)](this);}else this[_0x4a7085(0x5ef)]=0x0;}else this[_0x4a7085(0x5ef)]-=this[_0x4a7085(0x62d)]();}},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x295)]=function(){const _0x273c2b=_0x2d0910;if(!$gameSystem[_0x273c2b(0x207)]())return![];if(this[_0x273c2b(0x280)]?.[_0x273c2b(0x3bd)])return![];if(SceneManager[_0x273c2b(0x389)][_0x273c2b(0x4ff)]>0x0)return![];const _0x3b64ab=$gamePlayer['x'],_0x188bfd=$gamePlayer['y'],_0x3c6c92=this[_0x273c2b(0x280)]['x'],_0x1bfeac=this['_event']['y'];if(this[_0x273c2b(0x62f)]===_0x3b64ab&&this[_0x273c2b(0x379)]===_0x188bfd&&this['_visibleEventX']===_0x3c6c92&&this[_0x273c2b(0x3e4)]===_0x1bfeac)return this[_0x273c2b(0x35e)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x273c2b(0x379)]=$gamePlayer['y'],this[_0x273c2b(0x472)]=this[_0x273c2b(0x280)]['x'],this[_0x273c2b(0x3e4)]=this[_0x273c2b(0x280)]['y'];if($gameMap[_0x273c2b(0x3dc)](_0x3b64ab,_0x188bfd,_0x3c6c92,_0x1bfeac)>this['_event'][_0x273c2b(0x677)]())return this[_0x273c2b(0x35e)]=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){const _0x3cc3df=_0x2d0910;return VisuMZ[_0x3cc3df(0x1f1)][_0x3cc3df(0x48d)][_0x3cc3df(0x374)][_0x3cc3df(0x298)];},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x268)]=function(){const _0x3a78d0=_0x2d0910,_0x134f64=this[_0x3a78d0(0x504)](this[_0x3a78d0(0x3d2)]);this[_0x3a78d0(0x697)]=_0x134f64['width']+($gameSystem[_0x3a78d0(0x507)]()+this[_0x3a78d0(0x4da)]())*0x2,this[_0x3a78d0(0x288)]=Math['max'](this[_0x3a78d0(0x4e9)](),_0x134f64[_0x3a78d0(0x288)])+$gameSystem['windowPadding']()*0x2,this[_0x3a78d0(0x299)]();},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x4e9)]=function(){const _0x24a1bb=_0x2d0910;return VisuMZ[_0x24a1bb(0x1f1)][_0x24a1bb(0x48d)][_0x24a1bb(0x374)]['LineHeight'];},Window_EventLabel['prototype']['resetFontSettings']=function(){const _0x2fb710=_0x2d0910;Window_Base[_0x2fb710(0x3c7)][_0x2fb710(0x68f)][_0x2fb710(0x5a1)](this),this[_0x2fb710(0x3c5)][_0x2fb710(0x669)]=this[_0x2fb710(0x260)]();},Window_EventLabel['prototype']['defaultFontSize']=function(){const _0x5244ce=_0x2d0910;return VisuMZ[_0x5244ce(0x1f1)][_0x5244ce(0x48d)][_0x5244ce(0x374)][_0x5244ce(0x319)];},Window_EventLabel['prototype'][_0x2d0910(0x5fd)]=function(){const _0x227894=_0x2d0910;this['resizeWindow'](),this[_0x227894(0x3c5)]['clear']();const _0x43bddf=this[_0x227894(0x3d2)][_0x227894(0x643)](/[\r\n]+/);let _0x2d7e43=0x0;for(const _0x5cdf0e of _0x43bddf){const _0x4b3af9=this[_0x227894(0x504)](_0x5cdf0e),_0x532dd4=Math[_0x227894(0x286)]((this['innerWidth']-_0x4b3af9['width'])/0x2);this[_0x227894(0x4f3)](_0x5cdf0e,_0x532dd4,_0x2d7e43),_0x2d7e43+=_0x4b3af9['height'];}},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x461)]=function(_0x3144ac,_0x44069b){const _0x292bb6=_0x2d0910;if(_0x44069b[_0x292bb6(0x681)]){if(_0x292bb6(0x4f0)===_0x292bb6(0x49f))return _0x58ffa0[_0x292bb6(0x1f1)][_0x292bb6(0x2e3)][_0x292bb6(0x5d1)](_0x4ac03c[_0x292bb6(0x308)],0x0);else this[_0x292bb6(0x352)](_0x3144ac,_0x44069b['x']+0x2,_0x44069b['y']);}_0x44069b['x']+=Math[_0x292bb6(0x46f)](this['iconSize'](),ImageManager[_0x292bb6(0x3f9)])+0x4;},Window_EventLabel[_0x2d0910(0x3c7)][_0x2d0910(0x352)]=function(_0x4bd0b2,_0x103c70,_0x46f328){const _0x17ffac=_0x2d0910,_0x52c49f=ImageManager[_0x17ffac(0x58e)]('IconSet'),_0x271995=ImageManager[_0x17ffac(0x3f9)],_0x4f7fa9=ImageManager[_0x17ffac(0x277)],_0x5d17e9=_0x4bd0b2%0x10*_0x271995,_0x336fb9=Math['floor'](_0x4bd0b2/0x10)*_0x4f7fa9,_0x162076=Math['min'](this[_0x17ffac(0x28e)]()),_0x18cd41=Math[_0x17ffac(0x46f)](this[_0x17ffac(0x28e)]());this['contents'][_0x17ffac(0x4ac)](_0x52c49f,_0x5d17e9,_0x336fb9,_0x271995,_0x4f7fa9,_0x103c70,_0x46f328,_0x162076,_0x18cd41);},Window_EventLabel['prototype'][_0x2d0910(0x28e)]=function(){const _0x378063=_0x2d0910;return VisuMZ[_0x378063(0x1f1)]['Settings'][_0x378063(0x374)]['IconSize'];};