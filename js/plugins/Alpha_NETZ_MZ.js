/*:
 * @plugindesc (v.0.6)[BASIC] Multiplayer for RPG Maker
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/alpha-net-z/
 *
 * @help
 *
 * Alpha NET Z plugin is still in development
 *
 * WebPage: https://kdworkshop.net/plugins/alpha-net-z/
 * Documentation: https://github.com/KageDesu/Alpha-NET-Z/wiki
 *
 * Required content:
 *  - plugin Alpha_Core.js
 *  - plugin SocketIO.js
 *  - file css\anet.css
 *  - folder img\Alpha\*all files*
 *
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"195.161.41.20","serverPort":"3034"}
 * @desc [PRO] If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameModeSettingsGroup
 * @text Multiplayer Settings
 * 
 * @param onlySameMap:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Wait Map Transfer?
 * @default false
 * @desc When player transferred to the new map he will wait until all players not transfered on same map.
 * 
 * @param singlePlayerAllowed:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text New Game Allowed?
 * @default true
 * @desc If false, the menu item "New Game" will not be displayed in title menu
 * 
 * @param roomFilter:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Rooms Filter?
 * @on ON
 * @off OFF
 * @default false
 * @desc [PRO] If filter is ON, you can see only this (same) game rooms in lobby
 * 
 * @param saveLoadGame:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Save and Load Allowed?
 * @on YES
 * @off NO
 * @default true
 * @desc Can player save and load network game?
 * 
 * @param inGameChat:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text In-Game Chat?
 * @on YES
 * @off NO
 * @default false
 * @desc [PRO] In-Game chat on Map Scene? (More chat settings will be in next update...)
 * 
 * @param chatStartMessage
 * @parent inGameChat:b
 * @text Start Message
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Message when New Game started. Leave empty if not need any start message.
 * 
 * @param chatOpenCloseKey
 * @parent inGameChat:b
 * @text Chat Key
 * @default t
 * @desc Key to open (close) chat window in game.
 * 
 * @param chatSayKey
 * @parent inGameChat:b
 * @text Say Key
 * @default t
 * @desc Key to open input message scene. Only when chat visible. Can be same with Chat Key.
 * 
 * @param playersSettingsGroup
 * @text Players Settings
 * 
 * 
 * @param actorsForNetwork:intA
 * @parent playersSettingsGroup
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players. More than 2 - PRO only.
 * 
 * @param isActorSelectionAllowed:b
 * @parent playersSettingsGroup
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param isSinglePlayerStartAllowed:b
 * @parent playersSettingsGroup
 * @text One player start?
 * @type boolean
 * @default true
 * @desc If in room only 1 player (host), he can start game alone?
 * 
 * @param playerActorNameType
 * @parent playersSettingsGroup
 * @text Player Name for Actor
 * @type select
 * @option Not Show
 * @option Instead Name
 * @option Instead Nickname
 * @default Instead Nickname
 * @desc Show network player name instead of his Actor name (or nickname)
 * 
 * @param playerLeaveGameCommonEvent:int
 * @parent playersSettingsGroup
 * @text On Player Disconnect CE
 * @type common_event
 * @default 0
 * @desc That common event will be called when somebody leave (disconnect) game. 0 - nothing
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 


 * @command EventStartOptions
 * @text Event Options
 * @desc Event network start options
 * 
 * @arg whoSelector
 * @text Who can start
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @desc Select who can start this event
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg lockMode
 * @text Lock Event?
 * @type boolean
 * @default false
 * @desc If true - event will be locked while executed. Nobody can't start locked event
 * 
 * @arg sharedMode
 * @text Shared Mode
 * @type select
 * @option No
 * @option Strict
 * @option Optional
 * @desc Shared event - starts for all players simultaneously, synchronized commands execution
 * @default No
 * 
 * 
 * @command EventCommandSelector
 * @text Command Options
 * @desc Next Event Command network start options
 * 
 * @arg whoSelector
 * @text Execute for
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @option Me Except
 * @desc Select for who this event command will be executed
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg scope
 * @text Scope
 * @type select
 * @option Same map
 * @option All world
 * @default Same map
 * @desc For which players will the virtual command be executed?
 * 
 * @arg executeMode
 * @text Execute Mode
 * @type select
 * @option Auto
 * @option Virtual
 * @option Common Event
 * @default Auto
 * @desc How this command will be exectuted for other players. Read Wiki for more info
 * 
 * @command SharedBattle
 * @text Set Shared Battle
 * @desc Make next Battle Processing command shared between all players
 * 
 * @arg battleId
 * @text ID
 * @default
 * @desc Unique battle ID. Empty - not shared battle (by default)
 * 
 * 
 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option 195.161.41.20
@desc Server IP address (ip4)
@default 195.161.41.20

@param serverPort
@text Port
@default 3034

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/
// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 60; // 0.6.0

ANET.ServerRev = 112; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};


ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
}

ANET.isPro = function() {
    return false;
};
//Compressed by MV Plugin Builder
(function(){var a0_0x384c=['disconnect','getGameVersion','hideLoader','You\x20are\x20Master\x20(host)\x20of\x20room:\x20','isConnected','Tmklu','23073vuWYgF','8172QDeGQN','leaveRoom','1txyQdY','closeRoom','onLeaveRoom','socket','Callback\x20for:\x20','221653dcKCLC','njhra','104845LOoEGJ','setFrom','actorsForNetwork','ANNetwork','EHRgg','JFuLM','isSameMapMode','oqeSW','Color','1UqGIor','isMZ','room','onRoomClosed','LbVAF','Send,\x20get!:\x20','stop','setColors','apply','KjyXD','Trace','RcoTy','You\x20try\x20get\x20data\x20from\x20Server,\x20but\x20NOT\x20connection!','name','Send,\x20callback:\x20','cBkQF','BLACK','YxQqd','LkmyP','get','Timeout\x20for:\x20','gwPwV','817ZcCiDD','Network\x20inited','283YtVFOM','Network','setRoomMaster','isMasterClient','reset','startConnection','requestRoomRefresh','serverPort','ZwmTf','BOrOC','gameTitle','http://','You\x20are\x20joined\x20to\x20room:\x20','callback','IebzK','isOnlySameMapMode','log','7MsYJgZ','34792MYILqE','client','Connect\x20to\x20','2UhungN','gJCaH','jDiFC','trace','showLoader','serverIp','Send:\x20','DPagD','GREEN','getRoomData','ynzWb','send','getLightestColor','29YsnQnK','11218fxQSHJ','WfZOC','DevLog','1cLbCOv','wcyLz','setConnectionToMasterCallback','_isWaitServer','You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!','isWaitServer','initSystem','fullName','setRoomJoin','You\x20try\x20send\x20callback\x20message,\x20but\x20NOT\x20connection!','mcutM','_isHost','myId','Lobby'];function a0_0x2b68(_0x39ad3d,_0x10a3a4){_0x39ad3d=_0x39ad3d-0xb1;var _0x384c43=a0_0x384c[_0x39ad3d];return _0x384c43;}var a0_0x1e0e30=a0_0x2b68;(function(_0x1740be,_0x14b887){var _0x332ef1=a0_0x2b68;while(!![]){try{var _0x2c1a5d=-parseInt(_0x332ef1(0xc5))*parseInt(_0x332ef1(0xd7))+-parseInt(_0x332ef1(0xf8))*parseInt(_0x332ef1(0x101))+parseInt(_0x332ef1(0xb2))*-parseInt(_0x332ef1(0xb4))+-parseInt(_0x332ef1(0xda))*-parseInt(_0x332ef1(0xf6))+-parseInt(_0x332ef1(0xd6))*-parseInt(_0x332ef1(0xef))+-parseInt(_0x332ef1(0xc6))*-parseInt(_0x332ef1(0xc9))+-parseInt(_0x332ef1(0xf1))*-parseInt(_0x332ef1(0xee));if(_0x2c1a5d===_0x14b887)break;else _0x1740be['push'](_0x1740be['shift']());}catch(_0x4e345c){_0x1740be['push'](_0x1740be['shift']());}}}(a0_0x384c,0x2160c),window[a0_0x1e0e30(0xfb)]=function(){},window['NET']=window['ANNetwork'],function(){var _0x27488f=a0_0x1e0e30,_0x4f36c3,_0x4000d8;_0x4f36c3=new KDCore[(_0x27488f(0xd9))](_0x27488f(0xb5)),_0x4f36c3[_0x27488f(0x108)](KDCore['Color'][_0x27488f(0xd1)],KDCore[_0x27488f(0x100)][_0x27488f(0x111)][_0x27488f(0xd5)](0x23)),_0x4f36c3['on'](),_0x4000d8=window[_0x27488f(0xfb)],_0x4000d8['isConnected']=function(){if('aleTd'!=='XdEcD')return this['socket']!=null;else{function _0x3b0a2d(){var _0x1e426a=a0_0x2b68;_0x1a5db6[_0x1e426a(0x109)](this,_0x4bf57b);}}},_0x4000d8[_0x27488f(0xe6)]=function(){var _0x40b6ae=_0x27488f;if(_0x40b6ae(0x105)!=='xDClL'){var _0x3ad99b;return(_0x3ad99b=this[_0x40b6ae(0xf4)])!=null?_0x3ad99b['id']:void 0x0;}else{function _0x17a505(){var _0x386478=_0x40b6ae;return _0x1c8886['p'](_0x386478(0x115)+_0x486ab3),_0x4e0f6b!=null&&_0x4b577c[_0x386478(0x109)](this,_0x1a6cce),_0xa44f1[_0x386478(0xdd)]=![],_0x3b0bcc['hideLoader']();}}},_0x4000d8[_0x27488f(0xb7)]=function(){var _0x221ebd=_0x27488f;return this[_0x221ebd(0xe5)]===!![];},_0x4000d8[_0x27488f(0xfe)]=function(){var _0x2d3586=_0x27488f;if(_0x2d3586(0x110)===_0x2d3586(0xd0)){function _0x78f281(){var _0x1fc31f=_0x2d3586,_0x222f78,_0x174697,_0x5c8196;_0x174697=_0xec57b3['PP']['serverIp'](),_0x5c8196=_0x37b138['PP'][_0x1fc31f(0xbb)](),_0x222f78=_0x1fc31f(0xbf)+_0x174697+':'+_0x5c8196,_0x4cd75b[_0x1fc31f(0xc4)](_0x1fc31f(0xc8)+_0x222f78),this[_0x1fc31f(0xf4)]=_0x38afd9(_0x222f78),this['client']=new _0x3badd0(this['socket']);}}else return ANET['PP'][_0x2d3586(0xc3)]();},_0x4000d8['isBusy']=function(){var _0x350c83=_0x27488f;if('Qcxrb'!=='kKfNE')return this[_0x350c83(0xec)]()&&(this[_0x350c83(0xdf)]()||ANGameManager['isShouldWaitServer']());else{function _0x57aed8(){return;}}},_0x4000d8['isWaitServer']=function(){var _0x44f1a3=_0x27488f;return this[_0x44f1a3(0xec)]()&&this['_isWaitServer']===!![];},function(){var _0x26ad08=_0x27488f;if(_0x26ad08(0xbc)!==_0x26ad08(0xbc)){function _0x1b7507(){var _0x1d4cf7=_0x26ad08;_0x3b2482['p'](_0x1d4cf7(0xe3));}}else return _0x4000d8[_0x26ad08(0xe0)]=function(){var _0x50df4b=_0x26ad08;if(_0x50df4b(0x10a)!==_0x50df4b(0xdb))return this['socket']=null,this['client']=null,this['_isWaitServer']=![],this[_0x50df4b(0xe5)]=![],_0x50df4b(0xb3)['p']();else{function _0x5be04b(){return _0xc851e4['PP']['isOnlySameMapMode']();}}},_0x4000d8[_0x26ad08(0x107)]=function(){var _0x2dbaa0=_0x26ad08,_0x3c228d;NetClientMethodsManager[_0x2dbaa0(0xdc)](null);if((_0x3c228d=this[_0x2dbaa0(0xc7)])!=null){if(_0x2dbaa0(0xc2)!==_0x2dbaa0(0xc2)){function _0x34934a(){var _0x48a344=_0x2dbaa0;_0x11307b['p'](_0x48a344(0x10d));}}else _0x3c228d[_0x2dbaa0(0xe8)]();}this[_0x2dbaa0(0xdd)]=![],this[_0x2dbaa0(0xf4)]=null,ANGameManager[_0x2dbaa0(0xb8)]();},_0x4000d8['startConnection']=function(){var _0x5c45ab=_0x26ad08,_0x19fb69,_0x431f5e,_0x3c9d8b;_0x431f5e=ANET['PP'][_0x5c45ab(0xce)](),_0x3c9d8b=ANET['PP'][_0x5c45ab(0xbb)](),_0x19fb69=_0x5c45ab(0xbf)+_0x431f5e+':'+_0x3c9d8b,console['log']('Connect\x20to\x20'+_0x19fb69),this[_0x5c45ab(0xf4)]=io(_0x19fb69),this[_0x5c45ab(0xc7)]=new NetworkClientHandler(this[_0x5c45ab(0xf4)]);},_0x4000d8['setConnection']=function(_0x19cb24){var _0x4d1052=_0x26ad08;NetClientMethodsManager[_0x4d1052(0xdc)](_0x19cb24),this[_0x4d1052(0xb9)]();},_0x4000d8['send']=function(_0x21c0ba,_0x1b83ff=![]){var _0x371988=_0x26ad08;if(_0x371988(0xb1)==='gwPwV')!this['isConnected']()?_0x4f36c3['p'](_0x371988(0xde)):(!_0x1b83ff&&_0x4f36c3['p'](_0x371988(0xcf)+_0x21c0ba['fullName']()),_0x21c0ba[_0x371988(0xf9)](this[_0x371988(0xf4)]['id'])[_0x371988(0xd4)]());else{function _0x4ffa0a(){var _0x192a0e=_0x371988;_0x21fa2e['p'](_0x192a0e(0xcf)+_0x47af3d[_0x192a0e(0xe1)]());}}},_0x4000d8['get']=function(_0x144422,_0x53dfc2,_0x12e425){var _0xa488a=_0x26ad08;if(_0xa488a(0xbd)!==_0xa488a(0xcb)){var _0x289dac,_0x56d0f1,_0x3e45f7;if(!this[_0xa488a(0xec)]()){if('YxQqd'!==_0xa488a(0x112)){function _0x114fa2(){var _0x265ed0=_0xa488a;return this['isConnected']()&&this[_0x265ed0(0xdd)]===!![];}}else _0x4f36c3['p'](_0xa488a(0x10d));}else{if(_0xa488a(0xca)===_0xa488a(0xff)){function _0x6b24a8(){var _0x18c2ac=_0xa488a;return _0x199c2f['p'](_0x18c2ac(0xf5)+_0x321e91),_0x298d89['apply'](this,_0x39188a);}}else _0x3e45f7=_0x144422['fullName'](),this[_0xa488a(0xdd)]=!![],HUIManager[_0xa488a(0xcd)](),_0x56d0f1=function(..._0x35a040){var _0x433171=_0xa488a;_0x4f36c3['p'](_0x433171(0x115)+_0x3e45f7);if(_0x12e425!=null){if(_0x433171(0xfd)==='fCzfd'){function _0x20d065(){var _0x424ad4=_0x433171;return this[_0x424ad4(0xf4)]=null,this[_0x424ad4(0xc7)]=null,this[_0x424ad4(0xdd)]=![],this[_0x424ad4(0xe5)]=![],_0x424ad4(0xb3)['p']();}}else _0x12e425[_0x433171(0x109)](this,_0x35a040);}return ANNetwork[_0x433171(0xdd)]=![],HUIManager[_0x433171(0xea)]();},_0x289dac=function(..._0x1ce3b5){var _0x1e5c4d=_0xa488a;return _0x4f36c3['p']('Response\x20(get)\x20for:\x20'+_0x3e45f7),_0x53dfc2!=null&&_0x53dfc2[_0x1e5c4d(0x109)](this,_0x1ce3b5),ANNetwork[_0x1e5c4d(0xdd)]=![],HUIManager[_0x1e5c4d(0xea)]();},_0x4f36c3['p'](_0xa488a(0x106)+_0x3e45f7),_0x144422[_0xa488a(0xf9)](this[_0xa488a(0xf4)]['id'])[_0xa488a(0x114)](_0x289dac,_0x56d0f1,0x7d0);}}else{function _0x13c9db(){var _0x506cd8=_0xa488a;return this[_0x506cd8(0xd4)](_0x849410['Trace'](_0x12cb9f));}}},_0x4000d8['callback']=function(_0x29ac6d,_0x2da7d5){var _0x412fba=_0x26ad08,_0x29a222,_0x30292a;if(!this[_0x412fba(0xec)]()){if(_0x412fba(0xed)!==_0x412fba(0xed)){function _0x196f5f(){return this['_isHost']===!![];}}else _0x4f36c3['p']('You\x20try\x20send\x20callback\x20message,\x20but\x20NOT\x20connection!');}else _0x30292a=_0x29ac6d['fullName'](),_0x29a222=function(..._0x16d72c){var _0x2ad15f=_0x412fba;if(_0x2ad15f(0x113)===_0x2ad15f(0x113))return _0x4f36c3['p']('Callback\x20for:\x20'+_0x30292a),_0x2da7d5['apply'](this,_0x16d72c);else{function _0x424b99(){return;}}},_0x4f36c3['p'](_0x412fba(0x10f)+_0x30292a),_0x29ac6d[_0x412fba(0xf9)](this[_0x412fba(0xf4)]['id'])['callback'](_0x29a222);},_0x4000d8[_0x26ad08(0xcc)]=function(_0x4a42c9){var _0x50a161=_0x26ad08;return this[_0x50a161(0xd4)](NMS[_0x50a161(0x10b)](_0x4a42c9));};}(),function(){var _0x1434ed=_0x27488f;return _0x4000d8[_0x1434ed(0xb6)]=function(_0x5dbb8e){var _0x1655fc=_0x1434ed;if(_0x1655fc(0xf7)!==_0x1655fc(0xf7)){function _0x1edc1a(){var _0x4b930c=_0x1655fc,_0x465ccf;return(_0x465ccf=this[_0x4b930c(0xf4)])!=null?_0x465ccf['id']:void 0x0;}}else return this[_0x1655fc(0x103)]=_0x5dbb8e,this['_isHost']=!![],_0x4f36c3['p'](_0x1655fc(0xeb)+this[_0x1655fc(0x103)][_0x1655fc(0x10e)]);},_0x4000d8[_0x1434ed(0xe2)]=function(_0xd7e3d){var _0x5359a3=_0x1434ed;return this[_0x5359a3(0x103)]=_0xd7e3d,this[_0x5359a3(0xe5)]=![],_0x4f36c3['p'](_0x5359a3(0xc0)+this['room'][_0x5359a3(0x10e)]);},_0x4000d8['onRoomDataFromServer']=function(_0x1e88e9){var _0x11ce7a=_0x1434ed;if(_0x11ce7a(0xd3)===_0x11ce7a(0xd3))this[_0x11ce7a(0x103)]=_0x1e88e9;else{function _0x104c80(){var _0x45c9e4=_0x11ce7a;if(this[_0x45c9e4(0x103)]==null)return;_0x3d89cd[_0x45c9e4(0xf3)](),this['send'](_0x2a596e[_0x45c9e4(0xe7)](_0x45c9e4(0xf0),this['room'][_0x45c9e4(0x10e)]));}}},_0x4000d8[_0x1434ed(0x104)]=function(){var _0x4d2c59=_0x1434ed;if(!this['isConnected']())return;if(this[_0x4d2c59(0x103)]==null){if('YfAbz'!=='xTpvj')return;else{function _0x3f20c1(){return;}}}this['leaveRoom'](),this[_0x4d2c59(0xe5)]=![],this['room']=null;},_0x4000d8['closeRoom']=function(){var _0x27cc47=_0x1434ed;if(!this['isMasterClient']()){if('bFBew'==='JEjjS'){function _0x567770(){var _0x303509=a0_0x2b68;!this[_0x303509(0xec)]()?_0x342716['p'](_0x303509(0xde)):(!_0x562e10&&_0x2f2aff['p'](_0x303509(0xcf)+_0x53b375[_0x303509(0xe1)]()),_0x361062[_0x303509(0xf9)](this[_0x303509(0xf4)]['id'])[_0x303509(0xd4)]());}}else return;}if(this['room']==null)return;this[_0x27cc47(0xd4)](NMS[_0x27cc47(0xe7)]('closeRoom'));},_0x4000d8[_0x1434ed(0xf0)]=function(){var _0x203102=_0x1434ed;if(_0x203102(0xd8)!=='WfZOC'){function _0x2153b2(){_0x159164['disconnect']();}}else{if(this[_0x203102(0x103)]==null)return;ANGameManager['onLeaveRoom'](),this[_0x203102(0xd4)](NMS['Lobby'](_0x203102(0xf0),this[_0x203102(0x103)][_0x203102(0x10e)]));}},_0x4000d8[_0x1434ed(0xba)]=function(){var _0xa2f45=_0x1434ed;if(_0xa2f45(0xfc)!==_0xa2f45(0xe4)){if(!this['isConnected']()){if(_0xa2f45(0x10c)===_0xa2f45(0x10c))return;else{function _0x3278a7(){var _0x51e86b=_0xa2f45;if(!this[_0x51e86b(0xb7)]())return;if(this[_0x51e86b(0x103)]==null)return;this[_0x51e86b(0xd4)](_0x2867a1[_0x51e86b(0xe7)](_0x51e86b(0xf2)));}}}this[_0xa2f45(0xd4)](NMS[_0xa2f45(0xe7)](_0xa2f45(0xd2)));}else{function _0x3eb739(){var _0x240dea=_0xa2f45;_0x6d77d1=_0x5c0633['fullName'](),_0x4e3508=function(..._0x444385){var _0x314881=a0_0x2b68;return _0x824823['p']('Callback\x20for:\x20'+_0x3906cb),_0x33f639[_0x314881(0x109)](this,_0x444385);},_0x4a7918['p']('Send,\x20callback:\x20'+_0x220ca6),_0x19ed0a[_0x240dea(0xf9)](this[_0x240dea(0xf4)]['id'])[_0x240dea(0xc1)](_0x82bb74);}}};}(),_0x4000d8['getNetworkGameInfoData']=function(){var _0x57d6cd=_0x27488f;return{'id':ANET['VD'][_0x57d6cd(0xe9)](),'title':$dataSystem[_0x57d6cd(0xbe)],'version':KDCore[_0x57d6cd(0x102)]()?0x0:0x1,'maxPlayers':ANET['PP'][_0x57d6cd(0xfa)]()['length'],'mode':0x0};};}());
})();

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с основными методами системы
ANET.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ANET SYSTEM".p();
      this.loadParameters();
      this.applyParameters();
      ANET.loadPluginCommands();
      HUIManager.init();
    };
    _.loadParameters = function() {
      return ANET.PP = new ANET.ParamsManager();
    };
    _.applyParameters = function() {};
  })();
  // -----------------------------------------------------------------------

  // * Все эти команды нельзя запускать через опции (виртуально), но
  // * их теоретически можно вызывать через общее событие у другого игрока
  //TODO: Например конфигурация классов (dinamyc методов)
  _.ForbiddenVirtualCommandsList = [
    // * Message
    101,
    102,
    103,
    104,
    105,
    // * Flow Control
    111,
    112,
    113,
    115,
    118,
    119,
    108,
    // * Party
    129,
    // * Movement
    201,
    202,
    204,
    206,
    // * Character
    216,
    217,
    // * Timing
    230,
    // * Scene Control
    302,
    303,
    351,
    352,
    // * System Settings
    137,
    // * Meta
    0,
    401,
    402,
    403,
    411,
    413,
    657
  ];
  // * Список комманд которые запускаются через общее событие, а не виртуально
  _.NonVirtualCommandsList = [
    // * Flow Control
    117,
    // * Scene Control
    301
  ];
  // * Дополнительные полня для синхронизации в битве
  _.BattlerObserverFields = [
    "_tpbChargeTime",
    //"_tpbCastTime"
    //"_tpbIdleTime"
    //"_tpbTurnCount"
    //"_tpbTurnEnd"
    //"_speed"
    //"_actionState"
    //"_damagePopup"
    //"_effectType"
    //"_motionType"
    //"_weaponImageId"
    //"_motionRefresh"
    //"_selected"
    "_tpbState"
  ];
  _.ActorObserverFields = ["_name", "_nickname", "_classId", "_level", "_characterName", "_characterIndex", "_faceName", "_faceIndex", "_battlerName", "_exp", "_equips"];
  return _.EnemyObserverFields = [
    "_enemyId",
    //"_letter"
    //"_plural"
    "_screenX",
    "_screenY"
  ];
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный менедреж отвечает за различие в версиях плагина для MZ и MV
ANET.VD = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.VD;
  _.getGameVersion = function() {
    if (KDCore.isMZ()) {
      return $dataSystem.advanced.gameId;
    } else {
      return $dataSystem.versionId;
    }
  };
  return _.getWindowBackgroundType = function() {
    if (KDCore.isMZ()) {
      return 2;
    } else {
      return 0;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x3feb=['_waitPlayers','1ezAUWX','eyNOt','clear','1905287RFzCsr','</label>','BtlYy','sEeIk','TIeGY','_canvasRelativeElements','bottom','173CJyQoT','583jWSiKm','XKPRM','_notify','QVAOx','style','31UzuvpA','_loader','anetWaitPlayersAlert','HFGnm','width','_createNotify','isLoaderActive','</cite>','dqczB','height','getInputValue','<cite>','setInputValue','head','speech-bubble','onGameSceneChanged','showWaitingInfo','uGAyu','eNqAd','<p>','showInput','log','heEfl','body','_waitingInfoThread','mouseenter','_input','appendChild','dWetw','gpier','1071573JKLZZV','warn','removeInput','init','23203CqdcJN','showLoader','center','isUnderMouse','getElementsByTagName','call','getElementById','gpeMK','anetCanvasElements','_createWaitPlayersAlert','isWaitingInfoActive','notifySucess','success','_disableContextMenu','anetLoader','blockquote','value','anetInputName','classList','updateCanvasHtmlElements','form__group','createElement','HUIManager','</p>','QvOvy','_updateCanvas','_createLoadSpinner','DkIdd','_onKeyDown','_createRelativeParent','div','uWEHh','addEventListener','UaWFd','nreih','81zrhmOD','2749lMzKvp','rzTcD','869524kSmFyu','keyCode','bCTRv','<input\x20type=\x22input\x22\x20class=\x22form__field\x22\x20placeholder=\x22','_shouldPreventDefault','_createInputField','focusInput','_centerElement','isInputActive','RyMbH','1405kCkfPU','UrCkQ','insertAdjacentHTML','<link\x20rel=\x22stylesheet\x22\x20href=\x22css/anet.css\x22\x20/>','beforeend','qMgOa','AggMc','add','FsjIh','notifyError','removeChild','_loaderThread','focus','zIndex','field','hideWaitingInfo','tKAxH','607dHvUuv','_isMouseHoverHtmlElement','\x22\x20autocomplete=\x22off\x22\x20name=\x22anetInputName\x22\x20id=\x27anetInputName\x27\x20required\x20/>\x20<label\x20for=\x22anetInputName\x22\x20class=\x22form__label\x22>'];function a0_0x416c(_0x23e656,_0x1977de){_0x23e656=_0x23e656-0x1c0;var _0x3febac=a0_0x3feb[_0x23e656];return _0x3febac;}var a0_0x3a4a49=a0_0x416c;(function(_0x358431,_0x206de5){var _0x42a745=a0_0x416c;while(!![]){try{var _0x47ed11=-parseInt(_0x42a745(0x207))*-parseInt(_0x42a745(0x227))+-parseInt(_0x42a745(0x21c))*-parseInt(_0x42a745(0x1d3))+parseInt(_0x42a745(0x1d7))*-parseInt(_0x42a745(0x22c))+parseInt(_0x42a745(0x1fd))+parseInt(_0x42a745(0x218))*-parseInt(_0x42a745(0x1fa))+-parseInt(_0x42a745(0x1fb))*-parseInt(_0x42a745(0x226))+-parseInt(_0x42a745(0x21f));if(_0x47ed11===_0x206de5)break;else _0x358431['push'](_0x358431['shift']());}catch(_0x4fb3e0){_0x358431['push'](_0x358431['shift']());}}}(a0_0x3feb,0x8937a),window[a0_0x3a4a49(0x1ed)]=function(){},function(){var _0xc11df1=a0_0x3a4a49,_0x5c6053;_0x5c6053=window[_0xc11df1(0x1ed)],_0x5c6053[_0xc11df1(0x1d6)]=function(){var _0x28b6ea=_0xc11df1;this[_0x28b6ea(0x219)]=![],this['_loadCSS'](),this[_0x28b6ea(0x1f4)](),this[_0x28b6ea(0x1f1)](),this[_0x28b6ea(0x231)](),Graphics[_0x28b6ea(0x1e4)]();},_0x5c6053[_0xc11df1(0x1da)]=function(){var _0x143cec=_0xc11df1;return this[_0x143cec(0x219)]===!![];},_0x5c6053[_0xc11df1(0x1c4)]=function(){var _0x2220f2=_0xc11df1;if(_0x2220f2(0x1ef)!==_0x2220f2(0x1ef)){function _0xff1e9(){var _0x99da96=_0x2220f2;return _0x14af2b[_0x99da96(0x1dc)](this),_0x1b43b3[_0x99da96(0x1ea)]();}}else return this[_0x2220f2(0x216)]();},_0x5c6053[_0xc11df1(0x1d8)]=function(_0x4a0068=0xc8){var _0x8d38e1=_0xc11df1,_0x5b9ff1;try{if(this[_0x8d38e1(0x232)]())return;this[_0x8d38e1(0x212)]=setTimeout(function(){var _0x3277df=_0x8d38e1;if('BtlYy'!==_0x3277df(0x221)){function _0x216985(){var _0x1327c0=_0x3277df,_0x49ce05;try{return this[_0x1327c0(0x229)][_0x1327c0(0x1e3)](_0x58738a);}catch(_0x4e9418){return _0x49ce05=_0x4e9418,_0x4c5b6b[_0x1327c0(0x1d4)](_0x49ce05);}}}else{if(!document[_0x3277df(0x1dd)](_0x3277df(0x1e5))){if(_0x3277df(0x217)===_0x3277df(0x217))return document[_0x3277df(0x1cc)]['appendChild'](HUIManager[_0x3277df(0x22d)]);else{function _0x4955d0(){var _0xb69629=_0x3277df,_0x2ef026;if(this[_0xb69629(0x1cf)]==null)return'';return(_0x2ef026=_0x71d0ac['getElementById'](_0xb69629(0x1e8)))!=null?_0x2ef026['value']:void 0x0;}}}}},_0x4a0068);}catch(_0x473542){if('OmQfE'!=='YyOHF')_0x5b9ff1=_0x473542,console[_0x8d38e1(0x1d4)](_0x5b9ff1);else{function _0xbd4456(){var _0x4a76ce=_0x8d38e1,_0x50f62a;if(this[_0x4a76ce(0x1cf)]==null)return;(_0x50f62a=_0x31a049['getElementById'](_0x4a76ce(0x1e8)))!=null&&_0x50f62a[_0x4a76ce(0x213)]();}}}},_0x5c6053['hideLoader']=function(){var _0x53eb46=_0xc11df1,_0x137347;try{if(!this[_0x53eb46(0x232)]())return;clearTimeout(this[_0x53eb46(0x212)]),this[_0x53eb46(0x212)]=null;if(document['getElementById'](_0x53eb46(0x1e5))){if(_0x53eb46(0x1c6)!=='tWlzR')document[_0x53eb46(0x1cc)][_0x53eb46(0x211)](this[_0x53eb46(0x22d)]);else{function _0x297873(){var _0x264742=_0x53eb46,_0x462c5e;this[_0x264742(0x21b)]=_0x1317eb[_0x264742(0x1ec)](_0x264742(0x1e6)),this[_0x264742(0x21b)]['id']=_0x264742(0x22e),this['_waitPlayers']['classList'][_0x264742(0x20e)](_0x264742(0x1c3)),_0x462c5e=_0x264742(0x1c8)+_0x2e1784+_0x264742(0x1ee)+'<cite>'+_0x2c97c4+_0x264742(0x233),this['_waitPlayers'][_0x264742(0x209)](_0x264742(0x20b),_0x462c5e),this[_0x264742(0x224)][_0x264742(0x1d0)](this['_waitPlayers']);}}}}catch(_0x2f5cd1){if(_0x53eb46(0x1f9)!==_0x53eb46(0x1fc))_0x137347=_0x2f5cd1,console[_0x53eb46(0x1ca)](_0x137347);else{function _0x4e732a(){var _0x2d98f0=_0x53eb46;return _0x2c98ff[_0x2d98f0(0x1cc)][_0x2d98f0(0x1d0)](_0x1e1e9b[_0x2d98f0(0x22d)]);}}}},_0x5c6053[_0xc11df1(0x232)]=function(){var _0x209d69=_0xc11df1;return this[_0x209d69(0x212)]!=null;},_0x5c6053[_0xc11df1(0x1c5)]=function(_0x2e6993,_0x4341bf,_0x518ab6=0xc8){var _0x4101b8=_0xc11df1;if(_0x4101b8(0x20c)===_0x4101b8(0x20c)){var _0x3ef4c8;try{if(_0x4101b8(0x22a)!=='QbuQJ'){if(this[_0x4101b8(0x1e1)]())return;this['_waitingInfoThread']=setTimeout(function(){var _0x5b4ee3=_0x4101b8;return HUIManager[_0x5b4ee3(0x1e0)](_0x2e6993,_0x4341bf);},_0x518ab6);}else{function _0x239390(){var _0xcc6820=_0x4101b8;return _0x5b15c1[_0xcc6820(0x1dc)](this);}}}catch(_0x492f73){if(_0x4101b8(0x22f)===_0x4101b8(0x22f))_0x3ef4c8=_0x492f73,console[_0x4101b8(0x1d4)](_0x3ef4c8);else{function _0x4db276(){var _0x3f3a67=_0x4101b8;_0x15d077=_0xdb3a54,_0x4d127c[_0x3f3a67(0x1ca)](_0x197be5);}}}}else{function _0x5431f2(){var _0x5bd53f=_0x4101b8;_0x2179be[_0x5bd53f(0x1e7)]=_0x411b7f;}}},_0x5c6053[_0xc11df1(0x216)]=function(){var _0x445059=_0xc11df1;if(_0x445059(0x1d2)!==_0x445059(0x1c7)){var _0x2573ad;try{if(!this[_0x445059(0x1e1)]()){if(_0x445059(0x20f)!==_0x445059(0x206))return;else{function _0x2ba893(){return;}}}clearTimeout(this[_0x445059(0x1cd)]),this[_0x445059(0x1cd)]=null;if(this[_0x445059(0x21b)]!=null){if(_0x445059(0x234)===_0x445059(0x21d)){function _0x12257d(){var _0x125cbc=_0x445059;return this[_0x125cbc(0x219)]===!![];}}else document[_0x445059(0x1dd)](_0x445059(0x1df))[_0x445059(0x211)](this[_0x445059(0x21b)]),this[_0x445059(0x21b)]=null;}}catch(_0x13d8d1){_0x2573ad=_0x13d8d1,console['warn'](_0x2573ad);}}else{function _0x35a88a(){return _0x7c9a56['_isMouseHoverHtmlElement']=!![];}}},_0x5c6053[_0xc11df1(0x1e1)]=function(){var _0x5b7063=_0xc11df1;return this[_0x5b7063(0x1cd)]!=null;},_0x5c6053[_0xc11df1(0x210)]=function(_0x442d36){var _0x41155d=_0xc11df1,_0x3936da;try{return this[_0x41155d(0x229)]['error'](_0x442d36);}catch(_0x566c04){return _0x3936da=_0x566c04,console[_0x41155d(0x1d4)](_0x3936da);}},_0x5c6053[_0xc11df1(0x1e2)]=function(_0x164031){var _0x4fa8c4=_0xc11df1,_0x2bbea9;try{return this[_0x4fa8c4(0x229)][_0x4fa8c4(0x1e3)](_0x164031);}catch(_0x3fafe8){return _0x2bbea9=_0x3fafe8,console['warn'](_0x2bbea9);}},_0x5c6053[_0xc11df1(0x205)]=function(){var _0x2abddc=_0xc11df1;return this[_0x2abddc(0x1cf)]!=null;},_0x5c6053[_0xc11df1(0x1c9)]=function(_0x2081af){var _0x52e156=_0xc11df1;if(this[_0x52e156(0x1cf)]!=null){if('DkIdd'!==_0x52e156(0x1f2)){function _0x42bada(){var _0x561dbc=_0x52e156;_0x4a58c3['getElementsByTagName']('head')[0x0][_0x561dbc(0x209)](_0x561dbc(0x20b),_0x561dbc(0x20a));}}else this[_0x52e156(0x1d5)]();}this[_0x52e156(0x202)](_0x2081af);},_0x5c6053[_0xc11df1(0x1d5)]=function(){var _0x1fda6d=_0xc11df1;if(this['_input']==null){if(_0x1fda6d(0x223)!==_0x1fda6d(0x1f8))return;else{function _0x546655(){return;}}}HUIManager['_isMouseHoverHtmlElement']=![],document[_0x1fda6d(0x1dd)]('anetCanvasElements')['removeChild'](this[_0x1fda6d(0x1cf)]),this['_input']=null;},_0x5c6053[_0xc11df1(0x203)]=function(){var _0x30a61f=_0xc11df1,_0x4608f3;if(this[_0x30a61f(0x1cf)]==null)return;(_0x4608f3=document['getElementById'](_0x30a61f(0x1e8)))!=null&&_0x4608f3[_0x30a61f(0x213)]();},_0x5c6053[_0xc11df1(0x236)]=function(){var _0x524fc2=_0xc11df1,_0xd5c4e4;if(this[_0x524fc2(0x1cf)]==null)return'';return(_0xd5c4e4=document[_0x524fc2(0x1dd)](_0x524fc2(0x1e8)))!=null?_0xd5c4e4[_0x524fc2(0x1e7)]:void 0x0;},_0x5c6053[_0xc11df1(0x1c1)]=function(_0x5ac267){var _0x1da7e8=_0xc11df1,_0x1f81f2;if(this[_0x1da7e8(0x1cf)]==null)return;(_0x1f81f2=document[_0x1da7e8(0x1dd)](_0x1da7e8(0x1e8)))!=null&&(_0x1f81f2[_0x1da7e8(0x1e7)]=_0x5ac267);},_0x5c6053[_0xc11df1(0x1ea)]=function(){var _0x130e67=_0xc11df1;if(this[_0x130e67(0x224)]==null)return;this[_0x130e67(0x224)][_0x130e67(0x22b)][_0x130e67(0x214)]=0x2,this['_canvasRelativeElements'][_0x130e67(0x230)]=Graphics['width'],this[_0x130e67(0x224)][_0x130e67(0x235)]=Graphics[_0x130e67(0x235)],Graphics[_0x130e67(0x204)](this['_canvasRelativeElements']);},_0x5c6053['_loadCSS']=function(){var _0x2ab1ab=_0xc11df1;if(_0x2ab1ab(0x20d)==='AggMc')document[_0x2ab1ab(0x1db)](_0x2ab1ab(0x1c2))[0x0][_0x2ab1ab(0x209)](_0x2ab1ab(0x20b),'<link\x20rel=\x22stylesheet\x22\x20href=\x22css/anet.css\x22\x20/>');else{function _0x1be630(){return;}}},_0x5c6053[_0xc11df1(0x1f1)]=function(){var _0x189e71=_0xc11df1;this[_0x189e71(0x22d)]=document['createElement']('div'),this[_0x189e71(0x22d)]['id']=_0x189e71(0x1e5),this['_loaderThread']=null;},_0x5c6053[_0xc11df1(0x231)]=function(){var _0x4b6a59=_0xc11df1;this['_notify']=new Notyf({'duration':0x578,'position':{'x':_0x4b6a59(0x1d9),'y':_0x4b6a59(0x225)},'ripple':![]});},_0x5c6053[_0xc11df1(0x1e0)]=function(_0x3c1e01,_0x519dec){var _0xea25d0=_0xc11df1,_0x3eeb90;this[_0xea25d0(0x21b)]=document[_0xea25d0(0x1ec)](_0xea25d0(0x1e6)),this[_0xea25d0(0x21b)]['id']=_0xea25d0(0x22e),this[_0xea25d0(0x21b)][_0xea25d0(0x1e9)][_0xea25d0(0x20e)](_0xea25d0(0x1c3)),_0x3eeb90=_0xea25d0(0x1c8)+_0x3c1e01+_0xea25d0(0x1ee)+_0xea25d0(0x1c0)+_0x519dec+_0xea25d0(0x233),this[_0xea25d0(0x21b)][_0xea25d0(0x209)](_0xea25d0(0x20b),_0x3eeb90),this[_0xea25d0(0x224)][_0xea25d0(0x1d0)](this[_0xea25d0(0x21b)]);},_0x5c6053[_0xc11df1(0x1f4)]=function(){var _0x3fe847=_0xc11df1;if(_0x3fe847(0x1d1)!==_0x3fe847(0x228))this[_0x3fe847(0x224)]=document[_0x3fe847(0x1ec)](_0x3fe847(0x1f5)),this['_canvasRelativeElements']['id']='anetCanvasElements',this['updateCanvasHtmlElements'](),document[_0x3fe847(0x1cc)][_0x3fe847(0x1d0)](this[_0x3fe847(0x224)]);else{function _0x314b3a(){var _0x34c7d2=_0x3fe847;_0x4eb38e[_0x34c7d2(0x213)]();}}},_0x5c6053[_0xc11df1(0x202)]=function(_0x36099b){var _0x55b668=_0xc11df1,_0x10e0a3;this[_0x55b668(0x1cf)]=document[_0x55b668(0x1ec)](_0x55b668(0x1f5)),this[_0x55b668(0x1cf)]['id']='anetInput',this[_0x55b668(0x1cf)]['addEventListener'](_0x55b668(0x1ce),function(){var _0x23115f=_0x55b668;return HUIManager[_0x23115f(0x219)]=!![];}),this[_0x55b668(0x1cf)][_0x55b668(0x1f7)]('mouseleave',function(){var _0x3e4252=_0x55b668;if(_0x3e4252(0x222)!==_0x3e4252(0x1de))return HUIManager[_0x3e4252(0x219)]=![];else{function _0x290ba0(){var _0x2c91df=_0x3e4252;if(this['isWaitingInfoActive']())return;this[_0x2c91df(0x1cd)]=_0x1df145(function(){var _0xc863ec=_0x2c91df;return _0x7932d6[_0xc863ec(0x1e0)](_0x255614,_0x12f414);},_0x379032);}}}),this[_0x55b668(0x1cf)][_0x55b668(0x1e9)][_0x55b668(0x20e)](_0x55b668(0x1eb)),this[_0x55b668(0x1cf)][_0x55b668(0x1e9)]['add'](_0x55b668(0x215)),_0x10e0a3=_0x55b668(0x200)+_0x36099b+_0x55b668(0x21a)+_0x36099b+_0x55b668(0x220),this[_0x55b668(0x1cf)]['insertAdjacentHTML'](_0x55b668(0x20b),_0x10e0a3),this[_0x55b668(0x224)]['appendChild'](this[_0x55b668(0x1cf)]);};}(),function(){var _0x5a9272;_0x5a9272=Scene_Map['prototype'];}(),function(){var _0x21b908=a0_0x3a4a49,_0x108e70,_0x45ad6c,_0x32450d;_0x32450d=Input,_0x45ad6c=_0x32450d[_0x21b908(0x201)],_0x32450d[_0x21b908(0x201)]=function(){var _0x54060d=_0x21b908;if(_0x54060d(0x1ff)!==_0x54060d(0x1ff)){function _0x1bb552(){var _0x40a85c=_0x54060d;if(!this[_0x40a85c(0x232)]())return;_0x1fd425(this['_loaderThread']),this['_loaderThread']=null,_0x5f56a3[_0x40a85c(0x1dd)](_0x40a85c(0x1e5))&&_0x543ed0[_0x40a85c(0x1cc)][_0x40a85c(0x211)](this[_0x40a85c(0x22d)]);}}else{if(HUIManager['isInputActive']())return![];else{if(_0x54060d(0x1cb)!==_0x54060d(0x208))return _0x45ad6c['call'](this);else{function _0x5eaccc(){var _0x1c1af3=_0x54060d;this[_0x1c1af3(0x22d)]=_0x4f7a78[_0x1c1af3(0x1ec)]('div'),this['_loader']['id']=_0x1c1af3(0x1e5),this['_loaderThread']=null;}}}}},_0x108e70=_0x32450d[_0x21b908(0x1f3)],_0x32450d[_0x21b908(0x1f3)]=function(_0x57f315){var _0xf9f007=_0x21b908;if(HUIManager[_0xf9f007(0x205)]()){if(_0x57f315['keyCode']===0x5a||_0x57f315[_0xf9f007(0x1fe)]===0x58||_0x57f315[_0xf9f007(0x1fe)]===0x20){this[_0xf9f007(0x21e)]();return;}}return _0x108e70[_0xf9f007(0x1dc)](this,_0x57f315);};}(),function(){var _0x73a863=a0_0x3a4a49,_0x3b5db0,_0x493ec8;_0x493ec8=Graphics,_0x3b5db0=_0x493ec8[_0x73a863(0x1f0)],_0x493ec8[_0x73a863(0x1f0)]=function(){var _0x3fc4e0=_0x73a863;if(_0x3fc4e0(0x1f6)===_0x3fc4e0(0x1f6))return _0x3b5db0['call'](this),HUIManager[_0x3fc4e0(0x1ea)]();else{function _0x3e94ed(){return;}}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Дополнительные расширения для KDCore

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (ANET.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

// * NOTHING

//Compressed by MV Plugin Builder
(function(){var a0_0x4867=['baaZZ','get','apply','setName','WithTimeout','825ebaiGb','12iboAjx','name','call','1xeKJek','1764197QSlCKY','EmptyMessage','emit','setTo','jZBRn','setFrom','LUtHq','NetMessage','1AkDKVW','send','1TiVJDA','350906WftfdT','41ENKMIN','setData','trace','70282hhEQRX','zFaIj','broadcast','from','iHbpr','7776wuRcck','socket','Socket','312378PBSMYC','_makeData','1562545Ubymkq','12pEhLTV','cXdMy','callback','data'];function a0_0x5883(_0x1dc54d,_0x34abea){_0x1dc54d=_0x1dc54d-0xff;var _0x486716=a0_0x4867[_0x1dc54d];return _0x486716;}var a0_0x2f1e6e=a0_0x5883;(function(_0x2d04d8,_0x5bde3c){var _0xd049fd=a0_0x5883;while(!![]){try{var _0x171f8a=-parseInt(_0xd049fd(0x110))*parseInt(_0xd049fd(0x116))+parseInt(_0xd049fd(0x123))*-parseInt(_0xd049fd(0x115))+-parseInt(_0xd049fd(0x107))+parseInt(_0xd049fd(0x106))*parseInt(_0xd049fd(0x124))+parseInt(_0xd049fd(0x11f))*parseInt(_0xd049fd(0x108))+-parseInt(_0xd049fd(0x113))*-parseInt(_0xd049fd(0x104))+-parseInt(_0xd049fd(0x120))*-parseInt(_0xd049fd(0x10b));if(_0x171f8a===_0x5bde3c)break;else _0x2d04d8['push'](_0x2d04d8['shift']());}catch(_0x22d348){_0x2d04d8['push'](_0x2d04d8['shift']());}}}(a0_0x4867,0xe734d));var NetMessage;NetMessage=function(){var _0x249e5b=a0_0x5883;class _0x1f0729{constructor(_0xbfb133){var _0x1fdf75=a0_0x5883;this[_0x1fdf75(0x111)]=_0xbfb133,this[_0x1fdf75(0x121)]='trace',this[_0x1fdf75(0x10e)]='',this['to']='',this[_0x1fdf75(0x119)]='',this['waited']=![];}[_0x249e5b(0x11d)](_0x3ce417){var _0x4fe44c=_0x249e5b;return this[_0x4fe44c(0x121)]=_0x3ce417,this;}[_0x249e5b(0xff)](_0x5a4949){var _0x5cd768=_0x249e5b;if(_0x5cd768(0x10f)!==_0x5cd768(0x10c))return this['to']=_0x5a4949,this;else{function _0xb30a71(){var _0x48f0f8=_0x5cd768;return this[_0x48f0f8(0x111)][_0x48f0f8(0x126)](this['name'],this[_0x48f0f8(0x114)](_0x3b1ee7)),this;}}}[_0x249e5b(0x101)](_0x22d96c){var _0x2ce093=_0x249e5b;return this[_0x2ce093(0x10e)]=_0x22d96c,this;}[_0x249e5b(0x109)](_0x40f043){var _0x31efb1=_0x249e5b;if(_0x31efb1(0x100)!=='jZBRn'){function _0x44e90a(){var _0x2dabfd=_0x31efb1;_0x55c65e=this[_0x2dabfd(0x119)];}}else return this['data']=_0x40f043,this;}['fullName'](){var _0x3901b0=_0x249e5b;return this[_0x3901b0(0x119)]!=null&&this[_0x3901b0(0x119)]['id']?this[_0x3901b0(0x121)]+'_'+this[_0x3901b0(0x119)]['id']:this['name'];}[_0x249e5b(0x105)](_0x187e08){var _0x2e79c9=_0x249e5b;return this[_0x2e79c9(0x111)]['emit'](this[_0x2e79c9(0x121)],this[_0x2e79c9(0x114)](_0x187e08)),this;}[_0x249e5b(0x118)](_0xff96b7,_0x44db25){var _0x520bc9=_0x249e5b;return this[_0x520bc9(0x111)][_0x520bc9(0x126)](this['name'],this[_0x520bc9(0x114)](_0x44db25),_0xff96b7),this;}[_0x249e5b(0x11b)](_0x50800d,_0x4aaf70,_0x3eb84d,_0x2bc327){var _0x2cb856=_0x249e5b;if(_0x2cb856(0x102)!==_0x2cb856(0x102)){function _0x3a850e(){var _0x130458=_0x2cb856,_0x1e79ee;return _0x1e79ee=this['EmptyMessage'](_0x3f9b29),_0x1e79ee[_0x130458(0x109)]({'id':_0x2231c4,'content':_0x2d58db}),_0x1e79ee;}}else{var _0x362f49;return _0x362f49=_0x1f0729[_0x2cb856(0x11e)],this[_0x2cb856(0x111)][_0x2cb856(0x126)](this['name'],this['_makeData'](_0x2bc327),_0x362f49(_0x50800d,_0x4aaf70,_0x3eb84d)),this;}}[_0x249e5b(0x10d)](_0x1c3ab3){var _0x3cf98d=_0x249e5b;if(_0x3cf98d(0x11a)!=='baaZZ'){function _0x3d26a9(){var _0x205f44=_0x3cf98d,_0xa93798;return _0xa93798=_0x58daf6['WithTimeout'],this['socket'][_0x205f44(0x126)](this[_0x205f44(0x121)],this['_makeData'](_0x50338b),_0xa93798(_0x47d51b,_0x211b5b,_0x2a57fb)),this;}}else return this[_0x3cf98d(0x111)][_0x3cf98d(0x10d)][_0x3cf98d(0x126)](this[_0x3cf98d(0x121)],this['_makeData'](_0x1c3ab3));}[_0x249e5b(0x114)](_0x359643=null){var _0x144cff=_0x249e5b,_0x233878;return _0x233878={},_0x359643==null?_0x359643=this[_0x144cff(0x119)]:this[_0x144cff(0x119)]=_0x359643,_0x233878[_0x144cff(0x119)]=_0x359643,_0x233878[_0x144cff(0x10e)]=this[_0x144cff(0x10e)],_0x233878['to']=this['to'],_0x233878['waited']=this['waited'],_0x233878;}static['SetOwnSocket'](_0x5a7715){return _0x1f0729['Socket']=_0x5a7715;}static['Trace'](_0x3d4d80,_0x23a238){var _0x3461e3=_0x249e5b;return this[_0x3461e3(0x125)](_0x23a238)[_0x3461e3(0x11d)](_0x3461e3(0x10a))[_0x3461e3(0x109)](_0x3d4d80);}static[_0x249e5b(0x125)](_0x239b77=null){var _0x35a717=_0x249e5b,_0x4ff243,_0x3adc2e;return _0x3adc2e=_0x239b77,_0x239b77==null&&(_0x3adc2e=this[_0x35a717(0x112)]),_0x4ff243=new _0x1f0729(_0x3adc2e),_0x3adc2e!=null&&_0x4ff243[_0x35a717(0x101)](_0x3adc2e['id']),_0x4ff243;}static['EmptyMessageWithFlag'](_0xd243a5,_0x3b9138,_0x268b55=null){var _0xe13035=_0x249e5b,_0x1c83b7;return _0x1c83b7=this[_0xe13035(0x125)](_0x268b55),_0x1c83b7[_0xe13035(0x109)]({'id':_0xd243a5,'content':_0x3b9138}),_0x1c83b7;}static[_0x249e5b(0x11e)](_0x493b6e,_0x30b0d4,_0xaeada8){var _0x1d2b0a=_0x249e5b;if(_0x1d2b0a(0x117)===_0x1d2b0a(0x117)){var _0x30683f,_0x404de4;return _0x30683f=![],_0x404de4=setTimeout(function(){if(_0x30683f)return;return _0x30683f=!![],_0x30b0d4();},_0xaeada8),function(..._0xf0bdda){var _0x209523=_0x1d2b0a;if(_0x30683f)return;return _0x30683f=!![],clearTimeout(_0x404de4),_0x493b6e[_0x209523(0x11c)](this,_0xf0bdda);};}else{function _0x31e780(){var _0x451fa2=_0x1d2b0a;return this[_0x451fa2(0x10e)]=_0x2928f8,this;}}}};return _0x1f0729[_0x249e5b(0x112)]=null,_0x1f0729;}[a0_0x2f1e6e(0x122)](this),window['NMS']=NetMessage,window[a0_0x2f1e6e(0x103)]=NetMessage;
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных игрока
var NetPlayerDataWrapper;

NetPlayerDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetPlayerDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetPlayerDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    var plName;
    // * Загружаем с настроек, если нету, то случайное
    if (String.any(ConfigManager.netPlayerName)) {
      plName = ConfigManager.netPlayerName;
    } else {
      if ($gameTemp._tempPlayerNetworkName == null) {
        $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000);
      }
      plName = $gameTemp._tempPlayerNetworkName;
    }
    return {
      id: ANNetwork.myId(),
      name: plName,
      mapId: 0,
      actorId: 0,
      index: 0,
      scene: "",
      characterReady: false,
      isMapMaster: false,
      onEvent: 0,
      onCommonEvent: 0
    };
  };
  _.isCharOnMap = function(p) {
    return p.mapId === $gameMap.mapId() && p.characterReady === true;
  };
  _.isCurrentPlayerActor = function(actor, p) {
    return actor.actorId() === p.actorId;
  };
  _.isOnEvent = function(p, eventId) {
    return p.onEvent === eventId;
  };
  _.getRequestedNetworkState = function(p) {
    if (p.scene === "menu") {
      return 2;
    }
    if (p.scene === "battle") {
      return 5;
    }
    if (p.scene === "chat") {
      return 6;
    }
    if (_.isOnAnyEvent(p)) {
      return 1;
    }
    return -1;
  };
  _.getNetCharacterForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameMap.networkCharacterById(p.id);
  };
  _.getActorForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameActors.actor(p.actorId);
  };
  _.isOnAnyEvent = function(p) {
    if (p == null) {
      return false;
    }
    return (p.onEvent > 0 || p.onCommonEvent > 0) && _.isCharOnMap(p);
  };
})();

// ■ END NetPlayerDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных комнаты
var NetRoomDataWrapper;

NetRoomDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetRoomDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetRoomDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    return {
      name: "Room " + Math.randomInt(100),
      masterId: "",
      masterName: "",
      inGame: false,
      playersIds: [],
      readyPlayersIds: [],
      gameId: 0,
      gameTitle: "",
      rpgVersion: 0,
      maxPlayers: 0,
      gameMode: 0,
      canConnect: true,
      uniqueSaveID: null
    };
  };
  _.isRoomFull = function(r) {
    if (r == null) {
      return true;
    }
    return r.playersIds.length >= r.maxPlayers;
  };
  _.isRoomProperToJoin = function(r) {
    var e, myGameId;
    if (r == null) {
      return false;
    }
    try {
      // * Нельзя подключиться если разные игры
      myGameId = ANET.VD.getGameVersion();
      if (r.gameId !== myGameId) {
        return false;
      }
      // * Пока нельзя подключаться к уже запущенной игре
      if (r.inGame === true) {
        return false;
      }
      // * Нельзя подключаться, если комната полная
      if (_.isRoomFull(r)) {
        return false;
      }
      // * Если разные движки
      if (!_.isMyRPGVersion(r)) {
        return false;
      }
      // * Если комната загрузки сетевого сохранения
      if (_.isLoadGameRoom(r)) {
        // * То клиент должен иметь файл данного сохранения
        if (!DataManager.nIsHaveNetworkSaveWithId(r.uniqueSaveID)) {
          return false;
        }
      }
    } catch (error) {
      // * Если специальный флаг
      //TODO: Пока не обрабатывается
      //if r.canConnect is false
      //    return false
      e = error;
      ANET.w(e);
    }
    return true;
  };
  _.isMyRPGVersion = function(r) {
    if (r == null) {
      return false;
    }
    if (r.rpgVersion === 0) {
      return KDCore.isMZ();
    } else {
      return KDCore.isMV();
    }
  };
  _.isLoadGameRoom = function(r) {
    return r.uniqueSaveID != null;
  };
})();

// ■ END NetRoomDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var NetworkClientHandler;

NetworkClientHandler = class NetworkClientHandler {
  constructor(socket) {
    this.socket = socket;
    this._init();
  }

  disconnect() {
    var ref;
    return (ref = this.socket) != null ? ref.disconnect() : void 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetworkClientHandler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, _C;
  //@[DEFINES]
  _C = null; //? ClientManager
  _ = NetworkClientHandler.prototype;
  _._init = function() {
    _C = NetClientMethodsManager;
    // * Задаём ссылку на собственный сокет в класс сообщений
    // Чтобы можно было отправлять сообщения каждый раз не передавая сокет
    NetMessage.SetOwnSocket(this.socket);
    return this._handleCommands();
  };
  _._handleCommands = function() {
    this._handleBaseSocketEvents();
    this._handleDebugEvents();
    return this._handleANETServerEvents();
  };
  _._handleBaseSocketEvents = function() {
    this.socket.on('disconnect', function() {
      return _C.onDisconnect();
    });
    this.socket.on('connect', function() {
      return _C.onConnect();
    });
    return this.socket.on('connect_error', function() {
      return _C.onConnectionError();
    });
  };
  _._handleDebugEvents = function() {
    return this.socket.on('trace', function(n) {
      return console.log("Trace: " + n);
    });
  };
  _._handleANETServerEvents = function() {
    return this.socket.on('serverPrc', (n) => {
      return this._handleServerPrcEvent(n);
    });
  };
  _._handleServerPrcEvent = function(n) {
    var content, eventHandlerMethodName, flag, id;
    ({id, flag, content} = n);
    eventHandlerMethodName = id + "_" + flag;
    if (_C.isExistPrcEvent(eventHandlerMethodName)) {
      return _C.handlePrcEvent(eventHandlerMethodName, content);
    } else {
      return console.log("Unknown Event from server " + eventHandlerMethodName);
    }
  };
})();

// ■ END NetworkClientHandler.coffee
//---------------------------------------------------------------------------

var Notyf = function () {
    "use strict";
    var n, t, o = function () {
            return (o = Object.assign || function (t) {
                for (var i, e = 1, n = arguments.length; e < n; e++)
                    for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
                return t
            }).apply(this, arguments)
        },
        s = (i.prototype.on = function (t, i) {
            var e = this.listeners[t] || [];
            this.listeners[t] = e.concat([i])
        }, i.prototype.triggerEvent = function (t, i) {
            var e = this;
            (this.listeners[t] || []).forEach(function (t) {
                return t({
                    target: e,
                    event: i
                })
            })
        }, i);

    function i(t) {
        this.options = t, this.listeners = {}
    }(t = n = n || {})[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove";
    var v, e, a = (r.prototype.push = function (t) {
        this.notifications.push(t), this.updateFn(t, n.Add, this.notifications)
    }, r.prototype.splice = function (t, i) {
        var e = this.notifications.splice(t, i)[0];
        return this.updateFn(e, n.Remove, this.notifications), e
    }, r.prototype.indexOf = function (t) {
        return this.notifications.indexOf(t)
    }, r.prototype.onUpdate = function (t) {
        this.updateFn = t
    }, r);

    function r() {
        this.notifications = []
    }(e = v = v || {}).Dismiss = "dismiss";
    var c = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {
                    className: "notyf__icon--success",
                    tagName: "i"
                }
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {
                    className: "notyf__icon--error",
                    tagName: "i"
                }
            }],
            duration: 2e3,
            ripple: !0,
            position: {
                x: "right",
                y: "bottom"
            },
            dismissible: !(e.Click = "click")
        },
        p = (d.prototype.on = function (t, i) {
            var e;
            this.events = o(o({}, this.events), ((e = {})[t] = i, e))
        }, d.prototype.update = function (t, i) {
            i === n.Add ? this.addNotification(t) : i === n.Remove && this.removeNotification(t)
        }, d.prototype.removeNotification = function (t) {
            var i, e, n = this,
                o = this._popRenderedNotification(t);
            o && ((e = o.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) {
                t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e))
            }))
        }, d.prototype.addNotification = function (t) {
            var i = this._renderNotification(t);
            this.notifications.push({
                notification: t,
                node: i
            }), this._announce(t.options.message || "Notification")
        }, d.prototype._renderNotification = function (t) {
            var i, e = this._buildNotificationCard(t),
                n = t.options.className;
            return n && (i = e.classList).add.apply(i, n.split(" ")), this.container.appendChild(e), e
        }, d.prototype._popRenderedNotification = function (t) {
            for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++) this.notifications[e].notification === t && (i = e);
            if (-1 !== i) return this.notifications.splice(i, 1)[0]
        }, d.prototype.getXPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.x) || "right"
        }, d.prototype.getYPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.y) || "bottom"
        }, d.prototype.adjustContainerAlignment = function (t) {
            var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                n = this.container.style;
            n.setProperty("justify-content", e), n.setProperty("align-items", i)
        }, d.prototype._buildNotificationCard = function (n) {
            var t, o = this,
                i = n.options,
                e = i.icon;
            this.adjustContainerAlignment(i);
            var s = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                a = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                r = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                c = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            c.innerHTML = i.message || "";
            var p, d, l, u, f, h = i.background || i.backgroundColor;
            e && "object" == typeof e && (p = this._createHTLMElement({
                tagName: "div",
                className: "notyf__icon"
            }), d = this._createHTLMElement({
                tagName: e.tagName || "i",
                className: e.className,
                text: e.text
            }), (l = null !== (t = e.color) && void 0 !== t ? t : h) && (d.style.color = l), p.appendChild(d), r.appendChild(p)), r.appendChild(c), s.appendChild(r), h && (i.ripple ? (a.style.background = h, s.appendChild(a)) : s.style.background = h), i.dismissible && (u = this._createHTLMElement({
                tagName: "div",
                className: "notyf__dismiss"
            }), f = this._createHTLMElement({
                tagName: "button",
                className: "notyf__dismiss-btn"
            }), u.appendChild(f), r.appendChild(u), s.classList.add("notyf__toast--dismissible"), f.addEventListener("click", function (t) {
                var i, e;
                null !== (e = (i = o.events)[v.Dismiss]) && void 0 !== e && e.call(i, {
                    target: n,
                    event: t
                }), t.stopPropagation()
            })), s.addEventListener("click", function (t) {
                var i, e;
                return null === (e = (i = o.events)[v.Click]) || void 0 === e ? void 0 : e.call(i, {
                    target: n,
                    event: t
                })
            });
            var m = "top" === this.getYPosition(i) ? "upper" : "lower";
            return s.classList.add("notyf__toast--" + m), s
        }, d.prototype._createHTLMElement = function (t) {
            var i = t.tagName,
                e = t.className,
                n = t.text,
                o = document.createElement(i);
            return e && (o.className = e), o.textContent = n || null, o
        }, d.prototype._createA11yContainer = function () {
            var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t
        }, d.prototype._announce = function (t) {
            var i = this;
            this.a11yContainer.textContent = "", setTimeout(function () {
                i.a11yContainer.textContent = t
            }, 100)
        }, d.prototype._getAnimationEndEventName = function () {
            var t, i = document.createElement("_fake"),
                e = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
            for (t in e)
                if (void 0 !== i.style[t]) return e[t];
            return "animationend"
        }, d);

    function d() {
        this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
            left: "flex-start",
            center: "center",
            right: "flex-end"
        }, this.Y_POSITION_FLEX_MAP = {
            top: "flex-start",
            center: "center",
            bottom: "flex-end"
        };
        var t = document.createDocumentFragment(),
            i = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
        t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
    }

    function l(t) {
        var n = this;
        this.dismiss = this._removeNotification, this.notifications = new a, this.view = new p;
        var i = this.registerTypes(t);
        this.options = o(o({}, c), t), this.options.types = i, this.notifications.onUpdate(function (t, i) {
            return n.view.update(t, i)
        }), this.view.on(v.Dismiss, function (t) {
            var i = t.target,
                e = t.event;
            n._removeNotification(i), i.triggerEvent(v.Dismiss, e)
        }), this.view.on(v.Click, function (t) {
            var i = t.target,
                e = t.event;
            return i.triggerEvent(v.Click, e)
        })
    }
    return l.prototype.error = function (t) {
        var i = this.normalizeOptions("error", t);
        return this.open(i)
    }, l.prototype.success = function (t) {
        var i = this.normalizeOptions("success", t);
        return this.open(i)
    }, l.prototype.open = function (i) {
        var t = this.options.types.find(function (t) {
                return t.type === i.type
            }) || {},
            e = o(o({}, t), i);
        this.assignProps(["ripple", "position", "dismissible"], e);
        var n = new s(e);
        return this._pushNotification(n), n
    }, l.prototype.dismissAll = function () {
        for (; this.notifications.splice(0, 1););
    }, l.prototype.assignProps = function (t, i) {
        var e = this;
        t.forEach(function (t) {
            i[t] = null == i[t] ? e.options[t] : i[t]
        })
    }, l.prototype._pushNotification = function (t) {
        var i = this;
        this.notifications.push(t);
        var e = void 0 !== t.options.duration ? t.options.duration : this.options.duration;
        e && setTimeout(function () {
            return i._removeNotification(t)
        }, e)
    }, l.prototype._removeNotification = function (t) {
        var i = this.notifications.indexOf(t); - 1 !== i && this.notifications.splice(i, 1)
    }, l.prototype.normalizeOptions = function (t, i) {
        var e = {
            type: t
        };
        return "string" == typeof i ? e.message = i : "object" == typeof i && (e = o(o({}, e), i)), e
    }, l.prototype.registerTypes = function (t) {
        var i = (t && t.types || []).slice();
        return c.types.map(function (e) {
            var n = -1;
            i.forEach(function (t, i) {
                t.type === e.type && (n = i)
            });
            var t = -1 !== n ? i.splice(n, 1)[0] : {};
            return o(o({}, e), t)
        }).concat(i)
    }, l
}();
//Compressed by MV Plugin Builder
(function(){var a0_0x488b=['WPhMi','length','isBattleMaster','find','sendSaveDataRequest','characterReady','onPlayerName','559068oqynYT','saveDataRequest','ujXXE','isShouldWaitServer','isCharOnMap','oAVdx','isLoadGameRoom','12deTuYw','NLGQz','OIDPq','GChQE','setWait','lhdJT','any','xixWs','cpPUD','NGAME','sBRLk','filter','ANGameManager','onLeaveRoom','VJAjd','showStartGameChatMessage','addMessageToChat','requestNetworkStateIcon','onGamePlayers','index','DnqEv','NKkSX','78414klnrEC','787yQdITs','WroYN','reset','kkaLR','bindingActors','ElHuq','EIhUK','hideLoader','staticActorBinging','_actors','START\x20BINDING\x20ACTORS','Oradj','hIwIW','every','refreshNetworkStates','menu','saveDataComplete','getLightestColor','actorBingingFromSelection','BLACK','wxpIH','chat','callback','getNetCharacterForPlayer','AXtca','epkyS','playersOnMap','setupNewNetworkGame','unknown','getPlayerLeaveGameCommonEventId','dsvQK','playersData','getPlayerDataById','resetWait','myActorId','ZOGrg','push','battleData','1039tfFVMw','xZRFP','dfsbs','sendRawChatMessage','isGameChatAllowed','OiFZs','739149HACXCh','nSafeRefresh','Player\x20data\x20for\x20Actor\x20with\x20ID\x20','isNextScene','ugGoz','buildChatMessage','myPlayerData','sendBindActorFromGame','\x20not\x20found!','myId','isActorSelectionAllowed','getChatStartMessage','chatMessage','svCzQ','name','_waitMode','VSNcK','actorsForNetwork','bnSkC','isAllPlayerOnSameMap','jrrnG','WxRlo','startGame','myIndex','Player\x20leave\x20game','KJlRs','refresh','sZrHb','sendPlayerName','eNpSM','updateWaiting','isAllPlayersActorsReady','DevLog','_shouldWaitPlayerOnSameMap','onRoomPlayers','setupNetworkGame','send','sendActorReady','showLoader','sendInitialMapData','vgDvE','Player\x20data\x20for\x20','sendSceneChanging','anotherPlayers','createMyPlayerData','Utils','52FyKzno','964vSfzON','mapId','onRefreshGameParty','getPlayerDataByActorId','anotherPlayersOnMap','isInited','isMapMaster','actorId','init','Game','networkGameStarted','UVJVg','sendMyChatMessage','isPlayerDataExists','MmEZl','FXhbs','iKeoH','NetGame','424npuKyL','63262bcuzcK','nUniqueSaveID','sendMapLoaded','VNyxh','685926rdmwJf','battle','wVXqk'];var a0_0x4eb91f=a0_0x5f27;function a0_0x5f27(_0x1ad9c9,_0x1c65ef){_0x1ad9c9=_0x1ad9c9-0x1de;var _0x488b81=a0_0x488b[_0x1ad9c9];return _0x488b81;}(function(_0x707361,_0x1c019e){var _0x19b188=a0_0x5f27;while(!![]){try{var _0x39f2c4=parseInt(_0x19b188(0x227))*-parseInt(_0x19b188(0x24d))+parseInt(_0x19b188(0x226))*-parseInt(_0x19b188(0x210))+-parseInt(_0x19b188(0x209))+-parseInt(_0x19b188(0x1fa))*parseInt(_0x19b188(0x1e8))+-parseInt(_0x19b188(0x253))+parseInt(_0x19b188(0x1ff))+-parseInt(_0x19b188(0x1fb))*-parseInt(_0x19b188(0x1e7));if(_0x39f2c4===_0x1c019e)break;else _0x707361['push'](_0x707361['shift']());}catch(_0x45df70){_0x707361['push'](_0x707361['shift']());}}}(a0_0x488b,0x7c7f0),window['ANGameManager']=function(){},function(){var _0xcbc69d=a0_0x5f27,_0x35840b,_0x4c0351;_0x35840b=new KDCore[(_0xcbc69d(0x273))](_0xcbc69d(0x1f9)),_0x35840b['setColors'](KDCore['Color']['AQUA'],KDCore['Color'][_0xcbc69d(0x23a)][_0xcbc69d(0x238)](0x23)),_0x35840b['on'](),_0x4c0351=window[_0xcbc69d(0x21c)],_0x4c0351[_0xcbc69d(0x20c)]=function(){var _0x3f22e2=_0xcbc69d;if(_0x3f22e2(0x1f8)===_0x3f22e2(0x228)){function _0x4deea6(){var _0x2392d8=_0x3f22e2,_0x440a48;return _0x440a48=this[_0x2392d8(0x246)][_0x2392d8(0x205)](function(_0x2f29a0){return _0x2f29a0['id']===_0x198bca;}),_0x440a48!=null;}}else return this[_0x3f22e2(0x262)]!=null;},_0x4c0351[_0xcbc69d(0x1f0)]=function(){var _0x24fb54=_0xcbc69d;return this[_0x24fb54(0x229)](),this[_0x24fb54(0x1e5)](),ANPlayersManager[_0x24fb54(0x26f)]();},_0x4c0351[_0xcbc69d(0x229)]=function(){var _0x4f0ca4=_0xcbc69d;if('iZDRy'===_0x4f0ca4(0x260)){function _0x33c928(){return _0x1d0cc6;}}else this[_0x4f0ca4(0x1f2)]=![],this[_0x4f0ca4(0x262)]=null,this['playersData']=null,ANBattleManager[_0x4f0ca4(0x24c)]=null;},_0x4c0351['createMyPlayerData']=function(){var _0x3d31c6=_0xcbc69d;this['playersData']=[],this[_0x3d31c6(0x246)][_0x3d31c6(0x24b)](NetPlayerDataWrapper['createLocal']());},_0x4c0351[_0xcbc69d(0x1ed)]=function(){var _0x184ac4=_0xcbc69d;if('AmzDv'!==_0x184ac4(0x26c))return this['playersData']!=null;else{function _0x3aa7d3(){var _0x45297a=_0x184ac4;return this[_0x45297a(0x259)]()[_0x45297a(0x223)];}}},_0x4c0351[_0xcbc69d(0x259)]=function(){var _0x3c3933=_0xcbc69d;return this[_0x3c3933(0x247)](ANNetwork[_0x3c3933(0x25c)]());},_0x4c0351[_0xcbc69d(0x249)]=function(){var _0x21e939=_0xcbc69d;return this[_0x21e939(0x259)]()['actorId'];},_0x4c0351[_0xcbc69d(0x26a)]=function(){var _0x5c7c8f=_0xcbc69d;return this['myPlayerData']()[_0x5c7c8f(0x223)];},_0x4c0351[_0xcbc69d(0x1ee)]=function(){var _0x207164=_0xcbc69d;return this[_0x207164(0x259)]()['isMapMaster']===!![];},_0x4c0351['isBattleMaster']=function(){var _0x24683c=_0xcbc69d;return ANBattleManager[_0x24683c(0x204)]();},_0x4c0351[_0xcbc69d(0x1f5)]=function(_0x178821){var _0xb1eeb8=_0xcbc69d;if(_0xb1eeb8(0x1e1)!==_0xb1eeb8(0x1e1)){function _0x41a733(){var _0x22860a=_0xb1eeb8;this[_0x22860a(0x214)](_0x22860a(0x241));}}else{var _0x1e97ef;return _0x1e97ef=this[_0xb1eeb8(0x246)][_0xb1eeb8(0x205)](function(_0x1c5341){return _0x1c5341['id']===_0x178821;}),_0x1e97ef!=null;}},_0x4c0351[_0xcbc69d(0x247)]=function(_0x5e50ac){var _0x1b1bd7=_0xcbc69d,_0x5583c2;_0x5583c2=this[_0x1b1bd7(0x246)][_0x1b1bd7(0x205)](function(_0x49eedc){var _0x37ee76=_0x1b1bd7;if(_0x37ee76(0x23b)==='vErVt'){function _0xfd01f2(){return _0x39b964['id']===_0x24b27a;}}else return _0x49eedc['id']===_0x5e50ac;});if(_0x5583c2!=null)return _0x5583c2;else{if(_0x1b1bd7(0x213)===_0x1b1bd7(0x213))ANET['w'](_0x1b1bd7(0x1e2)+_0x5e50ac+_0x1b1bd7(0x25b));else{function _0x4f046b(){var _0x5764d0=_0x1b1bd7,_0xb4eabc;_0xb4eabc=this[_0x5764d0(0x259)](),this['playersData']=_0x154d96,!this[_0x5764d0(0x247)](_0x5834fd[_0x5764d0(0x25c)]())&&this[_0x5764d0(0x246)]['push'](_0xb4eabc);}}}return null;},_0x4c0351[_0xcbc69d(0x1eb)]=function(_0x480b9c){var _0x324dd2=_0xcbc69d;if('eNpSM'!==_0x324dd2(0x270)){function _0x4b8539(){var _0x3b550d=_0x324dd2;return _0x1b25f9['mapId']===_0xec776b[_0x3b550d(0x1e9)]();}}else{var _0x2dc407;_0x2dc407=this[_0x324dd2(0x246)][_0x324dd2(0x205)](function(_0x88fd1f){var _0x7766d7=_0x324dd2;return _0x88fd1f[_0x7766d7(0x1ef)]===_0x480b9c;});if(_0x2dc407!=null)return _0x2dc407;else{if(_0x324dd2(0x1f3)!==_0x324dd2(0x233))ANET['w'](_0x324dd2(0x255)+_0x480b9c+_0x324dd2(0x25b));else{function _0x24b50a(){return this['networkGameStarted']=!![],_0x19afca['setupNetworkGame']();}}}return null;}},_0x4c0351[_0xcbc69d(0x242)]=function(){var _0x3198e2=_0xcbc69d;return this['networkGameStarted']=!![],$gameParty[_0x3198e2(0x276)]();},_0x4c0351['onNewGameMapSetup']=function(){$gameTemp['_nLocalActorMode']=![],this['_shouldWaitPlayerOnSameMap']=ANNetwork['isSameMapMode']();},_0x4c0351['onMapLoaded']=function(){var _0x52c454=_0xcbc69d;ANMapManager[_0x52c454(0x1fd)](),ANMapManager[_0x52c454(0x1e0)]();if(ANET[_0x52c454(0x1e6)][_0x52c454(0x20f)]()){if(_0x52c454(0x212)===_0x52c454(0x202)){function _0x1910e6(){var _0x4f1fa4=_0x52c454;return _0x634d55[_0x4f1fa4(0x20d)](_0x2c5efc);}}else this[_0x52c454(0x274)]===!![]?this[_0x52c454(0x214)]('playersOnMap'):this['bindingActors']();}else{if(this[_0x52c454(0x274)]===!![]||this[_0x52c454(0x1f2)]===!![]){if(_0x52c454(0x24e)===_0x52c454(0x245)){function _0xdc12d(){var _0x1c2b99=_0x52c454;_0x5eeca8[_0x1c2b99(0x230)][_0x1c2b99(0x24b)](_0x205ce0['actorId']);}}else this[_0x52c454(0x214)](_0x52c454(0x241));}}},_0x4c0351['setWait']=function(_0x844021){var _0x242e88=_0xcbc69d;return this[_0x242e88(0x262)]=_0x844021,HUIManager[_0x242e88(0x1df)](0x1f4);},_0x4c0351['resetWait']=function(){var _0x1d2959=_0xcbc69d;if(_0x1d2959(0x21a)===_0x1d2959(0x268)){function _0x3beb1f(){return this['createMyPlayerData']();}}else return this[_0x1d2959(0x214)](null),HUIManager[_0x1d2959(0x22e)]();},_0x4c0351[_0xcbc69d(0x266)]=function(){var _0xf35c5=_0xcbc69d;if('ujXXE'===_0xf35c5(0x20b))return this['playersData'][_0xf35c5(0x234)](function(_0x34f051){var _0x11ca40=_0xf35c5;return _0x34f051[_0x11ca40(0x1e9)]===$gameMap[_0x11ca40(0x1e9)]();});else{function _0x510777(){var _0x224bb7=_0xf35c5;return this[_0x224bb7(0x246)]!=null;}}},_0x4c0351['anotherPlayers']=function(){var _0x4e89e8=_0xcbc69d;if(_0x4e89e8(0x217)!=='xixWs'){function _0x2d7b3f(){var _0x3f0ac2=_0x4e89e8;return this[_0x3f0ac2(0x214)](null),_0x1d41fc[_0x3f0ac2(0x22e)]();}}else{var _0x5d6b6f;return _0x5d6b6f=this[_0x4e89e8(0x26a)](),this[_0x4e89e8(0x246)][_0x4e89e8(0x21b)](function(_0x141bcd){var _0x51d75d=_0x4e89e8;return _0x141bcd[_0x51d75d(0x223)]!==_0x5d6b6f;});}},_0x4c0351['anotherPlayersOnMap']=function(){var _0x1edc10=_0xcbc69d;if(_0x1edc10(0x263)===_0x1edc10(0x22a)){function _0xed9a2f(){var _0x3eae17=_0x1edc10;this[_0x3eae17(0x1f2)]=![],this[_0x3eae17(0x262)]=null,this[_0x3eae17(0x246)]=null,_0x4a4b86['battleData']=null;}}else return this[_0x1edc10(0x1e4)]()[_0x1edc10(0x21b)](function(_0x4c033f){var _0x2cb451=_0x1edc10;if(_0x2cb451(0x211)!==_0x2cb451(0x211)){function _0x14d59a(){var _0x5da17a=_0x2cb451;_0x166ed2[_0x5da17a(0x1de)]();}}else return NetPlayerDataWrapper[_0x2cb451(0x20d)](_0x4c033f);});},_0x4c0351['isAllPlayersActorsReady']=function(){var _0x44e0be=_0xcbc69d;if('BhiLF'===_0x44e0be(0x224)){function _0x1e1622(){var _0x586070=_0x44e0be;return this[_0x586070(0x259)]()[_0x586070(0x1ee)]===!![];}}else return this[_0x44e0be(0x246)][_0x44e0be(0x234)](function(_0x4530ec){var _0x2b38c7=_0x44e0be;return _0x4530ec[_0x2b38c7(0x207)]===!![];});},_0x4c0351[_0xcbc69d(0x235)]=function(){var _0x9b335=_0xcbc69d;if('lhdJT'===_0x9b335(0x215)){var _0xf49695,_0x263f05,_0x2200fa,_0x1b7fd8,_0x2e817b,_0x2e3c31;_0x2e817b=this[_0x9b335(0x1ec)]();for(_0x263f05=0x0,_0x2200fa=_0x2e817b['length'];_0x263f05<_0x2200fa;_0x263f05++){if(_0x9b335(0x23f)===_0x9b335(0x267)){function _0x299afe(){return;}}else _0x1b7fd8=_0x2e817b[_0x263f05],_0x2e3c31=NetPlayerDataWrapper['getRequestedNetworkState'](_0x1b7fd8),_0xf49695=NetPlayerDataWrapper[_0x9b335(0x23e)](_0x1b7fd8),_0xf49695!=null&&_0xf49695[_0x9b335(0x221)](_0x2e3c31);}}else{function _0x5421de(){var _0x47f5a7=_0x9b335;return this[_0x47f5a7(0x229)](),this[_0x47f5a7(0x1e5)](),_0x5d668d['sendPlayerName']();}}},_0x4c0351[_0xcbc69d(0x22b)]=function(){var _0x5a69=_0xcbc69d;_0x5a69(0x231)['p'](),this['networkGameStarted']=![];if(ANET['PP'][_0x5a69(0x25d)]()||ANET[_0x5a69(0x1e6)][_0x5a69(0x20f)]())this[_0x5a69(0x239)]();else{if('epkyS'===_0x5a69(0x240))this[_0x5a69(0x22f)]();else{function _0x5742ef(){return _0x21fb8a;}}}},_0x4c0351[_0xcbc69d(0x239)]=function(){ANPlayersManager['sendActorReady']();},_0x4c0351[_0xcbc69d(0x22f)]=function(){var _0x284a66=_0xcbc69d;if(_0x284a66(0x1f6)!==_0x284a66(0x1f6)){function _0xf6d8e6(){var _0x13fe63=_0x284a66;(this[_0x13fe63(0x274)]===!![]||this[_0x13fe63(0x1f2)]===!![])&&this[_0x13fe63(0x214)](_0x13fe63(0x241));}}else{var _0x52ab8f;_0x52ab8f=ANET['PP'][_0x284a66(0x264)]()[this[_0x284a66(0x26a)]()-0x1],ANPlayersManager[_0x284a66(0x25a)](_0x52ab8f);}},_0x4c0351[_0xcbc69d(0x271)]=function(){var _0x252cf3=_0xcbc69d;if(!this['isShouldWaitServer']()){if(_0x252cf3(0x22d)!==_0x252cf3(0x22d)){function _0x42bf0b(){var _0x23fd5e=_0x252cf3,_0x9c77fb;return _0x9c77fb=this['myIndex'](),this['playersData'][_0x23fd5e(0x21b)](function(_0x21e0ed){return _0x21e0ed['index']!==_0x9c77fb;});}}else return;}switch(this[_0x252cf3(0x262)]){case _0x252cf3(0x241):if(this['isAllPlayerOnSameMap']()){this['resetWait'](),this['_shouldWaitPlayerOnSameMap']=![];if(this['networkGameStarted']===!![]){if(_0x252cf3(0x257)!=='ahexa')this['bindingActors']();else{function _0x3b0de4(){var _0x19bd81=_0x252cf3;return this['anotherPlayers']()[_0x19bd81(0x21b)](function(_0x798117){return _0x4a1810['isCharOnMap'](_0x798117);});}}}}break;case'playersActors':if(this[_0x252cf3(0x272)]()){if(_0x252cf3(0x218)===_0x252cf3(0x24f)){function _0x1989d3(){_0x2e93ec='chat';}}else this[_0x252cf3(0x248)](),this['startGame']();}break;}},_0x4c0351['startGame']=function(){var _0x5e63a1=_0xcbc69d;'READY\x20TO\x20START\x20GAME'['p'](),ANMapManager[_0x5e63a1(0x1e0)](),!ANET[_0x5e63a1(0x1e6)][_0x5e63a1(0x20f)]()&&this[_0x5e63a1(0x21f)]();},_0x4c0351[_0xcbc69d(0x21f)]=function(){var _0x224be5=_0xcbc69d,_0x3ad34d;if(!ANET['PP'][_0x224be5(0x251)]())return;_0x3ad34d=ANET['PP'][_0x224be5(0x25e)]();if(!String[_0x224be5(0x216)](_0x3ad34d))return;ANET['UI'][_0x224be5(0x220)](ANET[_0x224be5(0x1e6)][_0x224be5(0x258)](0x0,0x0,_0x3ad34d));},_0x4c0351['anotherPlayerLeaveGame']=function(_0x29928a){var _0x13d082=_0xcbc69d,_0x2d38b3;_0x35840b['p'](_0x13d082(0x26b)),_0x2d38b3=ANET['PP'][_0x13d082(0x244)](),_0x2d38b3>0x0&&$gameTemp['reserveCommonEvent'](_0x2d38b3);},_0x4c0351[_0xcbc69d(0x1e3)]=function(){var _0x2e5059=_0xcbc69d;if(_0x2e5059(0x225)===_0x2e5059(0x21e)){function _0x50ed85(){var _0xe2a931=_0x2e5059;this[_0xe2a931(0x21f)]();}}else{var _0x3ebaac;_0x3ebaac=_0x2e5059(0x243);if(!SceneManager[_0x2e5059(0x256)](Scene_Map)){if('hnpWf'!==_0x2e5059(0x232))_0x3ebaac=_0x2e5059(0x236);else{function _0x233aef(){return _0x46f68d['actorId']===_0x4fefeb;}}}if(SceneManager[_0x2e5059(0x256)](Scene_Battle)){if(_0x2e5059(0x22c)!==_0x2e5059(0x22c)){function _0x4eba27(){return _0x12c9f5['UI']['addMessageToChat'](_0xf3157e);}}else _0x3ebaac=_0x2e5059(0x200);}SceneManager[_0x2e5059(0x256)](Scene_NetChatInput)&&(_0x3ebaac=_0x2e5059(0x23c)),ANNetwork[_0x2e5059(0x277)](NMS['Game']('sceneChange',_0x3ebaac));}},_0x4c0351[_0xcbc69d(0x206)]=function(_0x1d9e04){var _0x15587d=_0xcbc69d,_0x3c1625;_0x3c1625={'uniqueSaveID':$gameTemp[_0x15587d(0x1fc)],'savefileId':_0x1d9e04},ANNetwork[_0x15587d(0x277)](NMS['Game'](_0x15587d(0x20a),_0x3c1625));},_0x4c0351['sendSaveDataCompleteFlag']=function(){var _0x2f7168=_0xcbc69d;ANNetwork['send'](NMS[_0x2f7168(0x1f1)](_0x2f7168(0x237),this[_0x2f7168(0x249)]()));},_0x4c0351[_0xcbc69d(0x1f4)]=function(_0x2382d7,_0x3302a9){var _0x5924df=_0xcbc69d;this[_0x5924df(0x250)](_0x2382d7,this[_0x5924df(0x249)](),_0x3302a9);},_0x4c0351[_0xcbc69d(0x250)]=function(_0x4ce2d6,_0x2d40e9,_0x49a1eb){var _0x2c6c13=_0xcbc69d,_0xb2b88f;_0xb2b88f=ANET[_0x2c6c13(0x1e6)][_0x2c6c13(0x258)](_0x4ce2d6,_0x2d40e9,_0x49a1eb),ANNetwork[_0x2c6c13(0x23d)](NMS[_0x2c6c13(0x1f1)](_0x2c6c13(0x25f),_0xb2b88f),function(){return ANET['UI']['addMessageToChat'](_0xb2b88f);});},_0x4c0351[_0xcbc69d(0x208)]=function(_0x51f57f,_0x4e1a76){var _0x4f10ce=_0xcbc69d;if(_0x4f10ce(0x1f7)===_0x4f10ce(0x26e)){function _0x43c708(){var _0x481fdb=_0x4f10ce;this[_0x481fdb(0x214)](_0x481fdb(0x241));}}else{var _0x184b53;if(this['isPlayerDataExists']()){if(_0x4f10ce(0x24a)===_0x4f10ce(0x24a))_0x184b53=this[_0x4f10ce(0x247)](_0x51f57f),_0x184b53!=null&&(_0x184b53[_0x4f10ce(0x261)]=_0x4e1a76);else{function _0x5d5dac(){var _0x57a313=_0x4f10ce;_0x2f5015[_0x57a313(0x261)]=_0x315072;}}}else{}}},_0x4c0351[_0xcbc69d(0x275)]=function(_0x2e799d){var _0x1ec974=_0xcbc69d;if('DBABa'!==_0x1ec974(0x1fe)){var _0xfba88a;_0xfba88a=this[_0x1ec974(0x259)](),this['playersData']=_0x2e799d,!this[_0x1ec974(0x247)](ANNetwork[_0x1ec974(0x25c)]())&&this[_0x1ec974(0x246)][_0x1ec974(0x24b)](_0xfba88a);}else{function _0x53485a(){var _0x12d357=_0x1ec974;_0xdaae1d=_0x12d357(0x200);}}},_0x4c0351[_0xcbc69d(0x222)]=function(_0xfcd977){var _0x34c15a=_0xcbc69d;this[_0x34c15a(0x275)](_0xfcd977),this[_0x34c15a(0x235)](),$gameMap[_0x34c15a(0x254)]();},_0x4c0351[_0xcbc69d(0x1ea)]=function(){var _0x5cdb62=_0xcbc69d;if(_0x5cdb62(0x20e)!==_0x5cdb62(0x265)){var _0x86ea05,_0x14ba7e,_0x460223,_0x570de3;$gameParty[_0x5cdb62(0x230)]=[],_0x570de3=this[_0x5cdb62(0x246)];for(_0x86ea05=0x0,_0x14ba7e=_0x570de3[_0x5cdb62(0x203)];_0x86ea05<_0x14ba7e;_0x86ea05++){_0x460223=_0x570de3[_0x86ea05],_0x460223[_0x5cdb62(0x1ef)]>0x0&&_0x460223[_0x5cdb62(0x207)]===!![]&&$gameParty['_actors'][_0x5cdb62(0x24b)](_0x460223['actorId']);}$gamePlayer[_0x5cdb62(0x26d)](),$gameMap[_0x5cdb62(0x254)]();}else{function _0x3fb1f7(){var _0x2acc88=_0x5cdb62;this[_0x2acc88(0x248)](),this[_0x2acc88(0x269)]();}}},_0x4c0351[_0xcbc69d(0x21d)]=function(){var _0x398be8=_0xcbc69d;if(_0x398be8(0x252)===_0x398be8(0x201)){function _0xe4a752(){var _0x4509b5=_0x398be8,_0x2b009;if(this[_0x4509b5(0x1f5)]())_0x2b009=this['getPlayerDataById'](_0x348116),_0x2b009!=null&&(_0x2b009[_0x4509b5(0x261)]=_0x1cac7d);else{}}}else return this[_0x398be8(0x1e5)]();};}(),window[a0_0x4eb91f(0x219)]=ANGameManager);
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]
var DataObserver;

DataObserver = class DataObserver {
  constructor(_checkTime = 0, _instante = false) {
    this._checkTime = _checkTime;
    this._instante = _instante;
    this._fields = {};
    this._isDataChanged = false;
    this._isShouldSkipCheck = false;
    this._timer = 0;
    return;
  }

  // * отправка без проверки изменений (по таймеру, если задан)
  setInstanteMode() {
    return this._instante = true;
  }

  // * проверка изменений (по таймеру, если задан)
  setCheckMode() {
    return this._instante = false;
  }

  // * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
  setCheckInterval(_checkTime) {
    this._checkTime = _checkTime;
  }

  // * Пропустить проверку данных, например когда данные пришли от сервера
  skip() {
    return this._isShouldSkipCheck = true;
  }

  addFields(obj, fieldsList) {
    var f, i, len;
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      this.readField(obj, f);
    }
  }

  removeFields(fieldsList) {
    var f, i, len, results;
    results = [];
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      results.push(delete this._fields[f]);
    }
    return results;
  }

  // * Прочитать все значения с объекта
  refreshAll(obj) {
    var f;
    for (f in this._fields) {
      this.readField(obj, f);
    }
    return this._isDataChanged = false;
  }

  readField(obj, field) {
    return this._fields[field] = obj[field];
  }

  check(obj) {
    var f;
    // * Если данные изменены, но зачем снова проверять?
    // * Всё равно не отслеживается какое именно поле было изменнено
    if (this.isDataChanged()) {
      return;
    }
    this._timer--;
    // * Если таймер, то ждём, не проверяем
    if (this._timer > 0) {
      return;
    }
    this._timer = this._checkTime;
    // * Если надо пропустить проверку, то пропускаем
    if (this._isShouldSkipCheck === true) {
      this._isShouldSkipCheck = false;
      return;
    }
    // * Если постоянное обновление, то сразу флаг и пропускаем проверку
    if (this._instante === true) {
      this._isDataChanged = true;
      return;
    }
    for (f in this._fields) {
      if (obj[f] !== this._fields[f]) {
        this._isDataChanged = true;
        break;
      }
    }
  }

  isDataChanged() {
    return this._isDataChanged === true;
  }

  // * Получить данные всех полей для отправки на сервер
  getDataForNetwork(obj) {
    this.refreshAll(obj);
    return this._fields;
  }

  // * Установить данные всех полей, когда пришли с сервера
  setDataFromNetwork(obj, observerData) {
    var f;
    for (f in this._fields) {
      obj[f] = observerData[f];
    }
    this.refreshAll(obj);
  }

};

//Compressed by MV Plugin Builder
(function(){var a0_0x5604=['onAnswer','action','event_battle_animation','callback','event_event_registerOnShared','SfIKc','onContinueSharedEvent','Disconnected','CUSTOM\x20LINK\x20IN','xgWwB','event_battleMethodReceived','SHARED\x20EVENT\x20FORCE\x20CANCELLED','1367cwxyGq','notifyError','PoSXq','serverVerCheck','event_event_registerDone','method','reAlpha','savefileId','DevLog','cmd','75650KXaXmj','onConnectCallback','event_game_chatMessage','isExistPrcEvent','onEventMove','alert','SHARED\x20EVENT\x20CHOICE\x20ACTION','Client\x20not\x20match\x20server\x20version','event_game_saveDataRequest','onPlayerLocation','event_','setColors','HVRMu','sendSaveDataCompleteFlag','callSceneCallback','mudlC','IYBGE','event_map_playerMove','SwJKX','1CugFjb','CGdIo','JFDct','cxccu','EzFtt','CUSTOM\x20COMMAND\x20IN','BpivH','GyhDS','event_event_virtualEventCommand','SHARED\x20EVENT\x20IN','ServerRev','event_game_observerData','Please\x20update\x20Alpha\x20NET\x20Z\x20plugin','BmwdI','NjXfj','Color','map_eventMove','551336uwNKMx','room','kJTGC','event_map_initialMapSynchronization','channelId','onVirtualCommand','onLostConnection','event_lobby_startGame','onRegisterOnSharedEventResponse','SBoBA','event_lobby_roomClosed','event_map_playerLocation','nCdrj','DFpVu','AxWgz','nUniqueSaveID','404hIFkob','onCustomCommand','onRoomClosed','kSRsi','nRegisterCustomCommandCE','playersData','127317MATGVF','Handle\x20Event:\x20','onRoomDataFromServer','event_lobby_refreshRoomData','LFOBQ','Event\x20End:\x20','event_battle_input','event_event_sharedForceCancel','battle_battleMethodReceived','225143UkTNWT','onBattleAnimation','getLightestColor','tvLtV','warn','onSharedEventChoiceActionFromServer','uojvJ','onBeforeSave','NetClientMethodsManager','onConnect','NLeDG','nSaveData','SHARED\x20EVENT\x20CAN\x20CONTINUE','onConnectionError','onServerEvent','stop','inputActorId','Rwwrx','text','onDisconnect','muQOX','onRefreshGameParty','mapId','Lobby','battle_battleMethod','VPbBX','sClRT','Can\x27t\x20connect\x20to\x20server!','ivren','event_game_userCommand','type','REFRESH\x20PARTY','miPUn','onInitialMapSync','222265zWFVYi','SHARED\x20EVENT\x20ANSWER','map_playerMove','event_game_customCommandLink','VTbwj','event_battle_battleMethodReceived','NET\x20Client','onLogWindowMessage','STARTING\x20GAME','addMessageToChat','oukfH','aSdAk','xjvWU','EujzG','GuOAq','tETEm','MAGENTA','onPlayerMove','onBattleDataFromServer','event_game_variable','ebUuJ','undefined','qtjie','gUwNU','nsuku','onBattleInputAction','KnJIi','onObserverData','onSharedEventForceCancelFromServer','game_observerData','GAME\x20PLAYERS\x20DATA\x20REFRESHED','faRLa','CDHgD','event_battle_serverBattleData','onPlayerName','AhmMN','Connected','event_game_switch','vPRBx','uFhOY','event_battle_battleMethod','who','event_battle_logMessage','226399Lsnlel','event_event_sharedCanContinue','event_map_eventMove','nzWcB','event_battle_inputAction','onRoomPlayers','Disconnected\x20from\x20server','handlePrcEvent','data','_scene','onBattleInputState','AJEWb','saveGame','iLQAc','onBattleMethod','inputState','onVariableValue','event_game_saveDataComplete'];function a0_0x4af4(_0x241790,_0x31b431){_0x241790=_0x241790-0x14b;var _0x5604f4=a0_0x5604[_0x241790];return _0x5604f4;}var a0_0x409950=a0_0x4af4;(function(_0x2aadd8,_0x408d85){var _0x3bf904=a0_0x4af4;while(!![]){try{var _0x3dc038=parseInt(_0x3bf904(0x200))+parseInt(_0x3bf904(0x194))+parseInt(_0x3bf904(0x183))*parseInt(_0x3bf904(0x1b3))+parseInt(_0x3bf904(0x1aa))+-parseInt(_0x3bf904(0x170))+-parseInt(_0x3bf904(0x1d5))+-parseInt(_0x3bf904(0x166))*parseInt(_0x3bf904(0x1a4));if(_0x3dc038===_0x408d85)break;else _0x2aadd8['push'](_0x2aadd8['shift']());}catch(_0x4517ed){_0x2aadd8['push'](_0x2aadd8['shift']());}}}(a0_0x5604,0x445cc),window[a0_0x409950(0x1bb)]=function(){},function(){var _0x100eb1=a0_0x409950,_0xd5f97,_0x473477;_0xd5f97=new KDCore[(_0x100eb1(0x16e))](_0x100eb1(0x1db)),_0xd5f97[_0x100eb1(0x17b)](KDCore['Color'][_0x100eb1(0x1e5)][_0x100eb1(0x16c)](0xc8),KDCore[_0x100eb1(0x192)]['BLACK'][_0x100eb1(0x1b5)](0xc8)),_0xd5f97['on'](),_0x473477=window[_0x100eb1(0x1bb)],_0x473477['setConnectionToMasterCallback']=function(_0x3704d5){var _0x48face=_0x100eb1;this[_0x48face(0x171)]=_0x3704d5;},_0x473477[_0x100eb1(0x1bc)]=function(){var _0x1e30ac=_0x100eb1;_0xd5f97['p'](_0x1e30ac(0x1f9)),ANNetwork[_0x1e30ac(0x15d)](NMS[_0x1e30ac(0x1ca)](_0x1e30ac(0x169),ANET[_0x1e30ac(0x18d)]),function(_0x1b895e){var _0x49416e=_0x1e30ac;if('TtMhY'===_0x49416e(0x1bd)){function _0x43fcd9(){var _0x3940e4=_0x49416e;return _0x545c3e[_0x3940e4(0x1c8)](),_0x3940e4(0x1d2)['p']();}}else{if(!_0x1b895e)return _0xd5f97['p']('Client\x20not\x20match\x20server\x20version'),window['alert'](_0x49416e(0x18f)),ANNetwork[_0x49416e(0x1c2)]();}});if(this[_0x1e30ac(0x171)]!=null)return this[_0x1e30ac(0x171)](0x1);},_0x473477[_0x100eb1(0x1c6)]=function(){var _0x597744=_0x100eb1,_0x4b8e47;return _0xd5f97['p']('Disconnected'),(_0x4b8e47=SceneManager[_0x597744(0x151)])!=null&&_0x4b8e47[_0x597744(0x19a)](),HUIManager[_0x597744(0x167)](_0x597744(0x14e)),ANNetwork['stop']();},_0x473477[_0x100eb1(0x1c0)]=function(){return _0xd5f97['p']('Can\x27t\x20connect\x20to\x20server!'),this['onConnectCallback']!=null&&this['onConnectCallback'](0x0),ANNetwork['stop']();},_0x473477[_0x100eb1(0x173)]=function(_0x5a88bf){var _0x9c6675=_0x100eb1;return NetClientMethodsManager[_0x9c6675(0x17a)+_0x5a88bf]!=null;},_0x473477[_0x100eb1(0x14f)]=function(_0x22752c,_0x3339b3){var _0xf4938e=_0x100eb1,_0x3dbbc6;_0x3dbbc6=[_0xf4938e(0x1f2),_0xf4938e(0x193),_0xf4938e(0x1d7),_0xf4938e(0x1cb),_0xf4938e(0x1b2)]['contains'](_0x22752c);if(!_0x3dbbc6){if(_0xf4938e(0x1e2)===_0xf4938e(0x1e2))_0xd5f97['p'](_0xf4938e(0x1ab)+_0x22752c);else{function _0x380f29(){var _0x5b4d3c=_0xf4938e;return _0x5232dd=_0xb479d9,_0x58644a[_0x5b4d3c(0x1b7)](_0x5b4d3c(0x18e),_0x2a7797);}}}NetClientMethodsManager['event_'+_0x22752c](_0x3339b3),this['callSceneCallback'](_0x22752c);if(!_0x3dbbc6){if(_0xf4938e(0x1b9)==='EpIfm'){function _0x2d0efc(){var _0x379922=_0xf4938e;return _0x1402b0[_0x379922(0x1ee)](_0x3b5fc8[_0x379922(0x1c3)],_0x5cd659[_0x379922(0x15b)]);}}else _0xd5f97['p'](_0xf4938e(0x1af)+_0x22752c);}},_0x473477[_0x100eb1(0x17e)]=function(_0x57ee44){var _0x22598f=_0x100eb1,_0x1824b8;return(_0x1824b8=SceneManager['_scene'])!=null?_0x1824b8[_0x22598f(0x1c1)](_0x57ee44):void 0x0;},_0x473477['event_lobby_changePlayerName']=function(_0x204ebd){var _0x2f7bff=_0x100eb1;if(_0x2f7bff(0x1ef)!=='lIzfq')return ANGameManager[_0x2f7bff(0x1f7)](_0x204ebd[_0x2f7bff(0x1fe)],_0x204ebd['name']);else{function _0x3cb192(){var _0xc7f0fc=_0x2f7bff,_0xcdd70c,_0x5c871a,_0xb669a0;try{return _0xc7f0fc(0x162)['p'](),{name:_0xb669a0,commonEventId:_0xcdd70c}=_0x1cac9b,typeof _0xe17c9f!==_0xc7f0fc(0x1ea)&&_0x185597!==null?_0xc2079e[_0xc7f0fc(0x1a8)](_0xb669a0,_0xcdd70c):void 0x0;}catch(_0x45a489){return _0x5c871a=_0x45a489,_0x37578d[_0xc7f0fc(0x1b7)]('event_game_userCommand',_0x5c871a);}}}},_0x473477[_0x100eb1(0x1ad)]=function(_0x1330fd){var _0x5ed0b1=_0x100eb1;if(_0x5ed0b1(0x1e9)!==_0x5ed0b1(0x163)){if(SceneManager['isBusyForNetworkData']())return;return ANGameManager[_0x5ed0b1(0x14d)](_0x1330fd[_0x5ed0b1(0x1a9)]),ANNetwork[_0x5ed0b1(0x1ac)](_0x1330fd[_0x5ed0b1(0x195)]);}else{function _0x23980b(){var _0x59ebc5=_0x5ed0b1,_0x4b6b2c;return _0x518fc6['p'](_0x59ebc5(0x161)),(_0x4b6b2c=_0x16a995['_scene'])!=null&&_0x4b6b2c[_0x59ebc5(0x19a)](),_0x3eb6dc['notifyError'](_0x59ebc5(0x14e)),_0x534364['stop']();}}},_0x473477[_0x100eb1(0x19e)]=function(_0x1c6c30){var _0x52424b=_0x100eb1;if(_0x52424b(0x17f)!=='mudlC'){function _0x3804a4(){var _0x54ead4=_0x52424b;return _0x2d11d6=_0x1ffd5c,_0x58662c['warn'](_0x54ead4(0x181),_0x238b18);}}else return ANNetwork[_0x52424b(0x1a6)]();},_0x473477[_0x100eb1(0x19b)]=function(){var _0x1bf862=_0x100eb1;if(_0x1bf862(0x1d3)===_0x1bf862(0x1e1)){function _0x12ca58(){var _0x1c76bc=_0x1bf862;return _0x5e9f51=_0x283a34,_0x46a0b5[_0x1c76bc(0x1b7)](_0x1c76bc(0x15c),_0x574e69);}}else return ANGameManager['setupNewNetworkGame'](),_0x1bf862(0x1dd)['p']();},_0x473477['event_game_playersData']=function(_0x5445c4){var _0x305f97=_0x100eb1;return ANGameManager['onGamePlayers'](_0x5445c4),_0x305f97(0x1f3)['p']();},_0x473477['event_game_refreshParty']=function(){var _0xc47b06=_0x100eb1;if(_0xc47b06(0x189)===_0xc47b06(0x1f8)){function _0x440ca2(){var _0x2295fc=_0xc47b06,_0x9af755;try{return _0x3c0ec3[_0x2295fc(0x1a3)]=_0x12446b['uniqueSaveID'],_0x326cb1[_0x2295fc(0x1ba)](),_0x45767b[_0x2295fc(0x154)](_0x43da48[_0x2295fc(0x16d)]),_0x432468['sendSaveDataCompleteFlag']();}catch(_0x47a546){return _0x9af755=_0x47a546,_0x4538ab['warn']('event_game_saveDataRequest',_0x9af755);}}}else return ANGameManager[_0xc47b06(0x1c8)](),'REFRESH\x20PARTY'['p']();},_0x473477[_0x100eb1(0x18e)]=function(_0x4ebd0a){var _0x41d36c=_0x100eb1,_0x3bdf32;try{if(_0x41d36c(0x155)!==_0x41d36c(0x155)){function _0x62a597(){return;}}else return ANSyncDataManager[_0x41d36c(0x1f0)](_0x4ebd0a['id'],_0x4ebd0a[_0x41d36c(0x1d1)],_0x4ebd0a[_0x41d36c(0x150)]);}catch(_0x21a7ee){return _0x3bdf32=_0x21a7ee,console[_0x41d36c(0x1b7)](_0x41d36c(0x18e),_0x3bdf32);}},_0x473477[_0x100eb1(0x1e8)]=function(_0x2123b2){var _0x297133=_0x100eb1,_0x22ca91;try{return ANSyncDataManager[_0x297133(0x158)](_0x2123b2['id'],_0x2123b2['data']);}catch(_0x16833d){return _0x22ca91=_0x16833d,console[_0x297133(0x1b7)](_0x297133(0x1e8),_0x22ca91);}},_0x473477['event_game_switch']=function(_0x3bfa8a){var _0x5ec76c=_0x100eb1,_0x1ccdea;try{return ANSyncDataManager['onSwitchValue'](_0x3bfa8a['id'],_0x3bfa8a['data']);}catch(_0x2f34ac){if('nCdrj'===_0x5ec76c(0x1a0))return _0x1ccdea=_0x2f34ac,console[_0x5ec76c(0x1b7)](_0x5ec76c(0x1fa),_0x1ccdea);else{function _0x5dd0ba(){var _0x456f98=_0x5ec76c,_0x5ae053,_0x50d68a,_0x21828b;try{return _0x456f98(0x188)['p'](),{name:_0x21828b,data:_0x5ae053}=_0x5eb3da,_0x517b4e['onCustomCommand'](_0x21828b,_0x5ae053);}catch(_0xc02320){return _0x50d68a=_0xc02320,_0xcecdb3[_0x456f98(0x1b7)](_0x456f98(0x1d0),_0x50d68a);}}}}},_0x473477[_0x100eb1(0x178)]=function(_0x359a51){var _0x190d55=_0x100eb1,_0x3fe9bc;try{if(_0x190d55(0x1fb)!==_0x190d55(0x1f4))return $gameTemp[_0x190d55(0x1a3)]=_0x359a51['uniqueSaveID'],$gameSystem[_0x190d55(0x1ba)](),DataManager[_0x190d55(0x154)](_0x359a51[_0x190d55(0x16d)]),ANGameManager[_0x190d55(0x17d)]();else{function _0x58714c(){return _0x13ce84=_0x236b6e,_0x4db01e['warn']('event_map_playerLocation',_0x16ac94);}}}catch(_0x25740b){if(_0x190d55(0x1a7)!==_0x190d55(0x1a7)){function _0x4c874f(){var _0x16995f=_0x190d55;if(_0x2947b4!=null&&_0x33fbbf===_0x88194e[_0x16995f(0x1c9)]())return _0x46ed08['UI'][_0x16995f(0x1de)](_0x1b282c);}}else return _0x3fe9bc=_0x25740b,console[_0x190d55(0x1b7)]('event_game_saveDataRequest',_0x3fe9bc);}},_0x473477[_0x100eb1(0x159)]=function(_0x1b4a36){var _0x1b4fdc=_0x100eb1,_0x599918,_0x49f7bb;try{if(_0x1b4fdc(0x1cd)===_0x1b4fdc(0x1cd)){if($gameTemp[_0x1b4fdc(0x1be)]==null){if(_0x1b4fdc(0x1f5)!==_0x1b4fdc(0x1f5)){function _0x272c30(){var _0x1fd387=_0x1b4fdc;_0x1714dc['p'](_0x1fd387(0x1f9)),_0x7985d9['callback'](_0x322865['Lobby'](_0x1fd387(0x169),_0x20595a['ServerRev']),function(_0x3b1a49){var _0x513995=_0x1fd387;if(!_0x3b1a49)return _0x8d8b90['p'](_0x513995(0x177)),_0x3486b8[_0x513995(0x175)](_0x513995(0x18f)),_0x4800d4[_0x513995(0x1c2)]();});if(this[_0x1fd387(0x171)]!=null)return this['onConnectCallback'](0x1);}}else return;}return _0x49f7bb=_0x1b4a36,$gameTemp['nSaveData'][_0x1b4fdc(0x15a)](_0x49f7bb,!![]);}else{function _0x3c639b(){var _0x4cd3bd=_0x1b4fdc;return _0x53b638=_0x5d19db,_0x49ed12[_0x4cd3bd(0x1b7)](_0x4cd3bd(0x1fd),_0x4c825e);}}}catch(_0x4b9b8f){return _0x599918=_0x4b9b8f,console[_0x1b4fdc(0x1b7)](_0x1b4fdc(0x159),_0x599918);}},_0x473477[_0x100eb1(0x172)]=function(_0x58e3a5){var _0x3bbc88=_0x100eb1;if(_0x3bbc88(0x1ae)===_0x3bbc88(0x182)){function _0x17d56c(){var _0x26cd53=_0x3bbc88;_0x64e38a=_0x3ea3e9['mapId'],_0x348a99=_0x46a2e4[_0x26cd53(0x198)];if(_0x50fa6b>0x0){if(_0x1af0bc!=null&&_0x12d78d===_0x203c7d['mapId']())return _0x24d4a2['UI'][_0x26cd53(0x1de)](_0x5e28c5);}else return _0x2654e4['UI'][_0x26cd53(0x1de)](_0x420728);}}else{var _0x16edd6,_0x3250eb,_0x139550;try{_0x139550=_0x58e3a5['mapId'],_0x16edd6=_0x58e3a5['channelId'];if(_0x16edd6>0x0){if(_0x3bbc88(0x1e3)!==_0x3bbc88(0x18a)){if(_0x139550!=null&&_0x139550===$gameMap[_0x3bbc88(0x1c9)]()){if(_0x3bbc88(0x191)===_0x3bbc88(0x191))return ANET['UI'][_0x3bbc88(0x1de)](_0x58e3a5);else{function _0x1fbf9b(){var _0x5379cd=_0x3bbc88,_0x3ab6dd;try{return _0x3549c5['onPlayerMove'](_0x1326b2['id'],_0x39abee[_0x5379cd(0x150)]);}catch(_0x4f25b1){return _0x3ab6dd=_0x4f25b1,_0xf3de0d[_0x5379cd(0x1b7)](_0x5379cd(0x181),_0x3ab6dd);}}}}}else{function _0x5f0964(){var _0x55ae6b=_0x3bbc88,_0x53488c;return(_0x53488c=_0x4e7302['_scene'])!=null?_0x53488c[_0x55ae6b(0x1c1)](_0xcb3e8f):void 0x0;}}}else{if(_0x3bbc88(0x1e4)!==_0x3bbc88(0x17c))return ANET['UI'][_0x3bbc88(0x1de)](_0x58e3a5);else{function _0x238474(){var _0x421aeb=_0x3bbc88,_0x32d3c7;try{return'SHARED\x20EVENT\x20CHOICE\x20ACTION'['p'](),_0x35b73a[_0x421aeb(0x1b8)](_0x36564a);}catch(_0x2352ea){return _0x32d3c7=_0x2352ea,_0x370897[_0x421aeb(0x1b7)](_0x421aeb(0x1b1),_0x32d3c7);}}}}}catch(_0x1d4a0e){return _0x3250eb=_0x1d4a0e,console[_0x3bbc88(0x1b7)]('event_game_chatMessage',_0x3250eb);}}},_0x473477[_0x100eb1(0x181)]=function(_0x396ae0){var _0x5c6cb2=_0x100eb1,_0x43b5bf;try{return ANPlayersManager[_0x5c6cb2(0x1e6)](_0x396ae0['id'],_0x396ae0[_0x5c6cb2(0x150)]);}catch(_0x4ffbe8){return _0x43b5bf=_0x4ffbe8,console[_0x5c6cb2(0x1b7)](_0x5c6cb2(0x181),_0x43b5bf);}},_0x473477[_0x100eb1(0x19f)]=function(_0x50aef3){var _0x289acc=_0x100eb1;if(_0x289acc(0x1c4)===_0x289acc(0x1c4)){var _0x4b8792;try{return ANPlayersManager[_0x289acc(0x179)](_0x50aef3['id'],_0x50aef3[_0x289acc(0x150)]);}catch(_0x5b9216){return _0x4b8792=_0x5b9216,console[_0x289acc(0x1b7)]('event_map_playerLocation',_0x4b8792);}}else{function _0x2f2e46(){var _0x6b1779=_0x289acc;if(_0x437580[_0x6b1779(0x1be)]==null)return;return _0x390fe2=_0x3342e5,_0x3fbee5[_0x6b1779(0x1be)][_0x6b1779(0x15a)](_0x4e1bf2,!![]);}}},_0x473477['event_map_eventMove']=function(_0x1c6d74){var _0x5dcc61=_0x100eb1,_0x5854a0;try{return ANMapManager[_0x5dcc61(0x174)](_0x1c6d74[_0x5dcc61(0x1c9)],_0x1c6d74['id'],_0x1c6d74[_0x5dcc61(0x150)]);}catch(_0x4d055b){return _0x5854a0=_0x4d055b,console[_0x5dcc61(0x1b7)](_0x5dcc61(0x202),_0x5854a0);}},_0x473477[_0x100eb1(0x197)]=function(_0x4af549){var _0x13c9f6=_0x100eb1,_0x6dc2da;try{if(_0x13c9f6(0x1e0)!==_0x13c9f6(0x1eb)){if($gameMap[_0x13c9f6(0x1c9)]()===_0x4af549)return ANMapManager[_0x13c9f6(0x1d4)]();}else{function _0x3d92b4(){var _0x14f2a1=_0x13c9f6;return _0x2ee043=_0x594276,_0x2f532b[_0x14f2a1(0x1b7)](_0x14f2a1(0x1fa),_0x56b856);}}}catch(_0x3b62c5){if(_0x13c9f6(0x1df)==='oukfH')return _0x6dc2da=_0x3b62c5,console[_0x13c9f6(0x1b7)](_0x13c9f6(0x202),_0x6dc2da);else{function _0x5d1495(){var _0x53424a=_0x13c9f6,_0x33419e;try{return _0x902ae3[_0x53424a(0x179)](_0xc1130c['id'],_0x22546a[_0x53424a(0x150)]);}catch(_0x6327cc){return _0x33419e=_0x6327cc,_0x35c9f4[_0x53424a(0x1b7)](_0x53424a(0x19f),_0x33419e);}}}}},_0x473477[_0x100eb1(0x18b)]=function(_0x144348){var _0x36a2f9=_0x100eb1,_0x3b7821;try{if(_0x36a2f9(0x19d)==='GQWZs'){function _0x24dd6c(){var _0x10d808=_0x36a2f9;this[_0x10d808(0x171)]=_0x438528;}}else return ANInterpreterManager[_0x36a2f9(0x199)](_0x144348);}catch(_0x253dc6){if('RWbqp'==='YsoZX'){function _0xe48c8d(){var _0x4296ec=_0x36a2f9;return _0x48a95e['onObserverData'](_0x3d4bfb['id'],_0x431528['type'],_0x1cc7d9[_0x4296ec(0x150)]);}}else return _0x3b7821=_0x253dc6,console[_0x36a2f9(0x1b7)]('event_event_virtualEventCommand',_0x3b7821);}},_0x473477['event_battle_battleMethod']=function(_0x4e6f50){var _0x56f73b=_0x100eb1,_0x36c756;try{return ANBattleManager[_0x56f73b(0x156)](_0x4e6f50['id'],_0x4e6f50[_0x56f73b(0x16b)],_0x4e6f50[_0x56f73b(0x150)]);}catch(_0x59165e){if(_0x56f73b(0x1cc)!==_0x56f73b(0x1ec))return _0x36c756=_0x59165e,console[_0x56f73b(0x1b7)](_0x56f73b(0x1fd),_0x36c756);else{function _0x214880(){var _0x8794ba=_0x56f73b;return _0xbcbaa1=_0x556c92,_0x3fff57[_0x8794ba(0x1b7)](_0x8794ba(0x18b),_0x5a420d);}}}},_0x473477['event_battle_animation']=function(_0x36791b){var _0x15f5d7=_0x100eb1;if(_0x15f5d7(0x14b)===_0x15f5d7(0x1fc)){function _0x544940(){var _0x18f728=_0x15f5d7;return _0x187f72=_0x387809,_0x3395fe[_0x18f728(0x1b7)](_0x18f728(0x164),_0x361175);}}else{var _0x3e67c8;try{return ANBattleManager[_0x15f5d7(0x1b4)](_0x36791b);}catch(_0xa7de74){return _0x3e67c8=_0xa7de74,console[_0x15f5d7(0x1b7)](_0x15f5d7(0x15c),_0x3e67c8);}}},_0x473477[_0x100eb1(0x1da)]=function(_0x2b9ce3){var _0x2a158b=_0x100eb1,_0x209d21;try{return ANBattleManager['onBattleMethodReceived']();}catch(_0x578661){return _0x209d21=_0x578661,console[_0x2a158b(0x1b7)](_0x2a158b(0x164),_0x209d21);}},_0x473477[_0x100eb1(0x1ff)]=function(_0x60dce7){var _0x36935d=_0x100eb1,_0x160bce;try{return ANBattleManager[_0x36935d(0x1dc)](_0x60dce7[_0x36935d(0x16f)],_0x60dce7[_0x36935d(0x1c5)]);}catch(_0xf998){return _0x160bce=_0xf998,console[_0x36935d(0x1b7)](_0x36935d(0x1ff),_0x160bce);}},_0x473477[_0x100eb1(0x1b0)]=function(_0x5e166){var _0x87418d=_0x100eb1,_0x11e266;try{return ANBattleManager[_0x87418d(0x152)](_0x5e166[_0x87418d(0x157)],_0x5e166[_0x87418d(0x1c3)]);}catch(_0x2a800){return _0x11e266=_0x2a800,console[_0x87418d(0x1b7)](_0x87418d(0x1b0),_0x11e266);}},_0x473477[_0x100eb1(0x14c)]=function(_0x403e65){var _0x4ae6c0=_0x100eb1;if(_0x4ae6c0(0x184)===_0x4ae6c0(0x184)){var _0x38bfc6;try{if(_0x4ae6c0(0x15f)!=='nWyrz')return ANBattleManager[_0x4ae6c0(0x1ee)](_0x403e65[_0x4ae6c0(0x1c3)],_0x403e65[_0x4ae6c0(0x15b)]);else{function _0x3d1804(){var _0x192010=_0x4ae6c0;return _0x142394=_0x2e9f51,_0x2b5422[_0x192010(0x1b7)]('event_map_eventMove',_0x1510c0);}}}catch(_0x4e0ce4){if(_0x4ae6c0(0x1a2)!==_0x4ae6c0(0x1a2)){function _0x287147(){var _0x797955=_0x4ae6c0;return _0x5332ff=_0x1f76f6,_0x255b8e['warn'](_0x797955(0x16a),_0x313226);}}else return _0x38bfc6=_0x4e0ce4,console[_0x4ae6c0(0x1b7)](_0x4ae6c0(0x14c),_0x38bfc6);}}else{function _0x3ad55e(){var _0x31c8db=_0x4ae6c0;return _0x160708['p'](_0x31c8db(0x1ce)),this['onConnectCallback']!=null&&this[_0x31c8db(0x171)](0x0),_0x31aca1[_0x31c8db(0x1c2)]();}}},_0x473477['event_battle_serverBattleData']=function(_0x1629ee){var _0x48be0c=_0x100eb1,_0x571301;try{if('eaNyv'===_0x48be0c(0x168)){function _0x3c02f4(){var _0x1b7090=_0x48be0c;if(_0x50408c[_0x1b7090(0x1c9)]()===_0x676d9c)return _0x4af103['onInitialMapSync']();}}else return ANBattleManager[_0x48be0c(0x1e7)](_0x1629ee);}catch(_0x32d811){return _0x571301=_0x32d811,console['warn'](_0x48be0c(0x1f6),_0x571301);}},_0x473477[_0x100eb1(0x15e)]=function(_0x59c178){var _0x78b2=_0x100eb1,_0x315878;try{return _0x78b2(0x18c)['p'](),ANInterpreterManager['onRegisterOnSharedEventRequest'](_0x59c178);}catch(_0x206bec){if('AJEWb'===_0x78b2(0x153))return _0x315878=_0x206bec,console[_0x78b2(0x1b7)]('event_event_registerOnShared',_0x315878);else{function _0x281a87(){var _0x5059b5=_0x78b2,_0x3bd858;try{return _0x29fdad[_0x5059b5(0x1b4)](_0x2cf1ea);}catch(_0x70ef21){return _0x3bd858=_0x70ef21,_0x45c8b5[_0x5059b5(0x1b7)]('event_battle_animation',_0x3bd858);}}}}},_0x473477[_0x100eb1(0x16a)]=function(_0xd7b4b1){var _0x585e57=_0x100eb1;if(_0x585e57(0x180)==='kUyLM'){function _0x195180(){return _0x5b7854['onBattleAnimation'](_0x3afd7e);}}else{var _0x21cda4;try{return _0x585e57(0x1d6)['p'](),ANInterpreterManager[_0x585e57(0x19c)](_0xd7b4b1);}catch(_0xc0f82e){return _0x21cda4=_0xc0f82e,console[_0x585e57(0x1b7)](_0x585e57(0x16a),_0x21cda4);}}},_0x473477[_0x100eb1(0x201)]=function(_0x598edd){var _0x5cae49=_0x100eb1,_0x237c7d;try{if(_0x5cae49(0x1ed)!=='nsuku'){function _0x43afb7(){var _0x59e7f6=_0x5cae49,_0x3d8cc8;try{return _0x13792c[_0x59e7f6(0x1dc)](_0x35f8b1[_0x59e7f6(0x16f)],_0x1ea748[_0x59e7f6(0x1c5)]);}catch(_0x20172b){return _0x3d8cc8=_0x20172b,_0x14ff78[_0x59e7f6(0x1b7)]('event_battle_logMessage',_0x3d8cc8);}}}else return _0x5cae49(0x1bf)['p'](),ANInterpreterManager[_0x5cae49(0x160)](_0x598edd);}catch(_0x599c96){if(_0x5cae49(0x196)===_0x5cae49(0x185)){function _0x564634(){var _0x4f21b7=_0x5cae49;return _0x168142['onGamePlayers'](_0x19f965),_0x4f21b7(0x1f3)['p']();}}else return _0x237c7d=_0x599c96,console[_0x5cae49(0x1b7)]('event_event_sharedCanContinue',_0x237c7d);}},_0x473477['event_event_sharedForceCancel']=function(_0x52c7f5){var _0xffd540=_0x100eb1,_0x227f7;try{return _0xffd540(0x165)['p'](),ANInterpreterManager[_0xffd540(0x1f1)](_0x52c7f5);}catch(_0x3d6baa){return _0x227f7=_0x3d6baa,console[_0xffd540(0x1b7)](_0xffd540(0x1b1),_0x227f7);}},_0x473477['event_event_sharedChoice']=function(_0x495fb5){var _0x4756ba=_0x100eb1;if(_0x4756ba(0x1a1)!==_0x4756ba(0x1d9)){var _0x31b5d5;try{if(_0x4756ba(0x1b6)!==_0x4756ba(0x1c7))return _0x4756ba(0x176)['p'](),ANInterpreterManager[_0x4756ba(0x1b8)](_0x495fb5);else{function _0xdca6f9(){var _0x6bde86=_0x4756ba;return _0x5bacce=_0x5ba7fc,_0x145fd5['warn'](_0x6bde86(0x1b1),_0x37563f);}}}catch(_0x3d2dd6){if(_0x4756ba(0x1cf)===_0x4756ba(0x190)){function _0x3b408a(){var _0x44ba5f=_0x4756ba;return _0x1b76ad=_0x44f63f,_0x1b07e2[_0x44ba5f(0x1b7)](_0x44ba5f(0x178),_0xf2927e);}}else return _0x31b5d5=_0x3d2dd6,console['warn'](_0x4756ba(0x1b1),_0x31b5d5);}}else{function _0x113bba(){var _0x9ad60e=_0x4756ba;return _0x4c8814[_0x9ad60e(0x1dc)](_0x5ee765[_0x9ad60e(0x16f)],_0x5a21ea[_0x9ad60e(0x1c5)]);}}},_0x473477[_0x100eb1(0x1d0)]=function(_0x32800e){var _0x3c75dd=_0x100eb1;if(_0x3c75dd(0x187)!==_0x3c75dd(0x187)){function _0x3b96ff(){return _0x147758['onVariableValue'](_0x155e0e['id'],_0x35e210['data']);}}else{var _0x2b3397,_0x373bd7,_0x5d3733;try{return _0x3c75dd(0x188)['p'](),{name:_0x5d3733,data:_0x2b3397}=_0x32800e,nAPI[_0x3c75dd(0x1a5)](_0x5d3733,_0x2b3397);}catch(_0x2b5070){return _0x373bd7=_0x2b5070,console[_0x3c75dd(0x1b7)](_0x3c75dd(0x1d0),_0x373bd7);}}},_0x473477[_0x100eb1(0x1d8)]=function(_0x25154f){var _0x3c7f0b=_0x100eb1;if('rCNbr'!==_0x3c7f0b(0x186)){var _0x2c1bb8,_0x270395,_0x176c25;try{return _0x3c7f0b(0x162)['p'](),{name:_0x176c25,commonEventId:_0x2c1bb8}=_0x25154f,typeof $gameSystem!==_0x3c7f0b(0x1ea)&&$gameSystem!==null?$gameSystem[_0x3c7f0b(0x1a8)](_0x176c25,_0x2c1bb8):void 0x0;}catch(_0x38442c){return _0x270395=_0x38442c,console[_0x3c7f0b(0x1b7)](_0x3c7f0b(0x1d0),_0x270395);}}else{function _0x4cf9e0(){var _0x103db8=_0x3c7f0b;return _0xa7ea85=_0x58ed62,_0x47d6ae['warn'](_0x103db8(0x1ff),_0x472b60);}}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x3da1=['494318GzjIyq','cOZfW','battleMethod','BLACK','myActorId','showLoader','uHhMF','TuXMv','updateInputChange','isOneBattler','REGISTER\x20SUCCESS','447358rCaCWZ','Battle','599knvDGl','MTDai','packForNetwork','battleData','NlrRd','inputtingAction','28219jPLLpr','get','send','aRCUJ','sendRegisterOnBattle','battleId','lAduQ','map','qRkjV','animationId','LQjih','leader','register','ehRZK','updateWaiting','actors','_isDataChanged','Color','targets','629235plzUUx','registerOnLocalBattle','shift','isForceBattleSyncMode','58anGznI','sendBattleAnimation','_currentActor','setup','mirror','Gcvoi','sendBattleInputAction','_waitTimeout','isLocal','rhWmv','setEventCallback','setWait','Try\x20register\x20battle:\x20','1865iBLNyp','1auMaNw','QWyaz','_battleMethodsPool','octcn','nSetCurrentClientInput','sendWindowLogMessage','unpackBattlerFromNetwork','onBattleMethodReceived','_registerToExistsSharedBattle','clear','_lastBattleManagerInputActor','sendBattleEnded','logMessage','_waitMode','setFromNetwork','_waitPool','getLightestColor','1299261EpCpRb','_eventCallback','ivGfB','rSPFA','netDataObserver','nClearClientInput','options','requestAnimation','onBattleDataFromServer','tIJjh','gnKmS','_lastBattleManagerInputValue','selectNextCommand','_callBattleMethodOnServer','TVmeZ','isBattleRegistred','sendBattleMethod','isShouldWaitServer','tfxwI','UmFRR','started','ANBattleManager','xAosE','ended','sendBattlerObserver','inBattle','10OiYFFC','nSetNetworkBattle','sendInputState','1445665OXesrW','onBattleInputState','animation','TIME\x20OUT','Utils','RIGzI','NetBattle','sendBattleStarted','hiEBA','pAKqF','WAIT','CALL\x20BATTLE\x20METHOD','_inputting','onBattleRegisterResult','XzojC','Nvbjo','fdYhS','isBattleLocal','sendBattleMethodReceived','HsmbJ','UrIqI','length','_previousNetBattleActors','battleMethodReceived','FNTNV','onBattleEnd','resetWait','QHPTS','push','actorId','SETUP','claMq','addText','CUdhU','Join\x20Shared\x20battle','isMV','info','onBattleMethod','rrcdK','isLoaderActive','EBBWz','gJWGB','DevLog','isBattleMaster','onLogWindowMessage','inputAction','battleMembers','qXFDJ','actor'];function a0_0x573e(_0xa39833,_0x4410b2){_0xa39833=_0xa39833-0x18d;var _0x3da19c=a0_0x3da1[_0xa39833];return _0x3da19c;}var a0_0x2db2f1=a0_0x573e;(function(_0x56bf18,_0x522a99){var _0x490218=a0_0x573e;while(!![]){try{var _0x30487d=-parseInt(_0x490218(0x1cf))+-parseInt(_0x490218(0x20f))+parseInt(_0x490218(0x1b4))*-parseInt(_0x490218(0x1e1))+-parseInt(_0x490218(0x1b6))*parseInt(_0x490218(0x1e0))+parseInt(_0x490218(0x1f2))+parseInt(_0x490218(0x1bc))*-parseInt(_0x490218(0x1d3))+-parseInt(_0x490218(0x1a9))*-parseInt(_0x490218(0x20c));if(_0x30487d===_0x522a99)break;else _0x56bf18['push'](_0x56bf18['shift']());}catch(_0x34ab0f){_0x56bf18['push'](_0x56bf18['shift']());}}}(a0_0x3da1,0xebeca),window[a0_0x2db2f1(0x207)]=function(){},function(){var _0x1dedba=a0_0x2db2f1,_0x9ebe05,_0x5b29be;_0x9ebe05=new KDCore[(_0x1dedba(0x1a2))](_0x1dedba(0x215)),_0x9ebe05['setColors'](KDCore[_0x1dedba(0x1cd)]['RED'],KDCore[_0x1dedba(0x1cd)][_0x1dedba(0x1ac)][_0x1dedba(0x1f1)](0x87)),_0x9ebe05['on'](),_0x5b29be=window[_0x1dedba(0x207)],_0x5b29be[_0x1dedba(0x1a3)]=function(){var _0x13c07a=_0x1dedba;if(this[_0x13c07a(0x1b9)]!=null){if(_0x13c07a(0x222)===_0x13c07a(0x208)){function _0x45b6e4(){var _0x9c1d5a=_0x13c07a;_0x9c1d5a(0x21a)['p'](),_0xdada4[_0x9c1d5a(0x20a)](_0x1d024c),_0x2971c2[_0x9c1d5a(0x1f6)][_0x9c1d5a(0x1cc)]=!![],this[_0x9c1d5a(0x202)](_0x2c6063,_0x1c3d59[_0x9c1d5a(0x1b8)](),_0x2d46cd),_0x1ca591['PP']['isForceBattleSyncMode']()&&(this[_0x9c1d5a(0x1de)]('battleMethod'),this[_0x9c1d5a(0x1f0)]+=0x1);}}else return this['battleData'][_0x13c07a(0x1cb)][0x0]===ANGameManager[_0x13c07a(0x1ad)]();}else return $gameParty['inBattle']();},_0x5b29be[_0x1dedba(0x201)]=function(){var _0x124404=_0x1dedba;if('ILhcN'!==_0x124404(0x21e))return this[_0x124404(0x1b9)]!=null;else{function _0x5f5cac(){var _0x2291a5=_0x124404;_0x56593e=_0x5bf8a5[_0x2291a5(0x1ce)]['map'](function(_0x5e392f){var _0x2b3d6b=_0x2291a5;return _0x2935fa[_0x2b3d6b(0x213)][_0x2b3d6b(0x1e7)](_0x5e392f);}),_0x3e3cb5[_0x2291a5(0x1f9)](_0x15ad81,_0x3d7531[_0x2291a5(0x1c5)],_0xff73f3[_0x2291a5(0x1d7)]);}}},_0x5b29be[_0x1dedba(0x220)]=function(){var _0x333fb5=_0x1dedba;if(this[_0x333fb5(0x1b9)]!=null)return this['battleData'][_0x333fb5(0x1db)];else{if(_0x333fb5(0x1c6)!==_0x333fb5(0x1c6)){function _0x23995f(){_0xff69f2=null;}}else return!![];}},_0x5b29be[_0x1dedba(0x203)]=function(){var _0x25a12a=_0x1dedba;if('RIGzI'===_0x25a12a(0x214))return this[_0x25a12a(0x1ee)]!=null;else{function _0x1e8df7(){var _0x5758f7=_0x25a12a;this[_0x5758f7(0x1ff)](...this['_battleMethodsPool']['shift']());}}},_0x5b29be[_0x1dedba(0x1a6)]=function(){var _0x5c07d3=_0x1dedba;return this[_0x5c07d3(0x201)]()?this['battleData'][_0x5c07d3(0x1cb)][_0x5c07d3(0x1c3)](function(_0x44dfc1){var _0x5a0015=_0x5c07d3;return $gameActors[_0x5a0015(0x1a8)](_0x44dfc1);}):[$gameParty[_0x5c07d3(0x1c7)]()];},_0x5b29be[_0x1dedba(0x1de)]=function(_0x259798){var _0x538756=_0x1dedba;if('syWak'!=='XwPGt')return this[_0x538756(0x1ee)]=_0x259798,this[_0x538756(0x1f0)]=0x0,this[_0x538756(0x1da)]=0x168,HUIManager[_0x538756(0x1ae)](0x3e8);else{function _0xc23406(){var _0x8872a8=_0x538756,_0x1e6490;_0x1e6490=_0xd9afeb['inputtingAction']();if(_0x6da4d6[_0x8872a8(0x19b)]()){if(_0x1e6490==null)return;}this[_0x8872a8(0x1d9)](_0x1e27bb[_0x8872a8(0x1ad)](),_0x1e6490);}}},_0x5b29be[_0x1dedba(0x192)]=function(){var _0x4a5b2e=_0x1dedba;if('VMxwn'===_0x4a5b2e(0x19e)){function _0x3bd943(){var _0x4eead9=_0x4a5b2e;_0x5610ba['send'](_0x2b162d['Battle'](_0x4eead9(0x1a5),{'action':_0x44adf3,'inputActorId':_0x50608a}));}}else return this[_0x4a5b2e(0x1de)](null),HUIManager['hideLoader']();},_0x5b29be['update']=function(){var _0x458ca2=_0x1dedba;if('TYedV'===_0x458ca2(0x1a1)){function _0x5615e8(){_0x5083d4=_0x24668a,_0x43cdc9['w'](_0x454c58);}}else{if(this['isShouldWaitServer']()){if(this[_0x458ca2(0x1da)]<=0x0)_0x9ebe05['p'](_0x458ca2(0x212)),this[_0x458ca2(0x192)]();else{if(_0x458ca2(0x1bf)==='aRCUJ')this[_0x458ca2(0x1da)]--,this[_0x458ca2(0x1ca)]();else{function _0x27bdf2(){return!![];}}}}else this[_0x458ca2(0x1e3)][_0x458ca2(0x18d)]>0x0&&this[_0x458ca2(0x1ff)](...this['_battleMethodsPool'][_0x458ca2(0x1d1)]()),HUIManager[_0x458ca2(0x19f)]()&&HUIManager['hideLoader']();}},_0x5b29be[_0x1dedba(0x1ca)]=function(){var _0x2cf0e2=_0x1dedba;if(!this['isShouldWaitServer']())return;_0x2cf0e2(0x219)['p'](this[_0x2cf0e2(0x1f0)]);switch(this['_waitMode']){case _0x2cf0e2(0x1ab):this[_0x2cf0e2(0x1f0)]===$gameParty[_0x2cf0e2(0x1a6)]()[_0x2cf0e2(0x18d)]&&this['resetWait']();}},_0x5b29be[_0x1dedba(0x1b1)]=function(){var _0x59b5d3=_0x1dedba;if($gameParty['isOneBattler']()){if(_0x59b5d3(0x204)!==_0x59b5d3(0x190))return;else{function _0x5c560f(){return;}}}if(this[_0x59b5d3(0x1eb)]!==BattleManager['_currentActor']){if(_0x59b5d3(0x1a7)==='EpMNt'){function _0x513c84(){return;}}else this[_0x59b5d3(0x1eb)]=BattleManager[_0x59b5d3(0x1d5)],this[_0x59b5d3(0x20e)]();}else this[_0x59b5d3(0x1fd)]!==BattleManager['_inputting']&&(this[_0x59b5d3(0x1fd)]=BattleManager['_inputting'],this['sendInputState']());},_0x5b29be['registerOnLocalBattle']=function(){var _0x2bc038=_0x1dedba;this[_0x2bc038(0x1b9)]={'isLocal':!![],'battleId':'local','actors':[ANGameManager[_0x2bc038(0x1ad)]()]},_0x9ebe05['p']('STARTED\x20LOCAL\x20BATTLE');},_0x5b29be['onBattleStarted']=function(){var _0xd456ea=_0x1dedba;if(_0xd456ea(0x1ba)!==_0xd456ea(0x1f5))this[_0xd456ea(0x1e3)]=[],this[_0xd456ea(0x1fd)]=![],this[_0xd456ea(0x1eb)]=null,this[_0xd456ea(0x216)]();else{function _0x3af097(){var _0x140218=_0xd456ea;return _0x423c66['p'](_0x140218(0x1df)+_0x1fc63[_0x140218(0x1c1)]),this['sendRegisterOnBattle'](_0x1e0889);}}},_0x5b29be[_0x1dedba(0x191)]=function(){var _0xc88ef=_0x1dedba;!this[_0xc88ef(0x220)]()&&this[_0xc88ef(0x1ec)](),this[_0xc88ef(0x1b9)]=null;},_0x5b29be['callBattleMethod']=function(_0x499771,_0x3c2d0d,_0x14e98b){var _0x65492=_0x1dedba;if($gameParty['isOneBattler']()){if('OdvWQ'!=='WIEcA')return;else{function _0xaaf6f5(){var _0x43c68e=a0_0x573e;_0x30f456[_0x43c68e(0x1be)](_0x3d743f['Battle']('animation',_0x2e733b));}}}ANET['PP'][_0x65492(0x1d2)]()?(this[_0x65492(0x1e3)]==null&&(this[_0x65492(0x1e3)]=[]),this[_0x65492(0x1e3)][_0x65492(0x194)]([_0x499771,_0x3c2d0d,_0x14e98b])):this[_0x65492(0x1ff)](_0x499771,_0x3c2d0d,_0x14e98b);},_0x5b29be['_callBattleMethodOnServer']=function(_0x2ef3bd,_0x54281b,_0x3d007a){var _0x4a5ac5=_0x1dedba;_0x4a5ac5(0x21a)['p'](),ANSyncDataManager[_0x4a5ac5(0x20a)](_0x2ef3bd),_0x2ef3bd['netDataObserver'][_0x4a5ac5(0x1cc)]=!![],this[_0x4a5ac5(0x202)](_0x54281b,_0x2ef3bd[_0x4a5ac5(0x1b8)](),_0x3d007a),ANET['PP'][_0x4a5ac5(0x1d2)]()&&(this[_0x4a5ac5(0x1de)](_0x4a5ac5(0x1ab)),this[_0x4a5ac5(0x1f0)]+=0x1);},_0x5b29be[_0x1dedba(0x1f9)]=function(_0x2f8703,_0x14e759,_0xa350ec=![]){var _0x5f147=_0x1dedba,_0x1a2c52,_0x359a14;if($gameParty[_0x5f147(0x1b2)]())return;_0x1a2c52=_0x2f8703['map'](function(_0x30cfe0){var _0x17c56d=_0x5f147;if(_0x17c56d(0x1f4)!==_0x17c56d(0x1c9))return _0x30cfe0[_0x17c56d(0x1b8)]();else{function _0x16f7dd(){return;}}}),_0x359a14={'animationId':_0x14e759,'mirror':_0xa350ec,'targets':_0x1a2c52},this[_0x5f147(0x1d4)](_0x359a14);},_0x5b29be['battleInputActionDone']=function(){var _0x5a3249=_0x1dedba,_0x50b472;_0x50b472=BattleManager[_0x5a3249(0x1bb)]();if(KDCore[_0x5a3249(0x19b)]()){if(_0x5a3249(0x223)==='umwVr'){function _0x42894a(){return;}}else{if(_0x50b472==null)return;}}this['sendBattleInputAction'](ANGameManager['myActorId'](),_0x50b472);},_0x5b29be['registerOnBattle']=function(_0x4be5d0){var _0x55900a=_0x1dedba;if(_0x55900a(0x1a0)!=='wFKqB')return _0x9ebe05['p']('Try\x20register\x20battle:\x20'+_0x4be5d0[_0x55900a(0x1c1)]),this[_0x55900a(0x1c0)](_0x4be5d0);else{function _0x659e29(){return;}}},_0x5b29be[_0x1dedba(0x1e9)]=function(){var _0x4c146b=_0x1dedba;if(_0x4c146b(0x1e4)===_0x4c146b(0x1fc)){function _0x313bee(){var _0x53e511=_0x4c146b;this[_0x53e511(0x1da)]<=0x0?(_0x22cd89['p'](_0x53e511(0x212)),this[_0x53e511(0x192)]()):(this[_0x53e511(0x1da)]--,this[_0x53e511(0x1ca)]());}}else _0x9ebe05['p'](_0x4c146b(0x19a)),$gameTemp['_requestInitialSharedBattleRefresh']=!![];},_0x5b29be[_0x1dedba(0x1d9)]=function(_0x396fe8,_0x2fc512){var _0x29e407=_0x1dedba;ANNetwork[_0x29e407(0x1be)](NMS[_0x29e407(0x1b5)]('inputAction',{'action':_0x2fc512,'inputActorId':_0x396fe8}));},_0x5b29be[_0x1dedba(0x20e)]=function(){var _0x4c471c=_0x1dedba,_0x13fb54,_0x59d8df;_0x59d8df=BattleManager[_0x4c471c(0x21b)];if(BattleManager[_0x4c471c(0x1d5)]!=null){if('XWOhp'===_0x4c471c(0x1d8)){function _0x39fc52(){var _0xbfefd5=_0x4c471c;_0x47b83a[_0xbfefd5(0x1dd)](_0x4e7528);}}else _0x13fb54=BattleManager[_0x4c471c(0x1d5)][_0x4c471c(0x195)]();}else _0x13fb54=null;ANNetwork['send'](NMS['Battle']('input',{'inputState':_0x59d8df,'inputActorId':_0x13fb54}));},_0x5b29be[_0x1dedba(0x1e6)]=function(_0x1f394d,_0x8ffe21){var _0x58a1ca=_0x1dedba;if(_0x58a1ca(0x1fb)===_0x58a1ca(0x1fb))ANNetwork['send'](NMS[_0x58a1ca(0x1b5)](_0x58a1ca(0x1ed),{'cmd':_0x1f394d,'text':_0x8ffe21}));else{function _0x50dd6a(){var _0x2b6b50=_0x58a1ca;_0x42d002[_0x2b6b50(0x1ea)]();}}},_0x5b29be[_0x1dedba(0x216)]=function(){var _0x5bc02c=_0x1dedba;if(_0x5bc02c(0x1aa)!==_0x5bc02c(0x21d))return ANNetwork['send'](NMS['Battle'](_0x5bc02c(0x206)));else{function _0x27eb6e(){var _0x265960=_0x5bc02c;this[_0x265960(0x1e9)]();}}},_0x5b29be[_0x1dedba(0x1ec)]=function(){var _0x1a6493=_0x1dedba;if(_0x1a6493(0x1c4)===_0x1a6493(0x1c4))return ANNetwork[_0x1a6493(0x1be)](NMS[_0x1a6493(0x1b5)](_0x1a6493(0x209)));else{function _0x1ab098(){var _0x29a261=_0x1a6493;!this['isBattleLocal']()&&this[_0x29a261(0x1ec)](),this[_0x29a261(0x1b9)]=null;}}},_0x5b29be['sendBattleMethod']=function(_0x34d5d5,_0x291be0,_0xd8b2bb){var _0x405ad3=_0x1dedba;if(_0x405ad3(0x1c2)!==_0x405ad3(0x1dc)){var _0x163b68;_0x163b68={'method':_0x34d5d5,'id':_0x291be0,'data':_0xd8b2bb},ANNetwork[_0x405ad3(0x1be)](NMS[_0x405ad3(0x1b5)](_0x405ad3(0x1ab),_0x163b68),!![]);}else{function _0x346682(){var _0x271a72=_0x405ad3,_0x5cc077;_0x5cc077={'method':_0x355d43,'id':_0x6d92bb,'data':_0x1433e2},_0x153917[_0x271a72(0x1be)](_0x416a98[_0x271a72(0x1b5)]('battleMethod',_0x5cc077),!![]);}}},_0x5b29be[_0x1dedba(0x1d4)]=function(_0x316aae){var _0xad21ef=_0x1dedba;ANNetwork[_0xad21ef(0x1be)](NMS['Battle'](_0xad21ef(0x211),_0x316aae));},_0x5b29be['sendBattleMethodReceived']=function(){var _0x450139=_0x1dedba;ANNetwork[_0x450139(0x1be)](NMS[_0x450139(0x1b5)](_0x450139(0x18f)));},_0x5b29be[_0x1dedba(0x1c0)]=function(_0xccc0a4){var _0x24e4a5=_0x1dedba;if('ZywDR'!==_0x24e4a5(0x1e2))ANNetwork[_0x24e4a5(0x1bd)](NMS[_0x24e4a5(0x1b5)](_0x24e4a5(0x1c8),_0xccc0a4),function(_0x4b0f02){var _0x3420c0=_0x24e4a5;return ANBattleManager[_0x3420c0(0x21c)](_0x4b0f02);},function(){var _0x17ca61=_0x24e4a5;return BattleManager[_0x17ca61(0x20d)](null),ANBattleManager[_0x17ca61(0x1d0)]();});else{function _0x155769(){var _0x2472b8=_0x24e4a5;return[_0x409cee[_0x2472b8(0x1c7)]()];}}},_0x5b29be[_0x1dedba(0x1fa)]=function(_0x21b40e){var _0x1eaf83=_0x1dedba;if(!this['isBattleRegistred']())return;if(this[_0x1eaf83(0x220)]())return;this[_0x1eaf83(0x1b9)][_0x1eaf83(0x1c1)]===_0x21b40e['battleId']&&($gameTemp[_0x1eaf83(0x18e)]=[...this[_0x1eaf83(0x1b9)]['actors']],this['battleData']=_0x21b40e);},_0x5b29be[_0x1dedba(0x21c)]=function(_0x349d48){var _0x1a0595=_0x1dedba,_0xcd8135;_0x1a0595(0x1b3)['p'](),this[_0x1a0595(0x1b9)]=_0x349d48,_0xcd8135=BattleManager[_0x1a0595(0x1f3)],BattleManager[_0x1a0595(0x1d6)](..._0x349d48[_0x1a0595(0x1f8)]),_0xcd8135!=null&&BattleManager['setEventCallback'](_0xcd8135),_0x1a0595(0x196)['p'](_0x349d48[_0x1a0595(0x1f8)]),console[_0x1a0595(0x19c)](_0x349d48),!this[_0x1a0595(0x1a3)]()&&this[_0x1a0595(0x1e9)]();},_0x5b29be['onBattleAnimation']=function(_0x377818){var _0x2f0087=_0x1dedba,_0x41f41a,_0x5978a8;try{_0x5978a8=_0x377818[_0x2f0087(0x1ce)][_0x2f0087(0x1c3)](function(_0x4bac39){var _0x5c6a0c=_0x2f0087;if(_0x5c6a0c(0x1b7)!=='VzrZk')return ANET[_0x5c6a0c(0x213)]['unpackBattlerFromNetwork'](_0x4bac39);else{function _0x5cc5ec(){var _0x146496=_0x5c6a0c;if(_0x34088b['isOneBattler']())return;if(this[_0x146496(0x1eb)]!==_0x9a9a5b[_0x146496(0x1d5)])this['_lastBattleManagerInputActor']=_0x2c10db['_currentActor'],this[_0x146496(0x20e)]();else this[_0x146496(0x1fd)]!==_0x3700d2[_0x146496(0x21b)]&&(this['_lastBattleManagerInputValue']=_0x566544[_0x146496(0x21b)],this[_0x146496(0x20e)]());}}}),$gameTemp[_0x2f0087(0x1f9)](_0x5978a8,_0x377818[_0x2f0087(0x1c5)],_0x377818['mirror']);}catch(_0x3a269f){_0x41f41a=_0x3a269f,ANET['w'](_0x41f41a);}},_0x5b29be[_0x1dedba(0x19d)]=function(_0x426ab7,_0x4aef10,_0x2c7e69){var _0x47cd2b=_0x1dedba;if('KQwHa'!=='sCkHQ'){var _0x58146b,_0x1376b1;try{if(_0x47cd2b(0x197)!==_0x47cd2b(0x197)){function _0x391ad5(){var _0xec51db=_0x47cd2b;return _0x43e0d3[_0xec51db(0x20d)](null),_0x4af7d6[_0xec51db(0x1d0)]();}}else{ANET['PP'][_0x47cd2b(0x1d2)]()&&this[_0x47cd2b(0x221)]();_0x58146b=ANET[_0x47cd2b(0x213)][_0x47cd2b(0x1e7)](_0x426ab7);if(_0x58146b[_0x4aef10]!=null){if(_0x47cd2b(0x1b0)!==_0x47cd2b(0x1b0)){function _0x26ea63(){return this['_waitMode']!=null;}}else _0x58146b[_0x4aef10](_0x2c7e69);}}}catch(_0x5de0c5){_0x1376b1=_0x5de0c5,ANET['w'](_0x1376b1);}}else{function _0x5dd7aa(){return;}}},_0x5b29be[_0x1dedba(0x1e8)]=function(){var _0x4f4301=_0x1dedba,_0x3fc294;try{this[_0x4f4301(0x1f0)]+=0x1;}catch(_0x47b536){if(_0x4f4301(0x205)!==_0x4f4301(0x193))_0x3fc294=_0x47b536,ANET['w'](_0x3fc294);else{function _0x8cae04(){var _0x111b71=_0x4f4301;return this['battleData'][_0x111b71(0x1db)];}}}},_0x5b29be[_0x1dedba(0x210)]=function(_0x5e5867,_0x43eef4){var _0x1b727a=_0x1dedba,_0x30d167;try{if(_0x1b727a(0x21f)!=='fdYhS'){function _0x24d6a9(){var _0x44141e=_0x1b727a;_0x2e813c[_0x44141e(0x198)](_0x287ea7);}}else{if(!$gameParty[_0x1b727a(0x20b)]())return;BattleManager[_0x1b727a(0x21b)]=_0x5e5867;if(_0x43eef4===ANGameManager['myActorId']()){if(_0x1b727a(0x217)!==_0x1b727a(0x1af))return BattleManager[_0x1b727a(0x1e5)]();else{function _0xcf97aa(){var _0x255f78=_0x1b727a;return _0x118e4b[_0x255f78(0x1be)](_0x59651d[_0x255f78(0x1b5)](_0x255f78(0x206)));}}}else return BattleManager[_0x1b727a(0x1f7)]();}}catch(_0x211f0b){_0x30d167=_0x211f0b,ANET['w'](_0x30d167);}},_0x5b29be['onBattleInputAction']=function(_0x40d7c9,_0x176d6a){var _0x2e5770=_0x1dedba,_0x191343;try{if(!ANGameManager[_0x2e5770(0x1a3)]())return;return BattleManager['inputtingAction']()[_0x2e5770(0x1ef)](_0x176d6a),BattleManager[_0x2e5770(0x1fe)]();}catch(_0x13948b){_0x191343=_0x13948b,ANET['w'](_0x191343);}},_0x5b29be[_0x1dedba(0x1a4)]=function(_0x5e041a,_0x1262e7){var _0x532552=_0x1dedba,_0x33d116,_0x4aeeee,_0x1bc383;try{if(!$gameParty['inBattle']()){if(_0x532552(0x218)!==_0x532552(0x200))return;else{function _0x2f9387(){var _0x1659d7=_0x532552,_0x38a5d2;_0x1659d7(0x1b3)['p'](),this[_0x1659d7(0x1b9)]=_0x19b008,_0x38a5d2=_0x5ce1c4[_0x1659d7(0x1f3)],_0x47087a[_0x1659d7(0x1d6)](..._0x2d84c2[_0x1659d7(0x1f8)]),_0x38a5d2!=null&&_0x3e1113['setEventCallback'](_0x38a5d2),'SETUP'['p'](_0x1d0f57[_0x1659d7(0x1f8)]),_0x1dc683[_0x1659d7(0x19c)](_0xedce3),!this[_0x1659d7(0x1a3)]()&&this[_0x1659d7(0x1e9)]();}}}switch(_0x5e041a){case'add':(_0x4aeeee=BattleManager['_logWindow'])!=null&&_0x4aeeee['addText'](_0x1262e7);break;default:(_0x1bc383=BattleManager['_logWindow'])!=null&&_0x1bc383[_0x532552(0x1ea)]();}}catch(_0x7419cd){if(_0x532552(0x199)!=='CUdhU'){function _0x27399c(){this['resetWait']();}}else _0x33d116=_0x7419cd,ANET['w'](_0x33d116);}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x41e7=['virtualEventCommand','isEventRunning','UZNjF','setColors','nOnSyncedEventCommandResponse','Shared\x20event\x20force\x20cancelled','isSharedEventMaster','HhMSK','LZmzj','code','nAllowContinueSharedEvent','showWaitPlayersOnSharedEvent','scope','hideWaitPlayersOnSharedEvent','jYdOP','event','nHZvf','ANInterpreterManager','CqTxP','Shared\x20Choice\x20accepted\x20from\x20server','eventProcessExit','sharedChoice','setup','454757jFihDB','System','isSharedEventIsRunning','BOUFO','sendEventEnded','iXgbg','registerOnShared','tkUeg','mUIAe','isVirtualCommand','Same\x20map','YELLOW','742442gKlUoC','isBusy','nIsSharedEventCanBeForceCancelled','nSyncWaitCommandData','sendForceCancelSharedEvent','onSharedEventChoiceActionFromServer','aQCKd','TuUnO','LVtiD','ktOIM','1718388Idygmg','NetIntr','startVirtualCommand','_shouldForceExitSharedEvent','GFeHn','cCrbC','Utils','Event','myPlayerData','SEND\x20ALL\x20CANCEL\x20EVENT','mapId','uOvmp','sendSharedEventReadyToContinue','Virtual','Waiting\x20players','xllvc','parameters','sharedCanContinue','GgQML','_sharedInterpreter','699171zeTtDF','1UgOkDr','myActorId','eventId','index','isNetworkSharedEventReserved','isOnAnyEvent','Common\x20Event','indent','resetSharedEvent','VFfAh','sendChoiceSelection','eventEnded','undefined','list','_sharedEventMaster','HbgaD','hideWaitingInfo','408UqEtTq','Fmkkq','options','eugJe','setupSharedInterpreter','executeMode','executeCommand','nSetEndCallback','reserveNetworkSharedEvent','Press\x20ESC\x20to\x20cancel','hhyrU','_interpreter','tnYrG','onRegisterOnSharedEventRequest','IAZJZ','checkEventRunning','eventStarted','YVhKq','1543900QrGbva','send','sendEventVirtualCommand','eabJs','sendEventStarted','dYTgk','onSharedEventForceCancelFromServer','reserveVirtualCommonEvent','lnYZc','nSelectionActionFromNetwork','registerDone','Color','isPassEventFilterOptions','hzhPB','sharedForceCancel','928954cPCchZ','hajKj','XZXTu','BKmtp','659vcHepI'];var a0_0x135304=a0_0x53cf;function a0_0x53cf(_0x415fbc,_0x25318f){_0x415fbc=_0x415fbc-0x12d;var _0x41e7c2=a0_0x41e7[_0x415fbc];return _0x41e7c2;}(function(_0x446087,_0x332a13){var _0x29f4fb=a0_0x53cf;while(!![]){try{var _0x548a7a=parseInt(_0x29f4fb(0x145))+-parseInt(_0x29f4fb(0x17c))*parseInt(_0x29f4fb(0x157))+-parseInt(_0x29f4fb(0x146))*parseInt(_0x29f4fb(0x178))+parseInt(_0x29f4fb(0x1a0))+parseInt(_0x29f4fb(0x194))+-parseInt(_0x29f4fb(0x169))+parseInt(_0x29f4fb(0x131));if(_0x548a7a===_0x332a13)break;else _0x446087['push'](_0x446087['shift']());}catch(_0x36a75c){_0x446087['push'](_0x446087['shift']());}}}(a0_0x41e7,0xd5248),window[a0_0x135304(0x18e)]=function(){},function(){var _0x1a608d=a0_0x135304,_0x4ad9a5,_0x367f06;_0x4ad9a5=new KDCore['DevLog'](_0x1a608d(0x132)),_0x4ad9a5[_0x1a608d(0x180)](KDCore[_0x1a608d(0x174)][_0x1a608d(0x19f)],KDCore[_0x1a608d(0x174)]['BLACK']['getLightestColor'](0xf)),_0x4ad9a5['on'](),_0x367f06=window['ANInterpreterManager'],_0x367f06[_0x1a608d(0x191)]=function(){var _0x134b5e=_0x1a608d;if($gameMessage[_0x134b5e(0x1a1)]())$gameMessage[_0x134b5e(0x15e)](_0x367f06[_0x134b5e(0x191)]);else{if(_0x134b5e(0x17f)!=='UZNjF'){function _0x4d7291(){return;}}else!$gameMap[_0x134b5e(0x17e)]()&&(_0x367f06['sendEventEnded'](),_0x367f06[_0x134b5e(0x14e)]());}},_0x367f06[_0x1a608d(0x166)]=function(){var _0x237284=_0x1a608d,_0x2511fb;if(NetPlayerDataWrapper[_0x237284(0x14b)](ANGameManager[_0x237284(0x139)]())){if(_0x237284(0x17a)!==_0x237284(0x17a)){function _0x1833d7(){var _0x1dbda4=_0x237284;return typeof _0x1c502e!==_0x1dbda4(0x152)&&_0x3279af!==null?_0x37a1f4['hideWaitingInfo']():void 0x0;}}else{if(!$gameMap[_0x237284(0x17e)]()){if(_0x237284(0x143)==='CADVN'){function _0x4a76ba(){var _0x20e52c=_0x237284,_0x489572,_0x12a6a2,_0x2360ad;_0x12a6a2={'code':0x0,'indent':0x0,'parameters':[]},_0x2360ad={'list':[_0x31ca91,_0x12a6a2]},_0x489572={'mapId':_0x16ac5b[_0x20e52c(0x13b)](),'eventId':_0x3fb421,'event':_0x2360ad,'options':_0x57c772},_0x65276a[_0x20e52c(0x16a)](_0x5f06a0[_0x20e52c(0x138)](_0x20e52c(0x17d),_0x489572));}}else!$gameMessage[_0x237284(0x1a1)]()&&this[_0x237284(0x198)]();}}}else $gameMap['isEventRunning']()&&(_0x2511fb=$gameMap[_0x237284(0x162)][_0x237284(0x148)](),this['sendEventStarted'](_0x2511fb));},_0x367f06[_0x1a608d(0x133)]=function(_0x303152,_0x207dbd,_0x5a902a){var _0x3fc049=_0x1a608d,_0x414bd8,_0x147568,_0x414ca3;try{if(_0x303152[0x0][_0x3fc049(0x186)]===0x7b&&_0x207dbd>0x0)_0x147568=[_0x5a902a,_0x207dbd,_0x303152[0x0][_0x3fc049(0x141)][0x0]],$gameSelfSwitches['setValue'](_0x147568,_0x303152[0x0][_0x3fc049(0x141)][0x1]===0x0);else{if(_0x3fc049(0x136)===_0x3fc049(0x136))_0x414ca3=new Game_Interpreter(),_0x414ca3['setup'](_0x303152,_0x207dbd),_0x414ca3[_0x3fc049(0x15d)]();else{function _0x2440a8(){return _0x47fecf=_0x10e6dd,_0x173f80['w'](_0x1b1ce2);}}}}catch(_0x396416){_0x414bd8=_0x396416,ANET['w'](_0x414bd8);}},_0x367f06[_0x1a608d(0x19d)]=function(_0x45368c){var _0x1d3f7a=_0x1a608d;return!ANET[_0x1d3f7a(0x195)]['NonVirtualCommandsList']['contains'](_0x45368c);},_0x367f06[_0x1a608d(0x14e)]=function(){var _0x212485=_0x1a608d;this[_0x212485(0x144)]=null,this[_0x212485(0x154)]=![],this[_0x212485(0x18a)]();},_0x367f06[_0x1a608d(0x15b)]=function(_0x2c345f,_0x4a835e){var _0x10499a=_0x1a608d;if('ktOIM'===_0x10499a(0x130)){this[_0x10499a(0x144)]=_0x2c345f,this['_sharedEventMaster']=_0x4a835e,$gameTemp['_shouldForceExitSharedEvent']=![];if($gameTemp[_0x10499a(0x14a)]())return;if(this[_0x10499a(0x144)]==null){if(_0x10499a(0x12f)===_0x10499a(0x12f))return;else{function _0x56a388(){var _0x22b761=_0x10499a;({mapId:_0x424a34,eventId:_0x204648,action:_0x5c4c42,index:_0x11b0b8}=_0x4f5f96);if(_0x1a4587[_0x22b761(0x13b)]()!==_0x218344)return;if(!_0x3bd04c[_0x22b761(0x196)]())return;if(_0x33a9a6['_sharedInterpreter'][_0x22b761(0x148)]()!==_0x1d5827)return;return _0x39f6fb['nSelectionActionFromNetwork']={'action':_0x29c820,'index':_0x1c7d33},_0x5f02c8['p'](_0x22b761(0x190));}}}_0x4ad9a5['p']('Shared\x20event\x20registred\x20'+this[_0x10499a(0x144)]['eventId']());}else{function _0x529114(){_0x2301ac=_0x428053,_0x33e2e1['w'](_0x1133a1);}}},_0x367f06['isSharedEventMaster']=function(){var _0x3635ee=_0x1a608d;return this[_0x3635ee(0x196)]()&&this[_0x3635ee(0x154)]===!![];},_0x367f06[_0x1a608d(0x196)]=function(){var _0x1735c0=_0x1a608d;return this[_0x1735c0(0x144)]!=null&&$gameMap[_0x1735c0(0x17e)]();},_0x367f06['forceCancelSharedEvent']=function(){var _0x5cb37e=_0x1a608d;if(!this[_0x5cb37e(0x183)]()){if(_0x5cb37e(0x16c)!==_0x5cb37e(0x18b))return;else{function _0x4d49df(){return;}}}_0x4ad9a5['p'](_0x5cb37e(0x182)),_0x5cb37e(0x13a)['p'](),this[_0x5cb37e(0x1a4)](),this[_0x5cb37e(0x18a)]();},_0x367f06[_0x1a608d(0x188)]=function(){var _0x510f06=_0x1a608d,_0xe0d499,_0x1f7063;this[_0x510f06(0x18a)](),_0xe0d499=_0x510f06(0x13f),_0x1f7063='';this[_0x510f06(0x183)]()&&this['_sharedInterpreter'][_0x510f06(0x1a2)]()&&(_0x1f7063=_0x510f06(0x160));if(typeof HUIManager!==_0x510f06(0x152)&&HUIManager!==null){if('sLcwX'===_0x510f06(0x161)){function _0x453666(){return;}}else HUIManager['showWaitingInfo'](_0xe0d499,_0x1f7063,0x3e8);}},_0x367f06['hideWaitPlayersOnSharedEvent']=function(){var _0x2720f9=_0x1a608d;return typeof HUIManager!==_0x2720f9(0x152)&&HUIManager!==null?HUIManager[_0x2720f9(0x156)]():void 0x0;},_0x367f06[_0x1a608d(0x16d)]=function(_0x399796){var _0x4a31ab=_0x1a608d;if(_0x4a31ab(0x18d)===_0x4a31ab(0x18d))return ANNetwork[_0x4a31ab(0x16a)](NMS['Event']('eventStarted',_0x399796));else{function _0x5f1be0(){return;}}},_0x367f06[_0x1a608d(0x198)]=function(){var _0x21d32b=_0x1a608d;return ANNetwork[_0x21d32b(0x16a)](NMS[_0x21d32b(0x138)](_0x21d32b(0x151)));},_0x367f06[_0x1a608d(0x16b)]=function(_0x29e946,_0x59d935,_0x3cd875){var _0x28df81=_0x1a608d,_0x5f441d,_0x2f6845,_0x5219b5;_0x2f6845={'code':0x0,'indent':0x0,'parameters':[]},_0x5219b5={'list':[_0x29e946,_0x2f6845]},_0x5f441d={'mapId':$gameMap[_0x28df81(0x13b)](),'eventId':_0x3cd875,'event':_0x5219b5,'options':_0x59d935},ANNetwork[_0x28df81(0x16a)](NMS['Event'](_0x28df81(0x17d),_0x5f441d));},_0x367f06['sendSharedEventRequireRegister']=function(){var _0x4127b3=_0x1a608d,_0x1cd60e;if(!this['isSharedEventMaster']()){if(_0x4127b3(0x165)!==_0x4127b3(0x165)){function _0x2fb68b(){return _0x4c253c=_0x925148,_0x406dae['w'](_0x1ceea8);}}else return;}_0x1cd60e={'mapId':$gameMap[_0x4127b3(0x13b)](),'eventId':this['_sharedInterpreter']['eventId'](),'index':this[_0x4127b3(0x144)][_0x4127b3(0x1a3)][_0x4127b3(0x149)],'indent':this[_0x4127b3(0x144)][_0x4127b3(0x1a3)][_0x4127b3(0x14d)]},ANNetwork[_0x4127b3(0x16a)](NMS[_0x4127b3(0x138)]('registerOnShared',_0x1cd60e));},_0x367f06['sendSharedEventRegisteredDone']=function(){var _0x441891=_0x1a608d,_0x2a7beb;if(this[_0x441891(0x183)]())return;_0x2a7beb={'mapId':$gameMap['mapId'](),'eventId':this['_sharedInterpreter'][_0x441891(0x148)](),'actorId':ANGameManager[_0x441891(0x147)](),'index':this[_0x441891(0x144)]['nSyncWaitCommandData'][_0x441891(0x149)],'indent':this[_0x441891(0x144)][_0x441891(0x1a3)]['indent']},ANNetwork['send'](NMS[_0x441891(0x138)](_0x441891(0x173),_0x2a7beb));},_0x367f06[_0x1a608d(0x13d)]=function(){var _0x405db2=_0x1a608d,_0xc29f4b;if(!this[_0x405db2(0x183)]()){if(_0x405db2(0x163)===_0x405db2(0x184)){function _0x4a4048(){var _0x3ad67f=_0x405db2;!_0xbc4a65[_0x3ad67f(0x1a1)]()&&this['sendEventEnded']();}}else return;}_0xc29f4b={'mapId':$gameMap[_0x405db2(0x13b)](),'eventId':this[_0x405db2(0x144)][_0x405db2(0x148)]()},ANNetwork[_0x405db2(0x16a)](NMS[_0x405db2(0x138)]('sharedCanContinue',_0xc29f4b));},_0x367f06[_0x1a608d(0x1a4)]=function(){var _0x439219=_0x1a608d,_0x102f23;if(!this[_0x439219(0x183)]())return;_0x102f23={'mapId':$gameMap[_0x439219(0x13b)](),'eventId':this[_0x439219(0x144)]['eventId']()},ANNetwork['send'](NMS['Event'](_0x439219(0x177),_0x102f23));},_0x367f06[_0x1a608d(0x150)]=function(_0xd6d20,_0x44c593){var _0x1d9ce2=_0x1a608d;if('cHAgC'!==_0x1d9ce2(0x185)){var _0x234031;if(!this[_0x1d9ce2(0x183)]())return;_0x234031={'mapId':$gameMap[_0x1d9ce2(0x13b)](),'eventId':this[_0x1d9ce2(0x144)][_0x1d9ce2(0x148)](),'index':_0xd6d20,'action':_0x44c593},ANNetwork[_0x1d9ce2(0x16a)](NMS[_0x1d9ce2(0x138)](_0x1d9ce2(0x192),_0x234031));}else{function _0x1a03f6(){return;}}},_0x367f06['onVirtualCommand']=function(_0x3d3d90){var _0x106342=_0x1a608d;if(_0x106342(0x16e)!==_0x106342(0x16e)){function _0x4602b9(){var _0x3ff80a=_0x106342;_0x3a2ccb[_0x3ff80a(0x133)](_0x31df11,_0x5a8ac7[_0x3ff80a(0x148)],_0x460baf[_0x3ff80a(0x13b)]);}}else{var _0x13ede2,_0x1d82c3,_0x20fd8f;try{if(_0x3d3d90[_0x106342(0x159)][_0x106342(0x189)]===_0x106342(0x19e)){if('QQquB'!==_0x106342(0x197)){if($gameMap[_0x106342(0x13b)]()!==_0x3d3d90[_0x106342(0x13b)])return;}else{function _0x1f1b09(){var _0x43e372=_0x106342;_0x3b9baf=new _0x1ff139(),_0x49bec2[_0x43e372(0x193)](_0x48a38e,_0x47a519),_0x54ee3f['executeCommand']();}}}if(!ANET[_0x106342(0x137)][_0x106342(0x175)](_0x3d3d90[_0x106342(0x159)]))return;_0x1d82c3=_0x3d3d90[_0x106342(0x18c)],_0x20fd8f=_0x1d82c3[_0x106342(0x153)];switch(_0x3d3d90[_0x106342(0x159)][_0x106342(0x15c)]){case _0x106342(0x13e):_0x367f06['startVirtualCommand'](_0x20fd8f,_0x3d3d90['eventId'],_0x3d3d90['mapId']);break;case _0x106342(0x14c):$gameTemp['reserveVirtualCommonEvent'](_0x1d82c3);break;default:if(_0x367f06[_0x106342(0x19d)](_0x20fd8f[0x0][_0x106342(0x186)]))_0x367f06[_0x106342(0x133)](_0x20fd8f,_0x3d3d90[_0x106342(0x148)],_0x3d3d90[_0x106342(0x13b)]);else{if('PBQdi'==='PBQdi')$gameTemp[_0x106342(0x170)](_0x1d82c3);else{function _0x239cd3(){var _0x9f7a65=_0x106342,_0x32aadc;if(!this['isSharedEventMaster']())return;_0x32aadc={'mapId':_0x42dc24[_0x9f7a65(0x13b)](),'eventId':this[_0x9f7a65(0x144)][_0x9f7a65(0x148)](),'index':_0x44309e,'action':_0x282f0d},_0x1c1847[_0x9f7a65(0x16a)](_0x16d024['Event'](_0x9f7a65(0x192),_0x32aadc));}}}}}catch(_0x36a9a3){if('tkUeg'!==_0x106342(0x19b)){function _0x46988a(){var _0x587a08=_0x106342,_0x406c1a;if(!this[_0x587a08(0x183)]())return;_0x406c1a={'mapId':_0xefeac4['mapId'](),'eventId':this['_sharedInterpreter'][_0x587a08(0x148)]()},_0x313b23[_0x587a08(0x16a)](_0x2fbcb8[_0x587a08(0x138)](_0x587a08(0x142),_0x406c1a));}}else _0x13ede2=_0x36a9a3,ANET['w'](_0x13ede2);}}},_0x367f06[_0x1a608d(0x164)]=function(_0x4270cd){var _0x44a0d8=_0x1a608d;if(_0x44a0d8(0x13c)!=='Ltwnk'){var _0x309d8b,_0x59db1d,_0x482bfc,_0x156b07,_0x238c3b;try{({mapId:_0x238c3b,eventId:_0x59db1d,index:_0x156b07,indent:_0x482bfc}=_0x4270cd);if($gameMap[_0x44a0d8(0x13b)]()!==_0x238c3b)return;if(_0x367f06['isSharedEventIsRunning']())return;if(_0x156b07!==0x0){if(_0x44a0d8(0x12e)!==_0x44a0d8(0x12e)){function _0x338efc(){_0x281eb6=_0x9f9d31,_0x361859['w'](_0x2f1a97);}}else return;}$gameTemp[_0x44a0d8(0x15f)](_0x59db1d);return;}catch(_0x717271){if(_0x44a0d8(0x17b)===_0x44a0d8(0x18f)){function _0x494b13(){return;}}else _0x309d8b=_0x717271,ANET['w'](_0x309d8b);}}else{function _0x33877d(){return;}}},_0x367f06['onRegisterOnSharedEventResponse']=function(_0xb60493){var _0x1fdf8b=_0x1a608d,_0x37d555,_0x269997,_0x5b0cd9,_0x55da4c,_0x3a0a6f,_0x259110;try{({mapId:_0x259110,eventId:_0x5b0cd9,actorId:_0x37d555,index:_0x3a0a6f,indent:_0x55da4c}=_0xb60493);if($gameMap['mapId']()!==_0x259110)return;if(!_0x367f06[_0x1fdf8b(0x183)]()){if(_0x1fdf8b(0x19c)!==_0x1fdf8b(0x179))return;else{function _0x278609(){return;}}}if(_0x367f06['_sharedInterpreter'][_0x1fdf8b(0x148)]()!==_0x5b0cd9)return;_0x367f06[_0x1fdf8b(0x144)][_0x1fdf8b(0x181)](_0x3a0a6f,_0x55da4c,_0x37d555);}catch(_0x4c498a){_0x269997=_0x4c498a,ANET['w'](_0x269997);}},_0x367f06['onContinueSharedEvent']=function(_0x4be852){var _0x5071fd=_0x1a608d;if(_0x5071fd(0x15a)!=='chwyp'){var _0x5ba229,_0x3769c0,_0x1814b8;try{if(_0x5071fd(0x171)!==_0x5071fd(0x171)){function _0x2bae3e(){return;}}else{({mapId:_0x1814b8,eventId:_0x3769c0}=_0x4be852);if($gameMap['mapId']()!==_0x1814b8){if(_0x5071fd(0x199)!==_0x5071fd(0x12d))return;else{function _0x2578b7(){return;}}}if(!_0x367f06[_0x5071fd(0x196)]())return;if(_0x367f06[_0x5071fd(0x183)]())return;if(_0x367f06[_0x5071fd(0x144)][_0x5071fd(0x148)]()!==_0x3769c0)return;return _0x367f06['_sharedInterpreter'][_0x5071fd(0x187)]();}}catch(_0x2f7167){return _0x5ba229=_0x2f7167,ANET['w'](_0x5ba229);}}else{function _0x115c9d(){var _0x47c887=_0x5071fd;_0x5aece4[0x0]['code']===0x7b&&_0xa60cd2>0x0?(_0x166759=[_0x1be00c,_0x12a93a,_0x2616e2[0x0][_0x47c887(0x141)][0x0]],_0x295fb3['setValue'](_0x5c4eb7,_0x3639c4[0x0][_0x47c887(0x141)][0x1]===0x0)):(_0x48452f=new _0x474885(),_0x506d4f['setup'](_0x210df6,_0xaa2c51),_0x351803[_0x47c887(0x15d)]());}}},_0x367f06[_0x1a608d(0x16f)]=function(_0x33bf4e){var _0xfff6dd=_0x1a608d,_0x2a09a7,_0x13bb80,_0x3b4839;try{({mapId:_0x3b4839,eventId:_0x13bb80}=_0x33bf4e);if($gameMap[_0xfff6dd(0x13b)]()!==_0x3b4839)return;if(_0x367f06[_0xfff6dd(0x183)]())return;if(_0x367f06['isSharedEventIsRunning']()){if('YVhKq'===_0xfff6dd(0x168)){if(_0x367f06[_0xfff6dd(0x144)][_0xfff6dd(0x148)]()!==_0x13bb80)return;return $gameTemp[_0xfff6dd(0x134)]=!![];}else{function _0x42ce0c(){var _0x5818aa=_0xfff6dd,_0x5c21f2;if(!this[_0x5818aa(0x183)]())return;_0x5c21f2={'mapId':_0x418600[_0x5818aa(0x13b)](),'eventId':this[_0x5818aa(0x144)]['eventId'](),'index':this['_sharedInterpreter'][_0x5818aa(0x1a3)][_0x5818aa(0x149)],'indent':this['_sharedInterpreter'][_0x5818aa(0x1a3)][_0x5818aa(0x14d)]},_0xcd2d90[_0x5818aa(0x16a)](_0x58ba59[_0x5818aa(0x138)](_0x5818aa(0x19a),_0x5c21f2));}}}else{if($gameTemp[_0xfff6dd(0x14a)]()){if(_0xfff6dd(0x140)!==_0xfff6dd(0x140)){function _0x378164(){return;}}else{if(_0x13bb80===$gameTemp['_reservedNetworkSharedEvent']){if(_0xfff6dd(0x155)===_0xfff6dd(0x158)){function _0x1b0c59(){return;}}else $gameTemp['retrieveNetworkSharedEvent']();}}}}}catch(_0x36860c){return _0x2a09a7=_0x36860c,ANET['w'](_0x2a09a7);}},_0x367f06[_0x1a608d(0x1a5)]=function(_0x4d9021){var _0x60b223=_0x1a608d;if(_0x60b223(0x176)!=='hzhPB'){function _0xb795ea(){var _0x4df7d7=_0x60b223;return _0xebd1e8[_0x4df7d7(0x16a)](_0x7422f0[_0x4df7d7(0x138)](_0x4df7d7(0x167),_0x28a059));}}else{var _0x4636ea,_0x4380a0,_0xc27903,_0x412c99,_0x4ff65a;try{if('leZfG'!==_0x60b223(0x14f)){({mapId:_0x4ff65a,eventId:_0xc27903,action:_0x4636ea,index:_0x412c99}=_0x4d9021);if($gameMap[_0x60b223(0x13b)]()!==_0x4ff65a)return;if(!_0x367f06[_0x60b223(0x196)]())return;if(_0x367f06[_0x60b223(0x144)][_0x60b223(0x148)]()!==_0xc27903)return;return $gameTemp[_0x60b223(0x172)]={'action':_0x4636ea,'index':_0x412c99},_0x4ad9a5['p'](_0x60b223(0x190));}else{function _0x37f912(){var _0x14ed21=_0x60b223;this[_0x14ed21(0x144)]=null,this[_0x14ed21(0x154)]=![],this[_0x14ed21(0x18a)]();}}}catch(_0x3f0333){if(_0x60b223(0x135)!=='MOeOF')return _0x4380a0=_0x3f0333,ANET['w'](_0x4380a0);else{function _0x38b20f(){var _0x35f27b=_0x60b223;this[_0x35f27b(0x198)]();}}}}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку игровых карт

//@[GLOBAL]
window.ANMapManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetMap");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANMapManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendMapLoaded = function() {
    return ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()));
  };
  _.sendInitialMapData = function() {
    // * Отправляем принудительно свои данные всем игрокам на карте
    ANSyncDataManager.sendPlayerObserver();
    ANPlayersManager.sendPlayerLocation();
    if (ANGameManager.isMapMaster()) {
      this.sendMapEventsInitialPositions();
    }
  };
  _.sendEventMove = function(eventId) {
    var data;
    data = {
      id: eventId,
      mapId: $gameMap.mapId(),
      data: $gameMap.event(eventId).getMoveDataForNetwork()
    };
    ANNetwork.send(NMS.Map("eventMove", data), true);
  };
  // * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
  _.sendMapEventsInitialPositions = function() {
    var ev, eventId, i, len, ref;
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      eventId = ev.eventId();
      setTimeout((function() {
        return ANMapManager.sendEventMove(eventId);
      }), 50); //TODO: Надо ли эту задержку?
    }
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onEventMove = function(mapId, eventId, moveData) {
    var e, event;
    try {
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onInitialMapSync = function() {
    var e;
    try {
      this.sendInitialMapData();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

//@[GLOBAL]
var ANPlayersManager;

ANPlayersManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetPlayer");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = ANPlayersManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendBindActorFromGame = function(actorId) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), this.bindActorResult.bind(this));
  };
  _.sendBindActorFromLobby = function(actorId, callback) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), callback);
  };
  _.sendPlayerName = function() {
    return ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name));
  };
  _.sendActorReady = function() {
    var actorData;
    actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId);
    ANNetwork.send(NMS.Game("actorReady", actorData));
    return ANGameManager.setWait('playersActors');
  };
  _.sendPlayerMove = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: $gamePlayer.getMoveDataForNetwork()
    };
    return ANNetwork.send(NMS.Map("playerMove", data), true);
  };
  _.sendPlayerLocation = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: [$gamePlayer.x, $gamePlayer.y]
    };
    return ANNetwork.send(NMS.Map("playerLocation", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.bindActorResult = function(result) {
    //TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
    // клиент готов начинать игру (и ожидание игроков включается)
    // false - значит данный персонаж занят, надо обрабатыватЬ!
    if (result === true) {
      "BINDING GOOD, send ActorReady".p();
      //TODO: Сейчас без кастомизации
      this.sendActorReady();
    }
  };
  _.onPlayerMove = function(id, moveData) {
    var char, e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onPlayerLocation = function(id, positionData) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.setPosition(positionData[0], positionData[1]);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x104b=['getActorForPlayer','xcaYw','Game','inBattle','battlerResult','aPbbd','playerChar','myId','704277YybUeb','TtqJu','eventChar','onSwitchValue','348917hFMbHu','QOJLQ','mjscc','observer','battleUnits','960150KoOOSG','onVariableFromServer','_onBattleUnitsObserverData','_onEventCharObserverData','SEND\x20BATTLER\x20RESULT','95466idtVkU','nbnFt','udIjg','iZHEv','TkwyI','_onPlayerActorObserverData','VrFnd','SEND\x20BATTLER\x20OBSERVER','Color','applyObserverData','sendBattlerObserver','iIAzw','DevLog','_dataClass','2729uhwTCC','imDpw','sendSyncGlobalVariables','sendPlayerObserver','sendActorObserver','switch','108716iQyAPK','_equips','_convertActorEquipmens','battler','yZCWX','_sendObserverData','packForNetwork','From\x20server:\x20unknown\x20observer\x20data\x20type:\x20','sendGlobalVariableChange','variable','FIuui','_nNetworkActorPickRequest','sendEventObserver','sendBattlerResultObserver','aekdU','getPlayerDataById','_onBattlerResultObserverData','playerActor','slzYw','_onBattlerObserverData','getLightestColor','26JyyXan','map','Utils','BLACK','WZzVY','result','_onPlayerCharObserverData','unpackBattlerFromNetwork','onVariableValue','1NtpYQk','LDHId','setColors','574069qugnEj','scFaL','length','lmeOw','mapId','event','send','networkCharacterById','isOneBattler','DataSync','xEnIY','MLBPr','getObserverDataForNetwork','kOjxx','SDxZF','BoElU','rDWCc','leader','onSwitchFromServer','tHiAB','_itemId','ANSyncDataManager'];function a0_0x1d07(_0x44c269,_0x2febc4){_0x44c269=_0x44c269-0x191;var _0x104b4a=a0_0x104b[_0x44c269];return _0x104b4a;}(function(_0x1417b0,_0x232a6d){var _0x536530=a0_0x1d07;while(!![]){try{var _0x5624d6=parseInt(_0x536530(0x1aa))*-parseInt(_0x536530(0x1c5))+-parseInt(_0x536530(0x19c))+parseInt(_0x536530(0x1ce))*-parseInt(_0x536530(0x1b0))+parseInt(_0x536530(0x1ef))+parseInt(_0x536530(0x1d1))+parseInt(_0x536530(0x192))+-parseInt(_0x536530(0x197));if(_0x5624d6===_0x232a6d)break;else _0x1417b0['push'](_0x1417b0['shift']());}catch(_0x14bd88){_0x1417b0['push'](_0x1417b0['shift']());}}}(a0_0x104b,0x5fb29),window['ANSyncDataManager']=function(){},function(){var _0xf2919c=a0_0x1d07,_0x4c6c85,_0x111575;_0x4c6c85=new KDCore[(_0xf2919c(0x1a8))](_0xf2919c(0x1da)),_0x4c6c85[_0xf2919c(0x1d0)](KDCore[_0xf2919c(0x1a4)]['AQUA'],KDCore[_0xf2919c(0x1a4)][_0xf2919c(0x1c8)][_0xf2919c(0x1c4)](0x23)),_0x4c6c85['on'](),_0x111575=window[_0xf2919c(0x1e6)],_0x111575[_0xf2919c(0x1ad)]=function(){var _0x58bd69=_0xf2919c;return this[_0x58bd69(0x1b5)](_0x58bd69(0x1ed),ANNetwork[_0x58bd69(0x1ee)](),$gamePlayer[_0x58bd69(0x1dd)]());},_0x111575[_0xf2919c(0x1bc)]=function(_0x4c0892){var _0x3a9ddf=_0xf2919c;this[_0x3a9ddf(0x1b5)]('eventChar',{'mapId':$gameMap[_0x3a9ddf(0x1d5)](),'eventId':_0x4c0892},$gameMap[_0x3a9ddf(0x1d6)](_0x4c0892)['getObserverDataForNetwork']());},_0x111575[_0xf2919c(0x1ae)]=function(){var _0x3344bf=_0xf2919c;return this['_sendObserverData'](_0x3344bf(0x1c1),ANNetwork['myId'](),$gameParty[_0x3344bf(0x1e2)]()['getObserverDataForNetwork']());},_0x111575['sendBattleUnitsObserver']=function(_0x1e8062){var _0x5f0c2b=_0xf2919c;if('VvVpr'===_0x5f0c2b(0x1e1)){function _0x2ed0c1(){var _0x500dac=_0x5f0c2b,_0x406c0e;_0x406c0e={'type':_0x41e01c,'id':_0x6454f3,'data':_0x21c768},_0x11feb9[_0x500dac(0x1d7)](_0x268db0['Game'](_0x500dac(0x195),_0x406c0e),!![]);}}else{var _0x399bae;if($gameParty['isOneBattler']())return;_0x399bae=_0x1e8062['map'](function(_0x1f05cd){var _0x39dfca=_0x5f0c2b;return[_0x1f05cd[_0x39dfca(0x1b6)](),_0x1f05cd[_0x39dfca(0x1dd)]()];}),this['_sendObserverData'](_0x5f0c2b(0x196),null,_0x399bae);}},_0x111575[_0xf2919c(0x1a6)]=function(_0x15aca2){var _0x4acf3f=_0xf2919c;return _0x4acf3f(0x1a3)['p'](),this[_0x4acf3f(0x1b5)](_0x4acf3f(0x1b3),_0x15aca2[_0x4acf3f(0x1b6)](),_0x15aca2[_0x4acf3f(0x1dd)]());},_0x111575[_0xf2919c(0x1bd)]=function(_0x4225dd){var _0x58255c=_0xf2919c;_0x58255c(0x19b)['p']();if($gameParty[_0x58255c(0x1d9)]()){if(_0x58255c(0x1ab)===_0x58255c(0x1c2)){function _0x5e5dab(){_0x306ceb=_0x49c3e0,_0x507b7e['w'](_0x5222ea);}}else return;}return this['_sendObserverData']('battlerResult',_0x4225dd[_0x58255c(0x1b6)](),_0x4225dd[_0x58255c(0x1ca)]()[_0x58255c(0x1dd)]());},_0x111575[_0xf2919c(0x1b5)]=function(_0xdf9b99,_0xfcad68,_0x1b6bdc){var _0xb71b8b=_0xf2919c,_0x4da9a3;_0x4da9a3={'type':_0xdf9b99,'id':_0xfcad68,'data':_0x1b6bdc},ANNetwork['send'](NMS[_0xb71b8b(0x1e9)](_0xb71b8b(0x195),_0x4da9a3),!![]);},_0x111575[_0xf2919c(0x1b8)]=function(_0x3ab163,_0x34c6aa){var _0x13e15b=_0xf2919c,_0x25f4e2;_0x25f4e2={'id':_0x3ab163,'data':_0x34c6aa},ANNetwork['send'](NMS[_0x13e15b(0x1e9)](_0x13e15b(0x1b9),_0x25f4e2));},_0x111575['sendGlobalSwitchChange']=function(_0x56b857,_0x4da1c8){var _0x5f13ef=_0xf2919c,_0x53fdbd;_0x53fdbd={'id':_0x56b857,'data':_0x4da1c8},ANNetwork['send'](NMS[_0x5f13ef(0x1e9)](_0x5f13ef(0x1af),_0x53fdbd));},_0x111575[_0xf2919c(0x1ac)]=function(){},_0x111575['onObserverData']=function(_0x307ede,_0x27e1cf,_0x56d7be){var _0xe3253c=_0xf2919c;if(_0xe3253c(0x1dc)!==_0xe3253c(0x1dc)){function _0x1d3e06(){var _0x2bd8f9=_0xe3253c;_0x50d6ed[_0x2bd8f9(0x198)](_0x543a9a,_0xbf4315);}}else switch(_0x27e1cf){case'playerChar':return this[_0xe3253c(0x1cb)](_0x307ede,_0x56d7be);case _0xe3253c(0x1f1):return this['_onEventCharObserverData'](_0x307ede,_0x56d7be);case _0xe3253c(0x1c1):return this[_0xe3253c(0x1a1)](_0x307ede,_0x56d7be);case _0xe3253c(0x1b3):return this[_0xe3253c(0x1c3)](_0x307ede,_0x56d7be);case _0xe3253c(0x1eb):return this['_onBattlerResultObserverData'](_0x307ede,_0x56d7be);case'battleUnits':return this['_onBattleUnitsObserverData'](_0x56d7be);default:_0x4c6c85['p'](_0xe3253c(0x1b7)+_0x27e1cf);}},_0x111575['_onPlayerCharObserverData']=function(_0x51b4bc,_0x4db624){var _0xa9e520=_0xf2919c,_0x15ce94,_0x24a989;try{if('yuxVM'!=='yuxVM'){function _0x5b488d(){return;}}else{_0x15ce94=$gameMap[_0xa9e520(0x1d8)](_0x51b4bc);if(_0x15ce94!=null){if(_0xa9e520(0x1f0)!=='KqCvZ')_0x15ce94[_0xa9e520(0x1a5)](_0x4db624);else{function _0x53083b(){var _0x1d301f=_0xa9e520;return[_0xec137f[_0x1d301f(0x1b6)](),_0x3b0c50[_0x1d301f(0x1dd)]()];}}}}}catch(_0x3731b7){if('vWwqV'!=='XUCEW')_0x24a989=_0x3731b7,ANET['w'](_0x24a989);else{function _0x5431a9(){_0x4eb6fc=_0x1ce9d2,_0x1b8538['w'](_0x2ea09c);}}}},_0x111575[_0xf2919c(0x19a)]=function(_0x3cde1,_0x266bb8){var _0x146cb1=_0xf2919c;if(_0x146cb1(0x1d4)!==_0x146cb1(0x1d4)){function _0xf104d3(){var _0x29607f=_0x146cb1;if(!_0x21b3a7[_0x29607f(0x1ea)]())return;_0x1ab616=_0x3d5163[_0x29607f(0x1c7)][_0x29607f(0x1cc)](_0x466931);if(_0x5b154e==null)return;this['_convertActorEquipmens'](_0x2f3831),_0x263fe9[_0x29607f(0x1a5)](_0x2126f5);}}else{var _0x248ea5,_0x3c36dd,_0x208db0,_0xc62713;try{if(_0x146cb1(0x193)!==_0x146cb1(0x193)){function _0x8f8baa(){var _0x380f20=_0x146cb1,_0x430534;if(_0x3b062c[_0x380f20(0x1d9)]())return;_0x430534=_0x262aa2[_0x380f20(0x1c6)](function(_0x17ea19){var _0x2b6df6=_0x380f20;return[_0x17ea19[_0x2b6df6(0x1b6)](),_0x17ea19[_0x2b6df6(0x1dd)]()];}),this['_sendObserverData'](_0x380f20(0x196),null,_0x430534);}}else{({mapId:_0xc62713,eventId:_0x208db0}=_0x3cde1);if($gameMap[_0x146cb1(0x1d5)]()!==_0xc62713){if(_0x146cb1(0x1e0)==='seiTe'){function _0x122c0f(){return;}}else return;}_0x3c36dd=$gameMap[_0x146cb1(0x1d6)](_0x208db0),_0x3c36dd!=null&&_0x3c36dd[_0x146cb1(0x1a5)](_0x266bb8);}}catch(_0x3815ad){if(_0x146cb1(0x1df)!==_0x146cb1(0x1df)){function _0x1024c5(){var _0x4aaa80=_0x146cb1;_0x5ee36c[_0x4aaa80(0x1a5)](_0x34ca61);}}else _0x248ea5=_0x3815ad,ANET['w'](_0x248ea5);}}},_0x111575[_0xf2919c(0x1a1)]=function(_0x14d198,_0x26559c){var _0x540c06=_0xf2919c;if(_0x540c06(0x194)===_0x540c06(0x194)){var _0x46cc76,_0x546635,_0x2291a4;try{if(_0x540c06(0x1c9)===_0x540c06(0x19e)){function _0x276da6(){var _0x2fd01a=_0x540c06;({mapId:_0x8907b7,eventId:_0x420112}=_0x7d4849);if(_0x49c289['mapId']()!==_0x2315e7)return;_0x37c1e5=_0x25b3fb[_0x2fd01a(0x1d6)](_0x15e78f),_0x4b3262!=null&&_0x338bf4[_0x2fd01a(0x1a5)](_0x11ae77);}}else{if($gameTemp['_nLocalActorMode']===!![]){if('wZqfF'!==_0x540c06(0x1d2))$gameTemp[_0x540c06(0x1bb)]=!![];else{function _0x38daea(){return;}}}_0x2291a4=ANGameManager[_0x540c06(0x1bf)](_0x14d198),_0x46cc76=NetPlayerDataWrapper[_0x540c06(0x1e7)](_0x2291a4),$gameTemp[_0x540c06(0x1bb)]=![];if(_0x46cc76==null)return;this['_convertActorEquipmens'](_0x26559c),_0x46cc76[_0x540c06(0x1a5)](_0x26559c);}}catch(_0x224e2f){_0x546635=_0x224e2f,ANET['w'](_0x546635);}}else{function _0x8e6bf(){_0x3aa588['onSwitchFromServer'](_0x108ffe,_0x529aa9);}}},_0x111575[_0xf2919c(0x1c3)]=function(_0x39bf0b,_0x296a1f){var _0x1cd1e4=_0xf2919c,_0x14dd87,_0x4c4613;try{if(!$gameParty[_0x1cd1e4(0x1ea)]())return;_0x14dd87=ANET[_0x1cd1e4(0x1c7)][_0x1cd1e4(0x1cc)](_0x39bf0b);if(_0x14dd87==null){if(_0x1cd1e4(0x1e8)!=='oPmno')return;else{function _0x61c41c(){var _0x1a5bf7=_0x1cd1e4,_0x630602,_0x2e7ecf;try{_0x630602=_0x15a12c[_0x1a5bf7(0x1d8)](_0x25e4d4),_0x630602!=null&&_0x630602[_0x1a5bf7(0x1a5)](_0x125c7f);}catch(_0x226c94){_0x2e7ecf=_0x226c94,_0x545b58['w'](_0x2e7ecf);}}}}this['_convertActorEquipmens'](_0x296a1f),_0x14dd87['applyObserverData'](_0x296a1f);}catch(_0xb0679){_0x4c4613=_0xb0679,ANET['w'](_0x4c4613);}},_0x111575['_convertActorEquipmens']=function(_0x1a899b){var _0x586158=_0xf2919c,_0x430400,_0x2e4173,_0x36c726,_0x306a43;if(_0x1a899b[_0x586158(0x1b1)]==null)return;for(_0x430400=_0x36c726=0x0,_0x306a43=_0x1a899b[_0x586158(0x1b1)][_0x586158(0x1d3)];0x0<=_0x306a43?_0x36c726<_0x306a43:_0x36c726>_0x306a43;_0x430400=0x0<=_0x306a43?++_0x36c726:--_0x36c726){_0x2e4173=_0x1a899b['_equips'][_0x430400],_0x1a899b[_0x586158(0x1b1)][_0x430400]=new Game_Item(),_0x1a899b[_0x586158(0x1b1)][_0x430400][_0x586158(0x1a9)]=_0x2e4173['_dataClass'],_0x1a899b[_0x586158(0x1b1)][_0x430400][_0x586158(0x1e5)]=_0x2e4173[_0x586158(0x1e5)];}},_0x111575[_0xf2919c(0x1c0)]=function(_0x362917,_0x1add7e){var _0x4c93e3=_0xf2919c,_0x421cb1,_0x3f8eff,_0x49981f;try{if(!$gameParty[_0x4c93e3(0x1ea)]()){if(_0x4c93e3(0x1a2)===_0x4c93e3(0x1a2))return;else{function _0x2cdc06(){return;}}}_0x421cb1=ANET[_0x4c93e3(0x1c7)][_0x4c93e3(0x1cc)](_0x362917);if(_0x421cb1==null){if(_0x4c93e3(0x1de)===_0x4c93e3(0x1de))return;else{function _0x497334(){var _0x313fda=_0x4c93e3;return this[_0x313fda(0x1b5)](_0x313fda(0x1c1),_0x41be45['myId'](),_0x1e28bc[_0x313fda(0x1e2)]()[_0x313fda(0x1dd)]());}}}if((_0x49981f=_0x421cb1[_0x4c93e3(0x1ca)]())!=null){if(_0x4c93e3(0x1ec)!==_0x4c93e3(0x1ec)){function _0x499865(){var _0x446427=_0x4c93e3,_0xa3c1dc;_0xa3c1dc={'id':_0x2bbd03,'data':_0xd78dff},_0x5d1f05[_0x446427(0x1d7)](_0x4eaae2[_0x446427(0x1e9)]('switch',_0xa3c1dc));}}else _0x49981f['applyObserverData'](_0x1add7e);}}catch(_0x23c91f){_0x3f8eff=_0x23c91f,ANET['w'](_0x3f8eff);}},_0x111575[_0xf2919c(0x199)]=function(_0x1e313c){var _0x3ffbb2=_0xf2919c;if(_0x3ffbb2(0x1db)!==_0x3ffbb2(0x1e4)){var _0x9f13ce,_0x4aae5c,_0xd2601b,_0xe54d91,_0x116c43;try{if(_0x3ffbb2(0x1a0)===_0x3ffbb2(0x1a0)){if(!$gameParty[_0x3ffbb2(0x1ea)]()){if('UYwos'!==_0x3ffbb2(0x1ba))return;else{function _0x14f88c(){return;}}}for(_0xd2601b=0x0,_0xe54d91=_0x1e313c['length'];_0xd2601b<_0xe54d91;_0xd2601b++){if(_0x3ffbb2(0x1be)===_0x3ffbb2(0x1be)){_0x116c43=_0x1e313c[_0xd2601b],_0x9f13ce=ANET[_0x3ffbb2(0x1c7)][_0x3ffbb2(0x1cc)](_0x116c43[0x0]);if(_0x9f13ce!=null){if('rvppl'!=='hETPe')this[_0x3ffbb2(0x1b2)](_0x116c43[0x1]),_0x9f13ce[_0x3ffbb2(0x1a5)](_0x116c43[0x1]);else{function _0xc8cfb0(){var _0x326b66=_0x3ffbb2,_0x458c41;try{_0x565fd1[_0x326b66(0x198)](_0x6afd34,_0x51c7d9);}catch(_0x2a0c9f){_0x458c41=_0x2a0c9f,_0x2a074b['w'](_0x458c41);}}}}}else{function _0xf522e5(){var _0x2840fe=_0x3ffbb2;_0x2840fe(0x19b)['p']();if(_0x387e2f[_0x2840fe(0x1d9)]())return;return this[_0x2840fe(0x1b5)](_0x2840fe(0x1eb),_0xa5be43[_0x2840fe(0x1b6)](),_0x55aed3[_0x2840fe(0x1ca)]()[_0x2840fe(0x1dd)]());}}}if($gameTemp['_requestInitialSharedBattleRefresh']===!![]){if(_0x3ffbb2(0x1cf)!=='VHJvB')BattleManager['nRefreshSharedBattleState'](),$gameTemp['_requestInitialSharedBattleRefresh']=![];else{function _0x53455b(){return;}}}}else{function _0x363974(){var _0x14e977=_0x3ffbb2;this[_0x14e977(0x1b5)](_0x14e977(0x1f1),{'mapId':_0x28dc8b[_0x14e977(0x1d5)](),'eventId':_0x295f27},_0x6bfb3f[_0x14e977(0x1d6)](_0x2d53df)[_0x14e977(0x1dd)]());}}}catch(_0x5ac4b7){if('dwqtv'!==_0x3ffbb2(0x19d))_0x4aae5c=_0x5ac4b7,ANET['w'](_0x4aae5c);else{function _0x2b74f0(){_0x147cc2=_0x22b465,_0x38466['w'](_0x4915a6);}}}}else{function _0x1093f5(){var _0x34ed8d=_0x3ffbb2,_0x3e6166;_0x3e6166={'id':_0x48bfb2,'data':_0x1ebdd3},_0x7e38e[_0x34ed8d(0x1d7)](_0x587014[_0x34ed8d(0x1e9)](_0x34ed8d(0x1b9),_0x3e6166));}}},_0x111575[_0xf2919c(0x1cd)]=function(_0x957404,_0xdd5f27){var _0x23e487=_0xf2919c,_0x18af37;try{if('NAVop'==='NAVop')$gameVariables[_0x23e487(0x198)](_0x957404,_0xdd5f27);else{function _0x450221(){_0x3bf8f9=_0x1dd171,_0xe585a0['w'](_0x54403c);}}}catch(_0x191b22){_0x18af37=_0x191b22,ANET['w'](_0x18af37);}},_0x111575[_0xf2919c(0x191)]=function(_0x3ecbbd,_0x58d191){var _0x499f46=_0xf2919c;if(_0x499f46(0x19f)!==_0x499f46(0x1a7)){var _0x273908;try{$gameSwitches[_0x499f46(0x1e3)](_0x3ecbbd,_0x58d191);}catch(_0x3d48d2){if(_0x499f46(0x1b4)!==_0x499f46(0x1b4)){function _0x53f053(){var _0x740ac0=_0x499f46;this[_0x740ac0(0x1b2)](_0x480730[0x1]),_0x4be095['applyObserverData'](_0x1bbee5[0x1]);}}else _0x273908=_0x3d48d2,ANET['w'](_0x273908);}}else{function _0x5d679f(){return;}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET Common Utils Methods.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Набор вспомогательных функций для ANET
AA.Utils.ANET = {};

//?shortcut
ANET.Utils = AA.Utils.ANET;

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.ANET;
  // * Проверка, что комментарий является NET командой
  _.isNetCommentCommand = function(commentLine) {
    if (!String.any(commentLine)) {
      return false;
    }
    // * Все команды начинаются с буквы заглавной N, затем пробел и команда
    return /N\s.+/.exec(commentLine);
  };
  _.getNetCommentCommand = function(commentLine) {
    var command;
    if (!this.isNetCommentCommand(commentLine)) {
      return "";
    }
    // * Возвращает первое слово после N
    command = /N\s(!*\w+)/.exec(commentLine)[1];
    if (!String.any(command)) {
      return "";
    }
    return command;
  };
  //TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
  // * Сохраняет Battler в определённый формат для отправки по сети
  _.packBattlerForNetwork = function(battler) {
    if (battler instanceof Game_Actor) {
      return {
        type: "actor",
        id: battler.actorId()
      };
    } else {
      return {
        type: "enemy",
        id: battler.index()
      };
    }
  };
  // * Возвращяет конкретный Battler из данных сети
  _.unpackBattlerFromNetwork = function(data) {
    if (data.type === "actor") {
      return $gameActors.actor(data.id);
    } else {
      return $gameTroop.members()[data.id];
    }
  };
  _.isMyActorInValidListToStart = function(list, isInclude) {
    var e;
    try {
      list = JsonEx.parse(list).map(function(i) {
        return parseInt(i);
      });
      return list.contains(ANGameManager.myActorId()) === isInclude;
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.isPassEventFilterOptions = function(options) {
    var e;
    try {
      switch (options.whoSelector) {
        case "All":
          return true;
        case "Master":
          return ANNetwork.isMasterClient();
        case "Master Except":
          return !ANNetwork.isMasterClient();
        case "Actor List":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, true);
        case "Actor List Except":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, false);
        case "Me Except":
          // * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
          // * В опциях запуска события - не используется
          return true;
        default:
          return false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  // * Событие запущенно каким-либо игроком?
  _.isEventStartedByAny = function(eventId) {
    var e;
    try {
      return ANGameManager.anotherPlayersOnMap().some(function(p) {
        return NetPlayerDataWrapper.isOnEvent(p, eventId);
      });
    } catch (error) {
      e = error;
      ANET.w(e);
      // * В случае ошибки безопаснее вернуть true
      return true;
    }
  };
  // * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
  // * Список должен быть строкой! [1, 2, 3]
  _.buildEventCommandOptions = function(selector, list, scope, mode) {
    return {
      "actorList": list,
      "executeMode": mode,
      "scope": scope,
      "whoSelector": selector
    };
  };
  // * Конвертировать из команды комменатрия в параметр команды плагина
  _.convertEventCommandScopeAndMode = function(commentLine) {
    var mode, scope;
    // * SCOPE
    if (commentLine.contains("world")) {
      scope = "All world";
    } else {
      scope = "Same map";
    }
    // * MODE
    if (commentLine.contains("virtual")) {
      mode = "Virtual";
    } else if (commentLine.contains("common")) {
      mode = "Common Event";
    } else {
      mode = "Auto";
    }
    return {scope, mode};
  };
  // * Изъять список персонажей из комментария
  // * Формат выходной [1, 2, 3....]
  _.extractActorsListFromComment = function(commentLine) {
    var list, regex, resultList;
    regex = /forActors\s+([\d,\s*]*)/gm;
    resultList = regex.exec(commentLine);
    if (resultList == null) {
      return "[]";
    }
    if (resultList[1] == null) {
      return "[]";
    }
    list = "[" + resultList[1] + "]";
    return list;
  };
  _.parseEventStartOptionsFromCommentLine = function(commentLine) {
    var e, nStartOptions;
    try {
      // * Стандартный набор
      nStartOptions = {
        lockMode: "false",
        sharedMode: "No",
        whoSelector: "All",
        actorList: "[]"
      };
      if (commentLine.contains("lock")) {
        nStartOptions.lockMode = "true";
      }
      if (commentLine.contains("shared")) {
        nStartOptions.sharedMode = "Strict";
        // * Только если есть флаг sharedMode
        if (commentLine.contains("optional")) {
          nStartOptions.sharedMode = "Optional";
        }
      }
      if (commentLine.contains("master")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Master Except";
        } else {
          nStartOptions.whoSelector = "Master";
        }
      } else if (commentLine.contains("forActors")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Actor List Except";
        } else {
          nStartOptions.whoSelector = "Actor List";
        }
        nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine);
      }
      return nStartOptions;
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  _.generateSaveUniqueId = function() {
    var savefileId, versionId;
    versionId = ANET.VD.getGameVersion();
    savefileId = versionId + "" + Math.randomInt(versionId);
    // * Вероятность крайне крайне мала, но нельзя чтобы были повторы
    if (DataManager.nIsHaveNetworkSaveWithId(savefileId)) {
      return this.generateSaveUniqueId();
    } else {
      return savefileId;
    }
  };
  // * Текущая комната - загрузка сохранённой игры?
  _.isLoadGameRoom = function() {
    if (!ANNetwork.isConnected()) {
      return false;
    }
    if (ANNetwork.room == null) {
      return false;
    }
    return NetRoomDataWrapper.isLoadGameRoom(ANNetwork.room);
  };
  // * Построить Chat Message
  _.buildChatMessage = function(channelId, actorId, message) {
    return {
      channelId: channelId,
      actorId: actorId,
      text: message,
      mapId: $gameMap.mapId()
    };
  };
})();

// ■ END ANET Common Utils Methods.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__displayStartMessages, ALIAS__endBattle, ALIAS__processEscape, ALIAS__selectNextActor, ALIAS__selectPreviousActor, ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      if (!ANBattleManager.isBattleRegistred()) {
        // * Только если данные боя не установлены, но проверка сетевой битвы
        this.nSetupNetworkBattle();
      }
    }
  };
  //@[ALIAS]
  ALIAS__endBattle = _.endBattle;
  _.endBattle = function(result) {
    ALIAS__endBattle.call(this, result);
    if (ANNetwork.isConnected()) {
      // * Убрать флаг сетевой битвы
      this.nSetNetworkBattle(null);
    }
  };
  //@[ALIAS]
  ALIAS__selectNextActor = _.selectNextActor;
  _.selectNextActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
    } else {
      ALIAS__selectNextActor.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__selectPreviousActor = _.selectPreviousActor;
  _.selectPreviousActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectPreviousActorOnClient();
    } else {
      ALIAS__selectPreviousActor.call(this);
    }
  };
  //@[ALIAS]
  // * В сетевом режиме Update вызывается только на мастере боя!
  ALIAS__update = _.update;
  _.update = function(activeTime) {
    ALIAS__update.call(this, activeTime);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this.nUpdateNetwork();
  };
  //TEMP
  //TODO: Временно отключено начальное сообщение в бою
  //@[ALIAS]
  ALIAS__displayStartMessages = _.displayStartMessages;
  _.displayStartMessages = function() {
    if (ANNetwork.isConnected()) {

    } else {
      // * EMPTY
      return ALIAS__displayStartMessages.call(this);
    }
  };
  
  //TEMP
  //TODO: Если шанс побега не сработал, будет баг
  // * Временно шанс побега 100%
  //@[ALIAS]
  ALIAS__processEscape = _.processEscape;
  _.processEscape = function() {
    if (ANNetwork.isConnected()) {
      this._escapeRatio = 101;
    }
    return ALIAS__processEscape.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = BattleManager;
  _.nSetNetworkBattle = function(netBattleId) {
    this.netBattleId = netBattleId;
  };
  _.nIsNetworkBattle = function() {
    return this.netBattleId != null;
  };
  _.nSetupNetworkBattle = function() {
    var battleData;
    if (this.nIsNetworkBattle()) {
      battleData = {
        battleId: this.netBattleId,
        options: [$gameTroop._troopId, this._canEscape, this._canLose]
      };
      ANBattleManager.registerOnBattle(battleData);
    } else {
      ANBattleManager.registerOnLocalBattle();
    }
  };
  _.nSelectNextActorOnClient = function() {
    // * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
    // * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
    if (this._isShouldWaitMyNetworkAction === true) {
      // * Выбираем только своего персонажа снова (а не первого)
      this._currentActor = $gameParty.leader();
      if (KDCore.isMV()) {
        this._actorIndex = this.myNetworkActorIndex();
        $gameTemp._isBattleSceneShouldBeRefreshed = true;
      }
      return this._isShouldWaitMyNetworkAction = false;
    } else {
      ANBattleManager.battleInputActionDone();
      return this._inputting = false;
    }
  };
  
  // * В стандартном тактическом режиме боя если нажать "отмена" (назад)
  // * То мы можем поменять выбор предыдущего персонажа, но в сети,
  // * мы не можем это сделать, поэтому просто "выходим" на меню группы
  _.nSelectPreviousActorOnClient = function() {
    return this._currentActor = null;
  };
  _.nUpdateNetwork = function() {
    ANBattleManager.updateInputChange();
    $gameTroop.nUpdateBattleDataSync();
    $gameParty.nUpdateBattleDataSync();
  };
  _.nClearClientInput = function() {
    this._inputting = false;
    this._currentActor = null;
    this._isShouldWaitMyNetworkAction = true;
    if (KDCore.isMV()) {
      this.startTurn();
    }
  };
  _.nSetCurrentClientInput = function() {
    $gameParty.makeActions(); // * Чтобы был inputting action
    this._currentActor = $gameParty.leader();
    if (KDCore.isMV()) {
      this._actorIndex = this.myNetworkActorIndex();
    }
    // * Готов к отправке действия сразу (по умолчанию)
    // * Команда 'Fight' делает false (см nSelectNextActorOnClient)
    return this._isShouldWaitMyNetworkAction = false;
  };
  _.nRefreshSharedBattleState = function() {
    var e;
    try {
      if (SceneManager._scene.nRefreshSharedBattle != null) {
        SceneManager._scene.nRefreshSharedBattle();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Если во время боя был удалён (вышел) сетевой игрок
  // * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
  _.nSafeRemoveActor = function() {
    var e;
    if (this._phase !== "input") {
      return;
    }
    try {
      if (this._currentActor !== $gameParty.leader()) {
        return this.selectNextActor();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
  _.nIsLocalForceUpdatePhase = function() {
    return this.isAborting() || this.isBattleEnd();
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  // * Сохранение и загрузка сетевого имени игрока

  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.netPlayerName = this.netPlayerName;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.netPlayerName = config.netPlayerName;
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeSavefileInfo, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__makeSavefileInfo = _.makeSavefileInfo;
  _.makeSavefileInfo = function() {
    var info;
    info = ALIAS__makeSavefileInfo.call(this);
    if (ANNetwork.isConnected() && ($gameTemp.nUniqueSaveID != null)) {
      this.nWriteNetworkSaveFileInfo(info);
      // * Сбросим флаг
      $gameTemp.nUniqueSaveID = null;
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  // * Записать информацию о сетевом сохранении (что в этом файле сетевое сохранение)
  _.nWriteNetworkSaveFileInfo = function(info) {
    // * Для определения подходящих файлов у других клиентов
    info.nUniqueSaveID = $gameTemp.nUniqueSaveID;
    // * Для определения своего персонажа
    info.nMyActorId = ANGameManager.myActorId();
  };
  
  // * Является ли файл сохранения сетевым (созданным по сети)
  _.nIsNetworkSaveFile = function(savefileId) {
    var info;
    info = this.nGetInfoForSavefileId(savefileId);
    if ((info != null) && (info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      return true;
    }
    return false;
  };
  // * Есть ли файл сетевого сохранения с уникальным ID
  _.nIsHaveNetworkSaveWithId = function(uniqueSaveID) {
    return this.nGetNetworkSaveInfoWithId(uniqueSaveID) != null;
  };
  // * Получить данные сетвого сохранения по уникальному ID
  _.nGetNetworkSaveInfoWithId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index)) {
        if (file.nUniqueSaveID === uniqueSaveID) {
          return file;
        }
      }
    }
    return null;
  };
  // * Получить индекс файла сохранения по уникальнмоу ID
  // * Это нужно для загрузки правильного файла
  _.nGetNetworkSaveFileIdByUniqueId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index) && file.nUniqueSaveID === uniqueSaveID) {
        return index;
      }
    }
    return -1;
  };
  // * Методы различаются в MV и MZ
  _.nGetGlobalInfo = function() {
    if (KDCore.isMZ()) {
      return this._globalInfo;
    } else {
      return this.loadGlobalInfo();
    }
  };
  // * Методы различаются в MV и MZ
  _.nGetInfoForSavefileId = function(savefileId) {
    var info;
    if (KDCore.isMZ()) {
      info = DataManager.savefileInfo(savefileId);
    } else {
      info = DataManager.loadSavefileInfo(savefileId);
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Action.prototype;
  // * Задать действие из сети (т.е. из действия другого игрока)
  _.setFromNetwork = function(action) {
    var f;
    this.clear();
    this._nParseActionItem(action._item);
    for (f in action) {
      if (f === "_item") {
        // * пропускаем Game_Item, он уже сконвертирован
        continue;
      }
      this[f] = action[f];
    }
  };
  // * Класс Game_Item отдельно
  _._nParseActionItem = function(item) {
    var f;
    if (item == null) {
      return;
    }
    for (f in item) {
      this._item[f] = item[f];
    }
  };
})();

// ■ END Game_Action.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nCreateObserver();
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  _.nCreateObserver = function() {
    this.netDataObserver = new DataObserver();
    this.nFillObserver();
    // * Создаём после nFillObserver, чтобы не было в списке полей Observer
    this.isDataObserverHaveChanges = false;
    this.netDataObserver.refreshAll(this);
  };
  // * Тут применён автоматический сбор всех полей
  _.nFillObserver = function() {
    var entries, fields, i, len, value;
    fields = [];
    entries = Object.entries(this);
    for (i = 0, len = entries.length; i < len; i++) {
      value = entries[i];
      if (value[0] === 'netDataObserver') {
        // * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
        continue;
      }
      fields.push(value[0]);
    }
    this.netDataObserver.addFields(this, fields);
  };
  _.nUpdateObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.nDataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
  // * Ставится флаг в TRUE, и Battler сам отправить данные
  _.nDataObserverHaveChanges = function() {
    return this.isDataObserverHaveChanges = true;
  };
  _.getObserverDataForNetwork = function() {
    this.isDataObserverHaveChanges = false;
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(actorId) {
    ALIAS__setup.call(this, actorId);
    // * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
    if (ANNetwork.isConnected()) {
      this.refreshNetworkDummy = this.refreshNetwork;
      if (ANET.PP.playerActorNameType() > 0) {
        this.nSetupPlayerActorName();
      }
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshNetworkDummy();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  // * Данный персонаж - мой сетевой персонаж (текущего игрока)
  _.isMyNetworkActor = function() {
    if ($gameTemp._nLocalActorMode === true) {
      // * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
      // * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
      // * так как проверка через leader() обращается в Game_Actors, а ID всегда на
      // * своего персонажа (стоит Instance Mode, в этом ещё дело)
      // * Пока отключил передачу СВОИХ данных в режиме Local
      return false;
    }
    if ($gameParty.inBattle()) {
      return this.isMyNetworkBattler();
    } else {
      return this.actorId() === ANGameManager.myActorId();
    }
  };
  _.updateDataObserver = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this._updateDataObserver();
      } else {

      }
    } else {
      if (this.isMyNetworkActor()) {
        // * Если НЕ в бою, то проверка observer только свого персонажа
        // * Только приём данных
        this._updateDataObserver();
      }
    }
  };
  // * Отправка Observer только своего персонажа
  _.dataObserverHaveChanges = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this.requestNetBattleDataPush();
        // * Если только я в бою, то отправляю обычные данные
        // * Чтобы другие игроки видели HP и MP
        // TODO: Опция?
        if ($gameParty.isOneBattler()) {
          ANSyncDataManager.sendActorObserver();
        }
      }
    } else {
      // * Если не в бою, то только свои данные
      if (this.isMyNetworkActor()) {
        ANSyncDataManager.sendActorObserver();
      }
    }
  };
  
  //TODO: Может просто все все свойства передавать?
  // собрать их автоматически
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.ActorObserverFields);
  };
  //?{DYNAMIC}
  _.refreshNetworkDummy = function() {}; // * EMPTY
  _.refreshNetwork = function() {
    // * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
    // * Метод refresh вызывается ещё до того как Actor создан (класс)
    // * Принудительная отправка
    if (!$gameParty.inBattle()) {
      this.dataObserverHaveChanges();
    }
  };
  // * Установить заместо имени (никнейма) персонажа имя сетевого игрока
  _.nSetupPlayerActorName = function() {
    var playerData;
    // * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
    // * Данные других персонажей прийдут сами с Observer сразу
    if (this.actorId() !== ANGameManager.myActorId()) {
      return;
    }
    playerData = ANGameManager.myPlayerData();
    if (playerData == null) {
      return;
    }
    if (ANET.PP.playerActorNameType() === 1) {
      this._name = playerData.name;
    } else if (ANET.PP.playerActorNameType() === 2) {
      this._nickname = playerData.name;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actors.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__actor, _;
  //@[DEFINES]
  _ = Game_Actors.prototype;
  //TODO: Есть проблемы у этого способа! Надо больше тестов
  //TODO: Добавить дополнительные проверки, так как слишком опасно
  //@[ALIAS]
  ALIAS__actor = _.actor;
  _.actor = function(actorId) {
    // * Возвращять текущего персонажа для выборки в событии
    // * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1 (ОТМЕНА!)
    //TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
    //TODO: Временно убрал выборку только 1 актора
    if (ANNetwork.isConnected() && $gameTemp._nLocalActorMode === true) { //&& actorId == 1
      if ($gameTemp._nNetworkActorPickRequest === true) {
        $gameTemp._nNetworkActorPickRequest = false;
        return ALIAS__actor.call(this, actorId);
      } else {
        return this._data[ANGameManager.myActorId()];
      }
    } else {
      return ALIAS__actor.call(this, actorId);
    }
  };
})();

// ■ END Game_Actors.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onBattleEnd, ALIAS__onBattleStart, ALIAS__startDamagePopup, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nInitializeNetwork();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    if (ANNetwork.isConnected()) {
      this._nStartBattleObserver();
    }
    return ALIAS__onBattleStart.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this._nEndBattleObserver();
    }
  };
  // * Отдельная реализация, чтобы передавать battleResult
  //@[ALIAS]
  ALIAS__startDamagePopup = _.startDamagePopup;
  _.startDamagePopup = function() {
    if (ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()) {
      ANSyncDataManager.sendBattlerResultObserver(this);
      ANBattleManager.callBattleMethod(this, "startDamagePopup", null);
    }
    return ALIAS__startDamagePopup.call(this);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.nInitializeNetwork = function() {
    this._nRegisterSyncBattleMethod("requestEffect");
    this._nRegisterSyncBattleMethod("requestMotion");
    this._nRegisterSyncBattleMethod("startWeaponAnimation");
    this._nRegisterSyncBattleMethod("setActionState");
    // * Sound effects
    this._nRegisterSyncBattleMethod("performDamage");
    this._nRegisterSyncBattleMethod("performCollapse");
    this._nRegisterSyncBattleMethod("performMiss");
    this._nRegisterSyncBattleMethod("performRecovery");
    this._nRegisterSyncBattleMethod("performEvasion");
    this._nRegisterSyncBattleMethod("performMagicEvasion");
    this._nRegisterSyncBattleMethod("performCounter");
    this._nRegisterSyncBattleMethod("performReflection");
  };
  // * Данный баттлер является моим (этого сетевого игрока)
  _.isMyNetworkBattler = function() {
    if (ANNetwork.isConnected()) {
      return this === $gameParty.leader();
    } else {
      return true;
    }
  };
  // * Подписать метод на синхронизацию через сервер
  _._nRegisterSyncBattleMethod = function(methodName) {
    var alias;
    alias = this[methodName];
    this[methodName] = function() {
      if (ANNetwork.isConnected() && ANGameManager.isBattleMaster()) {
        // * В данной реализации передаётся только один аргумент, так как ... перед arguments
        ANBattleManager.callBattleMethod(this, methodName, ...arguments);
      }
      return alias.call(this, ...arguments);
    };
  };
  _.isNeedNetPushBattleData = function() {
    return this._netBattleObserverNeedToPush === true;
  };
  _.onNetBattleDataPushed = function() {
    return this._netBattleObserverNeedToPush = null;
  };
  _.requestNetBattleDataPush = function() {
    return this._netBattleObserverNeedToPush = true;
  };
  (function() {    // * Специальный Data Observer для боя
    // -----------------------------------------------------------------------
    // * Данные только для боя (эти данные передаёт только Battle Master)
    _._nStartBattleObserver = function() {
      // * Включаем Instance режим
      //@netDataObserver.setInstanteMode()
      this.netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate());
      this._addBattleFieldsToNetowrkDataObserver();
    };
    // * Добавляем дополнительные поля в Observer
    _._addBattleFieldsToNetowrkDataObserver = function() {
      this.netDataObserver.addFields(this, ANET.System.BattlerObserverFields);
    };
    // * После битвы нет необходимости хранить observer
    return _._nEndBattleObserver = function() {
      // * Возвращаем режим проверки
      this._applyDataObserverInitialParameters();
      // * Убираем добавленные для боя поля
      this.netDataObserver.removeFields(this, ANET.System.BattlerObserverFields);
    };
  })();
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__meetsItemConditions, ALIAS__onBattleEnd, ALIAS__onBattleStart, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    ALIAS__onBattleStart.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setCheckMode();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setInstanteMode();
    }
  };
  //TEMP
  //TODO: Временное решение, так как нет проверки кто именно
  // * Так как вещи другого игрока нет в инвентаре мастера боя, то
  // * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
  //@[ALIAS]
  ALIAS__meetsItemConditions = _.meetsItemConditions;
  _.meetsItemConditions = function(item) {
    if (ANNetwork.isConnected()) {
      return this.meetsUsableItemConditions(item);
    } else {
      return ALIAS__meetsItemConditions.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Специальное представление данных для сети
  _.packForNetwork = function() {
    return ANET.Utils.packBattlerForNetwork(this);
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this._applyDataObserverInitialParameters();
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    _._applyDataObserverInitialParameters = function() {
      // * Тут нужен Instante, чтобы данные на карте всегда были актуальны
      // * Если CheckMode, то при помощи событий можно менять параметры ХП
      // * всей группы и ХП других игроков будут отображаться не правильно
      this.netDataObserver.setInstanteMode();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    };
    //TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
    _._fillNetworkObserver = function() {
      this.netDataObserver.addFields(this, ["_hp", "_mp", "_tp", "_paramPlus", "_states", "_stateTurns", "_buffs", "_buffTurns"]);
    };
    //TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

    // * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANNetwork.isConnected()) {
      return this._updateDataObserver();
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    // * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = function() {
      return this.netDataObserver.addFields(this, ["_opacity", "_blendMode", "_walkAnime", "_stepAnime", "_directionFix", "_transparent", "_direction"]);
    };
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
  _.moveStraightFromServer = function(moveData) {
    // * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
    this.setMovementSuccess(true);
    this.setDirection(moveData.direction);
    this._x = moveData.x;
    this._y = moveData.y;
    this._realX = moveData.realX;
    this._realY = moveData.realY;
    // * Чтобы синхронизировать правильно бег
    this._moveSpeed = moveData.moveSpeed;
    this.increaseSteps();
  };
  _.getMoveDataForNetwork = function() {
    return {
      direction: this._direction,
      moveSpeed: this.realMoveSpeed(),
      x: this.x,
      y: this.y,
      realX: this._realX,
      realY: this._realY
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //TODO: Есть проблема, dead enemies не исчезают у второго игрока

  // * Дополнительные найстройки Observer для врагов
  _._addBattleFieldsToNetowrkDataObserver = function() {
    Game_Battler.prototype._addBattleFieldsToNetowrkDataObserver.call(this);
    // * Данные поля не нужны (наверное) врагам, так как не видно их полосу
    this.netDataObserver.removeFields(this, ["_tpbChargeTime"]);
  };
  // * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
  _.updateDataObserver = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this._updateDataObserver();
    }
  };
  _.dataObserverHaveChanges = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this.requestNetBattleDataPush();
    }
  };
  // * Добавляем свои поля
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.EnemyObserverFields);
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  (function() {    // * Синхронизация движения
    // -----------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__updateSelfMovement;
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveStraight.call(this, d);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            return ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        return ALIAS__moveStraight.call(this, d);
      }
    };
    
    //@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement;
    return _.updateSelfMovement = function() {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          return ALIAS__updateSelfMovement.call(this);
        } else {

        }
      } else {
        // * NOTHING
        // * Обновление движения события только на мастере карты
        return ALIAS__updateSelfMovement.call(this);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.dataObserverHaveChanges = function() {
    if (ANGameManager.isMapMaster()) {
      ANSyncDataManager.sendEventObserver(this.eventId());
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// * Если мы не отправляем данные Observer,
// * то check не будет работать, пока не сбросить флаг

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isSomeoneCollided, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Followers.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    if (ANNetwork.isConnected()) {
      return this._data = [];
    } else {
      // * Нет последователей! Используется другой класс
      return ALIAS__setup.call(this);
    }
  };
  
  // * Учёт коллизий с сетевыми игроками при движении событий
  // * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
  //@[ALIAS]
  ALIAS__isSomeoneCollided = _.isSomeoneCollided;
  _.isSomeoneCollided = function(x, y) {
    if (ANNetwork.isConnected()) {
      return $gameMap.netCharsIsSomeoneCollided(x, y);
    } else {
      return ALIAS__isSomeoneCollided.call(this, x, y);
    }
  };
})();

// ■ END Game_Followers.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  (function() {    // * Статус запуска события
    // -----------------------------------------------------------------------
    var ALIAS__clear, ALIAS__initialize, ALIAS__setup, ALIAS__update, ALIAS__updateWaitMode;
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(depth) {
      ALIAS__initialize.call(this, depth);
      this._nRunningCheckTimer = 0;
      // * Отключаем некоторые команды
      if (ANNetwork.isConnected()) {
        this.nDisableNotNetCommands();
      }
    };
    //@[ALIAS]
    ALIAS__setup = _.setup;
    _.setup = function(list, eventId) {
      ALIAS__setup.call(this, list, eventId);
      if (ANNetwork.isConnected()) {
        // * Сброс сетевой битвы, если началось другое событие
        BattleManager.nSetNetworkBattle(null);
        this.nCheckEventStartOptions();
        if (!this.isPassStartOptions()) { // * Проверка опций запуска события
          this._list = []; // * Не будет выполняться
        } else {
          ANInterpreterManager.sendEventStarted(eventId);
          if (this.nIsEventIsShared()) {
            this.nPrepareSharedEvent();
          }
          this.nClearFlags();
        }
      }
    };
    
    //@[ALIAS]
    ALIAS__clear = _.clear;
    _.clear = function() {
      ALIAS__clear.call(this);
      if (ANNetwork.isConnected()) {
        ANInterpreterManager.eventProcessExit();
        this.nClearFlags();
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (ANNetwork.isConnected()) {
        this._nRunningCheckTimer++;
        if (this._nRunningCheckTimer >= 60) {
          ANInterpreterManager.checkEventRunning();
          this._nRunningCheckTimer = 0;
        }
      }
    };
    //@[ALIAS]
    ALIAS__updateWaitMode = _.updateWaitMode;
    return _.updateWaitMode = function() {
      if (this._waitMode === 'netPlayersPool') {
        return this.nUpdateWaitPlayersPool();
      } else if (this._waitMode === 'netNextCommand') {
        return this.nUpdateWaitServerNextCommandPermission();
      } else {
        return ALIAS__updateWaitMode.call(this);
      }
    };
  })();
  (function() {    // * Выполнение команд в сети
    // -----------------------------------------------------------------------
    var ALIAS__command108;
    //@[ALIAS, STORED]
    _.ALIAS__executeCommand = _.executeCommand;
    _.executeCommand = function() {
      if (ANNetwork.isConnected()) {
        if (this.nIsOptionsForCurrentCommand()) {
          return this.nProcessCommandWithOptions();
        }
      }
      return _.ALIAS__executeCommand.call(this);
    };
    //TODO: MV
    //@[ALIAS]
    ALIAS__command108 = _.command108;
    return _.command108 = function(params) {
      if (ANNetwork.isConnected()) {
        if (KDCore.isMV()) {
          params = this._params;
        }
        // * Проверить комментарий на наличие NET команд
        this._nCheckNetComment(params[0]);
      }
      return ALIAS__command108.call(this, params);
    };
  })();
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x4e2c=['code','choicesForMaster','Master','1AAXjou','1LVbefx','rhGUx','epoZj','contains','nIsLockedEvent','length','actorList','nDisableNotNetCommands','24764UIuIIc','All','_list','_nProcessCommandForActorsList','eventId','forActors','wait','hAkMO','_nCommandOptionsRequested','AhgPj','kagCq','nCommandStartOptions','126sshCeZ','all','gIror','VTMWB','nProcessCommandWithOptions','1520264fEoPGv','yzxOI','_nOnNetCommand_SingleSelectorEventCommand','aFMAv','mtUwm','cMCRy','isHaveNetworkStartOptions','_nProcessCommandForAll','Me\x20Except','_nOnNetCommand_ActorListSelectorEventCommand','_nProcessCommandForMaster','suQVv','nCheckEventStartOptionsFromCommentCommand','WYaSH','9QsDtKx','true','nClearCommandOptions','sendEventVirtualCommand','tmbZS','find','N\x20choicesForMaster\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','nIsHaveCommandOptions','1225803QsGfIw','isPassEventFilterOptions','zsYgm','nSetNetworkBattle','nRequestMasterOnlyChoicesModeForNextChoice','parameters','VnXnU','_nSharedEventOuterStartFlag','_nSendCommandToServer','ruUJP','call','_nLocalActorMode','EventStartOptions','nStartOptions','!me','localActor','ForbiddenVirtualCommandsList','_index','isPassStartOptions','Master\x20Except','Utils','_nOnNetCommand_LocalActor','nCheckEventStartOptions','1apNVNd','qUUPB','start','_nSkipCommand','currentCommand','warn','isEventStartedByAny','YCYqb','209894wcHKqK','!master','ALIAS__executeCommand','582273qjiCfn','isMasterClient','command','System','master','qSjTZ','any','_nProcessCommandNotMe','Unknown\x20NET\x20Comment\x20command\x20','YoCbq','Suapu','9731PaPbuv','Actor\x20List','EGCCV','609133hekPtS','IrfdO','lockMode','Actor\x20List\x20Except','N\x20wait\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','isMyActorInValidListToStart','fOQBN','_nCheckNetComment','UzUqN','ncsXr','tTkvI','isSharedEventIsRunning'];function a0_0x4aec(_0x5e051d,_0x4598df){_0x5e051d=_0x5e051d-0x1f4;var _0x4e2cf1=a0_0x4e2c[_0x5e051d];return _0x4e2cf1;}(function(_0x46c386,_0x4543da){var _0x53a982=a0_0x4aec;while(!![]){try{var _0x5f4f00=-parseInt(_0x53a982(0x208))*parseInt(_0x53a982(0x229))+parseInt(_0x53a982(0x228))*parseInt(_0x53a982(0x258))+-parseInt(_0x53a982(0x20b))+-parseInt(_0x53a982(0x200))*-parseInt(_0x53a982(0x219))+-parseInt(_0x53a982(0x216))*-parseInt(_0x53a982(0x23d))+parseInt(_0x53a982(0x250))*parseInt(_0x53a982(0x231))+-parseInt(_0x53a982(0x242));if(_0x5f4f00===_0x4543da)break;else _0x46c386['push'](_0x46c386['shift']());}catch(_0x3a7471){_0x46c386['push'](_0x46c386['shift']());}}}(a0_0x4e2c,0xed2df),function(){var _0x3ca9=a0_0x4aec,_0x5ea998;_0x5ea998=Game_Interpreter['prototype'],_0x5ea998[_0x3ca9(0x230)]=function(){var _0x2fd156=_0x3ca9;if(_0x2fd156(0x23f)!==_0x2fd156(0x23b)){var _0x1fe24d,_0x4a4f30,_0xec7dc2,_0xd80df0,_0x4ceaec;_0x4a4f30=function(){var _0x37e66f=_0x2fd156;return _0x5ea998[_0x37e66f(0x20d)+_0x1fe24d]=function(){return!![];};},_0x4ceaec=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0xec7dc2=0x0,_0xd80df0=_0x4ceaec[_0x2fd156(0x22e)];_0xec7dc2<_0xd80df0;_0xec7dc2++){_0x1fe24d=_0x4ceaec[_0xec7dc2],_0x4a4f30(_0x1fe24d);}}else{function _0x9f9cd7(){var _0x5f0813=_0x2fd156;if(_0x381815['Utils'][_0x5f0813(0x206)](this[_0x5f0813(0x235)]()))return![];}}},_0x5ea998[_0x3ca9(0x257)]=function(){var _0x5303b8=_0x3ca9;return this['_nCommandOptionsRequested']===!![]&&this[_0x5303b8(0x23c)]!=null;},_0x5ea998[_0x3ca9(0x252)]=function(){var _0x1cbd7f=_0x3ca9;if(_0x1cbd7f(0x223)===_0x1cbd7f(0x207)){function _0x37f9c8(){var _0x5fbd32=_0x1cbd7f;return this['_nSendCommandToServer'](),this[_0x5fbd32(0x203)]();}}else return this[_0x1cbd7f(0x239)]=![],this[_0x1cbd7f(0x23c)]=null;},_0x5ea998['nSetCommandOptions']=function(_0x2a538c){var _0x14823f=_0x3ca9;if('kFejs'==='kFejs')return this['nCommandStartOptions']=_0x2a538c,this[_0x14823f(0x239)]=!![];else{function _0x451de6(){return!![];}}},_0x5ea998['nIsOptionsForCurrentCommand']=function(){var _0x5e1b38=_0x3ca9;if('epoZj'===_0x5e1b38(0x22b)){if(!this['nIsHaveCommandOptions']()){if(_0x5e1b38(0x25e)===_0x5e1b38(0x22a)){function _0xe93391(){var _0x2acbb2=_0x5e1b38;if(!this[_0x2acbb2(0x248)]())return!![];if(this['nIsLockedEvent']()){if(_0xc3381[_0x2acbb2(0x1fd)][_0x2acbb2(0x206)](this[_0x2acbb2(0x235)]()))return![];}return _0x145247[_0x2acbb2(0x1fd)][_0x2acbb2(0x259)](this[_0x2acbb2(0x1f6)]);}}else return![];}if(ANET[_0x5e1b38(0x20e)][_0x5e1b38(0x1f9)][_0x5e1b38(0x22c)](this[_0x5e1b38(0x204)]()[_0x5e1b38(0x225)])){if(_0x5e1b38(0x246)===_0x5e1b38(0x246))return![];else{function _0x477b25(){var _0x2420d6,_0x5e3ba2,_0x310abe,_0x4d031f,_0x1cc736;_0x5e3ba2=function(){var _0x2ec5c2=a0_0x4aec;return _0xf5446c[_0x2ec5c2(0x20d)+_0x2420d6]=function(){return!![];};},_0x1cc736=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0x310abe=0x0,_0x4d031f=_0x1cc736['length'];_0x310abe<_0x4d031f;_0x310abe++){_0x2420d6=_0x1cc736[_0x310abe],_0x5e3ba2(_0x2420d6);}}}}return!![];}else{function _0x4fbe66(){var _0x465ff0=_0x5e1b38;return _0x389b2f[_0x465ff0(0x20a)][_0x465ff0(0x262)](this);}}},_0x5ea998[_0x3ca9(0x241)]=function(){var _0x3d394a=_0x3ca9;if(_0x3d394a(0x214)===_0x3d394a(0x214)){var _0xc7fee3;try{this[_0x3d394a(0x239)]=![];switch(this[_0x3d394a(0x23c)]['whoSelector']){case'All':return this[_0x3d394a(0x249)]();case _0x3d394a(0x227):return this['_nProcessCommandForMaster'](!![]);case'Master\x20Except':return this['_nProcessCommandForMaster'](![]);case _0x3d394a(0x217):return this[_0x3d394a(0x234)](!![]);case'Actor\x20List\x20Except':return this['_nProcessCommandForActorsList'](![]);case'Me\x20Except':return this[_0x3d394a(0x212)]();}}catch(_0x58d1be){_0xc7fee3=_0x58d1be,ANET['w'](_0xc7fee3);}return _0x5ea998[_0x3d394a(0x20a)]['call'](this);}else{function _0x5a6339(){var _0x179e01=_0x3d394a;_0x1a9af2[_0x179e01(0x253)](this['currentCommand'](),this[_0x179e01(0x23c)],this[_0x179e01(0x235)]());}}},_0x5ea998[_0x3ca9(0x249)]=function(){var _0x4dc592=_0x3ca9;return this[_0x4dc592(0x260)](),_0x5ea998['ALIAS__executeCommand'][_0x4dc592(0x262)](this);},_0x5ea998[_0x3ca9(0x24c)]=function(_0xab8609){var _0x2ae4ba=_0x3ca9;if(_0x2ae4ba(0x254)===_0x2ae4ba(0x23a)){function _0x4e0c54(){var _0x1b764b=_0x2ae4ba;return this[_0x1b764b(0x260)](),_0x19c8bc[_0x1b764b(0x1fd)][_0x1b764b(0x21e)](this[_0x1b764b(0x23c)][_0x1b764b(0x22f)],_0x4bb1a0)?_0x5edd5e['ALIAS__executeCommand'][_0x1b764b(0x262)](this):this['_nSkipCommand']();}}else return ANNetwork[_0x2ae4ba(0x20c)]()===_0xab8609?_0x5ea998[_0x2ae4ba(0x20a)][_0x2ae4ba(0x262)](this):(this[_0x2ae4ba(0x260)](),this[_0x2ae4ba(0x203)]());},_0x5ea998[_0x3ca9(0x234)]=function(_0x512365){var _0x47d065=_0x3ca9;if('yzxOI'===_0x47d065(0x243))return this[_0x47d065(0x260)](),ANET[_0x47d065(0x1fd)][_0x47d065(0x21e)](this[_0x47d065(0x23c)][_0x47d065(0x22f)],_0x512365)?_0x5ea998[_0x47d065(0x20a)][_0x47d065(0x262)](this):this[_0x47d065(0x203)]();else{function _0x34329b(){return!![];}}},_0x5ea998[_0x3ca9(0x212)]=function(){var _0x3c7c93=_0x3ca9;return this[_0x3c7c93(0x260)](),this[_0x3c7c93(0x203)]();},_0x5ea998[_0x3ca9(0x203)]=function(){var _0x20d7a8=_0x3ca9;if(_0x20d7a8(0x261)===_0x20d7a8(0x261))return this[_0x20d7a8(0x1fa)]++,this[_0x20d7a8(0x252)](),!![];else{function _0x46ba46(){_0x3ab2ad=_0x2ee557,_0xcc32ae['w'](_0x4515c4);}}},_0x5ea998[_0x3ca9(0x260)]=function(){var _0x15b2ac=_0x3ca9;ANInterpreterManager[_0x15b2ac(0x253)](this[_0x15b2ac(0x204)](),this[_0x15b2ac(0x23c)],this[_0x15b2ac(0x235)]());},_0x5ea998[_0x3ca9(0x220)]=function(_0x47817b){var _0x1543d5=_0x3ca9,_0x962379;_0x962379=ANET[_0x1543d5(0x1fd)]['getNetCommentCommand'](_0x47817b);if(!String[_0x1543d5(0x211)](_0x962379)){if(_0x1543d5(0x215)!==_0x1543d5(0x222))return;else{function _0x164f7a(){var _0x1eca5a=_0x1543d5,_0x51c093;return this[_0x1eca5a(0x235)]()>0x0&&((_0x51c093=this['nStartOptions'])!=null?_0x51c093[_0x1eca5a(0x21b)]:void 0x0)===_0x1eca5a(0x251);}}}switch(_0x962379){case _0x1543d5(0x1f8):this[_0x1543d5(0x1fe)](_0x47817b);break;case _0x1543d5(0x23e):this['_nOnNetCommand_SingleSelectorEventCommand'](_0x1543d5(0x232),_0x47817b);break;case _0x1543d5(0x1f7):this[_0x1543d5(0x244)](_0x1543d5(0x24a),_0x47817b);break;case _0x1543d5(0x20f):this[_0x1543d5(0x244)](_0x1543d5(0x227),_0x47817b);break;case _0x1543d5(0x209):this[_0x1543d5(0x244)]('Master\x20Except',_0x47817b);break;case _0x1543d5(0x236):this[_0x1543d5(0x24b)](_0x47817b,!![]);break;case'!forActors':this[_0x1543d5(0x24b)](_0x47817b,![]);break;case _0x1543d5(0x237):if(ANInterpreterManager[_0x1543d5(0x224)]()){if(_0x1543d5(0x24f)!=='WYaSH'){function _0x440b2e(){return![];}}else this['nRequestSyncedNextEventCommand']();}else{if(_0x1543d5(0x247)!=='gdQRa')console[_0x1543d5(0x205)](_0x1543d5(0x21d));else{function _0x3f97f0(){var _0x5a24ff=_0x1543d5,_0x4b750e;try{this[_0x5a24ff(0x239)]=![];switch(this[_0x5a24ff(0x23c)]['whoSelector']){case _0x5a24ff(0x232):return this[_0x5a24ff(0x249)]();case _0x5a24ff(0x227):return this['_nProcessCommandForMaster'](!![]);case _0x5a24ff(0x1fc):return this['_nProcessCommandForMaster'](![]);case'Actor\x20List':return this[_0x5a24ff(0x234)](!![]);case _0x5a24ff(0x21c):return this[_0x5a24ff(0x234)](![]);case _0x5a24ff(0x24a):return this['_nProcessCommandNotMe']();}}catch(_0x58f961){_0x4b750e=_0x58f961,_0x5bc0e4['w'](_0x4b750e);}return _0x53cac6[_0x5a24ff(0x20a)]['call'](this);}}}break;case _0x1543d5(0x226):ANInterpreterManager[_0x1543d5(0x224)]()?this[_0x1543d5(0x25c)]():console[_0x1543d5(0x205)](_0x1543d5(0x256));break;case _0x1543d5(0x202):break;default:console[_0x1543d5(0x205)](_0x1543d5(0x213)+_0x962379);}},_0x5ea998['nSetSharedBattle']=function(_0x4a521b){var _0x2fa00d=_0x3ca9;!String[_0x2fa00d(0x211)](_0x4a521b)&&(_0x4a521b=null),BattleManager[_0x2fa00d(0x25b)](_0x4a521b);},_0x5ea998['nClearFlags']=function(){var _0xd083eb=_0x3ca9;if(_0xd083eb(0x25a)!==_0xd083eb(0x201))$gameTemp[_0xd083eb(0x1f4)]=![],this['_nRunningCheckTimer']=0x0,this[_0xd083eb(0x252)]();else{function _0x54b0e3(){var _0xeae048=_0xd083eb;return _0x4b6c22[_0xeae048(0x20a)][_0xeae048(0x262)](this);}}},function(){var _0x5b8493=_0x3ca9;if(_0x5b8493(0x21a)!==_0x5b8493(0x238))return _0x5ea998[_0x5b8493(0x248)]=function(){var _0x12df8d=_0x5b8493;return this[_0x12df8d(0x1f6)]!=null;},_0x5ea998[_0x5b8493(0x1fb)]=function(){var _0x362583=_0x5b8493;if(this['nIsEventIsShared']()&&$gameTemp[_0x362583(0x25f)]===!![])return!![];else{if('VTMWB'===_0x362583(0x240)){if(!this[_0x362583(0x248)]()){if('kzXeD'!=='kzXeD'){function _0x534eb5(){var _0x2c8d31=_0x362583;!_0x47252d[_0x2c8d31(0x211)](_0x24bc38)&&(_0x54e4e5=null),_0x4f694f[_0x2c8d31(0x25b)](_0x3ce606);}}else return!![];}if(this[_0x362583(0x22d)]()){if(ANET[_0x362583(0x1fd)][_0x362583(0x206)](this[_0x362583(0x235)]())){if('jcTyv'==='BeTjC'){function _0x44869a(){var _0x123216=_0x362583;return this[_0x123216(0x23c)]=_0xbbe720,this[_0x123216(0x239)]=!![];}}else return![];}}return ANET['Utils'][_0x362583(0x259)](this[_0x362583(0x1f6)]);}else{function _0x1f7154(){return this['_nCommandOptionsRequested']===!![]&&this['nCommandStartOptions']!=null;}}}},_0x5ea998[_0x5b8493(0x22d)]=function(){var _0x5ed6a8=_0x5b8493,_0x3d52cd;return this[_0x5ed6a8(0x235)]()>0x0&&((_0x3d52cd=this[_0x5ed6a8(0x1f6)])!=null?_0x3d52cd[_0x5ed6a8(0x21b)]:void 0x0)===_0x5ed6a8(0x251);},_0x5ea998[_0x5b8493(0x1ff)]=function(){var _0x3a5c76=_0x5b8493;if(_0x3a5c76(0x245)!==_0x3a5c76(0x21f)){var _0xdb0ed,_0x5e91c5,_0x57f6a2;this[_0x3a5c76(0x1f6)]=null;try{_0x5e91c5=(_0x57f6a2=this[_0x3a5c76(0x233)])!=null?_0x57f6a2[_0x3a5c76(0x255)](function(_0x20af80){var _0x1bfa8f=_0x3a5c76;if(_0x1bfa8f(0x24d)!==_0x1bfa8f(0x218)){var _0x47c5b2;return _0x20af80[_0x1bfa8f(0x225)]===0x165&&((_0x47c5b2=_0x20af80[_0x1bfa8f(0x25d)])!=null?_0x47c5b2[0x1]:void 0x0)===_0x1bfa8f(0x1f5);}else{function _0x5dfb5b(){return![];}}}):void 0x0,_0x5e91c5!=null?this[_0x3a5c76(0x1f6)]=_0x5e91c5[_0x3a5c76(0x25d)][0x3]:this[_0x3a5c76(0x24e)]();}catch(_0x3600fa){if(_0x3a5c76(0x210)!==_0x3a5c76(0x221))_0xdb0ed=_0x3600fa,ANET['w'](_0xdb0ed),this['nStartOptions']=null;else{function _0x121eea(){var _0x3cb66f=_0x3a5c76;_0x2f996f=_0x37214e,_0x5b51a1['w'](_0x3fadfe),this[_0x3cb66f(0x1f6)]=null;}}}}else{function _0x486a54(){var _0x378e64=_0x3a5c76;return this[_0x378e64(0x239)]=![],this[_0x378e64(0x23c)]=null;}}};else{function _0x35c0fb(){var _0x4b76b9=_0x5b8493;return this['_nSendCommandToServer'](),this[_0x4b76b9(0x203)]();}}}();}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * Обработка комманд из комментариев (алтернатива командам плагинов)

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //input: "N localActor" | "N localActor end"
  _._nOnNetCommand_LocalActor = function(commentLine) {
    if (commentLine.contains("end")) {
      $gameTemp._nLocalActorMode = false;
    } else {
      $gameTemp._nLocalActorMode = true;
    }
  };
  
  //input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
  //selcetor: all, !me, master, !master
  //scope: world, mode: virtual
  _._nOnNetCommand_SingleSelectorEventCommand = function(selector, commentLine) {
    var mode, scope;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    this._nSetAnyEventCommandOptions(selector, "[]", scope, mode);
  };
  // * Установить опции команды события для следующей комманды
  _._nSetAnyEventCommandOptions = function(selector, list, scope, mode) {
    var options;
    if (!String.any(scope)) {
      // * Стандартные значения из команды плагина
      scope = "Same map";
    }
    if (!String.any(mode)) {
      mode = "Auto";
    }
    options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode);
    this.nSetCommandOptions(options);
  };
  _._nOnNetCommand_ActorListSelectorEventCommand = function(commentLine, isInclude) {
    var list, mode, scope, selector;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    list = ANET.Utils.extractActorsListFromComment(commentLine);
    selector = "Actor List";
    if (!isInclude) {
      selector += " Except";
    }
    this._nSetAnyEventCommandOptions(selector, list, scope, mode);
  };
  // * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
  _.nCheckEventStartOptionsFromCommentCommand = function() {
    var commentLine;
    if (this._list == null) {
      return;
    }
    commentLine = KDCore.Utils.getEventCommentValue("N start", this._list);
    if (commentLine == null) {
      return;
    }
    this.nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine);
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x4c55=['lxkBr','nIsSharedEventCanBeForceCancelled','isReady','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!','showWaitPlayersOnSharedEvent','QIoKg','18187xiHdEM','361303SaPOIm','121826nqfvMB','43086jKcUZb','onAnswer','nSyncWaitCommandData','nIsEventIsShared','OUUTER\x20START','register','DsXBQ','nRequestSyncedNextEventCommand','sendSharedEventRegisteredDone','nClearSharedSyncEventCommandWait','forceCancelSharedEvent','1zNKhFV','terminate','gpaeZ','nOnSyncedEventCommandResponse','147LTzVwn','nUpdateWaitServerNextCommandPermission','update','nPlayerPool','mnzSr','1nCPliE','187441WUbNnW','3HCAdwl','aZydJ','rNsAv','VtrWO','_indent','FelWl','DtXpj','_nSharedEventOuterStartFlag','_waitMode','VlCjS','Strict','nAllowContinueSharedEvent','setupSharedInterpreter','nIsEventIsSharedAndStrict','sendSharedEventReadyToContinue','DnIXl','nStartOptions','resetSharedEvent','sharedMode','isSharedEventMaster','379Whadoz','UfMez','clear','PREPARE\x20SHARED\x20MOD','uQegH','nUpdateWaitPlayersPool','KLXGa','jJQKE','WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND','indent','START\x20POOL','prototype','nSetWaitStartNextCommandFromServer','xuUob','isHaveNetworkStartOptions','contains','nSetWaitPlayerPool','hhnfX','PkXEx','netNextCommand','_canContinueSharedEvent','PLAYER\x20ANSWER\x20','167kiwFfw','Shared\x20Event\x20Choices\x20in\x20Master\x20only\x20mode','nIsSharedEventWaitPoolCancelled','_nRepeatAnswerToServerTimer','_eventId','reset','_shouldForceExitSharedEvent','isSinglePool','nRequireChoiceOnlyForMaster','PgvAu','CAN\x20PROCESS\x20TO\x20NEXT\x20COMMAND','index','netPlayersPool','tFBse','nRequestMasterOnlyChoicesModeForNextChoice','157RwGduw','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY'];function a0_0x1186(_0x34771d,_0x41727a){_0x34771d=_0x34771d-0x81;var _0x4c5587=a0_0x4c55[_0x34771d];return _0x4c5587;}(function(_0x516425,_0x482346){var _0x691b8a=a0_0x1186;while(!![]){try{var _0x4e56e5=parseInt(_0x691b8a(0x89))*-parseInt(_0x691b8a(0x8a))+-parseInt(_0x691b8a(0x9f))*parseInt(_0x691b8a(0x84))+-parseInt(_0x691b8a(0xcf))+parseInt(_0x691b8a(0xb5))*-parseInt(_0x691b8a(0xc4))+parseInt(_0x691b8a(0xda))*parseInt(_0x691b8a(0xce))+-parseInt(_0x691b8a(0xcc))*parseInt(_0x691b8a(0x8b))+parseInt(_0x691b8a(0xcd));if(_0x4e56e5===_0x482346)break;else _0x516425['push'](_0x516425['shift']());}catch(_0x1f3dbf){_0x516425['push'](_0x516425['shift']());}}}(a0_0x4c55,0x1c58d),function(){var _0x3a6a47=a0_0x1186,_0x2be1f7;_0x2be1f7=Game_Interpreter[_0x3a6a47(0xaa)],_0x2be1f7[_0x3a6a47(0xd2)]=function(){var _0x5c8695=_0x3a6a47,_0x42b437;try{return this[_0x5c8695(0xad)]()&&this['nStartOptions']['sharedMode']!=='No';}catch(_0x323461){if(_0x5c8695(0xac)!==_0x5c8695(0xd5))return _0x42b437=_0x323461,ANET['w'](_0x42b437),![];else{function _0x3bb561(){var _0x37edbe=_0x5c8695;this[_0x37edbe(0x87)]=null,_0x13ac54[_0x37edbe(0x97)](this,!![]),this[_0x37edbe(0xd6)]();}}}},_0x2be1f7[_0x3a6a47(0x98)]=function(){var _0x487201=_0x3a6a47,_0x37cc0d,_0x12af6b;try{if('ZHuGe'===_0x487201(0xb0)){function _0x1d19c2(){var _0x48bcaf=_0x487201;this[_0x48bcaf(0xb3)]=![],_0x726c5b[_0x48bcaf(0xd7)](),'WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND'['p'](),this['_nRepeatAnswerToServerTimer']=0x3c,this[_0x48bcaf(0x93)]=_0x48bcaf(0xb2);}}else return this[_0x487201(0xd2)]()&&((_0x12af6b=this[_0x487201(0x9b)][_0x487201(0x9d)])!=null?_0x12af6b['contains']('Strict'):void 0x0);}catch(_0x5af5de){if(_0x487201(0x88)==='mnzSr')return _0x37cc0d=_0x5af5de,ANET['w'](_0x37cc0d),![];else{function _0x5b34b2(){return _0x17dd5a=_0x4e16df,_0x5c7f7b['w'](_0x4eef43),![];}}}},_0x2be1f7['nIsSharedEventCanBeForceCancelled']=function(){var _0x5913c0=_0x3a6a47;return!this[_0x5913c0(0x98)]()&&this[_0x5913c0(0xd1)][_0x5913c0(0xc0)]===0x0;},_0x2be1f7['nPrepareSharedEvent']=function(){var _0x2fa0a3=_0x3a6a47;if(_0x2fa0a3(0xb1)===_0x2fa0a3(0xb1))ANInterpreterManager[_0x2fa0a3(0x9c)](),'PREPARE\x20SHARED\x20MOD'['p'](this['_eventId']),$gameTemp['_nSharedEventOuterStartFlag']==null?(this['nPlayerPool']=null,ANInterpreterManager[_0x2fa0a3(0x97)](this,!![]),this[_0x2fa0a3(0xd6)]()):(_0x2fa0a3(0xd3)['p'](),$gameTemp[_0x2fa0a3(0x92)]=null,ANInterpreterManager[_0x2fa0a3(0x97)](this,![]),this[_0x2fa0a3(0xd6)]());else{function _0x26004e(){var _0x5d0afd=_0x2fa0a3;if(!this[_0x5d0afd(0xc7)]())return;if(_0x1fa1ed['isCancel']())return _0x4348fe[_0x5d0afd(0xa1)](),_0xa843e9['forceCancelSharedEvent'](),this[_0x5d0afd(0x81)](),!![];}}},_0x2be1f7['nIsSharedEventWaitPoolCancelled']=function(){var _0x70419c=_0x3a6a47,_0x32bfcc;try{if(!this[_0x70419c(0xc7)]())return;if(Input['isCancel']()){if(_0x70419c(0xa5)===_0x70419c(0xa5))return Input[_0x70419c(0xa1)](),ANInterpreterManager[_0x70419c(0xd9)](),this['terminate'](),!![];else{function _0x472a04(){var _0x713171=_0x70419c;this[_0x713171(0xb8)]--,this[_0x713171(0xb8)]===0x0&&this['nSetWaitStartNextCommandFromServer']();}}}}catch(_0x747b9d){_0x32bfcc=_0x747b9d,ANET['w'](_0x32bfcc);}return![];},_0x2be1f7[_0x3a6a47(0xd6)]=function(){var _0x543399=_0x3a6a47;if(_0x543399(0x9a)!==_0x543399(0x8e)){this[_0x543399(0xd1)]={'index':this['_index'],'indent':this[_0x543399(0x8f)]};if(ANInterpreterManager[_0x543399(0x9e)]()){if(_0x543399(0xc6)!==_0x543399(0xc6)){function _0x2b36e0(){var _0x3040b0=_0x543399;if(this[_0x3040b0(0xd1)]==null)return;if(this['nPlayerPool']==null)return;if(this[_0x3040b0(0xd1)][_0x3040b0(0xc0)]===_0x1fb007&&this[_0x3040b0(0xd1)][_0x3040b0(0xa8)]===_0x5b5cdc)return'PLAYER\x20ANSWER\x20'['p'](_0x5e30cf),this[_0x3040b0(0x87)]['onAnswer'](_0x28a580);}}else this[_0x543399(0xaf)]();}else this[_0x543399(0xab)]();ANInterpreterManager[_0x543399(0xca)]();}else{function _0x4e3fa2(){var _0x4dce1c=_0x543399;return this['isHaveNetworkStartOptions']()&&this[_0x4dce1c(0x9b)][_0x4dce1c(0x9d)]!=='No';}}},_0x2be1f7[_0x3a6a47(0x83)]=function(_0x4fd6c1,_0x214f45,_0xa281de){var _0x14444b=_0x3a6a47;if(_0x14444b(0xa0)===_0x14444b(0xa0)){var _0x585f70;try{if(this['nSyncWaitCommandData']==null)return;if(this['nPlayerPool']==null)return;if(this[_0x14444b(0xd1)]['index']===_0x4fd6c1&&this['nSyncWaitCommandData'][_0x14444b(0xa8)]===_0x214f45)return _0x14444b(0xb4)['p'](_0xa281de),this[_0x14444b(0x87)][_0x14444b(0xd0)](_0xa281de);}catch(_0x4ab0fc){_0x585f70=_0x4ab0fc,ANET['w'](_0x585f70);}}else{function _0x2bae21(){var _0x27b321=_0x14444b;_0x27b321(0xa9)['p'](),this[_0x27b321(0x87)]==null?this['nPlayerPool']=new _0x2e8a5c():this['nPlayerPool']['reset'](),this[_0x27b321(0x87)]['register'](),this[_0x27b321(0x93)]=_0x27b321(0xc1);}}},_0x2be1f7[_0x3a6a47(0xaf)]=function(){var _0x210dab=_0x3a6a47;_0x210dab(0xa9)['p']();if(this[_0x210dab(0x87)]==null){if(_0x210dab(0x94)===_0x210dab(0x94))this[_0x210dab(0x87)]=new PlayersWaitPool();else{function _0x56b196(){var _0x3e24fe=_0x210dab;this[_0x3e24fe(0xd1)]=null;}}}else{if(_0x210dab(0x8d)===_0x210dab(0x91)){function _0x4a6310(){var _0x3329fa=_0x210dab;return!this[_0x3329fa(0x98)]()&&this[_0x3329fa(0xd1)][_0x3329fa(0xc0)]===0x0;}}else this[_0x210dab(0x87)][_0x210dab(0xba)]();}this[_0x210dab(0x87)][_0x210dab(0xd4)](),this[_0x210dab(0x93)]=_0x210dab(0xc1);},_0x2be1f7[_0x3a6a47(0xa4)]=function(){var _0x3dea68=_0x3a6a47,_0x5016ab;this[_0x3dea68(0x87)][_0x3dea68(0x86)]();if(this[_0x3dea68(0xb7)]()){if('Pqehn'!==_0x3dea68(0xa3))return _0x3dea68(0xc9)['p'](),!![];else{function _0x55aecb(){return _0x258eee=_0x2143aa,_0x1f83fd['w'](_0x270688),![];}}}_0x5016ab=!this[_0x3dea68(0x87)][_0x3dea68(0xc8)]();if(!_0x5016ab){if(_0x3dea68(0xc2)===_0x3dea68(0x82)){function _0x3daf16(){var _0xdc2a7b=_0x3dea68,_0x59fb4f;this[_0xdc2a7b(0x87)][_0xdc2a7b(0x86)]();if(this['nIsSharedEventWaitPoolCancelled']())return'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!'['p'](),!![];return _0x59fb4f=!this[_0xdc2a7b(0x87)][_0xdc2a7b(0xc8)](),!_0x59fb4f&&(_0xdc2a7b(0xc5)['p'](),_0x4eca36[_0xdc2a7b(0x99)](),_0x208c51['hideWaitPlayersOnSharedEvent'](),this[_0xdc2a7b(0xd8)](),this['_waitMode']=''),_0x59fb4f;}}else'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY'['p'](),ANInterpreterManager[_0x3dea68(0x99)](),ANInterpreterManager['hideWaitPlayersOnSharedEvent'](),this[_0x3dea68(0xd8)](),this[_0x3dea68(0x93)]='';}return _0x5016ab;},_0x2be1f7['nClearSharedSyncEventCommandWait']=function(){var _0x1fadc0=_0x3a6a47;this[_0x1fadc0(0xd1)]=null;},_0x2be1f7[_0x3a6a47(0xab)]=function(){var _0x30e309=_0x3a6a47;this[_0x30e309(0xb3)]=![],ANInterpreterManager[_0x30e309(0xd7)](),_0x30e309(0xa7)['p'](),this[_0x30e309(0xb8)]=0x3c,this[_0x30e309(0x93)]=_0x30e309(0xb2);},_0x2be1f7[_0x3a6a47(0x85)]=function(){var _0x270128=_0x3a6a47,_0x500c66;if($gameTemp[_0x270128(0xbb)]===!![])return this[_0x270128(0x81)](),!![];_0x500c66=!this[_0x270128(0xb3)];if(!_0x500c66){if(_0x270128(0xa6)===_0x270128(0xcb)){function _0xab7e92(){return;}}else _0x270128(0xbf)['p'](),this[_0x270128(0x93)]='';}else{if(_0x270128(0x8c)!==_0x270128(0x8c)){function _0x241b85(){var _0x332728=_0x270128;this['nSyncWaitCommandData']={'index':this['_index'],'indent':this[_0x332728(0x8f)]},_0x550c45['isSharedEventMaster']()?this[_0x332728(0xaf)]():this[_0x332728(0xab)](),_0x6f8c4b[_0x332728(0xca)]();}}else{if(this['_nRepeatAnswerToServerTimer']>=0x0){this[_0x270128(0xb8)]--;if(this[_0x270128(0xb8)]===0x0){if('iKOtV'===_0x270128(0x90)){function _0x17fb56(){return;}}else this[_0x270128(0xab)]();}}}}return!![];},_0x2be1f7[_0x3a6a47(0x96)]=function(){var _0x258b3e=_0x3a6a47;if(this[_0x258b3e(0x93)]!==_0x258b3e(0xb2)){if('QIqQs'==='QIqQs')return;else{function _0x534da5(){var _0x292632=_0x258b3e;_0x320b3a[_0x292632(0x9c)](),_0x292632(0xa2)['p'](this[_0x292632(0xb9)]),_0x2510d8[_0x292632(0x92)]==null?(this['nPlayerPool']=null,_0x2ea131['setupSharedInterpreter'](this,!![]),this[_0x292632(0xd6)]()):(_0x292632(0xd3)['p'](),_0x24e244[_0x292632(0x92)]=null,_0x59d4b7[_0x292632(0x97)](this,![]),this[_0x292632(0xd6)]());}}}this[_0x258b3e(0xb3)]=!![],this[_0x258b3e(0xb8)]=-0x1,ANInterpreterManager['hideWaitPlayersOnSharedEvent']();},_0x2be1f7[_0x3a6a47(0xc3)]=function(){var _0x511b2f=_0x3a6a47;if(this[_0x511b2f(0x87)]!=null&&this[_0x511b2f(0x87)][_0x511b2f(0xbc)]()){if('PgvAu'!==_0x511b2f(0xbe)){function _0x437f71(){var _0x7a0808=_0x511b2f,_0x27a56d,_0x551e65;try{return this[_0x7a0808(0xd2)]()&&((_0x551e65=this['nStartOptions'][_0x7a0808(0x9d)])!=null?_0x551e65[_0x7a0808(0xae)](_0x7a0808(0x95)):void 0x0);}catch(_0x35a960){return _0x27a56d=_0x35a960,_0xae75eb['w'](_0x27a56d),![];}}}else return;}_0x511b2f(0xb6)['p'](),$gameTemp[_0x511b2f(0xbd)]=!![];};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, ALIAS__setupStartingEvent, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._networkCharacters = new NETCharactersGroup();
  };
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    if (ANNetwork.isConnected()) {
      // * Клиент переходит на новую карту
      ANGameManager.onNewGameMapSetup();
      this.setupNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    if (ANNetwork.isConnected()) {
      return this.refreshNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__setupStartingEvent = _.setupStartingEvent;
  _.setupStartingEvent = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp.isNetworkSharedEventReserved()) {
        return this.nSetupNetworkSharedEvent();
      }
    }
    return ALIAS__setupStartingEvent.call(this);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
  _.nSafeRefresh = function() {
    var e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (typeof $dataMap === "undefined" || $dataMap === null) {
        return;
      }
      this.refresh();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.netCharsIsSomeoneCollided = function(x, y) {
    return this._networkCharacters.isSomeoneCollided(x, y);
  };
  _.netChars = function() {
    return this._networkCharacters.characters();
  };
  _.networkCharacterById = function(id) {
    return this._networkCharacters.characterById(id);
  };
  // * Инициализация персонажей отображаемых на карте
  _.setupNetworkCharacters = function() {
    return this._networkCharacters.setup();
  };
  _.updateNetwork = function() {
    return this._networkCharacters.update();
  };
  _.refreshNetworkCharacters = function() {
    return this._networkCharacters.refresh();
  };
  // * Запуск общего события (которое пришло от сервера)
  _.nSetupNetworkSharedEvent = function() {
    var e, event;
    try {
      event = this.event($gameTemp.retrieveNetworkSharedEvent());
      if (event == null) {
        return false;
      }
      $gameTemp._nSharedEventOuterStartFlag = true;
      event.start();
      return true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (ANNetwork.isConnected()) {
      return this.nEndCallback();
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  _.nSetEndCallback = function(_nEndCallbackMethod) {
    this._nEndCallbackMethod = _nEndCallbackMethod;
  };
  _.nEndCallback = function() {
    if (this._nEndCallbackMethod != null) {
      this._nEndCallbackMethod();
      this._nEndCallbackMethod = null;
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__battleMembers, ALIAS__charactersForSavefile, ALIAS__facesForSavefile, ALIAS__leader, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__battleMembers = _.battleMembers;
  _.battleMembers = function() {
    if (ANNetwork.isConnected()) {
      return ANBattleManager.battleMembers();
    } else {
      return ALIAS__battleMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    if (ANNetwork.isConnected()) {
      // * Нет начальной группы
      this._actors = [];
    } else {
      ALIAS__setupStartingMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__leader = _.leader;
  _.leader = function() {
    if (ANNetwork.isConnected()) {
      return this.networkLeader();
    } else {
      return ALIAS__leader.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__charactersForSavefile = _.charactersForSavefile;
  _.charactersForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.characterName(), actor.characterIndex()];
      });
    } else {
      return ALIAS__charactersForSavefile.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__facesForSavefile = _.facesForSavefile;
  _.facesForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.faceName(), actor.faceIndex()];
      });
    } else {
      return ALIAS__facesForSavefile.call(this);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.setupNetworkGame = function() {};
  // * В бою участвует только один персонаж?
  _.isOneBattler = function() {
    return this.battleMembers().length <= 1;
  };
  //TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
  _.networkLeader = function() {
    var actorId;
    actorId = ANGameManager.myPlayerData().actorId;
    return $gameActors.actor(actorId);
  };
  //TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
  // * Этот метод вызывается когда группа была изменена (кто-то отключился)
  _.nRefreshNetworkActors = function() {
    var actor, e, i, id, len, playerForActor, ref;
    try {
      ref = this.members();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        id = actor.actorId();
        // * Ищем игрока для каждого Actor
        playerForActor = ANGameManager.playersData.find(function(pl) {
          return pl.actorId === id;
        });
        // * Если нету больше игрока с таким Actor, удаляем из партии
        if (playerForActor == null) {
          this.removeActor(id);
          ANGameManager.anotherPlayerLeaveGame(id);
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
//TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function(d) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveStraight.call(this, d);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        return ANPlayersManager.sendPlayerMove();
      }
    } else {
      return ALIAS__moveStraight.call(this, d);
    }
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function(horz, vert) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveDiagonally.call(this, horz, vert);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        ANPlayersManager.sendPlayerMove();
      }
    } else {
      ALIAS__moveDiagonally.call(this, horz, vert);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      this.updateNetwork();
      if (sceneActive === true) {
        this.nUpdatePlayerInputForNetwork();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.dataObserverHaveChanges = function() {
    return ANSyncDataManager.sendPlayerObserver();
  };
  _.updateNetwork = function() {
    var ref;
    if ($gameParty.isEmpty()) {
      return;
    }
    // * Проверяем и обновляем DataObserver своего персонажа
    // * Тут этот ? (првоерка Null) нужна!
    return (ref = $gameParty.leader()) != null ? ref.updateDataObserver() : void 0;
  };
  _.nUpdatePlayerInputForNetwork = function() {
    if (ANET.PP.isGameChatAllowed()) { //TODO: DYNAMIC?
      return this.nUpdateChatInput();
    }
  };
  _.nUpdateChatInput = function() {
    var openChatButton, sayInChatButton;
    //TODO: Можно оптимизировать, в initMembers
    openChatButton = ANET.PP.getChatOpenCloseKey();
    sayInChatButton = ANET.PP.getChatSayKey();
    if (Input.isTriggered(openChatButton)) {
      if (ANET.UI.isChatOpen()) {
        // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
        if (openChatButton === sayInChatButton) {
          ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
          Input.clear(); // * иначе закрываем
        } else {
          ANET.UI.closeChat();
        }
      } else {
        ANET.UI.showChat();
      }
    } else if (Input.isTriggered(sayInChatButton)) {
      if (ANET.UI.isChatOpen()) {
        ANET.UI.showChatInputSafe();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, switchId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalSwitch(switchId)) {
          ANSyncDataManager.sendGlobalSwitchChange(switchId, this.value(switchId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, switchId, value);
    }
  };
  
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  _.isGlobalSwitch = function(switchId) {
    return ANET.PP.globalSwitchesIds().contains(switchId);
  };
  _.onSwitchFromServer = function(switchId, value) {
    this._data[switchId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  // * Инициализация набора общих событий для команд пользователя
  _.nInitCustomCommandsCE = function() {
    if (this.nCustomCommandsCE == null) {
      return this.nCustomCommandsCE = {};
    }
  };
  // * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
  _.nCheckCustomCommandForCEStart = function(name) {
    var ceId, e;
    try {
      this.nInitCustomCommandsCE();
      ceId = this.nCustomCommandsCE[name];
      if ((ceId != null) && ceId > 0) {
        $gameTemp.reserveCommonEvent(ceId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Зарегестрировать вызов общего события для кастомной команды
  _.nRegisterCustomCommandCE = function(name, ceId) {
    var e;
    try {
      this.nInitCustomCommandsCE();
      this.nCustomCommandsCE[name] = ceId;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCommonEventReserved, ALIAS__requestAnimation, ALIAS__retrieveCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Виртуальные общие события от сервера
    this._virtualEventQueue = [];
  };
  
  //@[ALIAS]
  ALIAS__isCommonEventReserved = _.isCommonEventReserved;
  _.isCommonEventReserved = function() {
    return this.isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(this);
  };
  
  // * Виртуальные события в приоритете
  //@[ALIAS]
  ALIAS__retrieveCommonEvent = _.retrieveCommonEvent;
  _.retrieveCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__retrieveCommonEvent.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__requestAnimation = _.requestAnimation;
  _.requestAnimation = function() {
    if (ANNetwork.isConnected()) {
      // * В бою анимацию синхронизируется (только мастер)(отправляется другим игрокам)
      if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
        ANBattleManager.requestAnimation(...arguments);
      }
    }
    return ALIAS__requestAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * Virtual Common Events
    // -----------------------------------------------------------------------
    _.reserveNetworkSharedEvent = function(_reservedNetworkSharedEvent) {
      this._reservedNetworkSharedEvent = _reservedNetworkSharedEvent;
    };
    _.isNetworkSharedEventReserved = function() {
      return this._reservedNetworkSharedEvent >= 1;
    };
    // * Забираем (и сразу очищаем)
    _.retrieveNetworkSharedEvent = function() {
      var eventId;
      eventId = this._reservedNetworkSharedEvent;
      this._reservedNetworkSharedEvent = 0;
      return eventId;
    };
    _.reserveVirtualCommonEvent = function(list) {
      return this._virtualEventQueue.push(list);
    };
    _.isVirtualCommonEventReserved = function() {
      return this._virtualEventQueue.length > 0;
    };
  })();
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Unit.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Unit.prototype;
  _.nUpdateBattleDataSync = function() {
    var members;
    members = this.members();
    if (members.some(function(m) {
      return m.isNeedNetPushBattleData();
    })) {
      ANSyncDataManager.sendBattleUnitsObserver(members);
      members.forEach(function(m) {
        return m.onNetBattleDataPushed();
      });
    }
  };
})();

// ■ END Game_Unit.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, variableId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalVariable(variableId)) {
          ANSyncDataManager.sendGlobalVariableChange(variableId, this.value(variableId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, variableId, value);
    }
  };
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      return this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  _.isGlobalVariable = function(varId) {
    return ANET.PP.globalVariablesIds().contains(varId);
  };
  _.getAllGlobalVariablesData = function() {
    var i, j, variables;
    variables = [];
    for (i = j = 1; j <= 8; i = ++j) {
      variables.push([i, this.value[i]]);
    }
    return variables;
  };
  _.onVariableFromServer = function(varId, value) {
    this._data[varId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1


// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var nAPI;

nAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = nAPI;
  (function() {    // * NETWORK STATE
    // -----------------------------------------------------------------------
    _.isNetworkGame = function() {
      var e;
      try {
        return ANNetwork.isConnected();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    _.myPlayerIndex = function() {
      var e;
      try {
        return ANGameManager.myIndex();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.myActorId = function() {
      var e;
      try {
        return ANGameManager.myActorId();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.playersCount = function() {
      var e;
      try {
        return ANGameManager.playersData.length;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    return _.isMasterClient = function() {
      var e;
      try {
        return _.isNetworkGame() && ANNetwork.isMasterClient();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * HUI
    // -----------------------------------------------------------------------
    _.showGreenAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifySucess(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showRedAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifyError(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showInfoMessage = function(text1, text2 = "") {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.showWaitingInfo(text1, text2, 1) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.hideInfoMessage = function() {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * USER SERVER COMMANDS
    // -----------------------------------------------------------------------
    //@[ALIAS SUPPORT]
    // * FOR ALIASING (for plugin developers and custom commands implementation)
    _.onCustomCommand = function(name, data) {
      var e;
      try {
        if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
          $gameSystem.nCheckCustomCommandForCEStart(name);
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
      console.log("Custom network command received: " + name);
    };
    // * USER CUSTOM CODE HERE
    _.sendCustomCommand = function(name, data) {
      var e;
      try {
        if (!_.isNetworkGame()) {
          return;
        }
        return ANNetwork.callback(NMS.Game("userCommand", {name, data}), function() {
          //TODO: Может не надо выполнять и на данном клиенте?
          // * Сразу выполняем и на данном клиенте
          // * Так как сервер эту команду выполнит в режиме ретрансляции
          return nAPI.onCustomCommand(name, data);
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Подписать на определённую (кастомную) команду выполенине общего события
    return _.registerCommonEventForCommand = function(name, commonEventId) {
      var e;
      try {
        return ANNetwork.callback(NMS.Game("customCommandLink", {name, commonEventId}), function() {
          if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
            $gameSystem.nRegisterCustomCommandCE(name, commonEventId);
          }
          return console.log("Custom network command register to Common Event is done");
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * CHAT
    // -----------------------------------------------------------------------
    _.writeInChat = function(message, isGlobal = false) {
      var e;
      try {
        if (isGlobal === true && ANNetwork.isConnected()) {
          ANGameManager.sendRawChatMessage(0, 0, message);
        } else {
          ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message));
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.closeChatWindow = function() {
      var e;
      try {
        ANET.UI.closeChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.openChatWindow = function() {
      var e;
      try {
        ANET.UI.showChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.moveChatWindow = function(x = 0, y = 0) {
      var e;
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: x,
          y: y
        };
        if (this.isChatWindowOpened()) {
          ANET.UI.chat()._moveToStartPosition();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    };
    return _.isChatWindowOpened = function() {
      var e;
      try {
        return ANET.UI.isChatOpen();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для персонажей на карте других игроков
var NETCharacter;

NETCharacter = class NETCharacter extends Game_Character {
  constructor(id) {
    super();
    this.id = id;
    //* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
    this.networkStateIcon = null;
    this.refresh();
  }

  // * Синхронизация движения
  playerData() {
    return ANGameManager.getPlayerDataById(this.id);
  }

  actor() {
    return $gameActors.actor(this.playerData().actorId);
  }

  refresh() {
    var charIndex, charName;
    if (this.actor() == null) {
      return;
    }
    charName = this.actor().characterName();
    charIndex = this.actor().characterIndex();
    return this.setImage(charName, charIndex);
  }

  // * Сетевое состояние игрока
  // * =====================================================================
  requestNetworkStateIcon(networkStateIcon) {
    this.networkStateIcon = networkStateIcon;
  }

};

(function() {  
  // * =====================================================================

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharacter.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
})();

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
//?[STORABLE]
//@[GLOBAL]
var NETCharactersGroup;

NETCharactersGroup = class NETCharactersGroup {
  constructor() {
    this._data = [];
  }

  setup() {
    "SETUP NETWORK CHARS".p();
    this._data = [];
    this._refreshCharacters();
  }

  // * Вызывается из Game_Map.refresh
  refresh() {
    var char, i, len, ref;
    this._refreshCharacters();
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      char.refresh();
    }
  }

  characters() {
    return this._data;
  }

  characterById(id) {
    return this.characters().find(function(c) {
      return c.id === id;
    });
  }

  update() {
    var c, i, len, ref, results;
    ref = this.characters();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(c.update());
    }
    return results;
  }

  isSomeoneCollided(x, y) {
    return this.characters().some(function(c) {
      return c.pos(x, y);
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharactersGroup.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharactersGroup.prototype;
  
  // * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
  _._refreshCharacters = function() {
    var char, i, len, pl, x;
    this._removeNotExistsCharacters();
    this._addNewCharacters();
    this._refreshNetworkCharactersSprites();
    x = ANGameManager.anotherPlayers();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Удаляем (отключился или ушёл на другую карту)
  _._removeNotExistsCharacters = function() {
    var char, i, len, ref, x;
    x = ANGameManager.anotherPlayersOnMap();
    ref = this.characters();
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      if (char == null) {
        continue;
      }
      if (!x.find(function(c) {
        return c.id === char.id;
      })) {
        this._data.delete(char);
      }
    }
  };
  // * Добавляем новых персонажей
  //TODO: Надо проверять!
  _._addNewCharacters = function() {
    var char, i, len, pl, x;
    x = ANGameManager.anotherPlayersOnMap();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Пересоздать спрайты персонажей
  _._refreshNetworkCharactersSprites = function() {
    var ref;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    if ((ref = SceneManager._scene._spriteset) != null) {
      ref.refreshNetworkCharacters();
    }
  };
})();

// ■ END NETCharactersGroup.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(name, flag, data, socket) {
    return _M.EmptyMessageWithFlag(flag, data, socket).setName(name);
  };
  // * Обозначения
  // f - имя комманды (флага)
  // d - данные
  // s - сокет (либо ничего)

  //?LOBBY COMMANDS
  _M.Lobby = function(f, d, s) {
    return _CM('lobby', f, d, s);
  };
  //?MAP COMMANDS
  _M.Map = function(f, d, s) {
    return _CM('map', f, d, s);
  };
  //?GAME COMMANDS
  _M.Game = function(f, d, s) {
    return _CM('game', f, d, s);
  };
  //?INTERPRETER COMMANDS
  _M.Event = function(f, d, s) {
    return _CM('event', f, d, s);
  };
  //?BATTLE COMMANDS
  _M.Battle = function(f, d, s) {
    return _CM('battle', f, d, s);
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Основной класс менеджер интерфейса (API)
// * Аналогичен классу AA.UI из ABSZ
ANET.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ ANET.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
  };
  _.isValid = function() {
    return (this.uiSet != null) && ANNetwork.isConnected();
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageStart();
  };
  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageEnd();
  };
  // * Когда было нажатие мышки на какой-либо UI элемент
  _.isUITouched = function() {
    return false;
  };
  // * Вызывается когда сцена карты заканчивается
  _.terminate = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.terminate() : void 0;
  };
  (function() {    
    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
    };
    _.hide = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.hide() : void 0;
    };
    _.show = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.show() : void 0;
    };
    // * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
    return _.isAnyUIElementTouchProcess = function() {
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Чат
    // -----------------------------------------------------------------------
    _.chat = function() {
      return this.uiSet.chatWindow;
    };
    // * Есть ли чат (создан ли), так как опциональный и нету в Basic
    _.isChatValid = function() {
      return this.isValid() && (this.chat() != null);
    };
    // * Открыто ли окно чата
    _.isChatOpen = function() {
      return this.isChatValid() && this.chat().isActive();
    };
    // * Показать сцену ввода сообщения в чат
    _.showChatInput = function() {
      if (!this.isValid()) {
        return;
      }
      SceneManager.push(Scene_NetChatInput);
    };
    // * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
    _.showChatInputSafe = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isCanChatInput()) {
        return this.showChatInput();
      }
    };
    _.showChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!this.isChatOpen()) {
        this.chat().open();
      }
    };
    _.closeChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isChatOpen()) {
        this.chat().close();
      }
    };
    
    //TODO: implement uAPI methods for system messages
    //? message: {
    //   channelId
    //   actorId
    //   text
    //   mapId
    //}
    // * Добавить сообщение в чат (можно вызывать на любой сцене)
    _.addMessageToChat = function(message) {
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      // * Если на карте, то добавляем прямо в чат
      if (KDCore.Utils.isSceneMap()) {
        this.chat().addMessageToChat(message);
      } else {
        // * Иначе в историю
        $gameTemp._nChatHistory.push(message);
      }
    };
    // * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
    _.isCanChatInput = function() {
      return !($gameMessage.isBusy() || $gameMap.isEventRunning());
    };
    
    // * Открыть (или не надо) чат при переходе на сцену карты
    return _.openChatAfterMapLoaded = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!$gamePlayer._nChatIsClosed) {
        return this.showChat();
      }
    };
  })();
})();

// ■ END ANET.UI.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами и командами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("ANETZ");
      this._prepareParameters();
    }

    
      //? CONNECTION -----------------------------------------------------------
    // * Настройки соединения
    serverIp() {
      return this._ip;
    }

    serverPort() {
      return this._port;
    }

    //? MULTIPLAYER GROUP -----------------------------------------------------------

      //Wait Map Transfer?
    isOnlySameMapMode() {
      return this.getParam("onlySameMap", true);
    }

    // New Game Allowed?
    // * Доступна ли обычная локальная Новая игра
    isSinglePlayerAllowed() {
      return this.getParam("singlePlayerAllowed", true);
    }

    //Rooms Filter?
    isRoomFilterON() {
      return ANET.isPro() && this.getParam("roomFilter", false);
    }

    //Save and Load Allowed?
    // * Сохранение и загрузка сетевой игры
    isSaveLoadAllowed() {
      return this.getParam("saveLoadGame", true);
    }

    //TODO: Параметр
    isSaveOnlyInMenu() {
      return false;
    }

    //In-Game Chat?
    isGameChatAllowed() {
      if (ANET.isPro()) {
        return this.getParam("inGameChat", false);
      } else {
        return false;
      }
    }

    //? CHAT SUBGROUP -----------------------------------------------------------
    //TODO: Параметр
    //TODO: param Open chat if closed and new message is arrived
    //TODO: format strings
    //TODO: visual settings

      //Start Message
    getChatStartMessage() {
      return this.getParam("chatStartMessage", "");
    }

    getChatOpenCloseKey() {
      return this.getParam("chatOpenCloseKey", "t");
    }

    getChatSayKey() {
      return this.getParam("chatSayKey", "t");
    }

    //? PLAYER SETTINGS GROUP -----------------------------------------------------------

      // * Набор персонажей Actors для сетевой игры
    //?VERSION
    //Actors
    actorsForNetwork() {
      return this.getParam("actorsForNetwork", [1, 2, 3, 4]);
    }

    // * Можно ли выбирать персонажа себе
    //Actor selection?
    isActorSelectionAllowed() {
      return this.getParam("isActorSelectionAllowed", true);
    }

    // * Можно ли начать сетевую игру одному
    //One player start?
    isSingleActorNetworkGameAllowed() {
      return this.getParam("isSinglePlayerStartAllowed", true);
    }

    // * Отображение имени игрока заместо имени персонажа
    // * 0 - Не показывать, 1 - Name, 2 - Nickname
    //?DINAMIC
    //Player Name for Actor
    playerActorNameType() {
      return 0;
    }

    //On Player Disconnect CE
    getPlayerLeaveGameCommonEventId() {
      return this.getParam("playerLeaveGameCommonEvent", 0);
    }

    //? OTHER -----------------------------------------------------------
    globalVariablesIds() {
      return this._globalVars;
    }

    globalSwitchesIds() {
      return this._globalSwitches;
    }

    //? NOT IN HEADER YET -------------------------------------

      // * Можно ли просматривать статус других игроков
    isOtherPlayersMenuStatusAllowed() {
      return true;
    }

    // * Видно ли других игроков в меню
    isOtherPlayersVisibleInMenu() {
      return true;
    }

    // * Ожидание получения действия от каждого игрока в битве
    isForceBattleSyncMode() {
      return true;
    }

    // * Время обновления данных игрока (на карте)
    playerDataRefreshRate() {
      return 60;
    }

    // * Время обновления данных в битве (влияет на производительность)
    battleDataRefreshRate() {
      return 60;
    }

  };
  ANET.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.ParamsManager.prototype;
  _._prepareParameters = function() {
    this._prepareConnectionSettings();
    this._preparePlayerActorName();
    return this._prepareGlobalData();
  };
  //?VERSION
  _._prepareConnectionSettings = function() {
    var p;
    p = this.getParam("connection", {
      serverIp: "195.161.41.20",
      serverPort: "3034"
    });
    this._ip = p.serverIp;
    this._port = p.serverPort;
  };
  _._preparePlayerActorName = function() {
    var p;
    p = this.getParam("playerActorNameType", "");
    switch (p) {
      case "Instead Name":
        this.playerActorNameType = function() {
          return 1;
        };
        break;
      case "Instead Nickname":
        this.playerActorNameType = function() {
          return 2;
        };
        break;
    }
  };
  // * Ничего, так как 0 по умолчанию
  _._prepareGlobalData = function() {
    var p;
    p = this.getParam("globalData", {
      globalSwitchesIds: [],
      globalVariablesIds: []
    });
    this._globalVars = p.globalVariablesIds;
    this._globalSwitches = p.globalSwitchesIds;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания флагов (или данных) от других игроков
var PlayersDataPool;

PlayersDataPool = class PlayersDataPool {
  constructor(anotherPlayersGetter) {
    this.anotherPlayersGetter = anotherPlayersGetter;
    this.reset();
    return;
  }

  // * Режим ожидания не данных, а чтобы у всех был TRUE
  setFlagMode() {
    return this._isFlagMode = true;
  }

  // * Главный метод -> отправка на сервер запроса
  register(requestMethod) {
    this.requestMethod = requestMethod;
    return this.requestMethod();
  }

  update() {
    if (this.isReady()) { // * Чтобы цикла не было по вызову callback
      return;
    }
    this._timeout--;
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      this.checkPool();
      if (!this.isReady()) {
        this.resetTimer();
        if (this._timeout > 0) {
          this.register(this.requestMethod);
        } else {
          this._isTimedOut = true;
          if (this.failCallback != null) {
            this.failCallback();
          }
          // * Сброс (например если Timeout не предусмотрен, не задан метод failCallback)
          this.resetTimeout();
        }
      } else {
        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }

  // * Проверка пула данных
  checkPool() {
    var anotherPlayersIds, i, id, len, poolSize;
    poolSize = 0;
    // * Подразумевается что в этом массиве только ID других игроков (кроме себя)
    anotherPlayersIds = this.anotherPlayersGetter().map(function(pl) {
      return pl.actorId;
    });
    for (i = 0, len = anotherPlayersIds.length; i < len; i++) {
      id = anotherPlayersIds[i];
      if (this.isDataExistsFor(id)) {
        poolSize += 1;
      }
    }
    if (poolSize === anotherPlayersIds.length) {
      // * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
      this._isReady = this.isMyDataExists();
    } else {
      this._isReady = false;
    }
  }

  onReady(callback) {
    this.callback = callback;
  }

  onFail(failCallback) {
    this.failCallback = failCallback;
  }

  isReady() {
    return this._isReady === true;
  }

  isTimedOut() {
    return this._isTimedOut === true;
  }

  setMyData(data) {
    return this.onAnswer(ANGameManager.myActorId(), data);
  }

  isMyDataExists() {
    return this.isDataExistsFor(ANGameManager.myActorId());
  }

  isDataExistsFor(actorId) {
    return this.getDataFor(actorId) != null;
  }

  getDataFor(actorId) {
    return this._anotherPlayersData[actorId];
  }

  getData() {
    return this._anotherPlayersData;
  }

  // * Этот метод вызывается внешне, когда пришли данные от сервера
  onAnswer(actorId, data) {
    if (!this._isFlagMode) {
      this._anotherPlayersData[actorId] = data;
    } else {
      // * Если в режиме флагов, то только при TRUE присваиваем данные
      if (data === true) {
        this._anotherPlayersData[actorId] = data;
      } else {
        // * null, а не false, потому что проверка через ? идёт
        this._anotherPlayersData[actorId] = null;
        delete this._anotherPlayersData[actorId];
      }
    }
  }

  reset() {
    this.resetTimer();
    this.resetTimeout();
    this._isReady = false;
    this._isFlagMode = false;
    this._isTimedOut = false;
    this._anotherPlayersData = {};
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  resetTimeout() {
    return this._timeout = 600;
  }

};

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания других игроков
var PlayersWaitPool;

PlayersWaitPool = class PlayersWaitPool {
  constructor() {
    // * Запоминается при создании, чтобы можно было сбросить
    // * Это нужно, чтобы если игрок новый переместился на карту, его
    // * не добавили в ожидание, если на этой карте уже запущено общее событие
    this._anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map(function(pl) {
      return pl.actorId;
    });
    this.reset();
    return;
  }

  // * Зарегестрировать (отправить на сервер)
  register() {
    this.resetTimer();
    ANInterpreterManager.sendSharedEventRequireRegister();
  }

  // * Только один игрок (мастер события) запустил событие (один на карте или в игре)
  isSinglePool() {
    return this._anotherPlayersIds.length === 0;
  }

  // * Проверить, что игроки, которые в пуле, онлайн (не отключились)
  checkPool() {
    var i, id, len, player, playersOnMap, ref;
    playersOnMap = ANGameManager.anotherPlayersOnMap();
    ref = this._anotherPlayersIds;
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      // * Если игрока больше нет на карте, мы его удаляем из пула
      player = playersOnMap.find(function(pl) {
        return pl.actorId === id;
      });
      if (player == null) {
        this._anotherPlayersIds.delete(id);
        // * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
        // * (в следующей команде он уже участвовать не будет, так как будет Reset)
        this._playersReady[id] = true;
      }
    }
  }

  // * Ответ от сервера
  onAnswer(actorId) {
    return this._playersReady[actorId] = true;
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      if (!this.isReady()) {
        this.checkPool();
        this.register();
      }
    }
  }

  isReady() {
    var pl, ref, value;
    ref = this._playersReady;
    for (pl in ref) {
      value = ref[pl];
      if (value === false) {
        // * Если хоть одно значение false, значит не готов
        return false;
      }
    }
    return true;
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  // * Сбросить до нового ожидания
  reset() {
    var i, id, len, ref;
    // * Добавляем себя как готового всегда (тут не важент именно ID)
    // * В принципе можно и не добавлять, так как важнее другие игроки
    this._playersReady = {
      myActorId: true
    };
    ref = this._anotherPlayersIds;
    // * Добавляем всех игроков как изначально не готовых
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      this._playersReady[id] = false;
    }
    this.resetTimer();
  }

};

// Generated by CoffeeScript 2.5.1
// * Команды плагина
// * Нет класса или менеджера, так как только методы регистрации команд
(function() {
  var registerPluginCommandsMV, registerPluginCommandsMZ;
  // * Основной метод загрузки (регистрации команд плагина)
  ANET.loadPluginCommands = function() {
    if (KDCore.isMZ()) {
      registerPluginCommandsMZ('Alpha_NETZ');
      return registerPluginCommandsMZ('Alpha_NETZ_MZ');
    } else {
      return registerPluginCommandsMV();
    }
  };
  registerPluginCommandsMZ = function(pluginName) {
    PluginManager.registerCommand(pluginName, 'EventCommandSelector', function(args) {
      var e;
      try {
        return this.nSetCommandOptions(args);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
    PluginManager.registerCommand(pluginName, 'SharedBattle', function(args) {
      var e;
      try {
        return this.nSetSharedBattle(args.battleId);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
  };
  registerPluginCommandsMV = function() {
    var e;
    try {
      // * Этот метод только для MV существует
      return ANET.registerMVPluginCommands();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__terminate, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (ANNetwork.isBusy()) {
      return ANGameManager.updateWaiting();
    } else {
      //console.log("wait network...")
      return ALIAS__update.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    // * Смена сцены
    if (ANNetwork.isConnected()) {
      ANGameManager.sendSceneChanging();
    }
    return ALIAS__terminate.call(this);
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {
    HUIManager.hideLoader();
    return SceneManager.goto(Scene_Title);
  };
  
  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  _.netOn_lobby_roomClosed = function() {
    // * По умолчанию из любой сцены выходит в главное меню
    return SceneManager.goto(Scene_Title);
  };
  // * Когда пришло какое-либо сообщение от сервера
  //?EVENT
  _.onServerEvent = function(name) {
    var eventMethod;
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    eventMethod = "netOn_" + name;
    if (this[eventMethod] != null) {
      console.log("Call scene callback for event " + name);
      this[eventMethod]();
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeInputWindow, ALIAS__commandFight, ALIAS__shouldAutosave, ALIAS__stop, ALIAS__updateBattleProcess, ALIAS__updateBattleProcessMV, ALIAS__updateTpbAutoBattle, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS, STORED]
  _.ALIAS__NET_start = _.start;
  _.start = function() {
    // * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
    if (ANNetwork.isConnected() && BattleManager.nIsNetworkBattle() && !ANBattleManager.isBattleRegistred()) {
      return;
    }
    // * Метод Start вызывается автоматически у SceneManager, поэтому когда
    // * данные прийдут, сцена старт
    _.ALIAS__NET_start.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleStarted();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleEnd();
    }
  };
  //TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
  //TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

  // * Игрок не может видеть команды "ввода" персонажей других игроков
  //@[ALIAS]
  ALIAS__changeInputWindow = _.changeInputWindow;
  _.changeInputWindow = function() {
    ALIAS__changeInputWindow.call(this);
    if (ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()) {
      if (BattleManager.actor() != null) {
        if (BattleManager.actor() !== $gameParty.leader()) {
          this.endCommandSelection();
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__commandFight = _.commandFight;
  _.commandFight = function() {
    if (ANNetwork.isConnected()) {
      // * Игрок снова должен сделать выбор
      BattleManager._isShouldWaitMyNetworkAction = true;
    }
    ALIAS__commandFight.call(this);
  };
  // * Должен идти перед переопределением общим, поэтому в этом файле
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__updateBattleProcessMV = _.updateBattleProcess;
    _.updateBattleProcess = function() {
      if (ANNetwork.isConnected()) {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
          this.changeInputWindow();
        }
        return BattleManager.update(); // * Надо обновлять не зависимо от условия вверху
      } else {
        return ALIAS__updateBattleProcessMV.call(this);
      }
    };
  }
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    // * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
    if (ANNetwork.isConnected()) {
      if ($gameParty.isOneBattler()) {
        // * Только обновлять данные HP и MP другим игрокам
        $gameParty.leader().updateDataObserver();
      } else {
        // * Логика сетевого боя (общая для мастера и клиентов)
        this.nUpdateBattleProcess();
        if (ANGameManager.isBattleMaster()) {
          ANBattleManager.update();
          // * Если ждём сервер, то не обновляем BattleManager
          if (ANBattleManager.isShouldWaitServer()) {
            return;
          }
        } else {
          // * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
          if (!BattleManager.nIsLocalForceUpdatePhase()) {
            return;
          }
        }
      }
    }
    ALIAS__updateBattleProcess.call(this);
  };
  
  // * На всякий случай отключу автобитву
  //@[ALIAS]
  ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle;
  _.updateTpbAutoBattle = function() {
    if (ANNetwork.isConnected()) {

    } else {
      return ALIAS__updateTpbAutoBattle.call(this);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Когда пришли данные о битве от сервера (регистрация, новый участник)
  // * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
  _.netOn_battle_serverBattleData = function() {
    var battler, battlerId, i, j, len, len1, ref, ref1;
    ref = $gameParty.battleMembers();
    // * Для всех новых, надо выполнять некоторые методы
    for (i = 0, len = ref.length; i < len; i++) {
      battler = ref[i];
      if (!$gameTemp._previousNetBattleActors.contains(battler.actorId())) {
        battler.onBattleStart();
        battler.makeActions();
      }
    }
    ref1 = $gameTemp._previousNetBattleActors;
    // * Всех старых, надо удалить из битвы
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      battlerId = ref1[j];
      if (!ANBattleManager.battleData.actors.contains(battlerId)) {
        $gameParty.removeActor(battlerId);
        BattleManager.nSafeRemoveActor();
      }
    }
    $gameTemp._previousNetBattleActors = [];
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
  };
  _.nOnBattleStarted = function() {
    // * Отправляем на сервер, что мы начали бой
    ANBattleManager.onBattleStarted();
  };
  _.nOnBattleEnd = function() {
    // * Отправляем на сервер, что мы покинули (закончили) бой
    ANBattleManager.onBattleEnd();
  };
  _.nUpdateBattleProcess = function() {
    var actor, enemy, i, j, len, len1, ref, ref1;
    // * За отправку данных отвечает только мастер боя
    if (ANGameManager.isBattleMaster()) {
      ref = $gameParty.battleMembers();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        actor.updateDataObserver();
      }
      ref1 = $gameTroop.members();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        enemy = ref1[j];
        enemy.updateDataObserver();
      }
    }
  };
  _.nRefreshSharedBattle = function() {
    // * Обновить спрайты врагов
    return this._spriteset.nRefreshNetBattle();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем сетевой код
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    ANET.System.initSystem();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onLoadFailure, ALIAS__terminate, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      if (KDCore.isMZ()) {
        this.nLoadNetworkGameFromSavefile(); // * В MV в одном потоке, не переключает сцену сразу после инициализации
      } else {
        setTimeout((() => {
          return this.nLoadNetworkGameFromSavefile();
        }), 1);
      }
    }
  };
  //@[ALIAS]
  ALIAS__onLoadFailure = _.onLoadFailure;
  _.onLoadFailure = function() {
    // * Своя обработка ошибки загрузки в сетевом режиме
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      this.nOnLoadFailure();
    } else {
      ALIAS__onLoadFailure.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    ALIAS__terminate.call(this);
    // * Сбросим флаг
    $gameTemp._nRequestLoadNetworkGame = false;
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  _.nLoadNetworkGameFromSavefile = function() {
    var savefileId;
    savefileId = DataManager.nGetNetworkSaveFileIdByUniqueId(ANNetwork.room.uniqueSaveID);
    if (savefileId < 0) {
      this.nOnLoadFailure();
    } else {
      this.executeLoad(savefileId);
    }
  };
  _.nOnLoadFailure = function() {
    HUIManager.notifyError("Can't load Save file!");
    // * Через timeout а то не успевает, если сразу ошибка
    setTimeout((function() {
      return SceneManager.goto(Scene_Title);
    }), 1);
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__shouldAutosave, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (ANNetwork.isConnected()) {
      ANGameManager.onMapLoaded();
      $gameParty.nRefreshNetworkActors();
    }
    // * Открыть (или нет) чат
    ANET.UI.openChatAfterMapLoaded();
  };
  
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS]
  // * Создаём интерфейс
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this._netUI = new ANET.Spriteset_UI();
    this.addChild(this._netUI);
  };
  // * Запрет движения при нажатии на UI элементы
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  _.onMapTouch = function() {
    if (ANNetwork.isConnected()) {
      if (ANET.UI.isUITouched()) {
        return;
      }
    }
    ALIAS__onMapTouch.call(this);
  };
  // * Закрываем интерфейс
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    ANET.UI.terminate();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    //TODO: Если игрок отключился, надо общее событие!
    $gameParty.nRefreshNetworkActors();
    $gameMap.refreshNetworkCharacters();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MenuBase.prototype;
  //?EVENT
  // * Когда пришли какие-либо данные DataObserver
  _.netOn_game_observerData = function() {
    return this.refreshNetwork();
  };
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    var e, ref;
    try {
      $gameParty.nRefreshNetworkActors();
      // * Если есть окно с персонажами, обновить его
      // * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
      // * Так как тут в Scene_MenuBase тоже нужен метод
      if ((ref = this._statusWindow) != null) {
        ref.refresh();
      }
    } catch (error) {
      //TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
      e = error;
      ANET.w(e);
    }
  };
  // * Обновить все окна при изменениях данных из сети
  _.refreshNetwork = function() {
    var child, e, i, len, ref;
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      this.updateActor();
      if (this._windowLayer == null) {
        return;
      }
      ref = this._windowLayer.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if ((child != null) && (child.refresh != null)) {
          child.refresh();
        }
      }
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Scene_MenuBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена ввода сообщения для чата
var Scene_NetChatInput;

Scene_NetChatInput = class Scene_NetChatInput extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    if ($gameTemp._nChatLastChannelId == null) {
      $gameTemp._nChatLastChannelId = 0;
    }
    this._showNameInput();
    this._createGroupButtons();
    if (KDCore.isMZ()) {
      this._createOkButton();
    }
    // * Делаем фокус ввода
    setTimeout((function() {
      return HUIManager.focusInput();
    }), 100);
  }

  stop() {
    $gameTemp._nChatLastChannelId = this.buttonsGroup.getSelectedIndex();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel()) {
      this.popScene();
    } else if (Input.isTriggered("ok")) {
      this.onOkClick();
    }
  }

  onOkClick() {
    var msg;
    msg = HUIManager.getInputValue();
    if (String.any(msg)) {
      this._sendMessageToServer(msg);
    }
    return this.popScene();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetChatInput.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetChatInput.prototype;
  _._sendMessageToServer = function(msg) {
    var channelId, e;
    try {
      channelId = this.buttonsGroup.getSelectedIndex();
      console.log("Send message from chat: " + msg);
      if (ANNetwork.isConnected()) {
        ANGameManager.sendMyChatMessage(channelId, msg);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  _._showNameInput = function() {
    HUIManager.showInput("Enter your message...");
    HUIManager.setInputValue("");
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
  //TODO: Customizable
  _._createGroupButtons = function() {
    var y;
    this.buttonsGroup = new AA.Sprite_ButtonsGroup([
      {
        image: "nzButton_ChatGroup_All",
        position: [0,
      0]
      },
      {
        image: "nzButton_ChatGroup_Map",
        position: [100,
      0]
      }
    ], $gameTemp._nChatLastChannelId, null);
    if (KDCore.isMZ()) {
      y = this.buttonY();
    } else {
      y = 6;
    }
    this.buttonsGroup.move(4, y);
    this.addChild(this.buttonsGroup);
  };
  _._createOkButton = function() {
    this._okButton = new Sprite_Button("ok");
    this._okButton.x = Graphics.boxWidth / 2 - this._okButton.width / 2;
    this._okButton.y = Graphics.boxHeight / 2 - this._okButton.height / 2;
    this.addWindow(this._okButton);
  };
})();

// ■ END Scene_NetChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_NetworkGameMenu;

Scene_NetworkGameMenu = class Scene_NetworkGameMenu extends Scene_MenuBase {
  constructor() {
    super();
    return;
  }

  create() {
    super.create();
    // * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
    if (!ANNetwork.isConnected()) {
      this._initNetwork();
    } else {
      this._initSceneComponents();
      this.refreshWelcomeText();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateBackButton();
    this._updateRandomJoin(); //2
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.update();
    }
  }

  stop() {
    HUIManager.removeInput();
    HUIManager.hideLoader();
    return super.stop();
  }

  refreshWelcomeText() {
    var e, ref;
    try {
      return (ref = this._welcomeLine) != null ? ref.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name) : void 0;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  refreshPlayersCountText(count = 0) {
    var e;
    try {
      if (this._playerCountText == null) {
        return;
      }
      this._playerCountText.clear();
      return this._playerCountText.drawTextFull("Players on server: " + count);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  //?EVENT
  netOn_lobby_changePlayerName() {
    var ref;
    this.refreshWelcomeText();
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.call();
    }
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  // * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
  // * Так как пока нет необходимости $gameParty менять
  netOn_lobby_refreshRoomData() {} // * NOTHING

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._initNetwork = function() {
    HUIManager.showLoader();
    ANNetwork.initSystem();
    ANNetwork.setConnection(this._onConnectionStatus.bind(this));
  };
  //?EVENT
  // * 0 - error, 1 - connect
  _._onConnectionStatus = function(statusCode) {
    switch (statusCode) {
      case 0:
        this._onConnectionRefused();
        break;
      case 1:
        this._onConnectionGood();
    }
  };
  _._onConnectionRefused = function() {
    HUIManager.hideLoader();
    HUIManager.notifyError("Server not response in time");
    return this.popScene();
  };
  _._onConnectionGood = function() {
    //TODO: Server version check
    HUIManager.hideLoader();
    if (!ANGameManager.isInited()) {
      ANGameManager.init();
    }
    HUIManager.notifySucess("Connected to server");
    return this._initSceneComponents();
  };
  // * Отрисовка меню, если соединение  было установлено
  _._initSceneComponents = function() {
    this._createNetworkMenu(); //1
    this._createWelcomeText(); //1
    HUIManager.showInput("Room Name...");
    this._createServerPlayerCountText();
    this._createPlayerCountRefreshThread();
  };
  _._updateBackButton = function() {
    var ref;
    if (KDCore.isMV()) {
      return;
    }
    // * Тут может быть вылет, если нет проверки null (?)
    return (ref = this._cancelButton) != null ? ref.visible = !HUIManager.isLoaderActive() : void 0;
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._createWelcomeText = function() {
    //TODO: From UI Text Component with user settings
    this._welcomeLine = KDCore.Sprite.FromBitmap(400, 60);
    this._welcomeLine.bitmap.fontSize = 38;
    this._welcomeLine.x = Graphics.width / 2 - this._welcomeLine.bitmap.width / 2;
    this._welcomeLine.y = 80;
    return this.addChild(this._welcomeLine);
  };
  _._createNetworkMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    wh = this.calcWindowHeight(4, true);
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkGameMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('createRoom', this.commandCreateRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRoom', this.commandJoinRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRandRoom', this.commandJoinRandRoomMenu.bind(this)); //2
    this._commandsWindow.setHandler('settings', this.commandSettings.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _._createServerPlayerCountText = function() {
    this._playerCountText = KDCore.Sprite.FromBitmap(280, 40);
    this._playerCountText.bitmap.fontSize = 18;
    this._playerCountText.x = Graphics.width / 2 - this._playerCountText.bitmap.width / 2;
    this._playerCountText.y = this._commandsWindow.y + this._commandsWindow.height + 20;
    return this.addChild(this._playerCountText);
  };
  _._createPlayerCountRefreshThread = function() {
    var refreshMethod;
    refreshMethod = function() {
      //return if SceneManager.isSceneChanging()
      return ANNetwork.callback(NMS.Lobby("playersCountOnServ"), (count) => {
        var e;
        try {
          if (SceneManager.isSceneChanging()) {
            return;
          }
          return this.refreshPlayersCountText(count);
        } catch (error) {
          e = error;
          return ANET.w(e);
        }
      });
    };
    this._playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(this));
    this._playerCountRefreshThread.call();
  };
  _.commandCreateRoomMenu = function() {
    // * Сохраняем название команты
    $gameTemp._nLastRoomName = HUIManager.getInputValue();
    $gameTemp._nIsForwardTransitionToRoomTypeMenu = true;
    SceneManager.push(Scene_NetworkRoomTypeSelect);
  };
  _.commandJoinRoomMenu = function() {
    return SceneManager.push(Scene_NetworkRoomsList);
  };
  _.commandSettings = function() {
    return SceneManager.push(Scene_NetworkSettings);
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  // * Методы обработки подключения к случайной комнате
  _.commandJoinRandRoomMenu = function() {
    this.roomsList = null; // * Обнуляем список комнат
    this.requestRoomsListFromServer();
    this._waitRoomsForRandomJoin = true;
  };
  _.requestRoomsListFromServer = function() {
    ANNetwork.get(NMS.Lobby("getRoomsList"), (result) => {
      return this.roomsList = result;
    }, () => {
      // * Timeout
      console.log("Server not returns rooms list in time");
      return this._onCantJointRandomRoom();
    });
  };
  _._onCantJointRandomRoom = function() {
    this._waitRoomsForRandomJoin = false;
    this._commandsWindow.activate();
    HUIManager.notifyError("No available open rooms to join");
  };
  // * Ждём список комнат и пытаемся подключиться к случайной
  _._updateRandomJoin = function() {
    var randomRoomName;
    if (!this._waitRoomsForRandomJoin) {
      return;
    }
    if (this.roomsList == null) {
      return;
    }
    this._waitRoomsForRandomJoin = false;
    this.applyFiltersToRoomList();
    if (this.roomsList.length === 0) {
      this._onCantJointRandomRoom();
    } else {
      randomRoomName = this.roomsList.sample().name;
      this.joinToRoomRequest(randomRoomName);
    }
  };
  _.applyFiltersToRoomList = function() {
    if (this.roomsList == null) {
      this.roomsList = [];
    }
    if (this.roomsList.length === 0) {
      return;
    }
    this.roomsList = this.roomsList.filter((r) => {
      return this.isProperRoomToJoin(r);
    });
  };
  _.isProperRoomToJoin = function(roomData) {
    return NetRoomDataWrapper.isRoomProperToJoin(roomData);
  };
  _.joinToRoomRequest = function(roomName) {
    ANNetwork.get(NMS.Lobby("joinToRoom", roomName), (result) => {
      return this._onJoinedToRoom(result);
    }, () => {
      console.log("Can't join to Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._commandsWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Scene_NetworkRoom;

Scene_NetworkRoom = class Scene_NetworkRoom extends Scene_MenuBase {
  constructor() {
    super();
    this._startingGameTransition = false;
  }

  create() {
    super.create();
    this.room = ANNetwork.room;
    this.createRoomTitle();
    this.createCommands();
    this.createPlayersList();
    if (ANET.PP.isActorSelectionAllowed() && !this.isLoadGame()) {
      this.createActorSelectWindow();
    }
    if (this.isLoadGame()) {
      this.prepareSaveFile();
    }
    this.refreshRoom();
  }

  start() {
    super.start();
    ANNetwork.requestRoomRefresh();
    // * Так как есть искуственная задержка загрузки сцены на MV
    if (KDCore.isMV()) {
      setTimeout((function() {
        try {
          return ANNetwork.requestRoomRefresh();
        } catch (error) {

        }
      }), 300);
    }
  }

  isBottomHelpMode() {
    return false;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  refreshRoom() {
    this.room = ANNetwork.room;
    this._refreshRoomTitle();
    this._refreshPlayerList();
    this._refreshActorsList();
    return this._windowCommands.refresh();
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  netOn_lobby_refreshRoomData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  // * Когда игрок выбирает персонажа
  netOn_game_playersData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  netOn_lobby_startGame() {
    this._startingGameTransition = true;
    if (this.isLoadGame()) {
      this.loadAndStartGame();
    } else {
      this.startNewGame();
    }
  }

  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  netOn_lobby_roomClosed() {
    if (!this._shouldNotPopScene) {
      // * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
      // * Для мастера не надо, так как сцена и так закрывается сама и получается
      // * что возврат происходит на Scene_Title
      return this.popScene();
    }
  }

  update() {
    return super.update();
  }

  //TODO: Готов клиент или нет
  //if ANNetwork.isMasterClient() and Input.isTriggered('ok')
  //    ANNetwork.send(NMS.Lobby("startGame"))
  stop() {
    super.stop();
    // * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
    if (this._startingGameTransition === true) {
      return;
    }
    if (ANNetwork.isMasterClient()) {
      this._shouldNotPopScene = true;
      return ANNetwork.closeRoom();
    } else {
      return ANNetwork.leaveRoom();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkRoom.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoom.prototype;
  _.startNewGame = function() {
    // * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
    this._commandWindow = {
      close: function() {}
    };
    Scene_Title.prototype.commandNewGame.call(this);
  };
  _.loadAndStartGame = function() {
    // * Задаём флаг, что будем загружать сетевую игру
    $gameTemp._nRequestLoadNetworkGame = true;
    SceneManager.push(Scene_Load);
  };
  _.createRoomTitle = function() {
    this.createHelpWindow();
    return this._refreshRoomTitle();
  };
  _._refreshRoomTitle = function() {
    var ref, roomHostName;
    if (ANNetwork.isMasterClient()) {
      roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)";
    } else {
      if (this.room == null) {
        roomHostName = "Fetching...";
      } else {
        roomHostName = (ref = ANGameManager.getPlayerDataById(this.room.masterId)) != null ? ref.name : void 0;
      }
    }
    return this._helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName));
  };
  _._refreshPlayerList = function() {
    this._playersListWindow.refresh();
  };
  _.createCommands = function() {
    this._windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, this._helpWindow.y + this._helpWindow.height, 600, 100));
    this._windowCommands.setHandler('cancel', this.popScene.bind(this));
    this._windowCommands.setHandler('leave', this.popScene.bind(this));
    this._windowCommands.setHandler('start', this._onStartRoomCommand.bind(this));
    this._windowCommands.setHandler('ready', this._onReadyInRoomCommand.bind(this));
    this._windowCommands.setHandler('character', this._onCharacterSelectCommand.bind(this));
    this.addWindow(this._windowCommands);
    this._windowCommands.activate();
  };
  _._onStartRoomCommand = function() {
    if (this._isAllInRoomReady()) { // TODO: В Wrapper, так как окно тоже проверяет
      if (ANNetwork.isMasterClient()) {
        ANNetwork.send(NMS.Lobby("startGame"));
      }
    } else {
      this._windowCommands.activate();
    }
  };
  _._onReadyInRoomCommand = function() {};
  //TODO: Ничего пока нет
  _._onCharacterSelectCommand = function() {
    this._windowActorsList.show();
    this._windowActorsList.open();
    this._windowActorsList.activate();
    return this._playersListWindow.close();
  };
  //TODO: Флаги готовности, сбрасывать при нажатии Character
  // * См. readyPlayersIds у данных комнаты
  _._isAllInRoomReady = function() {
    return true;
  };
  _.createActorSelectWindow = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh));
    this._windowActorsList.setHandler('cancel', this._onActorSelectCancel.bind(this));
    this._windowActorsList.setHandler('ok', this._onActorSelectOk.bind(this));
    this._windowActorsList.hide();
    return this.addWindow(this._windowActorsList);
  };
  _._onActorSelectCancel = function() {
    return this._cancelActorSelection();
  };
  _._cancelActorSelection = function() {
    this._windowActorsList.close();
    this._windowCommands.activate();
    return this._playersListWindow.open();
  };
  _._onActorSelectOk = function() {
    var selectedActorId;
    selectedActorId = this._windowActorsList.selectedActorId();
    if (selectedActorId <= 0) {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    } else {
      ANPlayersManager.sendBindActorFromLobby(selectedActorId, this._onBindActorResult.bind(this));
    }
  };
  _._onBindActorResult = function(resultFlag) {
    if (resultFlag === true) {
      this._cancelActorSelection();
    } else {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    }
    this.refreshRoom();
  };
  _._refreshActorsList = function() {
    var ref;
    return (ref = this._windowActorsList) != null ? ref.refresh() : void 0;
  };
  _.createPlayersList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._playersListWindow);
    this._refreshPlayerList();
  };
  _.prepareSaveFile = function() {
    var info;
    info = DataManager.nGetNetworkSaveInfoWithId(this.room.uniqueSaveID);
    if (info == null) {
      HUIManager.notifyError("Save file data not found!");
      console.warn("Save file with ID " + this.room.uniqueSaveID + " not found!");
      this.popScene.bind(this);
    } else {
      //TODO: На сервере нет проверки на занятость персонажа??? НЕТУ в 112
      ANPlayersManager.sendBindActorFromLobby(info.nMyActorId, this.onBindLoadedActorResult.bind(this));
    }
  };
  _.onBindLoadedActorResult = function(resultFlag) {
    if (resultFlag === false) {
      SoundManager.playBuzzer();
      HUIManager.notifyError("Can't load Actor data or Actor already used by another player");
      this.popScene.bind(this);
    } else {
      this.refreshRoom();
    }
  };
})();

// ■ END Scene_NetworkRoom.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена со списком комнат на сервере
var Scene_NetworkRoomsList;

Scene_NetworkRoomsList = class Scene_NetworkRoomsList extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    //TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
    // * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
    this._refreshRoomsListThread = new KDCore.TimedUpdate(60, this._requestRoomsListFromServer.bind(this));
    this._createRoomsList();
    this._requestRoomsListFromServer();
  }

  refreshRooms() {
    if (ANET.PP.isRoomFilterON()) {
      this.applyFilterToRooms();
    }
    return this._roomsListWindow.refreshRooms(this.roomsList);
  }

  //?VERSION
  applyFilterToRooms() {}

  update() {
    super.update();
    return this._refreshRoomsListThread.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _._requestRoomsListFromServer = function() {
    // * В первый раз показываем Loader
    if (this.roomsList == null) {
      HUIManager.showLoader();
    }
    ANNetwork.callback(NMS.Lobby("getRoomsList"), (result) => {
      // * Если сцена была закрыта, а комнаты пришли
      if (!(SceneManager._scene instanceof Scene_NetworkRoomsList)) {
        return;
      }
      this.roomsList = result;
      if (this.roomsList == null) {
        return;
      }
      this.refreshRooms();
      return HUIManager.hideLoader();
    });
    this.refreshRooms();
  };
  _._createRoomsList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 140;
    wx = 50;
    wy = 70;
    this._roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh));
    this._roomsListWindow.setHandler('cancel', this.popScene.bind(this));
    this._roomsListWindow.setHandler('ok', this._onJoinRoomCommand.bind(this));
    this._roomsListWindow.activate();
    return this.addWindow(this._roomsListWindow);
  };
  _._onJoinRoomCommand = function() {
    var roomData;
    roomData = this._roomsListWindow.getSelectedRoom();
    if (NetRoomDataWrapper.isRoomProperToJoin(roomData)) {
      ANNetwork.get(NMS.Lobby("joinToRoom", roomData.name), (result) => {
        return this._onJoinedToRoom(result);
      }, () => {
        console.log("Can't join to Room, server not response in time");
        return this._roomsListWindow.activate();
      });
    } else {
      SoundManager.playBuzzer();
      this._roomsListWindow.activate();
    }
  };
  
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._roomsListWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

//TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkRoomTypeSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Сцена выбора "Новая игра" или "Загрузить" после выбора "Создать комнату"

//TODO: Если опция по возможности сохранения отключена, надо сразу перепрыгивать эту сцену
var Scene_NetworkRoomTypeSelect;

Scene_NetworkRoomTypeSelect = class Scene_NetworkRoomTypeSelect extends Scene_MenuBase {
  constructor() {
    super();
  }

  //TODO: Заголовок какой-нибудь ???
  create() {
    super.create();
    // * Если параметр выключен (сохранять и загружать нельзя), то пропуск данной сцены
    if (!ANET.PP.isSaveLoadAllowed()) {
      // * Если мы входим в сцену, то пропуск сразу в комнату
      if ($gameTemp._nIsForwardTransitionToRoomTypeMenu === true) {
        $gameTemp._nIsForwardTransitionToRoomTypeMenu = null;
        this.commandNewGame();
      } else {
        this.popScene(); // * Выход, не нужны компоненты сцены
      }
      return;
    }
    this._initSceneComponents();
  }

};

(function() {  // ■ END Scene_NetworkRoomTypeSelect.coffee
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomTypeSelect.prototype;
  _._initSceneComponents = function() {
    this._createRoomTypeSelectMenu();
    return this._createGamesToLoadList();
  };
  _._createRoomTypeSelectMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    if (KDCore.isMV()) {
      wh = this.calcWindowHeight(2, true);
    } else {
      // * Хоть команды 2, используется 4, чтобы сразу под курсором была команда
      wh = this.calcWindowHeight(4, true);
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkRoomTypeMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('newGame', this.commandNewGame.bind(this));
    this._commandsWindow.setHandler('continue', this.commandContinue.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _.commandNewGame = function() {
    this._createNewRoom(null); // * новая игра
  };
  _.commandContinue = function() {
    this._commandsWindow.hide();
    this._listWindow.show();
    this._listWindow.activate();
  };
  _._createNewRoom = function(uniqueSaveId) {
    var newRoomData, roomName;
    // * Используем название команаты с предыдущей сцены
    roomName = $gameTemp._nLastRoomName;
    if (!String.any(roomName)) {
      roomName = "Room_" + Math.randomInt(1000);
    }
    $gameTemp._nLastRoomName = null; // * очищаем
    
    // * Собираем данные об новой комнате
    newRoomData = {
      name: roomName,
      gameInfo: ANNetwork.getNetworkGameInfoData(),
      uniqueSaveID: uniqueSaveId
    };
    // * Отправляем данные об текущей игре (клиенте)
    ANNetwork.get(NMS.Lobby("createRoom", newRoomData), (result) => {
      return this._onRoomCreated(result);
    }, () => {
      console.log("Can't create Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onRoomCreated = function(roomData) {
    if (roomData != null) {
      ANNetwork.setRoomMaster(roomData);
      SceneManager.push(Scene_NetworkRoom);
    } else {
      HUIManager.notifyError("Can't create room with name: " + this._lastRoomName);
      this._commandsWindow.activate();
    }
  };
  _._createGamesToLoadList = function() {
    var rect, wh, ww, wx, wy;
    ww = Graphics.boxWidth - 100;
    if (KDCore.isMZ()) {
      wh = this.mainAreaHeight();
    } else {
      wh = Graphics.height - 20;
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onLoadFileSelected.bind(this));
    this._listWindow.setHandler("cancel", this.onLoadFileSelectCancel.bind(this));
    this._listWindow.setMode("loadNet", false);
    if (KDCore.isMZ()) {
      this._listWindow.selectSavefile(0);
    } else {
      this._listWindow.select(0);
    }
    this._listWindow.refresh();
    this._listWindow.hide();
    this.addWindow(this._listWindow);
  };
  _.onLoadFileSelected = function() {
    var info, savefileId;
    if (KDCore.isMZ()) {
      savefileId = this._listWindow.savefileId();
    } else {
      savefileId = this._listWindow.index() + 1;
    }
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      info = DataManager.nGetInfoForSavefileId(savefileId);
      this._createNewRoom(info.nUniqueSaveID);
    } else {
      SoundManager.playBuzzer();
      this._listWindow.activate();
    }
  };
  _.onLoadFileSelectCancel = function() {
    this._listWindow.hide();
    this._commandsWindow.show();
    this._commandsWindow.activate();
  };
})();

// Generated by CoffeeScript 2.5.1
// * Сцена настроек для сетевой игры

//TODO: Пока что просто ввод имени игрока
var Scene_NetworkSettings;

Scene_NetworkSettings = class Scene_NetworkSettings extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    return this._showNameInput();
  }

  stop() {
    this._savePlayerName();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel() || Input.isTriggered('ok')) {
      return this.popScene();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkSettings.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkSettings.prototype;
  _._showNameInput = function() {
    HUIManager.showInput("Enter your name for network...");
    HUIManager.setInputValue(ANGameManager.myPlayerData().name);
  };
  _._savePlayerName = function() {
    var newName;
    newName = HUIManager.getInputValue();
    if (String.any(newName)) {
      ANGameManager.myPlayerData().name = newName;
      // * Отправим на сервер
      ANPlayersManager.sendPlayerName();
      ConfigManager.netPlayerName = newName;
      ConfigManager.save();
    }
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
})();

// ■ END Scene_NetworkSettings.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  //TODO: В MV по другому скорее всего, не помню этот метод

  // * В MV нету метода executeSave, создадим его для совместимости
  if (KDCore.isMV()) {
    //?[NEW, from MZ]
    _.executeSave = function(savefileId) {
      $gameSystem.onBeforeSave();
      if (DataManager.saveGame(savefileId)) {
        this.onSaveSuccess();
      } else {
        this.onSaveFailure();
      }
    };
    // * Переопределим стандартный метод (только в МВ)
    // * Теперь в сетевом режиме он будет использовать новый метод executeSave
    //@[ALIAS]
    ALIAS__onSavefileOk = _.onSavefileOk;
    _.onSavefileOk = function() {
      if (ANNetwork.isConnected()) {
        Scene_File.prototype.onSavefileOk.call(this);
        this.executeSave(this.savefileId());
      } else {
        ALIAS__onSavefileOk.call(this);
      }
    };
  }
  //@[ALIAS, STORED]
  _.nALIAS__executeSave_43243 = _.executeSave;
  _.executeSave = function(savefileId) {
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isSaveOnlyInMenu()) {
        //TODO:
        //@nRequestClientsStatesForSave(savefileId)
        this.nExecuteNetworkSave(savefileId);
      } else {
        this.nExecuteNetworkSave(savefileId);
      }
    } else {
      _.nALIAS__executeSave_43243.call(this, savefileId);
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    if (this.nSaveDataPool == null) {
      return;
    }
    this.nUpdateSavePool();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    this.nClearTempSaveData();
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  _.nUpdateSavePool = function() {
    var ref;
    return (ref = this.nSaveDataPool) != null ? ref.update() : void 0;
  };
  _.nCreateTempSaveData = function() {
    // * Делаем глобальную переменную чтобы DataManager мог перехватить данные
    $gameTemp.nSaveData = this.nSaveDataPool;
    // * Чтобы у всех был одинаковый, нужно при опредлении какой файл загружать
    $gameTemp.nUniqueSaveID = ANET.Utils.generateSaveUniqueId();
  };
  _.nClearTempSaveData = function() {
    $gameTemp.nSaveData = null;
    return $gameTemp.nUniqueSaveID = null;
  };
  // * Запросить проверку статуса других игроков
  // * чтобы они не были "заняты" (например битва или событие)
  // * сейчас используется проверка, что все должны быть в меню
  _.nRequestClientsStatesForSave = function(savefileId) {};
  //TODO: пропустим пока что

  // * Отправить всем команду что нужны данные для сохранения
  _.nExecuteNetworkSave = function(savefileId) {
    // * Создаём пул данных сохранений для каждого игрока
    this.nSaveDataPool = new PlayersDataPool(function() {
      return ANGameManager.anotherPlayers();
    });
    // * Задаём сразу свои данные
    this.nSaveDataPool.setMyData(DataManager.makeSaveContents());
    // * Задаём методы callbacks
    this.nSaveDataPool.onFail(() => {
      return this.nOnWaitSaveDataDone(-1); // * fail
    });
    this.nSaveDataPool.onReady(() => {
      return this.nOnWaitSaveDataDone(savefileId);
    });
    this.nCreateTempSaveData();
    // * Посылаем запрос на сервер ($gameTemp.nUniqueSaveID должен быть уже создан)
    this.nSaveDataPool.register(function() {
      return ANGameManager.sendSaveDataRequest(savefileId);
    });
    this.nOnWaitSaveDataStart();
  };
  _.nOnWaitSaveDataStart = function() {
    return HUIManager.showLoader(600);
  };
  _.nOnWaitSaveDataDone = function(savefileId) {
    HUIManager.hideLoader();
    "SAVE DATA RECEIVED".p(savefileId);
    if (savefileId >= 0) {
      // * Вызываем стандартный метод
      _.nALIAS__executeSave_43243.call(this, savefileId);
    } else {
      this.onSaveFailure();
    }
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Skill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Skill.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Skill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Status.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме зависит от параметра
    if (ANNetwork.isConnected()) {
      return ANET.PP.isOtherPlayersMenuStatusAllowed();
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Status.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    if (ANNetwork.isConnected()) {
      ANNetwork.stop();
    }
    if (ANET.isDEV()) {
      return "Precc C for fast connect".p();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANET.isDEV()) {
      //TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
      return this.nUpdateDebugStart();
    }
  };
  (function() {    // * Добавляем команду сетевой игры в главное меню
    var ALIAS__calcWindowHeight, ALIAS__commandWindowRect, ALIAS__createCommandWindow;
    
    //@[ALIAS]
    ALIAS__createCommandWindow = _.createCommandWindow;
    _.createCommandWindow = function() {
      ALIAS__createCommandWindow.call(this);
      return this._commandWindow.setHandler("network", this.commandNetwork.bind(this));
    };
    //@[ALIAS]
    ALIAS__commandWindowRect = _.commandWindowRect;
    _.commandWindowRect = function() {
      // * little trick to not overwrite method
      this.___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine;
      return ALIAS__commandWindowRect.call(this);
    };
    //@[ALIAS]
    ALIAS__calcWindowHeight = _.calcWindowHeight;
    _.calcWindowHeight = function(numLines, selectable) {
      if (this.___isOneMoreCommand === true) {
        numLines += 1;
        if (!ANET.PP.isSinglePlayerAllowed()) {
          // * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
          numLines -= 1;
        }
      }
      return ALIAS__calcWindowHeight.call(this, numLines, selectable);
    };
  })();
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  (function() {    // DEV FAST GAME START
    // --------------------------------------------------------
    // * Метод только для отладки (быстрый старт на кнопку C)
    _.nUpdateDebugStart = function() {
      if (Input.isTriggered('c')) {
        this.nFastConnectToDevRoom();
      }
      if ($gameTemp._isDevNetGameWaitPlayers === true) {
        if (ANGameManager.playersData.length > 1) {
          return this.nFastGameStart();
        }
      }
    };
    //?EVENT
    _.netOn_lobby_startGame = function() {
      if ($gameTemp._isDevNetGameStart !== true) {
        return;
      }
      Scene_Title.prototype.commandNewGame.call(this);
    };
    _.nFastConnectToDevRoom = function() {
      if (ANET.PP.isActorSelectionAllowed()) {
        console.warn("Can't connect in Dev room in Actor Select mode");
        return;
      }
      ANNetwork.initSystem();
      return ANNetwork.setConnection(function(status) {
        if (status === 1) {
          HUIManager.notifySucess("Connected to server");
          ANGameManager.init();
          return ANNetwork.get(NMS.Lobby("createRoom", {
            name: "dev",
            gameInfo: ANNetwork.getNetworkGameInfoData()
          }), function(roomData) {
            if (roomData != null) {
              ANNetwork.setRoomMaster(roomData);
              return $gameTemp._isDevNetGameWaitPlayers = true;
            } else {
              return ANNetwork.get(NMS.Lobby("joinToRoom", "dev"), function(roomData) {
                $gameTemp._isDevNetGameStart = true;
                return ANNetwork.setRoomJoin(roomData);
              }, function() {
                return console.log("Can't join to Room, server not response in time");
              });
            }
          }, function() {
            return console.log("Can't create Room, server not response in time");
          });
        } else {
          return HUIManager.notifyError("Server not response in time");
        }
      });
    };
    _.nFastGameStart = function() {
      if (ANNetwork.isMasterClient()) {
        $gameTemp._isDevNetGameStart = true;
        return ANNetwork.send(NMS.Lobby("startGame"));
      }
    };
  })();
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {}; // * NOTHING
  _.commandNetwork = function() {
    this._commandWindow.close();
    return SceneManager.push(Scene_NetworkGameMenu);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeScene, _;
  //@[DEFINES]
  _ = SceneManager;
  //@[ALIAS]
  ALIAS__changeScene = _.changeScene;
  _.changeScene = function() {
    if (ANNetwork.isConnected() && this.isSceneChanging()) {
      if (typeof HUIManager !== "undefined" && HUIManager !== null) {
        HUIManager.onGameSceneChanged();
      }
    }
    ALIAS__changeScene.call(this);
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SceneManager;
  //? ONLY FOR MV
  _.isSceneReadyForNetwork = function() {
    return true;
  };
  // * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
  _.isBusyForNetworkData = function() {
    return SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork();
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Элементы интерфейса ANET Z на карте

// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init();
      return;
    }

    isActive() {
      return this.visible === true;
    }

    show() {
      return this.visible = true;
    }

    hide() {
      return this.visible = false;
    }

    terminate() {
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {}

    onGameMessageStart() {}

    onGameMessageEnd() {}

  };
  ANET.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    ANET.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    return this._create();
  };
  _._create = function() {
    this._createNormalUILayer();
    return this._createElements();
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    if (ANET.PP.isGameChatAllowed()) {
      return this._createInGameChat();
    }
  };
  // * Создаём окно чата
  _._createInGameChat = function() {
    //TODO: from parameters
    this.chatWindow = new FWindow_InGameChat(this, 312, 192);
    this._addElementToUI(this.chatWindow);
  };
  // * Добавить элемент на обычный слой
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__retreat, _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  //TEMP
  //TODO: Временное врешение, работает только на мастере
  //@[ALIAS]
  ALIAS__retreat = _.retreat;
  _.retreat = function() {
    if (ANNetwork.isConnected()) {
      if ($gameParty.leader() === this._battler) {
        return this.startMove(300, 0, 30);
      } else {

      }
    } else {
      // * Другой персонаж не убегает
      return ALIAS__retreat.call(this);
    }
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this);
    return this._updateNetworkCharacter();
  };
  
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(character) {
    ALIAS__setCharacter.call(this, character);
    this._isNetworkCharacter = ANNetwork.isConnected() && character instanceof NETCharacter;
    // * Смена методов
    if (this._isNetworkCharacter === true) {
      this._updateNetworkCharacter = this._updateNetworkCharacterMain;
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //?DYNAMIC
  _._updateNetworkCharacter = function() {}; // * DUMMY
  _._updateNetworkCharacterMain = function() {
    return this._updateNetworkStateIcon();
  };
  _._updateNetworkStateIcon = function() {
    if (this.netStateIcon == null) {
      this._createNetworkStateIcon();
    } else {
      this.netStateIcon.x = this.x;
      this.netStateIcon.y = this.y - this.height;
    }
  };
  _._createNetworkStateIcon = function() {
    var e, ref;
    this.netStateIcon = new ANET.Sprite_PlayerNetworkStatus(this);
    this.netStateIcon.setupNETCharacter(this._character);
    try {
      // * Не лучший способ
      if ((ref = SceneManager._scene._spriteset) != null) {
        ref.addNetworkStatusIconForCharacter(this.netStateIcon);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Gauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__smoothness, _;
  //TTT

  //@[DEFINES]
  _ = Sprite_Gauge.prototype;
  //@[ALIAS]
  ALIAS__smoothness = _.smoothness;
  _.smoothness = function() {
    // * Делаем более плавное заполнение для сетевой битвы, чтобы не было видно "рывков"
    // * Рывки есть так как с сервера данные обновляются примерно раз в секунду в бою
    if (ANNetwork.isConnected()) {
      if (this._statusType === "time" && $gameParty.inBattle()) {
        return 60;
      }
    }
    return ALIAS__smoothness.call(this);
  };
})();

// ■ END Sprite_Gauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сообщение в чате
(function() {
  var Sprite_NetChatTextLine;
  Sprite_NetChatTextLine = class Sprite_NetChatTextLine extends KDCore.Sprite {
    constructor() {
      super();
      this.params = this.getSettings();
      this._needAnimation = false;
      this._create();
      return;
    }

    //TODO: From plugin parameters!!!
    getSettings() {
      return this.defaultSettings();
    }

    defaultSettings() {
      return {
        size: {
          w: 306,
          h: 18
        },
        backgroundA: {
          color: "#59a3d9".toCss(),
          opacity: 40
        },
        backgroundB: {
          color: "#59a3d9".toCss(),
          opacity: 70
        },
        textLine: {
          visible: true,
          size: {
            w: 520,
            h: 20
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 4,
            y: -3
          }
        },
        // 1 - Channel
        // 2 - Actor Name
        // 4 - Player Name
        // 3 - Message
        textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3",
        textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3",
        textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3",
        animationSpeedInPx: 18
      };
    }

    // * Применить стиль задника А (по умолчанию)
    applyBackgroundStyleA() {
      return this._applyBackgroundStyle(this.params.backgroundA);
    }

    // * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
    applyBackgroundStyleB() {
      return this._applyBackgroundStyle(this.params.backgroundB);
    }

    // * Написать сообщение
    drawChatMessage(channelId, actorId, text) {
      var actorName, channelIdText, playerName, textFormat;
      if (this._textSpr == null) {
        return;
      }
      if (this.isMyActorMessage(actorId)) {
        textFormat = this.params.textFormatForPlayer;
      } else {
        if (actorId <= 0) {
          textFormat = this.params.textFormatForSystem;
        } else {
          textFormat = this.params.textFormat;
        }
      }
      channelIdText = this._convertChannelIdToText(channelId); //1
      actorName = this._getActorName(actorId); //2
      playerName = this._getPlayerName(actorId); //4
      this._textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName);
    }

    // * Сообщение от меня (текущего клиента), имеет отдельный формат
    isMyActorMessage(actorId) {
      if (ANNetwork.isConnected()) {
        return ANGameManager.myActorId() === actorId;
      } else {
        return false;
      }
    }

    // * Сдвинуть эту строчку выше
    moveUp() {
      this.y -= this.params.size.h;
    }

    // * Анимированное появление сообщения (справа "едет")
    animate() {
      this._textSpr.x = -this.params.textLine.size.w;
      this._needAnimation = true;
    }

    update() {
      super.update();
      this._updateAnimation();
    }

  };
  ANET.link(Sprite_NetChatTextLine);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Sprite_NetChatTextLine.prototype;
  _._applyBackgroundStyle = function(params) {
    if (this._background == null) {
      return;
    }
    this._background.fillAll(params.color);
    this._background.opacity = params.opacity;
  };
  _._create = function() {
    this._createBackground();
    this._createTextLine();
  };
  _._createBackground = function() {
    this._background = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
    this.applyBackgroundStyleA();
    return this.add(this._background);
  };
  _._createTextLine = function() {
    this._textSpr = new AA.Sprite_UITextExt(this.params.textLine);
    return this.add(this._textSpr);
  };
  _._updateAnimation = function() {
    if (this._needAnimation === false) {
      return;
    }
    if (this.params.animationSpeedInPx === 0) {
      this._textSpr.x = 0; // * Сразу, без анимации
    } else {
      this._textSpr.x += this.params.animationSpeedInPx;
    }
    if (this._textSpr.x > 0) { // * Граница
      this._textSpr.x = 0;
    }
    this._needAnimation = this._textSpr.x !== 0;
  };
  _._convertChannelIdToText = function(channelId) {
    if (channelId <= 0) {
      return "ALL";
    }
    return "MAP";
  };
  _._getActorName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    return (ref = $dataActors[actorId]) != null ? ref.name : void 0;
  };
  _._getPlayerName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    if (ANNetwork.isConnected()) {
      return (ref = ANGameManager.getPlayerDataByActorId(actorId)) != null ? ref.name : void 0;
    } else {
      return this._getActorName(actorId);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_PlayerNetworkStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_PlayerNetworkStatus;
  Sprite_PlayerNetworkStatus = class Sprite_PlayerNetworkStatus extends Sprite_Balloon {
    constructor() {
      super();
      this.visible = false;
      return;
    }

    setupNETCharacter(_character) {
      this._character = _character;
      return this._checkStateThread = new KDCore.TimedUpdate(10, this._updateStateCheck.bind(this));
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadAA("PlayerStateIcons");
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      if (iconId == null) {
        if (this.visible === true) {
          this.reset();
        }
      } else {
        if (this._balloonId === iconId) {
          return;
        }
        this._balloonId = iconId;
        this.visible = true;
        this.restart();
      }
    }

    restart() {
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    reset() {
      this._duration = 0;
      this._balloonId = -1;
      return this.visible = false;
    }

    // * Не используется, так как прикрепляется к персонажу
    updatePosition() {} // * EMPTY

    update() {
      super.update();
      this._checkStateThread.update();
      // * Начинается снова
      if (this._balloonId >= 0 && this._duration <= 0) {
        this._firstStep = true;
        return this.restart();
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

    // * PRIVATE =====================================================
    _updateStateCheck() {
      if (this._character == null) {
        return;
      }
      this.setup(this._character.networkStateIcon);
    }

  };
  ANET.link(Sprite_PlayerNetworkStatus);
})();

// ■ END Sprite_PlayerNetworkStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  // * Началась битва
  // * Проверим и спрячем "dead" врагов (если мы присоединились)
  _.nRefreshNetBattle = function() {
    var e, i, len, ref, ref1, s;
    try {
      // * Если мы мастер, то не надо, значит мы НЕ присоединились
      if (ANBattleManager.isBattleMaster()) {
        return;
      }
      ref = this._enemySprites;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s == null) {
          continue;
        }
        if (!((ref1 = s._enemy) != null ? ref1.isAlive() : void 0)) {
          s.hide();
        }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    if (ANNetwork.isConnected()) {
      this._createNetworkCharacters();
      this._createNetworkCharactersInfo();
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _._createNetworkCharacters = function() {
    // * Отдельный массив для удобства
    this._networkCharacterSprites = [];
    this.refreshNetworkCharacters();
  };
  _.refreshNetworkCharacters = function() {
    var char, i, j, len, len1, ref, ref1, spr;
    ref = this._networkCharacterSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      this._removeNetCharInfo(char);
      this._characterSprites.delete(char);
      this._tilemap.removeChild(char);
    }
    this._networkCharacterSprites = [];
    ref1 = $gameMap.netChars();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      char = ref1[j];
      spr = new Sprite_Character(char);
      this._characterSprites.push(spr);
      this._networkCharacterSprites.push(spr);
      this._tilemap.addChild(spr);
    }
  };
  
  // * Специальный слой для иконок статусов и имён сетевых персонажей
  _._createNetworkCharactersInfo = function() {
    this._networkCharactersInfoSprites = [];
    this._networkCharactersInfoLayer = new Sprite();
    this._networkCharactersInfoLayer.z = 9;
    this._tilemap.addChild(this._networkCharactersInfoLayer);
  };
  // * Добавить иконку статуса для персонажа
  _.addNetworkStatusIconForCharacter = function(iconSpr) {
    this._destroyNetStatusIconDuplicate(iconSpr);
    this._networkCharactersInfoSprites.push(iconSpr);
    this._networkCharactersInfoLayer.addChild(iconSpr);
  };
  
  // * Надо найти и удалить, если икона уже существует для персонажа
  // * при refreshNetworkCharacters, их иконки не удаляются с ними
  // * так как находятся на другом слое
  _._destroyNetStatusIconDuplicate = function(iconSpr) {
    var i, len, ref, spr;
    if (iconSpr == null) {
      return;
    }
    ref = this._networkCharactersInfoSprites;
    //TODO: Возможно после создания таблиц имён надо разлелить метод
    // так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
    for (i = 0, len = ref.length; i < len; i++) {
      spr = ref[i];
      if (spr == null) {
        continue;
      }
      if (spr._character === iconSpr._character) {
        this._networkCharactersInfoLayer.removeChild(spr);
        this._networkCharactersInfoSprites.delete(spr);
      }
    }
  };
  // * Удаляет все связанные с персонажем спрайты информации (статус, имя)
  _._removeNetCharInfo = function(char) {
    if (char == null) {
      return;
    }
    return this._destroyNetStatusIconDuplicate(char.netStateIcon);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addText, ALIAS__clear, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (this.isNeedSendLogToServer()) {
      return ANBattleManager.sendWindowLogMessage("clear", null);
    }
  };
  //@[ALIAS]
  ALIAS__addText = _.addText;
  _.addText = function(text) {
    ALIAS__addText.call(this, text);
    if (this.isNeedSendLogToServer()) {
      ANBattleManager.sendWindowLogMessage("add", text);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  _.isNeedSendLogToServer = function() {
    return ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler();
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCancelEnabled, ALIAS__isCursorMovable, ALIAS__isOkEnabled, ALIAS__processCancel, ALIAS__processOk, ALIAS__select, ALIAS__start, ALIAS__update, _;
  //TODO: ПРОВЕРИТЬ НА MV

  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__isCursorMovable = _.isCursorMovable;
  _.isCursorMovable = function() {
    if (this.nIsNetworkSelection()) {
      return ANInterpreterManager.isSharedEventMaster();
    } else {
      return ALIAS__isCursorMovable.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isOkEnabled = _.isOkEnabled;
  _.isOkEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isOkEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__isCancelEnabled = _.isCancelEnabled;
  _.isCancelEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isCancelEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.nIsNetworkSelection()) {
      this.nUpdateNetworkSelection();
    }
  };
  // * Можно это тоже, но не обязательно, и так выбор не может сделать второй игрок
  //@[ALIAS]
  //ALIAS__processHandling = _.processHandling
  //_.processHandling = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processHandling.call(@)

  //@[ALIAS]
  //ALIAS__processTouch = _.processTouch
  //_.processTouch = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processTouch.call(@)

  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (this.nIsNetworkSelection()) {
      // * Если мастер, то выбор проходит и отправляем всем выбор
      if (ANInterpreterManager.isSharedEventMaster()) {
        ALIAS__select.call(this, index);
        return this.nSendNetworkSelection(index);
      } else {
        // * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
        if (this.nIsSelectFromNetworkMaster === true) {
          this.nIsSelectFromNetworkMaster = false;
          return ALIAS__select.call(this, index);
        } else {

        }
      }
    } else {
      // * NOTHING
      // * Клиент сам не может менять выбор
      return ALIAS__select.call(this, index);
    }
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      this.nSetNetworkSelectMode(false);
    }
  };
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    if (ANNetwork.isConnected()) {
      this.nPrepareNetworkSelection();
    }
    ALIAS__start.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processOk = _.processOk;
  _.processOk = function() {
    ALIAS__processOk.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('ok');
    }
  };
  //@[ALIAS]
  ALIAS__processCancel = _.processCancel;
  _.processCancel = function() {
    ALIAS__processCancel.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('cancel');
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  (function() {    // * Выбор (только одного игрока) в общем событии
    // -----------------------------------------------------------------------
    // * Подготовка окна к выбору по сети
    _.nPrepareNetworkSelection = function() {
      // * Обнуляем действие из сети
      $gameTemp.nSelectionActionFromNetwork = null;
      this.nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster);
      // * Сбрасываем флаг (чтобы не повторился на следующем выборе)
      $gameTemp.nRequireChoiceOnlyForMaster = false;
      // * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
      // * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
      this.nIsSelectFromNetworkMaster = true;
      // * Очищаем последний отправленный индекс
      this.__nLastSentIndex = null;
    };
    _.nSetNetworkSelectMode = function(_networkSelectMode) {
      this._networkSelectMode = _networkSelectMode;
    };
    _.nIsNetworkSelection = function() {
      return this._networkSelectMode === true && ANNetwork.isConnected();
    };
    // * Отправить на сервер индекс выбора
    _.nSendNetworkSelection = function(index) {
      // * Чтобы не спамить
      if (this.__nLastSentIndex === index) {
        return;
      }
      this.__nLastSentIndex = index;
      ANInterpreterManager.sendChoiceSelection(index, null);
    };
    // * Отправить на сервер действие (ОК, отмена)
    _.nSendNetworkSelectionAciton = function(action) {
      ANInterpreterManager.sendChoiceSelection(this.index(), action);
    };
    // * Ожидание действие от сервера (не мастер)
    return _.nUpdateNetworkSelection = function() {
      var action, index;
      if ($gameTemp.nSelectionActionFromNetwork == null) {
        return;
      }
      if (ANInterpreterManager.isSharedEventMaster()) {
        return;
      }
      ({action, index} = $gameTemp.nSelectionActionFromNetwork);
      this.nIsSelectFromNetworkMaster = true;
      if (index != null) {
        // * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
        this.select(index);
      }
      switch (action) {
        case 'ok':
          this.processOk();
          break;
        case 'cancel':
          this.processCancel(); // select
          break;
      }
      // * Ничего, выбор всегда идёт
      // * Флаг обработан, очищаем
      $gameTemp.nSelectionActionFromNetwork = null;
    };
  })();
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isFormationEnabled, ALIAS__isSaveEnabled, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  // * Команда Formation запрещена в сетевой игре всегда
  //@[ALIAS]
  ALIAS__isFormationEnabled = _.isFormationEnabled;
  _.isFormationEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isFormationEnabled.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__isSaveEnabled = _.isSaveEnabled;
  _.isSaveEnabled = function() {
    if (ANNetwork.isConnected()) {
      // * Если параметр включён
      return ANET.PP.isSaveLoadAllowed();
    } else {
      return ALIAS__isSaveEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCurrentItemEnabled, _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(rect) {
    ALIAS__initialize.call(this, rect);
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isOtherPlayersVisibleInMenu() === false) {
        this.setOnlyMyPlayerInMenuMode();
      }
    }
  };
  //@[ALIAS]
  ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled;
  _.isCurrentItemEnabled = function() {
    if (ANNetwork.isConnected()) {
      return this.isCurrentItemEnabledInNetworkGame();
    } else {
      return ALIAS__isCurrentItemEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  (function() {    // * Команды Skill, Statis, Equip
    // -----------------------------------------------------------------------
    _.isCurrentItemEnabledInNetworkGame = function() {
      if (this.isSymbolOnlyForMyNetActor()) {
        return this.isCurrentActorIsMyNetActor();
      } else {
        return true;
      }
    };
    // * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = function() {
      var e, isOnlyForMyActor, symbol;
      try {
        // * Плохой вариант получения команды, но работает
        symbol = SceneManager._scene._commandWindow.currentSymbol();
        // * Навыки и экипировка - только для моего персонажа
        isOnlyForMyActor = symbol === 'skill' || symbol === 'equip';
        if (ANET.PP.isOtherPlayersMenuStatusAllowed() === false) {
          isOnlyForMyActor = isOnlyForMyActor || (symbol === 'status');
        }
        return isOnlyForMyActor;
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
    
    // * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    return _.isCurrentActorIsMyNetActor = function() {
      var actor, e;
      try {
        actor = $gameParty.members()[this.index()];
        return actor.isMyNetworkActor();
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
  })();
  (function() {    // * Cписок игроков
    // -----------------------------------------------------------------------
    
    // * Будет видно только моего персонажа
    return _.setOnlyMyPlayerInMenuMode = function() {
      this.maxItems = function() {
        return 1;
      };
      this.actor = function(index) {
        return $gameParty.leader();
      };
      return this.selectLast = function() {
        return this.smoothSelect(0);
      };
    };
  })();
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return ANET.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return ANET.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkActorsList;

Window_NetworkActorsList = class Window_NetworkActorsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this.select(0);
  }

  maxItems() {
    return this.actorsForNetwork().length;
  }

  maxCols() {
    return 2;
  }

  actorsForNetwork() {
    return ANET.PP.actorsForNetwork();
  }

  isCurrentItemEnabled() {
    var e;
    try {
      return this.isEnable(this.index());
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  }

  selectedActorId() {
    if (!this.isCurrentItemEnabled()) {
      return 0;
    }
    return this.getActorData(this.index()).id;
  }

  isEnable(index) {
    var actorId;
    actorId = this.getActorData(index).id;
    return !ANGameManager.playersData.some(function(pl) {
      return pl.actorId === actorId;
    });
  }

  drawItem(index) {
    var actorData, faceBitmap, rect;
    actorData = this.getActorData(index);
    if (actorData == null) {
      return;
    }
    rect = this.itemRect(index);
    faceBitmap = ImageManager.loadFace(actorData.faceName);
    faceBitmap.addLoadListener(() => {
      return this._drawActor(rect, actorData, index);
    });
  }

  itemHeight() {
    return 110;
  }

  getActorData(index) {
    return $dataActors[this.actorsForNetwork()[index]];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkActorsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkActorsList.prototype;
  _._drawActor = function(rect, a, index) {
    this.changePaintOpacity(this.isEnable(index));
    this._drawActorInfo(rect, a);
    this._drawActorClass(rect, a);
    if (!this.isEnable(index)) {
      this._drawNetworkStatus(rect);
    }
    this.changePaintOpacity(1);
  };
  _._drawActorInfo = function(rect, a) {
    this.drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, this.itemHeight() - 8);
    return this.drawText(a.name, rect.x + 120, rect.y + 4, 168);
  };
  _._drawActorClass = function(rect, a) {
    var aClass, className, e;
    try {
      aClass = $dataClasses[a.classId];
      if (aClass != null) {
        className = aClass.name;
      } else {
        className = "";
      }
      if (KDCore.isMV()) {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(ColorManager.crisisColor());
      }
      this.contents.fontSize -= 8;
      this.drawText(className, rect.x + 132, rect.y + 44, 168);
      this.contents.fontSize += 8;
      this.resetTextColor();
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  _._drawNetworkStatus = function(rect) {
    if (KDCore.isMV()) {
      this.changeTextColor(this.deathColor());
    } else {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize -= 8;
    this.drawText('Picked', rect.x + 270, rect.y + 4);
    this.contents.fontSize += 8;
    this.resetTextColor();
  };
})();

// ■ END Window_NetworkActorsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkGameMenu;

Window_NetworkGameMenu = class Window_NetworkGameMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("Create Room", "createRoom");
    this.addCommand("Join Room", "joinRoom");
    this.addCommand("Join Random Room", "joinRandRoom");
    this.addCommand("Settings", "settings");
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkGameMenu.prototype;
})();

// ■ END Window_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkRoomCommands;

Window_NetworkRoomCommands = class Window_NetworkRoomCommands extends Window_HorzCommand {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  maxCols() {
    return 3;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  isCanSelectActors() {
    return ANET.PP.isActorSelectionAllowed() && !this.isLoadGame();
  }

  makeCommandList() {
    var leaveCommandName;
    if (ANNetwork.isMasterClient()) {
      this.addCommand('Start', 'start', this._isStartEnabled()); //TODO: Третий аргумент : enabled
    } else {
      //TODO: Надо проверять все ли готовы, только тогда кнопка активна
      //TODO: Ещё можно проверять больше 1 игрока или нет
      this.addCommand('Ready', 'ready', false);
    }
    //TODO: Пока отключим, нет функционала
    if (this.isCanSelectActors()) {
      this.addCommand("Character", 'character', this._isCharSelectEnabled());
    }
    leaveCommandName = ANNetwork.isMasterClient() ? "Close" : "Leave";
    this.addCommand(leaveCommandName, 'leave');
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomCommands.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomCommands.prototype;
  _._myActorId = function() {
    return ANGameManager.myPlayerData().actorId;
  };
  _._isAllPlayersSelectActors = function() {
    return ANGameManager.playersData.every(function(pl) {
      return pl.actorId !== 0;
    });
  };
  _._isStartEnabled = function() {
    if (!ANET.PP.isSingleActorNetworkGameAllowed()) {
      if (ANGameManager.playersData.length === 1) {
        return false;
      }
    }
    // * Надо выбрать персонажа, потом можно начинать игру
    if (this.isCanSelectActors() || this.isLoadGame()) {
      //TODO: Разрешить загружаться меньшему количеству игроков??? Опция или НЕТ?
      // * Сейчас может загрузить игру два игрока, если играло 3 или более например
      return this._isAllPlayersSelectActors();
    } else {
      return true;
    }
  };
  _._isCharSelectEnabled = function() {
    return this._myActorId() <= 0;
  };
})();

// ■ END Window_NetworkRoomCommands.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Список игроков в комнате
//TODO: Пока нельзя выделять игрока и что-то с ним делать
//TODO: Возможно добавить возможность кикнуть игрока
var Window_NetworkRoomPlayersList;

Window_NetworkRoomPlayersList = class Window_NetworkRoomPlayersList extends Window_Selectable {
  constructor(rect) {
    super(rect);
  }

  //@setBackgroundType ANET.VD.getWindowBackgroundType()
  maxItems() {
    return ANGameManager.playersData.length;
  }

  drawItem(index) {
    var playerData, rect;
    playerData = this.playerData(index);
    if (playerData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawPlayerInfo(rect, playerData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return true;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  playerData(index) {
    return ANGameManager.playersData[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomPlayersList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomPlayersList.prototype;
  _._drawPlayerInfo = function(rect, playerData) {
    var text;
    text = playerData.name;
    if (playerData.id === ANNetwork.room.masterId) {
      text = "\\C[1]" + text;
    } else if (playerData.id === ANNetwork.myId()) {
      text = "\\C[3]" + text;
    }
    if (ANET.PP.isActorSelectionAllowed() || this.isLoadGame()) {
      text += this._getActorName(playerData);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width, 'left');
  };
  _._getActorName = function(playerData) {
    var actorName;
    actorName = "...";
    if (playerData.actorId > 0) {
      actorName = $dataActors[playerData.actorId].name;
    }
    return "\\C[0] [%1]".format(actorName);
  };
})();

// ■ END Window_NetworkRoomPlayersList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Отключить комнаты других игр (параметр или от сервера зависит)
var Window_NetworkRoomsList;

Window_NetworkRoomsList = class Window_NetworkRoomsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this._createNoRoomsMessage();
    this.refreshRooms([]);
    return;
  }

  maxItems() {
    if (this.isHaveAnyRoom()) {
      return this.roomsList.length;
    } else {
      return 0;
    }
  }

  drawItem(index) {
    var rect, roomData;
    roomData = this.roomData(index);
    if (roomData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawRoomInfo(rect, roomData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return NetRoomDataWrapper.isRoomProperToJoin(this.roomData(index));
  }

  isCurrentRoomEnabled() {
    return this.isEnabled(this.index());
  }

  getSelectedRoom() {
    return this.roomData(this.index());
  }

  refreshRooms(roomsList) {
    this.roomsList = roomsList;
    //TODO: @_noRoomsTextSpr мелькает
    this._noRoomsTextSpr.visible = !this.isHaveAnyRoom();
    if (this._noRoomsTextSpr.visible === true) {
      this.select(-1);
    }
    this.refresh();
  }

  isHaveAnyRoom() {
    if (this.roomsList != null) {
      return this.roomsList.length > 0;
    } else {
      return false;
    }
  }

  roomData(index) {
    return this.roomsList[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomsList.prototype;
  _._createNoRoomsMessage = function() {
    var params;
    params = AA.Sprite_UIText.prototype.defaultParams();
    params.size.w = this.width;
    params.size.h = this.height;
    params.font.size = 32;
    params.outline.width = 3;
    this._noRoomsTextSpr = new AA.Sprite_UIText(params);
    this._noRoomsTextSpr.visible = false;
    this._noRoomsTextSpr.drawText("There are no rooms on server");
    return this.addChild(this._noRoomsTextSpr);
  };
  _._drawRoomInfo = function(rect, roomData) {
    var loadGame, roomText, rpgVersion, state;
    rpgVersion = roomData.rpgVersion === 0 ? 'MZ' : 'MV';
    state = roomData.inGame === true ? 'In Game' : 'In Lobby';
    loadGame = NetRoomDataWrapper.isLoadGameRoom(roomData) ? '[from Savefile]' : '';
    // * [VER](GAME NAME) RoomName 0\X (inGame|inLobby)
    roomText = "\\}\\C[1][%1]\\C[3](%2)\\{\\C[0]   %3   \\C[4]%4/%5 \\}\\C[5](%6) \\C[6]%7".format(rpgVersion, roomData.gameTitle, roomData.name, roomData.playersIds.length, roomData.maxPlayers, state, loadGame);
    this.drawTextEx(roomText, rect.x, rect.y, rect.width, 'left');
  };
})();

// ■ END Window_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkRoomTypeMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkRoomTypeMenu;

Window_NetworkRoomTypeMenu = class Window_NetworkRoomTypeMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("New Game", "newGame");
    this.addCommand("Load Game", "continue", this.isHaveSavedGames());
  }

  isHaveSavedGames() {
    return true; //TODO: првоерка наличия сетевых сохранений
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomTypeMenu.prototype;
})();

// ■ END Window_NetworkRoomTypeMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawTitle, ALIAS__isEnabled, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(savefileId) {
    // * Нельзя загружать сетевые сохранения из обычного меню загрузки
    if (this._mode === 'load' && DataManager.nIsNetworkSaveFile(savefileId)) {
      return false;
    } else if (this._mode === 'loadNet') {
      return DataManager.nIsNetworkSaveFile(savefileId);
    } else {
      return ALIAS__isEnabled.call(this, savefileId);
    }
  };
  
  //TODO: Добавить кастомизацию или опцию на отключение
  //@[ALIAS]
  ALIAS__drawTitle = _.drawTitle;
  _.drawTitle = function(savefileId, x, y) {
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      return this.drawText(TextManager.file + " " + savefileId + " [Network game]", x, y, 240);
    } else {
      return ALIAS__drawTitle.call(this, savefileId, x, y);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeCommandList, _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  //@[ALIAS]
  ALIAS__makeCommandList = _.makeCommandList;
  _.makeCommandList = function() {
    ALIAS__makeCommandList.call(this);
    this.addCommand('Network', "network");
    this._nRearangeNetworkCommand();
    if (!ANET.PP.isSinglePlayerAllowed()) {
      this._nRemoveNewGameCommand();
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  // * Чтобы не была последнией, меняю местами с командой options
  _._nRearangeNetworkCommand = function() {
    var e, netCmd, netCommandIndex, optionsCmd, optionsCommandIndex;
    try {
      optionsCommandIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "options";
      }));
      if (optionsCommandIndex < 0) {
        return;
      }
      netCommandIndex = this._list.length - 1;
      optionsCmd = this._list[optionsCommandIndex];
      netCmd = this._list[netCommandIndex];
      this._list[optionsCommandIndex] = netCmd;
      return this._list[netCommandIndex] = optionsCmd;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._nRemoveNewGameCommand = function() {
    var e, newGameIndex;
    try {
      newGameIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "newGame";
      }));
      return this._list.splice(newGameIndex, 1);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x1802=['length','_port','3034','805146jsQHHO','actorsForNetwork','5qKwTCh','_prepareConnectionSettings','slice','2115505gzMBJh','2xzPozb','76535ARHGxG','1XEwcEo','372307XpCHCw','108197gxqQbj','prototype','373595vYsMNO','getParam','92924oUeMyO'];function a0_0x447c(_0xc49002,_0x12e7a7){_0xc49002=_0xc49002-0x13d;var _0x1802ec=a0_0x1802[_0xc49002];return _0x1802ec;}(function(_0x43033b,_0x35b14e){var _0x5ad690=a0_0x447c;while(!![]){try{var _0x62940e=-parseInt(_0x5ad690(0x14d))*-parseInt(_0x5ad690(0x14c))+parseInt(_0x5ad690(0x13e))*parseInt(_0x5ad690(0x14a))+-parseInt(_0x5ad690(0x146))*-parseInt(_0x5ad690(0x14e))+parseInt(_0x5ad690(0x140))+parseInt(_0x5ad690(0x144))+parseInt(_0x5ad690(0x14b))+-parseInt(_0x5ad690(0x149));if(_0x62940e===_0x35b14e)break;else _0x43033b['push'](_0x43033b['shift']());}catch(_0x390a65){_0x43033b['push'](_0x43033b['shift']());}}}(a0_0x1802,0x7ed9e),function(){var _0x17e54b=a0_0x447c,_0x50d4a7;_0x50d4a7=ANET['ParamsManager'][_0x17e54b(0x13d)],_0x50d4a7['actorsForNetwork']=function(){var _0x341e16=_0x17e54b,_0x4faf78;return _0x4faf78=this[_0x341e16(0x13f)](_0x341e16(0x145),[0x1,0x2]),_0x4faf78[_0x341e16(0x141)]>0x2?_0x4faf78[_0x341e16(0x148)](0x0,0x2):_0x4faf78;},_0x50d4a7[_0x17e54b(0x147)]=function(){var _0x421e70=_0x17e54b;this['_ip']='195.161.41.20',this[_0x421e70(0x142)]=_0x421e70(0x143);};}());
})();

//Plugin Alpha_NETZ automatic build by PKD PluginBuilder 1.9.2 09.10.2021
