/*:
-------------------------------------------------------------------------------
@target MV MZ
@title Grid Battle
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Sep 9, 2020
@filename HIME_GridBattle.js
@url https://himeworks.com/2020/08/grid-battle-engine/
@

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
@plugindesc v1.0 - Adds grid positioning system to the RPG Maker battle system
@help 
-------------------------------------------------------------------------------
== Description ==

This add-on allows you to use the grid system with the default battle system.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but contact me first
- Please provide credits to HimeWorks

== Change Log ==

* 1.1
  - removed BattleNode object from Game_Battler. Uses node ID's now
    to avoid circular reference
* 1.0
  - initial release

= Usage ==

In the plugin parameters, pick a common event for your test battle grid setup.
If you don't set this up, the game will crash since it doesn't have a grid to
use. You might consider using this as your "default" grid setup as well.

 -- Understanding Battle Grids --
 
This plugin adds battle grids to your battle system.
Every battlefield needs to have at least one battle grid.

A "Battle Grid Config" describes a battlefield. 
It consists of one or more battle grids, so you can choose to have
one grid for all of your battlers, or have multiple grids and place battlers
on different grids.


 -- Advanced use: modifying grids using script calls

This is the general process for setting up a one-grid battlefield.
You can copy this into a script call. You might need to split it up
into separate script calls if it's too long for one script box.
 
  var config = GRID.getBattleConfig("Two Grid")
  var grid = config.getGrid(1);
  grid.setTileSize(64, 64)
  grid.setGridPosition(64 * 9, 64 * 3)
  grid.setSize(4, 10)
  grid.setPartyPosition(1, [1,8])
  grid.setPartyPosition(2, [2,9])
  grid.setPartyPosition(3, [3,8])
  grid.setPartyPosition(4, [4,9])
  grid.setEnemyPosition(1, [1,2])
  grid.setEnemyPosition(2, [1,3])
  grid.setEnemyPosition(3, [1,2])
  grid.setEnemyPosition(4, [1,3])
  GRID.useBattleConfig("Two Grid")

-------------------------------------------------------------------------------

@param Grid Configs
@type struct<GridConfig>[]
@default ["{\"Name\":\"Two Grid\",\"Grids\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Tile Width\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Tile Height\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Number of Rows\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"Number of Columns\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Screen Offset X\\\\\\\":\\\\\\\"576\\\\\\\",\\\\\\\"Screen Offset Y\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Highlights\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"Empty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Damage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFF0000\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Recover\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0x00FF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"None\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFFFF\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"Party Positions\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Enemy Positions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Tile Width\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Tile Height\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Number of Rows\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"Number of Columns\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Screen Offset X\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Screen Offset Y\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Highlights\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"Empty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Damage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFF0000\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Recover\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0x00FF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"None\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFFFF\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"Party Positions\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Enemy Positions\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}","{\"Name\":\"One Grid\",\"Grids\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Tile Width\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Tile Height\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Number of Rows\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"Number of Columns\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"Screen Offset X\\\\\\\":\\\\\\\"64\\\\\\\",\\\\\\\"Screen Offset Y\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Highlights\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"Empty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Damage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFF0000\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Recover\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0x00FF00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"None\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0xFFFFFF\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"Party Positions\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"9\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"11\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Enemy Positions\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"id\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Row\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Column\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}"]
@desc List of battle grid configurations

@param Default Grid
@type text
@default Two Grid
@desc Default grid to use for your battles. Can be changed in-game

@param Show Grid
@type boolean
@default true
@desc Displays a border for the grid

-------------------------------------------------------------------------------
*/ 
/*~struct~GridConfig:
 * @param Name
 * @type text
 * @desc Name of your grid config
 
 * @param Grids
 * @type struct<Grid>[]
 * @desc List of grids inside this grid config 
 
 * @param Connections
 * @type struct<GridConnection>[]
 * @default ["{\"Grid Name\":\"1\",\"Target Grid Name\":\"2\",\"Direction\":\"Right\",\"Offset Row\":\"0\",\"Offset Column\":\"0\"}"]
 * @desc How the grids should be virtually connected (for distance/selection)
 */

/*~struct~Grid:
 * @param Name
 * @type text
 * @desc Name of this specific grid  
 
 * @param Tile Width
 * @type number
 * @desc Width of each tile, in pixels 
 *
 * @param Tile Height
 * @type number
 * @desc Height of each tile, in pixels 
 *
 * @param Number of Rows
 * @type number
 * @desc Number of rows in your grid
 *
 * @param Number of Columns
 * @type number
 * @desc Number of column in your grid
 *
 * @param Screen Offset X
 * @type number
 * @desc offset from left-side of screen, in pixels
 *
 * @param Screen Offset Y
 * @type number
 * @desc offset from top of screen, in pixels
 *
 * @param Highlights
 * @type struct<Highlights>
 * @desc Default tile highlight colours. Specify in hex RGB format.
 *
 * @param Party Positions
 * @type struct<TileData>[]
 *
 * @param Enemy Positions
 * @type struct<TileData>[]
 *
 */

/*~struct~GridPosition:
 * @param row
 * @type number
 * @desc Row on your grid. Row 1 is top row
 
 * @param column
 * @type number
 * @desc Row on your grid. Column 1 is left column
 */
/*~struct~TileData:
 * @param id
 * @type text 
 
 * @param Row
 * @type number
 * @desc
 
 * @param Column
 * @type number
 * @desc 
 */

/*~struct~GridConnection:
 * @param Grid Name
 * @type text
 * @desc Name of grid
 *
 * @param Target Grid Name
 * @type text
 * @desc Name of the grid to join to
 * 
 * @param Direction
 * @type select
 * @option Left
 * @option Right
 * @option Up
 * @option Down
 * @desc Which direction to join to the target grid
 *
 * @param Offset Row
 * @type number
 * @default 0
 * @desc Number of rows to move up or down during join
 *
 * @param Offset Column
 * @type number
 * @default 0
 * @desc Number of columns to move left or right during join
 */
/*~struct~Highlights:
 * @param Empty
 * @type text
 * @default 0xFFFF00
 * @desc Tile color when action doesn't affect target
 *
 * @param Damage
 * @type text
 * @default 0xFF0000
 * @desc Tile color when action is "damage" type
 *
 * @param Recover
 * @type text
 * @default 0x00FF00 
 * @desc Tile color when action is "recover" type
 *
 * @param None
 * @type text
 * @default 0xFFFFFF 
 * @desc Tile color when not highlighted
 */
 
/*
-------------------------------------------------------------------------------
*/
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_GridBattle = 1;
TH.GridBattle = TH.GridBattle || {}; 

HighlightAlpha = 0.8
EmptyAlpha = 0

var GRID = {}
GRID.getBattleConfig = function(id) {
  return $gameSystem.getBattleGridConfig(id);
}
GRID.useBattleConfig = function(id) {
  $gameSystem.useBattleGridConfig(id);
}

$dataGridShapes = null;

/**
 * Defines a grid battle.
 */
function BattleGridConfig() {
  this.initialize.apply(this, arguments);
}

BattleGridConfig.prototype.initialize = function(id) {
  this.id = id
  this._grids = {}
  this._connections = []
}
  
BattleGridConfig.prototype.grids = function() {
  return this._grids;
}

BattleGridConfig.prototype.getGrid = function(id) {   
  var grid = this._grids[id]
  if (!grid) {
    grid = new BattleGridData(id);
    this._grids[id] = grid
  }
  return grid;
}

BattleGridConfig.prototype.addGrid = function(grid) {
  this._grids[grid.id] = grid;
}

BattleGridConfig.prototype.setConnections = function(connections) {
  this._connections = connections;
}

/**
 * Represents an individual grid.
 */
function BattleGridData() {
  this.initialize.apply(this, arguments);
}

BattleGridData.prototype.initialize = function(id) {  
  this.id = id;    
  this.init();
}    
  
BattleGridData.prototype.init = function() {
  this._tileWidth = 0;
  this._tileHeight = 0;
  this._numColumns = 0;
  this._numRows = 0;
  this._gridPosition = new Point(0, 0);
  this._actorPositions = {};
  this._partyPositions = {};
  this._enemyPositions = {};
  this._highlightTints = {};  
}

BattleGridData.prototype.setHighlightTint = function(type, tint) {
  this._highlightTints[type] = tint;
}

BattleGridData.prototype.setTileSize = function(width, height) {
  this._tileWidth = width;
  this._tileHeight = height;
}

BattleGridData.prototype.setSize = function(rows, cols) {
  this._numRows = rows;
  this._numColumns = cols;
}

BattleGridData.prototype.setGridPosition = function(x, y) {
  this._gridPosition.x = x;
  this._gridPosition.y = y;
}

// one-based index for convenience
BattleGridData.prototype.setPartyPosition = function(index, position) {
  this._partyPositions[index-1] = position;
}

BattleGridData.prototype.setEnemyPosition = function(index, position) {
  this._enemyPositions[index-1] = position;
}

BattleGridData.prototype.setActorPosition = function(id, position) {
  this._actorPositions[id] = position;
}

/* Manages all grids in the current battle */
function GridManager() {
  this.initialize.apply(this, arguments);
}

GridManager.prototype.initialize = function() {  
  this._grids = {}
  this._spritesets = {}
  this._config = {}
  this.initMembers();
  this._gridSet = []
  this._nodeIds = {}
}

GridManager.prototype.initMembers = function() {
}

GridManager.prototype.getConfig = function() {
  return this._config;
}

GridManager.prototype.createAllGrids = function(config) {
  this._config = config;
  
  if (!this._config) {
    throw new Error("No Battle Config found. Did you call GRID.useBattleConfig('GRID_NAME')?");
  }
  var gridData = config.grids();
  var keys = Object.keys(gridData);
  for (var i = 0; i < keys.length; i++) {
    var id = keys[i]
    var data = gridData[id];
    var grid = new BattleGrid(id);   
    grid.setTileWidth(data._tileWidth);
    grid.setTileHeight(data._tileHeight);
    grid.setPosition(data._gridPosition.x, data._gridPosition.y);
    grid.build(data._numRows, data._numColumns);
    
    // cache nodes
    grid.nodes.forEach( node => {
      this._nodeIds[node.id] = node;
    });
    
    this.setGrid(grid, id);         
    this.setupGrid(grid, data);          
  }
}

GridManager.prototype.getAllGrids = function() {
  return this._gridSet;
}

GridManager.prototype.getBattleNode = function(id) {
  return this._nodeIds[id];
}

/* Do your grid set up here */
GridManager.prototype.setupGrid = function(grid, data) {    
  grid._actorPositions = data._actorPositions;
  grid._partyPositions = data._partyPositions;
  grid._enemyPositions = data._enemyPositions;
  grid.setActors($gameParty.battleMembers());
  grid.setEnemies($gameTroop.members());
  grid.setHighlightTints(data._highlightTints);
}

/* Always use getGrid. Can be by ID or by Node */
GridManager.prototype.getGrid = function(obj) {
  if (obj instanceof BattleNode) {
    return obj.grid;
  }
  else {
    return this._grids[obj]
  }
}

GridManager.prototype.setGrid = function(grid, id) {
  this._grids[id] = grid;
  this._gridSet.push(grid);
}

GridManager.prototype.setSpriteset = function(spriteset, id) {
  return this._spritesets[id];
}

GridManager.prototype.getActorSprite = function(node) {
  var actor = node.actor
  if (!actor) {
    return null
  }
  var sprites = this.collectActorSprites(node._grid)
  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    if (sprite._battler === actor) {
      return sprite;        
    }
  }
  return null;
}

GridManager.prototype.collectActorSprites = function(grid) {
  return this._spritesets[grid._id]._actorSprites;    
}

GridManager.prototype.collectEnemySprites = function(grid) {
  return this._spritesets[grid._id]._enemySprites;    
}

GridManager.prototype.clearHighlights = function(node) {
  this.getGrid(node).clearHighlights(node);
}

GridManager.prototype.getTargetNodes = function(node, action) {
  return this.getGrid(node).getTargetNodes(node, action);
}

GridManager.prototype.getTargets = function(node, action) {      
  return this.getGrid(node).getTargets(node, action);
}

/* Given a list of grids, return a new joined grid based
 * on grid connection rules defined in the config
 */
GridManager.prototype.joinGrids = function(grids) {  
  var map = {}
  for (var i = 0; i < grids.length; i++) {
    var grid = grids[i];
    map[grid._id] = grid._virtualGrid;
  }
  
  var identity = new VirtualGrid();
  identity.build(0, 0);
  
  var connections = this._config._connections;
  connections.forEach( conn => {
    var direction = conn["Direction"]
    var id1 = conn["Grid Name"].toString()
    var id2 = conn["Target Grid Name"].toString()
    var row = conn["Offset Column"]
    var col = conn["Offset Row"]
    
    var vgrid1 = map[id1] || identity
    var vgrid2 = map[id2] || identity
    map[id2] = vgrid1.join(vgrid2, direction, [row, col])      
    delete map[id1];
  });      
  var values = Object.values(map);
  if (values.length != 1) {
    console.log("[WARNING] Error joining maps");
  }
  return values[0];
}

/**************************************************************/

function BattleGrid() {
    this.initialize.apply(this, arguments);
}

BattleGrid.prototype = Object.create(Grid.prototype);
BattleGrid.prototype.constructor = BattleGrid;

BattleGrid.prototype.init = function() {  
  Grid.prototype.init();
  this._actorPositions = {};
  this._partyPositions = {};
  this._enemyPositions = {};
  this._highlightTints = {};
  this._highlights = {};
}

var TH_BattleGrid_build = BattleGrid.prototype.build
BattleGrid.prototype.build = function(rows, cols) {
  TH_BattleGrid_build.call(this, rows, cols);
  this.buildVirtualGrid(rows, cols);  
}

BattleGrid.prototype.buildVirtualGrid = function(rows, cols) {
  this._virtualGrid = new VirtualGrid(this._id);
  this._virtualGrid.build(rows, cols), 
  this._virtualGrid.setGrid(this);
}


BattleGrid.prototype.createNode = function(id, row, col) {
  return new BattleNode(this, id, row, col);
}

BattleGrid.prototype.setHighlightTints = function(tints) {
  this._highlightDamageTint = tints["Damage"];
  this._highlightRecoverTint = tints["Recover"];
  this._highlightEmptyTint = tints["Empty"];
  this._highlightNoneTint = tints["None"];
}

BattleGrid.prototype.setActors = function(actors) {    
  // TO DO: need to do some error checking with positions
  Object.keys(this._partyPositions).forEach( index => {      
    var actor = actors[index]
    if (actor) {
      var pos = this._partyPositions[index]
      var node = this.getNode(pos[0] - 1, pos[1] - 1);
      node.setBattler(actor)
    }
  })
}

BattleGrid.prototype.setEnemies = function(enemies) {
  Object.keys(this._enemyPositions).forEach( index => {
    var enemy = enemies[index];
    if (enemy) {
      var pos = this._enemyPositions[index]
      var node = this.getNode(pos[0] - 1, pos[1] - 1);
      
      if (!node) {
        throw new Error("Tile [%1, %2] not found. Is the grid large enough?".format(pos[0], pos[1]))
      }
      node.setBattler(enemy);
    }
  })
}

BattleGrid.prototype.getTargetNodes= function(node, action) {
  return [node];
}

// Given a node and an action, return an array of battlers
// Could be an actor/enemy, or could be a tile (designated as "tileBattler")  
BattleGrid.prototype.getTargets = function(node, action) {
  var nodes = this.getTargetNodes(node, action); 
  var targets = [];
  nodes.forEach( node => { 
    var battlers = this.getNodeTargets(node, action);
    if (battlers) {
      targets = targets.concat(battlers);
    }
  });
  return targets;
}

/* Returns all of the battlers on the node
 */
BattleGrid.prototype.getNodeTargets = function(node, action) {
  return node.getBattlers();
}

/* Returns the highlight tint for the specified action
 * It's based on what the action is supposed to do, not what it ends up doing
 */
BattleGrid.prototype.getHighlightTint = function(action) {
  if (action.isDamage()) {
    return this._highlightDamageTint;
  }
  else if (action.isRecover()) {
    return this._highlightRecoverTint;
  }
  // what's the other stuff?
  else {
    return this._highlightDamageTint;
  }
}

/* basic highlighting */
BattleGrid.prototype.highlight = function(node, action) {
  var targets = this.getTargets(node, action);    
  var nodes = new Set();
  
  var tintMap = {};
  targets.forEach( target => {
    var tint = this._highlightEmptyTint;
    if (action.canTarget(target)) {
      tint = this.getHighlightTint(action);
    }      
    var node = target.getBattleNode();
    nodes.add(node);
    
    // TO DO: tint priority. Give higher priority to non-empty tint
    
    if (tintMap[node.id]) {
      if (tint !== this._highlightEmptyTint && tintMap[node.id] === this._highlightEmptyTint) {
        tintMap[node.id] = tint;
      }
    }
    else {
      tintMap[node.id] = tint;
    }
  });
  
  nodes.forEach( node => {
    var tint = tintMap[node.id];
    node.doHighlight(tint);
  });
    
  
  // hardcode this for now. We need to change it so that we remember highlights for each action
  this.addHighlights(node, nodes);  
}

BattleGrid.prototype.addHighlights = function(node, nodes) {
  this._highlights[node] = this._highlights[node] || []
  this._highlights[node].push(nodes);
}

BattleGrid.prototype.getHighlights = function(node) {
  return this._highlights[node][0];
}

/* Given a node, clear the highlights for that node */
BattleGrid.prototype.clearHighlights = function(node) {
  this._highlights[node] = this._highlights[node] || []
  var nodes = this._highlights[node].shift();
  
  if (nodes) {
    nodes.forEach(node => {
      node.clearHighlight();
    });
  }
}

/* The battle node keeps track of which actor is currently in it.
 * This makes it easy to get a list of actors that are inside a given
 * set of nodes
 */
 function BattleNode() {
    this.initialize.apply(this, arguments);
}

BattleNode.prototype = Object.create(Node.prototype);
BattleNode.prototype.constructor = BattleNode;

BattleNode.prototype.init = function() {  
  Node.prototype.init();
  this._highlight = 0;
  this._battler = null;
  this._tileBattler = new Game_TileBattler();
  this._tileBattler.setBattleNode(this);
  this.clearUpdate();
}

BattleNode.prototype.isEmpty = function() {
  return this._battler === null;
}

BattleNode.prototype.getBattlers = function() {
  var battlers = [this._tileBattler]
  if (this._battler) {
    battlers.push(this._battler);
  }
  return battlers;
}  

BattleNode.prototype.setBattler = function(battler) {
  battler.setBattleNode(this)
  this._battler = battler
  this._needsUpdate = true
}

BattleNode.prototype.removeBattler = function(battler) {
  this._battler = null
  this._needsUpdate = true
}

BattleNode.prototype.clearUpdate = function() {
  this._needsUpdate = false;
}

Object.defineProperty(BattleNode.prototype, 'needsUpdate', {
  get: function() {
    return this._needsUpdate;
  },
  configurable: true
});

Object.defineProperty(BattleNode.prototype, 'battler', {
  get: function() {
    return this._battler;
  },
  configurable: true
});
  
BattleNode.prototype.getHighlightTint = function() {
  return this._highlightTint;
}

BattleNode.prototype.setHighlightTint = function(tint) {
  this._highlightTint = tint;
}

BattleNode.prototype.getHighlightAlpha = function() {
  return this._highlightAlpha;
}

BattleNode.prototype.setHighlightAlpha = function(alpha) {
  this._highlightAlpha = alpha;
}

BattleNode.prototype.doHighlight = function(tint) {   
  if (this._battler) {
    this._battler.select();
  }
  this._highlightTint = tint;
  this._highlightAlpha = HighlightAlpha;
  this._highlight += 1;
}

BattleNode.prototype.clearHighlight = function() {
  if (this._battler) {
    this._battler.deselect();
  }
  this._highlightTint = 0xFFFFFF;
  this._highlightAlpha = EmptyAlpha;
  this._highlight -= 1;
}

BattleNode.prototype.needsHighlight = function() {
  return this._highlight > 0;
}

function Sprite_BattleGrid() {
  this.initialize.apply(this, arguments);
}

Sprite_BattleGrid.prototype = Object.create(Sprite_Grid.prototype);
Sprite_BattleGrid.prototype.constructor = Sprite_BattleGrid;

Sprite_BattleGrid.prototype.createSprite = function(node) {    
  return new Sprite_BattleNode(node)
}

function Sprite_BattleNode() {
  this.initialize.apply(this, arguments);
}

Sprite_BattleNode.prototype = Object.create(Sprite_Node.prototype);
Sprite_BattleNode.prototype.constructor = Sprite_BattleNode;
  
Sprite_BattleNode.prototype.init = function() {
  Sprite_Node.prototype.init.call(this);
}
  
Sprite_BattleNode.prototype.drawBorder = function() {
  Sprite_Node.prototype.drawBorder.call(this);
}
  
Sprite_BattleNode.prototype.drawGridLine = function() {
  if ($gameSystem._showGrid) {
    Sprite_Node.prototype.drawGridLine.call(this);
  }
}

Sprite_BattleNode.prototype.getHighlightTint = function() {
  if (this._node) {
    return this._node.getHighlightTint();
  }
  else {
    return 0xFFFFFF;
  }
}

Sprite_BattleNode.prototype.getHighlightAlpha = function() {
  if (this._node) {
    return this._node.getHighlightAlpha();
  }
  else {
    return 0.5;
  }
}

var TH_SpriteBattleNode_update = Sprite_BattleNode.prototype.update;
Sprite_BattleNode.prototype.update = function() {
  TH_SpriteBattleNode_update.call(this);
  this._borderSprite.tint = this.getHighlightTint();
  this._borderSprite.alpha = this.getHighlightAlpha();
}

/* A virtual battle grid that holds references to nodes
 * from different grids
 */

function VirtualGrid() {
    this.initialize.apply(this, arguments);
}

VirtualGrid.prototype = Object.create(Grid.prototype);
VirtualGrid.prototype.constructor = VirtualGrid;

VirtualGrid.prototype.createNode = function(id, row, col) {
  return new VirtualNode(this, id, row, col);
}

VirtualGrid.prototype.setGrid = function(grid) {
  var vnodes = this._nodes;
  var nodes = grid.nodes;  
  for (var i = 0; i < nodes.length; i++) {
    vnodes[i].setNode(nodes[i]);
  }
}

function VirtualNode() {
  this.initialize.apply(this, arguments);
}

VirtualNode.prototype = Object.create(Node.prototype);
VirtualNode.prototype.constructor = VirtualNode;

VirtualNode.prototype.setNode = function(node) {
  this._value = node;
}

VirtualNode.prototype.getNode = function() {
  return this._value;
}

class Sprite_VirtualGrid extends Sprite_BattleGrid {
  createSprite(node) {    
    return new Sprite_VirtualNode(node.getNode())
  }
}

class Sprite_VirtualNode extends Sprite_BattleNode {
  
  init() {
    super.init();
  }
  
  drawBorder() {
    super.drawBorder();
  }
  
  drawGridLine() {
    if ($gameSystem._showGrid) {
      super.drawGridLine();
    }
  }
}

/* This is a hack. We're giving every tile an empty battler object */
function Game_TileBattler() {
    this.initialize.apply(this, arguments);
}

Game_TileBattler.prototype = Object.create(Game_Battler.prototype);
Game_TileBattler.prototype.constructor = Game_TileBattler;

function Sprite_TileBattler() {
    this.initialize.apply(this, arguments);
}

Sprite_TileBattler.prototype = Object.create(Sprite_Battler.prototype);
Sprite_TileBattler.prototype.constructor = Sprite_TileBattler;

(function ($) {
  
  $.params = PluginManager.parameters("HIME_GridBattle");
  $.TestBattleEventId = $.params["Test Battle Common Event"];
  $.DefaultBattleGrid = $.params["Default Grid"];
  $.ShowGrid = $.params["Show Grid"] === "true"
  $.EmptyScopeRegex = /<empty[-_ ]tile:\s*(.+?)>/i  
  $.UserGridRegex = /<user[-_ ]grid[-_ ]only>/i
  
  $.isEmptyScope = function(item) {
    if (item.canBeEmpty === undefined) {
      var res = item.note.match($.EmptyScopeRegex)
      item.canBeEmpty = !!res;
    }
    return item.canBeEmpty;
  };
  
  $.isForUserGrid = function(item) {
    if (item.isForUserGrid === undefined) {
      var res = item.note.match($.UserGridRegex)
      item.isForUserGrid = !!res;
    }
    return item.isForUserGrid;
  }
  
  var TH_GameSystem_initialize = Game_System.prototype.initialize
  Game_System.prototype.initialize = function() {
    TH_GameSystem_initialize.call(this);    
    this._battleGridConfigs = {};
    this._activeBattleGridConfig = null;    
    
    // default setups from plugin parameters
    this._showGrid = $.ShowGrid;
    this._battleGridConfigs = this.loadGridConfigs($.params["Grid Configs"]);    
    this.useBattleGridConfig($.DefaultBattleGrid);
    
    this.loadGridConfigAddons();
  }

  Game_System.prototype.getBattleGridConfig = function(id) {
    return this._battleGridConfigs[id] = this._battleGridConfigs[id] || new BattleGridConfig(id);
  }
  
  Game_System.prototype.useBattleGridConfig = function(id) {
    this._activeBattleGridConfig = this.getBattleGridConfig(id);
  }
  
  Game_System.prototype.getActiveBattleGrid = function() {
    return this._activeBattleGridConfig;
  }
  
  Game_System.prototype.loadGridConfigs = function(data) {
    var configs = TH.parseParameters(data);    
    var res = {}
    configs.forEach( configData => {
      var name = configData["Name"]
      var config = new BattleGridConfig(name)
      var gridData = configData["Grids"]
      gridData.forEach( dat => {
        var grid = this.loadGrid(dat);
        config.addGrid(grid);
      })
      
      res[name] = config;
      
      
      var connections = configData["Connections"]
      if (connections) {
        config.setConnections(connections);
      }      
    })
    return res;
  }  
  
  Game_System.prototype.loadGrid = function(data) {
    var grid = new BattleGridData(data["Name"]);
    grid.setTileSize(data["Tile Width"], data["Tile Height"])
    grid.setSize(data["Number of Rows"], data ["Number of Columns"])
    grid.setGridPosition(data["Screen Offset X"], data["Screen Offset Y"]);
    
    var partyPositions = data["Party Positions"];
    if (partyPositions !== "") {
      partyPositions.forEach( pos => {
        grid.setPartyPosition(pos["id"], [pos["Row"], pos["Column"]]);
      });
    }
    var enemyPositions = data["Enemy Positions"];
    if (enemyPositions !== "") {
      enemyPositions.forEach( pos => {
        grid.setEnemyPosition(pos["id"], [pos["Row"], pos["Column"]]);
      });
    }
    
    var highlights = data["Highlights"]
    grid.setHighlightTint("Empty", Number(highlights["Empty"]))
    grid.setHighlightTint("Damage", Number(highlights["Damage"]))
    grid.setHighlightTint("Recover", Number(highlights["Recover"]))
    grid.setHighlightTint("None", Number(highlights["None"]))        
    return grid;
  }
  
  Game_System.prototype.loadGridConfigAddons = function() {
  }

  /** Test battle stuff **************************************/

  // var TH_GameParty_setupBattleTest = Game_Party.prototype.setupBattleTest;
  // Game_Party.prototype.setupBattleTest = function() {
    // DataManager.setupBattleGrid();
    // TH_GameParty_setupBattleTest.call(this);
  // };
  
  // DataManager.setupBattleGrid = function() {
    // var ev = $dataCommonEvents[$.TestBattleEventId];
    // var interpreter = new Game_Interpreter();
    // interpreter.setup(ev.list)
    // while (interpreter.isRunning()) {
      // interpreter.update();
    // }
  // }
  
  /*************************************************************/
  
  var TH_BattleManager_setup = BattleManager.setup
  BattleManager.setup = function(troopId, canEscape, canLose) {    
    TH_BattleManager_setup.call(this, troopId, canEscape, canLose);
    this.createGrid();    
  }
  
  var TH_BattleManager_initMembers = BattleManager.initMembers
  BattleManager.initMembers = function() {
    TH_BattleManager_initMembers.call(this);
    this._gridManager = null;
  }
  
  BattleManager.clearHighlights = function(node) {
    this._gridManager.clearHighlights(node);
  }
  
  BattleManager.createGrid = function() {
    this._gridManager = new GridManager();
    this._gridManager.createAllGrids($gameSystem.getActiveBattleGrid())
  }
  
  BattleManager.getAllGrids = function() {
    return this._gridManager.getAllGrids();
  }
  
  BattleManager.getGrid = function(id) {
    return this._gridManager.getGrid(id);
  }
  
  BattleManager.getBattleNode = function(tileId) {
    return this._gridManager.getBattleNode(tileId);
  }
  
  BattleManager.getGridConfig = function() {
    return this._gridManager.getConfig();
  }
  
  BattleManager.setGridSpriteset = function(spriteset) {
    this._gridManager.setSpriteset(spriteset)
  }
  
  var TH_BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    TH_BattleManager_startAction.call(this);
  }
  
  var TH_BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function () {
    TH_BattleManager_endAction.call(this);   
  }   
  
  // Determines if battler can be targeted. Could be any kind of battler,
  // like an actor, enemy, or tile
  Game_Action.prototype.canTarget = function(battler) {
    var canTarget = true;
    var subject = this.subject();
    var userNode = subject.getBattleNode();
    var node = battler.getBattleNode();
        
    // check if grid condition is met
    if (this.isForUserGrid()) {
      if (node._grid !== userNode._grid) {
        canTarget = false;
      }
    }
    
    // tile battlers have separate handling
    if (battler instanceof Game_TileBattler) {
      
      // if action is for empty tiles, check if it's an empty tile
      if (this.isForEmpty()) {        
        if (!node.isEmpty()) {
          canTarget = false;
        }
      }
      else {
        canTarget = false;
      }            
      // action is not for empty tiles, so forget this tile
      
    }   
    else {
      // scope is for empty tiles only. Non-tile battler is irrelevant
      if (this.isForEmpty()) {
        canTarget = false;
      }
      // check if rule matches basic scope
      else if (this.isForDeadFriend()) {
        if (battler.friendsUnit() !== subject.friendsUnit() || battler.isAlive()) {
          canTarget = false;
        }
      }
      else if (this.isForUser()) {
        if (battler !== subject) {
          canTarget = false;
        }
      }
      else if (this.isForOpponent()) {
        // they're on the same side. Assume only two sides for now
        if (battler.friendsUnit() === subject.friendsUnit() || !battler.isAlive()) {
          canTarget = false;
        }
      }
      else if (this.isForFriend()) {
        // they're on different sides
        if (battler.friendsUnit() !== subject.friendsUnit() || !battler.isAlive()) {
          canTarget = false;
        }
      }                      
    }    
    return canTarget;
  }
  
  Game_Action.prototype.isForEmpty = function() {
    return $.isEmptyScope(this.item());
  }
  
  Game_Action.prototype.isForUserGrid = function() {
    return $.isForUserGrid(this.item())
  }
  
  /*************************************************************/
  
  var TH_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    TH_Game_Battler_initMembers.call(this);
    this._battleNodeId = null;
  }

  /* Don't call this directly. Always use battle manager setGridPosition */
  Game_Battler.prototype.setBattleNode = function(node) {    
    this._battleNodeId = node ? node.id : null; 
  }

  Game_Battler.prototype.getBattleNode = function() {
    return BattleManager.getBattleNode(this._battleNodeId);
  }
  
  Game_Battler.prototype.getBattlePosition = function() {
    var node = this.getBattleNode(this._battleNodeId);
    return [node.row + 1, node.col + 1];
  }
  
  /*********************************************************/
  
  Game_TileBattler.prototype.isSpriteVisible = function() {
    return true;
  }
  
  Game_TileBattler.prototype.name = function() {
    return "";
  };

  /* TO DO: index should be node index since tiles shouldn't move */
  Game_TileBattler.prototype.index = function() {
    return 0;
  };

  /* assume tiles do not have friends */
  Game_TileBattler.prototype.friendsUnit = function() {
    return null;
  };

  /* assume tiles do not have enemies either */
  Game_TileBattler.prototype.opponentsUnit = function() {
    return null;
  };
  
  /*********************************************************/
  
  /* Performing action */
  BattleManager.getTargetNodes = function(node, action) {
    return this._gridManager.getTargetNodes(node, this._action);
  }
  
  BattleManager.getTargets = function(node, action) {
    return this._gridManager.getTargets(node, action);
  }  
  
  /*********************************************************/
  
  var TH_SpriteBattler_updateMain = Sprite_Battler.prototype.updateMain
  Sprite_Battler.prototype.updateMain = function() {
    this.updateHomePosition();
    TH_SpriteBattler_updateMain.call(this);    
  }
  
  Sprite_Battler.prototype.updateHomePosition = function() {
    var node = this._battler.getBattleNode();
    if (node) {
      var spr = NodeSpriteManager.getNodeSprite(node);
      if (spr) {
        this.setHome(spr.x + spr.parent.x + spr._borderSprite.width / 2, spr.y + spr.parent.y + spr._borderSprite.height / 6 * 5)
      }
    }
  };
  
  var TH_SpriteBattler_updatePosition = Sprite_Battler.prototype.updatePosition;
  Sprite_Battler.prototype.updatePosition = function() {
    TH_SpriteBattler_updatePosition.call(this);   
    this.z = Graphics.height - this.y
  };
  
  /*********************************************************/
  
  // Don't step forward when performing input
  Sprite_Actor.prototype.stepForward = function() {
    // this.startMove(-48, 0, 12);
  };
  
  /*********************************************************/
  
  // MZ and MV swap the order of battlefield and battleback creation...
  // So I toss it right before enemies are drawn
  var TH_SpritesetBattle_createEnemies = Spriteset_Battle.prototype.createEnemies
  Spriteset_Battle.prototype.createEnemies = function() {
    this.createBattleGrids();
    TH_SpritesetBattle_createEnemies.call(this);    
  }
  
  /* Create battle grids based on current grid configuration */
  Spriteset_Battle.prototype.createBattleGrids = function() {    
    var config = BattleManager.getGridConfig();
    
    // REDO: doesn't feel very clean
    var gridData = config.grids();
    var keys = Object.keys(gridData);
    for (var i = 0; i < keys.length; i++) {
      var id = keys[i]
      var data = gridData[id];
      var grid = BattleManager.getGrid(id);
      this.createBattleGrid(grid, data);
      this.createTileSprites(grid, data);      
    }
  }
  
  Spriteset_Battle.prototype.createBattleGrid = function(grid, data) { 
    var gridSprite = new Sprite_BattleGrid(grid);     
    var pos = data._gridPosition;
    gridSprite.x = pos.x
    gridSprite.y = pos.y
    
    this._battleField.addChild(gridSprite);    
    BattleManager.setGridSpriteset(gridSprite, data.id)   
  }

  Spriteset_Battle.prototype.createTileSprites = function(grid, data) {
    this._tileSprites = [];

    var nodes = grid._nodes;
    for (var j = 0; j < nodes.length; j++) {
      var node = nodes[j];
      var spr = new Sprite_TileBattler();
      spr.setBattler(node._tileBattler);
      var sprite = NodeSpriteManager.getNodeSprite(node);
      spr.x = sprite.x
      spr.y = sprite.y      
      sprite.addChild(spr)
      this._tileSprites[j] = spr;
      this._battleField.addChild(spr);    
    }
  }
})(TH.GridBattle)

/* Recursively parse plugin parameters into JS object */
TH.parseParameters = function(string) {
  try {
    return JSON.parse(string, (key, value) => {
      try {
        return TH.parseParameters(value)
      } catch (e) {
        return value
      }
    })
  } catch (e) {
    return string
  }
}