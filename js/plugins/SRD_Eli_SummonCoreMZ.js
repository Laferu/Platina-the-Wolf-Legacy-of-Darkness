/*:
@target MZ
@base EliMZ_Book
@base SRD_SummonCore
@orderAfter EliMZ_Book
@orderAfter SRD_SummonCore

@plugindesc ♦5.0.0 ♦ Compatibility Patch for SRD Summon Core in MZ
@author SRD & Hakuen Studio
@url http://sumrndm.site/summon-core/

@help
============================================================================
Terms of Use
============================================================================

SRD - http://sumrndm.site/terms-of-use/

============================================================================
Features
============================================================================

• Port of the SRD Summon Core plugin to work with MZ.

============================================================================
How to use
============================================================================

Download the original plugin from the URL.

Instead of using:
X: master._mainX - 120
Y: master._mainY

You need to use:
X: master._homeX - 120
Y: master._homeY

Plug and Play.

============================================================================
Update log
============================================================================
Version 5.0.0 - 03/17/2022
- Compatibility patch to work with Eli Book
Version 1.0.0 - 10/18/2021
- Plugin release!

*/

if( Imported["SumRndmDde Summon Core"] && Imported["SumRndmDde Summon Core"] === 1.06 && 
    Imported.Eli_Book
){

const isMvAnimation = (animation) => !!animation.frames

Sprite_Summon.prototype.updateSummonIntro = function() {
	if(!this._introStarted) {
		if(this._actor && this._actor.ready()) {
			this.setupIntroAnimation()
			this._introStarted = true
            $gameTemp.requestBattleRefresh()
		}
	}
}

Sprite_Summon.prototype.updateTransition = function() {
	if(this._summonSprite) {

        if(this._summonSprite instanceof Sprite_Animation){
            this.updateTransitionMZ()
        }else{
            this.updateTransitionMV()
        }

        if(!this._summonSprite.isPlaying()) {
        
            if(this._transitionType === 2) {
                BattleManager.summonsXPositions[this._homeX] = false
                BattleManager.summonsXPositions[this._homeY] = false
                this._introStarted = false
                this._exitAnimation = 0
            }

            this._transitionType = 0
            this._summonSprite = null
            $gameTemp.requestBattleRefresh()
        }

	}
}

Sprite_Summon.prototype.updateTransitionMV = function() {
    if(this._transitionType === 1){
        this.opacity = Math.floor(((this._maxDuration - this._summonSprite._duration) / this._maxDuration) * 255)

    }else if(this._transitionType === 2){
        this.opacity = Math.floor((this._summonSprite._duration / this._maxDuration) * 255)
    }
}

Sprite_Summon.prototype.updateTransitionMZ = function() {
    if(this._transitionType === 1){
        const opMax = Math.min(255, ((this._summonSprite._frameIndex - this._maxDuration) / this._maxDuration) * 255)
        this.opacity = Math.floor(opMax)

    }else if(this._transitionType === 2){
        if(this.opacity > 0){
            this.opacity -= 255/60
        }
    }
}


Sprite_Summon.prototype.setupIntroAnimation = function() {
	this.cancelTransitionAnimation()
	if(this._actor.introAnimation() > 0) {
        const animation = $dataAnimations[this._actor.introAnimation()]
		this.opacity = 0
		this._transitionType = 1
        if(isMvAnimation(animation)){
            this.setupIntroAnimationMV(animation)
        }else{
            this.setupIntroAnimationMZ(animation)
        }
		
	} else {
		this.opacity = 255
	}
}

Sprite_Summon.prototype.setupIntroAnimationMV = function(animation) {
    this._summonSprite = new Sprite_AnimationMV()
    this.parent.addChild(this._summonSprite)
    this._summonSprite.setup([this._effectTarget], animation, false, 4)
    this._innerAnimationsMV.push(this._summonSprite)
    this._maxDuration = this._summonSprite._duration
}

Sprite_Summon.prototype.setupIntroAnimationMZ = function(animation) {
    this._summonSprite = new Sprite_Animation()
    this.parent.addChild(this._summonSprite)
    this._summonSprite.setup([this._effectTarget], animation, false, 4)
    this._innerAnimationsMZ.push(this._summonSprite)
    this._maxDuration = this._summonSprite._maxTimingFrames
}

Sprite_Summon.prototype.setupExitAnimation = function() {
	this.cancelTransitionAnimation()
	if(this._exitAnimation > 0) {
        const animation = $dataAnimations[this._exitAnimation]
		this.opacity = 255
		this._transitionType = 2
        if(isMvAnimation(animation)){
            this.setupExitAnimationMV(animation)
        }else{
            this.setupExitAnimationMZ(animation)
        }
		
	} else {
		this.opacity = 0
	}
}

Sprite_Summon.prototype.setupExitAnimationMV = function(animation) {
    this._summonSprite = new Sprite_AnimationMV()
    this._summonSprite.setup([this._effectTarget], animation, false, 4)
    this.parent.addChild(this._summonSprite)
    this._innerAnimationsMV.push(this._summonSprite)
    this._maxDuration = this._summonSprite._duration
}

Sprite_Summon.prototype.setupExitAnimationMZ = function(animation) {
    this._summonSprite = new Sprite_Animation()
    this._summonSprite.setup([this._effectTarget], animation, false, 4)
    this.parent.addChild(this._summonSprite)
    this._innerAnimationsMZ.push(this._summonSprite)
    this._maxDuration = this._summonSprite._maxTimingFrames
}

Sprite_Summon.prototype.cancelTransitionAnimation = function() {
	if(this._summonSprite) {
		this.parent.removeChild(this._summonSprite)
		this._innerAnimationsMZ = []
        this._innerAnimationsMV = []
	}
}

}