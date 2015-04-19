(function() {
  'use strict';

  LD.Player = function(gameState) {


    Phaser.Sprite.call(this, gameState.game, 90,
      gameState.game.world.height - 200, 'player');
    this.gameState = gameState;

    this.startX = 100;
    this.startY = this.gameState.world.height - 200;

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 1);

    this.riding = false;


    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 600;

    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 16, true);
    this.animations.add('bear_walk', [0, 1, 2, 3, 4], 16, true);


    this.game.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.controls = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      fire: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    };
  };

  LD.Player.prototype = Object.create(Phaser.Sprite.prototype);
  LD.Player.prototype.constructor = LD.Player;

  LD.Player.prototype.update = function() {
    this.game.physics.arcade.collide(this, this.gameState.level.platforms);

    this.game.physics.arcade.collide(this, this.gameState.level.layer[2]);

    this.game.physics.arcade.overlap(this, this.gameState.bear, function() {

        this.gameState.bear.kill();
        this.riding = true;
        this.loadTexture('player_bear');
        this.body.setSize(128, 104);
        this.width = 128;
        this.height = 104;
    }, null, this);


    // this.game.physics.arcade.collide(this, this.gameState.bear);

    if (!this.controlDisabled) {
      if (this.game.controls.left.isDown) {
        // console.log('LEFT!');
        this.body.velocity.x = -150;
        if (this.riding) {
          this.animations.play('bear_walk');
        } else {
          this.animations.play('walk');
        }
        this.scale.x = 1;
        this.scale.x = -1;
      } else if (this.game.controls.right.isDown) {
        this.body.velocity.x = 150;
        if (this.riding) {
          this.animations.play('bear_walk');
        } else {
          this.animations.play('walk');
        }
        this.scale.x = 1;
      } else if (this.game.controls.down.isDown) {
        // console.log('duck!');
        this.animations.stop();
        if (this.riding) {
          this.frame = 9;
        } else {
          this.frame = 8;
        }
      } else {
        this.body.velocity.x = 0;
        this.animations.stop();
         if (this.riding) {
          this.frame = 9;
        } else {
          this.frame = 8;
        }
      }

      if (this.game.controls.up.isDown && this.body.blocked.down) {
        // console.log('LEFT!');
        this.animations.stop();
        this.body.velocity.y = -350;
         if (this.riding) {
          this.frame = 9;
        } else {
          this.frame = 8;
        }
      }

      if (!this.body.blocked.down) {
         this.animations.stop();
         if (this.riding) {
          this.frame = 3;
        } else {
          this.frame = 8;
        }
      }



      if (this.game.controls.fire.isDown) {
        console.log('FIRE');
      }
    }
  };

}());
