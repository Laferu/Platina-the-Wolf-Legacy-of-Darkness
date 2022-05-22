//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.16] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Actor ID:
 *   - Select which ID(s) to affect.
 *
 *   Filename:
 *   - Selected actor(s) will have their menu images changed to this.
 *
 * ---
 * 
 * === Menu Command Plugin Commands ===
 * 
 * ---
 * 
 * Menu Command: Clear Forced Settings
 * - Clear any forced settings for the menu command symbols.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Disable
 * - Forcefully disable specific menu commands via their symbols.
 * - Matching forced enabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Enable
 * - Forcefully enable specific menu commands via their symbols.
 * - Matching forced disabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Hide
 * - Forcefully hide specific menu commands via their symbols.
 * - Matching forced shown symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Show
 * - Forcefully show specific menu commands via their symbols.
 * - Matching forced hidden symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
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
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.16: April 21, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Menu Command: Clear Forced Settings
 * *** Menu Command: Force Disable
 * *** Menu Command: Force Enable
 * *** Menu Command: Force Hide
 * *** Menu Command: Force Show
 * **** These new Plugin Commands allow you to forcefully show, hide, enable,
 *      or disable Plugin Commands regardless of their required settings.
 * **** We are not responsible for errors that occur by accessing menus that
 *      should otherwise be disabled or hidden.
 * 
 * Version 1.15: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Actor ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Actor ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MenuCommand
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandClear
 * @text Menu Command: Clear Forced Settings
 * @desc Clear any forced settings for the menu command symbols.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceDisable
 * @text Menu Command: Force Disable
 * @desc Forcefully disable specific menu commands via their symbols.
 * Matching forced enabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceEnable
 * @text Menu Command: Force Enable
 * @desc Forcefully enable specific menu commands via their symbols.
 * Matching forced disabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceHide
 * @text Menu Command: Force Hide
 * @desc Forcefully hide specific menu commands via their symbols.
 * Matching forced shown symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceShow
 * @text Menu Command: Force Show
 * @desc Forcefully show specific menu commands via their symbols.
 * Matching forced hidden symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
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
 * @param MainMenuCore
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
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x79d2d0=_0x34e1;(function(_0x54852b,_0x585b74){const _0x5e8dd9=_0x34e1,_0x11ac0a=_0x54852b();while(!![]){try{const _0x2ae038=-parseInt(_0x5e8dd9(0x153))/0x1*(-parseInt(_0x5e8dd9(0x268))/0x2)+parseInt(_0x5e8dd9(0x1f1))/0x3+parseInt(_0x5e8dd9(0x22b))/0x4+parseInt(_0x5e8dd9(0x1bf))/0x5*(parseInt(_0x5e8dd9(0x1ec))/0x6)+-parseInt(_0x5e8dd9(0x202))/0x7*(parseInt(_0x5e8dd9(0x1f9))/0x8)+parseInt(_0x5e8dd9(0x17f))/0x9*(-parseInt(_0x5e8dd9(0x210))/0xa)+parseInt(_0x5e8dd9(0x1e2))/0xb;if(_0x2ae038===_0x585b74)break;else _0x11ac0a['push'](_0x11ac0a['shift']());}catch(_0x1c9f5d){_0x11ac0a['push'](_0x11ac0a['shift']());}}}(_0xeabd,0x8e9d1));var label='MainMenuCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x79d2d0(0x1af)](function(_0x4d159b){const _0x49bac6=_0x79d2d0;return _0x4d159b[_0x49bac6(0x27c)]&&_0x4d159b[_0x49bac6(0x2a7)][_0x49bac6(0x275)]('['+label+']');})[0x0];VisuMZ[label][_0x79d2d0(0x113)]=VisuMZ[label][_0x79d2d0(0x113)]||{},VisuMZ[_0x79d2d0(0x1ee)]=function(_0x345b71,_0x242b98){const _0x1204b9=_0x79d2d0;for(const _0x5d4368 in _0x242b98){if(_0x5d4368[_0x1204b9(0x14a)](/(.*):(.*)/i)){if(_0x1204b9(0x25f)!==_0x1204b9(0x25f)){this[_0x1204b9(0x247)]=0x3c;const _0x18f870=this['itemLineRect'](0x0),_0x247a5a=_0x18f870['x'],_0x5b442=_0x18f870['y'],_0x464fa0=_0x18f870['width'];this[_0x1204b9(0x144)][_0x1204b9(0x11f)](),this[_0x1204b9(0x299)](_0x18f870),this[_0x1204b9(0x12b)](_0x18f870),this[_0x1204b9(0x173)](_0x18f870);}else{const _0x48070d=String(RegExp['$1']),_0x56cf7e=String(RegExp['$2'])['toUpperCase']()[_0x1204b9(0x2b1)]();let _0x5e17b7,_0x30ba19,_0x998b8d;switch(_0x56cf7e){case _0x1204b9(0x1cc):_0x5e17b7=_0x242b98[_0x5d4368]!==''?Number(_0x242b98[_0x5d4368]):0x0;break;case _0x1204b9(0x172):_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19[_0x1204b9(0x1a2)](_0x3c9e0c=>Number(_0x3c9e0c));break;case'EVAL':_0x5e17b7=_0x242b98[_0x5d4368]!==''?eval(_0x242b98[_0x5d4368]):null;break;case _0x1204b9(0x1d5):_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19[_0x1204b9(0x1a2)](_0x2749c6=>eval(_0x2749c6));break;case _0x1204b9(0x20e):_0x5e17b7=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):'';break;case _0x1204b9(0x1f5):_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19[_0x1204b9(0x1a2)](_0x10085f=>JSON[_0x1204b9(0x259)](_0x10085f));break;case _0x1204b9(0x1e4):_0x5e17b7=_0x242b98[_0x5d4368]!==''?new Function(JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368])):new Function(_0x1204b9(0x1fb));break;case _0x1204b9(0x10d):_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON['parse'](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19['map'](_0x1d3966=>new Function(JSON[_0x1204b9(0x259)](_0x1d3966)));break;case _0x1204b9(0x223):_0x5e17b7=_0x242b98[_0x5d4368]!==''?String(_0x242b98[_0x5d4368]):'';break;case _0x1204b9(0x186):_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19['map'](_0xa1177c=>String(_0xa1177c));break;case _0x1204b9(0x1a1):_0x998b8d=_0x242b98[_0x5d4368]!==''?JSON['parse'](_0x242b98[_0x5d4368]):{},_0x345b71[_0x48070d]={},VisuMZ['ConvertParams'](_0x345b71[_0x48070d],_0x998b8d);continue;case'ARRAYSTRUCT':_0x30ba19=_0x242b98[_0x5d4368]!==''?JSON[_0x1204b9(0x259)](_0x242b98[_0x5d4368]):[],_0x5e17b7=_0x30ba19[_0x1204b9(0x1a2)](_0x5e576c=>VisuMZ[_0x1204b9(0x1ee)]({},JSON[_0x1204b9(0x259)](_0x5e576c)));break;default:continue;}_0x345b71[_0x48070d]=_0x5e17b7;}}}return _0x345b71;},(_0x4691c1=>{const _0x5e4114=_0x79d2d0,_0xaa281b=_0x4691c1[_0x5e4114(0x12f)];for(const _0xcac869 of dependencies){if(_0x5e4114(0x23c)!==_0x5e4114(0x24f)){if(!Imported[_0xcac869]){if('uJHQt'===_0x5e4114(0x17b)){const _0x5f18f3=_0xce669[_0x5e4114(0x292)]-this['calcWindowHeight'](0x1,![]);_0x1e1cd8['y']+=_0x5f18f3;}else{alert(_0x5e4114(0x254)['format'](_0xaa281b,_0xcac869)),SceneManager['exit']();break;}}}else return _0x29b176[_0x5e4114(0x27c)]&&_0x14f0b2[_0x5e4114(0x2a7)]['includes']('['+_0xd80788+']');}const _0x35d72e=_0x4691c1['description'];if(_0x35d72e[_0x5e4114(0x14a)](/\[Version[ ](.*?)\]/i)){if('cLHCw'!==_0x5e4114(0x29a)){const _0x2169f2=this[_0x5e4114(0x12a)]();this[_0x5e4114(0x264)]=this['thinGoldWindow']()?new _0x4a7320(_0x2169f2):new _0x47d72d(_0x2169f2),this['addWindow'](this[_0x5e4114(0x264)]);}else{const _0x1efd8c=Number(RegExp['$1']);_0x1efd8c!==VisuMZ[label][_0x5e4114(0x193)]&&(alert(_0x5e4114(0x110)[_0x5e4114(0x277)](_0xaa281b,_0x1efd8c)),SceneManager[_0x5e4114(0x146)]());}}if(_0x35d72e['match'](/\[Tier[ ](\d+)\]/i)){const _0x35e60f=Number(RegExp['$1']);if(_0x35e60f<tier){if(_0x5e4114(0x1bc)==='cTgjY')alert(_0x5e4114(0x22d)['format'](_0xaa281b,_0x35e60f,tier)),SceneManager[_0x5e4114(0x146)]();else{const _0x265c6c=this[_0x5e4114(0x26a)]();if([_0x5e4114(0x242),_0x5e4114(0x2b2),_0x5e4114(0x208)][_0x5e4114(0x275)](_0x265c6c))return this[_0x5e4114(0x1e1)]();else return['bottom','thinBottom'][_0x5e4114(0x275)](_0x265c6c)?this[_0x5e4114(0x25e)]():_0x71637a[_0x5e4114(0x1c4)]['Settings'][_0x5e4114(0x1b7)]['WindowRect'][_0x5e4114(0x10a)](this);}}else tier=Math['max'](_0x35e60f,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5e4114(0x113)],_0x4691c1[_0x5e4114(0x1e3)]);})(pluginData),PluginManager[_0x79d2d0(0x14e)](pluginData[_0x79d2d0(0x12f)],_0x79d2d0(0x29c),_0xfdbb03=>{const _0x2cd935=_0x79d2d0;VisuMZ[_0x2cd935(0x1ee)](_0xfdbb03,_0xfdbb03);const _0xfc2d56=_0xfdbb03['Step1'],_0x591987=_0xfdbb03['Step2'];for(let _0x2e4b19 of _0xfc2d56){_0x2e4b19=parseInt(_0x2e4b19)||0x0;if(_0x2e4b19<=0x0)continue;const _0x4cf696=$gameActors['actor'](_0x2e4b19);if(!_0x4cf696)continue;_0x4cf696[_0x2cd935(0x1a9)](_0x591987);}}),PluginManager['registerCommand'](pluginData[_0x79d2d0(0x12f)],_0x79d2d0(0x20d),_0x1fcb6b=>{const _0x146537=_0x79d2d0;VisuMZ[_0x146537(0x1ee)](_0x1fcb6b,_0x1fcb6b);const _0x1f40a3=_0x1fcb6b[_0x146537(0x140)]>=_0x1fcb6b[_0x146537(0x12d)]?_0x1fcb6b[_0x146537(0x12d)]:_0x1fcb6b[_0x146537(0x140)],_0x39dd09=_0x1fcb6b[_0x146537(0x140)]>=_0x1fcb6b[_0x146537(0x12d)]?_0x1fcb6b['Step1End']:_0x1fcb6b['Step1Start'],_0x37d61c=Array(_0x39dd09-_0x1f40a3+0x1)['fill']()[_0x146537(0x1a2)]((_0x43143b,_0x559ca9)=>_0x1f40a3+_0x559ca9),_0x59fdb6=_0x1fcb6b['Step2'];for(let _0x16d4d6 of _0x37d61c){if(_0x146537(0x160)===_0x146537(0x11a)){_0x25866c[_0x146537(0x1c4)][_0x146537(0x166)][_0x146537(0x10a)](this);if(this[_0x146537(0x26a)]()==='mobile')this['_statusWindow'][_0x146537(0x230)]();}else{_0x16d4d6=parseInt(_0x16d4d6)||0x0;if(_0x16d4d6<=0x0)continue;const _0x17c44c=$gameActors[_0x146537(0x16e)](_0x16d4d6);if(!_0x17c44c)continue;_0x17c44c[_0x146537(0x1a9)](_0x59fdb6);}}}),PluginManager[_0x79d2d0(0x14e)](pluginData[_0x79d2d0(0x12f)],_0x79d2d0(0x26e),_0x1810c2=>{const _0x445302=_0x79d2d0;VisuMZ['ConvertParams'](_0x1810c2,_0x1810c2);const _0xfb5596=_0x1810c2['Step1'];let _0x4ed10b=[];while(_0xfb5596[_0x445302(0x10e)]>0x0){const _0x4eac2a=_0xfb5596[_0x445302(0x296)]();if(Array[_0x445302(0x130)](_0x4eac2a))_0x4ed10b=_0x4ed10b[_0x445302(0x1a6)](_0x4eac2a);else{if(_0x445302(0x258)!==_0x445302(0x1ac))_0x4ed10b[_0x445302(0x260)](_0x4eac2a);else return this['variableWindowRectTopStyle']();}}const _0x28e7fc=_0x1810c2[_0x445302(0x1fc)];for(let _0x1e7283 of _0x4ed10b){if(_0x445302(0x1d9)===_0x445302(0x1d9)){_0x1e7283=parseInt(_0x1e7283)||0x0;if(_0x1e7283<=0x0)continue;const _0x3d4526=$gameActors[_0x445302(0x16e)](_0x1e7283);if(!_0x3d4526)continue;_0x3d4526['setMenuImage'](_0x28e7fc);}else _0x50e95e[_0x445302(0x1c4)][_0x445302(0x157)][_0x445302(0x10a)](this);}}),PluginManager[_0x79d2d0(0x14e)](pluginData['name'],_0x79d2d0(0x142),_0x37f958=>{const _0x1da3c8=_0x79d2d0;VisuMZ['ConvertParams'](_0x37f958,_0x37f958);const _0x22a6cf=_0x37f958[_0x1da3c8(0x270)]||[];for(const _0x52c08c of _0x22a6cf){if(_0x1da3c8(0x175)===_0x1da3c8(0x175))$gameSystem['clearShowMainMenuCommand'](_0x52c08c);else{const _0x2b104d=this[_0x1da3c8(0x201)]();if(['thin',_0x1da3c8(0x19f)][_0x1da3c8(0x275)](_0x2b104d))return![];return _0x42ca34[_0x1da3c8(0x2a0)][_0x1da3c8(0x295)][_0x1da3c8(0x10a)](this);}}}),PluginManager[_0x79d2d0(0x14e)](pluginData[_0x79d2d0(0x12f)],'MenuCommandForceEnable',_0xd1cd9c=>{const _0x2544cb=_0x79d2d0;VisuMZ[_0x2544cb(0x1ee)](_0xd1cd9c,_0xd1cd9c);const _0x482764=_0xd1cd9c['Symbols']||[];for(const _0x412adb of _0x482764){if(_0x2544cb(0x1bd)===_0x2544cb(0x1bd))$gameSystem[_0x2544cb(0x1c1)](_0x412adb);else{const _0x4f57d8=this['mainMenuCoreSettings']();!_0x4f57d8[_0x2544cb(0x195)][_0x2544cb(0x275)](_0x58de8d)&&_0x4f57d8['forceHide'][_0x2544cb(0x260)](_0x45c252),_0x4f57d8[_0x2544cb(0x176)][_0x2544cb(0x1a0)](_0x1db6d3);}}}),PluginManager[_0x79d2d0(0x14e)](pluginData[_0x79d2d0(0x12f)],'MenuCommandForceDisable',_0x5aafc0=>{const _0x47fb6f=_0x79d2d0;VisuMZ[_0x47fb6f(0x1ee)](_0x5aafc0,_0x5aafc0);const _0x461ac8=_0x5aafc0['Symbols']||[];for(const _0x507572 of _0x461ac8){$gameSystem[_0x47fb6f(0x17d)](_0x507572);}}),PluginManager['registerCommand'](pluginData[_0x79d2d0(0x12f)],'MenuCommandForceHide',_0x208135=>{const _0xcdb3ce=_0x79d2d0;VisuMZ[_0xcdb3ce(0x1ee)](_0x208135,_0x208135);const _0x4e2586=_0x208135[_0xcdb3ce(0x270)]||[];for(const _0x431b86 of _0x4e2586){'IuYpy'!==_0xcdb3ce(0x1d2)?(_0x3ba4f9[_0xcdb3ce(0x2a0)]['initialize']['call'](this,_0x2cd4b2),this['_data']=_0x35b44a[_0xcdb3ce(0x1c4)]['Settings']['Variable'][_0xcdb3ce(0x24c)],this[_0xcdb3ce(0x1c7)]()):$gameSystem['forceHideMainMenuCommand'](_0x431b86);}}),PluginManager[_0x79d2d0(0x14e)](pluginData[_0x79d2d0(0x12f)],_0x79d2d0(0x194),_0x31c495=>{const _0x40ba70=_0x79d2d0;VisuMZ[_0x40ba70(0x1ee)](_0x31c495,_0x31c495);const _0x5bc7f1=_0x31c495[_0x40ba70(0x270)]||[];for(const _0x2f8e2f of _0x5bc7f1){$gameSystem[_0x40ba70(0x237)](_0x2f8e2f);}}),VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x1f0)]=Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)],Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)]=function(){const _0xdaebb0=_0x79d2d0;VisuMZ[_0xdaebb0(0x1c4)]['Game_System_initialize'][_0xdaebb0(0x10a)](this),this['initMainMenuCore']();},Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x262)]=function(){const _0x58182e=_0x79d2d0;this['_mainMenuCore']=this[_0x58182e(0x1dc)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x14c)]=function(){const _0x24dc26=_0x79d2d0;if(this[_0x24dc26(0x1dc)]===undefined)this[_0x24dc26(0x262)]();const _0x14ea81=['forceShow',_0x24dc26(0x195),_0x24dc26(0x13f),_0x24dc26(0x1d1)];for(const _0x176788 of _0x14ea81){if(_0x24dc26(0x25c)!=='FlYPJ'){const _0x3aaa23=this[_0x24dc26(0x1d0)];this['x']=(this['x']*(_0x3aaa23-0x1)+this[_0x24dc26(0x13a)])/_0x3aaa23,this['y']=(this['y']*(_0x3aaa23-0x1)+this[_0x24dc26(0x28d)])/_0x3aaa23;}else this[_0x24dc26(0x1dc)][_0x176788]=this[_0x24dc26(0x1dc)][_0x176788]||[];}return this[_0x24dc26(0x1dc)];},Game_System[_0x79d2d0(0x2a0)]['getMainMenuSymbolState']=function(_0x59a0a9,_0x16f92d){const _0x4950ae=_0x79d2d0,_0x42db5c=this[_0x4950ae(0x14c)]();if(!_0x42db5c[_0x16f92d])return![];return _0x42db5c[_0x16f92d]['includes'](_0x59a0a9);},Game_System['prototype'][_0x79d2d0(0x154)]=function(_0x1a2cb3){const _0x4569aa=_0x79d2d0,_0x434249=this['mainMenuCoreSettings'](),_0x16efb3=[_0x4569aa(0x176),_0x4569aa(0x195),_0x4569aa(0x13f),'forceDisable'];for(const _0x174ee9 of _0x16efb3){if(_0x4569aa(0x225)===_0x4569aa(0x236)){const _0x6231de=_0x16c1ac[_0x4569aa(0x1c4)][_0x4569aa(0x1a8)][_0x4569aa(0x10a)](this);return this['adjustDefaultCommandWindowRect'](_0x6231de),_0x6231de;}else _0x434249[_0x174ee9][_0x4569aa(0x1a0)](_0x1a2cb3);}},Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x237)]=function(_0x9d59e6){const _0x5979ed=_0x79d2d0,_0x1c00aa=this[_0x5979ed(0x14c)]();!_0x1c00aa[_0x5979ed(0x176)][_0x5979ed(0x275)](_0x9d59e6)&&_0x1c00aa[_0x5979ed(0x176)][_0x5979ed(0x260)](_0x9d59e6),_0x1c00aa[_0x5979ed(0x195)][_0x5979ed(0x1a0)](_0x9d59e6);},Game_System['prototype']['forceHideMainMenuCommand']=function(_0x30a936){const _0x59d348=_0x79d2d0,_0xe08f02=this['mainMenuCoreSettings']();if(!_0xe08f02['forceHide']['includes'](_0x30a936)){if('NHdFJ'!==_0x59d348(0x29d))_0xe08f02['forceHide'][_0x59d348(0x260)](_0x30a936);else{const _0x470a15=this[_0x59d348(0x278)](_0x17883a),_0x41622a=this['commandName'](_0x2efe6f),_0xf06a90=this[_0x59d348(0x18d)](_0x41622a)[_0x59d348(0x276)];this[_0x59d348(0x284)](this[_0x59d348(0x188)](_0x4e0e29));let _0x12d03f=this[_0x59d348(0x23e)]();if(_0x12d03f==='right')this[_0x59d348(0x2ab)](_0x41622a,_0x470a15['x']+_0x470a15[_0x59d348(0x276)]-_0xf06a90,_0x470a15['y'],_0xf06a90);else{if(_0x12d03f===_0x59d348(0x26d)){const _0x299875=_0x470a15['x']+_0x4fc34d[_0x59d348(0x17a)]((_0x470a15[_0x59d348(0x276)]-_0xf06a90)/0x2);this[_0x59d348(0x2ab)](_0x41622a,_0x299875,_0x470a15['y'],_0xf06a90);}else this[_0x59d348(0x2ab)](_0x41622a,_0x470a15['x'],_0x470a15['y'],_0xf06a90);}}}_0xe08f02['forceShow'][_0x59d348(0x1a0)](_0x30a936);},Game_System['prototype'][_0x79d2d0(0x1c1)]=function(_0x5a7ea2){const _0x38dbfc=_0x79d2d0,_0x2dc6b7=this[_0x38dbfc(0x14c)]();!_0x2dc6b7[_0x38dbfc(0x13f)]['includes'](_0x5a7ea2)&&_0x2dc6b7[_0x38dbfc(0x13f)][_0x38dbfc(0x260)](_0x5a7ea2),_0x2dc6b7[_0x38dbfc(0x1d1)]['remove'](_0x5a7ea2);},Game_System[_0x79d2d0(0x2a0)][_0x79d2d0(0x17d)]=function(_0x1812cc){const _0x186c7d=_0x79d2d0,_0x314684=this[_0x186c7d(0x14c)]();!_0x314684[_0x186c7d(0x1d1)][_0x186c7d(0x275)](_0x1812cc)&&(_0x186c7d(0x2a5)!==_0x186c7d(0x2a5)?this[_0x186c7d(0x15c)](_0x23450c):_0x314684[_0x186c7d(0x1d1)][_0x186c7d(0x260)](_0x1812cc)),_0x314684[_0x186c7d(0x13f)][_0x186c7d(0x1a0)](_0x1812cc);},VisuMZ['MainMenuCore'][_0x79d2d0(0x1da)]=Game_Actor['prototype'][_0x79d2d0(0x22a)],Game_Actor['prototype'][_0x79d2d0(0x22a)]=function(_0x5bcd6d){const _0x42b079=_0x79d2d0;VisuMZ[_0x42b079(0x1c4)]['Game_Actor_setup'][_0x42b079(0x10a)](this,_0x5bcd6d),this[_0x42b079(0x22c)]();},Game_Actor[_0x79d2d0(0x2a0)]['initMenuImage']=function(){const _0x21f3c2=_0x79d2d0;this[_0x21f3c2(0x14b)]='',this[_0x21f3c2(0x16e)]()&&this[_0x21f3c2(0x16e)]()['note'][_0x21f3c2(0x14a)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_menuImage']=String(RegExp['$1']));},Game_Actor[_0x79d2d0(0x2a0)]['getMenuImage']=function(){const _0x589aba=_0x79d2d0;if(this['_menuImage']===undefined)this[_0x589aba(0x22c)]();return this[_0x589aba(0x14b)];},Game_Actor[_0x79d2d0(0x2a0)][_0x79d2d0(0x1a9)]=function(_0x267227){if(this['_menuImage']===undefined)this['initMenuImage']();this['_menuImage']=_0x267227;},Game_Actor[_0x79d2d0(0x2a0)][_0x79d2d0(0x122)]=function(){const _0x3a9e68=_0x79d2d0;if(this[_0x3a9e68(0x16e)]()['note']['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x3a9e68(0x16e)]()['note'][_0x3a9e68(0x14a)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x3a9e68(0x167)===_0x3a9e68(0x24b)){const _0x5576cd=_0x2b8b61[_0x3a9e68(0x1c4)][_0x3a9e68(0x113)][_0x3a9e68(0x190)][_0x3a9e68(0x26b)],_0xab108e=_0x538dde[_0x3a9e68(0x12e)],_0x504c2a=_0x447915['prototype'][_0x3a9e68(0x233)](_0x5576cd),_0x3a2702=0x0,_0x300125=_0x56d521[_0x3a9e68(0x218)]((_0x27a8d3[_0x3a9e68(0x1b3)]-_0x504c2a)/0x2);return new _0x320b09(_0x3a2702,_0x300125,_0xab108e,_0x504c2a);}else return Number(RegExp['$1']);}}return 0x0;},Game_Actor[_0x79d2d0(0x2a0)][_0x79d2d0(0x240)]=function(){const _0x5320fe=_0x79d2d0;if(this[_0x5320fe(0x16e)]()[_0x5320fe(0x1d7)][_0x5320fe(0x14a)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return _0x5320fe(0x239)!==_0x5320fe(0x239)?this[_0x5320fe(0x1ab)]():Number(RegExp['$1']);else{if(this['actor']()[_0x5320fe(0x1d7)][_0x5320fe(0x14a)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x174)]=function(){const _0x17fd98=_0x79d2d0;return VisuMZ[_0x17fd98(0x1c4)][_0x17fd98(0x113)]['General'][_0x17fd98(0x129)][_0x17fd98(0x275)](this[_0x17fd98(0x265)][_0x17fd98(0x12f)]);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x1ce)]=Scene_MenuBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x221)],Scene_MenuBase['prototype'][_0x79d2d0(0x221)]=function(){const _0x289369=_0x79d2d0;VisuMZ[_0x289369(0x1c4)][_0x289369(0x1ce)][_0x289369(0x10a)](this),this[_0x289369(0x13d)]();},Scene_MenuBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x13d)]=function(){const _0x1af923=_0x79d2d0;this[_0x1af923(0x21b)]=new Sprite_MenuBackgroundActor(),this[_0x1af923(0x251)](this[_0x1af923(0x21b)]);},VisuMZ['MainMenuCore'][_0x79d2d0(0x1dd)]=Scene_MenuBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x25d)],Scene_MenuBase['prototype'][_0x79d2d0(0x25d)]=function(){const _0x2a9db0=_0x79d2d0;VisuMZ['MainMenuCore']['Scene_MenuBase_updateActor']['call'](this),this[_0x2a9db0(0x174)]()&&this[_0x2a9db0(0x21b)]&&this[_0x2a9db0(0x21b)][_0x2a9db0(0x135)](this[_0x2a9db0(0x26f)]);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x27f)]=Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1de)],Scene_Menu[_0x79d2d0(0x2a0)]['create']=function(){const _0x3ae6fe=_0x79d2d0;VisuMZ[_0x3ae6fe(0x1c4)]['Scene_Menu_create']['call'](this),this[_0x3ae6fe(0x216)](),this[_0x3ae6fe(0x2a4)](),this[_0x3ae6fe(0x23a)]();},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x211)]=function(){const _0x1b2533=_0x79d2d0,_0x98c890=this[_0x1b2533(0x183)](),_0xaf1c5e=new Window_MenuCommand(_0x98c890);_0xaf1c5e[_0x1b2533(0x2b6)](_0x1b2533(0x18b),this[_0x1b2533(0x1c5)][_0x1b2533(0x111)](this)),this[_0x1b2533(0x1d3)](_0xaf1c5e),this[_0x1b2533(0x2a8)]=_0xaf1c5e;},VisuMZ['MainMenuCore'][_0x79d2d0(0x1a8)]=Scene_Menu[_0x79d2d0(0x2a0)]['commandWindowRect'],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x183)]=function(){const _0x226f90=_0x79d2d0,_0x4c1184=this['commandWindowStyle']();if(_0x4c1184===_0x226f90(0x242)){if(_0x226f90(0x249)==='KXVSA')this['drawPendingItemBackground'](_0x5dd94a),this[_0x226f90(0x20f)](_0x1e7792);else return this[_0x226f90(0x184)]();}else{if(_0x4c1184===_0x226f90(0x2b2))return this['commandWindowRectThinTopStyle']();else{if(_0x4c1184===_0x226f90(0x25b))return this[_0x226f90(0x143)]();else{if(_0x4c1184==='thinBottom')return this['commandWindowRectThinBottomStyle']();else{if(_0x4c1184==='mobile')return this[_0x226f90(0x280)]();else{if(_0x226f90(0x263)===_0x226f90(0x163))_0x5b70a9[_0x226f90(0x2a0)]['update'][_0x226f90(0x10a)](this),this[_0x226f90(0x212)]&&(this['updateOpacity'](),this[_0x226f90(0x168)](),this[_0x226f90(0x179)]());else{const _0x2f4677=VisuMZ[_0x226f90(0x1c4)][_0x226f90(0x1a8)]['call'](this);return this[_0x226f90(0x273)](_0x2f4677),_0x2f4677;}}}}}}},Scene_Menu[_0x79d2d0(0x2a0)]['adjustDefaultCommandWindowRect']=function(_0xc76199){const _0x5b875f=_0x79d2d0;if(this[_0x5b875f(0x16c)]()){if(_0x5b875f(0x15a)==='aLlOZ')_0xc76199[_0x5b875f(0x292)]-=this[_0x5b875f(0x185)]()['height'];else{const _0x203703=this[_0x5b875f(0x26a)]();if([_0x5b875f(0x242),_0x5b875f(0x2b2),'mobile'][_0x5b875f(0x275)](_0x203703))return this['playtimeWindowRectTopStyle']();else return[_0x5b875f(0x25b),'thinBottom'][_0x5b875f(0x275)](_0x203703)?this[_0x5b875f(0x16a)]():_0x3dbd94['MainMenuCore'][_0x5b875f(0x113)]['Playtime']['WindowRect'][_0x5b875f(0x10a)](this);}}this[_0x5b875f(0x1e5)]()&&(_0x5b875f(0x2b4)!==_0x5b875f(0x2b4)?(this[_0x5b875f(0x21b)]=new _0x4d55df(),this[_0x5b875f(0x251)](this[_0x5b875f(0x21b)])):_0xc76199['height']-=this[_0x5b875f(0x1d8)]()['height']);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x184)]=function(){const _0x5d68d5=_0x79d2d0,_0x1a66ab=VisuMZ[_0x5d68d5(0x1c4)][_0x5d68d5(0x113)][_0x5d68d5(0x190)][_0x5d68d5(0x26b)],_0x108a53=Graphics['boxWidth'],_0x4efa69=this[_0x5d68d5(0x294)](_0x1a66ab,!![]),_0x4666eb=0x0,_0x102965=this[_0x5d68d5(0x1a4)]();return new Rectangle(_0x4666eb,_0x102965,_0x108a53,_0x4efa69);},Scene_Menu['prototype'][_0x79d2d0(0x1f2)]=function(){const _0x55f3bd=_0x79d2d0,_0x661eae=VisuMZ[_0x55f3bd(0x1c4)][_0x55f3bd(0x113)]['CustomCmdWin']['Rows'],_0x13e917=Graphics[_0x55f3bd(0x12e)],_0x1b4ad0=this[_0x55f3bd(0x294)](0x1,!![]),_0x16fbfc=0x0,_0x26ac98=this[_0x55f3bd(0x1a4)]();return new Rectangle(_0x16fbfc,_0x26ac98,_0x13e917,_0x1b4ad0);},Scene_Menu['prototype'][_0x79d2d0(0x143)]=function(){const _0x158b95=_0x79d2d0,_0x55a428=VisuMZ[_0x158b95(0x1c4)][_0x158b95(0x113)]['CustomCmdWin'][_0x158b95(0x26b)],_0xcfb816=Graphics[_0x158b95(0x12e)],_0x6b3548=this[_0x158b95(0x294)](_0x55a428,!![]),_0x3fcc23=0x0,_0x26120f=this['mainAreaBottom']()-_0x6b3548;return new Rectangle(_0x3fcc23,_0x26120f,_0xcfb816,_0x6b3548);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x266)]=function(){const _0x1f467c=_0x79d2d0,_0x1be91c=VisuMZ[_0x1f467c(0x1c4)][_0x1f467c(0x113)][_0x1f467c(0x190)][_0x1f467c(0x26b)],_0x52c438=Graphics[_0x1f467c(0x12e)],_0xe19eba=this[_0x1f467c(0x294)](0x1,!![]),_0x3f6b3c=0x0,_0x3c4fc3=this['mainAreaBottom']()-_0xe19eba;return new Rectangle(_0x3f6b3c,_0x3c4fc3,_0x52c438,_0xe19eba);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x280)]=function(){const _0x5618e9=_0x79d2d0,_0x48a8b5=VisuMZ[_0x5618e9(0x1c4)]['Settings']['CustomCmdWin'][_0x5618e9(0x26b)],_0x105847=Graphics[_0x5618e9(0x12e)],_0x3c7d05=Window_MenuCommand[_0x5618e9(0x2a0)][_0x5618e9(0x233)](_0x48a8b5),_0x39d8ae=0x0,_0x3b49dc=Math[_0x5618e9(0x218)]((Graphics[_0x5618e9(0x1b3)]-_0x3c7d05)/0x2);return new Rectangle(_0x39d8ae,_0x3b49dc,_0x105847,_0x3c7d05);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x26a)]=function(){const _0x273598=_0x79d2d0;return VisuMZ[_0x273598(0x1c4)]['Settings'][_0x273598(0x1f8)];},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1fe)]=function(){const _0x19d03f=_0x79d2d0;if(this[_0x19d03f(0x26a)]()!==_0x19d03f(0x2af))return!![];return VisuMZ[_0x19d03f(0x1c4)][_0x19d03f(0x113)]['General'][_0x19d03f(0x244)];},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1ae)]=function(){const _0x4e2f39=_0x79d2d0,_0x2fa87b=this[_0x4e2f39(0x12a)]();this[_0x4e2f39(0x264)]=this[_0x4e2f39(0x1fe)]()?new Window_ThinGold(_0x2fa87b):new Window_Gold(_0x2fa87b),this[_0x4e2f39(0x1d3)](this['_goldWindow']);},VisuMZ[_0x79d2d0(0x1c4)]['Scene_Menu_goldWindowRect']=Scene_Menu[_0x79d2d0(0x2a0)]['goldWindowRect'],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x12a)]=function(){const _0x4ba5c2=_0x79d2d0,_0x66be63=this[_0x4ba5c2(0x26a)]();if([_0x4ba5c2(0x242),_0x4ba5c2(0x2b2),'mobile'][_0x4ba5c2(0x275)](_0x66be63)){if(_0x4ba5c2(0x241)!=='pqFEM')return this[_0x4ba5c2(0x1b4)]();else{if(this['_duration']>0x0){const _0x34b332=this['_duration'];this[_0x4ba5c2(0x158)]=(this[_0x4ba5c2(0x158)]*(_0x34b332-0x1)+0xff)/_0x34b332;}}}else{if([_0x4ba5c2(0x25b),_0x4ba5c2(0x15f)][_0x4ba5c2(0x275)](_0x66be63))return _0x4ba5c2(0x119)===_0x4ba5c2(0x118)?_0xf83744[_0x4ba5c2(0x1c4)][_0x4ba5c2(0x217)]['call'](this):this['goldWindowRectBottomStyle']();else{const _0x341fe5=VisuMZ[_0x4ba5c2(0x1c4)][_0x4ba5c2(0x1ca)][_0x4ba5c2(0x10a)](this);return this[_0x4ba5c2(0x2a6)](_0x341fe5),_0x341fe5;}}},Scene_Menu['prototype'][_0x79d2d0(0x2a6)]=function(_0x137aae){const _0x1b8ae2=_0x79d2d0;if(this[_0x1b8ae2(0x1fe)]()){if(VisuMZ[_0x1b8ae2(0x1c4)][_0x1b8ae2(0x113)][_0x1b8ae2(0x21d)][_0x1b8ae2(0x24e)]){const _0xbd4340=_0x137aae[_0x1b8ae2(0x292)]-this['calcWindowHeight'](0x1,![]);_0x137aae['y']+=_0xbd4340;}VisuMZ['MainMenuCore'][_0x1b8ae2(0x113)][_0x1b8ae2(0x21d)][_0x1b8ae2(0x255)]&&(_0x137aae['height']=this[_0x1b8ae2(0x294)](0x1,![]));}},Scene_Menu['prototype'][_0x79d2d0(0x1b4)]=function(){const _0x263358=_0x79d2d0,_0x111650=this[_0x263358(0x24a)](),_0x473ebf=this[_0x263358(0x294)](0x1,![]),_0x438c33=Graphics[_0x263358(0x12e)]-_0x111650,_0x466ab9=this[_0x263358(0x191)]()-_0x473ebf;return new Rectangle(_0x438c33,_0x466ab9,_0x111650,_0x473ebf);},Scene_Menu[_0x79d2d0(0x2a0)]['goldWindowRectBottomStyle']=function(){const _0xaf62c0=_0x79d2d0,_0x511ac2=this['mainCommandWidth'](),_0x158b3d=this[_0xaf62c0(0x294)](0x1,![]),_0x2eef20=Graphics[_0xaf62c0(0x12e)]-_0x511ac2,_0x280410=this[_0xaf62c0(0x1a4)]();return new Rectangle(_0x2eef20,_0x280410,_0x511ac2,_0x158b3d);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x28f)]=Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1ad)],Scene_Menu['prototype']['createStatusWindow']=function(){const _0x4b5025=_0x79d2d0;VisuMZ['MainMenuCore'][_0x4b5025(0x28f)][_0x4b5025(0x10a)](this),this[_0x4b5025(0x1c9)]();},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1c9)]=function(){const _0x235ecf=_0x79d2d0;this[_0x235ecf(0x26a)]()===_0x235ecf(0x208)&&(this['_statusWindow']['openness']=0x0);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x217)]=Scene_Menu['prototype'][_0x79d2d0(0x12c)],Scene_Menu[_0x79d2d0(0x2a0)]['statusWindowRect']=function(){const _0x2dee9d=_0x79d2d0,_0x3a4e9a=this[_0x2dee9d(0x26a)]();if(['top',_0x2dee9d(0x2b2)]['includes'](_0x3a4e9a))return this[_0x2dee9d(0x1d6)]();else{if([_0x2dee9d(0x25b),'thinBottom'][_0x2dee9d(0x275)](_0x3a4e9a)){if(_0x2dee9d(0x28e)!==_0x2dee9d(0x28e)){const _0x24477c=_0x4dd9fd['_scene']['commandWindowStyle']();if([_0x2dee9d(0x2b2),_0x2dee9d(0x15f)][_0x2dee9d(0x275)](_0x24477c))return this['_list']?this['maxItems']():0x4;else return _0x24477c!==_0x2dee9d(0x2af)?_0x463201['MainMenuCore']['Settings'][_0x2dee9d(0x190)][_0x2dee9d(0x21c)]:_0x434f60['prototype']['maxCols'][_0x2dee9d(0x10a)](this);}else return this[_0x2dee9d(0x1c8)]();}else{if(_0x3a4e9a===_0x2dee9d(0x208)){if(_0x2dee9d(0x261)!==_0x2dee9d(0x124))return this[_0x2dee9d(0x1ab)]();else this['initialize'](...arguments);}else{if(_0x2dee9d(0x16d)!==_0x2dee9d(0x16d)){if(_0x1487ac['HideMainMenuOnly'])return _0x497fc6[_0x2dee9d(0x265)]===_0x5d4327;return!![];}else return VisuMZ[_0x2dee9d(0x1c4)][_0x2dee9d(0x217)]['call'](this);}}}},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1d6)]=function(){const _0x320d8c=_0x79d2d0,_0xdd640=Graphics[_0x320d8c(0x12e)],_0x53ca87=this[_0x320d8c(0x192)]()-this[_0x320d8c(0x2a8)]['height']-this[_0x320d8c(0x264)][_0x320d8c(0x292)],_0x598d06=0x0,_0x7cc27=this[_0x320d8c(0x2a8)]['y']+this[_0x320d8c(0x2a8)]['height'];return new Rectangle(_0x598d06,_0x7cc27,_0xdd640,_0x53ca87);},Scene_Menu[_0x79d2d0(0x2a0)]['statusWindowRectBottomStyle']=function(){const _0x396184=_0x79d2d0,_0x4914f7=Graphics[_0x396184(0x12e)],_0x3da70c=this[_0x396184(0x192)]()-this['_commandWindow'][_0x396184(0x292)]-this[_0x396184(0x264)]['height'],_0x509004=0x0,_0x5bcf17=this['_goldWindow']['y']+this[_0x396184(0x264)]['height'];return new Rectangle(_0x509004,_0x5bcf17,_0x4914f7,_0x3da70c);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1ab)]=function(){const _0x2c43d7=_0x79d2d0,_0x3080ea=Graphics[_0x2c43d7(0x12e)],_0x5a7971=this['mainAreaHeight']()-this[_0x2c43d7(0x264)][_0x2c43d7(0x292)],_0x347b96=0x0,_0x3c670a=this[_0x2c43d7(0x191)]()-this[_0x2c43d7(0x264)]['height']-_0x5a7971;return new Rectangle(_0x347b96,_0x3c670a,_0x3080ea,_0x5a7971);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x216)]=function(){const _0x509f07=_0x79d2d0;if(!this[_0x509f07(0x288)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x54151d=this[_0x509f07(0x185)]();this[_0x509f07(0x1b0)]=new Window_Playtime(_0x54151d),this[_0x509f07(0x1b0)]['setBackgroundType'](VisuMZ[_0x509f07(0x1c4)][_0x509f07(0x113)][_0x509f07(0x297)][_0x509f07(0x2a9)]),this[_0x509f07(0x1d3)](this[_0x509f07(0x1b0)]);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x288)]=function(){const _0x39c503=_0x79d2d0;return VisuMZ[_0x39c503(0x1c4)][_0x39c503(0x113)][_0x39c503(0x297)][_0x39c503(0x152)];},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x16c)]=function(){const _0x51c911=_0x79d2d0;return this[_0x51c911(0x288)]()&&(VisuMZ[_0x51c911(0x1c4)]['Settings']['Playtime'][_0x51c911(0x139)]??!![]);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x185)]=function(){const _0x46cb7c=_0x79d2d0,_0x488bdd=this['commandWindowStyle']();if([_0x46cb7c(0x242),_0x46cb7c(0x2b2),_0x46cb7c(0x208)][_0x46cb7c(0x275)](_0x488bdd))return this['playtimeWindowRectTopStyle']();else return[_0x46cb7c(0x25b),_0x46cb7c(0x15f)]['includes'](_0x488bdd)?this[_0x46cb7c(0x16a)]():VisuMZ['MainMenuCore'][_0x46cb7c(0x113)][_0x46cb7c(0x297)]['WindowRect']['call'](this);},Scene_Menu['prototype'][_0x79d2d0(0x283)]=function(){const _0x1e575f=_0x79d2d0,_0x56e1ef=this[_0x1e575f(0x24a)](),_0x1e5a23=this[_0x1e575f(0x294)](0x1,![]),_0x1ca141=0x0,_0x3c32d8=this[_0x1e575f(0x191)]()-_0x1e5a23;return new Rectangle(_0x1ca141,_0x3c32d8,_0x56e1ef,_0x1e5a23);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x16a)]=function(){const _0x145347=_0x79d2d0,_0x3d20cf=this[_0x145347(0x24a)](),_0x279863=this[_0x145347(0x294)](0x1,![]),_0xf885ce=0x0,_0x5c60d5=this['mainAreaTop']();return new Rectangle(_0xf885ce,_0x5c60d5,_0x3d20cf,_0x279863);},Scene_Menu[_0x79d2d0(0x2a0)]['createVariableWindow']=function(){const _0x1c641c=_0x79d2d0;if(!this[_0x1c641c(0x162)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x443079=this['variableWindowRect']();this['_variableWindow']=new Window_MenuVariables(_0x443079),this[_0x1c641c(0x29f)][_0x1c641c(0x14d)](VisuMZ[_0x1c641c(0x1c4)][_0x1c641c(0x113)][_0x1c641c(0x1b7)][_0x1c641c(0x2a9)]),this[_0x1c641c(0x1d3)](this['_variableWindow']);},Scene_Menu['prototype'][_0x79d2d0(0x162)]=function(){const _0x46123e=_0x79d2d0;return VisuMZ[_0x46123e(0x1c4)][_0x46123e(0x113)]['Variable'][_0x46123e(0x152)];},Scene_Menu['prototype'][_0x79d2d0(0x1e5)]=function(){const _0x167336=_0x79d2d0;return this[_0x167336(0x162)]()&&(VisuMZ[_0x167336(0x1c4)][_0x167336(0x113)][_0x167336(0x1b7)][_0x167336(0x139)]??!![]);},Scene_Menu['prototype']['variableWindowRect']=function(){const _0xe7b705=_0x79d2d0,_0x17aae7=this['commandWindowStyle']();if([_0xe7b705(0x242),_0xe7b705(0x2b2),'mobile'][_0xe7b705(0x275)](_0x17aae7))return this[_0xe7b705(0x1e1)]();else{if(['bottom',_0xe7b705(0x15f)][_0xe7b705(0x275)](_0x17aae7)){if('zfPvg'!==_0xe7b705(0x114))return this[_0xe7b705(0x25e)]();else this['initialize'](...arguments);}else return VisuMZ[_0xe7b705(0x1c4)]['Settings']['Variable'][_0xe7b705(0x2a2)][_0xe7b705(0x10a)](this);}},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1e1)]=function(){const _0x30fbfb=_0x79d2d0,_0x7b471=Graphics[_0x30fbfb(0x12e)]-this['_goldWindow'][_0x30fbfb(0x276)]-(this[_0x30fbfb(0x1b0)]?this[_0x30fbfb(0x1b0)][_0x30fbfb(0x276)]:0x0),_0x493a48=this[_0x30fbfb(0x294)](0x1,![]),_0x2c3bac=this[_0x30fbfb(0x264)]['x']-_0x7b471,_0x282747=this[_0x30fbfb(0x191)]()-_0x493a48;return new Rectangle(_0x2c3bac,_0x282747,_0x7b471,_0x493a48);},Scene_Menu['prototype'][_0x79d2d0(0x25e)]=function(){const _0x4bf73c=_0x79d2d0,_0x127997=Graphics['boxWidth']-this[_0x4bf73c(0x264)]['width']-(this[_0x4bf73c(0x1b0)]?this[_0x4bf73c(0x1b0)][_0x4bf73c(0x276)]:0x0),_0x5876cd=this[_0x4bf73c(0x294)](0x1,![]),_0x57ad0d=this['_goldWindow']['x']-_0x127997,_0x1324ea=this['mainAreaTop']();return new Rectangle(_0x57ad0d,_0x1324ea,_0x127997,_0x5876cd);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x23a)]=function(){const _0x5b91c2=_0x79d2d0;if(!this[_0x5b91c2(0x19e)]())return;const _0x351a45=this['variableWindowRect']();this[_0x5b91c2(0x246)]=new Window_Base(_0x351a45),this[_0x5b91c2(0x246)][_0x5b91c2(0x14d)](VisuMZ['MainMenuCore'][_0x5b91c2(0x113)]['Variable'][_0x5b91c2(0x2a9)]),this[_0x5b91c2(0x1d3)](this[_0x5b91c2(0x246)]);},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x19e)]=function(){const _0x4f51c7=_0x79d2d0;if([_0x4f51c7(0x2af),_0x4f51c7(0x208)][_0x4f51c7(0x275)](this[_0x4f51c7(0x26a)]()))return![];if(this[_0x4f51c7(0x29f)])return![];return!![];},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x222)]=Scene_Menu['prototype']['commandPersonal'],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x227)]=function(){const _0x465687=_0x79d2d0;if(this['isSoloQuickMode']()&&this[_0x465687(0x2a3)])$gameParty['setTargetActor']($gameParty[_0x465687(0x1cf)]()[0x0]),this[_0x465687(0x16b)]();else{if(_0x465687(0x271)!==_0x465687(0x271)){if(this[_0x465687(0x1d0)]>0x0)this[_0x465687(0x1d0)]--;}else{if(this[_0x465687(0x26a)]()===_0x465687(0x208))this[_0x465687(0x2a3)][_0x465687(0x21a)]();VisuMZ[_0x465687(0x1c4)][_0x465687(0x222)][_0x465687(0x10a)](this);}}},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x231)]=function(){const _0x3368a5=_0x79d2d0;return VisuMZ[_0x3368a5(0x1c4)][_0x3368a5(0x113)][_0x3368a5(0x21d)][_0x3368a5(0x272)]&&$gameParty[_0x3368a5(0x1cf)]()['length']<=0x1;},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x16b)]=function(){const _0x4657a0=_0x79d2d0,_0x530193=this[_0x4657a0(0x2a8)][_0x4657a0(0x1f7)](),_0x3e6adc=this['_commandWindow'][_0x4657a0(0x128)]();for(const _0x42a7eb of Window_MenuCommand[_0x4657a0(0x148)]){if(_0x42a7eb[_0x4657a0(0x10f)]===_0x530193){_0x42a7eb[_0x4657a0(0x209)][_0x4657a0(0x10a)](this,_0x3e6adc);return;}}},VisuMZ['MainMenuCore']['Scene_Menu_onPersonalCancel']=Scene_Menu[_0x79d2d0(0x2a0)]['onPersonalCancel'],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x14f)]=function(){const _0x56cd21=_0x79d2d0;VisuMZ[_0x56cd21(0x1c4)][_0x56cd21(0x196)]['call'](this);if(this['commandWindowStyle']()==='mobile')this[_0x56cd21(0x2a3)][_0x56cd21(0x230)]();},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x28a)]=function(){const _0x18f1a8=_0x79d2d0,_0x2265a0=parseInt(this[_0x18f1a8(0x2a8)][_0x18f1a8(0x128)]());_0x2265a0?($gameTemp[_0x18f1a8(0x136)](_0x2265a0),this[_0x18f1a8(0x1c5)]()):this[_0x18f1a8(0x2a8)][_0x18f1a8(0x269)]();},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x207)]=Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x22e)],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x22e)]=function(){const _0x4f6b4=_0x79d2d0;VisuMZ[_0x4f6b4(0x1c4)][_0x4f6b4(0x207)][_0x4f6b4(0x10a)](this);if(this[_0x4f6b4(0x26a)]()==='mobile')this[_0x4f6b4(0x2a3)][_0x4f6b4(0x21a)]();},VisuMZ[_0x79d2d0(0x1c4)]['Scene_Menu_onFormationCancel']=Scene_Menu[_0x79d2d0(0x2a0)]['onFormationCancel'],Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x1e6)]=function(){const _0x1eec2a=_0x79d2d0;VisuMZ[_0x1eec2a(0x1c4)][_0x1eec2a(0x166)][_0x1eec2a(0x10a)](this);if(this['commandWindowStyle']()==='mobile')this['_statusWindow']['close']();},Scene_Menu[_0x79d2d0(0x2a0)][_0x79d2d0(0x11e)]=function(){const _0x42764a=_0x79d2d0;SceneManager[_0x42764a(0x260)](Scene_Load);};function Sprite_MenuBackgroundActor(){this['initialize'](...arguments);}Sprite_MenuBackgroundActor['prototype']=Object[_0x79d2d0(0x1de)](Sprite['prototype']),Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)][_0x79d2d0(0x265)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)]=function(){const _0x420f23=_0x79d2d0;this[_0x420f23(0x26f)]=null,this[_0x420f23(0x212)]=![],Sprite[_0x420f23(0x2a0)][_0x420f23(0x27e)]['call'](this),this['x']=Graphics['width'];},Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)][_0x79d2d0(0x135)]=function(_0x50af29){const _0x97729=_0x79d2d0;this['_actor']!==_0x50af29&&(this[_0x97729(0x26f)]=_0x50af29,this['loadBitmap']());},Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)][_0x79d2d0(0x159)]=function(){const _0x4f8321=_0x79d2d0;this['_bitmapReady']=![],this[_0x4f8321(0x26f)]?(this[_0x4f8321(0x289)]=ImageManager[_0x4f8321(0x180)](this[_0x4f8321(0x26f)]['getMenuImage']()),this[_0x4f8321(0x289)]['addLoadListener'](this['onBitmapLoad'][_0x4f8321(0x111)](this))):this['bitmap']=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor['prototype'][_0x79d2d0(0x199)]=function(){const _0x40a289=_0x79d2d0;this[_0x40a289(0x212)]=!![],VisuMZ[_0x40a289(0x1c4)][_0x40a289(0x113)][_0x40a289(0x21d)][_0x40a289(0x151)]['call'](this);},Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)][_0x79d2d0(0x2bc)]=function(){const _0x4cb96c=_0x79d2d0;Sprite['prototype']['update']['call'](this);if(this[_0x4cb96c(0x212)]){if(_0x4cb96c(0x213)===_0x4cb96c(0x213))this[_0x4cb96c(0x178)](),this[_0x4cb96c(0x168)](),this[_0x4cb96c(0x179)]();else{const _0x4ed4b3=new _0x559244(0x0,0x0,_0x49ef02[_0x4cb96c(0x276)],_0x32546e[_0x4cb96c(0x292)]);this[_0x4cb96c(0x21e)]=new _0x13b125(_0x4ed4b3),this[_0x4cb96c(0x21e)][_0x4cb96c(0x158)]=0x0,this[_0x4cb96c(0x251)](this[_0x4cb96c(0x21e)]),this[_0x4cb96c(0x257)]();}}},Sprite_MenuBackgroundActor[_0x79d2d0(0x2a0)]['updateOpacity']=function(){const _0x69625d=_0x79d2d0;if(this[_0x69625d(0x1d0)]>0x0){if(_0x69625d(0x2b3)!=='plwKj'){const _0x5d68d2=_0xaac4f0[_0x69625d(0x14a)](/\$/i),_0x2829ac=_0x397d5c[_0x69625d(0x290)](_0x2fafb4),_0xda678b=_0x2829ac['width']/(_0x5d68d2?0x1:_0xa3d529[_0x69625d(0x1e7)]),_0x298657=_0x2829ac[_0x69625d(0x292)]/(_0x5d68d2?0x1:_0x2d5c29[_0x69625d(0x13e)]),_0x5ca3ea=0x0,_0x31aff6=0x0;this[_0x69625d(0x144)][_0x69625d(0x11d)](_0x2829ac,_0x5ca3ea,_0x31aff6,_0xda678b,_0x298657,_0x52f52c-_0xda678b/0x2,_0x55bfda-_0x298657);}else{const _0x5a7b4c=this[_0x69625d(0x1d0)];this[_0x69625d(0x158)]=(this[_0x69625d(0x158)]*(_0x5a7b4c-0x1)+0xff)/_0x5a7b4c;}}},Sprite_MenuBackgroundActor['prototype'][_0x79d2d0(0x168)]=function(){const _0x4fd775=_0x79d2d0;if(this[_0x4fd775(0x1d0)]>0x0){const _0x5010c1=this[_0x4fd775(0x1d0)];this['x']=(this['x']*(_0x5010c1-0x1)+this['_targetX'])/_0x5010c1,this['y']=(this['y']*(_0x5010c1-0x1)+this['_targetY'])/_0x5010c1;}},Sprite_MenuBackgroundActor['prototype'][_0x79d2d0(0x179)]=function(){const _0xd57083=_0x79d2d0;if(this['_duration']>0x0)this[_0xd57083(0x1d0)]--;},ImageManager[_0x79d2d0(0x1e7)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x79d2d0(0x13e)]=ImageManager[_0x79d2d0(0x13e)]||0x6,Window_Base[_0x79d2d0(0x2a0)]['drawSvActor']=function(_0x476be7,_0x104202,_0x3d9e2f){const _0x25a415=_0x79d2d0,_0x4d4b7e=_0x476be7['match'](/\$/i),_0x41742f=ImageManager[_0x25a415(0x290)](_0x476be7),_0x3fa2a3=_0x41742f[_0x25a415(0x276)]/(_0x4d4b7e?0x1:ImageManager[_0x25a415(0x1e7)]),_0x41e3ca=_0x41742f[_0x25a415(0x292)]/(_0x4d4b7e?0x1:ImageManager[_0x25a415(0x13e)]),_0x190df0=0x0,_0x45e8c7=0x0;this[_0x25a415(0x144)]['blt'](_0x41742f,_0x190df0,_0x45e8c7,_0x3fa2a3,_0x41e3ca,_0x104202-_0x3fa2a3/0x2,_0x3d9e2f-_0x41e3ca);},Window_MenuCommand['_commandList']=VisuMZ[_0x79d2d0(0x1c4)]['Settings'][_0x79d2d0(0x29e)],VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x1c6)]=Window_MenuCommand['prototype'][_0x79d2d0(0x27e)],Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)]=function(_0xff6c90){const _0x2da4c4=_0x79d2d0;VisuMZ[_0x2da4c4(0x1c4)]['Window_MenuCommand_initialize'][_0x2da4c4(0x10a)](this,_0xff6c90),this[_0x2da4c4(0x1e9)](_0xff6c90);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x1e9)]=function(_0x10e929){const _0xe288a7=_0x79d2d0,_0x5a6f8a=new Rectangle(0x0,0x0,_0x10e929['width'],_0x10e929['height']);this[_0xe288a7(0x21e)]=new Window_Base(_0x5a6f8a),this[_0xe288a7(0x21e)][_0xe288a7(0x158)]=0x0,this['addChild'](this[_0xe288a7(0x21e)]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x1f4)]=function(){const _0x48fd80=_0x79d2d0;Window_HorzCommand[_0x48fd80(0x2a0)]['callUpdateHelp'][_0x48fd80(0x10a)](this);if(this[_0x48fd80(0x21e)])this[_0x48fd80(0x257)]();},Window_MenuCommand['prototype'][_0x79d2d0(0x257)]=function(){const _0x5f26dc=_0x79d2d0,_0x12b4ae=this['_commandNameWindow'];_0x12b4ae['contents'][_0x5f26dc(0x11f)]();const _0x15104f=this[_0x5f26dc(0x1f6)](this[_0x5f26dc(0x1a3)]());if(_0x15104f==='icon'){if(_0x5f26dc(0x285)!=='mEyXR'){const _0x1a769f=this[_0x5f26dc(0x278)](this[_0x5f26dc(0x1a3)]());let _0x396e28=this[_0x5f26dc(0x1ff)](this['index']());_0x396e28=_0x396e28[_0x5f26dc(0x238)](/\\I\[(\d+)\]/gi,''),_0x12b4ae[_0x5f26dc(0x23b)](),this['commandNameWindowDrawBackground'](_0x396e28,_0x1a769f),this[_0x5f26dc(0x123)](_0x396e28,_0x1a769f),this[_0x5f26dc(0x27a)](_0x396e28,_0x1a769f);}else{_0x468699[_0x5f26dc(0x209)][_0x5f26dc(0x10a)](this,_0xb7b411);return;}}},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x170)]=function(_0x2c99c8,_0x24d336){},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x123)]=function(_0x15a1de,_0x3458da){const _0x305dc5=_0x79d2d0,_0x1c3fc4=this['_commandNameWindow'];_0x1c3fc4['drawText'](_0x15a1de,0x0,_0x3458da['y'],_0x1c3fc4[_0x305dc5(0x138)],_0x305dc5(0x26d));},Window_MenuCommand[_0x79d2d0(0x2a0)]['commandNameWindowCenter']=function(_0x227f1c,_0x2396e7){const _0x45aab9=_0x79d2d0,_0x412e6a=this[_0x45aab9(0x21e)],_0x27797e=$gameSystem['windowPadding'](),_0x5624c0=_0x2396e7['x']+Math[_0x45aab9(0x17a)](_0x2396e7[_0x45aab9(0x276)]/0x2)+_0x27797e;_0x412e6a['x']=_0x412e6a['width']/-0x2+_0x5624c0,_0x412e6a['y']=Math['floor'](_0x2396e7[_0x45aab9(0x292)]/0x4);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x155)]=function(){const _0x1746b2=_0x79d2d0,_0x5d4b92=SceneManager[_0x1746b2(0x145)]['commandWindowStyle']();if(_0x5d4b92==='mobile'){if(_0x1746b2(0x293)!==_0x1746b2(0x29b)){const _0x4007c0=VisuMZ[_0x1746b2(0x1c4)][_0x1746b2(0x113)]['CustomCmdWin'][_0x1746b2(0x19c)];return this[_0x1746b2(0x133)]()*_0x4007c0+0x8;}else this['_actor']=_0x2446d5,this[_0x1746b2(0x159)]();}else return Window_Command['prototype']['itemHeight'][_0x1746b2(0x10a)](this);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x156)]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand['prototype'][_0x79d2d0(0x150)]=function(){const _0xd2f286=_0x79d2d0;for(const _0x22c00b of Window_MenuCommand['_commandList']){const _0x4f56c5=_0x22c00b[_0xd2f286(0x10f)];if(this['isMainMenuCommandVisible'](_0x4f56c5,_0x22c00b)){let _0x5901c3=_0x22c00b[_0xd2f286(0x1b5)];if(['',_0xd2f286(0x28c)][_0xd2f286(0x275)](_0x5901c3))_0x5901c3=_0x22c00b['TextJS'][_0xd2f286(0x10a)](this);const _0x2c33ac=_0x22c00b[_0xd2f286(0x182)];_0x2c33ac>0x0&&this['commandStyle']()!==_0xd2f286(0x117)&&(_0x5901c3='\x5cI[%1]%2'[_0xd2f286(0x277)](_0x2c33ac,_0x5901c3));const _0xc6ad43=this[_0xd2f286(0x1fa)](_0x4f56c5,_0x22c00b),_0x550c92=_0x22c00b[_0xd2f286(0x2bd)]['call'](this);this[_0xd2f286(0x197)](_0x5901c3,_0x4f56c5,_0xc6ad43,_0x550c92),this[_0xd2f286(0x2b6)](_0x4f56c5,_0x22c00b[_0xd2f286(0x112)][_0xd2f286(0x111)](this,_0x550c92));}this[_0xd2f286(0x13c)](_0x4f56c5);}},Window_MenuCommand[_0x79d2d0(0x2a0)]['isMainMenuCommandVisible']=function(_0x22cc98,_0x4af2dc){const _0x666ad=_0x79d2d0;if($gameSystem[_0x666ad(0x126)](_0x22cc98,_0x666ad(0x176)))return!![];if($gameSystem[_0x666ad(0x126)](_0x22cc98,_0x666ad(0x195)))return![];return _0x4af2dc[_0x666ad(0x187)]['call'](this);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x1fa)]=function(_0x174963,_0x6841f3){const _0x2a8ae3=_0x79d2d0;if($gameSystem[_0x2a8ae3(0x126)](_0x174963,_0x2a8ae3(0x13f)))return!![];if($gameSystem[_0x2a8ae3(0x126)](_0x174963,_0x2a8ae3(0x1d1)))return![];return _0x6841f3[_0x2a8ae3(0x18f)][_0x2a8ae3(0x10a)](this);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x13c)]=function(_0x1842df){const _0x27e0ad=_0x79d2d0;switch(_0x1842df){case'item':this[_0x27e0ad(0x1cd)]();break;case _0x27e0ad(0x1a5):this[_0x27e0ad(0x2ad)](),this[_0x27e0ad(0x177)]();break;case _0x27e0ad(0x224):this[_0x27e0ad(0x20c)]();break;case _0x27e0ad(0x22f):this[_0x27e0ad(0x279)]();break;case _0x27e0ad(0x189):this['addGameEndCommand']();break;}},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x1cd)]=function(){},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x2ad)]=function(){},Window_MenuCommand['prototype'][_0x79d2d0(0x177)]=function(){},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x20c)]=function(){},Window_MenuCommand[_0x79d2d0(0x2a0)]['addSaveCommand']=function(){},Window_MenuCommand['prototype'][_0x79d2d0(0x1bb)]=function(){},Window_MenuCommand['prototype'][_0x79d2d0(0x18a)]=function(){const _0x3d2771=_0x79d2d0,_0x3f3600=SceneManager['_scene'][_0x3d2771(0x26a)]();if([_0x3d2771(0x2b2),_0x3d2771(0x15f)]['includes'](_0x3f3600)){if(_0x3d2771(0x1aa)===_0x3d2771(0x1ba))this[_0x3d2771(0x289)]=new _0x138392(0x1,0x1);else return this[_0x3d2771(0x1c2)]?this[_0x3d2771(0x11c)]():0x4;}else{if(_0x3f3600!==_0x3d2771(0x2af))return VisuMZ['MainMenuCore'][_0x3d2771(0x113)]['CustomCmdWin']['Cols'];else{if(_0x3d2771(0x24d)===_0x3d2771(0x24d))return Window_Command[_0x3d2771(0x2a0)]['maxCols'][_0x3d2771(0x10a)](this);else{if(!this[_0x3d2771(0x162)]())return new _0x258d42(0x0,0x0,0x0,0x0);const _0x4c7b9b=this['variableWindowRect']();this[_0x3d2771(0x29f)]=new _0x1e672c(_0x4c7b9b),this[_0x3d2771(0x29f)]['setBackgroundType'](_0x1564ae[_0x3d2771(0x1c4)]['Settings'][_0x3d2771(0x1b7)][_0x3d2771(0x2a9)]),this[_0x3d2771(0x1d3)](this['_variableWindow']);}}}},Window_MenuCommand[_0x79d2d0(0x2a0)]['itemTextAlign']=function(){const _0x5c645c=_0x79d2d0;return VisuMZ[_0x5c645c(0x1c4)][_0x5c645c(0x113)]['CustomCmdWin'][_0x5c645c(0x171)];},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x2b0)]=function(_0x3f5d44){const _0x922aa1=_0x79d2d0,_0x5eacfa=this[_0x922aa1(0x1f6)](_0x3f5d44);if(_0x5eacfa==='iconText')_0x922aa1(0x253)===_0x922aa1(0x281)?(this['bitmap']=_0x615689[_0x922aa1(0x180)](this[_0x922aa1(0x26f)][_0x922aa1(0x26c)]()),this['bitmap'][_0x922aa1(0x2ac)](this[_0x922aa1(0x199)]['bind'](this))):this[_0x922aa1(0x15c)](_0x3f5d44);else _0x5eacfa===_0x922aa1(0x2ae)?this[_0x922aa1(0x232)](_0x3f5d44):Window_Command[_0x922aa1(0x2a0)][_0x922aa1(0x2b0)][_0x922aa1(0x10a)](this,_0x3f5d44);},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x181)]=function(){const _0xad80e0=_0x79d2d0;return VisuMZ['MainMenuCore']['Settings']['CustomCmdWin'][_0xad80e0(0x204)];},Window_MenuCommand['prototype'][_0x79d2d0(0x1f6)]=function(_0x316399){const _0x66e276=_0x79d2d0,_0x32636f=this[_0x66e276(0x181)]();if(_0x32636f!==_0x66e276(0x116))return _0x32636f;else{const _0x2fdeeb=this[_0x66e276(0x1ff)](_0x316399);if(_0x2fdeeb[_0x66e276(0x14a)](/\\I\[(\d+)\]/i)){if('ZrIZC'===_0x66e276(0x2b8)){const _0xfeee43=this[_0x66e276(0x278)](_0x316399),_0x46cc9e=this['textSizeEx'](_0x2fdeeb)['width'];if(_0x46cc9e<=_0xfeee43[_0x66e276(0x276)]){if(_0x66e276(0x282)!==_0x66e276(0x1e8))return'iconText';else{if(this[_0x66e276(0x14b)]===_0x2057f0)this[_0x66e276(0x22c)]();this[_0x66e276(0x14b)]=_0x3be718;}}else return _0x66e276(0x2ae);}else{if(_0x1c2ac0['getMenuImage']()!==''){const _0x1d1248=_0x3dad22[_0x66e276(0x180)](_0x294056[_0x66e276(0x26c)]());_0x1d1248[_0x66e276(0x2ac)](this['drawItemStatusPortraitStyleOnLoad']['bind'](this,_0x178bca,_0x44c6da));}else this[_0x66e276(0x17c)](_0x2a3894,_0x534140);}}else{if(_0x66e276(0x2aa)===_0x66e276(0x2aa))return _0x66e276(0x117);else{_0x3b7f2c[_0x66e276(0x2a0)][_0x66e276(0x1f4)][_0x66e276(0x10a)](this);if(this[_0x66e276(0x21e)])this[_0x66e276(0x257)]();}}}},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x15c)]=function(_0x36a35c){const _0x54b2cf=_0x79d2d0,_0x5a9b06=this[_0x54b2cf(0x278)](_0x36a35c),_0xfb510d=this[_0x54b2cf(0x1ff)](_0x36a35c),_0xd0536f=this[_0x54b2cf(0x18d)](_0xfb510d)[_0x54b2cf(0x276)];this['changePaintOpacity'](this[_0x54b2cf(0x188)](_0x36a35c));let _0xc3c141=this[_0x54b2cf(0x23e)]();if(_0xc3c141===_0x54b2cf(0x15d)){if(_0x54b2cf(0x1df)!=='uCbaT'){const _0x36c1cf=this[_0x54b2cf(0x24a)](),_0x2ece5b=this[_0x54b2cf(0x294)](0x1,![]),_0x5f4065=0x0,_0x5cfbf0=this[_0x54b2cf(0x1a4)]();return new _0x1c7a45(_0x5f4065,_0x5cfbf0,_0x36c1cf,_0x2ece5b);}else this[_0x54b2cf(0x2ab)](_0xfb510d,_0x5a9b06['x']+_0x5a9b06[_0x54b2cf(0x276)]-_0xd0536f,_0x5a9b06['y'],_0xd0536f);}else{if(_0xc3c141===_0x54b2cf(0x26d)){if(_0x54b2cf(0x18c)!==_0x54b2cf(0x18c))_0x1ab508[_0x54b2cf(0x1c4)][_0x54b2cf(0x1dd)][_0x54b2cf(0x10a)](this),this[_0x54b2cf(0x174)]()&&this[_0x54b2cf(0x21b)]&&this['_actorMenuBgSprite']['setActor'](this[_0x54b2cf(0x26f)]);else{const _0x49897a=_0x5a9b06['x']+Math[_0x54b2cf(0x17a)]((_0x5a9b06[_0x54b2cf(0x276)]-_0xd0536f)/0x2);this[_0x54b2cf(0x2ab)](_0xfb510d,_0x49897a,_0x5a9b06['y'],_0xd0536f);}}else this[_0x54b2cf(0x2ab)](_0xfb510d,_0x5a9b06['x'],_0x5a9b06['y'],_0xd0536f);}},Window_MenuCommand[_0x79d2d0(0x2a0)][_0x79d2d0(0x232)]=function(_0x576533){const _0x3d276e=_0x79d2d0;this[_0x3d276e(0x1ff)](_0x576533)['match'](/\\I\[(\d+)\]/i);const _0x3b1018=Number(RegExp['$1']),_0x14635e=this[_0x3d276e(0x278)](_0x576533),_0x584c8b=_0x14635e['x']+Math['floor']((_0x14635e[_0x3d276e(0x276)]-ImageManager['iconWidth'])/0x2),_0x3f6591=_0x14635e['y']+(_0x14635e[_0x3d276e(0x292)]-ImageManager[_0x3d276e(0x115)])/0x2;this[_0x3d276e(0x256)](_0x3b1018,_0x584c8b,_0x3f6591);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x203)]=Window_StatusBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x2a1)],Window_StatusBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x2a1)]=function(){const _0x173156=_0x79d2d0;VisuMZ[_0x173156(0x1c4)][_0x173156(0x203)][_0x173156(0x10a)](this),this['loadOtherActorImages']();},Window_StatusBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x291)]=function(){const _0x1e9f1e=_0x79d2d0;for(const _0x3d1ea6 of $gameParty['members']()){if(_0x1e9f1e(0x226)!==_0x1e9f1e(0x165)){if(!_0x3d1ea6)continue;_0x3d1ea6[_0x1e9f1e(0x287)]()&&ImageManager[_0x1e9f1e(0x125)](_0x3d1ea6['characterName']()),_0x3d1ea6['battlerName']()&&ImageManager[_0x1e9f1e(0x290)](_0x3d1ea6['battlerName']()),_0x3d1ea6[_0x1e9f1e(0x26c)]()&&ImageManager[_0x1e9f1e(0x180)](_0x3d1ea6[_0x1e9f1e(0x26c)]());}else _0x7b2707[_0x1e9f1e(0x292)]-=this[_0x1e9f1e(0x1d8)]()[_0x1e9f1e(0x292)];}},Window_StatusBase[_0x79d2d0(0x2a0)]['graphicType']=function(){const _0xd09bef=_0x79d2d0;return VisuMZ[_0xd09bef(0x1c4)]['Settings'][_0xd09bef(0x235)];},Window_StatusBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x16f)]=function(_0x5e1ec1,_0x1b2fb1,_0x33d27f,_0x20c8c4,_0x4acb1c){const _0x3d6111=_0x79d2d0;_0x20c8c4=_0x20c8c4||ImageManager['faceWidth'],_0x4acb1c=_0x4acb1c||ImageManager['faceHeight'];const _0x1acbec=ImageManager[_0x3d6111(0x121)],_0x5e0039=_0x4acb1c-0x2,_0x4ce68c=_0x1b2fb1+Math[_0x3d6111(0x17a)]((_0x20c8c4-_0x1acbec)/0x2);this[_0x3d6111(0x265)]===Window_MenuStatus&&('uleCd'!==_0x3d6111(0x1c0)?this[_0x3d6111(0x284)](_0x5e1ec1[_0x3d6111(0x13b)]()):this[_0x3d6111(0x26f)]!==_0x4802db&&(this['_actor']=_0x4602f5,this['loadBitmap']())),this[_0x3d6111(0x1eb)](_0x5e1ec1,_0x4ce68c,_0x33d27f,_0x1acbec,_0x5e0039),this[_0x3d6111(0x284)](!![]);},Window_StatusBase['prototype'][_0x79d2d0(0x229)]=function(_0x4a5a81,_0x38cc31,_0x3d6239,_0x16ebb7,_0x5b76bb){const _0x374655=_0x79d2d0;_0x16ebb7=_0x16ebb7||ImageManager[_0x374655(0x121)],_0x5b76bb=_0x5b76bb||ImageManager[_0x374655(0x2ba)];const _0x17884e=_0x4a5a81['characterName'](),_0x30c195=_0x4a5a81[_0x374655(0x23d)](),_0x4d6c42=ImageManager[_0x374655(0x125)](_0x17884e),_0x1f2032=ImageManager[_0x374655(0x1ea)](_0x17884e),_0x1b502f=_0x4d6c42[_0x374655(0x276)]/(_0x1f2032?0x3:0xc),_0x286f51=_0x4d6c42['height']/(_0x1f2032?0x4:0x8),_0xd4cbef=_0x16ebb7,_0x3806a5=_0x5b76bb-0x2,_0x37969b=_0x38cc31+Math[_0x374655(0x17a)](_0xd4cbef/0x2),_0x43785d=_0x3d6239+Math[_0x374655(0x252)]((_0x5b76bb+_0x286f51)/0x2);this['constructor']===Window_MenuStatus&&this[_0x374655(0x284)](_0x4a5a81[_0x374655(0x13b)]());const _0x564e49=Math[_0x374655(0x234)](_0x16ebb7,_0x1b502f),_0x1b392f=Math['min'](_0x5b76bb,_0x286f51),_0xfc6d30=Math[_0x374655(0x17a)](_0x38cc31+Math[_0x374655(0x169)](_0x16ebb7-_0x1b502f,0x0)/0x2),_0x3193de=Math[_0x374655(0x17a)](_0x3d6239+Math[_0x374655(0x169)](_0x5b76bb-_0x286f51,0x0)/0x2),_0x196021=_0x1f2032?0x0:_0x30c195,_0x109f2b=(_0x196021%0x4*0x3+0x1)*_0x1b502f,_0x3f488b=Math[_0x374655(0x17a)](_0x196021/0x4)*0x4*_0x286f51;this[_0x374655(0x144)]['blt'](_0x4d6c42,_0x109f2b,_0x3f488b,_0x564e49,_0x1b392f,_0xfc6d30,_0x3193de),this[_0x374655(0x284)](!![]);},Window_StatusBase['prototype'][_0x79d2d0(0x25a)]=function(_0x5f3163,_0x5a66de,_0x1c0023,_0x214ef1,_0x1c0e39){const _0x5e64cf=_0x79d2d0;_0x214ef1=_0x214ef1||ImageManager[_0x5e64cf(0x121)],_0x1c0e39=_0x1c0e39||ImageManager['faceHeight'];const _0x26407c=ImageManager['loadSvActor'](_0x5f3163[_0x5e64cf(0x27d)]()),_0x42dd19=_0x26407c[_0x5e64cf(0x276)]/ImageManager[_0x5e64cf(0x1e7)],_0x176413=_0x26407c[_0x5e64cf(0x292)]/ImageManager[_0x5e64cf(0x13e)],_0x5c86ee=_0x214ef1,_0x3bed4c=_0x1c0e39-0x2,_0x13f70f=_0x5a66de+Math[_0x5e64cf(0x17a)](_0x5c86ee/0x2),_0x1b849a=_0x1c0023+Math['ceil']((_0x1c0e39+_0x176413)/0x2);this[_0x5e64cf(0x265)]===Window_MenuStatus&&(_0x5e64cf(0x1b1)!==_0x5e64cf(0x1fd)?this['changePaintOpacity'](_0x5f3163[_0x5e64cf(0x13b)]()):this[_0x5e64cf(0x2a8)]['activate']());const _0x2c0d47=_0x5f3163[_0x5e64cf(0x286)]&&_0x5f3163['hasStaticSvBattler'](),_0x28304d=0x0,_0x54a56e=0x0,_0x1c60e0=_0x2c0d47?_0x26407c[_0x5e64cf(0x276)]:_0x42dd19,_0x2bf5df=_0x2c0d47?_0x26407c[_0x5e64cf(0x292)]:_0x176413,_0x32ce81=Math[_0x5e64cf(0x234)](0x1,_0x214ef1/_0x1c60e0,_0x1c0e39/_0x2bf5df),_0x5dff59=_0x32ce81*_0x1c60e0,_0x2e1f2d=_0x32ce81*_0x2bf5df,_0x5dee98=Math[_0x5e64cf(0x17a)](_0x5a66de+Math[_0x5e64cf(0x169)](_0x214ef1-_0x5dff59,0x0)/0x2),_0x245988=Math[_0x5e64cf(0x17a)](_0x1c0023+Math[_0x5e64cf(0x169)](_0x1c0e39-_0x2e1f2d,0x0)/0x2);this[_0x5e64cf(0x144)]['blt'](_0x26407c,_0x28304d,_0x54a56e,_0x1c60e0,_0x2bf5df,_0x5dee98,_0x245988,_0x5dff59,_0x2e1f2d),this[_0x5e64cf(0x284)](!![]);},Window_StatusBase[_0x79d2d0(0x2a0)][_0x79d2d0(0x220)]=function(_0x3c6b67,_0x4172af,_0x369b6c,_0x2b1815,_0x300430){const _0x3f818f=_0x79d2d0,_0x45cd6f=ImageManager[_0x3f818f(0x180)](_0x3c6b67[_0x3f818f(0x26c)]());_0x2b1815=(_0x2b1815||ImageManager[_0x3f818f(0x121)])-0x2,_0x300430=(_0x300430||ImageManager[_0x3f818f(0x2ba)])-0x2;const _0x3367cb=_0x45cd6f[_0x3f818f(0x276)],_0x423a13=_0x45cd6f[_0x3f818f(0x292)],_0x4d6396=_0x2b1815,_0x5e99a9=_0x300430-0x2,_0x222aa5=_0x4172af+Math[_0x3f818f(0x17a)](_0x4d6396/0x2),_0x3f237d=_0x369b6c+Math[_0x3f818f(0x252)]((_0x300430+_0x423a13)/0x2);this[_0x3f818f(0x265)]===Window_MenuStatus&&this[_0x3f818f(0x284)](_0x3c6b67[_0x3f818f(0x13b)]());const _0xbf591b=Math[_0x3f818f(0x234)](_0x2b1815,_0x3367cb),_0x5b048b=Math[_0x3f818f(0x234)](_0x300430,_0x423a13),_0x27cfc5=_0x4172af+0x1,_0xe38faa=Math[_0x3f818f(0x169)](_0x369b6c+0x1,_0x369b6c+_0x5e99a9-_0x423a13+0x3);let _0xd6fbd9=Math[_0x3f818f(0x218)]((_0x3367cb-_0xbf591b)/0x2),_0x11eab5=Math['round']((_0x423a13-_0x5b048b)/0x2);_0xd6fbd9-=_0x3c6b67[_0x3f818f(0x122)](),_0x11eab5-=_0x3c6b67[_0x3f818f(0x240)]();if(Imported['VisuMZ_0_CoreEngine']){if('kzZCa'==='kzZCa'){if(VisuMZ['CoreEngine'][_0x3f818f(0x113)][_0x3f818f(0x132)]['PixelateImageRendering']){}}else{const _0x80fa1c=_0x31077b[_0x3f818f(0x1c4)][_0x3f818f(0x113)][_0x3f818f(0x297)][_0x3f818f(0x182)],_0x13312a=_0x4326f3['y']+(this[_0x3f818f(0x133)]()-_0x5ea82b[_0x3f818f(0x115)])/0x2;this[_0x3f818f(0x256)](_0x80fa1c,_0x4b1d56['x'],_0x13312a);const _0x16e1aa=_0x268d9d[_0x3f818f(0x2bb)]+0x4;_0x27b8f2['x']+=_0x16e1aa,_0xdf8673[_0x3f818f(0x276)]-=_0x16e1aa;}}this[_0x3f818f(0x144)][_0x3f818f(0x11d)](_0x45cd6f,_0xd6fbd9,_0x11eab5,_0xbf591b,_0x5b048b,_0x27cfc5,_0xe38faa),this[_0x3f818f(0x284)](!![]);},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x157)]=Window_MenuStatus[_0x79d2d0(0x2a0)]['selectLast'],Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x1b2)]=function(){const _0x55eea8=_0x79d2d0;VisuMZ[_0x55eea8(0x1c4)]['Settings'][_0x55eea8(0x21d)]['StatusSelectLast']?VisuMZ[_0x55eea8(0x1c4)]['Window_MenuStatus_selectLast'][_0x55eea8(0x10a)](this):this[_0x55eea8(0x20b)](0x0);},VisuMZ['MainMenuCore']['Window_MenuStatus_maxItems']=Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x11c)],Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x11c)]=function(){const _0x5a8953=_0x79d2d0;if(this[_0x5a8953(0x1b9)]())return $gameParty[_0x5a8953(0x228)]()[_0x5a8953(0x10e)];else{if('oFPTA'==='oFPTA')return VisuMZ['MainMenuCore'][_0x5a8953(0x11b)]['call'](this);else{const _0x55b4f2=_0x3d249f[_0x5a8953(0x180)](_0x1f6750[_0x5a8953(0x26c)]());_0x55b4f2[_0x5a8953(0x2ac)](this[_0x5a8953(0x243)][_0x5a8953(0x111)](this,_0x3a4721,_0x4c2223));}}},Window_MenuStatus[_0x79d2d0(0x2a0)]['showOnlyBattleMembers']=function(){const _0x5eabe4=_0x79d2d0,_0x180447=VisuMZ['MainMenuCore'][_0x5eabe4(0x113)]['General'];if(_0x180447[_0x5eabe4(0x149)]===undefined)_0x180447[_0x5eabe4(0x149)]=!![];const _0x5e9eda=SceneManager[_0x5eabe4(0x145)];if(!_0x180447['ShowReserve']){if(_0x180447[_0x5eabe4(0x1db)])return _0x5e9eda[_0x5eabe4(0x265)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype'][_0x79d2d0(0x201)]=function(){const _0x3ac89d=_0x79d2d0,_0x15029f=SceneManager['_scene'][_0x3ac89d(0x265)];return _0x15029f===Scene_Menu?VisuMZ[_0x3ac89d(0x1c4)]['Settings'][_0x3ac89d(0x127)]:VisuMZ[_0x3ac89d(0x1c4)][_0x3ac89d(0x113)][_0x3ac89d(0x2b9)];},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x205)]=function(){const _0x30d7c9=_0x79d2d0,_0x153034=this['listStyle']();switch(_0x153034){case _0x30d7c9(0x141):case _0x30d7c9(0x214):return 0x1;case'solo':return 0x1;default:return $gameParty[_0x30d7c9(0x1cb)]();}},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x18a)]=function(){const _0x115b50=_0x79d2d0,_0x690750=this['listStyle']();switch(_0x690750){case _0x115b50(0x141):case _0x115b50(0x214):return $gameParty['maxBattleMembers']();default:return 0x1;}},VisuMZ[_0x79d2d0(0x1c4)][_0x79d2d0(0x1f3)]=Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x155)],Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x155)]=function(){const _0x21db57=_0x79d2d0,_0x5cdbf2=this[_0x21db57(0x201)]();switch(_0x5cdbf2){case _0x21db57(0x141):case _0x21db57(0x214):case _0x21db57(0x298):return this[_0x21db57(0x206)];case _0x21db57(0x28b):return Window_Selectable[_0x21db57(0x2a0)][_0x21db57(0x155)][_0x21db57(0x10a)](this);case _0x21db57(0x19f):return this[_0x21db57(0x133)]()*0x2+0x8;default:return VisuMZ[_0x21db57(0x1c4)]['Window_MenuStatus_itemHeight']['call'](this);}},Window_MenuStatus[_0x79d2d0(0x2a0)]['drawItem']=function(_0x3474b2){const _0x334965=_0x79d2d0;this[_0x334965(0x1ef)](_0x3474b2),this[_0x334965(0x20f)](_0x3474b2);},VisuMZ['MainMenuCore'][_0x79d2d0(0x19a)]=Window_MenuStatus['prototype'][_0x79d2d0(0x15b)],Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x245)]=function(_0x5896f4,_0x2a168d,_0x262a93,_0x4d46df,_0x3800d2){const _0x1dd2f3=_0x79d2d0;switch(this[_0x1dd2f3(0x10b)]()){case _0x1dd2f3(0x20a):break;case _0x1dd2f3(0x147):this[_0x1dd2f3(0x229)](_0x5896f4,_0x2a168d,_0x262a93+0x1,_0x4d46df,_0x3800d2-0x2);break;case _0x1dd2f3(0x248):this[_0x1dd2f3(0x25a)](_0x5896f4,_0x2a168d,_0x262a93+0x1,_0x4d46df,_0x3800d2-0x2);break;default:this[_0x1dd2f3(0x16f)](_0x5896f4,_0x2a168d,_0x262a93,_0x4d46df,_0x3800d2);break;}},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x20f)]=function(_0xbd7f23){const _0xee66cb=_0x79d2d0;this[_0xee66cb(0x23b)]();const _0x242e2b=this[_0xee66cb(0x16e)](_0xbd7f23),_0x3ec8e1=this[_0xee66cb(0x2b5)](_0xbd7f23),_0x168309=this[_0xee66cb(0x201)]();switch(_0x168309){case _0xee66cb(0x141):this['drawItemStatusVerticalStyle'](_0x242e2b,_0x3ec8e1);break;case'portrait':this[_0xee66cb(0x137)](_0x242e2b,_0x3ec8e1);break;case _0xee66cb(0x298):this[_0xee66cb(0x250)](_0x242e2b,_0x3ec8e1);break;case _0xee66cb(0x28b):this[_0xee66cb(0x120)](_0x242e2b,_0x3ec8e1);break;case _0xee66cb(0x19f):this[_0xee66cb(0x200)](_0x242e2b,_0x3ec8e1);break;default:this[_0xee66cb(0x2b7)](_0x242e2b,_0x3ec8e1);break;}},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x17c)]=function(_0x4404bb,_0x491f01){const _0x2e0d93=_0x79d2d0;VisuMZ[_0x2e0d93(0x1c4)]['Settings'][_0x2e0d93(0x18e)][_0x2e0d93(0x23f)]['call'](this,_0x4404bb,_0x491f01);},Window_MenuStatus[_0x79d2d0(0x2a0)]['drawItemStatusPortraitStyle']=function(_0xdb01f7,_0x62799c){const _0x49b0a6=_0x79d2d0;if(_0xdb01f7[_0x49b0a6(0x26c)]()!==''){const _0x3c18f2=ImageManager[_0x49b0a6(0x180)](_0xdb01f7['getMenuImage']());_0x3c18f2['addLoadListener'](this['drawItemStatusPortraitStyleOnLoad'][_0x49b0a6(0x111)](this,_0xdb01f7,_0x62799c));}else this[_0x49b0a6(0x17c)](_0xdb01f7,_0x62799c);},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x21f)]=function(_0x4e7d98,_0x3dfc6f){const _0x3135f9=_0x79d2d0;VisuMZ[_0x3135f9(0x1c4)][_0x3135f9(0x113)]['ListStyles'][_0x3135f9(0x1b8)]['call'](this,_0x4e7d98,_0x3dfc6f);},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x250)]=function(_0x2752ad,_0x243f6f){const _0x35d94=_0x79d2d0,_0x4a94d9=ImageManager['loadPicture'](_0x2752ad[_0x35d94(0x26c)]());_0x4a94d9[_0x35d94(0x2ac)](this[_0x35d94(0x243)][_0x35d94(0x111)](this,_0x2752ad,_0x243f6f));},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x243)]=function(_0x50fd49,_0x44d8c5){const _0x5857b9=_0x79d2d0;VisuMZ['MainMenuCore'][_0x5857b9(0x113)]['ListStyles'][_0x5857b9(0x134)][_0x5857b9(0x10a)](this,_0x50fd49,_0x44d8c5);},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x120)]=function(_0x1b856c,_0x4d309b){const _0x24ac1d=_0x79d2d0;VisuMZ[_0x24ac1d(0x1c4)]['Settings'][_0x24ac1d(0x18e)]['ThinStyle'][_0x24ac1d(0x10a)](this,_0x1b856c,_0x4d309b);},Window_MenuStatus[_0x79d2d0(0x2a0)]['drawItemStatusThickerStyle']=function(_0x3fa96a,_0x33e859){const _0xcbe9cf=_0x79d2d0;VisuMZ[_0xcbe9cf(0x1c4)]['Settings'][_0xcbe9cf(0x18e)][_0xcbe9cf(0x274)]['call'](this,_0x3fa96a,_0x33e859);},Window_MenuStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x295)]=function(){const _0x333a38=_0x79d2d0,_0x112f12=this[_0x333a38(0x201)]();if([_0x333a38(0x28b),_0x333a38(0x19f)][_0x333a38(0x275)](_0x112f12))return![];return Window_StatusBase[_0x333a38(0x2a0)][_0x333a38(0x295)][_0x333a38(0x10a)](this);},Window_MenuStatus['prototype']['drawItemStatusDefaultStyle']=function(_0x1f498f,_0x4257ba){const _0x309c33=_0x79d2d0;VisuMZ[_0x309c33(0x1c4)]['Settings']['ListStyles']['DefaultStyle'][_0x309c33(0x10a)](this,_0x1f498f,_0x4257ba);},Window_SkillStatus[_0x79d2d0(0x2a0)][_0x79d2d0(0x1eb)]=function(_0x317cf9,_0x46176c,_0x2033f4,_0x557926,_0x3f3e1c){const _0x502fb6=_0x79d2d0;switch(this['graphicType']()){case _0x502fb6(0x20a):break;case _0x502fb6(0x147):this[_0x502fb6(0x229)](_0x317cf9,_0x46176c,_0x2033f4,_0x557926,_0x3f3e1c);break;case _0x502fb6(0x248):this['drawItemActorSvBattler'](_0x317cf9,_0x46176c,_0x2033f4,_0x557926,_0x3f3e1c);break;default:Window_StatusBase[_0x502fb6(0x2a0)][_0x502fb6(0x1eb)]['call'](this,_0x317cf9,_0x46176c,_0x2033f4,_0x557926,_0x3f3e1c);break;}},Window_EquipStatus['prototype'][_0x79d2d0(0x1eb)]=function(_0x53e3c1,_0x2c1544,_0x5a8508,_0x351887,_0x2c0b20){const _0x3ea1b3=_0x79d2d0;switch(this['graphicType']()){case _0x3ea1b3(0x20a):break;case _0x3ea1b3(0x147):this[_0x3ea1b3(0x229)](_0x53e3c1,_0x2c1544,_0x5a8508,_0x351887,_0x2c0b20);break;case'svbattler':this['drawItemActorSvBattler'](_0x53e3c1,_0x2c1544,_0x5a8508,_0x351887,_0x2c0b20);break;default:Window_StatusBase[_0x3ea1b3(0x2a0)][_0x3ea1b3(0x1eb)][_0x3ea1b3(0x10a)](this,_0x53e3c1,_0x2c1544,_0x5a8508,_0x351887,_0x2c0b20);break;}};function Window_ThinGold(){const _0x430102=_0x79d2d0;this[_0x430102(0x27e)](...arguments);}function _0x34e1(_0x55d00b,_0x1a0cf3){const _0xeabdf9=_0xeabd();return _0x34e1=function(_0x34e177,_0x16deeb){_0x34e177=_0x34e177-0x10a;let _0x5dfdce=_0xeabdf9[_0x34e177];return _0x5dfdce;},_0x34e1(_0x55d00b,_0x1a0cf3);}Window_ThinGold[_0x79d2d0(0x2a0)]=Object['create'](Window_Gold[_0x79d2d0(0x2a0)]),Window_ThinGold['prototype'][_0x79d2d0(0x265)]=Window_ThinGold,Window_ThinGold['prototype'][_0x79d2d0(0x155)]=function(){return this['lineHeight']();},Window_ThinGold[_0x79d2d0(0x2a0)]['colSpacing']=function(){const _0x288dd8=_0x79d2d0;return Window_Selectable[_0x288dd8(0x2a0)][_0x288dd8(0x198)][_0x288dd8(0x10a)](this);};function Window_Playtime(){this['initialize'](...arguments);}Window_Playtime[_0x79d2d0(0x2a0)]=Object[_0x79d2d0(0x1de)](Window_Selectable[_0x79d2d0(0x2a0)]),Window_Playtime['prototype'][_0x79d2d0(0x265)]=Window_Playtime,Window_Playtime[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)]=function(_0x22c108){const _0x1b53c7=_0x79d2d0;this[_0x1b53c7(0x1b6)]=$gameSystem[_0x1b53c7(0x1a7)](),this['_timer']=0x3c,Window_Selectable['prototype']['initialize'][_0x1b53c7(0x10a)](this,_0x22c108),this['refresh']();},Window_Playtime[_0x79d2d0(0x2a0)][_0x79d2d0(0x155)]=function(){const _0x524aea=_0x79d2d0;return this[_0x524aea(0x133)]();},Window_Playtime[_0x79d2d0(0x2a0)]['update']=function(){const _0x3d96d1=_0x79d2d0;Window_Selectable['prototype']['update'][_0x3d96d1(0x10a)](this),this['updateTimer']();},Window_Playtime[_0x79d2d0(0x2a0)][_0x79d2d0(0x10c)]=function(){const _0x18fd56=_0x79d2d0;if(this[_0x18fd56(0x247)]-->0x0){if(this[_0x18fd56(0x247)]<=0x0)this[_0x18fd56(0x1c7)]();}},Window_Playtime[_0x79d2d0(0x2a0)]['refresh']=function(){const _0x5aba03=_0x79d2d0;this[_0x5aba03(0x247)]=0x3c;const _0x36fb0e=this['itemLineRect'](0x0),_0xe193d7=_0x36fb0e['x'],_0x2573b9=_0x36fb0e['y'],_0x2f6482=_0x36fb0e[_0x5aba03(0x276)];this[_0x5aba03(0x144)][_0x5aba03(0x11f)](),this[_0x5aba03(0x299)](_0x36fb0e),this[_0x5aba03(0x12b)](_0x36fb0e),this['drawPlaytime'](_0x36fb0e);},Window_Playtime[_0x79d2d0(0x2a0)][_0x79d2d0(0x23b)]=function(){const _0x471c15=_0x79d2d0;Window_Selectable[_0x471c15(0x2a0)][_0x471c15(0x23b)]['call'](this),this[_0x471c15(0x144)]['fontSize']=VisuMZ[_0x471c15(0x1c4)]['Settings'][_0x471c15(0x297)][_0x471c15(0x1d4)];},Window_Playtime['prototype'][_0x79d2d0(0x299)]=function(_0x1adf1f){const _0x4f434a=_0x79d2d0;if(VisuMZ[_0x4f434a(0x1c4)][_0x4f434a(0x113)][_0x4f434a(0x297)]['Icon']>0x0){const _0x3c20b8=VisuMZ[_0x4f434a(0x1c4)][_0x4f434a(0x113)][_0x4f434a(0x297)][_0x4f434a(0x182)],_0xd2a6db=_0x1adf1f['y']+(this[_0x4f434a(0x133)]()-ImageManager[_0x4f434a(0x115)])/0x2;this['drawIcon'](_0x3c20b8,_0x1adf1f['x'],_0xd2a6db);const _0x306871=ImageManager[_0x4f434a(0x2bb)]+0x4;_0x1adf1f['x']+=_0x306871,_0x1adf1f['width']-=_0x306871;}},Window_Playtime['prototype'][_0x79d2d0(0x12b)]=function(_0x5e7cb7){const _0x154a46=_0x79d2d0;this[_0x154a46(0x23b)](),this[_0x154a46(0x1c3)](ColorManager['systemColor']());const _0x1aaa9c=VisuMZ[_0x154a46(0x1c4)][_0x154a46(0x113)][_0x154a46(0x297)][_0x154a46(0x164)];this[_0x154a46(0x17e)](_0x1aaa9c,_0x5e7cb7['x'],_0x5e7cb7['y'],_0x5e7cb7[_0x154a46(0x276)],'left'),this[_0x154a46(0x27b)]();},Window_Playtime[_0x79d2d0(0x2a0)][_0x79d2d0(0x173)]=function(_0x595f11){const _0x22ad71=_0x79d2d0,_0x4f5e4c=$gameSystem[_0x22ad71(0x1a7)]();this['drawText'](_0x4f5e4c,_0x595f11['x'],_0x595f11['y'],_0x595f11[_0x22ad71(0x276)],_0x22ad71(0x15d));};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x79d2d0(0x2a0)]=Object['create'](Window_Selectable[_0x79d2d0(0x2a0)]),Window_MenuVariables['prototype'][_0x79d2d0(0x265)]=Window_MenuVariables,Window_MenuVariables[_0x79d2d0(0x2a0)][_0x79d2d0(0x27e)]=function(_0x157d47){const _0x15139b=_0x79d2d0;Window_Selectable[_0x15139b(0x2a0)][_0x15139b(0x27e)]['call'](this,_0x157d47),this[_0x15139b(0x19b)]=VisuMZ[_0x15139b(0x1c4)][_0x15139b(0x113)][_0x15139b(0x1b7)][_0x15139b(0x24c)],this['refresh']();},Window_MenuVariables[_0x79d2d0(0x2a0)]['itemHeight']=function(){const _0x503b7b=_0x79d2d0;return this[_0x503b7b(0x133)]();},Window_MenuVariables['prototype']['maxCols']=function(){const _0x4730d6=_0x79d2d0,_0x37fc0b=SceneManager[_0x4730d6(0x145)][_0x4730d6(0x26a)]();return _0x37fc0b===_0x4730d6(0x2af)?0x1:VisuMZ[_0x4730d6(0x1c4)]['Settings']['Variable']['VarList'][_0x4730d6(0x10e)];},Window_MenuVariables[_0x79d2d0(0x2a0)][_0x79d2d0(0x23b)]=function(){const _0x21b3e5=_0x79d2d0;Window_Selectable[_0x21b3e5(0x2a0)]['resetFontSettings'][_0x21b3e5(0x10a)](this),this[_0x21b3e5(0x144)][_0x21b3e5(0x131)]=VisuMZ['MainMenuCore'][_0x21b3e5(0x113)][_0x21b3e5(0x1b7)][_0x21b3e5(0x1d4)],this['changeTextColor'](ColorManager[_0x21b3e5(0x161)]());},Window_MenuVariables[_0x79d2d0(0x2a0)][_0x79d2d0(0x11c)]=function(){const _0x339ecd=_0x79d2d0;return this['_data'][_0x339ecd(0x10e)];},Window_MenuVariables[_0x79d2d0(0x2a0)][_0x79d2d0(0x215)]=function(){const _0x40406b=_0x79d2d0,_0x29f90b=this[_0x40406b(0x19d)]();for(let _0x5df76e=0x0;_0x5df76e<this[_0x40406b(0x1ed)]();_0x5df76e++){const _0x482108=_0x29f90b+_0x5df76e;_0x482108<this['maxItems']()&&('EZTcm'===_0x40406b(0x219)?_0xcebc79[_0x40406b(0x13f)][_0x40406b(0x260)](_0x58dfd1):(this['drawItemBackground'](_0x482108),this[_0x40406b(0x2b0)](_0x482108)));}},Window_MenuVariables[_0x79d2d0(0x2a0)][_0x79d2d0(0x267)]=function(_0x4ae115){},Window_MenuVariables['prototype'][_0x79d2d0(0x2b0)]=function(_0x1c42a0){const _0x4faf49=_0x79d2d0,_0x2c46f4=this[_0x4faf49(0x19b)][_0x1c42a0];if(_0x2c46f4<=0x0)return;if(!$dataSystem['variables'][_0x2c46f4])return;const _0x32c1f6=this[_0x4faf49(0x278)](_0x1c42a0);this['resetFontSettings']();let _0xa3a229=0x0,_0x3e5fba=$dataSystem['variables'][_0x2c46f4][_0x4faf49(0x2b1)]();_0x3e5fba[_0x4faf49(0x14a)](/\\I\[(\d+)\]/i)&&(_0xa3a229=Number(RegExp['$1']),_0x3e5fba=_0x3e5fba[_0x4faf49(0x238)](/\\I\[(\d+)\]/i,'')[_0x4faf49(0x2b1)]());if(_0xa3a229>0x0){if(_0x4faf49(0x15e)!==_0x4faf49(0x15e))this[_0x4faf49(0x27e)](...arguments);else{const _0x335b2b=_0x32c1f6['y']+(this[_0x4faf49(0x133)]()-ImageManager[_0x4faf49(0x115)])/0x2;this['drawIcon'](_0xa3a229,_0x32c1f6['x'],_0x335b2b);const _0x72cebb=ImageManager[_0x4faf49(0x2bb)]+0x4;_0x32c1f6['x']+=_0x72cebb,_0x32c1f6[_0x4faf49(0x276)]-=_0x72cebb;}}this[_0x4faf49(0x17e)](_0x3e5fba,_0x32c1f6['x'],_0x32c1f6['y'],_0x32c1f6['width'],_0x4faf49(0x1e0)),this[_0x4faf49(0x1c3)](ColorManager['normalColor']()),this[_0x4faf49(0x17e)]($gameVariables[_0x4faf49(0x1be)](_0x2c46f4),_0x32c1f6['x'],_0x32c1f6['y'],_0x32c1f6['width'],_0x4faf49(0x15d));};function _0xeabd(){const _0x268d27=['commandWindowRectThinTopStyle','Window_MenuStatus_itemHeight','callUpdateHelp','ARRAYJSON','commandStyleCheck','currentSymbol','CommandWindowStyle','4973992WSrpsf','isMainMenuCommandEnabled','return\x200','Step2','xQPbw','thinGoldWindow','commandName','drawItemStatusThickerStyle','listStyle','7EiWnHF','Window_StatusBase_loadFaceImages','Style','numVisibleRows','innerHeight','Scene_Menu_commandFormation','mobile','PersonalHandlerJS','none','smoothSelect','addOptionsCommand','ChangeActorMenuImageRange','JSON','drawItemStatus','3260CUaMZZ','createCommandWindow','_bitmapReady','QSEpE','portrait','drawAllItems','createPlaytimeWindow','Scene_Menu_statusWindowRect','round','xFtKx','open','_actorMenuBgSprite','Cols','General','_commandNameWindow','drawItemStatusPortraitStyleOnLoad','drawItemActorMenuImage','createBackground','Scene_Menu_commandPersonal','STR','options','uhpND','MLBzR','commandPersonal','battleMembers','drawItemActorSprite','setup','3998636uObOZA','initMenuImage','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','commandFormation','save','close','isSoloQuickMode','drawItemStyleIcon','fittingHeight','min','StatusGraphic','Bkfhd','forceShowMainMenuCommand','replace','EHSWZ','createDummyWindow','resetFontSettings','GtHpc','characterIndex','itemTextAlign','VerticalStyle','getMenuImageOffsetY','khAfF','top','drawItemStatusSoloStyleOnLoad','ThinGoldWindow','drawActorGraphic','_dummyWindow','_timer','svbattler','uQxKn','mainCommandWidth','PGwHH','VarList','WmrLN','AutoGoldY','sMosq','drawItemStatusSoloStyle','addChild','ceil','vquAr','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','AutoGoldHeight','drawIcon','updateCommandNameWindow','PctER','parse','drawItemActorSvBattler','bottom','FlYPJ','updateActor','variableWindowRectBottomStyle','dAGnH','push','SnmEr','initMainMenuCore','TOPGA','_goldWindow','constructor','commandWindowRectThinBottomStyle','drawItemBackground','33320ReEnek','activate','commandWindowStyle','Rows','getMenuImage','center','ChangeActorMenuImageJS','_actor','Symbols','vFjFr','SoloQuick','adjustDefaultCommandWindowRect','ThickerStyle','includes','width','format','itemLineRect','addSaveCommand','commandNameWindowCenter','resetTextColor','status','battlerName','initialize','Scene_Menu_create','commandWindowRectMobileStyle','boKbF','hLQNu','playtimeWindowRectTopStyle','changePaintOpacity','PajqP','hasStaticSvBattler','characterName','canCreatePlaytimeWindow','bitmap','commandCommonEvent','thin','Untitled','_targetY','Lbjsw','Scene_Menu_createStatusWindow','loadSvActor','loadOtherActorImages','height','TSuEU','calcWindowHeight','isExpGaugeDrawn','shift','Playtime','solo','drawTimeIcon','cLHCw','oMbCq','ChangeActorMenuImageGroup','KcgvD','CommandList','_variableWindow','prototype','loadFaceImages','WindowRect','_statusWindow','createVariableWindow','NUkQW','applyThinnerGoldWindowRect','description','_commandWindow','BgType','BsNMN','drawTextEx','addLoadListener','addFormationCommand','icon','default','drawItem','trim','thinTop','plwKj','Rixgi','itemRect','setHandler','drawItemStatusDefaultStyle','ZrIZC','InnerMenuListStyle','faceHeight','iconWidth','update','ExtJS','call','graphicType','updateTimer','ARRAYFUNC','length','Symbol','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','bind','CallHandlerJS','Settings','agRrI','iconHeight','auto','text','IeFBf','blTnb','egdTe','Window_MenuStatus_maxItems','maxItems','blt','commandLoad','clear','drawItemStatusThinStyle','faceWidth','getMenuImageOffsetX','commandNameWindowDrawText','pIOol','loadCharacter','getMainMenuSymbolState','StatusListStyle','currentExt','ActorBgMenus','goldWindowRect','drawTimeLabel','statusWindowRect','Step1Start','boxWidth','name','isArray','fontSize','QoL','lineHeight','SoloStyle','setActor','reserveCommonEvent','drawItemStatusPortraitStyle','innerWidth','AdjustCommandHeight','_targetX','isBattleMember','addSymbolBridge','createActorMenuBackgroundImageSprite','svActorVertCells','forceEnable','Step1End','vertical','MenuCommandClear','commandWindowRectBottomStyle','contents','_scene','exit','sprite','_commandList','ShowReserve','match','_menuImage','mainMenuCoreSettings','setBackgroundType','registerCommand','onPersonalCancel','makeMainMenuCoreCommandList','ActorBgMenuJS','Enable','31gEVMig','clearShowMainMenuCommand','itemHeight','makeCommandList','Window_MenuStatus_selectLast','opacity','loadBitmap','aLlOZ','drawItemImage','drawItemStyleIconText','right','nXzys','thinBottom','VKUvV','systemColor','canCreateVariableWindow','WadFO','Time','VFNoG','Scene_Menu_onFormationCancel','cqWOI','updatePosition','max','playtimeWindowRectBottomStyle','onPersonalOk','adjustCommandHeightByPlaytime','Nwycq','actor','drawItemActorFace','commandNameWindowDrawBackground','TextAlign','ARRAYNUM','drawPlaytime','isDisplayActorMenuBackgroundImage','uTJvH','forceShow','addOriginalCommands','updateOpacity','updateDuration','floor','HJPbC','drawItemStatusVerticalStyle','forceDisableMainMenuCommand','drawText','17478Jnyuav','loadPicture','commandStyle','Icon','commandWindowRect','commandWindowRectTopStyle','playtimeWindowRect','ARRAYSTR','ShowJS','isCommandEnabled','gameEnd','maxCols','cancel','MLHnn','textSizeEx','ListStyles','EnableJS','CustomCmdWin','mainAreaBottom','mainAreaHeight','version','MenuCommandForceShow','forceHide','Scene_Menu_onPersonalCancel','addCommand','colSpacing','onBitmapLoad','Window_MenuStatus_drawItemImage','_data','MobileThickness','topIndex','needsDummyWindow','thicker','remove','STRUCT','map','index','mainAreaTop','formation','concat','playtimeText','Scene_Menu_commandWindowRect','setMenuImage','HQKbN','statusWindowRectMobileStyle','chHwR','createStatusWindow','createGoldWindow','filter','_playtimeWindow','wbHaQ','selectLast','boxHeight','goldWindowRectTopStyle','TextStr','_playtimeText','Variable','PortraitStyle','showOnlyBattleMembers','Exizu','addGameEndCommand','cTgjY','NnckJ','value','2020XxJtNW','rdBhF','forceEnableMainMenuCommand','_list','changeTextColor','MainMenuCore','popScene','Window_MenuCommand_initialize','refresh','statusWindowRectBottomStyle','adjustStatusWindowMobile','Scene_Menu_goldWindowRect','maxBattleMembers','NUM','addMainCommands','Scene_MenuBase_createBackground','members','_duration','forceDisable','IuYpy','addWindow','FontSize','ARRAYEVAL','statusWindowRectTopStyle','note','variableWindowRect','iYkbx','Game_Actor_setup','HideMainMenuOnly','_mainMenuCore','Scene_MenuBase_updateActor','create','uCbaT','left','variableWindowRectTopStyle','1212629IJgDFY','parameters','FUNC','adjustCommandHeightByVariable','onFormationCancel','svActorHorzCells','yJrps','createCommandNameWindow','isBigCharacter','drawActorFace','774ucgXPR','maxVisibleItems','ConvertParams','drawPendingItemBackground','Game_System_initialize','481536MzXIHp'];_0xeabd=function(){return _0x268d27;};return _0xeabd();}