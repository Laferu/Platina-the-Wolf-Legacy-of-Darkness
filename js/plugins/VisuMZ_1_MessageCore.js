//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.36;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.36] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x1bc7(){const _0x58eaa9=['makeFontBigger','Window_Message_newPage','<I>','xksNh','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','getChoiceListTextAlign','NUM','refreshDimmerBitmap','getMessageWindowXyOffsets','nextEventCode','Default','exit','clampPlacementPosition','Window_Message_clearFlags','Padding','ActionJS','trim','processColorLock','min','aIkWz','VrOYe','ConvertParams','XepfZ','floor','status','default','DISABLE','Window_Help_refresh','textSizeExWordWrap','isWordWrapEnabled','YRQxQ','addMessageCoreCommands','onChoice','Game_Map_initialize','defeat','WordWrap','adjustShowChoiceCancel','TextCodeActions','Window_Options_changeVolume','move','QXtTp','drawBackCenteredPicture','getChoiceIndent','battle\x20party','obtainItem','STRUCT','update','width','ahVLm','setLastGainedItemData','choiceCols','name','item','Instant','padding','isChoiceVisible','Sprite_Picture_update','exec','format','surprise','commandSymbol','setFaceImage','applyData','sBoKB','CreateAutoColorFor','_moveTargetHeight','\x1bBOLD[1]','obtainEscapeParam','outlineColor','getChoiceListMaxRows','</COLORLOCK>','faceName','height','qdocp','drawTextEx','_scene','processControlCharacter','updateMessageCommonEvents','nXuMF','updateNameBoxMove','lowerleft','newPage','preemptive','HelpWindow','isRTL','ceil','prepareShowTextCommand','parameters','BOLD','AutoColor','battle\x20enemy','Wwsnc','Window_ChoiceList_windowX','lastGainedObjectQuantity','_texts','windowPadding','processTextAlignmentChange','processPyTextCode','Window_Options_isVolumeSymbol','iZryk','\x1bITALIC[0]','messageCoreTextSpeed','sLTPV','_targets','databaseObjectName','autoPositionOffsetX','ZALtF','VisuMZ_1_EventsMoveCore','makeDeepCopy','maxCols','mZHZA','Enemies','includes','convertVariableEscapeCharacters','prepareWordWrapEscapeCharacters','_moveEasingType','ARRAYJSON','KfOIt','ParseClassNotetags','center','SWITCH','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','TkYtU','right','easeIn','isVolumeSymbol','index','max','isInputting','updateBitmap','DxQEs','instantTextSpeed','addContinuousShowChoices','FUNC','TightWrap','CENTERPICTURE','calcMoveEasing','numVisibleRows','Undefined','constructor','loadPicture','fontBold','push','value','oXWQz','wFVZp','FCXUL','outputHeight','VWadW','splice','BEPsZ','message','_MessageCoreSettings','lastGainedObjectName','placeCancelButton','addMessageCommonEvent','visible','convertBackslashCharacters','\x1bTEXTALIGNMENT[3]','process_VisuMZ_MessageCore_TextMacros','Window_Base_changeTextColor','convertMessageCoreEscapeActions','battle\x20actor','postFlushTextState','stretchDimmerSprite','Weapons','MsgWindowOffsetY','rvzVe','iconIndex','_relativePosition','OEnUI','processFontChangeBold','\x1bi[%1]%2','(((','setTextDelay','AutoColorBypassList','terminateMessage','addWrapBreakAfterPunctuation','onDatabaseLoaded','choiceTextAlign','Window_Base_processAllText','messageWordWrap','_eventId','General','TextCodeReplace','_positionType','PictureIDs','toLowerCase','xvBQY','MessageWidth','ParseAllNotetags','nxRBs','_index','aUTuw','955ubGgaA','messageCoreWindowX','isWeapon','boxHeight','mainFontFace','setChoiceListMaxRows','openness','Actors','actor','fontItalic','\x1bTEXTALIGNMENT[0]','processMessageCoreEscapeActions','_autoSizeCheck','drawing','inputtingAction','NameBoxWindowOffsetY','ParseEnemyNotetags','setBackground','flushTextState','hFXTM','pYAcH','getPictureText','Game_Screen_erasePicture','processAllText','setTextAlignment','outlineWidth','upperleft','StretchDimmedBg','5552766ESbrex','isItem','postConvertEscapeCharacters','<LEFT>','outLineColor','\x1bWrapBreak[0]','maxCommands','PREVCOLOR','convertFontSettingsEscapeCharacters','launchMessageCommonEvent','MaxRows','updateBackground','down','</B>','parse','_autoPositionTarget','DefaultOutlineWidth','convertTextAlignmentEscapeCharacters','OpTVU','processDrawPicture','commandName','setColorLock','FsMBK','_commonEventId','_messageOffsetX','isHelpWindowWordWrap','_pictureId','KeWZG','anchorPictureText','COLORLOCK','currentExt','_lastGainedItemData','createPictureText','_textDelay','ARRAYSTRUCT','_refreshPauseSign','Classes','sZPyI','rtl','changeTextSpeed','pJmKY','clear',')))','levelUp','Window_Base_update','resetTextColor','_resetRect','choiceLineHeight','SnJJR','PictureTextErase','version','registerResetRect','TextSpeed','textSizeExTextAlignment','_colorLock','Window_Message_updatePlacement','activate','createTextState','textCodeCheck','isPressed','updateEvents','partyMemberName','obtainExp','normalColor','convertNewPageTextStateMacros','findTargetSprite','length','substring','<CENTER>','updateAutoPosition','_pictureTextBuffer','isYTr','processAutoColorWords','registerActorNameAutoColorChanges','FontSmallerCap','command101','JSON','textSizeExRaw','_pictureTextWidth','makeFontSmaller','_messageOffsetY','convertEscapeCharacters','currentCommand','Type','EtSlc','prepareShowTextFollowups','updateXyOffsets','inBattle','Rows','preFlushTextState','start','statusText','setMessageWindowXyOffsets','Scene_Options_maxCommands','Window_ChoiceList_updatePlacement','_textDelayCount','createContents','textCodeResult','resetWordWrap','map','mImwE','TextStr','_moveTargetY','ICEWQ','call','blt','Window_Base_textSizeEx','helpWordWrap','round','defaultColor','3891753tnLRxt','messageWindowRect','textSpeed','upperright','toUpperCase','MessageCore','replace','bBDtu','isChoiceEnabled','\x1bCOLORLOCK[1]','isBusy','ParseWeaponNotetags','CreateAutoColorRegExpListEntries','2vzjXAS','makeData','clamp','</RIGHT>','Window_Message_processEscapeCharacter','processAutoPosition','4429173XCOPXy','fontSize','processNewLine','lYdYM','ENABLE','ParseStateNotetags','_interpreter','getPictureTextData','outputWidth','SMbVS','code','8351HcuPtx','itemRectWithPadding','setHelpWindowWordWrap','STR','[0]','_showFast','choiceRows','shift','UuIwv','rnuAt','wGEql','lineHeight','getChoiceListLineHeight','close','setMessageWindowRows','clearAllPictureTexts','HDLTg','realPictureId','Game_Map_updateEvents','sUOus','getMessageWindowWidth','resetPositionX','PICTURE','_forcedPosition','onNewPageMessageCore','eraseAllPictureTexts','Window_Base_processNewLine','ConfigManager_applyData','addGeneralOptions','\x1bBOLD[0]','preConvertEscapeCharacters','clearFlags','_pictureTextWindow','none','_currentAutoSize','event','ARRAYSTR','messagePositionReset','QEGAD','split','convertHardcodedEscapeReplacements','_autoColorActorNames','isSceneMap','contents','adjustShowChoiceDefault','FastForwardKey','filter','NrRJG','Jlzfm','bind','setupItemChoice','setRelativePosition','\x1bITALIC[1]','addedHeight','processDrawCenteredPicture','VisuMZ_0_CoreEngine','processPreviousColor','refresh','changeOutlineColor','PqAaR','substr','EVAL','NameBoxWindowDefaultColor','isSceneBattle','textSpeedStatusText','ldlKa','_moveTargetX','mADHZ','resetFontSettings','OmhPp','getPictureTextBuffer','MaxCols','Window_Options_statusText','JdPWH','anyPictureTextChanges','UQDiR','callOkHandler','processEscapeCharacter','Window_Message_needsNewPage','_indent','indent','NqUJq','gCtGa','prototype','clearPictures','Window_Message_isTriggered','_autoPosRegExp','initMessageCore','addExtraShowChoices','\x1bI[%1]','_data','convertShowChoiceEscapeCodes','Window_Base_processControlCharacter','szlBk','_textColorStack','prepareForcedPositionEscapeCharacters','SortObjectByKeyLength','_moveTargetWidth','isRunning','MessageWindow','RelativePXPY','_wordWrap','textSizeEx','</CENTER>','FontBiggerCap','contentsHeight','getLastGainedItemData','Match','left','ParseAddedText','map\x20actor','changeTextColor','_dimmerSprite','lowerright','WORD_WRAP_PADDING','slice','applyMoveEasing','getPreservedFontSettings','PictureTextChange','FontChangeValue','description','ITALIC','isAutoColorAffected','setupChoices','WOtFe','getConfigValue','addedWidth','updatePictureText','battleTargetName','addMessageCoreTextSpeedCommand','NameBoxWindowOffsetX','avgBJ','Window_Message_synchronizeNameBox','sypOk','setChoiceListMaxColumns','OffsetY','AddAutoColor','easeOut','<COLORLOCK>','actorName','getTextAlignment','Settings','klDnE','Armors','unshift','LSJPr','processStoredAutoColorChanges','faceWidth','Mbjnx','_target','calcWindowHeight','_textMacroFound','convertLockColorsEscapeCharacters','currencyUnit','EqIOX','add','TextManager_message','ohUtd','updateTransform','_wholeMoveDuration','itemPadding','updateAutoSizePosition','drawPictureTextZone','attachPictureText','imxev','scLvW','qagcj','registerCommand','JSsaq','Sprite_Picture_updateBitmap','Game_Interpreter_setupChoices','gcsdh','needsNewPage','Game_Party_gainItem','resetRect','setWordWrap','setMessageWindowWordWrap','_subject','choicePositionType','obtainEscapeString','changePaintOpacity','Window_Message_terminateMessage','contentsBack','drawBackPicture','COMMONEVENT','convertMessageCoreEscapeReplacements','map\x20party','battleActionName','type','zXJWB','getStartingChoiceWidth','HIDE','MessageWindowXyOffsets','processFsTextCode','fSnPu','changeValue','list','scale','ParseArmorNotetags','isMessageWindowWordWrap','isContinuePrepareShowTextCommands','_macroBypassWordWrap','SHOW','processWrapBreak','processFontChangeItalic','21016ulcvYo','_pictureTextSprite','_messageCommonEvents','Name','addCommand','match','synchronizeNameBox','_spriteset','Scene_Boot_onDatabaseLoaded','TEXTALIGNMENT','TextMacros','messageRows','maxLines','MsiEn','mainFontSize','Window_Base_processEscapeCharacter','_messagePositionReset','canMove','IdCKb','ConvertTextAutoColorRegExpFriendly','JuKvD','gIrBT','getChoiceListMaxColumns','_autoSizeRegexp','victory','ARRAYFUNC','TextJS','initialize','setChoiceListTextAlign','applyDatabaseAutoColor','evfth','boxWidth','test','\x1bC[%1]%2\x1bPREVCOLOR[0]','startX','\x1bCOLORLOCK[0]','map\x20event','qALaI','DslmZ','maxChoiceWidth','\x5c%1','innerWidth','States','ParseSkillNotetags','sort','returnPreservedFontSettings','updateMove','MessageRows','false','fXIDz','</LEFT>','Skills','processAutoSize','ChoiceWindowLineHeight','processTextAlignmentX','textColor','CreateAutoColorRegExpLists','mQCtC','windowWidth','_list','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','CommonEvent','paintOpacity','moveTo','yDnge','setWaitMode','processCustomWait','_centerMessageWindow','registerSelfEvent','gainItem','ARRAYNUM','_cancelButton','updateRelativePosition','startWait','1256xJCaPj','PZlUp','moveBy','MessageTextDelay','_nameBoxWindow','aoDXN','EaaXj','isBreakShowTextCommands','MmIDw','choices','battleUserName','_messageWindow','follower','isCommandEnabled','updateForcedPlacement','\x1bTEXTALIGNMENT[2]','return\x20\x27','isColorLocked','ChoiceWindowTextAlign','\x1bTEXTALIGNMENT[1]','Game_Map_setupEvents','EsbNa','Items','processActorNameAutoColorChanges','prepareAutoSizeEscapeCharacters','kuwzV','initTextAlignement','processCommonEvent','_pictureText','ParseItemNotetags','itemHeight','startY','_action','setupEvents','WAIT','</WORDWRAP>','704120lxalzK','ConfigManager_makeData','MessageWindowProperties','updatePlacement','updateOverlappingY','erasePicture','ZweQV','choice','updateDimensions','drawPictureText','makeCommandList','fontFace','isTriggered','TextColor%1','onProcessCharacter','emerge','setMessageWindowWidth','oDGiq','\x1bTEXTALIGNMENT','UkasM','indexOf','AutoColorRegExp','addLoadListener','_moveDuration','iZJou','anchor','kAQYz','ChoiceWindowMaxCols','TextColor','clearActorNameAutoColor','setup','WRAPBREAK','MsgWindowOffsetX','zXHHf','DOper','followers','Window_Base_initialize','innerHeight','1525713bQGhJc','setPictureText','addChildAt','process_VisuMZ_MessageCore_AutoColor','ALL','erasePictureTextBuffer','members','processCharacter','quantity','nxnhi','convertChoiceMacros','convertTextMacros','setPositionType','windowX','getMessageWindowRows','convertBaseEscapeCharacters','parseChoiceText','processPxTextCode','messageWidth','_pictureTextCache','resizePictureText','text','adjustShowChoiceExtension'];_0x1bc7=function(){return _0x58eaa9;};return _0x1bc7();}const _0x5fa1a5=_0x240d;(function(_0x5776a8,_0x5e417c){const _0x3023a1=_0x240d,_0x54d79a=_0x5776a8();while(!![]){try{const _0x534aae=parseInt(_0x3023a1(0x37d))/0x1+-parseInt(_0x3023a1(0x20b))/0x2*(parseInt(_0x3023a1(0x211))/0x3)+parseInt(_0x3023a1(0x2e9))/0x4*(parseInt(_0x3023a1(0x174))/0x5)+-parseInt(_0x3023a1(0x190))/0x6+-parseInt(_0x3023a1(0x21c))/0x7*(-parseInt(_0x3023a1(0x333))/0x8)+parseInt(_0x3023a1(0x1fe))/0x9+parseInt(_0x3023a1(0x357))/0xa;if(_0x534aae===_0x5e417c)break;else _0x54d79a['push'](_0x54d79a['shift']());}catch(_0x44d719){_0x54d79a['push'](_0x54d79a['shift']());}}}(_0x1bc7,0xc7961));function _0x240d(_0x1189cf,_0x113ce2){const _0x1bc77b=_0x1bc7();return _0x240d=function(_0x240d1a,_0x2df370){_0x240d1a=_0x240d1a-0x13e;let _0x43bbc7=_0x1bc77b[_0x240d1a];return _0x43bbc7;},_0x240d(_0x1189cf,_0x113ce2);}var label=_0x5fa1a5(0x203),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5fa1a5(0x24a)](function(_0x1221fb){const _0x5a4a95=_0x5fa1a5;return _0x1221fb['status']&&_0x1221fb[_0x5a4a95(0x294)][_0x5a4a95(0x404)]('['+label+']');})[0x0];VisuMZ[label][_0x5fa1a5(0x2a9)]=VisuMZ[label][_0x5fa1a5(0x2a9)]||{},VisuMZ[_0x5fa1a5(0x3a9)]=function(_0x3ea3a7,_0x4e4aa9){const _0xb039c4=_0x5fa1a5;for(const _0x58b596 in _0x4e4aa9){if(_0x58b596[_0xb039c4(0x2ee)](/(.*):(.*)/i)){if(_0xb039c4(0x267)!=='UQDiR')return this[_0xb039c4(0x39d)]()===0x191;else{const _0x4c6297=String(RegExp['$1']),_0x1cc428=String(RegExp['$2'])['toUpperCase']()[_0xb039c4(0x3a4)]();let _0xcd7915,_0x7765c8,_0x1e22cb;switch(_0x1cc428){case _0xb039c4(0x39a):_0xcd7915=_0x4e4aa9[_0x58b596]!==''?Number(_0x4e4aa9[_0x58b596]):0x0;break;case _0xb039c4(0x32f):_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8[_0xb039c4(0x1f3)](_0x2677d2=>Number(_0x2677d2));break;case _0xb039c4(0x259):_0xcd7915=_0x4e4aa9[_0x58b596]!==''?eval(_0x4e4aa9[_0x58b596]):null;break;case'ARRAYEVAL':_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8['map'](_0x4a2b61=>eval(_0x4a2b61));break;case _0xb039c4(0x1dc):_0xcd7915=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):'';break;case _0xb039c4(0x408):_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8[_0xb039c4(0x1f3)](_0x52ef4a=>JSON[_0xb039c4(0x19e)](_0x52ef4a));break;case _0xb039c4(0x419):_0xcd7915=_0x4e4aa9[_0x58b596]!==''?new Function(JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596])):new Function('return\x200');break;case _0xb039c4(0x302):_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON['parse'](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8['map'](_0x409692=>new Function(JSON[_0xb039c4(0x19e)](_0x409692)));break;case _0xb039c4(0x21f):_0xcd7915=_0x4e4aa9[_0x58b596]!==''?String(_0x4e4aa9[_0x58b596]):'';break;case _0xb039c4(0x240):_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8[_0xb039c4(0x1f3)](_0x383342=>String(_0x383342));break;case _0xb039c4(0x3c1):_0x1e22cb=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):{},_0x3ea3a7[_0x4c6297]={},VisuMZ[_0xb039c4(0x3a9)](_0x3ea3a7[_0x4c6297],_0x1e22cb);continue;case _0xb039c4(0x1b2):_0x7765c8=_0x4e4aa9[_0x58b596]!==''?JSON[_0xb039c4(0x19e)](_0x4e4aa9[_0x58b596]):[],_0xcd7915=_0x7765c8[_0xb039c4(0x1f3)](_0x48d7f0=>VisuMZ['ConvertParams']({},JSON[_0xb039c4(0x19e)](_0x48d7f0)));break;default:continue;}_0x3ea3a7[_0x4c6297]=_0xcd7915;}}}return _0x3ea3a7;},(_0x2c91c9=>{const _0x22a4fc=_0x5fa1a5,_0x362f56=_0x2c91c9[_0x22a4fc(0x3c7)];for(const _0x2a481c of dependencies){if(!Imported[_0x2a481c]){alert(_0x22a4fc(0x398)['format'](_0x362f56,_0x2a481c)),SceneManager['exit']();break;}}const _0x118176=_0x2c91c9[_0x22a4fc(0x294)];if(_0x118176[_0x22a4fc(0x2ee)](/\[Version[ ](.*?)\]/i)){const _0x16fd0f=Number(RegExp['$1']);_0x16fd0f!==VisuMZ[label][_0x22a4fc(0x1c2)]&&(alert(_0x22a4fc(0x40d)['format'](_0x362f56,_0x16fd0f)),SceneManager[_0x22a4fc(0x39f)]());}if(_0x118176[_0x22a4fc(0x2ee)](/\[Tier[ ](\d+)\]/i)){const _0x295cf4=Number(RegExp['$1']);if(_0x295cf4<tier){if('QpIiy'!=='QpIiy'){_0x57fd03[_0x22a4fc(0x203)][_0x22a4fc(0x350)][_0x22a4fc(0x1f8)](this,_0x163cce);const _0x31447f=_0x6de28b[_0x22a4fc(0x203)]['Settings'][_0x22a4fc(0x3ed)];_0x5810aa[_0x22a4fc(0x203)][_0x22a4fc(0x3d4)](_0xba6fab,_0x31447f['Items']);}else alert(_0x22a4fc(0x325)[_0x22a4fc(0x3ce)](_0x362f56,_0x295cf4,tier)),SceneManager[_0x22a4fc(0x39f)]();}else _0x22a4fc(0x2a1)==='cUvCP'?(_0x487aa[_0x22a4fc(0x203)][_0x22a4fc(0x3cc)]['call'](this),this['updatePictureText']()):tier=Math[_0x22a4fc(0x413)](_0x295cf4,tier);}VisuMZ[_0x22a4fc(0x3a9)](VisuMZ[label]['Settings'],_0x2c91c9[_0x22a4fc(0x3eb)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5fa1a5(0x3c7)],'ChoiceWindowProperties',_0x2691a0=>{const _0x447c3b=_0x5fa1a5;VisuMZ[_0x447c3b(0x3a9)](_0x2691a0,_0x2691a0);const _0x5912ba=_0x2691a0['LineHeight']||$gameSystem[_0x447c3b(0x228)]()||0x1,_0x19ac40=_0x2691a0[_0x447c3b(0x19a)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x6cbd8c=_0x2691a0[_0x447c3b(0x263)]||$gameSystem[_0x447c3b(0x2ff)]()||0x1,_0x3dd16e=_0x2691a0['TextAlign'][_0x447c3b(0x16d)]()||_0x447c3b(0x3ad);$gameSystem['setChoiceListLineHeight'](_0x5912ba),$gameSystem[_0x447c3b(0x179)](_0x19ac40),$gameSystem['setChoiceListMaxColumns'](_0x6cbd8c),$gameSystem[_0x447c3b(0x305)](_0x3dd16e);}),PluginManager[_0x5fa1a5(0x2c3)](pluginData[_0x5fa1a5(0x3c7)],_0x5fa1a5(0x359),_0x5e71b9=>{const _0x278ef3=_0x5fa1a5;VisuMZ[_0x278ef3(0x3a9)](_0x5e71b9,_0x5e71b9);const _0x51ad84=_0x5e71b9[_0x278ef3(0x1e8)]||$gameSystem[_0x278ef3(0x38b)]()||0x1,_0x9449f8=_0x5e71b9['Width']||$gameSystem[_0x278ef3(0x230)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0xa0f68e=_0x5e71b9[_0x278ef3(0x3b7)][_0x278ef3(0x16d)]();$gameSystem['setMessageWindowRows'](_0x51ad84),$gameSystem[_0x278ef3(0x367)](_0x9449f8);['true',_0x278ef3(0x319)][_0x278ef3(0x404)](_0xa0f68e)&&$gameSystem[_0x278ef3(0x2cc)](eval(_0xa0f68e));const _0x51391a=SceneManager[_0x278ef3(0x3df)][_0x278ef3(0x33e)];_0x51391a&&(_0x51391a[_0x278ef3(0x1f2)](),_0x51391a[_0x278ef3(0x35f)](),_0x51391a['createContents']());}),PluginManager[_0x5fa1a5(0x2c3)](pluginData['name'],_0x5fa1a5(0x2dc),_0x40cebe=>{const _0x1e8536=_0x5fa1a5;VisuMZ[_0x1e8536(0x3a9)](_0x40cebe,_0x40cebe),$gameSystem[_0x1e8536(0x1ec)](_0x40cebe['OffsetX'],_0x40cebe[_0x1e8536(0x2a3)]);const _0x5d6a82=SceneManager['_scene'][_0x1e8536(0x33e)];_0x5d6a82&&(_0x5d6a82['resetWordWrap'](),_0x5d6a82[_0x1e8536(0x35f)](),_0x5d6a82[_0x1e8536(0x1f0)]());}),PluginManager[_0x5fa1a5(0x2c3)](pluginData[_0x5fa1a5(0x3c7)],_0x5fa1a5(0x292),_0x40ae8d=>{const _0xd17387=_0x5fa1a5;VisuMZ[_0xd17387(0x3a9)](_0x40ae8d,_0x40ae8d);const _0x30dfe1=_0x40ae8d['PictureIDs']||[],_0x143813=_0x40ae8d[_0xd17387(0x3a2)]||0x0,_0x47a5ac=[_0xd17387(0x18e),'up',_0xd17387(0x201),'left',_0xd17387(0x40b),'right',_0xd17387(0x3e4),_0xd17387(0x19c),_0xd17387(0x28d)];for(const _0x4ddf70 of _0x30dfe1){if(_0xd17387(0x2fd)===_0xd17387(0x2fd)){$gameScreen['setPictureTextBuffer'](_0x4ddf70,_0x143813);for(const _0x37c061 of _0x47a5ac){if(_0x40ae8d[_0x37c061]===undefined)continue;$gameScreen[_0xd17387(0x37e)](_0x4ddf70,_0x40ae8d[_0x37c061],_0x37c061);}}else this[_0xd17387(0x2f9)]=![],this[_0xd17387(0x19f)]=_0x4161a7,_0x2889eb['initMessageCore'](),this[_0xd17387(0x2bd)](),this[_0xd17387(0x17a)]=0x0;}}),PluginManager[_0x5fa1a5(0x2c3)](pluginData[_0x5fa1a5(0x3c7)],_0x5fa1a5(0x1c1),_0x4fdb5f=>{const _0x124f84=_0x5fa1a5;VisuMZ[_0x124f84(0x3a9)](_0x4fdb5f,_0x4fdb5f);const _0x33539a=_0x4fdb5f[_0x124f84(0x16c)]||[];for(const _0xb971ba of _0x33539a){$gameScreen[_0x124f84(0x235)](_0xb971ba),$gameScreen['erasePictureTextBuffer'](_0xb971ba);}}),VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2f1)]=Scene_Boot[_0x5fa1a5(0x26f)][_0x5fa1a5(0x164)],Scene_Boot[_0x5fa1a5(0x26f)]['onDatabaseLoaded']=function(){const _0x497fc7=_0x5fa1a5;VisuMZ[_0x497fc7(0x203)][_0x497fc7(0x2f1)][_0x497fc7(0x1f8)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x497fc7(0x151)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x27c)]=function(_0x1bfd0c){const _0x588f2a=_0x5fa1a5,_0x3f0fee=VisuMZ[_0x588f2a(0x203)][_0x588f2a(0x2a9)][_0x1bfd0c];_0x3f0fee['sort']((_0x332c38,_0x58399d)=>{const _0x2415ad=_0x588f2a;if(!_0x332c38||!_0x58399d)return-0x1;return _0x58399d[_0x2415ad(0x287)][_0x2415ad(0x1d2)]-_0x332c38[_0x2415ad(0x287)][_0x2415ad(0x1d2)];});},Scene_Boot[_0x5fa1a5(0x26f)]['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x1f36a0=_0x5fa1a5;VisuMZ[_0x1f36a0(0x203)][_0x1f36a0(0x27c)](_0x1f36a0(0x3b9));for(const _0x53e25f of VisuMZ['MessageCore'][_0x1f36a0(0x2a9)][_0x1f36a0(0x3b9)]){if(_0x1f36a0(0x1b5)==='thTzG')return this['_wordWrap'];else{_0x53e25f['Match']=_0x53e25f[_0x1f36a0(0x287)]['toUpperCase'](),_0x53e25f[_0x1f36a0(0x1ca)]=new RegExp('\x1b'+_0x53e25f['Match'],'gi'),_0x53e25f[_0x1f36a0(0x1f1)]='\x1b'+_0x53e25f[_0x1f36a0(0x287)];if(_0x53e25f[_0x1f36a0(0x1e3)]==='')_0x53e25f['textCodeResult']+=_0x1f36a0(0x220);}}},Scene_Boot[_0x5fa1a5(0x26f)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x1ef220=_0x5fa1a5;VisuMZ[_0x1ef220(0x203)]['SortObjectByKeyLength']('TextCodeReplace');for(const _0x388161 of VisuMZ[_0x1ef220(0x203)][_0x1ef220(0x2a9)][_0x1ef220(0x16a)]){if('xguRe'===_0x1ef220(0x224))this['_list'][_0x2daae3][_0x1ef220(0x3eb)][0x1]=_0x5c1e43[_0x1ef220(0x3eb)][0x1];else{_0x388161[_0x1ef220(0x1ca)]=new RegExp('\x1b'+_0x388161[_0x1ef220(0x287)]+_0x388161[_0x1ef220(0x1e3)],'gi');if(_0x388161['TextStr']!==''&&_0x388161[_0x1ef220(0x1f5)]!==_0x1ef220(0x41e))_0x388161['textCodeResult']=new Function(_0x1ef220(0x343)+_0x388161[_0x1ef220(0x1f5)][_0x1ef220(0x204)](/\\/g,'\x1b')+'\x27');else{if(_0x1ef220(0x1e4)===_0x1ef220(0x1e4))_0x388161[_0x1ef220(0x1f1)]=_0x388161[_0x1ef220(0x303)];else return _0x1108b0[_0x1ef220(0x2ff)]();}}}},Scene_Boot[_0x5fa1a5(0x26f)][_0x5fa1a5(0x151)]=function(){const _0x599f0f=_0x5fa1a5;for(const _0x4f9036 of VisuMZ[_0x599f0f(0x203)]['Settings']['TextMacros']){_0x4f9036[_0x599f0f(0x1ca)]=new RegExp('\x5c['+_0x4f9036[_0x599f0f(0x287)]+'\x5c]','gi'),_0x4f9036['TextStr']!==''&&_0x4f9036[_0x599f0f(0x1f5)]!=='Undefined'?_0x4f9036[_0x599f0f(0x1f1)]=new Function(_0x599f0f(0x343)+_0x4f9036[_0x599f0f(0x1f5)][_0x599f0f(0x204)](/\\/g,'\x1b')+'\x27'):_0x4f9036[_0x599f0f(0x1f1)]=_0x4f9036[_0x599f0f(0x303)];}},Scene_Boot['prototype'][_0x5fa1a5(0x380)]=function(){const _0x4c1bee=_0x5fa1a5,_0x3b11fa=VisuMZ[_0x4c1bee(0x203)][_0x4c1bee(0x2a9)][_0x4c1bee(0x3ed)];!VisuMZ[_0x4c1bee(0x170)]&&(_0x4c1bee(0x2ad)!==_0x4c1bee(0x2ad)?_0x2c09aa[_0x4c1bee(0x1f1)]=_0x29f669['TextJS']:(VisuMZ['MessageCore']['AddAutoColor']($dataClasses,_0x3b11fa[_0x4c1bee(0x1b4)]),VisuMZ[_0x4c1bee(0x203)]['AddAutoColor']($dataSkills,_0x3b11fa['Skills']),VisuMZ['MessageCore']['AddAutoColor']($dataItems,_0x3b11fa[_0x4c1bee(0x349)]),VisuMZ[_0x4c1bee(0x203)]['AddAutoColor']($dataWeapons,_0x3b11fa['Weapons']),VisuMZ[_0x4c1bee(0x203)][_0x4c1bee(0x2a4)]($dataArmors,_0x3b11fa[_0x4c1bee(0x2ab)]),VisuMZ[_0x4c1bee(0x203)]['AddAutoColor']($dataEnemies,_0x3b11fa[_0x4c1bee(0x403)]),VisuMZ[_0x4c1bee(0x203)][_0x4c1bee(0x2a4)]($dataStates,_0x3b11fa[_0x4c1bee(0x313)]))),VisuMZ['MessageCore'][_0x4c1bee(0x321)]();},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x161)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x5fa1a5(0x19d),_0x5fa1a5(0x396),'</I>',_0x5fa1a5(0x193),_0x5fa1a5(0x31b),_0x5fa1a5(0x1d4),_0x5fa1a5(0x283),'<RIGHT>',_0x5fa1a5(0x20e),_0x5fa1a5(0x2a6),_0x5fa1a5(0x3da),_0x5fa1a5(0x15f),_0x5fa1a5(0x1ba),'<WORDWRAP>',_0x5fa1a5(0x356),'<BR>','<LINE\x20BREAK>',_0x5fa1a5(0x232),_0x5fa1a5(0x41b),_0x5fa1a5(0x2d4),_0x5fa1a5(0x355),_0x5fa1a5(0x2e6),_0x5fa1a5(0x2db),_0x5fa1a5(0x215),_0x5fa1a5(0x3ae),_0x5fa1a5(0x40c),'SWITCHES',_0x5fa1a5(0x381),'ANY'],VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2a4)]=function(_0x22c168,_0x53883e){const _0xc274f0=_0x5fa1a5;if(_0x53883e<=0x0)return;const _0x18a36c=_0x22c168;for(const _0x1ca805 of _0x18a36c){if(!_0x1ca805)continue;VisuMZ[_0xc274f0(0x203)][_0xc274f0(0x3d4)](_0x1ca805,_0x53883e);}},VisuMZ[_0x5fa1a5(0x203)]['CreateAutoColorRegExpLists']=function(){const _0x207bda=_0x5fa1a5;VisuMZ[_0x207bda(0x203)][_0x207bda(0x36c)]=[];for(let _0x10357f=0x1;_0x10357f<=0x1f;_0x10357f++){if(_0x207bda(0x2c2)!==_0x207bda(0x1a2)){const _0x3a9252=_0x207bda(0x364)[_0x207bda(0x3ce)](_0x10357f),_0x416fc4=VisuMZ[_0x207bda(0x203)]['Settings'][_0x207bda(0x3ed)][_0x3a9252];_0x416fc4[_0x207bda(0x315)]((_0x31dd85,_0x2f09be)=>{const _0x2096ff=_0x207bda;if(!_0x31dd85||!_0x2f09be)return-0x1;return _0x2f09be[_0x2096ff(0x1d2)]-_0x31dd85[_0x2096ff(0x1d2)];}),this[_0x207bda(0x20a)](_0x416fc4,_0x10357f);}else _0xa9027b[_0x207bda(0x1ca)]=new _0x2db334('\x5c['+_0x459b59[_0x207bda(0x287)]+'\x5c]','gi'),_0x46e773[_0x207bda(0x1f5)]!==''&&_0x4ded55[_0x207bda(0x1f5)]!==_0x207bda(0x41e)?_0x2d52d5[_0x207bda(0x1f1)]=new _0x50509b(_0x207bda(0x343)+_0x544527[_0x207bda(0x1f5)]['replace'](/\\/g,'\x1b')+'\x27'):_0x444f75['textCodeResult']=_0x31d028[_0x207bda(0x303)];}},VisuMZ[_0x5fa1a5(0x203)]['CreateAutoColorRegExpListEntries']=function(_0x188cf7,_0x476a03){const _0x3f5a12=_0x5fa1a5;for(const _0x31255f of _0x188cf7){if('fSnPu'===_0x3f5a12(0x2de)){if(_0x31255f[_0x3f5a12(0x1d2)]<=0x0)continue;if(/^\d+$/[_0x3f5a12(0x309)](_0x31255f))continue;let _0xd53e3f=VisuMZ[_0x3f5a12(0x203)]['ConvertTextAutoColorRegExpFriendly'](_0x31255f);if(_0x31255f['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x3f5a12(0x29f)!==_0x3f5a12(0x29f)){if(!_0x5a2518)return;this[_0x3f5a12(0x2e5)]=![],_0x4a917a[_0x3f5a12(0x392)]=this[_0x3f5a12(0x388)](_0x447054[_0x3f5a12(0x392)]),this[_0x3f5a12(0x2b3)]&&(_0x1db22f[_0x3f5a12(0x392)]=this[_0x3f5a12(0x406)](_0x30093f[_0x3f5a12(0x392)]),this[_0x3f5a12(0x2e5)]=!![]);}else var _0x4b538a=new RegExp(_0xd53e3f,'i');}else var _0x4b538a=new RegExp('\x5cb'+_0xd53e3f+'\x5cb','g');VisuMZ['MessageCore'][_0x3f5a12(0x36c)][_0x3f5a12(0x140)]([_0x4b538a,_0x3f5a12(0x30a)['format'](_0x476a03,_0x31255f)]);}else _0x228b43['MessageCore'][_0x3f5a12(0x1bc)][_0x3f5a12(0x1f8)](this),this[_0x3f5a12(0x317)]();}},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2fc)]=function(_0x172fe0){const _0x1b1c70=_0x5fa1a5;return _0x172fe0=_0x172fe0[_0x1b1c70(0x204)](/(\W)/gi,(_0x360684,_0x4e3132)=>_0x1b1c70(0x311)[_0x1b1c70(0x3ce)](_0x4e3132)),_0x172fe0;},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x40a)]=VisuMZ[_0x5fa1a5(0x40a)],VisuMZ[_0x5fa1a5(0x40a)]=function(_0x2e824e){const _0x5201f3=_0x5fa1a5;VisuMZ[_0x5201f3(0x203)]['ParseClassNotetags'][_0x5201f3(0x1f8)](this,_0x2e824e);const _0x5a26a5=VisuMZ['MessageCore'][_0x5201f3(0x2a9)][_0x5201f3(0x3ed)];VisuMZ[_0x5201f3(0x203)][_0x5201f3(0x3d4)](_0x2e824e,_0x5a26a5[_0x5201f3(0x1b4)]);},VisuMZ['MessageCore'][_0x5fa1a5(0x314)]=VisuMZ[_0x5fa1a5(0x314)],VisuMZ['ParseSkillNotetags']=function(_0x33d771){const _0x44cc6d=_0x5fa1a5;VisuMZ[_0x44cc6d(0x203)][_0x44cc6d(0x314)][_0x44cc6d(0x1f8)](this,_0x33d771);const _0x5e8900=VisuMZ[_0x44cc6d(0x203)][_0x44cc6d(0x2a9)]['AutoColor'];VisuMZ[_0x44cc6d(0x203)][_0x44cc6d(0x3d4)](_0x33d771,_0x5e8900[_0x44cc6d(0x31c)]);},0x7,VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x350)]=VisuMZ[_0x5fa1a5(0x350)],VisuMZ[_0x5fa1a5(0x350)]=function(_0x1f30a4){const _0x10e570=_0x5fa1a5;VisuMZ[_0x10e570(0x203)][_0x10e570(0x350)][_0x10e570(0x1f8)](this,_0x1f30a4);const _0x354882=VisuMZ[_0x10e570(0x203)][_0x10e570(0x2a9)][_0x10e570(0x3ed)];VisuMZ['MessageCore'][_0x10e570(0x3d4)](_0x1f30a4,_0x354882['Items']);},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x209)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x5fa1a5(0x209)]=function(_0x355843){const _0x20e476=_0x5fa1a5;VisuMZ['MessageCore']['ParseWeaponNotetags'][_0x20e476(0x1f8)](this,_0x355843);const _0xbed679=VisuMZ[_0x20e476(0x203)]['Settings'][_0x20e476(0x3ed)];VisuMZ[_0x20e476(0x203)]['CreateAutoColorFor'](_0x355843,_0xbed679[_0x20e476(0x157)]);},VisuMZ['MessageCore']['ParseArmorNotetags']=VisuMZ[_0x5fa1a5(0x2e2)],VisuMZ[_0x5fa1a5(0x2e2)]=function(_0x581049){const _0x583b13=_0x5fa1a5;VisuMZ[_0x583b13(0x203)][_0x583b13(0x2e2)][_0x583b13(0x1f8)](this,_0x581049);const _0x238112=VisuMZ['MessageCore'][_0x583b13(0x2a9)][_0x583b13(0x3ed)];VisuMZ[_0x583b13(0x203)][_0x583b13(0x3d4)](_0x581049,_0x238112['Armors']);},VisuMZ['MessageCore']['ParseEnemyNotetags']=VisuMZ[_0x5fa1a5(0x184)],VisuMZ['ParseEnemyNotetags']=function(_0x2b9282){const _0x480a2a=_0x5fa1a5;VisuMZ['MessageCore'][_0x480a2a(0x184)][_0x480a2a(0x1f8)](this,_0x2b9282);const _0x1b8055=VisuMZ[_0x480a2a(0x203)][_0x480a2a(0x2a9)]['AutoColor'];VisuMZ['MessageCore'][_0x480a2a(0x3d4)](_0x2b9282,_0x1b8055[_0x480a2a(0x403)]);},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x216)]=VisuMZ[_0x5fa1a5(0x216)],VisuMZ[_0x5fa1a5(0x216)]=function(_0x16e980){const _0xbef7e7=_0x5fa1a5;VisuMZ['MessageCore'][_0xbef7e7(0x216)][_0xbef7e7(0x1f8)](this,_0x16e980);const _0x5ca2b4=VisuMZ[_0xbef7e7(0x203)][_0xbef7e7(0x2a9)][_0xbef7e7(0x3ed)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x16e980,_0x5ca2b4[_0xbef7e7(0x313)]);},VisuMZ['MessageCore'][_0x5fa1a5(0x3d4)]=function(_0x2f1c4e,_0x1c5f87){const _0xd585e9=_0x5fa1a5;if(_0x1c5f87<=0x0)return;const _0x10bcca=VisuMZ[_0xd585e9(0x203)][_0xd585e9(0x2a9)][_0xd585e9(0x3ed)]['TextColor'+_0x1c5f87];let _0x597057=_0x2f1c4e['name'][_0xd585e9(0x3a4)]();if(/^\d+$/[_0xd585e9(0x309)](_0x597057))return;if(VisuMZ[_0xd585e9(0x203)][_0xd585e9(0x161)][_0xd585e9(0x404)](_0x597057[_0xd585e9(0x202)]()))return;_0x597057=_0x597057[_0xd585e9(0x204)](/\\I\[(\d+)\]/gi,''),_0x597057=_0x597057[_0xd585e9(0x204)](/\x1bI\[(\d+)\]/gi,'');if(_0x597057[_0xd585e9(0x1d2)]<=0x0)return;if(_0x597057['match'](/-----/i))return;_0x10bcca[_0xd585e9(0x140)](_0x597057);},SceneManager['isSceneBattle']=function(){const _0x41d8c6=_0x5fa1a5;return this[_0x41d8c6(0x3df)]&&this[_0x41d8c6(0x3df)][_0x41d8c6(0x41f)]===Scene_Battle;},SceneManager[_0x5fa1a5(0x246)]=function(){const _0x5d8996=_0x5fa1a5;return this[_0x5d8996(0x3df)]&&this['_scene']['constructor']===Scene_Map;},VisuMZ['MessageCore'][_0x5fa1a5(0x2b8)]=TextManager[_0x5fa1a5(0x149)],TextManager['message']=function(_0x1c8694){const _0x451601=_0x5fa1a5,_0x1d77bc=[_0x451601(0x1bb),_0x451601(0x366),_0x451601(0x3e6),_0x451601(0x3cf),_0x451601(0x301),_0x451601(0x3b6),'escapeStart',_0x451601(0x1ce),'obtainGold',_0x451601(0x3c0)];let _0x4d5b1d=VisuMZ[_0x451601(0x203)][_0x451601(0x2b8)][_0x451601(0x1f8)](this,_0x1c8694);return _0x1d77bc['includes'](_0x1c8694)&&(_0x4d5b1d=_0x451601(0x356)+_0x4d5b1d),_0x4d5b1d;},ConfigManager[_0x5fa1a5(0x200)]=VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2a9)][_0x5fa1a5(0x1c4)]['Default'],VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x358)]=ConfigManager[_0x5fa1a5(0x20c)],ConfigManager[_0x5fa1a5(0x20c)]=function(){const _0x5a74a0=_0x5fa1a5,_0x15d9ce=VisuMZ['MessageCore'][_0x5a74a0(0x358)][_0x5a74a0(0x1f8)](this);return _0x15d9ce[_0x5a74a0(0x200)]=this[_0x5a74a0(0x200)],_0x15d9ce;},VisuMZ[_0x5fa1a5(0x203)]['ConfigManager_applyData']=ConfigManager[_0x5fa1a5(0x3d2)],ConfigManager[_0x5fa1a5(0x3d2)]=function(_0x204a31){const _0x511fa7=_0x5fa1a5;VisuMZ['MessageCore'][_0x511fa7(0x237)][_0x511fa7(0x1f8)](this,_0x204a31),_0x511fa7(0x200)in _0x204a31?_0x511fa7(0x3fa)!==_0x511fa7(0x397)?this[_0x511fa7(0x200)]=Number(_0x204a31['textSpeed'])['clamp'](0x1,0xb):_0x130647[_0x511fa7(0x2ee)](_0x5d1070[_0x511fa7(0x1ca)])&&(_0x14cd98=_0x1ccae6[_0x511fa7(0x204)](_0x13d0a3[_0x511fa7(0x1ca)],_0x146d95[_0x511fa7(0x1f1)]),_0x38d312=this[_0x511fa7(0x405)](_0x12b91a)):this['textSpeed']=VisuMZ[_0x511fa7(0x203)][_0x511fa7(0x2a9)][_0x511fa7(0x1c4)][_0x511fa7(0x39e)];},TextManager[_0x5fa1a5(0x3f9)]=VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2a9)][_0x5fa1a5(0x1c4)][_0x5fa1a5(0x2ec)],TextManager[_0x5fa1a5(0x417)]=VisuMZ['MessageCore']['Settings'][_0x5fa1a5(0x1c4)][_0x5fa1a5(0x3c9)],VisuMZ['MessageCore']['Game_System_initialize']=Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)],Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)]=function(){const _0x28b9f9=_0x5fa1a5;VisuMZ[_0x28b9f9(0x203)]['Game_System_initialize'][_0x28b9f9(0x1f8)](this),this[_0x28b9f9(0x273)]();},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x273)]=function(){const _0x48a015=_0x5fa1a5,_0x25ff3d=VisuMZ[_0x48a015(0x203)][_0x48a015(0x2a9)][_0x48a015(0x169)],_0x5e0b78=VisuMZ[_0x48a015(0x203)][_0x48a015(0x2a9)][_0x48a015(0x3b7)];this[_0x48a015(0x14a)]={'messageRows':_0x25ff3d[_0x48a015(0x318)],'messageWidth':_0x25ff3d[_0x48a015(0x16f)],'messageWordWrap':_0x5e0b78[_0x48a015(0x27f)],'helpWordWrap':_0x5e0b78[_0x48a015(0x3e7)],'choiceLineHeight':_0x25ff3d[_0x48a015(0x31e)],'choiceRows':_0x25ff3d['ChoiceWindowMaxRows'],'choiceCols':_0x25ff3d[_0x48a015(0x372)],'choiceTextAlign':_0x25ff3d[_0x48a015(0x345)]};if(this['_messageOffsetX']===undefined){if(_0x48a015(0x144)!=='FCXUL'){if(_0x48ddc2<=0x0)return;const _0x1d25f5=_0x5950ff[_0x48a015(0x203)]['Settings'][_0x48a015(0x3ed)][_0x48a015(0x373)+_0x3ae6e3];let _0x210bf1=_0x3c1412['name'][_0x48a015(0x3a4)]();if(/^\d+$/[_0x48a015(0x309)](_0x210bf1))return;if(_0x5015f6[_0x48a015(0x203)][_0x48a015(0x161)][_0x48a015(0x404)](_0x210bf1[_0x48a015(0x202)]()))return;_0x210bf1=_0x210bf1['replace'](/\\I\[(\d+)\]/gi,''),_0x210bf1=_0x210bf1[_0x48a015(0x204)](/\x1bI\[(\d+)\]/gi,'');if(_0x210bf1[_0x48a015(0x1d2)]<=0x0)return;if(_0x210bf1[_0x48a015(0x2ee)](/-----/i))return;_0x1d25f5['push'](_0x210bf1);}else this[_0x48a015(0x1a8)]=_0x25ff3d[_0x48a015(0x377)],this[_0x48a015(0x1e0)]=_0x25ff3d[_0x48a015(0x158)];}},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x38b)]=function(){const _0x364f15=_0x5fa1a5;if(this[_0x364f15(0x14a)]===undefined)this[_0x364f15(0x273)]();if(this[_0x364f15(0x14a)][_0x364f15(0x2f4)]===undefined)this[_0x364f15(0x273)]();return this[_0x364f15(0x14a)][_0x364f15(0x2f4)];},Game_System[_0x5fa1a5(0x26f)]['setMessageWindowRows']=function(_0x25f60e){const _0x5aa7a7=_0x5fa1a5;if(this[_0x5aa7a7(0x14a)]===undefined)this['initMessageCore']();if(this[_0x5aa7a7(0x14a)][_0x5aa7a7(0x2f4)]===undefined)this[_0x5aa7a7(0x273)]();this[_0x5aa7a7(0x14a)][_0x5aa7a7(0x2f4)]=_0x25f60e||0x1;},Game_System['prototype'][_0x5fa1a5(0x230)]=function(){const _0x134475=_0x5fa1a5;if(this[_0x134475(0x14a)]===undefined)this[_0x134475(0x273)]();if(this[_0x134475(0x14a)][_0x134475(0x38f)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x134475(0x38f)];},Game_System['prototype']['setMessageWindowWidth']=function(_0x12b686){const _0x45ce68=_0x5fa1a5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x45ce68(0x14a)][_0x45ce68(0x38f)]===undefined)this['initMessageCore']();_0x12b686=Math[_0x45ce68(0x3e9)](_0x12b686);if(_0x12b686%0x2!==0x0)_0x12b686+=0x1;this[_0x45ce68(0x14a)][_0x45ce68(0x38f)]=_0x12b686||0x2;},Game_System['prototype'][_0x5fa1a5(0x2e3)]=function(){const _0x1fd78d=_0x5fa1a5;if(this[_0x1fd78d(0x14a)]===undefined)this['initMessageCore']();if(this[_0x1fd78d(0x14a)][_0x1fd78d(0x167)]===undefined)this[_0x1fd78d(0x273)]();return this[_0x1fd78d(0x14a)][_0x1fd78d(0x167)];},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2cc)]=function(_0x4828ee){const _0x5ba4a2=_0x5fa1a5;if(this[_0x5ba4a2(0x14a)]===undefined)this[_0x5ba4a2(0x273)]();if(this[_0x5ba4a2(0x14a)][_0x5ba4a2(0x167)]===undefined)this[_0x5ba4a2(0x273)]();this['_MessageCoreSettings'][_0x5ba4a2(0x167)]=_0x4828ee;},Game_System[_0x5fa1a5(0x26f)]['getMessageWindowXyOffsets']=function(){const _0x3190e8=_0x5fa1a5;if(this[_0x3190e8(0x1a8)]===undefined){if(_0x3190e8(0x24c)!==_0x3190e8(0x24c)){_0x500eb6[_0x3190e8(0x203)][_0x3190e8(0x27c)](_0x3190e8(0x3b9));for(const _0x525885 of _0x37badf[_0x3190e8(0x203)][_0x3190e8(0x2a9)]['TextCodeActions']){_0x525885[_0x3190e8(0x287)]=_0x525885[_0x3190e8(0x287)][_0x3190e8(0x202)](),_0x525885[_0x3190e8(0x1ca)]=new _0x458673('\x1b'+_0x525885['Match'],'gi'),_0x525885[_0x3190e8(0x1f1)]='\x1b'+_0x525885['Match'];if(_0x525885['Type']==='')_0x525885[_0x3190e8(0x1f1)]+=_0x3190e8(0x220);}}else{const _0x2b01c9=VisuMZ[_0x3190e8(0x203)][_0x3190e8(0x2a9)][_0x3190e8(0x169)];this[_0x3190e8(0x1a8)]=_0x2b01c9[_0x3190e8(0x377)],this[_0x3190e8(0x1e0)]=_0x2b01c9['MsgWindowOffsetY'];}}return{'x':this[_0x3190e8(0x1a8)]||0x0,'y':this[_0x3190e8(0x1e0)]||0x0};},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1ec)]=function(_0x10af0f,_0x1e12df){if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();this['_messageOffsetX']=_0x10af0f,this['_messageOffsetY']=_0x1e12df;},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1a9)]=function(){const _0xb86326=_0x5fa1a5;if(this[_0xb86326(0x14a)]===undefined)this[_0xb86326(0x273)]();if(this[_0xb86326(0x14a)][_0xb86326(0x1fb)]===undefined)this[_0xb86326(0x273)]();return this[_0xb86326(0x14a)][_0xb86326(0x1fb)];},Game_System['prototype'][_0x5fa1a5(0x21e)]=function(_0x4f9585){const _0x1f3eba=_0x5fa1a5;if(this['_MessageCoreSettings']===undefined)this[_0x1f3eba(0x273)]();if(this['_MessageCoreSettings'][_0x1f3eba(0x1fb)]===undefined)this[_0x1f3eba(0x273)]();this[_0x1f3eba(0x14a)][_0x1f3eba(0x1fb)]=_0x4f9585;},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x228)]=function(){const _0x1fbb01=_0x5fa1a5;if(this[_0x1fbb01(0x14a)]===undefined)this['initMessageCore']();if(this[_0x1fbb01(0x14a)][_0x1fbb01(0x1bf)]===undefined)this[_0x1fbb01(0x273)]();return this[_0x1fbb01(0x14a)][_0x1fbb01(0x1bf)];},Game_System['prototype']['setChoiceListLineHeight']=function(_0x2233da){const _0x321400=_0x5fa1a5;if(this[_0x321400(0x14a)]===undefined)this[_0x321400(0x273)]();if(this[_0x321400(0x14a)]['choiceLineHeight']===undefined)this[_0x321400(0x273)]();this[_0x321400(0x14a)]['choiceLineHeight']=_0x2233da||0x1;},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3d9)]=function(){const _0x37c3c9=_0x5fa1a5;if(this[_0x37c3c9(0x14a)]===undefined)this[_0x37c3c9(0x273)]();if(this['_MessageCoreSettings'][_0x37c3c9(0x222)]===undefined)this[_0x37c3c9(0x273)]();return this['_MessageCoreSettings'][_0x37c3c9(0x222)];},Game_System['prototype'][_0x5fa1a5(0x179)]=function(_0x192320){const _0x10e140=_0x5fa1a5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x10e140(0x14a)][_0x10e140(0x222)]===undefined)this[_0x10e140(0x273)]();this[_0x10e140(0x14a)][_0x10e140(0x222)]=_0x192320||0x1;},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2ff)]=function(){const _0x24584d=_0x5fa1a5;if(this[_0x24584d(0x14a)]===undefined)this['initMessageCore']();if(this[_0x24584d(0x14a)][_0x24584d(0x3c6)]===undefined)this[_0x24584d(0x273)]();return this['_MessageCoreSettings'][_0x24584d(0x3c6)];},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2a2)]=function(_0xe0d510){const _0x321a4a=_0x5fa1a5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x321a4a(0x3c6)]===undefined)this[_0x321a4a(0x273)]();this[_0x321a4a(0x14a)][_0x321a4a(0x3c6)]=_0xe0d510||0x1;},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x399)]=function(){const _0x4effd4=_0x5fa1a5;if(this[_0x4effd4(0x14a)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x4effd4(0x165)]===undefined)this[_0x4effd4(0x273)]();return this['_MessageCoreSettings'][_0x4effd4(0x165)];},Game_System[_0x5fa1a5(0x26f)][_0x5fa1a5(0x305)]=function(_0x1e7499){const _0x24ad29=_0x5fa1a5;if(this['_MessageCoreSettings']===undefined)this[_0x24ad29(0x273)]();if(this['_MessageCoreSettings'][_0x24ad29(0x165)]===undefined)this[_0x24ad29(0x273)]();this['_MessageCoreSettings']['choiceTextAlign']=_0x1e7499[_0x24ad29(0x16d)]();},VisuMZ[_0x5fa1a5(0x203)]['Game_Screen_clearPictures']=Game_Screen[_0x5fa1a5(0x26f)][_0x5fa1a5(0x270)],Game_Screen[_0x5fa1a5(0x26f)][_0x5fa1a5(0x270)]=function(){const _0x9181ae=_0x5fa1a5;VisuMZ[_0x9181ae(0x203)]['Game_Screen_clearPictures']['call'](this),this[_0x9181ae(0x22b)]();},Game_Screen[_0x5fa1a5(0x26f)][_0x5fa1a5(0x22b)]=function(){const _0x2b8121=_0x5fa1a5;this['_pictureText']=[],this[_0x2b8121(0x1d6)]=[];},Game_Screen[_0x5fa1a5(0x26f)][_0x5fa1a5(0x218)]=function(_0x112b2b){const _0x299ad1=_0x5fa1a5;if(this[_0x299ad1(0x34f)]===undefined)this[_0x299ad1(0x22b)]();const _0x1fa997=this[_0x299ad1(0x22d)](_0x112b2b);return this[_0x299ad1(0x34f)][_0x1fa997]=this['_pictureText'][_0x1fa997]||{},this[_0x299ad1(0x34f)][_0x1fa997];},Game_Screen['prototype']['getPictureText']=function(_0x1203cd,_0x2a371b){const _0x36d5ed=_0x5fa1a5;return _0x2a371b=_0x2a371b[_0x36d5ed(0x16d)]()[_0x36d5ed(0x3a4)](),this[_0x36d5ed(0x218)](_0x1203cd)[_0x2a371b]||'';},Game_Screen['prototype'][_0x5fa1a5(0x37e)]=function(_0x15bb46,_0x253de6,_0x7b5224){const _0x467e0b=_0x5fa1a5;_0x7b5224=_0x7b5224[_0x467e0b(0x16d)]()[_0x467e0b(0x3a4)](),this[_0x467e0b(0x218)](_0x15bb46)[_0x7b5224]=_0x253de6||'';},Game_Screen[_0x5fa1a5(0x26f)]['eraseAllPictureTexts']=function(_0x121b89){const _0x5956e4=_0x5fa1a5;if(this[_0x5956e4(0x34f)]===undefined)this[_0x5956e4(0x22b)]();const _0x4a250a=this[_0x5956e4(0x22d)](_0x121b89);this[_0x5956e4(0x34f)][_0x4a250a]=null;},Game_Screen['prototype']['getPictureTextBuffer']=function(_0x1967d4){const _0xbab362=_0x5fa1a5;if(this[_0xbab362(0x34f)]===undefined)this[_0xbab362(0x22b)]();const _0x4f18b8=this[_0xbab362(0x22d)](_0x1967d4);return this['_pictureTextBuffer'][_0x4f18b8]||0x0;},Game_Screen[_0x5fa1a5(0x26f)]['setPictureTextBuffer']=function(_0xbf6686,_0x913218){const _0x38469a=_0x5fa1a5;if(this[_0x38469a(0x34f)]===undefined)this[_0x38469a(0x22b)]();const _0xd7f8d6=this[_0x38469a(0x22d)](_0xbf6686);this[_0x38469a(0x1d6)][_0xd7f8d6]=Math['max'](0x0,_0x913218);},Game_Screen[_0x5fa1a5(0x26f)][_0x5fa1a5(0x382)]=function(_0x5bbd30){const _0x3cbc89=_0x5fa1a5;if(this[_0x3cbc89(0x34f)]===undefined)this[_0x3cbc89(0x22b)]();const _0x176ff5=this[_0x3cbc89(0x22d)](_0x5bbd30);this[_0x3cbc89(0x1d6)][_0x176ff5]=undefined;},VisuMZ[_0x5fa1a5(0x203)]['Game_Screen_erasePicture']=Game_Screen['prototype'][_0x5fa1a5(0x35c)],Game_Screen[_0x5fa1a5(0x26f)]['erasePicture']=function(_0x45465c){const _0x49860b=_0x5fa1a5;VisuMZ[_0x49860b(0x203)][_0x49860b(0x18a)]['call'](this,_0x45465c),this[_0x49860b(0x235)](_0x45465c),this['erasePictureTextBuffer'](_0x45465c);},VisuMZ[_0x5fa1a5(0x203)]['Game_Party_initialize']=Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)],Game_Party['prototype'][_0x5fa1a5(0x304)]=function(){const _0x2f6c12=_0x5fa1a5;VisuMZ['MessageCore']['Game_Party_initialize']['call'](this),this[_0x2f6c12(0x273)]();},Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x273)]=function(){const _0x3d1eff=_0x5fa1a5;this[_0x3d1eff(0x1af)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x286)]=function(){if(this['_lastGainedItemData']===undefined)this['initMessageCore']();return this['_lastGainedItemData'];},Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3c5)]=function(_0x1e019b,_0x57ea8e){const _0x2aac43=_0x5fa1a5;if(this['_lastGainedItemData']===undefined)this[_0x2aac43(0x273)]();if(!_0x1e019b)return;if(DataManager[_0x2aac43(0x191)](_0x1e019b))_0x2aac43(0x402)!==_0x2aac43(0x187)?this[_0x2aac43(0x1af)][_0x2aac43(0x2d8)]=0x0:this[_0x2aac43(0x217)][_0x2aac43(0x3c2)]();else{if(DataManager[_0x2aac43(0x176)](_0x1e019b)){if('osITN'!==_0x2aac43(0x257))this['_lastGainedItemData'][_0x2aac43(0x2d8)]=0x1;else{const _0x304eb2=[_0x2aac43(0x362),_0x2aac43(0x212),_0x2aac43(0x13f),_0x2aac43(0x17d),_0x2aac43(0x320),'outLineColor',_0x2aac43(0x18d),'paintOpacity'];let _0x1d24e3={};for(const _0x50ef8d of _0x304eb2){_0x1d24e3[_0x50ef8d]=this[_0x2aac43(0x247)][_0x50ef8d];}return _0x1d24e3;}}else{if(DataManager['isArmor'](_0x1e019b)){if(_0x2aac43(0x2b6)===_0x2aac43(0x34c))return this[_0x2aac43(0x31d)](_0x5d4dd1,!![],!![]),this[_0x2aac43(0x210)](_0x2aac43(0x23d)),'';else this[_0x2aac43(0x1af)][_0x2aac43(0x2d8)]=0x2;}}}this[_0x2aac43(0x1af)]['id']=_0x1e019b['id'],this[_0x2aac43(0x1af)][_0x2aac43(0x385)]=_0x57ea8e;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x32e)],Game_Party[_0x5fa1a5(0x26f)][_0x5fa1a5(0x32e)]=function(_0x9c6c7e,_0x54e2db,_0x2bc6e4){const _0x3c2cca=_0x5fa1a5;VisuMZ[_0x3c2cca(0x203)][_0x3c2cca(0x2c9)]['call'](this,_0x9c6c7e,_0x54e2db,_0x2bc6e4),_0x54e2db>0x0&&(_0x3c2cca(0x3b2)===_0x3c2cca(0x188)?(this[_0x3c2cca(0x248)](_0x1b0ed0,_0x52a1b9,_0xdc478a),this['adjustShowChoiceCancel'](_0x51500f,_0x40eb48,_0x3a812f),this['addExtraShowChoices'](_0x5df600,_0x1c1e67)):this[_0x3c2cca(0x3c5)](_0x9c6c7e,_0x54e2db));},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x3b5)]=Game_Map[_0x5fa1a5(0x26f)]['initialize'],Game_Map[_0x5fa1a5(0x26f)]['initialize']=function(){const _0x229d41=_0x5fa1a5;VisuMZ[_0x229d41(0x203)]['Game_Map_initialize'][_0x229d41(0x1f8)](this),this[_0x229d41(0x2eb)]=[];},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x347)]=Game_Map[_0x5fa1a5(0x26f)][_0x5fa1a5(0x354)],Game_Map[_0x5fa1a5(0x26f)][_0x5fa1a5(0x354)]=function(){const _0x3fd0a0=_0x5fa1a5;VisuMZ[_0x3fd0a0(0x203)][_0x3fd0a0(0x347)][_0x3fd0a0(0x1f8)](this),this[_0x3fd0a0(0x2eb)]=[];},VisuMZ['MessageCore'][_0x5fa1a5(0x22e)]=Game_Map[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1cc)],Game_Map['prototype']['updateEvents']=function(){const _0x32bfa0=_0x5fa1a5;VisuMZ['MessageCore'][_0x32bfa0(0x22e)][_0x32bfa0(0x1f8)](this),this[_0x32bfa0(0x3e1)]();},Game_Map[_0x5fa1a5(0x26f)][_0x5fa1a5(0x14d)]=function(_0x103e81){const _0x162a19=_0x5fa1a5;if(!$dataCommonEvents[_0x103e81])return;this[_0x162a19(0x2eb)]=this[_0x162a19(0x2eb)]||[];const _0x41a89=this[_0x162a19(0x217)][_0x162a19(0x168)],_0x151669=new Game_MessageCommonEvent(_0x103e81,_0x41a89);this['_messageCommonEvents']['push'](_0x151669);},Game_Map['prototype'][_0x5fa1a5(0x3e1)]=function(){const _0x4e72f4=_0x5fa1a5;this['_messageCommonEvents']=this['_messageCommonEvents']||[];for(const _0x17daae of this[_0x4e72f4(0x2eb)]){if(!_0x17daae['_interpreter']){if('tOohb'===_0x4e72f4(0x371))return _0x1bc042[_0x4e72f4(0x3ac)]&&_0x601e7d[_0x4e72f4(0x294)]['includes']('['+_0x13d219+']');else this[_0x4e72f4(0x2eb)]['remove'](_0x17daae);}else _0x17daae[_0x4e72f4(0x3c2)]();}},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1db)]=function(_0x857088){const _0x3fbd99=_0x5fa1a5;if($gameMessage[_0x3fbd99(0x208)]())return![];return this[_0x3fbd99(0x3ea)](_0x857088),this['addContinuousShowTextCommands'](_0x857088),this[_0x3fbd99(0x1e5)](_0x857088),this[_0x3fbd99(0x32a)](_0x3fbd99(0x149)),!![];},Game_Interpreter['prototype'][_0x5fa1a5(0x3ea)]=function(_0x3c1900){const _0x3b6556=_0x5fa1a5;$gameMessage[_0x3b6556(0x3d1)](_0x3c1900[0x0],_0x3c1900[0x1]),$gameMessage[_0x3b6556(0x185)](_0x3c1900[0x2]),$gameMessage[_0x3b6556(0x389)](_0x3c1900[0x3]),$gameMessage['setSpeakerName'](_0x3c1900[0x4]);},Game_Interpreter[_0x5fa1a5(0x26f)]['addContinuousShowTextCommands']=function(_0xf9b154){const _0x451030=_0x5fa1a5;while(this[_0x451030(0x2e4)]()){this[_0x451030(0x172)]++;if(this['currentCommand']()[_0x451030(0x21b)]===0x191){let _0x418d2c=this[_0x451030(0x1e2)]()[_0x451030(0x3eb)][0x0];_0x418d2c=VisuMZ[_0x451030(0x203)][_0x451030(0x289)](_0x418d2c),$gameMessage[_0x451030(0x2b7)](_0x418d2c);}if(this[_0x451030(0x33a)]()){if(_0x451030(0x3aa)!==_0x451030(0x3aa))_0xfede6[_0x451030(0x1f1)]=new _0x2e68b8('return\x20\x27'+_0x27d294[_0x451030(0x1f5)][_0x451030(0x204)](/\\/g,'\x1b')+'\x27');else break;}}},Game_Interpreter['prototype']['isContinuePrepareShowTextCommands']=function(){const _0x337694=_0x5fa1a5;if(this['nextEventCode']()===0x65&&$gameSystem['getMessageWindowRows']()>0x4){if('OKyQh'===_0x337694(0x329))this['_autoPositionTarget']=_0x57ae8e;else return!![];}else return this[_0x337694(0x39d)]()===0x191;},VisuMZ['MessageCore'][_0x5fa1a5(0x289)]=function(_0x3e61ad){const _0x11fa56=_0x5fa1a5;return _0x3e61ad=_0x3e61ad[_0x11fa56(0x204)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x3e61ad;},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x33a)]=function(){const _0x491cc6=_0x5fa1a5;if(this[_0x491cc6(0x1e2)]()&&this[_0x491cc6(0x1e2)]()[_0x491cc6(0x3eb)][0x0][_0x491cc6(0x2ee)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x491cc6(0x3f2)][_0x491cc6(0x1d2)]>=$gameSystem['getMessageWindowRows']()&&this[_0x491cc6(0x39d)]()!==0x191;},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1e5)]=function(_0x3b56d1){const _0x227177=_0x5fa1a5;switch(this[_0x227177(0x39d)]()){case 0x66:this[_0x227177(0x172)]++,this[_0x227177(0x297)](this[_0x227177(0x1e2)]()[_0x227177(0x3eb)]);break;case 0x67:this[_0x227177(0x172)]++,this['setupNumInput'](this[_0x227177(0x1e2)]()[_0x227177(0x3eb)]);break;case 0x68:this['_index']++,this[_0x227177(0x24e)](this[_0x227177(0x1e2)]()['parameters']);break;}},VisuMZ['MessageCore'][_0x5fa1a5(0x2c6)]=Game_Interpreter['prototype']['setupChoices'],Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x297)]=function(_0x545b2c){const _0x5848ce=_0x5fa1a5;_0x545b2c=this['addContinuousShowChoices'](),VisuMZ['MessageCore'][_0x5848ce(0x2c6)]['call'](this,_0x545b2c);},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x418)]=function(){const _0x20b1ef=_0x5fa1a5,_0x3d5eac=this[_0x20b1ef(0x172)],_0x14950d=[];let _0x3c7ce8=0x0;this[_0x20b1ef(0x172)]++;while(this['_index']<this[_0x20b1ef(0x324)][_0x20b1ef(0x1d2)]){if(this['currentCommand']()[_0x20b1ef(0x26c)]===this[_0x20b1ef(0x26b)]){if('KeWZG'===_0x20b1ef(0x1ab)){if(this[_0x20b1ef(0x1e2)]()['code']===0x194&&this[_0x20b1ef(0x39d)]()!==0x66){if('LsviO'!=='LsviO')var _0x4e1ed5=new _0x543246('\x5cb'+_0x41cb0e+'\x5cb','g');else break;}else{if(this[_0x20b1ef(0x1e2)]()['code']===0x66)this['adjustShowChoiceExtension'](_0x3c7ce8,this[_0x20b1ef(0x1e2)](),_0x3d5eac),this['_index']-=0x2;else this[_0x20b1ef(0x1e2)]()['code']===0x192&&(this[_0x20b1ef(0x1e2)]()['parameters'][0x0]=_0x3c7ce8,_0x3c7ce8++);}}else this[_0x20b1ef(0x2df)](_0x2dc045,0x1);}this[_0x20b1ef(0x172)]++;}return this[_0x20b1ef(0x172)]=_0x3d5eac,this['currentCommand']()[_0x20b1ef(0x3eb)];},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x393)]=function(_0x18c94a,_0x38a195,_0x5a8fbd){const _0x391817=_0x5fa1a5;this[_0x391817(0x248)](_0x18c94a,_0x38a195,_0x5a8fbd),this[_0x391817(0x3b8)](_0x18c94a,_0x38a195,_0x5a8fbd),this[_0x391817(0x274)](_0x38a195,_0x5a8fbd);},Game_Interpreter['prototype'][_0x5fa1a5(0x248)]=function(_0x56ff86,_0x40610b,_0x1a6d28){const _0x980dd4=_0x5fa1a5;if(_0x40610b[_0x980dd4(0x3eb)][0x2]<0x0)return;const _0x32d4e3=_0x40610b[_0x980dd4(0x3eb)][0x2]+_0x56ff86;this[_0x980dd4(0x324)][_0x1a6d28]['parameters'][0x2]=_0x32d4e3;},Game_Interpreter['prototype'][_0x5fa1a5(0x3b8)]=function(_0x32f0fb,_0x20f9ab,_0x12b15b){const _0x259c10=_0x5fa1a5;if(_0x20f9ab[_0x259c10(0x3eb)][0x1]>=0x0){var _0x2a5d99=_0x20f9ab['parameters'][0x1]+_0x32f0fb;this[_0x259c10(0x324)][_0x12b15b][_0x259c10(0x3eb)][0x1]=_0x2a5d99;}else _0x20f9ab[_0x259c10(0x3eb)][0x1]===-0x2&&(this[_0x259c10(0x324)][_0x12b15b][_0x259c10(0x3eb)][0x1]=_0x20f9ab[_0x259c10(0x3eb)][0x1]);},Game_Interpreter[_0x5fa1a5(0x26f)][_0x5fa1a5(0x274)]=function(_0xcd5038,_0x34f545){const _0x26bdf9=_0x5fa1a5;for(const _0x2fa571 of _0xcd5038[_0x26bdf9(0x3eb)][0x0]){if(_0x26bdf9(0x30f)===_0x26bdf9(0x30f))this[_0x26bdf9(0x324)][_0x34f545][_0x26bdf9(0x3eb)][0x0][_0x26bdf9(0x140)](_0x2fa571);else{if(!_0x3375ae['value'](_0x408f71))return!![];}}this[_0x26bdf9(0x324)][_0x26bdf9(0x147)](this[_0x26bdf9(0x172)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x1ad4d7=_0x5fa1a5;this[_0x1ad4d7(0x304)](...arguments);}Game_MessageCommonEvent[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)]=function(_0x251009,_0x3b8f1f){const _0x454c55=_0x5fa1a5;this[_0x454c55(0x1a7)]=_0x251009,this[_0x454c55(0x168)]=_0x3b8f1f||0x0,this[_0x454c55(0x255)]();},Game_MessageCommonEvent[_0x5fa1a5(0x26f)][_0x5fa1a5(0x23f)]=function(){const _0xe4c91c=_0x5fa1a5;return $dataCommonEvents[this[_0xe4c91c(0x1a7)]];},Game_MessageCommonEvent[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2e0)]=function(){const _0x1c5afc=_0x5fa1a5;return this[_0x1c5afc(0x23f)]()[_0x1c5afc(0x2e0)];},Game_MessageCommonEvent[_0x5fa1a5(0x26f)][_0x5fa1a5(0x255)]=function(){const _0x3d09ad=_0x5fa1a5;this[_0x3d09ad(0x217)]=new Game_Interpreter(),this[_0x3d09ad(0x217)][_0x3d09ad(0x375)](this[_0x3d09ad(0x2e0)](),this[_0x3d09ad(0x168)]);},Game_MessageCommonEvent['prototype']['update']=function(){const _0x5ce009=_0x5fa1a5;if(this[_0x5ce009(0x217)]){if(this[_0x5ce009(0x217)][_0x5ce009(0x27e)]()){if(_0x5ce009(0x2fb)===_0x5ce009(0x3d3)){const _0x34f72b=_0x1025d1[_0x5ce009(0x243)](',')[_0x5ce009(0x1f3)](_0x5566ce=>_0x129971(_0x5566ce)||0x0);let _0x215b0b=_0x34f72b[0x0]||0x0,_0x251a75=_0x34f72b[0x1]||0x0;return _0x55464b['setMessageWindowXyOffsets'](_0x215b0b,_0x251a75),'';}else this[_0x5ce009(0x217)][_0x5ce009(0x3c2)]();}else _0x5ce009(0x1f7)!==_0x5ce009(0x1f7)?(this[_0x5ce009(0x1e9)](_0x2d7356),_0xebfd3c[_0x5ce009(0x26f)]['flushTextState'][_0x5ce009(0x1f8)](this,_0x1b8999),this['postFlushTextState'](_0x19888c)):this['clear']();}},Game_MessageCommonEvent[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1b9)]=function(){const _0x2a640b=_0x5fa1a5;this[_0x2a640b(0x217)]=null;},Scene_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1ff)]=function(){const _0x3f0678=_0x5fa1a5,_0x49fcd1=Math['min'](Graphics[_0x3f0678(0x3c3)],$gameSystem[_0x3f0678(0x230)]()),_0x20d63f=$gameSystem[_0x3f0678(0x38b)](),_0x947811=this['calcWindowHeight'](_0x20d63f,![]),_0x5ac77e=(Graphics[_0x3f0678(0x308)]-_0x49fcd1)/0x2,_0x567ab2=0x0;return new Rectangle(_0x5ac77e,_0x567ab2,_0x49fcd1,_0x947811);},VisuMZ['MessageCore'][_0x5fa1a5(0x1ed)]=Scene_Options[_0x5fa1a5(0x26f)][_0x5fa1a5(0x196)],Scene_Options[_0x5fa1a5(0x26f)]['maxCommands']=function(){const _0x286eb5=_0x5fa1a5;let _0x27cb28=VisuMZ[_0x286eb5(0x203)][_0x286eb5(0x1ed)][_0x286eb5(0x1f8)](this);const _0x257f76=VisuMZ[_0x286eb5(0x203)]['Settings'];if(_0x257f76[_0x286eb5(0x1c4)]['AddOption']&&_0x257f76[_0x286eb5(0x1c4)]['AdjustRect'])_0x27cb28++;return _0x27cb28;},VisuMZ['MessageCore'][_0x5fa1a5(0x2c5)]=Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x415)],Sprite_Picture['prototype'][_0x5fa1a5(0x415)]=function(){const _0x332fef=_0x5fa1a5;VisuMZ[_0x332fef(0x203)][_0x332fef(0x2c5)][_0x332fef(0x1f8)](this),this[_0x332fef(0x1b0)]();},VisuMZ[_0x5fa1a5(0x203)]['Sprite_Picture_update']=Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3c2)],Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3c2)]=function(){const _0x13cd7f=_0x5fa1a5;VisuMZ[_0x13cd7f(0x203)][_0x13cd7f(0x3cc)]['call'](this),this[_0x13cd7f(0x29b)]();},Sprite_Picture['prototype'][_0x5fa1a5(0x29b)]=function(){const _0x463f1b=_0x5fa1a5;if(!this[_0x463f1b(0x14e)])return;this['resizePictureText'](),this['anchorPictureText'](),this[_0x463f1b(0x360)](),this[_0x463f1b(0x2bf)]();},Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1b0)]=function(){const _0xcab925=_0x5fa1a5;if(this[_0xcab925(0x23c)])return;if(this[_0xcab925(0x2ea)])return;const _0x31428b=new Rectangle(0x0,0x0,0x0,0x0);this[_0xcab925(0x23c)]=new Window_Base(_0x31428b),this[_0xcab925(0x23c)]['padding']=0x0,this[_0xcab925(0x2ea)]=new Sprite(),this[_0xcab925(0x37f)](this[_0xcab925(0x2ea)],0x0),this[_0xcab925(0x1de)]=0x0,this['_pictureTextHeight']=0x0,this[_0xcab925(0x390)]={};},Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x391)]=function(){const _0x2dc6e1=_0x5fa1a5;if(!this[_0x2dc6e1(0x23c)])return;if(this[_0x2dc6e1(0x1de)]===this[_0x2dc6e1(0x3c3)]&&this['_pictureTextHeight']===this[_0x2dc6e1(0x3dc)])return;this['_pictureTextWidth']=this[_0x2dc6e1(0x3c3)],this['_pictureTextHeight']=this['height'],this['_pictureTextCache']={},this[_0x2dc6e1(0x23c)][_0x2dc6e1(0x3bb)](0x0,0x0,this[_0x2dc6e1(0x3c3)],this[_0x2dc6e1(0x3dc)]);},Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1ac)]=function(){const _0x52d137=_0x5fa1a5;if(!this[_0x52d137(0x2ea)])return;this[_0x52d137(0x2ea)][_0x52d137(0x370)]['x']=this[_0x52d137(0x370)]['x'],this['_pictureTextSprite'][_0x52d137(0x370)]['y']=this[_0x52d137(0x370)]['y'];},Sprite_Picture[_0x5fa1a5(0x26f)][_0x5fa1a5(0x360)]=function(){const _0x29b240=_0x5fa1a5;if(!this[_0x29b240(0x23c)])return;if(!this[_0x29b240(0x266)]())return;const _0x464cc5=[_0x29b240(0x18e),'up',_0x29b240(0x201),_0x29b240(0x288),_0x29b240(0x40b),_0x29b240(0x40f),'lowerleft',_0x29b240(0x19c),_0x29b240(0x28d)];this[_0x29b240(0x23c)][_0x29b240(0x1f0)]();for(const _0x562d55 of _0x464cc5){if('nmkej'===_0x29b240(0x225))return 0x0;else this[_0x29b240(0x2be)](_0x562d55);}},Sprite_Picture['prototype'][_0x5fa1a5(0x266)]=function(){const _0x342d67=_0x5fa1a5,_0x2522f6=[_0x342d67(0x18e),'up',_0x342d67(0x201),'left',_0x342d67(0x40b),_0x342d67(0x40f),_0x342d67(0x3e4),_0x342d67(0x19c),'lowerright'];for(const _0x4bd8d8 of _0x2522f6){if(_0x342d67(0x1b8)===_0x342d67(0x1b8)){const _0x2749a4=$gameScreen[_0x342d67(0x189)](this[_0x342d67(0x1aa)],_0x4bd8d8);if(this[_0x342d67(0x390)][_0x4bd8d8]===_0x2749a4)continue;return!![];}else _0x3b73a7['x']=-_0x2454ba['width']-_0x3bbd1f;}return![];},Sprite_Picture['prototype'][_0x5fa1a5(0x2be)]=function(_0x2442a2){const _0x6db65a=_0x5fa1a5,_0x3defcc=$gameScreen['getPictureText'](this[_0x6db65a(0x1aa)],_0x2442a2);this[_0x6db65a(0x390)][_0x2442a2]=_0x3defcc;const _0xddcec6=this['_pictureTextWindow']['textSizeEx'](_0x3defcc);let _0x32f78e=$gameScreen[_0x6db65a(0x262)](this[_0x6db65a(0x1aa)]),_0xd0ce3=_0x32f78e,_0x569588=_0x32f78e;if(['up',_0x6db65a(0x40b),'down'][_0x6db65a(0x404)](_0x2442a2))_0xd0ce3=Math[_0x6db65a(0x3ab)]((this[_0x6db65a(0x3c3)]-_0xddcec6[_0x6db65a(0x3c3)])/0x2);else['upperright',_0x6db65a(0x40f),_0x6db65a(0x28d)]['includes'](_0x2442a2)&&(_0xd0ce3=Math[_0x6db65a(0x3ab)](this[_0x6db65a(0x3c3)]-_0xddcec6[_0x6db65a(0x3c3)]-_0x32f78e));if(['left',_0x6db65a(0x40b),_0x6db65a(0x40f)][_0x6db65a(0x404)](_0x2442a2))_0x569588=Math[_0x6db65a(0x3ab)]((this[_0x6db65a(0x3dc)]-_0xddcec6[_0x6db65a(0x3dc)])/0x2);else[_0x6db65a(0x3e4),_0x6db65a(0x19c),_0x6db65a(0x28d)][_0x6db65a(0x404)](_0x2442a2)&&(_0x569588=Math[_0x6db65a(0x3ab)](this[_0x6db65a(0x3dc)]-_0xddcec6[_0x6db65a(0x3dc)]-_0x32f78e));this[_0x6db65a(0x23c)][_0x6db65a(0x3de)](_0x3defcc,_0xd0ce3,_0x569588);},Sprite_Picture[_0x5fa1a5(0x26f)]['attachPictureText']=function(){const _0xbb0b31=_0x5fa1a5;if(!this[_0xbb0b31(0x23c)])return;if(!this[_0xbb0b31(0x2ea)])return;this[_0xbb0b31(0x2ea)]['bitmap']=this[_0xbb0b31(0x23c)][_0xbb0b31(0x247)];},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x37b)]=Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x304)]=function(_0x2aa660){const _0x31a28b=_0x5fa1a5;this[_0x31a28b(0x273)](_0x2aa660),VisuMZ[_0x31a28b(0x203)]['Window_Base_initialize']['call'](this,_0x2aa660);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x273)]=function(_0x248feb){const _0x10bc02=_0x5fa1a5;this[_0x10bc02(0x34d)](),this[_0x10bc02(0x1f2)](),this['registerResetRect'](_0x248feb);},Window_Base['prototype'][_0x5fa1a5(0x34d)]=function(){const _0x3ec215=_0x5fa1a5;this[_0x3ec215(0x18c)](_0x3ec215(0x3ad));},Window_Base['prototype']['setTextAlignment']=function(_0x133bf6){this['_textAlignment']=_0x133bf6;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2a8)]=function(){return this['_textAlignment'];},VisuMZ['MessageCore']['Window_Base_textSizeEx']=Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x282)],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x282)]=function(_0x1db863){const _0x3529e6=_0x5fa1a5;return this['resetWordWrap'](),VisuMZ[_0x3529e6(0x203)][_0x3529e6(0x1fa)][_0x3529e6(0x1f8)](this,_0x1db863);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1dd)]=function(_0x4ff129){const _0x19bc83=_0x5fa1a5;return VisuMZ[_0x19bc83(0x203)][_0x19bc83(0x1fa)][_0x19bc83(0x1f8)](this,_0x4ff129);},VisuMZ['MessageCore'][_0x5fa1a5(0x166)]=Window_Base['prototype'][_0x5fa1a5(0x18b)],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x18b)]=function(_0x32586f){const _0x50658b=_0x5fa1a5;VisuMZ[_0x50658b(0x203)][_0x50658b(0x166)][_0x50658b(0x1f8)](this,_0x32586f);if(_0x32586f[_0x50658b(0x181)])this[_0x50658b(0x18c)](_0x50658b(0x3ad));},Window_Base['prototype'][_0x5fa1a5(0x1f2)]=function(){const _0x246aed=_0x5fa1a5;this[_0x246aed(0x2cb)](![]);},Window_Base['prototype'][_0x5fa1a5(0x3b1)]=function(){const _0x3d1902=_0x5fa1a5;return this[_0x3d1902(0x281)];},Window_Base[_0x5fa1a5(0x26f)]['setWordWrap']=function(_0x3549cd){return this['_wordWrap']=_0x3549cd,'';},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1c3)]=function(_0x3ba6d4){const _0x382b3d=_0x5fa1a5;this[_0x382b3d(0x1be)]=JsonEx[_0x382b3d(0x400)](_0x3ba6d4);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x260)]=function(){const _0x5bfcf1=_0x5fa1a5;this['contents']['fontFace']=$gameSystem[_0x5bfcf1(0x178)](),this[_0x5bfcf1(0x247)][_0x5bfcf1(0x212)]=$gameSystem[_0x5bfcf1(0x2f7)](),this[_0x5bfcf1(0x247)][_0x5bfcf1(0x13f)]=![],this['contents']['fontItalic']=![],this['resetTextColor']();},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1bd)]=function(){const _0x2f1388=_0x5fa1a5;this[_0x2f1388(0x28b)](ColorManager[_0x2f1388(0x1cf)]()),this[_0x2f1388(0x256)](ColorManager[_0x2f1388(0x3d8)]());const _0x22a73e=VisuMZ[_0x2f1388(0x203)][_0x2f1388(0x2a9)][_0x2f1388(0x169)];_0x22a73e[_0x2f1388(0x1a0)]===undefined&&(_0x22a73e['DefaultOutlineWidth']=0x3),this[_0x2f1388(0x247)][_0x2f1388(0x18d)]=_0x22a73e['DefaultOutlineWidth'],this[_0x2f1388(0x1a5)](![]);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1a5)]=function(_0x1f7b98){const _0x5615c4=_0x5fa1a5;this[_0x5615c4(0x1c6)]=_0x1f7b98;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x344)]=function(){return this['_colorLock'];},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x296)]=function(){return![];},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x291)]=function(){const _0x230265=_0x5fa1a5,_0x121578=[_0x230265(0x362),'fontSize',_0x230265(0x13f),_0x230265(0x17d),_0x230265(0x320),_0x230265(0x194),_0x230265(0x18d),_0x230265(0x327)];let _0x5b133d={};for(const _0x266cc8 of _0x121578){_0x230265(0x261)===_0x230265(0x3c4)?this[_0x230265(0x247)]['fontSize']=_0x10cc54(_0x504f8b[0x3])['clamp'](_0x3cd585[_0x230265(0x203)][_0x230265(0x2a9)][_0x230265(0x169)][_0x230265(0x1da)],_0x4a524e[_0x230265(0x203)][_0x230265(0x2a9)][_0x230265(0x169)][_0x230265(0x284)]):_0x5b133d[_0x266cc8]=this[_0x230265(0x247)][_0x266cc8];}return _0x5b133d;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x316)]=function(_0x26d803){const _0x1449d0=_0x5fa1a5;for(const _0x41a321 in _0x26d803){this[_0x1449d0(0x247)][_0x41a321]=_0x26d803[_0x41a321];}},VisuMZ[_0x5fa1a5(0x203)]['Window_Base_update']=Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3c2)],Window_Base[_0x5fa1a5(0x26f)]['update']=function(){const _0x1cf077=_0x5fa1a5;VisuMZ[_0x1cf077(0x203)][_0x1cf077(0x1bc)][_0x1cf077(0x1f8)](this),this[_0x1cf077(0x317)]();},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2fa)]=function(){return![];},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x317)]=function(){const _0x2f0a0c=_0x5fa1a5;this[_0x2f0a0c(0x36e)]>0x0&&(this['canMove']()&&(_0x2f0a0c(0x322)!=='WrxAx'?(this['x']=this[_0x2f0a0c(0x290)](this['x'],this[_0x2f0a0c(0x25e)]),this['y']=this['applyMoveEasing'](this['y'],this[_0x2f0a0c(0x1f6)]),this[_0x2f0a0c(0x3c3)]=this[_0x2f0a0c(0x290)](this['width'],this['_moveTargetWidth']),this[_0x2f0a0c(0x3dc)]=this[_0x2f0a0c(0x290)](this[_0x2f0a0c(0x3dc)],this[_0x2f0a0c(0x3d5)]),this[_0x2f0a0c(0x3a0)]()):_0x1631b7['DefaultOutlineWidth']=0x3),this['_moveDuration']--);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3a0)]=function(_0x292f36,_0xd3bef5){const _0x21e4ac=_0x5fa1a5;!_0x292f36&&(this['width']=Math['min'](this[_0x21e4ac(0x3c3)],Graphics[_0x21e4ac(0x3c3)]),this[_0x21e4ac(0x3dc)]=Math[_0x21e4ac(0x3a6)](this[_0x21e4ac(0x3dc)],Graphics[_0x21e4ac(0x3dc)]));if(!_0xd3bef5){if(_0x21e4ac(0x25d)!==_0x21e4ac(0x25d)){if(_0x1b9594[_0x21e4ac(0x141)](_0x268a60))return!![];}else{const _0x32cedd=-(Math['floor'](Graphics[_0x21e4ac(0x3c3)]-Graphics['boxWidth'])/0x2),_0x389b68=_0x32cedd+Graphics[_0x21e4ac(0x3c3)]-this[_0x21e4ac(0x3c3)],_0x1e5939=-(Math[_0x21e4ac(0x3ab)](Graphics[_0x21e4ac(0x3dc)]-Graphics['boxHeight'])/0x2),_0x9b5183=_0x1e5939+Graphics[_0x21e4ac(0x3dc)]-this[_0x21e4ac(0x3dc)];this['x']=this['x']['clamp'](_0x32cedd,_0x389b68),this['y']=this['y'][_0x21e4ac(0x20d)](_0x1e5939,_0x9b5183);}}},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x290)]=function(_0x22e937,_0x3de42d){const _0x18e2fe=_0x5fa1a5,_0x1be7cc=this[_0x18e2fe(0x36e)],_0x2bd97f=this[_0x18e2fe(0x2bb)],_0x3e7930=this[_0x18e2fe(0x41c)]((_0x2bd97f-_0x1be7cc)/_0x2bd97f),_0x2357af=this[_0x18e2fe(0x41c)]((_0x2bd97f-_0x1be7cc+0x1)/_0x2bd97f),_0x503d60=(_0x22e937-_0x3de42d*_0x3e7930)/(0x1-_0x3e7930);return _0x503d60+(_0x3de42d-_0x503d60)*_0x2357af;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x41c)]=function(_0x3a5dee){const _0x3f6676=_0x5fa1a5,_0x942c4f=0x2;switch(this[_0x3f6676(0x407)]){case 0x0:return _0x3a5dee;case 0x1:return this[_0x3f6676(0x410)](_0x3a5dee,_0x942c4f);case 0x2:return this[_0x3f6676(0x2a5)](_0x3a5dee,_0x942c4f);case 0x3:return this['easeInOut'](_0x3a5dee,_0x942c4f);default:if(Imported[_0x3f6676(0x253)])return VisuMZ[_0x3f6676(0x290)](_0x3a5dee,this['_moveEasingType']);else{if(_0x3f6676(0x3dd)!=='iDNmb')return _0x3a5dee;else this[_0x3f6676(0x19f)]=_0x25375b[_0x3f6676(0x37a)]()[_0x3f6676(0x33f)](_0x17aff0-0x2);}}},Window_Base['prototype'][_0x5fa1a5(0x328)]=function(_0x2c0f66,_0xb66a6b,_0x2e4e61,_0xe20255,_0x3d7c11,_0x3125ea){const _0x27fc6d=_0x5fa1a5;this[_0x27fc6d(0x25e)]=_0x2c0f66,this[_0x27fc6d(0x1f6)]=_0xb66a6b,this[_0x27fc6d(0x27d)]=_0x2e4e61||this['width'],this['_moveTargetHeight']=_0xe20255||this['height'],this[_0x27fc6d(0x36e)]=_0x3d7c11||0x1;if(this[_0x27fc6d(0x36e)]<=0x0)this[_0x27fc6d(0x36e)]=0x1;this[_0x27fc6d(0x2bb)]=this[_0x27fc6d(0x36e)],this[_0x27fc6d(0x407)]=_0x3125ea||0x0;if(_0x3d7c11<=0x0)this[_0x27fc6d(0x317)]();},Window_Base['prototype'][_0x5fa1a5(0x335)]=function(_0x1001f0,_0xd035c9,_0x11e6d1,_0x14d182,_0x56ce8f,_0x38a783){const _0x332ffd=_0x5fa1a5;this['_moveTargetX']=this['x']+_0x1001f0,this[_0x332ffd(0x1f6)]=this['y']+_0xd035c9,this[_0x332ffd(0x27d)]=this[_0x332ffd(0x3c3)]+(_0x11e6d1||0x0),this['_moveTargetHeight']=this[_0x332ffd(0x3dc)]+(_0x14d182||0x0),this[_0x332ffd(0x36e)]=_0x56ce8f||0x1;if(this[_0x332ffd(0x36e)]<=0x0)this[_0x332ffd(0x36e)]=0x1;this[_0x332ffd(0x2bb)]=this[_0x332ffd(0x36e)],this[_0x332ffd(0x407)]=_0x38a783||0x0;if(_0x56ce8f<=0x0)this[_0x332ffd(0x317)]();},Window_Base[_0x5fa1a5(0x26f)]['resetRect']=function(_0x1805f5,_0x3aa76e){const _0x759e51=_0x5fa1a5;this[_0x759e51(0x328)](this['_resetRect']['x'],this[_0x759e51(0x1be)]['y'],this[_0x759e51(0x1be)][_0x759e51(0x3c3)],this[_0x759e51(0x1be)][_0x759e51(0x3dc)],_0x1805f5,_0x3aa76e);},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x152)]=Window_Base['prototype'][_0x5fa1a5(0x28b)],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x28b)]=function(_0xcb0d34){const _0x1ec624=_0x5fa1a5;if(this['isColorLocked']())return;_0xcb0d34=_0xcb0d34[_0x1ec624(0x204)](/\,/g,''),this['_textColorStack']=this[_0x1ec624(0x27a)]||[],this[_0x1ec624(0x27a)][_0x1ec624(0x2ac)](this[_0x1ec624(0x247)][_0x1ec624(0x320)]),VisuMZ[_0x1ec624(0x203)][_0x1ec624(0x152)][_0x1ec624(0x1f8)](this,_0xcb0d34);},Window_Base[_0x5fa1a5(0x26f)]['processPreviousColor']=function(_0x221228){const _0x5864e5=_0x5fa1a5;this['obtainEscapeParam'](_0x221228);if(this[_0x5864e5(0x344)]())return;_0x221228['drawing']&&(this[_0x5864e5(0x27a)]=this['_textColorStack']||[],this['contents'][_0x5864e5(0x320)]=this[_0x5864e5(0x27a)][_0x5864e5(0x223)]()||ColorManager[_0x5864e5(0x1cf)]());},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1e1)]=function(_0x535887){const _0x35cf11=_0x5fa1a5;return _0x535887=this['convertTextMacros'](_0x535887),_0x535887=this[_0x35cf11(0x14f)](_0x535887),_0x535887=this[_0x35cf11(0x405)](_0x535887),_0x535887=this[_0x35cf11(0x23a)](_0x535887),_0x535887=this['convertShowChoiceEscapeCodes'](_0x535887),_0x535887=this[_0x35cf11(0x198)](_0x535887),_0x535887=this[_0x35cf11(0x1a1)](_0x535887),_0x535887=this[_0x35cf11(0x2b4)](_0x535887),_0x535887=this[_0x35cf11(0x38c)](_0x535887),_0x535887=this[_0x35cf11(0x244)](_0x535887),_0x535887=this[_0x35cf11(0x153)](_0x535887),_0x535887=this[_0x35cf11(0x2d5)](_0x535887),_0x535887=this[_0x35cf11(0x192)](_0x535887),_0x535887=this[_0x35cf11(0x405)](_0x535887),_0x535887=this[_0x35cf11(0x1d8)](_0x535887),_0x535887=this[_0x35cf11(0x406)](_0x535887),_0x535887;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x388)]=function(_0x140dd9){const _0x4dd616=_0x5fa1a5;this[_0x4dd616(0x2b3)]=![];for(const _0x3f69f8 of VisuMZ[_0x4dd616(0x203)][_0x4dd616(0x2a9)][_0x4dd616(0x2f3)]){if(_0x140dd9[_0x4dd616(0x2ee)](_0x3f69f8[_0x4dd616(0x1ca)])){if(_0x4dd616(0x386)===_0x4dd616(0x386))this[_0x4dd616(0x2b3)]=!![],_0x140dd9=_0x140dd9[_0x4dd616(0x204)](_0x3f69f8[_0x4dd616(0x1ca)],_0x3f69f8[_0x4dd616(0x1f1)][_0x4dd616(0x24d)](this));else return!![];}}return _0x140dd9;},Window_Base[_0x5fa1a5(0x26f)]['convertBackslashCharacters']=function(_0x811ec){const _0x5a16af=_0x5fa1a5;return _0x811ec=_0x811ec[_0x5a16af(0x204)](/\\/g,'\x1b'),_0x811ec=_0x811ec['replace'](/\x1b\x1b/g,'\x5c'),_0x811ec;},Window_Base['prototype'][_0x5fa1a5(0x405)]=function(_0xdb6fd5){const _0x5681e7=_0x5fa1a5;for(;;){if(_0x5681e7(0x226)!==_0x5681e7(0x226))this[_0x5681e7(0x247)][_0x5681e7(0x212)]-=_0x2fbbea[_0x5681e7(0x203)]['Settings'][_0x5681e7(0x169)][_0x5681e7(0x293)],this['contents'][_0x5681e7(0x212)]=_0x15979a[_0x5681e7(0x413)](this[_0x5681e7(0x247)][_0x5681e7(0x212)],_0x3e6dfa[_0x5681e7(0x203)]['Settings'][_0x5681e7(0x169)][_0x5681e7(0x1da)]);else{if(_0xdb6fd5['match'](/\\V\[(\d+)\]/gi)){if(_0x5681e7(0x265)===_0x5681e7(0x31a)){const _0x35215e=_0x1b025f[_0x5681e7(0x326)]||0x0;if(_0x35215e>0x0)this[_0x5681e7(0x199)](_0x35215e);}else _0xdb6fd5=_0xdb6fd5['replace'](/\\V\[(\d+)\]/gi,(_0x2229d4,_0xf781e3)=>this[_0x5681e7(0x14f)](String($gameVariables[_0x5681e7(0x141)](parseInt(_0xf781e3)))));}else{if(_0xdb6fd5[_0x5681e7(0x2ee)](/\x1bV\[(\d+)\]/gi)){if(_0x5681e7(0x409)!==_0x5681e7(0x409)){if(_0x58f644[_0x5681e7(0x287)]===_0x173e34){if(_0x48e5be[_0x5681e7(0x1e3)]==='')this['obtainEscapeParam'](_0x278a42);_0x405d19[_0x5681e7(0x3a3)][_0x5681e7(0x1f8)](this,_0x51240e);if(this[_0x5681e7(0x41f)]===_0x5f355b){const _0x1e79ad=_0x28154a['CommonEvent']||0x0;if(_0x1e79ad>0x0)this['launchMessageCommonEvent'](_0x1e79ad);}}}else _0xdb6fd5=_0xdb6fd5['replace'](/\x1bV\[(\d+)\]/gi,(_0x186e9c,_0x5bbb6a)=>this[_0x5681e7(0x14f)](String($gameVariables[_0x5681e7(0x141)](parseInt(_0x5bbb6a)))));}else break;}}}return _0xdb6fd5;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x23a)]=function(_0x1ec7cd){const _0x533e5c=_0x5fa1a5;return this[_0x533e5c(0x1d9)](),_0x1ec7cd;},Window_Base['prototype'][_0x5fa1a5(0x192)]=function(_0x5d698f){return _0x5d698f;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x277)]=function(_0x3c3790){const _0x74da66=_0x5fa1a5;return _0x3c3790=_0x3c3790[_0x74da66(0x204)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x3c3790=_0x3c3790[_0x74da66(0x204)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3c3790=_0x3c3790[_0x74da66(0x204)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3c3790=_0x3c3790[_0x74da66(0x204)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3c3790=_0x3c3790['replace'](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x3c3790;},Window_Base['prototype'][_0x5fa1a5(0x198)]=function(_0x477e8d){const _0x43d3d0=_0x5fa1a5;return _0x477e8d=_0x477e8d[_0x43d3d0(0x204)](/<B>/gi,_0x43d3d0(0x3d6)),_0x477e8d=_0x477e8d[_0x43d3d0(0x204)](/<\/B>/gi,_0x43d3d0(0x239)),_0x477e8d=_0x477e8d['replace'](/<I>/gi,_0x43d3d0(0x250)),_0x477e8d=_0x477e8d[_0x43d3d0(0x204)](/<\/I>/gi,_0x43d3d0(0x3f8)),_0x477e8d;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1a1)]=function(_0x2e663e){const _0x2bccfd=_0x5fa1a5;return _0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<LEFT>/gi,_0x2bccfd(0x346)),_0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<\/LEFT>/gi,_0x2bccfd(0x17e)),_0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<CENTER>/gi,_0x2bccfd(0x342)),_0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<RIGHT>/gi,_0x2bccfd(0x150)),_0x2e663e=_0x2e663e[_0x2bccfd(0x204)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x2e663e;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2b4)]=function(_0x54927f){const _0x1a8e8d=_0x5fa1a5;return _0x54927f=_0x54927f[_0x1a8e8d(0x204)](/<COLORLOCK>/gi,_0x1a8e8d(0x207)),_0x54927f=_0x54927f[_0x1a8e8d(0x204)](/<\/COLORLOCK>/gi,_0x1a8e8d(0x30c)),_0x54927f=_0x54927f[_0x1a8e8d(0x204)](/\(\(\(/gi,_0x1a8e8d(0x207)),_0x54927f=_0x54927f['replace'](/\)\)\)/gi,_0x1a8e8d(0x30c)),_0x54927f;},Window_Base[_0x5fa1a5(0x26f)]['convertBaseEscapeCharacters']=function(_0x1bb230){const _0x179c32=_0x5fa1a5;return _0x1bb230=_0x1bb230[_0x179c32(0x204)](/\x1bN\[(\d+)\]/gi,(_0x3558f3,_0x3792b0)=>this[_0x179c32(0x2a7)](parseInt(_0x3792b0))),_0x1bb230=_0x1bb230[_0x179c32(0x204)](/\x1bP\[(\d+)\]/gi,(_0x5f0f02,_0x18f2a7)=>this['partyMemberName'](parseInt(_0x18f2a7))),_0x1bb230=_0x1bb230[_0x179c32(0x204)](/\x1bG/gi,TextManager[_0x179c32(0x2b5)]),_0x1bb230;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x244)]=function(_0xdd79c9){const _0x1223c6=_0x5fa1a5;return _0xdd79c9=_0xdd79c9['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0xdd79c9=_0xdd79c9[_0x1223c6(0x204)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0xdd79c9=_0xdd79c9[_0x1223c6(0x204)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x1223c6(0x2d7)](!![])),_0xdd79c9=_0xdd79c9[_0x1223c6(0x204)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x1223c6(0x2d7)](![])),_0xdd79c9;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x29c)]=function(){const _0x4eba5f=_0x5fa1a5;if(!SceneManager[_0x4eba5f(0x25b)]())return'';if(BattleManager['_target'])return BattleManager[_0x4eba5f(0x2b1)][_0x4eba5f(0x3c7)]();if(BattleManager[_0x4eba5f(0x3fb)][0x0])return BattleManager[_0x4eba5f(0x3fb)][0x0][_0x4eba5f(0x3c7)]();return'';},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x33d)]=function(){const _0x2e7f38=_0x5fa1a5;if(!SceneManager[_0x2e7f38(0x25b)]())return'';let _0x5e9e64=null;return _0x5e9e64=BattleManager[_0x2e7f38(0x2cd)],!_0x5e9e64&&BattleManager[_0x2e7f38(0x414)]()&&(_0x5e9e64=BattleManager[_0x2e7f38(0x17c)]()),_0x5e9e64?_0x5e9e64[_0x2e7f38(0x3c7)]():'';},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2d7)]=function(_0x147fc2){const _0xf2477d=_0x5fa1a5;if(!SceneManager['isSceneBattle']())return'';let _0xcb2647=BattleManager[_0xf2477d(0x353)]||null;!_0xcb2647&&BattleManager['isInputting']()&&(_0xcb2647=BattleManager[_0xf2477d(0x182)]());if(_0xcb2647&&_0xcb2647[_0xf2477d(0x3c8)]()){let _0x1362ae='';if(_0x147fc2)_0x1362ae+=_0xf2477d(0x275)[_0xf2477d(0x3ce)](_0xcb2647[_0xf2477d(0x3c8)]()[_0xf2477d(0x15a)]);return _0x1362ae+=_0xcb2647[_0xf2477d(0x3c8)]()[_0xf2477d(0x3c7)],_0x1362ae;}return'';},Window_Base['prototype']['convertMessageCoreEscapeActions']=function(_0x5370cc){const _0x4970ed=_0x5fa1a5;for(const _0x1d0c3d of VisuMZ[_0x4970ed(0x203)]['Settings']['TextCodeActions']){_0x4970ed(0x214)!==_0x4970ed(0x214)?this[_0x4970ed(0x247)][_0x4970ed(0x13f)]=!!_0x350733:_0x5370cc[_0x4970ed(0x2ee)](_0x1d0c3d[_0x4970ed(0x1ca)])&&(_0x5370cc=_0x5370cc[_0x4970ed(0x204)](_0x1d0c3d[_0x4970ed(0x1ca)],_0x1d0c3d[_0x4970ed(0x1f1)]),_0x5370cc=this[_0x4970ed(0x405)](_0x5370cc));}return _0x5370cc;},Window_Base['prototype'][_0x5fa1a5(0x2d5)]=function(_0x26538b){const _0x528efd=_0x5fa1a5;for(const _0x5e595c of VisuMZ[_0x528efd(0x203)][_0x528efd(0x2a9)][_0x528efd(0x16a)]){_0x26538b[_0x528efd(0x2ee)](_0x5e595c[_0x528efd(0x1ca)])&&(_0x26538b=_0x26538b[_0x528efd(0x204)](_0x5e595c['textCodeCheck'],_0x5e595c[_0x528efd(0x1f1)][_0x528efd(0x24d)](this)),_0x26538b=this[_0x528efd(0x405)](_0x26538b));}return _0x26538b;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2a7)]=function(_0xad1682){const _0x386f0c=_0x5fa1a5,_0x2aca50=_0xad1682>=0x1?$gameActors['actor'](_0xad1682):null,_0x1c9a02=_0x2aca50?_0x2aca50[_0x386f0c(0x3c7)]():'',_0x47c8a3=Number(VisuMZ['MessageCore'][_0x386f0c(0x2a9)][_0x386f0c(0x3ed)][_0x386f0c(0x17b)]);if(this['isAutoColorAffected']()&&_0x47c8a3!==0x0){if(_0x386f0c(0x171)===_0x386f0c(0x171))return _0x386f0c(0x30a)[_0x386f0c(0x3ce)](_0x47c8a3,_0x1c9a02);else{const _0x582133=_0x197dd4['MessageCore'][_0x386f0c(0x2a9)][_0x386f0c(0x169)][_0x386f0c(0x25a)];return _0x1f7982[_0x386f0c(0x320)](_0x582133);}}else{if(_0x386f0c(0x3a7)!==_0x386f0c(0x3a7)){_0x16568a=this[_0x386f0c(0x387)](_0x5a74e4);if(this[_0x386f0c(0x3cb)](_0x156d6d)){const _0x26cf77=this[_0x386f0c(0x38d)](_0xbcbbc7),_0x1e6546=this['isChoiceEnabled'](_0x5c799a);this[_0x386f0c(0x2ed)](_0x26cf77,_0x386f0c(0x35e),_0x1e6546,_0x721e1b);}_0x3de5bb++;}else return _0x1c9a02;}},Window_Base['prototype'][_0x5fa1a5(0x1cd)]=function(_0x32a7c7){const _0x18130f=_0x5fa1a5,_0x568293=_0x32a7c7>=0x1?$gameParty[_0x18130f(0x383)]()[_0x32a7c7-0x1]:null,_0x22eeb4=_0x568293?_0x568293['name']():'',_0x3fbea7=Number(VisuMZ[_0x18130f(0x203)][_0x18130f(0x2a9)][_0x18130f(0x3ed)][_0x18130f(0x17b)]);if(this[_0x18130f(0x296)]()&&_0x3fbea7!==0x0){if('luHRO'===_0x18130f(0x368)){const _0x1db559=_0xab11f4['$1'][_0x18130f(0x243)](',')[_0x18130f(0x1f3)](_0x139b9b=>_0x3f4c9b(_0x139b9b)||0x0);for(const _0x54a20a of _0x1db559){if(!_0xf40e76[_0x18130f(0x141)](_0x54a20a))return![];}return!![];}else return _0x18130f(0x30a)['format'](_0x3fbea7,_0x22eeb4);}else return _0x22eeb4;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1d8)]=function(_0x596420){const _0x53ad7f=_0x5fa1a5;if(this[_0x53ad7f(0x296)]()){if(_0x53ad7f(0x2aa)===_0x53ad7f(0x2aa))_0x596420=this[_0x53ad7f(0x2ae)](_0x596420),_0x596420=this[_0x53ad7f(0x34a)](_0x596420);else return _0x42baa8=_0x49fb94[_0x53ad7f(0x204)](/<LEFT>/gi,_0x53ad7f(0x346)),_0x1007ad=_0x3d73ea[_0x53ad7f(0x204)](/<\/LEFT>/gi,_0x53ad7f(0x17e)),_0x24c17a=_0x4ae980[_0x53ad7f(0x204)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x1044fe=_0x151420['replace'](/<\/CENTER>/gi,_0x53ad7f(0x17e)),_0x5b2768=_0x255aee[_0x53ad7f(0x204)](/<RIGHT>/gi,_0x53ad7f(0x150)),_0x57d24c=_0x337810['replace'](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x3f4b87;}return _0x596420;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2ae)]=function(_0x30259e){const _0x148bc8=_0x5fa1a5;for(autoColor of VisuMZ[_0x148bc8(0x203)]['AutoColorRegExp']){_0x30259e=_0x30259e[_0x148bc8(0x204)](autoColor[0x0],autoColor[0x1]);}return _0x30259e;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x374)]=function(){const _0x2f8d92=_0x5fa1a5;this[_0x2f8d92(0x245)]=[];},Window_Base[_0x5fa1a5(0x26f)]['registerActorNameAutoColorChanges']=function(){const _0x43eddc=_0x5fa1a5;this[_0x43eddc(0x374)]();const _0x11ff04=VisuMZ[_0x43eddc(0x203)][_0x43eddc(0x2a9)]['AutoColor'],_0x56351d=_0x11ff04['Actors'];if(_0x56351d<=0x0)return;for(const _0x18f42b of $gameActors[_0x43eddc(0x276)]){if(_0x43eddc(0x40e)!=='TkYtU'){if(_0x286da8[_0x43eddc(0x141)](_0x363603))return![];}else{if(!_0x18f42b)continue;const _0x5ad5a0=_0x18f42b['name']();if(_0x5ad5a0[_0x43eddc(0x3a4)]()[_0x43eddc(0x1d2)]<=0x0)continue;if(/^\d+$/[_0x43eddc(0x309)](_0x5ad5a0))continue;if(_0x5ad5a0['match'](/-----/i))continue;let _0x3e4a19=VisuMZ[_0x43eddc(0x203)]['ConvertTextAutoColorRegExpFriendly'](_0x5ad5a0);const _0x3e12b9=new RegExp('\x5cb'+_0x3e4a19+'\x5cb','g'),_0x39be15=_0x43eddc(0x30a)[_0x43eddc(0x3ce)](_0x56351d,_0x5ad5a0);this[_0x43eddc(0x245)][_0x43eddc(0x140)]([_0x3e12b9,_0x39be15]);}}},Window_Base[_0x5fa1a5(0x26f)]['processActorNameAutoColorChanges']=function(_0x2757b9){const _0x49f4f1=_0x5fa1a5;this['_autoColorActorNames']===undefined&&this[_0x49f4f1(0x1d9)]();for(autoColor of this[_0x49f4f1(0x245)]){_0x2757b9=_0x2757b9[_0x49f4f1(0x204)](autoColor[0x0],autoColor[0x1]);}return _0x2757b9;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3fc)]=function(_0x50b508,_0x2b98ef,_0x179bbd){const _0xc7f174=_0x5fa1a5;if(!_0x50b508)return'';const _0x4e3fc2=_0x50b508[_0x2b98ef];let _0x13a99d='';if(_0x4e3fc2&&_0x179bbd&&_0x4e3fc2[_0xc7f174(0x15a)]){if(_0xc7f174(0x30e)!=='Avknf'){const _0x57aa7d=_0xc7f174(0x15e);_0x13a99d=_0x57aa7d[_0xc7f174(0x3ce)](_0x4e3fc2['iconIndex'],_0x4e3fc2[_0xc7f174(0x3c7)]);}else{let _0x3d0aea='';if(_0x136408)_0x3d0aea+=_0xc7f174(0x275)[_0xc7f174(0x3ce)](_0x411803[_0xc7f174(0x3c8)]()[_0xc7f174(0x15a)]);return _0x3d0aea+=_0x4266ec[_0xc7f174(0x3c8)]()[_0xc7f174(0x3c7)],_0x3d0aea;}}else _0x4e3fc2?_0x13a99d=_0x4e3fc2[_0xc7f174(0x3c7)]:_0x13a99d='';return this[_0xc7f174(0x296)]()&&(_0x13a99d=this[_0xc7f174(0x306)](_0x13a99d,_0x50b508)),_0x13a99d;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x14b)]=function(_0x54d912){const _0x50c3c1=_0x5fa1a5,_0x254573=$gameParty[_0x50c3c1(0x286)]();if(_0x254573['id']<0x0)return'';let _0x503547=null;if(_0x254573[_0x50c3c1(0x2d8)]===0x0)_0x503547=$dataItems[_0x254573['id']];if(_0x254573['type']===0x1)_0x503547=$dataWeapons[_0x254573['id']];if(_0x254573['type']===0x2)_0x503547=$dataArmors[_0x254573['id']];if(!_0x503547)return'';return _0x54d912?_0x50c3c1(0x15e)['format'](_0x503547['iconIndex'],_0x503547[_0x50c3c1(0x3c7)]):_0x503547[_0x50c3c1(0x3c7)];},Window_Base['prototype'][_0x5fa1a5(0x3f1)]=function(){const _0x17a8dd=_0x5fa1a5,_0x8c8f2b=$gameParty[_0x17a8dd(0x286)]();if(_0x8c8f2b['id']<=0x0)return'';return _0x8c8f2b[_0x17a8dd(0x385)];},Window_Base['prototype'][_0x5fa1a5(0x306)]=function(_0x24a9eb,_0x2e0b40){const _0xd642ca=_0x5fa1a5,_0x146eef=VisuMZ[_0xd642ca(0x203)][_0xd642ca(0x2a9)][_0xd642ca(0x3ed)];let _0x2186ae=0x0;if(_0x2e0b40===$dataActors)_0x2186ae=_0x146eef['Actors'];if(_0x2e0b40===$dataClasses)_0x2186ae=_0x146eef['Classes'];if(_0x2e0b40===$dataSkills)_0x2186ae=_0x146eef[_0xd642ca(0x31c)];if(_0x2e0b40===$dataItems)_0x2186ae=_0x146eef[_0xd642ca(0x349)];if(_0x2e0b40===$dataWeapons)_0x2186ae=_0x146eef['Weapons'];if(_0x2e0b40===$dataArmors)_0x2186ae=_0x146eef[_0xd642ca(0x2ab)];if(_0x2e0b40===$dataEnemies)_0x2186ae=_0x146eef[_0xd642ca(0x403)];if(_0x2e0b40===$dataStates)_0x2186ae=_0x146eef['States'];if(_0x2186ae>0x0){if(_0xd642ca(0x35d)===_0xd642ca(0x2c0)){this[_0xd642ca(0x28b)](_0x49c3c8[_0xd642ca(0x1cf)]()),this[_0xd642ca(0x256)](_0x151e1f[_0xd642ca(0x3d8)]());const _0x26703f=_0x5c28a8[_0xd642ca(0x203)]['Settings'][_0xd642ca(0x169)];_0x26703f[_0xd642ca(0x1a0)]===_0x56d23d&&(_0x26703f[_0xd642ca(0x1a0)]=0x3),this['contents'][_0xd642ca(0x18d)]=_0x26703f['DefaultOutlineWidth'],this[_0xd642ca(0x1a5)](![]);}else _0x24a9eb='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0xd642ca(0x3ce)](_0x2186ae,_0x24a9eb);}return _0x24a9eb;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x406)]=function(_0x4b0eea){const _0x349328=_0x5fa1a5;_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x10f379,_0x5d4370)=>this[_0x349328(0x2cb)](!![])),_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x23e6c0,_0x2b7f7c)=>this[_0x349328(0x2cb)](![])),_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x5b8229,_0x3d357a)=>this['setWordWrap'](![]));if(_0x4b0eea[_0x349328(0x2ee)](Window_Message['_autoSizeRegexp']))this[_0x349328(0x2cb)](![]);else{if(_0x4b0eea['match'](Window_Message[_0x349328(0x272)])){if(_0x349328(0x2c1)!==_0x349328(0x205))this[_0x349328(0x2cb)](![]);else{if(_0x547846['parameters'][0x1]>=0x0){var _0x2bc2b1=_0xeac073[_0x349328(0x3eb)][0x1]+_0x325b79;this[_0x349328(0x324)][_0x4cf561][_0x349328(0x3eb)][0x1]=_0x2bc2b1;}else _0x17ab4c[_0x349328(0x3eb)][0x1]===-0x2&&(this[_0x349328(0x324)][_0x46dc78][_0x349328(0x3eb)][0x1]=_0x4f0916[_0x349328(0x3eb)][0x1]);}}}if(!this['isWordWrapEnabled']())return _0x4b0eea;if(_0x4b0eea['length']<=0x0)return _0x4b0eea;return VisuMZ['MessageCore'][_0x349328(0x2a9)][_0x349328(0x3b7)]['LineBreakSpace']?(_0x4b0eea=_0x4b0eea['replace'](/[\n\r]+/g,'\x20'),_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/[\n\r]+/g,''),_0x4b0eea=_0x4b0eea['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x4b0eea=this[_0x349328(0x163)](_0x4b0eea),_0x4b0eea=_0x4b0eea[_0x349328(0x243)]('\x20')['join'](_0x349328(0x195)),_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x4b0eea=_0x4b0eea[_0x349328(0x204)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x4b0eea;},Window_Base['prototype'][_0x5fa1a5(0x163)]=function(_0xb5d474){return _0xb5d474;},VisuMZ[_0x5fa1a5(0x203)]['Window_Base_processNewLine']=Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x213)],Window_Base['prototype'][_0x5fa1a5(0x213)]=function(_0x2028c5){const _0x3e2c07=_0x5fa1a5;VisuMZ[_0x3e2c07(0x203)][_0x3e2c07(0x236)]['call'](this,_0x2028c5),this['processTextAlignmentX'](_0x2028c5);},VisuMZ['MessageCore'][_0x5fa1a5(0x278)]=Window_Base[_0x5fa1a5(0x26f)]['processControlCharacter'],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3e0)]=function(_0x500e8e,_0x4d3a14){const _0x3a77e1=_0x5fa1a5;VisuMZ[_0x3a77e1(0x203)][_0x3a77e1(0x278)][_0x3a77e1(0x1f8)](this,_0x500e8e,_0x4d3a14),_0x4d3a14===_0x3a77e1(0x195)&&this[_0x3a77e1(0x2e7)](_0x500e8e);},Window_Base[_0x5fa1a5(0x26f)]['obtainEscapeString']=function(_0x55c1ef){const _0x4a6d55=_0x5fa1a5;var _0x521140=/^\<(.*?)\>/['exec'](_0x55c1ef[_0x4a6d55(0x392)]['slice'](_0x55c1ef[_0x4a6d55(0x412)]));return _0x521140?(_0x55c1ef['index']+=_0x521140[0x0][_0x4a6d55(0x1d2)],String(_0x521140[0x0][_0x4a6d55(0x28f)](0x1,_0x521140[0x0][_0x4a6d55(0x1d2)]-0x1))):'';},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2f8)]=Window_Base['prototype'][_0x5fa1a5(0x269)],Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x269)]=function(_0x91e272,_0x129891){const _0x59f7e9=_0x5fa1a5;switch(_0x91e272){case'C':if(_0x129891[_0x59f7e9(0x181)]){if(_0x59f7e9(0x416)!==_0x59f7e9(0x416)){const _0x2053af=this[_0x59f7e9(0x299)](_0x59f7e9(0x200));return _0x2053af>0xa?_0x46c827[_0x59f7e9(0x417)]:_0x2053af;}else VisuMZ['MessageCore'][_0x59f7e9(0x2f8)][_0x59f7e9(0x1f8)](this,_0x91e272,_0x129891);}else this['obtainEscapeParam'](_0x129891);break;case'I':case'{':case'}':VisuMZ[_0x59f7e9(0x203)][_0x59f7e9(0x2f8)]['call'](this,_0x91e272,_0x129891);break;case'FS':this[_0x59f7e9(0x2dd)](_0x129891);break;case'PX':this[_0x59f7e9(0x38e)](_0x129891);break;case'PY':this['processPyTextCode'](_0x129891);break;case _0x59f7e9(0x3ec):this['processFontChangeBold'](this['obtainEscapeParam'](_0x129891));break;case _0x59f7e9(0x41b):this[_0x59f7e9(0x252)](_0x129891);break;case _0x59f7e9(0x1ad):this[_0x59f7e9(0x3a5)](_0x129891);break;case _0x59f7e9(0x2d4):this[_0x59f7e9(0x34e)](_0x129891);break;case _0x59f7e9(0x295):this[_0x59f7e9(0x2e8)](this[_0x59f7e9(0x3d7)](_0x129891));break;case _0x59f7e9(0x232):this['processDrawPicture'](_0x129891);break;case _0x59f7e9(0x197):this[_0x59f7e9(0x254)](_0x129891);break;case _0x59f7e9(0x2f2):this[_0x59f7e9(0x3f4)](_0x129891);break;case _0x59f7e9(0x355):this['processCustomWait'](_0x129891);break;case _0x59f7e9(0x376):this['processWrapBreak'](_0x129891);break;default:this[_0x59f7e9(0x17f)](_0x91e272,_0x129891);}},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x17f)]=function(_0x270a99,_0x2c12a3){const _0x5d50e8=_0x5fa1a5;for(const _0x3ea8e1 of VisuMZ['MessageCore'][_0x5d50e8(0x2a9)][_0x5d50e8(0x3b9)]){if(_0x3ea8e1['Match']===_0x270a99){if(_0x3ea8e1[_0x5d50e8(0x1e3)]==='')this[_0x5d50e8(0x3d7)](_0x2c12a3);_0x3ea8e1[_0x5d50e8(0x3a3)][_0x5d50e8(0x1f8)](this,_0x2c12a3);if(this[_0x5d50e8(0x41f)]===Window_Message){if(_0x5d50e8(0x159)!==_0x5d50e8(0x26d)){const _0xe961da=_0x3ea8e1[_0x5d50e8(0x326)]||0x0;if(_0xe961da>0x0)this[_0x5d50e8(0x199)](_0xe961da);}else{_0x2e291f[_0x5d50e8(0x203)][_0x5d50e8(0x40a)][_0x5d50e8(0x1f8)](this,_0x3f56db);const _0x18ace9=_0x56fb60[_0x5d50e8(0x203)][_0x5d50e8(0x2a9)][_0x5d50e8(0x3ed)];_0x16ea38['MessageCore'][_0x5d50e8(0x3d4)](_0x9c7a99,_0x18ace9['Classes']);}}}}},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x394)]=function(){const _0x15cfc1=_0x5fa1a5;this[_0x15cfc1(0x247)]['fontSize']+=VisuMZ[_0x15cfc1(0x203)][_0x15cfc1(0x2a9)][_0x15cfc1(0x169)][_0x15cfc1(0x293)],this['contents'][_0x15cfc1(0x212)]=Math[_0x15cfc1(0x3a6)](this[_0x15cfc1(0x247)]['fontSize'],VisuMZ[_0x15cfc1(0x203)][_0x15cfc1(0x2a9)]['General'][_0x15cfc1(0x284)]);},Window_Base['prototype']['makeFontSmaller']=function(){const _0x1e6c8f=_0x5fa1a5;this['contents'][_0x1e6c8f(0x212)]-=VisuMZ['MessageCore']['Settings'][_0x1e6c8f(0x169)][_0x1e6c8f(0x293)],this[_0x1e6c8f(0x247)]['fontSize']=Math[_0x1e6c8f(0x413)](this[_0x1e6c8f(0x247)]['fontSize'],VisuMZ[_0x1e6c8f(0x203)][_0x1e6c8f(0x2a9)][_0x1e6c8f(0x169)][_0x1e6c8f(0x1da)]);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2dd)]=function(_0x4dbcbd){const _0x8d0edf=_0x5fa1a5,_0x19aa81=this[_0x8d0edf(0x3d7)](_0x4dbcbd);this['contents'][_0x8d0edf(0x212)]=_0x19aa81[_0x8d0edf(0x20d)](VisuMZ[_0x8d0edf(0x203)][_0x8d0edf(0x2a9)][_0x8d0edf(0x169)][_0x8d0edf(0x1da)],VisuMZ[_0x8d0edf(0x203)][_0x8d0edf(0x2a9)][_0x8d0edf(0x169)][_0x8d0edf(0x284)]);},Window_Base[_0x5fa1a5(0x26f)]['maxFontSizeInLine']=function(_0xe4de4b){const _0x45dcc1=_0x5fa1a5;let _0x5ccc9f=this[_0x45dcc1(0x247)][_0x45dcc1(0x212)];const _0x572e61=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x45dcc1(0x307)!=='lqnGF'){const _0x48be39=_0x572e61[_0x45dcc1(0x3cd)](_0xe4de4b);if(!_0x48be39){if(_0x45dcc1(0x22f)!==_0x45dcc1(0x22c))break;else{this['_autoColorActorNames']===_0x12a98b&&this[_0x45dcc1(0x1d9)]();for(_0x126888 of this[_0x45dcc1(0x245)]){_0x36420f=_0x267922[_0x45dcc1(0x204)](_0x31f717[0x0],_0x16c424[0x1]);}return _0x101f08;}}const _0x9b3ca1=String(_0x48be39[0x1])['toUpperCase']();if(_0x9b3ca1==='{')this['makeFontBigger']();else{if(_0x9b3ca1==='}')this[_0x45dcc1(0x1df)]();else _0x9b3ca1==='FS'&&(this[_0x45dcc1(0x247)]['fontSize']=parseInt(_0x48be39[0x3])['clamp'](VisuMZ[_0x45dcc1(0x203)][_0x45dcc1(0x2a9)][_0x45dcc1(0x169)][_0x45dcc1(0x1da)],VisuMZ['MessageCore'][_0x45dcc1(0x2a9)][_0x45dcc1(0x169)][_0x45dcc1(0x284)]));}this[_0x45dcc1(0x247)][_0x45dcc1(0x212)]>_0x5ccc9f&&(_0x5ccc9f=this[_0x45dcc1(0x247)]['fontSize']);}else{const _0x3395f0=_0x3b4f08>=0x1?_0x4d445f[_0x45dcc1(0x383)]()[_0x23463f-0x1]:null,_0x3d65f9=_0x3395f0?_0x3395f0[_0x45dcc1(0x3c7)]():'',_0x331ce5=_0x2d0e96(_0x3d5be8[_0x45dcc1(0x203)][_0x45dcc1(0x2a9)]['AutoColor']['Actors']);return this['isAutoColorAffected']()&&_0x331ce5!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x45dcc1(0x3ce)](_0x331ce5,_0x3d65f9):_0x3d65f9;}}return _0x5ccc9f;},Window_Base[_0x5fa1a5(0x26f)]['processPxTextCode']=function(_0x2adfe9){const _0x34a7dc=_0x5fa1a5;_0x2adfe9['x']=this[_0x34a7dc(0x3d7)](_0x2adfe9),VisuMZ[_0x34a7dc(0x203)]['Settings'][_0x34a7dc(0x169)][_0x34a7dc(0x280)]&&(_0x2adfe9['x']+=_0x2adfe9[_0x34a7dc(0x30b)]);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3f5)]=function(_0x24f7bb){const _0x54cd1d=_0x5fa1a5;_0x24f7bb['y']=this[_0x54cd1d(0x3d7)](_0x24f7bb),VisuMZ[_0x54cd1d(0x203)]['Settings'][_0x54cd1d(0x169)]['RelativePXPY']&&(_0x24f7bb['y']+=_0x24f7bb[_0x54cd1d(0x352)]);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x15d)]=function(_0x10f9d7){const _0x100529=_0x5fa1a5;this[_0x100529(0x247)][_0x100529(0x13f)]=!!_0x10f9d7;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2e8)]=function(_0x5dfe4b){const _0x249360=_0x5fa1a5;this[_0x249360(0x247)][_0x249360(0x17d)]=!!_0x5dfe4b;},Window_Base[_0x5fa1a5(0x26f)]['processTextAlignmentChange']=function(_0x2d0ae8){const _0x3bb088=_0x5fa1a5,_0x55614c=this[_0x3bb088(0x3d7)](_0x2d0ae8);if(!_0x2d0ae8['drawing'])return;switch(_0x55614c){case 0x0:this[_0x3bb088(0x18c)](_0x3bb088(0x3ad));return;case 0x1:this[_0x3bb088(0x18c)](_0x3bb088(0x288));break;case 0x2:this[_0x3bb088(0x18c)](_0x3bb088(0x40b));break;case 0x3:this[_0x3bb088(0x18c)](_0x3bb088(0x40f));break;}this[_0x3bb088(0x31f)](_0x2d0ae8);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x31f)]=function(_0x22645d){const _0x542396=_0x5fa1a5;if(!_0x22645d[_0x542396(0x181)])return;if(_0x22645d['rtl'])return;if(this[_0x542396(0x2a8)]()===_0x542396(0x3ad))return;let _0x1e9106=_0x22645d[_0x542396(0x392)][_0x542396(0x36b)](_0x542396(0x369),_0x22645d[_0x542396(0x412)]+0x1),_0x574c47=_0x22645d[_0x542396(0x392)][_0x542396(0x36b)]('\x0a',_0x22645d[_0x542396(0x412)]+0x1);if(_0x1e9106<0x0)_0x1e9106=_0x22645d[_0x542396(0x392)]['length']+0x1;if(_0x574c47>0x0)_0x1e9106=Math[_0x542396(0x3a6)](_0x1e9106,_0x574c47);const _0x1154e1=_0x22645d['text'][_0x542396(0x1d3)](_0x22645d['index'],_0x1e9106),_0x5eb3e7=this[_0x542396(0x1c5)](_0x1154e1)[_0x542396(0x3c3)],_0xa6853d=_0x22645d['width']||this[_0x542396(0x312)]-0x8,_0x14042d=this[_0x542396(0x41f)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x542396(0x2a8)]()){case _0x542396(0x288):_0x22645d['x']=_0x22645d[_0x542396(0x30b)];break;case _0x542396(0x40b):_0x22645d['x']=_0x22645d[_0x542396(0x30b)],_0x22645d['x']+=Math['floor']((_0xa6853d-_0x5eb3e7)/0x2);_0x14042d&&(_0x22645d['x']-=_0x22645d[_0x542396(0x30b)]/0x2);break;case _0x542396(0x40f):_0x22645d['x']=_0xa6853d-_0x5eb3e7+_0x22645d[_0x542396(0x30b)];if(_0x14042d){if('SmbXu'!==_0x542396(0x2b9))_0x22645d['x']-=_0x22645d[_0x542396(0x30b)];else{const _0x592263=_0x211855>=0x1?_0x14af00['actor'](_0x4578b7):null,_0x2b2ec8=_0x592263?_0x592263['name']():'',_0x497dfb=_0xf530c4(_0x21fcca[_0x542396(0x203)]['Settings'][_0x542396(0x3ed)][_0x542396(0x17b)]);return this[_0x542396(0x296)]()&&_0x497dfb!==0x0?_0x542396(0x30a)['format'](_0x497dfb,_0x2b2ec8):_0x2b2ec8;}}break;}},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1c5)]=function(_0x2917ac){const _0x17f895=_0x5fa1a5;_0x2917ac=_0x2917ac[_0x17f895(0x204)](/\x1b!/g,''),_0x2917ac=_0x2917ac[_0x17f895(0x204)](/\x1b\|/g,''),_0x2917ac=_0x2917ac[_0x17f895(0x204)](/\x1b\./g,'');const _0x530a92=this[_0x17f895(0x1c9)](_0x2917ac,0x0,0x0,0x0),_0x2d4a3b=this[_0x17f895(0x291)]();return _0x530a92[_0x17f895(0x181)]=![],this[_0x17f895(0x18b)](_0x530a92),this[_0x17f895(0x316)](_0x2d4a3b),{'width':_0x530a92[_0x17f895(0x219)],'height':_0x530a92[_0x17f895(0x145)]};},Window_Base[_0x5fa1a5(0x28e)]=VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2a9)][_0x5fa1a5(0x3b7)]['EndPadding']||0x0,Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2e7)]=function(_0x3a61c2){const _0x173a77=_0x5fa1a5,_0x7b4eb1=(_0x3a61c2['rtl']?-0x1:0x1)*this['textWidth']('\x20');_0x3a61c2['x']+=_0x7b4eb1;if(this[_0x173a77(0x3d7)](_0x3a61c2)>0x0)_0x3a61c2['x']+=_0x7b4eb1;if(_0x3a61c2[_0x173a77(0x1b6)])return;let _0x35180c=_0x3a61c2['text'][_0x173a77(0x36b)](_0x173a77(0x195),_0x3a61c2[_0x173a77(0x412)]+0x1),_0x4c37a8=_0x3a61c2[_0x173a77(0x392)][_0x173a77(0x36b)]('\x0a',_0x3a61c2[_0x173a77(0x412)]+0x1);if(_0x35180c<0x0)_0x35180c=_0x3a61c2[_0x173a77(0x392)][_0x173a77(0x1d2)]+0x1;if(_0x4c37a8>0x0)_0x35180c=Math['min'](_0x35180c,_0x4c37a8);const _0x9962c8=_0x3a61c2[_0x173a77(0x392)][_0x173a77(0x1d3)](_0x3a61c2['index'],_0x35180c),_0x187010=this['textSizeExWordWrap'](_0x9962c8)[_0x173a77(0x3c3)];let _0x31ced8=_0x3a61c2['width']||this[_0x173a77(0x312)];_0x31ced8-=Window_Base[_0x173a77(0x28e)];if(this[_0x173a77(0x41f)]===Window_Message){const _0x13b9c6=$gameMessage['faceName']()===''?0x0:ImageManager['faceWidth']+0x14;_0x31ced8-=_0x13b9c6;if(VisuMZ['MessageCore']['Settings']['WordWrap'][_0x173a77(0x41a)]){if(_0x173a77(0x15c)===_0x173a77(0x15c))_0x31ced8-=_0x13b9c6;else return this[_0x173a77(0x31d)](_0x4133a2,!![],!![]),this['processAutoPosition'](_0x173a77(0x3bf),_0x4cfa8f(_0xdafaab)||0x0),'';}}let _0x5c4ac1=![];if(_0x3a61c2['x']+_0x187010>_0x3a61c2['startX']+_0x31ced8)_0x5c4ac1=!![];if(_0x187010===0x0)_0x5c4ac1=!![];_0x5c4ac1&&('aUTuw'!==_0x173a77(0x173)?(this[_0x173a77(0x247)][_0x173a77(0x212)]+=_0x3a7479[_0x173a77(0x203)][_0x173a77(0x2a9)]['General'][_0x173a77(0x293)],this[_0x173a77(0x247)][_0x173a77(0x212)]=_0x37b33a['min'](this[_0x173a77(0x247)][_0x173a77(0x212)],_0x1162a0['MessageCore'][_0x173a77(0x2a9)][_0x173a77(0x169)][_0x173a77(0x284)])):_0x3a61c2[_0x173a77(0x392)]=_0x3a61c2[_0x173a77(0x392)]['slice'](0x0,_0x3a61c2[_0x173a77(0x412)])+'\x0a'+_0x3a61c2[_0x173a77(0x392)][_0x173a77(0x258)](_0x3a61c2[_0x173a77(0x412)]));},Window_Base['prototype'][_0x5fa1a5(0x3b0)]=function(_0x3b900e){const _0x2a4911=_0x5fa1a5,_0x39b20f=this[_0x2a4911(0x1c9)](_0x3b900e,0x0,0x0,0x0),_0x416ab8=this[_0x2a4911(0x291)]();return _0x39b20f['drawing']=![],this[_0x2a4911(0x2cb)](![]),this[_0x2a4911(0x18b)](_0x39b20f),this[_0x2a4911(0x2cb)](!![]),this[_0x2a4911(0x316)](_0x416ab8),{'width':_0x39b20f['outputWidth'],'height':_0x39b20f[_0x2a4911(0x145)]};},Window_Base['prototype'][_0x5fa1a5(0x34e)]=function(_0x225285){const _0x246fd2=_0x5fa1a5;return this[_0x246fd2(0x3d7)](_0x225285);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1a3)]=function(_0x2d3b42){const _0x11e73c=_0x5fa1a5,_0x2a6c1a=this[_0x11e73c(0x2cf)](_0x2d3b42)[_0x11e73c(0x243)](',');if(!_0x2d3b42[_0x11e73c(0x181)])return;const _0x553346=_0x2a6c1a[0x0][_0x11e73c(0x3a4)](),_0x41e240=_0x2a6c1a[0x1]||0x0,_0x3a7332=_0x2a6c1a[0x2]||0x0,_0x143bd3=ImageManager[_0x11e73c(0x13e)](_0x553346),_0xdcb43f=this[_0x11e73c(0x247)][_0x11e73c(0x327)];_0x143bd3[_0x11e73c(0x36d)](this[_0x11e73c(0x2d3)][_0x11e73c(0x24d)](this,_0x143bd3,_0x2d3b42['x'],_0x2d3b42['y'],_0x41e240,_0x3a7332,_0xdcb43f));},Window_Base['prototype'][_0x5fa1a5(0x2d3)]=function(_0x382565,_0x17f5c8,_0x2d7d97,_0x4bc613,_0x4db914,_0x36022c){const _0x138175=_0x5fa1a5;_0x4bc613=_0x4bc613||_0x382565[_0x138175(0x3c3)],_0x4db914=_0x4db914||_0x382565['height'],this[_0x138175(0x2d2)][_0x138175(0x327)]=_0x36022c,this[_0x138175(0x2d2)]['blt'](_0x382565,0x0,0x0,_0x382565['width'],_0x382565[_0x138175(0x3dc)],_0x17f5c8,_0x2d7d97,_0x4bc613,_0x4db914),this[_0x138175(0x2d2)]['paintOpacity']=0xff;},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x252)]=function(_0x1c29cb){const _0x4363a3=_0x5fa1a5,_0x1c320a=this[_0x4363a3(0x2cf)](_0x1c29cb)[_0x4363a3(0x243)](',');if(!_0x1c29cb[_0x4363a3(0x181)])return;const _0x5a0cb8=_0x1c320a[0x0][_0x4363a3(0x3a4)](),_0x48916f=ImageManager[_0x4363a3(0x13e)](_0x5a0cb8),_0x6d4005=JsonEx['makeDeepCopy'](_0x1c29cb),_0xdc53b9=this[_0x4363a3(0x247)]['paintOpacity'];_0x48916f[_0x4363a3(0x36d)](this[_0x4363a3(0x3bd)][_0x4363a3(0x24d)](this,_0x48916f,_0x6d4005,_0xdc53b9));},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3bd)]=function(_0x98979b,_0x2096f0,_0x592205){const _0x3de21e=_0x5fa1a5,_0x2828de=_0x2096f0[_0x3de21e(0x3c3)]||this[_0x3de21e(0x312)],_0xa53918=this[_0x3de21e(0x172)]!==undefined?this[_0x3de21e(0x351)]():this[_0x3de21e(0x37c)],_0x10e96f=_0x2828de/_0x98979b['width'],_0x8dc98a=_0xa53918/_0x98979b[_0x3de21e(0x3dc)],_0x22eb15=Math[_0x3de21e(0x3a6)](_0x10e96f,_0x8dc98a,0x1),_0xee8047=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)[_0x3de21e(0x3dc)]-this['lineHeight']())/0x2:0x0,_0x74f1=_0x98979b[_0x3de21e(0x3c3)]*_0x22eb15,_0x8ebddd=_0x98979b['height']*_0x22eb15,_0x54c0c8=Math[_0x3de21e(0x3ab)]((_0x2828de-_0x74f1)/0x2)+_0x2096f0['startX'],_0x381e14=Math[_0x3de21e(0x3ab)]((_0xa53918-_0x8ebddd)/0x2)+_0x2096f0[_0x3de21e(0x352)]-_0xee8047*0x2;this[_0x3de21e(0x2d2)]['paintOpacity']=_0x592205,this[_0x3de21e(0x2d2)][_0x3de21e(0x1f9)](_0x98979b,0x0,0x0,_0x98979b[_0x3de21e(0x3c3)],_0x98979b[_0x3de21e(0x3dc)],_0x54c0c8,_0x381e14,_0x74f1,_0x8ebddd),this['contentsBack'][_0x3de21e(0x327)]=0xff;},Window_Base[_0x5fa1a5(0x26f)]['processColorLock']=function(_0xdd18bb){const _0x2a6cca=_0x5fa1a5,_0x4f6f8c=this[_0x2a6cca(0x3d7)](_0xdd18bb);if(_0xdd18bb['drawing'])this['setColorLock'](_0x4f6f8c>0x0);},Window_Base[_0x5fa1a5(0x26f)][_0x5fa1a5(0x32b)]=function(_0x2f1a67){const _0x495d1b=_0x5fa1a5,_0x4e5954=this[_0x495d1b(0x3d7)](_0x2f1a67);this['constructor']===Window_Message&&_0x2f1a67[_0x495d1b(0x181)]&&this[_0x495d1b(0x332)](_0x4e5954);},Window_Help[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1f2)]=function(){const _0xb317b6=_0x5fa1a5;this[_0xb317b6(0x2cb)]($gameSystem[_0xb317b6(0x1a9)]());},Window_Help[_0x5fa1a5(0x26f)][_0x5fa1a5(0x296)]=function(){return!![];},VisuMZ[_0x5fa1a5(0x203)]['Window_Help_refresh']=Window_Help[_0x5fa1a5(0x26f)][_0x5fa1a5(0x255)],Window_Help[_0x5fa1a5(0x26f)][_0x5fa1a5(0x255)]=function(){const _0x50306b=_0x5fa1a5;this[_0x50306b(0x374)](),VisuMZ[_0x50306b(0x203)][_0x50306b(0x3af)][_0x50306b(0x1f8)](this),this['resetWordWrap']();},VisuMZ[_0x5fa1a5(0x203)]['Window_Options_addGeneralOptions']=Window_Options[_0x5fa1a5(0x26f)][_0x5fa1a5(0x238)],Window_Options['prototype'][_0x5fa1a5(0x238)]=function(){const _0x4e4363=_0x5fa1a5;VisuMZ[_0x4e4363(0x203)]['Window_Options_addGeneralOptions']['call'](this),this[_0x4e4363(0x3b3)]();},Window_Options['prototype'][_0x5fa1a5(0x3b3)]=function(){const _0x572248=_0x5fa1a5;VisuMZ[_0x572248(0x203)]['Settings'][_0x572248(0x1c4)]['AddOption']&&this[_0x572248(0x29d)]();},Window_Options[_0x5fa1a5(0x26f)][_0x5fa1a5(0x29d)]=function(){const _0x2e8cd1=_0x5fa1a5,_0x1c1e68=TextManager[_0x2e8cd1(0x3f9)],_0x4cfbd3='textSpeed';this[_0x2e8cd1(0x2ed)](_0x1c1e68,_0x4cfbd3);},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x264)]=Window_Options['prototype'][_0x5fa1a5(0x1eb)],Window_Options['prototype'][_0x5fa1a5(0x1eb)]=function(_0x43fe01){const _0x2a5e3f=_0x5fa1a5,_0x24a009=this[_0x2a5e3f(0x3d0)](_0x43fe01);if(_0x24a009===_0x2a5e3f(0x200))return this[_0x2a5e3f(0x25c)]();return VisuMZ[_0x2a5e3f(0x203)]['Window_Options_statusText'][_0x2a5e3f(0x1f8)](this,_0x43fe01);},VisuMZ['MessageCore'][_0x5fa1a5(0x3f6)]=Window_Options[_0x5fa1a5(0x26f)]['isVolumeSymbol'],Window_Options[_0x5fa1a5(0x26f)][_0x5fa1a5(0x411)]=function(_0x4377d7){const _0x343bff=_0x5fa1a5;if(_0x4377d7===_0x343bff(0x200))return!![];return VisuMZ[_0x343bff(0x203)][_0x343bff(0x3f6)][_0x343bff(0x1f8)](this,_0x4377d7);},Window_Options[_0x5fa1a5(0x26f)][_0x5fa1a5(0x25c)]=function(){const _0x2b036e=_0x5fa1a5,_0x252a31=this['getConfigValue'](_0x2b036e(0x200));if(_0x252a31>0xa){if(_0x2b036e(0x298)!==_0x2b036e(0x1d7))return TextManager[_0x2b036e(0x417)];else this[_0x2b036e(0x393)](_0x2b4256,this[_0x2b036e(0x1e2)](),_0x48d739),this[_0x2b036e(0x172)]-=0x2;}else return _0x252a31;},VisuMZ['MessageCore']['Window_Options_changeVolume']=Window_Options[_0x5fa1a5(0x26f)]['changeVolume'],Window_Options[_0x5fa1a5(0x26f)]['changeVolume']=function(_0x147647,_0x3a7f3a,_0x5cc246){const _0x548d46=_0x5fa1a5;if(_0x147647===_0x548d46(0x200))return this[_0x548d46(0x1b7)](_0x147647,_0x3a7f3a,_0x5cc246);VisuMZ['MessageCore'][_0x548d46(0x3ba)][_0x548d46(0x1f8)](this,_0x147647,_0x3a7f3a,_0x5cc246);},Window_Options['prototype'][_0x5fa1a5(0x1b7)]=function(_0x2d7581,_0x55056a,_0x1f7a1c){const _0x220d2e=_0x5fa1a5,_0x3584a9=this[_0x220d2e(0x299)](_0x2d7581),_0x31b872=0x1,_0x334217=_0x3584a9+(_0x55056a?_0x31b872:-_0x31b872);_0x334217>0xb&&_0x1f7a1c?'YbpGn'!=='swYRD'?this['changeValue'](_0x2d7581,0x1):(_0xdaed75=_0x542028||_0xd1e629[_0x220d2e(0x3c3)],_0x490ab0=_0x13cde9||_0x2635ac[_0x220d2e(0x3dc)],this[_0x220d2e(0x2d2)]['paintOpacity']=_0x4ecb03,this['contentsBack'][_0x220d2e(0x1f9)](_0x594c38,0x0,0x0,_0x3f263d['width'],_0x4a8baa[_0x220d2e(0x3dc)],_0x155b99,_0x5ae0b7,_0x5337eb,_0x4cb85c),this[_0x220d2e(0x2d2)][_0x220d2e(0x327)]=0xff):'mImwE'===_0x220d2e(0x1f4)?this[_0x220d2e(0x2df)](_0x2d7581,_0x334217[_0x220d2e(0x20d)](0x1,0xb)):this[_0x220d2e(0x36e)]>0x0&&(this[_0x220d2e(0x2fa)]()&&(this['x']=this[_0x220d2e(0x290)](this['x'],this[_0x220d2e(0x25e)]),this['y']=this[_0x220d2e(0x290)](this['y'],this['_moveTargetY']),this[_0x220d2e(0x3c3)]=this['applyMoveEasing'](this[_0x220d2e(0x3c3)],this[_0x220d2e(0x27d)]),this[_0x220d2e(0x3dc)]=this[_0x220d2e(0x290)](this[_0x220d2e(0x3dc)],this[_0x220d2e(0x3d5)]),this[_0x220d2e(0x3a0)]()),this['_moveDuration']--);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x285)]=function(){const _0x595b11=_0x5fa1a5;let _0x49240c=Window_Base[_0x595b11(0x26f)]['contentsHeight']['call'](this);return _0x49240c-=this[_0x595b11(0x251)](),_0x49240c;},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x39b)]=function(){const _0x31a83c=_0x5fa1a5;Window_Base[_0x31a83c(0x26f)][_0x31a83c(0x39b)]['call'](this),VisuMZ['MessageCore'][_0x31a83c(0x2a9)]['General']['StretchDimmedBg']&&(_0x31a83c(0x21a)!=='SMbVS'?_0x343ddc['x']+=_0x42420a[_0x31a83c(0x30b)]:this[_0x31a83c(0x156)]());},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x156)]=function(){const _0x598a14=_0x5fa1a5;this[_0x598a14(0x28c)]['x']=Math[_0x598a14(0x1fc)](this[_0x598a14(0x3c3)]/0x2),this[_0x598a14(0x28c)][_0x598a14(0x370)]['x']=0.5,this[_0x598a14(0x28c)][_0x598a14(0x2e1)]['x']=Graphics['width'];},VisuMZ['MessageCore'][_0x5fa1a5(0x3a1)]=Window_Message[_0x5fa1a5(0x26f)]['clearFlags'],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x23b)]=function(){const _0x284521=_0x5fa1a5;VisuMZ['MessageCore'][_0x284521(0x3a1)][_0x284521(0x1f8)](this),this['clearActorNameAutoColor'](),this[_0x284521(0x1f2)](),this[_0x284521(0x1a5)](![]),this[_0x284521(0x18c)]('default'),this['setTextDelay'](VisuMZ['MessageCore']['Settings'][_0x284521(0x169)][_0x284521(0x336)]);},Window_Message[_0x5fa1a5(0x26f)]['resetWordWrap']=function(){const _0x3ef0cb=_0x5fa1a5;this[_0x3ef0cb(0x2cb)]($gameSystem[_0x3ef0cb(0x2e3)]());},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x296)]=function(){return!![];},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x160)]=function(_0x14a764){const _0x506220=_0x5fa1a5,_0x433c5a=0xb-ConfigManager[_0x506220(0x200)];_0x14a764=Math[_0x506220(0x1fc)](_0x14a764*_0x433c5a),this[_0x506220(0x1ef)]=_0x14a764,this[_0x506220(0x1b1)]=_0x14a764;},VisuMZ['MessageCore'][_0x5fa1a5(0x271)]=Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x363)],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x363)]=function(){const _0x3c439d=_0x5fa1a5;return VisuMZ['MessageCore'][_0x3c439d(0x271)][_0x3c439d(0x1f8)](this)||Input[_0x3c439d(0x1cb)](VisuMZ['MessageCore'][_0x3c439d(0x2a9)][_0x3c439d(0x169)][_0x3c439d(0x249)]);},VisuMZ['MessageCore']['Window_Message_updatePlacement']=Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x35a)],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x35a)]=function(){const _0x165702=_0x5fa1a5;let _0x1cd834=this['y'];this['x']=Math[_0x165702(0x1fc)]((Graphics[_0x165702(0x308)]-this[_0x165702(0x3c3)])/0x2),VisuMZ['MessageCore'][_0x165702(0x1c7)]['call'](this);if(this[_0x165702(0x19f)])this['y']=_0x1cd834;this['updateXyOffsets'](),this[_0x165702(0x341)](),this[_0x165702(0x3a0)]();},VisuMZ[_0x5fa1a5(0x203)]['Window_Message_newPage']=Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3e5)],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3e5)]=function(_0x304182){const _0x50ea3f=_0x5fa1a5;this['convertNewPageTextStateMacros'](_0x304182),this[_0x50ea3f(0x234)](_0x304182),VisuMZ[_0x50ea3f(0x203)][_0x50ea3f(0x395)][_0x50ea3f(0x1f8)](this,_0x304182),this['createContents']();},Window_Message['prototype'][_0x5fa1a5(0x1d0)]=function(_0x267854){const _0x292a7c=_0x5fa1a5;if(!_0x267854)return;this[_0x292a7c(0x2e5)]=![],_0x267854[_0x292a7c(0x392)]=this[_0x292a7c(0x388)](_0x267854[_0x292a7c(0x392)]),this['_textMacroFound']&&(_0x267854['text']=this[_0x292a7c(0x406)](_0x267854[_0x292a7c(0x392)]),this[_0x292a7c(0x2e5)]=!![]);},Window_Message['prototype']['prepareWordWrapEscapeCharacters']=function(_0x4d6f45){const _0x477b38=_0x5fa1a5;if(this[_0x477b38(0x2e5)])return _0x4d6f45;return Window_Base[_0x477b38(0x26f)]['prepareWordWrapEscapeCharacters'][_0x477b38(0x1f8)](this,_0x4d6f45);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x234)]=function(_0x2d4bb2){const _0x4c6f91=_0x5fa1a5;this[_0x4c6f91(0x27b)](_0x2d4bb2),this[_0x4c6f91(0x34b)](_0x2d4bb2),this[_0x4c6f91(0x35f)]();},VisuMZ['MessageCore'][_0x5fa1a5(0x2d1)]=Window_Message[_0x5fa1a5(0x26f)]['terminateMessage'],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x162)]=function(){const _0x105f41=_0x5fa1a5;VisuMZ[_0x105f41(0x203)][_0x105f41(0x2d1)]['call'](this),this[_0x105f41(0x23b)]();if(this['_messagePositionReset'])this[_0x105f41(0x241)]();},Window_Message[_0x5fa1a5(0x26f)]['updateDimensions']=function(){const _0x23bd88=_0x5fa1a5;this['width']=$gameSystem[_0x23bd88(0x230)]()+this[_0x23bd88(0x29a)]();;this[_0x23bd88(0x3c3)]=Math[_0x23bd88(0x3a6)](Graphics[_0x23bd88(0x3c3)],this[_0x23bd88(0x3c3)]);const _0x2a0214=$gameSystem['getMessageWindowRows']();this[_0x23bd88(0x3dc)]=SceneManager['_scene'][_0x23bd88(0x2b2)](_0x2a0214,![])+this[_0x23bd88(0x251)](),this[_0x23bd88(0x3dc)]=Math['min'](Graphics[_0x23bd88(0x3dc)],this['height']);if($gameTemp[_0x23bd88(0x32c)])this[_0x23bd88(0x231)]();},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x29a)]=function(){return 0x0;},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x251)]=function(){return 0x0;},Window_Message[_0x5fa1a5(0x26f)]['resetPositionX']=function(){const _0x267b85=_0x5fa1a5;this['x']=(Graphics[_0x267b85(0x308)]-this[_0x267b85(0x3c3)])/0x2,$gameTemp[_0x267b85(0x32c)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x317)]=function(){const _0x89cf12=_0x5fa1a5,_0x231ad7={'x':this['x'],'y':this['y']};Window_Base[_0x89cf12(0x26f)][_0x89cf12(0x317)][_0x89cf12(0x1f8)](this),this[_0x89cf12(0x3e3)](_0x231ad7);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2fa)]=function(){return!![];},Window_Message['prototype'][_0x5fa1a5(0x3e3)]=function(_0x4cfdc4){const _0x148384=_0x5fa1a5;this[_0x148384(0x337)]&&(this[_0x148384(0x337)]['x']+=this['x']-_0x4cfdc4['x'],this[_0x148384(0x337)]['y']+=this['y']-_0x4cfdc4['y']);},Window_Message['prototype'][_0x5fa1a5(0x2ca)]=function(_0x2f22c3,_0x447411){const _0x340f33=_0x5fa1a5;this[_0x340f33(0x328)](this['_resetRect']['x'],this[_0x340f33(0x16b)]*(Graphics[_0x340f33(0x177)]-this[_0x340f33(0x3dc)])/0x2,this[_0x340f33(0x1be)][_0x340f33(0x3c3)],this[_0x340f33(0x1be)][_0x340f33(0x3dc)],_0x2f22c3,_0x447411);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x34e)]=function(_0x111e70){const _0x333b92=_0x5fa1a5,_0x243103=Window_Base[_0x333b92(0x26f)]['processCommonEvent']['call'](this,_0x111e70);_0x111e70[_0x333b92(0x181)]&&this[_0x333b92(0x199)](_0x243103);},Window_Message['prototype'][_0x5fa1a5(0x199)]=function(_0xaa2ac4){const _0x3b93c2=_0x5fa1a5;if($gameParty['inBattle']()){}else $gameMap[_0x3b93c2(0x14d)](_0xaa2ac4);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x384)]=function(_0x51c42d){const _0x2ad1d6=_0x5fa1a5;this[_0x2ad1d6(0x1ef)]--,this[_0x2ad1d6(0x1ef)]<=0x0&&(_0x2ad1d6(0x1a6)!==_0x2ad1d6(0x2c4)?(this['onProcessCharacter'](_0x51c42d),Window_Base['prototype']['processCharacter'][_0x2ad1d6(0x1f8)](this,_0x51c42d)):_0x1b0ec9=_0x2c3769[_0x2ad1d6(0x3ab)](this[_0x2ad1d6(0x3c3)]-_0x4c962c[_0x2ad1d6(0x3c3)]-_0x10e33c));},Window_Message['prototype'][_0x5fa1a5(0x365)]=function(_0x5d9b4e){const _0x3af3ee=_0x5fa1a5;this['_textDelayCount']=this['_textDelay'];if(this['_textDelay']<=0x0)this[_0x3af3ee(0x221)]=!![];},VisuMZ[_0x5fa1a5(0x203)]['Window_Message_processEscapeCharacter']=Window_Message[_0x5fa1a5(0x26f)]['processEscapeCharacter'],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x269)]=function(_0x567539,_0x590985){const _0x33faae=_0x5fa1a5;!_0x590985[_0x33faae(0x181)]?Window_Base[_0x33faae(0x26f)][_0x33faae(0x269)][_0x33faae(0x1f8)](this,_0x567539,_0x590985):'BJzKV'==='BJzKV'?VisuMZ[_0x33faae(0x203)][_0x33faae(0x20f)]['call'](this,_0x567539,_0x590985):this[_0x33faae(0x217)]&&(this[_0x33faae(0x217)][_0x33faae(0x27e)]()?this[_0x33faae(0x217)][_0x33faae(0x3c2)]():this[_0x33faae(0x1b9)]());},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x26a)]=Window_Message[_0x5fa1a5(0x26f)]['needsNewPage'],Window_Message['prototype'][_0x5fa1a5(0x2c8)]=function(_0x55d535){const _0x20aeb3=_0x5fa1a5;if(this[_0x20aeb3(0x23e)])return![];return VisuMZ[_0x20aeb3(0x203)][_0x20aeb3(0x26a)][_0x20aeb3(0x1f8)](this,_0x55d535);},Window_Message['prototype']['prepareForcedPositionEscapeCharacters']=function(_0x23811a){const _0x3eb01f=_0x5fa1a5;let _0x4be7df=_0x23811a[_0x3eb01f(0x392)];this[_0x3eb01f(0x233)]={};if(this[_0x3eb01f(0x3b1)]())return _0x4be7df;_0x4be7df=_0x4be7df[_0x3eb01f(0x204)](/<POSITION:[ ]*(.*)>/gi,(_0x59ac8c,_0xa823aa)=>{const _0x5c4209=_0x3eb01f,_0xa7de8a=_0xa823aa['split'](',')['map'](_0x4d9465=>Number(_0x4d9465)||0x0);if(_0xa7de8a[0x0]!==undefined)this[_0x5c4209(0x233)]['x']=Number(_0xa7de8a[0x0]);if(_0xa7de8a[0x1]!==undefined)this[_0x5c4209(0x233)]['y']=Number(_0xa7de8a[0x1]);if(_0xa7de8a[0x2]!==undefined)this[_0x5c4209(0x233)][_0x5c4209(0x3c3)]=Number(_0xa7de8a[0x2]);if(_0xa7de8a[0x3]!==undefined)this[_0x5c4209(0x233)][_0x5c4209(0x3dc)]=Number(_0xa7de8a[0x3]);return'';}),_0x4be7df=_0x4be7df[_0x3eb01f(0x204)](/<COORDINATES:[ ]*(.*)>/gi,(_0x4acfde,_0x51172b)=>{const _0x2fdc0a=_0x3eb01f,_0x37f524=_0x51172b[_0x2fdc0a(0x243)](',')[_0x2fdc0a(0x1f3)](_0x4ee3e3=>Number(_0x4ee3e3)||0x0);if(_0x37f524[0x0]!==undefined)this[_0x2fdc0a(0x233)]['x']=Number(_0x37f524[0x0]);if(_0x37f524[0x1]!==undefined)this[_0x2fdc0a(0x233)]['y']=Number(_0x37f524[0x1]);return'';}),_0x4be7df=_0x4be7df[_0x3eb01f(0x204)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x258686,_0x157c54)=>{const _0x3ae828=_0x3eb01f,_0x31b56f=_0x157c54[_0x3ae828(0x243)](',')['map'](_0x295833=>Number(_0x295833)||0x0);if(_0x31b56f[0x0]!==undefined)this[_0x3ae828(0x233)][_0x3ae828(0x3c3)]=Number(_0x31b56f[0x2]);if(_0x31b56f[0x1]!==undefined)this['_forcedPosition'][_0x3ae828(0x3dc)]=Number(_0x31b56f[0x3]);return'';}),_0x4be7df=_0x4be7df['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x1e3d00,_0x19a36b)=>{const _0x15b361=_0x3eb01f,_0x5e9a3a=_0x19a36b[_0x15b361(0x243)](',')[_0x15b361(0x1f3)](_0x39056a=>Number(_0x39056a)||0x0);let _0x5893c7=_0x5e9a3a[0x0]||0x0,_0x1a93be=_0x5e9a3a[0x1]||0x0;return $gameSystem[_0x15b361(0x1ec)](_0x5893c7,_0x1a93be),'';}),_0x23811a[_0x3eb01f(0x392)]=_0x4be7df;},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1e6)]=function(){const _0x40cf69=_0x5fa1a5,_0x55a66f=$gameSystem[_0x40cf69(0x39c)]();this['x']+=_0x55a66f['x'],this['y']+=_0x55a66f['y'];},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x341)]=function(){const _0x530e2b=_0x5fa1a5;this['_forcedPosition']=this[_0x530e2b(0x233)]||{};const _0x49f52d=['x','y',_0x530e2b(0x3c3),_0x530e2b(0x3dc)];for(const _0x14fa28 of _0x49f52d){this[_0x530e2b(0x233)][_0x14fa28]!==undefined&&(this[_0x14fa28]=Number(this['_forcedPosition'][_0x14fa28]));}},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x34b)]=function(_0xabeceb){const _0x263eda=_0x5fa1a5;this['_currentAutoSize']=![];let _0x4c243a=_0xabeceb[_0x263eda(0x392)];_0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x410dbe=_0x263eda;return this[_0x410dbe(0x31d)](_0x4c243a,!![],!![]),this['processAutoPosition'](_0x410dbe(0x23d)),'';}),_0x4c243a=_0x4c243a['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x2fda78=_0x263eda;return this[_0x2fda78(0x31d)](_0x4c243a,!![],![]),this[_0x2fda78(0x210)](_0x2fda78(0x23d)),'';}),_0x4c243a=_0x4c243a['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x19730a=_0x263eda;return this['processAutoSize'](_0x4c243a,![],!![]),this[_0x19730a(0x210)]('none'),'';});if(SceneManager[_0x263eda(0x25b)]()){if(_0x263eda(0x279)!==_0x263eda(0x279)){const _0xbe9c8a=_0x2d688d['$1']['split'](',')[_0x263eda(0x1f3)](_0x2c6cd1=>_0x4b90e1(_0x2c6cd1)||0x0);for(const _0x34dd4f of _0xbe9c8a){if(!_0x3eeb9f[_0x263eda(0x141)](_0x34dd4f))return!![];}return![];}else _0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x318759,_0x24aae7)=>{const _0x2f9098=_0x263eda;return this[_0x2f9098(0x31d)](_0x4c243a,!![],!![]),this[_0x2f9098(0x210)](_0x2f9098(0x154),Number(_0x24aae7)||0x1),'';}),_0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3abd88,_0x4872fe)=>{const _0x18bcd8=_0x263eda;return this['processAutoSize'](_0x4c243a,!![],!![]),this[_0x18bcd8(0x210)](_0x18bcd8(0x3bf),Number(_0x4872fe)||0x0),'';}),_0x4c243a=_0x4c243a['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2effbd,_0x3f3d0c)=>{const _0x53ccfd=_0x263eda;return this[_0x53ccfd(0x31d)](_0x4c243a,!![],!![]),this[_0x53ccfd(0x210)](_0x53ccfd(0x3ee),Number(_0x3f3d0c)||0x0),'';});}else SceneManager[_0x263eda(0x246)]()&&(_0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x190eba,_0x49ed8f)=>{const _0x6f8fde=_0x263eda;if(_0x6f8fde(0x3e2)===_0x6f8fde(0x3e2))return this[_0x6f8fde(0x31d)](_0x4c243a,!![],!![]),this[_0x6f8fde(0x210)]('map\x20player',0x0),'';else _0x23510d[_0x6f8fde(0x203)][_0x6f8fde(0x2a4)](_0x2a67f1,_0x4dd7e6[_0x6f8fde(0x1b4)]),_0x543844['MessageCore'][_0x6f8fde(0x2a4)](_0x232cb6,_0x1742ac['Skills']),_0x421bf1['MessageCore'][_0x6f8fde(0x2a4)](_0x1ec308,_0x3f2433[_0x6f8fde(0x349)]),_0x25fef3[_0x6f8fde(0x203)][_0x6f8fde(0x2a4)](_0x50bdbe,_0x37aeac[_0x6f8fde(0x157)]),_0x287eb[_0x6f8fde(0x203)][_0x6f8fde(0x2a4)](_0x1d33c8,_0x5b0cdb[_0x6f8fde(0x2ab)]),_0x45f84c['MessageCore']['AddAutoColor'](_0x1dc251,_0x163f0e[_0x6f8fde(0x403)]),_0x156268[_0x6f8fde(0x203)]['AddAutoColor'](_0x261212,_0x58e98e[_0x6f8fde(0x313)]);}),_0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x1faff4,_0x2f42d3)=>{const _0x587066=_0x263eda;return this[_0x587066(0x31d)](_0x4c243a,!![],!![]),this[_0x587066(0x210)]('map\x20actor',Number(_0x2f42d3)||0x1),'';}),_0x4c243a=_0x4c243a['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x40445c,_0x30ab2c)=>{const _0x30b4d8=_0x263eda;return this[_0x30b4d8(0x31d)](_0x4c243a,!![],!![]),this['processAutoPosition'](_0x30b4d8(0x2d6),Number(_0x30ab2c)||0x0),'';}),_0x4c243a=_0x4c243a[_0x263eda(0x204)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1b0f01,_0x49f23e)=>{const _0x8c70f6=_0x263eda;return _0x8c70f6(0x36f)===_0x8c70f6(0x33b)?0x0:(this[_0x8c70f6(0x31d)](_0x4c243a,!![],!![]),this[_0x8c70f6(0x210)](_0x8c70f6(0x30d),Number(_0x49f23e)||0x0),'');}));_0xabeceb[_0x263eda(0x392)]=_0x4c243a;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x5fa1a5(0x272)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x5fa1a5(0x31d)]=function(_0x39c2db,_0xb0d116,_0x1126bc){const _0x59ee21=_0x5fa1a5;_0x39c2db=_0x39c2db[_0x59ee21(0x204)](Window_Message[_0x59ee21(0x300)],''),_0x39c2db=_0x39c2db[_0x59ee21(0x204)](Window_Message[_0x59ee21(0x272)],''),this[_0x59ee21(0x180)]=!![],this[_0x59ee21(0x23e)]=!![],this[_0x59ee21(0x2cb)](![]);const _0x108822=this[_0x59ee21(0x1dd)](_0x39c2db);if(_0xb0d116){if(_0x59ee21(0x2b0)==='yRndX')return this['processAutoSize'](_0x451678,!![],!![]),this[_0x59ee21(0x210)](_0x59ee21(0x28a),_0x9fa641(_0x49695e)||0x1),'';else{let _0x8cfbc8=_0x108822[_0x59ee21(0x3c3)]+$gameSystem[_0x59ee21(0x3f3)]()*0x2+0x6;const _0x19d6af=$gameMessage[_0x59ee21(0x3db)]()!=='',_0x19d104=ImageManager[_0x59ee21(0x2af)],_0x1b2c96=0x14;_0x8cfbc8+=_0x19d6af?_0x19d104+_0x1b2c96:0x4;if(_0x8cfbc8%0x2!==0x0)_0x8cfbc8+=0x1;$gameSystem['setMessageWindowWidth'](_0x8cfbc8);}}if(_0x1126bc){if('gCtGa'===_0x59ee21(0x26e)){let _0x11ecbc=Math['ceil'](_0x108822[_0x59ee21(0x3dc)]/this[_0x59ee21(0x227)]());$gameSystem[_0x59ee21(0x22a)](_0x11ecbc);}else _0x101752=_0x5e3ecd['floor']((this['width']-_0x5d3bf0['width'])/0x2);}this[_0x59ee21(0x2bd)](),this[_0x59ee21(0x1b3)](),this['_autoSizeCheck']=![],this[_0x59ee21(0x2f9)]=!![];},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2bd)]=function(){const _0x45178e=_0x5fa1a5;this['updateDimensions'](),this[_0x45178e(0x35a)](),this[_0x45178e(0x231)](),this[_0x45178e(0x2ba)](),this[_0x45178e(0x247)][_0x45178e(0x1b9)](),this[_0x45178e(0x1f0)]();},Window_Message['prototype'][_0x5fa1a5(0x210)]=function(_0x4c8aea,_0x13333a){const _0x36c8de=_0x5fa1a5;switch(_0x4c8aea[_0x36c8de(0x16d)]()['trim']()){case _0x36c8de(0x154):this[_0x36c8de(0x19f)]=$gameActors[_0x36c8de(0x17c)](_0x13333a);break;case'battle\x20party':this[_0x36c8de(0x19f)]=$gameParty[_0x36c8de(0x383)]()[_0x13333a-0x1];break;case _0x36c8de(0x3ee):this['_autoPositionTarget']=$gameTroop[_0x36c8de(0x383)]()[_0x13333a-0x1];break;case'map\x20player':this['_autoPositionTarget']=$gamePlayer;break;case _0x36c8de(0x28a):const _0x5bc556=$gameActors[_0x36c8de(0x17c)](_0x13333a)[_0x36c8de(0x412)]();_0x5bc556===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x36c8de(0x19f)]=$gamePlayer[_0x36c8de(0x37a)]()[_0x36c8de(0x33f)](_0x5bc556-0x1);break;case _0x36c8de(0x2d6):if(_0x13333a===0x1){if(_0x36c8de(0x242)!==_0x36c8de(0x242)){if(_0x338f6a[_0x36c8de(0x1e7)]()){}else _0x389cc5[_0x36c8de(0x14d)](_0x26f38b);}else this[_0x36c8de(0x19f)]=$gamePlayer;}else this[_0x36c8de(0x19f)]=$gamePlayer[_0x36c8de(0x37a)]()[_0x36c8de(0x33f)](_0x13333a-0x2);break;case _0x36c8de(0x30d):this[_0x36c8de(0x19f)]=$gameMap[_0x36c8de(0x23f)](_0x13333a);break;}this['_autoPositionTarget']&&this[_0x36c8de(0x1d5)]();},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x2a0)]=Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2ef)],Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2ef)]=function(){const _0x17da1a=_0x5fa1a5;this[_0x17da1a(0x1d5)](),VisuMZ[_0x17da1a(0x203)][_0x17da1a(0x2a0)][_0x17da1a(0x1f8)](this);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1d5)]=function(){const _0x166c5b=_0x5fa1a5;if(!this[_0x166c5b(0x19f)])return;const _0xdf8798=SceneManager[_0x166c5b(0x3df)];if(!_0xdf8798)return;if(!_0xdf8798[_0x166c5b(0x2f0)])return;const _0x217c13=_0xdf8798['_spriteset'][_0x166c5b(0x1d1)](this[_0x166c5b(0x19f)]);if(!_0x217c13)return;let _0x4e309c=_0x217c13['x'];_0x4e309c-=this[_0x166c5b(0x3c3)]/0x2,_0x4e309c-=(Graphics[_0x166c5b(0x3c3)]-Graphics[_0x166c5b(0x308)])/0x2,_0x4e309c+=this['autoPositionOffsetX']();let _0x315b62=_0x217c13['y'];_0x315b62-=this['height'],_0x315b62-=(Graphics[_0x166c5b(0x3dc)]-Graphics['boxHeight'])/0x2,_0x315b62+=this['autoPositionOffsetY'](),_0x315b62-=_0x217c13[_0x166c5b(0x3dc)]+0x8;const _0x49ebef=$gameSystem[_0x166c5b(0x39c)]();_0x4e309c+=_0x49ebef['x'],_0x315b62+=_0x49ebef['y'],this['x']=Math[_0x166c5b(0x1fc)](_0x4e309c),this['y']=Math[_0x166c5b(0x1fc)](_0x315b62),this[_0x166c5b(0x3a0)](!![],![]),this['_forcedPosition']=this[_0x166c5b(0x233)]||{},this['_forcedPosition']['x']=this['x'],this[_0x166c5b(0x233)]['y']=this['y'],this['_forcedPosition'][_0x166c5b(0x3c3)]=this[_0x166c5b(0x3c3)],this[_0x166c5b(0x233)][_0x166c5b(0x3dc)]=this[_0x166c5b(0x3dc)],this[_0x166c5b(0x337)]['updatePlacement']();},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3fd)]=function(){return 0x0;},Window_Message[_0x5fa1a5(0x26f)]['autoPositionOffsetY']=function(){return 0x0;},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x241)]=function(){const _0x133b21=_0x5fa1a5;this[_0x133b21(0x2f9)]=![],this[_0x133b21(0x19f)]=undefined,$gameSystem['initMessageCore'](),this['updateAutoSizePosition'](),this[_0x133b21(0x17a)]=0x0;},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x23a)]=function(_0x5dac21){const _0x2e19c4=_0x5fa1a5;return Window_Base[_0x2e19c4(0x26f)]['preConvertEscapeCharacters'][_0x2e19c4(0x1f8)](this,_0x5dac21);},Window_Message['prototype'][_0x5fa1a5(0x192)]=function(_0x2fc620){const _0x19aec7=_0x5fa1a5;return Window_Base['prototype']['postConvertEscapeCharacters'][_0x19aec7(0x1f8)](this,_0x2fc620);},Window_Message['prototype'][_0x5fa1a5(0x186)]=function(_0x62c4ec){const _0x4ec7ee=_0x5fa1a5;this[_0x4ec7ee(0x1e9)](_0x62c4ec),Window_Base[_0x4ec7ee(0x26f)][_0x4ec7ee(0x186)][_0x4ec7ee(0x1f8)](this,_0x62c4ec),this[_0x4ec7ee(0x155)](_0x62c4ec);},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1e9)]=function(_0x520326){},Window_Message[_0x5fa1a5(0x26f)][_0x5fa1a5(0x155)]=function(_0x13e873){},Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x296)]=function(){return![];},Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1bd)]=function(){const _0x32941e=_0x5fa1a5;Window_Base[_0x32941e(0x26f)][_0x32941e(0x1bd)][_0x32941e(0x1f8)](this),this[_0x32941e(0x28b)](this[_0x32941e(0x1fd)]());},Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1fd)]=function(){const _0x1ac606=_0x5fa1a5,_0x11295c=VisuMZ[_0x1ac606(0x203)]['Settings'][_0x1ac606(0x169)][_0x1ac606(0x25a)];return ColorManager[_0x1ac606(0x320)](_0x11295c);},VisuMZ[_0x5fa1a5(0x203)]['Window_NameBox_updatePlacement']=Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x35a)],Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x35a)]=function(){const _0x2b46f6=_0x5fa1a5;VisuMZ[_0x2b46f6(0x203)]['Window_NameBox_updatePlacement'][_0x2b46f6(0x1f8)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x2b46f6(0x3a0)](),this[_0x2b46f6(0x35b)]();},Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x23a)]=function(_0x563e9e){const _0x4d25cc=_0x5fa1a5;return _0x563e9e=_0x563e9e['replace'](/<LEFT>/gi,this['setRelativePosition']['bind'](this,0x0)),_0x563e9e=_0x563e9e[_0x4d25cc(0x204)](/<CENTER>/gi,this['setRelativePosition'][_0x4d25cc(0x24d)](this,0x5)),_0x563e9e=_0x563e9e['replace'](/<RIGHT>/gi,this[_0x4d25cc(0x24f)][_0x4d25cc(0x24d)](this,0xa)),_0x563e9e=_0x563e9e['replace'](/<POSITION:[ ](\d+)>/gi,(_0xd3be84,_0xefc29)=>this[_0x4d25cc(0x24f)](parseInt(_0xefc29))),_0x563e9e=_0x563e9e['replace'](/<\/LEFT>/gi,''),_0x563e9e=_0x563e9e[_0x4d25cc(0x204)](/<\/CENTER>/gi,''),_0x563e9e=_0x563e9e[_0x4d25cc(0x204)](/<\/RIGHT>/gi,''),Window_Base[_0x4d25cc(0x26f)][_0x4d25cc(0x23a)]['call'](this,_0x563e9e);},Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x24f)]=function(_0x24cf62){const _0x5eefc9=_0x5fa1a5;return this[_0x5eefc9(0x15b)]=_0x24cf62,'';},Window_NameBox['prototype'][_0x5fa1a5(0x331)]=function(){const _0x37e08f=_0x5fa1a5;if($gameMessage[_0x37e08f(0x3e8)]())return;this['_relativePosition']=this[_0x37e08f(0x15b)]||0x0;const _0x1b1130=this['_messageWindow'],_0x3d995b=Math[_0x37e08f(0x3ab)](_0x1b1130['width']*this['_relativePosition']/0xa);this['x']=_0x1b1130['x']+_0x3d995b-Math[_0x37e08f(0x3ab)](this[_0x37e08f(0x3c3)]/0x2),this['x']=this['x'][_0x37e08f(0x20d)](_0x1b1130['x'],_0x1b1130['x']+_0x1b1130[_0x37e08f(0x3c3)]-this[_0x37e08f(0x3c3)]);},Window_NameBox[_0x5fa1a5(0x26f)]['updateOffsetPosition']=function(){const _0x4bd781=_0x5fa1a5;if($gameMessage[_0x4bd781(0x3e8)]())return;this[_0x4bd781(0x15b)]=this[_0x4bd781(0x15b)]||0x0;const _0x445a28=VisuMZ['MessageCore'][_0x4bd781(0x2a9)][_0x4bd781(0x169)][_0x4bd781(0x29e)],_0x340eb1=VisuMZ[_0x4bd781(0x203)]['Settings'][_0x4bd781(0x169)][_0x4bd781(0x183)],_0xdedb05=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x4bd781(0x3ab)](_0x445a28*_0xdedb05),this['y']+=_0x340eb1;},Window_NameBox['prototype'][_0x5fa1a5(0x35b)]=function(){const _0x1dbf38=_0x5fa1a5,_0x880a48=this[_0x1dbf38(0x33e)],_0x157f8a=_0x880a48['y'],_0x2cc771=VisuMZ[_0x1dbf38(0x203)][_0x1dbf38(0x2a9)][_0x1dbf38(0x169)][_0x1dbf38(0x183)];_0x157f8a>this['y']&&_0x157f8a<this['y']+this[_0x1dbf38(0x3dc)]-_0x2cc771&&(this['y']=_0x880a48['y']+_0x880a48['height']);},VisuMZ['MessageCore']['Window_NameBox_refresh']=Window_NameBox['prototype']['refresh'],Window_NameBox[_0x5fa1a5(0x26f)][_0x5fa1a5(0x255)]=function(){const _0x5e756f=_0x5fa1a5;this[_0x5e756f(0x15b)]=0x0,VisuMZ[_0x5e756f(0x203)]['Window_NameBox_refresh'][_0x5e756f(0x1f8)](this);},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x3b1)]=function(){return![];},Window_ChoiceList['prototype']['isAutoColorAffected']=function(){return!![];},Window_ChoiceList['prototype'][_0x5fa1a5(0x351)]=function(){const _0x4941ab=_0x5fa1a5;return $gameSystem[_0x4941ab(0x228)]()+0x8;},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x401)]=function(){const _0x58eec2=_0x5fa1a5;return $gameSystem[_0x58eec2(0x2ff)]();},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x1ea)]=function(){const _0x35df5b=_0x5fa1a5;this[_0x35df5b(0x255)](),this['selectDefault'](),this['open'](),this[_0x35df5b(0x1c8)]();},Window_ChoiceList[_0x5fa1a5(0x26f)]['refresh']=function(){const _0x8fa826=_0x5fa1a5;this['clearCommandList'](),this['makeCommandList'](),this[_0x8fa826(0x33e)]&&(this[_0x8fa826(0x35a)](),this[_0x8fa826(0x14c)]()),this[_0x8fa826(0x1f0)](),this[_0x8fa826(0x19b)](),this[_0x8fa826(0x39b)](),Window_Selectable['prototype']['refresh'][_0x8fa826(0x1f8)](this);},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x361)]=function(){const _0x4a1812=_0x5fa1a5,_0x451504=$gameMessage['choices']();let _0x388da9=0x0;for(let _0x2c6fc5 of _0x451504){_0x2c6fc5=this[_0x4a1812(0x387)](_0x2c6fc5);if(this[_0x4a1812(0x3cb)](_0x2c6fc5)){if(_0x4a1812(0x378)===_0x4a1812(0x2fe))!_0x188991['drawing']?_0x282172['prototype'][_0x4a1812(0x269)][_0x4a1812(0x1f8)](this,_0x18fb8f,_0xcb2ae9):_0x4334df[_0x4a1812(0x203)][_0x4a1812(0x20f)]['call'](this,_0x225b93,_0x3e0d9a);else{const _0x41b765=this['parseChoiceText'](_0x2c6fc5),_0x534559=this['isChoiceEnabled'](_0x2c6fc5);this['addCommand'](_0x41b765,'choice',_0x534559,_0x388da9);}}_0x388da9++;}},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x387)]=function(_0x1be0f2){const _0x222b85=_0x5fa1a5;return Window_Base[_0x222b85(0x26f)][_0x222b85(0x388)][_0x222b85(0x1f8)](this,_0x1be0f2);},Window_ChoiceList['prototype'][_0x5fa1a5(0x3cb)]=function(_0x509be6){const _0x52c10d=_0x5fa1a5;if(Imported[_0x52c10d(0x3ff)])$gameMessage[_0x52c10d(0x32d)]();if(_0x509be6['match'](/<HIDE>/i))return![];if(_0x509be6[_0x52c10d(0x2ee)](/<SHOW>/i))return!![];if(_0x509be6['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('WNZCX'===_0x52c10d(0x2c7)){if(!_0x451f7a['isSceneBattle']())return'';let _0x5958a4=_0x8e607d[_0x52c10d(0x353)]||null;!_0x5958a4&&_0x1e0dee['isInputting']()&&(_0x5958a4=_0x55d37c[_0x52c10d(0x182)]());if(_0x5958a4&&_0x5958a4[_0x52c10d(0x3c8)]()){let _0x4616a7='';if(_0x37378b)_0x4616a7+=_0x52c10d(0x275)['format'](_0x5958a4[_0x52c10d(0x3c8)]()[_0x52c10d(0x15a)]);return _0x4616a7+=_0x5958a4['item']()[_0x52c10d(0x3c7)],_0x4616a7;}return'';}else{const _0x4e84cf=RegExp['$1']['split'](',')['map'](_0x248370=>Number(_0x248370)||0x0);for(const _0x224999 of _0x4e84cf){if('AmqcM'===_0x52c10d(0x2f6))this[_0x52c10d(0x247)][_0x52c10d(0x362)]=_0x3a1796[_0x52c10d(0x178)](),this[_0x52c10d(0x247)][_0x52c10d(0x212)]=_0x384eeb[_0x52c10d(0x2f7)](),this[_0x52c10d(0x247)]['fontBold']=![],this['contents'][_0x52c10d(0x17d)]=![],this[_0x52c10d(0x1bd)]();else{if(!$gameSwitches[_0x52c10d(0x141)](_0x224999))return![];}}return!![];}}if(_0x509be6[_0x52c10d(0x2ee)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x52c10d(0x3a8)===_0x52c10d(0x3a8)){const _0x3edff4=RegExp['$1'][_0x52c10d(0x243)](',')[_0x52c10d(0x1f3)](_0x136f1c=>Number(_0x136f1c)||0x0);for(const _0x43abeb of _0x3edff4){if(!$gameSwitches['value'](_0x43abeb))return![];}return!![];}else return![];}if(_0x509be6[_0x52c10d(0x2ee)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x52c10d(0x379)===_0x52c10d(0x334))return _0x30ede5[_0x52c10d(0x412)]+=_0x945b6a[0x0][_0x52c10d(0x1d2)],_0x2e3ad1(_0x54ff2c[0x0][_0x52c10d(0x28f)](0x1,_0x28d1ea[0x0][_0x52c10d(0x1d2)]-0x1));else{const _0x1322dc=RegExp['$1'][_0x52c10d(0x243)](',')[_0x52c10d(0x1f3)](_0x3981ee=>Number(_0x3981ee)||0x0);for(const _0x4a648f of _0x1322dc){if($gameSwitches['value'](_0x4a648f))return!![];}return![];}}if(_0x509be6['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x52c10d(0x2d9)===_0x52c10d(0x2d9)){const _0x156fb4=RegExp['$1'][_0x52c10d(0x243)](',')[_0x52c10d(0x1f3)](_0x542b92=>Number(_0x542b92)||0x0);for(const _0x19d924 of _0x156fb4){if('oGSCB'!=='oGSCB')return![];else{if(!$gameSwitches[_0x52c10d(0x141)](_0x19d924))return!![];}}return![];}else return this['_scene']&&this['_scene'][_0x52c10d(0x41f)]===_0x36dc7f;}if(_0x509be6[_0x52c10d(0x2ee)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x52c10d(0x36a)==='vFCHW'){const _0x18c90f=_0x2fd0f2[_0x52c10d(0x33c)]()[_0x52c10d(0x1f3)](_0x1c91d8=>this['convertChoiceMacros'](_0x1c91d8))[_0x52c10d(0x24a)](_0x3741fc=>this[_0x52c10d(0x3cb)](_0x3741fc)),_0x51452d=_0x4965ce[_0x52c10d(0x3e9)](_0x18c90f['length']/this[_0x52c10d(0x401)]());return _0x815d2b[_0x52c10d(0x413)](0x1,_0x489bff[_0x52c10d(0x3a6)](_0x51452d,this[_0x52c10d(0x2f5)]()));}else{const _0x188f6=RegExp['$1']['split'](',')[_0x52c10d(0x1f3)](_0x222ace=>Number(_0x222ace)||0x0);for(const _0x5c8aa1 of _0x188f6){if(!$gameSwitches[_0x52c10d(0x141)](_0x5c8aa1))return!![];}return![];}}if(_0x509be6[_0x52c10d(0x2ee)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x52c10d(0x146)!==_0x52c10d(0x142)){const _0x105cf8=RegExp['$1'][_0x52c10d(0x243)](',')['map'](_0x20aec2=>Number(_0x20aec2)||0x0);for(const _0x19434b of _0x105cf8){if($gameSwitches[_0x52c10d(0x141)](_0x19434b))return![];}return!![];}else{if(_0x424c69[_0x52c10d(0x3e8)]())return;this[_0x52c10d(0x15b)]=this[_0x52c10d(0x15b)]||0x0;const _0x315eda=this[_0x52c10d(0x33e)],_0xcf6316=_0x54f391[_0x52c10d(0x3ab)](_0x315eda['width']*this['_relativePosition']/0xa);this['x']=_0x315eda['x']+_0xcf6316-_0x3b8a34[_0x52c10d(0x3ab)](this['width']/0x2),this['x']=this['x']['clamp'](_0x315eda['x'],_0x315eda['x']+_0x315eda[_0x52c10d(0x3c3)]-this['width']);}}return!![];},Window_ChoiceList['prototype'][_0x5fa1a5(0x38d)]=function(_0x4a3598){const _0x2d0ba2=_0x5fa1a5;let _0x3fd3b7=_0x4a3598;return _0x3fd3b7=_0x3fd3b7[_0x2d0ba2(0x204)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3fd3b7=_0x3fd3b7[_0x2d0ba2(0x204)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3fd3b7;},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x206)]=function(_0x292575){const _0x2c7316=_0x5fa1a5;if(Imported[_0x2c7316(0x3ff)])$gameMessage[_0x2c7316(0x32d)]();if(_0x292575[_0x2c7316(0x2ee)](/<DISABLE>/i))return![];if(_0x292575[_0x2c7316(0x2ee)](/<ENABLE>/i))return!![];if(_0x292575['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x2c7316(0x3ef)!==_0x2c7316(0x148)){const _0x1153f6=RegExp['$1']['split'](',')[_0x2c7316(0x1f3)](_0x4f5f94=>Number(_0x4f5f94)||0x0);for(const _0x58049c of _0x1153f6){if('NrRJG'===_0x2c7316(0x24b)){if(!$gameSwitches[_0x2c7316(0x141)](_0x58049c))return![];}else _0x631e3=_0x192cfd[_0x2c7316(0x204)](/[\n\r]+/g,''),_0x3bb31f=_0x1d8fb4['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return!![];}else{const _0x282636=_0x7fc46a[_0x2c7316(0x26f)]['processCommonEvent'][_0x2c7316(0x1f8)](this,_0x3b4d36);_0x5c8fb3[_0x2c7316(0x181)]&&this[_0x2c7316(0x199)](_0x282636);}}if(_0x292575[_0x2c7316(0x2ee)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x9ddbea=RegExp['$1'][_0x2c7316(0x243)](',')[_0x2c7316(0x1f3)](_0x545f3a=>Number(_0x545f3a)||0x0);for(const _0x7b528 of _0x9ddbea){if(_0x2c7316(0x16e)===_0x2c7316(0x16e)){if(!$gameSwitches[_0x2c7316(0x141)](_0x7b528))return![];}else _0x1063de[_0x2c7316(0x26f)]['refreshDimmerBitmap'][_0x2c7316(0x1f8)](this),_0x1ca9e4[_0x2c7316(0x203)][_0x2c7316(0x2a9)][_0x2c7316(0x169)][_0x2c7316(0x18f)]&&this[_0x2c7316(0x156)]();}return!![];}if(_0x292575['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('xZkgy'==='xZkgy'){const _0x460df7=RegExp['$1'][_0x2c7316(0x243)](',')[_0x2c7316(0x1f3)](_0x2d14bf=>Number(_0x2d14bf)||0x0);for(const _0x5af250 of _0x460df7){if($gameSwitches[_0x2c7316(0x141)](_0x5af250))return!![];}return![];}else this['_interpreter']=null;}if(_0x292575[_0x2c7316(0x2ee)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xec6d35=RegExp['$1']['split'](',')['map'](_0x7cd5a=>Number(_0x7cd5a)||0x0);for(const _0x578e89 of _0xec6d35){if(!$gameSwitches[_0x2c7316(0x141)](_0x578e89))return!![];}return![];}if(_0x292575[_0x2c7316(0x2ee)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x2c7316(0x348)!==_0x2c7316(0x348))_0x225249=this['processStoredAutoColorChanges'](_0x27b4d0),_0x53e2b1=this[_0x2c7316(0x34a)](_0x51bd48);else{const _0xb322b8=RegExp['$1']['split'](',')['map'](_0x32f5ef=>Number(_0x32f5ef)||0x0);for(const _0x4beaa5 of _0xb322b8){if(_0x2c7316(0x3fe)!==_0x2c7316(0x3f7)){if(!$gameSwitches['value'](_0x4beaa5))return!![];}else for(const _0x1e6649 of _0x1b30e9[_0x2c7316(0x203)][_0x2c7316(0x2a9)]['TextCodeActions']){if(_0x1e6649[_0x2c7316(0x287)]===_0x4ddae4){if(_0x1e6649[_0x2c7316(0x1e3)]==='')this['obtainEscapeParam'](_0x5dbbab);_0x1e6649['ActionJS']['call'](this,_0x15f56f);if(this['constructor']===_0x547ee3){const _0xaaf597=_0x1e6649[_0x2c7316(0x326)]||0x0;if(_0xaaf597>0x0)this[_0x2c7316(0x199)](_0xaaf597);}}}}return![];}}if(_0x292575[_0x2c7316(0x2ee)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x2c7316(0x1c0)!==_0x2c7316(0x1c0)){if(this['_pictureText']===_0x137756)this[_0x2c7316(0x22b)]();const _0x57661f=this['realPictureId'](_0x5aa720);this[_0x2c7316(0x1d6)][_0x57661f]=_0x142a02;}else{const _0xf3dfe4=RegExp['$1'][_0x2c7316(0x243)](',')[_0x2c7316(0x1f3)](_0x266fe7=>Number(_0x266fe7)||0x0);for(const _0x2f3a80 of _0xf3dfe4){if($gameSwitches['value'](_0x2f3a80))return![];}return!![];}}return!![];},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x1ee)]=Window_ChoiceList['prototype'][_0x5fa1a5(0x35a)],Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x35a)]=function(){const _0x48d771=_0x5fa1a5;VisuMZ[_0x48d771(0x203)][_0x48d771(0x1ee)][_0x48d771(0x1f8)](this),this[_0x48d771(0x3a0)]();},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x14c)]=function(){const _0x14693b=_0x5fa1a5;if(!this[_0x14693b(0x330)])return;const _0x4a1033=0x8,_0x51e299=this[_0x14693b(0x330)],_0x43b331=this['x']+this[_0x14693b(0x3c3)],_0x59797b=Math[_0x14693b(0x3ab)]((Graphics['width']-Graphics[_0x14693b(0x308)])/0x2);_0x43b331>=Graphics[_0x14693b(0x308)]+_0x59797b-_0x51e299[_0x14693b(0x3c3)]+_0x4a1033?_0x51e299['x']=-_0x51e299[_0x14693b(0x3c3)]-_0x4a1033:_0x51e299['x']=this[_0x14693b(0x3c3)]+_0x4a1033,_0x51e299['y']=this[_0x14693b(0x3dc)]/0x2-_0x51e299[_0x14693b(0x3dc)]/0x2;},VisuMZ[_0x5fa1a5(0x203)][_0x5fa1a5(0x3f0)]=Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x38a)],Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x38a)]=function(){const _0x52e08c=_0x5fa1a5;if(this[_0x52e08c(0x33e)])return this[_0x52e08c(0x175)]();else{if(_0x52e08c(0x3bc)!==_0x52e08c(0x3bc)){_0x1b631a[_0x52e08c(0x203)]['Window_Message_terminateMessage'][_0x52e08c(0x1f8)](this),this['clearFlags']();if(this[_0x52e08c(0x2f9)])this[_0x52e08c(0x241)]();}else return VisuMZ['MessageCore'][_0x52e08c(0x3f0)][_0x52e08c(0x1f8)](this);}},Window_ChoiceList['prototype'][_0x5fa1a5(0x175)]=function(){const _0xdbe2cc=_0x5fa1a5,_0x2d9034=$gameMessage[_0xdbe2cc(0x2ce)]();if(_0x2d9034===0x1){if(_0xdbe2cc(0x338)===_0xdbe2cc(0x339)){const _0x31fcda=_0xdbe2cc(0x15e);_0xe85ace=_0x31fcda[_0xdbe2cc(0x3ce)](_0x3ff9ca[_0xdbe2cc(0x15a)],_0x31f12a['name']);}else return(Graphics[_0xdbe2cc(0x308)]-this[_0xdbe2cc(0x323)]())/0x2;}else{if(_0x2d9034===0x2){if(_0xdbe2cc(0x143)===_0xdbe2cc(0x25f))this['_lastGainedItemData'][_0xdbe2cc(0x2d8)]=0x0;else return this[_0xdbe2cc(0x33e)]['x']+this[_0xdbe2cc(0x33e)][_0xdbe2cc(0x3c3)]-this[_0xdbe2cc(0x323)]();}else return this[_0xdbe2cc(0x33e)]['x'];}},Window_ChoiceList['prototype'][_0x5fa1a5(0x323)]=function(){const _0x4234ee=_0x5fa1a5,_0xcd6ffc=(this[_0x4234ee(0x310)]()+this['colSpacing']())*this['maxCols']()+this[_0x4234ee(0x3ca)]*0x2;return Math[_0x4234ee(0x3a6)](_0xcd6ffc,Graphics[_0x4234ee(0x3c3)]);},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x41d)]=function(){const _0x1227ed=_0x5fa1a5,_0x58b435=$gameMessage[_0x1227ed(0x33c)]()[_0x1227ed(0x1f3)](_0x332143=>this[_0x1227ed(0x387)](_0x332143))[_0x1227ed(0x24a)](_0x2fd2e8=>this['isChoiceVisible'](_0x2fd2e8)),_0x2b09fb=Math['ceil'](_0x58b435[_0x1227ed(0x1d2)]/this[_0x1227ed(0x401)]());return Math[_0x1227ed(0x413)](0x1,Math[_0x1227ed(0x3a6)](_0x2b09fb,this[_0x1227ed(0x2f5)]()));},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2f5)]=function(){const _0x285cb9=_0x5fa1a5,_0x221362=this[_0x285cb9(0x33e)],_0x43324f=_0x221362?_0x221362['y']:0x0,_0x377202=_0x221362?_0x221362[_0x285cb9(0x3dc)]:0x0,_0x13b229=Graphics['boxHeight']/0x2;return _0x43324f<_0x13b229&&_0x43324f+_0x377202>_0x13b229?0x4:$gameSystem[_0x285cb9(0x3d9)]();},Window_ChoiceList[_0x5fa1a5(0x26f)]['maxChoiceWidth']=function(){const _0x13c463=_0x5fa1a5;let _0x291d54=this[_0x13c463(0x2da)]();for(const _0x8fd4d0 of this['_list']){const _0x38cc55=_0x8fd4d0[_0x13c463(0x3c7)],_0x19551d=this[_0x13c463(0x3be)](_0x38cc55),_0x5c37f1=this[_0x13c463(0x282)](_0x38cc55)[_0x13c463(0x3c3)]+_0x19551d,_0x5a8647=Math[_0x13c463(0x3e9)](_0x5c37f1)+this[_0x13c463(0x2bc)]()*0x2;_0x291d54=Math[_0x13c463(0x413)](_0x291d54,_0x5a8647);}return _0x291d54;},Window_ChoiceList[_0x5fa1a5(0x26f)][_0x5fa1a5(0x2da)]=function(){const _0x2d3da9=_0x5fa1a5;let _0x105eba=0x60;const _0x1f6f11=$gameMessage[_0x2d3da9(0x33c)]();for(const _0xa63eb of _0x1f6f11){_0xa63eb[_0x2d3da9(0x2ee)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x105eba=Math[_0x2d3da9(0x413)](_0x105eba,Number(RegExp['$1'])));}return _0x105eba;},Window_ChoiceList[_0x5fa1a5(0x26f)]['drawItem']=function(_0x1ed55b){const _0x47a893=_0x5fa1a5,_0x3d1270=this[_0x47a893(0x21d)](_0x1ed55b),_0x5b76b0=$gameSystem['getChoiceListTextAlign']()!=='default'?'<%1>'[_0x47a893(0x3ce)]($gameSystem[_0x47a893(0x399)]()):'',_0x23dcb9=_0x5b76b0+this[_0x47a893(0x1a4)](_0x1ed55b);this[_0x47a893(0x2d0)](this[_0x47a893(0x340)](_0x1ed55b));const _0x5214c5=this[_0x47a893(0x282)](_0x23dcb9)[_0x47a893(0x3dc)],_0x27be40=_0x3d1270['x']+this['getChoiceIndent'](_0x23dcb9),_0x3d10ae=Math[_0x47a893(0x413)](_0x3d1270['y'],_0x3d1270['y']+Math[_0x47a893(0x1fc)]((_0x3d1270[_0x47a893(0x3dc)]-_0x5214c5)/0x2));this['drawTextEx'](_0x23dcb9,_0x27be40,_0x3d10ae,_0x3d1270[_0x47a893(0x3c3)]);},Window_ChoiceList['prototype'][_0x5fa1a5(0x3be)]=function(_0x2dc651){let _0xf9f1b6=0x0;return _0x2dc651['match'](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0xf9f1b6=Number(RegExp['$1'])),_0xf9f1b6;},Window_ChoiceList['prototype'][_0x5fa1a5(0x268)]=function(){const _0x552809=_0x5fa1a5;$gameMessage[_0x552809(0x3b4)](this[_0x552809(0x1ae)]()),this[_0x552809(0x33e)][_0x552809(0x162)](),this[_0x552809(0x229)]();};