//=============================================================================
// Alistair Plugins - Stat Distribution
// AP_StatDistribution.js
//=============================================================================
var Imported = Imported || {};
Imported.AP_StatDistribution = true;
//=============================================================================
 /*:
 * @target MZ
 * @plugindesc v1.0 Allows the player to raise stats with points.
 * @author Alistair Plugins
 * @url https://alistairengine.wordpress.com
 *
 * @param --- General ---
 * @desc
 * @default --------------------------------------
 *
 * @param Initial Points
 * @desc The amount of points an actor starts the game with. Default: 0
 * @default 0 
 *
 * @param Level-Up Points
 * @desc The amount of points an actor receives upon leveling up. Default: 3
 * @default 3
 *
 * @param Maximum Points
 * @desc Points will be capped once they reach this value. Default: 99
 * @default 99
 *
 * @param Help Window Text
 * @desc The text that's shown in the Help Window. Variables: param, amount, points
 * @default "Raises " + param + " by " + amount + ". Requires " + points + " points to perform."
 *
 * @param Show Menu Switch
 * @desc This switch needs to be turned on for the menu command to appear. Default: 0
 * @default 0
 *
 * @param Enable Menu Switch
 * @desc This switch needs to be turned on for the menu command to be accessible. Default: 0
 * @default 0
 *
 * @param Menu Command Text
 * @desc The name of the menu command. Default: Stat Distribution
 * @default Stat Distribution
 *
 * @param Add Menu Command
 * @type boolean
 * @desc Whether or not to add the menu command to the menu by default.
 * @default true
 *
 * @param Show Message
 * @type boolean
 * @desc Show a message with how many distribution points have been earned upon levelling up. Default: false
 * @default false
 *
 * @param Level-Up Message
 * @desc The message to be shown if you enabled "Show Message". Variables: actor, points
 * @default actor + " gained " + points + "!"
 *
 * @param Confirmation Window
 * @type boolean
 * @desc Use a confirmation window before a point is spent? Default: false
 * @default true
 *
 * @param Confirmation Window Text
 * @desc The text to be shown in the Confirmation Window.
 * @default Are you sure that you want to increase this param?
 *
 * @param --- Vocabulary ---
 * @desc
 * @default --------------------------------------
 *
 * @param Points Vocabulary
 * @desc This is how Distribution Points are called. Default: Distribution Points
 * @default Distribution Points
 *
 * @param HP Vocabulary
 * @desc The word used for Hit Points. Default: HP
 * @default HP
 *
 * @param MP Vocabulary
 * @desc The word used for Magic Points / Mana. Default: MP
 * @default MP
 *
 * @param ATK Vocabulary
 * @desc The word used for Attack/Strength. Default: ATK
 * @default ATK
 *
 * @param DEF Vocabulary
 * @desc The word used for Defence. Default: DEF
 * @default DEF
 *
 * @param MAT Vocabulary
 * @desc The word used for Mentality/Intelligence/Magic attack. Default: MAT
 * @default MAT
 *
 * @param MDF Vocabulary
 * @desc The word used for Magical defence/Resistance. Default: MDF
 * @default MDF
 *
 * @param AGI Vocabulary
 * @desc The word used for Agility. Default: AGI
 * @default AGI
 *
 * @param LUK Vocabulary
 * @desc The word used for Luck. Default: LUK
 * @default LUK
 *
 * @param Yes Vocabulary
 * @desc The word used for "Yes". Default: Yes
 * @default Yes
 *
 * @param No Vocabulary
 * @desc The word used for "No". Default: No
 * @default No
 *
 * @param --- Caps ---
 * @desc
 * @default --------------------------------------
 *
 * @param Cap HP
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap MP
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap ATK
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap DEF
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap MAT
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap MDF
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap AGI
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap LUK
 * @type boolean
 * @desc Upon reaching the maximum value prevent player from spending more points on this stat? Default: false
 * @default false
 *
 * @param Cap Value HP
 * @desc If capping is set to true, what is the cap value? Default: 9999
 * @default 9999
 *
 * @param Cap Value MP
 * @desc If capping is set to true, what is the cap value? Default: 9999
 * @default 9999
 *
 * @param Cap Value ATK
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param Cap Value DEF
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param Cap Value MAT
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param Cap Value MDF
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param Cap Value AGI
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param Cap Value LUK
 * @desc If capping is set to true, what is the cap value? Default: 999
 * @default 999
 *
 * @param --- Visibility ---
 * @desc
 * @default --------------------------------------
 *
 * @param Show HP
 * @type boolean
 * @desc Show HP as a choice? Default: true
 * @default true
 *
 * @param Show MP
 * @type boolean
 * @desc Show MP as a choice? Default: true
 * @default true
 *
 * @param Show ATK
 * @type boolean
 * @desc Show ATK as a choice? Default: true
 * @default true
 *
 * @param Show DEF
 * @type boolean
 * @desc Show DEF as a choice? Default: true
 * @default true
 *
 * @param Show MAT
 * @type boolean
 * @desc Show MAT as a choice? Default: true
 * @default true
 *
 * @param Show MDF
 * @type boolean
 * @desc Show MDF as a choice? Default: true
 * @default true
 *
 * @param Show AGI
 * @type boolean
 * @desc Show AGI as a choice? Default: true
 * @default true
 *
 * @param Show LUK
 * @type boolean
 * @desc Show LUK as a choice? Default: true
 * @default true
 *
 * @param Color: Distribution Points
 * @desc Draws the word for distribution points in this text color.
 * @default 4
 *
 * @param Color: Confirmation Text
 * @desc Draws the text in the confirmation window in this text color.
 * @default 2
 *
 * @param --- Growth ---
 * @desc
 * @default --------------------------------------
 *
 * @param HP Growth
 * @desc The Growth with each point spent. Default: 50
 * @default 50
 *
 * @param MP Growth
 * @desc The Growth with each point spent. Default: 30
 * @default 30
 *
 * @param ATK Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param DEF Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param MAT Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param MDF Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param AGI Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param LUK Growth
 * @desc The Growth with each point spent. Default: 1
 * @default 1
 *
 * @param --- Points needed ---
 * @desc
 * @default --------------------------------------
 *
 * @param HP Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param MP Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param ATK Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param DEF Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param MAT Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param MDF Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param AGI Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param LUK Points Needed
 * @desc The required amount of points to raise this stat. Default: 1
 * @default 1
 *
 * @param --- Icon Settings ---
 * @desc
 * @default --------------------------------------
 *
 * @param HP Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 162
 *
 * @param MP Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 165
 *
 * @param ATK Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 119
 *
 * @param DEF Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 128
 *
 * @param MAT Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 101
 *
 * @param MDF Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 133
 *
 * @param AGI Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 141
 *
 * @param LUK Icon
 * @desc Icon used for this param. Use 0 if you don't want to use an icon.
 * @default 145
 *
 *@----------------------------------------------
 * Plugin Commands:
 *
 * @command Add Points
 * @text Add Distribution Points
 * @desc Choose an actor and the amount of distribution points to be added
 *       to that actor.
 *
 * @arg Actor:num
 * @type actor
 * @text Actor ID
 * @desc Actor that will receive or lose points.
 * @default 
 *
 * @arg Points:num
 * @text Amount of Points
 * @desc The amount of points to add or subtract from the actor's pool.
 * @default 
 *
 *
 * @command OpenStatDistribution
 * @text Open Stat Distribution Scene
 * @desc Opens the Stat Distribution Menu. Does not work in battle.
 *
 * @command ResetPoints
 * @text Reset Spent Points
 * @desc Reset all spent distribution points of an actor.
 *       The actor will be refunded all distribution points.
 *
 * @arg Actor:num
 * @type actor
 * @text Actor ID
 * @desc Actor whose spent distribution points will be reset.
 * @default 
 *
 * @command ResetParamPoints
 * @text Reset Spent Param Points
 * @desc Reset all  distribution points that have been spent on a specific param.
 *       The actor will be refunded all distribution points spent on the param.
 *
 * @arg Actor:num
 * @type actor
 * @text Actor ID
 * @desc Actor whose spent distribution points will be reset.
 * @default 
 *
 * @arg Param:str
 * @type select
 * @text Parameter
 * @desc The parameter of which all distribution points will be refunded.
 * @default 
 * @option HP
 * @value 0
 * @option MP
 * @value 1
 * @option ATK
 * @value 2
 * @option DEF
 * @value 3
 * @option MAT
 * @value 4
 * @option MDF
 * @value 5
 * @option AGI
 * @value 6
 * @option LUK
 * @value 7
 *
 * @help
 * ============================================================================
 * Alistair Plugins - Stat Distribution
 * ============================================================================
 * 
 * This is the conversion of my Stat Distribution Plugin from MV, with a
 * few new features:
 *
 * You can now use custom expressions to define individual Cap Values, Growths
 * and Required Points for each of the stats for each actor individually.
 * ============================================================================
 * ▼ If you are using VisuStella's Main Menu Core plugin
 *
 * You can use the following settings to incorporate the menu command
 * into VisuStella's MMC plugin:
 *
 * Symbol: distribution
 * JS Show: return $gameSystem.isShowDistribution();
 * JS Enable: return $gameSystem.isEnableDistribution();
 * JS Ext: return null;
 * JS Run Code: SceneManager._scene.commandPersonal();
 * JS Personal Code: SceneManager.push(Scene_StatDistribution);
 * ▲
 * ============================================================================
 * Notetags
 * ============================================================================
 * 
 * ► ACTORS, CLASSES
 *
 * <Initial Distribution Points: x>
 * This actor/class will start the game with x
 * distribution points. This will ignore the default setting.
 * Actor notetags have priority over class notetags.
 *
 * <Level Distribution Points: x>
 * This actor/class will gain x distribution points whenever it
 * levels up. This will ignore the default setting. Actor notetags have
 * priority over class notetags.
 *
 * <x Cap Eval: y>
 * This actor's/class' cap for stat x (= HP,MP,ATK,DEF,MAT,MDF,AGI,LUK or ALL) 
 * will be set to expression y.
 * Actor notetags have priority over class notetags.
 * Please note: The respective Cap parameter of the plugin must be
 * turned on or this will not have any effect.
 * Example: <HP Cap: 2500> won't have any effect as long as Cap HP is set
 * to false.
 *
 * Note:  <All Cap: y> does not include the HP and MP parameters.
 *
 * <x ReqPoints Eval: y>
 * Sets the points cost for stat x (=HP,MP,ATK,DEF,MAT,MDF,AGI,LUK or ALL)
 * to the expression y.
 *
 * <x Growth Eval: y>
 * Sets the growth of stat x to the expression y.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * ► Add Distribution Points
 * Adds or subtracts distribution points from a chosen actor's pool.
 *
 * ► Open Stat Distribution Scene
 * Opens the Stat Distribution Scene. Works only out of battle.
 *
 * ► Reset Spent Points
 * Resets all points an actor has spent.
 *
 * ► Reset Spent Param Points
 * Resets all points an actor has spent on a certain parameter.
 *
 *
 * ============================================================================
 * Update History
 * ============================================================================
 * V1.0
 * - First release on RPG Maker MZ
 */
//=============================================================================
// (function() {
	
	const parameters = PluginManager.parameters('AP_StatDistribution');
	// General
	const InitialPoints = String(parameters['Initial Points']);
	const LevelUpPoints = String(parameters['Level-Up Points']);
	const MaxPoints = String(parameters['Maximum Points']);
	const HelpWindowText = String(parameters['Help Window Text']);
	const MenuSwitch = Number(parameters['Show Menu Switch']);
	const EnableSwitch = Number(parameters['Enable Menu Switch']);
	const APMenuName = String(parameters['Menu Command Text']);
	const APSDAddCommand = Boolean(parameters['Add Menu Command']);
	const PointsVocab = String(parameters['Points Vocabulary']);
	const APShowMessage = String(parameters['Show Message']);
	const APLevelMessage = String(parameters['Level-Up Message']);
	const APSD_UseConfirmationWindow = String(parameters['Confirmation Window']);
	const APSD_ConfirmText = String(parameters['Confirmation Window Text']);
	// Vocab
	const HPVocab = String(parameters['HP Vocabulary']);
	const MPVocab = String(parameters['MP Vocabulary']);
	const ATKVocab = String(parameters['ATK Vocabulary']);
	const DEFVocab = String(parameters['DEF Vocabulary']);
	const MATVocab = String(parameters['MAT Vocabulary']);
	const MDFVocab = String(parameters['MDF Vocabulary']);
	const AGIVocab = String(parameters['AGI Vocabulary']);
	const LUKVocab = String(parameters['LUK Vocabulary']);
	const YesVocab = String(parameters['Yes Vocabulary']);
	const NoVocab = String(parameters['No Vocabulary']);
	// Cap
	const HPCap = String(parameters['Cap HP']);
	const MPCap = String(parameters['Cap MP']);
	const ATKCap = String(parameters['Cap ATK']);
	const DEFCap = String(parameters['Cap DEF']);
	const MATCap = String(parameters['Cap MAT']);
	const MDFCap = String(parameters['Cap MDF']);
	const AGICap = String(parameters['Cap AGI']);
	const LUKCap = String(parameters['Cap LUK']);
	const HPCapValue = Number(parameters['Cap Value HP']);
	const MPCapValue = Number(parameters['Cap Value MP']);
	const ATKCapValue = Number(parameters['Cap Value ATK']);
	const DEFCapValue = Number(parameters['Cap Value DEF']);
	const MATCapValue = Number(parameters['Cap Value MAT']);
	const MDFCapValue = Number(parameters['Cap Value MDF']);
	const AGICapValue = Number(parameters['Cap Value AGI']);
	const LUKCapValue = Number(parameters['Cap Value LUK']);
	// Visibility
	const ShowHP = String(parameters['Show HP']);
	const ShowMP = String(parameters['Show MP']);
	const ShowATK = String(parameters['Show ATK']);
	const ShowDEF = String(parameters['Show DEF']);
	const ShowMAT = String(parameters['Show MAT']);
	const ShowMDF = String(parameters['Show MDF']);
	const ShowAGI = String(parameters['Show AGI']);
	const ShowLUK = String(parameters['Show LUK']);
	const APSD_DistributionColor = parameters['Color: Distribution Points']
	const APSD_ConfirmationColor = parameters['Color: Confirmation Text']
	// Growth
	const HPGrowth = String(parameters['HP Growth']);
	const MPGrowth = String(parameters['MP Growth']);
	const ATKGrowth = String(parameters['ATK Growth']);
	const DEFGrowth = String(parameters['DEF Growth']);
	const MATGrowth = String(parameters['MAT Growth']);
	const MDFGrowth = String(parameters['MDF Growth']);
	const AGIGrowth = String(parameters['AGI Growth']);
	const LUKGrowth = String(parameters['LUK Growth']);
	// Points needed
	const HPNeeded = String(parameters['HP Points Needed']);
	const MPNeeded = String(parameters['MP Points Needed']);
	const ATKNeeded = String(parameters['ATK Points Needed']);
	const DEFNeeded = String(parameters['DEF Points Needed']);
	const MATNeeded = String(parameters['MAT Points Needed']);
	const MDFNeeded = String(parameters['MDF Points Needed']);
	const AGINeeded = String(parameters['AGI Points Needed']);
	const LUKNeeded = String(parameters['LUK Points Needed']);
	// Icons
	const HPIcon = Number(parameters['HP Icon']);
	const MPIcon = Number(parameters['MP Icon']);
	const ATKIcon = Number(parameters['ATK Icon']);
	const DEFIcon = Number(parameters['DEF Icon']);
	const MATIcon = Number(parameters['MAT Icon']);
	const MDFIcon = Number(parameters['MDF Icon']);
	const AGIIcon = Number(parameters['AGI Icon']);
	const LUKIcon = Number(parameters['LUK Icon']);

// RegExp Handling
	AP_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if (!AP_DataManager_isDatabaseLoaded.call(this)) return false;
		this.processAPSDN1($dataActors);
		this.processAPSDN1($dataClasses);
		return true;
	};

	DataManager.processAPSDN1 = function(dataGroup) {
		const APSDN1_1 = /<(?:Initial Distribution Points):[ ](.*)>/i;
		const APSDN1_2 = /<(?:Level Distribution Points):[ ](.*)>/i;
		const APSDN1_3 = /<(.*)[ ]Cap[ ]Eval:[ ](.*)>/i;
		const APSDN1_4 = /<(?:Initial Ability Points):[ ](.*)>/i;
		const APSDN1_5 = /<(?:Level Ability Points):[ ](.*)>/i;
		const APSDN1_6 = /<(.*)[ ]ReqPoints[ ]Eval:[ ](.*)>/i;
		const APSDN1_7 = /<(.*)[ ]Growth[ ]Eval:[ ](.*)>/i;
		for (let i = 1; i < dataGroup.length; i++) {
			const object = dataGroup[i];
			const noteData = object.note.split(/[\r\n]+/);

			object.initialPoints = undefined;
			object.ADinitialPoints = undefined;
			object.levelUpPoints = undefined;
			object.ADlevelUpPoints = undefined;
			object.APSD_customValueCap = [];
			object.APSD_customPointsNeeded = [];
			object.APSD_customGrowth = [];

			for (let n = 0; n < noteData.length; n++) {
				const line = noteData[n];
				if (line.match(APSDN1_1)) {
					object.initialPoints = String(RegExp.$1);
				} else if (line.match(APSDN1_4)) {
					object.ADinitialPoints = String(RegExp.$1);
				} else if (line.match(APSDN1_5)) {
					object.ADlevelUpPoints = String(RegExp.$1);
				} else if (line.match(APSDN1_2)) {
					object.levelUpPoints = String(RegExp.$1);
				} else if (line.match(APSDN1_3)) {
					const expression = String(RegExp.$2);
					switch (String(RegExp.$1).toLowerCase()) {
						case 'hp':
						object.APSD_customValueCap[0] = expression;
						break;
						case 'mp':
						object.APSD_customValueCap[1] = expression;
						break;
						case 'atk':
						object.APSD_customValueCap[2] = expression;
						break;
						case 'def':
						object.APSD_customValueCap[3] = expression;
						break;
						case 'mat':
						object.APSD_customValueCap[4] = expression;
						break;
						case 'mdf':
						object.APSD_customValueCap[5] = expression;
						break;
						case 'agi':
						object.APSD_customValueCap[6] = expression;
						break;
						case 'luk':
						object.APSD_customValueCap[7] = expression;
						break;
						case 'all':
						object.APSD_customValueCap[2] = expression;
						object.APSD_customValueCap[3] = expression;
						object.APSD_customValueCap[4] = expression;
						object.APSD_customValueCap[5] = expression;
						object.APSD_customValueCap[6] = expression;
						object.APSD_customValueCap[7] = expression;
						break;
						default: break;
					};
				} else if (line.match(APSDN1_6)) {
					const expression = String(RegExp.$2);
					switch (String(RegExp.$1).toLowerCase()) {
						case 'hp':
						object.APSD_customPointsNeeded[0] = expression;
						break;
						case 'mp':
						object.APSD_customPointsNeeded[1] = expression;
						break;
						case 'atk':
						object.APSD_customPointsNeeded[2] = expression;
						break;
						case 'def':
						object.APSD_customPointsNeeded[3] = expression;
						break;
						case 'mat':
						object.APSD_customPointsNeeded[4] = expression;
						break;
						case 'mdf':
						object.APSD_customPointsNeeded[5] = expression;
						break;
						case 'agi':
						object.APSD_customPointsNeeded[6] = expression;
						break;
						case 'luk':
						object.APSD_customPointsNeeded[7] = expression;
						break;
						case 'all':
						object.APSD_customPointsNeeded[2] = expression;
						object.APSD_customPointsNeeded[3] = expression;
						object.APSD_customPointsNeeded[4] = expression;
						object.APSD_customPointsNeeded[5] = expression;
						object.APSD_customPointsNeeded[6] = expression;
						object.APSD_customPointsNeeded[7] = expression;
						break;
						default: break;
					};
				} else if (line.match(APSDN1_7)) {
					const expression = String(RegExp.$2);
					switch (String(RegExp.$1).toLowerCase()) {
						case 'hp':
						object.APSD_customGrowth[0] = expression;
						break;
						case 'mp':
						object.APSD_customGrowth[1] = expression;
						break;
						case 'atk':
						object.APSD_customGrowth[2] = expression;
						break;
						case 'def':
						object.APSD_customGrowth[3] = expression;
						break;
						case 'mat':
						object.APSD_customGrowth[4] = expression;
						break;
						case 'mdf':
						object.APSD_customGrowth[5] = expression;
						break;
						case 'agi':
						object.APSD_customGrowth[6] = expression;
						break;
						case 'luk':
						object.APSD_customGrowth[7] = expression;
						break;
						case 'all':
						object.APSD_customGrowth[2] = expression;
						object.APSD_customGrowth[3] = expression;
						object.APSD_customGrowth[4] = expression;
						object.APSD_customGrowth[5] = expression;
						object.APSD_customGrowth[6] = expression;
						object.APSD_customGrowth[7] = expression;
						break;
						default: break;
					};
				};//end
			};
		};
	};
// End of RegExp Handling

 //* ============================================================================
 //* Scene_StatDistribution
 //* ============================================================================


	function Scene_StatDistribution() {
		this.initialize.apply(this, arguments);
	};
	
	Scene_StatDistribution.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_StatDistribution.prototype.constructor = Scene_StatDistribution;
	
	Scene_StatDistribution.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};
	
	Scene_StatDistribution.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		//this.createOverviewWindow();
		this.createCommandWindow();
		this._commandWindow.updateHelp();
		this._commandWindow.setActor(this.actor());
		this._commandWindow.refresh();
		//this._ovWindow.refresh();
		this.createSecondHelpWindow();
		this.createConfirmWindow();
	};

	Scene_StatDistribution.prototype.createConfirmWindow = function() {
		const rect = this.confirmWindowRect();
		this._confirmWindow = new Window_APSDConfirm(rect);
		this._confirmWindow.setHandler('yes', this.goOn.bind(this));
		this._confirmWindow.setHandler('no', this.abort.bind(this));
		this.addWindow(this._confirmWindow);
		this._confirmWindow.close();
		this._confirmWindow.hide();
	};

	Scene_StatDistribution.prototype.confirmWindowRect = function() {
    	const wy = Graphics.boxHeight / 2;
    	const ww = this.mainCommandWidth() * 3;
    	const wh = this.calcWindowHeight(3, true);
    	const wx = (Graphics.boxWidth - ww) / 2;
    	return new Rectangle(wx, wy, ww, wh);
	};

	Scene_StatDistribution.prototype.createSecondHelpWindow = function() {
		const rect = this.helpWindowRect();
		this._addOnWindow = new Window_Help(rect);
		this._addOnWindow.y = Graphics.height - this._helpWindow.height - 5;
		this.addWindow(this._addOnWindow);
		this._addOnWindow.hide();
	};

	Scene_StatDistribution.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};
	
	Scene_StatDistribution.prototype.createCommandWindow = function() {
	const rect = this.commandWindowRect();
	this._commandWindow = new Window_StatCommand(rect);
	this._commandWindow.setHelpWindow(this._helpWindow);
	if (eval(APSD_UseConfirmationWindow)) {
	this._commandWindow.setHandler('hp', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('mp', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('atk', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('def', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('mat', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('mdf', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('agi', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('luk', this.activateConfirmation.bind(this));
	this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
	this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	} else {
	this._commandWindow.setHandler('hp', this.growHP.bind(this));
	this._commandWindow.setHandler('mp', this.growMP.bind(this));
	this._commandWindow.setHandler('atk', this.growATK.bind(this));
	this._commandWindow.setHandler('def', this.growDEF.bind(this));
	this._commandWindow.setHandler('mat', this.growMAT.bind(this));
	this._commandWindow.setHandler('mdf', this.growMDF.bind(this));
	this._commandWindow.setHandler('agi', this.growAGI.bind(this));
	this._commandWindow.setHandler('luk', this.growLUK.bind(this));
	this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
	this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	};
	this.addWindow(this._commandWindow);
	};

	Scene_StatDistribution.prototype.commandWindowRect = function() {
    const ww = Graphics.boxWidth;//this.mainCommandWidth();
    const wh = this.mainAreaHeight(); //- this.helpAreaHeight();
    const wx = 0//this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
	};

	Scene_StatDistribution.prototype.createOverviewWindow = function() {
		const rect = this.commandWindowRect();
		//const rect = new Rectangle(240 + 1, this._helpWindow.height + 1, Graphics.boxWidth - 240 - 1, Graphics.boxHeight - this._helpWindow.height * 2)
	this._ovWindow = new Window_Overview(rect);
	this.addWindow(this._ovWindow);
	this._ovWindow.hide()
	};

	Scene_StatDistribution.prototype.onActorChange = function() {
		SoundManager.playCursor();
		this._commandWindow.setActor(this.actor());
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};

	Scene_StatDistribution.prototype.activateConfirmation = function() {
		this._confirmWindow.refresh();
		this._confirmWindow.displayText();
		this._confirmWindow.show();
		this._confirmWindow.open();
		this._confirmWindow.activate();
		this._confirmWindow.select(0);
	};

	Scene_StatDistribution.prototype.goOn = function() {
		this._confirmWindow.deactivate();
		this._confirmWindow.close();
		switch (this._commandWindow.currentSymbol()) {
			case 'hp':
			this.growHP();
			break;
			case 'mp':
			this.growMP();
			break;
			case 'atk':
			this.growATK();
			break;
			case 'def':
			this.growDEF();
			break;
			case 'mat':
			this.growMAT();
			break;
			case 'mdf':
			this.growMDF();
			break;
			case 'agi':
			this.growAGI();
			break;
			case 'luk':
			this.growLUK();
			break;
			default:
			break;
		};
	};

	Scene_StatDistribution.prototype.abort = function() {
		this._confirmWindow.deactivate();
		this._confirmWindow.close();
		this._commandWindow.activate();
	};

// Param Growth Functions

// HP
	Scene_StatDistribution.prototype.growHP = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(0);
		let finalGrowth = actor.customGrowth(0);
		let NeededPoints = actor.customPointsNeeded(0);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(HPCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(0) + actor.mhp > ValueCap ? ValueCap - actor.mhp : actor.customGrowth(0);
			} else { finalGrowth = actor.customGrowth(0) }; // Growth without Cap
			// Raise Param
			actor.addParam(0, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[0] += finalGrowth;
			actor._spentPoints[0] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// MP
	Scene_StatDistribution.prototype.growMP = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(1);
		let finalGrowth = actor.customGrowth(1);
		let NeededPoints = actor.customPointsNeeded(1);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(MPCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(1) + actor.mmp > ValueCap ? ValueCap - actor.mmp : actor.customGrowth(1);
			} else { finalGrowth = actor.customGrowth(1) }; // Growth without Cap
			// Raise Param
			actor.addParam(1, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[1] += finalGrowth;
			actor._spentPoints[1] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// ATK
	Scene_StatDistribution.prototype.growATK = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(2);
		let finalGrowth = actor.customGrowth(2);
		let NeededPoints = actor.customPointsNeeded(2);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(ATKCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(2) + actor.atk > ValueCap ? ValueCap - actor.atk : actor.customGrowth(2);
			} else { finalGrowth = actor.customGrowth(2) }; // Growth without Cap
			// Raise Param
			actor.addParam(2, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[2] += finalGrowth;
			actor._spentPoints[2] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// DEF
	Scene_StatDistribution.prototype.growDEF = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(3);
		let finalGrowth = actor.customGrowth(3);
		let NeededPoints = actor.customPointsNeeded(3);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(DEFCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(3) + actor.def > ValueCap ? ValueCap - actor.def : actor.customGrowth(3);
			} else { finalGrowth = actor.customGrowth(3) }; // Growth without Cap
			// Raise Param
			actor.addParam(3, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[3] += finalGrowth;
			actor._spentPoints[3] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// MAT
	Scene_StatDistribution.prototype.growMAT = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(4);
		let finalGrowth = actor.customGrowth(4);
		let NeededPoints = actor.customPointsNeeded(4);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(MATCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(4) + actor.mat > ValueCap ? ValueCap - actor.mat : actor.customGrowth(4);
			} else { finalGrowth = actor.customGrowth(4) }; // Growth without Cap
			// Raise Param
			actor.addParam(4, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[4] += finalGrowth;
			actor._spentPoints[4] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// MDF
	Scene_StatDistribution.prototype.growMDF = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(5);
		let finalGrowth = actor.customGrowth(5);
		let NeededPoints = actor.customPointsNeeded(5);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(MDFCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(5) + actor.mdf > ValueCap ? ValueCap - actor.mdf : actor.customGrowth(5);
			} else { finalGrowth = actor.customGrowth(5) }; // Growth without Cap
			// Raise Param
			actor.addParam(5, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[5] += finalGrowth;
			actor._spentPoints[5] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// AGI
	Scene_StatDistribution.prototype.growAGI = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(6);
		let finalGrowth = actor.customGrowth(6);
		let NeededPoints = actor.customPointsNeeded(6);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(AGICap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(6) + actor.agi > ValueCap ? ValueCap - actor.agi : actor.customGrowth(6);
			} else { finalGrowth = actor.customGrowth(6) }; // Growth without Cap
			// Raise Param
			actor.addParam(6, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[6] += finalGrowth;
			actor._spentPoints[6] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	};
// LUK
	Scene_StatDistribution.prototype.growLUK = function() {
		// Initialize the used constants
		const actor = this.actor();
		const user = this.actor();
		const a = this.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		const points = actor.distributionPoints();
		let ValueCap = actor.customValueCap(7);
		let finalGrowth = actor.customGrowth(7);
		let NeededPoints = actor.customPointsNeeded(7);
		// Check for required distribution points
		if (points < NeededPoints) {
			// Abort
			SoundManager.playBuzzer();
			this._commandWindow.activate();
		} else {
			// Deduct Points
			actor.addDistributionPoints(-NeededPoints);
			// Check for Cap
			if (eval(LUKCap)) {
				// Get Growth with enabled Cap
				finalGrowth = actor.customGrowth(7) + actor.luk > ValueCap ? ValueCap - actor.luk : actor.customGrowth(7);
			} else { finalGrowth = actor.customGrowth(7) }; // Growth without Cap
			// Raise Param
			actor.addParam(7, finalGrowth);
			// Increase APParams and spentPoints (needed for Plugin Commands)
			actor._APParams[7] += finalGrowth;
			actor._spentPoints[7] += NeededPoints;
			// Refresh and activate
			this._commandWindow.refresh();
			this._commandWindow.activate();
		};
		// Refresh and activate
		this._commandWindow.refresh();
		this._commandWindow.activate();
	}

 //* ============================================================================
 //* Window_StatCommand
 //* A command window that's been transformed to also display information.
 //* ============================================================================

	function Window_StatCommand() {this.initialize.apply(this, arguments);}
	
	Window_StatCommand.prototype = Object.create(Window_Command.prototype);
	Window_StatCommand.prototype.constructor = Window_StatCommand;
	
	Window_StatCommand.prototype.initialize = function(rect) {
		Window_Command.prototype.initialize.call(this, rect);
		this.refresh();
	};
	
	Window_StatCommand.prototype.windowHeight = function() {
		return SceneManager._scene._ovWindow.height;
	};

	Window_StatCommand.prototype.windowWidth = function() {
		return 240;
	};

	Window_StatCommand.prototype.numVisibleRows = function() {
		return 9;
	};
	
	Window_StatCommand.prototype.isOkEnabled = function() {
		return true;
	};

	Window_StatCommand.prototype.itemTextAlign = function() {
    return "left";
};

	Window_StatCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.refresh.call(this);
    if (!this._actor) return;
	const actor = this._actor;
    this.drawActorFace(actor, 4, 4, 144, 144);
	this.drawActorName(actor, 144 + 24, 0, 128);
	this.drawActorClass(actor, 144 + 24, this.lineHeight(), 256);
	this.drawActorParams(0, 148);
	this.drawPoints(this._width / 2 - 144 + this.itemPadding() * 2, 0);
	};

	Window_StatCommand.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_StatCommand.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
};

Window_StatCommand.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width);
};

	Window_StatCommand.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    	};
	};

	Window_StatCommand.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 148;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

	Window_StatCommand.prototype.itemLineRect = function(index) {
    const rect = this.itemRectWithPadding(index);
    const padding = (rect.height - this.lineHeight()) / 2;
    rect.y += padding;
    rect.height -= padding * 2;
    return rect;
};

	Window_StatCommand.prototype.iconNumber = function(index) {
		return this._list[index].icon || 0;
	};

	Window_StatCommand.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const textMargin = ImageManager.iconWidth + 4;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawIcon(this.iconNumber(index), rect.x, rect.y)
    this.drawText(this.commandName(index), rect.x + textMargin, rect.y, rect.width, align);
};

	Window_StatCommand.prototype.drawPoints = function(x, y) {
		if (!this._actor) return;
		const actor = this._actor;
		this.changeTextColor(ColorManager.textColor(APSD_DistributionColor));
		this.drawText(PointsVocab, x, y, 256);
		const textWidth = this.textWidth(PointsVocab);
		this.changeTextColor(ColorManager.normalColor());
		this.drawText(String(actor.distributionPoints()), x + textWidth + this.itemPadding() * 1.5, y, 256);
		this.resetTextColor();
	};

	Window_StatCommand.prototype.drawActorParams = function(x, y) {
		if (!this._actor) return;
		const actor = this._actor;
		const actorClass = actor.currentClass();
		let drawn = 0;
		let defaultSpacing = this.itemWidth() - this.colSpacing() - this.itemPadding() * 1.5;
		let dx = x
		// HP
		if (eval(ShowHP)) {
		let dx = defaultSpacing - this.textWidth(actor.mhp);
		this.drawTextEx(String(actor.mhp), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// MP
		if (eval(ShowMP)) {
		let dx = defaultSpacing - this.textWidth(actor.mmp);
		this.drawTextEx(String(actor.mmp), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// ATK
		if (eval(ShowATK)) {
		let dx = defaultSpacing - this.textWidth(actor.atk);
		this.drawTextEx(String(actor.atk), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// DEF
		if (eval(ShowDEF)) {
		let dx = defaultSpacing - this.textWidth(actor.def);
		this.drawTextEx(String(actor.def), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// MAT
		if (eval(ShowMAT)) {
		let dx = defaultSpacing - this.textWidth(actor.mat);
		this.drawTextEx(String(actor.mat), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// MDF
		if (eval(ShowMDF)) {
		let dx = defaultSpacing - this.textWidth(actor.mdf);
		this.drawTextEx(String(actor.mdf), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// AGI
		if (eval(ShowAGI)) {
		let dx = defaultSpacing - this.textWidth(actor.agi);
		this.drawTextEx(String(actor.agi), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
		// LUK
		if (eval(ShowLUK)) {
		let dx = defaultSpacing - this.textWidth(actor.luk);
		this.drawTextEx(String(actor.luk), dx, y + (this.rowSpacing() + this.itemHeight() * drawn));
		drawn += 1;
		};
	};

	Window_StatCommand.prototype.enableHP = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(0);
		let NeededPoints = actor.customPointsNeeded(0);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(HPCap) && actor.mhp >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableMP = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(1);
		let NeededPoints = actor.customPointsNeeded(1);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(MPCap) && actor.mmp >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableATK = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(2);
		let NeededPoints = actor.customPointsNeeded(2);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(ATKCap) && actor.atk >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableDEF = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(3);
		let NeededPoints = actor.customPointsNeeded(3);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(DEFCap) && actor.def >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableMAT = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(4);
		let NeededPoints = actor.customPointsNeeded(4);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(MATCap) && actor.mat >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableMDF = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(5);
		let NeededPoints = actor.customPointsNeeded(5);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(MDFCap) && actor.mdf >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableAGI = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(6);
		let NeededPoints = actor.customPointsNeeded(6);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(AGICap) && actor.agi >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.enableLUK = function() {
		let foo = true;
		const user = SceneManager._scene.actor();
		const actor = user;
		const a = SceneManager._scene.actor();
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let ValueCap = actor.customValueCap(7);
		let NeededPoints = actor.customPointsNeeded(7);
		if (actor.distributionPoints() >= NeededPoints) {
			foo = true;
			if (eval(LUKCap) && actor.luk >= ValueCap) {
				foo = false;
			} else {
				foo = true;
			};
		} else {
			foo = false;
		};
		return foo;
	};

	Window_StatCommand.prototype.addCommand = function(
    name, symbol, enabled = true, icon, ext = null
) {
    this._list.push({ name: name, symbol: symbol, enabled: enabled, icon: icon, ext: ext });
};
	
	Window_StatCommand.prototype.makeCommandList = function() {
		if (eval(ShowHP)) { this.addCommand(HPVocab, 'hp', this.enableHP(), HPIcon) };
		if (eval(ShowMP)) { this.addCommand(MPVocab, 'mp', this.enableMP(),  MPIcon) };
		if (eval(ShowATK)) { this.addCommand(ATKVocab, 'atk', this.enableATK(), ATKIcon) };
		if (eval(ShowDEF)) { this.addCommand(DEFVocab, 'def', this.enableDEF(), DEFIcon) };
		if (eval(ShowMAT)) { this.addCommand(MATVocab, 'mat', this.enableMAT(), MATIcon) };
		if (eval(ShowMDF)) { this.addCommand(MDFVocab, 'mdf', this.enableMDF(), MDFIcon) };
		if (eval(ShowAGI)) { this.addCommand(AGIVocab, 'agi', this.enableAGI(), AGIIcon) };
		if (eval(ShowLUK)) { this.addCommand(LUKVocab, 'luk', this.enableLUK(), LUKIcon) };
		//if (eval(APShowFinish)) { this.addCommand(ReturnVocab, 'cancel') };
	};
	
	Window_StatCommand.prototype.setHelpWindow = function(helpWindow) {
		this._helpWindow = helpWindow;
	};
	
	Window_StatCommand.prototype.update = function() {
		Window_Command.prototype.update.call(this);
	};

	
	Window_StatCommand.prototype.updateHelp = function() {
		const user = SceneManager._scene.actor();
		const a = SceneManager._scene.actor();
		const actor = a;
		const s = $gameSwitches._data;
		const v = $gameVariables._data;
		let param;
		let amount;
		let points;
		let text;
		let custom;
		switch (this.currentSymbol()) {
			case 'hp':
			 param = HPVocab;
			 amount = actor.customGrowth(0);
			 points = actor.customPointsNeeded(0);
			 text = eval(HelpWindowText);
			 custom = user._APhpText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'mp':
			param = MPVocab;
			amount = actor.customGrowth(1);
			points = actor.customPointsNeeded(1);
			text = eval(HelpWindowText)
			custom = user._APmpText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'atk':
			 param = ATKVocab;
			 amount = actor.customGrowth(2);
			 points = actor.customPointsNeeded(2);
			 text = eval(HelpWindowText)
			 custom = user._APatkText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'def':
			 param = DEFVocab;
			 amount = actor.customGrowth(3);
			 points = actor.customPointsNeeded(3);
			 text = eval(HelpWindowText)
			 custom = user._APdefText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'mat':
			 param = MATVocab;
			 amount = actor.customGrowth(4);
			 points = actor.customPointsNeeded(4);
			 text = eval(HelpWindowText)
			 custom = user._APmatText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'mdf':
			 param = MDFVocab;
			 amount = actor.customGrowth(5);
			 points = actor.customPointsNeeded(5);
			 text = eval(HelpWindowText)
			 custom = user._APmdfText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'agi':
			 param = AGIVocab;
			 amount = actor.customGrowth(6);
			 points = actor.customPointsNeeded(6);
			 text = eval(HelpWindowText)
			 custom = user._APagiText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'luk':
			 param = LUKVocab;
			 amount = actor.customGrowth(7);
			 points = actor.customPointsNeeded(7);
			 text = eval(HelpWindowText)
			 custom = user._APlukText || "";
			this._helpWindow.setText(text + custom);
			break;
			case 'cancel':
			this._helpWindow.setText(ReturnText);
			break;
		};
	};

 //* ============================================================================
 //* Window_Overview
 //* Not used in this version!
 //* ============================================================================

	function Window_Overview() {this.initialize.apply(this, arguments);}
	
	Window_Overview.prototype = Object.create(Window_StatusBase.prototype);
	Window_Overview.prototype.constructor = Window_Overview;
	
	Window_Overview.prototype.initialize = function(rect) {
		Window_StatusBase.prototype.initialize.call(this, rect);
		this._actor = null;
		this._width = rect.width;
		this._height = rect.height;
		this.refresh();
	};
	
	Window_Overview.prototype.refresh = function() {
	};

	Window_Overview.prototype.useSmallVersion = function() {
		if (Graphics.boxHeight < 768) return true;
		return false;
	};

	Window_Overview.prototype.newColumnRequired = function(y, drawn) {
		const gaugeHeight = 6;
		if (y + (this.lineHeight() * drawn) + this.lineHeight() * 2 + gaugeHeight > this._height) {
			return true;
		} else {
			return false;
		};
	};

	Window_Overview.prototype.processNewColumn = function(x, y, drawn, flag) {
		const newColumn = this.newColumnRequired(y, drawn);
		if (newColumn && flag === 1) {
			return (this._width / 2 - this.itemPadding() * 2) + 1;
		} else if (!newColumn && flag === 1) {
			return x;
		};
		if (newColumn && flag === 2) {
			return 0;
		} else if (!newColumn && flag === 2) {
			return drawn;
		};
	};

 //* ============================================================================
 //* Window_APSDConfirm
 //* ============================================================================

function Window_APSDConfirm() {
	this.initialize.apply(this, arguments);
};

	Window_APSDConfirm.prototype = Object.create(Window_Command.prototype);
	Window_APSDConfirm.prototype.constructor = Window_APSDConfirm;
	
	Window_APSDConfirm.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.openness = 0;
	};

	Window_APSDConfirm.prototype.refresh = function() {
		this.contents.clear();
		this.contentsBack.clear();
		this.clearCommandList();
		this.makeCommandList();
		Window_Selectable.prototype.refresh.call(this);
	};

	Window_APSDConfirm.prototype.makeCommandList = function() {
		this.addCommand(YesVocab, 'yes');
		this.addCommand(NoVocab, 'no');
	};

	Window_APSDConfirm.prototype.windowHeight = function() {
		return this.fittingHeight(3);
	};

	Window_APSDConfirm.prototype.itemTextAlign = function() {
		return 'center';
	};

	Window_APSDConfirm.prototype.displayText = function() {
		const rect = new Rectangle(0, 0, this.innerWidth, this.lineHeight());
		const text = APSD_ConfirmText;
		this.drawBackgroundRect(rect);
		this.changeTextColor(ColorManager.textColor(APSD_ConfirmationColor));
    	this.drawText(text, rect.x, rect.y, rect.width, "center");
	};

	Window_APSDConfirm.prototype.itemRect = function(index) {
		const maxCols = this.maxCols();
    	const itemWidth = this.itemWidth();
    	const itemHeight = this.itemHeight();
    	const colSpacing = this.colSpacing();
    	const rowSpacing = this.rowSpacing();
    	const col = index % maxCols;
    	const row = Math.floor(index / maxCols);
    	const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    	const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + this.lineHeight();
    	const width = itemWidth - colSpacing;
    	const height = itemHeight - rowSpacing;
    	return new Rectangle(x, y, width, height);
	};
	
 //* ============================================================================
 //* Window_MenuCommand
 //* ============================================================================

AP_StatDistribution_Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    AP_StatDistribution_Window_MenuCommand_addOriginalCommands.call(this);
    this.addStatCommand();
};

Window_MenuCommand.prototype.addStatCommand = function() {
	if (Imported.VisuMZ_1_MainMenuCore) return;
	if (!APSDAddCommand) return;
	if ($gameSystem.isShowDistribution()) this.addCommand(APMenuName, 'distribution', $gameSystem.isEnableDistribution());
};

 //* ============================================================================
 //* Scene_Menu
 //* ============================================================================

AP_StatDistribution_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	AP_StatDistribution_createCommandWindow.call(this);
	this._commandWindow.setHandler('distribution', this.commandPersonal.bind(this));
};

AP_StatDistribution_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
	if (this._commandWindow.currentSymbol() === 'distribution') {
		SceneManager.push(Scene_StatDistribution);
	} else {
	AP_StatDistribution_onPersonalOk.call(this);
	}
}

 //* ============================================================================
 //* Game_Actor
 //* ============================================================================

AP_StatDistribution_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	AP_StatDistribution_Game_Actor_setup.call(this, actorId);
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	this._distributionPoints = eval(InitialPoints);
	if (Imported.AP_AbilityDistribution) {
		this._abilityPoints = eval(APADInitialPoints);
	} else {
		this._abilityPoints = 0;
	}
	if ($dataClasses[this._classId].initialPoints) this._distributionPoints = eval($dataClasses[this._classId].initialPoints);
	if ($dataActors[actorId].initialPoints) this._distributionPoints = eval($dataActors[actorId].initialPoints);
	if ($dataClasses[this._classId].ADinitialPoints) this._abilityPoints = eval($dataClasses[this._classId].ADinitialPoints);
	if ($dataActors[actorId].ADinitialPoints) this._abilityPoints = eval($dataActors[actorId].ADinitialPoints);
	//V 1.04 
	this._spentPoints = [0, 0, 0, 0, 0, 0, 0, 0];
	this._APParams = [0, 0, 0, 0, 0, 0, 0, 0];
};

Game_Actor.prototype.spentPoints = function(paramNumber) {
	return this._spentPoints[paramNumber];
};

Game_Actor.prototype.resetParamPoints = function(paramNumber) {
	const refund = 0;
	if (this._spentPoints[paramNumber] > 0) {
		refund += this._spentPoints[paramNumber];
		this._spentPoints[paramNumber] = 0;
		const amount = this._APParams[paramNumber];
		this.addParam(paramNumber, -amount);
		this._APParams[paramNumber] = 0;
		this.addDistributionPoints(refund);
	} else {
		return;
	};
};

Game_Actor.prototype.resetPoints = function() {
	let refund = 0;
	for (let i = 0; i < this._spentPoints.length; i++) {
		const pointsSpent = this._spentPoints[i];
		refund += pointsSpent;
		this._spentPoints[i] = 0;
	};
	if (refund > 0) {
		this.addDistributionPoints(refund);
		for (let i = 0; i < this._APParams.length; i++) {
			const amount = this._APParams[i];
			this.addParam(i, -amount);
			this._APParams[i] = 0;
		};
	};
	this.addDistributionPoints(-99)
}

Game_Actor.prototype.checkPointsRange = function() {
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	this._distributionPoints = Math.max(0, this._distributionPoints);
	this._abilityPoints = Math.max(0, this._abilityPoints);
	this._distributionPoints = Math.floor(Math.min(eval(MaxPoints), this._distributionPoints));
	if (Imported.AP_AbilityDistribution) {
		this._abilityPoints = Math.floor(Math.min(eval(APADMaxPoints), this._abilityPoints));
	};
}

Game_Actor.prototype.distributionPoints = function() {
	return this._distributionPoints;
};

Game_Actor.prototype.abilityPoints = function() {
	return this._abilityPoints;
}

Game_Actor.prototype.addDistributionPoints = function(amount) {
	this._distributionPoints += amount;
	this.checkPointsRange();
};

Game_Actor.prototype.addAbilityPoints = function(amount) {
	this._abilityPoints += amount;
	this.checkPointsRange();
};

AP_StatDistribution_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	AP_StatDistribution_Game_Actor_levelUp.call(this);
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	const points = eval(LevelUpPoints);
	if (Imported.AP_AbilityDistribution) {
		const ADpoints = eval(APADLevelUpPoints);
	} else {
		const ADpoints = 0;
	}
	if ($dataClasses[this._classId].levelUpPoints) { points = eval($dataClasses[this._classId].levelUpPoints) };
	if ($dataActors[this._actorId].levelUpPoints) { points = eval($dataActors[this._actorId].levelUpPoints) };
	if ($dataClasses[this._classId].ADlevelUpPoints) { ADpoints = eval($dataClasses[this._classId].ADlevelUpPoints) };
	if ($dataActors[this._actorId].ADlevelUpPoints) { ADpoints = eval($dataActors[this._actorId].ADlevelUpPoints) };
	const randomBonus = Math.randomInt(6)
	$gameMessage.add(randomBonus)
	this.addDistributionPoints(points + randomBonus);
	if (Imported.AP_AbilityDistribution) this.addAbilityPoints(ADpoints);
};

AP_StatDistribution_Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
	AP_StatDistribution_Game_Actor_displayLevelUp.call(this, newSkills);
	if (eval(APShowMessage)) this.displayDistributionPoints();
};

Game_Actor.prototype.displayDistributionPoints = function() {
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	const points1 = eval(LevelUpPoints);
	if ($dataClasses[this._classId].levelUpPoints) { points1 = eval($dataClasses[this._classId].levelUpPoints) };
	if ($dataActors[this._actorId].levelUpPoints) { points1 = eval($dataActors[this._actorId].levelUpPoints) };
	const points = String(points1 + " " + PointsVocab);
		const actor = this.name();
		const text = eval(APLevelMessage);
		$gameMessage.newPage();
		$gameMessage.add(text);
};

Game_Actor.prototype.setParamDescription = function(name, text) {
	const nameLower = name.toLowerCase();
	switch (nameLower) {
		case 'hp':
		this._APhpText = text;
		break;
		case 'mp':
		this._APmpText = text;
		break;
		case 'atk':
		this._APatkText = text;
		break;
		case 'def':
		this._APdefText = text;
		break;
		case 'mat':
		this._APmatText = text;
		break;
		case 'mdf':
		this._APmdfText = text;
		break;
		case 'agi':
		this._APagiText = text;
		break;
		case 'luk':
		this._APlukText = text;
		break;
	};
};

Game_Actor.prototype.customPointsNeeded = function(param) {
	// This function retrieves the default Points Needed value and
	// then checks if there is any custom value set by the developer.
	// If so, that value is instead used. This same principle applies
	// to the following two functions as well.
	const actor = this;
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	const points = this.distributionPoints();
	let NeededPoints = 0;
	if (param === 0) NeededPoints = eval(HPNeeded);
	if (param === 1) NeededPoints = eval(MPNeeded);
	if (param === 2) NeededPoints = eval(ATKNeeded);
	if (param === 3) NeededPoints = eval(DEFNeeded);
	if (param === 4) NeededPoints = eval(MATNeeded);
	if (param === 5) NeededPoints = eval(MDFNeeded);
	if (param === 6) NeededPoints = eval(AGINeeded);
	if (param === 7) NeededPoints = eval(LUKNeeded);
	if (this.currentClass().APSD_customPointsNeeded[param] !== undefined) NeededPoints = eval(this.currentClass().APSD_customPointsNeeded[param]);
	if ($dataActors[this._actorId].APSD_customPointsNeeded[param] !== undefined) NeededPoints = eval($dataActors[this._actorId].APSD_customPointsNeeded[param]);
	return NeededPoints;
};

Game_Actor.prototype.customGrowth = function(param) {
	const actor = this;
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	const points = this.distributionPoints();
	let Growth = 0;
	if (param === 0) Growth = eval(HPGrowth);
	if (param === 1) Growth = eval(MPGrowth);
	if (param === 2) Growth = eval(ATKGrowth);
	if (param === 3) Growth = eval(DEFGrowth);
	if (param === 4) Growth = eval(MATGrowth);
	if (param === 5) Growth = eval(MDFGrowth);
	if (param === 6) Growth = eval(AGIGrowth);
	if (param === 7) Growth = eval(LUKGrowth);
	if (this.currentClass().APSD_customGrowth[param] !== undefined) Growth = eval(this.currentClass().APSD_customGrowth[param]);
	if ($dataActors[this._actorId].APSD_customGrowth[param] !== undefined) Growth = eval($dataActors[this._actorId].APSD_customGrowth[param]);
	return Growth;
};

Game_Actor.prototype.customValueCap = function(param) {
	const actor = this;
	const user = this;
	const a = this;
	const s = $gameSwitches._data;
	const v = $gameVariables._data;
	const points = this.distributionPoints();
	let ValueCap = 0;
	if (param === 0) ValueCap = eval(HPCapValue);
	if (param === 1) ValueCap = eval(MPCapValue);
	if (param === 2) ValueCap = eval(ATKCapValue);
	if (param === 3) ValueCap = eval(DEFCapValue);
	if (param === 4) ValueCap = eval(MATCapValue);
	if (param === 5) ValueCap = eval(MDFCapValue);
	if (param === 6) ValueCap = eval(AGICapValue);
	if (param === 7) ValueCap = eval(LUKCapValue);
	if (this.currentClass().APSD_customValueCap[param] !== undefined) ValueCap = eval(this.currentClass().APSD_customValueCap[param]);
	if ($dataActors[this._actorId].APSD_customValueCap[param] !== undefined) ValueCap = eval($dataActors[this._actorId].APSD_customValueCap[param]);
	return ValueCap;
};

 //* ============================================================================
 //* Game_System
 //* ============================================================================

Game_System.prototype.isShowDistribution = function() {
	if (MenuSwitch === 0) {
		return true
		} else {
		return $gameSwitches.value(MenuSwitch);
	};
};

Game_System.prototype.isEnableDistribution = function() {
	if (EnableSwitch === 0) {
		return true
		} else {
		return $gameSwitches.value(EnableSwitch);
	};
};

 //* ============================================================================
 //* PluginManager
 //* ============================================================================

const pluginName = "AP_StatDistribution";
PluginManager.registerCommand(pluginName, "Add Points", args => {
	const actorId = Number(args["Actor:num"]);
	const points = Number(args["Points:num"]);
    $gameActors.actor(actorId).addDistributionPoints(points);
});

PluginManager.registerCommand(pluginName, "OpenStatDistribution", () => {
    if (!$gameParty.inBattle()) { SceneManager.push(Scene_StatDistribution) };
});

PluginManager.registerCommand(pluginName, "ResetPoints", args => {
	const actorId = Number(args["Actor:num"]);
	$gameMessage.add(actorId)
    $gameActors.actor(actorId).resetPoints();
});

PluginManager.registerCommand(pluginName, "ResetParamPoints", (actor, param) => {
    $gameActors.actor(actor).resetParamPoints(param);
});

// })();
//=============================================================================
// End of Plugin
//=============================================================================
