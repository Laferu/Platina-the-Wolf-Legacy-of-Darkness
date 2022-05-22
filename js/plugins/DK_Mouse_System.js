/*
Title: Mouse System
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.2.0
Release: 09.02.2021
First release: 11.09.2020
*/

/*ru
Название: Система Мыши
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.2.0
Релиз: 09.02.2021
Первый релиз: 11.09.2020
*/

/*:
 * @plugindesc v.1.2.0 [MV|MZ] Allows you to change the mouse cursor, activate events by clicking, hovering, etc.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Mouse_System
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.2.0
 Release: 09.02.2021
 First release: 11.09.2020

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Use event comments
 1. <hover_icon: iconIndex>
 Show icon when hovering over an event.
 Replace iconIndex with the icon number or synonym (don't forget to customize them!)
 Example: <hover_icon: 4>
 Example: <hover_icon: talk>

 2. <click_activate>
 Start an event by clicking on it

 3. <hover_activate>
 Activate an event on mouse hover

 4. <custom_cursor: filename>
 Replace cursor graphics when hovering over an event.
 Replace filename with the name of the cursor file from the "img/system/" folder

 ###=========================================================================
 ## Get more features
 ###=========================================================================
 Additional features in the PRO version:
 - Display a window, text or image when hovering over an event.
 - Use text or image for the destination sprite.

 More details: https://dk-plugins.ru/mouse-system/

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###===========================================================================
 ## Support
 ###===========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @param defaultCursor
 * @text Default Cursor
 * @desc Default cursor
 * @type file
 * @dir img/system/

 * @param iconSynonyms
 * @text Icon synonyms
 * @desc Icon synonyms
 * @type struct<IconSynonym>[]
 * @default []

 * @param transferIcon
 * @text Player transfer icon
 * @desc Automatic display of an icon when hovering over an event that contains this command. 0 - disable.
 * @type number
 * @min 0
 * @default 0

 * @param destination
 * @text Destination sprite
 * @desc Setting the destination sprite (white square when clicking on the map)
 * @type struct<Destination>
 * @default {"type":"default","offsetX":"0","offsetY":"0","color":"white","outlineColor":"default","blendMode":"1","scale":"1.00","animation":"{\"bounceRate\":\"20\",\"minOpacity\":\"16\",\"maxOpacity\":\"192\",\"minScale\":\"0.15\",\"maxScale\":\"1.50\"}"}

*/

/*:ru
 * @plugindesc v.1.2.0 [MV|MZ] Позволяет изменять курсор мыши, активировать события нажатием, наведением и др.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Mouse_System
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.2.0
 Релиз: 09.02.2021
 Первый релиз: 11.09.2020

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Используйте комментарии события
 1. <hover_icon: iconIndex>
 Отобразить иконку при наведении на событие.
 Замените iconIndex на номер иконки или синоним (не забудьте их настроить!)
 Пример: <hover_icon: 4>
 Пример: <hover_icon: talk>

 2. <click_activate>
 Запустить событие нажатием на него

 3. <hover_activate>
 Запустить событие наведением мыши

 4. <custom_cursor: filename>
 Заменить графику курсора при наведении на событие.
 Замените filename на название файла курсора из папки "img/system/"

 ###=========================================================================
 ## Получите больше возможностей
 ###=========================================================================
 Дополнительные возможности в PRO версии:
 - Отображение окна, текста или изображения при наведении курсора на событие.
 - Использование текста или изображения для спрайта пункта назначения.

 Больше подробностей: https://dk-plugins.ru/mouse-system/

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @param defaultCursor
 * @text Стандартный курсор
 * @desc Стандартный курсор
 * @type file
 * @dir img/system/

 * @param iconSynonyms
 * @text Синонимы иконок
 * @desc Синонимы иконок
 * @type struct<IconSynonym>[]
 * @default []

 * @param transferIcon
 * @text Иконка перемещения игрока
 * @desc Автоматическое отображение иконки при наведении на событие, которое содержит эту команду. 0 - отключить.
 * @type number
 * @min 0
 * @default 0

 * @param destination
 * @text Спрайт пункта назначения
 * @desc Настройка спрайта пункта назначения (белый квадрат при клике мышкой по карте)
 * @type struct<Destination>
 * @default {"type":"default","offsetX":"0","offsetY":"0","color":"white","outlineColor":"default","blendMode":"1","scale":"1.00","animation":"{\"bounceRate\":\"20\",\"minOpacity\":\"16\",\"maxOpacity\":\"192\",\"minScale\":\"0.15\",\"maxScale\":\"1.50\"}"}

*/

/*~struct~IconSynonym:

 * @param iconIndex
 * @text Icon index
 * @desc Icon index
 * @type number
 * @min 1
 * @default 1

 * @param synonym
 * @text Synonym
 * @desc Synonym

*/

/*~struct~IconSynonym:ru

 * @param iconIndex
 * @text Номер иконки
 * @desc Номер иконки
 * @type number
 * @min 1
 * @default 1

 * @param synonym
 * @text Синоним
 * @desc Синоним

*/

/*~struct~Destination:

 * @param type
 * @text Type
 * @desc Type
 * @type select
 * @option default
 * @option hide
 * @option square
 * @option box
 * @option circle
 * @option donut
 * @default default

 * @param offsetX
 * @text Offset X
 * @desc Offset X
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param offsetY
 * @text Offset Y
 * @desc Offset Y
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param color
 * @text Color
 * @desc Color in format HEX, RGB or RGBA
 * @type combo
 * @option white
 * @default white

 * @param outlineColor
 * @text Outline color
 * @desc Outline color. Color in format HEX, RGB or RGBA.
 * @type combo
 * @option default
 * @default default

 * @param blendMode
 * @text Blend mode
 * @desc Blend mode
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1

 * @param scale
 * @text Scale
 * @desc Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00

 * @param animation
 * @text Animation
 * @desc Animation settings
 * @type struct<DestinationAnimation>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}

*/

/*~struct~Destination:ru

 * @param type
 * @text Тип
 * @desc Тип
 * @type select
 * @option стандартный
 * @value default
 * @option скрыть
 * @value hide
 * @option квадрат
 * @value square
 * @option ящик
 * @value box
 * @option круг
 * @value circle
 * @option пончик
 * @value donut
 * @default default

 * @param offsetX
 * @text Смещение по X
 * @desc Смещение по X
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param offsetY
 * @text Смещение по Y
 * @desc Смещение по Y
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param color
 * @text Цвет
 * @desc Цвет в формате HEX, RGB или RGBA
 * @type combo
 * @option white
 * @default white

 * @param outlineColor
 * @text Цвет контура
 * @desc Цвет контура. Цвет в формате HEX, RGB или RGBA.
 * @type combo
 * @option default
 * @default default

 * @param blendMode
 * @text Режим смешивания
 * @desc Режим смешивания
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1

 * @param scale
 * @text Масштабирование
 * @desc Масштабирование
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00

 * @param animation
 * @text Анимация
 * @desc Настройки анимации
 * @type struct<DestinationAnimation>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}

*/

/*~struct~DestinationAnimation:

 * @param bounceRate
 * @text Bounce rate
 * @desc Bounce effect rate. Less is faster.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Min opacity
 * @desc Minimum opacity
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Max opacity
 * @desc Maximum opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Min scale
 * @desc Minimum scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Max scale
 * @desc Maximum scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/

/*~struct~DestinationAnimation:ru

 * @param bounceRate
 * @text Коэффициент отскока
 * @desc Коэффициент эффекта отскока. Меньше - быстрее.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Минимальная прозрачность
 * @desc Минимальная прозрачность
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Максимальная прозрачность
 * @desc Максимальная прозрачность
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Минимальный масштаб
 * @desc Минимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Максимальный масштаб
 * @desc Максимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Mouse_System'] = '1.2.0';

(function() {

    //===========================================================================
    // initialize parameters
    //===========================================================================

    const MouseSystemParams = (function() {

        function parse(string) {
            try {
                return JSON.parse(string, function(key, value) {
                    if (typeof string === 'number' || typeof string === 'boolean') {
                        return string;
                    }

                    try {
                        if (Array.isArray(value)) {
                            return value.map(val => parse(val));
                        }

                        return parse(value);
                    } catch (e) {
                        return value;
                    }
                });
            } catch(e) {
                return string;
            }
        }

        const parameters = PluginManager.parameters('DK_Mouse_System');

        return Object.entries(parameters).reduce((acc, [key, value]) => {
            acc[key] = parse(value);

            return acc;
        }, {});

    })();

    if (!MouseSystemParams.destination) {
        MouseSystemParams.destination = { type: 'default' };
    }

    //===========================================================================
    // TouchInput
    //===========================================================================

    // methods

    const MouseSystem_TouchInput_initialize = TouchInput.initialize;
    TouchInput.initialize = function() {
        MouseSystem_TouchInput_initialize.apply(this, arguments);
        this._cursorOffset = { x: 0, y: 0 };
        this.resetCursorImage();
    };

    TouchInput.hideCursor = function() {
        this._cursorHidden = true;
        document.body.style.cursor = 'none';
    };

    TouchInput.showCursor = function() {
        if (this._cursorHidden) {
            this._cursorHidden = false;
            this._updateCursor();
        }
    };

    TouchInput.setCursorOffset = function(offset) {
        if (this._cursorOffset.x !== offset.x || this._cursorOffset.y !== offset.y) {
            this._cursorOffset = offset;
            this._updateCursor();
        }
    };

    TouchInput.setCursorImage = function(image) {
        if (this._cursorImage !== image) {
            this._cursorImage = image;
            this._updateCursor();
        }
    };

    TouchInput.resetCursorImage = function() {
        this.setCursorImage(MouseSystemParams.defaultCursor);
    };

    const MouseSystem_TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        MouseSystem_TouchInput_onMouseMove.apply(this, arguments);

        if (Utils.RPGMAKER_NAME === 'MV') {
            const x = Graphics.pageToCanvasX(event.pageX);
            const y = Graphics.pageToCanvasY(event.pageY);

            this._onMove(x, y);
        }

        const scene = SceneManager._scene;

        if (scene instanceof Scene_Map && scene.isActive() && !$gameMessage.isBusy()) {
            scene.checkEventsUnderMouse(this._x, this._y);
        } else {
            this.resetCursorImage();
        }
    };

    const MouseSystem_TouchInput_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        if (this._activateClickEvents(x, y)) {
            $gameTemp.clearDestination();
        } else {
            MouseSystem_TouchInput_onTrigger.apply(this, arguments);
        }
    };

    TouchInput._activateClickEvents = function(x, y) {
        const scene = SceneManager._scene;

        if (scene instanceof Scene_Map && scene.isActive() && !$gameMessage.isBusy()) {
            const mapX = $gameMap.canvasToMapX(x);
            const mapY = $gameMap.canvasToMapY(y);

            return $gameMap.eventsXy(mapX, mapY).some((event) => {
                if (event._erased) {
                    return false;
                }

                if (event.mouseSettings.clickActivate) {
                    event.start();

                    return true;
                }

                return false;
            });
        }

        return false;
    };

    TouchInput._updateCursor = function() {
        if (this._cursorHidden) {
            document.body.style.cursor = 'none';
            return;
        }

        const cursorImage = this._cursorImage || MouseSystemParams.defaultCursor;

        if (cursorImage) {
            const path = `img/system/${cursorImage}.png`;
            const { x, y } = this._cursorOffset;

            document.body.style.cursor = `url('${path}') ${x} ${y}, default`;
        } else {
            document.body.style.cursor = 'default';
        }
    };

    //===========================================================================
    // Game_Event
    //===========================================================================

    const MouseSystem_Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        MouseSystem_Game_Event_setupPage.apply(this, arguments);
        this.setupMouseSettings();
    };

    Game_Event.prototype.setupMouseSettings = function() {
        this.mouseSettings = {};

        if (this._erased) {
            return;
        }

        const comments = this.getComments();

        comments.forEach((comment) => {
            if (!this.mouseSettings.hoverIcon && comment.match(/<hover_icon:\s*(\w+)>/i)) {
                let iconIndex = RegExp.$1;

                if (Number.isFinite(parseInt(iconIndex))) {
                    iconIndex = parseInt(iconIndex);
                } else {
                    const synonym = MouseSystemParams.iconSynonyms.find(
                        data => data.synonym === iconIndex);

                    if (synonym) {
                        iconIndex = parseInt(synonym.iconIndex);
                    }
                }

                this.mouseSettings.hoverIcon = iconIndex;
            } else if (!this.mouseSettings.clickActivate && comment.match(/<click_activate>/i)) {
                this.mouseSettings.clickActivate = true;
            } else if (!this.mouseSettings.hoverActivate && comment.match(/<hover_activate>/i)) {
                this.mouseSettings.hoverActivate = true;
            } else if (!this.mouseSettings.customCursor && comment.match(/<custom_cursor:\s*(.*?)>/i)) {
                this.mouseSettings.customCursor = RegExp.$1;
            }
        });

        if (!this.mouseSettings.hoverIcon && MouseSystemParams.transferIcon > 0) {
            if (this.getPageCommands(201).length > 0) {
                this.mouseSettings.hoverIcon = MouseSystemParams.transferIcon;
            }
        }
    };

    Game_Event.prototype.getPageCommands = function(code) {
        const page = this.page();
        const list = (page ? page.list : null);

        if (code === undefined) {
            return list || [];
        }

        return (list ?
            list.filter((command) => command.code === code)
            : []);
    };

    Game_Event.prototype.getComments = function() {
        const page = this.page();
        const list = (page ? page.list : null);

        return (list ? list.reduce((comments, command) => {
            if (command.code === 108 || command.code === 408) {
                comments.push(command.parameters[0]);
            }

            return comments;
        }, []) : []);
    };

    //===========================================================================
    // Scene_Boot
    //===========================================================================

    const MouseSystem_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
    Scene_Boot.prototype.initialize = function() {
        MouseSystem_Scene_Boot_initialize.apply(this, arguments);

        if (Imported['DKTools'] && DKToolsParam.get('Cursor Graphic', 'Enabled')) {
            throw new Error('Disable function "Cursor Graphic" in the DKTools plugin!');
        }
    };

    //===========================================================================
    // Scene_Map
    //===========================================================================

    const MouseSystem_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        MouseSystem_Scene_Map_createSpriteset.apply(this, arguments);
        this.createMouseSystemSprite();
    };

    Scene_Map.prototype.createMouseSystemSprite = function() {
        this._mouseSystemSprite = new Sprite();

        this._mouseSystemSprite.anchor.set(0.5, 0.5);
        this._mouseSystemSprite.drawIcon = Window_Base.prototype.drawIcon;
        this._mouseSystemSprite.createIconBitmap = function() {
            const width = Utils.RPGMAKER_NAME === 'MV' ?
                Window_Base._iconWidth : ImageManager.iconWidth;
            const height = Utils.RPGMAKER_NAME === 'MV' ?
                Window_Base._iconHeight : ImageManager.iconHeight;

            this.bitmap = new Bitmap(width, height);
            this.contents = this.bitmap;
        }.bind(this._mouseSystemSprite);

        this.addChild(this._mouseSystemSprite);
    };

    Scene_Map.prototype.checkEventsUnderMouse = function(x, y) {
        const mapX = $gameMap.canvasToMapX(x);
        const mapY = $gameMap.canvasToMapY(y);
        const events = $gameMap.eventsXy(mapX, mapY);
        const sprite = this._mouseSystemSprite;

        sprite.visible = false;

        TouchInput.resetCursorImage();
        TouchInput.showCursor();

        if (events.length === 0) {
            delete sprite.iconIndex;
        }

        events.forEach((event) => {
            const mouseSettings = event.mouseSettings;

            if (mouseSettings.hoverIcon) {
                const iconIndex = mouseSettings.hoverIcon;

                TouchInput.hideCursor();

                if (sprite.iconIndex !== iconIndex) {
                    sprite.iconIndex = iconIndex;
                    sprite.createIconBitmap();
                    sprite.drawIcon(iconIndex, 0, 0);
                }

                sprite.visible = true;
                sprite.move(x, y);
            }

            if (mouseSettings.hoverActivate) {
                event.start();
            }

            if (mouseSettings.customCursor) {
                TouchInput.setCursorImage(mouseSettings.customCursor);
            }
        });
    };

    //===========================================================================
    // Spriteset_Map
    //===========================================================================

    const MouseSystem_Spriteset_Map_createDestination =
        Spriteset_Map.prototype.createDestination;
    Spriteset_Map.prototype.createDestination = function () {
        MouseSystem_Spriteset_Map_createDestination.apply(this, arguments);

        if (MouseSystemParams.destination.type === 'hide') {
            if (this._destinationSprite && this._destinationSprite.parent) {
                this._destinationSprite.parent.removeChild(this._destinationSprite);
            }
        }
    };

    //===========================================================================
    // Sprite_Destination
    //===========================================================================

    const MouseSystem_Sprite_Destination_updatePosition =
        Sprite_Destination.prototype.updatePosition;
    Sprite_Destination.prototype.updatePosition = function () {
        MouseSystem_Sprite_Destination_updatePosition.apply(this, arguments);

        if (MouseSystemParams.destination.type !== 'default') {
            this.x += MouseSystemParams.destination.offsetX;
            this.y += MouseSystemParams.destination.offsetY;
        }
    };

    const MouseSystem_Sprite_Destination_createBitmap =
        Sprite_Destination.prototype.createBitmap;
    Sprite_Destination.prototype.createBitmap = function () {
        const { type, color, outlineColor, scale, blendMode } = MouseSystemParams.destination;

        if (type === 'default') {
            MouseSystem_Sprite_Destination_createBitmap.apply(this, arguments);
            return;
        }

        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();

        this.bitmap = new Bitmap(tileWidth, tileHeight);

        if (outlineColor && outlineColor !== 'default') {
            this.bitmap.outlineColor = outlineColor;
        }

        if (type === 'square' || type === 'box') {
            this.bitmap.fillRect(
                (tileWidth - (tileWidth * scale)) / 2,
                (tileHeight - (tileHeight * scale)) / 2,
                tileWidth * scale,
                tileHeight * scale,
                color);

            if (type === 'box') {
                this.bitmap.clearRect(
                    ((tileWidth - (tileWidth * scale)) / 2) + 4,
                    ((tileHeight - (tileHeight * scale)) / 2) + 4,
                    (tileWidth * scale) - 8,
                    (tileHeight * scale) - 8);
            }
        }

        if (type === 'circle' || type === 'donut') {
            const minSize = Math.min(tileWidth, tileWidth);

            this.bitmap.drawCircle(
                tileWidth / 2, tileHeight / 2, Math.floor(minSize / 2 * scale) - 1, color);

            if (type === 'donut') {
                this.bitmap.drawCircle(
                    tileWidth / 2, tileHeight / 2, Math.floor((minSize / 2) * scale) - 4, 'clear');
            }
        }

        this.anchor.set(0.5, 0.5);
        this.blendMode = blendMode;
    };

    const MouseSystem_Sprite_Destination_updateAnimation =
        Sprite_Destination.prototype.updateAnimation;
    Sprite_Destination.prototype.updateAnimation = function () {
        if (MouseSystemParams.destination.type === 'default') {
            MouseSystem_Sprite_Destination_updateAnimation.apply(this, arguments);
            return;
        }

        const {
            bounceRate,
            minOpacity, maxOpacity,
            minScale, maxScale
        } = MouseSystemParams.destination.animation;

        const scale = (0.25 + this._frameCount / bounceRate).clamp(minScale, maxScale);

        this._frameCount++;
        this._frameCount %= bounceRate;

        this.opacity = ((bounceRate - this._frameCount) * 10).clamp(minOpacity, maxOpacity);
        this.scale.set(scale, scale);
    };

}());
