//=============================================================================
// VisuStella MZ - Message Letter Sounds
// VisuMZ_3_MessageSounds.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_MessageSounds = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MsgLetterSounds = VisuMZ.MsgLetterSounds || {};
VisuMZ.MsgLetterSounds.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [MsgLetterSounds]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Letter_Sounds_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables your messages to play sound effects per letter (or at
 * certain intervals of letters) whenever they appear in a message window.
 * Letter sounds can be used to add emotion, character, and feeling to scenes 
 * and provide audio feedback to the activity going on in the screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Declare which message letter sounds, their volume, pitch, and pan.
 * * Add variance to the volume, pitch, and pan to produce more speech-like
 *   behaviors.
 * * Blacklist certain letters from having any sounds played at all.
 * * Change the sounds through Plugin Commands and/or text codes to alter the
 *   feeling of a message.
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
 * * VisuMZ_1_MessageCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_OptionsCore
 *
 * An added option to the Audio category of the default Options Core settings
 * allow players to turn on/off the Message Letter Sounds in case they may find
 * them to be unpleasing.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that have been added through this plugin. These
 * text codes will not work with your game if the plugin is OFF or not present.
 *
 * ---
 *
 * --------------------------   -----------------------------------------------
 * Text Code                    Effect (Message Window Only)
 * --------------------------   -----------------------------------------------
 * <Letter Sound On>            Turns on the Message Letter Sounds.
 * <Letter Sound Off>           Turns off the Message letter Sounds.
 * 
 * \LetterSoundName<filename>   Changes SFX played to 'filename'. Do not use or
 *                              insert the file extension. Case sensitive.
 * \LetterSoundVolume[x]        Changes SFX volume to x value.
 * \LetterSoundPitch[x]         Changes SFX pitch to x value.
 * \LetterSoundPan[x]           Changes SFX pan to x value.
 * \LetterSoundVolumeVar[x]     Changes SFX volume variance to x value.
 * \LetterSoundPitchVar[x]      Changes SFX pitch variance to x value.
 * \LetterSoundPanVar[x]        Changes SFX pan variance to x value.
 * 
 * ---
 * 
 * For those who want to use shorter text codes:
 * 
 * ---
 * 
 * -------------   ------------------------------------------------------------
 * Text Code       Effect (Message Window Only)
 * -------------   ------------------------------------------------------------
 * 
 * \LSON           Turns on the Message Letter Sounds.
 * \LSOFF          Turns off the Message letter Sounds.
 * 
 * \LSN<filename>  Changes SFX played to 'filename'. Do not use or insert the
 *                 file extension. Case sensitive.
 * \LSV[x]         Changes SFX volume to x value.
 * \LSPI[x]        Changes SFX pitch to x value.
 * \LSPA[x]        Changes SFX pan to x value.
 * \LSVV[x]        Changes SFX volume variance to x value.
 * \LSPIV[x]       Changes SFX pitch variance to x value.
 * \LSPAV[x]       Changes SFX pan variance to x value.
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
 * === Message Sound Plugin Commands ===
 * 
 * ---
 *
 * Message Sound: Change
 * - Change the settings to the Message Sound settings below.
 *
 *   Filename:
 *   - Filename of the sound effect played.
 *
 *   Interval:
 *   - Interval the sound effect from being played between how many characters?
 *
 *   Volume:
 *   - Volume of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the volume by how much?
 *
 *   Pitch:
 *   - Pitch of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pitch by how much?
 *
 *   Pan:
 *   - Pan of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pan by how much?
 *
 * ---
 *
 * Message Sound: Reset
 * - Resets the settings to the Plugin Parameters settings.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable/Disable Letter Sounds
 * - Enables/disables Message Letter Sounds for the game.
 *
 *   Enable/Disable?:
 *   - Enables/disables Message Letter Sounds for the game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the settings that determine the default settings for the letter
 * sound as well as default enabling of the sounds. There is also a blacklist
 * here to let you decide which letter characters will not play sounds.
 *
 * ---
 *
 * Enable
 * 
 *   Default Enable?:
 *   - Enable Letter Sounds by default?
 * 
 *   Blacklisted Letters:
 *   - This is a list of individual characters that are blacklisted from having
 *     sounds play.
 *
 * ---
 *
 * Default Sound Settings
 *
 *   Filename:
 *   - Filename of the sound effect played.
 *
 *   Interval:
 *   - Interval the sound effect from being played between how many characters?
 *
 *   Volume:
 *   - Volume of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the volume by how much?
 *
 *   Pitch:
 *   - Pitch of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pitch by how much?
 *
 *   Pan:
 *   - Pan of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pan by how much?
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
 * Version 1.02: May 14, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Empty text won't prompt a message sound effect to play. Fixed by Yanfly.
 *
 * Version 1.00: January 6, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgSoundChangeMessageSound
 * @text Message Sound: Change
 * @desc Change the settings to the Message Sound settings below.
 * 
 * @arg name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Cursor3
 *
 * @arg Interval:num
 * @text Interval
 * @parent name:str
 * @type number
 * @desc Interval the sound effect from being played between how many characters?
 * @default 2
 *
 * @arg volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @arg VolVariance:num
 * @text Variance
 * @parent volume:num
 * @type number
 * @desc When playing the sound effect, vary the volume by how much?
 * @default 10
 *
 * @arg pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @arg PitchVariance:num
 * @text Variance
 * @parent pitch:num
 * @type number
 * @desc When playing the sound effect, vary the pitch by how much?
 * @default 20
 *
 * @arg pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @arg PanVariance:num
 * @text Variance
 * @parent pan:num
 * @type number
 * @desc When playing the sound effect, vary the pan by how much?
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgSoundResetMessageSound
 * @text Message Sound: Reset
 * @desc Resets the settings to the Plugin Parameters settings.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableMessageSounds
 * @text System: Enable/Disable Letter Sounds
 * @desc Enables/disables Message Letter Sounds for the game.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Message Letter Sounds for the game.
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
 * @param MessageSounds
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Enable
 *
 * @param EnableSound:eval
 * @text Default Enable?
 * @parent Enable
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Letter Sounds by default?
 * @default true
 *
 * @param BlackList:arraystr
 * @text Blacklisted Letters
 * @parent Enable
 * @type string[]
 * @desc This is a list of individual characters that are blacklisted from having sounds play.
 * @default [" ","~","\"","'"]
 *
 * @param Default
 * @text Default Sound Settings
 * 
 * @param name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Cursor3
 *
 * @param Interval:num
 * @text Interval
 * @parent name:str
 * @type number
 * @desc Interval the sound effect from being played between how many characters?
 * @default 2
 *
 * @param volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param VolVariance:num
 * @text Variance
 * @parent volume:num
 * @type number
 * @desc When playing the sound effect, vary the volume by how much?
 * @default 10
 *
 * @param pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param PitchVariance:num
 * @text Variance
 * @parent pitch:num
 * @type number
 * @desc When playing the sound effect, vary the pitch by how much?
 * @default 20
 *
 * @param pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param PanVariance:num
 * @text Variance
 * @parent pan:num
 * @type number
 * @desc When playing the sound effect, vary the pan by how much?
 * @default 5
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
//=============================================================================

const _0x3562=['Settings','description','initialize','max','JSON','_messageSoundVolumeVariance','pan','MsgSoundChangeMessageSound','setMessageSoundPitchVariance','exit','ARRAYNUM','ARRAYFUNC','2YhHvPB','LNLTt','LSI','setMessageSoundPanVariance','LETTERSOUNDPANVARIANCE','setMessageSoundInterval','718030ahRbzS','buffer','RXXFX','jsDVJ','_messageSoundSfx','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','LETTERSOUNDVOLUMEVARIANCE','ARRAYSTRUCT','EnableSound','status','setMessageSoundSfx','136699qMfJgn','iBUNk','replace','PanVariance','_messageSoundPitchVariance','_messageSoundEnable','toUpperCase','16VwJuNo','VisuMZ_1_OptionsCore','EmDmh','LETTERSOUNDVOLUME','trim','name','KEtKI','msgLetterSound','Enable','Window_Message_preFlushTextState','format','550223ZprmPH','LETTERSOUNDPITCHVAR','59016zqQCAN','setMessageSoundVolumeVariance','newPage','\x1bMsgLetterSoundOn[0]','getMessageSoundInterval','ConvertParams','LETTERSOUNDPITCH','playMessageSound','parse','_messageSoundInterval','nAGJY','includes','MSGLETTERSOUNDOFF','map','zupZy','filter','isMessageSoundPlayed','getMessageSoundPanVariance','LETTERSOUNDNAME','LSPIV','Window_Message_newPage','22009IiRbnS','NWoAj','Window_Message_preConvertEscapeCharacters','LSPAV','volume','getMessageSoundVolumeVariance','CoeeE','CgYkU','ARRAYJSON','LETTERSOUNDPITCHVARIANCE','MSGLETTERSOUNDON','registerCommand','LSPI','version','2ycouRF','lbNHN','getMessageSoundSfx','NUM','LETTERSOUNDVOLUMEVAR','initMessageSoundsSettings','randomInt','setMessageSoundEnabled','705795idmDNS','SystemEnableMessageSounds','playSe','call','OXEjH','LSPA','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','parameters','MsgLetterSounds','Game_System_initialize','match','ARRAYEVAL','30MhKfYM','_messageSoundPanVariance','LfEAp','FUNC','LSVV','convertMessageSoundsTextCodes','PitchVariance','obtainEscapeParam','ArFAT','makeDeepCopy','processEscapeCharacter','MsgSoundResetMessageSound','isMsgLetterSoundBlacklisted','return\x200','Interval','isMessageSoundEnabled','BlackList','pitch','preFlushTextState','prototype','VolVariance','preConvertEscapeCharacters','kmPgU','getMessageSoundPitchVariance','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','464951CgTPMQ'];function _0x4330(_0x24b1ac,_0x373c38){_0x24b1ac=_0x24b1ac-0xa8;let _0x356284=_0x3562[_0x24b1ac];return _0x356284;}const _0x37d2a4=_0x4330;(function(_0x56571d,_0x3a7af3){const _0x481bd3=_0x4330;while(!![]){try{const _0x466306=parseInt(_0x481bd3(0xfa))*parseInt(_0x481bd3(0xed))+parseInt(_0x481bd3(0xe6))*parseInt(_0x481bd3(0x11d))+parseInt(_0x481bd3(0xdb))+parseInt(_0x481bd3(0x125))+-parseInt(_0x481bd3(0xf8))+-parseInt(_0x481bd3(0x10f))*parseInt(_0x481bd3(0xaf))+-parseInt(_0x481bd3(0xc8))*parseInt(_0x481bd3(0xd5));if(_0x466306===_0x3a7af3)break;else _0x56571d['push'](_0x56571d['shift']());}catch(_0x9f6e69){_0x56571d['push'](_0x56571d['shift']());}}}(_0x3562,0x7a55c));var label=_0x37d2a4(0xab),tier=tier||0x0,dependencies=['VisuMZ_1_MessageCore'],pluginData=$plugins[_0x37d2a4(0x109)](function(_0x26aa82){const _0xb9c4c4=_0x37d2a4;return _0x26aa82[_0xb9c4c4(0xe4)]&&_0x26aa82['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x37d2a4(0xc9)]=VisuMZ[label][_0x37d2a4(0xc9)]||{},VisuMZ[_0x37d2a4(0xff)]=function(_0x31bbeb,_0x4cbd96){const _0x4feadd=_0x37d2a4;for(const _0x12c679 in _0x4cbd96){if(_0x12c679[_0x4feadd(0xad)](/(.*):(.*)/i)){if(_0x4feadd(0xb1)!==_0x4feadd(0xb1)){function _0x4b46be(){const _0x456a51=_0x4feadd;if(!this['isMessageSoundPlayed'](_0x4a8c13))return;if(this[_0x456a51(0xbb)](_0x70b80a[_0x456a51(0xdc)]))return;const _0x123d3a=_0x28892b['playMessageSound'](_0x3480e9);this[_0x456a51(0x103)]=_0x123d3a;}}else{const _0x4de5cc=String(RegExp['$1']),_0x476b45=String(RegExp['$2'])[_0x4feadd(0xec)]()[_0x4feadd(0xf1)]();let _0xdd443f,_0x2b028c,_0x5b36a1;switch(_0x476b45){case _0x4feadd(0x120):_0xdd443f=_0x4cbd96[_0x12c679]!==''?Number(_0x4cbd96[_0x12c679]):0x0;break;case _0x4feadd(0xd3):_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON['parse'](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c['map'](_0x49e194=>Number(_0x49e194));break;case'EVAL':_0xdd443f=_0x4cbd96[_0x12c679]!==''?eval(_0x4cbd96[_0x12c679]):null;break;case _0x4feadd(0xae):_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c['map'](_0x1874cb=>eval(_0x1874cb));break;case _0x4feadd(0xcd):_0xdd443f=_0x4cbd96[_0x12c679]!==''?JSON['parse'](_0x4cbd96[_0x12c679]):'';break;case _0x4feadd(0x117):_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c[_0x4feadd(0x107)](_0x3d34b5=>JSON[_0x4feadd(0x102)](_0x3d34b5));break;case _0x4feadd(0xb2):_0xdd443f=_0x4cbd96[_0x12c679]!==''?new Function(JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679])):new Function(_0x4feadd(0xbc));break;case _0x4feadd(0xd4):_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c[_0x4feadd(0x107)](_0x5899bb=>new Function(JSON[_0x4feadd(0x102)](_0x5899bb)));break;case'STR':_0xdd443f=_0x4cbd96[_0x12c679]!==''?String(_0x4cbd96[_0x12c679]):'';break;case'ARRAYSTR':_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c['map'](_0x103184=>String(_0x103184));break;case'STRUCT':_0x5b36a1=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):{},_0xdd443f=VisuMZ[_0x4feadd(0xff)]({},_0x5b36a1);break;case _0x4feadd(0xe2):_0x2b028c=_0x4cbd96[_0x12c679]!==''?JSON[_0x4feadd(0x102)](_0x4cbd96[_0x12c679]):[],_0xdd443f=_0x2b028c[_0x4feadd(0x107)](_0x45cc9a=>VisuMZ[_0x4feadd(0xff)]({},JSON[_0x4feadd(0x102)](_0x45cc9a)));break;default:continue;}_0x31bbeb[_0x4de5cc]=_0xdd443f;}}}return _0x31bbeb;},(_0x465505=>{const _0x3044da=_0x37d2a4,_0x5dc456=_0x465505['name'];for(const _0x47769b of dependencies){if(_0x3044da(0x104)!==_0x3044da(0x129)){if(!Imported[_0x47769b]){alert(_0x3044da(0xc7)[_0x3044da(0xf7)](_0x5dc456,_0x47769b)),SceneManager[_0x3044da(0xd2)]();break;}}else{function _0x1dd644(){const _0x2eab77=_0x3044da,_0x27901e=_0x4fefbf[_0x2eab77(0xbe)]();_0x430b3d['initMessageSoundsSettings'](),_0x18af2f[_0x2eab77(0x124)](_0x27901e);}}}const _0x11d41e=_0x465505[_0x3044da(0xca)];if(_0x11d41e[_0x3044da(0xad)](/\[Version[ ](.*?)\]/i)){if(_0x3044da(0x11e)===_0x3044da(0x116)){function _0x588429(){const _0x108c4b=_0x3044da;return _0x35f6cb[_0x108c4b(0xe4)]&&_0x4c373f['description'][_0x108c4b(0x105)]('['+_0x241826+']');}}else{const _0x1ca49f=Number(RegExp['$1']);if(_0x1ca49f!==VisuMZ[label][_0x3044da(0x11c)]){if(_0x3044da(0xb7)!=='InSfN')alert(_0x3044da(0xa9)[_0x3044da(0xf7)](_0x5dc456,_0x1ca49f)),SceneManager['exit']();else{function _0x1d728f(){const _0x41e45e=_0x3044da;this[_0x41e45e(0xce)]===_0x16a1db&&this[_0x41e45e(0x122)](),this[_0x41e45e(0xce)]=_0x5356ee;}}}}}if(_0x11d41e['match'](/\[Tier[ ](\d+)\]/i)){if(_0x3044da(0xdd)!=='RXXFX'){function _0x23119d(){this['initMessageSoundsSettings']();}}else{const _0x3fa875=Number(RegExp['$1']);if(_0x3fa875<tier){if(_0x3044da(0x110)!==_0x3044da(0xde))alert(_0x3044da(0xe0)[_0x3044da(0xf7)](_0x5dc456,_0x3fa875,tier)),SceneManager['exit']();else{function _0x9a3d01(){const _0x28e053=_0x3044da;if(_0x282d4f[_0x28e053(0xee)]){if(_0x137667&&_0x28b108[_0x28e053(0xf4)]!==_0x17eb6e){if(!_0xb3c97e[_0x28e053(0xf4)])return![];}}if(this[_0x28e053(0x103)]-->0x0)return![];if(!_0x25e67c[_0x28e053(0xbe)]())return![];return!![];}}}else{if(_0x3044da(0xf3)!==_0x3044da(0x115))tier=Math[_0x3044da(0xcc)](_0x3fa875,tier);else{function _0xae0071(){const _0x3c7301=_0x3044da;this[_0x3c7301(0x122)]();}}}}}VisuMZ[_0x3044da(0xff)](VisuMZ[label][_0x3044da(0xc9)],_0x465505[_0x3044da(0xaa)]);})(pluginData),PluginManager[_0x37d2a4(0x11a)](pluginData[_0x37d2a4(0xf2)],_0x37d2a4(0xd0),_0x42105d=>{const _0x3425ac=_0x37d2a4;VisuMZ[_0x3425ac(0xff)](_0x42105d,_0x42105d);const _0x57b0e8={'name':_0x42105d[_0x3425ac(0xf2)],'volume':_0x42105d[_0x3425ac(0x113)],'pitch':_0x42105d['pitch'],'pan':_0x42105d[_0x3425ac(0xcf)]};$gameSystem[_0x3425ac(0xe5)](_0x57b0e8),$gameSystem['setMessageSoundInterval'](_0x42105d['Interval']),$gameSystem['setMessageSoundVolumeVariance'](_0x42105d[_0x3425ac(0xc3)]),$gameSystem['setMessageSoundPitchVariance'](_0x42105d[_0x3425ac(0xb5)]),$gameSystem[_0x3425ac(0xd8)](_0x42105d[_0x3425ac(0xe9)]);}),PluginManager['registerCommand'](pluginData['name'],_0x37d2a4(0xba),_0x1fe40a=>{const _0x15d877=_0x37d2a4,_0x4d9c50=$gameSystem[_0x15d877(0xbe)]();$gameSystem['initMessageSoundsSettings'](),$gameSystem['setMessageSoundEnabled'](_0x4d9c50);}),PluginManager[_0x37d2a4(0x11a)](pluginData['name'],_0x37d2a4(0x126),_0x408d7e=>{const _0x15137e=_0x37d2a4;VisuMZ[_0x15137e(0xff)](_0x408d7e,_0x408d7e),$gameSystem[_0x15137e(0x124)](_0x408d7e[_0x15137e(0xf5)]);}),SoundManager[_0x37d2a4(0x101)]=function(_0x185819){const _0x54c5d0=_0x37d2a4,_0x2d53a3=$gameSystem[_0x54c5d0(0x11f)]();let _0xd0f999=$gameSystem['getMessageSoundInterval'](),_0x2f3565=$gameSystem[_0x54c5d0(0x114)](![]),_0x227b2b=$gameSystem[_0x54c5d0(0xc6)](![]),_0x43a71e=$gameSystem['getMessageSoundPanVariance'](![]);return _0x2d53a3[_0x54c5d0(0x113)]+=_0x2f3565,_0x2d53a3['volume']=Math['max'](0x0,_0x2d53a3['volume']),_0x2d53a3[_0x54c5d0(0xc0)]+=_0x227b2b,_0x2d53a3[_0x54c5d0(0xc0)]=Math[_0x54c5d0(0xcc)](0x0,_0x2d53a3[_0x54c5d0(0xc0)]),_0x2d53a3[_0x54c5d0(0xcf)]+=_0x43a71e,AudioManager[_0x54c5d0(0x127)](_0x2d53a3),_0xd0f999;},VisuMZ['MsgLetterSounds'][_0x37d2a4(0xac)]=Game_System['prototype']['initialize'],Game_System['prototype'][_0x37d2a4(0xcb)]=function(){const _0x430221=_0x37d2a4;VisuMZ[_0x430221(0xab)][_0x430221(0xac)][_0x430221(0x128)](this),this[_0x430221(0x122)]();},Game_System['prototype'][_0x37d2a4(0x122)]=function(){const _0x4a9af1=_0x37d2a4,_0x2a7ebe=VisuMZ[_0x4a9af1(0xab)][_0x4a9af1(0xc9)];this['_messageSoundSfx']={'name':_0x2a7ebe[_0x4a9af1(0xf2)],'volume':_0x2a7ebe[_0x4a9af1(0x113)],'pitch':_0x2a7ebe['pitch'],'pan':_0x2a7ebe['pan']},this[_0x4a9af1(0x103)]=_0x2a7ebe[_0x4a9af1(0xbd)],this[_0x4a9af1(0xce)]=_0x2a7ebe[_0x4a9af1(0xc3)],this[_0x4a9af1(0xea)]=_0x2a7ebe[_0x4a9af1(0xb5)],this[_0x4a9af1(0xb0)]=_0x2a7ebe[_0x4a9af1(0xe9)],this[_0x4a9af1(0xeb)]=_0x2a7ebe[_0x4a9af1(0xe3)];},Game_System[_0x37d2a4(0xc2)]['isMessageSoundEnabled']=function(){const _0x2f5267=_0x37d2a4;if(this[_0x2f5267(0xeb)]===undefined){if(_0x2f5267(0xd6)!==_0x2f5267(0xd6)){function _0x42dbe7(){const _0x4ba5a0=_0x2f5267;if(_0x40e900&&_0x11c587[_0x4ba5a0(0xf4)]!==_0x3d4b12){if(!_0x147625[_0x4ba5a0(0xf4)])return![];}}}else this[_0x2f5267(0x122)]();}return this[_0x2f5267(0xeb)];},Game_System['prototype']['setMessageSoundEnabled']=function(_0x1cde02){const _0x2675b5=_0x37d2a4;this[_0x2675b5(0xeb)]===undefined&&this[_0x2675b5(0x122)](),this[_0x2675b5(0xeb)]=_0x1cde02;},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0x11f)]=function(){const _0x47a72c=_0x37d2a4;if(this[_0x47a72c(0xdf)]===undefined){if(_0x47a72c(0xc5)!==_0x47a72c(0x108))this['initMessageSoundsSettings']();else{function _0x4265a3(){this['initMessageSoundsSettings']();}}}return JsonEx[_0x47a72c(0xb8)](this[_0x47a72c(0xdf)]);},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0xe5)]=function(_0x21cd58){const _0x131a56=_0x37d2a4;if(this[_0x131a56(0xdf)]===undefined){if(_0x131a56(0xe7)!=='jSgFu')this[_0x131a56(0x122)]();else{function _0x48f359(){const _0x18dd99=_0x131a56,_0x52c0d4=_0x192b97(_0x4b5879['$1']);_0x52c0d4<_0x338aa0?(_0x357700('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x18dd99(0xf7)](_0x20e588,_0x52c0d4,_0x2b8895)),_0x2bf102[_0x18dd99(0xd2)]()):_0x48585d=_0x2b45a4['max'](_0x52c0d4,_0x59af85);}}}this[_0x131a56(0xdf)]=_0x21cd58;},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0xfe)]=function(){const _0x2cc394=_0x37d2a4;return this['_messageSoundInterval']===undefined&&this[_0x2cc394(0x122)](),this[_0x2cc394(0x103)];},Game_System[_0x37d2a4(0xc2)]['setMessageSoundInterval']=function(_0x49a885){const _0x4f1912=_0x37d2a4;if(this[_0x4f1912(0x103)]===undefined){if('vjPym'==='vjPym')this[_0x4f1912(0x122)]();else{function _0x22284e(){this['initMessageSoundsSettings']();}}}this[_0x4f1912(0x103)]=_0x49a885;},Game_System[_0x37d2a4(0xc2)]['getMessageSoundVolumeVariance']=function(_0x43ad32){const _0x4181fe=_0x37d2a4;if(this['_messageSoundVolumeVariance']===undefined){if('uACmm'===_0x4181fe(0xef)){function _0x1dc758(){const _0x5ea2ef=_0x4181fe;_0x3b93c3[_0x5ea2ef(0xab)]['Window_Message_preFlushTextState'][_0x5ea2ef(0x128)](this,_0x43d983),this[_0x5ea2ef(0x101)](_0x1a96b8);}}else this['initMessageSoundsSettings']();}if(_0x43ad32)return this[_0x4181fe(0xce)];let _0x1207c1=Math[_0x4181fe(0x123)](this[_0x4181fe(0xce)]*0x2);return _0x1207c1-=this['_messageSoundVolumeVariance'],Math[_0x4181fe(0xcc)](0x0,_0x1207c1);},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0xfb)]=function(_0x550b6c){const _0x166873=_0x37d2a4;this['_messageSoundVolumeVariance']===undefined&&this[_0x166873(0x122)](),this[_0x166873(0xce)]=_0x550b6c;},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0xc6)]=function(_0x41c4d3){const _0x522bed=_0x37d2a4;this[_0x522bed(0xea)]===undefined&&this[_0x522bed(0x122)]();if(_0x41c4d3)return this['_messageSoundPitchVariance'];let _0x312b9c=Math['randomInt'](this[_0x522bed(0xea)]*0x2);return _0x312b9c-=this[_0x522bed(0xea)],Math['max'](0x0,_0x312b9c);},Game_System['prototype']['setMessageSoundPitchVariance']=function(_0x1f0aad){const _0x1c865b=_0x37d2a4;this[_0x1c865b(0xea)]===undefined&&this[_0x1c865b(0x122)](),this['_messageSoundPitchVariance']=_0x1f0aad;},Game_System[_0x37d2a4(0xc2)][_0x37d2a4(0x10b)]=function(_0x1b1945){const _0xe5c6dd=_0x37d2a4;this[_0xe5c6dd(0xb0)]===undefined&&this[_0xe5c6dd(0x122)]();if(_0x1b1945)return this[_0xe5c6dd(0xb0)];let _0xcc5a0e=Math[_0xe5c6dd(0x123)](this[_0xe5c6dd(0xb0)]*0x2);return _0xcc5a0e-=this[_0xe5c6dd(0xb0)],_0xcc5a0e;},Game_System['prototype']['setMessageSoundPanVariance']=function(_0x38bf89){const _0xf513c1=_0x37d2a4;this['_messageSoundPanVariance']===undefined&&this[_0xf513c1(0x122)](),this[_0xf513c1(0xb0)]=_0x38bf89;},VisuMZ['MsgLetterSounds'][_0x37d2a4(0x10e)]=Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0xfc)],Window_Message['prototype'][_0x37d2a4(0xfc)]=function(_0x47270f){const _0x88b1fd=_0x37d2a4;this[_0x88b1fd(0x103)]=0x0,VisuMZ[_0x88b1fd(0xab)][_0x88b1fd(0x10e)][_0x88b1fd(0x128)](this,_0x47270f);},VisuMZ[_0x37d2a4(0xab)][_0x37d2a4(0xf6)]=Window_Message['prototype'][_0x37d2a4(0xc1)],Window_Message[_0x37d2a4(0xc2)]['preFlushTextState']=function(_0x424f43){const _0x2de22a=_0x37d2a4;VisuMZ[_0x2de22a(0xab)][_0x2de22a(0xf6)][_0x2de22a(0x128)](this,_0x424f43),this[_0x2de22a(0x101)](_0x424f43);},Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0x10a)]=function(_0x1df8cf){const _0x563531=_0x37d2a4;if(Imported[_0x563531(0xee)]){if(ConfigManager&&ConfigManager[_0x563531(0xf4)]!==undefined){if(!ConfigManager[_0x563531(0xf4)])return![];}}if(this[_0x563531(0x103)]-->0x0)return![];if(!$gameSystem[_0x563531(0xbe)]())return![];return!![];},Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0x101)]=function(_0x54ad3f){const _0x188ce0=_0x37d2a4;if(!this['isMessageSoundPlayed'](_0x54ad3f))return;if(this['isMsgLetterSoundBlacklisted'](_0x54ad3f[_0x188ce0(0xdc)]))return;const _0x496f21=SoundManager[_0x188ce0(0x101)](_0x54ad3f);this[_0x188ce0(0x103)]=_0x496f21;},Window_Message['prototype'][_0x37d2a4(0xbb)]=function(_0x407e98){const _0x4a5d9a=_0x37d2a4;if(_0x407e98==='')return!![];return VisuMZ[_0x4a5d9a(0xab)][_0x4a5d9a(0xc9)][_0x4a5d9a(0xbf)][_0x4a5d9a(0x105)](_0x407e98);},VisuMZ['MsgLetterSounds'][_0x37d2a4(0x111)]=Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0xc4)],Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0xc4)]=function(_0x5a9a67){const _0x1d9b76=_0x37d2a4;return _0x5a9a67=this[_0x1d9b76(0xb4)](_0x5a9a67),VisuMZ[_0x1d9b76(0xab)]['Window_Message_preConvertEscapeCharacters'][_0x1d9b76(0x128)](this,_0x5a9a67);},Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0xb4)]=function(_0x24c4fb){const _0x6406d=_0x37d2a4;return _0x24c4fb=_0x24c4fb[_0x6406d(0xe8)](/\x1bLSON/gi,_0x6406d(0xfd)),_0x24c4fb=_0x24c4fb[_0x6406d(0xe8)](/\x1bLSOFF/gi,'\x1bMsgLetterSoundOff[0]'),_0x24c4fb=_0x24c4fb[_0x6406d(0xe8)](/<(?:LETTER SOUND ON|LETTERSOUNDON)>/gi,_0x6406d(0xfd)),_0x24c4fb=_0x24c4fb[_0x6406d(0xe8)](/<(?:LETTER SOUND OFF|LETTERSOUNDOFF)>/gi,'\x1bMsgLetterSoundOff[0]'),_0x24c4fb;},VisuMZ[_0x37d2a4(0xab)]['Window_Message_processEscapeCharacter']=Window_Message[_0x37d2a4(0xc2)][_0x37d2a4(0xb9)],Window_Message['prototype']['processEscapeCharacter']=function(_0x3601e1,_0x37b5a3){const _0x3e8438=_0x37d2a4;let _0x1acc79,_0x40686e;switch(_0x3601e1){case _0x3e8438(0x119):this[_0x3e8438(0xb6)](_0x37b5a3),$gameSystem[_0x3e8438(0x124)](!![]);break;case _0x3e8438(0x106):this['obtainEscapeParam'](_0x37b5a3),$gameSystem[_0x3e8438(0x124)](![]);break;case _0x3e8438(0x10c):case'LSN':_0x40686e=$gameSystem[_0x3e8438(0x11f)](),_0x40686e[_0x3e8438(0xf2)]=this['obtainEscapeString'](_0x37b5a3),$gameSystem[_0x3e8438(0xe5)](_0x40686e);break;case'LETTERSOUNDINTERVAL':case _0x3e8438(0xd7):_0x1acc79=this['obtainEscapeParam'](_0x37b5a3),$gameSystem[_0x3e8438(0xda)](_0x1acc79);break;case _0x3e8438(0xf0):case'LSV':_0x1acc79=this[_0x3e8438(0xb6)](_0x37b5a3),_0x40686e=$gameSystem[_0x3e8438(0x11f)](),_0x40686e[_0x3e8438(0x113)]=_0x1acc79,$gameSystem[_0x3e8438(0xe5)](_0x40686e);break;case _0x3e8438(0x100):case _0x3e8438(0x11b):_0x1acc79=this[_0x3e8438(0xb6)](_0x37b5a3),_0x40686e=$gameSystem[_0x3e8438(0x11f)](),_0x40686e[_0x3e8438(0xc0)]=_0x1acc79,$gameSystem[_0x3e8438(0xe5)](_0x40686e);break;case'LETTERSOUNDPAN':case _0x3e8438(0xa8):_0x1acc79=this[_0x3e8438(0xb6)](_0x37b5a3),_0x40686e=$gameSystem[_0x3e8438(0x11f)](),_0x40686e[_0x3e8438(0xcf)]=_0x1acc79,$gameSystem['setMessageSoundSfx'](_0x40686e);break;case _0x3e8438(0xe1):case _0x3e8438(0x121):case _0x3e8438(0xb3):_0x1acc79=this[_0x3e8438(0xb6)](_0x37b5a3),$gameSystem[_0x3e8438(0xfb)](_0x1acc79);break;case _0x3e8438(0x118):case _0x3e8438(0xf9):case _0x3e8438(0x10d):_0x1acc79=this[_0x3e8438(0xb6)](_0x37b5a3),$gameSystem[_0x3e8438(0xd1)](_0x1acc79);break;case _0x3e8438(0xd9):case'LETTERSOUNDPANVAR':case _0x3e8438(0x112):_0x1acc79=this['obtainEscapeParam'](_0x37b5a3),$gameSystem[_0x3e8438(0xd8)](_0x1acc79);break;default:VisuMZ[_0x3e8438(0xab)]['Window_Message_processEscapeCharacter'][_0x3e8438(0x128)](this,_0x3601e1,_0x37b5a3);break;}};