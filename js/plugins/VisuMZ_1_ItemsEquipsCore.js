//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.38;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.38] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

function _0x2927(_0x224340,_0x452678){const _0x5030a5=_0x5030();return _0x2927=function(_0x2927cf,_0x127120){_0x2927cf=_0x2927cf-0x12c;let _0x48406c=_0x5030a5[_0x2927cf];return _0x48406c;},_0x2927(_0x224340,_0x452678);}const _0x108103=_0x2927;(function(_0x57b9d5,_0x874d35){const _0x19cf43=_0x2927,_0x28dbbb=_0x57b9d5();while(!![]){try{const _0x263d85=-parseInt(_0x19cf43(0x40a))/0x1*(-parseInt(_0x19cf43(0x3a4))/0x2)+parseInt(_0x19cf43(0x2b2))/0x3+parseInt(_0x19cf43(0x45b))/0x4*(-parseInt(_0x19cf43(0x3c2))/0x5)+parseInt(_0x19cf43(0x344))/0x6+-parseInt(_0x19cf43(0x17d))/0x7+parseInt(_0x19cf43(0x507))/0x8*(-parseInt(_0x19cf43(0x1a0))/0x9)+parseInt(_0x19cf43(0x256))/0xa;if(_0x263d85===_0x874d35)break;else _0x28dbbb['push'](_0x28dbbb['shift']());}catch(_0x569a1b){_0x28dbbb['push'](_0x28dbbb['shift']());}}}(_0x5030,0x4a256));var label=_0x108103(0x3ae),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x108103(0x2e4)](function(_0x20065f){const _0x378c97=_0x108103;return _0x20065f[_0x378c97(0x2af)]&&_0x20065f[_0x378c97(0x3c0)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x108103(0x280)]=function(_0x51a6df,_0x4b17bf){const _0x485dc6=_0x108103;for(const _0x32a0f4 in _0x4b17bf){if(_0x32a0f4[_0x485dc6(0x1a3)](/(.*):(.*)/i)){const _0xde95f3=String(RegExp['$1']),_0x83d6f5=String(RegExp['$2'])[_0x485dc6(0x45c)]()[_0x485dc6(0x425)]();let _0x267d1b,_0x454cfb,_0x1e6ac9;switch(_0x83d6f5){case'NUM':_0x267d1b=_0x4b17bf[_0x32a0f4]!==''?Number(_0x4b17bf[_0x32a0f4]):0x0;break;case'ARRAYNUM':_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb['map'](_0x1e9697=>Number(_0x1e9697));break;case _0x485dc6(0x54e):_0x267d1b=_0x4b17bf[_0x32a0f4]!==''?eval(_0x4b17bf[_0x32a0f4]):null;break;case _0x485dc6(0x249):_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb[_0x485dc6(0x268)](_0x10bac7=>eval(_0x10bac7));break;case _0x485dc6(0x558):_0x267d1b=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):'';break;case _0x485dc6(0x50b):_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb['map'](_0x2c8fa4=>JSON[_0x485dc6(0x563)](_0x2c8fa4));break;case _0x485dc6(0x58c):_0x267d1b=_0x4b17bf[_0x32a0f4]!==''?new Function(JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4])):new Function('return\x200');break;case'ARRAYFUNC':_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON['parse'](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb['map'](_0x5f0de3=>new Function(JSON[_0x485dc6(0x563)](_0x5f0de3)));break;case _0x485dc6(0x41c):_0x267d1b=_0x4b17bf[_0x32a0f4]!==''?String(_0x4b17bf[_0x32a0f4]):'';break;case _0x485dc6(0x56e):_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON['parse'](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb['map'](_0x157397=>String(_0x157397));break;case _0x485dc6(0x377):_0x1e6ac9=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):{},_0x51a6df[_0xde95f3]={},VisuMZ[_0x485dc6(0x280)](_0x51a6df[_0xde95f3],_0x1e6ac9);continue;case'ARRAYSTRUCT':_0x454cfb=_0x4b17bf[_0x32a0f4]!==''?JSON[_0x485dc6(0x563)](_0x4b17bf[_0x32a0f4]):[],_0x267d1b=_0x454cfb[_0x485dc6(0x268)](_0x339c06=>VisuMZ[_0x485dc6(0x280)]({},JSON['parse'](_0x339c06)));break;default:continue;}_0x51a6df[_0xde95f3]=_0x267d1b;}}return _0x51a6df;},(_0xea16ff=>{const _0x3393a3=_0x108103,_0x1c81c7=_0xea16ff['name'];for(const _0x5157b3 of dependencies){if(!Imported[_0x5157b3]){if(_0x3393a3(0x43a)===_0x3393a3(0x226)){const _0x1882b4=_0x367115[_0x3393a3(0x563)]('['+_0x8aae36['$1']['match'](/\d+/g)+']');for(const _0x466df3 of _0x1882b4){if(!_0x14c76b['value'](_0x466df3))return!![];}return![];}else{alert(_0x3393a3(0x455)['format'](_0x1c81c7,_0x5157b3)),SceneManager[_0x3393a3(0x415)]();break;}}}const _0x55a1e3=_0xea16ff[_0x3393a3(0x3c0)];if(_0x55a1e3[_0x3393a3(0x1a3)](/\[Version[ ](.*?)\]/i)){const _0xe1f519=Number(RegExp['$1']);_0xe1f519!==VisuMZ[label]['version']&&(alert(_0x3393a3(0x430)[_0x3393a3(0x423)](_0x1c81c7,_0xe1f519)),SceneManager[_0x3393a3(0x415)]());}if(_0x55a1e3[_0x3393a3(0x1a3)](/\[Tier[ ](\d+)\]/i)){const _0x33c8af=Number(RegExp['$1']);_0x33c8af<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3393a3(0x423)](_0x1c81c7,_0x33c8af,tier)),SceneManager[_0x3393a3(0x415)]()):_0x3393a3(0x12e)===_0x3393a3(0x1ae)?this['onTouchSelect'](!![]):tier=Math[_0x3393a3(0x317)](_0x33c8af,tier);}VisuMZ[_0x3393a3(0x280)](VisuMZ[label][_0x3393a3(0x2d6)],_0xea16ff[_0x3393a3(0x328)]);})(pluginData),PluginManager[_0x108103(0x1d0)](pluginData[_0x108103(0x2f6)],'ActorChangeEquipSlots',_0x3b2c3b=>{const _0x21c379=_0x108103;VisuMZ[_0x21c379(0x280)](_0x3b2c3b,_0x3b2c3b);const _0x744c93=_0x3b2c3b[_0x21c379(0x272)][_0x21c379(0x268)](_0x24ec5a=>$gameActors['actor'](_0x24ec5a)),_0x3e4844=_0x3b2c3b[_0x21c379(0x5a8)][_0x21c379(0x268)](_0x52747b=>$dataSystem[_0x21c379(0x3dd)][_0x21c379(0x1ff)](_0x52747b['trim']()));for(const _0x7f38ae of _0x744c93){if('SiVrb'===_0x21c379(0x4cc))_0x31988f===this[_0x21c379(0x324)]()&&(this['_doubleTouch']=!![]),this[_0x21c379(0x523)](),this[_0x21c379(0x131)](_0x36f8f3);else{if(!_0x7f38ae)continue;_0x7f38ae['forceChangeEquipSlots'](_0x3e4844);}}}),PluginManager[_0x108103(0x1d0)](pluginData[_0x108103(0x2f6)],'ActorResetEquipSlots',_0x455a91=>{const _0x2fc9e6=_0x108103;VisuMZ[_0x2fc9e6(0x280)](_0x455a91,_0x455a91);const _0x4548c4=_0x455a91[_0x2fc9e6(0x272)][_0x2fc9e6(0x268)](_0x29fa88=>$gameActors[_0x2fc9e6(0x2b4)](_0x29fa88));for(const _0x5e44b0 of _0x4548c4){if(_0x2fc9e6(0x50d)===_0x2fc9e6(0x50d)){if(!_0x5e44b0)continue;_0x5e44b0[_0x2fc9e6(0x32d)]();}else{this[_0x2fc9e6(0x323)](),this[_0x2fc9e6(0x1e5)]();if(this[_0x2fc9e6(0x422)])this['_actor'][_0x2fc9e6(0x3f4)]();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2fc9e6(0x2cc)]():_0x581eef[_0x2fc9e6(0x3ae)][_0x2fc9e6(0x4de)][_0x2fc9e6(0x174)](this);}}}),PluginManager[_0x108103(0x1d0)](pluginData[_0x108103(0x2f6)],'BatchShop',_0x5bd3f3=>{const _0x1d5c68=_0x108103;VisuMZ['ConvertParams'](_0x5bd3f3,_0x5bd3f3);const _0x12180f=[],_0x57ab9d=_0x5bd3f3['Blacklist'][_0x1d5c68(0x268)](_0x2fa47c=>_0x2fa47c[_0x1d5c68(0x45c)]()['trim']()),_0x4fd27d=_0x5bd3f3[_0x1d5c68(0x2a9)][_0x1d5c68(0x268)](_0x13ada8=>_0x13ada8[_0x1d5c68(0x45c)]()['trim']()),_0x38fe47=_0x5bd3f3[_0x1d5c68(0x218)]>=_0x5bd3f3['Step1Start']?_0x5bd3f3['Step1Start']:_0x5bd3f3['Step1End'],_0x5ab87f=_0x5bd3f3[_0x1d5c68(0x218)]>=_0x5bd3f3[_0x1d5c68(0x46c)]?_0x5bd3f3[_0x1d5c68(0x218)]:_0x5bd3f3['Step1Start'],_0x1fcbc7=Array(_0x5ab87f-_0x38fe47+0x1)[_0x1d5c68(0x1e0)]()[_0x1d5c68(0x268)]((_0x42b260,_0x354f71)=>_0x38fe47+_0x354f71);for(const _0x46feae of _0x1fcbc7){if(_0x1d5c68(0x48d)!==_0x1d5c68(0x3ac)){const _0x3bb3b9=$dataItems[_0x46feae];if(!_0x3bb3b9)continue;if(!VisuMZ['ItemsEquipsCore'][_0x1d5c68(0x201)](_0x3bb3b9,_0x57ab9d,_0x4fd27d))continue;_0x12180f[_0x1d5c68(0x16f)]([0x0,_0x46feae,0x0,_0x3bb3b9[_0x1d5c68(0x4c9)]]);}else this[_0x1d5c68(0x505)]();}const _0x877bde=_0x5bd3f3[_0x1d5c68(0x276)]>=_0x5bd3f3['Step2Start']?_0x5bd3f3[_0x1d5c68(0x418)]:_0x5bd3f3['Step2End'],_0x8332ba=_0x5bd3f3[_0x1d5c68(0x276)]>=_0x5bd3f3[_0x1d5c68(0x418)]?_0x5bd3f3[_0x1d5c68(0x276)]:_0x5bd3f3[_0x1d5c68(0x418)],_0x2d87bc=Array(_0x8332ba-_0x877bde+0x1)[_0x1d5c68(0x1e0)]()[_0x1d5c68(0x268)]((_0x21d8ab,_0x3364b5)=>_0x877bde+_0x3364b5);for(const _0x370366 of _0x2d87bc){const _0x2fedeb=$dataWeapons[_0x370366];if(!_0x2fedeb)continue;if(!VisuMZ['ItemsEquipsCore']['IncludeShopItem'](_0x2fedeb,_0x57ab9d,_0x4fd27d))continue;_0x12180f['push']([0x1,_0x370366,0x0,_0x2fedeb[_0x1d5c68(0x4c9)]]);}const _0xb6ce29=_0x5bd3f3[_0x1d5c68(0x588)]>=_0x5bd3f3['Step3Start']?_0x5bd3f3[_0x1d5c68(0x426)]:_0x5bd3f3['Step3End'],_0x337dfa=_0x5bd3f3[_0x1d5c68(0x588)]>=_0x5bd3f3[_0x1d5c68(0x426)]?_0x5bd3f3[_0x1d5c68(0x588)]:_0x5bd3f3['Step3Start'],_0x34fada=Array(_0x337dfa-_0xb6ce29+0x1)[_0x1d5c68(0x1e0)]()[_0x1d5c68(0x268)]((_0x38d31e,_0x4e3588)=>_0xb6ce29+_0x4e3588);for(const _0x5c1d9f of _0x34fada){const _0x3c3984=$dataArmors[_0x5c1d9f];if(!_0x3c3984)continue;if(!VisuMZ[_0x1d5c68(0x3ae)]['IncludeShopItem'](_0x3c3984,_0x57ab9d,_0x4fd27d))continue;_0x12180f[_0x1d5c68(0x16f)]([0x2,_0x5c1d9f,0x0,_0x3c3984[_0x1d5c68(0x4c9)]]);}SceneManager[_0x1d5c68(0x16f)](Scene_Shop),SceneManager[_0x1d5c68(0x1c7)](_0x12180f,_0x5bd3f3[_0x1d5c68(0x379)]);}),VisuMZ[_0x108103(0x3ae)][_0x108103(0x201)]=function(_0x35e48d,_0x5b11ee,_0x2f070b){const _0x4a1251=_0x108103;if(_0x35e48d['name'][_0x4a1251(0x425)]()==='')return![];if(_0x35e48d[_0x4a1251(0x2f6)]['match'](/-----/i))return![];const _0x42215e=_0x35e48d[_0x4a1251(0x4ab)];if(_0x5b11ee[_0x4a1251(0x468)]>0x0)for(const _0x339477 of _0x5b11ee){if(_0x4a1251(0x13e)==='GVidM')return _0x55474a[_0x4a1251(0x3ae)]['Settings'][_0x4a1251(0x4ee)][_0x4a1251(0x209)];else{if(!_0x339477)continue;if(_0x42215e[_0x4a1251(0x4ff)](_0x339477))return![];}}if(_0x2f070b[_0x4a1251(0x468)]>0x0){if(_0x4a1251(0x13a)===_0x4a1251(0x580))_0xc3a2ed['ItemsEquipsCore']['Scene_Item_create'][_0x4a1251(0x174)](this),this['isUseModernControls']()&&this['onCategoryOk']();else{for(const _0x46abd4 of _0x2f070b){if(!_0x46abd4)continue;if(_0x42215e[_0x4a1251(0x4ff)](_0x46abd4))return!![];}return![];}}return!![];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x327)]=Scene_Boot[_0x108103(0x2ab)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x108103(0x261)]=function(){const _0x2ff3f7=_0x108103;this[_0x2ff3f7(0x4f9)](),VisuMZ['ItemsEquipsCore'][_0x2ff3f7(0x327)][_0x2ff3f7(0x174)](this),this[_0x2ff3f7(0x4ba)](),VisuMZ[_0x2ff3f7(0x3ae)][_0x2ff3f7(0x337)]();},Scene_Boot[_0x108103(0x2ab)][_0x108103(0x4f9)]=function(){const _0x740290=_0x108103;VisuMZ[_0x740290(0x3ae)][_0x740290(0x30f)]={},VisuMZ[_0x740290(0x3ae)][_0x740290(0x30f)]['EquipParams']=[],VisuMZ[_0x740290(0x3ae)][_0x740290(0x30f)][_0x740290(0x52b)]=[];const _0x185298=['MaxHP','MaxMP',_0x740290(0x1be),_0x740290(0x499),'MAT',_0x740290(0x3a3),_0x740290(0x5ba),_0x740290(0x3bb)];for(const _0x4bb46f of _0x185298){if(_0x740290(0x313)!==_0x740290(0x313))this['commandSellItemsEquipsCore']();else{const _0x24d8db=_0x740290(0x381)[_0x740290(0x423)](_0x4bb46f);VisuMZ['ItemsEquipsCore'][_0x740290(0x30f)][_0x740290(0x130)]['push'](new RegExp(_0x24d8db,'i'));const _0x23c0c0=_0x740290(0x4f4)[_0x740290(0x423)](_0x4bb46f);VisuMZ['ItemsEquipsCore'][_0x740290(0x30f)][_0x740290(0x52b)][_0x740290(0x16f)](new RegExp(_0x23c0c0,'g'));}}},Scene_Boot['prototype'][_0x108103(0x4ba)]=function(){const _0x56f098=_0x108103;if(VisuMZ[_0x56f098(0x4d2)])return;this[_0x56f098(0x1f1)]();const _0x2f3f33=[$dataItems,$dataWeapons,$dataArmors];for(const _0x37d789 of _0x2f3f33){for(const _0x47cb09 of _0x37d789){if(!_0x47cb09)continue;VisuMZ[_0x56f098(0x3ae)]['Parse_Notetags_Category'](_0x47cb09,_0x37d789),VisuMZ['ItemsEquipsCore'][_0x56f098(0x569)](_0x47cb09,_0x37d789),VisuMZ['ItemsEquipsCore'][_0x56f098(0x23d)](_0x47cb09,_0x37d789),VisuMZ[_0x56f098(0x3ae)][_0x56f098(0x3db)](_0x47cb09,_0x37d789),VisuMZ[_0x56f098(0x3ae)]['Parse_Notetags_EnableJS'](_0x47cb09,_0x37d789);}}},Scene_Boot[_0x108103(0x2ab)][_0x108103(0x1f1)]=function(){const _0xc4f148=_0x108103;for(const _0x298408 of $dataClasses){if(!_0x298408)continue;VisuMZ[_0xc4f148(0x3ae)][_0xc4f148(0x360)](_0x298408);}},VisuMZ['ItemsEquipsCore'][_0x108103(0x278)]=VisuMZ[_0x108103(0x278)],VisuMZ['ParseClassNotetags']=function(_0x15874f){const _0x5cb964=_0x108103;VisuMZ[_0x5cb964(0x3ae)][_0x5cb964(0x278)]['call'](this,_0x15874f),VisuMZ[_0x5cb964(0x3ae)]['Parse_Notetags_EquipSlots'](_0x15874f);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x36d)]=VisuMZ[_0x108103(0x36d)],VisuMZ[_0x108103(0x36d)]=function(_0x5a1fcf){const _0x43d723=_0x108103;VisuMZ[_0x43d723(0x3ae)][_0x43d723(0x36d)][_0x43d723(0x174)](this,_0x5a1fcf),VisuMZ[_0x43d723(0x3ae)][_0x43d723(0x15d)](_0x5a1fcf,$dataItems);},VisuMZ[_0x108103(0x3ae)]['ParseWeaponNotetags']=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x108103(0x1b7)]=function(_0x202a21){const _0x30d568=_0x108103;VisuMZ[_0x30d568(0x3ae)][_0x30d568(0x1b7)][_0x30d568(0x174)](this,_0x202a21),VisuMZ[_0x30d568(0x3ae)][_0x30d568(0x15d)](_0x202a21,$dataWeapons);},VisuMZ['ItemsEquipsCore']['ParseArmorNotetags']=VisuMZ[_0x108103(0x1f3)],VisuMZ[_0x108103(0x1f3)]=function(_0x18903f){const _0x2fc7ab=_0x108103;VisuMZ[_0x2fc7ab(0x3ae)]['ParseArmorNotetags']['call'](this,_0x18903f),VisuMZ[_0x2fc7ab(0x3ae)][_0x2fc7ab(0x15d)](_0x18903f,$dataArmors);},VisuMZ[_0x108103(0x3ae)]['Parse_Notetags_EquipSlots']=function(_0x2fd981){const _0x5b2eb7=_0x108103;_0x2fd981['equipSlots']=[];if(!BattleManager[_0x5b2eb7(0x1ed)]()&&_0x2fd981['note']['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x40dd01=String(RegExp['$1'])[_0x5b2eb7(0x5be)](/[\r\n]+/);for(const _0x3beb2e of _0x40dd01){const _0x2ddd39=$dataSystem['equipTypes']['indexOf'](_0x3beb2e[_0x5b2eb7(0x425)]());if(_0x2ddd39>0x0)_0x2fd981[_0x5b2eb7(0x4fd)]['push'](_0x2ddd39);}}else{if(_0x5b2eb7(0x1b6)!==_0x5b2eb7(0x1cf))for(const _0x784318 of $dataSystem[_0x5b2eb7(0x3dd)]){const _0x3260a7=$dataSystem[_0x5b2eb7(0x3dd)][_0x5b2eb7(0x1ff)](_0x784318['trim']());if(_0x3260a7>0x0)_0x2fd981[_0x5b2eb7(0x4fd)][_0x5b2eb7(0x16f)](_0x3260a7);}else{const _0xe4c4ca=_0x1bfdea[_0x5b2eb7(0x563)]('['+_0x2d7044['$1'][_0x5b2eb7(0x1a3)](/\d+/g)+']');for(const _0x55cfba of _0xe4c4ca){if(_0x26bf99['value'](_0x55cfba))return!![];}return![];}}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x15d)]=function(_0x1db4de,_0x20c36d){const _0x473bdb=_0x108103;VisuMZ[_0x473bdb(0x3ae)][_0x473bdb(0x36c)](_0x1db4de,_0x20c36d),VisuMZ['ItemsEquipsCore'][_0x473bdb(0x569)](_0x1db4de,_0x20c36d),VisuMZ[_0x473bdb(0x3ae)][_0x473bdb(0x23d)](_0x1db4de,_0x20c36d),VisuMZ['ItemsEquipsCore'][_0x473bdb(0x3db)](_0x1db4de,_0x20c36d),VisuMZ['ItemsEquipsCore']['Parse_Notetags_EnableJS'](_0x1db4de,_0x20c36d);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x36c)]=function(_0x5c26e4,_0x8edda6){const _0x49abb0=_0x108103;_0x5c26e4[_0x49abb0(0x4ab)]=[];const _0x412149=_0x5c26e4['note'],_0xc8ecf1=_0x412149[_0x49abb0(0x1a3)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xc8ecf1){if(_0x49abb0(0x5d8)!==_0x49abb0(0x5d8)){const _0x324f1a=_0x28d46a['iconWidth'],_0xe4fa10=_0x484543['iconHeight'];this['bitmap']=new _0x3e36a9(_0x324f1a,_0xe4fa10),this[_0x49abb0(0x26c)](),this[_0x49abb0(0x24e)]();}else for(const _0x2fcf40 of _0xc8ecf1){_0x2fcf40['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x1fa428=String(RegExp['$1'])[_0x49abb0(0x45c)]()['trim']()[_0x49abb0(0x5be)](',');for(const _0x26937b of _0x1fa428){_0x5c26e4[_0x49abb0(0x4ab)][_0x49abb0(0x16f)](_0x26937b[_0x49abb0(0x425)]());}}}if(_0x412149[_0x49abb0(0x1a3)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x3045bb=RegExp['$1'][_0x49abb0(0x5be)](/[\r\n]+/);for(const _0x33ba48 of _0x3045bb){_0x5c26e4[_0x49abb0(0x4ab)]['push'](_0x33ba48['toUpperCase']()[_0x49abb0(0x425)]());}}},VisuMZ[_0x108103(0x3ae)]['Parse_Notetags_Prices']=function(_0x4a76bc,_0x23520c){const _0x674393=_0x108103;_0x4a76bc[_0x674393(0x412)][_0x674393(0x1a3)](/<PRICE:[ ](\d+)>/i)&&(_0x4a76bc[_0x674393(0x4c9)]=Number(RegExp['$1']));},VisuMZ[_0x108103(0x3ae)][_0x108103(0x23d)]=function(_0x462637,_0x4568f5){const _0x1a29ff=_0x108103;if(_0x4568f5===$dataItems)return;for(let _0x435339=0x0;_0x435339<0x8;_0x435339++){const _0x506450=VisuMZ['ItemsEquipsCore'][_0x1a29ff(0x30f)][_0x1a29ff(0x130)][_0x435339];_0x462637[_0x1a29ff(0x412)]['match'](_0x506450)&&(_0x462637[_0x1a29ff(0x167)][_0x435339]=parseInt(RegExp['$1']));}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x53b)]={},VisuMZ[_0x108103(0x3ae)][_0x108103(0x3db)]=function(_0x22d004,_0x467ac1){const _0x38e3b4=_0x108103;if(_0x467ac1===$dataItems)return;if(_0x22d004[_0x38e3b4(0x412)][_0x38e3b4(0x1a3)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x23758a=String(RegExp['$1']),_0xd0f817=(_0x467ac1===$dataWeapons?_0x38e3b4(0x33f):_0x38e3b4(0x5bb))[_0x38e3b4(0x423)](_0x22d004['id']),_0xc10126=_0x38e3b4(0x572)[_0x38e3b4(0x423)](_0x23758a);for(let _0xc5852b=0x0;_0xc5852b<0x8;_0xc5852b++){if('TdXjQ'===_0x38e3b4(0x2f3)){if(_0x23758a['match'](VisuMZ['ItemsEquipsCore'][_0x38e3b4(0x30f)][_0x38e3b4(0x52b)][_0xc5852b])){const _0x3512d3=_0x38e3b4(0x43e)['format'](_0xd0f817,_0xc5852b);VisuMZ[_0x38e3b4(0x3ae)][_0x38e3b4(0x53b)][_0x3512d3]=new Function('item',_0x38e3b4(0x4be),_0xc10126);}}else{this[_0x38e3b4(0x1e8)][_0x38e3b4(0x53d)]();if(!this[_0x38e3b4(0x422)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x19b2b3=_0x3342a4[_0x38e3b4(0x4e7)](this[_0x38e3b4(0x422)][_0x38e3b4(0x29a)]());_0x19b2b3[_0x38e3b4(0x12c)](this[_0x38e3b4(0x5c1)]['bind'](this));}else this[_0x38e3b4(0x161)]();}}}},VisuMZ['ItemsEquipsCore']['itemEnableJS']={},VisuMZ[_0x108103(0x3ae)][_0x108103(0x148)]=function(_0x4e1bfa,_0x4125de){const _0x24f48f=_0x108103;if(_0x4125de!==$dataItems)return;if(_0x4e1bfa[_0x24f48f(0x412)][_0x24f48f(0x1a3)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x378604=String(RegExp['$1']),_0x5b5ea1=_0x24f48f(0x4d9)['format'](_0x378604);VisuMZ['ItemsEquipsCore'][_0x24f48f(0x207)][_0x4e1bfa['id']]=new Function(_0x24f48f(0x25e),_0x5b5ea1);}},DataManager[_0x108103(0x3ab)]=function(_0x2454df){const _0x5b3244=_0x108103;return this[_0x5b3244(0x322)](_0x2454df)&&_0x2454df[_0x5b3244(0x22c)]===0x2;},DataManager['maxItemAmount']=function(_0x1e03f9){const _0x431fbd=_0x108103;if(!_0x1e03f9)return 0x63;else{if(_0x1e03f9[_0x431fbd(0x412)]['match'](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x431fbd(0x18d)!==_0x431fbd(0x467))return this[_0x431fbd(0x1de)](_0x1e03f9);else{const _0xfb6e6d=_0x30ab58[_0x431fbd(0x3ae)][_0x431fbd(0x2d6)][_0x431fbd(0x325)][_0x431fbd(0x316)];return _0xfb6e6d[_0x431fbd(0x423)](_0x54d607['tp']);}}}},DataManager[_0x108103(0x1de)]=function(_0x37dfa2){const _0x4540fb=_0x108103;if(this[_0x4540fb(0x322)](_0x37dfa2))return VisuMZ[_0x4540fb(0x3ae)][_0x4540fb(0x2d6)][_0x4540fb(0x509)][_0x4540fb(0x596)];else{if(this['isWeapon'](_0x37dfa2)){if(_0x4540fb(0x547)===_0x4540fb(0x547))return VisuMZ[_0x4540fb(0x3ae)][_0x4540fb(0x2d6)][_0x4540fb(0x509)][_0x4540fb(0x4d8)];else{const _0x2436cf=this[_0x4540fb(0x42e)]();let _0x2aa84d=0x0;_0x27395e[_0x4540fb(0x34f)]?_0x2aa84d=this[_0x4540fb(0x422)][_0x4540fb(0x490)](_0x770871,!![]):_0x2aa84d=this[_0x4540fb(0x422)]['param'](_0x28bb0f);const _0x458e97=_0x2aa84d;this[_0x4540fb(0x3bf)](_0x2aa84d,_0x301887,_0x4009ad,_0x51b683-_0x2436cf,_0x4540fb(0x170));}}else{if(this[_0x4540fb(0x44b)](_0x37dfa2))return VisuMZ[_0x4540fb(0x3ae)][_0x4540fb(0x2d6)][_0x4540fb(0x509)][_0x4540fb(0x242)];}}},DataManager['getItemIdWithName']=function(_0x1e153d){const _0x23e6ab=_0x108103;_0x1e153d=_0x1e153d['toUpperCase']()['trim'](),this['_itemIDs']=this[_0x23e6ab(0x390)]||{};if(this[_0x23e6ab(0x390)][_0x1e153d])return this[_0x23e6ab(0x390)][_0x1e153d];for(const _0x2d9a86 of $dataItems){if(!_0x2d9a86)continue;this[_0x23e6ab(0x390)][_0x2d9a86['name'][_0x23e6ab(0x45c)]()['trim']()]=_0x2d9a86['id'];}return this['_itemIDs'][_0x1e153d]||0x0;},DataManager['getWeaponIdWithName']=function(_0x283d5e){const _0x4ea248=_0x108103;_0x283d5e=_0x283d5e[_0x4ea248(0x45c)]()['trim'](),this['_weaponIDs']=this[_0x4ea248(0x5ad)]||{};if(this[_0x4ea248(0x5ad)][_0x283d5e])return this['_weaponIDs'][_0x283d5e];for(const _0xb10c61 of $dataWeapons){if(!_0xb10c61)continue;this[_0x4ea248(0x5ad)][_0xb10c61[_0x4ea248(0x2f6)][_0x4ea248(0x45c)]()[_0x4ea248(0x425)]()]=_0xb10c61['id'];}return this[_0x4ea248(0x5ad)][_0x283d5e]||0x0;},DataManager[_0x108103(0x57e)]=function(_0x46f71b){const _0x46ca59=_0x108103;_0x46f71b=_0x46f71b['toUpperCase']()[_0x46ca59(0x425)](),this[_0x46ca59(0x2bb)]=this[_0x46ca59(0x2bb)]||{};if(this[_0x46ca59(0x2bb)][_0x46f71b])return this[_0x46ca59(0x2bb)][_0x46f71b];for(const _0x581358 of $dataArmors){if(!_0x581358)continue;this[_0x46ca59(0x2bb)][_0x581358[_0x46ca59(0x2f6)][_0x46ca59(0x45c)]()[_0x46ca59(0x425)]()]=_0x581358['id'];}return this[_0x46ca59(0x2bb)][_0x46f71b]||0x0;},VisuMZ[_0x108103(0x3ae)]['SetupProxyItemGroups']=function(){const _0xafa55a=_0x108103;VisuMZ[_0xafa55a(0x3ae)][_0xafa55a(0x595)]($dataItems),VisuMZ[_0xafa55a(0x3ae)][_0xafa55a(0x595)]($dataWeapons),VisuMZ[_0xafa55a(0x3ae)][_0xafa55a(0x595)]($dataArmors);},VisuMZ[_0x108103(0x3ae)]['SetupProxyItemGroup']=function(_0x125a77){const _0x3a9559=_0x108103;for(const _0x2a9799 of _0x125a77){if(_0x3a9559(0x3f6)!==_0x3a9559(0x3f6))this[_0x3a9559(0x2f5)][_0x3a9559(0x16f)](new _0x2188de());else{if(!_0x2a9799)continue;if(!DataManager[_0x3a9559(0x20b)](_0x2a9799))continue;const _0x72507=DataManager[_0x3a9559(0x1df)](_0x2a9799),_0x4447d9=[_0x3a9559(0x2f6),_0x3a9559(0x482),'description'];for(const _0xbb9342 of _0x4447d9){_0x2a9799[_0xbb9342]=_0x72507[_0xbb9342];}}}},DataManager[_0x108103(0x20b)]=function(_0x3e7b9f){const _0x34509b=_0x108103;if(!_0x3e7b9f)return![];if(!_0x3e7b9f[_0x34509b(0x412)])return![];return _0x3e7b9f&&_0x3e7b9f[_0x34509b(0x412)][_0x34509b(0x1a3)](/<PROXY:[ ](.*)>/i);},DataManager[_0x108103(0x1df)]=function(_0x22349d){const _0x3cd2ed=_0x108103;return this[_0x3cd2ed(0x20b)](_0x22349d)?(_0x22349d=this[_0x3cd2ed(0x19a)](_0x22349d)||_0x22349d,this[_0x3cd2ed(0x20b)](_0x22349d)?this[_0x3cd2ed(0x1df)](_0x22349d):_0x22349d):_0x3cd2ed(0x551)!==_0x3cd2ed(0x463)?_0x22349d:_0x22fb34[_0x3cd2ed(0x3ae)][_0x3cd2ed(0x2d6)][_0x3cd2ed(0x509)][_0x3cd2ed(0x3de)];},DataManager[_0x108103(0x19a)]=function(_0x411ae1){const _0x5a8433=_0x108103;_0x411ae1[_0x5a8433(0x412)][_0x5a8433(0x1a3)](/<PROXY:[ ](.*)>/i);const _0x7d6c3=RegExp['$1'][_0x5a8433(0x425)](),_0x45f7cd=/^\d+$/[_0x5a8433(0x59a)](_0x7d6c3);if(this[_0x5a8433(0x322)](_0x411ae1)){const _0x1b1b08=_0x45f7cd?Number(RegExp['$1']):DataManager[_0x5a8433(0x48c)](_0x7d6c3);return $dataItems[_0x1b1b08]||_0x411ae1;}else{if(this['isWeapon'](_0x411ae1)){const _0x35d6a7=_0x45f7cd?Number(RegExp['$1']):DataManager[_0x5a8433(0x171)](_0x7d6c3);return $dataWeapons[_0x35d6a7]||_0x411ae1;}else{if(this[_0x5a8433(0x44b)](_0x411ae1)){const _0x59a0a6=_0x45f7cd?Number(RegExp['$1']):DataManager[_0x5a8433(0x57e)](_0x7d6c3);return $dataArmors[_0x59a0a6]||_0x411ae1;}}}return _0x411ae1;},VisuMZ['ItemsEquipsCore'][_0x108103(0x252)]=Window_ItemList[_0x108103(0x2ab)][_0x108103(0x25e)],Window_ItemList['prototype'][_0x108103(0x25e)]=function(){const _0x264032=_0x108103;if($gameTemp[_0x264032(0x388)])return VisuMZ[_0x264032(0x3ae)]['Window_ItemList_item']['call'](this);return DataManager[_0x264032(0x1df)](VisuMZ['ItemsEquipsCore']['Window_ItemList_item']['call'](this));},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x51e)]=function(){const _0x11b8f9=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x11b8f9(0x252)][_0x11b8f9(0x174)](this);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x2d3)]=Window_ShopBuy['prototype'][_0x108103(0x25e)],Window_ShopBuy['prototype'][_0x108103(0x25e)]=function(){const _0x4fe9db=_0x108103;if($gameTemp[_0x4fe9db(0x388)])return VisuMZ[_0x4fe9db(0x3ae)][_0x4fe9db(0x2d3)][_0x4fe9db(0x174)](this);return DataManager[_0x4fe9db(0x1df)](VisuMZ[_0x4fe9db(0x3ae)][_0x4fe9db(0x2d3)][_0x4fe9db(0x174)](this));},Window_ShopBuy[_0x108103(0x2ab)][_0x108103(0x51e)]=function(){const _0x1ad5e8=_0x108103;return VisuMZ[_0x1ad5e8(0x3ae)][_0x1ad5e8(0x2d3)][_0x1ad5e8(0x174)](this);},VisuMZ[_0x108103(0x3ae)]['Window_ShopStatus_setItem']=Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x4c4)],Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x4c4)]=function(_0x244423){const _0xb011e=_0x108103;_0x244423=DataManager[_0xb011e(0x1df)](_0x244423),VisuMZ[_0xb011e(0x3ae)][_0xb011e(0x340)][_0xb011e(0x174)](this,_0x244423);},VisuMZ['ItemsEquipsCore'][_0x108103(0x456)]=Game_Item['prototype']['setObject'],Game_Item[_0x108103(0x2ab)][_0x108103(0x152)]=function(_0x31b7df){const _0x412822=_0x108103;if(DataManager[_0x412822(0x20b)](_0x31b7df))return;VisuMZ['ItemsEquipsCore']['Game_Item_setObject'][_0x412822(0x174)](this,_0x31b7df);},DataManager[_0x108103(0x486)]=function(_0x443329){const _0xa9e469=_0x108103;if(!this[_0xa9e469(0x44b)](_0x443329))return![];const _0x1fdb30=_0x443329['note'];if(!_0x1fdb30)return![];if(_0x1fdb30[_0xa9e469(0x1a3)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1fdb30[_0xa9e469(0x1a3)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1fdb30[_0xa9e469(0x1a3)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1fdb30[_0xa9e469(0x1a3)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x108103(0x330)]=function(_0x46a9ce){const _0x12e867=_0x108103;if(!this[_0x12e867(0x486)](_0x46a9ce))return![];const _0xa22b08=_0x46a9ce[_0x12e867(0x412)];if(!_0xa22b08)return![];if(_0xa22b08['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xa22b08[_0x12e867(0x1a3)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isPartyArtifact']=function(_0x2174ba){const _0x2c1c56=_0x108103;if(!this[_0x2c1c56(0x486)](_0x2174ba))return![];const _0x299277=_0x2174ba[_0x2c1c56(0x412)];if(!_0x299277)return![];if(_0x299277[_0x2c1c56(0x1a3)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x299277[_0x2c1c56(0x1a3)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isTroopArtifact']=function(_0x1a390b){const _0x103f12=_0x108103;if(!this['isArtifact'](_0x1a390b))return![];const _0xc75bd8=_0x1a390b[_0x103f12(0x412)];if(!_0xc75bd8)return![];if(_0xc75bd8[_0x103f12(0x1a3)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xc75bd8['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x597)]=Game_BattlerBase['prototype']['canEquip'],Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x17a)]=function(_0x48236b){const _0x1c6a14=_0x108103;if(DataManager[_0x1c6a14(0x486)](_0x48236b))return![];return VisuMZ['ItemsEquipsCore'][_0x1c6a14(0x597)]['call'](this,_0x48236b);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x5b0)]=Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x516)],Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x516)]=function(_0x5fc10f){const _0x4075fb=_0x108103;this[_0x4075fb(0x31f)]=!![];const _0x10e22e=VisuMZ[_0x4075fb(0x3ae)][_0x4075fb(0x5b0)][_0x4075fb(0x174)](this,_0x5fc10f);return this[_0x4075fb(0x31f)]=undefined,_0x10e22e;},VisuMZ['ItemsEquipsCore'][_0x108103(0x2b7)]=Game_Actor['prototype'][_0x108103(0x525)],Game_Actor[_0x108103(0x2ab)][_0x108103(0x525)]=function(){const _0x2db457=_0x108103;this[_0x2db457(0x5ac)]=!![];const _0x185229=VisuMZ[_0x2db457(0x3ae)][_0x2db457(0x2b7)][_0x2db457(0x174)](this);return this[_0x2db457(0x5ac)]=undefined,_0x185229;},VisuMZ[_0x108103(0x3ae)][_0x108103(0x49e)]=Game_Actor[_0x108103(0x2ab)]['equips'],Game_Actor['prototype'][_0x108103(0x1a2)]=function(){const _0x372859=_0x108103,_0xd9da80=VisuMZ[_0x372859(0x3ae)][_0x372859(0x49e)][_0x372859(0x174)](this);if(this[_0x372859(0x5ac)]||this[_0x372859(0x31f)]){if(_0x372859(0x195)!==_0x372859(0x195))_0xf4307b[_0x372859(0x3ec)]=this[_0x372859(0x216)];else{const _0x14ba81=_0xd9da80[_0x372859(0x397)]($gameParty[_0x372859(0x39e)]());return _0x14ba81;}}else return _0xd9da80;},VisuMZ[_0x108103(0x3ae)]['Game_BattlerBase_paramPlus_artifact']=Game_BattlerBase['prototype'][_0x108103(0x215)],Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x215)]=function(_0x123749){const _0xec97bf=_0x108103;let _0x15f9d8=VisuMZ['ItemsEquipsCore'][_0xec97bf(0x271)][_0xec97bf(0x174)](this,_0x123749);if(this['constructor']===Game_Enemy)for(const _0xe9c578 of $gameParty[_0xec97bf(0x2c0)]()){if('puceJ'!==_0xec97bf(0x5b9)){if(this[_0xec97bf(0x398)]())return this[_0xec97bf(0x504)]();else{const _0x53f43a=_0x24bb96[_0xec97bf(0x3ae)][_0xec97bf(0x58d)][_0xec97bf(0x174)](this);return this[_0xec97bf(0x549)]()&&this['adjustItemWidthByStatus']()&&(_0x53f43a[_0xec97bf(0x2f7)]-=this[_0xec97bf(0x1e6)]()),_0x53f43a;}}else{if(_0xe9c578)_0x15f9d8+=_0xe9c578[_0xec97bf(0x167)][_0x123749];}}return _0x15f9d8;},VisuMZ[_0x108103(0x3ae)][_0x108103(0x22d)]=Game_Enemy[_0x108103(0x2ab)][_0x108103(0x525)],Game_Enemy['prototype']['traitObjects']=function(){const _0x52a867=_0x108103;let _0x329cbb=VisuMZ[_0x52a867(0x3ae)][_0x52a867(0x22d)]['call'](this);return _0x329cbb[_0x52a867(0x397)]($gameParty[_0x52a867(0x2c0)]());},VisuMZ[_0x108103(0x3ae)]['Game_Party_gainItem_artifact']=Game_Party[_0x108103(0x2ab)][_0x108103(0x424)],Game_Party['prototype'][_0x108103(0x424)]=function(_0x4b92ec,_0x454c2f,_0x1d0275){const _0x2c6ad1=_0x108103;VisuMZ['ItemsEquipsCore'][_0x2c6ad1(0x254)][_0x2c6ad1(0x174)](this,_0x4b92ec,_0x454c2f,_0x1d0275);if(DataManager[_0x2c6ad1(0x486)](_0x4b92ec)){let _0xa90ee8=$gameParty[_0x2c6ad1(0x1c2)]();if($gameParty['inBattle']())_0xa90ee8=_0xa90ee8[_0x2c6ad1(0x397)]($gameTroop[_0x2c6ad1(0x35c)]());for(const _0x48089c of $gameTroop[_0x2c6ad1(0x35c)]()){if('yonmB'!==_0x2c6ad1(0x411))return _0x2c6ad1(0x1d2);else{if(!_0x48089c)continue;_0x48089c[_0x2c6ad1(0x593)]={};}}}},Game_Party['prototype'][_0x108103(0x39e)]=function(){const _0x561f99=_0x108103;let _0x9e65c0=[];for(const _0x27afe7 of this['armors']()){if(!_0x27afe7)continue;if(!DataManager[_0x561f99(0x486)](_0x27afe7))continue;if(!DataManager['isPartyArtifact'](_0x27afe7))continue;let _0xdedb1a=0x1;if(DataManager[_0x561f99(0x330)](_0x27afe7))_0xdedb1a=this['numItems'](_0x27afe7);while(_0xdedb1a--)_0x9e65c0[_0x561f99(0x16f)](_0x27afe7);}return _0x9e65c0;},Game_Party['prototype'][_0x108103(0x2c0)]=function(){const _0x4d31da=_0x108103;let _0x2db00e=[];for(const _0x3bb9db of this[_0x4d31da(0x20e)]()){if(!_0x3bb9db)continue;if(!DataManager[_0x4d31da(0x486)](_0x3bb9db))continue;if(!DataManager['isTroopArtifact'](_0x3bb9db))continue;let _0x4eab10=0x1;if(DataManager['isStackableArtifact'](_0x3bb9db))_0x4eab10=this['numItems'](_0x3bb9db);while(_0x4eab10--)_0x2db00e['push'](_0x3bb9db);}return _0x2db00e;},Game_Party[_0x108103(0x2ab)][_0x108103(0x14f)]=function(){const _0x5ed5c4=_0x108103;return this[_0x5ed5c4(0x39e)]()[_0x5ed5c4(0x397)](this[_0x5ed5c4(0x2c0)]());},VisuMZ[_0x108103(0x3ae)][_0x108103(0x380)]=Game_Party[_0x108103(0x2ab)][_0x108103(0x5ca)],Game_Party[_0x108103(0x2ab)][_0x108103(0x5ca)]=function(){const _0x37a3aa=_0x108103;VisuMZ[_0x37a3aa(0x3ae)][_0x37a3aa(0x380)][_0x37a3aa(0x174)](this),this['removeBattleTestArtifacts']();},Game_Party[_0x108103(0x2ab)][_0x108103(0x1f8)]=function(){const _0x6aadd3=_0x108103,_0x395c75=$gameParty[_0x6aadd3(0x20e)]()[_0x6aadd3(0x2e4)](_0x3cf838=>DataManager[_0x6aadd3(0x486)](_0x3cf838));for(const _0x51c1d9 of _0x395c75){const _0x174759=this[_0x6aadd3(0x443)](_0x51c1d9);if(_0x174759)this[_0x6aadd3(0x25c)](_0x51c1d9,_0x174759);}},ColorManager[_0x108103(0x38a)]=function(_0x5563e3){const _0x52bfd6=_0x108103;if(!_0x5563e3)return this[_0x52bfd6(0x29d)]();else{if(_0x5563e3[_0x52bfd6(0x412)]['match'](/<COLOR:[ ](\d+)>/i)){if(_0x52bfd6(0x2c6)===_0x52bfd6(0x51c)){if(_0x4779dd[_0x52bfd6(0x4bc)](_0x3c9dfa))return![];}else return this[_0x52bfd6(0x555)](Number(RegExp['$1'])['clamp'](0x0,0x1f));}else return _0x5563e3[_0x52bfd6(0x412)][_0x52bfd6(0x1a3)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x52bfd6(0x29d)]();}},ColorManager[_0x108103(0x35b)]=function(_0x190187){const _0x332be2=_0x108103;return _0x190187=String(_0x190187),_0x190187[_0x332be2(0x1a3)](/#(.*)/i)?'#%1'[_0x332be2(0x423)](String(RegExp['$1'])):this[_0x332be2(0x555)](Number(_0x190187));},SceneManager[_0x108103(0x587)]=function(){const _0x107326=_0x108103;return this[_0x107326(0x3f2)]&&this[_0x107326(0x3f2)][_0x107326(0x5d9)]===Scene_Shop;},Game_Temp[_0x108103(0x2ab)][_0x108103(0x2a3)]=function(){const _0xc22621=_0x108103;if(this[_0xc22621(0x1ef)])return![];return VisuMZ[_0xc22621(0x3ae)][_0xc22621(0x2d6)][_0xc22621(0x1d7)][_0xc22621(0x164)];},VisuMZ[_0x108103(0x383)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x108103(0x325)]['MultiplierStandard'],VisuMZ[_0x108103(0x3ae)][_0x108103(0x24b)]=Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x516)],Game_BattlerBase['prototype'][_0x108103(0x516)]=function(_0x221e0e){const _0x1010da=_0x108103;if(this[_0x1010da(0x387)])return this[_0x1010da(0x561)]?VisuMZ[_0x1010da(0x383)]:0x1;else{if(_0x1010da(0x145)!==_0x1010da(0x543))return VisuMZ['ItemsEquipsCore'][_0x1010da(0x24b)]['call'](this,_0x221e0e);else!this['processCursorSpecialCheckModernControls']()&&_0x43fb2d['prototype'][_0x1010da(0x2cd)][_0x1010da(0x174)](this);}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x36a)]=Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x44e)],Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x44e)]=function(_0x516004){const _0x4fdeaf=_0x108103;if(!_0x516004)return![];if(!VisuMZ[_0x4fdeaf(0x3ae)]['Game_BattlerBase_meetsItemConditions'][_0x4fdeaf(0x174)](this,_0x516004))return![];if(!this[_0x4fdeaf(0x3d3)](_0x516004))return![];if(!this[_0x4fdeaf(0x392)](_0x516004))return![];return!![];},Game_BattlerBase['prototype'][_0x108103(0x3d3)]=function(_0x38b46c){if(!this['checkItemConditionsSwitchNotetags'](_0x38b46c))return![];return!![];},Game_BattlerBase[_0x108103(0x2ab)][_0x108103(0x196)]=function(_0x201f3e){const _0x3bab61=_0x108103,_0x394421=_0x201f3e[_0x3bab61(0x412)];if(_0x394421[_0x3bab61(0x1a3)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30b14a=JSON[_0x3bab61(0x563)]('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x1d49c6 of _0x30b14a){if(_0x3bab61(0x373)!==_0x3bab61(0x367)){if(!$gameSwitches[_0x3bab61(0x4bc)](_0x1d49c6))return![];}else{this['changePaintOpacity'](this['isEnabled'](null));const _0x32fd0e=_0x3777e1[_0x3bab61(0x3ae)][_0x3bab61(0x2d6)][_0x3bab61(0x46b)],_0x2216a8=this[_0x3bab61(0x224)](_0x4ad1f4),_0x14baa9=_0x2216a8['y']+(this[_0x3bab61(0x28d)]()-_0x471408['iconHeight'])/0x2,_0xadecfd=_0xb1c144['iconWidth']+0x4,_0x5e35e2=_0x30f4fd[_0x3bab61(0x317)](0x0,_0x2216a8[_0x3bab61(0x2f7)]-_0xadecfd);this[_0x3bab61(0x31b)](),this[_0x3bab61(0x577)](_0x32fd0e[_0x3bab61(0x4ec)],_0x2216a8['x'],_0x14baa9),this[_0x3bab61(0x3bf)](_0x32fd0e[_0x3bab61(0x335)],_0x2216a8['x']+_0xadecfd,_0x2216a8['y'],_0x5e35e2),this[_0x3bab61(0x494)](!![]);}}return!![];}if(_0x394421[_0x3bab61(0x1a3)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('DKQUK'!==_0x3bab61(0x1d5)){const _0x16735d=JSON['parse']('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x1cde57 of _0x16735d){if(_0x3bab61(0x469)!==_0x3bab61(0x19b)){if(!$gameSwitches[_0x3bab61(0x4bc)](_0x1cde57))return![];}else{if(!this['checkItemConditionsSwitchNotetags'](_0x33061a))return![];return!![];}}return!![];}else return this['_categoryWindow']&&this[_0x3bab61(0x590)][_0x3bab61(0x45a)]();}if(_0x394421['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5cd702=JSON[_0x3bab61(0x563)]('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x52328f of _0x5cd702){if(_0x3bab61(0x290)===_0x3bab61(0x5cf))this[_0x3bab61(0x3b8)](_0x179200);else{if($gameSwitches[_0x3bab61(0x4bc)](_0x52328f))return!![];}}return![];}if(_0x394421[_0x3bab61(0x1a3)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3bab61(0x28a)===_0x3bab61(0x4c8)){if(this[_0x3bab61(0x1ee)]())return _0x3160eb[_0x3bab61(0x3ae)][_0x3bab61(0x2d6)][_0x3bab61(0x46b)][_0x3bab61(0x283)];return _0x522be5[_0x3bab61(0x2ab)][_0x3bab61(0x5cb)][_0x3bab61(0x174)](this);}else{const _0x309ddd=JSON[_0x3bab61(0x563)]('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x2f2fff of _0x309ddd){if(!$gameSwitches[_0x3bab61(0x4bc)](_0x2f2fff))return!![];}return![];}}if(_0x394421[_0x3bab61(0x1a3)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42825d=JSON[_0x3bab61(0x563)]('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x250307 of _0x42825d){if(!$gameSwitches[_0x3bab61(0x4bc)](_0x250307))return!![];}return![];}if(_0x394421[_0x3bab61(0x1a3)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3bab61(0x350)!=='rnveu'){const _0x3a7769=JSON[_0x3bab61(0x563)]('['+RegExp['$1'][_0x3bab61(0x1a3)](/\d+/g)+']');for(const _0x2b68ca of _0x3a7769){if(_0x3bab61(0x56f)===_0x3bab61(0x56f)){if($gameSwitches[_0x3bab61(0x4bc)](_0x2b68ca))return![];}else this[_0x3bab61(0x1e1)](_0x243258,_0x3eecbc,_0x1f4584,_0x2e8dc5,!![]),_0x57f50b[_0x3bab61(0x3e4)][_0x3bab61(0x2d6)]['Param'][_0x3bab61(0x1cd)]&&(_0x21b016+=_0x3f2d46[_0x3bab61(0x574)]+0x4);}return!![];}else return this[_0x3bab61(0x2a5)]();}return!![];},Game_BattlerBase['prototype'][_0x108103(0x392)]=function(_0x5351a7){const _0x31fa17=_0x108103,_0xe7a1a6=_0x5351a7[_0x31fa17(0x412)],_0x20f1f1=VisuMZ['ItemsEquipsCore'][_0x31fa17(0x207)];return _0x20f1f1[_0x5351a7['id']]?_0x20f1f1[_0x5351a7['id']][_0x31fa17(0x174)](this,_0x5351a7):!![];},Game_Actor['prototype']['initEquips']=function(_0x292a76){const _0x36044e=_0x108103;_0x292a76=this['convertInitEquipsToItems'](_0x292a76);const _0x5ec0e8=this[_0x36044e(0x4fd)]();this['_equips']=[];for(let _0x4e8f4b=0x0;_0x4e8f4b<_0x5ec0e8[_0x36044e(0x468)];_0x4e8f4b++){if(_0x36044e(0x302)===_0x36044e(0x363))return _0x1f0695[_0x36044e(0x3ae)][_0x36044e(0x2d6)][_0x36044e(0x46b)]['CmdTextAlign'];else this[_0x36044e(0x2f5)][_0x4e8f4b]=new Game_Item();}for(let _0x58ac98=0x0;_0x58ac98<_0x5ec0e8['length'];_0x58ac98++){const _0x52df99=_0x5ec0e8[_0x58ac98],_0x3f0e61=this[_0x36044e(0x143)](_0x292a76,_0x52df99);if(this['canEquip'](_0x3f0e61))this[_0x36044e(0x2f5)][_0x58ac98]['setObject'](_0x3f0e61);}this[_0x36044e(0x4f1)](!![]),this[_0x36044e(0x3f4)]();},Game_Actor['prototype'][_0x108103(0x18c)]=function(_0x4e9a2a){const _0x4f314f=_0x108103,_0x1256b8=[];for(let _0x322b5a=0x0;_0x322b5a<_0x4e9a2a[_0x4f314f(0x468)];_0x322b5a++){const _0x2ac7a5=_0x4e9a2a[_0x322b5a];if(_0x2ac7a5<=0x0)continue;const _0x5a4afa=$dataSystem[_0x4f314f(0x3dd)][_0x322b5a+0x1];if(_0x5a4afa===$dataSystem['equipTypes'][0x1]||_0x322b5a===0x1&&this[_0x4f314f(0x4ef)]())_0x1256b8[_0x4f314f(0x16f)]($dataWeapons[_0x2ac7a5]);else{if(BattleManager[_0x4f314f(0x1ed)]()){const _0x528cfe=$dataArmors[_0x2ac7a5];if(_0x528cfe&&_0x528cfe[_0x4f314f(0x1db)]===_0x322b5a+0x1){if(_0x4f314f(0x1c3)===_0x4f314f(0x16d)){if(_0x40c0b9[_0x4f314f(0x4bc)](_0x20d009))return![];}else _0x1256b8[_0x4f314f(0x16f)](_0x528cfe);}}else{if('agZVT'!=='agZVT')_0x5d6377[_0x4f314f(0x3ae)][_0x4f314f(0x137)]['call'](this),this[_0x4f314f(0x45a)]()&&this[_0x4f314f(0x2bc)]();else{const _0x509395=$dataArmors[_0x2ac7a5];if(_0x509395&&_0x509395[_0x4f314f(0x1db)]===_0x322b5a+0x1){if('RBpYl'===_0x4f314f(0x2da))_0x1256b8[_0x4f314f(0x16f)](_0x509395);else{const _0x48bedf=this[_0x4f314f(0x24d)]()?0x0:_0x5e22d8['boxWidth']-this[_0x4f314f(0x1e6)](),_0x10c3ac=this[_0x4f314f(0x27a)](),_0x40c68b=this[_0x4f314f(0x1e6)](),_0x30bc44=this[_0x4f314f(0x370)]();return new _0x2af9a9(_0x48bedf,_0x10c3ac,_0x40c68b,_0x30bc44);}}}}}}return _0x1256b8;},Game_Actor[_0x108103(0x2ab)][_0x108103(0x143)]=function(_0x49cc98,_0x26967e){const _0x4c6279=_0x108103;for(const _0x123ff8 of _0x49cc98){if(!_0x123ff8)continue;if(_0x123ff8[_0x4c6279(0x1db)]===_0x26967e)return _0x49cc98[_0x4c6279(0x407)](_0x49cc98[_0x4c6279(0x1ff)](_0x123ff8),0x1),_0x123ff8;}return null;},Game_Actor['prototype'][_0x108103(0x4fd)]=function(){const _0x34b933=_0x108103,_0xed0ff=JsonEx[_0x34b933(0x50e)](this[_0x34b933(0x2ef)]||this[_0x34b933(0x365)]()[_0x34b933(0x4fd)]);if(_0xed0ff[_0x34b933(0x468)]>=0x2&&this['isDualWield']())_0xed0ff[0x1]=0x1;return _0xed0ff;},Game_Actor[_0x108103(0x2ab)][_0x108103(0x3ce)]=function(_0x4e73e1){const _0x354ec8=_0x108103;_0x4e73e1[_0x354ec8(0x464)](0x0),_0x4e73e1['remove'](-0x1),this[_0x354ec8(0x2ef)]=_0x4e73e1,this['refresh'](),this[_0x354ec8(0x4b0)]();},Game_Actor[_0x108103(0x2ab)]['forceResetEquipSlots']=function(){const _0x4bad8f=_0x108103;this[_0x4bad8f(0x2ef)]=undefined,this['refresh'](),this[_0x4bad8f(0x4b0)]();},Game_Actor[_0x108103(0x2ab)][_0x108103(0x4b0)]=function(){const _0x3d7dae=_0x108103;let _0x12251c=this['equipSlots']()[_0x3d7dae(0x468)];while(this[_0x3d7dae(0x2f5)][_0x3d7dae(0x468)]>_0x12251c){const _0x5e5606=this['_equips'][this[_0x3d7dae(0x2f5)][_0x3d7dae(0x468)]-0x1];_0x5e5606&&_0x5e5606[_0x3d7dae(0x34d)]()&&$gameParty['gainItem'](_0x5e5606['object'](),0x1),this[_0x3d7dae(0x2f5)][_0x3d7dae(0x21e)]();}while(_0x12251c>this['_equips'][_0x3d7dae(0x468)]){_0x3d7dae(0x4aa)!==_0x3d7dae(0x34b)?this[_0x3d7dae(0x2f5)][_0x3d7dae(0x16f)](new Game_Item()):_0xe21743[_0x3d7dae(0x3ae)][_0x3d7dae(0x538)][_0x3d7dae(0x174)](this,_0xbf4037,_0x3fbb12);}},Game_Actor[_0x108103(0x2ab)][_0x108103(0x27e)]=function(){const _0x5ce1a2=_0x108103,_0x49d96b=this['equipSlots']();for(let _0x362c4c=0x0;_0x362c4c<_0x49d96b[_0x5ce1a2(0x468)];_0x362c4c++){if(!this[_0x5ce1a2(0x2f5)][_0x362c4c])this['_equips'][_0x362c4c]=new Game_Item();}this['releaseUnequippableItems'](![]),this['refresh']();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x538)]=Game_Actor[_0x108103(0x2ab)][_0x108103(0x492)],Game_Actor[_0x108103(0x2ab)][_0x108103(0x492)]=function(_0x39bf98,_0x8f9d3e){const _0xa77c6=_0x108103;if(!this[_0xa77c6(0x3f1)]){const _0xbcef34=JsonEx[_0xa77c6(0x50e)](this);_0xbcef34[_0xa77c6(0x3f1)]=!![],VisuMZ['ItemsEquipsCore'][_0xa77c6(0x538)][_0xa77c6(0x174)](this,_0x39bf98,_0x8f9d3e),this[_0xa77c6(0x178)](_0xbcef34);}else VisuMZ[_0xa77c6(0x3ae)][_0xa77c6(0x538)][_0xa77c6(0x174)](this,_0x39bf98,_0x8f9d3e);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x419)]=Game_Actor[_0x108103(0x2ab)][_0x108103(0x203)],Game_Actor[_0x108103(0x2ab)]['forceChangeEquip']=function(_0x446b12,_0x17f74d){const _0x107cc3=_0x108103;if(!this[_0x107cc3(0x3f1)]){const _0x2cadb8=JsonEx[_0x107cc3(0x50e)](this);_0x2cadb8[_0x107cc3(0x3f1)]=!![],VisuMZ[_0x107cc3(0x3ae)][_0x107cc3(0x419)][_0x107cc3(0x174)](this,_0x446b12,_0x17f74d),this[_0x107cc3(0x178)](_0x2cadb8);}else _0x107cc3(0x3cc)===_0x107cc3(0x4e1)?_0x5525fc['prototype'][_0x107cc3(0x589)]['call'](this,_0x14d260,_0x317405,_0x2cef52,_0x5def4b):VisuMZ[_0x107cc3(0x3ae)]['Game_Actor_forceChangeEquip'][_0x107cc3(0x174)](this,_0x446b12,_0x17f74d);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x14c)]=Game_Actor['prototype'][_0x108103(0x55d)],Game_Actor[_0x108103(0x2ab)]['discardEquip']=function(_0xc0ac72){const _0x1f9c4e=_0x108103;if(!this[_0x1f9c4e(0x3f1)]){if(_0x1f9c4e(0x581)===_0x1f9c4e(0x581)){const _0x90733b=JsonEx['makeDeepCopy'](this);_0x90733b[_0x1f9c4e(0x3f1)]=!![],VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip'][_0x1f9c4e(0x174)](this,_0xc0ac72),this[_0x1f9c4e(0x178)](_0x90733b);}else{const _0x23876b=this[_0x1f9c4e(0x2d5)](_0x4ee4d6);if(_0x23876b===_0x1f9c4e(0x269))this[_0x1f9c4e(0x3b8)](_0xe3106d);else _0x23876b===_0x1f9c4e(0x1d2)?this[_0x1f9c4e(0x40e)](_0x589797):_0x1e9b65[_0x1f9c4e(0x2ab)][_0x1f9c4e(0x29c)][_0x1f9c4e(0x174)](this,_0x115e59);}}else{if(_0x1f9c4e(0x3a7)==='BZjaW')VisuMZ['ItemsEquipsCore'][_0x1f9c4e(0x14c)][_0x1f9c4e(0x174)](this,_0xc0ac72);else return _0x4302e0[_0x1f9c4e(0x3ae)][_0x1f9c4e(0x2d6)][_0x1f9c4e(0x325)][_0x1f9c4e(0x258)];}},Game_Actor[_0x108103(0x2ab)][_0x108103(0x4f1)]=function(_0x3539d1){const _0x2cccd2=_0x108103;if(this[_0x2cccd2(0x2f9)])return;for(;;){const _0x162cb3=this[_0x2cccd2(0x4fd)](),_0xd857c2=this[_0x2cccd2(0x1a2)](),_0x50f14e=_0xd857c2[_0x2cccd2(0x468)];let _0x570f1c=![];for(let _0x42cc1f=0x0;_0x42cc1f<_0x50f14e;_0x42cc1f++){const _0x22ba61=_0xd857c2[_0x42cc1f];if(_0x22ba61&&(!this[_0x2cccd2(0x17a)](_0x22ba61)||_0x22ba61['etypeId']!==_0x162cb3[_0x42cc1f])){!_0x3539d1&&this['tradeItemWithParty'](null,_0x22ba61);if(!this[_0x2cccd2(0x3f1)]){const _0x12b53f=JsonEx[_0x2cccd2(0x50e)](this);_0x12b53f[_0x2cccd2(0x3f1)]=!![],this[_0x2cccd2(0x2f5)][_0x42cc1f][_0x2cccd2(0x152)](null),this[_0x2cccd2(0x2f9)]=!![],this['equipAdjustHpMp'](_0x12b53f),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else{if(_0x2cccd2(0x4bb)!==_0x2cccd2(0x4bb)){const _0x286c7e=_0x2e08f8(_0x41a929['$1'])[_0x2cccd2(0x5be)](/[\r\n]+/);for(const _0x52084d of _0x286c7e){if(_0x52084d['match'](/(.*):[ ](.*)/i)){const _0x112021=_0x2295e0(_0x21a339['$1'])[_0x2cccd2(0x45c)]()[_0x2cccd2(0x425)](),_0x5709e0=_0x12213d(_0x1a9613['$2'])[_0x2cccd2(0x425)]();this[_0x2cccd2(0x42c)][_0x112021]=_0x5709e0;}}}else this[_0x2cccd2(0x2f5)][_0x42cc1f][_0x2cccd2(0x152)](null);}_0x570f1c=!![];}}if(!_0x570f1c){if(_0x2cccd2(0x382)!==_0x2cccd2(0x382)){const _0x1693f4=this[_0x2cccd2(0x28b)](_0x4c9c01);_0x1693f4?_0x182a88[_0x2cccd2(0x2ab)][_0x2cccd2(0x29c)][_0x2cccd2(0x174)](this,_0x45dbd4):this[_0x2cccd2(0x2ed)](_0x4e5a16);}else break;}}},Game_Actor['prototype'][_0x108103(0x178)]=function(_0x28af32){const _0x548023=_0x108103;if(this[_0x548023(0x3f1)])return;if(!VisuMZ[_0x548023(0x3ae)][_0x548023(0x2d6)][_0x548023(0x46b)][_0x548023(0x19d)])return;const _0x1732ab=Math['round'](_0x28af32[_0x548023(0x225)]()*this[_0x548023(0x3c4)]),_0x3fd1e1=Math['round'](_0x28af32[_0x548023(0x26b)]()*this[_0x548023(0x1f0)]);if(this['hp']>0x0)this[_0x548023(0x185)](_0x1732ab);if(this['mp']>0x0)this[_0x548023(0x5d6)](_0x3fd1e1);},Game_Actor[_0x108103(0x2ab)][_0x108103(0x304)]=function(){const _0x25f9c5=_0x108103,_0x13ccaa=this[_0x25f9c5(0x4fd)]()[_0x25f9c5(0x468)];for(let _0xe5fc72=0x0;_0xe5fc72<_0x13ccaa;_0xe5fc72++){if(_0x25f9c5(0x2d0)===_0x25f9c5(0x57b))_0x1852ab['remove'](0x0),_0x3e25ec[_0x25f9c5(0x464)](-0x1),this[_0x25f9c5(0x2ef)]=_0x29c55c,this[_0x25f9c5(0x3f4)](),this['updateChangedSlots']();else{if(this[_0x25f9c5(0x1b1)](_0xe5fc72))this['changeEquip'](_0xe5fc72,null);}}},Game_Actor[_0x108103(0x2ab)][_0x108103(0x1b1)]=function(_0x5d8731){const _0x287d36=_0x108103;if(this['nonRemovableEtypes']()[_0x287d36(0x4ff)](this[_0x287d36(0x4fd)]()[_0x5d8731]))return![];else{if(_0x287d36(0x534)!==_0x287d36(0x493))return this[_0x287d36(0x310)](_0x5d8731);else this[_0x287d36(0x582)]();}},Game_Actor['prototype'][_0x108103(0x40c)]=function(){const _0x582735=_0x108103;return VisuMZ[_0x582735(0x3ae)][_0x582735(0x2d6)][_0x582735(0x46b)][_0x582735(0x14b)];},Game_Actor['prototype']['optimizeEquipments']=function(){const _0x43ac51=_0x108103,_0x46f05e=this[_0x43ac51(0x4fd)]()[_0x43ac51(0x468)];for(let _0x308311=0x0;_0x308311<_0x46f05e;_0x308311++){if(this[_0x43ac51(0x592)](_0x308311))this[_0x43ac51(0x492)](_0x308311,null);}for(let _0x4618d3=0x0;_0x4618d3<_0x46f05e;_0x4618d3++){if(this[_0x43ac51(0x592)](_0x4618d3))this[_0x43ac51(0x492)](_0x4618d3,this[_0x43ac51(0x172)](_0x4618d3));}},Game_Actor[_0x108103(0x2ab)][_0x108103(0x592)]=function(_0x39917c){const _0x1f7c49=_0x108103;if(this[_0x1f7c49(0x55b)]()['includes'](this[_0x1f7c49(0x4fd)]()[_0x39917c])){if('LGkHp'!==_0x1f7c49(0x3a0))this[_0x1f7c49(0x387)]=!![],this['_shopStatusMenuAlly']=_0x47226f;else return![];}else{if(_0x1f7c49(0x491)===_0x1f7c49(0x491))return this[_0x1f7c49(0x310)](_0x39917c);else{const _0x323342=this[_0x1f7c49(0x4fd)]();for(let _0x145d38=0x0;_0x145d38<_0x323342[_0x1f7c49(0x468)];_0x145d38++){if(!this[_0x1f7c49(0x2f5)][_0x145d38])this['_equips'][_0x145d38]=new _0x58cd1b();}this[_0x1f7c49(0x4f1)](![]),this[_0x1f7c49(0x3f4)]();}}},Game_Actor[_0x108103(0x2ab)][_0x108103(0x55b)]=function(){const _0x15f99f=_0x108103;return VisuMZ[_0x15f99f(0x3ae)]['Settings']['EquipScene'][_0x15f99f(0x251)];},VisuMZ[_0x108103(0x3ae)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x108103(0x2ab)][_0x108103(0x542)],Game_Actor[_0x108103(0x2ab)][_0x108103(0x542)]=function(_0x5ec89f,_0x5973ef){const _0x77de87=_0x108103;if(this[_0x77de87(0x3f1)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x53da5c=VisuMZ[_0x77de87(0x3ae)][_0x77de87(0x559)][_0x77de87(0x174)](this,_0x5ec89f,_0x5973ef);return $gameTemp[_0x77de87(0x1ef)]=![],_0x53da5c;},Game_Actor[_0x108103(0x2ab)]['changeEquipById']=function(_0x2c2c53,_0x2118a7){const _0x316326=_0x108103,_0x2a5905=this[_0x316326(0x25f)](_0x2c2c53);if(_0x2a5905<0x0)return;const _0x221113=_0x2c2c53===0x1?$dataWeapons[_0x2118a7]:$dataArmors[_0x2118a7];this[_0x316326(0x492)](_0x2a5905,_0x221113);},Game_Actor[_0x108103(0x2ab)][_0x108103(0x25f)]=function(_0x2a966d){const _0x3d31f1=_0x108103;let _0x2b30ab=0x0;const _0x2ae975=this['equipSlots'](),_0x22a694=this[_0x3d31f1(0x1a2)]();for(let _0x24d3b0=0x0;_0x24d3b0<_0x2ae975['length'];_0x24d3b0++){if(_0x2ae975[_0x24d3b0]===_0x2a966d){_0x2b30ab=_0x24d3b0;if(!_0x22a694[_0x24d3b0])return _0x2b30ab;}}return _0x2b30ab;},VisuMZ[_0x108103(0x3ae)][_0x108103(0x2cb)]=Game_Actor[_0x108103(0x2ab)][_0x108103(0x215)],Game_Actor['prototype'][_0x108103(0x215)]=function(_0x9ced16){const _0x555d4a=_0x108103;let _0x44c6c5=VisuMZ[_0x555d4a(0x3ae)][_0x555d4a(0x2cb)][_0x555d4a(0x174)](this,_0x9ced16);for(const _0x495788 of this['equips']()){if(_0x555d4a(0x273)!==_0x555d4a(0x273))return _0xb4e55d[_0x555d4a(0x3ae)][_0x555d4a(0x2d6)][_0x555d4a(0x46b)][_0x555d4a(0x4eb)];else{if(_0x495788)_0x44c6c5+=this[_0x555d4a(0x5d0)](_0x495788,_0x9ced16);}}return _0x44c6c5;},Game_Actor[_0x108103(0x2ab)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x5d55d3,_0x1a694a){const _0x39be27=_0x108103;if(this[_0x39be27(0x49c)])return 0x0;const _0x46dfdd=(DataManager['isWeapon'](_0x5d55d3)?'W%1':_0x39be27(0x5bb))['format'](_0x5d55d3['id']),_0x368ed2=_0x39be27(0x43e)[_0x39be27(0x423)](_0x46dfdd,_0x1a694a);if(VisuMZ['ItemsEquipsCore'][_0x39be27(0x53b)][_0x368ed2]){if(_0x39be27(0x4a5)===_0x39be27(0x12f))_0x435153[_0x39be27(0x2ab)]['processCursorMove']['call'](this),this['checkShiftRemoveShortcut']();else{this[_0x39be27(0x49c)]=!![];const _0x4b8ab2=VisuMZ[_0x39be27(0x3ae)][_0x39be27(0x53b)][_0x368ed2][_0x39be27(0x174)](this,_0x5d55d3,_0x1a694a);return this[_0x39be27(0x49c)]=![],_0x4b8ab2;}}else return 0x0;},Game_Actor[_0x108103(0x2ab)][_0x108103(0x144)]=function(_0x5f2251){const _0x1cb1c2=_0x108103;this[_0x1cb1c2(0x387)]=!![],this[_0x1cb1c2(0x561)]=_0x5f2251;},VisuMZ[_0x108103(0x3ae)]['Game_Party_initialize']=Game_Party['prototype'][_0x108103(0x1cb)],Game_Party['prototype'][_0x108103(0x1cb)]=function(){const _0x3e5eca=_0x108103;VisuMZ[_0x3e5eca(0x3ae)][_0x3e5eca(0x4e4)][_0x3e5eca(0x174)](this),this[_0x3e5eca(0x5bc)]();},Game_Party[_0x108103(0x2ab)]['initNewItemsList']=function(){this['_newItemsList']=[];},Game_Party[_0x108103(0x2ab)][_0x108103(0x306)]=function(_0x377912){const _0x3fac3c=_0x108103;if(!$gameTemp[_0x3fac3c(0x2a3)]())return![];if(this[_0x3fac3c(0x40b)]===undefined)this['initNewItemsList']();let _0x20ce36='';if(DataManager['isItem'](_0x377912))_0x20ce36=_0x3fac3c(0x2c2)['format'](_0x377912['id']);else{if(DataManager[_0x3fac3c(0x4a4)](_0x377912))_0x20ce36='weapon-%1'[_0x3fac3c(0x423)](_0x377912['id']);else{if(DataManager['isArmor'](_0x377912))_0x20ce36=_0x3fac3c(0x3e1)[_0x3fac3c(0x423)](_0x377912['id']);else{if('WAmmK'!==_0x3fac3c(0x154)){const _0x432d85=_0x18a604(_0x51a3e9['$1'])[_0x3fac3c(0x5be)](/[\r\n]+/);for(const _0x5147fb of _0x432d85){if(_0x5147fb[_0x3fac3c(0x1a3)](/(.*):[ ](.*)/i)){const _0x401df5=_0x7f00f0(_0x2251ad['$1'])[_0x3fac3c(0x425)](),_0x4e9bbe=_0x560634(_0x44f3a2['$2'])[_0x3fac3c(0x425)]();this[_0x3fac3c(0x265)](_0x401df5,_0x4e9bbe,_0x1b8608,_0x1d6a52,_0x2caefa),_0x5d52b7+=this[_0x3fac3c(0x28d)]();}}}else return;}}}return this[_0x3fac3c(0x40b)][_0x3fac3c(0x4ff)](_0x20ce36);},Game_Party[_0x108103(0x2ab)][_0x108103(0x4ae)]=function(_0x4e7c7e){const _0x3395b5=_0x108103;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x3395b5(0x40b)]===undefined)this['initNewItemsList']();let _0x58c2f3='';if(DataManager[_0x3395b5(0x322)](_0x4e7c7e))_0x58c2f3=_0x3395b5(0x2c2)[_0x3395b5(0x423)](_0x4e7c7e['id']);else{if(DataManager[_0x3395b5(0x4a4)](_0x4e7c7e))_0x58c2f3='weapon-%1'[_0x3395b5(0x423)](_0x4e7c7e['id']);else{if(DataManager[_0x3395b5(0x44b)](_0x4e7c7e))_0x58c2f3=_0x3395b5(0x3e1)[_0x3395b5(0x423)](_0x4e7c7e['id']);else{if(_0x3395b5(0x263)!=='IGjOU')return;else _0x3d167b[_0x3395b5(0x3ae)][_0x3395b5(0x133)][_0x3395b5(0x174)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3395b5(0x5a4)]();}}}if(!this[_0x3395b5(0x40b)][_0x3395b5(0x4ff)](_0x58c2f3))this['_newItemsList']['push'](_0x58c2f3);},Game_Party[_0x108103(0x2ab)][_0x108103(0x338)]=function(_0x545c9d){const _0x4bc357=_0x108103;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x4bc357(0x5bc)]();let _0x355f26='';if(DataManager['isItem'](_0x545c9d))_0x355f26='item-%1'[_0x4bc357(0x423)](_0x545c9d['id']);else{if(DataManager['isWeapon'](_0x545c9d))_0x355f26=_0x4bc357(0x4e5)[_0x4bc357(0x423)](_0x545c9d['id']);else{if(DataManager[_0x4bc357(0x44b)](_0x545c9d))_0x355f26='armor-%1'['format'](_0x545c9d['id']);else return;}}this[_0x4bc357(0x40b)][_0x4bc357(0x4ff)](_0x355f26)&&this[_0x4bc357(0x40b)]['splice'](this[_0x4bc357(0x40b)][_0x4bc357(0x1ff)](_0x355f26),0x1);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x37c)]=Game_Party['prototype']['numItems'],Game_Party[_0x108103(0x2ab)]['numItems']=function(_0x5798cb){const _0x126c2f=_0x108103;if(DataManager[_0x126c2f(0x20b)](_0x5798cb))_0x5798cb=DataManager[_0x126c2f(0x1df)](_0x5798cb);return VisuMZ[_0x126c2f(0x3ae)][_0x126c2f(0x37c)]['call'](this,_0x5798cb);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x5a9)]=Game_Party[_0x108103(0x2ab)][_0x108103(0x424)],Game_Party['prototype'][_0x108103(0x424)]=function(_0x219906,_0x582684,_0xfeec5f){const _0x486317=_0x108103;if(DataManager[_0x486317(0x20b)](_0x219906))_0x219906=null;const _0x46dd6a=this[_0x486317(0x443)](_0x219906);VisuMZ[_0x486317(0x3ae)]['Game_Party_gainItem'][_0x486317(0x174)](this,_0x219906,_0x582684,_0xfeec5f);if(this[_0x486317(0x443)](_0x219906)>_0x46dd6a)this[_0x486317(0x4ae)](_0x219906);},Game_Party[_0x108103(0x2ab)][_0x108103(0x519)]=function(_0x5acd67){const _0x1814a8=_0x108103;if(DataManager[_0x1814a8(0x20b)](_0x5acd67))_0x5acd67=DataManager['getProxyItem'](_0x5acd67);return DataManager['maxItemAmount'](_0x5acd67);},VisuMZ['ItemsEquipsCore'][_0x108103(0x37a)]=Scene_ItemBase[_0x108103(0x2ab)][_0x108103(0x1c9)],Scene_ItemBase[_0x108103(0x2ab)][_0x108103(0x1c9)]=function(){const _0x459495=_0x108103;VisuMZ[_0x459495(0x3ae)]['Scene_ItemBase_activateItemWindow'][_0x459495(0x174)](this),this[_0x459495(0x58b)][_0x459495(0x169)]();},Scene_Item['prototype'][_0x108103(0x28f)]=function(){const _0x5b8582=_0x108103;if(ConfigManager[_0x5b8582(0x3a6)]&&ConfigManager[_0x5b8582(0x470)]!==undefined){if('aeYTf'!=='ykLIS')return ConfigManager['uiHelpPosition'];else _0x4443a4=_0x3ce43a(_0x59c8ce['$1']);}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return _0x5b8582(0x208)!==_0x5b8582(0x208)?this[_0x5b8582(0x179)]():this[_0x5b8582(0x2d7)]()[_0x5b8582(0x1a3)](/LOWER/i);else{if('XPgcU'!==_0x5b8582(0x188))Scene_ItemBase['prototype']['isRightInputMode']['call'](this);else{if(this[_0x5b8582(0x32a)]()&&_0x10e244['isHovered']())this[_0x5b8582(0x500)](![]);else _0x3359a7[_0x5b8582(0x23a)]()&&this[_0x5b8582(0x500)](!![]);_0x4ab51c[_0x5b8582(0x146)]()&&this[_0x5b8582(0x4ad)]();}}}},Scene_Item['prototype'][_0x108103(0x24d)]=function(){const _0x277cff=_0x108103;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x277cff(0x5c3)]!==undefined)return ConfigManager[_0x277cff(0x5c3)];else{if(this[_0x277cff(0x398)]())return this[_0x277cff(0x2d7)]()[_0x277cff(0x1a3)](/RIGHT/i);else'Gjqtt'!==_0x277cff(0x3a2)?_0x3aa7ab[_0x277cff(0x3f2)][_0x277cff(0x5d9)]===_0x204dee&&(this[_0x277cff(0x180)]=_0x31bb5c['_scene'][_0x277cff(0x342)]()):Scene_ItemBase[_0x277cff(0x2ab)]['isRightInputMode'][_0x277cff(0x174)](this);}},Scene_Item[_0x108103(0x2ab)][_0x108103(0x2d7)]=function(){const _0x14cc92=_0x108103;return VisuMZ[_0x14cc92(0x3ae)]['Settings'][_0x14cc92(0x509)][_0x14cc92(0x4eb)];},Scene_Item[_0x108103(0x2ab)]['isUseModernControls']=function(){const _0x2eacd1=_0x108103;return this['_categoryWindow']&&this[_0x2eacd1(0x590)][_0x2eacd1(0x45a)]();},Scene_Item[_0x108103(0x2ab)][_0x108103(0x398)]=function(){const _0x3aab03=_0x108103;return VisuMZ['ItemsEquipsCore']['Settings'][_0x3aab03(0x509)][_0x3aab03(0x353)];},VisuMZ['ItemsEquipsCore'][_0x108103(0x1fe)]=Scene_Item[_0x108103(0x2ab)][_0x108103(0x2d4)],Scene_Item[_0x108103(0x2ab)][_0x108103(0x2d4)]=function(){const _0x2ca788=_0x108103;VisuMZ['ItemsEquipsCore'][_0x2ca788(0x1fe)][_0x2ca788(0x174)](this);if(this[_0x2ca788(0x45a)]()){if('MWqgY'===_0x2ca788(0x232))return _0x4aff5f[_0x2ca788(0x3ae)][_0x2ca788(0x2d6)][_0x2ca788(0x509)][_0x2ca788(0x527)];else this[_0x2ca788(0x2b5)]();}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x562)]=Scene_Item['prototype'][_0x108103(0x4fe)],Scene_Item[_0x108103(0x2ab)]['helpWindowRect']=function(){const _0x12883a=_0x108103;return this[_0x12883a(0x398)]()?this[_0x12883a(0x28e)]():VisuMZ[_0x12883a(0x3ae)]['Scene_Item_helpWindowRect'][_0x12883a(0x174)](this);},Scene_Item['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0xd28c16=_0x108103,_0x37a838=0x0,_0x10af5f=this[_0xd28c16(0x554)](),_0x5744cb=Graphics['boxWidth'],_0x2f676b=this['helpAreaHeight']();return new Rectangle(_0x37a838,_0x10af5f,_0x5744cb,_0x2f676b);},VisuMZ[_0x108103(0x3ae)]['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x108103(0x24f)],Scene_Item[_0x108103(0x2ab)][_0x108103(0x24f)]=function(){const _0x2c9014=_0x108103;VisuMZ[_0x2c9014(0x3ae)][_0x2c9014(0x137)][_0x2c9014(0x174)](this);if(this[_0x2c9014(0x45a)]()){if('XeBfY'!==_0x2c9014(0x406)){if(_0x1a3537[_0x2c9014(0x3a6)]&&_0x263902['uiHelpPosition']!==_0x207da6)return _0x39328a['uiHelpPosition'];else{if(this[_0x2c9014(0x398)]())return this[_0x2c9014(0x2d7)]()[_0x2c9014(0x1a3)](/LOWER/i);else _0x358b0b['prototype'][_0x2c9014(0x24d)][_0x2c9014(0x174)](this);}}else this[_0x2c9014(0x2bc)]();}},Scene_Item[_0x108103(0x2ab)][_0x108103(0x2bc)]=function(){const _0x184383=_0x108103;delete this[_0x184383(0x590)][_0x184383(0x136)]['ok'],delete this['_categoryWindow'][_0x184383(0x136)]['cancel'];},VisuMZ['ItemsEquipsCore'][_0x108103(0x599)]=Scene_Item[_0x108103(0x2ab)]['categoryWindowRect'],Scene_Item[_0x108103(0x2ab)][_0x108103(0x4a7)]=function(){const _0x3e7c3d=_0x108103;return this[_0x3e7c3d(0x398)]()?this['categoryWindowRectItemsEquipsCore']():_0x3e7c3d(0x4cb)===_0x3e7c3d(0x3f8)?_0x165892[_0x3e7c3d(0x528)](_0x3e7c3d(0x3e5)):VisuMZ[_0x3e7c3d(0x3ae)]['Scene_Item_categoryWindowRect'][_0x3e7c3d(0x174)](this);},Scene_Item['prototype'][_0x108103(0x3f5)]=function(){const _0x2497c3=_0x108103,_0x217b9b=0x0,_0x545c80=this['mainAreaTop'](),_0x412da2=Graphics[_0x2497c3(0x22a)],_0x331c8a=this[_0x2497c3(0x578)](0x1,!![]);return new Rectangle(_0x217b9b,_0x545c80,_0x412da2,_0x331c8a);},VisuMZ['ItemsEquipsCore'][_0x108103(0x228)]=Scene_Item[_0x108103(0x2ab)][_0x108103(0x1ba)],Scene_Item[_0x108103(0x2ab)][_0x108103(0x1ba)]=function(){const _0xb18832=_0x108103;VisuMZ[_0xb18832(0x3ae)][_0xb18832(0x228)]['call'](this);this[_0xb18832(0x45a)]()&&this['postCreateItemWindowModernControls']();if(this[_0xb18832(0x549)]()){if('MNoXS'!==_0xb18832(0x512))this['createStatusWindow']();else{if(this[_0xb18832(0x3f1)])return;if(!_0x1b743b['ItemsEquipsCore']['Settings'][_0xb18832(0x46b)][_0xb18832(0x19d)])return;const _0x56d3cb=_0x275544['round'](_0x28da91[_0xb18832(0x225)]()*this[_0xb18832(0x3c4)]),_0x4cb6f3=_0x1b6daa['round'](_0x30dd0a[_0xb18832(0x26b)]()*this[_0xb18832(0x1f0)]);if(this['hp']>0x0)this[_0xb18832(0x185)](_0x56d3cb);if(this['mp']>0x0)this[_0xb18832(0x5d6)](_0x4cb6f3);}}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x58d)]=Scene_Item[_0x108103(0x2ab)][_0x108103(0x41e)],Scene_Item[_0x108103(0x2ab)][_0x108103(0x41e)]=function(){const _0x5a8189=_0x108103;if(this[_0x5a8189(0x398)]()){if(_0x5a8189(0x521)!=='rIMFd')this[_0x5a8189(0x2f2)](_0x88a4ff[_0x5a8189(0x204)]());else return this[_0x5a8189(0x504)]();}else{if('IMHUA'===_0x5a8189(0x5a6)){const _0x829031=VisuMZ[_0x5a8189(0x3ae)]['Scene_Item_itemWindowRect'][_0x5a8189(0x174)](this);if(this[_0x5a8189(0x549)]()&&this[_0x5a8189(0x4c0)]()){if(_0x5a8189(0x396)!==_0x5a8189(0x3a8))_0x829031['width']-=this[_0x5a8189(0x1e6)]();else return _0x1d4eeb[_0x5a8189(0x4f3)][_0x5a8189(0x423)](_0x88f344(_0x12ead9['$1']));}return _0x829031;}else return this[_0x5a8189(0x405)]?this[_0x5a8189(0x405)][_0x5a8189(0x468)]:0x3;}},Scene_Item[_0x108103(0x2ab)][_0x108103(0x504)]=function(){const _0x45c6c7=_0x108103,_0xffc3ac=this[_0x45c6c7(0x24d)]()?this['statusWidth']():0x0,_0x27f7ed=this[_0x45c6c7(0x590)]['y']+this[_0x45c6c7(0x590)][_0x45c6c7(0x157)],_0xec6e4e=Graphics[_0x45c6c7(0x22a)]-this[_0x45c6c7(0x1e6)](),_0x18693a=this['mainAreaBottom']()-_0x27f7ed;return new Rectangle(_0xffc3ac,_0x27f7ed,_0xec6e4e,_0x18693a);},Scene_Item[_0x108103(0x2ab)][_0x108103(0x47e)]=function(){const _0x470a36=_0x108103;this[_0x470a36(0x58b)]['setHandler'](_0x470a36(0x1d1),this['popScene']['bind'](this));},Scene_Item['prototype'][_0x108103(0x549)]=function(){const _0x5ea5b5=_0x108103;return this[_0x5ea5b5(0x398)]()?_0x5ea5b5(0x4d1)===_0x5ea5b5(0x34c)?this[_0x5ea5b5(0x58f)]():!![]:VisuMZ[_0x5ea5b5(0x3ae)]['Settings'][_0x5ea5b5(0x509)][_0x5ea5b5(0x3de)];},Scene_Item['prototype'][_0x108103(0x4c0)]=function(){const _0x196f7d=_0x108103;return VisuMZ[_0x196f7d(0x3ae)][_0x196f7d(0x2d6)]['ItemScene'][_0x196f7d(0x527)];},Scene_Item[_0x108103(0x2ab)]['createStatusWindow']=function(){const _0x353f99=_0x108103,_0xdd9448=this[_0x353f99(0x5d4)]();this[_0x353f99(0x47f)]=new Window_ShopStatus(_0xdd9448),this[_0x353f99(0x3c5)](this[_0x353f99(0x47f)]),this['_itemWindow'][_0x353f99(0x2e5)](this[_0x353f99(0x47f)]);const _0x5b8c8c=VisuMZ[_0x353f99(0x3ae)][_0x353f99(0x2d6)][_0x353f99(0x509)][_0x353f99(0x3fa)];this['_statusWindow'][_0x353f99(0x134)](_0x5b8c8c||0x0);},Scene_Item['prototype']['statusWindowRect']=function(){const _0x1134c1=_0x108103;return this[_0x1134c1(0x398)]()?this[_0x1134c1(0x376)]():VisuMZ[_0x1134c1(0x3ae)]['Settings'][_0x1134c1(0x509)][_0x1134c1(0x142)]['call'](this);},Scene_Item[_0x108103(0x2ab)][_0x108103(0x376)]=function(){const _0x2faec5=_0x108103,_0x4b2bd8=this[_0x2faec5(0x1e6)](),_0x4989af=this[_0x2faec5(0x58b)][_0x2faec5(0x157)],_0xdc7430=this['isRightInputMode']()?0x0:Graphics[_0x2faec5(0x22a)]-this['statusWidth'](),_0x24db43=this[_0x2faec5(0x58b)]['y'];return new Rectangle(_0xdc7430,_0x24db43,_0x4b2bd8,_0x4989af);},Scene_Item['prototype']['statusWidth']=function(){const _0x19163d=_0x108103;return Scene_Shop[_0x19163d(0x2ab)][_0x19163d(0x1e6)]();},Scene_Item[_0x108103(0x2ab)]['buttonAssistItemListRequirement']=function(){const _0x265bfb=_0x108103;if(!this['updatedLayoutStyle']())return![];if(!this[_0x265bfb(0x45a)]())return![];if(!this[_0x265bfb(0x58b)])return![];if(!this[_0x265bfb(0x58b)][_0x265bfb(0x462)])return![];return this[_0x265bfb(0x2d7)]()&&this[_0x265bfb(0x45a)]();},Scene_Item[_0x108103(0x2ab)]['buttonAssistKey1']=function(){const _0x10c757=_0x108103;if(this['buttonAssistItemListRequirement']()){if(this['_itemWindow'][_0x10c757(0x2c7)]()===0x1){if('AABbF'===_0x10c757(0x530))return TextManager[_0x10c757(0x5b3)]('left',_0x10c757(0x170));else _0x5882b7[_0x10c757(0x3ae)]['Scene_Shop_createSellWindow'][_0x10c757(0x174)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x10c757(0x349)]();}else return TextManager[_0x10c757(0x5b3)](_0x10c757(0x3d5),_0x10c757(0x43d));}return Scene_ItemBase['prototype'][_0x10c757(0x155)]['call'](this);},Scene_Item['prototype'][_0x108103(0x336)]=function(){const _0x9f7ca1=_0x108103;if(this[_0x9f7ca1(0x5da)]())return _0x9f7ca1(0x5b6)===_0x9f7ca1(0x5b6)?VisuMZ[_0x9f7ca1(0x3ae)]['Settings'][_0x9f7ca1(0x509)]['buttonAssistCategory']:_0x542c9d[_0x9f7ca1(0x3ae)][_0x9f7ca1(0x2d6)][_0x9f7ca1(0x325)][_0x9f7ca1(0x2e2)];return Scene_ItemBase['prototype'][_0x9f7ca1(0x336)][_0x9f7ca1(0x174)](this);},Scene_Equip[_0x108103(0x2ab)]['isBottomHelpMode']=function(){const _0x36441a=_0x108103;if(ConfigManager[_0x36441a(0x3a6)]&&ConfigManager['uiHelpPosition']!==undefined)return _0x36441a(0x433)!==_0x36441a(0x5c6)?ConfigManager[_0x36441a(0x470)]:![];else{if(this[_0x36441a(0x398)]()){if(_0x36441a(0x2e3)!==_0x36441a(0x2e3))this[_0x36441a(0x582)]();else return this[_0x36441a(0x2d7)]()[_0x36441a(0x1a3)](/LOWER/i);}else Scene_MenuBase[_0x36441a(0x2ab)][_0x36441a(0x24d)][_0x36441a(0x174)](this);}},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x24d)]=function(){const _0x3ba6bd=_0x108103;if(ConfigManager[_0x3ba6bd(0x3a6)]&&ConfigManager[_0x3ba6bd(0x5c3)]!==undefined)return _0x3ba6bd(0x584)!==_0x3ba6bd(0x250)?ConfigManager[_0x3ba6bd(0x5c3)]:this['updatedLayoutStyle']()[_0x3ba6bd(0x1a3)](/RIGHT/i);else{if(this[_0x3ba6bd(0x398)]())return _0x3ba6bd(0x3be)!==_0x3ba6bd(0x450)?this[_0x3ba6bd(0x2d7)]()[_0x3ba6bd(0x1a3)](/RIGHT/i):(_0x40f2f8['isPlaytest']()&&(_0x27da05['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0x3ba6bd(0x423)](this['_item'][_0x3ba6bd(0x2f6)])),_0x2ff61a[_0x3ba6bd(0x52e)](_0x4d476e)),this[_0x3ba6bd(0x4f7)](),_0x3ba6bd(0x2b3));else Scene_MenuBase['prototype'][_0x3ba6bd(0x24d)][_0x3ba6bd(0x174)](this);}},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x2d7)]=function(){const _0x249ecf=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x249ecf(0x2d6)][_0x249ecf(0x46b)]['LayoutStyle'];},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x45a)]=function(){const _0x21706c=_0x108103;return this[_0x21706c(0x59c)]&&this[_0x21706c(0x59c)][_0x21706c(0x45a)]();},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x398)]=function(){const _0x27f196=_0x108103;return VisuMZ[_0x27f196(0x3ae)]['Settings']['EquipScene'][_0x27f196(0x353)];},VisuMZ[_0x108103(0x3ae)]['Scene_Equip_create']=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x2d4)],Scene_Equip['prototype'][_0x108103(0x2d4)]=function(){const _0x3efef7=_0x108103;VisuMZ[_0x3efef7(0x3ae)][_0x3efef7(0x27c)][_0x3efef7(0x174)](this);if(this[_0x3efef7(0x45a)]()){if(_0x3efef7(0x4cf)==='fpyBF')return this[_0x3efef7(0x398)]()?this[_0x3efef7(0x376)]():_0x686324[_0x3efef7(0x3ae)][_0x3efef7(0x5ab)][_0x3efef7(0x174)](this);else this[_0x3efef7(0x564)]();}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x25d)]=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x4fe)],Scene_Equip['prototype'][_0x108103(0x4fe)]=function(){const _0x2f8409=_0x108103;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2f8409(0x28e)]():VisuMZ['ItemsEquipsCore'][_0x2f8409(0x25d)]['call'](this);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x28e)]=function(){const _0x5490e7=_0x108103,_0x4263ac=0x0,_0x27a22a=this[_0x5490e7(0x554)](),_0xcd9c1e=Graphics[_0x5490e7(0x22a)],_0x4d0d8f=this['helpAreaHeight']();return new Rectangle(_0x4263ac,_0x27a22a,_0xcd9c1e,_0x4d0d8f);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x4a2)]=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x5d4)],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x5d4)]=function(){const _0x432426=_0x108103;return this[_0x432426(0x398)]()?this[_0x432426(0x376)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect']['call'](this);},Scene_Equip['prototype'][_0x108103(0x376)]=function(){const _0x24163c=_0x108103,_0x2fceb1=this['isRightInputMode']()?0x0:Graphics[_0x24163c(0x22a)]-this[_0x24163c(0x1e6)](),_0xa23399=this[_0x24163c(0x27a)](),_0x37d948=this[_0x24163c(0x1e6)](),_0x159c84=this[_0x24163c(0x370)]();return new Rectangle(_0x2fceb1,_0xa23399,_0x37d948,_0x159c84);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x598)]=Scene_Equip[_0x108103(0x2ab)]['commandWindowRect'],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x1c4)]=function(){const _0x503a81=_0x108103;return this[_0x503a81(0x398)]()?this[_0x503a81(0x1bb)]():VisuMZ[_0x503a81(0x3ae)][_0x503a81(0x598)][_0x503a81(0x174)](this);},Scene_Equip[_0x108103(0x2ab)]['shouldCommandWindowExist']=function(){const _0x2a17f9=_0x108103,_0x16928e=VisuMZ[_0x2a17f9(0x3ae)][_0x2a17f9(0x2d6)][_0x2a17f9(0x46b)];return _0x16928e[_0x2a17f9(0x2ea)]||_0x16928e['CommandAddClear'];},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x1bb)]=function(){const _0x23b5c7=_0x108103,_0x35ef62=this['shouldCommandWindowExist'](),_0x4aea7c=this[_0x23b5c7(0x24d)]()?this[_0x23b5c7(0x1e6)]():0x0,_0x3746db=this[_0x23b5c7(0x27a)](),_0x3bc6ec=Graphics[_0x23b5c7(0x22a)]-this['statusWidth'](),_0x4826e2=_0x35ef62?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x4aea7c,_0x3746db,_0x3bc6ec,_0x4826e2);},VisuMZ[_0x108103(0x3ae)]['Scene_Equip_createSlotWindow']=Scene_Equip[_0x108103(0x2ab)]['createSlotWindow'],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x2e9)]=function(){const _0x1078e9=_0x108103;VisuMZ[_0x1078e9(0x3ae)][_0x1078e9(0x5c8)][_0x1078e9(0x174)](this);if(this[_0x1078e9(0x45a)]()){if('uZOjl'===_0x1078e9(0x230))this[_0x1078e9(0x446)]();else{const _0x1c31ac=this['_commandNameWindow'],_0x488b9b=_0x5ad4c0[_0x1078e9(0x3bc)](),_0x50c656=_0x2b22a4['x']+_0x3d9b8e['floor'](_0x1cec1a[_0x1078e9(0x2f7)]/0x2)+_0x488b9b;_0x1c31ac['x']=_0x1c31ac[_0x1078e9(0x2f7)]/-0x2+_0x50c656,_0x1c31ac['y']=_0x23ba79[_0x1078e9(0x1b8)](_0x20083e[_0x1078e9(0x157)]/0x2);}}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x4bd)]=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x55a)],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x55a)]=function(){const _0x31bb9a=_0x108103;if(this[_0x31bb9a(0x398)]()){if(_0x31bb9a(0x1d9)===_0x31bb9a(0x1d9))return this[_0x31bb9a(0x3d8)]();else{const _0x19d3cb=_0x38f74e[_0x31bb9a(0x50e)](this);_0x19d3cb[_0x31bb9a(0x3f1)]=!![],this['_equips'][_0x4dc6df][_0x31bb9a(0x152)](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this[_0x31bb9a(0x178)](_0x19d3cb),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=_0x4b856e;}}else return'fByaz'===_0x31bb9a(0x59e)?VisuMZ['ItemsEquipsCore'][_0x31bb9a(0x4bd)]['call'](this):_0x96ebc[_0x31bb9a(0x3ae)][_0x31bb9a(0x14e)][_0x31bb9a(0x174)](this);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x3d8)]=function(){const _0x8e1a85=_0x108103,_0x31b2dd=this[_0x8e1a85(0x1c4)](),_0x96de32=this['isRightInputMode']()?this[_0x8e1a85(0x1e6)]():0x0,_0x4dab9b=_0x31b2dd['y']+_0x31b2dd[_0x8e1a85(0x157)],_0x40c818=Graphics[_0x8e1a85(0x22a)]-this[_0x8e1a85(0x1e6)](),_0x24e80b=this[_0x8e1a85(0x370)]()-_0x31b2dd['height'];return new Rectangle(_0x96de32,_0x4dab9b,_0x40c818,_0x24e80b);},VisuMZ[_0x108103(0x3ae)]['Scene_Equip_itemWindowRect']=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x41e)],Scene_Equip['prototype'][_0x108103(0x41e)]=function(){const _0x470026=_0x108103;return this[_0x470026(0x398)]()?this[_0x470026(0x55a)]():VisuMZ[_0x470026(0x3ae)][_0x470026(0x5b5)][_0x470026(0x174)](this);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x1e6)]=function(){const _0x544cf1=_0x108103;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x544cf1(0x356)]():VisuMZ[_0x544cf1(0x3ae)][_0x544cf1(0x2d6)][_0x544cf1(0x46b)]['StatusWindowWidth'];},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x356)]=function(){const _0x2141da=_0x108103;return Math['floor'](Graphics[_0x2141da(0x22a)]/0x2);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x446)]=function(){const _0x5dd4fc=_0x108103;this['_slotWindow'][_0x5dd4fc(0x4c5)](_0x5dd4fc(0x1d1),this[_0x5dd4fc(0x233)][_0x5dd4fc(0x20d)](this)),this[_0x5dd4fc(0x3b7)][_0x5dd4fc(0x4c5)](_0x5dd4fc(0x43d),this[_0x5dd4fc(0x550)]['bind'](this)),this['_slotWindow'][_0x5dd4fc(0x4c5)](_0x5dd4fc(0x3d5),this['previousActor'][_0x5dd4fc(0x20d)](this));},VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip']=Scene_Equip['prototype'][_0x108103(0x564)],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x564)]=function(){const _0x294d12=_0x108103;this[_0x294d12(0x45a)]()&&(this[_0x294d12(0x59c)][_0x294d12(0x371)](),this[_0x294d12(0x59c)]['deactivate']()),VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip'][_0x294d12(0x174)](this);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x583)]=Scene_Equip[_0x108103(0x2ab)]['onSlotOk'],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x35f)]=function(){const _0x1668a2=_0x108103;if(this[_0x1668a2(0x3b7)][_0x1668a2(0x324)]()>=0x0)VisuMZ['ItemsEquipsCore'][_0x1668a2(0x583)][_0x1668a2(0x174)](this),this[_0x1668a2(0x18e)]();else{if(_0x1668a2(0x281)===_0x1668a2(0x281))this['_slotWindow'][_0x1668a2(0x37b)](0x0),this[_0x1668a2(0x3b7)][_0x1668a2(0x523)]();else return _0x2e5be8[_0x1668a2(0x3ae)][_0x1668a2(0x39d)][_0x1668a2(0x174)](this,_0x229059);}},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x18e)]=function(){const _0x48829b=_0x108103;this['_itemWindow']['refresh']();const _0x567099=this[_0x48829b(0x3b7)][_0x48829b(0x25e)](),_0x15759b=this[_0x48829b(0x58b)]['_data'][_0x48829b(0x1ff)](_0x567099),_0x377ccb=Math[_0x48829b(0x1b8)](this[_0x48829b(0x58b)][_0x48829b(0x566)]()/0x2)-0x1;this[_0x48829b(0x58b)][_0x48829b(0x37b)](_0x15759b>=0x0?_0x15759b:0x0),this[_0x48829b(0x58b)][_0x48829b(0x2fc)](this[_0x48829b(0x58b)][_0x48829b(0x324)]()-_0x377ccb);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x286)]=Scene_Equip[_0x108103(0x2ab)][_0x108103(0x18f)],Scene_Equip[_0x108103(0x2ab)][_0x108103(0x18f)]=function(){const _0x105413=_0x108103;VisuMZ[_0x105413(0x3ae)][_0x105413(0x286)][_0x105413(0x174)](this),this['isUseModernControls']()&&(this['_commandWindow'][_0x105413(0x37b)](0x0),this[_0x105413(0x3b7)][_0x105413(0x518)]());},VisuMZ[_0x108103(0x3ae)][_0x108103(0x339)]=Scene_Equip['prototype']['onActorChange'],Scene_Equip['prototype']['onActorChange']=function(){const _0x233811=_0x108103;VisuMZ[_0x233811(0x3ae)][_0x233811(0x339)][_0x233811(0x174)](this),this[_0x233811(0x45a)]()&&(this['_commandWindow'][_0x233811(0x518)](),this[_0x233811(0x59c)]['deselect'](),this[_0x233811(0x3b7)][_0x233811(0x37b)](0x0),this['_slotWindow'][_0x233811(0x523)]());},Scene_Equip['prototype']['buttonAssistSlotWindowShift']=function(){const _0x99bae=_0x108103;if(!this['_slotWindow'])return![];if(!this[_0x99bae(0x3b7)][_0x99bae(0x462)])return![];return this[_0x99bae(0x3b7)]['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x305)]=function(){const _0x5d89ba=_0x108103;if(this[_0x5d89ba(0x1ee)]())return TextManager[_0x5d89ba(0x528)](_0x5d89ba(0x3e5));return Scene_MenuBase[_0x5d89ba(0x2ab)][_0x5d89ba(0x305)][_0x5d89ba(0x174)](this);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x5cb)]=function(){const _0x400b52=_0x108103;if(this[_0x400b52(0x1ee)]()){if('WGTWA'===_0x400b52(0x498)){const _0x356d44=new _0x460a60(0x0,0x0,_0x17f7ae['width'],_0x2815ef[_0x400b52(0x157)]);this[_0x400b52(0x168)]=new _0x3a315b(_0x356d44),this[_0x400b52(0x168)][_0x400b52(0x3ec)]=0x0,this[_0x400b52(0x2c5)](this[_0x400b52(0x168)]),this[_0x400b52(0x3a5)]();}else return VisuMZ[_0x400b52(0x3ae)]['Settings'][_0x400b52(0x46b)][_0x400b52(0x283)];}return Scene_MenuBase[_0x400b52(0x2ab)]['buttonAssistText3']['call'](this);},Scene_Equip[_0x108103(0x2ab)][_0x108103(0x1f6)]=function(){const _0x34f453=_0x108103;if(this[_0x34f453(0x1ee)]())return this[_0x34f453(0x16c)][_0x34f453(0x2f7)]/0x5/-0x3;return Scene_MenuBase[_0x34f453(0x2ab)][_0x34f453(0x1f6)][_0x34f453(0x174)](this);},Scene_Equip[_0x108103(0x2ab)]['popScene']=function(){const _0x28686e=_0x108103;SceneManager[_0x28686e(0x21e)]();},VisuMZ['ItemsEquipsCore'][_0x108103(0x38e)]=Scene_Load[_0x108103(0x2ab)][_0x108103(0x3fb)],Scene_Load[_0x108103(0x2ab)][_0x108103(0x3fb)]=function(){const _0x4349b0=_0x108103;VisuMZ['ItemsEquipsCore'][_0x4349b0(0x38e)][_0x4349b0(0x174)](this),this[_0x4349b0(0x2de)]();},Scene_Load[_0x108103(0x2ab)][_0x108103(0x2de)]=function(){const _0x17e6e7=_0x108103;if($gameSystem['versionId']()!==$dataSystem['versionId'])for(const _0x3c6067 of $gameActors[_0x17e6e7(0x517)]){if(_0x17e6e7(0x341)==='PRpHX'){const _0x4ba504=new _0x41d791(0x0,0x0,_0x4c787a[_0x17e6e7(0x2f7)],_0x58501a[_0x17e6e7(0x157)]);this[_0x17e6e7(0x301)]=new _0x57909c(_0x4ba504),this[_0x17e6e7(0x301)][_0x17e6e7(0x3ec)]=0x0,this[_0x17e6e7(0x2c5)](this[_0x17e6e7(0x301)]),this[_0x17e6e7(0x351)]();}else{if(_0x3c6067)_0x3c6067[_0x17e6e7(0x27e)]();}}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x28f)]=function(){const _0x5d5c98=_0x108103;if(ConfigManager[_0x5d5c98(0x3a6)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x5d5c98(0x398)]())return this['updatedLayoutStyle']()[_0x5d5c98(0x1a3)](/LOWER/i);else Scene_MenuBase[_0x5d5c98(0x2ab)][_0x5d5c98(0x24d)]['call'](this);}},Scene_Shop[_0x108103(0x2ab)]['isRightInputMode']=function(){const _0x38df83=_0x108103;if(ConfigManager[_0x38df83(0x3a6)]&&ConfigManager['uiInputPosition']!==undefined)return'NLZco'==='AMnjj'?this[_0x38df83(0x310)](_0x1ed7ea):ConfigManager[_0x38df83(0x5c3)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x38df83(0x2d7)]()[_0x38df83(0x1a3)](/RIGHT/i);else Scene_MenuBase[_0x38df83(0x2ab)][_0x38df83(0x24d)]['call'](this);}},Scene_Shop[_0x108103(0x2ab)]['updatedLayoutStyle']=function(){const _0xc83e33=_0x108103;return VisuMZ['ItemsEquipsCore'][_0xc83e33(0x2d6)]['ShopScene']['LayoutStyle'];},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x45a)]=function(){const _0x2de1ec=_0x108103;return this[_0x2de1ec(0x590)]&&this['_categoryWindow'][_0x2de1ec(0x45a)]();},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x398)]=function(){const _0x502e78=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x502e78(0x2d6)][_0x502e78(0x4ee)][_0x502e78(0x353)];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x1f9)]=Scene_Shop['prototype']['prepare'],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x17e)]=function(_0x3d27e4,_0x1fa39e){const _0x437cf8=_0x108103;_0x3d27e4=JsonEx[_0x437cf8(0x50e)](_0x3d27e4),VisuMZ[_0x437cf8(0x3ae)][_0x437cf8(0x1f9)][_0x437cf8(0x174)](this,_0x3d27e4,_0x1fa39e),this[_0x437cf8(0x32b)]();},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x32b)]=function(){const _0x2c442a=_0x108103;this['_goodsCount']=0x0;const _0x157991=[];for(const _0x4a740d of this['_goods']){this[_0x2c442a(0x479)](_0x4a740d)?this[_0x2c442a(0x25a)]++:_0x157991[_0x2c442a(0x16f)](_0x4a740d);}for(const _0x36f40f of _0x157991){this['_goods'][_0x2c442a(0x464)](_0x36f40f);}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x479)]=function(_0x554d95){const _0x90caca=_0x108103;if(_0x554d95[0x0]>0x2||_0x554d95[0x0]<0x0)return![];const _0x326515=[$dataItems,$dataWeapons,$dataArmors][_0x554d95[0x0]][_0x554d95[0x1]];if(!_0x326515)return![];const _0xa7dde7=_0x326515['note']||'';if(_0xa7dde7[_0x90caca(0x1a3)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x514ba8=JSON[_0x90caca(0x563)]('['+RegExp['$1'][_0x90caca(0x1a3)](/\d+/g)+']');for(const _0x4fb7e7 of _0x514ba8){if(!$gameSwitches['value'](_0x4fb7e7))return![];}return!![];}if(_0xa7dde7[_0x90caca(0x1a3)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('iHiPo'!==_0x90caca(0x1c5)){const _0x28e566=JSON[_0x90caca(0x563)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4b8390 of _0x28e566){if(!$gameSwitches[_0x90caca(0x4bc)](_0x4b8390))return![];}return!![];}else _0x1600f7[_0x90caca(0x2ab)][_0x90caca(0x24d)][_0x90caca(0x174)](this);}if(_0xa7dde7[_0x90caca(0x1a3)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x90caca(0x515)==='WCwzo')_0x17c210(_0x45bde6);else{const _0x130f03=JSON[_0x90caca(0x563)]('['+RegExp['$1'][_0x90caca(0x1a3)](/\d+/g)+']');for(const _0x3b3950 of _0x130f03){if($gameSwitches[_0x90caca(0x4bc)](_0x3b3950))return!![];}return![];}}if(_0xa7dde7['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x90caca(0x393)!==_0x90caca(0x393)){const _0x4598ab=_0x3090da[_0x90caca(0x3f2)]['_actor'];if(!_0x4598ab)return;if(!_0x4598ab[_0x90caca(0x310)](this[_0x90caca(0x324)]()))return![];const _0x21d1ac=_0x4598ab[_0x90caca(0x4fd)]()[this[_0x90caca(0x324)]()];if(_0x4598ab[_0x90caca(0x40c)]()[_0x90caca(0x4ff)](_0x21d1ac))return![];return!![];;}else{const _0x21fb5f=JSON[_0x90caca(0x563)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x183b7d of _0x21fb5f){if(!$gameSwitches[_0x90caca(0x4bc)](_0x183b7d))return!![];}return![];}}if(_0xa7dde7[_0x90caca(0x1a3)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xcdd629=JSON[_0x90caca(0x563)]('['+RegExp['$1'][_0x90caca(0x1a3)](/\d+/g)+']');for(const _0x38fdb7 of _0xcdd629){if(!$gameSwitches[_0x90caca(0x4bc)](_0x38fdb7))return!![];}return![];}if(_0xa7dde7[_0x90caca(0x1a3)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c3c41=JSON[_0x90caca(0x563)]('['+RegExp['$1'][_0x90caca(0x1a3)](/\d+/g)+']');for(const _0x4dafe3 of _0x3c3c41){if(_0x90caca(0x219)!==_0x90caca(0x1b5)){if($gameSwitches[_0x90caca(0x4bc)](_0x4dafe3))return![];}else{_0x1d49b9[_0x90caca(0x576)]&&this['drawIcon'](_0x21a885,_0x14cf6e['x'],_0x596262['y']+0x2);_0x3d3cd1['x']+=_0x5e18c1[_0x90caca(0x3d7)](_0x31b2df[_0x90caca(0x574)]*this[_0x90caca(0x15b)]());if(this[_0x90caca(0x15b)]()===0x1)_0x386446['x']+=0x4;}}return!![];}return!![];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x1dd)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x2d4)],Scene_Shop[_0x108103(0x2ab)]['create']=function(){const _0xb8c29b=_0x108103;VisuMZ[_0xb8c29b(0x3ae)]['Scene_Shop_create']['call'](this),this[_0xb8c29b(0x398)]()&&this[_0xb8c29b(0x413)](),this[_0xb8c29b(0x13d)]();},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x413)]=function(){const _0x48f5a6=_0x108103;this[_0x48f5a6(0x35e)]['hide'](),this[_0x48f5a6(0x44d)]['show'](),this[_0x48f5a6(0x44d)][_0x48f5a6(0x371)](),this[_0x48f5a6(0x47f)][_0x48f5a6(0x33d)]();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x2c1)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x4fe)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x4fe)]=function(){const _0x437724=_0x108103;if(this[_0x437724(0x398)]()){if(_0x437724(0x19e)!==_0x437724(0x514))return this[_0x437724(0x28e)]();else this[_0x437724(0x500)](!![]);}else return VisuMZ[_0x437724(0x3ae)][_0x437724(0x2c1)]['call'](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x28e)]=function(){const _0x537108=_0x108103,_0x33c6d3=0x0,_0x5bcdee=this[_0x537108(0x554)](),_0x1a34b4=Graphics[_0x537108(0x22a)],_0x2642c7=this[_0x537108(0x343)]();return new Rectangle(_0x33c6d3,_0x5bcdee,_0x1a34b4,_0x2642c7);},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_goldWindowRect']=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x369)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x369)]=function(){const _0xcadf04=_0x108103;return this[_0xcadf04(0x398)]()?_0xcadf04(0x26f)!==_0xcadf04(0x26f)?0x0:this['goldWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0xcadf04(0x29f)]['call'](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x526)]=function(){const _0x20ed6b=_0x108103,_0x1f07ca=this[_0x20ed6b(0x2fb)](),_0x3d7626=this['calcWindowHeight'](0x1,!![]),_0x54a6c8=this['isRightInputMode']()?0x0:Graphics[_0x20ed6b(0x22a)]-_0x1f07ca,_0x3c23c5=this[_0x20ed6b(0x27a)]();return new Rectangle(_0x54a6c8,_0x3c23c5,_0x1f07ca,_0x3d7626);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x14e)]=Scene_Shop['prototype']['commandWindowRect'],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1c4)]=function(){const _0x512a37=_0x108103;return this[_0x512a37(0x398)]()?this[_0x512a37(0x1bb)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_commandWindowRect'][_0x512a37(0x174)](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1bb)]=function(){const _0x344c0a=_0x108103,_0x8eb4de=this['isRightInputMode']()?this[_0x344c0a(0x2fb)]():0x0,_0x28fa38=this[_0x344c0a(0x27a)](),_0x3b165c=Graphics[_0x344c0a(0x22a)]-this['mainCommandWidth'](),_0x57a586=this[_0x344c0a(0x578)](0x1,!![]);return new Rectangle(_0x8eb4de,_0x28fa38,_0x3b165c,_0x57a586);},VisuMZ['ItemsEquipsCore'][_0x108103(0x1a4)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x53e)],Scene_Shop[_0x108103(0x2ab)]['numberWindowRect']=function(){const _0xa6c7ee=_0x108103;return this[_0xa6c7ee(0x398)]()?this[_0xa6c7ee(0x58f)]():VisuMZ['ItemsEquipsCore'][_0xa6c7ee(0x1a4)][_0xa6c7ee(0x174)](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x58f)]=function(){const _0x304832=_0x108103,_0x3bbf4a=this[_0x304832(0x59c)]['y']+this[_0x304832(0x59c)][_0x304832(0x157)],_0x431666=Graphics[_0x304832(0x22a)]-this[_0x304832(0x1e6)](),_0x2a46fc=this['isRightInputMode']()?Graphics[_0x304832(0x22a)]-_0x431666:0x0,_0x1b88be=this['mainAreaHeight']()-this[_0x304832(0x59c)][_0x304832(0x157)];return new Rectangle(_0x2a46fc,_0x3bbf4a,_0x431666,_0x1b88be);},VisuMZ['ItemsEquipsCore'][_0x108103(0x5ab)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5d4)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5d4)]=function(){const _0x28424b=_0x108103;if(this[_0x28424b(0x398)]()){if(_0x28424b(0x347)==='BCvcJ'){if(_0x1c1ea3[_0x28424b(0x388)])return _0x254fc3[_0x28424b(0x3ae)][_0x28424b(0x252)]['call'](this);return _0x217856[_0x28424b(0x1df)](_0x46cf13[_0x28424b(0x3ae)][_0x28424b(0x252)]['call'](this));}else return this[_0x28424b(0x376)]();}else return VisuMZ[_0x28424b(0x3ae)]['Scene_Shop_statusWindowRect'][_0x28424b(0x174)](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x376)]=function(){const _0x22fbfe=_0x108103,_0x14a271=this['statusWidth'](),_0x3ec7ec=this[_0x22fbfe(0x370)]()-this[_0x22fbfe(0x59c)][_0x22fbfe(0x157)],_0xa01e1e=this[_0x22fbfe(0x24d)]()?0x0:Graphics[_0x22fbfe(0x22a)]-_0x14a271,_0x4ee869=this[_0x22fbfe(0x59c)]['y']+this[_0x22fbfe(0x59c)][_0x22fbfe(0x157)];return new Rectangle(_0xa01e1e,_0x4ee869,_0x14a271,_0x3ec7ec);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x345)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x42d)],Scene_Shop['prototype'][_0x108103(0x42d)]=function(){const _0x18e67a=_0x108103;return this[_0x18e67a(0x398)]()?this[_0x18e67a(0x3fc)]():VisuMZ['ItemsEquipsCore'][_0x18e67a(0x345)][_0x18e67a(0x174)](this);},Scene_Shop[_0x108103(0x2ab)]['buyWindowRectItemsEquipsCore']=function(){const _0xed21fe=_0x108103,_0x5dbe3e=this[_0xed21fe(0x59c)]['y']+this[_0xed21fe(0x59c)]['height'],_0x20d011=Graphics[_0xed21fe(0x22a)]-this[_0xed21fe(0x1e6)](),_0x5745fa=this[_0xed21fe(0x370)]()-this[_0xed21fe(0x59c)][_0xed21fe(0x157)],_0x79759a=this[_0xed21fe(0x24d)]()?Graphics[_0xed21fe(0x22a)]-_0x20d011:0x0;return new Rectangle(_0x79759a,_0x5dbe3e,_0x20d011,_0x5745fa);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x3b1)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x24f)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x24f)]=function(){const _0x37965a=_0x108103;VisuMZ['ItemsEquipsCore'][_0x37965a(0x3b1)][_0x37965a(0x174)](this),this[_0x37965a(0x45a)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x4a7)],Scene_Shop['prototype'][_0x108103(0x4a7)]=function(){const _0x1ff937=_0x108103;if(this[_0x1ff937(0x398)]()){if(_0x1ff937(0x21a)==='fHxmb')return this[_0x1ff937(0x3f5)]();else{const _0x507439=_0x4a13e2[_0x1ff937(0x47d)][_0x1ff937(0x1ff)](_0x2e30ce(_0x1810d9['$1'])[_0x1ff937(0x425)]());return _0x58066b[_0x1ff937(0x44b)](_0x267a3)&&_0x1e4b32[_0x1ff937(0x553)]===_0x507439;}}else{if(_0x1ff937(0x245)===_0x1ff937(0x245))return VisuMZ[_0x1ff937(0x3ae)][_0x1ff937(0x5c4)][_0x1ff937(0x174)](this);else _0xd29b09=_0x598adf[_0x1ff937(0x317)](_0x297ce9,_0x329053);}},Scene_Shop[_0x108103(0x2ab)]['categoryWindowRectItemsEquipsCore']=function(){const _0x39eeef=_0x108103,_0x54fcbb=this[_0x39eeef(0x59c)]['y'],_0x197a45=this['_commandWindow'][_0x39eeef(0x2f7)],_0x1d8dba=this['calcWindowHeight'](0x1,!![]),_0x326b74=this[_0x39eeef(0x24d)]()?Graphics['boxWidth']-_0x197a45:0x0;return new Rectangle(_0x326b74,_0x54fcbb,_0x197a45,_0x1d8dba);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x2bc)]=function(){const _0x310639=_0x108103;delete this[_0x310639(0x590)]['_handlers']['ok'],delete this[_0x310639(0x590)]['_handlers'][_0x310639(0x1d1)];},VisuMZ['ItemsEquipsCore'][_0x108103(0x40f)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x2fd)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x2fd)]=function(){const _0x1e0adf=_0x108103;VisuMZ[_0x1e0adf(0x3ae)][_0x1e0adf(0x40f)][_0x1e0adf(0x174)](this);if(this[_0x1e0adf(0x398)]()){if(_0x1e0adf(0x59b)===_0x1e0adf(0x59b))this[_0x1e0adf(0x349)]();else return _0xd4e95d[_0x1e0adf(0x2ab)][_0x1e0adf(0x32a)][_0x1e0adf(0x174)](this);}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x2aa)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1da)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1da)]=function(){const _0x4f921c=_0x108103;return this[_0x4f921c(0x398)]()?this[_0x4f921c(0x5c9)]():VisuMZ[_0x4f921c(0x3ae)][_0x4f921c(0x2aa)][_0x4f921c(0x174)](this);},Scene_Shop[_0x108103(0x2ab)]['sellWindowRectItemsEquipsCore']=function(){const _0x3e88e0=_0x108103,_0x42d23a=this[_0x3e88e0(0x590)]['y']+this['_categoryWindow'][_0x3e88e0(0x157)],_0x36ce12=Graphics[_0x3e88e0(0x22a)]-this[_0x3e88e0(0x1e6)](),_0x58256a=this['mainAreaHeight']()-this[_0x3e88e0(0x590)][_0x3e88e0(0x157)],_0x1dd785=this[_0x3e88e0(0x24d)]()?Graphics[_0x3e88e0(0x22a)]-_0x36ce12:0x0;return new Rectangle(_0x1dd785,_0x42d23a,_0x36ce12,_0x58256a);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x349)]=function(){const _0x5dea34=_0x108103;this['_sellWindow'][_0x5dea34(0x2e5)](this['_statusWindow']);},Scene_Shop['prototype'][_0x108103(0x1e6)]=function(){const _0x113431=_0x108103;return VisuMZ[_0x113431(0x3ae)][_0x113431(0x2d6)]['StatusWindow'][_0x113431(0x4c1)];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x282)]=Scene_Shop[_0x108103(0x2ab)]['activateSellWindow'],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x465)]=function(){const _0x2627c5=_0x108103;VisuMZ[_0x2627c5(0x3ae)][_0x2627c5(0x282)]['call'](this),this[_0x2627c5(0x398)]()&&this[_0x2627c5(0x47f)]['show'](),this[_0x2627c5(0x181)][_0x2627c5(0x473)]();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x472)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x410)],Scene_Shop['prototype'][_0x108103(0x410)]=function(){const _0x23bf81=_0x108103;VisuMZ[_0x23bf81(0x3ae)]['Scene_Shop_commandBuy'][_0x23bf81(0x174)](this),this[_0x23bf81(0x398)]()&&this[_0x23bf81(0x296)]();},Scene_Shop['prototype'][_0x108103(0x296)]=function(){const _0x1e11cf=_0x108103;this[_0x1e11cf(0x20c)]=this[_0x1e11cf(0x20c)]||0x0,this[_0x1e11cf(0x44d)][_0x1e11cf(0x37b)](this[_0x1e11cf(0x20c)]);},VisuMZ['ItemsEquipsCore'][_0x108103(0x3c9)]=Scene_Shop['prototype'][_0x108103(0x2f8)],Scene_Shop['prototype'][_0x108103(0x2f8)]=function(){const _0x5a1275=_0x108103;VisuMZ[_0x5a1275(0x3ae)][_0x5a1275(0x3c9)][_0x5a1275(0x174)](this);this[_0x5a1275(0x398)]()&&this['commandSellItemsEquipsCore']();if(this[_0x5a1275(0x45a)]()){if('qTMCo'!=='rQGlC')this['_categoryWindow'][_0x5a1275(0x37b)](0x0),this[_0x5a1275(0x2b5)]();else{this[_0x5a1275(0x42c)]={};if(!this['_item'])return;const _0x1bcf57=this[_0x5a1275(0x594)][_0x5a1275(0x412)];if(_0x1bcf57[_0x5a1275(0x1a3)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x315731=_0x61059(_0x4e1d53['$1'])[_0x5a1275(0x5be)](/[\r\n]+/);for(const _0x117bc3 of _0x315731){if(_0x117bc3['match'](/(.*):[ ](.*)/i)){const _0x308ef9=_0x2eafce(_0x1cd230['$1'])['toUpperCase']()[_0x5a1275(0x425)](),_0x225f00=_0x3b8535(_0x38a20f['$2'])['trim']();this[_0x5a1275(0x42c)][_0x308ef9]=_0x225f00;}}}}}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x211)]=function(){const _0x377a60=_0x108103;this[_0x377a60(0x44d)][_0x377a60(0x41d)](),this[_0x377a60(0x59c)][_0x377a60(0x41d)]();},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_onBuyCancel']=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x3ba)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x3ba)]=function(){const _0xce2943=_0x108103;VisuMZ[_0xce2943(0x3ae)][_0xce2943(0x5a0)][_0xce2943(0x174)](this);if(this[_0xce2943(0x398)]()){if(_0xce2943(0x2ac)!=='gmopX')this['onBuyCancelItemsEquipsCore']();else return _0x223122[_0xce2943(0x317)](0x1,_0x10130c[_0xce2943(0x428)]()-0x4);}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x193)]=function(){const _0x18a22c=_0x108103;this['_buyWindowLastIndex']=this['_buyWindow'][_0x18a22c(0x324)](),this['_buyWindow'][_0x18a22c(0x33d)](),this[_0x18a22c(0x44d)][_0x18a22c(0x371)](),this[_0x18a22c(0x44d)][_0x18a22c(0x237)](0x0,0x0),this[_0x18a22c(0x47f)]['show'](),this[_0x18a22c(0x35e)][_0x18a22c(0x41d)]();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x133)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x358)],Scene_Shop['prototype'][_0x108103(0x358)]=function(){const _0x2af8c7=_0x108103;VisuMZ[_0x2af8c7(0x3ae)]['Scene_Shop_onCategoryCancel'][_0x2af8c7(0x174)](this),this[_0x2af8c7(0x398)]()&&this['onCategoryCancelItemsEquipsCore']();},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5a4)]=function(){const _0x462545=_0x108103;this['_buyWindow'][_0x462545(0x33d)](),this[_0x462545(0x59c)]['show']();},VisuMZ['ItemsEquipsCore'][_0x108103(0x409)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x57f)],Scene_Shop['prototype'][_0x108103(0x57f)]=function(){const _0x4cc33c=_0x108103;$gameTemp[_0x4cc33c(0x388)]=!![],VisuMZ[_0x4cc33c(0x3ae)][_0x4cc33c(0x409)][_0x4cc33c(0x174)](this),$gameTemp[_0x4cc33c(0x388)]=![],this[_0x4cc33c(0x594)]=this['_buyWindow'][_0x4cc33c(0x25e)]();},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_buyingPrice']=Scene_Shop['prototype'][_0x108103(0x1b9)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1b9)]=function(){const _0x16aaaa=_0x108103;$gameTemp[_0x16aaaa(0x388)]=!![],this[_0x16aaaa(0x594)]=this[_0x16aaaa(0x44d)][_0x16aaaa(0x25e)]();const _0x55d47d=VisuMZ['ItemsEquipsCore']['Scene_Shop_buyingPrice'][_0x16aaaa(0x174)](this);return $gameTemp[_0x16aaaa(0x388)]=![],this[_0x16aaaa(0x594)]=this['_buyWindow'][_0x16aaaa(0x25e)](),_0x55d47d;},VisuMZ[_0x108103(0x3ae)][_0x108103(0x4d6)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x394)],Scene_Shop[_0x108103(0x2ab)]['onSellOk']=function(){const _0x679e94=_0x108103;VisuMZ['ItemsEquipsCore'][_0x679e94(0x4d6)][_0x679e94(0x174)](this);if(this[_0x679e94(0x398)]()){if('XZxHJ'!==_0x679e94(0x1a1))this[_0x679e94(0x546)]();else{_0x52163e[_0x679e94(0x2ab)][_0x679e94(0x473)][_0x679e94(0x174)](this);if(this[_0x679e94(0x422)]&&this[_0x679e94(0x47f)]&&this[_0x679e94(0x2db)]>=0x0){const _0x40c4bc=_0x761ffa[_0x679e94(0x50e)](this[_0x679e94(0x422)]);_0x40c4bc['_tempActor']=!![],_0x40c4bc['forceChangeEquip'](this['_slotId'],this[_0x679e94(0x25e)]()),this[_0x679e94(0x47f)][_0x679e94(0x132)](_0x40c4bc);}}}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x546)]=function(){const _0x479da4=_0x108103;this['_categoryWindow'][_0x479da4(0x33d)]();},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_onSellCancel']=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x257)],Scene_Shop[_0x108103(0x2ab)]['onSellCancel']=function(){const _0x6bce96=_0x108103;VisuMZ[_0x6bce96(0x3ae)][_0x6bce96(0x57d)]['call'](this);this['isUseModernControls']()&&this[_0x6bce96(0x358)]();if(this[_0x6bce96(0x398)]()){if(_0x6bce96(0x1a5)!=='VgUfy'){const _0x223ef7=this[_0x6bce96(0x4c9)](_0x3f7f66);this[_0x6bce96(0x41f)](_0x223ef7,_0x517c6a[_0x6bce96(0x2c9)],_0x184ed3['x'],_0x1426f5['y'],_0x460025['width']);}else this[_0x6bce96(0x35e)][_0x6bce96(0x41d)]();}},Scene_Shop[_0x108103(0x2ab)]['sellPriceOfItem']=function(_0x2f50a7){const _0x3c9a25=_0x108103,_0xc2402f=this[_0x3c9a25(0x594)];this[_0x3c9a25(0x594)]=_0x2f50a7;const _0x129b10=this[_0x3c9a25(0x4d0)]();return this['_item']=_0xc2402f,_0x129b10;},VisuMZ[_0x108103(0x3ae)][_0x108103(0x1ad)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x4d0)],Scene_Shop[_0x108103(0x2ab)]['sellingPrice']=function(){const _0x3150b8=_0x108103;let _0x2210f8=this['determineBaseSellingPrice']();const _0x5a0a29=this[_0x3150b8(0x594)];return _0x2210f8=VisuMZ[_0x3150b8(0x3ae)][_0x3150b8(0x2d6)]['ShopScene'][_0x3150b8(0x187)][_0x3150b8(0x174)](this,_0x5a0a29,_0x2210f8),_0x2210f8;},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x13c)]=function(){const _0x342712=_0x108103;let _0x41d1e6=this[_0x342712(0x594)]['price'];if(!this['_item'])return 0x0;else{if(this['_item'][_0x342712(0x412)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x3cfe95=String(RegExp['$1']);let _0xb6b7d4=this[_0x342712(0x594)],_0x42e894=_0x41d1e6*this[_0x342712(0x540)]();try{eval(_0x3cfe95);}catch(_0x285730){if($gameTemp['isPlaytest']())console['log'](_0x285730);}if(isNaN(_0x42e894))_0x42e894=0x0;return Math[_0x342712(0x1b8)](_0x42e894);}else return this[_0x342712(0x594)][_0x342712(0x412)]['match'](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x342712(0x1b8)](this[_0x342712(0x1d4)]());}},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x1d4)]=function(){const _0x94f5f7=_0x108103;return this[_0x94f5f7(0x594)]['price']*this[_0x94f5f7(0x540)]();},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x540)]=function(){const _0x5668bb=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x5668bb(0x2d6)][_0x5668bb(0x4ee)][_0x5668bb(0x439)];},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5da)]=function(){const _0x381df2=_0x108103;if(!this[_0x381df2(0x2d7)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x381df2(0x181)])return![];if(!this[_0x381df2(0x181)]['active'])return![];return this[_0x381df2(0x2d7)]()&&this[_0x381df2(0x45a)]();},Scene_Shop[_0x108103(0x2ab)]['buttonAssistKey1']=function(){const _0x491d9a=_0x108103;if(this['buttonAssistItemListRequirement']()){if(_0x491d9a(0x2b9)!==_0x491d9a(0x2b9))this[_0x491d9a(0x3bf)](_0x239d1d['param'](_0x362529),_0x1cc005+_0x2c84bf,_0x4ec32c,_0x5cf212);else return this['_sellWindow'][_0x491d9a(0x2c7)]()===0x1?TextManager[_0x491d9a(0x5b3)](_0x491d9a(0x49b),_0x491d9a(0x170)):_0x491d9a(0x536)!==_0x491d9a(0x536)?_0x705e48[_0x491d9a(0x3ae)]['Window_ItemList_item'][_0x491d9a(0x174)](this):TextManager[_0x491d9a(0x5b3)]('pageup',_0x491d9a(0x43d));}else{if(this['_numberWindow']&&this[_0x491d9a(0x15f)]['active'])return TextManager[_0x491d9a(0x5b3)](_0x491d9a(0x49b),_0x491d9a(0x170));}return Scene_MenuBase[_0x491d9a(0x2ab)][_0x491d9a(0x155)][_0x491d9a(0x174)](this);},Scene_Shop[_0x108103(0x2ab)][_0x108103(0x176)]=function(){const _0x3a985a=_0x108103;if(this[_0x3a985a(0x15f)]&&this[_0x3a985a(0x15f)]['active'])return TextManager[_0x3a985a(0x5b3)]('up',_0x3a985a(0x31d));return Scene_MenuBase[_0x3a985a(0x2ab)][_0x3a985a(0x176)]['call'](this);},Scene_Shop['prototype'][_0x108103(0x336)]=function(){const _0x22a504=_0x108103;if(this[_0x22a504(0x5da)]())return VisuMZ[_0x22a504(0x3ae)][_0x22a504(0x2d6)][_0x22a504(0x509)][_0x22a504(0x17b)];else{if(this[_0x22a504(0x15f)]&&this['_numberWindow']['active'])return VisuMZ[_0x22a504(0x3ae)]['Settings']['ShopScene'][_0x22a504(0x545)];}return Scene_MenuBase[_0x22a504(0x2ab)][_0x22a504(0x336)]['call'](this);},Scene_Shop[_0x108103(0x2ab)]['buttonAssistText2']=function(){const _0x155007=_0x108103;if(this[_0x155007(0x15f)]&&this[_0x155007(0x15f)][_0x155007(0x462)])return VisuMZ[_0x155007(0x3ae)][_0x155007(0x2d6)][_0x155007(0x4ee)][_0x155007(0x1f2)];return Scene_MenuBase[_0x155007(0x2ab)]['buttonAssistText2'][_0x155007(0x174)](this);},Scene_Shop[_0x108103(0x2ab)]['resetShopSwitches']=function(){const _0x341fc6=_0x108103;if(!SceneManager[_0x341fc6(0x587)]())return;const _0x2deb2a=VisuMZ[_0x341fc6(0x3ae)][_0x341fc6(0x2d6)][_0x341fc6(0x4ee)];_0x2deb2a[_0x341fc6(0x23c)]&&$gameSwitches[_0x341fc6(0x191)](_0x2deb2a[_0x341fc6(0x23c)],![]),_0x2deb2a[_0x341fc6(0x3dc)]&&$gameSwitches['setValue'](_0x2deb2a[_0x341fc6(0x3dc)],![]);},VisuMZ[_0x108103(0x3ae)]['Scene_Shop_doBuy']=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5b4)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x5b4)]=function(_0x12cf1a){const _0xbf4d90=_0x108103;VisuMZ[_0xbf4d90(0x3ae)][_0xbf4d90(0x270)][_0xbf4d90(0x174)](this,_0x12cf1a);if(_0x12cf1a<=0x0)return;const _0x2665f8=VisuMZ[_0xbf4d90(0x3ae)]['Settings']['ShopScene'];_0x2665f8['SwitchBuy']&&$gameSwitches[_0xbf4d90(0x191)](_0x2665f8[_0xbf4d90(0x23c)],!![]);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x46e)]=Scene_Shop[_0x108103(0x2ab)][_0x108103(0x533)],Scene_Shop[_0x108103(0x2ab)][_0x108103(0x533)]=function(_0xf8eced){const _0x567959=_0x108103;VisuMZ[_0x567959(0x3ae)][_0x567959(0x46e)][_0x567959(0x174)](this,_0xf8eced);if(_0xf8eced<=0x0)return;const _0x49aecd=VisuMZ[_0x567959(0x3ae)][_0x567959(0x2d6)][_0x567959(0x4ee)];if(_0x49aecd[_0x567959(0x23c)]){if(_0x567959(0x2c4)!==_0x567959(0x2c4)){if(this[_0x567959(0x1b1)](_0x57e56d))this[_0x567959(0x492)](_0x1bac87,null);}else $gameSwitches['setValue'](_0x49aecd['SwitchSell'],!![]);}};function Sprite_NewLabel(){const _0x19764d=_0x108103;this[_0x19764d(0x1cb)](...arguments);}Sprite_NewLabel[_0x108103(0x2ab)]=Object[_0x108103(0x2d4)](Sprite[_0x108103(0x2ab)]),Sprite_NewLabel[_0x108103(0x2ab)][_0x108103(0x5d9)]=Sprite_NewLabel,Sprite_NewLabel[_0x108103(0x2ab)][_0x108103(0x1cb)]=function(){const _0x12e441=_0x108103;Sprite[_0x12e441(0x2ab)]['initialize'][_0x12e441(0x174)](this),this[_0x12e441(0x4b6)]();},Sprite_NewLabel[_0x108103(0x2ab)]['createBitmap']=function(){const _0xeaac3d=_0x108103,_0x19f812=ImageManager[_0xeaac3d(0x574)],_0x1da07a=ImageManager[_0xeaac3d(0x1ca)];this[_0xeaac3d(0x202)]=new Bitmap(_0x19f812,_0x1da07a),this[_0xeaac3d(0x26c)](),this[_0xeaac3d(0x24e)]();},Sprite_NewLabel[_0x108103(0x2ab)][_0x108103(0x26c)]=function(){const _0x44e09b=_0x108103,_0x22ee16=VisuMZ[_0x44e09b(0x3ae)][_0x44e09b(0x2d6)][_0x44e09b(0x1d7)][_0x44e09b(0x56a)];if(_0x22ee16<=0x0)return;const _0x1fb319=ImageManager[_0x44e09b(0x51f)](_0x44e09b(0x1d8)),_0x1d6b0a=ImageManager['iconWidth'],_0x3b846f=ImageManager[_0x44e09b(0x1ca)],_0x59a1f5=_0x22ee16%0x10*_0x1d6b0a,_0x55fd23=Math[_0x44e09b(0x1b8)](_0x22ee16/0x10)*_0x3b846f;this[_0x44e09b(0x202)][_0x44e09b(0x4b3)](_0x1fb319,_0x59a1f5,_0x55fd23,_0x1d6b0a,_0x3b846f,0x0,0x0);},Sprite_NewLabel[_0x108103(0x2ab)][_0x108103(0x24e)]=function(){const _0x3c72f2=_0x108103,_0xdc5e6c=VisuMZ[_0x3c72f2(0x3ae)]['Settings']['New'],_0x4e1232=_0xdc5e6c['Text'];if(_0x4e1232==='')return;const _0x209901=ImageManager[_0x3c72f2(0x574)],_0x224948=ImageManager['iconHeight'];this[_0x3c72f2(0x202)][_0x3c72f2(0x57c)]=_0xdc5e6c[_0x3c72f2(0x53c)]||$gameSystem[_0x3c72f2(0x4d7)](),this[_0x3c72f2(0x202)]['textColor']=this[_0x3c72f2(0x56b)](),this['bitmap']['fontSize']=_0xdc5e6c[_0x3c72f2(0x568)],this[_0x3c72f2(0x202)][_0x3c72f2(0x3bf)](_0x4e1232,0x0,_0x224948/0x2,_0x209901,_0x224948/0x2,'center');},Sprite_NewLabel['prototype'][_0x108103(0x56b)]=function(){const _0x7d922e=_0x108103,_0xbf5fa5=VisuMZ[_0x7d922e(0x3ae)][_0x7d922e(0x2d6)]['New'][_0x7d922e(0x2ba)];return _0xbf5fa5['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x7d922e(0x555)](_0xbf5fa5);},Window_Base['prototype']['drawItemName']=function(_0x3d7702,_0x4d1e99,_0x4c5794,_0x101824){const _0x239c43=_0x108103;if(_0x3d7702){const _0x5cdf39=_0x4c5794+(this[_0x239c43(0x28d)]()-ImageManager[_0x239c43(0x1ca)])/0x2,_0x432c66=ImageManager[_0x239c43(0x574)]+0x4,_0x378abe=Math[_0x239c43(0x317)](0x0,_0x101824-_0x432c66);this['changeTextColor'](ColorManager[_0x239c43(0x38a)](_0x3d7702)),this[_0x239c43(0x577)](_0x3d7702['iconIndex'],_0x4d1e99,_0x5cdf39),this[_0x239c43(0x3bf)](_0x3d7702[_0x239c43(0x2f6)],_0x4d1e99+_0x432c66,_0x4c5794,_0x378abe),this[_0x239c43(0x31b)]();}},Window_Base['prototype'][_0x108103(0x589)]=function(_0x8d667a,_0x2665b4,_0x353a3d,_0x3df11c){const _0x1db602=_0x108103;if(this[_0x1db602(0x321)](_0x8d667a)){if(_0x1db602(0x474)===_0x1db602(0x474)){this[_0x1db602(0x1e5)]();const _0x1c4991=VisuMZ[_0x1db602(0x3ae)][_0x1db602(0x2d6)]['ItemScene'],_0x41d195=_0x1c4991['ItemQuantityFmt'],_0x537210=_0x41d195[_0x1db602(0x423)]($gameParty[_0x1db602(0x443)](_0x8d667a));this[_0x1db602(0x1e8)][_0x1db602(0x436)]=_0x1c4991['ItemQuantityFontSize'],this[_0x1db602(0x3bf)](_0x537210,_0x2665b4,_0x353a3d,_0x3df11c,_0x1db602(0x170)),this[_0x1db602(0x1e5)]();}else return _0x316515;}},Window_Base[_0x108103(0x2ab)]['isDrawItemNumber']=function(_0x5a7275){const _0x395674=_0x108103;if(DataManager[_0x395674(0x3ab)](_0x5a7275))return $dataSystem[_0x395674(0x2ce)];return!![];},Window_Base[_0x108103(0x2ab)][_0x108103(0x221)]=function(_0x5974df,_0x13b546,_0x49a40c,_0x4cfa91,_0x4892ee){const _0x5b1810=_0x108103;_0x4892ee=Math['max'](_0x4892ee||0x1,0x1);while(_0x4892ee--){_0x4cfa91=_0x4cfa91||this[_0x5b1810(0x28d)](),this['contentsBack'][_0x5b1810(0x259)]=0xa0;const _0x1cd19a=ColorManager['gaugeBackColor']();this[_0x5b1810(0x532)][_0x5b1810(0x372)](_0x5974df+0x1,_0x13b546+0x1,_0x49a40c-0x2,_0x4cfa91-0x2,_0x1cd19a),this[_0x5b1810(0x532)][_0x5b1810(0x259)]=0xff;}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x41a)]=Window_Selectable['prototype'][_0x108103(0x1cb)],Window_Selectable[_0x108103(0x2ab)]['initialize']=function(_0x302cb4){const _0x1777cf=_0x108103;this[_0x1777cf(0x2ad)](),VisuMZ[_0x1777cf(0x3ae)]['Window_Selectable_initialize'][_0x1777cf(0x174)](this,_0x302cb4);},Window_Selectable['prototype']['initNewLabelSprites']=function(){const _0x14b7f6=_0x108103;this[_0x14b7f6(0x4f2)]={},this[_0x14b7f6(0x216)]=0xff,this[_0x14b7f6(0x1d6)]=VisuMZ[_0x14b7f6(0x3ae)]['Settings'][_0x14b7f6(0x1d7)][_0x14b7f6(0x51d)],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x14b7f6(0x3ae)]['Settings']['New'][_0x14b7f6(0x591)];},Window_Selectable[_0x108103(0x2ab)]['isShowNew']=function(){return![];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x5aa)]=Window_Selectable[_0x108103(0x2ab)][_0x108103(0x166)],Window_Selectable[_0x108103(0x2ab)][_0x108103(0x166)]=function(_0x13661d){const _0x475b41=_0x108103;VisuMZ[_0x475b41(0x3ae)][_0x475b41(0x5aa)][_0x475b41(0x174)](this,_0x13661d);if(this['isShowNew']())this[_0x475b41(0x205)](_0x13661d);},Window_Selectable[_0x108103(0x2ab)]['clearNewLabelFromItem']=function(_0x59bd7b){const _0x11a88c=_0x108103;if(!_0x59bd7b)return;$gameParty[_0x11a88c(0x338)](_0x59bd7b);let _0x436c53='';if(DataManager[_0x11a88c(0x322)](_0x59bd7b))_0x436c53=_0x11a88c(0x2c2)[_0x11a88c(0x423)](_0x59bd7b['id']);else{if(DataManager['isWeapon'](_0x59bd7b))_0x436c53=_0x11a88c(0x4e5)[_0x11a88c(0x423)](_0x59bd7b['id']);else{if(DataManager[_0x11a88c(0x44b)](_0x59bd7b))_0x436c53=_0x11a88c(0x3e1)['format'](_0x59bd7b['id']);else return;}}const _0x1404b8=this[_0x11a88c(0x4f2)][_0x436c53];if(_0x1404b8)_0x1404b8[_0x11a88c(0x41d)]();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x4b9)]=Window_Selectable['prototype'][_0x108103(0x3f4)],Window_Selectable[_0x108103(0x2ab)][_0x108103(0x3f4)]=function(){const _0x212e86=_0x108103;this[_0x212e86(0x44c)](),VisuMZ['ItemsEquipsCore'][_0x212e86(0x4b9)][_0x212e86(0x174)](this);},Window_Selectable['prototype'][_0x108103(0x44c)]=function(){const _0x3c48ab=_0x108103;for(const _0x1e49bf of Object[_0x3c48ab(0x3b0)](this['_newLabelSprites'])){_0x1e49bf[_0x3c48ab(0x41d)]();}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x289)]=Window_Selectable[_0x108103(0x2ab)]['update'],Window_Selectable[_0x108103(0x2ab)][_0x108103(0x3c6)]=function(){const _0x2897f9=_0x108103;this['updateNewLabelOpacity'](),VisuMZ[_0x2897f9(0x3ae)][_0x2897f9(0x289)][_0x2897f9(0x174)](this);},Window_Selectable[_0x108103(0x2ab)]['updateNewLabelOpacity']=function(){const _0x44daef=_0x108103;if(!this[_0x44daef(0x5d7)]())return;const _0x563074=this['_newLabelOpacityUpperLimit'];this[_0x44daef(0x216)]+=this[_0x44daef(0x1d6)];(this['_newLabelOpacity']>=_0x563074||this[_0x44daef(0x216)]<=0x0)&&(this[_0x44daef(0x1d6)]*=-0x1);this['_newLabelOpacity']=this[_0x44daef(0x216)][_0x44daef(0x1bc)](0x0,_0x563074);for(const _0x34245b of Object[_0x44daef(0x3b0)](this[_0x44daef(0x4f2)])){_0x34245b[_0x44daef(0x3ec)]=this[_0x44daef(0x216)];}},Window_Selectable['prototype'][_0x108103(0x189)]=function(_0x2da9aa){const _0x5dea7c=_0x108103,_0x3e7c3c=this[_0x5dea7c(0x4f2)];if(_0x3e7c3c[_0x2da9aa])return _0x3e7c3c[_0x2da9aa];else{if(_0x5dea7c(0x36e)!==_0x5dea7c(0x36e))return _0x5dea7c(0x556)[_0x5dea7c(0x423)](_0x266d78(_0x26494a['$1']));else{const _0x2e4e95=new Sprite_NewLabel();return _0x3e7c3c[_0x2da9aa]=_0x2e4e95,this[_0x5dea7c(0x460)](_0x2e4e95),_0x2e4e95;}}},Window_Selectable[_0x108103(0x2ab)]['placeNewLabel']=function(_0x161e5f,_0x333a53,_0x4230d5){const _0x2cd68f=_0x108103;let _0x2726ec='';if(DataManager[_0x2cd68f(0x322)](_0x161e5f))_0x2726ec='item-%1'[_0x2cd68f(0x423)](_0x161e5f['id']);else{if(DataManager['isWeapon'](_0x161e5f))'GdQQA'===_0x2cd68f(0x3aa)?_0x2726ec=_0x2cd68f(0x4e5)[_0x2cd68f(0x423)](_0x161e5f['id']):this[_0x2cd68f(0x40b)][_0x2cd68f(0x407)](this['_newItemsList'][_0x2cd68f(0x1ff)](_0x32740c),0x1);else{if(DataManager['isArmor'](_0x161e5f))_0x2726ec=_0x2cd68f(0x3e1)[_0x2cd68f(0x423)](_0x161e5f['id']);else return;}}const _0x45b125=this[_0x2cd68f(0x189)](_0x2726ec);_0x45b125[_0x2cd68f(0x3ad)](_0x333a53,_0x4230d5),_0x45b125[_0x2cd68f(0x33d)](),_0x45b125['opacity']=this[_0x2cd68f(0x216)];},Window_ItemCategory[_0x108103(0x5a7)]=VisuMZ[_0x108103(0x3ae)][_0x108103(0x2d6)][_0x108103(0x444)][_0x108103(0x401)],Window_ItemCategory[_0x108103(0x2e8)]=['HiddenItemA',_0x108103(0x291),_0x108103(0x295),_0x108103(0x258),_0x108103(0x4e8),_0x108103(0x297),_0x108103(0x33e),_0x108103(0x320)],VisuMZ['ItemsEquipsCore'][_0x108103(0x3df)]=Window_ItemCategory['prototype'][_0x108103(0x1cb)],Window_ItemCategory[_0x108103(0x2ab)]['initialize']=function(_0x384f84){const _0x3caff4=_0x108103;VisuMZ[_0x3caff4(0x3ae)][_0x3caff4(0x3df)][_0x3caff4(0x174)](this,_0x384f84),this[_0x3caff4(0x2e1)](_0x384f84);},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x2e1)]=function(_0x2ceb43){const _0x43c71d=_0x108103,_0x399a8a=new Rectangle(0x0,0x0,_0x2ceb43[_0x43c71d(0x2f7)],_0x2ceb43['height']);this['_categoryNameWindow']=new Window_Base(_0x399a8a),this[_0x43c71d(0x168)][_0x43c71d(0x3ec)]=0x0,this[_0x43c71d(0x2c5)](this[_0x43c71d(0x168)]),this[_0x43c71d(0x3a5)]();},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x45a)]=function(){const _0x243587=_0x108103;return Imported[_0x243587(0x34f)]&&Window_HorzCommand[_0x243587(0x2ab)][_0x243587(0x45a)]['call'](this);},Window_ItemCategory[_0x108103(0x2ab)]['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x52a)]=function(){const _0x105c4b=_0x108103;if(!this[_0x105c4b(0x45a)]())Window_HorzCommand[_0x105c4b(0x2ab)][_0x105c4b(0x52a)][_0x105c4b(0x174)](this);},Window_ItemCategory[_0x108103(0x2ab)]['maxCols']=function(){const _0x9d8922=_0x108103;return this[_0x9d8922(0x405)]?this[_0x9d8922(0x519)]():0x4;},Window_ItemCategory[_0x108103(0x2ab)]['update']=function(){const _0x27342e=_0x108103;Window_HorzCommand[_0x27342e(0x2ab)]['update'][_0x27342e(0x174)](this),this[_0x27342e(0x58b)]&&this[_0x27342e(0x58b)][_0x27342e(0x501)](this[_0x27342e(0x59d)]());},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x2cd)]=function(){const _0x404914=_0x108103;if(this[_0x404914(0x26a)]()){const _0x1b8e23=this['index']();if(this[_0x404914(0x58b)]&&this['_itemWindow'][_0x404914(0x2c7)]()<=0x1){if(_0x404914(0x52d)!==_0x404914(0x52d)){const _0x4d859e=_0xacbb35['equipTypes']['indexOf'](_0x18cb44(_0x47a3c1['$1'])[_0x404914(0x425)]());return _0x18067f[_0x404914(0x44b)](_0x349d84)&&_0x41487b[_0x404914(0x1db)]===_0x4d859e;}else{if(Input[_0x404914(0x150)](_0x404914(0x170))){if(_0x404914(0x49f)===_0x404914(0x23e))return _0x37f650[_0x404914(0x5b3)](_0x404914(0x49b),_0x404914(0x170));else this[_0x404914(0x47b)](Input['isTriggered'](_0x404914(0x170)));}Input['isRepeated'](_0x404914(0x49b))&&('uhssO'===_0x404914(0x199)?this[_0x404914(0x2b0)](Input[_0x404914(0x23a)]('left')):this['onTouchOk']());}}else this[_0x404914(0x58b)]&&this[_0x404914(0x58b)][_0x404914(0x2c7)]()>0x1&&(Input[_0x404914(0x150)]('pagedown')&&!Input[_0x404914(0x333)](_0x404914(0x3e5))&&this[_0x404914(0x47b)](Input['isTriggered']('pagedown')),Input[_0x404914(0x150)](_0x404914(0x3d5))&&!Input[_0x404914(0x333)](_0x404914(0x3e5))&&this[_0x404914(0x2b0)](Input[_0x404914(0x23a)](_0x404914(0x3d5))));this[_0x404914(0x324)]()!==_0x1b8e23&&this[_0x404914(0x477)]();}},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x35d)]=function(){const _0x2f3392=_0x108103;if(this[_0x2f3392(0x45a)]())return;Window_HorzCommand[_0x2f3392(0x2ab)]['processHandling']['call'](this);},Window_ItemCategory['prototype'][_0x108103(0x32a)]=function(){const _0x152fea=_0x108103;return this[_0x152fea(0x45a)]()?![]:'pQghO'===_0x152fea(0x537)?Window_HorzCommand[_0x152fea(0x2ab)][_0x152fea(0x32a)][_0x152fea(0x174)](this):_0x270934[_0x152fea(0x3ae)]['Scene_Item_categoryWindowRect']['call'](this);},Window_ItemCategory[_0x108103(0x2ab)]['processTouchModernControls']=function(){const _0x56861d=_0x108103;if(this[_0x56861d(0x309)]()){TouchInput[_0x56861d(0x23a)]()&&this[_0x56861d(0x5ae)](!![]);if(TouchInput['isClicked']())this[_0x56861d(0x4ad)]();else{if(TouchInput[_0x56861d(0x3cb)]()){if('RlVvg'==='RlVvg')this['onTouchCancel']();else{_0x37d39b['prototype'][_0x56861d(0x169)][_0x56861d(0x174)](this);if(this['_commandNameWindow'])this[_0x56861d(0x351)]();}}}}},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x5ae)]=function(_0x11d13f){const _0x380d47=_0x108103;this[_0x380d47(0x45a)]()?this['onTouchSelectModern'](!![]):Window_HorzCommand[_0x380d47(0x2ab)][_0x380d47(0x5ae)][_0x380d47(0x174)](this,_0x11d13f);},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x332)]=function(_0x1dc5d6){const _0x30888f=_0x108103;this['_doubleTouch']=![];if(this[_0x30888f(0x26a)]()){const _0x11fc3c=this[_0x30888f(0x324)](),_0x554c9f=this['hitIndex']();_0x554c9f>=0x0&&_0x554c9f!==this[_0x30888f(0x324)]()&&this[_0x30888f(0x131)](_0x554c9f),_0x1dc5d6&&this[_0x30888f(0x324)]()!==_0x11fc3c&&this[_0x30888f(0x477)]();}},Window_ItemCategory[_0x108103(0x2ab)]['makeCommandList']=function(){const _0xce73ab=_0x108103;this['addItemCategories'](),this[_0xce73ab(0x131)](this['index']());},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x287)]=function(){const _0x3d1e44=_0x108103;for(const _0x2c65f2 of Window_ItemCategory[_0x3d1e44(0x5a7)]){if('NGlvd'!==_0x3d1e44(0x391))this[_0x3d1e44(0x2e0)](_0x2c65f2);else{_0x24de53[_0x3d1e44(0x55f)]();const _0x485c3b=_0x313dda[_0x3d1e44(0x3f2)][_0x3d1e44(0x422)];_0x485c3b[_0x3d1e44(0x492)](this[_0x3d1e44(0x324)](),null),this[_0x3d1e44(0x3f4)](),this[_0x3d1e44(0x58b)]['refresh'](),this[_0x3d1e44(0x169)]();const _0x42fc09=_0x3e3a08[_0x3d1e44(0x3f2)][_0x3d1e44(0x47f)];if(_0x42fc09)_0x42fc09[_0x3d1e44(0x3f4)]();}}},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x2e0)]=function(_0x4bc148){const _0x26d459=_0x108103,_0x11568a=_0x4bc148[_0x26d459(0x1e4)],_0x9e158f=_0x4bc148[_0x26d459(0x56a)],_0x50c7d9=_0x4bc148[_0x26d459(0x29e)]||0x0;if(_0x50c7d9>0x0&&!$gameSwitches[_0x26d459(0x4bc)](_0x50c7d9))return;let _0x5734dd='',_0x23c610=_0x26d459(0x163),_0x4b943a=_0x11568a;if(_0x11568a[_0x26d459(0x1a3)](/Category:(.*)/i))_0x5734dd=String(RegExp['$1'])['trim']();else{if(Window_ItemCategory[_0x26d459(0x2e8)][_0x26d459(0x4ff)](_0x11568a)){if(_0x26d459(0x352)!==_0x26d459(0x352))return _0x26d459(0x269);else _0x5734dd=VisuMZ[_0x26d459(0x3ae)][_0x26d459(0x2d6)]['Categories'][_0x11568a];}else{if(['AllItems',_0x26d459(0x570)]['includes'](_0x11568a))_0x5734dd=TextManager[_0x26d459(0x25e)];else{if(_0x11568a==='KeyItems')_0x5734dd=TextManager[_0x26d459(0x229)];else{if(_0x11568a===_0x26d459(0x31a))_0x5734dd=TextManager[_0x26d459(0x5c2)];else{if(_0x11568a===_0x26d459(0x184)){if(_0x26d459(0x548)===_0x26d459(0x59f))return![];else _0x5734dd=TextManager[_0x26d459(0x39a)];}else{if(_0x11568a[_0x26d459(0x1a3)](/WTYPE:(\d+)/i)){if(_0x26d459(0x5a5)===_0x26d459(0x5a5))_0x5734dd=$dataSystem[_0x26d459(0x58e)][Number(RegExp['$1'])]||'';else return this[_0x26d459(0x39e)]()[_0x26d459(0x397)](this[_0x26d459(0x2c0)]());}else{if(_0x11568a[_0x26d459(0x1a3)](/ATYPE:(\d+)/i))_0x26d459(0x368)!==_0x26d459(0x294)?_0x5734dd=$dataSystem[_0x26d459(0x47d)][Number(RegExp['$1'])]||'':this[_0x26d459(0x3b8)](_0x7dfb95);else{if(_0x11568a['match'](/ETYPE:(\d+)/i)){if('LNDNe'!==_0x26d459(0x4e9))return this[_0x26d459(0x3e0)]();else _0x5734dd=$dataSystem[_0x26d459(0x3dd)][Number(RegExp['$1'])]||'';}}}}}}}}}_0x9e158f>0x0&&this[_0x26d459(0x41b)]()!==_0x26d459(0x50f)&&(_0x5734dd='\x5cI[%1]%2'['format'](_0x9e158f,_0x5734dd)),this[_0x26d459(0x520)](_0x5734dd,_0x23c610,!![],_0x4b943a);},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x403)]=function(){const _0x273053=_0x108103;return VisuMZ[_0x273053(0x3ae)][_0x273053(0x2d6)][_0x273053(0x444)][_0x273053(0x284)];},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x29c)]=function(_0x23c8d9){const _0x45d55a=_0x108103,_0x4f4b3f=this[_0x45d55a(0x2d5)](_0x23c8d9);if(_0x4f4b3f===_0x45d55a(0x269)){if(_0x45d55a(0x3b6)!==_0x45d55a(0x3b6))return _0x4338c8['ItemsEquipsCore'][_0x45d55a(0x2d6)][_0x45d55a(0x509)][_0x45d55a(0x353)];else this[_0x45d55a(0x3b8)](_0x23c8d9);}else _0x4f4b3f==='icon'?this['drawItemStyleIcon'](_0x23c8d9):Window_HorzCommand['prototype'][_0x45d55a(0x29c)][_0x45d55a(0x174)](this,_0x23c8d9);},Window_ItemCategory['prototype'][_0x108103(0x41b)]=function(){const _0x38f69e=_0x108103;return VisuMZ[_0x38f69e(0x3ae)][_0x38f69e(0x2d6)][_0x38f69e(0x444)][_0x38f69e(0x37d)];},Window_ItemCategory[_0x108103(0x2ab)]['categoryStyleCheck']=function(_0x2a0222){const _0x14123a=_0x108103;if(_0x2a0222<0x0)return _0x14123a(0x50f);const _0x7e3479=this['categoryStyle']();if(_0x7e3479!==_0x14123a(0x4b7))return _0x7e3479;else{const _0x266307=this[_0x14123a(0x26e)](_0x2a0222);if(_0x266307[_0x14123a(0x1a3)](/\\I\[(\d+)\]/i)){if(_0x14123a(0x552)!==_0x14123a(0x552)){const _0x426033=_0x14123a(0x449);if(this[_0x14123a(0x42c)][_0x426033])return this[_0x14123a(0x42c)][_0x426033];const _0x1bbcdd=_0x227333[_0x14123a(0x3ae)][_0x14123a(0x2d6)][_0x14123a(0x325)],_0x4acfa2='Occasion%1'[_0x14123a(0x423)](this[_0x14123a(0x594)][_0x14123a(0x400)]);return _0x1bbcdd[_0x4acfa2];}else{const _0x235c90=this[_0x14123a(0x224)](_0x2a0222),_0x4c7c23=this[_0x14123a(0x414)](_0x266307)[_0x14123a(0x2f7)];if(_0x4c7c23<=_0x235c90[_0x14123a(0x2f7)])return _0x14123a(0x269);else{if('ltKRi'===_0x14123a(0x1fb))return _0x14123a(0x1d2);else{if(!_0xf38221['value'](_0x364680))return!![];}}}}else return'text';}},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x3b8)]=function(_0x292249){const _0xa9e18e=_0x108103,_0x16b59c=this[_0xa9e18e(0x224)](_0x292249),_0x14e4a0=this['commandName'](_0x292249),_0x2f79f3=this[_0xa9e18e(0x414)](_0x14e4a0)[_0xa9e18e(0x2f7)];this[_0xa9e18e(0x494)](this[_0xa9e18e(0x49d)](_0x292249));const _0x416826=this[_0xa9e18e(0x403)]();if(_0x416826===_0xa9e18e(0x170)){if('pdjQX'===_0xa9e18e(0x2a0))for(const _0x4d37a6 of _0x3d64b6[_0xa9e18e(0x3b0)](this[_0xa9e18e(0x4f2)])){_0x4d37a6['hide']();}else this[_0xa9e18e(0x3ff)](_0x14e4a0,_0x16b59c['x']+_0x16b59c[_0xa9e18e(0x2f7)]-_0x2f79f3,_0x16b59c['y'],_0x2f79f3);}else{if(_0x416826==='center'){const _0x2fa66b=_0x16b59c['x']+Math[_0xa9e18e(0x1b8)]((_0x16b59c[_0xa9e18e(0x2f7)]-_0x2f79f3)/0x2);this[_0xa9e18e(0x3ff)](_0x14e4a0,_0x2fa66b,_0x16b59c['y'],_0x2f79f3);}else this['drawTextEx'](_0x14e4a0,_0x16b59c['x'],_0x16b59c['y'],_0x2f79f3);}},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x40e)]=function(_0x471bfb){const _0x2f87bb=_0x108103,_0x5baa0e=this[_0x2f87bb(0x26e)](_0x471bfb);if(_0x5baa0e[_0x2f87bb(0x1a3)](/\\I\[(\d+)\]/i)){const _0x272bb8=Number(RegExp['$1'])||0x0,_0x14d52d=this[_0x2f87bb(0x224)](_0x471bfb),_0x5ba9c8=_0x14d52d['x']+Math[_0x2f87bb(0x1b8)]((_0x14d52d['width']-ImageManager[_0x2f87bb(0x574)])/0x2),_0x4e918f=_0x14d52d['y']+(_0x14d52d[_0x2f87bb(0x157)]-ImageManager[_0x2f87bb(0x1ca)])/0x2;this['drawIcon'](_0x272bb8,_0x5ba9c8,_0x4e918f);}},VisuMZ[_0x108103(0x3ae)][_0x108103(0x3ca)]=Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x1fd)],Window_ItemCategory['prototype'][_0x108103(0x1fd)]=function(_0x2ce83d){const _0x380331=_0x108103;VisuMZ[_0x380331(0x3ae)][_0x380331(0x3ca)][_0x380331(0x174)](this,_0x2ce83d),_0x2ce83d[_0x380331(0x590)]=this;},Window_ItemCategory[_0x108103(0x2ab)][_0x108103(0x169)]=function(){const _0x153106=_0x108103;Window_HorzCommand[_0x153106(0x2ab)]['callUpdateHelp']['call'](this);if(this[_0x153106(0x168)])this[_0x153106(0x3a5)]();},Window_ItemCategory[_0x108103(0x2ab)]['updateCategoryNameWindow']=function(){const _0x114bcf=_0x108103,_0x51c0b1=this[_0x114bcf(0x168)];_0x51c0b1['contents'][_0x114bcf(0x53d)]();const _0x2277ec=this[_0x114bcf(0x2d5)](this[_0x114bcf(0x324)]());if(_0x2277ec===_0x114bcf(0x1d2)){const _0x2a8b88=this[_0x114bcf(0x224)](this['index']());let _0x4240cb=this[_0x114bcf(0x26e)](this[_0x114bcf(0x324)]());_0x4240cb=_0x4240cb[_0x114bcf(0x2ca)](/\\I\[(\d+)\]/gi,''),_0x51c0b1[_0x114bcf(0x1e5)](),this[_0x114bcf(0x19f)](_0x4240cb,_0x2a8b88),this[_0x114bcf(0x3fd)](_0x4240cb,_0x2a8b88),this[_0x114bcf(0x1c6)](_0x4240cb,_0x2a8b88);}},Window_ItemCategory[_0x108103(0x2ab)]['categoryNameWindowDrawBackground']=function(_0x370e93,_0x2b43ed){},Window_ItemCategory['prototype'][_0x108103(0x3fd)]=function(_0x1c751d,_0x4e0ae4){const _0x124bca=_0x108103,_0x190629=this[_0x124bca(0x168)];_0x190629['drawText'](_0x1c751d,0x0,_0x4e0ae4['y'],_0x190629[_0x124bca(0x24a)],_0x124bca(0x565));},Window_ItemCategory['prototype'][_0x108103(0x1c6)]=function(_0xa3bb1b,_0x26f8b1){const _0x4f21d2=_0x108103,_0x12bee5=this[_0x4f21d2(0x168)],_0x11bdd1=$gameSystem[_0x4f21d2(0x3bc)](),_0x556516=_0x26f8b1['x']+Math[_0x4f21d2(0x1b8)](_0x26f8b1[_0x4f21d2(0x2f7)]/0x2)+_0x11bdd1;_0x12bee5['x']=_0x12bee5['width']/-0x2+_0x556516,_0x12bee5['y']=Math[_0x4f21d2(0x1b8)](_0x26f8b1[_0x4f21d2(0x157)]/0x2);},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x2cd)]=function(){const _0x4dccbc=_0x108103;if(this['isCursorMovable']()){if(_0x4dccbc(0x3d2)!=='KlOHO'){const _0x192270=this['index']();if(this[_0x4dccbc(0x2c7)]()<=0x1)!this['isHandled'](_0x4dccbc(0x43d))&&Input[_0x4dccbc(0x23a)](_0x4dccbc(0x43d))&&this[_0x4dccbc(0x582)](),!this[_0x4dccbc(0x285)]('pageup')&&Input['isTriggered'](_0x4dccbc(0x3d5))&&this['cursorPageup']();else{if(this[_0x4dccbc(0x2c7)]()>0x1){Input[_0x4dccbc(0x150)]('right')&&this['cursorRight'](Input['isTriggered'](_0x4dccbc(0x170)));if(Input[_0x4dccbc(0x150)](_0x4dccbc(0x49b))){if(_0x4dccbc(0x3f7)===_0x4dccbc(0x3f7))this[_0x4dccbc(0x2b0)](Input[_0x4dccbc(0x23a)]('left'));else{const _0x35bef7=this[_0x4dccbc(0x224)](_0x3fb4ef),_0x370738=this[_0x4dccbc(0x26e)](_0x2051e3),_0x345471=this[_0x4dccbc(0x414)](_0x370738)[_0x4dccbc(0x2f7)];this[_0x4dccbc(0x494)](this[_0x4dccbc(0x49d)](_0x41a4ed));const _0x23c00e=this[_0x4dccbc(0x403)]();if(_0x23c00e===_0x4dccbc(0x170))this[_0x4dccbc(0x3ff)](_0x370738,_0x35bef7['x']+_0x35bef7['width']-_0x345471,_0x35bef7['y'],_0x345471);else{if(_0x23c00e===_0x4dccbc(0x565)){const _0x2005d6=_0x35bef7['x']+_0x3c1920['floor']((_0x35bef7['width']-_0x345471)/0x2);this[_0x4dccbc(0x3ff)](_0x370738,_0x2005d6,_0x35bef7['y'],_0x345471);}else this[_0x4dccbc(0x3ff)](_0x370738,_0x35bef7['x'],_0x35bef7['y'],_0x345471);}}}if(this[_0x4dccbc(0x4a6)]()){if(_0x4dccbc(0x529)!=='VrohJ')Input[_0x4dccbc(0x23a)]('pagedown')&&Input[_0x4dccbc(0x333)](_0x4dccbc(0x3e5))&&this[_0x4dccbc(0x582)](),Input[_0x4dccbc(0x23a)](_0x4dccbc(0x3d5))&&Input[_0x4dccbc(0x333)](_0x4dccbc(0x3e5))&&(_0x4dccbc(0x348)==='cZval'?this['onCategoryCancelItemsEquipsCore']():this[_0x4dccbc(0x54b)]());else{const _0x1a2b95=this['getItemHitTypeLabel']();this[_0x4dccbc(0x503)](_0x1a2b95,_0x34e8b5,_0x31ae91,_0x561e47,!![]);const _0x2bad3a=this[_0x4dccbc(0x231)]();return this[_0x4dccbc(0x503)](_0x2bad3a,_0x17493d,_0x543312,_0x2c4239,![],_0x4dccbc(0x170)),this[_0x4dccbc(0x221)](_0x4040da,_0x12524c,_0x4686c5),this['resetFontSettings'](),!![];}}else{Input[_0x4dccbc(0x23a)](_0x4dccbc(0x43d))&&this[_0x4dccbc(0x582)]();if(Input[_0x4dccbc(0x23a)]('pageup')){if(_0x4dccbc(0x147)!==_0x4dccbc(0x147)){const _0x528734=_0x41d0e5(_0x5911f7['$1'])['split'](/[\r\n]+/);for(const _0x2aa873 of _0x528734){const _0xf30e68=_0x369dc0[_0x4dccbc(0x3dd)][_0x4dccbc(0x1ff)](_0x2aa873[_0x4dccbc(0x425)]());if(_0xf30e68>0x0)_0x532b35['equipSlots'][_0x4dccbc(0x16f)](_0xf30e68);}}else this[_0x4dccbc(0x54b)]();}}}}if(Input[_0x4dccbc(0x150)](_0x4dccbc(0x31d))){if('EejmH'===_0x4dccbc(0x58a)){if(Input[_0x4dccbc(0x333)](_0x4dccbc(0x3e5))&&this[_0x4dccbc(0x3e9)]()){if(_0x4dccbc(0x312)===_0x4dccbc(0x21c)){if(_0x433aca)_0xe7e590+=this['paramPlusItemsEquipsCoreCustomJS'](_0x5c1ee9,_0x4d048b);}else this[_0x4dccbc(0x582)]();}else this[_0x4dccbc(0x21f)](Input[_0x4dccbc(0x23a)]('down'));}else{const _0x3692a8=_0x2af367(_0x3872c3['$1'])||0x1;if(_0x420698>=_0x3692a8)return!![];}}if(Input[_0x4dccbc(0x150)]('up')){if(_0x4dccbc(0x453)==='zLYCY'){if(Input[_0x4dccbc(0x333)](_0x4dccbc(0x3e5))&&this[_0x4dccbc(0x3e9)]())this[_0x4dccbc(0x54b)]();else{if(_0x4dccbc(0x38d)===_0x4dccbc(0x38d))this[_0x4dccbc(0x227)](Input[_0x4dccbc(0x23a)]('up'));else return _0x53d9b9;}}else{if(this['index']()!==0x0)return![];const _0x17e721=_0x462749[_0x4dccbc(0x3ae)][_0x4dccbc(0x2d6)][_0x4dccbc(0x46b)];if(!_0x17e721[_0x4dccbc(0x2ea)]&&!_0x17e721[_0x4dccbc(0x275)])return![];return _0x136530['isTriggered']('up');}}Imported[_0x4dccbc(0x34f)]&&this[_0x4dccbc(0x505)]();if(this[_0x4dccbc(0x324)]()!==_0x192270){if(_0x4dccbc(0x448)===_0x4dccbc(0x3f9))return!![];else this[_0x4dccbc(0x477)]();}}else{if(_0x57ac71)_0x1bb0b9[_0x4dccbc(0x27e)]();}}},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x4a6)]=function(){const _0x6be908=_0x108103,_0xdec4bc=SceneManager[_0x6be908(0x3f2)],_0x19924e=[Scene_Item,Scene_Shop];return _0x19924e[_0x6be908(0x4ff)](_0xdec4bc[_0x6be908(0x5d9)]);},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x523)]=function(){const _0xf2ede1=_0x108103;Window_Selectable[_0xf2ede1(0x2ab)][_0xf2ede1(0x523)][_0xf2ede1(0x174)](this),this[_0xf2ede1(0x590)]&&this['_categoryWindow'][_0xf2ede1(0x45a)]()&&this['_categoryWindow']['activate']();},Window_ItemList[_0x108103(0x2ab)]['deactivate']=function(){const _0x14de27=_0x108103;Window_Selectable[_0x14de27(0x2ab)][_0x14de27(0x518)][_0x14de27(0x174)](this);if(this[_0x14de27(0x590)]&&this[_0x14de27(0x590)][_0x14de27(0x45a)]()){if(_0x14de27(0x2c3)!==_0x14de27(0x35a))this[_0x14de27(0x590)]['deactivate']();else return _0xeebff5(_0x417bca['$1']);}},Window_ItemList['prototype'][_0x108103(0x501)]=function(_0x353675){const _0x9a9384=_0x108103;if(this[_0x9a9384(0x42a)]!==_0x353675){this['_category']=_0x353675,this[_0x9a9384(0x3f4)]();if(this[_0x9a9384(0x590)]&&this[_0x9a9384(0x590)]['isUseModernControls']())this[_0x9a9384(0x37b)](0x0);else{if(_0x9a9384(0x138)===_0x9a9384(0x138))this['scrollTo'](0x0,0x0);else{if(_0x369092[_0x9a9384(0x3ae)][_0x9a9384(0x2d6)]['StatusWindow'][_0x9a9384(0x1e2)]===![])return;_0x16d5cb=_0x2ca2ec['max'](_0x4608c3||0x1,0x1);while(_0x5f3fbb--){_0x5b173d=_0x5b58b0||this[_0x9a9384(0x28d)](),this[_0x9a9384(0x532)][_0x9a9384(0x259)]=0xa0;const _0x3e38b9=_0x3e0fb8[_0x9a9384(0x26d)]();this[_0x9a9384(0x532)][_0x9a9384(0x372)](_0xf68f46+0x1,_0x45ae44+0x1,_0x5c03a0-0x2,_0x198a57-0x2,_0x3e38b9),this[_0x9a9384(0x532)][_0x9a9384(0x259)]=0xff;}}}}},VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols']=Window_ItemList['prototype'][_0x108103(0x2c7)],Window_ItemList[_0x108103(0x2ab)]['maxCols']=function(){const _0x400022=_0x108103;if(SceneManager[_0x400022(0x3f2)][_0x400022(0x5d9)]===Scene_Battle)return VisuMZ[_0x400022(0x3ae)]['Window_ItemList_maxCols']['call'](this);else return SceneManager[_0x400022(0x3f2)][_0x400022(0x5d9)]===Scene_Map?VisuMZ[_0x400022(0x3ae)]['Window_ItemList_maxCols'][_0x400022(0x174)](this):VisuMZ[_0x400022(0x3ae)][_0x400022(0x2d6)][_0x400022(0x509)][_0x400022(0x452)];},VisuMZ[_0x108103(0x3ae)]['Window_ItemList_colSpacing']=Window_ItemList['prototype'][_0x108103(0x240)],Window_ItemList[_0x108103(0x2ab)]['colSpacing']=function(){const _0x215cd6=_0x108103;return this[_0x215cd6(0x2c7)]()<=0x1?Window_Selectable[_0x215cd6(0x2ab)][_0x215cd6(0x240)][_0x215cd6(0x174)](this):VisuMZ[_0x215cd6(0x3ae)]['Window_ItemList_colSpacing'][_0x215cd6(0x174)](this);},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x4ff)]=function(_0x47a25c){const _0x2a98af=_0x108103;switch(this[_0x2a98af(0x42a)]){case _0x2a98af(0x33a):return DataManager[_0x2a98af(0x322)](_0x47a25c);case'RegularItems':return DataManager[_0x2a98af(0x322)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x22c)]===0x1;case _0x2a98af(0x27b):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x22c)]===0x2;case'HiddenItemA':return DataManager[_0x2a98af(0x322)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x22c)]===0x3;case _0x2a98af(0x291):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x22c)]===0x4;case'Consumable':return DataManager[_0x2a98af(0x322)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x1b2)];case _0x2a98af(0x295):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&!_0x47a25c['consumable'];case _0x2a98af(0x4e8):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&[0x0]['includes'](_0x47a25c[_0x2a98af(0x400)]);case _0x2a98af(0x297):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&[0x0,0x1][_0x2a98af(0x4ff)](_0x47a25c[_0x2a98af(0x400)]);case'FieldUsable':return DataManager[_0x2a98af(0x322)](_0x47a25c)&&[0x0,0x2][_0x2a98af(0x4ff)](_0x47a25c[_0x2a98af(0x400)]);case _0x2a98af(0x320):return DataManager[_0x2a98af(0x322)](_0x47a25c)&&[0x3][_0x2a98af(0x4ff)](_0x47a25c[_0x2a98af(0x400)]);case _0x2a98af(0x31a):return DataManager[_0x2a98af(0x4a4)](_0x47a25c);case _0x2a98af(0x184):return DataManager[_0x2a98af(0x44b)](_0x47a25c);default:if(this[_0x2a98af(0x42a)][_0x2a98af(0x1a3)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x47a25c)&&_0x47a25c['wtypeId']===Number(RegExp['$1']);else{if(this[_0x2a98af(0x42a)][_0x2a98af(0x1a3)](/WTYPE:(.*)/i)){const _0x5bf24e=$dataSystem['weaponTypes'][_0x2a98af(0x1ff)](String(RegExp['$1'])[_0x2a98af(0x425)]());return DataManager[_0x2a98af(0x4a4)](_0x47a25c)&&_0x47a25c['wtypeId']===_0x5bf24e;}else{if(this[_0x2a98af(0x42a)]['match'](/ATYPE:(\d+)/i))return DataManager[_0x2a98af(0x44b)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x553)]===Number(RegExp['$1']);else{if(this[_0x2a98af(0x42a)][_0x2a98af(0x1a3)](/ATYPE:(.*)/i)){const _0x42e89a=$dataSystem[_0x2a98af(0x47d)][_0x2a98af(0x1ff)](String(RegExp['$1'])['trim']());return DataManager[_0x2a98af(0x44b)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x553)]===_0x42e89a;}else{if(this[_0x2a98af(0x42a)][_0x2a98af(0x1a3)](/ETYPE:(\d+)/i))return!!_0x47a25c&&_0x47a25c[_0x2a98af(0x1db)]===Number(RegExp['$1']);else{if(this['_category']['match'](/ETYPE:(.*)/i)){if(_0x2a98af(0x57a)===_0x2a98af(0x1e7))this[_0x2a98af(0x1e1)](_0x25b2d7+_0x578b27,_0x2c092b,_0x2d7619,_0x52b34a,![]);else{const _0x532d25=$dataSystem['equipTypes'][_0x2a98af(0x1ff)](String(RegExp['$1'])[_0x2a98af(0x425)]());return DataManager[_0x2a98af(0x44b)](_0x47a25c)&&_0x47a25c[_0x2a98af(0x1db)]===_0x532d25;}}else{if(this['_category'][_0x2a98af(0x1a3)](/Category:(.*)/i)){if(_0x2a98af(0x3c3)!==_0x2a98af(0x22b))return!!_0x47a25c&&_0x47a25c[_0x2a98af(0x4ab)][_0x2a98af(0x4ff)](String(RegExp['$1'])[_0x2a98af(0x45c)]()[_0x2a98af(0x425)]());else _0x31100c['ItemsEquipsCore'][_0x2a98af(0x57d)][_0x2a98af(0x174)](this),this[_0x2a98af(0x45a)]()&&this[_0x2a98af(0x358)](),this[_0x2a98af(0x398)]()&&this[_0x2a98af(0x35e)][_0x2a98af(0x41d)]();}}}}}}}}return![];},Window_ItemList['prototype'][_0x108103(0x5d7)]=function(){return!![];},VisuMZ[_0x108103(0x3ae)][_0x108103(0x3d9)]=Window_ItemList[_0x108103(0x2ab)][_0x108103(0x29c)],Window_ItemList[_0x108103(0x2ab)][_0x108103(0x29c)]=function(_0x204458){const _0x429128=_0x108103;VisuMZ[_0x429128(0x3ae)][_0x429128(0x3d9)][_0x429128(0x174)](this,_0x204458),this[_0x429128(0x1a6)](_0x204458);},Window_ItemList[_0x108103(0x2ab)][_0x108103(0x589)]=function(_0x188565,_0x201091,_0x498ade,_0x36f773){const _0x10e20e=_0x108103;Window_Selectable[_0x10e20e(0x2ab)]['drawItemNumber']['call'](this,_0x188565,_0x201091,_0x498ade,_0x36f773);},Window_ItemList[_0x108103(0x2ab)]['placeItemNewLabel']=function(_0x5a2edb){const _0x581c86=_0x108103,_0x106f6c=this[_0x581c86(0x28b)](_0x5a2edb);if(!_0x106f6c||!this[_0x581c86(0x5d7)]())return;if(!$gameParty[_0x581c86(0x306)](_0x106f6c))return;const _0x4acb59=this['itemLineRect'](_0x5a2edb),_0x2ed1e2=_0x4acb59['x'],_0x114cef=_0x4acb59['y']+(this[_0x581c86(0x28d)]()-ImageManager[_0x581c86(0x1ca)])/0x2,_0x355827=VisuMZ[_0x581c86(0x3ae)][_0x581c86(0x2d6)][_0x581c86(0x1d7)][_0x581c86(0x45f)],_0x4ed622=VisuMZ[_0x581c86(0x3ae)][_0x581c86(0x2d6)][_0x581c86(0x1d7)][_0x581c86(0x48e)];this[_0x581c86(0x3a9)](_0x106f6c,_0x2ed1e2+_0x355827,_0x114cef+_0x4ed622);},Window_ItemList[_0x108103(0x2ab)]['setStatusWindow']=function(_0x28b89a){const _0x1f15dd=_0x108103;this[_0x1f15dd(0x47f)]=_0x28b89a,this[_0x1f15dd(0x169)]();},VisuMZ[_0x108103(0x3ae)][_0x108103(0x2b1)]=Window_ItemList['prototype'][_0x108103(0x473)],Window_ItemList[_0x108103(0x2ab)][_0x108103(0x473)]=function(){const _0x4d4d7a=_0x108103;VisuMZ[_0x4d4d7a(0x3ae)][_0x4d4d7a(0x2b1)][_0x4d4d7a(0x174)](this),this[_0x4d4d7a(0x47f)]&&this[_0x4d4d7a(0x47f)][_0x4d4d7a(0x5d9)]===Window_ShopStatus&&this['_statusWindow'][_0x4d4d7a(0x4c4)](this[_0x4d4d7a(0x25e)]());},Window_BattleItem['prototype'][_0x108103(0x223)]=function(_0x4b1438){const _0x4eda37=_0x108103;return BattleManager['actor']()?BattleManager[_0x4eda37(0x2b4)]()[_0x4eda37(0x3b2)](_0x4b1438):Window_ItemList[_0x4eda37(0x2ab)][_0x4eda37(0x223)][_0x4eda37(0x174)](this,_0x4b1438);},Window_EventItem[_0x108103(0x2ab)]['isShowNew']=function(){return![];},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x398)]=function(){const _0x4001bc=_0x108103;return VisuMZ[_0x4001bc(0x3ae)][_0x4001bc(0x2d6)]['EquipScene'][_0x4001bc(0x353)];},VisuMZ['ItemsEquipsCore'][_0x108103(0x4de)]=Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x3f4)],Window_EquipStatus['prototype'][_0x108103(0x3f4)]=function(){const _0x34dbbe=_0x108103;this[_0x34dbbe(0x323)](),this[_0x34dbbe(0x1e5)]();if(this[_0x34dbbe(0x422)])this[_0x34dbbe(0x422)][_0x34dbbe(0x3f4)]();this[_0x34dbbe(0x398)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x34dbbe(0x3ae)][_0x34dbbe(0x4de)][_0x34dbbe(0x174)](this);},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x2cc)]=function(){const _0x2f124d=_0x108103;this['contents'][_0x2f124d(0x53d)]();if(!this[_0x2f124d(0x422)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){if(_0x2f124d(0x37e)!==_0x2f124d(0x37e))return _0x3ee6d4[_0x2f124d(0x1eb)][_0x2f124d(0x423)](_0x29d30b(_0x10bbeb['$1']));else{const _0x5a6145=ImageManager['loadPicture'](this[_0x2f124d(0x422)][_0x2f124d(0x29a)]());_0x5a6145[_0x2f124d(0x12c)](this[_0x2f124d(0x5c1)]['bind'](this));}}else this[_0x2f124d(0x161)]();},Window_EquipStatus['prototype']['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x439ee1=_0x108103;return Imported[_0x439ee1(0x374)]&&this[_0x439ee1(0x422)][_0x439ee1(0x29a)]()!==''&&VisuMZ[_0x439ee1(0x3ae)][_0x439ee1(0x2d6)][_0x439ee1(0x46b)]['MenuPortraits'];},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x5c1)]=function(){const _0x985686=_0x108103;VisuMZ['ItemsEquipsCore'][_0x985686(0x2d6)][_0x985686(0x46b)][_0x985686(0x177)][_0x985686(0x174)](this),this[_0x985686(0x3e7)]();},Window_EquipStatus[_0x108103(0x2ab)]['refreshItemsEquipsCoreNoMenuImage']=function(){const _0x304283=_0x108103;VisuMZ[_0x304283(0x3ae)][_0x304283(0x2d6)][_0x304283(0x46b)][_0x304283(0x1ab)][_0x304283(0x174)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x3e7)]=function(){const _0x5a21d6=_0x108103;this[_0x5a21d6(0x1e5)](),VisuMZ[_0x5a21d6(0x3ae)][_0x5a21d6(0x2d6)]['EquipScene'][_0x5a21d6(0x4c7)][_0x5a21d6(0x174)](this);},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x586)]=function(_0x5d0756,_0x2daa0c,_0x11872c,_0x30d9cc,_0x1905c6){const _0x14ec50=_0x108103,_0x4712e8=ImageManager[_0x14ec50(0x4e7)](_0x5d0756[_0x14ec50(0x29a)]()),_0x59c558=this[_0x14ec50(0x24a)]-_0x4712e8[_0x14ec50(0x2f7)];_0x2daa0c+=_0x59c558/0x2;if(_0x59c558<0x0)_0x30d9cc-=_0x59c558;Window_StatusBase[_0x14ec50(0x2ab)][_0x14ec50(0x586)][_0x14ec50(0x174)](this,_0x5d0756,_0x2daa0c,_0x11872c,_0x30d9cc,_0x1905c6);},Window_EquipStatus[_0x108103(0x2ab)]['actorParams']=function(){const _0x328656=_0x108103;if(Imported['VisuMZ_0_CoreEngine']){if('ecgMD'===_0x328656(0x2dd)){if(_0x37b6f3[_0x328656(0x4b4)]()!==_0x2441b6[_0x328656(0x4b4)])for(const _0x24ebd4 of _0x1fa98f[_0x328656(0x517)]){if(_0x24ebd4)_0x24ebd4[_0x328656(0x27e)]();}}else return VisuMZ[_0x328656(0x3e4)][_0x328656(0x2d6)][_0x328656(0x1af)]['ExtDisplayedParams'];}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x246)]=function(){const _0x5766e4=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x5766e4(0x2d6)][_0x5766e4(0x46b)][_0x5766e4(0x475)];},Window_EquipStatus[_0x108103(0x2ab)]['isUseParamNamesWithIcons']=function(){const _0x3a002e=_0x108103;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x3a002e(0x3e4)]['Settings'][_0x3a002e(0x1af)][_0x3a002e(0x1cd)];},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x447)]=function(_0x501f42,_0x2b9950,_0x1817a5,_0x40f2f2){const _0x1236b6=_0x108103,_0x440ebf=this[_0x1236b6(0x42e)]();if(Imported[_0x1236b6(0x34f)])_0x1236b6(0x1ec)===_0x1236b6(0x4f8)?_0x4e5639=this[_0x1236b6(0x422)]['param'](_0x82c7e4):this[_0x1236b6(0x1e1)](_0x2b9950+_0x440ebf,_0x1817a5,_0x40f2f2,_0x501f42,![]);else{if('Cqhzd'!==_0x1236b6(0x404))this[_0x1236b6(0x3bf)](TextManager[_0x1236b6(0x516)](_0x501f42),_0x2b9950+_0x440ebf,_0x1817a5,_0x40f2f2);else return this[_0x1236b6(0x28e)]();}},Window_EquipStatus[_0x108103(0x2ab)]['drawUpdatedBeforeParamValue']=function(_0x1630ce,_0x26d8c4,_0x58a302,_0x2a5022){const _0x1362df=_0x108103,_0x42bcf5=this[_0x1362df(0x42e)]();let _0x57d2a0=0x0;if(Imported[_0x1362df(0x34f)]){if(_0x1362df(0x4ce)===_0x1362df(0x32f)){this[_0x1362df(0x5ac)]=!![];const _0x59532c=_0x1242e9[_0x1362df(0x3ae)][_0x1362df(0x2b7)][_0x1362df(0x174)](this);return this[_0x1362df(0x5ac)]=_0x50a8d5,_0x59532c;}else _0x57d2a0=this['_actor'][_0x1362df(0x490)](_0x1630ce,!![]);}else _0x1362df(0x511)!==_0x1362df(0x243)?_0x57d2a0=this[_0x1362df(0x422)][_0x1362df(0x516)](_0x1630ce):(_0x2505ed[_0x1362df(0x3ae)][_0x1362df(0x4d6)]['call'](this),this[_0x1362df(0x398)]()&&this[_0x1362df(0x546)]());const _0xee9cc2=_0x57d2a0;this['drawText'](_0x57d2a0,_0x26d8c4,_0x58a302,_0x2a5022-_0x42bcf5,'right');},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x40d)]=function(_0x408b3c,_0x2da4c1,_0x304fcf,_0x4abd63){const _0x24d24f=_0x108103,_0x571133=this[_0x24d24f(0x42e)]();let _0x5f2d3a=0x0,_0x307186=0x0,_0x54db98='';if(this['_tempActor']){if(_0x24d24f(0x149)!==_0x24d24f(0x149))return this[_0x24d24f(0x398)]()?this[_0x24d24f(0x3f5)]():_0x572a09['ItemsEquipsCore']['Scene_Shop_categoryWindowRect'][_0x24d24f(0x174)](this);else{if(Imported[_0x24d24f(0x34f)])_0x24d24f(0x30d)!==_0x24d24f(0x2e7)?(_0x5f2d3a=this[_0x24d24f(0x422)]['paramValueByName'](_0x408b3c,![]),_0x307186=this['_tempActor'][_0x24d24f(0x490)](_0x408b3c,![]),_0x54db98=this[_0x24d24f(0x3f1)][_0x24d24f(0x490)](_0x408b3c,!![])):_0x3679aa=_0x24d24f(0x3e1)['format'](_0x2d8d87['id']);else{if('zXxqw'===_0x24d24f(0x51b))_0x5f2d3a=this[_0x24d24f(0x422)][_0x24d24f(0x516)](_0x408b3c),_0x307186=this[_0x24d24f(0x3f1)][_0x24d24f(0x516)](_0x408b3c),_0x54db98=this[_0x24d24f(0x3f1)][_0x24d24f(0x516)](_0x408b3c);else{if(this['_item'][_0x24d24f(0x412)][_0x24d24f(0x1a3)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x20221e=_0x354736(_0x5a6d4d['$1'])[_0x24d24f(0x5be)](/[\r\n]+/);for(const _0x1ef34a of _0x20221e){if(_0x1ef34a[_0x24d24f(0x1a3)](/(.*):[ ](.*)/i)){const _0x3cd0cc=_0x5a6413(_0x3c7ee1['$1'])['trim'](),_0x1a2e61=_0x43dbf8(_0x34be45['$2'])[_0x24d24f(0x425)]();this[_0x24d24f(0x265)](_0x3cd0cc,_0x1a2e61,_0x331fa9,_0x1213f8,_0x469733),_0x5bbfac+=this[_0x24d24f(0x28d)]();}}}return this[_0x24d24f(0x1e5)](),_0xe3fb36;}}const _0x4f7451=_0x5f2d3a,_0x142a2f=_0x307186;diffValue=_0x142a2f-_0x4f7451,this['changeTextColor'](ColorManager[_0x24d24f(0x2bf)](diffValue)),this[_0x24d24f(0x3bf)](_0x54db98,_0x2da4c1,_0x304fcf,_0x4abd63-_0x571133,'right');}}},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x4ac)]=function(_0x20297a,_0x36fca3,_0x41b3ec,_0x3f7ea5){const _0x398ba2=_0x108103,_0x1e06c9=this['itemPadding']();let _0x523887=0x0,_0x5621b7=0x0,_0x23bbbf=![];if(this[_0x398ba2(0x3f1)]){if(Imported[_0x398ba2(0x34f)]){if(_0x398ba2(0x3f3)==='mJVBs'){const _0x188493=_0x398ba2(0x557);if(this['_itemData']['gainTP']<=0x0&&!this['_customItemInfo'][_0x188493])return![];const _0xce38b9=this[_0x398ba2(0x1a8)]();this[_0x398ba2(0x503)](_0xce38b9,_0x9e21cf,_0x353a16,_0x1d855f,!![]);const _0x206c04=this['getItemEffectsTpRecoveryText']();return this[_0x398ba2(0x2f2)](_0x71b04e[_0x398ba2(0x23b)]()),this[_0x398ba2(0x503)](_0x206c04,_0x13bae3,_0x5030fe,_0x38f651,![],_0x398ba2(0x170)),this[_0x398ba2(0x221)](_0x52209e,_0x59627f,_0x3ebbf2),this[_0x398ba2(0x1e5)](),!![];}else _0x523887=this[_0x398ba2(0x422)][_0x398ba2(0x490)](_0x20297a,![]),_0x5621b7=this[_0x398ba2(0x3f1)][_0x398ba2(0x490)](_0x20297a,![]),_0x23bbbf=String(this[_0x398ba2(0x422)][_0x398ba2(0x490)](_0x20297a,!![]))[_0x398ba2(0x1a3)](/([%％])/i);}else _0x523887=this[_0x398ba2(0x422)][_0x398ba2(0x516)](_0x20297a),_0x5621b7=this[_0x398ba2(0x3f1)][_0x398ba2(0x516)](_0x20297a),_0x23bbbf=_0x523887%0x1!==0x0||_0x5621b7%0x1!==0x0;const _0x55d3c9=_0x523887,_0x23322b=_0x5621b7,_0x5c4500=_0x23322b-_0x55d3c9;let _0x145e72=_0x5c4500;if(_0x23bbbf)_0x145e72=Math[_0x398ba2(0x3b5)](_0x5c4500*0x64)+'%';_0x5c4500!==0x0&&(this['changeTextColor'](ColorManager[_0x398ba2(0x2bf)](_0x5c4500)),_0x145e72=(_0x5c4500>0x0?_0x398ba2(0x427):_0x398ba2(0x267))[_0x398ba2(0x423)](_0x145e72),this[_0x398ba2(0x3bf)](_0x145e72,_0x36fca3+_0x1e06c9,_0x41b3ec,_0x3f7ea5,_0x398ba2(0x49b)));}},Window_EquipStatus[_0x108103(0x2ab)][_0x108103(0x221)]=function(_0x5a52ac,_0x1387e2,_0xe80beb,_0x2c65b7,_0x551f77){const _0x9db155=_0x108103;if(VisuMZ['ItemsEquipsCore'][_0x9db155(0x2d6)][_0x9db155(0x46b)][_0x9db155(0x1e2)]===![])return;_0x551f77=Math[_0x9db155(0x317)](_0x551f77||0x1,0x1);while(_0x551f77--){_0x2c65b7=_0x2c65b7||this[_0x9db155(0x28d)](),this[_0x9db155(0x1e8)][_0x9db155(0x259)]=0xa0;const _0x5bde75=ColorManager['getItemsEquipsCoreBackColor2']();this[_0x9db155(0x1e8)][_0x9db155(0x372)](_0x5a52ac+0x1,_0x1387e2+0x1,_0xe80beb-0x2,_0x2c65b7-0x2,_0x5bde75),this[_0x9db155(0x1e8)][_0x9db155(0x259)]=0xff;}},ColorManager[_0x108103(0x457)]=function(){const _0x5eef3b=_0x108103,_0x1b6408=VisuMZ[_0x5eef3b(0x3ae)]['Settings'][_0x5eef3b(0x46b)];let _0x342e98=_0x1b6408[_0x5eef3b(0x389)]!==undefined?_0x1b6408['BackRectColor']:0x13;return ColorManager[_0x5eef3b(0x35b)](_0x342e98);},VisuMZ['ItemsEquipsCore'][_0x108103(0x48f)]=Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x1cb)],Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x1cb)]=function(_0x4e1998){const _0x578801=_0x108103;VisuMZ['ItemsEquipsCore'][_0x578801(0x48f)][_0x578801(0x174)](this,_0x4e1998),this[_0x578801(0x495)](_0x4e1998);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x495)]=function(_0x174ee6){const _0x32da27=_0x108103,_0x2c96a1=new Rectangle(0x0,0x0,_0x174ee6['width'],_0x174ee6['height']);this[_0x32da27(0x301)]=new Window_Base(_0x2c96a1),this[_0x32da27(0x301)][_0x32da27(0x3ec)]=0x0,this[_0x32da27(0x2c5)](this[_0x32da27(0x301)]),this['updateCommandNameWindow']();},Window_EquipCommand['prototype'][_0x108103(0x169)]=function(){const _0x1f88f3=_0x108103;Window_HorzCommand['prototype'][_0x1f88f3(0x169)][_0x1f88f3(0x174)](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_EquipCommand['prototype']['updateCommandNameWindow']=function(){const _0x397722=_0x108103,_0x3ecc10=this['_commandNameWindow'];_0x3ecc10[_0x397722(0x1e8)]['clear']();const _0x5f1002=this[_0x397722(0x31c)](this[_0x397722(0x324)]());if(_0x5f1002==='icon'){if('SBbOK'!==_0x397722(0x1c8)){const _0x52dffb=this[_0x397722(0x224)](this[_0x397722(0x324)]());let _0x123ac3=this[_0x397722(0x26e)](this['index']());_0x123ac3=_0x123ac3['replace'](/\\I\[(\d+)\]/gi,''),_0x3ecc10['resetFontSettings'](),this[_0x397722(0x399)](_0x123ac3,_0x52dffb),this[_0x397722(0x384)](_0x123ac3,_0x52dffb),this[_0x397722(0x1c1)](_0x123ac3,_0x52dffb);}else{const _0x164a9f='MP\x20DAMAGE';if(this[_0x397722(0x158)]['rateMP']>=0x0&&this[_0x397722(0x158)]['flatMP']>=0x0&&!this[_0x397722(0x42c)][_0x164a9f])return![];const _0x7a16e9=this[_0x397722(0x524)]();this[_0x397722(0x503)](_0x7a16e9,_0x29799b,_0x320066,_0x4c07ac,!![]);const _0x4132fc=this[_0x397722(0x476)]();return this[_0x397722(0x2f2)](_0x445fbf[_0x397722(0x4d3)](0x2)),this[_0x397722(0x503)](_0x4132fc,_0xb78174,_0x33e40d,_0xda5a64,![],_0x397722(0x170)),this[_0x397722(0x221)](_0x148b3a,_0x285723,_0x4ef6e8),this['resetFontSettings'](),!![];}}},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x399)]=function(_0x20088c,_0x5a40b0){},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x384)]=function(_0x52df84,_0x5bf218){const _0x52123c=_0x108103,_0x68542c=this['_commandNameWindow'];_0x68542c['drawText'](_0x52df84,0x0,_0x5bf218['y'],_0x68542c['innerWidth'],_0x52123c(0x565));},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x1c1)]=function(_0x4c3621,_0x5d0979){const _0x2ed158=_0x108103,_0x553324=this[_0x2ed158(0x301)],_0x21b89a=$gameSystem['windowPadding'](),_0x21c4a9=_0x5d0979['x']+Math[_0x2ed158(0x1b8)](_0x5d0979[_0x2ed158(0x2f7)]/0x2)+_0x21b89a;_0x553324['x']=_0x553324[_0x2ed158(0x2f7)]/-0x2+_0x21c4a9,_0x553324['y']=Math[_0x2ed158(0x1b8)](_0x5d0979['height']/0x2);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x45a)]=function(){const _0x5f35bf=_0x108103;return Imported[_0x5f35bf(0x34f)]&&Window_HorzCommand[_0x5f35bf(0x2ab)]['isUseModernControls'][_0x5f35bf(0x174)](this);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x52a)]=function(){const _0x26d4c5=_0x108103;if(this['currentSymbol']()===_0x26d4c5(0x54d))Window_HorzCommand[_0x26d4c5(0x2ab)][_0x26d4c5(0x52a)]['call'](this);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x2cd)]=function(){const _0x51016c=_0x108103;!this[_0x51016c(0x531)]()&&Window_HorzCommand[_0x51016c(0x2ab)]['processCursorMoveModernControls'][_0x51016c(0x174)](this);},Window_EquipCommand[_0x108103(0x2ab)]['processCursorSpecialCheckModernControls']=function(){const _0x55a010=_0x108103;if(!this[_0x55a010(0x26a)]())return![];if(SceneManager[_0x55a010(0x3f2)]['constructor']!==Scene_Equip)return![];return Input[_0x55a010(0x23a)](_0x55a010(0x31d))&&(_0x55a010(0x1b4)===_0x55a010(0x1b4)?(this[_0x55a010(0x477)](),SceneManager[_0x55a010(0x3f2)][_0x55a010(0x564)](),SceneManager[_0x55a010(0x3f2)][_0x55a010(0x3b7)][_0x55a010(0x37b)](-0x1)):_0x52fca2+=_0x55a010(0x1bd)[_0x55a010(0x423)](this[_0x55a010(0x158)][_0x55a010(0x440)])),![];},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x2c7)]=function(){const _0xe3fa16=_0x108103;return this['_list']?this['_list'][_0xe3fa16(0x468)]:0x3;},Window_EquipCommand['prototype'][_0x108103(0x42f)]=function(){const _0x5c3d69=_0x108103;if(this[_0x5c3d69(0x38f)]()&&this[_0x5c3d69(0x541)]&&SceneManager[_0x5c3d69(0x3f2)][_0x5c3d69(0x5d9)]===Scene_Equip){if(this[_0x5c3d69(0x32a)]()&&TouchInput[_0x5c3d69(0x318)]())this['onTouchSelectModernControls'](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x5c3d69(0x146)]()){if(_0x5c3d69(0x213)!=='ApuNQ'){const _0x72f2e5=this[_0x5c3d69(0x301)];_0x72f2e5[_0x5c3d69(0x1e8)][_0x5c3d69(0x53d)]();const _0x16644e=this[_0x5c3d69(0x31c)](this[_0x5c3d69(0x324)]());if(_0x16644e===_0x5c3d69(0x1d2)){const _0x405cde=this['itemLineRect'](this['index']());let _0x250eca=this[_0x5c3d69(0x26e)](this[_0x5c3d69(0x324)]());_0x250eca=_0x250eca[_0x5c3d69(0x2ca)](/\\I\[(\d+)\]/gi,''),_0x72f2e5[_0x5c3d69(0x1e5)](),this[_0x5c3d69(0x399)](_0x250eca,_0x405cde),this[_0x5c3d69(0x384)](_0x250eca,_0x405cde),this[_0x5c3d69(0x1c1)](_0x250eca,_0x405cde);}}else this[_0x5c3d69(0x4ad)]();}}},Window_EquipCommand['prototype'][_0x108103(0x500)]=function(_0x104bf7){const _0x26b1ee=_0x108103;this[_0x26b1ee(0x334)]=![];const _0x19944b=this[_0x26b1ee(0x324)](),_0x4bf70e=this[_0x26b1ee(0x135)](),_0x1b81d1=SceneManager[_0x26b1ee(0x3f2)][_0x26b1ee(0x3b7)];if(_0x1b81d1[_0x26b1ee(0x38f)]()&&_0x1b81d1[_0x26b1ee(0x541)]){if(_0x4bf70e>=0x0)_0x26b1ee(0x319)===_0x26b1ee(0x22e)?(this[_0x26b1ee(0x2ad)](),_0x3ad1d3['ItemsEquipsCore'][_0x26b1ee(0x41a)][_0x26b1ee(0x174)](this,_0x155b6b)):(_0x4bf70e===this[_0x26b1ee(0x324)]()&&(this['_doubleTouch']=!![]),this[_0x26b1ee(0x523)](),this[_0x26b1ee(0x131)](_0x4bf70e));else _0x1b81d1[_0x26b1ee(0x135)]()>=0x0&&(this[_0x26b1ee(0x518)](),this['deselect']());}_0x104bf7&&this['index']()!==_0x19944b&&this[_0x26b1ee(0x477)]();},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x3c8)]=function(){const _0x2831f9=_0x108103;this[_0x2831f9(0x435)](),this[_0x2831f9(0x3d0)](),this[_0x2831f9(0x5bd)]();},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x3f4)]=function(){const _0x21202a=_0x108103;Window_HorzCommand[_0x21202a(0x2ab)]['refresh'][_0x21202a(0x174)](this),this[_0x21202a(0x488)]();},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x435)]=function(){const _0x2cc752=_0x108103;if(!this['isEquipCommandAdded']())return;const _0x26ab29=this[_0x2cc752(0x55e)](),_0x5834f5=VisuMZ['ItemsEquipsCore'][_0x2cc752(0x2d6)][_0x2cc752(0x46b)]['CmdIconEquip'],_0x1b28e8=_0x26ab29===_0x2cc752(0x50f)?TextManager['equip2']:_0x2cc752(0x2be)['format'](_0x5834f5,TextManager['equip2']),_0x539b09=this[_0x2cc752(0x15c)]();this[_0x2cc752(0x520)](_0x1b28e8,_0x2cc752(0x54d),_0x539b09);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x33c)]=function(){const _0x2bc1b1=_0x108103;return!this[_0x2bc1b1(0x45a)]();},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x15c)]=function(){return!![];},Window_EquipCommand['prototype'][_0x108103(0x3d0)]=function(){const _0x91a1f2=_0x108103;if(!this['isOptimizeCommandAdded']())return;const _0x2f77bf=this[_0x91a1f2(0x55e)](),_0x688162=VisuMZ[_0x91a1f2(0x3ae)][_0x91a1f2(0x2d6)][_0x91a1f2(0x46b)][_0x91a1f2(0x39f)],_0x5877d2=_0x2f77bf===_0x91a1f2(0x50f)?TextManager[_0x91a1f2(0x2ee)]:_0x91a1f2(0x2be)[_0x91a1f2(0x423)](_0x688162,TextManager['optimize']),_0x292889=this[_0x91a1f2(0x2ec)]();this[_0x91a1f2(0x520)](_0x5877d2,_0x91a1f2(0x2ee),_0x292889);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x4f5)]=function(){const _0x4f17df=_0x108103;return VisuMZ[_0x4f17df(0x3ae)][_0x4f17df(0x2d6)][_0x4f17df(0x46b)][_0x4f17df(0x2ea)];},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x2ec)]=function(){return!![];},Window_EquipCommand['prototype'][_0x108103(0x5bd)]=function(){const _0x4edc6d=_0x108103;if(!this[_0x4edc6d(0x15a)]())return;const _0x4fc389=this['commandStyle'](),_0x11154d=VisuMZ[_0x4edc6d(0x3ae)][_0x4edc6d(0x2d6)][_0x4edc6d(0x46b)][_0x4edc6d(0x50a)],_0x269eba=_0x4fc389==='text'?TextManager[_0x4edc6d(0x53d)]:_0x4edc6d(0x2be)[_0x4edc6d(0x423)](_0x11154d,TextManager[_0x4edc6d(0x53d)]),_0x26b273=this['isClearCommandEnabled']();this[_0x4edc6d(0x520)](_0x269eba,_0x4edc6d(0x53d),_0x26b273);},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x15a)]=function(){const _0x5f30b=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x5f30b(0x2d6)][_0x5f30b(0x46b)][_0x5f30b(0x275)];},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x1fc)]=function(){return!![];},Window_EquipCommand['prototype'][_0x108103(0x403)]=function(){const _0x373346=_0x108103;return VisuMZ['ItemsEquipsCore']['Settings'][_0x373346(0x46b)][_0x373346(0x209)];},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x29c)]=function(_0x4f5523){const _0x1d6913=_0x108103,_0x49d5f5=this[_0x1d6913(0x31c)](_0x4f5523);if(_0x49d5f5===_0x1d6913(0x269))this['drawItemStyleIconText'](_0x4f5523);else{if(_0x49d5f5===_0x1d6913(0x1d2)){if(_0x1d6913(0x4f0)!==_0x1d6913(0x4f0)){const _0x1c2d18=this['getNextAvailableEtypeId'](_0x20a1de);if(_0x1c2d18<0x0)return;const _0x32a685=_0x4c1b0d===0x1?_0x5117d6[_0x5205ef]:_0x57a7ab[_0x49d4bf];this[_0x1d6913(0x492)](_0x1c2d18,_0x32a685);}else this[_0x1d6913(0x40e)](_0x4f5523);}else Window_HorzCommand[_0x1d6913(0x2ab)]['drawItem'][_0x1d6913(0x174)](this,_0x4f5523);}},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x55e)]=function(){const _0x2d739c=_0x108103;return VisuMZ[_0x2d739c(0x3ae)][_0x2d739c(0x2d6)]['EquipScene'][_0x2d739c(0x192)];},Window_EquipCommand['prototype'][_0x108103(0x31c)]=function(_0x1390fe){const _0x5eab42=_0x108103;if(_0x1390fe<0x0)return _0x5eab42(0x50f);const _0x187bf0=this[_0x5eab42(0x55e)]();if(_0x187bf0!==_0x5eab42(0x4b7))return _0x187bf0;else{if(this[_0x5eab42(0x519)]()>0x0){if(_0x5eab42(0x1a9)!==_0x5eab42(0x255)){const _0x2db7ec=this[_0x5eab42(0x26e)](_0x1390fe);if(_0x2db7ec[_0x5eab42(0x1a3)](/\\I\[(\d+)\]/i)){const _0x6a2c35=this[_0x5eab42(0x224)](_0x1390fe),_0x117273=this[_0x5eab42(0x414)](_0x2db7ec)[_0x5eab42(0x2f7)];return _0x117273<=_0x6a2c35[_0x5eab42(0x2f7)]?_0x5eab42(0x269):'icon';}}else{const _0x133d01='TP\x20RECOVERY';if(this['_customItemInfo'][_0x133d01])return this[_0x5eab42(0x42c)][_0x133d01];let _0xfb6f93='';return _0xfb6f93+=_0x5eab42(0x1bd)['format'](this[_0x5eab42(0x158)][_0x5eab42(0x3f0)]),_0xfb6f93;}}}return'text';},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x3b8)]=function(_0x2df539){const _0x3360ea=_0x108103,_0xf980e3=this['itemLineRect'](_0x2df539),_0x7b7de1=this[_0x3360ea(0x26e)](_0x2df539),_0x1ca831=this[_0x3360ea(0x414)](_0x7b7de1)[_0x3360ea(0x2f7)];this['changePaintOpacity'](this[_0x3360ea(0x49d)](_0x2df539));const _0x531d3f=this['itemTextAlign']();if(_0x531d3f===_0x3360ea(0x170))this[_0x3360ea(0x3ff)](_0x7b7de1,_0xf980e3['x']+_0xf980e3[_0x3360ea(0x2f7)]-_0x1ca831,_0xf980e3['y'],_0x1ca831);else{if(_0x531d3f==='center'){const _0x185678=_0xf980e3['x']+Math[_0x3360ea(0x1b8)]((_0xf980e3[_0x3360ea(0x2f7)]-_0x1ca831)/0x2);this['drawTextEx'](_0x7b7de1,_0x185678,_0xf980e3['y'],_0x1ca831);}else this['drawTextEx'](_0x7b7de1,_0xf980e3['x'],_0xf980e3['y'],_0x1ca831);}},Window_EquipCommand[_0x108103(0x2ab)][_0x108103(0x40e)]=function(_0x1412f8){const _0x4d141c=_0x108103;this['commandName'](_0x1412f8)[_0x4d141c(0x1a3)](/\\I\[(\d+)\]/i);const _0x491759=Number(RegExp['$1'])||0x0,_0x3cf31e=this[_0x4d141c(0x224)](_0x1412f8),_0x3a893c=_0x3cf31e['x']+Math[_0x4d141c(0x1b8)]((_0x3cf31e['width']-ImageManager['iconWidth'])/0x2),_0x4d50c2=_0x3cf31e['y']+(_0x3cf31e[_0x4d141c(0x157)]-ImageManager['iconHeight'])/0x2;this[_0x4d141c(0x577)](_0x491759,_0x3a893c,_0x4d50c2);},Window_EquipSlot[_0x108103(0x2ab)]['isUseModernControls']=function(){const _0x4a2b28=_0x108103;return Imported[_0x4a2b28(0x34f)]&&Window_HorzCommand[_0x4a2b28(0x2ab)][_0x4a2b28(0x45a)]['call'](this);},Window_EquipSlot['prototype'][_0x108103(0x523)]=function(){const _0xec417e=_0x108103;Window_StatusBase[_0xec417e(0x2ab)][_0xec417e(0x523)][_0xec417e(0x174)](this),this['callUpdateHelp']();},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x395)]=function(){const _0x4a0929=_0x108103;Window_StatusBase[_0x4a0929(0x2ab)][_0x4a0929(0x395)][_0x4a0929(0x174)](this),this[_0x4a0929(0x431)]();},Window_EquipSlot[_0x108103(0x2ab)]['checkShiftRemoveShortcut']=function(){const _0x235caa=_0x108103;if(!this[_0x235caa(0x17f)]())return;if(Input[_0x235caa(0x23a)](_0x235caa(0x3e5))&&this[_0x235caa(0x25e)]()){const _0x551a3c=SceneManager[_0x235caa(0x3f2)][_0x235caa(0x422)];if(_0x551a3c){if('EYFxl'===_0x235caa(0x54c)){if(this['canShiftRemoveEquipment'](this[_0x235caa(0x324)]())){if(_0x235caa(0x307)==='EqrsH')this[_0x235caa(0x2df)](),this[_0x235caa(0x473)]();else return _0x235caa(0x1d2);}else this['playBuzzerSound']();}else return this[_0x235caa(0x3f5)]();}}},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x53a)]=function(_0x294bdb){const _0x1561ac=_0x108103,_0x3b2788=SceneManager[_0x1561ac(0x3f2)][_0x1561ac(0x422)];if(!_0x3b2788)return;if(!_0x3b2788[_0x1561ac(0x310)](this[_0x1561ac(0x324)]())){if('fkPZE'===_0x1561ac(0x2d2))return![];else{const _0x2e4fee=_0x388c91+_0x46ee84+_0x82411f*_0x59ac5d;this[_0x1561ac(0x221)](_0x2e4fee,_0x15cfad,_0x3cad87,_0x4d0377-_0x551233);}}const _0x5a6eb6=_0x3b2788[_0x1561ac(0x4fd)]()[this[_0x1561ac(0x324)]()];if(_0x3b2788[_0x1561ac(0x40c)]()[_0x1561ac(0x4ff)](_0x5a6eb6)){if('MEkCi'===_0x1561ac(0x478))return![];else _0x49a6e2[_0x1561ac(0x3ae)][_0x1561ac(0x339)][_0x1561ac(0x174)](this),this[_0x1561ac(0x45a)]()&&(this[_0x1561ac(0x59c)][_0x1561ac(0x518)](),this[_0x1561ac(0x59c)][_0x1561ac(0x371)](),this[_0x1561ac(0x3b7)][_0x1561ac(0x37b)](0x0),this[_0x1561ac(0x3b7)]['activate']());}return!![];;},Window_EquipSlot['prototype'][_0x108103(0x2df)]=function(){const _0x20681a=_0x108103;SoundManager[_0x20681a(0x55f)]();const _0x327744=SceneManager[_0x20681a(0x3f2)][_0x20681a(0x422)];_0x327744[_0x20681a(0x492)](this[_0x20681a(0x324)](),null),this['refresh'](),this[_0x20681a(0x58b)][_0x20681a(0x3f4)](),this[_0x20681a(0x169)]();const _0x9dfd4c=SceneManager[_0x20681a(0x3f2)]['_statusWindow'];if(_0x9dfd4c)_0x9dfd4c[_0x20681a(0x3f4)]();},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x17f)]=function(){const _0xf42d3e=_0x108103;if(!this[_0xf42d3e(0x462)])return![];if(!VisuMZ[_0xf42d3e(0x3ae)]['Settings'][_0xf42d3e(0x46b)][_0xf42d3e(0x4c6)])return![];return!![];},Window_EquipSlot[_0x108103(0x2ab)]['processCursorMoveModernControls']=function(){const _0xa64303=_0x108103;if(!this['processCursorSpecialCheckModernControls']()){if(_0xa64303(0x3ef)!=='mSKxB'){_0x3fcdc5[_0xa64303(0x34f)]?(_0x146aec=this[_0xa64303(0x422)][_0xa64303(0x490)](_0x542e8b,![]),_0x5be3be=this[_0xa64303(0x3f1)][_0xa64303(0x490)](_0x247575,![]),_0xa3c3af=_0x44c45c(this[_0xa64303(0x422)][_0xa64303(0x490)](_0x30e333,!![]))[_0xa64303(0x1a3)](/([%％])/i)):(_0x5d00f4=this['_actor'][_0xa64303(0x516)](_0x28842a),_0x3d6c30=this[_0xa64303(0x3f1)]['param'](_0x4c6b5d),_0x25424f=_0x2721c1%0x1!==0x0||_0x79f221%0x1!==0x0);const _0x11c600=_0x4450b1,_0x261478=_0x2db9a6,_0x3440b6=_0x261478-_0x11c600;let _0x334d34=_0x3440b6;if(_0x56ed12)_0x334d34=_0x1d7df7[_0xa64303(0x3b5)](_0x3440b6*0x64)+'%';_0x3440b6!==0x0&&(this['changeTextColor'](_0x51f2cf['paramchangeTextColor'](_0x3440b6)),_0x334d34=(_0x3440b6>0x0?_0xa64303(0x427):_0xa64303(0x267))[_0xa64303(0x423)](_0x334d34),this[_0xa64303(0x3bf)](_0x334d34,_0x4369d0+_0x44c2fc,_0x565c42,_0xb81fb1,_0xa64303(0x49b)));}else Window_StatusBase['prototype'][_0xa64303(0x2cd)][_0xa64303(0x174)](this);}},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x531)]=function(){const _0x51bb7f=_0x108103;if(!this[_0x51bb7f(0x26a)]())return![];if(SceneManager[_0x51bb7f(0x3f2)][_0x51bb7f(0x5d9)]!==Scene_Equip)return![];if(this[_0x51bb7f(0x262)]())return this['playCursorSound'](),Input[_0x51bb7f(0x53d)](),SceneManager[_0x51bb7f(0x3f2)][_0x51bb7f(0x18f)](),![];else{if(Input[_0x51bb7f(0x150)](_0x51bb7f(0x31d))){const _0x4902e7=this[_0x51bb7f(0x324)]();return Input[_0x51bb7f(0x333)](_0x51bb7f(0x3e5))?this[_0x51bb7f(0x582)]():this['cursorDown'](Input['isTriggered'](_0x51bb7f(0x31d))),this[_0x51bb7f(0x324)]()!==_0x4902e7&&this[_0x51bb7f(0x477)](),!![];}else{if(this[_0x51bb7f(0x239)]()&&Input[_0x51bb7f(0x23a)](_0x51bb7f(0x3e5)))return!![];}}return![];},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x262)]=function(){const _0xe64917=_0x108103;if(this[_0xe64917(0x324)]()!==0x0)return![];const _0x13b522=VisuMZ[_0xe64917(0x3ae)][_0xe64917(0x2d6)][_0xe64917(0x46b)];if(!_0x13b522[_0xe64917(0x2ea)]&&!_0x13b522[_0xe64917(0x275)])return![];return Input[_0xe64917(0x23a)]('up');},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x239)]=function(){const _0x2071b3=_0x108103;return VisuMZ[_0x2071b3(0x3ae)][_0x2071b3(0x2d6)]['EquipScene']['ShiftShortcutKey'];},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x42f)]=function(){const _0x594c48=_0x108103;if(this['isOpen']()&&this[_0x594c48(0x541)]&&SceneManager[_0x594c48(0x3f2)][_0x594c48(0x5d9)]===Scene_Equip){if(_0x594c48(0x496)==='jTvjf'){const _0x45eb71=this['itemAt'](_0x45f688);if(!_0x45eb71||!this[_0x594c48(0x5d7)]())return;if(!_0x4c4a19['isNewItem'](_0x45eb71))return;const _0x188590=this['itemLineRect'](_0x560926),_0x19aa20=_0x188590['x'],_0x398b95=_0x188590['y']+(this[_0x594c48(0x28d)]()-_0x2499b5[_0x594c48(0x1ca)])/0x2,_0x23555d=_0x336fc0[_0x594c48(0x3ae)]['Settings'][_0x594c48(0x1d7)][_0x594c48(0x45f)],_0x3fa170=_0x19002e[_0x594c48(0x3ae)][_0x594c48(0x2d6)][_0x594c48(0x1d7)][_0x594c48(0x48e)];this[_0x594c48(0x3a9)](_0x45eb71,_0x19aa20+_0x23555d,_0x398b95+_0x3fa170);}else{if(this[_0x594c48(0x32a)]()&&TouchInput['isHovered']())this[_0x594c48(0x500)](![]);else TouchInput[_0x594c48(0x23a)]()&&this[_0x594c48(0x500)](!![]);if(TouchInput[_0x594c48(0x146)]()){if('iMsHP'!==_0x594c48(0x354))return this[_0x594c48(0x2d7)]()[_0x594c48(0x1a3)](/LOWER/i);else this[_0x594c48(0x4ad)]();}else TouchInput[_0x594c48(0x3cb)]()&&this[_0x594c48(0x3cf)]();}}},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x500)]=function(_0xaace21){const _0x225bfd=_0x108103;this[_0x225bfd(0x334)]=![];const _0x6ff3ef=this[_0x225bfd(0x324)](),_0x284c30=this[_0x225bfd(0x135)](),_0x3648b9=SceneManager[_0x225bfd(0x3f2)][_0x225bfd(0x59c)];if(_0x3648b9[_0x225bfd(0x38f)]()&&_0x3648b9[_0x225bfd(0x541)]){if(_0x225bfd(0x30e)!==_0x225bfd(0x139)){if(_0x284c30>=0x0)_0x284c30===this[_0x225bfd(0x324)]()&&(this[_0x225bfd(0x334)]=!![]),this['activate'](),this[_0x225bfd(0x131)](_0x284c30);else _0x3648b9[_0x225bfd(0x135)]()>=0x0&&('gttLh'===_0x225bfd(0x3d1)?(this[_0x225bfd(0x518)](),this[_0x225bfd(0x371)]()):(_0x3d9b3a[_0x225bfd(0x3ae)][_0x225bfd(0x37a)][_0x225bfd(0x174)](this),this[_0x225bfd(0x58b)][_0x225bfd(0x169)]()));}else{const _0xcf717e=_0x225bfd(0x4a3);if(this[_0x225bfd(0x158)]['gainTP']>=0x0&&!this['_customItemInfo'][_0xcf717e])return![];const _0x408ff9=this[_0x225bfd(0x4b8)]();this[_0x225bfd(0x503)](_0x408ff9,_0x5f1c0c,_0x4137e4,_0x376739,!![]);const _0x5ad42d=this[_0x225bfd(0x329)]();return this[_0x225bfd(0x2f2)](_0xbb81c4[_0x225bfd(0x204)]()),this[_0x225bfd(0x503)](_0x5ad42d,_0x4893eb,_0x1f90f8,_0x36f7a6,![],_0x225bfd(0x170)),this[_0x225bfd(0x221)](_0x530c24,_0x47ac6b,_0x2934d6),this[_0x225bfd(0x1e5)](),!![];}}if(_0xaace21&&this[_0x225bfd(0x324)]()!==_0x6ff3ef){if('AaAZf'!==_0x225bfd(0x1cc))return _0x1be139['getInputMultiButtonStrings']('pageup',_0x225bfd(0x43d));else this[_0x225bfd(0x477)]();}},Window_EquipSlot[_0x108103(0x2ab)][_0x108103(0x32e)]=function(){const _0x3f7136=_0x108103;return this[_0x3f7136(0x324)]();},VisuMZ['ItemsEquipsCore'][_0x108103(0x39d)]=Window_EquipItem[_0x108103(0x2ab)]['includes'],Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x4ff)]=function(_0x4247a){const _0x38be37=_0x108103;if(_0x4247a===null&&this[_0x38be37(0x40c)]()[_0x38be37(0x4ff)](this['etypeId']()))return![];else{if(_0x38be37(0x190)!==_0x38be37(0x458))return VisuMZ['ItemsEquipsCore'][_0x38be37(0x39d)]['call'](this,_0x4247a);else{const _0x158a67=_0x3aacad['ItemsEquipsCore']['Game_Actor_equips_artifacts'][_0x38be37(0x174)](this);if(this['_allowArtifactTraitObjects']||this[_0x38be37(0x31f)]){const _0x52300f=_0x158a67[_0x38be37(0x397)](_0x5aaf4f['partyArtifacts']());return _0x52300f;}else return _0x158a67;}}},VisuMZ['ItemsEquipsCore'][_0x108103(0x484)]=Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x223)],Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x223)]=function(_0x25cf60){const _0x4e82d2=_0x108103;if(_0x25cf60&&this[_0x4e82d2(0x422)]){if(_0x4e82d2(0x366)===_0x4e82d2(0x366)){if(this['itemHasEquipLimit'](_0x25cf60))return![];if(this['isSoleWeaponType'](_0x25cf60))return![];if(this[_0x4e82d2(0x253)](_0x25cf60))return![];}else this['drawItemStyleIconText'](_0x38010c);}if(!_0x25cf60){if('xAkJo'!==_0x4e82d2(0x27d))this['cursorRight'](_0x459b3b[_0x4e82d2(0x23a)](_0x4e82d2(0x43d)));else return!this[_0x4e82d2(0x40c)]()[_0x4e82d2(0x4ff)](this[_0x4e82d2(0x1db)]());}return VisuMZ['ItemsEquipsCore'][_0x4e82d2(0x484)][_0x4e82d2(0x174)](this,_0x25cf60);},Window_EquipItem['prototype'][_0x108103(0x5a1)]=function(_0xeee42f){const _0x35ba18=_0x108103,_0x335771=_0xeee42f['note'];if(_0x335771[_0x35ba18(0x1a3)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x35ba18(0x220)!==_0x35ba18(0x220))_0x1ac387=_0x4399a4[_0x35ba18(0x3dd)][_0x2bed12(_0x7d5b19['$1'])]||'';else{const _0x1cbd8b=Number(RegExp['$1'])||0x1;let _0x11e47e=0x0;const _0x364823=this[_0x35ba18(0x422)]['equips'](),_0x183b18=SceneManager[_0x35ba18(0x3f2)]['_slotWindow'][_0x35ba18(0x32e)]();_0x364823[_0x183b18]=null;for(const _0x565bbc of _0x364823){if('VheUX'===_0x35ba18(0x3ed))return _0x37379d[_0x35ba18(0x3ae)]['Settings'][_0x35ba18(0x325)]['Speed0'];else{if(!_0x565bbc)continue;if(DataManager[_0x35ba18(0x4a4)](_0xeee42f)===DataManager['isWeapon'](_0x565bbc)){if(_0x35ba18(0x3e3)!==_0x35ba18(0x3e3))return _0x1859e0[_0x35ba18(0x3ae)][_0x35ba18(0x2d6)][_0x35ba18(0x4ee)][_0x35ba18(0x353)];else{if(_0xeee42f['id']===_0x565bbc['id'])_0x11e47e+=0x1;}}}}return _0x11e47e>=_0x1cbd8b;}}else return![];},Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x20f)]=function(_0x14b1bd){const _0x3dbbeb=_0x108103;if(!DataManager['isWeapon'](_0x14b1bd))return![];const _0x585fab=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0xf571c0=0x0;const _0x521a9f=this[_0x3dbbeb(0x422)]['equips'](),_0x2f3710=SceneManager[_0x3dbbeb(0x3f2)][_0x3dbbeb(0x3b7)]['equipSlotIndex']();_0x521a9f[_0x2f3710]=null;for(const _0x14734a of _0x521a9f){if(!_0x14734a)continue;if(!DataManager[_0x3dbbeb(0x4a4)](_0x14734a))continue;if(_0x14b1bd[_0x3dbbeb(0x23f)]===_0x14734a[_0x3dbbeb(0x23f)]){_0xf571c0+=0x1;if(_0x14b1bd[_0x3dbbeb(0x412)]['match'](_0x585fab)){const _0x21d53a=Number(RegExp['$1'])||0x1;if(_0xf571c0>=_0x21d53a)return!![];}if(_0x14734a[_0x3dbbeb(0x412)][_0x3dbbeb(0x1a3)](_0x585fab)){const _0x59b10a=Number(RegExp['$1'])||0x1;if(_0xf571c0>=_0x59b10a)return!![];}}}return![];},Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x253)]=function(_0x3f7732){const _0x2c60c8=_0x108103;if(!DataManager[_0x2c60c8(0x44b)](_0x3f7732))return![];const _0x125a2f=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x5e23df=0x0;const _0x2d9b27=this['_actor'][_0x2c60c8(0x1a2)](),_0x2256ed=SceneManager[_0x2c60c8(0x3f2)][_0x2c60c8(0x3b7)][_0x2c60c8(0x32e)]();_0x2d9b27[_0x2256ed]=null;for(const _0x43c112 of _0x2d9b27){if(!_0x43c112)continue;if(!DataManager[_0x2c60c8(0x44b)](_0x43c112))continue;if(_0x3f7732[_0x2c60c8(0x553)]===_0x43c112[_0x2c60c8(0x553)]){if(_0x2c60c8(0x182)!==_0x2c60c8(0x182))return this[_0x2c60c8(0x398)]()?this[_0x2c60c8(0x5c9)]():_0x52dd81[_0x2c60c8(0x3ae)][_0x2c60c8(0x2aa)]['call'](this);else{_0x5e23df+=0x1;if(_0x3f7732[_0x2c60c8(0x412)][_0x2c60c8(0x1a3)](_0x125a2f)){const _0x186f6e=Number(RegExp['$1'])||0x1;if(_0x5e23df>=_0x186f6e)return!![];}if(_0x43c112[_0x2c60c8(0x412)][_0x2c60c8(0x1a3)](_0x125a2f)){const _0x46c76b=Number(RegExp['$1'])||0x1;if(_0x5e23df>=_0x46c76b)return!![];}}}}return![];},Window_EquipItem['prototype'][_0x108103(0x40c)]=function(){const _0x44bb55=_0x108103;return VisuMZ[_0x44bb55(0x3ae)][_0x44bb55(0x2d6)]['EquipScene'][_0x44bb55(0x14b)];},Window_EquipItem[_0x108103(0x2ab)]['drawItem']=function(_0x1f1687){const _0x258716=_0x108103,_0x8ba4bf=this[_0x258716(0x28b)](_0x1f1687);if(_0x8ba4bf){if(_0x258716(0x25b)===_0x258716(0x25b))Window_ItemList[_0x258716(0x2ab)][_0x258716(0x29c)][_0x258716(0x174)](this,_0x1f1687);else{_0x1141cf+=_0x258716(0x277)['format'](_0x123bf5[_0x258716(0x482)]),_0xfe0c23++;if(_0x4349a5>=_0x5848a9)return _0x536541;}}else this['drawRemoveItem'](_0x1f1687);},Window_EquipItem[_0x108103(0x2ab)][_0x108103(0x2ed)]=function(_0x43ba24){const _0x2b6425=_0x108103;this[_0x2b6425(0x494)](this[_0x2b6425(0x223)](null));const _0x2415d4=VisuMZ[_0x2b6425(0x3ae)][_0x2b6425(0x2d6)][_0x2b6425(0x46b)],_0x7f8941=this['itemLineRect'](_0x43ba24),_0x11f06c=_0x7f8941['y']+(this[_0x2b6425(0x28d)]()-ImageManager['iconHeight'])/0x2,_0x3878d2=ImageManager['iconWidth']+0x4,_0x2e2f36=Math['max'](0x0,_0x7f8941[_0x2b6425(0x2f7)]-_0x3878d2);this[_0x2b6425(0x31b)](),this[_0x2b6425(0x577)](_0x2415d4[_0x2b6425(0x4ec)],_0x7f8941['x'],_0x11f06c),this['drawText'](_0x2415d4[_0x2b6425(0x335)],_0x7f8941['x']+_0x3878d2,_0x7f8941['y'],_0x2e2f36),this[_0x2b6425(0x494)](!![]);},Window_EquipItem[_0x108103(0x2ab)]['updateHelp']=function(){const _0x43258f=_0x108103;Window_ItemList[_0x43258f(0x2ab)][_0x43258f(0x473)][_0x43258f(0x174)](this);if(this[_0x43258f(0x422)]&&this[_0x43258f(0x47f)]&&this[_0x43258f(0x2db)]>=0x0){if('XCDlQ'===_0x43258f(0x3ee)){const _0x20b18a=JsonEx['makeDeepCopy'](this[_0x43258f(0x422)]);_0x20b18a[_0x43258f(0x3f1)]=!![],_0x20b18a['forceChangeEquip'](this[_0x43258f(0x2db)],this[_0x43258f(0x25e)]()),this[_0x43258f(0x47f)][_0x43258f(0x132)](_0x20b18a);}else return;}},VisuMZ['ItemsEquipsCore'][_0x108103(0x1b0)]=Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x1cb)],Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x1cb)]=function(_0x2724b7){const _0x260ba3=_0x108103;VisuMZ[_0x260ba3(0x3ae)][_0x260ba3(0x1b0)][_0x260ba3(0x174)](this,_0x2724b7),this[_0x260ba3(0x495)](_0x2724b7);},Window_ShopCommand['prototype'][_0x108103(0x495)]=function(_0x26581e){const _0x285c05=_0x108103,_0x3e2df2=new Rectangle(0x0,0x0,_0x26581e[_0x285c05(0x2f7)],_0x26581e[_0x285c05(0x157)]);this['_commandNameWindow']=new Window_Base(_0x3e2df2),this[_0x285c05(0x301)]['opacity']=0x0,this[_0x285c05(0x2c5)](this['_commandNameWindow']),this[_0x285c05(0x351)]();},Window_ShopCommand['prototype'][_0x108103(0x169)]=function(){const _0x5ce0ac=_0x108103;Window_HorzCommand[_0x5ce0ac(0x2ab)][_0x5ce0ac(0x169)]['call'](this);if(this[_0x5ce0ac(0x301)])this['updateCommandNameWindow']();},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x351)]=function(){const _0x547ec7=_0x108103,_0x5464d9=this['_commandNameWindow'];_0x5464d9[_0x547ec7(0x1e8)][_0x547ec7(0x53d)]();const _0x3f3dc6=this[_0x547ec7(0x31c)](this[_0x547ec7(0x324)]());if(_0x3f3dc6===_0x547ec7(0x1d2)){if(_0x547ec7(0x15e)!==_0x547ec7(0x1e9)){const _0x547d95=this[_0x547ec7(0x224)](this['index']());let _0x1a7369=this[_0x547ec7(0x26e)](this[_0x547ec7(0x324)]());_0x1a7369=_0x1a7369['replace'](/\\I\[(\d+)\]/gi,''),_0x5464d9[_0x547ec7(0x1e5)](),this['commandNameWindowDrawBackground'](_0x1a7369,_0x547d95),this[_0x547ec7(0x384)](_0x1a7369,_0x547d95),this['commandNameWindowCenter'](_0x1a7369,_0x547d95);}else{const _0xb6718a=this[_0x547ec7(0x594)]['note'];if(_0xb6718a[_0x547ec7(0x1a3)](/<ALWAYS HIT>/i))return _0x547ec7(0x2a8);else{if(_0xb6718a['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x547ec7(0x1f5)['format'](_0x10fe20(_0x1d1477['$1']));}}}},Window_ShopCommand['prototype'][_0x108103(0x399)]=function(_0x53fe10,_0xd606ad){},Window_ShopCommand[_0x108103(0x2ab)]['commandNameWindowDrawText']=function(_0x89961b,_0x3edc3d){const _0x20f6d6=_0x108103,_0x3077e4=this[_0x20f6d6(0x301)];_0x3077e4['drawText'](_0x89961b,0x0,_0x3edc3d['y'],_0x3077e4[_0x20f6d6(0x24a)],'center');},Window_ShopCommand['prototype']['commandNameWindowCenter']=function(_0x294625,_0x419a50){const _0x57a31d=_0x108103,_0x31fd82=this[_0x57a31d(0x301)],_0x19d5c9=$gameSystem[_0x57a31d(0x3bc)](),_0x2fed78=_0x419a50['x']+Math[_0x57a31d(0x1b8)](_0x419a50[_0x57a31d(0x2f7)]/0x2)+_0x19d5c9;_0x31fd82['x']=_0x31fd82[_0x57a31d(0x2f7)]/-0x2+_0x2fed78,_0x31fd82['y']=Math[_0x57a31d(0x1b8)](_0x419a50[_0x57a31d(0x157)]/0x2);},Window_ShopCommand['prototype']['maxCols']=function(){const _0x3751b0=_0x108103;return this[_0x3751b0(0x405)]?this[_0x3751b0(0x405)][_0x3751b0(0x468)]:0x3;},Window_ShopCommand['prototype'][_0x108103(0x303)]=function(){const _0x35a824=_0x108103;return VisuMZ['ItemsEquipsCore']['Settings'][_0x35a824(0x4ee)][_0x35a824(0x198)];},Window_ShopCommand[_0x108103(0x2ab)]['makeCommandList']=function(){const _0x14e334=_0x108103;this[_0x14e334(0x579)](),this[_0x14e334(0x5c0)](),this[_0x14e334(0x1fa)]();},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x3f4)]=function(){const _0x509a6f=_0x108103;Window_HorzCommand[_0x509a6f(0x2ab)][_0x509a6f(0x3f4)]['call'](this),this['refreshCursor']();},Window_ShopCommand['prototype'][_0x108103(0x579)]=function(){const _0x49db82=_0x108103,_0x2796d4=this['commandStyle'](),_0x4b8b15=VisuMZ['ItemsEquipsCore'][_0x49db82(0x2d6)][_0x49db82(0x4ee)][_0x49db82(0x489)],_0x1340fb=_0x2796d4==='text'?TextManager[_0x49db82(0x3e2)]:_0x49db82(0x2be)[_0x49db82(0x423)](_0x4b8b15,TextManager[_0x49db82(0x3e2)]),_0x15db8a=this[_0x49db82(0x300)]();if(this[_0x49db82(0x303)]()&&!_0x15db8a)return;this[_0x49db82(0x520)](_0x1340fb,_0x49db82(0x3e2),_0x15db8a);},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x300)]=function(){const _0x5fbf82=_0x108103;if(SceneManager['_scene'][_0x5fbf82(0x5d9)]===Scene_Shop){if(_0x5fbf82(0x1ac)==='yZsrA')return SceneManager[_0x5fbf82(0x3f2)][_0x5fbf82(0x25a)]>0x0;else _0x482302[_0x5fbf82(0x16f)](_0x4c68fa[_0x4ca618]);}else{if(_0x5fbf82(0x3c1)!==_0x5fbf82(0x20a))return!![];else{const _0xbacc85=this[_0x5fbf82(0x224)](_0x6818b4),_0x4cd2e7=this[_0x5fbf82(0x414)](_0x33da9f)[_0x5fbf82(0x2f7)];return _0x4cd2e7<=_0xbacc85[_0x5fbf82(0x2f7)]?'iconText':_0x5fbf82(0x1d2);}}},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x5c0)]=function(){const _0x15550d=_0x108103,_0x261577=this['commandStyle'](),_0x3c6ddc=VisuMZ[_0x15550d(0x3ae)][_0x15550d(0x2d6)]['ShopScene']['CmdIconSell'],_0xaaaf36=_0x261577===_0x15550d(0x50f)?TextManager['sell']:_0x15550d(0x2be)[_0x15550d(0x423)](_0x3c6ddc,TextManager[_0x15550d(0x459)]),_0x1c2e24=this['isSellCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x1c2e24)return;this[_0x15550d(0x520)](_0xaaaf36,'sell',_0x1c2e24);},Window_ShopCommand[_0x108103(0x2ab)]['isSellCommandEnabled']=function(){const _0x578f8a=_0x108103;return!this[_0x578f8a(0x151)];},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x1fa)]=function(){const _0x564236=_0x108103,_0x34585a=this[_0x564236(0x55e)](),_0x5c7e2a=VisuMZ[_0x564236(0x3ae)][_0x564236(0x2d6)][_0x564236(0x4ee)][_0x564236(0x560)],_0x578ea7=VisuMZ['ItemsEquipsCore'][_0x564236(0x2d6)][_0x564236(0x4ee)][_0x564236(0x4fa)],_0xf13627=_0x34585a===_0x564236(0x50f)?_0x578ea7:'\x5cI[%1]%2'[_0x564236(0x423)](_0x5c7e2a,_0x578ea7);this[_0x564236(0x520)](_0xf13627,_0x564236(0x1d1));},Window_ShopCommand['prototype'][_0x108103(0x403)]=function(){const _0x25e4fc=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x25e4fc(0x2d6)][_0x25e4fc(0x4ee)][_0x25e4fc(0x209)];},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x29c)]=function(_0x18736f){const _0x246e12=_0x108103,_0x35ec75=this[_0x246e12(0x31c)](_0x18736f);if(_0x35ec75===_0x246e12(0x269))this[_0x246e12(0x3b8)](_0x18736f);else{if(_0x35ec75==='icon')this[_0x246e12(0x40e)](_0x18736f);else{if(_0x246e12(0x375)!==_0x246e12(0x497))Window_HorzCommand[_0x246e12(0x2ab)]['drawItem'][_0x246e12(0x174)](this,_0x18736f);else{const _0x5db8d2=this[_0x246e12(0x224)](_0x17444a),_0x3a0a01=this[_0x246e12(0x414)](_0xd9bc32)[_0x246e12(0x2f7)];return _0x3a0a01<=_0x5db8d2[_0x246e12(0x2f7)]?_0x246e12(0x269):'icon';}}}},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x55e)]=function(){const _0x252398=_0x108103;return VisuMZ[_0x252398(0x3ae)][_0x252398(0x2d6)][_0x252398(0x4ee)][_0x252398(0x192)];},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x31c)]=function(_0x3c0f9d){const _0x50262c=_0x108103;if(_0x3c0f9d<0x0)return _0x50262c(0x50f);const _0x52e59c=this['commandStyle']();if(_0x52e59c!==_0x50262c(0x4b7))return _0x52e59c;else{if(this[_0x50262c(0x519)]()>0x0){if('QVZez'!==_0x50262c(0x5d1))this[_0x50262c(0x3cf)]();else{const _0x5b56ff=this[_0x50262c(0x26e)](_0x3c0f9d);if(_0x5b56ff[_0x50262c(0x1a3)](/\\I\[(\d+)\]/i)){const _0x25d36b=this[_0x50262c(0x224)](_0x3c0f9d),_0x1b871b=this[_0x50262c(0x414)](_0x5b56ff)[_0x50262c(0x2f7)];if(_0x1b871b<=_0x25d36b[_0x50262c(0x2f7)])return _0x50262c(0x269);else{if(_0x50262c(0x46f)!=='rUdsi')return'icon';else this[_0x50262c(0x2f2)](_0x2eaf36[_0x50262c(0x2a4)]()),this[_0x50262c(0x3bf)](_0x4361a1['param'](_0x2fb101),_0x12c2b2,_0x5c2b15,_0x5e6357);}}}}}return _0x50262c(0x50f);},Window_ShopCommand['prototype'][_0x108103(0x3b8)]=function(_0x3a24b4){const _0x5b71c0=_0x108103,_0x1096ac=this['itemLineRect'](_0x3a24b4),_0x25eae4=this[_0x5b71c0(0x26e)](_0x3a24b4),_0x382807=this[_0x5b71c0(0x414)](_0x25eae4)['width'];this[_0x5b71c0(0x494)](this['isCommandEnabled'](_0x3a24b4));const _0x3af0e4=this['itemTextAlign']();if(_0x3af0e4===_0x5b71c0(0x170)){if('vRgSn'!==_0x5b71c0(0x311))this[_0x5b71c0(0x3ff)](_0x25eae4,_0x1096ac['x']+_0x1096ac[_0x5b71c0(0x2f7)]-_0x382807,_0x1096ac['y'],_0x382807);else{_0x588b53[_0x5b71c0(0x1a3)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x1946d4=_0x7f5799(_0x3580e3['$1'])[_0x5b71c0(0x45c)]()[_0x5b71c0(0x425)]()[_0x5b71c0(0x5be)](',');for(const _0xe3cf34 of _0x1946d4){_0x3c7778['categories'][_0x5b71c0(0x16f)](_0xe3cf34['trim']());}}}else{if(_0x3af0e4==='center'){if('fWHiY'!==_0x5b71c0(0x308)){const _0x4554b5=_0x1096ac['x']+Math[_0x5b71c0(0x1b8)]((_0x1096ac[_0x5b71c0(0x2f7)]-_0x382807)/0x2);this[_0x5b71c0(0x3ff)](_0x25eae4,_0x4554b5,_0x1096ac['y'],_0x382807);}else return this[_0x5b71c0(0x398)]()?this[_0x5b71c0(0x3d8)]():_0x1502a['ItemsEquipsCore'][_0x5b71c0(0x4bd)]['call'](this);}else this[_0x5b71c0(0x3ff)](_0x25eae4,_0x1096ac['x'],_0x1096ac['y'],_0x382807);}},Window_ShopCommand[_0x108103(0x2ab)][_0x108103(0x40e)]=function(_0x4c1ca2){const _0x415ad1=_0x108103;this[_0x415ad1(0x26e)](_0x4c1ca2)['match'](/\\I\[(\d+)\]/i);const _0x3c4f9b=Number(RegExp['$1'])||0x0,_0x3ca5de=this[_0x415ad1(0x224)](_0x4c1ca2),_0x219c46=_0x3ca5de['x']+Math[_0x415ad1(0x1b8)]((_0x3ca5de[_0x415ad1(0x2f7)]-ImageManager['iconWidth'])/0x2),_0x3d69c3=_0x3ca5de['y']+(_0x3ca5de[_0x415ad1(0x157)]-ImageManager[_0x415ad1(0x1ca)])/0x2;this[_0x415ad1(0x577)](_0x3c4f9b,_0x219c46,_0x3d69c3);},VisuMZ[_0x108103(0x3ae)][_0x108103(0x183)]=Window_ShopBuy['prototype'][_0x108103(0x3f4)],Window_ShopBuy[_0x108103(0x2ab)][_0x108103(0x3f4)]=function(){const _0x1cae79=_0x108103;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore'][_0x1cae79(0x183)]['call'](this);},Window_ShopBuy['prototype']['updateMoneyAmount']=function(){const _0x1e43d8=_0x108103;SceneManager[_0x1e43d8(0x3f2)][_0x1e43d8(0x5d9)]===Scene_Shop&&(this['_money']=SceneManager['_scene'][_0x1e43d8(0x342)]());},VisuMZ['ItemsEquipsCore'][_0x108103(0x421)]=Window_ShopBuy['prototype'][_0x108103(0x4c9)],Window_ShopBuy[_0x108103(0x2ab)][_0x108103(0x4c9)]=function(_0x5a52f6){const _0x5c1d8e=_0x108103;if(!_0x5a52f6)return 0x0;let _0x1cacfb=VisuMZ['ItemsEquipsCore'][_0x5c1d8e(0x421)][_0x5c1d8e(0x174)](this,_0x5a52f6);return Math[_0x5c1d8e(0x317)](0x0,this['modifiedBuyPriceItemsEquipsCore'](_0x5a52f6,_0x1cacfb));},Window_ShopBuy[_0x108103(0x2ab)][_0x108103(0x5c7)]=function(_0x297ae7,_0x410e21){const _0xd54eeb=_0x108103,_0x22fe39=_0x297ae7[_0xd54eeb(0x412)];if(_0x22fe39[_0xd54eeb(0x1a3)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if(_0xd54eeb(0x274)!=='BIvZg')return this[_0xd54eeb(0x405)]?this[_0xd54eeb(0x405)][_0xd54eeb(0x468)]:0x3;else{const _0x42e90e=String(RegExp['$1']);try{eval(_0x42e90e);}catch(_0x53ad49){if(_0xd54eeb(0x56d)!==_0xd54eeb(0x56d)){_0xbb839c[_0xd54eeb(0x388)]=!![],this[_0xd54eeb(0x594)]=this[_0xd54eeb(0x44d)][_0xd54eeb(0x25e)]();const _0x2b1a8f=_0x1e2c57['ItemsEquipsCore'][_0xd54eeb(0x2eb)][_0xd54eeb(0x174)](this);return _0x305ac1['_bypassProxy']=![],this['_item']=this[_0xd54eeb(0x44d)][_0xd54eeb(0x25e)](),_0x2b1a8f;}else{if($gameTemp['isPlaytest']())console[_0xd54eeb(0x52e)](_0x53ad49);}}}}_0x410e21=VisuMZ['ItemsEquipsCore'][_0xd54eeb(0x2d6)]['ShopScene'][_0xd54eeb(0x46a)][_0xd54eeb(0x174)](this,_0x297ae7,_0x410e21);if(isNaN(_0x410e21))_0x410e21=0x0;return Math['floor'](_0x410e21);},Window_ShopBuy[_0x108103(0x2ab)]['drawItem']=function(_0x4eaceb){const _0x168166=_0x108103;this[_0x168166(0x1e5)]();const _0x4350ff=this['itemAt'](_0x4eaceb),_0x53987d=this['itemLineRect'](_0x4eaceb),_0x407bb3=_0x53987d[_0x168166(0x2f7)];this[_0x168166(0x494)](this[_0x168166(0x223)](_0x4350ff)),this['drawItemName'](_0x4350ff,_0x53987d['x'],_0x53987d['y'],_0x407bb3),this[_0x168166(0x3e6)](_0x4350ff,_0x53987d),this['changePaintOpacity'](!![]);},Window_ShopBuy['prototype'][_0x108103(0x3e6)]=function(_0x4dd6ad,_0x312d74){const _0x1b95aa=_0x108103,_0x554cef=this[_0x1b95aa(0x4c9)](_0x4dd6ad);this['drawCurrencyValue'](_0x554cef,TextManager['currencyUnit'],_0x312d74['x'],_0x312d74['y'],_0x312d74[_0x1b95aa(0x2f7)]);},Window_ShopSell[_0x108103(0x2ab)][_0x108103(0x2c7)]=function(){const _0x3f126f=_0x108103;return SceneManager[_0x3f126f(0x3f2)][_0x3f126f(0x398)]()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x108103(0x2cf)]=Window_ShopSell[_0x108103(0x2ab)]['isEnabled'],Window_ShopSell[_0x108103(0x2ab)][_0x108103(0x223)]=function(_0x2f7964){const _0x2a5e56=_0x108103;if(!_0x2f7964)return![];const _0xe573d=_0x2f7964[_0x2a5e56(0x412)];if(_0xe573d[_0x2a5e56(0x1a3)](/<CANNOT SELL>/i))return![];if(_0xe573d[_0x2a5e56(0x1a3)](/<CAN SELL>/i))return!![];if(_0xe573d['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32599b=JSON[_0x2a5e56(0x563)]('['+RegExp['$1'][_0x2a5e56(0x1a3)](/\d+/g)+']');for(const _0x10f635 of _0x32599b){if(!$gameSwitches[_0x2a5e56(0x4bc)](_0x10f635))return![];}}if(_0xe573d[_0x2a5e56(0x1a3)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x861fc2=JSON[_0x2a5e56(0x563)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1548f8 of _0x861fc2){if(_0x2a5e56(0x173)!==_0x2a5e56(0x3d6)){if(!$gameSwitches[_0x2a5e56(0x4bc)](_0x1548f8))return![];}else _0x6851a1[_0x2a5e56(0x167)][_0x2aba73]=_0x553d52(_0x2ec222['$1']);}}if(_0xe573d[_0x2a5e56(0x1a3)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ba236=JSON[_0x2a5e56(0x563)]('['+RegExp['$1'][_0x2a5e56(0x1a3)](/\d+/g)+']');for(const _0x2e79ee of _0x3ba236){if($gameSwitches[_0x2a5e56(0x4bc)](_0x2e79ee))return![];}}return VisuMZ[_0x2a5e56(0x3ae)][_0x2a5e56(0x2cf)]['call'](this,_0x2f7964);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x241)]=function(){return![];},Window_ShopStatus['prototype']['loadFaceImages']=function(){const _0x75059d=_0x108103;Window_StatusBase[_0x75059d(0x2ab)][_0x75059d(0x1bf)][_0x75059d(0x174)](this);for(const _0x34e36f of $gameParty[_0x75059d(0x35c)]()){ImageManager[_0x75059d(0x386)](_0x34e36f[_0x75059d(0x359)]());}},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x2ff)]=function(){const _0x2af7c2=_0x108103;return VisuMZ[_0x2af7c2(0x3ae)][_0x2af7c2(0x2d6)][_0x2af7c2(0x325)][_0x2af7c2(0x13b)];},Window_ShopStatus[_0x108103(0x2ab)]['refresh']=function(){const _0x12f32f=_0x108103;this[_0x12f32f(0x1e8)][_0x12f32f(0x53d)](),this[_0x12f32f(0x532)][_0x12f32f(0x53d)]();if(this[_0x12f32f(0x594)]){this[_0x12f32f(0x1e5)](),this[_0x12f32f(0x494)](!![]),this[_0x12f32f(0x402)]();if(this[_0x12f32f(0x43f)]()){if(_0x12f32f(0x535)!==_0x12f32f(0x535)){_0x317571[_0x12f32f(0x412)][_0x12f32f(0x1a3)](/<PROXY:[ ](.*)>/i);const _0x37c6ab=_0x361613['$1'][_0x12f32f(0x425)](),_0x3dd3d5=/^\d+$/[_0x12f32f(0x59a)](_0x37c6ab);if(this[_0x12f32f(0x322)](_0x4c190e)){const _0x1496d2=_0x3dd3d5?_0x26f2b7(_0xf4ef8b['$1']):_0x1f7104[_0x12f32f(0x48c)](_0x37c6ab);return _0x464cf2[_0x1496d2]||_0x52de18;}else{if(this[_0x12f32f(0x4a4)](_0x414d6d)){const _0x331c7a=_0x3dd3d5?_0x1e185e(_0x1fe519['$1']):_0x2defb5['getWeaponIdWithName'](_0x37c6ab);return _0x184c11[_0x331c7a]||_0x337d74;}else{if(this['isArmor'](_0x5dcfd1)){const _0x21500b=_0x3dd3d5?_0x2129f1(_0x458b16['$1']):_0x4f1166[_0x12f32f(0x57e)](_0x37c6ab);return _0x21ef17[_0x21500b]||_0x25ef46;}}}return _0x24306f;}else this['drawEquipData']();}else _0x12f32f(0x21d)===_0x12f32f(0x21d)?this[_0x12f32f(0x160)]():(this[_0x12f32f(0x4a9)](),_0x239701[_0x12f32f(0x3ae)][_0x12f32f(0x183)][_0x12f32f(0x174)](this));this[_0x12f32f(0x50c)]();}},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x186)]=function(_0x2d4eee,_0x3e6691){const _0xc5f168=_0x108103;if(!this['isEquipItem']()&&!DataManager[_0xc5f168(0x322)](this[_0xc5f168(0x594)]))return;const _0x84a665=this[_0xc5f168(0x24a)]-this[_0xc5f168(0x42e)]()-_0x2d4eee,_0x34224b=this[_0xc5f168(0x2d8)](_0xc5f168(0x30c));this['changeTextColor'](ColorManager[_0xc5f168(0x2a4)]()),this[_0xc5f168(0x3bf)](TextManager[_0xc5f168(0x214)],_0x2d4eee+this[_0xc5f168(0x42e)](),_0x3e6691,_0x84a665-_0x34224b),this[_0xc5f168(0x31b)](),this['drawItemNumber'](this[_0xc5f168(0x594)],_0x2d4eee,_0x3e6691,_0x84a665);},Window_ShopStatus['prototype'][_0x108103(0x221)]=function(_0x2e59d3,_0x4eb000,_0x5922c3,_0x50d2ab,_0x2f9868){const _0x342b2f=_0x108103;if(VisuMZ[_0x342b2f(0x3ae)][_0x342b2f(0x2d6)][_0x342b2f(0x325)]['DrawBackRect']===![])return;_0x2f9868=Math[_0x342b2f(0x317)](_0x2f9868||0x1,0x1);while(_0x2f9868--){_0x50d2ab=_0x50d2ab||this['lineHeight'](),this[_0x342b2f(0x532)]['paintOpacity']=0xa0;const _0xbb3fbe=ColorManager['getItemsEquipsCoreBackColor1']();this[_0x342b2f(0x532)][_0x342b2f(0x372)](_0x2e59d3+0x1,_0x4eb000+0x1,_0x5922c3-0x2,_0x50d2ab-0x2,_0xbb3fbe),this[_0x342b2f(0x532)][_0x342b2f(0x259)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x2a6916=_0x108103,_0x21c3b2=VisuMZ['ItemsEquipsCore'][_0x2a6916(0x2d6)]['StatusWindow'];let _0x5cdf1c=_0x21c3b2[_0x2a6916(0x389)]!==undefined?_0x21c3b2[_0x2a6916(0x389)]:0x13;return ColorManager[_0x2a6916(0x35b)](_0x5cdf1c);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x2d9)]=function(){const _0xc71408=_0x108103;if(VisuMZ[_0xc71408(0x3ae)][_0xc71408(0x2d6)]['StatusWindow'][_0xc71408(0x4bf)]){if(_0xc71408(0x544)==='fMwIX'){if(!this['_tempActor']){const _0x285370=_0x6cdcd5[_0xc71408(0x50e)](this);_0x285370[_0xc71408(0x3f1)]=!![],_0x7c5972[_0xc71408(0x3ae)][_0xc71408(0x14c)][_0xc71408(0x174)](this,_0x5c413e),this['equipAdjustHpMp'](_0x285370);}else _0x2121e1[_0xc71408(0x3ae)][_0xc71408(0x14c)][_0xc71408(0x174)](this,_0x4591bf);}else{VisuMZ[_0xc71408(0x3ae)][_0xc71408(0x2d6)][_0xc71408(0x325)][_0xc71408(0x4bf)]['call'](this);return;}}const _0x434d24=this[_0xc71408(0x28d)](),_0x46c914=this[_0xc71408(0x217)]()+0x8;let _0x3fecee=0x0,_0x31304a=0x0,_0x32961=this[_0xc71408(0x24a)],_0x3815e2=this[_0xc71408(0x4d5)],_0x8d6a64=Math[_0xc71408(0x1b8)](_0x32961/0x2),_0x13f042=_0x3fecee+_0x32961-_0x8d6a64;this[_0xc71408(0x19c)](this[_0xc71408(0x594)],_0x3fecee+this[_0xc71408(0x42e)](),_0x31304a,_0x32961-this[_0xc71408(0x42e)]()*0x2),this[_0xc71408(0x221)](_0x3fecee,_0x31304a,_0x32961),_0x31304a+=_0x434d24;if(this[_0xc71408(0x1ce)](_0x3fecee,_0x31304a,_0x8d6a64))_0x31304a+=0x0;if(this[_0xc71408(0x28c)](_0x13f042,_0x31304a,_0x8d6a64))_0x31304a+=_0x434d24;const _0x2fb065=this[_0xc71408(0x200)](),_0x439ea8=_0x31304a;_0x31304a=_0x3815e2-_0x2fb065[_0xc71408(0x468)]*_0x46c914-0x4;let _0x326d5a=_0x3fecee,_0x2a2c39=0x0,_0x18155b=_0x31304a;for(const _0x372e52 of _0x2fb065){if(_0xc71408(0x236)===_0xc71408(0x17c)){_0x1d69f2=_0x22e9ae;if(!_0x146840[_0x3b1a3c])return _0x385f18;}else _0x2a2c39=Math[_0xc71408(0x317)](this[_0xc71408(0x1dc)](_0x372e52,_0x3fecee+0x4,_0x31304a+0x4,_0x32961),_0x2a2c39),_0x31304a+=_0x46c914;}const _0x5ac32a=$gameParty[_0xc71408(0x5b8)](),_0x424318=Math[_0xc71408(0x1b8)]((_0x32961-_0x2a2c39)/_0x5ac32a);_0x2a2c39=_0x32961-_0x424318*_0x5ac32a;for(const _0x6c5cf6 of $gameParty[_0xc71408(0x1f4)]()){if(_0xc71408(0x5d5)!==_0xc71408(0x244)){const _0x1c3dcf=$gameParty[_0xc71408(0x1f4)]()[_0xc71408(0x1ff)](_0x6c5cf6),_0x1fd157=_0x326d5a+_0x2a2c39+_0x1c3dcf*_0x424318;this[_0xc71408(0x494)](_0x6c5cf6[_0xc71408(0x17a)](this[_0xc71408(0x594)])),this[_0xc71408(0x567)](_0x6c5cf6,_0x1fd157+_0x424318/0x2,_0x18155b);let _0x3507d2=_0x18155b;for(const _0x5231ba of _0x2fb065){if(_0xc71408(0x46d)===_0xc71408(0x2f1))return _0x39384f[_0xc71408(0x3ae)]['Settings'][_0xc71408(0x325)][_0xc71408(0x175)];else{const _0x449b7f=_0x3507d2-(_0x434d24-_0x46c914)/0x2;this[_0xc71408(0x264)](_0x6c5cf6,_0x5231ba,_0x1fd157,_0x449b7f,_0x424318),_0x3507d2+=_0x46c914;}}}else return _0x427f12[_0xc71408(0x3ae)]['Settings'][_0xc71408(0x325)][_0xc71408(0x539)];}this[_0xc71408(0x221)](_0x326d5a,_0x439ea8,_0x2a2c39,_0x18155b-_0x439ea8);for(let _0x1d05d5=0x0;_0x1d05d5<_0x5ac32a;_0x1d05d5++){if(_0xc71408(0x34a)===_0xc71408(0x34a)){const _0x2d0e=_0x326d5a+_0x2a2c39+_0x1d05d5*_0x424318;this['drawItemDarkRect'](_0x2d0e,_0x439ea8,_0x424318,_0x18155b-_0x439ea8);}else _0x5a1a6f[_0xc71408(0x2ab)][_0xc71408(0x24d)][_0xc71408(0x174)](this);}for(const _0x2ce354 of _0x2fb065){if('UkncA'!==_0xc71408(0x5ce))this[_0xc71408(0x477)]();else{this['drawItemDarkRect'](_0x326d5a,_0x18155b,_0x2a2c39,_0x46c914);for(let _0x33f2f3=0x0;_0x33f2f3<_0x5ac32a;_0x33f2f3++){if('FsLrY'===_0xc71408(0x47a)){const _0x28f08a=_0x326d5a+_0x2a2c39+_0x33f2f3*_0x424318;this[_0xc71408(0x221)](_0x28f08a,_0x18155b,_0x424318,_0x46c914);}else{const _0x58aace=this[_0xc71408(0x4ea)]();this[_0xc71408(0x503)](_0x58aace,_0x4b0f7e,_0x2d3fd1,_0x2d924e,!![]);const _0x517cba=this[_0xc71408(0x24c)]();return this[_0xc71408(0x503)](_0x517cba,_0x472098,_0x57b4de,_0x360db1,![],_0xc71408(0x170)),this['drawItemDarkRect'](_0x23cc89,_0x2d7528,_0x55a236),this[_0xc71408(0x1e5)](),!![];}}_0x18155b+=_0x46c914;}}},Window_ShopStatus[_0x108103(0x2ab)]['drawItemEquipType']=function(_0x253911,_0x4964ed,_0x2b77ca){const _0x32150c=_0x108103;if(!this[_0x32150c(0x43f)]())return![];const _0x3a5d56=$dataSystem[_0x32150c(0x3dd)][this['_item'][_0x32150c(0x1db)]];return this['drawItemKeyData'](_0x3a5d56,_0x253911,_0x4964ed,_0x2b77ca,!![]),this[_0x32150c(0x221)](_0x253911,_0x4964ed,_0x2b77ca),this[_0x32150c(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x48b)]=function(){const _0x12f0df=_0x108103,_0x19cbf7=VisuMZ[_0x12f0df(0x3ae)][_0x12f0df(0x2d6)][_0x12f0df(0x509)][_0x12f0df(0x513)];return _0x19cbf7[_0x12f0df(0x423)]($gameParty[_0x12f0df(0x443)](this['_item']));},Window_ShopStatus[_0x108103(0x2ab)]['actorParams']=function(){const _0x595f6e=_0x108103;let _0x857159=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x595f6e(0x34f)]){if(_0x595f6e(0x14d)===_0x595f6e(0x14d))_0x857159=VisuMZ['CoreEngine'][_0x595f6e(0x2d6)][_0x595f6e(0x1af)][_0x595f6e(0x4db)];else return _0x595f6e(0x1f5)['format'](_0x3d8b92['round'](_0x2e69e1*0x64));}return _0x857159=_0x857159[_0x595f6e(0x268)](_0x573ac0=>typeof _0x573ac0==='number'?_0x573ac0:_0x573ac0[_0x595f6e(0x45c)]()['trim']()),_0x857159;},Window_ShopStatus[_0x108103(0x2ab)]['smallParamFontSize']=function(){const _0x514e67=_0x108103;return VisuMZ['ItemsEquipsCore'][_0x514e67(0x2d6)][_0x514e67(0x325)][_0x514e67(0x510)];},Window_ShopStatus[_0x108103(0x2ab)]['drawParamName']=function(_0x32f5f2,_0x1ba1b1,_0x3e6095,_0x25b922){const _0x257892=_0x108103;this[_0x257892(0x1e5)](),this[_0x257892(0x1e8)]['fontSize']=this[_0x257892(0x12d)]();let _0x50e649=this[_0x257892(0x2d8)](TextManager['param'](_0x32f5f2))+0x4+_0x1ba1b1;return Imported['VisuMZ_0_CoreEngine']?_0x257892(0x438)!==_0x257892(0x361)?(this[_0x257892(0x1e1)](_0x1ba1b1,_0x3e6095,_0x25b922,_0x32f5f2,!![]),VisuMZ[_0x257892(0x3e4)]['Settings'][_0x257892(0x1af)][_0x257892(0x1cd)]&&(_0x50e649+=ImageManager[_0x257892(0x574)]+0x4)):(_0x18cb01['a']=_0x2cd8d9,_0x4279e1['b']=_0x49ded0):(this['changeTextColor'](ColorManager['systemColor']()),this[_0x257892(0x3bf)](TextManager[_0x257892(0x516)](_0x32f5f2),_0x1ba1b1,_0x3e6095,_0x25b922)),this[_0x257892(0x1e5)](),_0x50e649;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x264)]=function(_0x4a2db3,_0x36382b,_0x2647ae,_0x281e0c,_0x4e725f){const _0x2855ca=_0x108103;_0x2647ae+=this['itemPadding'](),_0x4e725f-=this[_0x2855ca(0x42e)]()*0x2;const _0x337f10=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'];this[_0x2855ca(0x1e8)][_0x2855ca(0x436)]=_0x337f10[_0x2855ca(0x510)],this[_0x2855ca(0x494)](_0x4a2db3['canEquip'](this[_0x2855ca(0x594)]));if(_0x4a2db3[_0x2855ca(0x222)](this[_0x2855ca(0x594)])){if(_0x2855ca(0x4f6)!==_0x2855ca(0x4f6)){const _0x20ecea=_0x75f9c1(_0x46a2b4['$1']);let _0x449d6b=this[_0x2855ca(0x594)],_0x175713=_0x19dc35*this[_0x2855ca(0x540)]();try{_0xc525c7(_0x20ecea);}catch(_0x1e9ecd){if(_0x3e1d6b[_0x2855ca(0x3cd)]())_0x1e60ee[_0x2855ca(0x52e)](_0x1e9ecd);}if(_0x2b592d(_0x175713))_0x175713=0x0;return _0x3680d1[_0x2855ca(0x1b8)](_0x175713);}else{const _0x1ff350=_0x337f10['AlreadyEquipMarker'];this['drawText'](_0x1ff350,_0x2647ae,_0x281e0c,_0x4e725f,'center');}}else{if(_0x4a2db3[_0x2855ca(0x17a)](this['_item'])){if(_0x2855ca(0x5cc)!=='HCnVI'){const _0xd51880=JsonEx[_0x2855ca(0x50e)](_0x4a2db3);_0xd51880[_0x2855ca(0x3f1)]=!![];const _0x1e650f=_0xd51880[_0x2855ca(0x4fd)]()[_0x2855ca(0x1ff)](this[_0x2855ca(0x594)][_0x2855ca(0x1db)]);if(_0x1e650f>=0x0)_0xd51880['forceChangeEquip'](_0x1e650f,this[_0x2855ca(0x594)]);let _0x1c46d0=0x0,_0x5a59f4=0x0,_0x101e39=0x0;if(Imported[_0x2855ca(0x34f)]){if('KNUDf'==='XdtZQ'){const _0x55b5e6=_0x4051e5[_0x2855ca(0x3ae)][_0x2855ca(0x2d6)][_0x2855ca(0x325)][_0x2855ca(0x4fb)];return _0x55b5e6[_0x2855ca(0x423)](_0x5a53c1['tp']);}else _0x1c46d0=_0xd51880[_0x2855ca(0x490)](_0x36382b),_0x5a59f4=_0x1c46d0-_0x4a2db3[_0x2855ca(0x490)](_0x36382b),this[_0x2855ca(0x2f2)](ColorManager['paramchangeTextColor'](_0x5a59f4)),_0x101e39=(_0x5a59f4>=0x0?'+':'')+VisuMZ[_0x2855ca(0x3fe)](_0x5a59f4,0x0,_0x36382b);}else _0x1c46d0=_0xd51880['param'](_0x36382b),_0x5a59f4=_0x1c46d0-_0x4a2db3[_0x2855ca(0x516)](_0x36382b),this[_0x2855ca(0x2f2)](ColorManager['paramchangeTextColor'](_0x5a59f4)),_0x101e39=(_0x5a59f4>=0x0?'+':'')+_0x5a59f4;if(_0x101e39==='+0')_0x101e39=_0x337f10[_0x2855ca(0x5b1)];this[_0x2855ca(0x3bf)](_0x101e39,_0x2647ae,_0x281e0c,_0x4e725f,'center');}else{const _0xfa6b6f=this[_0x2855ca(0x26e)](_0x39da9a);if(_0xfa6b6f[_0x2855ca(0x1a3)](/\\I\[(\d+)\]/i)){const _0x2b4ec9=_0x50d825(_0x19747b['$1'])||0x0,_0x1d8b76=this[_0x2855ca(0x224)](_0x5e1a7e),_0x4c21a0=_0x1d8b76['x']+_0x52e538['floor']((_0x1d8b76['width']-_0x58b458[_0x2855ca(0x574)])/0x2),_0x14093b=_0x1d8b76['y']+(_0x1d8b76[_0x2855ca(0x157)]-_0x7beca9[_0x2855ca(0x1ca)])/0x2;this[_0x2855ca(0x577)](_0x2b4ec9,_0x4c21a0,_0x14093b);}}}else{const _0x261e66=_0x337f10[_0x2855ca(0x2fa)];this['drawText'](_0x261e66,_0x2647ae,_0x281e0c,_0x4e725f,_0x2855ca(0x565));}}this[_0x2855ca(0x1e5)](),this[_0x2855ca(0x494)](!![]);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x160)]=function(){const _0xd61b78=_0x108103;VisuMZ[_0xd61b78(0x3ae)][_0xd61b78(0x2d6)][_0xd61b78(0x325)][_0xd61b78(0x38c)][_0xd61b78(0x174)](this);},Window_ShopStatus[_0x108103(0x2ab)]['prepareItemCustomData']=function(){const _0x5cc930=_0x108103;this[_0x5cc930(0x42c)]={};if(!this[_0x5cc930(0x594)])return;const _0x4b42aa=this[_0x5cc930(0x594)][_0x5cc930(0x412)];if(_0x4b42aa[_0x5cc930(0x1a3)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x261074=String(RegExp['$1'])[_0x5cc930(0x5be)](/[\r\n]+/);for(const _0x7fbc47 of _0x261074){if('pYpNH'!==_0x5cc930(0x1c0)){if(_0x7fbc47['match'](/(.*):[ ](.*)/i)){const _0x1a1099=String(RegExp['$1'])[_0x5cc930(0x45c)]()[_0x5cc930(0x425)](),_0x2a340d=String(RegExp['$2'])[_0x5cc930(0x425)]();this[_0x5cc930(0x42c)][_0x1a1099]=_0x2a340d;}}else return _0x58b9be['VisuMZ_0_CoreEngine']&&_0x312a8e['prototype']['isUseModernControls'][_0x5cc930(0x174)](this);}}},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x485)]=function(){const _0x1f8c4f=_0x108103;return Math['max'](0x1,$gameSystem[_0x1f8c4f(0x428)]()-0x4);},Window_ShopStatus[_0x108103(0x2ab)]['resetFontSettings']=function(){const _0x13d5f9=_0x108103;Window_StatusBase[_0x13d5f9(0x2ab)][_0x13d5f9(0x1e5)]['call'](this),this[_0x13d5f9(0x1e8)][_0x13d5f9(0x436)]=this[_0x13d5f9(0x30b)]||this[_0x13d5f9(0x1e8)][_0x13d5f9(0x436)],this[_0x13d5f9(0x1e8)][_0x13d5f9(0x555)]=this[_0x13d5f9(0x480)]||this[_0x13d5f9(0x1e8)][_0x13d5f9(0x555)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x15b)]=function(){const _0x610c74=_0x108103;return this[_0x610c74(0x1e8)]['fontSize']/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x577)]=function(_0x435689,_0xf6b5a,_0x171a24){const _0x230a2c=_0x108103,_0x1e32a4=ImageManager[_0x230a2c(0x51f)](_0x230a2c(0x1d8)),_0x416053=ImageManager[_0x230a2c(0x574)],_0x3601b4=ImageManager[_0x230a2c(0x1ca)],_0x298e38=_0x435689%0x10*_0x416053,_0x4cd8ff=Math['floor'](_0x435689/0x10)*_0x3601b4,_0x5b4fae=Math['ceil'](_0x416053*this[_0x230a2c(0x15b)]()),_0xef5bad=Math[_0x230a2c(0x3d7)](_0x3601b4*this[_0x230a2c(0x15b)]());this['contents'][_0x230a2c(0x4b3)](_0x1e32a4,_0x298e38,_0x4cd8ff,_0x416053,_0x3601b4,_0xf6b5a,_0x171a24,_0x5b4fae,_0xef5bad);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x2a2)]=function(_0x24a987,_0x3299e5){const _0x3212eb=_0x108103;_0x3299e5[_0x3212eb(0x576)]&&this['drawIcon'](_0x24a987,_0x3299e5['x'],_0x3299e5['y']+0x2);_0x3299e5['x']+=Math[_0x3212eb(0x3d7)](ImageManager['iconWidth']*this['fontSizeRatio']());if(this[_0x3212eb(0x15b)]()===0x1)_0x3299e5['x']+=0x4;},Window_ShopStatus['prototype'][_0x108103(0x503)]=function(_0x5c5d23,_0x566523,_0x6a58c4,_0x2acf04,_0x534e80,_0x3e2c6a){const _0x471277=_0x108103;_0x5c5d23=_0x5c5d23||'',_0x3e2c6a=_0x3e2c6a||_0x471277(0x49b),this[_0x471277(0x30b)]=this[_0x471277(0x485)](),this[_0x471277(0x480)]=_0x534e80?ColorManager[_0x471277(0x2a4)]():this[_0x471277(0x1e8)][_0x471277(0x555)],_0x566523+=this[_0x471277(0x42e)](),_0x2acf04-=this['itemPadding']()*0x2;const _0x28d1f3=this[_0x471277(0x414)](_0x5c5d23);if(_0x3e2c6a===_0x471277(0x565))_0x566523=_0x566523+Math[_0x471277(0x1b8)]((_0x2acf04-_0x28d1f3[_0x471277(0x2f7)])/0x2);else _0x3e2c6a===_0x471277(0x170)&&(_0x566523=_0x566523+_0x2acf04-_0x28d1f3[_0x471277(0x2f7)]);_0x6a58c4+=(this[_0x471277(0x28d)]()-_0x28d1f3[_0x471277(0x157)])/0x2,this[_0x471277(0x3ff)](_0x5c5d23,_0x566523,_0x6a58c4,_0x2acf04),this[_0x471277(0x30b)]=undefined,this[_0x471277(0x480)]=undefined,this[_0x471277(0x1e5)]();},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x1d3)]=function(_0x4c196a,_0x55991b,_0x22b88b){const _0x131c49=_0x108103;if(!DataManager['isItem'](this[_0x131c49(0x594)]))return![];const _0x57adc9=this[_0x131c49(0x2e6)]();this[_0x131c49(0x503)](_0x57adc9,_0x4c196a,_0x55991b,_0x22b88b,!![]);const _0x25b0b9=this[_0x131c49(0x2f4)]();return this['drawItemKeyData'](_0x25b0b9,_0x4c196a,_0x55991b,_0x22b88b,![],_0x131c49(0x170)),this[_0x131c49(0x221)](_0x4c196a,_0x55991b,_0x22b88b),this[_0x131c49(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)]['getItemConsumableLabel']=function(){const _0x4f8b74=_0x108103;return VisuMZ[_0x4f8b74(0x3ae)][_0x4f8b74(0x2d6)][_0x4f8b74(0x325)]['LabelConsume'];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x2f4)]=function(){const _0x10b4c2=_0x108103,_0x41a12f=_0x10b4c2(0x299);if(this[_0x10b4c2(0x42c)][_0x41a12f])return this[_0x10b4c2(0x42c)][_0x41a12f];return this[_0x10b4c2(0x54f)]()?_0x10b4c2(0x235)===_0x10b4c2(0x235)?VisuMZ[_0x10b4c2(0x3ae)][_0x10b4c2(0x2d6)][_0x10b4c2(0x325)][_0x10b4c2(0x258)]:_0x20343e[_0x10b4c2(0x3ae)][_0x10b4c2(0x2aa)]['call'](this):VisuMZ[_0x10b4c2(0x3ae)][_0x10b4c2(0x2d6)][_0x10b4c2(0x325)][_0x10b4c2(0x4b2)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x54f)]=function(){const _0x581d8d=_0x108103;return VisuMZ[_0x581d8d(0x3e4)]&&VisuMZ[_0x581d8d(0x3e4)]['Settings'][_0x581d8d(0x2dc)][_0x581d8d(0x4b5)]&&DataManager[_0x581d8d(0x3ab)](this['_item'])?![]:this[_0x581d8d(0x594)][_0x581d8d(0x1b2)];},Window_ShopStatus['prototype'][_0x108103(0x28c)]=function(_0xdc57d3,_0x4fab3d,_0x532bd1){const _0x354af6=_0x108103;if(!this[_0x354af6(0x43f)]()&&!DataManager[_0x354af6(0x322)](this[_0x354af6(0x594)]))return![];if(DataManager[_0x354af6(0x3ab)](this[_0x354af6(0x594)])&&!$dataSystem[_0x354af6(0x2ce)]){const _0x427ef5=TextManager[_0x354af6(0x229)];this[_0x354af6(0x503)](_0x427ef5,_0xdc57d3,_0x4fab3d,_0x532bd1,!![],_0x354af6(0x565));}else{if(_0x354af6(0x364)!=='BGfQP'){const _0x5a2ed6=TextManager[_0x354af6(0x214)];this[_0x354af6(0x503)](_0x5a2ed6,_0xdc57d3,_0x4fab3d,_0x532bd1,!![]);const _0x16d172=this[_0x354af6(0x48b)]();this[_0x354af6(0x503)](_0x16d172,_0xdc57d3,_0x4fab3d,_0x532bd1,![],'right');}else _0x5229ac=_0x354af6(0x292);}return this[_0x354af6(0x221)](_0xdc57d3,_0x4fab3d,_0x532bd1),this[_0x354af6(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)]['getItemQuantityText']=function(){const _0x1d2bb7=_0x108103,_0x24d62b=_0x1d2bb7(0x5af);if(this[_0x1d2bb7(0x42c)][_0x24d62b])return this[_0x1d2bb7(0x42c)][_0x24d62b];const _0x576605=VisuMZ[_0x1d2bb7(0x3ae)][_0x1d2bb7(0x2d6)][_0x1d2bb7(0x509)]['ItemQuantityFmt'];return _0x576605['format']($gameParty[_0x1d2bb7(0x443)](this[_0x1d2bb7(0x594)]));},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x279)]=function(_0x5d5852,_0x3f8176,_0x1a69b1){const _0x16a518=_0x108103,_0xeb2c45=this[_0x16a518(0x466)]();return this[_0x16a518(0x503)](_0xeb2c45,_0x5d5852,_0x3f8176,_0x1a69b1,![],_0x16a518(0x565)),this['drawItemDarkRect'](_0x5d5852,_0x3f8176,_0x1a69b1),this[_0x16a518(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x466)]=function(){const _0x1febad=_0x108103,_0x330a7f=_0x1febad(0x449);if(this[_0x1febad(0x42c)][_0x330a7f])return this[_0x1febad(0x42c)][_0x330a7f];const _0x4c1bcb=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'],_0x941112=_0x1febad(0x355)[_0x1febad(0x423)](this[_0x1febad(0x594)][_0x1febad(0x400)]);return _0x4c1bcb[_0x941112];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x437)]=function(_0x10b3aa,_0x59e0d1,_0x369053){const _0x181b95=_0x108103,_0x1dc660=this[_0x181b95(0x326)]();return this[_0x181b95(0x503)](_0x1dc660,_0x10b3aa,_0x59e0d1,_0x369053,![],'center'),this[_0x181b95(0x221)](_0x10b3aa,_0x59e0d1,_0x369053),this[_0x181b95(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x326)]=function(){const _0x1c33b9=_0x108103,_0x263ac2='SCOPE';if(this[_0x1c33b9(0x42c)][_0x263ac2])return this['_customItemInfo'][_0x263ac2];const _0x422cd=VisuMZ[_0x1c33b9(0x3ae)][_0x1c33b9(0x2d6)][_0x1c33b9(0x325)];if(Imported[_0x1c33b9(0x197)]){const _0x3f8e2a=this[_0x1c33b9(0x594)][_0x1c33b9(0x412)];if(_0x3f8e2a[_0x1c33b9(0x1a3)](/<TARGET:[ ](.*)>/i)){const _0x4dbe3f=String(RegExp['$1']);if(_0x4dbe3f[_0x1c33b9(0x1a3)](/(\d+) RANDOM ANY/i))return _0x422cd[_0x1c33b9(0x385)][_0x1c33b9(0x423)](Number(RegExp['$1']));else{if(_0x4dbe3f[_0x1c33b9(0x1a3)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x422cd[_0x1c33b9(0x1eb)]['format'](Number(RegExp['$1']));else{if(_0x4dbe3f[_0x1c33b9(0x1a3)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x1c33b9(0x4c2)!==_0x1c33b9(0x4c2)){const _0x296ead=_0x212de5['parse']('['+_0x5163b2['$1']['match'](/\d+/g)+']');for(const _0x41937f of _0x296ead){if(!_0x4f0061[_0x1c33b9(0x4bc)](_0x41937f))return![];}return!![];}else return _0x422cd[_0x1c33b9(0x4f3)][_0x1c33b9(0x423)](Number(RegExp['$1']));}else{if(_0x4dbe3f['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x422cd[_0x1c33b9(0x4b1)];}}}}}const _0x4e71b5='Scope%1'['format'](this[_0x1c33b9(0x594)][_0x1c33b9(0x141)]);return _0x422cd[_0x4e71b5];},Window_ShopStatus['prototype'][_0x108103(0x44f)]=function(_0x2220bf,_0x2eadf0,_0x198b7e){const _0x322844=_0x108103,_0x25f1d3=this[_0x322844(0x4ea)]();this[_0x322844(0x503)](_0x25f1d3,_0x2220bf,_0x2eadf0,_0x198b7e,!![]);const _0x375133=this[_0x322844(0x24c)]();return this[_0x322844(0x503)](_0x375133,_0x2220bf,_0x2eadf0,_0x198b7e,![],'right'),this[_0x322844(0x221)](_0x2220bf,_0x2eadf0,_0x198b7e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x4ea)]=function(){const _0x3cd020=_0x108103;return VisuMZ[_0x3cd020(0x3ae)][_0x3cd020(0x2d6)][_0x3cd020(0x325)][_0x3cd020(0x432)];},Window_ShopStatus['prototype'][_0x108103(0x24c)]=function(){const _0xec329d=_0x108103,_0x39773a=_0xec329d(0x416);if(this[_0xec329d(0x42c)][_0x39773a])return this['_customItemInfo'][_0x39773a];const _0xd533ea=this[_0xec329d(0x594)][_0xec329d(0x585)];if(_0xd533ea>=0x7d0){if(_0xec329d(0x441)===_0xec329d(0x3eb))_0x48b610[_0xec329d(0x2ab)]['activate']['call'](this),this[_0xec329d(0x590)]&&this[_0xec329d(0x590)][_0xec329d(0x45a)]()&&this['_categoryWindow']['activate']();else return VisuMZ['ItemsEquipsCore'][_0xec329d(0x2d6)][_0xec329d(0x325)][_0xec329d(0x210)];}else{if(_0xd533ea>=0x3e8)return VisuMZ[_0xec329d(0x3ae)][_0xec329d(0x2d6)][_0xec329d(0x325)][_0xec329d(0x238)];else{if(_0xd533ea>0x0)return VisuMZ[_0xec329d(0x3ae)]['Settings'][_0xec329d(0x325)][_0xec329d(0x539)];else{if(_0xd533ea===0x0)return VisuMZ[_0xec329d(0x3ae)][_0xec329d(0x2d6)]['StatusWindow'][_0xec329d(0x522)];else{if(_0xd533ea>-0x3e8)return VisuMZ['ItemsEquipsCore'][_0xec329d(0x2d6)]['StatusWindow']['SpeedNeg999'];else{if(_0xd533ea>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0xec329d(0x2d6)][_0xec329d(0x325)]['SpeedNeg1999'];else{if(_0xd533ea<=-0x7d0)return VisuMZ[_0xec329d(0x3ae)]['Settings'][_0xec329d(0x325)][_0xec329d(0x3a1)];else{if(_0xec329d(0x4e6)==='LdPHS')return _0xec329d(0x2b3);else this[_0xec329d(0x58b)][_0xec329d(0x501)](this[_0xec329d(0x59d)]());}}}}}}}},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x156)]=function(_0x970a45,_0x5bf1de,_0x38a46c){const _0x229eac=_0x108103,_0x43c902=this['getItemSuccessRateLabel']();this['drawItemKeyData'](_0x43c902,_0x970a45,_0x5bf1de,_0x38a46c,!![]);const _0x4731ea=this[_0x229eac(0x54a)]();return this[_0x229eac(0x503)](_0x4731ea,_0x970a45,_0x5bf1de,_0x38a46c,![],'right'),this[_0x229eac(0x221)](_0x970a45,_0x5bf1de,_0x38a46c),this[_0x229eac(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x298)]=function(){const _0x184142=_0x108103;return VisuMZ[_0x184142(0x3ae)][_0x184142(0x2d6)][_0x184142(0x325)][_0x184142(0x29b)];},Window_ShopStatus['prototype'][_0x108103(0x54a)]=function(){const _0x8115dc=_0x108103,_0x4a1f0c='SUCCESS\x20RATE';if(this[_0x8115dc(0x42c)][_0x4a1f0c])return this[_0x8115dc(0x42c)][_0x4a1f0c];if(Imported[_0x8115dc(0x197)]){const _0x1fd5db=this[_0x8115dc(0x594)][_0x8115dc(0x412)];if(_0x1fd5db[_0x8115dc(0x1a3)](/<ALWAYS HIT>/i))return _0x8115dc(0x2a8);else{if(_0x1fd5db[_0x8115dc(0x1a3)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x8115dc(0x4a1)!==_0x8115dc(0x4a1)){const _0x157b2d=_0x398ec5[_0x8115dc(0x3ae)][_0x8115dc(0x2d6)]['StatusWindow'];let _0x104665=_0x157b2d['BackRectColor']!==_0x3b1ca1?_0x157b2d[_0x8115dc(0x389)]:0x13;return _0x528e9e['getColor'](_0x104665);}else return _0x8115dc(0x1f5)['format'](Number(RegExp['$1']));}}}return'%1%'[_0x8115dc(0x423)](this['_item']['successRate']);},Window_ShopStatus[_0x108103(0x2ab)]['drawItemRepeats']=function(_0x256cd8,_0x1971f5,_0x3e3b15){const _0x233b3e=_0x108103,_0x4d9c6d=this[_0x233b3e(0x4e0)]();this['drawItemKeyData'](_0x4d9c6d,_0x256cd8,_0x1971f5,_0x3e3b15,!![]);const _0x25854f=this[_0x233b3e(0x44a)]();return this[_0x233b3e(0x503)](_0x25854f,_0x256cd8,_0x1971f5,_0x3e3b15,![],_0x233b3e(0x170)),this[_0x233b3e(0x221)](_0x256cd8,_0x1971f5,_0x3e3b15),this[_0x233b3e(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x4e0)]=function(){const _0x4ce0ba=_0x108103;return VisuMZ[_0x4ce0ba(0x3ae)]['Settings'][_0x4ce0ba(0x325)][_0x4ce0ba(0x175)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x44a)]=function(){const _0x56190f=_0x108103,_0x3b83e4='REPEAT';if(this['_customItemInfo'][_0x3b83e4])return this['_customItemInfo'][_0x3b83e4];const _0x104919='×%1';return _0x104919[_0x56190f(0x423)](this[_0x56190f(0x594)][_0x56190f(0x43c)]);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x140)]=function(_0x11e402,_0x372dbf,_0x2b7f78){const _0x112558=_0x108103,_0x3eeb55=this[_0x112558(0x3c7)]();this[_0x112558(0x503)](_0x3eeb55,_0x11e402,_0x372dbf,_0x2b7f78,!![]);const _0x2c64fa=this['getItemHitTypeText']();return this[_0x112558(0x503)](_0x2c64fa,_0x11e402,_0x372dbf,_0x2b7f78,![],_0x112558(0x170)),this[_0x112558(0x221)](_0x11e402,_0x372dbf,_0x2b7f78),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x108103(0x3c7)]=function(){const _0x56bf86=_0x108103;return VisuMZ[_0x56bf86(0x3ae)][_0x56bf86(0x2d6)][_0x56bf86(0x325)]['LabelHitType'];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x231)]=function(){const _0x1164b5=_0x108103,_0x3670b9='HIT\x20TYPE';if(this[_0x1164b5(0x42c)][_0x3670b9])return this[_0x1164b5(0x42c)][_0x3670b9];const _0x3e8c4e=VisuMZ[_0x1164b5(0x3ae)][_0x1164b5(0x2d6)][_0x1164b5(0x325)],_0xa76774=_0x1164b5(0x5db)[_0x1164b5(0x423)](this[_0x1164b5(0x594)][_0x1164b5(0x3b3)]);return _0x3e8c4e[_0xa76774];},Window_ShopStatus['prototype'][_0x108103(0x506)]=function(_0x17fb6a,_0x260572,_0x2ead92){const _0x203826=_0x108103;if(this[_0x203826(0x594)][_0x203826(0x266)]['type']<=0x0)return _0x260572;if(this[_0x203826(0x445)](_0x17fb6a,_0x260572,_0x2ead92))_0x260572+=this[_0x203826(0x28d)]();if(this['drawItemDamageAmount'](_0x17fb6a,_0x260572,_0x2ead92))_0x260572+=this['lineHeight']();return this['resetFontSettings'](),_0x260572;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x445)]=function(_0x468d4b,_0x437cc6,_0x2cdc46){const _0x104e2a=_0x108103,_0x4b5fb8=this[_0x104e2a(0x5b7)]();this[_0x104e2a(0x503)](_0x4b5fb8,_0x468d4b,_0x437cc6,_0x2cdc46,!![]);const _0x55ea91=this[_0x104e2a(0x52f)]();return this[_0x104e2a(0x503)](_0x55ea91,_0x468d4b,_0x437cc6,_0x2cdc46,![],_0x104e2a(0x170)),this[_0x104e2a(0x221)](_0x468d4b,_0x437cc6,_0x2cdc46),this[_0x104e2a(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x5b7)]=function(){const _0x3d657e=_0x108103;return VisuMZ[_0x3d657e(0x3ae)][_0x3d657e(0x2d6)]['StatusWindow'][_0x3d657e(0x3b9)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x52f)]=function(){const _0x52b4c9=_0x108103,_0x1e5d1d=_0x52b4c9(0x2d1);if(this[_0x52b4c9(0x42c)][_0x1e5d1d])return this[_0x52b4c9(0x42c)][_0x1e5d1d];if(this[_0x52b4c9(0x594)][_0x52b4c9(0x266)]['elementId']<=-0x1)return VisuMZ[_0x52b4c9(0x3ae)][_0x52b4c9(0x2d6)][_0x52b4c9(0x325)]['ElementWeapon'];else{if(this['_item'][_0x52b4c9(0x266)][_0x52b4c9(0x4a0)]===0x0)return'EghfK'!==_0x52b4c9(0x47c)?VisuMZ[_0x52b4c9(0x3ae)][_0x52b4c9(0x2d6)][_0x52b4c9(0x325)]['ElementNone']:this[_0x52b4c9(0x28e)]();else{if(_0x52b4c9(0x22f)!==_0x52b4c9(0x247))return $dataSystem[_0x52b4c9(0x4cd)][this[_0x52b4c9(0x594)]['damage'][_0x52b4c9(0x4a0)]];else _0x24bba2=_0x1cc31e[_0x52b4c9(0x3b5)](_0x52c292(_0x3c16fe['$1'])*0.01*0xff)[_0x52b4c9(0x1bc)](0x0,0xff);}}},Window_ShopStatus['prototype']['drawItemDamageAmount']=function(_0x3f357b,_0x502838,_0x371fb8){const _0x56760a=_0x108103,_0x10ecf4=this[_0x56760a(0x3bd)]();this[_0x56760a(0x503)](_0x10ecf4,_0x3f357b,_0x502838,_0x371fb8,!![]),this[_0x56760a(0x5cd)]();const _0x3ed3ff=this[_0x56760a(0x1b3)](),_0x549ab1=ColorManager[_0x56760a(0x4d3)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x56760a(0x266)][_0x56760a(0x2f0)]]);return this[_0x56760a(0x2f2)](_0x549ab1),this[_0x56760a(0x503)](_0x3ed3ff,_0x3f357b,_0x502838,_0x371fb8,![],_0x56760a(0x170)),this[_0x56760a(0x221)](_0x3f357b,_0x502838,_0x371fb8),this[_0x56760a(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x3bd)]=function(){const _0x22499a=_0x108103;if(Imported[_0x22499a(0x197)]&&DataManager[_0x22499a(0x234)](this[_0x22499a(0x594)])!==_0x22499a(0x4da)){if(_0x22499a(0x4fc)===_0x22499a(0x159))this['playCursorSound'](),_0x4b2796['_scene'][_0x22499a(0x564)](),_0x1d46cb['_scene'][_0x22499a(0x3b7)]['smoothSelect'](-0x1);else return this['getItemDamageAmountLabelBattleCore']();}else return this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x179)]=function(){const _0x23fac9=_0x108103,_0x3006b2=VisuMZ[_0x23fac9(0x3ae)][_0x23fac9(0x2d6)]['StatusWindow'],_0x5dfaef=_0x23fac9(0x454)[_0x23fac9(0x423)](this['_item'][_0x23fac9(0x266)][_0x23fac9(0x2f0)]),_0x59d42b=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x23fac9(0x594)][_0x23fac9(0x266)][_0x23fac9(0x2f0)]];return _0x3006b2[_0x5dfaef][_0x23fac9(0x423)](_0x59d42b);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x5cd)]=function(){const _0x5dff4b=_0x108103,_0x345b10=$gameActors[_0x5dff4b(0x2b4)](0x1);this[_0x5dff4b(0x1aa)]=JsonEx['makeDeepCopy'](_0x345b10),this[_0x5dff4b(0x30a)]=JsonEx[_0x5dff4b(0x50e)](_0x345b10);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x1b3)]=function(){const _0x54bee2=_0x108103,_0x413098=_0x54bee2(0x575);if(this[_0x54bee2(0x42c)][_0x413098])return this['_customItemInfo'][_0x413098];if(Imported[_0x54bee2(0x197)]&&DataManager[_0x54bee2(0x234)](this[_0x54bee2(0x594)])!==_0x54bee2(0x4da))return this[_0x54bee2(0x3da)]();else{if(_0x54bee2(0x5a2)===_0x54bee2(0x5a2))return this[_0x54bee2(0x2a5)]();else this[_0x54bee2(0x2b0)](_0x5cf4df[_0x54bee2(0x23a)](_0x54bee2(0x49b)));}},Window_ShopStatus['prototype']['getItemDamageAmountTextOriginal']=function(){const _0x572a3b=_0x108103;window['a']=this[_0x572a3b(0x1aa)],window['b']=this[_0x572a3b(0x30a)],this['_tempActorA']['setShopStatusWindowMode'](!![]),this[_0x572a3b(0x30a)][_0x572a3b(0x144)]([0x3,0x4][_0x572a3b(0x4ff)](this[_0x572a3b(0x594)][_0x572a3b(0x266)][_0x572a3b(0x2f0)]));let _0x141d86=this[_0x572a3b(0x594)][_0x572a3b(0x266)][_0x572a3b(0x1e3)];try{if('ptvtx'!=='ptvtx')this[_0x572a3b(0x4ad)]();else{const _0x2070d8=Math[_0x572a3b(0x317)](eval(_0x141d86),0x0)/window['a'][_0x572a3b(0x2bd)];this[_0x572a3b(0x4f7)]();if(isNaN(_0x2070d8)){if(_0x572a3b(0x4a8)==='BbTGH')return _0x572a3b(0x2b3);else{this[_0x572a3b(0x58b)][_0x572a3b(0x3f4)]();const _0x1c4b34=this['_slotWindow'][_0x572a3b(0x25e)](),_0x155a27=this[_0x572a3b(0x58b)][_0x572a3b(0x517)][_0x572a3b(0x1ff)](_0x1c4b34),_0x60fe11=_0x36d08f[_0x572a3b(0x1b8)](this['_itemWindow'][_0x572a3b(0x566)]()/0x2)-0x1;this[_0x572a3b(0x58b)]['smoothSelect'](_0x155a27>=0x0?_0x155a27:0x0),this['_itemWindow']['setTopRow'](this[_0x572a3b(0x58b)]['index']()-_0x60fe11);}}else return'%1%'[_0x572a3b(0x423)](Math[_0x572a3b(0x3b5)](_0x2070d8*0x64));}}catch(_0x1f0b50){if(_0x572a3b(0x2a6)===_0x572a3b(0x2b6))_0x1611a0[_0x572a3b(0x4ab)][_0x572a3b(0x16f)](_0x2e9ae9['trim']());else return $gameTemp[_0x572a3b(0x3cd)]()&&(console['log'](_0x572a3b(0x417)['format'](this[_0x572a3b(0x594)]['name'])),console['log'](_0x1f0b50)),this[_0x572a3b(0x4f7)](),_0x572a3b(0x2b3);}},Window_ShopStatus['prototype']['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x288)]=function(_0x451568,_0x20439b,_0x145be4){const _0x179fab=_0x108103;if(!this['makeItemData']())return _0x20439b;if(this['drawItemEffectsHpRecovery'](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x461)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x16b)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x16a)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x48a)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this['drawItemEffectsTpDamage'](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x34e)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x508)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();if(this[_0x179fab(0x21b)](_0x451568,_0x20439b,_0x145be4))_0x20439b+=this[_0x179fab(0x28d)]();return this[_0x179fab(0x1e5)](),_0x20439b;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x4dc)]=function(){const _0x1b7ccd=_0x108103;return this['_item'][_0x1b7ccd(0x4e2)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x362)]=function(){const _0x2c0e2a=_0x108103;let _0x1b4989=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x4cd544=this[_0x2c0e2a(0x4dc)]();for(const _0x3558da of _0x4cd544){if('Ilipd'===_0x2c0e2a(0x451))return _0xd2c933[_0x2c0e2a(0x3ae)][_0x2c0e2a(0x598)][_0x2c0e2a(0x174)](this);else switch(_0x3558da[_0x2c0e2a(0x45d)]){case Game_Action[_0x2c0e2a(0x45e)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x3d4)]+=_0x3558da[_0x2c0e2a(0x434)],this[_0x2c0e2a(0x158)][_0x2c0e2a(0x33b)]+=_0x3558da['value2'],_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x56c)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x5b2)]+=_0x3558da['value1'],this['_itemData'][_0x2c0e2a(0x5d3)]+=_0x3558da[_0x2c0e2a(0x39c)],_0x1b4989=!![];break;case Game_Action['EFFECT_GAIN_TP']:this['_itemData'][_0x2c0e2a(0x3f0)]+=_0x3558da[_0x2c0e2a(0x434)],_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x5a3)]:this['_itemData'][_0x2c0e2a(0x3b4)][_0x2c0e2a(0x16f)](_0x3558da[_0x2c0e2a(0x4df)]),_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x162)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x573)][_0x2c0e2a(0x16f)](_0x3558da[_0x2c0e2a(0x4df)]),this[_0x2c0e2a(0x158)][_0x2c0e2a(0x3ea)]=!![],_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x2b8)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x1a7)][_0x3558da[_0x2c0e2a(0x4df)]]+=0x1,_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x483)]:this['_itemData'][_0x2c0e2a(0x1a7)][_0x3558da[_0x2c0e2a(0x4df)]]-=0x1,_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x571)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x194)][_0x2c0e2a(0x16f)](_0x3558da[_0x2c0e2a(0x4df)]),this[_0x2c0e2a(0x158)][_0x2c0e2a(0x3ea)]=!![],_0x1b4989=!![];break;case Game_Action[_0x2c0e2a(0x5bf)]:this[_0x2c0e2a(0x158)][_0x2c0e2a(0x4af)][_0x2c0e2a(0x16f)](_0x3558da[_0x2c0e2a(0x4df)]),this[_0x2c0e2a(0x158)]['removeStateBuffChanges']=!![],_0x1b4989=!![];break;}}if(this[_0x2c0e2a(0x158)][_0x2c0e2a(0x3b4)][_0x2c0e2a(0x468)]>0x0)this[_0x2c0e2a(0x158)]['addStateBuffChanges']=!![];for(let _0x1365f1=0x0;_0x1365f1<this[_0x2c0e2a(0x158)][_0x2c0e2a(0x1a7)]['length'];_0x1365f1++){if(_0x2c0e2a(0x37f)===_0x2c0e2a(0x38b)){const _0x4358cb=this[_0x2c0e2a(0x168)];_0x4358cb['drawText'](_0x3bc091,0x0,_0x86a5da['y'],_0x4358cb[_0x2c0e2a(0x24a)],'center');}else{if(this[_0x2c0e2a(0x158)][_0x2c0e2a(0x1a7)][_0x1365f1]!==0x0)this[_0x2c0e2a(0x158)][_0x2c0e2a(0x5c5)]=!![];}}this[_0x2c0e2a(0x594)]['tpGain']!==0x0&&(this[_0x2c0e2a(0x158)][_0x2c0e2a(0x440)]=this[_0x2c0e2a(0x594)][_0x2c0e2a(0x420)],_0x1b4989=!![]);const _0x227cab=[_0x2c0e2a(0x487),_0x2c0e2a(0x5d2),_0x2c0e2a(0x557),_0x2c0e2a(0x3e8),_0x2c0e2a(0x4ed),'TP\x20DAMAGE',_0x2c0e2a(0x1f7),'ADDED\x20EFFECTS','REMOVED\x20EFFECTS'];for(const _0x2b2d40 of _0x227cab){if(this[_0x2c0e2a(0x42c)][_0x2b2d40]){_0x1b4989=!![];break;}}return _0x1b4989;},Window_ShopStatus['prototype']['drawItemEffectsHpRecovery']=function(_0x56dd64,_0x1264e0,_0x1bf93b){const _0x163142=_0x108103,_0x541888='HP\x20RECOVERY';if(this[_0x163142(0x158)][_0x163142(0x3d4)]<=0x0&&this['_itemData'][_0x163142(0x33b)]<=0x0&&!this[_0x163142(0x42c)][_0x541888])return![];const _0x1f4cdb=this[_0x163142(0x2fe)]();this[_0x163142(0x503)](_0x1f4cdb,_0x56dd64,_0x1264e0,_0x1bf93b,!![]);const _0x3f99b7=this[_0x163142(0x502)]();return this['changeTextColor'](ColorManager[_0x163142(0x4d3)](0x1)),this['drawItemKeyData'](_0x3f99b7,_0x56dd64,_0x1264e0,_0x1bf93b,![],'right'),this['drawItemDarkRect'](_0x56dd64,_0x1264e0,_0x1bf93b),this[_0x163142(0x1e5)](),!![];},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryLabel']=function(){const _0x19792d=_0x108103,_0x137806=VisuMZ['ItemsEquipsCore'][_0x19792d(0x2d6)][_0x19792d(0x325)][_0x19792d(0x481)];return _0x137806[_0x19792d(0x423)](TextManager['hp']);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x502)]=function(){const _0xd8911=_0x108103,_0x2a4873='HP\x20RECOVERY';if(this[_0xd8911(0x42c)][_0x2a4873])return this[_0xd8911(0x42c)][_0x2a4873];let _0x7dca44='';if(this[_0xd8911(0x158)]['rateHP']>0x0)_0x7dca44+='+%1%'[_0xd8911(0x423)](Math[_0xd8911(0x1b8)](this['_itemData']['rateHP']*0x64));if(this[_0xd8911(0x158)]['rateHP']>0x0&&this['_itemData']['flatHP']>0x0)_0x7dca44+='\x20';if(this[_0xd8911(0x158)][_0xd8911(0x33b)]>0x0)_0x7dca44+=_0xd8911(0x1bd)['format'](this[_0xd8911(0x158)][_0xd8911(0x33b)]);return _0x7dca44;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x461)]=function(_0x3aeb53,_0x1a0dcf,_0x3f0753){const _0x2829d7=_0x108103,_0x390582=_0x2829d7(0x5d2);if(this['_itemData'][_0x2829d7(0x5b2)]<=0x0&&this['_itemData'][_0x2829d7(0x5d3)]<=0x0&&!this[_0x2829d7(0x42c)][_0x390582])return![];const _0x561353=this[_0x2829d7(0x36f)]();this[_0x2829d7(0x503)](_0x561353,_0x3aeb53,_0x1a0dcf,_0x3f0753,!![]);const _0x269669=this[_0x2829d7(0x1ea)]();return this[_0x2829d7(0x2f2)](ColorManager[_0x2829d7(0x4d3)](0x3)),this[_0x2829d7(0x503)](_0x269669,_0x3aeb53,_0x1a0dcf,_0x3f0753,![],_0x2829d7(0x170)),this['drawItemDarkRect'](_0x3aeb53,_0x1a0dcf,_0x3f0753),this[_0x2829d7(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x36f)]=function(){const _0x4747c9=_0x108103,_0x364128=VisuMZ[_0x4747c9(0x3ae)]['Settings'][_0x4747c9(0x325)]['LabelRecoverMP'];return _0x364128[_0x4747c9(0x423)](TextManager['mp']);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x1ea)]=function(){const _0x3a0f43=_0x108103,_0x466740=_0x3a0f43(0x5d2);if(this['_customItemInfo'][_0x466740])return this['_customItemInfo'][_0x466740];let _0x561e2d='';if(this[_0x3a0f43(0x158)][_0x3a0f43(0x5b2)]>0x0)_0x561e2d+='+%1%'[_0x3a0f43(0x423)](Math[_0x3a0f43(0x1b8)](this['_itemData']['rateMP']*0x64));if(this[_0x3a0f43(0x158)]['rateMP']>0x0&&this[_0x3a0f43(0x158)][_0x3a0f43(0x5d3)]>0x0)_0x561e2d+='\x20';if(this['_itemData'][_0x3a0f43(0x5d3)]>0x0)_0x561e2d+=_0x3a0f43(0x1bd)[_0x3a0f43(0x423)](this['_itemData'][_0x3a0f43(0x5d3)]);return _0x561e2d;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x16b)]=function(_0x4e097d,_0x1fd454,_0x4b4b71){const _0x89bed9=_0x108103,_0x4c11db=_0x89bed9(0x557);if(this[_0x89bed9(0x158)]['gainTP']<=0x0&&!this[_0x89bed9(0x42c)][_0x4c11db])return![];const _0x456844=this['getItemEffectsTpRecoveryLabel']();this[_0x89bed9(0x503)](_0x456844,_0x4e097d,_0x1fd454,_0x4b4b71,!![]);const _0x56ff25=this['getItemEffectsTpRecoveryText']();return this[_0x89bed9(0x2f2)](ColorManager[_0x89bed9(0x23b)]()),this[_0x89bed9(0x503)](_0x56ff25,_0x4e097d,_0x1fd454,_0x4b4b71,![],'right'),this[_0x89bed9(0x221)](_0x4e097d,_0x1fd454,_0x4b4b71),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x108103(0x2ab)]['getItemEffectsTpRecoveryLabel']=function(){const _0x2ec36b=_0x108103,_0x260566=VisuMZ['ItemsEquipsCore'][_0x2ec36b(0x2d6)][_0x2ec36b(0x325)][_0x2ec36b(0x316)];return _0x260566[_0x2ec36b(0x423)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x108103(0x331)]=function(){const _0x5a70f5=_0x108103,_0x50f210=_0x5a70f5(0x557);if(this[_0x5a70f5(0x42c)][_0x50f210])return this[_0x5a70f5(0x42c)][_0x50f210];let _0x2eeec4='';return _0x2eeec4+='+%1'[_0x5a70f5(0x423)](this['_itemData']['gainTP']),_0x2eeec4;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x34e)]=function(_0x468e47,_0x4338e1,_0x433b2a){const _0x1b1116=_0x108103,_0x3c0529='USER\x20TP\x20GAIN';if(this['_itemData']['selfTP']===0x0&&!this['_customItemInfo'][_0x3c0529])return![];const _0x4d9223=this[_0x1b1116(0x4ca)]();this[_0x1b1116(0x503)](_0x4d9223,_0x468e47,_0x4338e1,_0x433b2a,!![]);const _0x1c3e8f=this[_0x1b1116(0x4c3)]();return this[_0x1b1116(0x158)][_0x1b1116(0x440)]>0x0?this[_0x1b1116(0x2f2)](ColorManager[_0x1b1116(0x23b)]()):this[_0x1b1116(0x2f2)](ColorManager[_0x1b1116(0x204)]()),this[_0x1b1116(0x503)](_0x1c3e8f,_0x468e47,_0x4338e1,_0x433b2a,![],_0x1b1116(0x170)),this[_0x1b1116(0x221)](_0x468e47,_0x4338e1,_0x433b2a),this[_0x1b1116(0x1e5)](),!![];},Window_ShopStatus['prototype'][_0x108103(0x4ca)]=function(){const _0xc181d3=_0x108103,_0x2e7b27=VisuMZ[_0xc181d3(0x3ae)][_0xc181d3(0x2d6)]['StatusWindow'][_0xc181d3(0x36b)];return _0x2e7b27[_0xc181d3(0x423)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x108103(0x4c3)]=function(){const _0x3982fa=_0x108103,_0x21b385=_0x3982fa(0x1f7);if(this['_customItemInfo'][_0x21b385])return this[_0x3982fa(0x42c)][_0x21b385];let _0x1f7eef='';return this[_0x3982fa(0x158)][_0x3982fa(0x440)]>0x0?_0x3982fa(0x5dc)===_0x3982fa(0x293)?_0x28a689['setValue'](_0x31f18d['SwitchBuy'],!![]):_0x1f7eef+=_0x3982fa(0x1bd)[_0x3982fa(0x423)](this[_0x3982fa(0x158)][_0x3982fa(0x440)]):_0x3982fa(0x314)==='NruzK'?(_0x54a1b4['ItemsEquipsCore'][_0x3982fa(0x228)][_0x3982fa(0x174)](this),this['isUseModernControls']()&&this[_0x3982fa(0x47e)](),this[_0x3982fa(0x549)]()&&this[_0x3982fa(0x357)]()):_0x1f7eef+='%1'[_0x3982fa(0x423)](this[_0x3982fa(0x158)][_0x3982fa(0x440)]),_0x1f7eef;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x16a)]=function(_0x1a59e0,_0x47fb27,_0x39eedb){const _0x2725d1=_0x108103,_0x275b37=_0x2725d1(0x3e8);if(this[_0x2725d1(0x158)]['rateHP']>=0x0&&this[_0x2725d1(0x158)][_0x2725d1(0x33b)]>=0x0&&!this[_0x2725d1(0x42c)][_0x275b37])return![];const _0xfd16cb=this[_0x2725d1(0x2a1)]();this[_0x2725d1(0x503)](_0xfd16cb,_0x1a59e0,_0x47fb27,_0x39eedb,!![]);const _0x393571=this['getItemEffectsHpDamageText']();return this['changeTextColor'](ColorManager['damageColor'](0x0)),this[_0x2725d1(0x503)](_0x393571,_0x1a59e0,_0x47fb27,_0x39eedb,![],'right'),this['drawItemDarkRect'](_0x1a59e0,_0x47fb27,_0x39eedb),this[_0x2725d1(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x2a1)]=function(){const _0x3bcdd7=_0x108103,_0x50d1b0=VisuMZ[_0x3bcdd7(0x3ae)][_0x3bcdd7(0x2d6)][_0x3bcdd7(0x325)][_0x3bcdd7(0x42b)];return _0x50d1b0[_0x3bcdd7(0x423)](TextManager['hp']);},Window_ShopStatus['prototype']['getItemEffectsHpDamageText']=function(){const _0x1fc85d=_0x108103,_0x4275f4=_0x1fc85d(0x3e8);if(this[_0x1fc85d(0x42c)][_0x4275f4])return this['_customItemInfo'][_0x4275f4];let _0x1cd1af='';if(this[_0x1fc85d(0x158)][_0x1fc85d(0x3d4)]<0x0)_0x1cd1af+=_0x1fc85d(0x1f5)[_0x1fc85d(0x423)](Math['floor'](this[_0x1fc85d(0x158)][_0x1fc85d(0x3d4)]*0x64));if(this[_0x1fc85d(0x158)][_0x1fc85d(0x3d4)]<0x0&&this[_0x1fc85d(0x158)][_0x1fc85d(0x33b)]<0x0)_0x1cd1af+='\x20';if(this[_0x1fc85d(0x158)][_0x1fc85d(0x33b)]<0x0)_0x1cd1af+='%1'[_0x1fc85d(0x423)](this[_0x1fc85d(0x158)][_0x1fc85d(0x33b)]);return _0x1cd1af;},Window_ShopStatus['prototype'][_0x108103(0x48a)]=function(_0xd56d70,_0x51ac4b,_0x34e57a){const _0x4a7b95=_0x108103,_0x382abc=_0x4a7b95(0x4ed);if(this[_0x4a7b95(0x158)]['rateMP']>=0x0&&this[_0x4a7b95(0x158)][_0x4a7b95(0x5d3)]>=0x0&&!this['_customItemInfo'][_0x382abc])return![];const _0x166630=this[_0x4a7b95(0x524)]();this['drawItemKeyData'](_0x166630,_0xd56d70,_0x51ac4b,_0x34e57a,!![]);const _0x1422c5=this[_0x4a7b95(0x476)]();return this[_0x4a7b95(0x2f2)](ColorManager[_0x4a7b95(0x4d3)](0x2)),this[_0x4a7b95(0x503)](_0x1422c5,_0xd56d70,_0x51ac4b,_0x34e57a,![],_0x4a7b95(0x170)),this[_0x4a7b95(0x221)](_0xd56d70,_0x51ac4b,_0x34e57a),this[_0x4a7b95(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x524)]=function(){const _0x4f29af=_0x108103,_0x465b53=VisuMZ[_0x4f29af(0x3ae)][_0x4f29af(0x2d6)][_0x4f29af(0x325)][_0x4f29af(0x39b)];return _0x465b53[_0x4f29af(0x423)](TextManager['mp']);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x476)]=function(){const _0x421e48=_0x108103,_0x20ffaa=_0x421e48(0x4ed);if(this['_customItemInfo'][_0x20ffaa])return this[_0x421e48(0x42c)][_0x20ffaa];let _0x5609d6='';if(this[_0x421e48(0x158)]['rateMP']<0x0)_0x5609d6+=_0x421e48(0x1f5)[_0x421e48(0x423)](Math[_0x421e48(0x1b8)](this['_itemData']['rateMP']*0x64));if(this[_0x421e48(0x158)][_0x421e48(0x5b2)]<0x0&&this[_0x421e48(0x158)][_0x421e48(0x5d3)]<0x0)_0x5609d6+='\x20';if(this[_0x421e48(0x158)][_0x421e48(0x5d3)]<0x0)_0x5609d6+='%1'['format'](this[_0x421e48(0x158)][_0x421e48(0x5d3)]);return _0x5609d6;},Window_ShopStatus['prototype'][_0x108103(0x52c)]=function(_0x4f5069,_0x5757b2,_0x340803){const _0x36d311=_0x108103,_0x130531=_0x36d311(0x4a3);if(this['_itemData'][_0x36d311(0x3f0)]>=0x0&&!this[_0x36d311(0x42c)][_0x130531])return![];const _0x155386=this[_0x36d311(0x4b8)]();this['drawItemKeyData'](_0x155386,_0x4f5069,_0x5757b2,_0x340803,!![]);const _0x5cb7c8=this[_0x36d311(0x329)]();return this[_0x36d311(0x2f2)](ColorManager[_0x36d311(0x204)]()),this['drawItemKeyData'](_0x5cb7c8,_0x4f5069,_0x5757b2,_0x340803,![],_0x36d311(0x170)),this[_0x36d311(0x221)](_0x4f5069,_0x5757b2,_0x340803),this[_0x36d311(0x1e5)](),!![];},Window_ShopStatus['prototype'][_0x108103(0x4b8)]=function(){const _0x23e7e3=_0x108103,_0x11b025=VisuMZ[_0x23e7e3(0x3ae)][_0x23e7e3(0x2d6)]['StatusWindow'][_0x23e7e3(0x4fb)];return _0x11b025[_0x23e7e3(0x423)](TextManager['tp']);},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x329)]=function(){const _0x3e07a4=_0x108103,_0x56bbbe=_0x3e07a4(0x4a3);if(this[_0x3e07a4(0x42c)][_0x56bbbe])return this[_0x3e07a4(0x42c)][_0x56bbbe];let _0x381ffe='';return _0x381ffe+='%1'[_0x3e07a4(0x423)](this['_itemData']['gainTP']),_0x381ffe;},Window_ShopStatus[_0x108103(0x2ab)]['drawItemEffectsAddedStatesBuffs']=function(_0x15d611,_0x2e1b6a,_0x456134){const _0x16fac3=_0x108103,_0x3c2831=_0x16fac3(0x55c);if(!this[_0x16fac3(0x158)]['addStateBuffChanges']&&!this[_0x16fac3(0x42c)][_0x3c2831])return![];const _0x8fe951=this[_0x16fac3(0x206)]();this[_0x16fac3(0x503)](_0x8fe951,_0x15d611,_0x2e1b6a,_0x456134,!![]);const _0x1b505c=this[_0x16fac3(0x153)]();return this['drawItemKeyData'](_0x1b505c,_0x15d611,_0x2e1b6a,_0x456134,![],_0x16fac3(0x170)),this[_0x16fac3(0x221)](_0x15d611,_0x2e1b6a,_0x456134),this[_0x16fac3(0x1e5)](),!![];},Window_ShopStatus['prototype'][_0x108103(0x206)]=function(){const _0x5b2242=_0x108103;return VisuMZ[_0x5b2242(0x3ae)][_0x5b2242(0x2d6)][_0x5b2242(0x325)][_0x5b2242(0x165)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x153)]=function(){const _0x21ffaa=_0x108103,_0xee27e4=_0x21ffaa(0x55c);if(this[_0x21ffaa(0x42c)][_0xee27e4])return this[_0x21ffaa(0x42c)][_0xee27e4];let _0x13005c='',_0x1dc486=0x0;const _0x32ff83=0x8;for(const _0x104d40 of this[_0x21ffaa(0x158)]['addState']){const _0x2411cd=$dataStates[_0x104d40];if(_0x2411cd&&_0x2411cd[_0x21ffaa(0x482)]>0x0){_0x13005c+=_0x21ffaa(0x277)[_0x21ffaa(0x423)](_0x2411cd[_0x21ffaa(0x482)]),_0x1dc486++;if(_0x1dc486>=_0x32ff83)return _0x13005c;}}for(let _0x1af3d9=0x0;_0x1af3d9<this[_0x21ffaa(0x158)]['changeBuff'][_0x21ffaa(0x468)];_0x1af3d9++){const _0x244145=this[_0x21ffaa(0x158)][_0x21ffaa(0x1a7)][_0x1af3d9],_0x412214=Game_BattlerBase[_0x21ffaa(0x2ab)][_0x21ffaa(0x260)](_0x244145,_0x1af3d9);if(_0x412214>0x0){if(_0x21ffaa(0x51a)===_0x21ffaa(0x51a)){_0x13005c+=_0x21ffaa(0x277)[_0x21ffaa(0x423)](_0x412214),_0x1dc486++;if(_0x1dc486>=_0x32ff83)return _0x13005c;}else for(const _0x10e431 of _0x12e683['equipTypes']){const _0x2797cb=_0x294d29[_0x21ffaa(0x3dd)][_0x21ffaa(0x1ff)](_0x10e431[_0x21ffaa(0x425)]());if(_0x2797cb>0x0)_0x509fb3[_0x21ffaa(0x4fd)][_0x21ffaa(0x16f)](_0x2797cb);}}}return _0x13005c;},Window_ShopStatus[_0x108103(0x2ab)]['drawItemEffectsRemovedStatesBuffs']=function(_0x11d77f,_0x2506b3,_0x58225f){const _0x53e35e=_0x108103,_0x61c9c3=_0x53e35e(0x442);if(!this['_itemData'][_0x53e35e(0x3ea)]&&!this[_0x53e35e(0x42c)][_0x61c9c3])return![];const _0xb14dcd=this['getItemEffectsRemovedStatesBuffsLabel']();this['drawItemKeyData'](_0xb14dcd,_0x11d77f,_0x2506b3,_0x58225f,!![]);const _0x41b896=this[_0x53e35e(0x18b)]();return this[_0x53e35e(0x503)](_0x41b896,_0x11d77f,_0x2506b3,_0x58225f,![],'right'),this[_0x53e35e(0x221)](_0x11d77f,_0x2506b3,_0x58225f),this[_0x53e35e(0x1e5)](),!![];},Window_ShopStatus[_0x108103(0x2ab)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x1de18e=_0x108103;return VisuMZ[_0x1de18e(0x3ae)][_0x1de18e(0x2d6)][_0x1de18e(0x325)][_0x1de18e(0x3af)];},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x18b)]=function(){const _0x259db4=_0x108103,_0x355e35='REMOVED\x20EFFECTS';if(this[_0x259db4(0x42c)][_0x355e35])return this[_0x259db4(0x42c)][_0x355e35];let _0x1d3880='',_0x17904a=0x0;const _0x39d683=VisuMZ[_0x259db4(0x3ae)]['Settings'][_0x259db4(0x325)][_0x259db4(0x315)];for(const _0x5a1c7d of this['_itemData'][_0x259db4(0x573)]){if(_0x259db4(0x4d4)!==_0x259db4(0x32c)){const _0x2c2842=$dataStates[_0x5a1c7d];if(_0x2c2842&&_0x2c2842['iconIndex']>0x0){if(_0x259db4(0x248)===_0x259db4(0x49a))this['_statusWindow']=_0x4fcf3a,this[_0x259db4(0x169)]();else{_0x1d3880+=_0x259db4(0x277)['format'](_0x2c2842[_0x259db4(0x482)]),_0x17904a++;if(_0x17904a>=_0x39d683)return _0x1d3880;}}}else{_0x1dbd61+=_0x259db4(0x277)[_0x259db4(0x423)](_0xbc441c),_0x219645++;if(_0x162c21>=_0x5a54f0)return _0x2ed164;}}for(let _0x3353bd=0x0;_0x3353bd<this['_itemData'][_0x259db4(0x194)][_0x259db4(0x468)];_0x3353bd++){if('ySdwQ'==='QiIgU')_0x5e2c2c[_0x259db4(0x191)](_0x3ea3c3[_0x259db4(0x3dc)],!![]);else{const _0x45cc6=Game_BattlerBase[_0x259db4(0x2ab)][_0x259db4(0x260)](0x1,_0x3353bd);if(_0x45cc6>0x0){if('ehISI'!==_0x259db4(0x212))return!![];else{_0x1d3880+='\x5cI[%1]'['format'](_0x45cc6),_0x17904a++;if(_0x17904a>=_0x39d683)return _0x1d3880;}}}}for(let _0x5eae4c=0x0;_0x5eae4c<this[_0x259db4(0x158)]['removeDebuff'][_0x259db4(0x468)];_0x5eae4c++){if('xycaS'!=='xycaS')this['isGoodShown'](_0x172829)?this['_goodsCount']++:_0x331229[_0x259db4(0x16f)](_0x23858f);else{const _0x3d38e4=Game_BattlerBase['prototype'][_0x259db4(0x260)](-0x1,_0x5eae4c);if(_0x3d38e4>0x0){_0x1d3880+=_0x259db4(0x277)[_0x259db4(0x423)](_0x3d38e4),_0x17904a++;if(_0x17904a>=_0x39d683)return _0x1d3880;}}}return _0x1d3880;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x14a)]=function(_0x4549a2,_0x24a799,_0xe769a2){const _0x42b81f=_0x108103;if(this[_0x42b81f(0x594)][_0x42b81f(0x412)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x42b81f(0x429)!==_0x42b81f(0x2a7)){const _0x3f0a02=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1199fd of _0x3f0a02){if(_0x1199fd['match'](/(.*):[ ](.*)/i)){if('RZdnd'!==_0x42b81f(0x408)){const _0x4123e0=String(RegExp['$1'])[_0x42b81f(0x425)](),_0x3e6d8c=String(RegExp['$2'])[_0x42b81f(0x425)]();this[_0x42b81f(0x265)](_0x4123e0,_0x3e6d8c,_0x4549a2,_0x24a799,_0xe769a2),_0x24a799+=this[_0x42b81f(0x28d)]();}else return _0x1141eb[_0x42b81f(0x3ae)][_0x42b81f(0x2d6)]['ShopScene']['LayoutStyle'];}}}else this[_0x42b81f(0x54b)]();}return this[_0x42b81f(0x1e5)](),_0x24a799;},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x265)]=function(_0x26002b,_0x147de7,_0x15da36,_0x374d23,_0x2028cb){const _0x36262c=_0x108103;this['drawItemKeyData'](_0x26002b,_0x15da36,_0x374d23,_0x2028cb,!![]),this['drawItemKeyData'](_0x147de7,_0x15da36,_0x374d23,_0x2028cb,![],_0x36262c(0x170)),this[_0x36262c(0x221)](_0x15da36,_0x374d23,_0x2028cb),this[_0x36262c(0x1e5)]();},Window_ShopStatus[_0x108103(0x2ab)]['drawCustomShopGraphic']=function(){const _0xf6e58c=_0x108103;if(!this['_item'])return;const _0x40c627=this[_0xf6e58c(0x594)][_0xf6e58c(0x412)],_0x4cbed7=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x484625=_0x40c627[_0xf6e58c(0x1a3)](_0x4cbed7);if(_0x484625){if(_0xf6e58c(0x2ae)!==_0xf6e58c(0x2ae))return this[_0xf6e58c(0x376)]();else for(const _0x240779 of _0x484625){if('zpDPR'!=='WkvOY'){_0x240779['match'](_0x4cbed7);const _0x29ba89=String(RegExp['$1'])[_0xf6e58c(0x425)]()||'';if(_0x29ba89==='')continue;const _0x220af8=ImageManager[_0xf6e58c(0x4e7)](_0x29ba89);_0x220af8[_0xf6e58c(0x12c)](this[_0xf6e58c(0x378)][_0xf6e58c(0x20d)](this,_0x220af8,this[_0xf6e58c(0x594)]));}else this[_0xf6e58c(0x59c)][_0xf6e58c(0x37b)](0x0),this[_0xf6e58c(0x3b7)][_0xf6e58c(0x518)]();}}},Window_ShopStatus[_0x108103(0x2ab)][_0x108103(0x378)]=function(_0x5a848c,_0x2615a5){const _0x35e753=_0x108103;if(this[_0x35e753(0x594)]!==_0x2615a5)return;if(!_0x5a848c)return;if(_0x5a848c[_0x35e753(0x2f7)]<=0x0||_0x5a848c[_0x35e753(0x157)]<=0x0)return;const _0x42122f=_0x2615a5[_0x35e753(0x412)];let _0x1cf54e=_0x35e753(0x2c8);_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x1cf54e=_0x35e753(0x292));const _0x5410ab=_0x1cf54e===_0x35e753(0x2c8)?this[_0x35e753(0x532)]:this[_0x35e753(0x1e8)];let _0x1dc810=this[_0x35e753(0x24a)],_0x5e8d85=this[_0x35e753(0x4d5)];_0x42122f['match'](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x1dc810=Number(RegExp['$1']));if(_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)){if('aNQvn'!==_0x35e753(0x43b))_0x5e8d85=Number(RegExp['$1']);else{if(_0x6e4417[_0x35e753(0x3a6)]&&_0x17b31d[_0x35e753(0x5c3)]!==_0x30c821)return _0x23a1f7[_0x35e753(0x5c3)];else{if(this[_0x35e753(0x398)]())return this[_0x35e753(0x2d7)]()[_0x35e753(0x1a3)](/RIGHT/i);else _0x60f650[_0x35e753(0x2ab)][_0x35e753(0x24d)][_0x35e753(0x174)](this);}}}if(_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)){if(_0x35e753(0x4dd)===_0x35e753(0x53f)){if(this['isItem'](_0xa4d10a))return _0x4209e8['ItemsEquipsCore']['Settings'][_0x35e753(0x509)][_0x35e753(0x596)];else{if(this[_0x35e753(0x4a4)](_0x264cb8))return _0x27bf41[_0x35e753(0x3ae)][_0x35e753(0x2d6)][_0x35e753(0x509)][_0x35e753(0x4d8)];else{if(this['isArmor'](_0x35d231))return _0x144cf4[_0x35e753(0x3ae)]['Settings'][_0x35e753(0x509)]['MaxArmors'];}}}else _0x1dc810=Number(RegExp['$1']),_0x5e8d85=Number(RegExp['$2']);}const _0x14d733=Math[_0x35e753(0x31e)](0x1,_0x1dc810/_0x5a848c[_0x35e753(0x2f7)],_0x5e8d85/_0x5a848c[_0x35e753(0x157)]);let _0x592084=0x0,_0x3a3033=0x0,_0x313053=Math[_0x35e753(0x1b8)](_0x5a848c[_0x35e753(0x2f7)]*_0x14d733),_0x531ac7=Math[_0x35e753(0x1b8)](_0x5a848c[_0x35e753(0x157)]*_0x14d733),_0x2e107d=_0x35e753(0x565);_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x2e107d=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x2e107d===_0x35e753(0x49b))_0x592084=0x0;else _0x2e107d===_0x35e753(0x565)?_0x592084=Math[_0x35e753(0x3b5)]((this[_0x35e753(0x24a)]-_0x313053)/0x2):_0x592084=this[_0x35e753(0x24a)]-_0x313053;let _0x116f37=_0x35e753(0x346);if(_0x42122f['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)){if(_0x35e753(0x4e3)===_0x35e753(0x4e3))_0x116f37=String(RegExp['$1'])[_0x35e753(0x18a)]()[_0x35e753(0x425)]();else{const _0x1b3483=_0x35e753(0x4ed);if(this[_0x35e753(0x42c)][_0x1b3483])return this['_customItemInfo'][_0x1b3483];let _0x5493c6='';if(this['_itemData'][_0x35e753(0x5b2)]<0x0)_0x5493c6+=_0x35e753(0x1f5)['format'](_0x4ca84e[_0x35e753(0x1b8)](this[_0x35e753(0x158)][_0x35e753(0x5b2)]*0x64));if(this[_0x35e753(0x158)][_0x35e753(0x5b2)]<0x0&&this[_0x35e753(0x158)][_0x35e753(0x5d3)]<0x0)_0x5493c6+='\x20';if(this[_0x35e753(0x158)][_0x35e753(0x5d3)]<0x0)_0x5493c6+='%1'['format'](this[_0x35e753(0x158)]['flatMP']);return _0x5493c6;}}if(_0x116f37===_0x35e753(0x16e))_0x3a3033=0x0;else{if(_0x116f37==='middle'){if('vAsWN'!==_0x35e753(0x13f))_0x3a3033=Math[_0x35e753(0x3b5)]((this[_0x35e753(0x4d5)]-_0x531ac7)/0x2);else return _0x15319a;}else _0x3a3033=this[_0x35e753(0x4d5)]-_0x531ac7;}_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x592084+=Number(RegExp['$1']));if(_0x42122f['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x35e753(0x471)!==_0x35e753(0x471))return![];else _0x3a3033+=Number(RegExp['$1']);}_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x592084+=Number(RegExp['$1']),_0x3a3033+=Number(RegExp['$2']));let _0x55ec41=0xff;if(_0x42122f[_0x35e753(0x1a3)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x55ec41=Number(RegExp['$1']);else{if(_0x42122f['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if(_0x35e753(0x27f)!==_0x35e753(0x27f)){const _0x4bc025=this[_0x35e753(0x168)];_0x4bc025['contents'][_0x35e753(0x53d)]();const _0x3921ff=this[_0x35e753(0x2d5)](this[_0x35e753(0x324)]());if(_0x3921ff===_0x35e753(0x1d2)){const _0x400776=this['itemLineRect'](this[_0x35e753(0x324)]());let _0x41920d=this[_0x35e753(0x26e)](this[_0x35e753(0x324)]());_0x41920d=_0x41920d['replace'](/\\I\[(\d+)\]/gi,''),_0x4bc025[_0x35e753(0x1e5)](),this[_0x35e753(0x19f)](_0x41920d,_0x400776),this[_0x35e753(0x3fd)](_0x41920d,_0x400776),this[_0x35e753(0x1c6)](_0x41920d,_0x400776);}}else _0x55ec41=Math[_0x35e753(0x3b5)](Number(RegExp['$1'])*0.01*0xff)[_0x35e753(0x1bc)](0x0,0xff);}}_0x5410ab[_0x35e753(0x259)]=_0x55ec41,_0x5410ab[_0x35e753(0x4b3)](_0x5a848c,0x0,0x0,_0x5a848c[_0x35e753(0x2f7)],_0x5a848c[_0x35e753(0x157)],_0x592084,_0x3a3033,_0x313053,_0x531ac7),_0x5410ab[_0x35e753(0x259)]=0xff;};function _0x5030(){const _0x186087=['reloadMapIfUpdated','buyWindowRectItemsEquipsCore','categoryNameWindowDrawText','ConvertNumberToString','drawTextEx','occasion','List','prepareItemCustomData','itemTextAlign','NbDjU','_list','XeBfY','splice','PQbYV','Scene_Shop_onBuyOk','107435DMKkOa','_newItemsList','nonRemovableEtypes','drawUpdatedAfterParamValue','drawItemStyleIcon','Scene_Shop_createSellWindow','commandBuy','yonmB','note','postCreateItemsEquipsCore','textSizeEx','exit','SPEED','Damage\x20Formula\x20Error\x20for\x20%1','Step2Start','Game_Actor_forceChangeEquip','Window_Selectable_initialize','categoryStyle','STR','hide','itemWindowRect','drawCurrencyValue','tpGain','Window_ShopBuy_price','_actor','format','gainItem','trim','Step3Start','(+%1)','mainFontSize','pRPeV','_category','LabelDamageHP','_customItemInfo','buyWindowRect','itemPadding','processTouchModernControls','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','checkShiftRemoveShortcut','LabelSpeed','yIyeS','value1','addEquipCommand','fontSize','drawItemScope','KRdke','SellPriceRate','icREE','QoWXl','repeats','pagedown','%1-%2','isEquipItem','selfTP','kcxfa','REMOVED\x20EFFECTS','numItems','Categories','drawItemDamageElement','postCreateSlotWindowItemsEquipsCore','drawUpdatedParamName','SQvfm','OCCASION','getItemRepeatsText','isArmor','hideNewLabelSprites','_buyWindow','meetsItemConditions','drawItemSpeed','hIPju','nhocO','ListWindowCols','zLYCY','DamageType%1','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Item_setObject','getItemsEquipsCoreBackColor2','QgqRs','sell','isUseModernControls','439652wUXFOJ','toUpperCase','code','EFFECT_RECOVER_HP','OffsetX','addInnerChild','drawItemEffectsMpRecovery','active','LfSbS','remove','activateSellWindow','getItemOccasionText','ZEROZ','length','gjVtf','BuyPriceJS','EquipScene','Step1Start','PeoQN','Scene_Shop_doSell','pvXDx','uiHelpPosition','DGWwR','Scene_Shop_commandBuy','updateHelp','WlWjT','ParamValueFontSize','getItemEffectsMpDamageText','playCursorSound','MEkCi','isGoodShown','FsLrY','cursorRight','ghmtS','armorTypes','postCreateItemWindowModernControls','_statusWindow','_resetFontColor','LabelRecoverHP','iconIndex','EFFECT_ADD_DEBUFF','Window_EquipItem_isEnabled','itemDataFontSize','isArtifact','HP\x20RECOVERY','refreshCursor','CmdIconBuy','drawItemEffectsMpDamage','getItemQuantityText','getItemIdWithName','qunsX','OffsetY','Window_EquipCommand_initialize','paramValueByName','HtpQB','changeEquip','dItYO','changePaintOpacity','createCommandNameWindow','OxHcR','tNpiy','sbecX','DEF','yMmmM','left','_calculatingJSParameters','isCommandEnabled','Game_Actor_equips_artifacts','wlHsN','elementId','Hwbci','Scene_Equip_statusWindowRect','TP\x20DAMAGE','isWeapon','gYUfl','limitedPageUpDownSceneCheck','categoryWindowRect','BbTGH','updateMoneyAmount','gAkVa','categories','drawUpdatedParamValueDiff','onTouchOk','setNewItem','removeDebuff','updateChangedSlots','ScopeAlliesButUser','NotConsumable','blt','versionId','KeyItemProtect','createBitmap','auto','getItemEffectsTpDamageLabel','Window_Selectable_refresh','process_VisuMZ_ItemsEquipsCore_Notetags','zivqW','value','Scene_Equip_slotWindowRect','paramId','DrawEquipData','adjustItemWidthByStatus','Width','gAQAd','getItemEffectsSelfTpGainText','setItem','setHandler','ShiftShortcutKey','DrawParamJS','rWBwF','price','getItemEffectsSelfTpGainLabel','UOaoC','jgxhx','elements','iluYo','oVXjt','sellingPrice','BEqoY','ParseAllNotetags','damageColor','Jcmzt','innerHeight','Scene_Shop_onSellOk','mainFontFace','MaxWeapons','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','MANUAL','ExtDisplayedParams','getItemEffects','nksuK','Window_EquipStatus_refresh','dataId','getItemRepeatsLabel','eEaAC','effects','xKwCO','Game_Party_initialize','weapon-%1','LdPHS','loadPicture','AlwaysUsable','LNDNe','getItemSpeedLabel','LayoutStyle','RemoveEquipIcon','MP\x20DAMAGE','ShopScene','isDualWield','WQoUu','releaseUnequippableItems','_newLabelSprites','ScopeRandomAllies','\x5cb%1\x5cb','isOptimizeCommandAdded','daBTu','revertGlobalNamespaceVariables','BSWVq','process_VisuMZ_ItemsEquipsCore_RegExp','CmdCancelRename','LabelDamageTP','NtlVd','equipSlots','helpWindowRect','includes','onTouchSelectModernControls','setCategory','getItemEffectsHpRecoveryText','drawItemKeyData','itemWindowRectItemsEquipsCore','processCursorHomeEndTrigger','drawItemDamage','104WNRwjz','drawItemEffectsAddedStatesBuffs','ItemScene','CmdIconClear','ARRAYJSON','drawCustomShopGraphic','gcgDE','makeDeepCopy','text','ParamChangeFontSize','kXkvd','OkkwG','ItemQuantityFmt','BNSge','lQOih','param','_data','deactivate','maxItems','FbqQG','zXxqw','KYaHN','FadeSpeed','proxyItem','loadSystem','addCommand','rIMFd','Speed0','activate','getItemEffectsMpDamageLabel','traitObjects','goldWindowRectItemsEquipsCore','ItemSceneAdjustItemList','getInputButtonString','YVfzC','playOkSound','BorderRegExp','drawItemEffectsTpDamage','OsTou','log','getItemDamageElementText','AABbF','processCursorSpecialCheckModernControls','contentsBack','doSell','ZXBgR','iskOm','zdDoO','pQghO','Game_Actor_changeEquip','Speed1','canShiftRemoveEquipment','paramJS','FontFace','clear','numberWindowRect','BRoEC','sellPriceRate','visible','tradeItemWithParty','gErel','edlkr','buttonAssistSmallIncrement','onSellOkItemsEquipsCore','pEcGy','RejCN','allowCreateStatusWindow','getItemSuccessRateText','cursorPageup','EYFxl','equip','EVAL','canConsumeItem','nextActor','UAmmX','oaUhK','atypeId','helpAreaTop','textColor','#%1','TP\x20RECOVERY','JSON','Game_Actor_tradeItemWithParty','slotWindowRect','nonOptimizeEtypes','ADDED\x20EFFECTS','discardEquip','commandStyle','playEquip','CmdIconCancel','_shopStatusMenuAlly','Scene_Item_helpWindowRect','parse','commandEquip','center','maxVisibleItems','drawActorCharacter','FontSize','Parse_Notetags_Prices','Icon','getTextColor','EFFECT_RECOVER_MP','UwOuY','ARRAYSTR','xFNhj','RegularItems','EFFECT_REMOVE_BUFF','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','removeState','iconWidth','DAMAGE\x20MULTIPLIER','drawing','drawIcon','calcWindowHeight','addBuyCommand','meXYO','CdSxG','fontFace','Scene_Shop_onSellCancel','getArmorIdWithName','onBuyOk','jHoIb','maBIx','cursorPagedown','Scene_Equip_onSlotOk','FVETH','speed','drawItemActorMenuImage','isSceneShop','Step3End','drawItemNumber','EejmH','_itemWindow','FUNC','Scene_Item_itemWindowRect','weaponTypes','numberWindowRectItemsEquipsCore','_categoryWindow','FadeLimit','isOptimizeEquipOk','_cache','_item','SetupProxyItemGroup','MaxItems','Game_BattlerBase_canEquip_artifact','Scene_Equip_commandWindowRect','Scene_Item_categoryWindowRect','test','GyMNV','_commandWindow','currentExt','fByaz','Pginl','Scene_Shop_onBuyCancel','itemHasEquipLimit','FMrPY','EFFECT_ADD_STATE','onCategoryCancelItemsEquipsCore','ThuMn','IMHUA','categoryList','Slots','Game_Party_gainItem','Window_Selectable_setHelpWindowItem','Scene_Shop_statusWindowRect','_allowArtifactTraitObjects','_weaponIDs','onTouchSelect','QUANTITY','Game_BattlerBase_param_artifact','NoChangeMarker','rateMP','getInputMultiButtonStrings','doBuy','Scene_Equip_itemWindowRect','WfLIo','getItemDamageElementLabel','maxBattleMembers','puceJ','AGI','A%1','initNewItemsList','addClearCommand','split','EFFECT_REMOVE_DEBUFF','addSellCommand','onMenuImageLoad','weapon','uiInputPosition','Scene_Shop_categoryWindowRect','addStateBuffChanges','BwQyf','modifiedBuyPriceItemsEquipsCore','Scene_Equip_createSlotWindow','sellWindowRectItemsEquipsCore','setupBattleTestItems','buttonAssistText3','nFNyn','setupItemDamageTempActors','UkncA','fyjtk','paramPlusItemsEquipsCoreCustomJS','QVZez','MP\x20RECOVERY','flatMP','statusWindowRect','NEmPn','setMp','isShowNew','VRbAS','constructor','buttonAssistItemListRequirement','HitType%1','pdbjj','addLoadListener','smallParamFontSize','lfpXW','plvTS','EquipParams','select','setTempActor','Scene_Shop_onCategoryCancel','setBackgroundType','hitIndex','_handlers','Scene_Item_createCategoryWindow','PYigr','WLogS','WbtZO','Translucent','determineBaseSellingPrice','resetShopSwitches','ZTbND','HOCCP','drawItemHitType','scope','ItemMenuStatusRect','getMatchingInitEquip','setShopStatusWindowMode','GBrjl','isClicked','OjyTG','Parse_Notetags_EnableJS','LgVBU','drawItemCustomEntries','NonRemoveETypes','Game_Actor_discardEquip','TJhpV','Scene_Shop_commandWindowRect','artifacts','isRepeated','_purchaseOnly','setObject','getItemEffectsAddedStatesBuffsText','WAmmK','buttonAssistKey1','drawItemSuccessRate','height','_itemData','ZdKQP','isClearCommandAdded','fontSizeRatio','isEquipCommandEnabled','Parse_Notetags_Batch','YVSme','_numberWindow','drawItemData','refreshItemsEquipsCoreNoMenuImage','EFFECT_REMOVE_STATE','category','Enable','LabelApply','setHelpWindowItem','params','_categoryNameWindow','callUpdateHelp','drawItemEffectsHpDamage','drawItemEffectsTpRecovery','_buttonAssistWindow','jYRiQ','top','push','right','getWeaponIdWithName','bestEquipItem','fgrHM','call','LabelRepeats','buttonAssistKey2','DrawPortraitJS','equipAdjustHpMp','getItemDamageAmountLabelOriginal','canEquip','buttonAssistCategory','LldXC','4167387ipuNdW','prepare','isShiftRemoveShortcutEnabled','_money','_sellWindow','tFhVg','Window_ShopBuy_refresh','AllArmors','setHp','drawPossession','SellPriceJS','qQQTc','createNewLabelSprite','toLowerCase','getItemEffectsRemovedStatesBuffsText','convertInitEquipsToItems','THBCB','onSlotOkAutoSelect','onSlotCancel','vWKdy','setValue','CmdStyle','onBuyCancelItemsEquipsCore','removeBuff','YZVAn','checkItemConditionsSwitchNotetags','VisuMZ_1_BattleCore','CmdHideDisabled','uhssO','switchProxyItem','rYXNH','drawItemName','EquipAdjustHpMp','qxmEX','categoryNameWindowDrawBackground','15705zWtfYJ','IxXqP','equips','match','Scene_Shop_numberWindowRect','VgUfy','placeItemNewLabel','changeBuff','getItemEffectsTpRecoveryLabel','xFCCt','_tempActorA','DrawFaceJS','yZsrA','Scene_Shop_sellingPrice','nKWLg','Param','Window_ShopCommand_initialize','isClearEquipOk','consumable','getItemDamageAmountText','nnKkQ','eQJPq','CZKro','ParseWeaponNotetags','floor','buyingPrice','createItemWindow','commandWindowRectItemsEquipsCore','clamp','+%1','ATK','loadFaceImages','DFrru','commandNameWindowCenter','allMembers','EElDU','commandWindowRect','ANbhQ','categoryNameWindowCenter','prepareNextScene','TgeTc','activateItemWindow','iconHeight','initialize','AaAZf','DrawIcons','drawItemEquipType','aKYOM','registerCommand','cancel','icon','drawItemConsumable','baseSellingPrice','fXWKw','_newLabelOpacityChange','New','IconSet','GQCjs','sellWindowRect','etypeId','drawParamName','Scene_Shop_create','defaultItemMax','getProxyItem','fill','drawParamText','DrawBackRect','formula','Type','resetFontSettings','statusWidth','qauwJ','contents','BQsGa','getItemEffectsMpRecoveryText','ScopeRandomEnemies','LhNSk','isBattleTest','buttonAssistSlotWindowShift','_bypassNewLabel','mmp','process_VisuMZ_ItemsEquipsCore_EquipSlots','buttonAssistLargeIncrement','ParseArmorNotetags','battleMembers','%1%','buttonAssistOffset3','USER\x20TP\x20GAIN','removeBattleTestArtifacts','Scene_Shop_prepare','addCancelCommand','ltKRi','isClearCommandEnabled','setItemWindow','Scene_Item_create','indexOf','actorParams','IncludeShopItem','bitmap','forceChangeEquip','powerDownColor','clearNewLabelFromItem','getItemEffectsAddedStatesBuffsLabel','itemEnableJS','lciPP','CmdTextAlign','Qrmyw','isProxyItem','_buyWindowLastIndex','bind','armors','isSoleWeaponType','Speed2000','commandSellItemsEquipsCore','ehISI','ApuNQ','possession','paramPlus','_newLabelOpacity','gaugeLineHeight','Step1End','cWvSd','fHxmb','drawItemEffectsRemovedStatesBuffs','PpfOL','lEqbA','pop','cursorDown','nAjKB','drawItemDarkRect','isEquipped','isEnabled','itemLineRect','hpRate','LEWQq','cursorUp','Scene_Item_createItemWindow','keyItem','boxWidth','VJwah','itypeId','Game_Enemy_traitObjects_artifact','cmyxt','wUgkD','uZOjl','getItemHitTypeText','yfWrF','popScene','getDamageStyle','ExKZa','skYzO','smoothScrollTo','Speed1000','isShiftShortcutKeyForRemove','isTriggered','powerUpColor','SwitchBuy','Parse_Notetags_ParamValues','lVdAN','wtypeId','colSpacing','isPageChangeRequested','MaxArmors','XOgcT','JbzXP','diHHY','paramValueFontSize','FWFhj','qTgoA','ARRAYEVAL','innerWidth','Game_BattlerBase_param','getItemSpeedText','isRightInputMode','drawNewLabelText','createCategoryWindow','vmkiN','NonOptimizeETypes','Window_ItemList_item','isSoleArmorType','Game_Party_gainItem_artifact','soVen','831530OvUJcC','onSellCancel','Consumable','paintOpacity','_goodsCount','HYdnp','loseItem','Scene_Equip_helpWindowRect','item','getNextAvailableEtypeId','buffIconIndex','onDatabaseLoaded','allowCommandWindowCursorUp','gEylE','drawActorParamDifference','drawItemCustomEntryLine','damage','(%1)','map','iconText','isCursorMovable','mpRate','drawNewLabelIcon','getItemsEquipsCoreBackColor1','commandName','rITgd','Scene_Shop_doBuy','Game_BattlerBase_paramPlus_artifact','Actors','ERpWH','BIvZg','CommandAddClear','Step2End','\x5cI[%1]','ParseClassNotetags','drawItemOccasion','mainAreaTop','KeyItems','Scene_Equip_create','xAkJo','prepareNewEquipSlotsOnLoad','Qfazg','ConvertParams','UJXWd','Scene_Shop_activateSellWindow','buttonAssistRemove','TextAlign','isHandled','Scene_Equip_onSlotCancel','addItemCategories','drawItemEffects','Window_Selectable_update','JdVLx','itemAt','drawItemQuantity','lineHeight','helpWindowRectItemsEquipsCore','isBottomHelpMode','TwVoR','HiddenItemB','foreground','YWoAc','xroKU','Nonconsumable','commandBuyItemsEquipsCore','BattleUsable','getItemSuccessRateLabel','CONSUMABLE','getMenuImage','LabelSuccessRate','drawItem','normalColor','SwitchID','Scene_Shop_goldWindowRect','LOvfY','getItemEffectsHpDamageLabel','processDrawIcon','newLabelEnabled','systemColor','getItemDamageAmountTextOriginal','ywFJf','sYsni','100%','Whitelist','Scene_Shop_sellWindowRect','prototype','zdwHA','initNewLabelSprites','HWfxy','status','cursorLeft','Window_ItemList_updateHelp','999654MlcpLe','?????','actor','onCategoryOk','olyBm','Game_Actor_artifact','EFFECT_ADD_BUFF','TWQHx','FontColor','_armorIDs','postCreateCategoryWindowItemsEquipsCore','atk','\x5cI[%1]%2','paramchangeTextColor','troopArtifacts','Scene_Shop_helpWindowRect','item-%1','HyxbC','kysQL','addChild','frdjT','maxCols','background','currencyUnit','replace','Game_Actor_paramPlus','prepareRefreshItemsEquipsCoreLayout','processCursorMoveModernControls','optKeyItemsNumber','Window_ShopSell_isEnabled','YTORy','ELEMENT','fkPZE','Window_ShopBuy_item','create','categoryStyleCheck','Settings','updatedLayoutStyle','textWidth','drawEquipData','RBpYl','_slotId','QoL','xFOPY','refreshActorEquipSlotsIfUpdated','processShiftRemoveShortcut','addItemCategory','createCategoryNameWindow','LabelHitType','gbJas','filter','setStatusWindow','getItemConsumableLabel','xAflW','categoryItemTypes','createSlotWindow','CommandAddOptimize','Scene_Shop_buyingPrice','isOptimizeCommandEnabled','drawRemoveItem','optimize','_forcedSlots','type','goRfn','changeTextColor','TdXjQ','getItemConsumableText','_equips','name','width','commandSell','_bypassReleaseUnequippableItemsItemsEquipsCore','CannotEquipMarker','mainCommandWidth','setTopRow','createSellWindow','getItemEffectsHpRecoveryLabel','translucentOpacity','isBuyCommandEnabled','_commandNameWindow','BOGGr','hideDisabledCommands','clearEquipments','buttonAssistKey3','isNewItem','EqrsH','HxKur','isOpenAndActive','_tempActorB','_resetFontSize','0000','bshEa','PxzPR','RegExp','isEquipChangeOk','olOue','XbQvW','ZlnNQ','zoxTV','MaxIcons','LabelRecoverTP','max','isHovered','qHoGy','AllWeapons','resetTextColor','commandStyleCheck','down','min','_allowArtifactParamBase','NeverUsable','isDrawItemNumber','isItem','hideAdditionalSprites','index','StatusWindow','getItemScopeText','Scene_Boot_onDatabaseLoaded','parameters','getItemEffectsTpDamageText','isHoverEnabled','adjustHiddenShownGoods','NdvoX','forceResetEquipSlots','equipSlotIndex','NauTC','isStackableArtifact','getItemEffectsTpRecoveryText','onTouchSelectModern','isPressed','_doubleTouch','RemoveEquipText','buttonAssistText1','SetupProxyItemGroups','clearNewItem','Scene_Equip_onActorChange','AllItems','flatHP','isEquipCommandAdded','show','FieldUsable','W%1','Window_ShopStatus_setItem','aADPe','money','helpAreaHeight','1113180BHzzix','Scene_Shop_buyWindowRect','middle','OdoxX','gNapd','postCreateSellWindowItemsEquipsCore','mhvSs','omOkW','Upmli','object','drawItemEffectsSelfTpGain','VisuMZ_0_CoreEngine','KorRX','updateCommandNameWindow','gsvpp','EnableLayout','iMsHP','Occasion%1','geUpdatedLayoutStatusWidth','createStatusWindow','onCategoryCancel','characterName','TPglK','getColor','members','processHandling','_dummyWindow','onSlotOk','Parse_Notetags_EquipSlots','ulcwB','makeItemData','RNvhD','XKTpY','currentClass','vQHWL','UwCDS','TjZmB','goldWindowRect','Game_BattlerBase_meetsItemConditions','LabelSelfGainTP','Parse_Notetags_Category','ParseItemNotetags','CcbKv','getItemEffectsMpRecoveryLabel','mainAreaHeight','deselect','fillRect','lqmuH','VisuMZ_1_MainMenuCore','pJxch','statusWindowRectItemsEquipsCore','STRUCT','drawCustomShopGraphicLoad','PurchaseOnly','Scene_ItemBase_activateItemWindow','smoothSelect','Game_Party_numItems','Style','uhnwj','YFBor','Game_Party_setupBattleTestItems_artifact','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','oiVKl','ShopMenuStatusStandard','commandNameWindowDrawText','ScopeRandomAny','loadCharacter','_shopStatusMenuMode','_bypassProxy','BackRectColor','getItemColor','dxpJP','DrawItemData','bsKZx','Scene_Load_reloadMapIfUpdated','isOpen','_itemIDs','QAsnu','meetsItemConditionsJS','kxpvV','onSellOk','processCursorMove','HVfeX','concat','isUseItemsEquipsCoreUpdatedLayout','commandNameWindowDrawBackground','armor','LabelDamageMP','value2','Window_EquipItem_includes','partyArtifacts','CmdIconOptimize','LGkHp','SpeedNeg2000','Gjqtt','MDF','8lOZVri','updateCategoryNameWindow','uiMenuStyle','BZjaW','DtGZf','placeNewLabel','GdQQA','isKeyItem','RImRA','move','ItemsEquipsCore','LabelRemove','values','Scene_Shop_createCategoryWindow','canUse','hitType','addState','round','zwgDm','_slotWindow','drawItemStyleIconText','LabelElement','onBuyCancel','LUK','windowPadding','getItemDamageAmountLabel','euXqa','drawText','description','pQcJh','5chamzr','pSMGJ','mhp','addWindow','update','getItemHitTypeLabel','makeCommandList','Scene_Shop_commandSell','Window_ItemCategory_setItemWindow','isCancelled','gllFr','isPlaytest','forceChangeEquipSlots','onTouchCancel','addOptimizeCommand','gttLh','gKvnV','meetsItemConditionsNotetags','rateHP','pageup','TkLTv','ceil','slotWindowRectItemsEquipsCore','Window_ItemList_drawItem','getItemDamageAmountTextBattleCore','Parse_Notetags_ParamJS','SwitchSell','equipTypes','ShowShopStatus','Window_ItemCategory_initialize','getItemDamageAmountLabelBattleCore','armor-%1','buy','FrWqr','CoreEngine','shift','drawItemCost','drawParamsItemsEquipsCore','HP\x20DAMAGE','allowShiftScrolling','removeStateBuffChanges','qjFXh','opacity','NCzDL','XCDlQ','mSKxB','gainTP','_tempActor','_scene','FjUAS','refresh','categoryWindowRectItemsEquipsCore','SYxkf','XbfIX','MMhiy','NkJOv','ItemMenuStatusBgType'];_0x5030=function(){return _0x186087;};return _0x5030();}