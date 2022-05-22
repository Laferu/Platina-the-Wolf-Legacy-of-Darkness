/*:
-------------------------------------------------------------------------
@title Party Manager
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.12
@date Aug 4, 2020
@filename HIME_PartyManager.js
@url http://himeworks.com/2016/02/party-manager-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.12 - Create and manage multiples parties in your game.
@help 
-------------------------------------------------------------------------------
== Description ==

In RPG Maker, you have a "party".

A party consists of a group of actors, an inventory of items, weapons, armors,
and gold, and potentially some other information related to this group.

By default, you only have one party, which is what the player will control
throughout the game.

This plugin provides functionality for working with additional parties.

1. You can create new parties. Separate parties can be used to represent
different characters in your game. Each character may have their own set
of followers and inventories as the story progresses.

2. You can switch between parties. If your story switches from one character to
another and you would like to keep their location, characters, inventories,
and other party-related information, you can simply switch to a new party
instead. You could even switch between parties in real-time on the same map
to build additional mechanics related to multiple party control.

3. You can merge parties. By merging parties, you can have different parties
come together as one large party. All of the members, inventories, and other
information will be merged together.

These are the three basic functions that you can use to design your game
using the Party Manager.

Additional functionally will be provided over-time as they are developed.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.12 - Aug 4, 2020
 * Load meta from event note into template event
1.11 - May 1, 2016
 * Implemented actor locking
1.10 - Apr 30, 2016
 * added support for checking if actor is in party
1.9 - Apr 2, 2016
 * added support for "max party members"
1.8 - Mar 28, 2016
 * fixed bug where merging to an idle party crashes
 * renamed "mergeInventory" to "mergePartyInventory"
1.7 - Mar 11, 2016
 * added support for getting idle party event on map by party ID
1.6 - Feb 25, 2016
 * Added `get` convenience method
1.5 - Feb 9, 2016
 * Fixed bug where $gameParty did not reference the active party on reload
 * Implemented party inventory trading methods
1.4 - Feb 5, 2016
 * fixed display bug where idle parties are drawn before map transfers
1.3 - Feb 4, 2016
 * fixed bug where extra sprite remains if you go to the menu and back to map
 * fixed bug where idle parties on other maps are drawn on current map
 * fixed bug where starting a map doesn't setup idle party events
 * added "anyAtRegion" and "anyAtPosition" script calls
1.2 - Feb 3, 2016
 * fixed bug where `setLocation` wasn't passing in the party ID 
1.1 - Feb 2, 2016
 * added support for checking party position
 * added support for checking party region
 * fixed bug where party position not updated as player moves
1.0 - Feb 1, 2016
 * initial release

== Usage ==

--- Quick Summary ---

Managing multiple parties involves

1. Creating parties
2. Switching parties
3. Merging parties

To create party, you need to choose a party ID. The default party ID is 1,
which you can customize in the plugin parameters.

Then you create the party, add some actors, and choose a location if needed.
Let's say I wanted to create a party that I will refer to as 2,
with actors 3 and 4, at location (10, 12) of map 5. Here are the script calls:

  Party.create(2)
  Party.addActor(2, 3)
  Party.addActor(2, 4)
  Party.setLocation(2, 10, 12, 5)
  
Once I have a party set up, I can switch between them.

  Party.switch(2)
  
And I can switch back

  Party.switch(1)
  
Now, if I'm done with the second party and want to merge it into party 1:

  Party.merge(2, 1)

This is all you need to manage multiple parties. Please read the rest of the
instructions for advanced usage beginning at "Idle Parties".

--- Party ID ---

The Party Manager uses the concept of a "party ID" to identify each and every
party in the game.

A party ID is basically a name that you give your parties.
It could be a number like 1, 2, 3, or it could be text like "sub", "main",
and so on.

Party ID's are meant to give you an easy way to manage parties throughout
your game since you will be using events to manage them.

--- Creating Parties ---

Your project begins with one party by default. You can customize the ID that
is assigned to it in the plugin parameters.

All additional parties will need to be created using events or plugins.
To create a party, use the script call

   Party.create( PARTY_ID );
   
For example, you can create parties like this

   Party.create(2);
   Party.create("sub");
   
--- Changing Party Actors ---

When you create a new party, it will have no actors.
You can add or remove party actors using these script calls

   Party.addActor( PARTY_ID, ACTOR_ID );
   Party.removeActor( PARTY_ID, ACTOR_ID);
   
The ACTOR_ID is the ID of the actor in the database.
For example, to add actor 3 to party 2, you would write

   Party.addActor(2, 3);
   
And to remove actor 3 from party "main", you would write

   Party.removeActor("main", 3);
   
--- Switching Parties ---

Once you have created additional parties, you can switch between them.

To switch parties, use the script call

   Party.switch( PARTY_ID );
   
So for example, if you want to switch to party 2, you would write

   Party.switch(2);

When you switch parties, active control goes to the selected party, and the
other party will go "idle". You can see the other party on the map if both
parties are on the same map. For more information, refer to the section
on "Idle Parties" below.

--- Changing Party Locations ---

In this system, all parties have locations. When you switch parties, the game
will change to where the party is currently located.

By default, when you create a party, it will be located where the current
party is located.

You can change a party's location during the game using the following script
call:

   Party.setLocation( PARTY_ID, X, Y );
   Party.setLocation( PARTY_ID, X, Y, MAP_ID );
   
Where X and Y is the position on the map, and the MAP_ID is the ID of the
map that you would like to set the party's location.

If you omit the map ID, it is assumed to be the current map.

--- Merging Parties ---

When you want two parties to merge together, you can use the script call

   Party.merge(PARTY_ID1, PARTY_ID2)
   
Which means "merge party ID1 into party ID2". If the first party is the
current party, then the game will automatically switch to the second party.

--- Party Trading ---

You can trade items and gold between parties.

To transfer items from one party to another, use the script call

  Party.tradeItem( ID1, ID2, ITEM, COUNT )
  
Where ID1 is the ID of the party to take the item from, and ID2 is the
ID of the party to give the item to.

The ITEM is an item object. There are many different items in the game,
including items, weapons, and armors. By default, you would access them
like this:

   $dataItems[2]   - item 2
   $dataWeapons[3] - weapon 3
   $dataArmors[12] - armor 12
   
The COUNT is just the amount of the specified item you would like to trade.
If the first party does not have enough, it would simply trade as much as it
can, instead of failing.

You can also trade gold from one party to another. Use the script call

  Party.tradeGold( ID1, ID2, amount )
  
Where you're trading the given amount of gold from party ID1 to party ID2.
If party 1 does not have enough gold, the game will transfer as much as it can

-- Idle Parties --

By default, if you have multiple parties, only one party can be "active" at
any time. The other parties are said to be "idle". The active party is the
party that you currently control.

When you switch parties, you are switching which party is the currently active
party.

Idle parties are drawn on the map as events if they are on the same map.
At this point, they are just visual indicators and do nothing. However, in the
future, you will be able to create your own events to determine how these
idle parties should behave when you interact with them.

--- Active Party Variable ---

In the plugin parameters, you can choose something called an
"active party variable", which is just a game variable that keeps track of
which party is currently active. This is mostly for  convenience purposes in
your events.

RPG Maker assumes variables are numbers, but you can store text as well.
However, in your conditional branches, you will need to use script conditional
branches in order to check that.

--- Checking Party Locations ---

Idle parties are events on the map, but unlike map events, these events do not
have a fixed ID. Instead, you would check the party's position directly!

To check if a party is at a specific location, you can use the following
script calls

   Party.atLocation( PARTY_ID, X, Y );
   Party.atLocation( PARTY_ID, X, Y, MAP_ID);
   
If the MAP_ID is not provided, it is assumed to be the current map ID.
This means that you could check a party's position across different maps.

If you wanted to know if there were *any* parties at a location, you can
use this script call instead

   Party.anyAtLocation( X, Y );
   Party.anyAtLocation( X, Y, MAP_ID );
   
You can also check if a party is at a specific region

   Party.atRegion( PARTY_ID, REGION_ID );
   
And similarly, to check if any party is at a specific region:

   Party.anyAtRegion( REGION_ID );
   
Note that region ID checks can only be done for the current map.

--- Obtaining Idle Party Event Reference ---

If for some reason you want to have a reference to the event that represents
an idle party, you can use query the map:

   $gameMap.idlePartyEvent(PARTY_ID)
   
Which will return a reference to a Game_PartyEvent object, which is basically
a Game_Event except with some special idle party logic.

--- Setting Max Number of Party Members ---

By default, there is no limit to how many members you can have in a party.
This is different from the number of "battle" party members, which determines
how many party members will actually participate in battle.

In the plugin parameters you can specify how many party members each party
can have.

To check if the current party, or a certain party is full, you can use
the script calls

  $gameParty.isPartyFull()
  Party.isPartyFull( PARTY_ID )
  
Which will return true or false depending on whether the party is full or not.

You can use the script call

  Party.setMaxPartyMembers( PARTY_ID, NUMBER )
  
To change this limit at anytime.

--- Checking if an actor is in a party ---

To check whether an actor is in a certain party, you can use the script call

  Party.hasActor( PARTY_ID, ACTOR_ID )

Which will return true if the specified actor is in that party.

--- Locking Actors to Party ---

To lock an actor to a party, use the script call

  $gameActors.actor( ACTOR_ID ).lockToParty(true)
  
To remove the lock, use

  $gameActors.actor( ACTOR_ID ).lockToParty(false)
  
Where the ACTOR_ID is the ID of the actor you wish to operate on.

-------------------------------------------------------------------------------
@param Default Party ID
@desc The ID that will be used for the "default party", which is
the first party when you start the game.
@default 1

@param Active Party Variable
@desc The variable to use to store the current active party.
Convenient for conditional branches or other plugins.
@default 999

@param Max Party Members
@desc Default number of party members you can have in a party.
Includes members that won't be in battle.
@default -1
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_PartyManager = 1;
TH.PartyManager = TH.PartyManager || {};

/* For script call purposes */
function Party() {
  // static object
};

/* Main party manager */
function Game_Parties() {
  this.initialize.apply(this, arguments);
};

/* A special event that represents an idle event */
function Game_PartyEvent() {
  this.initialize.apply(this, arguments);
};

Game_PartyEvent.prototype = Object.create(Game_Event.prototype);
Game_PartyEvent.prototype.constructor = Game_PartyEvent;

(function ($) {

  // hardcode for now
  $.templateEvent = {"id":9999,"name":"EV015","note":"","pages":[{"conditions":{"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0},"directionFix":false,"image":{"characterIndex":0,"characterName":"","direction":2,"pattern":0,"tileId":0},"list":[{"code":0,"indent":0,"parameters":[]}],"moveFrequency":3,"moveRoute":{"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false},"moveSpeed":3,"moveType":0,"priorityType":1,"stepAnime":true,"through":false,"trigger":0,"walkAnime":true}],"x":13,"y":25}
  
  $.params = PluginManager.parameters("HIME_PartyManager");
  $.defaultPartyId = $.params["Default Party ID"].trim();
  $.activePartyVarId = Math.floor($.params["Active Party Variable"]);
  $.maxPartyMembers = Math.floor($.params["Max Party Members"]);

  /***************************************************************************/
  
  var TH_DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    TH_DataManager_createGameObjects.call(this);
    $gameParties = new Game_Parties();
    
    // need to load metadata from the event as well
    this.extractMetadata($.templateEvent)
  };
  
  var TH_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = TH_DataManager_makeSaveContents.call(this); 
    contents.parties = $gameParties;
    return contents;
  };
  
  var TH_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    TH_DataManager_extractSaveContents.call(this, contents);
    $gameParties = contents.parties;
    $gameParty = $gameParties.getActiveParty();
  };
  
  /***************************************************************************/

  Game_Parties.prototype.initialize = function() {
    this._parties = {};
    
    // defaults
    var id = $.defaultPartyId;
    $gameParty.setId(id);
    $gameParty.setLocation($dataSystem.startMapId, $dataSystem.startX, $dataSystem.startY);
    this._parties[id] = $gameParty;
    this._activeId = id;
    $gameVariables.setValue($.activePartyVarId, id);
  };
  
  Game_Parties.prototype.parties = function() {
    var data = [];
    var ids = Object.keys(this._parties);
    for (var i = 0; i < ids.length; i++) {
      data.push(this._parties[ids[i]]);
    }
    return data;
  };
  
  Game_Parties.prototype.idleParties = function() {
    var data = [];
    var ids = Object.keys(this._parties);
    for (var i = 0; i < ids.length; i++) {
      if (this._activeId !== ids[i]) {
        data.push(this._parties[ids[i]]);
      }
    }
    return data;
  };
  
  Game_Parties.prototype.getActiveParty = function() {
    return this._parties[this._activeId];
  };
  
  Game_Parties.prototype.isActive = function(id) {    
    return id.toString() === this._activeId;
  };
  
  Game_Parties.prototype.getParty = function(id) {
    return this._parties[id];
  };
  
  /* Create a new party with the specified ID and members.
   * If party already exists, do not replace it
   */
  Game_Parties.prototype.createParty = function(id) {
    id = id.toString();    
    var party = this._parties[id];
    if (!party) {
      var party = new Game_Party();
      party.setId(id);
      party.setLocation($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
      this._parties[id] = party;
    }
    return party;
  };
  
  Game_Parties.prototype.addActor = function(id, actorId) {
    this._parties[id].addActor(actorId);
  };  
  
  Game_Parties.prototype.removeActor = function(id, actorId) {
    this._parties[id].removeActor(actorId);
  };  
  
  Game_Parties.prototype.setLocation = function(id, x, y, mapId) {
    if (mapId === undefined) {
      mapId = $gameMap.mapId();
    }
    this._parties[id].setLocation(mapId, x, y);
    $gamePlayer.refreshPartyLocation();
  };
  
  Game_Parties.prototype.deleteParty = function(id) {
    delete this._parties[id];
  };
  
  /* Switch to the party with the specified ID */
  Game_Parties.prototype.switchParty = function(id) {
    id = id.toString();
    
    if (this.canSwitch(id)) {
    
      var oldParty = this._parties[this._activeId]
      if (oldParty) {
        this._parties[this._activeId].prepareSwitch();    
      }      
      this._activeId = id;       
      $gameVariables.setValue($.activePartyVarId, id);
      $gameParty = this._parties[id];
      $gamePlayer.refreshPartyLocation();
    }    
    return this._parties[this._activeId];
  };
  
  Game_Parties.prototype.canSwitch = function(id) {
    if (id === this._activeId) {
      return false;
    }
    return true;
  };
  
  Game_Parties.prototype.canMerge = function(id1, id2) {
    if (id1 === id2) {
      return false;
    }
    return true;
  };
  
  Game_Parties.prototype.canTrade = function(id1, id2) {
    if (id1 === id2) {
      return false;
    }
    return true;
  };
  
  /* Merges party 1 into party 2. Party 1 is then deleted
   */
  Game_Parties.prototype.merge = function(id1, id2) {
    id1 = id1.toString();
    id2 = id2.toString();
    if (this.canMerge(id1, id2)) {
      var party1 = this.getParty(id1);
      var party2 = this.getParty(id2);
      party2.mergeWith(party1);
      this.deleteParty(id1);
      
      if (this._activeId === id1) {
        this.switchParty(id2);
      }
    }    
    $gamePlayer.refreshPartyLocation();
    return party2;
  };
  
  Game_Parties.prototype.atLocation = function(id, x, y, mapId) {
    if (mapId === undefined) {
      mapId = $gameMap.mapId();
    }
    return this._parties[id].atLocation(mapId, x, y);
  };
  
  /* Returns true if there are any parties at the specified location */
  Game_Parties.prototype.anyAtLocation = function(x, y, mapId) {
    if (mapId === undefined) {
      mapId = $gameMap.mapId();
    }
    var parties = this._parties;
    var ids = Object.keys(parties);
    for (var i = 0; i < ids.length; i++) {
      if (parties[ids[i]].atLocation(mapId, x, y)) {
        return true;
      }
    }
    return false;
  };
  
  /* Returns true if there are any parties at the specified region */
  Game_Parties.prototype.atRegion = function(id, regionId) {
    return this._parties[id].atRegion(regionId);
  };
  
  Game_Parties.prototype.anyAtRegion = function(regionId) {
    var parties = this._parties;
    var ids = Object.keys(parties);
    for (var i = 0; i < ids.length; i++) {    
      if (parties[ids[i]].atRegion(regionId)) {
        return true;
      }
    }
    return false;
  };
  
  /* Sends an item from party 1 to party 2 */
  Game_Parties.prototype.tradeItem = function(id1, id2, item, count) {
    if (this.canTrade(id1, id2)) {
      var party1 = this._parties[id1];
      var party2 = this._parties[id2];      
      var countAvailable = party1.numItems(item);
      var countTransferred = Math.min(count, countAvailable);      
      party1.loseItem(item, countTransferred, false);
      party2.gainItem(item, countTransferred, false);
    }
  };
  
  /* Sends gold from party 1 to party 2 */
  Game_Parties.prototype.tradeGold = function(id1, id2, amount) {
    if (this.canTrade(id1, id2)) {
      var party1 = this._parties[id1]
      var party2 = this._parties[id2]
      var goldAvailable = party1.gold();
      var goldTransferred = Math.min(amount, goldAvailable);
      
      party1.loseGold(goldTransferred);
      party2.gainGold(goldTransferred);
    }    
  };
  
  Game_Parties.prototype.setMaxPartyMembers = function(id, amount) {
    var party = this._parties[id];
    if (party) {
      party.setMaxPartyMembers(amount);
    }
  };
  
  Game_Parties.prototype.isPartyFull = function(id) {
    var party = this._parties[id];
    if (party) {
      return party.isPartyFull();
    }
  };
  
  Game_Parties.prototype.hasActor = function(id, actorId) {
    var party = this._parties[id];
    if (party) {
      return party.isActorInParty(actorId);
    }
  };

  /***************************************************************************/
  
  Object.defineProperties(Game_Party.prototype, {
    id: { get: function() { return this._id; }, configurable: true }
  });
  
  var TH_GameParty_initialize = Game_Party.prototype.initialize
  Game_Party.prototype.initialize = function() {
    TH_GameParty_initialize.call(this);
    this._maxPartyMembers = $.maxPartyMembers;
    this._location = { mapId: 0, x: 0, y: 0 }
    this._direction = 2;
  };
  
  Game_Party.prototype.setId = function(id) {
    this._id = id;
  }
  
  Game_Party.prototype.location = function() {
    return this._location;
  };
  
  Game_Party.prototype.direction = function() {
    return this._direction;
  };
  
  Game_Party.prototype.setLocation = function(mapId, x, y) {
    this._location = {mapId: mapId, x: x, y: y};
  };
  
  Game_Party.prototype.mergeWith = function(otherParty) {
    this.mergeMembers(otherParty);
    this.mergePartyInventory(otherParty);    
  };
  
  Game_Party.prototype.mergeMembers = function(otherParty) {
    var members = otherParty.members();
    for (var i = 0; i < members.length; i++) {
      this.addActor(members[i].actorId());
    }
  };
  
  Game_Party.prototype.mergePartyInventory = function(otherParty) {
    this.mergeWeapons(otherParty);
    this.mergeArmors(otherParty);
    this.mergeItems(otherParty);
    this.mergeGold(otherParty);
  };
  
  Game_Party.prototype.mergeWeapons = function(otherParty) {
    var objects = otherParty.weapons();
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      var num = otherParty.numItems(obj);
      this.gainItem(obj, num, false);
    }
  };
  
  Game_Party.prototype.mergeArmors = function(otherParty) {
    var objects = otherParty.armors();
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      var num = otherParty.numItems(obj);
      this.gainItem(obj, num, false);
    }
  };
  
  Game_Party.prototype.mergeItems = function(otherParty) {
    var objects = otherParty.items();
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      var num = otherParty.numItems(obj);
      this.gainItem(obj, num, false);
    }
  };
  
  Game_Party.prototype.mergeGold = function(otherParty) {
    this.gainGold(otherParty.gold());
  };
  
  Game_Party.prototype.setMaxPartyMembers = function(amount) {
    this._maxPartyMembers = amount;
  };
  
  /* Total number of members that can be in the party */
  Game_Party.prototype.maxPartyMembers = function() {
    return this._maxPartyMembers;
  };
  
  /* Cannot add actor if party is full */
  var TH_GameParty_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function(actorId) {
    if (!this.isPartyFull()) {
      TH_GameParty_addActor.call(this, actorId);
    }
  };
  
  /* Returns true if the party cannot hold anymore actors */
  Game_Party.prototype.isPartyFull = function() {
    var max = this.maxPartyMembers();
    return max > 0 && this._actors.length >= this.maxPartyMembers();
  };
  
  Game_Party.prototype.isActorInParty = function(actorId) {
    return this._actors.contains(actorId);
  }
  
  /* Store location and direction */
  Game_Party.prototype.prepareSwitch = function() {
    this.updateLocation();    
  };
  
  Game_Party.prototype.updateLocation = function() {    
    this._direction = $gamePlayer.direction();
    this.setLocation($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
  };
  
  Game_Party.prototype.atLocation = function(mapId, x, y) {
    var loc = this._location;
    return !!(loc.mapId === $gameMap.mapId() && x === loc.x && y === loc.y);
  };
  
  Game_Party.prototype.atRegion = function(regionId) {
    var loc = this._location;
    return !!(loc.mapId === $gameMap.mapId() && $gameMap.regionId(loc.x, loc.y));
  };
  
  /***************************************************************************/  
  
  var TH_GameBattler_initialize = Game_Battler.prototype.initialize;
  Game_Battler.prototype.initialize = function() {
    TH_GameBattler_initialize.call(this);
    this._isPartyLocked = false;
  };
  
  Game_Battler.prototype.lockToParty = function(bool) {
    this._isPartyLocked = bool;
  };
    
  Game_Actor.prototype.isPartyLocked = function() {
    return this._isPartyLocked;
  };
  
  /***************************************************************************/
  
  /* New party? Maybe we need to move to a different map
   * Assumes one player game
   */
  Game_Player.prototype.refreshPartyLocation = function() {    
    var loc = $gameParty.location();
    if (loc.mapId !== $gameMap.mapId()) {
      this.reserveTransfer(loc.mapId, loc.x, loc.y, $gameParty.direction(), 2)   
    }
    else {
      this.setPosition(loc.x, loc.y);
      this._followers.synchronize(loc.x, loc.y, this.direction())
      this.center(loc.x, loc.y);
      this.setDirection($gameParty.direction());
      this.refresh();
      $gameMap.refreshIdlePartyEvents();
    }    
  };
  
  var TH_GamePlayer_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function(sceneActive) {
    TH_GamePlayer_update.call(this, sceneActive);
    $gameParty.updateLocation();
  };
  
  /***************************************************************************/
  
  Game_PartyEvent.prototype.initialize = function(party, mapId, eventId) {
    this._party = party;
    Game_Event.prototype.initialize.call(this, mapId, eventId);
  }
  
  Game_PartyEvent.prototype.event = function() {
    return $.templateEvent;
  };
  
  Game_PartyEvent.prototype.refresh = function() {    
    Game_Event.prototype.refresh.call(this);
    var leader = this._party.leader();
    var loc = this._party.location();
    this.setPosition(loc.x, loc.y);
    this.erased = Party.isActive(this._party);
    if (leader) {
      this._characterName = leader.characterName();
      this._characterIndex = leader.characterIndex();
    }
    else {
      this._characterName = "";
      this._characterIndex = 0;
    }
    this.setDirection(this._party.direction());
  };
  
  /***************************************************************************/  
  
  var TH_GameMap_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    TH_GameMap_initialize.call(this);
    this._idlePartyEvents = {};
  }
  
  Game_Map.prototype.idlePartyEvents = function() {
    var data = [];
    var keys = Object.keys(this._idlePartyEvents);
    for (var i = 0; i < keys.length; i++) {      
      var evId = this._idlePartyEvents[keys[i]];
      data.push(this._events[evId]);
    }
    return data;
  };
  
  Game_Map.prototype.idlePartyEvent = function(partyId) {
    return this._events[this._idlePartyEvents[partyId]];
  };
  
  var TH_GameMap_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function() {
    TH_GameMap_setupEvents.call(this);
    this.setupIdlePartyEvents();
  };
  
  Game_Map.prototype.setupIdlePartyEvents = function() {
    var ids = Object.keys(this._idlePartyEvents);
    for (var i = 0; i < ids.length; i++) {
      this.removeIdlePartyEvent(ids[i]);
    }
    var parties = $gameParties.idleParties();
    for (var i = 0; i < parties.length; i++) {
      this.addIdlePartyEvent(parties[i]);
    }
  };
  
  Game_Map.prototype.refreshIdlePartyEvents = function() {  
    this.setupIdlePartyEvents();
    SceneManager._scene._spriteset.refreshIdlePartyEvents();
  };
  
  Game_Map.prototype.addIdlePartyEvent = function(party) {
    var partyId = party.id;
    if (!this._idlePartyEvents[partyId] && party.location().mapId === this._mapId) {
      // potential memory issue if you switch too many times
      id = this._events.length + 1;
      
      // hardcode some random ID for now.
      this._events[id] = new Game_PartyEvent(party, this._mapId, id);
      this._idlePartyEvents[partyId] = id;
    }
  };
  
  Game_Map.prototype.removeIdlePartyEvent = function(id) {
    var evId = this._idlePartyEvents[id];
    this._events[evId] = null;
    delete this._idlePartyEvents[id];
  };
  
  /***************************************************************************/ 
  
  Sprite_Character.prototype.isIdleParty = function() {
    return this._character.constructor === Game_PartyEvent;
  };
  
  /***************************************************************************/ 
  
  var TH_SpritesetMap_initialize = Spriteset_Map.prototype.initialize;
  Spriteset_Map.prototype.initialize = function() {
    this._idlePartySprites = [];
    TH_SpritesetMap_initialize.call(this);
  };
  
  var TH_SpritesetMap_createCharacters = Spriteset_Map.prototype.createCharacters;
  Spriteset_Map.prototype.createCharacters = function() {
    TH_SpritesetMap_createCharacters.call(this);
    
    // Go through the sprites and make sure we keep track of these to avoid
    // double creation
    for (var i = 0; i < this._characterSprites.length; i++) {
      if (this._characterSprites[i].isIdleParty()) {
        this._idlePartySprites.push(this._characterSprites[i]);
      }
    }
  };
  
  Spriteset_Map.prototype.addIdlePartyEvent = function(ev) {
    var spr = new Sprite_Character(ev);    
    this._characterSprites.push(spr)
    this._idlePartySprites.push(spr);
    this._tilemap.addChild(spr);
  }  
  
  Spriteset_Map.prototype.refreshIdlePartyEvents = function() {
    this.deleteIdlePartyEvents();
    this.createIdlePartyEvents();    
  };
  
  Spriteset_Map.prototype.createIdlePartyEvents = function() {    
    var partyEvents = $gameMap.idlePartyEvents();
    for (var i = 0; i < partyEvents.length; i++) {
      this.addIdlePartyEvent(partyEvents[i]);
    }
  };
  
  Spriteset_Map.prototype.deleteIdlePartyEvents = function() {
    for (var i = 0; i < this._idlePartySprites.length; i++) {
      var spr = this._idlePartySprites[i];
      var index = this._characterSprites.indexOf(spr);
      if (index > -1) {
        this._characterSprites.splice(index, 1);
      }      
      this._tilemap.removeChild(spr);
    }
    this._idlePartySprites = [];
  };
  
  /***************************************************************************/  
  
  Party.create = function(id, members, location) {
    return $gameParties.createParty(id, members, location);
  };
  
  Party.get = function(id) {
    return $gameParties.getParty(id);
  };
  
  Party.addActor = function(id, actorId) {
    return $gameParties.addActor(id, actorId);
  };
  
  Party.removeActor = function(id, actorId) {
    return $gameParties.removeActor(id, actorId);
  };
  
  Party.hasActor = function(id, actorId) {
    return $gameParties.hasActor(id, actorId);
  };
  
  Party.setLocation = function(id, x, y, mapId) {    
    return $gameParties.setLocation(id, x, y, mapId);
  }
  
  Party.switch = function(id) {
    return $gameParties.switchParty(id);
  };
  
  Party.merge = function(id1, id2) {
    return $gameParties.merge(id1, id2);
  };
  
  Party.isActive = function(id) {
    return $gameParties.isActive(id);
  };
  
  Party.atLocation = function(id, x, y, mapId) {
    return $gameParties.atLocation(id, x, y, mapId);
  };
  
  Party.atRegion = function(id, regionId) {
    return $gameParties.atRegion(id, regionId);
  };
  
  Party.anyAtLocation = function(x, y, mapId) {
    return $gameParties.anyAtLocation(x, y, mapId);
  };
  
  Party.anyAtRegion = function(regionId) {
    return $gameParties.anyAtRegion(regionId);
  };
  
  Party.tradeItem = function(id1, id2, item, count) {
    $gameParties.tradeItem(id1, id2, item, count);
  };
  
  Party.tradeGold = function(id1, id2, amount) {  
    $gameParties.tradeGold(id1, id2, amount);
  };
  
  Party.setMaxPartyMembers = function(id, amount) {
    $gameParties.setMaxPartyMembers(id, amount);
  };
  
  Party.isPartyFull = function(id) {
    return $gameParties.isPartyFull(id);
  };
})(TH.PartyManager);