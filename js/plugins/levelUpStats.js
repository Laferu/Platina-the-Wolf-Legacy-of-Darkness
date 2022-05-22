/*:
 * @plugindesc Lets you add random values to base parameters on level-up.
 * @author Caethyril
 *
 * @help Actor/Class notetag (case-sensitive!):
 *    <Level Up STAT: X>
 *    <Level Up STAT: X to Y>
 *     - Replace STAT with one of these:
 *         MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     - Replace X with the minimum amount to add (integer)
 *     - Replace Y with the maximum amount to add (integer)
 *       -> Note: Y should be greater than X.
 *   Examples:
 *    <Level Up MHP: 40>          + 40 max HP per level
 *    <Level Up ATK: 5 to 15>     + 5~15 (inclusive) ATK per level
 *    <Level Up LUK: 0 to 8>      + 0~8 (inclusive) LUK per level
 *
 * Note that this is not designed to work with "level-downs".
 * The stat gains are permanent and are not tracked separately.
 *
 * Terms of use:
 *    Free to use and modify.
 */

(function(alias) {

'use strict';

	const TAGNAME  = 'Level Up %1';
	const PARAMS   = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	const SPLITTER = 'to';

	Game_Actor.prototype.levelUp = function() {
		PARAMS.forEach(function(p, n) {
			[this.actor(), this.currentClass()].forEach(function(o) {
				let tag = o.meta[TAGNAME.format(p)];
				if (tag) {
					let arr = tag.split(SPLITTER).map(function(num) { return parseInt(num, 10); });
					let add = 0;
					if (!isNaN(arr[0])) add += arr[0];
					if (!isNaN(arr[1])) {
						let m = arr[1] - (isNaN(arr[0]) ? 0 : arr[0]) + 1;
						if (m > 0) add += Math.randomInt(m);
					}
					this.addParam(n, add);
				}
			}, this);
		}, this);
		alias.call(this);
	};

})(Game_Actor.prototype.levelUp);