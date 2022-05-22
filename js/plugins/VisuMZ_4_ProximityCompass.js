//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * ---
 * 
 * === Proximity Compass Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
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
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
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
 * Version 1.04: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: January 15, 2021
 * * Feature Update!
 * ** Failsafes added in case events added manually through other plugins do
 *    not update with proper events.
 * 
 * Version 1.02: November 15, 2020
 * * Bug Fix!
 * ** Events spawned by the Events & Movement Core will now have their compass
 *    icons displayed upon spawning without requiring a reload of the map. Fix
 *    made by Arisu.
 * 
 * Version 1.01: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 *
 * Version 1.00: October 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
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
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
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
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type Number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type Number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
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
 */
//=============================================================================

function _0xaa52(_0x1e64ca,_0x4182ee){const _0x10d1a7=_0x10d1();return _0xaa52=function(_0xaa5256,_0x17ea50){_0xaa5256=_0xaa5256-0x78;let _0xa3e495=_0x10d1a7[_0xaa5256];return _0xa3e495;},_0xaa52(_0x1e64ca,_0x4182ee);}const _0x1c63df=_0xaa52;(function(_0x3512f4,_0x64c35b){const _0x5934e6=_0xaa52,_0x346c97=_0x3512f4();while(!![]){try{const _0x37f567=-parseInt(_0x5934e6(0xce))/0x1+-parseInt(_0x5934e6(0xdd))/0x2+parseInt(_0x5934e6(0xf2))/0x3+parseInt(_0x5934e6(0x82))/0x4+parseInt(_0x5934e6(0xfd))/0x5+parseInt(_0x5934e6(0x7d))/0x6+parseInt(_0x5934e6(0x7c))/0x7*(-parseInt(_0x5934e6(0xfc))/0x8);if(_0x37f567===_0x64c35b)break;else _0x346c97['push'](_0x346c97['shift']());}catch(_0x4e80b4){_0x346c97['push'](_0x346c97['shift']());}}}(_0x10d1,0xede95));function _0x10d1(){const _0x76c9b8=['blendMode','Window_Options_changeVolume','setShowProximityCompass','createFrame','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','compassSize','note','createSpriteset','addProximityCompassSizeCommand','PlayerIcon','toUpperCase','CompassVisibility','ConfigManager_applyData','TileScale','changeProximityCompassSize','loadSystem','initializeProximityCompass','Game_Event_setupSpawn','updateFrame','_iconIndex','filter','ARRAYJSON','iconWidth','includes','BackOpacity','NUM','Filename','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','changeVolume','createProximityCompass','hideCompass','ConfigManager_makeData','BackColor','929081qmpjiA','max','_playerCompassIcon','Compass','IconFadeSpeed','isEventOverloaded','setupProximityCompassNotetags','contains','Scene_Map_createSpriteset','create','ConvertParams','initProximityCompassEffects','clearPageSettings','deltaX','parse','145604hojflF','Game_Event_clearPageSettings','Scene_Options_maxCommands','code','STR','initialize','update','_ProximityCompassSprite','CompassFadeSpeed','_emptyBitmap','setFrame','CenterX','abs','setupPageSettings','screenY','name','sin','scale','tileHeight','maxCommands','Settings','5143971dVvhbs','apply','page','push','bitmap','event','addShowProximityCompassCommand','setupProximityCompassCommentTags','loadBitmap','round','4371760xokVwa','320720sbhebp','createSprites','parameters','_eventOverload','anchor','_compassIconIndex','AddSizeOption','_realY','return\x200','loadPicture','prototype','Game_System_initialize','ShowName','tileWidth','addChildAt','Radius','updatePosition','Window_Options_isVolumeSymbol','Window_Options_addGeneralOptions','Default','setPlayerCompassIcon','getPlayerCompassIcon','Options','_scene','changeValue','_compassProximity','IconSet','EVAL','constructor','JSON','map','_ProximityCompassFrameSprite','isShow','14YCardC','2345730eBzXSf','call','setInitialOpacity','ProximityCompass','addCommand','3598208YtQrIF','createCharacters','cos','iconHeight','format','isShowProximityCompass','registerCommand','match','paintOpacity','isCloseToCompassScreenPosition','isEventRunning','addChild','value','_showProximityCompass','length','_ProximityCompassBackgroundSprite','drawCircle','addProximityCompassCommands','exit','Game_Event_setupPageSettings','opacity','applyData','ARRAYFUNC','clamp','setupSpawn','getConfigValue','_realX','screenX','setupSpawnProximityCompass','trim','ARRAYEVAL','AdjustRect','isBusy','atan2','isSceneMap','addGeneralOptions','_character','showCompass','STRUCT','checkProximityCompassStringTags','_characterSprites','iconIndex','updateOpacity'];_0x10d1=function(){return _0x76c9b8;};return _0x10d1();}var label='ProximityCompass',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1c63df(0xc1)](function(_0x44d461){const _0x11e2c1=_0x1c63df;return _0x44d461['status']&&_0x44d461['description'][_0x11e2c1(0xc4)]('['+label+']');})[0x0];VisuMZ[label][_0x1c63df(0xf1)]=VisuMZ[label][_0x1c63df(0xf1)]||{},VisuMZ[_0x1c63df(0xd8)]=function(_0x10840f,_0x3d34f3){const _0x3ead69=_0x1c63df;for(const _0x3da7bf in _0x3d34f3){if(_0x3da7bf['match'](/(.*):(.*)/i)){const _0x200243=String(RegExp['$1']),_0x461fe3=String(RegExp['$2'])[_0x3ead69(0xb7)]()[_0x3ead69(0x9f)]();let _0x4e2809,_0x5225b1,_0x5ac897;switch(_0x461fe3){case _0x3ead69(0xc6):_0x4e2809=_0x3d34f3[_0x3da7bf]!==''?Number(_0x3d34f3[_0x3da7bf]):0x0;break;case'ARRAYNUM':_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1[_0x3ead69(0x79)](_0x3b76dd=>Number(_0x3b76dd));break;case _0x3ead69(0x118):_0x4e2809=_0x3d34f3[_0x3da7bf]!==''?eval(_0x3d34f3[_0x3da7bf]):null;break;case _0x3ead69(0xa0):_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1[_0x3ead69(0x79)](_0x148a61=>eval(_0x148a61));break;case _0x3ead69(0x78):_0x4e2809=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):'';break;case _0x3ead69(0xc2):_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1['map'](_0x1839cc=>JSON[_0x3ead69(0xdc)](_0x1839cc));break;case'FUNC':_0x4e2809=_0x3d34f3[_0x3da7bf]!==''?new Function(JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf])):new Function(_0x3ead69(0x105));break;case _0x3ead69(0x98):_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1[_0x3ead69(0x79)](_0x156620=>new Function(JSON[_0x3ead69(0xdc)](_0x156620)));break;case _0x3ead69(0xe1):_0x4e2809=_0x3d34f3[_0x3da7bf]!==''?String(_0x3d34f3[_0x3da7bf]):'';break;case'ARRAYSTR':_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON['parse'](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1[_0x3ead69(0x79)](_0x2fc267=>String(_0x2fc267));break;case _0x3ead69(0xa8):_0x5ac897=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):{},_0x4e2809=VisuMZ['ConvertParams']({},_0x5ac897);break;case'ARRAYSTRUCT':_0x5225b1=_0x3d34f3[_0x3da7bf]!==''?JSON[_0x3ead69(0xdc)](_0x3d34f3[_0x3da7bf]):[],_0x4e2809=_0x5225b1['map'](_0x26b2fb=>VisuMZ[_0x3ead69(0xd8)]({},JSON['parse'](_0x26b2fb)));break;default:continue;}_0x10840f[_0x200243]=_0x4e2809;}}return _0x10840f;},(_0x238db7=>{const _0x583574=_0x1c63df,_0x243a35=_0x238db7[_0x583574(0xec)];for(const _0x42f167 of dependencies){if(!Imported[_0x42f167]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x583574(0x86)](_0x243a35,_0x42f167)),SceneManager[_0x583574(0x94)]();break;}}const _0x43831e=_0x238db7['description'];if(_0x43831e[_0x583574(0x89)](/\[Version[ ](.*?)\]/i)){const _0x40c226=Number(RegExp['$1']);_0x40c226!==VisuMZ[label]['version']&&(alert(_0x583574(0xb1)[_0x583574(0x86)](_0x243a35,_0x40c226)),SceneManager[_0x583574(0x94)]());}if(_0x43831e[_0x583574(0x89)](/\[Tier[ ](\d+)\]/i)){const _0x22df8b=Number(RegExp['$1']);_0x22df8b<tier?(alert(_0x583574(0xc8)['format'](_0x243a35,_0x22df8b,tier)),SceneManager['exit']()):tier=Math[_0x583574(0xcf)](_0x22df8b,tier);}VisuMZ[_0x583574(0xd8)](VisuMZ[label][_0x583574(0xf1)],_0x238db7[_0x583574(0xff)]);})(pluginData),PluginManager[_0x1c63df(0x88)](pluginData['name'],_0x1c63df(0xb8),_0x53841f=>{const _0x4a0cf4=_0x1c63df;VisuMZ[_0x4a0cf4(0xd8)](_0x53841f,_0x53841f);const _0x391436=_0x53841f[_0x4a0cf4(0x8e)];$gameSystem[_0x4a0cf4(0xaf)](_0x391436);}),PluginManager[_0x1c63df(0x88)](pluginData[_0x1c63df(0xec)],'CompassPlayerIcon',_0x5951c4=>{const _0x13100d=_0x1c63df;VisuMZ[_0x13100d(0xd8)](_0x5951c4,_0x5951c4);const _0xbc917f=_0x5951c4[_0x13100d(0xab)];$gameSystem[_0x13100d(0x111)](_0xbc917f);}),ConfigManager[_0x1c63df(0xa7)]=!![],ConfigManager['compassSize']=0x64,VisuMZ[_0x1c63df(0x80)][_0x1c63df(0xcc)]=ConfigManager['makeData'],ConfigManager['makeData']=function(){const _0x3d6bda=_0x1c63df,_0x451990=VisuMZ[_0x3d6bda(0x80)]['ConfigManager_makeData'][_0x3d6bda(0x7e)](this);return _0x451990[_0x3d6bda(0xa7)]=this['showCompass'],_0x451990[_0x3d6bda(0xb2)]=this['compassSize'],_0x451990;},VisuMZ[_0x1c63df(0x80)]['ConfigManager_applyData']=ConfigManager[_0x1c63df(0x97)],ConfigManager[_0x1c63df(0x97)]=function(_0x4f507b){const _0x2fc5cb=_0x1c63df;VisuMZ[_0x2fc5cb(0x80)][_0x2fc5cb(0xb9)][_0x2fc5cb(0x7e)](this,_0x4f507b),_0x2fc5cb(0xa7)in _0x4f507b?this[_0x2fc5cb(0xa7)]=_0x4f507b['showCompass']:this[_0x2fc5cb(0xa7)]=ConfigManager['showCompass'],_0x2fc5cb(0xb2)in _0x4f507b?this[_0x2fc5cb(0xb2)]=_0x4f507b[_0x2fc5cb(0xb2)]:this['compassSize']=ConfigManager[_0x2fc5cb(0xb2)];},SceneManager['isSceneMap']=function(){const _0x3b2b1c=_0x1c63df;return this[_0x3b2b1c(0x114)]&&this[_0x3b2b1c(0x114)][_0x3b2b1c(0x119)]===Scene_Map;},TextManager[_0x1c63df(0xa7)]=VisuMZ['ProximityCompass'][_0x1c63df(0xf1)]['Options'][_0x1c63df(0x109)],TextManager[_0x1c63df(0xb2)]=VisuMZ[_0x1c63df(0x80)][_0x1c63df(0xf1)][_0x1c63df(0x113)]['SizeName'],VisuMZ[_0x1c63df(0x80)][_0x1c63df(0x108)]=Game_System[_0x1c63df(0x107)][_0x1c63df(0xe2)],Game_System['prototype'][_0x1c63df(0xe2)]=function(){const _0x18ae3c=_0x1c63df;VisuMZ[_0x18ae3c(0x80)][_0x18ae3c(0x108)][_0x18ae3c(0x7e)](this),this[_0x18ae3c(0xbd)]();},Game_System[_0x1c63df(0x107)][_0x1c63df(0xbd)]=function(){const _0x38bdb9=_0x1c63df;this[_0x38bdb9(0x8f)]=VisuMZ[_0x38bdb9(0x80)]['Settings'][_0x38bdb9(0x110)]['Show'],this[_0x38bdb9(0xd0)]=VisuMZ[_0x38bdb9(0x80)]['Settings'][_0x38bdb9(0x110)][_0x38bdb9(0xb6)];},Game_System[_0x1c63df(0x107)][_0x1c63df(0x87)]=function(){const _0x5c9b3f=_0x1c63df;return this[_0x5c9b3f(0x8f)]===undefined&&this['initializeProximityCompass'](),this[_0x5c9b3f(0x8f)];},Game_System[_0x1c63df(0x107)][_0x1c63df(0xaf)]=function(_0x175a47){const _0x3ae26b=_0x1c63df;this[_0x3ae26b(0x8f)]===undefined&&this[_0x3ae26b(0xbd)](),this[_0x3ae26b(0x8f)]=_0x175a47;},Game_System['prototype'][_0x1c63df(0x112)]=function(){const _0x18a1c0=_0x1c63df;return this[_0x18a1c0(0xd0)]===undefined&&this[_0x18a1c0(0xbd)](),this[_0x18a1c0(0xd0)];},Game_System[_0x1c63df(0x107)][_0x1c63df(0x111)]=function(_0x15bd51){const _0x4e9f44=_0x1c63df;this[_0x4e9f44(0xd0)]===undefined&&this['initializeProximityCompass'](),this[_0x4e9f44(0xd0)]=_0x15bd51;},Game_Map['prototype'][_0x1c63df(0xd3)]=function(){const _0x26fe43=_0x1c63df;return this[_0x26fe43(0x100)];},Game_Map[_0x1c63df(0x107)][_0x1c63df(0xcb)]=function(){const _0x426af6=_0x1c63df;if(!ConfigManager['showCompass'])return!![];else return!!$dataMap&&!!$dataMap[_0x426af6(0xb3)]?$dataMap[_0x426af6(0xb3)][_0x426af6(0x89)](/<HIDE COMPASS>/i):![];},Game_Player[_0x1c63df(0x107)][_0x1c63df(0x8b)]=function(){const _0x5eaeb7=_0x1c63df;if(!SceneManager[_0x5eaeb7(0xa4)]())return![];const _0x35ac80=SceneManager[_0x5eaeb7(0x114)][_0x5eaeb7(0xe4)];if(!_0x35ac80)return![];const _0x27cf47=_0x35ac80['x'],_0x1ec6a2=_0x35ac80['y'],_0x2fdc13=VisuMZ[_0x5eaeb7(0x80)][_0x5eaeb7(0xf1)]['Compass']['Radius']||0x1,_0x9f2f96=_0x35ac80[_0x5eaeb7(0xee)]['x'],_0x1b7eb1=new Rectangle(_0x27cf47-_0x2fdc13*_0x9f2f96,_0x1ec6a2-_0x2fdc13*_0x9f2f96,_0x2fdc13*_0x9f2f96*0x2+$gameMap[_0x5eaeb7(0x10a)]()/0x2,_0x2fdc13*_0x9f2f96*0x2+$gameMap[_0x5eaeb7(0xef)]()/0x2);return _0x1b7eb1[_0x5eaeb7(0xd5)](this[_0x5eaeb7(0x9d)](),this[_0x5eaeb7(0xeb)]());},VisuMZ[_0x1c63df(0x80)][_0x1c63df(0xde)]=Game_Event[_0x1c63df(0x107)][_0x1c63df(0xda)],Game_Event[_0x1c63df(0x107)][_0x1c63df(0xda)]=function(){const _0x18b1e0=_0x1c63df;VisuMZ[_0x18b1e0(0x80)][_0x18b1e0(0xde)][_0x18b1e0(0x7e)](this),this[_0x18b1e0(0xd9)]();},VisuMZ['ProximityCompass'][_0x1c63df(0x95)]=Game_Event[_0x1c63df(0x107)]['setupPageSettings'],Game_Event['prototype'][_0x1c63df(0xea)]=function(){const _0x14786c=_0x1c63df;VisuMZ['ProximityCompass'][_0x14786c(0x95)]['call'](this),this['setupProximityCompassEffects']();},Game_Event[_0x1c63df(0x107)]['setupProximityCompassEffects']=function(){const _0x5b67fa=_0x1c63df;if(!this['event']())return;this['initProximityCompassEffects'](),this[_0x5b67fa(0xd4)](),this[_0x5b67fa(0xf9)]();},Game_Event[_0x1c63df(0x107)][_0x1c63df(0xd4)]=function(){const _0xe5a113=_0x1c63df,_0x1314ba=this[_0xe5a113(0xf7)]()[_0xe5a113(0xb3)];if(_0x1314ba==='')return;this[_0xe5a113(0xa9)](_0x1314ba);},Game_Event[_0x1c63df(0x107)][_0x1c63df(0xf9)]=function(){const _0x1cbf29=_0x1c63df;if(!this[_0x1cbf29(0xf4)]())return;const _0x252216=this['list']();let _0x1e7ea7='';for(const _0xdcabed of _0x252216){if([0x6c,0x198][_0x1cbf29(0xc4)](_0xdcabed[_0x1cbf29(0xe0)])){if(_0x1e7ea7!=='')_0x1e7ea7+='\x0a';_0x1e7ea7+=_0xdcabed[_0x1cbf29(0xff)][0x0];}}this[_0x1cbf29(0xa9)](_0x1e7ea7);},Game_Event[_0x1c63df(0x107)][_0x1c63df(0xd9)]=function(){const _0x2056f9=_0x1c63df;this[_0x2056f9(0x102)]=0x0,this[_0x2056f9(0x116)]=VisuMZ['ProximityCompass'][_0x2056f9(0xf1)][_0x2056f9(0x110)]['Proximity'];},Game_Event['prototype'][_0x1c63df(0xa9)]=function(_0x5b6af0){const _0x1fff2b=_0x1c63df;_0x5b6af0[_0x1fff2b(0x89)](/<COMPASS ICON: (\d+)>/i)&&(this[_0x1fff2b(0x102)]=parseInt(RegExp['$1'])),_0x5b6af0[_0x1fff2b(0x89)](/<COMPASS PROXIMITY: (\d+)>/i)&&(this[_0x1fff2b(0x116)]=parseInt(RegExp['$1']));},VisuMZ[_0x1c63df(0x80)]['Game_Event_setupSpawn']=Game_Event[_0x1c63df(0x107)][_0x1c63df(0x9a)],Game_Event[_0x1c63df(0x107)]['setupSpawn']=function(_0x1f47f2){const _0x42ae01=_0x1c63df;VisuMZ['ProximityCompass'][_0x42ae01(0xbe)]['call'](this,_0x1f47f2),this[_0x42ae01(0x9e)]();},Game_Event[_0x1c63df(0x107)][_0x1c63df(0x9e)]=function(){const _0x56d21f=_0x1c63df,_0x1ccc11=SceneManager[_0x56d21f(0x114)];if(!_0x1ccc11)return;const _0x487d5a=_0x1ccc11[_0x56d21f(0xe4)];if(!_0x487d5a)return;const _0x185efe=_0x487d5a[_0x56d21f(0xaa)][_0x56d21f(0x90)]-0x1,_0x16a7f2=new Sprite_CompassIcon(this);_0x487d5a['_characterSprites'][_0x56d21f(0xf5)](_0x16a7f2),_0x487d5a[_0x56d21f(0x10b)](_0x16a7f2,_0x185efe);},VisuMZ[_0x1c63df(0x80)][_0x1c63df(0xd6)]=Scene_Map['prototype'][_0x1c63df(0xb4)],Scene_Map[_0x1c63df(0x107)]['createSpriteset']=function(){const _0x3b7435=_0x1c63df;VisuMZ['ProximityCompass'][_0x3b7435(0xd6)][_0x3b7435(0x7e)](this),this[_0x3b7435(0xca)]();},Scene_Map[_0x1c63df(0x107)]['createProximityCompass']=function(){const _0x190052=_0x1c63df;if(this[_0x190052(0x119)]!==Scene_Map)return;this['_ProximityCompassSprite']=new Sprite_ProximityCompass(),this['addChild'](this[_0x190052(0xe4)]);},VisuMZ[_0x1c63df(0x80)][_0x1c63df(0xdf)]=Scene_Options[_0x1c63df(0x107)][_0x1c63df(0xf0)],Scene_Options[_0x1c63df(0x107)][_0x1c63df(0xf0)]=function(){const _0x3eeca0=_0x1c63df;let _0x2a7bb8=VisuMZ['ProximityCompass']['Scene_Options_maxCommands'][_0x3eeca0(0x7e)](this);const _0x4820ef=VisuMZ[_0x3eeca0(0x80)]['Settings']['Options'];if(_0x4820ef[_0x3eeca0(0xa1)]){if(_0x4820ef['AddShowOption'])_0x2a7bb8++;if(_0x4820ef[_0x3eeca0(0x103)])_0x2a7bb8++;}return _0x2a7bb8;};function Sprite_ProximityCompass(){const _0x109762=_0x1c63df;this[_0x109762(0xe2)][_0x109762(0xf3)](this,arguments);}Sprite_ProximityCompass[_0x1c63df(0x107)]=Object[_0x1c63df(0xd7)](Sprite_Clickable[_0x1c63df(0x107)]),Sprite_ProximityCompass['prototype'][_0x1c63df(0x119)]=Sprite_ProximityCompass,Sprite_ProximityCompass[_0x1c63df(0x107)][_0x1c63df(0xe2)]=function(){const _0x26d52b=_0x1c63df;Sprite_Clickable[_0x26d52b(0x107)][_0x26d52b(0xe2)][_0x26d52b(0x7e)](this),this[_0x26d52b(0xfe)](),this['x']=eval(VisuMZ[_0x26d52b(0x80)][_0x26d52b(0xf1)]['Compass'][_0x26d52b(0xe8)]),this['y']=eval(VisuMZ[_0x26d52b(0x80)][_0x26d52b(0xf1)][_0x26d52b(0xd1)]['CenterY']),this[_0x26d52b(0x101)]['x']=0.5,this[_0x26d52b(0x101)]['y']=0.5,this[_0x26d52b(0xad)]=0x2,!this[_0x26d52b(0x7b)]()&&(this[_0x26d52b(0x96)]=0x0),this['scale']['x']=ConfigManager[_0x26d52b(0xb2)]*0.01,this['scale']['y']=ConfigManager[_0x26d52b(0xb2)]*0.01;},Sprite_ProximityCompass['prototype'][_0x1c63df(0xfe)]=function(){const _0x2e1b1e=_0x1c63df;this['createBackground'](),this[_0x2e1b1e(0xb0)](),this[_0x2e1b1e(0x83)](),this[_0x2e1b1e(0xe3)]();},Sprite_ProximityCompass[_0x1c63df(0x107)]['createBackground']=function(){const _0x4a6b22=_0x1c63df;this['_ProximityCompassBackgroundSprite']=new Sprite(),this[_0x4a6b22(0x8d)](this['_ProximityCompassBackgroundSprite']),this['_ProximityCompassBackgroundSprite']['anchor']['x']=0.5,this[_0x4a6b22(0x91)][_0x4a6b22(0x101)]['y']=0.5;const _0x2fec27=VisuMZ[_0x4a6b22(0x80)][_0x4a6b22(0xf1)][_0x4a6b22(0xd1)],_0x2aee41=_0x2fec27[_0x4a6b22(0x10c)];var _0x4b38c9=_0x2aee41*0x2,_0x2bc9fc=_0x2aee41*0x2,_0x475021=_0x2fec27[_0x4a6b22(0xcd)];const _0x3398a8=new Bitmap(_0x4b38c9,_0x2bc9fc);_0x3398a8[_0x4a6b22(0x8a)]=_0x2fec27[_0x4a6b22(0xc5)],_0x3398a8[_0x4a6b22(0x92)](_0x4b38c9/0x2,_0x2bc9fc/0x2,_0x4b38c9/0x2,_0x475021),this[_0x4a6b22(0x91)][_0x4a6b22(0xf6)]=_0x3398a8;},Sprite_ProximityCompass[_0x1c63df(0x107)][_0x1c63df(0xb0)]=function(){const _0xeb1c24=_0x1c63df;this[_0xeb1c24(0x7a)]=new Sprite(),this[_0xeb1c24(0x8d)](this[_0xeb1c24(0x7a)]),this[_0xeb1c24(0x7a)][_0xeb1c24(0x101)]['x']=0.5,this['_ProximityCompassFrameSprite'][_0xeb1c24(0x101)]['y']=0.5;const _0x113209=VisuMZ[_0xeb1c24(0x80)][_0xeb1c24(0xf1)]['Compass'][_0xeb1c24(0xc7)];_0x113209?this['_ProximityCompassFrameSprite'][_0xeb1c24(0xf6)]=ImageManager[_0xeb1c24(0x106)](_0x113209):this[_0xeb1c24(0x7a)][_0xeb1c24(0xf6)]=ImageManager[_0xeb1c24(0xe6)];},Sprite_ProximityCompass['prototype'][_0x1c63df(0x83)]=function(){const _0x55a06a=_0x1c63df;this['_characterSprites']=[],$gameMap['events']()['forEach'](function(_0xe12c37){const _0x2c8231=_0xaa52;this['_characterSprites'][_0x2c8231(0xf5)](new Sprite_CompassIcon(_0xe12c37));},this),this[_0x55a06a(0xaa)]['push'](new Sprite_CompassIcon($gamePlayer));for(var _0x2d8244=0x0;_0x2d8244<this[_0x55a06a(0xaa)][_0x55a06a(0x90)];_0x2d8244++){this[_0x55a06a(0x8d)](this['_characterSprites'][_0x2d8244]);}},Sprite_ProximityCompass[_0x1c63df(0x107)][_0x1c63df(0xe3)]=function(){const _0x5bfb27=_0x1c63df;Sprite_Clickable['prototype'][_0x5bfb27(0xe3)][_0x5bfb27(0x7e)](this),this['updateOpacity']();},Sprite_ProximityCompass['prototype'][_0x1c63df(0xac)]=function(){const _0x19a20b=_0x1c63df,_0x1ad5b5=VisuMZ[_0x19a20b(0x80)][_0x19a20b(0xf1)][_0x19a20b(0xd1)][_0x19a20b(0xe5)];this[_0x19a20b(0x7b)]()?this[_0x19a20b(0x96)]+=_0x1ad5b5:this[_0x19a20b(0x96)]-=_0x1ad5b5;},Sprite_ProximityCompass['prototype']['isShow']=function(){const _0x225260=_0x1c63df,_0x3c0b65=VisuMZ[_0x225260(0x80)][_0x225260(0xf1)][_0x225260(0xd1)];if($gameMap[_0x225260(0xcb)]())return![];else{if(_0x3c0b65['HideMessage']&&$gameMessage[_0x225260(0xa2)]())return![];else{if(_0x3c0b65['HideEvents']&&$gameMap[_0x225260(0x8c)]())return![];else return $gamePlayer[_0x225260(0x8b)]()?![]:$gameSystem[_0x225260(0x87)]();}}};function Sprite_CompassIcon(){const _0x31391e=_0x1c63df;this[_0x31391e(0xe2)]['apply'](this,arguments);}Sprite_CompassIcon[_0x1c63df(0x107)]=Object[_0x1c63df(0xd7)](Sprite['prototype']),Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0x119)]=Sprite_CompassIcon,Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0xe2)]=function(_0x3f8a27){const _0x396aed=_0x1c63df;this[_0x396aed(0xa6)]=_0x3f8a27,this[_0x396aed(0xc0)]=0x0,Sprite['prototype'][_0x396aed(0xe2)][_0x396aed(0x7e)](this),this['anchor']['x']=0.5,this[_0x396aed(0x101)]['y']=0.5,this[_0x396aed(0xfa)]();var _0x4dba2b=0x1/(ConfigManager[_0x396aed(0xb2)]*0.01);this[_0x396aed(0xee)]['x']=_0x4dba2b,this[_0x396aed(0xee)]['y']=_0x4dba2b,this[_0x396aed(0x7f)]();},Sprite_CompassIcon[_0x1c63df(0x107)]['loadBitmap']=function(){const _0x267f8d=_0x1c63df;this['bitmap']=ImageManager[_0x267f8d(0xbc)](_0x267f8d(0x117));},Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0x7f)]=function(){const _0x47ed8b=_0x1c63df;if(this[_0x47ed8b(0xa6)]===$gamePlayer)this['opacity']=0xff;else{var _0x16bf2c=this['_character'][_0x47ed8b(0x116)],_0x9cef6b=$gameMap[_0x47ed8b(0xdb)](this['_character']['_realX'],$gamePlayer[_0x47ed8b(0x9c)]),_0x463998=$gameMap[_0x47ed8b(0xdb)](this[_0x47ed8b(0xa6)][_0x47ed8b(0x104)],$gamePlayer[_0x47ed8b(0x104)]);_0x16bf2c>=Math[_0x47ed8b(0xe9)](_0x9cef6b)+Math[_0x47ed8b(0xe9)](_0x463998)?this[_0x47ed8b(0x96)]=0xff:this[_0x47ed8b(0x96)]=0x0;}},Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0xe3)]=function(){const _0x3c9c2d=_0x1c63df;Sprite[_0x3c9c2d(0x107)]['update'][_0x3c9c2d(0x7e)](this),this[_0x3c9c2d(0xac)](),this['updateFrame'](),this['updatePosition']();},Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0xac)]=function(){const _0x444ccd=_0x1c63df;if(this[_0x444ccd(0xa6)]===$gamePlayer)this[_0x444ccd(0x96)]=0xff;else{if(this[_0x444ccd(0xa6)]&&this[_0x444ccd(0xa6)]['_erased'])this['opacity']=0x0;else{var _0x312cc6=this[_0x444ccd(0xa6)]['_compassProximity'],_0x3e4073=$gameMap[_0x444ccd(0xdb)](this[_0x444ccd(0xa6)][_0x444ccd(0x9c)],$gamePlayer[_0x444ccd(0x9c)]),_0x434284=$gameMap[_0x444ccd(0xdb)](this[_0x444ccd(0xa6)][_0x444ccd(0x104)],$gamePlayer['_realY']);const _0x4837fb=VisuMZ[_0x444ccd(0x80)][_0x444ccd(0xf1)][_0x444ccd(0xd1)][_0x444ccd(0xd2)];_0x312cc6>=Math[_0x444ccd(0xe9)](_0x3e4073)+Math[_0x444ccd(0xe9)](_0x434284)?this[_0x444ccd(0x96)]+=_0x4837fb:this[_0x444ccd(0x96)]-=_0x4837fb;}}},Sprite_CompassIcon['prototype'][_0x1c63df(0xbf)]=function(){const _0x50f662=_0x1c63df;this['_character']===$gamePlayer?this['_iconIndex']=$gameSystem[_0x50f662(0x112)]():this['_iconIndex']=this['_character'][_0x50f662(0x102)];if(this[_0x50f662(0xc0)]===0x0)this[_0x50f662(0xe7)](0x0,0x0,0x0,0x0);else{var _0xa44a5=ImageManager[_0x50f662(0xc3)],_0x3ee17b=ImageManager[_0x50f662(0x85)],_0x20e7f8=this[_0x50f662(0xc0)]%0x10*_0xa44a5,_0x111f09=Math['floor'](this[_0x50f662(0xc0)]/0x10)*_0x3ee17b;this[_0x50f662(0xe7)](_0x20e7f8,_0x111f09,_0xa44a5,_0x3ee17b);}},Sprite_CompassIcon[_0x1c63df(0x107)][_0x1c63df(0x10d)]=function(){const _0xe07b6c=_0x1c63df,_0x3d431d=VisuMZ[_0xe07b6c(0x80)][_0xe07b6c(0xf1)][_0xe07b6c(0xd1)];var _0xc4d4ca=_0x3d431d['Radius'],_0xe51d18=_0x3d431d[_0xe07b6c(0xba)]*$gameMap['tileWidth'](),_0x158e33=$gameMap[_0xe07b6c(0xdb)](this[_0xe07b6c(0xa6)][_0xe07b6c(0x9c)],$gamePlayer[_0xe07b6c(0x9c)])*_0xe51d18,_0xc992fe=$gameMap[_0xe07b6c(0xdb)](this[_0xe07b6c(0xa6)]['_realY'],$gamePlayer[_0xe07b6c(0x104)])*_0xe51d18,_0x54f78c=Math['sqrt'](_0x158e33*_0x158e33+_0xc992fe*_0xc992fe);if(_0x54f78c<_0xc4d4ca)this['x']=Math[_0xe07b6c(0xfb)](_0x158e33),this['y']=Math[_0xe07b6c(0xfb)](_0xc992fe);else{var _0x3fd042=Math[_0xe07b6c(0xa3)](_0xc992fe,_0x158e33);this['x']=Math['round'](_0xc4d4ca*Math[_0xe07b6c(0x84)](_0x3fd042)),this['y']=Math[_0xe07b6c(0xfb)](_0xc4d4ca*Math[_0xe07b6c(0xed)](_0x3fd042));}},VisuMZ['ProximityCompass'][_0x1c63df(0x10f)]=Window_Options[_0x1c63df(0x107)]['addGeneralOptions'],Window_Options[_0x1c63df(0x107)][_0x1c63df(0xa5)]=function(){const _0x12e045=_0x1c63df;VisuMZ[_0x12e045(0x80)][_0x12e045(0x10f)]['call'](this),this[_0x12e045(0x93)]();},Window_Options[_0x1c63df(0x107)][_0x1c63df(0x93)]=function(){const _0x44d32d=_0x1c63df;VisuMZ[_0x44d32d(0x80)][_0x44d32d(0xf1)]['Options']['AddShowOption']&&this['addShowProximityCompassCommand'](),VisuMZ[_0x44d32d(0x80)][_0x44d32d(0xf1)][_0x44d32d(0x113)][_0x44d32d(0x103)]&&this[_0x44d32d(0xb5)]();},Window_Options[_0x1c63df(0x107)][_0x1c63df(0xf8)]=function(){const _0x2f3c10=_0x1c63df,_0x3a2ec2=TextManager[_0x2f3c10(0xa7)],_0x275383=_0x2f3c10(0xa7);this[_0x2f3c10(0x81)](_0x3a2ec2,_0x275383);},Window_Options[_0x1c63df(0x107)][_0x1c63df(0xb5)]=function(){const _0x3758f7=_0x1c63df,_0x39d1d1=TextManager[_0x3758f7(0xb2)],_0x43749a='compassSize';this['addCommand'](_0x39d1d1,_0x43749a);},VisuMZ[_0x1c63df(0x80)][_0x1c63df(0x10e)]=Window_Options[_0x1c63df(0x107)]['isVolumeSymbol'],Window_Options[_0x1c63df(0x107)]['isVolumeSymbol']=function(_0xd65ef6){const _0x1ef3b2=_0x1c63df;return _0xd65ef6==='compassSize'?!![]:VisuMZ[_0x1ef3b2(0x80)][_0x1ef3b2(0x10e)]['call'](this,_0xd65ef6);},VisuMZ['ProximityCompass'][_0x1c63df(0xae)]=Window_Options['prototype'][_0x1c63df(0xc9)],Window_Options[_0x1c63df(0x107)]['changeVolume']=function(_0x594fc0,_0x1c0bc7,_0x3e38c8){const _0x25f1dd=_0x1c63df;_0x594fc0===_0x25f1dd(0xb2)?this[_0x25f1dd(0xbb)](_0x594fc0,_0x1c0bc7,_0x3e38c8):VisuMZ[_0x25f1dd(0x80)][_0x25f1dd(0xae)][_0x25f1dd(0x7e)](this,_0x594fc0,_0x1c0bc7,_0x3e38c8);},Window_Options['prototype'][_0x1c63df(0xbb)]=function(_0x1ff4ee,_0x3629cb,_0x5ab89a){const _0x3bad48=_0x1c63df,_0x5b43f7=this[_0x3bad48(0x9b)](_0x1ff4ee),_0x19f29e=0xa,_0x5ec284=_0x5b43f7+(_0x3629cb?_0x19f29e:-_0x19f29e);_0x5ec284>0x64&&_0x5ab89a?this['changeValue'](_0x1ff4ee,0x32):this[_0x3bad48(0x115)](_0x1ff4ee,_0x5ec284[_0x3bad48(0x99)](0x32,0x64));};